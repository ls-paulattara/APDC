const axios = require("axios").default;
const { getLSAPICredentials, getLiveLSAPICredentials } = require("../SecretManager/index");

exports.getCategories = async (req, res) => {
  // SANDBOX
  // const LS_APDC_CREDENTIALS = await getLSAPICredentials();
  // const language = "en";

  // LIVE
  const LS_APDC_CREDENTIALS = await getLiveLSAPICredentials();
  const language = "us";

  const categories_endpoint = `https://${LS_APDC_CREDENTIALS}@api.shoplightspeed.com/${language}/categories.json`;

  axios({ method: "get", url: categories_endpoint })
    .then((response) => {
      let allCat = [];
      let categories = response.data.categories;
      categories.forEach((cat) => {
        allCat.push(cat.title);
      });
      return res.status(200).json(allCat);
    })
    .catch((err) => {
      console.log(err);
      return res.send(e.message);
    });
};

exports.getProductsCategories = async (req, res) => {
  // SANDBOX
  // const LS_APDC_CREDENTIALS = await getLSAPICredentials();
  // const language = "en";

  // LIVE
  const LS_APDC_CREDENTIALS = await getLiveLSAPICredentials();
  const language = "us";

  const categories_endpoint = `https://${LS_APDC_CREDENTIALS}@api.shoplightspeed.com/${language}/categories/products.json`;

  axios({ method: "get", url: categories_endpoint })
    .then((response) => {
      return res.status(200).json(response.data.categoriesProducts);
    })
    .catch((err) => {
      console.log(err);
      return res.send(e.message);
    });
};

exports.getCategoriesIDs = async (req, res) => {
  // SANDBOX
  // const LS_APDC_CREDENTIALS = await getLSAPICredentials();
  // const language = "en";

  // LIVE
  const LS_APDC_CREDENTIALS = await getLiveLSAPICredentials();
  const language = "us";

  const categories_endpoint = `https://${LS_APDC_CREDENTIALS}@api.shoplightspeed.com/${language}/categories.json`;

  axios({ method: "get", url: categories_endpoint })
    .then((response) => {
      return res.status(200).json(response.data.categories);
    })
    .catch((err) => {
      console.log(err);
      return res.send(e.message);
    });
};

exports.getStatus = async (req, res) => {
  // SANDBOX
  // const LS_APDC_CREDENTIALS = await getLSAPICredentials();
  // const language = "en";

  // LIVE
  const LS_APDC_CREDENTIALS = await getLiveLSAPICredentials();
  const language = "us";

  const getStatusEndpoints = `https://${LS_APDC_CREDENTIALS}@api.shoplightspeed.com/${language}/orders/customstatuses.json`;

  axios({ method: "get", url: getStatusEndpoints })
    .then((response) => {
      let allStatutes = [];
      response.data.customStatuses.forEach((status) => {
        allStatutes.push(status.title);
      });
      return res.status(200).json(allStatutes);
    })
    .catch((err) => {
      console.log(err);
      return res.send(e.message);
    });
};
