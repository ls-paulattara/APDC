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

const { getReport8File } = require('../../Util/CreateReportFile');

function Report8(props) {
    const { dark, language } = props;
    const { REPORTS,HOME } = TRANSLATIONS[`${language}`];

    const [report8Values, setreport8Values] = useState({
        orderStatus: "",
        category: "",
        startDate: null,
        endDate: null
    })
    function onChange(event, data) {  
        const { name, value } = data;
        setreport8Values(prevState => ({ ...prevState, [name]: (value) }));
      }

    const onSubmit = async () => {
      console.log(report8Values);

      const orderData = await props.firebase.getAllFirebaseOrdersByDateAndCategoryAndStatus(report8Values.startDate, report8Values.endDate, report8Values.orderStatus, "all")
      console.log(orderData)
      if(orderData.length){
        const file = await getReport8File(orderData);
        props.firebase.saveReportToFirebase(file);
      }
    }

    useEffect(() => {
        const report8Values = JSON.parse(localStorage.getItem('report8Values'));
        if(report8Values) {
            setreport8Values(report8Values);
        }
      }, []);

    useEffect(() => {
        localStorage.setItem('report8Values', JSON.stringify(report8Values));
      }, [report8Values]);
    
  return (
    <>
        <Header as="h2">{HOME.report8}</Header>
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
          value={report8Values.orderStatus}
          onChange={onChange}
        />
        <Header as="h3">Category</Header>
        <Input
          name="category"
          value={report8Values.category}
          size="large"
          placeholder='Category'
          icon="tags"
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
                    !report8Values.category ||
                    !report8Values.orderStatus ||
                    report8Values.startDate==null ||
                    report8Values.endDate==null ||
                    report8Values.startDate=="null" ||
                    report8Values.endDate=="null" 
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

export default Report8;
