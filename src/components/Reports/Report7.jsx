import React, { useState, useEffect } from "react";
import TRANSLATIONS from "../../constants/translation";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";

import {
  Header,
  Grid,
  Divider,
  Button,
  Dropdown,
  Message,
  Icon,
} from "semantic-ui-react";

const { getInitialDate } = require("../../Util/HelperFunctions");
const { getReport7or9or10File } = require("../../Util/CreateReportFile");

function Report7(props) {
  const { dark, language } = props;
  const { REPORTS, HOME } = TRANSLATIONS[`${language}`];

  const [report7Values, setreport7Values] = useState({
    orderStatus: "",
    category: "",
    startDate: "null",
    endDate: "null",
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (event, data) => {
    let { name, value } = data;
    setreport7Values((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async () => {
    console.log(report7Values);

    const orderData =
      await props.firebase.getAllFirebaseOrdersByDateAndCategoryAndStatus(
        report7Values.startDate,
        report7Values.endDate,
        report7Values.orderStatus,
        report7Values.category
      );
    console.log(orderData);
    if (orderData.length) {
      setSuccess(true);
      setError(false);
      const file = await getReport7or9or10File(orderData, "7", report7Values);
      props.firebase.saveReportToFirebase(file);
      props.setReportValues(file);
      props.nextStep();
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    const report7Values = JSON.parse(localStorage.getItem("report7Values"));
    if (report7Values) {
      setreport7Values(report7Values);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("report7Values", JSON.stringify(report7Values));
    console.log(report7Values);
  }, [report7Values]);

  const getErrorMessage = () =>
    error ? (
      <Message
        negative
        header="No results"
        content="No results were found. Try again"
      />
    ) : (
      ""
    );
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
        value={report7Values.orderStatus}
        onChange={onChange}
      />
      <Header as="h3">Category</Header>
      <Dropdown
        placeholder="Category"
        name="category"
        label="Category"
        selection
        size="large"
        options={REPORTS.category}
        // icon="clipboard outline"
        value={report7Values.category}
        onChange={onChange}
      />
      <Header as="h3">Date Range of Order</Header>
      <Grid style={{ marginTop: "0", marginBottom: "0" }}>
        <SemanticDatepicker
          showToday
          autoComplete="off"
          name="startDate"
          size="large"
          onChange={onChange}
          value={getInitialDate(report7Values.startDate)}
        />
        <SemanticDatepicker
          showToday
          autoComplete="off"
          name="endDate"
          size="large"
          onChange={onChange}
          value={getInitialDate(report7Values.endDate)}
        />
      </Grid>
      <Divider />
      <Button
        content="Back"
        icon="left arrow"
        size="large"
        labelPosition="left"
        onClick={() => props.prevStep()}
      />
      <Button
        positive
        content="Next"
        icon="right arrow"
        size="large"
        labelPosition="right"
        onClick={() => onSubmit()}
        disabled={
          !report7Values.category ||
          !report7Values.orderStatus ||
          report7Values.startDate == null ||
          report7Values.endDate == null
        }
      />
      {getErrorMessage()}
      {getSuccessMessage()}
    </>
  );
}

export default Report7;
