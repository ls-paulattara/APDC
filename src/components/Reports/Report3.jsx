import React, { useState, useEffect } from 'react';
import TRANSLATIONS from "../../constants/translation";
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

import {
  Header,
  Grid,
  Divider,
  Button
} from "semantic-ui-react";

const { getReport3File } = require('../../Util/CreateReportFile');

function Report3(props) {
    const { dark, language } = props;
    const { HOME } = TRANSLATIONS[`${language}`];

    const [report3Values, setreport3Values] = useState({
        startDate: null,
        endDate: null
    })
    function onChange(event, data) {  
        const { name, value } = data;
        setreport3Values(prevState => ({ ...prevState, [name]: (value) }));
      }

    const onSubmit = async () => {
        console.log(report3Values)
        let orderData = [];
        orderData = await props.firebase.getAllFirebaseOrdersByDate(report3Values.startDate, report3Values.endDate)
        console.log(orderData)
        if(orderData.length){
          const file = await getReport3File(orderData);
          props.firebase.saveReportToFirebase(file);
        }
    }

    useEffect(() => {
        const report3Values = JSON.parse(localStorage.getItem('report3Values'));
        if(report3Values) {
            setreport3Values(report3Values);
        }
      }, []);

    useEffect(() => {
        localStorage.setItem('report3Values', JSON.stringify(report3Values));
      }, [report3Values]);
    
  return (
    <>
        <Header as="h2">{HOME.report3}</Header>
        <Divider/>
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
                    report3Values.startDate=="null" || 
                    report3Values.endDate=="null"  || 
                    report3Values.startDate==null ||
                    report3Values.endDate==null
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

export default Report3;
