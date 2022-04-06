import React, { useState, useEffect } from "react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import { Header, Grid, Divider, Button, Message, Icon } from "semantic-ui-react";

const { getInitialDate } = require("../../Util/HelperFunctions");
const { getReport3Or15File } = require("../../Util/CreateReportFile");

function Report3(props) {
  const [report3Values, setreport3Values] = useState({
    startDate: null,
    endDate: null,
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (event, data) => {
    let { name, value } = data;
    setreport3Values((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async () => {
    console.log(report3Values);
    let orderData = [];
    orderData = await props.firebase.getAllFirebaseOrdersByDate(report3Values.startDate, report3Values.endDate);
    console.log(orderData);
    if (orderData.length) {
      console.log("yes");
      setLoading(true);
      setError(false);
      let locations = await props.firebase.getAllLocations();
      //  console.log(locations);
      try {
        const file = await getReport3Or15File(orderData, report3Values, locations, "3");
        // const url = await props.firebase.saveReportToFirebase(file);
        props.setReportValues(file);
        props.nextStep();
      } catch (e) {
        console.log(e.message);
        setError(true);
        setLoading(false);
      }
    } else {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    const report3Values = JSON.parse(localStorage.getItem("report3Values"));
    if (report3Values) {
      setreport3Values(report3Values);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("report3Values", JSON.stringify(report3Values));
  }, [report3Values]);

  const getErrorMessage = () => (error ? <Message negative header="No results" content="No results were found. Try again" /> : "");
  const getLoadingMessage = () =>
    loading ? (
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
      <Header as="h3">Date Range of Order</Header>
      <Grid style={{ marginTop: "0", marginBottom: "0" }}>
        <SemanticDatepicker showToday autoComplete="off" name="startDate" size="large" onChange={onChange} value={getInitialDate(report3Values.startDate)} />
        <SemanticDatepicker showToday autoComplete="off" name="endDate" size="large" onChange={onChange} value={getInitialDate(report3Values.endDate)} />
      </Grid>
      <Divider />
      <Button content="Back" icon="left arrow" size="large" labelPosition="left" onClick={() => props.prevStep()} />
      <Button positive content="Next" icon="right arrow" size="large" labelPosition="right" onClick={() => onSubmit()} disabled={report3Values.startDate == null || report3Values.endDate == null} />
      {getErrorMessage()}
      {getLoadingMessage()}
    </>
  );
}

export default Report3;
