const Firebase = require("../components/Firebase")
// import Firebase from "../components/Firebase";
// 1. shipment_title in my account
// 2. get firebase instance in this class
// 3. get orders by filters
// firestore save as date object and filter/index on dates
// realtime only json tree no object types
// try firestore just for orders

exports.generateReport1 = async (reportValues) => {
    console.log(Firebase)


    Firebase.users().on("value", (snapshot) => {
        const usersObject = snapshot.val();
        const usersList = Object.keys(usersObject).map((key) => ({
          ...usersObject[key],
          uid: key,
        }));
        console.log(usersList)
      });

}
    


