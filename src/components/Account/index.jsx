import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { AuthUserContext, withAuthorization } from "../Session";
import { ChangePassword } from "./changePassword";
import { ChangeEmailandName } from "./changeUserDetails";
import LoginManagement from "./loginManagement";
import TRANSLATIONS from "../../constants/translation";

import { Header, Icon, Segment, Divider, Container } from "semantic-ui-react";

const INITIAL_STATE = {
  loading: false,
};

class AccountBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    this.props.firebase.user().off();
  }

  render() {
    const { loading } = this.state;
    const { dark, language } = this.props;
    const { ACCOUNT } = TRANSLATIONS[`${language}`];
    return (
      <AuthUserContext.Consumer>
        {(authUser) => {
          return (
            <React.Fragment>
              <Container>
                <Segment
                  padded
                  style={{
                    // minHeight: "95vh",
                    margin: "0",
                    //   // marginLeft: "100",
                    //   // marginRight: "100",
                  }}
                  textAlign="center"
                  loading={loading}
                  basic
                  inverted={dark}
                >
                  <PageHeader {...this.props} ACCOUNT={ACCOUNT} />
                  <Divider inverted={dark} />
                  <Segment basic inverted={dark}>
                    <PageSubHeader authUser={authUser} ACCOUNT={ACCOUNT} dark={dark} />
                  </Segment>
                  <Segment basic inverted={dark} style={{ marginBottom: 0 }}>
                    <Segment.Group>
                      <ChangeEmailandName authUser={authUser} {...this.props} ACCOUNT={ACCOUNT} />
                      <ChangePassword authUser={authUser} {...this.props} ACCOUNT={ACCOUNT} />
                      {authUser.email && <LoginManagement authUser={authUser} {...this.props} ACCOUNT={ACCOUNT} />}
                    </Segment.Group>
                  </Segment>
                </Segment>
              </Container>
            </React.Fragment>
          );
        }}
      </AuthUserContext.Consumer>
    );
  }
}

const PageHeader = (props) => {
  const { dark, ACCOUNT } = props;
  return (
    <Segment fluid="true" basic inverted={dark}>
      <Divider hidden />
      <Header as="h2" icon inverted={dark}>
        <Icon name="user circle" inverted={dark} />
        {ACCOUNT.heading}
        <Header.Subheader content={ACCOUNT.subHeading} />
      </Header>
    </Segment>
  );
};

const PageSubHeader = ({ authUser, dark, ACCOUNT }) => {
  return (
    <Header as="h3" textAlign="center" inverted={dark}>
      <Header.Content>
        {ACCOUNT.welcome}
        {authUser.displayName ? authUser.displayName : authUser.email}
        <Header.Subheader content={ACCOUNT.memberSince + new Date(Date.parse(authUser.metadata.creationTime)).toDateString()} />
      </Header.Content>
    </Header>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(withFirebase(AccountBase));
