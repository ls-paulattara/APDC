import React, { useState, useEffect } from "react";
import TRANSLATIONS from "../../constants/translation";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";

import { Header, Grid, Divider, Button, Dropdown, Message, Icon } from "semantic-ui-react";

const { getInitialDate } = require("../../Util/HelperFunctions");
const { getReport7or9or10File } = require("../../Util/CreateReportFile");

function Report10(props) {
  const { language } = props;
  const { REPORTS } = TRANSLATIONS[`${language}`];

  const [report10Values, setreport10Values] = useState({
    orderStatus: "",
    deliveryZone: "",
    category: "",
    startDate: null,
    endDate: null,
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (event, data) => {
    let { name, value } = data;
    setreport10Values((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async () => {
    //  console.log(report10Values);

    const orderData = await props.firebase.getAllFirebaseOrdersByDateAndCategoryAndStatusAndLocation(report10Values.startDate, report10Values.endDate, report10Values.orderStatus, report10Values.category, "delivery", report10Values.deliveryZone);
    //  console.log(orderData);
    if (orderData.length) {
      try {
        setSuccess(true);
        setError(false);
        const file = await getReport7or9or10File(orderData, "10", report10Values);
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
    const report10Values = JSON.parse(localStorage.getItem("report10Values"));
    if (report10Values) {
      setreport10Values(report10Values);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("report10Values", JSON.stringify(report10Values));
  }, [report10Values]);

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
        value={report10Values.orderStatus}
        onChange={onChange}
      />
      <Header as="h3">Delivery Zone</Header>
      <Dropdown placeholder="Delivery Zone" name="deliveryZone" label="Delivery Zone" selection size="large" options={props.deliveryZoneOptions} value={report10Values.deliveryZone} onChange={onChange} />
      <Header as="h3">Category</Header>
      <Dropdown
        placeholder="Category"
        name="category"
        label="Category"
        selection
        size="large"
        options={props.categoryOptions}
        // icon="clipboard outline"
        value={report10Values.category}
        onChange={onChange}
      />
      <Header as="h3">Date Range of Delivery</Header>
      <Grid style={{ marginTop: "0", marginBottom: "0" }}>
        <SemanticDatepicker showToday autoComplete="off" name="startDate" size="large" onChange={onChange} value={getInitialDate(report10Values.startDate)} />
        <SemanticDatepicker showToday autoComplete="off" name="endDate" size="large" onChange={onChange} value={getInitialDate(report10Values.endDate)} />
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
        disabled={!report10Values.category || !report10Values.orderStatus || !report10Values.deliveryZone || report10Values.startDate == null || report10Values.endDate == null}
      />
      {getErrorMessage()}
      {getSuccessMessage()}
    </>
  );
}

export default Report10;
