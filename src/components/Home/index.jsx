import React, { useState } from "react";
import { Segment, Container, Button, Divider, Image, List } from "semantic-ui-react";
import TRANSLATIONS from "../../constants/translation";
import cart_pic from "../../media/cochon-cart.jpeg";
import { Link } from "react-router-dom";

import { AuthUserContext } from "../Session";

const Home = (props) => {
  const { dark, language } = props;
  const { HOME } = TRANSLATIONS[`${language}`];

  return (
    <>
      <Divider inverted={dark} hidden={!dark} style={{ margin: "1rem", marginBottom: "2rem" }} />
      <Segment placeholder basic>
        <Divider as="h1" className="header" horizontal style={{ textTransform: "uppercase" }} inverted={dark} content="APDC Reporting App" />

        <Image centered size="large" src={cart_pic} />

        <AuthUserContext.Consumer>
          {(authUser) => {
            return !!authUser ? (
              <Button as={Link} size="big" to="/generate-report" positive>
                Generate Report
              </Button>
            ) : (
              <Button as={Link} size="big" to="/signin" positive>
                Sign In
              </Button>
            );
          }}
        </AuthUserContext.Consumer>
      </Segment>

      <Container>
        <Segment placeholder basic>
          <Divider as="h1" className="header" horizontal style={{ margin: "3em 0em", textTransform: "uppercase" }} inverted={dark} content="List of Reports" />

          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((index) => (
            <div key={index}>
              <List divided size="huge" inverted={dark}>
                <List.Item>
                  <List.Icon name="chart bar" />
                  <List.Content>
                    <List.Header>{`${HOME["report" + index]}`}</List.Header>
                    <List.Description>{`${HOME["report" + index + "Description"]}`}</List.Description>
                  </List.Content>
                </List.Item>
              </List>
            </div>
          ))}
        </Segment>
      </Container>
    </>
  );
};

export default Home;
// export default withAuthorization(condition)(withFirebase(Home))
