const { newUser, roleUpdate } = require("./Realtime/roleUpdate");
exports.newUser = newUser;
exports.roleUpdate = roleUpdate;
exports.deleteUser = require("./Realtime/deleteUser");

const { addOrder, addCalendlyInfo, getCalendlyLinks, isBooked } = require("./Firestore/order");
const { getCategories, getStatus } = require("./Firestore/ecom");
const functions = require("firebase-functions");

const app = require("express")();

var cors = require("cors");
app.use(cors());

// order
app.post("/orders", addOrder);
app.post("/calendly", addCalendlyInfo);
app.get("/calendly", getCalendlyLinks);
app.get("/isBooked/:orderID", isBooked);

// ecom
app.get("/categories", getCategories);
app.get("/status", getStatus);

// exports.deleteOrders = functions.pubsub.schedule("every 2 minutes").onRun((context) => {
//   console.log("This will be run every 2 minutes!");
//   return null;
// });

exports.apcd_api = functions.https.onRequest(app);
// exports.apdc_api = functions.https.onRequest(app);
