import React, { useState, useEffect } from "react";

import TRANSLATIONS from "../../constants/translation";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import { Header, Grid, Divider, Button, Dropdown, Message, Icon } from "semantic-ui-react";

const { getInitialDate } = require("../../Util/HelperFunctions");
const { getReport14File } = require("../../Util/CreateReportFile");

function Report14(props) {
  const { language } = props;
  const { REPORTS } = TRANSLATIONS[`${language}`];

  const [report14Values, setReport14Values] = useState({
    orderStatus: "",
    startDate: null,
    endDate: null,
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (event, data) => {
    let { name, value } = data;
    setReport14Values((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async () => {
    //  console.log(report14Values);
    setError(false);
    setSuccess(false);
    setLoading(true);

    let orderData = await props.firebase.getAllMailOrdersByDateCreated(report14Values.startDate, report14Values.endDate, report14Values.orderStatus, "mail");
    //  console.log(orderData);

    if (orderData.length) {
      try {
        const res = getReport14File(orderData);
        if (res) {
          setLoading(false);
          setSuccess(true);
          setError(false);
        }
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    } else {
      setLoading(false);
      setError(true);
      setSuccess(false);
    }
  };

  useEffect(() => {
    const report14Values = JSON.parse(localStorage.getItem("report14Values"));
    //  console.log(report14Values);
    if (report14Values) {
      setReport14Values(report14Values);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("report14Values", JSON.stringify(report14Values));
    //  console.log(report14Values);
  }, [report14Values]);

  const getErrorMessage = () => (error ? <Message negative header="No results" content="No results were found. Try again" /> : "");
  const getSuccessMessage = () =>
    success ? (
      <Message icon>
        <Icon name="check" />
        <Message.Content>
          <Message.Header>Success</Message.Header>
          Your download should have started!
        </Message.Content>
      </Message>
    ) : (
      ""
    );
  const getLoadingMessage = () =>
    loading ? (
      <Message icon>
        <Icon loading name="circle notch" />
        <Message.Content>
          <Message.Header>Generating</Message.Header>
          Your download should start soon!
        </Message.Content>
      </Message>
    ) : (
      ""
    );
  const generateNewReport = () => {
    props.setStep(1);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Header as="h3">Order Status</Header>
      <Dropdown
        placeholder="Order Status"
        name="orderStatus"
        label="Order Status"
        selection
        size="large"
        options={props.orderStatusOptions}
        // icon="clipboard outline"
        value={report14Values.orderStatus}
        onChange={onChange}
      />

      <Header as="h3">Date Range of Order</Header>
      <Grid style={{ marginTop: "0", marginBottom: "0" }}>
        <SemanticDatepicker showToday autoComplete="off" name="startDate" size="large" onChange={onChange} value={getInitialDate(report14Values.startDate)} />
        <SemanticDatepicker showToday autoComplete="off" name="endDate" size="large" onChange={onChange} value={getInitialDate(report14Values.endDate)} />
      </Grid>
      <Divider />
      <Button content="Back" icon="left arrow" size="large" labelPosition="left" onClick={() => props.prevStep()} />
      <Button positive content="Download" icon="download" size="large" labelPosition="right" onClick={() => onSubmit()} disabled={!report14Values.orderStatus || report14Values.startDate == null || report14Values.endDate == null} />
      <Button
        // positive
        // basic
        content="Generate New Report"
        size="large"
        // labelPosition="right"
        onClick={generateNewReport}
        icon="add"
      />
      {getErrorMessage()}
      {getSuccessMessage()}
      {getLoadingMessage()}
    </>
  );
}

export default Report14;
