// import React, { Component } from "react";
import React, { useState, useEffect } from "react";

import { withFirebase } from "../Firebase";
import { Container, Segment } from "semantic-ui-react";
import { compose } from "recompose";
import { withAuthorization } from "../Session";
import * as ROLES from "../../constants/roles";
import UserListPage from "./users";
import DeliveryZoneTable from "./DeliveryZoneTable";
import PickupPointTable from "./PickupPointTable";

function AdminPage(props) {
  const { dark } = props;
  const { getDeliveryZones, getPickupPoints } = require("../../Util/HelperFunctions");

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [deliveryZones, setDeliveryZones] = useState([]);
  const [pickupPoints, setPickupPoints] = useState([]);

  useEffect(() => {
    // Get the Users from the DB
    props.firebase.users().on("value", (snapshot) => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));
      // console.log(usersList);
      setUsers(usersList);
      setLoading(false);
    });

    (async () => {
      // STEP 0: UPLOAD DATA (if needed)
      // props.firebase.uploadInitialDeliveryZones();
      // props.firebase.uploadInitialPickupPoints();

      // STEP 1: GET DATA
      setDeliveryZones(await getDeliveryZones(props.firebase));
      setPickupPoints(await getPickupPoints(props.firebase));
    })();

    // componentDidUnmount equivalent
    return () => {
      props.firebase.users().off();
    };
  }, []);

  return (
    <>
      <Container>
        <Segment style={{ marginTop: 0, paddingBottom: 0, minHeight: "95vh" }} basic inverted={dark} loading={loading}>
          <UserListPage users={users} dark={dark} />
          <DeliveryZoneTable {...props} deliveryZones={deliveryZones} setDeliveryZones={setDeliveryZones} />
          <PickupPointTable {...props} pickupPoints={pickupPoints} setPickupPoints={setPickupPoints} />
        </Segment>
      </Container>
    </>
  );
}
const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN] && !!authUser.enabled;

export default compose(withAuthorization(condition), withFirebase)(AdminPage);
