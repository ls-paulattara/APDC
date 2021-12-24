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

const {getReport1or2File} = require('../../Util/CreateReportFile');


function Report2(props) {
    const { dark, language } = props;
    const { REPORTS, HOME } = TRANSLATIONS[`${language}`];

    const [report2Values, setreport2Values] = useState({
        pickupPoint: "",
        orderStatus: "",
        startDate: null,
        endDate: null
    })
    function onChange(event, data) {  
        const { name, value } = data;
        setreport2Values(prevState => ({ ...prevState, [name]: (value) }));
      }

    const onSubmit = async () => {
        console.log(report2Values);

        const orderData = await props.firebase.getAllFirebaseOrdersByDateAndStatus(report2Values.startDate, report2Values.endDate, report2Values.orderStatus, "pickup", report2Values.pickupPoint)
        console.log(orderData)
        if(orderData.length){
          const file = await getReport1or2File(orderData, '2');
          props.firebase.saveReportToFirebase(file);
        }
    }

    useEffect(() => {
        const report2Values = JSON.parse(localStorage.getItem('report2Values'));
        console.log(report2Values);
        if(report2Values) {
            setreport2Values(report2Values);
        }
      }, []);

    useEffect(() => {
        localStorage.setItem('report2Values', JSON.stringify(report2Values));
        console.log(report2Values);
      }, [report2Values]);
    
  return (
    <>
        <Header as="h2">{HOME.report2}</Header>
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
          value={report2Values.orderStatus}
          onChange={onChange}
        />

        <Header as="h3">Pickup Point</Header>
        <Dropdown
        placeholder="Pickup Point"
        name="pickupPoint"
        label="Pickup Point"
        selection
        size="large"
        options={REPORTS.pickupPoint}
        value={report2Values.pickupPoint}
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
                  disabled={!report2Values.pickupPoint 
                  || !report2Values.orderStatus 
                  || report2Values.startDate==null 
                  || report2Values.endDate==null } 
                  onClick={() => onSubmit()}
                  >Submit
                </Button>
              </Grid.Column>
            </Grid.Row>
        </Grid>
    </>
  );
};

export default Report2;
