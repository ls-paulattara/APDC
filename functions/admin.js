
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const firestore = admin.firestore();
const realtime = admin.database();
module.exports = {
  admin,
  realtime,
  firestore,
  functions,
};