import React, { useState, useEffect } from 'react';

import TRANSLATIONS from "../../constants/translation";
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import {
  Header,
  Grid,
  Divider,
  Button,
  Input,
  Dropdown
} from "semantic-ui-react";

const { getReport12File } = require('../../Util/CreateReportFile');


function Report12(props) {
    const { dark, language } = props;
    const { REPORTS, HOME } = TRANSLATIONS[`${language}`];

    const [report12Values, setReport12Values] = useState({
        deliveryZone: "",
        orderStatus: "",
        startDate: null,
        endDate: null
    })
    function onChange(event, data) {  
        const { name, value } = data;
        setReport12Values(prevState => ({ ...prevState, [name]: (value) }));
      }

    const onSubmit = async () => {

        console.log(report12Values);

        const orderData = await props.firebase.getAllFirebaseOrdersByDateAndStatus(report12Values.startDate, report12Values.endDate, report12Values.orderStatus, "delivery", report12Values.deliveryZone)
        console.log(orderData)
        if(orderData.length){
          const html = getReport12File(orderData);
          // const url = await props.firebase.saveReportToFirebase(file);

          props.setReportValues(html);
          props.nextStep();
        }
    }

    useEffect(() => {
        const report12Values = JSON.parse(localStorage.getItem('report12Values'));
        console.log(report12Values);
        if(report12Values) {
            setReport12Values(report12Values);
        }
      }, []);

    useEffect(() => {
        localStorage.setItem('report12Values', JSON.stringify(report12Values));
        console.log(report12Values);
      }, [report12Values]);
    
  return (
    <>
        <Header as="h2">{HOME.report12}</Header>
        <Divider/>
        <Header as="h3">Order Status</Header>
        <Dropdown       
          placeholder='Order Status'
          name="orderStatus"
          label="Order Status"
          selection
          size="large"
          options={REPORTS.orderStatus}
          // icon="clipboard outline"
          value={report12Values.orderStatus}
          onChange={onChange}
        />

        <Header as="h3">Delivery Zone</Header>
        <Dropdown
        placeholder="Delivery Zone"
        name="deliveryZone"
        label="Delivery Zone"
        selection
        size="large"
        options={REPORTS.deliveryZone}
        value={report12Values.deliveryZone}
        onChange={onChange}
      />
        <Header as="h3">Date Range of Pickup</Header>
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
                  disabled={
                      !report12Values.orderStatus 
                    ||!report12Values.deliveryZone 
                    || report12Values.startDate=="null" 
                    || report12Values.endDate=="null" 
                    || report12Values.startDate==null 
                    || report12Values.endDate==null 
                  } 
                  onClick={() => onSubmit()}
                  >Generate
                </Button>
              </Grid.Column>
            </Grid.Row>
        </Grid>
    </>
  );
};

export default Report12;