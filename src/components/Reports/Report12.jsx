import React, { useState, useEffect } from "react";

import TRANSLATIONS from "../../constants/translation";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import { Header, Grid, Divider, Button, Dropdown, Message, Icon } from "semantic-ui-react";

const { getInitialDate } = require("../../Util/HelperFunctions");
const { getReport12File } = require("../../Util/CreateReportFile");

function Report12(props) {
  const { dark, language } = props;
  const { REPORTS, HOME } = TRANSLATIONS[`${language}`];

  const [report12Values, setReport12Values] = useState({
    deliveryZone: "",
    orderStatus: "",
    startDate: null,
    endDate: null,
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (event, data) => {
    let { name, value } = data;
    setReport12Values((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async () => {
    console.log(report12Values);

    const orderData = await props.firebase.getAllFirebaseOrdersByDateAndStatus(report12Values.startDate, report12Values.endDate, report12Values.orderStatus, "delivery", report12Values.deliveryZone);
    console.log(orderData);
    if (orderData.length) {
      setSuccess(true);
      setError(false);
      const html = getReport12File(orderData);
      // props.firebase.saveReportToFirebase(file);
      props.setReportValues(html);
      props.nextStep();
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    const report12Values = JSON.parse(localStorage.getItem("report12Values"));
    console.log(report12Values);
    if (report12Values) {
      setReport12Values(report12Values);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("report12Values", JSON.stringify(report12Values));
    console.log(report12Values);
  }, [report12Values]);

  const getErrorMessage = () => (error ? <Message negative header="No results" content="No results were found. Try again" /> : "");
  const getSuccessMessage = () =>
    success ? (
      <Message icon>
        <Icon name="circle notched" loading />
        <Message.Content>
          <Message.Header>Just one second</Message.Header>
          Generating your report
        </Message.Content>
      </Message>
    ) : (
      ""
    );

  return (
    <>
      <Header as="h3">Order Status</Header>
      <Dropdown
        placeholder="Order Status"
        name="orderStatus"
        label="Order Status"
        selection
        size="large"
        options={REPORTS.orderStatus}
        // icon="clipboard outline"
        value={report12Values.orderStatus}
        onChange={onChange}
      />

      <Header as="h3">Delivery Zone</Header>
      <Dropdown placeholder="Delivery Zone" name="deliveryZone" label="Delivery Zone" selection size="large" options={REPORTS.deliveryZone} value={report12Values.deliveryZone} onChange={onChange} />
      <Header as="h3">Date Range of Pickup</Header>
      <Grid style={{ marginTop: "0", marginBottom: "0" }}>
        <SemanticDatepicker showToday autoComplete="off" name="startDate" size="large" onChange={onChange} value={getInitialDate(report12Values.startDate)} />
        <SemanticDatepicker showToday autoComplete="off" name="endDate" size="large" onChange={onChange} value={getInitialDate(report12Values.endDate)} />
      </Grid>
      <Divider />
      <Button content="Back" icon="left arrow" size="large" labelPosition="left" onClick={() => props.prevStep()} />
      <Button
        positive
        content="Next"
        icon="right arrow"
        size="large"
        labelPosition="right"
        onClick={() => onSubmit()}
        disabled={!report12Values.deliveryZone || !report12Values.orderStatus || report12Values.startDate == null || report12Values.endDate == null}
      />
      {getErrorMessage()}
      {getSuccessMessage()}
    </>
  );
}

export default Report12;
