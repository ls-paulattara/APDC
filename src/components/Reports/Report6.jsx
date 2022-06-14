import React, { useState, useEffect } from "react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import { Header, Divider, Button, Dropdown, Message, Icon } from "semantic-ui-react";

const { getInitialDate, mergeProductsSameFormat } = require("../../Util/HelperFunctions");
const { getReport6File } = require("../../Util/CreateReportFile");

function Report6(props) {
  const [report6Values, setReport6Values] = useState({
    deliveryZone: "",
    orderStatus: "",
    startDate: null,
    category: "",
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  function onChange(event, data) {
    const { name, value } = data;
    setReport6Values((prevState) => ({ ...prevState, [name]: value }));
  }

  const onSubmit = async () => {
    setError(false);
    setSuccess(true);

    //  console.log(report6Values);

    let orderData = await props.firebase.getAllFirebaseOrdersByDateAndCategoryAndStatusAndLocation(report6Values.startDate, report6Values.startDate, report6Values.orderStatus, report6Values.category, "delivery", report6Values.deliveryZone);
    await mergeProductsSameFormat(orderData);

    // console.log(orderData);

    // Keep only entries with Drivers
    orderData = orderData.filter((order) => order.hasOwnProperty("driver"));
    //  console.log("new order data", orderData);

    if (orderData.length) {
      try {
        setSuccess(true);
        setError(false);
        const file = await getReport6File(orderData, report6Values);
        // await props.firebase.saveReportToFirebase(file);
        props.setReportValues(file);
        props.nextStep();
      } catch (e) {
        setSuccess(false);
        setError(true);
      }
    } else {
      setSuccess(false);
      setError(true);
    }
  };

  useEffect(() => {
    const report6Values = JSON.parse(localStorage.getItem("report6Values"));
    if (report6Values) {
      setReport6Values(report6Values);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("report6Values", JSON.stringify(report6Values));
    //  console.log(report6Values);
  }, [report6Values]);

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
        value={report6Values.orderStatus}
        onChange={onChange}
      />
      <Header as="h3">Delivery Zone</Header>
      <Dropdown placeholder="Delivery Zone" name="deliveryZone" label="Delivery Zone" selection size="large" options={props.deliveryZoneOptions} value={report6Values.deliveryZone} onChange={onChange} />
      <Header as="h3">Category</Header>
      <Dropdown placeholder="Category" name="category" label="Category" selection size="large" options={props.categoryOptions} value={report6Values.category} onChange={onChange} />
      <Header as="h3">Date of Delivery</Header>
      <SemanticDatepicker showToday autoComplete="off" name="startDate" size="large" onChange={onChange} value={getInitialDate(report6Values.startDate)} />
      <Divider />
      <Button content="Back" icon="left arrow" size="large" labelPosition="left" onClick={() => props.prevStep()} />
      <Button positive content="Next" icon="right arrow" size="large" labelPosition="right" onClick={() => onSubmit()} disabled={!report6Values.deliveryZone || !report6Values.orderStatus || report6Values.startDate == null} />
      {getErrorMessage()}
      {getSuccessMessage()}
    </>
  );
}
export default Report6;
