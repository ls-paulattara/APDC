import React, { useState, useEffect } from "react";
import TRANSLATIONS from "../../constants/translation";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import * as XLSX from "xlsx";
import { Header, Divider, Button, Dropdown, Message, Icon, Input } from "semantic-ui-react";

const { getInitialDate } = require("../../Util/HelperFunctions");
const { getReport6File } = require("../../Util/CreateReportFile");

function Report5(props) {
  const { dark, language } = props;
  const { REPORTS, HOME } = TRANSLATIONS[`${language}`];

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const onSubmit = async () => {
    setError(false);
    setSuccess(false);
    const res = await props.firebase.pushRoutificRoutesToOrders(data);
    console.log("from  report 5 res", res);
    if (res) {
      setSuccess(true);
      return;
    } else {
      setSuccess(false);
      setError(true);
    }
  };

  const getErrorMessage = () => (error ? <Message negative header="No matches found" content="No routific order matches were found. Try again" /> : "");
  const getSuccessMessage = () =>
    success ? (
      <Message icon>
        <Icon name="check" />
        <Message.Content>
          <Message.Header>Success</Message.Header>
          Your Routific data was successfully uploaded!
        </Message.Content>
      </Message>
    ) : (
      ""
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
  const handleFileUpload = (e) => {
    const file = e.target.files[0];

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

  const generateNewReport = () => {
    props.setStep(1);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Header as="h3">Routific Report Upload</Header>
      <Input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} onClick={(e) => (e.target.value = null)} />
      <Divider />
      <Button content="Back" icon="left arrow" size="large" labelPosition="left" onClick={() => props.prevStep()} />
      <Button positive content="Upload" icon="right arrow" size="large" labelPosition="right" onClick={() => onSubmit()} disabled={data.length === 0} />
      <Button
        // positive
        // basic
        content="Generate New Report"
        // icon="download"
        size="large"
        // labelPosition="right"
        onClick={generateNewReport}
      />
      {getErrorMessage()}
      {getSuccessMessage()}
    </>
  );
}
export default Report5;
