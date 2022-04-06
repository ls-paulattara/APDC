import React, { useState, useEffect } from "react";
import TRANSLATIONS from "../../constants/translation";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";

import { Header, Divider, Button, Dropdown, Message, Icon } from "semantic-ui-react";

const { getInitialDate } = require("../../Util/HelperFunctions");
const { getReport4File } = require("../../Util/CreateReportFile");

function Report4(props) {
  const { language } = props;
  const { REPORTS } = TRANSLATIONS[`${language}`];

  const [report4Values, setreport4Values] = useState({
    deliveryZone: "",
    orderStatus: "",
    startDate: null,
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  function onChange(event, data) {
    const { name, value } = data;
    setreport4Values((prevState) => ({ ...prevState, [name]: value }));
  }

  const onSubmit = async () => {
    //  console.log(report4Values);

    let orderData = [];
    orderData = await props.firebase.getAllFirebaseOrdersByDateAndStatus(
      report4Values.startDate,
      report4Values.startDate,
      report4Values.orderStatus,
      "delivery",
      // "Any"
      report4Values.deliveryZone
    );
    //  console.log(orderData);

    if (orderData.length) {
      try {
        const file = await getReport4File(orderData);
        //  console.log(file);
        if (file) {
          setSuccess(true);
          setError(false);
        }
      } catch (e) {
        setError(true);
      }
      // await props.firebase.saveReportToFirebase(file);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    const report4Values = JSON.parse(localStorage.getItem("report4Values"));
    if (report4Values) {
      setreport4Values(report4Values);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("report4Values", JSON.stringify(report4Values));
    //  console.log(report4Values);
  }, [report4Values]);

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

  const generateNewReport = () => {
    props.setStep(1);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* <Header as="h2">{HOME.report4}</Header>
      <Divider /> */}
      <Header as="h3">Order Status</Header>
      <Dropdown
        placeholder="Order Status"
        name="orderStatus"
        label="Order Status"
        selection
        size="large"
        options={props.orderStatusOptions}
        // icon="clipboard outline"
        value={report4Values.orderStatus}
        onChange={onChange}
      />
      <Header as="h3">Delivery Zone</Header>

      <Dropdown placeholder="Delivery Zone" name="deliveryZone" label="Delivery Zone" selection size="large" options={props.deliveryZoneOptions} value={report4Values.deliveryZone} onChange={onChange} />
      <Header as="h3">Date of Delivery</Header>
      <SemanticDatepicker showToday autoComplete="off" name="startDate" size="large" onChange={onChange} value={getInitialDate(report4Values.startDate)} />
      <Divider />
      <Button content="Back" icon="left arrow" size="large" labelPosition="left" onClick={() => props.prevStep()} />
      <Button positive content="Download" icon="right arrow" size="large" labelPosition="right" onClick={() => onSubmit()} disabled={!report4Values.deliveryZone || !report4Values.orderStatus || report4Values.startDate == null} />
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
    </>
  );
}
export default Report4;
