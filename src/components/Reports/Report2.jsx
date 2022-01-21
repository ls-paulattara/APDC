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
const { getReport1or2File } = require("../../Util/CreateReportFile");

function Report2(props) {
  const { dark, language } = props;
  const { REPORTS, HOME } = TRANSLATIONS[`${language}`];

  const [report2Values, setreport2Values] = useState({
    pickupPoint: "",
    orderStatus: "",
    startDate: null,
    endDate: null,
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (event, data) => {
    let { name, value } = data;
    setreport2Values((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async () => {
    console.log(report2Values);

    const orderData = await props.firebase.getAllFirebaseOrdersByDateAndStatus(
      report2Values.startDate,
      report2Values.endDate,
      report2Values.orderStatus,
      "pickup",
      "Any"
    );
    console.log(orderData);
    if (orderData.length) {
      setSuccess(true);
      setError(false);
      const file = await getReport1or2File(orderData, "2", report2Values);
      // props.firebase.saveReportToFirebase(file);
      props.setReportValues(file);
      props.nextStep();
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    const report2Values = JSON.parse(localStorage.getItem("report2Values"));
    console.log(report2Values);
    if (report2Values) {
      setreport2Values(report2Values);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("report2Values", JSON.stringify(report2Values));
    console.log(report2Values);
  }, [report2Values]);

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
        value={report2Values.orderStatus}
        onChange={onChange}
      />

      <Header as="h3">Pickup Point</Header>
      <Dropdown
        placeholder="Pickup Point"
        name="pickupPoint"
        label="Pickup Point"
        selection
        size="large"
        options={REPORTS.pickupPointWithoutAny}
        value={report2Values.pickupPoint}
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
          value={getInitialDate(report2Values.startDate)}
        />
        <SemanticDatepicker
          showToday
          autoComplete="off"
          name="endDate"
          size="large"
          onChange={onChange}
          value={getInitialDate(report2Values.endDate)}
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
          !report2Values.pickupPoint ||
          !report2Values.orderStatus ||
          report2Values.startDate == null ||
          report2Values.endDate == null
        }
      />
      {getErrorMessage()}
      {getSuccessMessage()}
    </>
  );
}

export default Report2;
