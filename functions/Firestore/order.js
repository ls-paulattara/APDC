const { firestore } = require("../admin");
const axios = require('axios').default;
const { getLSAPICredentials, getCalendlyCredentials } = require("../SecretManager/index")

exports.addOrder = async (req, res) => {
    let { id, number, status, priceIncl, email, firstname, lastname, updatedAt, createdAt, products, shipmentTitle } = req.body.order;
    let type;

    if(shipmentTitle.includes("Pickup")){
        type = "pickup";
    }
    else if(shipmentTitle.includes("Delivery")){
        type = "delivery";
    }
    else if(shipmentTitle.includes("Default Shipping")){
        type = "mail";
    }
    let LS_APD_CREDENTIALS = await getLSAPICredentials()
    let categories_products_endpoint = `https://${LS_APD_CREDENTIALS}@api.shoplightspeed.com/en/categories/products.json`
    let categories_endpoint = `https://${LS_APD_CREDENTIALS}@api.shoplightspeed.com/en/categories`
    let category_product = [];

    await axios({ method:'get', url: categories_products_endpoint }).then((response) => {
        category_product = response.data.categoriesProducts;
    }).catch(() => {
        return; 
    });

    products = products.resource.embedded;

    for(const product of products){
        const found = category_product.find(element => element.product.resource.id == product.product.resource.id);
        if(found){
            console.log('FOUND1' + found)
            let categoryID = found.category.resource.id;
            await axios({ method:'get', url: `${categories_endpoint}/${categoryID}.json` }).then((response) => {
                product.category = response.data.category.fulltitle;
                console.log('foundd cat' + response.data.category.fulltitle)
            }).catch(() => {
                return; 
            });
        }
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
        products,
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
    const calendly_token = await getCalendlyCredentials();
    
    await axios({ method:'get', url: eventIdURL, headers: { "Authorization" : `Bearer ${calendly_token}` }}).then((response) => {
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