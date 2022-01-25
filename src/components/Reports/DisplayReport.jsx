import React, { useState } from "react";
import TRANSLATIONS from "../../constants/translation";

import {
  Header,
  Grid,
  Divider,
  Button,
  Input,
  Dropdown,
  Label,
  Segment,
  Container,
} from "semantic-ui-react";

import { Document, pdfjs, Page } from "react-pdf";
import "./display-report-styles.css";
import $ from "jquery";
import html2canvas from "html2canvas";
import PSPDFKit from "./PSPDFKit";

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

  const renderReport = () => {
    if ([1, 2, 3, 7, 8, 9, 10, 11].includes(props.selectedReport)) {
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
          <Document
            file={props.reportValues}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            <Page pageNumber={pageNum} />
          </Document>
          <Button
            onClick={() => (pageNum > 1 ? setPageNum(pageNum - 1) : 1)}
            disabled={pageNum == 1}
            size="medium"
          >
            Prev Page
          </Button>
          <Label
            style={{ marginLeft: "7%", marginRight: "7%" }}
            color="blue"
            size="large"
          >
            Page {pageNum} of {numPages}
          </Label>
          <Button
            onClick={() =>
              pageNum < numPages ? setPageNum(pageNum + 1) : pageNum
            }
            disabled={pageNum >= numPages}
            size="medium"
          >
            Next Page
          </Button>
        </>
      );
    } else if ([12, 13].includes(props.selectedReport)) {
      return props.reportValues;
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

  const downloadReport = async () => {
    if ([1, 2, 3, 7, 8, 9, 10, 11].includes(props.selectedReport)) {
      downloadFile(props.reportValues);
    } else if ([12, 13].includes(props.selectedReport)) {
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
      <Button
        content="Back"
        icon="left arrow"
        size="large"
        labelPosition="left"
        onClick={() => props.prevStep()}
      />
      <Button
        positive
        content="Download"
        icon="download"
        size="large"
        labelPosition="right"
        onClick={() => downloadReport()}
      />
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
