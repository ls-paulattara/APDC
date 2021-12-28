const { jsPDF } = require("jspdf");
const jspdfautotable = require('jspdf-autotable');
const Papa = require('papaparse');
const { compose } = require("recompose");

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
  // ["Total", totalPrice, count]
  let deliveryTotal = ["Total", 0,0];
  let pickupTotal = ["Total", 0,0];
  let mailTotal = ["Total", 0,0];
  let grandTotal = ["Grand Total", 0,0];

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

  const round = (num) => {
    return parseFloat(num.toFixed(2));
  }

  const getPrices = (value, type) => {
    Object.keys(value).forEach(function(key) {
     let prices = 0;
     let count = 0;
     for (let zone of value[key]) {
       const { totalPrice } = zone;
       prices += totalPrice;
       count += 1;
       switch(type){
         case "delivery":
           deliveryTotal[1] += totalPrice;
           deliveryTotal[2] += 1;
           break;
        case "pickup":
          pickupTotal[1] += totalPrice;
          pickupTotal[2] += 1;
           break;
        case "delivery":
          mailTotal[1] += totalPrice;
          mailTotal[2] += 1;
          break;
       }
     }
     grandTotal[1] += prices;
     grandTotal[2] += 1;
     value[key] = [prices, count]; 
   });
  }

  for (const [key, value] of Object.entries(dict)) {
    switch(key){
      case "Delivery":
        getPrices(value, "delivery");
        break;
      case "Pickup":
        getPrices(value, "pickup");
        break;
      case "Mail":
        getPrices(value, "mail");
        break;
    }
  }

  // for (const [key, value] of Object.entries(dict)) {
  // }

  console.log('dict', dict);

  const deliveryTable = Object.entries(dict["Delivery"]).map(item => [item[0], item[1][0], item[1][1]])
  const pickupTable = Object.entries(dict["Pickup"]).map(item => [item[0], item[1][0], item[1][1]])
  const mailTable = Object.entries(dict["Mail"]).map(item => [item[0], item[1][0], item[1][1]])
  console.log(deliveryTable)
  // deliveryTotal = deliveryTotal[1].toFixed(2);
  // pickupTotal = pickupTotal[1].toFixed(2);
  // mailTotal = mailTotal[1].toFixed(2);
  deliveryTable.push(deliveryTotal);
  pickupTable.push(pickupTotal);
  mailTable.push(mailTotal);

  const doc = new jsPDF()

  var width = doc.internal.pageSize.getWidth() - 28.0222222;
  
  // const width1 = 80;
  // const width2 = 51;
  // const width3 = 51;

  const width1 = 2 * width / 4;
  const width2 = 1 * width / 4;
  const width3 = 1 * width / 4;

  doc.text('Delivery', 14, 10);

  doc.autoTable({
    head: [['Zone', 'Total Price', 'Number of Orders']],
    body: deliveryTable,
    columnStyles: {
      0: {cellWidth: width1},
      1: {cellWidth: width2},
      2: {cellWidth: width3}
    },
    didParseCell: function (data) {
      var rows = data.table.body;
      if (data.row.index === rows.length - 1 && rows.length > 1) {
          // data.cell.styles.fillColor = [211, 211, 211];
          data.cell.styles.fontStyle = 'bold';
      }
    }
  });

  doc.text('Pickup', 14, doc.lastAutoTable.finalY + 10);
 
  doc.autoTable({
    head: [['Pickup Point', 'Total Price', 'Number of Orders']],
    body: pickupTable,
    startY: doc.lastAutoTable.finalY + 14,
    columnStyles: {
      0: {cellWidth: width1},
      1: {cellWidth: width2},
      2: {cellWidth: width3}
    },
    didParseCell: function (data) {
      var rows = data.table.body;
      if (data.row.index === rows.length - 1 && rows.length > 1) {
          // data.cell.styles.fillColor = [211, 211, 211];
          data.cell.styles.fontStyle = 'bold';
      }
    }
  });
  
  doc.text('Mail', 14, doc.lastAutoTable.finalY + 10);
  doc.autoTable({
    head: [['Mail', 'Total Price', 'Number of Orders']],
    body: mailTable,
    startY: doc.lastAutoTable.finalY + 14,
    columnStyles: {
      0: {cellWidth: width1},
      1: {cellWidth: width2},
      2: {cellWidth: width3}
    },
    didParseCell: function (data) {
      var rows = data.table.body;
      if (data.row.index === rows.length - 1) {
          // data.cell.styles.fillColor = [211, 211, 211];
          data.cell.styles.fontStyle = 'bold';
      }
    }
  });
  doc.text('Grand Total', 14, doc.lastAutoTable.finalY + 10);
  doc.autoTable({
    head: [['Total', 'Total Price', 'Number of Orders']],
    body: [grandTotal],
    startY: doc.lastAutoTable.finalY + 14,
    columnStyles: {
      0: {cellWidth: width1},
      1: {cellWidth: width2},
      2: {cellWidth: width3}
    },
    didParseCell: function (data) {
      var rows = data.table.body;
      if (data.row.index === rows.length - 1) {
          // data.cell.styles.fillColor = [211, 211, 211];
          data.cell.styles.fontStyle = 'bold';
      }
    }
  });

  var blob = doc.output('blob');
  
  const fileName = getFilenameByDate('3', 'pdf');
  doc.save(fileName);
  blob.name = fileName;

  return blob;

  // ------------- TO OPEN THE FILE IN NEW WINDOW --------------------------
  // var string = doc.output('datauristring');
  // var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
  // var x = window.open();
  // x.document.open();
  // x.document.write(embed);
  // x.document.close();
}

const getFilenameByDate = (report, type) => {
  let date = new Date();
  let current = date
    .toLocaleDateString()
    .concat("_", date.toLocaleTimeString("en-GB").replaceAll(":", "-")).replaceAll("/", "-");
  return `Report${report}_${current}.${type}`;
}

  // function to initialize an array of any dimension
function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }
    return arr;
}

exports.getReport7File = async(data) => {

  let outer = []
  data.forEach((order) => {
    order.products.forEach((product) => {
      const { quantityOrdered, productTitle } = product
      outer.push({
        "title": productTitle,
        "qty": quantityOrdered,
        "date": order.startTime.toDate().toLocaleDateString('en-US', { day: 'numeric', month: 'numeric' }).replaceAll('/', '-')
      })
    })
  });  

  console.log(outer);

  let header = [];
  let dict = {};

  let dates = [];
  let items = [];

  outer.forEach((item) => {
    dates.push(item.date);
    items.push(item.title);
  })

  dates = [...new Set(dates)];
  items = [...new Set(items)];
  header.push("Product", ...dates, "Total");

  outer.forEach((item) => {
    if(!dict[item.title]){
      dict[item.title] = [item];
    }
    else{
      dict[item.title].push(item);
    }
  })

  console.log(dict)

  // count the items for that day
  const getCellCount = (i, j) => {
    let count = 0;
    dict[items[i]].forEach((item) => {
      if(item.date == dates[j]){
        count += item.qty;
      }
    })
    return count;
  }

  // build 2D array
  let full = createArray(items.length, dates.length + 1)

  // populate the array with the counts for the items
  for(let i = 0; i < full.length; i++){
    for(let j = 0; j < full[i].length; j++){
      if(j == 0){
        full[i][j] = items[i];
      }
      else{
        full[i][j] = getCellCount(i, j - 1);
      }
    }
  }

  // add totals per row
  for(let i = 0; i < full.length; i++){
    let count = 0;
    for(let j = 1; j < full[i].length; j++){
      count += full[i][j];
    }
    full[i].push(count);
  }
  let totalLastRow = ["Total"];

  console.log(full);

  // add totals per column
  for(let i = 1; i < full[0].length; i++){ //error here
    let count = 0;
    for(let j = 0; j < full.length; j++){
      count += full[j][i];
    }
    totalLastRow.push(count);
  }

  full.push(totalLastRow);

  const doc = new jsPDF();
  var width = doc.internal.pageSize.getWidth() - 28.0222222;
  
  doc.text('Global Production', 14, 10);

  doc.autoTable({
    head: [header],
    body: full,
    didParseCell: function (data) {
      var rows = data.table.body;
      if (data.row.index === rows.length - 1 && rows.length > 1) {
          // data.cell.styles.fillColor = [211, 211, 211];
          data.cell.styles.fontStyle = 'bold';
      }
    }
  });
  
  var blob = doc.output('blob');
  
  const fileName = getFilenameByDate('7', 'pdf');
  doc.save(fileName);
  blob.name = fileName;

  return blob;
}

exports.getReport8File = async(data) => {

  let outer = []
  data.forEach((order) => {
    order.products.forEach((product) => {
      const { quantityOrdered, productTitle } = product
      outer.push({
        "title": productTitle,
        "qty": quantityOrdered,
      })
    })
  });  

  console.log(outer);

  let header = [];
  let dict = {};

  let items = [];
  let total = 0;

  // outer.forEach((item) => {
  //   items.push(item.title);
  // })

  // items = [...new Set(items)];
  header.push("Product", "Total");

  outer.forEach((item) => {
    if(!dict[item.title]){
      dict[item.title] = item.qty;
    }
    else{
      dict[item.title] += item.qty;
    }
    total += item.qty
  })

  dict = Object.entries(dict)

  console.log(dict)

  dict.push(["Total", total]);

  const doc = new jsPDF();
  
  doc.text('Total Production', 14, 10);

  doc.autoTable({
    head: [header],
    body: dict,
    didParseCell: function (data) {
      var rows = data.table.body;
      if (data.row.index === rows.length - 1 && rows.length > 1) {
          // data.cell.styles.fillColor = [211, 211, 211];
          data.cell.styles.fontStyle = 'bold';
      }
    }
  });
  
  var blob = doc.output('blob');
  
  const fileName = getFilenameByDate('8', 'pdf');
  doc.save(fileName);
  blob.name = fileName;

  return blob;
}