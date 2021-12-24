const { jsPDF } = require("jspdf");
const jspdfautotable = require('jspdf-autotable');
const Papa = require('papaparse');
const { compose } = require("recompose");

const doc = new jsPDF()


const deliveryZoneList = [ 
  "Zone 1: Montréal-Centre",
  "Zone 2: Rive-Sud",
  "Zone 3: Montréal Est",
  "Zone 4: Couronne-Nord", 
  "Zone 5: Montréal Ouest"
  ]       
const pickupPointList = [
  "Montreal",
  "Mirabel",
  "Québec Centre",
  "Victoriaville",
  "Drummondville",
  "Gatineau",
  "Granby",
  "Sherbrooke",
  "Lévis",
  "Buckingham",
  "Saint-Hull",
  "Shawinigan",
  "Mont-Tremblant",
  "Québec Marché"
  ]
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

exports.getReport1or2File = async(data, reportNumber) => {
  const outer = []
  console.log('before', data)

  data.forEach(item => {
        item.products.forEach(subitem => {
            const { id, number, createdAt, firstname, lastname, status, totalPrice, shipmentTitle, startTime } = item
            outer.push({
                id, number, createdAt, firstname, lastname, status, totalPrice, shipmentTitle, startTime,
                title: subitem.productTitle,
                quantity: subitem.quantityOrdered,
            })
        })
  })
  console.log('after', outer)

  const finalResults = outer.flat().map((item) => {

    const entry = {
        "ID": item.id,
        "Number": item.number,
        "Date Ordered": item.createdAt.toDate().toLocaleDateString() + '-' + item.createdAt.toDate().toLocaleTimeString(),
        "Delivery Date": item.startTime.toDate().toLocaleDateString(),
        "Delivery Zone": item.shipmentTitle,
        "First Name": item.firstname,
        "Last Name": item.lastname,
        "Total": formatter.format(Number(item.totalPrice)),
        "Status": item.status,
        "Title": item.title,
        "Quantity": item.quantity
    };
    return entry;
  });

    const csvConfig = {
        quotes: false, //or array of booleans
        quoteChar: '"',
        escapeChar: '"',
        delimiter: ",",
        header: true,
        newline: "\r\n",
        skipEmptyLines: false, //or 'greedy',
        columns: null, //or array of strings
      };

    var csv = Papa.unparse(finalResults, csvConfig);
    let date = new Date();
    let current = date
      .toLocaleDateString()
      .concat("_", date.toLocaleTimeString("en-GB").replaceAll(":", "-")).replaceAll("/", "-");
    const exportedFilename = `Report${reportNumber}_${current}.csv`;
    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, exportedFilename);
    } else {
      const link = document.createElement("a");
      if (link.download !== undefined) {
        // feature detection
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", exportedFilename);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
    blob.name = exportedFilename;
    return blob;
}

exports.getReport3File = async(data) => {

  var dict = {
    "Pickup": {
      "Sherbrooke": [],
      "Downtown Montreal": [],
      "Buckingham": [],
      "Victoriaville": [],
      "Sherbrooke": []
    },
    "Delivery":{
      "Montreal": [],
      "Montreal Ouest": [],
      "Rive-Sud": []
    },
    "Mail": []
  };

  data.forEach(item => {
    const { id, totalPrice, type, shipmentTitle} = item;
    switch(type){
      case "pickup":
        switch(shipmentTitle){
          case "Pickup: Fine et Fûtés - Buckingham":
            dict["Pickup"]["Buckingham"].push(item);
            break;
          case "Pickup: Downtown Montreal - 540 avenue Duluth Est":
            dict["Pickup"]["Downtown Montreal"].push(item);
            break;
          case "Pickup: Victoriaville":
            dict["Pickup"]["Victoriaville"].push(item);
            break;
          case "Pickup: Sherbrooke":
            dict["Pickup"]["Sherbrooke"].push(item);
            break;
          // case "Pickup: Downtown Montreal":
          //   dict["Pickup"]["Sherbrooke"].push(item);
          case "Pickup: Bistro Le Lux - Victoriaville":
            dict["Pickup"]["Victoriaville"].push(item);
            break;
        }
        break;
      case "delivery":
        switch(shipmentTitle){      
          case "Delivery at Home in Montréal":
            dict["Delivery"]["Montreal"].push(item);
            break;
          case "Delivery at Home in Rive-Sud":
            dict["Delivery"]["Rive-Sud"].push(item);
            break;
          case "Delivery at home in Montreal Ouest":
            dict["Delivery"]["Montreal Ouest"].push(item);
            break;
        }
        break;
      case "mail":
        dict["Mail"].push(item);
    }
  })

  const getPrices = (value) => {
    Object.keys(value).forEach(function(key) {
     let prices = 0;
     let count = 0;
     for (let zone of value[key]) {
       const { totalPrice } = zone;
       prices += totalPrice;
       count += 1;
     }
     value[key] = [prices, count]; 
   });
  }

  for (const [key, value] of Object.entries(dict)) {
    switch(key){
      case "Delivery":
        getPrices(value);
        break;
      case "Pickup":
        getPrices(value);
        break;
      case "Mail":
        getPrices(value);
        break;
    }
  }

  // console.log('after', dict["Delivery"]["Montreal"]);
  // for (const [key, value] of Object.entries(dict)) {
  //   console.log(value)
  // }
  console.log('dict', dict);

  const deliveryTable = Object.entries(dict["Delivery"]).map(item => [item[0], item[1][0], item[1][1]])
  const pickupTable = Object.entries(dict["Pickup"]).map(item => [item[0], item[1][0], item[1][1]])

  doc.text('Delivery', 14, 10)

  doc.autoTable({
    head: [['Zone', 'Total Price', 'Number of Orders']],
    body: deliveryTable,
    // foot: [["test"]]
  })

  doc.text('Pickup', 14, doc.lastAutoTable.finalY + 10)
 
  doc.autoTable({
    head: [['Zone', 'Total Price', 'Number of Orders']],
    body: pickupTable,
    startY: doc.lastAutoTable.finalY + 14,
  })



  doc.save('table.pdf');
  var blob = doc.output('blob');

  // ------------- TO OPEN THE FILE IN NEW WINDOW --------------------------
  // var string = doc.output('datauristring');
  // var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
  // var x = window.open();
  // x.document.open();
  // x.document.write(embed);
  // x.document.close();

  let date = new Date();
  let current = date
    .toLocaleDateString()
    .concat("_", date.toLocaleTimeString("en-GB").replaceAll(":", "-")).replaceAll("/", "-");
  const exportedFilename = `Report3_${current}.pdf`;
  
  blob.name = exportedFilename;
  return blob;
}