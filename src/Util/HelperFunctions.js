import axios from "axios";
import TRANSLATIONS from "../constants/translation";

export const getInitialDate = (date) => {
  if (date === "" || date === null || date === "null") {
    return;
  } else {
    return new Date(date);
  }
};

export const getDeliveryZones = async (firebase) => {
  let deliveryZones = await firebase.getLocationsByType("Delivery");
  deliveryZones = deliveryZones.map((loc, index) => {
    return {
      ...loc,
      key: index,
    };
  });
  return deliveryZones;
};

export const getDeliveryZonesWithAny = async (firebase) => {
  let deliveryZones = await firebase.getLocationsByType("Delivery");
  deliveryZones = deliveryZones.map((loc, index) => {
    return {
      ...loc,
      key: index,
    };
  });
  deliveryZones.unshift({ text: "Any", value: "Any", key: -1 });
  return deliveryZones;
};

export const getPickupPoints = async (firebase) => {
  let pickupPoints = await firebase.getLocationsByType("Pickup");
  pickupPoints = pickupPoints.map((loc, index) => {
    return {
      ...loc,
      key: index,
    };
  });
  return pickupPoints;
};

export const getPickupPointsWithAny = async (firebase) => {
  let pickupPoints = await firebase.getLocationsByType("Pickup");
  pickupPoints = pickupPoints.map((loc, index) => {
    return {
      ...loc,
      key: index,
    };
  });
  pickupPoints.unshift({ text: "Any", value: "Any", key: -1 });
  return pickupPoints;
};

export const getCategories = async () => {
  let categoriesEndpoint = `https://us-central1-ls-strategic-apis.cloudfunctions.net/apdc_api/categories`;
  return axios({ method: "get", url: categoriesEndpoint })
    .then((response) => {
      let res = [];
      res = response.data.map((cat, index) => {
        return {
          text: cat,
          value: cat,
          key: index,
        };
      });
      res.unshift({ text: "Any", value: "Any", key: -1 });

      return res;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const getOrderStatus = async () => {
  let statusEndpoint = `https://us-central1-ls-strategic-apis.cloudfunctions.net/apdc_api/status`;
  return axios({ method: "get", url: statusEndpoint })
    .then((response) => {
      let customStatus = [];
      customStatus = response.data.map((status, index) => {
        return {
          text: status,
          value: status,
          key: index + 12,
        };
      });

      const defaultStatus = TRANSLATIONS["EN"].REPORTS.orderStatus;

      return [...defaultStatus, ...customStatus];
    })
    .catch((err) => {
      console.log(err.message);
    });
};
