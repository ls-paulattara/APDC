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

function Report9(props) {
  const { dark, language } = props;
  const { REPORTS, HOME } = TRANSLATIONS[`${language}`];

  const [report9Values, setreport9Values] = useState({
    orderStatus: "",
    pickupPoint: "",
    category: "",
    startDate: null,
    endDate: null,
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (event, data) => {
    let { name, value } = data;
    setreport9Values((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async () => {
    console.log(report9Values);

    const orderData =
      await props.firebase.getAllFirebaseOrdersByDateAndCategoryAndStatusAndLocation(
        report9Values.startDate,
        report9Values.endDate,
        report9Values.orderStatus,
        report9Values.category,
        "pickup",
        report9Values.pickupPoint
      );
    console.log(orderData);
    if (orderData.length) {
      setSuccess(true);
      setError(false);
      const file = await getReport7or9or10File(orderData, "9", report9Values);
      props.firebase.saveReportToFirebase(file);
      props.setReportValues(file);
      props.nextStep();
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    const report9Values = JSON.parse(localStorage.getItem("report9Values"));
    if (report9Values) {
      setreport9Values(report9Values);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("report9Values", JSON.stringify(report9Values));
  }, [report9Values]);

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
        value={report9Values.orderStatus}
        onChange={onChange}
      />
      <Header as="h3">Pickup Point</Header>
      <Dropdown
        placeholder="Pickup Point"
        name="pickupPoint"
        label="Pickup Point"
        selection
        size="large"
        options={REPORTS.pickupPoint}
        value={report9Values.pickupPoint}
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
        value={report9Values.category}
        onChange={onChange}
      />
      <Header as="h3">Date Range of Pickup</Header>
      <Grid style={{ marginTop: "0", marginBottom: "0" }}>
        <SemanticDatepicker
          showToday
          autoComplete="off"
          name="startDate"
          size="large"
          onChange={onChange}
          value={getInitialDate(report9Values.startDate)}
        />
        <SemanticDatepicker
          showToday
          autoComplete="off"
          name="endDate"
          size="large"
          onChange={onChange}
          value={getInitialDate(report9Values.endDate)}
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
          !report9Values.category ||
          !report9Values.orderStatus ||
          !report9Values.pickupPoint ||
          report9Values.startDate == null ||
          report9Values.endDate == null
        }
      />
      {getErrorMessage()}
      {getSuccessMessage()}
    </>
  );
}

export default Report9;
