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

const { getReport8or11File } = require('../../Util/CreateReportFile');

function Report11(props) {
    const { dark, language } = props;
    const { REPORTS, HOME } = TRANSLATIONS[`${language}`];

    const [report11Values, setreport11Values] = useState({
        orderStatus: "",
        category: "",
        startDate: null,
        endDate: null,
        carrier: ""
    })
    function onChange(event, data) {  
        const { name, value } = data;
        setreport11Values(prevState => ({ ...prevState, [name]: (value) }));
    }

    const onSubmit = async () => {
      console.log(report11Values);

      const orderData = await props.firebase.getAllFirebaseOrdersByOrderDateAndCategoryAndStatusAndCarrier(report11Values.startDate, report11Values.endDate, report11Values.orderStatus, report11Values.category, report11Values.carrier)
      console.log(orderData)
      if(orderData.length){
        const file = await getReport8or11File(orderData, '11');
        props.firebase.saveReportToFirebase(file);
      }
    }

    useEffect(() => {
        const report11Values = JSON.parse(localStorage.getItem('report11Values'));
        if(report11Values) {
            setreport11Values(report11Values);
        }
      }, []);

    useEffect(() => {
        localStorage.setItem('report11Values', JSON.stringify(report11Values));
      }, [report11Values]);
    
  return (
    <>
        <Header as="h2">{HOME.report11}</Header>
        <Divider/>
        <Header as="h3">Carrier</Header>
        <Dropdown          
          placeholder='Carrier'
          name="carrier"
          label="Carrier"
          selection
          size="large"
          options={REPORTS.carrierType}
          // icon="clipboard outline"
          value={report11Values.carrier}
          onChange={onChange}
        />
        <Header as="h3">Order Status</Header>
        <Dropdown          
          placeholder='Order Status'
          name="orderStatus"
          label="Order Status"
          selection
          size="large"
          options={REPORTS.orderStatus}
          // icon="clipboard outline"
          value={report11Values.orderStatus}
          onChange={onChange}
        />
        <Header as="h3">Category</Header>
        <Dropdown          
          placeholder='Category'
          name="category"
          label="Category"
          selection
          size="large"
          options={REPORTS.category}
          // icon="clipboard outline"
          value={report11Values.category}
          onChange={onChange}
        />
        <Header as="h3">Date Range of Order</Header>
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
                  disabled=
                  {
                    !report11Values.category ||
                    !report11Values.carrier ||
                    !report11Values.orderStatus ||
                    report11Values.startDate==null ||
                    report11Values.endDate==null ||
                    report11Values.startDate=="null" ||
                    report11Values.endDate=="null" 
                } 
                  onClick={() => onSubmit()}
                  >Submit
                </Button>
              </Grid.Column>
            </Grid.Row>
        </Grid>
    </>
  );
};

export default Report11;