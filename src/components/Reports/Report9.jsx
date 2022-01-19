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

function Report9(props) {
    const { dark, language } = props;
    const { REPORTS,HOME } = TRANSLATIONS[`${language}`];

    const [report9Values, setreport9Values] = useState({
        orderStatus: "",
        pickupPoint: "",
        category: "",
        startDate: null,
        endDate: null
    })
    function onChange(event, data) {  
        const { name, value } = data;
        setreport9Values(prevState => ({ ...prevState, [name]: (value) }));
    }

    const onSubmit = async () => {
      console.log(report9Values);

      const orderData = await props.firebase.getAllFirebaseOrdersByDateAndCategoryAndStatusAndLocation(report9Values.startDate, report9Values.endDate, report9Values.orderStatus, report9Values.category, "pickup", report9Values.pickupPoint)
      console.log(orderData)
      if(orderData.length){
        const file = await getReport7or9or10File(orderData, '9');
        // props.firebase.saveReportToFirebase(file);
      }
    }

    useEffect(() => {
        const report9Values = JSON.parse(localStorage.getItem('report9Values'));
        if(report9Values) {
            setreport9Values(report9Values);
        }
      }, []);

    useEffect(() => {
        localStorage.setItem('report9Values', JSON.stringify(report9Values));
      }, [report9Values]);
    
  return (
    <>
        <Header as="h2">{HOME.report9}</Header>
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
          value={report9Values.orderStatus}
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
        value={report9Values.pickupPoint}
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
          value={report9Values.category}
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
                  disabled=
                  {
                    !report9Values.category ||
                    !report9Values.orderStatus ||
                    !report9Values.pickupPoint ||
                    report9Values.startDate==null ||
                    report9Values.endDate==null ||
                    report9Values.startDate=="null" ||
                    report9Values.endDate=="null" 
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

export default Report9;
