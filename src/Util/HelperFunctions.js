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
  // let categoriesEndpoint = `https://us-central1-ls-strategic-apis.cloudfunctions.net/apcd_api/categories`;
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
  // let statusEndpoint = `https://us-central1-ls-strategic-apis.cloudfunctions.net/apcd_api/status`;
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

export const assignCategoriesToProducts = async (orders) => {
  let category_product = [];
  let categories = [];
  let categoriesProductsEndpoint = `https://us-central1-ls-strategic-apis.cloudfunctions.net/apdc_api/categories-products`;
  await axios({ method: "get", url: categoriesProductsEndpoint })
    .then((response) => {
      category_product = response.data;
    })
    .catch((err) => {
      console.log(err);
      return;
    });
  let categoriesEndpoint = `https://us-central1-ls-strategic-apis.cloudfunctions.net/apdc_api/categories-ids`;
  await axios({ method: "get", url: categoriesEndpoint })
    .then((response) => {
      categories = response.data;
    })
    .catch((err) => {
      console.log(err);
      return;
    });
  for (const order of orders) {
    if (!Array.isArray(order.products)) {
      order.products = [order.products];
    }
    for (const product of order.products) {
      const found = category_product.find((element) => element.product.resource.id === product.product.resource.id);
      if (found) {
        const found2 = categories.find((element) => element.id === found.category.resource.id);
        if (found2) {
          product.category = found2.fulltitle;
        }
      }
    }
  }
  return;
};

export const mergeProductsSameFormat = async (orderData) => {
  orderData.forEach((order) => {
    if (!Array.isArray(order.products)) {
      order.products = order.products.resource.embedded;
    }
  });
};
