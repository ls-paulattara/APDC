exports.roleUpdate = require("./Realtime/roleUpdate");
exports.deleteUser = require("./Realtime/deleteUser");
const { addOrder, addCalendlyInfo } = require("./Firestore/order")
const functions = require("firebase-functions");

const app = require('express')();

var cors = require('cors')
app.use(cors())

// app.post('/html-to-pdf', async (req, res) => {
// const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.setContent(req.body.html);
//   const buffer = await page.pdf({ format: "A4" });
//   await browser.close();
//   res.end(buffer);
// });

app.post('/orders', addOrder);
app.post('/calendly', addCalendlyInfo);

exports.apcd_api = functions.https.onRequest(app);
// console.log(getCalendlyCredentials()) 