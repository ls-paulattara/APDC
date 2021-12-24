import React from "react";
import {
  Header,
  Segment,
  Button
} from "semantic-ui-react";
import { Link } from 'react-router-dom'

// import TRANSLATIONS from "../../constants/translation";

function Failure(props) {

//   const { dark, language } = props;
//   const { HOME } = TRANSLATIONS[`${language}`];

  return (
    <Segment
      basic
      fluid="true"
      // inverted={dark}
      style={{ marginTop: 0, marginBottom: 0 }}
    >

    <Header>Failed to created the report. Please try again</Header>
    <Button positive as={Link} to="/reports">Go to Reports</Button>
    </Segment>
  );
}

// export default React.memo(Home);
export default Failure
