exports.roleUpdate = require("./Realtime/roleUpdate");
exports.deleteUser = require("./Realtime/deleteUser");
const { addOrder, addCalendlyInfo } = require("./Firestore/order")
const functions = require("firebase-functions");
const {getCalendlyCredentials} = require("./SecretManager/index")

const app = require('express')();
app.post('/orders', addOrder);
app.post('/calendly', addCalendlyInfo);

exports.apcd_api = functions.https.onRequest(app);
// console.log(getCalendlyCredentials()) 