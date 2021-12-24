(this["webpackJsonpreact-firebase-semantic-ui-template"] = this["webpackJsonpreact-firebase-semantic-ui-template"] || []).push([[3],{

/***/ "./node_modules/react-semantic-ui-datepickers/dist/locales sync recursive ^\\.\\/.*\\.json$":
/*!*************************************************************************************!*\
  !*** ./node_modules/react-semantic-ui-datepickers/dist/locales sync ^\.\/.*\.json$ ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./bg-BG.json": "./node_modules/react-semantic-ui-datepickers/dist/locales/bg-BG.json",
	"./ca-ES.json": "./node_modules/react-semantic-ui-datepickers/dist/locales/ca-ES.json",
	"./cs-CZ.json": "./node_modules/react-semantic-ui-datepickers/dist/locales/cs-CZ.json",
	"./de-DE.json": "./node_modules/react-semantic-ui-datepickers/dist/locales/de-DE.json",
	"./el-GR.json": "./node_modules/react-semantic-ui-datepickers/dist/locales/el-GR.json",
	"./en-US.json": "./node_modules/react-semantic-ui-datepickers/dist/locales/en-US.json",
	"./es-ES.json": "./node_modules/react-semantic-ui-datepickers/dist/locales/es-ES.json",
	"./et-EE.json": "./node_modules/react-semantic-ui-datepickers/dist/locales/et-EE.json",
	"./fi-FI.json": "./node_modules/react-semantic-ui-datepickers/dist/locales/fi-FI.json",
	"./fr-FR.json": "./node_modules/react-semantic-ui-datepickers/dist/locales/fr-FR.json",
	"./he-IL.json": "./node_modules/react-semantic-ui-datepickers/dist/locales/he-IL.json",
	"./it-IT.json": "./node_modules/react-semantic-ui-datepickers/dist/locales/it-IT.json",
	"./ja-JP.json": "./node_modules/react-semantic-ui-datepickers/dist/locales/ja-JP.json",
	"./ko-KR.json": "./node_modules/react-semantic-ui-datepickers/dist/locales/ko-KR.json",
	"./nb-NO.json": "./node_modules/react-semantic-ui-datepickers/dist/locales/nb-NO.json",
	"./nn-NO.json": "./node_modules/react-semantic-ui-datepickers/dist/locales/nn-NO.json",
	"./pl-PL.json": "./node_modules/react-semantic-ui-datepickers/dist/locales/pl-PL.json",
	"./pt-BR.json": "./node_modules/react-semantic-ui-datepickers/dist/locales/pt-BR.json",
	"./ro-RO.json": "./node_modules/react-semantic-ui-datepickers/dist/locales/ro-RO.json",
	"./ru-RU.json": "./node_modules/react-semantic-ui-datepickers/dist/locales/ru-RU.json",
	"./sv-SE.json": "./node_modules/react-semantic-ui-datepickers/dist/locales/sv-SE.json",
	"./tr-TR.json": "./node_modules/react-semantic-ui-datepickers/dist/locales/tr-TR.json",
	"./zh-CN.json": "./node_modules/react-semantic-ui-datepickers/dist/locales/zh-CN.json"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/react-semantic-ui-datepickers/dist/locales sync recursive ^\\.\\/.*\\.json$";

/***/ }),

/***/ "./src/components/Reports/GenerateReport.jsx":
/*!***************************************************!*\
  !*** ./src/components/Reports/GenerateReport.jsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Firebase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Firebase */ "./src/components/Firebase/index.jsx");
/* harmony import */ var _Session__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Session */ "./src/components/Session/index.jsx");
/* harmony import */ var _constants_translation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../constants/translation */ "./src/constants/translation.js");
/* harmony import */ var react_semantic_ui_datepickers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-semantic-ui-datepickers */ "./node_modules/react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.esm.js");
/* harmony import */ var react_semantic_ui_datepickers_dist_react_semantic_ui_datepickers_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css */ "./node_modules/react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css");
/* harmony import */ var react_semantic_ui_datepickers_dist_react_semantic_ui_datepickers_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_semantic_ui_datepickers_dist_react_semantic_ui_datepickers_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Report1__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Report1 */ "./src/components/Reports/Report1.jsx");
/* harmony import */ var _Report2__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Report2 */ "./src/components/Reports/Report2.jsx");
/* harmony import */ var _Success__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Success */ "./src/components/Reports/Success.jsx");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! semantic-ui-react */ "./node_modules/semantic-ui-react/dist/es/index.js");
/* harmony import */ var _ListOfReports__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ListOfReports */ "./src/components/Reports/ListOfReports.jsx");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/paul.attara/Projects/APDC-dev/src/components/Reports/GenerateReport.jsx",
    _s = __webpack_require__.$Refresh$.signature(),
    _s2 = __webpack_require__.$Refresh$.signature();















const DatePicker = () => {
  _s();

  const [currentDate, setNewDate] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);

  const onChange = (event, data) => setNewDate(data.value);

  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(react_semantic_ui_datepickers__WEBPACK_IMPORTED_MODULE_4__["default"], {
    onChange: onChange
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 26,
    columnNumber: 12
  }, undefined);
};

_s(DatePicker, "ejKXtV3UHgEVtWCJ5crisacAqE4=");

_c = DatePicker;

function GenerateReport(props) {
  _s2();

  const [step, setStep] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(1);
  const [selectedReport, setSelectedReport] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0);
  const [isStep1Active, setIsStep1Active] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);
  const [isStep2Active, setIsStep2Active] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [isStep3Active, setIsStep3Active] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    dark,
    language
  } = props;
  const {
    HOME
  } = _constants_translation__WEBPACK_IMPORTED_MODULE_3__["default"][`${language}`]; // let reportID = props.match.params.reportID;

  const nextStep = () => {
    setStep(step + 1); // renderSwitch();    

    switch (step + 1) {
      case 2:
        setIsStep1Active(false);
        setIsStep2Active(true);
        setIsStep3Active(false);
        break;
      // case 3:
      //     setIsStep1Active(false)
      //     setIsStep2Active(false)
      //     setIsStep3Active(true)
    }
  };

  const prevStep = () => {
    if (step != 1) {
      setStep(step - 1);

      switch (step - 1) {
        case 1:
          setIsStep1Active(true);
          setIsStep2Active(false);
          setIsStep3Active(false);
          break;
      }
    }
  };

  const handleChange = input => event => {
    this.setState({
      [input]: event.target.value
    });
  };

  function renderSwitch() {
    switch (step) {
      case 1:
        return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["Fragment"], {
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(_ListOfReports__WEBPACK_IMPORTED_MODULE_10__["default"], { ...props,
            prevStep: prevStep,
            nextStep: nextStep,
            setSelectedReport: setSelectedReport
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 78,
            columnNumber: 13
          }, this)
        }, void 0, false);

      case 2:
        switch (selectedReport) {
          case 1:
            return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["Fragment"], {
              children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(_Report1__WEBPACK_IMPORTED_MODULE_6__["default"], { ...props,
                prevStep: prevStep,
                nextStep: nextStep,
                setSelectedReport: setSelectedReport
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 94,
                columnNumber: 21
              }, this)
            }, void 0, false);

          case 2:
            return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["Fragment"], {
              children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(_Report2__WEBPACK_IMPORTED_MODULE_7__["default"], { ...props,
                prevStep: prevStep,
                nextStep: nextStep,
                setSelectedReport: setSelectedReport
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 107,
                columnNumber: 21
              }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_9__["Button"], {
                onClick: () => prevStep(),
                children: "Back"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 113,
                columnNumber: 25
              }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_9__["Button"], {
                onClick: () => nextStep(),
                children: "Next"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 114,
                columnNumber: 25
              }, this)]
            }, void 0, true);
        }

      case 3:
        return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(_Success__WEBPACK_IMPORTED_MODULE_8__["default"], {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 119,
          columnNumber: 20
        }, this);
    }
  }

  return (
    /*#__PURE__*/
    // <Segment>
    //     <Step.Group>
    //          <Step>
    //         <Icon name='chart bar' />
    //   <Step.Content>
    //     <Step.Title>Report Selection</Step.Title>
    //     <Step.Description>Please select a report.</Step.Description>
    //     </Step.Content>
    // </Step> 
    //             <Step>
    //   <Icon name='truck' />
    //   <Step.Content>
    //     <Step.Title>Report {selectedReport}</Step.Title>
    //     <Step.Description>Please fill in the required fields.</Step.Description>
    //     </Step.Content>
    // </Step> 
    // {/* <Header as="h1">Step {step}</Header> */}
    // {/* <Header as="h2">Report {selectedReport}</Header> */}
    Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["Fragment"], {
      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_9__["Container"], {
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_9__["Segment"], {
          padded: true,
          raised: true,
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_9__["Step"].Group, {
            size: "large",
            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_9__["Step"], {
              active: isStep1Active,
              children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_9__["Icon"], {
                name: "clipboard outline"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 149,
                columnNumber: 11
              }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_9__["Step"].Content, {
                children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_9__["Step"].Title, {
                  children: "Step 1: Report Selection"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 151,
                  columnNumber: 13
                }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_9__["Step"].Description, {
                  children: "Please select a report"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 152,
                  columnNumber: 13
                }, this)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 150,
                columnNumber: 11
              }, this)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 148,
              columnNumber: 9
            }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_9__["Step"], {
              active: isStep2Active,
              children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_9__["Icon"], {
                name: "info"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 156,
                columnNumber: 11
              }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_9__["Step"].Content, {
                children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_9__["Step"].Title, {
                  children: "Step 2: Report Info"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 158,
                  columnNumber: 13
                }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_9__["Step"].Description, {
                  children: "Please fill in the required fields"
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 159,
                  columnNumber: 13
                }, this)]
              }, void 0, true, {
                fileName: _jsxFileName,
                lineNumber: 157,
                columnNumber: 11
              }, this)]
            }, void 0, true, {
              fileName: _jsxFileName,
              lineNumber: 155,
              columnNumber: 9
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 147,
            columnNumber: 9
          }, this), renderSwitch()]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 146,
          columnNumber: 9
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 145,
        columnNumber: 9
      }, this)
    }, void 0, false)
  );
}

_s2(GenerateReport, "nozDt6s2Fq79vtxQ+NorR3ttHt8=");

_c2 = GenerateReport;
/* harmony default export */ __webpack_exports__["default"] = (GenerateReport);

var _c, _c2;

__webpack_require__.$Refresh$.register(_c, "DatePicker");
__webpack_require__.$Refresh$.register(_c2, "GenerateReport");

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

/***/ "./src/components/Reports/ListOfReports.jsx":
/*!**************************************************!*\
  !*** ./src/components/Reports/ListOfReports.jsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! semantic-ui-react */ "./node_modules/semantic-ui-react/dist/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _constants_translation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../constants/translation */ "./src/constants/translation.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/paul.attara/Projects/APDC-dev/src/components/Reports/ListOfReports.jsx";






function ListOfReports(props) {
  const {
    dark,
    language
  } = props;
  const {
    HOME
  } = _constants_translation__WEBPACK_IMPORTED_MODULE_3__["default"][`${language}`];
  const ReportsIcon = "chart bar";
  const reportsIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  const handleSelectedReport = index => {
    props.setSelectedReport(index);
    props.nextStep();
  };

  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Segment"], {
    basic: true,
    fluid: "true",
    inverted: dark,
    style: {
      marginTop: 0,
      marginBottom: 0
    },
    children: reportsIndex.map(index => /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])("div", {
      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["List"], {
        selection: true,
        divided: true,
        size: "huge",
        inverted: dark,
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["List"].Item, {
          onClick: () => handleSelectedReport(index),
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["List"].Icon, {
            name: ReportsIcon
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 40,
            columnNumber: 11
          }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["List"].Content, {
            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["List"].Header, {
              children: `${HOME["report" + index]}`
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 42,
              columnNumber: 13
            }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["List"].Description, {
              children: `${HOME["report" + index + "Description"]}`
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 43,
              columnNumber: 13
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 41,
            columnNumber: 11
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 39,
          columnNumber: 9
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 38,
        columnNumber: 9
      }, this)
    }, index, false, {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 9
    }, this))
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 28,
    columnNumber: 5
  }, this);
} // export default React.memo(Home);


_c = ListOfReports;
/* harmony default export */ __webpack_exports__["default"] = (ListOfReports);

var _c;

__webpack_require__.$Refresh$.register(_c, "ListOfReports");

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

/***/ "./src/components/Reports/Report1.jsx":
/*!********************************************!*\
  !*** ./src/components/Reports/Report1.jsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants/translation */ "./src/constants/translation.js");
/* harmony import */ var react_semantic_ui_datepickers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-semantic-ui-datepickers */ "./node_modules/react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.esm.js");
/* harmony import */ var react_semantic_ui_datepickers_dist_react_semantic_ui_datepickers_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css */ "./node_modules/react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css");
/* harmony import */ var react_semantic_ui_datepickers_dist_react_semantic_ui_datepickers_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_semantic_ui_datepickers_dist_react_semantic_ui_datepickers_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! semantic-ui-react */ "./node_modules/semantic-ui-react/dist/es/index.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/paul.attara/Projects/APDC-dev/src/components/Reports/Report1.jsx",
    _s = __webpack_require__.$Refresh$.signature();









function Report1(props) {
  _s();

  const {
    dark,
    language
  } = props;
  const {
    HOME
  } = _constants_translation__WEBPACK_IMPORTED_MODULE_1__["default"][`${language}`];
  const [reportValues, setReportValues] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    pickupPoint: "",
    deliveryZone: "",
    orderStatus: "",
    startDate: "null",
    endDate: "null"
  });

  function onChange(event, data) {
    const {
      name,
      value
    } = data;
    setReportValues(prevState => ({ ...prevState,
      [name]: String(value)
    }));
  }

  const onSubmit = () => {
    console.log(reportValues); // generateReport(1, reportValues)
  };

  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__["jsxDEV"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__["Fragment"], {
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__["Header"], {
      as: "h2",
      children: "Report 1"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 9
    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__["Divider"], {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 9
    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__["Header"], {
      as: "h3",
      children: "Pickup Point"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 9
    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__["Input"], {
      name: "pickupPoint",
      size: "large",
      icon: "map pin",
      placeholder: "Pickup Point",
      onChange: onChange
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 9
    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__["Header"], {
      as: "h3",
      children: "Order Status"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 9
    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__["Input"], {
      name: "orderStatus",
      size: "large",
      placeholder: "Order Status",
      icon: "clipboard outline",
      onChange: onChange
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 9
    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__["Header"], {
      as: "h3",
      children: "Delivery Zone"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 9
    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__["Input"], {
      name: "deliveryZone",
      size: "large",
      placeholder: "Delivery Zone",
      icon: "truck",
      onChange: onChange
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 9
    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__["Header"], {
      as: "h3",
      children: "Date Range of Delivery"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 9
    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__["Grid"], {
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__["Grid"].Column, {
        width: 2,
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__["jsxDEV"])(react_semantic_ui_datepickers__WEBPACK_IMPORTED_MODULE_2__["default"], {
          autoComplete: "off",
          name: "startDate",
          size: "large",
          onChange: onChange
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 80,
          columnNumber: 5
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 79,
        columnNumber: 5
      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__["Grid"].Column, {
        floated: "right",
        width: 2,
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__["jsxDEV"])(react_semantic_ui_datepickers__WEBPACK_IMPORTED_MODULE_2__["default"], {
          autoComplete: "off",
          name: "endDate",
          size: "large",
          onChange: onChange
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 88,
          columnNumber: 5
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 87,
        columnNumber: 5
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 78,
      columnNumber: 9
    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__["Divider"], {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 9
    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__["Grid"], {
      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__["Grid"].Row, {
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__["Grid"].Column, {
          width: 4,
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__["Button"], {
            onClick: () => props.prevStep(),
            children: "Back"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 100,
            columnNumber: 19
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 99,
          columnNumber: 15
        }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__["Grid"].Column, {
          width: 8,
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__["Button"] //   style={{ marginLeft: "30px" }}
          , {
            positive: true,
            disabled: !reportValues.pickupPoint || !reportValues.orderStatus || reportValues.startDate == "null" || reportValues.endDate == "null",
            onClick: () => onSubmit(),
            children: "Submit"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 106,
            columnNumber: 17
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 105,
          columnNumber: 15
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 98,
        columnNumber: 13
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 97,
      columnNumber: 9
    }, this)]
  }, void 0, true);
}

_s(Report1, "FzKeGDWTqBNUXy1m5+qvjU6dh1s=");

_c = Report1;
;
/* harmony default export */ __webpack_exports__["default"] = (Report1);

var _c;

__webpack_require__.$Refresh$.register(_c, "Report1");

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

/***/ "./src/components/Reports/Report2.jsx":
/*!********************************************!*\
  !*** ./src/components/Reports/Report2.jsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Firebase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Firebase */ "./src/components/Firebase/index.jsx");
/* harmony import */ var _Session__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Session */ "./src/components/Session/index.jsx");
/* harmony import */ var _constants_translation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../constants/translation */ "./src/constants/translation.js");
/* harmony import */ var react_semantic_ui_datepickers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-semantic-ui-datepickers */ "./node_modules/react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.esm.js");
/* harmony import */ var react_semantic_ui_datepickers_dist_react_semantic_ui_datepickers_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css */ "./node_modules/react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css");
/* harmony import */ var react_semantic_ui_datepickers_dist_react_semantic_ui_datepickers_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_semantic_ui_datepickers_dist_react_semantic_ui_datepickers_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! semantic-ui-react */ "./node_modules/semantic-ui-react/dist/es/index.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/paul.attara/Projects/APDC-dev/src/components/Reports/Report2.jsx",
    _s = __webpack_require__.$Refresh$.signature();







 // const DatePicker = () => {
// const [currentDate, setNewDate] = useState(null);
// const [infoObject, setInfoObject] = useState({
// })
// const onChange = (event, data) =>{
//     setNewDate(data.value);
//     console.log(data.value)
// } 
// return <SemanticDatepicker size="large" onChange={onChange} />;
// };




function Report2(props) {
  _s();

  // console.log(props)
  const {
    dark,
    language
  } = props;
  const {
    HOME
  } = _constants_translation__WEBPACK_IMPORTED_MODULE_3__["default"][`${language}`]; // let reportID = props.match.params.reportID;

  const [startDate, setNewStartDate] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const [endDate, setEndDate] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const [infoObject, setInfoObject] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});

  const onChange = (event, data) => {
    setNewStartDate(data.value);
    console.log(data.value);
    console.log(event);
  };

  return (
    /*#__PURE__*/
    //   <Segment
    //   basic
    //   fluid="true"
    //   inverted={dark}
    //   style={{ marginTop: 0, marginBottom: 0 }}
    // >
    // <Segment.Group>

    /* //   basic
    //   fluid="true"
    //   textAlign="center"
    //   inverted={dark}
    //   style={{ paddingLeft: 0, paddingRight: 0 }} */
    Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["Fragment"], {
      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__["Segment"], {
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__["Header"], {
          children: "Report 2"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 63,
          columnNumber: 18
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 63,
        columnNumber: 9
      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__["Segment"], {
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__["Input"], {
          size: "large",
          placeholder: "Delivery Zone"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 64,
          columnNumber: 18
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 64,
        columnNumber: 9
      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__["Segment"], {
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__["Input"], {
          size: "large",
          placeholder: "Date Range of Delivery"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 65,
          columnNumber: 18
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 65,
        columnNumber: 9
      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_6__["Segment"], {
        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(react_semantic_ui_datepickers__WEBPACK_IMPORTED_MODULE_4__["default"], {
          size: "large",
          onChange: onChange
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 67,
          columnNumber: 11
        }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxDEV"])(react_semantic_ui_datepickers__WEBPACK_IMPORTED_MODULE_4__["default"], {
          size: "large",
          onChange: onChange
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 68,
          columnNumber: 11
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 66,
        columnNumber: 9
      }, this)]
    }, void 0, true)
  );
}

_s(Report2, "BRJWiVwkk4XHpO+gM1zXIxwA2cE=");

_c = Report2;
;
/* harmony default export */ __webpack_exports__["default"] = (Report2);

var _c;

__webpack_require__.$Refresh$.register(_c, "Report2");

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

/***/ "./src/components/Reports/Success.jsx":
/*!********************************************!*\
  !*** ./src/components/Reports/Success.jsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! semantic-ui-react */ "./node_modules/semantic-ui-react/dist/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _constants_translation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../constants/translation */ "./src/constants/translation.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/paul.attara/Projects/APDC-dev/src/components/Reports/Success.jsx";






function Success(props) {
  //   const { dark, language } = props;
  //   const { HOME } = TRANSLATIONS[`${language}`];
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Segment"], {
    basic: true,
    fluid: "true" //   inverted={dark}
    ,
    style: {
      marginTop: 0,
      marginBottom: 0
    },
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Header"], {
      children: "Successfully created the report"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 5
    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      positive: true,
      as: react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"],
      to: "/reports",
      children: "Go to Reports"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 5
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 21,
    columnNumber: 5
  }, this);
} // export default React.memo(Home);


_c = Success;
/* harmony default export */ __webpack_exports__["default"] = (Success);

var _c;

__webpack_require__.$Refresh$.register(_c, "Success");

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

/***/ })

}]);
//# sourceMappingURL=3.chunk.js.map