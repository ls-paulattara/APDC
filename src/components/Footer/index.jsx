import React from "react";
import {
  Container,
  Segment,
  Header,
  Icon,
  Divider,
  Image,
} from "semantic-ui-react";
import TRANSLATIONS from "../../constants/translation";
import { isMobile } from "react-device-detect";
import logo from "../../media/Logo-Boutique.jpeg";
import logo2 from "../../media/logo.png";
import logo3 from "../../media/small-logo.png";

const Footer = (props) => {
  const { language, dark } = props;
  const { FOOTER } = TRANSLATIONS[`${language}`];
  return (
    <Segment inverted vertical>
      <Divider
        inverted={dark}
        hidden={!dark}
        style={{ margin: "1rem", marginBottom: "2rem" }}
      />
      <Container textAlign="center">
        <Header as="h3" inverted>
          {FOOTER.h3}
          <Header.Subheader as="p" style={{ paddingTop: "1em" }}>
            {FOOTER.subheader}
          </Header.Subheader>
        </Header>
        {/* <Divider inverted /> */}
        <Image centered size="small" src={logo3}></Image>
      </Container>
      <Divider inverted />
      <Container textAlign="center">
        Copyright © {new Date().getFullYear()} - {FOOTER.copyCompany}
      </Container>
      <Divider
        inverted={dark}
        hidden={!dark}
        style={{ margin: "1rem", marginBottom: "2rem" }}
      />
    </Segment>
  );
};

export default Footer;
