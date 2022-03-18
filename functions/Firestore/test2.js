const axios = require("axios").default;

const { getLSAPICredentials, getLiveLSAPICredentials, getCalendlyCredentials } = require("../SecretManager/index");

var express = require("express");
var app = express();

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/categories", async (req, res) => {
  let LS_APDC_CREDENTIALS = await getLSAPICredentials();
  let categories_endpoint = `https://${LS_APDC_CREDENTIALS}@api.shoplightspeed.com/en/categories.json`;

  axios({ method: "get", url: categories_endpoint })
    .then((response) => {
      let allCat = [];
      let categories = response.data.categories;
      categories.forEach((cat) => {
        allCat.push(cat.title);
      });
      res.status(200).json(allCat);
    })
    .catch((e) => {
      res.send(e.message);
    });
});

app.listen(5000, function () {});
console.log("app listening");
