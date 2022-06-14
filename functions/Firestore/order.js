const { firestore } = require("../admin");
const axios = require("axios").default;
const { getLSAPICredentials, getLiveLSAPICredentials, getCalendlyCredentials } = require("../SecretManager/index");

let orderDB = "apdc_orders";
// const orderDB = "orders";
const locationsDB = "apdc_locations";

// this function is triggered anytime an order is updated/created in eCom
exports.addOrder = async (req, res) => {
  res.status(200).send();

  let {
    id,
    number,
    status,
    priceIncl,
    email,
    firstname,
    lastname,
    updatedAt,
    createdAt,
    products,
    shipmentTitle,
    addressBillingName,
    addressBillingStreet,
    addressBillingStreet2,
    addressBillingNumber,
    addressBillingZipcode,
    addressBillingRegion,
    addressBillingCountry,
    addressShippingName,
    addressShippingStreet,
    addressShippingStreet2,
    addressShippingNumber,
    addressShippingZipcode,
    addressShippingRegion,
    addressShippingCountry,
    phone,
    paymentId,
    paymentTitle,
    paymentData,
  } = req.body.order;
  let type;

  if (shipmentTitle.includes("Pickup")) {
    type = "pickup";
  } else if (shipmentTitle.includes("Delivery")) {
    type = "delivery";
  } else {
    type = "mail";
  }

  const orderObject = {
    id,
    number,
    status,
    totalPrice: priceIncl,
    email,
    firstname,
    lastname,
    updatedAt: new Date(updatedAt),
    createdAt: new Date(createdAt),
    products,
    shipmentTitle,
    type,
    phone,

    // address: `${addressShippingStreet} ${addressShippingStreet2}, ${addressShippingRegion}, ${addressShippingZipcode}`,
    shippingAddress: {
      name: addressShippingName,
      street: addressShippingStreet,
      street2: addressShippingStreet2,
      number: addressShippingNumber,
      zipcode: addressShippingZipcode,
      region: addressShippingRegion,
      country: addressShippingCountry.title,
    },
    billingAddress: {
      name: addressBillingName,
      street: addressBillingStreet,
      street2: addressBillingStreet2,
      number: addressBillingNumber,
      zipcode: addressBillingZipcode,
      region: addressBillingRegion,
      country: addressBillingCountry.title,
    },
    payment: {
      id: paymentId,
      title: paymentTitle,
      data: paymentData,
    },
  };

  firestore
    .collection(orderDB)
    .doc(String(id))
    .set(orderObject, { merge: true })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: "Something went wrong" });
    });
  return;
};

// once a calendly booking is made, a webhook triggers this function to update the order with the booking info
exports.addCalendlyInfo = async (req, res) => {
  // acknowledge received webhook early to avoid getting client blocked
  res.status(200).send();

  // get order id and note
  let orderID;
  let addedCalendlyCustomerNote = "";

  req.body.payload.questions_and_answers.forEach((question) => {
    if (question.question === "Order ID") {
      orderID = question.answer;
    } else {
      addedCalendlyCustomerNote = question.answer;
    }
  });

  const calendlyEventDetails = {
    startTime: "",
    locationName: "",
  };
  const calendly_token = await getCalendlyCredentials();

  const eventIdURL = req.body.payload.event;

  // get the details of the calendly booking
  await axios({
    method: "get",
    url: eventIdURL,
    headers: { Authorization: `Bearer ${calendly_token}` },
  })
    .then((response) => {
      calendlyEventDetails.startTime = response.data.resource.start_time;
      calendlyEventDetails.locationName = response.data.resource.name;
    })
    .catch((err) => {
      console.log(err);
      return;
    });

  // update order object with calendly booking details
  firestore
    .collection(orderDB)
    .doc(String(orderID))
    .update({
      startTime: new Date(calendlyEventDetails.startTime),
      calendlyBookingLocationName: calendlyEventDetails.locationName,
    });

  // write calendly booking details on Lightspeed order to be able to view the booking. To do this, first fetch current note and then send a post to append to the note

  // SANDBOX
  // let LS_APDC_CREDENTIALS = await getLSAPICredentials();
  // let language = "en";

  // LIVE
  let LS_APDC_CREDENTIALS = await getLiveLSAPICredentials();
  let language = "us";

  let getOrderEndpoint = `https://${LS_APDC_CREDENTIALS}@api.shoplightspeed.com/${language}/orders/${orderID}.json`;
  let initialCustomerComment = "";
  await axios({
    method: "get",
    url: getOrderEndpoint,
  })
    .then(async (response) => {
      let currentOrderMemo = response.data.order.memo;
      initialCustomerComment = response.data.order.comment;

      // we always want to do the following, since this function gets triggered by an added date scheduled and we want to keep track of this in the order
      currentOrderMemo +=
        "\n" +
        "Pickup/Delivery Date: " +
        new Date(calendlyEventDetails.startTime).toLocaleString("en-us", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "America/New_York" });

      // we only append the following if there was a note entered that was detected
      if (addedCalendlyCustomerNote.length > 1) {
        // currentCustomerMemo = currentCustomerMemo + "\n" + "Note from customer: " + addedCalendlyCustomerNote;
        currentOrderMemo += "\n" + "Additional Calendly Note from customer: " + addedCalendlyCustomerNote;
      }

      await axios({
        method: "put",
        url: getOrderEndpoint,
        data: {
          order: {
            memo: currentOrderMemo,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      return;
    });
  if ((initialCustomerComment + addedCalendlyCustomerNote).length > 0) {
    firestore
      .collection(orderDB)
      .doc(String(orderID))
      .update({
        fullCustomerNote: initialCustomerComment + "\n" + addedCalendlyCustomerNote,
      });
  }
  return;
};

// maybe if it fails, wait 1 minute then try again to wait for the order to be saved to db

// get all calendly links
exports.getCalendlyLinks = async (req, res) => {
  let allLinks = [];
  firestore
    .collection(locationsDB)
    .get()
    .then((snapshot) => {
      snapshot.forEach((docs) => {
        if (docs.id === "Delivery" || docs.id === "Pickup") {
          allLinks.push(docs.data());
        }
      });
      // convert to array
      allLinks = [...Object.keys(allLinks[0]).map((key) => allLinks[0][key]), ...Object.keys(allLinks[1]).map((key) => allLinks[1][key])];
      return res.status(200).send(allLinks);
    })
    .catch((err) => {
      console.log(err.message);
      return res.send(err.message);
    });
};

// check if a timeslot on calendly was booked for an order
exports.isBooked = async (req, res) => {
  const orderID = req.params.orderID;
  firestore
    .collection(orderDB)
    .doc(String(orderID))
    .get()
    .then((snapshot) => {
      return res.status(200).send(snapshot.data().hasOwnProperty("startTime"));
    })
    .catch((err) => {
      console.log(err.message);
      return res.send(err.message);
      // if error, then order was not yet added to the db//
      //maybe get the id and trigger a manual api pull to redo it.
    });
};

// exports.dailyOrdersBackup = async (req, res) => {
//   let LS_APDC_CREDENTIALS = await getLSAPICredentials();
//   let language = "en";

//   // let LS_APDC_CREDENTIALS = await getLiveLSAPICredentials();
//   // let language = "us";

//   let getOrderEndpoint = `https://${LS_APDC_CREDENTIALS}@api.shoplightspeed.com/${language}/orders.json`;
//   let initialCustomerComment = "";
//   await axios({
//     method: "get",
//     url: getOrderEndpoint,
//   }).then(async (response) => {
//     console.log(response.data.Orders);
//   });
// };
