import apdc_logo_banner from "../media/logo.png";
import apdc_logo from "../media/apdc-font-logo.png";
import qc_logo from "../media/qc-logo.png";
import boutique_banner from "../media/boutique-banner-1.png";
import cochon_cart from "../media/cochon-cart.jpeg";
import TRANSLATIONS from "../constants/translation";
import moment from "moment";
import * as html2canvas from "html2canvas";

// const { html2canvas } = require("html2canvas");
const { jsPDF } = require("jspdf");
const jspdfautotable = require("jspdf-autotable");
const Papa = require("papaparse");
const { REPORTS, HOME } = TRANSLATIONS[`EN`];

// const setTableColor = (jspdf) => {
jsPDF.autoTableSetDefaults({
  headStyles: { fillColor: "#696969" },
});
// };
export const getReport1or2File = async (data, reportNumber, reportValues) => {
  console.log("before", data);
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.setFont("ArialMS");
  doc.setTextColor(64, 64, 64);
  doc.text(HOME["report" + reportNumber], 14, 20);
  doc.setTextColor(85, 85, 85);

  doc.setFontSize(14);
  // if (reportNumber == "1") {
  //   doc.text("Pickup Point: " + data[0].shipmentTitle, 14, 29);
  // }
  doc.text(data[0].shipmentTitle, 14, 29);
  doc.text("Date Range: " + moment(reportValues.startDate).format("YYYY-MM-DD") + " / " + moment(reportValues.endDate).format("YYYY-MM-DD"), 14, 35);

  doc.line(14, 40, 200, 40);

  let wantedTableWidth = 80;
  let pageWidth = doc.internal.pageSize.width;
  let margin = (pageWidth - wantedTableWidth) / 2;
  let startFlag = false;

  data.forEach((item) => {
    let outerCurr;
    let { id, number, createdAt, firstname, lastname, status, totalPrice, shipmentTitle, startTime } = item;
    createdAt = createdAt.toDate().toLocaleDateString(); //+ '-' + createdAt.toDate().toLocaleTimeString()
    startTime = startTime.toDate().toLocaleDateString();
    let name = firstname + " " + lastname;

    outerCurr = [[number, createdAt, startTime, name, totalPrice, status]];

    doc.autoTable({
      // head: !startFlag ? [["Number","Date Ordered","Delivery Date","Name","Total", "Status"]] : [],
      head: [["Number", "Date Ordered", "Delivery Date", "Name", "Total", "Status"]],
      body: outerCurr,
      // theme: ''
      styles: {
        halign: "center",
      },
      startY: !startFlag ? 45 : doc.lastAutoTable.finalY + 5,
    });
    startFlag = true;
    let inner = [];
    item.products.forEach((subitem) => {
      inner.push([subitem.productTitle, subitem.quantityOrdered]);
    });
    // doc.autoTable
    // ({
    //   styles : { halign : 'center'},
    //   headStyles :
    //     {fillColor : [124, 95, 240]},
    //   alternateRowStyles:
    //     {fillColor : [231, 215, 252]},
    //   tableLineColor: [124, 95, 240],
    //   tableLineWidth: 0.1,
    // }); //use headStyles to bring styles to the table head, and alternateRowStyles to color the rows but one yes and one no

    doc.autoTable({
      head: [["Title", "Quantity"]],
      body: inner,
      // tableWidth: 100,
      theme: "grid",
      // FOR STYLING FOR ALL CELLS
      styles: {
        halign: "center",
      },
      margin: { left: margin, right: margin },
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 20 },
      },
      headStyles: { fillColor: false, textColor: [64, 64, 64] },
      startY: doc.lastAutoTable.finalY + 5,

      // alternateRowStyles:
      //   {fillColor : [232,232,232]},
      // tableLineColor: [124, 95, 240],
      // tableLineWidth: 0.1,
      // startY: 30,
    });
  });

  var blob = doc.output("blob");

  const fileName = getFilenameByDate(reportNumber, "pdf");
  doc.save(fileName);
  blob.name = fileName;

  return blob;
};

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const getReport1or2FileOLD = async (data, reportNumber) => {
  const outer = [];
  console.log("before", data);

  data.forEach((item) => {
    item.products.forEach((subitem) => {
      const { id, number, createdAt, firstname, lastname, status, totalPrice, shipmentTitle, startTime } = item;
      outer.push({
        id,
        number,
        createdAt,
        firstname,
        lastname,
        status,
        totalPrice,
        shipmentTitle,
        startTime,
        title: subitem.productTitle,
        quantity: subitem.quantityOrdered,
      });
    });
  });
  console.log("after", outer);

  const finalResults = outer.flat().map((item) => {
    const entry = {
      ID: item.id,
      Number: item.number,
      "Date Ordered": item.createdAt.toDate().toLocaleDateString() + "-" + item.createdAt.toDate().toLocaleTimeString(),
      "Delivery Date": item.startTime.toDate().toLocaleDateString(),
      "Delivery Zone": item.shipmentTitle,
      "First Name": item.firstname,
      "Last Name": item.lastname,
      Total: formatter.format(Number(item.totalPrice)),
      Status: item.status,
      Title: item.title,
      Quantity: item.quantity,
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
  let current = date.toLocaleDateString().concat("_", date.toLocaleTimeString("en-GB").replaceAll(":", "-")).replaceAll("/", "-");
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
};
const round = (num) => {
  return Math.round(num * 100) / 100;
};

export const getReport3File = async (data, reportValues) => {
  var dict = {
    Pickup: {
      Sherbrooke: [],
      "Downtown Montreal": [],
      Buckingham: [],
      Victoriaville: [],
      Sherbrooke: [],
    },
    Delivery: {
      Montreal: [],
      "Montreal Ouest": [],
      "Rive-Sud": [],
    },
    Mail: [],
  };
  // ["Total", totalPrice, count]
  let deliveryTotal = ["Total", 0, 0];
  let pickupTotal = ["Total", 0, 0];
  let mailTotal = ["Total", 0, 0];
  let grandTotal = ["Grand Total", 0, 0];

  data.forEach((item) => {
    const { id, totalPrice, type, shipmentTitle } = item;
    switch (type) {
      case "pickup":
        switch (shipmentTitle) {
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
        switch (shipmentTitle) {
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
  });

  const getPrices = (value, type) => {
    Object.keys(value).forEach(function (key) {
      let prices = 0;
      let count = 0;
      for (let zone of value[key]) {
        let totalPrice = round(zone.totalPrice);

        prices += totalPrice;
        count += 1;
        switch (type) {
          case "delivery":
            deliveryTotal[1] += round(totalPrice);
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
      value[key] = [round(prices), count];
    });
  };

  for (const [key, value] of Object.entries(dict)) {
    switch (key) {
      case "Delivery":
        getPrices(value, "delivery");
        break;
      case "Pickup":
        getPrices(value, "pickup");
        break;
      case "Mail":
        // getPrices(value, "mail");
        dict["Mail"].forEach((item) => {
          const price = round(item.totalPrice);
          mailTotal[1] += price;
          mailTotal[2] += 1;
          // grandTotal[1] += prices;
          // grandTotal[2] += 1;
        });

        break;
    }
  }

  console.log("dict", dict);

  const deliveryTable = Object.entries(dict["Delivery"]).map((item) => [item[0], round(item[1][0]), item[1][1]]);
  const pickupTable = Object.entries(dict["Pickup"]).map((item) => [item[0], item[1][0], item[1][1]]);
  const mailTable = [["Purolator", mailTotal[1], mailTotal[2]], mailTotal];

  // deliveryTotal = deliveryTotal[1].toFixed(2);
  // pickupTotal = pickupTotal[1].toFixed(2);
  // mailTotal = mailTotal[1].toFixed(2);

  deliveryTable.push(deliveryTotal);
  pickupTable.push(pickupTotal);

  grandTotal[1] = deliveryTotal[1] + pickupTotal[1] + mailTotal[1];
  grandTotal[2] = deliveryTotal[2] + pickupTotal[2] + mailTotal[2];
  console.log(grandTotal);

  const doc = new jsPDF();
  doc.setFontSize(22);
  doc.setFont("ArialMS");
  doc.setTextColor(64, 64, 64);
  doc.text(HOME["report3"], 14, 20);
  doc.setTextColor(85, 85, 85);
  doc.setFontSize(14);
  doc.text("Date Range: " + moment(reportValues.startDate).format("YYYY-MM-DD") + " / " + moment(reportValues.endDate).format("YYYY-MM-DD"), 14, 29);

  var width = doc.internal.pageSize.getWidth() - 28.0222222;
  // let wantedTableWidth = 100;
  // let pageWidth = doc.internal.pageSize.width;
  // const width1 = 80;
  // const width2 = 51;
  // const width3 = 51;

  const width1 = (2 * width) / 4;
  const width2 = (1 * width) / 4;
  const width3 = (1 * width) / 4;

  doc.line(14, 35, 200, 35);

  doc.text("Delivery", 14, 45);

  doc.autoTable({
    head: [["Zone", "Total Price", "Number of Orders"]],
    body: deliveryTable,
    startY: 48,
    columnStyles: {
      0: { cellWidth: width1 },
      1: { cellWidth: width2 },
      2: { cellWidth: width3 },
    },
    didParseCell: function (data) {
      var rows = data.table.body;
      if (data.row.index === rows.length - 1 && rows.length > 1) {
        // data.cell.styles.fillColor = [211, 211, 211];
        data.cell.styles.fontStyle = "bold";
      }
    },
  });

  doc.text("Pickup", 14, doc.lastAutoTable.finalY + 10);

  doc.autoTable({
    head: [["Pickup Point", "Total Price", "Number of Orders"]],
    body: pickupTable,
    startY: doc.lastAutoTable.finalY + 14,
    columnStyles: {
      0: { cellWidth: width1 },
      1: { cellWidth: width2 },
      2: { cellWidth: width3 },
    },
    didParseCell: function (data) {
      var rows = data.table.body;
      if (data.row.index === rows.length - 1 && rows.length > 1) {
        // data.cell.styles.fillColor = [211, 211, 211];
        data.cell.styles.fontStyle = "bold";
      }
    },
  });

  doc.text("Mail", 14, doc.lastAutoTable.finalY + 10);
  doc.autoTable({
    head: [["Mail", "Total Price", "Number of Orders"]],
    body: mailTable,
    startY: doc.lastAutoTable.finalY + 14,
    columnStyles: {
      0: { cellWidth: width1 },
      1: { cellWidth: width2 },
      2: { cellWidth: width3 },
    },
    didParseCell: function (data) {
      var rows = data.table.body;
      if (data.row.index === rows.length - 1) {
        // data.cell.styles.fillColor = [211, 211, 211];
        data.cell.styles.fontStyle = "bold";
      }
    },
  });
  doc.text("Grand Total", 14, doc.lastAutoTable.finalY + 10);
  doc.autoTable({
    head: [["Total", "Total Price", "Number of Orders"]],
    body: [grandTotal],
    startY: doc.lastAutoTable.finalY + 14,
    columnStyles: {
      0: { cellWidth: width1 },
      1: { cellWidth: width2 },
      2: { cellWidth: width3 },
    },
    didParseCell: function (data) {
      var rows = data.table.body;
      if (data.row.index === rows.length - 1) {
        // data.cell.styles.fillColor = [211, 211, 211];
        data.cell.styles.fontStyle = "bold";
      }
    },
  });

  var blob = doc.output("blob");

  const fileName = getFilenameByDate("3", "pdf");
  doc.save(fileName);
  blob.name = fileName;
  return blob;
};
export const getReport4File = async (data) => {
  const finalResults = data.flat().map((item) => {
    const entry = {
      Number: item.number,
      Address: item.address,
      Phone: item.phone,
      Email: item.email,
      Status: item.status,
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
  let current = date.toLocaleDateString().concat("_", date.toLocaleTimeString("en-GB").replaceAll(":", "-")).replaceAll("/", "-");
  const exportedFilename = `Report4_${current}.csv`;
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
};

export const getReport6File = async (orderData, reportValues) => {
  console.log(orderData);

  const doc = new jsPDF();
  doc.setFontSize(22);
  doc.setFont("ArialMS");
  doc.setTextColor(64, 64, 64);
  doc.text(HOME["report6"], 14, 20);
  doc.setTextColor(85, 85, 85);
  doc.setFontSize(14);
  doc.text("Date: " + moment(reportValues.startDate).format("YYYY-MM-DD"), 14, 29);
  doc.text("Order Status: " + reportValues.orderStatus, 14, 35);
  doc.text("Category: " + reportValues.category, 14, 41);
  doc.text(reportValues.deliveryZone, 14, 47);
  doc.line(14, 52, 200, 52);
  let startY = 62;

  // split drivers
  let drivers = {};
  let firstTablePosted = false;
  orderData.forEach((order) => {
    if (drivers[order.driver]) {
      drivers[order.driver].push(order);
    } else {
      drivers[order.driver] = [order];
    }
  });
  console.log(drivers);

  for (const [driver, orders] of Object.entries(drivers)) {
    console.log(driver, orders);

    let outer = [];
    orders.forEach((order) => {
      order.products.forEach((product) => {
        const { quantityOrdered, productTitle } = product;
        outer.push({
          title: productTitle,
          qty: quantityOrdered,
          date: order.startTime.toDate().toLocaleDateString("en-US", { day: "numeric", month: "numeric" }).replaceAll("/", "-"),
        });
      });
    });

    console.log(outer);

    let header = [];
    let dict = {};

    let dates = [];
    let items = [];

    outer.forEach((item) => {
      dates.push(item.date);
      items.push(item.title);
    });

    dates = [...new Set(dates)];
    items = [...new Set(items)];
    header.push("Product", ...dates, "Total");

    outer.forEach((item) => {
      if (!dict[item.title]) {
        dict[item.title] = [item];
      } else {
        dict[item.title].push(item);
      }
    });

    console.log(dict);

    // count the items for that day
    const getCellCount = (i, j) => {
      let count = 0;
      dict[items[i]].forEach((item) => {
        if (item.date == dates[j]) {
          count += item.qty;
        }
      });
      return count;
    };

    // build 2D array
    let full = createArray(items.length, dates.length + 1);

    // populate the array with the counts for the items
    for (let i = 0; i < full.length; i++) {
      for (let j = 0; j < full[i].length; j++) {
        if (j == 0) {
          full[i][j] = items[i];
        } else {
          full[i][j] = getCellCount(i, j - 1);
        }
      }
    }

    // add totals per row
    for (let i = 0; i < full.length; i++) {
      let count = 0;
      for (let j = 1; j < full[i].length; j++) {
        count += full[i][j];
      }
      full[i].push(count);
    }
    let totalLastRow = ["Total"];

    console.log(full);

    // add totals per column
    for (let i = 1; i < full[0].length; i++) {
      //error here
      let count = 0;
      for (let j = 0; j < full.length; j++) {
        count += full[j][i];
      }
      totalLastRow.push(count);
    }

    full.push(totalLastRow);
    if (firstTablePosted) {
      startY = doc.lastAutoTable.finalY + 10;
    }
    doc.text("Livreur: " + driver, 14, startY);

    doc.autoTable({
      head: [header],
      body: full,
      startY: startY + 5,
      // doc.lastAutoTable.finalY + 5,
      didParseCell: function (data) {
        var rows = data.table.body;
        if (data.row.index === rows.length - 1 && rows.length > 1) {
          // data.cell.styles.fillColor = [211, 211, 211];
          data.cell.styles.fontStyle = "bold";
        }
      },
    });
    firstTablePosted = true;
  }

  var blob = doc.output("blob");

  const fileName = getFilenameByDate("6", "pdf");
  doc.save(fileName);
  blob.name = fileName;

  return blob;
};

const getFilenameByDate = (report, type) => {
  let date = new Date();
  let current = date.toLocaleDateString().concat("_", date.toLocaleTimeString("en-GB").replaceAll(":", "-")).replaceAll("/", "-");
  return `Report${report}_${current}.${type}`;
};

// function to initialize an array of any dimension
function createArray(length) {
  var arr = new Array(length || 0),
    i = length;

  if (arguments.length > 1) {
    var args = Array.prototype.slice.call(arguments, 1);
    while (i--) arr[length - 1 - i] = createArray.apply(this, args);
  }
  return arr;
}

export const getReport7or9or10File = async (data, reportNumber, reportValues) => {
  let outer = [];
  data.forEach((order) => {
    order.products.forEach((product) => {
      const { quantityOrdered, productTitle } = product;
      outer.push({
        title: productTitle,
        qty: quantityOrdered,
        date: order.startTime.toDate().toLocaleDateString("en-US", { day: "numeric", month: "numeric" }).replaceAll("/", "-"),
      });
    });
  });

  console.log(outer);

  let header = [];
  let dict = {};

  let dates = [];
  let items = [];

  outer.forEach((item) => {
    dates.push(item.date);
    items.push(item.title);
  });

  dates = [...new Set(dates)];
  items = [...new Set(items)];
  header.push("Product", ...dates, "Total");

  outer.forEach((item) => {
    if (!dict[item.title]) {
      dict[item.title] = [item];
    } else {
      dict[item.title].push(item);
    }
  });

  console.log(dict);

  // count the items for that day
  const getCellCount = (i, j) => {
    let count = 0;
    dict[items[i]].forEach((item) => {
      if (item.date == dates[j]) {
        count += item.qty;
      }
    });
    return count;
  };

  // build 2D array
  let full = createArray(items.length, dates.length + 1);

  // populate the array with the counts for the items
  for (let i = 0; i < full.length; i++) {
    for (let j = 0; j < full[i].length; j++) {
      if (j == 0) {
        full[i][j] = items[i];
      } else {
        full[i][j] = getCellCount(i, j - 1);
      }
    }
  }

  // add totals per row
  for (let i = 0; i < full.length; i++) {
    let count = 0;
    for (let j = 1; j < full[i].length; j++) {
      count += full[i][j];
    }
    full[i].push(count);
  }
  let totalLastRow = ["Total"];

  console.log(full);

  // add totals per column
  for (let i = 1; i < full[0].length; i++) {
    //error here
    let count = 0;
    for (let j = 0; j < full.length; j++) {
      count += full[j][i];
    }
    totalLastRow.push(count);
  }

  full.push(totalLastRow);

  const doc = new jsPDF();
  doc.setFontSize(22);
  doc.setFont("ArialMS");
  doc.setTextColor(64, 64, 64);
  doc.text(HOME["report" + reportNumber], 14, 20);
  doc.setTextColor(85, 85, 85);

  doc.setFontSize(14);

  doc.text("Date Range: " + moment(reportValues.startDate).format("YYYY-MM-DD") + " / " + moment(reportValues.endDate).format("YYYY-MM-DD"), 14, 29);

  doc.text("Order Status: " + reportValues.orderStatus, 14, 35);
  doc.text("Category: " + reportValues.category, 14, 41);
  // report 9
  let startYTable;
  // let startYLine;
  if (reportNumber == "7") {
    doc.line(14, 47, 200, 47);
    startYTable = 52;
  } else if (reportNumber == "9") {
    doc.text(reportValues.pickupPoint, 14, 47);
    doc.line(14, 52, 200, 52);
    startYTable = 57;
  } else if (reportNumber == "10") {
    doc.text(reportValues.deliveryZone, 14, 47);
    doc.line(14, 52, 200, 52);
    startYTable = 57;
  }

  // doc.text("Global Production", 14, 10);

  var width = doc.internal.pageSize.getWidth() - 28.0222222;

  doc.autoTable({
    head: [header],
    body: full,
    startY: startYTable,
    didParseCell: function (data) {
      var rows = data.table.body;
      if (data.row.index === rows.length - 1 && rows.length > 1) {
        // data.cell.styles.fillColor = [211, 211, 211];
        data.cell.styles.fontStyle = "bold";
      }
    },
  });

  var blob = doc.output("blob");

  const fileName = getFilenameByDate(reportNumber, "pdf");
  doc.save(fileName);
  blob.name = fileName;

  return blob;
};

export const getReport8or11File = async (data, reportNumber, reportValues) => {
  let outer = [];
  data.forEach((order) => {
    order.products.forEach((product) => {
      const { quantityOrdered, productTitle } = product;
      outer.push({
        title: productTitle,
        qty: quantityOrdered,
      });
    });
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
    if (!dict[item.title]) {
      dict[item.title] = item.qty;
    } else {
      dict[item.title] += item.qty;
    }
    total += item.qty;
  });

  dict = Object.entries(dict);

  console.log(dict);

  dict.push(["Total", total]);

  const doc = new jsPDF();
  doc.setFontSize(22);
  doc.setFont("ArialMS");
  doc.setTextColor(64, 64, 64);
  doc.text(HOME["report" + reportNumber], 14, 20);
  doc.setTextColor(85, 85, 85);

  doc.setFontSize(14);

  doc.text("Date Range: " + moment(reportValues.startDate).format("YYYY-MM-DD") + " / " + moment(reportValues.endDate).format("YYYY-MM-DD"), 14, 29);

  doc.text("Order Status: " + reportValues.orderStatus, 14, 35);
  doc.text("Category: " + reportValues.category, 14, 41);

  let startYTable;

  if (reportNumber == "8") {
    doc.line(14, 47, 200, 47);
    startYTable = 52;
  } else if (reportNumber == "11") {
    doc.text("Carrier: " + reportValues.carrier, 14, 47);
    doc.line(14, 52, 200, 52);
    startYTable = 57;
  }

  doc.autoTable({
    head: [header],
    body: dict,
    startY: startYTable,
    didParseCell: function (data) {
      var rows = data.table.body;
      if (data.row.index === rows.length - 1 && rows.length > 1) {
        // data.cell.styles.fillColor = [211, 211, 211];
        data.cell.styles.fontStyle = "bold";
      }
    },
  });

  var blob = doc.output("blob");

  const fileName = getFilenameByDate(reportNumber, "pdf");
  doc.save(fileName);
  blob.name = fileName;

  return blob;
};

export const getReport12SingleOrder = (doc, order) => {
  // const doc = new jsPDF({ orientation: "p", lineHeight: 1.5 });

  let pageWidth = doc.internal.pageSize.width;
  let img = new Image();
  img.src = apdc_logo_banner;
  doc.addImage(img, "png", 22, 16, pageWidth - 40, 15);
  let img0 = new Image();
  img0.src = boutique_banner;
  // doc.addImage(img0, "png", 64, 27, 90, 15);
  doc.setFont("ArialMS");
  doc.setTextColor(64, 64, 64);
  doc.setFontSize(12);
  let img2 = new Image();
  img2.src = cochon_cart;
  doc.addImage(img2, "png", 150, 45, 40, 40);
  let ship = order.shippingAddress;
  let bill = order.billingAddress;
  let wantedTableWidth = 130;
  let margin = (pageWidth - wantedTableWidth) / 2;
  let outer = [];
  let formattedStreetShip = ship.street + " " + ship.street2 + " " + ship.number;
  let formattedStreetBill = bill.street + " " + bill.street2 + " " + ship.number;
  let formattedRegionShip = `${ship.region}, ${ship.zipcode}, ${ship.country}`;
  let formattedRegionBill = `${bill.region}, ${bill.zipcode}, ${bill.country}`;

  outer.push([ship.name + "\n" + formattedStreetShip + "\n" + formattedRegionShip + "\n" + order.phone, bill.name + "\n" + formattedStreetBill + "\n" + formattedRegionBill + "\n" + order.phone]);
  // outer.push([ship.name, bill.name]);
  // outer.push([formattedStreetShip, formattedStreetBill]);
  // outer.push([formattedRegionShip, formattedRegionBill]);
  // outer.push([order.phone, order.phone]);
  doc.autoTable({
    head: [["Addresse de Livraison", "Addresse de Facturation"]],
    body: outer,
    startY: 50,
    theme: "plain",
    margin: { left: margin - 20, right: margin + 20 },
    styles: {
      minCellHeight: 0,
      rowHeight: 0,
    },
    headStyles: { fillColor: false, textColor: [64, 64, 64] },
  });
  let type = "";
  switch (order.type) {
    case "delivery":
      type = "Livraison/Delivery";
      break;
    case "pickup":
      type = "Pour Emporter/Pickup";
  }
  doc.line(20, doc.lastAutoTable.finalY + 8, 180, doc.lastAutoTable.finalY + 8);
  var adjustedData = moment.unix(order.createdAt.seconds).format("MM/DD/YYYY");
  doc.autoTable({
    head: [["Référence de commande", "Date de commande", "Transporteur"]],
    body: [[order.number, adjustedData, type]],
    startY: doc.lastAutoTable.finalY + 10,
    theme: "plain",
    margin: { left: margin - 20 },
    styles: {
      minCellHeight: 0,
      rowHeight: 0,
    },
    headStyles: { fillColor: false, textColor: [64, 64, 64] },
  });

  doc.line(20, doc.lastAutoTable.finalY + 3, 180, doc.lastAutoTable.finalY + 3);

  // get All products and quantities
  let inner = [];
  order.products.forEach((item) => {
    inner.push([item.productTitle, item.quantityOrdered]);
  });

  doc.autoTable({
    head: [["Produit", "Quantité"]],
    body: inner,
    startY: doc.lastAutoTable.finalY + 15,
    // theme: "plain",
    margin: { left: margin, right: margin },
    styles: {
      minCellHeight: 0,
      rowHeight: 0,
      halign: "center",
    },
  });
  let last = doc.lastAutoTable.finalY;

  const checkLastLocation = () => {
    // console.log("curr", last);
    if (last > 245) {
      console.log("in fun", last);
      doc.addPage();
      last = 20;
    }
  };
  // console.log(last);
  last += 12;
  checkLastLocation();
  // console.log("2", last);

  doc.rect(20, last, 110, 15, "S");
  last += 6;
  doc.text(22, last, order.payment.title + "\n" + order.payment.data.method);
  doc.text(95, last, "$" + order.totalPrice + " CAD");
  last += 18;
  checkLastLocation();
  doc.setFont(undefined, "bold").text("Zone de Livraison", 20, last).setFont(undefined, "normal");
  last += 5;
  doc.text(20, last, "Zone: " + order.shipmentTitle);
  last += 7;
  checkLastLocation();
  doc.setFont(undefined, "bold").text("Livreur", 20, last).setFont(undefined, "normal");
  last += 5;
  doc.text(20, last, order.driver + " / #" + order.stopNumber);
  last += 7;
  checkLastLocation();
  doc.setFont(undefined, "bold").text("Votre date de livraison", 20, last).setFont(undefined, "normal");
  last += 5;
  doc.text(20, last, moment.unix(order.startTime.seconds).format("MM/DD/YYYY"));
};

export const getReport13SingleOrder = (doc, order) => {
  // const doc = new jsPDF({ orientation: "p", lineHeight: 1.5 });

  let pageWidth = doc.internal.pageSize.width;
  let img = new Image();
  img.src = apdc_logo_banner;
  doc.addImage(img, "png", 22, 16, pageWidth - 40, 15);
  let img0 = new Image();
  img0.src = boutique_banner;
  // doc.addImage(img0, "png", 64, 27, 90, 15);
  doc.setFont("ArialMS");
  doc.setTextColor(64, 64, 64);
  doc.setFontSize(12);
  let img2 = new Image();
  img2.src = cochon_cart;
  doc.addImage(img2, "png", 150, 45, 40, 40);
  let ship = order.shippingAddress;
  let bill = order.billingAddress;
  let wantedTableWidth = 130;
  let margin = (pageWidth - wantedTableWidth) / 2;
  let outer = [];
  let formattedStreetShip = ship.street + " " + ship.street2 + " " + ship.number;
  let formattedStreetBill = bill.street + " " + bill.street2 + " " + ship.number;
  let formattedRegionShip = `${ship.region}, ${ship.zipcode}, ${ship.country}`;
  let formattedRegionBill = `${bill.region}, ${bill.zipcode}, ${bill.country}`;

  outer.push([ship.name + "\n" + formattedStreetShip + "\n" + formattedRegionShip + "\n" + order.phone, bill.name + "\n" + formattedStreetBill + "\n" + formattedRegionBill + "\n" + order.phone]);
  // outer.push([ship.name, bill.name]);
  // outer.push([formattedStreetShip, formattedStreetBill]);
  // outer.push([formattedRegionShip, formattedRegionBill]);
  // outer.push([order.phone, order.phone]);
  doc.autoTable({
    head: [["Addresse de Livraison", "Addresse de Facturation"]],
    body: outer,
    startY: 50,
    theme: "plain",
    margin: { left: margin - 20, right: margin + 20 },
    styles: {
      minCellHeight: 0,
      rowHeight: 0,
    },
    headStyles: { fillColor: false, textColor: [64, 64, 64] },
  });
  let type = "";
  switch (order.type) {
    case "delivery":
      type = "Livraison/Delivery";
      break;
    case "pickup":
      type = "Pour Emporter/Pickup";
  }
  doc.line(20, doc.lastAutoTable.finalY + 8, 180, doc.lastAutoTable.finalY + 8);
  var adjustedData = moment.unix(order.createdAt.seconds).format("MM/DD/YYYY");
  doc.autoTable({
    head: [["Référence de commande", "Date de commande", "Transporteur"]],
    body: [[order.number, adjustedData, type]],
    startY: doc.lastAutoTable.finalY + 10,
    theme: "plain",
    margin: { left: margin - 20 },
    styles: {
      minCellHeight: 0,
      rowHeight: 0,
    },
    headStyles: { fillColor: false, textColor: [64, 64, 64] },
  });

  doc.line(20, doc.lastAutoTable.finalY + 3, 180, doc.lastAutoTable.finalY + 3);

  // get All products and quantities
  let inner = [];
  order.products.forEach((item) => {
    inner.push([item.productTitle, item.quantityOrdered]);
  });

  doc.autoTable({
    head: [["Produit", "Quantité"]],
    body: inner,
    startY: doc.lastAutoTable.finalY + 15,
    // theme: "plain",
    margin: { left: margin, right: margin },
    styles: {
      minCellHeight: 0,
      rowHeight: 0,
      halign: "center",
    },
  });
  let last = doc.lastAutoTable.finalY;

  const checkLastLocation = () => {
    // console.log("curr", last);
    if (last > 245) {
      console.log("in fun", last);
      doc.addPage();
      last = 20;
    }
  };
  // console.log(last);
  last += 12;
  checkLastLocation();
  // console.log("2", last);

  doc.rect(20, last, 110, 15, "S");
  last += 6;
  doc.text(22, last, order.payment.title + "\n" + order.payment.data.method);
  doc.text(95, last, "$" + order.totalPrice + " CAD");
  last += 18;
  checkLastLocation();
  doc.setFont(undefined, "bold").text("Point de Chute", 20, last).setFont(undefined, "normal");
  last += 5;
  doc.text(20, last, order.shipmentTitle);
  // last += 7;
  // checkLastLocation();
  // doc.setFont(undefined, "bold").text("Livreur", 20, last).setFont(undefined, "normal");
  // last += 5;
  // doc.text(20, last, order.driver + " / #" + order.stopNumber);
  last += 7;
  checkLastLocation();
  doc.setFont(undefined, "bold").text("Votre date de récupération", 20, last).setFont(undefined, "normal");
  last += 5;
  doc.text(20, last, moment.unix(order.startTime.seconds).format("MM/DD/YYYY"));
};

const getCenteredXCoordinate = (text, doc) => {
  var textWidth = (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) / doc.internal.scaleFactor;
  var textOffset = (doc.internal.pageSize.width - textWidth) / 2;
  return textOffset;
};
const addFooter = (doc) => {
  // FOOTER START
  doc.autoTable({
    // head: [["Au Pied De Cochon - Cabanne à sucre", "Au Pied De Cochon - Restaurant"]],
    body: [
      ["Au Pied De Cochon - Cabanne à sucre\n11382 Rang de la Fresnière, St-Benoît de Mirabel, QC J7N 2R9", "Au Pied De Cochon - Restaurant\n536 Av. Duluth Est, Montréal, QC, H2L 1A9"],
      // ["11382 Rang de la Fresnière, St-Benoît de Mirabel, QC J7N 2R9", "536 Av. Duluth Est, Montréal, QC, H2L 1A9"],
    ],
    startY: 252, //last + 116,
    theme: "plain",
    styles: {
      halign: "center",
      fontSize: 6,
    },
    headStyles: { fillColor: false, textColor: [64, 64, 64] },
    // didParseCell: function (data) {
    //   if (data.row.index === 0) {
    //     data.cell.styles.fontStyle = "bold";
    //   }
    // },
  });

  let footerText = "Ce projet a été financé par le ministère de l’Agriculture, des Pêcheries et de l’Alimentation, dans le cadre du programme Transformation alimentaire : robotisation et système de qualité.";
  doc.setFontSize(7);
  doc.text(getCenteredXCoordinate(footerText, doc), 262, footerText);
  let img3 = new Image();
  img3.src = qc_logo;
  doc.addImage(img3, "png", 90, 264, 25, 5);
};

export const getReport12File = (orders) => {
  const doc = new jsPDF("portait", "mm", "letter");
  // var doc = new jsPDF("p", "mm", "a4");

  for (const [i, order] of orders.entries()) {
    if (i === orders.length - 1) {
      getReport12SingleOrder(doc, order);
    } else {
      // only add a page if there are remaining orders
      getReport12SingleOrder(doc, order);
      doc.addPage();
    }
  }

  // To test large amount of orders
  // for (let step = 0; step < 1000; step++) {
  //   getReport12SingleOrder(doc, orders[step % orders.length]);
  //   doc.addPage();
  // }

  // To add multiple products to an order
  // let ord = orders[1].products;
  // let ord1 = orders[1].products[0];
  // for (let step = 0; step < 3; step++) {
  //   ord1.quantityOrdered = ord.length + 1;
  //   ord.push(ord1);
  // }
  // console.log(ord);
  // getReport12SingleOrder(doc, orders[1]);

  const pageCount = doc.internal.getNumberOfPages();

  // doc.setFont("helvetica", "italic");
  for (var i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    addFooter(doc);
    // doc.text(
    //   String(i) + "/" + String(pageCount),
    //   195,
    //   270
    //   // {align: "center",    }
    // );
  }

  var blob = doc.output("blob");
  const fileName = getFilenameByDate("12", "pdf");
  doc.save(fileName);
  blob.name = fileName;

  window.open(URL.createObjectURL(blob));

  return true;
};
export const getReport13File = (orders) => {
  const doc = new jsPDF("portait", "mm", "letter");

  for (const [i, order] of orders.entries()) {
    if (i === orders.length - 1) {
      getReport13SingleOrder(doc, order);
    } else {
      // only add a page if there are remaining orders
      getReport13SingleOrder(doc, order);
      doc.addPage();
    }
  }

  const pageCount = doc.internal.getNumberOfPages();

  for (var i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    addFooter(doc);
  }

  var blob = doc.output("blob");
  const fileName = getFilenameByDate("13", "pdf");
  doc.save(fileName);
  blob.name = fileName;

  window.open(URL.createObjectURL(blob));

  return true;
};

export const getReport12SinglePageOLDHTML = (orderDetails) => {
  return (
    <div
      id={"rep" + orderDetails.id}
      key={orderDetails.id}
      style={{
        height: 792,
        width: 612,
        padding: "none",
        backgroundColor: "white",
        boxShadow: "5px 5px 5px black",
        margin: "auto",
        overflowX: "hidden",
        overflowY: "hidden",
        position: "relative",
        textAlign: "left",
      }}
    >
      {/* <p style={{marginTop:'20px', textAlign:'center', fontFamily:"cursive", fontSize:'50px'}}>Au Pied De Cochon</p> */}
      <img style={{ marginTop: "30px", width: "600px" }} src={apdc_logo_banner}></img>
      {/* <img style={{marginTop:'20px'}} src={apdc_logo}></img> */}
      {/* <hr style={{marginTop:'20px',height: '0.1px', marginLeft: "90px",width:'70%',textAlign:'left'}}></hr>
    <h2 style={{marginTop:'-10px', textAlign: 'center'}}><pre>A U  P I E D  D E  C O C H O N</pre></h2>
    <hr style={{marginTop:'-10px', marginLeft: "90px",width:'70%',textAlign:'left'}}></hr> */}

      <br></br>
      <br></br>
      <div style={{ marginLeft: "60px" }}>
        <div
          style={{
            position: "static",
            width: "80%",
            padding: "0",
            margin: "0",
          }}
        >
          <div style={{ display: "block", float: "left" }}>
            <p>
              <b>Adresses de livraison et facturation</b>
            </p>
            <span>{orderDetails.firstname}</span>
            {/* <span>First Last Name</span> */}
            <div style={{ marginTop: "-4px" }}></div>
            <span>address1</span>
            <div style={{ marginTop: "-4px" }}></div>
            <span>address2</span>
            <div style={{ marginTop: "-4px" }}></div>
            <span>city</span>
            <div style={{ marginTop: "-4px" }}></div>
            <span>country</span>
            <div style={{ marginTop: "-4px" }}></div>
            <span> phone number</span>
          </div>
          <div style={{ display: "block", float: "right" }}>
            <img style={{ width: "130px", height: "130px" }} src={cochon_cart}></img>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <hr style={{ width: "88%", textAlign: "left", marginLeft: "0" }}></hr>

        <div
          style={{
            content: "",
            display: "table",
            clear: "both",
            width: "100%",
          }}
        >
          <div style={{ float: "left", width: "33.33%" }}>
            <b>Ref de commande</b>
          </div>
          <div style={{ float: "left", width: "33.33%" }}>
            <b>Date de commande</b>
          </div>
          <div style={{ float: "left", width: "33.33%" }}>
            <b>Transporteur</b>
          </div>
        </div>

        <div
          style={{
            content: "",
            display: "table",
            clear: "both",
            width: "100%",
            marginLeft: "10px",
          }}
        >
          <div style={{ float: "left", width: "33.33%" }}>commande #</div>
          <div style={{ float: "left", width: "33.33%" }}>date commande</div>
          <div style={{ float: "left", width: "33.33%" }}>Livraison/Delivery</div>
        </div>
        <hr style={{ width: "88%", textAlign: "left", marginLeft: "0" }}></hr>

        {/* <br></br> */}
        <hr
          style={{
            width: "88%",
            textAlign: "left",
            marginLeft: "0",
            marginTop: "10px",
          }}
        ></hr>

        <div
          style={{
            content: "",
            display: "table",
            clear: "both",
            width: "100%",
          }}
        >
          <div style={{ float: "left", width: "50%" }}>
            <b>Produit #</b>
          </div>
          <div style={{ float: "left", width: "50%" }}>
            <b>Quantité</b>
          </div>
        </div>

        <div
          style={{
            content: "",
            display: "table",
            clear: "both",
            width: "100%",
            marginLeft: "10px",
          }}
        >
          <div style={{ float: "left", width: "50%" }}>product description</div>
          <div style={{ float: "left", width: "50%" }}>qty</div>
        </div>
        <hr style={{ width: "88%", textAlign: "left", marginLeft: "0" }}></hr>
        {/* <br></br> */}
        <div style={{ width: "400px", height: "60px", border: "1px solid #000" }}>
          Payment type
          <br></br>
          Total CAD $
        </div>

        <br></br>
        <span style={{ fontSize: "12px" }}>
          <b>ZONE DE LIVRAISON</b>
        </span>
        <div style={{ marginTop: "-6px" }}></div>
        <span style={{ fontSize: "12px" }}>Zone: Zone #: Zone name</span>
        <div style={{ marginTop: "2px" }}></div>
        <span style={{ fontSize: "12px" }}>
          <b>LIVREUR</b>
        </span>
        <div style={{ marginTop: "-6px" }}></div>
        <span style={{ fontSize: "12px" }}>Livreur #/##</span>
        <div style={{ marginTop: "2px" }}></div>
        <span style={{ fontSize: "12px" }}>
          <b>VOTRE DATE DE LIVRAISON</b>
        </span>
        <div style={{ marginTop: "-6px" }}></div>
        <span style={{ fontSize: "12px" }}>YYYY-MM-DD</span>
        <br></br>
        <br></br>
        <div style={{ position: "absolute", bottom: "20px", width: "100%" }}>
          <div
            style={{
              content: "",
              display: "table",
              clear: "both",
              width: "100%",
            }}
          >
            <div style={{ float: "left", width: "50%" }}>
              <span style={{ fontSize: "8px", marginLeft: "35px" }}>
                <b>Au Pied De Cochon - Cabanne à sucre</b>
              </span>
              <div style={{ marginTop: "-10px" }}></div>
              <span style={{ fontSize: "8px" }}>11382 Rang de la Fresnière, St-Benoît de Mirabel, QC J7N 2R9</span>
            </div>
            <div style={{ float: "left", width: "50%" }}>
              <span style={{ fontSize: "8px", marginLeft: "15px" }}>
                <b>Au Pied De Cochon - Restaurant</b>
              </span>
              <div style={{ marginTop: "-10px" }}></div>
              <span style={{ fontSize: "8px" }}>536 Av. Duluth Est, Montréal, QC, H2L 1A9</span>
            </div>
          </div>
          <div style={{ marginRight: "100px", textAlign: "center" }}>
            <span style={{ width: "100%", fontSize: "6px", marginLeft: "0px" }}>
              Ce projet a été financé par le ministère de l’Agriculture, des Pêcheries et de l’Alimentation, dans le cadre du programme Transformation alimentaire : robotisation et système de qualité.
            </span>
            <br></br>
            <img
              style={{
                marginTop: "0px",
                marginLeft: "-40px",
                width: "100px",
                height: "20px",
              }}
              src={qc_logo}
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};
