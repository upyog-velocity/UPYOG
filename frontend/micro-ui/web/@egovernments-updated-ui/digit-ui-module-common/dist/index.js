function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var digitUiReactComponents = require('@egovernments/digit-ui-react-components');
var React = require('react');
var React__default = _interopDefault(React);
var reactI18next = require('react-i18next');
var reactRouterDom = require('react-router-dom');
var reactHookForm = require('react-hook-form');
var $ = _interopDefault(require('jquery'));
var reactQuery = require('react-query');
var digitUiLibraries = require('@egovernments/digit-ui-libraries');

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

const stringReplaceAll = function (str, searcher, replaceWith) {
  if (str === void 0) {
    str = "";
  }
  if (searcher === void 0) {
    searcher = "";
  }
  if (replaceWith === void 0) {
    replaceWith = "";
  }
  if (searcher == "") return str;
  while (str.includes(searcher)) {
    str = str.replace(searcher, replaceWith);
  }
  return str;
};

const SelectPaymentType = props => {
  var _Digit$UserService$ge, _Digit$UserService$ge2, _data$Bill, _data$Bill$, _bill$billDetails, _bill$billDetails$sor, _bill$billDetails2, _bill$billDetails2$so;
  const optionFirst = {
    code: "PAY_BY_OWNER",
    i18nKey: "PT_PAY_BY_OWNER",
    name: "I am making the payment as the owner/ consumer of the service"
  };
  const optionSecound = {
    code: "PAY_BEHALF_OWNER",
    i18nKey: "PT_PAY_BEHALF_OWNER",
    name: "I am making the payment on behalf of the owner/ consumer of the service"
  };
  const userInfo = (_Digit$UserService$ge = Digit.UserService.getUser()) === null || _Digit$UserService$ge === void 0 ? void 0 : _Digit$UserService$ge.info;
  const payersActiveName = userInfo === null || userInfo === void 0 ? void 0 : userInfo.name;
  const payersActiveMobileNumber = userInfo === null || userInfo === void 0 ? void 0 : userInfo.mobileNumber;
  const {
    t
  } = reactI18next.useTranslation();
  const history = reactRouterDom.useHistory();
  const {
    state,
    ...location
  } = reactRouterDom.useLocation();
  const {
    consumerCode,
    businessService,
    paymentAmt
  } = reactRouterDom.useParams();
  const {
    workflow: wrkflow,
    tenantId: _tenantId,
    ConsumerName
  } = Digit.Hooks.useQueryParams();
  const [bill, setBill] = React.useState(state === null || state === void 0 ? void 0 : state.bill);
  const tenantId = (state === null || state === void 0 ? void 0 : state.tenantId) || _tenantId || ((_Digit$UserService$ge2 = Digit.UserService.getUser().info) === null || _Digit$UserService$ge2 === void 0 ? void 0 : _Digit$UserService$ge2.tenantId);
  const isLoggedIn = Digit.UserService.getUser();
  const {
    data,
    isLoading
  } = state !== null && state !== void 0 && state.bill ? {
    isLoading: false
  } : Digit.Hooks.useFetchPayment({
    tenantId,
    businessService,
    consumerCode
  });
  let Useruuid = (data === null || data === void 0 ? void 0 : (_data$Bill = data.Bill) === null || _data$Bill === void 0 ? void 0 : (_data$Bill$ = _data$Bill[0]) === null || _data$Bill$ === void 0 ? void 0 : _data$Bill$.userId) || "";
  let requestCriteria = ["/user/_search", {}, {
    data: {
      uuid: [Useruuid]
    }
  }, {
    recordId: Useruuid,
    plainRequestFields: ["mobileNumber"]
  }, {
    enabled: Useruuid ? true : false,
    cacheTime: 100
  }];
  const {
    isLoading: isUserLoading,
    data: userData,
    revalidate
  } = Digit.Hooks.useCustomAPIHook(...requestCriteria);
  const billDetails = (bill === null || bill === void 0 ? void 0 : (_bill$billDetails = bill.billDetails) === null || _bill$billDetails === void 0 ? void 0 : (_bill$billDetails$sor = _bill$billDetails.sort((a, b) => b.fromPeriod - a.fromPeriod)) === null || _bill$billDetails$sor === void 0 ? void 0 : _bill$billDetails$sor[0]) || [];
  const Arrears = (bill === null || bill === void 0 ? void 0 : (_bill$billDetails2 = bill.billDetails) === null || _bill$billDetails2 === void 0 ? void 0 : (_bill$billDetails2$so = _bill$billDetails2.sort((a, b) => b.fromPeriod - a.fromPeriod)) === null || _bill$billDetails2$so === void 0 ? void 0 : _bill$billDetails2$so.reduce((total, current, index) => index === 0 ? total : total + current.amount, 0)) || 0;
  const [paymentType, setPaymentType] = React.useState(optionFirst);
  const [payersName, setPayersName] = React.useState("");
  const [payersMobileNumber, setPayersMobileNumber] = React.useState("");
  const {
    control,
    handleSubmit
  } = reactHookForm.useForm();
  const [canSubmit, setCanSubmit] = React.useState(false);
  const [mobileNumberError, setmobileNumberError] = React.useState(null);
  const [isCheckBox, setIsCheckBox] = React.useState(false);
  const [isCCFEnabled, setisCCFEnabled] = React.useState(false);
  const [mdmsConfig, setMdmsConfig] = React.useState("");
  const {
    isLoading: citizenConcentFormLoading,
    data: ccfData
  } = Digit.Hooks.useCustomMDMS(Digit.ULBService.getStateId(), "common-masters", [{
    name: "CitizenConsentForm"
  }]);
  function setTermsAndPolicyDetails(e) {
    setIsCheckBox(e.target.checked);
  }
  const checkDisbaled = () => {
    if (isCCFEnabled !== null && isCCFEnabled !== void 0 && isCCFEnabled.isCitizenConsentFormEnabled && !(isLoggedIn !== null && isLoggedIn !== void 0 && isLoggedIn.access_token)) {
      const isData = (paymentType === null || paymentType === void 0 ? void 0 : paymentType.code) !== (optionSecound === null || optionSecound === void 0 ? void 0 : optionSecound.code) ? false : userInfo ? false : !canSubmit;
      let isEnabled = false;
      if (!isData && isCheckBox) isEnabled = false;else isEnabled = true;
      return isEnabled;
    } else {
      return (paymentType === null || paymentType === void 0 ? void 0 : paymentType.code) !== (optionSecound === null || optionSecound === void 0 ? void 0 : optionSecound.code) ? false : userInfo ? false : !canSubmit;
    }
  };
  React.useEffect(() => {
    var _ccfData$commonMaste, _ccfData$commonMaste$, _ccfData$commonMaste$2;
    if (ccfData !== null && ccfData !== void 0 && (_ccfData$commonMaste = ccfData["common-masters"]) !== null && _ccfData$commonMaste !== void 0 && (_ccfData$commonMaste$ = _ccfData$commonMaste.CitizenConsentForm) !== null && _ccfData$commonMaste$ !== void 0 && (_ccfData$commonMaste$2 = _ccfData$commonMaste$[0]) !== null && _ccfData$commonMaste$2 !== void 0 && _ccfData$commonMaste$2.isCitizenConsentFormEnabled) {
      var _ccfData$commonMaste2, _ccfData$commonMaste3;
      setisCCFEnabled(ccfData === null || ccfData === void 0 ? void 0 : (_ccfData$commonMaste2 = ccfData["common-masters"]) === null || _ccfData$commonMaste2 === void 0 ? void 0 : (_ccfData$commonMaste3 = _ccfData$commonMaste2.CitizenConsentForm) === null || _ccfData$commonMaste3 === void 0 ? void 0 : _ccfData$commonMaste3[0]);
    }
  }, [ccfData]);
  const onLinkClick = e => {
    setMdmsConfig(e.target.id);
  };
  const checkLabels = () => {
    var _isCCFEnabled$checkBo;
    return /*#__PURE__*/React__default.createElement("span", null, isCCFEnabled === null || isCCFEnabled === void 0 ? void 0 : (_isCCFEnabled$checkBo = isCCFEnabled.checkBoxLabels) === null || _isCCFEnabled$checkBo === void 0 ? void 0 : _isCCFEnabled$checkBo.map((data, index) => {
      var _isCCFEnabled$checkBo2;
      return /*#__PURE__*/React__default.createElement("span", null, (data === null || data === void 0 ? void 0 : data.linkPrefix) && /*#__PURE__*/React__default.createElement("span", null, t((data === null || data === void 0 ? void 0 : data.linkPrefix) + "_")), (data === null || data === void 0 ? void 0 : data.link) && /*#__PURE__*/React__default.createElement("span", {
        id: data === null || data === void 0 ? void 0 : data.linkId,
        onClick: e => {
          onLinkClick(e);
        },
        style: {
          color: "#a82227",
          cursor: "pointer"
        }
      }, t((data === null || data === void 0 ? void 0 : data.link) + "_")), (data === null || data === void 0 ? void 0 : data.linkPostfix) && /*#__PURE__*/React__default.createElement("span", null, t((data === null || data === void 0 ? void 0 : data.linkPostfix) + "_")), index == (isCCFEnabled === null || isCCFEnabled === void 0 ? void 0 : (_isCCFEnabled$checkBo2 = isCCFEnabled.checkBoxLabels) === null || _isCCFEnabled$checkBo2 === void 0 ? void 0 : _isCCFEnabled$checkBo2.length) - 1 && t("LABEL"));
    }));
  };
  React.useEffect(() => {
    if (!bill && data) {
      var _data$Bill2;
      let requiredBill = data === null || data === void 0 ? void 0 : (_data$Bill2 = data.Bill) === null || _data$Bill2 === void 0 ? void 0 : _data$Bill2.filter(e => e.consumerCode == consumerCode)[0];
      setBill(requiredBill);
    }
  }, [isLoading]);
  const onChangePayersMobileNumber = e => {
    setmobileNumberError(null);
    let validation = "^\\d{10}$";
    if (!e.match(validation)) {
      setmobileNumberError("CORE_COMMON_PHONENO_INVALIDMSG");
      setCanSubmit(false);
    }
    setPayersMobileNumber(e);
    e.length == 10 && payersName != "" ? setCanSubmit(true) : setCanSubmit(false);
  };
  const onChangePayersName = value => {
    setPayersName(value);
    value.length !== 0 && mobileNumberError != "CORE_COMMON_PHONENO_INVALIDMSG" && payersName != "" && payersMobileNumber != "" ? setCanSubmit(true) : setCanSubmit(false);
  };
  const onSubmit = () => {
    if (wrkflow === "WNS") {
      var _bill$mobileNumber, _userData$user, _userData$user$;
      history.push("/digit-ui/citizen/payment/collect/" + businessService + "/" + consumerCode + "?workflow=WNS&consumerCode=" + stringReplaceAll(consumerCode, "+", "/"), {
        paymentAmount: paymentAmt,
        tenantId: billDetails.tenantId,
        name: (paymentType === null || paymentType === void 0 ? void 0 : paymentType.code) !== (optionSecound === null || optionSecound === void 0 ? void 0 : optionSecound.code) && ConsumerName !== "undefined" ? ConsumerName : userInfo ? payersActiveName : payersName,
        mobileNumber: (paymentType === null || paymentType === void 0 ? void 0 : paymentType.code) !== (optionSecound === null || optionSecound === void 0 ? void 0 : optionSecound.code) ? bill !== null && bill !== void 0 && (_bill$mobileNumber = bill.mobileNumber) !== null && _bill$mobileNumber !== void 0 && _bill$mobileNumber.includes("*") ? userData === null || userData === void 0 ? void 0 : (_userData$user = userData.user) === null || _userData$user === void 0 ? void 0 : (_userData$user$ = _userData$user[0]) === null || _userData$user$ === void 0 ? void 0 : _userData$user$.mobileNumber : bill === null || bill === void 0 ? void 0 : bill.mobileNumber : userInfo ? payersActiveMobileNumber : payersMobileNumber
      });
    } else {
      var _bill$mobileNumber2, _userData$user2, _userData$user2$;
      history.push("/digit-ui/citizen/payment/collect/" + businessService + "/" + consumerCode, {
        paymentAmount: paymentAmt,
        tenantId: billDetails.tenantId,
        name: (paymentType === null || paymentType === void 0 ? void 0 : paymentType.code) !== (optionSecound === null || optionSecound === void 0 ? void 0 : optionSecound.code) ? bill === null || bill === void 0 ? void 0 : bill.payerName : userInfo ? payersActiveName : payersName,
        mobileNumber: (paymentType === null || paymentType === void 0 ? void 0 : paymentType.code) !== (optionSecound === null || optionSecound === void 0 ? void 0 : optionSecound.code) ? bill !== null && bill !== void 0 && (_bill$mobileNumber2 = bill.mobileNumber) !== null && _bill$mobileNumber2 !== void 0 && _bill$mobileNumber2.includes("*") ? userData === null || userData === void 0 ? void 0 : (_userData$user2 = userData.user) === null || _userData$user2 === void 0 ? void 0 : (_userData$user2$ = _userData$user2[0]) === null || _userData$user2$ === void 0 ? void 0 : _userData$user2$.mobileNumber : bill === null || bill === void 0 ? void 0 : bill.mobileNumber : userInfo ? payersActiveMobileNumber : payersMobileNumber
      });
    }
  };
  if (isLoading || isUserLoading || citizenConcentFormLoading) {
    return /*#__PURE__*/React__default.createElement(digitUiReactComponents.Loader, null);
  }
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(digitUiReactComponents.BackButton, null, t("CS_COMMON_BACK")), /*#__PURE__*/React__default.createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/React__default.createElement(digitUiReactComponents.Header, null, t("PT_PAYERS_DETAILS_HEADER")), /*#__PURE__*/React__default.createElement(digitUiReactComponents.Card, null, /*#__PURE__*/React__default.createElement("span", {
    className: "card-label-error"
  }, t(mobileNumberError)), /*#__PURE__*/React__default.createElement(digitUiReactComponents.RadioButtons, {
    selectedOption: paymentType,
    onSelect: setPaymentType,
    options: [optionFirst, optionSecound],
    optionsKey: "name",
    inputStyle: {
      marginTop: "11px"
    },
    innerStyles: {
      display: "flex"
    }
  }), /*#__PURE__*/React__default.createElement("div", {
    style: {
      position: "relative"
    }
  }, (paymentType === null || paymentType === void 0 ? void 0 : paymentType.code) !== (optionFirst === null || optionFirst === void 0 ? void 0 : optionFirst.code) && !userInfo ? /*#__PURE__*/React__default.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React__default.createElement("span", null, /*#__PURE__*/React__default.createElement("span", null, t("PT_PAYERS_MOBILE_NO")), /*#__PURE__*/React__default.createElement(digitUiReactComponents.MobileNumber, {
    onChange: onChangePayersMobileNumber,
    value: payersMobileNumber
  })), /*#__PURE__*/React__default.createElement("span", null, /*#__PURE__*/React__default.createElement("span", null, t("PT_PAYERS_NAME")), /*#__PURE__*/React__default.createElement(digitUiReactComponents.TextInput, {
    onChange: e => onChangePayersName(e.target.value),
    value: payersName
  }))) : null), (isCCFEnabled === null || isCCFEnabled === void 0 ? void 0 : isCCFEnabled.isCitizenConsentFormEnabled) && !(isLoggedIn !== null && isLoggedIn !== void 0 && isLoggedIn.access_token) && /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(digitUiReactComponents.CheckBox, {
    className: "form-field",
    label: checkLabels(),
    value: isCheckBox,
    checked: isCheckBox,
    style: {
      marginTop: "5px",
      marginLeft: "55px"
    },
    styles: {
      marginBottom: "30px"
    },
    onChange: setTermsAndPolicyDetails
  }), /*#__PURE__*/React__default.createElement(digitUiReactComponents.CitizenConsentForm, {
    styles: {},
    t: t,
    isCheckBoxChecked: setTermsAndPolicyDetails,
    labels: isCCFEnabled === null || isCCFEnabled === void 0 ? void 0 : isCCFEnabled.checkBoxLabels,
    mdmsConfig: mdmsConfig,
    setMdmsConfig: setMdmsConfig
  })), /*#__PURE__*/React__default.createElement(digitUiReactComponents.SubmitBar, {
    label: t("CS_COMMON_NEXT"),
    disabled: checkDisbaled(),
    submit: true
  }))));
};

const MyBill = _ref => {
  var _bill$totalAmount;
  let {
    bill,
    currentPath,
    businessService,
    getKeyNotesConfig
  } = _ref;
  const {
    t
  } = reactI18next.useTranslation();
  const history = reactRouterDom.useHistory();
  const onSubmit = () => {
    history.push(currentPath + "/" + bill.consumerCode, {
      tenantId: bill === null || bill === void 0 ? void 0 : bill.tenantId
    });
  };
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, typeof getKeyNotesConfig === "function" && /*#__PURE__*/React__default.createElement(digitUiReactComponents.Card, null, getKeyNotesConfig(businessService, t)["my-bill"].map((obj, index) => {
    const value = obj.keyPath.reduce((acc, key) => {
      if (typeof key === "function") acc = key(acc);else acc = acc[key];
      return acc;
    }, bill);
    return /*#__PURE__*/React__default.createElement(digitUiReactComponents.KeyNote, {
      key: index + obj.keyValue,
      keyValue: t(obj.keyValue),
      note: value || obj.fallback,
      noteStyle: obj.noteStyle || {}
    });
  }), /*#__PURE__*/React__default.createElement(digitUiReactComponents.SubmitBar, {
    disabled: !((_bill$totalAmount = bill.totalAmount) !== null && _bill$totalAmount !== void 0 && _bill$totalAmount.toFixed(2)),
    onSubmit: onSubmit,
    label: t("CS_MY_APPLICATION_VIEW_DETAILS")
  })));
};

const BillList = _ref => {
  let {
    billsList,
    currentPath,
    businessService
  } = _ref;
  const {
    t
  } = reactI18next.useTranslation();
  const history = reactRouterDom.useHistory();
  const consumerCodes = billsList.map(bill => bill.consumerCode);
  const searchResult = Digit.Hooks.useApplicationsForBusinessServiceSearch({
    filters: {
      consumerCodes: consumerCodes.join()
    },
    businessService
  });
  const keyForConsumerCode = searchResult.key;
  const [applicationList, setApplicationList] = React.useState([]);
  const [getKeyNotesConfig, setConfig] = React.useState(() => {
    var _Digit$ComponentRegis;
    return (_Digit$ComponentRegis = Digit.ComponentRegistryService) === null || _Digit$ComponentRegis === void 0 ? void 0 : _Digit$ComponentRegis.getComponent("getBillDetailsConfigWithBusinessService");
  });
  const billableApplicationsObj = React.useMemo(() => ({}), []);
  const billsListObj = React.useMemo(() => ({}), []);
  React.useEffect(() => {
    if (searchResult.data) searchResult.refetch();
  }, []);
  React.useEffect(() => {
    if (searchResult.data) {
      const billableApps = searchResult.data.filter(property => consumerCodes.includes(property[keyForConsumerCode]));
      const billableIDs = billableApps.map(e => e[keyForConsumerCode]);
      billableApps.forEach(app => {
        billableApplicationsObj[app[keyForConsumerCode]] = app;
      });
      billsList.forEach(bill => {
        billsListObj[bill.consumerCode] = bill;
      });
      const newBillsList = billableIDs.map(e => ({
        ...billsListObj[e],
        ...billableApplicationsObj[e]
      }));
      setApplicationList(newBillsList);
    }
  }, [searchResult.data, getKeyNotesConfig]);
  if (searchResult.isLoading) {
    return /*#__PURE__*/React__default.createElement(digitUiReactComponents.Loader, null);
  }
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: "static"
  }, /*#__PURE__*/React__default.createElement(digitUiReactComponents.Header, null, t("CS_TITLE_MY_BILLS") + (" (" + applicationList.length + ")")), (applicationList === null || applicationList === void 0 ? void 0 : applicationList.length) > 0 && getKeyNotesConfig && applicationList.map((bill, index) => /*#__PURE__*/React__default.createElement("div", {
    key: index
  }, /*#__PURE__*/React__default.createElement(MyBill, {
    bill,
    currentPath,
    businessService,
    getKeyNotesConfig
  }))), !(applicationList !== null && applicationList !== void 0 && applicationList.length) > 0 && /*#__PURE__*/React__default.createElement("p", {
    style: {
      paddingLeft: "16px"
    }
  }, t("CS_BILLS_TEXT_NO_BILLS_FOUND")), businessService === "PT" && /*#__PURE__*/React__default.createElement("p", {
    style: {
      paddingLeft: "16px",
      paddingTop: "16px"
    }
  }, t("PT_TEXT_NOT_ABLE_TO_FIND_THE_PROPERTY"), /*#__PURE__*/React__default.createElement("span", {
    className: "link"
  }, /*#__PURE__*/React__default.createElement(reactRouterDom.Link, {
    to: "/digit-ui/citizen/pt/property/citizen-search"
  }, t("PT_COMMON_CLICK_HERE"))))));
};

const styles = {
  root: {
    width: "100%",
    marginTop: "2px",
    overflowX: "auto",
    boxShadow: "none"
  },
  table: {
    minWidth: 700,
    backgroundColor: "rgba(250, 250, 250, var(--bg-opacity))"
  },
  cell: {
    maxWidth: "7em",
    minWidth: "1em",
    border: "1px solid #e8e7e6",
    padding: "4px 5px",
    fontSize: "0.8em",
    textAlign: "left",
    lineHeight: "1.5em"
  },
  cellHeader: {
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  cellLeft: {},
  cellRight: {}
};
const ArrearTable = _ref => {
  let {
    className = "table",
    headers = [],
    values = [],
    arrears = 0
  } = _ref;
  const {
    t
  } = reactI18next.useTranslation();
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    style: styles.root
  }, /*#__PURE__*/React__default.createElement("table", {
    className: "table-fixed-column-common-pay",
    style: styles.table
  }, /*#__PURE__*/React__default.createElement("thead", null, /*#__PURE__*/React__default.createElement("tr", null, /*#__PURE__*/React__default.createElement("th", {
    style: {
      ...styles.cell,
      ...styles.cellLeft,
      ...styles.cellHeader
    }
  }, t("CS_BILL_PERIOD")), headers.map((header, ind) => {
    let styleRight = headers.length == ind + 1 ? styles.cellRight : {};
    return /*#__PURE__*/React__default.createElement("th", {
      style: {
        ...styles.cell,
        ...styleRight,
        ...styles.cellHeader
      },
      key: ind
    }, t(header));
  }))), /*#__PURE__*/React__default.createElement("tbody", null, Object.values(values).map((row, ind) => /*#__PURE__*/React__default.createElement("tr", {
    key: ind
  }, /*#__PURE__*/React__default.createElement("td", {
    style: {
      ...styles.cell,
      ...styles.cellLeft
    },
    component: "th",
    scope: "row"
  }, Object.keys(values)[ind]), headers.map((header, i) => {
    let styleRight = headers.length == i + 1 ? styles.cellRight : {};
    return /*#__PURE__*/React__default.createElement("td", {
      style: {
        ...styles.cell,
        textAlign: "left",
        ...styleRight,
        whiteSpace: "pre"
      },
      key: i,
      numeric: true
    }, i > 1 && "₹", row[header] && row[header]["value"] || "0");
  }))), /*#__PURE__*/React__default.createElement("tr", null, /*#__PURE__*/React__default.createElement("td", {
    style: {
      ...styles.cell,
      ...styles.cellLeft
    }
  }), headers.map((header, ind) => {
    if (ind == headers.length - 1) {
      return /*#__PURE__*/React__default.createElement("td", {
        style: {
          ...styles.cell,
          ...styles.cellRight,
          textAlign: "left",
          fontWeight: "700",
          whiteSpace: "pre"
        },
        key: ind,
        numeric: true
      }, arrears);
    } else if (ind == headers.length - 2) {
      return /*#__PURE__*/React__default.createElement("td", {
        style: {
          ...styles.cell,
          textAlign: "left"
        },
        key: ind,
        numeric: true
      }, t("COMMON_ARREARS_TOTAL"));
    } else {
      return /*#__PURE__*/React__default.createElement("td", {
        style: styles.cell,
        key: ind,
        numeric: true
      });
    }
  }))))));
};

const styles$1 = {
  buttonStyle: {
    display: "flex",
    justifyContent: "flex-end",
    color: "#a82227"
  },
  headerStyle: {
    marginTop: "10px",
    fontSize: "16px",
    fontWeight: "700",
    lineHeight: "24px",
    color: " rgba(11, 12, 12, var(--text-opacity))"
  }
};
const ArrearSummary = _ref => {
  var _bill$billDetails, _sortedBillDetails, _arrears$toFixed;
  let {
    bill = {}
  } = _ref;
  const {
    t
  } = reactI18next.useTranslation();
  const formatTaxHeaders = function (billDetail) {
    var _billDetail, _billDetail2, _billDetail3;
    if (billDetail === void 0) {
      billDetail = {};
    }
    let formattedFees = {};
    const {
      billAccountDetails = []
    } = billDetail;
    billAccountDetails.map(taxHead => {
      formattedFees[taxHead.taxHeadCode] = {
        value: taxHead.amount,
        order: taxHead.order
      };
    });
    formattedFees["CS_BILL_NO"] = {
      value: ((_billDetail = billDetail) === null || _billDetail === void 0 ? void 0 : _billDetail.billNumber) || "NA",
      order: -2
    };
    formattedFees["CS_BILL_DUEDATE"] = {
      value: ((_billDetail2 = billDetail) === null || _billDetail2 === void 0 ? void 0 : _billDetail2.expiryDate) && new Date((_billDetail3 = billDetail) === null || _billDetail3 === void 0 ? void 0 : _billDetail3.expiryDate).toLocaleDateString() || "NA",
      order: -1
    };
    formattedFees["TL_COMMON_TOTAL_AMT"] = {
      value: billDetail.amount,
      order: 10
    };
    return formattedFees;
  };
  const getFinancialYears = (from, to) => {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    if (toDate.getYear() - fromDate.getYear() != 0) {
      return "FY" + (fromDate.getYear() + 1900) + "-" + (toDate.getYear() - 100);
    }
    return fromDate.toLocaleDateString() + "-" + toDate.toLocaleDateString();
  };
  let fees = {};
  let sortedBillDetails = (bill === null || bill === void 0 ? void 0 : (_bill$billDetails = bill.billDetails) === null || _bill$billDetails === void 0 ? void 0 : _bill$billDetails.sort((a, b) => b.fromPeriod - a.fromPeriod)) || [];
  sortedBillDetails = [...sortedBillDetails];
  const arrears = ((_sortedBillDetails = sortedBillDetails) === null || _sortedBillDetails === void 0 ? void 0 : _sortedBillDetails.reduce((total, current, index) => index === 0 ? total : total + current.amount, 0)) || 0;
  let arrearsAmount = "\u20B9 " + ((arrears === null || arrears === void 0 ? void 0 : (_arrears$toFixed = arrears.toFixed) === null || _arrears$toFixed === void 0 ? void 0 : _arrears$toFixed.call(arrears, 0)) || Number(0).toFixed(0));
  sortedBillDetails.shift();
  sortedBillDetails.map(bill => {
    let fee = formatTaxHeaders(bill);
    fees[getFinancialYears(bill.fromPeriod, bill.toPeriod)] = fee;
  });
  let head = {};
  fees ? Object.keys(fees).map((key, ind) => {
    Object.keys(fees[key]).map(key1 => {
      head[key1] = fees[key] && fees[key][key1] && fees[key][key1].order || 0;
    });
  }) : "NA";
  let keys = [];
  keys = Object.keys(head);
  keys.sort((x, y) => head[x] - head[y]);
  const [showArrear, setShowArrear] = React.useState(false);
  if (arrears == 0 || arrears < 0) {
    return /*#__PURE__*/React__default.createElement("span", null);
  }
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    style: styles$1.headerStyle
  }, t("CS_ARREARS_DETAILS")), showArrear && /*#__PURE__*/React__default.createElement(ArrearTable, {
    headers: [...keys],
    values: fees,
    arrears: arrearsAmount
  }), !showArrear && /*#__PURE__*/React__default.createElement("div", {
    style: styles$1.buttonStyle
  }, /*#__PURE__*/React__default.createElement("button", {
    type: "button",
    onClick: () => {
      setShowArrear(true);
    }
  }, t("CS_SHOW_CARD"))), showArrear && /*#__PURE__*/React__default.createElement("div", {
    style: styles$1.buttonStyle
  }, /*#__PURE__*/React__default.createElement("button", {
    type: "button",
    onClick: () => {
      setShowArrear(false);
    }
  }, t("CS_HIDE_CARD"))));
};

const BillSumary = _ref => {
  var _arrears$toFixed;
  let {
    billAccountDetails,
    total,
    businessService,
    arrears
  } = _ref;
  const {
    t
  } = reactI18next.useTranslation();
  const {
    workflow: ModuleWorkflow
  } = Digit.Hooks.useQueryParams();
  React.useEffect(() => {
    ModuleWorkflow === "mcollect" && billAccountDetails && billAccountDetails.map(ob => {
      if (ob.taxHeadCode.includes("CGST")) ob.order = 3;else if (ob.taxHeadCode.includes("SGST")) ob.order = 4;
    });
  }, [billAccountDetails]);
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: "bill-summary"
  }, billAccountDetails.sort((a, b) => a.order - b.order).map((amountDetails, index) => {
    var _amountDetails$amount;
    return /*#__PURE__*/React__default.createElement("div", {
      key: index,
      className: "bill-account-details"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "label"
    }, t(amountDetails.taxHeadCode)), /*#__PURE__*/React__default.createElement("div", {
      className: "value"
    }, "\u20B9 ", Math.abs(amountDetails === null || amountDetails === void 0 ? void 0 : (_amountDetails$amount = amountDetails.amount) === null || _amountDetails$amount === void 0 ? void 0 : _amountDetails$amount.toFixed(2))));
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "bill-account-details"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "label"
  }, t("COMMON_ARREARS")), /*#__PURE__*/React__default.createElement("div", {
    className: "value"
  }, "\u20B9 ", Math.abs((arrears === null || arrears === void 0 ? void 0 : (_arrears$toFixed = arrears.toFixed) === null || _arrears$toFixed === void 0 ? void 0 : _arrears$toFixed.call(arrears, 2)) || Number(0).toFixed(2)))), /*#__PURE__*/React__default.createElement("hr", {
    className: "underline"
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "amount-details"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "label"
  }, t("CS_PAYMENT_TOTAL_AMOUNT")), /*#__PURE__*/React__default.createElement("div", {
    className: "value"
  }, "\u20B9 ", Number(total).toFixed(2)))));
};

const BillDetails = _ref => {
  var _Digit$UserService$ge, _data$Bill, _data$Bill$, _bill$billDetails, _bill$billDetails$sor, _bill$billDetails2, _bill$billDetails2$so;
  let {
    paymentRules,
    businessService
  } = _ref;
  const {
    t
  } = reactI18next.useTranslation();
  const history = reactRouterDom.useHistory();
  const {
    state,
    ...location
  } = reactRouterDom.useLocation();
  let {
    consumerCode
  } = reactRouterDom.useParams();
  const {
    workflow: wrkflow,
    tenantId: _tenantId,
    ConsumerName
  } = Digit.Hooks.useQueryParams();
  const [bill, setBill] = React.useState(state === null || state === void 0 ? void 0 : state.bill);
  const tenantId = (state === null || state === void 0 ? void 0 : state.tenantId) || _tenantId || ((_Digit$UserService$ge = Digit.UserService.getUser().info) === null || _Digit$UserService$ge === void 0 ? void 0 : _Digit$UserService$ge.tenantId);
  const propertyId = state === null || state === void 0 ? void 0 : state.propertyId;
  if (wrkflow === "WNS" && consumerCode.includes("?")) consumerCode = consumerCode.substring(0, consumerCode.indexOf("?"));
  const {
    data,
    isLoading
  } = state !== null && state !== void 0 && state.bill ? {
    isLoading: false
  } : Digit.Hooks.useFetchPayment({
    tenantId,
    businessService,
    consumerCode: wrkflow === "WNS" ? stringReplaceAll(consumerCode, "+", "/") : consumerCode
  });
  let Useruuid = (data === null || data === void 0 ? void 0 : (_data$Bill = data.Bill) === null || _data$Bill === void 0 ? void 0 : (_data$Bill$ = _data$Bill[0]) === null || _data$Bill$ === void 0 ? void 0 : _data$Bill$.userId) || "";
  let requestCriteria = ["/user/_search", {}, {
    data: {
      uuid: [Useruuid]
    }
  }, {
    recordId: Useruuid,
    plainRequestFields: ["mobileNumber"]
  }, {
    enabled: Useruuid ? true : false,
    cacheTime: 100
  }];
  const {
    isLoading: isUserLoading,
    data: userData,
    revalidate
  } = Digit.Hooks.useCustomAPIHook(...requestCriteria);
  let {
    minAmountPayable,
    isAdvanceAllowed
  } = paymentRules;
  minAmountPayable = wrkflow === "WNS" ? 100 : minAmountPayable;
  const billDetails = (bill === null || bill === void 0 ? void 0 : (_bill$billDetails = bill.billDetails) === null || _bill$billDetails === void 0 ? void 0 : (_bill$billDetails$sor = _bill$billDetails.sort((a, b) => b.fromPeriod - a.fromPeriod)) === null || _bill$billDetails$sor === void 0 ? void 0 : _bill$billDetails$sor[0]) || [];
  const Arrears = (bill === null || bill === void 0 ? void 0 : (_bill$billDetails2 = bill.billDetails) === null || _bill$billDetails2 === void 0 ? void 0 : (_bill$billDetails2$so = _bill$billDetails2.sort((a, b) => b.fromPeriod - a.fromPeriod)) === null || _bill$billDetails2$so === void 0 ? void 0 : _bill$billDetails2$so.reduce((total, current, index) => index === 0 ? total : total + current.amount, 0)) || 0;
  const {
    key,
    label
  } = Digit.Hooks.useApplicationsForBusinessServiceSearch({
    businessService
  }, {
    enabled: false
  });
  const getBillingPeriod = () => {
    const {
      fromPeriod,
      toPeriod
    } = billDetails;
    if (fromPeriod && toPeriod) {
      let from, to;
      if (wrkflow === "mcollect" || wrkflow === "WNS") {
        var _Digit$Utils$date$mon;
        from = new Date(fromPeriod).getDate().toString() + " " + ((_Digit$Utils$date$mon = Digit.Utils.date.monthNames[new Date(fromPeriod).getMonth()]) === null || _Digit$Utils$date$mon === void 0 ? void 0 : _Digit$Utils$date$mon.toString()) + " " + new Date(fromPeriod).getFullYear().toString();
        to = new Date(toPeriod).getDate() + " " + Digit.Utils.date.monthNames[new Date(toPeriod).getMonth()] + " " + new Date(toPeriod).getFullYear();
        return from + " - " + to;
      }
      from = new Date(billDetails.fromPeriod).getFullYear().toString();
      to = new Date(billDetails.toPeriod).getFullYear().toString();
      if (from === to) {
        if (window.location.href.includes("BPA")) {
          var _data$Bill2, _data$Bill2$;
          if (new Date(data === null || data === void 0 ? void 0 : (_data$Bill2 = data.Bill) === null || _data$Bill2 === void 0 ? void 0 : (_data$Bill2$ = _data$Bill2[0]) === null || _data$Bill2$ === void 0 ? void 0 : _data$Bill2$.billDate).getMonth() + 1 < 4) {
            let newfrom = (parseInt(from) - 1).toString();
            return "FY " + newfrom + "-" + to;
          } else {
            let newTo = (parseInt(to) + 1).toString();
            return "FY " + from + "-" + newTo;
          }
        } else return "FY " + from;
      }
      return "FY " + from + "-" + to;
    } else return "N/A";
  };
  const getBillBreakDown = () => (billDetails === null || billDetails === void 0 ? void 0 : billDetails.billAccountDetails) || [];
  const getTotal = () => (bill === null || bill === void 0 ? void 0 : bill.totalAmount) || 0;
  const [paymentType, setPaymentType] = React.useState(t("CS_PAYMENT_FULL_AMOUNT"));
  const [amount, setAmount] = React.useState(getTotal());
  const [paymentAllowed, setPaymentAllowed] = React.useState(true);
  const [formError, setError] = React.useState("");
  React.useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth"
    });
  }, []);
  React.useEffect(() => {
    if (paymentType == t("CS_PAYMENT_FULL_AMOUNT")) setAmount(getTotal());
  }, [paymentType, bill]);
  React.useEffect(() => {
    let changeAdvanceAllowed = isAdvanceAllowed;
    if (isAdvanceAllowed && wrkflow === "WNS") changeAdvanceAllowed = false;
    const allowPayment = minAmountPayable && amount >= minAmountPayable && !changeAdvanceAllowed && amount <= getTotal() && !formError;
    if (paymentType != t("CS_PAYMENT_FULL_AMOUNT")) setPaymentAllowed(allowPayment);else setPaymentAllowed(true);
  }, [paymentType, amount]);
  React.useEffect(() => {
    if (!bill && data) {
      let requiredBill = data.Bill.filter(e => e.consumerCode == (wrkflow === "WNS" ? stringReplaceAll(consumerCode, "+", "/") : consumerCode))[0];
      setBill(requiredBill);
    }
  }, [isLoading]);
  const onSubmit = () => {
    let paymentAmount = paymentType === t("CS_PAYMENT_FULL_AMOUNT") ? getTotal() : amount;
    if (window.location.href.includes("mcollect")) {
      history.push("/digit-ui/citizen/payment/collect/" + businessService + "/" + consumerCode + "?workflow=mcollect", {
        paymentAmount,
        tenantId: billDetails.tenantId
      });
    } else if (wrkflow === "WNS") {
      var _bill$mobileNumber, _userData$user, _userData$user$;
      history.push("/digit-ui/citizen/payment/billDetails/" + businessService + "/" + consumerCode + "/" + paymentAmount + "?workflow=WNS&ConsumerName=" + ConsumerName, {
        paymentAmount,
        tenantId: billDetails.tenantId,
        name: bill.payerName,
        mobileNumber: bill.mobileNumber && (_bill$mobileNumber = bill.mobileNumber) !== null && _bill$mobileNumber !== void 0 && _bill$mobileNumber.includes("*") ? userData === null || userData === void 0 ? void 0 : (_userData$user = userData.user) === null || _userData$user === void 0 ? void 0 : (_userData$user$ = _userData$user[0]) === null || _userData$user$ === void 0 ? void 0 : _userData$user$.mobileNumber : bill.mobileNumber
      });
    } else if (businessService === "PT") {
      var _bill$mobileNumber2, _userData$user2, _userData$user2$;
      history.push("/digit-ui/citizen/payment/billDetails/" + businessService + "/" + consumerCode + "/" + paymentAmount, {
        paymentAmount,
        tenantId: billDetails.tenantId,
        name: bill.payerName,
        mobileNumber: bill.mobileNumber && (_bill$mobileNumber2 = bill.mobileNumber) !== null && _bill$mobileNumber2 !== void 0 && _bill$mobileNumber2.includes("*") ? userData === null || userData === void 0 ? void 0 : (_userData$user2 = userData.user) === null || _userData$user2 === void 0 ? void 0 : (_userData$user2$ = _userData$user2[0]) === null || _userData$user2$ === void 0 ? void 0 : _userData$user2$.mobileNumber : bill.mobileNumber
      });
    } else {
      history.push("/digit-ui/citizen/payment/collect/" + businessService + "/" + consumerCode, {
        paymentAmount,
        tenantId: billDetails.tenantId,
        propertyId: propertyId
      });
    }
  };
  const onChangeAmount = value => {
    setError("");
    if (isNaN(value) || value.includes(".")) {
      setError("AMOUNT_INVALID");
    } else if (!isAdvanceAllowed && value > getTotal()) {
      setError("CS_ADVANCED_PAYMENT_NOT_ALLOWED");
    } else if (value < minAmountPayable) {
      setError("CS_CANT_PAY_BELOW_MIN_AMOUNT");
    }
    setAmount(value);
  };
  if (isLoading) return /*#__PURE__*/React__default.createElement(digitUiReactComponents.Loader, null);
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(digitUiReactComponents.Header, null, t("CS_PAYMENT_BILL_DETAILS")), /*#__PURE__*/React__default.createElement(digitUiReactComponents.Card, null, /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(digitUiReactComponents.KeyNote, {
    keyValue: t(businessService == "PT.MUTATION" ? "PDF_STATIC_LABEL_MUATATION_NUMBER_LABEL" : label),
    note: wrkflow === "WNS" ? stringReplaceAll(consumerCode, "+", "/") : consumerCode
  }), businessService !== "PT.MUTATION" && /*#__PURE__*/React__default.createElement(digitUiReactComponents.KeyNote, {
    keyValue: t("CS_PAYMENT_BILLING_PERIOD"),
    note: getBillingPeriod()
  }), (businessService === null || businessService === void 0 ? void 0 : businessService.includes("PT")) || wrkflow === "WNS" && (billDetails === null || billDetails === void 0 ? void 0 : billDetails.currentBillNo) && /*#__PURE__*/React__default.createElement(digitUiReactComponents.KeyNote, {
    keyValue: t("CS_BILL_NO"),
    note: billDetails === null || billDetails === void 0 ? void 0 : billDetails.currentBillNo
  }), (businessService === null || businessService === void 0 ? void 0 : businessService.includes("PT")) || wrkflow === "WNS" && (billDetails === null || billDetails === void 0 ? void 0 : billDetails.currentExpiryDate) && /*#__PURE__*/React__default.createElement(digitUiReactComponents.KeyNote, {
    keyValue: t("CS_BILL_DUEDATE"),
    note: new Date(billDetails === null || billDetails === void 0 ? void 0 : billDetails.currentExpiryDate).toLocaleDateString()
  }), /*#__PURE__*/React__default.createElement(BillSumary, {
    billAccountDetails: getBillBreakDown(),
    total: getTotal(),
    businessService: businessService,
    arrears: Arrears
  }), /*#__PURE__*/React__default.createElement(ArrearSummary, {
    bill: bill
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "bill-payment-amount"
  }, /*#__PURE__*/React__default.createElement("hr", {
    className: "underline"
  }), /*#__PURE__*/React__default.createElement(digitUiReactComponents.CardSubHeader, null, t("CS_COMMON_PAYMENT_AMOUNT")), /*#__PURE__*/React__default.createElement(digitUiReactComponents.RadioButtons, {
    selectedOption: paymentType,
    onSelect: setPaymentType,
    options: paymentRules.partPaymentAllowed ? [t("CS_PAYMENT_FULL_AMOUNT"), t("CS_PAYMENT_CUSTOM_AMOUNT")] : [t("CS_PAYMENT_FULL_AMOUNT")]
  }), /*#__PURE__*/React__default.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "payment-amount-front",
    style: {
      border: "1px solid " + (paymentType === t("CS_PAYMENT_FULL_AMOUNT") ? "#9a9a9a" : "black")
    }
  }, "\u20B9"), paymentType !== t("CS_PAYMENT_FULL_AMOUNT") ? /*#__PURE__*/React__default.createElement(digitUiReactComponents.TextInput, {
    className: "text-indent-xl",
    onChange: e => onChangeAmount(e.target.value),
    value: amount,
    disable: getTotal() === 0
  }) : /*#__PURE__*/React__default.createElement(digitUiReactComponents.TextInput, {
    className: "text-indent-xl",
    value: getTotal(),
    onChange: () => {},
    disable: true
  }), formError === "CS_CANT_PAY_BELOW_MIN_AMOUNT" ? /*#__PURE__*/React__default.createElement("span", {
    className: "card-label-error"
  }, t(formError), ": ", "₹" + minAmountPayable) : /*#__PURE__*/React__default.createElement("span", {
    className: "card-label-error"
  }, t(formError))), /*#__PURE__*/React__default.createElement(digitUiReactComponents.SubmitBar, {
    disabled: !paymentAllowed || getTotal() == 0,
    onSubmit: onSubmit,
    label: t("CS_COMMON_PROCEED_TO_PAY")
  }))));
};

const BillRoutes = _ref => {
  let {
    billsList,
    paymentRules,
    businessService
  } = _ref;
  const {
    url: currentPath,
    ...match
  } = reactRouterDom.useRouteMatch();
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(digitUiReactComponents.BackButton, null), /*#__PURE__*/React__default.createElement(reactRouterDom.Switch, null, /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
    exact: true,
    path: "" + currentPath,
    component: () => /*#__PURE__*/React__default.createElement(BillList, {
      billsList,
      currentPath,
      paymentRules,
      businessService
    })
  }), /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
    path: currentPath + "/:consumerCode",
    component: () => /*#__PURE__*/React__default.createElement(BillDetails, {
      paymentRules,
      businessService
    })
  })));
};

const MyBills = _ref => {
  var _Digit$UserService$ge, _location$state, _location$state2;
  let {
    stateCode
  } = _ref;
  const {
    businessService
  } = reactRouterDom.useParams();
  const {
    tenantId: _tenantId,
    isDisoconnectFlow
  } = Digit.Hooks.useQueryParams();
  const {
    isLoading: storeLoading,
    data: store
  } = Digit.Services.useStore({
    stateCode,
    moduleCode: businessService,
    language: Digit.StoreData.getCurrentLanguage()
  });
  const history = reactRouterDom.useHistory();
  const {
    url
  } = reactRouterDom.useRouteMatch();
  const location = reactRouterDom.useLocation();
  const {
    tenantId
  } = ((_Digit$UserService$ge = Digit.UserService.getUser()) === null || _Digit$UserService$ge === void 0 ? void 0 : _Digit$UserService$ge.info) || (location === null || location === void 0 ? void 0 : location.state) || {
    tenantId: _tenantId
  } || {};
  if (!tenantId && !(location !== null && location !== void 0 && (_location$state = location.state) !== null && _location$state !== void 0 && _location$state.fromSearchResults)) {
    history.replace("/digit-ui/citizen/login", {
      from: url
    });
  }
  const {
    isLoading,
    data
  } = Digit.Hooks.useFetchCitizenBillsForBuissnessService({
    businessService
  }, {
    refetchOnMount: true,
    enabled: !(location !== null && location !== void 0 && (_location$state2 = location.state) !== null && _location$state2 !== void 0 && _location$state2.fromSearchResults)
  });
  const {
    isLoading: mdmsLoading,
    data: mdmsBillingData
  } = Digit.Hooks.useGetPaymentRulesForBusinessServices(tenantId);
  const billsList = (data === null || data === void 0 ? void 0 : data.Bill) || [];
  const getPaymentRestrictionDetails = () => {
    var _mdmsBillingData$Mdms, _mdmsBillingData$Mdms2, _payRestrictiondetail;
    const payRestrictiondetails = mdmsBillingData === null || mdmsBillingData === void 0 ? void 0 : (_mdmsBillingData$Mdms = mdmsBillingData.MdmsRes) === null || _mdmsBillingData$Mdms === void 0 ? void 0 : (_mdmsBillingData$Mdms2 = _mdmsBillingData$Mdms.BillingService) === null || _mdmsBillingData$Mdms2 === void 0 ? void 0 : _mdmsBillingData$Mdms2.BusinessService;
    let updatedBussinessService = (businessService === "WS" || businessService === "SW") && isDisoconnectFlow === "true" ? "DISCONNECT" : businessService;
    if (payRestrictiondetails !== null && payRestrictiondetails !== void 0 && payRestrictiondetails.length) return ((_payRestrictiondetail = payRestrictiondetails.filter(e => e.code == updatedBussinessService)) === null || _payRestrictiondetail === void 0 ? void 0 : _payRestrictiondetail[0]) || {
      isAdvanceAllowed: false,
      isVoucherCreationEnabled: true,
      minAmountPayable: 100,
      partPaymentAllowed: false
    };else return {};
  };
  const getProps = () => ({
    billsList,
    paymentRules: getPaymentRestrictionDetails(),
    businessService
  });
  if (mdmsLoading) {
    return /*#__PURE__*/React__default.createElement(digitUiReactComponents.Loader, null);
  }
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(BillRoutes, getProps()));
};

const _iteratorSymbol = /*#__PURE__*/typeof Symbol !== "undefined" ? Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator")) : "@@iterator";
const _asyncIteratorSymbol = /*#__PURE__*/typeof Symbol !== "undefined" ? Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator")) : "@@asyncIterator";
function _catch(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }
  if (result && result.then) {
    return result.then(void 0, recover);
  }
  return result;
}

const SelectPaymentType$1 = props => {
  const {
    state = {}
  } = reactRouterDom.useLocation();
  const userInfo = Digit.UserService.getUser();
  const [showToast, setShowToast] = React.useState(null);
  const {
    tenantId: __tenantId,
    authorization,
    workflow: wrkflow,
    consumerCode: connectionNo
  } = Digit.Hooks.useQueryParams();
  const paymentAmount = state === null || state === void 0 ? void 0 : state.paymentAmount;
  const {
    t
  } = reactI18next.useTranslation();
  const history = reactRouterDom.useHistory();
  const {
    pathname,
    search
  } = reactRouterDom.useLocation();
  let {
    consumerCode,
    businessService
  } = reactRouterDom.useParams();
  const tenantId = (state === null || state === void 0 ? void 0 : state.tenantId) || __tenantId || Digit.ULBService.getCurrentTenantId();
  const propertyId = state === null || state === void 0 ? void 0 : state.propertyId;
  const stateTenant = Digit.ULBService.getStateId();
  const {
    control,
    handleSubmit
  } = reactHookForm.useForm();
  const {
    data: menu,
    isLoading
  } = Digit.Hooks.useCommonMDMS(stateTenant, "DIGIT-UI", "PaymentGateway");
  const {
    data: paymentdetails,
    isLoading: paymentLoading
  } = Digit.Hooks.useFetchPayment({
    tenantId: tenantId,
    consumerCode: wrkflow === "WNS" ? connectionNo : consumerCode,
    businessService
  }, {});
  if (window.location.href.includes("ISWSCON") || wrkflow === "WNS") consumerCode = decodeURIComponent(consumerCode);
  if (wrkflow === "WNS") consumerCode = stringReplaceAll(consumerCode, "+", "/");
  React.useEffect(() => {
    if (paymentdetails !== null && paymentdetails !== void 0 && paymentdetails.Bill && paymentdetails.Bill.length == 0) {
      setShowToast({
        key: true,
        label: "CS_BILL_NOT_FOUND"
      });
    }
  }, [paymentdetails]);
  React.useEffect(() => {
    localStorage.setItem("BillPaymentEnabled", "true");
  }, []);
  const {
    name,
    mobileNumber
  } = state;
  const billDetails = paymentdetails !== null && paymentdetails !== void 0 && paymentdetails.Bill ? paymentdetails === null || paymentdetails === void 0 ? void 0 : paymentdetails.Bill[0] : {};
  const onSubmit = function (d) {
    try {
      var _userInfo$info, _userInfo$info2;
      const filterData = {
        Transaction: {
          tenantId: billDetails === null || billDetails === void 0 ? void 0 : billDetails.tenantId,
          txnAmount: paymentAmount || billDetails.totalAmount,
          module: businessService,
          billId: billDetails.id,
          consumerCode: consumerCode,
          productInfo: "Common Payment",
          gateway: (d === null || d === void 0 ? void 0 : d.paymentType) || "AXIS",
          taxAndPayments: [{
            billId: billDetails.id,
            amountPaid: paymentAmount || billDetails.totalAmount
          }],
          user: {
            name: name || (userInfo === null || userInfo === void 0 ? void 0 : (_userInfo$info = userInfo.info) === null || _userInfo$info === void 0 ? void 0 : _userInfo$info.name) || (billDetails === null || billDetails === void 0 ? void 0 : billDetails.payerName),
            mobileNumber: mobileNumber || (userInfo === null || userInfo === void 0 ? void 0 : (_userInfo$info2 = userInfo.info) === null || _userInfo$info2 === void 0 ? void 0 : _userInfo$info2.mobileNumber) || (billDetails === null || billDetails === void 0 ? void 0 : billDetails.mobileNumber),
            tenantId: billDetails === null || billDetails === void 0 ? void 0 : billDetails.tenantId
          },
          callbackUrl: window.location.href.includes("mcollect") || wrkflow === "WNS" ? window.location.protocol + "//" + window.location.host + "/digit-ui/citizen/payment/success/" + businessService + "/" + (wrkflow === "WNS" ? encodeURIComponent(consumerCode) : consumerCode) + "/" + tenantId + "?workflow=" + (wrkflow === "WNS" ? wrkflow : "mcollect") : window.location.protocol + "//" + window.location.host + "/digit-ui/citizen/payment/success/" + businessService + "/" + (wrkflow === "WNS" ? encodeURIComponent(consumerCode) : consumerCode) + "/" + tenantId + "?propertyId=" + propertyId,
          additionalDetails: {
            isWhatsapp: false
          }
        }
      };
      const _temp = _catch(function () {
        return Promise.resolve(Digit.PaymentService.createCitizenReciept(billDetails === null || billDetails === void 0 ? void 0 : billDetails.tenantId, filterData)).then(function (data) {
          var _data$Transaction;
          const redirectUrl = data === null || data === void 0 ? void 0 : (_data$Transaction = data.Transaction) === null || _data$Transaction === void 0 ? void 0 : _data$Transaction.redirectUrl;
          if ((d === null || d === void 0 ? void 0 : d.paymentType) == "AXIS") {
            window.location = redirectUrl;
          } else {
            try {
              var _redirectUrl$split, _redirectUrl$split$sl, _redirectUrl$split$sl2, _redirectUrl$split$sl3, _gatewayParam$request, _redirectUrl$split2, _redirectUrl$split2$, _redirectUrl$split2$$, _redirectUrl$split3, _redirectUrl$split3$, _redirectUrl$split3$$;
              const gatewayParam = redirectUrl === null || redirectUrl === void 0 ? void 0 : (_redirectUrl$split = redirectUrl.split("?")) === null || _redirectUrl$split === void 0 ? void 0 : (_redirectUrl$split$sl = _redirectUrl$split.slice(1)) === null || _redirectUrl$split$sl === void 0 ? void 0 : (_redirectUrl$split$sl2 = _redirectUrl$split$sl.join("?")) === null || _redirectUrl$split$sl2 === void 0 ? void 0 : (_redirectUrl$split$sl3 = _redirectUrl$split$sl2.split("&")) === null || _redirectUrl$split$sl3 === void 0 ? void 0 : _redirectUrl$split$sl3.reduce((curr, acc) => {
                var d = acc.split("=");
                curr[d[0]] = d[1];
                return curr;
              }, {});
              var newForm = $("<form>", {
                action: gatewayParam.txURL,
                method: "POST",
                target: "_top"
              });
              const orderForNDSLPaymentSite = ["checksum", "messageType", "merchantId", "serviceId", "orderId", "customerId", "transactionAmount", "currencyCode", "requestDateTime", "successUrl", "failUrl", "additionalField1", "additionalField2", "additionalField3", "additionalField4", "additionalField5"];
              gatewayParam["requestDateTime"] = (_gatewayParam$request = gatewayParam["requestDateTime"]) === null || _gatewayParam$request === void 0 ? void 0 : _gatewayParam$request.split(new Date().getFullYear()).join(new Date().getFullYear() + " ");
              gatewayParam["successUrl"] = (redirectUrl === null || redirectUrl === void 0 ? void 0 : (_redirectUrl$split2 = redirectUrl.split("successUrl=")) === null || _redirectUrl$split2 === void 0 ? void 0 : (_redirectUrl$split2$ = _redirectUrl$split2[1]) === null || _redirectUrl$split2$ === void 0 ? void 0 : (_redirectUrl$split2$$ = _redirectUrl$split2$.split("eg_pg_txnid=")) === null || _redirectUrl$split2$$ === void 0 ? void 0 : _redirectUrl$split2$$[0]) + 'eg_pg_txnid=' + (gatewayParam === null || gatewayParam === void 0 ? void 0 : gatewayParam.orderId);
              gatewayParam["failUrl"] = (redirectUrl === null || redirectUrl === void 0 ? void 0 : (_redirectUrl$split3 = redirectUrl.split("failUrl=")) === null || _redirectUrl$split3 === void 0 ? void 0 : (_redirectUrl$split3$ = _redirectUrl$split3[1]) === null || _redirectUrl$split3$ === void 0 ? void 0 : (_redirectUrl$split3$$ = _redirectUrl$split3$.split("eg_pg_txnid=")) === null || _redirectUrl$split3$$ === void 0 ? void 0 : _redirectUrl$split3$$[0]) + 'eg_pg_txnid=' + (gatewayParam === null || gatewayParam === void 0 ? void 0 : gatewayParam.orderId);
              for (var key of orderForNDSLPaymentSite) {
                newForm.append($("<input>", {
                  name: key,
                  value: gatewayParam[key]
                }));
              }
              $(document.body).append(newForm);
              newForm.submit();
            } catch (e) {
              console.log("Error in payment redirect ", e);
            }
          }
          window.location = redirectUrl;
        });
      }, function (error) {
        var _error$response, _error$response$data, _error$response$data$;
        let messageToShow = "CS_PAYMENT_UNKNOWN_ERROR_ON_SERVER";
        if ((_error$response = error.response) !== null && _error$response !== void 0 && (_error$response$data = _error$response.data) !== null && _error$response$data !== void 0 && (_error$response$data$ = _error$response$data.Errors) !== null && _error$response$data$ !== void 0 && _error$response$data$[0]) {
          var _error$response2, _error$response2$data, _error$response2$data2;
          const {
            code,
            message
          } = (_error$response2 = error.response) === null || _error$response2 === void 0 ? void 0 : (_error$response2$data = _error$response2.data) === null || _error$response2$data === void 0 ? void 0 : (_error$response2$data2 = _error$response2$data.Errors) === null || _error$response2$data2 === void 0 ? void 0 : _error$response2$data2[0];
          messageToShow = code;
        }
        setShowToast({
          key: true,
          label: t(messageToShow)
        });
      });
      return Promise.resolve(_temp && _temp.then ? _temp.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
  if (authorization === "true" && !userInfo.access_token) {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/digit-ui/citizen/login?from=" + encodeURIComponent(pathname + search);
  }
  if (isLoading || paymentLoading) {
    return /*#__PURE__*/React__default.createElement(digitUiReactComponents.Loader, null);
  }
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(digitUiReactComponents.BackButton, null, t("CS_COMMON_BACK")), /*#__PURE__*/React__default.createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/React__default.createElement(digitUiReactComponents.Header, null, t("PAYMENT_CS_HEADER")), /*#__PURE__*/React__default.createElement(digitUiReactComponents.Card, null, /*#__PURE__*/React__default.createElement("div", {
    className: "payment-amount-info",
    style: {
      marginBottom: "26px"
    }
  }, /*#__PURE__*/React__default.createElement(digitUiReactComponents.CardLabel, {
    className: "dark"
  }, t("PAYMENT_CS_TOTAL_AMOUNT_DUE")), /*#__PURE__*/React__default.createElement(digitUiReactComponents.CardSectionHeader, null, " \u20B9 ", paymentAmount !== undefined ? Number(paymentAmount).toFixed(2) : Number(billDetails === null || billDetails === void 0 ? void 0 : billDetails.totalAmount).toFixed(2))), /*#__PURE__*/React__default.createElement(digitUiReactComponents.CardLabel, null, t("PAYMENT_CS_SELECT_METHOD")), (menu === null || menu === void 0 ? void 0 : menu.length) && /*#__PURE__*/React__default.createElement(reactHookForm.Controller, {
    name: "paymentType",
    defaultValue: menu[0],
    control: control,
    render: props => /*#__PURE__*/React__default.createElement(digitUiReactComponents.RadioButtons, {
      selectedOption: props.value,
      options: menu,
      onSelect: props.onChange
    })
  }), !showToast && /*#__PURE__*/React__default.createElement(digitUiReactComponents.SubmitBar, {
    label: t("PAYMENT_CS_BUTTON_LABEL"),
    submit: true
  }))), /*#__PURE__*/React__default.createElement(digitUiReactComponents.InfoBanner, {
    label: t("CS_COMMON_INFO"),
    text: t("CS_PAYMENT_REDIRECT_NOTICE")
  }), showToast && /*#__PURE__*/React__default.createElement(digitUiReactComponents.Toast, {
    error: showToast.key,
    label: t(showToast.label),
    onClose: () => {
      setShowToast(null);
    }
  }));
};

const SuccessfulPayment = props => {
  if (localStorage.getItem("BillPaymentEnabled") !== "true") {
    window.history.forward();
    return null;
  }
  return /*#__PURE__*/React__default.createElement(WrapPaymentComponent, props);
};
const WrapPaymentComponent = props => {
  var _data$payments, _data$payments$Paymen, _data$payments$Paymen2, _data$payments2, _reciept_data$payment3, _reciept_data$payment4, _reciept_data$payment5, _reciept_data$payment6, _reciept_data$payment7, _reciept_data$payment8, _reciept_data$payment9, _reciept_data$payment10, _reciept_data$payment11, _reciept_data$payment12, _reciept_data$payment13, _reciept_data$payment14, _reciept_data$payment15, _reciept_data$payment16, _bpaData$5, _bpaData$6, _bpaData$7, _bpaData$8, _bpaData$9, _bpaData$10, _bpaData$11, _bpaData$12, _bpaData$13, _business_service$spl;
  const {
    t
  } = reactI18next.useTranslation();
  const queryClient = reactQuery.useQueryClient();
  const {
    eg_pg_txnid: egId,
    workflow: workflw,
    propertyId
  } = Digit.Hooks.useQueryParams();
  const [printing, setPrinting] = React.useState(false);
  const [allowFetchBill, setallowFetchBill] = React.useState(false);
  const {
    businessService: business_service,
    consumerCode,
    tenantId
  } = reactRouterDom.useParams();
  const {
    data: bpaData = {},
    isLoading: isBpaSearchLoading,
    isSuccess: isBpaSuccess,
    error: bpaerror
  } = Digit.Hooks.obps.useOBPSSearch("", {}, tenantId, {
    applicationNo: consumerCode
  }, {}, {
    enabled: window.location.href.includes("bpa") || window.location.href.includes("BPA")
  });
  const {
    isLoading,
    data,
    isError
  } = Digit.Hooks.usePaymentUpdate({
    egId
  }, business_service, {
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false
  });
  const {
    label
  } = Digit.Hooks.useApplicationsForBusinessServiceSearch({
    businessService: business_service
  }, {
    enabled: false
  });
  const {
    data: reciept_data,
    isLoading: recieptDataLoading
  } = Digit.Hooks.useRecieptSearch({
    tenantId,
    businessService: business_service,
    receiptNumbers: data === null || data === void 0 ? void 0 : (_data$payments = data.payments) === null || _data$payments === void 0 ? void 0 : (_data$payments$Paymen = _data$payments.Payments) === null || _data$payments$Paymen === void 0 ? void 0 : (_data$payments$Paymen2 = _data$payments$Paymen[0]) === null || _data$payments$Paymen2 === void 0 ? void 0 : _data$payments$Paymen2.paymentDetails[0].receiptNumber
  }, {
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    select: dat => {
      return dat.Payments[0];
    },
    enabled: allowFetchBill
  });
  const {
    data: generatePdfKey
  } = Digit.Hooks.useCommonMDMS(tenantId, "common-masters", "ReceiptKey", {
    select: data => {
      var _data$commonMasters, _data$commonMasters$u, _data$commonMasters$u2;
      return ((_data$commonMasters = data["common-masters"]) === null || _data$commonMasters === void 0 ? void 0 : (_data$commonMasters$u = _data$commonMasters.uiCommonPay) === null || _data$commonMasters$u === void 0 ? void 0 : (_data$commonMasters$u2 = _data$commonMasters$u.filter(_ref => {
        let {
          code
        } = _ref;
        return business_service === null || business_service === void 0 ? void 0 : business_service.includes(code);
      })[0]) === null || _data$commonMasters$u2 === void 0 ? void 0 : _data$commonMasters$u2.receiptKey) || "consolidatedreceipt";
    },
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false
  });
  const payments = data === null || data === void 0 ? void 0 : data.payments;
  React.useEffect(() => {
    return () => {
      localStorage.setItem("BillPaymentEnabled", "false");
      queryClient.clear();
    };
  }, []);
  React.useEffect(() => {
    if (data && data.txnStatus && data.txnStatus !== "FAILURE") {
      setallowFetchBill(true);
    }
  }, [data]);
  if (isLoading || recieptDataLoading) {
    return /*#__PURE__*/React__default.createElement(digitUiReactComponents.Loader, null);
  }
  const applicationNo = data === null || data === void 0 ? void 0 : data.applicationNo;
  const isMobile = window.Digit.Utils.browser.isMobile();
  if (isError || !payments || !payments.Payments || payments.Payments.length === 0 || data.txnStatus === "FAILURE") {
    return /*#__PURE__*/React__default.createElement(digitUiReactComponents.Card, null, /*#__PURE__*/React__default.createElement(digitUiReactComponents.Banner, {
      message: t("CITIZEN_FAILURE_COMMON_PAYMENT_MESSAGE"),
      info: t("CS_PAYMENT_TRANSANCTION_ID"),
      applicationNumber: egId,
      successful: false
    }), /*#__PURE__*/React__default.createElement(digitUiReactComponents.CardText, null, t("CS_PAYMENT_FAILURE_MESSAGE")), !(business_service !== null && business_service !== void 0 && business_service.includes("PT")) ? /*#__PURE__*/React__default.createElement(reactRouterDom.Link, {
      to: "/digit-ui/citizen"
    }, /*#__PURE__*/React__default.createElement(digitUiReactComponents.SubmitBar, {
      label: t("CORE_COMMON_GO_TO_HOME")
    })) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(reactRouterDom.Link, {
      to: applicationNo && "/digit-ui/citizen/payment/my-bills/" + business_service + "/" + applicationNo || "/digit-ui/citizen"
    }, /*#__PURE__*/React__default.createElement(digitUiReactComponents.SubmitBar, {
      label: t("CS_PAYMENT_TRY_AGAIN")
    })), /*#__PURE__*/React__default.createElement("div", {
      className: "link",
      style: isMobile ? {
        marginTop: "8px",
        width: "100%",
        textAlign: "center"
      } : {
        marginTop: "8px"
      }
    }, /*#__PURE__*/React__default.createElement(reactRouterDom.Link, {
      to: "/digit-ui/citizen"
    }, t("CORE_COMMON_GO_TO_HOME")))));
  }
  const paymentData = data === null || data === void 0 ? void 0 : (_data$payments2 = data.payments) === null || _data$payments2 === void 0 ? void 0 : _data$payments2.Payments[0];
  const transactionDate = paymentData === null || paymentData === void 0 ? void 0 : paymentData.transactionDate;
  const printCertificate = function () {
    try {
      const state = tenantId;
      return Promise.resolve(Digit.TLService.search({
        applicationNumber: consumerCode,
        tenantId
      })).then(function (applicationDetails) {
        const generatePdfKeyForTL = "tlcertificate";
        const _temp = function () {
          if (applicationDetails) {
            return Promise.resolve(Digit.PaymentService.generatePdf(state, {
              Licenses: applicationDetails === null || applicationDetails === void 0 ? void 0 : applicationDetails.Licenses
            }, generatePdfKeyForTL)).then(function (response) {
              return Promise.resolve(Digit.PaymentService.printReciept(state, {
                fileStoreIds: response.filestoreIds[0]
              })).then(function (fileStore) {
                window.open(fileStore[response.filestoreIds[0]], "_blank");
              });
            });
          }
        }();
        if (_temp && _temp.then) return _temp.then(function () {});
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  const printReciept = function () {
    try {
      var _payments$Payments$;
      function _temp3() {
        return Promise.resolve(Digit.PaymentService.printReciept(state, {
          fileStoreIds: response.filestoreIds[0]
        })).then(function (fileStore) {
          if (fileStore && fileStore[response.filestoreIds[0]]) {
            window.open(fileStore[response.filestoreIds[0]], "_blank");
          }
          setPrinting(false);
        });
      }
      if (printing) return Promise.resolve();
      setPrinting(true);
      const tenantId = paymentData === null || paymentData === void 0 ? void 0 : paymentData.tenantId;
      const state = Digit.ULBService.getStateId();
      let response = {
        filestoreIds: [(_payments$Payments$ = payments.Payments[0]) === null || _payments$Payments$ === void 0 ? void 0 : _payments$Payments$.fileStoreId]
      };
      const _temp2 = function () {
        if (!(paymentData !== null && paymentData !== void 0 && paymentData.fileStoreId)) {
          return Promise.resolve(Digit.PaymentService.generatePdf(state, {
            Payments: [payments.Payments[0]]
          }, generatePdfKey)).then(function (_Digit$PaymentService) {
            response = _Digit$PaymentService;
          });
        }
      }();
      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(_temp3) : _temp3(_temp2));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  const convertDateToEpoch = function (dateString, dayStartOrEnd) {
    if (dayStartOrEnd === void 0) {
      dayStartOrEnd = "dayend";
    }
    try {
      const parts = dateString.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
      const DateObj = new Date(Date.UTC(parts[1], parts[2] - 1, parts[3]));
      DateObj.setMinutes(DateObj.getMinutes() + DateObj.getTimezoneOffset());
      if (dayStartOrEnd === "dayend") {
        DateObj.setHours(DateObj.getHours() + 24);
        DateObj.setSeconds(DateObj.getSeconds() - 1);
      }
      return DateObj.getTime();
    } catch (e) {
      return dateString;
    }
  };
  const printPdf = blob => {
    const fileURL = URL.createObjectURL(blob);
    var myWindow = window.open(fileURL);
    if (myWindow != undefined) {
      myWindow.addEventListener("load", event => {
        myWindow.focus();
        myWindow.print();
      });
    }
  };
  const downloadPdf = (blob, fileName) => {
    if (window.mSewaApp && window.mSewaApp.isMsewaApp() && window.mSewaApp.downloadBase64File) {
      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        var base64data = reader.result;
        mSewaApp.downloadBase64File(base64data, fileName);
      };
    } else {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(link.href), 7000);
    }
  };
  const getPermitOccupancyOrderSearch = function (order, mode) {
    if (mode === void 0) {
      mode = "download";
    }
    try {
      var _bpaData$, _bpaData$2;
      let queryObj = {
        applicationNo: bpaData === null || bpaData === void 0 ? void 0 : (_bpaData$ = bpaData[0]) === null || _bpaData$ === void 0 ? void 0 : _bpaData$.applicationNo
      };
      return Promise.resolve(Digit.OBPSService.BPASearch(bpaData === null || bpaData === void 0 ? void 0 : (_bpaData$2 = bpaData[0]) === null || _bpaData$2 === void 0 ? void 0 : _bpaData$2.tenantId, queryObj)).then(function (bpaResponse) {
        var _bpaData$3, _bpaData$4;
        return Promise.resolve(Digit.OBPSService.scrutinyDetails(bpaData === null || bpaData === void 0 ? void 0 : (_bpaData$3 = bpaData[0]) === null || _bpaData$3 === void 0 ? void 0 : _bpaData$3.tenantId, {
          edcrNumber: bpaData === null || bpaData === void 0 ? void 0 : (_bpaData$4 = bpaData[0]) === null || _bpaData$4 === void 0 ? void 0 : _bpaData$4.edcrNumber
        })).then(function (edcrResponse) {
          var _bpaResponse$BPA, _edcrResponse$edcrDet;
          let bpaDataDetails = bpaResponse === null || bpaResponse === void 0 ? void 0 : (_bpaResponse$BPA = bpaResponse.BPA) === null || _bpaResponse$BPA === void 0 ? void 0 : _bpaResponse$BPA[0],
            edcrData = edcrResponse === null || edcrResponse === void 0 ? void 0 : (_edcrResponse$edcrDet = edcrResponse.edcrDetail) === null || _edcrResponse$edcrDet === void 0 ? void 0 : _edcrResponse$edcrDet[0];
          let currentDate = new Date();
          bpaDataDetails.additionalDetails.runDate = convertDateToEpoch(currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate());
          let reqData = {
            ...bpaDataDetails,
            edcrDetail: [{
              ...edcrData
            }]
          };
          return Promise.resolve(Digit.PaymentService.generatePdf(bpaDataDetails === null || bpaDataDetails === void 0 ? void 0 : bpaDataDetails.tenantId, {
            Bpa: [reqData]
          }, order)).then(function (response) {
            return Promise.resolve(Digit.PaymentService.printReciept(bpaDataDetails === null || bpaDataDetails === void 0 ? void 0 : bpaDataDetails.tenantId, {
              fileStoreIds: response.filestoreIds[0]
            })).then(function (fileStore) {
              var _bpaDataDetails$addit;
              window.open(fileStore[response === null || response === void 0 ? void 0 : response.filestoreIds[0]], "_blank");
              reqData["applicationType"] = bpaDataDetails === null || bpaDataDetails === void 0 ? void 0 : (_bpaDataDetails$addit = bpaDataDetails.additionalDetails) === null || _bpaDataDetails$addit === void 0 ? void 0 : _bpaDataDetails$addit.applicationType;
              return Promise.resolve(Digit.OBPSService.edcr_report_download({
                BPA: {
                  ...reqData
                }
              })).then(function (edcrresponse) {
                const responseStatus = parseInt(edcrresponse.status, 10);
                if (responseStatus === 201 || responseStatus === 200) {
                  mode == "print" ? printPdf(new Blob([edcrresponse.data], {
                    type: "application/pdf"
                  })) : downloadPdf(new Blob([edcrresponse.data], {
                    type: "application/pdf"
                  }), "edcrReport.pdf");
                }
              });
            });
          });
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  const getBillingPeriod = billDetails => {
    const {
      taxPeriodFrom,
      taxPeriodTo,
      fromPeriod,
      toPeriod
    } = billDetails || {};
    if (taxPeriodFrom && taxPeriodTo) {
      let from = new Date(taxPeriodFrom).getFullYear().toString();
      let to = new Date(taxPeriodTo).getFullYear().toString();
      return "FY " + from + "-" + to;
    } else if (fromPeriod && toPeriod) {
      if (workflw === "mcollect") {
        let from = new Date(fromPeriod).getDate().toString() + " " + Digit.Utils.date.monthNames[new Date(fromPeriod).getMonth()].toString() + " " + new Date(fromPeriod).getFullYear().toString();
        let to = new Date(toPeriod).getDate() + " " + Digit.Utils.date.monthNames[new Date(toPeriod).getMonth()] + " " + new Date(toPeriod).getFullYear();
        return from + " - " + to;
      } else if (workflw === "WNS") {
        let from = new Date(fromPeriod).getDate().toString() + "/" + (new Date(fromPeriod).getMonth() + 1).toString() + "/" + new Date(fromPeriod).getFullYear().toString();
        let to = new Date(toPeriod).getDate() + "/" + (new Date(toPeriod).getMonth() + 1) + "/" + new Date(toPeriod).getFullYear();
        return from + " - " + to;
      }
      let from = new Date(fromPeriod).getFullYear().toString();
      let to = new Date(toPeriod).getFullYear().toString();
      return "FY " + from + "-" + to;
    } else return "N/A";
  };
  let bannerText;
  if (workflw) {
    bannerText = "CITIZEN_SUCCESS_UC_PAYMENT_MESSAGE";
  } else {
    var _paymentData$paymentD, _paymentData$paymentD2, _paymentData$paymentD3, _paymentData$paymentD4, _paymentData$paymentD5;
    if (paymentData !== null && paymentData !== void 0 && (_paymentData$paymentD = paymentData.paymentDetails) !== null && _paymentData$paymentD !== void 0 && (_paymentData$paymentD2 = _paymentData$paymentD[0]) !== null && _paymentData$paymentD2 !== void 0 && _paymentData$paymentD2.businessService && paymentData !== null && paymentData !== void 0 && (_paymentData$paymentD3 = paymentData.paymentDetails) !== null && _paymentData$paymentD3 !== void 0 && (_paymentData$paymentD4 = _paymentData$paymentD3[0]) !== null && _paymentData$paymentD4 !== void 0 && (_paymentData$paymentD5 = _paymentData$paymentD4.businessService) !== null && _paymentData$paymentD5 !== void 0 && _paymentData$paymentD5.includes("BPA")) {
      var _paymentData$paymentD6;
      let nameOfAchitect = sessionStorage.getItem("BPA_ARCHITECT_NAME");
      let parsedArchitectName = nameOfAchitect ? JSON.parse(nameOfAchitect) : "ARCHITECT";
      bannerText = "CITIZEN_SUCCESS_" + (paymentData === null || paymentData === void 0 ? void 0 : (_paymentData$paymentD6 = paymentData.paymentDetails[0]) === null || _paymentData$paymentD6 === void 0 ? void 0 : _paymentData$paymentD6.businessService.replace(/\./g, "_")) + "_" + parsedArchitectName + "_PAYMENT_MESSAGE";
    } else if (business_service !== null && business_service !== void 0 && business_service.includes("WS") || business_service !== null && business_service !== void 0 && business_service.includes("SW")) {
      bannerText = t("CITIZEN_SUCCESS_" + (paymentData === null || paymentData === void 0 ? void 0 : paymentData.paymentDetails[0].businessService.replace(/\./g, "_")) + "_WS_PAYMENT_MESSAGE");
    } else {
      var _paymentData$paymentD7, _paymentData$paymentD8;
      bannerText = paymentData !== null && paymentData !== void 0 && (_paymentData$paymentD7 = paymentData.paymentDetails[0]) !== null && _paymentData$paymentD7 !== void 0 && _paymentData$paymentD7.businessService ? "CITIZEN_SUCCESS_" + (paymentData === null || paymentData === void 0 ? void 0 : (_paymentData$paymentD8 = paymentData.paymentDetails[0]) === null || _paymentData$paymentD8 === void 0 ? void 0 : _paymentData$paymentD8.businessService.replace(/\./g, "_")) + "_PAYMENT_MESSAGE" : t("CITIZEN_SUCCESS_UC_PAYMENT_MESSAGE");
    }
  }
  const rowContainerStyle = {
    padding: "4px 0px",
    justifyContent: "space-between"
  };
  const ommitRupeeSymbol = ["PT"].includes(business_service);
  if ((window.location.href.includes("bpa") || window.location.href.includes("BPA")) && isBpaSearchLoading) return /*#__PURE__*/React__default.createElement(digitUiReactComponents.Loader, null);
  return /*#__PURE__*/React__default.createElement(digitUiReactComponents.Card, null, /*#__PURE__*/React__default.createElement(digitUiReactComponents.Banner, {
    svg: /*#__PURE__*/React__default.createElement("svg", {
      className: "payment-svg",
      xmlns: "http://www.w3.org/2000/svg",
      width: "40",
      height: "40",
      viewBox: "0 0 40 40",
      fill: "none"
    }, /*#__PURE__*/React__default.createElement("path", {
      d: "M20 0C8.96 0 0 8.96 0 20C0 31.04 8.96 40 20 40C31.04 40 40 31.04 40 20C40 8.96 31.04 0 20 0ZM16 30L6 20L8.82 17.18L16 24.34L31.18 9.16L34 12L16 30Z",
      fill: "white"
    })),
    message: t("CS_COMMON_PAYMENT_COMPLETE"),
    info: t("CS_COMMON_RECIEPT_NO"),
    applicationNumber: paymentData === null || paymentData === void 0 ? void 0 : paymentData.paymentDetails[0].receiptNumber,
    successful: true
  }), /*#__PURE__*/React__default.createElement(digitUiReactComponents.CardText, null, t(bannerText + "_DETAIL")), /*#__PURE__*/React__default.createElement(digitUiReactComponents.StatusTable, null, /*#__PURE__*/React__default.createElement(digitUiReactComponents.Row, {
    rowContainerStyle: rowContainerStyle,
    last: true,
    label: t(label),
    text: applicationNo
  }), (business_service === "PT" || workflw) && /*#__PURE__*/React__default.createElement(digitUiReactComponents.Row, {
    rowContainerStyle: rowContainerStyle,
    last: true,
    label: t("CS_PAYMENT_BILLING_PERIOD"),
    text: getBillingPeriod(reciept_data === null || reciept_data === void 0 ? void 0 : (_reciept_data$payment3 = reciept_data.paymentDetails[0]) === null || _reciept_data$payment3 === void 0 ? void 0 : (_reciept_data$payment4 = _reciept_data$payment3.bill) === null || _reciept_data$payment4 === void 0 ? void 0 : _reciept_data$payment4.billDetails[0])
  }), (business_service === "PT" || workflw) && /*#__PURE__*/React__default.createElement(digitUiReactComponents.Row, {
    rowContainerStyle: rowContainerStyle,
    last: true,
    label: t("CS_PAYMENT_AMOUNT_PENDING"),
    text: reciept_data !== null && reciept_data !== void 0 && (_reciept_data$payment5 = reciept_data.paymentDetails) !== null && _reciept_data$payment5 !== void 0 && (_reciept_data$payment6 = _reciept_data$payment5[0]) !== null && _reciept_data$payment6 !== void 0 && _reciept_data$payment6.totalDue && reciept_data !== null && reciept_data !== void 0 && (_reciept_data$payment7 = reciept_data.paymentDetails) !== null && _reciept_data$payment7 !== void 0 && (_reciept_data$payment8 = _reciept_data$payment7[0]) !== null && _reciept_data$payment8 !== void 0 && _reciept_data$payment8.totalAmountPaid ? "\u20B9 " + ((reciept_data === null || reciept_data === void 0 ? void 0 : (_reciept_data$payment9 = reciept_data.paymentDetails) === null || _reciept_data$payment9 === void 0 ? void 0 : (_reciept_data$payment10 = _reciept_data$payment9[0]) === null || _reciept_data$payment10 === void 0 ? void 0 : _reciept_data$payment10.totalDue) - (reciept_data === null || reciept_data === void 0 ? void 0 : (_reciept_data$payment11 = reciept_data.paymentDetails) === null || _reciept_data$payment11 === void 0 ? void 0 : (_reciept_data$payment12 = _reciept_data$payment11[0]) === null || _reciept_data$payment12 === void 0 ? void 0 : _reciept_data$payment12.totalAmountPaid)) : "\u20B9 " + 0
  }), /*#__PURE__*/React__default.createElement(digitUiReactComponents.Row, {
    rowContainerStyle: rowContainerStyle,
    last: true,
    label: t("CS_PAYMENT_TRANSANCTION_ID"),
    text: egId
  }), /*#__PURE__*/React__default.createElement(digitUiReactComponents.Row, {
    rowContainerStyle: rowContainerStyle,
    last: true,
    label: t(ommitRupeeSymbol ? "CS_PAYMENT_AMOUNT_PAID_WITHOUT_SYMBOL" : "CS_PAYMENT_AMOUNT_PAID"),
    text: reciept_data !== null && reciept_data !== void 0 && (_reciept_data$payment13 = reciept_data.paymentDetails) !== null && _reciept_data$payment13 !== void 0 && (_reciept_data$payment14 = _reciept_data$payment13[0]) !== null && _reciept_data$payment14 !== void 0 && _reciept_data$payment14.totalAmountPaid ? "₹ " + (reciept_data === null || reciept_data === void 0 ? void 0 : (_reciept_data$payment15 = reciept_data.paymentDetails) === null || _reciept_data$payment15 === void 0 ? void 0 : (_reciept_data$payment16 = _reciept_data$payment15[0]) === null || _reciept_data$payment16 === void 0 ? void 0 : _reciept_data$payment16.totalAmountPaid) : "\u20B9 0"
  }), (business_service !== "PT" || workflw) && /*#__PURE__*/React__default.createElement(digitUiReactComponents.Row, {
    rowContainerStyle: rowContainerStyle,
    last: true,
    label: t("CS_PAYMENT_TRANSANCTION_DATE"),
    text: transactionDate && new Date(transactionDate).toLocaleDateString("in")
  })), /*#__PURE__*/React__default.createElement("div", {
    style: {
      display: "flex"
    }
  }, business_service == "TL" ? /*#__PURE__*/React__default.createElement("div", {
    className: "primary-label-btn d-grid",
    style: {
      marginLeft: "unset",
      marginRight: "20px",
      marginTop: "15px",
      marginBottom: "15px"
    },
    onClick: printReciept
  }, /*#__PURE__*/React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    height: "24px",
    viewBox: "0 0 24 24",
    width: "24px",
    fill: "#a82227"
  }, /*#__PURE__*/React__default.createElement("path", {
    d: "M0 0h24v24H0V0z",
    fill: "none"
  }), /*#__PURE__*/React__default.createElement("path", {
    d: "M19 9h-4V3H9v6H5l7 7 7-7zm-8 2V5h2v6h1.17L12 13.17 9.83 11H11zm-6 7h14v2H5z"
  })), t("TL_RECEIPT")) : null, business_service == "TL" ? /*#__PURE__*/React__default.createElement("div", {
    className: "primary-label-btn d-grid",
    style: {
      marginLeft: "unset",
      marginTop: "15px"
    },
    onClick: printCertificate
  }, /*#__PURE__*/React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    height: "24px",
    viewBox: "0 0 24 24",
    width: "24px",
    fill: "#a82227"
  }, /*#__PURE__*/React__default.createElement("path", {
    d: "M0 0h24v24H0V0z",
    fill: "none"
  }), /*#__PURE__*/React__default.createElement("path", {
    d: "M19 9h-4V3H9v6H5l7 7 7-7zm-8 2V5h2v6h1.17L12 13.17 9.83 11H11zm-6 7h14v2H5z"
  })), t("TL_CERTIFICATE")) : null, (bpaData === null || bpaData === void 0 ? void 0 : (_bpaData$5 = bpaData[0]) === null || _bpaData$5 === void 0 ? void 0 : _bpaData$5.businessService) === "BPA_OC" && ((bpaData === null || bpaData === void 0 ? void 0 : (_bpaData$6 = bpaData[0]) === null || _bpaData$6 === void 0 ? void 0 : _bpaData$6.status) === "APPROVED" || (bpaData === null || bpaData === void 0 ? void 0 : (_bpaData$7 = bpaData[0]) === null || _bpaData$7 === void 0 ? void 0 : _bpaData$7.status) === "PENDING_SANC_FEE_PAYMENT") ? /*#__PURE__*/React__default.createElement("div", {
    className: "primary-label-btn d-grid",
    style: {
      marginLeft: "unset"
    },
    onClick: e => getPermitOccupancyOrderSearch("occupancy-certificate")
  }, /*#__PURE__*/React__default.createElement(digitUiReactComponents.DownloadPrefixIcon, null), t("BPA_OC_CERTIFICATE")) : null, (bpaData === null || bpaData === void 0 ? void 0 : (_bpaData$8 = bpaData[0]) === null || _bpaData$8 === void 0 ? void 0 : _bpaData$8.businessService) === "BPA_LOW" ? /*#__PURE__*/React__default.createElement("div", {
    className: "primary-label-btn d-grid",
    style: {
      marginLeft: "unset"
    },
    onClick: r => getPermitOccupancyOrderSearch("buildingpermit-low")
  }, /*#__PURE__*/React__default.createElement(digitUiReactComponents.DownloadPrefixIcon, null), t("BPA_PERMIT_ORDER")) : null, (bpaData === null || bpaData === void 0 ? void 0 : (_bpaData$9 = bpaData[0]) === null || _bpaData$9 === void 0 ? void 0 : _bpaData$9.businessService) === "BPA" && (bpaData === null || bpaData === void 0 ? void 0 : (_bpaData$10 = bpaData[0]) === null || _bpaData$10 === void 0 ? void 0 : _bpaData$10.businessService) !== "BPA_LOW" && (bpaData === null || bpaData === void 0 ? void 0 : (_bpaData$11 = bpaData[0]) === null || _bpaData$11 === void 0 ? void 0 : _bpaData$11.businessService) !== "BPA_OC" && ((bpaData === null || bpaData === void 0 ? void 0 : (_bpaData$12 = bpaData[0]) === null || _bpaData$12 === void 0 ? void 0 : _bpaData$12.status) === "PENDING_SANC_FEE_PAYMENT" || (bpaData === null || bpaData === void 0 ? void 0 : (_bpaData$13 = bpaData[0]) === null || _bpaData$13 === void 0 ? void 0 : _bpaData$13.status) === "APPROVED") ? /*#__PURE__*/React__default.createElement("div", {
    className: "primary-label-btn d-grid",
    style: {
      marginLeft: "unset"
    },
    onClick: r => getPermitOccupancyOrderSearch("buildingpermit")
  }, /*#__PURE__*/React__default.createElement(digitUiReactComponents.DownloadPrefixIcon, null), t("BPA_PERMIT_ORDER")) : null), (business_service === null || business_service === void 0 ? void 0 : business_service.includes("PT")) && /*#__PURE__*/React__default.createElement("div", {
    style: {
      marginTop: "10px"
    }
  }, /*#__PURE__*/React__default.createElement(reactRouterDom.Link, {
    to: "/digit-ui/citizen/feedback?redirectedFrom=" + "digit-ui/citizen/payment/success" + "&propertyId=" + (consumerCode ? consumerCode : "") + "&acknowldgementNumber=" + (egId ? egId : "") + "&tenantId=" + tenantId + "&creationReason=" + (business_service === null || business_service === void 0 ? void 0 : (_business_service$spl = business_service.split(".")) === null || _business_service$spl === void 0 ? void 0 : _business_service$spl[1])
  }, /*#__PURE__*/React__default.createElement(digitUiReactComponents.SubmitBar, {
    label: t("CS_REVIEW_AND_FEEDBACK")
  }))), business_service !== null && business_service !== void 0 && business_service.includes("PT") ? /*#__PURE__*/React__default.createElement("div", {
    className: "link",
    style: isMobile ? {
      marginTop: "8px",
      width: "100%",
      textAlign: "center"
    } : {
      marginTop: "8px"
    },
    onClick: printReciept
  }, t("CS_DOWNLOAD_RECEIPT")) : null, !(business_service == "TL") || !(business_service !== null && business_service !== void 0 && business_service.includes("PT")) && /*#__PURE__*/React__default.createElement(digitUiReactComponents.SubmitBar, {
    onSubmit: printReciept,
    label: t("COMMON_DOWNLOAD_RECEIPT")
  }), !(business_service == "TL") || !(business_service !== null && business_service !== void 0 && business_service.includes("PT")) && /*#__PURE__*/React__default.createElement("div", {
    className: "link",
    style: isMobile ? {
      marginTop: "8px",
      width: "100%",
      textAlign: "center"
    } : {
      marginTop: "8px"
    }
  }, /*#__PURE__*/React__default.createElement(reactRouterDom.Link, {
    to: "/digit-ui/citizen"
  }, t("CORE_COMMON_GO_TO_HOME"))), business_service == "TL" && /*#__PURE__*/React__default.createElement(reactRouterDom.Link, {
    to: "/digit-ui/citizen"
  }, /*#__PURE__*/React__default.createElement(digitUiReactComponents.SubmitBar, {
    label: t("CORE_COMMON_GO_TO_HOME")
  })));
};
const FailedPayment = props => {
  const {
    t
  } = reactI18next.useTranslation();
  const {
    consumerCode
  } = reactRouterDom.useParams();
  const getMessage = () => "Failure !";
  return /*#__PURE__*/React__default.createElement(digitUiReactComponents.Card, null, /*#__PURE__*/React__default.createElement(digitUiReactComponents.Banner, {
    message: getMessage(),
    complaintNumber: consumerCode,
    successful: false
  }), /*#__PURE__*/React__default.createElement(digitUiReactComponents.CardText, null, t("ES_COMMON_TRACK_COMPLAINT_TEXT")));
};

const CitizenPayment = _ref => {
  let {
    stateCode,
    cityCode,
    moduleCode
  } = _ref;
  const {
    path: currentPath
  } = reactRouterDom.useRouteMatch();
  const commonProps = {
    stateCode,
    cityCode,
    moduleCode
  };
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: "bills-citizen-wrapper"
  }, /*#__PURE__*/React__default.createElement(reactRouterDom.Switch, null, /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
    path: currentPath + "/my-bills/:businessService"
  }, /*#__PURE__*/React__default.createElement(MyBills, {
    stateCode: stateCode
  })), /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
    path: currentPath + "/billDetails/:businessService/:consumerCode/:paymentAmt"
  }, /*#__PURE__*/React__default.createElement(SelectPaymentType, _extends({}, commonProps, {
    stateCode: stateCode,
    basePath: currentPath
  }))), /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
    path: currentPath + "/collect/:businessService/:consumerCode"
  }, /*#__PURE__*/React__default.createElement(SelectPaymentType$1, _extends({}, commonProps, {
    stateCode: stateCode,
    basePath: currentPath
  }))), /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
    path: currentPath + "/success/:businessService/:consumerCode/:tenantId"
  }, /*#__PURE__*/React__default.createElement(SuccessfulPayment, commonProps)), /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
    path: currentPath + "/failure"
  }, /*#__PURE__*/React__default.createElement(FailedPayment, commonProps)))));
};

const getKeyNotesConfig = (businessService, t) => {
  const businessId = businessService === null || businessService === void 0 ? void 0 : businessService.toLowerCase().split(".")[0];
  switch (businessId) {
    case "pt":
      return {
        "my-bill": [{
          keyValue: "CS_COMMON_AMOUNT_DUE",
          keyPath: [d => {
            var _d$billDetails$;
            const overdueBy = new Date().getTime() - new Date((_d$billDetails$ = d.billDetails[0]) === null || _d$billDetails$ === void 0 ? void 0 : _d$billDetails$.toPeriod).getTime();
            const days = Math.floor(overdueBy / (86400 * 1000));
            return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, "₹" + d["totalAmount"], days >= 0 ? /*#__PURE__*/React__default.createElement("span", {
              className: "card-label-error",
              style: {
                fontSize: "16px",
                fontWeight: "normal"
              }
            }, " ( " + t("CS_PAYMENT_OVERDUE") + " " + days + " " + t(days === 1 ? "CS_COMMON_DAY" : "CS_COMMON_DAYS") + ")") : null);
          }],
          fallback: "N/A",
          noteStyle: {
            fontWeight: "bold",
            fontSize: "24px",
            paddingTop: "5px"
          }
        }, {
          keyValue: "PT_PROPERTY_ID",
          keyPath: ["propertyId"],
          fallback: ""
        }, {
          keyValue: "CS_OWNER_NAME",
          keyPath: ["owners", 0, "name"],
          fallback: "ES_TITLE_FSM"
        }, {
          keyValue: "PT_PROPERTY_ADDRESS",
          keyPath: ["address", "locality", "name"],
          fallback: "CS_APPLICATION_TYPE_DESLUDGING"
        }, {
          keyValue: "CS_PAYMENT_BILLING_PERIOD",
          keyPath: ["billDetails", d => {
            const {
              fromPeriod,
              toPeriod
            } = d[0];
            if (fromPeriod && toPeriod) {
              let from = new Date(fromPeriod).getFullYear().toString();
              let to = new Date(toPeriod).getFullYear().toString();
              return "FY " + from + "-" + to;
            } else return "N/A";
          }],
          fallback: "N/A"
        }, {
          keyValue: "PT_DUE_DATE",
          keyPath: ["billDetails", d => {
            var _d$, _d$2;
            if (!((_d$ = d[0]) !== null && _d$ !== void 0 && _d$.toPeriod)) return "N/A";
            const date = new Date((_d$2 = d[0]) === null || _d$2 === void 0 ? void 0 : _d$2.toPeriod);
            const month = Digit.Utils.date.monthNames[date.getMonth()];
            return date.getDate() + " " + month + " " + date.getFullYear();
          }],
          fallback: "N/A"
        }],
        response: []
      };
    case "fsm":
      return {
        "my-bill": [{
          keyValue: "CS_COMMON_AMOUNT_DUE",
          keyPath: ["totalAmount", d => d.toFixed(2), d => "₹" + d],
          fallback: "N/A",
          noteStyle: {
            fontWeight: "bold",
            fontSize: "24px",
            paddingTop: "5px"
          }
        }],
        response: []
      };
  }
};

const useCashPaymentDetails = (props, t) => {
  const config = [{
    head: t("NOC_PAYMENT_RCPT_DETAILS"),
    headId: "paymentInfo",
    body: [{
      withoutLabel: true,
      type: "custom",
      populators: {
        name: "ManualRecieptDetails",
        customProps: {},
        defaultValue: {
          manualReceiptNumber: "",
          manualReceiptDate: ""
        },
        component: (props, customProps) => /*#__PURE__*/React__default.createElement(CashDetailsComponent, _extends({}, customProps, {
          onChange: props.onChange,
          value: props.value
        }))
      }
    }]
  }];
  return {
    cashConfig: config
  };
};
const CashDetailsComponent = _ref => {
  var _props$value, _props$value2;
  let {
    ...props
  } = _ref;
  const {
    t
  } = reactI18next.useTranslation();
  const [manualReceiptDate, setManualReceiptDate] = React.useState(props === null || props === void 0 ? void 0 : (_props$value = props.value) === null || _props$value === void 0 ? void 0 : _props$value.manualReceiptDate);
  const [manualReceiptNumber, setManualReceiptNumber] = React.useState(props === null || props === void 0 ? void 0 : (_props$value2 = props.value) === null || _props$value2 === void 0 ? void 0 : _props$value2.manualReceiptNumber);
  React.useEffect(() => {
    if (props.onChange) {
      let errorObj = {};
      if (!manualReceiptDate) errorObj.manualReceiptDate = "ES_COMMON_MANUAL_RECEIPT_DATE";
      if (!manualReceiptNumber) errorObj.manualReceiptNumber = "ES_COMMON_MANUAL_RECEIPT_NO";
      props.onChange({
        manualReceiptNumber,
        manualReceiptDate,
        errorObj
      });
    }
  }, [manualReceiptDate, manualReceiptNumber]);
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: "label-field-pair"
  }, /*#__PURE__*/React__default.createElement("h2", {
    className: "card-label"
  }, t("NOC_PAYMENT_RCPT_NO_LABEL")), /*#__PURE__*/React__default.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "field-container"
  }, /*#__PURE__*/React__default.createElement("input", {
    className: "employee-card-input",
    value: manualReceiptNumber,
    type: "text",
    name: "instrumentNumber",
    onChange: e => setManualReceiptNumber(e.target.value)
  })))), /*#__PURE__*/React__default.createElement("div", {
    className: "label-field-pair"
  }, /*#__PURE__*/React__default.createElement("h2", {
    className: "card-label"
  }, t("NOC_PAYMENT_RECEIPT_ISSUE_DATE_LABEL"), " "), /*#__PURE__*/React__default.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "field-container"
  }, /*#__PURE__*/React__default.createElement(digitUiReactComponents.DatePicker, {
    date: manualReceiptDate,
    onChange: d => {
      setManualReceiptDate(d);
    }
  })))));
};

const useCardPaymentDetails = (props, t) => {
  const config = [{
    head: t("PAYMENT_CARD_HEAD"),
    headId: "paymentInfo",
    body: [{
      withoutLabel: true,
      type: "custom",
      populators: {
        name: "paymentModeDetails",
        customProps: {},
        defaultValue: {},
        component: (props, customProps) => /*#__PURE__*/React__default.createElement(CardDetailsComponent, _extends({
          onChange: props.onChange,
          value: props.value
        }, customProps))
      }
    }]
  }];
  return {
    cardConfig: config
  };
};
const CardDetailsComponent = _ref => {
  var _props$value, _props$value2, _props$value3;
  let {
    ...props
  } = _ref;
  const {
    t
  } = reactI18next.useTranslation();
  const [last4Digits, setLast4Digits] = React.useState(props === null || props === void 0 ? void 0 : (_props$value = props.value) === null || _props$value === void 0 ? void 0 : _props$value.last4Digits);
  const [transactionNumber, setTransactionNumber] = React.useState(props === null || props === void 0 ? void 0 : (_props$value2 = props.value) === null || _props$value2 === void 0 ? void 0 : _props$value2.transactionNumber);
  const [reTransanctionNumber, setReTransanctionNumber] = React.useState(props === null || props === void 0 ? void 0 : (_props$value3 = props.value) === null || _props$value3 === void 0 ? void 0 : _props$value3.reTransanctionNumber);
  React.useEffect(() => {
    if (props.onChange) {
      let errorObj = {};
      if (!last4Digits) errorObj.last4Digits = "ES_COMMON_LAST_4_DIGITS";
      if (!transactionNumber) errorObj.transactionNumber = "ES_COMMON_TRANSANCTION_NO";
      if (!reTransanctionNumber) errorObj.reTransanctionNumber = "ES_COMMON_RE_TRANSANCTION_NO";
      props.onChange({
        transactionNumber,
        reTransanctionNumber,
        instrumentNumber: last4Digits,
        errorObj
      });
    }
  }, [last4Digits, transactionNumber, reTransanctionNumber]);
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: "label-field-pair"
  }, /*#__PURE__*/React__default.createElement("h2", {
    className: "card-label"
  }, t("NOC_PAYMENT_CARD_LAST_DIGITS_LABEL") + " *"), /*#__PURE__*/React__default.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "field-container"
  }, /*#__PURE__*/React__default.createElement("input", {
    className: "employee-card-input",
    value: last4Digits,
    type: "text",
    name: "instrumentNumber",
    maxLength: "4",
    minLength: "4",
    required: true,
    onChange: e => setLast4Digits(e.target.value)
  })))), /*#__PURE__*/React__default.createElement("div", {
    className: "label-field-pair"
  }, /*#__PURE__*/React__default.createElement("h2", {
    className: "card-label"
  }, t("NOC_PAYMENT_TRANS_NO_LABEL") + " *"), /*#__PURE__*/React__default.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "field-container"
  }, /*#__PURE__*/React__default.createElement("input", {
    className: "employee-card-input",
    value: transactionNumber,
    type: "text",
    name: "instrumentNumber",
    required: true,
    onChange: e => setTransactionNumber(e.target.value)
  })))), /*#__PURE__*/React__default.createElement("div", {
    className: "label-field-pair"
  }, /*#__PURE__*/React__default.createElement("h2", {
    className: "card-label"
  }, t("NOC_PAYMENT_RENTR_TRANS_LABEL") + " *"), /*#__PURE__*/React__default.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "field-container"
  }, /*#__PURE__*/React__default.createElement("input", {
    className: "employee-card-input",
    value: reTransanctionNumber,
    type: "text",
    name: "instrumentNumber",
    required: true,
    onChange: e => setReTransanctionNumber(e.target.value)
  })))));
};

const useChequeDetails = (props, t) => {
  const config = [{
    head: t("PAYMENT_CHEQUE_HEAD"),
    headId: "paymentInfo",
    body: [{
      withoutLabel: true,
      type: "custom",
      populators: {
        name: "paymentModeDetails",
        customProps: {},
        defaultValue: {
          instrumentNumber: "",
          instrumentDate: "",
          ifscCode: "",
          bankName: "",
          bankBranch: ""
        },
        component: (props, customProps) => /*#__PURE__*/React__default.createElement(ChequeDetailsComponent, _extends({
          onChange: props.onChange,
          chequeDetails: props.value
        }, customProps))
      }
    }]
  }];
  return {
    chequeConfig: config
  };
};
const ChequeDetailsComponent = props => {
  var _props$chequeDetails$;
  const {
    t
  } = reactI18next.useTranslation();
  const [instrumentDate, setChequeDate] = React.useState(props.chequeDetails.instrumentDate);
  const [instrumentNumber, setChequeNo] = React.useState(props.chequeDetails.instrumentNumber);
  const [ifscCode, setIfsc] = React.useState(props.chequeDetails.ifscCode);
  const [ifscCodeError, setIfscCodeError] = React.useState("");
  const [bankName, setBankName] = React.useState(props.chequeDetails.bankName);
  const [bankBranch, setBankBranch] = React.useState((_props$chequeDetails$ = props.chequeDetails.bankBranch) === null || _props$chequeDetails$ === void 0 ? void 0 : _props$chequeDetails$.replace("┬á", " "));
  React.useEffect(() => {
    if (props.onChange) {
      let errorObj = {};
      if (!instrumentDate) errorObj.instrumentDate = "ES_COMMON_INSTRUMENT_DATE";
      if (!instrumentNumber) errorObj.instrumentNumber = "ES_COMMON_INSTR_NUMBER";
      if (!ifscCode) errorObj.ifscCode = "ES_COMMON_IFSC";
      props.onChange({
        instrumentDate,
        instrumentNumber,
        ifscCode,
        bankName,
        bankBranch,
        errorObj,
        transactionNumber: instrumentNumber
      });
    }
  }, [bankName, bankBranch, instrumentDate, instrumentNumber]);
  const setBankDetailsFromIFSC = function () {
    try {
      const _temp2 = _catch(function () {
        return Promise.resolve(window.fetch("https://ifsc.razorpay.com/" + ifscCode)).then(function (res) {
          const _temp = function () {
            if (res.ok) {
              return Promise.resolve(res.json()).then(function (_ref) {
                let {
                  BANK,
                  BRANCH
                } = _ref;
                setBankName(BANK);
                setBankBranch(BRANCH === null || BRANCH === void 0 ? void 0 : BRANCH.replace("┬á", " "));
              });
            } else setIfscCodeError(t("CS_PAYMENT_INCORRECT_IFSC_CODE_ERROR"));
          }();
          if (_temp && _temp.then) return _temp.then(function () {});
        });
      }, function () {
        setIfscCodeError(t("CS_PAYMENT_INCORRECT_IFSC_CODE_ERROR"));
      });
      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
  const handleIFSCChange = e => {
    setIfsc(e.target.value);
    setIfscCodeError("");
  };
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: "label-field-pair"
  }, /*#__PURE__*/React__default.createElement("h2", {
    className: "card-label"
  }, t("PAYMENT_CHQ_NO_LABEL"), " *"), /*#__PURE__*/React__default.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "field-container"
  }, /*#__PURE__*/React__default.createElement("input", {
    className: "employee-card-input",
    value: instrumentNumber,
    type: "text",
    name: "instrumentNumber",
    onChange: e => setChequeNo(e.target.value),
    required: true
  })))), /*#__PURE__*/React__default.createElement("div", {
    className: "label-field-pair"
  }, /*#__PURE__*/React__default.createElement("h2", {
    className: "card-label"
  }, t("PAYMENT_CHEQUE_DATE_LABEL"), " *"), /*#__PURE__*/React__default.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "field-container"
  }, /*#__PURE__*/React__default.createElement(digitUiReactComponents.DatePicker, {
    isRequired: true,
    date: instrumentDate,
    onChange: d => {
      setChequeDate(d);
    }
  })))),
  /*#__PURE__*/
  React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: "label-field-pair"
  }, /*#__PURE__*/React__default.createElement("h2", {
    className: "card-label"
  }, t("PAYMENT_IFSC_CODE_LABEL"), " *"), /*#__PURE__*/React__default.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
    className: "cheque-date"
  }, /*#__PURE__*/React__default.createElement("input", {
    value: ifscCode,
    type: "text",
    onChange: handleIFSCChange,
    minlength: "11",
    maxlength: "11",
    required: true
  }), /*#__PURE__*/React__default.createElement("button", {
    type: "button",
    onClick: setBankDetailsFromIFSC
  }, /*#__PURE__*/React__default.createElement(digitUiReactComponents.SearchIconSvg, null)))))), ifscCodeError && /*#__PURE__*/React__default.createElement(digitUiReactComponents.CardLabelError, {
    style: {
      width: "70%",
      marginLeft: "30%",
      fontSize: "12px",
      marginTop: "-21px"
    }
  }, ifscCodeError), /*#__PURE__*/React__default.createElement("div", {
    className: "label-field-pair"
  }, /*#__PURE__*/React__default.createElement("h2", {
    className: "card-label"
  }, t("PAYMENT_BANK_NAME_LABEL")), /*#__PURE__*/React__default.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "field-container"
  }, /*#__PURE__*/React__default.createElement("input", {
    className: "employee-card-input",
    value: bankName,
    type: "text",
    className: "employee-card-input",
    readOnly: true,
    disabled: true
  })))), /*#__PURE__*/React__default.createElement("div", {
    className: "label-field-pair"
  }, /*#__PURE__*/React__default.createElement("h2", {
    className: "card-label"
  }, t("PAYMENT_BANK_BRANCH_LABEL")), /*#__PURE__*/React__default.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "field-container"
  }, /*#__PURE__*/React__default.createElement("input", {
    className: "employee-card-input",
    value: bankBranch,
    type: "text",
    className: "employee-card-input",
    readOnly: true,
    disabled: true
  }))))));
};

const useUpiPaymentDetails = (props, t) => {
  const config = [{
    head: t("PAYMENT_UPI_HEAD"),
    headId: "paymentInfo",
    body: [{
      withoutLabel: true,
      type: "custom",
      populators: {
        name: "paymentModeDetails",
        customProps: {},
        defaultValue: {},
        component: (props, customProps) => /*#__PURE__*/React__default.createElement(UpiDetailsComponent, _extends({
          onChange: props.onChange,
          value: props.value
        }, customProps))
      }
    }]
  }];
  return {
    upiConfig: config
  };
};
const UpiDetailsComponent = _ref => {
  var _props$value, _props$value2, _props$value3;
  let {
    ...props
  } = _ref;
  const {
    t
  } = reactI18next.useTranslation();
  const [last4Digits, setLast4Digits] = React.useState(props === null || props === void 0 ? void 0 : (_props$value = props.value) === null || _props$value === void 0 ? void 0 : _props$value.last4Digits);
  const [transactionNumber, setTransactionNumber] = React.useState(props === null || props === void 0 ? void 0 : (_props$value2 = props.value) === null || _props$value2 === void 0 ? void 0 : _props$value2.transactionNumber);
  const [reTransanctionNumber, setReTransanctionNumber] = React.useState(props === null || props === void 0 ? void 0 : (_props$value3 = props.value) === null || _props$value3 === void 0 ? void 0 : _props$value3.reTransanctionNumber);
  React.useEffect(() => {
    if (props.onChange) {
      let errorObj = {};
      if (!last4Digits) errorObj.last4Digits = "ES_COMMON_LAST_UPI";
      if (!transactionNumber) errorObj.transactionNumber = "ES_COMMON_TRANSANCTION_NO";
      if (!reTransanctionNumber) errorObj.reTransanctionNumber = "ES_COMMON_RE_TRANSANCTION_NO";
      props.onChange({
        transactionNumber,
        reTransanctionNumber,
        instrumentNumber: last4Digits,
        errorObj
      });
    }
  }, [last4Digits, transactionNumber, reTransanctionNumber]);
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: "label-field-pair"
  }, /*#__PURE__*/React__default.createElement("h2", {
    className: "card-label"
  }, t("NOC_PAYMENT_UPI_DIGITS_LABEL") + " *"), /*#__PURE__*/React__default.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "field-container"
  }, /*#__PURE__*/React__default.createElement("input", {
    className: "employee-card-input",
    value: last4Digits,
    type: "text",
    name: "instrumentNumber",
    required: true,
    onChange: e => setLast4Digits(e.target.value)
  })))), /*#__PURE__*/React__default.createElement("div", {
    className: "label-field-pair"
  }, /*#__PURE__*/React__default.createElement("h2", {
    className: "card-label"
  }, t("NOC_PAYMENT_TRANS_NO_LABEL") + " *"), /*#__PURE__*/React__default.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "field-container"
  }, /*#__PURE__*/React__default.createElement("input", {
    className: "employee-card-input",
    value: transactionNumber,
    type: "text",
    name: "instrumentNumber",
    required: true,
    onChange: e => setTransactionNumber(e.target.value)
  })))), /*#__PURE__*/React__default.createElement("div", {
    className: "label-field-pair"
  }, /*#__PURE__*/React__default.createElement("h2", {
    className: "card-label"
  }, t("NOC_PAYMENT_RENTR_TRANS_LABEL") + " *"), /*#__PURE__*/React__default.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "field-container"
  }, /*#__PURE__*/React__default.createElement("input", {
    className: "employee-card-input",
    value: reTransanctionNumber,
    type: "text",
    name: "instrumentNumber",
    required: true,
    onChange: e => setReTransanctionNumber(e.target.value)
  })))));
};

function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
var _listCacheClear = listCacheClear;

function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var eq_1 = eq;

function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq_1(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var _assocIndexOf = assocIndexOf;

var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__,
    index = _assocIndexOf(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
var _listCacheDelete = listCacheDelete;

function listCacheGet(key) {
  var data = this.__data__,
    index = _assocIndexOf(data, key);
  return index < 0 ? undefined : data[index][1];
}
var _listCacheGet = listCacheGet;

function listCacheHas(key) {
  return _assocIndexOf(this.__data__, key) > -1;
}
var _listCacheHas = listCacheHas;

function listCacheSet(key, value) {
  var data = this.__data__,
    index = _assocIndexOf(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
var _listCacheSet = listCacheSet;

function ListCache(entries) {
  var index = -1,
    length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = _listCacheClear;
ListCache.prototype['delete'] = _listCacheDelete;
ListCache.prototype.get = _listCacheGet;
ListCache.prototype.has = _listCacheHas;
ListCache.prototype.set = _listCacheSet;
var _ListCache = ListCache;

function stackClear() {
  this.__data__ = new _ListCache();
  this.size = 0;
}
var _stackClear = stackClear;

function stackDelete(key) {
  var data = this.__data__,
    result = data['delete'](key);
  this.size = data.size;
  return result;
}
var _stackDelete = stackDelete;

function stackGet(key) {
  return this.__data__.get(key);
}
var _stackGet = stackGet;

function stackHas(key) {
  return this.__data__.has(key);
}
var _stackHas = stackHas;

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var _freeGlobal = freeGlobal;

var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
var root = _freeGlobal || freeSelf || Function('return this')();
var _root = root;

var Symbol$1 = _root.Symbol;
var _Symbol = Symbol$1;

var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
var nativeObjectToString = objectProto.toString;
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
    tag = value[symToStringTag];
  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}
  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}
var _getRawTag = getRawTag;

var objectProto$1 = Object.prototype;
var nativeObjectToString$1 = objectProto$1.toString;
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}
var _objectToString = objectToString;

var nullTag = '[object Null]',
  undefinedTag = '[object Undefined]';
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return symToStringTag$1 && symToStringTag$1 in Object(value) ? _getRawTag(value) : _objectToString(value);
}
var _baseGetTag = baseGetTag;

function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}
var isObject_1 = isObject;

var asyncTag = '[object AsyncFunction]',
  funcTag = '[object Function]',
  genTag = '[object GeneratorFunction]',
  proxyTag = '[object Proxy]';
function isFunction(value) {
  if (!isObject_1(value)) {
    return false;
  }
  var tag = _baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var isFunction_1 = isFunction;

var coreJsData = _root['__core-js_shared__'];
var _coreJsData = coreJsData;

var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var _isMasked = isMasked;

var funcProto = Function.prototype;
var funcToString = funcProto.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return func + '';
    } catch (e) {}
  }
  return '';
}
var _toSource = toSource;

var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto$1 = Function.prototype,
  objectProto$2 = Object.prototype;
var funcToString$1 = funcProto$1.toString;
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
var reIsNative = RegExp('^' + funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
function baseIsNative(value) {
  if (!isObject_1(value) || _isMasked(value)) {
    return false;
  }
  var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(_toSource(value));
}
var _baseIsNative = baseIsNative;

function getValue(object, key) {
  return object == null ? undefined : object[key];
}
var _getValue = getValue;

function getNative(object, key) {
  var value = _getValue(object, key);
  return _baseIsNative(value) ? value : undefined;
}
var _getNative = getNative;

var Map = _getNative(_root, 'Map');
var _Map = Map;

var nativeCreate = _getNative(Object, 'create');
var _nativeCreate = nativeCreate;

function hashClear() {
  this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
  this.size = 0;
}
var _hashClear = hashClear;

function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var _hashDelete = hashDelete;

var HASH_UNDEFINED = '__lodash_hash_undefined__';
var objectProto$3 = Object.prototype;
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (_nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
}
var _hashGet = hashGet;

var objectProto$4 = Object.prototype;
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return _nativeCreate ? data[key] !== undefined : hasOwnProperty$3.call(data, key);
}
var _hashHas = hashHas;

var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = _nativeCreate && value === undefined ? HASH_UNDEFINED$1 : value;
  return this;
}
var _hashSet = hashSet;

function Hash(entries) {
  var index = -1,
    length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = _hashClear;
Hash.prototype['delete'] = _hashDelete;
Hash.prototype.get = _hashGet;
Hash.prototype.has = _hashHas;
Hash.prototype.set = _hashSet;
var _Hash = Hash;

function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new _Hash(),
    'map': new (_Map || _ListCache)(),
    'string': new _Hash()
  };
}
var _mapCacheClear = mapCacheClear;

function isKeyable(value) {
  var type = typeof value;
  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}
var _isKeyable = isKeyable;

function getMapData(map, key) {
  var data = map.__data__;
  return _isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}
var _getMapData = getMapData;

function mapCacheDelete(key) {
  var result = _getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}
var _mapCacheDelete = mapCacheDelete;

function mapCacheGet(key) {
  return _getMapData(this, key).get(key);
}
var _mapCacheGet = mapCacheGet;

function mapCacheHas(key) {
  return _getMapData(this, key).has(key);
}
var _mapCacheHas = mapCacheHas;

function mapCacheSet(key, value) {
  var data = _getMapData(this, key),
    size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
var _mapCacheSet = mapCacheSet;

function MapCache(entries) {
  var index = -1,
    length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = _mapCacheClear;
MapCache.prototype['delete'] = _mapCacheDelete;
MapCache.prototype.get = _mapCacheGet;
MapCache.prototype.has = _mapCacheHas;
MapCache.prototype.set = _mapCacheSet;
var _MapCache = MapCache;

var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof _ListCache) {
    var pairs = data.__data__;
    if (!_Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new _MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
var _stackSet = stackSet;

function Stack(entries) {
  var data = this.__data__ = new _ListCache(entries);
  this.size = data.size;
}
Stack.prototype.clear = _stackClear;
Stack.prototype['delete'] = _stackDelete;
Stack.prototype.get = _stackGet;
Stack.prototype.has = _stackHas;
Stack.prototype.set = _stackSet;
var _Stack = Stack;

var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED$2);
  return this;
}
var _setCacheAdd = setCacheAdd;

function setCacheHas(value) {
  return this.__data__.has(value);
}
var _setCacheHas = setCacheHas;

function SetCache(values) {
  var index = -1,
    length = values == null ? 0 : values.length;
  this.__data__ = new _MapCache();
  while (++index < length) {
    this.add(values[index]);
  }
}
SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd;
SetCache.prototype.has = _setCacheHas;
var _SetCache = SetCache;

function arraySome(array, predicate) {
  var index = -1,
    length = array == null ? 0 : array.length;
  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}
var _arraySome = arraySome;

function cacheHas(cache, key) {
  return cache.has(key);
}
var _cacheHas = cacheHas;

var COMPARE_PARTIAL_FLAG = 1,
  COMPARE_UNORDERED_FLAG = 2;
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
    arrLength = array.length,
    othLength = other.length;
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1,
    result = true,
    seen = bitmask & COMPARE_UNORDERED_FLAG ? new _SetCache() : undefined;
  stack.set(array, other);
  stack.set(other, array);
  while (++index < arrLength) {
    var arrValue = array[index],
      othValue = other[index];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    if (seen) {
      if (!_arraySome(other, function (othValue, othIndex) {
        if (!_cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}
var _equalArrays = equalArrays;

var Uint8Array = _root.Uint8Array;
var _Uint8Array = Uint8Array;

function mapToArray(map) {
  var index = -1,
    result = Array(map.size);
  map.forEach(function (value, key) {
    result[++index] = [key, value];
  });
  return result;
}
var _mapToArray = mapToArray;

function setToArray(set) {
  var index = -1,
    result = Array(set.size);
  set.forEach(function (value) {
    result[++index] = value;
  });
  return result;
}
var _setToArray = setToArray;

var COMPARE_PARTIAL_FLAG$1 = 1,
  COMPARE_UNORDERED_FLAG$1 = 2;
var boolTag = '[object Boolean]',
  dateTag = '[object Date]',
  errorTag = '[object Error]',
  mapTag = '[object Map]',
  numberTag = '[object Number]',
  regexpTag = '[object RegExp]',
  setTag = '[object Set]',
  stringTag = '[object String]',
  symbolTag = '[object Symbol]';
var arrayBufferTag = '[object ArrayBuffer]',
  dataViewTag = '[object DataView]';
var symbolProto = _Symbol ? _Symbol.prototype : undefined,
  symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;
    case arrayBufferTag:
      if (object.byteLength != other.byteLength || !equalFunc(new _Uint8Array(object), new _Uint8Array(other))) {
        return false;
      }
      return true;
    case boolTag:
    case dateTag:
    case numberTag:
      return eq_1(+object, +other);
    case errorTag:
      return object.name == other.name && object.message == other.message;
    case regexpTag:
    case stringTag:
      return object == other + '';
    case mapTag:
      var convert = _mapToArray;
    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1;
      convert || (convert = _setToArray);
      if (object.size != other.size && !isPartial) {
        return false;
      }
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG$1;
      stack.set(object, other);
      var result = _equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;
    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}
var _equalByTag = equalByTag;

function arrayPush(array, values) {
  var index = -1,
    length = values.length,
    offset = array.length;
  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}
var _arrayPush = arrayPush;

var isArray = Array.isArray;
var isArray_1 = isArray;

function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
}
var _baseGetAllKeys = baseGetAllKeys;

function arrayFilter(array, predicate) {
  var index = -1,
    length = array == null ? 0 : array.length,
    resIndex = 0,
    result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
var _arrayFilter = arrayFilter;

function stubArray() {
  return [];
}
var stubArray_1 = stubArray;

var objectProto$5 = Object.prototype;
var propertyIsEnumerable = objectProto$5.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols ? stubArray_1 : function (object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return _arrayFilter(nativeGetSymbols(object), function (symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
var _getSymbols = getSymbols;

function baseTimes(n, iteratee) {
  var index = -1,
    result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
var _baseTimes = baseTimes;

function isObjectLike(value) {
  return value != null && typeof value == 'object';
}
var isObjectLike_1 = isObjectLike;

var argsTag = '[object Arguments]';
function baseIsArguments(value) {
  return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
}
var _baseIsArguments = baseIsArguments;

var objectProto$6 = Object.prototype;
var hasOwnProperty$4 = objectProto$6.hasOwnProperty;
var propertyIsEnumerable$1 = objectProto$6.propertyIsEnumerable;
var isArguments = _baseIsArguments(function () {
  return arguments;
}()) ? _baseIsArguments : function (value) {
  return isObjectLike_1(value) && hasOwnProperty$4.call(value, 'callee') && !propertyIsEnumerable$1.call(value, 'callee');
};
var isArguments_1 = isArguments;

function stubFalse() {
  return false;
}
var stubFalse_1 = stubFalse;

var isBuffer_1 = createCommonjsModule(function (module, exports) {
  var freeExports =  exports && !exports.nodeType && exports;
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer = moduleExports ? _root.Buffer : undefined;
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
  var isBuffer = nativeIsBuffer || stubFalse_1;
  module.exports = isBuffer;
});

var MAX_SAFE_INTEGER = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}
var _isIndex = isIndex;

var MAX_SAFE_INTEGER$1 = 9007199254740991;
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
}
var isLength_1 = isLength;

var argsTag$1 = '[object Arguments]',
  arrayTag = '[object Array]',
  boolTag$1 = '[object Boolean]',
  dateTag$1 = '[object Date]',
  errorTag$1 = '[object Error]',
  funcTag$1 = '[object Function]',
  mapTag$1 = '[object Map]',
  numberTag$1 = '[object Number]',
  objectTag = '[object Object]',
  regexpTag$1 = '[object RegExp]',
  setTag$1 = '[object Set]',
  stringTag$1 = '[object String]',
  weakMapTag = '[object WeakMap]';
var arrayBufferTag$1 = '[object ArrayBuffer]',
  dataViewTag$1 = '[object DataView]',
  float32Tag = '[object Float32Array]',
  float64Tag = '[object Float64Array]',
  int8Tag = '[object Int8Array]',
  int16Tag = '[object Int16Array]',
  int32Tag = '[object Int32Array]',
  uint8Tag = '[object Uint8Array]',
  uint8ClampedTag = '[object Uint8ClampedArray]',
  uint16Tag = '[object Uint16Array]',
  uint32Tag = '[object Uint32Array]';
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] = typedArrayTags[dataViewTag$1] = typedArrayTags[dateTag$1] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$1] = typedArrayTags[numberTag$1] = typedArrayTags[objectTag] = typedArrayTags[regexpTag$1] = typedArrayTags[setTag$1] = typedArrayTags[stringTag$1] = typedArrayTags[weakMapTag] = false;
function baseIsTypedArray(value) {
  return isObjectLike_1(value) && isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
}
var _baseIsTypedArray = baseIsTypedArray;

function baseUnary(func) {
  return function (value) {
    return func(value);
  };
}
var _baseUnary = baseUnary;

var _nodeUtil = createCommonjsModule(function (module, exports) {
  var freeExports =  exports && !exports.nodeType && exports;
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var freeProcess = moduleExports && _freeGlobal.process;
  var nodeUtil = function () {
    try {
      var types = freeModule && freeModule.require && freeModule.require('util').types;
      if (types) {
        return types;
      }
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }();
  module.exports = nodeUtil;
});

var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;
var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;
var isTypedArray_1 = isTypedArray;

var objectProto$7 = Object.prototype;
var hasOwnProperty$5 = objectProto$7.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray_1(value),
    isArg = !isArr && isArguments_1(value),
    isBuff = !isArr && !isArg && isBuffer_1(value),
    isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
    skipIndexes = isArr || isArg || isBuff || isType,
    result = skipIndexes ? _baseTimes(value.length, String) : [],
    length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$5.call(value, key)) && !(skipIndexes && (key == 'length' || isBuff && (key == 'offset' || key == 'parent') || isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') || _isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
var _arrayLikeKeys = arrayLikeKeys;

var objectProto$8 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor,
    proto = typeof Ctor == 'function' && Ctor.prototype || objectProto$8;
  return value === proto;
}
var _isPrototype = isPrototype;

function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}
var _overArg = overArg;

var nativeKeys = _overArg(Object.keys, Object);
var _nativeKeys = nativeKeys;

var objectProto$9 = Object.prototype;
var hasOwnProperty$6 = objectProto$9.hasOwnProperty;
function baseKeys(object) {
  if (!_isPrototype(object)) {
    return _nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$6.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}
var _baseKeys = baseKeys;

function isArrayLike(value) {
  return value != null && isLength_1(value.length) && !isFunction_1(value);
}
var isArrayLike_1 = isArrayLike;

function keys(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
}
var keys_1 = keys;

function getAllKeys(object) {
  return _baseGetAllKeys(object, keys_1, _getSymbols);
}
var _getAllKeys = getAllKeys;

var COMPARE_PARTIAL_FLAG$2 = 1;
var objectProto$a = Object.prototype;
var hasOwnProperty$7 = objectProto$a.hasOwnProperty;
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2,
    objProps = _getAllKeys(object),
    objLength = objProps.length,
    othProps = _getAllKeys(other),
    othLength = othProps.length;
  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$7.call(other, key))) {
      return false;
    }
  }
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
      othValue = other[key];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    }
    if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
      othCtor = other.constructor;
    if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}
var _equalObjects = equalObjects;

var DataView = _getNative(_root, 'DataView');
var _DataView = DataView;

var Promise$1 = _getNative(_root, 'Promise');
var _Promise = Promise$1;

var Set = _getNative(_root, 'Set');
var _Set = Set;

var WeakMap = _getNative(_root, 'WeakMap');
var _WeakMap = WeakMap;

var mapTag$2 = '[object Map]',
  objectTag$1 = '[object Object]',
  promiseTag = '[object Promise]',
  setTag$2 = '[object Set]',
  weakMapTag$1 = '[object WeakMap]';
var dataViewTag$2 = '[object DataView]';
var dataViewCtorString = _toSource(_DataView),
  mapCtorString = _toSource(_Map),
  promiseCtorString = _toSource(_Promise),
  setCtorString = _toSource(_Set),
  weakMapCtorString = _toSource(_WeakMap);
var getTag = _baseGetTag;
if (_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag$2 || _Map && getTag(new _Map()) != mapTag$2 || _Promise && getTag(_Promise.resolve()) != promiseTag || _Set && getTag(new _Set()) != setTag$2 || _WeakMap && getTag(new _WeakMap()) != weakMapTag$1) {
  getTag = function (value) {
    var result = _baseGetTag(value),
      Ctor = result == objectTag$1 ? value.constructor : undefined,
      ctorString = Ctor ? _toSource(Ctor) : '';
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag$2;
        case mapCtorString:
          return mapTag$2;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag$2;
        case weakMapCtorString:
          return weakMapTag$1;
      }
    }
    return result;
  };
}
var _getTag = getTag;

var COMPARE_PARTIAL_FLAG$3 = 1;
var argsTag$2 = '[object Arguments]',
  arrayTag$1 = '[object Array]',
  objectTag$2 = '[object Object]';
var objectProto$b = Object.prototype;
var hasOwnProperty$8 = objectProto$b.hasOwnProperty;
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray_1(object),
    othIsArr = isArray_1(other),
    objTag = objIsArr ? arrayTag$1 : _getTag(object),
    othTag = othIsArr ? arrayTag$1 : _getTag(other);
  objTag = objTag == argsTag$2 ? objectTag$2 : objTag;
  othTag = othTag == argsTag$2 ? objectTag$2 : othTag;
  var objIsObj = objTag == objectTag$2,
    othIsObj = othTag == objectTag$2,
    isSameTag = objTag == othTag;
  if (isSameTag && isBuffer_1(object)) {
    if (!isBuffer_1(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new _Stack());
    return objIsArr || isTypedArray_1(object) ? _equalArrays(object, other, bitmask, customizer, equalFunc, stack) : _equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG$3)) {
    var objIsWrapped = objIsObj && hasOwnProperty$8.call(object, '__wrapped__'),
      othIsWrapped = othIsObj && hasOwnProperty$8.call(other, '__wrapped__');
    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
        othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new _Stack());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new _Stack());
  return _equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}
var _baseIsEqualDeep = baseIsEqualDeep;

function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike_1(value) && !isObjectLike_1(other)) {
    return value !== value && other !== other;
  }
  return _baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}
var _baseIsEqual = baseIsEqual;

function isEqual(value, other) {
  return _baseIsEqual(value, other);
}
var isEqual_1 = isEqual;

const BillDetailsKeyNoteConfig = () => ({
  PT: {
    heading: "ES_BILL_DETAILS_PT_DETAILS_HEADING",
    details: [{
      keyValue: "PT_PROPERTY_ID",
      keyPath: ["consumerCode"],
      fallback: ""
    }, {
      keyValue: "CS_PAYMENT_BILLING_PERIOD",
      keyPath: ["billDetails", d => {
        const {
          fromPeriod,
          toPeriod
        } = d[0];
        if (fromPeriod && toPeriod) {
          let from = new Date(fromPeriod).getFullYear().toString();
          let to = new Date(toPeriod).getFullYear().toString();
          return "FY " + from + "-" + to;
        } else return "N/A";
      }],
      fallback: "N/A"
    }, {
      keyValue: "CS_BILL_NO",
      keyPath: ["billDetails", d => {
        const {
          currentBillNo
        } = d[0];
        if (currentBillNo) {
          return currentBillNo;
        } else return "N/A";
      }],
      fallback: "N/A"
    }, {
      keyValue: "CS_BILL_DUEDATE",
      keyPath: ["billDetails", d => {
        const {
          currentExpiryDate
        } = d[0];
        if (currentExpiryDate) {
          return new Date(currentExpiryDate).toLocaleDateString();
        } else return "N/A";
      }],
      fallback: "N/A"
    }]
  },
  mcollect: {
    heading: "COMMON_PAY_SCREEN_HEADER",
    details: [{
      keyValue: "UC_CHALLAN_NO",
      keyPath: ["consumerCode"],
      fallback: ""
    }]
  },
  "PT.MUTATION": {
    heading: "COMMON_PAY_SCREEN_HEADER",
    details: [{
      keyValue: "PDF_STATIC_LABEL_MUATATION_NUMBER_LABEL",
      keyPath: ["consumerCode"],
      fallback: ""
    }, {
      keyValue: "CS_BILL_NO",
      keyPath: ["billDetails", d => {
        const {
          currentBillNo
        } = d[0];
        if (currentBillNo) {
          return currentBillNo;
        } else return "N/A";
      }],
      fallback: "N/A"
    }, {
      keyValue: "CS_BILL_DUEDATE",
      keyPath: ["billDetails", d => {
        const {
          currentExpiryDate
        } = d[0];
        if (currentExpiryDate) {
          return new Date(currentExpiryDate).toLocaleDateString();
        } else return "N/A";
      }],
      fallback: "N/A"
    }]
  },
  TL: {
    heading: "COMMON_PAY_SCREEN_HEADER",
    details: [{
      keyValue: "TL_TRADE_LICENSE_LABEL",
      keyPath: ["consumerCode"],
      fallback: ""
    }]
  },
  "WS.ONE_TIME_FEE": {
    heading: "COMMON_PAY_SCREEN_HEADER",
    details: [{
      keyValue: "WS_COMMON_TABLE_APP_NO_LABEL",
      keyPath: ["consumerCode"],
      fallback: ""
    }]
  },
  "SW.ONE_TIME_FEE": {
    heading: "COMMON_PAY_SCREEN_HEADER",
    details: [{
      keyValue: "WS_COMMON_TABLE_APP_NO_LABEL",
      keyPath: ["consumerCode"],
      fallback: ""
    }]
  },
  WS: {
    heading: "COMMON_PAY_SCREEN_HEADER",
    details: [{
      keyValue: "WS_COMMON_TABLE_COL_CONSUMER_NO_LABEL",
      keyPath: ["consumerCode"],
      fallback: ""
    }, {
      keyValue: "CS_PAYMENT_BILLING_PERIOD",
      keyPath: ["billDetails", d => {
        const {
          fromPeriod,
          toPeriod
        } = d[0];
        if (fromPeriod && toPeriod) {
          let from = new Date(fromPeriod).toLocaleDateString();
          let to = new Date(toPeriod).toLocaleDateString();
          return from + " - " + to;
        } else return "N/A";
      }],
      fallback: "N/A"
    }, {
      keyValue: "CS_BILL_NO",
      keyPath: ["billNumber"],
      fallback: "N/A"
    }, {
      keyValue: "CS_BILL_DUEDATE",
      keyPath: ["billDetails", d => {
        const {
          currentExpiryDate
        } = d[0];
        if (currentExpiryDate) {
          return new Date(currentExpiryDate).toLocaleDateString();
        } else return "N/A";
      }],
      fallback: "N/A"
    }]
  },
  SW: {
    heading: "COMMON_PAY_SCREEN_HEADER",
    details: [{
      keyValue: "WS_COMMON_TABLE_COL_CONSUMER_NO_LABEL",
      keyPath: ["consumerCode"],
      fallback: ""
    }, {
      keyValue: "CS_PAYMENT_BILLING_PERIOD",
      keyPath: ["billDetails", d => {
        const {
          fromPeriod,
          toPeriod
        } = d[0];
        if (fromPeriod && toPeriod) {
          let from = new Date(fromPeriod).toLocaleDateString();
          let to = new Date(toPeriod).toLocaleDateString();
          return from + " - " + to;
        } else return "N/A";
      }],
      fallback: "N/A"
    }, {
      keyValue: "CS_BILL_NO",
      keyPath: ["billNumber"],
      fallback: "N/A"
    }, {
      keyValue: "CS_BILL_DUEDATE",
      keyPath: ["billDetails", d => {
        const {
          expiryDate
        } = d[0];
        if (expiryDate) {
          return new Date(expiryDate).toLocaleDateString();
        } else return "N/A";
      }],
      fallback: "N/A"
    }]
  },
  FSM: {
    heading: "COMMON_PAY_SCREEN_HEADER",
    details: [{
      keyValue: "ADV_TOTAL_AMOUNT",
      keyPath: ["totalAmount"],
      fallback: ""
    }, {
      keyValue: "ADV_COLLECTION",
      keyPath: ["totalAmountPaid"],
      fallback: "N/A"
    }]
  }
});

const BillDetailsFormConfig = (props, t) => ({
  PT: [{
    head: t("ES_BILL_DETAILS_PT_DETAILS_HEADING"),
    body: [{
      withoutLabel: true,
      type: "custom",
      populators: {
        name: "amount",
        customProps: {
          businessService: "PT",
          consumerCode: props.consumerCode
        },
        component: (props, customProps) => /*#__PURE__*/React__default.createElement(BillDetails$1, _extends({
          onChange: props.onChange,
          amount: props.value
        }, customProps))
      }
    }]
  }],
  mcollect: [{
    head: t("COMMON_PAY_SCREEN_HEADER"),
    body: [{
      withoutLabel: true,
      type: "custom",
      populators: {
        name: "amount",
        customProps: {
          businessService: props.businessService,
          consumerCode: props.consumerCode
        },
        component: (props, customProps) => /*#__PURE__*/React__default.createElement(BillDetails$1, _extends({
          onChange: props.onChange,
          amount: props.value
        }, customProps))
      }
    }]
  }],
  "PT.MUTATION": [{
    head: t("COMMON_PAY_SCREEN_HEADER"),
    body: [{
      withoutLabel: true,
      type: "custom",
      populators: {
        name: "amount",
        customProps: {
          businessService: props.businessService,
          consumerCode: props.consumerCode
        },
        component: (props, customProps) => /*#__PURE__*/React__default.createElement(BillDetails$1, _extends({
          onChange: props.onChange,
          amount: props.value
        }, customProps))
      }
    }]
  }],
  TL: [{
    body: [{
      withoutLabel: true,
      type: "custom",
      populators: {
        name: "amount",
        customProps: {
          businessService: "TL",
          consumerCode: props.consumerCode
        },
        component: (props, customProps) => /*#__PURE__*/React__default.createElement(BillDetails$1, _extends({
          onChange: props.onChange,
          amount: props.value
        }, customProps))
      }
    }]
  }],
  WS: [{
    head: t("COMMON_PAY_SCREEN_HEADER"),
    body: [{
      withoutLabel: true,
      type: "custom",
      populators: {
        name: "amount",
        customProps: {
          businessService: "WS",
          consumerCode: props.consumerCode
        },
        component: (props, customProps) => /*#__PURE__*/React__default.createElement(BillDetails$1, _extends({
          onChange: props.onChange,
          amount: props.value
        }, customProps))
      }
    }]
  }],
  "WS.ONE_TIME_FEE": [{
    head: t("COMMON_PAY_SCREEN_HEADER"),
    body: [{
      withoutLabel: true,
      type: "custom",
      populators: {
        name: "amount",
        customProps: {
          businessService: "WS.ONE_TIME_FEE",
          consumerCode: props.consumerCode
        },
        component: (props, customProps) => /*#__PURE__*/React__default.createElement(BillDetails$1, _extends({
          onChange: props.onChange,
          amount: props.value
        }, customProps))
      }
    }]
  }],
  "SW.ONE_TIME_FEE": [{
    head: t("COMMON_PAY_SCREEN_HEADER"),
    body: [{
      withoutLabel: true,
      type: "custom",
      populators: {
        name: "amount",
        customProps: {
          businessService: "SW.ONE_TIME_FEE",
          consumerCode: props.consumerCode
        },
        component: (props, customProps) => /*#__PURE__*/React__default.createElement(BillDetails$1, _extends({
          onChange: props.onChange,
          amount: props.value
        }, customProps))
      }
    }]
  }],
  SW: [{
    head: t("COMMON_PAY_SCREEN_HEADER"),
    body: [{
      withoutLabel: true,
      type: "custom",
      populators: {
        name: "amount",
        customProps: {
          businessService: "SW",
          consumerCode: props.consumerCode
        },
        component: (props, customProps) => /*#__PURE__*/React__default.createElement(BillDetails$1, _extends({
          onChange: props.onChange,
          amount: props.value
        }, customProps))
      }
    }]
  }],
  FSM: [{
    head: t("ES_TITLE_PAYMENT_DETAILS"),
    body: [{
      withoutLabel: true,
      type: "custom",
      populators: {
        name: "amount",
        customProps: {
          businessService: props.businessService,
          consumerCode: props.consumerCode
        },
        component: (props, customProps) => /*#__PURE__*/React__default.createElement(BillDetails$1, _extends({
          onChange: props.onChange,
          amount: props.value
        }, customProps))
      }
    }]
  }]
});
const BillDetails$1 = _ref => {
  var _businessService$toUp, _bill$billDetails, _application$addition, _application$addition2, _bill$billDetails2, _bill$billDetails2$so, _billDetails$billAcco, _arrears$toFixed, _arrears$toFixed2, _yearWiseBills$filter6, _yearWiseBills$filter7, _yearWiseBills$filter8, _yearWiseBills$filter9, _yearWiseBills$filter10;
  let {
    businessService,
    consumerCode,
    _amount,
    onChange
  } = _ref;
  const {
    t
  } = reactI18next.useTranslation();
  const {
    workflow: ModuleWorkflow,
    IsDisconnectionFlow
  } = Digit.Hooks.useQueryParams();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const {
    data,
    isLoading
  } = Digit.Hooks.useFetchPayment({
    tenantId,
    businessService,
    consumerCode
  });
  const checkFSM = window.location.href.includes("FSM");
  const {
    isLoading: isDataLoading,
    data: applicationData
  } = Digit.Hooks.fsm.useSearch(tenantId, {
    applicationNos: consumerCode
  }, {
    staleTime: Infinity,
    enabled: businessService !== null && businessService !== void 0 && (_businessService$toUp = businessService.toUpperCase()) !== null && _businessService$toUp !== void 0 && _businessService$toUp.includes("FSM") ? true : false
  });
  const [bill, setBill] = React.useState();
  const [showDetails, setShowDetails] = React.useState(true);
  const {
    isLoading: isFSMLoading,
    isError,
    error,
    data: application,
    error: errorApplication
  } = Digit.Hooks.fsm.useApplicationDetail(t, tenantId, consumerCode, {
    enabled: checkFSM ? true : false
  }, "EMPLOYEE");
  const yearWiseBills = bill === null || bill === void 0 ? void 0 : (_bill$billDetails = bill.billDetails) === null || _bill$billDetails === void 0 ? void 0 : _bill$billDetails.sort((a, b) => b.fromPeriod - a.fromPeriod);
  const billDetails = (yearWiseBills === null || yearWiseBills === void 0 ? void 0 : yearWiseBills[0]) || [];
  const getTotal = () => bill !== null && bill !== void 0 && bill.totalAmount ? bill === null || bill === void 0 ? void 0 : bill.totalAmount : 0;
  const [totalFSM, setTotalFSM] = React.useState(application !== null && application !== void 0 && application.totalAmount ? application === null || application === void 0 ? void 0 : application.totalAmount : 0);
  const getTotalFSM = () => application !== null && application !== void 0 && application.totalAmount ? application === null || application === void 0 ? void 0 : application.totalAmount : 0;
  const [advanceAmount, setAdvanceAmount] = React.useState(applicationData !== null && applicationData !== void 0 && applicationData.advanceAmount ? applicationData === null || applicationData === void 0 ? void 0 : applicationData.advanceAmount : 0);
  const getAdvanceAmount = () => applicationData !== null && applicationData !== void 0 && applicationData.advanceAmount ? applicationData === null || applicationData === void 0 ? void 0 : applicationData.advanceAmount : 0;
  const [dueAmount, setDueAmount] = React.useState(bill !== null && bill !== void 0 && bill.totalAmount ? bill === null || bill === void 0 ? void 0 : bill.totalAmount : 0);
  const dueAmountTobePaid = () => bill !== null && bill !== void 0 && bill.totalAmount ? bill === null || bill === void 0 ? void 0 : bill.totalAmount : 0;
  const [amountPerTrip, setAmountPerTrip] = React.useState(application !== null && application !== void 0 && (_application$addition = application.additionalDetails) !== null && _application$addition !== void 0 && _application$addition.tripAmount ? application === null || application === void 0 ? void 0 : (_application$addition2 = application.additionalDetails) === null || _application$addition2 === void 0 ? void 0 : _application$addition2.tripAmount : 0);
  const getAmountPerTrip = () => {
    var _application$addition3, _application$addition4;
    return application !== null && application !== void 0 && (_application$addition3 = application.additionalDetails) !== null && _application$addition3 !== void 0 && _application$addition3.tripAmount ? application === null || application === void 0 ? void 0 : (_application$addition4 = application.additionalDetails) === null || _application$addition4 === void 0 ? void 0 : _application$addition4.tripAmount : 0;
  };
  const arrears = (bill === null || bill === void 0 ? void 0 : (_bill$billDetails2 = bill.billDetails) === null || _bill$billDetails2 === void 0 ? void 0 : (_bill$billDetails2$so = _bill$billDetails2.sort((a, b) => b.fromPeriod - a.fromPeriod)) === null || _bill$billDetails2$so === void 0 ? void 0 : _bill$billDetails2$so.reduce((total, current, index) => index === 0 ? total : total + current.amount, 0)) || 0;
  const {
    isLoading: mdmsLoading,
    data: mdmsBillingData
  } = Digit.Hooks.useGetPaymentRulesForBusinessServices(tenantId);
  const [paymentRules, setPaymentRules] = React.useState();
  React.useEffect(() => {
    var _mdmsBillingData$Mdms, _mdmsBillingData$Mdms2;
    const payRestrictiondetails = mdmsBillingData === null || mdmsBillingData === void 0 ? void 0 : (_mdmsBillingData$Mdms = mdmsBillingData.MdmsRes) === null || _mdmsBillingData$Mdms === void 0 ? void 0 : (_mdmsBillingData$Mdms2 = _mdmsBillingData$Mdms.BillingService) === null || _mdmsBillingData$Mdms2 === void 0 ? void 0 : _mdmsBillingData$Mdms2.BusinessService;
    if (payRestrictiondetails !== null && payRestrictiondetails !== void 0 && payRestrictiondetails.length) {
      if (IsDisconnectionFlow) {
        setPaymentRules({
          ...payRestrictiondetails.filter(e => e.code == businessService)[0],
          partPaymentAllowed: false
        });
      } else setPaymentRules(payRestrictiondetails.filter(e => e.code == businessService)[0]);
    } else setPaymentRules({});
  }, [mdmsBillingData]);
  const {
    minAmountPayable,
    isAdvanceAllowed
  } = paymentRules || {};
  const [paymentType, setPaymentType] = React.useState(t("CS_PAYMENT_FULL_AMOUNT"));
  const [amount, setAmount] = React.useState(getTotal());
  const [paymentAllowed, setPaymentAllowed] = React.useState(true);
  const [formError, setError] = React.useState("");
  const changeAmount = value => {
    setAmount(value);
  };
  React.useEffect(() => {
    ModuleWorkflow === "mcollect" && (billDetails === null || billDetails === void 0 ? void 0 : billDetails.billAccountDetails) && (billDetails === null || billDetails === void 0 ? void 0 : billDetails.billAccountDetails.map(ob => {
      if (ob.taxHeadCode.includes("CGST")) ob.order = 3;else if (ob.taxHeadCode.includes("SGST")) ob.order = 4;
    }));
  }, [billDetails === null || billDetails === void 0 ? void 0 : billDetails.billAccountDetails]);
  React.useEffect(() => {
    let allowPayment = minAmountPayable && amount >= minAmountPayable && amount <= getTotal() && !formError;
    if ((businessService === "WS" || businessService === "SW") && amount > getTotal() && isAdvanceAllowed) {
      allowPayment = minAmountPayable && amount >= minAmountPayable && !formError;
    }
    if (paymentType != t("CS_PAYMENT_FULL_AMOUNT")) setPaymentAllowed(allowPayment);else setPaymentAllowed(true);
  }, [paymentType, amount]);
  React.useEffect(() => {
    if (!bill && data) {
      let requiredBill = data.Bill.filter(e => e.consumerCode == consumerCode)[0];
      setBill(requiredBill);
    }
  }, [data]);
  React.useEffect(() => {
    if (paymentType !== t("CS_PAYMENT_FULL_AMOUNT")) onChangeAmount(amount.toString());else {
      setError("");
      changeAmount(getTotal());
    }
  }, [paymentType, bill]);
  React.useEffect(() => {
    if (paymentType !== t("CS_PAYMENT_FULL_AMOUNT")) onChange({
      amount,
      paymentAllowed,
      error: formError,
      minAmountPayable
    });else onChange({
      amount: getTotal(),
      paymentAllowed: true,
      error: formError,
      minAmountPayable
    });
  }, [paymentAllowed, formError, amount, paymentType]);
  const onChangeAmount = value => {
    setError("");
    if (isNaN(value) || value.includes(".")) {
      setError("AMOUNT_INVALID");
    } else if (!isAdvanceAllowed && value > getTotal()) {
      setError("CS_ADVANCED_PAYMENT_NOT_ALLOWED");
    } else if (value < minAmountPayable) {
      setError("CS_CANT_PAY_BELOW_MIN_AMOUNT");
    }
    changeAmount(value);
  };
  if (isLoading || mdmsLoading) return /*#__PURE__*/React__default.createElement(digitUiReactComponents.Loader, null);
  const getFinancialYear = _bill => {
    const {
      fromPeriod,
      toPeriod
    } = _bill;
    let from = new Date(fromPeriod).getFullYear().toString();
    let to = new Date(toPeriod).getFullYear().toString();
    return from + "-" + to;
  };
  const getBillingPeriod = _bill => {
    const {
      fromPeriod,
      toPeriod
    } = _bill;
    let from = new Date(fromPeriod).toLocaleDateString();
    let to = new Date(toPeriod).toLocaleDateString();
    return from + "-" + to;
  };
  const thStyle = {
    textAlign: "left",
    borderBottom: "#D6D5D4 1px solid",
    padding: "16px 12px",
    whiteSpace: "break-spaces"
  };
  const tdStyle = {
    textAlign: "left",
    borderBottom: "#D6D5D4 1px solid",
    padding: "8px 10px",
    breakWord: "no-break"
  };
  const config = BillDetailsKeyNoteConfig()[ModuleWorkflow ? ModuleWorkflow : businessService];
  const getAdvanceAmountPaid = (applicationData === null || applicationData === void 0 ? void 0 : applicationData.applicationStatus) === "DSO_INPROGRESS";
  const renderArrearDetailsForWNS = () => {
    var _yearWiseBills$filter, _yearWiseBills$filter2, _yearWiseBills$filter3, _yearWiseBills$filter4, _yearWiseBills$filter5;
    return /*#__PURE__*/React__default.createElement("table", {
      className: "table-fixed-column-common-pay"
    }, /*#__PURE__*/React__default.createElement("thead", null, /*#__PURE__*/React__default.createElement("tr", null, /*#__PURE__*/React__default.createElement("th", {
      style: thStyle
    }, t("CS_BILL_NO")), /*#__PURE__*/React__default.createElement("th", {
      style: {
        ...thStyle
      }
    }, t("CS_PAYMENT_BILLING_PERIOD")), /*#__PURE__*/React__default.createElement("th", {
      style: {
        ...thStyle
      }
    }, t("CS_BILL_DUEDATE")), yearWiseBills === null || yearWiseBills === void 0 ? void 0 : (_yearWiseBills$filter = yearWiseBills.filter((e, ind) => ind > 0)) === null || _yearWiseBills$filter === void 0 ? void 0 : (_yearWiseBills$filter2 = _yearWiseBills$filter[0]) === null || _yearWiseBills$filter2 === void 0 ? void 0 : (_yearWiseBills$filter3 = _yearWiseBills$filter2.billAccountDetails) === null || _yearWiseBills$filter3 === void 0 ? void 0 : (_yearWiseBills$filter4 = _yearWiseBills$filter3.sort((a, b) => a.order - b.order)) === null || _yearWiseBills$filter4 === void 0 ? void 0 : _yearWiseBills$filter4.map((head, index) => /*#__PURE__*/React__default.createElement("th", {
      style: {
        ...thStyle
      },
      key: index
    }, t(head.taxHeadCode))), /*#__PURE__*/React__default.createElement("th", {
      style: thStyle
    }, t("TOTAL_TAX")))), /*#__PURE__*/React__default.createElement("tbody", null, yearWiseBills === null || yearWiseBills === void 0 ? void 0 : (_yearWiseBills$filter5 = yearWiseBills.filter((e, ind) => ind > 0)) === null || _yearWiseBills$filter5 === void 0 ? void 0 : _yearWiseBills$filter5.map((year_bill, index) => {
      var _year_bill$billAccoun;
      const sorted_tax_heads = year_bill === null || year_bill === void 0 ? void 0 : (_year_bill$billAccoun = year_bill.billAccountDetails) === null || _year_bill$billAccoun === void 0 ? void 0 : _year_bill$billAccoun.sort((a, b) => a.order - b.order);
      return /*#__PURE__*/React__default.createElement("tr", {
        key: index
      }, /*#__PURE__*/React__default.createElement("td", {
        style: tdStyle
      }, year_bill === null || year_bill === void 0 ? void 0 : year_bill.billNumber), /*#__PURE__*/React__default.createElement("td", {
        style: tdStyle
      }, getBillingPeriod(year_bill)), /*#__PURE__*/React__default.createElement("td", {
        style: tdStyle
      }, (year_bill === null || year_bill === void 0 ? void 0 : year_bill.expiryDate) && new Date(year_bill === null || year_bill === void 0 ? void 0 : year_bill.expiryDate).toLocaleDateString()), sorted_tax_heads.map((e, i) => /*#__PURE__*/React__default.createElement("td", {
        style: tdStyle,
        key: i
      }, e.amount)), /*#__PURE__*/React__default.createElement("td", {
        style: tdStyle
      }, year_bill.amount));
    })));
  };
  const handleAmountPerTrip = event => {
    const {
      value
    } = event.target;
    setAmountPerTrip(value);
    application.additionalDetails.tripAmount = value;
  };
  const handleTotalFSM = event => {
    const {
      value
    } = event.target;
    setTotalFSM(value);
    application.totalAmount = value;
  };
  const handleAdvanceAmount = event => {
    const {
      value
    } = event.target;
    setAdvanceAmount(value);
    applicationData.advanceAmount = value;
  };
  const handleAmountTobePaid = event => {
    const {
      value
    } = event.target;
    setDueAmount(value);
    bill.totalAmount = value;
  };
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(digitUiReactComponents.StatusTable, null, !checkFSM && bill && config.details.map((obj, index) => {
    const value = obj.keyPath.reduce((acc, key) => {
      if (typeof key === "function") acc = key(acc);else acc = acc[key];
      return acc;
    }, bill);
    return /*#__PURE__*/React__default.createElement(digitUiReactComponents.Row, {
      key: index + "bill",
      label: t(obj.keyValue),
      text: value
    });
  })), checkFSM ? /*#__PURE__*/React__default.createElement(digitUiReactComponents.StatusTable, null, /*#__PURE__*/React__default.createElement(digitUiReactComponents.Row, {
    label: t("ES_PAYMENT_DETAILS_AMOUNT_PER_TRIP"),
    textStyle: {
      textAlign: "left"
    },
    text: "₹ " + Number(getAmountPerTrip()).toFixed(2)
  }), /*#__PURE__*/React__default.createElement("label", null, t("ES_PAYMENT_DETAILS_AMOUNT_PER_TRIP"), " : "), /*#__PURE__*/React__default.createElement(digitUiReactComponents.TextInput, {
    style: {
      width: "30%"
    },
    className: "amountPrTrip",
    key: "1",
    name: "amountPrTrip",
    value: Number(getAmountPerTrip()),
    onChange: handleAmountPerTrip,
    title: t("ES_PAYMENT_DETAILS_AMOUNT_PER_TRIP")
  }), /*#__PURE__*/React__default.createElement(digitUiReactComponents.Row, {
    label: t("ES_PAYMENT_DETAILS_TOTAL_AMOUNT"),
    textStyle: {
      textAlign: "left"
    },
    text: !(applicationData !== null && applicationData !== void 0 && applicationData.paymentPreference) ? "₹ " + Number(getTotalFSM()).toFixed(2) : "₹ " + Number(bill === null || bill === void 0 ? void 0 : bill.totalAmount).toFixed(2)
  }), /*#__PURE__*/React__default.createElement("label", null, t("ES_PAYMENT_DETAILS_TOTAL_AMOUNT"), " : "), /*#__PURE__*/React__default.createElement(digitUiReactComponents.TextInput, {
    style: {
      width: "30%"
    },
    className: "amountTotalAmount",
    key: "2",
    name: "amountTotalAmount",
    value: Number(getTotalFSM()),
    onChange: handleTotalFSM,
    title: t("ES_PAYMENT_DETAILS_TOTAL_AMOUNT")
  }), !(applicationData !== null && applicationData !== void 0 && applicationData.paymentPreference) && (getAdvanceAmountPaid ? /*#__PURE__*/React__default.createElement(React.Fragment, null, /*#__PURE__*/React__default.createElement(digitUiReactComponents.Row, {
    label: t("ES_PAYMENT_DETAILS_ADV_AMOUNT_PAID"),
    textStyle: {
      fontWeight: "bold",
      textAlign: "left"
    },
    text: "₹ " + Number(getAdvanceAmount()).toFixed(2)
  }), /*#__PURE__*/React__default.createElement("label", null, t("ES_PAYMENT_DETAILS_ADV_AMOUNT_PAID"), " : "), /*#__PURE__*/React__default.createElement(digitUiReactComponents.TextInput, {
    style: {
      width: "30%"
    },
    className: "amountTotalPaid",
    key: "3",
    name: "amountTotalPaid",
    value: Number(getAdvanceAmount()),
    onChange: handleAdvanceAmount,
    title: t("ES_PAYMENT_DETAILS_ADV_AMOUNT_PAID")
  })) : /*#__PURE__*/React__default.createElement(React.Fragment, null, /*#__PURE__*/React__default.createElement(digitUiReactComponents.Row, {
    label: t("ES_PAYMENT_DETAILS_ADV_AMOUNT_DUE"),
    textStyle: {
      fontWeight: "bold",
      textAlign: "left"
    },
    text: "₹ " + Number(getAdvanceAmount()).toFixed(2)
  }), /*#__PURE__*/React__default.createElement("label", null, t("ES_PAYMENT_DETAILS_ADV_AMOUNT_DUE"), " : "), /*#__PURE__*/React__default.createElement(digitUiReactComponents.TextInput, {
    style: {
      width: "30%"
    },
    className: "amountTotalDue",
    key: "4",
    name: "amountTotalDue",
    value: Number(getAdvanceAmount()),
    onChange: handleAdvanceAmount,
    title: t("ES_PAYMENT_DETAILS_ADV_AMOUNT_DUE")
  }))), (applicationData === null || applicationData === void 0 ? void 0 : applicationData.applicationStatus) !== "PENDING_APPL_FEE_PAYMENT" ? /*#__PURE__*/React__default.createElement(React.Fragment, null, /*#__PURE__*/React__default.createElement(digitUiReactComponents.Row, {
    label: t("FSM_DUE_AMOUNT_TO_BE_PAID"),
    textStyle: {
      fontWeight: "bold",
      textAlign: "left"
    },
    text: "₹ " + Number(dueAmountTobePaid()).toFixed(2)
  }), /*#__PURE__*/React__default.createElement("label", null, t("FSM_DUE_AMOUNT_TO_BE_PAID"), " : "), /*#__PURE__*/React__default.createElement(digitUiReactComponents.TextInput, {
    style: {
      width: "30%"
    },
    className: "amountTotalDuePaid",
    key: "4",
    name: "amountTotalDuePaid",
    value: Number(dueAmountTobePaid()),
    onChange: handleAmountTobePaid,
    title: t("FSM_DUE_AMOUNT_TO_BE_PAID")
  })) : null) : /*#__PURE__*/React__default.createElement(digitUiReactComponents.StatusTable, {
    style: {
      paddingTop: "46px"
    }
  }, /*#__PURE__*/React__default.createElement(digitUiReactComponents.Row, {
    label: t("ES_PAYMENT_TAXHEADS"),
    textStyle: {
      fontWeight: "bold"
    },
    text: t("ES_PAYMENT_AMOUNT")
  }), /*#__PURE__*/React__default.createElement("hr", {
    style: {
      width: "40%"
    },
    className: "underline"
  }), billDetails === null || billDetails === void 0 ? void 0 : (_billDetails$billAcco = billDetails.billAccountDetails) === null || _billDetails$billAcco === void 0 ? void 0 : _billDetails$billAcco.sort((a, b) => a.order - b.order).map((amountDetails, index) => {
    var _amountDetails$amount;
    return /*#__PURE__*/React__default.createElement(digitUiReactComponents.Row, {
      key: index + "taxheads",
      labelStyle: {
        fontWeight: "normal"
      },
      textStyle: {
        textAlign: "right",
        maxWidth: "100px"
      },
      label: t(amountDetails.taxHeadCode),
      text: "₹ " + ((_amountDetails$amount = amountDetails.amount) === null || _amountDetails$amount === void 0 ? void 0 : _amountDetails$amount.toFixed(2))
    });
  }), arrears !== null && arrears !== void 0 && (_arrears$toFixed = arrears.toFixed) !== null && _arrears$toFixed !== void 0 && _arrears$toFixed.call(arrears, 2) ? /*#__PURE__*/React__default.createElement(digitUiReactComponents.Row, {
    labelStyle: {
      fontWeight: "normal"
    },
    textStyle: {
      textAlign: "right",
      maxWidth: "100px"
    },
    label: t("COMMON_ARREARS"),
    text: "₹ " + (arrears === null || arrears === void 0 ? void 0 : (_arrears$toFixed2 = arrears.toFixed) === null || _arrears$toFixed2 === void 0 ? void 0 : _arrears$toFixed2.call(arrears, 2)) || Number(0).toFixed(2)
  }) : null, /*#__PURE__*/React__default.createElement("hr", {
    style: {
      width: "40%"
    },
    className: "underline"
  }), /*#__PURE__*/React__default.createElement(digitUiReactComponents.Row, {
    label: t("CS_PAYMENT_TOTAL_AMOUNT"),
    textStyle: {
      fontWeight: "bold",
      textAlign: "right",
      maxWidth: "100px"
    },
    text: "₹ " + Number(getTotal()).toFixed(2)
  }), !showDetails && !ModuleWorkflow && businessService !== "TL" && (yearWiseBills === null || yearWiseBills === void 0 ? void 0 : yearWiseBills.length) > 1 && /*#__PURE__*/React__default.createElement(React.Fragment, null, businessService === "WS" || "SW" ? /*#__PURE__*/React__default.createElement("div", {
    className: "row last"
  }, /*#__PURE__*/React__default.createElement("div", {
    style: {
      maxWidth: "100px"
    },
    onClick: () => setShowDetails(true),
    className: "filter-button value"
  }, t("ES_COMMON_VIEW_DETAILS"))) : /*#__PURE__*/React__default.createElement("div", {
    className: "row last"
  }, /*#__PURE__*/React__default.createElement("h2", null), /*#__PURE__*/React__default.createElement("div", {
    style: {
      textAlign: "right",
      maxWidth: "100px"
    },
    onClick: () => setShowDetails(true),
    className: "filter-button value"
  }, t("ES_COMMON_VIEW_DETAILS"))))), showDetails && (yearWiseBills === null || yearWiseBills === void 0 ? void 0 : yearWiseBills.length) > 1 && !ModuleWorkflow && businessService !== "TL" && /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    style: {
      maxWidth: "95%",
      display: "inline-block",
      textAlign: "right"
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    style: {
      display: "flex",
      padding: "10px",
      paddingLeft: "unset",
      maxWidth: "95%"
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    style: {
      backgroundColor: "#EEEEEE",
      overflowX: "auto"
    }
  }, businessService === "WS" || "SW" ? renderArrearDetailsForWNS() : /*#__PURE__*/React__default.createElement("table", {
    className: "table-fixed-column-common-pay"
  }, /*#__PURE__*/React__default.createElement("thead", null, /*#__PURE__*/React__default.createElement("tr", null, /*#__PURE__*/React__default.createElement("th", {
    style: thStyle
  }, t("FINANCIAL_YEAR")), /*#__PURE__*/React__default.createElement("th", {
    style: {
      ...thStyle
    }
  }, t("CS_BILL_NO")), /*#__PURE__*/React__default.createElement("th", {
    style: {
      ...thStyle
    }
  }, t("CS_BILL_DUEDATE")), yearWiseBills === null || yearWiseBills === void 0 ? void 0 : (_yearWiseBills$filter6 = yearWiseBills.filter((e, ind) => ind > 0)) === null || _yearWiseBills$filter6 === void 0 ? void 0 : (_yearWiseBills$filter7 = _yearWiseBills$filter6[0]) === null || _yearWiseBills$filter7 === void 0 ? void 0 : (_yearWiseBills$filter8 = _yearWiseBills$filter7.billAccountDetails) === null || _yearWiseBills$filter8 === void 0 ? void 0 : (_yearWiseBills$filter9 = _yearWiseBills$filter8.sort((a, b) => a.order - b.order)) === null || _yearWiseBills$filter9 === void 0 ? void 0 : _yearWiseBills$filter9.map((head, index) => /*#__PURE__*/React__default.createElement("th", {
    style: {
      ...thStyle
    },
    key: index
  }, t(head.taxHeadCode))), /*#__PURE__*/React__default.createElement("th", {
    style: thStyle
  }, t("TOTAL_TAX")))), /*#__PURE__*/React__default.createElement("tbody", null, yearWiseBills === null || yearWiseBills === void 0 ? void 0 : (_yearWiseBills$filter10 = yearWiseBills.filter((e, ind) => ind > 0)) === null || _yearWiseBills$filter10 === void 0 ? void 0 : _yearWiseBills$filter10.map((year_bill, index) => {
    var _year_bill$billAccoun2;
    const sorted_tax_heads = year_bill === null || year_bill === void 0 ? void 0 : (_year_bill$billAccoun2 = year_bill.billAccountDetails) === null || _year_bill$billAccoun2 === void 0 ? void 0 : _year_bill$billAccoun2.sort((a, b) => a.order - b.order);
    return /*#__PURE__*/React__default.createElement("tr", {
      key: index
    }, /*#__PURE__*/React__default.createElement("td", {
      style: tdStyle
    }, getFinancialYear(year_bill)), /*#__PURE__*/React__default.createElement("td", {
      style: tdStyle
    }, year_bill === null || year_bill === void 0 ? void 0 : year_bill.billNumber), /*#__PURE__*/React__default.createElement("td", {
      style: tdStyle
    }, (year_bill === null || year_bill === void 0 ? void 0 : year_bill.expiryDate) && new Date(year_bill === null || year_bill === void 0 ? void 0 : year_bill.expiryDate).toLocaleDateString()), sorted_tax_heads.map((e, i) => /*#__PURE__*/React__default.createElement("td", {
      style: tdStyle,
      key: i
    }, e.amount)), /*#__PURE__*/React__default.createElement("td", {
      style: tdStyle
    }, year_bill.amount));
  }))))), businessService === "WS" || "SW" ? /*#__PURE__*/React__default.createElement("div", {
    style: {
      float: "left"
    },
    onClick: () => setShowDetails(false),
    className: "filter-button"
  }, t("ES_COMMON_HIDE_DETAILS")) : /*#__PURE__*/React__default.createElement("div", {
    style: {
      float: "right"
    },
    onClick: () => setShowDetails(false),
    className: "filter-button"
  }, t("ES_COMMON_HIDE_DETAILS")))), !checkFSM && (paymentRules === null || paymentRules === void 0 ? void 0 : paymentRules.partPaymentAllowed) && /*#__PURE__*/React__default.createElement("div", {
    style: {
      marginTop: "50px"
    },
    className: "bill-payment-amount"
  }, /*#__PURE__*/React__default.createElement(digitUiReactComponents.CardSectionHeader, null, t("CS_COMMON_PAYMENT_AMOUNT")), /*#__PURE__*/React__default.createElement(digitUiReactComponents.RadioButtons, {
    style: {
      display: "flex"
    },
    innerStyles: {
      padding: "5px"
    },
    selectedOption: paymentType,
    onSelect: setPaymentType,
    options: paymentRules.partPaymentAllowed ? [t("CS_PAYMENT_FULL_AMOUNT"), t("CS_PAYMENT_CUSTOM_AMOUNT")] : [t("CS_PAYMENT_FULL_AMOUNT")]
  }), /*#__PURE__*/React__default.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "payment-amount-front",
    style: {
      border: "1px solid " + (paymentType === t("CS_PAYMENT_FULL_AMOUNT") ? "#9a9a9a" : "black")
    }
  }, "\u20B9"), paymentType !== t("CS_PAYMENT_FULL_AMOUNT") ? /*#__PURE__*/React__default.createElement(digitUiReactComponents.TextInput, {
    style: {
      width: "30%"
    },
    className: "text-indent-xl",
    onChange: e => onChangeAmount(e.target.value),
    value: amount,
    disable: getTotal() === 0
  }) : /*#__PURE__*/React__default.createElement(digitUiReactComponents.TextInput, {
    style: {
      width: "30%"
    },
    className: "text-indent-xl",
    value: getTotal(),
    disable: true
  }), formError === "CS_CANT_PAY_BELOW_MIN_AMOUNT" ? /*#__PURE__*/React__default.createElement("span", {
    className: "card-label-error"
  }, t(formError), ": ", "₹" + minAmountPayable) : /*#__PURE__*/React__default.createElement("span", {
    className: "card-label-error"
  }, t(formError)))));
};

const CollectPayment = props => {
  var _businessService$toUp;
  const {
    workflow: ModuleWorkflow,
    IsDisconnectionFlow
  } = Digit.Hooks.useQueryParams();
  const {
    t
  } = reactI18next.useTranslation();
  const history = reactRouterDom.useHistory();
  const queryClient = reactQuery.useQueryClient();
  const {
    path: currentPath
  } = reactRouterDom.useRouteMatch();
  let {
    consumerCode,
    businessService
  } = reactRouterDom.useParams();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const search = reactRouterDom.useLocation().search;
  if (window.location.href.includes("ISWSAPP")) consumerCode = new URLSearchParams(search).get("applicationNumber");
  if (window.location.href.includes("ISWSCON") || ModuleWorkflow === "WS") consumerCode = decodeURIComponent(consumerCode);
  const {
    data: paymentdetails,
    isLoading
  } = Digit.Hooks.useFetchPayment({
    tenantId: tenantId,
    consumerCode,
    businessService
  });
  const bill = paymentdetails !== null && paymentdetails !== void 0 && paymentdetails.Bill ? paymentdetails === null || paymentdetails === void 0 ? void 0 : paymentdetails.Bill[0] : {};
  const {
    data: applicationData
  } = Digit.Hooks.fsm.useSearch(tenantId, {
    applicationNos: consumerCode
  }, {
    staleTime: Infinity,
    enabled: businessService !== null && businessService !== void 0 && (_businessService$toUp = businessService.toUpperCase()) !== null && _businessService$toUp !== void 0 && _businessService$toUp.includes("FSM") ? true : false
  });
  const advanceBill = applicationData === null || applicationData === void 0 ? void 0 : applicationData.advanceAmount;
  const {
    cardConfig
  } = useCardPaymentDetails(props, t);
  const {
    upiConfig
  } = useUpiPaymentDetails(props, t);
  const {
    chequeConfig
  } = useChequeDetails(props, t);
  const {
    cashConfig
  } = useCashPaymentDetails(props, t);
  const [formState, setFormState] = React.useState({});
  const [toast, setToast] = React.useState(null);
  React.useEffect(() => {
    if (paymentdetails !== null && paymentdetails !== void 0 && paymentdetails.Bill && paymentdetails.Bill.length === 0) {
      setToast({
        key: "error",
        action: "CS_BILL_NOT_FOUND"
      });
    }
  }, [paymentdetails]);
  const defaultPaymentModes = [{
    code: "CASH",
    label: t("COMMON_MASTERS_PAYMENTMODE_CASH")
  }, {
    code: "CHEQUE",
    label: t("COMMON_MASTERS_PAYMENTMODE_CHEQUE")
  }, {
    code: "CARD",
    label: t("COMMON_MASTERS_PAYMENTMODE_CREDIT/DEBIT CARD")
  }, {
    code: "UPI",
    label: t("COMMON_MASTERS_PAYMENTMODE_UPI")
  }];
  const formConfigMap = {
    CHEQUE: chequeConfig,
    CARD: cardConfig,
    UPI: upiConfig
  };
  React.useEffect(() => {
    props.setLink(t("PAYMENT_COLLECT_LABEL"));
  }, []);
  const getPaymentModes = () => defaultPaymentModes;
  const paidByMenu = [{
    code: "OWNER",
    name: t("COMMON_OWNER")
  }, {
    code: "OTHER",
    name: t("COMMON_OTHER")
  }];
  const [selectedPaymentMode, setPaymentMode] = React.useState((formState === null || formState === void 0 ? void 0 : formState.selectedPaymentMode) || getPaymentModes()[0]);
  const [selectedPaidBy, setselectedPaidBy] = React.useState((formState === null || formState === void 0 ? void 0 : formState.paidBy) || {
    code: "OWNER",
    name: t("COMMON_OWNER")
  });
  const onSubmit = function (data) {
    try {
      var _data$amount, _data$amount6, _data$amount7, _data$paymentMode, _data$paymentModeDeta, _recieptRequest$Payme2, _recieptRequest$Payme3, _recieptRequest$Payme4, _recieptRequest$Payme5, _recieptRequest$Payme6;
      bill.totalAmount = Math.round(bill.totalAmount);
      data.paidBy = data.paidBy.code;
      if (BillDetailsFormConfig({
        consumerCode,
        businessService
      }, t)[ModuleWorkflow ? businessService === "SW" && ModuleWorkflow === "WS" ? businessService : ModuleWorkflow : businessService] && !(data !== null && data !== void 0 && (_data$amount = data.amount) !== null && _data$amount !== void 0 && _data$amount.paymentAllowed)) {
        var _data$amount2, _data$amount3, _data$amount4, _data$amount5;
        let action = (data === null || data === void 0 ? void 0 : (_data$amount2 = data.amount) === null || _data$amount2 === void 0 ? void 0 : _data$amount2.error) === "CS_CANT_PAY_BELOW_MIN_AMOUNT" ? t(data === null || data === void 0 ? void 0 : (_data$amount3 = data.amount) === null || _data$amount3 === void 0 ? void 0 : _data$amount3.error) + "- " + (data === null || data === void 0 ? void 0 : (_data$amount4 = data.amount) === null || _data$amount4 === void 0 ? void 0 : _data$amount4.minAmountPayable) : t(data === null || data === void 0 ? void 0 : (_data$amount5 = data.amount) === null || _data$amount5 === void 0 ? void 0 : _data$amount5.error);
        setToast({
          key: "error",
          action
        });
        return Promise.resolve();
      }
      const {
        ManualRecieptDetails,
        paymentModeDetails,
        ...rest
      } = data;
      const {
        errorObj,
        ...details
      } = paymentModeDetails || {};
      let recieptRequest = {
        Payment: {
          mobileNumber: data.payerMobile,
          paymentDetails: [{
            businessService,
            billId: bill.id,
            totalDue: bill.totalAmount,
            totalAmountPaid: (data === null || data === void 0 ? void 0 : (_data$amount6 = data.amount) === null || _data$amount6 === void 0 ? void 0 : _data$amount6.amount) || bill.totalAmount
          }],
          tenantId: bill.tenantId,
          totalDue: bill.totalAmount,
          totalAmountPaid: (data === null || data === void 0 ? void 0 : (_data$amount7 = data.amount) === null || _data$amount7 === void 0 ? void 0 : _data$amount7.amount) || bill.totalAmount,
          paymentMode: data.paymentMode.code,
          payerName: data.payerName,
          paidBy: data.paidBy
        }
      };
      if (advanceBill !== null && (applicationData === null || applicationData === void 0 ? void 0 : applicationData.applicationStatus) === "PENDING_APPL_FEE_PAYMENT" && !applicationData.paymentPreference) {
        recieptRequest.Payment.paymentDetails[0].totalAmountPaid = advanceBill, recieptRequest.Payment.totalAmountPaid = advanceBill, recieptRequest.Payment.totalDue = bill.totalAmount;
      }
      if (data.ManualRecieptDetails.manualReceiptDate) {
        recieptRequest.Payment.paymentDetails[0].manualReceiptDate = new Date(ManualRecieptDetails.manualReceiptDate).getTime();
      }
      if (data.ManualRecieptDetails.manualReceiptNumber) {
        recieptRequest.Payment.paymentDetails[0].manualReceiptNumber = ManualRecieptDetails.manualReceiptNumber;
      }
      recieptRequest.Payment.paymentMode = data === null || data === void 0 ? void 0 : (_data$paymentMode = data.paymentMode) === null || _data$paymentMode === void 0 ? void 0 : _data$paymentMode.code;
      if (data.paymentModeDetails) {
        var _recieptRequest$Payme;
        recieptRequest.Payment = {
          ...recieptRequest.Payment,
          ...details
        };
        delete recieptRequest.Payment.paymentModeDetails;
        if (data.paymentModeDetails.errorObj) {
          const errors = data.paymentModeDetails.errorObj;
          const messages = Object.keys(errors).map(e => t(errors[e])).join();
          if (messages) {
            setToast({
              key: "error",
              action: messages + " " + t("ES_ERROR_REQUIRED")
            });
            setTimeout(() => setToast(null), 5000);
            return Promise.resolve();
          }
        }
        if (data.errorMsg) setToast({
          key: "error",
          action: t(errorMsg)
        });
        recieptRequest.Payment.instrumentDate = new Date(recieptRequest === null || recieptRequest === void 0 ? void 0 : (_recieptRequest$Payme = recieptRequest.Payment) === null || _recieptRequest$Payme === void 0 ? void 0 : _recieptRequest$Payme.instrumentDate).getTime();
        recieptRequest.Payment.transactionNumber = data.paymentModeDetails.transactionNumber;
      }
      if (data !== null && data !== void 0 && (_data$paymentModeDeta = data.paymentModeDetails) !== null && _data$paymentModeDeta !== void 0 && _data$paymentModeDeta.transactionNumber) {
        if (data.paymentModeDetails.transactionNumber !== data.paymentModeDetails.reTransanctionNumber && ["CARD"].includes(data.paymentMode.code)) {
          setToast({
            key: "error",
            action: t("ERR_TRASACTION_NUMBERS_DONT_MATCH")
          });
          setTimeout(() => setToast(null), 5000);
          return Promise.resolve();
        }
        delete recieptRequest.Payment.last4Digits;
        delete recieptRequest.Payment.reTransanctionNumber;
      }
      if ((_recieptRequest$Payme2 = recieptRequest.Payment) !== null && _recieptRequest$Payme2 !== void 0 && (_recieptRequest$Payme3 = _recieptRequest$Payme2.instrumentNumber) !== null && _recieptRequest$Payme3 !== void 0 && _recieptRequest$Payme3.length && ((_recieptRequest$Payme4 = recieptRequest.Payment) === null || _recieptRequest$Payme4 === void 0 ? void 0 : (_recieptRequest$Payme5 = _recieptRequest$Payme4.instrumentNumber) === null || _recieptRequest$Payme5 === void 0 ? void 0 : _recieptRequest$Payme5.length) < 6 && (recieptRequest === null || recieptRequest === void 0 ? void 0 : (_recieptRequest$Payme6 = recieptRequest.Payment) === null || _recieptRequest$Payme6 === void 0 ? void 0 : _recieptRequest$Payme6.paymentMode) === "CHEQUE") {
        setToast({
          key: "error",
          action: t("ERR_CHEQUE_NUMBER_LESS_THAN_6")
        });
        setTimeout(() => setToast(null), 5000);
        return Promise.resolve();
      }
      const _temp = _catch(function () {
        return Promise.resolve(Digit.PaymentService.createReciept(tenantId, recieptRequest)).then(function (resposne) {
          var _resposne$Payments$, _resposne$Payments$$p, _resposne$Payments$2, _resposne$Payments$2$, _resposne$Payments$2$2, _resposne$Payments$3, _resposne$Payments$3$, _resposne$Payments$4, _resposne$Payments$4$, _resposne$Payments$4$2;
          queryClient.invalidateQueries();
          history.push(IsDisconnectionFlow ? props.basePath + "/success/" + businessService + "/" + (resposne === null || resposne === void 0 ? void 0 : (_resposne$Payments$ = resposne.Payments[0]) === null || _resposne$Payments$ === void 0 ? void 0 : (_resposne$Payments$$p = _resposne$Payments$.paymentDetails[0]) === null || _resposne$Payments$$p === void 0 ? void 0 : _resposne$Payments$$p.receiptNumber.replace(/\//g, "%2F")) + "/" + (resposne === null || resposne === void 0 ? void 0 : (_resposne$Payments$2 = resposne.Payments[0]) === null || _resposne$Payments$2 === void 0 ? void 0 : (_resposne$Payments$2$ = _resposne$Payments$2.paymentDetails[0]) === null || _resposne$Payments$2$ === void 0 ? void 0 : (_resposne$Payments$2$2 = _resposne$Payments$2$.bill) === null || _resposne$Payments$2$2 === void 0 ? void 0 : _resposne$Payments$2$2.consumerCode) + "?IsDisconnectionFlow=" + IsDisconnectionFlow : props.basePath + "/success/" + businessService + "/" + (resposne === null || resposne === void 0 ? void 0 : (_resposne$Payments$3 = resposne.Payments[0]) === null || _resposne$Payments$3 === void 0 ? void 0 : (_resposne$Payments$3$ = _resposne$Payments$3.paymentDetails[0]) === null || _resposne$Payments$3$ === void 0 ? void 0 : _resposne$Payments$3$.receiptNumber.replace(/\//g, "%2F")) + "/" + (resposne === null || resposne === void 0 ? void 0 : (_resposne$Payments$4 = resposne.Payments[0]) === null || _resposne$Payments$4 === void 0 ? void 0 : (_resposne$Payments$4$ = _resposne$Payments$4.paymentDetails[0]) === null || _resposne$Payments$4$ === void 0 ? void 0 : (_resposne$Payments$4$2 = _resposne$Payments$4$.bill) === null || _resposne$Payments$4$2 === void 0 ? void 0 : _resposne$Payments$4$2.consumerCode) + "?IsDisconnectionFlow=" + IsDisconnectionFlow);
        });
      }, function (error) {
        var _setToast, _error$response, _error$response$data, _error$response$data$;
        (_setToast = setToast({
          key: "error",
          action: error === null || error === void 0 ? void 0 : (_error$response = error.response) === null || _error$response === void 0 ? void 0 : (_error$response$data = _error$response.data) === null || _error$response$data === void 0 ? void 0 : (_error$response$data$ = _error$response$data.Errors) === null || _error$response$data$ === void 0 ? void 0 : _error$response$data$.map(e => t(e.code))
        })) === null || _setToast === void 0 ? void 0 : _setToast.join(" , ");
        setTimeout(() => setToast(null), 5000);
      });
      return Promise.resolve(_temp && _temp.then ? _temp.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
  React.useEffect(() => {
    var _document, _document$getElementB, _document2, _document2$querySelec;
    (_document = document) === null || _document === void 0 ? void 0 : (_document$getElementB = _document.getElementById("paymentInfo")) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.scrollIntoView({
      behavior: "smooth"
    });
    (_document2 = document) === null || _document2 === void 0 ? void 0 : (_document2$querySelec = _document2.querySelector("#paymentInfo + .label-field-pair input")) === null || _document2$querySelec === void 0 ? void 0 : _document2$querySelec.focus();
  }, [selectedPaymentMode]);
  let config = [{
    head: !ModuleWorkflow && businessService !== "TL" ? t("COMMON_PAYMENT_HEAD") : "",
    body: [{
      label: t("PAY_TOTAL_AMOUNT"),
      populators: /*#__PURE__*/React__default.createElement(digitUiReactComponents.CardSectionHeader, {
        style: {
          marginBottom: 0,
          textAlign: "right"
        }
      }, " ", "\u20B9 " + (bill === null || bill === void 0 ? void 0 : bill.totalAmount), " ")
    }]
  }, {
    head: t("PAYMENT_PAID_BY_HEAD"),
    body: [{
      label: t("PAYMENT_PAID_BY_LABEL"),
      isMandatory: true,
      type: "custom",
      populators: {
        name: "paidBy",
        customProps: {
          t,
          isMendatory: true,
          option: paidByMenu,
          optionKey: "name"
        },
        component: (props, customProps) => /*#__PURE__*/React__default.createElement(digitUiReactComponents.Dropdown, _extends({}, customProps, {
          selected: props.value,
          select: d => {
            if (d.name == paidByMenu[0].name) {
              props.setValue("payerName", bill === null || bill === void 0 ? void 0 : bill.payerName);
            } else {
              props.setValue("payerName", "");
              props.setValue("payerMobile", "");
            }
            props.onChange(d);
            setselectedPaidBy(d);
          }
        })),
        defaultValue: (formState === null || formState === void 0 ? void 0 : formState.paidBy) || paidByMenu[0]
      }
    }, {
      label: t("PAYMENT_PAYER_NAME_LABEL"),
      isMandatory: true,
      disable: (selectedPaidBy === null || selectedPaidBy === void 0 ? void 0 : selectedPaidBy.code) === "OWNER" && (bill !== null && bill !== void 0 && bill.payerName || formState !== null && formState !== void 0 && formState.payerName) ? true : false,
      type: "text",
      populators: {
        name: "payerName",
        validation: {
          required: true,
          pattern: /^[A-Za-z]/
        },
        error: t("PAYMENT_INVALID_NAME"),
        defaultValue: (bill === null || bill === void 0 ? void 0 : bill.payerName) || (formState === null || formState === void 0 ? void 0 : formState.payerName) || "",
        className: "payment-form-text-input-correction"
      }
    }, {
      label: t("PAYMENT_PAYER_MOB_LABEL"),
      isMandatory: true,
      type: "text",
      populators: {
        name: "payerMobile",
        validation: {
          required: true,
          pattern: /^[6-9]\d{9}$/
        },
        error: t("CORE_COMMON_APPLICANT_MOBILE_NUMBER_INVALID"),
        className: "payment-form-text-input-correction"
      }
    }]
  }, {
    head: t("PAYMENT_MODE_HEAD"),
    body: [{
      label: t("PAYMENT_MODE_LABEL"),
      type: "custom",
      populators: {
        name: "paymentMode",
        customProps: {
          options: getPaymentModes(),
          optionsKey: "label",
          style: {
            display: "flex",
            flexWrap: "wrap"
          },
          innerStyles: {
            minWidth: "33%"
          }
        },
        defaultValue: (formState === null || formState === void 0 ? void 0 : formState.paymentMode) || getPaymentModes()[0],
        component: (props, customProps) => /*#__PURE__*/React__default.createElement(digitUiReactComponents.RadioButtons, _extends({
          selectedOption: props.value,
          onSelect: d => {
            props.onChange(d);
          }
        }, customProps))
      }
    }]
  }];
  const getDefaultValues = () => ({
    payerName: (bill === null || bill === void 0 ? void 0 : bill.payerName) || (formState === null || formState === void 0 ? void 0 : formState.payerName) || ""
  });
  const getFormConfig = () => {
    var _formState$paymentMod, _conf;
    if (BillDetailsFormConfig({
      consumerCode,
      businessService
    }, t)[ModuleWorkflow ? businessService === "SW" && ModuleWorkflow === "WS" ? businessService : ModuleWorkflow : businessService] || ModuleWorkflow || businessService === "TL" || businessService.includes("ONE_TIME_FEE")) {
      config.splice(0, 1);
    }
    let conf = config.concat(formConfigMap[formState === null || formState === void 0 ? void 0 : (_formState$paymentMod = formState.paymentMode) === null || _formState$paymentMod === void 0 ? void 0 : _formState$paymentMod.code] || []);
    conf = (_conf = conf) === null || _conf === void 0 ? void 0 : _conf.concat(cashConfig);
    return BillDetailsFormConfig({
      consumerCode,
      businessService
    }, t)[ModuleWorkflow ? businessService === "SW" && ModuleWorkflow === "WS" ? businessService : ModuleWorkflow : businessService] ? BillDetailsFormConfig({
      consumerCode,
      businessService
    }, t)[ModuleWorkflow ? businessService === "SW" && ModuleWorkflow === "WS" ? businessService : ModuleWorkflow : businessService].concat(conf) : conf;
  };
  const checkFSM = window.location.href.includes("FSM");
  if (isLoading) {
    return /*#__PURE__*/React__default.createElement(digitUiReactComponents.Loader, null);
  }
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(digitUiReactComponents.Header, {
    styles: {
      marginLeft: "15px"
    }
  }, checkFSM ? t("PAYMENT_COLLECT_LABEL") : t("PAYMENT_COLLECT")), /*#__PURE__*/React__default.createElement(digitUiReactComponents.FormComposer, {
    cardStyle: {
      paddingBottom: "100px"
    },
    label: t("PAYMENT_COLLECT_LABEL"),
    config: getFormConfig(),
    onSubmit: onSubmit,
    formState: formState,
    defaultValues: getDefaultValues(),
    isDisabled: IsDisconnectionFlow ? false : bill !== null && bill !== void 0 && bill.totalAmount ? !bill.totalAmount > 0 : true,
    onFormValueChange: (setValue, formValue) => {
      if (!isEqual_1(formValue.paymentMode, selectedPaymentMode)) {
        setFormState(formValue);
        setPaymentMode(formState.paymentMode);
      }
    }
  }), toast && /*#__PURE__*/React__default.createElement(digitUiReactComponents.Toast, {
    error: toast.key === "error",
    label: t(toast.key === "success" ? "ES_" + businessService.split(".")[0].toLowerCase() + "_" + toast.action + "_UPDATE_SUCCESS" : toast.action),
    onClose: () => setToast(null),
    style: {
      maxWidth: "670px"
    }
  }));
};

const SuccessfulPayment$1 = props => {
  var _location, _location$pathname, _data$6, _data$7, _data$8, _data$9, _data$10, _data$11, _data$12, _data$13, _data$14;
  const history = reactRouterDom.useHistory();
  const {
    t
  } = reactI18next.useTranslation();
  const queryClient = reactQuery.useQueryClient();
  const {
    IsDisconnectionFlow
  } = Digit.Hooks.useQueryParams();
  const [displayMenu, setDisplayMenu] = React.useState(false);
  const [selectedAction, setSelectedAction] = React.useState(null);
  const isFSMResponse = (_location = location) === null || _location === void 0 ? void 0 : (_location$pathname = _location.pathname) === null || _location$pathname === void 0 ? void 0 : _location$pathname.includes("payment/success/FSM.TRIP_CHARGES");
  const combineResponseFSM = isFSMResponse ? t("PAYMENT_COLLECT_LABEL") + " / " + t("PAYMENT_COLLECT") : t("PAYMENT_LOCALIZATION_RESPONSE");
  props.setLink(combineResponseFSM);
  let {
    consumerCode,
    receiptNumber,
    businessService
  } = reactRouterDom.useParams();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  receiptNumber = receiptNumber.replace(/%2F/g, "/");
  const {
    data = {},
    isLoading: isBpaSearchLoading,
    isSuccess: isBpaSuccess,
    error: bpaerror
  } = Digit.Hooks.obps.useOBPSSearch("", {}, tenantId, {
    applicationNo: consumerCode
  }, {}, {
    enabled: businessService !== null && businessService !== void 0 && businessService.includes("BPA") ? true : false
  });
  const FSM_EDITOR = Digit.UserService.hasAccess("FSM_EDITOR_EMP") || false;
  function onActionSelect(action) {
    setSelectedAction(action);
    setDisplayMenu(false);
  }
  React.useEffect(() => {
    return () => {
      const fetchData = function () {
        try {
          const tenantId = Digit.ULBService.getCurrentTenantId();
          const state = Digit.ULBService.getStateId();
          return Promise.resolve(Digit.PaymentService.getReciept(tenantId, businessService, {
            receiptNumbers: receiptNumber
          })).then(function (payments) {
            var _payments$Payments$;
            let response = {
              filestoreIds: [(_payments$Payments$ = payments.Payments[0]) === null || _payments$Payments$ === void 0 ? void 0 : _payments$Payments$.fileStoreId]
            };
            const _temp = function (_payments$Payments$2) {
              if (!((_payments$Payments$2 = payments.Payments[0]) !== null && _payments$Payments$2 !== void 0 && _payments$Payments$2.fileStoreId)) {
                return Promise.resolve(Digit.PaymentService.generatePdf(state, {
                  Payments: payments.Payments
                }, generatePdfKey)).then(function (_Digit$PaymentService) {
                  response = _Digit$PaymentService;
                });
              }
            }();
            if (_temp && _temp.then) return _temp.then(function () {});
          });
        } catch (e) {
          return Promise.reject(e);
        }
      };
      fetchData();
      queryClient.clear();
    };
  }, []);
  React.useEffect(() => {
    switch (selectedAction) {
      case "GO_TO_HOME":
        return history.push("/digit-ui/employee");
      case "ASSIGN_TO_DSO":
        return history.push("/digit-ui/employee/fsm/application-details/" + consumerCode);
      default:
        return null;
    }
  }, [selectedAction]);
  let ACTIONS = ["GO_TO_HOME"];
  if (FSM_EDITOR) {
    ACTIONS = [...ACTIONS, "ASSIGN_TO_DSO"];
  }
  const checkFSMResponse = businessService === null || businessService === void 0 ? void 0 : businessService.includes("FSM");
  const getMessage = () => t("ES_PAYMENT_COLLECTED");
  const getCardText = () => {
    if (businessService !== null && businessService !== void 0 && businessService.includes("BPA")) {
      let nameOfAchitect = sessionStorage.getItem("BPA_ARCHITECT_NAME");
      let parsedArchitectName = nameOfAchitect ? JSON.parse(nameOfAchitect) : "ARCHITECT";
      return t("ES_PAYMENT_" + businessService + "_" + parsedArchitectName + "_SUCCESSFUL_DESCRIPTION");
    } else if (businessService !== null && businessService !== void 0 && businessService.includes("WS") || businessService !== null && businessService !== void 0 && businessService.includes("SW")) {
      return t("ES_PAYMENT_WS_" + (businessService === null || businessService === void 0 ? void 0 : businessService.replace(/\./g, "_")) + "_SUCCESSFUL_DESCRIPTION");
    } else {
      return t("ES_PAYMENT_SUCCESSFUL_DESCRIPTION");
    }
  };
  const {
    data: generatePdfKey
  } = Digit.Hooks.useCommonMDMS(tenantId, "common-masters", "ReceiptKey", {
    select: data => {
      var _data$commonMasters, _data$commonMasters$u, _data$commonMasters$u2;
      return ((_data$commonMasters = data["common-masters"]) === null || _data$commonMasters === void 0 ? void 0 : (_data$commonMasters$u = _data$commonMasters.uiCommonPay) === null || _data$commonMasters$u === void 0 ? void 0 : (_data$commonMasters$u2 = _data$commonMasters$u.filter(_ref => {
        let {
          code
        } = _ref;
        return businessService === null || businessService === void 0 ? void 0 : businessService.includes(code);
      })[0]) === null || _data$commonMasters$u2 === void 0 ? void 0 : _data$commonMasters$u2.receiptKey) || "consolidatedreceipt";
    }
  });
  const printCertificate = function () {
    try {
      const tenantId = Digit.ULBService.getCurrentTenantId();
      const state = Digit.ULBService.getStateId();
      return Promise.resolve(Digit.TLService.search({
        applicationNumber: consumerCode,
        tenantId
      })).then(function (applicationDetails) {
        const generatePdfKeyForTL = "tlcertificate";
        const _temp2 = function () {
          if (applicationDetails) {
            return Promise.resolve(Digit.PaymentService.generatePdf(state, {
              Licenses: applicationDetails === null || applicationDetails === void 0 ? void 0 : applicationDetails.Licenses
            }, generatePdfKeyForTL)).then(function (response) {
              return Promise.resolve(Digit.PaymentService.printReciept(state, {
                fileStoreIds: response.filestoreIds[0]
              })).then(function (fileStore) {
                window.open(fileStore[response.filestoreIds[0]], "_blank");
              });
            });
          }
        }();
        if (_temp2 && _temp2.then) return _temp2.then(function () {});
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  const convertDateToEpoch = function (dateString, dayStartOrEnd) {
    if (dayStartOrEnd === void 0) {
      dayStartOrEnd = "dayend";
    }
    try {
      const parts = dateString.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
      const DateObj = new Date(Date.UTC(parts[1], parts[2] - 1, parts[3]));
      DateObj.setMinutes(DateObj.getMinutes() + DateObj.getTimezoneOffset());
      if (dayStartOrEnd === "dayend") {
        DateObj.setHours(DateObj.getHours() + 24);
        DateObj.setSeconds(DateObj.getSeconds() - 1);
      }
      return DateObj.getTime();
    } catch (e) {
      return dateString;
    }
  };
  const downloadPdf = (blob, fileName) => {
    if (window.mSewaApp && window.mSewaApp.isMsewaApp() && window.mSewaApp.downloadBase64File) {
      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        var base64data = reader.result;
        mSewaApp.downloadBase64File(base64data, fileName);
      };
    } else {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(link.href), 7000);
    }
  };
  const printPdf = blob => {
    const fileURL = URL.createObjectURL(blob);
    var myWindow = window.open(fileURL);
    if (myWindow != undefined) {
      myWindow.addEventListener("load", event => {
        myWindow.focus();
        myWindow.print();
      });
    }
  };
  const getPermitOccupancyOrderSearch = function (order, mode) {
    if (mode === void 0) {
      mode = "download";
    }
    try {
      var _data$, _data$2;
      let queryObj = {
        applicationNo: data === null || data === void 0 ? void 0 : (_data$ = data[0]) === null || _data$ === void 0 ? void 0 : _data$.applicationNo
      };
      return Promise.resolve(Digit.OBPSService.BPASearch(data === null || data === void 0 ? void 0 : (_data$2 = data[0]) === null || _data$2 === void 0 ? void 0 : _data$2.tenantId, queryObj)).then(function (bpaResponse) {
        var _data$3, _data$4;
        return Promise.resolve(Digit.OBPSService.scrutinyDetails(data === null || data === void 0 ? void 0 : (_data$3 = data[0]) === null || _data$3 === void 0 ? void 0 : _data$3.tenantId, {
          edcrNumber: data === null || data === void 0 ? void 0 : (_data$4 = data[0]) === null || _data$4 === void 0 ? void 0 : _data$4.edcrNumber
        })).then(function (edcrResponse) {
          var _bpaResponse$BPA, _edcrResponse$edcrDet;
          let bpaData = bpaResponse === null || bpaResponse === void 0 ? void 0 : (_bpaResponse$BPA = bpaResponse.BPA) === null || _bpaResponse$BPA === void 0 ? void 0 : _bpaResponse$BPA[0],
            edcrData = edcrResponse === null || edcrResponse === void 0 ? void 0 : (_edcrResponse$edcrDet = edcrResponse.edcrDetail) === null || _edcrResponse$edcrDet === void 0 ? void 0 : _edcrResponse$edcrDet[0];
          let currentDate = new Date();
          bpaData.additionalDetails.runDate = convertDateToEpoch(currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate());
          let reqData = {
            ...bpaData,
            edcrDetail: [{
              ...edcrData
            }]
          };
          return Promise.resolve(Digit.PaymentService.generatePdf(bpaData === null || bpaData === void 0 ? void 0 : bpaData.tenantId, {
            Bpa: [reqData]
          }, order)).then(function (response) {
            return Promise.resolve(Digit.PaymentService.printReciept(bpaData === null || bpaData === void 0 ? void 0 : bpaData.tenantId, {
              fileStoreIds: response.filestoreIds[0]
            })).then(function (fileStore) {
              var _data$5, _data$5$additionalDet;
              window.open(fileStore[response === null || response === void 0 ? void 0 : response.filestoreIds[0]], "_blank");
              reqData["applicationType"] = data === null || data === void 0 ? void 0 : (_data$5 = data[0]) === null || _data$5 === void 0 ? void 0 : (_data$5$additionalDet = _data$5.additionalDetails) === null || _data$5$additionalDet === void 0 ? void 0 : _data$5$additionalDet.applicationType;
              return Promise.resolve(Digit.OBPSService.edcr_report_download({
                BPA: {
                  ...reqData
                }
              })).then(function (edcrResponseData) {
                const responseStatus = parseInt(edcrResponseData.status, 10);
                if (responseStatus === 201 || responseStatus === 200) {
                  mode == "print" ? printPdf(new Blob([edcrResponseData.data], {
                    type: "application/pdf"
                  })) : downloadPdf(new Blob([edcrResponseData.data], {
                    type: "application/pdf"
                  }), "edcrReport.pdf");
                }
              });
            });
          });
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  const printReciept = function () {
    try {
      const tenantId = Digit.ULBService.getCurrentTenantId();
      const state = Digit.ULBService.getStateId();
      return Promise.resolve(Digit.PaymentService.getReciept(tenantId, businessService, {
        receiptNumbers: receiptNumber
      })).then(function (payments) {
        var _payments$Payments$3;
        function _temp4() {
          return Promise.resolve(Digit.PaymentService.printReciept(state, {
            fileStoreIds: response.filestoreIds[0]
          })).then(function (fileStore) {
            window.open(fileStore[response.filestoreIds[0]], "_blank");
          });
        }
        let response = {
          filestoreIds: [(_payments$Payments$3 = payments.Payments[0]) === null || _payments$Payments$3 === void 0 ? void 0 : _payments$Payments$3.fileStoreId]
        };
        const _temp3 = function (_payments$Payments$4) {
          if (!((_payments$Payments$4 = payments.Payments[0]) !== null && _payments$Payments$4 !== void 0 && _payments$Payments$4.fileStoreId)) {
            return Promise.resolve(Digit.PaymentService.generatePdf(state, {
              Payments: payments.Payments
            }, generatePdfKey)).then(function (_Digit$PaymentService2) {
              response = _Digit$PaymentService2;
            });
          }
        }();
        return _temp3 && _temp3.then ? _temp3.then(_temp4) : _temp4(_temp3);
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  const printDisconnectionRecipet = function () {
    try {
      let tenantid = tenantId ? tenantId : Digit.ULBService.getCurrentTenantId();
      let consumercode = window.location.href.substring(window.location.href.lastIndexOf(consumerCode), window.location.href.lastIndexOf("?"));
      return Promise.resolve(Digit.Utils.downloadReceipt(consumercode, businessService, "consolidatedreceipt", tenantid)).then(function () {});
    } catch (e) {
      return Promise.reject(e);
    }
  };
  if (businessService !== null && businessService !== void 0 && businessService.includes("BPA") && isBpaSearchLoading) return /*#__PURE__*/React__default.createElement(digitUiReactComponents.Loader, null);
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(digitUiReactComponents.Card, null, /*#__PURE__*/React__default.createElement(digitUiReactComponents.Banner, {
    message: getMessage(),
    info: t("PAYMENT_LOCALIZATION_RECIEPT_NO"),
    applicationNumber: receiptNumber,
    successful: true
  }), /*#__PURE__*/React__default.createElement(digitUiReactComponents.CardText, null, getCardText()), generatePdfKey ? /*#__PURE__*/React__default.createElement("div", {
    style: {
      display: "flex"
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "primary-label-btn d-grid",
    style: {
      marginLeft: "unset",
      marginRight: "20px"
    },
    onClick: IsDisconnectionFlow === "true" ? printDisconnectionRecipet : printReciept
  }, /*#__PURE__*/React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, /*#__PURE__*/React__default.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React__default.createElement("path", {
    d: "M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"
  })), t("CS_COMMON_PRINT_RECEIPT")), businessService == "TL" ? /*#__PURE__*/React__default.createElement("div", {
    className: "primary-label-btn d-grid",
    style: {
      marginLeft: "unset"
    },
    onClick: printCertificate
  }, /*#__PURE__*/React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24"
  }, /*#__PURE__*/React__default.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React__default.createElement("path", {
    d: "M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"
  })), t("CS_COMMON_PRINT_CERTIFICATE")) : null, (data === null || data === void 0 ? void 0 : (_data$6 = data[0]) === null || _data$6 === void 0 ? void 0 : _data$6.businessService) === "BPA_OC" && ((data === null || data === void 0 ? void 0 : (_data$7 = data[0]) === null || _data$7 === void 0 ? void 0 : _data$7.status) === "APPROVED" || (data === null || data === void 0 ? void 0 : (_data$8 = data[0]) === null || _data$8 === void 0 ? void 0 : _data$8.status) === "PENDING_SANC_FEE_PAYMENT") ? /*#__PURE__*/React__default.createElement("div", {
    className: "primary-label-btn d-grid",
    style: {
      marginLeft: "unset"
    },
    onClick: e => getPermitOccupancyOrderSearch("occupancy-certificate")
  }, /*#__PURE__*/React__default.createElement(digitUiReactComponents.DownloadPrefixIcon, null), t("BPA_OC_CERTIFICATE")) : null, (data === null || data === void 0 ? void 0 : (_data$9 = data[0]) === null || _data$9 === void 0 ? void 0 : _data$9.businessService) === "BPA_LOW" ? /*#__PURE__*/React__default.createElement("div", {
    className: "primary-label-btn d-grid",
    style: {
      marginLeft: "unset"
    },
    onClick: r => getPermitOccupancyOrderSearch("buildingpermit-low")
  }, /*#__PURE__*/React__default.createElement(digitUiReactComponents.DownloadPrefixIcon, null), t("BPA_PERMIT_ORDER")) : null, (data === null || data === void 0 ? void 0 : (_data$10 = data[0]) === null || _data$10 === void 0 ? void 0 : _data$10.businessService) === "BPA" && (data === null || data === void 0 ? void 0 : (_data$11 = data[0]) === null || _data$11 === void 0 ? void 0 : _data$11.businessService) !== "BPA_LOW" && (data === null || data === void 0 ? void 0 : (_data$12 = data[0]) === null || _data$12 === void 0 ? void 0 : _data$12.businessService) !== "BPA_OC" && ((data === null || data === void 0 ? void 0 : (_data$13 = data[0]) === null || _data$13 === void 0 ? void 0 : _data$13.status) === "PENDING_SANC_FEE_PAYMENT" || (data === null || data === void 0 ? void 0 : (_data$14 = data[0]) === null || _data$14 === void 0 ? void 0 : _data$14.status) === "APPROVED") ? /*#__PURE__*/React__default.createElement("div", {
    className: "primary-label-btn d-grid",
    style: {
      marginLeft: "unset"
    },
    onClick: r => getPermitOccupancyOrderSearch("buildingpermit")
  }, /*#__PURE__*/React__default.createElement(digitUiReactComponents.DownloadPrefixIcon, null), t("BPA_PERMIT_ORDER")) : null) : null), checkFSMResponse ? /*#__PURE__*/React__default.createElement(digitUiReactComponents.ActionBar, {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "baseline"
    }
  }, displayMenu ? /*#__PURE__*/React__default.createElement(digitUiReactComponents.Menu, {
    localeKeyPrefix: "ES_COMMON",
    options: ACTIONS,
    t: t,
    onSelect: onActionSelect
  }) : null, /*#__PURE__*/React__default.createElement(digitUiReactComponents.SubmitBar, {
    label: t("ES_COMMON_TAKE_ACTION"),
    onSubmit: () => setDisplayMenu(!displayMenu)
  })) : /*#__PURE__*/React__default.createElement(digitUiReactComponents.ActionBar, {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "baseline"
    }
  }, /*#__PURE__*/React__default.createElement(reactRouterDom.Link, {
    to: "/digit-ui/employee"
  }, /*#__PURE__*/React__default.createElement(digitUiReactComponents.SubmitBar, {
    label: t("CORE_COMMON_GO_TO_HOME")
  }))));
};
const FailedPayment$1 = props => {
  props.setLink("Response");
  const {
    t
  } = reactI18next.useTranslation();
  const {
    consumerCode
  } = reactRouterDom.useParams();
  const getMessage = () => t("ES_PAYMENT_COLLECTED_ERROR");
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(digitUiReactComponents.Card, null, /*#__PURE__*/React__default.createElement(digitUiReactComponents.Banner, {
    message: getMessage(),
    complaintNumber: consumerCode,
    successful: false
  }), /*#__PURE__*/React__default.createElement(digitUiReactComponents.CardText, null, t("ES_PAYMENT_FAILED_DETAILS"))), /*#__PURE__*/React__default.createElement(digitUiReactComponents.ActionBar, {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "baseline"
    }
  }, /*#__PURE__*/React__default.createElement(reactRouterDom.Link, {
    to: "/digit-ui/employee"
  }, /*#__PURE__*/React__default.createElement(digitUiReactComponents.SubmitBar, {
    label: t("CORE_COMMON_GO_TO_HOME")
  }))));
};

const middleWare_1 = function (data, _break, _next) {
  try {
    data.a = "a";
    return Promise.resolve(_next(data));
  } catch (e) {
    return Promise.reject(e);
  }
};
const middleWare_2 = function (data, _break, _next) {
  try {
    data.b = "b";
    return Promise.resolve(_next(data));
  } catch (e) {
    return Promise.reject(e);
  }
};
const middleWare_3 = function (data, _break, _next) {
  try {
    function _temp4() {
      return Promise.resolve(_next(data));
    }
    data.c = "c";
    const _temp3 = function () {
      if (data.b === "b") {
        const _temp2 = _catch(function () {
          return Promise.resolve(window.fetch("https://ifsc.razorpay.com/hdfc0000090")).then(function (res) {
            const _temp = function () {
              if (res.ok) {
                return Promise.resolve(res.json()).then(function (_ref) {
                  let {
                    BANK,
                    BRANCH
                  } = _ref;
                  data.BANKFROMMiddleWare = BANK;
                });
              } else alert("Wrong IFSC Code");
            }();
            if (_temp && _temp.then) return _temp.then(function () {});
          });
        }, function () {
          alert("Something Went Wrong !");
        });
        if (_temp2 && _temp2.then) return _temp2.then(function () {});
      }
    }();
    return Promise.resolve(_temp3 && _temp3.then ? _temp3.then(_temp4) : _temp4(_temp3));
  } catch (e) {
    return Promise.reject(e);
  }
};
const asyncData = {
  a: ["1", "2", "3"],
  b: ["4", "5", "6"],
  c: ["7", "8", "9"],
  j: ["10", "11", "12"],
  k: ["22", "45"],
  l: ["456"]
};
const testForm = {
  addedFields: [],
  middlewares: [{
    middleWare_1
  }, {
    middleWare_2
  }, {
    middleWare_3
  }],
  state: {
    firstDDoptions: ["a", "b", "c"],
    secondDDoptions: asyncData.a,
    thirdDDoptions: ["d", "e", "f"]
  },
  fields: [{
    label: "first",
    name: "pehla",
    defaultValue: "b",
    customProps: state => ({
      isMendatory: true,
      option: state.firstDDoptions
    }),
    component: (props, customProps) => /*#__PURE__*/React__default.createElement(digitUiReactComponents.Dropdown, _extends({
      select: d => {
        props.setState({
          secondDDoptions: asyncData[d]
        });
        props.setValue("doosra", "");
        props.onChange(d);
      },
      selected: props.value
    }, customProps)),
    validations: {}
  }, {
    label: "second",
    name: "doosra",
    customProps: state => ({
      isMendatory: true,
      option: state.secondDDoptions
    }),
    defaultValue: state => state.secondDDoptions[1],
    component: (props, customProps) => /*#__PURE__*/React__default.createElement(digitUiReactComponents.Dropdown, _extends({
      select: d => {
        props.onChange(d);
      },
      selected: props.value
    }, customProps))
  }, {
    label: "third",
    name: "teesra",
    customProps: state => ({
      isMendatory: true,
      option: state.thirdDDoptions
    }),
    defaultValue: "d",
    component: (props, customProps) => /*#__PURE__*/React__default.createElement(digitUiReactComponents.Dropdown, _extends({
      select: d => {
        props.onChange(d);
      },
      selected: props.value
    }, customProps))
  }, {
    label: "IFSC",
    name: "ifsc",
    customProps: {
      isMendatory: true,
      setBankDetailsFromIFSC: function (props) {
        try {
          const _temp6 = _catch(function () {
            return Promise.resolve(window.fetch("https://ifsc.razorpay.com/" + props.getValues("ifsc"))).then(function (res) {
              const _temp5 = function () {
                if (res.ok) {
                  return Promise.resolve(res.json()).then(function (_ref2) {
                    let {
                      BANK,
                      BRANCH
                    } = _ref2;
                    props.setValue("bank", BANK);
                    props.setValue("branch", BRANCH);
                  });
                } else alert("Wrong IFSC Code");
              }();
              if (_temp5 && _temp5.then) return _temp5.then(function () {});
            });
          }, function () {
            alert("Something Went Wrong !");
          });
          return Promise.resolve(_temp6 && _temp6.then ? _temp6.then(function () {}) : void 0);
        } catch (e) {
          return Promise.reject(e);
        }
      }
    },
    defaultValue: "",
    component: (props, customProps) => /*#__PURE__*/React__default.createElement("div", {
      className: "ifsc-field"
    }, /*#__PURE__*/React__default.createElement("input", {
      value: props.value,
      type: "text",
      onChange: e => {
        props.setState({
          ifsc: e.target.value
        });
        props.onChange(e.target.value);
      }
    }), /*#__PURE__*/React__default.createElement("button", {
      type: "button",
      onClick: () => {
        customProps.setBankDetailsFromIFSC(props);
      }
    }, /*#__PURE__*/React__default.createElement(digitUiReactComponents.SearchIconSvg, null)))
  }, {
    label: "Bank",
    name: "bank",
    defaultValue: "d",
    component: (props, customProps) => /*#__PURE__*/React__default.createElement("input", {
      readOnly: true,
      value: props.value
    })
  }, {
    label: "Branch",
    name: "branch",
    defaultValue: "d",
    component: (props, customProps) => /*#__PURE__*/React__default.createElement("input", {
      readOnly: true,
      value: props.value
    })
  }]
};

const IFrameInterface = props => {
  const {
    stateCode
  } = props;
  const {
    moduleName,
    pageName
  } = reactRouterDom.useParams();
  const {
    t
  } = reactI18next.useTranslation();
  const [url, setUrl] = React.useState("");
  const [title, setTitle] = React.useState("");
  const {
    data,
    isLoading
  } = Digit.Hooks.dss.useMDMS(stateCode, "common-masters", ["uiCommonConstants"], {
    select: data => {
      var _data$commonMasters, _data$commonMasters$u;
      let formattedResponse = (data === null || data === void 0 ? void 0 : (_data$commonMasters = data["common-masters"]) === null || _data$commonMasters === void 0 ? void 0 : (_data$commonMasters$u = _data$commonMasters["uiCommonConstants"]) === null || _data$commonMasters$u === void 0 ? void 0 : _data$commonMasters$u[0]) || {};
      return formattedResponse;
    },
    enabled: true
  });
  React.useEffect(() => {
    var _data$moduleName, _data$moduleName$ifra;
    const pageObject = (data === null || data === void 0 ? void 0 : (_data$moduleName = data[moduleName]) === null || _data$moduleName === void 0 ? void 0 : (_data$moduleName$ifra = _data$moduleName["iframe-routes"]) === null || _data$moduleName$ifra === void 0 ? void 0 : _data$moduleName$ifra[pageName]) || {};
    const isOrign = (pageObject === null || pageObject === void 0 ? void 0 : pageObject["isOrigin"]) || false;
    const domain = isOrign ? process.env.NODE_ENV === "development" ? "https://qa.digit.org" : document.location.origin : pageObject === null || pageObject === void 0 ? void 0 : pageObject["domain"];
    const contextPath = (pageObject === null || pageObject === void 0 ? void 0 : pageObject["routePath"]) || "";
    const title = (pageObject === null || pageObject === void 0 ? void 0 : pageObject["title"]) || "";
    let url = "" + domain + contextPath;
    setUrl(url);
    setTitle(title);
  }, [data, moduleName, pageName]);
  if (isLoading) {
    return /*#__PURE__*/React__default.createElement(digitUiReactComponents.Loader, null);
  }
  if (!url) {
    return /*#__PURE__*/React__default.createElement("div", null, "No Iframe To Load");
  }
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(digitUiReactComponents.Header, null, t(title)), /*#__PURE__*/React__default.createElement("div", {
    className: "app-iframe-wrapper"
  }, /*#__PURE__*/React__default.createElement("iframe", {
    src: url,
    title: title,
    className: "app-iframe"
  })));
};

digitUiLibraries.subFormRegistry.addSubForm("testForm", testForm);
const EmployeePayment = _ref => {
  var _location, _location$pathname, _location2, _location2$pathname;
  let {
    stateCode,
    cityCode,
    moduleCode
  } = _ref;
  const {
    path: currentPath
  } = reactRouterDom.useRouteMatch();
  const {
    t
  } = reactI18next.useTranslation();
  const [link, setLink] = React.useState(null);
  const commonProps = {
    stateCode,
    cityCode,
    moduleCode,
    setLink
  };
  const isFsm = ((_location = location) === null || _location === void 0 ? void 0 : (_location$pathname = _location.pathname) === null || _location$pathname === void 0 ? void 0 : _location$pathname.includes("fsm")) || ((_location2 = location) === null || _location2 === void 0 ? void 0 : (_location2$pathname = _location2.pathname) === null || _location2$pathname === void 0 ? void 0 : _location2$pathname.includes("FSM"));
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("p", {
    className: "breadcrumb",
    style: {
      marginLeft: "15px"
    }
  }, /*#__PURE__*/React__default.createElement(reactRouterDom.Link, {
    to: "/digit-ui/employee"
  }, t("ES_COMMON_HOME")), isFsm ? /*#__PURE__*/React__default.createElement(reactRouterDom.Link, {
    to: "/digit-ui/employee/fsm/home"
  }, "/ ", t("ES_TITLE_FSM"), " ") : null, isFsm ? /*#__PURE__*/React__default.createElement(reactRouterDom.Link, {
    to: "/digit-ui/employee/fsm/inbox"
  }, "/ ", t("ES_TITLE_INBOX")) : null, "/ ", link), /*#__PURE__*/React__default.createElement(reactRouterDom.Switch, null, /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
    path: currentPath + "/collect/:businessService/:consumerCode"
  }, /*#__PURE__*/React__default.createElement(CollectPayment, _extends({}, commonProps, {
    basePath: currentPath
  }))), /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
    path: currentPath + "/success/:businessService/:receiptNumber/:consumerCode"
  }, /*#__PURE__*/React__default.createElement(SuccessfulPayment$1, commonProps)), /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
    path: currentPath + "/integration/:moduleName/:pageName"
  }, /*#__PURE__*/React__default.createElement(IFrameInterface, commonProps)), /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
    path: currentPath + "/failure"
  }, /*#__PURE__*/React__default.createElement(FailedPayment$1, commonProps))));
};

const PaymentModule = _ref => {
  let {
    deltaConfig = {},
    stateCode,
    cityCode,
    moduleCode = "Payment",
    userType
  } = _ref;
  const {
    path,
    url
  } = reactRouterDom.useRouteMatch();
  const store = {
    data: {}
  };
  if (Object.keys(store).length === 0) {
    return /*#__PURE__*/React__default.createElement(digitUiReactComponents.Loader, null);
  }
  const getPaymentHome = () => {
    if (userType === "citizen") return /*#__PURE__*/React__default.createElement(CitizenPayment, {
      stateCode,
      moduleCode,
      cityCode,
      path,
      url
    });else return /*#__PURE__*/React__default.createElement(EmployeePayment, {
      stateCode,
      cityCode,
      moduleCode
    });
  };
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, getPaymentHome());
};
const PaymentLinks = _ref2 => {
  const {
    t
  } = reactI18next.useTranslation();
  return null;
};
const paymentConfigs = {
  getBillDetailsConfigWithBusinessService: getKeyNotesConfig
};

exports.PaymentLinks = PaymentLinks;
exports.PaymentModule = PaymentModule;
exports.paymentConfigs = paymentConfigs;
//# sourceMappingURL=index.js.map
