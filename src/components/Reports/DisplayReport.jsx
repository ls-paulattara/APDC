import React, { useState, useEffect } from 'react';
import TRANSLATIONS from "../../constants/translation";

import {
  Header,
  Grid,
  Divider,
  Button,
  Input,
  Dropdown
} from "semantic-ui-react";
import { Document as doc, pdfjs, Page as pag } from 'react-pdf';
import "./display-report-styles.css";
import $ from "jquery";
import html2canvas from "html2canvas";
import PSPDFKit from "./PSPDFKit";

import {
  BlobProvider,
  Document,
  Page,
  StyleSheet,
  Text,
  View
} from "@react-pdf/renderer";
const Papa = require('papaparse');
const fs = require('fs');
const { jsPDF } = require("jspdf");

const axios = require('axios').default;

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function DisplayReport(props) {
  const { dark, language } = props;
  const { REPORTS, HOME } = TRANSLATIONS[`${language}`];
  let pdf;
    function renderReport () {
        if([2,3].includes(props.selectedReport)){
            return (
            <doc
            key="test"
                file={props.reportValues}
            >
                <pag
                  pageNumber={1} 
                  height={1200}
                />
            </doc>
            )
        }
        else if([12,13].includes(props.selectedReport)){
            return (
            props.reportValues
            )
        }
    }
    const downloadFile = (blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = blob.name;
      document.body.append(link);
      link.click();
      link.remove();
      };
    const CreatePDFfromHTML = (html) => {
      var HTML_Width = $(".html-content").width();
      var HTML_Height = $(".html-content").height();
      var top_left_margin = 15;
      var PDF_Width = HTML_Width + (top_left_margin * 2);
      var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
      var canvas_image_width = HTML_Width;
      var canvas_image_height = HTML_Height;
    
      var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
    
      html2canvas($(html)[0]).then(function (canvas) {
          var imgData = canvas.toDataURL("image/jpeg", 1.0);
          var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
          pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
          for (var i = 1; i <= totalPDFPages; i++) { 
              pdf.addPage(PDF_Width, PDF_Height);
              pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
          }
          pdf.save("Your_PDF_Name.pdf");
          $(".html-content").hide();
      });
    }
    const showFile = (blob) => {
      // It is necessary to create a new blob object with mime-type explicitly set
      // otherwise only Chrome works like it should
      var newBlob = new Blob([blob], {type: "application/pdf"})
    
      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      } 
    
      // For other browsers: 
      // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(newBlob);
      var link = document.createElement('a');
      link.href = data;
      link.download="file.pdf";
      link.click();
      setTimeout(function(){
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
      }, 100);
    }
      // Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4"
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});
    async function downloadReport(){
        if([3,4,5].includes(props.selectedReport)){
            downloadFile(props.reportValues);
        }
        else if([12,13].includes(props.selectedReport)){
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

        
            // ....
          // console.log(props.reportValues)
          // var doc = new jsPDF();
          // console.log(props.reportValues)
          // // console.log(document.getElementById('root'))
          // let inner = document.getElementById('9541445').innerHTML;
          // doc.html(`<html><head><title>report</title></head><body><div id="MAINGUY">` + document.getElementById('9541445').innerHTML + `</div></body></html>`).then(() => doc.save('fileName.pdf'));
          // ..doc.save('div.pdf');

          // let prod = 'https://us-central1-ls-strategic-apis.cloudfunctions.net/apcd_api';
          // let dev = 'http://localhost:44000';
          // await axios({ method:'post', url: `http://localhost:44000/htlk`, data:{html: 'test'} }).then((response) => {
          //   // console.log(response.data)
          //   pdf = response.data
          //   showFile(pdf);  
          // })

        }
    }

  return (
  <>
  <BlobProvider document={props.reportValues}>
    {({ blob, url, loading, error }) => {
      if (blob) {
        return <PSPDFKit blob={blob} />;
      }

      if (error) {
        return error;
      }

      return <div>The PDF is rendering...</div>;
    }}
  </BlobProvider>,
    {renderReport()}

    <Divider />

    <Grid>
      <Grid.Row>
        <Grid.Column width={3}>
          <Button
            onClick={() => /*props.history.push('/reports')*/props.prevStep()}
            >Back
          </Button>
        </Grid.Column>
        <Grid.Column width={4}>
          <Button 
            positive
            onClick={() => downloadReport()}
            >Download
          </Button>
        </Grid.Column>
      </Grid.Row>
        </Grid>
    {/* <Button onClick={exportPDF}>download</Button> */}
    {/* <Button 
      onClick={() => props.prevStep()}
      >Back
    </Button> */}
  </>
  );
};

export default DisplayReport;
