import React, { useState, useEffect } from "react";
import TRANSLATIONS from "../../constants/translation";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";

import { Header, Grid, Divider, Button, Dropdown, Message, Icon } from "semantic-ui-react";

const { getInitialDate } = require("../../Util/HelperFunctions");
const { getReport8or11File } = require("../../Util/CreateReportFile");

function Report11(props) {
  const { language } = props;
  const { REPORTS } = TRANSLATIONS[`${language}`];

  const [report11Values, setreport11Values] = useState({
    orderStatus: "",
    category: "",
    carrier: "",
    startDate: null,
    endDate: null,
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (event, data) => {
    let { name, value } = data;
    setreport11Values((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async () => {
    //  console.log(report11Values);

    const orderData = await props.firebase.getAllFirebaseOrdersByOrderDateAndCategoryAndStatusAndCarrier(report11Values.startDate, report11Values.endDate, report11Values.orderStatus, report11Values.category, report11Values.carrier);
    //  console.log(orderData);
    if (orderData.length) {
      try {
        setSuccess(true);
        setError(false);
        const file = await getReport8or11File(orderData, "11", report11Values);
        // props.firebase.saveReportToFirebase(file);
        props.setReportValues(file);
        props.nextStep();
      } catch (e) {
        setError(true);
      }
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    const report11Values = JSON.parse(localStorage.getItem("report11Values"));
    if (report11Values) {
      setreport11Values(report11Values);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("report11Values", JSON.stringify(report11Values));
  }, [report11Values]);

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
      <Header as="h3">Carrier</Header>
      <Dropdown
        placeholder="Carrier"
        name="carrier"
        label="Carrier"
        selection
        size="large"
        options={REPORTS.carrierType}
        // icon="clipboard outline"
        value={report11Values.carrier}
        onChange={onChange}
      />
      <Header as="h3">Order Status</Header>
      <Dropdown
        placeholder="Order Status"
        name="orderStatus"
        label="Order Status"
        selection
        size="large"
        options={props.orderStatusOptions}
        // icon="clipboard outline"
        value={report11Values.orderStatus}
        onChange={onChange}
      />
      <Header as="h3">Category</Header>
      <Dropdown
        placeholder="Category"
        name="category"
        label="Category"
        selection
        size="large"
        options={props.categoryOptions}
        // icon="clipboard outline"
        value={report11Values.category}
        onChange={onChange}
      />
      <Header as="h3">Date Range of Order</Header>
      <Grid style={{ marginTop: "0", marginBottom: "0" }}>
        <SemanticDatepicker showToday autoComplete="off" name="startDate" size="large" onChange={onChange} value={getInitialDate(report11Values.startDate)} />
        <SemanticDatepicker showToday autoComplete="off" name="endDate" size="large" onChange={onChange} value={getInitialDate(report11Values.endDate)} />
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
        disabled={!report11Values.category || !report11Values.orderStatus || !report11Values.carrier || report11Values.startDate == null || report11Values.endDate == null}
      />
      {getErrorMessage()}
      {getSuccessMessage()}
    </>
  );
}

export default Report11;
