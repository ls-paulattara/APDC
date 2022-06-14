import React, { useState, useEffect } from "react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import { Header, Grid, Divider, Button, Message, Icon } from "semantic-ui-react";

const { getInitialDate, mergeProductsSameFormat } = require("../../Util/HelperFunctions");
const { getReport3Or15File } = require("../../Util/CreateReportFile");

function Report15(props) {
  const [report15Values, setreport15Values] = useState({
    startDate: null,
    endDate: null,
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (event, data) => {
    let { name, value } = data;
    setreport15Values((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async () => {
    //  console.log(report15Values);
    let orderData = [];
    orderData = await props.firebase.getAllFirebaseOrdersByDeliveryDate(report15Values.startDate, report15Values.endDate);
    await mergeProductsSameFormat(orderData);

    // console.log(orderData);
    if (orderData.length) {
      try {
        setLoading(true);
        setError(false);
        let locations = await props.firebase.getAllLocations();
        //  console.log(locations);
        const file = await getReport3Or15File(orderData, report15Values, locations, "15");
        // const url = await props.firebase.saveReportToFirebase(file);
        props.setReportValues(file);
        props.nextStep();
      } catch (e) {
        setError(true);
        setLoading(false);
      }
    } else {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    const report15Values = JSON.parse(localStorage.getItem("report15Values"));
    if (report15Values) {
      setreport15Values(report15Values);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("report15Values", JSON.stringify(report15Values));
  }, [report15Values]);

  const getErrorMessage = () =>
    error ? (
      <Message
        negative
        header="Error"
        content="No results were found. Or there are some locations in the Admin section that are either missing or not typed exactly the same way as in Liquid Delivery. Add additional locations to ensure that all locations are included. To view which locations are missing or not properly typed out, check the developer console in your browser. https://balsamiq.com/support/faqs/browserconsole/ Look at the last line of the console where it is written undefined to see which location is causing the issue."
      />
    ) : (
      ""
    );
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
      <Header as="h3">Delivery Date Range of Order</Header>
      <Grid style={{ marginTop: "0", marginBottom: "0" }}>
        <SemanticDatepicker showToday autoComplete="off" name="startDate" size="large" onChange={onChange} value={getInitialDate(report15Values.startDate)} />
        <SemanticDatepicker showToday autoComplete="off" name="endDate" size="large" onChange={onChange} value={getInitialDate(report15Values.endDate)} />
      </Grid>
      <Divider />
      <Button content="Back" icon="left arrow" size="large" labelPosition="left" onClick={() => props.prevStep()} />
      <Button positive content="Next" icon="right arrow" size="large" labelPosition="right" onClick={() => onSubmit()} disabled={report15Values.startDate == null || report15Values.endDate == null} />
      {getErrorMessage()}
      {getLoadingMessage()}
    </>
  );
}

export default Report15;
