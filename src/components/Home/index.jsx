import React, { useState } from "react";
import {
  Header,
  Segment,
  Grid,
  Container,
  Icon,
  Button,
  Divider,
  Image,
  List
} from "semantic-ui-react";
import TRANSLATIONS from "../../constants/translation";
import logo from "../../media/logo.png";
import cart_pic from "../../media/cochon-cart.jpeg";
import { Link } from 'react-router-dom'

import { AuthUserContext } from "../Session";

const Home = (props) => {
 
  const { dark, language } = props;
  const { HOME } = TRANSLATIONS[`${language}`];
  const [buttonContent, setButtonContent] = useState('')

  return (
    <>
        {/* <Segment fluid="true" basic inverted={dark} style={{ margin: 0 }}>
      <Divider
        as="h2"
        className="header"
        horizontal
        style={{ margin: 0, padding: "1em 2em", textTransform: "uppercase" }}
        inverted={dark}
        content="APDC Reporting App"
      />
    </Segment> */}
    <Segment placeholder basic>
    <Divider
          as="h1"
          className="header"
          horizontal
          style={{  textTransform: "uppercase" }}
          inverted={dark}
          content="APDC Reporting App"
        />

    <Image
      centered
      size='large'
      src={cart_pic}
    />
 {/* <Header as='h2' icon textAlign='center'>
      <Icon name='clipboard outline' circular />
      <Header.Content>APDC Reporting App</Header.Content>
    </Header> */}
      <AuthUserContext.Consumer>
      {(authUser) => {
        console.log(!!authUser)
        return !!authUser ? 
        <Button 
        as={Link}
        to="/reports"
        // disabled={!authUser}
        positive
        >
          Go to Reports
        </Button>   
        : 
        <Button 
        as={Link}
        to="/signin"
        // disabled={!authUser}
        positive
        >
          Sign In
        </Button>   
      }
      }

    </AuthUserContext.Consumer> 
    </Segment>

    <Container>
      
    <Segment placeholder basic> 
    
    <Divider
          as="h1"
          className="header"
          horizontal
          style={{ margin: "3em 0em", textTransform: "uppercase" }}
          inverted={dark}
          content="List of Reports"
        />
      {/* <Header as='h3' icon textAlign='center'>
      <Icon name='clipboard outline' circular />
      <Header.Content>APDC Reporting App</Header.Content>
    </Header> */}
    {
    [1,2,3,4,5,6,7,8].map((index) => (
        <div key={index}>
        <List selection divided size='huge' inverted={dark}>       
        <List.Item>
          <List.Icon name="chart bar"/>
          <List.Content>
            <List.Header>{`${HOME["report" + index]}`}</List.Header>
            <List.Description>{`${HOME["report" + index + "Description"]}`}</List.Description>
          </List.Content>
        </List.Item>
        </List>
        </div>
    ))    }
    </Segment>
    </Container>





{/* 
    <Segment basic style={{ padding: "8em 0em" }} vertical inverted={dark}>
      <Container text>
        <Header
          as="h3"
          style={{ fontSize: "2em" }}
          textAlign="center"
          inverted={dark}
          content="test4"
        />
        <p style={{ fontSize: "1.33em", textAlign: "center" }}>
          test5
        </p>

        <Divider
          as="h4"
          className="header"
          horizontal
          style={{ margin: "3em 0em", textTransform: "uppercase" }}
          inverted={dark}
          content="test6"
        />
      </Container>
    </Segment> */}
</>

  );
};

export default Home
// export default withAuthorization(condition)(withFirebase(Home))
