import React, { useState, useEffect } from "react";
import { Divider, Button, Label, Container } from "semantic-ui-react";
import * as XLSX from "xlsx";

import { Document as Doc, pdfjs, Page as Pag } from "react-pdf";
import "./display-report-styles.css";
// import DataTable from "react-data-table-component";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function DisplayReport(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  // process CSV data
  const processData = (dataString) => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
      if (headers && row.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] === '"') d = d.substring(1, d.length - 1);
            if (d[d.length - 1] === '"') d = d.substring(d.length - 2, 1);
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

    setData(list);
  };

  // handle file upload
  const readCSVFile = (file) => {
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
    if ([1, 2, 3, 6, 7, 8, 9, 10, 11, 12, 13, 15].includes(props.selectedReport)) {
      return (
        <>
          <Doc file={props.reportValues} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
            <Pag pageNumber={pageNum} />
          </Doc>
          <Button onClick={() => (pageNum > 1 ? setPageNum(pageNum - 1) : 1)} disabled={pageNum === 1} size="medium">
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
    }
    // else if ([4].includes(props.selectedReport)) {

    //   readCSVFile(props.reportValues);
    //   return (
    //     <>
    //       <DataTable pagination highlightOnHover columns={columns} data={data} />
    //     </>
    //   );
    // }
  };

  const downloadFile = (blob) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = blob.name;
    document.body.append(link);
    link.click();
    link.remove();
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
      <Button positive content="Download" icon="download" size="large" labelPosition="right" onClick={() => downloadFile(props.reportValues)} />
      <Button
        // positive
        // basic
        content="Generate New Report"
        icon="add"
        size="large"
        // labelPosition="right"
        onClick={generateNewReport}
      />
    </>
  );
}

export default DisplayReport;
