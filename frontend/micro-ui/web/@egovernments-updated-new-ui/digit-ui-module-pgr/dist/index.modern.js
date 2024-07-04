import React, { useState, useEffect, useCallback, useContext, useMemo, Fragment as Fragment$1 } from 'react';
import { useHistory, useParams, Redirect, Link, Switch, Route, useLocation, useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EmployeeModuleCard, Card, CardHeader, CardText, CardLabelError, RadioButtons, SubmitBar, ImageUploadHandler, LinkButton, TextArea, Banner, RatingCard, FormStep, CardLabel, Dropdown, TypeSelectCard, LocationSearchCard, CardSubHeader, DateWrap, KeyNote, Header, Loader, CheckPoint, TelePhone, Rating, ActionLinks, ConnectingCheckPoints, DisplayPhotos, StatusTable, Row, ImageViewer, Toast, BackButton, PrivateRoute, BreadCrumb, EmployeeAppContainer, BreakLine, PopUp, HeaderBar, ActionBar, Menu, Modal, SectionalDropdown, CardLabelDesc, UploadFile, CardSectionHeader, LabelFieldPair, TextInput, Table, CheckBox, CloseSvg, RemoveableTag, ApplyFilterBar, Label, LinkLabel, DetailsCard, SearchAction, FilterAction, CitizenHomeCard, ComplaintIcon } from '@egovernments/digit-ui-react-components';
import { combineReducers } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import merge from 'lodash.merge';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';

const PGRCard = () => {
  const {
    t
  } = useTranslation();
  const allLinks = [{
    text: t("ES_PGR_INBOX"),
    link: "/digit-ui/employee/pgr/inbox"
  }, {
    text: t("ES_PGR_NEW_COMPLAINT"),
    link: "/digit-ui/employee/pgr/complaint/create",
    accessTo: ["CSR"]
  }];
  if (!Digit.Utils.pgrAccess()) {
    return null;
  }
  const Icon = () => /*#__PURE__*/React.createElement("svg", {
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
  }));
  let propsForCSR = [{
    label: t("ES_PGR_NEW_COMPLAINT"),
    link: `/digit-ui/employee/pgr/complaint/create`,
    role: "CSR"
  }];
  propsForCSR = propsForCSR.filter(link => link.role && Digit.Utils.didEmployeeHasRole(link.role));
  const propsForModuleCard = {
    Icon: /*#__PURE__*/React.createElement(Icon, null),
    moduleName: t("ES_PGR_HEADER_COMPLAINT"),
    kpis: [{
      label: t("TOTAL_PGR"),
      link: `/digit-ui/employee/pgr/inbox`
    }, {
      label: t("TOTAL_NEARING_SLA"),
      link: `/digit-ui/employee/pgr/inbox`
    }],
    links: [{
      label: t("ES_PGR_INBOX"),
      link: `/digit-ui/employee/pgr/inbox`
    }, ...propsForCSR]
  };
  return /*#__PURE__*/React.createElement(EmployeeModuleCard, propsForModuleCard);
};

const FETCH_COMPLAINTS = "FETCH_COMPLAINTS";
const UPDATE_COMPLAINT = "UPDATE_COMPLAINT";
const CREATE_COMPLAINT = "CREATE_COMPLAINT";
const APPLY_INBOX_FILTER = "APPLY_INBOX_FILTER";

function complaintReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_COMPLAINT:
      return {
        ...state,
        response: action.payload
      };
    case FETCH_COMPLAINTS:
      return {
        ...state,
        list: action.payload.complaints
      };
    case UPDATE_COMPLAINT:
      return {
        ...state,
        response: action.payload
      };
    case APPLY_INBOX_FILTER:
      return {
        ...state,
        response: action.payload.response.instances
      };
    default:
      return state;
  }
}

const getRootReducer = () => combineReducers({
  complaints: complaintReducer
});

const PGR_EMPLOYEE_COMPLAINT_DETAILS = "/complaint/details/";
const PGR_EMPLOYEE_CREATE_COMPLAINT = "/complaint/create";

const PgrRoutes = {
  ComplaintsPage: "/complaints",
  RatingAndFeedBack: "/rate/:id*",
  ComplaintDetailsPage: "/complaint/details/:id",
  ReasonPage: `/:id`,
  UploadPhoto: `/upload-photo/:id`,
  AddtionalDetails: `/addional-details/:id`,
  CreateComplaint: "/create-complaint",
  ReopenComplaint: "/reopen",
  Response: "/response",
  CreateComplaintStart: "",
  SubType: `/subtype`,
  LocationSearch: `/location`,
  Pincode: `/pincode`,
  Address: `/address`,
  Landmark: `/landmark`,
  UploadPhotos: `/upload-photos`,
  Details: `/details`,
  CreateComplaintResponse: `/response`
};
const Employee = {
  Inbox: "/inbox",
  ComplaintDetails: PGR_EMPLOYEE_COMPLAINT_DETAILS,
  CreateComplaint: PGR_EMPLOYEE_CREATE_COMPLAINT,
  Response: "/response",
  Home: "/digit-ui/employee"
};
const getRoute = (match, route) => `${match.path}${route}`;

const LOCALIZATION_KEY = {
  CS_COMPLAINT_DETAILS: "CS_COMPLAINT_DETAILS",
  CS_COMMON: "CS_COMMON",
  CS_COMPLAINT: "CS_COMPLAINT",
  CS_FEEDBACK: "CS_FEEDBACK",
  CS_HEADER: "CS_HEADER",
  CS_HOME: "CS_HOME",
  CS_ADDCOMPLAINT: "CS_ADDCOMPLAINT",
  CS_REOPEN: "CS_REOPEN",
  CS_CREATECOMPLAINT: "CS_CREATECOMPLAINT",
  PT_COMMONS: "PT_COMMONS",
  CORE_COMMON: "CORE_COMMON"
};
const LOCALE = {
  MY_COMPLAINTS: "CS_HOME_MY_COMPLAINTS",
  NO_COMPLAINTS: "CS_MYCOMPLAINTS_NO_COMPLAINTS",
  NO_COMPLAINTS_EMPLOYEE: "CS_MYCOMPLAINTS_NO_COMPLAINTS_EMPLOYEE",
  ERROR_LOADING_RESULTS: "CS_COMMON_ERROR_LOADING_RESULTS"
};

const ReasonPage = props => {
  const history = useHistory();
  const {
    t
  } = useTranslation();
  const {
    id
  } = useParams();
  const [selected, setSelected] = useState(null);
  const [valid, setValid] = useState(true);
  const onRadioChange = value => {
    let reopenDetails = Digit.SessionStorage.get(`reopen.${id}`);
    Digit.SessionStorage.set(`reopen.${id}`, {
      ...reopenDetails,
      reason: value
    });
    setSelected(value);
  };
  function onSave() {
    if (selected === null) {
      setValid(false);
    } else {
      history.push(`${props.match.path}/upload-photo/${id}`);
    }
  }
  return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, t(`${LOCALIZATION_KEY.CS_REOPEN}_COMPLAINT`)), /*#__PURE__*/React.createElement(CardText, null), valid ? null : /*#__PURE__*/React.createElement(CardLabelError, null, t(`${LOCALIZATION_KEY.CS_ADDCOMPLAINT}_ERROR_REOPEN_REASON`)), /*#__PURE__*/React.createElement(RadioButtons, {
    onSelect: onRadioChange,
    selectedOption: selected,
    options: [t(`${LOCALIZATION_KEY.CS_REOPEN}_OPTION_ONE`), t(`${LOCALIZATION_KEY.CS_REOPEN}_OPTION_TWO`), t(`${LOCALIZATION_KEY.CS_REOPEN}_OPTION_THREE`), t(`${LOCALIZATION_KEY.CS_REOPEN}_OPTION_FOUR`)]
  }), /*#__PURE__*/React.createElement(SubmitBar, {
    label: t(`CS_COMMON_NEXT`),
    onSubmit: onSave
  }));
};

const UploadPhoto = props => {
  var _props$complaintDetai, _props$complaintDetai2;
  const {
    t
  } = useTranslation();
  const history = useHistory();
  let {
    id
  } = useParams();
  const [verificationDocuments, setVerificationDocuments] = useState(null);
  const [valid, setValid] = useState(true);
  const handleUpload = ids => {
    setDocState(ids);
  };
  const setDocState = ids => {
    if (ids !== null && ids !== void 0 && ids.length) {
      const documents = ids.map(id => ({
        documentType: "PHOTO",
        fileStoreId: id,
        documentUid: "",
        additionalDetails: {}
      }));
      setVerificationDocuments(documents);
    }
  };
  function save() {
    if (verificationDocuments === null) {
      setValid(false);
    } else {
      history.push(`${props.match.path}/addional-details/${id}`);
    }
  }
  function skip() {
    history.push(`${props.match.path}/addional-details/${id}`);
  }
  useEffect(() => {
    let reopenDetails = Digit.SessionStorage.get(`reopen.${id}`);
    Digit.SessionStorage.set(`reopen.${id}`, {
      ...reopenDetails,
      verificationDocuments
    });
  }, [verificationDocuments, id]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(ImageUploadHandler, {
    header: t(`${LOCALIZATION_KEY.CS_ADDCOMPLAINT}_UPLOAD_PHOTO`),
    tenantId: props === null || props === void 0 ? void 0 : (_props$complaintDetai = props.complaintDetails) === null || _props$complaintDetai === void 0 ? void 0 : (_props$complaintDetai2 = _props$complaintDetai.service) === null || _props$complaintDetai2 === void 0 ? void 0 : _props$complaintDetai2.tenantId,
    cardText: "",
    onPhotoChange: handleUpload,
    uploadedImages: null
  }), valid ? null : /*#__PURE__*/React.createElement(CardLabelError, null, t(`${LOCALIZATION_KEY.CS_ADDCOMPLAINT}_UPLOAD_ERROR_MESSAGE`)), /*#__PURE__*/React.createElement(SubmitBar, {
    label: t(`${LOCALIZATION_KEY.PT_COMMONS}_NEXT`),
    onSubmit: save
  }), props.skip ? /*#__PURE__*/React.createElement(LinkButton, {
    label: t(`${LOCALIZATION_KEY.CORE_COMMON}_SKIP_CONTINUE`),
    onClick: skip
  }) : null));
};

const createComplaint = ({
  cityCode,
  complaintType,
  description,
  landmark,
  city,
  district,
  region,
  state,
  pincode,
  localityCode,
  localityName,
  uploadedImages,
  mobileNumber,
  name
}) => async (dispatch, getState) => {
  const response = await Digit.Complaint.create({
    cityCode,
    complaintType,
    description,
    landmark,
    city,
    district,
    region,
    state,
    pincode,
    localityCode,
    localityName,
    uploadedImages,
    mobileNumber,
    name
  });
  dispatch({
    type: CREATE_COMPLAINT,
    payload: response
  });
};

const updateComplaints = data => async dispatch => {
  let ServiceWrappers = await Digit.PGRService.update(data);
  dispatch({
    type: UPDATE_COMPLAINT,
    payload: ServiceWrappers
  });
};

const AddtionalDetails = props => {
  const history = useHistory();
  let {
    id
  } = useParams();
  const dispatch = useDispatch();
  const appState = useSelector(state => state)["common"];
  let {
    t
  } = useTranslation();
  const {
    complaintDetails
  } = props;
  useEffect(() => {
    if (appState.complaints) {
      const {
        response
      } = appState.complaints;
      if (response && response.responseInfo.status === "successful") {
        history.push(`${props.match.path}/response/:${id}`);
      }
    }
  }, [appState.complaints, props.history]);
  const updateComplaint = useCallback(async complaintDetails => {
    await dispatch(updateComplaints(complaintDetails));
    history.push(`${props.match.path}/response/${id}`);
  }, [dispatch]);
  const getUpdatedWorkflow = (reopenDetails, type) => {
    switch (type) {
      case "REOPEN":
        return {
          action: "REOPEN",
          comments: reopenDetails.addtionalDetail,
          assignes: [],
          verificationDocuments: reopenDetails.verificationDocuments
        };
      default:
        return "";
    }
  };
  function reopenComplaint() {
    let reopenDetails = Digit.SessionStorage.get(`reopen.${id}`);
    if (complaintDetails) {
      complaintDetails.workflow = getUpdatedWorkflow(reopenDetails, "REOPEN");
      complaintDetails.service.additionalDetail = {
        REOPEN_REASON: reopenDetails.reason
      };
      updateComplaint({
        service: complaintDetails.service,
        workflow: complaintDetails.workflow
      });
    }
    return /*#__PURE__*/React.createElement(Redirect, {
      to: {
        pathname: `${props.parentRoute}/response`,
        state: {
          complaintDetails
        }
      }
    });
  }
  function textInput(e) {
    let reopenDetails = Digit.SessionStorage.get(`reopen.${id}`);
    Digit.SessionStorage.set(`reopen.${id}`, {
      ...reopenDetails,
      addtionalDetail: e.target.value
    });
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, t(`${LOCALIZATION_KEY.CS_ADDCOMPLAINT}_PROVIDE_ADDITIONAL_DETAILS`)), /*#__PURE__*/React.createElement(CardText, null, t(`${LOCALIZATION_KEY.CS_ADDCOMPLAINT}_ADDITIONAL_DETAILS_TEXT`)), /*#__PURE__*/React.createElement(TextArea, {
    name: "AdditionalDetails",
    onChange: textInput
  }), /*#__PURE__*/React.createElement("div", {
    onClick: reopenComplaint
  }, /*#__PURE__*/React.createElement(SubmitBar, {
    label: t(`${LOCALIZATION_KEY.CS_HEADER}_REOPEN_COMPLAINT`)
  }))));
};

const GetActionMessage = ({
  action
}) => {
  const {
    t
  } = useTranslation();
  switch (action) {
    case "REOPEN":
      return t(`CS_COMMON_COMPLAINT_REOPENED`);
    case "RATE":
      return t("CS_COMMON_THANK_YOU");
    default:
      return t(`CS_COMMON_COMPLAINT_SUBMITTED`);
  }
};
const BannerPicker = ({
  response
}) => {
  const {
    complaints
  } = response;
  const {
    t
  } = useTranslation();
  if (complaints && complaints.response && complaints.response.responseInfo) {
    return /*#__PURE__*/React.createElement(Banner, {
      message: GetActionMessage(complaints.response.ServiceWrappers[0].workflow),
      complaintNumber: complaints.response.ServiceWrappers[0].service.serviceRequestId,
      successful: true
    });
  } else {
    return /*#__PURE__*/React.createElement(Banner, {
      message: t("CS_COMMON_COMPLAINT_NOT_SUBMITTED"),
      successful: false
    });
  }
};
const TextPicker = ({
  response
}) => {
  const {
    complaints
  } = response;
  const {
    t
  } = useTranslation();
  if (complaints && complaints.response && complaints.response.responseInfo) {
    const {
      action
    } = complaints.response.ServiceWrappers[0].workflow;
    return action === "RATE" ? /*#__PURE__*/React.createElement(CardText, null, t("CS_COMMON_RATING_SUBMIT_TEXT")) : /*#__PURE__*/React.createElement(CardText, null, t("CS_COMMON_TRACK_COMPLAINT_TEXT"));
  }
};
const Response = props => {
  const {
    t
  } = useTranslation();
  const appState = useSelector(state => state)["pgr"];
  return /*#__PURE__*/React.createElement(Card, null, appState.complaints.response && /*#__PURE__*/React.createElement(BannerPicker, {
    response: appState
  }), appState.complaints.response && /*#__PURE__*/React.createElement(TextPicker, {
    response: appState
  }), /*#__PURE__*/React.createElement(Link, {
    to: "/digit-ui/citizen"
  }, /*#__PURE__*/React.createElement(SubmitBar, {
    label: t("CORE_COMMON_GO_TO_HOME")
  })));
};

const ReopenComplaint = ({
  match,
  history,
  parentRoute
}) => {
  var _Digit$SessionStorage;
  const allParams = window.location.pathname.split("/");
  const id = allParams[allParams.length - 1];
  const tenantId = ((_Digit$SessionStorage = Digit.SessionStorage.get("CITIZEN.COMMON.HOME.CITY")) === null || _Digit$SessionStorage === void 0 ? void 0 : _Digit$SessionStorage.code) || Digit.ULBService.getCurrentTenantId();
  const complaintDetails = Digit.Hooks.pgr.useComplaintDetails({
    tenantId: tenantId,
    id: id
  }).complaintDetails;
  return /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(Route, {
    exact: true,
    path: getRoute(match, PgrRoutes.ReasonPage),
    component: () => /*#__PURE__*/React.createElement(ReasonPage, Object.assign({
      match: match
    }, {
      complaintDetails
    }))
  }), /*#__PURE__*/React.createElement(Route, {
    path: getRoute(match, PgrRoutes.UploadPhoto),
    component: () => /*#__PURE__*/React.createElement(UploadPhoto, Object.assign({
      match: match,
      skip: true
    }, {
      complaintDetails
    }))
  }), /*#__PURE__*/React.createElement(Route, {
    path: getRoute(match, PgrRoutes.AddtionalDetails),
    component: () => /*#__PURE__*/React.createElement(AddtionalDetails, Object.assign({
      match: match,
      parentRoute: parentRoute
    }, {
      complaintDetails
    }))
  }), /*#__PURE__*/React.createElement(Route, {
    path: getRoute(match, PgrRoutes.Response),
    component: () => /*#__PURE__*/React.createElement(Response, {
      match: match
    })
  }));
};

const SelectRating = ({
  parentRoute
}) => {
  var _Digit$SessionStorage;
  const {
    t
  } = useTranslation();
  const {
    id
  } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  let tenantId = ((_Digit$SessionStorage = Digit.SessionStorage.get("CITIZEN.COMMON.HOME.CITY")) === null || _Digit$SessionStorage === void 0 ? void 0 : _Digit$SessionStorage.code) || Digit.ULBService.getCurrentTenantId();
  const complaintDetails = Digit.Hooks.pgr.useComplaintDetails({
    tenantId: tenantId,
    id: id
  }).complaintDetails;
  const updateComplaint = useCallback(complaintDetails => dispatch(updateComplaints(complaintDetails)), [dispatch]);
  const [submitError, setError] = useState(false);
  function log(data) {
    if (complaintDetails && data.rating > 0) {
      complaintDetails.service.rating = data.rating;
      complaintDetails.service.additionalDetail = data.CS_FEEDBACK_WHAT_WAS_GOOD.join(",");
      complaintDetails.workflow = {
        action: "RATE",
        comments: data.comments,
        verificationDocuments: []
      };
      updateComplaint({
        service: complaintDetails.service,
        workflow: complaintDetails.workflow
      });
      history.push(`${parentRoute}/response`);
    } else {
      setError(true);
    }
  }
  const config = {
    texts: {
      header: "CS_COMPLAINT_RATE_HELP_TEXT",
      submitBarLabel: "CS_COMMONS_NEXT"
    },
    inputs: [{
      type: "rate",
      maxRating: 5,
      label: t("CS_COMPLAINT_RATE_TEXT"),
      error: submitError ? /*#__PURE__*/React.createElement(CardLabelError, null, t("CS_FEEDBACK_ENTER_RATING_ERROR")) : null
    }, {
      type: "checkbox",
      label: "CS_FEEDBACK_WHAT_WAS_GOOD",
      checkLabels: [t("CS_FEEDBACK_SERVICES"), t("CS_FEEDBACK_RESOLUTION_TIME"), t("CS_FEEDBACK_QUALITY_OF_WORK"), t("CS_FEEDBACK_OTHERS")]
    }, {
      type: "textarea",
      label: t("CS_COMMON_COMMENTS"),
      name: "comments"
    }]
  };
  return /*#__PURE__*/React.createElement(RatingCard, Object.assign({}, {
    config: config
  }, {
    t: t,
    onSelect: log
  }));
};

const PGR_CITIZEN_CREATE_COMPLAINT = "PGR_CITIZEN_CREATE_COMPLAINT";

const GetActionMessage$1 = ({
  action
}) => {
  const {
    t
  } = useTranslation();
  switch (action) {
    case "REOPEN":
      return t(`CS_COMMON_COMPLAINT_REOPENED`);
    case "RATE":
      return t("CS_COMMON_THANK_YOU");
    default:
      return t(`CS_COMMON_COMPLAINT_SUBMITTED`);
  }
};
const BannerPicker$1 = ({
  response
}) => {
  const {
    complaints
  } = response;
  if (complaints && complaints.response && complaints.response.responseInfo) {
    return /*#__PURE__*/React.createElement(Banner, {
      message: GetActionMessage$1(complaints.response.ServiceWrappers[0].workflow),
      complaintNumber: complaints.response.ServiceWrappers[0].service.serviceRequestId,
      successful: true
    });
  } else {
    return /*#__PURE__*/React.createElement(Banner, {
      message: t("CS_COMMON_COMPLAINT_NOT_SUBMITTED"),
      successful: false
    });
  }
};
const Response$1 = props => {
  const {
    t
  } = useTranslation();
  const appState = useSelector(state => state)["pgr"];
  return /*#__PURE__*/React.createElement(Card, null, appState.complaints.response && /*#__PURE__*/React.createElement(BannerPicker$1, {
    response: appState
  }), /*#__PURE__*/React.createElement(CardText, null, t("CS_COMMON_TRACK_COMPLAINT_TEXT")), /*#__PURE__*/React.createElement(Link, {
    to: "/digit-ui/citizen"
  }, /*#__PURE__*/React.createElement(SubmitBar, {
    label: t("CORE_COMMON_GO_TO_HOME")
  })));
};

const SelectAddress = ({
  t,
  config,
  onSelect,
  value
}) => {
  const allCities = Digit.Hooks.pgr.useTenants();
  const cities = value !== null && value !== void 0 && value.pincode ? allCities.filter(city => {
    var _city$pincode;
    return city === null || city === void 0 ? void 0 : (_city$pincode = city.pincode) === null || _city$pincode === void 0 ? void 0 : _city$pincode.some(pin => pin == value["pincode"]);
  }) : allCities;
  const [selectedCity, setSelectedCity] = useState(() => {
    const {
      city_complaint
    } = value;
    return city_complaint ? city_complaint : null;
  });
  const {
    data: fetchedLocalities
  } = Digit.Hooks.useBoundaryLocalities(selectedCity === null || selectedCity === void 0 ? void 0 : selectedCity.code, "admin", {
    enabled: !!selectedCity
  }, t);
  const [localities, setLocalities] = useState(null);
  const [selectedLocality, setSelectedLocality] = useState(() => {
    const {
      locality_complaint
    } = value;
    return locality_complaint ? locality_complaint : null;
  });
  useEffect(() => {
    if (selectedCity && fetchedLocalities) {
      const {
        pincode
      } = value;
      let __localityList = pincode ? fetchedLocalities.filter(city => city["pincode"] == pincode) : fetchedLocalities;
      setLocalities(__localityList);
    }
  }, [selectedCity, fetchedLocalities]);
  function selectCity(city) {
    setSelectedLocality(null);
    setLocalities(null);
    setSelectedCity(city);
  }
  function selectLocality(locality) {
    setSelectedLocality(locality);
  }
  function onSubmit() {
    onSelect({
      city_complaint: selectedCity,
      locality_complaint: selectedLocality
    });
  }
  return /*#__PURE__*/React.createElement(FormStep, {
    config: config,
    onSelect: onSubmit,
    t: t,
    isDisabled: selectedLocality ? false : true
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CardLabel, null, t("MYCITY_CODE_LABEL")), (cities === null || cities === void 0 ? void 0 : cities.length) < 5 ? /*#__PURE__*/React.createElement(RadioButtons, {
    selectedOption: selectedCity,
    options: cities,
    optionsKey: "i18nKey",
    onSelect: selectCity
  }) : /*#__PURE__*/React.createElement(Dropdown, {
    isMandatory: true,
    selected: selectedCity,
    option: cities,
    select: selectCity,
    optionKey: "i18nKey",
    t: t
  }), selectedCity && localities && /*#__PURE__*/React.createElement(CardLabel, null, t("CS_CREATECOMPLAINT_MOHALLA")), selectedCity && localities && /*#__PURE__*/React.createElement(React.Fragment, null, (localities === null || localities === void 0 ? void 0 : localities.length) < 5 ? /*#__PURE__*/React.createElement(RadioButtons, {
    selectedOption: selectedLocality,
    options: localities,
    optionsKey: "i18nkey",
    onSelect: selectLocality
  }) : /*#__PURE__*/React.createElement(Dropdown, {
    isMandatory: true,
    selected: selectedLocality,
    optionKey: "i18nkey",
    option: localities,
    select: selectLocality,
    t: t
  }))));
};

const SelectComplaintType = ({
  t,
  config,
  onSelect,
  value
}) => {
  const [complaintType, setComplaintType] = useState(() => {
    const {
      complaintType
    } = value;
    return complaintType ? complaintType : {};
  });
  const goNext = () => {
    onSelect({
      complaintType
    });
  };
  const textParams = config.texts;
  const menu = Digit.Hooks.pgr.useComplaintTypes({
    stateCode: Digit.ULBService.getCurrentTenantId()
  });
  function selectedValue(value) {
    setComplaintType(value);
  }
  return /*#__PURE__*/React.createElement(TypeSelectCard, Object.assign({}, textParams, {
    menu: menu
  }, {
    optionsKey: "name"
  }, {
    selected: selectedValue
  }, {
    selectedOption: complaintType
  }, {
    onSave: goNext
  }, {
    t
  }, {
    disabled: Object.keys(complaintType).length === 0 || complaintType === null ? true : false
  }));
};

const SelectDetails = ({
  t,
  config,
  onSelect,
  value
}) => {
  const [details, setDetails] = useState(() => {
    const {
      details
    } = value;
    return details ? details : "";
  });
  const onChange = event => {
    const {
      value
    } = event.target;
    setDetails(value);
  };
  return /*#__PURE__*/React.createElement(FormStep, {
    config: config,
    onChange: onChange,
    onSelect: () => onSelect({
      details
    }),
    value: details,
    t: t
  });
};

const SelectImages = ({
  t,
  config,
  onSelect,
  onSkip,
  value
}) => {
  var _value$city_complaint;
  const [uploadedImages, setUploadedImagesIds] = useState(() => {
    const {
      uploadedImages
    } = value;
    return uploadedImages ? uploadedImages : null;
  });
  const handleUpload = ids => {
    setUploadedImagesIds(ids);
  };
  const handleSubmit = () => {
    if (!uploadedImages || uploadedImages.length === 0) return onSkip();
    onSelect({
      uploadedImages
    });
  };
  return /*#__PURE__*/React.createElement(FormStep, {
    config: config,
    onSelect: handleSubmit,
    onSkip: onSkip,
    t: t
  }, /*#__PURE__*/React.createElement(ImageUploadHandler, {
    tenantId: (_value$city_complaint = value.city_complaint) === null || _value$city_complaint === void 0 ? void 0 : _value$city_complaint.code,
    uploadedImages: uploadedImages,
    onPhotoChange: handleUpload
  }));
};

const SelectLandmark = ({
  t,
  config,
  onSelect,
  value
}) => {
  const [landmark, setLandmark] = useState(() => {
    const {
      landmark
    } = value;
    return landmark ? landmark : "";
  });
  function onChange(e) {
    setLandmark(e.target.value);
  }
  const onSkip = () => onSelect();
  return /*#__PURE__*/React.createElement(FormStep, {
    config: config,
    value: landmark,
    onChange: onChange,
    onSelect: data => onSelect(data),
    onSkip: onSkip,
    t: t
  });
};

const SelectPincode = ({
  t,
  config,
  onSelect,
  value
}) => {
  const tenants = Digit.Hooks.pgr.useTenants();
  const [pincode, setPincode] = useState(() => {
    const {
      pincode
    } = value;
    return pincode;
  });
  let isNextDisabled = pincode ? false : true;
  const [pincodeServicability, setPincodeServicability] = useState(null);
  function onChange(e) {
    setPincode(e.target.value);
    if (!e.target.value) {
      isNextDisabled = true;
    } else {
      isNextDisabled = false;
    }
    setPincodeServicability(null);
  }
  const goNext = async data => {
    var foundValue = tenants.find(obj => {
      var _obj$pincode;
      return (_obj$pincode = obj.pincode) === null || _obj$pincode === void 0 ? void 0 : _obj$pincode.find(item => item == (data === null || data === void 0 ? void 0 : data.pincode));
    });
    if (foundValue) {
      Digit.SessionStorage.set("city_complaint", foundValue);
      let response = await Digit.LocationService.getLocalities(foundValue.code);
      let __localityList = Digit.LocalityService.get(response.TenantBoundary[0]);
      const filteredLocalities = __localityList.filter(obj => {
        var _obj$pincode2;
        return (_obj$pincode2 = obj.pincode) === null || _obj$pincode2 === void 0 ? void 0 : _obj$pincode2.find(item => item == data.pincode);
      });
      onSelect({
        ...data,
        city_complaint: foundValue
      });
    } else {
      Digit.SessionStorage.set("city_complaint", undefined);
      Digit.SessionStorage.set("selected_localities", undefined);
      setPincodeServicability("CS_COMMON_PINCODE_NOT_SERVICABLE");
    }
  };
  const onSkip = () => onSelect();
  return /*#__PURE__*/React.createElement(FormStep, {
    t: t,
    config: config,
    onSelect: goNext,
    value: pincode,
    onChange: onChange,
    onSkip: onSkip,
    forcedError: t(pincodeServicability),
    isDisabled: isNextDisabled
  });
};

const SelectSubType = ({
  t,
  config,
  onSelect,
  value
}) => {
  const [subType, setSubType] = useState(() => {
    const {
      subType
    } = value;
    return subType ? subType : {};
  });
  const {
    complaintType
  } = value;
  const menu = Digit.Hooks.pgr.useComplaintSubType(complaintType, t);
  const goNext = () => {
    onSelect({
      subType
    });
  };
  function selectedValue(value) {
    setSubType(value);
  }
  const configNew = {
    ...config.texts,
    ...{
      headerCaption: t(`SERVICEDEFS.${complaintType.key.toUpperCase()}`)
    },
    ...{
      menu: menu
    },
    ...{
      optionsKey: "name"
    },
    ...{
      selected: selectedValue
    },
    ...{
      selectedOption: subType
    },
    ...{
      onSave: goNext
    }
  };
  return /*#__PURE__*/React.createElement(TypeSelectCard, Object.assign({}, configNew, {
    disabled: Object.keys(subType).length === 0 || subType === null ? true : false,
    t: t
  }));
};

const SelectGeolocation = ({
  onSelect,
  onSkip,
  value,
  t
}) => {
  let pincode = "";
  return /*#__PURE__*/React.createElement(LocationSearchCard, {
    header: t("CS_ADDCOMPLAINT_SELECT_GEOLOCATION_HEADER"),
    cardText: t("CS_ADDCOMPLAINT_SELECT_GEOLOCATION_TEXT"),
    nextText: t("CS_COMMON_NEXT"),
    skipAndContinueText: t("CS_COMMON_SKIP"),
    skip: () => onSelect(),
    onSave: () => onSelect({
      pincode
    }),
    onChange: code => pincode = code
  });
};

const config = {
  routes: {
    "complaint-type": {
      component: SelectComplaintType,
      texts: {
        headerCaption: "",
        header: "CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER",
        cardText: "CS_COMPLAINT_TYPE_TEXT",
        submitBarLabel: "CS_COMMON_NEXT"
      },
      nextStep: "sub-type"
    },
    "sub-type": {
      component: SelectSubType,
      texts: {
        header: "CS_ADDCOMPLAINT_COMPLAINT_SUBTYPE_PLACEHOLDER",
        cardText: "CS_COMPLAINT_SUBTYPE_TEXT",
        submitBarLabel: "CS_COMMON_NEXT"
      },
      nextStep: "map"
    },
    map: {
      component: SelectGeolocation,
      nextStep: "pincode"
    },
    pincode: {
      component: SelectPincode,
      texts: {
        headerCaption: "CS_ADDCOMPLAINT_COMPLAINT_LOCATION",
        header: "CS_FILE_APPLICATION_PINCODE_LABEL",
        cardText: "CS_ADDCOMPLAINT_CHANGE_PINCODE_TEXT",
        submitBarLabel: "CS_COMMON_NEXT",
        skipText: "CORE_COMMON_SKIP_CONTINUE"
      },
      inputs: [{
        label: "CORE_COMMON_PINCODE",
        type: "text",
        name: "pincode",
        validation: {
          minLength: 6,
          maxLength: 7
        },
        error: "CORE_COMMON_PINCODE_INVALID"
      }],
      nextStep: "address"
    },
    address: {
      component: SelectAddress,
      texts: {
        headerCaption: "CS_ADDCOMPLAINT_COMPLAINT_LOCATION",
        header: "CS_ADDCOMPLAINT_PROVIDE_COMPLAINT_ADDRESS",
        cardText: "CS_ADDCOMPLAINT_CITY_MOHALLA_TEXT",
        submitBarLabel: "CS_COMMON_NEXT"
      },
      nextStep: "landmark"
    },
    landmark: {
      component: SelectLandmark,
      texts: {
        headerCaption: "CS_ADDCOMPLAINT_COMPLAINT_LOCATION",
        header: "CS_FILE_APPLICATION_PROPERTY_LOCATION_PROVIDE_LANDMARK_TITLE",
        cardText: "CS_FILE_APPLICATION_PROPERTY_LOCATION_PROVIDE_LANDMARK_TITLE_TEXT",
        submitBarLabel: "CS_COMMON_NEXT",
        skipText: "CORE_COMMON_SKIP_CONTINUE"
      },
      inputs: [{
        label: "CS_ADDCOMPLAINT_LANDMARK",
        type: "textarea",
        name: "landmark"
      }],
      nextStep: "upload-photos"
    },
    "upload-photos": {
      component: SelectImages,
      texts: {
        header: "CS_ADDCOMPLAINT_UPLOAD_PHOTO",
        cardText: "CS_ADDCOMPLAINT_UPLOAD_PHOTO_TEXT",
        submitBarLabel: "CS_COMMON_NEXT",
        skipText: "CORE_COMMON_SKIP_CONTINUE"
      },
      nextStep: "additional-details"
    },
    "additional-details": {
      component: SelectDetails,
      texts: {
        header: "CS_ADDCOMPLAINT_PROVIDE_ADDITIONAL_DETAILS",
        cardText: "CS_ADDCOMPLAINT_ADDITIONAL_DETAILS_TEXT",
        submitBarLabel: "CS_COMMON_NEXT"
      },
      inputs: [{
        label: "CS_ADDCOMPLAINT_ADDITIONAL_DETAILS",
        type: "textarea",
        name: "details"
      }],
      nextStep: null
    }
  },
  indexRoute: "complaint-type"
};

const CreateComplaint = () => {
  const ComponentProvider = Digit.Contexts.ComponentProvider;
  const {
    t
  } = useTranslation();
  const {
    pathname
  } = useLocation();
  const match = useRouteMatch();
  const history = useHistory();
  const registry = useContext(ComponentProvider);
  const dispatch = useDispatch();
  const {
    data: storeData,
    isLoading
  } = Digit.Hooks.useStore.getInitData();
  const {
    stateInfo
  } = storeData || {};
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage(PGR_CITIZEN_CREATE_COMPLAINT, {});
  const config$1 = useMemo(() => merge(config, Digit.Customizations.PGR.complaintConfig), [Digit.Customizations.PGR.complaintConfig]);
  const [paramState, setParamState] = useState(params);
  const [nextStep, setNextStep] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  const [rerender, setRerender] = useState(0);
  const client = useQueryClient();
  useEffect(() => {
    setCanSubmit(false);
  }, []);
  useEffect(() => {
    setParamState(params);
    if (nextStep === null) {
      wrapperSubmit();
    } else {
      history.push(`${match.path}/${nextStep}`);
    }
  }, [params, nextStep]);
  const goNext = () => {
    const currentPath = pathname.split("/").pop();
    let {
      nextStep
    } = config$1.routes[currentPath];
    let compType = Digit.SessionStorage.get(PGR_CITIZEN_CREATE_COMPLAINT);
    if (nextStep === "sub-type" && compType.complaintType.key === "Others") {
      setParams({
        ...params,
        complaintType: {
          key: "Others",
          name: t("SERVICEDEFS.OTHERS")
        },
        subType: {
          key: "Others",
          name: t("SERVICEDEFS.OTHERS")
        }
      });
      nextStep = config$1.routes[nextStep].nextStep;
    }
    setNextStep(nextStep);
  };
  const wrapperSubmit = () => {
    if (!canSubmit) {
      setCanSubmit(true);
      submitComplaint();
    }
  };
  const submitComplaint = async () => {
    if (paramState !== null && paramState !== void 0 && paramState.complaintType) {
      const {
        city_complaint,
        locality_complaint,
        uploadedImages,
        complaintType,
        subType,
        details,
        ...values
      } = paramState;
      const {
        code: cityCode,
        name: city
      } = city_complaint;
      const {
        code: localityCode,
        name: localityName
      } = locality_complaint;
      const _uploadImages = uploadedImages === null || uploadedImages === void 0 ? void 0 : uploadedImages.map(url => ({
        documentType: "PHOTO",
        fileStoreId: url,
        documentUid: "",
        additionalDetails: {}
      }));
      const data = {
        ...values,
        complaintType: subType.key,
        cityCode,
        city,
        description: details,
        district: city,
        region: city,
        localityCode,
        localityName,
        state: stateInfo.name,
        uploadedImages: _uploadImages
      };
      await dispatch(createComplaint(data));
      await client.refetchQueries(["complaintsList"]);
      history.push(`${match.path}/response`);
    }
  };
  const handleSelect = data => {
    setParams({
      ...params,
      ...data
    });
    goNext();
  };
  const handleSkip = () => {
    goNext();
  };
  if (isLoading) return null;
  return /*#__PURE__*/React.createElement(Switch, null, Object.keys(config$1.routes).map((route, index) => {
    const {
      component,
      texts,
      inputs
    } = config$1.routes[route];
    const Component = typeof component === "string" ? Digit.ComponentRegistryService.getComponent(component) : component;
    return /*#__PURE__*/React.createElement(Route, {
      path: `${match.path}/${route}`,
      key: index
    }, /*#__PURE__*/React.createElement(Component, {
      config: {
        texts,
        inputs
      },
      onSelect: handleSelect,
      onSkip: handleSkip,
      value: params,
      t: t
    }));
  }), /*#__PURE__*/React.createElement(Route, {
    path: `${match.path}/response`
  }, /*#__PURE__*/React.createElement(Response$1, {
    match: match
  })), /*#__PURE__*/React.createElement(Route, null, /*#__PURE__*/React.createElement(Redirect, {
    to: `${match.path}/${config$1.indexRoute}`
  })));
};

const Complaint = ({
  data,
  path
}) => {
  let {
    serviceCode,
    serviceRequestId,
    applicationStatus
  } = data;
  const history = useHistory();
  const {
    t
  } = useTranslation();
  const handleClick = () => {
    history.push(`${path}/${serviceRequestId}`);
  };
  const closedStatus = ["RESOLVED", "REJECTED", "CLOSEDAFTERREJECTION", "CLOSEDAFTERRESOLUTION"];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Card, {
    onClick: handleClick
  }, /*#__PURE__*/React.createElement(CardSubHeader, null, t(`SERVICEDEFS.${serviceCode.toUpperCase()}`)), /*#__PURE__*/React.createElement(DateWrap, {
    date: Digit.DateUtils.ConvertTimestampToDate(data.auditDetails.createdTime)
  }), /*#__PURE__*/React.createElement(KeyNote, {
    keyValue: t(`${LOCALIZATION_KEY.CS_COMMON}_COMPLAINT_NO`),
    note: serviceRequestId
  }), /*#__PURE__*/React.createElement("div", {
    className: `status-highlight ${closedStatus.includes(applicationStatus) ? "success" : ""}`
  }, /*#__PURE__*/React.createElement("p", null, (closedStatus.includes(applicationStatus) ? t("CS_COMMON_CLOSED") : t("CS_COMMON_OPEN")).toUpperCase())), t(`${LOCALIZATION_KEY.CS_COMMON}_${applicationStatus}`)));
};

const ComplaintsList = props => {
  var _User$info, _User$info2, _User$info2$userInfo, _Digit$SessionStorage;
  const User = Digit.UserService.getUser();
  const mobileNumber = User.mobileNumber || (User === null || User === void 0 ? void 0 : (_User$info = User.info) === null || _User$info === void 0 ? void 0 : _User$info.mobileNumber) || (User === null || User === void 0 ? void 0 : (_User$info2 = User.info) === null || _User$info2 === void 0 ? void 0 : (_User$info2$userInfo = _User$info2.userInfo) === null || _User$info2$userInfo === void 0 ? void 0 : _User$info2$userInfo.mobileNumber);
  const tenantId = ((_Digit$SessionStorage = Digit.SessionStorage.get("CITIZEN.COMMON.HOME.CITY")) === null || _Digit$SessionStorage === void 0 ? void 0 : _Digit$SessionStorage.code) || Digit.ULBService.getCurrentTenantId();
  const {
    t
  } = useTranslation();
  const {
    path,
    url
  } = useRouteMatch();
  let {
    isLoading,
    error,
    data,
    revalidate
  } = Digit.Hooks.pgr.useComplaintsListByMobile(tenantId, mobileNumber);
  useEffect(() => {
    revalidate();
  }, []);
  if (isLoading) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Header, null, t(LOCALE.MY_COMPLAINTS)), /*#__PURE__*/React.createElement(Loader, null));
  }
  let complaints = data === null || data === void 0 ? void 0 : data.ServiceWrappers;
  let complaintsList;
  if (error) {
    complaintsList = /*#__PURE__*/React.createElement(Card, null, t(LOCALE.ERROR_LOADING_RESULTS).split("\\n").map((text, index) => /*#__PURE__*/React.createElement("p", {
      key: index,
      style: {
        textAlign: "center"
      }
    }, text)));
  } else if (complaints.length === 0) {
    complaintsList = /*#__PURE__*/React.createElement(Card, null, t(LOCALE.NO_COMPLAINTS).split("\\n").map((text, index) => /*#__PURE__*/React.createElement("p", {
      key: index,
      style: {
        textAlign: "center"
      }
    }, text)));
  } else {
    complaintsList = complaints.map(({
      service
    }, index) => /*#__PURE__*/React.createElement(Complaint, {
      key: index,
      data: service,
      path: path
    }));
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "applications-list-container"
  }, /*#__PURE__*/React.createElement(Header, null, t(LOCALE.MY_COMPLAINTS)), complaintsList));
};

const PendingAtLME = ({
  name,
  isCompleted,
  mobile,
  text,
  customChild
}) => {
  let {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement(CheckPoint, {
    label: t("CS_COMMON_PENDINGATLME"),
    isCompleted: isCompleted,
    customChild: /*#__PURE__*/React.createElement("div", null, name && mobile ? /*#__PURE__*/React.createElement(TelePhone, {
      mobile: mobile,
      text: `${text} ${name}`
    }) : null, customChild)
  });
};

const PendingForAssignment = ({
  isCompleted,
  text,
  complaintFiledDate,
  customChild
}) => {
  return /*#__PURE__*/React.createElement(CheckPoint, {
    isCompleted: isCompleted,
    label: text,
    customChild: customChild
  });
};

const StarRated = ({
  text,
  rating
}) => /*#__PURE__*/React.createElement(Rating, {
  text: text,
  withText: true,
  currentRating: rating,
  maxRating: 5,
  onFeedback: () => {}
});

const Resolved = ({
  action,
  nextActions,
  complaintDetails,
  ComplainMaxIdleTime: _ComplainMaxIdleTime = 3600000,
  rating,
  serviceRequestId,
  reopenDate,
  isCompleted,
  customChild
}) => {
  const {
    t
  } = useTranslation();
  if (action === "RESOLVE") {
    let actions = nextActions && nextActions.map((action, index) => {
      if (action && action !== "COMMENT") {
        return /*#__PURE__*/React.createElement(Link, {
          key: index,
          to: `/digit-ui/citizen/pgr/${action.toLowerCase()}/${serviceRequestId}`
        }, /*#__PURE__*/React.createElement(ActionLinks, null, t(`CS_COMMON_${action}`)));
      }
    });
    return /*#__PURE__*/React.createElement(CheckPoint, {
      isCompleted: isCompleted,
      label: t(`CS_COMMON_COMPLAINT_RESOLVED`),
      customChild: /*#__PURE__*/React.createElement("div", null, actions, customChild)
    });
  } else if (action === "RATE") {
    return /*#__PURE__*/React.createElement(CheckPoint, {
      isCompleted: isCompleted,
      label: t(`CS_COMMON_COMPLAINT_RESOLVED`),
      customChild: /*#__PURE__*/React.createElement("div", null, customChild)
    });
  } else if (action === "REOPEN") {
    return /*#__PURE__*/React.createElement(CheckPoint, {
      isCompleted: isCompleted,
      label: t(`CS_COMMON_COMPLAINT_REOPENED`),
      info: reopenDate,
      customChild: customChild
    });
  } else {
    let actions = nextActions && nextActions.map((action, index) => {
      if (action && action !== "COMMENT") {
        var _complaintDetails$ser, _complaintDetails$ser2;
        if (action !== "REOPEN" || action === "REOPEN" && (Date === null || Date === void 0 ? void 0 : Date.now()) - (complaintDetails === null || complaintDetails === void 0 ? void 0 : (_complaintDetails$ser = complaintDetails.service) === null || _complaintDetails$ser === void 0 ? void 0 : (_complaintDetails$ser2 = _complaintDetails$ser.auditDetails) === null || _complaintDetails$ser2 === void 0 ? void 0 : _complaintDetails$ser2.lastModifiedTime) < _ComplainMaxIdleTime) return /*#__PURE__*/React.createElement(Link, {
          key: index,
          to: `/digit-ui/citizen/pgr/${action.toLowerCase()}/${serviceRequestId}`
        }, /*#__PURE__*/React.createElement(ActionLinks, null, t(`CS_COMMON_${action}`)));
      }
    });
    return /*#__PURE__*/React.createElement(CheckPoint, {
      isCompleted: isCompleted,
      label: t(`CS_COMMON_COMPLAINT_RESOLVED`),
      customChild: /*#__PURE__*/React.createElement("div", null, actions, customChild)
    });
  }
};

const Rejected = ({
  action,
  nextActions,
  complaintDetails,
  ComplainMaxIdleTime: _ComplainMaxIdleTime = 3600000,
  rating,
  serviceRequestId,
  reopenDate,
  isCompleted
}) => {
  const {
    t
  } = useTranslation();
  if (action === "REJECTED") {
    let actions = nextActions && nextActions.map((action, index) => {
      if (action && action !== "COMMENT") {
        return /*#__PURE__*/React.createElement(Link, {
          key: index,
          to: `/digit-ui/citizen/pgr/${action.toLowerCase()}/${serviceRequestId}`
        }, /*#__PURE__*/React.createElement(ActionLinks, null, t(`CS_COMMON_${action}`)));
      }
    });
    return /*#__PURE__*/React.createElement(CheckPoint, {
      isCompleted: isCompleted,
      label: t(`CS_COMMON_COMPLAINT_REJECTED`),
      customChild: /*#__PURE__*/React.createElement("div", null, actions)
    });
  } else if (action === "RATE" && rating) {
    return /*#__PURE__*/React.createElement(CheckPoint, {
      isCompleted: isCompleted,
      label: t(`CS_COMMON_COMPLAINT_REJECTED`),
      customChild: /*#__PURE__*/React.createElement("div", null, rating ? /*#__PURE__*/React.createElement(StarRated, {
        text: t("CS_ADDCOMPLAINT_YOU_RATED"),
        rating: rating
      }) : null, customChild)
    });
  } else if (action === "REOPEN") {
    return /*#__PURE__*/React.createElement(CheckPoint, {
      isCompleted: isCompleted,
      label: t(`CS_COMMON_COMPLAINT_REOPENED`),
      info: reopenDate
    });
  } else {
    let actions = nextActions && nextActions.map((action, index) => {
      if (action && action !== "COMMENT") {
        var _complaintDetails$ser, _complaintDetails$ser2;
        if (action !== "REOPEN" || action === "REOPEN" && (Date === null || Date === void 0 ? void 0 : Date.now()) - (complaintDetails === null || complaintDetails === void 0 ? void 0 : (_complaintDetails$ser = complaintDetails.service) === null || _complaintDetails$ser === void 0 ? void 0 : (_complaintDetails$ser2 = _complaintDetails$ser.auditDetails) === null || _complaintDetails$ser2 === void 0 ? void 0 : _complaintDetails$ser2.lastModifiedTime) < _ComplainMaxIdleTime) return /*#__PURE__*/React.createElement(Link, {
          key: index,
          to: `/digit-ui/citizen/pgr/${action.toLowerCase()}/${serviceRequestId}`
        }, /*#__PURE__*/React.createElement(ActionLinks, null, t(`CS_COMMON_${action}`)));
      }
    });
    return /*#__PURE__*/React.createElement(CheckPoint, {
      isCompleted: isCompleted,
      label: t(`CS_COMMON_COMPLAINT_REJECTED`),
      customChild: /*#__PURE__*/React.createElement("div", null, actions)
    });
  }
};

const TLCaption = ({
  data,
  comments
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", null, (data === null || data === void 0 ? void 0 : data.date) && /*#__PURE__*/React.createElement("p", null, data === null || data === void 0 ? void 0 : data.date), /*#__PURE__*/React.createElement("p", null, data === null || data === void 0 ? void 0 : data.name), /*#__PURE__*/React.createElement("p", null, data === null || data === void 0 ? void 0 : data.mobileNumber), (data === null || data === void 0 ? void 0 : data.source) && /*#__PURE__*/React.createElement("p", null, t("ES_COMMON_FILED_VIA_" + (data === null || data === void 0 ? void 0 : data.source.toUpperCase()))));
};
const TimeLine = ({
  isLoading,
  data,
  serviceRequestId,
  complaintWorkflow,
  rating,
  zoomImage,
  complaintDetails,
  ComplainMaxIdleTime
}) => {
  const {
    t
  } = useTranslation();
  function zoomImageWrapper(imageSource, index, thumbnailsToShow) {
    var _thumbnailsToShow$thu, _thumbnailsToShow$ful;
    let newIndex = (_thumbnailsToShow$thu = thumbnailsToShow.thumbs) === null || _thumbnailsToShow$thu === void 0 ? void 0 : _thumbnailsToShow$thu.findIndex(link => link === imageSource);
    zoomImage(newIndex > -1 && (thumbnailsToShow === null || thumbnailsToShow === void 0 ? void 0 : (_thumbnailsToShow$ful = thumbnailsToShow.fullImage) === null || _thumbnailsToShow$ful === void 0 ? void 0 : _thumbnailsToShow$ful[newIndex]) || imageSource);
  }
  let {
    timeline
  } = data;
  const totalTimelineLength = useMemo(() => timeline === null || timeline === void 0 ? void 0 : timeline.length, [timeline]);
  useEffect(() => {
    let filteredTimeline = timeline === null || timeline === void 0 ? void 0 : timeline.filter((status, index, array) => {
      if (index === array.length - 1 && status.status === "PENDINGFORASSIGNMENT") {
        return true;
      } else {
        return false;
      }
    });
    const onlyPendingForAssignmentStatusArray = timeline === null || timeline === void 0 ? void 0 : timeline.filter(e => (e === null || e === void 0 ? void 0 : e.status) === "PENDINGFORASSIGNMENT");
    const duplicateCheckpointOfPendingForAssignment = onlyPendingForAssignmentStatusArray.at(-1);
    timeline === null || timeline === void 0 ? void 0 : timeline.push({
      ...duplicateCheckpointOfPendingForAssignment,
      performedAction: "FILED",
      status: "COMPLAINT_FILED"
    });
  }, [timeline]);
  const getCommentsInCustomChildComponent = ({
    comment,
    thumbnailsToShow,
    auditDetails,
    assigner,
    status
  }) => {
    var _thumbnailsToShow$thu2;
    const captionDetails = {
      date: auditDetails === null || auditDetails === void 0 ? void 0 : auditDetails.lastModified,
      name: assigner === null || assigner === void 0 ? void 0 : assigner.name,
      mobileNumber: assigner === null || assigner === void 0 ? void 0 : assigner.mobileNumber,
      source: status == "COMPLAINT_FILED" ? complaintDetails === null || complaintDetails === void 0 ? void 0 : complaintDetails.audit.source : ""
    };
    return /*#__PURE__*/React.createElement(Fragment$1, null, comment ? /*#__PURE__*/React.createElement("div", null, comment === null || comment === void 0 ? void 0 : comment.map(e => /*#__PURE__*/React.createElement("div", {
      className: "TLComments"
    }, /*#__PURE__*/React.createElement("h3", null, t("WF_COMMON_COMMENTS")), /*#__PURE__*/React.createElement("p", null, e)))) : null, (thumbnailsToShow === null || thumbnailsToShow === void 0 ? void 0 : (_thumbnailsToShow$thu2 = thumbnailsToShow.thumbs) === null || _thumbnailsToShow$thu2 === void 0 ? void 0 : _thumbnailsToShow$thu2.length) > 0 ? /*#__PURE__*/React.createElement("div", {
      className: "TLComments"
    }, /*#__PURE__*/React.createElement("h3", null, t("CS_COMMON_ATTACHMENTS")), /*#__PURE__*/React.createElement(DisplayPhotos, {
      srcs: thumbnailsToShow.thumbs,
      onClick: (src, index) => {
        zoomImageWrapper(src, index, thumbnailsToShow);
      }
    })) : null, captionDetails !== null && captionDetails !== void 0 && captionDetails.date ? /*#__PURE__*/React.createElement(TLCaption, {
      data: captionDetails,
      comments: comment
    }) : null);
  };
  const getCheckPoint = ({
    status,
    caption,
    auditDetails,
    timeLineActions,
    index,
    array,
    performedAction,
    comment,
    thumbnailsToShow,
    assigner,
    totalTimelineLength
  }) => {
    const isCurrent = 0 === index;
    switch (status) {
      case "PENDINGFORREASSIGNMENT":
        return /*#__PURE__*/React.createElement(CheckPoint, {
          isCompleted: isCurrent,
          key: index,
          label: t(`CS_COMMON_${status}`),
          customChild: getCommentsInCustomChildComponent({
            comment,
            thumbnailsToShow,
            auditDetails,
            assigner
          })
        });
      case "PENDINGFORASSIGNMENT":
        const isFirstPendingForAssignment = totalTimelineLength - (index + 1) === 0 ? true : false;
        return /*#__PURE__*/React.createElement(PendingForAssignment, {
          key: index,
          isCompleted: isCurrent,
          text: t(`CS_COMMON_${status}`),
          customChild: getCommentsInCustomChildComponent({
            comment,
            ...(isFirstPendingForAssignment ? {
              auditDetails
            } : {
              thumbnailsToShow,
              auditDetails
            })
          })
        });
      case "PENDINGFORASSIGNMENT_AFTERREOPEN":
        return /*#__PURE__*/React.createElement(PendingForAssignment, {
          isCompleted: isCurrent,
          key: index,
          text: t(`CS_COMMON_${status}`),
          customChild: getCommentsInCustomChildComponent({
            comment,
            thumbnailsToShow,
            auditDetails,
            assigner
          })
        });
      case "PENDINGATLME":
        let {
          name,
          mobileNumber
        } = caption && caption.length > 0 ? caption[0] : {
          name: "",
          mobileNumber: ""
        };
        const assignedTo = `${t(`CS_COMMON_${status}`)}`;
        return /*#__PURE__*/React.createElement(PendingAtLME, {
          isCompleted: isCurrent,
          key: index,
          name: name,
          mobile: mobileNumber,
          text: assignedTo,
          customChild: getCommentsInCustomChildComponent({
            comment,
            thumbnailsToShow,
            auditDetails,
            assigner
          })
        });
      case "RESOLVED":
        return /*#__PURE__*/React.createElement(Resolved, {
          key: index,
          isCompleted: isCurrent,
          action: complaintWorkflow.action,
          nextActions: index <= 1 && timeLineActions,
          complaintDetails: complaintDetails,
          ComplainMaxIdleTime: ComplainMaxIdleTime,
          serviceRequestId: serviceRequestId,
          reopenDate: Digit.DateUtils.ConvertTimestampToDate(auditDetails.lastModifiedTime),
          customChild: getCommentsInCustomChildComponent({
            comment,
            thumbnailsToShow,
            auditDetails,
            assigner
          })
        });
      case "REJECTED":
        return /*#__PURE__*/React.createElement(Rejected, {
          key: index,
          isCompleted: isCurrent,
          action: complaintWorkflow.action,
          nextActions: index <= 1 && timeLineActions,
          complaintDetails: complaintDetails,
          ComplainMaxIdleTime: ComplainMaxIdleTime,
          serviceRequestId: serviceRequestId,
          reopenDate: Digit.DateUtils.ConvertTimestampToDate(auditDetails.lastModifiedTime),
          customChild: getCommentsInCustomChildComponent({
            comment,
            thumbnailsToShow,
            auditDetails,
            assigner
          })
        });
      case "CLOSEDAFTERRESOLUTION":
        return /*#__PURE__*/React.createElement(CheckPoint, {
          isCompleted: isCurrent,
          key: index,
          label: t(`CS_COMMON_${`CS_COMMON_${status}`}`),
          customChild: /*#__PURE__*/React.createElement("div", null, getCommentsInCustomChildComponent({
            comment,
            thumbnailsToShow,
            auditDetails,
            assigner
          }), rating ? /*#__PURE__*/React.createElement(StarRated, {
            text: t("CS_ADDCOMPLAINT_YOU_RATED"),
            rating: rating
          }) : null)
        });
      case "COMPLAINT_FILED":
        return /*#__PURE__*/React.createElement(CheckPoint, {
          isCompleted: isCurrent,
          key: index,
          label: t("CS_COMMON_COMPLAINT_FILED"),
          customChild: getCommentsInCustomChildComponent({
            comment,
            auditDetails,
            assigner,
            status
          })
        });
      default:
        return /*#__PURE__*/React.createElement(CheckPoint, {
          isCompleted: isCurrent,
          key: index,
          label: t(`CS_COMMON_${status}`),
          customChild: getCommentsInCustomChildComponent({
            comment,
            thumbnailsToShow,
            auditDetails,
            assigner,
            status
          })
        });
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CardSubHeader, null, t(`${LOCALIZATION_KEY.CS_COMPLAINT_DETAILS}_COMPLAINT_TIMELINE`)), timeline && totalTimelineLength > 0 ? /*#__PURE__*/React.createElement(ConnectingCheckPoints, null, timeline.map(({
    status,
    caption,
    auditDetails,
    timeLineActions,
    performedAction,
    wfComment: comment,
    thumbnailsToShow,
    assigner
  }, index, array) => {
    return getCheckPoint({
      status,
      caption,
      auditDetails,
      timeLineActions,
      index,
      array,
      performedAction,
      comment,
      thumbnailsToShow,
      assigner,
      totalTimelineLength
    });
  })) : /*#__PURE__*/React.createElement(Loader, null));
};

const WorkflowComponent = ({
  complaintDetails,
  id,
  getWorkFlow,
  zoomImage
}) => {
  var _Digit$SessionStorage;
  const tenantId = ((_Digit$SessionStorage = Digit.SessionStorage.get("CITIZEN.COMMON.HOME.CITY")) === null || _Digit$SessionStorage === void 0 ? void 0 : _Digit$SessionStorage.code) || complaintDetails.service.tenantId;
  let workFlowDetails = Digit.Hooks.useWorkflowDetails({
    tenantId: tenantId,
    id,
    moduleCode: "PGR"
  });
  const {
    data: ComplainMaxIdleTime,
    isLoading: ComplainMaxIdleTimeLoading
  } = Digit.Hooks.pgr.useMDMS.ComplainClosingTime(tenantId === null || tenantId === void 0 ? void 0 : tenantId.split(".")[0]);
  useEffect(() => {
    getWorkFlow(workFlowDetails.data);
  }, [workFlowDetails.data]);
  useEffect(() => {
    workFlowDetails.revalidate();
  }, []);
  return !workFlowDetails.isLoading && /*#__PURE__*/React.createElement(TimeLine, {
    data: workFlowDetails.data,
    serviceRequestId: id,
    complaintWorkflow: complaintDetails.workflow,
    rating: complaintDetails.audit.rating,
    zoomImage: zoomImage,
    complaintDetails: complaintDetails,
    ComplainMaxIdleTime: ComplainMaxIdleTime
  });
};
const ComplaintDetailsPage = props => {
  var _Digit$SessionStorage2;
  let {
    t
  } = useTranslation();
  let {
    id
  } = useParams();
  let tenantId = ((_Digit$SessionStorage2 = Digit.SessionStorage.get("CITIZEN.COMMON.HOME.CITY")) === null || _Digit$SessionStorage2 === void 0 ? void 0 : _Digit$SessionStorage2.code) || Digit.ULBService.getCurrentTenantId();
  const {
    isLoading,
    error,
    isError,
    complaintDetails,
    revalidate
  } = Digit.Hooks.pgr.useComplaintDetails({
    tenantId,
    id
  });
  const [imageShownBelowComplaintDetails, setImageToShowBelowComplaintDetails] = useState({});
  const [imageZoom, setImageZoom] = useState(null);
  const [comment, setComment] = useState("");
  const [toast, setToast] = useState(false);
  const [commentError, setCommentError] = useState(null);
  const [disableComment, setDisableComment] = useState(true);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    (async () => {
      if (complaintDetails) {
        setLoader(true);
        await revalidate();
        setLoader(false);
      }
    })();
  }, []);
  function zoomImage(imageSource, index) {
    setImageZoom(imageSource);
  }
  function zoomImageWrapper(imageSource, index) {
    zoomImage(imageShownBelowComplaintDetails === null || imageShownBelowComplaintDetails === void 0 ? void 0 : imageShownBelowComplaintDetails.fullImage[index]);
  }
  function onCloseImageZoom() {
    setImageZoom(null);
  }
  const onWorkFlowChange = data => {
    var _timeline$0$timeLineA;
    let timeline = data === null || data === void 0 ? void 0 : data.timeline;
    timeline && (_timeline$0$timeLineA = timeline[0].timeLineActions) !== null && _timeline$0$timeLineA !== void 0 && _timeline$0$timeLineA.filter(e => e === "COMMENT").length ? setDisableComment(false) : setDisableComment(true);
    if (timeline) {
      const actionByCitizenOnComplaintCreation = timeline.find(e => (e === null || e === void 0 ? void 0 : e.performedAction) === "APPLY");
      const {
        thumbnailsToShow
      } = actionByCitizenOnComplaintCreation;
      setImageToShowBelowComplaintDetails(thumbnailsToShow);
    }
  };
  if (isLoading || loader) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  if (isError) {
    return /*#__PURE__*/React.createElement("h2", null, "Error");
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "complaint-summary"
  }, /*#__PURE__*/React.createElement(Header, null, t(`${LOCALIZATION_KEY.CS_HEADER}_COMPLAINT_SUMMARY`)), Object.keys(complaintDetails).length > 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardSubHeader, null, t(`SERVICEDEFS.${complaintDetails.audit.serviceCode.toUpperCase()}`)), /*#__PURE__*/React.createElement(StatusTable, null, Object.keys(complaintDetails.details).map((flag, index, arr) => /*#__PURE__*/React.createElement(Row, {
    key: index,
    label: t(flag),
    text: Array.isArray(complaintDetails.details[flag]) ? complaintDetails.details[flag].map(val => typeof val === "object" ? t(val === null || val === void 0 ? void 0 : val.code) : t(val)) : t(complaintDetails.details[flag]) || "N/A",
    last: index === arr.length - 1
  }))), imageShownBelowComplaintDetails !== null && imageShownBelowComplaintDetails !== void 0 && imageShownBelowComplaintDetails.thumbs ? /*#__PURE__*/React.createElement(DisplayPhotos, {
    srcs: imageShownBelowComplaintDetails === null || imageShownBelowComplaintDetails === void 0 ? void 0 : imageShownBelowComplaintDetails.thumbs,
    onClick: (source, index) => zoomImageWrapper(source, index)
  }) : null, imageZoom ? /*#__PURE__*/React.createElement(ImageViewer, {
    imageSrc: imageZoom,
    onClose: onCloseImageZoom
  }) : null), /*#__PURE__*/React.createElement(Card, null, (complaintDetails === null || complaintDetails === void 0 ? void 0 : complaintDetails.service) && /*#__PURE__*/React.createElement(WorkflowComponent, {
    getWorkFlow: onWorkFlowChange,
    complaintDetails: complaintDetails,
    id: id,
    zoomImage: zoomImage
  })), toast && /*#__PURE__*/React.createElement(Toast, {
    error: commentError,
    label: !commentError ? t(`CS_COMPLAINT_COMMENT_SUCCESS`) : t(`CS_COMPLAINT_COMMENT_ERROR`),
    onClose: () => setToast(false)
  }), " ") : /*#__PURE__*/React.createElement(Loader, null)));
};

const App = () => {
  var _Digit, _Digit$ComponentRegis, _Digit2, _Digit2$ComponentRegi, _Digit3, _Digit3$ComponentRegi, _Digit4, _Digit4$ComponentRegi, _Digit5, _Digit5$ComponentRegi;
  const {
    t
  } = useTranslation();
  const {
    path,
    url,
    ...match
  } = useRouteMatch();
  const location = useLocation();
  const CreateComplaint = (_Digit = Digit) === null || _Digit === void 0 ? void 0 : (_Digit$ComponentRegis = _Digit.ComponentRegistryService) === null || _Digit$ComponentRegis === void 0 ? void 0 : _Digit$ComponentRegis.getComponent("PGRCreateComplaintCitizen");
  const ComplaintsList = (_Digit2 = Digit) === null || _Digit2 === void 0 ? void 0 : (_Digit2$ComponentRegi = _Digit2.ComponentRegistryService) === null || _Digit2$ComponentRegi === void 0 ? void 0 : _Digit2$ComponentRegi.getComponent("PGRComplaintsList");
  const ComplaintDetailsPage = (_Digit3 = Digit) === null || _Digit3 === void 0 ? void 0 : (_Digit3$ComponentRegi = _Digit3.ComponentRegistryService) === null || _Digit3$ComponentRegi === void 0 ? void 0 : _Digit3$ComponentRegi.getComponent("PGRComplaintDetailsPage");
  const SelectRating = (_Digit4 = Digit) === null || _Digit4 === void 0 ? void 0 : (_Digit4$ComponentRegi = _Digit4.ComponentRegistryService) === null || _Digit4$ComponentRegi === void 0 ? void 0 : _Digit4$ComponentRegi.getComponent("PGRSelectRating");
  const Response = (_Digit5 = Digit) === null || _Digit5 === void 0 ? void 0 : (_Digit5$ComponentRegi = _Digit5.ComponentRegistryService) === null || _Digit5$ComponentRegi === void 0 ? void 0 : _Digit5$ComponentRegi.getComponent("PGRResponseCitzen");
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "pgr-citizen-wrapper"
  }, !location.pathname.includes("/response") && /*#__PURE__*/React.createElement(BackButton, null, t("CS_COMMON_BACK")), /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/create-complaint`,
    component: CreateComplaint
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/complaints`,
    exact: true,
    component: ComplaintsList
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/complaints/:id*`,
    component: ComplaintDetailsPage
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/reopen`,
    component: () => /*#__PURE__*/React.createElement(ReopenComplaint, {
      match: {
        ...match,
        url,
        path: `${path}/reopen`
      },
      parentRoute: path
    })
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/rate/:id*`,
    component: () => /*#__PURE__*/React.createElement(SelectRating, {
      parentRoute: path
    })
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/response`,
    component: () => /*#__PURE__*/React.createElement(Response, {
      match: {
        ...match,
        url,
        path
      }
    })
  }))));
};

const Complaint$1 = () => {
  var _Digit, _Digit$ComponentRegis, _Digit2, _Digit2$ComponentRegi, _Digit3, _Digit3$ComponentRegi, _Digit4, _Digit4$ComponentRegi;
  const [displayMenu, setDisplayMenu] = useState(false);
  const [popup, setPopup] = useState(false);
  const match = useRouteMatch();
  const {
    t
  } = useTranslation();
  const breadcrumConfig = {
    home: {
      content: t("CS_COMMON_HOME"),
      path: Employee.Home
    },
    inbox: {
      content: t("CS_COMMON_INBOX"),
      path: match.url + Employee.Inbox
    },
    createComplaint: {
      content: t("CS_PGR_CREATE_COMPLAINT"),
      path: match.url + Employee.CreateComplaint
    },
    complaintDetails: {
      content: t("CS_PGR_COMPLAINT_DETAILS"),
      path: match.url + Employee.ComplaintDetails + ":id"
    },
    response: {
      content: t("CS_PGR_RESPONSE"),
      path: match.url + Employee.Response
    }
  };
  let location = useLocation().pathname;
  const CreateComplaint = (_Digit = Digit) === null || _Digit === void 0 ? void 0 : (_Digit$ComponentRegis = _Digit.ComponentRegistryService) === null || _Digit$ComponentRegis === void 0 ? void 0 : _Digit$ComponentRegis.getComponent('PGRCreateComplaintEmp');
  const ComplaintDetails = (_Digit2 = Digit) === null || _Digit2 === void 0 ? void 0 : (_Digit2$ComponentRegi = _Digit2.ComponentRegistryService) === null || _Digit2$ComponentRegi === void 0 ? void 0 : _Digit2$ComponentRegi.getComponent('PGRComplaintDetails');
  const Inbox = (_Digit3 = Digit) === null || _Digit3 === void 0 ? void 0 : (_Digit3$ComponentRegi = _Digit3.ComponentRegistryService) === null || _Digit3$ComponentRegi === void 0 ? void 0 : _Digit3$ComponentRegi.getComponent('PGRInbox');
  const Response = (_Digit4 = Digit) === null || _Digit4 === void 0 ? void 0 : (_Digit4$ComponentRegi = _Digit4.ComponentRegistryService) === null || _Digit4$ComponentRegi === void 0 ? void 0 : _Digit4$ComponentRegi.getComponent('PGRResponseEmp');
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "ground-container"
  }, !location.includes(Employee.Response) && /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(Route, {
    path: match.url + Employee.CreateComplaint,
    component: () => /*#__PURE__*/React.createElement(BreadCrumb, {
      crumbs: [breadcrumConfig.home, breadcrumConfig.createComplaint]
    })
  }), /*#__PURE__*/React.createElement(Route, {
    path: match.url + Employee.ComplaintDetails + ":id",
    component: () => /*#__PURE__*/React.createElement(BreadCrumb, {
      crumbs: [breadcrumConfig.home, breadcrumConfig.inbox, breadcrumConfig.complaintDetails]
    })
  }), /*#__PURE__*/React.createElement(Route, {
    path: match.url + Employee.Inbox,
    component: () => /*#__PURE__*/React.createElement(BreadCrumb, {
      crumbs: [breadcrumConfig.home, breadcrumConfig.inbox]
    })
  }), /*#__PURE__*/React.createElement(Route, {
    path: match.url + Employee.Response,
    component: /*#__PURE__*/React.createElement(BreadCrumb, {
      crumbs: [breadcrumConfig.home, breadcrumConfig.response]
    })
  })), /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(Route, {
    path: match.url + Employee.CreateComplaint,
    component: () => /*#__PURE__*/React.createElement(CreateComplaint, {
      parentUrl: match.url
    })
  }), /*#__PURE__*/React.createElement(Route, {
    path: match.url + Employee.ComplaintDetails + ":id*",
    component: () => /*#__PURE__*/React.createElement(ComplaintDetails, null)
  }), /*#__PURE__*/React.createElement(Route, {
    path: match.url + Employee.Inbox,
    component: Inbox
  }), /*#__PURE__*/React.createElement(Route, {
    path: match.url + Employee.Response,
    component: Response
  }))));
};

const App$1 = () => {
  return /*#__PURE__*/React.createElement(EmployeeAppContainer, null, /*#__PURE__*/React.createElement(Complaint$1, null));
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

const Heading = props => {
  return /*#__PURE__*/React.createElement("h1", {
    className: "heading-m"
  }, props.label);
};
const CloseBtn = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "icon-bg-secondary",
    onClick: props.onClick
  }, /*#__PURE__*/React.createElement(Close, null));
};
const TLCaption$1 = ({
  data,
  comments
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", null, (data === null || data === void 0 ? void 0 : data.date) && /*#__PURE__*/React.createElement("p", null, data === null || data === void 0 ? void 0 : data.date), /*#__PURE__*/React.createElement("p", null, data === null || data === void 0 ? void 0 : data.name), /*#__PURE__*/React.createElement("p", null, data === null || data === void 0 ? void 0 : data.mobileNumber), (data === null || data === void 0 ? void 0 : data.source) && /*#__PURE__*/React.createElement("p", null, t("ES_COMMON_FILED_VIA_" + (data === null || data === void 0 ? void 0 : data.source.toUpperCase()))), comments === null || comments === void 0 ? void 0 : comments.map(e => /*#__PURE__*/React.createElement("div", {
    className: "TLComments"
  }, /*#__PURE__*/React.createElement("h3", null, t("WF_COMMON_COMMENTS")), /*#__PURE__*/React.createElement("p", null, e))));
};
const ComplaintDetailsModal = ({
  workflowDetails,
  complaintDetails,
  close,
  popup,
  selectedAction,
  onAssign,
  tenantId,
  t
}) => {
  var _workflowDetails$data, _workflowDetails$data2, _workflowDetails$data3, _stateArray$, _stateArray$$assignee, _stateArray$2, _stateArray$2$assigne;
  const stateArray = workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data = workflowDetails.data) === null || _workflowDetails$data === void 0 ? void 0 : (_workflowDetails$data2 = _workflowDetails$data.initialActionState) === null || _workflowDetails$data2 === void 0 ? void 0 : (_workflowDetails$data3 = _workflowDetails$data2.nextActions) === null || _workflowDetails$data3 === void 0 ? void 0 : _workflowDetails$data3.filter(ele => (ele === null || ele === void 0 ? void 0 : ele.action) == selectedAction);
  const useEmployeeData = Digit.Hooks.pgr.useEmployeeFilter(tenantId, (stateArray === null || stateArray === void 0 ? void 0 : (_stateArray$ = stateArray[0]) === null || _stateArray$ === void 0 ? void 0 : (_stateArray$$assignee = _stateArray$.assigneeRoles) === null || _stateArray$$assignee === void 0 ? void 0 : _stateArray$$assignee.length) > 0 ? stateArray === null || stateArray === void 0 ? void 0 : (_stateArray$2 = stateArray[0]) === null || _stateArray$2 === void 0 ? void 0 : (_stateArray$2$assigne = _stateArray$2.assigneeRoles) === null || _stateArray$2$assigne === void 0 ? void 0 : _stateArray$2$assigne.join(",") : "", complaintDetails);
  const employeeData = useEmployeeData ? useEmployeeData.map(departmentData => {
    return {
      heading: departmentData.department,
      options: departmentData.employees
    };
  }) : null;
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [comments, setComments] = useState("");
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState(null);
  const cityDetails = Digit.ULBService.getCurrentUlb();
  const [selectedReopenReason, setSelectedReopenReason] = useState(null);
  useEffect(() => {
    (async () => {
      setError(null);
      if (file) {
        if (file.size >= 5242880) {
          setError(t("CS_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            var _response$data, _response$data$files;
            const response = await Digit.UploadServices.Filestorage("property-upload", file, cityDetails.code);
            if ((response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : (_response$data$files = _response$data.files) === null || _response$data$files === void 0 ? void 0 : _response$data$files.length) > 0) {
              var _response$data2, _response$data2$files;
              setUploadedFile(response === null || response === void 0 ? void 0 : (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : (_response$data2$files = _response$data2.files[0]) === null || _response$data2$files === void 0 ? void 0 : _response$data2$files.fileStoreId);
            } else {
              setError(t("CS_FILE_UPLOAD_ERROR"));
            }
          } catch (err) {
            setError(t("CS_FILE_UPLOAD_ERROR"));
          }
        }
      }
    })();
  }, [file]);
  const reopenReasonMenu = [t(`CS_REOPEN_OPTION_ONE`), t(`CS_REOPEN_OPTION_TWO`), t(`CS_REOPEN_OPTION_THREE`), t(`CS_REOPEN_OPTION_FOUR`)];
  function onSelectEmployee(employee) {
    setSelectedEmployee(employee);
  }
  function addComment(e) {
    setError(null);
    setComments(e.target.value);
  }
  function selectfile(e) {
    setFile(e.target.files[0]);
  }
  function onSelectReopenReason(reason) {
    setSelectedReopenReason(reason);
  }
  return /*#__PURE__*/React.createElement(Modal, {
    headerBarMain: /*#__PURE__*/React.createElement(Heading, {
      label: selectedAction === "ASSIGN" || selectedAction === "REASSIGN" ? t("CS_ACTION_ASSIGN") : selectedAction === "REJECT" ? t("CS_ACTION_REJECT") : selectedAction === "REOPEN" ? t("CS_COMMON_REOPEN") : t("CS_COMMON_RESOLVE")
    }),
    headerBarEnd: /*#__PURE__*/React.createElement(CloseBtn, {
      onClick: () => close(popup)
    }),
    actionCancelLabel: t("CS_COMMON_CANCEL"),
    actionCancelOnSubmit: () => close(popup),
    actionSaveLabel: selectedAction === "ASSIGN" || selectedAction === "REASSIGN" ? t("CS_COMMON_ASSIGN") : selectedAction === "REJECT" ? t("CS_COMMON_REJECT") : selectedAction === "REOPEN" ? t("CS_COMMON_REOPEN") : t("CS_COMMON_RESOLVE"),
    actionSaveOnSubmit: () => {
      if (selectedAction === "REJECT" && !comments) setError(t("CS_MANDATORY_COMMENTS"));else onAssign(selectedEmployee, comments, uploadedFile);
    },
    error: error,
    setError: setError
  }, /*#__PURE__*/React.createElement(Card, null, selectedAction === "REJECT" || selectedAction === "RESOLVE" || selectedAction === "REOPEN" ? null : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CardLabel, null, t("CS_COMMON_EMPLOYEE_NAME")), employeeData && /*#__PURE__*/React.createElement(SectionalDropdown, {
    selected: selectedEmployee,
    menuData: employeeData,
    displayKey: "name",
    select: onSelectEmployee
  })), selectedAction === "REOPEN" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CardLabel, null, t("CS_REOPEN_COMPLAINT")), /*#__PURE__*/React.createElement(Dropdown, {
    selected: selectedReopenReason,
    option: reopenReasonMenu,
    select: onSelectReopenReason
  })) : null, /*#__PURE__*/React.createElement(CardLabel, null, t("CS_COMMON_EMPLOYEE_COMMENTS")), /*#__PURE__*/React.createElement(TextArea, {
    name: "comment",
    onChange: addComment,
    value: comments
  }), /*#__PURE__*/React.createElement(CardLabel, null, t("CS_ACTION_SUPPORTING_DOCUMENTS")), /*#__PURE__*/React.createElement(CardLabelDesc, null, t(`CS_UPLOAD_RESTRICTIONS`)), /*#__PURE__*/React.createElement(UploadFile, {
    id: "pgr-doc",
    accept: ".jpg",
    onUpload: selectfile,
    onDelete: () => {
      setUploadedFile(null);
    },
    message: uploadedFile ? `1 ${t(`CS_ACTION_FILEUPLOADED`)}` : t(`CS_ACTION_NO_FILEUPLOADED`)
  })));
};
const ComplaintDetails = props => {
  var _workflowDetails$data6, _workflowDetails$data7, _workflowDetails$data8, _workflowDetails$data9, _workflowDetails$data10, _workflowDetails$data11, _workflowDetails$data12, _workflowDetails$data13, _workflowDetails$data14, _workflowDetails$data15, _workflowDetails$data16;
  let {
    id
  } = useParams();
  const {
    t
  } = useTranslation();
  const [fullscreen, setFullscreen] = useState(false);
  const [imageZoom, setImageZoom] = useState(null);
  const [toast, setToast] = useState(false);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const {
    isLoading,
    complaintDetails,
    revalidate: revalidateComplaintDetails
  } = Digit.Hooks.pgr.useComplaintDetails({
    tenantId,
    id
  });
  const workflowDetails = Digit.Hooks.useWorkflowDetails({
    tenantId,
    id,
    moduleCode: "PGR",
    role: "EMPLOYEE"
  });
  const [imagesToShowBelowComplaintDetails, setImagesToShowBelowComplaintDetails] = useState([]);
  if (workflowDetails && workflowDetails !== null && workflowDetails !== void 0 && workflowDetails.data) {
    var _workflowDetails$data4, _workflowDetails$data5;
    workflowDetails.data.initialActionState = (workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data4 = workflowDetails.data) === null || _workflowDetails$data4 === void 0 ? void 0 : _workflowDetails$data4.initialActionState) || {
      ...(workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data5 = workflowDetails.data) === null || _workflowDetails$data5 === void 0 ? void 0 : _workflowDetails$data5.actionState)
    } || {};
    workflowDetails.data.actionState = {
      ...workflowDetails.data
    };
  }
  useEffect(() => {
    if (workflowDetails) {
      const {
        data: {
          timeline: complaintTimelineData
        } = {}
      } = workflowDetails;
      if (complaintTimelineData) {
        const actionByCitizenOnComplaintCreation = complaintTimelineData === null || complaintTimelineData === void 0 ? void 0 : complaintTimelineData.find(e => (e === null || e === void 0 ? void 0 : e.performedAction) === "APPLY");
        const {
          thumbnailsToShow
        } = actionByCitizenOnComplaintCreation;
        thumbnailsToShow ? setImagesToShowBelowComplaintDetails(thumbnailsToShow) : null;
      }
    }
  }, [workflowDetails]);
  const [displayMenu, setDisplayMenu] = useState(false);
  const [popup, setPopup] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [assignResponse, setAssignResponse] = useState(null);
  const [loader, setLoader] = useState(false);
  const [rerender, setRerender] = useState(1);
  const client = useQueryClient();
  useEffect(() => {
    (async (_Digit, _Digit$WorkflowServic) => {
      const assignWorkflow = await ((_Digit = Digit) === null || _Digit === void 0 ? void 0 : (_Digit$WorkflowServic = _Digit.WorkflowService) === null || _Digit$WorkflowServic === void 0 ? void 0 : _Digit$WorkflowServic.getByBusinessId(tenantId, id));
    })();
  }, [complaintDetails]);
  const refreshData = async () => {
    await client.refetchQueries(["fetchInboxData"]);
    await workflowDetails.revalidate();
    await revalidateComplaintDetails();
  };
  useEffect(() => {
    (async () => {
      if (complaintDetails) {
        setLoader(true);
        await refreshData();
        setLoader(false);
      }
    })();
  }, []);
  function close(state) {
    switch (state) {
      case fullscreen:
        setFullscreen(!fullscreen);
        break;
      case popup:
        setPopup(!popup);
        break;
    }
  }
  function zoomImage(imageSource, index) {
    setImageZoom(imageSource);
  }
  function zoomImageWrapper(imageSource, index) {
    zoomImage(imagesToShowBelowComplaintDetails === null || imagesToShowBelowComplaintDetails === void 0 ? void 0 : imagesToShowBelowComplaintDetails.fullImage[index]);
  }
  function onCloseImageZoom() {
    setImageZoom(null);
  }
  function onActionSelect(action) {
    setSelectedAction(action);
    switch (action) {
      case "ASSIGN":
        setPopup(true);
        setDisplayMenu(false);
        break;
      case "REASSIGN":
        setPopup(true);
        setDisplayMenu(false);
        break;
      case "RESOLVE":
        setPopup(true);
        setDisplayMenu(false);
        break;
      case "REJECT":
        setPopup(true);
        setDisplayMenu(false);
        break;
      case "REOPEN":
        setPopup(true);
        setDisplayMenu(false);
        break;
      default:
        setDisplayMenu(false);
    }
  }
  async function onAssign(selectedEmployee, comments, uploadedFile) {
    setPopup(false);
    const response = await Digit.Complaint.assign(complaintDetails, selectedAction, selectedEmployee, comments, uploadedFile, tenantId);
    setAssignResponse(response);
    setToast(true);
    setLoader(true);
    await refreshData();
    setLoader(false);
    setRerender(rerender + 1);
    setTimeout(() => setToast(false), 10000);
  }
  function closeToast() {
    setToast(false);
  }
  if (isLoading || workflowDetails.isLoading || loader) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  if (workflowDetails.isError) return /*#__PURE__*/React.createElement(React.Fragment, null, workflowDetails.error);
  const getTimelineCaptions = (checkpoint, index, arr) => {
    var _checkpoint$auditDeta, _checkpoint$assigner, _checkpoint$assigner2, _thumbnailsToShow$thu3;
    const {
      wfComment: comment,
      thumbnailsToShow
    } = checkpoint;
    function zoomImageTimeLineWrapper(imageSource, index, thumbnailsToShow) {
      var _thumbnailsToShow$thu, _thumbnailsToShow$ful;
      let newIndex = (_thumbnailsToShow$thu = thumbnailsToShow.thumbs) === null || _thumbnailsToShow$thu === void 0 ? void 0 : _thumbnailsToShow$thu.findIndex(link => link === imageSource);
      zoomImage(newIndex > -1 && (thumbnailsToShow === null || thumbnailsToShow === void 0 ? void 0 : (_thumbnailsToShow$ful = thumbnailsToShow.fullImage) === null || _thumbnailsToShow$ful === void 0 ? void 0 : _thumbnailsToShow$ful[newIndex]) || imageSource);
    }
    const captionForOtherCheckpointsInTL = {
      date: checkpoint === null || checkpoint === void 0 ? void 0 : (_checkpoint$auditDeta = checkpoint.auditDetails) === null || _checkpoint$auditDeta === void 0 ? void 0 : _checkpoint$auditDeta.lastModified,
      name: checkpoint === null || checkpoint === void 0 ? void 0 : (_checkpoint$assigner = checkpoint.assigner) === null || _checkpoint$assigner === void 0 ? void 0 : _checkpoint$assigner.name,
      mobileNumber: checkpoint === null || checkpoint === void 0 ? void 0 : (_checkpoint$assigner2 = checkpoint.assigner) === null || _checkpoint$assigner2 === void 0 ? void 0 : _checkpoint$assigner2.mobileNumber,
      ...(checkpoint.status === "COMPLAINT_FILED" && complaintDetails !== null && complaintDetails !== void 0 && complaintDetails.audit ? {
        source: complaintDetails.audit.source
      } : {})
    };
    const isFirstPendingForAssignment = arr.length - (index + 1) === 1 ? true : false;
    if (checkpoint.status === "PENDINGFORASSIGNMENT" && complaintDetails !== null && complaintDetails !== void 0 && complaintDetails.audit) {
      if (isFirstPendingForAssignment) {
        const caption = {
          date: Digit.DateUtils.ConvertTimestampToDate(complaintDetails.audit.details.createdTime)
        };
        return /*#__PURE__*/React.createElement(TLCaption$1, {
          data: caption,
          comments: checkpoint === null || checkpoint === void 0 ? void 0 : checkpoint.wfComment
        });
      } else {
        var _checkpoint$wfComment, _thumbnailsToShow$thu2;
        const caption = {
          date: Digit.DateUtils.ConvertTimestampToDate(complaintDetails.audit.details.createdTime)
        };
        return /*#__PURE__*/React.createElement(Fragment$1, null, checkpoint !== null && checkpoint !== void 0 && checkpoint.wfComment ? /*#__PURE__*/React.createElement("div", null, checkpoint === null || checkpoint === void 0 ? void 0 : (_checkpoint$wfComment = checkpoint.wfComment) === null || _checkpoint$wfComment === void 0 ? void 0 : _checkpoint$wfComment.map(e => /*#__PURE__*/React.createElement("div", {
          className: "TLComments"
        }, /*#__PURE__*/React.createElement("h3", null, t("WF_COMMON_COMMENTS")), /*#__PURE__*/React.createElement("p", null, e)))) : null, checkpoint.status !== "COMPLAINT_FILED" && (thumbnailsToShow === null || thumbnailsToShow === void 0 ? void 0 : (_thumbnailsToShow$thu2 = thumbnailsToShow.thumbs) === null || _thumbnailsToShow$thu2 === void 0 ? void 0 : _thumbnailsToShow$thu2.length) > 0 ? /*#__PURE__*/React.createElement("div", {
          className: "TLComments"
        }, /*#__PURE__*/React.createElement("h3", null, t("CS_COMMON_ATTACHMENTS")), /*#__PURE__*/React.createElement(DisplayPhotos, {
          srcs: thumbnailsToShow.thumbs,
          onClick: (src, index) => zoomImageTimeLineWrapper(src, index, thumbnailsToShow)
        })) : null, caption !== null && caption !== void 0 && caption.date ? /*#__PURE__*/React.createElement(TLCaption$1, {
          data: caption
        }) : null);
      }
    }
    return /*#__PURE__*/React.createElement(Fragment$1, null, comment ? /*#__PURE__*/React.createElement("div", null, comment === null || comment === void 0 ? void 0 : comment.map(e => /*#__PURE__*/React.createElement("div", {
      className: "TLComments"
    }, /*#__PURE__*/React.createElement("h3", null, t("WF_COMMON_COMMENTS")), /*#__PURE__*/React.createElement("p", null, e)))) : null, checkpoint.status !== "COMPLAINT_FILED" && (thumbnailsToShow === null || thumbnailsToShow === void 0 ? void 0 : (_thumbnailsToShow$thu3 = thumbnailsToShow.thumbs) === null || _thumbnailsToShow$thu3 === void 0 ? void 0 : _thumbnailsToShow$thu3.length) > 0 ? /*#__PURE__*/React.createElement("div", {
      className: "TLComments"
    }, /*#__PURE__*/React.createElement("h3", null, t("CS_COMMON_ATTACHMENTS")), /*#__PURE__*/React.createElement(DisplayPhotos, {
      srcs: thumbnailsToShow.thumbs,
      onClick: (src, index) => zoomImageTimeLineWrapper(src, index, thumbnailsToShow)
    })) : null, captionForOtherCheckpointsInTL !== null && captionForOtherCheckpointsInTL !== void 0 && captionForOtherCheckpointsInTL.date ? /*#__PURE__*/React.createElement(TLCaption$1, {
      data: captionForOtherCheckpointsInTL
    }) : null, checkpoint.status == "CLOSEDAFTERRESOLUTION" && complaintDetails.workflow.action == "RATE" && index <= 1 && complaintDetails.audit.rating ? /*#__PURE__*/React.createElement(StarRated, {
      text: t("CS_ADDCOMPLAINT_YOU_RATED"),
      rating: complaintDetails.audit.rating
    }) : null);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardSubHeader, null, t(`CS_HEADER_COMPLAINT_SUMMARY`)), /*#__PURE__*/React.createElement(CardLabel, {
    style: {
      fontWeight: "700"
    }
  }, t(`CS_COMPLAINT_DETAILS_COMPLAINT_DETAILS`)), isLoading ? /*#__PURE__*/React.createElement(Loader, null) : /*#__PURE__*/React.createElement(StatusTable, null, complaintDetails && Object.keys(complaintDetails === null || complaintDetails === void 0 ? void 0 : complaintDetails.details).map((k, i, arr) => /*#__PURE__*/React.createElement(Row, {
    key: k,
    label: t(k),
    text: Array.isArray(complaintDetails === null || complaintDetails === void 0 ? void 0 : complaintDetails.details[k]) ? complaintDetails === null || complaintDetails === void 0 ? void 0 : complaintDetails.details[k].map(val => typeof val === "object" ? t(val === null || val === void 0 ? void 0 : val.code) : t(val)) : t(complaintDetails === null || complaintDetails === void 0 ? void 0 : complaintDetails.details[k]) || "N/A",
    last: arr.length - 1 === i
  })),  null ), imagesToShowBelowComplaintDetails !== null && imagesToShowBelowComplaintDetails !== void 0 && imagesToShowBelowComplaintDetails.thumbs ? /*#__PURE__*/React.createElement(DisplayPhotos, {
    srcs: imagesToShowBelowComplaintDetails === null || imagesToShowBelowComplaintDetails === void 0 ? void 0 : imagesToShowBelowComplaintDetails.thumbs,
    onClick: (source, index) => zoomImageWrapper(source, index)
  }) : null, /*#__PURE__*/React.createElement(BreakLine, null), (workflowDetails === null || workflowDetails === void 0 ? void 0 : workflowDetails.isLoading) && /*#__PURE__*/React.createElement(Loader, null), !(workflowDetails !== null && workflowDetails !== void 0 && workflowDetails.isLoading) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CardSubHeader, null, t(`CS_COMPLAINT_DETAILS_COMPLAINT_TIMELINE`)), workflowDetails !== null && workflowDetails !== void 0 && (_workflowDetails$data6 = workflowDetails.data) !== null && _workflowDetails$data6 !== void 0 && _workflowDetails$data6.timeline && (workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data7 = workflowDetails.data) === null || _workflowDetails$data7 === void 0 ? void 0 : (_workflowDetails$data8 = _workflowDetails$data7.timeline) === null || _workflowDetails$data8 === void 0 ? void 0 : _workflowDetails$data8.length) === 1 ? /*#__PURE__*/React.createElement(CheckPoint, {
    isCompleted: true,
    label: t("CS_COMMON_" + (workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data9 = workflowDetails.data) === null || _workflowDetails$data9 === void 0 ? void 0 : (_workflowDetails$data10 = _workflowDetails$data9.timeline[0]) === null || _workflowDetails$data10 === void 0 ? void 0 : _workflowDetails$data10.status))
  }) : /*#__PURE__*/React.createElement(ConnectingCheckPoints, null, (workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data11 = workflowDetails.data) === null || _workflowDetails$data11 === void 0 ? void 0 : _workflowDetails$data11.timeline) && (workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data12 = workflowDetails.data) === null || _workflowDetails$data12 === void 0 ? void 0 : _workflowDetails$data12.timeline.map((checkpoint, index, arr) => {
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: index
    }, /*#__PURE__*/React.createElement(CheckPoint, {
      keyValue: index,
      isCompleted: index === 0,
      label: t("CS_COMMON_" + checkpoint.status),
      customChild: getTimelineCaptions(checkpoint, index, arr)
    }));
  }))))), fullscreen ? /*#__PURE__*/React.createElement(PopUp, null, /*#__PURE__*/React.createElement("div", {
    className: "popup-module"
  }, /*#__PURE__*/React.createElement(HeaderBar, {
    main: /*#__PURE__*/React.createElement(Heading, {
      label: "Complaint Geolocation"
    }),
    end: /*#__PURE__*/React.createElement(CloseBtn, {
      onClick: () => close(fullscreen)
    })
  }), /*#__PURE__*/React.createElement("div", {
    className: "popup-module-main"
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://via.placeholder.com/912x568"
  })))) : null, imageZoom ? /*#__PURE__*/React.createElement(ImageViewer, {
    imageSrc: imageZoom,
    onClose: onCloseImageZoom
  }) : null, popup ? /*#__PURE__*/React.createElement(ComplaintDetailsModal, {
    workflowDetails: workflowDetails,
    complaintDetails: complaintDetails,
    close: close,
    popup: popup,
    selectedAction: selectedAction,
    onAssign: onAssign,
    tenantId: tenantId,
    t: t
  }) : null, toast && /*#__PURE__*/React.createElement(Toast, {
    label: t(assignResponse ? `CS_ACTION_${selectedAction}_TEXT` : "CS_ACTION_ASSIGN_FAILED"),
    onClose: closeToast
  }), !(workflowDetails !== null && workflowDetails !== void 0 && workflowDetails.isLoading) && (workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data13 = workflowDetails.data) === null || _workflowDetails$data13 === void 0 ? void 0 : (_workflowDetails$data14 = _workflowDetails$data13.nextActions) === null || _workflowDetails$data14 === void 0 ? void 0 : _workflowDetails$data14.length) > 0 && /*#__PURE__*/React.createElement(ActionBar, null, displayMenu && workflowDetails !== null && workflowDetails !== void 0 && (_workflowDetails$data15 = workflowDetails.data) !== null && _workflowDetails$data15 !== void 0 && _workflowDetails$data15.nextActions ? /*#__PURE__*/React.createElement(Menu, {
    options: workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data16 = workflowDetails.data) === null || _workflowDetails$data16 === void 0 ? void 0 : _workflowDetails$data16.nextActions.map(action => action.action),
    t: t,
    onSelect: onActionSelect
  }) : null, /*#__PURE__*/React.createElement(SubmitBar, {
    label: t("WF_TAKE_ACTION"),
    onSubmit: () => setDisplayMenu(!displayMenu)
  })));
};

const FormComposer = props => {
  const {
    register,
    handleSubmit,
    errors
  } = useForm();
  const {
    t
  } = useTranslation();
  function onSubmit(data) {
    props.onSubmit(data);
  }
  const fieldSelector = (type, populators) => {
    switch (type) {
      case "text":
        return /*#__PURE__*/React.createElement("div", {
          className: "field-container"
        }, populators.componentInFront ? populators.componentInFront : null, /*#__PURE__*/React.createElement(TextInput, Object.assign({
          className: "field desktop-w-full"
        }, populators, {
          inputRef: register(populators.validation)
        })));
      case "textarea":
        return /*#__PURE__*/React.createElement(TextArea, Object.assign({
          className: "field desktop-w-full",
          name: populators.name || ""
        }, populators, {
          inputRef: register(populators.validation)
        }));
      default:
        return populators.dependency !== false ? populators : null;
    }
  };
  const formFields = useMemo(() => {
    var _props$config;
    return (_props$config = props.config) === null || _props$config === void 0 ? void 0 : _props$config.map((section, index, array) => {
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: index
      }, /*#__PURE__*/React.createElement(CardSectionHeader, null, section.head), section.body.map((field, index) => {
        var _field$populators;
        return /*#__PURE__*/React.createElement(React.Fragment, {
          key: index
        }, errors[field.populators.name] && ((_field$populators = field.populators) !== null && _field$populators !== void 0 && _field$populators.validate ? errors[field.populators.validate] : true) && /*#__PURE__*/React.createElement(CardLabelError, null, field.populators.error), /*#__PURE__*/React.createElement(LabelFieldPair, null, /*#__PURE__*/React.createElement(CardLabel, null, field.label, field.isMandatory ? " * " : null), /*#__PURE__*/React.createElement("div", {
          className: "field"
        }, fieldSelector(field.type, field.populators))));
      }), array.length - 1 === index ? null : /*#__PURE__*/React.createElement(BreakLine, null));
    });
  }, [props.config, errors]);
  const isDisabled = props.isDisabled || false;
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardSubHeader, null, props.heading), formFields, props.children, /*#__PURE__*/React.createElement(ActionBar, null, /*#__PURE__*/React.createElement(SubmitBar, {
    disabled: isDisabled,
    label: t(props.label),
    submit: "submit"
  }))));
};

const CreateComplaint$1 = ({
  parentUrl
}) => {
  var _getCities$;
  const cities = Digit.Hooks.pgr.useTenants();
  const {
    t
  } = useTranslation();
  const getCities = () => (cities === null || cities === void 0 ? void 0 : cities.filter(e => e.code === Digit.ULBService.getCurrentTenantId())) || [];
  const [complaintType, setComplaintType] = useState({});
  const [subTypeMenu, setSubTypeMenu] = useState([]);
  const [subType, setSubType] = useState({});
  const [pincode, setPincode] = useState("");
  const [selectedCity, setSelectedCity] = useState(getCities()[0] ? getCities()[0] : null);
  const {
    data: fetchedLocalities
  } = Digit.Hooks.useBoundaryLocalities((_getCities$ = getCities()[0]) === null || _getCities$ === void 0 ? void 0 : _getCities$.code, "admin", {
    enabled: !!getCities()[0]
  }, t);
  const [localities, setLocalities] = useState(fetchedLocalities);
  const [selectedLocality, setSelectedLocality] = useState(null);
  const [canSubmit, setSubmitValve] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [pincodeNotValid, setPincodeNotValid] = useState(false);
  const [params, setParams] = useState({});
  const tenantId = window.Digit.SessionStorage.get("Employee.tenantId");
  const menu = Digit.Hooks.pgr.useComplaintTypes({
    stateCode: tenantId
  });
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const history = useHistory();
  const serviceDefinitions = Digit.GetServiceDefinitions;
  const client = useQueryClient();
  useEffect(() => {
    if (complaintType !== null && complaintType !== void 0 && complaintType.key && subType !== null && subType !== void 0 && subType.key && selectedCity !== null && selectedCity !== void 0 && selectedCity.code && selectedLocality !== null && selectedLocality !== void 0 && selectedLocality.code) {
      setSubmitValve(true);
    } else {
      setSubmitValve(false);
    }
  }, [complaintType, subType, selectedCity, selectedLocality]);
  useEffect(() => {
    setLocalities(fetchedLocalities);
  }, [fetchedLocalities]);
  useEffect(() => {
    var _getCities$2;
    const city = cities.find(obj => {
      var _obj$pincode;
      return (_obj$pincode = obj.pincode) === null || _obj$pincode === void 0 ? void 0 : _obj$pincode.find(item => item == pincode);
    });
    if ((city === null || city === void 0 ? void 0 : city.code) === ((_getCities$2 = getCities()[0]) === null || _getCities$2 === void 0 ? void 0 : _getCities$2.code)) {
      setPincodeNotValid(false);
      setSelectedCity(city);
      setSelectedLocality(null);
      const __localityList = fetchedLocalities;
      const __filteredLocalities = __localityList.filter(city => city["pincode"] == pincode);
      setLocalities(__filteredLocalities);
    } else if (pincode === "" || pincode === null) {
      setPincodeNotValid(false);
      setLocalities(fetchedLocalities);
    } else {
      setPincodeNotValid(true);
    }
  }, [pincode]);
  async function selectedType(value) {
    if (value.key !== complaintType.key) {
      if (value.key === "Others") {
        setSubType({
          name: ""
        });
        setComplaintType(value);
        setSubTypeMenu([{
          key: "Others",
          name: t("SERVICEDEFS.OTHERS")
        }]);
      } else {
        setSubType({
          name: ""
        });
        setComplaintType(value);
        setSubTypeMenu(await serviceDefinitions.getSubMenu(tenantId, value, t));
      }
    }
  }
  function selectedSubType(value) {
    setSubType(value);
  }
  const selectCity = async city => {
    return;
  };
  function selectLocality(locality) {
    setSelectedLocality(locality);
  }
  const wrapperSubmit = data => {
    if (!canSubmit) return;
    setSubmitted(true);
    !submitted && onSubmit(data);
  };
  const onSubmit = async data => {
    if (!canSubmit) return;
    const cityCode = selectedCity.code;
    const city = selectedCity.city.name;
    const district = selectedCity.city.name;
    const region = selectedCity.city.name;
    const localityCode = selectedLocality.code;
    const localityName = selectedLocality.name;
    const landmark = data.landmark;
    const {
      key
    } = subType;
    const complaintType = key;
    const mobileNumber = data.mobileNumber;
    const name = data.name;
    const formData = {
      ...data,
      cityCode,
      city,
      district,
      region,
      localityCode,
      localityName,
      landmark,
      complaintType,
      mobileNumber,
      name
    };
    await dispatch(createComplaint(formData));
    await client.refetchQueries(["fetchInboxData"]);
    history.push(parentUrl + "/response");
  };
  const handlePincode = event => {
    const {
      value
    } = event.target;
    setPincode(value);
    if (!value) {
      setPincodeNotValid(false);
    }
  };
  const isPincodeValid = () => !pincodeNotValid;
  const config = [{
    head: t("ES_CREATECOMPLAINT_PROVIDE_COMPLAINANT_DETAILS"),
    body: [{
      label: t("ES_CREATECOMPLAINT_MOBILE_NUMBER"),
      isMandatory: true,
      type: "text",
      populators: {
        name: "mobileNumber",
        validation: {
          required: true,
          pattern: /^[6-9]\d{9}$/
        },
        componentInFront: /*#__PURE__*/React.createElement("div", {
          className: "employee-card-input employee-card-input--front"
        }, "+91"),
        error: t("CORE_COMMON_MOBILE_ERROR")
      }
    }, {
      label: t("ES_CREATECOMPLAINT_COMPLAINT_NAME"),
      isMandatory: true,
      type: "text",
      populators: {
        name: "name",
        validation: {
          required: true,
          pattern: /^[A-Za-z]/
        },
        error: t("CS_ADDCOMPLAINT_NAME_ERROR")
      }
    }]
  }, {
    head: t("CS_COMPLAINT_DETAILS_COMPLAINT_DETAILS"),
    body: [{
      label: t("CS_COMPLAINT_DETAILS_COMPLAINT_TYPE"),
      isMandatory: true,
      type: "dropdown",
      populators: /*#__PURE__*/React.createElement(Dropdown, {
        option: menu,
        optionKey: "name",
        id: "complaintType",
        selected: complaintType,
        select: selectedType
      })
    }, {
      label: t("CS_COMPLAINT_DETAILS_COMPLAINT_SUBTYPE"),
      isMandatory: true,
      type: "dropdown",
      menu: {
        ...subTypeMenu
      },
      populators: /*#__PURE__*/React.createElement(Dropdown, {
        option: subTypeMenu,
        optionKey: "name",
        id: "complaintSubType",
        selected: subType,
        select: selectedSubType
      })
    }]
  }, {
    head: t("CS_ADDCOMPLAINT_LOCATION"),
    body: [{
      label: t("CORE_COMMON_PINCODE"),
      type: "text",
      populators: {
        name: "pincode",
        validation: {
          pattern: /^[1-9][0-9]{5}$/,
          validate: isPincodeValid
        },
        error: t("CORE_COMMON_PINCODE_INVALID"),
        onChange: handlePincode
      }
    }, {
      label: t("CS_COMPLAINT_DETAILS_CITY"),
      isMandatory: true,
      type: "dropdown",
      populators: /*#__PURE__*/React.createElement(Dropdown, {
        isMandatory: true,
        selected: selectedCity,
        freeze: true,
        option: getCities(),
        id: "city",
        select: selectCity,
        optionKey: "i18nKey",
        t: t
      })
    }, {
      label: t("CS_CREATECOMPLAINT_MOHALLA"),
      type: "dropdown",
      isMandatory: true,
      dependency: selectedCity && localities ? true : false,
      populators: /*#__PURE__*/React.createElement(Dropdown, {
        isMandatory: true,
        selected: selectedLocality,
        optionKey: "i18nkey",
        id: "locality",
        option: localities,
        select: selectLocality,
        t: t
      })
    }, {
      label: t("CS_COMPLAINT_DETAILS_LANDMARK"),
      type: "textarea",
      populators: {
        name: "landmark"
      }
    }]
  }, {
    head: t("CS_COMPLAINT_DETAILS_ADDITIONAL_DETAILS"),
    body: [{
      label: t("CS_COMPLAINT_DETAILS_ADDITIONAL_DETAILS"),
      type: "textarea",
      populators: {
        name: "description"
      }
    }]
  }];
  return /*#__PURE__*/React.createElement(FormComposer, {
    heading: t("ES_CREATECOMPLAINT_NEW_COMPLAINT"),
    config: config,
    onSubmit: wrapperSubmit,
    isDisabled: !canSubmit && !submitted,
    label: t("CS_ADDCOMPLAINT_ADDITIONAL_DETAILS_SUBMIT_COMPLAINT")
  });
};

const ComplaintsLink = ({
  isMobile,
  data
}) => {
  const {
    t
  } = useTranslation();
  const allLinks = [{
    text: "ES_PGR_NEW_COMPLAINT",
    link: "/digit-ui/employee/pgr/complaint/create",
    accessTo: ["CSR"]
  }];
  const [links, setLinks] = useState([]);
  useEffect(() => {
    let linksToShow = [];
    allLinks.forEach(link => {
      if (link.accessTo) {
        if (Digit.UserService.hasAccess(link.accessTo)) {
          linksToShow.push(link);
        }
      } else {
        linksToShow.push(link);
      }
    });
    setLinks(linksToShow);
  }, []);
  const GetLogo = () => /*#__PURE__*/React.createElement("div", {
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
  }))), " ", /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, t("ES_PGR_HEADER_COMPLAINT")));
  return /*#__PURE__*/React.createElement(Card, {
    className: "employeeCard filter inboxLinks"
  }, /*#__PURE__*/React.createElement("div", {
    className: "complaint-links-container"
  }, GetLogo(), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, links.map(({
    link,
    text
  }, index) => /*#__PURE__*/React.createElement("span", {
    className: "link",
    key: index
  }, /*#__PURE__*/React.createElement(Link, {
    to: link
  }, t(text)))))));
};

const ComplaintTable = ({
  t,
  columns,
  data,
  getCellProps,
  onNextPage,
  onPrevPage,
  currentPage,
  totalRecords,
  pageSizeLimit,
  onPageSizeChange
}) => /*#__PURE__*/React.createElement(Table, {
  t: t,
  data: data,
  columns: columns,
  getCellProps: getCellProps,
  onNextPage: onNextPage,
  onPrevPage: onPrevPage,
  currentPage: currentPage,
  totalRecords: totalRecords,
  onPageSizeChange: onPageSizeChange,
  pageSizeLimit: pageSizeLimit
});

const Status = ({
  complaints,
  onAssignmentChange,
  pgrfilters
}) => {
  var _pgrfilters$applicati;
  const {
    t
  } = useTranslation();
  const complaintsWithCount = Digit.Hooks.pgr.useComplaintStatusCount(complaints);
  let hasFilters = pgrfilters === null || pgrfilters === void 0 ? void 0 : (_pgrfilters$applicati = pgrfilters.applicationStatus) === null || _pgrfilters$applicati === void 0 ? void 0 : _pgrfilters$applicati.length;
  return /*#__PURE__*/React.createElement("div", {
    className: "status-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "filter-label"
  }, t("ES_PGR_FILTER_STATUS")), complaintsWithCount.length === 0 && /*#__PURE__*/React.createElement(Loader, null), complaintsWithCount.map((option, index) => {
    return /*#__PURE__*/React.createElement(CheckBox, {
      key: index,
      onChange: e => onAssignmentChange(e, option),
      checked: hasFilters ? pgrfilters.applicationStatus.filter(e => e.code === option.code).length !== 0 ? true : false : false,
      label: `${option.name} (${option.count || 0})`
    });
  }));
};

let pgrQuery = {};
let wfQuery = {};
const Filter = props => {
  var _searchParams$filters, _searchParams$filters2, _searchParams$filters3, _searchParams$filters4, _searchParams$filters5, _searchParams$filters6, _searchParams$filters7;
  let {
    uuid
  } = Digit.UserService.getUser().info;
  const {
    searchParams
  } = props;
  const {
    t
  } = useTranslation();
  const isAssignedToMe = searchParams !== null && searchParams !== void 0 && (_searchParams$filters = searchParams.filters) !== null && _searchParams$filters !== void 0 && (_searchParams$filters2 = _searchParams$filters.wfFilters) !== null && _searchParams$filters2 !== void 0 && _searchParams$filters2.assignee && searchParams !== null && searchParams !== void 0 && (_searchParams$filters3 = searchParams.filters) !== null && _searchParams$filters3 !== void 0 && (_searchParams$filters4 = _searchParams$filters3.wfFilters) !== null && _searchParams$filters4 !== void 0 && (_searchParams$filters5 = _searchParams$filters4.assignee[0]) !== null && _searchParams$filters5 !== void 0 && _searchParams$filters5.code ? true : false;
  const assignedToOptions = useMemo(() => [{
    code: "ASSIGNED_TO_ME",
    name: t("ASSIGNED_TO_ME")
  }, {
    code: "ASSIGNED_TO_ALL",
    name: t("ASSIGNED_TO_ALL")
  }], [t]);
  const [selectAssigned, setSelectedAssigned] = useState(isAssignedToMe ? assignedToOptions[0] : assignedToOptions[1]);
  useEffect(() => setSelectedAssigned(isAssignedToMe ? assignedToOptions[0] : assignedToOptions[1]), [t]);
  const [selectedComplaintType, setSelectedComplaintType] = useState(null);
  const [selectedLocality, setSelectedLocality] = useState(null);
  const [pgrfilters, setPgrFilters] = useState((searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$filters6 = searchParams.filters) === null || _searchParams$filters6 === void 0 ? void 0 : _searchParams$filters6.pgrfilters) || {
    serviceCode: [],
    locality: [],
    applicationStatus: []
  });
  const [wfFilters, setWfFilters] = useState((searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$filters7 = searchParams.filters) === null || _searchParams$filters7 === void 0 ? void 0 : _searchParams$filters7.wfFilters) || {
    assignee: [{
      code: uuid
    }]
  });
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const {
    data: localities
  } = Digit.Hooks.useBoundaryLocalities(tenantId, "admin", {}, t);
  let serviceDefs = Digit.Hooks.pgr.useServiceDefs(tenantId, "PGR");
  const onRadioChange = value => {
    setSelectedAssigned(value);
    uuid = value.code === "ASSIGNED_TO_ME" ? uuid : "";
    setWfFilters({
      ...wfFilters,
      assignee: [{
        code: uuid
      }]
    });
  };
  useEffect(() => {
    var _wfFilters$assignee;
    let count = 0;
    for (const property in pgrfilters) {
      if (Array.isArray(pgrfilters[property])) {
        count += pgrfilters[property].length;
        let params = pgrfilters[property].map(prop => prop.code).join();
        if (params) {
          pgrQuery[property] = params;
        } else {
          var _pgrQuery;
          (_pgrQuery = pgrQuery) === null || _pgrQuery === void 0 ? true : delete _pgrQuery[property];
        }
      }
    }
    for (const property in wfFilters) {
      if (Array.isArray(wfFilters[property])) {
        let params = wfFilters[property].map(prop => prop.code).join();
        if (params) {
          wfQuery[property] = params;
        } else {
          wfQuery = {};
        }
      }
    }
    count += (wfFilters === null || wfFilters === void 0 ? void 0 : (_wfFilters$assignee = wfFilters.assignee) === null || _wfFilters$assignee === void 0 ? void 0 : _wfFilters$assignee.length) || 0;
    if (props.type !== "mobile") {
      handleFilterSubmit();
    }
    Digit.inboxFilterCount = count;
  }, [pgrfilters, wfFilters]);
  const ifExists = (list, key) => {
    return list.filter(object => object.code === key.code).length;
  };
  function applyFiltersAndClose() {
    handleFilterSubmit();
    props.onClose();
  }
  function complaintType(_type) {
    const type = {
      i18nKey: t("SERVICEDEFS." + _type.serviceCode.toUpperCase()),
      code: _type.serviceCode
    };
    if (!ifExists(pgrfilters.serviceCode, type)) {
      setPgrFilters({
        ...pgrfilters,
        serviceCode: [...pgrfilters.serviceCode, type]
      });
    }
  }
  function onSelectLocality(value, type) {
    if (!ifExists(pgrfilters.locality, value)) {
      setPgrFilters({
        ...pgrfilters,
        locality: [...pgrfilters.locality, value]
      });
    }
  }
  useEffect(() => {
    if (pgrfilters.serviceCode.length > 1) {
      setSelectedComplaintType({
        i18nKey: `${pgrfilters.serviceCode.length} selected`
      });
    } else {
      setSelectedComplaintType(pgrfilters.serviceCode[0]);
    }
  }, [pgrfilters.serviceCode]);
  useEffect(() => {
    if (pgrfilters.locality.length > 1) {
      setSelectedLocality({
        name: `${pgrfilters.locality.length} selected`
      });
    } else {
      setSelectedLocality(pgrfilters.locality[0]);
    }
  }, [pgrfilters.locality]);
  const onRemove = (index, key) => {
    let afterRemove = pgrfilters[key].filter((value, i) => {
      return i !== index;
    });
    setPgrFilters({
      ...pgrfilters,
      [key]: afterRemove
    });
  };
  const handleAssignmentChange = (e, type) => {
    if (e.target.checked) {
      setPgrFilters({
        ...pgrfilters,
        applicationStatus: [...pgrfilters.applicationStatus, {
          code: type.code
        }]
      });
    } else {
      const filteredStatus = pgrfilters.applicationStatus.filter(value => {
        return value.code !== type.code;
      });
      setPgrFilters({
        ...pgrfilters,
        applicationStatus: filteredStatus
      });
    }
  };
  function clearAll() {
    let pgrReset = {
      serviceCode: [],
      locality: [],
      applicationStatus: []
    };
    let wfRest = {
      assigned: [{
        code: []
      }]
    };
    setPgrFilters(pgrReset);
    setWfFilters(wfRest);
    pgrQuery = {};
    wfQuery = {};
    setSelectedAssigned("");
    setSelectedComplaintType(null);
    setSelectedLocality(null);
  }
  const handleFilterSubmit = () => {
    props.onFilterChange({
      pgrQuery: pgrQuery,
      wfQuery: wfQuery,
      wfFilters,
      pgrfilters
    });
  };
  const GetSelectOptions = (lable, options, selected = null, select, optionKey, onRemove, key) => {
    selected = selected || {
      [optionKey]: " ",
      code: ""
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "filter-label"
    }, lable), /*#__PURE__*/React.createElement(Dropdown, {
      option: options,
      selected: selected,
      select: value => select(value, key),
      optionKey: optionKey
    }), /*#__PURE__*/React.createElement("div", {
      className: "tag-container"
    }, pgrfilters[key].length > 0 && pgrfilters[key].map((value, index) => {
      return /*#__PURE__*/React.createElement(RemoveableTag, {
        key: index,
        text: `${value[optionKey].slice(0, 22)} ...`,
        onClick: () => onRemove(index, key)
      });
    })));
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "filter"
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
  }, /*#__PURE__*/React.createElement(CloseSvg, null))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(RadioButtons, {
    onSelect: onRadioChange,
    selectedOption: selectAssigned,
    optionsKey: "name",
    options: assignedToOptions
  }), /*#__PURE__*/React.createElement("div", null, GetSelectOptions(t("CS_COMPLAINT_DETAILS_COMPLAINT_SUBTYPE"), serviceDefs, selectedComplaintType, complaintType, "i18nKey", onRemove, "serviceCode")), /*#__PURE__*/React.createElement("div", null, GetSelectOptions(t("CS_PGR_LOCALITY"), localities, selectedLocality, onSelectLocality, "i18nkey", onRemove, "locality")), /*#__PURE__*/React.createElement(Status, {
    complaints: props.complaints,
    onAssignmentChange: handleAssignmentChange,
    pgrfilters: pgrfilters
  })))), /*#__PURE__*/React.createElement(ActionBar, null, props.type === "mobile" && /*#__PURE__*/React.createElement(ApplyFilterBar, {
    labelLink: t("ES_COMMON_CLEAR_ALL"),
    buttonLink: t("ES_COMMON_FILTER"),
    onClear: clearAll,
    onSubmit: applyFiltersAndClose
  })));
};

const SearchComplaint = ({
  onSearch,
  type,
  onClose,
  searchParams
}) => {
  var _searchParams$search, _searchParams$search2;
  const [complaintNo, setComplaintNo] = useState((searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$search = searchParams.search) === null || _searchParams$search === void 0 ? void 0 : _searchParams$search.serviceRequestId) || "");
  const [mobileNo, setMobileNo] = useState((searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$search2 = searchParams.search) === null || _searchParams$search2 === void 0 ? void 0 : _searchParams$search2.mobileNumber) || "");
  const {
    register,
    errors,
    handleSubmit,
    reset
  } = useForm();
  const {
    t
  } = useTranslation();
  const onSubmitInput = data => {
    if (!Object.keys(errors).filter(i => errors[i]).length) {
      if (data.serviceRequestId !== "") {
        onSearch({
          serviceRequestId: data.serviceRequestId
        });
      } else if (data.mobileNumber !== "") {
        onSearch({
          mobileNumber: data.mobileNumber
        });
      } else {
        onSearch({});
      }
      if (type === "mobile") {
        onClose();
      }
    }
  };
  function clearSearch() {
    reset();
    onSearch({});
    setComplaintNo("");
    setMobileNo("");
  }
  const clearAll = () => {
    return /*#__PURE__*/React.createElement(LinkLabel, {
      className: "clear-search-label",
      onClick: clearSearch
    }, t("ES_COMMON_CLEAR_SEARCH"));
  };
  function setComplaint(e) {
    setComplaintNo(e.target.value);
  }
  function setMobile(e) {
    setMobileNo(e.target.value);
  }
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit(onSubmitInput),
    style: {
      marginLeft: "24px"
    }
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "search-container",
    style: {
      width: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "search-complaint-container"
  }, type === "mobile" && /*#__PURE__*/React.createElement("div", {
    className: "complaint-header"
  }, /*#__PURE__*/React.createElement("h2", null, " ", t("CS_COMMON_SEARCH_BY"), ":"), /*#__PURE__*/React.createElement("span", {
    onClick: onClose
  }, /*#__PURE__*/React.createElement(CloseSvg, null))), /*#__PURE__*/React.createElement("div", {
    className: "complaint-input-container",
    style: {
      display: "grid"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "complaint-input"
  }, /*#__PURE__*/React.createElement(Label, null, t("CS_COMMON_COMPLAINT_NO"), "."), /*#__PURE__*/React.createElement(TextInput, {
    name: "serviceRequestId",
    value: complaintNo,
    onChange: setComplaint,
    inputRef: register({
      pattern: /(?!^$)([^\s])/
    }),
    style: {
      marginBottom: "8px"
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "mobile-input"
  }, /*#__PURE__*/React.createElement(Label, null, t("CS_COMMON_MOBILE_NO"), "."), /*#__PURE__*/React.createElement(TextInput, {
    name: "mobileNumber",
    value: mobileNo,
    onChange: setMobile,
    inputRef: register({
      pattern: /^[6-9]\d{9}$/
    })
  })), type === "desktop" && /*#__PURE__*/React.createElement(SubmitBar, {
    style: {
      marginTop: 32,
      marginLeft: "16px",
      width: "calc( 100% - 16px )"
    },
    label: t("ES_COMMON_SEARCH"),
    submit: true,
    disabled: Object.keys(errors).filter(i => errors[i]).length
  })), type === "desktop" && /*#__PURE__*/React.createElement("span", {
    className: "clear-search"
  }, clearAll()))), type === "mobile" && /*#__PURE__*/React.createElement(ActionBar, null, /*#__PURE__*/React.createElement(SubmitBar, {
    label: "Search",
    submit: true
  }))));
};

const DesktopInbox = ({
  data,
  onFilterChange,
  onSearch,
  isLoading,
  searchParams,
  onNextPage,
  onPrevPage,
  currentPage,
  pageSizeLimit,
  onPageSizeChange,
  totalRecords
}) => {
  const {
    t
  } = useTranslation();
  const GetCell = value => /*#__PURE__*/React.createElement("span", {
    className: "cell-text"
  }, value);
  const GetSlaCell = value => {
    return value < 0 ? /*#__PURE__*/React.createElement("span", {
      className: "sla-cell-error"
    }, value || "") : /*#__PURE__*/React.createElement("span", {
      className: "sla-cell-success"
    }, value || "");
  };
  const columns = React.useMemo(() => [{
    Header: t("CS_COMMON_COMPLAINT_NO"),
    Cell: ({
      row
    }) => {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
        className: "link"
      }, /*#__PURE__*/React.createElement(Link, {
        to: "/digit-ui/employee/pgr/complaint/details/" + row.original["serviceRequestId"]
      }, row.original["serviceRequestId"])), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
        className: "complain-no-cell-text"
      }, t(`SERVICEDEFS.${row.original["complaintSubType"].toUpperCase()}`)));
    }
  }, {
    Header: t("WF_INBOX_HEADER_LOCALITY"),
    Cell: ({
      row
    }) => {
      return GetCell(t(Digit.Utils.locale.getLocalityCode(row.original["locality"], row.original["tenantId"])));
    }
  }, {
    Header: t("CS_COMPLAINT_DETAILS_CURRENT_STATUS"),
    Cell: ({
      row
    }) => {
      return GetCell(t(`CS_COMMON_${row.original["status"]}`));
    }
  }, {
    Header: t("WF_INBOX_HEADER_CURRENT_OWNER"),
    Cell: ({
      row
    }) => {
      return GetCell(row.original["taskOwner"]);
    }
  }, {
    Header: t("WF_INBOX_HEADER_SLA_DAYS_REMAINING"),
    Cell: ({
      row
    }) => {
      return GetSlaCell(row.original["sla"]);
    }
  }], [t]);
  let result;
  if (isLoading) {
    result = /*#__PURE__*/React.createElement(Loader, null);
  } else if (data && data.length === 0) {
    result = /*#__PURE__*/React.createElement(Card, {
      style: {
        marginTop: 20
      }
    }, t(LOCALE.NO_COMPLAINTS_EMPLOYEE).split("\\n").map((text, index) => /*#__PURE__*/React.createElement("p", {
      key: index,
      style: {
        textAlign: "center"
      }
    }, text)));
  } else if (data.length > 0) {
    result = /*#__PURE__*/React.createElement(ComplaintTable, {
      t: t,
      data: data,
      columns: columns,
      getCellProps: cellInfo => {
        return {
          style: {
            minWidth: cellInfo.column.Header === t("CS_COMMON_COMPLAINT_NO") ? "240px" : "",
            padding: "20px 18px",
            fontSize: "16px"
          }
        };
      },
      onNextPage: onNextPage,
      onPrevPage: onPrevPage,
      totalRecords: totalRecords,
      onPageSizeChagne: onPageSizeChange,
      currentPage: currentPage,
      pageSizeLimit: pageSizeLimit
    });
  } else {
    result = /*#__PURE__*/React.createElement(Card, {
      style: {
        marginTop: 20
      }
    }, t(LOCALE.ERROR_LOADING_RESULTS).split("\\n").map((text, index) => /*#__PURE__*/React.createElement("p", {
      key: index,
      style: {
        textAlign: "center"
      }
    }, text)));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "inbox-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "filters-container"
  }, /*#__PURE__*/React.createElement(ComplaintsLink, null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Filter, {
    complaints: data,
    onFilterChange: onFilterChange,
    type: "desktop",
    searchParams: searchParams
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(SearchComplaint, {
    onSearch: onSearch,
    type: "desktop"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "24px",
      marginTop: "24px",
      marginLeft: "24px",
      flex: 1
    }
  }, result)));
};

const ComplaintCard = ({
  data,
  onFilterChange,
  onSearch,
  serviceRequestIdKey,
  searchParams
}) => {
  const {
    t
  } = useTranslation();
  const [popup, setPopup] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [filterCount, setFilterCount] = useState(Digit.inboxFilterCount || 1);
  const handlePopupAction = type => {
    if (type === "SEARCH") {
      setSelectedComponent( /*#__PURE__*/React.createElement(SearchComplaint, {
        type: "mobile",
        onClose: handlePopupClose,
        onSearch: onSearch,
        searchParams: searchParams
      }));
    } else if (type === "FILTER") {
      setSelectedComponent( /*#__PURE__*/React.createElement(Filter, {
        complaints: data,
        onFilterChange: onFilterChange,
        onClose: handlePopupClose,
        type: "mobile",
        searchParams: searchParams
      }));
    }
    setPopup(true);
  };
  const handlePopupClose = () => {
    setPopup(false);
    setSelectedComponent(null);
  };
  let result;
  if (data && (data === null || data === void 0 ? void 0 : data.length) === 0) {
    result = /*#__PURE__*/React.createElement(Card, {
      style: {
        marginTop: 20
      }
    }, t(LOCALE.NO_COMPLAINTS_EMPLOYEE).split("\\n").map((text, index) => /*#__PURE__*/React.createElement("p", {
      key: index,
      style: {
        textAlign: "center"
      }
    }, text)));
  } else if (data && (data === null || data === void 0 ? void 0 : data.length) > 0) {
    result = /*#__PURE__*/React.createElement(DetailsCard, {
      data: data,
      serviceRequestIdKey: serviceRequestIdKey,
      linkPrefix: "/digit-ui/employee/pgr/complaint/details/"
    });
  } else {
    result = /*#__PURE__*/React.createElement(Card, {
      style: {
        marginTop: 20
      }
    }, t(LOCALE.ERROR_LOADING_RESULTS).split("\\n").map((text, index) => /*#__PURE__*/React.createElement("p", {
      key: index,
      style: {
        textAlign: "center"
      }
    }, text)));
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "searchBox"
  }, /*#__PURE__*/React.createElement(SearchAction, {
    text: "SEARCH",
    handleActionClick: () => handlePopupAction("SEARCH")
  }), /*#__PURE__*/React.createElement(FilterAction, {
    filterCount: filterCount,
    text: "FILTER",
    handleActionClick: () => handlePopupAction("FILTER")
  })), result, popup && /*#__PURE__*/React.createElement(PopUp, null, /*#__PURE__*/React.createElement("div", {
    className: "popup-module"
  }, selectedComponent)));
};

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
  t$1 = b ? Symbol.for("react.lazy") : 60116,
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
              case t$1:
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
var Lazy = t$1;
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
  return z(a) === t$1;
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
  return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === typeof a && null !== a && (a.$$typeof === t$1 || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
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

const GetSlaCell = value => {
  return value < 0 ? /*#__PURE__*/React.createElement("span", {
    className: "sla-cell-error"
  }, value) : /*#__PURE__*/React.createElement("span", {
    className: "sla-cell-success"
  }, value);
};
const MobileInbox = ({
  data,
  onFilterChange,
  onSearch,
  isLoading,
  searchParams
}) => {
  const {
    t
  } = useTranslation();
  const localizedData = data === null || data === void 0 ? void 0 : data.map(({
    locality,
    tenantId,
    serviceRequestId,
    complaintSubType,
    sla,
    status,
    taskOwner
  }) => ({
    [t("CS_COMMON_COMPLAINT_NO")]: serviceRequestId,
    [t("CS_ADDCOMPLAINT_COMPLAINT_SUB_TYPE")]: t(`SERVICEDEFS.${complaintSubType.toUpperCase()}`),
    [t("WF_INBOX_HEADER_LOCALITY")]: t(Digit.Utils.locale.getLocalityCode(locality, tenantId)),
    [t("CS_COMPLAINT_DETAILS_CURRENT_STATUS")]: t(`CS_COMMON_${status}`),
    [t("WF_INBOX_HEADER_CURRENT_OWNER")]: taskOwner,
    [t("WF_INBOX_HEADER_SLA_DAYS_REMAINING")]: GetSlaCell(sla)
  }));
  let result;
  if (isLoading) {
    result = /*#__PURE__*/React.createElement(Loader, null);
  } else {
    result = /*#__PURE__*/React.createElement(ComplaintCard, {
      data: localizedData,
      onFilterChange: onFilterChange,
      serviceRequestIdKey: t("CS_COMMON_COMPLAINT_NO"),
      onSearch: onSearch,
      searchParams: searchParams
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "inbox-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "filters-container"
  }, /*#__PURE__*/React.createElement(ComplaintsLink, {
    isMobile: true
  }), result)));
};
MobileInbox.propTypes = {
  data: propTypes.any,
  onFilterChange: propTypes.func,
  onSearch: propTypes.func,
  isLoading: propTypes.bool,
  searchParams: propTypes.any
};
MobileInbox.defaultProps = {
  onFilterChange: () => {},
  searchParams: {}
};

const Inbox = () => {
  const {
    t
  } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const {
    uuid
  } = Digit.UserService.getUser().info;
  const [pageOffset, setPageOffset] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchParams, setSearchParams] = useState({
    filters: {
      wfFilters: {
        assignee: [{
          code: uuid
        }]
      }
    },
    search: "",
    sort: {}
  });
  useEffect(() => {
    (async (_searchParams$filters, _searchParams$filters2, _searchParams$filters3) => {
      const applicationStatus = searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$filters = searchParams.filters) === null || _searchParams$filters === void 0 ? void 0 : (_searchParams$filters2 = _searchParams$filters.pgrfilters) === null || _searchParams$filters2 === void 0 ? void 0 : (_searchParams$filters3 = _searchParams$filters2.applicationStatus) === null || _searchParams$filters3 === void 0 ? void 0 : _searchParams$filters3.map(e => e.code).join(",");
      let response = await Digit.PGRService.count(tenantId, (applicationStatus === null || applicationStatus === void 0 ? void 0 : applicationStatus.length) > 0 ? {
        applicationStatus
      } : {});
      if (response !== null && response !== void 0 && response.count) {
        setTotalRecords(response.count);
      }
    })();
  }, [searchParams]);
  const fetchNextPage = () => {
    setPageOffset(prevState => prevState + 10);
  };
  const fetchPrevPage = () => {
    setPageOffset(prevState => prevState - 10);
  };
  const handlePageSizeChange = e => {
    setPageSize(Number(e.target.value));
  };
  const handleFilterChange = filterParam => {
    setSearchParams({
      ...searchParams,
      filters: filterParam
    });
  };
  const onSearch = (params = "") => {
    setSearchParams({
      ...searchParams,
      search: params
    });
  };
  let {
    data: complaints,
    isLoading
  } = Digit.Hooks.pgr.useInboxData({
    ...searchParams,
    offset: pageOffset,
    limit: pageSize
  });
  let isMobile = Digit.Utils.browser.isMobile();
  if ((complaints === null || complaints === void 0 ? void 0 : complaints.length) !== null) {
    if (isMobile) {
      return /*#__PURE__*/React.createElement(MobileInbox, {
        data: complaints,
        isLoading: isLoading,
        onFilterChange: handleFilterChange,
        onSearch: onSearch,
        searchParams: searchParams
      });
    } else {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Header, null, t("ES_COMMON_INBOX")), /*#__PURE__*/React.createElement(DesktopInbox, {
        data: complaints,
        isLoading: isLoading,
        onFilterChange: handleFilterChange,
        onSearch: onSearch,
        searchParams: searchParams,
        onNextPage: fetchNextPage,
        onPrevPage: fetchPrevPage,
        onPageSizeChange: handlePageSizeChange,
        currentPage: Math.floor(pageOffset / pageSize),
        totalRecords: totalRecords,
        pageSizeLimit: pageSize
      }));
    }
  } else {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
};

const GetActionMessage$2 = ({
  action
}) => {
  const {
    t
  } = useTranslation();
  if (action === "REOPEN") {
    return t(`CS_COMMON_COMPLAINT_REOPENED`);
  } else {
    return t(`CS_COMMON_COMPLAINT_SUBMITTED`);
  }
};
const BannerPicker$2 = ({
  response
}) => {
  const {
    complaints
  } = response;
  if (complaints && complaints.response && complaints.response.responseInfo) {
    return /*#__PURE__*/React.createElement(Banner, {
      message: GetActionMessage$2(complaints.response.ServiceWrappers[0].workflow),
      complaintNumber: complaints.response.ServiceWrappers[0].service.serviceRequestId,
      successful: true
    });
  } else {
    return /*#__PURE__*/React.createElement(Banner, {
      message: t("CS_COMMON_COMPLAINT_NOT_SUBMITTED"),
      successful: false
    });
  }
};
const Response$2 = props => {
  const {
    t
  } = useTranslation();
  const {
    match
  } = useRouteMatch();
  const appState = useSelector(state => state)["pgr"];
  return /*#__PURE__*/React.createElement(Card, null, appState.complaints.response && /*#__PURE__*/React.createElement(BannerPicker$2, {
    response: appState
  }), /*#__PURE__*/React.createElement(CardText, null, t("ES_COMMON_TRACK_COMPLAINT_TEXT")), /*#__PURE__*/React.createElement(Link, {
    to: "/digit-ui/employee"
  }, /*#__PURE__*/React.createElement(SubmitBar, {
    label: t("CORE_COMMON_GO_TO_HOME")
  })));
};

const PGRReducers = getRootReducer;
const PGRModule = ({
  stateCode,
  userType,
  tenants
}) => {
  const moduleCode = "PGR";
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
  Digit.SessionStorage.set("PGR_TENANTS", tenants);
  if (userType === "citizen") {
    return /*#__PURE__*/React.createElement(App, null);
  } else {
    return /*#__PURE__*/React.createElement(App$1, null);
  }
};
const PGRLinks = ({
  matchPath
}) => {
  const {
    t
  } = useTranslation();
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage(PGR_CITIZEN_CREATE_COMPLAINT, {});
  useEffect(() => {
    clearParams();
  }, []);
  const links = [{
    link: `${matchPath}/create-complaint/complaint-type`,
    i18nKey: t("CS_COMMON_FILE_A_COMPLAINT")
  }, {
    link: `${matchPath}/complaints`,
    i18nKey: t(LOCALE.MY_COMPLAINTS)
  }];
  return /*#__PURE__*/React.createElement(CitizenHomeCard, {
    header: t("CS_COMMON_HOME_COMPLAINTS"),
    links: links,
    Icon: ComplaintIcon
  });
};
const componentsToRegister = {
  PGRModule,
  PGRLinks,
  PGRCard,
  PGRComplaintDetails: ComplaintDetails,
  PGRCreateComplaintEmp: CreateComplaint$1,
  PGRInbox: Inbox,
  PGRResponseEmp: Response$2,
  PGRCreateComplaintCitizen: CreateComplaint,
  PGRComplaintsList: ComplaintsList,
  PGRComplaintDetailsPage: ComplaintDetailsPage,
  PGRSelectRating: SelectRating,
  PGRResponseCitzen: Response
};
const initPGRComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};

export { PGRReducers, initPGRComponents };
//# sourceMappingURL=index.modern.js.map
