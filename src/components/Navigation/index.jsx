import React, { useState } from "react";
import { createMedia } from "@artsy/fresnel";
import { NavLink } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import { AuthUserContext } from "../Session";
import { SignOutMenuItem, SignOutMenuItemButton } from "../SignOut";
import "./styles.css";

import { Button, Container, Icon, Image, Menu, Segment, Sidebar, Visibility } from "semantic-ui-react";
import Logo from "../../media/logo.png";
import TRANSLATIONS from "../../constants/translation";

/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 1300,
    computer: 1024,
  },
});

/* Heads up!
 * HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled
 * components for such things.
 */
const HomepageHeading = () => {
  const { NAVIGATION } = TRANSLATIONS.EN;
  return <Image src={Logo} size="massive" centered alt={NAVIGATION.imageAlt} width="150" height="150" />;
};

const DesktopContainer = (props) => {
  const { language, children } = props;
  const { NAVIGATION } = TRANSLATIONS[`${language}`];
  const [fixed, setFixed] = useState(false);
  const hideFixedMenu = () => setFixed(false);
  const showFixedMenu = () => setFixed(true);
  return (
    // <Helmet>
    // <style>{" background-color: red; "}</style>
    <AuthUserContext.Consumer>
      {(authUser) => {
        const ISADMIN = !!authUser && !!authUser.roles[ROLES.ADMIN];
        return (
          <Media greaterThan="mobile">
            <Visibility
              once={false}
              onBottomPassed={showFixedMenu}
              onBottomPassedReverse={hideFixedMenu}
              // style={{ backgroundColor: "red" }}
            >
              {/* <Divider
                inverted={dark}
                hidden={!dark}
                style={{ margin: "1rem", marginBottom: "2rem" }}
              /> */}
              {/* <Image
                src={Logo4}
                size="small"
                centered
                alt={NAVIGATION.imageAlt}
                width="150"
                height="150"
              /> */}
              {/* <Divider
                inverted={dark}
                hidden={!dark}
                style={{ margin: "1rem", marginBottom: "2rem" }}
              /> */}
              {/* <Segment basic textAlign="right" vertical> */}
              {/* <Menu secondary inverted> */}
              {/* <Menu.Item position="right">
                    <Dropdown
                      placeholder={language}
                      options={options}
                      value={language}
                      className="languageSelect"
                      onChange={changeLanguage}
                      style={{ marginRight: "1em" }}
                      aria-label={NAVIGATION.ariaLanguage}
                    />
                    <DarkButton
                      dark={dark}
                      toggleDark={toggleDark}
                      fixed={fixed}
                    />
                  </Menu.Item> */}
              {/* </Menu> */}
              {/* </Segment> */}
              <Segment raised>
                <Image src={Logo} size="massive" centered alt={NAVIGATION.imageAlt} width="150" height="150" />
                {/* <HomepageHeading /> */}
                <Container textAlign="center" fluid={false}>
                  <Menu
                    // style={{ color: "#d5b98a" }}
                    // color="gold"
                    // compact
                    fixed={fixed ? "top" : null}
                    // fixed="top"
                    // inverted={!fixed}
                    // pointing={!fixed}
                    secondary={!fixed}
                    size="massive"
                  >
                    {/* <Menu.Item>
                      <Image
                        src={Logo}
                        size="large"
                        centered
                        alt={NAVIGATION.imageAlt}
                        width="150"
                        height="150"
                      />
                    </Menu.Item> */}
                    {!!authUser && (
                      <Menu.Item
                        // position="left"
                        as={NavLink}
                        to={ROUTES.HOME}
                        name={NAVIGATION.home}
                        exact
                        content={NAVIGATION.home}
                        style={{ marginLeft: "30%" }}
                      />
                    )}
                    {!!authUser && (
                      <Menu.Item
                        as={NavLink}
                        to={ROUTES.GENERATE_REPORT}
                        name={NAVIGATION.reports}
                        exact
                        // TODO: when click on reports tab, bring to step 1
                        content={NAVIGATION.reports}
                        style={{ marginLeft: "1em" }}
                        // active={location.pathname == "/generate-report" || location.pathname == "/reports"}
                      />
                    )}
                    {!!authUser && <Menu.Item as={NavLink} to={ROUTES.ACCOUNT} name={NAVIGATION.account} exact content={NAVIGATION.account} />}
                    {ISADMIN && <Menu.Item as={NavLink} to={ROUTES.ADMIN} name={NAVIGATION.admin} exact icon="cog" content={NAVIGATION.admin} />}

                    {authUser ? (
                      <Menu.Item
                      // style={{ marginRight: "40%" }}
                      // position="right"
                      >
                        <SignOutMenuItemButton fixed={fixed} language={language} />
                      </Menu.Item>
                    ) : (
                      <Menu.Item position="right" style={{ marginRight: "35%" }}>
                        {/* <React.Fragment> */}
                        <Button
                          basic
                          as={NavLink}
                          to={ROUTES.SIGN_UP}
                          name={NAVIGATION.signUp}
                          // inverted={!fixed}
                          icon="signup"
                          // style={{ marginRight: "20%" }}
                          content={NAVIGATION.signUp}
                          style={{ marginRight: "10px" }}
                        />
                        <Button
                          basic
                          as={NavLink}
                          to={ROUTES.SIGN_IN}
                          name={NAVIGATION.signIn}
                          icon="sign-in"
                          // style={{ marginLeft: "20%" }}
                          // inverted={!fixed}
                          content={NAVIGATION.signIn}
                        />
                        {/* </React.Fragment> */}
                      </Menu.Item>
                    )}
                  </Menu>
                  {/* {fixed && (
                        <React.Fragment>
                          <Dropdown
                            placeholder={language}
                            options={options}
                            value={language}
                            className="languageSelect"
                            onChange={changeLanguage}
                            style={{ marginRight: "1em", marginLeft: "1em" }}
                            aria-label={NAVIGATION.ariaLanguage}
                          />
                          <DarkButton
                            dark={dark}
                            toggleDark={toggleDark}
                            fixed={fixed}
                          />
                        </React.Fragment>
                      )} */}
                </Container>
                {/* <Divider style={{ lineHeight: 1.4 }}></Divider> */}
              </Segment>
            </Visibility>

            {children}
          </Media>
        );
      }}
    </AuthUserContext.Consumer>
    // </Helmet>
  );
};

const MobileContainer = (props) => {
  const { language, children } = props;
  const [open, setOpen] = useState(false);
  const { NAVIGATION } = TRANSLATIONS[`${language}`];

  const handleSidebarHide = () => setOpen(false);
  const handleToggle = () => setOpen(true);

  return (
    <AuthUserContext.Consumer>
      {(authUser) => {
        const ISADMIN = !!authUser && !!authUser.roles[ROLES.ADMIN];
        return (
          <Media as={Sidebar.Pushable} at="mobile">
            <Sidebar.Pushable>
              <Sidebar as={Menu} animation="push" inverted onHide={handleSidebarHide} vertical width="thin" visible={open}>
                <Menu.Item as={NavLink} to={ROUTES.HOME} name={NAVIGATION.home} exact icon="home" content={NAVIGATION.home} onClick={handleSidebarHide} />
                {!!authUser && <Menu.Item as={NavLink} to={ROUTES.GENERATE_REPORT} name={NAVIGATION.reports} exact icon="chart line" content={NAVIGATION.reports} onClick={handleSidebarHide} />}
                {!!authUser && <Menu.Item as={NavLink} to={ROUTES.ACCOUNT} name={NAVIGATION.account} exact icon="user" content={NAVIGATION.account} onClick={handleSidebarHide} />}
                {ISADMIN && <Menu.Item as={NavLink} to={ROUTES.ADMIN} name={NAVIGATION.admin} exact icon="cog" content={NAVIGATION.admin} onClick={handleSidebarHide} />}

                {authUser ? (
                  <SignOutMenuItem language={language} />
                ) : (
                  <React.Fragment>
                    <Menu.Item
                      as={NavLink}
                      to={ROUTES.SIGN_IN}
                      name={NAVIGATION.signIn}
                      exact
                      icon="sign-in"
                      content={NAVIGATION.signIn}
                      onClick={handleSidebarHide}
                      // position="right"
                    />
                    <Menu.Item
                      as={NavLink}
                      to={ROUTES.SIGN_UP}
                      name={NAVIGATION.signUp}
                      exact
                      icon="signup"
                      content={NAVIGATION.signUp}
                      onClick={handleSidebarHide}
                      // position="right"
                    />
                  </React.Fragment>
                )}
              </Sidebar>

              <Sidebar.Pusher dimmed={open}>
                <Segment basic inverted textAlign="center" vertical>
                  <Container>
                    <Menu inverted pointing secondary size="large">
                      <Menu.Item onClick={handleToggle}>
                        <Icon name="sidebar" />
                      </Menu.Item>
                      {/* <Menu.Item position="right"> */}
                      {/* <Dropdown
                          placeholder={language}
                          options={options}
                          value={language}
                          className="languageSelect"
                          onChange={changeLanguage}
                          style={{ marginRight: "1em" }}
                          aria-label={NAVIGATION.ariaLanguage}
                        /> */}
                      {/* <DarkButton
                          dark={dark}
                          toggleDark={toggleDark}
                          fixed={false}
                        />
                      </Menu.Item> */}
                    </Menu>
                  </Container>
                  <HomepageHeading mobile />
                </Segment>

                {children}
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </Media>
        );
      }}
    </AuthUserContext.Consumer>
  );
};

const ResponsiveContainer = (props) => {
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  return (
    <MediaContextProvider>
      <DesktopContainer {...props} />
      <MobileContainer {...props} />
    </MediaContextProvider>
  );
};

export default ResponsiveContainer;
