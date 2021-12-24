// const { realtime } = require("../admin")

// exports.addOrder = (req, res) => {
//     const { id, number, status, email, firstname, lastname, updatedAt, createdAt, products } = req.body.order;
//     const orderObject = {
//         // id: orderCollection.id,
//         id,
//         number,
//         status,
//         email,
//         firstname,
//         lastname,
//         updatedAt,
//         createdAt,
//         products
//     };
//     realtime.ref(`orders/${id}`).set(orderObject, (err) => {
//         if(err){
//             console.error(err);
//             return res.status(500).json({ error: 'Something went wrong' });
//         }
//         else{
//             return res.json(orderObject);
//         }
//     })
// };

// exports.getOrders = async (req, res) => {
//     try{
//         orders = []
//         console.log("TEST2")
//         await realtime.ref(`orders`).get().then((doc) => {
//             if (doc.exists) {
//                 orders.push(doc.val());
//                 // console.log("Document data:", doc);
//             } else {
//                 // doc.data() will be undefined in this case
//                 console.log("No such document!");
//             }
//         })
//         res.status(200).json(orders);
//     } catch (error) {
//         res.status(500).send(error);
// }
// };

