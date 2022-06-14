const axios = require("axios").default;
const { getLSAPICredentials, getLiveLSAPICredentials, getCalendlyCredentials } = require("../SecretManager/index");

const getLSOrders = async () => {
  let LS_APDC_CREDENTIALS = await getLSAPICredentials();
  let language = "en";

  // let LS_APDC_CREDENTIALS = await getLiveLSAPICredentials();
  // let language = "us";

  let getOrderEndpoint = `https://${LS_APDC_CREDENTIALS}@api.shoplightspeed.com/${language}/orders.json`;
  await axios({
    method: "get",
    url: getOrderEndpoint,
  }).then(async (response) => {
    console.log(response.data.orders);
  });
};

const getCalendlyBookings = async () => {
  const calendly_token = await getCalendlyCredentials();

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

  let getOrderEndpoint = `https://${LS_APDC_CREDENTIALS}@api.shoplightspeed.com/${language}/orders.json`;
  await axios({
    method: "get",
    url: getOrderEndpoint,
  }).then(async (response) => {
    console.log(response.data.orders);
  });
};

getLSOrders();
getCalendlyBookings();
