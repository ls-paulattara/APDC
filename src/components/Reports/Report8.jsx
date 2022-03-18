import React, { useState, useEffect } from "react";
import TRANSLATIONS from "../../constants/translation";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";

import { Header, Grid, Divider, Button, Dropdown, Message, Icon } from "semantic-ui-react";

const { getInitialDate } = require("../../Util/HelperFunctions");
const { getReport8or11File } = require("../../Util/CreateReportFile");

function Report8(props) {
  const { language } = props;
  const { REPORTS } = TRANSLATIONS[`${language}`];

  const [report8Values, setreport8Values] = useState({
    orderStatus: "",
    category: "",
    startDate: null,
    endDate: null,
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (event, data) => {
    let { name, value } = data;
    setreport8Values((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async () => {
    console.log(report8Values);

    const orderData = await props.firebase.getAllFirebaseOrdersByDateAndCategoryAndStatus(report8Values.startDate, report8Values.endDate, report8Values.orderStatus, report8Values.category);
    console.log(orderData);
    if (orderData.length) {
      setSuccess(true);
      setError(false);
      const file = await getReport8or11File(orderData, "8", report8Values);
      // props.firebase.saveReportToFirebase(file);
      props.setReportValues(file);
      props.nextStep();
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    const report8Values = JSON.parse(localStorage.getItem("report8Values"));
    if (report8Values) {
      setreport8Values(report8Values);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("report8Values", JSON.stringify(report8Values));
  }, [report8Values]);

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
        options={props.orderStatusOptions}
        // icon="clipboard outline"
        value={report8Values.orderStatus}
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
        value={report8Values.category}
        onChange={onChange}
      />
      <Header as="h3">Date Range of Order</Header>
      <Grid style={{ marginTop: "0", marginBottom: "0" }}>
        <SemanticDatepicker showToday autoComplete="off" name="startDate" size="large" onChange={onChange} value={getInitialDate(report8Values.startDate)} />
        <SemanticDatepicker showToday autoComplete="off" name="endDate" size="large" onChange={onChange} value={getInitialDate(report8Values.endDate)} />
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
        disabled={!report8Values.category || !report8Values.orderStatus || report8Values.startDate == null || report8Values.endDate == null}
      />
      {getErrorMessage()}
      {getSuccessMessage()}
    </>
  );
}

export default Report8;
