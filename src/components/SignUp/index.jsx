import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { Button, Form, Grid, Header, Message, Segment, Divider, Container } from "semantic-ui-react";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import { SignInGoogle } from "../SignIn";
import TRANSLATIONS from "../../constants/translation";

const SignUpPage = (props) => {
  const { dark } = props;
  return (
    <Segment inverted={dark} basic fluid="true" style={{ marginTop: 0, marginBottom: 0 }}>
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" textAlign="center" inverted={dark}></Header>
          <SignUpForm {...props} />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  isAdmin: false,
  organisation: false,
  error: null,
  phoneNumber: "",
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { firstName, lastName, email, passwordOne, phoneNumber } = this.state;
    const roles = {};
    // roles[ROLES.CUSTOMER] = ROLES.CUSTOMER;
    const adminEmail1 = new RegExp("@lightspeedhq.com");
    const adminEmail2 = new RegExp("@pieddecochon.ca");
    const displayName = `${firstName} ${lastName}`;
    const isnum = /^\d+$/.test(phoneNumber);
    const adminEmails = ["catherinemd@pieddecochon.ca", "info@pieddecochon.ca", "marcb@pieddecochon.ca"];
    // const isAPDCAccount =
    //   email.endsWith("@pieddecochon.ca") || email.endsWith("@lightspeedhq.com");

    // console.log("Email is either LS or APDC?", isAPDCAccount);

    // add roles
    if (adminEmails.includes(email) || email.endsWith("@lightspeedhq.com")) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    } else if (email.endsWith("@pieddecochon.ca")) {
      roles[ROLES.STAFF] = ROLES.STAFF;
    } else {
      this.setState({
        error: {
          message: "Please ensure your email is an email in the following format: '@pieddecochon.ca'",
        },
      });
      return;
    }

    if (!isnum && phoneNumber.length > 0) {
      this.setState({
        error: {
          message: "Please ensure your phone number contains only numbers",
        },
      });
    } else {
      this.props.firebase
        .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then((authUser) => {
          return this.props.firebase.user(authUser.user.uid).set({
            firstName,
            lastName,
            displayName,
            phoneNumber,
            email,
            isAuthorized: adminEmail1.test(email) || adminEmail2.test(email),
            enabled: adminEmail1.test(email) || adminEmail2.test(email),
            roles,
          });
        })
        .then(() => {
          return this.props.firebase.updateProfile({
            displayName: displayName,
            phoneNumber: phoneNumber,
          });
        })
        .then(() => {
          this.setState({ ...INITIAL_STATE });
          this.props.history.push(ROUTES.ACCOUNT);
          window.alert("Admin Sign Up Successful. You need to sign out and sign back in to receive admin permissions and access the account page.");
        })
        .catch((error) => {
          this.setState({ error });
        });
    }

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const { firstName, lastName, email, passwordOne, passwordTwo, phoneNumber, error } = this.state;
    const isInvalid = passwordOne !== passwordTwo || passwordOne === "" || email === "" || firstName === "" || lastName === "";
    const { dark, language } = this.props;
    const { SIGNUP } = TRANSLATIONS[`${language}`];
    return (
      <Container fluid>
        <Form error={error ? true : false} size="large" onSubmit={this.onSubmit} inverted={dark}>
          <Segment stacked inverted={dark}>
            {error && <Message error content={error.message} />}
            <Form.Input fluid icon="user" iconPosition="left" placeholder={SIGNUP.firstName} name="firstName" value={firstName} onChange={this.onChange} type="text" required inverted={dark} />
            <Form.Input fluid icon="user" iconPosition="left" placeholder={SIGNUP.lastName} name="lastName" value={lastName} onChange={this.onChange} type="text" required inverted={dark} />
            <Form.Input fluid icon="mail" iconPosition="left" name="email" value={email} onChange={this.onChange} type="text" placeholder={SIGNUP.email} required inverted={dark} />
            <Form.Input fluid icon="phone" iconPosition="left" name="phoneNumber" value={phoneNumber} onChange={this.onChange} type="text" maxLength={10} placeholder={SIGNUP.phone} inverted={dark} />
            <Form.Input fluid icon="lock" iconPosition="left" name="passwordOne" value={passwordOne} onChange={this.onChange} placeholder={SIGNUP.passwordOne} type="password" required inverted={dark} />
            <Form.Input fluid icon="lock" iconPosition="left" name="passwordTwo" value={passwordTwo} onChange={this.onChange} type="password" placeholder={SIGNUP.passwordTwo} required inverted={dark} />
            <Button disabled={isInvalid} color="black" type="submit" fluid size="large" inverted={dark} basic={dark} content={SIGNUP.signUp} />
            <Divider horizontal inverted={dark}>
              {SIGNUP.or}
            </Divider>
            <SignInGoogle dark={dark} SIGNUP={SIGNUP} />
          </Segment>
        </Form>
      </Container>
    );
  }
}

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm };
