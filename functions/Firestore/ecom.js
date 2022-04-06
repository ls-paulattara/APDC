const axios = require("axios").default;
const { getLSAPICredentials, getLiveLSAPICredentials } = require("../SecretManager/index");

exports.getCategories = async (req, res) => {
  let LS_APDC_CREDENTIALS = await getLSAPICredentials();
  let language = "en";

  // let LS_APDC_CREDENTIALS = await getLiveLSAPICredentials();
  // let language = "us";

  let categories_endpoint = `https://${LS_APDC_CREDENTIALS}@api.shoplightspeed.com/${language}/categories.json`;

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
};

exports.getStatus = async (req, res) => {
  let LS_APDC_CREDENTIALS = await getLSAPICredentials();
  let language = "en";

  // let LS_APDC_CREDENTIALS = await getLiveLSAPICredentials();
  // let language = "us";

  let getStatusEndpoints = `https://${LS_APDC_CREDENTIALS}@api.shoplightspeed.com/${language}/orders/customstatuses.json`;

  axios({ method: "get", url: getStatusEndpoints })
    .then((response) => {
      let allStatutes = [];
      response.data.customStatuses.forEach((status) => {
        allStatutes.push(status.title);
      });
      res.status(200).json(allStatutes);
    })
    .catch((e) => {
      res.send(e.message);
    });
};
