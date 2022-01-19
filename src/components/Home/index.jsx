import React from "react";
import {
  Header,
  Segment,
  Grid,
  Container,
  Icon,
  Button,
  Divider,
  Image
} from "semantic-ui-react";
import TRANSLATIONS from "../../constants/translation";
import logo from "../../media/logo.png";

const Home = (props) => {
 
  const { dark, language } = props;
  const { HOME } = TRANSLATIONS[`${language}`];

  
  
  return (



    <>

    <Segment fluid="true" basic inverted={dark} style={{ margin: 0 }}>
      <Divider
        as="h2"
        className="header"
        horizontal
        style={{ margin: 0, padding: "1em 2em", textTransform: "uppercase" }}
        inverted={dark}
        content="test3"
      />
    </Segment>

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

        <Header
          as="h3"
          style={{ fontSize: "2em" }}
          textAlign="center"
          inverted={dark}
          content="test7"
        />
        <p style={{ fontSize: "1.33em", textAlign: "center" }}>
        test15
        </p>
        <Divider
          as="h4"
          className="header"
          horizontal
          style={{ margin: "3em 0em", textTransform: "uppercase" }}
          inverted={dark}
          content="test8"
          />

      </Container>
    </Segment>
</>

  );
};

export default Home
// export default withAuthorization(condition)(withFirebase(Home))
