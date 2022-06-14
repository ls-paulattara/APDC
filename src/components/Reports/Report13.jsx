import React, { useState, useEffect } from "react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import { Header, Grid, Divider, Button, Dropdown, Message, Icon } from "semantic-ui-react";

const { getInitialDate, mergeProductsSameFormat } = require("../../Util/HelperFunctions");
const { getReport13File } = require("../../Util/CreateReportFile");

function Report13(props) {
  const [report13Values, setReport13Values] = useState({
    pickupPoint: "",
    orderStatus: "",
    startDate: null,
    endDate: null,
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (event, data) => {
    let { name, value } = data;
    setReport13Values((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async () => {
    //  console.log(report13Values);
    setError(false);
    setSuccess(false);
    setLoading(true);

    let orderData = await props.firebase.getAllFirebaseOrdersByDateAndStatus(report13Values.startDate, report13Values.endDate, report13Values.orderStatus, "pickup", report13Values.pickupPoint);
    await mergeProductsSameFormat(orderData);

    //  console.log(orderData);

    if (orderData.length) {
      try {
        const res = getReport13File(orderData);
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
    const report13Values = JSON.parse(localStorage.getItem("report13Values"));
    //  console.log(report13Values);
    if (report13Values) {
      setReport13Values(report13Values);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("report13Values", JSON.stringify(report13Values));
    //  console.log(report13Values);
  }, [report13Values]);

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
        value={report13Values.orderStatus}
        onChange={onChange}
      />

      <Header as="h3">Pickup Point</Header>
      <Dropdown placeholder="Pickup Point" name="pickupPoint" label="Pickup Point" selection size="large" options={props.pickupPointOptions} value={report13Values.pickupPoint} onChange={onChange} />
      <Header as="h3">Date Range of Pickup</Header>
      <Grid style={{ marginTop: "0", marginBottom: "0" }}>
        <SemanticDatepicker showToday autoComplete="off" name="startDate" size="large" onChange={onChange} value={getInitialDate(report13Values.startDate)} />
        <SemanticDatepicker showToday autoComplete="off" name="endDate" size="large" onChange={onChange} value={getInitialDate(report13Values.endDate)} />
      </Grid>
      <Divider />
      <Button content="Back" icon="left arrow" size="large" labelPosition="left" onClick={() => props.prevStep()} />
      <Button
        positive
        content="Download"
        icon="download"
        size="large"
        labelPosition="right"
        onClick={() => onSubmit()}
        disabled={!report13Values.pickupPoint || !report13Values.orderStatus || report13Values.startDate == null || report13Values.endDate == null}
      />
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

export default Report13;
