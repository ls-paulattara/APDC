import React from "react";
import _ from "lodash";
import { withFirebase } from "../Firebase";
import {
  Message,
  Table,
  Icon,
  Button,
  List,
  Checkbox,
  Modal,
  Header,
  Dropdown,
  Divider,
} from "semantic-ui-react";
import { withAuthorization } from "../Session";
import * as ROLES from "../../constants/roles";

const UserListPage = (props) => {
  const { users, dark, firebase } = props;
  const [column, setColumn] = React.useState("");
  const [sorted, setSorted] = React.useState([]);
  const [direction, setDirection] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  React.useEffect(() => setSorted(users), [users]);

  const onSort = (e, data) => {
    const name = e.currentTarget.dataset.name;
    if (column === name) {
      setDirection(direction === "ascending" ? "descending" : "ascending");
      setSorted(sorted.reverse());
      return;
    }
    setColumn(name);
    setDirection("ascending");
    setSorted(_.sortBy(users, [name]));
    return;
  };
  const handleDismiss = () => {
    setSuccess("");
  };
  const handleDismissError = () => {
    setError("");
  };
  const toggleEnabled = (e, { checked, uid }) => {
    firebase
      .user(uid)
      .update({ enabled: checked })
      .then(() => {
        setSuccess(
          `User set to  ${checked ? "Enabled" : "Disabled"} Successfully`
        );
        setTimeout(() => setSuccess(""), 5000);
      })
      .catch((error) => {
        setError("Error updating document: ", error);
        setTimeout(() => setError(""), 5000);
      });
  };
  const toggleAuthorized = (e, { checked, uid }) => {
    firebase
      .user(uid)
      .update({ isAuthorized: checked })
      .then(() => {
        setSuccess(
          `User set to ${checked ? "Authorized" : "Unauthorized"} Successfully`
        );
        setTimeout(() => setSuccess(""), 5000);
      })
      .catch((error) => {
        setError("Error updating document: ", error);
        setTimeout(() => setError(""), 5000);
      });
  };
  const removeRole = (e, data) => {
    const { content: role, user } = data;
    const roles = user.roles;
    delete roles[`${role}`];
    firebase
      .user(user.uid)
      .update({ roles: roles })
      .then(() => {
        setSuccess(
          `Role of ${role} removed from ${user.displayName} Successfully`
        );
        setTimeout(() => setSuccess(""), 5000);
      })
      .catch((error) => {
        setError("Error updating document: ", error);
        setTimeout(() => setError(""), 5000);
      });
  };

  return (
    <React.Fragment>
      {Boolean(success.length) && (
        <Message onDismiss={handleDismiss} floating success content={success} />
      )}
      {Boolean(error.length) && (
        <Message
          onDismiss={handleDismissError}
          floating
          error
          content={error}
        />
      )}
      <Table sortable celled inverted={dark}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === "email" ? direction : null}
              onClick={onSort}
              data-name={"email"}
            >
              <Icon name="mail" />
              E-mail
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "firstName" ? direction : null}
              onClick={onSort}
              data-name={"firstName"}
            >
              <Icon name="user" />
              First Name
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "lastName" ? direction : null}
              onClick={onSort}
              data-name={"lastName"}
            >
              <Icon name="user" />
              Last Name
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === " enabled" ? direction : null}
              data-name={"enabled"}
            >
              <Icon name="power" />
              Enabled
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === " enabled" ? direction : null}
              data-name={"enabled"}
            >
              <Icon name="key" />
              Authorized
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "roles" ? direction : null}
              data-name={"roles"}
            >
              <Icon name="id badge" />
              Roles
            </Table.HeaderCell>
            <Table.HeaderCell data-name={"Remove User"}>
              <Icon name="remove user" />
              Remove User
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sorted.map((user) => (
            <Table.Row
              key={user.uid}
              negative={user.roles["UNAUTHORIZED"] ? true : false}
              warning={user.roles["UNAUTHORIZED"] ? false : !user.enabled}
            >
              <Table.Cell content={user.email} />
              <Table.Cell content={user.firstName} />
              <Table.Cell content={user.lastName} />
              <Table.Cell
                textAlign="center"
                content={
                  <Checkbox
                    toggle
                    uid={user.uid}
                    checked={user.enabled}
                    onChange={toggleEnabled}
                  />
                }
              />
              <Table.Cell
                textAlign="center"
                content={
                  <Checkbox
                    toggle
                    uid={user.uid}
                    checked={user.isAuthorized}
                    onChange={toggleAuthorized}
                  />
                }
              />
              <Table.Cell>
                <List>
                  {Object.keys(user.roles).map((key, index) => (
                    <List.Item key={key}>
                      <Button
                        icon="remove"
                        labelPosition="left"
                        basic
                        user={user}
                        content={user.roles[key]}
                        onClick={removeRole}
                      />
                    </List.Item>
                  ))}
                  <Divider />
                  <List.Item key={user.uid}>
                    <AddRole
                      dark={dark}
                      firebase={firebase}
                      user={user}
                      setError={setError}
                      setSuccess={setSuccess}
                    />
                  </List.Item>
                </List>
              </Table.Cell>
              <Table.Cell textAlign="center">
                <DeleteUser
                  dark={dark}
                  firebase={firebase}
                  user={user}
                  setError={setError}
                  setSuccess={setSuccess}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </React.Fragment>
  );
};

const DeleteUser = (props) => {
  const { dark, user, firebase, setError, setSuccess } = props;
  const [open, setOpen] = React.useState(false);
  const removeUser = (e, data) => {
    console.log(e, data, user);
    firebase
      .user(user.uid)
      .remove()
      .then(() => {
        setSuccess(`User ${user.displayName} Removed`);
        setTimeout(() => setSuccess(""), 5000);
      })
      .catch((error) => {
        setError("Error updating document: ", error);
        setTimeout(() => setError(""), 5000);
      });
    setOpen(false);
  };
  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
      trigger={<Button icon="remove user" basic circular inverted={dark} />}
    >
      <Header icon>
        <Icon name="warning sign" />
        Remove User
      </Header>
      <Modal.Content>
        <p>
          Are you sure you want to remove <strong>{user.displayName}</strong>{" "}
          <em>({user.email})</em> ?
        </p>
        <p>
          <strong>This Cannot be undone!</strong>
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" inverted onClick={() => setOpen(false)}>
          <Icon name="cancel" /> Cancel
        </Button>
        <Button color="green" inverted onClick={removeUser}>
          <Icon name="checkmark" /> Remove User
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const AddRole = (props) => {
  const { user, firebase, setError, setSuccess } = props;
  const availableRoles = Object.keys(ROLES).filter(
    (r) => !Object.keys(user.roles).includes(r)
  );
  const changeRole = (e, data) => {
    const { text: role } = data;
    console.log("neweeewewe", role);
    firebase
      .user(user.uid)
      .update({ [`roles/${role}`]: role })
      .then(() => {
        setSuccess(`Role of ${role} added to ${user.displayName} Successfully`);
        setTimeout(() => setSuccess(""), 5000);
      })
      .catch((error) => {
        setError("Error updating document: ", error);
        setTimeout(() => setError(""), 5000);
      });
  };
  return (
    <Dropdown
      button
      basic
      labeled
      floating
      className="icon"
      icon="add"
      text="Add Role"
    >
      <Dropdown.Menu>
        {availableRoles.length > 0 ? (
          availableRoles.map((r, i) => {
            return <Dropdown.Item text={r} key={i} onClick={changeRole} />;
          })
        ) : (
          <Dropdown.Item
            text="NO ROLES AVAILABLE"
            key="No roles"
            onClick={() => alert("No roles available")}
          />
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

const condition = (authUser) =>
  authUser && !!authUser.roles[ROLES.ADMIN] && !!authUser.enabled;

export default withAuthorization(condition)(withFirebase(UserListPage));
