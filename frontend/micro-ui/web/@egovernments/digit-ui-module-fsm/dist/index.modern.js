import { ShippingTruck, EmployeeModuleCard, TickMark, FormStep, RadioOrSelect, LabelFieldPair, CardLabel, Dropdown as Dropdown$2, Loader, RadioButtons, LocationSearchCard, TextArea, CardLabelError, TextInput, CitizenInfoLabel, WrapUnMaskComponent, PitDimension, ImageUploadHandler, CardText, KeyNote, BackButton, PrivateRoute, TelePhone, CardSectionHeader, CheckPoint, ConnectingCheckPoints, ActionLinks, Rating, SubmitBar, Header, MultiLink, Card, CardHeader, CardSubHeader, StatusTable, Row, LinkButton, Banner, RatingCard, ULBHomeCard, AddNewIcon, ViewReportIcon, InboxIcon, Table, CheckBox, CloseSvg, Localities, RemoveableTag, ActionBar, ApplyFilterBar, Label, LinkLabel, DatePicker as DatePicker$3, DetailsCard, SearchAction, FilterAction, PopUp, BreadCrumb, Modal, FormComposer, UploadPitPhoto, ImageViewer, BreakLine, Toast, Menu, MultiUploadWrapper, AddIcon, ToggleSwitch, EditIcon, DeleteIcon, CitizenHomeCard, CitizenTruck } from '@egovernments/digit-ui-react-components';
import React, { useState, useEffect, Fragment, useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams, Switch, Redirect, Link, useHistory, useRouteMatch, Route } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import TimePicker from 'react-time-picker';

const getPropertyTypeLocale = value => {
  return `PROPERTYTYPE_MASTERS_${value === null || value === void 0 ? void 0 : value.split(".")[0]}`;
};
const getPropertySubtypeLocale = value => `PROPERTYTYPE_MASTERS_${value}`;
const getVehicleType = (vehicle, t) => {
  return (vehicle === null || vehicle === void 0 ? void 0 : vehicle.i18nKey) && (vehicle === null || vehicle === void 0 ? void 0 : vehicle.capacity) && `${t(vehicle.i18nKey)} - ${vehicle.capacity} ${t("CS_COMMON_CAPACITY_LTRS")}` || null;
};
const checkForEmployee = roles => {
  var _userInfo$info;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const userInfo = Digit.UserService.getUser();
  let rolesArray = [];
  const rolearray = userInfo === null || userInfo === void 0 ? void 0 : (_userInfo$info = userInfo.info) === null || _userInfo$info === void 0 ? void 0 : _userInfo$info.roles.filter(item => {
    for (let i = 0; i < roles.length; i++) {
      if (item.code == roles[i] && item.tenantId === tenantId) rolesArray.push(true);
    }
  });
  return rolesArray === null || rolesArray === void 0 ? void 0 : rolesArray.length;
};
const convertEpochToDate = dateEpoch => {
  if (dateEpoch) {
    const dateFromApi = new Date(dateEpoch);
    let month = dateFromApi.getMonth() + 1;
    let day = dateFromApi.getDate();
    let year = dateFromApi.getFullYear();
    month = (month > 9 ? "" : "0") + month;
    day = (day > 9 ? "" : "0") + day;
    return `${year}-${month}-${day}`;
  } else {
    return null;
  }
};

const FSMCard = () => {
  const {
    t
  } = useTranslation();
  const DSO = Digit.UserService.hasAccess(["FSM_DSO"]) || false;
  const COLLECTOR = Digit.UserService.hasAccess("FSM_COLLECTOR") || false;
  const FSM_ADMIN = Digit.UserService.hasAccess("FSM_ADMIN") || false;
  const FSM_EDITOR = Digit.UserService.hasAccess("FSM_EDITOR_EMP") || false;
  const FSM_CREATOR = Digit.UserService.hasAccess("FSM_CREATOR_EMP") || false;
  const isFSTPOperator = Digit.UserService.hasAccess("FSM_EMP_FSTPO") || false;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  if (!Digit.Utils.fsmAccess()) {
    return null;
  }
  const config = {
    enabled: isFSTPOperator ? true : false,
    select: data => {
      const info = data.vehicleTrip.reduce((info, trip) => {
        const totalVol = trip.tripDetails.reduce((vol, details) => details.volume + vol, 0);
        info[t("ES_READY_FOR_DISPOSAL")] += totalVol / 1000;
        return info;
      }, {
        [t("ES_READY_FOR_DISPOSAL")]: 0
      });
      info[t("ES_READY_FOR_DISPOSAL")] = `(${info[t("ES_READY_FOR_DISPOSAL")]} KL)`;
      return info;
    }
  };
  const {
    isLoading,
    data: info,
    isSuccess
  } = Digit.Hooks.fsm.useVehicleSearch({
    tenantId,
    filters: {
      applicationStatus: "WAITING_FOR_DISPOSAL"
    },
    config
  });
  const filters = {
    sortBy: "createdTime",
    sortOrder: "DESC",
    total: true
  };
  const getUUIDFilter = () => {
    if (FSM_EDITOR || FSM_CREATOR || COLLECTOR || FSM_ADMIN) return {
      uuid: {
        code: "ASSIGNED_TO_ALL",
        name: t("ES_INBOX_ASSIGNED_TO_ALL")
      }
    };else return {
      uuid: {
        code: "ASSIGNED_TO_ME",
        name: t("ES_INBOX_ASSIGNED_TO_ME")
      }
    };
  };
  const {
    data: inbox,
    isFetching: pendingApprovalRefetching,
    isLoading: isInboxLoading
  } = Digit.Hooks.fsm.useInbox(tenantId, {
    ...filters,
    limit: 10,
    offset: 0,
    ...getUUIDFilter()
  }, {
    enabled: !isFSTPOperator ? true : false
  });
  const propsForFSTPO = {
    Icon: /*#__PURE__*/React.createElement(ShippingTruck, null),
    moduleName: t("ES_COMMON_FSTP_OPERATION"),
    links: [{
      label: t("ES_COMMON_INBOX"),
      link: "/digit-ui/employee/fsm/fstp-inbox"
    }, {
      label: t("ES_FSM_ADD_NEW_BUTTON"),
      link: "/digit-ui/employee/fsm/fstp-add-vehicle"
    }, {
      label: t("ES_FSM_VIEW_REPORTS_BUTTON"),
      link: "/employee/report/fsm/FSMFSTPPlantWithVehicleLogReport",
      hyperlink: true
    }]
  };
  let links = [{
    link: "/employee/report/fsm/FSMDailyDesludingReport",
    hyperlink: true,
    label: t("ES_FSM_VIEW_REPORTS_BUTTON"),
    roles: ["FSM_ADMIN"]
  }, {
    label: t("ES_TITLE_FSM_REGISTRY"),
    link: `/digit-ui/employee/fsm/registry`,
    roles: ["FSM_ADMIN"]
  }, {
    label: t("ES_TITLE_NEW_DESULDGING_APPLICATION"),
    link: `/digit-ui/employee/fsm/new-application`,
    roles: ["FSM_CREATOR_EMP", "FSM_ADMIN"]
  }, {
    label: t("ES_TITILE_SEARCH_APPLICATION"),
    link: `/digit-ui/employee/fsm/search`
  }];
  links = links.filter(link => link.roles ? checkForEmployee(link.roles) : true);
  const propsForModuleCard = {
    Icon: /*#__PURE__*/React.createElement(ShippingTruck, null),
    moduleName: t("ES_TITLE_FAECAL_SLUDGE_MGMT"),
    kpis: [{
      count: isInboxLoading ? "-" : inbox === null || inbox === void 0 ? void 0 : inbox.totalCount,
      label: t("TOTAL_FSM"),
      link: `/digit-ui/employee/fsm/inbox`
    }, {
      count: isInboxLoading ? "-" : inbox === null || inbox === void 0 ? void 0 : inbox.nearingSlaCount,
      label: t("TOTAL_NEARING_SLA"),
      link: `/digit-ui/employee/fsm/inbox`
    }],
    links: [{
      count: isInboxLoading ? "-" : inbox === null || inbox === void 0 ? void 0 : inbox.totalCount,
      link: "/digit-ui/employee/fsm/inbox",
      label: t("ES_COMMON_INBOX")
    }, ...links]
  };
  return isFSTPOperator ? /*#__PURE__*/React.createElement(EmployeeModuleCard, propsForFSTPO) : /*#__PURE__*/React.createElement(EmployeeModuleCard, Object.assign({}, propsForModuleCard, {
    longModuleName: true,
    FsmHideCount: false
  }));
};

let actions = [];
const getAction = flow => {
  switch (flow) {
    case "STAKEHOLDER":
      actions = [];
      break;
    case "APPLY":
      actions = ['FSM_TIMELINE_PROPERTY_DETAILS', 'FSM_GENDER_DETAILS', 'FSM_PAYMENT_DETAILS', 'FSM_TIMELINE_SUMMARY'];
      break;
    case "PT_APPLY":
      actions = ['ES_NEW_APPLICATION_PROPERTY_DETAILS', 'PT_OWNERSHIP_INFO_SUB_HEADER', 'CE_DOCUMENT_DETAILS', 'PT_COMMON_SUMMARY'];
      break;
    default:
      actions = ['TL_COMMON_TR_DETAILS', 'TL_LOCATION_AND_OWNER_DETAILS', 'TL_DOCUMENT_DETAIL', 'TL_COMMON_SUMMARY'];
  }
};
const Timeline = ({
  currentStep: _currentStep = 1,
  flow: _flow = ""
}) => {
  const {
    t
  } = useTranslation();
  const isMobile = window.Digit.Utils.browser.isMobile();
  getAction(_flow);
  return /*#__PURE__*/React.createElement("div", {
    className: "timeline-container",
    style: isMobile ? {} : {
      maxWidth: "960px",
      marginRight: "auto"
    }
  }, actions.map((action, index, arr) => /*#__PURE__*/React.createElement("div", {
    className: "timeline-checkpoint",
    key: index
  }, /*#__PURE__*/React.createElement("div", {
    className: "timeline-content"
  }, /*#__PURE__*/React.createElement("span", {
    className: `circle ${index <= _currentStep - 1 && 'active'}`
  }, index < _currentStep - 1 ? /*#__PURE__*/React.createElement(TickMark, null) : index + 1), /*#__PURE__*/React.createElement("span", {
    className: "secondary-color"
  }, t(action))), index < arr.length - 1 && /*#__PURE__*/React.createElement("span", {
    className: `line ${index < _currentStep - 1 && 'active'}`
  }))));
};

const CheckSlum = ({
  t,
  config,
  onSelect,
  userType,
  formData
}) => {
  var _formData$address, _formData$address2, _formData$address2$lo;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  const [slumArea, setSlumArea] = useState(formData === null || formData === void 0 ? void 0 : (_formData$address = formData.address) === null || _formData$address === void 0 ? void 0 : _formData$address.slumArea);
  const locality = formData === null || formData === void 0 ? void 0 : (_formData$address2 = formData.address) === null || _formData$address2 === void 0 ? void 0 : (_formData$address2$lo = _formData$address2.locality) === null || _formData$address2$lo === void 0 ? void 0 : _formData$address2$lo.code.split("_")[3];
  const onSkip = () => onSelect();
  function goNext() {
    sessionStorage.removeItem("Digit.total_amount");
    onSelect(config.key, {
      slumArea
    });
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Timeline, {
    currentStep: 1,
    flow: "APPLY"
  }), /*#__PURE__*/React.createElement(FormStep, {
    t: t,
    config: config,
    onSelect: goNext,
    onSkip: onSkip,
    isDisabled: !slumArea
  }, /*#__PURE__*/React.createElement(RadioOrSelect, {
    isMandatory: config.isMandatory,
    options: [{
      code: true,
      i18nKey: "CS_COMMON_YES"
    }, {
      code: false,
      i18nKey: "CS_COMMON_NO"
    }],
    selectedOption: slumArea,
    optionKey: "i18nKey",
    onSelect: setSlumArea
  })));
};

const FSMSelectAddress = ({
  t,
  config,
  onSelect,
  userType,
  formData
}) => {
  var _formData$address5;
  const allCities = Digit.Hooks.fsm.useTenants();
  let tenantId = Digit.ULBService.getCurrentTenantId();
  const {
    pincode,
    city
  } = (formData === null || formData === void 0 ? void 0 : formData.address) || "";
  const cities = userType === "employee" ? allCities.filter(city => city.code === tenantId) : pincode ? allCities.filter(city => {
    var _city$pincode;
    return city === null || city === void 0 ? void 0 : (_city$pincode = city.pincode) === null || _city$pincode === void 0 ? void 0 : _city$pincode.some(pin => pin == pincode);
  }) : allCities;
  const [selectedCity, setSelectedCity] = useState(() => {
    var _formData$address;
    return (formData === null || formData === void 0 ? void 0 : (_formData$address = formData.address) === null || _formData$address === void 0 ? void 0 : _formData$address.city) || Digit.SessionStorage.get("fsm.file.address.city") || null;
  });
  const {
    data: fetchedLocalities
  } = Digit.Hooks.useBoundaryLocalities(selectedCity === null || selectedCity === void 0 ? void 0 : selectedCity.code, "revenue", {
    enabled: !!selectedCity
  }, t);
  const [localities, setLocalities] = useState();
  const [selectedLocality, setSelectedLocality] = useState();
  useEffect(() => {
    if (cities) {
      if (cities.length === 1) {
        setSelectedCity(cities[0]);
      }
    }
  }, [cities]);
  useEffect(() => {
    if (selectedCity && fetchedLocalities) {
      var _formData$address2, _formData$address3;
      let __localityList = fetchedLocalities;
      let filteredLocalityList = [];
      if (formData !== null && formData !== void 0 && (_formData$address2 = formData.address) !== null && _formData$address2 !== void 0 && _formData$address2.locality) {
        setSelectedLocality(formData.address.locality);
      }
      if (formData !== null && formData !== void 0 && (_formData$address3 = formData.address) !== null && _formData$address3 !== void 0 && _formData$address3.pincode) {
        var _formData$address4;
        filteredLocalityList = __localityList.filter(obj => {
          var _obj$pincode;
          return (_obj$pincode = obj.pincode) === null || _obj$pincode === void 0 ? void 0 : _obj$pincode.find(item => item == formData.address.pincode);
        });
        if (!(formData !== null && formData !== void 0 && (_formData$address4 = formData.address) !== null && _formData$address4 !== void 0 && _formData$address4.locality)) setSelectedLocality();
      }
      if (userType === "employee") {
        onSelect(config.key, {
          ...formData[config.key],
          city: selectedCity
        });
      }
      setLocalities(() => filteredLocalityList.length > 0 ? filteredLocalityList : __localityList);
      if (filteredLocalityList.length === 1) {
        setSelectedLocality(filteredLocalityList[0]);
        if (userType === "employee") {
          onSelect(config.key, {
            ...formData[config.key],
            locality: filteredLocalityList[0]
          });
        }
      }
    }
  }, [selectedCity, formData === null || formData === void 0 ? void 0 : (_formData$address5 = formData.address) === null || _formData$address5 === void 0 ? void 0 : _formData$address5.pincode, fetchedLocalities]);
  function selectCity(city) {
    setSelectedLocality(null);
    setLocalities(null);
    Digit.SessionStorage.set("fsm.file.address.city", city);
    setSelectedCity(city);
  }
  function selectLocality(locality) {
    setSelectedLocality(locality);
    if (userType === "employee") {
      onSelect(config.key, {
        ...formData[config.key],
        locality: locality
      });
    }
  }
  function onSubmit() {
    onSelect(config.key, {
      city: selectedCity,
      locality: selectedLocality
    });
  }
  if (userType === "employee") {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(LabelFieldPair, null, /*#__PURE__*/React.createElement(CardLabel, {
      className: "card-label-smaller"
    }, t("MYCITY_CODE_LABEL"), config.isMandatory ? " * " : null), /*#__PURE__*/React.createElement(Dropdown$2, {
      className: "form-field",
      isMandatory: true,
      selected: (cities === null || cities === void 0 ? void 0 : cities.length) === 1 ? cities[0] : selectedCity,
      disable: (cities === null || cities === void 0 ? void 0 : cities.length) === 1,
      option: cities,
      select: selectCity,
      optionKey: "code",
      t: t
    })), /*#__PURE__*/React.createElement(LabelFieldPair, null, /*#__PURE__*/React.createElement(CardLabel, {
      className: "card-label-smaller"
    }, t("ES_NEW_APPLICATION_LOCATION_MOHALLA"), config.isMandatory ? " * " : null), /*#__PURE__*/React.createElement(Dropdown$2, {
      className: "form-field",
      isMandatory: true,
      selected: selectedLocality,
      option: localities,
      select: selectLocality,
      optionKey: "i18nkey",
      t: t
    })));
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Timeline, {
    currentStep: 1,
    flow: "APPLY"
  }), /*#__PURE__*/React.createElement(FormStep, {
    config: config,
    onSelect: onSubmit,
    t: t,
    isDisabled: selectedLocality ? false : true
  }, /*#__PURE__*/React.createElement(CardLabel, null, `${t("MYCITY_CODE_LABEL")} *`), /*#__PURE__*/React.createElement(RadioOrSelect, {
    options: cities,
    selectedOption: selectedCity,
    optionKey: "i18nKey",
    onSelect: selectCity,
    t: t
  }), selectedCity && localities && /*#__PURE__*/React.createElement(CardLabel, null, `${t("CS_CREATECOMPLAINT_MOHALLA")} *`), selectedCity && localities && /*#__PURE__*/React.createElement(RadioOrSelect, {
    isMandatory: config.isMandatory,
    options: localities,
    selectedOption: selectedLocality,
    optionKey: "i18nkey",
    onSelect: selectLocality,
    t: t
  })));
};

const SelectChannel = ({
  t,
  config,
  onSelect,
  formData: _formData = {},
  userType
}) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const {
    pathname: url
  } = useLocation();
  const editScreen = url.includes("/modify-application/");
  const {
    data: channelMenu
  } = Digit.Hooks.fsm.useMDMS(tenantId, "FSM", "EmployeeApplicationChannel");
  const [channel, setChannel] = useState(_formData === null || _formData === void 0 ? void 0 : _formData.channel);
  function selectChannel(value) {
    setChannel(value);
    onSelect(config.key, value);
  }
  return channelMenu ? /*#__PURE__*/React.createElement(Dropdown$2, {
    option: channelMenu,
    optionKey: "i18nKey",
    id: "channel",
    selected: channel,
    select: selectChannel,
    t: t,
    disable: editScreen,
    autoFocus: !editScreen
  }) : /*#__PURE__*/React.createElement(Loader, null);
};

const SelectGender = ({
  config,
  onSelect,
  t,
  userType,
  formData
}) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  const {
    data: GenderData,
    isLoading
  } = Digit.Hooks.fsm.useMDMS(stateId, "common-masters", "FSMGenderType");
  const [genderType, setGenderType] = useState(formData === null || formData === void 0 ? void 0 : formData.genderType);
  useEffect(() => {
    if (!isLoading && GenderData) {
      const preFilledGenderType = GenderData.filter(genderType => {
        var _formData$selectGende;
        return genderType.code === ((formData === null || formData === void 0 ? void 0 : (_formData$selectGende = formData.selectGender) === null || _formData$selectGende === void 0 ? void 0 : _formData$selectGende.code) || (formData === null || formData === void 0 ? void 0 : formData.selectGender));
      })[0];
      setGenderType(preFilledGenderType);
    }
  }, [formData === null || formData === void 0 ? void 0 : formData.selectGender, GenderData]);
  const selectGenderType = value => {
    setGenderType(value);
    if (userType === "employee") {
      onSelect(config.key, value);
      onSelect("genderDetail", null);
    }
  };
  const onSkip = () => {
    onSelect();
  };
  const onSubmit = () => {
    onSelect(config.key, genderType);
  };
  if (isLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  if (userType === "employee") {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Dropdown$2, {
      className: "payment-form-text-input-correction",
      isMandatory: config.isMandatory,
      selected: genderType,
      option: GenderData,
      select: selectGenderType,
      optionKey: "i18nKey",
      disable: config.disable,
      t: t
    }));
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Timeline, {
    currentStep: 2,
    flow: "APPLY"
  }), /*#__PURE__*/React.createElement(FormStep, {
    config: config,
    onSelect: onSubmit,
    onSkip: onSkip,
    isDisabled: !genderType,
    t: t
  }, /*#__PURE__*/React.createElement(RadioOrSelect, {
    options: GenderData,
    selectedOption: genderType,
    optionKey: "i18nKey",
    onSelect: selectGenderType,
    t: t,
    isMandatory: config.isMandatory
  })));
};

const SelectPaymentType = ({
  t,
  config,
  onSelect,
  formData: _formData = {},
  userType,
  register,
  errors
}) => {
  var _formData$paymentPref2;
  const stateId = Digit.ULBService.getStateId();
  const {
    data: paymentData,
    isLoading
  } = Digit.Hooks.fsm.useMDMS(stateId, "FSM", "PaymentType");
  const {
    pathname: url
  } = useLocation();
  const editScreen = url.includes("/modify-application/");
  const [paymentType, setPaymentType] = useState(null);
  const [isSlum, setIsSlum] = useState();
  const inputs = [{
    label: "Payment Preference",
    type: "RadioButton",
    name: "paymentPreference",
    options: paymentData,
    isMandatory: false
  }];
  useEffect(() => {
    if (!isLoading && paymentData) {
      const preFilledPaymentType = paymentData.filter(paymentType => {
        var _formData$paymentPref;
        return paymentType.code === ((_formData === null || _formData === void 0 ? void 0 : (_formData$paymentPref = _formData.paymentPreference) === null || _formData$paymentPref === void 0 ? void 0 : _formData$paymentPref.code) || (_formData === null || _formData === void 0 ? void 0 : _formData.paymentPreference));
      })[0];
      preFilledPaymentType ? setPaymentType(preFilledPaymentType) : setPaymentType(paymentData.find(i => i.code === "POST_PAY"));
    }
  }, [_formData, _formData === null || _formData === void 0 ? void 0 : (_formData$paymentPref2 = _formData.paymentPreference) === null || _formData$paymentPref2 === void 0 ? void 0 : _formData$paymentPref2.code, _formData === null || _formData === void 0 ? void 0 : _formData.paymentPreference, paymentData]);
  useEffect(() => {
    if (_formData !== null && _formData !== void 0 && _formData.address) {
      const {
        slum: slumDetails
      } = _formData.address;
      slumDetails ? setIsSlum(true) : setIsSlum(false);
    }
  }, [_formData]);
  function selectPaymentType(value) {
    setPaymentType(value);
    onSelect(config.key, value.code);
  }
  return /*#__PURE__*/React.createElement("div", null, inputs === null || inputs === void 0 ? void 0 : inputs.map((input, index) => {
    var _formData$tripData;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: index
    }, (_formData === null || _formData === void 0 ? void 0 : (_formData$tripData = _formData.tripData) === null || _formData$tripData === void 0 ? void 0 : _formData$tripData.amountPerTrip) !== 0 && input.type === "RadioButton" && /*#__PURE__*/React.createElement(LabelFieldPair, null, /*#__PURE__*/React.createElement(CardLabel, {
      className: "card-label-smaller"
    }, t(input.label), input.isMandatory ? " * " : null), /*#__PURE__*/React.createElement("div", {
      className: "field"
    }, /*#__PURE__*/React.createElement(RadioButtons, {
      selectedOption: paymentType,
      onSelect: selectPaymentType,
      style: {
        display: "flex",
        marginBottom: 0
      },
      innerStyles: {
        marginLeft: "10px"
      },
      options: input.options,
      optionsKey: "i18nKey",
      disabled: editScreen
    }))));
  }));
};

const FSMSelectGeolocation = ({
  t,
  config,
  onSelect,
  formData: _formData = {}
}) => {
  var _formData$address, _formData$address2;
  const [pincode, setPincode] = useState((_formData === null || _formData === void 0 ? void 0 : (_formData$address = _formData.address) === null || _formData$address === void 0 ? void 0 : _formData$address.pincode) || "");
  const [geoLocation, setGeoLocation] = useState((_formData === null || _formData === void 0 ? void 0 : (_formData$address2 = _formData.address) === null || _formData$address2 === void 0 ? void 0 : _formData$address2.geoLocation) || {});
  const tenants = Digit.Hooks.fsm.useTenants();
  const [pincodeServicability, setPincodeServicability] = useState(null);
  const onSkip = () => onSelect();
  const onChange = (code, location) => {
    setPincodeServicability(null);
    const foundValue = tenants === null || tenants === void 0 ? void 0 : tenants.find(obj => {
      var _obj$pincode;
      return (_obj$pincode = obj.pincode) === null || _obj$pincode === void 0 ? void 0 : _obj$pincode.find(item => item == code);
    });
    if (!foundValue) {
      setPincodeServicability("CS_COMMON_PINCODE_NOT_SERVICABLE");
      setPincode("");
      setGeoLocation({});
    } else {
      setPincode(code);
      setGeoLocation(location);
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Timeline, {
    currentStep: 1,
    flow: "APPLY"
  }), /*#__PURE__*/React.createElement(LocationSearchCard, {
    header: t("CS_ADDCOMPLAINT_SELECT_GEOLOCATION_HEADER"),
    cardText: t("CS_ADDCOMPLAINT_SELECT_GEOLOCATION_TEXT"),
    nextText: t("CS_COMMON_NEXT"),
    skipAndContinueText: t("CORE_COMMON_SKIP_CONTINUE"),
    skip: onSkip,
    t: t,
    position: geoLocation,
    onSave: () => onSelect(config.key, {
      geoLocation,
      pincode
    }),
    onChange: (code, location) => onChange(code, location),
    disabled: pincode === "",
    forcedError: t(pincodeServicability)
  }));
};

const FSMSelectLandmark = ({
  t,
  config,
  onSelect,
  formData,
  userType
}) => {
  var _formData$address2;
  const [landmark, setLandmark] = useState();
  const [error, setError] = useState("");
  const inputs = [{
    label: "ES_NEW_APPLICATION_LOCATION_LANDMARK",
    type: "textarea",
    name: "landmark",
    validation: {
      maxLength: 1024
    }
  }];
  useEffect(() => {
    var _formData$address;
    setLandmark(formData === null || formData === void 0 ? void 0 : (_formData$address = formData.address) === null || _formData$address === void 0 ? void 0 : _formData$address.landmark);
  }, [formData === null || formData === void 0 ? void 0 : (_formData$address2 = formData.address) === null || _formData$address2 === void 0 ? void 0 : _formData$address2.landmark]);
  function onChange(e) {
    if (e.target.value.length > 1024) {
      setError("CS_COMMON_LANDMARK_MAX_LENGTH");
    } else {
      setError(null);
      setLandmark(e.target.value);
      if (userType === "employee") {
        onSelect(config.key, {
          ...formData[config.key],
          landmark: e.target.value
        });
      }
    }
  }
  if (userType === "employee") {
    return inputs === null || inputs === void 0 ? void 0 : inputs.map((input, index) => {
      return /*#__PURE__*/React.createElement(LabelFieldPair, {
        key: index
      }, /*#__PURE__*/React.createElement(CardLabel, {
        className: "card-label-smaller"
      }, t(input.label), config.isMandatory ? " * " : null), /*#__PURE__*/React.createElement(TextArea, Object.assign({
        className: "form-field",
        id: input.name,
        value: landmark,
        onChange: onChange,
        name: input.name || ""
      }, input.validation)));
    });
  }
  const onSkip = () => onSelect();
  return /*#__PURE__*/React.createElement(React.Fragment, null, window.location.href.includes("/pt") ? /*#__PURE__*/React.createElement(Timeline, {
    currentStep: 1,
    flow: "PT_APPLY"
  }) : window.location.href.includes("/tl") ? /*#__PURE__*/React.createElement(Timeline, {
    currentStep: 2
  }) : /*#__PURE__*/React.createElement(Timeline, {
    currentStep: 1,
    flow: "APPLY"
  }), /*#__PURE__*/React.createElement(FormStep, {
    config: {
      ...config,
      inputs
    },
    value: landmark,
    onChange: onChange,
    onSelect: data => onSelect(config.key, {
      ...formData[config.key],
      ...data
    }),
    onSkip: onSkip,
    t: t,
    forcedError: t(error),
    isDisabled: landmark ? false : true
  }));
};

const SelectName = ({
  t,
  config,
  onSelect,
  formData: _formData = {},
  userType,
  register,
  errors
}) => {
  const stateId = Digit.ULBService.getStateId();
  const {
    data: GenderData,
    isLoading
  } = Digit.Hooks.fsm.useMDMS(stateId, "common-masters", "FSMGenderType");
  const {
    pathname: url
  } = useLocation();
  const editScreen = url.includes("/modify-application/");
  const [dropdownValue, setDropdownValue] = useState("");
  const [genderTypes, setGenderTypes] = useState([]);
  const inputs = [{
    label: "ES_NEW_APPLICATION_APPLICANT_NAME",
    type: "text",
    name: "applicantName",
    validation: {
      isRequired: true,
      pattern: "^[a-zA-Z]+( [a-zA-Z]+)*$",
      title: t("CORE_COMMON_APPLICANT_NAME_INVALID")
    },
    isMandatory: true
  }, {
    label: "ES_NEW_APPLICATION_APPLICANT_MOBILE_NO",
    type: "text",
    name: "mobileNumber",
    validation: {
      isRequired: true,
      pattern: "[6-9]{1}[0-9]{9}",
      type: "tel",
      title: t("CORE_COMMON_APPLICANT_MOBILE_NUMBER_INVALID")
    },
    componentInFront: /*#__PURE__*/React.createElement("div", {
      className: "employee-card-input employee-card-input--front"
    }, "+91"),
    isMandatory: true
  }, {
    label: "COMMON_APPLICANT_GENDER",
    type: "dropdown",
    name: "applicantGender",
    options: genderTypes,
    isMandatory: false
  }];
  useEffect(() => {
    if (!isLoading && GenderData) {
      setGenderTypes(GenderData);
    }
  }, [GenderData]);
  function setValue(value, input) {
    onSelect(config.key, {
      ..._formData[config.key],
      [input]: value
    });
  }
  function selectDropdown(value) {
    setDropdownValue(value);
    onSelect(config.key, {
      ..._formData[config.key],
      applicantGender: value.code
    });
  }
  return /*#__PURE__*/React.createElement("div", null, inputs === null || inputs === void 0 ? void 0 : inputs.map((input, index) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: index
  }, input.type === "text" && /*#__PURE__*/React.createElement(React.Fragment, null, errors[input.name] && /*#__PURE__*/React.createElement(CardLabelError, null, t(input.error)), /*#__PURE__*/React.createElement(LabelFieldPair, null, /*#__PURE__*/React.createElement(CardLabel, {
    className: "card-label-smaller"
  }, t(input.label), input.isMandatory ? " * " : null), /*#__PURE__*/React.createElement("div", {
    className: "field",
    style: {
      display: "flex"
    }
  }, input.componentInFront ? input.componentInFront : null, /*#__PURE__*/React.createElement(TextInput, Object.assign({
    key: input.name,
    value: _formData && _formData[config.key] ? _formData[config.key][input.name] : null,
    onChange: e => setValue(e.target.value, input.name),
    disable: editScreen
  }, input.validation))))), input.type === "dropdown" && /*#__PURE__*/React.createElement(LabelFieldPair, null, /*#__PURE__*/React.createElement(CardLabel, {
    className: "card-label-smaller"
  }, t(input.label), input.isMandatory ? " * " : null), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement(Dropdown$2, {
    option: input.options,
    optionKey: "i18nKey",
    id: "dropdown",
    selected: _formData && _formData[config.key] ? input.options.find(data => data.code === _formData[config.key][input.name]) : null,
    select: selectDropdown,
    t: t,
    disable: editScreen,
    autoFocus: !editScreen
  }))))));
};

const FSMSelectPincode = ({
  t,
  config,
  onSelect,
  formData: _formData = {},
  userType,
  register,
  errors,
  props
}) => {
  var _formData$address, _formData$address3, _formData$address6;
  const tenants = Digit.Hooks.fsm.useTenants();
  const [pincode, setPincode] = useState((_formData === null || _formData === void 0 ? void 0 : (_formData$address = _formData.address) === null || _formData$address === void 0 ? void 0 : _formData$address.pincode) || "");
  const [pincodeServicability, setPincodeServicability] = useState(null);
  const {
    pathname
  } = useLocation();
  const presentInModifyApplication = pathname.includes("modify");
  const inputs = [{
    label: "CORE_COMMON_PINCODE",
    type: "text",
    name: "pincode",
    validation: {
      minlength: 6,
      maxlength: 6,
      pattern: "^[1-9][0-9]*",
      max: "9999999",
      title: t("CORE_COMMON_PINCODE_INVALID")
    }
  }];
  useEffect(() => {
    var _formData$address2;
    if (_formData !== null && _formData !== void 0 && (_formData$address2 = _formData.address) !== null && _formData$address2 !== void 0 && _formData$address2.pincode) {
      setPincode(_formData.address.pincode);
    }
  }, [_formData === null || _formData === void 0 ? void 0 : (_formData$address3 = _formData.address) === null || _formData$address3 === void 0 ? void 0 : _formData$address3.pincode]);
  useEffect(() => {
    var _formData$address4, _formData$address4$lo;
    if ((_formData === null || _formData === void 0 ? void 0 : (_formData$address4 = _formData.address) === null || _formData$address4 === void 0 ? void 0 : (_formData$address4$lo = _formData$address4.locality) === null || _formData$address4$lo === void 0 ? void 0 : _formData$address4$lo.pincode) !== pincode && userType === "employee") {
      var _formData$address5, _formData$address5$lo;
      setPincode((_formData === null || _formData === void 0 ? void 0 : (_formData$address5 = _formData.address) === null || _formData$address5 === void 0 ? void 0 : (_formData$address5$lo = _formData$address5.locality) === null || _formData$address5$lo === void 0 ? void 0 : _formData$address5$lo.pincode) || "");
      setPincodeServicability(null);
    }
  }, [_formData === null || _formData === void 0 ? void 0 : (_formData$address6 = _formData.address) === null || _formData$address6 === void 0 ? void 0 : _formData$address6.locality]);
  useEffect(() => {
    if (userType === "employee" && pincode) {
      onSelect(config.key, {
        ..._formData.address,
        pincode: (pincode === null || pincode === void 0 ? void 0 : pincode[0]) || pincode
      });
    }
  }, [pincode]);
  function onChange(e) {
    setPincode(e.target.value);
    setPincodeServicability(null);
    if (userType === "employee") {
      const foundValue = tenants === null || tenants === void 0 ? void 0 : tenants.find(obj => {
        var _obj$pincode;
        return (_obj$pincode = obj.pincode) === null || _obj$pincode === void 0 ? void 0 : _obj$pincode.find(item => item.toString() === e.target.value);
      });
      if (foundValue) {
        const city = tenants.filter(obj => {
          var _obj$pincode2;
          return (_obj$pincode2 = obj.pincode) === null || _obj$pincode2 === void 0 ? void 0 : _obj$pincode2.find(item => item == e.target.value);
        })[0];
        onSelect(config.key, {
          ..._formData.address,
          city,
          pincode: e.target.value,
          slum: null
        });
      } else {
        onSelect(config.key, {
          ..._formData.address,
          pincode: e.target.value
        });
        setPincodeServicability("CS_COMMON_PINCODE_NOT_SERVICABLE");
      }
    }
  }
  const goNext = async data => {
    const foundValue = tenants === null || tenants === void 0 ? void 0 : tenants.find(obj => {
      var _obj$pincode3;
      return (_obj$pincode3 = obj.pincode) === null || _obj$pincode3 === void 0 ? void 0 : _obj$pincode3.find(item => item == (data === null || data === void 0 ? void 0 : data.pincode));
    });
    if (foundValue) {
      onSelect(config.key, {
        pincode
      });
    } else {
      setPincodeServicability("CS_COMMON_PINCODE_NOT_SERVICABLE");
    }
  };
  if (userType === "employee") {
    return inputs === null || inputs === void 0 ? void 0 : inputs.map((input, index) => {
      return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(LabelFieldPair, {
        key: index
      }, /*#__PURE__*/React.createElement(CardLabel, {
        className: "card-label-smaller"
      }, t(input.label), config.isMandatory ? " * " : null), /*#__PURE__*/React.createElement("div", {
        className: "field"
      }, /*#__PURE__*/React.createElement(TextInput, Object.assign({
        key: input.name,
        value: pincode,
        onChange: onChange
      }, input.validation)))), pincodeServicability && /*#__PURE__*/React.createElement(CardLabelError, {
        style: {
          width: "70%",
          marginLeft: "30%",
          fontSize: "12px",
          marginTop: "-21px"
        }
      }, t(pincodeServicability)));
    });
  }
  const onSkip = () => onSelect();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Timeline, {
    currentStep: 1,
    flow: "APPLY"
  }), /*#__PURE__*/React.createElement(FormStep, {
    t: t,
    config: {
      ...config,
      inputs
    },
    onSelect: goNext,
    _defaultValues: {
      pincode
    },
    onChange: onChange,
    onSkip: onSkip,
    forcedError: t(pincodeServicability),
    isDisabled: !pincode
  }));
};

const SelectPitType = ({
  t,
  formData,
  config,
  onSelect,
  userType
}) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  const [pitType, setPitType] = useState(formData === null || formData === void 0 ? void 0 : formData.pitType);
  const {
    data: sanitationMenu,
    isLoading
  } = Digit.Hooks.fsm.useMDMS(stateId, "FSM", "PitType");
  const selectPitType = value => {
    setPitType(value);
    if (userType === "employee") {
      onSelect(config.key, value);
      onSelect("pitDetail", null);
    }
  };
  const onSkip = () => {
    onSelect();
  };
  const onSubmit = () => {
    onSelect(config.key, pitType);
  };
  if (isLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  if (userType === "employee") {
    return /*#__PURE__*/React.createElement(Dropdown$2, {
      isMandatory: true,
      option: sanitationMenu,
      optionKey: "i18nKey",
      select: selectPitType,
      selected: pitType,
      t: t
    });
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Timeline, {
    currentStep: 1,
    flow: "APPLY"
  }), /*#__PURE__*/React.createElement(FormStep, {
    config: config,
    onSelect: onSubmit,
    onSkip: onSkip,
    isDisabled: !pitType,
    t: t
  }, /*#__PURE__*/React.createElement(CardLabel, null, t("CS_FILE_APPLICATION_PIT_TYPE_LABEL")), /*#__PURE__*/React.createElement(RadioOrSelect, {
    isMandatory: config.isMandatory,
    options: sanitationMenu,
    selectedOption: pitType,
    optionKey: "i18nKey",
    onSelect: selectPitType,
    t: t
  })));
};

const SelectPropertySubtype = ({
  config,
  onSelect,
  t,
  userType,
  formData
}) => {
  const {
    pathname: url
  } = useLocation();
  const select = items => items.map(item => ({
    ...item,
    i18nKey: t(item.i18nKey)
  }));
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  const {
    isLoading: propertySubtypesDataLoading,
    data: propertySubtypesData
  } = Digit.Hooks.fsm.useMDMS(stateId, "FSM", "PropertySubtype", {
    select
  });
  const [subtype, setSubtype] = useState();
  const [subtypeOptions, setSubtypeOptions] = useState([]);
  const {
    propertyType
  } = formData || {};
  useEffect(() => {
    if (!propertySubtypesDataLoading && propertySubtypesData) {
      const preFillSubtype = propertySubtypesData === null || propertySubtypesData === void 0 ? void 0 : propertySubtypesData.filter(subType => {
        var _formData$subtype;
        return subType.code === ((formData === null || formData === void 0 ? void 0 : (_formData$subtype = formData.subtype) === null || _formData$subtype === void 0 ? void 0 : _formData$subtype.code) || (formData === null || formData === void 0 ? void 0 : formData.subtype));
      })[0];
      if (typeof propertyType === "string" && (preFillSubtype === null || preFillSubtype === void 0 ? void 0 : preFillSubtype.code.split(".")[0]) === propertyType || (preFillSubtype === null || preFillSubtype === void 0 ? void 0 : preFillSubtype.code.split(".")[0]) === (propertyType === null || propertyType === void 0 ? void 0 : propertyType.code)) {
        setSubtype(preFillSubtype);
      } else {
        setSubtype(null);
      }
    }
  }, [propertyType, formData === null || formData === void 0 ? void 0 : formData.subtype, propertySubtypesData]);
  useEffect(() => {
    if (!propertySubtypesDataLoading && propertyType) {
      const subTypes = propertySubtypesData.filter(item => item.propertyType === ((propertyType === null || propertyType === void 0 ? void 0 : propertyType.code) || propertyType));
      setSubtypeOptions(subTypes);
    }
  }, [propertyType, propertySubtypesDataLoading, propertySubtypesData]);
  const selectedValue = value => {
    setSubtype(value);
  };
  const goNext = () => {
    sessionStorage.removeItem("Digit.total_amount");
    onSelect(config.key, subtype);
  };
  function selectedSubType(value) {
    onSelect(config.key, value.code);
  }
  if (propertySubtypesDataLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  if (userType === "employee") {
    return /*#__PURE__*/React.createElement(Dropdown$2, {
      option: subtypeOptions,
      optionKey: "i18nKey",
      id: "propertySubType",
      selected: subtype,
      select: selectedSubType,
      t: t,
      disable: url.includes("/modify-application/") || url.includes("/new-application") ? false : true
    });
  } else {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Timeline, {
      currentStep: 1,
      flow: "APPLY"
    }), /*#__PURE__*/React.createElement(FormStep, {
      config: config,
      onSelect: goNext,
      isDisabled: !subtype,
      t: t
    }, /*#__PURE__*/React.createElement(CardLabel, null, `${t("CS_FILE_APPLICATION_PROPERTY_SUBTYPE_LABEL")} *`), /*#__PURE__*/React.createElement(RadioOrSelect, {
      options: subtypeOptions,
      selectedOption: subtype,
      optionKey: "i18nKey",
      onSelect: selectedValue,
      t: t
    })));
  }
};

const SelectPropertyType = ({
  config,
  onSelect,
  t,
  userType,
  formData
}) => {
  const {
    pathname: url
  } = useLocation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  const select = items => items.map(item => ({
    ...item,
    i18nKey: t(item.i18nKey)
  }));
  const propertyTypesData = Digit.Hooks.fsm.useMDMS(stateId, "FSM", "PropertyType", {
    select
  });
  const [propertyType, setPropertyType] = useState();
  useEffect(() => {
    if (!propertyTypesData.isLoading && propertyTypesData.data) {
      const preFilledPropertyType = propertyTypesData.data.filter(propertyType => {
        var _formData$propertyTyp;
        return propertyType.code === ((formData === null || formData === void 0 ? void 0 : (_formData$propertyTyp = formData.propertyType) === null || _formData$propertyTyp === void 0 ? void 0 : _formData$propertyTyp.code) || (formData === null || formData === void 0 ? void 0 : formData.propertyType));
      })[0];
      setPropertyType(preFilledPropertyType);
    }
  }, [formData === null || formData === void 0 ? void 0 : formData.propertyType, propertyTypesData.data]);
  const goNext = () => {
    sessionStorage.removeItem("Digit.total_amount");
    onSelect(config.key, propertyType);
  };
  function selectedValue(value) {
    setPropertyType(value);
  }
  function selectedType(value) {
    onSelect(config.key, value.code);
  }
  if (propertyTypesData.isLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  if (userType === "employee") {
    return /*#__PURE__*/React.createElement(Dropdown$2, {
      option: propertyTypesData.data,
      optionKey: "i18nKey",
      id: "propertyType",
      selected: propertyType,
      select: selectedType,
      t: t,
      disable: url.includes("/modify-application/") || url.includes("/new-application") ? false : true
    });
  } else {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Timeline, {
      currentStep: 1,
      flow: "APPLY"
    }), /*#__PURE__*/React.createElement(FormStep, {
      config: config,
      onSelect: goNext,
      isDisabled: !propertyType,
      t: t
    }, /*#__PURE__*/React.createElement(CardLabel, null, `${t("CS_FILE_APPLICATION_PROPERTY_LABEL")} *`), /*#__PURE__*/React.createElement(RadioOrSelect, {
      options: propertyTypesData.data,
      selectedOption: propertyType,
      optionKey: "i18nKey",
      onSelect: selectedValue,
      t: t
    })), propertyType && /*#__PURE__*/React.createElement(CitizenInfoLabel, {
      info: t("CS_FILE_APPLICATION_INFO_LABEL"),
      text: t("CS_FILE_APPLICATION_INFO_TEXT", {
        content: t("CS_DEFAULT_INFO_TEXT"),
        ...propertyType
      })
    }));
  }
};

const SelectSlumName = ({
  config,
  onSelect,
  t,
  userType,
  formData
}) => {
  var _formData$address, _formData$address2, _formData$address4, _formData$address6, _formData$address9, _formData$address9$lo;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  const [slum, setSlum] = useState();
  const slumTenantId = formData !== null && formData !== void 0 && (_formData$address = formData.address) !== null && _formData$address !== void 0 && _formData$address.city ? formData === null || formData === void 0 ? void 0 : (_formData$address2 = formData.address) === null || _formData$address2 === void 0 ? void 0 : _formData$address2.city.code : tenantId;
  const {
    data: slumData,
    isLoading: slumDataLoading
  } = Digit.Hooks.fsm.useMDMS(slumTenantId, "FSM", "Slum");
  const [slumMenu, setSlumMenu] = useState();
  useEffect(() => {
    var _formData$address3, _formData$address3$sl;
    if (userType !== "employee" && (formData === null || formData === void 0 ? void 0 : (_formData$address3 = formData.address) === null || _formData$address3 === void 0 ? void 0 : (_formData$address3$sl = _formData$address3.slumArea) === null || _formData$address3$sl === void 0 ? void 0 : _formData$address3$sl.code) === false) onSelect(config.key, {
      slumData: null,
      slum: null
    }, true);
  }, [formData === null || formData === void 0 ? void 0 : (_formData$address4 = formData.address) === null || _formData$address4 === void 0 ? void 0 : _formData$address4.slumArea]);
  useEffect(() => {
    if (slumMenu && formData !== null && formData !== void 0 && formData.address) {
      const preSelectedSlum = slumMenu.filter(slum => {
        var _formData$address5;
        return slum.code === (formData === null || formData === void 0 ? void 0 : (_formData$address5 = formData.address) === null || _formData$address5 === void 0 ? void 0 : _formData$address5.slum);
      })[0];
      setSlum(preSelectedSlum);
    }
  }, [formData === null || formData === void 0 ? void 0 : (_formData$address6 = formData.address) === null || _formData$address6 === void 0 ? void 0 : _formData$address6.slum, slumMenu]);
  useEffect(() => {
    var _formData$address7, _formData$address7$lo;
    const locality = formData === null || formData === void 0 ? void 0 : (_formData$address7 = formData.address) === null || _formData$address7 === void 0 ? void 0 : (_formData$address7$lo = _formData$address7.locality) === null || _formData$address7$lo === void 0 ? void 0 : _formData$address7$lo.code;
    if (userType === "employee" && !slumDataLoading && slumData) {
      var _formData$address8;
      const optionalSlumData = slumData[locality] ? [{
        code: null,
        active: true,
        name: "Not residing in slum area",
        i18nKey: "ES_APPLICATION_NOT_SLUM_AREA"
      }, ...slumData[locality]] : [{
        code: null,
        active: true,
        name: "Not residing in slum area",
        i18nKey: "ES_APPLICATION_NOT_SLUM_AREA"
      }, ...Object.keys(slumData).map(key => slumData[key]).reduce((prev, curr) => [...prev, ...curr])];
      setSlumMenu(optionalSlumData);
      if (!(formData !== null && formData !== void 0 && (_formData$address8 = formData.address) !== null && _formData$address8 !== void 0 && _formData$address8.slum)) {
        setSlum({
          code: null,
          active: true,
          name: "Not residing in slum area",
          i18nKey: "ES_APPLICATION_NOT_SLUM_AREA"
        });
        onSelect(config.key, {
          ...formData[config.key],
          slum: null
        });
      }
    }
    if (userType !== "employee" && !slumDataLoading && slumData) {
      const allSlum = Object.keys(slumData).map(key => slumData[key]).reduce((prev, curr) => [...prev, ...curr]);
      slumData[locality] ? setSlumMenu(slumData[locality]) : setSlumMenu(allSlum);
    }
  }, [slumDataLoading, formData === null || formData === void 0 ? void 0 : (_formData$address9 = formData.address) === null || _formData$address9 === void 0 ? void 0 : (_formData$address9$lo = _formData$address9.locality) === null || _formData$address9$lo === void 0 ? void 0 : _formData$address9$lo.code]);
  function selectSlum(value) {
    setSlum(value);
    onSelect(config.key, {
      ...formData[config.key],
      slum: value.code
    });
  }
  function onSkip() {
    onSelect();
  }
  function goNext() {
    sessionStorage.removeItem("Digit.total_amount");
    onSelect(config.key, {
      ...formData[config.key],
      slum: slum.code,
      slumData: slum
    });
  }
  if (slumDataLoading) return /*#__PURE__*/React.createElement(Loader, null);
  return userType === "employee" ? /*#__PURE__*/React.createElement(LabelFieldPair, null, /*#__PURE__*/React.createElement(CardLabel, {
    className: "card-label-smaller"
  }, t("ES_NEW_APPLICATION_SLUM_NAME")), /*#__PURE__*/React.createElement(Dropdown$2, {
    t: t,
    option: slumMenu,
    className: "form-field",
    optionKey: "i18nKey",
    id: "slum",
    selected: slum,
    select: selectSlum
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Timeline, {
    currentStep: 1,
    flow: "APPLY"
  }), /*#__PURE__*/React.createElement(FormStep, {
    t: t,
    config: config,
    onSelect: goNext,
    onSkip: onSkip
  }, /*#__PURE__*/React.createElement(Dropdown$2, {
    t: t,
    option: slumMenu,
    optionKey: "i18nKey",
    id: "i18nKey",
    selected: slum,
    select: setSlum
  })));
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

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

const FSMSelectStreet = ({
  t,
  config,
  onSelect,
  userType,
  formData,
  formState,
  setError,
  clearErrors
}) => {
  var _formData$cpt9;
  const onSkip = () => onSelect();
  const [focusIndex, setFocusIndex] = useState({
    index: -1,
    type: ""
  });
  const {
    control,
    formState: localFormState,
    watch,
    setError: setLocalError,
    clearErrors: clearLocalErrors,
    setValue,
    getValues,
    trigger
  } = useForm();
  const formValue = watch();
  const {
    errors
  } = localFormState;
  const checkLocation = window.location.href.includes("tl/new-application") || window.location.href.includes("tl/renew-application-details") || window.location.href.includes("tl/edit-application-details/") || window.location.href.includes("/tl/tradelicence/new-application/street") || window.location.href.includes("/tl/tradelicence/renew-trade") || window.location.href.includes("/tl/tradelicence/edit-application");
  const isRenewal = window.location.href.includes("edit-application") || window.location.href.includes("tl/renew-application-details");
  const [street, setStreet] = useState();
  const [doorNo, setDoorNo] = useState();
  let inputs;
  if (window.location.href.includes("tl")) {
    inputs = config.inputs;
    config.inputs[0].disable = window.location.href.includes("edit-application");
    config.inputs[1].disable = window.location.href.includes("edit-application");
    inputs[0].validation = {
      minLength: 0,
      maxLength: 256
    };
    inputs[1].validation = {
      minLength: 0,
      maxLength: 256
    };
  } else {
    inputs = [{
      label: "PT_PROPERTY_ADDRESS_STREET_NAME",
      type: "text",
      name: "street",
      validation: {
        pattern: "[a-zA-Z0-9 ]{1,255}",
        title: t("CORE_COMMON_STREET_INVALID")
      }
    }, {
      label: "PT_PROPERTY_ADDRESS_HOUSE_NO",
      type: "text",
      name: "doorNo",
      validation: {
        pattern: "[A-Za-z0-9#,/ -]{1,63}",
        title: t("CORE_COMMON_DOOR_INVALID")
      }
    }];
  }
  const convertValidationToRules = ({
    validation,
    name,
    messages
  }) => {
    if (validation) {
      let {
        pattern: valPattern,
        maxlength,
        minlength,
        required: valReq
      } = validation || {};
      let pattern = value => {
        if (valPattern) {
          var _RegExp;
          if (valPattern instanceof RegExp) return valPattern.test(value) ? true : (messages === null || messages === void 0 ? void 0 : messages.pattern) || `${name.toUpperCase()}_PATTERN`;else if (typeof valPattern === "string") return (_RegExp = new RegExp(valPattern)) !== null && _RegExp !== void 0 && _RegExp.test(value) ? true : (messages === null || messages === void 0 ? void 0 : messages.pattern) || `${name.toUpperCase()}_PATTERN`;
        }
        return true;
      };
      let maxLength = value => maxlength ? (value === null || value === void 0 ? void 0 : value.length) <= maxlength ? true : (messages === null || messages === void 0 ? void 0 : messages.maxlength) || `${name.toUpperCase()}_MAXLENGTH` : true;
      let minLength = value => minlength ? (value === null || value === void 0 ? void 0 : value.length) >= minlength ? true : (messages === null || messages === void 0 ? void 0 : messages.minlength) || `${name.toUpperCase()}_MINLENGTH` : true;
      let required = value => valReq ? !!value ? true : (messages === null || messages === void 0 ? void 0 : messages.required) || `${name.toUpperCase()}_REQUIRED` : true;
      return {
        pattern,
        required,
        minLength,
        maxLength
      };
    }
    return {};
  };
  useEffect(() => {
    var _formData$cpt;
    if (window.location.href.includes("employee/tl/") && formData !== null && formData !== void 0 && (_formData$cpt = formData.cpt) !== null && _formData$cpt !== void 0 && _formData$cpt.details) {
      var _formData$cpt2, _formData$cpt2$detail, _formData$cpt2$detail2, _formData$cpt3, _formData$cpt3$detail, _formData$cpt3$detail2;
      setValue("doorNo", formData === null || formData === void 0 ? void 0 : (_formData$cpt2 = formData.cpt) === null || _formData$cpt2 === void 0 ? void 0 : (_formData$cpt2$detail = _formData$cpt2.details) === null || _formData$cpt2$detail === void 0 ? void 0 : (_formData$cpt2$detail2 = _formData$cpt2$detail.address) === null || _formData$cpt2$detail2 === void 0 ? void 0 : _formData$cpt2$detail2.doorNo);
      setValue("street", formData === null || formData === void 0 ? void 0 : (_formData$cpt3 = formData.cpt) === null || _formData$cpt3 === void 0 ? void 0 : (_formData$cpt3$detail = _formData$cpt3.details) === null || _formData$cpt3$detail === void 0 ? void 0 : (_formData$cpt3$detail2 = _formData$cpt3$detail.address) === null || _formData$cpt3$detail2 === void 0 ? void 0 : _formData$cpt3$detail2.street);
    }
  }, [formData]);
  useEffect(() => {
    trigger();
  }, []);
  useEffect(() => {
    var _formData$address, _formData$address2, _formData$address3, _formData$address4;
    if (formData !== null && formData !== void 0 && (_formData$address = formData.address) !== null && _formData$address !== void 0 && _formData$address.doorNo) setDoorNo(formData === null || formData === void 0 ? void 0 : (_formData$address2 = formData.address) === null || _formData$address2 === void 0 ? void 0 : _formData$address2.doorNo);
    if (formData !== null && formData !== void 0 && (_formData$address3 = formData.address) !== null && _formData$address3 !== void 0 && _formData$address3.street) setStreet(formData === null || formData === void 0 ? void 0 : (_formData$address4 = formData.address) === null || _formData$address4 === void 0 ? void 0 : _formData$address4.street);
  }, [formData === null || formData === void 0 ? void 0 : formData.address]);
  useEffect(() => {
    var _formData$address5, _formData$address6, _formData$address7, _formData$address8;
    if (formData !== null && formData !== void 0 && (_formData$address5 = formData.address) !== null && _formData$address5 !== void 0 && _formData$address5.doorNo) setDoorNo(formData === null || formData === void 0 ? void 0 : (_formData$address6 = formData.address) === null || _formData$address6 === void 0 ? void 0 : _formData$address6.doorNo);
    if (formData !== null && formData !== void 0 && (_formData$address7 = formData.address) !== null && _formData$address7 !== void 0 && _formData$address7.street) setStreet(formData === null || formData === void 0 ? void 0 : (_formData$address8 = formData.address) === null || _formData$address8 === void 0 ? void 0 : _formData$address8.street);
  }, [formData === null || formData === void 0 ? void 0 : formData.address]);
  useEffect(() => {
    var _formData$address9, _formData$address10, _formData$address11, _formData$address12;
    if (formData !== null && formData !== void 0 && (_formData$address9 = formData.address) !== null && _formData$address9 !== void 0 && _formData$address9.doorNo) setDoorNo(formData === null || formData === void 0 ? void 0 : (_formData$address10 = formData.address) === null || _formData$address10 === void 0 ? void 0 : _formData$address10.doorNo);
    if (formData !== null && formData !== void 0 && (_formData$address11 = formData.address) !== null && _formData$address11 !== void 0 && _formData$address11.street) setStreet(formData === null || formData === void 0 ? void 0 : (_formData$address12 = formData.address) === null || _formData$address12 === void 0 ? void 0 : _formData$address12.street);
  }, [formData === null || formData === void 0 ? void 0 : formData.address]);
  useEffect(() => {
    if (userType === "employee") {
      var _formState$errors$con;
      if (Object.keys(errors).length && !lodash.isEqual(((_formState$errors$con = formState.errors[config.key]) === null || _formState$errors$con === void 0 ? void 0 : _formState$errors$con.type) || {}, errors)) setError(config.key, {
        type: errors
      });else if (!Object.keys(errors).length && formState.errors[config.key]) clearErrors(config.key);
    }
  }, [errors]);
  useEffect(() => {
    const keys = Object.keys(formValue);
    const part = {};
    keys.forEach(key => {
      var _formData$config$key;
      return part[key] = (_formData$config$key = formData[config.key]) === null || _formData$config$key === void 0 ? void 0 : _formData$config$key[key];
    });
    if (!lodash.isEqual(formValue, part)) {
      onSelect(config.key, {
        ...formData[config.key],
        ...formValue
      });
      trigger();
    }
  }, [formValue]);
  useEffect(() => {
    var _formData$cpt4;
    if (formData !== null && formData !== void 0 && (_formData$cpt4 = formData.cpt) !== null && _formData$cpt4 !== void 0 && _formData$cpt4.details && window.location.href.includes("tl")) {
      var _inputs;
      (_inputs = inputs) === null || _inputs === void 0 ? void 0 : _inputs.map(input => {
        var _formData$cpt5, _formData$cpt5$detail, _formData$cpt5$detail2;
        if (getValues(input.name) !== (formData === null || formData === void 0 ? void 0 : (_formData$cpt5 = formData.cpt) === null || _formData$cpt5 === void 0 ? void 0 : (_formData$cpt5$detail = _formData$cpt5.details) === null || _formData$cpt5$detail === void 0 ? void 0 : (_formData$cpt5$detail2 = _formData$cpt5$detail.address) === null || _formData$cpt5$detail2 === void 0 ? void 0 : _formData$cpt5$detail2[input.name])) {
          var _formData$cpt6, _formData$cpt6$detail, _formData$cpt6$detail2, _formData$cpt7, _formData$cpt7$detail, _formData$cpt7$detail2, _formData$address13, _formData$address14, _formData$cpt8, _formData$cpt8$detail, _formData$cpt8$detail2;
          setValue(input.name, (formData === null || formData === void 0 ? void 0 : (_formData$cpt6 = formData.cpt) === null || _formData$cpt6 === void 0 ? void 0 : (_formData$cpt6$detail = _formData$cpt6.details) === null || _formData$cpt6$detail === void 0 ? void 0 : (_formData$cpt6$detail2 = _formData$cpt6$detail.address) === null || _formData$cpt6$detail2 === void 0 ? void 0 : _formData$cpt6$detail2[input.name]) === null || (formData === null || formData === void 0 ? void 0 : (_formData$cpt7 = formData.cpt) === null || _formData$cpt7 === void 0 ? void 0 : (_formData$cpt7$detail = _formData$cpt7.details) === null || _formData$cpt7$detail === void 0 ? void 0 : (_formData$cpt7$detail2 = _formData$cpt7$detail.address) === null || _formData$cpt7$detail2 === void 0 ? void 0 : _formData$cpt7$detail2[input.name]) === "" ? formData !== null && formData !== void 0 && (_formData$address13 = formData.address) !== null && _formData$address13 !== void 0 && _formData$address13[input.name] ? formData === null || formData === void 0 ? void 0 : (_formData$address14 = formData.address) === null || _formData$address14 === void 0 ? void 0 : _formData$address14[input.name] : "" : formData === null || formData === void 0 ? void 0 : (_formData$cpt8 = formData.cpt) === null || _formData$cpt8 === void 0 ? void 0 : (_formData$cpt8$detail = _formData$cpt8.details) === null || _formData$cpt8$detail === void 0 ? void 0 : (_formData$cpt8$detail2 = _formData$cpt8$detail.address) === null || _formData$cpt8$detail2 === void 0 ? void 0 : _formData$cpt8$detail2[input.name]);
        }
      });
    }
  }, [formData === null || formData === void 0 ? void 0 : (_formData$cpt9 = formData.cpt) === null || _formData$cpt9 === void 0 ? void 0 : _formData$cpt9.details]);
  const handleSkip = data => {
    let {
      name
    } = data.target;
    let {
      value
    } = data.target;
    name === "street" ? setStreet(value) : setDoorNo(value);
  };
  if (userType === "employee") {
    var _inputs2;
    return (_inputs2 = inputs) === null || _inputs2 === void 0 ? void 0 : _inputs2.map((input, index) => {
      var _formData$cpt10, _formData$cpt10$detai, _formData$cpt10$detai2, _formData$address15;
      return /*#__PURE__*/React.createElement(LabelFieldPair, {
        key: index
      }, /*#__PURE__*/React.createElement(CardLabel, {
        className: "card-label-smaller"
      }, t(input.label), config.isMandatory ? " * " : null), /*#__PURE__*/React.createElement("div", {
        className: "field"
      }, /*#__PURE__*/React.createElement(Controller, {
        control: control,
        defaultValue: (formData === null || formData === void 0 ? void 0 : (_formData$cpt10 = formData.cpt) === null || _formData$cpt10 === void 0 ? void 0 : (_formData$cpt10$detai = _formData$cpt10.details) === null || _formData$cpt10$detai === void 0 ? void 0 : (_formData$cpt10$detai2 = _formData$cpt10$detai.address) === null || _formData$cpt10$detai2 === void 0 ? void 0 : _formData$cpt10$detai2[input === null || input === void 0 ? void 0 : input.name]) || (formData === null || formData === void 0 ? void 0 : (_formData$address15 = formData.address) === null || _formData$address15 === void 0 ? void 0 : _formData$address15[input.name]),
        name: input.name,
        rules: {
          validate: convertValidationToRules(input)
        },
        render: _props => {
          var _formData$cpt11, _formData$cpt11$detai, _formData$cpt11$detai2, _props$value, _formData$cpt12, _formData$cpt12$detai, _formData$cpt12$detai2, _formData$cpt12$detai3, _formData$cpt13, _formData$cpt13$detai, _formData$cpt13$detai2, _formData$cpt13$detai3, _formData$cpt14, _formData$cpt14$detai, _formData$cpt15, _formData$cpt15$detai;
          return /*#__PURE__*/React.createElement("div", {
            style: {
              display: "flex",
              alignItems: "baseline",
              marginRight: "unset"
            }
          }, /*#__PURE__*/React.createElement(TextInput, Object.assign({
            id: input.name,
            key: input.name,
            value: _props.value,
            onChange: e => {
              setFocusIndex({
                index
              });
              _props.onChange(e.target.value);
            },
            onBlur: _props.onBlur,
            disable: formData !== null && formData !== void 0 && (_formData$cpt11 = formData.cpt) !== null && _formData$cpt11 !== void 0 && (_formData$cpt11$detai = _formData$cpt11.details) !== null && _formData$cpt11$detai !== void 0 && (_formData$cpt11$detai2 = _formData$cpt11$detai.address) !== null && _formData$cpt11$detai2 !== void 0 && _formData$cpt11$detai2[input.name] ? true : false,
            autoFocus: (focusIndex === null || focusIndex === void 0 ? void 0 : focusIndex.index) == index
          }, input === null || input === void 0 ? void 0 : input.validation)), /*#__PURE__*/React.createElement("div", {
            style: {
              marginRight: "-50px",
              marginLeft: "10px"
            }
          }, /*#__PURE__*/React.createElement(WrapUnMaskComponent, {
            unmaskField: e => {
              _props.onChange(e);
            },
            iseyevisible: (_props.value ? (_props$value = _props.value) === null || _props$value === void 0 ? void 0 : _props$value.includes("*") : formData === null || formData === void 0 ? void 0 : (_formData$cpt12 = formData.cpt) === null || _formData$cpt12 === void 0 ? void 0 : (_formData$cpt12$detai = _formData$cpt12.details) === null || _formData$cpt12$detai === void 0 ? void 0 : (_formData$cpt12$detai2 = _formData$cpt12$detai.address) === null || _formData$cpt12$detai2 === void 0 ? void 0 : (_formData$cpt12$detai3 = _formData$cpt12$detai2[input.name]) === null || _formData$cpt12$detai3 === void 0 ? void 0 : _formData$cpt12$detai3.includes("*")) ? true : false,
            privacy: {
              uuid: formData === null || formData === void 0 ? void 0 : (_formData$cpt13 = formData.cpt) === null || _formData$cpt13 === void 0 ? void 0 : (_formData$cpt13$detai = _formData$cpt13.details) === null || _formData$cpt13$detai === void 0 ? void 0 : (_formData$cpt13$detai2 = _formData$cpt13$detai.owners) === null || _formData$cpt13$detai2 === void 0 ? void 0 : (_formData$cpt13$detai3 = _formData$cpt13$detai2[0]) === null || _formData$cpt13$detai3 === void 0 ? void 0 : _formData$cpt13$detai3.uuid,
              fieldName: [input.name],
              model: "Property",
              loadData: {
                serviceName: "/property-services/property/_search",
                requestBody: {},
                requestParam: {
                  tenantId: formData === null || formData === void 0 ? void 0 : (_formData$cpt14 = formData.cpt) === null || _formData$cpt14 === void 0 ? void 0 : (_formData$cpt14$detai = _formData$cpt14.details) === null || _formData$cpt14$detai === void 0 ? void 0 : _formData$cpt14$detai.tenantId,
                  propertyIds: formData === null || formData === void 0 ? void 0 : (_formData$cpt15 = formData.cpt) === null || _formData$cpt15 === void 0 ? void 0 : (_formData$cpt15$detai = _formData$cpt15.details) === null || _formData$cpt15$detai === void 0 ? void 0 : _formData$cpt15$detai.propertyId
                },
                jsonPath: `Properties[0].address.${input.name}`,
                isArray: false
              }
            }
          })));
        }
      })));
    });
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, window.location.href.includes("/tl") ? /*#__PURE__*/React.createElement(Timeline, {
    currentStep: 2
  }) : /*#__PURE__*/React.createElement(Timeline, {
    currentStep: 1,
    flow: "APPLY"
  }), /*#__PURE__*/React.createElement(FormStep, {
    config: {
      ...config,
      inputs
    },
    _defaultValues: {
      street: formData === null || formData === void 0 ? void 0 : formData.address.street,
      doorNo: formData === null || formData === void 0 ? void 0 : formData.address.doorNo
    },
    onChange: handleSkip,
    onSelect: data => onSelect(config.key, data),
    onSkip: onSkip,
    isDisabled: doorNo || street ? false : true,
    t: t
  }));
};

const isConventionalSpecticTank = tankDimension => tankDimension === "lbd";
const SelectTankSize = ({
  config,
  onSelect,
  t,
  formData: _formData = {},
  userType
}) => {
  var _formData$pitType, _formData$pitDetail;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const tankDimension = _formData === null || _formData === void 0 ? void 0 : (_formData$pitType = _formData.pitType) === null || _formData$pitType === void 0 ? void 0 : _formData$pitType.dimension;
  const [disable, setDisable] = useState(true);
  const [images, setImages] = useState((_formData === null || _formData === void 0 ? void 0 : (_formData$pitDetail = _formData.pitDetail) === null || _formData$pitDetail === void 0 ? void 0 : _formData$pitDetail.images) || null);
  const [size, setSize] = useState();
  useEffect(() => {
    if (!(_formData !== null && _formData !== void 0 && _formData.pitType) && userType !== "employee") {
      onSelect(config.key, {}, true);
    }
  }, []);
  useEffect(() => {
    if (isConventionalSpecticTank(tankDimension)) {
      var _formData$pitDetail2;
      setSize({
        ...(_formData === null || _formData === void 0 ? void 0 : _formData.pitDetail),
        diameter: 0,
        ...((_formData === null || _formData === void 0 ? void 0 : (_formData$pitDetail2 = _formData.pitDetail) === null || _formData$pitDetail2 === void 0 ? void 0 : _formData$pitDetail2.length) === 0 && {
          height: 0
        })
      });
    } else {
      var _formData$pitDetail3;
      setSize({
        ...(_formData === null || _formData === void 0 ? void 0 : _formData.pitDetail),
        length: 0,
        width: 0,
        ...((_formData === null || _formData === void 0 ? void 0 : (_formData$pitDetail3 = _formData.pitDetail) === null || _formData$pitDetail3 === void 0 ? void 0 : _formData$pitDetail3.diameter) === 0 && {
          height: 0
        })
      });
    }
    if (_formData && _formData.pitDetail) {
      var _formData$pitDetail4;
      setImages((_formData === null || _formData === void 0 ? void 0 : (_formData$pitDetail4 = _formData.pitDetail) === null || _formData$pitDetail4 === void 0 ? void 0 : _formData$pitDetail4.images) || null);
    }
  }, [tankDimension]);
  useEffect(() => {
    if (images && images.length) {
      setDisable(false);
    }
  }, [images]);
  const handleChange = event => {
    const {
      name,
      value
    } = event.target;
    if (!isNaN(value)) {
      setSize(prev => ({
        ...prev,
        [name]: value
      }));
      if (userType === "employee") {
        setTimeout(onSelect(config.key, {
          ...size,
          [name]: value
        }));
      }
    }
  };
  const handleSubmit = () => {
    onSelect(config.key, {
      images: images
    });
  };
  const handleUpload = ids => {
    setImages(ids);
  };
  const onSkip = () => onSelect();
  if (userType === "employee") {
    return /*#__PURE__*/React.createElement(PitDimension, {
      sanitationType: _formData.pitType,
      size: size,
      handleChange: handleChange,
      t: t,
      disable: !(_formData !== null && _formData !== void 0 && _formData.pitType)
    });
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Timeline, {
    currentStep: 1,
    flow: "APPLY"
  }), /*#__PURE__*/React.createElement(FormStep, {
    config: config,
    onSkip: onSkip,
    onSelect: handleSubmit,
    isDisabled: disable,
    t: t
  }, /*#__PURE__*/React.createElement(ImageUploadHandler, {
    tenantId: tenantId,
    onPhotoChange: handleUpload,
    uploadedImages: images
  })));
};

const SelectTripData = ({
  t,
  config,
  onSelect,
  formData: _formData = {},
  userType
}) => {
  var _formData$tripData, _formData$tripData2, _formData$tripData3, _formData$address, _formData$tripData8, _formData$tripData8$v, _formData$tripData9;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const state = Digit.ULBService.getStateId();
  const {
    pathname: url
  } = useLocation();
  const editScreen = url.includes("/modify-application/");
  let {
    id: applicationNumber
  } = useParams();
  const userInfo = Digit.UserService.getUser();
  const {
    isLoading: applicationLoading,
    isError,
    data: applicationData,
    error
  } = Digit.Hooks.fsm.useSearch(tenantId, {
    applicationNos: applicationNumber,
    uuid: userInfo.uuid
  }, {
    staleTime: Infinity
  });
  const {
    pathname
  } = useLocation();
  const presentInModifyApplication = pathname.includes("modify");
  const [vehicle, setVehicle] = useState({
    label: _formData === null || _formData === void 0 ? void 0 : (_formData$tripData = _formData.tripData) === null || _formData$tripData === void 0 ? void 0 : _formData$tripData.vehicleCapacity
  });
  const [billError, setError] = useState(false);
  const {
    isLoading: isVehicleMenuLoading,
    data: vehicleData
  } = Digit.Hooks.fsm.useMDMS(state, "Vehicle", "VehicleType", {
    staleTime: Infinity
  });
  const {
    data: dsoData,
    isLoading: isDsoLoading,
    isSuccess: isDsoSuccess,
    error: dsoError
  } = Digit.Hooks.fsm.useDsoSearch(tenantId, {
    limit: -1,
    status: "ACTIVE"
  });
  const [vehicleMenu, setVehicleMenu] = useState([]);
  useEffect(() => {
    if (dsoData && vehicleData) {
      const allVehicles = dsoData.reduce((acc, curr) => {
        return curr.vehicles && curr.vehicles.length ? acc.concat(curr.vehicles) : acc;
      }, []);
      const cpacityMenu = Array.from(new Set(allVehicles.map(a => a.capacity))).map(capacity => allVehicles.find(a => a.capacity === capacity));
      setVehicleMenu(cpacityMenu);
    }
  }, [dsoData, vehicleData]);
  const inputs = [{
    label: "ES_NEW_APPLICATION_AMOUNT_PER_TRIP",
    type: "text",
    name: "amountPerTrip",
    error: t("ES_NEW_APPLICATION_AMOUNT_INVALID"),
    validation: {
      isRequired: true,
      pattern: "[0-9]{1,10}",
      title: t("ES_APPLICATION_BILL_SLAB_ERROR")
    },
    default: _formData === null || _formData === void 0 ? void 0 : (_formData$tripData2 = _formData.tripData) === null || _formData$tripData2 === void 0 ? void 0 : _formData$tripData2.amountPerTrip,
    disable: true,
    isMandatory: true
  }, {
    label: "ES_PAYMENT_DETAILS_TOTAL_AMOUNT",
    type: "text",
    name: "amount",
    validation: {
      isRequired: true,
      title: t("ES_APPLICATION_BILL_SLAB_ERROR")
    },
    default: _formData === null || _formData === void 0 ? void 0 : (_formData$tripData3 = _formData.tripData) === null || _formData$tripData3 === void 0 ? void 0 : _formData$tripData3.amount,
    disable: true,
    isMandatory: true
  }];
  function setTripNum(value) {
    onSelect(config.key, {
      ..._formData[config.key],
      noOfTrips: value
    });
  }
  function setValue(object) {
    onSelect(config.key, {
      ..._formData[config.key],
      ...object
    });
  }
  useEffect(() => {
    (async (_formData$tripData4, _formData$tripData6, _formData$tripData6$v) => {
      if ((_formData === null || _formData === void 0 ? void 0 : (_formData$tripData4 = _formData.tripData) === null || _formData$tripData4 === void 0 ? void 0 : _formData$tripData4.vehicleType) !== vehicle) {
        var _formData$tripData5, _formData$tripData5$v;
        setVehicle({
          label: _formData === null || _formData === void 0 ? void 0 : (_formData$tripData5 = _formData.tripData) === null || _formData$tripData5 === void 0 ? void 0 : (_formData$tripData5$v = _formData$tripData5.vehicleType) === null || _formData$tripData5$v === void 0 ? void 0 : _formData$tripData5$v.capacity
        });
      }
      if (_formData !== null && _formData !== void 0 && _formData.propertyType && _formData !== null && _formData !== void 0 && _formData.subtype && _formData !== null && _formData !== void 0 && _formData.address && _formData !== null && _formData !== void 0 && (_formData$tripData6 = _formData.tripData) !== null && _formData$tripData6 !== void 0 && (_formData$tripData6$v = _formData$tripData6.vehicleType) !== null && _formData$tripData6$v !== void 0 && _formData$tripData6$v.capacity) {
        var _formData$tripData7, _billingDetails$billi;
        const capacity = _formData === null || _formData === void 0 ? void 0 : (_formData$tripData7 = _formData.tripData) === null || _formData$tripData7 === void 0 ? void 0 : _formData$tripData7.vehicleType.capacity;
        const {
          slum: slumDetails
        } = _formData.address;
        const slum = slumDetails ? "YES" : "NO";
        const billingDetails = await Digit.FSMService.billingSlabSearch(tenantId, {
          propertyType: _formData === null || _formData === void 0 ? void 0 : _formData.subtype,
          capacity,
          slum
        });
        const billSlab = (billingDetails === null || billingDetails === void 0 ? void 0 : (_billingDetails$billi = billingDetails.billingSlab) === null || _billingDetails$billi === void 0 ? void 0 : _billingDetails$billi.length) && (billingDetails === null || billingDetails === void 0 ? void 0 : billingDetails.billingSlab[0]);
        if (billSlab !== null && billSlab !== void 0 && billSlab.price || (billSlab === null || billSlab === void 0 ? void 0 : billSlab.price) === 0) {
          setValue({
            amountPerTrip: billSlab.price,
            amount: billSlab.price * _formData.tripData.noOfTrips
          });
          setError(false);
        } else {
          setValue({
            amountPerTrip: "",
            amount: ""
          });
          setError(true);
        }
      }
    })();
  }, [_formData === null || _formData === void 0 ? void 0 : _formData.propertyType, _formData === null || _formData === void 0 ? void 0 : _formData.subtype, _formData === null || _formData === void 0 ? void 0 : (_formData$address = _formData.address) === null || _formData$address === void 0 ? void 0 : _formData$address.slum, _formData === null || _formData === void 0 ? void 0 : (_formData$tripData8 = _formData.tripData) === null || _formData$tripData8 === void 0 ? void 0 : (_formData$tripData8$v = _formData$tripData8.vehicleType) === null || _formData$tripData8$v === void 0 ? void 0 : _formData$tripData8$v.capacity, _formData === null || _formData === void 0 ? void 0 : (_formData$tripData9 = _formData.tripData) === null || _formData$tripData9 === void 0 ? void 0 : _formData$tripData9.noOfTrips]);
  return isVehicleMenuLoading && isDsoLoading ? /*#__PURE__*/React.createElement(Loader, null) : /*#__PURE__*/React.createElement("div", null, inputs === null || inputs === void 0 ? void 0 : inputs.map((input, index) => /*#__PURE__*/React.createElement(LabelFieldPair, {
    key: index
  }, /*#__PURE__*/React.createElement(CardLabel, {
    className: "card-label-smaller"
  }, t(input.label) + " (₹)", input.isMandatory ? " * " : null), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement(TextInput, Object.assign({
    type: input.type,
    onChange: e => setTripNum(e.target.value),
    key: input.name,
    value: input.default ? input.default : _formData && _formData[config.key] ? _formData[config.key][input.name] : null
  }, input.validation, {
    disable: input.disable
  }))))), billError ? /*#__PURE__*/React.createElement(CardLabelError, {
    style: {
      width: "100%",
      textAlign: "center"
    }
  }, t("ES_APPLICATION_BILL_SLAB_ERROR")) : null);
};

const SelectTripNo = ({
  config,
  formData,
  t,
  onSelect,
  userType
}) => {
  var _formData$selectTripN3, _formData$selectTripN6;
  const state = Digit.ULBService.getStateId();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  const {
    data: tripNumberData,
    isLoading
  } = Digit.Hooks.fsm.useMDMS(stateId, "FSM", "TripNumber");
  const {
    data: dsoData,
    isLoading: isDsoLoading,
    isSuccess: isDsoSuccess,
    error: dsoError
  } = Digit.Hooks.fsm.useDsoSearch(tenantId, {
    limit: -1,
    status: "ACTIVE"
  });
  const {
    isLoading: isVehicleMenuLoading,
    data: vehicleData
  } = Digit.Hooks.fsm.useMDMS(state, "Vehicle", "VehicleType", {
    staleTime: Infinity
  });
  const [tripNo, setTripNo] = useState(formData === null || formData === void 0 ? void 0 : formData.tripNo);
  const [vehicleCapacity, setVehicleCapacity] = useState(formData === null || formData === void 0 ? void 0 : formData.capacity);
  const [vehicleMenu, setVehicleMenu] = useState([]);
  useEffect(() => {
    if (dsoData && vehicleData) {
      const allVehicles = dsoData.reduce((acc, curr) => {
        return curr.vehicles && curr.vehicles.length ? acc.concat(curr.vehicles) : acc;
      }, []);
      const cpacityMenu = Array.from(new Set(allVehicles.map(a => a.capacity))).map(capacity => allVehicles.find(a => a.capacity === capacity));
      setVehicleMenu(cpacityMenu);
    }
  }, [dsoData, vehicleData]);
  useEffect(() => {
    if (!isLoading && tripNumberData) {
      const preFilledTripNumber = tripNumberData.filter(tripNumber => {
        var _formData$selectTripN, _formData$selectTripN2;
        return tripNumber.code === ((formData === null || formData === void 0 ? void 0 : (_formData$selectTripN = formData.selectTripNo) === null || _formData$selectTripN === void 0 ? void 0 : (_formData$selectTripN2 = _formData$selectTripN.tripNo) === null || _formData$selectTripN2 === void 0 ? void 0 : _formData$selectTripN2.code) || (formData === null || formData === void 0 ? void 0 : formData.selectTripNo));
      })[0];
      preFilledTripNumber ? setTripNo(preFilledTripNumber) : setTripNo(tripNumberData.find(i => i.code === 1));
    }
  }, [formData === null || formData === void 0 ? void 0 : (_formData$selectTripN3 = formData.selectTripNo) === null || _formData$selectTripN3 === void 0 ? void 0 : _formData$selectTripN3.tripNo, tripNumberData]);
  useEffect(() => {
    if (!isLoading && vehicleMenu) {
      const preFilledCapacity = vehicleMenu.filter(i => {
        var _formData$selectTripN4, _formData$selectTripN5;
        return i.capacity === (formData === null || formData === void 0 ? void 0 : (_formData$selectTripN4 = formData.selectTripNo) === null || _formData$selectTripN4 === void 0 ? void 0 : (_formData$selectTripN5 = _formData$selectTripN4.vehicleCapacity) === null || _formData$selectTripN5 === void 0 ? void 0 : _formData$selectTripN5.capacity);
      })[0];
      let minCapacity = vehicleMenu.reduce((prev, current) => prev.capacity < current.capacity ? prev : current, 0);
      preFilledCapacity ? setVehicleCapacity(preFilledCapacity) : setVehicleCapacity(minCapacity);
    }
  }, [formData === null || formData === void 0 ? void 0 : (_formData$selectTripN6 = formData.selectTripNo) === null || _formData$selectTripN6 === void 0 ? void 0 : _formData$selectTripN6.vehicleCapacity, vehicleMenu]);
  const SelectTrip = value => {
    setTripNo(value);
  };
  const selectVehicle = value => {
    setVehicleCapacity(value);
  };
  const onSkip = () => {
    if (tripNo) {
      onSelect(config.key, {
        tripNo,
        vehicleCapacity
      });
    }
  };
  const onSubmit = () => {
    if (tripNo) {
      onSelect(config.key, {
        tripNo,
        vehicleCapacity
      });
    }
  };
  if (isLoading || vehicleMenu.length === 0) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  if (userType === "employee") {
    return null;
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FormStep, {
    config: config,
    onSelect: onSubmit,
    onSkip: onSkip,
    isDisabled: tripNo || vehicleCapacity ? false : true,
    t: t
  }, /*#__PURE__*/React.createElement(CardText, null, " ", t("ES_FSM_NUMBER_OF_TRIPS"), " "), /*#__PURE__*/React.createElement(RadioOrSelect, {
    options: tripNumberData,
    selectedOption: tripNo,
    optionKey: "i18nKey",
    onSelect: SelectTrip,
    optionCardStyles: {
      zIndex: "60"
    },
    t: t,
    isMandatory: config.isMandatory
  }), /*#__PURE__*/React.createElement(CardText, null, " ", t("ES_VEHICLE CAPACITY"), " "), /*#__PURE__*/React.createElement(RadioOrSelect, {
    options: vehicleMenu === null || vehicleMenu === void 0 ? void 0 : vehicleMenu.map(vehicle => ({
      ...vehicle,
      label: vehicle.capacity
    })).sort((a, b) => a.capacity - b.capacity),
    selectedOption: vehicleCapacity,
    optionKey: "capacity",
    onSelect: selectVehicle,
    optionCardStyles: {
      zIndex: "60"
    },
    t: t,
    isMandatory: config.isMandatory,
    isDropDown: true
  })));
};

const SelectPaymentPreference = ({
  config,
  formData,
  t,
  onSelect,
  userType
}) => {
  var _formData$selectPayme, _formData$selectTripN5, _formData$selectTripN6, _formData$selectTripN7;
  const tenantId = Digit.ULBService.getCitizenCurrentTenant();
  const stateId = Digit.ULBService.getStateId();
  const [advanceAmount, setAdvanceAmount] = useState(null);
  const [MinAmount, setMinAmount] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [billError, setError] = useState(false);
  const inputs = [{
    label: "ES_NEW_APPLICATION_ADVANCE_COLLECTION",
    type: "number",
    name: "advanceAmount",
    validation: {
      isRequired: true
    },
    disable: MinAmount === totalAmount ? true : false,
    default: formData === null || formData === void 0 ? void 0 : (_formData$selectPayme = formData.selectPaymentPreference) === null || _formData$selectPayme === void 0 ? void 0 : _formData$selectPayme.advanceAmount,
    isMandatory: true
  }];
  const setAdvanceAmountValue = value => {
    setAdvanceAmount(value);
  };
  const onSkip = () => {
    onSelect(config.key, {
      advanceAmount: MinAmount
    });
  };
  const onSubmit = () => {
    onSelect(config.key, {
      advanceAmount
    });
  };
  useEffect(() => {
    (async _formData$selectTripN => {
      if (formData !== null && formData !== void 0 && formData.propertyType && formData !== null && formData !== void 0 && formData.subtype && formData !== null && formData !== void 0 && formData.address && formData !== null && formData !== void 0 && (_formData$selectTripN = formData.selectTripNo) !== null && _formData$selectTripN !== void 0 && _formData$selectTripN.vehicleCapacity.capacity) {
        var _formData$selectTripN2, _formData$subtype, _billingDetails$billi;
        const capacity = formData === null || formData === void 0 ? void 0 : (_formData$selectTripN2 = formData.selectTripNo) === null || _formData$selectTripN2 === void 0 ? void 0 : _formData$selectTripN2.vehicleCapacity.capacity;
        const {
          slum: slumDetails
        } = formData.address;
        const slum = slumDetails ? "YES" : "NO";
        const billingDetails = await Digit.FSMService.billingSlabSearch(tenantId, {
          propertyType: formData === null || formData === void 0 ? void 0 : (_formData$subtype = formData.subtype) === null || _formData$subtype === void 0 ? void 0 : _formData$subtype.code,
          capacity,
          slum
        });
        const billSlab = (billingDetails === null || billingDetails === void 0 ? void 0 : (_billingDetails$billi = billingDetails.billingSlab) === null || _billingDetails$billi === void 0 ? void 0 : _billingDetails$billi.length) && (billingDetails === null || billingDetails === void 0 ? void 0 : billingDetails.billingSlab[0]);
        Digit.SessionStorage.set("amount_per_trip", billSlab.price);
        if (billSlab !== null && billSlab !== void 0 && billSlab.price) {
          var _formData$selectTripN3, _formData$selectTripN4, _formData$selectPayme2, _formData$selectPayme3;
          let totaltripAmount = billSlab.price * (formData === null || formData === void 0 ? void 0 : (_formData$selectTripN3 = formData.selectTripNo) === null || _formData$selectTripN3 === void 0 ? void 0 : (_formData$selectTripN4 = _formData$selectTripN3.tripNo) === null || _formData$selectTripN4 === void 0 ? void 0 : _formData$selectTripN4.code);
          const {
            advanceAmount: advanceBalanceAmount
          } = await Digit.FSMService.advanceBalanceCalculate(tenantId, {
            totalTripAmount: totaltripAmount
          });
          setMinAmount(advanceBalanceAmount);
          setTotalAmount(totaltripAmount);
          Digit.SessionStorage.set("total_amount", totaltripAmount);
          Digit.SessionStorage.set("advance_amount", advanceBalanceAmount);
          formData !== null && formData !== void 0 && (_formData$selectPayme2 = formData.selectPaymentPreference) !== null && _formData$selectPayme2 !== void 0 && _formData$selectPayme2.advanceAmount ? setAdvanceAmount(formData === null || formData === void 0 ? void 0 : (_formData$selectPayme3 = formData.selectPaymentPreference) === null || _formData$selectPayme3 === void 0 ? void 0 : _formData$selectPayme3.advanceAmount) : setAdvanceAmount(advanceBalanceAmount);
          setError(false);
        } else if ((billSlab === null || billSlab === void 0 ? void 0 : billSlab.price) === 0) {
          Digit.SessionStorage.set("total_amount", 0);
          onSkip();
        } else {
          sessionStorage.removeItem("Digit.total_amount");
          sessionStorage.removeItem("Digit.advance_amount");
          setError(true);
        }
      }
    })();
  }, [formData === null || formData === void 0 ? void 0 : formData.propertyType, formData === null || formData === void 0 ? void 0 : formData.subtype, formData === null || formData === void 0 ? void 0 : formData.address, formData === null || formData === void 0 ? void 0 : (_formData$selectTripN5 = formData.selectTripNo) === null || _formData$selectTripN5 === void 0 ? void 0 : _formData$selectTripN5.vehicleCapacity.capacity, formData === null || formData === void 0 ? void 0 : (_formData$selectTripN6 = formData.selectTripNo) === null || _formData$selectTripN6 === void 0 ? void 0 : (_formData$selectTripN7 = _formData$selectTripN6.tripNo) === null || _formData$selectTripN7 === void 0 ? void 0 : _formData$selectTripN7.code]);
  if (userType === "employee") {
    return null;
  }
  let currentValue = advanceAmount;
  let max = Digit.SessionStorage.get("total_amount");
  let min = Digit.SessionStorage.get("advance_amount");
  if (advanceAmount === null) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Timeline, {
    currentStep: 3,
    flow: "APPLY"
  }), /*#__PURE__*/React.createElement(FormStep, {
    config: config,
    onSelect: onSubmit,
    onSkip: onSkip,
    isDisabled: currentValue > max ? true :  currentValue < min ? true : false,
    t: t
  }, /*#__PURE__*/React.createElement(KeyNote, {
    keyValue: t("ADV_TOTAL_AMOUNT") + " (₹)",
    note: max
  }), /*#__PURE__*/React.createElement(KeyNote, {
    keyValue: t("FSM_ADV_MIN_PAY") + " (₹)",
    note: min
  }), inputs === null || inputs === void 0 ? void 0 : inputs.map((input, index) => {
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: index
    }, /*#__PURE__*/React.createElement(LabelFieldPair, {
      key: index
    }, /*#__PURE__*/React.createElement(CardLabel, null, t(input.label) + " (₹)", input.isMandatory ? " * " : null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TextInput, Object.assign({
      type: input.type,
      key: input.name,
      disable: input.disable,
      onChange: e => setAdvanceAmountValue(e.target.value),
      value: advanceAmount
    }, input.validation)), currentValue > max && /*#__PURE__*/React.createElement(CardLabelError, {
      style: {
        width: "100%",
        marginTop: "-15px",
        fontSize: "14px",
        marginBottom: "0px"
      }
    }, t("FSM_ADVANCE_AMOUNT_MAX")), currentValue < min && /*#__PURE__*/React.createElement(CardLabelError, {
      style: {
        width: "100%",
        marginTop: "-15px",
        fontSize: "14px",
        marginBottom: "0px"
      }
    }, t("FSM_ADVANCE_AMOUNT_MIN")))));
  })));
};

const SelectVehicleType = ({
  t,
  config,
  onSelect,
  userType,
  formData,
  setValue
}) => {
  var _formData$vehicle7;
  const stateId = Digit.ULBService.getStateId();
  const {
    data: vehicleData,
    isLoading
  } = Digit.Hooks.fsm.useMDMS(stateId, "Vehicle", "VehicleMakeModel");
  let tenantId = Digit.ULBService.getCurrentTenantId();
  const [modals, setModals] = useState([]);
  const [selectedModal, setSelectedModal] = useState({});
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState({});
  const [selectedCapacity, setSelectedCapacity] = useState("");
  useEffect(() => {
    if (vehicleData) {
      var _formData$vehicle5;
      const vehicleModal = vehicleData.filter(vehicle => {
        var _formData$vehicle, _formData$vehicle$mod, _formData$vehicle2;
        return vehicle.code === ((formData === null || formData === void 0 ? void 0 : (_formData$vehicle = formData.vehicle) === null || _formData$vehicle === void 0 ? void 0 : (_formData$vehicle$mod = _formData$vehicle.modal) === null || _formData$vehicle$mod === void 0 ? void 0 : _formData$vehicle$mod.code) || (formData === null || formData === void 0 ? void 0 : (_formData$vehicle2 = formData.vehicle) === null || _formData$vehicle2 === void 0 ? void 0 : _formData$vehicle2.modal));
      });
      const vehicleType = vehicleData.filter(vehicle => {
        var _formData$vehicle3, _formData$vehicle3$ty, _formData$vehicle4;
        return vehicle.code === ((formData === null || formData === void 0 ? void 0 : (_formData$vehicle3 = formData.vehicle) === null || _formData$vehicle3 === void 0 ? void 0 : (_formData$vehicle3$ty = _formData$vehicle3.type) === null || _formData$vehicle3$ty === void 0 ? void 0 : _formData$vehicle3$ty.code) || (formData === null || formData === void 0 ? void 0 : (_formData$vehicle4 = formData.vehicle) === null || _formData$vehicle4 === void 0 ? void 0 : _formData$vehicle4.type));
      });
      setSelectedModal(...vehicleModal);
      setSelectedType(...vehicleType);
      setSelectedCapacity(formData === null || formData === void 0 ? void 0 : (_formData$vehicle5 = formData.vehicle) === null || _formData$vehicle5 === void 0 ? void 0 : _formData$vehicle5.tankCapacity);
    }
  }, [formData === null || formData === void 0 ? void 0 : formData.vehicle, vehicleData]);
  useEffect(() => {
    var _formData$vehicle6;
    if (selectedModal !== null && selectedModal !== void 0 && selectedModal.code && (selectedModal === null || selectedModal === void 0 ? void 0 : selectedModal.code) !== (formData === null || formData === void 0 ? void 0 : (_formData$vehicle6 = formData.vehicle) === null || _formData$vehicle6 === void 0 ? void 0 : _formData$vehicle6.modal)) {
      setSelectedType("");
      setSelectedCapacity("");
      setValue("additionalDetails", "");
      setValue("pollutionCert", undefined);
      setValue("insurance", undefined);
      setValue("roadTax", undefined);
      setValue("fitnessValidity", undefined);
    }
  }, [formData === null || formData === void 0 ? void 0 : (_formData$vehicle7 = formData.vehicle) === null || _formData$vehicle7 === void 0 ? void 0 : _formData$vehicle7.modal]);
  useEffect(() => {
    if (vehicleData) {
      const vehicleModals = vehicleData.filter(vehicle => vehicle.make === undefined);
      setModals(vehicleModals);
    }
  }, [vehicleData]);
  const selectModal = modal => {
    const types = vehicleData.filter(vehicle => vehicle.make === modal.code);
    setTypes(types);
    setSelectedModal(modal);
    onSelect(config.key, {
      ...formData[config.key],
      modal: modal,
      type: ""
    });
  };
  const selectType = type => {
    setSelectedCapacity(type.capacity);
    setSelectedType(type);
    onSelect(config.key, {
      ...formData[config.key],
      type: type
    });
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(LabelFieldPair, null, /*#__PURE__*/React.createElement(CardLabel, {
    className: "card-label-smaller"
  }, t("ES_FSM_REGISTRY_VEHICLE_MODEL"), config.isMandatory ? " * " : null), /*#__PURE__*/React.createElement(Dropdown$2, {
    className: "form-field",
    isMandatory: true,
    selected: selectedModal,
    disable: false,
    option: modals,
    select: selectModal,
    optionKey: "name",
    t: t
  })), /*#__PURE__*/React.createElement(LabelFieldPair, null, /*#__PURE__*/React.createElement(CardLabel, {
    className: "card-label-smaller"
  }, t("ES_FSM_REGISTRY_VEHICLE_TYPE"), config.isMandatory ? " * " : null), /*#__PURE__*/React.createElement(Dropdown$2, {
    className: "form-field",
    isMandatory: true,
    selected: selectedType,
    option: types,
    select: selectType,
    optionKey: "name",
    t: t
  })), /*#__PURE__*/React.createElement(LabelFieldPair, null, /*#__PURE__*/React.createElement(CardLabel, {
    className: "card-label-smaller"
  }, t("ES_FSM_REGISTRY_VEHICLE_CAPACITY"), config.isMandatory ? " * " : null), /*#__PURE__*/React.createElement(TextInput, {
    className: "",
    textInputStyle: {
      width: "50%"
    },
    value: selectedCapacity,
    onChange: () => {},
    disable: true
  })));
};

const CitizenApp = ({
  path
}) => {
  const location = useLocation();
  const {
    t
  } = useTranslation();
  const NewApplicationCitizen = Digit.ComponentRegistryService.getComponent("FSMNewApplicationCitizen");
  const MyApplications = Digit.ComponentRegistryService.getComponent("FSMMyApplications");
  const EmployeeApplicationDetails = Digit.ComponentRegistryService.getComponent("FSMEmployeeApplicationDetails");
  const ApplicationDetails = Digit.ComponentRegistryService.getComponent("FSMCitizenApplicationDetails");
  const SelectRating = Digit.ComponentRegistryService.getComponent("FSMSelectRating");
  const RateView = Digit.ComponentRegistryService.getComponent("FSMRateView");
  const Response = Digit.ComponentRegistryService.getComponent("FSMResponse");
  const DsoDashboard = Digit.ComponentRegistryService.getComponent("FSMDsoDashboard");
  const Inbox = Digit.ComponentRegistryService.getComponent("FSMEmpInbox");
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "fsm-citizen-wrapper"
  }, location.pathname.includes("/response") || location.pathname.split("/").includes("check") ? null : /*#__PURE__*/React.createElement(BackButton, null, t("CS_COMMON_BACK")), /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/inbox`,
    component: () => Digit.UserService.hasAccess(["FSM_DSO"]) ? /*#__PURE__*/React.createElement(Inbox, {
      parentRoute: path,
      isInbox: true
    }) : /*#__PURE__*/React.createElement(Redirect, {
      to: "/digit-ui/citizen"
    })
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/search`,
    component: () => Digit.UserService.hasAccess(["FSM_DSO"]) ? /*#__PURE__*/React.createElement(Inbox, {
      parentRoute: path,
      isSearch: true
    }) : /*#__PURE__*/React.createElement(Redirect, {
      to: "/digit-ui/citizen"
    })
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/new-application`,
    component: () => /*#__PURE__*/React.createElement(NewApplicationCitizen, {
      parentRoute: path
    })
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/my-applications`,
    component: MyApplications
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/dso-application-details/:id`,
    component: () => /*#__PURE__*/React.createElement(EmployeeApplicationDetails, {
      parentRoute: path,
      userType: "DSO"
    })
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/application-details/:id`,
    component: () => /*#__PURE__*/React.createElement(ApplicationDetails, {
      parentRoute: path
    })
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/rate/:id`,
    component: () => /*#__PURE__*/React.createElement(SelectRating, {
      parentRoute: path
    })
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/rate-view/:id`,
    component: () => /*#__PURE__*/React.createElement(RateView, {
      parentRoute: path
    })
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/response`,
    component: props => /*#__PURE__*/React.createElement(Response, Object.assign({
      parentRoute: path
    }, props))
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/dso-dashboard`,
    component: () => /*#__PURE__*/React.createElement(DsoDashboard, {
      parentRoute: path
    })
  }))));
};

const getSlumName = (application, t) => {
  var _application$slum, _application$slum2;
  if (application !== null && application !== void 0 && application.slumName) {
    return t(application.slumName);
  }
  return application !== null && application !== void 0 && (_application$slum = application.slum) !== null && _application$slum !== void 0 && _application$slum.i18nKey ? t(`${application === null || application === void 0 ? void 0 : (_application$slum2 = application.slum) === null || _application$slum2 === void 0 ? void 0 : _application$slum2.i18nKey}`) : "N/A";
};
const getApplicationVehicleCapacity = vehicleCapacity => {
  if (!vehicleCapacity) return "N/A";
  return vehicleCapacity;
};
const getAmountPerTrip = amountPerTrip => {
  if (!amountPerTrip) return "N/A";
  return amountPerTrip !== 0 ? `₹ ${amountPerTrip}` : "N/A";
};
const getTotalAmount = totalAmount => {
  if (!totalAmount) return "N/A";
  return totalAmount !== 0 ? `₹ ${totalAmount}` : "N/A";
};
const getAdvanceAmount = advanceAmount => {
  if (advanceAmount === null) return "N/A";
  return `₹ ${advanceAmount}`;
};
const getPDFData = (application, tenantInfo, t) => {
  var _tenantInfo$city, _application$auditDet, _application$citizen, _application$citizen2, _application$address, _application$address2, _application$tenantId, _application$address3, _application$address4, _application$address5, _application$address6, _application$address7, _application$pitDetai, _application$pitDetai2, _application$pitDetai3, _application$pitDetai4, _application$pitDetai5, _application$pitDetai6, _application$pitDetai7, _application$pitDetai8;
  const {
    additionalDetails
  } = application;
  const amountPerTrip = additionalDetails === null || additionalDetails === void 0 ? void 0 : additionalDetails.tripAmount;
  const totalAmount = amountPerTrip * (application === null || application === void 0 ? void 0 : application.noOfTrips);
  const advanceAmountDue = application === null || application === void 0 ? void 0 : application.advanceAmount;
  return {
    t: t,
    tenantId: tenantInfo === null || tenantInfo === void 0 ? void 0 : tenantInfo.code,
    name: `${t(tenantInfo === null || tenantInfo === void 0 ? void 0 : tenantInfo.i18nKey)} ${t(`ULBGRADE_${tenantInfo === null || tenantInfo === void 0 ? void 0 : (_tenantInfo$city = tenantInfo.city) === null || _tenantInfo$city === void 0 ? void 0 : _tenantInfo$city.ulbGrade.toUpperCase().replace(" ", "_").replace(".", "_")}`)}`,
    email: tenantInfo === null || tenantInfo === void 0 ? void 0 : tenantInfo.emailId,
    phoneNumber: tenantInfo === null || tenantInfo === void 0 ? void 0 : tenantInfo.contactNumber,
    heading: t("PDF_HEADER_DESLUDGING_REQUEST_ACKNOWLEDGEMENT"),
    details: [{
      title: t("CS_TITLE_APPLICATION_DETAILS"),
      values: [{
        title: t("CS_MY_APPLICATION_APPLICATION_NO"),
        value: application === null || application === void 0 ? void 0 : application.applicationNo
      }, {
        title: t("CS_APPLICATION_DETAILS_APPLICATION_DATE"),
        value: Digit.DateUtils.ConvertTimestampToDate(application === null || application === void 0 ? void 0 : (_application$auditDet = application.auditDetails) === null || _application$auditDet === void 0 ? void 0 : _application$auditDet.createdTime, "dd/MM/yyyy")
      }, {
        title: t("CS_APPLICATION_DETAILS_APPLICATION_CHANNEL"),
        value: t(`ES_APPLICATION_DETAILS_APPLICATION_CHANNEL_${application === null || application === void 0 ? void 0 : application.source}`) || "N/A"
      }]
    }, {
      title: t("CS_APPLICATION_DETAILS_APPLICANT_DETAILS"),
      values: [{
        title: t("CS_APPLICATION_DETAILS_APPLICANT_NAME"),
        value: (application === null || application === void 0 ? void 0 : (_application$citizen = application.citizen) === null || _application$citizen === void 0 ? void 0 : _application$citizen.name) || "N/A"
      }, {
        title: t("CS_APPLICATION_DETAILS_APPLICANT_MOBILE"),
        value: (application === null || application === void 0 ? void 0 : (_application$citizen2 = application.citizen) === null || _application$citizen2 === void 0 ? void 0 : _application$citizen2.mobileNumber) || "N/A"
      }]
    }, {
      title: t("CS_APPLICATION_DETAILS_PROPERTY_DETAILS"),
      values: [{
        title: t("CS_APPLICATION_DETAILS_PROPERTY_TYPE"),
        value: t(getPropertyTypeLocale(application === null || application === void 0 ? void 0 : application.propertyUsage)) || "N/A"
      }, {
        title: t("CS_APPLICATION_DETAILS_PROPERTY_SUB_TYPE"),
        value: t(getPropertySubtypeLocale(application === null || application === void 0 ? void 0 : application.propertyUsage)) || "N/A"
      }]
    }, {
      title: t("CS_APPLICATION_DETAILS_PROPERTY_LOCATION_DETAILS"),
      values: [{
        title: t("CS_APPLICATION_DETAILS_PINCODE"),
        value: (application === null || application === void 0 ? void 0 : (_application$address = application.address) === null || _application$address === void 0 ? void 0 : _application$address.pincode) || "N/A"
      }, {
        title: t("CS_APPLICATION_DETAILS_CITY"),
        value: (application === null || application === void 0 ? void 0 : (_application$address2 = application.address) === null || _application$address2 === void 0 ? void 0 : _application$address2.city) || "N/A"
      }, {
        title: t("CS_APPLICATION_DETAILS_MOHALLA"),
        value: t(`${application === null || application === void 0 ? void 0 : (_application$tenantId = application.tenantId) === null || _application$tenantId === void 0 ? void 0 : _application$tenantId.toUpperCase().split(".").join("_")}_REVENUE_${application === null || application === void 0 ? void 0 : (_application$address3 = application.address) === null || _application$address3 === void 0 ? void 0 : (_application$address4 = _application$address3.locality) === null || _application$address4 === void 0 ? void 0 : _application$address4.code}`) || "N/A"
      }, {
        title: t("CS_APPLICATION_DETAILS_SLUM_NAME"),
        value: getSlumName(application, t)
      }, {
        title: t("CS_APPLICATION_DETAILS_STREET"),
        value: (application === null || application === void 0 ? void 0 : (_application$address5 = application.address) === null || _application$address5 === void 0 ? void 0 : _application$address5.street) || "N/A"
      }, {
        title: t("CS_APPLICATION_DETAILS_DOOR_NO"),
        value: (application === null || application === void 0 ? void 0 : (_application$address6 = application.address) === null || _application$address6 === void 0 ? void 0 : _application$address6.doorNo) || "N/A"
      }, {
        title: t("CS_APPLICATION_DETAILS_LANDMARK"),
        value: (application === null || application === void 0 ? void 0 : (_application$address7 = application.address) === null || _application$address7 === void 0 ? void 0 : _application$address7.landmark) || "N/A"
      }]
    }, {
      title: t("CS_APPLICATION_DETAILS_PIT_DETAILS"),
      values: [{
        title: t("CS_APPLICATION_DETAILS_PIT_TYPE"),
        value: application !== null && application !== void 0 && application.sanitationtype ? t("PITTYPE_MASTERS_" + (application === null || application === void 0 ? void 0 : application.sanitationtype)) : "N/A"
      }, {
        title: t("CS_APPLICATION_DETAILS_DIMENSION"),
        value: application !== null && application !== void 0 && (_application$pitDetai = application.pitDetail) !== null && _application$pitDetai !== void 0 && _application$pitDetai.height && (application === null || application === void 0 ? void 0 : (_application$pitDetai2 = application.pitDetail) === null || _application$pitDetai2 === void 0 ? void 0 : _application$pitDetai2.height) !== null ? application !== null && application !== void 0 && (_application$pitDetai3 = application.pitDetail) !== null && _application$pitDetai3 !== void 0 && _application$pitDetai3.length ? `${application === null || application === void 0 ? void 0 : (_application$pitDetai4 = application.pitDetail) === null || _application$pitDetai4 === void 0 ? void 0 : _application$pitDetai4.length}m * ${application === null || application === void 0 ? void 0 : (_application$pitDetai5 = application.pitDetail) === null || _application$pitDetai5 === void 0 ? void 0 : _application$pitDetai5.width}m * ${application === null || application === void 0 ? void 0 : (_application$pitDetai6 = application.pitDetail) === null || _application$pitDetai6 === void 0 ? void 0 : _application$pitDetai6.height}m                                  (${t("CS_COMMON_LENGTH")} x ${t("CS_COMMON_BREADTH")} x ${t("CS_COMMON_DEPTH")})` : `${application === null || application === void 0 ? void 0 : (_application$pitDetai7 = application.pitDetail) === null || _application$pitDetai7 === void 0 ? void 0 : _application$pitDetai7.diameter}m * ${application === null || application === void 0 ? void 0 : (_application$pitDetai8 = application.pitDetail) === null || _application$pitDetai8 === void 0 ? void 0 : _application$pitDetai8.height}m                                  (${t("CS_COMMON_DIAMETER")} x ${t("CS_COMMON_DEPTH")})` : "N/A"
      }, {
        title: t("ES_APPLICATION_DETAILS_VEHICLE_CAPACITY"),
        value: getApplicationVehicleCapacity(application === null || application === void 0 ? void 0 : application.vehicleCapacity)
      }, {
        title: t("CS_APPLICATION_DETAILS_TRIPS"),
        value: (application === null || application === void 0 ? void 0 : application.noOfTrips) || "N/A"
      }, {
        title: t("CS_APPLICATION_DETAILS_AMOUNT_PER_TRIP"),
        value: getAmountPerTrip(amountPerTrip)
      }, {
        title: t("CS_APPLICATION_DETAILS_AMOUNT_DUE"),
        value: getTotalAmount(totalAmount)
      }, {
        title: t("CS_APPLICATION_DETAILS_ADV_AMOUNT_DUE"),
        value: getAdvanceAmount(advanceAmountDue)
      }]
    }]
  };
};

const Reason = ({
  headComment,
  otherComment
}) => /*#__PURE__*/React.createElement("div", {
  className: "checkpoint-comments-wrap"
}, /*#__PURE__*/React.createElement("h4", null, headComment), /*#__PURE__*/React.createElement("p", null, otherComment));

const Username = ({
  assigner
}) => {
  var _data$Employees, _data$Employees$, _data$Employees$$assi, _data$Employees$$assi2, _data$Employees2, _data$Employees2$, _data$Employees2$$ass, _data$Employees2$$ass2, _assigner$roles;
  const {
    t
  } = useTranslation();
  const [designation, setDesignation] = useState(null);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const {
    data,
    isSuccess
  } = Digit.Hooks.useEmployeeSearch(tenantId, {
    uuids: assigner === null || assigner === void 0 ? void 0 : assigner.uuid
  }, {
    enabled: Digit.UserService.getType() === "employee" && (assigner === null || assigner === void 0 ? void 0 : assigner.type) === "EMPLOYEE"
  });
  return /*#__PURE__*/React.createElement("p", null, assigner === null || assigner === void 0 ? void 0 : assigner.name, ` `, data !== null && data !== void 0 && (_data$Employees = data.Employees) !== null && _data$Employees !== void 0 && (_data$Employees$ = _data$Employees[0]) !== null && _data$Employees$ !== void 0 && (_data$Employees$$assi = _data$Employees$.assignments) !== null && _data$Employees$$assi !== void 0 && (_data$Employees$$assi2 = _data$Employees$$assi[0]) !== null && _data$Employees$$assi2 !== void 0 && _data$Employees$$assi2.designation ? `(${t(`COMMON_MASTERS_DESIGNATION_${data === null || data === void 0 ? void 0 : (_data$Employees2 = data.Employees) === null || _data$Employees2 === void 0 ? void 0 : (_data$Employees2$ = _data$Employees2[0]) === null || _data$Employees2$ === void 0 ? void 0 : (_data$Employees2$$ass = _data$Employees2$.assignments) === null || _data$Employees2$$ass === void 0 ? void 0 : (_data$Employees2$$ass2 = _data$Employees2$$ass[0]) === null || _data$Employees2$$ass2 === void 0 ? void 0 : _data$Employees2$$ass2.designation}`)})` : "", (assigner === null || assigner === void 0 ? void 0 : assigner.type) === "CITIZEN" && assigner !== null && assigner !== void 0 && (_assigner$roles = assigner.roles) !== null && _assigner$roles !== void 0 && _assigner$roles.some(role => role.code === "FSM_DSO") ? "(DSO)" : "");
};

const TLCaption = ({
  data
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", null, data.date && /*#__PURE__*/React.createElement("p", null, data.date), /*#__PURE__*/React.createElement(Username, {
    assigner: data.name
  }), data.mobileNumber && /*#__PURE__*/React.createElement(TelePhone, {
    mobile: data.mobileNumber
  }), data.source && /*#__PURE__*/React.createElement("p", null, t("ES_APPLICATION_DETAILS_APPLICATION_CHANNEL_" + data.source.toUpperCase())), data.comment && /*#__PURE__*/React.createElement(Reason, {
    otherComment: data === null || data === void 0 ? void 0 : data.otherComment,
    headComment: data === null || data === void 0 ? void 0 : data.comment
  }));
};

const ApplicationTimeline = props => {
  var _props$application, _data$timeline, _data$timeline2, _data$timeline$;
  const {
    t
  } = useTranslation();
  const {
    isLoading,
    data
  } = Digit.Hooks.useWorkflowDetails({
    tenantId: (_props$application = props.application) === null || _props$application === void 0 ? void 0 : _props$application.tenantId,
    id: props.id,
    moduleCode: "FSM"
  });
  const getTimelineCaptions = checkpoint => {
    var _checkpoint$comment;
    const __comment = checkpoint === null || checkpoint === void 0 ? void 0 : (_checkpoint$comment = checkpoint.comment) === null || _checkpoint$comment === void 0 ? void 0 : _checkpoint$comment.split("~");
    const reason = __comment ? __comment[0] : null;
    const reason_comment = __comment ? __comment[1] : null;
    if (checkpoint.status === "CREATED") {
      var _checkpoint$auditDeta, _props$application2;
      const caption = {
        date: checkpoint === null || checkpoint === void 0 ? void 0 : (_checkpoint$auditDeta = checkpoint.auditDetails) === null || _checkpoint$auditDeta === void 0 ? void 0 : _checkpoint$auditDeta.created,
        source: ((_props$application2 = props.application) === null || _props$application2 === void 0 ? void 0 : _props$application2.source) || ""
      };
      return /*#__PURE__*/React.createElement(TLCaption, {
        data: caption
      });
    } else if (checkpoint.status === "PENDING_APPL_FEE_PAYMENT" || checkpoint.status === "DSO_REJECTED" || checkpoint.status === "CANCELED" || checkpoint.status === "REJECTED") {
      var _checkpoint$auditDeta2;
      const caption = {
        date: checkpoint === null || checkpoint === void 0 ? void 0 : (_checkpoint$auditDeta2 = checkpoint.auditDetails) === null || _checkpoint$auditDeta2 === void 0 ? void 0 : _checkpoint$auditDeta2.created,
        name: checkpoint === null || checkpoint === void 0 ? void 0 : checkpoint.assigner,
        comment: reason ? t(`ES_ACTION_REASON_${reason}`) : null,
        otherComment: reason_comment ? reason_comment : null
      };
      return /*#__PURE__*/React.createElement(TLCaption, {
        data: caption
      });
    } else if (checkpoint.status === "CITIZEN_FEEDBACK_PENDING") {
      return /*#__PURE__*/React.createElement(Fragment, null, (data === null || data === void 0 ? void 0 : data.nextActions.length) > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Link, {
        to: `/digit-ui/citizen/fsm/rate/${props.id}`
      }, /*#__PURE__*/React.createElement(ActionLinks, null, t("CS_FSM_RATE")))));
    } else if (checkpoint.status === "DSO_INPROGRESS") {
      var _props$application3, _props$application3$d, _props$application4;
      const caption = {
        name: checkpoint === null || checkpoint === void 0 ? void 0 : checkpoint.assigner,
        mobileNumber: (_props$application3 = props.application) === null || _props$application3 === void 0 ? void 0 : (_props$application3$d = _props$application3.dsoDetails) === null || _props$application3$d === void 0 ? void 0 : _props$application3$d.mobileNumber,
        date: `${t("CS_FSM_EXPECTED_DATE")} ${Digit.DateUtils.ConvertTimestampToDate((_props$application4 = props.application) === null || _props$application4 === void 0 ? void 0 : _props$application4.possibleServiceDate)}`
      };
      return /*#__PURE__*/React.createElement(TLCaption, {
        data: caption
      });
    } else if (checkpoint.status === "COMPLETED") {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Rating, {
        withText: true,
        text: t(`CS_FSM_YOU_RATED`),
        currentRating: checkpoint.rating
      }), /*#__PURE__*/React.createElement(Link, {
        to: `/digit-ui/citizen/fsm/rate-view/${props.id}`
      }, /*#__PURE__*/React.createElement(ActionLinks, null, t("CS_FSM_RATE_VIEW"))));
    } else if (checkpoint.status === "DISPOSAL_IN_PROGRESS") {
      var _checkpoint$auditDeta3, _checkpoint$assigner;
      const caption = {
        date: checkpoint === null || checkpoint === void 0 ? void 0 : (_checkpoint$auditDeta3 = checkpoint.auditDetails) === null || _checkpoint$auditDeta3 === void 0 ? void 0 : _checkpoint$auditDeta3.created,
        name: checkpoint === null || checkpoint === void 0 ? void 0 : checkpoint.assigner,
        mobileNumber: checkpoint === null || checkpoint === void 0 ? void 0 : (_checkpoint$assigner = checkpoint.assigner) === null || _checkpoint$assigner === void 0 ? void 0 : _checkpoint$assigner.mobileNumber
      };
      if (checkpoint !== null && checkpoint !== void 0 && checkpoint.numberOfTrips) caption.comment = `${t("NUMBER_OF_TRIPS")}: ${checkpoint === null || checkpoint === void 0 ? void 0 : checkpoint.numberOfTrips}`;
      return /*#__PURE__*/React.createElement(TLCaption, {
        data: caption
      });
    }
  };
  const showNextActions = nextAction => {
    switch (nextAction === null || nextAction === void 0 ? void 0 : nextAction.action) {
      case "PAY":
        return /*#__PURE__*/React.createElement("div", {
          style: {
            marginTop: "24px"
          }
        }, /*#__PURE__*/React.createElement(Link, {
          to: {
            pathname: `/digit-ui/citizen/payment/my-bills/FSM.TRIP_CHARGES/${props.id}/?tenantId=${props.application.tenantId}`,
            state: {
              tenantId: props.application.tenantId
            }
          }
        }, !window.location.href.includes("citizen/fsm/") && /*#__PURE__*/React.createElement(SubmitBar, {
          label: t("CS_APPLICATION_DETAILS_MAKE_PAYMENT")
        })));
      case "SUBMIT_FEEDBACK":
        return /*#__PURE__*/React.createElement("div", {
          style: {
            marginTop: "24px"
          }
        }, /*#__PURE__*/React.createElement(Link, {
          to: `/digit-ui/citizen/fsm/rate/${props.id}`
        }, /*#__PURE__*/React.createElement(SubmitBar, {
          label: t("CS_APPLICATION_DETAILS_RATE")
        })));
    }
  };
  if (isLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, !isLoading && /*#__PURE__*/React.createElement(Fragment, null, (data === null || data === void 0 ? void 0 : (_data$timeline = data.timeline) === null || _data$timeline === void 0 ? void 0 : _data$timeline.length) > 0 && /*#__PURE__*/React.createElement(CardSectionHeader, {
    style: {
      marginBottom: "16px",
      marginTop: "32px"
    }
  }, t("CS_APPLICATION_DETAILS_APPLICATION_TIMELINE")), data !== null && data !== void 0 && data.timeline && (data === null || data === void 0 ? void 0 : (_data$timeline2 = data.timeline) === null || _data$timeline2 === void 0 ? void 0 : _data$timeline2.length) === 1 ? /*#__PURE__*/React.createElement(CheckPoint, {
    isCompleted: true,
    label: t("CS_COMMON_" + (data === null || data === void 0 ? void 0 : (_data$timeline$ = data.timeline[0]) === null || _data$timeline$ === void 0 ? void 0 : _data$timeline$.status)),
    customChild: getTimelineCaptions(data === null || data === void 0 ? void 0 : data.timeline[0])
  }) : /*#__PURE__*/React.createElement(ConnectingCheckPoints, null, (data === null || data === void 0 ? void 0 : data.timeline) && (data === null || data === void 0 ? void 0 : data.timeline.map((checkpoint, index, arr) => {
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: index
    }, /*#__PURE__*/React.createElement(CheckPoint, {
      keyValue: index,
      isCompleted: index === 0,
      label: t("CS_COMMON_" + checkpoint.status),
      customChild: getTimelineCaptions(checkpoint)
    }));
  })))), data && showNextActions(data === null || data === void 0 ? void 0 : data.nextActions[0]));
};

const ApplicationDetails = () => {
  var _application$applicat, _paymentsHistory$Paym2, _application$applicat2;
  const {
    t
  } = useTranslation();
  const {
    id
  } = useParams();
  const history = useHistory();
  const {
    state: locState
  } = useLocation();
  const tenantId = (locState === null || locState === void 0 ? void 0 : locState.tenantId) || Digit.ULBService.getCurrentTenantId();
  const state = Digit.ULBService.getStateId();
  const {
    isLoading,
    isError,
    error,
    data: application,
    error: errorApplication
  } = Digit.Hooks.fsm.useApplicationDetail(t, tenantId, id, {}, "CITIZEN");
  const {
    data: paymentsHistory
  } = Digit.Hooks.fsm.usePaymentHistory(tenantId, id);
  const {
    data: storeData
  } = Digit.Hooks.useStore.getInitData();
  const {
    tenants
  } = storeData || {};
  const [showOptions, setShowOptions] = useState(false);
  if (isLoading || !application) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  if ((application === null || application === void 0 ? void 0 : (_application$applicat = application.applicationDetails) === null || _application$applicat === void 0 ? void 0 : _application$applicat.length) === 0) {
    history.goBack();
  }
  const handleDownloadPdf = async () => {
    const tenantInfo = tenants.find(tenant => tenant.code === (application === null || application === void 0 ? void 0 : application.tenantId));
    const data = getPDFData({
      ...(application === null || application === void 0 ? void 0 : application.pdfData)
    }, tenantInfo, t);
    Digit.Utils.pdf.generate(data);
    setShowOptions(false);
  };
  const downloadPaymentReceipt = async () => {
    var _paymentsHistory$Paym, _receiptFile$fileStor;
    const receiptFile = {
      filestoreIds: [(_paymentsHistory$Paym = paymentsHistory.Payments[0]) === null || _paymentsHistory$Paym === void 0 ? void 0 : _paymentsHistory$Paym.fileStoreId]
    };
    if (!(receiptFile !== null && receiptFile !== void 0 && (_receiptFile$fileStor = receiptFile.fileStoreIds) !== null && _receiptFile$fileStor !== void 0 && _receiptFile$fileStor[0])) {
      const newResponse = await Digit.PaymentService.generatePdf(state, {
        Payments: [paymentsHistory.Payments[0]]
      }, "fsm-receipt");
      const fileStore = await Digit.PaymentService.printReciept(state, {
        fileStoreIds: newResponse.filestoreIds[0]
      });
      window.open(fileStore[newResponse.filestoreIds[0]], "_blank");
      setShowOptions(false);
    } else {
      const fileStore = await Digit.PaymentService.printReciept(state, {
        fileStoreIds: receiptFile.filestoreIds[0]
      });
      window.open(fileStore[receiptFile.filestoreIds[0]], "_blank");
      setShowOptions(false);
    }
  };
  const dowloadOptions = (paymentsHistory === null || paymentsHistory === void 0 ? void 0 : (_paymentsHistory$Paym2 = paymentsHistory.Payments) === null || _paymentsHistory$Paym2 === void 0 ? void 0 : _paymentsHistory$Paym2.length) > 0 ? [{
    label: t("CS_COMMON_APPLICATION_ACKNOWLEDGEMENT"),
    onClick: handleDownloadPdf
  }, {
    label: t("CS_COMMON_PAYMENT_RECEIPT"),
    onClick: downloadPaymentReceipt
  }] : [{
    label: t("CS_COMMON_APPLICATION_ACKNOWLEDGEMENT"),
    onClick: handleDownloadPdf
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "cardHeaderWithOptions"
  }, /*#__PURE__*/React.createElement(Header, null, t("CS_FSM_APPLICATION_DETAIL_TITLE_APPLICATION_DETAILS")), /*#__PURE__*/React.createElement(MultiLink, {
    className: "multilinkWrapper",
    onHeadClick: () => setShowOptions(!showOptions),
    displayOptions: showOptions,
    options: dowloadOptions
  })), /*#__PURE__*/React.createElement(Card, {
    style: {
      position: "relative"
    }
  }, application === null || application === void 0 ? void 0 : (_application$applicat2 = application.applicationDetails) === null || _application$applicat2 === void 0 ? void 0 : _application$applicat2.map(({
    title,
    value,
    child,
    caption,
    map
  }, index) => {
    return /*#__PURE__*/React.createElement(KeyNote, {
      key: index,
      keyValue: t(title),
      note: t(value) || (!map || !child) && "N/A",
      caption: t(caption)
    }, child && typeof child === "object" ? React.createElement(child.element, {
      ...child
    }) : child);
  }), /*#__PURE__*/React.createElement(ApplicationTimeline, {
    application: application === null || application === void 0 ? void 0 : application.pdfData,
    id: id
  })));
};

const MyApplication = ({
  application
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(KeyNote, {
    keyValue: t("CS_FSM_APPLICATION_APPLICATION_NO"),
    note: application.applicationNo
  }), /*#__PURE__*/React.createElement(KeyNote, {
    keyValue: t("CS_FSM_APPLICATION_SERVICE_CATEGORY"),
    note: application.serviceCategory || t("CS_TITLE_FSM")
  }), /*#__PURE__*/React.createElement(KeyNote, {
    keyValue: t("CS_FSM_APPLICATION_DETAIL_STATUS"),
    note: t("CS_COMMON_" + application.applicationStatus)
  }), /*#__PURE__*/React.createElement(Link, {
    to: {
      pathname: `/digit-ui/citizen/fsm/application-details/${application.applicationNo}`,
      state: {
        tenantId: application.tenantId
      }
    }
  }, /*#__PURE__*/React.createElement(SubmitBar, {
    label: t("CS_COMMON_VIEW")
  })));
};

const MyApplications = () => {
  const {
    t
  } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const {
    info: userInfo
  } = Digit.UserService.getUser();
  const {
    isLoading,
    isError,
    error,
    data: {
      data: {
        table: applicationsList
      } = {}
    } = {}
  } = Digit.Hooks.fsm.useSearchAll(tenantId, {
    uuid: userInfo.uuid,
    limit: 100
  });
  if (isLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Header, null, t("CS_FSM_APPLICATION_TITLE_MY_APPLICATION")), (applicationsList === null || applicationsList === void 0 ? void 0 : applicationsList.length) > 0 && applicationsList.map((application, index) => /*#__PURE__*/React.createElement("div", {
    key: index
  }, /*#__PURE__*/React.createElement(MyApplication, {
    application: application
  })))));
};

const ActionButton = ({
  jumpTo
}) => {
  const {
    t
  } = useTranslation();
  const history = useHistory();
  function routeTo() {
    history.push(jumpTo);
  }
  return /*#__PURE__*/React.createElement(LinkButton, {
    label: t("CS_COMMON_CHANGE"),
    className: "check-page-link-button",
    onClick: routeTo
  });
};
const CheckPage = ({
  onSubmit,
  value
}) => {
  var _selectTripNo$tripNo, _selectTripNo$vehicle, _address$doorNo, _address$doorNo2, _address$street, _address$street2, _address$locality, _address$landmark, _address$landmark2, _address$slumArea, _address$slumData;
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const {
    address,
    propertyType,
    subtype,
    pitType,
    pitDetail,
    selectGender,
    selectPaymentPreference,
    selectTripNo
  } = value;
  const pitDetailValues = pitDetail ? Object.values(pitDetail).filter(value => !!value) : null;
  const pitMeasurement = pitDetailValues === null || pitDetailValues === void 0 ? void 0 : pitDetailValues.reduce((previous, current, index, array) => {
    if (index === array.length - 1) {
      return previous + current + "m";
    } else {
      return previous + current + "m x ";
    }
  }, "");
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Timeline, {
    currentStep: 4,
    flow: "APPLY"
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, t("CS_CHECK_CHECK_YOUR_ANSWERS")), /*#__PURE__*/React.createElement(CardText, null, t("CS_CHECK_CHECK_YOUR_ANSWERS_TEXT")), /*#__PURE__*/React.createElement(CardSubHeader, null, t("CS_CHECK_PROPERTY_DETAILS")), /*#__PURE__*/React.createElement(StatusTable, null, selectTripNo && (selectTripNo === null || selectTripNo === void 0 ? void 0 : selectTripNo.tripNo) && /*#__PURE__*/React.createElement(Row, {
    label: t("ES_FSM_ACTION_NUMBER_OF_TRIPS"),
    text: t(selectTripNo === null || selectTripNo === void 0 ? void 0 : (_selectTripNo$tripNo = selectTripNo.tripNo) === null || _selectTripNo$tripNo === void 0 ? void 0 : _selectTripNo$tripNo.i18nKey),
    actionButton: /*#__PURE__*/React.createElement(ActionButton, {
      jumpTo: "/digit-ui/citizen/fsm/new-application/select-trip-number"
    })
  }), selectTripNo && (selectTripNo === null || selectTripNo === void 0 ? void 0 : selectTripNo.vehicleCapacity) && /*#__PURE__*/React.createElement(Row, {
    label: t("ES_VEHICLE CAPACITY"),
    text: t(selectTripNo === null || selectTripNo === void 0 ? void 0 : (_selectTripNo$vehicle = selectTripNo.vehicleCapacity) === null || _selectTripNo$vehicle === void 0 ? void 0 : _selectTripNo$vehicle.capacity),
    actionButton: /*#__PURE__*/React.createElement(ActionButton, {
      jumpTo: "/digit-ui/citizen/fsm/new-application/select-trip-number"
    })
  }), selectGender && /*#__PURE__*/React.createElement(Row, {
    label: t("ES_FSM_ACTION_GENDER_TYPE"),
    text: t(selectGender.i18nKey),
    actionButton: /*#__PURE__*/React.createElement(ActionButton, {
      jumpTo: "/digit-ui/citizen/fsm/new-application/select-gender"
    })
  }), /*#__PURE__*/React.createElement(Row, {
    label: t("CS_CHECK_PROPERTY_TYPE"),
    text: t(propertyType.i18nKey),
    actionButton: /*#__PURE__*/React.createElement(ActionButton, {
      jumpTo: "/digit-ui/citizen/fsm/new-application/property-type"
    })
  }), /*#__PURE__*/React.createElement(Row, {
    label: t("CS_CHECK_PROPERTY_SUB_TYPE"),
    text: t(subtype.i18nKey),
    actionButton: /*#__PURE__*/React.createElement(ActionButton, {
      jumpTo: "/digit-ui/citizen/fsm/new-application/property-subtype"
    })
  }), /*#__PURE__*/React.createElement(Row, {
    label: t("CS_CHECK_ADDRESS"),
    text: `${address !== null && address !== void 0 && (_address$doorNo = address.doorNo) !== null && _address$doorNo !== void 0 && _address$doorNo.trim() ? `${address === null || address === void 0 ? void 0 : (_address$doorNo2 = address.doorNo) === null || _address$doorNo2 === void 0 ? void 0 : _address$doorNo2.trim()}, ` : ""} ${address !== null && address !== void 0 && (_address$street = address.street) !== null && _address$street !== void 0 && _address$street.trim() ? `${address === null || address === void 0 ? void 0 : (_address$street2 = address.street) === null || _address$street2 === void 0 ? void 0 : _address$street2.trim()}, ` : ""}${t(address === null || address === void 0 ? void 0 : (_address$locality = address.locality) === null || _address$locality === void 0 ? void 0 : _address$locality.i18nkey)}, ${t(address === null || address === void 0 ? void 0 : address.city.code)}`,
    actionButton: /*#__PURE__*/React.createElement(ActionButton, {
      jumpTo: "/digit-ui/citizen/fsm/new-application/pincode"
    })
  }), (address === null || address === void 0 ? void 0 : (_address$landmark = address.landmark) === null || _address$landmark === void 0 ? void 0 : _address$landmark.trim()) && /*#__PURE__*/React.createElement(Row, {
    label: t("CS_CHECK_LANDMARK"),
    text: address === null || address === void 0 ? void 0 : (_address$landmark2 = address.landmark) === null || _address$landmark2 === void 0 ? void 0 : _address$landmark2.trim(),
    actionButton: /*#__PURE__*/React.createElement(ActionButton, {
      jumpTo: "/digit-ui/citizen/fsm/new-application/landmark"
    })
  }), (address === null || address === void 0 ? void 0 : (_address$slumArea = address.slumArea) === null || _address$slumArea === void 0 ? void 0 : _address$slumArea.code) === true && /*#__PURE__*/React.createElement(Row, {
    label: t("CS_APPLICATION_DETAILS_SLUM_NAME"),
    text: t(address === null || address === void 0 ? void 0 : (_address$slumData = address.slumData) === null || _address$slumData === void 0 ? void 0 : _address$slumData.i18nKey),
    actionButton: /*#__PURE__*/React.createElement(ActionButton, {
      jumpTo: "/digit-ui/citizen/fsm/new-application/slum-details"
    })
  }), pitType && /*#__PURE__*/React.createElement(Row, {
    label: t("CS_CHECK_PIT_TYPE"),
    text: t(pitType.i18nKey),
    actionButton: /*#__PURE__*/React.createElement(ActionButton, {
      jumpTo: "/digit-ui/citizen/fsm/new-application/pit-type"
    })
  }), pitMeasurement && /*#__PURE__*/React.createElement(Row, {
    label: t("CS_CHECK_SIZE"),
    text: [pitMeasurement],
    actionButton: /*#__PURE__*/React.createElement(ActionButton, {
      jumpTo: "/digit-ui/citizen/fsm/new-application/tank-size"
    })
  }), ((selectPaymentPreference === null || selectPaymentPreference === void 0 ? void 0 : selectPaymentPreference.advanceAmount) || (selectPaymentPreference === null || selectPaymentPreference === void 0 ? void 0 : selectPaymentPreference.advanceAmount) === 0) && /*#__PURE__*/React.createElement(Row, {
    label: t("ADV_AMOUNT"),
    text: "₹ " + t(selectPaymentPreference === null || selectPaymentPreference === void 0 ? void 0 : selectPaymentPreference.advanceAmount),
    actionButton: /*#__PURE__*/React.createElement(ActionButton, {
      jumpTo: "/digit-ui/citizen/fsm/new-application/select-payment-preference"
    })
  })), /*#__PURE__*/React.createElement(SubmitBar, {
    label: t("CS_COMMON_SUBMIT"),
    onSubmit: onSubmit
  })), propertyType && /*#__PURE__*/React.createElement(CitizenInfoLabel, {
    style: {
      marginTop: "8px",
      padding: "16px"
    },
    info: t("CS_FILE_APPLICATION_INFO_LABEL"),
    text: t("CS_FILE_APPLICATION_INFO_TEXT", {
      content: t("CS_DEFAULT_INFO_TEXT"),
      ...propertyType
    })
  }));
};

const GetActionMessage = () => {
  const {
    t
  } = useTranslation();
  return t("CS_FILE_DESLUDGING_APPLICATION_SUCCESS");
};
const BannerPicker = props => {
  var _props$data;
  return /*#__PURE__*/React.createElement(Banner, {
    message: GetActionMessage(),
    applicationNumber: (_props$data = props.data) === null || _props$data === void 0 ? void 0 : _props$data.fsm[0].applicationNo,
    info: props.t("CS_FILE_DESLUDGING_APPLICATION_NO"),
    successful: props.isSuccess
  });
};
const Response = ({
  data,
  onSuccess
}) => {
  var _data$address, _data$address2, _data$address2$city, _Data$fsm, _Data$fsm$0$address, _Data$fsm$0$address$l, _Data$fsm2, _Data$fsm2$0$address, _Data$fsm3, _Data$fsm3$0$address;
  const {
    t
  } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const mutation = Digit.Hooks.fsm.useDesludging(data !== null && data !== void 0 && (_data$address = data.address) !== null && _data$address !== void 0 && _data$address.city ? (_data$address2 = data.address) === null || _data$address2 === void 0 ? void 0 : (_data$address2$city = _data$address2.city) === null || _data$address2$city === void 0 ? void 0 : _data$address2$city.code : tenantId);
  const {
    data: storeData
  } = Digit.Hooks.useStore.getInitData();
  const {
    tenants
  } = storeData || {};
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("FSM_MUTATION_HAPPENED", false);
  const [errorInfo, setErrorInfo, clearError] = Digit.Hooks.useSessionStorage("FSM_ERROR_DATA", false);
  const [successData, setsuccessData, clearSuccessData] = Digit.Hooks.useSessionStorage("FSM_MUTATION_SUCCESS_DATA", false);
  const [paymentPreference, setPaymentPreference] = useState(null);
  const [advancePay, setAdvancePay] = useState(null);
  const [zeroPay, setZeroPay] = useState(null);
  const Data = (mutation === null || mutation === void 0 ? void 0 : mutation.data) || successData;
  const localityCode = Data === null || Data === void 0 ? void 0 : (_Data$fsm = Data.fsm) === null || _Data$fsm === void 0 ? void 0 : (_Data$fsm$0$address = _Data$fsm[0].address) === null || _Data$fsm$0$address === void 0 ? void 0 : (_Data$fsm$0$address$l = _Data$fsm$0$address.locality) === null || _Data$fsm$0$address$l === void 0 ? void 0 : _Data$fsm$0$address$l.code;
  const slumCode = Data === null || Data === void 0 ? void 0 : (_Data$fsm2 = Data.fsm) === null || _Data$fsm2 === void 0 ? void 0 : (_Data$fsm2$0$address = _Data$fsm2[0].address) === null || _Data$fsm2$0$address === void 0 ? void 0 : _Data$fsm2$0$address.slumName;
  const slum = Digit.Hooks.fsm.useSlum(Data === null || Data === void 0 ? void 0 : (_Data$fsm3 = Data.fsm) === null || _Data$fsm3 === void 0 ? void 0 : (_Data$fsm3$0$address = _Data$fsm3[0].address) === null || _Data$fsm3$0$address === void 0 ? void 0 : _Data$fsm3$0$address.tenantId, slumCode, localityCode, {
    enabled: slumCode ? true : false,
    retry: slumCode ? true : false
  });
  const onError = (error, variables) => {
    var _error$response, _error$response$data, _error$response$data$;
    setErrorInfo((error === null || error === void 0 ? void 0 : (_error$response = error.response) === null || _error$response === void 0 ? void 0 : (_error$response$data = _error$response.data) === null || _error$response$data === void 0 ? void 0 : (_error$response$data$ = _error$response$data.Errors[0]) === null || _error$response$data$ === void 0 ? void 0 : _error$response$data$.code) || "ERROR");
    setMutationHappened(true);
  };
  useEffect(() => {
    if (mutation.data) setsuccessData(mutation.data);
  }, [mutation.data]);
  useEffect(() => {
    if (!mutationHappened && !errorInfo) {
      try {
        var _selectPaymentPrefere, _selectTripNo$tripNo, _selectTripNo$vehicle;
        const amount = Digit.SessionStorage.get("total_amount");
        const amountPerTrip = Digit.SessionStorage.get("amount_per_trip");
        const {
          subtype,
          pitDetail,
          address,
          pitType,
          source,
          selectGender,
          selectPaymentPreference,
          selectTripNo
        } = data;
        const {
          city,
          locality,
          geoLocation,
          pincode,
          street,
          doorNo,
          landmark,
          slum
        } = address;
        setPaymentPreference(selectPaymentPreference === null || selectPaymentPreference === void 0 ? void 0 : selectPaymentPreference.code);
        const advanceAmount = amount === 0 ? null : selectPaymentPreference === null || selectPaymentPreference === void 0 ? void 0 : selectPaymentPreference.advanceAmount;
        amount === 0 ? setZeroPay(true) : setZeroPay(false);
        advanceAmount === 0 ? setAdvancePay(true) : setAdvancePay(false);
        const formdata = {
          fsm: {
            citizen: {
              gender: selectGender === null || selectGender === void 0 ? void 0 : selectGender.code
            },
            tenantId: city.code,
            additionalDetails: {},
            propertyUsage: subtype.code,
            address: {
              tenantId: city.code,
              additionalDetails: null,
              street: street === null || street === void 0 ? void 0 : street.trim(),
              doorNo: doorNo === null || doorNo === void 0 ? void 0 : doorNo.trim(),
              landmark: landmark === null || landmark === void 0 ? void 0 : landmark.trim(),
              slumName: slum,
              city: city.name,
              pincode,
              locality: {
                code: locality.code,
                name: locality.name
              },
              geoLocation: {
                latitude: geoLocation === null || geoLocation === void 0 ? void 0 : geoLocation.latitude,
                longitude: geoLocation === null || geoLocation === void 0 ? void 0 : geoLocation.longitude,
                additionalDetails: {}
              }
            },
            pitDetail: {
              additionalDetails: {
                fileStoreId: {
                  CITIZEN: pitDetail === null || pitDetail === void 0 ? void 0 : pitDetail.images
                }
              }
            },
            source,
            sanitationtype: pitType === null || pitType === void 0 ? void 0 : pitType.code,
            paymentPreference: amount === 0 ? null : selectPaymentPreference !== null && selectPaymentPreference !== void 0 && selectPaymentPreference.paymentType ? selectPaymentPreference === null || selectPaymentPreference === void 0 ? void 0 : (_selectPaymentPrefere = selectPaymentPreference.paymentType) === null || _selectPaymentPrefere === void 0 ? void 0 : _selectPaymentPrefere.code : null,
            noOfTrips: selectTripNo ? selectTripNo === null || selectTripNo === void 0 ? void 0 : (_selectTripNo$tripNo = selectTripNo.tripNo) === null || _selectTripNo$tripNo === void 0 ? void 0 : _selectTripNo$tripNo.code : 1,
            vehicleCapacity: selectTripNo ? selectTripNo === null || selectTripNo === void 0 ? void 0 : (_selectTripNo$vehicle = selectTripNo.vehicleCapacity) === null || _selectTripNo$vehicle === void 0 ? void 0 : _selectTripNo$vehicle.capacity : "",
            additionalDetails: {
              totalAmount: amount,
              tripAmount: amountPerTrip
            },
            advanceAmount
          },
          workflow: null
        };
        mutation.mutate(formdata, {
          onError,
          onSuccess: () => {
            setMutationHappened(true);
            onSuccess();
          }
        });
        sessionStorage.removeItem("Digit.total_amount");
      } catch (err) {}
    }
  }, []);
  const handleDownloadPdf = () => {
    const {
      fsm
    } = Data;
    const [applicationDetails, ...rest] = fsm;
    const tenantInfo = tenants.find(tenant => tenant.code === applicationDetails.tenantId);
    const data = getPDFData({
      ...applicationDetails,
      slum
    }, tenantInfo, t);
    Digit.Utils.pdf.generate(data);
  };
  const isSuccess = !successData ? mutation === null || mutation === void 0 ? void 0 : mutation.isSuccess : true;
  return mutation.isLoading || mutation.isIdle && !mutationHappened ? /*#__PURE__*/React.createElement(Loader, null) : /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(BannerPicker, {
    t: t,
    data: Data,
    isSuccess: isSuccess,
    isLoading: mutation.isIdle && !mutationHappened || (mutation === null || mutation === void 0 ? void 0 : mutation.isLoading)
  }), /*#__PURE__*/React.createElement(CardText, null, t(paymentPreference && paymentPreference == "POST_PAY" || advancePay ? "CS_FILE_PROPERTY_RESPONSE_POST_PAY" : zeroPay ? "CS_FSM_RESPONSE_CREATE_DISPLAY_ZERO_PAY" : "CS_FILE_PROPERTY_RESPONSE")), isSuccess && /*#__PURE__*/React.createElement(LinkButton, {
    label: /*#__PURE__*/React.createElement("div", {
      className: "response-download-button"
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "#a82227"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"
    }))), /*#__PURE__*/React.createElement("span", {
      className: "download-button"
    }, t("CS_COMMON_DOWNLOAD"))),
    onClick: handleDownloadPdf,
    className: "w-full"
  }), /*#__PURE__*/React.createElement(Link, {
    to: `/digit-ui/citizen`
  }, /*#__PURE__*/React.createElement(SubmitBar, {
    label: t("CORE_COMMON_GO_TO_HOME")
  })));
};

const FileComplaint = ({
  parentRoute
}) => {
  const queryClient = useQueryClient();
  const match = useRouteMatch();
  const {
    t
  } = useTranslation();
  const {
    pathname
  } = useLocation();
  const history = useHistory();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  let config = [];
  let configs = [];
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("FSM_CITIZEN_FILE_PROPERTY", {});
  const {
    data: commonFields,
    isLoading
  } = Digit.Hooks.fsm.useMDMS(stateId, "FSM", "CommonFieldsConfig");
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("FSM_MUTATION_HAPPENED", false);
  const [errorInfo, setErrorInfo, clearError] = Digit.Hooks.useSessionStorage("FSM_ERROR_DATA", false);
  const [successData, setsuccessData, clearSuccessData] = Digit.Hooks.useSessionStorage("FSM_MUTATION_SUCCESS_DATA", false);
  useEffect(() => {
    if (!(pathname !== null && pathname !== void 0 && pathname.includes('new-application/response'))) {
      setMutationHappened(false);
      clearSuccessData();
      clearError();
    }
  }, []);
  const goNext = skipStep => {
    const currentPath = pathname.split("/").pop();
    const {
      nextStep
    } = configs.find(routeObj => routeObj.route === currentPath);
    let redirectWithHistory = history.push;
    if (skipStep) {
      redirectWithHistory = history.replace;
    }
    if (nextStep === null) {
      return redirectWithHistory(`${parentRoute}/new-application/check`);
    }
    redirectWithHistory(`${match.path}/${nextStep}`);
  };
  const submitComplaint = async () => {
    history.push(`${parentRoute}/new-application/response`);
  };
  function handleSelect(key, data, skipStep) {
    setParams({
      ...params,
      ...{
        [key]: {
          ...params[key],
          ...data
        }
      },
      ...{
        source: "ONLINE"
      }
    });
    goNext(skipStep);
  }
  const handleSkip = () => {};
  const handleSUccess = () => {
    clearParams();
    queryClient.invalidateQueries("FSM_CITIZEN_SEARCH");
    setMutationHappened(true);
  };
  if (isLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  commonFields.forEach(obj => {
    config = config.concat(obj.body.filter(a => !a.hideInCitizen));
  });
  configs = [...config];
  configs.indexRoute = "select-trip-number";
  return /*#__PURE__*/React.createElement(Switch, null, configs.map((routeObj, index) => {
    const {
      component,
      texts,
      inputs,
      key
    } = routeObj;
    const Component = typeof component === "string" ? Digit.ComponentRegistryService.getComponent(component) : component;
    return /*#__PURE__*/React.createElement(Route, {
      path: `${match.path}/${routeObj.route}`,
      key: index
    }, /*#__PURE__*/React.createElement(Component, {
      config: {
        texts,
        inputs,
        key
      },
      onSelect: handleSelect,
      onSkip: handleSkip,
      t: t,
      formData: params
    }));
  }), /*#__PURE__*/React.createElement(Route, {
    path: `${match.path}/check`
  }, /*#__PURE__*/React.createElement(CheckPage, {
    onSubmit: submitComplaint,
    value: params
  })), /*#__PURE__*/React.createElement(Route, {
    path: `${match.path}/response`
  }, /*#__PURE__*/React.createElement(Response, {
    data: params,
    onSuccess: handleSUccess
  })), /*#__PURE__*/React.createElement(Route, null, /*#__PURE__*/React.createElement(Redirect, {
    to: `${match.path}/${configs.indexRoute}`
  })));
};

const RateView = props => {
  var _data$timeline$, _data$timeline$2, _data$timeline$2$wfCo;
  const {
    t
  } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  let {
    id: applicationNos
  } = useParams();
  const {
    isError,
    isLoading,
    isSuccess,
    error,
    data: application
  } = Digit.Hooks.fsm.useSearch(tenantId, {
    applicationNos
  });
  const {
    isLoading: isWorkflowLoading,
    data
  } = Digit.Hooks.useWorkflowDetails({
    tenantId: application === null || application === void 0 ? void 0 : application.tenantId,
    id: applicationNos,
    moduleCode: "FSM",
    config: {
      enabled: isSuccess && !!application
    }
  });
  if (isLoading || isWorkflowLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, t("CS_RATE_HELP_US")), /*#__PURE__*/React.createElement(KeyNote, {
    keyValue: t("CS_FSM_YOU_RATED")
  }, /*#__PURE__*/React.createElement(Rating, {
    currentRating: data === null || data === void 0 ? void 0 : (_data$timeline$ = data.timeline[0]) === null || _data$timeline$ === void 0 ? void 0 : _data$timeline$.rating
  })), application.additionalDetails.CheckList.map(checklist => /*#__PURE__*/React.createElement(KeyNote, {
    keyValue: t(checklist.code),
    note: checklist.value.split(",").map(val => t(val)).join(", ")
  })), /*#__PURE__*/React.createElement(KeyNote, {
    keyValue: t("CS_COMMON_COMMENTS"),
    note: (data === null || data === void 0 ? void 0 : (_data$timeline$2 = data.timeline[0]) === null || _data$timeline$2 === void 0 ? void 0 : (_data$timeline$2$wfCo = _data$timeline$2.wfComment) === null || _data$timeline$2$wfCo === void 0 ? void 0 : _data$timeline$2$wfCo[0]) || "N/A"
  }));
};

const SelectRating = ({
  parentRoute
}) => {
  var _checklistData$FSM;
  const {
    t
  } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const history = useHistory();
  let {
    id: applicationNos
  } = useParams();
  const {
    isError,
    error,
    data: application
  } = Digit.Hooks.fsm.useSearch(tenantId, {
    applicationNos
  });
  const {
    isLoading,
    data: checklistData
  } = Digit.Hooks.fsm.useMDMS(tenantId, "FSM", "Checklist");
  const mutation = Digit.Hooks.fsm.useApplicationUpdate(tenantId);
  const [answers, setAnswers] = useState({});
  const [ratingError, setRatingError] = useState(false);
  const [checkError, setCheckError] = useState(false);
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("FSM_MUTATION_HAPPENED", false);
  const [errorInfo, setErrorInfo, clearError] = Digit.Hooks.useSessionStorage("FSM_ERROR_DATA", false);
  const [successData, setsuccessData, clearSuccessData] = Digit.Hooks.useSessionStorage("FSM_MUTATION_SUCCESS_DATA", false);
  useEffect(() => {
    setMutationHappened(false);
    clearSuccessData();
    clearError();
  }, []);
  function handleSubmit(data) {
    const {
      rating,
      comments,
      SAFETY_GEARS_USED
    } = data;
    if (rating === 0 || SAFETY_GEARS_USED.length === 0) {
      rating === 0 ? setRatingError(true) : setRatingError(false);
      SAFETY_GEARS_USED.length === 0 ? setCheckError(true) : setCheckError(false);
      return;
    }
    const allAnswers = {
      ...data,
      ...answers
    };
    let checklist = Object.keys(allAnswers).reduce((acc, key) => {
      if (key === "comments" || key === "rating") {
        return acc;
      }
      acc.push({
        code: key,
        value: Array.isArray(allAnswers[key]) ? allAnswers[key].join(",") : allAnswers[key]
      });
      return acc;
    }, []);
    application.additionalDetails = {
      ...application.additionalDetails,
      CheckList: checklist
    };
    history.push(`${parentRoute}/response`, {
      applicationData: application,
      key: "update",
      action: "RATE",
      actionData: {
        rating,
        comments
      }
    });
  }
  const handleSelect = (type, key) => {
    if (type === "DROP_DOWN") {
      return value => {
        setAnswers({
          ...answers,
          [key]: value.code
        });
      };
    }
    return value => {
      setAnswers({
        ...answers,
        [key]: value
      });
    };
  };
  if (isLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  const getType = type => {
    switch (type) {
      case "SINGLE_SELECT":
        return "radio";
      case "MULTI_SELECT":
        return "checkbox";
      case "DROP_DOWN":
        return "dropDown";
      default:
        return "checkbox";
    }
  };
  const getOption = (type, options) => {
    if (type === "DROP_DOWN") {
      let option = [];
      options.map(data => {
        option.push({
          active: true,
          citizenOnly: false,
          code: data,
          i18nKey: data,
          name: data
        });
      });
      return option;
    } else {
      return options;
    }
  };
  const getSelectedOption = (type, code, options) => {
    switch (type) {
      case "SINGLE_SELECT":
        return answers[code];
      case "DROP_DOWN":
        return options.find(element => element.code === answers[code]);
      default:
        return null;
    }
  };
  const inputs = checklistData === null || checklistData === void 0 ? void 0 : (_checklistData$FSM = checklistData.FSM) === null || _checklistData$FSM === void 0 ? void 0 : _checklistData$FSM.CheckList.map(item => ({
    type: getType(item.type),
    checkLabels: getOption(item.type, item.options),
    onSelect: item.type === "SINGLE_SELECT" || item.type === "DROP_DOWN" ? handleSelect(item.type, item.code) : null,
    selectedOption: getSelectedOption(item.type, item.code, getOption(item.type, item.options)),
    name: item.code,
    label: item.code === "SPILLAGE" ? t("CS_FSM_APPLICATION_RATE_HELP_TEXT") : item.code,
    error: checkError ? /*#__PURE__*/React.createElement(CardLabelError, null, t("CS_FEEDBACK_SELECT_ERROR")) : null,
    className: "hhh"
  }));
  const config = {
    texts: {
      header: t("CS_APPLICATION_DETAILS_RATE_US"),
      submitBarLabel: t("CS_COMMON_SUBMIT")
    },
    inputs: [{
      type: "rate",
      maxRating: 5,
      label: t("CS_FSM_APPLICATION_RATE_TEXT"),
      error: ratingError ? /*#__PURE__*/React.createElement(CardLabelError, null, t("CS_FEEDBACK_ENTER_RATING_ERROR")) : null
    }, ...inputs, {
      type: "textarea",
      label: t("CS_COMMON_COMMENTS"),
      name: "comments",
      className: "Hello"
    }]
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "fsm-citizen-rating-wrapper"
  }, /*#__PURE__*/React.createElement(RatingCard, {
    config: config,
    t: t,
    onSelect: handleSubmit
  }), " ");
};

const FstpAddVehicle = ({
  onSelect
}) => {
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const [vehicleNumber, setVehicleNumber] = useState("");
  let inputs = {
    texts: {
      cardText: "",
      submitBarLabel: "CS_COMMON_NEXT"
    },
    inputs: [{
      label: t("ES_FSM_VEHICLE_NUMBER"),
      type: "text",
      name: "vehicleNumber",
      validation: {
        pattern: `[A-Z]{2}\\s{1}[0-9]{2}\\s{0,1}[A-Z]{1,2}\\s{1}[0-9]{4}`,
        title: t("ES_FSM_VEHICLE_FORMAT_TIP")
      }
    }],
    key: "vehicleNumber"
  };
  const onSubmit = data => {
    history.push(`/digit-ui/employee/fsm/fstp-fsm-request/${data.vehicleNumber.trim()}`);
  };
  function onChange(e) {
    e.target.value.trim().length != 0 ? setVehicleNumber(e.target.value) : null;
  }
  const isMobile = window.Digit.Utils.browser.isMobile();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: !isMobile ? {
      marginLeft: "20px"
    } : {}
  }, /*#__PURE__*/React.createElement(Header, null, t("ES_FSM_ADD_VEHICLE_LOG"))), /*#__PURE__*/React.createElement(FormStep, {
    config: inputs,
    onChange: onChange,
    onSelect: onSubmit,
    t: t,
    isDisabled: !vehicleNumber,
    cardStyle: {
      margin: "10px"
    },
    textInputStyle: {
      maxWidth: "540px"
    }
  }));
};

const FstpOperations = () => {
  const {
    t
  } = useTranslation();
  const state = Digit.ULBService.getStateId();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  const history = useHistory();
  const title = "ES_COMMON_FSTP_OPERATION";
  const module = [{
    name: "ES_FSM_ADD_NEW_BUTTON",
    link: "/digit-ui/employee/fsm/fstp-add-vehicle",
    icon: /*#__PURE__*/React.createElement(AddNewIcon, null)
  }, {
    name: "ES_FSM_VIEW_REPORTS_BUTTON",
    link: "/employee/report/fsm/FSMFSTPPlantWithVehicleLogReport",
    hyperlink: true,
    icon: /*#__PURE__*/React.createElement(ViewReportIcon, null)
  }, {
    name: "ES_COMMON_INBOX",
    link: "/digit-ui/employee/fsm/fstp-inbox",
    icon: /*#__PURE__*/React.createElement(InboxIcon, null)
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ULBHomeCard, {
    title: title,
    module: module
  }, " "));
};

const FSMLink = ({
  parentRoute,
  isMobile,
  data
}) => {
  const {
    t
  } = useTranslation();
  const allLinks = [{
    text: t("ES_TITLE_NEW_DESULDGING_APPLICATION"),
    link: "/digit-ui/employee/fsm/new-application",
    roles: ["FSM_CREATOR_EMP"]
  }, {
    text: t("ES_TITILE_SEARCH_APPLICATION"),
    link: `${parentRoute}/search`
  }, {
    text: t("ES_TITLE_REPORTS"),
    link: `/employee/report/fsm/FSMDailyDesludingReport`,
    roles: ["FSM_ADMIN"],
    hyperlink: true
  }];
  const [links, setLinks] = useState([]);
  const {
    roles: userRoles
  } = Digit.UserService.getUser().info;
  useEffect(() => {
    let linksToShow = allLinks.filter(({
      roles
    }) => (roles === null || roles === void 0 ? void 0 : roles.some(e => userRoles === null || userRoles === void 0 ? void 0 : userRoles.map(({
      code
    }) => code).includes(e))) || !(roles !== null && roles !== void 0 && roles.length));
    setLinks(linksToShow);
  }, []);
  const GetLogo = () => /*#__PURE__*/React.createElement("div", {
    className: "header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "logo"
  }, /*#__PURE__*/React.createElement(ShippingTruck, null)), " ", /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, t("ES_TITLE_FAECAL_SLUDGE_MGMT")));
  return /*#__PURE__*/React.createElement(Card, {
    className: "employeeCard inboxLinksFSM"
  }, /*#__PURE__*/React.createElement("div", {
    className: "complaint-links-container"
  }, GetLogo(), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, links.map(({
    link,
    text,
    hyperlink: _hyperlink = false,
    accessTo: _accessTo = []
  }, index) => {
    return /*#__PURE__*/React.createElement("span", {
      className: "link",
      key: index
    }, _hyperlink ? /*#__PURE__*/React.createElement("a", {
      href: link
    }, text) : /*#__PURE__*/React.createElement(Link, {
      to: link
    }, text));
  }))));
};

const ApplicationTable = ({
  className: _className = "table",
  t,
  currentPage,
  columns,
  data,
  getCellProps,
  disableSort,
  onSort,
  onNextPage,
  onPrevPage,
  onPageSizeChange,
  pageSizeLimit,
  sortParams,
  totalRecords,
  isPaginationRequired
}) => {
  return /*#__PURE__*/React.createElement(Table, {
    className: _className,
    t: t,
    data: data,
    currentPage: currentPage,
    columns: columns,
    getCellProps: getCellProps,
    onNextPage: onNextPage,
    onPrevPage: onPrevPage,
    pageSizeLimit: pageSizeLimit,
    disableSort: disableSort,
    onPageSizeChange: onPageSizeChange,
    onSort: onSort,
    sortParams: sortParams,
    totalRecords: totalRecords,
    isPaginationRequired: isPaginationRequired
  });
};

const StatusCount = ({
  status,
  fsmfilters,
  onAssignmentChange,
  statusMap
}) => {
  var _statusMap$filter, _statusMap$filter$;
  const {
    t
  } = useTranslation();
  const count = statusMap === null || statusMap === void 0 ? void 0 : (_statusMap$filter = statusMap.filter(e => (e === null || e === void 0 ? void 0 : e.applicationstatus) === status.code)) === null || _statusMap$filter === void 0 ? void 0 : (_statusMap$filter$ = _statusMap$filter[0]) === null || _statusMap$filter$ === void 0 ? void 0 : _statusMap$filter$.count;
  return /*#__PURE__*/React.createElement(CheckBox, {
    onChange: e => onAssignmentChange(e, status),
    checked: (fsmfilters === null || fsmfilters === void 0 ? void 0 : fsmfilters.applicationStatus.filter(e => e.name === status.name).length) !== 0 ? true : false,
    label: `${t(status.name)} (${count || 0})`
  });
};

const Status = ({
  onAssignmentChange,
  fsmfilters,
  mergedRoleDetails,
  statusMap
}) => {
  const {
    t
  } = useTranslation();
  const {
    data: applicationsWithCount,
    isLoading
  } = Digit.Hooks.fsm.useApplicationStatus(true, true, statusMap);
  const [moreStatus, showMoreStatus] = useState(false);
  const finalApplicationWithCount = mergedRoleDetails.statuses.map(roleDetails => applicationsWithCount === null || applicationsWithCount === void 0 ? void 0 : applicationsWithCount.filter(application => application.code === roleDetails)[0]).filter(status => status === null || status === void 0 ? void 0 : status.code);
  const moreApplicationWithCount = applicationsWithCount === null || applicationsWithCount === void 0 ? void 0 : applicationsWithCount.filter(application => !finalApplicationWithCount.find(listedApplication => listedApplication.code === application.code));
  if (isLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return (finalApplicationWithCount === null || finalApplicationWithCount === void 0 ? void 0 : finalApplicationWithCount.length) > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "status-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "filter-label"
  }, t("ES_INBOX_STATUS")), finalApplicationWithCount === null || finalApplicationWithCount === void 0 ? void 0 : finalApplicationWithCount.map((option, index) => /*#__PURE__*/React.createElement(StatusCount, {
    key: index,
    onAssignmentChange: onAssignmentChange,
    status: option,
    fsmfilters: fsmfilters,
    statusMap: statusMap
  })), moreStatus ? moreApplicationWithCount === null || moreApplicationWithCount === void 0 ? void 0 : moreApplicationWithCount.map((option, index) => /*#__PURE__*/React.createElement(StatusCount, {
    key: index,
    onAssignmentChange: onAssignmentChange,
    status: option,
    fsmfilters: fsmfilters,
    statusMap: statusMap
  })) : null, mergedRoleDetails.fixed === false && moreApplicationWithCount.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "filter-button",
    onClick: () => showMoreStatus(!moreStatus)
  }, " ", moreStatus ? t("ES_COMMON_LESS") : t("ES_COMMON_MORE"), " ") : null) : null;
};

const Filter = ({
  searchParams,
  paginationParms,
  onFilterChange,
  onSearch,
  removeParam,
  ...props
}) => {
  var _searchParams$applica, _searchParams$localit, _mergedRoleDetails$st, _mergedRoleDetails$st2, _props$applications, _props$applications2;
  const {
    t
  } = useTranslation();
  const location = useLocation();
  const DSO = Digit.UserService.hasAccess(["FSM_DSO"]) || false;
  const isFstpOperator = Digit.UserService.hasAccess("FSM_EMP_FSTPO") || false;
  const isFstpOperatorRequest = Digit.UserService.hasAccess("FSM_EMP_FSTPO") && location.pathname.includes("fstp-fsm-request") || false;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const state = Digit.ULBService.getStateId();
  const {
    data: roleStatuses,
    isFetched: isRoleStatusFetched
  } = Digit.Hooks.fsm.useMDMS(state, "DIGIT-UI", "RoleStatusMapping");
  const userInfo = Digit.UserService.getUser();
  const userRoles = userInfo.info.roles.map(roleData => roleData.code);
  const userRoleDetails = roleStatuses === null || roleStatuses === void 0 ? void 0 : roleStatuses.filter(roleDetails => userRoles.filter(role => role === roleDetails.userRole)[0]);
  const mergedRoleDetails = userRoleDetails === null || userRoleDetails === void 0 ? void 0 : userRoleDetails.reduce((merged, details) => ({
    fixed: (details === null || details === void 0 ? void 0 : details.fixed) && (merged === null || merged === void 0 ? void 0 : merged.fixed),
    statuses: [...(merged === null || merged === void 0 ? void 0 : merged.statuses), ...(details === null || details === void 0 ? void 0 : details.statuses)].filter((item, pos, self) => self.indexOf(item) == pos),
    zeroCheck: (details === null || details === void 0 ? void 0 : details.zeroCheck) || (merged === null || merged === void 0 ? void 0 : merged.zeroCheck)
  }), {
    statuses: []
  });
  const selectLocality = d => {
    isFstpOperator ? onFilterChange({
      locality: [d]
    }) : onFilterChange({
      locality: [...(searchParams === null || searchParams === void 0 ? void 0 : searchParams.locality), d]
    });
  };
  const onStatusChange = (e, type) => {
    if (e.target.checked) onFilterChange({
      applicationStatus: [...(searchParams === null || searchParams === void 0 ? void 0 : searchParams.applicationStatus), type]
    });else onFilterChange({
      applicationStatus: searchParams === null || searchParams === void 0 ? void 0 : searchParams.applicationStatus.filter(option => type.name !== option.name)
    });
  };
  const clearAll = () => {
    if (isFstpOperator) return onFilterChange();
    onFilterChange({
      applicationStatus: [],
      locality: []
    });
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, (!DSO && !isFstpOperator && searchParams && ((searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$applica = searchParams.applicationStatus) === null || _searchParams$applica === void 0 ? void 0 : _searchParams$applica.length) > 0 || (searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$localit = searchParams.locality) === null || _searchParams$localit === void 0 ? void 0 : _searchParams$localit.length) > 0) || (mergedRoleDetails === null || mergedRoleDetails === void 0 ? void 0 : (_mergedRoleDetails$st = mergedRoleDetails.statuses) === null || _mergedRoleDetails$st === void 0 ? void 0 : _mergedRoleDetails$st.length) > 0 || isFstpOperatorRequest) && /*#__PURE__*/React.createElement("div", {
    className: "filter",
    style: {
      marginTop: isFstpOperator ? "-0px" : "revert"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "filter-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "filter-label"
  }, t("ES_COMMON_FILTER_BY"), ":"), /*#__PURE__*/React.createElement("div", {
    className: "clearAll",
    onClick: clearAll
  }, t("ES_COMMON_CLEAR_ALL")), props.type === "desktop" && /*#__PURE__*/React.createElement("span", {
    className: "clear-search",
    onClick: clearAll
  }, t("ES_COMMON_CLEAR_ALL")), props.type === "mobile" && /*#__PURE__*/React.createElement("span", {
    onClick: props.onClose
  }, /*#__PURE__*/React.createElement(CloseSvg, null))), (mergedRoleDetails === null || mergedRoleDetails === void 0 ? void 0 : (_mergedRoleDetails$st2 = mergedRoleDetails.statuses) === null || _mergedRoleDetails$st2 === void 0 ? void 0 : _mergedRoleDetails$st2.length) > 0 || isFstpOperatorRequest ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "filter-label"
  }, t("ES_INBOX_LOCALITY")), /*#__PURE__*/React.createElement(Localities, {
    selectLocality: selectLocality,
    tenantId: tenantId,
    boundaryType: "revenue"
  }), /*#__PURE__*/React.createElement("div", {
    className: "tag-container"
  }, searchParams === null || searchParams === void 0 ? void 0 : searchParams.locality.map((locality, index) => {
    return /*#__PURE__*/React.createElement(RemoveableTag, {
      key: index,
      text: locality.i18nkey,
      onClick: () => {
        onFilterChange({
          locality: searchParams === null || searchParams === void 0 ? void 0 : searchParams.locality.filter(loc => loc.code !== locality.code)
        });
      }
    });
  }))) : null, /*#__PURE__*/React.createElement("div", null, isRoleStatusFetched && mergedRoleDetails && props !== null && props !== void 0 && (_props$applications = props.applications) !== null && _props$applications !== void 0 && _props$applications.statuses ? /*#__PURE__*/React.createElement(Status, {
    onAssignmentChange: onStatusChange,
    fsmfilters: searchParams,
    mergedRoleDetails: mergedRoleDetails,
    statusMap: props === null || props === void 0 ? void 0 : (_props$applications2 = props.applications) === null || _props$applications2 === void 0 ? void 0 : _props$applications2.statuses
  }) : !location.pathname.includes("fstp-fsm-request") ? /*#__PURE__*/React.createElement(Loader, null) : ""))), props.type === "mobile" && /*#__PURE__*/React.createElement(ActionBar, null, /*#__PURE__*/React.createElement(ApplyFilterBar, {
    submit: false,
    labelLink: t("ES_COMMON_CLEAR_ALL"),
    buttonLink: t("ES_COMMON_FILTER"),
    onClear: clearAll,
    onSubmit: () => {
      onSearch();
    },
    style: {
      flex: 1
    }
  })));
};

const DropdownStatus = ({
  onAssignmentChange,
  value,
  applicationStatuses,
  areApplicationStatus
}) => {
  return areApplicationStatus ? /*#__PURE__*/React.createElement(Dropdown$2, {
    option: applicationStatuses,
    optionKey: "name",
    selected: value,
    select: onAssignmentChange
  }) : /*#__PURE__*/React.createElement(Loader, null);
};

const SearchApplication = ({
  onSearch,
  type,
  onClose,
  isFstpOperator,
  searchFields,
  searchParams,
  isInboxPage
}) => {
  const storedSearchParams = isInboxPage ? Digit.SessionStorage.get("fsm/inbox/searchParams") : Digit.SessionStorage.get("fsm/search/searchParams");
  const {
    data: applicationStatuses,
    isFetched: areApplicationStatus
  } = Digit.Hooks.fsm.useApplicationStatus();
  const {
    t
  } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control
  } = useForm({
    defaultValues: storedSearchParams || searchParams
  });
  const [error, setError] = useState(false);
  const mobileView = innerWidth <= 640;
  const FSTP = Digit.UserService.hasAccess("FSM_EMP_FSTPO") || false;
  const watchSearch = watch(["applicationNos", "mobileNumber", "fromDate", "toDate"]);
  const onSubmitInput = data => {
    if (!data.mobileNumber) {
      delete data.mobileNumber;
    }
    onSearch(data);
    if (type === "mobile") {
      onClose();
    }
  };
  function clearSearch() {
    const resetValues = searchFields.reduce((acc, field) => ({
      ...acc,
      [field === null || field === void 0 ? void 0 : field.name]: ""
    }), {});
    reset(resetValues);
    if (isInboxPage) {
      Digit.SessionStorage.del("fsm/inbox/searchParams");
    } else {
      Digit.SessionStorage.del("fsm/search/searchParams");
    }
    onSearch({});
  }
  const clearAll = mobileView => {
    const mobileViewStyles = mobileView ? {
      margin: 0
    } : {};
    return /*#__PURE__*/React.createElement(LinkLabel, {
      style: {
        display: "inline",
        ...mobileViewStyles
      },
      onClick: clearSearch
    }, t("ES_COMMON_CLEAR_SEARCH"));
  };
  const searchValidation = data => {
    if (FSTP) return null;
    watchSearch.applicationNos || watchSearch.mobileNumber || watchSearch.fromDate && watchSearch.toDate ? setError(false) : setError(true);
    return watchSearch.applicationNos || watchSearch.mobileNumber || watchSearch.fromDate && watchSearch.toDate ? true : false;
  };
  const getFields = input => {
    switch (input.type) {
      case "date":
        return /*#__PURE__*/React.createElement(Controller, {
          render: props => /*#__PURE__*/React.createElement(DatePicker$3, {
            date: props.value,
            onChange: props.onChange
          }),
          name: input.name,
          control: control,
          defaultValue: null
        });
      case "status":
        return /*#__PURE__*/React.createElement(Controller, {
          render: props => /*#__PURE__*/React.createElement(DropdownStatus, {
            onAssignmentChange: props.onChange,
            value: props.value,
            applicationStatuses: applicationStatuses,
            areApplicationStatus: areApplicationStatus
          }),
          name: input.name,
          control: control,
          defaultValue: null
        });
      default:
        return /*#__PURE__*/React.createElement(TextInput, Object.assign({}, input, {
          inputRef: register
        }, register(input.name, {
          validate: searchValidation
        }), {
          watch: watch,
          shouldUpdate: true
        }));
    }
  };
  const checkInboxLocation = window.location.href.includes("employee/fsm/inbox") || window.location.href.includes("employee/fsm/fstp-inbox") || window.location.href.includes("employee/fsm/fstp-fsm-request");
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit(onSubmitInput)
  }, /*#__PURE__*/React.createElement(React.Fragment, null, !checkInboxLocation ? /*#__PURE__*/React.createElement(Header, {
    styles: mobileView ? {
      marginTop: "10px"
    } : {}
  }, t("ACTION_TEST_SEARCH_FSM_APPLICATION")) : "", /*#__PURE__*/React.createElement("div", {
    className: "search-container",
    style: {
      width: "auto",
      marginLeft: FSTP ? "" : isInboxPage ? "24px" : "revert"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "search-complaint-container"
  }, (type === "mobile" || mobileView) && /*#__PURE__*/React.createElement("div", {
    className: "complaint-header"
  }, /*#__PURE__*/React.createElement("h2", null, t("ES_COMMON_SEARCH_BY")), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: "2%",
      right: "8px"
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement(CloseSvg, null))), /*#__PURE__*/React.createElement("div", {
    className: "complaint-input-container",
    style: {
      width: "100%",
      "display": "grid"
    }
  }, searchFields === null || searchFields === void 0 ? void 0 : searchFields.map((input, index) => /*#__PURE__*/React.createElement("span", {
    key: index,
    className: index === 0 ? "complaint-input" : "mobile-input"
  }, /*#__PURE__*/React.createElement(Label, null, input.label), getFields(input), " ")), type === "desktop" && !mobileView && /*#__PURE__*/React.createElement(SubmitBar, {
    className: "submit-bar-search",
    label: t("ES_COMMON_SEARCH"),
    submit: true
  })), error ? /*#__PURE__*/React.createElement(CardLabelError, {
    className: "search-error-label"
  }, t("ES_SEARCH_APPLICATION_ERROR")) : null, type === "desktop" && !mobileView && /*#__PURE__*/React.createElement("span", {
    className: "clear-search"
  }, clearAll()))), (type === "mobile" || mobileView) && /*#__PURE__*/React.createElement(ActionBar, {
    className: "clear-search-container"
  }, /*#__PURE__*/React.createElement("button", {
    className: "clear-search",
    style: {
      flex: 1
    }
  }, clearAll(mobileView)), /*#__PURE__*/React.createElement(SubmitBar, {
    label: t("ES_COMMON_SEARCH"),
    style: {
      flex: 1
    },
    submit: true
  }))));
};

const DesktopInbox = props => {
  var _props$data, _props$data$table, _props$data2, _props$data2$table;
  const {
    t
  } = useTranslation();
  const DSO = Digit.UserService.hasAccess(["FSM_DSO"]) || false;
  const GetCell = value => /*#__PURE__*/React.createElement("span", {
    className: "cell-text"
  }, value);
  const FSTP = Digit.UserService.hasAccess("FSM_EMP_FSTPO") || false;
  const GetSlaCell = value => {
    if (value === "-") return /*#__PURE__*/React.createElement("span", {
      className: "sla-cell-success"
    }, "-");
    if (isNaN(value)) return /*#__PURE__*/React.createElement("span", {
      className: "sla-cell-success"
    }, "0");
    return value < 0 ? /*#__PURE__*/React.createElement("span", {
      className: "sla-cell-error"
    }, value) : /*#__PURE__*/React.createElement("span", {
      className: "sla-cell-success"
    }, value);
  };
  const columns = React.useMemo(() => {
    if (props.isSearch) {
      return [{
        Header: t("ES_INBOX_APPLICATION_NO"),
        accessor: "applicationNo",
        disableSortBy: true,
        Cell: ({
          row
        }) => {
          return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
            className: "link"
          }, /*#__PURE__*/React.createElement(Link, {
            to: `${props.parentRoute}/${DSO ? "dso-application-details" : "application-details"}/` + row.original["applicationNo"]
          }, row.original["applicationNo"])));
        }
      }, {
        Header: t("ES_APPLICATION_DETAILS_APPLICANT_NAME"),
        disableSortBy: true,
        accessor: row => {
          var _row$citizen;
          return GetCell(((_row$citizen = row.citizen) === null || _row$citizen === void 0 ? void 0 : _row$citizen.name) || "");
        }
      }, {
        Header: t("ES_APPLICATION_DETAILS_APPLICANT_MOBILE_NO"),
        disableSortBy: true,
        accessor: row => {
          var _row$citizen2;
          return GetCell(((_row$citizen2 = row.citizen) === null || _row$citizen2 === void 0 ? void 0 : _row$citizen2.mobileNumber) || "");
        }
      }, {
        Header: t("ES_APPLICATION_DETAILS_PROPERTY_TYPE"),
        accessor: row => {
          const key = t(`PROPERTYTYPE_MASTERS_${row.propertyUsage.split(".")[0]}`);
          return key;
        },
        disableSortBy: true
      }, {
        Header: t("ES_APPLICATION_DETAILS_PROPERTY_SUB-TYPE"),
        accessor: row => {
          const key = t(`PROPERTYTYPE_MASTERS_${row.propertyUsage}`);
          return key;
        },
        disableSortBy: true
      }, {
        Header: t("ES_INBOX_LOCALITY"),
        accessor: row => GetCell(t(Digit.Utils.locale.getRevenueLocalityCode(row.address.locality.code, row.tenantId))),
        disableSortBy: true
      }, {
        Header: t("ES_INBOX_STATUS"),
        accessor: row => {
          return GetCell(t(`CS_COMMON_FSM_${row.applicationStatus}`));
        },
        disableSortBy: true
      }];
    }
    switch (props.userRole) {
      case "FSM_EMP_FSTPO_REQUEST":
        return [{
          Header: t("ES_INBOX_APPLICATION_NO"),
          accessor: "applicationNo",
          Cell: ({
            row
          }) => {
            var _props$fstprequest;
            let citizen_info = props === null || props === void 0 ? void 0 : (_props$fstprequest = props.fstprequest) === null || _props$fstprequest === void 0 ? void 0 : _props$fstprequest.find(i => row.original.tripDetails[0].referenceNo === i.applicationNo);
            return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
              className: "link"
            }, /*#__PURE__*/React.createElement(Link, {
              to: "/digit-ui/employee/fsm/fstp-operator-details/" + row.original["applicationNo"]
            }, " ", citizen_info === null || citizen_info === void 0 ? void 0 : citizen_info.applicationNo)));
          }
        }, {
          Header: t("CS_COMMON_CITIZEN_NAME"),
          disableSortBy: true,
          Cell: ({
            row
          }) => {
            var _props$fstprequest2, _citizen_info$citizen;
            let citizen_info = props === null || props === void 0 ? void 0 : (_props$fstprequest2 = props.fstprequest) === null || _props$fstprequest2 === void 0 ? void 0 : _props$fstprequest2.find(i => row.original.tripDetails[0].referenceNo === i.applicationNo);
            return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, citizen_info === null || citizen_info === void 0 ? void 0 : (_citizen_info$citizen = citizen_info.citizen) === null || _citizen_info$citizen === void 0 ? void 0 : _citizen_info$citizen.name));
          }
        }, {
          Header: t("CS_COMMON_CITIZEN_NUMBER"),
          disableSortBy: true,
          accessor: "number",
          Cell: ({
            row
          }) => {
            var _props$fstprequest3, _citizen_info$citizen2;
            let citizen_info = props === null || props === void 0 ? void 0 : (_props$fstprequest3 = props.fstprequest) === null || _props$fstprequest3 === void 0 ? void 0 : _props$fstprequest3.find(i => row.original.tripDetails[0].referenceNo === i.applicationNo);
            return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, citizen_info === null || citizen_info === void 0 ? void 0 : (_citizen_info$citizen2 = citizen_info.citizen) === null || _citizen_info$citizen2 === void 0 ? void 0 : _citizen_info$citizen2.mobileNumber));
          }
        }, {
          Header: t("ES_INBOX_LOCALITY"),
          disableSortBy: true,
          accessor: "locality",
          Cell: ({
            row
          }) => {
            var _props$fstprequest4, _citizen_info$address, _citizen_info$address2;
            let citizen_info = props === null || props === void 0 ? void 0 : (_props$fstprequest4 = props.fstprequest) === null || _props$fstprequest4 === void 0 ? void 0 : _props$fstprequest4.find(i => row.original.tripDetails[0].referenceNo === i.applicationNo);
            return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, t(`${citizen_info === null || citizen_info === void 0 ? void 0 : (_citizen_info$address = citizen_info.address) === null || _citizen_info$address === void 0 ? void 0 : (_citizen_info$address2 = _citizen_info$address.locality) === null || _citizen_info$address2 === void 0 ? void 0 : _citizen_info$address2.code}`)));
          }
        }];
      case "FSM_EMP_FSTPO":
        return [{
          Header: t("ES_INBOX_APPLICATION_NO"),
          disableSortBy: true,
          accessor: "tripDetails",
          Cell: ({
            row
          }) => {
            return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
              className: "link"
            }, /*#__PURE__*/React.createElement(Link, {
              to: "/digit-ui/employee/fsm/fstp-operator-details/" + row.original["applicationNo"]
            }, row.original["tripDetails"].map(i => /*#__PURE__*/React.createElement("div", null, i.referenceNo, /*#__PURE__*/React.createElement("br", null))))));
          }
        }, {
          Header: t("ES_INBOX_VEHICLE_LOG"),
          accessor: "applicationNo",
          disableSortBy: true,
          Cell: ({
            row
          }) => {
            return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
              className: "link"
            }, /*#__PURE__*/React.createElement(Link, {
              to: "/digit-ui/employee/fsm/fstp-operator-details/" + row.original["applicationNo"]
            }, row.original["applicationNo"])));
          }
        }, {
          Header: t("ES_INBOX_APPLICATION_DATE"),
          accessor: "createdTime",
          Cell: ({
            row
          }) => {
            return GetCell(`${new Date(row.original.auditDetails.createdTime).getDate()}/${new Date(row.original.auditDetails.createdTime).getMonth() + 1}/${new Date(row.original.auditDetails.createdTime).getFullYear()}`);
          }
        }, {
          Header: t("ES_INBOX_VEHICLE_NO"),
          disableSortBy: true,
          accessor: row => {
            var _row$vehicle;
            return (_row$vehicle = row.vehicle) === null || _row$vehicle === void 0 ? void 0 : _row$vehicle.registrationNumber;
          }
        }, {
          Header: t("ES_INBOX_DSO_NAME"),
          disableSortBy: true,
          accessor: row => row.dsoName ? `${row.dsoName} - ${row.tripOwner.name}` : `${row.tripOwner.name}`
        }, {
          Header: t("ES_INBOX_VEHICLE_STATUS"),
          disableSortBy: true,
          accessor: row => row.status
        }, {
          Header: t("ES_INBOX_WASTE_COLLECTED"),
          disableSortBy: true,
          accessor: row => {
            var _row$tripDetails$;
            return (_row$tripDetails$ = row.tripDetails[0]) === null || _row$tripDetails$ === void 0 ? void 0 : _row$tripDetails$.volume;
          }
        }];
      default:
        return [{
          Header: t("CS_FILE_DESLUDGING_APPLICATION_NO"),
          Cell: ({
            row
          }) => {
            return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
              className: "link"
            }, /*#__PURE__*/React.createElement(Link, {
              to: `${props.parentRoute}/${DSO ? "dso-application-details" : "application-details"}/` + row.original["applicationNo"]
            }, row.original["applicationNo"])));
          }
        }, {
          Header: t("ES_INBOX_APPLICATION_DATE"),
          accessor: "createdTime",
          Cell: ({
            row
          }) => {
            return GetCell(`${row.original.createdTime.getDate()}/${row.original.createdTime.getMonth() + 1}/${row.original.createdTime.getFullYear()}`);
          }
        }, {
          Header: t("ES_INBOX_LOCALITY"),
          Cell: ({
            row
          }) => {
            return GetCell(t(Digit.Utils.locale.getRevenueLocalityCode(row.original["locality"], row.original["tenantId"])));
          }
        }, {
          Header: t("ES_INBOX_STATUS"),
          Cell: row => {
            return GetCell(t(`CS_COMMON_FSM_${row.row.original["status"]}`));
          }
        }, {
          Header: t("ES_INBOX_SLA_DAYS_REMAINING"),
          Cell: ({
            row
          }) => {
            return GetSlaCell(row.original["sla"]);
          }
        }];
    }
  }, [props.fstprequest, props.data]);
  let result;
  if (props.isLoading) {
    result = /*#__PURE__*/React.createElement(Loader, null);
  } else if (props.isSearch && !props.shouldSearch || (props === null || props === void 0 ? void 0 : (_props$data = props.data) === null || _props$data === void 0 ? void 0 : (_props$data$table = _props$data.table) === null || _props$data$table === void 0 ? void 0 : _props$data$table.length) === 0) {
    result = /*#__PURE__*/React.createElement(Card, {
      style: {
        marginTop: 20
      }
    }, t("CS_MYAPPLICATIONS_NO_APPLICATION").split("\\n").map((text, index) => /*#__PURE__*/React.createElement("p", {
      key: index,
      style: {
        textAlign: "center"
      }
    }, text)));
  } else if ((props === null || props === void 0 ? void 0 : (_props$data2 = props.data) === null || _props$data2 === void 0 ? void 0 : (_props$data2$table = _props$data2.table) === null || _props$data2$table === void 0 ? void 0 : _props$data2$table.length) > 0) {
    result = /*#__PURE__*/React.createElement(ApplicationTable, {
      t: t,
      data: props.data.table,
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
      onPageSizeChange: props.onPageSizeChange,
      currentPage: props.currentPage,
      onNextPage: props.onNextPage,
      onPrevPage: props.onPrevPage,
      pageSizeLimit: props.pageSizeLimit,
      onSort: props.onSort,
      disableSort: props.disableSort,
      sortParams: props.sortParams,
      totalRecords: props.totalRecords,
      isPaginationRequired: props.isPaginationRequired
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "inbox-container"
  }, props.userRole !== "FSM_EMP_FSTPO" && !props.isSearch && /*#__PURE__*/React.createElement("div", {
    className: "filters-container"
  }, props.userRole !== "FSM_EMP_FSTPO_REQUEST" ? /*#__PURE__*/React.createElement(FSMLink, {
    parentRoute: props.parentRoute
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: props.userRole !== "FSM_EMP_FSTPO_REQUEST" ? {
      marginTop: "24px"
    } : {}
  }, /*#__PURE__*/React.createElement(Filter, {
    searchParams: props.searchParams,
    paginationParms: props.paginationParms,
    applications: props.data,
    onFilterChange: props.onFilterChange,
    type: "desktop"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      marginLeft: "24px"
    }
  }, /*#__PURE__*/React.createElement(SearchApplication, {
    onSearch: props.onSearch,
    type: "desktop",
    searchFields: props.searchFields,
    isInboxPage: !(props !== null && props !== void 0 && props.isSearch),
    searchParams: props.searchParams
  }), /*#__PURE__*/React.createElement("div", {
    className: "result",
    style: {
      marginLeft: FSTP ? "" : !(props !== null && props !== void 0 && props.isSearch) ? "24px" : "",
      flex: 1
    }
  }, result)));
};

const SortBy = props => {
  const {
    t
  } = useTranslation();
  const [selectedOption, setSelectedOption] = useState(() => {
    var _props$sortParams, _props$sortParams$;
    return (_props$sortParams = props.sortParams) !== null && _props$sortParams !== void 0 && (_props$sortParams$ = _props$sortParams[0]) !== null && _props$sortParams$ !== void 0 && _props$sortParams$.desc ? {
      code: "DESC",
      name: t("ES_INBOX_DATE_LATEST_FIRST")
    } : {
      code: "ASC",
      name: t("ES_INBOX_DATE_LATEST_LAST")
    };
  });
  function clearAll() {}
  function onSort(option) {
    props.onSort([{
      id: "createdTime",
      desc: option.code === "DESC" ? true : false
    }]);
    props.onClose();
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "filter"
  }, /*#__PURE__*/React.createElement("div", {
    className: "filter-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "filter-label"
  }, t("SORT_BY"), ":"), /*#__PURE__*/React.createElement("div", {
    className: "clearAll",
    onClick: clearAll
  }, t("ES_COMMON_CLEAR_ALL")), props.type === "desktop" && /*#__PURE__*/React.createElement("span", {
    className: "clear-search",
    onClick: clearAll
  }, t("ES_COMMON_CLEAR_ALL")), props.type === "mobile" && /*#__PURE__*/React.createElement("span", {
    onClick: props.onClose
  }, /*#__PURE__*/React.createElement(CloseSvg, null))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(RadioButtons, {
    onSelect: onSort,
    selectedOption: selectedOption,
    optionsKey: "name",
    options: [{
      code: "DESC",
      name: t("ES_INBOX_DATE_LATEST_FIRST")
    }, {
      code: "ASC",
      name: t("ES_INBOX_DATE_LATEST_LAST")
    }]
  })))));
};

const ApplicationCard = ({
  t,
  data,
  onFilterChange,
  onSearch,
  onSort,
  serviceRequestIdKey,
  isFstpOperator,
  isLoading,
  isSearch,
  searchParams,
  searchFields,
  sortParams,
  linkPrefix,
  removeParam,
  filterData
}) => {
  var _mergedRoleDetails$st;
  const [type, setType] = useState(isSearch ? "SEARCH" : "");
  const [popup, setPopup] = useState(isSearch ? true : false);
  const [params, setParams] = useState(searchParams);
  const [_sortparams, setSortParams] = useState(sortParams);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const state = Digit.ULBService.getStateId();
  const {
    data: roleStatuses,
    isFetched: isRoleStatusFetched
  } = Digit.Hooks.fsm.useMDMS(state, "DIGIT-UI", "RoleStatusMapping");
  const userInfo = Digit.UserService.getUser();
  const userRoles = userInfo.info.roles.map(roleData => roleData.code);
  const userRoleDetails = roleStatuses === null || roleStatuses === void 0 ? void 0 : roleStatuses.filter(roleDetails => userRoles.filter(role => role === roleDetails.userRole)[0]);
  const mergedRoleDetails = userRoleDetails === null || userRoleDetails === void 0 ? void 0 : userRoleDetails.reduce((merged, details) => ({
    fixed: (details === null || details === void 0 ? void 0 : details.fixed) && (merged === null || merged === void 0 ? void 0 : merged.fixed),
    statuses: [...(merged === null || merged === void 0 ? void 0 : merged.statuses), ...(details === null || details === void 0 ? void 0 : details.statuses)].filter((item, pos, self) => self.indexOf(item) == pos),
    zeroCheck: (details === null || details === void 0 ? void 0 : details.zeroCheck) || (merged === null || merged === void 0 ? void 0 : merged.zeroCheck)
  }), {
    statuses: []
  });
  const selectParams = param => {
    setParams(o => ({
      ...o,
      ...param
    }));
  };
  const onSearchPara = param => {
    onFilterChange({
      ...params,
      ...param
    });
    setType("");
    setPopup(false);
  };
  useEffect(() => {
    if (type) setPopup(true);
  }, [type]);
  const DSO = Digit.UserService.hasAccess(["FSM_DSO"]) || false;
  const handlePopupClose = () => {
    setPopup(false);
    setType("");
    setParams(searchParams);
    setSortParams(sortParams);
  };
  if (isLoading || !isRoleStatusFetched) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  let result;
  if (!data || (data === null || data === void 0 ? void 0 : data.length) === 0) {
    result = /*#__PURE__*/React.createElement(Card, {
      style: {
        marginTop: 20
      }
    }, t("CS_MYAPPLICATIONS_NO_APPLICATION").split("\\n").map((text, index) => /*#__PURE__*/React.createElement("p", {
      key: index,
      style: {
        textAlign: "center"
      }
    }, text)));
  } else if (data && (data === null || data === void 0 ? void 0 : data.length) > 0) {
    result = /*#__PURE__*/React.createElement(DetailsCard, {
      data: data,
      serviceRequestIdKey: serviceRequestIdKey,
      linkPrefix: linkPrefix ? linkPrefix : DSO ? "/digit-ui/employee/fsm/application-details/" : "/digit-ui/employee/fsm/"
    });
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "searchBox"
  }, onSearch && /*#__PURE__*/React.createElement(SearchAction, {
    text: "SEARCH",
    handleActionClick: () => {
      setType("SEARCH");
      setPopup(true);
    }
  }), !isSearch && onFilterChange && (!DSO && !isFstpOperator && searchParams || (mergedRoleDetails === null || mergedRoleDetails === void 0 ? void 0 : (_mergedRoleDetails$st = mergedRoleDetails.statuses) === null || _mergedRoleDetails$st === void 0 ? void 0 : _mergedRoleDetails$st.length) > 0) && /*#__PURE__*/React.createElement(FilterAction, {
    text: "FILTER",
    handleActionClick: () => {
      setType("FILTER");
      setPopup(true);
    }
  }), !isSearch && /*#__PURE__*/React.createElement(FilterAction, {
    text: "SORT",
    handleActionClick: () => {
      setType("SORT");
      setPopup(true);
    }
  })), result, popup && /*#__PURE__*/React.createElement(PopUp, null, type === "FILTER" && /*#__PURE__*/React.createElement("div", {
    className: "popup-module"
  }, /*#__PURE__*/React.createElement(Filter, {
    onFilterChange: selectParams,
    onClose: handlePopupClose,
    onSearch: onSearchPara,
    applications: filterData,
    type: "mobile",
    searchParams: params,
    removeParam: removeParam
  })), type === "SORT" && /*#__PURE__*/React.createElement("div", {
    className: "popup-module"
  }, /*#__PURE__*/React.createElement(SortBy, {
    type: "mobile",
    sortParams: sortParams,
    onClose: handlePopupClose,
    onSort: onSort
  })), type === "SEARCH" && /*#__PURE__*/React.createElement("div", {
    className: "popup-module"
  }, /*#__PURE__*/React.createElement(SearchApplication, {
    type: "mobile",
    onClose: handlePopupClose,
    onSearch: onSearch,
    isFstpOperator: isFstpOperator,
    searchParams: searchParams,
    searchFields: searchFields
  }))));
};

const GetSlaCell = value => {
  if (isNaN(value)) return /*#__PURE__*/React.createElement("span", {
    className: "sla-cell-success"
  }, "0");
  return value < 0 ? /*#__PURE__*/React.createElement("span", {
    className: "sla-cell-error"
  }, value) : /*#__PURE__*/React.createElement("span", {
    className: "sla-cell-success"
  }, value);
};
const GetCell = value => /*#__PURE__*/React.createElement("span", {
  className: "sla-cell"
}, value);
const MobileInbox = ({
  data,
  vehicleLog,
  isLoading,
  isSearch,
  onSearch,
  onFilterChange,
  onSort,
  searchParams,
  searchFields,
  linkPrefix,
  parentRoute,
  removeParam,
  sortParams,
  fstprequest,
  isFSMRequest
}) => {
  const {
    t
  } = useTranslation();
  const getData = () => {
    if (isSearch) {
      var _data$table;
      return data === null || data === void 0 ? void 0 : (_data$table = data.table) === null || _data$table === void 0 ? void 0 : _data$table.map(({
        applicationNo,
        applicationStatus,
        propertyUsage,
        tenantId,
        address,
        citizen
      }) => ({
        [t("ES_INBOX_APPLICATION_NO")]: applicationNo,
        [t("ES_APPLICATION_DETAILS_APPLICANT_NAME")]: GetCell((citizen === null || citizen === void 0 ? void 0 : citizen.name) || ""),
        [t("ES_APPLICATION_DETAILS_APPLICANT_MOBILE_NO")]: GetCell((citizen === null || citizen === void 0 ? void 0 : citizen.mobileNumber) || ""),
        [t("ES_APPLICATION_DETAILS_PROPERTY_TYPE")]: GetCell(t(`PROPERTYTYPE_MASTERS_${propertyUsage.split(".")[0]}`)),
        [t("ES_APPLICATION_DETAILS_PROPERTY_SUB-TYPE")]: GetCell(t(`PROPERTYTYPE_MASTERS_${propertyUsage}`)),
        [t("ES_INBOX_LOCALITY")]: GetCell(t(Digit.Utils.locale.getRevenueLocalityCode(address.locality.code, tenantId))),
        [t("ES_INBOX_STATUS")]: GetCell(t(`CS_COMMON_FSM_${applicationStatus}`))
      }));
    } else {
      var _data$table2;
      return data === null || data === void 0 ? void 0 : (_data$table2 = data.table) === null || _data$table2 === void 0 ? void 0 : _data$table2.map(({
        locality,
        applicationNo,
        createdTime,
        tenantId,
        status,
        sla
      }) => ({
        [t("ES_INBOX_APPLICATION_NO")]: applicationNo,
        [t("ES_INBOX_APPLICATION_DATE")]: `${createdTime.getDate()}/${createdTime.getMonth() + 1}/${createdTime.getFullYear()}`,
        [t("ES_INBOX_LOCALITY")]: GetCell(t(Digit.Utils.locale.getRevenueLocalityCode(locality, tenantId))),
        [t("ES_INBOX_STATUS")]: GetCell(t(`CS_COMMON_${status}`)),
        [t("ES_INBOX_SLA_DAYS_REMAINING")]: GetSlaCell(sla)
      }));
    }
  };
  const DSO = Digit.UserService.hasAccess(["FSM_DSO"]) || false;
  const isFstpOperator = Digit.UserService.hasAccess("FSM_EMP_FSTPO") || false;
  const fstpOperatorData = vehicleLog === null || vehicleLog === void 0 ? void 0 : vehicleLog.map(vehicle => {
    var _vehicle$vehicle, _vehicle$tripDetails$;
    return {
      [t("ES_INBOX_APPLICATION_NO")]: vehicle === null || vehicle === void 0 ? void 0 : vehicle.tripDetails.map(i => i.referenceNo),
      [t("ES_INBOX_VEHICLE_LOG")]: vehicle === null || vehicle === void 0 ? void 0 : vehicle.applicationNo,
      [t("ES_INBOX_VEHICLE_NO")]: vehicle === null || vehicle === void 0 ? void 0 : (_vehicle$vehicle = vehicle.vehicle) === null || _vehicle$vehicle === void 0 ? void 0 : _vehicle$vehicle.registrationNumber,
      [t("ES_INBOX_DSO_NAME")]: vehicle === null || vehicle === void 0 ? void 0 : vehicle.tripOwner.displayName,
      [t("ES_INBOX_VEHICLE_STATUS")]: vehicle === null || vehicle === void 0 ? void 0 : vehicle.status,
      [t("ES_INBOX_WASTE_COLLECTED")]: vehicle === null || vehicle === void 0 ? void 0 : (_vehicle$tripDetails$ = vehicle.tripDetails[0]) === null || _vehicle$tripDetails$ === void 0 ? void 0 : _vehicle$tripDetails$.volume
    };
  });
  const fstp_citizen_data = fstprequest === null || fstprequest === void 0 ? void 0 : fstprequest.map(citizen => {
    var _citizen$citizen, _citizen$citizen2, _citizen$address, _citizen$address$loca;
    let vehicleInfo = vehicleLog === null || vehicleLog === void 0 ? void 0 : vehicleLog.find(i => {
      var _i$tripDetails$;
      return (i === null || i === void 0 ? void 0 : (_i$tripDetails$ = i.tripDetails[0]) === null || _i$tripDetails$ === void 0 ? void 0 : _i$tripDetails$.referenceNo) === (citizen === null || citizen === void 0 ? void 0 : citizen.applicationNo);
    });
    return {
      [t("ES_INBOX_VEHICLE_LOG")]: (vehicleInfo === null || vehicleInfo === void 0 ? void 0 : vehicleInfo.applicationNo) || "N/A",
      [t("CS_COMMON_CITIZEN_NAME")]: (citizen === null || citizen === void 0 ? void 0 : (_citizen$citizen = citizen.citizen) === null || _citizen$citizen === void 0 ? void 0 : _citizen$citizen.name) || "N/A",
      [t("CS_COMMON_CITIZEN_NUMBER")]: (citizen === null || citizen === void 0 ? void 0 : (_citizen$citizen2 = citizen.citizen) === null || _citizen$citizen2 === void 0 ? void 0 : _citizen$citizen2.mobileNumber) || "N/A",
      [t("ES_INBOX_LOCALITY")]: (citizen === null || citizen === void 0 ? void 0 : (_citizen$address = citizen.address) === null || _citizen$address === void 0 ? void 0 : (_citizen$address$loca = _citizen$address.locality) === null || _citizen$address$loca === void 0 ? void 0 : _citizen$address$loca.name) || "N/A"
    };
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "inbox-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "filters-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "none"
    }
  }, !isSearch && /*#__PURE__*/React.createElement(Filter, {
    searchParams: searchParams,
    applications: data,
    onFilterChange: onFilterChange,
    type: "mobile"
  })), /*#__PURE__*/React.createElement(ApplicationCard, {
    t: t,
    filterData: data,
    data: !data ? isFstpOperator && isFSMRequest ? fstp_citizen_data : fstpOperatorData : getData(),
    onFilterChange: isFSMRequest || !isFstpOperator ? onFilterChange : false,
    serviceRequestIdKey: isFstpOperator ? t("ES_INBOX_VEHICLE_LOG") : DSO ? t("ES_INBOX_APPLICATION_NO") : t("ES_INBOX_APPLICATION_NO"),
    isFstpOperator: isFstpOperator,
    isLoading: isLoading,
    isSearch: isSearch,
    onSearch: onSearch,
    onSort: onSort,
    searchParams: searchParams,
    searchFields: searchFields,
    linkPrefix: linkPrefix,
    removeParam: removeParam,
    sortParams: sortParams
  }))));
};

const config = {
  select: response => {
    return {
      totalCount: response === null || response === void 0 ? void 0 : response.totalCount,
      vehicleLog: response === null || response === void 0 ? void 0 : response.vehicleTrip.map(trip => {
        const owner = trip.tripOwner;
        const displayName = owner.name + (owner.userName ? `- ${owner.userName}` : "");
        const tripOwner = {
          ...owner,
          displayName
        };
        return {
          ...trip,
          tripOwner
        };
      })
    };
  }
};
const FstpServiceRequest = () => {
  var _vehicles$vehicle$, _vehicles$vehicle$2, _sortParams$;
  const history = useHistory();
  const {
    t
  } = useTranslation();
  const location = useLocation();
  const vehicleNumber = location.pathname.split("/").at(-1);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [searchParams, setSearchParams] = useState({
    applicationStatus: "WAITING_FOR_DISPOSAL"
  });
  const [searchParamsApplication, setSearchParamsApplication] = useState(null);
  const [filterParam, setFilterParam] = useState();
  const [sortParams, setSortParams] = useState([{
    id: "applicationNo",
    desc: true
  }]);
  const [pageOffset, setPageOffset] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [isVehicleSearchCompleted, setIsVehicleSearchCompleted] = useState(false);
  const [tripDetail, setTripDetail] = useState(null);
  const userInfo = Digit.UserService.getUser();
  let isMobile = window.Digit.Utils.browser.isMobile();
  const {
    isLoading: isVehiclesLoading,
    data: vehicles
  } = Digit.Hooks.fsm.useVehiclesSearch({
    tenantId,
    filters: {
      registrationNumber: vehicleNumber
    },
    config: {
      enabled: (vehicleNumber === null || vehicleNumber === void 0 ? void 0 : vehicleNumber.length) > 0
    }
  });
  let filters = {
    businessService: "FSM_VEHICLE_TRIP",
    vehicleIds: vehicles !== undefined && (vehicles === null || vehicles === void 0 ? void 0 : (_vehicles$vehicle$ = vehicles.vehicle[0]) === null || _vehicles$vehicle$ === void 0 ? void 0 : _vehicles$vehicle$.id.length) > 0 ? (vehicles === null || vehicles === void 0 ? void 0 : (_vehicles$vehicle$2 = vehicles.vehicle[0]) === null || _vehicles$vehicle$2 === void 0 ? void 0 : _vehicles$vehicle$2.id) || "null" : "null",
    applicationStatus: searchParams === null || searchParams === void 0 ? void 0 : searchParams.applicationStatus,
    sortOrder: ((_sortParams$ = sortParams[0]) === null || _sortParams$ === void 0 ? void 0 : _sortParams$.desc) === false ? "ASC" : "DESC"
  };
  const {
    isLoading,
    data: {
      totalCount,
      vehicleLog
    } = {},
    isSuccess
  } = Digit.Hooks.fsm.useVehicleSearch({
    tenantId,
    filters,
    config,
    options: {
      searchWithDSO: true
    }
  });
  const {
    isLoading: isSearchLoading,
    isIdle,
    data: {
      data: {
        table: tripDetails
      } = {}
    } = {}
  } = Digit.Hooks.fsm.useSearchAll(tenantId, searchParamsApplication, null, {
    enabled: !!isVehicleSearchCompleted
  });
  useEffect(() => {
    var _sortParams$2;
    const applicationNos = vehicleLog === null || vehicleLog === void 0 ? void 0 : vehicleLog.map(i => {
      var _i$tripDetails$;
      return i === null || i === void 0 ? void 0 : (_i$tripDetails$ = i.tripDetails[0]) === null || _i$tripDetails$ === void 0 ? void 0 : _i$tripDetails$.referenceNo;
    }).join(",");
    setSearchParamsApplication({
      applicationNos: applicationNos ? applicationNos : "null",
      sortOrder: ((_sortParams$2 = sortParams[0]) === null || _sortParams$2 === void 0 ? void 0 : _sortParams$2.desc) === false ? "ASC" : "DESC"
    });
    setIsVehicleSearchCompleted(true);
  }, [isSuccess, isSearchLoading, isVehiclesLoading, vehicleLog, isIdle, isLoading, sortParams, vehicles]);
  useEffect(() => {
    if (tripDetails) {
      setTripDetail(tripDetails);
    }
  }, [tripDetails, isSearchLoading, isIdle]);
  vehicleLog === null || vehicleLog === void 0 ? void 0 : vehicleLog.map(i => {
  });
  const onSearch = (params = {}) => {
    var _params$applicationNo;
    const a = (params === null || params === void 0 ? void 0 : (_params$applicationNo = params.applicationNos) === null || _params$applicationNo === void 0 ? void 0 : _params$applicationNo.length) > 0 ? params === null || params === void 0 ? void 0 : params.applicationNos : null;
    let tempTripDetails = tripDetails;
    let filterTripDetails = a ? tempTripDetails.filter(i => i.applicationNo === a) : tempTripDetails.filter(i => i.applicationNo);
    setTripDetail(filterTripDetails);
  };
  const fetchNextPage = () => {
    setPageOffset(prevState => prevState + pageSize);
  };
  const fetchPrevPage = () => {
    setPageOffset(prevState => prevState - pageSize);
  };
  const handlePageSizeChange = e => {
    setPageSize(Number(e.target.value));
  };
  const handleFilterChange = filterParam => {
    let tempTripDetails = tripDetails;
    let filterTripDetails = tempTripDetails.filter(i => {
      var _i$address, _i$address$locality, _filterParam$locality, _filterParam$locality2, _filterParam$locality3;
      return i === null || i === void 0 ? void 0 : (_i$address = i.address) === null || _i$address === void 0 ? void 0 : (_i$address$locality = _i$address.locality) === null || _i$address$locality === void 0 ? void 0 : _i$address$locality.name.includes(filterParam !== null && filterParam !== void 0 && (_filterParam$locality = filterParam.locality) !== null && _filterParam$locality !== void 0 && (_filterParam$locality2 = _filterParam$locality[0]) !== null && _filterParam$locality2 !== void 0 && _filterParam$locality2.name ? filterParam === null || filterParam === void 0 ? void 0 : (_filterParam$locality3 = filterParam.locality) === null || _filterParam$locality3 === void 0 ? void 0 : _filterParam$locality3[0].name : "");
    });
    setTripDetail(filterTripDetails);
    setFilterParam(filterParam);
  };
  const searchFields = [{
    label: t("ES_SEARCH_APPLICATION_APPLICATION_NO"),
    name: "applicationNos"
  }];
  const handleSort = useCallback(args => {
    if ((args === null || args === void 0 ? void 0 : args.length) === 0) return;
    setSortParams(args);
  }, []);
  if (isLoading && !isSuccess && isSearchLoading && isVehiclesLoading && !isIdle && !isVehicleSearchCompleted) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  if ((vehicleLog === null || vehicleLog === void 0 ? void 0 : vehicleLog.length) === 0 && (tripDetails === null || tripDetails === void 0 ? void 0 : tripDetails.length) === 0 && isSuccess && !isSearchLoading && (tripDetail === null || tripDetail === void 0 ? void 0 : tripDetail.length) === 0 && !isVehiclesLoading) {
    history.push(`/digit-ui/employee/fsm/fstp/new-vehicle-entry/${vehicleNumber}`);
  }
  let citizenInfo = [];
  tripDetail === null || tripDetail === void 0 ? void 0 : tripDetail.map(vehicle => {
    citizenInfo.push(vehicleLog === null || vehicleLog === void 0 ? void 0 : vehicleLog.find(i => {
      var _i$tripDetails$3;
      return (i === null || i === void 0 ? void 0 : (_i$tripDetails$3 = i.tripDetails[0]) === null || _i$tripDetails$3 === void 0 ? void 0 : _i$tripDetails$3.referenceNo) === (vehicle === null || vehicle === void 0 ? void 0 : vehicle.applicationNo);
    }));
  });
  if (isMobile) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Header, null, t("ES_FSM_FSTP_SERVICE_REQUEST")), /*#__PURE__*/React.createElement(MobileInbox, {
      onFilterChange: handleFilterChange,
      vehicleLog: vehicleLog,
      fstprequest: tripDetail,
      isFSMRequest: true,
      isLoading: isLoading,
      userRole: "FSM_EMP_FSTPO",
      linkPrefix: "/digit-ui/employee/fsm/fstp-operator-details/",
      onSearch: onSearch,
      searchFields: searchFields,
      onSort: handleSort,
      sortParams: sortParams
    }), /*#__PURE__*/React.createElement("span", {
      className: "link",
      style: {
        margin: "8px"
      }
    }, /*#__PURE__*/React.createElement(Link, {
      to: {
        pathname: "/digit-ui/employee/fsm/fstp/new-vehicle-entry/"
      }
    }, t("ES_FSM_FSTP_NEW_ENTRY"))));
  } else {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Header, null, t("ES_FSM_FSTP_SERVICE_REQUEST")), /*#__PURE__*/React.createElement(DesktopInbox, {
      data: {
        table: citizenInfo
      },
      fstprequest: tripDetails,
      isLoading: isLoading,
      onSort: handleSort,
      isFSMRequest: true,
      disableSort: false,
      sortParams: sortParams,
      userRole: "FSM_EMP_FSTPO_REQUEST",
      onFilterChange: handleFilterChange,
      searchFields: searchFields,
      onSearch: onSearch,
      onNextPage: fetchNextPage,
      onPrevPage: fetchPrevPage,
      currentPage: Math.floor(pageOffset / pageSize),
      pageSizeLimit: pageSize,
      onPageSizeChange: handlePageSizeChange,
      totalRecords: totalCount || 0,
      isPaginationRequired: false,
      searchParams: filterParam
    }), /*#__PURE__*/React.createElement("span", {
      className: "link",
      style: {
        margin: "294px",
        padding: "2px"
      }
    }, /*#__PURE__*/React.createElement(Link, {
      to: {
        pathname: "/digit-ui/employee/fsm/fstp/new-vehicle-entry/"
      }
    }, t("ES_FSM_FSTP_NEW_ENTRY"))));
  }
};

const FsmBreadCrumb = ({
  location
}) => {
  var _location$pathname, _location$pathname2, _location$pathname3, _location$pathname4, _location$pathname5, _location$pathname6, _location$pathname7, _location$pathname8, _location$pathname9, _location$pathname10, _location$pathname11, _location$pathname12, _location$pathname13, _location$pathname14, _location$pathname15, _location$pathname16, _location$pathname17;
  const {
    t
  } = useTranslation();
  const DSO = Digit.UserService.hasAccess(["FSM_DSO"]);
  const FSTPO = Digit.UserService.hasAccess(["FSM_EMP_FSTPO"]);
  const isApplicationDetails = location === null || location === void 0 ? void 0 : (_location$pathname = location.pathname) === null || _location$pathname === void 0 ? void 0 : _location$pathname.includes("application-details");
  const isVehicleLog = location === null || location === void 0 ? void 0 : (_location$pathname2 = location.pathname) === null || _location$pathname2 === void 0 ? void 0 : _location$pathname2.includes("fstp-operator-details");
  const isInbox = location === null || location === void 0 ? void 0 : (_location$pathname3 = location.pathname) === null || _location$pathname3 === void 0 ? void 0 : _location$pathname3.includes("inbox");
  const isFsm = location === null || location === void 0 ? void 0 : (_location$pathname4 = location.pathname) === null || _location$pathname4 === void 0 ? void 0 : _location$pathname4.includes("fsm");
  const isSearch = location === null || location === void 0 ? void 0 : (_location$pathname5 = location.pathname) === null || _location$pathname5 === void 0 ? void 0 : _location$pathname5.includes("search");
  const isRegistry = location === null || location === void 0 ? void 0 : (_location$pathname6 = location.pathname) === null || _location$pathname6 === void 0 ? void 0 : _location$pathname6.includes("registry");
  const isVendorDetails = location === null || location === void 0 ? void 0 : (_location$pathname7 = location.pathname) === null || _location$pathname7 === void 0 ? void 0 : _location$pathname7.includes("vendor-details");
  const isVendorEdit = location === null || location === void 0 ? void 0 : (_location$pathname8 = location.pathname) === null || _location$pathname8 === void 0 ? void 0 : _location$pathname8.includes("modify-vendor");
  const isNewApplication = location === null || location === void 0 ? void 0 : (_location$pathname9 = location.pathname) === null || _location$pathname9 === void 0 ? void 0 : _location$pathname9.includes("new-application");
  const isVehicleDetails = location === null || location === void 0 ? void 0 : (_location$pathname10 = location.pathname) === null || _location$pathname10 === void 0 ? void 0 : _location$pathname10.includes("vehicle-details");
  const isVehicleEdit = location === null || location === void 0 ? void 0 : (_location$pathname11 = location.pathname) === null || _location$pathname11 === void 0 ? void 0 : _location$pathname11.includes("modify-vehicle");
  const isDriverDetails = location === null || location === void 0 ? void 0 : (_location$pathname12 = location.pathname) === null || _location$pathname12 === void 0 ? void 0 : _location$pathname12.includes("driver-details");
  const isDriverEdit = location === null || location === void 0 ? void 0 : (_location$pathname13 = location.pathname) === null || _location$pathname13 === void 0 ? void 0 : _location$pathname13.includes("modify-driver");
  const isModifyApplication = location === null || location === void 0 ? void 0 : (_location$pathname14 = location.pathname) === null || _location$pathname14 === void 0 ? void 0 : _location$pathname14.includes("modify-application");
  const isNewVendor = location === null || location === void 0 ? void 0 : (_location$pathname15 = location.pathname) === null || _location$pathname15 === void 0 ? void 0 : _location$pathname15.includes("new-vendor");
  const isNewVehicle = location === null || location === void 0 ? void 0 : (_location$pathname16 = location.pathname) === null || _location$pathname16 === void 0 ? void 0 : _location$pathname16.includes("new-vehicle");
  const isNewDriver = location === null || location === void 0 ? void 0 : (_location$pathname17 = location.pathname) === null || _location$pathname17 === void 0 ? void 0 : _location$pathname17.includes("new-driver");
  const [search, setSearch] = useState(false);
  const [id, setId] = useState(false);
  useEffect(() => {
    if (!search) {
      setSearch(isSearch);
    } else if (isFsm || isInbox && search) {
      setSearch(false);
    }
    if (location !== null && location !== void 0 && location.pathname) {
      let path = location === null || location === void 0 ? void 0 : location.pathname.split("/");
      let id = path[path.length - 1];
      setId(id);
    }
  }, [location]);
  const crumbs = [{
    path: DSO ? "/digit-ui/citizen/fsm/dso-dashboard" : "/digit-ui/employee",
    content: t("ES_COMMON_HOME"),
    show: isFsm
  }, {
    path: isRegistry ? "/digit-ui/employee/fsm/registry" : FSTPO ? "/digit-ui/employee/fsm/fstp-inbox" : "/digit-ui/employee",
    content: isVehicleLog ? t("ES_TITLE_INBOX") : "FSM",
    show: isFsm
  }, {
    path: isNewApplication ? "/digit-ui/employee/fsm/new-application" : "",
    content: t("FSM_NEW_DESLUDGING_APPLICATION"),
    show: isFsm && isNewApplication
  }, {
    path: "",
    content: `${t("FSM_SUCCESS")}`,
    show: location.pathname.includes("/employee/fsm/response") ? true : false
  }, {
    path: isInbox || isSearch || isApplicationDetails ? "/digit-ui/employee/fsm/inbox" : "",
    content: t("ES_TITLE_INBOX"),
    show: isFsm && isInbox || isSearch || isApplicationDetails
  }, {
    path: "/digit-ui/employee/fsm/search",
    content: t("ES_TITILE_SEARCH_APPLICATION"),
    show: search
  }, {
    content: t("ES_TITLE_APPLICATION_DETAILS"),
    show: isApplicationDetails
  }, {
    content: t("ES_TITLE_VEHICLE_LOG"),
    show: isVehicleLog
  }, {
    path: "/digit-ui/employee/fsm/registry/vendor-details/" + id,
    content: t("ES_TITLE_VENDOR_DETAILS"),
    show: isRegistry && (isVendorDetails || isVendorEdit)
  }, {
    path: "/digit-ui/employee/fsm/registry/vehicle-details/" + id,
    content: t("ES_TITLE_VEHICLE_DETAILS"),
    show: isRegistry && (isVehicleDetails || isVehicleEdit)
  }, {
    path: "/digit-ui/employee/fsm/registry/driver-details/" + id,
    content: t("ES_TITLE_DRIVER_DETAILS"),
    show: isRegistry && (isDriverDetails || isDriverEdit)
  }, {
    content: t("ES_TITLE_VENDOR_EDIT"),
    show: isRegistry && (isVendorEdit || isVehicleEdit || isDriverEdit)
  }, {
    path: "digit-ui/employee/fsm/modify-application/" + id,
    content: t("ES_FSM_APPLICATION_UPDATE"),
    show: isModifyApplication
  }, {
    content: isNewVendor ? t("ES_FSM_ACTION_CREATE_VENDOR") : isNewVehicle ? t("ES_FSM_REGISTRY_DETAILS_TYPE_VEHICLE") : isNewDriver ? t("ES_FSM_REGISTRY_DETAILS_TYPE_DRIVER") : null,
    show: isRegistry && (isNewVendor || isNewVehicle || isNewDriver)
  }];
  return /*#__PURE__*/React.createElement(BreadCrumb, {
    crumbs: crumbs
  });
};
const EmployeeApp = ({
  path,
  url,
  userType
}) => {
  const {
    t
  } = useTranslation();
  const location = useLocation();
  const DSO = Digit.UserService.hasAccess(["FSM_DSO"]);
  const COLLECTOR = Digit.UserService.hasAccess("FSM_COLLECTOR") || false;
  const FSM_ADMIN = Digit.UserService.hasAccess("FSM_ADMIN") || false;
  const FSM_EDITOR = Digit.UserService.hasAccess("FSM_EDITOR_EMP") || false;
  const FSM_CREATOR = Digit.UserService.hasAccess("FSM_CREATOR_EMP") || false;
  useEffect(() => {
    var _location$pathname18;
    if (!(location !== null && location !== void 0 && (_location$pathname18 = location.pathname) !== null && _location$pathname18 !== void 0 && _location$pathname18.includes("application-details"))) {
      var _location$pathname19, _location$pathname20;
      if (!(location !== null && location !== void 0 && (_location$pathname19 = location.pathname) !== null && _location$pathname19 !== void 0 && _location$pathname19.includes("inbox"))) {
        Digit.SessionStorage.del("fsm/inbox/searchParams");
      } else if (!(location !== null && location !== void 0 && (_location$pathname20 = location.pathname) !== null && _location$pathname20 !== void 0 && _location$pathname20.includes("search"))) {
        Digit.SessionStorage.del("fsm/search/searchParams");
      }
    }
  }, [location]);
  const Inbox = Digit.ComponentRegistryService.getComponent("FSMEmpInbox");
  const FstpInbox = Digit.ComponentRegistryService.getComponent("FSMFstpInbox");
  const NewApplication = Digit.ComponentRegistryService.getComponent("FSMNewApplicationEmp");
  const EditApplication = Digit.ComponentRegistryService.getComponent("FSMEditApplication");
  const EmployeeApplicationDetails = Digit.ComponentRegistryService.getComponent("FSMEmployeeApplicationDetails");
  const FstpOperatorDetails = Digit.ComponentRegistryService.getComponent("FSMFstpOperatorDetails");
  const Response = Digit.ComponentRegistryService.getComponent("FSMResponse");
  const ApplicationAudit = Digit.ComponentRegistryService.getComponent("FSMApplicationAudit");
  const RateView = Digit.ComponentRegistryService.getComponent("FSMRateView");
  const FSMLinks = Digit.ComponentRegistryService.getComponent("FSMLinks");
  const FSTPO = Digit.UserService.hasAccess(["FSM_EMP_FSTPO"]);
  const FSMRegistry = Digit.ComponentRegistryService.getComponent("FSMRegistry");
  const VendorDetails = Digit.ComponentRegistryService.getComponent("VendorDetails");
  const AddVendor = Digit.ComponentRegistryService.getComponent("AddVendor");
  const EditVendor = Digit.ComponentRegistryService.getComponent("EditVendor");
  const VehicleDetails = Digit.ComponentRegistryService.getComponent("VehicleDetails");
  const AddVehicle = Digit.ComponentRegistryService.getComponent("AddVehicle");
  const EditVehicle = Digit.ComponentRegistryService.getComponent("EditVehicle");
  const DriverDetails = Digit.ComponentRegistryService.getComponent("DriverDetails");
  const AddDriver = Digit.ComponentRegistryService.getComponent("AddDriver");
  const EditDriver = Digit.ComponentRegistryService.getComponent("EditDriver");
  const BreadCrumbComp = Digit.ComponentRegistryService.getComponent("FsmBreadCrumb");
  const locationCheck = window.location.href.includes("/employee/fsm/inbox") || window.location.href.includes("/employee/fsm/registry") || window.location.href.includes("/employee/fsm/application-details/");
  const desludgingApplicationCheck = window.location.href.includes("/employee/fsm/new-application") || window.location.href.includes("/employee/fsm/modify-application");
  return /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "ground-container"
  }, FSTPO ? /*#__PURE__*/React.createElement(BackButton, {
    isCommonPTPropertyScreen: location.pathname.includes("new") ? true : false,
    getBackPageNumber: location.pathname.includes("new") ? () => -2 : null
  }, t("CS_COMMON_BACK")) : /*#__PURE__*/React.createElement("div", {
    style: locationCheck ? {
      marginLeft: "-4px"
    } : desludgingApplicationCheck ? {
      marginLeft: "12px"
    } : {
      marginLeft: "20px"
    }
  }, /*#__PURE__*/React.createElement(BreadCrumbComp, {
    location: location
  })), /*#__PURE__*/React.createElement(PrivateRoute, {
    exact: true,
    path: `${path}/`,
    component: () => /*#__PURE__*/React.createElement(FSMLinks, {
      matchPath: path,
      userType: userType
    })
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/inbox`,
    component: () => /*#__PURE__*/React.createElement(Inbox, {
      parentRoute: path,
      isInbox: true
    })
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/fstp-inbox`,
    component: () => /*#__PURE__*/React.createElement(FstpInbox, {
      parentRoute: path
    })
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/new-application`,
    component: () => /*#__PURE__*/React.createElement(NewApplication, {
      parentUrl: url
    })
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/modify-application/:id`,
    component: () => /*#__PURE__*/React.createElement(EditApplication, null)
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/application-details/:id`,
    component: () => /*#__PURE__*/React.createElement(EmployeeApplicationDetails, {
      parentRoute: path,
      userType: "EMPLOYEE"
    })
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/fstp-operator-details/:id`,
    component: FstpOperatorDetails
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/response`,
    component: props => /*#__PURE__*/React.createElement(Response, Object.assign({}, props, {
      parentRoute: path
    }))
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/application-audit/:id`,
    component: () => /*#__PURE__*/React.createElement(ApplicationAudit, {
      parentRoute: path
    })
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/search`,
    component: () => /*#__PURE__*/React.createElement(Inbox, {
      parentRoute: path,
      isSearch: true
    })
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/rate-view/:id`,
    component: () => /*#__PURE__*/React.createElement(RateView, {
      parentRoute: path
    })
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/mark-for-disposal`,
    component: () => /*#__PURE__*/React.createElement("div", null)
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    exact: true,
    path: `${path}/registry`,
    component: () => /*#__PURE__*/React.createElement(FSMRegistry, {
      parentRoute: path
    })
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/registry/vendor-details/:id`,
    component: () => /*#__PURE__*/React.createElement(VendorDetails, {
      parentRoute: path
    })
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/registry/new-vendor`,
    component: () => /*#__PURE__*/React.createElement(AddVendor, {
      parentRoute: path
    })
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/registry/modify-vendor/:id`,
    component: () => /*#__PURE__*/React.createElement(EditVendor, {
      parentRoute: path
    })
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/registry/vehicle-details/:id`,
    component: () => /*#__PURE__*/React.createElement(VehicleDetails, {
      parentRoute: path
    })
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/registry/new-vehicle`,
    component: () => /*#__PURE__*/React.createElement(AddVehicle, {
      parentRoute: path
    })
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/registry/modify-vehicle/:id`,
    component: () => /*#__PURE__*/React.createElement(EditVehicle, {
      parentRoute: path
    })
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/registry/driver-details/:id`,
    component: () => /*#__PURE__*/React.createElement(DriverDetails, {
      parentRoute: path
    })
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/registry/new-driver`,
    component: () => /*#__PURE__*/React.createElement(AddDriver, {
      parentRoute: path
    })
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/registry/modify-driver/:id`,
    component: () => /*#__PURE__*/React.createElement(EditDriver, {
      parentRoute: path
    })
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    exact: true,
    path: `${path}/fstp-operations`,
    component: () => /*#__PURE__*/React.createElement(FstpOperations, null)
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    exact: true,
    path: `${path}/fstp-add-vehicle`,
    component: () => /*#__PURE__*/React.createElement(FstpAddVehicle, null)
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    exact: true,
    path: `${path}/fstp-fsm-request/:id`,
    component: () => /*#__PURE__*/React.createElement(FstpServiceRequest, null)
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    exact: true,
    path: `${path}/fstp/new-vehicle-entry`,
    component: FstpOperatorDetails
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    exact: true,
    path: `${path}/fstp/new-vehicle-entry/:id`,
    component: FstpOperatorDetails
  }))));
};

const ApplicationAudit = ({
  parentRoute
}) => {
  var _auditResponse$fsmAud, _auditResponse$fsmAud2, _auditResponse$fsmAud3;
  const {
    t
  } = useTranslation();
  const {
    id
  } = useParams();
  const {
    tenantId
  } = Digit.UserService.getUser().info;
  const {
    data: auditResponse,
    isLoading
  } = Digit.Hooks.fsm.useApplicationAudit(tenantId, {
    applicationNo: id
  });
  const columns = React.useMemo(() => [{
    Header: t("ES_AUDIT_WHEN"),
    accessor: "when"
  }, {
    Header: t("ES_AUDIT_WHO"),
    accessor: "who"
  }, {
    Header: t("ES_AUDIT_WHAT"),
    accessor: "what"
  }], []);
  const whenList = auditResponse === null || auditResponse === void 0 ? void 0 : (_auditResponse$fsmAud = auditResponse.fsmAudit) === null || _auditResponse$fsmAud === void 0 ? void 0 : _auditResponse$fsmAud.map(e => new Date(e.when).toLocaleString());
  const uuids = auditResponse === null || auditResponse === void 0 ? void 0 : (_auditResponse$fsmAud2 = auditResponse.fsmAudit) === null || _auditResponse$fsmAud2 === void 0 ? void 0 : _auditResponse$fsmAud2.map(e => e.who);
  const userList = Digit.Hooks.useUserSearch(null, {
    uuid: uuids
  }, {}, {
    enabled: uuids ? true : false
  });
  const getUserFromUUID = uuid => {
    var _userList$data;
    let fetchedUsers = userList === null || userList === void 0 ? void 0 : (_userList$data = userList.data) === null || _userList$data === void 0 ? void 0 : _userList$data.user;
    if (fetchedUsers !== null && fetchedUsers !== void 0 && fetchedUsers.length) return fetchedUsers.filter(e => e.uuid === uuid)[0];else return null;
  };
  const getWhat = what => {
    const keys = Object.keys(what);
    return keys.map((key, i) => /*#__PURE__*/React.createElement("p", {
      key: i
    }, /*#__PURE__*/React.createElement("span", null, key), " : ", /*#__PURE__*/React.createElement("span", null, what[key])));
  };
  const data = auditResponse === null || auditResponse === void 0 ? void 0 : (_auditResponse$fsmAud3 = auditResponse.fsmAudit) === null || _auditResponse$fsmAud3 === void 0 ? void 0 : _auditResponse$fsmAud3.map((el, index) => {
    const user = getUserFromUUID(el.who);
    return {
      when: whenList[index],
      who: `${user === null || user === void 0 ? void 0 : user.name} (${user === null || user === void 0 ? void 0 : user.type})`,
      what: index === 0 ? /*#__PURE__*/React.createElement("p", null, "New Request", " ", /*#__PURE__*/React.createElement(Link, {
        to: `/digit-ui/employee/fsm/application-details/${id}`
      }, /*#__PURE__*/React.createElement(LinkButton, {
        label: t("ES_VIEW_APPLICATION"),
        style: {
          color: "#1671ba",
          marginLeft: "8px"
        }
      }))) : /*#__PURE__*/React.createElement(React.Fragment, null, getWhat(el.what))
    };
  });
  if (isLoading || userList.isLoading) return /*#__PURE__*/React.createElement(Loader, null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: "auto"
    }
  }, /*#__PURE__*/React.createElement(Header, null, t("ES_TITLE_APPLICATION_AUDIT")), /*#__PURE__*/React.createElement(Table, {
    t: t,
    data: data || [],
    columns: columns,
    getCellProps: cellInfo => {
      return {
        style: {
          padding: "20px 18px",
          fontSize: "16px"
        }
      };
    }
  }));
};

function getFilteredDsoData(dsoData, vehicle, vehicleCapacity) {
  return dsoData === null || dsoData === void 0 ? void 0 : dsoData.filter(e => {
    var _e$vehicles;
    return (_e$vehicles = e.vehicles) === null || _e$vehicles === void 0 ? void 0 : _e$vehicles.find(veh => (veh === null || veh === void 0 ? void 0 : veh.capacity) == vehicleCapacity);
  });
}
const configAssignDso = ({
  t,
  dsoData,
  dso,
  selectDSO,
  vehicleMenu,
  vehicle,
  vehicleCapacity,
  selectVehicle,
  action
}) => {
  return {
    label: {
      heading: `ES_FSM_ACTION_TITLE_${action}`,
      submit: `CS_COMMON_${action}`,
      cancel: "CS_COMMON_CLOSE"
    },
    form: [{
      body: [{
        label: t("ES_FSM_ACTION_DSO_NAME"),
        isMandatory: true,
        type: "dropdown",
        populators: /*#__PURE__*/React.createElement(React.Fragment, null, getFilteredDsoData(dsoData, vehicle, vehicleCapacity) && !getFilteredDsoData(dsoData, vehicle, vehicleCapacity).length ? /*#__PURE__*/React.createElement(CardLabelError, null, t("ES_COMMON_NO_DSO_AVAILABLE_WITH_SUCH_VEHICLE")) : null, /*#__PURE__*/React.createElement(Dropdown$2, {
          option: getFilteredDsoData(dsoData, vehicle, vehicleCapacity),
          autoComplete: "off",
          optionKey: "displayName",
          id: "dso",
          selected: dso,
          select: selectDSO,
          disable: getFilteredDsoData(dsoData, vehicle, vehicleCapacity) && !getFilteredDsoData(dsoData, vehicle, vehicleCapacity).length ? true : false
        }))
      }, {
        label: t("ES_FSM_ACTION_VEHICLE_CAPACITY_IN_LTRS"),
        isMandatory: true,
        type: "text",
        populators: {
          name: "capacity",
          validation: {
            required: true
          }
        },
        disable: true
      }, {
        label: t("ES_FSM_ACTION_SERVICE_DATE"),
        isMandatory: true,
        type: "custom",
        populators: {
          name: "date",
          validation: {
            required: true
          },
          customProps: {
            min: Digit.Utils.date.getDate()
          },
          defaultValue: Digit.Utils.date.getDate(),
          component: (props, customProps) => /*#__PURE__*/React.createElement(DatePicker$3, Object.assign({
            onChange: props.onChange,
            date: props.value
          }, customProps))
        }
      }]
    }]
  };
};

const configCompleteApplication = ({
  t,
  vehicle,
  vehicleCapacity,
  noOfTrips,
  applicationCreatedTime: _applicationCreatedTime = 0,
  receivedPaymentType,
  action,
  module
}) => ({
  label: {
    heading: `ES_FSM_ACTION_TITLE_${action}`,
    submit: `CS_COMMON_${action}`,
    cancel: "CS_COMMON_CLOSE"
  },
  form: [{
    body: [{
      label: t("ES_FSM_ACTION_DESLUGED_DATE_LABEL"),
      isMandatory: true,
      type: "custom",
      populators: {
        name: "desluged",
        validation: {
          required: true
        },
        defaultValue: Digit.Utils.date.getDate(),
        customProps: {
          min: Digit.Utils.date.getDate(_applicationCreatedTime),
          max: Digit.Utils.date.getDate()
        },
        component: (props, customProps) => /*#__PURE__*/React.createElement(DatePicker$3, Object.assign({
          disabled: true,
          onChange: props.onChange,
          date: props.value
        }, customProps))
      }
    }, {
      label: t("ES_FSM_ACTION_WASTE_VOLUME_LABEL"),
      type: "number",
      isMandatory: true,
      populators: {
        name: "wasteCollected",
        validation: {
          required: true,
          validate: value => parseInt(value) <= parseInt(vehicleCapacity)
        },
        error: `${t("ES_FSM_ACTION_INVALID_WASTE_VOLUME")} ${vehicleCapacity} ${t("CS_COMMON_LITRES")}`
      }
    }, {
      label: "ES_NEW_APPLICATION_PROPERTY_TYPE",
      isMandatory: true,
      type: "component",
      route: "property-type",
      key: "propertyType",
      component: "SelectPropertyType",
      disable: true,
      texts: {
        headerCaption: "",
        header: "CS_FILE_APPLICATION_PROPERTY_LABEL",
        cardText: "CS_FILE_APPLICATION_PROPERTY_TEXT",
        submitBarLabel: "CS_COMMON_NEXT"
      },
      nextStep: "property-subtype"
    }, {
      label: "ES_NEW_APPLICATION_PROPERTY_SUB-TYPE",
      isMandatory: true,
      type: "component",
      route: "property-subtype",
      key: "subtype",
      component: "SelectPropertySubtype",
      disable: true,
      texts: {
        headerCaption: "",
        header: "CS_FILE_APPLICATION_PROPERTY_SUBTYPE_LABEL",
        cardText: "CS_FILE_APPLICATION_PROPERTY_SUBTYPE_TEXT",
        submitBarLabel: "CS_COMMON_NEXT"
      },
      nextStep: "map"
    }, {
      label: "ES_NEW_APPLICATION_PIT_TYPE",
      isMandatory: false,
      type: "component",
      route: "pit-type",
      key: "pitType",
      component: "SelectPitType",
      texts: {
        header: "CS_FILE_PROPERTY_PIT_TYPE",
        cardText: "CS_FILE_PROPERTY_PIT_TYPE_TEXT",
        submitBarLabel: "CS_COMMON_NEXT",
        skipText: "CORE_COMMON_SKIP_CONTINUE"
      },
      nextStep: "tank-size"
    }, {
      label: "ES_NEW_APPLICATION_PIT_DIMENSION",
      isMandatory: false,
      type: "component",
      route: "tank-size",
      key: "pitDetail",
      component: "SelectTankSize",
      texts: {
        headerCaption: "",
        header: "CS_FILE_APPLICATION_PIT_SEPTIC_TANK_SIZE_TITLE",
        cardText: "CS_FILE_APPLICATION_PIT_SEPTIC_TANK_SIZE_TEXT",
        submitBarLabel: "CS_COMMON_NEXT"
      },
      nextStep: null
    }, {
      label: `${t("ES_NEW_APPLICATION_PAYMENT_NO_OF_TRIPS")} *`,
      type: "number",
      populators: {
        name: "noOfTrips",
        error: t("ES_NEW_APPLICATION_NO_OF_TRIPS_INVALID"),
        validation: {
          required: true
        },
        defaultValue: noOfTrips
      },
      disable: true
    }, module !== "FSM_ZERO_PAY_SERVICE" && {
      label: "FSM_PAYMENT_RECEIVED",
      isMandatory: true,
      type: "custom",
      populators: {
        name: "paymentMode",
        error: t("ES_NEW_APPLICATION_NO_OF_TRIPS_INVALID"),
        validation: {
          required: true
        },
        rules: {
          required: true
        },
        customProps: {
          isMandatory: true,
          options: receivedPaymentType,
          optionsKey: "i18nKey",
          innerStyles: {
            minWidth: "33%"
          }
        },
        component: (props, customProps) => /*#__PURE__*/React.createElement(RadioButtons, Object.assign({
          selectedOption: props.value,
          onSelect: d => {
            props.onChange(d);
          }
        }, customProps))
      }
    }]
  }]
});

function getFilteredDsoData$1(dsoData, vehicle, vehicleCapacity) {
  return dsoData === null || dsoData === void 0 ? void 0 : dsoData.filter(e => {
    var _e$vehicles;
    return (_e$vehicles = e.vehicles) === null || _e$vehicles === void 0 ? void 0 : _e$vehicles.find(veh => (veh === null || veh === void 0 ? void 0 : veh.capacity) == vehicleCapacity);
  });
}
const configReassignDSO = ({
  t,
  dsoData,
  dso,
  selectDSO,
  vehicleMenu,
  vehicle,
  vehicleCapacity,
  selectVehicle,
  reassignReasonMenu,
  reassignReason,
  selectReassignReason,
  action,
  showReassignReason
}) => ({
  label: {
    heading: `ES_FSM_ACTION_TITLE_${action}`,
    submit: `CS_COMMON_${action}`,
    cancel: "CS_COMMON_CLOSE"
  },
  form: [{
    body: [...(showReassignReason ? [{
      label: t("ES_FSM_ACTION_REASSIGN_REASON"),
      type: "dropdown",
      isMandatory: true,
      populators: /*#__PURE__*/React.createElement(Dropdown$2, {
        option: reassignReasonMenu,
        optionKey: "i18nKey",
        id: "reassign-reason",
        selected: reassignReason,
        select: selectReassignReason,
        t: t
      })
    }] : []), {
      label: t("ES_FSM_ACTION_DSO_NAME"),
      isMandatory: true,
      type: "dropdown",
      populators: /*#__PURE__*/React.createElement(React.Fragment, null, getFilteredDsoData$1(dsoData, vehicle, vehicleCapacity) && !getFilteredDsoData$1(dsoData, vehicle, vehicleCapacity).length ? /*#__PURE__*/React.createElement(CardLabelError, null, t("ES_COMMON_NO_DSO_AVAILABLE_WITH_SUCH_VEHICLE")) : null, /*#__PURE__*/React.createElement(Dropdown$2, {
        option: getFilteredDsoData$1(dsoData, vehicle, vehicleCapacity),
        autoComplete: "off",
        optionKey: "displayName",
        id: "dso",
        selected: dso,
        select: selectDSO
      }))
    }, {
      label: t("ES_FSM_ACTION_VEHICLE_CAPACITY_IN_LTRS"),
      type: "text",
      populators: {
        name: "capacity",
        validation: {
          required: true
        }
      },
      disable: true
    }, {
      label: t("ES_FSM_ACTION_SERVICE_DATE"),
      isMandatory: true,
      type: "custom",
      populators: {
        name: "date",
        validation: {
          required: true
        },
        customProps: {
          min: Digit.Utils.date.getDate()
        },
        defaultValue: Digit.Utils.date.getDate(),
        component: (props, customProps) => /*#__PURE__*/React.createElement(DatePicker$3, Object.assign({
          onChange: props.onChange,
          date: props.value
        }, customProps))
      }
    }]
  }]
});

const configRejectApplication = ({
  t,
  rejectMenu,
  setReason,
  reason,
  action
}) => {
  return {
    label: {
      heading: `ES_FSM_ACTION_TITLE_${action}`,
      submit: `CS_COMMON_${action}`,
      cancel: "CS_COMMON_CLOSE"
    },
    form: [{
      body: [{
        label: t(`ES_FSM_ACTION_${action.toUpperCase()}_REASON`),
        type: "dropdown",
        populators: /*#__PURE__*/React.createElement(Dropdown$2, {
          t: t,
          option: rejectMenu,
          id: "reason",
          optionKey: "i18nKey",
          selected: reason,
          select: setReason
        }),
        isMandatory: true
      }, {
        label: t("ES_FSM_ACTION_COMMENTS"),
        type: "textarea",
        populators: {
          name: "comments"
        }
      }]
    }]
  };
};

const configAcceptDso = ({
  t,
  dsoData,
  dso,
  selectVehicleNo,
  vehicleNoList,
  vehicleNo,
  vehicle,
  noOfTrips,
  action
}) => {
  return {
    label: {
      heading: `ES_FSM_ACTION_TITLE_${action}`,
      submit: `CS_COMMON_${action}`,
      cancel: "CS_COMMON_CLOSE"
    },
    form: [{
      body: [{
        label: t("ES_FSM_ACTION_VEHICLE_REGISTRATION_NO"),
        isMandatory: true,
        type: "dropdown",
        populators: /*#__PURE__*/React.createElement(React.Fragment, null, !(vehicleNoList !== null && vehicleNoList !== void 0 && vehicleNoList.length) ? /*#__PURE__*/React.createElement(CardLabelError, null, t("ES_FSM_NO_VEHICLE_AVAILABLE")) : null, /*#__PURE__*/React.createElement(Dropdown$2, {
          option: vehicleNoList,
          autoComplete: "off",
          optionKey: "registrationNumber",
          id: "vehicle",
          select: selectVehicleNo,
          selected: vehicleNo,
          disable: (vehicleNoList === null || vehicleNoList === void 0 ? void 0 : vehicleNoList.length) > 0 ? false : true
        }))
      }, {
        label: t("ES_FSM_ACTION_VEHICLE_CAPACITY_IN_LTRS"),
        isMandatory: true,
        type: "text",
        populators: {
          name: "capacity",
          validation: {
            required: true
          }
        },
        disable: true
      }, {
        label: t("ES_FSM_ACTION_NUMBER_OF_TRIPS"),
        isMandatory: true,
        type: "text",
        populators: {
          name: "noOfTrips",
          validation: {
            required: true
          },
          defaultValue: noOfTrips
        },
        disable: true
      }]
    }]
  };
};

const configScheduleDso = ({
  t,
  rejectMenu,
  setTrips,
  trips,
  applicationCreatedTime: _applicationCreatedTime = 0,
  vehicleCapacity,
  noOfTrips,
  action
}) => {
  return {
    label: {
      heading: `ES_FSM_ACTION_TITLE_${action}`,
      submit: `CS_COMMON_${action}`,
      cancel: "CS_COMMON_CLOSE"
    },
    form: [{
      body: [{
        label: t("ES_FSM_ACTION_DESLUDGING_ON"),
        isMandatory: true,
        type: "custom",
        populators: {
          name: "desluged",
          validation: {
            required: true
          },
          defaultValue: Digit.Utils.date.getDate(),
          customProps: {
            min: Digit.Utils.date.getDate(_applicationCreatedTime),
            max: Digit.Utils.date.getDate()
          },
          component: (props, customProps) => /*#__PURE__*/React.createElement(DatePicker$3, Object.assign({
            onChange: props.onChange,
            date: props.value
          }, customProps))
        }
      }, {
        label: t("ES_FSM_ACTION_WASTE_VOLUME_LABEL"),
        type: "number",
        isMandatory: true,
        disable: true,
        populators: {
          name: "wasteCollected",
          validation: {
            required: true,
            validate: value => parseInt(value) <= parseInt(vehicleCapacity)
          },
          error: `${t("ES_FSM_ACTION_INVALID_WASTE_VOLUME")} ${vehicleCapacity} ${t("CS_COMMON_LITRES")}`
        }
      }, {
        label: t("ES_NEW_APPLICATION_PAYMENT_NO_OF_TRIPS"),
        type: "number",
        populators: {
          name: "noOfTrips",
          error: t("ES_NEW_APPLICATION_NO_OF_TRIPS_INVALID"),
          validation: {
            required: true
          },
          defaultValue: noOfTrips
        }
      }]
    }]
  };
};

const configRejectFstpo = ({
  t,
  rejectMenu,
  selectReason,
  reason,
  action
}) => {
  return {
    label: {
      heading: `ES_FSM_ACTION_TITLE_${action}`,
      submit: `CS_COMMON_${action}`,
      cancel: "CS_COMMON_CLOSE"
    },
    form: [{
      body: [{
        label: t("ES_FSM_ACTION_DECLINE_REASON"),
        isMandatory: true,
        type: "dropdown",
        populators: /*#__PURE__*/React.createElement(Dropdown$2, {
          option: rejectMenu,
          autoComplete: "off",
          optionKey: "i18nKey",
          id: "Reason",
          select: selectReason,
          selected: reason,
          t: t
        })
      }, (reason === null || reason === void 0 ? void 0 : reason.code) === "OTHERS" ? {
        label: t("Comments"),
        isMandatory: true,
        type: "text",
        populators: {
          name: "comments",
          validation: {
            required: true
          }
        }
      } : {}]
    }]
  };
};

const PlusMinusInput = (props, customProps) => {
  let count = (props === null || props === void 0 ? void 0 : props.defaultValues) || 1;
  function incrementCount() {
    if (count >= 1) {
      count = count + 1;
      props.onSelect(count);
    } else {
      count = 1;
      props.onSelect(count);
    }
  }
  function decrementCount() {
    if (count > 1) {
      count = count - 1;
      props.onSelect(count);
    } else {
      count = 1;
      props.onSelect(count);
    }
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "PlusMinus"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => decrementCount(),
    className: "PlusMinusbutton"
  }, "-"), /*#__PURE__*/React.createElement("input", {
    readOnly: true,
    value: count,
    style: {
      textAlign: "center",
      border: "1px solid #505A5F"
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => incrementCount(),
    className: "PlusMinusbutton"
  }, "+")));
};

const configUpdateTrips = ({
  t,
  noOfTrips,
  action
}) => ({
  label: {
    heading: `ES_FSM_ACTION_TITLE_${action}`,
    submit: `CS_COMMON_${action}`,
    cancel: `CS_COMMON_CLOSE`
  },
  form: [{
    body: [{
      label: t("ES_FSM_ACTION_NUMBER_OF_TRIPS"),
      isMandatory: true,
      type: "custom",
      populators: {
        name: "noOfTrips",
        error: t("ES_NEW_APPLICATION_NO_OF_TRIPS_INVALID"),
        validation: {
          required: true
        },
        defaultValue: noOfTrips,
        rules: {
          required: true
        },
        customProps: {
          isMandatory: true,
          optionsKey: "i18nKey",
          innerStyles: {
            minWidth: "33%"
          }
        },
        component: (props, customProps) => /*#__PURE__*/React.createElement(PlusMinusInput, Object.assign({
          defaultValues: props.value
        }, customProps, {
          onSelect: d => {
            props.onChange(d);
          }
        }))
      }
    }]
  }]
});

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
    className: "icon-bg-secondary",
    onClick: props.onClick
  }, /*#__PURE__*/React.createElement(Close, null));
};
const popupActionBarStyles = {
  boxShadow: '0 -2px 8px rgb(0 0 0 / 16%)',
  maxWidth: '480px',
  zIndex: '100',
  left: '0',
  bottom: '0',
  width: '100%',
  backgroundColor: 'rgba(255, 255, 255)',
  padding: '8px',
  position: 'fixed',
  textAlign: 'right',
  display: 'flex',
  justifyContent: 'space-around'
};
const ActionModal = ({
  t,
  action,
  tenantId,
  state,
  id,
  closeModal,
  submitAction,
  actionData,
  module
}) => {
  const mobileView = Digit.Utils.browser.isMobile() ? true : false;
  const {
    data: dsoData,
    isLoading: isDsoLoading,
    isSuccess: isDsoSuccess,
    error: dsoError
  } = Digit.Hooks.fsm.useDsoSearch(tenantId, {
    limit: '-1',
    status: 'ACTIVE'
  });
  const {
    isLoading,
    isSuccess,
    isError,
    data: applicationData,
    error
  } = Digit.Hooks.fsm.useSearch(tenantId, {
    applicationNos: id
  }, {
    staleTime: Infinity,
    select: details => {
      let {
        additionalDetails
      } = details;
      const parseTillObject = str => {
        if (typeof str === "object") return str;else return parseTillObject(JSON.parse(str));
      };
      additionalDetails = parseTillObject(additionalDetails);
      return {
        ...details,
        additionalDetails
      };
    }
  });
  const client = useQueryClient();
  const stateCode = Digit.ULBService.getStateId();
  const {
    data: ReceivedPaymentTypeData,
    isLoading: receivedPaymentLoad
  } = Digit.Hooks.fsm.useMDMS(stateCode, "FSM", "ReceivedPaymentType");
  const {
    data: vehicleList,
    isLoading: isVehicleData,
    isSuccess: isVehicleDataLoaded
  } = Digit.Hooks.fsm.useMDMS(stateCode, "Vehicle", "VehicleType", {
    staleTime: Infinity
  });
  const {
    data: propertyList,
    isLoading: isPropertyData,
    isSuccess: isPropertyDataLoaded
  } = Digit.Hooks.fsm.useMDMS(stateCode, "FSM", "PropertyType", {
    staleTime: Infinity
  });
  const {
    data: propertySubList,
    isLoading: isPropertySubData,
    isSuccess: isPropertySubDataLoaded
  } = Digit.Hooks.fsm.useMDMS(stateCode, "FSM", "PropertySubtype", {
    staleTime: Infinity
  });
  const {
    data: pitList,
    isLoading: isPitData,
    isSuccess: isPitDataLoaded
  } = Digit.Hooks.fsm.useMDMS(stateCode, "FSM", "PitType", {
    staleTime: Infinity
  });
  const {
    data: Reason,
    isLoading: isReasonLoading
  } = Digit.Hooks.fsm.useMDMS(stateCode, "FSM", "Reason", {
    staleTime: Infinity
  }, ["ReassignReason", "RejectionReason", "DeclineReason", "CancelReason"]);
  const {
    data: FSTPORejectionReasons,
    isLoading: isFSTPORejectionReasonData
  } = Digit.Hooks.fsm.useMDMS(stateCode, "Vehicle", "FSTPORejectionReason", {
    staleTime: Infinity
  });
  const [dsoList, setDsoList] = useState([]);
  const [vehicleNoList, setVehicleNoList] = useState([]);
  const [config, setConfig] = useState({});
  const [dso, setDSO] = useState(null);
  const [vehicleNo, setVehicleNo] = useState(null);
  const [vehicleMenu, setVehicleMenu] = useState([]);
  const [vehicle, setVehicle] = useState(null);
  const [reassignReason, selectReassignReason] = useState(null);
  const [rejectionReason, setRejectionReason] = useState(null);
  const [declineReason, setDeclineReason] = useState(null);
  const [cancelReason, selectCancelReason] = useState(null);
  const [formValve, setFormValve] = useState(false);
  const [property, setProperty] = useState(null);
  const [propertyMenu, setPropertyMenu] = useState([]);
  const [propertySubType, setPropertySubType] = useState(null);
  const [pitType, setPitType] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [fileStoreId, setFileStoreId] = useState();
  const [pitDetail, setPitDetail] = useState();
  const [fstpoRejectionReason, setFstpoRejectionReason] = useState();
  const [noOfTrips, setNoOfTrips] = useState(null);
  const [receivedPaymentType, setReceivedPaymentType] = useState(null);
  const [defaultValues, setDefautValue] = useState({
    capacity: vehicle === null || vehicle === void 0 ? void 0 : vehicle.capacity,
    wasteCollected: vehicle === null || vehicle === void 0 ? void 0 : vehicle.capacity,
    propertyType: applicationData === null || applicationData === void 0 ? void 0 : applicationData.propertyUsage.split('.')[0],
    subtype: applicationData === null || applicationData === void 0 ? void 0 : applicationData.propertyUsage,
    pitType: applicationData === null || applicationData === void 0 ? void 0 : applicationData.sanitationtype,
    pitDetail: applicationData === null || applicationData === void 0 ? void 0 : applicationData.pitDetail
  });
  useEffect(() => {
    if (!receivedPaymentLoad) {
      setReceivedPaymentType(ReceivedPaymentTypeData);
    }
  }, [receivedPaymentLoad, ReceivedPaymentTypeData]);
  useEffect(() => {
    if (isSuccess && isVehicleDataLoaded && applicationData) {
      const [vehicle] = vehicleList.filter(item => item.code === applicationData.vehicleType);
      let arrayList = defaultValues;
      arrayList.capacity = applicationData === null || applicationData === void 0 ? void 0 : applicationData.vehicleCapacity;
      arrayList.wasteCollected = applicationData === null || applicationData === void 0 ? void 0 : applicationData.vehicleCapacity;
      setVehicleMenu([vehicle]);
      setVehicle(vehicle);
      setDefautValue(arrayList);
    }
  }, [isVehicleDataLoaded, isSuccess]);
  useEffect(() => {
    if (isSuccess && isPropertyDataLoaded && applicationData) {
      const [property] = propertyList.filter(item => item.code === applicationData.propertyUsage.split('.')[0]);
      let arrayList = defaultValues;
      arrayList.propertyType = property;
      setPropertyMenu([property]);
      setProperty(property);
      setDefautValue(arrayList);
    }
  }, [isPropertyDataLoaded, isSuccess]);
  useEffect(() => {
    if (isSuccess && isPropertySubDataLoaded && applicationData) {
      const [propertySub] = propertySubList.filter(item => item.code === applicationData.propertyUsage);
      let arrayList = defaultValues;
      arrayList.subtype = propertySub;
      setPropertySubType(propertySub);
      setDefautValue(arrayList);
    }
  }, [isPropertySubDataLoaded, isSuccess]);
  useEffect(() => {
    if (isSuccess && isPitDataLoaded && applicationData) {
      const [pitType] = pitList.filter(item => item.code === applicationData.sanitationtype);
      const pitDetail = applicationData.pitDetail;
      let arrayList = defaultValues;
      arrayList.pitType = pitType;
      arrayList.pitDetail = pitDetail;
      setPitType(pitType);
      setPitDetail(applicationData.pitDetail);
      setDefautValue(arrayList);
    }
  }, [isPitDataLoaded, isSuccess]);
  useEffect(() => {
    if (vehicle && isDsoSuccess) {
      const dsoList = dsoData.filter(dso => {
        var _dso$vehicles;
        return dso === null || dso === void 0 ? void 0 : (_dso$vehicles = dso.vehicles) === null || _dso$vehicles === void 0 ? void 0 : _dso$vehicles.find(dsoVehicle => dsoVehicle.type === vehicle.code);
      });
      setDsoList(dsoList);
    }
  }, [vehicle, isDsoSuccess]);
  useEffect(() => {
    if (isSuccess && isDsoSuccess && applicationData && applicationData.dsoId) {
      var _dso$vehicles2;
      const [dso] = dsoData.filter(dso => dso.id === applicationData.dsoId);
      const vehicleNoList = dso === null || dso === void 0 ? void 0 : (_dso$vehicles2 = dso.vehicles) === null || _dso$vehicles2 === void 0 ? void 0 : _dso$vehicles2.filter(vehicle => vehicle.capacity == (applicationData === null || applicationData === void 0 ? void 0 : applicationData.vehicleCapacity));
      setVehicleNoList(vehicleNoList);
    }
  }, [isSuccess, isDsoSuccess]);
  useEffect(() => {
    var _actionData$0$comment, _actionData$;
    reassignReason || actionData && actionData[0] && ((_actionData$0$comment = actionData[0].comment) === null || _actionData$0$comment === void 0 ? void 0 : _actionData$0$comment.length) > 0 && ((_actionData$ = actionData[0]) === null || _actionData$ === void 0 ? void 0 : _actionData$.status) === "DSO_REJECTED" ? setFormValve(true) : setFormValve(false);
  }, [reassignReason]);
  useEffect(() => {
    setFormValve(rejectionReason ? true : false);
  }, [rejectionReason]);
  useEffect(() => {
    setFormValve(declineReason ? true : false);
  }, [declineReason]);
  useEffect(() => {
    setFormValve(cancelReason ? true : false);
  }, [cancelReason]);
  function selectDSO(dsoDetails) {
    setDSO(dsoDetails);
  }
  function selectVehicleNo(vehicleNo) {
    setVehicleNo(vehicleNo);
  }
  function selectVehicle(value) {
    setVehicle(value);
    setDefautValue({
      capacity: value === null || value === void 0 ? void 0 : value.capacity,
      wasteCollected: value === null || value === void 0 ? void 0 : value.capacity
    });
  }
  function selectReason(reason) {
    setFstpoRejectionReason(reason);
  }
  function addCommentToWorkflow(state, workflow, data) {
    workflow.comments = data.comments ? state.code + "~" + data.comments : state.code;
  }
  const handleUpload = ids => {
    if (!fileStoreId || fileStoreId.length < 4) {
      setFileStoreId(ids);
    }
  };
  function submit(data) {
    const workflow = {
      action: action
    };
    if (dso) applicationData.dsoId = dso.id;
    if (vehicleNo && action === "ACCEPT") applicationData.vehicleId = vehicleNo.id;
    if (vehicleNo && action === "DSO_ACCEPT") applicationData.vehicleId = vehicleNo.id;
    if (vehicle && action === "ASSIGN") applicationData.vehicleType = vehicle.code;
    if (data.date) applicationData.possibleServiceDate = new Date(`${data.date}`).getTime();
    if (data.desluged) applicationData.completedOn = new Date(data.desluged).getTime();
    if (data.wasteCollected) applicationData.wasteCollected = data.wasteCollected;
    if (data.pitDetail) applicationData.pitDetail.height = Number(data.pitDetail.height);
    if (data.pitDetail) applicationData.pitDetail.width = Number(data.pitDetail.width);
    if (data.pitDetail) applicationData.pitDetail.diameter = Number(data.pitDetail.diameter);
    if (data.pitDetail) applicationData.pitDetail.length = Number(data.pitDetail.length);
    if (data.pitType) applicationData.sanitationtype = data.pitType.code;
    if (data.subtype && typeof data.subtype === "object") applicationData.propertyUsage = data.subtype.code;
    if (data.subtype && typeof data.subtype === "string") applicationData.propertyUsage = data.subtype;
    if (data.noOfTrips) applicationData.noOfTrips = data.noOfTrips;
    if (data.paymentMode) applicationData.additionalDetails.receivedPayment = data.paymentMode.code;
    if (fileStoreId) {
      if (applicationData.pitDetail.additionalDetails && applicationData.pitDetail.additionalDetails.fileStoreId) {
        applicationData.pitDetail.additionalDetails.fileStoreId = {
          ...applicationData.pitDetail.additionalDetails.fileStoreId,
          FSM_DSO: fileStoreId
        };
      } else {
        applicationData.pitDetail.additionalDetails = {
          fileStoreId: {
            FSM_DSO: fileStoreId
          }
        };
      }
    }
    if (data.noOfTrips) applicationData.noOfTrips = Number(data.noOfTrips);
    if (action === "REASSING") applicationData.vehicleId = null;
    if (reassignReason) addCommentToWorkflow(reassignReason, workflow, data);
    if (rejectionReason) addCommentToWorkflow(rejectionReason, workflow, data);
    if (declineReason) addCommentToWorkflow(declineReason, workflow, data);
    if (cancelReason) addCommentToWorkflow(cancelReason, workflow, data);
    if (fstpoRejectionReason && data.comments) workflow.comments = data.comments;
    if (fstpoRejectionReason) workflow.fstpoRejectionReason = fstpoRejectionReason === null || fstpoRejectionReason === void 0 ? void 0 : fstpoRejectionReason.code;
    submitAction({
      fsm: applicationData,
      workflow
    });
  }
  useEffect(() => {
    var _actionData$0$comment2, _actionData$2, _actionData$0$comment3, _actionData$3, _applicationData$audi, _applicationData$audi2;
    switch (action) {
      case "UPDATE":
        setFormValve(true);
        return setConfig(configUpdateTrips({
          t,
          noOfTrips: applicationData === null || applicationData === void 0 ? void 0 : applicationData.noOfTrips,
          action
        }));
      case "DSO_ACCEPT":
      case "ACCEPT":
        setFormValve(vehicleNo ? true : false);
        return setConfig(configAcceptDso({
          t,
          dsoData,
          dso,
          vehicle,
          vehicleCapacity: applicationData === null || applicationData === void 0 ? void 0 : applicationData.vehicleCapacity,
          noOfTrips: applicationData === null || applicationData === void 0 ? void 0 : applicationData.noOfTrips,
          vehicleNo,
          vehicleNoList,
          selectVehicleNo,
          action
        }));
      case "ASSIGN":
      case "GENERATE_DEMAND":
      case "FSM_GENERATE_DEMAND":
        setFormValve(dso ? true : false);
        return setConfig(configAssignDso({
          t,
          dsoData,
          dso,
          selectDSO,
          vehicleMenu,
          vehicle,
          vehicleCapacity: applicationData === null || applicationData === void 0 ? void 0 : applicationData.vehicleCapacity,
          selectVehicle,
          action
        }));
      case "REASSIGN":
      case "REASSING":
      case "FSM_REASSING":
        dso && (reassignReason || actionData && actionData[0] && ((_actionData$0$comment2 = actionData[0].comment) === null || _actionData$0$comment2 === void 0 ? void 0 : _actionData$0$comment2.length) > 0 && ((_actionData$2 = actionData[0]) === null || _actionData$2 === void 0 ? void 0 : _actionData$2.status) === "DSO_REJECTED") ? setFormValve(true) : setFormValve(false);
        return setConfig(configReassignDSO({
          t,
          dsoData,
          dso,
          selectDSO,
          vehicleMenu,
          vehicle,
          vehicleCapacity: applicationData === null || applicationData === void 0 ? void 0 : applicationData.vehicleCapacity,
          selectVehicle,
          reassignReasonMenu: Reason === null || Reason === void 0 ? void 0 : Reason.ReassignReason,
          reassignReason,
          selectReassignReason,
          action,
          showReassignReason: actionData && actionData[0] && ((_actionData$0$comment3 = actionData[0].comment) === null || _actionData$0$comment3 === void 0 ? void 0 : _actionData$0$comment3.length) > 0 && ((_actionData$3 = actionData[0]) === null || _actionData$3 === void 0 ? void 0 : _actionData$3.status) === "DSO_REJECTED" ? false : true
        }));
      case "COMPLETE":
      case "COMPLETED":
        setFormValve(true);
        return setConfig(configCompleteApplication({
          t,
          vehicle,
          vehicleCapacity: applicationData === null || applicationData === void 0 ? void 0 : applicationData.vehicleCapacity,
          noOfTrips: applicationData === null || applicationData === void 0 ? void 0 : applicationData.noOfTrips,
          applicationCreatedTime: applicationData === null || applicationData === void 0 ? void 0 : (_applicationData$audi = applicationData.auditDetails) === null || _applicationData$audi === void 0 ? void 0 : _applicationData$audi.createdTime,
          receivedPaymentType: ReceivedPaymentTypeData,
          action,
          module
        }));
      case "SUBMIT":
      case "FSM_SUBMIT":
        return history.push("/digit-ui/employee/fsm/modify-application/" + applicationNumber);
      case "DECLINE":
      case "DSO_REJECT":
        setFormValve(declineReason ? true : false);
        return setConfig(configRejectApplication({
          t,
          rejectMenu: Reason === null || Reason === void 0 ? void 0 : Reason.DeclineReason,
          setTrips: setNoOfTrips,
          trips: applicationData === null || applicationData === void 0 ? void 0 : applicationData.noOfTrips,
          setReason: setDeclineReason,
          action
        }));
      case "REJECT":
      case "SENDBACK":
        setFormValve(rejectionReason ? true : false);
        return setConfig(configRejectApplication({
          t,
          rejectMenu: Reason === null || Reason === void 0 ? void 0 : Reason.RejectionReason,
          setReason: setRejectionReason,
          reason: rejectionReason,
          action
        }));
      case "CANCEL":
        setFormValve(cancelReason ? true : false);
        return setConfig(configRejectApplication({
          t,
          rejectMenu: Reason === null || Reason === void 0 ? void 0 : Reason.CancelReason,
          setReason: selectCancelReason,
          reason: cancelReason,
          action
        }));
      case "SCHEDULE":
      case "ES_FSM_SCHEDULE":
        setFormValve(true);
        return setConfig(configScheduleDso({
          t,
          rejectMenu: Reason === null || Reason === void 0 ? void 0 : Reason.DeclineReason,
          setReason: setDeclineReason,
          reason: declineReason,
          applicationCreatedTime: applicationData === null || applicationData === void 0 ? void 0 : (_applicationData$audi2 = applicationData.auditDetails) === null || _applicationData$audi2 === void 0 ? void 0 : _applicationData$audi2.createdTime,
          vehicle,
          vehicleCapacity: applicationData === null || applicationData === void 0 ? void 0 : applicationData.vehicleCapacity,
          action,
          noOfTrips: applicationData === null || applicationData === void 0 ? void 0 : applicationData.noOfTrips
        }));
      case "PAY":
      case "ADDITIONAL_PAY_REQUEST":
      case "FSM_PAY":
        return history.push(`/digit-ui/employee/payment/collect/FSM.TRIP_CHARGES/${applicationNumber}`);
      case "DECLINEVEHICLE":
        setFormValve(fstpoRejectionReason ? true : false);
        return setConfig(configRejectFstpo({
          t,
          rejectMenu: FSTPORejectionReasons,
          selectReason,
          reason: fstpoRejectionReason,
          action
        }));
    }
  }, [action, reassignReason, isDsoLoading, dso, vehicleMenu, rejectionReason, vehicleNo, vehicleNoList, Reason, fstpoRejectionReason]);
  const hiddenFileInput = React.useRef(null);
  return action && config.form && !isDsoLoading && !isReasonLoading && isVehicleDataLoaded ? /*#__PURE__*/React.createElement(Modal, {
    popupStyles: mobileView ? {
      height: 'fit-content',
      minHeight: '100vh'
    } : {
      height: "fit-content"
    },
    headerBarMain: /*#__PURE__*/React.createElement(Heading, {
      label: t(config.label.heading)
    }),
    headerBarEnd: /*#__PURE__*/React.createElement(CloseBtn, {
      onClick: closeModal
    }),
    actionCancelLabel: t(config.label.cancel),
    actionCancelOnSubmit: closeModal,
    actionSaveLabel: t(config.label.submit),
    actionSaveOnSubmit: () => {},
    formId: "modal-action",
    isDisabled: !formValve,
    popupModuleMianStyles: mobileView ? {
      paddingBottom: '60px'
    } : {},
    popupModuleActionBarStyles: mobileView ? popupActionBarStyles : {}
  }, /*#__PURE__*/React.createElement(FormComposer, {
    config: config.form,
    noBoxShadow: true,
    inline: true,
    childrenAtTheBottom: true,
    onSubmit: submit,
    formId: "modal-action",
    defaultValues: defaultValues
  }), action === "COMPLETED" ? /*#__PURE__*/React.createElement(UploadPitPhoto, {
    header: "",
    tenantId: tenantId,
    cardText: "",
    onPhotoChange: handleUpload,
    uploadedImages: null
  }) : null) : /*#__PURE__*/React.createElement(Loader, null);
};

const ViewImages = props => {
  const [uploadedImagesThumbs, setUploadedImagesThumbs] = useState(null);
  const [uploadedImagesIds, setUploadedImagesIds] = useState(props.fileStoreIds);
  useEffect(() => {
    setUploadedImagesIds(props.fileStoreIds);
  }, [props.fileStoreIds]);
  useEffect(() => {
    (async () => {
      if (uploadedImagesIds !== null) {
        await submit();
      }
    })();
  }, [uploadedImagesIds]);
  function addImageThumbnails(thumbnailsData) {
    var keys = Object.keys(thumbnailsData.data);
    var index = keys.findIndex(key => key === "fileStoreIds");
    if (index > -1) {
      keys.splice(index, 1);
    }
    var thumbnails = [];
    const newThumbnails = keys.map(key => {
      return {
        image: thumbnailsData.data[key].split(",")[2],
        key,
        fullImage: Digit.Utils.getFileUrl(thumbnailsData.data[key])
      };
    });
    setUploadedImagesThumbs([...thumbnails, ...newThumbnails]);
  }
  const submit = useCallback(async () => {
    if (uploadedImagesIds !== null && uploadedImagesIds.length > 0) {
      const res = await Digit.UploadServices.Filefetch(uploadedImagesIds, props.tenantId);
      addImageThumbnails(res);
    }
  }, [uploadedImagesIds]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap'
    }
  }, uploadedImagesThumbs === null || uploadedImagesThumbs === void 0 ? void 0 : uploadedImagesThumbs.map((thumbnail, index) => {
    return /*#__PURE__*/React.createElement("div", {
      key: index,
      style: {
        minWidth: '160px',
        marginRight: '8px',
        marginBottom: '8px',
        maxWidth: '200px'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: thumbnail.image,
      alt: "uploaded thumbnail",
      onClick: () => props.onClick(thumbnail.fullImage, index)
    }));
  })));
};

const ApplicationDetails$1 = props => {
  var _applicationData$addi, _applicationData$pitD, _applicationData$pitD2, _applicationData$pitD3, _applicationData$pitD4, _applicationData$pitD5, _applicationData$pitD6, _applicationData$pitD7, _applicationData$pitD8, _applicationData$pitD9, _applicationData$pitD10, _applicationData$pitD11, _applicationData$pitD12, _applicationData$pitD13, _applicationData$pitD14, _workflowDetails$data, _workflowDetails$data2, _workflowDetails$data3, _workflowDetails$data4, _workflowDetails$data5, _workflowDetails$data6, _workflowDetails$data7, _workflowDetails$data8, _workflowDetails$data9, _workflowDetails$data10, _workflowDetails$data11, _workflowDetails$data12, _workflowDetails$data13, _workflowDetails$data15, _workflowDetails$data16, _workflowDetails$data17, _workflowDetails$data18;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const state = Digit.ULBService.getStateId();
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const queryClient = useQueryClient();
  let {
    id: applicationNumber
  } = useParams();
  const [displayMenu, setDisplayMenu] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [config, setCurrentConfig] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(null);
  const [imageZoom, setImageZoom] = useState(null);
  const DSO = Digit.UserService.hasAccess(["FSM_DSO"]) || false;
  const {
    isLoading,
    isError,
    data: applicationDetails,
    error
  } = Digit.Hooks.fsm.useApplicationDetail(t, tenantId, applicationNumber, {}, props.userType);
  const {
    isLoading: isDataLoading,
    isSuccess,
    data: applicationData
  } = Digit.Hooks.fsm.useSearch(tenantId, {
    applicationNos: applicationNumber
  }, {
    staleTime: Infinity
  });
  const {
    isLoading: updatingApplication,
    isError: updateApplicationError,
    data: updateResponse,
    error: updateError,
    mutate
  } = Digit.Hooks.fsm.useApplicationActions(tenantId);
  const workflowDetails = Digit.Hooks.useWorkflowDetails({
    tenantId: (applicationDetails === null || applicationDetails === void 0 ? void 0 : applicationDetails.tenantId) || tenantId,
    id: applicationNumber,
    moduleCode: (applicationData === null || applicationData === void 0 ? void 0 : applicationData.paymentPreference) === "POST_PAY" ? "FSM_POST_PAY_SERVICE" : (applicationData === null || applicationData === void 0 ? void 0 : applicationData.advanceAmount) === 0 ? "PAY_LATER_SERVICE" : (applicationData === null || applicationData === void 0 ? void 0 : applicationData.advanceAmount) > 0 ? "FSM_ADVANCE_PAY_SERVICE" : (applicationData === null || applicationData === void 0 ? void 0 : applicationData.paymentPreference) === null && (applicationData === null || applicationData === void 0 ? void 0 : (_applicationData$addi = applicationData.additionalDetails) === null || _applicationData$addi === void 0 ? void 0 : _applicationData$addi.tripAmount) === 0 && (applicationData === null || applicationData === void 0 ? void 0 : applicationData.advanceAmount) === null ? "FSM_ZERO_PAY_SERVICE" : "FSM",
    role: DSO ? "FSM_DSO" : "FSM_EMPLOYEE",
    serviceData: applicationDetails,
    getTripData: DSO ? false : true
  });
  useEffect(() => {
    if (showToast) {
      workflowDetails.revalidate();
    }
  }, [showToast]);
  function onActionSelect(action) {
    setSelectedAction(action);
    setDisplayMenu(false);
  }
  useEffect(() => {
    switch (selectedAction) {
      case DSO && "SCHEDULE":
      case "DSO_ACCEPT":
      case "ACCEPT":
      case "ASSIGN":
      case "GENERATE_DEMAND":
      case "FSM_GENERATE_DEMAND":
      case "REASSIGN":
      case "COMPLETE":
      case "COMPLETED":
      case "CANCEL":
      case "SENDBACK":
      case "DSO_REJECT":
      case "REJECT":
      case "DECLINE":
      case "REASSING":
      case "UPDATE":
        return setShowModal(true);
      case "SUBMIT":
      case "FSM_SUBMIT":
      case !DSO && "SCHEDULE":
        return history.push("/digit-ui/employee/fsm/modify-application/" + applicationNumber);
      case "PAY":
      case "FSM_PAY":
      case "ADDITIONAL_PAY_REQUEST":
        return history.push(`/digit-ui/employee/payment/collect/FSM.TRIP_CHARGES/${applicationNumber}?workflow=FSM`);
    }
  }, [selectedAction]);
  const closeModal = () => {
    setSelectedAction(null);
    setShowModal(false);
  };
  const closeToast = () => {
    setShowToast(null);
  };
  const submitAction = data => {
    mutate(data, {
      onError: (error, variables) => {
        setShowToast({
          key: "error",
          action: error
        });
        setTimeout(closeToast, 5000);
      },
      onSuccess: (data, variables) => {
        setShowToast({
          key: "success",
          action: selectedAction
        });
        setTimeout(closeToast, 5000);
        queryClient.invalidateQueries("FSM_CITIZEN_SEARCH");
        const inbox = queryClient.getQueryData("FUNCTION_RESET_INBOX");
        inbox === null || inbox === void 0 ? void 0 : inbox.revalidate();
      }
    });
    closeModal();
  };
  function zoomImageWrapper(imageSource, index) {
    setImageZoom(imageSource);
  }
  function onCloseImageZoom() {
    setImageZoom(null);
  }
  const getTimelineCaptions = checkpoint => {
    var _checkpoint$comment;
    const __comment = checkpoint === null || checkpoint === void 0 ? void 0 : (_checkpoint$comment = checkpoint.comment) === null || _checkpoint$comment === void 0 ? void 0 : _checkpoint$comment.split("~");
    const reason = __comment ? __comment[0] : null;
    const reason_comment = __comment ? __comment[1] : null;
    if (checkpoint.status === "CREATED") {
      var _checkpoint$auditDeta, _applicationData$citi;
      const caption = {
        date: checkpoint === null || checkpoint === void 0 ? void 0 : (_checkpoint$auditDeta = checkpoint.auditDetails) === null || _checkpoint$auditDeta === void 0 ? void 0 : _checkpoint$auditDeta.created,
        name: checkpoint === null || checkpoint === void 0 ? void 0 : checkpoint.assigner,
        mobileNumber: applicationData === null || applicationData === void 0 ? void 0 : (_applicationData$citi = applicationData.citizen) === null || _applicationData$citi === void 0 ? void 0 : _applicationData$citi.mobileNumber,
        source: (applicationData === null || applicationData === void 0 ? void 0 : applicationData.source) || ""
      };
      return /*#__PURE__*/React.createElement(TLCaption, {
        data: caption
      });
    } else if (checkpoint.status === "PENDING_APPL_FEE_PAYMENT" || checkpoint.status === "DSO_REJECTED" || checkpoint.status === "CANCELED" || checkpoint.status === "REJECTED") {
      var _checkpoint$auditDeta2;
      const caption = {
        date: checkpoint === null || checkpoint === void 0 ? void 0 : (_checkpoint$auditDeta2 = checkpoint.auditDetails) === null || _checkpoint$auditDeta2 === void 0 ? void 0 : _checkpoint$auditDeta2.created,
        name: checkpoint === null || checkpoint === void 0 ? void 0 : checkpoint.assigner,
        comment: reason ? t(`ES_ACTION_REASON_${reason}`) : null,
        otherComment: reason_comment ? reason_comment : null
      };
      return /*#__PURE__*/React.createElement(TLCaption, {
        data: caption
      });
    } else if (checkpoint.status === "DSO_INPROGRESS") {
      var _checkpoint$assigner;
      const caption = {
        name: checkpoint === null || checkpoint === void 0 ? void 0 : checkpoint.assigner,
        mobileNumber: checkpoint === null || checkpoint === void 0 ? void 0 : (_checkpoint$assigner = checkpoint.assigner) === null || _checkpoint$assigner === void 0 ? void 0 : _checkpoint$assigner.mobileNumber,
        date: `${t("CS_FSM_EXPECTED_DATE")} ${Digit.DateUtils.ConvertTimestampToDate(applicationData === null || applicationData === void 0 ? void 0 : applicationData.possibleServiceDate)}`
      };
      return /*#__PURE__*/React.createElement(TLCaption, {
        data: caption
      });
    } else if (checkpoint.status === "COMPLETED") {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Rating, {
        withText: true,
        text: t(`ES_FSM_YOU_RATED`),
        currentRating: checkpoint.rating
      }), /*#__PURE__*/React.createElement(Link, {
        to: `/digit-ui/employee/fsm/rate-view/${applicationNumber}`
      }, /*#__PURE__*/React.createElement(ActionLinks, null, t("CS_FSM_RATE_VIEW"))));
    } else if (checkpoint.status === "WAITING_FOR_DISPOSAL" || checkpoint.status === "DISPOSAL_IN_PROGRESS" || checkpoint.status === "DISPOSED" || checkpoint.status === "CITIZEN_FEEDBACK_PENDING") {
      var _checkpoint$auditDeta3, _checkpoint$assigner2;
      const caption = {
        date: checkpoint === null || checkpoint === void 0 ? void 0 : (_checkpoint$auditDeta3 = checkpoint.auditDetails) === null || _checkpoint$auditDeta3 === void 0 ? void 0 : _checkpoint$auditDeta3.created,
        name: checkpoint === null || checkpoint === void 0 ? void 0 : checkpoint.assigner,
        mobileNumber: checkpoint === null || checkpoint === void 0 ? void 0 : (_checkpoint$assigner2 = checkpoint.assigner) === null || _checkpoint$assigner2 === void 0 ? void 0 : _checkpoint$assigner2.mobileNumber
      };
      if (checkpoint !== null && checkpoint !== void 0 && checkpoint.numberOfTrips) caption.comment = `${t("NUMBER_OF_TRIPS")}: ${checkpoint === null || checkpoint === void 0 ? void 0 : checkpoint.numberOfTrips}`;
      return /*#__PURE__*/React.createElement(TLCaption, {
        data: caption
      });
    }
  };
  if (isLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, !isLoading ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Header, {
    style: {
      marginBottom: "16px"
    }
  }, t("ES_TITLE_APPLICATION_DETAILS")), /*#__PURE__*/React.createElement(Card, {
    className: "fsm",
    style: {
      position: "relative"
    }
  }, applicationDetails === null || applicationDetails === void 0 ? void 0 : applicationDetails.applicationDetails.map((detail, index) => {
    var _detail$values;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: index
    }, index === 0 ? null :
    /*#__PURE__*/
    React.createElement(CardSectionHeader, {
      style: {
        marginBottom: "16px",
        marginTop: "32px"
      }
    }, t(detail.title)), /*#__PURE__*/React.createElement(StatusTable, null, detail === null || detail === void 0 ? void 0 : (_detail$values = detail.values) === null || _detail$values === void 0 ? void 0 : _detail$values.map((value, index) => {
      var _detail$values2;
      if (value === null) return;
      if (value.map === true && value.value !== "N/A") {
        return /*#__PURE__*/React.createElement(Row, {
          key: t(value.title),
          label: t(value.title),
          text: /*#__PURE__*/React.createElement("img", {
            src: t(value.value),
            alt: ""
          })
        });
      }
      return /*#__PURE__*/React.createElement(Row, {
        key: t(value.title),
        label: t(value.title),
        text: t(value.value) || "N/A",
        last: index === (detail === null || detail === void 0 ? void 0 : (_detail$values2 = detail.values) === null || _detail$values2 === void 0 ? void 0 : _detail$values2.length) - 1,
        caption: value.caption,
        className: "border-none"
      });
    })));
  }), (applicationData === null || applicationData === void 0 ? void 0 : (_applicationData$pitD = applicationData.pitDetail) === null || _applicationData$pitD === void 0 ? void 0 : (_applicationData$pitD2 = _applicationData$pitD.additionalDetails) === null || _applicationData$pitD2 === void 0 ? void 0 : (_applicationData$pitD3 = _applicationData$pitD2.fileStoreId) === null || _applicationData$pitD3 === void 0 ? void 0 : (_applicationData$pitD4 = _applicationData$pitD3.CITIZEN) === null || _applicationData$pitD4 === void 0 ? void 0 : _applicationData$pitD4.length) && /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(CardSectionHeader, {
    style: {
      marginBottom: "16px",
      marginTop: "32px"
    }
  }, t("ES_FSM_SUB_HEADING_CITIZEN_UPLOADS")), /*#__PURE__*/React.createElement(ViewImages, {
    fileStoreIds: applicationData === null || applicationData === void 0 ? void 0 : (_applicationData$pitD5 = applicationData.pitDetail) === null || _applicationData$pitD5 === void 0 ? void 0 : (_applicationData$pitD6 = _applicationData$pitD5.additionalDetails) === null || _applicationData$pitD6 === void 0 ? void 0 : (_applicationData$pitD7 = _applicationData$pitD6.fileStoreId) === null || _applicationData$pitD7 === void 0 ? void 0 : _applicationData$pitD7.CITIZEN,
    tenantId: state,
    onClick: (source, index) => zoomImageWrapper(source)
  })), (applicationData === null || applicationData === void 0 ? void 0 : (_applicationData$pitD8 = applicationData.pitDetail) === null || _applicationData$pitD8 === void 0 ? void 0 : (_applicationData$pitD9 = _applicationData$pitD8.additionalDetails) === null || _applicationData$pitD9 === void 0 ? void 0 : (_applicationData$pitD10 = _applicationData$pitD9.fileStoreId) === null || _applicationData$pitD10 === void 0 ? void 0 : (_applicationData$pitD11 = _applicationData$pitD10.FSM_DSO) === null || _applicationData$pitD11 === void 0 ? void 0 : _applicationData$pitD11.length) && /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(CardSectionHeader, {
    style: {
      marginBottom: "16px",
      marginTop: "32px"
    }
  }, t("ES_FSM_SUB_HEADING_DSO_UPLOADS")), /*#__PURE__*/React.createElement(ViewImages, {
    fileStoreIds: applicationData === null || applicationData === void 0 ? void 0 : (_applicationData$pitD12 = applicationData.pitDetail) === null || _applicationData$pitD12 === void 0 ? void 0 : (_applicationData$pitD13 = _applicationData$pitD12.additionalDetails) === null || _applicationData$pitD13 === void 0 ? void 0 : (_applicationData$pitD14 = _applicationData$pitD13.fileStoreId) === null || _applicationData$pitD14 === void 0 ? void 0 : _applicationData$pitD14.FSM_DSO,
    tenantId: tenantId,
    onClick: (source, index) => zoomImageWrapper(source)
  })), imageZoom ? /*#__PURE__*/React.createElement(ImageViewer, {
    imageSrc: imageZoom,
    onClose: onCloseImageZoom
  }) : null, /*#__PURE__*/React.createElement(BreakLine, null), ((workflowDetails === null || workflowDetails === void 0 ? void 0 : workflowDetails.isLoading) || isDataLoading) && /*#__PURE__*/React.createElement(Loader, null), !(workflowDetails !== null && workflowDetails !== void 0 && workflowDetails.isLoading) && !isDataLoading && /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(CardSectionHeader, {
    style: {
      marginBottom: "16px",
      marginTop: "32px"
    }
  }, t("ES_APPLICATION_DETAILS_APPLICATION_TIMELINE")), workflowDetails !== null && workflowDetails !== void 0 && (_workflowDetails$data = workflowDetails.data) !== null && _workflowDetails$data !== void 0 && _workflowDetails$data.timeline && (workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data2 = workflowDetails.data) === null || _workflowDetails$data2 === void 0 ? void 0 : (_workflowDetails$data3 = _workflowDetails$data2.timeline) === null || _workflowDetails$data3 === void 0 ? void 0 : _workflowDetails$data3.length) === 1 ? /*#__PURE__*/React.createElement(CheckPoint, {
    isCompleted: true,
    label: t("CS_COMMON_" + (workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data4 = workflowDetails.data) === null || _workflowDetails$data4 === void 0 ? void 0 : (_workflowDetails$data5 = _workflowDetails$data4.timeline[0]) === null || _workflowDetails$data5 === void 0 ? void 0 : _workflowDetails$data5.status)),
    customChild: getTimelineCaptions(workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data6 = workflowDetails.data) === null || _workflowDetails$data6 === void 0 ? void 0 : _workflowDetails$data6.timeline[0])
  }) : /*#__PURE__*/React.createElement(ConnectingCheckPoints, null, (workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data7 = workflowDetails.data) === null || _workflowDetails$data7 === void 0 ? void 0 : _workflowDetails$data7.timeline) && (workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data8 = workflowDetails.data) === null || _workflowDetails$data8 === void 0 ? void 0 : _workflowDetails$data8.timeline.map((checkpoint, index, arr) => {
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: index
    }, /*#__PURE__*/React.createElement(CheckPoint, {
      keyValue: index,
      isCompleted: index === 0,
      label: t("CS_COMMON_FSM_" + `${checkpoint.performedAction === "UPDATE" ? "UPDATE_" : ""}` + checkpoint.status),
      customChild: getTimelineCaptions(checkpoint)
    }));
  }))))), showModal ? /*#__PURE__*/React.createElement(ActionModal, {
    t: t,
    action: selectedAction,
    tenantId: tenantId,
    state: state,
    id: applicationNumber,
    closeModal: closeModal,
    submitAction: submitAction,
    actionData: workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data9 = workflowDetails.data) === null || _workflowDetails$data9 === void 0 ? void 0 : _workflowDetails$data9.timeline,
    module: workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data10 = workflowDetails.data) === null || _workflowDetails$data10 === void 0 ? void 0 : _workflowDetails$data10.applicationBusinessService
  }) : null, showToast && /*#__PURE__*/React.createElement(Toast, {
    error: showToast.key === "error" ? true : false,
    label: t(showToast.key === "success" ? `ES_FSM_${showToast.action}_UPDATE_SUCCESS` : showToast.action),
    onClose: closeToast
  }), !(workflowDetails !== null && workflowDetails !== void 0 && workflowDetails.isLoading) && (workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data11 = workflowDetails.data) === null || _workflowDetails$data11 === void 0 ? void 0 : (_workflowDetails$data12 = _workflowDetails$data11.nextActions) === null || _workflowDetails$data12 === void 0 ? void 0 : _workflowDetails$data12.length) === 1 && /*#__PURE__*/React.createElement(ActionBar, {
    style: {
      zIndex: "19"
    }
  }, /*#__PURE__*/React.createElement(SubmitBar, {
    label: t(`ES_FSM_${workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data13 = workflowDetails.data) === null || _workflowDetails$data13 === void 0 ? void 0 : _workflowDetails$data13.nextActions[0].action}`),
    onSubmit: () => {
      var _workflowDetails$data14;
      return onActionSelect(workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data14 = workflowDetails.data) === null || _workflowDetails$data14 === void 0 ? void 0 : _workflowDetails$data14.nextActions[0].action);
    }
  })), !(workflowDetails !== null && workflowDetails !== void 0 && workflowDetails.isLoading) && (workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data15 = workflowDetails.data) === null || _workflowDetails$data15 === void 0 ? void 0 : (_workflowDetails$data16 = _workflowDetails$data15.nextActions) === null || _workflowDetails$data16 === void 0 ? void 0 : _workflowDetails$data16.length) > 1 && /*#__PURE__*/React.createElement(ActionBar, {
    style: {
      zIndex: "19"
    }
  }, displayMenu && workflowDetails !== null && workflowDetails !== void 0 && (_workflowDetails$data17 = workflowDetails.data) !== null && _workflowDetails$data17 !== void 0 && _workflowDetails$data17.nextActions ? /*#__PURE__*/React.createElement(Menu, {
    localeKeyPrefix: "ES_FSM",
    options: workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data18 = workflowDetails.data) === null || _workflowDetails$data18 === void 0 ? void 0 : _workflowDetails$data18.nextActions.map(action => action.action),
    t: t,
    onSelect: onActionSelect
  }) : null, /*#__PURE__*/React.createElement(SubmitBar, {
    label: t("ES_COMMON_TAKE_ACTION"),
    onSubmit: () => setDisplayMenu(!displayMenu)
  }))) : /*#__PURE__*/React.createElement(Loader, null));
};

const DsoDashboard = () => {
  var _inbox$statuses$filte5, _inbox$statuses$filte6;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const {
    t
  } = useTranslation();
  const [total, setTotal] = useState("-");
  const [loader, setLoader] = useState(true);
  const [isDsoLoaded, setIsDsoLoaded] = useState(false);
  const filters = {
    limit: 10,
    offset: 0,
    uuid: {
      code: "ASSIGNED_TO_ME",
      name: t("ES_INBOX_ASSIGNED_TO_ME")
    },
    sortBy: "createdTime",
    sortOrder: "DESC",
    total: true
  };
  const {
    data: vendorDetails,
    isFetching: vendorDetailsFetching
  } = Digit.Hooks.fsm.useVendorDetail();
  useEffect(() => {
    if (vendorDetails !== null && vendorDetails !== void 0 && vendorDetails.vendor) {
      const {
        vendor
      } = vendorDetails;
      Digit.UserService.setExtraRoleDetails(vendor[0]);
      setIsDsoLoaded(true);
    }
  }, [vendorDetails]);
  const {
    data: inbox,
    isFetching: inboxFetching
  } = Digit.Hooks.fsm.useInbox(tenantId, {
    ...filters
  }, {
    enabled: isDsoLoaded
  }, true);
  const info = useMemo(() => {
    var _inbox$statuses$filte, _inbox$statuses$filte2;
    return {
      [t("ES_COMPLETION_PENDING")]: (inbox === null || inbox === void 0 ? void 0 : (_inbox$statuses$filte = inbox.statuses.filter(e => e.applicationstatus === "DSO_INPROGRESS")[0]) === null || _inbox$statuses$filte === void 0 ? void 0 : _inbox$statuses$filte.count) || 0,
      [t("ES_VEHICLE_ASSIGNMENT_PENDING")]: (inbox === null || inbox === void 0 ? void 0 : (_inbox$statuses$filte2 = inbox.statuses.filter(e => e.applicationstatus === "PENDING_DSO_APPROVAL")[0]) === null || _inbox$statuses$filte2 === void 0 ? void 0 : _inbox$statuses$filte2.count) || 0
    };
  }, [inbox === null || inbox === void 0 ? void 0 : inbox.totalCount]);
  const links = useMemo(() => [{
    link: "/digit-ui/citizen/fsm/inbox",
    label: t("ES_TITLE_INBOX"),
    count: total
  }], [total]);
  useEffect(() => {
    if (inbox) {
      var _inbox$statuses$filte3, _inbox$statuses$filte4;
      const total = (inbox === null || inbox === void 0 ? void 0 : (_inbox$statuses$filte3 = inbox.statuses.filter(e => e.applicationstatus === "DSO_INPROGRESS")[0]) === null || _inbox$statuses$filte3 === void 0 ? void 0 : _inbox$statuses$filte3.count) + (inbox === null || inbox === void 0 ? void 0 : (_inbox$statuses$filte4 = inbox.statuses.filter(e => e.applicationstatus === "PENDING_DSO_APPROVAL")[0]) === null || _inbox$statuses$filte4 === void 0 ? void 0 : _inbox$statuses$filte4.count);
      setTotal(total);
      if (Object.keys(info).length) setLoader(false);
    }
  }, [info, inbox]);
  if (loader) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  const propsForModuleCard = {
    Icon: /*#__PURE__*/React.createElement(ShippingTruck, null),
    moduleName: t("ES_TITLE_FAECAL_SLUDGE_MGMT"),
    kpis: [{
      count: (inbox === null || inbox === void 0 ? void 0 : (_inbox$statuses$filte5 = inbox.statuses.filter(e => e.applicationstatus === "DSO_INPROGRESS")[0]) === null || _inbox$statuses$filte5 === void 0 ? void 0 : _inbox$statuses$filte5.count) || 0,
      label: t("ES_COMPLETION_PENDING"),
      link: `/digit-ui/citizen/fsm/inbox`
    }, {
      count: (inbox === null || inbox === void 0 ? void 0 : (_inbox$statuses$filte6 = inbox.statuses.filter(e => e.applicationstatus === "PENDING_DSO_APPROVAL")[0]) === null || _inbox$statuses$filte6 === void 0 ? void 0 : _inbox$statuses$filte6.count) || 0,
      label: t("ES_VEHICLE_ASSIGNMENT_PENDING"),
      link: `/digit-ui/citizen/fsm/inbox`
    }],
    links
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "ground-container moduleCardWrapper"
  }, /*#__PURE__*/React.createElement(EmployeeModuleCard, propsForModuleCard));
};

const isConventionalSpecticTank$1 = tankDimension => tankDimension === "lbd";
const EditForm = ({
  tenantId,
  applicationData,
  channelMenu,
  vehicleMenu,
  sanitationMenu
}) => {
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const [canSubmit, setSubmitValve] = useState(false);
  const stateId = Digit.ULBService.getStateId();
  const {
    data: commonFields,
    isLoading
  } = Digit.Hooks.fsm.useMDMS(stateId, "FSM", "CommonFieldsConfig");
  const {
    data: preFields,
    isLoading: isApplicantConfigLoading
  } = Digit.Hooks.fsm.useMDMS(stateId, "FSM", "PreFieldsConfig");
  const {
    data: postFields,
    isLoading: isTripConfigLoading
  } = Digit.Hooks.fsm.useMDMS(stateId, "FSM", "PostFieldsConfig");
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("FSM_MUTATION_HAPPENED", false);
  const [errorInfo, setErrorInfo, clearError] = Digit.Hooks.useSessionStorage("FSM_ERROR_DATA", false);
  const [successData, setsuccessData, clearSuccessData] = Digit.Hooks.useSessionStorage("FSM_MUTATION_SUCCESS_DATA", false);
  useEffect(() => {
    setMutationHappened(false);
    clearSuccessData();
    clearError();
  }, []);
  const defaultValues = {
    channel: channelMenu.filter(channel => channel.code === applicationData.source)[0],
    applicationData: {
      applicantName: applicationData.citizen.name,
      mobileNumber: applicationData.citizen.mobileNumber,
      applicantGender: applicationData.citizen.gender
    },
    tripData: {
      noOfTrips: applicationData.noOfTrips,
      amountPerTrip: applicationData.additionalDetails.tripAmount,
      amount: applicationData.noOfTrips * applicationData.additionalDetails.tripAmount || undefined,
      vehicleType: {
        capacity: applicationData === null || applicationData === void 0 ? void 0 : applicationData.vehicleCapacity
      },
      vehicleCapacity: applicationData === null || applicationData === void 0 ? void 0 : applicationData.vehicleCapacity
    },
    propertyType: applicationData.propertyUsage.split(".")[0],
    subtype: applicationData.propertyUsage,
    address: {
      pincode: applicationData.address.pincode,
      locality: {
        ...applicationData.address.locality,
        i18nkey: `${applicationData.tenantId.toUpperCase().split(".").join("_")}_REVENUE_${applicationData.address.locality.code}`
      },
      slum: applicationData.address.slumName,
      street: applicationData.address.street,
      doorNo: applicationData.address.doorNo,
      landmark: applicationData.address.landmark
    },
    pitType: sanitationMenu.filter(type => type.code === applicationData.sanitationtype)[0],
    pitDetail: applicationData.pitDetail,
    paymentPreference: applicationData.paymentPreference,
    advancepaymentPreference: {
      advanceAmount: applicationData === null || applicationData === void 0 ? void 0 : applicationData.advanceAmount
    }
  };
  const onFormValueChange = (setValue, formData) => {
    var _formData$address, _formData$address$loc, _formData$tripData, _formData$tripData2, _formData$tripData3;
    if (formData !== null && formData !== void 0 && formData.propertyType && formData !== null && formData !== void 0 && formData.subtype && formData !== null && formData !== void 0 && (_formData$address = formData.address) !== null && _formData$address !== void 0 && (_formData$address$loc = _formData$address.locality) !== null && _formData$address$loc !== void 0 && _formData$address$loc.code && formData !== null && formData !== void 0 && (_formData$tripData = formData.tripData) !== null && _formData$tripData !== void 0 && _formData$tripData.vehicleType && (formData !== null && formData !== void 0 && (_formData$tripData2 = formData.tripData) !== null && _formData$tripData2 !== void 0 && _formData$tripData2.amountPerTrip || (formData === null || formData === void 0 ? void 0 : (_formData$tripData3 = formData.tripData) === null || _formData$tripData3 === void 0 ? void 0 : _formData$tripData3.amountPerTrip) === 0)) {
      var _formData$tripData4, _formData$advancepaym, _formData$tripData5, _formData$advancepaym2, _formData$advancepaym3;
      setSubmitValve(true);
      const pitDetailValues = formData !== null && formData !== void 0 && formData.pitDetail ? Object.values(formData === null || formData === void 0 ? void 0 : formData.pitDetail).filter(value => value > 0) : null;
      let min = Digit.SessionStorage.get("advance_amount");
      if (formData !== null && formData !== void 0 && formData.pitType) {
        var _formData$pitType, _formData$pitType2;
        if (pitDetailValues === null || (pitDetailValues === null || pitDetailValues === void 0 ? void 0 : pitDetailValues.length) === 0) {
          setSubmitValve(true);
        } else if (isConventionalSpecticTank$1(formData === null || formData === void 0 ? void 0 : (_formData$pitType = formData.pitType) === null || _formData$pitType === void 0 ? void 0 : _formData$pitType.dimension) && (pitDetailValues === null || pitDetailValues === void 0 ? void 0 : pitDetailValues.length) >= 3) {
          setSubmitValve(true);
        } else if (!isConventionalSpecticTank$1(formData === null || formData === void 0 ? void 0 : (_formData$pitType2 = formData.pitType) === null || _formData$pitType2 === void 0 ? void 0 : _formData$pitType2.dimension) && (pitDetailValues === null || pitDetailValues === void 0 ? void 0 : pitDetailValues.length) >= 2) {
          setSubmitValve(true);
        } else setSubmitValve(false);
      }
      if ((formData === null || formData === void 0 ? void 0 : (_formData$tripData4 = formData.tripData) === null || _formData$tripData4 === void 0 ? void 0 : _formData$tripData4.amountPerTrip) !== 0 && ((formData === null || formData === void 0 ? void 0 : (_formData$advancepaym = formData.advancepaymentPreference) === null || _formData$advancepaym === void 0 ? void 0 : _formData$advancepaym.advanceAmount) > (formData === null || formData === void 0 ? void 0 : (_formData$tripData5 = formData.tripData) === null || _formData$tripData5 === void 0 ? void 0 : _formData$tripData5.amount) || (formData === null || formData === void 0 ? void 0 : (_formData$advancepaym2 = formData.advancepaymentPreference) === null || _formData$advancepaym2 === void 0 ? void 0 : _formData$advancepaym2.advanceAmount) < min)) {
        setSubmitValve(false);
      }
      if ((applicationData === null || applicationData === void 0 ? void 0 : applicationData.advanceAmount) > 0 && (formData === null || formData === void 0 ? void 0 : (_formData$advancepaym3 = formData.advancepaymentPreference) === null || _formData$advancepaym3 === void 0 ? void 0 : _formData$advancepaym3.advanceAmount) <= 0) {
        setSubmitValve(false);
      }
    } else {
      setSubmitValve(false);
    }
  };
  const onSubmit = data => {
    var _data$pitType, _data$address, _data$address2, _data$address2$street, _data$address3, _data$address3$doorNo, _data$address4, _data$address5, _data$address5$landma, _data$address6, _data$address6$city, _data$address8, _data$address8$locali, _data$address9, _data$address9$locali, _data$advancepaymentP, _data$tripData, _data$tripData$vehicl, _data$address10, _data$address11, _data$address12, _data$address13;
    const applicationChannel = data.channel;
    const sanitationtype = data === null || data === void 0 ? void 0 : (_data$pitType = data.pitType) === null || _data$pitType === void 0 ? void 0 : _data$pitType.code;
    const pitDimension = data === null || data === void 0 ? void 0 : data.pitDetail;
    const pincode = data === null || data === void 0 ? void 0 : (_data$address = data.address) === null || _data$address === void 0 ? void 0 : _data$address.pincode;
    const street = data === null || data === void 0 ? void 0 : (_data$address2 = data.address) === null || _data$address2 === void 0 ? void 0 : (_data$address2$street = _data$address2.street) === null || _data$address2$street === void 0 ? void 0 : _data$address2$street.trim();
    const doorNo = data === null || data === void 0 ? void 0 : (_data$address3 = data.address) === null || _data$address3 === void 0 ? void 0 : (_data$address3$doorNo = _data$address3.doorNo) === null || _data$address3$doorNo === void 0 ? void 0 : _data$address3$doorNo.trim();
    const slum = data === null || data === void 0 ? void 0 : (_data$address4 = data.address) === null || _data$address4 === void 0 ? void 0 : _data$address4.slum;
    const landmark = data === null || data === void 0 ? void 0 : (_data$address5 = data.address) === null || _data$address5 === void 0 ? void 0 : (_data$address5$landma = _data$address5.landmark) === null || _data$address5$landma === void 0 ? void 0 : _data$address5$landma.trim();
    const noOfTrips = data.tripData.noOfTrips;
    const amount = data.tripData.amountPerTrip;
    const cityCode = data === null || data === void 0 ? void 0 : (_data$address6 = data.address) === null || _data$address6 === void 0 ? void 0 : (_data$address6$city = _data$address6.city) === null || _data$address6$city === void 0 ? void 0 : _data$address6$city.code;
    const localityCode = data === null || data === void 0 ? void 0 : (_data$address8 = data.address) === null || _data$address8 === void 0 ? void 0 : (_data$address8$locali = _data$address8.locality) === null || _data$address8$locali === void 0 ? void 0 : _data$address8$locali.code;
    const localityName = data === null || data === void 0 ? void 0 : (_data$address9 = data.address) === null || _data$address9 === void 0 ? void 0 : (_data$address9$locali = _data$address9.locality) === null || _data$address9$locali === void 0 ? void 0 : _data$address9$locali.name;
    const propertyUsage = data === null || data === void 0 ? void 0 : data.subtype;
    const advanceAmount = amount === 0 ? null : data === null || data === void 0 ? void 0 : (_data$advancepaymentP = data.advancepaymentPreference) === null || _data$advancepaymentP === void 0 ? void 0 : _data$advancepaymentP.advanceAmount;
    const {
      height,
      length,
      width,
      diameter
    } = pitDimension;
    const formData = {
      ...applicationData,
      sanitationtype: sanitationtype,
      source: applicationChannel.code,
      additionalDetails: {
        ...applicationData.additionalDetails,
        tripAmount: amount
      },
      propertyUsage,
      vehicleType: data.tripData.vehicleType.type,
      vehicleCapacity: data === null || data === void 0 ? void 0 : (_data$tripData = data.tripData) === null || _data$tripData === void 0 ? void 0 : (_data$tripData$vehicl = _data$tripData.vehicleType) === null || _data$tripData$vehicl === void 0 ? void 0 : _data$tripData$vehicl.capacity,
      noOfTrips,
      pitDetail: {
        ...applicationData.pitDetail,
        distanceFromRoad: data.distanceFromRoad,
        height,
        length,
        width,
        diameter
      },
      address: {
        ...applicationData.address,
        tenantId: cityCode,
        landmark,
        doorNo,
        street,
        pincode,
        slumName: slum,
        locality: {
          ...applicationData.address.locality,
          code: localityCode,
          name: localityName
        },
        geoLocation: {
          ...applicationData.address.geoLocation,
          latitude: data !== null && data !== void 0 && (_data$address10 = data.address) !== null && _data$address10 !== void 0 && _data$address10.latitude ? data === null || data === void 0 ? void 0 : (_data$address11 = data.address) === null || _data$address11 === void 0 ? void 0 : _data$address11.latitude : applicationData.address.geoLocation.latitude,
          longitude: data !== null && data !== void 0 && (_data$address12 = data.address) !== null && _data$address12 !== void 0 && _data$address12.longitude ? data === null || data === void 0 ? void 0 : (_data$address13 = data.address) === null || _data$address13 === void 0 ? void 0 : _data$address13.longitude : applicationData.address.geoLocation.longitude
        }
      },
      advanceAmount
    };
    delete formData["responseInfo"];
    window.Digit.SessionStorage.set("propertyType", null);
    window.Digit.SessionStorage.set("subType", null);
    Digit.SessionStorage.set("city_property", null);
    Digit.SessionStorage.set("selected_localities", null);
    Digit.SessionStorage.set("locality_property", null);
    history.replace("/digit-ui/employee/fsm/response", {
      applicationData: formData,
      key: "update",
      action: (applicationData === null || applicationData === void 0 ? void 0 : applicationData.applicationStatus) === "CREATED" ? "SUBMIT" : "SCHEDULE"
    });
  };
  if (isLoading || isTripConfigLoading || isApplicantConfigLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  const configs = [...preFields, ...commonFields];
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "15px"
    }
  }, /*#__PURE__*/React.createElement(Header, null, t("ES_TITLE_MODIFY_DESULDGING_APPLICATION"))), /*#__PURE__*/React.createElement(FormComposer, {
    isDisabled: !canSubmit,
    label: (applicationData === null || applicationData === void 0 ? void 0 : applicationData.applicationStatus) != "CREATED" ? t("ES_FSM_APPLICATION_SCHEDULE") : t("ES_FSM_APPLICATION_UPDATE"),
    config: configs.filter(i => !i.hideInEmployee).map(config => {
      return {
        ...config,
        body: config.body.filter(a => !a.hideInEmployee)
      };
    }),
    fieldStyle: {
      marginRight: 0
    },
    formCardStyle: true,
    onSubmit: onSubmit,
    defaultValues: defaultValues,
    onFormValueChange: onFormValueChange,
    noBreakLine: true,
    fms_inline: true
  }));
};

const EditApplication = ({
  parentUrl,
  heading
}) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const state = Digit.ULBService.getStateId();
  let {
    id: applicationNumber
  } = useParams();
  const userInfo = Digit.UserService.getUser();
  const {
    isLoading: applicationLoading,
    isError,
    data: applicationData,
    error
  } = Digit.Hooks.fsm.useSearch(tenantId, {
    applicationNos: applicationNumber,
    uuid: userInfo.uuid
  }, {
    staleTime: Infinity
  });
  const {
    isLoading: isVehicleMenuLoading,
    data: vehicleMenu
  } = Digit.Hooks.fsm.useMDMS(state, "Vehicle", "VehicleType", {
    staleTime: Infinity
  });
  const {
    isLoading: isChannelMenuLoading,
    data: channelMenu
  } = Digit.Hooks.fsm.useMDMS(tenantId, "FSM", "ApplicationChannel");
  const {
    data: sanitationMenu,
    isLoading: sanitationTypeloading
  } = Digit.Hooks.fsm.useMDMS(state, "FSM", "PitType");
  return applicationData && !applicationLoading && vehicleMenu && !isVehicleMenuLoading && channelMenu && !isChannelMenuLoading && !sanitationTypeloading && sanitationMenu ? /*#__PURE__*/React.createElement(EditForm, {
    applicationData: applicationData,
    vehicleMenu: vehicleMenu,
    channelMenu: channelMenu,
    sanitationMenu: sanitationMenu,
    tenantId: tenantId
  }) : null;
};

const config$1 = {
  select: response => {
    return {
      totalCount: response === null || response === void 0 ? void 0 : response.totalCount,
      vehicleLog: response === null || response === void 0 ? void 0 : response.vehicleTrip.map(trip => {
        const owner = trip.tripOwner;
        const displayName = owner.name + (owner.userName ? `- ${owner.userName}` : "");
        const tripOwner = {
          ...owner,
          displayName
        };
        return {
          ...trip,
          tripOwner
        };
      })
    };
  }
};
const FstpInbox = () => {
  var _searchParams$registr, _sortParams$, _sortParams$2, _searchParams$name, _searchParams$refernc, _searchParams$registr2, _vehicles$vehicle, _vehicles$vehicle$, _searchParams$name2, _dsoData$;
  const {
    t
  } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [searchParams, setSearchParams] = useState({
    applicationStatus: "WAITING_FOR_DISPOSAL"
  });
  const [sortParams, setSortParams] = useState([{
    id: "createdTime",
    desc: true
  }]);
  const [pageOffset, setPageOffset] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const {
    isLoading: isVehiclesLoading,
    data: vehicles
  } = Digit.Hooks.fsm.useVehiclesSearch({
    tenantId,
    filters: {
      registrationNumber: searchParams === null || searchParams === void 0 ? void 0 : searchParams.registrationNumber
    },
    config: {
      enabled: (searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$registr = searchParams.registrationNumber) === null || _searchParams$registr === void 0 ? void 0 : _searchParams$registr.length) > 0
    }
  });
  const userInfo = Digit.UserService.getUser();
  let isMobile = window.Digit.Utils.browser.isMobile();
  let paginationParams = isMobile ? {
    limit: 100,
    offset: 0,
    sortOrder: sortParams !== null && sortParams !== void 0 && (_sortParams$ = sortParams[0]) !== null && _sortParams$ !== void 0 && _sortParams$.desc ? "DESC" : "ASC"
  } : {
    limit: pageSize,
    offset: pageOffset,
    sortOrder: sortParams !== null && sortParams !== void 0 && (_sortParams$2 = sortParams[0]) !== null && _sortParams$2 !== void 0 && _sortParams$2.desc ? "DESC" : "ASC"
  };
  const {
    isLoading: applicationLoading,
    isError,
    data: applicationData,
    error
  } = Digit.Hooks.fsm.useSearch(tenantId, {
    applicationNos: searchParams === null || searchParams === void 0 ? void 0 : searchParams.refernceNos,
    uuid: userInfo.uuid
  }, {
    staleTime: Infinity
  });
  const {
    data: dsoData,
    isLoading: isDsoLoading,
    isSuccess: isDsoSuccess,
    error: dsoError
  } = Digit.Hooks.fsm.useDsoSearch(tenantId, {
    name: searchParams === null || searchParams === void 0 ? void 0 : searchParams.name,
    status: "ACTIVE"
  }, {
    enabled: (searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$name = searchParams.name) === null || _searchParams$name === void 0 ? void 0 : _searchParams$name.length) > 1
  });
  let filters = {
    businessService: "FSM_VEHICLE_TRIP",
    refernceNos: applicationData !== undefined && (searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$refernc = searchParams.refernceNos) === null || _searchParams$refernc === void 0 ? void 0 : _searchParams$refernc.length) > 0 ? (applicationData === null || applicationData === void 0 ? void 0 : applicationData.applicationNo) || "null" : "",
    vehicleIds: vehicles !== undefined && (searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$registr2 = searchParams.registrationNumber) === null || _searchParams$registr2 === void 0 ? void 0 : _searchParams$registr2.length) > 0 ? (vehicles === null || vehicles === void 0 ? void 0 : (_vehicles$vehicle = vehicles.vehicle) === null || _vehicles$vehicle === void 0 ? void 0 : (_vehicles$vehicle$ = _vehicles$vehicle[0]) === null || _vehicles$vehicle$ === void 0 ? void 0 : _vehicles$vehicle$.id) || "null" : "",
    tripOwnerIds: dsoData !== undefined && (searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$name2 = searchParams.name) === null || _searchParams$name2 === void 0 ? void 0 : _searchParams$name2.length) > 0 ? (dsoData === null || dsoData === void 0 ? void 0 : (_dsoData$ = dsoData[0]) === null || _dsoData$ === void 0 ? void 0 : _dsoData$.ownerId) || "null" : "",
    applicationStatus: searchParams === null || searchParams === void 0 ? void 0 : searchParams.applicationStatus,
    ...paginationParams
  };
  if (applicationData == undefined) {
    filters = {
      responseInfo: {
        apiId: "Rainmaker",
        ver: null,
        ts: null,
        resMsgId: "uief87324",
        msgId: "1645827148736|en_IN",
        status: "successful"
      },
      vehicle: [],
      totalCount: 0
    };
  }
  const {
    isLoading,
    data: {
      totalCount,
      vehicleLog
    } = {},
    isSuccess
  } = Digit.Hooks.fsm.useVehicleSearch({
    tenantId,
    filters,
    config: config$1,
    options: {
      searchWithDSO: true
    }
  });
  const onSearch = (params = {}) => {
    setSearchParams({
      applicationStatus: "WAITING_FOR_DISPOSAL",
      ...params
    });
  };
  const fetchNextPage = () => {
    setPageOffset(prevState => prevState + pageSize);
  };
  const fetchPrevPage = () => {
    setPageOffset(prevState => prevState - pageSize);
  };
  const handlePageSizeChange = e => {
    setPageSize(Number(e.target.value));
  };
  const handleFilterChange = () => {};
  const searchFields = [{
    label: t("ES_SEARCH_APPLICATION_APPLICATION_NO"),
    name: "refernceNos"
  }, {
    label: t("ES_FSTP_OPERATOR_VEHICLE_NO"),
    name: "registrationNumber"
  }, {
    label: t("ES_FSTP_DSO_NAME"),
    name: "name"
  }];
  const handleSort = useCallback(args => {
    if ((args === null || args === void 0 ? void 0 : args.length) === 0) return;
    setSortParams(args);
  }, []);
  if (isMobile) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Header, null, t("ES_COMMON_INBOX")), /*#__PURE__*/React.createElement(MobileInbox, {
      onFilterChange: handleFilterChange,
      vehicleLog: vehicleLog,
      isLoading: isLoading,
      userRole: "FSM_EMP_FSTPO",
      linkPrefix: "/digit-ui/employee/fsm/fstp-operator-details/",
      onSearch: onSearch,
      searchFields: searchFields,
      onSort: handleSort,
      sortParams: sortParams
    }));
  } else {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: "20px"
      }
    }, /*#__PURE__*/React.createElement(Header, null, t("ES_COMMON_INBOX"))), /*#__PURE__*/React.createElement(DesktopInbox, {
      data: {
        table: vehicleLog
      },
      isLoading: isLoading,
      onSort: handleSort,
      disableSort: false,
      sortParams: sortParams,
      userRole: "FSM_EMP_FSTPO",
      onFilterChange: handleFilterChange,
      searchFields: searchFields,
      onSearch: onSearch,
      onNextPage: fetchNextPage,
      onPrevPage: fetchPrevPage,
      currentPage: Math.floor(pageOffset / pageSize),
      pageSizeLimit: pageSize,
      onPageSizeChange: handlePageSizeChange,
      totalRecords: totalCount || 0
    }));
  }
};

const CustomTimePicker = ({
  name,
  value,
  onChange
}) => {
  const onBlurHandle = () => {
    const time = value === null || value === void 0 ? void 0 : value.split(':');
    const min = time === null || time === void 0 ? void 0 : time[1];
    onChange(value);
    let minInputs = document.getElementsByClassName('react-time-picker__inputGroup__minute');
    for (let mItem of minInputs) {
      let mValue = mItem.value;
      mItem.value = Number(mValue) < 60 ? mValue : min;
    }
  };
  return /*#__PURE__*/React.createElement(TimePicker, {
    name: name,
    onChange: onChange,
    onBlur: onBlurHandle,
    value: value,
    locale: "en-US",
    disableClock: false,
    clearIcon: null,
    format: "h:mm a"
  });
};

const config$2 = {
  select: data => {
    return data.vehicleTrip[0];
  }
};
const totalconfig = {
  select: data => {
    return data.vehicleTrip;
  }
};
const FstpOperatorDetails = () => {
  var _vehicle$vehicle2, _vehicle$tripOwner, _tripDetails$3, _tripDetails$3$addres, _tripDetails$3$addres2, _workflowDetails$data, _workflowDetails$data2, _workflowDetails$data3, _workflowDetails$data4, _workflowDetails$data5, _workflowDetails$data6, _workflowDetails$data7, _workflowDetails$data11, _workflowDetails$data12, _workflowDetails$data13;
  const stateId = Digit.ULBService.getStateId();
  let isMobile = window.Digit.Utils.browser.isMobile();
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const queryClient = useQueryClient();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const state = Digit.ULBService.getStateId();
  let {
    id: applicationNos
  } = useParams();
  const [filters, setFilters] = useState(applicationNos != undefined ? {
    applicationNos
  } : {
    applicationNos: "null"
  });
  const [isVehicleSearchCompleted, setIsVehicleSearchCompleted] = useState(false);
  const [searchParams, setSearchParams] = useState({});
  const [showToast, setShowToast] = useState(null);
  const [wasteCollected, setWasteCollected] = useState(null);
  const [errors, setErrors] = useState({});
  const [tripStartTime, setTripStartTime] = useState(null);
  const [tripTime, setTripTime] = useState(() => {
    const today = new Date();
    const hour = (today.getHours() < 10 ? "0" : "") + today.getHours();
    const minutes = (today.getMinutes() < 10 ? "0" : "") + today.getMinutes();
    return `${hour}:${minutes}`;
  });
  const [displayMenu, setDisplayMenu] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tripNo, setTripNo] = useState();
  const [appId, setAppId] = useState();
  const [filterVehicle, setFilterVehicle] = useState();
  const [currentTrip, setCurrentTrip] = useState();
  const wasteRecievedRef = useRef();
  const tripStartTimeRef = useRef();
  const tripTimeRef = useRef();
  const [fileStoreId, setFileStoreId] = useState();
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(Array);
  const [error, setError] = useState(null);
  const [newVehicleNumber, setNewVehicleNumber] = useState(applicationNos);
  const [newLocality, setNewLocality] = useState(null);
  const [newDsoName, setNewDsoName] = useState(null);
  const [comments, setComments] = useState();
  const location = useLocation();
  const onChangeVehicleNumber = value => {
    setNewVehicleNumber(value);
  };
  const onChangeDsoName = value => {
    setNewDsoName(value);
  };
  const onChangeLocality = value => {
    setNewLocality(value);
  };
  const {
    isLoading: totalload,
    isSuccess: totalsuccess,
    data: totalvehicle
  } = Digit.Hooks.fsm.useVehicleSearch({
    tenantId,
    totalconfig
  });
  const {
    isLoading,
    isSuccess,
    data: vehicle
  } = Digit.Hooks.fsm.useVehicleSearch({
    tenantId,
    filters,
    config: config$2
  });
  const {
    isLoading: isSearchLoading,
    isIdle,
    data: {
      data: {
        table: tripDetails
      } = {}
    } = {}
  } = Digit.Hooks.fsm.useSearchAll(tenantId, searchParams, null, {
    enabled: !!isVehicleSearchCompleted
  });
  useEffect(() => {
    (filterVehicle === null || filterVehicle === void 0 ? void 0 : filterVehicle.length) == 0 ? setCurrentTrip(1) : setCurrentTrip(tripNo - (filterVehicle === null || filterVehicle === void 0 ? void 0 : filterVehicle.length) + 1);
  }, [tripNo, filterVehicle, totalvehicle, totalsuccess, isSuccess]);
  const workflowDetails = Digit.Hooks.useWorkflowDetails({
    tenantId: tenantId,
    id: location.pathname.includes("fstp-operator-details") ? applicationNos : null,
    moduleCode: "FSM_VEHICLE_TRIP",
    role: "FSM_EMP_FSTPO"
  });
  const mutation = Digit.Hooks.fsm.useVehicleUpdate(tenantId);
  const create_mutation = Digit.Hooks.fsm.useVehicleTripCreate(tenantId);
  useEffect(() => {
    if (isSuccess) {
      var _vehicle$vehicle, _vehicle$tripDetails;
      setWasteCollected(vehicle === null || vehicle === void 0 ? void 0 : (_vehicle$vehicle = vehicle.vehicle) === null || _vehicle$vehicle === void 0 ? void 0 : _vehicle$vehicle.tankCapacity);
      const applicationNos = vehicle === null || vehicle === void 0 ? void 0 : (_vehicle$tripDetails = vehicle.tripDetails) === null || _vehicle$tripDetails === void 0 ? void 0 : _vehicle$tripDetails.map(tripData => tripData.referenceNo).join(",");
      setSearchParams(applicationNos ? {
        applicationNos
      } : {
        applicationNos: "null"
      });
      setIsVehicleSearchCompleted(true);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (!isIdle && !isSearchLoading && tripDetails) {
      var _tripDetails$, _tripDetails$2;
      setTripNo((_tripDetails$ = tripDetails[0]) === null || _tripDetails$ === void 0 ? void 0 : _tripDetails$.noOfTrips);
      setAppId((_tripDetails$2 = tripDetails[0]) === null || _tripDetails$2 === void 0 ? void 0 : _tripDetails$2.applicationNo);
    }
  }, [isSearchLoading, isIdle, tripDetails]);
  useEffect(() => {
    switch (selectedAction) {
      case "DECLINEVEHICLE":
        return setShowModal(true);
      case "DISPOSE":
      case "READY_FOR_DISPOSAL":
        setSelectedAction(null);
        history.location.pathname.includes("new") ? handleCreate() : handleSubmit();
      default:
        setSelectedAction();
        console.debug("default case");
        break;
    }
  }, [selectedAction]);
  useEffect(() => {
    if (totalsuccess) {
      var _totalvehicle$vehicle;
      const temp = totalvehicle === null || totalvehicle === void 0 ? void 0 : (_totalvehicle$vehicle = totalvehicle.vehicleTrip) === null || _totalvehicle$vehicle === void 0 ? void 0 : _totalvehicle$vehicle.filter((c, i, r) => {
        var _c$tripDetails$;
        return (c === null || c === void 0 ? void 0 : (_c$tripDetails$ = c.tripDetails[0]) === null || _c$tripDetails$ === void 0 ? void 0 : _c$tripDetails$.referenceNo) === appId && (c === null || c === void 0 ? void 0 : c.applicationStatus) === "WAITING_FOR_DISPOSAL";
      });
      setFilterVehicle(temp);
    }
  }, [totalsuccess, totalvehicle, isSuccess, isIdle, appId]);
  const handleSubmit = () => {
    const wasteCombined = tripDetails.reduce((acc, trip) => acc + trip.volume, 0);
    if (applicationNos && (!wasteCollected || wasteCollected > wasteCombined || wasteCollected > vehicle.vehicle.tankCapacity)) {
      setErrors({
        wasteRecieved: "ES_FSTP_INVALID_WASTE_AMOUNT"
      });
      wasteRecievedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
      return;
    }
    if (tripStartTime === null) {
      setErrors({
        tripStartTime: "ES_FSTP_INVALID_START_TIME"
      });
      tripStartTimeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
      return;
    }
    if (tripTime === null) {
      setErrors({
        tripTime: "ES_FSTP_INVALID_TRIP_TIME"
      });
      tripTimeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
      return;
    }
    if (tripStartTime === tripTime || tripStartTime > tripTime) {
      setErrors({
        tripTime: "ES_FSTP_INVALID_TRIP_TIME"
      });
      tripTimeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
      return;
    }
    setErrors({});
    const d = new Date();
    const timeStamp = Date.parse(new Date(d.toString().split(":")[0].slice(0, -2) + tripTime)) / 1000;
    const tripStartTimestamp = Date.parse(new Date(d.toString().split(":")[0].slice(0, -2) + tripStartTime)) / 1000;
    const tripDetail = {
      tripNo: currentTrip
    };
    vehicle.tripStartTime = tripStartTimestamp;
    vehicle.fstpEntryTime = tripStartTimestamp;
    vehicle.tripEndTime = timeStamp;
    vehicle.fstpExitTime = timeStamp;
    vehicle.volumeCarried = wasteCollected;
    vehicle.tripDetails[0].additionalDetails = tripDetail;
    vehicle.additionalDetails = {
      fileStoreId: uploadedFile,
      comments: comments
    };
    const details = {
      vehicleTrip: [vehicle],
      workflow: {
        action: "DISPOSE"
      }
    };
    mutation.mutate(details, {
      onSuccess: handleSuccess,
      onError: handleError
    });
  };
  const handleCreate = () => {
    var _newDsoName$trim, _newLocality$trim, _wasteCollected$trim;
    const re = new RegExp("^[A-Z]{2}\\s{1}[0-9]{2}\\s{0,1}[A-Z]{1,2}\\s{1}[0-9]{4}$");
    if (!re.test(newVehicleNumber)) {
      setShowToast({
        key: "error",
        action: `ES_FSM_VEHICLE_FORMAT_TIP`
      });
      setTimeout(() => {
        closeToast();
      }, 5000);
      return;
    }
    if (newDsoName === null || (newDsoName === null || newDsoName === void 0 ? void 0 : (_newDsoName$trim = newDsoName.trim()) === null || _newDsoName$trim === void 0 ? void 0 : _newDsoName$trim.length) === 0) {
      setShowToast({
        key: "error",
        action: `ES_FSTP_INVALID_DSO_NAME`
      });
      setTimeout(() => {
        closeToast();
      }, 2000);
      return;
    }
    if (newLocality === null || (newLocality === null || newLocality === void 0 ? void 0 : (_newLocality$trim = newLocality.trim()) === null || _newLocality$trim === void 0 ? void 0 : _newLocality$trim.length) === 0) {
      setShowToast({
        key: "error",
        action: `ES_FSTP_INVALID_LOCALITY`
      });
      setTimeout(() => {
        closeToast();
      }, 2000);
      return;
    }
    if (tripStartTime === null) {
      setErrors({
        tripStartTime: "ES_FSTP_INVALID_START_TIME"
      });
      tripStartTimeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
      return;
    }
    if (!wasteCollected || (wasteCollected === null || wasteCollected === void 0 ? void 0 : (_wasteCollected$trim = wasteCollected.trim()) === null || _wasteCollected$trim === void 0 ? void 0 : _wasteCollected$trim.length) === 0) {
      setShowToast({
        key: "error",
        action: `ES_FSTP_INVALID_WASTE_AMOUNT`
      });
      setTimeout(() => {
        closeToast();
      }, 2000);
      return;
    }
    if (tripTime === null) {
      setErrors({
        tripTime: "ES_FSTP_INVALID_TRIP_TIME"
      });
      tripTimeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
      return;
    }
    if (tripStartTime === tripTime || tripStartTime > tripTime) {
      setErrors({
        tripTime: "ES_FSTP_INVALID_TRIP_TIME"
      });
      tripTimeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
      return;
    }
    setErrors({});
    let temp = {};
    const d = new Date();
    const timeStamp = Date.parse(new Date(d.toString().split(":")[0].slice(0, -2) + tripTime)) / 1000;
    const tripStartTimestamp = Date.parse(new Date(d.toString().split(":")[0].slice(0, -2) + tripStartTime)) / 1000;
    temp.tenantId = tenantId;
    temp.status = "ACTIVE";
    temp.tripStartTime = tripStartTimestamp;
    temp.tripEndTime = timeStamp;
    temp.volumeCarried = wasteCollected;
    temp.additionalDetails = {
      vehicleNumber: newVehicleNumber || applicationNos,
      dsoName: newDsoName,
      locality: newLocality,
      fileStoreId: uploadedFile,
      comments: comments
    };
    temp.businessService = "FSM_VEHICLE_TRIP";
    temp.tripDetails = [{
      tenantId: tenantId,
      status: "ACTIVE"
    }];
    const details = {
      vehicleTrip: [temp]
    };
    create_mutation.mutate(details, {
      onSuccess: handleSuccess,
      onError: handleError
    });
  };
  const handleDecline = data => {
    var _data$workflow, _data$workflow2;
    vehicle.additionalDetails = {
      comments: data === null || data === void 0 ? void 0 : (_data$workflow = data.workflow) === null || _data$workflow === void 0 ? void 0 : _data$workflow.comments,
      vehicleDeclineReason: data === null || data === void 0 ? void 0 : (_data$workflow2 = data.workflow) === null || _data$workflow2 === void 0 ? void 0 : _data$workflow2.fstpoRejectionReason
    };
    const details = {
      vehicleTrip: [vehicle],
      workflow: {
        action: "DECLINEVEHICLE"
      }
    };
    mutation.mutate(details, {
      onSuccess: handleSuccess,
      onError: handleError
    });
  };
  const closeToast = () => {
    setShowToast(null);
  };
  const handleSuccess = () => {
    if (selectedAction === "DECLINEVEHICLE") {
      setShowModal(false);
    }
    queryClient.invalidateQueries("FSM_VEHICLE_DATA");
    setShowToast({
      key: "success",
      action: `ES_FSM_DISPOSE_UPDATE_SUCCESS`
    });
    setTimeout(() => {
      closeToast();
      history.push(`/digit-ui/employee/fsm/fstp-operations`);
    }, 5000);
  };
  const handleError = () => {
    if (selectedAction === "DECLINEVEHICLE") {
      setShowModal(false);
      setSelectedAction(null);
    }
    queryClient.invalidateQueries("FSM_VEHICLE_DATA");
    setShowToast({
      key: "error",
      action: `ES_FSM_DISPOSE_UPDATE_FAILURE`
    });
    setTimeout(() => {
      closeToast();
    }, 5000);
  };
  const handleChange = event => {
    const {
      name,
      value
    } = event.target;
    if (name === "tripTime") {
      setTripTime(value);
    } else if (name === "wasteRecieved") {
      setWasteCollected(value);
    }
  };
  if (isLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  const vehicleData = [{
    title: `${t("ES_INBOX_VEHICLE_NO")} *`,
    value: (vehicle === null || vehicle === void 0 ? void 0 : (_vehicle$vehicle2 = vehicle.vehicle) === null || _vehicle$vehicle2 === void 0 ? void 0 : _vehicle$vehicle2.registrationNumber) || applicationNos || /*#__PURE__*/React.createElement(TextInput, {
      onChange: e => onChangeVehicleNumber(e.target.value),
      value: newVehicleNumber
    })
  }, {
    title: `${t("ES_INBOX_DSO_NAME")} *`,
    value: (vehicle === null || vehicle === void 0 ? void 0 : (_vehicle$tripOwner = vehicle.tripOwner) === null || _vehicle$tripOwner === void 0 ? void 0 : _vehicle$tripOwner.name) || /*#__PURE__*/React.createElement(TextInput, {
      onChange: e => onChangeDsoName(e.target.value),
      value: newDsoName
    })
  }, {
    title: `${t("ES_INBOX_LOCALITY")} *`,
    value: tripDetails && ((_tripDetails$3 = tripDetails[0]) === null || _tripDetails$3 === void 0 ? void 0 : (_tripDetails$3$addres = _tripDetails$3.address) === null || _tripDetails$3$addres === void 0 ? void 0 : (_tripDetails$3$addres2 = _tripDetails$3$addres.locality) === null || _tripDetails$3$addres2 === void 0 ? void 0 : _tripDetails$3$addres2.name) || /*#__PURE__*/React.createElement(TextInput, {
      onChange: e => onChangeLocality(e.target.value),
      value: newLocality
    })
  }];
  const handleTimeChange = (value, cb) => {
    if (typeof value === "string") {
      cb(value);
    }
  };
  function onActionSelect(action) {
    setSelectedAction(action);
    setDisplayMenu(false);
  }
  const closeModal = () => {
    setSelectedAction(null);
    setShowModal(false);
  };
  function selectfile(e) {
    if (e) {
      var _e$fileStoreId;
      let temp = [...uploadedFile, e === null || e === void 0 ? void 0 : (_e$fileStoreId = e.fileStoreId) === null || _e$fileStoreId === void 0 ? void 0 : _e$fileStoreId.fileStoreId];
      setUploadedFile(temp);
      e && setFile(e.file);
    }
  }
  const getData = state => {
    let data = Object.fromEntries(state);
    let newArr = Object.values(data);
    selectfile(newArr[newArr.length - 1]);
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Header, {
    styles: {
      marginLeft: "16px"
    }
  }, t("ES_INBOX_VEHICLE_LOG")), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(StatusTable, null, vehicleData === null || vehicleData === void 0 ? void 0 : vehicleData.map((row, index) => /*#__PURE__*/React.createElement(Row, {
    rowContainerStyle: isMobile && history.location.pathname.includes("new-vehicle-entry") ? {
      display: "block"
    } : {
      justifyContent: "space-between"
    },
    textStyle: isMobile && history.location.pathname.includes("new-vehicle-entry") ? {
      width: "100%"
    } : {},
    key: row.title,
    label: row.title,
    text: row.value || "N/A",
    last: false,
    labelStyle: {
      fontWeight: "normal"
    }
  })), /*#__PURE__*/React.createElement("div", {
    ref: tripStartTimeRef
  }, /*#__PURE__*/React.createElement(CardLabelError, null, t(errors.tripStartTime))), /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement(Row, {
    key: t("ES_VEHICLE_IN_TIME"),
    label: `${t("ES_VEHICLE_IN_TIME")} * `,
    labelStyle: {
      minWidth: "fit-content",
      fontWeight: "normal"
    },
    textStyle: isMobile ? {
      width: "100%"
    } : {},
    rowContainerStyle: isMobile ? {
      display: "block"
    } : {
      justifyContent: "space-between"
    },
    text: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CustomTimePicker, {
      name: "tripStartTime",
      onChange: val => handleTimeChange(val, setTripStartTime),
      value: tripStartTime
    }))
  }), /*#__PURE__*/React.createElement("div", {
    ref: wasteRecievedRef
  }, /*#__PURE__*/React.createElement(CardLabelError, null, t(errors.wasteRecieved))), /*#__PURE__*/React.createElement(Row, {
    key: t("ES_VEHICLE_SEPTAGE_DUMPED"),
    label: `${t("ES_VEHICLE_SEPTAGE_DUMPED")} * `,
    labelStyle: {
      minWidth: "fit-content",
      fontWeight: "normal"
    },
    textStyle: isMobile ? {
      width: "100%"
    } : {},
    text: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TextInput, {
      type: "number",
      name: "wasteRecieved",
      value: wasteCollected,
      onChange: handleChange
    })),
    rowContainerStyle: isMobile ? {
      display: "block"
    } : {
      justifyContent: "space-between"
    }
  }), /*#__PURE__*/React.createElement("div", {
    ref: tripTimeRef
  }, /*#__PURE__*/React.createElement(CardLabelError, null, t(errors.tripTime))), /*#__PURE__*/React.createElement(Row, {
    key: t("ES_VEHICLE_OUT_TIME"),
    label: `${t("ES_VEHICLE_OUT_TIME")} * `,
    labelStyle: {
      minWidth: "fit-content",
      fontWeight: "normal"
    },
    textStyle: isMobile ? {
      width: "100%"
    } : {},
    rowContainerStyle: isMobile ? {
      display: "block"
    } : {
      justifyContent: "space-between"
    },
    text: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CustomTimePicker, {
      name: "tripTime",
      onChange: val => handleTimeChange(val, setTripTime),
      value: tripTime
    }))
  }), /*#__PURE__*/React.createElement("div", {
    className: !isMobile && "row",
    style: isMobile ? {} : {
      diplay: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(CardLabel, {
    style: {
      fontWeight: "normal"
    }
  }, " ", t("ES_FSM_ADDITIONAL_DETAILS"), " "), /*#__PURE__*/React.createElement(TextArea, {
    className: "form-field",
    onChange: e => {
      if (e.target.value.length > 1024) ; else {
        setComments(e.target.value);
      }
    },
    style: isMobile ? {
      width: "100%"
    } : {
      width: "100%",
      marginLeft: "35%"
    }
  })), /*#__PURE__*/React.createElement(Row, {
    key: t("ES_FSM_ATTACHMENTS"),
    label: `${t("ES_FSM_ATTACHMENT")}`,
    labelStyle: {
      minWidth: "fit-content",
      fontWeight: "normal"
    },
    textStyle: isMobile ? {
      width: "100%"
    } : {},
    rowContainerStyle: isMobile ? {
      display: "block"
    } : {
      justifyContent: "space-between",
      alignItems: "center"
    },
    text: /*#__PURE__*/React.createElement(MultiUploadWrapper, {
      t: t,
      module: "fsm",
      tenantId: stateId,
      getFormState: e => getData(e)
    })
  }), !(workflowDetails !== null && workflowDetails !== void 0 && workflowDetails.isLoading) && (workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data = workflowDetails.data) === null || _workflowDetails$data === void 0 ? void 0 : (_workflowDetails$data2 = _workflowDetails$data.nextActions) === null || _workflowDetails$data2 === void 0 ? void 0 : _workflowDetails$data2.length) > 0 && ((workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data3 = workflowDetails.data) === null || _workflowDetails$data3 === void 0 ? void 0 : (_workflowDetails$data4 = _workflowDetails$data3.nextActions) === null || _workflowDetails$data4 === void 0 ? void 0 : _workflowDetails$data4.length) === 1 ? /*#__PURE__*/React.createElement(ActionBar, null, /*#__PURE__*/React.createElement(SubmitBar, {
    label: t(`CS_ACTION_${workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data5 = workflowDetails.data) === null || _workflowDetails$data5 === void 0 ? void 0 : (_workflowDetails$data6 = _workflowDetails$data5.nextActions) === null || _workflowDetails$data6 === void 0 ? void 0 : (_workflowDetails$data7 = _workflowDetails$data6[0]) === null || _workflowDetails$data7 === void 0 ? void 0 : _workflowDetails$data7.action}`),
    onSubmit: () => {
      var _workflowDetails$data8, _workflowDetails$data9, _workflowDetails$data10;
      return onActionSelect(workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data8 = workflowDetails.data) === null || _workflowDetails$data8 === void 0 ? void 0 : (_workflowDetails$data9 = _workflowDetails$data8.nextActions) === null || _workflowDetails$data9 === void 0 ? void 0 : (_workflowDetails$data10 = _workflowDetails$data9[0]) === null || _workflowDetails$data10 === void 0 ? void 0 : _workflowDetails$data10.action);
    }
  })) : /*#__PURE__*/React.createElement(ActionBar, null, displayMenu && workflowDetails !== null && workflowDetails !== void 0 && (_workflowDetails$data11 = workflowDetails.data) !== null && _workflowDetails$data11 !== void 0 && _workflowDetails$data11.nextActions ? /*#__PURE__*/React.createElement(Menu, {
    localeKeyPrefix: "",
    options: workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data12 = workflowDetails.data) === null || _workflowDetails$data12 === void 0 ? void 0 : _workflowDetails$data12.nextActions.map(action => action.action),
    t: t,
    onSelect: onActionSelect
  }) : null, /*#__PURE__*/React.createElement(SubmitBar, {
    label: t("ES_COMMON_TAKE_ACTION"),
    onSubmit: () => setDisplayMenu(!displayMenu)
  })))), showModal ? /*#__PURE__*/React.createElement(ActionModal, {
    t: t,
    action: selectedAction,
    tenantId: tenantId,
    state: state,
    id: applicationNos,
    closeModal: closeModal,
    submitAction: handleDecline,
    actionData: workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data13 = workflowDetails.data) === null || _workflowDetails$data13 === void 0 ? void 0 : _workflowDetails$data13.timeline
  }) : null)), showToast && /*#__PURE__*/React.createElement(Toast, {
    error: showToast.key === "error" ? true : false,
    label: t(showToast.key === "success" ? showToast.action : showToast.action),
    onClose: closeToast
  }));
};

const Inbox = ({
  parentRoute,
  isSearch: _isSearch = false,
  isInbox: _isInbox = false
}) => {
  var _sortParams$, _sortParams$2, _sortParams$3, _sortParams$4, _applications$statuse, _applications$statuse2, _searchParams$applica, _applications$table2;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const userInfo = Digit.UserService.getUser();
  const userRoles = userInfo.info.roles;
  const DSO = Digit.UserService.hasAccess(["FSM_DSO"]) || false;
  const isFSTPOperator = Digit.UserService.hasAccess("FSM_EMP_FSTPO") || false;
  const {
    t
  } = useTranslation();
  const queryClient = useQueryClient();
  const [shouldSearch, setShouldSearch] = useState(false);
  const [pageOffset, setPageOffset] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortParams, setSortParams] = useState([{
    id: "createdTime",
    desc: true
  }]);
  const searchParamsKey = _isInbox ? "fsm/inbox/searchParams" : "fsm/search/searchParams";
  const searchParamsValue = _isInbox ? {
    applicationStatus: [],
    locality: [],
    uuid: DSO || isFSTPOperator ? {
      code: "ASSIGNED_TO_ME",
      name: t("ES_INBOX_ASSIGNED_TO_ME")
    } : {
      code: "ASSIGNED_TO_ALL",
      name: t("ES_INBOX_ASSIGNED_TO_ALL")
    }
  } : {};
  const [searchParams, setSearchParams] = Digit.Hooks.useSessionStorage(searchParamsKey, searchParamsValue);
  useEffect(() => {
    onSearch(searchParams);
  }, []);
  let isMobile = window.Digit.Utils.browser.isMobile();
  let paginationParms = isMobile ? {
    limit: 100,
    offset: 0,
    sortBy: sortParams === null || sortParams === void 0 ? void 0 : (_sortParams$ = sortParams[0]) === null || _sortParams$ === void 0 ? void 0 : _sortParams$.id,
    sortOrder: sortParams !== null && sortParams !== void 0 && (_sortParams$2 = sortParams[0]) !== null && _sortParams$2 !== void 0 && _sortParams$2.desc ? "DESC" : "ASC"
  } : {
    limit: pageSize,
    offset: pageOffset,
    sortBy: sortParams === null || sortParams === void 0 ? void 0 : (_sortParams$3 = sortParams[0]) === null || _sortParams$3 === void 0 ? void 0 : _sortParams$3.id,
    sortOrder: sortParams !== null && sortParams !== void 0 && (_sortParams$4 = sortParams[0]) !== null && _sortParams$4 !== void 0 && _sortParams$4.desc ? "DESC" : "ASC"
  };
  const {
    data: applications,
    isLoading,
    isIdle,
    refetch,
    revalidate
  } = Digit.Hooks.fsm.useInbox(tenantId, {
    ...searchParams,
    ...paginationParms,
    fromDate: searchParams !== null && searchParams !== void 0 && searchParams.fromDate ? new Date(searchParams === null || searchParams === void 0 ? void 0 : searchParams.fromDate).getTime() : undefined,
    toDate: searchParams !== null && searchParams !== void 0 && searchParams.toDate ? new Date(searchParams === null || searchParams === void 0 ? void 0 : searchParams.toDate).getTime() : undefined
  }, {
    enabled: _isInbox
  }, DSO ? true : false);
  const inboxTotalCount = DSO ? (applications === null || applications === void 0 ? void 0 : (_applications$statuse = applications.statuses.filter(e => e.applicationstatus === "DSO_INPROGRESS")[0]) === null || _applications$statuse === void 0 ? void 0 : _applications$statuse.count) + (applications === null || applications === void 0 ? void 0 : (_applications$statuse2 = applications.statuses.filter(e => e.applicationstatus === "PENDING_DSO_APPROVAL")[0]) === null || _applications$statuse2 === void 0 ? void 0 : _applications$statuse2.count) : applications === null || applications === void 0 ? void 0 : applications.totalCount;
  const {
    isLoading: isSearchLoading,
    isIdle: isSearchIdle,
    isError: isSearchError,
    data: {
      data,
      totalCount
    } = {},
    error
  } = Digit.Hooks.fsm.useSearchAll(tenantId, {
    limit: pageSize,
    offset: pageOffset,
    ...searchParams,
    applicationStatus: searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$applica = searchParams.applicationStatus) === null || _searchParams$applica === void 0 ? void 0 : _searchParams$applica.code,
    fromDate: searchParams !== null && searchParams !== void 0 && searchParams.fromDate ? new Date(searchParams === null || searchParams === void 0 ? void 0 : searchParams.fromDate).getTime() : undefined,
    toDate: searchParams !== null && searchParams !== void 0 && searchParams.toDate ? new Date(searchParams === null || searchParams === void 0 ? void 0 : searchParams.toDate).getTime() : undefined
  }, null, {
    enabled: shouldSearch && _isSearch
  });
  useEffect(() => {
    setPageOffset(0);
  }, [searchParams]);
  const fetchNextPage = () => {
    setPageOffset(prevState => prevState + pageSize);
  };
  const fetchPrevPage = () => {
    setPageOffset(prevState => prevState - pageSize);
  };
  const handleFilterChange = filterParam => {
    let keys_to_delete = filterParam.delete;
    let _new = {
      ...searchParams
    };
    if (keys_to_delete) keys_to_delete.forEach(key => delete _new[key]);
    setSearchParams({
      ..._new,
      ...filterParam
    });
  };
  const handleSort = useCallback(args => {
    if ((args === null || args === void 0 ? void 0 : args.length) === 0) return;
    setSortParams(args);
  }, []);
  const handlePageSizeChange = e => {
    setPageSize(Number(e.target.value));
  };
  const onSearch = (params = {}) => {
    if (_isSearch) {
      var _Object$keys;
      if (((_Object$keys = Object.keys(params)) === null || _Object$keys === void 0 ? void 0 : _Object$keys.length) === 0) {
        setShouldSearch(false);
        queryClient.resetQueries("FSM_CITIZEN_SEARCH");
      } else {
        setShouldSearch(true);
      }
      setSearchParams({
        ...params
      });
    } else {
      setSearchParams(({
        applicationStatus,
        locality,
        uuid
      }) => ({
        applicationStatus,
        locality,
        uuid,
        ...params
      }));
    }
  };
  const removeParam = (params = {}) => {
    const _search = {
      ...searchParams
    };
    Object.keys(params).forEach(key => delete _search[key]);
    setSearchParams(_search);
  };
  const getSearchFields = userRoles => {
    if (_isSearch) {
      return [{
        label: t("ES_SEARCH_APPLICATION_APPLICATION_NO"),
        name: "applicationNos"
      }, {
        label: t("ES_SEARCH_APPLICATION_MOBILE_NO"),
        name: "mobileNumber",
        maxlength: 10,
        pattern: "[6-9][0-9]{9}",
        title: t("ES_SEARCH_APPLICATION_MOBILE_INVALID")
      }, {
        label: t("ES_INBOX_STATUS"),
        name: "applicationStatus",
        type: "status"
      }, {
        label: t("ES_SEARCH_FROM_DATE"),
        name: "fromDate",
        type: "date"
      }, {
        label: t("ES_SEARCH_TO_DATE"),
        name: "toDate",
        type: "date"
      }];
    }
    if (userRoles.find(role => role.code === "FSM_EMP_FSTPO")) {
      return [{
        label: t("ES_SEARCH_APPLICATION_APPLICATION_NO"),
        name: "applicationNos"
      }, {
        label: t("ES_FSTP_OPERATOR_VEHICLE_NO"),
        name: "vehicleNo"
      }, {
        label: t("ES_FSTP_DSO_NAME"),
        name: "name"
      }];
    } else {
      return [{
        label: t("ES_SEARCH_APPLICATION_APPLICATION_NO"),
        name: "applicationNos"
      }, {
        label: t("ES_SEARCH_APPLICATION_MOBILE_NO"),
        name: "mobileNumber",
        maxlength: 10
      }];
    }
  };
  useEffect(() => {
    var _applications$table;
    const status = ["CITIZEN_FEEDBACK_PENDING"];
    applications === null || applications === void 0 ? void 0 : (_applications$table = applications.table) === null || _applications$table === void 0 ? void 0 : _applications$table.map(data => {
      if (status.includes(data.status)) data.sla = "-";
    });
  }, [applications]);
  if ((applications === null || applications === void 0 ? void 0 : (_applications$table2 = applications.table) === null || _applications$table2 === void 0 ? void 0 : _applications$table2.length) !== null) {
    if (isMobile) {
      return /*#__PURE__*/React.createElement("div", null, !_isSearch && /*#__PURE__*/React.createElement(Header, null, t("ES_COMMON_INBOX")), /*#__PURE__*/React.createElement(MobileInbox, {
        data: _isInbox ? applications : data,
        isLoading: _isInbox ? isLoading || isIdle : isSearchLoading,
        isSearch: _isSearch,
        searchFields: getSearchFields(userRoles),
        onFilterChange: handleFilterChange,
        onSearch: onSearch,
        onSort: handleSort,
        parentRoute: parentRoute,
        searchParams: searchParams,
        sortParams: sortParams,
        removeParam: removeParam,
        linkPrefix: `${parentRoute}/${DSO ? "dso-application-details" : "application-details"}/`
      }));
    } else {
      return /*#__PURE__*/React.createElement("div", null, !_isSearch && /*#__PURE__*/React.createElement(Header, null, t("ES_COMMON_INBOX"), Number(inboxTotalCount) ? /*#__PURE__*/React.createElement("p", {
        className: "inbox-count"
      }, Number(inboxTotalCount)) : null), /*#__PURE__*/React.createElement(DesktopInbox, {
        data: _isInbox ? applications : data,
        isLoading: _isInbox ? isLoading || isIdle : isSearchLoading,
        isSearch: _isSearch,
        shouldSearch: shouldSearch,
        onFilterChange: handleFilterChange,
        searchFields: getSearchFields(userRoles),
        onSearch: onSearch,
        onSort: handleSort,
        onNextPage: fetchNextPage,
        onPrevPage: fetchPrevPage,
        currentPage: Math.floor(pageOffset / pageSize),
        pageSizeLimit: pageSize,
        disableSort: false,
        searchParams: searchParams,
        onPageSizeChange: handlePageSizeChange,
        parentRoute: parentRoute,
        paginationParms: paginationParms,
        sortParams: sortParams,
        totalRecords: _isInbox ? Number(inboxTotalCount) : totalCount
      }));
    }
  }
};

const isConventionalSpecticTank$2 = tankDimension => tankDimension === "lbd";
const NewApplication = ({
  parentUrl,
  heading
}) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  const {
    data: commonFields,
    isLoading
  } = Digit.Hooks.fsm.useMDMS(stateId, "FSM", "CommonFieldsConfig");
  const {
    data: preFields,
    isLoading: isApplicantConfigLoading
  } = Digit.Hooks.fsm.useMDMS(stateId, "FSM", "PreFieldsConfig");
  const {
    data: postFields,
    isLoading: isTripConfigLoading
  } = Digit.Hooks.fsm.useMDMS(stateId, "FSM", "PostFieldsConfig");
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("FSM_MUTATION_HAPPENED", false);
  const [errorInfo, setErrorInfo, clearError] = Digit.Hooks.useSessionStorage("FSM_ERROR_DATA", false);
  const [successData, setsuccessData, clearSuccessData] = Digit.Hooks.useSessionStorage("FSM_MUTATION_SUCCESS_DATA", false);
  useEffect(() => {
    setMutationHappened(false);
    clearSuccessData();
    clearError();
  }, []);
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const [canSubmit, setSubmitValve] = useState(false);
  const defaultValues = {
    tripData: {
      noOfTrips: 1,
      amountPerTrip: null,
      amount: null
    }
  };
  const onFormValueChange = (setValue, formData) => {
    var _formData$address, _formData$address$loc, _formData$tripData, _formData$tripData2, _formData$tripData3;
    if (formData !== null && formData !== void 0 && formData.propertyType && formData !== null && formData !== void 0 && formData.subtype && formData !== null && formData !== void 0 && (_formData$address = formData.address) !== null && _formData$address !== void 0 && (_formData$address$loc = _formData$address.locality) !== null && _formData$address$loc !== void 0 && _formData$address$loc.code && formData !== null && formData !== void 0 && (_formData$tripData = formData.tripData) !== null && _formData$tripData !== void 0 && _formData$tripData.vehicleType && formData !== null && formData !== void 0 && formData.channel && (formData !== null && formData !== void 0 && (_formData$tripData2 = formData.tripData) !== null && _formData$tripData2 !== void 0 && _formData$tripData2.amountPerTrip || (formData === null || formData === void 0 ? void 0 : (_formData$tripData3 = formData.tripData) === null || _formData$tripData3 === void 0 ? void 0 : _formData$tripData3.amountPerTrip) === 0)) {
      var _formData$tripData4, _formData$advancepaym, _formData$advancepaym2, _formData$advancepaym3;
      setSubmitValve(true);
      const pitDetailValues = formData !== null && formData !== void 0 && formData.pitDetail ? Object.values(formData === null || formData === void 0 ? void 0 : formData.pitDetail).filter(value => value > 0) : null;
      let max = Digit.SessionStorage.get("total_amount");
      let min = Digit.SessionStorage.get("advance_amount");
      if (formData !== null && formData !== void 0 && formData.pitType) {
        var _formData$pitType, _formData$pitType2;
        if (pitDetailValues === null || (pitDetailValues === null || pitDetailValues === void 0 ? void 0 : pitDetailValues.length) === 0) {
          setSubmitValve(true);
        } else if (isConventionalSpecticTank$2(formData === null || formData === void 0 ? void 0 : (_formData$pitType = formData.pitType) === null || _formData$pitType === void 0 ? void 0 : _formData$pitType.dimension) && (pitDetailValues === null || pitDetailValues === void 0 ? void 0 : pitDetailValues.length) >= 3) {
          setSubmitValve(true);
        } else if (!isConventionalSpecticTank$2(formData === null || formData === void 0 ? void 0 : (_formData$pitType2 = formData.pitType) === null || _formData$pitType2 === void 0 ? void 0 : _formData$pitType2.dimension) && (pitDetailValues === null || pitDetailValues === void 0 ? void 0 : pitDetailValues.length) >= 2) {
          setSubmitValve(true);
        } else setSubmitValve(false);
      }
      if ((formData === null || formData === void 0 ? void 0 : (_formData$tripData4 = formData.tripData) === null || _formData$tripData4 === void 0 ? void 0 : _formData$tripData4.amountPerTrip) !== 0 && ((formData === null || formData === void 0 ? void 0 : (_formData$advancepaym = formData.advancepaymentPreference) === null || _formData$advancepaym === void 0 ? void 0 : _formData$advancepaym.advanceAmount) < min || (formData === null || formData === void 0 ? void 0 : (_formData$advancepaym2 = formData.advancepaymentPreference) === null || _formData$advancepaym2 === void 0 ? void 0 : _formData$advancepaym2.advanceAmount) > max || (formData === null || formData === void 0 ? void 0 : (_formData$advancepaym3 = formData.advancepaymentPreference) === null || _formData$advancepaym3 === void 0 ? void 0 : _formData$advancepaym3.advanceAmount) === "")) {
        setSubmitValve(false);
      }
    } else {
      setSubmitValve(false);
    }
  };
  const onSubmit = data => {
    var _data$pitType, _data$address, _data$address2, _data$address2$street, _data$address3, _data$address3$doorNo, _data$address4, _data$address5, _data$address5$landma, _data$tripData, _data$address6, _data$address6$city, _data$address7, _data$address7$city, _data$address8, _data$address8$city, _data$address9, _data$address9$locali, _data$address10, _data$address10$local, _data$advancepaymentP, _data$tripData2, _data$tripData2$vehic, _data$address11, _data$address12;
    const applicationChannel = data.channel;
    const sanitationtype = data === null || data === void 0 ? void 0 : (_data$pitType = data.pitType) === null || _data$pitType === void 0 ? void 0 : _data$pitType.code;
    const pitDimension = data === null || data === void 0 ? void 0 : data.pitDetail;
    const applicantName = data.applicationData.applicantName;
    const mobileNumber = data.applicationData.mobileNumber;
    const pincode = data === null || data === void 0 ? void 0 : (_data$address = data.address) === null || _data$address === void 0 ? void 0 : _data$address.pincode;
    const street = data === null || data === void 0 ? void 0 : (_data$address2 = data.address) === null || _data$address2 === void 0 ? void 0 : (_data$address2$street = _data$address2.street) === null || _data$address2$street === void 0 ? void 0 : _data$address2$street.trim();
    const doorNo = data === null || data === void 0 ? void 0 : (_data$address3 = data.address) === null || _data$address3 === void 0 ? void 0 : (_data$address3$doorNo = _data$address3.doorNo) === null || _data$address3$doorNo === void 0 ? void 0 : _data$address3$doorNo.trim();
    const slum = data === null || data === void 0 ? void 0 : (_data$address4 = data.address) === null || _data$address4 === void 0 ? void 0 : _data$address4.slum;
    const landmark = data === null || data === void 0 ? void 0 : (_data$address5 = data.address) === null || _data$address5 === void 0 ? void 0 : (_data$address5$landma = _data$address5.landmark) === null || _data$address5$landma === void 0 ? void 0 : _data$address5$landma.trim();
    const noOfTrips = data === null || data === void 0 ? void 0 : (_data$tripData = data.tripData) === null || _data$tripData === void 0 ? void 0 : _data$tripData.noOfTrips;
    const amount = data.tripData.amountPerTrip;
    const cityCode = data === null || data === void 0 ? void 0 : (_data$address6 = data.address) === null || _data$address6 === void 0 ? void 0 : (_data$address6$city = _data$address6.city) === null || _data$address6$city === void 0 ? void 0 : _data$address6$city.code;
    const city = data === null || data === void 0 ? void 0 : (_data$address7 = data.address) === null || _data$address7 === void 0 ? void 0 : (_data$address7$city = _data$address7.city) === null || _data$address7$city === void 0 ? void 0 : _data$address7$city.name;
    const state = data === null || data === void 0 ? void 0 : (_data$address8 = data.address) === null || _data$address8 === void 0 ? void 0 : (_data$address8$city = _data$address8.city) === null || _data$address8$city === void 0 ? void 0 : _data$address8$city.state;
    const localityCode = data === null || data === void 0 ? void 0 : (_data$address9 = data.address) === null || _data$address9 === void 0 ? void 0 : (_data$address9$locali = _data$address9.locality) === null || _data$address9$locali === void 0 ? void 0 : _data$address9$locali.code;
    const localityName = data === null || data === void 0 ? void 0 : (_data$address10 = data.address) === null || _data$address10 === void 0 ? void 0 : (_data$address10$local = _data$address10.locality) === null || _data$address10$local === void 0 ? void 0 : _data$address10$local.name;
    const gender = data.applicationData.applicantGender;
    const paymentPreference = amount === 0 ? null : data !== null && data !== void 0 && data.paymentPreference ? data === null || data === void 0 ? void 0 : data.paymentPreference : null;
    const advanceAmount = amount === 0 ? null : data === null || data === void 0 ? void 0 : (_data$advancepaymentP = data.advancepaymentPreference) === null || _data$advancepaymentP === void 0 ? void 0 : _data$advancepaymentP.advanceAmount;
    const formData = {
      fsm: {
        citizen: {
          name: applicantName,
          mobileNumber,
          gender: gender
        },
        tenantId: tenantId,
        sanitationtype: sanitationtype,
        source: applicationChannel.code,
        additionalDetails: {
          tripAmount: amount
        },
        propertyUsage: data === null || data === void 0 ? void 0 : data.subtype,
        vehicleCapacity: data === null || data === void 0 ? void 0 : (_data$tripData2 = data.tripData) === null || _data$tripData2 === void 0 ? void 0 : (_data$tripData2$vehic = _data$tripData2.vehicleType) === null || _data$tripData2$vehic === void 0 ? void 0 : _data$tripData2$vehic.capacity,
        pitDetail: {
          ...pitDimension,
          distanceFromRoad: data === null || data === void 0 ? void 0 : data.distanceFromRoad
        },
        address: {
          tenantId: cityCode,
          landmark,
          doorNo,
          street,
          city,
          state,
          pincode,
          slumName: slum,
          locality: {
            code: localityCode,
            name: localityName
          },
          geoLocation: {
            latitude: data === null || data === void 0 ? void 0 : (_data$address11 = data.address) === null || _data$address11 === void 0 ? void 0 : _data$address11.latitude,
            longitude: data === null || data === void 0 ? void 0 : (_data$address12 = data.address) === null || _data$address12 === void 0 ? void 0 : _data$address12.longitude
          }
        },
        noOfTrips,
        paymentPreference,
        advanceAmount
      },
      workflow: null
    };
    window.Digit.SessionStorage.set("propertyType", null);
    window.Digit.SessionStorage.set("subType", null);
    Digit.SessionStorage.set("city_property", null);
    Digit.SessionStorage.set("selected_localities", null);
    Digit.SessionStorage.set("locality_property", null);
    history.push("/digit-ui/employee/fsm/response", formData);
  };
  if (isLoading || isTripConfigLoading || isApplicantConfigLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  const configs = [...preFields, ...commonFields];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "15px"
    }
  }, /*#__PURE__*/React.createElement(Header, null, t("ES_TITLE_NEW_DESULDGING_APPLICATION"))), /*#__PURE__*/React.createElement(FormComposer, {
    isDisabled: !canSubmit,
    label: t("ES_COMMON_APPLICATION_SUBMIT"),
    config: configs.filter(i => !i.hideInEmployee).map(config => {
      return {
        ...config,
        body: config.body.filter(a => !a.hideInEmployee)
      };
    }),
    fieldStyle: {
      marginRight: 0
    },
    formCardStyle: true,
    onSubmit: onSubmit,
    defaultValues: defaultValues,
    onFormValueChange: onFormValueChange,
    noBreakLine: true,
    fms_inline: true
  }));
};

const GetMessage = (type, action, isSuccess, isEmployee, t, data) => {
  var _data$additionalDetai, _data$additionalDetai2;
  const zeroPricing = (data === null || data === void 0 ? void 0 : (_data$additionalDetai = data.additionalDetails) === null || _data$additionalDetai === void 0 ? void 0 : _data$additionalDetai.tripAmount) === 0 || (data === null || data === void 0 ? void 0 : (_data$additionalDetai2 = data.additionalDetails) === null || _data$additionalDetai2 === void 0 ? void 0 : _data$additionalDetai2.tripAmount) === null || false;
  const advanceZero = (data === null || data === void 0 ? void 0 : data.advanceAmount) === 0 || false;
  return t(`${isEmployee ? "E" : "C"}S_FSM_RESPONSE_${action ? action : "CREATE"}_${type}${isSuccess ? "" : "_ERROR"}${action ? "" : advanceZero ? "_POST_PAY" : zeroPricing ? "_ZERO_PAY" : ""}`);
};
const GetActionMessage$1 = (action, isSuccess, isEmployee, t) => {
  return GetMessage("ACTION", action, isSuccess, isEmployee, t);
};
const GetLabel = (action, isSuccess, isEmployee, t) => {
  return GetMessage("LABEL", action, isSuccess, isEmployee, t);
};
const DisplayText = (action, isSuccess, isEmployee, t, data) => {
  return GetMessage("DISPLAY", action, isSuccess, isEmployee, t, data);
};
const BannerPicker$1 = props => {
  var _props$data, _props$data$fsm, _props$data2, _props$data2$fsm;
  let actionMessage = props !== null && props !== void 0 && props.action ? props.action : "CREATE";
  let labelMessage = GetLabel(((_props$data = props.data) === null || _props$data === void 0 ? void 0 : (_props$data$fsm = _props$data.fsm) === null || _props$data$fsm === void 0 ? void 0 : _props$data$fsm[0].applicationStatus) || props.action, props.isSuccess, props.isEmployee, props.t);
  if (props.errorInfo && props.errorInfo !== null && props.errorInfo !== "" && typeof props.errorInfo === "string" && props.action !== "SCHEDULE") {
    labelMessage = props.errorInfo;
  }
  return /*#__PURE__*/React.createElement(Banner, {
    message: GetActionMessage$1(actionMessage || props.action, props.isSuccess, props.isEmployee, props.t),
    applicationNumber: (_props$data2 = props.data) === null || _props$data2 === void 0 ? void 0 : (_props$data2$fsm = _props$data2.fsm) === null || _props$data2$fsm === void 0 ? void 0 : _props$data2$fsm[0].applicationNo,
    info: labelMessage,
    successful: props.isSuccess
  });
};
const Response$1 = props => {
  var _mutation$data, _mutation$data$fsm, _mutation$data$fsm$0$, _mutation$data$fsm$0$2, _mutation$data2, _mutation$data2$fsm, _mutation$data2$fsm$, _mutation$data3, _mutation$data3$fsm, _mutation$data3$fsm$, _Data$fsm2, _Data$fsm9, _Data$fsm10, _Data$fsm11;
  const history = useHistory();
  const [showToast, setShowToast] = useState(null);
  const {
    t
  } = useTranslation();
  const queryClient = useQueryClient();
  const paymentAccess = Digit.UserService.hasAccess("FSM_COLLECTOR");
  const FSM_EDITOR = Digit.UserService.hasAccess("FSM_EDITOR_EMP") || false;
  const isCitizen = Digit.UserService.hasAccess("CITIZEN") || window.location.pathname.includes("citizen") || false;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  const {
    state
  } = props.location;
  const mutation = state.key === "update" ? Digit.Hooks.fsm.useApplicationActions(tenantId) : Digit.Hooks.fsm.useDesludging(tenantId);
  const {
    data: storeData
  } = Digit.Hooks.useStore.getInitData();
  const {
    tenants
  } = storeData || {};
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("FSM_MUTATION_HAPPENED", false);
  const [errorInfo, setErrorInfo, clearError] = Digit.Hooks.useSessionStorage("FSM_ERROR_DATA", false);
  const [successData, setsuccessData, clearSuccessData] = Digit.Hooks.useSessionStorage("FSM_MUTATION_SUCCESS_DATA", false);
  const [displayMenu, setDisplayMenu] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const onError = (error, variables) => {
    var _error$response, _error$response$data, _error$response$data$;
    setErrorInfo((error === null || error === void 0 ? void 0 : (_error$response = error.response) === null || _error$response === void 0 ? void 0 : (_error$response$data = _error$response.data) === null || _error$response$data === void 0 ? void 0 : (_error$response$data$ = _error$response$data.Errors[0]) === null || _error$response$data$ === void 0 ? void 0 : _error$response$data$.code) || (error === null || error === void 0 ? void 0 : error.message) || "ERROR");
    setMutationHappened(true);
  };
  useEffect(() => {
    if (mutation.data) setsuccessData(mutation.data);
  }, [mutation.data]);
  const localityCode = mutation === null || mutation === void 0 ? void 0 : (_mutation$data = mutation.data) === null || _mutation$data === void 0 ? void 0 : (_mutation$data$fsm = _mutation$data.fsm) === null || _mutation$data$fsm === void 0 ? void 0 : (_mutation$data$fsm$0$ = _mutation$data$fsm[0].address) === null || _mutation$data$fsm$0$ === void 0 ? void 0 : (_mutation$data$fsm$0$2 = _mutation$data$fsm$0$.locality) === null || _mutation$data$fsm$0$2 === void 0 ? void 0 : _mutation$data$fsm$0$2.code;
  const slumCode = mutation === null || mutation === void 0 ? void 0 : (_mutation$data2 = mutation.data) === null || _mutation$data2 === void 0 ? void 0 : (_mutation$data2$fsm = _mutation$data2.fsm) === null || _mutation$data2$fsm === void 0 ? void 0 : (_mutation$data2$fsm$ = _mutation$data2$fsm[0].address) === null || _mutation$data2$fsm$ === void 0 ? void 0 : _mutation$data2$fsm$.slumName;
  const slum = Digit.Hooks.fsm.useSlum(mutation === null || mutation === void 0 ? void 0 : (_mutation$data3 = mutation.data) === null || _mutation$data3 === void 0 ? void 0 : (_mutation$data3$fsm = _mutation$data3.fsm) === null || _mutation$data3$fsm === void 0 ? void 0 : (_mutation$data3$fsm$ = _mutation$data3$fsm[0]) === null || _mutation$data3$fsm$ === void 0 ? void 0 : _mutation$data3$fsm$.tenantId, slumCode, localityCode, {
    enabled: slumCode ? true : false,
    retry: slumCode ? true : false
  });
  const {
    data: vehicleMenu
  } = Digit.Hooks.fsm.useMDMS(stateId, "Vehicle", "VehicleType", {
    staleTime: Infinity
  });
  const Data = (mutation === null || mutation === void 0 ? void 0 : mutation.data) || successData;
  const vehicle = vehicleMenu === null || vehicleMenu === void 0 ? void 0 : vehicleMenu.find(vehicle => {
    var _Data$fsm, _Data$fsm$;
    return (Data === null || Data === void 0 ? void 0 : (_Data$fsm = Data.fsm) === null || _Data$fsm === void 0 ? void 0 : (_Data$fsm$ = _Data$fsm[0]) === null || _Data$fsm$ === void 0 ? void 0 : _Data$fsm$.vehicleType) === (vehicle === null || vehicle === void 0 ? void 0 : vehicle.code);
  });
  const pdfVehicleType = getVehicleType(vehicle, t);
  let getApplicationNo = (_Data$fsm2 = Data.fsm) === null || _Data$fsm2 === void 0 ? void 0 : _Data$fsm2[0].applicationNo;
  const {
    data: paymentsHistory
  } = Digit.Hooks.fsm.usePaymentHistory(tenantId, getApplicationNo);
  const handleDownloadPdf = () => {
    const {
      fsm
    } = mutation.data || successData;
    const [applicationDetails, ...rest] = fsm;
    const tenantInfo = tenants.find(tenant => tenant.code === applicationDetails.tenantId);
    const data = getPDFData({
      ...applicationDetails,
      slum,
      pdfVehicleType
    }, tenantInfo, t);
    Digit.Utils.pdf.generate(data);
  };
  const downloadPaymentReceipt = async () => {
    var _paymentsHistory$Paym, _receiptFile$fileStor;
    const receiptFile = {
      filestoreIds: [(_paymentsHistory$Paym = paymentsHistory.Payments[0]) === null || _paymentsHistory$Paym === void 0 ? void 0 : _paymentsHistory$Paym.fileStoreId]
    };
    if (!(receiptFile !== null && receiptFile !== void 0 && (_receiptFile$fileStor = receiptFile.fileStoreIds) !== null && _receiptFile$fileStor !== void 0 && _receiptFile$fileStor[0])) {
      const newResponse = await Digit.PaymentService.generatePdf(stateId, {
        Payments: [paymentsHistory.Payments[0]]
      }, "fsm-receipt");
      const fileStore = await Digit.PaymentService.printReciept(stateId, {
        fileStoreIds: newResponse.filestoreIds[0]
      });
      window.open(fileStore[newResponse.filestoreIds[0]], "_blank");
      setShowOptions(false);
    } else {
      const fileStore = await Digit.PaymentService.printReciept(stateId, {
        fileStoreIds: receiptFile.filestoreIds[0]
      });
      window.open(fileStore[receiptFile.filestoreIds[0]], "_blank");
      setShowOptions(false);
    }
  };
  const handleResponse = () => {
    var _Data$fsm3;
    if ((Data === null || Data === void 0 ? void 0 : (_Data$fsm3 = Data.fsm) === null || _Data$fsm3 === void 0 ? void 0 : _Data$fsm3[0].paymentPreference) === "POST_PAY") {
      setShowToast({
        key: "error",
        action: `ES_FSM_PAYMENT_BEFORE_SCHEDULE_FAILURE`
      });
      setTimeout(() => {
        closeToast();
      }, 5000);
    } else {
      var _state$applicationDat, _Data$fsm4;
      history.push(`/digit-ui/employee/payment/collect/FSM.TRIP_CHARGES/${(state === null || state === void 0 ? void 0 : (_state$applicationDat = state.applicationData) === null || _state$applicationDat === void 0 ? void 0 : _state$applicationDat.applicationNo) || (Data === null || Data === void 0 ? void 0 : (_Data$fsm4 = Data.fsm) === null || _Data$fsm4 === void 0 ? void 0 : _Data$fsm4[0].applicationNo)}`);
    }
  };
  const closeToast = () => {
    setShowToast(null);
  };
  useEffect(() => {
    const onSuccess = () => {
      queryClient.clear();
      setMutationHappened(true);
      window.history.replaceState({}, "FSM_CREATE_RESPONSE");
    };
    if (!mutationHappened && !errorInfo) {
      if (state.key === "update") {
        mutation.mutate({
          fsm: state.applicationData,
          workflow: {
            action: state.action,
            ...state.actionData
          }
        }, {
          onError,
          onSuccess
        });
      } else {
        mutation.mutate(state, {
          onError,
          onSuccess
        });
      }
    }
  }, []);
  function onActionSelect(action) {
    setSelectedAction(action);
    setDisplayMenu(false);
  }
  const handleGeneratePdf = () => {
    var _Data$fsm5, _Data$fsm6;
    if ((Data === null || Data === void 0 ? void 0 : (_Data$fsm5 = Data.fsm) === null || _Data$fsm5 === void 0 ? void 0 : _Data$fsm5[0].applicationStatus) === "COMPLETED" && (Data === null || Data === void 0 ? void 0 : (_Data$fsm6 = Data.fsm) === null || _Data$fsm6 === void 0 ? void 0 : _Data$fsm6[0].advanceAmount) !== null) {
      return downloadPaymentReceipt;
    }
    return handleDownloadPdf;
  };
  const generatePdfLabel = () => {
    var _Data$fsm7, _Data$fsm8;
    if ((Data === null || Data === void 0 ? void 0 : (_Data$fsm7 = Data.fsm) === null || _Data$fsm7 === void 0 ? void 0 : _Data$fsm7[0].applicationStatus) === "COMPLETED" && (Data === null || Data === void 0 ? void 0 : (_Data$fsm8 = Data.fsm) === null || _Data$fsm8 === void 0 ? void 0 : _Data$fsm8[0].advanceAmount) !== null) {
      return t("CS_COMMON_PAYMENT_RECEIPT");
    }
    return t("CS_COMMON_DOWNLOAD");
  };
  useEffect(() => {
    switch (selectedAction) {
      case "GO_TO_HOME":
        return isCitizen ? history.push("/digit-ui/citizen") : history.push("/digit-ui/employee");
      case "ASSIGN_TO_DSO":
        return history.push(`/digit-ui/employee/fsm/application-details/${getApplicationNo}`);
      case "PAY":
        return handleResponse();
    }
  }, [selectedAction]);
  if (mutation.isLoading || mutation.isIdle && !mutationHappened) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  let ACTIONS = ["GO_TO_HOME"];
  if ((Data === null || Data === void 0 ? void 0 : (_Data$fsm9 = Data.fsm) === null || _Data$fsm9 === void 0 ? void 0 : _Data$fsm9[0].applicationStatus) === "PENDING_APPL_FEE_PAYMENT" && paymentAccess) {
    ACTIONS = [...ACTIONS, "PAY"];
  } else if ((Data === null || Data === void 0 ? void 0 : (_Data$fsm10 = Data.fsm) === null || _Data$fsm10 === void 0 ? void 0 : _Data$fsm10[0].applicationStatus) === "ASSING_DSO" && FSM_EDITOR) {
    ACTIONS = [...ACTIONS, "ASSIGN_TO_DSO"];
  }
  const isSuccess = !successData ? mutation === null || mutation === void 0 ? void 0 : mutation.isSuccess : true;
  return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(BannerPicker$1, {
    t: t,
    data: Data,
    action: state.action,
    isSuccess: isSuccess,
    isLoading: mutation.isIdle && !mutationHappened || (mutation === null || mutation === void 0 ? void 0 : mutation.isLoading),
    isEmployee: props.parentRoute.includes("employee"),
    errorInfo: errorInfo
  }), /*#__PURE__*/React.createElement(CardText, null, DisplayText(state.action, isSuccess, props.parentRoute.includes("employee"), t, Data === null || Data === void 0 ? void 0 : (_Data$fsm11 = Data.fsm) === null || _Data$fsm11 === void 0 ? void 0 : _Data$fsm11[0])), isSuccess && /*#__PURE__*/React.createElement(LinkButton, {
    label: /*#__PURE__*/React.createElement("div", {
      className: "response-download-button"
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "#a82227"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"
    }))), /*#__PURE__*/React.createElement("span", {
      className: "download-button"
    }, generatePdfLabel(), " ")),
    style: {
      width: "100px"
    },
    onClick: handleGeneratePdf()
  }), /*#__PURE__*/React.createElement(ActionBar, null, displayMenu ? /*#__PURE__*/React.createElement(Menu, {
    localeKeyPrefix: "ES_COMMON",
    options: ACTIONS,
    t: t,
    onSelect: onActionSelect
  }) : null, ACTIONS.length === 1 ? /*#__PURE__*/React.createElement(SubmitBar, {
    label: t(`ES_COMMON_${ACTIONS[0]}`),
    onSubmit: () => onActionSelect(ACTIONS[0])
  }) : /*#__PURE__*/React.createElement(SubmitBar, {
    label: t("ES_COMMON_TAKE_ACTION"),
    onSubmit: () => setDisplayMenu(!displayMenu)
  })), showToast && /*#__PURE__*/React.createElement(Toast, {
    error: showToast.key === "error" ? true : false,
    label: t(showToast.key === "success" ? showToast.action : `ES_FSM_PAYMENT_BEFORE_SCHEDULE_FAILURE`),
    onClose: closeToast
  }));
};

const SearchApplication$1 = ({
  onSearch,
  type,
  onClose,
  onTabChange,
  isFstpOperator,
  searchFields,
  searchParams,
  isInboxPage,
  selectedTab
}) => {
  const storedSearchParams = isInboxPage ? Digit.SessionStorage.get("fsm/inbox/searchParams") : Digit.SessionStorage.get("fsm/search/searchParams");
  const {
    data: applicationStatuses,
    isFetched: areApplicationStatus
  } = Digit.Hooks.fsm.useApplicationStatus();
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control
  } = useForm({
    defaultValues: storedSearchParams || searchParams
  });
  const [error, setError] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const mobileView = innerWidth <= 640;
  const FSTP = Digit.UserService.hasAccess("FSM_EMP_FSTPO") || false;
  const watchSearch = watch(["applicationNos", "mobileNumber"]);
  const onSubmitInput = data => {
    if (!data.mobileNumber) {
      delete data.mobileNumber;
    }
    onSearch(data);
    if (type === "mobile") {
      onClose();
    }
  };
  function clearSearch() {
    const resetValues = searchFields.reduce((acc, field) => ({
      ...acc,
      [field === null || field === void 0 ? void 0 : field.name]: ""
    }), {});
    reset(resetValues);
    if (isInboxPage) {
      Digit.SessionStorage.del("fsm/inbox/searchParams");
    } else {
      Digit.SessionStorage.del("fsm/search/searchParams");
    }
    onSearch({});
  }
  const clearAll = mobileView => {
    const mobileViewStyles = mobileView ? {
      margin: 0,
      display: "inline"
    } : {
      marginTop: "40px",
      marginLeft: "16px"
    };
    return /*#__PURE__*/React.createElement(LinkLabel, {
      style: {
        ...mobileViewStyles
      },
      onClick: clearSearch
    }, t("ES_COMMON_CLEAR_SEARCH"));
  };
  const onAddClick = () => {
    setShowAddMenu(!showAddMenu);
  };
  const searchValidation = data => {
    return null;
  };
  function onActionSelect(action) {
    switch (action) {
      case "VENDOR":
        return history.push("/digit-ui/employee/fsm/registry/new-vendor");
      case "VEHICLE":
        return history.push("/digit-ui/employee/fsm/registry/new-vehicle");
      case "DRIVER":
        return history.push("/digit-ui/employee/fsm/registry/new-driver");
    }
  }
  const getFields = input => {
    switch (input.type) {
      case "date":
        return /*#__PURE__*/React.createElement(Controller, {
          render: props => /*#__PURE__*/React.createElement(DatePicker$3, {
            date: props.value,
            onChange: props.onChange
          }),
          name: input.name,
          control: control,
          defaultValue: null
        });
      case "status":
        return /*#__PURE__*/React.createElement(Controller, {
          render: props => /*#__PURE__*/React.createElement(DropdownStatus, {
            onAssignmentChange: props.onChange,
            value: props.value,
            applicationStatuses: applicationStatuses,
            areApplicationStatus: areApplicationStatus
          }),
          name: input.name,
          control: control,
          defaultValue: null
        });
      default:
        return /*#__PURE__*/React.createElement(TextInput, Object.assign({}, input, {
          inputRef: register
        }, register(input.name, {
          validate: searchValidation
        }), {
          watch: watch,
          shouldUpdate: true
        }));
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "search-container",
    style: {
      width: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "search-complaint-container"
  }, (type === "mobile" || mobileView) && /*#__PURE__*/React.createElement("div", {
    className: "complaint-header"
  }, /*#__PURE__*/React.createElement("h2", null, t("ES_COMMON_SEARCH_BY")), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: "2%",
      right: "8px"
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement(CloseSvg, null))), /*#__PURE__*/React.createElement("div", {
    className: "search-tabs-container"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: selectedTab === "VENDOR" ? "search-tab-head-selected" : "search-tab-head",
    onClick: () => {
      clearSearch();
      onTabChange("VENDOR");
    }
  }, t("ES_FSM_REGISTRY_INBOX_TAB_VENDOR")), /*#__PURE__*/React.createElement("button", {
    className: selectedTab === "VEHICLE" ? "search-tab-head-selected" : "search-tab-head",
    onClick: () => {
      clearSearch();
      onTabChange("VEHICLE");
    }
  }, t("ES_FSM_REGISTRY_INBOX_TAB_VEHICLE")), /*#__PURE__*/React.createElement("button", {
    className: selectedTab === "DRIVER" ? "search-tab-head-selected" : "search-tab-head",
    onClick: () => {
      clearSearch();
      onTabChange("DRIVER");
    }
  }, t("ES_FSM_REGISTRY_INBOX_TAB_DRIVER"))), /*#__PURE__*/React.createElement("div", {
    className: "action-bar-wrap-registry"
  }, /*#__PURE__*/React.createElement("div", {
    className: "search-add",
    onClick: onAddClick
  }, t("ES_FSM_REGISTRY_INBOX_HEADER_ADD"), /*#__PURE__*/React.createElement("div", {
    className: "search-add-icon"
  }, /*#__PURE__*/React.createElement(AddIcon, {
    className: ""
  }))), showAddMenu && /*#__PURE__*/React.createElement(Menu, {
    localeKeyPrefix: "ES_FSM_ACTION_CREATE",
    options: ["VENDOR", "DRIVER", "VEHICLE"],
    t: t,
    onSelect: onActionSelect
  }))), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit(onSubmitInput)
  }, /*#__PURE__*/React.createElement("div", {
    className: FSTP ? "complaint-input-container for-pt for-search" : "complaint-input-container",
    style: {
      display: "grid",
      width: "100%",
      gridTemplateColumns: "33.33% 66.66% 0%"
    }
  }, searchFields === null || searchFields === void 0 ? void 0 : searchFields.map((input, index) => /*#__PURE__*/React.createElement("span", {
    key: index,
    className: index === 0 ? "complaint-input" : "mobile-input"
  }, /*#__PURE__*/React.createElement(Label, null, input.label), getFields(input), " ")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex"
    }
  }, type === "desktop" && !mobileView && /*#__PURE__*/React.createElement(SubmitBar, {
    className: "submit-bar-search",
    label: t("ES_COMMON_SEARCH"),
    submit: true
  }), type === "desktop" && !mobileView && /*#__PURE__*/React.createElement("span", {
    className: "clear-search"
  }, clearAll()))), error ? /*#__PURE__*/React.createElement(CardLabelError, {
    className: "search-error-label"
  }, t("ES_SEARCH_APPLICATION_ERROR")) : null))));
};

const RegisryInbox = props => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const DSO = Digit.UserService.hasAccess(["FSM_DSO"]) || false;
  const GetCell = value => /*#__PURE__*/React.createElement("span", {
    className: "cell-text"
  }, value);
  const FSTP = Digit.UserService.hasAccess("FSM_EMP_FSTPO") || false;
  const [tableData, setTableData] = useState([]);
  const [showToast, setShowToast] = useState(null);
  const [vendors, setVendors] = useState([]);
  const queryClient = useQueryClient();
  const {
    data: vendorData,
    isLoading: isVendorLoading,
    isSuccess: isVendorSuccess,
    error: vendorError,
    refetch: refetchVendor
  } = Digit.Hooks.fsm.useDsoSearch(tenantId, {
    sortBy: "name",
    sortOrder: "ASC",
    status: "ACTIVE"
  }, {
    enabled: false
  });
  const {
    isLoading: isUpdateVendorLoading,
    isError: vendorUpdateError,
    data: updateVendorResponse,
    error: updateVendorError,
    mutate: mutateVendor
  } = Digit.Hooks.fsm.useVendorUpdate(tenantId);
  const {
    isLoading: isUpdateVehicleLoading,
    isError: vehicleUpdateError,
    data: updateVehicleResponse,
    error: updateVehicleError,
    mutate: mutateVehicle
  } = Digit.Hooks.fsm.useUpdateVehicle(tenantId);
  const {
    isLoading: isDriverLoading,
    isError: driverUpdateError,
    data: updateDriverResponse,
    error: updateDriverError,
    mutate: mutateDriver
  } = Digit.Hooks.fsm.useDriverUpdate(tenantId);
  useEffect(() => {
    var _props$data;
    setTableData((props === null || props === void 0 ? void 0 : (_props$data = props.data) === null || _props$data === void 0 ? void 0 : _props$data.table) || []);
  }, [props]);
  useEffect(() => {
    if (props.selectedTab === "DRIVER" || props.selectedTab === "VEHICLE") refetchVendor();
  }, [props.selectedTab]);
  useEffect(() => {
    if (vendorData) {
      let vendors = vendorData.map(data => data.dsoDetails);
      setVendors(vendors);
    }
  }, [vendorData]);
  const closeToast = () => {
    setShowToast(null);
  };
  const onVendorUpdate = row => {
    var _formDetails$owner, _formDetails$owner2, _formDetails$owner3, _formDetails$owner4;
    let formDetails = row.original.dsoDetails;
    const formData = {
      vendor: {
        ...formDetails,
        status: (formDetails === null || formDetails === void 0 ? void 0 : formDetails.status) === "ACTIVE" ? "DISABLED" : "ACTIVE",
        owner: {
          ...formDetails.owner,
          gender: (formDetails === null || formDetails === void 0 ? void 0 : (_formDetails$owner = formDetails.owner) === null || _formDetails$owner === void 0 ? void 0 : _formDetails$owner.gender) || "OTHER",
          dob: (formDetails === null || formDetails === void 0 ? void 0 : (_formDetails$owner2 = formDetails.owner) === null || _formDetails$owner2 === void 0 ? void 0 : _formDetails$owner2.dob) || new Date(`1/1/1970`).getTime(),
          emailId: (formDetails === null || formDetails === void 0 ? void 0 : (_formDetails$owner3 = formDetails.owner) === null || _formDetails$owner3 === void 0 ? void 0 : _formDetails$owner3.emailId) || "abc@egov.com",
          relationship: (formDetails === null || formDetails === void 0 ? void 0 : (_formDetails$owner4 = formDetails.owner) === null || _formDetails$owner4 === void 0 ? void 0 : _formDetails$owner4.relationship) || "OTHER"
        }
      }
    };
    mutateVendor(formData, {
      onError: (error, variables) => {
        setShowToast({
          key: "error",
          action: error
        });
        setTimeout(closeToast, 5000);
      },
      onSuccess: (data, variables) => {
        setShowToast({
          key: "success",
          action: "VENDOR"
        });
        queryClient.invalidateQueries("DSO_SEARCH");
        props.refetchData();
        setTimeout(closeToast, 3000);
      }
    });
  };
  const onVehicleUpdate = row => {
    let formDetails = row.original;
    delete formDetails.vendor;
    const formData = {
      vehicle: {
        ...formDetails,
        status: (formDetails === null || formDetails === void 0 ? void 0 : formDetails.status) === "ACTIVE" ? "DISABLED" : "ACTIVE"
      }
    };
    mutateVehicle(formData, {
      onError: (error, variables) => {
        setShowToast({
          key: "error",
          action: error
        });
        setTimeout(closeToast, 5000);
      },
      onSuccess: (data, variables) => {
        setShowToast({
          key: "success",
          action: "VEHICLE"
        });
        queryClient.invalidateQueries("FSM_VEICLES_SEARCH");
        props.refetchVendor();
        props.refetchData();
        setTimeout(closeToast, 3000);
      }
    });
  };
  const onDriverUpdate = row => {
    var _formDetails$owner5, _formDetails$owner6, _formDetails$owner7, _formDetails$owner8;
    let formDetails = row.original;
    const formData = {
      driver: {
        ...formDetails,
        status: (formDetails === null || formDetails === void 0 ? void 0 : formDetails.status) === "ACTIVE" ? "DISABLED" : "ACTIVE",
        owner: {
          ...formDetails.owner,
          gender: (formDetails === null || formDetails === void 0 ? void 0 : (_formDetails$owner5 = formDetails.owner) === null || _formDetails$owner5 === void 0 ? void 0 : _formDetails$owner5.gender) || "OTHER",
          dob: (formDetails === null || formDetails === void 0 ? void 0 : (_formDetails$owner6 = formDetails.owner) === null || _formDetails$owner6 === void 0 ? void 0 : _formDetails$owner6.dob) || new Date(`1/1/1970`).getTime(),
          emailId: (formDetails === null || formDetails === void 0 ? void 0 : (_formDetails$owner7 = formDetails.owner) === null || _formDetails$owner7 === void 0 ? void 0 : _formDetails$owner7.emailId) || "abc@egov.com",
          relationship: (formDetails === null || formDetails === void 0 ? void 0 : (_formDetails$owner8 = formDetails.owner) === null || _formDetails$owner8 === void 0 ? void 0 : _formDetails$owner8.relationship) || "OTHER"
        }
      }
    };
    mutateDriver(formData, {
      onError: (error, variables) => {
        setShowToast({
          key: "error",
          action: error
        });
        setTimeout(closeToast, 5000);
      },
      onSuccess: (data, variables) => {
        setShowToast({
          key: "success",
          action: "DRIVER"
        });
        queryClient.invalidateQueries("FSM_DRIVER_SEARCH");
        props.refetchVendor();
        props.refetchData();
        setTimeout(closeToast, 3000);
      }
    });
  };
  const onVendorSelect = (row, selectedOption) => {
    let driverData = row.original;
    let existingVendor = driverData === null || driverData === void 0 ? void 0 : driverData.vendor;
    let selectedVendor = selectedOption;
    delete driverData.vendor;
    driverData.vendorDriverStatus = "ACTIVE";
    if (existingVendor) {
      const drivers = existingVendor === null || existingVendor === void 0 ? void 0 : existingVendor.drivers;
      drivers.splice(drivers.findIndex(ele => ele.id === driverData.id), 1);
    }
    const formData = {
      vendor: {
        ...selectedVendor,
        drivers: selectedVendor.drivers ? [...selectedVendor.drivers, driverData] : [driverData]
      }
    };
    mutateVendor(formData, {
      onError: (error, variables) => {
        setShowToast({
          key: "error",
          action: error
        });
        setTimeout(closeToast, 5000);
      },
      onSuccess: (data, variables) => {
        setShowToast({
          key: "success",
          action: "VENDOR"
        });
        queryClient.invalidateQueries("DSO_SEARCH");
        props.refetchData();
        setTimeout(closeToast, 3000);
      }
    });
  };
  const onCellClick = (row, column, length) => {
    setTableData(old => old.map((data, index) => {
      var _data$popup, _data$popup2;
      if (index == row.id && row.id !== (data === null || data === void 0 ? void 0 : (_data$popup = data.popup) === null || _data$popup === void 0 ? void 0 : _data$popup.row) && column.id !== (data === null || data === void 0 ? void 0 : (_data$popup2 = data.popup) === null || _data$popup2 === void 0 ? void 0 : _data$popup2.column) && length) {
        return {
          ...data,
          popup: {
            row: row.id,
            column: column.id
          }
        };
      } else {
        return {
          ...data,
          popup: {}
        };
      }
    }));
  };
  const onActionSelect = (action, type, data) => {
    if (type === "VEHICLE") {
      history.push("/digit-ui/employee/fsm/registry/vehicle-details/" + action);
    } else {
      let driver = data.find(ele => ele.name === action);
      history.push("/digit-ui/employee/fsm/registry/driver-details/" + (driver === null || driver === void 0 ? void 0 : driver.id));
    }
  };
  const onSelectAdd = () => {
    switch (props.selectedTab) {
      case "VENDOR":
        return history.push("/digit-ui/employee/fsm/registry/new-vendor");
      case "VEHICLE":
        return history.push("/digit-ui/employee/fsm/registry/new-vehicle");
      case "DRIVER":
        return history.push("/digit-ui/employee/fsm/registry/new-driver");
    }
  };
  const columns = React.useMemo(() => {
    switch (props.selectedTab) {
      case "VENDOR":
        return [{
          Header: t("ES_FSM_REGISTRY_INBOX_VENDOR_NAME"),
          disableSortBy: true,
          Cell: ({
            row
          }) => {
            return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
              className: "link"
            }, /*#__PURE__*/React.createElement(Link, {
              to: "/digit-ui/employee/fsm/registry/vendor-details/" + row.original["id"]
            }, /*#__PURE__*/React.createElement("div", null, row.original.name, /*#__PURE__*/React.createElement("br", null)))));
          }
        }, {
          Header: t("ES_FSM_REGISTRY_INBOX_DATE_VENDOR_CREATION"),
          accessor: "createdTime",
          Cell: ({
            row
          }) => {
            var _row$original, _row$original$auditDe, _row$original2, _row$original2$auditD;
            return GetCell((_row$original = row.original) !== null && _row$original !== void 0 && (_row$original$auditDe = _row$original.auditDetails) !== null && _row$original$auditDe !== void 0 && _row$original$auditDe.createdTime ? Digit.DateUtils.ConvertEpochToDate((_row$original2 = row.original) === null || _row$original2 === void 0 ? void 0 : (_row$original2$auditD = _row$original2.auditDetails) === null || _row$original2$auditD === void 0 ? void 0 : _row$original2$auditD.createdTime) : "");
          }
        }, {
          Header: t("ES_FSM_REGISTRY_INBOX_TOTAL_VEHICLES"),
          Cell: ({
            row,
            column
          }) => {
            var _row$original3, _row$original3$allVeh, _row$original5, _row$original5$allVeh, _row$original6, _row$original6$popup, _row$original7, _row$original7$popup, _row$original8, _row$original8$allVeh;
            return /*#__PURE__*/React.createElement("div", {
              className: "action-bar-wrap-registry",
              style: {
                position: "relative"
              }
            }, /*#__PURE__*/React.createElement("div", {
              className: (_row$original3 = row.original) !== null && _row$original3 !== void 0 && (_row$original3$allVeh = _row$original3.allVehicles) !== null && _row$original3$allVeh !== void 0 && _row$original3$allVeh.length ? "link" : "cell-text",
              style: {
                cursor: "pointer"
              },
              onClick: () => {
                var _row$original4, _row$original4$allVeh;
                return onCellClick(row, column, (_row$original4 = row.original) === null || _row$original4 === void 0 ? void 0 : (_row$original4$allVeh = _row$original4.allVehicles) === null || _row$original4$allVeh === void 0 ? void 0 : _row$original4$allVeh.length);
              }
            }, ((_row$original5 = row.original) === null || _row$original5 === void 0 ? void 0 : (_row$original5$allVeh = _row$original5.allVehicles) === null || _row$original5$allVeh === void 0 ? void 0 : _row$original5$allVeh.length) || 0, /*#__PURE__*/React.createElement("br", null)), row.id === ((_row$original6 = row.original) === null || _row$original6 === void 0 ? void 0 : (_row$original6$popup = _row$original6.popup) === null || _row$original6$popup === void 0 ? void 0 : _row$original6$popup.row) && column.id === ((_row$original7 = row.original) === null || _row$original7 === void 0 ? void 0 : (_row$original7$popup = _row$original7.popup) === null || _row$original7$popup === void 0 ? void 0 : _row$original7$popup.column) && /*#__PURE__*/React.createElement(Menu, {
              localeKeyPrefix: "",
              options: (_row$original8 = row.original) === null || _row$original8 === void 0 ? void 0 : (_row$original8$allVeh = _row$original8.allVehicles) === null || _row$original8$allVeh === void 0 ? void 0 : _row$original8$allVeh.map(data => data.registrationNumber),
              onSelect: action => onActionSelect(action, "VEHICLE")
            }));
          }
        }, {
          Header: t("ES_FSM_REGISTRY_INBOX_ACTIVE_VEHICLES"),
          disableSortBy: true,
          Cell: ({
            row,
            column
          }) => {
            var _row$original9, _row$original9$vehicl, _row$original11, _row$original11$vehic, _row$original12, _row$original12$popup, _row$original13, _row$original13$popup, _row$original14, _row$original14$vehic;
            return /*#__PURE__*/React.createElement("div", {
              className: "action-bar-wrap-registry",
              style: {
                position: "relative"
              }
            }, /*#__PURE__*/React.createElement("div", {
              className: (_row$original9 = row.original) !== null && _row$original9 !== void 0 && (_row$original9$vehicl = _row$original9.vehicles) !== null && _row$original9$vehicl !== void 0 && _row$original9$vehicl.length ? "link" : "cell-text",
              style: {
                cursor: "pointer"
              },
              onClick: () => {
                var _row$original10, _row$original10$vehic;
                return onCellClick(row, column, (_row$original10 = row.original) === null || _row$original10 === void 0 ? void 0 : (_row$original10$vehic = _row$original10.vehicles) === null || _row$original10$vehic === void 0 ? void 0 : _row$original10$vehic.length);
              }
            }, ((_row$original11 = row.original) === null || _row$original11 === void 0 ? void 0 : (_row$original11$vehic = _row$original11.vehicles) === null || _row$original11$vehic === void 0 ? void 0 : _row$original11$vehic.length) || 0, /*#__PURE__*/React.createElement("br", null)), row.id === ((_row$original12 = row.original) === null || _row$original12 === void 0 ? void 0 : (_row$original12$popup = _row$original12.popup) === null || _row$original12$popup === void 0 ? void 0 : _row$original12$popup.row) && column.id === ((_row$original13 = row.original) === null || _row$original13 === void 0 ? void 0 : (_row$original13$popup = _row$original13.popup) === null || _row$original13$popup === void 0 ? void 0 : _row$original13$popup.column) && /*#__PURE__*/React.createElement(Menu, {
              localeKeyPrefix: "",
              options: (_row$original14 = row.original) === null || _row$original14 === void 0 ? void 0 : (_row$original14$vehic = _row$original14.vehicles) === null || _row$original14$vehic === void 0 ? void 0 : _row$original14$vehic.map(data => data.registrationNumber),
              onSelect: action => onActionSelect(action, "VEHICLE")
            }));
          }
        }, {
          Header: t("ES_FSM_REGISTRY_INBOX_TOTAL_DRIVERS"),
          disableSortBy: true,
          Cell: ({
            row,
            column
          }) => {
            var _row$original15, _row$original15$drive, _row$original17, _row$original17$drive, _row$original18, _row$original18$popup, _row$original19, _row$original19$popup, _row$original20, _row$original20$drive;
            return /*#__PURE__*/React.createElement("div", {
              className: "action-bar-wrap-registry",
              style: {
                position: "relative"
              }
            }, /*#__PURE__*/React.createElement("div", {
              className: (_row$original15 = row.original) !== null && _row$original15 !== void 0 && (_row$original15$drive = _row$original15.drivers) !== null && _row$original15$drive !== void 0 && _row$original15$drive.length ? "link" : "cell-text",
              style: {
                cursor: "pointer"
              },
              onClick: () => {
                var _row$original16, _row$original16$drive;
                return onCellClick(row, column, (_row$original16 = row.original) === null || _row$original16 === void 0 ? void 0 : (_row$original16$drive = _row$original16.drivers) === null || _row$original16$drive === void 0 ? void 0 : _row$original16$drive.length);
              }
            }, ((_row$original17 = row.original) === null || _row$original17 === void 0 ? void 0 : (_row$original17$drive = _row$original17.drivers) === null || _row$original17$drive === void 0 ? void 0 : _row$original17$drive.length) || 0, /*#__PURE__*/React.createElement("br", null)), row.id === ((_row$original18 = row.original) === null || _row$original18 === void 0 ? void 0 : (_row$original18$popup = _row$original18.popup) === null || _row$original18$popup === void 0 ? void 0 : _row$original18$popup.row) && column.id === ((_row$original19 = row.original) === null || _row$original19 === void 0 ? void 0 : (_row$original19$popup = _row$original19.popup) === null || _row$original19$popup === void 0 ? void 0 : _row$original19$popup.column) && /*#__PURE__*/React.createElement(Menu, {
              localeKeyPrefix: "",
              options: (_row$original20 = row.original) === null || _row$original20 === void 0 ? void 0 : (_row$original20$drive = _row$original20.drivers) === null || _row$original20$drive === void 0 ? void 0 : _row$original20$drive.map(data => data.name),
              onSelect: action => {
                var _row$original21;
                return onActionSelect(action, "DRIVER", (_row$original21 = row.original) === null || _row$original21 === void 0 ? void 0 : _row$original21.drivers);
              }
            }));
          }
        }, {
          Header: t("ES_FSM_REGISTRY_INBOX_ACTIVE_DRIVERS"),
          disableSortBy: true,
          Cell: ({
            row,
            column
          }) => {
            var _row$original22, _row$original22$activ, _row$original24, _row$original24$activ, _row$original25, _row$original25$popup, _row$original26, _row$original26$popup, _row$original27, _row$original27$activ;
            return /*#__PURE__*/React.createElement("div", {
              className: "action-bar-wrap-registry",
              style: {
                position: "relative"
              }
            }, /*#__PURE__*/React.createElement("div", {
              className: (_row$original22 = row.original) !== null && _row$original22 !== void 0 && (_row$original22$activ = _row$original22.activeDrivers) !== null && _row$original22$activ !== void 0 && _row$original22$activ.length ? "link" : "cell-text",
              style: {
                cursor: "pointer"
              },
              onClick: () => {
                var _row$original23, _row$original23$activ;
                return onCellClick(row, column, (_row$original23 = row.original) === null || _row$original23 === void 0 ? void 0 : (_row$original23$activ = _row$original23.activeDrivers) === null || _row$original23$activ === void 0 ? void 0 : _row$original23$activ.length);
              }
            }, ((_row$original24 = row.original) === null || _row$original24 === void 0 ? void 0 : (_row$original24$activ = _row$original24.activeDrivers) === null || _row$original24$activ === void 0 ? void 0 : _row$original24$activ.length) || 0, /*#__PURE__*/React.createElement("br", null)), row.id === ((_row$original25 = row.original) === null || _row$original25 === void 0 ? void 0 : (_row$original25$popup = _row$original25.popup) === null || _row$original25$popup === void 0 ? void 0 : _row$original25$popup.row) && column.id === ((_row$original26 = row.original) === null || _row$original26 === void 0 ? void 0 : (_row$original26$popup = _row$original26.popup) === null || _row$original26$popup === void 0 ? void 0 : _row$original26$popup.column) && /*#__PURE__*/React.createElement(Menu, {
              localeKeyPrefix: "",
              options: (_row$original27 = row.original) === null || _row$original27 === void 0 ? void 0 : (_row$original27$activ = _row$original27.activeDrivers) === null || _row$original27$activ === void 0 ? void 0 : _row$original27$activ.map(data => data.name),
              onSelect: action => {
                var _row$original28;
                return onActionSelect(action, "DRIVER", (_row$original28 = row.original) === null || _row$original28 === void 0 ? void 0 : _row$original28.activeDrivers);
              }
            }));
          }
        }, {
          Header: t("ES_FSM_REGISTRY_INBOX_ENABLED"),
          disableSortBy: true,
          Cell: ({
            row
          }) => {
            var _row$original29, _row$original29$dsoDe;
            return /*#__PURE__*/React.createElement(ToggleSwitch, {
              style: {
                display: "flex",
                justifyContent: "left"
              },
              value: ((_row$original29 = row.original) === null || _row$original29 === void 0 ? void 0 : (_row$original29$dsoDe = _row$original29.dsoDetails) === null || _row$original29$dsoDe === void 0 ? void 0 : _row$original29$dsoDe.status) === "DISABLED" ? false : true,
              onChange: () => onVendorUpdate(row),
              name: `switch-${row.id}`
            });
          }
        }];
      case "VEHICLE":
        return [{
          Header: t("ES_FSM_REGISTRY_INBOX_VEHICLE_NAME"),
          disableSortBy: true,
          Cell: ({
            row
          }) => {
            return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
              className: "link"
            }, /*#__PURE__*/React.createElement(Link, {
              to: "/digit-ui/employee/fsm/registry/vehicle-details/" + row.original["registrationNumber"]
            }, /*#__PURE__*/React.createElement("div", null, row.original.registrationNumber, /*#__PURE__*/React.createElement("br", null)))));
          }
        }, {
          Header: t("ES_FSM_REGISTRY_INBOX_DATE_VEHICLE_CREATION"),
          accessor: "createdTime",
          Cell: ({
            row
          }) => {
            var _row$original30, _row$original30$audit, _row$original31, _row$original31$audit;
            return GetCell((_row$original30 = row.original) !== null && _row$original30 !== void 0 && (_row$original30$audit = _row$original30.auditDetails) !== null && _row$original30$audit !== void 0 && _row$original30$audit.createdTime ? Digit.DateUtils.ConvertEpochToDate((_row$original31 = row.original) === null || _row$original31 === void 0 ? void 0 : (_row$original31$audit = _row$original31.auditDetails) === null || _row$original31$audit === void 0 ? void 0 : _row$original31$audit.createdTime) : "");
          }
        }, {
          Header: t("ES_FSM_REGISTRY_INBOX_VENDOR_NAME"),
          disableSortBy: true,
          Cell: ({
            row
          }) => {
            var _row$original32, _row$original32$vendo;
            return GetCell(((_row$original32 = row.original) === null || _row$original32 === void 0 ? void 0 : (_row$original32$vendo = _row$original32.vendor) === null || _row$original32$vendo === void 0 ? void 0 : _row$original32$vendo.name) || "NA");
          }
        }, {
          Header: t("ES_FSM_REGISTRY_INBOX_ENABLED"),
          disableSortBy: true,
          Cell: ({
            row
          }) => {
            var _row$original33;
            return /*#__PURE__*/React.createElement(ToggleSwitch, {
              style: {
                display: "flex",
                justifyContent: "left"
              },
              value: ((_row$original33 = row.original) === null || _row$original33 === void 0 ? void 0 : _row$original33.status) === "DISABLED" ? false : true,
              onChange: () => onVehicleUpdate(row),
              name: `switch-${row.id}`
            });
          }
        }];
      case "DRIVER":
        return [{
          Header: t("ES_FSM_REGISTRY_INBOX_DRIVER_NAME"),
          disableSortBy: true,
          accessor: "tripDetails",
          Cell: ({
            row
          }) => {
            return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
              className: "link"
            }, /*#__PURE__*/React.createElement(Link, {
              to: "/digit-ui/employee/fsm/registry/driver-details/" + row.original["id"]
            }, /*#__PURE__*/React.createElement("div", null, row.original.name, /*#__PURE__*/React.createElement("br", null)))));
          }
        }, {
          Header: t("ES_FSM_REGISTRY_INBOX_DATE_DRIVER_CREATION"),
          accessor: "createdTime",
          Cell: ({
            row
          }) => {
            var _row$original34, _row$original34$audit, _row$original35, _row$original35$audit;
            return GetCell((_row$original34 = row.original) !== null && _row$original34 !== void 0 && (_row$original34$audit = _row$original34.auditDetails) !== null && _row$original34$audit !== void 0 && _row$original34$audit.createdTime ? Digit.DateUtils.ConvertEpochToDate((_row$original35 = row.original) === null || _row$original35 === void 0 ? void 0 : (_row$original35$audit = _row$original35.auditDetails) === null || _row$original35$audit === void 0 ? void 0 : _row$original35$audit.createdTime) : "");
          }
        }, {
          Header: t("ES_FSM_REGISTRY_INBOX_VENDOR_NAME"),
          Cell: ({
            row
          }) => {
            return /*#__PURE__*/React.createElement(Dropdown$2, {
              className: "fsm-registry-dropdown",
              selected: row.original.vendor,
              option: vendors,
              select: value => onVendorSelect(row, value),
              optionKey: "name",
              t: t
            });
          }
        }, {
          Header: t("ES_FSM_REGISTRY_INBOX_ENABLED"),
          disableSortBy: true,
          Cell: ({
            row
          }) => {
            var _row$original36;
            return /*#__PURE__*/React.createElement(ToggleSwitch, {
              style: {
                display: "flex",
                justifyContent: "left"
              },
              value: ((_row$original36 = row.original) === null || _row$original36 === void 0 ? void 0 : _row$original36.status) === "DISABLED" ? false : true,
              onChange: () => onDriverUpdate(row),
              name: `switch-${row.id}`
            });
          }
        }];
      default:
        return [];
    }
  }, [props.selectedTab, vendors]);
  let result;
  if (props.isLoading) {
    result = /*#__PURE__*/React.createElement(Loader, null);
  } else if (tableData.length === 0) {
    let emptyCardText = "";
    let emptyButtonText = "";
    if (props.selectedTab === "VENDOR") {
      emptyCardText = "ES_FSM_REGISTRY_EMPTY_CARD_VENDOR";
      emptyButtonText = "ES_FSM_REGISTRY_EMPTY_BUTTON_VENDOR";
    } else if (props.selectedTab === "VEHICLE") {
      emptyCardText = "ES_FSM_REGISTRY_EMPTY_CARD_VEHICLE";
      emptyButtonText = "ES_FSM_REGISTRY_EMPTY_BUTTON_VEHICLE";
    } else {
      emptyCardText = "ES_FSM_REGISTRY_EMPTY_CARD_DRIVER";
      emptyButtonText = "ES_FSM_REGISTRY_EMPTY_BUTTON_DRIVER";
    }
    result = /*#__PURE__*/React.createElement(Card, {
      style: {
        display: "flex",
        justifyContent: "center",
        minHeight: "250px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "50px",
        marginBottom: "25px"
      }
    }, t(emptyCardText)), /*#__PURE__*/React.createElement(SubmitBar, {
      className: "",
      label: t(emptyButtonText),
      onSubmit: onSelectAdd
    })));
  } else if (tableData.length > 0) {
    result = /*#__PURE__*/React.createElement(ApplicationTable, {
      className: "table registryTable",
      t: t,
      data: tableData,
      columns: columns,
      getCellProps: cellInfo => {
        return {
          style: {
            minWidth: cellInfo.column.Header === t("ES_INBOX_APPLICATION_NO") ? "240px" : "",
            padding: cellInfo.column.Header === t("ES_FSM_REGISTRY_INBOX_VENDOR_NAME") ? "10px 18px" : "20px 18px",
            fontSize: "16px"
          }
        };
      },
      onPageSizeChange: props.onPageSizeChange,
      currentPage: props.currentPage,
      onNextPage: props.onNextPage,
      onPrevPage: props.onPrevPage,
      pageSizeLimit: props.pageSizeLimit,
      onSort: props.onSort,
      disableSort: props.disableSort,
      sortParams: props.sortParams,
      totalRecords: props.totalRecords
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "inbox-container"
  }, props.userRole !== "FSM_EMP_FSTPO" && props.userRole !== "FSM_ADMIN" && !props.isSearch && /*#__PURE__*/React.createElement("div", {
    className: "filters-container"
  }, /*#__PURE__*/React.createElement(FSMLink, {
    parentRoute: props.parentRoute
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "24px"
    }
  }, /*#__PURE__*/React.createElement(Filter, {
    searchParams: props.searchParams,
    paginationParms: props.paginationParms,
    applications: props.data,
    onFilterChange: props.onFilterChange,
    type: "desktop"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      marginLeft: props.userRole === "FSM_ADMIN" ? "" : "24px"
    }
  }, /*#__PURE__*/React.createElement(SearchApplication$1, {
    onSearch: props.onSearch,
    type: "desktop",
    searchFields: props.searchFields,
    isInboxPage: !(props !== null && props !== void 0 && props.isSearch),
    searchParams: props.searchParams,
    onTabChange: props.onTabChange,
    selectedTab: props.selectedTab
  }), /*#__PURE__*/React.createElement("div", {
    className: "result",
    style: {
      marginLeft: FSTP || props.userRole === "FSM_ADMIN" ? "" : !(props !== null && props !== void 0 && props.isSearch) ? "24px" : "",
      flex: 1
    }
  }, result)), showToast && /*#__PURE__*/React.createElement(Toast, {
    error: showToast.key === "error" ? true : false,
    label: t(showToast.key === "success" ? `ES_FSM_REGISTRY_${showToast.action}_DISABLE_SUCCESS` : showToast.action),
    onClose: closeToast
  }));
};

const FSMRegistry = () => {
  var _sortParams$, _sortParams$2;
  const {
    t
  } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [searchParams, setSearchParams] = useState({});
  const [sortParams, setSortParams] = useState([{
    id: "createdTime",
    desc: true
  }]);
  const [pageOffset, setPageOffset] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [tab, setTab] = useState("VENDOR");
  const [vehicleIds, setVehicleIds] = useState("");
  const [driverIds, setDriverIds] = useState("");
  const [tableData, setTableData] = useState([]);
  const userInfo = Digit.UserService.getUser();
  let paginationParms = {
    limit: pageSize,
    offset: pageOffset,
    sortBy: sortParams === null || sortParams === void 0 ? void 0 : (_sortParams$ = sortParams[0]) === null || _sortParams$ === void 0 ? void 0 : _sortParams$.id,
    sortOrder: sortParams !== null && sortParams !== void 0 && (_sortParams$2 = sortParams[0]) !== null && _sortParams$2 !== void 0 && _sortParams$2.desc ? "DESC" : "ASC"
  };
  const {
    data: dsoData,
    isLoading: isLoading,
    isSuccess: isDsoSuccess,
    error: dsoError,
    refetch
  } = tab === "VEHICLE" ? Digit.Hooks.fsm.useVehiclesSearch({
    tenantId,
    filters: {
      ...paginationParms,
      registrationNumber: searchParams === null || searchParams === void 0 ? void 0 : searchParams.registrationNumber,
      status: "ACTIVE,DISABLED"
    },
    config: {
      enabled: false
    }
  }) : tab === "DRIVER" ? Digit.Hooks.fsm.useDriverSearch({
    tenantId,
    filters: {
      ...paginationParms,
      name: searchParams === null || searchParams === void 0 ? void 0 : searchParams.name,
      status: "ACTIVE,DISABLED"
    },
    config: {
      enabled: false
    }
  }) : Digit.Hooks.fsm.useVendorSearch({
    tenantId,
    filters: {
      ...paginationParms,
      name: searchParams === null || searchParams === void 0 ? void 0 : searchParams.name,
      status: "ACTIVE,DISABLED"
    },
    config: {
      enabled: false
    }
  });
  const {
    data: vendorData,
    isLoading: isVendorLoading,
    isSuccess: isVendorSuccess,
    error: vendorError,
    refetch: refetchVendor
  } = Digit.Hooks.fsm.useDsoSearch(tenantId, {
    vehicleIds: vehicleIds,
    driverIds: driverIds,
    status: "ACTIVE"
  }, {
    enabled: false
  });
  const inboxTotalCount = (dsoData === null || dsoData === void 0 ? void 0 : dsoData.totalCount) || 50;
  useEffect(() => {
    refetch();
  }, []);
  useEffect(() => {
    refetch();
  }, [searchParams, sortParams, pageOffset, pageSize]);
  useEffect(() => {
    if (dsoData !== null && dsoData !== void 0 && dsoData.vehicle && tab === "VEHICLE") {
      let vehicleIds = "";
      dsoData.vehicle.map(data => {
        vehicleIds += `${data.id},`;
      });
      setVehicleIds(vehicleIds);
      setTableData(dsoData.vehicle);
    }
    if (dsoData !== null && dsoData !== void 0 && dsoData.driver && tab === "DRIVER") {
      let driverIds = "";
      dsoData.driver.map(data => {
        driverIds += `${data.id},`;
      });
      setDriverIds(driverIds);
      setTableData(dsoData === null || dsoData === void 0 ? void 0 : dsoData.driver);
    }
    if (dsoData !== null && dsoData !== void 0 && dsoData.vendor && tab === "VENDOR") {
      const tableData = dsoData.vendor.map(dso => {
        var _dso$owner, _dso$drivers, _dso$vehicles, _dso$vehicles$filter;
        return {
          mobileNumber: (_dso$owner = dso.owner) === null || _dso$owner === void 0 ? void 0 : _dso$owner.mobileNumber,
          name: dso.name,
          id: dso.id,
          auditDetails: dso.auditDetails,
          drivers: dso.drivers,
          activeDrivers: (_dso$drivers = dso.drivers) === null || _dso$drivers === void 0 ? void 0 : _dso$drivers.filter(driver => driver.status === "ACTIVE"),
          allVehicles: dso.vehicles,
          dsoDetails: dso,
          vehicles: (_dso$vehicles = dso.vehicles) === null || _dso$vehicles === void 0 ? void 0 : (_dso$vehicles$filter = _dso$vehicles.filter(vehicle => vehicle.status === "ACTIVE")) === null || _dso$vehicles$filter === void 0 ? void 0 : _dso$vehicles$filter.map(vehicle => ({
            id: vehicle.id,
            registrationNumber: vehicle === null || vehicle === void 0 ? void 0 : vehicle.registrationNumber,
            type: vehicle.type,
            i18nKey: `FSM_VEHICLE_TYPE_${vehicle.type}`,
            capacity: vehicle.tankCapacity,
            suctionType: vehicle.suctionType,
            model: vehicle.model
          }))
        };
      });
      setTableData(tableData);
    }
  }, [dsoData]);
  useEffect(() => {
    if (vehicleIds !== "" || driverIds !== "") refetchVendor();
  }, [vehicleIds, driverIds]);
  useEffect(() => {
    if (vendorData) {
      if (tab === "VEHICLE") {
        const vehicles = dsoData === null || dsoData === void 0 ? void 0 : dsoData.vehicle.map(data => {
          let vendor = vendorData.find(ele => {
            var _ele$dsoDetails, _ele$dsoDetails$vehic;
            return (_ele$dsoDetails = ele.dsoDetails) === null || _ele$dsoDetails === void 0 ? void 0 : (_ele$dsoDetails$vehic = _ele$dsoDetails.vehicles) === null || _ele$dsoDetails$vehic === void 0 ? void 0 : _ele$dsoDetails$vehic.find(vehicle => vehicle.id === data.id);
          });
          if (vendor) {
            data.vendor = vendor.dsoDetails;
          }
          return data;
        });
        setTableData(vehicles);
        setVehicleIds("");
      }
      if (tab === "DRIVER") {
        const drivers = dsoData === null || dsoData === void 0 ? void 0 : dsoData.driver.map(data => {
          let vendor = vendorData.find(ele => {
            var _ele$dsoDetails2, _ele$dsoDetails2$driv;
            return (_ele$dsoDetails2 = ele.dsoDetails) === null || _ele$dsoDetails2 === void 0 ? void 0 : (_ele$dsoDetails2$driv = _ele$dsoDetails2.drivers) === null || _ele$dsoDetails2$driv === void 0 ? void 0 : _ele$dsoDetails2$driv.find(driver => driver.id === data.id);
          });
          if (vendor) {
            data.vendor = vendor.dsoDetails;
          }
          return data;
        });
        setTableData(drivers);
        setDriverIds("");
      }
    }
  }, [vendorData, dsoData]);
  const onSearch = (params = {}) => {
    setSearchParams({
      ...params
    });
  };
  const fetchNextPage = () => {
    setPageOffset(prevState => prevState + pageSize);
  };
  const fetchPrevPage = () => {
    setPageOffset(prevState => prevState - pageSize);
  };
  const handlePageSizeChange = e => {
    setPageSize(Number(e.target.value));
  };
  const handleFilterChange = () => {};
  const searchFields = tab === "VEHICLE" ? [{
    label: t("ES_FSM_REGISTRY_SEARCH_VEHICLE_NUMBER"),
    name: "registrationNumber",
    pattern: `[A-Z]{2}\\s{1}[0-9]{2}\\s{0,1}[A-Z]{1,2}\\s{1}[0-9]{4}`,
    title: t("ES_FSM_VEHICLE_FORMAT_TIP")
  }] : tab === "DRIVER" ? [{
    label: t("ES_FSM_REGISTRY_SEARCH_DRIVER_NAME"),
    name: "name"
  }] : [{
    label: t("ES_FSM_REGISTRY_SEARCH_VENDOR_NAME"),
    name: "name"
  }];
  const handleSort = useCallback(args => {
    if ((args === null || args === void 0 ? void 0 : args.length) === 0) return;
    setSortParams(args);
  }, []);
  const onTabChange = tab => {
    setTab(tab);
  };
  const refetchData = () => {
    refetch();
  };
  const refetchVendorData = () => {
    refetchVendor();
  };
  useEffect(() => {
    refetch();
    refetchVendor();
  }, []);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Header, null, t("ES_FSM_REGISTRY")), /*#__PURE__*/React.createElement(RegisryInbox, {
    data: {
      table: tableData
    },
    isLoading: isLoading || isVendorLoading,
    onSort: handleSort,
    disableSort: false,
    sortParams: sortParams,
    userRole: "FSM_ADMIN",
    onFilterChange: handleFilterChange,
    searchFields: searchFields,
    onSearch: onSearch,
    onNextPage: fetchNextPage,
    onPrevPage: fetchPrevPage,
    currentPage: Math.floor(pageOffset / pageSize),
    pageSizeLimit: pageSize,
    onPageSizeChange: handlePageSizeChange,
    totalRecords: inboxTotalCount || 0,
    onTabChange: onTabChange,
    selectedTab: tab,
    refetchData: refetchData,
    refetchVendor: refetchVendorData
  }));
};

const ConfirmationBox = ({
  t,
  title
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "confirmation_box"
  }, /*#__PURE__*/React.createElement("span", null, t(`${title}`), " "));
};

const Heading$1 = props => {
  return /*#__PURE__*/React.createElement("h1", {
    className: "heading-m"
  }, props.label);
};
const Close$1 = () => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "#FFFFFF"
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0V0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
}));
const CloseBtn$1 = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "icon-bg-secondary",
    onClick: props.onClick
  }, /*#__PURE__*/React.createElement(Close$1, null));
};
const VendorDetails = props => {
  var _dsoData$4, _dsoData$4$employeeRe;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const state = Digit.ULBService.getStateId();
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const queryClient = useQueryClient();
  let {
    id: dsoId
  } = useParams();
  const [displayMenu, setDisplayMenu] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [config, setCurrentConfig] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const {
    data: dsoData,
    isLoading: isLoading,
    isSuccess: isDsoSuccess,
    error: dsoError,
    refetch: refetchDso
  } = Digit.Hooks.fsm.useDsoSearch(tenantId, {
    ids: dsoId
  }, {
    staleTime: Infinity
  });
  const {
    data: vehicleData,
    isLoading: isVehicleDataLoading,
    isSuccess: isVehicleSuccess,
    error: vehicleError,
    refetch: refetchVehicle
  } = Digit.Hooks.fsm.useVehiclesSearch({
    tenantId,
    filters: {
      status: "ACTIVE",
      sortBy: "registrationNumber",
      sortOrder: "ASC",
      vehicleWithNoVendor: true
    }
  });
  const {
    data: driverData,
    isLoading: isDriverDataLoading,
    isSuccess: isDriverSuccess,
    error: driverError,
    refetch: refetchDriver
  } = Digit.Hooks.fsm.useDriverSearch({
    tenantId,
    filters: {
      sortBy: "name",
      sortOrder: "ASC",
      status: "ACTIVE",
      driverWithNoVendor: true
    }
  });
  const {
    isLoading: isUpdateLoading,
    isError: vendorCreateError,
    data: updateResponse,
    error: updateError,
    mutate
  } = Digit.Hooks.fsm.useVendorUpdate(tenantId);
  function onActionSelect(action) {
    setDisplayMenu(false);
    setSelectedAction(action);
  }
  useEffect(() => {
    switch (selectedAction) {
      case "DELETE":
      case "ADD_VEHICLE":
      case "ADD_DRIVER":
        return setShowModal(true);
      case "EDIT":
        return history.push("/digit-ui/employee/fsm/registry/modify-vendor/" + dsoId);
    }
  }, [selectedAction]);
  useEffect(() => {
    if (vehicleData) setVehicles((vehicleData === null || vehicleData === void 0 ? void 0 : vehicleData.vehicle) || []);
  }, [vehicleData]);
  useEffect(() => {
    if (driverData) setDrivers((driverData === null || driverData === void 0 ? void 0 : driverData.driver) || []);
  }, [driverData]);
  const closeToast = () => {
    setShowToast(null);
  };
  const closeModal = () => {
    setSelectedAction(null);
    setSelectedOption({});
    setShowModal(false);
  };
  const handleVendorUpdate = () => {
    var _dsoData$;
    let dsoDetails = dsoData === null || dsoData === void 0 ? void 0 : (_dsoData$ = dsoData[0]) === null || _dsoData$ === void 0 ? void 0 : _dsoData$.dsoDetails;
    let formData = {};
    if (selectedAction === "DELETE") {
      formData = {
        vendor: {
          ...dsoDetails,
          status: "INACTIVE"
        }
      };
    }
    if (selectedAction === "ADD_VEHICLE") {
      let selectedVehicle = selectedOption;
      selectedVehicle.vendorVehicleStatus = "ACTIVE";
      formData = {
        vendor: {
          ...dsoDetails,
          vehicles: dsoDetails.vehicles ? [...dsoDetails.vehicles, selectedVehicle] : [selectedVehicle]
        }
      };
    }
    if (selectedAction === "ADD_DRIVER") {
      let selectedDriver = selectedOption;
      selectedDriver.vendorDriverStatus = "ACTIVE";
      formData = {
        vendor: {
          ...dsoDetails,
          drivers: dsoDetails.drivers ? [...dsoDetails.drivers, selectedDriver] : [selectedDriver]
        }
      };
    }
    mutate(formData, {
      onError: (error, variables) => {
        setShowToast({
          key: "error",
          action: error
        });
        setTimeout(closeToast, 5000);
      },
      onSuccess: (data, variables) => {
        setShowToast({
          key: "success",
          action: selectedAction === "DELETE" ? "DELETE_VENDOR" : selectedAction
        });
        queryClient.invalidateQueries("DSO_SEARCH");
        refetchDso();
        refetchVehicle();
        refetchDriver();
        setTimeout(() => {
          closeToast();
          if (selectedAction === "DELETE") history.push(`/digit-ui/employee/fsm/registry`);
        }, 5000);
      }
    });
    setShowModal(false);
    setSelectedAction(null);
  };
  const onEdit = (details, type, id) => {
    if (type === "ES_FSM_REGISTRY_DETAILS_TYPE_DRIVER") {
      history.push("/digit-ui/employee/fsm/registry/modify-driver/" + id);
    } else {
      var _details$values, _details$values$find;
      let registrationNumber = details === null || details === void 0 ? void 0 : (_details$values = details.values) === null || _details$values === void 0 ? void 0 : (_details$values$find = _details$values.find(ele => ele.title === "ES_FSM_REGISTRY_VEHICLE_NUMBER")) === null || _details$values$find === void 0 ? void 0 : _details$values$find.value;
      history.push("/digit-ui/employee/fsm/registry/modify-vehicle/" + registrationNumber);
    }
  };
  const onDelete = (details, type, id) => {
    let formData = {};
    if (type === "ES_FSM_REGISTRY_DETAILS_TYPE_DRIVER") {
      var _dsoData$2;
      let dsoDetails = dsoData === null || dsoData === void 0 ? void 0 : (_dsoData$2 = dsoData[0]) === null || _dsoData$2 === void 0 ? void 0 : _dsoData$2.dsoDetails;
      let drivers = dsoDetails === null || dsoDetails === void 0 ? void 0 : dsoDetails.drivers;
      drivers = drivers.map(data => {
        if (data.id === id) {
          data.vendorDriverStatus = "INACTIVE";
        }
        return data;
      });
      formData = {
        vendor: {
          ...dsoDetails,
          drivers: drivers
        }
      };
    } else {
      var _dsoData$3, _details$values2, _details$values2$find;
      let dsoDetails = dsoData === null || dsoData === void 0 ? void 0 : (_dsoData$3 = dsoData[0]) === null || _dsoData$3 === void 0 ? void 0 : _dsoData$3.dsoDetails;
      let vehicles = dsoDetails === null || dsoDetails === void 0 ? void 0 : dsoDetails.vehicles;
      let registrationNumber = details === null || details === void 0 ? void 0 : (_details$values2 = details.values) === null || _details$values2 === void 0 ? void 0 : (_details$values2$find = _details$values2.find(ele => ele.title === "ES_FSM_REGISTRY_VEHICLE_NUMBER")) === null || _details$values2$find === void 0 ? void 0 : _details$values2$find.value;
      vehicles = vehicles.map(data => {
        if (data.registrationNumber === registrationNumber) {
          data.vendorVehicleStatus = "INACTIVE";
        }
        return data;
      });
      formData = {
        vendor: {
          ...dsoDetails,
          vehicles: vehicles
        }
      };
    }
    mutate(formData, {
      onError: (error, variables) => {
        setShowToast({
          key: "error",
          action: error
        });
        setTimeout(closeToast, 5000);
      },
      onSuccess: (data, variables) => {
        setShowToast({
          key: "success",
          action: type === "ES_FSM_REGISTRY_DETAILS_TYPE_DRIVER" ? "DELETE_DRIVER" : "DELETE_VEHICLE"
        });
        queryClient.invalidateQueries("DSO_SEARCH");
        refetchDso();
        refetchVehicle();
        refetchDriver();
        setTimeout(() => {
          closeToast();
        }, 5000);
      }
    });
  };
  const renderModalContent = () => {
    if (selectedAction === "DELETE") {
      return /*#__PURE__*/React.createElement(ConfirmationBox, {
        t: t,
        title: "ES_FSM_REGISTRY_DELETE_TEXT"
      });
    }
    if (selectedAction === "ADD_VEHICLE") {
      return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(CardText, null, t(`ES_FSM_REGISTRY_SELECT_VEHICLE`)), /*#__PURE__*/React.createElement(Dropdown$2, {
        t: t,
        option: vehicles,
        value: selectedOption,
        selected: selectedOption,
        select: setSelectedOption,
        optionKey: "registrationNumber"
      }));
    }
    if (selectedAction === "ADD_DRIVER") {
      return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(CardText, null, t(`ES_FSM_REGISTRY_SELECT_DRIVER`)), /*#__PURE__*/React.createElement(Dropdown$2, {
        t: t,
        option: drivers,
        value: selectedOption,
        selected: selectedOption,
        select: setSelectedOption,
        optionKey: "name"
      }));
    }
  };
  const isMobile = window.Digit.Utils.browser.isMobile();
  if (isLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, !isLoading ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Header, {
    style: {
      marginBottom: "16px"
    }
  }, t("ES_FSM_REGISTRY_VENDOR_DETAILS")), /*#__PURE__*/React.createElement("div", {
    style: !isMobile ? {
      marginLeft: "-15px"
    } : {}
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      position: "relative"
    }
  }, dsoData === null || dsoData === void 0 ? void 0 : (_dsoData$4 = dsoData[0]) === null || _dsoData$4 === void 0 ? void 0 : (_dsoData$4$employeeRe = _dsoData$4.employeeResponse) === null || _dsoData$4$employeeRe === void 0 ? void 0 : _dsoData$4$employeeRe.map((detail, index) => {
    var _detail$values, _detail$child;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: index
    }, index > 0 && /*#__PURE__*/React.createElement(CardSectionHeader, {
      style: {
        marginBottom: "16px",
        marginTop: "32px"
      }
    }, t(detail.title)), /*#__PURE__*/React.createElement("div", {
      style: !isMobile ? {
        marginLeft: "-15px"
      } : {}
    }, /*#__PURE__*/React.createElement(StatusTable, null, detail === null || detail === void 0 ? void 0 : (_detail$values = detail.values) === null || _detail$values === void 0 ? void 0 : _detail$values.map((value, index) => {
      var _detail$values2;
      return /*#__PURE__*/React.createElement(Row, {
        key: t(value.title),
        label: t(value.title),
        text: t(value.value) || "N/A",
        last: index === (detail === null || detail === void 0 ? void 0 : (_detail$values2 = detail.values) === null || _detail$values2 === void 0 ? void 0 : _detail$values2.length) - 1,
        caption: value.caption,
        className: `border-none ${!isMobile ? "vendor-details-row" : ""}`
      });
    }), detail === null || detail === void 0 ? void 0 : (_detail$child = detail.child) === null || _detail$child === void 0 ? void 0 : _detail$child.map((data, index) => {
      var _data$values;
      return /*#__PURE__*/React.createElement(Card, {
        className: "card-with-background"
      }, /*#__PURE__*/React.createElement("div", {
        className: "card-head"
      }, /*#__PURE__*/React.createElement("h2", null, t(detail.type), " ", index + 1), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex"
        }
      }, /*#__PURE__*/React.createElement("span", {
        onClick: () => onEdit(data, detail.type, data.id)
      }, /*#__PURE__*/React.createElement(EditIcon, {
        style: {
          cursor: "pointer",
          marginRight: "20px"
        },
        className: "edit",
        fill: "#a82227"
      })), /*#__PURE__*/React.createElement("span", {
        onClick: () => onDelete(data, detail.type, data.id)
      }, /*#__PURE__*/React.createElement(DeleteIcon, {
        style: {
          cursor: "pointer"
        },
        className: "delete",
        fill: "#a82227"
      })))), data === null || data === void 0 ? void 0 : (_data$values = data.values) === null || _data$values === void 0 ? void 0 : _data$values.map((value, index) => {
        var _detail$values3;
        return /*#__PURE__*/React.createElement(Row, {
          key: t(value.title),
          label: t(value.title),
          text: t(value.value) || "N/A",
          last: index === (detail === null || detail === void 0 ? void 0 : (_detail$values3 = detail.values) === null || _detail$values3 === void 0 ? void 0 : _detail$values3.length) - 1,
          caption: value.caption,
          className: "border-none",
          textStyle: value.value === "ACTIVE" ? {
            color: "green"
          } : {}
        });
      }));
    }), detail.type && /*#__PURE__*/React.createElement("div", {
      style: {
        color: "#a82227",
        cursor: "pointer",
        marginLeft: "16px"
      },
      onClick: () => onActionSelect(detail.type === "ES_FSM_REGISTRY_DETAILS_TYPE_DRIVER" ? "ADD_DRIVER" : "ADD_VEHICLE")
    }, t(`${detail.type}_ADD`)))));
  }))), showModal && /*#__PURE__*/React.createElement(Modal, {
    headerBarMain: /*#__PURE__*/React.createElement(Heading$1, {
      label: t(selectedAction === "DELETE" ? "ES_FSM_REGISTRY_DELETE_POPUP_HEADER" : selectedAction === "ADD_VEHICLE" ? "ES_FSM_REGISTRY_ADD_VEHICLE_POPUP_HEADER" : "ES_FSM_REGISTRY_ADD_DRIVER_POPUP_HEADER")
    }),
    headerBarEnd: /*#__PURE__*/React.createElement(CloseBtn$1, {
      onClick: closeModal
    }),
    actionCancelLabel: t("CS_COMMON_CANCEL"),
    actionCancelOnSubmit: closeModal,
    actionSaveLabel: t(selectedAction === "DELETE" ? "ES_EVENT_DELETE" : "CS_COMMON_SUBMIT"),
    actionSaveOnSubmit: handleVendorUpdate
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      boxShadow: "none"
    }
  }, renderModalContent())), showToast && /*#__PURE__*/React.createElement(Toast, {
    error: showToast.key === "error" ? true : false,
    label: t(showToast.key === "success" ? `ES_FSM_REGISTRY_${showToast.action}_SUCCESS` : showToast.action),
    onClose: closeToast
  }), /*#__PURE__*/React.createElement(ActionBar, {
    style: {
      zIndex: "19"
    }
  }, displayMenu ? /*#__PURE__*/React.createElement(Menu, {
    localeKeyPrefix: "ES_FSM_REGISTRY_ACTION",
    options: ["EDIT", "DELETE"],
    t: t,
    onSelect: onActionSelect
  }) : null, /*#__PURE__*/React.createElement(SubmitBar, {
    label: t("ES_COMMON_TAKE_ACTION"),
    onSubmit: () => setDisplayMenu(!displayMenu)
  }))) : /*#__PURE__*/React.createElement(Loader, null));
};

const {
  DatePicker,
  Dropdown
} = require("@egovernments/digit-ui-react-components");
const VendorConfig = (t, disabled = false) => {
  return [{
    head: "ES_FSM_REGISTRY_NEW_VENDOR_DETAILS",
    body: [{
      label: "ES_FSM_REGISTRY_NEW_VENDOR_NAME",
      isMandatory: true,
      type: "text",
      disable: disabled,
      populators: {
        name: "vendorName",
        validation: {
          required: true,
          pattern: /^[A-Za-z]/
        },
        error: t("FSM_REGISTRY_INVALID_NAME"),
        defaultValue: "",
        className: "payment-form-text-input-correction"
      }
    }]
  }, {
    head: "ES_FSM_REGISTRY_PERSONAL_DETAILS",
    body: [{
      label: "ES_FSM_REGISTRY_NEW_GENDER",
      isMandatory: true,
      type: "component",
      route: "select-gender",
      hideInEmployee: false,
      key: "selectGender",
      component: "SelectGender",
      disable: disabled,
      texts: {
        headerCaption: "",
        header: "CS_COMMON_CHOOSE_GENDER",
        cardText: "CS_COMMON_SELECT_GENDER",
        submitBarLabel: "CS_COMMON_NEXT",
        skipText: "CORE_COMMON_SKIP_CONTINUE"
      }
    }, {
      label: t("ES_FSM_REGISTRY_NEW_DOB"),
      isMandatory: false,
      type: "custom",
      key: "dob",
      populators: {
        name: "dob",
        validation: {
          required: true
        },
        component: (props, customProps) => /*#__PURE__*/React.createElement(DatePicker, Object.assign({
          onChange: props.onChange,
          date: props.value
        }, customProps, {
          max: convertEpochToDate(new Date().setFullYear(new Date().getFullYear()))
        }))
      }
    }, {
      label: "ES_FSM_REGISTRY_NEW_EMAIL",
      isMandatory: false,
      type: "text",
      key: "emailId",
      populators: {
        name: "emailId",
        validation: {
          required: false,
          pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9.-]+$/
        },
        error: t("FSM_REGISTRY_INVALID_EMAIL"),
        defaultValue: "",
        className: "payment-form-text-input-correction"
      }
    }, {
      label: "ES_FSM_REGISTRY_NEW_VENDOR_PHONE",
      isMandatory: true,
      type: "mobileNumber",
      key: "phone",
      disable: disabled,
      populators: {
        name: "phone",
        validation: {
          required: true,
          pattern: /^[6-9]\d{9}$/
        },
        labelStyle: {
          border: "1px solid black",
          borderRight: "none"
        },
        error: t("FSM_REGISTRY_INVALID_PHONE"),
        defaultValue: "",
        className: "payment-form-text-input-correction"
      }
    }]
  }, {
    head: "ES_FSM_REGISTRY_NEW_ADDRESS_DETAILS",
    body: [{
      label: "ES_FSM_REGISTRY_NEW_DOOR",
      isMandatory: false,
      type: "text",
      key: "doorNo",
      populators: {
        name: "doorNo",
        defaultValue: "",
        className: "payment-form-text-input-correction"
      }
    }, {
      label: "ES_FSM_REGISTRY_NEW_PLOT",
      isMandatory: false,
      type: "text",
      key: "plotNo",
      populators: {
        name: "plotNo",
        defaultValue: "",
        className: "payment-form-text-input-correction"
      }
    }, {
      label: "ES_FSM_REGISTRY_NEW_BUILDING_NAME",
      isMandatory: false,
      type: "text",
      key: "buildingName",
      populators: {
        name: "buildingName",
        defaultValue: "",
        className: "payment-form-text-input-correction"
      }
    }, {
      label: "ES_FSM_REGISTRY_NEW_STREET",
      isMandatory: false,
      type: "text",
      key: "street",
      populators: {
        name: "street",
        defaultValue: "",
        className: "payment-form-text-input-correction"
      }
    }, {
      label: "ES_FSM_REGISTRY_NEW_PINCODE",
      isMandatory: false,
      type: "text",
      key: "pincode",
      populators: {
        name: "pincode",
        validation: {
          required: false,
          pattern: /^[1-9][0-9]{5}$/
        },
        error: t("FSM_REGISTRY_INVALID_PINCODE"),
        defaultValue: "",
        className: "payment-form-text-input-correction"
      }
    }, {
      route: "address",
      component: "FSMSelectAddress",
      withoutLabel: true,
      texts: {
        headerCaption: "CS_FILE_APPLICATION_PROPERTY_LOCATION_LABEL",
        header: "CS_FILE_APPLICATION_PROPERTY_LOCATION_ADDRESS_TEXT",
        cardText: "CS_FILE_APPLICATION_PROPERTY_LOCATION_CITY_MOHALLA_TEXT",
        submitBarLabel: "CS_COMMON_NEXT"
      },
      key: "address",
      isMandatory: true,
      type: "component"
    }, {
      label: "ES_FSM_REGISTRY_NEW_LANDMARK",
      isMandatory: false,
      type: "text",
      key: "landmark",
      populators: {
        name: "landmark",
        defaultValue: "",
        className: "payment-form-text-input-correction"
      }
    }]
  }, {
    head: "",
    body: [{
      label: "ES_FSM_REGISTRY_NEW_VENDOR_ADDITIONAL_DETAILS",
      isMandatory: false,
      type: "textarea",
      key: "additionalDetails",
      populators: {
        name: "additionalDetails",
        className: "payment-form-text-input-correction"
      }
    }]
  }];
};

const AddVendor = ({
  parentUrl,
  heading
}) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  const [showToast, setShowToast] = useState(null);
  const history = useHistory();
  const queryClient = useQueryClient();
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("FSM_MUTATION_HAPPENED", false);
  const [errorInfo, setErrorInfo, clearError] = Digit.Hooks.useSessionStorage("FSM_ERROR_DATA", false);
  const [successData, setsuccessData, clearSuccessData] = Digit.Hooks.useSessionStorage("FSM_MUTATION_SUCCESS_DATA", false);
  const {
    isLoading: isLoading,
    isError: vendorCreateError,
    data: updateResponse,
    error: updateError,
    mutate
  } = Digit.Hooks.fsm.useVendorCreate(tenantId);
  useEffect(() => {
    setMutationHappened(false);
    clearSuccessData();
    clearError();
  }, []);
  const {
    t
  } = useTranslation();
  const Config = VendorConfig(t);
  const [canSubmit, setSubmitValve] = useState(false);
  const defaultValues = {
    tripData: {
      noOfTrips: 1,
      amountPerTrip: null,
      amount: null
    }
  };
  const onFormValueChange = (setValue, formData) => {
    var _formData$address;
    if (formData !== null && formData !== void 0 && formData.vendorName && formData !== null && formData !== void 0 && formData.phone && formData !== null && formData !== void 0 && (_formData$address = formData.address) !== null && _formData$address !== void 0 && _formData$address.locality && formData !== null && formData !== void 0 && formData.selectGender) {
      setSubmitValve(true);
    } else {
      setSubmitValve(false);
    }
  };
  const closeToast = () => {
    setShowToast(null);
  };
  const onSubmit = data => {
    var _data$street, _data$doorNo, _data$plotNo, _data$landmark, _data$address, _data$address$city, _data$address2, _data$address2$city, _data$address3, _data$address3$city, _data$address4, _data$address4$city, _data$buildingName, _data$address5, _data$address5$locali, _data$address6, _data$address6$locali, _data$address7, _data$address7$locali, _data$selectGender, _data$address8, _data$address9;
    const name = data === null || data === void 0 ? void 0 : data.vendorName;
    const pincode = data === null || data === void 0 ? void 0 : data.pincode;
    const street = data === null || data === void 0 ? void 0 : (_data$street = data.street) === null || _data$street === void 0 ? void 0 : _data$street.trim();
    const doorNo = data === null || data === void 0 ? void 0 : (_data$doorNo = data.doorNo) === null || _data$doorNo === void 0 ? void 0 : _data$doorNo.trim();
    const plotNo = data === null || data === void 0 ? void 0 : (_data$plotNo = data.plotNo) === null || _data$plotNo === void 0 ? void 0 : _data$plotNo.trim();
    const landmark = data === null || data === void 0 ? void 0 : (_data$landmark = data.landmark) === null || _data$landmark === void 0 ? void 0 : _data$landmark.trim();
    const city = data === null || data === void 0 ? void 0 : (_data$address = data.address) === null || _data$address === void 0 ? void 0 : (_data$address$city = _data$address.city) === null || _data$address$city === void 0 ? void 0 : _data$address$city.name;
    const state = data === null || data === void 0 ? void 0 : (_data$address2 = data.address) === null || _data$address2 === void 0 ? void 0 : (_data$address2$city = _data$address2.city) === null || _data$address2$city === void 0 ? void 0 : _data$address2$city.state;
    const district = data === null || data === void 0 ? void 0 : (_data$address3 = data.address) === null || _data$address3 === void 0 ? void 0 : (_data$address3$city = _data$address3.city) === null || _data$address3$city === void 0 ? void 0 : _data$address3$city.name;
    const region = data === null || data === void 0 ? void 0 : (_data$address4 = data.address) === null || _data$address4 === void 0 ? void 0 : (_data$address4$city = _data$address4.city) === null || _data$address4$city === void 0 ? void 0 : _data$address4$city.name;
    const buildingName = data === null || data === void 0 ? void 0 : (_data$buildingName = data.buildingName) === null || _data$buildingName === void 0 ? void 0 : _data$buildingName.trim();
    const localityCode = data === null || data === void 0 ? void 0 : (_data$address5 = data.address) === null || _data$address5 === void 0 ? void 0 : (_data$address5$locali = _data$address5.locality) === null || _data$address5$locali === void 0 ? void 0 : _data$address5$locali.code;
    const localityName = data === null || data === void 0 ? void 0 : (_data$address6 = data.address) === null || _data$address6 === void 0 ? void 0 : (_data$address6$locali = _data$address6.locality) === null || _data$address6$locali === void 0 ? void 0 : _data$address6$locali.name;
    const localityArea = data === null || data === void 0 ? void 0 : (_data$address7 = data.address) === null || _data$address7 === void 0 ? void 0 : (_data$address7$locali = _data$address7.locality) === null || _data$address7$locali === void 0 ? void 0 : _data$address7$locali.area;
    const gender = data === null || data === void 0 ? void 0 : (_data$selectGender = data.selectGender) === null || _data$selectGender === void 0 ? void 0 : _data$selectGender.code;
    const emailId = data === null || data === void 0 ? void 0 : data.emailId;
    const phone = data === null || data === void 0 ? void 0 : data.phone;
    const dob = new Date(`${data.dob}`).getTime() || new Date(`1/1/1970`).getTime();
    const additionalDetails = data === null || data === void 0 ? void 0 : data.additionalDetails;
    const formData = {
      vendor: {
        tenantId: tenantId,
        name,
        agencyType: "ULB",
        paymentPreference: "post-service",
        address: {
          tenantId: tenantId,
          landmark,
          doorNo,
          plotNo,
          street,
          city,
          district,
          region,
          state,
          country: "in",
          pincode,
          buildingName,
          locality: {
            code: localityCode || "",
            name: localityName || "",
            label: "Locality",
            area: localityArea || ""
          },
          geoLocation: {
            latitude: (data === null || data === void 0 ? void 0 : (_data$address8 = data.address) === null || _data$address8 === void 0 ? void 0 : _data$address8.latitude) || 0,
            longitude: (data === null || data === void 0 ? void 0 : (_data$address9 = data.address) === null || _data$address9 === void 0 ? void 0 : _data$address9.longitude) || 0
          }
        },
        owner: {
          tenantId: stateId,
          name: name,
          fatherOrHusbandName: name,
          relationship: "OTHER",
          gender: gender,
          dob: dob,
          emailId: emailId || "abc@egov.com",
          mobileNumber: phone
        },
        additionalDetails: {
          description: additionalDetails
        },
        vehicle: [],
        drivers: [],
        source: "WhatsApp"
      }
    };
    mutate(formData, {
      onError: (error, variables) => {
        setShowToast({
          key: "error",
          action: error
        });
        setTimeout(closeToast, 5000);
      },
      onSuccess: (data, variables) => {
        setShowToast({
          key: "success",
          action: "ADD_VENDOR"
        });
        setTimeout(closeToast, 5000);
        queryClient.invalidateQueries("DSO_SEARCH");
        setTimeout(() => {
          closeToast();
          history.push(`/digit-ui/employee/fsm/registry`);
        }, 5000);
      }
    });
  };
  const isMobile = window.Digit.Utils.browser.isMobile();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Header, null, t("ES_FSM_REGISTRY_TITLE_NEW_VENDOR"))), /*#__PURE__*/React.createElement("div", {
    style: !isMobile ? {
      marginLeft: "-15px"
    } : {}
  }, /*#__PURE__*/React.createElement(FormComposer, {
    isDisabled: !canSubmit,
    label: t("ES_COMMON_APPLICATION_SUBMIT"),
    config: Config.filter(i => !i.hideInEmployee).map(config => {
      return {
        ...config,
        body: config.body.filter(a => !a.hideInEmployee)
      };
    }),
    fieldStyle: {
      marginRight: 0
    },
    onSubmit: onSubmit,
    defaultValues: defaultValues,
    onFormValueChange: onFormValueChange,
    noBreakLine: true
  }), showToast && /*#__PURE__*/React.createElement(Toast, {
    error: showToast.key === "error" ? true : false,
    label: t(showToast.key === "success" ? `ES_FSM_REGISTRY_${showToast.action}_SUCCESS` : showToast.action),
    onClose: closeToast
  })));
};

const EditVendor = ({
  parentUrl,
  heading
}) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  let {
    id: dsoId
  } = useParams();
  const [showToast, setShowToast] = useState(null);
  const [canSubmit, setSubmitValve] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});
  const [dsoDetails, setDsoDetails] = useState({});
  const queryClient = useQueryClient();
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("FSM_MUTATION_HAPPENED", false);
  const [errorInfo, setErrorInfo, clearError] = Digit.Hooks.useSessionStorage("FSM_ERROR_DATA", false);
  const [successData, setsuccessData, clearSuccessData] = Digit.Hooks.useSessionStorage("FSM_MUTATION_SUCCESS_DATA", false);
  const {
    data: dsoData,
    isLoading: daoDataLoading,
    isSuccess: isDsoSuccess,
    error: dsoError
  } = Digit.Hooks.fsm.useDsoSearch(tenantId, {
    ids: dsoId
  }, {
    staleTime: Infinity
  });
  const {
    isLoading: isLoading,
    isError: vendorCreateError,
    data: updateResponse,
    error: updateError,
    mutate
  } = Digit.Hooks.fsm.useVendorUpdate(tenantId);
  useEffect(() => {
    setMutationHappened(false);
    clearSuccessData();
    clearError();
  }, []);
  useEffect(() => {
    if (dsoData && dsoData[0]) {
      var _dsoDetails$dsoDetail, _dsoDetails$dsoDetail2, _dsoDetails$dsoDetail3, _dsoDetails$dsoDetail4, _dsoDetails$dsoDetail5, _dsoDetails$dsoDetail6, _dsoDetails$dsoDetail7, _dsoDetails$dsoDetail8, _dsoDetails$dsoDetail9, _dsoDetails$dsoDetail10, _dsoDetails$dsoDetail11, _dsoDetails$dsoDetail12, _dsoDetails$dsoDetail13, _dsoDetails$dsoDetail14, _dsoDetails$dsoDetail15, _dsoDetails$dsoDetail16, _dsoDetails$dsoDetail17, _dsoDetails$dsoDetail18, _dsoDetails$dsoDetail19, _dsoDetails$dsoDetail20, _dsoDetails$dsoDetail21, _dsoDetails$dsoDetail22, _dsoDetails$dsoDetail23, _dsoDetails$dsoDetail24, _dsoDetails$dsoDetail25, _dsoDetails$dsoDetail26, _dsoDetails$dsoDetail27, _dsoDetails$dsoDetail28, _dsoDetails$dsoDetail29, _dsoDetails$dsoDetail30, _dsoDetails$dsoDetail31, _dsoDetails$dsoDetail32, _dsoDetails$dsoDetail33, _dsoDetails$dsoDetail34, _dsoDetails$dsoDetail35, _dsoDetails$dsoDetail36, _dsoDetails$dsoDetail37, _dsoDetails$dsoDetail38;
      let dsoDetails = dsoData[0];
      setDsoDetails(dsoDetails === null || dsoDetails === void 0 ? void 0 : dsoDetails.dsoDetails);
      let values = {
        vendorName: dsoDetails === null || dsoDetails === void 0 ? void 0 : dsoDetails.name,
        street: dsoDetails === null || dsoDetails === void 0 ? void 0 : (_dsoDetails$dsoDetail = dsoDetails.dsoDetails) === null || _dsoDetails$dsoDetail === void 0 ? void 0 : (_dsoDetails$dsoDetail2 = _dsoDetails$dsoDetail.address) === null || _dsoDetails$dsoDetail2 === void 0 ? void 0 : _dsoDetails$dsoDetail2.street,
        doorNo: dsoDetails === null || dsoDetails === void 0 ? void 0 : (_dsoDetails$dsoDetail3 = dsoDetails.dsoDetails) === null || _dsoDetails$dsoDetail3 === void 0 ? void 0 : (_dsoDetails$dsoDetail4 = _dsoDetails$dsoDetail3.address) === null || _dsoDetails$dsoDetail4 === void 0 ? void 0 : _dsoDetails$dsoDetail4.doorNo,
        plotNo: dsoDetails === null || dsoDetails === void 0 ? void 0 : (_dsoDetails$dsoDetail5 = dsoDetails.dsoDetails) === null || _dsoDetails$dsoDetail5 === void 0 ? void 0 : (_dsoDetails$dsoDetail6 = _dsoDetails$dsoDetail5.address) === null || _dsoDetails$dsoDetail6 === void 0 ? void 0 : _dsoDetails$dsoDetail6.plotNo,
        landmark: dsoDetails === null || dsoDetails === void 0 ? void 0 : (_dsoDetails$dsoDetail7 = dsoDetails.dsoDetails) === null || _dsoDetails$dsoDetail7 === void 0 ? void 0 : (_dsoDetails$dsoDetail8 = _dsoDetails$dsoDetail7.address) === null || _dsoDetails$dsoDetail8 === void 0 ? void 0 : _dsoDetails$dsoDetail8.landmark,
        pincode: dsoDetails === null || dsoDetails === void 0 ? void 0 : (_dsoDetails$dsoDetail9 = dsoDetails.dsoDetails) === null || _dsoDetails$dsoDetail9 === void 0 ? void 0 : (_dsoDetails$dsoDetail10 = _dsoDetails$dsoDetail9.address) === null || _dsoDetails$dsoDetail10 === void 0 ? void 0 : _dsoDetails$dsoDetail10.pincode,
        buildingName: dsoDetails === null || dsoDetails === void 0 ? void 0 : (_dsoDetails$dsoDetail11 = dsoDetails.dsoDetails) === null || _dsoDetails$dsoDetail11 === void 0 ? void 0 : (_dsoDetails$dsoDetail12 = _dsoDetails$dsoDetail11.address) === null || _dsoDetails$dsoDetail12 === void 0 ? void 0 : _dsoDetails$dsoDetail12.buildingName,
        address: {
          pincode: dsoDetails === null || dsoDetails === void 0 ? void 0 : (_dsoDetails$dsoDetail13 = dsoDetails.dsoDetails) === null || _dsoDetails$dsoDetail13 === void 0 ? void 0 : (_dsoDetails$dsoDetail14 = _dsoDetails$dsoDetail13.address) === null || _dsoDetails$dsoDetail14 === void 0 ? void 0 : _dsoDetails$dsoDetail14.pincode,
          locality: {
            ...(dsoDetails === null || dsoDetails === void 0 ? void 0 : (_dsoDetails$dsoDetail15 = dsoDetails.dsoDetails) === null || _dsoDetails$dsoDetail15 === void 0 ? void 0 : (_dsoDetails$dsoDetail16 = _dsoDetails$dsoDetail15.address) === null || _dsoDetails$dsoDetail16 === void 0 ? void 0 : _dsoDetails$dsoDetail16.locality),
            i18nkey: `${dsoDetails === null || dsoDetails === void 0 ? void 0 : (_dsoDetails$dsoDetail17 = dsoDetails.dsoDetails) === null || _dsoDetails$dsoDetail17 === void 0 ? void 0 : _dsoDetails$dsoDetail17.tenantId.toUpperCase().split(".").join("_")}_REVENUE_${dsoDetails === null || dsoDetails === void 0 ? void 0 : (_dsoDetails$dsoDetail18 = dsoDetails.dsoDetails) === null || _dsoDetails$dsoDetail18 === void 0 ? void 0 : _dsoDetails$dsoDetail18.address.locality.code}`
          }
        },
        phone: dsoDetails === null || dsoDetails === void 0 ? void 0 : dsoDetails.mobileNumber,
        ownerName: dsoDetails === null || dsoDetails === void 0 ? void 0 : (_dsoDetails$dsoDetail19 = dsoDetails.dsoDetails) === null || _dsoDetails$dsoDetail19 === void 0 ? void 0 : (_dsoDetails$dsoDetail20 = _dsoDetails$dsoDetail19.owner) === null || _dsoDetails$dsoDetail20 === void 0 ? void 0 : _dsoDetails$dsoDetail20.name,
        fatherOrHusbandName: dsoDetails === null || dsoDetails === void 0 ? void 0 : (_dsoDetails$dsoDetail21 = dsoDetails.dsoDetails) === null || _dsoDetails$dsoDetail21 === void 0 ? void 0 : (_dsoDetails$dsoDetail22 = _dsoDetails$dsoDetail21.owner) === null || _dsoDetails$dsoDetail22 === void 0 ? void 0 : _dsoDetails$dsoDetail22.fatherOrHusbandName,
        relationship: dsoDetails === null || dsoDetails === void 0 ? void 0 : (_dsoDetails$dsoDetail23 = dsoDetails.dsoDetails) === null || _dsoDetails$dsoDetail23 === void 0 ? void 0 : (_dsoDetails$dsoDetail24 = _dsoDetails$dsoDetail23.owner) === null || _dsoDetails$dsoDetail24 === void 0 ? void 0 : _dsoDetails$dsoDetail24.relationship,
        selectGender: dsoDetails === null || dsoDetails === void 0 ? void 0 : (_dsoDetails$dsoDetail25 = dsoDetails.dsoDetails) === null || _dsoDetails$dsoDetail25 === void 0 ? void 0 : (_dsoDetails$dsoDetail26 = _dsoDetails$dsoDetail25.owner) === null || _dsoDetails$dsoDetail26 === void 0 ? void 0 : _dsoDetails$dsoDetail26.gender,
        dob: (dsoDetails === null || dsoDetails === void 0 ? void 0 : (_dsoDetails$dsoDetail27 = dsoDetails.dsoDetails) === null || _dsoDetails$dsoDetail27 === void 0 ? void 0 : (_dsoDetails$dsoDetail28 = _dsoDetails$dsoDetail27.owner) === null || _dsoDetails$dsoDetail28 === void 0 ? void 0 : _dsoDetails$dsoDetail28.dob) && Digit.DateUtils.ConvertTimestampToDate(dsoDetails === null || dsoDetails === void 0 ? void 0 : (_dsoDetails$dsoDetail29 = dsoDetails.dsoDetails) === null || _dsoDetails$dsoDetail29 === void 0 ? void 0 : (_dsoDetails$dsoDetail30 = _dsoDetails$dsoDetail29.owner) === null || _dsoDetails$dsoDetail30 === void 0 ? void 0 : _dsoDetails$dsoDetail30.dob, "yyyy-MM-dd"),
        emailId: (dsoDetails === null || dsoDetails === void 0 ? void 0 : (_dsoDetails$dsoDetail31 = dsoDetails.dsoDetails) === null || _dsoDetails$dsoDetail31 === void 0 ? void 0 : (_dsoDetails$dsoDetail32 = _dsoDetails$dsoDetail31.owner) === null || _dsoDetails$dsoDetail32 === void 0 ? void 0 : _dsoDetails$dsoDetail32.emailId) === "abc@egov.com" ? "" : dsoDetails === null || dsoDetails === void 0 ? void 0 : (_dsoDetails$dsoDetail33 = dsoDetails.dsoDetails) === null || _dsoDetails$dsoDetail33 === void 0 ? void 0 : (_dsoDetails$dsoDetail34 = _dsoDetails$dsoDetail33.owner) === null || _dsoDetails$dsoDetail34 === void 0 ? void 0 : _dsoDetails$dsoDetail34.emailId,
        correspondenceAddress: dsoDetails === null || dsoDetails === void 0 ? void 0 : (_dsoDetails$dsoDetail35 = dsoDetails.dsoDetails) === null || _dsoDetails$dsoDetail35 === void 0 ? void 0 : (_dsoDetails$dsoDetail36 = _dsoDetails$dsoDetail35.owner) === null || _dsoDetails$dsoDetail36 === void 0 ? void 0 : _dsoDetails$dsoDetail36.correspondenceAddress,
        additionalDetails: dsoDetails === null || dsoDetails === void 0 ? void 0 : (_dsoDetails$dsoDetail37 = dsoDetails.dsoDetails) === null || _dsoDetails$dsoDetail37 === void 0 ? void 0 : (_dsoDetails$dsoDetail38 = _dsoDetails$dsoDetail37.additionalDetails) === null || _dsoDetails$dsoDetail38 === void 0 ? void 0 : _dsoDetails$dsoDetail38.description
      };
      setDefaultValues(values);
    }
  }, [dsoData]);
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const Config = VendorConfig(t, true);
  const onFormValueChange = (setValue, formData) => {
    var _formData$address;
    if (formData !== null && formData !== void 0 && formData.phone && formData !== null && formData !== void 0 && (_formData$address = formData.address) !== null && _formData$address !== void 0 && _formData$address.locality) {
      setSubmitValve(true);
    } else {
      setSubmitValve(false);
    }
  };
  const closeToast = () => {
    setShowToast(null);
  };
  const onSubmit = data => {
    var _data$street, _data$doorNo, _data$plotNo, _data$landmark, _data$address, _data$address$city, _data$address2, _data$address2$city, _data$address3, _data$address3$city, _data$address4, _data$address4$city, _data$buildingName, _data$address5, _data$address5$locali, _data$address6, _data$address6$locali, _data$address7, _data$address7$locali, _data$selectGender, _data$address8, _data$address9, _dsoDetails$owner, _dsoDetails$owner2;
    const name = data === null || data === void 0 ? void 0 : data.vendorName;
    const pincode = data === null || data === void 0 ? void 0 : data.pincode;
    const street = data === null || data === void 0 ? void 0 : (_data$street = data.street) === null || _data$street === void 0 ? void 0 : _data$street.trim();
    const doorNo = data === null || data === void 0 ? void 0 : (_data$doorNo = data.doorNo) === null || _data$doorNo === void 0 ? void 0 : _data$doorNo.trim();
    const plotNo = data === null || data === void 0 ? void 0 : (_data$plotNo = data.plotNo) === null || _data$plotNo === void 0 ? void 0 : _data$plotNo.trim();
    const landmark = data === null || data === void 0 ? void 0 : (_data$landmark = data.landmark) === null || _data$landmark === void 0 ? void 0 : _data$landmark.trim();
    const city = data === null || data === void 0 ? void 0 : (_data$address = data.address) === null || _data$address === void 0 ? void 0 : (_data$address$city = _data$address.city) === null || _data$address$city === void 0 ? void 0 : _data$address$city.name;
    const state = data === null || data === void 0 ? void 0 : (_data$address2 = data.address) === null || _data$address2 === void 0 ? void 0 : (_data$address2$city = _data$address2.city) === null || _data$address2$city === void 0 ? void 0 : _data$address2$city.state;
    const district = data === null || data === void 0 ? void 0 : (_data$address3 = data.address) === null || _data$address3 === void 0 ? void 0 : (_data$address3$city = _data$address3.city) === null || _data$address3$city === void 0 ? void 0 : _data$address3$city.name;
    const region = data === null || data === void 0 ? void 0 : (_data$address4 = data.address) === null || _data$address4 === void 0 ? void 0 : (_data$address4$city = _data$address4.city) === null || _data$address4$city === void 0 ? void 0 : _data$address4$city.name;
    const buildingName = data === null || data === void 0 ? void 0 : (_data$buildingName = data.buildingName) === null || _data$buildingName === void 0 ? void 0 : _data$buildingName.trim();
    const localityCode = data === null || data === void 0 ? void 0 : (_data$address5 = data.address) === null || _data$address5 === void 0 ? void 0 : (_data$address5$locali = _data$address5.locality) === null || _data$address5$locali === void 0 ? void 0 : _data$address5$locali.code;
    const localityName = data === null || data === void 0 ? void 0 : (_data$address6 = data.address) === null || _data$address6 === void 0 ? void 0 : (_data$address6$locali = _data$address6.locality) === null || _data$address6$locali === void 0 ? void 0 : _data$address6$locali.name;
    const localityArea = data === null || data === void 0 ? void 0 : (_data$address7 = data.address) === null || _data$address7 === void 0 ? void 0 : (_data$address7$locali = _data$address7.locality) === null || _data$address7$locali === void 0 ? void 0 : _data$address7$locali.area;
    const additionalDetails = data === null || data === void 0 ? void 0 : data.additionalDetails;
    const gender = data === null || data === void 0 ? void 0 : (_data$selectGender = data.selectGender) === null || _data$selectGender === void 0 ? void 0 : _data$selectGender.code;
    const emailId = data === null || data === void 0 ? void 0 : data.emailId;
    const dob = new Date(`${data.dob}`).getTime() || new Date(`1/1/1970`).getTime();
    const formData = {
      vendor: {
        ...dsoDetails,
        name,
        address: {
          ...dsoDetails.address,
          landmark,
          doorNo,
          plotNo,
          street,
          city,
          district,
          region,
          state,
          country: "in",
          pincode,
          buildingName,
          locality: {
            ...dsoDetails.address.locality,
            code: localityCode || "",
            name: localityName || "",
            label: "Locality",
            area: localityArea || ""
          },
          geoLocation: {
            ...dsoDetails.address.geoLocation,
            latitude: (data === null || data === void 0 ? void 0 : (_data$address8 = data.address) === null || _data$address8 === void 0 ? void 0 : _data$address8.latitude) || 0,
            longitude: (data === null || data === void 0 ? void 0 : (_data$address9 = data.address) === null || _data$address9 === void 0 ? void 0 : _data$address9.longitude) || 0
          }
        },
        owner: {
          ...dsoDetails.owner,
          gender: gender || ((_dsoDetails$owner = dsoDetails.owner) === null || _dsoDetails$owner === void 0 ? void 0 : _dsoDetails$owner.gender) || "OTHER",
          dob: dob,
          emailId: emailId || "abc@egov.com",
          relationship: ((_dsoDetails$owner2 = dsoDetails.owner) === null || _dsoDetails$owner2 === void 0 ? void 0 : _dsoDetails$owner2.relationship) || "OTHER"
        },
        additionalDetails: {
          ...dsoDetails.additionalDetails,
          description: additionalDetails
        }
      }
    };
    mutate(formData, {
      onError: (error, variables) => {
        setShowToast({
          key: "error",
          action: error
        });
        setTimeout(closeToast, 5000);
      },
      onSuccess: (data, variables) => {
        setShowToast({
          key: "success",
          action: "UPDATE_VENDOR"
        });
        setTimeout(closeToast, 5000);
        queryClient.invalidateQueries("DSO_SEARCH");
        setTimeout(() => {
          closeToast();
          history.push(`/digit-ui/employee/fsm/registry/vendor-details/${dsoId}`);
        }, 5000);
      }
    });
  };
  const isMobile = window.Digit.Utils.browser.isMobile();
  if (daoDataLoading || Object.keys(defaultValues).length == 0) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Header, null, t("ES_FSM_REGISTRY_TITLE_EDIT_VENDOR"))), /*#__PURE__*/React.createElement("div", {
    style: !isMobile ? {
      marginLeft: "-15px"
    } : {}
  }, /*#__PURE__*/React.createElement(FormComposer, {
    isDisabled: !canSubmit,
    label: t("ES_COMMON_APPLICATION_SUBMIT"),
    config: Config.filter(i => !i.hideInEmployee).map(config => {
      return {
        ...config,
        body: config.body.filter(a => !a.hideInEmployee)
      };
    }),
    fieldStyle: {
      marginRight: 0
    },
    onSubmit: onSubmit,
    defaultValues: defaultValues,
    onFormValueChange: onFormValueChange,
    noBreakLine: true
  }), showToast && /*#__PURE__*/React.createElement(Toast, {
    error: showToast.key === "error" ? true : false,
    label: t(showToast.key === "success" ? `ES_FSM_REGISTRY_${showToast.action}_SUCCESS` : showToast.action),
    onClose: closeToast
  })));
};

const Heading$2 = props => {
  return /*#__PURE__*/React.createElement("h1", {
    className: "heading-m"
  }, props.label);
};
const Close$2 = () => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "#FFFFFF"
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0V0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
}));
const CloseBtn$2 = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "icon-bg-secondary",
    onClick: props.onClick
  }, /*#__PURE__*/React.createElement(Close$2, null));
};
const VehicleDetails = props => {
  var _vehicleData$6, _vehicleData$6$employ;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const state = Digit.ULBService.getStateId();
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const queryClient = useQueryClient();
  let {
    id: vehicleNumber
  } = useParams();
  const [displayMenu, setDisplayMenu] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [config, setCurrentConfig] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const [vehicleId, setVehicleId] = useState(null);
  const {
    data: vehicleData,
    isLoading: isLoading,
    isSuccess: isVehicleSuccess,
    error: vehicleError,
    refetch
  } = Digit.Hooks.fsm.useVehicleDetails(tenantId, {
    registrationNumber: vehicleNumber
  }, {
    staleTime: Infinity
  });
  useEffect(() => {
    if (!isLoading && vehicleData) {
      var _vehicleData$, _vehicleData$$vehicle;
      setVehicleId(vehicleData === null || vehicleData === void 0 ? void 0 : (_vehicleData$ = vehicleData[0]) === null || _vehicleData$ === void 0 ? void 0 : (_vehicleData$$vehicle = _vehicleData$.vehicleData) === null || _vehicleData$$vehicle === void 0 ? void 0 : _vehicleData$$vehicle.id);
    }
  }, [vehicleData, isLoading]);
  const {
    data: vendorData,
    isLoading: isVendorDataLoading,
    isSuccess: isVendorDataSuccess,
    error: vendorDataError
  } = Digit.Hooks.fsm.useDsoSearch(tenantId, {
    sortBy: "name",
    sortOrder: "ASC",
    status: "ACTIVE"
  }, {});
  useEffect(() => {
    if (vendorData) {
      let vendors = vendorData.map(data => data.dsoDetails);
      setVendors(vendors);
    }
  }, [vendorData]);
  const {
    isLoading: isUpdateLoading,
    isError: vehicleUpdatError,
    data: updateResponse,
    error: updateError,
    mutate
  } = Digit.Hooks.fsm.useUpdateVehicle(tenantId);
  const {
    isLoading: isVendorUpdateLoading,
    isError: isVendorUpdateError,
    data: vendorUpdateResponse,
    error: vendorUpdateError,
    mutate: mutateVendor
  } = Digit.Hooks.fsm.useVendorUpdate(tenantId);
  function onActionSelect(action) {
    setDisplayMenu(false);
    setSelectedAction(action);
  }
  useEffect(() => {
    refetch();
  }, []);
  useEffect(() => {
    switch (selectedAction) {
      case "DELETE":
      case "ADD_VENDOR":
      case "EDIT_VENDOR":
      case "DELETE_VENDOR":
        return setShowModal(true);
      case "EDIT":
        return history.push("/digit-ui/employee/fsm/registry/modify-vehicle/" + vehicleNumber);
    }
  }, [selectedAction]);
  const closeToast = () => {
    setShowToast(null);
  };
  const closeModal = () => {
    setSelectedAction(null);
    setSelectedOption({});
    setShowModal(false);
  };
  const handleAddVendor = () => {
    var _vehicleData$2;
    let dsoDetails = selectedOption;
    let vehicleDetails = vehicleData === null || vehicleData === void 0 ? void 0 : (_vehicleData$2 = vehicleData[0]) === null || _vehicleData$2 === void 0 ? void 0 : _vehicleData$2.vehicleData;
    vehicleDetails.vendorVehicleStatus = "ACTIVE";
    const formData = {
      vendor: {
        ...dsoDetails,
        vehicles: dsoDetails.vehicles ? [...dsoDetails.vehicles, vehicleDetails] : [vehicleDetails]
      }
    };
    mutateVendor(formData, {
      onError: (error, variables) => {
        setShowToast({
          key: "error",
          action: error
        });
        setTimeout(closeToast, 5000);
      },
      onSuccess: (data, variables) => {
        setShowToast({
          key: "success",
          action: "EDIT_VENDOR"
        });
        refetch();
        queryClient.invalidateQueries("DSO_SEARCH");
        setTimeout(closeToast, 5000);
      }
    });
    setShowModal(false);
    setSelectedAction(null);
  };
  const handleEditVendor = () => {
    var _vehicleData$3;
    let dsoDetails = selectedOption;
    let vehicleDetails = vehicleData === null || vehicleData === void 0 ? void 0 : (_vehicleData$3 = vehicleData[0]) === null || _vehicleData$3 === void 0 ? void 0 : _vehicleData$3.vehicleData;
    vehicleDetails.vendorVehicleStatus = "ACTIVE";
    const formData = {
      vendor: {
        ...dsoDetails,
        vehicles: dsoDetails.vehicles ? [...dsoDetails.vehicles, vehicleDetails] : [vehicleDetails]
      }
    };
    mutateVendor(formData, {
      onError: (error, variables) => {
        setShowToast({
          key: "error",
          action: error
        });
        setTimeout(closeToast, 5000);
      },
      onSuccess: (data, variables) => {
        setShowToast({
          key: "success",
          action: "EDIT_VENDOR"
        });
        refetch();
        queryClient.invalidateQueries("DSO_SEARCH");
        setTimeout(closeToast, 5000);
      }
    });
    setShowModal(false);
    setSelectedAction(null);
  };
  const handleDeleteVendor = () => {
    var _vehicleData$4, _vehicleData$4$vendor, _vehicleData$4$vendor2;
    let formData = {};
    let dsoDetails = vehicleData === null || vehicleData === void 0 ? void 0 : (_vehicleData$4 = vehicleData[0]) === null || _vehicleData$4 === void 0 ? void 0 : (_vehicleData$4$vendor = _vehicleData$4.vendorDetails) === null || _vehicleData$4$vendor === void 0 ? void 0 : (_vehicleData$4$vendor2 = _vehicleData$4$vendor.vendor) === null || _vehicleData$4$vendor2 === void 0 ? void 0 : _vehicleData$4$vendor2[0];
    let getVehicleVendorDetails = dsoDetails === null || dsoDetails === void 0 ? void 0 : dsoDetails.vehicles;
    getVehicleVendorDetails = getVehicleVendorDetails.map(data => {
      if (data.id === vehicleId) {
        data.vendorVehicleStatus = "INACTIVE";
      }
      return data;
    });
    formData = {
      vendor: {
        ...dsoDetails,
        vehicles: getVehicleVendorDetails
      }
    };
    mutateVendor(formData, {
      onError: (error, variables) => {
        setShowToast({
          key: "error",
          action: error
        });
        setTimeout(closeToast, 5000);
      },
      onSuccess: (data, variables) => {
        setShowToast({
          key: "success",
          action: "DELETE_VENDOR"
        });
        queryClient.invalidateQueries("FSM_VENDOR_SEARCH");
        refetch();
        setTimeout(closeToast, 5000);
      }
    });
    setShowModal(false);
  };
  const handleModalAction = () => {
    switch (selectedAction) {
      case "DELETE":
        return handleDelete();
      case "DELETE_VENDOR":
        return handleDeleteVendor();
      case "ADD_VENDOR":
        return handleAddVendor();
      case "EDIT_VENDOR":
        return handleEditVendor();
    }
  };
  const handleDelete = () => {
    var _vehicleData$5;
    let vehicleDetails = vehicleData === null || vehicleData === void 0 ? void 0 : (_vehicleData$5 = vehicleData[0]) === null || _vehicleData$5 === void 0 ? void 0 : _vehicleData$5.vehicleData;
    const formData = {
      vehicle: {
        ...vehicleDetails,
        status: "INACTIVE"
      }
    };
    mutate(formData, {
      onError: (error, variables) => {
        setShowToast({
          key: "error",
          action: error
        });
        setTimeout(closeToast, 5000);
      },
      onSuccess: (data, variables) => {
        setShowToast({
          key: "success",
          action: "DELETE_VEHICLE"
        });
        queryClient.invalidateQueries("FSM_VEICLES_SEARCH");
        setTimeout(() => {
          history.push(`/digit-ui/employee/fsm/registry`);
        }, 5000);
      }
    });
    setShowModal(false);
  };
  const renderModalContent = () => {
    if (selectedAction === "DELETE" || selectedAction === "DELETE_VENDOR") {
      return /*#__PURE__*/React.createElement(ConfirmationBox, {
        t: t,
        title: "ES_FSM_REGISTRY_DELETE_TEXT"
      });
    }
    if (selectedAction === "ADD_VENDOR") {
      return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(CardText, null, t(`ES_FSM_REGISTRY_SELECT_VENODOR`)), /*#__PURE__*/React.createElement(Dropdown$2, {
        t: t,
        option: vendors,
        value: selectedOption,
        selected: selectedOption,
        select: setSelectedOption,
        optionKey: "name"
      }));
    }
    if (selectedAction === "EDIT_VENDOR") {
      return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(CardText, null, t(`ES_FSM_REGISTRY_SELECT_VENODOR`)), /*#__PURE__*/React.createElement(Dropdown$2, {
        t: t,
        option: vendors,
        value: selectedOption,
        selected: selectedOption,
        select: setSelectedOption,
        optionKey: "name"
      }));
    }
  };
  const isMobile = window.Digit.Utils.browser.isMobile();
  const modalHeading = () => {
    switch (selectedAction) {
      case "DELETE":
      case "DELETE_VENDOR":
        return "ES_FSM_REGISTRY_DELETE_POPUP_HEADER";
      case "ADD_VENDOR":
        return "ES_FSM_REGISTRY_ADD_VENDOR_POPUP_HEADER";
      case "EDIT_VENDOR":
        return "ES_FSM_REGISTRY_ADD_VENDOR_POPUP_HEADER";
    }
  };
  if (isLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, !isLoading ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Header, {
    style: {
      marginBottom: "16px"
    }
  }, t("ES_FSM_REGISTRY_VEHICLE_DETAILS")), /*#__PURE__*/React.createElement("div", {
    style: !isMobile ? {
      marginLeft: "-15px"
    } : {}
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      position: "relative"
    }
  }, vehicleData === null || vehicleData === void 0 ? void 0 : (_vehicleData$6 = vehicleData[0]) === null || _vehicleData$6 === void 0 ? void 0 : (_vehicleData$6$employ = _vehicleData$6.employeeResponse) === null || _vehicleData$6$employ === void 0 ? void 0 : _vehicleData$6$employ.map((detail, index) => {
    var _detail$values;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: index
    }, index > 0 && /*#__PURE__*/React.createElement(CardSectionHeader, {
      style: {
        marginBottom: "16px",
        marginTop: "32px"
      }
    }, t(detail.title)), /*#__PURE__*/React.createElement(StatusTable, null, detail === null || detail === void 0 ? void 0 : (_detail$values = detail.values) === null || _detail$values === void 0 ? void 0 : _detail$values.map((value, index) => {
      var _detail$values2, _detail$values3;
      return (value === null || value === void 0 ? void 0 : value.type) === "custom" ? /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: `${index === (detail === null || detail === void 0 ? void 0 : (_detail$values2 = detail.values) === null || _detail$values2 === void 0 ? void 0 : _detail$values2.length) - 1 ? "row last" : "row"} border-none`
      }, /*#__PURE__*/React.createElement("h2", null, t(value.title)), /*#__PURE__*/React.createElement("div", {
        className: "value",
        style: {
          color: "#a82227",
          display: "flex"
        }
      }, t(value.value) || "N/A", value.value === "ES_FSM_REGISTRY_DETAILS_ADD_VENDOR" && /*#__PURE__*/React.createElement("span", {
        onClick: () => onActionSelect("ADD_VENDOR")
      }, /*#__PURE__*/React.createElement(AddIcon, {
        className: "",
        fill: "#a82227",
        styles: {
          cursor: "pointer",
          marginLeft: "20px",
          height: "24px"
        }
      })), value.value != "ES_FSM_REGISTRY_DETAILS_ADD_VENDOR" && /*#__PURE__*/React.createElement("span", {
        onClick: () => onActionSelect("EDIT_VENDOR")
      }, /*#__PURE__*/React.createElement(EditIcon, {
        style: {
          cursor: "pointer",
          marginLeft: "20px"
        }
      })), value.value != "ES_FSM_REGISTRY_DETAILS_ADD_VENDOR" && /*#__PURE__*/React.createElement("span", {
        onClick: () => onActionSelect("DELETE_VENDOR")
      }, /*#__PURE__*/React.createElement(DeleteIcon, {
        className: "delete",
        fill: "#a82227",
        style: {
          cursor: "pointer",
          marginLeft: "20px"
        }
      }))))) : /*#__PURE__*/React.createElement(Row, {
        key: t(value.title),
        label: t(value.title),
        text: t(value.value) || "N/A",
        last: index === (detail === null || detail === void 0 ? void 0 : (_detail$values3 = detail.values) === null || _detail$values3 === void 0 ? void 0 : _detail$values3.length) - 1,
        caption: value.caption,
        className: "border-none",
        textStyle: value.value === "ACTIVE" ? {
          color: "green"
        } : {}
      });
    })));
  }))), showModal && /*#__PURE__*/React.createElement(Modal, {
    headerBarMain: /*#__PURE__*/React.createElement(Heading$2, {
      label: t(modalHeading())
    }),
    headerBarEnd: /*#__PURE__*/React.createElement(CloseBtn$2, {
      onClick: closeModal
    }),
    actionCancelLabel: t("CS_COMMON_CANCEL"),
    actionCancelOnSubmit: closeModal,
    actionSaveLabel: t(selectedAction === "DELETE" || selectedAction === "DELETE_VENDOR" ? "ES_EVENT_DELETE" : "CS_COMMON_SUBMIT"),
    actionSaveOnSubmit: handleModalAction
  }, selectedAction === "DELETE" || selectedAction === "DELETE_VENDOR" ? renderModalContent() : /*#__PURE__*/React.createElement(Card, {
    style: {
      boxShadow: "none"
    }
  }, renderModalContent())), showToast && /*#__PURE__*/React.createElement(Toast, {
    error: showToast.key === "error" ? true : false,
    label: t(showToast.key === "success" ? `ES_FSM_REGISTRY_${showToast.action}_SUCCESS` : showToast.action),
    onClose: closeToast
  }), /*#__PURE__*/React.createElement(ActionBar, {
    style: {
      zIndex: "19"
    }
  }, displayMenu ? /*#__PURE__*/React.createElement(Menu, {
    localeKeyPrefix: "ES_FSM_REGISTRY_ACTION",
    options: ["EDIT", "DELETE"],
    t: t,
    onSelect: onActionSelect
  }) : null, /*#__PURE__*/React.createElement(SubmitBar, {
    label: t("ES_COMMON_TAKE_ACTION"),
    onSubmit: () => setDisplayMenu(!displayMenu)
  }))) : /*#__PURE__*/React.createElement(Loader, null));
};

const {
  DatePicker: DatePicker$1,
  Dropdown: Dropdown$1
} = require("@egovernments/digit-ui-react-components");
const VehicleConfig = (t, disabled = false) => {
  return [{
    head: "ES_FSM_REGISTRY_VEHICLE_DETAILS",
    body: [{
      label: "ES_FSM_REGISTRY_VEHICLE_NUMBER",
      isMandatory: true,
      type: "text",
      disable: disabled,
      populators: {
        name: "registrationNumber",
        ValidationRequired: true,
        validation: {
          pattern: `[A-Z]{2}\\s{1}[0-9]{2}\\s{0,1}[A-Z]{1,2}\\s{1}[0-9]{4}`,
          title: t("ES_FSM_VEHICLE_FORMAT_TIP")
        },
        error: t("FSM_REGISTRY_INVALID_REGISTRATION_NUMBER"),
        defaultValue: "",
        className: "payment-form-text-input-correction"
      }
    }, {
      route: "vehicle",
      component: "SelectVehicle",
      withoutLabel: true,
      key: "vehicle",
      isMandatory: true,
      type: "component"
    }, {
      label: "ES_FSM_REGISTRY_VEHICLE_POLLUTION_CERT",
      isMandatory: false,
      type: "custom",
      key: "pollutionCert",
      populators: {
        name: "pollutionCert",
        validation: {
          required: true
        },
        component: (props, customProps) => /*#__PURE__*/React.createElement(DatePicker$1, Object.assign({
          onChange: props.onChange,
          date: props.value
        }, customProps))
      }
    }, {
      label: "ES_FSM_REGISTRY_VEHICLE_INSURANCE",
      isMandatory: false,
      type: "custom",
      key: "insurance",
      populators: {
        name: "insurance",
        validation: {
          required: true
        },
        component: (props, customProps) => /*#__PURE__*/React.createElement(DatePicker$1, Object.assign({
          onChange: props.onChange,
          date: props.value
        }, customProps))
      }
    }, {
      label: "ES_FSM_REGISTRY_VEHICLE_ROAD_TAX",
      isMandatory: false,
      type: "custom",
      key: "roadTax",
      populators: {
        name: "roadTax",
        validation: {
          required: true
        },
        component: (props, customProps) => /*#__PURE__*/React.createElement(DatePicker$1, Object.assign({
          onChange: props.onChange,
          date: props.value
        }, customProps))
      }
    }, {
      label: "ES_FSM_REGISTRY_NEW_FITNESS",
      isMandatory: false,
      type: "custom",
      key: "fitnessValidity",
      populators: {
        name: "fitnessValidity",
        validation: {
          required: true
        },
        component: (props, customProps) => /*#__PURE__*/React.createElement(DatePicker$1, Object.assign({
          onChange: props.onChange,
          date: props.value
        }, customProps))
      }
    }, {
      label: "ES_FSM_REGISTRY_NEW_VEHICLE_OWNER_NAME",
      isMandatory: true,
      type: "text",
      disable: disabled,
      populators: {
        name: "ownerName",
        validation: {
          required: true,
          pattern: /^[A-Za-z]/
        },
        error: t("FSM_REGISTRY_INVALID_NAME"),
        defaultValue: "",
        className: "payment-form-text-input-correction"
      }
    }, {
      label: "ES_FSM_REGISTRY_NEW_VEHICLE_OWNER_PHONE",
      isMandatory: true,
      type: "mobileNumber",
      key: "phone",
      disable: disabled,
      populators: {
        name: "phone",
        validation: {
          required: true,
          pattern: /^[6-9]\d{9}$/
        },
        error: t("FSM_REGISTRY_INVALID_PHONE"),
        defaultValue: "",
        className: "payment-form-text-input-correction",
        labelStyle: {
          border: "1px solid black",
          borderRight: "none"
        }
      }
    }, {
      label: "ES_FSM_REGISTRY_NEW_VENDOR_ADDITIONAL_DETAILS",
      isMandatory: false,
      type: "textarea",
      key: "additionalDetails",
      populators: {
        name: "additionalDetails",
        className: "payment-form-text-input-correction"
      }
    }]
  }];
};

const AddVehicle = ({
  parentUrl,
  heading
}) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  const [showToast, setShowToast] = useState(null);
  const history = useHistory();
  const queryClient = useQueryClient();
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("FSM_MUTATION_HAPPENED", false);
  const [errorInfo, setErrorInfo, clearError] = Digit.Hooks.useSessionStorage("FSM_ERROR_DATA", false);
  const [successData, setsuccessData, clearSuccessData] = Digit.Hooks.useSessionStorage("FSM_MUTATION_SUCCESS_DATA", false);
  const {
    isLoading: isLoading,
    isError: vendorCreateError,
    data: updateResponse,
    error: updateError,
    mutate
  } = Digit.Hooks.fsm.useVehicleCreate(tenantId);
  useEffect(() => {
    setMutationHappened(false);
    clearSuccessData();
    clearError();
  }, []);
  const {
    t
  } = useTranslation();
  const Config = VehicleConfig(t);
  const [canSubmit, setSubmitValve] = useState(false);
  const defaultValues = {
    tripData: {
      noOfTrips: 1,
      amountPerTrip: null,
      amount: null
    }
  };
  const onFormValueChange = (setValue, formData) => {
    var _formData$vehicle, _formData$vehicle2;
    if (formData !== null && formData !== void 0 && formData.registrationNumber && formData !== null && formData !== void 0 && formData.ownerName && formData !== null && formData !== void 0 && formData.phone && formData !== null && formData !== void 0 && (_formData$vehicle = formData.vehicle) !== null && _formData$vehicle !== void 0 && _formData$vehicle.modal && formData !== null && formData !== void 0 && (_formData$vehicle2 = formData.vehicle) !== null && _formData$vehicle2 !== void 0 && _formData$vehicle2.type) {
      setSubmitValve(true);
    } else {
      setSubmitValve(false);
    }
  };
  const closeToast = () => {
    setShowToast(null);
  };
  const onSubmit = data => {
    var _data$vehicle, _data$vehicle$type, _data$vehicle2, _data$vehicle2$modal, _data$vehicle3, _data$vehicle3$type;
    const registrationNumber = data === null || data === void 0 ? void 0 : data.registrationNumber;
    const vehicleType = data === null || data === void 0 ? void 0 : (_data$vehicle = data.vehicle) === null || _data$vehicle === void 0 ? void 0 : (_data$vehicle$type = _data$vehicle.type) === null || _data$vehicle$type === void 0 ? void 0 : _data$vehicle$type.code;
    const vehicleModal = data === null || data === void 0 ? void 0 : (_data$vehicle2 = data.vehicle) === null || _data$vehicle2 === void 0 ? void 0 : (_data$vehicle2$modal = _data$vehicle2.modal) === null || _data$vehicle2$modal === void 0 ? void 0 : _data$vehicle2$modal.code;
    const tankCapacity = data === null || data === void 0 ? void 0 : (_data$vehicle3 = data.vehicle) === null || _data$vehicle3 === void 0 ? void 0 : (_data$vehicle3$type = _data$vehicle3.type) === null || _data$vehicle3$type === void 0 ? void 0 : _data$vehicle3$type.capacity;
    const pollutionCert = new Date(`${data === null || data === void 0 ? void 0 : data.pollutionCert}`).getTime();
    const insurance = new Date(`${data === null || data === void 0 ? void 0 : data.insurance}`).getTime();
    const roadTax = new Date(`${data === null || data === void 0 ? void 0 : data.roadTax}`).getTime();
    const fitnessValidity = new Date(`${data === null || data === void 0 ? void 0 : data.fitnessValidity}`).getTime();
    const ownerName = data === null || data === void 0 ? void 0 : data.ownerName;
    const phone = data === null || data === void 0 ? void 0 : data.phone;
    const additionalDetails = data === null || data === void 0 ? void 0 : data.additionalDetails;
    const formData = {
      vehicle: {
        tenantId: tenantId,
        registrationNumber: registrationNumber,
        model: vehicleModal,
        type: vehicleType,
        tankCapacity: tankCapacity,
        suctionType: "SEWER_SUCTION_MACHINE",
        pollutionCertiValidTill: pollutionCert,
        InsuranceCertValidTill: insurance,
        fitnessValidTill: fitnessValidity,
        roadTaxPaidTill: roadTax,
        gpsEnabled: true,
        source: "Municipal records",
        owner: {
          tenantId: stateId,
          name: ownerName,
          fatherOrHusbandName: ownerName,
          relationship: "OTHER",
          gender: "OTHERS",
          dob: new Date(`1/1/1970`).getTime(),
          emailId: "abc@egov.com",
          correspondenceAddress: "",
          mobileNumber: phone
        },
        additionalDetails: {
          description: additionalDetails
        }
      }
    };
    mutate(formData, {
      onError: (error, variables) => {
        setShowToast({
          key: "error",
          action: error
        });
        setTimeout(closeToast, 5000);
      },
      onSuccess: (data, variables) => {
        setShowToast({
          key: "success",
          action: "ADD_VEHICLE"
        });
        setTimeout(closeToast, 5000);
        queryClient.invalidateQueries("FSM_VEICLES_SEARCH");
        setTimeout(() => {
          closeToast();
          history.push(`/digit-ui/employee/fsm/registry`);
        }, 5000);
      }
    });
  };
  const isMobile = window.Digit.Utils.browser.isMobile();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Header, null, t("ES_FSM_REGISTRY_TITLE_NEW_VEHICLE"))), /*#__PURE__*/React.createElement("div", {
    style: !isMobile ? {
      marginLeft: "-15px"
    } : {}
  }, /*#__PURE__*/React.createElement(FormComposer, {
    isDisabled: !canSubmit,
    label: t("ES_COMMON_APPLICATION_SUBMIT"),
    config: Config.filter(i => !i.hideInEmployee).map(config => {
      return {
        ...config,
        body: config.body.filter(a => !a.hideInEmployee)
      };
    }),
    fieldStyle: {
      marginRight: 0
    },
    onSubmit: onSubmit,
    defaultValues: defaultValues,
    onFormValueChange: onFormValueChange,
    noBreakLine: true
  }), showToast && /*#__PURE__*/React.createElement(Toast, {
    error: showToast.key === "error" ? true : false,
    label: t(showToast.key === "success" ? `ES_FSM_REGISTRY_${showToast.action}_SUCCESS` : showToast.action),
    onClose: closeToast
  })));
};

const EditVehicle = ({
  parentUrl,
  heading
}) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  let {
    id: dsoId
  } = useParams();
  const [showToast, setShowToast] = useState(null);
  const [canSubmit, setSubmitValve] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});
  const [vehicleDetails, setVehicleDetails] = useState({});
  const queryClient = useQueryClient();
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("FSM_MUTATION_HAPPENED", false);
  const [errorInfo, setErrorInfo, clearError] = Digit.Hooks.useSessionStorage("FSM_ERROR_DATA", false);
  const [successData, setsuccessData, clearSuccessData] = Digit.Hooks.useSessionStorage("FSM_MUTATION_SUCCESS_DATA", false);
  const {
    data: vehicleData,
    isLoading: vehicleDataLoading,
    isSuccess: isVehicleSuccess,
    error: vehicleError
  } = Digit.Hooks.fsm.useVehicleDetails(tenantId, {
    registrationNumber: dsoId
  }, {
    staleTime: Infinity
  });
  const {
    isLoading: isLoading,
    isError: vendorCreateError,
    data: updateResponse,
    error: updateError,
    mutate
  } = Digit.Hooks.fsm.useUpdateVehicle(tenantId);
  useEffect(() => {
    setMutationHappened(false);
    clearSuccessData();
    clearError();
  }, []);
  useEffect(() => {
    if (vehicleData && vehicleData[0]) {
      var _vehicleDetails$vehic, _vehicleDetails$vehic2, _vehicleDetails$vehic3, _vehicleDetails$vehic4, _vehicleDetails$vehic5, _vehicleDetails$vehic6, _vehicleDetails$vehic7, _vehicleDetails$vehic8, _vehicleDetails$vehic9, _vehicleDetails$vehic10, _vehicleDetails$vehic11, _vehicleDetails$vehic12, _vehicleDetails$vehic13, _vehicleDetails$vehic14, _vehicleDetails$vehic15, _vehicleDetails$vehic16, _vehicleDetails$vehic17, _vehicleDetails$vehic18;
      let vehicleDetails = vehicleData[0];
      setVehicleDetails(vehicleDetails === null || vehicleDetails === void 0 ? void 0 : vehicleDetails.vehicleData);
      let values = {
        registrationNumber: vehicleDetails === null || vehicleDetails === void 0 ? void 0 : (_vehicleDetails$vehic = vehicleDetails.vehicleData) === null || _vehicleDetails$vehic === void 0 ? void 0 : _vehicleDetails$vehic.registrationNumber,
        vehicle: {
          type: vehicleDetails === null || vehicleDetails === void 0 ? void 0 : (_vehicleDetails$vehic2 = vehicleDetails.vehicleData) === null || _vehicleDetails$vehic2 === void 0 ? void 0 : _vehicleDetails$vehic2.type,
          modal: vehicleDetails === null || vehicleDetails === void 0 ? void 0 : (_vehicleDetails$vehic3 = vehicleDetails.vehicleData) === null || _vehicleDetails$vehic3 === void 0 ? void 0 : _vehicleDetails$vehic3.model,
          tankCapacity: vehicleDetails === null || vehicleDetails === void 0 ? void 0 : (_vehicleDetails$vehic4 = vehicleDetails.vehicleData) === null || _vehicleDetails$vehic4 === void 0 ? void 0 : _vehicleDetails$vehic4.tankCapacity
        },
        pollutionCert: (vehicleDetails === null || vehicleDetails === void 0 ? void 0 : (_vehicleDetails$vehic5 = vehicleDetails.vehicleData) === null || _vehicleDetails$vehic5 === void 0 ? void 0 : _vehicleDetails$vehic5.pollutionCertiValidTill) && Digit.DateUtils.ConvertTimestampToDate(vehicleDetails === null || vehicleDetails === void 0 ? void 0 : (_vehicleDetails$vehic6 = vehicleDetails.vehicleData) === null || _vehicleDetails$vehic6 === void 0 ? void 0 : _vehicleDetails$vehic6.pollutionCertiValidTill, "yyyy-MM-dd"),
        insurance: (vehicleDetails === null || vehicleDetails === void 0 ? void 0 : (_vehicleDetails$vehic7 = vehicleDetails.vehicleData) === null || _vehicleDetails$vehic7 === void 0 ? void 0 : _vehicleDetails$vehic7.InsuranceCertValidTill) && Digit.DateUtils.ConvertTimestampToDate(vehicleDetails === null || vehicleDetails === void 0 ? void 0 : (_vehicleDetails$vehic8 = vehicleDetails.vehicleData) === null || _vehicleDetails$vehic8 === void 0 ? void 0 : _vehicleDetails$vehic8.InsuranceCertValidTill, "yyyy-MM-dd"),
        roadTax: (vehicleDetails === null || vehicleDetails === void 0 ? void 0 : (_vehicleDetails$vehic9 = vehicleDetails.vehicleData) === null || _vehicleDetails$vehic9 === void 0 ? void 0 : _vehicleDetails$vehic9.roadTaxPaidTill) && Digit.DateUtils.ConvertTimestampToDate(vehicleDetails === null || vehicleDetails === void 0 ? void 0 : (_vehicleDetails$vehic10 = vehicleDetails.vehicleData) === null || _vehicleDetails$vehic10 === void 0 ? void 0 : _vehicleDetails$vehic10.roadTaxPaidTill, "yyyy-MM-dd"),
        fitnessValidity: (vehicleDetails === null || vehicleDetails === void 0 ? void 0 : (_vehicleDetails$vehic11 = vehicleDetails.vehicleData) === null || _vehicleDetails$vehic11 === void 0 ? void 0 : _vehicleDetails$vehic11.fitnessValidTill) && Digit.DateUtils.ConvertTimestampToDate(vehicleDetails === null || vehicleDetails === void 0 ? void 0 : (_vehicleDetails$vehic12 = vehicleDetails.vehicleData) === null || _vehicleDetails$vehic12 === void 0 ? void 0 : _vehicleDetails$vehic12.fitnessValidTill, "yyyy-MM-dd"),
        phone: vehicleDetails === null || vehicleDetails === void 0 ? void 0 : (_vehicleDetails$vehic13 = vehicleDetails.vehicleData) === null || _vehicleDetails$vehic13 === void 0 ? void 0 : (_vehicleDetails$vehic14 = _vehicleDetails$vehic13.owner) === null || _vehicleDetails$vehic14 === void 0 ? void 0 : _vehicleDetails$vehic14.mobileNumber,
        ownerName: vehicleDetails === null || vehicleDetails === void 0 ? void 0 : (_vehicleDetails$vehic15 = vehicleDetails.vehicleData) === null || _vehicleDetails$vehic15 === void 0 ? void 0 : (_vehicleDetails$vehic16 = _vehicleDetails$vehic15.owner) === null || _vehicleDetails$vehic16 === void 0 ? void 0 : _vehicleDetails$vehic16.name,
        additionalDetails: vehicleDetails === null || vehicleDetails === void 0 ? void 0 : (_vehicleDetails$vehic17 = vehicleDetails.vehicleData) === null || _vehicleDetails$vehic17 === void 0 ? void 0 : (_vehicleDetails$vehic18 = _vehicleDetails$vehic17.additionalDetails) === null || _vehicleDetails$vehic18 === void 0 ? void 0 : _vehicleDetails$vehic18.description
      };
      setDefaultValues(values);
    }
  }, [vehicleData]);
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const Config = VehicleConfig(t, true);
  const onFormValueChange = (setValue, formData) => {
    var _formData$vehicle, _formData$vehicle2;
    if (formData !== null && formData !== void 0 && formData.registrationNumber && formData !== null && formData !== void 0 && formData.ownerName && formData !== null && formData !== void 0 && formData.phone && formData !== null && formData !== void 0 && (_formData$vehicle = formData.vehicle) !== null && _formData$vehicle !== void 0 && _formData$vehicle.modal && formData !== null && formData !== void 0 && (_formData$vehicle2 = formData.vehicle) !== null && _formData$vehicle2 !== void 0 && _formData$vehicle2.type) {
      setSubmitValve(true);
    } else {
      setSubmitValve(false);
    }
  };
  const closeToast = () => {
    setShowToast(null);
  };
  const onSubmit = data => {
    var _data$vehicle, _data$vehicle$type, _data$vehicle2, _data$vehicle3, _data$vehicle3$modal, _data$vehicle4, _data$vehicle5, _data$vehicle5$type, _data$vehicle6;
    const vehicleType = (data === null || data === void 0 ? void 0 : (_data$vehicle = data.vehicle) === null || _data$vehicle === void 0 ? void 0 : (_data$vehicle$type = _data$vehicle.type) === null || _data$vehicle$type === void 0 ? void 0 : _data$vehicle$type.code) || (data === null || data === void 0 ? void 0 : (_data$vehicle2 = data.vehicle) === null || _data$vehicle2 === void 0 ? void 0 : _data$vehicle2.type);
    const vehicleModal = (data === null || data === void 0 ? void 0 : (_data$vehicle3 = data.vehicle) === null || _data$vehicle3 === void 0 ? void 0 : (_data$vehicle3$modal = _data$vehicle3.modal) === null || _data$vehicle3$modal === void 0 ? void 0 : _data$vehicle3$modal.code) || (data === null || data === void 0 ? void 0 : (_data$vehicle4 = data.vehicle) === null || _data$vehicle4 === void 0 ? void 0 : _data$vehicle4.modal);
    const tankCapacity = (data === null || data === void 0 ? void 0 : (_data$vehicle5 = data.vehicle) === null || _data$vehicle5 === void 0 ? void 0 : (_data$vehicle5$type = _data$vehicle5.type) === null || _data$vehicle5$type === void 0 ? void 0 : _data$vehicle5$type.capacity) || (data === null || data === void 0 ? void 0 : (_data$vehicle6 = data.vehicle) === null || _data$vehicle6 === void 0 ? void 0 : _data$vehicle6.tankCapacity);
    const pollutionCert = new Date(`${data === null || data === void 0 ? void 0 : data.pollutionCert}`).getTime();
    const insurance = new Date(`${data === null || data === void 0 ? void 0 : data.insurance}`).getTime();
    const roadTax = new Date(`${data === null || data === void 0 ? void 0 : data.roadTax}`).getTime();
    const fitnessValidity = new Date(`${data === null || data === void 0 ? void 0 : data.fitnessValidity}`).getTime();
    const additionalDetails = data === null || data === void 0 ? void 0 : data.additionalDetails;
    const formData = {
      vehicle: {
        ...vehicleDetails,
        model: vehicleModal,
        type: vehicleType,
        tankCapacity: tankCapacity,
        pollutionCertiValidTill: pollutionCert,
        InsuranceCertValidTill: insurance,
        fitnessValidTill: fitnessValidity,
        roadTaxPaidTill: roadTax,
        additionalDetails: {
          ...vehicleDetails.additionalDetails,
          description: additionalDetails
        }
      }
    };
    mutate(formData, {
      onError: (error, variables) => {
        setShowToast({
          key: "error",
          action: error
        });
        setTimeout(closeToast, 5000);
      },
      onSuccess: (data, variables) => {
        setShowToast({
          key: "success",
          action: "UPDATE_VEHICLE"
        });
        setTimeout(closeToast, 5000);
        queryClient.invalidateQueries("DSO_SEARCH");
        setTimeout(() => {
          closeToast();
          history.push(`/digit-ui/employee/fsm/registry/vehicle-details/${dsoId}`);
        }, 5000);
      }
    });
  };
  const isMobile = window.Digit.Utils.browser.isMobile();
  if (vehicleDataLoading || Object.keys(defaultValues).length == 0) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Header, null, t("ES_FSM_REGISTRY_TITLE_EDIT_VEHICLE"))), /*#__PURE__*/React.createElement("div", {
    style: !isMobile ? {
      marginLeft: "-15px"
    } : {}
  }, /*#__PURE__*/React.createElement(FormComposer, {
    isDisabled: !canSubmit,
    label: t("ES_COMMON_APPLICATION_SUBMIT"),
    config: Config.filter(i => !i.hideInEmployee).map(config => {
      return {
        ...config,
        body: config.body.filter(a => !a.hideInEmployee)
      };
    }),
    fieldStyle: {
      marginRight: 0
    },
    onSubmit: onSubmit,
    defaultValues: defaultValues,
    onFormValueChange: onFormValueChange,
    noBreakLine: true
  }), showToast && /*#__PURE__*/React.createElement(Toast, {
    error: showToast.key === "error" ? true : false,
    label: t(showToast.key === "success" ? `ES_FSM_REGISTRY_${showToast.action}_SUCCESS` : showToast.action),
    onClose: closeToast
  })));
};

const Heading$3 = props => {
  return /*#__PURE__*/React.createElement("h1", {
    className: "heading-m"
  }, props.label);
};
const Close$3 = () => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "#FFFFFF"
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0V0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
}));
const CloseBtn$3 = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "icon-bg-secondary",
    onClick: props.onClick
  }, /*#__PURE__*/React.createElement(Close$3, null));
};
const DriverDetails = props => {
  var _driverData$5, _driverData$5$employe;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const state = Digit.ULBService.getStateId();
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const queryClient = useQueryClient();
  let {
    id: dsoId
  } = useParams();
  const [displayMenu, setDisplayMenu] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [config, setCurrentConfig] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const {
    data: driverData,
    isLoading: isLoading,
    isSuccess: isDsoSuccess,
    error: dsoError,
    refetch
  } = Digit.Hooks.fsm.useDriverDetails(tenantId, {
    ids: dsoId
  }, {
    staleTime: Infinity
  });
  const {
    data: vendorData,
    isLoading: isVendorLoading,
    isSuccess: isVendorSuccess,
    error: vendorError
  } = Digit.Hooks.fsm.useDsoSearch(tenantId, {
    sortBy: "name",
    sortOrder: "ASC",
    status: "ACTIVE"
  }, {});
  const {
    isLoading: isDriverLoading,
    isError: isDriverUpdateError,
    data: driverUpdateResponse,
    error: driverupdateError,
    mutate: mutateDriver
  } = Digit.Hooks.fsm.useDriverUpdate(tenantId);
  const {
    isLoading: isVendorUpdateLoading,
    isError: isVendorUpdateError,
    data: vendorUpdateResponse,
    error: vendorUpdateError,
    mutate: mutateVendor
  } = Digit.Hooks.fsm.useVendorUpdate(tenantId);
  function onActionSelect(action) {
    setSelectedAction(action);
    setDisplayMenu(false);
  }
  useEffect(() => {
    if (vendorData) {
      let vendors = vendorData.map(data => data.dsoDetails);
      setVendors(vendors);
    }
  }, [vendorData]);
  useEffect(() => {
    refetch();
  }, []);
  useEffect(() => {
    switch (selectedAction) {
      case "DELETE":
      case "ADD_VENDOR":
      case "EDIT_VENDOR":
      case "DELETE_VENDOR":
        return setShowModal(true);
      case "EDIT":
        return history.push("/digit-ui/employee/fsm/registry/modify-driver/" + dsoId);
    }
  }, [selectedAction]);
  const closeToast = () => {
    setShowToast(null);
  };
  const handleModalAction = () => {
    switch (selectedAction) {
      case "DELETE":
        return handleDeleteDriver();
      case "DELETE_VENDOR":
        return handleDeleteVendor();
      case "ADD_VENDOR":
        return handleAddVendor();
      case "EDIT_VENDOR":
        return handleEditVendor();
    }
  };
  const handleDeleteDriver = () => {
    var _driverData$;
    let driverDetails = driverData === null || driverData === void 0 ? void 0 : (_driverData$ = driverData[0]) === null || _driverData$ === void 0 ? void 0 : _driverData$.driverData;
    const formData = {
      driver: {
        ...driverDetails,
        status: "INACTIVE"
      }
    };
    mutateDriver(formData, {
      onError: (error, variables) => {
        setShowToast({
          key: "error",
          action: error
        });
        setTimeout(closeToast, 5000);
      },
      onSuccess: (data, variables) => {
        setShowToast({
          key: "success",
          action: "DELETE_DRIVER"
        });
        queryClient.invalidateQueries("DSO_SEARCH");
        setTimeout(() => {
          history.push(`/digit-ui/employee/fsm/registry`);
        }, 5000);
      }
    });
    setShowModal(false);
  };
  const handleDeleteVendor = () => {
    var _driverData$2, _driverData$2$vendorD, _driverData$2$vendorD2;
    let formData = {};
    let dsoDetails = driverData === null || driverData === void 0 ? void 0 : (_driverData$2 = driverData[0]) === null || _driverData$2 === void 0 ? void 0 : (_driverData$2$vendorD = _driverData$2.vendorDetails) === null || _driverData$2$vendorD === void 0 ? void 0 : (_driverData$2$vendorD2 = _driverData$2$vendorD.vendor) === null || _driverData$2$vendorD2 === void 0 ? void 0 : _driverData$2$vendorD2[0];
    let getDriverVendorDetails = dsoDetails === null || dsoDetails === void 0 ? void 0 : dsoDetails.drivers;
    getDriverVendorDetails = getDriverVendorDetails.map(data => {
      if (data.id === dsoId) {
        data.vendorDriverStatus = "INACTIVE";
      }
      return data;
    });
    formData = {
      vendor: {
        ...dsoDetails,
        drivers: getDriverVendorDetails
      }
    };
    mutateVendor(formData, {
      onError: (error, variables) => {
        setShowToast({
          key: "error",
          action: error
        });
        setTimeout(closeToast, 5000);
      },
      onSuccess: (data, variables) => {
        setShowToast({
          key: "success",
          action: "DELETE_VENDOR"
        });
        queryClient.invalidateQueries("FSM_VENDOR_SEARCH");
        refetch();
        setTimeout(closeToast, 5000);
      }
    });
    setShowModal(false);
  };
  const handleAddVendor = () => {
    var _driverData$3;
    let dsoDetails = selectedOption;
    let driverDetails = driverData === null || driverData === void 0 ? void 0 : (_driverData$3 = driverData[0]) === null || _driverData$3 === void 0 ? void 0 : _driverData$3.driverData;
    driverDetails.vendorDriverStatus = "ACTIVE";
    const formData = {
      vendor: {
        ...dsoDetails,
        drivers: dsoDetails.drivers ? [...dsoDetails.drivers, driverDetails] : [driverDetails]
      }
    };
    mutateVendor(formData, {
      onError: (error, variables) => {
        setShowToast({
          key: "error",
          action: error
        });
        refetch();
        setTimeout(closeToast, 5000);
      },
      onSuccess: (data, variables) => {
        setShowToast({
          key: "success",
          action: "ADD_VENDOR"
        });
        queryClient.invalidateQueries("DSO_SEARCH");
        refetch();
        setTimeout(closeToast, 5000);
      }
    });
    setShowModal(false);
    setSelectedAction(null);
  };
  const handleEditVendor = () => {
    var _driverData$4;
    let dsoDetails = selectedOption;
    let driverDetails = driverData === null || driverData === void 0 ? void 0 : (_driverData$4 = driverData[0]) === null || _driverData$4 === void 0 ? void 0 : _driverData$4.driverData;
    driverDetails.vendorDriverStatus = "ACTIVE";
    const formData = {
      vendor: {
        ...dsoDetails,
        drivers: dsoDetails.drivers ? [...dsoDetails.drivers, driverDetails] : [driverDetails]
      }
    };
    mutateVendor(formData, {
      onError: (error, variables) => {
        setShowToast({
          key: "error",
          action: error
        });
        setTimeout(closeToast, 5000);
      },
      onSuccess: (data, variables) => {
        setShowToast({
          key: "success",
          action: "EDIT_VENDOR"
        });
        refetch();
        queryClient.invalidateQueries("DSO_SEARCH");
        setTimeout(closeToast, 5000);
      }
    });
    setShowModal(false);
    setSelectedAction(null);
  };
  const closeModal = () => {
    setSelectedAction(null);
    setSelectedOption({});
    setShowModal(false);
  };
  const modalHeading = () => {
    switch (selectedAction) {
      case "DELETE":
      case "DELETE_VENDOR":
        return "ES_FSM_REGISTRY_DELETE_POPUP_HEADER";
      case "ADD_VENDOR":
        return "ES_FSM_REGISTRY_ADD_VENDOR_POPUP_HEADER";
      case "EDIT_VENDOR":
        return "ES_FSM_REGISTRY_ADD_VENDOR_POPUP_HEADER";
    }
  };
  const renderModalContent = () => {
    if (selectedAction === "DELETE" || selectedAction === "DELETE_VENDOR") {
      return /*#__PURE__*/React.createElement(ConfirmationBox, {
        t: t,
        title: "ES_FSM_REGISTRY_DELETE_TEXT"
      });
    }
    if (selectedAction === "ADD_VENDOR") {
      return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(CardText, null, t(`ES_FSM_REGISTRY_SELECT_VENODOR`)), /*#__PURE__*/React.createElement(Dropdown$2, {
        t: t,
        option: vendors,
        value: selectedOption,
        selected: selectedOption,
        select: setSelectedOption,
        optionKey: "name"
      }));
    }
    if (selectedAction === "EDIT_VENDOR") {
      return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(CardText, null, t(`ES_FSM_REGISTRY_SELECT_VENODOR`)), /*#__PURE__*/React.createElement(Dropdown$2, {
        t: t,
        option: vendors,
        value: selectedOption,
        selected: selectedOption,
        select: setSelectedOption,
        optionKey: "name"
      }));
    }
  };
  const isMobile = window.Digit.Utils.browser.isMobile();
  if (isLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, !isLoading ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Header, {
    style: {
      marginBottom: "16px"
    }
  }, t("ES_FSM_REGISTRY_DRIVER_DETAILS")), /*#__PURE__*/React.createElement("div", {
    style: !isMobile ? {
      marginLeft: "-15px"
    } : {}
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      position: "relative"
    }
  }, driverData === null || driverData === void 0 ? void 0 : (_driverData$5 = driverData[0]) === null || _driverData$5 === void 0 ? void 0 : (_driverData$5$employe = _driverData$5.employeeResponse) === null || _driverData$5$employe === void 0 ? void 0 : _driverData$5$employe.map((detail, index) => {
    var _detail$values;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: index
    }, index > 0 && /*#__PURE__*/React.createElement(CardSectionHeader, {
      style: {
        marginBottom: "16px",
        marginTop: "32px"
      }
    }, t(detail.title)), /*#__PURE__*/React.createElement(StatusTable, null, detail === null || detail === void 0 ? void 0 : (_detail$values = detail.values) === null || _detail$values === void 0 ? void 0 : _detail$values.map((value, index) => {
      var _detail$values2, _detail$values3;
      return (value === null || value === void 0 ? void 0 : value.type) === "custom" ? /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: `${index === (detail === null || detail === void 0 ? void 0 : (_detail$values2 = detail.values) === null || _detail$values2 === void 0 ? void 0 : _detail$values2.length) - 1 ? "row last" : "row"} border-none`
      }, /*#__PURE__*/React.createElement("h2", null, t(value.title)), /*#__PURE__*/React.createElement("div", {
        className: "value",
        style: {
          color: "#a82227",
          display: "flex"
        }
      }, t(value.value) || "N/A", value.value === "ES_FSM_REGISTRY_DETAILS_ADD_VENDOR" && /*#__PURE__*/React.createElement("span", {
        onClick: () => onActionSelect("ADD_VENDOR")
      }, /*#__PURE__*/React.createElement(AddIcon, {
        className: "",
        fill: "#a82227",
        styles: {
          cursor: "pointer",
          marginLeft: "20px",
          height: "24px"
        }
      })), value.value != "ES_FSM_REGISTRY_DETAILS_ADD_VENDOR" && /*#__PURE__*/React.createElement("span", {
        onClick: () => onActionSelect("EDIT_VENDOR")
      }, /*#__PURE__*/React.createElement(EditIcon, {
        style: {
          cursor: "pointer",
          marginLeft: "20px"
        }
      })), value.value != "ES_FSM_REGISTRY_DETAILS_ADD_VENDOR" && /*#__PURE__*/React.createElement("span", {
        onClick: () => onActionSelect("DELETE_VENDOR")
      }, /*#__PURE__*/React.createElement(DeleteIcon, {
        className: "delete",
        fill: "#a82227",
        style: {
          cursor: "pointer",
          marginLeft: "20px"
        }
      }))))) : /*#__PURE__*/React.createElement(Row, {
        key: t(value.title),
        label: t(value.title),
        text: t(value.value) || "N/A",
        last: index === (detail === null || detail === void 0 ? void 0 : (_detail$values3 = detail.values) === null || _detail$values3 === void 0 ? void 0 : _detail$values3.length) - 1,
        caption: value.caption,
        className: "border-none"
      });
    })));
  }))), showModal && /*#__PURE__*/React.createElement(Modal, {
    headerBarMain: /*#__PURE__*/React.createElement(Heading$3, {
      label: t(modalHeading())
    }),
    headerBarEnd: /*#__PURE__*/React.createElement(CloseBtn$3, {
      onClick: closeModal
    }),
    actionCancelLabel: t("CS_COMMON_CANCEL"),
    actionCancelOnSubmit: closeModal,
    actionSaveLabel: t(selectedAction === "DELETE" || selectedAction === "DELETE_VENDOR" ? "ES_EVENT_DELETE" : "CS_COMMON_SUBMIT"),
    actionSaveOnSubmit: handleModalAction,
    formId: "modal-action"
  }, selectedAction === "DELETE" || selectedAction === "DELETE_VENDOR" ? renderModalContent() : /*#__PURE__*/React.createElement(Card, {
    style: {
      boxShadow: "none"
    }
  }, renderModalContent())), showToast && /*#__PURE__*/React.createElement(Toast, {
    error: showToast.key === "error" ? true : false,
    label: t(showToast.key === "success" ? `ES_FSM_REGISTRY_${showToast.action}_SUCCESS` : showToast.action),
    onClose: closeToast
  }), /*#__PURE__*/React.createElement(ActionBar, {
    style: {
      zIndex: "19"
    }
  }, displayMenu ? /*#__PURE__*/React.createElement(Menu, {
    localeKeyPrefix: "ES_FSM_REGISTRY_ACTION",
    options: ["EDIT", "DELETE"],
    t: t,
    onSelect: onActionSelect
  }) : null, /*#__PURE__*/React.createElement(SubmitBar, {
    label: t("ES_COMMON_TAKE_ACTION"),
    onSubmit: () => setDisplayMenu(!displayMenu)
  }))) : /*#__PURE__*/React.createElement(Loader, null));
};

const {
  DatePicker: DatePicker$2
} = require("@egovernments/digit-ui-react-components");
const DriverConfig = (t, disabled = false) => {
  return [{
    head: "ES_FSM_REGISTRY_DRIVER_DETAILS",
    body: [{
      label: "ES_FSM_REGISTRY_DRIVER_NAME",
      isMandatory: true,
      type: "text",
      disable: disabled,
      populators: {
        name: "driverName",
        validation: {
          required: true,
          pattern: /^[A-Za-z]/
        },
        error: t("FSM_REGISTRY_INVALID_NAME"),
        defaultValue: "",
        className: "payment-form-text-input-correction"
      }
    }, {
      label: "ES_FSM_REGISTRY_DRIVER_LICENSE",
      isMandatory: true,
      type: "text",
      key: "license",
      populators: {
        name: "license",
        validation: {
          required: true,
          pattern: /^[a-zA-Z-]{0,}[- ]{0,1}[ 0-9]{1,}/
        },
        error: t("FSM_REGISTRY_INVALID_DRIVER_LICENSE"),
        required: false,
        defaultValue: "",
        className: "payment-form-text-input-correction"
      }
    }]
  }, {
    head: "ES_FSM_REGISTRY_PERSONAL_DETAILS",
    body: [{
      label: "ES_FSM_REGISTRY_NEW_GENDER",
      isMandatory: true,
      type: "component",
      route: "select-gender",
      hideInEmployee: false,
      key: "selectGender",
      component: "SelectGender",
      texts: {
        headerCaption: "",
        header: "CS_COMMON_CHOOSE_GENDER",
        cardText: "CS_COMMON_SELECT_GENDER",
        submitBarLabel: "CS_COMMON_NEXT",
        skipText: "CORE_COMMON_SKIP_CONTINUE"
      }
    }, {
      label: t("ES_FSM_REGISTRY_NEW_DOB"),
      isMandatory: false,
      type: "custom",
      key: "dob",
      populators: {
        name: "dob",
        validation: {
          required: true
        },
        component: (props, customProps) => /*#__PURE__*/React.createElement(DatePicker$2, Object.assign({
          onChange: props.onChange,
          date: props.value
        }, customProps, {
          max: convertEpochToDate(new Date().setFullYear(new Date().getFullYear()))
        }))
      }
    }, {
      label: "ES_FSM_REGISTRY_NEW_EMAIL",
      isMandatory: false,
      type: "text",
      key: "emailId",
      populators: {
        name: "emailId",
        validation: {
          required: false,
          pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9.-]+$/
        },
        error: t("FSM_REGISTRY_INVALID_EMAIL"),
        defaultValue: "",
        className: "payment-form-text-input-correction"
      }
    }, {
      label: "ES_FSM_REGISTRY_DRIVER_PHONE",
      isMandatory: true,
      type: "mobileNumber",
      key: "phone",
      disable: disabled,
      populators: {
        name: "phone",
        validation: {
          required: true,
          pattern: /^[6-9]\d{9}$/
        },
        error: t("FSM_REGISTRY_INVALID_PHONE"),
        defaultValue: "",
        className: "payment-form-text-input-correction",
        labelStyle: {
          border: "1px solid black",
          borderRight: "none"
        }
      }
    }]
  }];
};

const AddDriver = ({
  parentUrl,
  heading
}) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  const [showToast, setShowToast] = useState(null);
  const history = useHistory();
  const queryClient = useQueryClient();
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("FSM_MUTATION_HAPPENED", false);
  const [errorInfo, setErrorInfo, clearError] = Digit.Hooks.useSessionStorage("FSM_ERROR_DATA", false);
  const [successData, setsuccessData, clearSuccessData] = Digit.Hooks.useSessionStorage("FSM_MUTATION_SUCCESS_DATA", false);
  const {
    isLoading: isLoading,
    isError: vendorCreateError,
    data: updateResponse,
    error: updateError,
    mutate
  } = Digit.Hooks.fsm.useDriverCreate(tenantId);
  useEffect(() => {
    setMutationHappened(false);
    clearSuccessData();
    clearError();
  }, []);
  const {
    t
  } = useTranslation();
  const Config = DriverConfig(t);
  const [canSubmit, setSubmitValve] = useState(false);
  const defaultValues = {
    tripData: {
      noOfTrips: 1,
      amountPerTrip: null,
      amount: null
    }
  };
  const onFormValueChange = (setValue, formData) => {
    if (formData !== null && formData !== void 0 && formData.driverName && formData !== null && formData !== void 0 && formData.phone && formData !== null && formData !== void 0 && formData.selectGender) {
      setSubmitValve(true);
    } else {
      setSubmitValve(false);
    }
  };
  const closeToast = () => {
    setShowToast(null);
  };
  const onSubmit = data => {
    var _data$selectGender;
    const name = data === null || data === void 0 ? void 0 : data.driverName;
    const license = data === null || data === void 0 ? void 0 : data.license;
    const gender = data === null || data === void 0 ? void 0 : (_data$selectGender = data.selectGender) === null || _data$selectGender === void 0 ? void 0 : _data$selectGender.code;
    const emailId = data === null || data === void 0 ? void 0 : data.emailId;
    const phone = data === null || data === void 0 ? void 0 : data.phone;
    const dob = new Date(`${data.dob}`).getTime() || new Date(`1/1/1970`).getTime();
    const additionalDetails = data === null || data === void 0 ? void 0 : data.additionalDetails;
    const formData = {
      driver: {
        tenantId: tenantId,
        name: name,
        licenseNumber: license,
        additionalDetails: additionalDetails,
        status: "ACTIVE",
        owner: {
          tenantId: stateId,
          name: name,
          fatherOrHusbandName: name,
          relationship: "OTHER",
          gender: gender,
          dob: dob,
          emailId: emailId || "abc@egov.com",
          mobileNumber: phone
        },
        vendorDriverStatus: "INACTIVE"
      }
    };
    mutate(formData, {
      onError: (error, variables) => {
        setShowToast({
          key: "error",
          action: error
        });
        setTimeout(closeToast, 5000);
      },
      onSuccess: (data, variables) => {
        setShowToast({
          key: "success",
          action: "ADD_DRIVER"
        });
        setTimeout(closeToast, 5000);
        queryClient.invalidateQueries("FSM_DRIVER_SEARCH");
        setTimeout(() => {
          closeToast();
          history.push(`/digit-ui/employee/fsm/registry`);
        }, 5000);
      }
    });
  };
  const isMobile = window.Digit.Utils.browser.isMobile();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Header, null, t("ES_FSM_REGISTRY_TITLE_NEW_DRIVER"))), /*#__PURE__*/React.createElement("div", {
    style: !isMobile ? {
      marginLeft: "-15px"
    } : {}
  }, /*#__PURE__*/React.createElement(FormComposer, {
    isDisabled: !canSubmit,
    label: t("ES_COMMON_APPLICATION_SUBMIT"),
    config: Config.filter(i => !i.hideInEmployee).map(config => {
      return {
        ...config,
        body: config.body.filter(a => !a.hideInEmployee)
      };
    }),
    fieldStyle: {
      marginRight: 0
    },
    onSubmit: onSubmit,
    defaultValues: defaultValues,
    onFormValueChange: onFormValueChange,
    noBreakLine: true
  }), showToast && /*#__PURE__*/React.createElement(Toast, {
    error: showToast.key === "error" ? true : false,
    label: t(showToast.key === "success" ? `ES_FSM_${showToast.action}_SUCCESS` : showToast.action),
    onClose: closeToast
  })));
};

const EditDriver = ({
  parentUrl,
  heading
}) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  let {
    id: dsoId
  } = useParams();
  const [showToast, setShowToast] = useState(null);
  const [canSubmit, setSubmitValve] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});
  const [driverDetails, setDriverDetails] = useState({});
  const queryClient = useQueryClient();
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("FSM_MUTATION_HAPPENED", false);
  const [errorInfo, setErrorInfo, clearError] = Digit.Hooks.useSessionStorage("FSM_ERROR_DATA", false);
  const [successData, setsuccessData, clearSuccessData] = Digit.Hooks.useSessionStorage("FSM_MUTATION_SUCCESS_DATA", false);
  const {
    data: driverData,
    isLoading: daoDataLoading,
    isSuccess: isDriverSuccess,
    error: driverError
  } = Digit.Hooks.fsm.useDriverDetails(tenantId, {
    ids: dsoId
  }, {
    staleTime: Infinity
  });
  const {
    isLoading: isLoading,
    isError: vendorCreateError,
    data: updateResponse,
    error: updateError,
    mutate
  } = Digit.Hooks.fsm.useDriverUpdate(tenantId);
  useEffect(() => {
    setMutationHappened(false);
    clearSuccessData();
    clearError();
  }, []);
  useEffect(() => {
    if (driverData && driverData[0]) {
      var _driverDetails$driver, _driverDetails$driver2, _driverDetails$driver3, _driverDetails$driver4, _driverDetails$driver5, _driverDetails$driver6, _driverDetails$driver7, _driverDetails$driver8, _driverDetails$driver9, _driverDetails$driver10, _driverDetails$driver11, _driverDetails$driver12, _driverDetails$driver13, _driverDetails$driver14, _driverDetails$driver15, _driverDetails$driver16;
      let driverDetails = driverData[0];
      setDriverDetails(driverDetails === null || driverDetails === void 0 ? void 0 : driverDetails.driverData);
      let values = {
        driverName: driverDetails === null || driverDetails === void 0 ? void 0 : (_driverDetails$driver = driverDetails.driverData) === null || _driverDetails$driver === void 0 ? void 0 : _driverDetails$driver.name,
        license: driverDetails === null || driverDetails === void 0 ? void 0 : (_driverDetails$driver2 = driverDetails.driverData) === null || _driverDetails$driver2 === void 0 ? void 0 : _driverDetails$driver2.licenseNumber,
        selectGender: driverDetails === null || driverDetails === void 0 ? void 0 : (_driverDetails$driver3 = driverDetails.driverData) === null || _driverDetails$driver3 === void 0 ? void 0 : (_driverDetails$driver4 = _driverDetails$driver3.owner) === null || _driverDetails$driver4 === void 0 ? void 0 : _driverDetails$driver4.gender,
        dob: (driverDetails === null || driverDetails === void 0 ? void 0 : (_driverDetails$driver5 = driverDetails.driverData) === null || _driverDetails$driver5 === void 0 ? void 0 : (_driverDetails$driver6 = _driverDetails$driver5.owner) === null || _driverDetails$driver6 === void 0 ? void 0 : _driverDetails$driver6.dob) && Digit.DateUtils.ConvertTimestampToDate(driverDetails === null || driverDetails === void 0 ? void 0 : (_driverDetails$driver7 = driverDetails.driverData) === null || _driverDetails$driver7 === void 0 ? void 0 : (_driverDetails$driver8 = _driverDetails$driver7.owner) === null || _driverDetails$driver8 === void 0 ? void 0 : _driverDetails$driver8.dob, "yyyy-MM-dd"),
        emailId: (driverDetails === null || driverDetails === void 0 ? void 0 : (_driverDetails$driver9 = driverDetails.driverData) === null || _driverDetails$driver9 === void 0 ? void 0 : (_driverDetails$driver10 = _driverDetails$driver9.owner) === null || _driverDetails$driver10 === void 0 ? void 0 : _driverDetails$driver10.emailId) === "abc@egov.com" ? "" : driverDetails === null || driverDetails === void 0 ? void 0 : (_driverDetails$driver11 = driverDetails.driverData) === null || _driverDetails$driver11 === void 0 ? void 0 : (_driverDetails$driver12 = _driverDetails$driver11.owner) === null || _driverDetails$driver12 === void 0 ? void 0 : _driverDetails$driver12.emailId,
        phone: driverDetails === null || driverDetails === void 0 ? void 0 : (_driverDetails$driver13 = driverDetails.driverData) === null || _driverDetails$driver13 === void 0 ? void 0 : (_driverDetails$driver14 = _driverDetails$driver13.owner) === null || _driverDetails$driver14 === void 0 ? void 0 : _driverDetails$driver14.mobileNumber,
        additionalDetails: driverDetails === null || driverDetails === void 0 ? void 0 : (_driverDetails$driver15 = driverDetails.driverData) === null || _driverDetails$driver15 === void 0 ? void 0 : (_driverDetails$driver16 = _driverDetails$driver15.additionalDetails) === null || _driverDetails$driver16 === void 0 ? void 0 : _driverDetails$driver16.description
      };
      setDefaultValues(values);
    }
  }, [driverData]);
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const Config = DriverConfig(t, true);
  const onFormValueChange = (setValue, formData) => {
    if (formData !== null && formData !== void 0 && formData.selectGender) {
      setSubmitValve(true);
    } else {
      setSubmitValve(false);
    }
  };
  const closeToast = () => {
    setShowToast(null);
  };
  const onSubmit = data => {
    var _data$selectGender, _driverDetails$owner;
    const license = data === null || data === void 0 ? void 0 : data.license;
    const gender = data === null || data === void 0 ? void 0 : (_data$selectGender = data.selectGender) === null || _data$selectGender === void 0 ? void 0 : _data$selectGender.code;
    const emailId = data === null || data === void 0 ? void 0 : data.emailId;
    const dob = new Date(`${data.dob}`).getTime();
    const additionalDetails = data === null || data === void 0 ? void 0 : data.additionalDetails;
    const formData = {
      driver: {
        ...driverDetails,
        licenseNumber: license,
        additionalDetails: additionalDetails,
        owner: {
          ...driverDetails.owner,
          relationship: ((_driverDetails$owner = driverDetails.owner) === null || _driverDetails$owner === void 0 ? void 0 : _driverDetails$owner.relationship) || "OTHER",
          gender: gender || driverDetails.owner.gender || "OTHER",
          dob: dob,
          emailId: emailId || "abc@egov.com"
        }
      }
    };
    mutate(formData, {
      onError: (error, variables) => {
        setShowToast({
          key: "error",
          action: error
        });
        setTimeout(closeToast, 5000);
      },
      onSuccess: (data, variables) => {
        setShowToast({
          key: "success",
          action: "UPDATE_DRIVER"
        });
        setTimeout(closeToast, 5000);
        queryClient.invalidateQueries("FSM_DRIVER_SEARCH");
        setTimeout(() => {
          closeToast();
          history.push(`/digit-ui/employee/fsm/registry/driver-details/${dsoId}`);
        }, 5000);
      }
    });
  };
  const isMobile = window.Digit.Utils.browser.isMobile();
  if (daoDataLoading || Object.keys(defaultValues).length == 0) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Header, null, t("ES_FSM_REGISTRY_TITLE_EDIT_DRIVER"))), /*#__PURE__*/React.createElement("div", {
    style: !isMobile ? {
      marginLeft: "-15px"
    } : {}
  }, /*#__PURE__*/React.createElement(FormComposer, {
    isDisabled: !canSubmit,
    label: t("ES_COMMON_APPLICATION_SUBMIT"),
    config: Config.filter(i => !i.hideInEmployee).map(config => {
      return {
        ...config,
        body: config.body.filter(a => !a.hideInEmployee)
      };
    }),
    fieldStyle: {
      marginRight: 0
    },
    onSubmit: onSubmit,
    defaultValues: defaultValues,
    onFormValueChange: onFormValueChange,
    noBreakLine: true
  }), showToast && /*#__PURE__*/React.createElement(Toast, {
    error: showToast.key === "error" ? true : false,
    label: t(showToast.key === "success" ? `ES_FSM_REGISTRY_${showToast.action}_SUCCESS` : showToast.action),
    onClose: closeToast
  })));
};

const AdvanceCollection = ({
  t,
  config,
  onSelect,
  formData,
  userType,
  FSMTextFieldStyle
}) => {
  var _formData$tripData, _formData$address, _formData$tripData6, _formData$tripData6$v, _formData$tripData7, _formData$tripData8;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const state = Digit.ULBService.getStateId();
  const {
    pathname: url
  } = useLocation();
  let {
    id: applicationNumber
  } = useParams();
  const userInfo = Digit.UserService.getUser();
  const [TotalAmount, setTotalAmount] = useState();
  const [AdvanceAmount, setAdvanceAmounts] = useState();
  const {
    isLoading: applicationLoading,
    isError,
    data: applicationData,
    error
  } = Digit.Hooks.fsm.useSearch(tenantId, {
    applicationNos: applicationNumber,
    uuid: userInfo.uuid
  }, {
    staleTime: Infinity
  });
  const [vehicle, setVehicle] = useState({
    label: formData === null || formData === void 0 ? void 0 : (_formData$tripData = formData.tripData) === null || _formData$tripData === void 0 ? void 0 : _formData$tripData.vehicleCapacity
  });
  const [billError, setError] = useState(false);
  const {
    isLoading: isVehicleMenuLoading,
    data: vehicleData
  } = Digit.Hooks.fsm.useMDMS(state, "Vehicle", "VehicleType", {
    staleTime: Infinity
  });
  const {
    data: dsoData,
    isLoading: isDsoLoading,
    isSuccess: isDsoSuccess,
    error: dsoError
  } = Digit.Hooks.fsm.useDsoSearch(tenantId, {
    limit: -1,
    status: "ACTIVE"
  });
  const inputs = [{
    label: "ES_NEW_APPLICATION_ADVANCE_COLLECTION",
    type: "text",
    name: "advanceAmount",
    validation: {
      isRequired: true,
      min: "0",
      pattern: `^[0-9]+`,
      title: t("ES_NEW_APPLICATION_AMOUNT_INVALID")
    },
    default: formData === null || formData === void 0 ? void 0 : formData.advanceAmount,
    isMandatory: true
  }];
  function setValue(object) {
    onSelect(config.key, {
      ...formData[config.key],
      ...object
    });
  }
  function setAdvanceAmount(value) {
    onSelect(config.key, {
      ...formData[config.key],
      advanceAmount: value
    });
  }
  useEffect(() => {
    (async (_formData$tripData2, _formData$tripData4, _formData$tripData4$v) => {
      if ((formData === null || formData === void 0 ? void 0 : (_formData$tripData2 = formData.tripData) === null || _formData$tripData2 === void 0 ? void 0 : _formData$tripData2.vehicleType) !== vehicle) {
        var _formData$tripData3, _formData$tripData3$v;
        setVehicle({
          label: formData === null || formData === void 0 ? void 0 : (_formData$tripData3 = formData.tripData) === null || _formData$tripData3 === void 0 ? void 0 : (_formData$tripData3$v = _formData$tripData3.vehicleType) === null || _formData$tripData3$v === void 0 ? void 0 : _formData$tripData3$v.capacity
        });
      }
      if (formData !== null && formData !== void 0 && formData.propertyType && formData !== null && formData !== void 0 && formData.subtype && formData !== null && formData !== void 0 && formData.address && formData !== null && formData !== void 0 && (_formData$tripData4 = formData.tripData) !== null && _formData$tripData4 !== void 0 && (_formData$tripData4$v = _formData$tripData4.vehicleType) !== null && _formData$tripData4$v !== void 0 && _formData$tripData4$v.capacity) {
        var _formData$tripData5, _billingDetails$billi;
        const capacity = formData === null || formData === void 0 ? void 0 : (_formData$tripData5 = formData.tripData) === null || _formData$tripData5 === void 0 ? void 0 : _formData$tripData5.vehicleType.capacity;
        const {
          slum: slumDetails
        } = formData.address;
        const slum = slumDetails ? "YES" : "NO";
        const billingDetails = await Digit.FSMService.billingSlabSearch(tenantId, {
          propertyType: formData === null || formData === void 0 ? void 0 : formData.subtype,
          capacity,
          slum
        });
        const billSlab = (billingDetails === null || billingDetails === void 0 ? void 0 : (_billingDetails$billi = billingDetails.billingSlab) === null || _billingDetails$billi === void 0 ? void 0 : _billingDetails$billi.length) && (billingDetails === null || billingDetails === void 0 ? void 0 : billingDetails.billingSlab[0]);
        if (billSlab !== null && billSlab !== void 0 && billSlab.price || (billSlab === null || billSlab === void 0 ? void 0 : billSlab.price) === 0) {
          var _formData$advancepaym;
          const totaltripAmount = billSlab.price * formData.tripData.noOfTrips;
          const {
            advanceAmount: advanceBalanceAmount
          } = await Digit.FSMService.advanceBalanceCalculate(tenantId, {
            totalTripAmount: totaltripAmount
          });
          Digit.SessionStorage.set("total_amount", totaltripAmount);
          Digit.SessionStorage.set("advance_amount", advanceBalanceAmount);
          setTotalAmount(totaltripAmount);
          setAdvanceAmounts(advanceBalanceAmount);
          !url.includes("modify") || url.includes("modify") && advanceBalanceAmount > (formData === null || formData === void 0 ? void 0 : (_formData$advancepaym = formData.advancepaymentPreference) === null || _formData$advancepaym === void 0 ? void 0 : _formData$advancepaym.advanceAmount) ? setValue({
            advanceAmount: advanceBalanceAmount
          }) : null;
          setError(false);
        } else {
          sessionStorage.removeItem("Digit.total_amount");
          sessionStorage.removeItem("Digit.advance_amount");
          setError(true);
        }
      }
    })();
  }, [formData === null || formData === void 0 ? void 0 : formData.propertyType, formData === null || formData === void 0 ? void 0 : formData.subtype, formData === null || formData === void 0 ? void 0 : (_formData$address = formData.address) === null || _formData$address === void 0 ? void 0 : _formData$address.slum, formData === null || formData === void 0 ? void 0 : (_formData$tripData6 = formData.tripData) === null || _formData$tripData6 === void 0 ? void 0 : (_formData$tripData6$v = _formData$tripData6.vehicleType) === null || _formData$tripData6$v === void 0 ? void 0 : _formData$tripData6$v.capacity, formData === null || formData === void 0 ? void 0 : (_formData$tripData7 = formData.tripData) === null || _formData$tripData7 === void 0 ? void 0 : _formData$tripData7.noOfTrips]);
  return isVehicleMenuLoading && isDsoLoading ? /*#__PURE__*/React.createElement(Loader, null) : /*#__PURE__*/React.createElement("div", null, (formData === null || formData === void 0 ? void 0 : (_formData$tripData8 = formData.tripData) === null || _formData$tripData8 === void 0 ? void 0 : _formData$tripData8.amountPerTrip) !== 0 && (inputs === null || inputs === void 0 ? void 0 : inputs.map((input, index) => {
    var _formData$advancepaym2;
    let currentValue = formData && formData[config.key] && formData[config.key][input.name];
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: index
    }, /*#__PURE__*/React.createElement(LabelFieldPair, {
      key: index
    }, /*#__PURE__*/React.createElement(CardLabel, {
      className: "card-label-smaller"
    }, t(input.label) + " (₹)", input.isMandatory ? " * " : null), /*#__PURE__*/React.createElement("div", {
      className: "field"
    }, /*#__PURE__*/React.createElement(TextInput, Object.assign({
      disabled: url.includes("modify") && (formData === null || formData === void 0 ? void 0 : (_formData$advancepaym2 = formData.advancepaymentPreference) === null || _formData$advancepaym2 === void 0 ? void 0 : _formData$advancepaym2.advanceAmount) === 0 || AdvanceAmount === TotalAmount ? true : false,
      type: input.type,
      key: input.name,
      style: FSMTextFieldStyle,
      onChange: e => setAdvanceAmount(e.target.value),
      value: input.default ? input.default : formData && formData[config.key] ? formData[config.key][input.name] : null
    }, input.validation)), currentValue > TotalAmount && /*#__PURE__*/React.createElement(CardLabelError, {
      style: {
        width: "100%",
        marginTop: "-15px",
        fontSize: "14px",
        marginBottom: "0px"
      }
    }, t("FSM_ADVANCE_AMOUNT_MAX")), currentValue < AdvanceAmount && /*#__PURE__*/React.createElement(CardLabelError, {
      style: {
        width: "100%",
        marginTop: "-15px",
        fontSize: "14px",
        marginBottom: "0px"
      }
    }, t("FSM_ADVANCE_AMOUNT_MIN")), url.includes("modify-application") && Number(AdvanceAmount) === 0 && (applicationData === null || applicationData === void 0 ? void 0 : applicationData.advanceAmount) > 0 && Number(currentValue) === 0 && /*#__PURE__*/React.createElement(CardLabelError, {
      style: {
        width: "100%",
        marginTop: "-15px",
        fontSize: "14px",
        marginBottom: "0px"
      }
    }, t("FSM_ADVANCE_AMOUNT_NOT_ZERO")))));
  })));
};

const SelectTrips = ({
  t,
  config,
  onSelect,
  formData: _formData = {},
  userType,
  styles,
  FSMTextFieldStyle
}) => {
  var _formData$tripData, _formData$tripData2, _formData$tripData7, _formData$tripData7$v, _formData$tripData8;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const state = Digit.ULBService.getStateId();
  const {
    pathname: url
  } = useLocation();
  const editScreen = url.includes("/modify-application/");
  let {
    id: applicationNumber
  } = useParams();
  const userInfo = Digit.UserService.getUser();
  const {
    isLoading: applicationLoading,
    isError,
    data: applicationData,
    error
  } = Digit.Hooks.fsm.useSearch(tenantId, {
    applicationNos: applicationNumber,
    uuid: userInfo.uuid
  }, {
    staleTime: Infinity
  });
  const [vehicle, setVehicle] = useState({
    label: _formData === null || _formData === void 0 ? void 0 : (_formData$tripData = _formData.tripData) === null || _formData$tripData === void 0 ? void 0 : _formData$tripData.vehicleCapacity
  });
  const [billError, setError] = useState(false);
  const {
    isLoading: isVehicleMenuLoading,
    data: vehicleData
  } = Digit.Hooks.fsm.useMDMS(state, "Vehicle", "VehicleType", {
    staleTime: Infinity
  });
  const {
    data: dsoData,
    isLoading: isDsoLoading,
    isSuccess: isDsoSuccess,
    error: dsoError
  } = Digit.Hooks.fsm.useDsoSearch(tenantId, {
    limit: -1,
    status: "ACTIVE"
  });
  const [vehicleMenu, setVehicleMenu] = useState([]);
  useEffect(() => {
    if (dsoData && vehicleData) {
      const allVehicles = dsoData.reduce((acc, curr) => {
        return curr.vehicles && curr.vehicles.length ? acc.concat(curr.vehicles) : acc;
      }, []);
      const cpacityMenu = Array.from(new Set(allVehicles.map(a => a.capacity))).map(capacity => allVehicles.find(a => a.capacity === capacity));
      setVehicleMenu(cpacityMenu);
    }
  }, [dsoData, vehicleData]);
  const inputs = [{
    label: "ES_NEW_APPLICATION_PAYMENT_NO_OF_TRIPS",
    type: "text",
    name: "noOfTrips",
    error: t("ES_NEW_APPLICATION_NO_OF_TRIPS_INVALID"),
    validation: {
      isRequired: true,
      pattern: `^[1-9]+`,
      min: "1",
      title: t("ES_NEW_APPLICATION_NO_OF_TRIPS_INVALID")
    },
    default: _formData === null || _formData === void 0 ? void 0 : (_formData$tripData2 = _formData.tripData) === null || _formData$tripData2 === void 0 ? void 0 : _formData$tripData2.noOfTrips,
    disable: false,
    isMandatory: true
  }];
  function setTripNum(value) {
    onSelect(config.key, {
      ..._formData[config.key],
      noOfTrips: value
    });
  }
  function selectVehicle(value) {
    setVehicle({
      label: value.capacity
    });
    onSelect(config.key, {
      ..._formData[config.key],
      vehicleType: value
    });
  }
  function setValue(object) {
    onSelect(config.key, {
      ..._formData[config.key],
      ...object
    });
  }
  useEffect(() => {
    (async (_formData$tripData3, _formData$tripData5, _formData$tripData5$v) => {
      if ((_formData === null || _formData === void 0 ? void 0 : (_formData$tripData3 = _formData.tripData) === null || _formData$tripData3 === void 0 ? void 0 : _formData$tripData3.vehicleType) !== vehicle) {
        var _formData$tripData4, _formData$tripData4$v;
        setVehicle({
          label: _formData === null || _formData === void 0 ? void 0 : (_formData$tripData4 = _formData.tripData) === null || _formData$tripData4 === void 0 ? void 0 : (_formData$tripData4$v = _formData$tripData4.vehicleType) === null || _formData$tripData4$v === void 0 ? void 0 : _formData$tripData4$v.capacity
        });
      }
      if (_formData !== null && _formData !== void 0 && _formData.propertyType && _formData !== null && _formData !== void 0 && _formData.subtype && _formData !== null && _formData !== void 0 && _formData.address && _formData !== null && _formData !== void 0 && (_formData$tripData5 = _formData.tripData) !== null && _formData$tripData5 !== void 0 && (_formData$tripData5$v = _formData$tripData5.vehicleType) !== null && _formData$tripData5$v !== void 0 && _formData$tripData5$v.capacity) {
        var _formData$tripData6, _billingDetails$billi;
        const capacity = _formData === null || _formData === void 0 ? void 0 : (_formData$tripData6 = _formData.tripData) === null || _formData$tripData6 === void 0 ? void 0 : _formData$tripData6.vehicleType.capacity;
        const {
          slum: slumDetails
        } = _formData.address;
        const slum = slumDetails ? "YES" : "NO";
        const billingDetails = await Digit.FSMService.billingSlabSearch(tenantId, {
          propertyType: _formData === null || _formData === void 0 ? void 0 : _formData.subtype,
          capacity,
          slum
        });
        const billSlab = (billingDetails === null || billingDetails === void 0 ? void 0 : (_billingDetails$billi = billingDetails.billingSlab) === null || _billingDetails$billi === void 0 ? void 0 : _billingDetails$billi.length) && (billingDetails === null || billingDetails === void 0 ? void 0 : billingDetails.billingSlab[0]);
        if (billSlab !== null && billSlab !== void 0 && billSlab.price || (billSlab === null || billSlab === void 0 ? void 0 : billSlab.price) === 0) {
          setValue({
            amountPerTrip: billSlab.price,
            amount: billSlab.price * _formData.tripData.noOfTrips
          });
          setError(false);
        } else {
          setValue({
            amountPerTrip: "",
            amount: ""
          });
          setError(true);
        }
      }
    })();
  }, [_formData === null || _formData === void 0 ? void 0 : _formData.propertyType, _formData === null || _formData === void 0 ? void 0 : _formData.subtype, _formData === null || _formData === void 0 ? void 0 : _formData.address, _formData === null || _formData === void 0 ? void 0 : (_formData$tripData7 = _formData.tripData) === null || _formData$tripData7 === void 0 ? void 0 : (_formData$tripData7$v = _formData$tripData7.vehicleType) === null || _formData$tripData7$v === void 0 ? void 0 : _formData$tripData7$v.capacity, _formData === null || _formData === void 0 ? void 0 : (_formData$tripData8 = _formData.tripData) === null || _formData$tripData8 === void 0 ? void 0 : _formData$tripData8.noOfTrips]);
  return isVehicleMenuLoading && isDsoLoading ? /*#__PURE__*/React.createElement(Loader, null) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(LabelFieldPair, null, /*#__PURE__*/React.createElement(CardLabel, {
    className: "card-label-smaller"
  }, t("ES_NEW_APPLICATION_LOCATION_VEHICLE_REQUESTED") + " * "), /*#__PURE__*/React.createElement(Dropdown$2, {
    className: "form-field",
    style: styles,
    isMandatory: true,
    option: vehicleMenu === null || vehicleMenu === void 0 ? void 0 : vehicleMenu.map(vehicle => ({
      ...vehicle,
      label: vehicle.capacity
    })).sort((a, b) => a.capacity - b.capacity),
    optionKey: "label",
    id: "vehicle",
    selected: vehicle,
    select: selectVehicle,
    t: t,
    disable: editScreen && (applicationData === null || applicationData === void 0 ? void 0 : applicationData.applicationStatus) != "CREATED" ? true : false
  })), inputs === null || inputs === void 0 ? void 0 : inputs.map((input, index) => /*#__PURE__*/React.createElement(LabelFieldPair, {
    key: index
  }, /*#__PURE__*/React.createElement(CardLabel, {
    className: "card-label-smaller"
  }, t(input.label), input.isMandatory ? " * " : null), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement(TextInput, Object.assign({
    type: input.type,
    style: {
      ...styles,
      ...FSMTextFieldStyle
    },
    onChange: e => setTripNum(e.target.value),
    key: input.name,
    value: input.default ? input.default : _formData && _formData[config.key] ? _formData[config.key][input.name] : null
  }, input.validation, {
    disable: input.disable
  }))))), billError ? /*#__PURE__*/React.createElement(CardLabelError, {
    style: {
      width: "100%",
      textAlign: "center"
    }
  }, t("ES_APPLICATION_BILL_SLAB_ERROR")) : null);
};

const FSMModule = ({
  stateCode,
  userType,
  tenants
}) => {
  const moduleCode = "FSM";
  const {
    path,
    url
  } = useRouteMatch();
  const language = Digit.StoreData.getCurrentLanguage();
  const {
    isLoading,
    data: store
  } = Digit.Services.useStore({
    stateCode,
    moduleCode,
    language
  });
  if (isLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  Digit.SessionStorage.set("FSM_TENANTS", tenants);
  if (userType === "citizen") {
    return /*#__PURE__*/React.createElement(CitizenApp, {
      path: path
    });
  } else {
    return /*#__PURE__*/React.createElement(EmployeeApp, {
      path: path,
      url: url,
      userType: userType
    });
  }
};
const FSMLinks = ({
  matchPath,
  userType
}) => {
  const {
    t
  } = useTranslation();
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("FSM_CITIZEN_FILE_PROPERTY", {});
  useEffect(() => {
    clearParams();
  }, []);
  const roleBasedLoginRoutes = [{
    role: "FSM_DSO",
    from: "/digit-ui/citizen/fsm/dso-dashboard",
    dashoardLink: "CS_LINK_DSO_DASHBOARD",
    loginLink: "CS_LINK_LOGIN_DSO"
  }];
  if (userType === "citizen") {
    const links = [{
      link: `${matchPath}/new-application`,
      i18nKey: t("CS_HOME_APPLY_FOR_DESLUDGING")
    }, {
      link: `${matchPath}/my-applications`,
      i18nKey: t("CS_HOME_MY_APPLICATIONS")
    }];
    roleBasedLoginRoutes.map(({
      role,
      from,
      loginLink,
      dashoardLink
    }) => {
      if (Digit.UserService.hasAccess(role)) links.push({
        link: from,
        i18nKey: t(dashoardLink)
      });else links.push({
        link: `/digit-ui/citizen/login`,
        state: {
          role: "FSM_DSO",
          from
        },
        i18nKey: t(loginLink)
      });
    });
    return /*#__PURE__*/React.createElement(CitizenHomeCard, {
      header: t("CS_HOME_FSM_SERVICES"),
      links: links,
      Icon: CitizenTruck
    });
  } else {
    return /*#__PURE__*/React.createElement("div", {
      className: "employee-app-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ground-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "employeeCard"
    }, /*#__PURE__*/React.createElement("div", {
      className: "complaint-links-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "header"
    }, /*#__PURE__*/React.createElement("span", {
      className: "logo"
    }, /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      height: "24",
      viewBox: "0 0 24 24",
      width: "24"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M0 0h24v24H0z",
      fill: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z",
      fill: "white"
    }))), /*#__PURE__*/React.createElement("span", {
      className: "text"
    }, t("ES_TITLE_FSM"))), /*#__PURE__*/React.createElement("div", {
      className: "body"
    }, /*#__PURE__*/React.createElement("span", {
      className: "link"
    }, /*#__PURE__*/React.createElement(Link, {
      to: `${matchPath}/inbox`
    }, t("ES_TITLE_INBOX"))), /*#__PURE__*/React.createElement("span", {
      className: "link"
    }, /*#__PURE__*/React.createElement(Link, {
      to: `${matchPath}/new-application/`
    }, t("ES_TITLE_NEW_DESULDGING_APPLICATION"))))))));
  }
};
const componentsToRegister = {
  SelectPropertySubtype,
  SelectPropertyType,
  FSMSelectAddress,
  FSMSelectStreet,
  FSMSelectLandmark,
  FSMSelectPincode,
  SelectTankSize,
  SelectPitType,
  SelectTripNo,
  FSMSelectGeolocation,
  SelectSlumName,
  CheckSlum,
  FSMCard,
  FSMModule,
  FSMLinks,
  SelectChannel,
  SelectName,
  SelectTripData,
  SelectGender,
  SelectPaymentType,
  SelectPaymentPreference,
  FSMEmpInbox: Inbox,
  FSMFstpInbox: FstpInbox,
  FSMNewApplicationEmp: NewApplication,
  FSMEditApplication: EditApplication,
  FSMEmployeeApplicationDetails: ApplicationDetails$1,
  FSMFstpOperatorDetails: FstpOperatorDetails,
  FSMResponse: Response$1,
  FSMApplicationAudit: ApplicationAudit,
  FSMRateView: RateView,
  FSMNewApplicationCitizen: FileComplaint,
  FSMMyApplications: MyApplications,
  FSMCitizenApplicationDetails: ApplicationDetails,
  FSMSelectRating: SelectRating,
  FSMDsoDashboard: DsoDashboard,
  FSMRegistry,
  VendorDetails,
  AddVendor,
  EditVendor,
  VehicleDetails,
  AddVehicle,
  EditVehicle,
  SelectVehicle: SelectVehicleType,
  AddDriver,
  DriverDetails,
  EditDriver,
  FsmBreadCrumb,
  AdvanceCollection,
  SelectTrips,
  PlusMinusInput,
  ConfirmationBox
};
const initFSMComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};

export { initFSMComponents };
//# sourceMappingURL=index.modern.js.map
