const { firestore } = require("../admin");
const axios = require("axios").default;
const { getLSAPICredentials, getLiveLSAPICredentials, getCalendlyCredentials } = require("../SecretManager/index");

// let orderDB = "apdc_orders";
let orderDB = "orders";

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
  } else if (shipmentTitle.includes("Default Shipping")) {
    type = "mail";
  }

  // let LS_APDC_CREDENTIALS = await getLiveLSAPICredentials();
  let LS_APDC_CREDENTIALS = await getLSAPICredentials();

  let categories_products_endpoint = `https://${LS_APDC_CREDENTIALS}@api.shoplightspeed.com/en/categories/products.json`;
  let categories_endpoint = `https://${LS_APDC_CREDENTIALS}@api.shoplightspeed.com/en/categories`;
  let category_product = [];

  await axios({ method: "get", url: categories_products_endpoint })
    .then((response) => {
      category_product = response.data.categoriesProducts;
    })
    .catch(() => {
      return;
    });

  products = products.resource.embedded;

  for (const product of products) {
    const found = category_product.find((element) => element.product.resource.id == product.product.resource.id);
    if (found) {
      let categoryID = found.category.resource.id;
      await axios({
        method: "get",
        url: `${categories_endpoint}/${categoryID}.json`,
      })
        .then((response) => {
          product.category = response.data.category.fulltitle;
        })
        .catch(() => {
          return;
        });
    }
  }

  const orderObject = {
    // id: orderCollection.id,
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
    // .then(() => {
    //   return res.json(orderObject);
    // })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: "Something went wrong" });
    });
};

exports.addCalendlyInfo = async (req, res) => {
  // acknowledge received webhook early to avoid getting client blocked
  res.status(200).send();

  // get order id and note
  let orderID;
  let addedCustomerNote = "";

  req.body.payload.questions_and_answers.forEach((question) => {
    if (question.question === "Order ID") {
      orderID = question.answer;
    } else {
      addedCustomerNote = question.answer;
    }
  });

  const eventIdURL = req.body.payload.event;

  const calendlyEventDetails = {
    startTime: "",
    locationName: "",
  };
  const calendly_token = await getCalendlyCredentials();

  await axios({
    method: "get",
    url: eventIdURL,
    headers: { Authorization: `Bearer ${calendly_token}` },
  })
    .then((response) => {
      calendlyEventDetails.startTime = response.data.resource.start_time;
      calendlyEventDetails.calendlyLocationName = response.data.resource.name;
    })
    .catch((err) => {
      console.log(err);
      return;
    });

  firestore
    .collection(orderDB)
    .doc(String(orderID))
    .update({
      startTime: new Date(calendlyEventDetails.startTime),
      locationName: calendlyEventDetails.locationName,
    });

  let LS_APDC_CREDENTIALS = await getLSAPICredentials();
  let getOrderEndpoint = `https://${LS_APDC_CREDENTIALS}@api.shoplightspeed.com/en/orders/${orderID}.json`;
  await axios({
    method: "get",
    url: getOrderEndpoint,
  })
    .then(async (response) => {
      let currentOrderMemo = "";
      // let currentCustomerMemo = "";
      currentOrderMemo = response.data.order.memo;
      // currentCustomerMemo = response.data.order.customer.memo;

      // we always want to do the following, since this function gets triggered by an added date scheduled and we want to keep track of this in the order
      currentOrderMemo = currentOrderMemo + "\n" + "Pickup/Delivery Date: " + new Date(calendlyEventDetails.startTime).toLocaleString("en-us", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

      // we only append the following if there was a note entered that was detected
      if (addedCustomerNote.length > 1) {
        // currentCustomerMemo = currentCustomerMemo + "\n" + "Note from customer: " + addedCustomerNote;
        currentOrderMemo = currentOrderMemo + "\n" + "Note from customer: " + addedCustomerNote;
      }

      await axios({
        method: "put",
        url: getOrderEndpoint,
        data: {
          order: {
            memo: currentOrderMemo,
            // customer: {
            //   resource: {
            //     embedded: {
            //       memo: currentCustomerMemo,
            //     },
            //   },
            // },
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      return;
    });
};
