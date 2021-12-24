const { firestore } = require("../admin")
const axios = require('axios').default;

exports.addOrder = (req, res) => {
    const { id, number, status, priceIncl, email, firstname, lastname, updatedAt, createdAt, products, shipmentTitle } = req.body.order;
    let type;

    if(shipmentTitle.includes("Pickup")){
        type = "pickup"
    }
    else if(shipmentTitle.includes("Delivery")){
        type = "delivery"
    }

    const orderObject = {
        // id: orderCollection.id,
        id,
        number,
        status,
        totalPrice: priceIncl,
        email,
        firstname,
        lastname,
        updatedAt: new Date(updatedAt),
        createdAt: new Date(createdAt),
        products: products.resource.embedded,
        shipmentTitle,
        type
    }
    firestore.collection("orders").doc(String(id)).set(orderObject, {merge: true}).then(() => {
        return res.json(orderObject);
    }).catch(err => {
        console.error(err);
        return res.status(500).json({ error: 'Something went wrong' });
    })
};

exports.addCalendlyInfo = async (req, res) => {    
    res.status(200).send();

    const eventIdURL = req.body.payload.event;
    const orderID = req.body.payload.questions_and_answers[0]['answer'];

    const calendlyEventDetails = {
        startTime: '',
        locationName: ''
    }
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjM4ODE4NDUwLCJqdGkiOiJmY2I0ZjkyZC1kNTRhLTRkNWItOWVhMy05ZWM3ZDQwYmVmMzciLCJ1c2VyX3V1aWQiOiJFRENFR0o3WEdKTTVMN000In0.XFvqI511xLarGjllZFYhT96N1vlL-7EZMFsjF0aZiqg';
    
    await axios({ method:'get', url: eventIdURL, headers: { "Authorization" : `Bearer ${token}` }}).then((response) => {
        calendlyEventDetails.startTime = response.data.resource.start_time;
        calendlyEventDetails.locationName = response.data.resource.name;
    }).catch(() => {
        return; 
    });


    // calendly webhook hit only for pickup/delivery. depends on the location. so need to check if loc in list of known piclkups/delivery points
    // const zone = req.body.payload.event_type.name;
    // const orderID = req.body.questions_and_responses["2_response"];
    // console.log(orderID);
    // console.log(zone);
    // const orderID = 10064061;
    // firestore.collection("orders").doc(orderID).set({ test: "testt" }, { merge: true })
    firestore.collection("orders").doc(String(orderID)).update({ startTime: new Date(calendlyEventDetails.startTime), locationName: calendlyEventDetails.locationName });
    // .then(() => {
    //     return res.status(200).send("Modified order " + orderID + " sucessfully!");
    // }).catch(err => {
    //     console.error(err);
    //     return res.status(500).json({ error: 'Something went wrong' });
    // })
};