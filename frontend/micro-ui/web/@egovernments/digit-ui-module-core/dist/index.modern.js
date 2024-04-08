import React, { useState, useEffect, useRef, Fragment as Fragment$1, useMemo, createContext, useCallback, isValidElement, cloneElement, createElement, useContext, useReducer } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { useLocation, useRouteMatch, useHistory, Switch, Route, Redirect, Link, BrowserRouter } from 'react-router-dom';
import { useTranslation, getI18n } from 'react-i18next';
import { Loader, BackButton, CitizenHomeCard, CitizenInfoLabel, PTIcon, BillsIcon, OBPSIcon, TLIcon, PGRIcon, MCollectIcon, FSMIcon, WSICon, FormStep, CheckBox, CitizenConsentForm, OTPInput, CardText, CardLabelError, AppContainer, Toast, Dropdown, FormComposer, CardSubHeader, Card, CustomButton, SubmitBar, TopBar as TopBar$1, Hamburger, Modal, CloseSvg, PropertyHouse, CaseIcon, CollectionIcon, BirthIcon, DeathIcon, FirenocIcon, HomeIcon, EditPencilIcon, LogoutIcon, Phone, LoginIcon, NavBar, ArrowVectorDown, ArrowForward, ComplaintIcon, BPAHomeIcon, ReceiptIcon, PersonIcon, DocumentIconSolid, DropIcon, CollectionsBookmarIcons, FinanceChartIcon, SearchIcon, GalleryIcon, RemoveIcon, BreadCrumb, CameraIcon, LabelFieldPair, CardLabel, TextInput, MobileNumber, PrivateRoute, Calender, DocumentIcon, WhatsNewCard, PageBasedInput, CardHeader, RadioButtons, SearchOnRadioButtons, Header as Header$1, PDFSvg, DownloadImgIcon, WhatsappIconGreen, HelpLineIcon, ServiceCenterIcon, ValidityTimeIcon, TimerIcon, RupeeSymbol, Banner, Rating, TextArea, SearchField, DatePicker, SearchAction, PopUp, DetailsCard, DownloadBtnCommon, SearchForm, Table, Body } from '@egovernments/digit-ui-react-components';
import ReactTooltip from 'react-tooltip';
import { compose, applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';

const processLinkData = (newData, code, t) => {
  const obj = newData === null || newData === void 0 ? void 0 : newData[`${code}`];
  if (obj) {
    obj.map(link => {
      link.link = link["navigationURL"], link.i18nKey = t(link["name"]);
    });
  }
  const newObj = {
    links: obj === null || obj === void 0 ? void 0 : obj.reverse(),
    header: Digit.Utils.locale.getTransformedLocale(`ACTION_TEST_${code}`),
    iconName: `CITIZEN_${code}_ICON`
  };
  if (code === "FSM") {
    const roleBasedLoginRoutes = [{
      role: "FSM_DSO",
      from: "/digit-ui/citizen/fsm/dso-dashboard",
      dashoardLink: "CS_LINK_DSO_DASHBOARD",
      loginLink: "CS_LINK_LOGIN_DSO"
    }];
    roleBasedLoginRoutes.map(({
      role,
      from,
      loginLink,
      dashoardLink
    }) => {
      var _newObj$links, _newObj$links2;
      if (Digit.UserService.hasAccess(role)) newObj === null || newObj === void 0 ? void 0 : (_newObj$links = newObj.links) === null || _newObj$links === void 0 ? void 0 : _newObj$links.push({
        link: from,
        i18nKey: t(dashoardLink)
      });else newObj === null || newObj === void 0 ? void 0 : (_newObj$links2 = newObj.links) === null || _newObj$links2 === void 0 ? void 0 : _newObj$links2.push({
        link: `/digit-ui/citizen/login`,
        state: {
          role: "FSM_DSO",
          from
        },
        i18nKey: t(loginLink)
      });
    });
  }
  return newObj;
};
const iconSelector = code => {
  switch (code) {
    case "PT":
      return /*#__PURE__*/React.createElement(PTIcon, {
        className: "fill-path-primary-main"
      });
    case "WS":
      return /*#__PURE__*/React.createElement(WSICon, {
        className: "fill-path-primary-main"
      });
    case "FSM":
      return /*#__PURE__*/React.createElement(FSMIcon, {
        className: "fill-path-primary-main"
      });
    case "MCollect":
      return /*#__PURE__*/React.createElement(MCollectIcon, {
        className: "fill-path-primary-main"
      });
    case "PGR":
      return /*#__PURE__*/React.createElement(PGRIcon, {
        className: "fill-path-primary-main"
      });
    case "TL":
      return /*#__PURE__*/React.createElement(TLIcon, {
        className: "fill-path-primary-main"
      });
    case "OBPS":
      return /*#__PURE__*/React.createElement(OBPSIcon, {
        className: "fill-path-primary-main"
      });
    case "Bills":
      return /*#__PURE__*/React.createElement(BillsIcon, {
        className: "fill-path-primary-main"
      });
    default:
      return /*#__PURE__*/React.createElement(PTIcon, {
        className: "fill-path-primary-main"
      });
  }
};
const CitizenHome = ({
  modules,
  getCitizenMenu,
  fetchedCitizen,
  isLoading
}) => {
  const paymentModule = modules.filter(({
    code
  }) => code === "Payment")[0];
  const moduleArr = modules.filter(({
    code
  }) => code !== "Payment");
  const moduleArray = [paymentModule, ...moduleArr];
  const {
    t
  } = useTranslation();
  if (isLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "citizen-all-services-wrapper"
  }, /*#__PURE__*/React.createElement(BackButton, null), /*#__PURE__*/React.createElement("div", {
    className: "citizenAllServiceGrid",
    style: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, moduleArray.filter(mod => mod).map(({
    code
  }, index) => {
    var _mdmsDataObj, _mdmsDataObj$links;
    let mdmsDataObj;
    if (fetchedCitizen) mdmsDataObj = fetchedCitizen ? processLinkData(getCitizenMenu, code, t) : undefined;
    if (((_mdmsDataObj = mdmsDataObj) === null || _mdmsDataObj === void 0 ? void 0 : (_mdmsDataObj$links = _mdmsDataObj.links) === null || _mdmsDataObj$links === void 0 ? void 0 : _mdmsDataObj$links.length) > 0) {
      var _mdmsDataObj2, _mdmsDataObj3, _mdmsDataObj3$links, _mdmsDataObj3$links$f;
      return /*#__PURE__*/React.createElement(CitizenHomeCard, {
        header: t((_mdmsDataObj2 = mdmsDataObj) === null || _mdmsDataObj2 === void 0 ? void 0 : _mdmsDataObj2.header),
        links: (_mdmsDataObj3 = mdmsDataObj) === null || _mdmsDataObj3 === void 0 ? void 0 : (_mdmsDataObj3$links = _mdmsDataObj3.links) === null || _mdmsDataObj3$links === void 0 ? void 0 : (_mdmsDataObj3$links$f = _mdmsDataObj3$links.filter(ele => ele === null || ele === void 0 ? void 0 : ele.link)) === null || _mdmsDataObj3$links$f === void 0 ? void 0 : _mdmsDataObj3$links$f.sort((x, y) => (x === null || x === void 0 ? void 0 : x.orderNumber) - (y === null || y === void 0 ? void 0 : y.orderNumber)),
        Icon: () => iconSelector(code),
        Info: code === "OBPS" ? () => /*#__PURE__*/React.createElement(CitizenInfoLabel, {
          style: {
            margin: "0px",
            padding: "10px"
          },
          info: t("CS_FILE_APPLICATION_INFO_LABEL"),
          text: t(`BPA_CITIZEN_HOME_STAKEHOLDER_INCLUDES_INFO_LABEL`)
        }) : null,
        isInfo: code === "OBPS" ? true : false
      });
    } else return /*#__PURE__*/React.createElement(React.Fragment, null);
  }))));
};
const EmployeeHome = ({
  modules
}) => {
  if (window.Digit.SessionStorage.get("PT_CREATE_EMP_TRADE_NEW_FORM")) window.Digit.SessionStorage.set("PT_CREATE_EMP_TRADE_NEW_FORM", {});
  return /*#__PURE__*/React.createElement("div", {
    className: "employee-app-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ground-container moduleCardWrapper gridModuleWrapper"
  }, modules.map(({
    code
  }, index) => {
    const Card = Digit.ComponentRegistryService.getComponent(`${code}Card`) || (() => /*#__PURE__*/React.createElement(React.Fragment, null));
    return /*#__PURE__*/React.createElement(Card, {
      key: index
    });
  })));
};
const AppHome = ({
  userType,
  modules,
  getCitizenMenu,
  fetchedCitizen,
  isLoading
}) => {
  if (userType === "citizen") {
    return /*#__PURE__*/React.createElement(CitizenHome, {
      modules: modules,
      getCitizenMenu: getCitizenMenu,
      fetchedCitizen: fetchedCitizen,
      isLoading: isLoading
    });
  }
  return /*#__PURE__*/React.createElement(EmployeeHome, {
    modules: modules
  });
};

const loginSteps = [{
  texts: {
    header: "CS_LOGIN_PROVIDE_MOBILE_NUMBER",
    cardText: "CS_LOGIN_TEXT",
    nextText: "CS_COMMONS_NEXT",
    submitBarLabel: "CS_COMMONS_NEXT"
  },
  inputs: [{
    label: "CORE_COMMON_MOBILE_NUMBER",
    type: "text",
    name: "mobileNumber",
    error: "ERR_HRMS_INVALID_MOB_NO",
    componentInFront: "+91",
    validation: {
      required: true,
      minLength: 10,
      maxLength: 10
    }
  }]
}, {
  texts: {
    header: "CS_LOGIN_OTP",
    cardText: "CS_LOGIN_OTP_TEXT",
    nextText: "CS_COMMONS_NEXT",
    submitBarLabel: "CS_COMMONS_NEXT"
  }
}, {
  texts: {
    header: "CS_LOGIN_PROVIDE_NAME",
    cardText: "CS_LOGIN_NAME_TEXT",
    nextText: "CS_COMMONS_NEXT",
    submitBarLabel: "CS_COMMONS_NEXT"
  },
  inputs: [{
    label: "CORE_COMMON_NAME",
    type: "text",
    name: "name",
    error: "CORE_COMMON_NAME_VALIDMSG",
    validation: {
      required: true,
      minLength: 1,
      pattern: /^[^{0-9}^\$\"<>?\\\\~!@#$%^()+={}\[\]*,/_:;“”‘’]{1,50}$/i
    }
  }]
}];

const SelectMobileNumber = ({
  t,
  onSelect,
  showRegisterLink,
  mobileNumber,
  holdingId,
  onMobileChange,
  config,
  canSubmit,
  CitizenHomePageTenantId
}) => {
  const [isCheckBox, setIsCheckBox] = useState(false);
  const [isCCFEnabled, setisCCFEnabled] = useState(false);
  const [mdmsConfig, setMdmsConfig] = useState("");
  const {
    isLoading,
    data
  } = Digit.Hooks.useCustomMDMS(Digit.ULBService.getStateId(), "common-masters", [{
    name: "CitizenConsentForm"
  }]);
  function setTermsAndPolicyDetails(e) {
    setIsCheckBox(e.target.checked);
  }
  const checkDisbaled = () => {
    if (isCCFEnabled !== null && isCCFEnabled !== void 0 && isCCFEnabled.isCitizenConsentFormEnabled) {
      return !(mobileNumber.length === 10 && canSubmit && isCheckBox);
    } else {
      return !(mobileNumber.length === 10 && canSubmit);
    }
  };
  useEffect(() => {
    var _data$commonMasters, _data$commonMasters$C, _data$commonMasters$C2;
    if (data !== null && data !== void 0 && (_data$commonMasters = data["common-masters"]) !== null && _data$commonMasters !== void 0 && (_data$commonMasters$C = _data$commonMasters.CitizenConsentForm) !== null && _data$commonMasters$C !== void 0 && (_data$commonMasters$C2 = _data$commonMasters$C[0]) !== null && _data$commonMasters$C2 !== void 0 && _data$commonMasters$C2.isCitizenConsentFormEnabled) {
      var _data$commonMasters2, _data$commonMasters2$;
      setisCCFEnabled(data === null || data === void 0 ? void 0 : (_data$commonMasters2 = data["common-masters"]) === null || _data$commonMasters2 === void 0 ? void 0 : (_data$commonMasters2$ = _data$commonMasters2.CitizenConsentForm) === null || _data$commonMasters2$ === void 0 ? void 0 : _data$commonMasters2$[0]);
    }
  }, [data]);
  const onLinkClick = e => {
    setMdmsConfig(e.target.id);
  };
  const checkLabels = () => {
    var _isCCFEnabled$checkBo;
    return /*#__PURE__*/React.createElement("span", null, isCCFEnabled === null || isCCFEnabled === void 0 ? void 0 : (_isCCFEnabled$checkBo = isCCFEnabled.checkBoxLabels) === null || _isCCFEnabled$checkBo === void 0 ? void 0 : _isCCFEnabled$checkBo.map((data, index) => {
      var _isCCFEnabled$checkBo2;
      return /*#__PURE__*/React.createElement("span", null, (data === null || data === void 0 ? void 0 : data.linkPrefix) && /*#__PURE__*/React.createElement("span", null, t(`${data === null || data === void 0 ? void 0 : data.linkPrefix}_`)), (data === null || data === void 0 ? void 0 : data.link) && /*#__PURE__*/React.createElement("span", {
        id: data === null || data === void 0 ? void 0 : data.linkId,
        onClick: e => {
          onLinkClick(e);
        },
        style: {
          color: "#a82227",
          cursor: "pointer"
        }
      }, t(`${data === null || data === void 0 ? void 0 : data.link}_`)), (data === null || data === void 0 ? void 0 : data.linkPostfix) && /*#__PURE__*/React.createElement("span", null, t(`${data === null || data === void 0 ? void 0 : data.linkPostfix}_`)), index == (isCCFEnabled === null || isCCFEnabled === void 0 ? void 0 : (_isCCFEnabled$checkBo2 = isCCFEnabled.checkBoxLabels) === null || _isCCFEnabled$checkBo2 === void 0 ? void 0 : _isCCFEnabled$checkBo2.length) - 1 && t("LABEL"));
    }));
  };
  if (isLoading) return /*#__PURE__*/React.createElement(Loader, null);
  return /*#__PURE__*/React.createElement(FormStep, {
    isDisabled: checkDisbaled(),
    onSelect: onSelect,
    config: config,
    t: t,
    componentInFront: "+91",
    onChange: onMobileChange,
    value: mobileNumber,
    holdingId: holdingId,
    CitizenHomePageTenantId: CitizenHomePageTenantId
  }, (isCCFEnabled === null || isCCFEnabled === void 0 ? void 0 : isCCFEnabled.isCitizenConsentFormEnabled) && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CheckBox, {
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
  }), /*#__PURE__*/React.createElement(CitizenConsentForm, {
    styles: {},
    t: t,
    isCheckBoxChecked: setTermsAndPolicyDetails,
    labels: isCCFEnabled === null || isCCFEnabled === void 0 ? void 0 : isCCFEnabled.checkBoxLabels,
    mdmsConfig: mdmsConfig,
    setMdmsConfig: setMdmsConfig
  })));
};

function useInterval(callback, delay) {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const timer = setInterval(tick, delay);
      return () => clearInterval(timer);
    }
  }, [delay]);
}

const SelectOtp = ({
  config,
  otp,
  onOtpChange,
  onResend,
  onSelect,
  t,
  error,
  userType: _userType = "citizen",
  canSubmit
}) => {
  const [timeLeft, setTimeLeft] = useState(30);
  useInterval(() => {
    setTimeLeft(timeLeft - 1);
  }, timeLeft > 0 ? 1000 : null);
  const handleResendOtp = () => {
    onResend();
    setTimeLeft(2);
  };
  if (_userType === "employee") {
    return /*#__PURE__*/React.createElement(Fragment$1, null, /*#__PURE__*/React.createElement(OTPInput, {
      length: 6,
      onChange: onOtpChange,
      value: otp
    }), timeLeft > 0 ? /*#__PURE__*/React.createElement(CardText, null, `${t("CS_RESEND_ANOTHER_OTP")} ${timeLeft} ${t("CS_RESEND_SECONDS")}`) : /*#__PURE__*/React.createElement("p", {
      className: "card-text-button",
      onClick: handleResendOtp
    }, t("CS_RESEND_OTP")), !error && /*#__PURE__*/React.createElement(CardLabelError, null, t("CS_INVALID_OTP")));
  }
  return /*#__PURE__*/React.createElement(FormStep, {
    onSelect: onSelect,
    config: config,
    t: t,
    isDisabled: !((otp === null || otp === void 0 ? void 0 : otp.length) === 6 && canSubmit)
  }, /*#__PURE__*/React.createElement(OTPInput, {
    length: 6,
    onChange: onOtpChange,
    value: otp
  }), timeLeft > 0 ? /*#__PURE__*/React.createElement(CardText, null, `${t("CS_RESEND_ANOTHER_OTP")} ${timeLeft} ${t("CS_RESEND_SECONDS")}`) : /*#__PURE__*/React.createElement("p", {
    className: "card-text-button",
    onClick: handleResendOtp
  }, t("CS_RESEND_OTP")), !error && /*#__PURE__*/React.createElement(CardLabelError, null, t("CS_INVALID_OTP")));
};

const SelectName = ({
  config,
  onSelect,
  t,
  isDisabled
}) => {
  return /*#__PURE__*/React.createElement(FormStep, {
    config: config,
    onSelect: onSelect,
    t: t,
    isDisabled: isDisabled
  });
};

const TYPE_REGISTER = {
  type: "register"
};
const TYPE_LOGIN = {
  type: "login"
};
const DEFAULT_REDIRECT_URL = "/digit-ui/citizen";
const setCitizenDetail = (userObject, token, tenantId) => {
  var _JSON$parse, _JSON$parse$value;
  let locale = (_JSON$parse = JSON.parse(sessionStorage.getItem("Digit.initData"))) === null || _JSON$parse === void 0 ? void 0 : (_JSON$parse$value = _JSON$parse.value) === null || _JSON$parse$value === void 0 ? void 0 : _JSON$parse$value.selectedLanguage;
  localStorage.setItem("Citizen.tenant-id", tenantId);
  localStorage.setItem("tenant-id", tenantId);
  localStorage.setItem("citizen.userRequestObject", JSON.stringify(userObject));
  localStorage.setItem("locale", locale);
  localStorage.setItem("Citizen.locale", locale);
  localStorage.setItem("token", token);
  localStorage.setItem("Citizen.token", token);
  localStorage.setItem("user-info", JSON.stringify(userObject));
  localStorage.setItem("Citizen.user-info", JSON.stringify(userObject));
};
const getFromLocation = (state, searchParams) => {
  return (state === null || state === void 0 ? void 0 : state.from) || (searchParams === null || searchParams === void 0 ? void 0 : searchParams.from) || DEFAULT_REDIRECT_URL;
};
const Login = ({
  stateCode,
  isUserRegistered: _isUserRegistered = true
}) => {
  var _location$state, _location$state7;
  const {
    t
  } = useTranslation();
  const location = useLocation();
  const {
    path,
    url
  } = useRouteMatch();
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isOtpValid, setIsOtpValid] = useState(true);
  const [tokens, setTokens] = useState(null);
  const [params, setParmas] = useState(_isUserRegistered ? {} : location === null || location === void 0 ? void 0 : (_location$state = location.state) === null || _location$state === void 0 ? void 0 : _location$state.data);
  const [errorTO, setErrorTO] = useState(null);
  const searchParams = Digit.Hooks.useQueryParams();
  const [canSubmitName, setCanSubmitName] = useState(false);
  const [canSubmitOtp, setCanSubmitOtp] = useState(true);
  const [canSubmitNo, setCanSubmitNo] = useState(true);
  useEffect(() => {
    let errorTimeout;
    if (error) {
      if (errorTO) {
        clearTimeout(errorTO);
        setErrorTO(null);
      }
      errorTimeout = setTimeout(() => {
        setError("");
      }, 5000);
      setErrorTO(errorTimeout);
    }
    return () => {
      errorTimeout && clearTimeout(errorTimeout);
    };
  }, [error]);
  useEffect(() => {
    var _location$state2;
    if (!user) {
      return;
    }
    Digit.SessionStorage.set("citizen.userRequestObject", user);
    Digit.UserService.setUser(user);
    setCitizenDetail(user === null || user === void 0 ? void 0 : user.info, user === null || user === void 0 ? void 0 : user.access_token, stateCode);
    const redirectPath = ((_location$state2 = location.state) === null || _location$state2 === void 0 ? void 0 : _location$state2.from) || DEFAULT_REDIRECT_URL;
    if (!Digit.ULBService.getCitizenCurrentTenant(true)) {
      history.replace("/digit-ui/citizen/select-location", {
        redirectBackTo: redirectPath
      });
    } else {
      history.replace(redirectPath);
    }
  }, [user]);
  const CitizenHomePageTenantId = Digit.SessionStorage.get("CITIZEN.COMMON.HOME.CITY");
  const stepItems = useMemo(() => loginSteps.map(step => {
    const texts = {};
    for (const key in step.texts) {
      texts[key] = t(step.texts[key]);
    }
    return {
      ...step,
      texts
    };
  }, [loginSteps]));
  const getUserType = () => Digit.UserService.getType();
  const handleOtpChange = otp => {
    setParmas({
      ...params,
      otp
    });
  };
  const handleMobileChange = event => {
    const {
      value
    } = event.target;
    if (event.target.name === 'holdingId') {
      setParmas({
        ...params,
        holdingId: value
      });
    } else {
      setParmas({
        ...params,
        mobileNumber: value
      });
    }
  };
  const selectMobileNumber = async mobileNumber => {
    setCanSubmitNo(false);
    setParmas({
      ...params,
      ...mobileNumber
    });
    const data = {
      ...mobileNumber,
      tenantId: stateCode,
      userType: getUserType()
    };
    if (_isUserRegistered) {
      var _location$state4;
      const [res, err] = await sendOtp({
        otp: {
          ...data,
          ...TYPE_LOGIN
        }
      });
      if (!err) {
        var _location$state3;
        setCanSubmitNo(true);
        history.replace(`${path}/otp`, {
          from: getFromLocation(location.state, searchParams),
          role: (_location$state3 = location.state) === null || _location$state3 === void 0 ? void 0 : _location$state3.role
        });
        return;
      } else {
        setCanSubmitNo(true);
        if (!(location.state && location.state.role === "FSM_DSO")) {
          history.push(`/digit-ui/citizen/register/name`, {
            from: getFromLocation(location.state, searchParams),
            data: data
          });
        }
      }
      if ((_location$state4 = location.state) !== null && _location$state4 !== void 0 && _location$state4.role) {
        var _location$state5;
        setCanSubmitNo(true);
        setError(((_location$state5 = location.state) === null || _location$state5 === void 0 ? void 0 : _location$state5.role) === "FSM_DSO" ? t("ES_ERROR_DSO_LOGIN") : "User not registered.");
      }
    } else {
      const [res, err] = await sendOtp({
        otp: {
          ...data,
          ...TYPE_REGISTER
        }
      });
      if (!err) {
        setCanSubmitNo(true);
        history.replace(`${path}/otp`, {
          from: getFromLocation(location.state, searchParams)
        });
        return;
      }
      setCanSubmitNo(true);
    }
  };
  const selectName = async name => {
    const data = {
      ...params,
      tenantId: stateCode,
      userType: getUserType(),
      ...name
    };
    setParmas({
      ...params,
      ...name
    });
    setCanSubmitName(true);
    const [res, err] = await sendOtp({
      otp: {
        ...data,
        ...TYPE_REGISTER
      }
    });
    if (res) {
      setCanSubmitName(false);
      history.replace(`${path}/otp`, {
        from: getFromLocation(location.state, searchParams)
      });
    } else {
      setCanSubmitName(false);
    }
  };
  const selectOtp = async () => {
    try {
      setIsOtpValid(true);
      setCanSubmitOtp(false);
      const {
        mobileNumber,
        otp,
        name
      } = params;
      if (_isUserRegistered) {
        var _location$state6, _window, _window$globalConfigs;
        const requestData = {
          username: mobileNumber,
          password: otp,
          tenantId: stateCode,
          userType: getUserType()
        };
        const {
          ResponseInfo,
          UserRequest: info,
          ...tokens
        } = await Digit.UserService.authenticate(requestData);
        if ((_location$state6 = location.state) !== null && _location$state6 !== void 0 && _location$state6.role) {
          const roleInfo = info.roles.find(userRole => userRole.code === location.state.role);
          if (!roleInfo || !roleInfo.code) {
            setError(t("ES_ERROR_USER_NOT_PERMITTED"));
            setTimeout(() => history.replace(DEFAULT_REDIRECT_URL), 5000);
            return;
          }
        }
        if ((_window = window) !== null && _window !== void 0 && (_window$globalConfigs = _window.globalConfigs) !== null && _window$globalConfigs !== void 0 && _window$globalConfigs.getConfig("ENABLE_SINGLEINSTANCE")) {
          info.tenantId = Digit.ULBService.getStateId();
        }
        setUser({
          info,
          ...tokens
        });
      } else if (!_isUserRegistered) {
        var _window2, _window2$globalConfig;
        const requestData = {
          name,
          username: mobileNumber,
          otpReference: otp,
          tenantId: stateCode
        };
        const {
          ResponseInfo,
          UserRequest: info,
          ...tokens
        } = await Digit.UserService.registerUser(requestData, stateCode);
        if ((_window2 = window) !== null && _window2 !== void 0 && (_window2$globalConfig = _window2.globalConfigs) !== null && _window2$globalConfig !== void 0 && _window2$globalConfig.getConfig("ENABLE_SINGLEINSTANCE")) {
          info.tenantId = Digit.ULBService.getStateId();
        }
        setUser({
          info,
          ...tokens
        });
      }
    } catch (err) {
      setCanSubmitOtp(true);
      setIsOtpValid(false);
    }
  };
  const resendOtp = async () => {
    const {
      mobileNumber
    } = params;
    const data = {
      mobileNumber,
      tenantId: stateCode,
      userType: getUserType()
    };
    if (!_isUserRegistered) {
      const [res, err] = await sendOtp({
        otp: {
          ...data,
          ...TYPE_REGISTER
        }
      });
    } else if (_isUserRegistered) {
      const [res, err] = await sendOtp({
        otp: {
          ...data,
          ...TYPE_LOGIN
        }
      });
    }
  };
  const sendOtp = async data => {
    try {
      const res = await Digit.UserService.sendOtp(data, stateCode);
      return [res, null];
    } catch (err) {
      return [null, err];
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "citizen-form-wrapper"
  }, /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(AppContainer, null, /*#__PURE__*/React.createElement(BackButton, null), /*#__PURE__*/React.createElement(Route, {
    path: `${path}`,
    exact: true
  }, /*#__PURE__*/React.createElement(SelectMobileNumber, {
    onSelect: selectMobileNumber,
    config: stepItems[0],
    mobileNumber: params.mobileNumber || "",
    holdingId: params.holdingId || "",
    onMobileChange: handleMobileChange,
    canSubmit: canSubmitNo,
    showRegisterLink: _isUserRegistered && !((_location$state7 = location.state) !== null && _location$state7 !== void 0 && _location$state7.role),
    CitizenHomePageTenantId: CitizenHomePageTenantId,
    t: t
  })), /*#__PURE__*/React.createElement(Route, {
    path: `${path}/otp`
  }, /*#__PURE__*/React.createElement(SelectOtp, {
    config: {
      ...stepItems[1],
      texts: {
        ...stepItems[1].texts,
        cardText: `${stepItems[1].texts.cardText} ${params.mobileNumber || ""}`
      }
    },
    onOtpChange: handleOtpChange,
    onResend: resendOtp,
    onSelect: selectOtp,
    otp: params.otp,
    error: isOtpValid,
    canSubmit: canSubmitOtp,
    t: t
  })), /*#__PURE__*/React.createElement(Route, {
    path: `${path}/name`
  }, /*#__PURE__*/React.createElement(SelectName, {
    config: stepItems[2],
    onSelect: selectName,
    t: t,
    isDisabled: canSubmitName
  })), error && /*#__PURE__*/React.createElement(Toast, {
    error: true,
    label: error,
    onClose: () => setError(null)
  }))));
};

const loginConfig = [{
  texts: {
    header: "CORE_COMMON_LOGIN",
    submitButtonLabel: "CORE_COMMON_CONTINUE",
    secondaryButtonLabel: "CORE_COMMON_FORGOT_PASSWORD"
  },
  inputs: [{
    label: "CORE_LOGIN_USERNAME",
    type: "text",
    name: "username",
    error: "ERR_HRMS_INVALID_USER_ID"
  }, {
    label: "CORE_LOGIN_PASSWORD",
    type: "password",
    name: "password",
    error: "ERR_HRMS_WRONG_PASSWORD"
  }, {
    label: "CORE_COMMON_CITY",
    type: "custom",
    name: "city",
    error: "ERR_HRMS_INVALID_CITY"
  }]
}];

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var b = "function" === typeof Symbol && Symbol.for,
  c = b ? Symbol.for("react.element") : 60103,
  d = b ? Symbol.for("react.portal") : 60106,
  e = b ? Symbol.for("react.fragment") : 60107,
  f = b ? Symbol.for("react.strict_mode") : 60108,
  g = b ? Symbol.for("react.profiler") : 60114,
  h = b ? Symbol.for("react.provider") : 60109,
  k = b ? Symbol.for("react.context") : 60110,
  l = b ? Symbol.for("react.async_mode") : 60111,
  m = b ? Symbol.for("react.concurrent_mode") : 60111,
  n = b ? Symbol.for("react.forward_ref") : 60112,
  p = b ? Symbol.for("react.suspense") : 60113,
  q = b ? Symbol.for("react.suspense_list") : 60120,
  r = b ? Symbol.for("react.memo") : 60115,
  t = b ? Symbol.for("react.lazy") : 60116,
  v = b ? Symbol.for("react.block") : 60121,
  w = b ? Symbol.for("react.fundamental") : 60117,
  x = b ? Symbol.for("react.responder") : 60118,
  y = b ? Symbol.for("react.scope") : 60119;
function z(a) {
  if ("object" === typeof a && null !== a) {
    var u = a.$$typeof;
    switch (u) {
      case c:
        switch (a = a.type, a) {
          case l:
          case m:
          case e:
          case g:
          case f:
          case p:
            return a;
          default:
            switch (a = a && a.$$typeof, a) {
              case k:
              case n:
              case t:
              case r:
              case h:
                return a;
              default:
                return u;
            }
        }
      case d:
        return u;
    }
  }
}
function A(a) {
  return z(a) === m;
}
var AsyncMode = l;
var ConcurrentMode = m;
var ContextConsumer = k;
var ContextProvider = h;
var Element = c;
var ForwardRef = n;
var Fragment = e;
var Lazy = t;
var Memo = r;
var Portal = d;
var Profiler = g;
var StrictMode = f;
var Suspense = p;
var isAsyncMode = function (a) {
  return A(a) || z(a) === l;
};
var isConcurrentMode = A;
var isContextConsumer = function (a) {
  return z(a) === k;
};
var isContextProvider = function (a) {
  return z(a) === h;
};
var isElement = function (a) {
  return "object" === typeof a && null !== a && a.$$typeof === c;
};
var isForwardRef = function (a) {
  return z(a) === n;
};
var isFragment = function (a) {
  return z(a) === e;
};
var isLazy = function (a) {
  return z(a) === t;
};
var isMemo = function (a) {
  return z(a) === r;
};
var isPortal = function (a) {
  return z(a) === d;
};
var isProfiler = function (a) {
  return z(a) === g;
};
var isStrictMode = function (a) {
  return z(a) === f;
};
var isSuspense = function (a) {
  return z(a) === p;
};
var isValidElementType = function (a) {
  return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === typeof a && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
};
var typeOf = z;
var reactIs_production_min = {
  AsyncMode: AsyncMode,
  ConcurrentMode: ConcurrentMode,
  ContextConsumer: ContextConsumer,
  ContextProvider: ContextProvider,
  Element: Element,
  ForwardRef: ForwardRef,
  Fragment: Fragment,
  Lazy: Lazy,
  Memo: Memo,
  Portal: Portal,
  Profiler: Profiler,
  StrictMode: StrictMode,
  Suspense: Suspense,
  isAsyncMode: isAsyncMode,
  isConcurrentMode: isConcurrentMode,
  isContextConsumer: isContextConsumer,
  isContextProvider: isContextProvider,
  isElement: isElement,
  isForwardRef: isForwardRef,
  isFragment: isFragment,
  isLazy: isLazy,
  isMemo: isMemo,
  isPortal: isPortal,
  isProfiler: isProfiler,
  isStrictMode: isStrictMode,
  isSuspense: isSuspense,
  isValidElementType: isValidElementType,
  typeOf: typeOf
};

var reactIs_development = createCommonjsModule(function (module, exports) {

  if (process.env.NODE_ENV !== "production") {
    (function () {
      var hasSymbol = typeof Symbol === 'function' && Symbol.for;
      var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
      var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
      var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
      var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
      var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
      var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
      var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
      var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
      var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
      var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
      var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
      var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
      var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
      var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
      var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
      var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
      var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
      var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;
      function isValidElementType(type) {
        return typeof type === 'string' || typeof type === 'function' || type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
      }
      function typeOf(object) {
        if (typeof object === 'object' && object !== null) {
          var $$typeof = object.$$typeof;
          switch ($$typeof) {
            case REACT_ELEMENT_TYPE:
              var type = object.type;
              switch (type) {
                case REACT_ASYNC_MODE_TYPE:
                case REACT_CONCURRENT_MODE_TYPE:
                case REACT_FRAGMENT_TYPE:
                case REACT_PROFILER_TYPE:
                case REACT_STRICT_MODE_TYPE:
                case REACT_SUSPENSE_TYPE:
                  return type;
                default:
                  var $$typeofType = type && type.$$typeof;
                  switch ($$typeofType) {
                    case REACT_CONTEXT_TYPE:
                    case REACT_FORWARD_REF_TYPE:
                    case REACT_LAZY_TYPE:
                    case REACT_MEMO_TYPE:
                    case REACT_PROVIDER_TYPE:
                      return $$typeofType;
                    default:
                      return $$typeof;
                  }
              }
            case REACT_PORTAL_TYPE:
              return $$typeof;
          }
        }
        return undefined;
      }
      var AsyncMode = REACT_ASYNC_MODE_TYPE;
      var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
      var ContextConsumer = REACT_CONTEXT_TYPE;
      var ContextProvider = REACT_PROVIDER_TYPE;
      var Element = REACT_ELEMENT_TYPE;
      var ForwardRef = REACT_FORWARD_REF_TYPE;
      var Fragment = REACT_FRAGMENT_TYPE;
      var Lazy = REACT_LAZY_TYPE;
      var Memo = REACT_MEMO_TYPE;
      var Portal = REACT_PORTAL_TYPE;
      var Profiler = REACT_PROFILER_TYPE;
      var StrictMode = REACT_STRICT_MODE_TYPE;
      var Suspense = REACT_SUSPENSE_TYPE;
      var hasWarnedAboutDeprecatedIsAsyncMode = false;
      function isAsyncMode(object) {
        {
          if (!hasWarnedAboutDeprecatedIsAsyncMode) {
            hasWarnedAboutDeprecatedIsAsyncMode = true;
            console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
          }
        }
        return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
      }
      function isConcurrentMode(object) {
        return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
      }
      function isContextConsumer(object) {
        return typeOf(object) === REACT_CONTEXT_TYPE;
      }
      function isContextProvider(object) {
        return typeOf(object) === REACT_PROVIDER_TYPE;
      }
      function isElement(object) {
        return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      function isForwardRef(object) {
        return typeOf(object) === REACT_FORWARD_REF_TYPE;
      }
      function isFragment(object) {
        return typeOf(object) === REACT_FRAGMENT_TYPE;
      }
      function isLazy(object) {
        return typeOf(object) === REACT_LAZY_TYPE;
      }
      function isMemo(object) {
        return typeOf(object) === REACT_MEMO_TYPE;
      }
      function isPortal(object) {
        return typeOf(object) === REACT_PORTAL_TYPE;
      }
      function isProfiler(object) {
        return typeOf(object) === REACT_PROFILER_TYPE;
      }
      function isStrictMode(object) {
        return typeOf(object) === REACT_STRICT_MODE_TYPE;
      }
      function isSuspense(object) {
        return typeOf(object) === REACT_SUSPENSE_TYPE;
      }
      exports.AsyncMode = AsyncMode;
      exports.ConcurrentMode = ConcurrentMode;
      exports.ContextConsumer = ContextConsumer;
      exports.ContextProvider = ContextProvider;
      exports.Element = Element;
      exports.ForwardRef = ForwardRef;
      exports.Fragment = Fragment;
      exports.Lazy = Lazy;
      exports.Memo = Memo;
      exports.Portal = Portal;
      exports.Profiler = Profiler;
      exports.StrictMode = StrictMode;
      exports.Suspense = Suspense;
      exports.isAsyncMode = isAsyncMode;
      exports.isConcurrentMode = isConcurrentMode;
      exports.isContextConsumer = isContextConsumer;
      exports.isContextProvider = isContextProvider;
      exports.isElement = isElement;
      exports.isForwardRef = isForwardRef;
      exports.isFragment = isFragment;
      exports.isLazy = isLazy;
      exports.isMemo = isMemo;
      exports.isPortal = isPortal;
      exports.isProfiler = isProfiler;
      exports.isStrictMode = isStrictMode;
      exports.isSuspense = isSuspense;
      exports.isValidElementType = isValidElementType;
      exports.typeOf = typeOf;
    })();
  }
});

var reactIs = createCommonjsModule(function (module) {

  if (process.env.NODE_ENV === 'production') {
    module.exports = reactIs_production_min;
  } else {
    module.exports = reactIs_development;
  }
});

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }
  return Object(val);
}
function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    }
    var test1 = new String('abc');
    test1[5] = 'de';
    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    }
    var test2 = {};
    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }
    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });
    if (order2.join('') !== '0123456789') {
      return false;
    }
    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });
    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
}
var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;
  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);
    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);
      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }
  return to;
};

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
var ReactPropTypesSecret_1 = ReactPropTypesSecret;

var has = Function.call.bind(Object.prototype.hasOwnProperty);

var printWarning = function () {};
if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
  var has$1 = has;
  printWarning = function (text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      throw new Error(message);
    } catch (x) {}
  };
}
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (has$1(typeSpecs, typeSpecName)) {
        var error;
        try {
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + typeof error + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          loggedTypeFailures[error.message] = true;
          var stack = getStack ? getStack() : '';
          printWarning('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
        }
      }
    }
  }
}
checkPropTypes.resetWarningCache = function () {
  if (process.env.NODE_ENV !== 'production') {
    loggedTypeFailures = {};
  }
};
var checkPropTypes_1 = checkPropTypes;

var printWarning$1 = function () {};
if (process.env.NODE_ENV !== 'production') {
  printWarning$1 = function (text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      throw new Error(message);
    } catch (x) {}
  };
}
function emptyFunctionThatReturnsNull() {
  return null;
}
var factoryWithTypeCheckers = function (isValidElement, throwOnDirectAccess) {
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator';
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }
  var ANONYMOUS = '<<anonymous>>';
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bigint: createPrimitiveTypeChecker('bigint'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),
    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker
  };
  function is(x, y) {
    if (x === y) {
      return x !== 0 || 1 / x === 1 / y;
    } else {
      return x !== x && y !== y;
    }
  }
  function PropTypeError(message, data) {
    this.message = message;
    this.data = data && typeof data === 'object' ? data : {};
    this.stack = '';
  }
  PropTypeError.prototype = Error.prototype;
  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;
      if (secret !== ReactPropTypesSecret_1) {
        if (throwOnDirectAccess) {
          var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
          err.name = 'Invariant Violation';
          throw err;
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          var cacheKey = componentName + ':' + propName;
          if (!manualPropTypeCallCache[cacheKey] && manualPropTypeWarningCount < 3) {
            printWarning$1('You are manually calling a React.PropTypes validation ' + 'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.');
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }
    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);
    return chainedCheckType;
  }
  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        var preciseType = getPreciseType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'), {
          expectedType: expectedType
        });
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }
  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!reactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (process.env.NODE_ENV !== 'production') {
        if (arguments.length > 1) {
          printWarning$1('Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' + 'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).');
        } else {
          printWarning$1('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }
      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }
  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? printWarning$1('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }
    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning$1('Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.');
        return emptyFunctionThatReturnsNull;
      }
    }
    function validate(props, propName, componentName, location, propFullName) {
      var expectedTypes = [];
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1);
        if (checkerResult == null) {
          return null;
        }
        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
          expectedTypes.push(checkerResult.data.expectedType);
        }
      }
      var expectedTypesMessage = expectedTypes.length > 0 ? ', expected one of type [' + expectedTypes.join(', ') + ']' : '';
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
    }
    return createChainableTypeChecker(validate);
  }
  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function invalidValidatorError(componentName, location, propFullName, key, type) {
    return new PropTypeError((componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + type + '`.');
  }
  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      var allKeys = objectAssign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (has(shapeTypes, key) && typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        if (!checker) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }
        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }
        return true;
      default:
        return false;
    }
  }
  function isSymbol(propType, propValue) {
    if (propType === 'symbol') {
      return true;
    }
    if (!propValue) {
      return false;
    }
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }
    return false;
  }
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }
  ReactPropTypes.checkPropTypes = checkPropTypes_1;
  ReactPropTypes.resetWarningCache = checkPropTypes_1.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;
var factoryWithThrowingShims = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret_1) {
      return;
    }
    var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
    err.name = 'Invariant Violation';
    throw err;
  }
  shim.isRequired = shim;
  function getShim() {
    return shim;
  }
  var ReactPropTypes = {
    array: shim,
    bigint: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,
    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,
    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};

var propTypes = createCommonjsModule(function (module) {
  if (process.env.NODE_ENV !== 'production') {
    var ReactIs = reactIs;
    var throwOnDirectAccess = true;
    module.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
  } else {
    module.exports = factoryWithThrowingShims();
  }
});

const Background = ({
  children
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "banner banner-container",
    style: {
      "zIndex": "2"
    }
  }, children);
};

const Header = () => {
  const {
    data: storeData,
    isLoading
  } = Digit.Hooks.useStore.getInitData();
  const {
    t
  } = useTranslation();
  if (isLoading) return /*#__PURE__*/React.createElement(Loader, null);
  return /*#__PURE__*/React.createElement("div", {
    className: "bannerHeader"
  });
};

const setEmployeeDetail = (userObject, token) => {
  var _JSON$parse;
  let locale = ((_JSON$parse = JSON.parse(sessionStorage.getItem("Digit.locale"))) === null || _JSON$parse === void 0 ? void 0 : _JSON$parse.value) || "en_IN";
  localStorage.setItem("Employee.tenant-id", userObject === null || userObject === void 0 ? void 0 : userObject.tenantId);
  localStorage.setItem("tenant-id", userObject === null || userObject === void 0 ? void 0 : userObject.tenantId);
  localStorage.setItem("citizen.userRequestObject", JSON.stringify(userObject));
  localStorage.setItem("locale", locale);
  localStorage.setItem("Employee.locale", locale);
  localStorage.setItem("token", token);
  localStorage.setItem("Employee.token", token);
  localStorage.setItem("user-info", JSON.stringify(userObject));
  localStorage.setItem("Employee.user-info", JSON.stringify(userObject));
};
const Login$1 = ({
  config: propsConfig,
  t,
  isDisabled
}) => {
  const {
    data: cities,
    isLoading
  } = Digit.Hooks.useTenants();
  const {
    data: storeData,
    isLoading: isStoreLoading
  } = Digit.Hooks.useStore.getInitData();
  const [user, setUser] = useState(null);
  const [showToast, setShowToast] = useState(null);
  const [disable, setDisable] = useState(false);
  const history = useHistory();
  useEffect(() => {
    var _user$info, _user$info$roles, _user$info2, _user$info2$roles, _window, _window$location, _window$location$href, _user$info3, _user$info4, _user$info4$roles, _user$info5, _user$info5$roles, _user$info6, _user$info7, _user$info7$roles, _user$info8, _user$info8$roles;
    if (!user) {
      return;
    }
    Digit.SessionStorage.set("citizen.userRequestObject", user);
    const filteredRoles = user === null || user === void 0 ? void 0 : (_user$info = user.info) === null || _user$info === void 0 ? void 0 : (_user$info$roles = _user$info.roles) === null || _user$info$roles === void 0 ? void 0 : _user$info$roles.filter(role => role.tenantId === Digit.SessionStorage.get("Employee.tenantId"));
    if ((user === null || user === void 0 ? void 0 : (_user$info2 = user.info) === null || _user$info2 === void 0 ? void 0 : (_user$info2$roles = _user$info2.roles) === null || _user$info2$roles === void 0 ? void 0 : _user$info2$roles.length) > 0) user.info.roles = filteredRoles;
    Digit.UserService.setUser(user);
    setEmployeeDetail(user === null || user === void 0 ? void 0 : user.info, user === null || user === void 0 ? void 0 : user.access_token);
    let redirectPath = "/digit-ui/employee";
    if ((_window = window) !== null && _window !== void 0 && (_window$location = _window.location) !== null && _window$location !== void 0 && (_window$location$href = _window$location.href) !== null && _window$location$href !== void 0 && _window$location$href.includes("from=")) {
      var _window2, _window2$location, _window2$location$hre, _window2$location$hre2;
      redirectPath = decodeURIComponent((_window2 = window) === null || _window2 === void 0 ? void 0 : (_window2$location = _window2.location) === null || _window2$location === void 0 ? void 0 : (_window2$location$hre = _window2$location.href) === null || _window2$location$hre === void 0 ? void 0 : (_window2$location$hre2 = _window2$location$hre.split("from=")) === null || _window2$location$hre2 === void 0 ? void 0 : _window2$location$hre2[1]) || "/digit-ui/employee";
    }
    if (user !== null && user !== void 0 && (_user$info3 = user.info) !== null && _user$info3 !== void 0 && _user$info3.roles && (user === null || user === void 0 ? void 0 : (_user$info4 = user.info) === null || _user$info4 === void 0 ? void 0 : (_user$info4$roles = _user$info4.roles) === null || _user$info4$roles === void 0 ? void 0 : _user$info4$roles.length) > 0 && user !== null && user !== void 0 && (_user$info5 = user.info) !== null && _user$info5 !== void 0 && (_user$info5$roles = _user$info5.roles) !== null && _user$info5$roles !== void 0 && _user$info5$roles.every(e => e.code === "NATADMIN")) {
      redirectPath = "/digit-ui/employee/dss/landing/NURT_DASHBOARD";
    }
    if (user !== null && user !== void 0 && (_user$info6 = user.info) !== null && _user$info6 !== void 0 && _user$info6.roles && (user === null || user === void 0 ? void 0 : (_user$info7 = user.info) === null || _user$info7 === void 0 ? void 0 : (_user$info7$roles = _user$info7.roles) === null || _user$info7$roles === void 0 ? void 0 : _user$info7$roles.length) > 0 && user !== null && user !== void 0 && (_user$info8 = user.info) !== null && _user$info8 !== void 0 && (_user$info8$roles = _user$info8.roles) !== null && _user$info8$roles !== void 0 && _user$info8$roles.every(e => e.code === "STADMIN")) {
      redirectPath = "/digit-ui/employee/dss/landing/home";
    }
    history.replace(redirectPath);
  }, [user]);
  const onLogin = async data => {
    if (!data.city) {
      alert("Please Select City!");
      return;
    }
    setDisable(true);
    const requestData = {
      ...data,
      userType: "EMPLOYEE"
    };
    requestData.tenantId = data.city.code;
    delete requestData.city;
    try {
      const {
        UserRequest: info,
        ...tokens
      } = await Digit.UserService.authenticate(requestData);
      Digit.SessionStorage.set("Employee.tenantId", info === null || info === void 0 ? void 0 : info.tenantId);
      setUser({
        info,
        ...tokens
      });
    } catch (err) {
      var _err$response, _err$response$data;
      setShowToast((err === null || err === void 0 ? void 0 : (_err$response = err.response) === null || _err$response === void 0 ? void 0 : (_err$response$data = _err$response.data) === null || _err$response$data === void 0 ? void 0 : _err$response$data.error_description) || "Invalid login credentials!");
      setTimeout(closeToast, 5000);
    }
    setDisable(false);
  };
  const closeToast = () => {
    setShowToast(null);
  };
  const onForgotPassword = () => {
    sessionStorage.getItem("User") && sessionStorage.removeItem("User");
    history.push("/digit-ui/employee/user/forgot-password");
  };
  const [userId, password, city] = propsConfig.inputs;
  const config = [{
    body: [{
      label: t(userId.label),
      type: userId.type,
      populators: {
        name: userId.name
      },
      isMandatory: true
    }, {
      label: t(password.label),
      type: password.type,
      populators: {
        name: password.name
      },
      isMandatory: true
    }, {
      label: t(city.label),
      type: city.type,
      populators: {
        name: city.name,
        customProps: {},
        component: (props, customProps) => /*#__PURE__*/React.createElement(Dropdown, Object.assign({
          option: cities,
          className: "login-city-dd",
          optionKey: "i18nKey",
          select: d => {
            props.onChange(d);
          },
          t: t
        }, customProps))
      },
      isMandatory: true
    }]
  }];
  return isLoading || isStoreLoading ? /*#__PURE__*/React.createElement(Loader, null) : /*#__PURE__*/React.createElement(Background, null, /*#__PURE__*/React.createElement("div", {
    className: "employeeBackbuttonAlign"
  }, /*#__PURE__*/React.createElement(BackButton, {
    variant: "white",
    style: {
      borderBottom: "none"
    }
  })), /*#__PURE__*/React.createElement(FormComposer, {
    onSubmit: onLogin,
    isDisabled: isDisabled || disable,
    noBoxShadow: true,
    inline: true,
    submitInForm: true,
    config: config,
    label: propsConfig.texts.submitButtonLabel,
    secondaryActionLabel: propsConfig.texts.secondaryButtonLabel,
    onSecondayActionClick: onForgotPassword,
    heading: propsConfig.texts.header,
    headingStyle: {
      textAlign: "center"
    },
    cardStyle: {
      margin: "auto",
      minWidth: "408px"
    },
    className: "loginFormStyleEmployee",
    buttonStyle: {
      maxWidth: "100%",
      width: "100%",
      backgroundColor: "#5a1166"
    }
  }), showToast && /*#__PURE__*/React.createElement(Toast, {
    error: true,
    label: t(showToast),
    onClose: closeToast
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      position: 'fixed',
      bottom: 0,
      backgroundColor: "white",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      color: "black"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      cursor: "pointer",
      fontSize: window.Digit.Utils.browser.isMobile() ? "12px" : "12px",
      fontWeight: "400"
    },
    onClick: () => {
      window.open('https://www.digit.org/', '_blank').focus();
    }
  }, "Powered by DIGIT"), /*#__PURE__*/React.createElement("span", {
    style: {
      margin: "0 10px",
      fontSize: window.Digit.Utils.browser.isMobile() ? "12px" : "12px"
    }
  }, "|"), /*#__PURE__*/React.createElement("a", {
    style: {
      cursor: "pointer",
      fontSize: window.Digit.Utils.browser.isMobile() ? "12px" : "12px",
      fontWeight: "400"
    },
    href: "#",
    target: "_blank"
  }, "UPYOG License"), /*#__PURE__*/React.createElement("span", {
    className: "upyog-copyright-footer",
    style: {
      margin: "0 10px",
      fontSize: "12px"
    }
  }, "|"), /*#__PURE__*/React.createElement("span", {
    className: "upyog-copyright-footer",
    style: {
      cursor: "pointer",
      fontSize: window.Digit.Utils.browser.isMobile() ? "12px" : "12px",
      fontWeight: "400"
    },
    onClick: () => {
      window.open('https://niua.in/', '_blank').focus();
    }
  }, "Copyright \xA9 2022 National Institute of Urban Affairs")), /*#__PURE__*/React.createElement("div", {
    className: "upyog-copyright-footer-web"
  }, /*#__PURE__*/React.createElement("span", {
    className: "",
    style: {
      cursor: "pointer",
      fontSize: window.Digit.Utils.browser.isMobile() ? "14px" : "16px",
      fontWeight: "400"
    },
    onClick: () => {
      window.open('https://niua.in/', '_blank').focus();
    }
  }, "Copyright \xA9 2022 National Institute of Urban Affairs"))));
};
Login$1.propTypes = {
  loginParams: propTypes.any
};
Login$1.defaultProps = {
  loginParams: null
};

const EmployeeLogin = () => {
  const {
    t
  } = useTranslation();
  const {
    path
  } = useRouteMatch();
  const loginParams = useMemo(() => loginConfig.map(step => {
    const texts = {};
    for (const key in step.texts) {
      texts[key] = t(step.texts[key]);
    }
    return {
      ...step,
      texts
    };
  }, [loginConfig]));
  return /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(Route, {
    path: `${path}`,
    exact: true
  }, /*#__PURE__*/React.createElement(Login$1, {
    config: loginParams[0],
    t: t
  })));
};

const config = [{
  texts: {
    header: "CORE_COMMON_RESET_PASSWORD_LABEL",
    submitButtonLabel: "CORE_COMMON_CHANGE_PASSWORD"
  },
  inputs: [{
    label: "CORE_LOGIN_USERNAME",
    type: "text",
    name: "userName",
    error: "ERR_HRMS_INVALID_USERNAME"
  }, {
    label: "CORE_LOGIN_NEW_PASSWORD",
    type: "password",
    name: "newPassword",
    error: "CORE_COMMON_REQUIRED_ERRMSG"
  }, {
    label: "CORE_LOGIN_CONFIRM_NEW_PASSWORD",
    type: "password",
    name: "confirmPassword",
    error: "CORE_COMMON_REQUIRED_ERRMSG"
  }]
}];

const ChangePasswordComponent = ({
  config: propsConfig,
  t
}) => {
  const [user, setUser] = useState(null);
  const {
    mobile_number: mobileNumber,
    tenantId
  } = Digit.Hooks.useQueryParams();
  const history = useHistory();
  const [otp, setOtp] = useState("");
  const [isOtpValid, setIsOtpValid] = useState(true);
  const [showToast, setShowToast] = useState(null);
  const getUserType = () => Digit.UserService.getType();
  useEffect(() => {
    var _location$state;
    if (!user) {
      Digit.UserService.setType("employee");
      return;
    }
    Digit.UserService.setUser(user);
    const redirectPath = ((_location$state = location.state) === null || _location$state === void 0 ? void 0 : _location$state.from) || "/digit-ui/employee";
    history.replace(redirectPath);
  }, [user]);
  const closeToast = () => {
    setShowToast(null);
  };
  const onResendOTP = async () => {
    const requestData = {
      otp: {
        mobileNumber,
        userType: getUserType().toUpperCase(),
        type: "passwordreset",
        tenantId
      }
    };
    try {
      await Digit.UserService.sendOtp(requestData, tenantId);
      setShowToast(t("ES_OTP_RESEND"));
    } catch (err) {
      var _err$response, _err$response$data;
      setShowToast((err === null || err === void 0 ? void 0 : (_err$response = err.response) === null || _err$response === void 0 ? void 0 : (_err$response$data = _err$response.data) === null || _err$response$data === void 0 ? void 0 : _err$response$data.error_description) || t("ES_INVALID_LOGIN_CREDENTIALS"));
    }
    setTimeout(closeToast, 5000);
  };
  const onChangePassword = async data => {
    try {
      if (data.newPassword !== data.confirmPassword) {
        return setShowToast(t("ERR_PASSWORD_DO_NOT_MATCH"));
      }
      const requestData = {
        ...data,
        otpReference: otp,
        tenantId,
        type: getUserType().toUpperCase()
      };
      const response = await Digit.UserService.changePassword(requestData, tenantId);
      navigateToLogin();
    } catch (err) {
      var _err$response2, _err$response2$data, _err$response2$data$e, _err$response2$data$e2, _err$response2$data$e3;
      setShowToast((err === null || err === void 0 ? void 0 : (_err$response2 = err.response) === null || _err$response2 === void 0 ? void 0 : (_err$response2$data = _err$response2.data) === null || _err$response2$data === void 0 ? void 0 : (_err$response2$data$e = _err$response2$data.error) === null || _err$response2$data$e === void 0 ? void 0 : (_err$response2$data$e2 = _err$response2$data$e.fields) === null || _err$response2$data$e2 === void 0 ? void 0 : (_err$response2$data$e3 = _err$response2$data$e2[0]) === null || _err$response2$data$e3 === void 0 ? void 0 : _err$response2$data$e3.message) || t("ES_SOMETHING_WRONG"));
      setTimeout(closeToast, 5000);
    }
  };
  const navigateToLogin = () => {
    history.replace("/digit-ui/employee/user/login");
  };
  const [username, password, confirmPassword] = propsConfig.inputs;
  const config = [{
    body: [{
      label: t(username.label),
      type: username.type,
      populators: {
        name: username.name
      },
      isMandatory: true
    }, {
      label: t(password.label),
      type: password.type,
      populators: {
        name: password.name
      },
      isMandatory: true
    }, {
      label: t(confirmPassword.label),
      type: confirmPassword.type,
      populators: {
        name: confirmPassword.name
      },
      isMandatory: true
    }]
  }];
  return /*#__PURE__*/React.createElement(Background, null, /*#__PURE__*/React.createElement("div", {
    className: "employeeBackbuttonAlign"
  }, /*#__PURE__*/React.createElement(BackButton, {
    variant: "white",
    style: {
      borderBottom: "none"
    }
  })), /*#__PURE__*/React.createElement(FormComposer, {
    onSubmit: onChangePassword,
    noBoxShadow: true,
    inline: true,
    submitInForm: true,
    config: config,
    label: propsConfig.texts.submitButtonLabel,
    cardStyle: {
      maxWidth: "408px",
      margin: "auto"
    },
    className: "employeeChangePassword"
  }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement(CardSubHeader, {
    style: {
      textAlign: "center"
    }
  }, " ", propsConfig.texts.header, " "), /*#__PURE__*/React.createElement(CardText, null, `${t(`CS_LOGIN_OTP_TEXT`)} `, /*#__PURE__*/React.createElement("b", null, " ", `${t(`+ 91 - `)}`, " ", mobileNumber)), /*#__PURE__*/React.createElement(SelectOtp, {
    t: t,
    userType: "employee",
    otp: otp,
    onOtpChange: setOtp,
    error: isOtpValid,
    onResend: onResendOTP
  })), showToast && /*#__PURE__*/React.createElement(Toast, {
    error: true,
    label: t(showToast),
    onClose: closeToast
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      position: 'fixed',
      bottom: 0,
      backgroundColor: "white",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      color: "black"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      cursor: "pointer",
      fontSize: window.Digit.Utils.browser.isMobile() ? "12px" : "12px",
      fontWeight: "400"
    },
    onClick: () => {
      window.open('https://www.digit.org/', '_blank').focus();
    }
  }, "Powered by DIGIT"), /*#__PURE__*/React.createElement("span", {
    style: {
      margin: "0 10px",
      fontSize: window.Digit.Utils.browser.isMobile() ? "12px" : "12px"
    }
  }, "|"), /*#__PURE__*/React.createElement("a", {
    style: {
      cursor: "pointer",
      fontSize: window.Digit.Utils.browser.isMobile() ? "12px" : "12px",
      fontWeight: "400"
    },
    href: "#",
    target: "_blank"
  }, "UPYOG License"), /*#__PURE__*/React.createElement("span", {
    className: "upyog-copyright-footer",
    style: {
      margin: "0 10px",
      fontSize: "12px"
    }
  }, "|"), /*#__PURE__*/React.createElement("span", {
    className: "upyog-copyright-footer",
    style: {
      cursor: "pointer",
      fontSize: window.Digit.Utils.browser.isMobile() ? "12px" : "12px",
      fontWeight: "400"
    },
    onClick: () => {
      window.open('https://niua.in/', '_blank').focus();
    }
  }, "Copyright \xA9 2022 National Institute of Urban Affairs")), /*#__PURE__*/React.createElement("div", {
    className: "upyog-copyright-footer-web"
  }, /*#__PURE__*/React.createElement("span", {
    className: "",
    style: {
      cursor: "pointer",
      fontSize: window.Digit.Utils.browser.isMobile() ? "14px" : "16px",
      fontWeight: "400"
    },
    onClick: () => {
      window.open('https://niua.in/', '_blank').focus();
    }
  }, "Copyright \xA9 2022 National Institute of Urban Affairs"))));
};
ChangePasswordComponent.propTypes = {
  loginParams: propTypes.any
};
ChangePasswordComponent.defaultProps = {
  loginParams: null
};

const EmployeeChangePassword = () => {
  const {
    t
  } = useTranslation();
  const {
    path
  } = useRouteMatch();
  const params = useMemo(() => config.map(step => {
    const texts = {};
    for (const key in step.texts) {
      texts[key] = t(step.texts[key]);
    }
    return {
      ...step,
      texts
    };
  }, [config]));
  return /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(Route, {
    path: `${path}`,
    exact: true
  }, /*#__PURE__*/React.createElement(ChangePasswordComponent, {
    config: params[0],
    t: t
  })));
};

const loginConfig$1 = [{
  texts: {
    header: "CORE_COMMON_FORGOT_PASSWORD_LABEL",
    description: "ES_FORGOT_PASSWORD_DESC",
    submitButtonLabel: "CORE_COMMON_CONTINUE"
  },
  inputs: [{
    label: "CORE_COMMON_MOBILE_NUMBER",
    type: "text",
    name: "mobileNumber",
    error: "ERR_HRMS_INVALID_MOBILE_NUMBER"
  }, {
    label: "CORE_COMMON_CITY",
    type: "custom",
    name: "city",
    error: "ERR_HRMS_INVALID_CITY"
  }]
}];

const ForgotPassword = ({
  config: propsConfig,
  t
}) => {
  const {
    data: cities,
    isLoading
  } = Digit.Hooks.useTenants();
  const [user, setUser] = useState(null);
  const history = useHistory();
  const [showToast, setShowToast] = useState(null);
  const getUserType = () => Digit.UserService.getType();
  useEffect(() => {
    var _location$state;
    if (!user) {
      Digit.UserService.setType("employee");
      return;
    }
    Digit.UserService.setUser(user);
    const redirectPath = ((_location$state = location.state) === null || _location$state === void 0 ? void 0 : _location$state.from) || "/digit-ui/employee";
    history.replace(redirectPath);
  }, [user]);
  const closeToast = () => {
    setShowToast(null);
  };
  const onForgotPassword = async data => {
    if (!data.city) {
      alert("Please Select City!");
      return;
    }
    const requestData = {
      otp: {
        mobileNumber: data.mobileNumber,
        userType: getUserType().toUpperCase(),
        type: "passwordreset",
        tenantId: data.city.code
      }
    };
    try {
      await Digit.UserService.sendOtp(requestData, data.city.code);
      history.push(`/digit-ui/employee/user/change-password?mobile_number=${data.mobileNumber}&tenantId=${data.city.code}`);
    } catch (err) {
      var _err$response, _err$response$data, _err$response$data$er, _err$response$data$er2, _err$response$data$er3;
      setShowToast((err === null || err === void 0 ? void 0 : (_err$response = err.response) === null || _err$response === void 0 ? void 0 : (_err$response$data = _err$response.data) === null || _err$response$data === void 0 ? void 0 : (_err$response$data$er = _err$response$data.error) === null || _err$response$data$er === void 0 ? void 0 : (_err$response$data$er2 = _err$response$data$er.fields) === null || _err$response$data$er2 === void 0 ? void 0 : (_err$response$data$er3 = _err$response$data$er2[0]) === null || _err$response$data$er3 === void 0 ? void 0 : _err$response$data$er3.message) || "Invalid login credentials!");
      setTimeout(closeToast, 5000);
    }
  };
  const navigateToLogin = () => {
    history.replace("/digit-ui/employee/login");
  };
  const [userId, city] = propsConfig.inputs;
  const config = [{
    body: [{
      label: t(userId.label),
      type: userId.type,
      populators: {
        name: userId.name,
        componentInFront: "+91"
      },
      isMandatory: true
    }, {
      label: t(city.label),
      type: city.type,
      populators: {
        name: city.name,
        customProps: {},
        component: (props, customProps) => /*#__PURE__*/React.createElement(Dropdown, Object.assign({
          option: cities,
          optionKey: "name",
          id: city.name,
          className: "login-city-dd",
          select: d => {
            props.onChange(d);
          }
        }, customProps))
      },
      isMandatory: true
    }]
  }];
  if (isLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return /*#__PURE__*/React.createElement(Background, null, /*#__PURE__*/React.createElement("div", {
    className: "employeeBackbuttonAlign"
  }, /*#__PURE__*/React.createElement(BackButton, {
    variant: "white",
    style: {
      borderBottom: "none"
    }
  })), /*#__PURE__*/React.createElement(FormComposer, {
    onSubmit: onForgotPassword,
    noBoxShadow: true,
    inline: true,
    submitInForm: true,
    config: config,
    label: propsConfig.texts.submitButtonLabel,
    secondaryActionLabel: propsConfig.texts.secondaryButtonLabel,
    onSecondayActionClick: navigateToLogin,
    heading: propsConfig.texts.header,
    description: propsConfig.texts.description,
    headingStyle: {
      textAlign: "center"
    },
    cardStyle: {
      maxWidth: "408px",
      margin: "auto"
    },
    className: "employeeForgotPassword"
  }, /*#__PURE__*/React.createElement(Header, null)), showToast && /*#__PURE__*/React.createElement(Toast, {
    error: true,
    label: t(showToast),
    onClose: closeToast
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      position: 'fixed',
      bottom: 0,
      backgroundColor: "white",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      color: "black"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      cursor: "pointer",
      fontSize: window.Digit.Utils.browser.isMobile() ? "12px" : "12px",
      fontWeight: "400"
    },
    onClick: () => {
      window.open('https://www.digit.org/', '_blank').focus();
    }
  }, "Powered by DIGIT"), /*#__PURE__*/React.createElement("span", {
    style: {
      margin: "0 10px",
      fontSize: window.Digit.Utils.browser.isMobile() ? "12px" : "12px"
    }
  }, "|"), /*#__PURE__*/React.createElement("a", {
    style: {
      cursor: "pointer",
      fontSize: window.Digit.Utils.browser.isMobile() ? "12px" : "12px",
      fontWeight: "400"
    },
    href: "#",
    target: "_blank"
  }, "UPYOG License"), /*#__PURE__*/React.createElement("span", {
    className: "upyog-copyright-footer",
    style: {
      margin: "0 10px",
      fontSize: "12px"
    }
  }, "|"), /*#__PURE__*/React.createElement("span", {
    className: "upyog-copyright-footer",
    style: {
      cursor: "pointer",
      fontSize: window.Digit.Utils.browser.isMobile() ? "12px" : "12px",
      fontWeight: "400"
    },
    onClick: () => {
      window.open('https://niua.in/', '_blank').focus();
    }
  }, "Copyright \xA9 2022 National Institute of Urban Affairs")), /*#__PURE__*/React.createElement("div", {
    className: "upyog-copyright-footer-web"
  }, /*#__PURE__*/React.createElement("span", {
    className: "",
    style: {
      cursor: "pointer",
      fontSize: window.Digit.Utils.browser.isMobile() ? "14px" : "16px",
      fontWeight: "400"
    },
    onClick: () => {
      window.open('https://niua.in/', '_blank').focus();
    }
  }, "Copyright \xA9 2022 National Institute of Urban Affairs"))));
};
ForgotPassword.propTypes = {
  loginParams: propTypes.any
};
ForgotPassword.defaultProps = {
  loginParams: null
};

const EmployeeForgotPassword = () => {
  const {
    t
  } = useTranslation();
  const {
    path
  } = useRouteMatch();
  const params = useMemo(() => loginConfig$1.map(step => {
    const texts = {};
    for (const key in step.texts) {
      texts[key] = t(step.texts[key]);
    }
    return {
      ...step,
      texts
    };
  }, [loginConfig$1]));
  return /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(Route, {
    path: `${path}`,
    exact: true
  }, /*#__PURE__*/React.createElement(ForgotPassword, {
    config: params[0],
    t: t
  })));
};

const LanguageSelection = () => {
  const {
    data: storeData,
    isLoading
  } = Digit.Hooks.useStore.getInitData();
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const {
    languages,
    stateInfo
  } = storeData || {};
  const selectedLanguage = Digit.StoreData.getCurrentLanguage();
  const [selected, setselected] = useState(selectedLanguage);
  const handleChangeLanguage = language => {
    setselected(language.value);
    Digit.LocalizationService.changeLanguage(language.value, stateInfo.code);
  };
  const handleSubmit = event => {
    history.push("/digit-ui/employee/user/login");
  };
  if (isLoading) return null;
  return /*#__PURE__*/React.createElement(Background, null, /*#__PURE__*/React.createElement(Card, {
    className: "bannerCard removeBottomMargin"
  }, /*#__PURE__*/React.createElement("div", {
    className: "language-selector",
    style: {
      justifyContent: "space-around",
      marginBottom: "24px",
      padding: "0 5%"
    }
  }, languages.map((language, index) => /*#__PURE__*/React.createElement("div", {
    className: "language-button-container",
    key: index
  }, /*#__PURE__*/React.createElement(CustomButton, {
    selected: language.value === selected,
    text: language.label,
    onClick: () => handleChangeLanguage(language)
  })))), /*#__PURE__*/React.createElement(SubmitBar, {
    style: {
      width: "100%"
    },
    label: t(`CORE_COMMON_CONTINUE`),
    onSubmit: handleSubmit
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      position: 'fixed',
      bottom: 0,
      backgroundColor: "white",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      color: "black"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      cursor: "pointer",
      fontSize: window.Digit.Utils.browser.isMobile() ? "12px" : "12px",
      fontWeight: "400"
    },
    onClick: () => {
      window.open('https://www.digit.org/', '_blank').focus();
    }
  }, "Powered by DIGIT"), /*#__PURE__*/React.createElement("span", {
    style: {
      margin: "0 10px",
      fontSize: window.Digit.Utils.browser.isMobile() ? "12px" : "12px"
    }
  }, "|"), /*#__PURE__*/React.createElement("a", {
    style: {
      cursor: "pointer",
      fontSize: window.Digit.Utils.browser.isMobile() ? "12px" : "12px",
      fontWeight: "400"
    },
    href: "#",
    target: "_blank"
  }, "UPYOG License"), /*#__PURE__*/React.createElement("span", {
    className: "upyog-copyright-footer",
    style: {
      margin: "0 10px",
      fontSize: "12px"
    }
  }, "|"), /*#__PURE__*/React.createElement("span", {
    className: "upyog-copyright-footer",
    style: {
      cursor: "pointer",
      fontSize: window.Digit.Utils.browser.isMobile() ? "12px" : "12px",
      fontWeight: "400"
    },
    onClick: () => {
      window.open('https://niua.in/', '_blank').focus();
    }
  }, "Copyright \xA9 2022 National Institute of Urban Affairs")), /*#__PURE__*/React.createElement("div", {
    className: "upyog-copyright-footer-web"
  }, /*#__PURE__*/React.createElement("span", {
    className: "",
    style: {
      cursor: "pointer",
      fontSize: window.Digit.Utils.browser.isMobile() ? "14px" : "16px",
      fontWeight: "400"
    },
    onClick: () => {
      window.open('https://niua.in/', '_blank').focus();
    }
  }, "Copyright \xA9 2022 National Institute of Urban Affairs"))));
};

const getTenants = (codes, tenants) => {
  return tenants.filter(tenant => {
    var _codes$map;
    return codes === null || codes === void 0 ? void 0 : (_codes$map = codes.map) === null || _codes$map === void 0 ? void 0 : _codes$map.call(codes, item => item.code).includes(tenant.code);
  });
};
const AppModules = ({
  stateCode,
  userType,
  modules,
  appTenants
}) => {
  const ComponentProvider = Digit.Contexts.ComponentProvider;
  const {
    path
  } = useRouteMatch();
  const location = useLocation();
  const user = Digit.UserService.getUser();
  if (!user || !(user !== null && user !== void 0 && user.access_token) || !(user !== null && user !== void 0 && user.info)) {
    return /*#__PURE__*/React.createElement(Redirect, {
      to: {
        pathname: "/digit-ui/employee/user/login",
        state: {
          from: location.pathname + location.search
        }
      }
    });
  }
  const appRoutes = modules.map(({
    code,
    tenants
  }, index) => {
    const Module = Digit.ComponentRegistryService.getComponent(`${code}Module`);
    return Module ? /*#__PURE__*/React.createElement(Route, {
      key: index,
      path: `${path}/${code.toLowerCase()}`
    }, /*#__PURE__*/React.createElement(Module, {
      stateCode: stateCode,
      moduleCode: code,
      userType: userType,
      tenants: getTenants(tenants, appTenants)
    })) : /*#__PURE__*/React.createElement(Route, {
      key: index,
      path: `${path}/${code.toLowerCase()}`
    }, /*#__PURE__*/React.createElement(Redirect, {
      to: {
        pathname: "/digit-ui/employee/user/error?type=notfound",
        state: {
          from: location.pathname + location.search
        }
      }
    }));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "ground-container"
  }, /*#__PURE__*/React.createElement(Switch, null, appRoutes, /*#__PURE__*/React.createElement(Route, {
    path: `${path}/login`
  }, /*#__PURE__*/React.createElement(Redirect, {
    to: {
      pathname: "/digit-ui/employee/user/login",
      state: {
        from: location.pathname + location.search
      }
    }
  })), /*#__PURE__*/React.createElement(Route, {
    path: `${path}/forgot-password`
  }, /*#__PURE__*/React.createElement(EmployeeForgotPassword, null)), /*#__PURE__*/React.createElement(Route, {
    path: `${path}/change-password`
  }, /*#__PURE__*/React.createElement(EmployeeChangePassword, null)), /*#__PURE__*/React.createElement(Route, null, /*#__PURE__*/React.createElement(AppHome, {
    userType: userType,
    modules: modules
  }))));
};

const ErrorConfig = {
  error: {
    imgUrl: `https://s3.ap-south-1.amazonaws.com/egov-qa-assets/error-image.png`,
    infoMessage: "CORE_SOMETHING_WENT_WRONG",
    buttonInfo: "ACTION_TEST_HOME"
  },
  maintenance: {
    imgUrl: `https://s3.ap-south-1.amazonaws.com/egov-qa-assets/maintainence-image.png`,
    infoMessage: "CORE_UNDER_MAINTENANCE",
    buttonInfo: "ACTION_TEST_HOME"
  },
  notfound: {
    imgUrl: `https://s3.ap-south-1.amazonaws.com/egov-qa-assets/PageNotFound.png`,
    infoMessage: "CORE_NOT_FOUND",
    buttonInfo: "ACTION_TEST_HOME"
  }
};
const ErrorComponent = props => {
  const {
    type = "error"
  } = Digit.Hooks.useQueryParams();
  const config = ErrorConfig[type];
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: "error-boundary"
  }, /*#__PURE__*/React.createElement("div", {
    className: "error-container"
  }, /*#__PURE__*/React.createElement("img", {
    src: config.imgUrl,
    alt: "error"
  }), /*#__PURE__*/React.createElement("h1", null, t(config.infoMessage)), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      props.goToHome();
    }
  }, t(config.buttonInfo))));
};

const Redircter = () => {
  const path = Digit.UserService.getType() === "employee" ? "/digit-ui/employee/user/error" : "/digit-ui/citizen/error";
  if (window.location.href.includes("employee/user/error") || window.location.href.includes("citizen/error") || process.env.NODE_ENV === "development") ; else {
    window.location.href = path;
  }
  return /*#__PURE__*/React.createElement("span", null);
};
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorStack: null,
      hasError: false
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error: error === null || error === void 0 ? void 0 : error.message,
      hasError: true,
      errorStack: error === null || error === void 0 ? void 0 : error.stack
    };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error === null || error === void 0 ? void 0 : error.message,
      hasError: true,
      errorStack: error === null || error === void 0 ? void 0 : error.stack
    });
  }
  render() {
    if (this.state.hasError) {
      return /*#__PURE__*/React.createElement("div", {
        className: "error-boundary"
      }, /*#__PURE__*/React.createElement(Redircter, null), /*#__PURE__*/React.createElement(ErrorComponent, {
        initData: this.props.initData
      }));
    }
    return this.props.children;
  }
}

const stringReplaceAll = (str = "", searcher = "", replaceWith = "") => {
  if (searcher == "") return str;
  while ((_str = str) !== null && _str !== void 0 && _str.includes(searcher)) {
    var _str, _str2;
    str = (_str2 = str) === null || _str2 === void 0 ? void 0 : _str2.replace(searcher, replaceWith);
  }
  return str;
};
const ChangeCity = prop => {
  var _stringReplaceAll2;
  const [dropDownData, setDropDownData] = useState(null);
  const [selectCityData, setSelectCityData] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const history = useHistory();
  let selectedCities = [];
  const handleChangeCity = city => {
    var _Digit$SessionStorage, _Digit$SessionStorage2, _Digit$SessionStorage3;
    const loggedInData = Digit.SessionStorage.get("citizen.userRequestObject");
    const filteredRoles = (_Digit$SessionStorage = Digit.SessionStorage.get("citizen.userRequestObject")) === null || _Digit$SessionStorage === void 0 ? void 0 : (_Digit$SessionStorage2 = _Digit$SessionStorage.info) === null || _Digit$SessionStorage2 === void 0 ? void 0 : (_Digit$SessionStorage3 = _Digit$SessionStorage2.roles) === null || _Digit$SessionStorage3 === void 0 ? void 0 : _Digit$SessionStorage3.filter(role => role.tenantId === city.value);
    if ((filteredRoles === null || filteredRoles === void 0 ? void 0 : filteredRoles.length) > 0) {
      loggedInData.info.roles = filteredRoles;
      loggedInData.info.tenantId = city === null || city === void 0 ? void 0 : city.value;
    }
    Digit.SessionStorage.set("Employee.tenantId", city === null || city === void 0 ? void 0 : city.value);
    Digit.UserService.setUser(loggedInData);
    setDropDownData(city);
    if (window.location.href.includes("/digit-ui/employee/")) {
      var _location$state;
      const redirectPath = ((_location$state = location.state) === null || _location$state === void 0 ? void 0 : _location$state.from) || "/digit-ui/employee";
      history.replace(redirectPath);
    }
    window.location.reload();
  };
  useEffect(() => {
    var _userloggedValues$inf, _userloggedValues$inf2;
    const userloggedValues = Digit.SessionStorage.get("citizen.userRequestObject");
    let teantsArray = [],
      filteredArray = [];
    userloggedValues === null || userloggedValues === void 0 ? void 0 : (_userloggedValues$inf = userloggedValues.info) === null || _userloggedValues$inf === void 0 ? void 0 : (_userloggedValues$inf2 = _userloggedValues$inf.roles) === null || _userloggedValues$inf2 === void 0 ? void 0 : _userloggedValues$inf2.forEach(role => teantsArray.push(role.tenantId));
    let unique = teantsArray.filter((item, i, ar) => ar.indexOf(item) === i);
    unique === null || unique === void 0 ? void 0 : unique.forEach(uniCode => {
      var _stringReplaceAll;
      filteredArray.push({
        label: prop === null || prop === void 0 ? void 0 : prop.t(`TENANT_TENANTS_${(_stringReplaceAll = stringReplaceAll(uniCode, ".", "_")) === null || _stringReplaceAll === void 0 ? void 0 : _stringReplaceAll.toUpperCase()}`),
        value: uniCode
      });
    });
    selectedCities = filteredArray === null || filteredArray === void 0 ? void 0 : filteredArray.filter(select => select.value == Digit.SessionStorage.get("Employee.tenantId"));
    setSelectCityData(filteredArray);
  }, [dropDownData]);
  return /*#__PURE__*/React.createElement("div", {
    style: prop !== null && prop !== void 0 && prop.mobileView ? {
      color: "#767676"
    } : {}
  }, /*#__PURE__*/React.createElement(Dropdown, {
    option: selectCityData,
    selected: selectCityData.find(cityValue => cityValue.value === (dropDownData === null || dropDownData === void 0 ? void 0 : dropDownData.value)),
    optionKey: "label",
    select: handleChangeCity,
    freeze: true,
    customSelector: /*#__PURE__*/React.createElement("label", {
      className: "cp"
    }, prop === null || prop === void 0 ? void 0 : prop.t(`TENANT_TENANTS_${(_stringReplaceAll2 = stringReplaceAll(Digit.SessionStorage.get("Employee.tenantId"), ".", "_")) === null || _stringReplaceAll2 === void 0 ? void 0 : _stringReplaceAll2.toUpperCase()}`))
  }));
};

const ChangeLanguage = prop => {
  const isDropdown = prop.dropdown || false;
  const {
    data: storeData,
    isLoading
  } = Digit.Hooks.useStore.getInitData();
  const {
    languages,
    stateInfo
  } = storeData || {};
  const selectedLanguage = Digit.StoreData.getCurrentLanguage();
  const [selected, setselected] = useState(selectedLanguage);
  const handleChangeLanguage = language => {
    setselected(language.value);
    Digit.LocalizationService.changeLanguage(language.value, stateInfo.code);
  };
  if (isLoading) return null;
  if (isDropdown) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Dropdown, {
      option: languages,
      selected: languages.find(language => language.value === selectedLanguage),
      optionKey: "label",
      select: handleChangeLanguage,
      freeze: true,
      customSelector: /*#__PURE__*/React.createElement("label", {
        className: "cp"
      }, languages.find(language => language.value === selected).label)
    }));
  } else {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: "5px"
      }
    }, "Language"), /*#__PURE__*/React.createElement("div", {
      className: "language-selector"
    }, languages.map((language, index) => /*#__PURE__*/React.createElement("div", {
      className: "language-button-container",
      key: index
    }, /*#__PURE__*/React.createElement(CustomButton, {
      selected: language.value === selected,
      text: language.label,
      onClick: () => handleChangeLanguage(language)
    })))));
  }
};

const TextToImg = props => {
  var _props$name, _props$name$;
  return /*#__PURE__*/React.createElement("span", {
    className: "user-img-txt",
    onClick: props.toggleMenu,
    title: props.name
  }, props === null || props === void 0 ? void 0 : (_props$name = props.name) === null || _props$name === void 0 ? void 0 : (_props$name$ = _props$name[0]) === null || _props$name$ === void 0 ? void 0 : _props$name$.toUpperCase());
};
const TopBar = ({
  t,
  stateInfo,
  toggleSidebar,
  isSidebarOpen,
  handleLogout,
  userDetails,
  CITIZEN,
  cityDetails,
  mobileView,
  userOptions,
  handleUserDropdownSelection,
  logoUrl,
  showLanguageChange: _showLanguageChange = true,
  setSideBarScrollTop
}) => {
  var _userDetails$info2, _cityDetails$city, _cityDetails$city2, _stateInfo$code, _userDetails$info3, _userDetails$info4, _userDetails$info4$us;
  const [profilePic, setProfilePic] = React.useState(null);
  React.useEffect(async () => {
    var _userDetails$info;
    const tenant = Digit.ULBService.getCurrentTenantId();
    const uuid = userDetails === null || userDetails === void 0 ? void 0 : (_userDetails$info = userDetails.info) === null || _userDetails$info === void 0 ? void 0 : _userDetails$info.uuid;
    if (uuid) {
      const usersResponse = await Digit.UserService.userSearch(tenant, {
        uuid: [uuid]
      }, {});
      if (usersResponse && usersResponse.user && usersResponse.user.length) {
        var _userDetails$photo;
        const userDetails = usersResponse.user[0];
        const thumbs = userDetails === null || userDetails === void 0 ? void 0 : (_userDetails$photo = userDetails.photo) === null || _userDetails$photo === void 0 ? void 0 : _userDetails$photo.split(",");
        setProfilePic(thumbs === null || thumbs === void 0 ? void 0 : thumbs.at(0));
      }
    }
  }, [profilePic !== null, userDetails === null || userDetails === void 0 ? void 0 : (_userDetails$info2 = userDetails.info) === null || _userDetails$info2 === void 0 ? void 0 : _userDetails$info2.uuid]);
  const CitizenHomePageTenantId = Digit.ULBService.getCitizenCurrentTenant(true);
  let history = useHistory();
  const {
    pathname
  } = useLocation();
  const conditionsToDisableNotificationCountTrigger = () => {
    var _Digit$UserService, _Digit$UserService$ge, _Digit$UserService$ge2, _Digit$UserService2, _Digit$UserService2$g, _Digit$UserService2$g2;
    if (((_Digit$UserService = Digit.UserService) === null || _Digit$UserService === void 0 ? void 0 : (_Digit$UserService$ge = _Digit$UserService.getUser()) === null || _Digit$UserService$ge === void 0 ? void 0 : (_Digit$UserService$ge2 = _Digit$UserService$ge.info) === null || _Digit$UserService$ge2 === void 0 ? void 0 : _Digit$UserService$ge2.type) === "EMPLOYEE") return false;
    if (((_Digit$UserService2 = Digit.UserService) === null || _Digit$UserService2 === void 0 ? void 0 : (_Digit$UserService2$g = _Digit$UserService2.getUser()) === null || _Digit$UserService2$g === void 0 ? void 0 : (_Digit$UserService2$g2 = _Digit$UserService2$g.info) === null || _Digit$UserService2$g2 === void 0 ? void 0 : _Digit$UserService2$g2.type) === "CITIZEN") {
      if (!CitizenHomePageTenantId) return false;else return true;
    }
    return false;
  };
  const {
    data: {
      unreadCount: unreadNotificationCount
    } = {},
    isSuccess: notificationCountLoaded
  } = Digit.Hooks.useNotificationCount({
    tenantId: CitizenHomePageTenantId,
    config: {
      enabled: conditionsToDisableNotificationCountTrigger()
    }
  });
  const updateSidebar = () => {
    if (!Digit.clikOusideFired) {
      toggleSidebar(true);
      setSideBarScrollTop(true);
    } else {
      Digit.clikOusideFired = false;
    }
  };
  function onNotificationIconClick() {
    history.push("/digit-ui/citizen/engagement/notifications");
  }
  const urlsToDisableNotificationIcon = pathname => {
    var _Digit$UserService3, _Digit$UserService3$g;
    return !!((_Digit$UserService3 = Digit.UserService) !== null && _Digit$UserService3 !== void 0 && (_Digit$UserService3$g = _Digit$UserService3.getUser()) !== null && _Digit$UserService3$g !== void 0 && _Digit$UserService3$g.access_token) ? false : ["/digit-ui/citizen/select-language", "/digit-ui/citizen/select-location"].includes(pathname);
  };
  if (CITIZEN) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TopBar$1, {
      img: stateInfo === null || stateInfo === void 0 ? void 0 : stateInfo.logoUrlWhite,
      isMobile: true,
      toggleSidebar: updateSidebar,
      logoUrl: stateInfo === null || stateInfo === void 0 ? void 0 : stateInfo.logoUrlWhite,
      onLogout: handleLogout,
      userDetails: userDetails,
      notificationCount: unreadNotificationCount < 99 ? unreadNotificationCount : 99,
      notificationCountLoaded: notificationCountLoaded,
      cityOfCitizenShownBesideLogo: t(CitizenHomePageTenantId),
      onNotificationIconClick: onNotificationIconClick,
      hideNotificationIconOnSomeUrlsWhenNotLoggedIn: urlsToDisableNotificationIcon(pathname),
      changeLanguage: !mobileView ? /*#__PURE__*/React.createElement(ChangeLanguage, {
        dropdown: true
      }) : null
    }));
  }
  const loggedin = userDetails !== null && userDetails !== void 0 && userDetails.access_token ? true : false;
  return /*#__PURE__*/React.createElement("div", {
    className: "topbar"
  }, mobileView ? /*#__PURE__*/React.createElement(Hamburger, {
    handleClick: toggleSidebar,
    color: "#9E9E9E"
  }) : null, /*#__PURE__*/React.createElement("img", {
    className: "city",
    src: "https://in-egov-assets.s3.ap-south-1.amazonaws.com/images/Upyog-logo.png"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%"
    }
  }, loggedin && (cityDetails !== null && cityDetails !== void 0 && (_cityDetails$city = cityDetails.city) !== null && _cityDetails$city !== void 0 && _cityDetails$city.ulbGrade ? /*#__PURE__*/React.createElement("p", {
    className: "ulb",
    style: mobileView ? {
      fontSize: "14px",
      display: "inline-block"
    } : {}
  }, t(cityDetails === null || cityDetails === void 0 ? void 0 : cityDetails.i18nKey).toUpperCase(), " ", t(`ULBGRADE_${cityDetails === null || cityDetails === void 0 ? void 0 : (_cityDetails$city2 = cityDetails.city) === null || _cityDetails$city2 === void 0 ? void 0 : _cityDetails$city2.ulbGrade.toUpperCase().replace(" ", "_").replace(".", "_")}`).toUpperCase()) : /*#__PURE__*/React.createElement("img", {
    className: "state",
    src: logoUrl
  })), !loggedin && /*#__PURE__*/React.createElement("p", {
    className: "ulb",
    style: mobileView ? {
      fontSize: "14px",
      display: "inline-block"
    } : {}
  }, t(`MYCITY_${stateInfo === null || stateInfo === void 0 ? void 0 : (_stateInfo$code = stateInfo.code) === null || _stateInfo$code === void 0 ? void 0 : _stateInfo$code.toUpperCase()}_LABEL`), " ", t(`MYCITY_STATECODE_LABEL`)), !mobileView && /*#__PURE__*/React.createElement("div", {
    className: mobileView ? "right" : "flex-right right w-80 column-gap-15",
    style: !loggedin ? {
      width: "80%"
    } : {}
  }, /*#__PURE__*/React.createElement("div", {
    className: "left"
  }, !window.location.href.includes("employee/user/login") && !window.location.href.includes("employee/user/language-selection") && /*#__PURE__*/React.createElement(ChangeCity, {
    dropdown: true,
    t: t
  })), /*#__PURE__*/React.createElement("div", {
    className: "left"
  }, _showLanguageChange && /*#__PURE__*/React.createElement(ChangeLanguage, {
    dropdown: true
  })), (userDetails === null || userDetails === void 0 ? void 0 : userDetails.access_token) && /*#__PURE__*/React.createElement("div", {
    className: "left"
  }, /*#__PURE__*/React.createElement(Dropdown, {
    option: userOptions,
    optionKey: "name",
    select: handleUserDropdownSelection,
    showArrow: true,
    freeze: true,
    style: mobileView ? {
      right: 0
    } : {},
    optionCardStyles: {
      overflow: "revert"
    },
    customSelector: profilePic == null ? /*#__PURE__*/React.createElement(TextToImg, {
      name: (userDetails === null || userDetails === void 0 ? void 0 : (_userDetails$info3 = userDetails.info) === null || _userDetails$info3 === void 0 ? void 0 : _userDetails$info3.name) || (userDetails === null || userDetails === void 0 ? void 0 : (_userDetails$info4 = userDetails.info) === null || _userDetails$info4 === void 0 ? void 0 : (_userDetails$info4$us = _userDetails$info4.userInfo) === null || _userDetails$info4$us === void 0 ? void 0 : _userDetails$info4$us.name) || "Employee"
    }) : /*#__PURE__*/React.createElement("img", {
      src: "https://in-egov-assets.s3.ap-south-1.amazonaws.com/images/Upyog-logo.png",
      style: {
        height: "48px",
        width: "48px",
        borderRadius: "50%"
      }
    })
  })), /*#__PURE__*/React.createElement("img", {
    className: "state",
    src: "https://in-egov-assets.s3.ap-south-1.amazonaws.com/images/Upyog-logo.png"
  }))));
};

const SideBarMenu = (t, closeSidebar, redirectToLoginPage, isEmployee, storeData, tenantId) => {
  var _storeData$tenants$fi, _storeData$tenants$;
  let filteredTenantData = (storeData === null || storeData === void 0 ? void 0 : (_storeData$tenants$fi = storeData.tenants.filter(e => e.code === tenantId)[0]) === null || _storeData$tenants$fi === void 0 ? void 0 : _storeData$tenants$fi.contactNumber) || (storeData === null || storeData === void 0 ? void 0 : (_storeData$tenants$ = storeData.tenants[0]) === null || _storeData$tenants$ === void 0 ? void 0 : _storeData$tenants$.contactNumber);
  return [{
    type: "link",
    element: "HOME",
    text: t("COMMON_BOTTOM_NAVIGATION_HOME"),
    link: isEmployee ? "/digit-ui/employee" : "/digit-ui/citizen",
    icon: "HomeIcon",
    populators: {
      onClick: closeSidebar
    }
  }, {
    type: "component",
    element: "LANGUAGE",
    action: /*#__PURE__*/React.createElement(ChangeLanguage, null),
    icon: "LanguageIcon"
  }, {
    id: "login-btn",
    element: "LOGIN",
    text: t("CORE_COMMON_LOGIN"),
    icon: "LoginIcon",
    populators: {
      onClick: redirectToLoginPage
    }
  }, {
    id: "help-line",
    text: /*#__PURE__*/React.createElement(React.Fragment, null, t("CS_COMMON_HELPLINE"), /*#__PURE__*/React.createElement("div", {
      className: "telephone",
      style: {
        marginTop: "-10%"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "link"
    }, /*#__PURE__*/React.createElement("a", {
      href: `tel:${filteredTenantData}`
    }, filteredTenantData)))),
    element: "Helpline",
    icon: "Phone"
  }];
};

const Heading = props => {
  return /*#__PURE__*/React.createElement("h1", {
    className: "heading-m"
  }, props.label);
};
const Close = () => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "#FFFFFF"
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0V0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
}));
const CloseBtn = props => {
  return /*#__PURE__*/React.createElement("div", {
    onClick: props === null || props === void 0 ? void 0 : props.onClick,
    style: props !== null && props !== void 0 && props.isMobileView ? {
      padding: 5
    } : null
  }, props !== null && props !== void 0 && props.isMobileView ? /*#__PURE__*/React.createElement(CloseSvg, null) : /*#__PURE__*/React.createElement("div", {
    className: "icon-bg-secondary",
    style: {
      backgroundColor: '#505A5F'
    }
  }, " ", /*#__PURE__*/React.createElement(Close, null), " "));
};
const LogoutDialog = ({
  onSelect,
  onCancel,
  onDismiss
}) => {
  const {
    t
  } = useTranslation();
  const mobileDeviceWidth = 780;
  const [isMobileView, setIsMobileView] = React.useState(window.innerWidth <= mobileDeviceWidth);
  const onResize = () => {
    if (window.innerWidth <= mobileDeviceWidth) {
      if (!isMobileView) {
        setIsMobileView(true);
      }
    } else {
      if (isMobileView) {
        setIsMobileView(false);
      }
    }
  };
  React.useEffect(() => {
    window.addEventListener("resize", () => {
      onResize();
    });
    return () => {
      window.addEventListener("resize", () => {
        onResize();
      });
    };
  });
  return isMobileView ? /*#__PURE__*/React.createElement(Modal, {
    popupStyles: {
      height: "174px",
      maxHeight: "174px",
      width: "324px",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: 'translate(-50%, -50%)'
    },
    popupModuleActionBarStyles: {
      display: "flex",
      flex: 1,
      justifyContent: "flex-start",
      width: "100%",
      position: "absolute",
      left: 0,
      bottom: 0,
      padding: "18px"
    },
    style: {
      flex: 1
    },
    popupModuleMianStyles: {
      padding: "18px"
    },
    headerBarMain: /*#__PURE__*/React.createElement(Heading, {
      label: t("CORE_LOGOUT_WEB_HEADER")
    }),
    headerBarEnd: /*#__PURE__*/React.createElement(CloseBtn, {
      onClick: onDismiss,
      isMobileView: isMobileView
    }),
    actionCancelLabel: t("TL_COMMON_NO"),
    actionCancelOnSubmit: onCancel,
    actionSaveLabel: t("TL_COMMON_YES"),
    actionSaveOnSubmit: onSelect,
    formId: "modal-action"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CardText, {
    style: {
      margin: 0
    }
  }, t("CORE_LOGOUT_MOBILE_CONFIRMATION_MESSAGE") + " "))) : /*#__PURE__*/React.createElement(Modal, {
    popupModuleMianStyles: {
      paddingTop: "30px"
    },
    headerBarMain: /*#__PURE__*/React.createElement(Heading, {
      label: t("CORE_LOGOUT_WEB_HEADER")
    }),
    headerBarEnd: /*#__PURE__*/React.createElement(CloseBtn, {
      onClick: onDismiss,
      isMobileView: false
    }),
    actionCancelLabel: t("CORE_LOGOUT_CANCEL"),
    actionCancelOnSubmit: onCancel,
    actionSaveLabel: t("CORE_LOGOUT_WEB_YES"),
    actionSaveOnSubmit: onSelect,
    formId: "modal-action"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CardText, {
    style: {
      marginBottom: "54px",
      marginLeft: "8px",
      marginRight: "8px"
    }
  }, t("CORE_LOGOUT_WEB_CONFIRMATION_MESSAGE") + " ", /*#__PURE__*/React.createElement("strong", null, t("CORE_LOGOUT_MESSAGE"), "?"))));
};

const defaultImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO4AAADUCAMAAACs0e/bAAAAM1BMVEXK0eL" + "/" + "/" + "/" + "/Dy97GzuD4+fvL0uPg5O7T2efb4OvR1+Xr7vTk5/Df4+37/P3v8fbO1eTt8PUsnq5FAAAGqElEQVR4nO2d25ajIBBFCajgvf/" + "/a0eMyZgEjcI5xgt7Hmatme507UaxuJXidiDqjmSgeVIMlB1ZR1WZAf2gbdu0QwixSYzjOJPmHurfEGEfY9XzjNGG9whQCeVAuv5xQEySLtR9hPuIcwj0EeroN5m3D1IbsbgHK0esiQ9MKs" + "qXVr8Hm/a/Pulk6wihpCIXBw3dh7bTvRBt9+dC5NfS1VH3xETdM3MxXRN1T0zUPTNR98xcS1dlV9NNfx3DhkTdM6PKqHteVBF1z0vU5f0sKdpc2zWLKutXrjJjdLvpesRmukqYonauPhXpds" + "Lb6CppmpnltsYIuY2yavi6Mi2/rzAWm1zUfF0limVLqkZyA+mDYevKBS37aGC+L1lX5e7uyU1Cv565uiua9k5LFqbqqrnu2I3m+jJ11ZoLeRtfmdB0Uw/ZDsP0VTxdn7a1VERfmq7Xl" + "Xyn5D2QWLoq8bZlPoBJumphJjVBw/Ll6CoTZGsTDs4NrGqKbqBth8ZHJUi6cn168QmleSm6GmB7Kxm+6obXlf7PoDHosCwM3QpiS2legi6ocSl3L0G3BdneDDgwQdENfeY+SfDJBkF37Z" + "B+GvwzA6/rMaafAn8143VhPZWdjMWG1oHXhdnemgPoAvLlB/iZyRTfVeF06wPoQhJmlm4bdcOAZRlRN5gcPc5SoPEQR1fDdbOo6wn+uYvXxY0QCLom6gYROKH+Aj5nvphuFXWDiLpRdxl" + "/19LFT95k6CHCrnW7pCDqBn1i1PUFvii2c11oZOJ6usWeH0RRNzC4Zs+6FTi2nevCVwCjbugnXklX5fkfTldL8PEilUB1kfNyN1u9MME2sATr4lbuB7AjfLAuvsRm1A0g6gYRdcPAjvBlje" + "2Z8brI8OC68AcRdlCkwLohx2mcZMjw9q+LzarQurjtnwPYAydX08WecECO/u6Ad0GBdYG7jO5gB4Ap+PwKcA9ZT43dn4/W9TyiPAn4OAJaF7h3uwe8StSCddFdM3jqFa2LvnnB5zzhuuBBAj" + "Y4gi50cg694gnXhTYvfMdrjtcFZhrwE9r41gUem8IXWMC3LrBzxh+a0gRd1N1LOK7M0IUUGuggvEmHoStA2/MJh7MpupiDU4TzjhxdzLAoO4ouZvqVURbFMHQlZD6SUeWHoguZsSLUGegreh" + "A+FZFowPdUWTi6iMoZlIpGGUUXkDbjj/9ZOLqAQS/+GIKl5BQOCn/ycqpzkXSDm5dU7ZWkG7wUyGlcmm7g5Ux56AqirgoaJ7BeokPTDbp9CbVunjFxPrl7+HqnkrSq1Da7JX20f3dV8yJi6v" + "oO81mX8vV0mx3qUsZCPRfTlVRdz2EvdufYGDvNQvvwqHtmXd+a1ITinwNcXc+lT6JuzdT1XDyBn/x7wtX1HCQQdW9MXc8xArGrirowfLeUEbMqqq6f7TF1lfRdOuGNiGi6SpT+WxY06xUfNN" + "2wBfyE9I4tlm7w5hvOPDNJN3yNiLMipji6gE3chKhouoCtN5x3QlF0EZt8OW/8ougitqJQlk1aii7iFC9l0MvRReyao7xNjKML2Z/PuHlzhi5mFxljiZeiC9rPTEisNEMX9KYAwo5Xhi7qaA" + "3hamboYm7dG+NVrXhdaYDv5zFaQZsYrCtbbAGnjkQDX2+J1FXCwOsqWOpKoIQNTFdqYBWydxqNqUoG0pVpCS+H8kaJaGKErlIaXj7CRRE+gRWuKwW9YZ80oVOUgbpdT0zpnSZJTIiwCtJVelv" + "Xntr4P5j6BWfPb5Wcx84C4cq3hb11lco2u2Mdwp6XdJ/Ne3wb8DWdfiRenZaXrhLwOj4e+GQeHroy3YOspS7TlU28Wle2m2QUS0mqdcbrdNW+ZHsSsyK7tBfm0q/dWcv+Z3mytVx3t7KWulq" + "Ue6ilunu8jF8pFwgv1FXp3mUt35OtRbr7eM4u4Gs6vUBXgeuHc5kfE/cbvWZtkROLm1DMtLCy80tzsu2PRj0hTI8fvrQuvsjlJkyutszq+m423wHaLTyniy/XuiGZ84LuT+m5ZfNfRxyGs7L" + "XZOvia7VujatUwVTrIt+Q/Csc7Tuhe+BOakT10b4TuoiiJjvgU9emTO42PwEfBa+cuodKkuf42DXr1D3JpXz73Hnn0j10evHKe+nufgfUm+7B84sX9FfdEzXux2DBpWuKokkCqN/5pa/8pmvn" + "L+RGKCddCGmatiPyPB/+ekO/M/q/7uvbt22kTt3zEnXPzCV13T3Gel4/6NduDu66xRvlPNkM1RjjxUdv+4WhGx6TftD19Q/dfzpwcHO+rE3fAAAAAElFTkSuQmCC";
const Profile = ({
  info,
  stateName,
  t
}) => /*#__PURE__*/React.createElement("div", {
  className: "profile-section"
}, /*#__PURE__*/React.createElement("div", {
  className: "imageloader imageloader-loaded"
}, /*#__PURE__*/React.createElement("img", {
  className: "img-responsive img-circle img-Profile",
  src: defaultImage
})), /*#__PURE__*/React.createElement("div", {
  id: "profile-name",
  className: "label-container name-Profile"
}, /*#__PURE__*/React.createElement("div", {
  className: "label-text"
}, " ", info === null || info === void 0 ? void 0 : info.name, " ")), /*#__PURE__*/React.createElement("div", {
  id: "profile-location",
  className: "label-container loc-Profile"
}, /*#__PURE__*/React.createElement("div", {
  className: "label-text"
}, " ", info === null || info === void 0 ? void 0 : info.mobileNumber, " ")), (info === null || info === void 0 ? void 0 : info.emailId) && /*#__PURE__*/React.createElement("div", {
  id: "profile-emailid",
  className: "label-container loc-Profile"
}, /*#__PURE__*/React.createElement("div", {
  className: "label-text"
}, " ", info.emailId, " ")), /*#__PURE__*/React.createElement("div", {
  className: "profile-divider"
}), window.location.href.includes("/employee") && !window.location.href.includes("/employee/user/login") && !window.location.href.includes("employee/user/language-selection") && /*#__PURE__*/React.createElement(ChangeCity, {
  t: t,
  mobileView: true
}));
const IconsObject = {
  CommonPTIcon: /*#__PURE__*/React.createElement(PTIcon, {
    className: "icon"
  }),
  OBPSIcon: /*#__PURE__*/React.createElement(OBPSIcon, {
    className: "icon"
  }),
  propertyIcon: /*#__PURE__*/React.createElement(PropertyHouse, {
    className: "icon"
  }),
  TLIcon: /*#__PURE__*/React.createElement(CaseIcon, {
    className: "icon"
  }),
  PGRIcon: /*#__PURE__*/React.createElement(PGRIcon, {
    className: "icon"
  }),
  FSMIcon: /*#__PURE__*/React.createElement(FSMIcon, {
    className: "icon"
  }),
  WSIcon: /*#__PURE__*/React.createElement(WSICon, {
    className: "icon"
  }),
  MCollectIcon: /*#__PURE__*/React.createElement(MCollectIcon, {
    className: "icon"
  }),
  BillsIcon: /*#__PURE__*/React.createElement(CollectionIcon, {
    className: "icon"
  }),
  BirthIcon: /*#__PURE__*/React.createElement(BirthIcon, {
    className: "icon"
  }),
  DeathIcon: /*#__PURE__*/React.createElement(DeathIcon, {
    className: "icon"
  }),
  FirenocIcon: /*#__PURE__*/React.createElement(FirenocIcon, {
    className: "icon"
  }),
  HomeIcon: /*#__PURE__*/React.createElement(HomeIcon, {
    className: "icon"
  }),
  EditPencilIcon: /*#__PURE__*/React.createElement(EditPencilIcon, {
    className: "icon"
  }),
  LogoutIcon: /*#__PURE__*/React.createElement(LogoutIcon, {
    className: "icon"
  }),
  Phone: /*#__PURE__*/React.createElement(Phone, {
    className: "icon"
  }),
  LoginIcon: /*#__PURE__*/React.createElement(LoginIcon, {
    className: "icon"
  })
};
const StaticCitizenSideBar = ({
  linkData,
  islinkDataLoading
}) => {
  var _storeData$tenants$fi, _storeData$tenants$, _Object$keys, _Object$keys$sort, _menuItems;
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const {
    pathname
  } = location;
  const {
    data: storeData,
    isFetched
  } = Digit.Hooks.useStore.getInitData();
  const {
    stateInfo
  } = storeData || {};
  const user = Digit.UserService.getUser();
  let isMobile = window.Digit.Utils.browser.isMobile();
  const [isEmployee, setisEmployee] = useState(false);
  const [isSidebarOpen, toggleSidebar] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const handleLogout = () => {
    toggleSidebar(false);
    setShowDialog(true);
  };
  const handleOnSubmit = () => {
    Digit.UserService.logout();
    setShowDialog(false);
  };
  const handleOnCancel = () => {
    setShowDialog(false);
  };
  if (islinkDataLoading || !isFetched) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  const redirectToLoginPage = () => {
    history.push("/digit-ui/citizen/login");
  };
  const showProfilePage = () => {
    history.push("/digit-ui/citizen/user/profile");
  };
  const tenantId = Digit.ULBService.getCitizenCurrentTenant();
  const filteredTenantContact = (storeData === null || storeData === void 0 ? void 0 : (_storeData$tenants$fi = storeData.tenants.filter(e => e.code === tenantId)[0]) === null || _storeData$tenants$fi === void 0 ? void 0 : _storeData$tenants$fi.contactNumber) || (storeData === null || storeData === void 0 ? void 0 : (_storeData$tenants$ = storeData.tenants[0]) === null || _storeData$tenants$ === void 0 ? void 0 : _storeData$tenants$.contactNumber);
  let menuItems = [...SideBarMenu(t, showProfilePage, redirectToLoginPage, isEmployee, storeData, tenantId)];
  menuItems = menuItems.filter(item => item.element !== "LANGUAGE");
  const MenuItem = ({
    item
  }) => {
    var _item$icon, _item$icon$type;
    const leftIconArray = (item === null || item === void 0 ? void 0 : item.icon) || ((_item$icon = item.icon) === null || _item$icon === void 0 ? void 0 : (_item$icon$type = _item$icon.type) === null || _item$icon$type === void 0 ? void 0 : _item$icon$type.name);
    const leftIcon = leftIconArray ? IconsObject[leftIconArray] : IconsObject.BillsIcon;
    let itemComponent;
    if (item.type === "component") {
      itemComponent = item.action;
    } else {
      itemComponent = item.text;
    }
    const Item = () => /*#__PURE__*/React.createElement("span", Object.assign({
      className: "menu-item"
    }, item.populators), leftIcon, /*#__PURE__*/React.createElement("div", {
      className: "menu-label"
    }, itemComponent));
    if (item.type === "external-link") {
      return /*#__PURE__*/React.createElement("a", {
        href: item.link
      }, /*#__PURE__*/React.createElement(Item, null));
    }
    if (item.type === "link") {
      return /*#__PURE__*/React.createElement(Link, {
        to: item === null || item === void 0 ? void 0 : item.link
      }, /*#__PURE__*/React.createElement(Item, null));
    }
    return /*#__PURE__*/React.createElement(Item, null);
  };
  let profileItem;
  if (isFetched && user && user.access_token) {
    profileItem = /*#__PURE__*/React.createElement(Profile, {
      info: user === null || user === void 0 ? void 0 : user.info,
      stateName: stateInfo === null || stateInfo === void 0 ? void 0 : stateInfo.name,
      t: t
    });
    menuItems = menuItems.filter(item => (item === null || item === void 0 ? void 0 : item.id) !== "login-btn" && (item === null || item === void 0 ? void 0 : item.id) !== "help-line");
    menuItems = [...menuItems, {
      text: t("EDIT_PROFILE"),
      element: "PROFILE",
      icon: "EditPencilIcon",
      populators: {
        onClick: showProfilePage
      }
    }, {
      text: t("CORE_COMMON_LOGOUT"),
      element: "LOGOUT",
      icon: "LogoutIcon",
      populators: {
        onClick: handleLogout
      }
    }, {
      text: /*#__PURE__*/React.createElement(React.Fragment, null, t("CS_COMMON_HELPLINE"), /*#__PURE__*/React.createElement("div", {
        className: "telephone",
        style: {
          marginTop: "-10%"
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "link"
      }, /*#__PURE__*/React.createElement("a", {
        href: `tel:${filteredTenantContact}`
      }, filteredTenantContact)))),
      element: "Helpline",
      icon: "Phone"
    }];
  }
  (_Object$keys = Object.keys(linkData)) === null || _Object$keys === void 0 ? void 0 : (_Object$keys$sort = _Object$keys.sort((x, y) => y.localeCompare(x))) === null || _Object$keys$sort === void 0 ? void 0 : _Object$keys$sort.map(key => {
    var _linkData$key$;
    if (((_linkData$key$ = linkData[key][0]) === null || _linkData$key$ === void 0 ? void 0 : _linkData$key$.sidebar) === "digit-ui-links") {
      var _linkData$key$2, _linkData$key$2$sideb, _linkData$key$3, _linkData$key$4;
      menuItems.splice(1, 0, {
        type: (_linkData$key$2 = linkData[key][0]) !== null && _linkData$key$2 !== void 0 && (_linkData$key$2$sideb = _linkData$key$2.sidebarURL) !== null && _linkData$key$2$sideb !== void 0 && _linkData$key$2$sideb.includes("digit-ui") ? "link" : "external-link",
        text: t(`ACTION_TEST_${Digit.Utils.locale.getTransformedLocale(key)}`),
        links: linkData[key],
        icon: (_linkData$key$3 = linkData[key][0]) === null || _linkData$key$3 === void 0 ? void 0 : _linkData$key$3.leftIcon,
        link: (_linkData$key$4 = linkData[key][0]) === null || _linkData$key$4 === void 0 ? void 0 : _linkData$key$4.sidebarURL
      });
    }
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: "100%",
      top: "0px",
      backgroundColor: "rgba(0, 0, 0, 0.54)",
      pointerzevents: "auto"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      height: isMobile ? "calc(100vh - 56px)" : "auto",
      zIndex: "99"
    }
  }, profileItem, /*#__PURE__*/React.createElement("div", {
    className: "drawer-desktop",
    style: {
      "backgroundColor": "white"
    }
  }, (_menuItems = menuItems) === null || _menuItems === void 0 ? void 0 : _menuItems.map((item, index) => /*#__PURE__*/React.createElement("div", {
    className: `sidebar-list ${pathname === (item === null || item === void 0 ? void 0 : item.link) || pathname === (item === null || item === void 0 ? void 0 : item.sidebarURL) ? "active" : ""}`,
    key: index
  }, /*#__PURE__*/React.createElement(MenuItem, {
    item: item
  }))))), /*#__PURE__*/React.createElement("div", null, showDialog && /*#__PURE__*/React.createElement(LogoutDialog, {
    onSelect: handleOnSubmit,
    onCancel: handleOnCancel,
    onDismiss: handleOnCancel
  }))));
};

const defaultImage$1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO4AAADUCAMAAACs0e/bAAAAM1BMVEXK0eL" + "/" + "/" + "/" + "/Dy97GzuD4+fvL0uPg5O7T2efb4OvR1+Xr7vTk5/Df4+37/P3v8fbO1eTt8PUsnq5FAAAGqElEQVR4nO2d25ajIBBFCajgvf/" + "/a0eMyZgEjcI5xgt7Hmatme507UaxuJXidiDqjmSgeVIMlB1ZR1WZAf2gbdu0QwixSYzjOJPmHurfEGEfY9XzjNGG9whQCeVAuv5xQEySLtR9hPuIcwj0EeroN5m3D1IbsbgHK0esiQ9MKs" + "qXVr8Hm/a/Pulk6wihpCIXBw3dh7bTvRBt9+dC5NfS1VH3xETdM3MxXRN1T0zUPTNR98xcS1dlV9NNfx3DhkTdM6PKqHteVBF1z0vU5f0sKdpc2zWLKutXrjJjdLvpesRmukqYonauPhXpds" + "Lb6CppmpnltsYIuY2yavi6Mi2/rzAWm1zUfF0limVLqkZyA+mDYevKBS37aGC+L1lX5e7uyU1Cv565uiua9k5LFqbqqrnu2I3m+jJ11ZoLeRtfmdB0Uw/ZDsP0VTxdn7a1VERfmq7Xl" + "Xyn5D2QWLoq8bZlPoBJumphJjVBw/Ll6CoTZGsTDs4NrGqKbqBth8ZHJUi6cn168QmleSm6GmB7Kxm+6obXlf7PoDHosCwM3QpiS2legi6ocSl3L0G3BdneDDgwQdENfeY+SfDJBkF37Z" + "B+GvwzA6/rMaafAn8143VhPZWdjMWG1oHXhdnemgPoAvLlB/iZyRTfVeF06wPoQhJmlm4bdcOAZRlRN5gcPc5SoPEQR1fDdbOo6wn+uYvXxY0QCLom6gYROKH+Aj5nvphuFXWDiLpRdxl" + "/19LFT95k6CHCrnW7pCDqBn1i1PUFvii2c11oZOJ6usWeH0RRNzC4Zs+6FTi2nevCVwCjbugnXklX5fkfTldL8PEilUB1kfNyN1u9MME2sATr4lbuB7AjfLAuvsRm1A0g6gYRdcPAjvBlje" + "2Z8brI8OC68AcRdlCkwLohx2mcZMjw9q+LzarQurjtnwPYAydX08WecECO/u6Ad0GBdYG7jO5gB4Ap+PwKcA9ZT43dn4/W9TyiPAn4OAJaF7h3uwe8StSCddFdM3jqFa2LvnnB5zzhuuBBAj" + "Y4gi50cg694gnXhTYvfMdrjtcFZhrwE9r41gUem8IXWMC3LrBzxh+a0gRd1N1LOK7M0IUUGuggvEmHoStA2/MJh7MpupiDU4TzjhxdzLAoO4ouZvqVURbFMHQlZD6SUeWHoguZsSLUGegreh" + "A+FZFowPdUWTi6iMoZlIpGGUUXkDbjj/9ZOLqAQS/+GIKl5BQOCn/ycqpzkXSDm5dU7ZWkG7wUyGlcmm7g5Ux56AqirgoaJ7BeokPTDbp9CbVunjFxPrl7+HqnkrSq1Da7JX20f3dV8yJi6v" + "oO81mX8vV0mx3qUsZCPRfTlVRdz2EvdufYGDvNQvvwqHtmXd+a1ITinwNcXc+lT6JuzdT1XDyBn/x7wtX1HCQQdW9MXc8xArGrirowfLeUEbMqqq6f7TF1lfRdOuGNiGi6SpT+WxY06xUfNN" + "2wBfyE9I4tlm7w5hvOPDNJN3yNiLMipji6gE3chKhouoCtN5x3QlF0EZt8OW/8ougitqJQlk1aii7iFC9l0MvRReyao7xNjKML2Z/PuHlzhi5mFxljiZeiC9rPTEisNEMX9KYAwo5Xhi7qaA" + "3hamboYm7dG+NVrXhdaYDv5zFaQZsYrCtbbAGnjkQDX2+J1FXCwOsqWOpKoIQNTFdqYBWydxqNqUoG0pVpCS+H8kaJaGKErlIaXj7CRRE+gRWuKwW9YZ80oVOUgbpdT0zpnSZJTIiwCtJVelv" + "Xntr4P5j6BWfPb5Wcx84C4cq3hb11lco2u2Mdwp6XdJ/Ne3wb8DWdfiRenZaXrhLwOj4e+GQeHroy3YOspS7TlU28Wle2m2QUS0mqdcbrdNW+ZHsSsyK7tBfm0q/dWcv+Z3mytVx3t7KWulq" + "Ue6ilunu8jF8pFwgv1FXp3mUt35OtRbr7eM4u4Gs6vUBXgeuHc5kfE/cbvWZtkROLm1DMtLCy80tzsu2PRj0hTI8fvrQuvsjlJkyutszq+m423wHaLTyniy/XuiGZ84LuT+m5ZfNfRxyGs7L" + "XZOvia7VujatUwVTrIt+Q/Csc7Tuhe+BOakT10b4TuoiiJjvgU9emTO42PwEfBa+cuodKkuf42DXr1D3JpXz73Hnn0j10evHKe+nufgfUm+7B84sX9FfdEzXux2DBpWuKokkCqN/5pa/8pmvn" + "L+RGKCddCGmatiPyPB/+ekO/M/q/7uvbt22kTt3zEnXPzCV13T3Gel4/6NduDu66xRvlPNkM1RjjxUdv+4WhGx6TftD19Q/dfzpwcHO+rE3fAAAAAElFTkSuQmCC";
const Profile$1 = ({
  info,
  stateName,
  t
}) => {
  const [profilePic, setProfilePic] = React.useState(null);
  React.useEffect(async () => {
    const tenant = Digit.ULBService.getCurrentTenantId();
    const uuid = info === null || info === void 0 ? void 0 : info.uuid;
    if (uuid) {
      const usersResponse = await Digit.UserService.userSearch(tenant, {
        uuid: [uuid]
      }, {});
      if (usersResponse && usersResponse.user && usersResponse.user.length) {
        var _userDetails$photo;
        const userDetails = usersResponse.user[0];
        const thumbs = userDetails === null || userDetails === void 0 ? void 0 : (_userDetails$photo = userDetails.photo) === null || _userDetails$photo === void 0 ? void 0 : _userDetails$photo.split(",");
        setProfilePic(thumbs === null || thumbs === void 0 ? void 0 : thumbs.at(0));
      }
    }
  }, [profilePic !== null]);
  return /*#__PURE__*/React.createElement("div", {
    className: "profile-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "imageloader imageloader-loaded"
  }, /*#__PURE__*/React.createElement("img", {
    className: "img-responsive img-circle img-Profile",
    src: profilePic ? profilePic : defaultImage$1,
    style: {
      objectFit: "cover",
      objectPosition: "center"
    }
  })), /*#__PURE__*/React.createElement("div", {
    id: "profile-name",
    className: "label-container name-Profile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label-text"
  }, " ", info === null || info === void 0 ? void 0 : info.name, " ")), /*#__PURE__*/React.createElement("div", {
    id: "profile-location",
    className: "label-container loc-Profile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label-text"
  }, " ", info === null || info === void 0 ? void 0 : info.mobileNumber, " ")), (info === null || info === void 0 ? void 0 : info.emailId) && /*#__PURE__*/React.createElement("div", {
    id: "profile-emailid",
    className: "label-container loc-Profile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label-text"
  }, " ", info.emailId, " ")), /*#__PURE__*/React.createElement("div", {
    className: "profile-divider"
  }), window.location.href.includes("/employee") && !window.location.href.includes("/employee/user/login") && !window.location.href.includes("employee/user/language-selection") && /*#__PURE__*/React.createElement(ChangeCity, {
    t: t,
    mobileView: true
  }));
};
const PoweredBy = () => /*#__PURE__*/React.createElement("div", {
  className: "digit-footer",
  style: {
    marginBottom: 0
  }
});
const CitizenSideBar = ({
  isOpen,
  isMobile: _isMobile = false,
  toggleSidebar,
  onLogout,
  isEmployee: _isEmployee = false,
  linkData,
  islinkDataLoading,
  isSideBarScroll
}) => {
  var _storeData$tenants$fi, _storeData$tenants$;
  const {
    data: storeData,
    isFetched
  } = Digit.Hooks.useStore.getInitData();
  const {
    stateInfo
  } = storeData || {};
  const user = Digit.UserService.getUser();
  const [search, setSearch] = useState("");
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const closeSidebar = () => {
    Digit.clikOusideFired = true;
    toggleSidebar(false);
  };
  const {
    isLoading,
    data
  } = Digit.Hooks.useAccessControl();
  const tenantId = Digit.ULBService.getCitizenCurrentTenant();
  const showProfilePage = () => {
    const redirectUrl = _isEmployee ? "/digit-ui/employee/user/profile" : "/digit-ui/citizen/user/profile";
    history.push(redirectUrl);
    closeSidebar();
  };
  const redirectToLoginPage = () => {
    history.push("/digit-ui/citizen/login");
    closeSidebar();
  };
  if (islinkDataLoading || isLoading || !isFetched) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  const filteredTenantContact = (storeData === null || storeData === void 0 ? void 0 : (_storeData$tenants$fi = storeData.tenants.filter(e => e.code === tenantId)[0]) === null || _storeData$tenants$fi === void 0 ? void 0 : _storeData$tenants$fi.contactNumber) || (storeData === null || storeData === void 0 ? void 0 : (_storeData$tenants$ = storeData.tenants[0]) === null || _storeData$tenants$ === void 0 ? void 0 : _storeData$tenants$.contactNumber);
  let menuItems = [...SideBarMenu(t, closeSidebar, redirectToLoginPage, _isEmployee, storeData, tenantId)];
  let profileItem;
  if (isFetched && user && user.access_token) {
    profileItem = /*#__PURE__*/React.createElement(Profile$1, {
      info: user === null || user === void 0 ? void 0 : user.info,
      stateName: stateInfo === null || stateInfo === void 0 ? void 0 : stateInfo.name,
      t: t
    });
    menuItems = menuItems.filter(item => (item === null || item === void 0 ? void 0 : item.id) !== "login-btn" && (item === null || item === void 0 ? void 0 : item.id) !== "help-line");
    menuItems = [...menuItems, {
      text: t("EDIT_PROFILE"),
      element: "PROFILE",
      icon: "EditPencilIcon",
      populators: {
        onClick: showProfilePage
      }
    }, {
      text: t("CORE_COMMON_LOGOUT"),
      element: "LOGOUT",
      icon: "LogoutIcon",
      populators: {
        onClick: onLogout
      }
    }, {
      text: /*#__PURE__*/React.createElement(React.Fragment, null, t("CS_COMMON_HELPLINE"), /*#__PURE__*/React.createElement("div", {
        className: "telephone",
        style: {
          marginTop: "-10%"
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "link"
      }, /*#__PURE__*/React.createElement("a", {
        href: `tel:${filteredTenantContact}`
      }, filteredTenantContact)))),
      element: "Helpline",
      icon: "Phone"
    }];
  }
  let configEmployeeSideBar = {};
  if (!_isEmployee) {
    var _Object$keys, _Object$keys$sort;
    if (linkData && linkData.FSM) {
      let FSM = [];
      linkData.FSM.map(ele => {
        ele.id && ele.link && FSM.push(ele);
      });
      linkData.FSM = FSM;
    }
    (_Object$keys = Object.keys(linkData)) === null || _Object$keys === void 0 ? void 0 : (_Object$keys$sort = _Object$keys.sort((x, y) => y.localeCompare(x))) === null || _Object$keys$sort === void 0 ? void 0 : _Object$keys$sort.map(key => {
      var _linkData$key$, _linkData$key$2, _linkData$key$2$sideb, _linkData$key$3, _linkData$key$4;
      if (((_linkData$key$ = linkData[key][0]) === null || _linkData$key$ === void 0 ? void 0 : _linkData$key$.sidebar) === "digit-ui-links") menuItems.splice(1, 0, {
        type: (_linkData$key$2 = linkData[key][0]) !== null && _linkData$key$2 !== void 0 && (_linkData$key$2$sideb = _linkData$key$2.sidebarURL) !== null && _linkData$key$2$sideb !== void 0 && _linkData$key$2$sideb.includes("digit-ui") ? "link" : "external-link",
        text: t(`ACTION_TEST_${Digit.Utils.locale.getTransformedLocale(key)}`),
        links: linkData[key],
        icon: (_linkData$key$3 = linkData[key][0]) === null || _linkData$key$3 === void 0 ? void 0 : _linkData$key$3.leftIcon,
        link: (_linkData$key$4 = linkData[key][0]) === null || _linkData$key$4 === void 0 ? void 0 : _linkData$key$4.sidebarURL
      });
    });
  } else {
    var _menuItems;
    data === null || data === void 0 ? void 0 : data.actions.filter(e => e.url === "url" && e.displayName !== "Home").forEach(item => {
      var _item$displayName;
      if (search == "" && item.path !== "") {
        let index = item.path.split(".")[0];
        if (index === "TradeLicense") index = "Trade License";
        if (!configEmployeeSideBar[index]) {
          configEmployeeSideBar[index] = [item];
        } else {
          configEmployeeSideBar[index].push(item);
        }
      } else if (item.path !== "" && item !== null && item !== void 0 && (_item$displayName = item.displayName) !== null && _item$displayName !== void 0 && _item$displayName.toLowerCase().includes(search.toLowerCase())) {
        let index = item.path.split(".")[0];
        if (index === "TradeLicense") index = "Trade License";
        if (!configEmployeeSideBar[index]) {
          configEmployeeSideBar[index] = [item];
        } else {
          configEmployeeSideBar[index].push(item);
        }
      }
    });
    const keys = Object.keys(configEmployeeSideBar);
    for (let i = 0; i < keys.length; i++) {
      var _configEmployeeSideBa, _configEmployeeSideBa2, _configEmployeeSideBa3, _keys$i, _keys$i$toUpperCase;
      const getSingleDisplayName = (_configEmployeeSideBa = configEmployeeSideBar[keys[i]][0]) === null || _configEmployeeSideBa === void 0 ? void 0 : (_configEmployeeSideBa2 = _configEmployeeSideBa.displayName) === null || _configEmployeeSideBa2 === void 0 ? void 0 : (_configEmployeeSideBa3 = _configEmployeeSideBa2.toUpperCase()) === null || _configEmployeeSideBa3 === void 0 ? void 0 : _configEmployeeSideBa3.replace(/[ -]/g, "_");
      const getParentDisplayName = (_keys$i = keys[i]) === null || _keys$i === void 0 ? void 0 : (_keys$i$toUpperCase = _keys$i.toUpperCase()) === null || _keys$i$toUpperCase === void 0 ? void 0 : _keys$i$toUpperCase.replace(/[ -]/g, "_");
      if (configEmployeeSideBar[keys[i]][0].path.indexOf(".") === -1) {
        var _configEmployeeSideBa4, _configEmployeeSideBa5, _configEmployeeSideBa6, _configEmployeeSideBa7, _configEmployeeSideBa8;
        menuItems.splice(1, 0, {
          type: "link",
          text: t(`ACTION_TEST_${getSingleDisplayName}`),
          link: (_configEmployeeSideBa4 = configEmployeeSideBar[keys[i]][0]) === null || _configEmployeeSideBa4 === void 0 ? void 0 : _configEmployeeSideBa4.navigationURL,
          icon: (_configEmployeeSideBa5 = configEmployeeSideBar[keys[i]][0]) === null || _configEmployeeSideBa5 === void 0 ? void 0 : (_configEmployeeSideBa6 = _configEmployeeSideBa5.leftIcon) === null || _configEmployeeSideBa6 === void 0 ? void 0 : (_configEmployeeSideBa7 = (_configEmployeeSideBa8 = _configEmployeeSideBa6).split) === null || _configEmployeeSideBa7 === void 0 ? void 0 : _configEmployeeSideBa7.call(_configEmployeeSideBa8, ":")[1],
          populators: {
            onClick: () => {
              var _configEmployeeSideBa9;
              history.push((_configEmployeeSideBa9 = configEmployeeSideBar[keys[i]][0]) === null || _configEmployeeSideBa9 === void 0 ? void 0 : _configEmployeeSideBa9.navigationURL);
              closeSidebar();
            }
          }
        });
      } else {
        var _configEmployeeSideBa10, _configEmployeeSideBa11;
        menuItems.splice(1, 0, {
          type: "dynamic",
          moduleName: t(`ACTION_TEST_${getParentDisplayName}`),
          links: (_configEmployeeSideBa10 = configEmployeeSideBar[keys[i]]) === null || _configEmployeeSideBa10 === void 0 ? void 0 : _configEmployeeSideBa10.map(ob => {
            var _ob$displayName, _ob$displayName$toUpp;
            return {
              ...ob,
              displayName: t(`ACTION_TEST_${ob === null || ob === void 0 ? void 0 : (_ob$displayName = ob.displayName) === null || _ob$displayName === void 0 ? void 0 : (_ob$displayName$toUpp = _ob$displayName.toUpperCase()) === null || _ob$displayName$toUpp === void 0 ? void 0 : _ob$displayName$toUpp.replace(/[ -]/g, "_")}`)
            };
          }),
          icon: (_configEmployeeSideBa11 = configEmployeeSideBar[keys[i]][1]) === null || _configEmployeeSideBa11 === void 0 ? void 0 : _configEmployeeSideBa11.leftIcon
        });
      }
    }
    const indx = menuItems.findIndex(a => a.element === "HOME");
    const home = menuItems.splice(indx, 1);
    const comp = menuItems.findIndex(a => a.element === "LANGUAGE");
    const part = menuItems.splice(comp, ((_menuItems = menuItems) === null || _menuItems === void 0 ? void 0 : _menuItems.length) - comp);
    menuItems.sort((a, b) => {
      let c1 = (a === null || a === void 0 ? void 0 : a.type) === "dynamic" ? a === null || a === void 0 ? void 0 : a.moduleName : a === null || a === void 0 ? void 0 : a.text;
      let c2 = (b === null || b === void 0 ? void 0 : b.type) === "dynamic" ? b === null || b === void 0 ? void 0 : b.moduleName : b === null || b === void 0 ? void 0 : b.text;
      return c1.localeCompare(c2);
    });
    (home === null || home === void 0 ? void 0 : home[0]) && menuItems.splice(0, 0, home[0]);
    menuItems = (part === null || part === void 0 ? void 0 : part.length) > 0 ? menuItems.concat(part) : menuItems;
  }
  if (history.location.pathname.includes("/openlink")) {
    profileItem = /*#__PURE__*/React.createElement("span", null);
    menuItems = menuItems.filter(ele => ele.element === "LANGUAGE");
  }
  return _isMobile ? /*#__PURE__*/React.createElement(NavBar, {
    open: isOpen,
    toggleSidebar: toggleSidebar,
    profileItem: profileItem,
    onClose: closeSidebar,
    isSideBarScroll: isSideBarScroll,
    menuItems: menuItems,
    Footer: /*#__PURE__*/React.createElement(PoweredBy, null),
    isEmployee: _isEmployee,
    search: search,
    setSearch: setSearch
  }) : /*#__PURE__*/React.createElement(StaticCitizenSideBar, {
    logout: onLogout
  });
};

const SubMenu = ({
  item
}) => {
  var _item$icon, _item$icon$leftIcon, _item$icon$leftIcon$s, _item$icon$leftIcon$s2, _item$leftIcon, _item$leftIcon$split, _item$moduleName;
  const [subnav, setSubnav] = useState(false);
  const location = useLocation();
  const {
    pathname
  } = location;
  const {
    t
  } = useTranslation();
  const showSubnav = () => setSubnav(!subnav);
  const IconsObject = {
    home: /*#__PURE__*/React.createElement(HomeIcon, null),
    announcement: /*#__PURE__*/React.createElement(ComplaintIcon, null),
    business: /*#__PURE__*/React.createElement(BPAHomeIcon, null),
    store: /*#__PURE__*/React.createElement(PropertyHouse, null),
    assignment: /*#__PURE__*/React.createElement(CaseIcon, null),
    receipt: /*#__PURE__*/React.createElement(ReceiptIcon, null),
    "business-center": /*#__PURE__*/React.createElement(PersonIcon, null),
    description: /*#__PURE__*/React.createElement(DocumentIconSolid, null),
    "water-tap": /*#__PURE__*/React.createElement(DropIcon, null),
    "collections-bookmark": /*#__PURE__*/React.createElement(CollectionsBookmarIcons, null),
    "insert-chart": /*#__PURE__*/React.createElement(FinanceChartIcon, null),
    edcr: /*#__PURE__*/React.createElement(CollectionIcon, null),
    collections: /*#__PURE__*/React.createElement(CollectionIcon, null)
  };
  const leftIconArray = (item === null || item === void 0 ? void 0 : (_item$icon = item.icon) === null || _item$icon === void 0 ? void 0 : (_item$icon$leftIcon = _item$icon.leftIcon) === null || _item$icon$leftIcon === void 0 ? void 0 : (_item$icon$leftIcon$s = _item$icon$leftIcon.split) === null || _item$icon$leftIcon$s === void 0 ? void 0 : (_item$icon$leftIcon$s2 = _item$icon$leftIcon$s.call(_item$icon$leftIcon, ":")) === null || _item$icon$leftIcon$s2 === void 0 ? void 0 : _item$icon$leftIcon$s2[1]) || (item === null || item === void 0 ? void 0 : (_item$leftIcon = item.leftIcon) === null || _item$leftIcon === void 0 ? void 0 : (_item$leftIcon$split = _item$leftIcon.split) === null || _item$leftIcon$split === void 0 ? void 0 : _item$leftIcon$split.call(_item$leftIcon, ":")[1]);
  const leftIcon = IconsObject[leftIconArray] || IconsObject.collections;
  const getModuleName = item === null || item === void 0 ? void 0 : (_item$moduleName = item.moduleName) === null || _item$moduleName === void 0 ? void 0 : _item$moduleName.replace(/[ -]/g, "_");
  const appendTranslate = t(`ACTION_TEST_${getModuleName}`);
  const trimModuleName = t((appendTranslate === null || appendTranslate === void 0 ? void 0 : appendTranslate.length) > 20 ? appendTranslate.substring(0, 20) + "..." : appendTranslate);
  if (item.type === "single") {
    var _item$navigationURL;
    const getOrigin = window.location.origin;
    return /*#__PURE__*/React.createElement("div", {
      className: "submenu-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: `sidebar-link  ${pathname === (item === null || item === void 0 ? void 0 : item.navigationURL) ? "active" : ""}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "actions"
    }, leftIcon, ((_item$navigationURL = item.navigationURL) === null || _item$navigationURL === void 0 ? void 0 : _item$navigationURL.indexOf("/digit-ui")) === -1 ? /*#__PURE__*/React.createElement("a", {
      "data-tip": "React-tooltip",
      "data-for": `jk-side-${getModuleName}`,
      className: "custom-link",
      href: getOrigin + "/employee/" + item.navigationURL
    }, /*#__PURE__*/React.createElement("span", null, " ", trimModuleName, " "), (trimModuleName === null || trimModuleName === void 0 ? void 0 : trimModuleName.includes("...")) && /*#__PURE__*/React.createElement(ReactTooltip, {
      textColor: "white",
      backgroundColor: "grey",
      place: "right",
      type: "info",
      effect: "solid",
      id: `jk-side-${getModuleName}`
    }, t(`ACTION_TEST_${getModuleName}`))) :
    /*#__PURE__*/
    React.createElement(Link, {
      className: "custom-link",
      to: item.navigationURL
    }, /*#__PURE__*/React.createElement("div", {
      "data-tip": "React-tooltip",
      "data-for": `jk-side-${getModuleName}`
    }, /*#__PURE__*/React.createElement("span", null, " ", trimModuleName, " "), (trimModuleName === null || trimModuleName === void 0 ? void 0 : trimModuleName.includes("...")) && /*#__PURE__*/React.createElement(ReactTooltip, {
      textColor: "white",
      backgroundColor: "grey",
      place: "right",
      type: "info",
      effect: "solid",
      id: `jk-side-${getModuleName}`
    }, t(`ACTION_TEST_${getModuleName}`)))))));
  } else {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "submenu-container"
    }, /*#__PURE__*/React.createElement("div", {
      onClick: item.links && showSubnav,
      className: `sidebar-link`
    }, /*#__PURE__*/React.createElement("div", {
      className: "actions"
    }, leftIcon, /*#__PURE__*/React.createElement("div", {
      "data-tip": "React-tooltip",
      "data-for": `jk-side-${getModuleName}`
    }, /*#__PURE__*/React.createElement("span", null, " ", trimModuleName, " "), (trimModuleName === null || trimModuleName === void 0 ? void 0 : trimModuleName.includes("...")) && /*#__PURE__*/React.createElement(ReactTooltip, {
      textColor: "white",
      backgroundColor: "grey",
      place: "right",
      type: "info",
      effect: "solid",
      id: `jk-side-${getModuleName}`
    }, t(`ACTION_TEST_${getModuleName}`)))), /*#__PURE__*/React.createElement("div", null, " ", item.links && subnav ? /*#__PURE__*/React.createElement(ArrowVectorDown, null) : item.links ? /*#__PURE__*/React.createElement(ArrowForward, null) : null, " "))), subnav && item.links.sort((a, b) => a.orderNumber - b.orderNumber).filter(item => item.url === "url" || item.url !== "").map((item, index) => {
      var _item$displayName, _item$displayName$toU;
      const getChildName = item === null || item === void 0 ? void 0 : (_item$displayName = item.displayName) === null || _item$displayName === void 0 ? void 0 : (_item$displayName$toU = _item$displayName.toUpperCase()) === null || _item$displayName$toU === void 0 ? void 0 : _item$displayName$toU.replace(/[ -]/g, "_");
      const appendTranslate = t(`ACTION_TEST_${getChildName}`);
      const trimModuleName = t((appendTranslate === null || appendTranslate === void 0 ? void 0 : appendTranslate.length) > 20 ? appendTranslate.substring(0, 20) + "..." : appendTranslate);
      if (item.navigationURL.indexOf("/digit-ui") === -1) {
        const getOrigin = window.location.origin;
        return /*#__PURE__*/React.createElement("a", {
          key: index,
          className: `dropdown-link ${pathname === item.link ? "active" : ""}`,
          href: getOrigin + "/employee/" + item.navigationURL
        }, /*#__PURE__*/React.createElement("div", {
          className: "actions",
          "data-tip": "React-tooltip",
          "data-for": `jk-side-${index}`
        }, /*#__PURE__*/React.createElement("span", null, " ", trimModuleName, " "), (trimModuleName === null || trimModuleName === void 0 ? void 0 : trimModuleName.includes("...")) && /*#__PURE__*/React.createElement(ReactTooltip, {
          textColor: "white",
          backgroundColor: "grey",
          place: "right",
          type: "info",
          effect: "solid",
          id: `jk-side-${index}`
        }, t(`ACTION_TEST_${getChildName}`))));
      }
      return /*#__PURE__*/React.createElement(Link, {
        to: (item === null || item === void 0 ? void 0 : item.link) || item.navigationURL,
        key: index,
        className: `dropdown-link ${pathname === (item === null || item === void 0 ? void 0 : item.link) || pathname === (item === null || item === void 0 ? void 0 : item.navigationURL) ? "active" : ""}`
      }, /*#__PURE__*/React.createElement("div", {
        className: "actions",
        "data-tip": "React-tooltip",
        "data-for": `jk-side-${index}`
      }, /*#__PURE__*/React.createElement("span", null, " ", trimModuleName, " "), (trimModuleName === null || trimModuleName === void 0 ? void 0 : trimModuleName.includes("...")) && /*#__PURE__*/React.createElement(ReactTooltip, {
        textColor: "white",
        backgroundColor: "grey",
        place: "right",
        type: "info",
        effect: "solid",
        id: `jk-side-${index}`
      }, t(`ACTION_TEST_${getChildName}`))));
    }));
  }
};

var lodash = createCommonjsModule(function (module, exports) {
  (function () {
    var undefined$1;
    var VERSION = '4.17.21';
    var LARGE_ARRAY_SIZE = 200;
    var CORE_ERROR_TEXT = 'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.',
      FUNC_ERROR_TEXT = 'Expected a function',
      INVALID_TEMPL_VAR_ERROR_TEXT = 'Invalid `variable` option passed into `_.template`';
    var HASH_UNDEFINED = '__lodash_hash_undefined__';
    var MAX_MEMOIZE_SIZE = 500;
    var PLACEHOLDER = '__lodash_placeholder__';
    var CLONE_DEEP_FLAG = 1,
      CLONE_FLAT_FLAG = 2,
      CLONE_SYMBOLS_FLAG = 4;
    var COMPARE_PARTIAL_FLAG = 1,
      COMPARE_UNORDERED_FLAG = 2;
    var WRAP_BIND_FLAG = 1,
      WRAP_BIND_KEY_FLAG = 2,
      WRAP_CURRY_BOUND_FLAG = 4,
      WRAP_CURRY_FLAG = 8,
      WRAP_CURRY_RIGHT_FLAG = 16,
      WRAP_PARTIAL_FLAG = 32,
      WRAP_PARTIAL_RIGHT_FLAG = 64,
      WRAP_ARY_FLAG = 128,
      WRAP_REARG_FLAG = 256,
      WRAP_FLIP_FLAG = 512;
    var DEFAULT_TRUNC_LENGTH = 30,
      DEFAULT_TRUNC_OMISSION = '...';
    var HOT_COUNT = 800,
      HOT_SPAN = 16;
    var LAZY_FILTER_FLAG = 1,
      LAZY_MAP_FLAG = 2,
      LAZY_WHILE_FLAG = 3;
    var INFINITY = 1 / 0,
      MAX_SAFE_INTEGER = 9007199254740991,
      MAX_INTEGER = 1.7976931348623157e+308,
      NAN = 0 / 0;
    var MAX_ARRAY_LENGTH = 4294967295,
      MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
      HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
    var wrapFlags = [['ary', WRAP_ARY_FLAG], ['bind', WRAP_BIND_FLAG], ['bindKey', WRAP_BIND_KEY_FLAG], ['curry', WRAP_CURRY_FLAG], ['curryRight', WRAP_CURRY_RIGHT_FLAG], ['flip', WRAP_FLIP_FLAG], ['partial', WRAP_PARTIAL_FLAG], ['partialRight', WRAP_PARTIAL_RIGHT_FLAG], ['rearg', WRAP_REARG_FLAG]];
    var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      asyncTag = '[object AsyncFunction]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      domExcTag = '[object DOMException]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      nullTag = '[object Null]',
      objectTag = '[object Object]',
      promiseTag = '[object Promise]',
      proxyTag = '[object Proxy]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      symbolTag = '[object Symbol]',
      undefinedTag = '[object Undefined]',
      weakMapTag = '[object WeakMap]',
      weakSetTag = '[object WeakSet]';
    var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';
    var reEmptyStringLeading = /\b__p \+= '';/g,
      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
    var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g,
      reUnescapedHtml = /[&<>"']/g,
      reHasEscapedHtml = RegExp(reEscapedHtml.source),
      reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
    var reEscape = /<%-([\s\S]+?)%>/g,
      reEvaluate = /<%([\s\S]+?)%>/g,
      reInterpolate = /<%=([\s\S]+?)%>/g;
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/,
      rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
      reHasRegExpChar = RegExp(reRegExpChar.source);
    var reTrimStart = /^\s+/;
    var reWhitespace = /\s/;
    var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
      reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
      reSplitDetails = /,? & /;
    var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
    var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
    var reEscapeChar = /\\(\\)?/g;
    var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
    var reFlags = /\w*$/;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsOctal = /^0o[0-7]+$/i;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
    var reNoMatch = /($^)/;
    var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
    var rsAstralRange = '\\ud800-\\udfff',
      rsComboMarksRange = '\\u0300-\\u036f',
      reComboHalfMarksRange = '\\ufe20-\\ufe2f',
      rsComboSymbolsRange = '\\u20d0-\\u20ff',
      rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
      rsDingbatRange = '\\u2700-\\u27bf',
      rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
      rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
      rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
      rsPunctuationRange = '\\u2000-\\u206f',
      rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
      rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
      rsVarRange = '\\ufe0e\\ufe0f',
      rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
    var rsApos = "['\u2019]",
      rsAstral = '[' + rsAstralRange + ']',
      rsBreak = '[' + rsBreakRange + ']',
      rsCombo = '[' + rsComboRange + ']',
      rsDigits = '\\d+',
      rsDingbat = '[' + rsDingbatRange + ']',
      rsLower = '[' + rsLowerRange + ']',
      rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
      rsFitz = '\\ud83c[\\udffb-\\udfff]',
      rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
      rsNonAstral = '[^' + rsAstralRange + ']',
      rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
      rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
      rsUpper = '[' + rsUpperRange + ']',
      rsZWJ = '\\u200d';
    var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
      rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
      rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
      rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
      reOptMod = rsModifier + '?',
      rsOptVar = '[' + rsVarRange + ']?',
      rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
      rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
      rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
      rsSeq = rsOptVar + reOptMod + rsOptJoin,
      rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq,
      rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';
    var reApos = RegExp(rsApos, 'g');
    var reComboMark = RegExp(rsCombo, 'g');
    var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');
    var reUnicodeWord = RegExp([rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')', rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')', rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower, rsUpper + '+' + rsOptContrUpper, rsOrdUpper, rsOrdLower, rsDigits, rsEmoji].join('|'), 'g');
    var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + ']');
    var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
    var contextProps = ['Array', 'Buffer', 'DataView', 'Date', 'Error', 'Float32Array', 'Float64Array', 'Function', 'Int8Array', 'Int16Array', 'Int32Array', 'Map', 'Math', 'Object', 'Promise', 'RegExp', 'Set', 'String', 'Symbol', 'TypeError', 'Uint8Array', 'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'WeakMap', '_', 'clearTimeout', 'isFinite', 'parseInt', 'setTimeout'];
    var templateCounter = -1;
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    var cloneableTags = {};
    cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
    cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
    var deburredLetters = {
      '\xc0': 'A',
      '\xc1': 'A',
      '\xc2': 'A',
      '\xc3': 'A',
      '\xc4': 'A',
      '\xc5': 'A',
      '\xe0': 'a',
      '\xe1': 'a',
      '\xe2': 'a',
      '\xe3': 'a',
      '\xe4': 'a',
      '\xe5': 'a',
      '\xc7': 'C',
      '\xe7': 'c',
      '\xd0': 'D',
      '\xf0': 'd',
      '\xc8': 'E',
      '\xc9': 'E',
      '\xca': 'E',
      '\xcb': 'E',
      '\xe8': 'e',
      '\xe9': 'e',
      '\xea': 'e',
      '\xeb': 'e',
      '\xcc': 'I',
      '\xcd': 'I',
      '\xce': 'I',
      '\xcf': 'I',
      '\xec': 'i',
      '\xed': 'i',
      '\xee': 'i',
      '\xef': 'i',
      '\xd1': 'N',
      '\xf1': 'n',
      '\xd2': 'O',
      '\xd3': 'O',
      '\xd4': 'O',
      '\xd5': 'O',
      '\xd6': 'O',
      '\xd8': 'O',
      '\xf2': 'o',
      '\xf3': 'o',
      '\xf4': 'o',
      '\xf5': 'o',
      '\xf6': 'o',
      '\xf8': 'o',
      '\xd9': 'U',
      '\xda': 'U',
      '\xdb': 'U',
      '\xdc': 'U',
      '\xf9': 'u',
      '\xfa': 'u',
      '\xfb': 'u',
      '\xfc': 'u',
      '\xdd': 'Y',
      '\xfd': 'y',
      '\xff': 'y',
      '\xc6': 'Ae',
      '\xe6': 'ae',
      '\xde': 'Th',
      '\xfe': 'th',
      '\xdf': 'ss',
      '\u0100': 'A',
      '\u0102': 'A',
      '\u0104': 'A',
      '\u0101': 'a',
      '\u0103': 'a',
      '\u0105': 'a',
      '\u0106': 'C',
      '\u0108': 'C',
      '\u010a': 'C',
      '\u010c': 'C',
      '\u0107': 'c',
      '\u0109': 'c',
      '\u010b': 'c',
      '\u010d': 'c',
      '\u010e': 'D',
      '\u0110': 'D',
      '\u010f': 'd',
      '\u0111': 'd',
      '\u0112': 'E',
      '\u0114': 'E',
      '\u0116': 'E',
      '\u0118': 'E',
      '\u011a': 'E',
      '\u0113': 'e',
      '\u0115': 'e',
      '\u0117': 'e',
      '\u0119': 'e',
      '\u011b': 'e',
      '\u011c': 'G',
      '\u011e': 'G',
      '\u0120': 'G',
      '\u0122': 'G',
      '\u011d': 'g',
      '\u011f': 'g',
      '\u0121': 'g',
      '\u0123': 'g',
      '\u0124': 'H',
      '\u0126': 'H',
      '\u0125': 'h',
      '\u0127': 'h',
      '\u0128': 'I',
      '\u012a': 'I',
      '\u012c': 'I',
      '\u012e': 'I',
      '\u0130': 'I',
      '\u0129': 'i',
      '\u012b': 'i',
      '\u012d': 'i',
      '\u012f': 'i',
      '\u0131': 'i',
      '\u0134': 'J',
      '\u0135': 'j',
      '\u0136': 'K',
      '\u0137': 'k',
      '\u0138': 'k',
      '\u0139': 'L',
      '\u013b': 'L',
      '\u013d': 'L',
      '\u013f': 'L',
      '\u0141': 'L',
      '\u013a': 'l',
      '\u013c': 'l',
      '\u013e': 'l',
      '\u0140': 'l',
      '\u0142': 'l',
      '\u0143': 'N',
      '\u0145': 'N',
      '\u0147': 'N',
      '\u014a': 'N',
      '\u0144': 'n',
      '\u0146': 'n',
      '\u0148': 'n',
      '\u014b': 'n',
      '\u014c': 'O',
      '\u014e': 'O',
      '\u0150': 'O',
      '\u014d': 'o',
      '\u014f': 'o',
      '\u0151': 'o',
      '\u0154': 'R',
      '\u0156': 'R',
      '\u0158': 'R',
      '\u0155': 'r',
      '\u0157': 'r',
      '\u0159': 'r',
      '\u015a': 'S',
      '\u015c': 'S',
      '\u015e': 'S',
      '\u0160': 'S',
      '\u015b': 's',
      '\u015d': 's',
      '\u015f': 's',
      '\u0161': 's',
      '\u0162': 'T',
      '\u0164': 'T',
      '\u0166': 'T',
      '\u0163': 't',
      '\u0165': 't',
      '\u0167': 't',
      '\u0168': 'U',
      '\u016a': 'U',
      '\u016c': 'U',
      '\u016e': 'U',
      '\u0170': 'U',
      '\u0172': 'U',
      '\u0169': 'u',
      '\u016b': 'u',
      '\u016d': 'u',
      '\u016f': 'u',
      '\u0171': 'u',
      '\u0173': 'u',
      '\u0174': 'W',
      '\u0175': 'w',
      '\u0176': 'Y',
      '\u0177': 'y',
      '\u0178': 'Y',
      '\u0179': 'Z',
      '\u017b': 'Z',
      '\u017d': 'Z',
      '\u017a': 'z',
      '\u017c': 'z',
      '\u017e': 'z',
      '\u0132': 'IJ',
      '\u0133': 'ij',
      '\u0152': 'Oe',
      '\u0153': 'oe',
      '\u0149': "'n",
      '\u017f': 's'
    };
    var htmlEscapes = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    var htmlUnescapes = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'"
    };
    var stringEscapes = {
      '\\': '\\',
      "'": "'",
      '\n': 'n',
      '\r': 'r',
      '\u2028': 'u2028',
      '\u2029': 'u2029'
    };
    var freeParseFloat = parseFloat,
      freeParseInt = parseInt;
    var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function('return this')();
    var freeExports =  exports && !exports.nodeType && exports;
    var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = function () {
      try {
        var types = freeModule && freeModule.require && freeModule.require('util').types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding('util');
      } catch (e) {}
    }();
    var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer,
      nodeIsDate = nodeUtil && nodeUtil.isDate,
      nodeIsMap = nodeUtil && nodeUtil.isMap,
      nodeIsRegExp = nodeUtil && nodeUtil.isRegExp,
      nodeIsSet = nodeUtil && nodeUtil.isSet,
      nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0:
          return func.call(thisArg);
        case 1:
          return func.call(thisArg, args[0]);
        case 2:
          return func.call(thisArg, args[0], args[1]);
        case 3:
          return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }
    function arrayAggregator(array, setter, iteratee, accumulator) {
      var index = -1,
        length = array == null ? 0 : array.length;
      while (++index < length) {
        var value = array[index];
        setter(accumulator, value, iteratee(value), array);
      }
      return accumulator;
    }
    function arrayEach(array, iteratee) {
      var index = -1,
        length = array == null ? 0 : array.length;
      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }
      return array;
    }
    function arrayEachRight(array, iteratee) {
      var length = array == null ? 0 : array.length;
      while (length--) {
        if (iteratee(array[length], length, array) === false) {
          break;
        }
      }
      return array;
    }
    function arrayEvery(array, predicate) {
      var index = -1,
        length = array == null ? 0 : array.length;
      while (++index < length) {
        if (!predicate(array[index], index, array)) {
          return false;
        }
      }
      return true;
    }
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
    function arrayIncludes(array, value) {
      var length = array == null ? 0 : array.length;
      return !!length && baseIndexOf(array, value, 0) > -1;
    }
    function arrayIncludesWith(array, value, comparator) {
      var index = -1,
        length = array == null ? 0 : array.length;
      while (++index < length) {
        if (comparator(value, array[index])) {
          return true;
        }
      }
      return false;
    }
    function arrayMap(array, iteratee) {
      var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);
      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }
    function arrayPush(array, values) {
      var index = -1,
        length = values.length,
        offset = array.length;
      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }
    function arrayReduce(array, iteratee, accumulator, initAccum) {
      var index = -1,
        length = array == null ? 0 : array.length;
      if (initAccum && length) {
        accumulator = array[++index];
      }
      while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
      }
      return accumulator;
    }
    function arrayReduceRight(array, iteratee, accumulator, initAccum) {
      var length = array == null ? 0 : array.length;
      if (initAccum && length) {
        accumulator = array[--length];
      }
      while (length--) {
        accumulator = iteratee(accumulator, array[length], length, array);
      }
      return accumulator;
    }
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
    var asciiSize = baseProperty('length');
    function asciiToArray(string) {
      return string.split('');
    }
    function asciiWords(string) {
      return string.match(reAsciiWord) || [];
    }
    function baseFindKey(collection, predicate, eachFunc) {
      var result;
      eachFunc(collection, function (value, key, collection) {
        if (predicate(value, key, collection)) {
          result = key;
          return false;
        }
      });
      return result;
    }
    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      var length = array.length,
        index = fromIndex + (fromRight ? 1 : -1);
      while (fromRight ? index-- : ++index < length) {
        if (predicate(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }
    function baseIndexOf(array, value, fromIndex) {
      return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
    }
    function baseIndexOfWith(array, value, fromIndex, comparator) {
      var index = fromIndex - 1,
        length = array.length;
      while (++index < length) {
        if (comparator(array[index], value)) {
          return index;
        }
      }
      return -1;
    }
    function baseIsNaN(value) {
      return value !== value;
    }
    function baseMean(array, iteratee) {
      var length = array == null ? 0 : array.length;
      return length ? baseSum(array, iteratee) / length : NAN;
    }
    function baseProperty(key) {
      return function (object) {
        return object == null ? undefined$1 : object[key];
      };
    }
    function basePropertyOf(object) {
      return function (key) {
        return object == null ? undefined$1 : object[key];
      };
    }
    function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
      eachFunc(collection, function (value, index, collection) {
        accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection);
      });
      return accumulator;
    }
    function baseSortBy(array, comparer) {
      var length = array.length;
      array.sort(comparer);
      while (length--) {
        array[length] = array[length].value;
      }
      return array;
    }
    function baseSum(array, iteratee) {
      var result,
        index = -1,
        length = array.length;
      while (++index < length) {
        var current = iteratee(array[index]);
        if (current !== undefined$1) {
          result = result === undefined$1 ? current : result + current;
        }
      }
      return result;
    }
    function baseTimes(n, iteratee) {
      var index = -1,
        result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    function baseToPairs(object, props) {
      return arrayMap(props, function (key) {
        return [key, object[key]];
      });
    }
    function baseTrim(string) {
      return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '') : string;
    }
    function baseUnary(func) {
      return function (value) {
        return func(value);
      };
    }
    function baseValues(object, props) {
      return arrayMap(props, function (key) {
        return object[key];
      });
    }
    function cacheHas(cache, key) {
      return cache.has(key);
    }
    function charsStartIndex(strSymbols, chrSymbols) {
      var index = -1,
        length = strSymbols.length;
      while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
      return index;
    }
    function charsEndIndex(strSymbols, chrSymbols) {
      var index = strSymbols.length;
      while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
      return index;
    }
    function countHolders(array, placeholder) {
      var length = array.length,
        result = 0;
      while (length--) {
        if (array[length] === placeholder) {
          ++result;
        }
      }
      return result;
    }
    var deburrLetter = basePropertyOf(deburredLetters);
    var escapeHtmlChar = basePropertyOf(htmlEscapes);
    function escapeStringChar(chr) {
      return '\\' + stringEscapes[chr];
    }
    function getValue(object, key) {
      return object == null ? undefined$1 : object[key];
    }
    function hasUnicode(string) {
      return reHasUnicode.test(string);
    }
    function hasUnicodeWord(string) {
      return reHasUnicodeWord.test(string);
    }
    function iteratorToArray(iterator) {
      var data,
        result = [];
      while (!(data = iterator.next()).done) {
        result.push(data.value);
      }
      return result;
    }
    function mapToArray(map) {
      var index = -1,
        result = Array(map.size);
      map.forEach(function (value, key) {
        result[++index] = [key, value];
      });
      return result;
    }
    function overArg(func, transform) {
      return function (arg) {
        return func(transform(arg));
      };
    }
    function replaceHolders(array, placeholder) {
      var index = -1,
        length = array.length,
        resIndex = 0,
        result = [];
      while (++index < length) {
        var value = array[index];
        if (value === placeholder || value === PLACEHOLDER) {
          array[index] = PLACEHOLDER;
          result[resIndex++] = index;
        }
      }
      return result;
    }
    function setToArray(set) {
      var index = -1,
        result = Array(set.size);
      set.forEach(function (value) {
        result[++index] = value;
      });
      return result;
    }
    function setToPairs(set) {
      var index = -1,
        result = Array(set.size);
      set.forEach(function (value) {
        result[++index] = [value, value];
      });
      return result;
    }
    function strictIndexOf(array, value, fromIndex) {
      var index = fromIndex - 1,
        length = array.length;
      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }
    function strictLastIndexOf(array, value, fromIndex) {
      var index = fromIndex + 1;
      while (index--) {
        if (array[index] === value) {
          return index;
        }
      }
      return index;
    }
    function stringSize(string) {
      return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
    }
    function stringToArray(string) {
      return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
    }
    function trimmedEndIndex(string) {
      var index = string.length;
      while (index-- && reWhitespace.test(string.charAt(index))) {}
      return index;
    }
    var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
    function unicodeSize(string) {
      var result = reUnicode.lastIndex = 0;
      while (reUnicode.test(string)) {
        ++result;
      }
      return result;
    }
    function unicodeToArray(string) {
      return string.match(reUnicode) || [];
    }
    function unicodeWords(string) {
      return string.match(reUnicodeWord) || [];
    }
    var runInContext = function runInContext(context) {
      context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));
      var Array = context.Array,
        Date = context.Date,
        Error = context.Error,
        Function = context.Function,
        Math = context.Math,
        Object = context.Object,
        RegExp = context.RegExp,
        String = context.String,
        TypeError = context.TypeError;
      var arrayProto = Array.prototype,
        funcProto = Function.prototype,
        objectProto = Object.prototype;
      var coreJsData = context['__core-js_shared__'];
      var funcToString = funcProto.toString;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var idCounter = 0;
      var maskSrcKey = function () {
        var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
        return uid ? 'Symbol(src)_1.' + uid : '';
      }();
      var nativeObjectToString = objectProto.toString;
      var objectCtorString = funcToString.call(Object);
      var oldDash = root._;
      var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
      var Buffer = moduleExports ? context.Buffer : undefined$1,
        Symbol = context.Symbol,
        Uint8Array = context.Uint8Array,
        allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined$1,
        getPrototype = overArg(Object.getPrototypeOf, Object),
        objectCreate = Object.create,
        propertyIsEnumerable = objectProto.propertyIsEnumerable,
        splice = arrayProto.splice,
        spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined$1,
        symIterator = Symbol ? Symbol.iterator : undefined$1,
        symToStringTag = Symbol ? Symbol.toStringTag : undefined$1;
      var defineProperty = function () {
        try {
          var func = getNative(Object, 'defineProperty');
          func({}, '', {});
          return func;
        } catch (e) {}
      }();
      var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout,
        ctxNow = Date && Date.now !== root.Date.now && Date.now,
        ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;
      var nativeCeil = Math.ceil,
        nativeFloor = Math.floor,
        nativeGetSymbols = Object.getOwnPropertySymbols,
        nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined$1,
        nativeIsFinite = context.isFinite,
        nativeJoin = arrayProto.join,
        nativeKeys = overArg(Object.keys, Object),
        nativeMax = Math.max,
        nativeMin = Math.min,
        nativeNow = Date.now,
        nativeParseInt = context.parseInt,
        nativeRandom = Math.random,
        nativeReverse = arrayProto.reverse;
      var DataView = getNative(context, 'DataView'),
        Map = getNative(context, 'Map'),
        Promise = getNative(context, 'Promise'),
        Set = getNative(context, 'Set'),
        WeakMap = getNative(context, 'WeakMap'),
        nativeCreate = getNative(Object, 'create');
      var metaMap = WeakMap && new WeakMap();
      var realNames = {};
      var dataViewCtorString = toSource(DataView),
        mapCtorString = toSource(Map),
        promiseCtorString = toSource(Promise),
        setCtorString = toSource(Set),
        weakMapCtorString = toSource(WeakMap);
      var symbolProto = Symbol ? Symbol.prototype : undefined$1,
        symbolValueOf = symbolProto ? symbolProto.valueOf : undefined$1,
        symbolToString = symbolProto ? symbolProto.toString : undefined$1;
      function lodash(value) {
        if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
          if (value instanceof LodashWrapper) {
            return value;
          }
          if (hasOwnProperty.call(value, '__wrapped__')) {
            return wrapperClone(value);
          }
        }
        return new LodashWrapper(value);
      }
      var baseCreate = function () {
        function object() {}
        return function (proto) {
          if (!isObject(proto)) {
            return {};
          }
          if (objectCreate) {
            return objectCreate(proto);
          }
          object.prototype = proto;
          var result = new object();
          object.prototype = undefined$1;
          return result;
        };
      }();
      function baseLodash() {}
      function LodashWrapper(value, chainAll) {
        this.__wrapped__ = value;
        this.__actions__ = [];
        this.__chain__ = !!chainAll;
        this.__index__ = 0;
        this.__values__ = undefined$1;
      }
      lodash.templateSettings = {
        'escape': reEscape,
        'evaluate': reEvaluate,
        'interpolate': reInterpolate,
        'variable': '',
        'imports': {
          '_': lodash
        }
      };
      lodash.prototype = baseLodash.prototype;
      lodash.prototype.constructor = lodash;
      LodashWrapper.prototype = baseCreate(baseLodash.prototype);
      LodashWrapper.prototype.constructor = LodashWrapper;
      function LazyWrapper(value) {
        this.__wrapped__ = value;
        this.__actions__ = [];
        this.__dir__ = 1;
        this.__filtered__ = false;
        this.__iteratees__ = [];
        this.__takeCount__ = MAX_ARRAY_LENGTH;
        this.__views__ = [];
      }
      function lazyClone() {
        var result = new LazyWrapper(this.__wrapped__);
        result.__actions__ = copyArray(this.__actions__);
        result.__dir__ = this.__dir__;
        result.__filtered__ = this.__filtered__;
        result.__iteratees__ = copyArray(this.__iteratees__);
        result.__takeCount__ = this.__takeCount__;
        result.__views__ = copyArray(this.__views__);
        return result;
      }
      function lazyReverse() {
        if (this.__filtered__) {
          var result = new LazyWrapper(this);
          result.__dir__ = -1;
          result.__filtered__ = true;
        } else {
          result = this.clone();
          result.__dir__ *= -1;
        }
        return result;
      }
      function lazyValue() {
        var array = this.__wrapped__.value(),
          dir = this.__dir__,
          isArr = isArray(array),
          isRight = dir < 0,
          arrLength = isArr ? array.length : 0,
          view = getView(0, arrLength, this.__views__),
          start = view.start,
          end = view.end,
          length = end - start,
          index = isRight ? end : start - 1,
          iteratees = this.__iteratees__,
          iterLength = iteratees.length,
          resIndex = 0,
          takeCount = nativeMin(length, this.__takeCount__);
        if (!isArr || !isRight && arrLength == length && takeCount == length) {
          return baseWrapperValue(array, this.__actions__);
        }
        var result = [];
        outer: while (length-- && resIndex < takeCount) {
          index += dir;
          var iterIndex = -1,
            value = array[index];
          while (++iterIndex < iterLength) {
            var data = iteratees[iterIndex],
              iteratee = data.iteratee,
              type = data.type,
              computed = iteratee(value);
            if (type == LAZY_MAP_FLAG) {
              value = computed;
            } else if (!computed) {
              if (type == LAZY_FILTER_FLAG) {
                continue outer;
              } else {
                break outer;
              }
            }
          }
          result[resIndex++] = value;
        }
        return result;
      }
      LazyWrapper.prototype = baseCreate(baseLodash.prototype);
      LazyWrapper.prototype.constructor = LazyWrapper;
      function Hash(entries) {
        var index = -1,
          length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function hashClear() {
        this.__data__ = nativeCreate ? nativeCreate(null) : {};
        this.size = 0;
      }
      function hashDelete(key) {
        var result = this.has(key) && delete this.__data__[key];
        this.size -= result ? 1 : 0;
        return result;
      }
      function hashGet(key) {
        var data = this.__data__;
        if (nativeCreate) {
          var result = data[key];
          return result === HASH_UNDEFINED ? undefined$1 : result;
        }
        return hasOwnProperty.call(data, key) ? data[key] : undefined$1;
      }
      function hashHas(key) {
        var data = this.__data__;
        return nativeCreate ? data[key] !== undefined$1 : hasOwnProperty.call(data, key);
      }
      function hashSet(key, value) {
        var data = this.__data__;
        this.size += this.has(key) ? 0 : 1;
        data[key] = nativeCreate && value === undefined$1 ? HASH_UNDEFINED : value;
        return this;
      }
      Hash.prototype.clear = hashClear;
      Hash.prototype['delete'] = hashDelete;
      Hash.prototype.get = hashGet;
      Hash.prototype.has = hashHas;
      Hash.prototype.set = hashSet;
      function ListCache(entries) {
        var index = -1,
          length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function listCacheClear() {
        this.__data__ = [];
        this.size = 0;
      }
      function listCacheDelete(key) {
        var data = this.__data__,
          index = assocIndexOf(data, key);
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
      function listCacheGet(key) {
        var data = this.__data__,
          index = assocIndexOf(data, key);
        return index < 0 ? undefined$1 : data[index][1];
      }
      function listCacheHas(key) {
        return assocIndexOf(this.__data__, key) > -1;
      }
      function listCacheSet(key, value) {
        var data = this.__data__,
          index = assocIndexOf(data, key);
        if (index < 0) {
          ++this.size;
          data.push([key, value]);
        } else {
          data[index][1] = value;
        }
        return this;
      }
      ListCache.prototype.clear = listCacheClear;
      ListCache.prototype['delete'] = listCacheDelete;
      ListCache.prototype.get = listCacheGet;
      ListCache.prototype.has = listCacheHas;
      ListCache.prototype.set = listCacheSet;
      function MapCache(entries) {
        var index = -1,
          length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function mapCacheClear() {
        this.size = 0;
        this.__data__ = {
          'hash': new Hash(),
          'map': new (Map || ListCache)(),
          'string': new Hash()
        };
      }
      function mapCacheDelete(key) {
        var result = getMapData(this, key)['delete'](key);
        this.size -= result ? 1 : 0;
        return result;
      }
      function mapCacheGet(key) {
        return getMapData(this, key).get(key);
      }
      function mapCacheHas(key) {
        return getMapData(this, key).has(key);
      }
      function mapCacheSet(key, value) {
        var data = getMapData(this, key),
          size = data.size;
        data.set(key, value);
        this.size += data.size == size ? 0 : 1;
        return this;
      }
      MapCache.prototype.clear = mapCacheClear;
      MapCache.prototype['delete'] = mapCacheDelete;
      MapCache.prototype.get = mapCacheGet;
      MapCache.prototype.has = mapCacheHas;
      MapCache.prototype.set = mapCacheSet;
      function SetCache(values) {
        var index = -1,
          length = values == null ? 0 : values.length;
        this.__data__ = new MapCache();
        while (++index < length) {
          this.add(values[index]);
        }
      }
      function setCacheAdd(value) {
        this.__data__.set(value, HASH_UNDEFINED);
        return this;
      }
      function setCacheHas(value) {
        return this.__data__.has(value);
      }
      SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
      SetCache.prototype.has = setCacheHas;
      function Stack(entries) {
        var data = this.__data__ = new ListCache(entries);
        this.size = data.size;
      }
      function stackClear() {
        this.__data__ = new ListCache();
        this.size = 0;
      }
      function stackDelete(key) {
        var data = this.__data__,
          result = data['delete'](key);
        this.size = data.size;
        return result;
      }
      function stackGet(key) {
        return this.__data__.get(key);
      }
      function stackHas(key) {
        return this.__data__.has(key);
      }
      function stackSet(key, value) {
        var data = this.__data__;
        if (data instanceof ListCache) {
          var pairs = data.__data__;
          if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
            pairs.push([key, value]);
            this.size = ++data.size;
            return this;
          }
          data = this.__data__ = new MapCache(pairs);
        }
        data.set(key, value);
        this.size = data.size;
        return this;
      }
      Stack.prototype.clear = stackClear;
      Stack.prototype['delete'] = stackDelete;
      Stack.prototype.get = stackGet;
      Stack.prototype.has = stackHas;
      Stack.prototype.set = stackSet;
      function arrayLikeKeys(value, inherited) {
        var isArr = isArray(value),
          isArg = !isArr && isArguments(value),
          isBuff = !isArr && !isArg && isBuffer(value),
          isType = !isArr && !isArg && !isBuff && isTypedArray(value),
          skipIndexes = isArr || isArg || isBuff || isType,
          result = skipIndexes ? baseTimes(value.length, String) : [],
          length = result.length;
        for (var key in value) {
          if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == 'length' || isBuff && (key == 'offset' || key == 'parent') || isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') || isIndex(key, length)))) {
            result.push(key);
          }
        }
        return result;
      }
      function arraySample(array) {
        var length = array.length;
        return length ? array[baseRandom(0, length - 1)] : undefined$1;
      }
      function arraySampleSize(array, n) {
        return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
      }
      function arrayShuffle(array) {
        return shuffleSelf(copyArray(array));
      }
      function assignMergeValue(object, key, value) {
        if (value !== undefined$1 && !eq(object[key], value) || value === undefined$1 && !(key in object)) {
          baseAssignValue(object, key, value);
        }
      }
      function assignValue(object, key, value) {
        var objValue = object[key];
        if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined$1 && !(key in object)) {
          baseAssignValue(object, key, value);
        }
      }
      function assocIndexOf(array, key) {
        var length = array.length;
        while (length--) {
          if (eq(array[length][0], key)) {
            return length;
          }
        }
        return -1;
      }
      function baseAggregator(collection, setter, iteratee, accumulator) {
        baseEach(collection, function (value, key, collection) {
          setter(accumulator, value, iteratee(value), collection);
        });
        return accumulator;
      }
      function baseAssign(object, source) {
        return object && copyObject(source, keys(source), object);
      }
      function baseAssignIn(object, source) {
        return object && copyObject(source, keysIn(source), object);
      }
      function baseAssignValue(object, key, value) {
        if (key == '__proto__' && defineProperty) {
          defineProperty(object, key, {
            'configurable': true,
            'enumerable': true,
            'value': value,
            'writable': true
          });
        } else {
          object[key] = value;
        }
      }
      function baseAt(object, paths) {
        var index = -1,
          length = paths.length,
          result = Array(length),
          skip = object == null;
        while (++index < length) {
          result[index] = skip ? undefined$1 : get(object, paths[index]);
        }
        return result;
      }
      function baseClamp(number, lower, upper) {
        if (number === number) {
          if (upper !== undefined$1) {
            number = number <= upper ? number : upper;
          }
          if (lower !== undefined$1) {
            number = number >= lower ? number : lower;
          }
        }
        return number;
      }
      function baseClone(value, bitmask, customizer, key, object, stack) {
        var result,
          isDeep = bitmask & CLONE_DEEP_FLAG,
          isFlat = bitmask & CLONE_FLAT_FLAG,
          isFull = bitmask & CLONE_SYMBOLS_FLAG;
        if (customizer) {
          result = object ? customizer(value, key, object, stack) : customizer(value);
        }
        if (result !== undefined$1) {
          return result;
        }
        if (!isObject(value)) {
          return value;
        }
        var isArr = isArray(value);
        if (isArr) {
          result = initCloneArray(value);
          if (!isDeep) {
            return copyArray(value, result);
          }
        } else {
          var tag = getTag(value),
            isFunc = tag == funcTag || tag == genTag;
          if (isBuffer(value)) {
            return cloneBuffer(value, isDeep);
          }
          if (tag == objectTag || tag == argsTag || isFunc && !object) {
            result = isFlat || isFunc ? {} : initCloneObject(value);
            if (!isDeep) {
              return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
            }
          } else {
            if (!cloneableTags[tag]) {
              return object ? value : {};
            }
            result = initCloneByTag(value, tag, isDeep);
          }
        }
        stack || (stack = new Stack());
        var stacked = stack.get(value);
        if (stacked) {
          return stacked;
        }
        stack.set(value, result);
        if (isSet(value)) {
          value.forEach(function (subValue) {
            result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
          });
        } else if (isMap(value)) {
          value.forEach(function (subValue, key) {
            result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
          });
        }
        var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
        var props = isArr ? undefined$1 : keysFunc(value);
        arrayEach(props || value, function (subValue, key) {
          if (props) {
            key = subValue;
            subValue = value[key];
          }
          assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
        });
        return result;
      }
      function baseConforms(source) {
        var props = keys(source);
        return function (object) {
          return baseConformsTo(object, source, props);
        };
      }
      function baseConformsTo(object, source, props) {
        var length = props.length;
        if (object == null) {
          return !length;
        }
        object = Object(object);
        while (length--) {
          var key = props[length],
            predicate = source[key],
            value = object[key];
          if (value === undefined$1 && !(key in object) || !predicate(value)) {
            return false;
          }
        }
        return true;
      }
      function baseDelay(func, wait, args) {
        if (typeof func != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        return setTimeout(function () {
          func.apply(undefined$1, args);
        }, wait);
      }
      function baseDifference(array, values, iteratee, comparator) {
        var index = -1,
          includes = arrayIncludes,
          isCommon = true,
          length = array.length,
          result = [],
          valuesLength = values.length;
        if (!length) {
          return result;
        }
        if (iteratee) {
          values = arrayMap(values, baseUnary(iteratee));
        }
        if (comparator) {
          includes = arrayIncludesWith;
          isCommon = false;
        } else if (values.length >= LARGE_ARRAY_SIZE) {
          includes = cacheHas;
          isCommon = false;
          values = new SetCache(values);
        }
        outer: while (++index < length) {
          var value = array[index],
            computed = iteratee == null ? value : iteratee(value);
          value = comparator || value !== 0 ? value : 0;
          if (isCommon && computed === computed) {
            var valuesIndex = valuesLength;
            while (valuesIndex--) {
              if (values[valuesIndex] === computed) {
                continue outer;
              }
            }
            result.push(value);
          } else if (!includes(values, computed, comparator)) {
            result.push(value);
          }
        }
        return result;
      }
      var baseEach = createBaseEach(baseForOwn);
      var baseEachRight = createBaseEach(baseForOwnRight, true);
      function baseEvery(collection, predicate) {
        var result = true;
        baseEach(collection, function (value, index, collection) {
          result = !!predicate(value, index, collection);
          return result;
        });
        return result;
      }
      function baseExtremum(array, iteratee, comparator) {
        var index = -1,
          length = array.length;
        while (++index < length) {
          var value = array[index],
            current = iteratee(value);
          if (current != null && (computed === undefined$1 ? current === current && !isSymbol(current) : comparator(current, computed))) {
            var computed = current,
              result = value;
          }
        }
        return result;
      }
      function baseFill(array, value, start, end) {
        var length = array.length;
        start = toInteger(start);
        if (start < 0) {
          start = -start > length ? 0 : length + start;
        }
        end = end === undefined$1 || end > length ? length : toInteger(end);
        if (end < 0) {
          end += length;
        }
        end = start > end ? 0 : toLength(end);
        while (start < end) {
          array[start++] = value;
        }
        return array;
      }
      function baseFilter(collection, predicate) {
        var result = [];
        baseEach(collection, function (value, index, collection) {
          if (predicate(value, index, collection)) {
            result.push(value);
          }
        });
        return result;
      }
      function baseFlatten(array, depth, predicate, isStrict, result) {
        var index = -1,
          length = array.length;
        predicate || (predicate = isFlattenable);
        result || (result = []);
        while (++index < length) {
          var value = array[index];
          if (depth > 0 && predicate(value)) {
            if (depth > 1) {
              baseFlatten(value, depth - 1, predicate, isStrict, result);
            } else {
              arrayPush(result, value);
            }
          } else if (!isStrict) {
            result[result.length] = value;
          }
        }
        return result;
      }
      var baseFor = createBaseFor();
      var baseForRight = createBaseFor(true);
      function baseForOwn(object, iteratee) {
        return object && baseFor(object, iteratee, keys);
      }
      function baseForOwnRight(object, iteratee) {
        return object && baseForRight(object, iteratee, keys);
      }
      function baseFunctions(object, props) {
        return arrayFilter(props, function (key) {
          return isFunction(object[key]);
        });
      }
      function baseGet(object, path) {
        path = castPath(path, object);
        var index = 0,
          length = path.length;
        while (object != null && index < length) {
          object = object[toKey(path[index++])];
        }
        return index && index == length ? object : undefined$1;
      }
      function baseGetAllKeys(object, keysFunc, symbolsFunc) {
        var result = keysFunc(object);
        return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
      }
      function baseGetTag(value) {
        if (value == null) {
          return value === undefined$1 ? undefinedTag : nullTag;
        }
        return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
      }
      function baseGt(value, other) {
        return value > other;
      }
      function baseHas(object, key) {
        return object != null && hasOwnProperty.call(object, key);
      }
      function baseHasIn(object, key) {
        return object != null && key in Object(object);
      }
      function baseInRange(number, start, end) {
        return number >= nativeMin(start, end) && number < nativeMax(start, end);
      }
      function baseIntersection(arrays, iteratee, comparator) {
        var includes = comparator ? arrayIncludesWith : arrayIncludes,
          length = arrays[0].length,
          othLength = arrays.length,
          othIndex = othLength,
          caches = Array(othLength),
          maxLength = Infinity,
          result = [];
        while (othIndex--) {
          var array = arrays[othIndex];
          if (othIndex && iteratee) {
            array = arrayMap(array, baseUnary(iteratee));
          }
          maxLength = nativeMin(array.length, maxLength);
          caches[othIndex] = !comparator && (iteratee || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined$1;
        }
        array = arrays[0];
        var index = -1,
          seen = caches[0];
        outer: while (++index < length && result.length < maxLength) {
          var value = array[index],
            computed = iteratee ? iteratee(value) : value;
          value = comparator || value !== 0 ? value : 0;
          if (!(seen ? cacheHas(seen, computed) : includes(result, computed, comparator))) {
            othIndex = othLength;
            while (--othIndex) {
              var cache = caches[othIndex];
              if (!(cache ? cacheHas(cache, computed) : includes(arrays[othIndex], computed, comparator))) {
                continue outer;
              }
            }
            if (seen) {
              seen.push(computed);
            }
            result.push(value);
          }
        }
        return result;
      }
      function baseInverter(object, setter, iteratee, accumulator) {
        baseForOwn(object, function (value, key, object) {
          setter(accumulator, iteratee(value), key, object);
        });
        return accumulator;
      }
      function baseInvoke(object, path, args) {
        path = castPath(path, object);
        object = parent(object, path);
        var func = object == null ? object : object[toKey(last(path))];
        return func == null ? undefined$1 : apply(func, object, args);
      }
      function baseIsArguments(value) {
        return isObjectLike(value) && baseGetTag(value) == argsTag;
      }
      function baseIsArrayBuffer(value) {
        return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
      }
      function baseIsDate(value) {
        return isObjectLike(value) && baseGetTag(value) == dateTag;
      }
      function baseIsEqual(value, other, bitmask, customizer, stack) {
        if (value === other) {
          return true;
        }
        if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
          return value !== value && other !== other;
        }
        return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
      }
      function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
        var objIsArr = isArray(object),
          othIsArr = isArray(other),
          objTag = objIsArr ? arrayTag : getTag(object),
          othTag = othIsArr ? arrayTag : getTag(other);
        objTag = objTag == argsTag ? objectTag : objTag;
        othTag = othTag == argsTag ? objectTag : othTag;
        var objIsObj = objTag == objectTag,
          othIsObj = othTag == objectTag,
          isSameTag = objTag == othTag;
        if (isSameTag && isBuffer(object)) {
          if (!isBuffer(other)) {
            return false;
          }
          objIsArr = true;
          objIsObj = false;
        }
        if (isSameTag && !objIsObj) {
          stack || (stack = new Stack());
          return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
        }
        if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
          var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
            othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
          if (objIsWrapped || othIsWrapped) {
            var objUnwrapped = objIsWrapped ? object.value() : object,
              othUnwrapped = othIsWrapped ? other.value() : other;
            stack || (stack = new Stack());
            return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
          }
        }
        if (!isSameTag) {
          return false;
        }
        stack || (stack = new Stack());
        return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
      }
      function baseIsMap(value) {
        return isObjectLike(value) && getTag(value) == mapTag;
      }
      function baseIsMatch(object, source, matchData, customizer) {
        var index = matchData.length,
          length = index,
          noCustomizer = !customizer;
        if (object == null) {
          return !length;
        }
        object = Object(object);
        while (index--) {
          var data = matchData[index];
          if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
            return false;
          }
        }
        while (++index < length) {
          data = matchData[index];
          var key = data[0],
            objValue = object[key],
            srcValue = data[1];
          if (noCustomizer && data[2]) {
            if (objValue === undefined$1 && !(key in object)) {
              return false;
            }
          } else {
            var stack = new Stack();
            if (customizer) {
              var result = customizer(objValue, srcValue, key, object, source, stack);
            }
            if (!(result === undefined$1 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result)) {
              return false;
            }
          }
        }
        return true;
      }
      function baseIsNative(value) {
        if (!isObject(value) || isMasked(value)) {
          return false;
        }
        var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
        return pattern.test(toSource(value));
      }
      function baseIsRegExp(value) {
        return isObjectLike(value) && baseGetTag(value) == regexpTag;
      }
      function baseIsSet(value) {
        return isObjectLike(value) && getTag(value) == setTag;
      }
      function baseIsTypedArray(value) {
        return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
      }
      function baseIteratee(value) {
        if (typeof value == 'function') {
          return value;
        }
        if (value == null) {
          return identity;
        }
        if (typeof value == 'object') {
          return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
        }
        return property(value);
      }
      function baseKeys(object) {
        if (!isPrototype(object)) {
          return nativeKeys(object);
        }
        var result = [];
        for (var key in Object(object)) {
          if (hasOwnProperty.call(object, key) && key != 'constructor') {
            result.push(key);
          }
        }
        return result;
      }
      function baseKeysIn(object) {
        if (!isObject(object)) {
          return nativeKeysIn(object);
        }
        var isProto = isPrototype(object),
          result = [];
        for (var key in object) {
          if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
            result.push(key);
          }
        }
        return result;
      }
      function baseLt(value, other) {
        return value < other;
      }
      function baseMap(collection, iteratee) {
        var index = -1,
          result = isArrayLike(collection) ? Array(collection.length) : [];
        baseEach(collection, function (value, key, collection) {
          result[++index] = iteratee(value, key, collection);
        });
        return result;
      }
      function baseMatches(source) {
        var matchData = getMatchData(source);
        if (matchData.length == 1 && matchData[0][2]) {
          return matchesStrictComparable(matchData[0][0], matchData[0][1]);
        }
        return function (object) {
          return object === source || baseIsMatch(object, source, matchData);
        };
      }
      function baseMatchesProperty(path, srcValue) {
        if (isKey(path) && isStrictComparable(srcValue)) {
          return matchesStrictComparable(toKey(path), srcValue);
        }
        return function (object) {
          var objValue = get(object, path);
          return objValue === undefined$1 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
        };
      }
      function baseMerge(object, source, srcIndex, customizer, stack) {
        if (object === source) {
          return;
        }
        baseFor(source, function (srcValue, key) {
          stack || (stack = new Stack());
          if (isObject(srcValue)) {
            baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
          } else {
            var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + '', object, source, stack) : undefined$1;
            if (newValue === undefined$1) {
              newValue = srcValue;
            }
            assignMergeValue(object, key, newValue);
          }
        }, keysIn);
      }
      function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
        var objValue = safeGet(object, key),
          srcValue = safeGet(source, key),
          stacked = stack.get(srcValue);
        if (stacked) {
          assignMergeValue(object, key, stacked);
          return;
        }
        var newValue = customizer ? customizer(objValue, srcValue, key + '', object, source, stack) : undefined$1;
        var isCommon = newValue === undefined$1;
        if (isCommon) {
          var isArr = isArray(srcValue),
            isBuff = !isArr && isBuffer(srcValue),
            isTyped = !isArr && !isBuff && isTypedArray(srcValue);
          newValue = srcValue;
          if (isArr || isBuff || isTyped) {
            if (isArray(objValue)) {
              newValue = objValue;
            } else if (isArrayLikeObject(objValue)) {
              newValue = copyArray(objValue);
            } else if (isBuff) {
              isCommon = false;
              newValue = cloneBuffer(srcValue, true);
            } else if (isTyped) {
              isCommon = false;
              newValue = cloneTypedArray(srcValue, true);
            } else {
              newValue = [];
            }
          } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
            newValue = objValue;
            if (isArguments(objValue)) {
              newValue = toPlainObject(objValue);
            } else if (!isObject(objValue) || isFunction(objValue)) {
              newValue = initCloneObject(srcValue);
            }
          } else {
            isCommon = false;
          }
        }
        if (isCommon) {
          stack.set(srcValue, newValue);
          mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
          stack['delete'](srcValue);
        }
        assignMergeValue(object, key, newValue);
      }
      function baseNth(array, n) {
        var length = array.length;
        if (!length) {
          return;
        }
        n += n < 0 ? length : 0;
        return isIndex(n, length) ? array[n] : undefined$1;
      }
      function baseOrderBy(collection, iteratees, orders) {
        if (iteratees.length) {
          iteratees = arrayMap(iteratees, function (iteratee) {
            if (isArray(iteratee)) {
              return function (value) {
                return baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee);
              };
            }
            return iteratee;
          });
        } else {
          iteratees = [identity];
        }
        var index = -1;
        iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
        var result = baseMap(collection, function (value, key, collection) {
          var criteria = arrayMap(iteratees, function (iteratee) {
            return iteratee(value);
          });
          return {
            'criteria': criteria,
            'index': ++index,
            'value': value
          };
        });
        return baseSortBy(result, function (object, other) {
          return compareMultiple(object, other, orders);
        });
      }
      function basePick(object, paths) {
        return basePickBy(object, paths, function (value, path) {
          return hasIn(object, path);
        });
      }
      function basePickBy(object, paths, predicate) {
        var index = -1,
          length = paths.length,
          result = {};
        while (++index < length) {
          var path = paths[index],
            value = baseGet(object, path);
          if (predicate(value, path)) {
            baseSet(result, castPath(path, object), value);
          }
        }
        return result;
      }
      function basePropertyDeep(path) {
        return function (object) {
          return baseGet(object, path);
        };
      }
      function basePullAll(array, values, iteratee, comparator) {
        var indexOf = comparator ? baseIndexOfWith : baseIndexOf,
          index = -1,
          length = values.length,
          seen = array;
        if (array === values) {
          values = copyArray(values);
        }
        if (iteratee) {
          seen = arrayMap(array, baseUnary(iteratee));
        }
        while (++index < length) {
          var fromIndex = 0,
            value = values[index],
            computed = iteratee ? iteratee(value) : value;
          while ((fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1) {
            if (seen !== array) {
              splice.call(seen, fromIndex, 1);
            }
            splice.call(array, fromIndex, 1);
          }
        }
        return array;
      }
      function basePullAt(array, indexes) {
        var length = array ? indexes.length : 0,
          lastIndex = length - 1;
        while (length--) {
          var index = indexes[length];
          if (length == lastIndex || index !== previous) {
            var previous = index;
            if (isIndex(index)) {
              splice.call(array, index, 1);
            } else {
              baseUnset(array, index);
            }
          }
        }
        return array;
      }
      function baseRandom(lower, upper) {
        return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
      }
      function baseRange(start, end, step, fromRight) {
        var index = -1,
          length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
          result = Array(length);
        while (length--) {
          result[fromRight ? length : ++index] = start;
          start += step;
        }
        return result;
      }
      function baseRepeat(string, n) {
        var result = '';
        if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
          return result;
        }
        do {
          if (n % 2) {
            result += string;
          }
          n = nativeFloor(n / 2);
          if (n) {
            string += string;
          }
        } while (n);
        return result;
      }
      function baseRest(func, start) {
        return setToString(overRest(func, start, identity), func + '');
      }
      function baseSample(collection) {
        return arraySample(values(collection));
      }
      function baseSampleSize(collection, n) {
        var array = values(collection);
        return shuffleSelf(array, baseClamp(n, 0, array.length));
      }
      function baseSet(object, path, value, customizer) {
        if (!isObject(object)) {
          return object;
        }
        path = castPath(path, object);
        var index = -1,
          length = path.length,
          lastIndex = length - 1,
          nested = object;
        while (nested != null && ++index < length) {
          var key = toKey(path[index]),
            newValue = value;
          if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
            return object;
          }
          if (index != lastIndex) {
            var objValue = nested[key];
            newValue = customizer ? customizer(objValue, key, nested) : undefined$1;
            if (newValue === undefined$1) {
              newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
            }
          }
          assignValue(nested, key, newValue);
          nested = nested[key];
        }
        return object;
      }
      var baseSetData = !metaMap ? identity : function (func, data) {
        metaMap.set(func, data);
        return func;
      };
      var baseSetToString = !defineProperty ? identity : function (func, string) {
        return defineProperty(func, 'toString', {
          'configurable': true,
          'enumerable': false,
          'value': constant(string),
          'writable': true
        });
      };
      function baseShuffle(collection) {
        return shuffleSelf(values(collection));
      }
      function baseSlice(array, start, end) {
        var index = -1,
          length = array.length;
        if (start < 0) {
          start = -start > length ? 0 : length + start;
        }
        end = end > length ? length : end;
        if (end < 0) {
          end += length;
        }
        length = start > end ? 0 : end - start >>> 0;
        start >>>= 0;
        var result = Array(length);
        while (++index < length) {
          result[index] = array[index + start];
        }
        return result;
      }
      function baseSome(collection, predicate) {
        var result;
        baseEach(collection, function (value, index, collection) {
          result = predicate(value, index, collection);
          return !result;
        });
        return !!result;
      }
      function baseSortedIndex(array, value, retHighest) {
        var low = 0,
          high = array == null ? low : array.length;
        if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
          while (low < high) {
            var mid = low + high >>> 1,
              computed = array[mid];
            if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }
          return high;
        }
        return baseSortedIndexBy(array, value, identity, retHighest);
      }
      function baseSortedIndexBy(array, value, iteratee, retHighest) {
        var low = 0,
          high = array == null ? 0 : array.length;
        if (high === 0) {
          return 0;
        }
        value = iteratee(value);
        var valIsNaN = value !== value,
          valIsNull = value === null,
          valIsSymbol = isSymbol(value),
          valIsUndefined = value === undefined$1;
        while (low < high) {
          var mid = nativeFloor((low + high) / 2),
            computed = iteratee(array[mid]),
            othIsDefined = computed !== undefined$1,
            othIsNull = computed === null,
            othIsReflexive = computed === computed,
            othIsSymbol = isSymbol(computed);
          if (valIsNaN) {
            var setLow = retHighest || othIsReflexive;
          } else if (valIsUndefined) {
            setLow = othIsReflexive && (retHighest || othIsDefined);
          } else if (valIsNull) {
            setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
          } else if (valIsSymbol) {
            setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
          } else if (othIsNull || othIsSymbol) {
            setLow = false;
          } else {
            setLow = retHighest ? computed <= value : computed < value;
          }
          if (setLow) {
            low = mid + 1;
          } else {
            high = mid;
          }
        }
        return nativeMin(high, MAX_ARRAY_INDEX);
      }
      function baseSortedUniq(array, iteratee) {
        var index = -1,
          length = array.length,
          resIndex = 0,
          result = [];
        while (++index < length) {
          var value = array[index],
            computed = iteratee ? iteratee(value) : value;
          if (!index || !eq(computed, seen)) {
            var seen = computed;
            result[resIndex++] = value === 0 ? 0 : value;
          }
        }
        return result;
      }
      function baseToNumber(value) {
        if (typeof value == 'number') {
          return value;
        }
        if (isSymbol(value)) {
          return NAN;
        }
        return +value;
      }
      function baseToString(value) {
        if (typeof value == 'string') {
          return value;
        }
        if (isArray(value)) {
          return arrayMap(value, baseToString) + '';
        }
        if (isSymbol(value)) {
          return symbolToString ? symbolToString.call(value) : '';
        }
        var result = value + '';
        return result == '0' && 1 / value == -INFINITY ? '-0' : result;
      }
      function baseUniq(array, iteratee, comparator) {
        var index = -1,
          includes = arrayIncludes,
          length = array.length,
          isCommon = true,
          result = [],
          seen = result;
        if (comparator) {
          isCommon = false;
          includes = arrayIncludesWith;
        } else if (length >= LARGE_ARRAY_SIZE) {
          var set = iteratee ? null : createSet(array);
          if (set) {
            return setToArray(set);
          }
          isCommon = false;
          includes = cacheHas;
          seen = new SetCache();
        } else {
          seen = iteratee ? [] : result;
        }
        outer: while (++index < length) {
          var value = array[index],
            computed = iteratee ? iteratee(value) : value;
          value = comparator || value !== 0 ? value : 0;
          if (isCommon && computed === computed) {
            var seenIndex = seen.length;
            while (seenIndex--) {
              if (seen[seenIndex] === computed) {
                continue outer;
              }
            }
            if (iteratee) {
              seen.push(computed);
            }
            result.push(value);
          } else if (!includes(seen, computed, comparator)) {
            if (seen !== result) {
              seen.push(computed);
            }
            result.push(value);
          }
        }
        return result;
      }
      function baseUnset(object, path) {
        path = castPath(path, object);
        object = parent(object, path);
        return object == null || delete object[toKey(last(path))];
      }
      function baseUpdate(object, path, updater, customizer) {
        return baseSet(object, path, updater(baseGet(object, path)), customizer);
      }
      function baseWhile(array, predicate, isDrop, fromRight) {
        var length = array.length,
          index = fromRight ? length : -1;
        while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {}
        return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
      }
      function baseWrapperValue(value, actions) {
        var result = value;
        if (result instanceof LazyWrapper) {
          result = result.value();
        }
        return arrayReduce(actions, function (result, action) {
          return action.func.apply(action.thisArg, arrayPush([result], action.args));
        }, result);
      }
      function baseXor(arrays, iteratee, comparator) {
        var length = arrays.length;
        if (length < 2) {
          return length ? baseUniq(arrays[0]) : [];
        }
        var index = -1,
          result = Array(length);
        while (++index < length) {
          var array = arrays[index],
            othIndex = -1;
          while (++othIndex < length) {
            if (othIndex != index) {
              result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator);
            }
          }
        }
        return baseUniq(baseFlatten(result, 1), iteratee, comparator);
      }
      function baseZipObject(props, values, assignFunc) {
        var index = -1,
          length = props.length,
          valsLength = values.length,
          result = {};
        while (++index < length) {
          var value = index < valsLength ? values[index] : undefined$1;
          assignFunc(result, props[index], value);
        }
        return result;
      }
      function castArrayLikeObject(value) {
        return isArrayLikeObject(value) ? value : [];
      }
      function castFunction(value) {
        return typeof value == 'function' ? value : identity;
      }
      function castPath(value, object) {
        if (isArray(value)) {
          return value;
        }
        return isKey(value, object) ? [value] : stringToPath(toString(value));
      }
      var castRest = baseRest;
      function castSlice(array, start, end) {
        var length = array.length;
        end = end === undefined$1 ? length : end;
        return !start && end >= length ? array : baseSlice(array, start, end);
      }
      var clearTimeout = ctxClearTimeout || function (id) {
        return root.clearTimeout(id);
      };
      function cloneBuffer(buffer, isDeep) {
        if (isDeep) {
          return buffer.slice();
        }
        var length = buffer.length,
          result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
        buffer.copy(result);
        return result;
      }
      function cloneArrayBuffer(arrayBuffer) {
        var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
        new Uint8Array(result).set(new Uint8Array(arrayBuffer));
        return result;
      }
      function cloneDataView(dataView, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
        return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
      }
      function cloneRegExp(regexp) {
        var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
        result.lastIndex = regexp.lastIndex;
        return result;
      }
      function cloneSymbol(symbol) {
        return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
      }
      function cloneTypedArray(typedArray, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
        return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
      }
      function compareAscending(value, other) {
        if (value !== other) {
          var valIsDefined = value !== undefined$1,
            valIsNull = value === null,
            valIsReflexive = value === value,
            valIsSymbol = isSymbol(value);
          var othIsDefined = other !== undefined$1,
            othIsNull = other === null,
            othIsReflexive = other === other,
            othIsSymbol = isSymbol(other);
          if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
            return 1;
          }
          if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
            return -1;
          }
        }
        return 0;
      }
      function compareMultiple(object, other, orders) {
        var index = -1,
          objCriteria = object.criteria,
          othCriteria = other.criteria,
          length = objCriteria.length,
          ordersLength = orders.length;
        while (++index < length) {
          var result = compareAscending(objCriteria[index], othCriteria[index]);
          if (result) {
            if (index >= ordersLength) {
              return result;
            }
            var order = orders[index];
            return result * (order == 'desc' ? -1 : 1);
          }
        }
        return object.index - other.index;
      }
      function composeArgs(args, partials, holders, isCurried) {
        var argsIndex = -1,
          argsLength = args.length,
          holdersLength = holders.length,
          leftIndex = -1,
          leftLength = partials.length,
          rangeLength = nativeMax(argsLength - holdersLength, 0),
          result = Array(leftLength + rangeLength),
          isUncurried = !isCurried;
        while (++leftIndex < leftLength) {
          result[leftIndex] = partials[leftIndex];
        }
        while (++argsIndex < holdersLength) {
          if (isUncurried || argsIndex < argsLength) {
            result[holders[argsIndex]] = args[argsIndex];
          }
        }
        while (rangeLength--) {
          result[leftIndex++] = args[argsIndex++];
        }
        return result;
      }
      function composeArgsRight(args, partials, holders, isCurried) {
        var argsIndex = -1,
          argsLength = args.length,
          holdersIndex = -1,
          holdersLength = holders.length,
          rightIndex = -1,
          rightLength = partials.length,
          rangeLength = nativeMax(argsLength - holdersLength, 0),
          result = Array(rangeLength + rightLength),
          isUncurried = !isCurried;
        while (++argsIndex < rangeLength) {
          result[argsIndex] = args[argsIndex];
        }
        var offset = argsIndex;
        while (++rightIndex < rightLength) {
          result[offset + rightIndex] = partials[rightIndex];
        }
        while (++holdersIndex < holdersLength) {
          if (isUncurried || argsIndex < argsLength) {
            result[offset + holders[holdersIndex]] = args[argsIndex++];
          }
        }
        return result;
      }
      function copyArray(source, array) {
        var index = -1,
          length = source.length;
        array || (array = Array(length));
        while (++index < length) {
          array[index] = source[index];
        }
        return array;
      }
      function copyObject(source, props, object, customizer) {
        var isNew = !object;
        object || (object = {});
        var index = -1,
          length = props.length;
        while (++index < length) {
          var key = props[index];
          var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined$1;
          if (newValue === undefined$1) {
            newValue = source[key];
          }
          if (isNew) {
            baseAssignValue(object, key, newValue);
          } else {
            assignValue(object, key, newValue);
          }
        }
        return object;
      }
      function copySymbols(source, object) {
        return copyObject(source, getSymbols(source), object);
      }
      function copySymbolsIn(source, object) {
        return copyObject(source, getSymbolsIn(source), object);
      }
      function createAggregator(setter, initializer) {
        return function (collection, iteratee) {
          var func = isArray(collection) ? arrayAggregator : baseAggregator,
            accumulator = initializer ? initializer() : {};
          return func(collection, setter, getIteratee(iteratee, 2), accumulator);
        };
      }
      function createAssigner(assigner) {
        return baseRest(function (object, sources) {
          var index = -1,
            length = sources.length,
            customizer = length > 1 ? sources[length - 1] : undefined$1,
            guard = length > 2 ? sources[2] : undefined$1;
          customizer = assigner.length > 3 && typeof customizer == 'function' ? (length--, customizer) : undefined$1;
          if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            customizer = length < 3 ? undefined$1 : customizer;
            length = 1;
          }
          object = Object(object);
          while (++index < length) {
            var source = sources[index];
            if (source) {
              assigner(object, source, index, customizer);
            }
          }
          return object;
        });
      }
      function createBaseEach(eachFunc, fromRight) {
        return function (collection, iteratee) {
          if (collection == null) {
            return collection;
          }
          if (!isArrayLike(collection)) {
            return eachFunc(collection, iteratee);
          }
          var length = collection.length,
            index = fromRight ? length : -1,
            iterable = Object(collection);
          while (fromRight ? index-- : ++index < length) {
            if (iteratee(iterable[index], index, iterable) === false) {
              break;
            }
          }
          return collection;
        };
      }
      function createBaseFor(fromRight) {
        return function (object, iteratee, keysFunc) {
          var index = -1,
            iterable = Object(object),
            props = keysFunc(object),
            length = props.length;
          while (length--) {
            var key = props[fromRight ? length : ++index];
            if (iteratee(iterable[key], key, iterable) === false) {
              break;
            }
          }
          return object;
        };
      }
      function createBind(func, bitmask, thisArg) {
        var isBind = bitmask & WRAP_BIND_FLAG,
          Ctor = createCtor(func);
        function wrapper() {
          var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
          return fn.apply(isBind ? thisArg : this, arguments);
        }
        return wrapper;
      }
      function createCaseFirst(methodName) {
        return function (string) {
          string = toString(string);
          var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined$1;
          var chr = strSymbols ? strSymbols[0] : string.charAt(0);
          var trailing = strSymbols ? castSlice(strSymbols, 1).join('') : string.slice(1);
          return chr[methodName]() + trailing;
        };
      }
      function createCompounder(callback) {
        return function (string) {
          return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
        };
      }
      function createCtor(Ctor) {
        return function () {
          var args = arguments;
          switch (args.length) {
            case 0:
              return new Ctor();
            case 1:
              return new Ctor(args[0]);
            case 2:
              return new Ctor(args[0], args[1]);
            case 3:
              return new Ctor(args[0], args[1], args[2]);
            case 4:
              return new Ctor(args[0], args[1], args[2], args[3]);
            case 5:
              return new Ctor(args[0], args[1], args[2], args[3], args[4]);
            case 6:
              return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
            case 7:
              return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
          }
          var thisBinding = baseCreate(Ctor.prototype),
            result = Ctor.apply(thisBinding, args);
          return isObject(result) ? result : thisBinding;
        };
      }
      function createCurry(func, bitmask, arity) {
        var Ctor = createCtor(func);
        function wrapper() {
          var length = arguments.length,
            args = Array(length),
            index = length,
            placeholder = getHolder(wrapper);
          while (index--) {
            args[index] = arguments[index];
          }
          var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
          length -= holders.length;
          if (length < arity) {
            return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, undefined$1, args, holders, undefined$1, undefined$1, arity - length);
          }
          var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
          return apply(fn, this, args);
        }
        return wrapper;
      }
      function createFind(findIndexFunc) {
        return function (collection, predicate, fromIndex) {
          var iterable = Object(collection);
          if (!isArrayLike(collection)) {
            var iteratee = getIteratee(predicate, 3);
            collection = keys(collection);
            predicate = function (key) {
              return iteratee(iterable[key], key, iterable);
            };
          }
          var index = findIndexFunc(collection, predicate, fromIndex);
          return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined$1;
        };
      }
      function createFlow(fromRight) {
        return flatRest(function (funcs) {
          var length = funcs.length,
            index = length,
            prereq = LodashWrapper.prototype.thru;
          if (fromRight) {
            funcs.reverse();
          }
          while (index--) {
            var func = funcs[index];
            if (typeof func != 'function') {
              throw new TypeError(FUNC_ERROR_TEXT);
            }
            if (prereq && !wrapper && getFuncName(func) == 'wrapper') {
              var wrapper = new LodashWrapper([], true);
            }
          }
          index = wrapper ? index : length;
          while (++index < length) {
            func = funcs[index];
            var funcName = getFuncName(func),
              data = funcName == 'wrapper' ? getData(func) : undefined$1;
            if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
              wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
            } else {
              wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
            }
          }
          return function () {
            var args = arguments,
              value = args[0];
            if (wrapper && args.length == 1 && isArray(value)) {
              return wrapper.plant(value).value();
            }
            var index = 0,
              result = length ? funcs[index].apply(this, args) : value;
            while (++index < length) {
              result = funcs[index].call(this, result);
            }
            return result;
          };
        });
      }
      function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
        var isAry = bitmask & WRAP_ARY_FLAG,
          isBind = bitmask & WRAP_BIND_FLAG,
          isBindKey = bitmask & WRAP_BIND_KEY_FLAG,
          isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG),
          isFlip = bitmask & WRAP_FLIP_FLAG,
          Ctor = isBindKey ? undefined$1 : createCtor(func);
        function wrapper() {
          var length = arguments.length,
            args = Array(length),
            index = length;
          while (index--) {
            args[index] = arguments[index];
          }
          if (isCurried) {
            var placeholder = getHolder(wrapper),
              holdersCount = countHolders(args, placeholder);
          }
          if (partials) {
            args = composeArgs(args, partials, holders, isCurried);
          }
          if (partialsRight) {
            args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
          }
          length -= holdersCount;
          if (isCurried && length < arity) {
            var newHolders = replaceHolders(args, placeholder);
            return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, thisArg, args, newHolders, argPos, ary, arity - length);
          }
          var thisBinding = isBind ? thisArg : this,
            fn = isBindKey ? thisBinding[func] : func;
          length = args.length;
          if (argPos) {
            args = reorder(args, argPos);
          } else if (isFlip && length > 1) {
            args.reverse();
          }
          if (isAry && ary < length) {
            args.length = ary;
          }
          if (this && this !== root && this instanceof wrapper) {
            fn = Ctor || createCtor(fn);
          }
          return fn.apply(thisBinding, args);
        }
        return wrapper;
      }
      function createInverter(setter, toIteratee) {
        return function (object, iteratee) {
          return baseInverter(object, setter, toIteratee(iteratee), {});
        };
      }
      function createMathOperation(operator, defaultValue) {
        return function (value, other) {
          var result;
          if (value === undefined$1 && other === undefined$1) {
            return defaultValue;
          }
          if (value !== undefined$1) {
            result = value;
          }
          if (other !== undefined$1) {
            if (result === undefined$1) {
              return other;
            }
            if (typeof value == 'string' || typeof other == 'string') {
              value = baseToString(value);
              other = baseToString(other);
            } else {
              value = baseToNumber(value);
              other = baseToNumber(other);
            }
            result = operator(value, other);
          }
          return result;
        };
      }
      function createOver(arrayFunc) {
        return flatRest(function (iteratees) {
          iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
          return baseRest(function (args) {
            var thisArg = this;
            return arrayFunc(iteratees, function (iteratee) {
              return apply(iteratee, thisArg, args);
            });
          });
        });
      }
      function createPadding(length, chars) {
        chars = chars === undefined$1 ? ' ' : baseToString(chars);
        var charsLength = chars.length;
        if (charsLength < 2) {
          return charsLength ? baseRepeat(chars, length) : chars;
        }
        var result = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
        return hasUnicode(chars) ? castSlice(stringToArray(result), 0, length).join('') : result.slice(0, length);
      }
      function createPartial(func, bitmask, thisArg, partials) {
        var isBind = bitmask & WRAP_BIND_FLAG,
          Ctor = createCtor(func);
        function wrapper() {
          var argsIndex = -1,
            argsLength = arguments.length,
            leftIndex = -1,
            leftLength = partials.length,
            args = Array(leftLength + argsLength),
            fn = this && this !== root && this instanceof wrapper ? Ctor : func;
          while (++leftIndex < leftLength) {
            args[leftIndex] = partials[leftIndex];
          }
          while (argsLength--) {
            args[leftIndex++] = arguments[++argsIndex];
          }
          return apply(fn, isBind ? thisArg : this, args);
        }
        return wrapper;
      }
      function createRange(fromRight) {
        return function (start, end, step) {
          if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
            end = step = undefined$1;
          }
          start = toFinite(start);
          if (end === undefined$1) {
            end = start;
            start = 0;
          } else {
            end = toFinite(end);
          }
          step = step === undefined$1 ? start < end ? 1 : -1 : toFinite(step);
          return baseRange(start, end, step, fromRight);
        };
      }
      function createRelationalOperation(operator) {
        return function (value, other) {
          if (!(typeof value == 'string' && typeof other == 'string')) {
            value = toNumber(value);
            other = toNumber(other);
          }
          return operator(value, other);
        };
      }
      function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
        var isCurry = bitmask & WRAP_CURRY_FLAG,
          newHolders = isCurry ? holders : undefined$1,
          newHoldersRight = isCurry ? undefined$1 : holders,
          newPartials = isCurry ? partials : undefined$1,
          newPartialsRight = isCurry ? undefined$1 : partials;
        bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
        bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
        if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
          bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
        }
        var newData = [func, bitmask, thisArg, newPartials, newHolders, newPartialsRight, newHoldersRight, argPos, ary, arity];
        var result = wrapFunc.apply(undefined$1, newData);
        if (isLaziable(func)) {
          setData(result, newData);
        }
        result.placeholder = placeholder;
        return setWrapToString(result, func, bitmask);
      }
      function createRound(methodName) {
        var func = Math[methodName];
        return function (number, precision) {
          number = toNumber(number);
          precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
          if (precision && nativeIsFinite(number)) {
            var pair = (toString(number) + 'e').split('e'),
              value = func(pair[0] + 'e' + (+pair[1] + precision));
            pair = (toString(value) + 'e').split('e');
            return +(pair[0] + 'e' + (+pair[1] - precision));
          }
          return func(number);
        };
      }
      var createSet = !(Set && 1 / setToArray(new Set([, -0]))[1] == INFINITY) ? noop : function (values) {
        return new Set(values);
      };
      function createToPairs(keysFunc) {
        return function (object) {
          var tag = getTag(object);
          if (tag == mapTag) {
            return mapToArray(object);
          }
          if (tag == setTag) {
            return setToPairs(object);
          }
          return baseToPairs(object, keysFunc(object));
        };
      }
      function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
        var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
        if (!isBindKey && typeof func != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        var length = partials ? partials.length : 0;
        if (!length) {
          bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
          partials = holders = undefined$1;
        }
        ary = ary === undefined$1 ? ary : nativeMax(toInteger(ary), 0);
        arity = arity === undefined$1 ? arity : toInteger(arity);
        length -= holders ? holders.length : 0;
        if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
          var partialsRight = partials,
            holdersRight = holders;
          partials = holders = undefined$1;
        }
        var data = isBindKey ? undefined$1 : getData(func);
        var newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];
        if (data) {
          mergeData(newData, data);
        }
        func = newData[0];
        bitmask = newData[1];
        thisArg = newData[2];
        partials = newData[3];
        holders = newData[4];
        arity = newData[9] = newData[9] === undefined$1 ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);
        if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
          bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
        }
        if (!bitmask || bitmask == WRAP_BIND_FLAG) {
          var result = createBind(func, bitmask, thisArg);
        } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
          result = createCurry(func, bitmask, arity);
        } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
          result = createPartial(func, bitmask, thisArg, partials);
        } else {
          result = createHybrid.apply(undefined$1, newData);
        }
        var setter = data ? baseSetData : setData;
        return setWrapToString(setter(result, newData), func, bitmask);
      }
      function customDefaultsAssignIn(objValue, srcValue, key, object) {
        if (objValue === undefined$1 || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
          return srcValue;
        }
        return objValue;
      }
      function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
        if (isObject(objValue) && isObject(srcValue)) {
          stack.set(srcValue, objValue);
          baseMerge(objValue, srcValue, undefined$1, customDefaultsMerge, stack);
          stack['delete'](srcValue);
        }
        return objValue;
      }
      function customOmitClone(value) {
        return isPlainObject(value) ? undefined$1 : value;
      }
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
          seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined$1;
        stack.set(array, other);
        stack.set(other, array);
        while (++index < arrLength) {
          var arrValue = array[index],
            othValue = other[index];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
          }
          if (compared !== undefined$1) {
            if (compared) {
              continue;
            }
            result = false;
            break;
          }
          if (seen) {
            if (!arraySome(other, function (othValue, othIndex) {
              if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
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
      function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
        switch (tag) {
          case dataViewTag:
            if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
              return false;
            }
            object = object.buffer;
            other = other.buffer;
          case arrayBufferTag:
            if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
              return false;
            }
            return true;
          case boolTag:
          case dateTag:
          case numberTag:
            return eq(+object, +other);
          case errorTag:
            return object.name == other.name && object.message == other.message;
          case regexpTag:
          case stringTag:
            return object == other + '';
          case mapTag:
            var convert = mapToArray;
          case setTag:
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
            convert || (convert = setToArray);
            if (object.size != other.size && !isPartial) {
              return false;
            }
            var stacked = stack.get(object);
            if (stacked) {
              return stacked == other;
            }
            bitmask |= COMPARE_UNORDERED_FLAG;
            stack.set(object, other);
            var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
            stack['delete'](object);
            return result;
          case symbolTag:
            if (symbolValueOf) {
              return symbolValueOf.call(object) == symbolValueOf.call(other);
            }
        }
        return false;
      }
      function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
          objProps = getAllKeys(object),
          objLength = objProps.length,
          othProps = getAllKeys(other),
          othLength = othProps.length;
        if (objLength != othLength && !isPartial) {
          return false;
        }
        var index = objLength;
        while (index--) {
          var key = objProps[index];
          if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
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
          if (!(compared === undefined$1 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
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
      function flatRest(func) {
        return setToString(overRest(func, undefined$1, flatten), func + '');
      }
      function getAllKeys(object) {
        return baseGetAllKeys(object, keys, getSymbols);
      }
      function getAllKeysIn(object) {
        return baseGetAllKeys(object, keysIn, getSymbolsIn);
      }
      var getData = !metaMap ? noop : function (func) {
        return metaMap.get(func);
      };
      function getFuncName(func) {
        var result = func.name + '',
          array = realNames[result],
          length = hasOwnProperty.call(realNames, result) ? array.length : 0;
        while (length--) {
          var data = array[length],
            otherFunc = data.func;
          if (otherFunc == null || otherFunc == func) {
            return data.name;
          }
        }
        return result;
      }
      function getHolder(func) {
        var object = hasOwnProperty.call(lodash, 'placeholder') ? lodash : func;
        return object.placeholder;
      }
      function getIteratee() {
        var result = lodash.iteratee || iteratee;
        result = result === iteratee ? baseIteratee : result;
        return arguments.length ? result(arguments[0], arguments[1]) : result;
      }
      function getMapData(map, key) {
        var data = map.__data__;
        return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
      }
      function getMatchData(object) {
        var result = keys(object),
          length = result.length;
        while (length--) {
          var key = result[length],
            value = object[key];
          result[length] = [key, value, isStrictComparable(value)];
        }
        return result;
      }
      function getNative(object, key) {
        var value = getValue(object, key);
        return baseIsNative(value) ? value : undefined$1;
      }
      function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag),
          tag = value[symToStringTag];
        try {
          value[symToStringTag] = undefined$1;
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
      var getSymbols = !nativeGetSymbols ? stubArray : function (object) {
        if (object == null) {
          return [];
        }
        object = Object(object);
        return arrayFilter(nativeGetSymbols(object), function (symbol) {
          return propertyIsEnumerable.call(object, symbol);
        });
      };
      var getSymbolsIn = !nativeGetSymbols ? stubArray : function (object) {
        var result = [];
        while (object) {
          arrayPush(result, getSymbols(object));
          object = getPrototype(object);
        }
        return result;
      };
      var getTag = baseGetTag;
      if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
        getTag = function (value) {
          var result = baseGetTag(value),
            Ctor = result == objectTag ? value.constructor : undefined$1,
            ctorString = Ctor ? toSource(Ctor) : '';
          if (ctorString) {
            switch (ctorString) {
              case dataViewCtorString:
                return dataViewTag;
              case mapCtorString:
                return mapTag;
              case promiseCtorString:
                return promiseTag;
              case setCtorString:
                return setTag;
              case weakMapCtorString:
                return weakMapTag;
            }
          }
          return result;
        };
      }
      function getView(start, end, transforms) {
        var index = -1,
          length = transforms.length;
        while (++index < length) {
          var data = transforms[index],
            size = data.size;
          switch (data.type) {
            case 'drop':
              start += size;
              break;
            case 'dropRight':
              end -= size;
              break;
            case 'take':
              end = nativeMin(end, start + size);
              break;
            case 'takeRight':
              start = nativeMax(start, end - size);
              break;
          }
        }
        return {
          'start': start,
          'end': end
        };
      }
      function getWrapDetails(source) {
        var match = source.match(reWrapDetails);
        return match ? match[1].split(reSplitDetails) : [];
      }
      function hasPath(object, path, hasFunc) {
        path = castPath(path, object);
        var index = -1,
          length = path.length,
          result = false;
        while (++index < length) {
          var key = toKey(path[index]);
          if (!(result = object != null && hasFunc(object, key))) {
            break;
          }
          object = object[key];
        }
        if (result || ++index != length) {
          return result;
        }
        length = object == null ? 0 : object.length;
        return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
      }
      function initCloneArray(array) {
        var length = array.length,
          result = new array.constructor(length);
        if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
          result.index = array.index;
          result.input = array.input;
        }
        return result;
      }
      function initCloneObject(object) {
        return typeof object.constructor == 'function' && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
      }
      function initCloneByTag(object, tag, isDeep) {
        var Ctor = object.constructor;
        switch (tag) {
          case arrayBufferTag:
            return cloneArrayBuffer(object);
          case boolTag:
          case dateTag:
            return new Ctor(+object);
          case dataViewTag:
            return cloneDataView(object, isDeep);
          case float32Tag:
          case float64Tag:
          case int8Tag:
          case int16Tag:
          case int32Tag:
          case uint8Tag:
          case uint8ClampedTag:
          case uint16Tag:
          case uint32Tag:
            return cloneTypedArray(object, isDeep);
          case mapTag:
            return new Ctor();
          case numberTag:
          case stringTag:
            return new Ctor(object);
          case regexpTag:
            return cloneRegExp(object);
          case setTag:
            return new Ctor();
          case symbolTag:
            return cloneSymbol(object);
        }
      }
      function insertWrapDetails(source, details) {
        var length = details.length;
        if (!length) {
          return source;
        }
        var lastIndex = length - 1;
        details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
        details = details.join(length > 2 ? ', ' : ' ');
        return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
      }
      function isFlattenable(value) {
        return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
      }
      function isIndex(value, length) {
        var type = typeof value;
        length = length == null ? MAX_SAFE_INTEGER : length;
        return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
      }
      function isIterateeCall(value, index, object) {
        if (!isObject(object)) {
          return false;
        }
        var type = typeof index;
        if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
          return eq(object[index], value);
        }
        return false;
      }
      function isKey(value, object) {
        if (isArray(value)) {
          return false;
        }
        var type = typeof value;
        if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
          return true;
        }
        return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
      }
      function isKeyable(value) {
        var type = typeof value;
        return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
      }
      function isLaziable(func) {
        var funcName = getFuncName(func),
          other = lodash[funcName];
        if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
          return false;
        }
        if (func === other) {
          return true;
        }
        var data = getData(other);
        return !!data && func === data[0];
      }
      function isMasked(func) {
        return !!maskSrcKey && maskSrcKey in func;
      }
      var isMaskable = coreJsData ? isFunction : stubFalse;
      function isPrototype(value) {
        var Ctor = value && value.constructor,
          proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;
        return value === proto;
      }
      function isStrictComparable(value) {
        return value === value && !isObject(value);
      }
      function matchesStrictComparable(key, srcValue) {
        return function (object) {
          if (object == null) {
            return false;
          }
          return object[key] === srcValue && (srcValue !== undefined$1 || key in Object(object));
        };
      }
      function memoizeCapped(func) {
        var result = memoize(func, function (key) {
          if (cache.size === MAX_MEMOIZE_SIZE) {
            cache.clear();
          }
          return key;
        });
        var cache = result.cache;
        return result;
      }
      function mergeData(data, source) {
        var bitmask = data[1],
          srcBitmask = source[1],
          newBitmask = bitmask | srcBitmask,
          isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
        var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
        if (!(isCommon || isCombo)) {
          return data;
        }
        if (srcBitmask & WRAP_BIND_FLAG) {
          data[2] = source[2];
          newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
        }
        var value = source[3];
        if (value) {
          var partials = data[3];
          data[3] = partials ? composeArgs(partials, value, source[4]) : value;
          data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
        }
        value = source[5];
        if (value) {
          partials = data[5];
          data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
          data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
        }
        value = source[7];
        if (value) {
          data[7] = value;
        }
        if (srcBitmask & WRAP_ARY_FLAG) {
          data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
        }
        if (data[9] == null) {
          data[9] = source[9];
        }
        data[0] = source[0];
        data[1] = newBitmask;
        return data;
      }
      function nativeKeysIn(object) {
        var result = [];
        if (object != null) {
          for (var key in Object(object)) {
            result.push(key);
          }
        }
        return result;
      }
      function objectToString(value) {
        return nativeObjectToString.call(value);
      }
      function overRest(func, start, transform) {
        start = nativeMax(start === undefined$1 ? func.length - 1 : start, 0);
        return function () {
          var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            array = Array(length);
          while (++index < length) {
            array[index] = args[start + index];
          }
          index = -1;
          var otherArgs = Array(start + 1);
          while (++index < start) {
            otherArgs[index] = args[index];
          }
          otherArgs[start] = transform(array);
          return apply(func, this, otherArgs);
        };
      }
      function parent(object, path) {
        return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
      }
      function reorder(array, indexes) {
        var arrLength = array.length,
          length = nativeMin(indexes.length, arrLength),
          oldArray = copyArray(array);
        while (length--) {
          var index = indexes[length];
          array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined$1;
        }
        return array;
      }
      function safeGet(object, key) {
        if (key === 'constructor' && typeof object[key] === 'function') {
          return;
        }
        if (key == '__proto__') {
          return;
        }
        return object[key];
      }
      var setData = shortOut(baseSetData);
      var setTimeout = ctxSetTimeout || function (func, wait) {
        return root.setTimeout(func, wait);
      };
      var setToString = shortOut(baseSetToString);
      function setWrapToString(wrapper, reference, bitmask) {
        var source = reference + '';
        return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
      }
      function shortOut(func) {
        var count = 0,
          lastCalled = 0;
        return function () {
          var stamp = nativeNow(),
            remaining = HOT_SPAN - (stamp - lastCalled);
          lastCalled = stamp;
          if (remaining > 0) {
            if (++count >= HOT_COUNT) {
              return arguments[0];
            }
          } else {
            count = 0;
          }
          return func.apply(undefined$1, arguments);
        };
      }
      function shuffleSelf(array, size) {
        var index = -1,
          length = array.length,
          lastIndex = length - 1;
        size = size === undefined$1 ? length : size;
        while (++index < size) {
          var rand = baseRandom(index, lastIndex),
            value = array[rand];
          array[rand] = array[index];
          array[index] = value;
        }
        array.length = size;
        return array;
      }
      var stringToPath = memoizeCapped(function (string) {
        var result = [];
        if (string.charCodeAt(0) === 46) {
          result.push('');
        }
        string.replace(rePropName, function (match, number, quote, subString) {
          result.push(quote ? subString.replace(reEscapeChar, '$1') : number || match);
        });
        return result;
      });
      function toKey(value) {
        if (typeof value == 'string' || isSymbol(value)) {
          return value;
        }
        var result = value + '';
        return result == '0' && 1 / value == -INFINITY ? '-0' : result;
      }
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
      function updateWrapDetails(details, bitmask) {
        arrayEach(wrapFlags, function (pair) {
          var value = '_.' + pair[0];
          if (bitmask & pair[1] && !arrayIncludes(details, value)) {
            details.push(value);
          }
        });
        return details.sort();
      }
      function wrapperClone(wrapper) {
        if (wrapper instanceof LazyWrapper) {
          return wrapper.clone();
        }
        var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
        result.__actions__ = copyArray(wrapper.__actions__);
        result.__index__ = wrapper.__index__;
        result.__values__ = wrapper.__values__;
        return result;
      }
      function chunk(array, size, guard) {
        if (guard ? isIterateeCall(array, size, guard) : size === undefined$1) {
          size = 1;
        } else {
          size = nativeMax(toInteger(size), 0);
        }
        var length = array == null ? 0 : array.length;
        if (!length || size < 1) {
          return [];
        }
        var index = 0,
          resIndex = 0,
          result = Array(nativeCeil(length / size));
        while (index < length) {
          result[resIndex++] = baseSlice(array, index, index += size);
        }
        return result;
      }
      function compact(array) {
        var index = -1,
          length = array == null ? 0 : array.length,
          resIndex = 0,
          result = [];
        while (++index < length) {
          var value = array[index];
          if (value) {
            result[resIndex++] = value;
          }
        }
        return result;
      }
      function concat() {
        var length = arguments.length;
        if (!length) {
          return [];
        }
        var args = Array(length - 1),
          array = arguments[0],
          index = length;
        while (index--) {
          args[index - 1] = arguments[index];
        }
        return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
      }
      var difference = baseRest(function (array, values) {
        return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true)) : [];
      });
      var differenceBy = baseRest(function (array, values) {
        var iteratee = last(values);
        if (isArrayLikeObject(iteratee)) {
          iteratee = undefined$1;
        }
        return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), getIteratee(iteratee, 2)) : [];
      });
      var differenceWith = baseRest(function (array, values) {
        var comparator = last(values);
        if (isArrayLikeObject(comparator)) {
          comparator = undefined$1;
        }
        return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), undefined$1, comparator) : [];
      });
      function drop(array, n, guard) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        n = guard || n === undefined$1 ? 1 : toInteger(n);
        return baseSlice(array, n < 0 ? 0 : n, length);
      }
      function dropRight(array, n, guard) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        n = guard || n === undefined$1 ? 1 : toInteger(n);
        n = length - n;
        return baseSlice(array, 0, n < 0 ? 0 : n);
      }
      function dropRightWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
      }
      function dropWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
      }
      function fill(array, value, start, end) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
          start = 0;
          end = length;
        }
        return baseFill(array, value, start, end);
      }
      function findIndex(array, predicate, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = fromIndex == null ? 0 : toInteger(fromIndex);
        if (index < 0) {
          index = nativeMax(length + index, 0);
        }
        return baseFindIndex(array, getIteratee(predicate, 3), index);
      }
      function findLastIndex(array, predicate, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = length - 1;
        if (fromIndex !== undefined$1) {
          index = toInteger(fromIndex);
          index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
        }
        return baseFindIndex(array, getIteratee(predicate, 3), index, true);
      }
      function flatten(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseFlatten(array, 1) : [];
      }
      function flattenDeep(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseFlatten(array, INFINITY) : [];
      }
      function flattenDepth(array, depth) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        depth = depth === undefined$1 ? 1 : toInteger(depth);
        return baseFlatten(array, depth);
      }
      function fromPairs(pairs) {
        var index = -1,
          length = pairs == null ? 0 : pairs.length,
          result = {};
        while (++index < length) {
          var pair = pairs[index];
          result[pair[0]] = pair[1];
        }
        return result;
      }
      function head(array) {
        return array && array.length ? array[0] : undefined$1;
      }
      function indexOf(array, value, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = fromIndex == null ? 0 : toInteger(fromIndex);
        if (index < 0) {
          index = nativeMax(length + index, 0);
        }
        return baseIndexOf(array, value, index);
      }
      function initial(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseSlice(array, 0, -1) : [];
      }
      var intersection = baseRest(function (arrays) {
        var mapped = arrayMap(arrays, castArrayLikeObject);
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
      });
      var intersectionBy = baseRest(function (arrays) {
        var iteratee = last(arrays),
          mapped = arrayMap(arrays, castArrayLikeObject);
        if (iteratee === last(mapped)) {
          iteratee = undefined$1;
        } else {
          mapped.pop();
        }
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee, 2)) : [];
      });
      var intersectionWith = baseRest(function (arrays) {
        var comparator = last(arrays),
          mapped = arrayMap(arrays, castArrayLikeObject);
        comparator = typeof comparator == 'function' ? comparator : undefined$1;
        if (comparator) {
          mapped.pop();
        }
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined$1, comparator) : [];
      });
      function join(array, separator) {
        return array == null ? '' : nativeJoin.call(array, separator);
      }
      function last(array) {
        var length = array == null ? 0 : array.length;
        return length ? array[length - 1] : undefined$1;
      }
      function lastIndexOf(array, value, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = length;
        if (fromIndex !== undefined$1) {
          index = toInteger(fromIndex);
          index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
        }
        return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
      }
      function nth(array, n) {
        return array && array.length ? baseNth(array, toInteger(n)) : undefined$1;
      }
      var pull = baseRest(pullAll);
      function pullAll(array, values) {
        return array && array.length && values && values.length ? basePullAll(array, values) : array;
      }
      function pullAllBy(array, values, iteratee) {
        return array && array.length && values && values.length ? basePullAll(array, values, getIteratee(iteratee, 2)) : array;
      }
      function pullAllWith(array, values, comparator) {
        return array && array.length && values && values.length ? basePullAll(array, values, undefined$1, comparator) : array;
      }
      var pullAt = flatRest(function (array, indexes) {
        var length = array == null ? 0 : array.length,
          result = baseAt(array, indexes);
        basePullAt(array, arrayMap(indexes, function (index) {
          return isIndex(index, length) ? +index : index;
        }).sort(compareAscending));
        return result;
      });
      function remove(array, predicate) {
        var result = [];
        if (!(array && array.length)) {
          return result;
        }
        var index = -1,
          indexes = [],
          length = array.length;
        predicate = getIteratee(predicate, 3);
        while (++index < length) {
          var value = array[index];
          if (predicate(value, index, array)) {
            result.push(value);
            indexes.push(index);
          }
        }
        basePullAt(array, indexes);
        return result;
      }
      function reverse(array) {
        return array == null ? array : nativeReverse.call(array);
      }
      function slice(array, start, end) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
          start = 0;
          end = length;
        } else {
          start = start == null ? 0 : toInteger(start);
          end = end === undefined$1 ? length : toInteger(end);
        }
        return baseSlice(array, start, end);
      }
      function sortedIndex(array, value) {
        return baseSortedIndex(array, value);
      }
      function sortedIndexBy(array, value, iteratee) {
        return baseSortedIndexBy(array, value, getIteratee(iteratee, 2));
      }
      function sortedIndexOf(array, value) {
        var length = array == null ? 0 : array.length;
        if (length) {
          var index = baseSortedIndex(array, value);
          if (index < length && eq(array[index], value)) {
            return index;
          }
        }
        return -1;
      }
      function sortedLastIndex(array, value) {
        return baseSortedIndex(array, value, true);
      }
      function sortedLastIndexBy(array, value, iteratee) {
        return baseSortedIndexBy(array, value, getIteratee(iteratee, 2), true);
      }
      function sortedLastIndexOf(array, value) {
        var length = array == null ? 0 : array.length;
        if (length) {
          var index = baseSortedIndex(array, value, true) - 1;
          if (eq(array[index], value)) {
            return index;
          }
        }
        return -1;
      }
      function sortedUniq(array) {
        return array && array.length ? baseSortedUniq(array) : [];
      }
      function sortedUniqBy(array, iteratee) {
        return array && array.length ? baseSortedUniq(array, getIteratee(iteratee, 2)) : [];
      }
      function tail(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseSlice(array, 1, length) : [];
      }
      function take(array, n, guard) {
        if (!(array && array.length)) {
          return [];
        }
        n = guard || n === undefined$1 ? 1 : toInteger(n);
        return baseSlice(array, 0, n < 0 ? 0 : n);
      }
      function takeRight(array, n, guard) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        n = guard || n === undefined$1 ? 1 : toInteger(n);
        n = length - n;
        return baseSlice(array, n < 0 ? 0 : n, length);
      }
      function takeRightWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
      }
      function takeWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
      }
      var union = baseRest(function (arrays) {
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
      });
      var unionBy = baseRest(function (arrays) {
        var iteratee = last(arrays);
        if (isArrayLikeObject(iteratee)) {
          iteratee = undefined$1;
        }
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee, 2));
      });
      var unionWith = baseRest(function (arrays) {
        var comparator = last(arrays);
        comparator = typeof comparator == 'function' ? comparator : undefined$1;
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined$1, comparator);
      });
      function uniq(array) {
        return array && array.length ? baseUniq(array) : [];
      }
      function uniqBy(array, iteratee) {
        return array && array.length ? baseUniq(array, getIteratee(iteratee, 2)) : [];
      }
      function uniqWith(array, comparator) {
        comparator = typeof comparator == 'function' ? comparator : undefined$1;
        return array && array.length ? baseUniq(array, undefined$1, comparator) : [];
      }
      function unzip(array) {
        if (!(array && array.length)) {
          return [];
        }
        var length = 0;
        array = arrayFilter(array, function (group) {
          if (isArrayLikeObject(group)) {
            length = nativeMax(group.length, length);
            return true;
          }
        });
        return baseTimes(length, function (index) {
          return arrayMap(array, baseProperty(index));
        });
      }
      function unzipWith(array, iteratee) {
        if (!(array && array.length)) {
          return [];
        }
        var result = unzip(array);
        if (iteratee == null) {
          return result;
        }
        return arrayMap(result, function (group) {
          return apply(iteratee, undefined$1, group);
        });
      }
      var without = baseRest(function (array, values) {
        return isArrayLikeObject(array) ? baseDifference(array, values) : [];
      });
      var xor = baseRest(function (arrays) {
        return baseXor(arrayFilter(arrays, isArrayLikeObject));
      });
      var xorBy = baseRest(function (arrays) {
        var iteratee = last(arrays);
        if (isArrayLikeObject(iteratee)) {
          iteratee = undefined$1;
        }
        return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee, 2));
      });
      var xorWith = baseRest(function (arrays) {
        var comparator = last(arrays);
        comparator = typeof comparator == 'function' ? comparator : undefined$1;
        return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined$1, comparator);
      });
      var zip = baseRest(unzip);
      function zipObject(props, values) {
        return baseZipObject(props || [], values || [], assignValue);
      }
      function zipObjectDeep(props, values) {
        return baseZipObject(props || [], values || [], baseSet);
      }
      var zipWith = baseRest(function (arrays) {
        var length = arrays.length,
          iteratee = length > 1 ? arrays[length - 1] : undefined$1;
        iteratee = typeof iteratee == 'function' ? (arrays.pop(), iteratee) : undefined$1;
        return unzipWith(arrays, iteratee);
      });
      function chain(value) {
        var result = lodash(value);
        result.__chain__ = true;
        return result;
      }
      function tap(value, interceptor) {
        interceptor(value);
        return value;
      }
      function thru(value, interceptor) {
        return interceptor(value);
      }
      var wrapperAt = flatRest(function (paths) {
        var length = paths.length,
          start = length ? paths[0] : 0,
          value = this.__wrapped__,
          interceptor = function (object) {
            return baseAt(object, paths);
          };
        if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
          return this.thru(interceptor);
        }
        value = value.slice(start, +start + (length ? 1 : 0));
        value.__actions__.push({
          'func': thru,
          'args': [interceptor],
          'thisArg': undefined$1
        });
        return new LodashWrapper(value, this.__chain__).thru(function (array) {
          if (length && !array.length) {
            array.push(undefined$1);
          }
          return array;
        });
      });
      function wrapperChain() {
        return chain(this);
      }
      function wrapperCommit() {
        return new LodashWrapper(this.value(), this.__chain__);
      }
      function wrapperNext() {
        if (this.__values__ === undefined$1) {
          this.__values__ = toArray(this.value());
        }
        var done = this.__index__ >= this.__values__.length,
          value = done ? undefined$1 : this.__values__[this.__index__++];
        return {
          'done': done,
          'value': value
        };
      }
      function wrapperToIterator() {
        return this;
      }
      function wrapperPlant(value) {
        var result,
          parent = this;
        while (parent instanceof baseLodash) {
          var clone = wrapperClone(parent);
          clone.__index__ = 0;
          clone.__values__ = undefined$1;
          if (result) {
            previous.__wrapped__ = clone;
          } else {
            result = clone;
          }
          var previous = clone;
          parent = parent.__wrapped__;
        }
        previous.__wrapped__ = value;
        return result;
      }
      function wrapperReverse() {
        var value = this.__wrapped__;
        if (value instanceof LazyWrapper) {
          var wrapped = value;
          if (this.__actions__.length) {
            wrapped = new LazyWrapper(this);
          }
          wrapped = wrapped.reverse();
          wrapped.__actions__.push({
            'func': thru,
            'args': [reverse],
            'thisArg': undefined$1
          });
          return new LodashWrapper(wrapped, this.__chain__);
        }
        return this.thru(reverse);
      }
      function wrapperValue() {
        return baseWrapperValue(this.__wrapped__, this.__actions__);
      }
      var countBy = createAggregator(function (result, value, key) {
        if (hasOwnProperty.call(result, key)) {
          ++result[key];
        } else {
          baseAssignValue(result, key, 1);
        }
      });
      function every(collection, predicate, guard) {
        var func = isArray(collection) ? arrayEvery : baseEvery;
        if (guard && isIterateeCall(collection, predicate, guard)) {
          predicate = undefined$1;
        }
        return func(collection, getIteratee(predicate, 3));
      }
      function filter(collection, predicate) {
        var func = isArray(collection) ? arrayFilter : baseFilter;
        return func(collection, getIteratee(predicate, 3));
      }
      var find = createFind(findIndex);
      var findLast = createFind(findLastIndex);
      function flatMap(collection, iteratee) {
        return baseFlatten(map(collection, iteratee), 1);
      }
      function flatMapDeep(collection, iteratee) {
        return baseFlatten(map(collection, iteratee), INFINITY);
      }
      function flatMapDepth(collection, iteratee, depth) {
        depth = depth === undefined$1 ? 1 : toInteger(depth);
        return baseFlatten(map(collection, iteratee), depth);
      }
      function forEach(collection, iteratee) {
        var func = isArray(collection) ? arrayEach : baseEach;
        return func(collection, getIteratee(iteratee, 3));
      }
      function forEachRight(collection, iteratee) {
        var func = isArray(collection) ? arrayEachRight : baseEachRight;
        return func(collection, getIteratee(iteratee, 3));
      }
      var groupBy = createAggregator(function (result, value, key) {
        if (hasOwnProperty.call(result, key)) {
          result[key].push(value);
        } else {
          baseAssignValue(result, key, [value]);
        }
      });
      function includes(collection, value, fromIndex, guard) {
        collection = isArrayLike(collection) ? collection : values(collection);
        fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
        var length = collection.length;
        if (fromIndex < 0) {
          fromIndex = nativeMax(length + fromIndex, 0);
        }
        return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
      }
      var invokeMap = baseRest(function (collection, path, args) {
        var index = -1,
          isFunc = typeof path == 'function',
          result = isArrayLike(collection) ? Array(collection.length) : [];
        baseEach(collection, function (value) {
          result[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
        });
        return result;
      });
      var keyBy = createAggregator(function (result, value, key) {
        baseAssignValue(result, key, value);
      });
      function map(collection, iteratee) {
        var func = isArray(collection) ? arrayMap : baseMap;
        return func(collection, getIteratee(iteratee, 3));
      }
      function orderBy(collection, iteratees, orders, guard) {
        if (collection == null) {
          return [];
        }
        if (!isArray(iteratees)) {
          iteratees = iteratees == null ? [] : [iteratees];
        }
        orders = guard ? undefined$1 : orders;
        if (!isArray(orders)) {
          orders = orders == null ? [] : [orders];
        }
        return baseOrderBy(collection, iteratees, orders);
      }
      var partition = createAggregator(function (result, value, key) {
        result[key ? 0 : 1].push(value);
      }, function () {
        return [[], []];
      });
      function reduce(collection, iteratee, accumulator) {
        var func = isArray(collection) ? arrayReduce : baseReduce,
          initAccum = arguments.length < 3;
        return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEach);
      }
      function reduceRight(collection, iteratee, accumulator) {
        var func = isArray(collection) ? arrayReduceRight : baseReduce,
          initAccum = arguments.length < 3;
        return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEachRight);
      }
      function reject(collection, predicate) {
        var func = isArray(collection) ? arrayFilter : baseFilter;
        return func(collection, negate(getIteratee(predicate, 3)));
      }
      function sample(collection) {
        var func = isArray(collection) ? arraySample : baseSample;
        return func(collection);
      }
      function sampleSize(collection, n, guard) {
        if (guard ? isIterateeCall(collection, n, guard) : n === undefined$1) {
          n = 1;
        } else {
          n = toInteger(n);
        }
        var func = isArray(collection) ? arraySampleSize : baseSampleSize;
        return func(collection, n);
      }
      function shuffle(collection) {
        var func = isArray(collection) ? arrayShuffle : baseShuffle;
        return func(collection);
      }
      function size(collection) {
        if (collection == null) {
          return 0;
        }
        if (isArrayLike(collection)) {
          return isString(collection) ? stringSize(collection) : collection.length;
        }
        var tag = getTag(collection);
        if (tag == mapTag || tag == setTag) {
          return collection.size;
        }
        return baseKeys(collection).length;
      }
      function some(collection, predicate, guard) {
        var func = isArray(collection) ? arraySome : baseSome;
        if (guard && isIterateeCall(collection, predicate, guard)) {
          predicate = undefined$1;
        }
        return func(collection, getIteratee(predicate, 3));
      }
      var sortBy = baseRest(function (collection, iteratees) {
        if (collection == null) {
          return [];
        }
        var length = iteratees.length;
        if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
          iteratees = [];
        } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
          iteratees = [iteratees[0]];
        }
        return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
      });
      var now = ctxNow || function () {
        return root.Date.now();
      };
      function after(n, func) {
        if (typeof func != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        n = toInteger(n);
        return function () {
          if (--n < 1) {
            return func.apply(this, arguments);
          }
        };
      }
      function ary(func, n, guard) {
        n = guard ? undefined$1 : n;
        n = func && n == null ? func.length : n;
        return createWrap(func, WRAP_ARY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, n);
      }
      function before(n, func) {
        var result;
        if (typeof func != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        n = toInteger(n);
        return function () {
          if (--n > 0) {
            result = func.apply(this, arguments);
          }
          if (n <= 1) {
            func = undefined$1;
          }
          return result;
        };
      }
      var bind = baseRest(function (func, thisArg, partials) {
        var bitmask = WRAP_BIND_FLAG;
        if (partials.length) {
          var holders = replaceHolders(partials, getHolder(bind));
          bitmask |= WRAP_PARTIAL_FLAG;
        }
        return createWrap(func, bitmask, thisArg, partials, holders);
      });
      var bindKey = baseRest(function (object, key, partials) {
        var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
        if (partials.length) {
          var holders = replaceHolders(partials, getHolder(bindKey));
          bitmask |= WRAP_PARTIAL_FLAG;
        }
        return createWrap(key, bitmask, object, partials, holders);
      });
      function curry(func, arity, guard) {
        arity = guard ? undefined$1 : arity;
        var result = createWrap(func, WRAP_CURRY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
        result.placeholder = curry.placeholder;
        return result;
      }
      function curryRight(func, arity, guard) {
        arity = guard ? undefined$1 : arity;
        var result = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
        result.placeholder = curryRight.placeholder;
        return result;
      }
      function debounce(func, wait, options) {
        var lastArgs,
          lastThis,
          maxWait,
          result,
          timerId,
          lastCallTime,
          lastInvokeTime = 0,
          leading = false,
          maxing = false,
          trailing = true;
        if (typeof func != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        wait = toNumber(wait) || 0;
        if (isObject(options)) {
          leading = !!options.leading;
          maxing = 'maxWait' in options;
          maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
          trailing = 'trailing' in options ? !!options.trailing : trailing;
        }
        function invokeFunc(time) {
          var args = lastArgs,
            thisArg = lastThis;
          lastArgs = lastThis = undefined$1;
          lastInvokeTime = time;
          result = func.apply(thisArg, args);
          return result;
        }
        function leadingEdge(time) {
          lastInvokeTime = time;
          timerId = setTimeout(timerExpired, wait);
          return leading ? invokeFunc(time) : result;
        }
        function remainingWait(time) {
          var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime,
            timeWaiting = wait - timeSinceLastCall;
          return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
        }
        function shouldInvoke(time) {
          var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime;
          return lastCallTime === undefined$1 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
        }
        function timerExpired() {
          var time = now();
          if (shouldInvoke(time)) {
            return trailingEdge(time);
          }
          timerId = setTimeout(timerExpired, remainingWait(time));
        }
        function trailingEdge(time) {
          timerId = undefined$1;
          if (trailing && lastArgs) {
            return invokeFunc(time);
          }
          lastArgs = lastThis = undefined$1;
          return result;
        }
        function cancel() {
          if (timerId !== undefined$1) {
            clearTimeout(timerId);
          }
          lastInvokeTime = 0;
          lastArgs = lastCallTime = lastThis = timerId = undefined$1;
        }
        function flush() {
          return timerId === undefined$1 ? result : trailingEdge(now());
        }
        function debounced() {
          var time = now(),
            isInvoking = shouldInvoke(time);
          lastArgs = arguments;
          lastThis = this;
          lastCallTime = time;
          if (isInvoking) {
            if (timerId === undefined$1) {
              return leadingEdge(lastCallTime);
            }
            if (maxing) {
              clearTimeout(timerId);
              timerId = setTimeout(timerExpired, wait);
              return invokeFunc(lastCallTime);
            }
          }
          if (timerId === undefined$1) {
            timerId = setTimeout(timerExpired, wait);
          }
          return result;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
      }
      var defer = baseRest(function (func, args) {
        return baseDelay(func, 1, args);
      });
      var delay = baseRest(function (func, wait, args) {
        return baseDelay(func, toNumber(wait) || 0, args);
      });
      function flip(func) {
        return createWrap(func, WRAP_FLIP_FLAG);
      }
      function memoize(func, resolver) {
        if (typeof func != 'function' || resolver != null && typeof resolver != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        var memoized = function () {
          var args = arguments,
            key = resolver ? resolver.apply(this, args) : args[0],
            cache = memoized.cache;
          if (cache.has(key)) {
            return cache.get(key);
          }
          var result = func.apply(this, args);
          memoized.cache = cache.set(key, result) || cache;
          return result;
        };
        memoized.cache = new (memoize.Cache || MapCache)();
        return memoized;
      }
      memoize.Cache = MapCache;
      function negate(predicate) {
        if (typeof predicate != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        return function () {
          var args = arguments;
          switch (args.length) {
            case 0:
              return !predicate.call(this);
            case 1:
              return !predicate.call(this, args[0]);
            case 2:
              return !predicate.call(this, args[0], args[1]);
            case 3:
              return !predicate.call(this, args[0], args[1], args[2]);
          }
          return !predicate.apply(this, args);
        };
      }
      function once(func) {
        return before(2, func);
      }
      var overArgs = castRest(function (func, transforms) {
        transforms = transforms.length == 1 && isArray(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
        var funcsLength = transforms.length;
        return baseRest(function (args) {
          var index = -1,
            length = nativeMin(args.length, funcsLength);
          while (++index < length) {
            args[index] = transforms[index].call(this, args[index]);
          }
          return apply(func, this, args);
        });
      });
      var partial = baseRest(function (func, partials) {
        var holders = replaceHolders(partials, getHolder(partial));
        return createWrap(func, WRAP_PARTIAL_FLAG, undefined$1, partials, holders);
      });
      var partialRight = baseRest(function (func, partials) {
        var holders = replaceHolders(partials, getHolder(partialRight));
        return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined$1, partials, holders);
      });
      var rearg = flatRest(function (func, indexes) {
        return createWrap(func, WRAP_REARG_FLAG, undefined$1, undefined$1, undefined$1, indexes);
      });
      function rest(func, start) {
        if (typeof func != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        start = start === undefined$1 ? start : toInteger(start);
        return baseRest(func, start);
      }
      function spread(func, start) {
        if (typeof func != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        start = start == null ? 0 : nativeMax(toInteger(start), 0);
        return baseRest(function (args) {
          var array = args[start],
            otherArgs = castSlice(args, 0, start);
          if (array) {
            arrayPush(otherArgs, array);
          }
          return apply(func, this, otherArgs);
        });
      }
      function throttle(func, wait, options) {
        var leading = true,
          trailing = true;
        if (typeof func != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        if (isObject(options)) {
          leading = 'leading' in options ? !!options.leading : leading;
          trailing = 'trailing' in options ? !!options.trailing : trailing;
        }
        return debounce(func, wait, {
          'leading': leading,
          'maxWait': wait,
          'trailing': trailing
        });
      }
      function unary(func) {
        return ary(func, 1);
      }
      function wrap(value, wrapper) {
        return partial(castFunction(wrapper), value);
      }
      function castArray() {
        if (!arguments.length) {
          return [];
        }
        var value = arguments[0];
        return isArray(value) ? value : [value];
      }
      function clone(value) {
        return baseClone(value, CLONE_SYMBOLS_FLAG);
      }
      function cloneWith(value, customizer) {
        customizer = typeof customizer == 'function' ? customizer : undefined$1;
        return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
      }
      function cloneDeep(value) {
        return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
      }
      function cloneDeepWith(value, customizer) {
        customizer = typeof customizer == 'function' ? customizer : undefined$1;
        return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
      }
      function conformsTo(object, source) {
        return source == null || baseConformsTo(object, source, keys(source));
      }
      function eq(value, other) {
        return value === other || value !== value && other !== other;
      }
      var gt = createRelationalOperation(baseGt);
      var gte = createRelationalOperation(function (value, other) {
        return value >= other;
      });
      var isArguments = baseIsArguments(function () {
        return arguments;
      }()) ? baseIsArguments : function (value) {
        return isObjectLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
      };
      var isArray = Array.isArray;
      var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
      function isArrayLike(value) {
        return value != null && isLength(value.length) && !isFunction(value);
      }
      function isArrayLikeObject(value) {
        return isObjectLike(value) && isArrayLike(value);
      }
      function isBoolean(value) {
        return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
      }
      var isBuffer = nativeIsBuffer || stubFalse;
      var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
      function isElement(value) {
        return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
      }
      function isEmpty(value) {
        if (value == null) {
          return true;
        }
        if (isArrayLike(value) && (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
          return !value.length;
        }
        var tag = getTag(value);
        if (tag == mapTag || tag == setTag) {
          return !value.size;
        }
        if (isPrototype(value)) {
          return !baseKeys(value).length;
        }
        for (var key in value) {
          if (hasOwnProperty.call(value, key)) {
            return false;
          }
        }
        return true;
      }
      function isEqual(value, other) {
        return baseIsEqual(value, other);
      }
      function isEqualWith(value, other, customizer) {
        customizer = typeof customizer == 'function' ? customizer : undefined$1;
        var result = customizer ? customizer(value, other) : undefined$1;
        return result === undefined$1 ? baseIsEqual(value, other, undefined$1, customizer) : !!result;
      }
      function isError(value) {
        if (!isObjectLike(value)) {
          return false;
        }
        var tag = baseGetTag(value);
        return tag == errorTag || tag == domExcTag || typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject(value);
      }
      function isFinite(value) {
        return typeof value == 'number' && nativeIsFinite(value);
      }
      function isFunction(value) {
        if (!isObject(value)) {
          return false;
        }
        var tag = baseGetTag(value);
        return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
      }
      function isInteger(value) {
        return typeof value == 'number' && value == toInteger(value);
      }
      function isLength(value) {
        return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
      }
      function isObject(value) {
        var type = typeof value;
        return value != null && (type == 'object' || type == 'function');
      }
      function isObjectLike(value) {
        return value != null && typeof value == 'object';
      }
      var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
      function isMatch(object, source) {
        return object === source || baseIsMatch(object, source, getMatchData(source));
      }
      function isMatchWith(object, source, customizer) {
        customizer = typeof customizer == 'function' ? customizer : undefined$1;
        return baseIsMatch(object, source, getMatchData(source), customizer);
      }
      function isNaN(value) {
        return isNumber(value) && value != +value;
      }
      function isNative(value) {
        if (isMaskable(value)) {
          throw new Error(CORE_ERROR_TEXT);
        }
        return baseIsNative(value);
      }
      function isNull(value) {
        return value === null;
      }
      function isNil(value) {
        return value == null;
      }
      function isNumber(value) {
        return typeof value == 'number' || isObjectLike(value) && baseGetTag(value) == numberTag;
      }
      function isPlainObject(value) {
        if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
          return false;
        }
        var proto = getPrototype(value);
        if (proto === null) {
          return true;
        }
        var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
        return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
      }
      var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
      function isSafeInteger(value) {
        return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
      }
      var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
      function isString(value) {
        return typeof value == 'string' || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
      }
      function isSymbol(value) {
        return typeof value == 'symbol' || isObjectLike(value) && baseGetTag(value) == symbolTag;
      }
      var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
      function isUndefined(value) {
        return value === undefined$1;
      }
      function isWeakMap(value) {
        return isObjectLike(value) && getTag(value) == weakMapTag;
      }
      function isWeakSet(value) {
        return isObjectLike(value) && baseGetTag(value) == weakSetTag;
      }
      var lt = createRelationalOperation(baseLt);
      var lte = createRelationalOperation(function (value, other) {
        return value <= other;
      });
      function toArray(value) {
        if (!value) {
          return [];
        }
        if (isArrayLike(value)) {
          return isString(value) ? stringToArray(value) : copyArray(value);
        }
        if (symIterator && value[symIterator]) {
          return iteratorToArray(value[symIterator]());
        }
        var tag = getTag(value),
          func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
        return func(value);
      }
      function toFinite(value) {
        if (!value) {
          return value === 0 ? value : 0;
        }
        value = toNumber(value);
        if (value === INFINITY || value === -INFINITY) {
          var sign = value < 0 ? -1 : 1;
          return sign * MAX_INTEGER;
        }
        return value === value ? value : 0;
      }
      function toInteger(value) {
        var result = toFinite(value),
          remainder = result % 1;
        return result === result ? remainder ? result - remainder : result : 0;
      }
      function toLength(value) {
        return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
      }
      function toNumber(value) {
        if (typeof value == 'number') {
          return value;
        }
        if (isSymbol(value)) {
          return NAN;
        }
        if (isObject(value)) {
          var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
          value = isObject(other) ? other + '' : other;
        }
        if (typeof value != 'string') {
          return value === 0 ? value : +value;
        }
        value = baseTrim(value);
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
      }
      function toPlainObject(value) {
        return copyObject(value, keysIn(value));
      }
      function toSafeInteger(value) {
        return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
      }
      function toString(value) {
        return value == null ? '' : baseToString(value);
      }
      var assign = createAssigner(function (object, source) {
        if (isPrototype(source) || isArrayLike(source)) {
          copyObject(source, keys(source), object);
          return;
        }
        for (var key in source) {
          if (hasOwnProperty.call(source, key)) {
            assignValue(object, key, source[key]);
          }
        }
      });
      var assignIn = createAssigner(function (object, source) {
        copyObject(source, keysIn(source), object);
      });
      var assignInWith = createAssigner(function (object, source, srcIndex, customizer) {
        copyObject(source, keysIn(source), object, customizer);
      });
      var assignWith = createAssigner(function (object, source, srcIndex, customizer) {
        copyObject(source, keys(source), object, customizer);
      });
      var at = flatRest(baseAt);
      function create(prototype, properties) {
        var result = baseCreate(prototype);
        return properties == null ? result : baseAssign(result, properties);
      }
      var defaults = baseRest(function (object, sources) {
        object = Object(object);
        var index = -1;
        var length = sources.length;
        var guard = length > 2 ? sources[2] : undefined$1;
        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          length = 1;
        }
        while (++index < length) {
          var source = sources[index];
          var props = keysIn(source);
          var propsIndex = -1;
          var propsLength = props.length;
          while (++propsIndex < propsLength) {
            var key = props[propsIndex];
            var value = object[key];
            if (value === undefined$1 || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) {
              object[key] = source[key];
            }
          }
        }
        return object;
      });
      var defaultsDeep = baseRest(function (args) {
        args.push(undefined$1, customDefaultsMerge);
        return apply(mergeWith, undefined$1, args);
      });
      function findKey(object, predicate) {
        return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
      }
      function findLastKey(object, predicate) {
        return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
      }
      function forIn(object, iteratee) {
        return object == null ? object : baseFor(object, getIteratee(iteratee, 3), keysIn);
      }
      function forInRight(object, iteratee) {
        return object == null ? object : baseForRight(object, getIteratee(iteratee, 3), keysIn);
      }
      function forOwn(object, iteratee) {
        return object && baseForOwn(object, getIteratee(iteratee, 3));
      }
      function forOwnRight(object, iteratee) {
        return object && baseForOwnRight(object, getIteratee(iteratee, 3));
      }
      function functions(object) {
        return object == null ? [] : baseFunctions(object, keys(object));
      }
      function functionsIn(object) {
        return object == null ? [] : baseFunctions(object, keysIn(object));
      }
      function get(object, path, defaultValue) {
        var result = object == null ? undefined$1 : baseGet(object, path);
        return result === undefined$1 ? defaultValue : result;
      }
      function has(object, path) {
        return object != null && hasPath(object, path, baseHas);
      }
      function hasIn(object, path) {
        return object != null && hasPath(object, path, baseHasIn);
      }
      var invert = createInverter(function (result, value, key) {
        if (value != null && typeof value.toString != 'function') {
          value = nativeObjectToString.call(value);
        }
        result[value] = key;
      }, constant(identity));
      var invertBy = createInverter(function (result, value, key) {
        if (value != null && typeof value.toString != 'function') {
          value = nativeObjectToString.call(value);
        }
        if (hasOwnProperty.call(result, value)) {
          result[value].push(key);
        } else {
          result[value] = [key];
        }
      }, getIteratee);
      var invoke = baseRest(baseInvoke);
      function keys(object) {
        return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
      }
      function keysIn(object) {
        return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
      }
      function mapKeys(object, iteratee) {
        var result = {};
        iteratee = getIteratee(iteratee, 3);
        baseForOwn(object, function (value, key, object) {
          baseAssignValue(result, iteratee(value, key, object), value);
        });
        return result;
      }
      function mapValues(object, iteratee) {
        var result = {};
        iteratee = getIteratee(iteratee, 3);
        baseForOwn(object, function (value, key, object) {
          baseAssignValue(result, key, iteratee(value, key, object));
        });
        return result;
      }
      var merge = createAssigner(function (object, source, srcIndex) {
        baseMerge(object, source, srcIndex);
      });
      var mergeWith = createAssigner(function (object, source, srcIndex, customizer) {
        baseMerge(object, source, srcIndex, customizer);
      });
      var omit = flatRest(function (object, paths) {
        var result = {};
        if (object == null) {
          return result;
        }
        var isDeep = false;
        paths = arrayMap(paths, function (path) {
          path = castPath(path, object);
          isDeep || (isDeep = path.length > 1);
          return path;
        });
        copyObject(object, getAllKeysIn(object), result);
        if (isDeep) {
          result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
        }
        var length = paths.length;
        while (length--) {
          baseUnset(result, paths[length]);
        }
        return result;
      });
      function omitBy(object, predicate) {
        return pickBy(object, negate(getIteratee(predicate)));
      }
      var pick = flatRest(function (object, paths) {
        return object == null ? {} : basePick(object, paths);
      });
      function pickBy(object, predicate) {
        if (object == null) {
          return {};
        }
        var props = arrayMap(getAllKeysIn(object), function (prop) {
          return [prop];
        });
        predicate = getIteratee(predicate);
        return basePickBy(object, props, function (value, path) {
          return predicate(value, path[0]);
        });
      }
      function result(object, path, defaultValue) {
        path = castPath(path, object);
        var index = -1,
          length = path.length;
        if (!length) {
          length = 1;
          object = undefined$1;
        }
        while (++index < length) {
          var value = object == null ? undefined$1 : object[toKey(path[index])];
          if (value === undefined$1) {
            index = length;
            value = defaultValue;
          }
          object = isFunction(value) ? value.call(object) : value;
        }
        return object;
      }
      function set(object, path, value) {
        return object == null ? object : baseSet(object, path, value);
      }
      function setWith(object, path, value, customizer) {
        customizer = typeof customizer == 'function' ? customizer : undefined$1;
        return object == null ? object : baseSet(object, path, value, customizer);
      }
      var toPairs = createToPairs(keys);
      var toPairsIn = createToPairs(keysIn);
      function transform(object, iteratee, accumulator) {
        var isArr = isArray(object),
          isArrLike = isArr || isBuffer(object) || isTypedArray(object);
        iteratee = getIteratee(iteratee, 4);
        if (accumulator == null) {
          var Ctor = object && object.constructor;
          if (isArrLike) {
            accumulator = isArr ? new Ctor() : [];
          } else if (isObject(object)) {
            accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
          } else {
            accumulator = {};
          }
        }
        (isArrLike ? arrayEach : baseForOwn)(object, function (value, index, object) {
          return iteratee(accumulator, value, index, object);
        });
        return accumulator;
      }
      function unset(object, path) {
        return object == null ? true : baseUnset(object, path);
      }
      function update(object, path, updater) {
        return object == null ? object : baseUpdate(object, path, castFunction(updater));
      }
      function updateWith(object, path, updater, customizer) {
        customizer = typeof customizer == 'function' ? customizer : undefined$1;
        return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
      }
      function values(object) {
        return object == null ? [] : baseValues(object, keys(object));
      }
      function valuesIn(object) {
        return object == null ? [] : baseValues(object, keysIn(object));
      }
      function clamp(number, lower, upper) {
        if (upper === undefined$1) {
          upper = lower;
          lower = undefined$1;
        }
        if (upper !== undefined$1) {
          upper = toNumber(upper);
          upper = upper === upper ? upper : 0;
        }
        if (lower !== undefined$1) {
          lower = toNumber(lower);
          lower = lower === lower ? lower : 0;
        }
        return baseClamp(toNumber(number), lower, upper);
      }
      function inRange(number, start, end) {
        start = toFinite(start);
        if (end === undefined$1) {
          end = start;
          start = 0;
        } else {
          end = toFinite(end);
        }
        number = toNumber(number);
        return baseInRange(number, start, end);
      }
      function random(lower, upper, floating) {
        if (floating && typeof floating != 'boolean' && isIterateeCall(lower, upper, floating)) {
          upper = floating = undefined$1;
        }
        if (floating === undefined$1) {
          if (typeof upper == 'boolean') {
            floating = upper;
            upper = undefined$1;
          } else if (typeof lower == 'boolean') {
            floating = lower;
            lower = undefined$1;
          }
        }
        if (lower === undefined$1 && upper === undefined$1) {
          lower = 0;
          upper = 1;
        } else {
          lower = toFinite(lower);
          if (upper === undefined$1) {
            upper = lower;
            lower = 0;
          } else {
            upper = toFinite(upper);
          }
        }
        if (lower > upper) {
          var temp = lower;
          lower = upper;
          upper = temp;
        }
        if (floating || lower % 1 || upper % 1) {
          var rand = nativeRandom();
          return nativeMin(lower + rand * (upper - lower + freeParseFloat('1e-' + ((rand + '').length - 1))), upper);
        }
        return baseRandom(lower, upper);
      }
      var camelCase = createCompounder(function (result, word, index) {
        word = word.toLowerCase();
        return result + (index ? capitalize(word) : word);
      });
      function capitalize(string) {
        return upperFirst(toString(string).toLowerCase());
      }
      function deburr(string) {
        string = toString(string);
        return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
      }
      function endsWith(string, target, position) {
        string = toString(string);
        target = baseToString(target);
        var length = string.length;
        position = position === undefined$1 ? length : baseClamp(toInteger(position), 0, length);
        var end = position;
        position -= target.length;
        return position >= 0 && string.slice(position, end) == target;
      }
      function escape(string) {
        string = toString(string);
        return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
      }
      function escapeRegExp(string) {
        string = toString(string);
        return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, '\\$&') : string;
      }
      var kebabCase = createCompounder(function (result, word, index) {
        return result + (index ? '-' : '') + word.toLowerCase();
      });
      var lowerCase = createCompounder(function (result, word, index) {
        return result + (index ? ' ' : '') + word.toLowerCase();
      });
      var lowerFirst = createCaseFirst('toLowerCase');
      function pad(string, length, chars) {
        string = toString(string);
        length = toInteger(length);
        var strLength = length ? stringSize(string) : 0;
        if (!length || strLength >= length) {
          return string;
        }
        var mid = (length - strLength) / 2;
        return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
      }
      function padEnd(string, length, chars) {
        string = toString(string);
        length = toInteger(length);
        var strLength = length ? stringSize(string) : 0;
        return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
      }
      function padStart(string, length, chars) {
        string = toString(string);
        length = toInteger(length);
        var strLength = length ? stringSize(string) : 0;
        return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
      }
      function parseInt(string, radix, guard) {
        if (guard || radix == null) {
          radix = 0;
        } else if (radix) {
          radix = +radix;
        }
        return nativeParseInt(toString(string).replace(reTrimStart, ''), radix || 0);
      }
      function repeat(string, n, guard) {
        if (guard ? isIterateeCall(string, n, guard) : n === undefined$1) {
          n = 1;
        } else {
          n = toInteger(n);
        }
        return baseRepeat(toString(string), n);
      }
      function replace() {
        var args = arguments,
          string = toString(args[0]);
        return args.length < 3 ? string : string.replace(args[1], args[2]);
      }
      var snakeCase = createCompounder(function (result, word, index) {
        return result + (index ? '_' : '') + word.toLowerCase();
      });
      function split(string, separator, limit) {
        if (limit && typeof limit != 'number' && isIterateeCall(string, separator, limit)) {
          separator = limit = undefined$1;
        }
        limit = limit === undefined$1 ? MAX_ARRAY_LENGTH : limit >>> 0;
        if (!limit) {
          return [];
        }
        string = toString(string);
        if (string && (typeof separator == 'string' || separator != null && !isRegExp(separator))) {
          separator = baseToString(separator);
          if (!separator && hasUnicode(string)) {
            return castSlice(stringToArray(string), 0, limit);
          }
        }
        return string.split(separator, limit);
      }
      var startCase = createCompounder(function (result, word, index) {
        return result + (index ? ' ' : '') + upperFirst(word);
      });
      function startsWith(string, target, position) {
        string = toString(string);
        position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
        target = baseToString(target);
        return string.slice(position, position + target.length) == target;
      }
      function template(string, options, guard) {
        var settings = lodash.templateSettings;
        if (guard && isIterateeCall(string, options, guard)) {
          options = undefined$1;
        }
        string = toString(string);
        options = assignInWith({}, options, settings, customDefaultsAssignIn);
        var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn),
          importsKeys = keys(imports),
          importsValues = baseValues(imports, importsKeys);
        var isEscaping,
          isEvaluating,
          index = 0,
          interpolate = options.interpolate || reNoMatch,
          source = "__p += '";
        var reDelimiters = RegExp((options.escape || reNoMatch).source + '|' + interpolate.source + '|' + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' + (options.evaluate || reNoMatch).source + '|$', 'g');
        var sourceURL = '//# sourceURL=' + (hasOwnProperty.call(options, 'sourceURL') ? (options.sourceURL + '').replace(/\s/g, ' ') : 'lodash.templateSources[' + ++templateCounter + ']') + '\n';
        string.replace(reDelimiters, function (match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
          interpolateValue || (interpolateValue = esTemplateValue);
          source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
          if (escapeValue) {
            isEscaping = true;
            source += "' +\n__e(" + escapeValue + ") +\n'";
          }
          if (evaluateValue) {
            isEvaluating = true;
            source += "';\n" + evaluateValue + ";\n__p += '";
          }
          if (interpolateValue) {
            source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
          }
          index = offset + match.length;
          return match;
        });
        source += "';\n";
        var variable = hasOwnProperty.call(options, 'variable') && options.variable;
        if (!variable) {
          source = 'with (obj) {\n' + source + '\n}\n';
        } else if (reForbiddenIdentifierChars.test(variable)) {
          throw new Error(INVALID_TEMPL_VAR_ERROR_TEXT);
        }
        source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source).replace(reEmptyStringMiddle, '$1').replace(reEmptyStringTrailing, '$1;');
        source = 'function(' + (variable || 'obj') + ') {\n' + (variable ? '' : 'obj || (obj = {});\n') + "var __t, __p = ''" + (isEscaping ? ', __e = _.escape' : '') + (isEvaluating ? ', __j = Array.prototype.join;\n' + "function print() { __p += __j.call(arguments, '') }\n" : ';\n') + source + 'return __p\n}';
        var result = attempt(function () {
          return Function(importsKeys, sourceURL + 'return ' + source).apply(undefined$1, importsValues);
        });
        result.source = source;
        if (isError(result)) {
          throw result;
        }
        return result;
      }
      function toLower(value) {
        return toString(value).toLowerCase();
      }
      function toUpper(value) {
        return toString(value).toUpperCase();
      }
      function trim(string, chars, guard) {
        string = toString(string);
        if (string && (guard || chars === undefined$1)) {
          return baseTrim(string);
        }
        if (!string || !(chars = baseToString(chars))) {
          return string;
        }
        var strSymbols = stringToArray(string),
          chrSymbols = stringToArray(chars),
          start = charsStartIndex(strSymbols, chrSymbols),
          end = charsEndIndex(strSymbols, chrSymbols) + 1;
        return castSlice(strSymbols, start, end).join('');
      }
      function trimEnd(string, chars, guard) {
        string = toString(string);
        if (string && (guard || chars === undefined$1)) {
          return string.slice(0, trimmedEndIndex(string) + 1);
        }
        if (!string || !(chars = baseToString(chars))) {
          return string;
        }
        var strSymbols = stringToArray(string),
          end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
        return castSlice(strSymbols, 0, end).join('');
      }
      function trimStart(string, chars, guard) {
        string = toString(string);
        if (string && (guard || chars === undefined$1)) {
          return string.replace(reTrimStart, '');
        }
        if (!string || !(chars = baseToString(chars))) {
          return string;
        }
        var strSymbols = stringToArray(string),
          start = charsStartIndex(strSymbols, stringToArray(chars));
        return castSlice(strSymbols, start).join('');
      }
      function truncate(string, options) {
        var length = DEFAULT_TRUNC_LENGTH,
          omission = DEFAULT_TRUNC_OMISSION;
        if (isObject(options)) {
          var separator = 'separator' in options ? options.separator : separator;
          length = 'length' in options ? toInteger(options.length) : length;
          omission = 'omission' in options ? baseToString(options.omission) : omission;
        }
        string = toString(string);
        var strLength = string.length;
        if (hasUnicode(string)) {
          var strSymbols = stringToArray(string);
          strLength = strSymbols.length;
        }
        if (length >= strLength) {
          return string;
        }
        var end = length - stringSize(omission);
        if (end < 1) {
          return omission;
        }
        var result = strSymbols ? castSlice(strSymbols, 0, end).join('') : string.slice(0, end);
        if (separator === undefined$1) {
          return result + omission;
        }
        if (strSymbols) {
          end += result.length - end;
        }
        if (isRegExp(separator)) {
          if (string.slice(end).search(separator)) {
            var match,
              substring = result;
            if (!separator.global) {
              separator = RegExp(separator.source, toString(reFlags.exec(separator)) + 'g');
            }
            separator.lastIndex = 0;
            while (match = separator.exec(substring)) {
              var newEnd = match.index;
            }
            result = result.slice(0, newEnd === undefined$1 ? end : newEnd);
          }
        } else if (string.indexOf(baseToString(separator), end) != end) {
          var index = result.lastIndexOf(separator);
          if (index > -1) {
            result = result.slice(0, index);
          }
        }
        return result + omission;
      }
      function unescape(string) {
        string = toString(string);
        return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
      }
      var upperCase = createCompounder(function (result, word, index) {
        return result + (index ? ' ' : '') + word.toUpperCase();
      });
      var upperFirst = createCaseFirst('toUpperCase');
      function words(string, pattern, guard) {
        string = toString(string);
        pattern = guard ? undefined$1 : pattern;
        if (pattern === undefined$1) {
          return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
        }
        return string.match(pattern) || [];
      }
      var attempt = baseRest(function (func, args) {
        try {
          return apply(func, undefined$1, args);
        } catch (e) {
          return isError(e) ? e : new Error(e);
        }
      });
      var bindAll = flatRest(function (object, methodNames) {
        arrayEach(methodNames, function (key) {
          key = toKey(key);
          baseAssignValue(object, key, bind(object[key], object));
        });
        return object;
      });
      function cond(pairs) {
        var length = pairs == null ? 0 : pairs.length,
          toIteratee = getIteratee();
        pairs = !length ? [] : arrayMap(pairs, function (pair) {
          if (typeof pair[1] != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          return [toIteratee(pair[0]), pair[1]];
        });
        return baseRest(function (args) {
          var index = -1;
          while (++index < length) {
            var pair = pairs[index];
            if (apply(pair[0], this, args)) {
              return apply(pair[1], this, args);
            }
          }
        });
      }
      function conforms(source) {
        return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
      }
      function constant(value) {
        return function () {
          return value;
        };
      }
      function defaultTo(value, defaultValue) {
        return value == null || value !== value ? defaultValue : value;
      }
      var flow = createFlow();
      var flowRight = createFlow(true);
      function identity(value) {
        return value;
      }
      function iteratee(func) {
        return baseIteratee(typeof func == 'function' ? func : baseClone(func, CLONE_DEEP_FLAG));
      }
      function matches(source) {
        return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
      }
      function matchesProperty(path, srcValue) {
        return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
      }
      var method = baseRest(function (path, args) {
        return function (object) {
          return baseInvoke(object, path, args);
        };
      });
      var methodOf = baseRest(function (object, args) {
        return function (path) {
          return baseInvoke(object, path, args);
        };
      });
      function mixin(object, source, options) {
        var props = keys(source),
          methodNames = baseFunctions(source, props);
        if (options == null && !(isObject(source) && (methodNames.length || !props.length))) {
          options = source;
          source = object;
          object = this;
          methodNames = baseFunctions(source, keys(source));
        }
        var chain = !(isObject(options) && 'chain' in options) || !!options.chain,
          isFunc = isFunction(object);
        arrayEach(methodNames, function (methodName) {
          var func = source[methodName];
          object[methodName] = func;
          if (isFunc) {
            object.prototype[methodName] = function () {
              var chainAll = this.__chain__;
              if (chain || chainAll) {
                var result = object(this.__wrapped__),
                  actions = result.__actions__ = copyArray(this.__actions__);
                actions.push({
                  'func': func,
                  'args': arguments,
                  'thisArg': object
                });
                result.__chain__ = chainAll;
                return result;
              }
              return func.apply(object, arrayPush([this.value()], arguments));
            };
          }
        });
        return object;
      }
      function noConflict() {
        if (root._ === this) {
          root._ = oldDash;
        }
        return this;
      }
      function noop() {}
      function nthArg(n) {
        n = toInteger(n);
        return baseRest(function (args) {
          return baseNth(args, n);
        });
      }
      var over = createOver(arrayMap);
      var overEvery = createOver(arrayEvery);
      var overSome = createOver(arraySome);
      function property(path) {
        return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
      }
      function propertyOf(object) {
        return function (path) {
          return object == null ? undefined$1 : baseGet(object, path);
        };
      }
      var range = createRange();
      var rangeRight = createRange(true);
      function stubArray() {
        return [];
      }
      function stubFalse() {
        return false;
      }
      function stubObject() {
        return {};
      }
      function stubString() {
        return '';
      }
      function stubTrue() {
        return true;
      }
      function times(n, iteratee) {
        n = toInteger(n);
        if (n < 1 || n > MAX_SAFE_INTEGER) {
          return [];
        }
        var index = MAX_ARRAY_LENGTH,
          length = nativeMin(n, MAX_ARRAY_LENGTH);
        iteratee = getIteratee(iteratee);
        n -= MAX_ARRAY_LENGTH;
        var result = baseTimes(length, iteratee);
        while (++index < n) {
          iteratee(index);
        }
        return result;
      }
      function toPath(value) {
        if (isArray(value)) {
          return arrayMap(value, toKey);
        }
        return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
      }
      function uniqueId(prefix) {
        var id = ++idCounter;
        return toString(prefix) + id;
      }
      var add = createMathOperation(function (augend, addend) {
        return augend + addend;
      }, 0);
      var ceil = createRound('ceil');
      var divide = createMathOperation(function (dividend, divisor) {
        return dividend / divisor;
      }, 1);
      var floor = createRound('floor');
      function max(array) {
        return array && array.length ? baseExtremum(array, identity, baseGt) : undefined$1;
      }
      function maxBy(array, iteratee) {
        return array && array.length ? baseExtremum(array, getIteratee(iteratee, 2), baseGt) : undefined$1;
      }
      function mean(array) {
        return baseMean(array, identity);
      }
      function meanBy(array, iteratee) {
        return baseMean(array, getIteratee(iteratee, 2));
      }
      function min(array) {
        return array && array.length ? baseExtremum(array, identity, baseLt) : undefined$1;
      }
      function minBy(array, iteratee) {
        return array && array.length ? baseExtremum(array, getIteratee(iteratee, 2), baseLt) : undefined$1;
      }
      var multiply = createMathOperation(function (multiplier, multiplicand) {
        return multiplier * multiplicand;
      }, 1);
      var round = createRound('round');
      var subtract = createMathOperation(function (minuend, subtrahend) {
        return minuend - subtrahend;
      }, 0);
      function sum(array) {
        return array && array.length ? baseSum(array, identity) : 0;
      }
      function sumBy(array, iteratee) {
        return array && array.length ? baseSum(array, getIteratee(iteratee, 2)) : 0;
      }
      lodash.after = after;
      lodash.ary = ary;
      lodash.assign = assign;
      lodash.assignIn = assignIn;
      lodash.assignInWith = assignInWith;
      lodash.assignWith = assignWith;
      lodash.at = at;
      lodash.before = before;
      lodash.bind = bind;
      lodash.bindAll = bindAll;
      lodash.bindKey = bindKey;
      lodash.castArray = castArray;
      lodash.chain = chain;
      lodash.chunk = chunk;
      lodash.compact = compact;
      lodash.concat = concat;
      lodash.cond = cond;
      lodash.conforms = conforms;
      lodash.constant = constant;
      lodash.countBy = countBy;
      lodash.create = create;
      lodash.curry = curry;
      lodash.curryRight = curryRight;
      lodash.debounce = debounce;
      lodash.defaults = defaults;
      lodash.defaultsDeep = defaultsDeep;
      lodash.defer = defer;
      lodash.delay = delay;
      lodash.difference = difference;
      lodash.differenceBy = differenceBy;
      lodash.differenceWith = differenceWith;
      lodash.drop = drop;
      lodash.dropRight = dropRight;
      lodash.dropRightWhile = dropRightWhile;
      lodash.dropWhile = dropWhile;
      lodash.fill = fill;
      lodash.filter = filter;
      lodash.flatMap = flatMap;
      lodash.flatMapDeep = flatMapDeep;
      lodash.flatMapDepth = flatMapDepth;
      lodash.flatten = flatten;
      lodash.flattenDeep = flattenDeep;
      lodash.flattenDepth = flattenDepth;
      lodash.flip = flip;
      lodash.flow = flow;
      lodash.flowRight = flowRight;
      lodash.fromPairs = fromPairs;
      lodash.functions = functions;
      lodash.functionsIn = functionsIn;
      lodash.groupBy = groupBy;
      lodash.initial = initial;
      lodash.intersection = intersection;
      lodash.intersectionBy = intersectionBy;
      lodash.intersectionWith = intersectionWith;
      lodash.invert = invert;
      lodash.invertBy = invertBy;
      lodash.invokeMap = invokeMap;
      lodash.iteratee = iteratee;
      lodash.keyBy = keyBy;
      lodash.keys = keys;
      lodash.keysIn = keysIn;
      lodash.map = map;
      lodash.mapKeys = mapKeys;
      lodash.mapValues = mapValues;
      lodash.matches = matches;
      lodash.matchesProperty = matchesProperty;
      lodash.memoize = memoize;
      lodash.merge = merge;
      lodash.mergeWith = mergeWith;
      lodash.method = method;
      lodash.methodOf = methodOf;
      lodash.mixin = mixin;
      lodash.negate = negate;
      lodash.nthArg = nthArg;
      lodash.omit = omit;
      lodash.omitBy = omitBy;
      lodash.once = once;
      lodash.orderBy = orderBy;
      lodash.over = over;
      lodash.overArgs = overArgs;
      lodash.overEvery = overEvery;
      lodash.overSome = overSome;
      lodash.partial = partial;
      lodash.partialRight = partialRight;
      lodash.partition = partition;
      lodash.pick = pick;
      lodash.pickBy = pickBy;
      lodash.property = property;
      lodash.propertyOf = propertyOf;
      lodash.pull = pull;
      lodash.pullAll = pullAll;
      lodash.pullAllBy = pullAllBy;
      lodash.pullAllWith = pullAllWith;
      lodash.pullAt = pullAt;
      lodash.range = range;
      lodash.rangeRight = rangeRight;
      lodash.rearg = rearg;
      lodash.reject = reject;
      lodash.remove = remove;
      lodash.rest = rest;
      lodash.reverse = reverse;
      lodash.sampleSize = sampleSize;
      lodash.set = set;
      lodash.setWith = setWith;
      lodash.shuffle = shuffle;
      lodash.slice = slice;
      lodash.sortBy = sortBy;
      lodash.sortedUniq = sortedUniq;
      lodash.sortedUniqBy = sortedUniqBy;
      lodash.split = split;
      lodash.spread = spread;
      lodash.tail = tail;
      lodash.take = take;
      lodash.takeRight = takeRight;
      lodash.takeRightWhile = takeRightWhile;
      lodash.takeWhile = takeWhile;
      lodash.tap = tap;
      lodash.throttle = throttle;
      lodash.thru = thru;
      lodash.toArray = toArray;
      lodash.toPairs = toPairs;
      lodash.toPairsIn = toPairsIn;
      lodash.toPath = toPath;
      lodash.toPlainObject = toPlainObject;
      lodash.transform = transform;
      lodash.unary = unary;
      lodash.union = union;
      lodash.unionBy = unionBy;
      lodash.unionWith = unionWith;
      lodash.uniq = uniq;
      lodash.uniqBy = uniqBy;
      lodash.uniqWith = uniqWith;
      lodash.unset = unset;
      lodash.unzip = unzip;
      lodash.unzipWith = unzipWith;
      lodash.update = update;
      lodash.updateWith = updateWith;
      lodash.values = values;
      lodash.valuesIn = valuesIn;
      lodash.without = without;
      lodash.words = words;
      lodash.wrap = wrap;
      lodash.xor = xor;
      lodash.xorBy = xorBy;
      lodash.xorWith = xorWith;
      lodash.zip = zip;
      lodash.zipObject = zipObject;
      lodash.zipObjectDeep = zipObjectDeep;
      lodash.zipWith = zipWith;
      lodash.entries = toPairs;
      lodash.entriesIn = toPairsIn;
      lodash.extend = assignIn;
      lodash.extendWith = assignInWith;
      mixin(lodash, lodash);
      lodash.add = add;
      lodash.attempt = attempt;
      lodash.camelCase = camelCase;
      lodash.capitalize = capitalize;
      lodash.ceil = ceil;
      lodash.clamp = clamp;
      lodash.clone = clone;
      lodash.cloneDeep = cloneDeep;
      lodash.cloneDeepWith = cloneDeepWith;
      lodash.cloneWith = cloneWith;
      lodash.conformsTo = conformsTo;
      lodash.deburr = deburr;
      lodash.defaultTo = defaultTo;
      lodash.divide = divide;
      lodash.endsWith = endsWith;
      lodash.eq = eq;
      lodash.escape = escape;
      lodash.escapeRegExp = escapeRegExp;
      lodash.every = every;
      lodash.find = find;
      lodash.findIndex = findIndex;
      lodash.findKey = findKey;
      lodash.findLast = findLast;
      lodash.findLastIndex = findLastIndex;
      lodash.findLastKey = findLastKey;
      lodash.floor = floor;
      lodash.forEach = forEach;
      lodash.forEachRight = forEachRight;
      lodash.forIn = forIn;
      lodash.forInRight = forInRight;
      lodash.forOwn = forOwn;
      lodash.forOwnRight = forOwnRight;
      lodash.get = get;
      lodash.gt = gt;
      lodash.gte = gte;
      lodash.has = has;
      lodash.hasIn = hasIn;
      lodash.head = head;
      lodash.identity = identity;
      lodash.includes = includes;
      lodash.indexOf = indexOf;
      lodash.inRange = inRange;
      lodash.invoke = invoke;
      lodash.isArguments = isArguments;
      lodash.isArray = isArray;
      lodash.isArrayBuffer = isArrayBuffer;
      lodash.isArrayLike = isArrayLike;
      lodash.isArrayLikeObject = isArrayLikeObject;
      lodash.isBoolean = isBoolean;
      lodash.isBuffer = isBuffer;
      lodash.isDate = isDate;
      lodash.isElement = isElement;
      lodash.isEmpty = isEmpty;
      lodash.isEqual = isEqual;
      lodash.isEqualWith = isEqualWith;
      lodash.isError = isError;
      lodash.isFinite = isFinite;
      lodash.isFunction = isFunction;
      lodash.isInteger = isInteger;
      lodash.isLength = isLength;
      lodash.isMap = isMap;
      lodash.isMatch = isMatch;
      lodash.isMatchWith = isMatchWith;
      lodash.isNaN = isNaN;
      lodash.isNative = isNative;
      lodash.isNil = isNil;
      lodash.isNull = isNull;
      lodash.isNumber = isNumber;
      lodash.isObject = isObject;
      lodash.isObjectLike = isObjectLike;
      lodash.isPlainObject = isPlainObject;
      lodash.isRegExp = isRegExp;
      lodash.isSafeInteger = isSafeInteger;
      lodash.isSet = isSet;
      lodash.isString = isString;
      lodash.isSymbol = isSymbol;
      lodash.isTypedArray = isTypedArray;
      lodash.isUndefined = isUndefined;
      lodash.isWeakMap = isWeakMap;
      lodash.isWeakSet = isWeakSet;
      lodash.join = join;
      lodash.kebabCase = kebabCase;
      lodash.last = last;
      lodash.lastIndexOf = lastIndexOf;
      lodash.lowerCase = lowerCase;
      lodash.lowerFirst = lowerFirst;
      lodash.lt = lt;
      lodash.lte = lte;
      lodash.max = max;
      lodash.maxBy = maxBy;
      lodash.mean = mean;
      lodash.meanBy = meanBy;
      lodash.min = min;
      lodash.minBy = minBy;
      lodash.stubArray = stubArray;
      lodash.stubFalse = stubFalse;
      lodash.stubObject = stubObject;
      lodash.stubString = stubString;
      lodash.stubTrue = stubTrue;
      lodash.multiply = multiply;
      lodash.nth = nth;
      lodash.noConflict = noConflict;
      lodash.noop = noop;
      lodash.now = now;
      lodash.pad = pad;
      lodash.padEnd = padEnd;
      lodash.padStart = padStart;
      lodash.parseInt = parseInt;
      lodash.random = random;
      lodash.reduce = reduce;
      lodash.reduceRight = reduceRight;
      lodash.repeat = repeat;
      lodash.replace = replace;
      lodash.result = result;
      lodash.round = round;
      lodash.runInContext = runInContext;
      lodash.sample = sample;
      lodash.size = size;
      lodash.snakeCase = snakeCase;
      lodash.some = some;
      lodash.sortedIndex = sortedIndex;
      lodash.sortedIndexBy = sortedIndexBy;
      lodash.sortedIndexOf = sortedIndexOf;
      lodash.sortedLastIndex = sortedLastIndex;
      lodash.sortedLastIndexBy = sortedLastIndexBy;
      lodash.sortedLastIndexOf = sortedLastIndexOf;
      lodash.startCase = startCase;
      lodash.startsWith = startsWith;
      lodash.subtract = subtract;
      lodash.sum = sum;
      lodash.sumBy = sumBy;
      lodash.template = template;
      lodash.times = times;
      lodash.toFinite = toFinite;
      lodash.toInteger = toInteger;
      lodash.toLength = toLength;
      lodash.toLower = toLower;
      lodash.toNumber = toNumber;
      lodash.toSafeInteger = toSafeInteger;
      lodash.toString = toString;
      lodash.toUpper = toUpper;
      lodash.trim = trim;
      lodash.trimEnd = trimEnd;
      lodash.trimStart = trimStart;
      lodash.truncate = truncate;
      lodash.unescape = unescape;
      lodash.uniqueId = uniqueId;
      lodash.upperCase = upperCase;
      lodash.upperFirst = upperFirst;
      lodash.each = forEach;
      lodash.eachRight = forEachRight;
      lodash.first = head;
      mixin(lodash, function () {
        var source = {};
        baseForOwn(lodash, function (func, methodName) {
          if (!hasOwnProperty.call(lodash.prototype, methodName)) {
            source[methodName] = func;
          }
        });
        return source;
      }(), {
        'chain': false
      });
      lodash.VERSION = VERSION;
      arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function (methodName) {
        lodash[methodName].placeholder = lodash;
      });
      arrayEach(['drop', 'take'], function (methodName, index) {
        LazyWrapper.prototype[methodName] = function (n) {
          n = n === undefined$1 ? 1 : nativeMax(toInteger(n), 0);
          var result = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
          if (result.__filtered__) {
            result.__takeCount__ = nativeMin(n, result.__takeCount__);
          } else {
            result.__views__.push({
              'size': nativeMin(n, MAX_ARRAY_LENGTH),
              'type': methodName + (result.__dir__ < 0 ? 'Right' : '')
            });
          }
          return result;
        };
        LazyWrapper.prototype[methodName + 'Right'] = function (n) {
          return this.reverse()[methodName](n).reverse();
        };
      });
      arrayEach(['filter', 'map', 'takeWhile'], function (methodName, index) {
        var type = index + 1,
          isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
        LazyWrapper.prototype[methodName] = function (iteratee) {
          var result = this.clone();
          result.__iteratees__.push({
            'iteratee': getIteratee(iteratee, 3),
            'type': type
          });
          result.__filtered__ = result.__filtered__ || isFilter;
          return result;
        };
      });
      arrayEach(['head', 'last'], function (methodName, index) {
        var takeName = 'take' + (index ? 'Right' : '');
        LazyWrapper.prototype[methodName] = function () {
          return this[takeName](1).value()[0];
        };
      });
      arrayEach(['initial', 'tail'], function (methodName, index) {
        var dropName = 'drop' + (index ? '' : 'Right');
        LazyWrapper.prototype[methodName] = function () {
          return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
        };
      });
      LazyWrapper.prototype.compact = function () {
        return this.filter(identity);
      };
      LazyWrapper.prototype.find = function (predicate) {
        return this.filter(predicate).head();
      };
      LazyWrapper.prototype.findLast = function (predicate) {
        return this.reverse().find(predicate);
      };
      LazyWrapper.prototype.invokeMap = baseRest(function (path, args) {
        if (typeof path == 'function') {
          return new LazyWrapper(this);
        }
        return this.map(function (value) {
          return baseInvoke(value, path, args);
        });
      });
      LazyWrapper.prototype.reject = function (predicate) {
        return this.filter(negate(getIteratee(predicate)));
      };
      LazyWrapper.prototype.slice = function (start, end) {
        start = toInteger(start);
        var result = this;
        if (result.__filtered__ && (start > 0 || end < 0)) {
          return new LazyWrapper(result);
        }
        if (start < 0) {
          result = result.takeRight(-start);
        } else if (start) {
          result = result.drop(start);
        }
        if (end !== undefined$1) {
          end = toInteger(end);
          result = end < 0 ? result.dropRight(-end) : result.take(end - start);
        }
        return result;
      };
      LazyWrapper.prototype.takeRightWhile = function (predicate) {
        return this.reverse().takeWhile(predicate).reverse();
      };
      LazyWrapper.prototype.toArray = function () {
        return this.take(MAX_ARRAY_LENGTH);
      };
      baseForOwn(LazyWrapper.prototype, function (func, methodName) {
        var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName),
          isTaker = /^(?:head|last)$/.test(methodName),
          lodashFunc = lodash[isTaker ? 'take' + (methodName == 'last' ? 'Right' : '') : methodName],
          retUnwrapped = isTaker || /^find/.test(methodName);
        if (!lodashFunc) {
          return;
        }
        lodash.prototype[methodName] = function () {
          var value = this.__wrapped__,
            args = isTaker ? [1] : arguments,
            isLazy = value instanceof LazyWrapper,
            iteratee = args[0],
            useLazy = isLazy || isArray(value);
          var interceptor = function (value) {
            var result = lodashFunc.apply(lodash, arrayPush([value], args));
            return isTaker && chainAll ? result[0] : result;
          };
          if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
            isLazy = useLazy = false;
          }
          var chainAll = this.__chain__,
            isHybrid = !!this.__actions__.length,
            isUnwrapped = retUnwrapped && !chainAll,
            onlyLazy = isLazy && !isHybrid;
          if (!retUnwrapped && useLazy) {
            value = onlyLazy ? value : new LazyWrapper(this);
            var result = func.apply(value, args);
            result.__actions__.push({
              'func': thru,
              'args': [interceptor],
              'thisArg': undefined$1
            });
            return new LodashWrapper(result, chainAll);
          }
          if (isUnwrapped && onlyLazy) {
            return func.apply(this, args);
          }
          result = this.thru(interceptor);
          return isUnwrapped ? isTaker ? result.value()[0] : result.value() : result;
        };
      });
      arrayEach(['pop', 'push', 'shift', 'sort', 'splice', 'unshift'], function (methodName) {
        var func = arrayProto[methodName],
          chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
          retUnwrapped = /^(?:pop|shift)$/.test(methodName);
        lodash.prototype[methodName] = function () {
          var args = arguments;
          if (retUnwrapped && !this.__chain__) {
            var value = this.value();
            return func.apply(isArray(value) ? value : [], args);
          }
          return this[chainName](function (value) {
            return func.apply(isArray(value) ? value : [], args);
          });
        };
      });
      baseForOwn(LazyWrapper.prototype, function (func, methodName) {
        var lodashFunc = lodash[methodName];
        if (lodashFunc) {
          var key = lodashFunc.name + '';
          if (!hasOwnProperty.call(realNames, key)) {
            realNames[key] = [];
          }
          realNames[key].push({
            'name': methodName,
            'func': lodashFunc
          });
        }
      });
      realNames[createHybrid(undefined$1, WRAP_BIND_KEY_FLAG).name] = [{
        'name': 'wrapper',
        'func': undefined$1
      }];
      LazyWrapper.prototype.clone = lazyClone;
      LazyWrapper.prototype.reverse = lazyReverse;
      LazyWrapper.prototype.value = lazyValue;
      lodash.prototype.at = wrapperAt;
      lodash.prototype.chain = wrapperChain;
      lodash.prototype.commit = wrapperCommit;
      lodash.prototype.next = wrapperNext;
      lodash.prototype.plant = wrapperPlant;
      lodash.prototype.reverse = wrapperReverse;
      lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
      lodash.prototype.first = lodash.prototype.head;
      if (symIterator) {
        lodash.prototype[symIterator] = wrapperToIterator;
      }
      return lodash;
    };
    var _ = runInContext();
    if (freeModule) {
      (freeModule.exports = _)._ = _;
      freeExports._ = _;
    } else {
      root._ = _;
    }
  }).call(commonjsGlobal);
});

const EmployeeSideBar = () => {
  var _data$actions, _data$actions$filter;
  const sidebarRef = useRef(null);
  const {
    isLoading,
    data
  } = Digit.Hooks.useAccessControl();
  const [search, setSearch] = useState("");
  const {
    t
  } = useTranslation();
  useEffect(() => {
    if (isLoading) {
      return /*#__PURE__*/React.createElement(Loader, null);
    }
    sidebarRef.current.style.cursor = "pointer";
    collapseNav();
  }, [isLoading]);
  const expandNav = () => {
    sidebarRef.current.style.width = "260px";
    sidebarRef.current.style.overflow = "auto";
    sidebarRef.current.querySelectorAll(".dropdown-link").forEach(element => {
      element.style.display = "flex";
    });
  };
  const collapseNav = () => {
    sidebarRef.current.style.width = "55px";
    sidebarRef.current.style.overflow = "hidden";
    sidebarRef.current.querySelectorAll(".dropdown-link").forEach(element => {
      element.style.display = "none";
    });
    sidebarRef.current.querySelectorAll(".actions").forEach(element => {
      element.style.padding = "0";
    });
  };
  const configEmployeeSideBar = {};
  let configEmployeeSideBar1 = {};
  data === null || data === void 0 ? void 0 : (_data$actions = data.actions) === null || _data$actions === void 0 ? void 0 : (_data$actions$filter = _data$actions.filter(e => e.url === "url")) === null || _data$actions$filter === void 0 ? void 0 : _data$actions$filter.forEach(item => {
    lodash.set(configEmployeeSideBar1, item.path, {
      ...item
    });
  });
  data === null || data === void 0 ? void 0 : data.actions.filter(e => e.url === "url").forEach(item => {
    var _t, _index, _index$toUpperCase;
    let index = item.path.split(".")[0];
    if (search == "" && item.path !== "") {
      index = item.path.split(".")[0];
      if (index === "TradeLicense") index = "Trade License";
      if (!configEmployeeSideBar[index]) {
        configEmployeeSideBar[index] = [item];
      } else {
        configEmployeeSideBar[index].push(item);
      }
    } else if (item.path !== "" && (_t = t(`ACTION_TEST_${(_index = index) === null || _index === void 0 ? void 0 : (_index$toUpperCase = _index.toUpperCase()) === null || _index$toUpperCase === void 0 ? void 0 : _index$toUpperCase.replace(/[ -]/g, "_")}`)) !== null && _t !== void 0 && _t.toLowerCase().includes(search.toLowerCase())) {
      index = item.path.split(".")[0];
      if (index === "TradeLicense") index = "Trade License";
      if (!configEmployeeSideBar[index]) {
        configEmployeeSideBar[index] = [item];
      } else {
        configEmployeeSideBar[index].push(item);
      }
    }
  });
  let res = [];
  const splitKeyValue = () => {
    var _res3;
    const keys = Object.keys(configEmployeeSideBar);
    keys.sort((a, b) => a.orderNumber - b.orderNumber);
    for (let i = 0; i < keys.length; i++) {
      if (configEmployeeSideBar[keys[i]][0].path.indexOf(".") === -1) {
        if (configEmployeeSideBar[keys[i]][0].displayName === "Home") {
          const homeURL = "/digit-ui/employee";
          res.unshift({
            moduleName: keys[i].toUpperCase(),
            icon: configEmployeeSideBar[keys[i]][0],
            navigationURL: homeURL,
            type: "single"
          });
        } else {
          var _configEmployeeSideBa;
          res.push({
            moduleName: (_configEmployeeSideBa = configEmployeeSideBar[keys[i]][0]) === null || _configEmployeeSideBa === void 0 ? void 0 : _configEmployeeSideBa.displayName.toUpperCase(),
            type: "single",
            icon: configEmployeeSideBar[keys[i]][0],
            navigationURL: configEmployeeSideBar[keys[i]][0].navigationURL
          });
        }
      } else {
        res.push({
          moduleName: keys[i].toUpperCase(),
          links: configEmployeeSideBar[keys[i]],
          icon: configEmployeeSideBar[keys[i]][0],
          orderNumber: configEmployeeSideBar[keys[i]][0].orderNumber
        });
      }
    }
    if (res.find(a => a.moduleName === "HOME")) {
      var _res, _res2;
      const indx = res.findIndex(a => a.moduleName === "HOME");
      const home = (_res = res) === null || _res === void 0 ? void 0 : _res.filter(ob => (ob === null || ob === void 0 ? void 0 : ob.moduleName) === "HOME");
      let res1 = (_res2 = res) === null || _res2 === void 0 ? void 0 : _res2.filter(ob => (ob === null || ob === void 0 ? void 0 : ob.moduleName) !== "HOME");
      res = res1.sort((a, b) => a.moduleName.localeCompare(b.moduleName));
      (home === null || home === void 0 ? void 0 : home[0]) && res.unshift(home[0]);
    } else {
      res.sort((a, b) => a.moduleName.localeCompare(b.moduleName));
    }
    return (_res3 = res) === null || _res3 === void 0 ? void 0 : _res3.map((item, index) => {
      return /*#__PURE__*/React.createElement(SubMenu, {
        item: item,
        key: index + 1
      });
    });
  };
  if (isLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  if (!res) {
    return "";
  }
  const renderSearch = () => {
    return /*#__PURE__*/React.createElement("div", {
      className: "submenu-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sidebar-link"
    }, /*#__PURE__*/React.createElement("div", {
      className: "actions search-icon-wrapper"
    }, /*#__PURE__*/React.createElement(SearchIcon, {
      className: "search-icon"
    }), /*#__PURE__*/React.createElement("input", {
      className: "employee-search-input",
      type: "text",
      placeholder: t(`ACTION_TEST_SEARCH`),
      name: "search",
      value: search,
      onChange: e => setSearch(e.target.value)
    }))));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "sidebar",
    ref: sidebarRef,
    onMouseOver: expandNav,
    onMouseLeave: collapseNav
  }, renderSearch(), splitKeyValue());
};

const SideBar = ({
  t,
  CITIZEN,
  isSidebarOpen,
  toggleSidebar,
  handleLogout,
  mobileView,
  userDetails,
  modules,
  linkData,
  islinkDataLoading,
  isSideBarScroll,
  setSideBarScrollTop
}) => {
  if (CITIZEN) return /*#__PURE__*/React.createElement(CitizenSideBar, {
    isOpen: isSidebarOpen,
    isSideBarScroll: isSideBarScroll,
    setSideBarScrollTop: setSideBarScrollTop,
    isMobile: true,
    toggleSidebar: toggleSidebar,
    onLogout: handleLogout,
    linkData: linkData,
    islinkDataLoading: islinkDataLoading
  });else {
    if (!mobileView && userDetails !== null && userDetails !== void 0 && userDetails.access_token) return /*#__PURE__*/React.createElement(EmployeeSideBar, {
      mobileView,
      userDetails,
      modules
    });else return /*#__PURE__*/React.createElement(CitizenSideBar, {
      isOpen: isSidebarOpen,
      isMobile: true,
      toggleSidebar: toggleSidebar,
      onLogout: handleLogout,
      isEmployee: true
    });
  }
};

const TopBarSideBar = ({
  t,
  stateInfo,
  userDetails,
  CITIZEN,
  cityDetails,
  mobileView,
  handleUserDropdownSelection,
  logoUrl,
  showSidebar: _showSidebar = true,
  showLanguageChange,
  linkData,
  islinkDataLoading
}) => {
  const [isSidebarOpen, toggleSidebar] = useState(false);
  const [isSideBarScroll, setSideBarScrollTop] = useState(false);
  const history = useHistory();
  const [showDialog, setShowDialog] = useState(false);
  const handleLogout = () => {
    toggleSidebar(false);
    setShowDialog(true);
  };
  const handleOnSubmit = () => {
    Digit.UserService.logout();
    setShowDialog(false);
  };
  const handleOnCancel = () => {
    setShowDialog(false);
  };
  const userProfile = () => {
    history.push("/digit-ui/employee/user/profile");
  };
  const userOptions = [{
    name: t("EDIT_PROFILE"),
    icon: /*#__PURE__*/React.createElement(EditPencilIcon, {
      className: "icon"
    }),
    func: userProfile
  }, {
    name: t("CORE_COMMON_LOGOUT"),
    icon: /*#__PURE__*/React.createElement(LogoutIcon, {
      className: "icon"
    }),
    func: handleLogout
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TopBar, {
    t: t,
    stateInfo: stateInfo,
    toggleSidebar: toggleSidebar,
    setSideBarScrollTop: setSideBarScrollTop,
    isSidebarOpen: isSidebarOpen,
    isSideBarScroll: isSideBarScroll,
    handleLogout: handleLogout,
    userDetails: userDetails,
    CITIZEN: CITIZEN,
    cityDetails: cityDetails,
    mobileView: mobileView,
    userOptions: userOptions,
    handleUserDropdownSelection: handleUserDropdownSelection,
    logoUrl: logoUrl,
    showLanguageChange: showLanguageChange
  }), showDialog && /*#__PURE__*/React.createElement(LogoutDialog, {
    onSelect: handleOnSubmit,
    onCancel: handleOnCancel,
    onDismiss: handleOnCancel
  }), _showSidebar && /*#__PURE__*/React.createElement(SideBar, {
    t: t,
    CITIZEN: CITIZEN,
    isSidebarOpen: isSidebarOpen,
    toggleSidebar: toggleSidebar,
    isSideBarScroll: isSideBarScroll,
    setSideBarScrollTop: setSideBarScrollTop,
    handleLogout: handleLogout,
    mobileView: mobileView,
    userDetails: userDetails,
    linkData: linkData,
    islinkDataLoading: islinkDataLoading
  }));
};

function UploadDrawer({
  setProfilePic,
  closeDrawer,
  userType,
  removeProfilePic,
  showToast
}) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [file, setFile] = useState("");
  const [error, setError] = useState(null);
  const {
    t
  } = useTranslation();
  const selectfile = e => setFile(e.target.files[0]);
  const removeimg = () => {
    removeProfilePic();
    closeDrawer();
  };
  const onOverlayBodyClick = () => closeDrawer();
  useEffect(() => {
    (async () => {
      setError(null);
      if (file) {
        if (file.size >= 1000000) {
          showToast("error", t("CORE_COMMON_PROFILE_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
          setError(t("CORE_COMMON_PROFILE_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            var _response$data, _response$data$files;
            const response = await Digit.UploadServices.Filestorage(`${userType}-profile`, file, Digit.ULBService.getStateId());
            if ((response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : (_response$data$files = _response$data.files) === null || _response$data$files === void 0 ? void 0 : _response$data$files.length) > 0) {
              var _response$data2, _response$data2$files;
              const fileStoreId = response === null || response === void 0 ? void 0 : (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : (_response$data2$files = _response$data2.files[0]) === null || _response$data2$files === void 0 ? void 0 : _response$data2$files.fileStoreId;
              setUploadedFile(fileStoreId);
              setProfilePic(fileStoreId);
            } else {
              showToast("error", t("CORE_COMMON_PROFILE_FILE_UPLOAD_ERROR"));
              setError(t("CORE_COMMON_PROFILE_FILE_UPLOAD_ERROR"));
            }
          } catch (err) {
            showToast("error", t("CORE_COMMON_PROFILE_INVALID_FILE_INPUT"));
          }
        }
      }
    })();
  }, [file]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      width: "100%",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,.5)"
    },
    onClick: onOverlayBodyClick
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      justifyContent: "space-between",
      display: "flex",
      backgroundColor: "white",
      alignItems: "center",
      position: "fixed",
      left: "0",
      right: "0",
      height: "20%",
      bottom: userType === "citizen" ? "2.5rem" : "0",
      zIndex: "2"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flex: "1",
      flexDirection: "column",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      gap: "8px 0"
    }
  }, /*#__PURE__*/React.createElement("label", {
    for: "file",
    style: {
      cursor: "pointer"
    }
  }, " ", /*#__PURE__*/React.createElement(GalleryIcon, null)), /*#__PURE__*/React.createElement("label", {
    style: {
      cursor: "pointer"
    }
  }, " Gallery"), /*#__PURE__*/React.createElement("input", {
    type: "file",
    id: "file",
    accept: "image/*, .png, .jpeg, .jpg",
    onChange: selectfile,
    style: {
      display: "none"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flex: "1",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      gap: "8px 0"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: removeimg
  }, /*#__PURE__*/React.createElement(RemoveIcon, null)), /*#__PURE__*/React.createElement("label", {
    style: {
      cursor: "pointer"
    }
  }, "Remove"))));
}

const defaultImage$2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO4AAADUCAMAAACs0e/bAAAAM1BMVEXK0eL" + "/" + "/" + "/" + "/Dy97GzuD4+fvL0uPg5O7T2efb4OvR1+Xr7vTk5/Df4+37/P3v8fbO1eTt8PUsnq5FAAAGqElEQVR4nO2d25ajIBBFCajgvf/" + "/a0eMyZgEjcI5xgt7Hmatme507UaxuJXidiDqjmSgeVIMlB1ZR1WZAf2gbdu0QwixSYzjOJPmHurfEGEfY9XzjNGG9whQCeVAuv5xQEySLtR9hPuIcwj0EeroN5m3D1IbsbgHK0esiQ9MKs" + "qXVr8Hm/a/Pulk6wihpCIXBw3dh7bTvRBt9+dC5NfS1VH3xETdM3MxXRN1T0zUPTNR98xcS1dlV9NNfx3DhkTdM6PKqHteVBF1z0vU5f0sKdpc2zWLKutXrjJjdLvpesRmukqYonauPhXpds" + "Lb6CppmpnltsYIuY2yavi6Mi2/rzAWm1zUfF0limVLqkZyA+mDYevKBS37aGC+L1lX5e7uyU1Cv565uiua9k5LFqbqqrnu2I3m+jJ11ZoLeRtfmdB0Uw/ZDsP0VTxdn7a1VERfmq7Xl" + "Xyn5D2QWLoq8bZlPoBJumphJjVBw/Ll6CoTZGsTDs4NrGqKbqBth8ZHJUi6cn168QmleSm6GmB7Kxm+6obXlf7PoDHosCwM3QpiS2legi6ocSl3L0G3BdneDDgwQdENfeY+SfDJBkF37Z" + "B+GvwzA6/rMaafAn8143VhPZWdjMWG1oHXhdnemgPoAvLlB/iZyRTfVeF06wPoQhJmlm4bdcOAZRlRN5gcPc5SoPEQR1fDdbOo6wn+uYvXxY0QCLom6gYROKH+Aj5nvphuFXWDiLpRdxl" + "/19LFT95k6CHCrnW7pCDqBn1i1PUFvii2c11oZOJ6usWeH0RRNzC4Zs+6FTi2nevCVwCjbugnXklX5fkfTldL8PEilUB1kfNyN1u9MME2sATr4lbuB7AjfLAuvsRm1A0g6gYRdcPAjvBlje" + "2Z8brI8OC68AcRdlCkwLohx2mcZMjw9q+LzarQurjtnwPYAydX08WecECO/u6Ad0GBdYG7jO5gB4Ap+PwKcA9ZT43dn4/W9TyiPAn4OAJaF7h3uwe8StSCddFdM3jqFa2LvnnB5zzhuuBBAj" + "Y4gi50cg694gnXhTYvfMdrjtcFZhrwE9r41gUem8IXWMC3LrBzxh+a0gRd1N1LOK7M0IUUGuggvEmHoStA2/MJh7MpupiDU4TzjhxdzLAoO4ouZvqVURbFMHQlZD6SUeWHoguZsSLUGegreh" + "A+FZFowPdUWTi6iMoZlIpGGUUXkDbjj/9ZOLqAQS/+GIKl5BQOCn/ycqpzkXSDm5dU7ZWkG7wUyGlcmm7g5Ux56AqirgoaJ7BeokPTDbp9CbVunjFxPrl7+HqnkrSq1Da7JX20f3dV8yJi6v" + "oO81mX8vV0mx3qUsZCPRfTlVRdz2EvdufYGDvNQvvwqHtmXd+a1ITinwNcXc+lT6JuzdT1XDyBn/x7wtX1HCQQdW9MXc8xArGrirowfLeUEbMqqq6f7TF1lfRdOuGNiGi6SpT+WxY06xUfNN" + "2wBfyE9I4tlm7w5hvOPDNJN3yNiLMipji6gE3chKhouoCtN5x3QlF0EZt8OW/8ougitqJQlk1aii7iFC9l0MvRReyao7xNjKML2Z/PuHlzhi5mFxljiZeiC9rPTEisNEMX9KYAwo5Xhi7qaA" + "3hamboYm7dG+NVrXhdaYDv5zFaQZsYrCtbbAGnjkQDX2+J1FXCwOsqWOpKoIQNTFdqYBWydxqNqUoG0pVpCS+H8kaJaGKErlIaXj7CRRE+gRWuKwW9YZ80oVOUgbpdT0zpnSZJTIiwCtJVelv" + "Xntr4P5j6BWfPb5Wcx84C4cq3hb11lco2u2Mdwp6XdJ/Ne3wb8DWdfiRenZaXrhLwOj4e+GQeHroy3YOspS7TlU28Wle2m2QUS0mqdcbrdNW+ZHsSsyK7tBfm0q/dWcv+Z3mytVx3t7KWulq" + "Ue6ilunu8jF8pFwgv1FXp3mUt35OtRbr7eM4u4Gs6vUBXgeuHc5kfE/cbvWZtkROLm1DMtLCy80tzsu2PRj0hTI8fvrQuvsjlJkyutszq+m423wHaLTyniy/XuiGZ84LuT+m5ZfNfRxyGs7L" + "XZOvia7VujatUwVTrIt+Q/Csc7Tuhe+BOakT10b4TuoiiJjvgU9emTO42PwEfBa+cuodKkuf42DXr1D3JpXz73Hnn0j10evHKe+nufgfUm+7B84sX9FfdEzXux2DBpWuKokkCqN/5pa/8pmvn" + "L+RGKCddCGmatiPyPB/+ekO/M/q/7uvbt22kTt3zEnXPzCV13T3Gel4/6NduDu66xRvlPNkM1RjjxUdv+4WhGx6TftD19Q/dfzpwcHO+rE3fAAAAAElFTkSuQmCC";
const UserProfile = ({
  stateCode,
  userType,
  cityDetails
}) => {
  var _Digit$UserService$ge, _errors$userName, _errors$userName2, _errors$mobileNumber, _errors$currentPasswo, _errors$newPassword, _errors$confirmPasswo;
  const history = useHistory();
  const {
    t
  } = useTranslation();
  const url = window.location.href;
  const stateId = Digit.ULBService.getStateId();
  const tenant = Digit.ULBService.getCurrentTenantId();
  const userInfo = ((_Digit$UserService$ge = Digit.UserService.getUser()) === null || _Digit$UserService$ge === void 0 ? void 0 : _Digit$UserService$ge.info) || {};
  const [userDetails, setUserDetails] = useState(null);
  const [name, setName] = useState(userInfo !== null && userInfo !== void 0 && userInfo.name ? userInfo.name : "");
  const [email, setEmail] = useState(userInfo !== null && userInfo !== void 0 && userInfo.emailId ? userInfo.emailId : "");
  const [gender, setGender] = useState(userDetails === null || userDetails === void 0 ? void 0 : userDetails.gender);
  const [city, setCity] = useState(userInfo !== null && userInfo !== void 0 && userInfo.permanentCity ? userInfo.permanentCity : cityDetails.name);
  const [mobileNumber, setMobileNo] = useState(userInfo !== null && userInfo !== void 0 && userInfo.mobileNumber ? userInfo.mobileNumber : "");
  const [profilePic, setProfilePic] = useState(null);
  const [profileImg, setProfileImg] = useState("");
  const [openUploadSlide, setOpenUploadSide] = useState(false);
  const [changepassword, setChangepassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [errors, setErrors] = React.useState({});
  const isMobile = window.Digit.Utils.browser.isMobile();
  const getUserInfo = async () => {
    const uuid = userInfo === null || userInfo === void 0 ? void 0 : userInfo.uuid;
    if (uuid) {
      const usersResponse = await Digit.UserService.userSearch(tenant, {
        uuid: [uuid]
      }, {});
      usersResponse && usersResponse.user && usersResponse.user.length && setUserDetails(usersResponse.user[0]);
    }
  };
  React.useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    return () => {
      window.removeEventListener("resize", () => setWindowWidth(window.innerWidth));
    };
  });
  useEffect(() => {
    var _userDetails$photo;
    setLoading(true);
    getUserInfo();
    setGender({
      i18nKey: undefined,
      code: userDetails === null || userDetails === void 0 ? void 0 : userDetails.gender,
      value: userDetails === null || userDetails === void 0 ? void 0 : userDetails.gender
    });
    const thumbs = userDetails === null || userDetails === void 0 ? void 0 : (_userDetails$photo = userDetails.photo) === null || _userDetails$photo === void 0 ? void 0 : _userDetails$photo.split(",");
    setProfileImg(thumbs === null || thumbs === void 0 ? void 0 : thumbs.at(0));
    setLoading(false);
  }, [userDetails !== null]);
  let validation = {};
  const editScreen = false;
  const onClickAddPic = () => setOpenUploadSide(!openUploadSlide);
  const TogleforPassword = () => setChangepassword(!changepassword);
  const setGenderName = value => setGender(value);
  const closeFileUploadDrawer = () => setOpenUploadSide(false);
  const setUserName = value => {
    setName(value);
    if (!new RegExp(/^[a-zA-Z ]+$/i).test(value) || value.length === 0 || value.length > 50) {
      setErrors({
        ...errors,
        userName: {
          type: "pattern",
          message: t("CORE_COMMON_PROFILE_NAME_INVALID")
        }
      });
    } else {
      setErrors({
        ...errors,
        userName: null
      });
    }
  };
  const setUserMobileNumber = value => {
    setMobileNo(value);
    if (userType === "employee" && !new RegExp(/^[6-9]{1}[0-9]{9}$/).test(value)) {
      setErrors({
        ...errors,
        mobileNumber: {
          type: 'pattern',
          message: t("CORE_COMMON_PROFILE_MOBILE_NUMBER_INVALID")
        }
      });
    } else {
      setErrors({
        ...errors,
        mobileNumber: null
      });
    }
  };
  const setUserCurrentPassword = value => {
    setCurrentPassword(value);
    if (!new RegExp(/^([a-zA-Z0-9@#$%]{8,15})$/i).test(value)) {
      setErrors({
        ...errors,
        currentPassword: {
          type: "pattern",
          message: t("CORE_COMMON_PROFILE_PASSWORD_INVALID")
        }
      });
    } else {
      setErrors({
        ...errors,
        currentPassword: null
      });
    }
  };
  const setUserNewPassword = value => {
    setNewPassword(value);
    if (!new RegExp(/^([a-zA-Z0-9@#$%]{8,15})$/i).test(value)) {
      setErrors({
        ...errors,
        newPassword: {
          type: "pattern",
          message: t("CORE_COMMON_PROFILE_PASSWORD_INVALID")
        }
      });
    } else {
      setErrors({
        ...errors,
        newPassword: null
      });
    }
  };
  const setUserConfirmPassword = value => {
    setConfirmPassword(value);
    if (!new RegExp(/^([a-zA-Z0-9@#$%]{8,15})$/i).test(value)) {
      setErrors({
        ...errors,
        confirmPassword: {
          type: "pattern",
          message: t("CORE_COMMON_PROFILE_PASSWORD_INVALID")
        }
      });
    } else {
      setErrors({
        ...errors,
        confirmPassword: null
      });
    }
  };
  const removeProfilePic = () => {
    setProfilePic(null);
    setProfileImg(null);
  };
  const showToast = (type, message, duration = 5000) => {
    setToast({
      key: type,
      action: message
    });
    setTimeout(() => {
      setToast(null);
    }, duration);
  };
  const updateProfile = async () => {
    setLoading(true);
    try {
      const requestData = {
        ...userInfo,
        name,
        gender: gender === null || gender === void 0 ? void 0 : gender.value,
        emailId: email,
        photo: profilePic
      };
      if (!new RegExp(/^([a-zA-Z ])*$/).test(name) || name === "" || name.length > 50 || name.length < 1) {
        throw JSON.stringify({
          type: "error",
          message: t("CORE_COMMON_PROFILE_NAME_INVALID")
        });
      }
      if (userType === "employee" && !new RegExp(/^[6-9]{1}[0-9]{9}$/).test(mobileNumber)) {
        throw JSON.stringify({
          type: "error",
          message: t("CORE_COMMON_PROFILE_MOBILE_NUMBER_INVALID")
        });
      }
      if (email.length && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        throw JSON.stringify({
          type: "error",
          message: t("CORE_COMMON_PROFILE_EMAIL_INVALID")
        });
      }
      if (currentPassword.length || newPassword.length || confirmPassword.length) {
        if (newPassword !== confirmPassword) {
          throw JSON.stringify({
            type: "error",
            message: t("CORE_COMMON_PROFILE_PASSWORD_MISMATCH")
          });
        }
        if (!(currentPassword.length && newPassword.length && confirmPassword.length)) {
          throw JSON.stringify({
            type: "error",
            message: t("CORE_COMMON_PROFILE_PASSWORD_INVALID")
          });
        }
        if (!new RegExp(/^([a-zA-Z0-9@#$%]{8,15})$/i).test(newPassword) && !new RegExp(/^([a-zA-Z0-9@#$%]{8,15})$/i).test(confirmPassword)) {
          throw JSON.stringify({
            type: "error",
            message: t("CORE_COMMON_PROFILE_PASSWORD_INVALID")
          });
        }
      }
      requestData["locale"] = Digit.StoreData.getCurrentLanguage();
      const {
        responseInfo,
        user
      } = await Digit.UserService.updateUser(requestData, stateCode);
      if (responseInfo && responseInfo.status === "200") {
        const _user = Digit.UserService.getUser();
        if (_user) {
          Digit.UserService.setUser({
            ..._user,
            info: {
              ..._user.info,
              name,
              mobileNumber,
              emailId: email,
              permanentCity: city
            }
          });
        }
      }
      if (currentPassword.length && newPassword.length && confirmPassword.length) {
        const _requestData = {
          existingPassword: currentPassword,
          newPassword: newPassword,
          tenantId: tenant,
          type: "EMPLOYEE",
          username: userInfo === null || userInfo === void 0 ? void 0 : userInfo.userName,
          confirmPassword: confirmPassword
        };
        if (newPassword === confirmPassword) {
          try {
            const res = await Digit.UserService.changePassword(_requestData, tenant);
            const {
              responseInfo: changePasswordResponseInfo
            } = res;
            if (changePasswordResponseInfo !== null && changePasswordResponseInfo !== void 0 && changePasswordResponseInfo.status && changePasswordResponseInfo.status === "200") {
              showToast("success", t("CORE_COMMON_PROFILE_UPDATE_SUCCESS_WITH_PASSWORD"), 5000);
            } else {
              throw "";
            }
          } catch (error) {
            var _error$Errors, _error$Errors$at;
            throw JSON.stringify({
              type: "error",
              message: (_error$Errors = error.Errors) !== null && _error$Errors !== void 0 && (_error$Errors$at = _error$Errors.at(0)) !== null && _error$Errors$at !== void 0 && _error$Errors$at.description ? error.Errors.at(0).description : t("CORE_COMMON_PROFILE_UPDATE_ERROR_WITH_PASSWORD")
            });
          }
        } else {
          throw JSON.stringify({
            type: "error",
            message: t("CORE_COMMON_PROFILE_ERROR_PASSWORD_NOT_MATCH")
          });
        }
      } else if (responseInfo !== null && responseInfo !== void 0 && responseInfo.status && responseInfo.status === "200") {
        showToast("success", t("CORE_COMMON_PROFILE_UPDATE_SUCCESS"), 5000);
      }
    } catch (error) {
      const errorObj = JSON.parse(error);
      showToast(errorObj.type, t(errorObj.message), 5000);
    }
    setLoading(false);
  };
  let menu = [];
  const {
    data: Menu
  } = Digit.Hooks.pt.useGenderMDMS(stateId, "common-masters", "GenderType");
  Menu && Menu.map(genderDetails => {
    menu.push({
      i18nKey: `PT_COMMON_GENDER_${genderDetails.code}`,
      code: `${genderDetails.code}`,
      value: `${genderDetails.code}`
    });
  });
  const setFileStoreId = async fileStoreId => {
    setProfilePic(fileStoreId);
    const thumbnails = fileStoreId ? await getThumbnails([fileStoreId], stateId) : null;
    setProfileImg(thumbnails === null || thumbnails === void 0 ? void 0 : thumbnails.thumbs[0]);
    closeFileUploadDrawer();
  };
  const getThumbnails = async (ids, tenantId) => {
    const res = await Digit.UploadServices.Filefetch(ids, tenantId);
    if (res.data.fileStoreIds && res.data.fileStoreIds.length !== 0) {
      return {
        thumbs: res.data.fileStoreIds.map(o => o.url.split(",")[3]),
        images: res.data.fileStoreIds.map(o => Digit.Utils.getFileUrl(o.url))
      };
    } else {
      return null;
    }
  };
  if (loading) return /*#__PURE__*/React.createElement(Loader, null);
  return /*#__PURE__*/React.createElement("div", {
    className: "user-profile"
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      margin: userType === "citizen" ? "8px" : "24px",
      position: "relative"
    }
  }, userType === "citizen" ? /*#__PURE__*/React.createElement(BackButton, null) : /*#__PURE__*/React.createElement(BreadCrumb, {
    crumbs: [{
      path: "/digit-ui/employee",
      content: t("ES_COMMON_HOME"),
      show: true
    }, {
      path: "/digit-ui/employee/user/profile",
      content: t("ES_COMMON_PAGE_1"),
      show: url.includes("/user/profile")
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flex: 1,
      flexDirection: windowWidth < 768 || userType === "citizen" ? "column" : "row",
      margin: userType === "citizen" ? "8px" : "16px",
      gap: userType === "citizen" ? "" : "0 24px",
      boxShadow: userType === "citizen" ? "1px 1px 4px 0px rgba(0,0,0,0.2)" : "",
      background: userType === "citizen" ? "white" : "",
      borderRadius: userType === "citizen" ? "4px" : "",
      maxWidth: userType === "citizen" ? "960px" : ""
    }
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      display: "flex",
      flex: userType === "citizen" ? 1 : 2.5,
      justifyContent: "center",
      alignItems: "center",
      maxWidth: "100%",
      height: "320px",
      borderRadius: "4px",
      boxShadow: userType === "citizen" ? "" : "1px 1px 4px 0px rgba(0,0,0,0.2)",
      border: `${userType === "citizen" ? "8px" : "24px"} solid #fff`,
      background: "#EEEEEE",
      padding: userType === "citizen" ? "8px" : "16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: userType === "citizen" ? "114px" : "150px",
      width: userType === "citizen" ? "114px" : "150px",
      margin: "16px"
    }
  }, /*#__PURE__*/React.createElement("img", {
    style: {
      margin: "auto",
      borderRadius: "300px",
      justifyContent: "center",
      height: "100%",
      width: "100%"
    },
    src: !profileImg || profileImg === "" ? defaultImage$2 : profileImg
  }), /*#__PURE__*/React.createElement("button", {
    style: {
      position: "absolute",
      left: "50%",
      bottom: "-24px",
      transform: "translateX(-50%)"
    },
    onClick: onClickAddPic
  }, /*#__PURE__*/React.createElement(CameraIcon, null)))), /*#__PURE__*/React.createElement("section", {
    style: {
      display: "flex",
      flexDirection: "column",
      flex: userType === "citizen" ? 1 : 7.5,
      width: "100%",
      borderRadius: "4px",
      height: "fit-content",
      boxShadow: userType === "citizen" ? "" : "1px 1px 4px 0px rgba(0,0,0,0.2)",
      background: "white",
      padding: userType === "citizen" ? "8px" : "24px",
      paddingBottom: "20px"
    }
  }, userType === "citizen" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LabelFieldPair, null, /*#__PURE__*/React.createElement(CardLabel, {
    style:  {}
  }, `${t("CORE_COMMON_PROFILE_NAME")}`, "*"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: "960px"
    }
  }, /*#__PURE__*/React.createElement(TextInput, Object.assign({
    t: t,
    style: {
      width: "100%"
    },
    type: "text",
    isMandatory: false,
    name: "name",
    value: name,
    onChange: e => setUserName(e.target.value)
  }, validation = {
    isRequired: true,
    pattern: "^[a-zA-Z-.`' ]*$",
    type: "tel",
    title: t("CORE_COMMON_PROFILE_NAME_ERROR_MESSAGE")
  }, {
    disable: editScreen
  })), (errors === null || errors === void 0 ? void 0 : errors.userName) && /*#__PURE__*/React.createElement(CardLabelError, null, " ", errors === null || errors === void 0 ? void 0 : (_errors$userName = errors.userName) === null || _errors$userName === void 0 ? void 0 : _errors$userName.message, " "))), /*#__PURE__*/React.createElement(LabelFieldPair, null, /*#__PURE__*/React.createElement(CardLabel, {
    style:  {}
  }, `${t("CORE_COMMON_PROFILE_GENDER")}`), /*#__PURE__*/React.createElement(Dropdown, {
    style: {
      width: "100%"
    },
    className: "form-field",
    selected: (gender === null || gender === void 0 ? void 0 : gender.length) === 1 ? gender[0] : gender,
    disable: (gender === null || gender === void 0 ? void 0 : gender.length) === 1 || editScreen,
    option: menu,
    select: setGenderName,
    value: gender,
    optionKey: "code",
    t: t,
    name: "gender"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: updateProfile,
    style: {
      marginTop: "24px",
      backgroundColor: "#a82227",
      width: "100%",
      height: "40px",
      color: "white",
      maxWidth: isMobile ? "100%" : "240px",
      borderBottom: "1px solid black"
    }
  }, t("CORE_COMMON_SAVE"))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LabelFieldPair, {
    style: {
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(CardLabel, {
    className: "profile-label-margin",
    style:  {
      width: "300px"
    }
  }, `${t("CORE_COMMON_PROFILE_NAME")}`, "*"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(TextInput, Object.assign({
    t: t,
    type: "text",
    isMandatory: false,
    name: "name",
    value: name,
    onChange: e => setUserName(e.target.value),
    placeholder: "Enter Your Name"
  }, validation = {
    isRequired: true,
    pattern: "^[a-zA-Z-.`' ]*$",
    type: "text",
    title: t("CORE_COMMON_PROFILE_NAME_ERROR_MESSAGE")
  }, {
    disable: editScreen
  })), (errors === null || errors === void 0 ? void 0 : errors.userName) && /*#__PURE__*/React.createElement(CardLabelError, {
    style: {
      margin: 0,
      padding: 0
    }
  }, " ", errors === null || errors === void 0 ? void 0 : (_errors$userName2 = errors.userName) === null || _errors$userName2 === void 0 ? void 0 : _errors$userName2.message, " "))), /*#__PURE__*/React.createElement(LabelFieldPair, {
    style: {
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(CardLabel, {
    className: "profile-label-margin",
    style:  {
      width: "300px"
    }
  }, `${t("CORE_COMMON_PROFILE_GENDER")}`), /*#__PURE__*/React.createElement(Dropdown, {
    style: {
      width: "100%"
    },
    selected: (gender === null || gender === void 0 ? void 0 : gender.length) === 1 ? gender[0] : gender,
    disable: (gender === null || gender === void 0 ? void 0 : gender.length) === 1 || editScreen,
    option: menu,
    select: setGenderName,
    value: gender,
    optionKey: "code",
    t: t,
    name: "gender"
  })), /*#__PURE__*/React.createElement(LabelFieldPair, {
    style: {
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(CardLabel, {
    className: "profile-label-margin",
    style:  {
      width: "300px"
    }
  }, `${t("CORE_COMMON_PROFILE_CITY")}`), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(TextInput, Object.assign({
    t: t,
    type: "text",
    isMandatory: false,
    name: "city",
    value: t(city),
    onChange: e => setCity(e.target.value),
    placeholder: "Enter Your City Name"
  }, validation = {
    isRequired: true,
    type: "text",
    title: t("CORE_COMMON_PROFILE_CITY_ERROR_MESSAGE")
  }, {
    disable: true
  })), /*#__PURE__*/React.createElement(CardLabelError, null))), /*#__PURE__*/React.createElement(LabelFieldPair, {
    style: {
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(CardLabel, {
    className: "profile-label-margin",
    style: {
      width: "300px"
    }
  }, `${t("CORE_COMMON_PROFILE_MOBILE_NUMBER")}*`), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(MobileNumber, Object.assign({
    value: mobileNumber,
    style: {
      width: "100%"
    },
    name: "mobileNumber",
    placeholder: "Enter a valid Mobile No.",
    onChange: value => setUserMobileNumber(value),
    disable: true
  }, {
    required: true,
    pattern: "[6-9]{1}[0-9]{9}",
    type: "tel",
    title: t("CORE_COMMON_PROFILE_MOBILE_NUMBER_INVALID")
  })), (errors === null || errors === void 0 ? void 0 : errors.mobileNumber) && /*#__PURE__*/React.createElement(CardLabelError, {
    style: {
      margin: 0,
      padding: 0
    }
  }, " ", errors === null || errors === void 0 ? void 0 : (_errors$mobileNumber = errors.mobileNumber) === null || _errors$mobileNumber === void 0 ? void 0 : _errors$mobileNumber.message, " "))), /*#__PURE__*/React.createElement(LabelFieldPair, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
    style: {
      color: "#a82227",
      cursor: "default",
      marginBottom: "5",
      cursor: "pointer",
      position: "relative"
    },
    onClick: TogleforPassword
  }, t("CORE_COMMON_CHANGE_PASSWORD")), changepassword ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "10px"
    }
  }, /*#__PURE__*/React.createElement(LabelFieldPair, {
    style: {
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(CardLabel, {
    className: "profile-label-margin",
    style:  {
      width: "300px"
    }
  }, `${t("CORE_COMMON_PROFILE_CURRENT_PASSWORD")}`), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    t: t,
    type: "password",
    isMandatory: false,
    name: "name",
    pattern: "^([a-zA-Z0-9@#$%])+$",
    onChange: e => setUserCurrentPassword(e.target.value),
    disable: editScreen
  }), (errors === null || errors === void 0 ? void 0 : errors.currentPassword) && /*#__PURE__*/React.createElement(CardLabelError, null, errors === null || errors === void 0 ? void 0 : (_errors$currentPasswo = errors.currentPassword) === null || _errors$currentPasswo === void 0 ? void 0 : _errors$currentPasswo.message))), /*#__PURE__*/React.createElement(LabelFieldPair, {
    style: {
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(CardLabel, {
    className: "profile-label-margin",
    style:  {
      width: "300px"
    }
  }, `${t("CORE_COMMON_PROFILE_NEW_PASSWORD")}`), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    t: t,
    type: "password",
    isMandatory: false,
    name: "name",
    pattern: "^([a-zA-Z0-9@#$%])+$",
    onChange: e => setUserNewPassword(e.target.value),
    disable: editScreen
  }), (errors === null || errors === void 0 ? void 0 : errors.newPassword) && /*#__PURE__*/React.createElement(CardLabelError, null, errors === null || errors === void 0 ? void 0 : (_errors$newPassword = errors.newPassword) === null || _errors$newPassword === void 0 ? void 0 : _errors$newPassword.message))), /*#__PURE__*/React.createElement(LabelFieldPair, {
    style: {
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(CardLabel, {
    className: "profile-label-margin",
    style:  {
      width: "300px"
    }
  }, `${t("CORE_COMMON_PROFILE_CONFIRM_PASSWORD")}`), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    t: t,
    type: "password",
    isMandatory: false,
    name: "name",
    pattern: "^([a-zA-Z0-9@#$%])+$",
    onChange: e => setUserConfirmPassword(e.target.value),
    disable: editScreen
  }), (errors === null || errors === void 0 ? void 0 : errors.confirmPassword) && /*#__PURE__*/React.createElement(CardLabelError, null, errors === null || errors === void 0 ? void 0 : (_errors$confirmPasswo = errors.confirmPassword) === null || _errors$confirmPasswo === void 0 ? void 0 : _errors$confirmPasswo.message)))) : ""))))), userType === "employee" ? /*#__PURE__*/React.createElement("div", {
    style: {
      height: "88px",
      backgroundColor: "#FFFFFF",
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "64px",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: updateProfile,
    style: {
      marginTop: "24px",
      backgroundColor: "#a82227",
      width: windowWidth < 768 ? "100%" : "248px",
      height: "40px",
      float: "right",
      margin: windowWidth < 768 ? "0 16px" : "",
      marginRight: windowWidth < 768 ? "16px" : "31px",
      color: "white",
      borderBottom: "1px solid black",
      cursor: "pointer",
      "zIndex": "999"
    }
  }, t("CORE_COMMON_SAVE"))) : "", toast && /*#__PURE__*/React.createElement(Toast, {
    error: toast.key === "error",
    label: t(toast.key === "success" ? `CORE_COMMON_PROFILE_UPDATE_SUCCESS` : toast.action),
    onClose: () => setToast(null),
    style: {
      maxWidth: "670px"
    }
  }), openUploadSlide == true ? /*#__PURE__*/React.createElement(UploadDrawer, {
    setProfilePic: setFileStoreId,
    closeDrawer: closeFileUploadDrawer,
    userType: userType,
    removeProfilePic: removeProfilePic,
    showToast: showToast
  }) : "");
};

const userScreensExempted = ["user/profile", "user/error"];
const EmployeeApp = ({
  stateInfo,
  userDetails,
  CITIZEN,
  cityDetails,
  mobileView,
  handleUserDropdownSelection,
  logoUrl,
  DSO,
  stateCode,
  modules,
  appTenants,
  sourceUrl,
  pathname,
  initData
}) => {
  var _location$pathname;
  const history = useHistory();
  const {
    t
  } = useTranslation();
  const {
    path
  } = useRouteMatch();
  const location = useLocation();
  const showLanguageChange = location === null || location === void 0 ? void 0 : (_location$pathname = location.pathname) === null || _location$pathname === void 0 ? void 0 : _location$pathname.includes("language-selection");
  const isUserProfile = userScreensExempted.some(url => {
    var _location$pathname2;
    return location === null || location === void 0 ? void 0 : (_location$pathname2 = location.pathname) === null || _location$pathname2 === void 0 ? void 0 : _location$pathname2.includes(url);
  });
  useEffect(() => {
    console.log("isMobile", window.Digit.Utils.browser.isMobile(), window.innerWidth);
    Digit.UserService.setType("employee");
  }, []);
  sourceUrl = "https://s3.ap-south-1.amazonaws.com/egov-qa-assets";
  return /*#__PURE__*/React.createElement("div", {
    className: "employee"
  }, /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(Route, {
    path: `${path}/user`
  }, isUserProfile && /*#__PURE__*/React.createElement(TopBarSideBar, {
    t: t,
    stateInfo: stateInfo,
    userDetails: userDetails,
    CITIZEN: CITIZEN,
    cityDetails: cityDetails,
    mobileView: mobileView,
    handleUserDropdownSelection: handleUserDropdownSelection,
    logoUrl: logoUrl,
    showSidebar: isUserProfile ? true : false,
    showLanguageChange: !showLanguageChange
  }), /*#__PURE__*/React.createElement("div", {
    className: isUserProfile ? "grounded-container" : "loginContainer",
    style: isUserProfile ? {
      padding: 0,
      paddingTop: "80px",
      marginLeft: mobileView ? "" : "64px"
    } : {
      "--banner-url": `url(${stateInfo === null || stateInfo === void 0 ? void 0 : stateInfo.bannerUrl})`,
      padding: "0px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "loginnn"
  }, /*#__PURE__*/React.createElement("div", {
    className: "login-logo-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "logoNiua"
  })), /*#__PURE__*/React.createElement("picture", null, /*#__PURE__*/React.createElement("source", {
    id: "backgroung-login",
    media: "(min-width: 950px)",
    srcset: "https://nugp-assets.s3.ap-south-1.amazonaws.com/nugp+asset/Banner+UPYOG+(1920x1080).jpg",
    style: {
      "position": "absolute",
      "height": "100%",
      "width": "100%"
    }
  }), /*#__PURE__*/React.createElement("source", {
    media: "(min-width: 250px)",
    srcset: "https://nugp-assets.s3.ap-south-1.amazonaws.com/nugp+asset/Banner+UPYOG+%28500x900%29.jpg"
  }), /*#__PURE__*/React.createElement("img", {
    src: "https://nugp-assets.s3.ap-south-1.amazonaws.com/nugp+asset/Banner+UPYOG+(1920x1080).jpg",
    alt: "imagealttext",
    style: {
      "position": "absolute",
      "height": "100%",
      "width": "100%",
      "zIndex": "1",
      "display": window.location.href.includes("user/profile") ? "none" : ""
    }
  })), /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(Route, {
    path: `${path}/user/login`
  }, /*#__PURE__*/React.createElement(EmployeeLogin, null)), /*#__PURE__*/React.createElement(Route, {
    path: `${path}/user/forgot-password`
  }, /*#__PURE__*/React.createElement(EmployeeForgotPassword, null)), /*#__PURE__*/React.createElement(Route, {
    path: `${path}/user/change-password`
  }, /*#__PURE__*/React.createElement(EmployeeChangePassword, null)), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/user/profile`
  }, /*#__PURE__*/React.createElement(UserProfile, {
    stateCode: stateCode,
    userType: "employee",
    cityDetails: cityDetails
  })), /*#__PURE__*/React.createElement(Route, {
    path: `${path}/user/error`
  }, /*#__PURE__*/React.createElement(ErrorComponent, {
    initData: initData,
    goToHome: () => {
      history.push("/digit-ui/employee");
    }
  })), /*#__PURE__*/React.createElement(Route, {
    path: `${path}/user/language-selection`
  }, /*#__PURE__*/React.createElement(LanguageSelection, null)), /*#__PURE__*/React.createElement(Route, null, /*#__PURE__*/React.createElement(Redirect, {
    to: `${path}/user/language-selection`
  })))))), /*#__PURE__*/React.createElement(Route, null, /*#__PURE__*/React.createElement(TopBarSideBar, {
    t: t,
    stateInfo: stateInfo,
    userDetails: userDetails,
    CITIZEN: CITIZEN,
    cityDetails: cityDetails,
    mobileView: mobileView,
    handleUserDropdownSelection: handleUserDropdownSelection,
    logoUrl: logoUrl,
    modules: modules
  }), /*#__PURE__*/React.createElement("div", {
    className: `main ${DSO ? "m-auto" : ""}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "employee-app-wrapper"
  }, /*#__PURE__*/React.createElement(ErrorBoundary, {
    initData: initData
  }, /*#__PURE__*/React.createElement(AppModules, {
    stateCode: stateCode,
    userType: "employee",
    modules: modules,
    appTenants: appTenants
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      position: 'fixed',
      bottom: 0,
      backgroundColor: "white",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      color: "black"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      cursor: "pointer",
      fontSize: window.Digit.Utils.browser.isMobile() ? "12px" : "14px",
      fontWeight: "400"
    },
    onClick: () => {
      window.open('https://www.digit.org/', '_blank').focus();
    }
  }, "Powered by DIGIT"), /*#__PURE__*/React.createElement("span", {
    style: {
      margin: "0 10px",
      fontSize: window.Digit.Utils.browser.isMobile() ? "12px" : "14px"
    }
  }, "|"), /*#__PURE__*/React.createElement("a", {
    style: {
      cursor: "pointer",
      fontSize: window.Digit.Utils.browser.isMobile() ? "12px" : "14px",
      fontWeight: "400"
    },
    href: "#",
    target: "_blank"
  }, "UPYOG License"), /*#__PURE__*/React.createElement("span", {
    className: "upyog-copyright-footer",
    style: {
      margin: "0 10px",
      fontSize: window.Digit.Utils.browser.isMobile() ? "12px" : "14px"
    }
  }, "|"), /*#__PURE__*/React.createElement("span", {
    className: "upyog-copyright-footer",
    style: {
      cursor: "pointer",
      fontSize: window.Digit.Utils.browser.isMobile() ? "12px" : "14px",
      fontWeight: "400"
    },
    onClick: () => {
      window.open('https://niua.in/', '_blank').focus();
    }
  }, "Copyright \xA9 2022 National Institute of Urban Affairs")), /*#__PURE__*/React.createElement("div", {
    className: "upyog-copyright-footer-web"
  }, /*#__PURE__*/React.createElement("span", {
    className: "",
    style: {
      cursor: "pointer",
      fontSize: window.Digit.Utils.browser.isMobile() ? "12px" : "14px",
      fontWeight: "400"
    },
    onClick: () => {
      window.open('https://niua.in/', '_blank').focus();
    }
  }, "Copyright \xA9 2022 National Institute of Urban Affairs"))))), /*#__PURE__*/React.createElement(Route, null, /*#__PURE__*/React.createElement(Redirect, {
    to: `${path}/user/language-selection`
  }))));
};

const Home = () => {
  var _citizenServicesObj$s, _citizenServicesObj$p, _citizenServicesObj$p2, _citizenServicesObj$p5, _citizenServicesObj$p6, _citizenServicesObj$p9, _citizenServicesObj$p10, _citizenServicesObj$p13, _citizenServicesObj$p14, _infoAndUpdatesObj$si, _infoAndUpdatesObj$pr, _infoAndUpdatesObj$pr2, _infoAndUpdatesObj$pr5, _infoAndUpdatesObj$pr6, _infoAndUpdatesObj$pr9, _infoAndUpdatesObj$pr10, _infoAndUpdatesObj$pr13, _infoAndUpdatesObj$pr14, _whatsNewSectionObj$s2;
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const tenantId = Digit.ULBService.getCitizenCurrentTenant(true);
  const {
    data: {
      stateInfo,
      uiHomePage
    } = {},
    isLoading
  } = Digit.Hooks.useStore.getInitData();
  let isMobile = window.Digit.Utils.browser.isMobile();
  if (window.Digit.SessionStorage.get("TL_CREATE_TRADE")) window.Digit.SessionStorage.set("TL_CREATE_TRADE", {});
  const conditionsToDisableNotificationCountTrigger = () => {
    var _Digit$UserService, _Digit$UserService$ge, _Digit$UserService$ge2, _Digit$UserService2, _Digit$UserService2$g;
    if (((_Digit$UserService = Digit.UserService) === null || _Digit$UserService === void 0 ? void 0 : (_Digit$UserService$ge = _Digit$UserService.getUser()) === null || _Digit$UserService$ge === void 0 ? void 0 : (_Digit$UserService$ge2 = _Digit$UserService$ge.info) === null || _Digit$UserService$ge2 === void 0 ? void 0 : _Digit$UserService$ge2.type) === "EMPLOYEE") return false;
    if (!((_Digit$UserService2 = Digit.UserService) !== null && _Digit$UserService2 !== void 0 && (_Digit$UserService2$g = _Digit$UserService2.getUser()) !== null && _Digit$UserService2$g !== void 0 && _Digit$UserService2$g.access_token)) return false;
    return true;
  };
  const {
    data: EventsData,
    isLoading: EventsDataLoading
  } = Digit.Hooks.useEvents({
    tenantId,
    variant: "whats-new",
    config: {
      enabled: conditionsToDisableNotificationCountTrigger()
    }
  });
  if (!tenantId) {
    Digit.SessionStorage.get("locale") === null ? history.push(`/digit-ui/citizen/select-language`) : history.push(`/digit-ui/citizen/select-location`);
  }
  const citizenServicesObj = uiHomePage === null || uiHomePage === void 0 ? void 0 : uiHomePage.citizenServicesCard;
  const infoAndUpdatesObj = uiHomePage === null || uiHomePage === void 0 ? void 0 : uiHomePage.informationAndUpdatesCard;
  const whatsNewSectionObj = uiHomePage === null || uiHomePage === void 0 ? void 0 : uiHomePage.whatsNewSection;
  const citizenDesludgingService = {
    header: t("CS_COMMON_CITIZEN_DESLUDGING_SERVICE"),
    options: [{
      name: t("CS_HOME_APPLY_FOR_DESLUDGING"),
      link: '/digit-ui/citizen/fsm/new-application',
      src: 'https://velocity-upyog-assets.s3.ap-south-1.amazonaws.com/Septic+Tank__80x80.png'
    }, {
      name: t("CS_HOME_MY_APPLICATIONS"),
      link: '/digit-ui/citizen/fsm/my-applications',
      src: 'https://velocity-upyog-assets.s3.ap-south-1.amazonaws.com/Applications_80x80.png'
    }]
  };
  const allCitizenServicesProps = {
    header: t(citizenServicesObj === null || citizenServicesObj === void 0 ? void 0 : citizenServicesObj.headerLabel),
    sideOption: {
      name: t(citizenServicesObj === null || citizenServicesObj === void 0 ? void 0 : (_citizenServicesObj$s = citizenServicesObj.sideOption) === null || _citizenServicesObj$s === void 0 ? void 0 : _citizenServicesObj$s.name),
      onClick: () => {
        var _citizenServicesObj$s2;
        return history.push(citizenServicesObj === null || citizenServicesObj === void 0 ? void 0 : (_citizenServicesObj$s2 = citizenServicesObj.sideOption) === null || _citizenServicesObj$s2 === void 0 ? void 0 : _citizenServicesObj$s2.navigationUrl);
      }
    },
    options: [{
      name: t(citizenServicesObj === null || citizenServicesObj === void 0 ? void 0 : (_citizenServicesObj$p = citizenServicesObj.props) === null || _citizenServicesObj$p === void 0 ? void 0 : (_citizenServicesObj$p2 = _citizenServicesObj$p[0]) === null || _citizenServicesObj$p2 === void 0 ? void 0 : _citizenServicesObj$p2.label),
      Icon: /*#__PURE__*/React.createElement(ComplaintIcon, null),
      onClick: () => {
        var _citizenServicesObj$p3, _citizenServicesObj$p4;
        return history.push(citizenServicesObj === null || citizenServicesObj === void 0 ? void 0 : (_citizenServicesObj$p3 = citizenServicesObj.props) === null || _citizenServicesObj$p3 === void 0 ? void 0 : (_citizenServicesObj$p4 = _citizenServicesObj$p3[0]) === null || _citizenServicesObj$p4 === void 0 ? void 0 : _citizenServicesObj$p4.navigationUrl);
      }
    }, {
      name: t(citizenServicesObj === null || citizenServicesObj === void 0 ? void 0 : (_citizenServicesObj$p5 = citizenServicesObj.props) === null || _citizenServicesObj$p5 === void 0 ? void 0 : (_citizenServicesObj$p6 = _citizenServicesObj$p5[1]) === null || _citizenServicesObj$p6 === void 0 ? void 0 : _citizenServicesObj$p6.label),
      Icon: /*#__PURE__*/React.createElement(PTIcon, {
        className: "fill-path-primary-main"
      }),
      onClick: () => {
        var _citizenServicesObj$p7, _citizenServicesObj$p8;
        return history.push(citizenServicesObj === null || citizenServicesObj === void 0 ? void 0 : (_citizenServicesObj$p7 = citizenServicesObj.props) === null || _citizenServicesObj$p7 === void 0 ? void 0 : (_citizenServicesObj$p8 = _citizenServicesObj$p7[1]) === null || _citizenServicesObj$p8 === void 0 ? void 0 : _citizenServicesObj$p8.navigationUrl);
      }
    }, {
      name: t(citizenServicesObj === null || citizenServicesObj === void 0 ? void 0 : (_citizenServicesObj$p9 = citizenServicesObj.props) === null || _citizenServicesObj$p9 === void 0 ? void 0 : (_citizenServicesObj$p10 = _citizenServicesObj$p9[2]) === null || _citizenServicesObj$p10 === void 0 ? void 0 : _citizenServicesObj$p10.label),
      Icon: /*#__PURE__*/React.createElement(CaseIcon, {
        className: "fill-path-primary-main"
      }),
      onClick: () => {
        var _citizenServicesObj$p11, _citizenServicesObj$p12;
        return history.push(citizenServicesObj === null || citizenServicesObj === void 0 ? void 0 : (_citizenServicesObj$p11 = citizenServicesObj.props) === null || _citizenServicesObj$p11 === void 0 ? void 0 : (_citizenServicesObj$p12 = _citizenServicesObj$p11[2]) === null || _citizenServicesObj$p12 === void 0 ? void 0 : _citizenServicesObj$p12.navigationUrl);
      }
    }, {
      name: t(citizenServicesObj === null || citizenServicesObj === void 0 ? void 0 : (_citizenServicesObj$p13 = citizenServicesObj.props) === null || _citizenServicesObj$p13 === void 0 ? void 0 : (_citizenServicesObj$p14 = _citizenServicesObj$p13[3]) === null || _citizenServicesObj$p14 === void 0 ? void 0 : _citizenServicesObj$p14.label),
      Icon: /*#__PURE__*/React.createElement(WSICon, null),
      onClick: () => {
        var _citizenServicesObj$p15, _citizenServicesObj$p16;
        return history.push(citizenServicesObj === null || citizenServicesObj === void 0 ? void 0 : (_citizenServicesObj$p15 = citizenServicesObj.props) === null || _citizenServicesObj$p15 === void 0 ? void 0 : (_citizenServicesObj$p16 = _citizenServicesObj$p15[3]) === null || _citizenServicesObj$p16 === void 0 ? void 0 : _citizenServicesObj$p16.navigationUrl);
      }
    }],
    styles: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      width: "100%"
    }
  };
  const allInfoAndUpdatesProps = {
    header: t(infoAndUpdatesObj === null || infoAndUpdatesObj === void 0 ? void 0 : infoAndUpdatesObj.headerLabel),
    sideOption: {
      name: t(infoAndUpdatesObj === null || infoAndUpdatesObj === void 0 ? void 0 : (_infoAndUpdatesObj$si = infoAndUpdatesObj.sideOption) === null || _infoAndUpdatesObj$si === void 0 ? void 0 : _infoAndUpdatesObj$si.name),
      onClick: () => {
        var _infoAndUpdatesObj$si2;
        return history.push(infoAndUpdatesObj === null || infoAndUpdatesObj === void 0 ? void 0 : (_infoAndUpdatesObj$si2 = infoAndUpdatesObj.sideOption) === null || _infoAndUpdatesObj$si2 === void 0 ? void 0 : _infoAndUpdatesObj$si2.navigationUrl);
      }
    },
    options: [{
      name: t(infoAndUpdatesObj === null || infoAndUpdatesObj === void 0 ? void 0 : (_infoAndUpdatesObj$pr = infoAndUpdatesObj.props) === null || _infoAndUpdatesObj$pr === void 0 ? void 0 : (_infoAndUpdatesObj$pr2 = _infoAndUpdatesObj$pr[0]) === null || _infoAndUpdatesObj$pr2 === void 0 ? void 0 : _infoAndUpdatesObj$pr2.label),
      Icon: /*#__PURE__*/React.createElement(HomeIcon, null),
      onClick: () => {
        var _infoAndUpdatesObj$pr3, _infoAndUpdatesObj$pr4;
        return history.push(infoAndUpdatesObj === null || infoAndUpdatesObj === void 0 ? void 0 : (_infoAndUpdatesObj$pr3 = infoAndUpdatesObj.props) === null || _infoAndUpdatesObj$pr3 === void 0 ? void 0 : (_infoAndUpdatesObj$pr4 = _infoAndUpdatesObj$pr3[0]) === null || _infoAndUpdatesObj$pr4 === void 0 ? void 0 : _infoAndUpdatesObj$pr4.navigationUrl);
      }
    }, {
      name: t(infoAndUpdatesObj === null || infoAndUpdatesObj === void 0 ? void 0 : (_infoAndUpdatesObj$pr5 = infoAndUpdatesObj.props) === null || _infoAndUpdatesObj$pr5 === void 0 ? void 0 : (_infoAndUpdatesObj$pr6 = _infoAndUpdatesObj$pr5[1]) === null || _infoAndUpdatesObj$pr6 === void 0 ? void 0 : _infoAndUpdatesObj$pr6.label),
      Icon: /*#__PURE__*/React.createElement(Calender, null),
      onClick: () => {
        var _infoAndUpdatesObj$pr7, _infoAndUpdatesObj$pr8;
        return history.push(infoAndUpdatesObj === null || infoAndUpdatesObj === void 0 ? void 0 : (_infoAndUpdatesObj$pr7 = infoAndUpdatesObj.props) === null || _infoAndUpdatesObj$pr7 === void 0 ? void 0 : (_infoAndUpdatesObj$pr8 = _infoAndUpdatesObj$pr7[1]) === null || _infoAndUpdatesObj$pr8 === void 0 ? void 0 : _infoAndUpdatesObj$pr8.navigationUrl);
      }
    }, {
      name: t(infoAndUpdatesObj === null || infoAndUpdatesObj === void 0 ? void 0 : (_infoAndUpdatesObj$pr9 = infoAndUpdatesObj.props) === null || _infoAndUpdatesObj$pr9 === void 0 ? void 0 : (_infoAndUpdatesObj$pr10 = _infoAndUpdatesObj$pr9[2]) === null || _infoAndUpdatesObj$pr10 === void 0 ? void 0 : _infoAndUpdatesObj$pr10.label),
      Icon: /*#__PURE__*/React.createElement(DocumentIcon, null),
      onClick: () => {
        var _infoAndUpdatesObj$pr11, _infoAndUpdatesObj$pr12;
        return history.push(infoAndUpdatesObj === null || infoAndUpdatesObj === void 0 ? void 0 : (_infoAndUpdatesObj$pr11 = infoAndUpdatesObj.props) === null || _infoAndUpdatesObj$pr11 === void 0 ? void 0 : (_infoAndUpdatesObj$pr12 = _infoAndUpdatesObj$pr11[2]) === null || _infoAndUpdatesObj$pr12 === void 0 ? void 0 : _infoAndUpdatesObj$pr12.navigationUrl);
      }
    }, {
      name: t(infoAndUpdatesObj === null || infoAndUpdatesObj === void 0 ? void 0 : (_infoAndUpdatesObj$pr13 = infoAndUpdatesObj.props) === null || _infoAndUpdatesObj$pr13 === void 0 ? void 0 : (_infoAndUpdatesObj$pr14 = _infoAndUpdatesObj$pr13[3]) === null || _infoAndUpdatesObj$pr14 === void 0 ? void 0 : _infoAndUpdatesObj$pr14.label),
      Icon: /*#__PURE__*/React.createElement(DocumentIcon, null),
      onClick: () => {
        var _infoAndUpdatesObj$pr15, _infoAndUpdatesObj$pr16;
        return history.push(infoAndUpdatesObj === null || infoAndUpdatesObj === void 0 ? void 0 : (_infoAndUpdatesObj$pr15 = infoAndUpdatesObj.props) === null || _infoAndUpdatesObj$pr15 === void 0 ? void 0 : (_infoAndUpdatesObj$pr16 = _infoAndUpdatesObj$pr15[3]) === null || _infoAndUpdatesObj$pr16 === void 0 ? void 0 : _infoAndUpdatesObj$pr16.navigationUrl);
      }
    }],
    styles: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      width: "100%"
    }
  };
  return isLoading ? /*#__PURE__*/React.createElement(Loader, null) : /*#__PURE__*/React.createElement("div", {
    className: "HomePageContainer",
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "HomePageWrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "BannerWithSearch"
  }, isMobile ? /*#__PURE__*/React.createElement("img", {
    src: "https://velocity-upyog-assets.s3.ap-south-1.amazonaws.com/mobile_banner_3.png"
  }) : /*#__PURE__*/React.createElement("img", {
    src: "https://velocity-upyog-assets.s3.ap-south-1.amazonaws.com/home_banner_3.png"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ServicesSection"
  }), /*#__PURE__*/React.createElement("div", {
    className: "citizen-desludging-content"
  }, /*#__PURE__*/React.createElement("h2", null, citizenDesludgingService === null || citizenDesludgingService === void 0 ? void 0 : citizenDesludgingService.header), citizenDesludgingService === null || citizenDesludgingService === void 0 ? void 0 : citizenDesludgingService.options.map((props, index) => /*#__PURE__*/React.createElement("div", {
    className: "citizen-desludging-conten-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "citizen-desludging-conten-wrapper-inner-img"
  }, /*#__PURE__*/React.createElement("img", {
    src: props.src,
    style: {
      width: "70%"
    }
  })), /*#__PURE__*/React.createElement(Link, {
    key: index,
    to: props.link
  }, /*#__PURE__*/React.createElement("p", null, props.name)))))), conditionsToDisableNotificationCountTrigger() ? EventsDataLoading ? /*#__PURE__*/React.createElement(Loader, null) : /*#__PURE__*/React.createElement("div", {
    className: "WhatsNewSection"
  }, /*#__PURE__*/React.createElement("div", {
    className: "headSection"
  }, /*#__PURE__*/React.createElement("h2", null, t(whatsNewSectionObj === null || whatsNewSectionObj === void 0 ? void 0 : whatsNewSectionObj.headerLabel)), /*#__PURE__*/React.createElement("p", {
    onClick: () => {
      var _whatsNewSectionObj$s;
      return history.push(whatsNewSectionObj === null || whatsNewSectionObj === void 0 ? void 0 : (_whatsNewSectionObj$s = whatsNewSectionObj.sideOption) === null || _whatsNewSectionObj$s === void 0 ? void 0 : _whatsNewSectionObj$s.navigationUrl);
    }
  }, t(whatsNewSectionObj === null || whatsNewSectionObj === void 0 ? void 0 : (_whatsNewSectionObj$s2 = whatsNewSectionObj.sideOption) === null || _whatsNewSectionObj$s2 === void 0 ? void 0 : _whatsNewSectionObj$s2.name))), /*#__PURE__*/React.createElement(WhatsNewCard, EventsData === null || EventsData === void 0 ? void 0 : EventsData[0])) : null));
};

const LanguageSelection$1 = () => {
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const {
    data: {
      languages,
      stateInfo
    } = {},
    isLoading
  } = Digit.Hooks.useStore.getInitData();
  const selectedLanguage = Digit.StoreData.getCurrentLanguage();
  const texts = useMemo(() => ({
    header: t("CS_COMMON_CHOOSE_LANGUAGE"),
    submitBarLabel: t("CORE_COMMON_CONTINUE")
  }), [t]);
  const RadioButtonProps = useMemo(() => ({
    options: languages,
    optionsKey: "label",
    additionalWrapperClass: "reverse-radio-selection-wrapper",
    onSelect: language => Digit.LocalizationService.changeLanguage(language.value, stateInfo.code),
    selectedOption: languages === null || languages === void 0 ? void 0 : languages.filter(i => i.value === selectedLanguage)[0]
  }), [selectedLanguage, languages]);
  function onSubmit() {
    history.push(`/digit-ui/citizen/select-location`);
  }
  return isLoading ? /*#__PURE__*/React.createElement(Loader, null) : /*#__PURE__*/React.createElement("div", {
    className: "selection-card-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "main-banner-image",
    style: window.innerWidth <= 565 ? {
      marginBottom: "30px"
    } : {
      float: "left",
      width: "80%"
    }
  }, /*#__PURE__*/React.createElement("img", {
    className: "city",
    id: "topbar-logo",
    src: window.innerWidth <= 565 ? "https://velocity-upyog-assets.s3.ap-south-1.amazonaws.com/mobile_banner_3.png" : "https://velocity-upyog-assets.s3.ap-south-1.amazonaws.com/desktop_banner_2.png" ,
    alt: "unicef",
    style: {
      width: "100%"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "left-side_content",
    style: window.innerWidth <= 565 ? {} : {
      float: "right",
      marginRight: "-200px",
      width: "35%"
    }
  }, /*#__PURE__*/React.createElement(PageBasedInput, {
    texts: texts,
    onSubmit: onSubmit
  }, /*#__PURE__*/React.createElement(CardHeader, null, t("CS_COMMON_CHOOSE_LANGUAGE")), /*#__PURE__*/React.createElement(RadioButtons, RadioButtonProps))));
};

const LocationSelection = () => {
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const {
    data: cities,
    isLoading
  } = Digit.Hooks.useTenants();
  const [selectedCity, setSelectedCity] = useState(() => ({
    code: Digit.ULBService.getCitizenCurrentTenant(true)
  }));
  const [showError, setShowError] = useState(false);
  const texts = useMemo(() => ({
    header: t("CS_COMMON_CHOOSE_LOCATION"),
    submitBarLabel: t("CORE_COMMON_CONTINUE")
  }), [t]);
  function selectCity(city) {
    setSelectedCity(city);
    setShowError(false);
  }
  const RadioButtonProps = useMemo(() => {
    return {
      options: cities,
      optionsKey: "i18nKey",
      additionalWrapperClass: "reverse-radio-selection-wrapper",
      onSelect: selectCity,
      selectedOption: selectedCity
    };
  }, [cities, t, selectedCity]);
  function onSubmit() {
    if (selectedCity) {
      var _location$state;
      Digit.SessionStorage.set("CITIZEN.COMMON.HOME.CITY", selectedCity);
      const redirectBackTo = (_location$state = location.state) === null || _location$state === void 0 ? void 0 : _location$state.redirectBackTo;
      if (redirectBackTo) {
        history.replace(redirectBackTo);
      } else history.push("/digit-ui/citizen");
    } else {
      setShowError(true);
    }
  }
  return isLoading ? /*#__PURE__*/React.createElement("loader", null) : /*#__PURE__*/React.createElement("div", {
    className: "selection-card-wrapper"
  }, /*#__PURE__*/React.createElement(BackButton, null), /*#__PURE__*/React.createElement("div", {
    className: "main-banner-image",
    style: window.innerWidth <= 565 ? {
      marginBottom: "30px"
    } : {
      float: "left",
      width: "80%"
    }
  }, /*#__PURE__*/React.createElement("img", {
    className: "city",
    id: "topbar-logo",
    src: window.innerWidth <= 565 ? "https://velocity-upyog-assets.s3.ap-south-1.amazonaws.com/mobile_banner_3.png" : "https://velocity-upyog-assets.s3.ap-south-1.amazonaws.com/desktop_banner_2.png" ,
    alt: "unicef",
    style: {
      width: "100%"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "left-side_content",
    style: window.innerWidth <= 565 ? {} : {
      float: "right",
      marginRight: "-200px",
      width: "35%"
    }
  }, /*#__PURE__*/React.createElement(PageBasedInput, {
    texts: texts,
    onSubmit: onSubmit,
    className: "location-selection-container"
  }, /*#__PURE__*/React.createElement(CardHeader, null, t("CS_COMMON_CHOOSE_LOCATION")), /*#__PURE__*/React.createElement(SearchOnRadioButtons, Object.assign({}, RadioButtonProps, {
    placeholder: t("COMMON_TABLE_SEARCH")
  })), showError ? /*#__PURE__*/React.createElement(CardLabelError, null, t("CS_COMMON_LOCATION_SELECTION_ERROR")) : null)));
};

const FaqComponent = props => {
  const {
    question,
    answer,
    subAnswer,
    lastIndex
  } = props;
  const [isOpen, toggleOpen] = useState(false);
  const {
    t
  } = useTranslation();
  const isMobile = window.Digit.Utils.browser.isMobile();
  return /*#__PURE__*/React.createElement("div", {
    className: "faqs border-none",
    onClick: () => toggleOpen(!isOpen)
  }, /*#__PURE__*/React.createElement("div", {
    className: "faq-question",
    style: {
      justifyContent: t(question).length > 30 && isOpen ? "revert" : "space-between",
      display: Digit.Utils.browser.isMobile() && t(question).length > 30 && isOpen ? "block" : "flex"
    }
  }, /*#__PURE__*/React.createElement("span", null, t(question)), /*#__PURE__*/React.createElement("span", {
    className: isOpen ? "faqicon rotate" : "faqicon",
    style: isMobile ? {
      float: "right"
    } : {
      float: "right"
    }
  }, isOpen ? /*#__PURE__*/React.createElement(ArrowForward, null) : /*#__PURE__*/React.createElement(ArrowForward, null))), /*#__PURE__*/React.createElement("div", {
    className: "faq-answer",
    style: isOpen ? {
      display: "block"
    } : {
      display: "none"
    }
  }, /*#__PURE__*/React.createElement("span", null, t(answer) + t(subAnswer))), !lastIndex ? /*#__PURE__*/React.createElement("div", {
    className: "cs-box-border"
  }) : null);
};

const FAQsSection = ({
  module
}) => {
  var _user$info, _data$MdmsRes$common, _data$MdmsRes$common$;
  const user = Digit.UserService.getUser();
  const tenantId = (user === null || user === void 0 ? void 0 : (_user$info = user.info) === null || _user$info === void 0 ? void 0 : _user$info.tenantId) || Digit.ULBService.getCurrentTenantId();
  const {
    t
  } = useTranslation();
  const {
    isLoading,
    data
  } = Digit.Hooks.useGetFAQsJSON(Digit.ULBService.getStateId());
  const moduleFaqs = data === null || data === void 0 ? void 0 : (_data$MdmsRes$common = data.MdmsRes["common-masters"]) === null || _data$MdmsRes$common === void 0 ? void 0 : (_data$MdmsRes$common$ = _data$MdmsRes$common.faqs[0]) === null || _data$MdmsRes$common$ === void 0 ? void 0 : _data$MdmsRes$common$[`${module}`].faqs;
  if (isLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return /*#__PURE__*/React.createElement(Fragment$1, null, /*#__PURE__*/React.createElement("div", {
    className: "faq-page"
  }, /*#__PURE__*/React.createElement(BackButton, {
    style: {
      marginLeft: "unset"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "15px"
    }
  }, /*#__PURE__*/React.createElement(Header$1, {
    styles: {
      marginLeft: "0px",
      paddingTop: "10px",
      fontSize: "32px"
    }
  }, t("FAQ_S"))), /*#__PURE__*/React.createElement("div", {
    className: "faq-list"
  }, moduleFaqs.map((faq, i) => /*#__PURE__*/React.createElement(FaqComponent, {
    key: "faq_" + i,
    question: faq.question,
    answer: faq.answer,
    subAnswer: faq.subAnswer ? faq.subAnswer : "",
    lastIndex: i === (moduleFaqs === null || moduleFaqs === void 0 ? void 0 : moduleFaqs.length) - 1
  })))));
};

const HowItWorks = ({
  module
}) => {
  var _user$info, _data$MdmsRes$common, _data$MdmsRes$common$;
  const isMobile = window.Digit.Utils.browser.isMobile();
  const user = Digit.UserService.getUser();
  const tenantId = (user === null || user === void 0 ? void 0 : (_user$info = user.info) === null || _user$info === void 0 ? void 0 : _user$info.tenantId) || Digit.ULBService.getCurrentTenantId();
  const {
    t
  } = useTranslation();
  const storeData = Digit.SessionStorage.get("initData");
  const stateInfo = storeData.stateInfo;
  const selectedLanguage = Digit.StoreData.getCurrentLanguage();
  const [selected, setselected] = useState(selectedLanguage);
  const handleChangeLanguage = language => {
    setselected(language.value);
    Digit.LocalizationService.changeLanguage(language.value, stateInfo.code);
  };
  const [videoPlay, setVideoPlay] = useState(false);
  const [vidSrc, setVidSrc] = useState("");
  const ViDSvg = () => /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 24C5.38053 24 0 18.6143 0 12C0 5.38054 5.38053 1.90735e-06 12 1.90735e-06C18.6143 1.90735e-06 24 5.38054 24 12C24 18.6143 18.6143 24 12 24ZM16.3488 10.7852L11.3855 7.25251C11.1263 7.0701 10.8238 6.97889 10.5214 6.97889C10.291 6.97889 10.0557 7.03172 9.83976 7.14202C9.34054 7.40118 9.02857 7.91006 9.02857 8.46694L9.02877 15.5323C9.02877 16.0892 9.34076 16.5979 9.83996 16.8572C10.3344 17.1116 10.9296 17.0732 11.3857 16.7467L16.349 13.214C16.7426 12.9356 16.9778 12.4795 16.9778 11.9996C16.9776 11.5197 16.7426 11.0636 16.3489 10.7852L16.3488 10.7852Z",
    fill: "white"
  }));
  function CloseVidSvg({
    onClick
  }) {
    return /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 14 14",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      onClick: onClick
    }, /*#__PURE__*/React.createElement("path", {
      d: "M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z",
      fill: "white"
    }));
  }
  const onClickVideo = vidObj => {
    if (selected === "hi_IN") {
      setVidSrc(vidObj["hi_IN"]);
    } else {
      setVidSrc(vidObj["en_IN"]);
    }
    setVideoPlay(true);
  };
  const onClose = () => {
    setVideoPlay(false);
  };
  const {
    isLoading,
    data
  } = Digit.Hooks.useGetHowItWorksJSON(Digit.ULBService.getStateId());
  const mdmsConfigResult = data === null || data === void 0 ? void 0 : (_data$MdmsRes$common = data.MdmsRes["common-masters"]) === null || _data$MdmsRes$common === void 0 ? void 0 : (_data$MdmsRes$common$ = _data$MdmsRes$common.howItWorks[0]) === null || _data$MdmsRes$common$ === void 0 ? void 0 : _data$MdmsRes$common$[`${module}`];
  const languages = [{
    label: "ENGLISH",
    value: "en_IN"
  }, {
    label: "हिंदी",
    value: "hi_IN"
  }];
  if (isLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return /*#__PURE__*/React.createElement(Fragment$1, null, /*#__PURE__*/React.createElement("div", {
    className: "how-it-works-page"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "-10px"
    }
  }, /*#__PURE__*/React.createElement(BackButton, null)), /*#__PURE__*/React.createElement("div", {
    className: "how-it-works-page-header"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: isMobile ? "-15px" : ""
    }
  }, /*#__PURE__*/React.createElement(Header$1, null, t("HOW_IT_WORKS")))), /*#__PURE__*/React.createElement("div", {
    className: "language-selector",
    style: {
      marginBottom: "10px"
    }
  }, languages.map((language, index) => /*#__PURE__*/React.createElement("div", {
    className: "language-button-container",
    key: index
  }, /*#__PURE__*/React.createElement(CustomButton, {
    selected: language.value === selected,
    text: language.label,
    onClick: () => handleChangeLanguage(language)
  })))), mdmsConfigResult.videosJson.map((videos, index) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "WhatsNewCard",
    style: {
      float: "left",
      position: "relative",
      width: "100%",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "video-icon",
    onClick: () => onClickVideo(videos)
  }, /*#__PURE__*/React.createElement("div", {
    className: "vid-svg"
  }, /*#__PURE__*/React.createElement(ViDSvg, null))), /*#__PURE__*/React.createElement("div", {
    className: "how-it-works-header-description"
  }, /*#__PURE__*/React.createElement("h2", null, t(videos.headerLabel)), /*#__PURE__*/React.createElement("p", null, t(videos.description)))))), /*#__PURE__*/React.createElement("div", {
    className: "WhatsNewCard",
    style: {
      position: "relative",
      width: "100%",
      marginBottom: 10,
      display: "inline-block"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "how-it-works-pdf-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pdf-icon-header-desc"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pdf-icon"
  }, /*#__PURE__*/React.createElement(PDFSvg, null)), /*#__PURE__*/React.createElement("div", {
    className: "pdf-header-desc"
  }, /*#__PURE__*/React.createElement("h2", null, t(mdmsConfigResult.pdfHeader)), /*#__PURE__*/React.createElement("p", null, t(mdmsConfigResult.pdfDesc)))), /*#__PURE__*/React.createElement("div", {
    className: "download-icon"
  }, /*#__PURE__*/React.createElement(DownloadImgIcon, null)))), videoPlay && /*#__PURE__*/React.createElement("div", {
    className: "how-it-works-video-play"
  }, /*#__PURE__*/React.createElement("div", {
    className: "close-button",
    style: {
      position: "absolute",
      right: "15px",
      top: "10%",
      zIndex: "1"
    }
  }, /*#__PURE__*/React.createElement(CloseVidSvg, {
    onClick: onClose
  })), /*#__PURE__*/React.createElement("video", {
    width: 500,
    height: 500,
    controls: true,
    autoPlay: true,
    muted: true,
    style: {
      position: "fixed",
      top: "0",
      left: "0",
      minWidth: "100%",
      minHeight: "100%",
      backgroundColor: "rgba(0,0,0,0.5)"
    }
  }, /*#__PURE__*/React.createElement("source", {
    src: vidSrc,
    type: "video/mp4"
  })))));
};

const StaticDynamicCard = ({
  moduleCode
}) => {
  var _mdmsData$MdmsRes$com, _mdmsData$MdmsRes$com2, _mdmsConfigResult$hel, _mdmsConfigResult$hel2, _mdmsConfigResult$hel3, _mdmsConfigResult$hel4, _mdmsConfigResult$hel5, _mdmsConfigResult$hel6, _staticData, _staticData2, _staticData3, _staticData4, _staticData5, _staticContent, _staticContent2, _staticContent3;
  const {
    t
  } = useTranslation();
  const tenantId = Digit.ULBService.getCitizenCurrentTenant();
  const {
    isLoading: isMdmsLoading,
    data: mdmsData
  } = Digit.Hooks.useStaticData(Digit.ULBService.getStateId());
  const {
    isLoading: isSearchLoading,
    error,
    data: dynamicData,
    isSuccess
  } = Digit.Hooks.useDynamicData({
    moduleCode,
    tenantId: tenantId,
    filters: {},
    t
  });
  const isMobile = window.Digit.Utils.browser.isMobile();
  const handleClickOnWhatsApp = obj => {
    window.open(obj);
  };
  if (window.location.href.includes("tl") && window.Digit.SessionStorage.get("TL_CREATE_TRADE")) window.Digit.SessionStorage.set("TL_CREATE_TRADE", {});
  const IconComponent = ({
    module,
    styles
  }) => {
    switch (module) {
      case 'TL':
        return /*#__PURE__*/React.createElement(CaseIcon, {
          className: "fill-path-primary-main",
          styles: styles
        });
      case 'PT':
        return /*#__PURE__*/React.createElement(PTIcon, {
          className: "fill-path-primary-main",
          styles: styles
        });
      case 'MCOLLECT':
        return /*#__PURE__*/React.createElement(MCollectIcon, {
          className: "fill-path-primary-main",
          styles: styles
        });
      case 'PGR':
        return /*#__PURE__*/React.createElement(PTIcon, {
          className: "fill-path-primary-main",
          styles: styles
        });
      case 'WS':
        return /*#__PURE__*/React.createElement(WSICon, {
          className: "fill-path-primary-main",
          styles: styles
        });
      case 'OBPS':
        return /*#__PURE__*/React.createElement(BPAHomeIcon, {
          className: "fill-path-primary-main",
          styles: styles
        });
      default:
        return /*#__PURE__*/React.createElement(CaseIcon, {
          className: "fill-path-primary-main",
          styles: styles
        });
    }
  };
  const mdmsConfigResult = mdmsData === null || mdmsData === void 0 ? void 0 : (_mdmsData$MdmsRes$com = mdmsData.MdmsRes["common-masters"]) === null || _mdmsData$MdmsRes$com === void 0 ? void 0 : (_mdmsData$MdmsRes$com2 = _mdmsData$MdmsRes$com.StaticData[0]) === null || _mdmsData$MdmsRes$com2 === void 0 ? void 0 : _mdmsData$MdmsRes$com2[`${moduleCode}`];
  const StaticDataIconComponentOne = ({
    module
  }) => {
    switch (module) {
      case 'PT':
      case 'WS':
        return /*#__PURE__*/React.createElement("span", {
          className: "timerIcon"
        }, /*#__PURE__*/React.createElement(TimerIcon, null));
      default:
        return null;
    }
  };
  const StaticDataIconComponentTwo = ({
    module
  }) => {
    switch (module) {
      case 'PT':
        return /*#__PURE__*/React.createElement("span", {
          className: "rupeeSymbol"
        }, /*#__PURE__*/React.createElement(RupeeSymbol, null));
      case 'WS':
        return /*#__PURE__*/React.createElement("span", {
          className: "timerIcon"
        }, /*#__PURE__*/React.createElement(TimerIcon, null));
      default:
        return null;
    }
  };
  const staticContent = module => {
    switch (module) {
      case 'TL':
        return {
          staticCommonContent: t("TL_VALIDITY")
        };
      case 'MCOLLECT':
        return {
          staticCommonContent: t("CHALLAN_VALIDITY")
        };
      case 'PGR':
        return {
          staticCommonContent: t("CATEGORIES_OF_COMPLAINT_TYPES_CAN_BE_SUBMITTED_ON_GRIEVANCE_PORTAL")
        };
      case 'OBPS':
        return {
          staticCommonContent: t("BUILDING_PLAN_PERMIT_VALIDITY"),
          validity: (mdmsConfigResult === null || mdmsConfigResult === void 0 ? void 0 : mdmsConfigResult.validity) + " " + ((mdmsConfigResult === null || mdmsConfigResult === void 0 ? void 0 : mdmsConfigResult.validity) === "1" ? t("COMMON_DAY") : t("COMMON_DAYS"))
        };
      default:
        return {
          staticCommonContent: ""
        };
    }
  };
  const staticData = module => {
    switch (module) {
      case 'PT':
        return {
          staticDataOne: (mdmsConfigResult === null || mdmsConfigResult === void 0 ? void 0 : mdmsConfigResult.staticDataOne) + " " + t("COMMON_DAYS"),
          staticDataOneHeader: t("APPLICATION_PROCESSING_TIME"),
          staticDataTwo: mdmsConfigResult === null || mdmsConfigResult === void 0 ? void 0 : mdmsConfigResult.staticDataTwo,
          staticDataTwoHeader: t("APPLICATION_PROCESSING_FEE")
        };
      case 'WS':
        return {
          staticDataOne: "",
          staticDataOneHeader: t("PAY_WATER_CHARGES_BY") + " " + (mdmsConfigResult === null || mdmsConfigResult === void 0 ? void 0 : mdmsConfigResult.staticDataOne) + " " + t("COMMON_DAYS") + " " + t("OF_BILL_GEN_TO_AVOID_LATE_FEE"),
          staticDataTwo: (mdmsConfigResult === null || mdmsConfigResult === void 0 ? void 0 : mdmsConfigResult.staticDataTwo) + " " + t("COMMON_DAYS"),
          staticDataTwoHeader: t("APPLICATION_PROCESSING_TIME")
        };
      default:
        return {};
    }
  };
  if (isMdmsLoading || isSearchLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return mdmsConfigResult ? /*#__PURE__*/React.createElement(React.Fragment, null, mdmsConfigResult && mdmsConfigResult !== null && mdmsConfigResult !== void 0 && mdmsConfigResult.payViaWhatsApp ? /*#__PURE__*/React.createElement(Card, {
    style: {
      margin: "16px",
      padding: "16px",
      maxWidth: "unset"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "pay-whatsapp-card",
    onClick: () => handleClickOnWhatsApp(mdmsConfigResult === null || mdmsConfigResult === void 0 ? void 0 : mdmsConfigResult.payViaWhatsApp)
  }, /*#__PURE__*/React.createElement("div", {
    className: "pay-whatsapp-text"
  }, t("PAY_VIA_WHATSAPP")), /*#__PURE__*/React.createElement("div", {
    className: "whatsAppIconG"
  }, /*#__PURE__*/React.createElement(WhatsappIconGreen, null)))) : null, mdmsConfigResult && mdmsConfigResult !== null && mdmsConfigResult !== void 0 && mdmsConfigResult.helpline ? /*#__PURE__*/React.createElement(Card, {
    style: {
      margin: "16px",
      padding: "16px",
      maxWidth: "unset"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "static-home-Card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "static-home-Card-header"
  }, t("CALL_CENTER_HELPLINE")), /*#__PURE__*/React.createElement("div", {
    className: "helplineIcon"
  }, /*#__PURE__*/React.createElement(HelpLineIcon, null))), /*#__PURE__*/React.createElement("div", {
    className: "call-center-card-text"
  }, mdmsConfigResult !== null && mdmsConfigResult !== void 0 && (_mdmsConfigResult$hel = mdmsConfigResult.helpline) !== null && _mdmsConfigResult$hel !== void 0 && _mdmsConfigResult$hel.contactOne ? /*#__PURE__*/React.createElement("div", {
    className: "call-center-card-content"
  }, /*#__PURE__*/React.createElement("a", {
    href: `tel:${mdmsConfigResult === null || mdmsConfigResult === void 0 ? void 0 : (_mdmsConfigResult$hel2 = mdmsConfigResult.helpline) === null || _mdmsConfigResult$hel2 === void 0 ? void 0 : _mdmsConfigResult$hel2.contactOne}`
  }, mdmsConfigResult === null || mdmsConfigResult === void 0 ? void 0 : (_mdmsConfigResult$hel3 = mdmsConfigResult.helpline) === null || _mdmsConfigResult$hel3 === void 0 ? void 0 : _mdmsConfigResult$hel3.contactOne)) : null, mdmsConfigResult !== null && mdmsConfigResult !== void 0 && (_mdmsConfigResult$hel4 = mdmsConfigResult.helpline) !== null && _mdmsConfigResult$hel4 !== void 0 && _mdmsConfigResult$hel4.contactTwo ? /*#__PURE__*/React.createElement("div", {
    className: "call-center-card-content"
  }, /*#__PURE__*/React.createElement("a", {
    href: `tel:${mdmsConfigResult === null || mdmsConfigResult === void 0 ? void 0 : (_mdmsConfigResult$hel5 = mdmsConfigResult.helpline) === null || _mdmsConfigResult$hel5 === void 0 ? void 0 : _mdmsConfigResult$hel5.contactTwo}`
  }, mdmsConfigResult === null || mdmsConfigResult === void 0 ? void 0 : (_mdmsConfigResult$hel6 = mdmsConfigResult.helpline) === null || _mdmsConfigResult$hel6 === void 0 ? void 0 : _mdmsConfigResult$hel6.contactTwo)) : null)) : null, mdmsConfigResult && mdmsConfigResult !== null && mdmsConfigResult !== void 0 && mdmsConfigResult.serviceCenter ? /*#__PURE__*/React.createElement(Card, {
    style: {
      margin: "16px",
      padding: "16px",
      maxWidth: "unset"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "static-home-Card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "static-home-Card-header"
  }, t("CITIZEN_SERVICE_CENTER")), /*#__PURE__*/React.createElement("div", {
    className: "serviceCentrIcon"
  }, /*#__PURE__*/React.createElement(ServiceCenterIcon, null))), /*#__PURE__*/React.createElement("div", {
    className: "service-center-details-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "service-center-details-text"
  }, mdmsConfigResult === null || mdmsConfigResult === void 0 ? void 0 : mdmsConfigResult.serviceCenter)), mdmsConfigResult !== null && mdmsConfigResult !== void 0 && mdmsConfigResult.viewMapLocation ? /*#__PURE__*/React.createElement("div", {
    className: "link"
  }, /*#__PURE__*/React.createElement("a", {
    href: mdmsConfigResult === null || mdmsConfigResult === void 0 ? void 0 : mdmsConfigResult.viewMapLocation
  }, t("VIEW_ON_MAP"))) : null) : /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement(Card, {
    style: {
      margin: "16px",
      padding: "16px",
      maxWidth: "unset"
    }
  }, error || dynamicData == null || (dynamicData === null || dynamicData === void 0 ? void 0 : dynamicData.dynamicDataOne) === null ? /*#__PURE__*/React.createElement("div", null) : /*#__PURE__*/React.createElement("div", {
    className: "dynamicDataCard",
    style: isMobile ? {
      maxHeight: "fit-content"
    } : {}
  }, /*#__PURE__*/React.createElement("div", {
    className: "dynamicData"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      paddingTop: "2px"
    }
  }, /*#__PURE__*/React.createElement(IconComponent, {
    module: moduleCode,
    styles: {
      width: "18px",
      height: "24px"
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "dynamicData-content"
  }, dynamicData === null || dynamicData === void 0 ? void 0 : dynamicData.dynamicDataOne))), error || dynamicData == null || (dynamicData === null || dynamicData === void 0 ? void 0 : dynamicData.dynamicDataTwo) === null ? /*#__PURE__*/React.createElement("div", null) : /*#__PURE__*/React.createElement("div", {
    className: "dynamicDataCard",
    style: isMobile ? {
      maxHeight: "fit-content"
    } : {}
  }, /*#__PURE__*/React.createElement("div", {
    className: "dynamicData"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      paddingTop: "2px"
    }
  }, /*#__PURE__*/React.createElement(IconComponent, {
    module: moduleCode,
    styles: {
      width: "18px",
      height: "24px"
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "dynamicData-content"
  }, dynamicData === null || dynamicData === void 0 ? void 0 : dynamicData.dynamicDataTwo))), mdmsConfigResult && mdmsConfigResult !== null && mdmsConfigResult !== void 0 && mdmsConfigResult.staticDataOne ? /*#__PURE__*/React.createElement("div", {
    className: "staticDataCard"
  }, /*#__PURE__*/React.createElement("div", {
    className: "staticData"
  }, /*#__PURE__*/React.createElement(StaticDataIconComponentOne, {
    module: moduleCode
  }), /*#__PURE__*/React.createElement("span", {
    className: "static-data-content"
  }, /*#__PURE__*/React.createElement("span", {
    className: "static-data-content-first",
    style: {
      marginTop: ((_staticData = staticData(moduleCode)) === null || _staticData === void 0 ? void 0 : _staticData.staticDataOne) === "" ? "8px" : "unset"
    }
  }, (_staticData2 = staticData(moduleCode)) === null || _staticData2 === void 0 ? void 0 : _staticData2.staticDataOneHeader), /*#__PURE__*/React.createElement("span", {
    className: "static-data-content-second"
  }, `${(_staticData3 = staticData(moduleCode)) === null || _staticData3 === void 0 ? void 0 : _staticData3.staticDataOne}`)))) : /*#__PURE__*/React.createElement("div", null), mdmsConfigResult && mdmsConfigResult !== null && mdmsConfigResult !== void 0 && mdmsConfigResult.staticDataTwo ? /*#__PURE__*/React.createElement("div", {
    className: "staticDataCard"
  }, /*#__PURE__*/React.createElement("div", {
    className: "staticData"
  }, /*#__PURE__*/React.createElement(StaticDataIconComponentTwo, {
    module: moduleCode
  }), /*#__PURE__*/React.createElement("span", {
    className: "static-data-content"
  }, /*#__PURE__*/React.createElement("span", {
    className: "static-data-content-first"
  }, (_staticData4 = staticData(moduleCode)) === null || _staticData4 === void 0 ? void 0 : _staticData4.staticDataTwoHeader), /*#__PURE__*/React.createElement("span", {
    className: "static-data-content-second"
  }, (_staticData5 = staticData(moduleCode)) === null || _staticData5 === void 0 ? void 0 : _staticData5.staticDataTwo)))) : /*#__PURE__*/React.createElement("div", null), mdmsConfigResult && mdmsConfigResult !== null && mdmsConfigResult !== void 0 && mdmsConfigResult.validity ? /*#__PURE__*/React.createElement("div", {
    className: "staticDataCard"
  }, /*#__PURE__*/React.createElement("div", {
    className: "staticData"
  }, /*#__PURE__*/React.createElement("span", {
    className: "validityIcon"
  }, /*#__PURE__*/React.createElement(ValidityTimeIcon, null)), /*#__PURE__*/React.createElement("span", {
    className: "static-data-content"
  }, /*#__PURE__*/React.createElement("span", {
    className: "static-data-content-first"
  }, (_staticContent = staticContent(moduleCode)) === null || _staticContent === void 0 ? void 0 : _staticContent.staticCommonContent), /*#__PURE__*/React.createElement("span", {
    className: "static-data-content-second"
  }, (_staticContent2 = staticContent(moduleCode)) === null || _staticContent2 === void 0 ? void 0 : _staticContent2.validity)))) : /*#__PURE__*/React.createElement("div", null), error || dynamicData == null || !(dynamicData !== null && dynamicData !== void 0 && dynamicData.staticData) || (dynamicData === null || dynamicData === void 0 ? void 0 : dynamicData.staticData) === null ? /*#__PURE__*/React.createElement("div", null) : /*#__PURE__*/React.createElement("div", {
    className: "staticDataCard"
  }, /*#__PURE__*/React.createElement("div", {
    className: "staticData"
  }, moduleCode === "PGR" ? /*#__PURE__*/React.createElement("span", {
    style: {
      paddingTop: "15px"
    }
  }, /*#__PURE__*/React.createElement(TimerIcon, {
    module: moduleCode,
    styles: {
      width: "18px",
      height: "24px",
      marginLeft: "13px"
    }
  })) : /*#__PURE__*/React.createElement("span", {
    className: "validityIcon"
  }, /*#__PURE__*/React.createElement(ValidityTimeIcon, null)), /*#__PURE__*/React.createElement("span", {
    className: "static-data-content"
  }, /*#__PURE__*/React.createElement("span", {
    className: "static-data-content-first"
  }, (_staticContent3 = staticContent(moduleCode)) === null || _staticContent3 === void 0 ? void 0 : _staticContent3.staticCommonContent), /*#__PURE__*/React.createElement("span", {
    className: "static-data-content-second"
  }, dynamicData === null || dynamicData === void 0 ? void 0 : dynamicData.staticData)))))) : /*#__PURE__*/React.createElement(React.Fragment, null);
};

const GetActionMessage = props => {
  const {
    t
  } = useTranslation();
  if (props !== null && props !== void 0 && props.isSuccess) {
    return t("CS_PROPERTY_FEEDBACK_SUCCESS");
  } else {
    return t("CS_PROPERTY_FEEDBACK_FAILED");
  }
};
const BannerPicker = props => {
  return /*#__PURE__*/React.createElement(Banner, {
    message: GetActionMessage(props),
    applicationNumber: "",
    style: props.isMobile ? {
      width: "unset"
    } : {
      width: "740px"
    },
    successful: props === null || props === void 0 ? void 0 : props.isSuccess
  });
};
const AcknowledgementCF = ({
  data,
  onSuccess
}) => {
  var _location$state, _location$state$resul, _location$state$resul2, _location$state2, _location$state2$resu, _location$state2$resu2, _location$state3, _location$state3$resu, _location$state3$resu2;
  const {
    t
  } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const location = useLocation();
  const {
    data: storeData
  } = Digit.Hooks.useStore.getInitData();
  const isMobile = window.Digit.Utils.browser.isMobile();
  return /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement(Card, {
    style: isMobile ? {
      padding: "unset"
    } : {}
  }, /*#__PURE__*/React.createElement(BannerPicker, {
    t: t,
    data: location.state,
    isSuccess: (_location$state = location.state) !== null && _location$state !== void 0 && (_location$state$resul = _location$state.result) !== null && _location$state$resul !== void 0 && (_location$state$resul2 = _location$state$resul.Service) !== null && _location$state$resul2 !== void 0 && _location$state$resul2[0] ? true : false,
    isMobile: isMobile,
    isLoading: false
  }), ((_location$state2 = location.state) === null || _location$state2 === void 0 ? void 0 : (_location$state2$resu = _location$state2.result) === null || _location$state2$resu === void 0 ? void 0 : (_location$state2$resu2 = _location$state2$resu.Service) === null || _location$state2$resu2 === void 0 ? void 0 : _location$state2$resu2[0]) && /*#__PURE__*/React.createElement(CardText, {
    style: {
      padding: "0px 10px 0px 10px"
    }
  }, t("CS_CF_FEEDBACK_RESPONSE")), !((_location$state3 = location.state) !== null && _location$state3 !== void 0 && (_location$state3$resu = _location$state3.result) !== null && _location$state3$resu !== void 0 && (_location$state3$resu2 = _location$state3$resu.Service) !== null && _location$state3$resu2 !== void 0 && _location$state3$resu2[0]) && /*#__PURE__*/React.createElement(CardText, null, t("CS_FILE_PROPERTY_FAILED_RESPONSE")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0px 10px 20px 10px"
    }
  }, /*#__PURE__*/React.createElement(Link, {
    to: `/digit-ui/citizen`
  }, /*#__PURE__*/React.createElement(SubmitBar, {
    label: t("CS_COMMON_GO_BACK_TO_HOME")
  })))));
};

var isHTMLElement = value => value instanceof HTMLElement;
const EVENTS = {
  BLUR: 'blur',
  CHANGE: 'change',
  INPUT: 'input'
};
const VALIDATION_MODE = {
  onBlur: 'onBlur',
  onChange: 'onChange',
  onSubmit: 'onSubmit',
  onTouched: 'onTouched',
  all: 'all'
};
const SELECT = 'select';
const UNDEFINED = 'undefined';
const INPUT_VALIDATION_RULES = {
  max: 'max',
  min: 'min',
  maxLength: 'maxLength',
  minLength: 'minLength',
  pattern: 'pattern',
  required: 'required',
  validate: 'validate'
};
function attachEventListeners({
  ref
}, shouldAttachChangeEvent, handleChange) {
  if (isHTMLElement(ref) && handleChange) {
    ref.addEventListener(shouldAttachChangeEvent ? EVENTS.CHANGE : EVENTS.INPUT, handleChange);
    ref.addEventListener(EVENTS.BLUR, handleChange);
  }
}
var isNullOrUndefined = value => value == null;
const isObjectType = value => typeof value === 'object';
var isObject = value => !isNullOrUndefined(value) && !Array.isArray(value) && isObjectType(value) && !(value instanceof Date);
var isKey = value => /^\w*$/.test(value);
var compact = value => value.filter(Boolean);
var stringToPath = input => compact(input.replace(/["|']/g, '').replace(/\[/g, '.').replace(/\]/g, '').split('.'));
function set(object, path, value) {
  let index = -1;
  const tempPath = isKey(path) ? [path] : stringToPath(path);
  const length = tempPath.length;
  const lastIndex = length - 1;
  while (++index < length) {
    const key = tempPath[index];
    let newValue = value;
    if (index !== lastIndex) {
      const objValue = object[key];
      newValue = isObject(objValue) || Array.isArray(objValue) ? objValue : !isNaN(+tempPath[index + 1]) ? [] : {};
    }
    object[key] = newValue;
    object = object[key];
  }
  return object;
}
var transformToNestObject = (data, value = {}) => {
  for (const key in data) {
    !isKey(key) ? set(value, key, data[key]) : value[key] = data[key];
  }
  return value;
};
var isUndefined = val => val === undefined;
var get = (obj = {}, path, defaultValue) => {
  const result = compact(path.split(/[,[\].]+?/)).reduce((result, key) => isNullOrUndefined(result) ? result : result[key], obj);
  return isUndefined(result) || result === obj ? isUndefined(obj[path]) ? defaultValue : obj[path] : result;
};
var focusOnErrorField = (fields, fieldErrors) => {
  for (const key in fields) {
    if (get(fieldErrors, key)) {
      const field = fields[key];
      if (field) {
        if (field.ref.focus && isUndefined(field.ref.focus())) {
          break;
        } else if (field.options) {
          field.options[0].ref.focus();
          break;
        }
      }
    }
  }
};
var removeAllEventListeners = (ref, validateWithStateUpdate) => {
  if (isHTMLElement(ref) && ref.removeEventListener) {
    ref.removeEventListener(EVENTS.INPUT, validateWithStateUpdate);
    ref.removeEventListener(EVENTS.CHANGE, validateWithStateUpdate);
    ref.removeEventListener(EVENTS.BLUR, validateWithStateUpdate);
  }
};
const defaultReturn = {
  isValid: false,
  value: null
};
var getRadioValue = options => Array.isArray(options) ? options.reduce((previous, option) => option && option.ref.checked ? {
  isValid: true,
  value: option.ref.value
} : previous, defaultReturn) : defaultReturn;
var getMultipleSelectValue = options => [...options].filter(({
  selected
}) => selected).map(({
  value
}) => value);
var isRadioInput = element => element.type === 'radio';
var isFileInput = element => element.type === 'file';
var isCheckBoxInput = element => element.type === 'checkbox';
var isMultipleSelect = element => element.type === `${SELECT}-multiple`;
const defaultResult = {
  value: false,
  isValid: false
};
const validResult = {
  value: true,
  isValid: true
};
var getCheckboxValue = options => {
  if (Array.isArray(options)) {
    if (options.length > 1) {
      const values = options.filter(option => option && option.ref.checked).map(({
        ref: {
          value
        }
      }) => value);
      return {
        value: values,
        isValid: !!values.length
      };
    }
    const {
      checked,
      value,
      attributes
    } = options[0].ref;
    return checked ? attributes && !isUndefined(attributes.value) ? isUndefined(value) || value === '' ? validResult : {
      value: value,
      isValid: true
    } : validResult : defaultResult;
  }
  return defaultResult;
};
function getFieldValue(fieldsRef, name, shallowFieldsStateRef, excludeDisabled, shouldKeepRawValue) {
  const field = fieldsRef.current[name];
  if (field) {
    const {
      ref: {
        value,
        disabled
      },
      ref,
      valueAsNumber,
      valueAsDate,
      setValueAs
    } = field;
    if (disabled && excludeDisabled) {
      return;
    }
    if (isFileInput(ref)) {
      return ref.files;
    }
    if (isRadioInput(ref)) {
      return getRadioValue(field.options).value;
    }
    if (isMultipleSelect(ref)) {
      return getMultipleSelectValue(ref.options);
    }
    if (isCheckBoxInput(ref)) {
      return getCheckboxValue(field.options).value;
    }
    return shouldKeepRawValue ? value : valueAsNumber ? value === '' ? NaN : +value : valueAsDate ? ref.valueAsDate : setValueAs ? setValueAs(value) : value;
  }
  if (shallowFieldsStateRef) {
    return get(shallowFieldsStateRef.current, name);
  }
}
function isDetached(element) {
  if (!element) {
    return true;
  }
  if (!(element instanceof HTMLElement) || element.nodeType === Node.DOCUMENT_NODE) {
    return false;
  }
  return isDetached(element.parentNode);
}
var isEmptyObject = value => isObject(value) && !Object.keys(value).length;
var isBoolean = value => typeof value === 'boolean';
function baseGet(object, updatePath) {
  const length = updatePath.slice(0, -1).length;
  let index = 0;
  while (index < length) {
    object = isUndefined(object) ? index++ : object[updatePath[index++]];
  }
  return object;
}
function unset(object, path) {
  const updatePath = isKey(path) ? [path] : stringToPath(path);
  const childObject = updatePath.length == 1 ? object : baseGet(object, updatePath);
  const key = updatePath[updatePath.length - 1];
  let previousObjRef;
  if (childObject) {
    delete childObject[key];
  }
  for (let k = 0; k < updatePath.slice(0, -1).length; k++) {
    let index = -1;
    let objectRef;
    const currentPaths = updatePath.slice(0, -(k + 1));
    const currentPathsLength = currentPaths.length - 1;
    if (k > 0) {
      previousObjRef = object;
    }
    while (++index < currentPaths.length) {
      const item = currentPaths[index];
      objectRef = objectRef ? objectRef[item] : object[item];
      if (currentPathsLength === index && (isObject(objectRef) && isEmptyObject(objectRef) || Array.isArray(objectRef) && !objectRef.filter(data => isObject(data) && !isEmptyObject(data) || isBoolean(data)).length)) {
        previousObjRef ? delete previousObjRef[item] : delete object[item];
      }
      previousObjRef = objectRef;
    }
  }
  return object;
}
const isSameRef = (fieldValue, ref) => fieldValue && fieldValue.ref === ref;
function findRemovedFieldAndRemoveListener(fieldsRef, handleChange, field, shallowFieldsStateRef, shouldUnregister, forceDelete) {
  const {
    ref,
    ref: {
      name
    }
  } = field;
  const fieldRef = fieldsRef.current[name];
  if (!shouldUnregister) {
    const value = getFieldValue(fieldsRef, name, shallowFieldsStateRef);
    !isUndefined(value) && set(shallowFieldsStateRef.current, name, value);
  }
  if (!ref.type || !fieldRef) {
    delete fieldsRef.current[name];
    return;
  }
  if (isRadioInput(ref) || isCheckBoxInput(ref)) {
    if (Array.isArray(fieldRef.options) && fieldRef.options.length) {
      compact(fieldRef.options).forEach((option = {}, index) => {
        if (isDetached(option.ref) && isSameRef(option, option.ref) || forceDelete) {
          removeAllEventListeners(option.ref, handleChange);
          unset(fieldRef.options, `[${index}]`);
        }
      });
      if (fieldRef.options && !compact(fieldRef.options).length) {
        delete fieldsRef.current[name];
      }
    } else {
      delete fieldsRef.current[name];
    }
  } else if (isDetached(ref) && isSameRef(fieldRef, ref) || forceDelete) {
    removeAllEventListeners(ref, handleChange);
    delete fieldsRef.current[name];
  }
}
var isPrimitive = value => isNullOrUndefined(value) || !isObjectType(value);
function deepMerge(target, source) {
  if (isPrimitive(target) || isPrimitive(source)) {
    return source;
  }
  for (const key in source) {
    const targetValue = target[key];
    const sourceValue = source[key];
    try {
      target[key] = isObject(targetValue) && isObject(sourceValue) || Array.isArray(targetValue) && Array.isArray(sourceValue) ? deepMerge(targetValue, sourceValue) : sourceValue;
    } catch (_a) {}
  }
  return target;
}
function deepEqual(object1, object2, isErrorObject) {
  if (isPrimitive(object1) || isPrimitive(object2) || object1 instanceof Date || object2 instanceof Date) {
    return object1 === object2;
  }
  if (!isValidElement(object1)) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key of keys1) {
      const val1 = object1[key];
      if (!(isErrorObject && key === 'ref')) {
        const val2 = object2[key];
        if ((isObject(val1) || Array.isArray(val1)) && (isObject(val2) || Array.isArray(val2)) ? !deepEqual(val1, val2, isErrorObject) : val1 !== val2) {
          return false;
        }
      }
    }
  }
  return true;
}
function setDirtyFields(values, defaultValues, dirtyFields, parentNode, parentName) {
  let index = -1;
  while (++index < values.length) {
    for (const key in values[index]) {
      if (Array.isArray(values[index][key])) {
        !dirtyFields[index] && (dirtyFields[index] = {});
        dirtyFields[index][key] = [];
        setDirtyFields(values[index][key], get(defaultValues[index] || {}, key, []), dirtyFields[index][key], dirtyFields[index], key);
      } else {
        deepEqual(get(defaultValues[index] || {}, key), values[index][key]) ? set(dirtyFields[index] || {}, key) : dirtyFields[index] = Object.assign(Object.assign({}, dirtyFields[index]), {
          [key]: true
        });
      }
    }
    parentNode && !dirtyFields.length && delete parentNode[parentName];
  }
  return dirtyFields;
}
var setFieldArrayDirtyFields = (values, defaultValues, dirtyFields) => deepMerge(setDirtyFields(values, defaultValues, dirtyFields.slice(0, values.length)), setDirtyFields(defaultValues, values, dirtyFields.slice(0, values.length)));
var isString = value => typeof value === 'string';
var getFieldsValues = (fieldsRef, shallowFieldsState, shouldUnregister, excludeDisabled, search) => {
  const output = {};
  for (const name in fieldsRef.current) {
    if (isUndefined(search) || (isString(search) ? name.startsWith(search) : Array.isArray(search) && search.find(data => name.startsWith(data)))) {
      output[name] = getFieldValue(fieldsRef, name, undefined, excludeDisabled);
    }
  }
  return shouldUnregister ? transformToNestObject(output) : deepMerge(shallowFieldsState, transformToNestObject(output));
};
var isErrorStateChanged = ({
  errors,
  name,
  error,
  validFields,
  fieldsWithValidation
}) => {
  const isValid = isUndefined(error);
  const previousError = get(errors, name);
  return isValid && !!previousError || !isValid && !deepEqual(previousError, error, true) || isValid && get(fieldsWithValidation, name) && !get(validFields, name);
};
var isRegex = value => value instanceof RegExp;
var getValueAndMessage = validationData => isObject(validationData) && !isRegex(validationData) ? validationData : {
  value: validationData,
  message: ''
};
var isFunction = value => typeof value === 'function';
var isMessage = value => isString(value) || isValidElement(value);
function getValidateError(result, ref, type = 'validate') {
  if (isMessage(result) || isBoolean(result) && !result) {
    return {
      type,
      message: isMessage(result) ? result : '',
      ref
    };
  }
}
var appendErrors = (name, validateAllFieldCriteria, errors, type, message) => validateAllFieldCriteria ? Object.assign(Object.assign({}, errors[name]), {
  types: Object.assign(Object.assign({}, errors[name] && errors[name].types ? errors[name].types : {}), {
    [type]: message || true
  })
}) : {};
var validateField = async (fieldsRef, validateAllFieldCriteria, {
  ref,
  ref: {
    value
  },
  options,
  required,
  maxLength,
  minLength,
  min,
  max,
  pattern,
  validate
}, shallowFieldsStateRef) => {
  const name = ref.name;
  const error = {};
  const isRadio = isRadioInput(ref);
  const isCheckBox = isCheckBoxInput(ref);
  const isRadioOrCheckbox = isRadio || isCheckBox;
  const isEmpty = value === '';
  const appendErrorsCurry = appendErrors.bind(null, name, validateAllFieldCriteria, error);
  const getMinMaxMessage = (exceedMax, maxLengthMessage, minLengthMessage, maxType = INPUT_VALIDATION_RULES.maxLength, minType = INPUT_VALIDATION_RULES.minLength) => {
    const message = exceedMax ? maxLengthMessage : minLengthMessage;
    error[name] = Object.assign({
      type: exceedMax ? maxType : minType,
      message,
      ref
    }, exceedMax ? appendErrorsCurry(maxType, message) : appendErrorsCurry(minType, message));
  };
  if (required && (!isRadio && !isCheckBox && (isEmpty || isNullOrUndefined(value)) || isBoolean(value) && !value || isCheckBox && !getCheckboxValue(options).isValid || isRadio && !getRadioValue(options).isValid)) {
    const {
      value: _value,
      message
    } = isMessage(required) ? {
      value: !!required,
      message: required
    } : getValueAndMessage(required);
    if (_value) {
      error[name] = Object.assign({
        type: INPUT_VALIDATION_RULES.required,
        message,
        ref: isRadioOrCheckbox ? ((fieldsRef.current[name].options || [])[0] || {}).ref : ref
      }, appendErrorsCurry(INPUT_VALIDATION_RULES.required, message));
      if (!validateAllFieldCriteria) {
        return error;
      }
    }
  }
  if ((!isNullOrUndefined(min) || !isNullOrUndefined(max)) && value !== '') {
    let exceedMax;
    let exceedMin;
    const maxOutput = getValueAndMessage(max);
    const minOutput = getValueAndMessage(min);
    if (!isNaN(value)) {
      const valueNumber = ref.valueAsNumber || parseFloat(value);
      if (!isNullOrUndefined(maxOutput.value)) {
        exceedMax = valueNumber > maxOutput.value;
      }
      if (!isNullOrUndefined(minOutput.value)) {
        exceedMin = valueNumber < minOutput.value;
      }
    } else {
      const valueDate = ref.valueAsDate || new Date(value);
      if (isString(maxOutput.value)) {
        exceedMax = valueDate > new Date(maxOutput.value);
      }
      if (isString(minOutput.value)) {
        exceedMin = valueDate < new Date(minOutput.value);
      }
    }
    if (exceedMax || exceedMin) {
      getMinMaxMessage(!!exceedMax, maxOutput.message, minOutput.message, INPUT_VALIDATION_RULES.max, INPUT_VALIDATION_RULES.min);
      if (!validateAllFieldCriteria) {
        return error;
      }
    }
  }
  if (isString(value) && !isEmpty && (maxLength || minLength)) {
    const maxLengthOutput = getValueAndMessage(maxLength);
    const minLengthOutput = getValueAndMessage(minLength);
    const exceedMax = !isNullOrUndefined(maxLengthOutput.value) && value.length > maxLengthOutput.value;
    const exceedMin = !isNullOrUndefined(minLengthOutput.value) && value.length < minLengthOutput.value;
    if (exceedMax || exceedMin) {
      getMinMaxMessage(exceedMax, maxLengthOutput.message, minLengthOutput.message);
      if (!validateAllFieldCriteria) {
        return error;
      }
    }
  }
  if (isString(value) && pattern && !isEmpty) {
    const {
      value: patternValue,
      message
    } = getValueAndMessage(pattern);
    if (isRegex(patternValue) && !patternValue.test(value)) {
      error[name] = Object.assign({
        type: INPUT_VALIDATION_RULES.pattern,
        message,
        ref
      }, appendErrorsCurry(INPUT_VALIDATION_RULES.pattern, message));
      if (!validateAllFieldCriteria) {
        return error;
      }
    }
  }
  if (validate) {
    const fieldValue = getFieldValue(fieldsRef, name, shallowFieldsStateRef, false, true);
    const validateRef = isRadioOrCheckbox && options ? options[0].ref : ref;
    if (isFunction(validate)) {
      const result = await validate(fieldValue);
      const validateError = getValidateError(result, validateRef);
      if (validateError) {
        error[name] = Object.assign(Object.assign({}, validateError), appendErrorsCurry(INPUT_VALIDATION_RULES.validate, validateError.message));
        if (!validateAllFieldCriteria) {
          return error;
        }
      }
    } else if (isObject(validate)) {
      let validationResult = {};
      for (const [key, validateFunction] of Object.entries(validate)) {
        if (!isEmptyObject(validationResult) && !validateAllFieldCriteria) {
          break;
        }
        const validateResult = await validateFunction(fieldValue);
        const validateError = getValidateError(validateResult, validateRef, key);
        if (validateError) {
          validationResult = Object.assign(Object.assign({}, validateError), appendErrorsCurry(key, validateError.message));
          if (validateAllFieldCriteria) {
            error[name] = validationResult;
          }
        }
      }
      if (!isEmptyObject(validationResult)) {
        error[name] = Object.assign({
          ref: validateRef
        }, validationResult);
        if (!validateAllFieldCriteria) {
          return error;
        }
      }
    }
  }
  return error;
};
const getPath = (rootPath, values, paths = []) => {
  for (const property in values) {
    const rootName = rootPath + (isObject(values) ? `.${property}` : `[${property}]`);
    isPrimitive(values[property]) ? paths.push(rootName) : getPath(rootName, values[property], paths);
  }
  return paths;
};
var assignWatchFields = (fieldValues, fieldName, watchFields, inputValue, isSingleField) => {
  let value = undefined;
  watchFields.add(fieldName);
  if (!isEmptyObject(fieldValues)) {
    value = get(fieldValues, fieldName);
    if (isObject(value) || Array.isArray(value)) {
      getPath(fieldName, value).forEach(name => watchFields.add(name));
    }
  }
  return isUndefined(value) ? isSingleField ? inputValue : get(inputValue, fieldName) : value;
};
var skipValidation = ({
  isOnBlur,
  isOnChange,
  isOnTouch,
  isTouched,
  isReValidateOnBlur,
  isReValidateOnChange,
  isBlurEvent,
  isSubmitted,
  isOnAll
}) => {
  if (isOnAll) {
    return false;
  } else if (!isSubmitted && isOnTouch) {
    return !(isTouched || isBlurEvent);
  } else if (isSubmitted ? isReValidateOnBlur : isOnBlur) {
    return !isBlurEvent;
  } else if (isSubmitted ? isReValidateOnChange : isOnChange) {
    return isBlurEvent;
  }
  return true;
};
var getFieldArrayParentName = name => name.substring(0, name.indexOf('['));
const isMatchFieldArrayName = (name, searchName) => RegExp(`^${searchName}([|.)\\d+`.replace(/\[/g, '\\[').replace(/\]/g, '\\]')).test(name);
var isNameInFieldArray = (names, name) => [...names].some(current => isMatchFieldArrayName(name, current));
var isSelectInput = element => element.type === `${SELECT}-one`;
function onDomRemove(fieldsRef, removeFieldEventListenerAndRef) {
  const observer = new MutationObserver(() => {
    for (const field of Object.values(fieldsRef.current)) {
      if (field && field.options) {
        for (const option of field.options) {
          if (option && option.ref && isDetached(option.ref)) {
            removeFieldEventListenerAndRef(field);
          }
        }
      } else if (field && isDetached(field.ref)) {
        removeFieldEventListenerAndRef(field);
      }
    }
  });
  observer.observe(window.document, {
    childList: true,
    subtree: true
  });
  return observer;
}
var isWeb = typeof window !== UNDEFINED && typeof document !== UNDEFINED;
function cloneObject(data) {
  var _a;
  let copy;
  if (isPrimitive(data) || isWeb && (data instanceof File || isHTMLElement(data))) {
    return data;
  }
  if (!['Set', 'Map', 'Object', 'Date', 'Array'].includes((_a = data.constructor) === null || _a === void 0 ? void 0 : _a.name)) {
    return data;
  }
  if (data instanceof Date) {
    copy = new Date(data.getTime());
    return copy;
  }
  if (data instanceof Set) {
    copy = new Set();
    for (const item of data) {
      copy.add(item);
    }
    return copy;
  }
  if (data instanceof Map) {
    copy = new Map();
    for (const key of data.keys()) {
      copy.set(key, cloneObject(data.get(key)));
    }
    return copy;
  }
  copy = Array.isArray(data) ? [] : {};
  for (const key in data) {
    copy[key] = cloneObject(data[key]);
  }
  return copy;
}
var modeChecker = mode => ({
  isOnSubmit: !mode || mode === VALIDATION_MODE.onSubmit,
  isOnBlur: mode === VALIDATION_MODE.onBlur,
  isOnChange: mode === VALIDATION_MODE.onChange,
  isOnAll: mode === VALIDATION_MODE.all,
  isOnTouch: mode === VALIDATION_MODE.onTouched
});
var isRadioOrCheckboxFunction = ref => isRadioInput(ref) || isCheckBoxInput(ref);
const isWindowUndefined = typeof window === UNDEFINED;
const isProxyEnabled = isWeb ? 'Proxy' in window : typeof Proxy !== UNDEFINED;
function useForm({
  mode = VALIDATION_MODE.onSubmit,
  reValidateMode = VALIDATION_MODE.onChange,
  resolver,
  context,
  defaultValues = {},
  shouldFocusError = true,
  shouldUnregister = true,
  criteriaMode
} = {}) {
  const fieldsRef = useRef({});
  const fieldArrayDefaultValuesRef = useRef({});
  const fieldArrayValuesRef = useRef({});
  const watchFieldsRef = useRef(new Set());
  const useWatchFieldsRef = useRef({});
  const useWatchRenderFunctionsRef = useRef({});
  const fieldsWithValidationRef = useRef({});
  const validFieldsRef = useRef({});
  const defaultValuesRef = useRef(defaultValues);
  const isUnMount = useRef(false);
  const isWatchAllRef = useRef(false);
  const handleChangeRef = useRef();
  const shallowFieldsStateRef = useRef({});
  const resetFieldArrayFunctionRef = useRef({});
  const contextRef = useRef(context);
  const resolverRef = useRef(resolver);
  const fieldArrayNamesRef = useRef(new Set());
  const modeRef = useRef(modeChecker(mode));
  const {
    isOnSubmit,
    isOnTouch
  } = modeRef.current;
  const isValidateAllFieldCriteria = criteriaMode === VALIDATION_MODE.all;
  const [formState, setFormState] = useState({
    isDirty: false,
    isValidating: false,
    dirtyFields: {},
    isSubmitted: false,
    submitCount: 0,
    touched: {},
    isSubmitting: false,
    isSubmitSuccessful: false,
    isValid: !isOnSubmit,
    errors: {}
  });
  const readFormStateRef = useRef({
    isDirty: !isProxyEnabled,
    dirtyFields: !isProxyEnabled,
    touched: !isProxyEnabled || isOnTouch,
    isValidating: !isProxyEnabled,
    isSubmitting: !isProxyEnabled,
    isValid: !isProxyEnabled
  });
  const formStateRef = useRef(formState);
  const observerRef = useRef();
  const {
    isOnBlur: isReValidateOnBlur,
    isOnChange: isReValidateOnChange
  } = useRef(modeChecker(reValidateMode)).current;
  contextRef.current = context;
  resolverRef.current = resolver;
  formStateRef.current = formState;
  shallowFieldsStateRef.current = shouldUnregister ? {} : isEmptyObject(shallowFieldsStateRef.current) ? cloneObject(defaultValues) : shallowFieldsStateRef.current;
  const updateFormState = useCallback((state = {}) => {
    if (!isUnMount.current) {
      formStateRef.current = Object.assign(Object.assign({}, formStateRef.current), state);
      setFormState(formStateRef.current);
    }
  }, []);
  const updateIsValidating = () => readFormStateRef.current.isValidating && updateFormState({
    isValidating: true
  });
  const shouldRenderBaseOnError = useCallback((name, error, shouldRender = false, state = {}, isValid) => {
    let shouldReRender = shouldRender || isErrorStateChanged({
      errors: formStateRef.current.errors,
      error,
      name,
      validFields: validFieldsRef.current,
      fieldsWithValidation: fieldsWithValidationRef.current
    });
    const previousError = get(formStateRef.current.errors, name);
    if (error) {
      unset(validFieldsRef.current, name);
      shouldReRender = shouldReRender || !previousError || !deepEqual(previousError, error, true);
      set(formStateRef.current.errors, name, error);
    } else {
      if (get(fieldsWithValidationRef.current, name) || resolverRef.current) {
        set(validFieldsRef.current, name, true);
        shouldReRender = shouldReRender || previousError;
      }
      unset(formStateRef.current.errors, name);
    }
    if (shouldReRender && !isNullOrUndefined(shouldRender) || !isEmptyObject(state) || readFormStateRef.current.isValidating) {
      updateFormState(Object.assign(Object.assign(Object.assign({}, state), resolverRef.current ? {
        isValid: !!isValid
      } : {}), {
        isValidating: false
      }));
    }
  }, []);
  const setFieldValue = useCallback((name, rawValue) => {
    const {
      ref,
      options
    } = fieldsRef.current[name];
    const value = isWeb && isHTMLElement(ref) && isNullOrUndefined(rawValue) ? '' : rawValue;
    if (isRadioInput(ref)) {
      (options || []).forEach(({
        ref: radioRef
      }) => radioRef.checked = radioRef.value === value);
    } else if (isFileInput(ref) && !isString(value)) {
      ref.files = value;
    } else if (isMultipleSelect(ref)) {
      [...ref.options].forEach(selectRef => selectRef.selected = value.includes(selectRef.value));
    } else if (isCheckBoxInput(ref) && options) {
      options.length > 1 ? options.forEach(({
        ref: checkboxRef
      }) => checkboxRef.checked = Array.isArray(value) ? !!value.find(data => data === checkboxRef.value) : value === checkboxRef.value) : options[0].ref.checked = !!value;
    } else {
      ref.value = value;
    }
  }, []);
  const isFormDirty = useCallback((name, data) => {
    if (readFormStateRef.current.isDirty) {
      const formValues = getValues();
      name && data && set(formValues, name, data);
      return !deepEqual(formValues, defaultValuesRef.current);
    }
    return false;
  }, []);
  const updateAndGetDirtyState = useCallback((name, shouldRender = true) => {
    if (readFormStateRef.current.isDirty || readFormStateRef.current.dirtyFields) {
      const isFieldDirty = !deepEqual(get(defaultValuesRef.current, name), getFieldValue(fieldsRef, name, shallowFieldsStateRef));
      const isDirtyFieldExist = get(formStateRef.current.dirtyFields, name);
      const previousIsDirty = formStateRef.current.isDirty;
      isFieldDirty ? set(formStateRef.current.dirtyFields, name, true) : unset(formStateRef.current.dirtyFields, name);
      const state = {
        isDirty: isFormDirty(),
        dirtyFields: formStateRef.current.dirtyFields
      };
      const isChanged = readFormStateRef.current.isDirty && previousIsDirty !== state.isDirty || readFormStateRef.current.dirtyFields && isDirtyFieldExist !== get(formStateRef.current.dirtyFields, name);
      isChanged && shouldRender && updateFormState(state);
      return isChanged ? state : {};
    }
    return {};
  }, []);
  const executeValidation = useCallback(async (name, skipReRender) => {
    if (process.env.NODE_ENV !== 'production') {
      if (!fieldsRef.current[name]) {
        console.warn('📋 Field is missing with `name` attribute: ', name);
        return false;
      }
    }
    const error = (await validateField(fieldsRef, isValidateAllFieldCriteria, fieldsRef.current[name], shallowFieldsStateRef))[name];
    shouldRenderBaseOnError(name, error, skipReRender);
    return isUndefined(error);
  }, [shouldRenderBaseOnError, isValidateAllFieldCriteria]);
  const executeSchemaOrResolverValidation = useCallback(async names => {
    const {
      errors
    } = await resolverRef.current(getValues(), contextRef.current, isValidateAllFieldCriteria);
    const previousFormIsValid = formStateRef.current.isValid;
    if (Array.isArray(names)) {
      const isInputsValid = names.map(name => {
        const error = get(errors, name);
        error ? set(formStateRef.current.errors, name, error) : unset(formStateRef.current.errors, name);
        return !error;
      }).every(Boolean);
      updateFormState({
        isValid: isEmptyObject(errors),
        isValidating: false
      });
      return isInputsValid;
    } else {
      const error = get(errors, names);
      shouldRenderBaseOnError(names, error, previousFormIsValid !== isEmptyObject(errors), {}, isEmptyObject(errors));
      return !error;
    }
  }, [shouldRenderBaseOnError, isValidateAllFieldCriteria]);
  const trigger = useCallback(async name => {
    const fields = name || Object.keys(fieldsRef.current);
    updateIsValidating();
    if (resolverRef.current) {
      return executeSchemaOrResolverValidation(fields);
    }
    if (Array.isArray(fields)) {
      !name && (formStateRef.current.errors = {});
      const result = await Promise.all(fields.map(async data => await executeValidation(data, null)));
      updateFormState({
        isValidating: false
      });
      return result.every(Boolean);
    }
    return await executeValidation(fields);
  }, [executeSchemaOrResolverValidation, executeValidation]);
  const setInternalValues = useCallback((name, value, {
    shouldDirty,
    shouldValidate
  }) => {
    const data = {};
    set(data, name, value);
    for (const fieldName of getPath(name, value)) {
      if (fieldsRef.current[fieldName]) {
        setFieldValue(fieldName, get(data, fieldName));
        shouldDirty && updateAndGetDirtyState(fieldName);
        shouldValidate && trigger(fieldName);
      }
    }
  }, [trigger, setFieldValue, updateAndGetDirtyState]);
  const setInternalValue = useCallback((name, value, config) => {
    !shouldUnregister && !isPrimitive(value) && set(shallowFieldsStateRef.current, name, Array.isArray(value) ? [...value] : Object.assign({}, value));
    if (fieldsRef.current[name]) {
      setFieldValue(name, value);
      config.shouldDirty && updateAndGetDirtyState(name);
      config.shouldValidate && trigger(name);
    } else if (!isPrimitive(value)) {
      setInternalValues(name, value, config);
      if (fieldArrayNamesRef.current.has(name)) {
        const parentName = getFieldArrayParentName(name) || name;
        set(fieldArrayDefaultValuesRef.current, name, value);
        resetFieldArrayFunctionRef.current[parentName]({
          [parentName]: get(fieldArrayDefaultValuesRef.current, parentName)
        });
        if ((readFormStateRef.current.isDirty || readFormStateRef.current.dirtyFields) && config.shouldDirty) {
          set(formStateRef.current.dirtyFields, name, setFieldArrayDirtyFields(value, get(defaultValuesRef.current, name, []), get(formStateRef.current.dirtyFields, name, [])));
          updateFormState({
            isDirty: !deepEqual(Object.assign(Object.assign({}, getValues()), {
              [name]: value
            }), defaultValuesRef.current)
          });
        }
      }
    }
    !shouldUnregister && set(shallowFieldsStateRef.current, name, value);
  }, [updateAndGetDirtyState, setFieldValue, setInternalValues]);
  const isFieldWatched = name => isWatchAllRef.current || watchFieldsRef.current.has(name) || watchFieldsRef.current.has((name.match(/\w+/) || [])[0]);
  const renderWatchedInputs = name => {
    let found = true;
    if (!isEmptyObject(useWatchFieldsRef.current)) {
      for (const key in useWatchFieldsRef.current) {
        if (!name || !useWatchFieldsRef.current[key].size || useWatchFieldsRef.current[key].has(name) || useWatchFieldsRef.current[key].has(getFieldArrayParentName(name))) {
          useWatchRenderFunctionsRef.current[key]();
          found = false;
        }
      }
    }
    return found;
  };
  function setValue(name, value, config) {
    setInternalValue(name, value, config || {});
    isFieldWatched(name) && updateFormState();
    renderWatchedInputs(name);
  }
  handleChangeRef.current = handleChangeRef.current ? handleChangeRef.current : async ({
    type,
    target
  }) => {
    let name = target.name;
    const field = fieldsRef.current[name];
    let error;
    let isValid;
    if (field) {
      const isBlurEvent = type === EVENTS.BLUR;
      const shouldSkipValidation = skipValidation(Object.assign({
        isBlurEvent,
        isReValidateOnChange,
        isReValidateOnBlur,
        isTouched: !!get(formStateRef.current.touched, name),
        isSubmitted: formStateRef.current.isSubmitted
      }, modeRef.current));
      let state = updateAndGetDirtyState(name, false);
      let shouldRender = !isEmptyObject(state) || !isBlurEvent && isFieldWatched(name);
      if (isBlurEvent && !get(formStateRef.current.touched, name) && readFormStateRef.current.touched) {
        set(formStateRef.current.touched, name, true);
        state = Object.assign(Object.assign({}, state), {
          touched: formStateRef.current.touched
        });
      }
      if (!shouldUnregister && isCheckBoxInput(target)) {
        set(shallowFieldsStateRef.current, name, getFieldValue(fieldsRef, name));
      }
      if (shouldSkipValidation) {
        !isBlurEvent && renderWatchedInputs(name);
        return (!isEmptyObject(state) || shouldRender && isEmptyObject(state)) && updateFormState(state);
      }
      updateIsValidating();
      if (resolverRef.current) {
        const {
          errors
        } = await resolverRef.current(getValues(), contextRef.current, isValidateAllFieldCriteria);
        const previousFormIsValid = formStateRef.current.isValid;
        error = get(errors, name);
        if (isCheckBoxInput(target) && !error && resolverRef.current) {
          const parentNodeName = getFieldArrayParentName(name);
          const currentError = get(errors, parentNodeName, {});
          currentError.type && currentError.message && (error = currentError);
          if (parentNodeName && (currentError || get(formStateRef.current.errors, parentNodeName))) {
            name = parentNodeName;
          }
        }
        isValid = isEmptyObject(errors);
        previousFormIsValid !== isValid && (shouldRender = true);
      } else {
        error = (await validateField(fieldsRef, isValidateAllFieldCriteria, field, shallowFieldsStateRef))[name];
      }
      !isBlurEvent && renderWatchedInputs(name);
      shouldRenderBaseOnError(name, error, shouldRender, state, isValid);
    }
  };
  function setFieldArrayDefaultValues(data) {
    if (!shouldUnregister) {
      let copy = cloneObject(data);
      for (const value of fieldArrayNamesRef.current) {
        if (isKey(value) && !copy[value]) {
          copy = Object.assign(Object.assign({}, copy), {
            [value]: []
          });
        }
      }
      return copy;
    }
    return data;
  }
  function getValues(payload) {
    if (isString(payload)) {
      return getFieldValue(fieldsRef, payload, shallowFieldsStateRef);
    }
    if (Array.isArray(payload)) {
      const data = {};
      for (const name of payload) {
        set(data, name, getFieldValue(fieldsRef, name, shallowFieldsStateRef));
      }
      return data;
    }
    return setFieldArrayDefaultValues(getFieldsValues(fieldsRef, cloneObject(shallowFieldsStateRef.current), shouldUnregister));
  }
  const validateResolver = useCallback(async (values = {}) => {
    const newDefaultValues = isEmptyObject(fieldsRef.current) ? defaultValuesRef.current : {};
    const {
      errors
    } = (await resolverRef.current(Object.assign(Object.assign(Object.assign({}, newDefaultValues), getValues()), values), contextRef.current, isValidateAllFieldCriteria)) || {};
    const isValid = isEmptyObject(errors);
    formStateRef.current.isValid !== isValid && updateFormState({
      isValid
    });
  }, [isValidateAllFieldCriteria]);
  const removeFieldEventListener = useCallback((field, forceDelete) => {
    findRemovedFieldAndRemoveListener(fieldsRef, handleChangeRef.current, field, shallowFieldsStateRef, shouldUnregister, forceDelete);
    if (shouldUnregister) {
      unset(validFieldsRef.current, field.ref.name);
      unset(fieldsWithValidationRef.current, field.ref.name);
    }
  }, [shouldUnregister]);
  const updateWatchedValue = useCallback(name => {
    if (isWatchAllRef.current) {
      updateFormState();
    } else {
      for (const watchField of watchFieldsRef.current) {
        if (watchField.startsWith(name)) {
          updateFormState();
          break;
        }
      }
      renderWatchedInputs(name);
    }
  }, []);
  const removeFieldEventListenerAndRef = useCallback((field, forceDelete) => {
    if (field) {
      removeFieldEventListener(field, forceDelete);
      if (shouldUnregister && !compact(field.options || []).length) {
        unset(formStateRef.current.errors, field.ref.name);
        set(formStateRef.current.dirtyFields, field.ref.name, true);
        updateFormState({
          isDirty: isFormDirty()
        });
        readFormStateRef.current.isValid && resolverRef.current && validateResolver();
        updateWatchedValue(field.ref.name);
      }
    }
  }, [validateResolver, removeFieldEventListener]);
  function clearErrors(name) {
    name && (Array.isArray(name) ? name : [name]).forEach(inputName => fieldsRef.current[inputName] && isKey(inputName) ? delete formStateRef.current.errors[inputName] : unset(formStateRef.current.errors, inputName));
    updateFormState({
      errors: name ? formStateRef.current.errors : {}
    });
  }
  function setError(name, error) {
    const ref = (fieldsRef.current[name] || {}).ref;
    set(formStateRef.current.errors, name, Object.assign(Object.assign({}, error), {
      ref
    }));
    updateFormState({
      isValid: false
    });
    error.shouldFocus && ref && ref.focus && ref.focus();
  }
  const watchInternal = useCallback((fieldNames, defaultValue, watchId) => {
    const watchFields = watchId ? useWatchFieldsRef.current[watchId] : watchFieldsRef.current;
    let fieldValues = getFieldsValues(fieldsRef, cloneObject(shallowFieldsStateRef.current), shouldUnregister, false, fieldNames);
    if (isString(fieldNames)) {
      const parentNodeName = getFieldArrayParentName(fieldNames) || fieldNames;
      if (fieldArrayNamesRef.current.has(parentNodeName)) {
        fieldValues = Object.assign(Object.assign({}, fieldArrayValuesRef.current), fieldValues);
      }
      return assignWatchFields(fieldValues, fieldNames, watchFields, isUndefined(get(defaultValuesRef.current, fieldNames)) ? defaultValue : get(defaultValuesRef.current, fieldNames), true);
    }
    const combinedDefaultValues = isUndefined(defaultValue) ? defaultValuesRef.current : defaultValue;
    if (Array.isArray(fieldNames)) {
      return fieldNames.reduce((previous, name) => Object.assign(Object.assign({}, previous), {
        [name]: assignWatchFields(fieldValues, name, watchFields, combinedDefaultValues)
      }), {});
    }
    isWatchAllRef.current = isUndefined(watchId);
    return transformToNestObject(!isEmptyObject(fieldValues) && fieldValues || combinedDefaultValues);
  }, []);
  function watch(fieldNames, defaultValue) {
    return watchInternal(fieldNames, defaultValue);
  }
  function unregister(name) {
    for (const fieldName of Array.isArray(name) ? name : [name]) {
      removeFieldEventListenerAndRef(fieldsRef.current[fieldName], true);
    }
  }
  function registerFieldRef(ref, options = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (!ref.name) {
        return console.warn('📋 Field is missing `name` attribute', ref, `https://react-hook-form.com/api#useForm`);
      }
      if (fieldArrayNamesRef.current.has(ref.name.split(/\[\d+\]$/)[0]) && !RegExp(`^${ref.name.split(/\[\d+\]$/)[0]}[\\d+].\\w+`.replace(/\[/g, '\\[').replace(/\]/g, '\\]')).test(ref.name)) {
        return console.warn('📋 `name` prop should be in object shape: name="test[index].name"', ref, 'https://react-hook-form.com/api#useFieldArray');
      }
    }
    const {
      name,
      type,
      value
    } = ref;
    const fieldRefAndValidationOptions = Object.assign({
      ref
    }, options);
    const fields = fieldsRef.current;
    const isRadioOrCheckbox = isRadioOrCheckboxFunction(ref);
    const isFieldArray = isNameInFieldArray(fieldArrayNamesRef.current, name);
    const compareRef = currentRef => isWeb && (!isHTMLElement(ref) || currentRef === ref);
    let field = fields[name];
    let isEmptyDefaultValue = true;
    let defaultValue;
    if (field && (isRadioOrCheckbox ? Array.isArray(field.options) && compact(field.options).find(option => {
      return value === option.ref.value && compareRef(option.ref);
    }) : compareRef(field.ref))) {
      fields[name] = Object.assign(Object.assign({}, field), options);
      return;
    }
    if (type) {
      field = isRadioOrCheckbox ? Object.assign({
        options: [...compact(field && field.options || []), {
          ref
        }],
        ref: {
          type,
          name
        }
      }, options) : Object.assign({}, fieldRefAndValidationOptions);
    } else {
      field = fieldRefAndValidationOptions;
    }
    fields[name] = field;
    const isEmptyUnmountFields = isUndefined(get(shallowFieldsStateRef.current, name));
    if (!isEmptyObject(defaultValuesRef.current) || !isEmptyUnmountFields) {
      defaultValue = get(isEmptyUnmountFields ? defaultValuesRef.current : shallowFieldsStateRef.current, name);
      isEmptyDefaultValue = isUndefined(defaultValue);
      if (!isEmptyDefaultValue && !isFieldArray) {
        setFieldValue(name, defaultValue);
      }
    }
    if (!isEmptyObject(options)) {
      set(fieldsWithValidationRef.current, name, true);
      if (!isOnSubmit && readFormStateRef.current.isValid) {
        validateField(fieldsRef, isValidateAllFieldCriteria, field, shallowFieldsStateRef).then(error => {
          const previousFormIsValid = formStateRef.current.isValid;
          isEmptyObject(error) ? set(validFieldsRef.current, name, true) : unset(validFieldsRef.current, name);
          previousFormIsValid !== isEmptyObject(error) && updateFormState();
        });
      }
    }
    if (shouldUnregister && !(isFieldArray && isEmptyDefaultValue)) {
      !isFieldArray && unset(formStateRef.current.dirtyFields, name);
    }
    if (type) {
      attachEventListeners(isRadioOrCheckbox && field.options ? field.options[field.options.length - 1] : field, isRadioOrCheckbox || isSelectInput(ref), handleChangeRef.current);
    }
  }
  function register(refOrRegisterOptions, options) {
    if (!isWindowUndefined) {
      if (isString(refOrRegisterOptions)) {
        registerFieldRef({
          name: refOrRegisterOptions
        }, options);
      } else if (isObject(refOrRegisterOptions) && 'name' in refOrRegisterOptions) {
        registerFieldRef(refOrRegisterOptions, options);
      } else {
        return ref => ref && registerFieldRef(ref, refOrRegisterOptions);
      }
    }
  }
  const handleSubmit = useCallback((onValid, onInvalid) => async e => {
    if (e && e.preventDefault) {
      e.preventDefault();
      e.persist();
    }
    let fieldErrors = {};
    let fieldValues = setFieldArrayDefaultValues(getFieldsValues(fieldsRef, cloneObject(shallowFieldsStateRef.current), shouldUnregister, true));
    readFormStateRef.current.isSubmitting && updateFormState({
      isSubmitting: true
    });
    try {
      if (resolverRef.current) {
        const {
          errors,
          values
        } = await resolverRef.current(fieldValues, contextRef.current, isValidateAllFieldCriteria);
        formStateRef.current.errors = fieldErrors = errors;
        fieldValues = values;
      } else {
        for (const field of Object.values(fieldsRef.current)) {
          if (field) {
            const {
              name
            } = field.ref;
            const fieldError = await validateField(fieldsRef, isValidateAllFieldCriteria, field, shallowFieldsStateRef);
            if (fieldError[name]) {
              set(fieldErrors, name, fieldError[name]);
              unset(validFieldsRef.current, name);
            } else if (get(fieldsWithValidationRef.current, name)) {
              unset(formStateRef.current.errors, name);
              set(validFieldsRef.current, name, true);
            }
          }
        }
      }
      if (isEmptyObject(fieldErrors) && Object.keys(formStateRef.current.errors).every(name => name in fieldsRef.current)) {
        updateFormState({
          errors: {},
          isSubmitting: true
        });
        await onValid(fieldValues, e);
      } else {
        formStateRef.current.errors = Object.assign(Object.assign({}, formStateRef.current.errors), fieldErrors);
        onInvalid && (await onInvalid(formStateRef.current.errors, e));
        shouldFocusError && focusOnErrorField(fieldsRef.current, formStateRef.current.errors);
      }
    } finally {
      formStateRef.current.isSubmitting = false;
      updateFormState({
        isSubmitted: true,
        isSubmitting: false,
        isSubmitSuccessful: isEmptyObject(formStateRef.current.errors),
        submitCount: formStateRef.current.submitCount + 1
      });
    }
  }, [shouldFocusError, isValidateAllFieldCriteria]);
  const resetRefs = ({
    errors,
    isDirty,
    isSubmitted,
    touched,
    isValid,
    submitCount,
    dirtyFields
  }) => {
    if (!isValid) {
      validFieldsRef.current = {};
      fieldsWithValidationRef.current = {};
    }
    fieldArrayDefaultValuesRef.current = {};
    watchFieldsRef.current = new Set();
    isWatchAllRef.current = false;
    updateFormState({
      submitCount: submitCount ? formStateRef.current.submitCount : 0,
      isDirty: isDirty ? formStateRef.current.isDirty : false,
      isSubmitted: isSubmitted ? formStateRef.current.isSubmitted : false,
      isValid: isValid ? formStateRef.current.isValid : false,
      dirtyFields: dirtyFields ? formStateRef.current.dirtyFields : {},
      touched: touched ? formStateRef.current.touched : {},
      errors: errors ? formStateRef.current.errors : {},
      isSubmitting: false,
      isSubmitSuccessful: false
    });
  };
  const reset = (values, omitResetState = {}) => {
    if (isWeb) {
      for (const field of Object.values(fieldsRef.current)) {
        if (field) {
          const {
            ref,
            options
          } = field;
          const inputRef = isRadioOrCheckboxFunction(ref) && Array.isArray(options) ? options[0].ref : ref;
          if (isHTMLElement(inputRef)) {
            try {
              inputRef.closest('form').reset();
              break;
            } catch (_a) {}
          }
        }
      }
    }
    fieldsRef.current = {};
    defaultValuesRef.current = Object.assign({}, values || defaultValuesRef.current);
    values && renderWatchedInputs('');
    Object.values(resetFieldArrayFunctionRef.current).forEach(resetFieldArray => isFunction(resetFieldArray) && resetFieldArray());
    shallowFieldsStateRef.current = shouldUnregister ? {} : cloneObject(values || defaultValuesRef.current);
    resetRefs(omitResetState);
  };
  useEffect(() => {
    resolver && readFormStateRef.current.isValid && validateResolver();
    observerRef.current = observerRef.current || !isWeb ? observerRef.current : onDomRemove(fieldsRef, removeFieldEventListenerAndRef);
  }, [removeFieldEventListenerAndRef, defaultValuesRef.current]);
  useEffect(() => () => {
    observerRef.current && observerRef.current.disconnect();
    isUnMount.current = true;
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    Object.values(fieldsRef.current).forEach(field => removeFieldEventListenerAndRef(field, true));
  }, []);
  if (!resolver && readFormStateRef.current.isValid) {
    formState.isValid = deepEqual(validFieldsRef.current, fieldsWithValidationRef.current) && isEmptyObject(formStateRef.current.errors);
  }
  const commonProps = {
    trigger,
    setValue: useCallback(setValue, [setInternalValue, trigger]),
    getValues: useCallback(getValues, []),
    register: useCallback(register, [defaultValuesRef.current]),
    unregister: useCallback(unregister, []),
    formState: isProxyEnabled ? new Proxy(formState, {
      get: (obj, prop) => {
        if (process.env.NODE_ENV !== 'production') {
          if (prop === 'isValid' && isOnSubmit) {
            console.warn('📋 `formState.isValid` is applicable with `onTouched`, `onChange` or `onBlur` mode. https://react-hook-form.com/api#formState');
          }
        }
        if (prop in obj) {
          readFormStateRef.current[prop] = true;
          return obj[prop];
        }
        return undefined;
      }
    }) : formState
  };
  const control = useMemo(() => Object.assign({
    isFormDirty,
    updateWatchedValue,
    shouldUnregister,
    updateFormState,
    removeFieldEventListener,
    watchInternal,
    mode: modeRef.current,
    reValidateMode: {
      isReValidateOnBlur,
      isReValidateOnChange
    },
    validateResolver: resolver ? validateResolver : undefined,
    fieldsRef,
    resetFieldArrayFunctionRef,
    useWatchFieldsRef,
    useWatchRenderFunctionsRef,
    fieldArrayDefaultValuesRef,
    validFieldsRef,
    fieldsWithValidationRef,
    fieldArrayNamesRef,
    readFormStateRef,
    formStateRef,
    defaultValuesRef,
    shallowFieldsStateRef,
    fieldArrayValuesRef
  }, commonProps), [defaultValuesRef.current, updateWatchedValue, shouldUnregister, removeFieldEventListener, watchInternal]);
  return Object.assign({
    watch,
    control,
    handleSubmit,
    reset: useCallback(reset, []),
    clearErrors: useCallback(clearErrors, []),
    setError: useCallback(setError, []),
    errors: formState.errors
  }, commonProps);
}
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
const FormContext = createContext(null);
FormContext.displayName = 'RHFContext';
const useFormContext = () => useContext(FormContext);
var getInputValue = event => isPrimitive(event) || !isObject(event.target) || isObject(event.target) && !event.type ? event : isUndefined(event.target.value) ? event.target.checked : event.target.value;
function useController({
  name,
  rules,
  defaultValue,
  control,
  onFocus
}) {
  const methods = useFormContext();
  if (process.env.NODE_ENV !== 'production') {
    if (!control && !methods) {
      throw new Error('📋 Controller is missing `control` prop. https://react-hook-form.com/api#Controller');
    }
  }
  const {
    defaultValuesRef,
    setValue,
    register,
    unregister,
    trigger,
    mode,
    reValidateMode: {
      isReValidateOnBlur,
      isReValidateOnChange
    },
    formState,
    formStateRef: {
      current: {
        isSubmitted,
        touched,
        errors
      }
    },
    updateFormState,
    readFormStateRef,
    fieldsRef,
    fieldArrayNamesRef,
    shallowFieldsStateRef
  } = control || methods.control;
  const isNotFieldArray = !isNameInFieldArray(fieldArrayNamesRef.current, name);
  const getInitialValue = () => !isUndefined(get(shallowFieldsStateRef.current, name)) && isNotFieldArray ? get(shallowFieldsStateRef.current, name) : isUndefined(defaultValue) ? get(defaultValuesRef.current, name) : defaultValue;
  const [value, setInputStateValue] = useState(getInitialValue());
  const valueRef = useRef(value);
  const ref = useRef({
    focus: () => null
  });
  const onFocusRef = useRef(onFocus || (() => {
    if (isFunction(ref.current.focus)) {
      ref.current.focus();
    }
    if (process.env.NODE_ENV !== 'production') {
      if (!isFunction(ref.current.focus)) {
        console.warn(`📋 'ref' from Controller render prop must be attached to a React component or a DOM Element whose ref provides a 'focus()' method`);
      }
    }
  }));
  const shouldValidate = useCallback(isBlurEvent => !skipValidation(Object.assign({
    isBlurEvent,
    isReValidateOnBlur,
    isReValidateOnChange,
    isSubmitted,
    isTouched: !!get(touched, name)
  }, mode)), [isReValidateOnBlur, isReValidateOnChange, isSubmitted, touched, name, mode]);
  const commonTask = useCallback(([event]) => {
    const data = getInputValue(event);
    setInputStateValue(data);
    valueRef.current = data;
    return data;
  }, []);
  const registerField = useCallback(shouldUpdateValue => {
    if (process.env.NODE_ENV !== 'production') {
      if (!name) {
        return console.warn('📋 Field is missing `name` prop. https://react-hook-form.com/api#Controller');
      }
    }
    if (fieldsRef.current[name]) {
      fieldsRef.current[name] = Object.assign({
        ref: fieldsRef.current[name].ref
      }, rules);
    } else {
      register(Object.defineProperties({
        name,
        focus: onFocusRef.current
      }, {
        value: {
          set(data) {
            setInputStateValue(data);
            valueRef.current = data;
          },
          get() {
            return valueRef.current;
          }
        }
      }), rules);
      shouldUpdateValue = isUndefined(get(defaultValuesRef.current, name));
    }
    shouldUpdateValue && isNotFieldArray && setInputStateValue(getInitialValue());
  }, [rules, name, register]);
  useEffect(() => () => unregister(name), [name]);
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      if (isUndefined(value)) {
        console.warn(`📋 ${name} is missing in the 'defaultValue' prop of either its Controller (https://react-hook-form.com/api#Controller) or useForm (https://react-hook-form.com/api#useForm)`);
      }
      if (!isNotFieldArray && isUndefined(defaultValue)) {
        console.warn('📋 Controller is missing `defaultValue` prop when using `useFieldArray`. https://react-hook-form.com/api#Controller');
      }
    }
    registerField();
  }, [registerField]);
  useEffect(() => {
    !fieldsRef.current[name] && registerField(true);
  });
  const onBlur = useCallback(() => {
    if (readFormStateRef.current.touched && !get(touched, name)) {
      set(touched, name, true);
      updateFormState({
        touched
      });
    }
    shouldValidate(true) && trigger(name);
  }, [name, updateFormState, shouldValidate, trigger, readFormStateRef]);
  const onChange = useCallback((...event) => setValue(name, commonTask(event), {
    shouldValidate: shouldValidate(),
    shouldDirty: true
  }), [setValue, name, shouldValidate]);
  return {
    field: {
      onChange,
      onBlur,
      name,
      value,
      ref
    },
    meta: Object.defineProperties({
      invalid: !!get(errors, name)
    }, {
      isDirty: {
        get() {
          return !!get(formState.dirtyFields, name);
        }
      },
      isTouched: {
        get() {
          return !!get(formState.touched, name);
        }
      }
    })
  };
}
const Controller = props => {
  const {
      rules,
      as,
      render,
      defaultValue,
      control,
      onFocus
    } = props,
    rest = __rest(props, ["rules", "as", "render", "defaultValue", "control", "onFocus"]);
  const {
    field,
    meta
  } = useController(props);
  const componentProps = Object.assign(Object.assign({}, rest), field);
  return as ? isValidElement(as) ? cloneElement(as, componentProps) : createElement(as, componentProps) : render ? render(field, meta) : null;
};

const CitizenFeedback = ({
  popup: _popup = false,
  onClose,
  setShowToast,
  data
}) => {
  var _data$Properties8, _data$Properties8$, _data$Properties9, _data$Properties9$;
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const user = Digit.UserService.getUser();
  let {
    redirectedFrom,
    propertyId,
    acknowldgementNumber,
    creationReason,
    tenantId,
    locality
  } = Digit.Hooks.useQueryParams();
  const isMobile = window.Digit.Utils.browser.isMobile();
  tenantId = tenantId || Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  const {
    data: RatingAndFeedBack,
    isLoading: RatingAndFeedBackLoading
  } = Digit.Hooks.pt.useRatingAndFeedbackMDMS.RatingAndFeedBack(stateId);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  if (RatingAndFeedBackLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  const onComments = e => {
    setComment(e.target.value);
  };
  const feedback = (e, ref, index) => {
    setRating(index);
  };
  const onSubmit = () => {
    var _data$Properties, _data$Properties$, _data$Properties2, _data$Properties2$;
    let formData = {};
    let ServiceDefinitionCriteria = {
      "tenantId": (data === null || data === void 0 ? void 0 : (_data$Properties = data.Properties) === null || _data$Properties === void 0 ? void 0 : (_data$Properties$ = _data$Properties[0]) === null || _data$Properties$ === void 0 ? void 0 : _data$Properties$.tenantId) || tenantId,
      "code": [`PT_${redirectedFrom !== null && redirectedFrom !== void 0 && redirectedFrom.includes("payment") ? "PAYMENT" : creationReason || (data === null || data === void 0 ? void 0 : (_data$Properties2 = data.Properties) === null || _data$Properties2 === void 0 ? void 0 : (_data$Properties2$ = _data$Properties2[0]) === null || _data$Properties2$ === void 0 ? void 0 : _data$Properties2$.creationReason)}`],
      "module": ["PT"]
    };
    Digit.PTService.cfdefinitionsearch({
      filters: {
        ServiceDefinitionCriteria
      }
    }).then((result1, err) => {
      var _result1$ServiceDefin;
      if ((result1 === null || result1 === void 0 ? void 0 : (_result1$ServiceDefin = result1.ServiceDefinition) === null || _result1$ServiceDefin === void 0 ? void 0 : _result1$ServiceDefin.length) > 0) {
        var _data$Properties3, _data$Properties3$, _result1$ServiceDefin2, _result1$ServiceDefin3, _data$Properties4, _data$Properties4$, _data$Properties5, _data$Properties5$, _data$Properties5$$ad, _data$Properties5$$ad2, _user$info, _data$Properties6, _data$Properties6$;
        formData = {
          "tenantId": (data === null || data === void 0 ? void 0 : (_data$Properties3 = data.Properties) === null || _data$Properties3 === void 0 ? void 0 : (_data$Properties3$ = _data$Properties3[0]) === null || _data$Properties3$ === void 0 ? void 0 : _data$Properties3$.tenantId) || tenantId,
          "serviceDefId": result1 === null || result1 === void 0 ? void 0 : (_result1$ServiceDefin2 = result1.ServiceDefinition) === null || _result1$ServiceDefin2 === void 0 ? void 0 : (_result1$ServiceDefin3 = _result1$ServiceDefin2[0]) === null || _result1$ServiceDefin3 === void 0 ? void 0 : _result1$ServiceDefin3.id,
          "isActive": true,
          "attributes": [{
            "attributeCode": "consumerCode",
            "value": propertyId || (data === null || data === void 0 ? void 0 : (_data$Properties4 = data.Properties) === null || _data$Properties4 === void 0 ? void 0 : (_data$Properties4$ = _data$Properties4[0]) === null || _data$Properties4$ === void 0 ? void 0 : _data$Properties4$.propertyId),
            "additionalDetails": {}
          }, {
            "attributeCode": "rating",
            "value": rating,
            "additionalDetails": {}
          }, {
            "attributeCode": "comments",
            "value": comment,
            "additionalDetails": {}
          }, {
            "attributeCode": "channel",
            "value": "Online",
            "additionalDetails": {}
          }],
          "additionalDetails": {
            locality: locality || (data === null || data === void 0 ? void 0 : (_data$Properties5 = data.Properties) === null || _data$Properties5 === void 0 ? void 0 : (_data$Properties5$ = _data$Properties5[0]) === null || _data$Properties5$ === void 0 ? void 0 : (_data$Properties5$$ad = _data$Properties5$.address) === null || _data$Properties5$$ad === void 0 ? void 0 : (_data$Properties5$$ad2 = _data$Properties5$$ad.locality) === null || _data$Properties5$$ad2 === void 0 ? void 0 : _data$Properties5$$ad2.code) || ""
          },
          "accountId": user === null || user === void 0 ? void 0 : (_user$info = user.info) === null || _user$info === void 0 ? void 0 : _user$info.uuid
        };
        formData = {
          ...formData,
          referenceId: acknowldgementNumber || (data === null || data === void 0 ? void 0 : (_data$Properties6 = data.Properties) === null || _data$Properties6 === void 0 ? void 0 : (_data$Properties6$ = _data$Properties6[0]) === null || _data$Properties6$ === void 0 ? void 0 : _data$Properties6$.acknowldgementNumber)
        };
        Digit.PTService.cfcreate({
          Service: {
            ...formData
          }
        }, tenantId).then((result, err) => {
          var _result$Service;
          if ((result === null || result === void 0 ? void 0 : (_result$Service = result.Service) === null || _result$Service === void 0 ? void 0 : _result$Service.length) > 0) {
            if (_popup) {
              onClose(false);
              setShowToast({
                key: false,
                label: "PT_FEEDBACK_SUBMITTED_SUCCESSFULLY"
              });
            } else history.push({
              pathname: "/digit-ui/citizen/feedback-acknowledgement",
              state: {
                rating,
                comment,
                result
              }
            });
          }
        }).catch(e => {
          var _e$response, _e$response$data, _e$response$data$Erro;
          setShowToast({
            key: "error",
            label: `${e === null || e === void 0 ? void 0 : (_e$response = e.response) === null || _e$response === void 0 ? void 0 : (_e$response$data = _e$response.data) === null || _e$response$data === void 0 ? void 0 : (_e$response$data$Erro = _e$response$data.Errors[0]) === null || _e$response$data$Erro === void 0 ? void 0 : _e$response$data$Erro.message}`
          });
        });
      }
    });
  };
  const getCardHeaderAndText = type => {
    var _RatingAndFeedBack$en, _RatingAndFeedBack$en2;
    let tempObject = RatingAndFeedBack === null || RatingAndFeedBack === void 0 ? void 0 : (_RatingAndFeedBack$en = RatingAndFeedBack.enabledScreensList) === null || _RatingAndFeedBack$en === void 0 ? void 0 : (_RatingAndFeedBack$en2 = _RatingAndFeedBack$en.filter(ob => {
      var _ob$bussinessService, _data$Properties7, _data$Properties7$;
      return (ob === null || ob === void 0 ? void 0 : ob.module) === "PT" && ((redirectedFrom === null || redirectedFrom === void 0 ? void 0 : redirectedFrom.includes(ob === null || ob === void 0 ? void 0 : ob.screenfrom)) || (ob === null || ob === void 0 ? void 0 : (_ob$bussinessService = ob.bussinessService) === null || _ob$bussinessService === void 0 ? void 0 : _ob$bussinessService.includes(data === null || data === void 0 ? void 0 : (_data$Properties7 = data.Properties) === null || _data$Properties7 === void 0 ? void 0 : (_data$Properties7$ = _data$Properties7[0]) === null || _data$Properties7$ === void 0 ? void 0 : _data$Properties7$.creationReason)));
    })) === null || _RatingAndFeedBack$en2 === void 0 ? void 0 : _RatingAndFeedBack$en2[0];
    if (type === "Header") return tempObject === null || tempObject === void 0 ? void 0 : tempObject.cardHeader;else if (type === "Text") {
      return tempObject === null || tempObject === void 0 ? void 0 : tempObject.cardText;
    }
  };
  const getCommentHeader = () => {
    var _RatingAndFeedBack$he, _RatingAndFeedBack$he2, _RatingAndFeedBack$he3;
    return (RatingAndFeedBack === null || RatingAndFeedBack === void 0 ? void 0 : (_RatingAndFeedBack$he = RatingAndFeedBack.headerByRating) === null || _RatingAndFeedBack$he === void 0 ? void 0 : (_RatingAndFeedBack$he2 = _RatingAndFeedBack$he.filter(ob => rating >= (ob === null || ob === void 0 ? void 0 : ob.minvalue) && rating <= (ob === null || ob === void 0 ? void 0 : ob.maxvalue))) === null || _RatingAndFeedBack$he2 === void 0 ? void 0 : (_RatingAndFeedBack$he3 = _RatingAndFeedBack$he2[0]) === null || _RatingAndFeedBack$he3 === void 0 ? void 0 : _RatingAndFeedBack$he3.code) || t("CS_WHAT_WENT_WRONG");
  };
  const getCommentCheck = () => {
    if (comment && (comment === null || comment === void 0 ? void 0 : comment.length) < 64) return true;else if (rating) return false;else return true;
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: _popup ? {
      display: "flex",
      justifyContent: "space-between"
    } : {}
  }, /*#__PURE__*/React.createElement(CardHeader, null, t(getCardHeaderAndText("Header")) || t(`PT_RATE_HELP_TEXT`)), _popup && /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: "8px"
    },
    onClick: () => onClose(false)
  }, /*#__PURE__*/React.createElement(CloseSvg, null))), /*#__PURE__*/React.createElement(CardText, null, t(getCardHeaderAndText("Text"), {
    acknowldgementNumber: acknowldgementNumber || (data === null || data === void 0 ? void 0 : (_data$Properties8 = data.Properties) === null || _data$Properties8 === void 0 ? void 0 : (_data$Properties8$ = _data$Properties8[0]) === null || _data$Properties8$ === void 0 ? void 0 : _data$Properties8$.acknowldgementNumber),
    propertyId: propertyId || (data === null || data === void 0 ? void 0 : (_data$Properties9 = data.Properties) === null || _data$Properties9 === void 0 ? void 0 : (_data$Properties9$ = _data$Properties9[0]) === null || _data$Properties9$ === void 0 ? void 0 : _data$Properties9$.propertyId)
  }) || t(`PT_RATE_TEXT`)), /*#__PURE__*/React.createElement(Rating, {
    styles: {
      justifyContent: "center"
    },
    currentRating: rating,
    maxRating: 5,
    onFeedback: (e, ref, i) => feedback(e, ref, i)
  }), rating !== 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CardLabel, null, t(getCommentHeader())), /*#__PURE__*/React.createElement(TextArea, {
    name: "",
    minLength: "64",
    onChange: onComments
  }), comment && (comment === null || comment === void 0 ? void 0 : comment.length) < 64 && /*#__PURE__*/React.createElement(CardLabelError, {
    style: {
      marginTop: "-20px",
      marginBottom: "25px"
    }
  }, t("CS_MIN_LENGTH_64"))), /*#__PURE__*/React.createElement(SubmitBar, {
    label: t(`${"PT"}_SUBMIT`),
    onSubmit: onSubmit,
    disabled: getCommentCheck()
  }), !_popup && /*#__PURE__*/React.createElement("div", {
    className: "link",
    style: isMobile ? {
      marginTop: "8px",
      width: "100%",
      textAlign: "center"
    } : {
      marginTop: "8px"
    }
  }, /*#__PURE__*/React.createElement(Link, {
    to: `/digit-ui/citizen`
  }, t("CS_GO_BACK_HOME"))))));
};

const SearchFields = ({
  register,
  control,
  reset,
  tenantId,
  t,
  previousPage,
  formState,
  isLoading
}) => {
  const isMobile = window.Digit.Utils.browser.isMobile();
  return /*#__PURE__*/React.createElement(Fragment$1, null, /*#__PURE__*/React.createElement(SearchField, {
    className: "pt-form-field"
  }, /*#__PURE__*/React.createElement("label", null, t("AUDIT_FROM_DATE_LABEL")), /*#__PURE__*/React.createElement(Controller, {
    render: props => /*#__PURE__*/React.createElement(DatePicker, {
      date: props.value,
      onChange: props.onChange
    }),
    name: "fromDate",
    control: control
  })), /*#__PURE__*/React.createElement(SearchField, {
    className: "pt-form-field"
  }, /*#__PURE__*/React.createElement("label", null, t("AUDIT_TO_DATE_LABEL")), /*#__PURE__*/React.createElement(Controller, {
    render: props => /*#__PURE__*/React.createElement(DatePicker, {
      date: props.value,
      onChange: props.onChange
    }),
    name: "toDate",
    control: control
  })), /*#__PURE__*/React.createElement(SearchField, {
    className: "pt-search-action-submit"
  }, /*#__PURE__*/React.createElement(SubmitBar, {
    style: {
      marginTop: isMobile ? "510px" : "25px",
      marginLeft: isMobile ? "0" : "-30px",
      maxWidth: isMobile ? "100%" : "240px"
    },
    label: t("ES_COMMON_APPLY"),
    submit: true
  })));
};

const MobileSearchApplication = ({
  Controller,
  register,
  control,
  t,
  reset,
  previousPage,
  handleSubmit,
  tenantId,
  data,
  onSubmit,
  isLoading
}) => {
  var _data$roles;
  function activateModal(state, action) {
    switch (action.type) {
      case "set":
        return action.payload;
      case "remove":
        return false;
    }
  }
  const [tabledata, settabledata] = useState([]);
  const DownloadBtn = props => {
    return /*#__PURE__*/React.createElement("div", {
      onClick: props.onClick
    }, /*#__PURE__*/React.createElement(DownloadBtnCommon, null));
  };
  const handleExcelDownload = tabData => {
    if ((tabData === null || tabData === void 0 ? void 0 : tabData[0]) !== undefined) {
      return Digit.Download.Excel(tabData === null || tabData === void 0 ? void 0 : tabData[0], "AuditReport");
    }
  };
  useEffect(() => {
    if ((data === null || data === void 0 ? void 0 : data.length) > 0) {
      settabledata([data === null || data === void 0 ? void 0 : data.map(obj => {
        var _obj$dataView, _obj$roles;
        let returnObject = {};
        returnObject[t("AUDIT_DATE_LABEL")] = convertEpochToDate(obj === null || obj === void 0 ? void 0 : obj.timestamp) || "-";
        returnObject[t("AUDIT_TIME_LABEL")] = convertEpochToTimeInHours(obj === null || obj === void 0 ? void 0 : obj.timestamp) || "-";
        returnObject[t("AUDIT_DATAVIEWED_LABEL")] = (obj === null || obj === void 0 ? void 0 : (_obj$dataView = obj.dataView) === null || _obj$dataView === void 0 ? void 0 : _obj$dataView.join(", ")) || "-";
        returnObject[t("AUDIT_DATAVIEWED_BY_LABEL")] = (obj === null || obj === void 0 ? void 0 : obj.dataViewedBy) || "-";
        returnObject[t("AUDIT_ROLE_LABEL")] = (obj === null || obj === void 0 ? void 0 : (_obj$roles = obj.roles) === null || _obj$roles === void 0 ? void 0 : _obj$roles.map(obj => obj.name).join(", ")) || "-";
        return {
          ...returnObject
        };
      })]);
    }
  }, [data]);
  const convertEpochToDate = dateEpoch => {
    if (dateEpoch == null || dateEpoch == undefined || dateEpoch == "") {
      return "NA";
    }
    const dateFromApi = new Date(dateEpoch);
    let month = dateFromApi.getMonth() + 1;
    let day = dateFromApi.getDate();
    let year = dateFromApi.getFullYear();
    month = (month > 9 ? "" : "0") + month;
    day = (day > 9 ? "" : "0") + day;
    return `${day}/${month}/${year}`;
  };
  const convertEpochToTimeInHours = dateEpoch => {
    if (dateEpoch == null || dateEpoch == undefined || dateEpoch == "") {
      return "NA";
    }
    const dateFromApi = new Date(dateEpoch);
    let hour = dateFromApi.getHours();
    let min = dateFromApi.getMinutes();
    let period = hour > 12 ? "PM" : "AM";
    hour = hour > 12 ? hour - 12 : hour;
    hour = (hour > 9 ? "" : "0") + hour;
    min = (min > 9 ? "" : "0") + min;
    return `${hour}:${min} ${period}`;
  };
  const [currentlyActiveMobileModal, setActiveMobileModal] = useReducer(activateModal, false);
  const closeMobilePopupModal = () => {
    setActiveMobileModal({
      type: "remove"
    });
  };
  const MobilePopUpCloseButton = () => /*#__PURE__*/React.createElement("div", {
    className: "InboxMobilePopupCloseButtonWrapper",
    onClick: closeMobilePopupModal
  }, /*#__PURE__*/React.createElement(CloseSvg, null));
  const searchFormFieldsComponentProps = {
    Controller,
    register,
    control,
    t,
    reset,
    previousPage
  };
  const MobileComponentDirectory = ({
    currentlyActiveMobileModal,
    searchFormFieldsComponentProps,
    tenantId,
    ...props
  }) => {
    const {
      closeMobilePopupModal
    } = props;
    switch (currentlyActiveMobileModal) {
      case "SearchFormComponent":
        return /*#__PURE__*/React.createElement(SearchForm, props, /*#__PURE__*/React.createElement(MobilePopUpCloseButton, null), /*#__PURE__*/React.createElement("div", {
          className: "MobilePopupHeadingWrapper"
        }, /*#__PURE__*/React.createElement("h2", null, t("PRIVACY_AUDIT_REPORT"), ":")), /*#__PURE__*/React.createElement(SearchFields, Object.assign({}, searchFormFieldsComponentProps, {
          closeMobilePopupModal,
          tenantId,
          t
        })));
      default:
        return /*#__PURE__*/React.createElement("span", null);
    }
  };
  const CurrentMobileModalComponent = useCallback(({
    currentlyActiveMobileModal,
    searchFormFieldsComponentProps,
    tenantId,
    ...props
  }) => MobileComponentDirectory({
    currentlyActiveMobileModal,
    searchFormFieldsComponentProps,
    tenantId,
    ...props
  }), [currentlyActiveMobileModal]);
  data === null || data === void 0 ? void 0 : (_data$roles = data.roles) === null || _data$roles === void 0 ? void 0 : _data$roles.forEach(item => {
  });
  const propsMobileInboxCards = useMemo(() => {
    if (data !== null && data !== void 0 && data.display) {
      return [];
    }
    if (data === "") {
      return [];
    }
    return data === null || data === void 0 ? void 0 : data.map(data => {
      var _data$dataView, _data$roles2, _data$roles2$slice;
      return {
        [t("AUDIT_DATE_LABEL")]: convertEpochToDate(data.timestamp) || "-",
        [t("AUDIT_TIME_LABEL")]: convertEpochToTimeInHours(data.timestamp) || "-",
        [t("AUDIT_DATAVIEWED_LABEL")]: ((_data$dataView = data.dataView) === null || _data$dataView === void 0 ? void 0 : _data$dataView.join(", ")) || "-",
        [t("AUDIT_DATAVIEWED_BY_LABEL")]: data.dataViewedBy || "-",
        [t("AUDIT_ROLE_LABEL")]: ((_data$roles2 = data.roles) === null || _data$roles2 === void 0 ? void 0 : (_data$roles2$slice = _data$roles2.slice(0, 3)) === null || _data$roles2$slice === void 0 ? void 0 : _data$roles2$slice.map(e => e.name).join(", ")) || "-"
      };
    });
  }, [data]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BackButton, null), /*#__PURE__*/React.createElement("div", {
    className: "sideContent",
    style: {
      marginLeft: "65%",
      marginTop: "-12%"
    }
  }, /*#__PURE__*/React.createElement(DownloadBtn, {
    className: "mrlg cursorPointer",
    onClick: () => handleExcelDownload(tabledata)
  })), /*#__PURE__*/React.createElement(Header$1, null, t("PRIVACY_AUDIT_REPORT"), ":"), /*#__PURE__*/React.createElement("div", {
    className: "searchBox"
  }, /*#__PURE__*/React.createElement(SearchAction, Object.assign({
    text: t("ES_COMMON_SEARCH"),
    handleActionClick: () => setActiveMobileModal({
      type: "set",
      payload: "SearchFormComponent"
    })
  }, {
    tenantId,
    t
  }))), currentlyActiveMobileModal ? /*#__PURE__*/React.createElement(PopUp, null, /*#__PURE__*/React.createElement(CurrentMobileModalComponent, Object.assign({
    onSubmit: data => {
      setActiveMobileModal({
        type: "remove"
      });
      onSubmit(data);
    },
    handleSubmit: handleSubmit,
    id: "search-form",
    className: "rm-mb form-field-flex-one inboxPopupMobileWrapper"
  }, {
    searchFormFieldsComponentProps,
    currentlyActiveMobileModal,
    closeMobilePopupModal,
    tenantId
  }))) : null, isLoading && /*#__PURE__*/React.createElement(Loader, null), /*#__PURE__*/React.createElement(DetailsCard, {
    data: propsMobileInboxCards
  }));
};

const SearchApplication = ({
  showLoader,
  isLoading,
  tenantId,
  t,
  onSubmit,
  data,
  count
}) => {
  const initialValues = Digit.SessionStorage.get("AUDIT_APPLICATION_DETAIL") || {
    offset: 0,
    limit: 10,
    sortOrder: "ASC"
  };
  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    reset
  } = useForm({
    defaultValues: initialValues
  });
  const convertEpochToDate = dateEpoch => {
    if (dateEpoch == null || dateEpoch == undefined || dateEpoch == "") {
      return "NA";
    }
    const dateFromApi = new Date(dateEpoch);
    let month = dateFromApi.getMonth() + 1;
    let day = dateFromApi.getDate();
    let year = dateFromApi.getFullYear();
    month = (month > 9 ? "" : "0") + month;
    day = (day > 9 ? "" : "0") + day;
    return `${day}/${month}/${year}`;
  };
  const convertEpochToTimeInHours = dateEpoch => {
    if (dateEpoch == null || dateEpoch == undefined || dateEpoch == "") {
      return "NA";
    }
    const dateFromApi = new Date(dateEpoch);
    let hour = dateFromApi.getHours();
    let min = dateFromApi.getMinutes();
    let period = hour > 12 ? "PM" : "AM";
    hour = hour > 12 ? hour - 12 : hour;
    hour = (hour > 9 ? "" : "0") + hour;
    min = (min > 9 ? "" : "0") + min;
    return `${hour}:${min} ${period}`;
  };
  const [tabledata, settabledata] = useState([]);
  const DownloadBtn = props => {
    return /*#__PURE__*/React.createElement("div", {
      onClick: props.onClick
    }, /*#__PURE__*/React.createElement(DownloadBtnCommon, null));
  };
  const handleExcelDownload = tabData => {
    if ((tabData === null || tabData === void 0 ? void 0 : tabData[0]) !== undefined) {
      return Digit.Download.Excel(tabData === null || tabData === void 0 ? void 0 : tabData[0], "AuditReport");
    }
  };
  useEffect(() => {
    register("offset", 0);
    register("limit", 10);
  }, [register]);
  useEffect(() => {
    if ((data === null || data === void 0 ? void 0 : data.length) > 0) {
      settabledata([data === null || data === void 0 ? void 0 : data.map(obj => {
        var _obj$dataView, _obj$roles;
        let returnObject = {};
        returnObject[t("AUDIT_DATE_LABEL")] = convertEpochToDate(obj === null || obj === void 0 ? void 0 : obj.timestamp) || "-";
        returnObject[t("AUDIT_TIME_LABEL")] = convertEpochToTimeInHours(obj === null || obj === void 0 ? void 0 : obj.timestamp) || "-";
        returnObject[t("AUDIT_DATAVIEWED_LABEL")] = (obj === null || obj === void 0 ? void 0 : (_obj$dataView = obj.dataView) === null || _obj$dataView === void 0 ? void 0 : _obj$dataView.join(", ")) || "-";
        returnObject[t("AUDIT_DATAVIEWED_BY_LABEL")] = obj === null || obj === void 0 ? void 0 : obj.dataViewedBy;
        returnObject[t("AUDIT_ROLE_LABEL")] = (obj === null || obj === void 0 ? void 0 : (_obj$roles = obj.roles) === null || _obj$roles === void 0 ? void 0 : _obj$roles.map(obj => obj.name).join(", ")) || "-";
        return {
          ...returnObject
        };
      })]);
    }
  }, [data]);
  const onSort = useCallback(args => {
    if (args.length === 0) return;
    setValue("sortBy", args.id);
    setValue("sortOrder", args.desc ? "DESC" : "ASC");
  }, []);
  function onPageSizeChange(e) {
    setValue("limit", Number(e.target.value));
    handleSubmit(onSubmit)();
  }
  function nextPage() {
    setValue("offset", getValues("offset") + getValues("limit"));
    handleSubmit(onSubmit)();
  }
  function previousPage() {
    setValue("offset", getValues("offset") - getValues("limit"));
    handleSubmit(onSubmit)();
  }
  const isMobile = window.Digit.Utils.browser.isMobile();
  if (isMobile) {
    return /*#__PURE__*/React.createElement(MobileSearchApplication, {
      Controller,
      isLoading,
      showLoader,
      register,
      control,
      t,
      reset,
      previousPage,
      handleSubmit,
      tenantId,
      data,
      onSubmit
    });
  }
  const GetCell = value => /*#__PURE__*/React.createElement("span", {
    className: "cell-text"
  }, value);
  const columns = useMemo(() => [{
    Header: t("AUDIT_DATE_LABEL"),
    disableSortBy: true,
    accessor: row => {
      const timestamp = row.timestamp === "NA" ? t("WS_NA") : convertEpochToDate(row.timestamp);
      return GetCell(`${timestamp || "-"}`);
    }
  }, {
    Header: t("AUDIT_TIME_LABEL"),
    disableSortBy: true,
    accessor: row => {
      const timestamp = row.timestamp === "NA" ? t("WS_NA") : convertEpochToTimeInHours(row.timestamp);
      return GetCell(`${timestamp || "-"}`);
    }
  }, {
    Header: isMobile ? t("AUDIT_DATAVIEWED_LABEL") : t("AUDIT_DATAVIEWED_PRIVACY"),
    disableSortBy: true,
    accessor: row => {
      var _row$dataView;
      return GetCell(`${(row === null || row === void 0 ? void 0 : (_row$dataView = row.dataView) === null || _row$dataView === void 0 ? void 0 : _row$dataView.join(", ")) || "-"}`);
    }
  }, {
    Header: isMobile ? t("AUDIT_DATAVIEWED_BY_LABEL") : t("AUDIT_DATAVIEWED_BY_PRIVACY"),
    disableSortBy: true,
    accessor: row => {
      return GetCell(`${(row === null || row === void 0 ? void 0 : row.dataViewedBy) || "-"}`);
    }
  }, {
    Header: t("AUDIT_ROLE_LABEL"),
    disableSortBy: true,
    accessor: row => {
      var _row$roles, _row$roles$slice, _row$roles$slice$map;
      return GetCell(`${(row === null || row === void 0 ? void 0 : (_row$roles = row.roles) === null || _row$roles === void 0 ? void 0 : (_row$roles$slice = _row$roles.slice(0, 3)) === null || _row$roles$slice === void 0 ? void 0 : (_row$roles$slice$map = _row$roles$slice.map(e => e.name)) === null || _row$roles$slice$map === void 0 ? void 0 : _row$roles$slice$map.join(", ")) || "-"}`);
    }
  }], []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginRight: "-70px"
    }
  }, " ", /*#__PURE__*/React.createElement(BackButton, null), " "), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "30px",
      marginLeft: "30px"
    }
  }, "  ", /*#__PURE__*/React.createElement(Header$1, null, t("PRIVACY_AUDIT_REPORT")), " "), /*#__PURE__*/React.createElement(SearchForm, {
    className: "audit-card",
    onSubmit: onSubmit,
    handleSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement(SearchFields, {
    register,
    control,
    reset,
    tenantId,
    t,
    previousPage
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "240px",
      marginLeft: "-55%",
      width: "80%"
    }
  }, data !== null && data !== void 0 && data.display ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "20x",
      maxWidth: "680%",
      marginLeft: "60px",
      backgroundColor: "white",
      height: "60px"
    }
  }, t(data.display).split("\\n").map((text, index) => /*#__PURE__*/React.createElement("p", {
    key: index,
    style: {
      textAlign: "center",
      paddingTop: "12px"
    }
  }, text))) : data !== "" ? /*#__PURE__*/React.createElement("div", {
    style: {
      backgroundColor: "white",
      marginRight: "200px",
      marginLeft: "2.5%",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sideContent",
    style: {
      float: "right",
      padding: "10px 30px"
    }
  }, /*#__PURE__*/React.createElement(DownloadBtn, {
    className: "mrlg cursorPointer",
    onClick: () => handleExcelDownload(tabledata)
  })), /*#__PURE__*/React.createElement(Table, {
    t: t,
    data: data.sort((a, b) => a.timestamp - b.timestamp),
    totalRecords: count,
    columns: columns,
    getCellProps: cellInfo => {
      return {
        style: {
          minWidth: cellInfo.column.Header === t("ES_INBOX_APPLICATION_NO") ? "240px" : "",
          padding: "20px 18px",
          fontSize: "16px"
        }
      };
    },
    onPageSizeChange: onPageSizeChange,
    currentPage: getValues("offset") / getValues("limit"),
    onNextPage: nextPage,
    onPrevPage: previousPage,
    pageSizeLimit: getValues("limit"),
    onSort: onSort,
    disableSort: false,
    sortParams: [{
      id: getValues("sortBy"),
      desc: getValues("sortOrder") === "DESC" ? true : false
    }]
  })) : /*#__PURE__*/React.createElement(Loader, null)));
};

const Search = ({
  path
}) => {
  var _data$ElasticSearchDa, _data$ElasticSearchDa2, _data$ElasticSearchDa3, _data$ElasticSearchDa4, _data$ElasticSearchDa5, _data$ElasticSearchDa6, _data$ElasticSearchDa7, _data$ElasticSearchDa8, _data$ElasticSearchDa9, _data$ElasticSearchDa10;
  const {
    t
  } = useTranslation();
  const tenantId = Digit.ULBService.getCitizenCurrentTenant();
  const [payload, setPayload] = useState({});
  const isMobile = window.Digit.Utils.browser.isMobile();
  const convertDateToEpoch = (dateString, dayStartOrEnd = "dayend") => {
    try {
      const parts = dateString.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
      const DateObj = new Date(Date.UTC(parts[1], parts[2] - 1, parts[3]));
      DateObj.setMinutes(DateObj.getMinutes() + DateObj.getTimezoneOffset());
      if (dayStartOrEnd === "dayend") {
        DateObj.setHours(DateObj.getHours() + 24);
        DateObj.setSeconds(DateObj.getSeconds() - 1);
      }
      if (dayStartOrEnd === "daystart") {
        DateObj.setHours(DateObj.getHours());
        DateObj.setSeconds(DateObj.getSeconds() + 1);
      }
      return DateObj.getTime();
    } catch (e) {
      return dateString;
    }
  };
  function onSubmit(_data) {
    Digit.SessionStorage.set("AUDIT_APPLICATION_DETAIL", {
      offset: 0,
      limit: 10
    });
    let data = {
      ..._data,
      fromDate: convertDateToEpoch(_data === null || _data === void 0 ? void 0 : _data.fromDate, (_data === null || _data === void 0 ? void 0 : _data.fromDate) == (_data === null || _data === void 0 ? void 0 : _data.toDate) ? "daystart" : ""),
      toDate: convertDateToEpoch(_data === null || _data === void 0 ? void 0 : _data.toDate, (_data === null || _data === void 0 ? void 0 : _data.fromDate) == (_data === null || _data === void 0 ? void 0 : _data.toDate) ? "dayend" : "")
    };
    setPayload(Object.keys(data).filter(k => data[k]).reduce((acc, key) => ({
      ...acc,
      [key]: typeof data[key] === "object" ? data[key] : data[key]
    }), {}));
  }
  useEffect(() => {
    const storedPayload = Digit.SessionStorage.get("AUDIT_APPLICATION_DETAIL") || {};
    if (storedPayload) {
      const data = {
        ...storedPayload
      };
      setPayload(Object.keys(data).filter(k => data[k]).reduce((acc, key) => ({
        ...acc,
        [key]: typeof data[key] === "object" ? data[key].code : data[key]
      }), {}));
    }
  }, []);
  const config = {
    enabled: !!(payload && Object.keys(payload).length > 0)
  };
  let curoffset = window.location.href.split("/").pop();
  let previousoffset;
  let currentoffset;
  if (!isNaN(parseInt(curoffset))) {
    currentoffset = curoffset;
    previousoffset = parseInt(curoffset) + 10;
  } else {
    previousoffset = 10;
  }
  const newObj = isMobile ? {
    ...payload,
    offset: !isNaN(parseInt(curoffset)) ? parseInt(currentoffset) : 0
  } : {
    ...payload
  };
  const {
    isLoading,
    data
  } = Digit.Hooks.useAudit({
    tenantId,
    filters: {
      ...newObj
    },
    config
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SearchApplication, {
    t: t,
    tenantId: tenantId,
    onSubmit: onSubmit,
    data: !isLoading ? (data === null || data === void 0 ? void 0 : (_data$ElasticSearchDa = data.ElasticSearchData) === null || _data$ElasticSearchDa === void 0 ? void 0 : (_data$ElasticSearchDa2 = _data$ElasticSearchDa.filter(e => !e.total)) === null || _data$ElasticSearchDa2 === void 0 ? void 0 : _data$ElasticSearchDa2.length) > 0 ? data === null || data === void 0 ? void 0 : (_data$ElasticSearchDa3 = data.ElasticSearchData) === null || _data$ElasticSearchDa3 === void 0 ? void 0 : _data$ElasticSearchDa3.filter(e => !e.total) : {
      display: "ES_COMMON_NO_DATA"
    } : "",
    count: data === null || data === void 0 ? void 0 : (_data$ElasticSearchDa4 = data.ElasticSearchData) === null || _data$ElasticSearchDa4 === void 0 ? void 0 : (_data$ElasticSearchDa5 = _data$ElasticSearchDa4.filter(e => e.total)) === null || _data$ElasticSearchDa5 === void 0 ? void 0 : (_data$ElasticSearchDa6 = _data$ElasticSearchDa5[0]) === null || _data$ElasticSearchDa6 === void 0 ? void 0 : _data$ElasticSearchDa6.total,
    isLoading: isLoading
  }), isMobile && (data === null || data === void 0 ? void 0 : (_data$ElasticSearchDa7 = data.ElasticSearchData) === null || _data$ElasticSearchDa7 === void 0 ? void 0 : (_data$ElasticSearchDa8 = _data$ElasticSearchDa7.filter(e => !e.total)) === null || _data$ElasticSearchDa8 === void 0 ? void 0 : _data$ElasticSearchDa8.length) && (data === null || data === void 0 ? void 0 : (_data$ElasticSearchDa9 = data.ElasticSearchData) === null || _data$ElasticSearchDa9 === void 0 ? void 0 : (_data$ElasticSearchDa10 = _data$ElasticSearchDa9.filter(e => !e.total)) === null || _data$ElasticSearchDa10 === void 0 ? void 0 : _data$ElasticSearchDa10.length) !== 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      marginLeft: "16px",
      marginBottom: "40px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "link"
  }, /*#__PURE__*/React.createElement(Link, {
    to: `/digit-ui/citizen/Audit/${previousoffset}`
  }, t("PT_LOAD_MORE_MSG"))))));
};

const sidebarHiddenFor = ["digit-ui/citizen/register/name", "/digit-ui/citizen/select-language", "/digit-ui/citizen/select-location", "/digit-ui/citizen/login", "/digit-ui/citizen/register/otp"];
const getTenants$1 = (codes, tenants) => {
  return tenants.filter(tenant => codes.map(item => item.code).includes(tenant.code));
};
const Home$1 = ({
  stateInfo,
  userDetails,
  CITIZEN,
  cityDetails,
  mobileView,
  handleUserDropdownSelection,
  logoUrl,
  DSO,
  stateCode,
  modules,
  appTenants,
  sourceUrl,
  pathname,
  initData
}) => {
  const {
    isLoading: islinkDataLoading,
    data: linkData,
    isFetched: isLinkDataFetched
  } = Digit.Hooks.useCustomMDMS(Digit.ULBService.getStateId(), "ACCESSCONTROL-ACTIONS-TEST", [{
    name: "actions-test",
    filter: "[?(@.url == 'digit-ui-card')]"
  }], {
    select: data => {
      var _data$ACCESSCONTROLA, _data$ACCESSCONTROLA$;
      const formattedData = data === null || data === void 0 ? void 0 : (_data$ACCESSCONTROLA = data["ACCESSCONTROL-ACTIONS-TEST"]) === null || _data$ACCESSCONTROLA === void 0 ? void 0 : (_data$ACCESSCONTROLA$ = _data$ACCESSCONTROLA["actions-test"]) === null || _data$ACCESSCONTROLA$ === void 0 ? void 0 : _data$ACCESSCONTROLA$.filter(el => el.enabled === true).reduce((a, b) => {
        var _a$b$parentModule;
        a[b.parentModule] = ((_a$b$parentModule = a[b.parentModule]) === null || _a$b$parentModule === void 0 ? void 0 : _a$b$parentModule.length) > 0 ? [b, ...a[b.parentModule]] : [b];
        return a;
      }, {});
      return formattedData;
    }
  });
  const classname = Digit.Hooks.fsm.useRouteSubscription(pathname);
  const {
    t
  } = useTranslation();
  const {
    path
  } = useRouteMatch();
  sourceUrl = "https://s3.ap-south-1.amazonaws.com/egov-qa-assets";
  const history = useHistory();
  const hideSidebar = sidebarHiddenFor.some(e => window.location.href.includes(e));
  const appRoutes = modules.map(({
    code,
    tenants
  }, index) => {
    const Module = Digit.ComponentRegistryService.getComponent(`${code}Module`);
    return Module ? /*#__PURE__*/React.createElement(Route, {
      key: index,
      path: `${path}/${code.toLowerCase()}`
    }, /*#__PURE__*/React.createElement(Module, {
      stateCode: stateCode,
      moduleCode: code,
      userType: "citizen",
      tenants: getTenants$1(tenants, appTenants)
    })) : null;
  });
  const ModuleLevelLinkHomePages = modules.map(({
    code,
    bannerImage
  }, index) => {
    let Links = Digit.ComponentRegistryService.getComponent(`${code}Links`) || (() => /*#__PURE__*/React.createElement(React.Fragment, null));
    let mdmsDataObj = isLinkDataFetched ? processLinkData(linkData, code, t) : undefined;
    (mdmsDataObj === null || mdmsDataObj === void 0 ? void 0 : mdmsDataObj.links) && (mdmsDataObj === null || mdmsDataObj === void 0 ? void 0 : mdmsDataObj.links.sort((a, b) => {
      return a.orderNumber - b.orderNumber;
    }));
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Route, {
      key: index,
      path: `${path}/${code.toLowerCase()}-home`
    }, /*#__PURE__*/React.createElement("div", {
      className: "moduleLinkHomePage"
    }, /*#__PURE__*/React.createElement(BackButton, {
      className: "moduleLinkHomePageBackButton"
    }), window.innerWidth <= 660 ? /*#__PURE__*/React.createElement("img", {
      src: "https://velocity-upyog-assets.s3.ap-south-1.amazonaws.com/mobile_banner_3.png"
    }) : /*#__PURE__*/React.createElement("img", {
      src: "https://velocity-upyog-assets.s3.ap-south-1.amazonaws.com/home_banner_3.png"   ,
      alt: "noimagefound"
    }), /*#__PURE__*/React.createElement("div", {
      className: "moduleLinkHomePageModuleLinks"
    }, mdmsDataObj && /*#__PURE__*/React.createElement(CitizenHomeCard, {
      header: t(mdmsDataObj === null || mdmsDataObj === void 0 ? void 0 : mdmsDataObj.header),
      links: mdmsDataObj === null || mdmsDataObj === void 0 ? void 0 : mdmsDataObj.links,
      Icon: () => /*#__PURE__*/React.createElement("span", null),
      Info: code === "OBPS" ? () => /*#__PURE__*/React.createElement(CitizenInfoLabel, {
        style: {
          margin: "0px",
          padding: "10px"
        },
        info: t("CS_FILE_APPLICATION_INFO_LABEL"),
        text: t(`BPA_CITIZEN_HOME_STAKEHOLDER_INCLUDES_INFO_LABEL`)
      }) : null,
      isInfo: code === "OBPS" ? true : false
    })), /*#__PURE__*/React.createElement(StaticDynamicCard, {
      moduleCode: code === null || code === void 0 ? void 0 : code.toUpperCase()
    }))), /*#__PURE__*/React.createElement(Route, {
      key: "faq" + index,
      path: `${path}/${code.toLowerCase()}-faq`
    }, /*#__PURE__*/React.createElement(FAQsSection, {
      module: code === null || code === void 0 ? void 0 : code.toUpperCase()
    })), /*#__PURE__*/React.createElement(Route, {
      key: "hiw" + index,
      path: `${path}/${code.toLowerCase()}-how-it-works`
    }, /*#__PURE__*/React.createElement(HowItWorks, {
      module: code === null || code === void 0 ? void 0 : code.toUpperCase()
    })));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: classname
  }, /*#__PURE__*/React.createElement(TopBarSideBar, {
    t: t,
    stateInfo: stateInfo,
    userDetails: userDetails,
    CITIZEN: CITIZEN,
    cityDetails: cityDetails,
    mobileView: mobileView,
    handleUserDropdownSelection: handleUserDropdownSelection,
    logoUrl: logoUrl,
    showSidebar: true,
    linkData: linkData,
    islinkDataLoading: islinkDataLoading
  }), /*#__PURE__*/React.createElement("div", {
    className: `main center-container citizen-home-container mb-25`
  }, hideSidebar ? null : /*#__PURE__*/React.createElement("div", {
    className: "SideBarStatic"
  }, /*#__PURE__*/React.createElement(StaticCitizenSideBar, {
    linkData: linkData,
    islinkDataLoading: islinkDataLoading
  })), /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(Route, {
    exact: true,
    path: path
  }, /*#__PURE__*/React.createElement(Home, null)), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/feedback`,
    component: CitizenFeedback
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/feedback-acknowledgement`,
    component: AcknowledgementCF
  }), /*#__PURE__*/React.createElement(Route, {
    exact: true,
    path: `${path}/select-language`
  }, /*#__PURE__*/React.createElement(LanguageSelection$1, null)), /*#__PURE__*/React.createElement(Route, {
    exact: true,
    path: `${path}/select-location`
  }, /*#__PURE__*/React.createElement(LocationSelection, null)), /*#__PURE__*/React.createElement(Route, {
    path: `${path}/error`
  }, /*#__PURE__*/React.createElement(ErrorComponent, {
    initData: initData,
    goToHome: () => {
      history.push("/digit-ui/citizen");
    }
  })), /*#__PURE__*/React.createElement(Route, {
    path: `${path}/all-services`
  }, /*#__PURE__*/React.createElement(AppHome, {
    userType: "citizen",
    modules: modules,
    getCitizenMenu: linkData,
    fetchedCitizen: isLinkDataFetched,
    isLoading: islinkDataLoading
  })), /*#__PURE__*/React.createElement(Route, {
    path: `${path}/login`
  }, /*#__PURE__*/React.createElement(Login, {
    stateCode: stateCode
  })), /*#__PURE__*/React.createElement(Route, {
    path: `${path}/register`
  }, /*#__PURE__*/React.createElement(Login, {
    stateCode: stateCode,
    isUserRegistered: false
  })), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/user/profile`
  }, /*#__PURE__*/React.createElement(UserProfile, {
    stateCode: stateCode,
    userType: "citizen",
    cityDetails: cityDetails
  })), /*#__PURE__*/React.createElement(Route, {
    path: `${path}/Audit`
  }, /*#__PURE__*/React.createElement(Search, null)), /*#__PURE__*/React.createElement(ErrorBoundary, {
    initData: initData
  }, appRoutes, ModuleLevelLinkHomePages))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      position: 'fixed',
      bottom: 0,
      backgroundColor: "white",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      color: "black"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      cursor: "pointer",
      fontSize: window.Digit.Utils.browser.isMobile() ? "12px" : "14px",
      fontWeight: "400"
    },
    onClick: () => {
      window.open('https://www.digit.org/', '_blank').focus();
    }
  }, "Developed & Supported by: ", /*#__PURE__*/React.createElement("br", null), " ", /*#__PURE__*/React.createElement("a", {
    href: "https://www.velsof.com/",
    target: "_blank",
    style: {
      textDecoration: "underline"
    }
  }, "Velocity Software Solutions Pvt. Ltd.")), /*#__PURE__*/React.createElement("span", {
    style: {
      margin: "0 10px",
      fontSize: window.Digit.Utils.browser.isMobile() ? "12px" : "14px"
    }
  }, "|"), /*#__PURE__*/React.createElement("a", {
    style: {
      cursor: "pointer",
      fontSize: window.Digit.Utils.browser.isMobile() ? "12px" : "14px",
      fontWeight: "400"
    },
    href: "#",
    target: "_blank"
  }, "Platform ", /*#__PURE__*/React.createElement("b", null, "UPYOG")), /*#__PURE__*/React.createElement("span", {
    className: "upyog-copyright-footer",
    style: {
      margin: "0 10px",
      fontSize: window.Digit.Utils.browser.isMobile() ? "12px" : "14px"
    }
  }, "|"), /*#__PURE__*/React.createElement("span", {
    className: "upyog-copyright-footer",
    style: {
      cursor: "pointer",
      fontSize: window.Digit.Utils.browser.isMobile() ? "12px" : "14px",
      fontWeight: "400"
    },
    onClick: () => {
      window.open('https://niua.in/', '_blank').focus();
    }
  }, "Supported by: ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("img", {
    className: "city unicef-logo",
    src: "https://velocity-upyog-assets.s3.ap-south-1.amazonaws.com/unicef_logo_3.png" ,
    alt: "unicef",
    style: window.innerWidth <= 660 ? {
      backgroundColor: "#00AEEF",
      minWidth: "61px",
      minHeight: "50px",
      height: "50px"
    } : {
      backgroundColor: "#00AEEF",
      height: "25px"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "upyog-copyright-footer-web"
  }, /*#__PURE__*/React.createElement("span", {
    className: "",
    style: {
      cursor: "pointer",
      fontSize: window.Digit.Utils.browser.isMobile() ? "12px" : "14px",
      fontWeight: "400"
    },
    onClick: () => {
      window.open('https://niua.in/', '_blank').focus();
    }
  }, "Copyright \xA9 2022 National Institute of Urban Affairs"))));
};

const DigitApp = ({
  stateCode,
  modules,
  appTenants,
  logoUrl,
  initData
}) => {
  var _userDetails$info;
  const history = useHistory();
  const {
    pathname
  } = useLocation();
  const innerWidth = window.innerWidth;
  const cityDetails = Digit.ULBService.getCurrentUlb();
  const userDetails = Digit.UserService.getUser();
  const {
    data: storeData
  } = Digit.Hooks.useStore.getInitData();
  const {
    stateInfo
  } = storeData || {};
  const DSO = Digit.UserService.hasAccess(["FSM_DSO"]);
  let CITIZEN = (userDetails === null || userDetails === void 0 ? void 0 : (_userDetails$info = userDetails.info) === null || _userDetails$info === void 0 ? void 0 : _userDetails$info.type) === "CITIZEN" || !window.location.pathname.split("/").includes("employee") ? true : false;
  if (window.location.pathname.split("/").includes("employee")) CITIZEN = false;
  useEffect(() => {
    if (!(pathname !== null && pathname !== void 0 && pathname.includes("application-details"))) {
      if (!(pathname !== null && pathname !== void 0 && pathname.includes("inbox"))) {
        Digit.SessionStorage.del("fsm/inbox/searchParams");
      }
      if (pathname !== null && pathname !== void 0 && pathname.includes("search")) {
        Digit.SessionStorage.del("fsm/search/searchParams");
      }
    }
    if (!(pathname !== null && pathname !== void 0 && pathname.includes("dss"))) {
      Digit.SessionStorage.del("DSS_FILTERS");
    }
    if ((pathname === null || pathname === void 0 ? void 0 : pathname.toString()) === "/digit-ui/employee") {
      Digit.SessionStorage.del("SEARCH_APPLICATION_DETAIL");
      Digit.SessionStorage.del("WS_EDIT_APPLICATION_DETAILS");
    }
    if ((pathname === null || pathname === void 0 ? void 0 : pathname.toString()) === "/digit-ui/citizen" || (pathname === null || pathname === void 0 ? void 0 : pathname.toString()) === "/digit-ui/employee") {
      Digit.SessionStorage.del("WS_DISCONNECTION");
    }
  }, [pathname]);
  history.listen(() => {
    var _window;
    (_window = window) === null || _window === void 0 ? void 0 : _window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  });
  const handleUserDropdownSelection = option => {
    option.func();
  };
  const mobileView = innerWidth <= 640;
  let sourceUrl = `${window.location.origin}/citizen`;
  const commonProps = {
    stateInfo,
    userDetails,
    CITIZEN,
    cityDetails,
    mobileView,
    handleUserDropdownSelection,
    logoUrl,
    DSO,
    stateCode,
    modules,
    appTenants,
    sourceUrl,
    pathname,
    initData
  };
  return /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(Route, {
    path: "/digit-ui/employee"
  }, /*#__PURE__*/React.createElement(EmployeeApp, commonProps)), /*#__PURE__*/React.createElement(Route, {
    path: "/digit-ui/citizen"
  }, /*#__PURE__*/React.createElement(Home$1, commonProps)), /*#__PURE__*/React.createElement(Route, null, /*#__PURE__*/React.createElement(Redirect, {
    to: "/digit-ui/citizen"
  })));
};

const commonReducer = defaultData => (state = defaultData, action) => {
  switch (action.type) {
    case "LANGUAGE_SELECT":
      return {
        ...state,
        selectedLanguage: action.payload
      };
    default:
      return state;
  }
};

const getRootReducer = (defaultStore, moduleReducers) => combineReducers({
  common: commonReducer(defaultStore),
  ...moduleReducers
});
const middleware = [thunk];
const composeEnhancers = typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const enhancer = composeEnhancers(applyMiddleware(...middleware));
const getStore = (defaultStore, moduleReducers = {}) => {
  return createStore(getRootReducer(defaultStore, moduleReducers), enhancer);
};

const DigitUIWrapper = ({
  stateCode,
  enabledModules,
  moduleReducers
}) => {
  var _initData$stateInfo;
  const {
    isLoading,
    data: initData
  } = Digit.Hooks.useInitStore(stateCode, enabledModules);
  if (isLoading) {
    return /*#__PURE__*/React.createElement(Loader, {
      page: true
    });
  }
  const i18n = getI18n();
  return /*#__PURE__*/React.createElement(Provider, {
    store: getStore(initData, moduleReducers(initData))
  }, /*#__PURE__*/React.createElement(BrowserRouter, null, /*#__PURE__*/React.createElement(Body, null, /*#__PURE__*/React.createElement(DigitApp, {
    initData: initData,
    stateCode: stateCode,
    modules: initData === null || initData === void 0 ? void 0 : initData.modules,
    appTenants: initData.tenants,
    logoUrl: initData === null || initData === void 0 ? void 0 : (_initData$stateInfo = initData.stateInfo) === null || _initData$stateInfo === void 0 ? void 0 : _initData$stateInfo.logoUrl
  }))));
};
const DigitUI = ({
  stateCode,
  registry,
  enabledModules,
  moduleReducers
}) => {
  const [privacy, setPrivacy] = useState(Digit.Utils.getPrivacyObject() || {});
  const userType = Digit.UserService.getType();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 15 * 60 * 1000,
        cacheTime: 50 * 60 * 1000,
        retryDelay: attemptIndex => Infinity,
        retry: false
      }
    }
  });
  const ComponentProvider = Digit.Contexts.ComponentProvider;
  const PrivacyProvider = Digit.Contexts.PrivacyProvider;
  const DSO = Digit.UserService.hasAccess(["FSM_DSO"]);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ErrorBoundary, null, /*#__PURE__*/React.createElement(QueryClientProvider, {
    client: queryClient
  }, /*#__PURE__*/React.createElement(ComponentProvider.Provider, {
    value: registry
  }, /*#__PURE__*/React.createElement(PrivacyProvider.Provider, {
    value: {
      privacy: privacy === null || privacy === void 0 ? void 0 : privacy[window.location.pathname],
      resetPrivacy: _data => {
        Digit.Utils.setPrivacyObject({});
        setPrivacy({});
      },
      getPrivacy: () => {
        const privacyObj = Digit.Utils.getPrivacyObject();
        setPrivacy(privacyObj);
        return privacyObj;
      },
      updatePrivacyDescoped: _data => {
        const privacyObj = Digit.Utils.getAllPrivacyObject();
        const newObj = {
          ...privacyObj,
          [window.location.pathname]: _data
        };
        Digit.Utils.setPrivacyObject({
          ...newObj
        });
        setPrivacy((privacyObj === null || privacyObj === void 0 ? void 0 : privacyObj[window.location.pathname]) || {});
      },
      updatePrivacy: (uuid, fieldName) => {
        setPrivacy(Digit.Utils.updatePrivacy(uuid, fieldName) || {});
      }
    }
  }, /*#__PURE__*/React.createElement(DigitUIWrapper, {
    stateCode: stateCode,
    enabledModules: enabledModules,
    moduleReducers: moduleReducers
  }))))));
};
const componentsToRegister = {
  SelectOtp,
  AcknowledgementCF,
  CitizenFeedback
};
const initCoreComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};

export { DigitUI, initCoreComponents };
//# sourceMappingURL=index.modern.js.map
