import React from "react";
import { withFirebase } from "../Firebase";
import { withAuthorization } from "../Session";
import {
  Header,
  Segment,
  Icon,
  Button,
  Divider,
  Container,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import ReportsTable from "./ReportsTable";
// import TRANSLATIONS from "../../constants/translation";

function Reports(props) {
  const { dark, language } = props;
  // const { HOME } = TRANSLATIONS[`${language}`];

  return (
    <Segment
      basic
      fluid="true"
      inverted={dark}
      style={{ marginTop: 0, marginBottom: 0 }}
    >
      <Segment basic placeholder inverted={dark} fluid="true">
        <Header as="h1" icon>
          <Icon name="file outline" />
          Generate a new report
        </Header>
        {/* <Button icon="file" /> */}

        <Button size="big" as={Link} to="/generate-report" positive>
          Generate
        </Button>
      </Segment>
      {/* <Segment placeholder inverted={dark} fluid="true">
      <Header icon>
        <Icon name='history' />
        Generated Reports
      </Header>
    </Segment> */}
      <Divider />
      <Container>
        <ReportsTable {...props} dark={dark} />
      </Container>
    </Segment>
  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(withFirebase(Reports));
