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

const { getReport7or9or10File } = require('../../Util/CreateReportFile');

function Report7(props) {
    const { dark, language } = props;
    const { REPORTS, HOME } = TRANSLATIONS[`${language}`];

    const [report7Values, setreport7Values] = useState({
        orderStatus: "",
        category: "",
        startDate: "null",
        endDate: "null"
    })
    function onChange(event, data) {  
        const { name, value } = data;
        setreport7Values(prevState => ({ ...prevState, [name]: (value) }));
    }

    const onSubmit = async () => {
      console.log(report7Values);

      const orderData = await props.firebase.getAllFirebaseOrdersByDateAndCategoryAndStatus(report7Values.startDate, report7Values.endDate, report7Values.orderStatus, report7Values.category)
      console.log(orderData)
      if(orderData.length){
        const file = await getReport7or9or10File(orderData, '7');
        props.firebase.saveReportToFirebase(file);
      }
    }

    useEffect(() => {
        const report7Values = JSON.parse(localStorage.getItem('report7Values'));
        if(report7Values) {
            setreport7Values(report7Values);
        }
      }, []);

    useEffect(() => {
        localStorage.setItem('report7Values', JSON.stringify(report7Values));
        console.log(report7Values);
      }, [report7Values]);
    
  return (
    <>
        <Header as="h2">{HOME.report7}</Header>
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
          value={report7Values.orderStatus}
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
          value={report7Values.category}
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
                  disabled={
                    !report7Values.category
                    || !report7Values.orderStatus 
                    || report7Values.startDate=="null" 
                    || report7Values.endDate=="null" 
                    || report7Values.startDate==null 
                    || report7Values.endDate==null 
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

export default Report7;
