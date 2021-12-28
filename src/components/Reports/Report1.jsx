import React, { useState, useEffect } from 'react';
import TRANSLATIONS from "../../constants/translation";
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import {
  Header,
  Grid,
  Divider,
  Button,
  Dropdown,
  Message
} from "semantic-ui-react";

const {getReport1or2File} = require('../../Util/CreateReportFile');

function Report1(props) {
    const { dark, language } = props;
    const { REPORTS, HOME } = TRANSLATIONS[`${language}`];

    const [report1Values, setreport1Values] = useState({
        deliveryZone: "",
        orderStatus: "",
        startDate: null,
        endDate: null
    })
    function onChange(event, data) {  
        const { name, value } = data;
        setreport1Values(prevState => ({ ...prevState, [name]: (value) }));
      }

    const onSubmit = async () => {
        console.log(report1Values);

        let orderData = [];
        orderData = await props.firebase.getAllFirebaseOrdersByDateAndStatus(report1Values.startDate, report1Values.endDate, report1Values.orderStatus, "delivery", report1Values.deliveryZone)
        console.log(orderData)
        if(orderData.length){
          const file = await getReport1or2File(orderData, '1');
          props.firebase.saveReportToFirebase(file);
        }
    }

  useEffect(() => {
      const report1Values = JSON.parse(localStorage.getItem('report1Values'));
      if(report1Values) {
          setreport1Values(report1Values);
      }
    }, []);
    
  useEffect(() => {
      localStorage.setItem('report1Values', JSON.stringify(report1Values));
      console.log(report1Values);
    }, [report1Values]);

  return (
    <>
      <Header as="h2">{HOME.report1}</Header>
      <Divider/>
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
      <Dropdown
        placeholder="Delivery Zone"
        name="deliveryZone"
        label="Delivery Zone"
        selection
        size="large"
        options={REPORTS.deliveryZone}
        value={report1Values.deliveryZone}
        onChange={onChange}
      />
      <Header as="h3">Date Range of Delivery</Header>
      <SemanticDatepicker 
        showToday
        autoComplete="off" 
        name="startDate" 
        size="large" 
        onChange={onChange} 
      />
      <SemanticDatepicker 
        showToday
        autoComplete="off" 
        name="endDate" 
        size="large" 
        onChange={onChange} 
      />
      {/* <Grid>
          <Grid.Column computer={4} mobile={16}>
              <SemanticDatepicker 
              autoComplete="off" 
              name="startDate" 
              size="large" 
              onChange={onChange} 
          />
          </Grid.Column>
          <Grid.Column computer={4} mobile={16}>
              <SemanticDatepicker 
                  autoComplete="off" 
                  name="endDate" 
                  size="large" 
                  onChange={onChange} 
              />
          </Grid.Column>
      </Grid> */}
      <Divider />
      <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <Button 
                onClick={() => props.prevStep()}
                >Back
              </Button>
            </Grid.Column>
            <Grid.Column width={8}>
              <Button 
                positive
                disabled=
                {
                  !report1Values.deliveryZone ||
                  !report1Values.orderStatus  || 
                  report1Values.startDate=="null" ||
                  report1Values.endDate=="null" ||
                  report1Values.startDate==null ||
                  report1Values.endDate==null 
                } 
                onClick={() => onSubmit()}
                >Generate
              </Button>
            </Grid.Column>
          </Grid.Row>

          {/* <Grid.Row>
          <Message negative floating>
            <Message.Header>We're sorry we can't apply that discount</Message.Header>
            </Message>
          </Grid.Row> */}
      </Grid>
    </>
  );
};

export default Report1;
