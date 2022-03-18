import React, { useState } from "react";
import { Modal, Header, Table, Button, Message, Icon, Input } from "semantic-ui-react";

function PickupPointTable(props) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { pickupPoints, setPickupPoints, firebase } = props;

  const onPickupChange = (val, i, type) => {
    // 1. Make a shallow copy of the items
    let items = [...pickupPoints];
    // 2. Make a shallow copy of the item you want to mutate
    let item = { ...items[i] };
    // 3. Replace the property you're intested in
    item[type] = val;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    items[i] = item;
    // 5. Set the state to our new copy
    setPickupPoints(items);
  };

  const handleDismiss = () => {
    setSuccess("");
  };

  const handleDismissError = () => {
    setError("");
  };

  const savePickupChanges = () => {
    setSuccess("");
    setError("");
    let items = [...pickupPoints];
    items = items.filter((item) => item.value.length > 0 && item.text.length > 0 && item.link.length > 0);
    props.firebase.updateLocations(items, "Pickup");
    if (items.toString() !== pickupPoints.toString()) {
      setError("Please fill in all fields");
      return setTimeout(() => setError(""), 5000);
    }
    setSuccess("Changes successfully saved");
    setTimeout(() => setSuccess(""), 5000);
  };

  const DeletePickupLocation = (props) => {
    const [open, setOpen] = useState(false);

    const removeLocation = (e, data) => {
      let items = [...pickupPoints];
      items.splice(props.i, 1);
      setPickupPoints(items);
      console.log(pickupPoints);
      firebase
        .updateLocations(items, "Pickup")
        .then(() => {
          setSuccess(`Pickup Point was successfully deleted`);
          setTimeout(() => setSuccess(""), 5000);
        })
        .catch((error) => {
          setError("Error updating document: ", error);
          setTimeout(() => setError(""), 5000);
        });
      setOpen(false);
    };
    return (
      <Modal basic onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} size="small" trigger={<Button icon="remove" basic circular />}>
        <Header icon>
          <Icon name="warning sign" />
          Remove Location
        </Header>
        <Modal.Content>
          <p>
            Are you sure you want to remove <strong>{props.pickupPoint.text}</strong>?
          </p>
          <p>
            <strong>This Cannot be undone!</strong>
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" inverted onClick={() => setOpen(false)}>
            <Icon name="cancel" /> Cancel
          </Button>
          <Button color="green" inverted onClick={removeLocation}>
            <Icon name="checkmark" /> Remove Location
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };

  const addPickupPoint = () => {
    let items = [...pickupPoints];
    // get last key
    const lastKey = items.length > 0 ? items.at(-1).key : 0;

    items.push({ key: lastKey + 1, text: "", value: "", link: "" });
    setPickupPoints(items);
  };

  return (
    <>
      <Header>Pickup Points</Header>
      {Boolean(success.length) && <Message onDismiss={handleDismiss} floating success content={success} />}
      {Boolean(error.length) && <Message onDismiss={handleDismissError} floating error content={error} />}
      <Table compact>
        <Table.Header fullWidth>
          <Table.Row>
            <Table.HeaderCell>
              <Icon name="clipboard" />
              Reporting App Title
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Icon name="user" />
              eCom Checkout Title
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Icon name="linkify" />
              Calendly Link
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              {/* <Icon name="remove circle" /> */}
              Remove Location
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {pickupPoints.map((item, i) => (
            <Table.Row key={item.key + "row"}>
              <Table.Cell style={{ width: "18%" }}>
                <Input fluid key={item.key + "in1"} size="large" value={pickupPoints[i].text} onChange={(e) => onPickupChange(e.target.value, i, "text")}></Input>
              </Table.Cell>
              <Table.Cell style={{ width: "25%" }}>
                <Input fluid key={item.key + "in2"} size="large" value={pickupPoints[i].value} onChange={(e) => onPickupChange(e.target.value, i, "value")}></Input>
              </Table.Cell>
              <Table.Cell style={{ width: "25%" }}>
                <Input fluid key={item.key + "in3"} size="large" value={pickupPoints[i].link} onChange={(e) => onPickupChange(e.target.value, i, "link")}></Input>
              </Table.Cell>
              <Table.Cell textAlign="center" style={{ width: "5%" }}>
                <DeletePickupLocation i={i} pickupPoint={item} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Button content="Add Pickup Points" icon="add" size="large" labelPosition="right" onClick={addPickupPoint} />
      <Button style={{ marginBottom: "30px" }} content="Save Pickup Changes" icon="save" size="large" labelPosition="right" onClick={savePickupChanges} />
    </>
  );
}

export default PickupPointTable;
