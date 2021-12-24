import React, { useState, useEffect } from 'react';
import TRANSLATIONS from "../../constants/translation";
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

import {
  Header,
  Grid,
  Divider,
  Button,
  Input
} from "semantic-ui-react";

function Report7(props) {
    const { dark, language } = props;
    const { HOME } = TRANSLATIONS[`${language}`];

    const [report7Values, setreport7Values] = useState({
        orderStatus: "",
        category: "",
        startDate: null,
        endDate: null
    })
    function onChange(event, data) {  
        const { name, value } = data;
        setreport7Values(prevState => ({ ...prevState, [name]: (value) }));
      }

    const onSubmit = () => {
        console.log(report7Values)
        // generateReport(1, report7Values)
    }

    useEffect(() => {
        const report7Values = JSON.parse(localStorage.getItem('report7Values'));
        if(report7Values) {
            setreport7Values(report7Values);
        }
      }, []);

    useEffect(() => {
        localStorage.setItem('report7Values', JSON.stringify(report7Values));
      }, [report7Values]);
    
  return (
    <>
        <Header as="h2">Report 7</Header>
        <Divider/>
        <Header as="h3">Order Status</Header>
        <Input
          name="orderStatus"
          value={report7Values.orderStatus}
          size="large"
          placeholder='Order Status'
          icon="clipboard outline"
          onChange={onChange}
        />
        <Header as="h3">Category</Header>
        <Input
          name="category"
          value={report7Values.category}
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
                  disabled={!report7Values.category
                  || !report7Values.orderStatus 
                  || report7Values.startDate==null 
                  || report7Values.endDate==null } 
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
