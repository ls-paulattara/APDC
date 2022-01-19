import apdc_logo_banner from "../media/logo.png"
import apdc_logo from "../media/apdc-font-logo.png"
import qc_logo from "../media/qc-logo.png"
import cochon_cart from "../media/cochon-cart.jpeg"

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

export const getReport1or2File = async(data, reportNumber) => {
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

export const getReport1or2FileOLD = async(data, reportNumber) => {
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

export const getReport3File = async(data) => {

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
        // case "mail":
        //   mailTotal[1] += totalPrice;
        //   mailTotal[2] += 1;
        //   break;
       }
     }
    //  grandTotal[1] += prices;
    //  grandTotal[2] += 1;
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
        // getPrices(value, "mail");
        let prices = 0;
        dict["Mail"].forEach((item) => {
          const price = item.totalPrice
          mailTotal[1] += price
          mailTotal[2] += 1
          // grandTotal[1] += prices;
          // grandTotal[2] += 1;
        });
        
        break;
    }
  }

  console.log('dict', dict);

  const deliveryTable = Object.entries(dict["Delivery"]).map(item => [item[0], item[1][0], item[1][1]])
  const pickupTable = Object.entries(dict["Pickup"]).map(item => [item[0], item[1][0], item[1][1]])
  const mailTable = [["Purolator", mailTotal[1], mailTotal[2]], mailTotal]

  // deliveryTotal = deliveryTotal[1].toFixed(2);
  // pickupTotal = pickupTotal[1].toFixed(2);
  // mailTotal = mailTotal[1].toFixed(2);

  deliveryTable.push(deliveryTotal);
  pickupTable.push(pickupTotal);

  grandTotal[1] = deliveryTotal[1] + pickupTotal[1] + mailTotal[1]
  grandTotal[2] = deliveryTotal[2] + pickupTotal[2] + mailTotal[2]
  console.log(grandTotal)

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

export const getReport7or9or10File = async(data, reportNumber) => {

  let outer = []
  data.forEach((order)=> {
  order.products.forEach((product) => {
    const { quantityOrdered, productTitle } = product
    outer.push({
      "title": productTitle,
      "qty": quantityOrdered,
      "date": order.startTime.toDate().toLocaleDateString('en-US', { day: 'numeric', month: 'numeric' }).replaceAll('/', '-')
    })
  })
})

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
  
  const fileName = getFilenameByDate(reportNumber, 'pdf');
  doc.save(fileName);
  blob.name = fileName;

  return blob;
}

export const getReport8or11File = async(data, orderNumber) => {
  
  let outer = []
  data.forEach((order) => {
  
  order.products.forEach((product) => {
    const { quantityOrdered, productTitle } = product
    outer.push({
      "title": productTitle,
      "qty": quantityOrdered,
    })
  })
  })

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
  
  const fileName = getFilenameByDate(orderNumber, 'pdf');
  doc.save(fileName);
  blob.name = fileName;

  return blob;
}
export const getReport12File = (data) => {
  // let mainDiv = document.createElement('div');
  // mainDiv.id = "mainDIV";
  let outerDiv = [];
  
  // let innerDiv = []
  data.forEach((orderDetails) => {
    outerDiv.push(getReport12SinglePage(orderDetails))
  //   console.log(getReport12SinglePage(orderDetails))
  //   let temp = document.createElement("div");
  //   mainDiv.appendChild(document.createTextNode(getReport12SinglePage(orderDetails)));
  //   console.log(temp)
    // mainDiv.appendChild(getReport12SinglePage(orderDetails));
    // innerDiv.push(getReport12SinglePage(orderDetails))
  })
  console.log(outerDiv[0])
  // outerDiv.push(innerDiv)

  return outerDiv//.map((pageDiv) => pageDiv);
}

export const getReport12SinglePage = (orderDetails) => {
    return(

  <div 
    id={orderDetails.id}
    key={orderDetails.id}
    style={{
    height: 792,
    width: 612,
    padding: 'none',
    backgroundColor: 'white',
    boxShadow: '5px 5px 5px black',
    margin: 'auto',
    overflowX: 'hidden',
    overflowY: 'hidden',
    position: 'relative'
  }}
  >
    {/* <p style={{marginTop:'20px', textAlign:'center', fontFamily:"cursive", fontSize:'50px'}}>Au Pied De Cochon</p> */}
    <img style={{marginTop:'30px', width:'600px'}} src={apdc_logo_banner}></img>
    {/* <img style={{marginTop:'20px'}} src={apdc_logo}></img> */}
    {/* <hr style={{marginTop:'20px',height: '0.1px', marginLeft: "90px",width:'70%',textAlign:'left'}}></hr>
    <h2 style={{marginTop:'-10px', textAlign: 'center'}}><pre>A U  P I E D  D E  C O C H O N</pre></h2>
    <hr style={{marginTop:'-10px', marginLeft: "90px",width:'70%',textAlign:'left'}}></hr> */}
    
    <br></br>
    <br></br>
    <div style={{marginLeft: '60px'}}>
    <div style={{position: "static", width:'80%', padding: "0", margin: "0"}}>
      <div style={{display: "block", float: "left"}}>
        <p><b>Adresses de livraison et facturation</b></p>
        <span>{orderDetails.firstname}</span>
        {/* <span>First Last Name</span> */}
        <div style={{marginTop: '-4px'}}></div>
        <span>address1</span>
        <div style={{marginTop: '-4px'}}></div>
        <span>address2</span>
        <div style={{marginTop: '-4px'}}></div>
        <span>city</span>
        <div style={{marginTop: '-4px'}}></div>
        <span>country</span>
        <div style={{marginTop: '-4px'}}></div>
        <span> phone number</span>
      </div>
      <div style={{ display: "block", float: "right"}}>
        <img style={{width:'130px', height:'130px'}} src={cochon_cart}></img>
      </div>
    </div>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <hr style={{width:'88%',textAlign:'left',marginLeft:'0'}}></hr>
    
    <div style={{content:'', display: 'table', clear: 'both', width: '100%'}}>
      <div style={{float:'left', width:'33.33%'}}><b>Ref de commande</b></div>
      <div style={{float:'left', width:'33.33%'}}><b>Date de commande</b></div>
      <div style={{float:'left', width:'33.33%'}}><b>Transporteur</b></div>
    </div>

    <div style={{content:'', display: 'table', clear: 'both', width: '100%', marginLeft:'10px'}}>
      <div style={{float:'left', width:'33.33%'}}>commande #</div>
      <div style={{float:'left', width:'33.33%'}}>date commande</div>
      <div style={{float:'left', width:'33.33%'}}>Livraison/Delivery</div>
    </div>
    <hr style={{width:'88%',textAlign:'left',marginLeft:'0'}}></hr>

    {/* <br></br> */}
    <hr style={{width:'88%',textAlign:'left',marginLeft:'0', marginTop: '10px'}}></hr>

    <div style={{content:'', display: 'table', clear: 'both', width: '100%'}}>
        <div style={{float:'left', width:'50%'}}><b>Produit #</b></div>
        <div style={{float:'left', width:'50%'}}><b>Quantité</b></div>
    </div> 

    <div style={{content:'', display: 'table', clear: 'both', width: '100%', marginLeft:'10px'}}>
        <div style={{float:'left', width:'50%'}}>product description</div>
        <div style={{float:'left', width:'50%'}}>qty</div>
    </div>    
    <hr style={{width:'88%',textAlign:'left',marginLeft:'0'}}></hr>
    {/* <br></br> */}
    <div style={{width:'400px', height:'60px',border:'1px solid #000'}}> 
      Payment type 
      <br></br>
      Total CAD $
    </div>
    
    <br></br>
    <span style={{fontSize: '12px'}}><b>ZONE DE LIVRAISON</b></span>
    <div style={{marginTop: '-6px'}}></div>
    <span style={{fontSize: '12px'}}>Zone: Zone #: Zone name</span>
    <div style={{marginTop: '2px'}}></div>
    <span style={{fontSize: '12px'}}><b>LIVREUR</b></span>
    <div style={{marginTop: '-6px'}}></div>
    <span style={{fontSize: '12px'}}>Livreur #/##</span>
    <div style={{marginTop: '2px'}}></div>
    <span style={{fontSize: '12px'}}><b>VOTRE DATE DE LIVRAISON</b></span>
    <div style={{marginTop: '-6px'}}></div>
    <span style={{fontSize: '12px'}}>YYYY-MM-DD</span>
    <br></br>
    <br></br>
  <div style={{ position:'absolute', bottom:'20px', width: '100%'}}>
    <div style={{content:'', display: 'table', clear: 'both', width: '100%'}}>
        <div style={{float:'left', width:'50%'}}>
          <span style={{fontSize:'8px', marginLeft:'35px'}}><b>Au Pied De Cochon - Cabanne à sucre</b></span>
          <div style={{marginTop: '-10px'}}></div>
          <span style={{fontSize:'8px'}}>11382 Rang de la Fresnière, St-Benoît de Mirabel, QC J7N 2R9</span>
        </div>
        <div style={{float:'left', width:'50%'}}>
          <span style={{fontSize:'8px', marginLeft:'15px'}}><b>Au Pied De Cochon - Restaurant</b></span>
          <div style={{marginTop: '-10px'}}></div>
          <span style={{fontSize:'8px'}}>536 Av. Duluth Est, Montréal, QC, H2L 1A9</span>
        </div>
    </div> 
    <div style={{marginRight: '100px', textAlign:'center'}}>
      <span style={{width: '100%',fontSize:'6px', marginLeft:'0px'}}>Ce projet a été financé par le ministère de l’Agriculture, des Pêcheries et de l’Alimentation, dans le cadre du programme Transformation alimentaire : robotisation et système de qualité.</span>
      <br></br>
      <img style={{marginTop:'0px', marginLeft:'-40px' , width:'100px',height:'20px'}} src={qc_logo}></img>
    </div>

  </div>
    </div>
  </div>
  );
  }