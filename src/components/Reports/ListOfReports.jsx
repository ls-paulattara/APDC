import React from "react";
import { Segment, List, Button, Divider, Icon } from "semantic-ui-react";

import TRANSLATIONS from "../../constants/translation";

function ListOfReports(props) {
  const { dark, language } = props;
  const { HOME } = TRANSLATIONS[`${language}`];
  const ReportsIcon = "chart bar";
  const reportsIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  // const reportsIndex = [1,2,3,4,5,6,7,8,9,10,11,12,13]

  const handleSelectedReport = (index) => {
    props.setSelectedReport(index);
    props.nextStep();
  };

  return (
    <Segment basic fluid="true" inverted={dark} style={{ marginTop: 0, marginBottom: 0 }}>
      {reportsIndex.map((index) => (
        <div key={index}>
          <List selection divided size="huge" inverted={dark}>
            <List.Item onClick={() => handleSelectedReport(index)}>
              <List.Icon name={ReportsIcon} />
              <List.Content>
                <List.Header>{`${HOME["report" + index]}`}</List.Header>
                <List.Description>{`${HOME["report" + index + "Description"]}`}</List.Description>
              </List.Content>
            </List.Item>
          </List>
        </div>
      ))}
      <Divider />

      {/* <Button
        content="Back"
        icon="left arrow"
        onClick={() => props.history.push("reports")}
      /> */}
      <Button animated onClick={() => props.history.push("reports")}>
        <Button.Content visible>Back</Button.Content>
        <Button.Content hidden>
          <Icon name="arrow left" />
        </Button.Content>
      </Button>
    </Segment>
  );
}

export default ListOfReports;
