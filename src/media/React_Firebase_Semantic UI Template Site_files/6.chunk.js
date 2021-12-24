(this["webpackJsonpreact-firebase-semantic-ui-template"] = this["webpackJsonpreact-firebase-semantic-ui-template"] || []).push([[6],{

/***/ "./src/components/Navigation/index.jsx":
/*!*********************************************!*\
  !*** ./src/components/Navigation/index.jsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _artsy_fresnel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @artsy/fresnel */ "./node_modules/@artsy/fresnel/dist/index.js");
/* harmony import */ var _artsy_fresnel__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_artsy_fresnel__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _constants_routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../constants/routes */ "./src/constants/routes.js");
/* harmony import */ var _constants_roles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../constants/roles */ "./src/constants/roles.js");
/* harmony import */ var _Session__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Session */ "./src/components/Session/index.jsx");
/* harmony import */ var _SignOut__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../SignOut */ "./src/components/SignOut/index.jsx");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! semantic-ui-react */ "./node_modules/semantic-ui-react/dist/es/index.js");
/* harmony import */ var _media_logo_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../media/logo.png */ "./src/media/logo.png");
/* harmony import */ var _constants_translation__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../constants/translation */ "./src/constants/translation.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/paul.attara/Projects/APDC-dev/src/components/Navigation/index.jsx",
    _s = __webpack_require__.$Refresh$.signature(),
    _s2 = __webpack_require__.$Refresh$.signature();













const DarkButton = props => {
  const {
    dark,
    toggleDark,
    fixed
  } = props;
  const {
    GLOBAL
  } = _constants_translation__WEBPACK_IMPORTED_MODULE_9__["default"].EN;
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Button"], {
    basic: true,
    circular: true,
    icon: dark ? "moon" : "moon outline",
    onClick: toggleDark,
    inverted: !fixed,
    "aria-label": GLOBAL.ariaDark
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 26,
    columnNumber: 5
  }, undefined);
};
/* eslint-disable max-classes-per-file */

/* eslint-disable react/no-multi-comp */


_c = DarkButton;
const {
  MediaContextProvider,
  Media
} = Object(_artsy_fresnel__WEBPACK_IMPORTED_MODULE_1__["createMedia"])({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024
  }
});
/* Heads up!
 * HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled
 * components for such things.
 */

const HomepageHeading = () => {
  const {
    NAVIGATION
  } = _constants_translation__WEBPACK_IMPORTED_MODULE_9__["default"].EN;
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Image"], {
    src: _media_logo_png__WEBPACK_IMPORTED_MODULE_8__["default"],
    size: "massive",
    centered: true,
    alt: NAVIGATION.imageAlt,
    width: "150",
    height: "150"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 54,
    columnNumber: 5
  }, undefined);
};

_c2 = HomepageHeading;

const DesktopContainer = props => {
  _s();

  const {
    dark,
    toggleDark,
    language,
    children,
    options,
    changeLanguage
  } = props;
  const {
    NAVIGATION
  } = _constants_translation__WEBPACK_IMPORTED_MODULE_9__["default"][`${language}`];
  const [fixed, setFixed] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);

  const hideFixedMenu = () => setFixed(false);

  const showFixedMenu = () => setFixed(true);

  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(_Session__WEBPACK_IMPORTED_MODULE_5__["AuthUserContext"].Consumer, {
    children: authUser => {
      const ISADMIN = !!authUser && !!authUser.roles[_constants_roles__WEBPACK_IMPORTED_MODULE_4__["ADMIN"]];
      return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(Media, {
        greaterThan: "mobile",
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Visibility"], {
          once: false,
          onBottomPassed: showFixedMenu,
          onBottomPassedReverse: hideFixedMenu,
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Segment"], {
            basic: true,
            inverted: true,
            textAlign: "right",
            vertical: true,
            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Menu"], {
              secondary: true,
              inverted: true,
              children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Menu"].Item, {
                position: "right",
                children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Dropdown"], {
                  placeholder: language,
                  options: options,
                  value: language,
                  className: "languageSelect",
                  onChange: changeLanguage,
                  style: {
                    marginRight: "1em"
                  },
                  "aria-label": NAVIGATION.ariaLanguage
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 86,
                  columnNumber: 21
                }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(DarkButton, {
                  dark: dark,
                  toggleDark: toggleDark,
                  fixed: fixed
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 95,
                  columnNumber: 21
                }, undefined)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 85,
                columnNumber: 19
              }, undefined)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 84,
              columnNumber: 17
            }, undefined)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 83,
            columnNumber: 15
          }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Segment"], {
            basic: true,
            inverted: true,
            textAlign: "center",
            vertical: true,
            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(HomepageHeading, {}, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 104,
              columnNumber: 17
            }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Menu"], {
              fixed: fixed ? "top" : null,
              inverted: !fixed,
              pointing: !fixed,
              secondary: !fixed,
              size: "large",
              children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Container"], {
                fluid: true,
                children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Menu"].Item, {
                  as: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"],
                  to: _constants_routes__WEBPACK_IMPORTED_MODULE_3__["HOME"],
                  name: NAVIGATION.home,
                  exact: true,
                  content: NAVIGATION.home,
                  style: {
                    marginLeft: "1em"
                  }
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 113,
                  columnNumber: 21
                }, undefined), !!authUser && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Menu"].Item, {
                  as: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"],
                  to: _constants_routes__WEBPACK_IMPORTED_MODULE_3__["REPORTS"],
                  name: NAVIGATION.reports,
                  exact: true,
                  content: NAVIGATION.reports,
                  style: {
                    marginLeft: "1em"
                  }
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 122,
                  columnNumber: 21
                }, undefined), !!authUser && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Menu"].Item, {
                  as: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"],
                  to: _constants_routes__WEBPACK_IMPORTED_MODULE_3__["ACCOUNT"],
                  name: NAVIGATION.account,
                  exact: true,
                  content: NAVIGATION.account
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 132,
                  columnNumber: 23
                }, undefined), ISADMIN && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Menu"].Item, {
                  as: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"],
                  to: _constants_routes__WEBPACK_IMPORTED_MODULE_3__["ADMIN"],
                  name: NAVIGATION.admin,
                  exact: true,
                  icon: "cog",
                  content: NAVIGATION.admin
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 141,
                  columnNumber: 27
                }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Menu"].Item, {
                  position: "right",
                  children: [authUser ? /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(_SignOut__WEBPACK_IMPORTED_MODULE_6__["SignOutMenuItemButton"], {
                    fixed: fixed,
                    language: language
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 152,
                    columnNumber: 25
                  }, undefined) : /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
                    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Button"], {
                      basic: true,
                      as: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"],
                      to: _constants_routes__WEBPACK_IMPORTED_MODULE_3__["SIGN_UP"],
                      name: NAVIGATION.signUp,
                      inverted: !fixed,
                      icon: "signup",
                      style: {
                        marginRight: "0.5em"
                      },
                      content: NAVIGATION.signUp
                    }, void 0, false, {
                      fileName: _jsxFileName,
                      lineNumber: 155,
                      columnNumber: 27
                    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Button"], {
                      basic: true,
                      as: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"],
                      to: _constants_routes__WEBPACK_IMPORTED_MODULE_3__["SIGN_IN"],
                      name: NAVIGATION.signIn,
                      icon: "sign-in",
                      inverted: !fixed,
                      content: NAVIGATION.signIn
                    }, void 0, false, {
                      fileName: _jsxFileName,
                      lineNumber: 165,
                      columnNumber: 27
                    }, undefined)]
                  }, void 0, true, {
                    fileName: _jsxFileName,
                    lineNumber: 154,
                    columnNumber: 25
                  }, undefined), fixed && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
                    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Dropdown"], {
                      placeholder: language,
                      options: options,
                      value: language,
                      className: "languageSelect",
                      onChange: changeLanguage,
                      style: {
                        marginRight: "1em",
                        marginLeft: "1em"
                      },
                      "aria-label": NAVIGATION.ariaLanguage
                    }, void 0, false, {
                      fileName: _jsxFileName,
                      lineNumber: 178,
                      columnNumber: 27
                    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(DarkButton, {
                      dark: dark,
                      toggleDark: toggleDark,
                      fixed: fixed
                    }, void 0, false, {
                      fileName: _jsxFileName,
                      lineNumber: 187,
                      columnNumber: 27
                    }, undefined)]
                  }, void 0, true, {
                    fileName: _jsxFileName,
                    lineNumber: 177,
                    columnNumber: 25
                  }, undefined)]
                }, void 0, true, {
                  fileName: _jsxFileName,
                  lineNumber: 150,
                  columnNumber: 21
                }, undefined)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 112,
                columnNumber: 19
              }, undefined)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 105,
              columnNumber: 17
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 103,
            columnNumber: 15
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 78,
          columnNumber: 13
        }, undefined), children]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 77,
        columnNumber: 11
      }, undefined);
    }
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 73,
    columnNumber: 5
  }, undefined);
};

_s(DesktopContainer, "mYEpbCXaao8ZuGsLHCdjBN18gzg=");

_c3 = DesktopContainer;

const MobileContainer = props => {
  _s2();

  const {
    dark,
    toggleDark,
    language,
    children,
    options,
    changeLanguage
  } = props;
  const [open, setOpen] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    NAVIGATION
  } = _constants_translation__WEBPACK_IMPORTED_MODULE_9__["default"][`${language}`];

  const handleSidebarHide = () => setOpen(false);

  const handleToggle = () => setOpen(true);

  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(_Session__WEBPACK_IMPORTED_MODULE_5__["AuthUserContext"].Consumer, {
    children: authUser => {
      const ISADMIN = !!authUser && !!authUser.roles[_constants_roles__WEBPACK_IMPORTED_MODULE_4__["ADMIN"]];
      return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(Media, {
        as: semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Sidebar"].Pushable,
        at: "mobile",
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Sidebar"].Pushable, {
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Sidebar"], {
            as: semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Menu"],
            animation: "push",
            inverted: true,
            onHide: handleSidebarHide,
            vertical: true,
            width: "thin",
            visible: open,
            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Menu"].Item, {
              as: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"],
              to: _constants_routes__WEBPACK_IMPORTED_MODULE_3__["HOME"],
              name: NAVIGATION.home,
              exact: true,
              icon: "home",
              content: NAVIGATION.home,
              onClick: handleSidebarHide
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 233,
              columnNumber: 17
            }, undefined), !!authUser && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Menu"].Item, {
              as: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"],
              to: _constants_routes__WEBPACK_IMPORTED_MODULE_3__["REPORTS"],
              name: NAVIGATION.reports,
              exact: true,
              icon: "chart line",
              content: NAVIGATION.reports,
              onClick: handleSidebarHide
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 243,
              columnNumber: 17
            }, undefined), !!authUser && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Menu"].Item, {
              as: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"],
              to: _constants_routes__WEBPACK_IMPORTED_MODULE_3__["ACCOUNT"],
              name: NAVIGATION.account,
              exact: true,
              icon: "user",
              content: NAVIGATION.account,
              onClick: handleSidebarHide
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 253,
              columnNumber: 17
            }, undefined), ISADMIN && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Menu"].Item, {
              as: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"],
              to: _constants_routes__WEBPACK_IMPORTED_MODULE_3__["ADMIN"],
              name: NAVIGATION.admin,
              exact: true,
              icon: "cog",
              content: NAVIGATION.admin,
              onClick: handleSidebarHide
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 263,
              columnNumber: 17
            }, undefined), authUser ? /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(_SignOut__WEBPACK_IMPORTED_MODULE_6__["SignOutMenuItem"], {
              language: language
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 274,
              columnNumber: 21
            }, undefined) : /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
              children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Menu"].Item, {
                as: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"],
                to: _constants_routes__WEBPACK_IMPORTED_MODULE_3__["SIGN_IN"],
                name: NAVIGATION.signIn,
                exact: true,
                icon: "sign-in",
                content: NAVIGATION.signIn,
                onClick: handleSidebarHide
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 277,
                columnNumber: 21
              }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Menu"].Item, {
                as: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"],
                to: _constants_routes__WEBPACK_IMPORTED_MODULE_3__["SIGN_UP"],
                name: NAVIGATION.signUp,
                exact: true,
                icon: "signup",
                content: NAVIGATION.signUp,
                onClick: handleSidebarHide
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 286,
                columnNumber: 21
              }, undefined)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 276,
              columnNumber: 19
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 224,
            columnNumber: 15
          }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Sidebar"].Pusher, {
            dimmed: open,
            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Segment"], {
              basic: true,
              inverted: true,
              textAlign: "center",
              vertical: true,
              children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Container"], {
                children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Menu"], {
                  inverted: true,
                  pointing: true,
                  secondary: true,
                  size: "large",
                  children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Menu"].Item, {
                    onClick: handleToggle,
                    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Icon"], {
                      name: "sidebar"
                    }, void 0, false, {
                      fileName: _jsxFileName,
                      lineNumber: 304,
                      columnNumber: 25
                    }, undefined)
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 303,
                    columnNumber: 23
                  }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Menu"].Item, {
                    position: "right",
                    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["Dropdown"], {
                      placeholder: language,
                      options: options,
                      value: language,
                      className: "languageSelect",
                      onChange: changeLanguage,
                      style: {
                        marginRight: "1em"
                      },
                      "aria-label": NAVIGATION.ariaLanguage
                    }, void 0, false, {
                      fileName: _jsxFileName,
                      lineNumber: 307,
                      columnNumber: 25
                    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(DarkButton, {
                      dark: dark,
                      toggleDark: toggleDark,
                      fixed: false
                    }, void 0, false, {
                      fileName: _jsxFileName,
                      lineNumber: 316,
                      columnNumber: 25
                    }, undefined)]
                  }, void 0, true, {
                    fileName: _jsxFileName,
                    lineNumber: 306,
                    columnNumber: 23
                  }, undefined)]
                }, void 0, true, {
                  fileName: _jsxFileName,
                  lineNumber: 302,
                  columnNumber: 21
                }, undefined)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 301,
                columnNumber: 19
              }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(HomepageHeading, {
                mobile: true
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 324,
                columnNumber: 19
              }, undefined)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 300,
              columnNumber: 17
            }, undefined), children]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 299,
            columnNumber: 15
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 223,
          columnNumber: 13
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 222,
        columnNumber: 11
      }, undefined);
    }
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 218,
    columnNumber: 5
  }, undefined);
};

_s2(MobileContainer, "xG1TONbKtDWtdOTrXaTAsNhPg/Q=");

_c4 = MobileContainer;

const ResponsiveContainer = props => {
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(MediaContextProvider, {
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(DesktopContainer, { ...props
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 344,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__["jsxDEV"])(MobileContainer, { ...props
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 345,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 343,
    columnNumber: 5
  }, undefined);
};

_c5 = ResponsiveContainer;
/* harmony default export */ __webpack_exports__["default"] = (ResponsiveContainer);

var _c, _c2, _c3, _c4, _c5;

__webpack_require__.$Refresh$.register(_c, "DarkButton");
__webpack_require__.$Refresh$.register(_c2, "HomepageHeading");
__webpack_require__.$Refresh$.register(_c3, "DesktopContainer");
__webpack_require__.$Refresh$.register(_c4, "MobileContainer");
__webpack_require__.$Refresh$.register(_c5, "ResponsiveContainer");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/components/SignOut/index.jsx":
/*!******************************************!*\
  !*** ./src/components/SignOut/index.jsx ***!
  \******************************************/
/*! exports provided: default, SignOutMenuItem, SignOutMenuItemButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignOutMenuItem", function() { return SignOutMenuItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignOutMenuItemButton", function() { return SignOutMenuItemButton; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! semantic-ui-react */ "./node_modules/semantic-ui-react/dist/es/index.js");
/* harmony import */ var _Firebase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Firebase */ "./src/components/Firebase/index.jsx");
/* harmony import */ var _constants_translation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../constants/translation */ "./src/constants/translation.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/paul.attara/Projects/APDC-dev/src/components/SignOut/index.jsx";






const SignOutMenuItemBase = props => {
  const {
    firebase,
    language
  } = props;
  const {
    NAVIGATION
  } = _constants_translation__WEBPACK_IMPORTED_MODULE_3__["default"][`${language}`];
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Menu"].Item, {
    name: NAVIGATION.signOut // exact
    ,
    icon: "sign-out",
    content: NAVIGATION.signOut,
    onClick: firebase.doSignOut
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 10,
    columnNumber: 3
  }, undefined);
};

_c = SignOutMenuItemBase;

const SignOutMenuItemButtonBase = props => {
  const {
    firebase,
    fixed,
    language
  } = props;
  const {
    NAVIGATION
  } = _constants_translation__WEBPACK_IMPORTED_MODULE_3__["default"][`${language}`];
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    basic: true,
    as: "a",
    inverted: !fixed,
    onClick: firebase.doSignOut,
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
      name: "sign-out"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 7
    }, undefined), NAVIGATION.signOut]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 23,
    columnNumber: 5
  }, undefined);
};

_c2 = SignOutMenuItemButtonBase;
const SignOutMenuItem = Object(_Firebase__WEBPACK_IMPORTED_MODULE_2__["withFirebase"])(SignOutMenuItemBase);
_c3 = SignOutMenuItem;
const SignOutMenuItemButton = Object(_Firebase__WEBPACK_IMPORTED_MODULE_2__["withFirebase"])(SignOutMenuItemButtonBase);
_c4 = SignOutMenuItemButton;
/* harmony default export */ __webpack_exports__["default"] = (SignOutMenuItem);


var _c, _c2, _c3, _c4;

__webpack_require__.$Refresh$.register(_c, "SignOutMenuItemBase");
__webpack_require__.$Refresh$.register(_c2, "SignOutMenuItemButtonBase");
__webpack_require__.$Refresh$.register(_c3, "SignOutMenuItem");
__webpack_require__.$Refresh$.register(_c4, "SignOutMenuItemButton");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/constants/roles.js":
/*!********************************!*\
  !*** ./src/constants/roles.js ***!
  \********************************/
/*! exports provided: ADMIN, STAFF, CUSTOMER, UNAUTHORIZED */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADMIN", function() { return ADMIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STAFF", function() { return STAFF; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CUSTOMER", function() { return CUSTOMER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UNAUTHORIZED", function() { return UNAUTHORIZED; });
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

const ADMIN = "ADMIN";
const STAFF = "STAFF";
const CUSTOMER = "CUSTOMER";
const UNAUTHORIZED = "UNAUTHORIZED";

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/media/logo.png":
/*!****************************!*\
  !*** ./src/media/logo.png ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "static/media/logo.d7d58ed7.png");

/***/ })

}]);
//# sourceMappingURL=6.chunk.js.map