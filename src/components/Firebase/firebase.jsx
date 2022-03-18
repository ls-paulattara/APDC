import app from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/database";
import "firebase/compat/analytics";
import "firebase/compat/performance";
import "firebase/compat/firestore";
import moment from "moment";
import { writeBatch, doc, getDoc } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBjcCwGxtYKqX6Q0-Uffd5kk5MM8Jzq8s",
  authDomain: "ls-strategic-apis.firebaseapp.com",
  databaseURL: "https://ls-strategic-apis.firebaseio.com",
  // databaseURL: 'http://localhost:9000/?ns=ls-strategic-apis',
  projectId: "ls-strategic-apis",
  storageBucket: "ls-strategic-apis.appspot.com",
  messagingSenderId: "929241011807",
  appId: "1:929241011807:web:d654a13721d7632d0b2dea",
};
class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.emailAuthProvider = app.auth.EmailAuthProvider;
    this.auth = app.auth();
    this.db = app.database();
    this.firestore = app.firestore();
    this.storage = app.storage();
    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.analytics = app.analytics();
    this.performance = app.performance();
    this.orderDB = "orders";
    this.locationsDB = "apdc_locations";
  }

  // *** Auth API - Create Account ***
  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  // *** Auth API - EmailAuthProvider ***
  EmailAuthProviderCredential = (email, password) => this.emailAuthProvider.credential(email, password);

  // *** Auth API - Sign In ***
  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  // *** AUTH API - Sign In With Google ***
  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  deleteCurrentSignInAttempt = () => this.auth.currentUser.delete();

  // *** Auth API - UpdateUser
  updateProfile = ({ displayName, phoneNumber }) =>
    this.auth.currentUser.updateProfile({
      displayName: displayName,
      phoneNumber: phoneNumber,
    });

  // *** AUTH API - currentUser
  currentUser = () => this.auth.currentUser;

  // *** Auth API - Sign In ***
  doSignOut = () => this.auth.signOut();

  // *** Auth API - Password Reset ***
  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  // *** Auth API - Password Update ***
  doPasswordUpdate = (password) => this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(async (authUser) => {
      const timeout = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
      };
      // console.log(authUser);

      // detect if the sign in was cancelled. If so, then exit
      // if (authUser == null) {
      //   return;
      // }

      if (authUser) {
        const isValid = authUser.email.endsWith("@pieddecochon.ca") || authUser.email.endsWith("@lightspeedhq.com");

        if (!isValid) {
          return;
        }
        const userRef = this.user(authUser.uid);
        await timeout(1000);
        // console.log("i waited");
        const userGet = await userRef.get();
        const dbUser = await userGet.val();
        if (dbUser === null) {
          fallback();
        } else {
          if (!Object.prototype.hasOwnProperty.call(dbUser, "roles")) {
            dbUser.roles = {};
          }
          authUser = {
            uid: authUser.uid,
            email: authUser.email,
            metadata: authUser.metadata,
            displayName: authUser.displayName,
            providerData: authUser.providerData[0],
            ...dbUser,
          };
          next(authUser);
        }
      } else {
        fallback();
      }
    });

  // *** User API - UID Ref ***
  user = (uid) => this.db.ref(`users/${uid}`);

  locations = () => this.firestore.collection(this.locationsDB);

  // *** User API - all Users ***
  users = () => this.db.ref("users");

  // orderDB = "orders";
  // orderDB = "apdc_orders";

  // ORDERS
  orders = () => this.db.ref(this.orderDB);

  storageRef = () => this.storage.ref();

  // *** Storage API - Reference File ***
  fileRef = (path) => this.storage.ref(path);

  saveReportToFirebase = async (file) => {
    var metadata = {
      contentType: file.type,
    };
    let urlToDownload = "";

    return this.storage
      .ref()
      .child("Reports/" + file.name)
      .put(file, metadata)
      .then(function (snapshot) {
        console.log("Uploaded", snapshot.totalBytes, "bytes.");
        // console.log('File metadata:', snapshot.metadata);
        return snapshot.ref.getDownloadURL().then(function (url) {
          urlToDownload = url;
          console.log("File available at", url);
          // document.getElementById('linkbox').innerHTML = '<a href="' +  url + '">Click For File</a>';
          return urlToDownload;
        });
      })
      .catch(function (error) {
        console.error("Upload failed:", error);
      });
  };

  getAllUsers = () => {
    return this.db.ref("users").once("value", (snapshot) => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));
      console.log(usersList);
    });
  };

  // report 3
  getAllFirebaseOrdersByDate = async (start, end) => {
    let start2 = moment(start).utcOffset("2021-07-22T11:23:15-04:00").startOf("day").toDate();
    let end2 = moment(end).utcOffset("2021-07-22T11:23:15-04:00").endOf("day").toDate();
    var jsonvalue = [];

    return this.firestore
      .collection(this.orderDB)
      .where("createdAt", ">=", start2)
      .where("createdAt", "<=", end2)
      .get()
      .then((snapshot) => {
        snapshot.forEach((docs) => {
          jsonvalue.push(docs.data());
        });
        // console.log(jsonvalue);
        return jsonvalue;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // report 1,2,4,12,13
  getAllFirebaseOrdersByDateAndStatus = async (start, end, status, orderType, location) => {
    let start2 = moment(start).utcOffset("2021-07-22T11:23:15-04:00").startOf("day").toDate();
    let end2 = moment(end).utcOffset("2021-07-22T11:23:15-04:00").endOf("day").toDate();
    var jsonvalue = [];

    let query = this.firestore.collection(this.orderDB);
    if (orderType !== "all") {
      query = query.where("type", "==", orderType);
    }
    if (status !== "Any") {
      query = query.where("status", "==", status);
    }
    if (location !== "Any") {
      query = query.where("shipmentTitle", "==", location);
    }

    return (query = query
      .where("startTime", ">=", start2)
      .where("startTime", "<=", end2)
      .get()
      .then((snapshot) => {
        snapshot.forEach((docs) => {
          jsonvalue.push(docs.data());
        });
        // console.log(jsonvalue);
        return jsonvalue;
      })
      .catch((error) => {
        console.log(error);
      }));
  };
  // report 14
  getAllMailOrdersByDateCreated = async (start, end, status, orderType) => {
    let start2 = moment(start).utcOffset("2021-07-22T11:23:15-04:00").startOf("day").toDate();
    let end2 = moment(end).utcOffset("2021-07-22T11:23:15-04:00").endOf("day").toDate();
    var jsonvalue = [];

    let query = this.firestore.collection(this.orderDB);
    if (status !== "Any") {
      query = query.where("status", "==", status);
    }

    return (query = query
      .where("createdAt", ">=", start2)
      .where("createdAt", "<=", end2)
      .where("type", "==", orderType)
      .get()
      .then((snapshot) => {
        snapshot.forEach((docs) => {
          jsonvalue.push(docs.data());
        });
        // console.log(jsonvalue);
        return jsonvalue;
      })
      .catch((error) => {
        console.log(error);
      }));
  };

  getAllFirebaseOrdersByDateAndCategoryAndStatus = async (start, end, status, category) => {
    let start2 = moment(start).utcOffset("2021-07-22T11:23:15-04:00").startOf("day").toDate();
    let end2 = moment(end).utcOffset("2021-07-22T11:23:15-04:00").endOf("day").toDate();
    var jsonvalue = [];

    let query = this.firestore.collection(this.orderDB);
    if (status !== "Any") {
      query = query.where("status", "==", status);
    }

    let filteredProducts;

    return (query = query
      .where("startTime", ">=", start2)
      .where("startTime", "<=", end2)
      .get()
      .then((snapshot) => {
        snapshot.forEach((docs) => {
          let order = docs.data();

          if (category !== "Any") {
            filteredProducts = order.products.filter((prod) => /*prod.category !== undefined &&*/ prod.category === category);
            // console.log(order.number, filteredProducts)
            order.products = filteredProducts;
            // console.log(order.number, order)
            if (order.products.length > 0) {
              jsonvalue.push(order);
            }
          } else {
            jsonvalue.push(order);
          }
        });

        // console.log(jsonvalue);
        return jsonvalue;
      })
      .catch((error) => {
        console.log(error);
      }));
  };

  // report 6, 9 and 10
  getAllFirebaseOrdersByDateAndCategoryAndStatusAndLocation = async (start, end, status, category, orderType, location) => {
    let start2 = moment(start).utcOffset("2021-07-22T11:23:15-04:00").startOf("day").toDate();
    let end2 = moment(end).utcOffset("2021-07-22T11:23:15-04:00").endOf("day").toDate();
    var jsonvalue = [];

    let query = this.firestore.collection(this.orderDB);
    if (orderType !== "all") {
      query = query.where("type", "==", orderType);
    }
    if (status !== "Any") {
      query = query.where("status", "==", status);
    }
    if (location !== "Any") {
      query = query.where("shipmentTitle", "==", location);
      // query = query.where("shipmentTitle", ">=", location).where("shipmentTitle", "<=", location + "\uf8ff"); // this line checks for substring of location. So if location is rive sud zone 2, searching only rive sud will match https://stackoverflow.com/questions/46568142/google-firestore-query-on-substring-of-a-property-value-text-search#comment80093410_46568525
    }
    let filteredProducts;

    return (query = query
      .where("startTime", ">=", start2)
      .where("startTime", "<=", end2)
      .get()
      .then((snapshot) => {
        snapshot.forEach((docs) => {
          let order = docs.data();

          if (category !== "Any") {
            filteredProducts = order.products.filter((prod) => /*prod.category !== undefined &&*/ prod.category === category);
            // console.log(order.number, filteredProducts)
            order.products = filteredProducts;
            // console.log(order.number, order)
            if (order.products.length > 0) {
              jsonvalue.push(order);
            }
          } else {
            jsonvalue.push(order);
          }
        });
        return jsonvalue;
      })
      .catch((error) => {
        console.log(error);
      }));
  };

  // report 11
  getAllFirebaseOrdersByOrderDateAndCategoryAndStatusAndCarrier = async (start, end, status, category, carrier) => {
    let start2 = moment(start).utcOffset("2021-07-22T11:23:15-04:00").startOf("day").toDate();
    let end2 = moment(end).utcOffset("2021-07-22T11:23:15-04:00").endOf("day").toDate();
    var jsonvalue = [];

    let query = this.firestore.collection(this.orderDB);
    if (carrier !== "Any") {
      query = query.where("type", "==", carrier);
    }
    if (status !== "Any") {
      query = query.where("status", "==", status);
    }

    let filteredProducts;

    return (query = query
      .where("createdAt", ">=", start2)
      .where("createdAt", "<=", end2)
      .get()
      .then((snapshot) => {
        snapshot.forEach((docs) => {
          let order = docs.data();

          if (category !== "Any") {
            filteredProducts = order.products.filter((prod) => /*prod.category !== undefined &&*/ prod.category === category);
            // console.log(order.number, filteredProducts)
            order.products = filteredProducts;
            // console.log(order.number, order)
            if (order.products.length > 0) {
              jsonvalue.push(order);
            }
          } else {
            jsonvalue.push(order);
          }
        });

        // console.log(jsonvalue);
        return jsonvalue;
      })
      .catch((error) => {
        console.log(error);
      }));
  };
  getAllFirebaseOrdersByDateAndStatusAndNumber = async (start, end, status, orderType, location) => {
    let start2 = moment(start).utcOffset("2021-07-22T11:23:15-04:00").startOf("day").toDate();
    let end2 = moment(end).utcOffset("2021-07-22T11:23:15-04:00").endOf("day").toDate();
    var jsonvalue = [];

    let query = this.firestore.collection(this.orderDB);
    if (orderType !== "all") {
      query = query.where("type", "==", orderType);
    }
    if (status !== "Any") {
      query = query.where("status", "==", status);
    }
    if (location !== "Any") {
      query = query.where("shipmentTitle", "==", location);
    }

    return (query = query
      .where("startTime", ">=", start2)
      .where("startTime", "<=", end2)
      .get()
      .then((snapshot) => {
        snapshot.forEach((docs) => {
          jsonvalue.push(docs.data());
        });
        // console.log(jsonvalue);
        return jsonvalue;
      })
      .catch((error) => {
        console.log(error);
      }));
  };

  selectProps = (...props) => {
    return function (obj) {
      const newObj = {};
      props.forEach((name) => {
        newObj[name] = obj[name];
      });

      return newObj;
    };
  };

  pushRoutificRoutesToOrders = async (routificData) => {
    console.log(routificData);
    const propertiesKept = ['"ID"', "Driver Name", "Stop Number"]; // ID instead of visit name
    let trimmedArray = routificData.map(this.selectProps(...propertiesKept));
    trimmedArray = trimmedArray.filter((item) => {
      return item['"ID"'] !== "" && item["Stop Number"] > 0 && item["Driver Name"] !== "";
    });
    // need return false
    console.log(trimmedArray);
    let foundAtLeastOne = false;
    for (const item of trimmedArray) {
      // let id = (await this.firestore.collection(this.orderDB).where("number", "==", item["Visit Name"]).get()).docs[0].id;
      console.log("processing", item);
      await this.firestore
        .collection(this.orderDB)
        .where("number", "==", item['"ID"'])
        .get()
        .then((snap) => {
          console.log(snap);
          if (snap.docs[0].exists) {
            item.db_ID = snap.docs[0].id;
            foundAtLeastOne = true;
            console.log(item.db_ID);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (!foundAtLeastOne) {
      console.log("false");
      return false;
    }
    console.log("new trim", trimmedArray);

    // Get a new write batch
    const db = this.firestore;
    const batch = writeBatch(db);

    trimmedArray.forEach((entry) => {
      let ref = doc(db, this.orderDB, String(entry.db_ID));
      if (entry.db_ID) {
        console.log("setting", entry.db_ID);
        batch.set(ref, { driver: entry["Driver Name"], stopNumber: entry["Stop Number"] }, { merge: true });
      }
    });

    // Commit the batch
    await batch.commit();
    return true;
  };

  uploadInitialDeliveryZones = async () => {
    let deliveryZoneWithoutAny = [
      {
        text: "Zone 1: Montréal-Centre",
        value: "Delivery at Home in Montréal-Centre Zone 1",
        link: "https://calendly.com/au-pied-de-cochon/zone-1-montreal-centre",
      },
      {
        text: "Zone 2: Rive-Sud",
        value: "Delivery at Home in Rive-Sud Zone 2",
        link: "https://calendly.com/au-pied-de-cochon/zone-2-rive-sud",
      },
      {
        text: "Zone 3: Montréal Est",
        value: "Delivery at Home in Montréal Est Zone 3",
        link: "https://calendly.com/au-pied-de-cochon/zone-3-montreal-est",
      },
      {
        text: "Zone 4: Couronne-Nord",
        value: "Delivery at home in Couronne-Nord Zone 4",
        link: "https://calendly.com/au-pied-de-cochon/zone-4-couronne-nord",
      },
      {
        text: "Zone 5: Montréal Ouest",
        value: "Delivery at home in Montreal Ouest Zone 5",
        link: "https://calendly.com/au-pied-de-cochon/zone-5-montreal-ouest",
      },
    ];

    await this.firestore
      .collection(this.locationsDB)
      .doc("Delivery")
      .set({ ...deliveryZoneWithoutAny })
      .catch((error) => {
        console.log(error);
      });
  };

  uploadInitialPickupPoints = async () => {
    let pickupPointWithoutAny = [
      {
        text: "Victoriaville",
        value: "Pickup: Bistro Le Lux - Victoriaville",
        link: "https://calendly.com/au-pied-de-cochon/victoriaville",
      },
      {
        text: "Downtown Montreal",
        value: "Pickup: Downtown Montreal - 540 avenue Duluth Est",
        link: "https://calendly.com/au-pied-de-cochon/downtown-montreal-pickup-location",
      },
      {
        text: "Mirabel",
        value: "Pickup: Cabane à Sucre Au Pied de Cochon - Mirabel",
        link: "https://calendly.com/au-pied-de-cochon/mirabel",
      },
      {
        text: "Mont-Tremblant",
        value: "Pickup: Café et Bistro La Sandwicherie - Mont-Tremblant",
        link: "https://calendly.com/au-pied-de-cochon/mont-tremblant",
      },
      {
        text: "Québec Grand Marché",
        value: "Le Grand Marché de Québec - Québec City",
        link: "https://calendly.com/au-pied-de-cochon/grand-marche-quebec",
      },
      {
        text: "Lévis",
        value: "Pickup: Centre des congrès de Lévis - Lévis",
        link: "https://calendly.com/au-pied-de-cochon/levis",
      },
      {
        text: "Drummondville",
        value: "Pickup: Doyon Després - Drummondville",
        link: "https://calendly.com/au-pied-de-cochon/drummondville",
      },
      { text: "Granby", value: "Pickup: Doyon Després - Granby", link: "https://calendly.com/au-pied-de-cochon/granby" },
      {
        text: "Buckingham",
        value: "Pickup: Fine et Fûtés - Buckingham",
        link: "https://calendly.com/au-pied-de-cochon/buckingham",
      },
      {
        text: "Saint-Hull",
        value: "Pickup: La Boîte à Grains - Hull",
        link: "https://calendly.com/au-pied-de-cochon/hull",
      },
      {
        text: "Québec Centre Commercial",
        value: "Pickup: Centre commercial Fleur de Lys - Quebec City",
        link: "https://calendly.com/au-pied-de-cochon/quebec-centre-commercial-fleur-de-lys",
      },
      { text: "Saint-Saveur", value: "Pickup: Saint-Sauveur", link: "https://calendly.com/au-pied-de-cochon/saint-sauveur" },
      { text: "Shawinigan", value: "Pickup: Shawinigan", link: "https://calendly.com/au-pied-de-cochon/shawinigan" },
      { text: "Sherbrooke", value: "Pickup: Sherbrooke", link: "https://calendly.com/au-pied-de-cochon/sherbrooke" },
      { text: "Gatineau", value: "Pickup: Victoriaville", link: "https://calendly.com/au-pied-de-cochon/gatineau" },
    ];

    await this.firestore
      .collection(this.locationsDB)
      .doc("Pickup")
      .set({ ...pickupPointWithoutAny })
      .catch((error) => {
        console.log(error);
      });
  };

  updateLocations = async (loc, type) => {
    // remove keys from locations
    loc = loc.map((loc) => {
      return {
        text: loc.text,
        value: loc.value,
        link: loc.link,
      };
    });
    await this.firestore
      .collection(this.locationsDB)
      // .doc("Delivery")
      // .set({ ...deliveryZoneWithoutAny })
      .doc(type)
      .set({ ...loc })
      .catch((error) => {
        console.log(error);
      });
    // console.log(locations);
  };

  getLocationsByType = async (type) => {
    let res;
    return this.firestore
      .collection(this.locationsDB)
      .get()
      .then((snapshot) => {
        snapshot.forEach((docs) => {
          if (docs.id === type) {
            res = docs.data();
          }
        });
        // convert to array
        return Object.keys(res).map((key) => res[key]);
      });
  };

  getAllLocations = async () => {
    let res = [];
    return this.firestore
      .collection(this.locationsDB)
      .get()
      .then((snapshot) => {
        console.log(snapshot.docs);
        snapshot.forEach((docs) => {
          if (docs.id === "Delivery" || docs.id === "Pickup") {
            res.push(docs.data());
          }
        });
        // convert to array
        return [...Object.keys(res[0]).map((key) => res[0][key]), ...Object.keys(res[1]).map((key) => res[1][key])];
      });
  };
}

export default Firebase;
