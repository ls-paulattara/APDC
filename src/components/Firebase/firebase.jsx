import app from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/database";
import "firebase/compat/analytics";
import "firebase/compat/performance";
import "firebase/compat/firestore";
import moment from "moment";

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
  }

  // *** Auth API - Create Account ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  // *** Auth API - EmailAuthProvider ***
  EmailAuthProviderCredential = (email, password) =>
    this.emailAuthProvider.credential(email, password);

  // *** Auth API - Sign In ***
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

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
  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

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
        const isValid =
          authUser.email.endsWith("@pieddecochon.ca") ||
          authUser.email.endsWith("@lightspeedhq.com");

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
    var myTimestamp = app.firestore.Timestamp.fromDate(new Date());
    // console.log(myTimestamp)

    let start2 = moment(start)
      .utcOffset("2021-07-22T11:23:15-04:00")
      .startOf("day")
      .toDate();
    let end2 = moment(end)
      .utcOffset("2021-07-22T11:23:15-04:00")
      .endOf("day")
      .toDate();
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
  // report 1 and 2
  getAllFirebaseOrdersByDateAndStatus = async (
    start,
    end,
    status,
    orderType,
    location
  ) => {
    var myTimestamp = app.firestore.Timestamp.fromDate(new Date());

    let start2 = moment(start)
      .utcOffset("2021-07-22T11:23:15-04:00")
      .startOf("day")
      .toDate();
    let end2 = moment(end)
      .utcOffset("2021-07-22T11:23:15-04:00")
      .endOf("day")
      .toDate();
    var jsonvalue = [];

    let query = this.firestore.collection(this.orderDB);
    if (orderType != "all") {
      query = query.where("type", "==", orderType);
    }
    if (status != "Any") {
      query = query.where("status", "==", status);
    }
    if (location != "Any") {
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
        console.log(jsonvalue);
        return jsonvalue;
      })
      .catch((error) => {
        console.log(error);
      }));
  };
  // report 7 and 8
  getAllFirebaseOrdersByDateAndCategoryAndStatus = async (
    start,
    end,
    status,
    category
  ) => {
    let start2 = moment(start)
      .utcOffset("2021-07-22T11:23:15-04:00")
      .startOf("day")
      .toDate();
    let end2 = moment(end)
      .utcOffset("2021-07-22T11:23:15-04:00")
      .endOf("day")
      .toDate();
    var jsonvalue = [];

    let query = this.firestore.collection(this.orderDB);
    if (status != "Any") {
      query = query.where("status", "==", status);
    }

    let filteredProducts;

    return (query = query
      .where("startTime", ">=", start2)
      .where("startTime", "<=", end2)
      .get()
      .then((snapshot) => {
        snapshot.forEach((docs) => {
          // let order = docs.data()
          // if(category !== 'any'){
          //   filteredProducts = order.products.filter(prod => /*prod.category !== undefined &&*/ prod.category == category)
          //   order.products = filteredProducts;
          //   if(order.products.length > 0){
          //     jsonvalue.push(order)
          //   }
          // }

          let order = docs.data();

          if (category !== "Any") {
            filteredProducts = order.products.filter(
              (prod) =>
                /*prod.category !== undefined &&*/ prod.category == category
            );
            // console.log(order.number, filteredProducts)
            order.products = filteredProducts;
            // console.log(order.number, order)
            if (order.products.length > 0) {
              jsonvalue.push(order);
            }
          } else {
            jsonvalue.push(order);
          }

          // docs.data().products.forEach((doc) => {
          //   if(category == 'any'){
          //     jsonvalue.push(doc);
          //   }
          //   else if(category != 'any' && doc.category !== undefined && doc.category == category){
          //     jsonvalue.push(doc);
          //   }
          // })
        });

        // console.log(jsonvalue);
        return jsonvalue;
      })
      .catch((error) => {
        console.log(error);
      }));
  };

  // report 9 and 10
  getAllFirebaseOrdersByDateAndCategoryAndStatusAndLocation = async (
    start,
    end,
    status,
    category,
    orderType,
    location
  ) => {
    let start2 = moment(start)
      .utcOffset("2021-07-22T11:23:15-04:00")
      .startOf("day")
      .toDate();
    let end2 = moment(end)
      .utcOffset("2021-07-22T11:23:15-04:00")
      .endOf("day")
      .toDate();
    var jsonvalue = [];

    let query = this.firestore.collection(this.orderDB);
    if (orderType != "all") {
      query = query.where("type", "==", orderType);
    }
    if (status != "Any") {
      query = query.where("status", "==", status);
    }
    if (location != "Any") {
      query = query.where("shipmentTitle", "==", location);
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
            filteredProducts = order.products.filter(
              (prod) =>
                /*prod.category !== undefined &&*/ prod.category == category
            );
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
  getAllFirebaseOrdersByOrderDateAndCategoryAndStatusAndCarrier = async (
    start,
    end,
    status,
    category,
    carrier
  ) => {
    let start2 = moment(start)
      .utcOffset("2021-07-22T11:23:15-04:00")
      .startOf("day")
      .toDate();
    let end2 = moment(end)
      .utcOffset("2021-07-22T11:23:15-04:00")
      .endOf("day")
      .toDate();
    var jsonvalue = [];

    let query = this.firestore.collection(this.orderDB);
    if (carrier != "Any") {
      query = query.where("type", "==", carrier);
    }
    if (status != "Any") {
      query = query.where("status", "==", status);
    }
    // if(category != 'any'){
    //   // query = query.where('category', '==', category);
    //   query = query.where("products", "array-contains", { category: category });

    // }

    let filteredProducts;

    return (query = query
      .where("createdAt", ">=", start2)
      .where("createdAt", "<=", end2)
      .get()
      .then((snapshot) => {
        snapshot.forEach((docs) => {
          let order = docs.data();

          if (category !== "Any") {
            filteredProducts = order.products.filter(
              (prod) =>
                /*prod.category !== undefined &&*/ prod.category == category
            );
            // console.log(order.number, filteredProducts)
            order.products = filteredProducts;
            // console.log(order.number, order)
            if (order.products.length > 0) {
              jsonvalue.push(order);
            }
          } else {
            jsonvalue.push(order);
          }

          // docs.data().products.forEach((doc) => {
          //   if(category == 'any'){
          //     jsonvalue.push(doc);
          //   }
          //   else if(category != 'any' && doc.category !== undefined && doc.category == category){
          //     jsonvalue.push(doc);
          //   }
          // })
        });

        // console.log(jsonvalue);
        return jsonvalue;
      })
      .catch((error) => {
        console.log(error);
      }));
  };
  getAllFirebaseOrdersByDateAndStatusAndNumber = async (
    start,
    end,
    status,
    orderType,
    location
  ) => {
    var myTimestamp = app.firestore.Timestamp.fromDate(new Date());

    let start2 = moment(start)
      .utcOffset("2021-07-22T11:23:15-04:00")
      .startOf("day")
      .toDate();
    let end2 = moment(end)
      .utcOffset("2021-07-22T11:23:15-04:00")
      .endOf("day")
      .toDate();
    var jsonvalue = [];

    let query = this.firestore.collection(this.orderDB);
    if (orderType != "all") {
      query = query.where("type", "==", orderType);
    }
    if (status != "Any") {
      query = query.where("status", "==", status);
    }
    if (location != "Any") {
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
        console.log(jsonvalue);
        return jsonvalue;
      })
      .catch((error) => {
        console.log(error);
      }));
  };
}

export default Firebase;
