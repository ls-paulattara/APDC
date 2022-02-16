import React, { useState } from "react";
import TRANSLATIONS from "../../constants/translation";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import { Header, Grid, Divider, Button, Input, Dropdown, Label, Segment, Container } from "semantic-ui-react";
import * as XLSX from "xlsx";

import { Document as Doc, pdfjs, Page as Pag } from "react-pdf";
import "./display-report-styles.css";
import html2canvas from "html2canvas";
import DataTable from "react-data-table-component";

import $ from "jquery";
const { getReport12File } = require("../../Util/CreateReportFile");

const Papa = require("papaparse");
const fs = require("fs");
const { jsPDF } = require("jspdf");

const axios = require("axios").default;

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function DisplayReport(props) {
  const { dark, language } = props;
  const { REPORTS, HOME } = TRANSLATIONS[`${language}`];
  let pdf;

  const [numPages, setNumPages] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const printRef = React.useRef();

  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

  const MyDoc = () => (
    <Document>
      <View>
        <Page pageNumber={pageNum} size="A4">
          {props.reportValues}
        </Page>
      </View>
    </Document>
  );

  const MyDoc2 = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
          {props.reportValues}
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
  // process CSV data
  const processData = (dataString) => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
      if (headers && row.length == headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] == '"') d = d.substring(1, d.length - 1);
            if (d[d.length - 1] == '"') d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        // remove the blank rows
        if (Object.values(obj).filter((x) => x).length > 0) {
          list.push(obj);
        }
      }
    }

    // prepare columns list from headers
    const columns = headers.map((c) => ({
      name: c,
      selector: (row) => row[c],
    }));

    setData(list);
    setColumns(columns);
  };

  // handle file upload
  const handleFileUpload2 = (file) => {
    // const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      processData(data);
    };
    reader.readAsBinaryString(file);
  };

  const renderReport = () => {
    if ([1, 2, 3, 6, 7, 8, 9, 10, 11].includes(props.selectedReport)) {
      return (
        // option 1: all pages stacked one on top of another
        // <Document
        //   key="test"
        //   file={props.reportValues}
        //   onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        // >

        //     {Array.apply(null, Array(numPages))
        //       .map((x, i) => i+1)
        //       .map(page => <Page pageNumber={page}/>)}

        // </Document>
        <>
          <Doc file={props.reportValues} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
            <Pag pageNumber={pageNum} />
          </Doc>
          <Button onClick={() => (pageNum > 1 ? setPageNum(pageNum - 1) : 1)} disabled={pageNum == 1} size="medium">
            Prev Page
          </Button>
          <Label style={{ marginLeft: "7%", marginRight: "7%" }} color="blue" size="large">
            Page {pageNum} of {numPages}
          </Label>
          <Button onClick={() => (pageNum < numPages ? setPageNum(pageNum + 1) : pageNum)} disabled={pageNum >= numPages} size="medium">
            Next Page
          </Button>
        </>
      );
    } else if ([4].includes(props.selectedReport)) {
      // handleFileUpload(props.reportValues);
      return (
        <>
          {handleFileUpload2(props.reportValues)}
          {/* <Input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload2} /> */}
          <DataTable pagination highlightOnHover columns={columns} data={data} />
        </>
      );
    } else if ([12, 13].includes(props.selectedReport)) {
      return <div ref={printRef}>I will be in the PDF.</div>;

      return props.reportValues;
      return (
        <>
          {/* <div> */}
          <PDFDownloadLink document={<MyDoc2 />} fileName="somename.pdf">
            {({ blob, url, loading, error }) => (loading ? "Loading document..." : "Download now!")}
          </PDFDownloadLink>
          {/* </div> */}
        </>
      );
    }
  };

  const downloadFile = (blob) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = blob.name;
    document.body.append(link);
    link.click();
    link.remove();
  };

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("print.pdf");
  };

  const downloadReport = async () => {
    if ([1, 2, 3, 7, 8, 9, 10, 11].includes(props.selectedReport)) {
      downloadFile(props.reportValues);
    } else if ([12, 13].includes(props.selectedReport)) {
      handleDownloadPdf();
      // getReport12File(props.reportValues);
      // const input = document.getElementById("rep9541445");
      // const input2 = $("#rep9541445")[0];
      // html2canvas(input2).then(function (canvas) {
      //   $("#element-out").append(canvas);
      // });
      // html2canvas(input2).then((canvas) => {
      //   const imgData = canvas.toDataURL("image/png");
      //   const pdf = new jsPDF();
      //   // pdf.addImage(imgData, "JPEG", 0, 0);
      //   // pdf.output('dataurlnewwindow');
      //   pdf.save("download.pdf");
      // });
      //     <ReactToPdf targetRef={ref} filename="code-example.pdf">
      //   {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
      //  </ReactToPdf>
      //   <Document>
      //   <Page size="A4" style={styles.page}>
      //     <View style={styles.section}>
      //       <Text>Hello World!</Text>
      //     </View>
      //     <View style={styles.section}>
      //       <Text>We're inside a PDF!</Text>
      //     </View>
      //   </Page>
      // </Document>
    }
  };

  const generateNewReport = () => {
    props.setStep(1);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Container textAlign="center">
        {renderReport()}
        <Divider />
      </Container>
      <Button content="Back" icon="left arrow" size="large" labelPosition="left" onClick={() => props.prevStep()} />
      <Button positive content="Download" icon="download" size="large" labelPosition="right" onClick={() => downloadReport()} />
      <Button
        // positive
        // basic
        content="Generate New Report"
        // icon="download"
        size="large"
        // labelPosition="right"
        onClick={generateNewReport}
      />
    </>
  );
}

export default DisplayReport;
