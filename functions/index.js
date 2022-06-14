const { newUser, roleUpdate } = require("./Realtime/roleUpdate");
exports.newUser = newUser;
exports.roleUpdate = roleUpdate;
exports.deleteUser = require("./Realtime/deleteUser");

const { addOrder, addCalendlyInfo, getCalendlyLinks, isBooked } = require("./Firestore/order");
const { getCategories, getStatus, getProductsCategories, getCategoriesIDs } = require("./Firestore/ecom");
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
app.get("/categories-products", getProductsCategories);
app.get("/categories-ids", getCategoriesIDs);
app.get("/status", getStatus);

// exports.apcd_api = functions.https.onRequest(app); /* sandbox */
exports.apdc_api = functions.https.onRequest(app); /* live */
