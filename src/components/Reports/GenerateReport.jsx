import React, { useState, useEffect } from 'react';
import { withFirebase } from "../Firebase";
import { withAuthorization } from "../Session";
// import TRANSLATIONS from "../../constants/translation";
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import Report1 from './Report1';
import Report2 from './Report2'
import Report3 from './Report3'
import Report7 from './Report7'
import Report8 from './Report8'
import Report9 from './Report9'
import Report10 from './Report10'
import Report11 from './Report11'
import Report12 from './Report12'
import ListOfReports from './ListOfReports';
import DisplayReport from './DisplayReport';
// import Failure from './Failure';
import {
  Segment,
  Container,
  Icon,
  Step
} from "semantic-ui-react";


function GenerateReport(props) {
    // const { HOME } = TRANSLATIONS[`${language}`];
    const { dark, language } = props;

    const [step, setStep] = useState(1);
    const [selectedReport, setSelectedReport] = useState(0);
    const [reportValues, setReportValues] = useState({ });

    const nextStep = () => {
        setStep(step + 1)
    }
    const prevStep = () => {
        if(step !== 1){
            setStep(step - 1)
        }
    }

    useEffect(() => {
      const step = JSON.parse(localStorage.getItem('step'));
      const selectedReport = JSON.parse(localStorage.getItem('selectedReport'));

      if(step) {
        if(step == 3){
          setStep(2);
        }
        else{
          setStep(step);
        }
          // console.log(step)
      }
      if(selectedReport){
        setSelectedReport(selectedReport)
        // console.log(selectedReport)
      }
    }, []);



    useEffect(() => {
      localStorage.setItem('step', JSON.stringify(step));
    }, [step]);

    useEffect(() => {
      localStorage.setItem('selectedReport', JSON.stringify(selectedReport));
    }, [selectedReport]);



    function renderSelectedReport () {
        switch(step) {
          case 1:
            return (
            <ListOfReports 
              {...props} 
              prevStep={prevStep} 
              nextStep={nextStep} 
              setSelectedReport={setSelectedReport} 
            />
            )
              
          case 2:
            switch(selectedReport){
                case 1: 
                    return( 
                    <Report1 
                        {...props} 
                        prevStep={prevStep} 
                        nextStep={nextStep} 
                        setSelectedReport={setSelectedReport} 
                        setReportValues={setReportValues}
                        dark={dark}
                    />)
                case 2: 
                    return( 
                    <Report2
                        {...props} 
                        prevStep={prevStep} 
                        nextStep={nextStep}
                        setSelectedReport={setSelectedReport} 
                        dark={dark}
                    />)
                case 3: 
                    return( 
                    <Report3
                      {...props} 
                      prevStep={prevStep} 
                      nextStep={nextStep} 
                      setSelectedReport={setSelectedReport} 
                      setReportValues={setReportValues}
                      dark={dark}
                    />)
                case 7: 
                    return( 
                    <Report7
                      {...props} 
                      prevStep={prevStep} 
                      nextStep={nextStep} 
                      setSelectedReport={setSelectedReport} 
                      dark={dark}
                    />)
                case 8: 
                    return( 
                    <Report8
                      {...props} 
                      prevStep={prevStep} 
                      nextStep={nextStep} 
                      setSelectedReport={setSelectedReport} 
                      dark={dark}
                    />)
                case 9: 
                    return( 
                    <Report9
                      {...props} 
                      prevStep={prevStep} 
                      nextStep={nextStep} 
                      setSelectedReport={setSelectedReport} 
                      dark={dark}
                    />)   
                case 10: 
                    return( 
                    <Report10
                      {...props} 
                      prevStep={prevStep} 
                      nextStep={nextStep} 
                      setSelectedReport={setSelectedReport} 
                      dark={dark}
                    />)   
                case 11: 
                    return( 
                    <Report11
                      {...props} 
                      prevStep={prevStep} 
                      nextStep={nextStep} 
                      setSelectedReport={setSelectedReport} 
                      dark={dark}
                    />)
                case 12: 
                    return( 
                    <Report12
                      {...props} 
                      prevStep={prevStep} 
                      nextStep={nextStep} 
                      setSelectedReport={setSelectedReport} 
                      setReportValues={setReportValues}
                      dark={dark}
                    />)                           
            }    
            break;    
        case 3:
            return(
            <DisplayReport 
              {...props} 
              prevStep={prevStep}
              selectedReport={selectedReport}
              reportNumber={selectedReport}
              reportValues={reportValues}
            />)   
        }
      }
 
  return (
      <>
        <Container>
          <Segment padded raised inverted={dark}>
            <Step.Group widths={3} size='large'>
            
            <Step active={step == 1}>
              <Icon name='clipboard outline' />
              <Step.Content>
                <Step.Title>Step 1: Report Selection</Step.Title>
                <Step.Description>Please select a report</Step.Description>
              </Step.Content>
            </Step>

            <Step active={step == 2}>
              <Icon name='info' />
              <Step.Content>
                <Step.Title>Step 2: Report Info</Step.Title>
                <Step.Description>Please fill in the required fields</Step.Description>
              </Step.Content>
            </Step>

            <Step active={step == 3}>
              <Icon name='numbered list' />
              <Step.Content>
                <Step.Title>Step 3: View Report</Step.Title>
                <Step.Description>View the report</Step.Description>
              </Step.Content>
            </Step>

            </Step.Group>
            {renderSelectedReport()}
          </Segment>
    </Container>
    </>
  )
}
const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(withFirebase(GenerateReport))