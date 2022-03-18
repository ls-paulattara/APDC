import React, { useState } from "react";
import { Modal, Header, Table, Button, Message, Icon, Input } from "semantic-ui-react";

function DeliveryZoneTable(props) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { deliveryZones, setDeliveryZones, firebase } = props;

  const onDeliveryChange = (val, i, type) => {
    // 1. Make a shallow copy of the items
    let items = [...deliveryZones];
    // 2. Make a shallow copy of the item you want to mutate
    let item = { ...items[i] };
    // 3. Replace the property you're intested in
    item[type] = val;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    items[i] = item;
    // 5. Set the state to our new copy
    setDeliveryZones(items);
  };

  const handleDismiss = () => {
    setSuccess("");
  };

  const handleDismissError = () => {
    setError("");
  };

  const saveDeliveryChanges = () => {
    setSuccess("");
    setError("");
    let items = [...deliveryZones];
    items = items.filter((item) => item.value.length > 0 && item.text.length > 0 && item.link.length > 0);
    props.firebase.updateLocations(items, "Delivery");
    if (items.toString() !== deliveryZones.toString()) {
      setError("Please fill in all fields");
      return setTimeout(() => setError(""), 5000);
    }
    setSuccess("Changes successfully saved");
    setTimeout(() => setSuccess(""), 5000);
  };

  const DeleteDeliveryLocation = (props) => {
    const [open, setOpen] = useState(false);

    const removeLocation = (e, data) => {
      let items = [...deliveryZones];
      items.splice(props.i, 1);
      setDeliveryZones(items);
      console.log(deliveryZones);
      firebase
        .updateLocations(items, "Delivery")
        .then(() => {
          setSuccess(`Delivery Zone was successfully deleted`);
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
            Are you sure you want to remove <strong>{props.deliveryZone.text}</strong>?
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

  const addDeliveryZone = () => {
    let items = [...deliveryZones];
    // get last key
    const lastKey = items.length > 0 ? items.at(-1).key : 0;

    items.push({ key: lastKey + 1, text: "", value: "", link: "" });
    setDeliveryZones(items);
  };

  return (
    <>
      <Header>Delivery Zones</Header>
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
          {deliveryZones.map((item, i) => (
            <Table.Row key={item.key + "row"}>
              <Table.Cell style={{ width: "18%" }}>
                <Input fluid key={item.key + "in1"} size="large" value={deliveryZones[i].text} onChange={(e) => onDeliveryChange(e.target.value, i, "text")}></Input>
              </Table.Cell>
              <Table.Cell style={{ width: "25%" }}>
                <Input fluid key={item.key + "in2"} size="large" value={deliveryZones[i].value} onChange={(e) => onDeliveryChange(e.target.value, i, "value")}></Input>
              </Table.Cell>
              <Table.Cell style={{ width: "25%" }}>
                <Input fluid key={item.key + "in3"} size="large" value={deliveryZones[i].link} onChange={(e) => onDeliveryChange(e.target.value, i, "link")}></Input>
              </Table.Cell>
              <Table.Cell textAlign="center" style={{ width: "5%" }}>
                <DeleteDeliveryLocation i={i} deliveryZone={item} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Button content="Add Delivery Zone" icon="add" size="large" labelPosition="right" onClick={addDeliveryZone} />
      <Button content="Save Delivery Changes" icon="save" size="large" labelPosition="right" onClick={saveDeliveryChanges} />
    </>
  );
}

export default DeliveryZoneTable;
