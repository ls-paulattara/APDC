import React, { useState, useEffect } from "react";
import TRANSLATIONS from "../../constants/translation";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";

import { Header, Grid, Divider, Button, Dropdown, Message, Icon } from "semantic-ui-react";

const { getInitialDate } = require("../../Util/HelperFunctions");
const { getReport1or2File } = require("../../Util/CreateReportFile");

function Report1(props) {
  const { dark, language } = props;
  const { REPORTS, HOME } = TRANSLATIONS[`${language}`];

  const [report1Values, setreport1Values] = useState({
    deliveryZone: "",
    orderStatus: "",
    startDate: null,
    endDate: null,
    deliveryZoneOptions: [],
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  function onChange(event, data) {
    const { name, value } = data;
    setreport1Values((prevState) => ({ ...prevState, [name]: value }));
  }

  const onSubmit = async () => {
    console.log(report1Values);

    let orderData = [];
    orderData = await props.firebase.getAllFirebaseOrdersByDateAndStatus(
      report1Values.startDate,
      report1Values.endDate,
      report1Values.orderStatus,
      "delivery",
      // "Any"
      report1Values.deliveryZone
    );
    console.log(orderData);
    if (orderData.length) {
      setSuccess(true);
      setError(false);
      const file = await getReport1or2File(orderData, "1", report1Values);
      // await props.firebase.saveReportToFirebase(file);
      props.setReportValues(file);
      props.nextStep();
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    // let options = [...REPORTS.deliveryZone]; //.shift();
    // console.log(options);
    // // setreport1Values({ deliveryZoneOptions: options });
    // setreport1Values((prevState) => ({
    //   ...prevState,
    //   deliveryZoneOptions: options,
    // }));

    const report1Values = JSON.parse(localStorage.getItem("report1Values"));
    if (report1Values) {
      setreport1Values(report1Values);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("report1Values", JSON.stringify(report1Values));
    console.log(report1Values);
  }, [report1Values]);

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
      {/* <Header as="h2">{HOME.report1}</Header>
      <Divider /> */}
      <Header as="h3">Order Status</Header>
      <Dropdown
        placeholder="Order Status"
        name="orderStatus"
        label="Order Status"
        selection
        size="large"
        options={REPORTS.orderStatus}
        // icon="clipboard outline"
        value={report1Values.orderStatus}
        onChange={onChange}
      />
      <Header as="h3">Delivery Zone</Header>
      {/* <Input
        name="deliveryZone"
        value={report1Values.deliveryZone}
        size="large"
        placeholder='Delivery Zone'
        icon="truck"
        onChange={onChange}
      /> */}
      <Dropdown placeholder="Delivery Zone" name="deliveryZone" label="Delivery Zone" selection size="large" options={REPORTS.deliveryZoneWithoutAny} value={report1Values.deliveryZone} onChange={onChange} />
      <Header as="h3">Date Range of Delivery</Header>
      <Grid style={{ marginTop: "0", marginBottom: "0" }}>
        <SemanticDatepicker showToday autoComplete="off" name="startDate" size="large" onChange={onChange} value={getInitialDate(report1Values.startDate)} />
        <SemanticDatepicker showToday autoComplete="off" name="endDate" size="large" onChange={onChange} value={getInitialDate(report1Values.endDate)} />
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
        disabled={!report1Values.deliveryZone || !report1Values.orderStatus || report1Values.startDate == null || report1Values.endDate == null}
      />
      {getErrorMessage()}
      {getSuccessMessage()}
    </>
  );
}
export default Report1;
