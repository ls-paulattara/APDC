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
import Success from './Success';
// import Failure from './Failure';
import {
  Segment,
  Container,
  Icon,
  Step
} from "semantic-ui-react";
import ListOfReports from './ListOfReports';

function GenerateReport(props) {
    const [step, setStep] = useState(1);
    const [selectedReport, setSelectedReport] = useState(0);
    // const [isStep1Active, setIsStep1Active] = useState(true);
    // const [isStep2Active, setIsStep2Active] = useState(false);
    // const [isStep3Active, setIsStep3Active] = useState(false);

    const { dark, language } = props;
    // const { HOME } = TRANSLATIONS[`${language}`];
    // let reportID = props.match.params.reportID;
    const nextStep = () => {
        setStep(step + 1)
        // renderSwitch();    
        // switch(step + 1){
        //     case 2:
        //         setIsStep1Active(false)
        //         setIsStep2Active(true)
        //         setIsStep3Active(false)
        //         break;
        //     // case 3:
        //     //     setIsStep1Active(false)
        //     //     setIsStep2Active(false)
        //     //     setIsStep3Active(true)
        // }    
    }
    const prevStep = () => {
        if(step !== 1){
            setStep(step - 1)
            // switch(step - 1){
            //     case 1:
            //         setIsStep1Active(true)
            //         setIsStep2Active(false)
            //         setIsStep3Active(false)
            //         break;
            // }
        }
    }

    useEffect(() => {
      const step = JSON.parse(localStorage.getItem('step'));
      const selectedReport = JSON.parse(localStorage.getItem('selectedReport'));
      if(step) {
          console.log(step)
          setStep(step);
      }
      if(selectedReport){
        setSelectedReport(selectedReport)
        console.log(selectedReport)
      }
    }, []);

  useEffect(() => {
      localStorage.setItem('step', JSON.stringify(step));
    }, [step]);

  useEffect(() => {
      localStorage.setItem('selectedReport', JSON.stringify(selectedReport));
    }, [selectedReport]);

    function renderSwitch () {
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
            }    
            break;    
        case 3:
            return <Success></Success>
            
        }
      }
 
  return (
      <>
        <Container>
          <Segment padded raised inverted={dark}>
          <Step.Group size="large">
          {/* <Step active={step == 1}> */}
          <Step>
            <Icon name='clipboard outline' />
            <Step.Content>
              <Step.Title>Step 1: Report Selection</Step.Title>
              <Step.Description>Please select a report</Step.Description>
            </Step.Content>
          </Step>
          {/* <Step active={step == 2} > */}
          <Step >
            <Icon name='info' />
            <Step.Content>
              <Step.Title>Step 2: Report Info</Step.Title>
              <Step.Description>Please fill in the required fields</Step.Description>
            </Step.Content>
          </Step>
          </Step.Group>
      {renderSwitch()}
    </Segment>
    </Container>
    </>
  )
}
const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(withFirebase(GenerateReport))