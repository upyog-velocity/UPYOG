import { SurveyIconSolid, PMBIconSolid, EventsIconSolid, DocumentIconSolid, EmployeeModuleCard, LabelFieldPair, CardLabel, Dropdown, RemoveableTag, TextInput, TextArea, CardLabelError as CardLabelError$1, UploadFile, Loader, Header, FormComposer, Card, CardText, ActionBar, SubmitBar, Banner, Table, CloseSvg, Label, LinkLabel, EventCalendar, DocumentIcon, CheckBox, RefreshIcon, DateRange, DetailsCard, SearchAction, FilterAction, PopUp, PMBIcon, RadioButtons, DatePicker, Modal, CardSubHeader, PDFSvg, MultiUploadWrapper, CardHeader, CardSectionHeader, StatusTable, Row, LinkButton, Close as Close$c, BreakLine, TelePhone, DisplayPhotos, Toast, InfoBannerIcon, CheckPoint, ConnectingCheckPoints, Menu, ButtonSelector, GenericFileIcon, PrivateRoute, LocationSearch, OnGroundEventCard, WhatsNewCard, CardCaption, SearchIconSvg, ViewsIcon, ExternalLinkIcon, DownloadImgIcon, AppContainer, PrevIcon, BackButton, MapMarker, Clock, FilterFormField, SearchField, InboxComposer, MultiSelectDropdown, DustbinIcon, MultiLink, BreadCrumb } from '@egovernments/digit-ui-react-components';
import React, { useEffect, useMemo, Fragment, useState, useCallback, useRef, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useHistory, useParams, Link, Switch, Redirect as Redirect$1, Route, useRouteMatch } from 'react-router-dom';
import { Controller, useForm, useFormContext, FormProvider } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import 'react-time-picker';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Bar } from 'recharts';

const EngagementCard = () => {
  var _Digit$SessionStorage, _Digit$SessionStorage2;
  const userRoles = (_Digit$SessionStorage = Digit.SessionStorage.get("User")) === null || _Digit$SessionStorage === void 0 ? void 0 : (_Digit$SessionStorage2 = _Digit$SessionStorage.info) === null || _Digit$SessionStorage2 === void 0 ? void 0 : _Digit$SessionStorage2.roles;
  const isEmployee = userRoles.find(role => role.code === "EMPLOYEE");
  useEffect(() => {
    Digit.SessionStorage.set("CITIZENSURVEY.INBOX", null);
  }, []);
  if (!isEmployee) return null;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const {
    data: documentsCount,
    isLoading: isLoadingDocs
  } = Digit.Hooks.engagement.useDocSearch({
    tenantIds: tenantId
  }, {
    select: data => {
      return data === null || data === void 0 ? void 0 : data.totalCount;
    }
  });
  const {
    data: MessagesCount,
    isLoading: isLoadingMessages
  } = Digit.Hooks.events.useInbox(tenantId, {}, {
    status: "ACTIVE,INACTIVE",
    eventTypes: "BROADCAST"
  }, {
    select: data => data === null || data === void 0 ? void 0 : data.totalCount
  });
  const {
    data: totalEvents,
    isLoading: isLoadingEvents
  } = Digit.Hooks.events.useInbox(tenantId, {}, {
    eventTypes: "EVENTSONGROUND"
  }, {
    select: data => data === null || data === void 0 ? void 0 : data.totalCount
  });
  const {
    data: surveysCount,
    isLoading: isLoadingSurveys
  } = Digit.Hooks.survey.useSearch({
    tenantIds: tenantId
  }, {
    select: data => data === null || data === void 0 ? void 0 : data.TotalCount
  });
  const totalDocsCount = useMemo(() => isLoadingDocs ? "-" : documentsCount, [isLoadingDocs, documentsCount]);
  const totalEventsCount = useMemo(() => isLoadingEvents ? "-" : totalEvents, [isLoadingEvents, totalEvents]);
  const totalMessagesCount = useMemo(() => isLoadingMessages ? "-" : MessagesCount, [isLoadingMessages, MessagesCount]);
  const totalSurveysCount = useMemo(() => isLoadingSurveys ? "-" : surveysCount, [isLoadingSurveys, surveysCount]);
  const {
    t
  } = useTranslation();
  let result = null;
  const propsForSurveyModuleCard = {
    Icon: /*#__PURE__*/React.createElement(SurveyIconSolid, null),
    moduleName: t("CS_COMMON_SURVEYS"),
    kpis: [{
      count: totalSurveysCount,
      label: t("TOTAL_SURVEYS"),
      link: `/digit-ui/employee/engagement/surveys/inbox`
    }],
    links: [{
      count: totalSurveysCount,
      label: t("ES_TITLE_INBOX"),
      link: `/digit-ui/employee/engagement/surveys/inbox`
    }, {
      label: t("CS_COMMON_NEW_SURVEY"),
      link: `/digit-ui/employee/engagement/surveys/create`
    }]
  };
  const propsForPMBModuleCard = {
    Icon: /*#__PURE__*/React.createElement(PMBIconSolid, null),
    moduleName: t("ACTION_TEST_PUBLIC_MESSAGE_BROADCAST"),
    kpis: [{
      count: totalMessagesCount,
      label: t("TOTAL_MESSAGES"),
      link: `/digit-ui/employee/engagement/messages/inbox`
    }],
    links: [{
      count: totalMessagesCount,
      label: t("ES_TITLE_INBOX"),
      link: `/digit-ui/employee/engagement/messages/inbox`
    }, {
      label: t("NEW_PUBLIC_MESSAGE_BUTTON_LABEL"),
      link: `/digit-ui/employee/engagement/messages/create`
    }]
  };
  const propsForEventsModuleCard = {
    Icon: /*#__PURE__*/React.createElement(EventsIconSolid, null),
    moduleName: t("TOTAL_EVENTS"),
    kpis: [{
      count: totalEventsCount,
      label: t("TOTAL_EVENTS"),
      link: `/digit-ui/employee/engagement/event/inbox`
    }],
    links: [{
      count: totalEventsCount,
      label: t("ES_TITLE_INBOX"),
      link: `/digit-ui/employee/engagement/event/inbox`
    }, {
      label: t("ES_TITLE_NEW_EVENTS"),
      link: `/digit-ui/employee/engagement/event/new-event`
    }]
  };
  const propsForDocumentModuleCard = {
    Icon: /*#__PURE__*/React.createElement(DocumentIconSolid, null),
    moduleName: t("ES_TITLE_DOCS"),
    kpis: [{
      count: totalDocsCount,
      label: t("TOTAL_DOCUMENTS"),
      link: `/digit-ui/employee/engagement/documents/inbox`
    }],
    links: [{
      count: totalDocsCount,
      label: t("ES_TITLE_INBOX"),
      link: `/digit-ui/employee/engagement/documents/inbox`
    }, {
      label: t("NEW_DOCUMENT_TEXT"),
      link: `/digit-ui/employee/engagement/documents/new-doc`
    }]
  };
  const engagementSubModulesProps = [propsForDocumentModuleCard, propsForEventsModuleCard, propsForPMBModuleCard, propsForSurveyModuleCard];
  if (isEmployee) result = /*#__PURE__*/React.createElement(Fragment, null, engagementSubModulesProps.map((propsForModuleCard, index) => /*#__PURE__*/React.createElement(EmployeeModuleCard, Object.assign({
    key: index,
    longModuleName: true
  }, propsForModuleCard))));
  return result;
};

function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
  }
}

function toDate(argument) {
  requiredArgs(1, arguments);
  var argStr = Object.prototype.toString.call(argument);
  if (argument instanceof Date || typeof argument === 'object' && argStr === '[object Date]') {
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule");
      console.warn(new Error().stack);
    }
    return new Date(NaN);
  }
}

function startOfDay(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}

function isSameDay(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeftStartOfDay = startOfDay(dirtyDateLeft);
  var dateRightStartOfDay = startOfDay(dirtyDateRight);
  return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime();
}

function isToday(dirtyDate) {
  requiredArgs(1, arguments);
  return isSameDay(dirtyDate, Date.now());
}

const alphabeticalSortFunctionForTenantsBasedOnName = (firstEl, secondEl) => {
  if (firstEl.name.toUpperCase() < secondEl.name.toUpperCase()) {
    return -1;
  }
  if (firstEl.name.toUpperCase() > secondEl.name.toUpperCase()) {
    return 1;
  }
  return 0;
};
const areEqual = (stringA, stringB) => {
  var _stringA$trim, _stringB$trim;
  if (!stringA || !stringB) return false;
  if ((stringA === null || stringA === void 0 ? void 0 : (_stringA$trim = stringA.trim()) === null || _stringA$trim === void 0 ? void 0 : _stringA$trim.toLowerCase()) === (stringB === null || stringB === void 0 ? void 0 : (_stringB$trim = stringB.trim()) === null || _stringB$trim === void 0 ? void 0 : _stringB$trim.toLowerCase())) {
    return true;
  }
  return false;
};
const getFileUrl = async fileStoreId => {
  try {
    var _response$data, _response$data$fileSt;
    const response = await Digit.UploadServices.Filefetch([fileStoreId], Digit.ULBService.getStateId());
    if ((response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : (_response$data$fileSt = _response$data.fileStoreIds) === null || _response$data$fileSt === void 0 ? void 0 : _response$data$fileSt.length) > 0) {
      var _response$data$fileSt2, _response$data$fileSt3;
      const url = (_response$data$fileSt2 = response.data.fileStoreIds[0]) === null || _response$data$fileSt2 === void 0 ? void 0 : _response$data$fileSt2.url;
      if (url.includes(".jpg") || url.includes(".png")) {
        const arr = url.split(",");
        const [original, large, medium, small] = arr;
        return original;
      }
      return (_response$data$fileSt3 = response.data.fileStoreIds[0]) === null || _response$data$fileSt3 === void 0 ? void 0 : _response$data$fileSt3.url;
    }
  } catch (err) {}
};
const openUploadedDocument = async (filestoreId, name) => {
  if (!filestoreId || !filestoreId.length) {
    alert("No Document exists!");
    return;
  }
  const w = window.open("", "_blank");
  const url = await getFileUrl(filestoreId);
  if (window.mSewaApp && window.mSewaApp.isMsewaApp()) {
    window.open(url, "_blank");
    setTimeout(() => {
      window.location.href = url;
    }, 1000);
  } else {
    w.location = url;
    w.document.title = name;
  }
};
const openDocumentLink = (docLink, title) => {
  if (!docLink || !docLink.length) {
    alert("No Document Link exists!");
    return;
  }
  if (window.mSewaApp && window.mSewaApp.isMsewaApp()) {
    window.open(docLink, "_blank");
    setTimeout(() => {
      window.location.href = docLink;
    }, 1000);
  } else {
    const w = window.open("", "_blank");
    w.location = docLink;
    w.document.title = title;
  }
};
const downloadDocument = async (filestoreId, title) => {
  if (!filestoreId || !filestoreId.length) {
    alert("No Document exists!");
    return;
  }
  const fileUrl = await getFileUrl(filestoreId);
  if (fileUrl) {
    Digit.Utils.downloadPDFFromLink(fileUrl);
  }
};
const isNestedArray = documents => {
  if (!documents || !documents.length) return false;
  if (Array.isArray(documents) && documents.length) {
    const firstItem = Array.isArray(documents[0]);
    if (firstItem) {
      return true;
    }
  }
  return false;
};
const reduceDocsArray = documentsArray => {
  if (!documentsArray || !documentsArray.length) return [];
  return documentsArray.reduce((acc, files) => {
    let fileObj = {};
    const [_, {
      file,
      fileStoreId
    }] = files;
    fileObj["fileName"] = file === null || file === void 0 ? void 0 : file.name;
    fileObj["documentType"] = file === null || file === void 0 ? void 0 : file.type;
    fileObj["fileStoreId"] = fileStoreId === null || fileStoreId === void 0 ? void 0 : fileStoreId.fileStoreId;
    acc.push(fileObj);
    return acc;
  }, []);
};
const getFileSize = size => {
  if (size === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(size) / Math.log(k));
  return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
const documentUploadMessage = (t, fileStoreId, editMode) => {
  var _fileStoreId$fileStor;
  if (!fileStoreId) return t(`CS_ACTION_NO_FILEUPLOADED`);
  return editMode ? fileStoreId !== null && fileStoreId !== void 0 && (_fileStoreId$fileStor = fileStoreId.fileStoreId) !== null && _fileStoreId$fileStor !== void 0 && _fileStoreId$fileStor.length ? `1 ${t(`CS_ACTION_FILEUPLOADED`)}` : t(`CS_ACTION_NO_FILEUPLOADED`) : fileStoreId ? `1 ${t(`CS_ACTION_FILEUPLOADED`)}` : t(`CS_ACTION_NO_FILEUPLOADED`);
};
const checkValidFileType = fileType => {
  if (!fileType) return false;
  const allowedFileType = /(.*?)(jpg|jpeg|png|image|pdf|msword|openxmlformats)$/i;
  if (allowedFileType.test(fileType)) {
    return true;
  }
  return false;
};
const handleTodaysDate = dateString => {
  let dateObject = new Date(dateString);
  if (isToday(dateObject)) {
    const todaysDate = new Date();
    dateObject = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), todaysDate.getDate(), 23, 59);
  }
  return dateObject.getTime();
};
const convertDateToMaximumPossibleValue = dateObject => {
  return new Date(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate(), 23, 59);
};

const SelectULB = ({
  userType,
  t,
  setValue,
  onSelect,
  config,
  data,
  formData,
  register,
  errors,
  setError,
  clearErrors,
  formState,
  control
}) => {
  var _formData$config$key2, _formData$config$key3;
  const ulbs = Digit.SessionStorage.get("ENGAGEMENT_TENANTS");
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const selectedTenat = useMemo(() => {
    if (formData !== null && formData !== void 0 && formData.defaultTenantId) {
      return ulbs === null || ulbs === void 0 ? void 0 : ulbs.find(ulb => (ulb === null || ulb === void 0 ? void 0 : ulb.code) === (formData === null || formData === void 0 ? void 0 : formData.defaultTenantId));
    }
    if (tenantId && ulbs) {
      const filtered = ulbs === null || ulbs === void 0 ? void 0 : ulbs.filter(item => item.code === tenantId);
      return filtered;
    }
    return (userUlbs === null || userUlbs === void 0 ? void 0 : userUlbs.length) === 1 ? userUlbs === null || userUlbs === void 0 ? void 0 : userUlbs[0] : null;
  }, [tenantId, ulbs]);
  const userInfo = Digit.SessionStorage.get("citizen.userRequestObject");
  const userUlbs = ulbs.filter(ulb => {
    var _userInfo$info, _userInfo$info$roles;
    return userInfo === null || userInfo === void 0 ? void 0 : (_userInfo$info = userInfo.info) === null || _userInfo$info === void 0 ? void 0 : (_userInfo$info$roles = _userInfo$info.roles) === null || _userInfo$info$roles === void 0 ? void 0 : _userInfo$info$roles.some(role => (role === null || role === void 0 ? void 0 : role.tenantId) === (ulb === null || ulb === void 0 ? void 0 : ulb.code));
  }).sort(alphabeticalSortFunctionForTenantsBasedOnName);
  const dropDownData = Digit.ULBService.getUserUlbs("SUPERUSER").sort(alphabeticalSortFunctionForTenantsBasedOnName);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LabelFieldPair, {
    style: {
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(CardLabel, {
    style: {
      fontWeight: "bold"
    }
  }, t("ES_COMMON_ULB") + " *"), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement(Controller, {
    name: config.key,
    control: control,
    defaultValue: selectedTenat === null || selectedTenat === void 0 ? void 0 : selectedTenat[0],
    rules: {
      required: true
    },
    render: props => /*#__PURE__*/React.createElement(Dropdown, {
      allowMultiselect: true,
      optionKey: "i18nKey",
      option: dropDownData,
      select: e => {
        var _formData$config$key, _formData$config$key$;
        props.onChange([...((formData === null || formData === void 0 ? void 0 : (_formData$config$key = formData[config === null || config === void 0 ? void 0 : config.key]) === null || _formData$config$key === void 0 ? void 0 : (_formData$config$key$ = _formData$config$key.filter) === null || _formData$config$key$ === void 0 ? void 0 : _formData$config$key$.call(_formData$config$key, f => e.code != (f === null || f === void 0 ? void 0 : f.code))) || []), e]);
      },
      keepNull: true,
      selected: props.value,
      disable: (ulbs === null || ulbs === void 0 ? void 0 : ulbs.length) === 1,
      t: t
    })
  }), /*#__PURE__*/React.createElement("div", {
    className: "tag-container"
  }, formData && ((_formData$config$key2 = formData[config === null || config === void 0 ? void 0 : config.key]) === null || _formData$config$key2 === void 0 ? void 0 : _formData$config$key2.length) > 0 && (formData === null || formData === void 0 ? void 0 : (_formData$config$key3 = formData[config.key]) === null || _formData$config$key3 === void 0 ? void 0 : _formData$config$key3.map((ulb, index) => {
    return /*#__PURE__*/React.createElement(RemoveableTag, {
      key: index,
      text: t(ulb === null || ulb === void 0 ? void 0 : ulb.i18nKey),
      onClick: () => {
        var _formData$config$key4;
        setValue(config.key, formData === null || formData === void 0 ? void 0 : (_formData$config$key4 = formData[config.key]) === null || _formData$config$key4 === void 0 ? void 0 : _formData$config$key4.filter(e => e.i18nKey != ulb.i18nKey));
      }
    });
  }))), errors && errors[config.key] && /*#__PURE__*/React.createElement(CardLabelError, null, t(`EVENTS_TENANT_ERROR_REQUIRED`)))));
};

const ULBDropdown = ({
  userType,
  t,
  setValue,
  onSelect,
  config,
  data,
  formData,
  register,
  errors,
  setError,
  clearErrors,
  formState,
  control
}) => {
  const ulbs = Digit.SessionStorage.get("ENGAGEMENT_TENANTS");
  const userInfo = Digit.UserService.getUser().info;
  const userUlbs = ulbs.filter(ulb => {
    var _userInfo$roles;
    return userInfo === null || userInfo === void 0 ? void 0 : (_userInfo$roles = userInfo.roles) === null || _userInfo$roles === void 0 ? void 0 : _userInfo$roles.some(role => (role === null || role === void 0 ? void 0 : role.tenantId) === (ulb === null || ulb === void 0 ? void 0 : ulb.code));
  }).sort(alphabeticalSortFunctionForTenantsBasedOnName);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LabelFieldPair, {
    style: {
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(CardLabel, {
    style: {
      fontWeight: "bold"
    }
  }, t("ES_COMMON_ULB") + "*"), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement(Controller, {
    name: config.key,
    control: control,
    rules: {
      required: true
    },
    render: ({
      onChange,
      value
    }) => /*#__PURE__*/React.createElement(Dropdown, {
      option: userUlbs,
      selected: value,
      disable: (userUlbs === null || userUlbs === void 0 ? void 0 : userUlbs.length) === 1,
      optionKey: "code",
      t: t,
      select: onChange
    })
  }), errors && errors[config === null || config === void 0 ? void 0 : config.key] && /*#__PURE__*/React.createElement(CardLabelError, null, t(`EVENTS_TENANT_ERROR_REQUIRED`)))));
};

const DocumentName = ({
  userType,
  t,
  setValue,
  onSelect,
  config,
  data,
  formData,
  register,
  errors,
  setError,
  clearErrors,
  formState,
  control
}) => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LabelFieldPair, {
    style: {
      marginBottom: '20px'
    }
  }, /*#__PURE__*/React.createElement(CardLabel, {
    style: {
      fontWeight: "bold"
    }
  }, t("ES_COMMON_DOC_NAME") + " *"), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement(TextInput, {
    name: config.key,
    inputRef: register()
  }))));
};

const SelectCategory = ({
  userType,
  t,
  setValue,
  onSelect,
  config,
  data,
  formData,
  register,
  errors,
  setError,
  clearErrors,
  formState,
  control
}) => {
  const stateId = Digit.ULBService.getStateId();
  const [ulbs, setUlbs] = useState(() => {
    return [];
  });
  const currrentUlb = Digit.ULBService.getCurrentUlb() || "pb.amritsar";
  const {
    data: categoryData,
    isLoading
  } = Digit.Hooks.engagement.useMDMS(stateId, "DocumentUploader", ["UlbLevelCategories"], {
    select: d => {
      var _d$DocumentUploader, _d$DocumentUploader$U, _d$DocumentUploader$U2;
      const data = d === null || d === void 0 ? void 0 : (_d$DocumentUploader = d.DocumentUploader) === null || _d$DocumentUploader === void 0 ? void 0 : (_d$DocumentUploader$U = _d$DocumentUploader.UlbLevelCategories) === null || _d$DocumentUploader$U === void 0 ? void 0 : (_d$DocumentUploader$U2 = _d$DocumentUploader$U.filter) === null || _d$DocumentUploader$U2 === void 0 ? void 0 : _d$DocumentUploader$U2.call(_d$DocumentUploader$U, e => e.ulb === currrentUlb.code);
      return data[0].categoryList.map(name => ({
        name
      }));
    }
  });
  useEffect(() => {
    var _formData$ULB, _formData$ULB2;
    formData !== null && formData !== void 0 && (_formData$ULB = formData.ULB) !== null && _formData$ULB !== void 0 && _formData$ULB.length ? setUlbs(formData === null || formData === void 0 ? void 0 : (_formData$ULB2 = formData.ULB) === null || _formData$ULB2 === void 0 ? void 0 : _formData$ULB2.map(e => e === null || e === void 0 ? void 0 : e.code)) : null;
  }, [formData === null || formData === void 0 ? void 0 : formData.ULB]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LabelFieldPair, null, /*#__PURE__*/React.createElement(CardLabel, {
    style: {
      fontWeight: "bold"
    }
  }, t("ES_COMMON_DOC_CATEGORY") + "*"), /*#__PURE__*/React.createElement(Controller, {
    name: config.key,
    control: control,
    render: props => /*#__PURE__*/React.createElement("div", {
      className: "field"
    }, /*#__PURE__*/React.createElement(Dropdown, {
      option: categoryData,
      select: props.onChange,
      selected: props.value,
      t: t,
      optionKey: "name"
    }))
  })));
};

const SelectULB$1 = ({
  userType,
  t,
  setValue,
  onSelect,
  config,
  data,
  formData,
  register,
  errors,
  setError,
  clearErrors,
  formState,
  control
}) => {
  var _errors$description, _errors$description2, _errors$description2$;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LabelFieldPair, null, /*#__PURE__*/React.createElement(CardLabel, {
    style: {
      fontWeight: "bold"
    }
  }, t("ES_COMMON_DOC_DESCRIPTION")), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement(TextArea, {
    name: config.key,
    inputRef: register({
      maxLength: 140
    })
  }), (errors === null || errors === void 0 ? void 0 : (_errors$description = errors.description) === null || _errors$description === void 0 ? void 0 : _errors$description.type) && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`ERROR_${errors === null || errors === void 0 ? void 0 : (_errors$description2 = errors.description) === null || _errors$description2 === void 0 ? void 0 : (_errors$description2$ = _errors$description2.type) === null || _errors$description2$ === void 0 ? void 0 : _errors$description2$.toUpperCase()}_140`)))));
};

const EngagementDocUploadDocument = ({
  userType,
  t,
  onSelect,
  setValue,
  config,
  data,
  formData,
  register,
  errors,
  setError,
  clearErrors,
  formState,
  control
}) => {
  const [fileStoreId, setFileStoreId] = useState(() => {
    var _formData$config$key;
    return formData === null || formData === void 0 ? void 0 : (_formData$config$key = formData[config.key]) === null || _formData$config$key === void 0 ? void 0 : _formData$config$key.filestoreId;
  });
  const [fileSize, setFileSize] = useState();
  const [fileType, setFileType] = useState('');
  const [file, setFile] = useState();
  const [urlDisabled, setUrlDisabled] = useState(false);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [controllerProps, setProps] = useState({});
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageUploadError, setUploadError] = useState("");
  const selectFile = (e, props) => {
    var _e$target, _e$target$files, _e$target2, _e$target2$files$, _e$target3, _e$target3$files$;
    setFile();
    setFileSize();
    setFileType();
    setUploadError("");
    if (!((_e$target = e.target) !== null && _e$target !== void 0 && (_e$target$files = _e$target.files) !== null && _e$target$files !== void 0 && _e$target$files.length)) return;
    const size = e === null || e === void 0 ? void 0 : (_e$target2 = e.target) === null || _e$target2 === void 0 ? void 0 : (_e$target2$files$ = _e$target2.files[0]) === null || _e$target2$files$ === void 0 ? void 0 : _e$target2$files$.size;
    const type = e === null || e === void 0 ? void 0 : (_e$target3 = e.target) === null || _e$target3 === void 0 ? void 0 : (_e$target3$files$ = _e$target3.files[0]) === null || _e$target3$files$ === void 0 ? void 0 : _e$target3$files$.type;
    if (size && size / 1024 / 1024 > 5) {
      setUploadError('FILE_SIZE_EXCEEDED');
      return;
    }
    if (type && checkValidFileType(type)) {
      setFileSize(size);
      setFileType(type);
      setProps(props);
      setFile(e.target.files[0]);
      return;
    } else {
      setUploadError('NOT_SUPPORTED_FILE_TYPE');
    }
  };
  useEffect(() => {
    if (file) uploadFile();
  }, [file]);
  useEffect(() => {
    var _controllerProps$onCh;
    if (fileStoreId) ;else setUrlDisabled(false);
    controllerProps === null || controllerProps === void 0 ? void 0 : (_controllerProps$onCh = controllerProps.onChange) === null || _controllerProps$onCh === void 0 ? void 0 : _controllerProps$onCh.call(controllerProps, {
      fileStoreId,
      fileSize,
      fileType
    });
  }, [fileStoreId, controllerProps]);
  const uploadFile = async () => {
    try {
      var _response$data, _response$data$files;
      setIsUploadingImage(true);
      const response = await Digit.UploadServices.Filestorage("engagement", file, Digit.ULBService.getStateId());
      if ((response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : (_response$data$files = _response$data.files) === null || _response$data$files === void 0 ? void 0 : _response$data$files.length) > 0) {
        var _response$data2, _response$data2$files;
        setFileStoreId(response === null || response === void 0 ? void 0 : (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : (_response$data2$files = _response$data2.files[0]) === null || _response$data2$files === void 0 ? void 0 : _response$data2$files.fileStoreId);
      } else {
        setError(t("CS_FILE_UPLOAD_ERROR"));
      }
    } catch (err) {} finally {
      setIsUploadingImage(false);
    }
  };
  const location = useLocation();
  const isInEditFormMode = useMemo(() => {
    if (location.pathname.includes('/documents/inbox/update')) return true;
    return false;
  }, [location.pathname]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LabelFieldPair, null, /*#__PURE__*/React.createElement(CardLabel, {
    style: {
      fontWeight: "bold"
    }
  }, t("ES_COMMON_DOC_DOCUMENT") + "*"), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement(Controller, {
    name: config.key + ".filestoreId",
    control: control,
    render: props => /*#__PURE__*/React.createElement(UploadFile, {
      id: "city-engagement-doc",
      onUpload: d => selectFile(d, props),
      onDelete: () => {
        setFileStoreId(null);
        setFileSize(100);
      },
      accept: "image/*, .pdf, .png, .jpeg, .doc",
      showHintBelow: true,
      hintText: t("DOCUMENTS_ATTACH_RESTRICTIONS_SIZE"),
      message: isUploadingImage ? /*#__PURE__*/React.createElement(Loader, null) : documentUploadMessage(t, fileStoreId, isInEditFormMode),
      textStyles: {
        width: "100%"
      },
      inputStyles: {
        width: "280px"
      }
    })
  }), fileSize ? `${getFileSize(fileSize)}` : null, imageUploadError ? /*#__PURE__*/React.createElement(CardLabelError$1, null, t(imageUploadError)) : null)));
};

const config = [{
  head: "",
  body: [{
    type: "form",
    withoutLabel: true,
    component: "EventForm",
    nextStep: "",
    route: "",
    key: "eventData"
  }, {
    type: "text",
    label: "EVENTS_DESCRIPTION_LABEL",
    isMandatory: true,
    description: "EVENTS_DESCRIPTION_TEXT",
    populators: {
      name: "description",
      className: "fullWidth",
      validation: {
        required: true,
        maxLength: 500
      },
      error: 'EVENTS_DESCRIPTION_ERROR_REQUIRED'
    }
  }, {
    type: "date",
    label: "EVENTS_FROM_DATE_LABEL",
    isMandatory: true,
    populators: {
      name: "fromDate",
      className: "fullWidth",
      validation: {
        required: true
      },
      shouldUpdate: true,
      error: "EVENTS_FROM_DATE_ERROR_INVALID"
    }
  }, {
    type: "form",
    key: "SelectToDate",
    withoutLabel: true,
    component: "SelectToDate",
    key: "toDate"
  }, {
    type: "time",
    label: "EVENTS_FROM_TIME_LABEL",
    isMandatory: true,
    populators: {
      name: "fromTime",
      className: "fullWidth",
      validation: {
        required: true
      },
      error: "EVENTS_FROM_TIME_ERROR_REQUIRED"
    }
  }, {
    type: "time",
    label: "EVENTS_TO_TIME_LABEL",
    isMandatory: true,
    populators: {
      name: "toTime",
      className: "fullWidth",
      validation: {
        required: true
      },
      error: "EVENTS_TO_TIME_ERROR_REQUIRED"
    }
  }, {
    type: "text",
    label: "EVENTS_ADDRESS_LABEL",
    isMandatory: true,
    populators: {
      name: "address",
      className: "fullWidth",
      validation: {
        required: true
      },
      error: "EVENTS_ADDRESS_ERROR_REQUIRED"
    }
  }, {
    type: "component",
    component: "SelectEventGeolocation",
    withoutLabel: true,
    key: "geoLocation"
  }, {
    type: "text",
    label: "EVENTS_ORGANIZER_NAME_LABEL",
    populators: {
      name: "organizer",
      className: "fullWidth",
      validation: {
        pattern: /^[A-Za-z ]*$/
      },
      error: "EVENTS_ORGANIZER_ERROR"
    }
  }, {
    type: "number",
    label: "EVENTS_ENTRY_FEE_INR_LABEL",
    populators: {
      name: "fees",
      className: "fullWidth",
      error: "EVENTS_ENTRY_ERROR_REQUIRED"
    }
  }]
}];

const NewEvents = () => {
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const onSubmit = data => {
    var _data$tenantId, _data$eventCategory;
    const {
      fromDate,
      toDate,
      fromTime,
      toTime,
      address,
      organizer,
      fees,
      geoLocation = {}
    } = data;
    const details = {
      events: [{
        source: "WEBAPP",
        eventType: "EVENTSONGROUND",
        tenantId: data === null || data === void 0 ? void 0 : (_data$tenantId = data.tenantId) === null || _data$tenantId === void 0 ? void 0 : _data$tenantId.code,
        description: data === null || data === void 0 ? void 0 : data.description,
        name: data === null || data === void 0 ? void 0 : data.name,
        eventcategory: data === null || data === void 0 ? void 0 : (_data$eventCategory = data.eventCategory) === null || _data$eventCategory === void 0 ? void 0 : _data$eventCategory.code,
        eventDetails: {
          fromDate: new Date(`${fromDate} ${fromTime}`).getTime(),
          toDate: new Date(`${toDate} ${toTime}`).getTime(),
          fromTime,
          toTime,
          address,
          organizer,
          fees,
          ...geoLocation
        }
      }]
    };
    history.push("/digit-ui/employee/engagement/event/response", details);
  };
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("EMPLOYEE_EVENT_MUTATION_HAPPENED", false);
  const [errorInfo, setErrorInfo, clearError] = Digit.Hooks.useSessionStorage("EMPLOYEE_EVENT_ERROR_DATA", false);
  const [successData, setsuccessData, clearSuccessData] = Digit.Hooks.useSessionStorage("EMPLOYEE_EVENT_MUTATION_SUCCESS_DATA", false);
  useEffect(() => {
    setMutationHappened(false);
    clearSuccessData();
    clearError();
  }, []);
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Header, null, t("ES_TITLE_NEW_EVENTS")), /*#__PURE__*/React.createElement(FormComposer, {
    config: config,
    onSubmit: onSubmit,
    label: t("EVENTS_CREATE_EVENT")
  }));
};

function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }
  var number = Number(dirtyNumber);
  if (isNaN(number)) {
    return number;
  }
  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

function addMilliseconds(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var timestamp = toDate(dirtyDate).getTime();
  var amount = toInteger(dirtyAmount);
  return new Date(timestamp + amount);
}

function getTimezoneOffsetInMilliseconds(date) {
  var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
  utcDate.setUTCFullYear(date.getFullYear());
  return date.getTime() - utcDate.getTime();
}

function compareAsc(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  var diff = dateLeft.getTime() - dateRight.getTime();
  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1;
  } else {
    return diff;
  }
}

function isDate(value) {
  requiredArgs(1, arguments);
  return value instanceof Date || typeof value === 'object' && Object.prototype.toString.call(value) === '[object Date]';
}

function isValid(dirtyDate) {
  requiredArgs(1, arguments);
  if (!isDate(dirtyDate) && typeof dirtyDate !== 'number') {
    return false;
  }
  var date = toDate(dirtyDate);
  return !isNaN(Number(date));
}

function differenceInCalendarMonths(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
  var monthDiff = dateLeft.getMonth() - dateRight.getMonth();
  return yearDiff * 12 + monthDiff;
}

function differenceInMilliseconds(dateLeft, dateRight) {
  requiredArgs(2, arguments);
  return toDate(dateLeft).getTime() - toDate(dateRight).getTime();
}

var roundingMap = {
  ceil: Math.ceil,
  round: Math.round,
  floor: Math.floor,
  trunc: function (value) {
    return value < 0 ? Math.ceil(value) : Math.floor(value);
  }
};
var defaultRoundingMethod = 'trunc';
function getRoundingMethod(method) {
  return method ? roundingMap[method] : roundingMap[defaultRoundingMethod];
}

function endOfDay(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  date.setHours(23, 59, 59, 999);
  return date;
}

function endOfMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var month = date.getMonth();
  date.setFullYear(date.getFullYear(), month + 1, 0);
  date.setHours(23, 59, 59, 999);
  return date;
}

function isLastDayOfMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  return endOfDay(date).getTime() === endOfMonth(date).getTime();
}

function differenceInMonths(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  var sign = compareAsc(dateLeft, dateRight);
  var difference = Math.abs(differenceInCalendarMonths(dateLeft, dateRight));
  var result;
  if (difference < 1) {
    result = 0;
  } else {
    if (dateLeft.getMonth() === 1 && dateLeft.getDate() > 27) {
      dateLeft.setDate(30);
    }
    dateLeft.setMonth(dateLeft.getMonth() - sign * difference);
    var isLastMonthNotFull = compareAsc(dateLeft, dateRight) === -sign;
    if (isLastDayOfMonth(toDate(dirtyDateLeft)) && difference === 1 && compareAsc(dirtyDateLeft, dateRight) === 1) {
      isLastMonthNotFull = false;
    }
    result = sign * (difference - Number(isLastMonthNotFull));
  }
  return result === 0 ? 0 : result;
}

function differenceInSeconds(dateLeft, dateRight, options) {
  requiredArgs(2, arguments);
  var diff = differenceInMilliseconds(dateLeft, dateRight) / 1000;
  return getRoundingMethod(options === null || options === void 0 ? void 0 : options.roundingMethod)(diff);
}

var formatDistanceLocale = {
  lessThanXSeconds: {
    one: 'less than a second',
    other: 'less than {{count}} seconds'
  },
  xSeconds: {
    one: '1 second',
    other: '{{count}} seconds'
  },
  halfAMinute: 'half a minute',
  lessThanXMinutes: {
    one: 'less than a minute',
    other: 'less than {{count}} minutes'
  },
  xMinutes: {
    one: '1 minute',
    other: '{{count}} minutes'
  },
  aboutXHours: {
    one: 'about 1 hour',
    other: 'about {{count}} hours'
  },
  xHours: {
    one: '1 hour',
    other: '{{count}} hours'
  },
  xDays: {
    one: '1 day',
    other: '{{count}} days'
  },
  aboutXWeeks: {
    one: 'about 1 week',
    other: 'about {{count}} weeks'
  },
  xWeeks: {
    one: '1 week',
    other: '{{count}} weeks'
  },
  aboutXMonths: {
    one: 'about 1 month',
    other: 'about {{count}} months'
  },
  xMonths: {
    one: '1 month',
    other: '{{count}} months'
  },
  aboutXYears: {
    one: 'about 1 year',
    other: 'about {{count}} years'
  },
  xYears: {
    one: '1 year',
    other: '{{count}} years'
  },
  overXYears: {
    one: 'over 1 year',
    other: 'over {{count}} years'
  },
  almostXYears: {
    one: 'almost 1 year',
    other: 'almost {{count}} years'
  }
};
var formatDistance = function (token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === 'string') {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace('{{count}}', count.toString());
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return 'in ' + result;
    } else {
      return result + ' ago';
    }
  }
  return result;
};

function buildFormatLongFn(args) {
  return function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var width = options.width ? String(options.width) : args.defaultWidth;
    var format = args.formats[width] || args.formats[args.defaultWidth];
    return format;
  };
}

var dateFormats = {
  full: 'EEEE, MMMM do, y',
  long: 'MMMM do, y',
  medium: 'MMM d, y',
  short: 'MM/dd/yyyy'
};
var timeFormats = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
};
var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: 'P'
};
var formatRelative = function (token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
};

function buildLocalizeFn(args) {
  return function (dirtyIndex, dirtyOptions) {
    var options = dirtyOptions || {};
    var context = options.context ? String(options.context) : 'standalone';
    var valuesArray;
    if (context === 'formatting' && args.formattingValues) {
      var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      var width = options.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      var _defaultWidth = args.defaultWidth;
      var _width = options.width ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[_width] || args.values[_defaultWidth];
    }
    var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
    return valuesArray[index];
  };
}

var eraValues = {
  narrow: ['B', 'A'],
  abbreviated: ['BC', 'AD'],
  wide: ['Before Christ', 'Anno Domini']
};
var quarterValues = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter']
};
var monthValues = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  wide: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};
var dayValues = {
  narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
};
var dayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mi',
    noon: 'n',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mi',
    noon: 'n',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  }
};
var ordinalNumber = function (dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  var rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + 'st';
      case 2:
        return number + 'nd';
      case 3:
        return number + 'rd';
    }
  }
  return number + 'th';
};
var localize = {
  ordinalNumber: ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: 'wide'
  })
};

function buildMatchFn(args) {
  return function (string) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var width = options.width;
    var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    var matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    var matchedString = matchResult[0];
    var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function (pattern) {
      return pattern.test(matchedString);
    }) : findKey(parsePatterns, function (pattern) {
      return pattern.test(matchedString);
    });
    var value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value: value,
      rest: rest
    };
  };
}
function findKey(object, predicate) {
  for (var key in object) {
    if (object.hasOwnProperty(key) && predicate(object[key])) {
      return key;
    }
  }
  return undefined;
}
function findIndex(array, predicate) {
  for (var key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return undefined;
}

function buildMatchPatternFn(args) {
  return function (string) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    var matchedString = matchResult[0];
    var parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value: value,
      rest: rest
    };
  };
}

var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: 'any'
  })
};

var locale = {
  code: 'en-US',
  formatDistance: formatDistance,
  formatLong: formatLong,
  formatRelative: formatRelative,
  localize: localize,
  match: match,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};

function subMilliseconds(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMilliseconds(dirtyDate, -amount);
}

var MILLISECONDS_IN_DAY = 86400000;
function getUTCDayOfYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var timestamp = date.getTime();
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
  var startOfYearTimestamp = date.getTime();
  var difference = timestamp - startOfYearTimestamp;
  return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;
}

function startOfUTCISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var weekStartsOn = 1;
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

function getUTCISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getUTCFullYear();
  var fourthOfJanuaryOfNextYear = new Date(0);
  fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = startOfUTCISOWeek(fourthOfJanuaryOfNextYear);
  var fourthOfJanuaryOfThisYear = new Date(0);
  fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = startOfUTCISOWeek(fourthOfJanuaryOfThisYear);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

function startOfUTCISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var year = getUTCISOWeekYear(dirtyDate);
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setUTCFullYear(year, 0, 4);
  fourthOfJanuary.setUTCHours(0, 0, 0, 0);
  var date = startOfUTCISOWeek(fourthOfJanuary);
  return date;
}

var MILLISECONDS_IN_WEEK = 604800000;
function getUTCISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfUTCISOWeek(date).getTime() - startOfUTCISOWeekYear(date).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}

function startOfUTCWeek(dirtyDate, dirtyOptions) {
  requiredArgs(1, arguments);
  var options = dirtyOptions || {};
  var locale = options.locale;
  var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn);
  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : toInteger(options.weekStartsOn);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

function getUTCWeekYear(dirtyDate, dirtyOptions) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getUTCFullYear();
  var options = dirtyOptions || {};
  var locale = options.locale;
  var localeFirstWeekContainsDate = locale && locale.options && locale.options.firstWeekContainsDate;
  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : toInteger(localeFirstWeekContainsDate);
  var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : toInteger(options.firstWeekContainsDate);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
  }
  var firstWeekOfNextYear = new Date(0);
  firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = startOfUTCWeek(firstWeekOfNextYear, dirtyOptions);
  var firstWeekOfThisYear = new Date(0);
  firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = startOfUTCWeek(firstWeekOfThisYear, dirtyOptions);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

function startOfUTCWeekYear(dirtyDate, dirtyOptions) {
  requiredArgs(1, arguments);
  var options = dirtyOptions || {};
  var locale = options.locale;
  var localeFirstWeekContainsDate = locale && locale.options && locale.options.firstWeekContainsDate;
  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : toInteger(localeFirstWeekContainsDate);
  var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : toInteger(options.firstWeekContainsDate);
  var year = getUTCWeekYear(dirtyDate, dirtyOptions);
  var firstWeek = new Date(0);
  firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setUTCHours(0, 0, 0, 0);
  var date = startOfUTCWeek(firstWeek, dirtyOptions);
  return date;
}

var MILLISECONDS_IN_WEEK$1 = 604800000;
function getUTCWeek(dirtyDate, options) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfUTCWeek(date, options).getTime() - startOfUTCWeekYear(date, options).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK$1) + 1;
}

function addLeadingZeros(number, targetLength) {
  var sign = number < 0 ? '-' : '';
  var output = Math.abs(number).toString();
  while (output.length < targetLength) {
    output = '0' + output;
  }
  return sign + output;
}

var formatters = {
  y: function (date, token) {
    var signedYear = date.getUTCFullYear();
    var year = signedYear > 0 ? signedYear : 1 - signedYear;
    return addLeadingZeros(token === 'yy' ? year % 100 : year, token.length);
  },
  M: function (date, token) {
    var month = date.getUTCMonth();
    return token === 'M' ? String(month + 1) : addLeadingZeros(month + 1, 2);
  },
  d: function (date, token) {
    return addLeadingZeros(date.getUTCDate(), token.length);
  },
  a: function (date, token) {
    var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? 'pm' : 'am';
    switch (token) {
      case 'a':
      case 'aa':
        return dayPeriodEnumValue.toUpperCase();
      case 'aaa':
        return dayPeriodEnumValue;
      case 'aaaaa':
        return dayPeriodEnumValue[0];
      case 'aaaa':
      default:
        return dayPeriodEnumValue === 'am' ? 'a.m.' : 'p.m.';
    }
  },
  h: function (date, token) {
    return addLeadingZeros(date.getUTCHours() % 12 || 12, token.length);
  },
  H: function (date, token) {
    return addLeadingZeros(date.getUTCHours(), token.length);
  },
  m: function (date, token) {
    return addLeadingZeros(date.getUTCMinutes(), token.length);
  },
  s: function (date, token) {
    return addLeadingZeros(date.getUTCSeconds(), token.length);
  },
  S: function (date, token) {
    var numberOfDigits = token.length;
    var milliseconds = date.getUTCMilliseconds();
    var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
    return addLeadingZeros(fractionalSeconds, token.length);
  }
};

var dayPeriodEnum = {
  am: 'am',
  pm: 'pm',
  midnight: 'midnight',
  noon: 'noon',
  morning: 'morning',
  afternoon: 'afternoon',
  evening: 'evening',
  night: 'night'
};
var formatters$1 = {
  G: function (date, token, localize) {
    var era = date.getUTCFullYear() > 0 ? 1 : 0;
    switch (token) {
      case 'G':
      case 'GG':
      case 'GGG':
        return localize.era(era, {
          width: 'abbreviated'
        });
      case 'GGGGG':
        return localize.era(era, {
          width: 'narrow'
        });
      case 'GGGG':
      default:
        return localize.era(era, {
          width: 'wide'
        });
    }
  },
  y: function (date, token, localize) {
    if (token === 'yo') {
      var signedYear = date.getUTCFullYear();
      var year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize.ordinalNumber(year, {
        unit: 'year'
      });
    }
    return formatters.y(date, token);
  },
  Y: function (date, token, localize, options) {
    var signedWeekYear = getUTCWeekYear(date, options);
    var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
    if (token === 'YY') {
      var twoDigitYear = weekYear % 100;
      return addLeadingZeros(twoDigitYear, 2);
    }
    if (token === 'Yo') {
      return localize.ordinalNumber(weekYear, {
        unit: 'year'
      });
    }
    return addLeadingZeros(weekYear, token.length);
  },
  R: function (date, token) {
    var isoWeekYear = getUTCISOWeekYear(date);
    return addLeadingZeros(isoWeekYear, token.length);
  },
  u: function (date, token) {
    var year = date.getUTCFullYear();
    return addLeadingZeros(year, token.length);
  },
  Q: function (date, token, localize) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
    switch (token) {
      case 'Q':
        return String(quarter);
      case 'QQ':
        return addLeadingZeros(quarter, 2);
      case 'Qo':
        return localize.ordinalNumber(quarter, {
          unit: 'quarter'
        });
      case 'QQQ':
        return localize.quarter(quarter, {
          width: 'abbreviated',
          context: 'formatting'
        });
      case 'QQQQQ':
        return localize.quarter(quarter, {
          width: 'narrow',
          context: 'formatting'
        });
      case 'QQQQ':
      default:
        return localize.quarter(quarter, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  q: function (date, token, localize) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
    switch (token) {
      case 'q':
        return String(quarter);
      case 'qq':
        return addLeadingZeros(quarter, 2);
      case 'qo':
        return localize.ordinalNumber(quarter, {
          unit: 'quarter'
        });
      case 'qqq':
        return localize.quarter(quarter, {
          width: 'abbreviated',
          context: 'standalone'
        });
      case 'qqqqq':
        return localize.quarter(quarter, {
          width: 'narrow',
          context: 'standalone'
        });
      case 'qqqq':
      default:
        return localize.quarter(quarter, {
          width: 'wide',
          context: 'standalone'
        });
    }
  },
  M: function (date, token, localize) {
    var month = date.getUTCMonth();
    switch (token) {
      case 'M':
      case 'MM':
        return formatters.M(date, token);
      case 'Mo':
        return localize.ordinalNumber(month + 1, {
          unit: 'month'
        });
      case 'MMM':
        return localize.month(month, {
          width: 'abbreviated',
          context: 'formatting'
        });
      case 'MMMMM':
        return localize.month(month, {
          width: 'narrow',
          context: 'formatting'
        });
      case 'MMMM':
      default:
        return localize.month(month, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  L: function (date, token, localize) {
    var month = date.getUTCMonth();
    switch (token) {
      case 'L':
        return String(month + 1);
      case 'LL':
        return addLeadingZeros(month + 1, 2);
      case 'Lo':
        return localize.ordinalNumber(month + 1, {
          unit: 'month'
        });
      case 'LLL':
        return localize.month(month, {
          width: 'abbreviated',
          context: 'standalone'
        });
      case 'LLLLL':
        return localize.month(month, {
          width: 'narrow',
          context: 'standalone'
        });
      case 'LLLL':
      default:
        return localize.month(month, {
          width: 'wide',
          context: 'standalone'
        });
    }
  },
  w: function (date, token, localize, options) {
    var week = getUTCWeek(date, options);
    if (token === 'wo') {
      return localize.ordinalNumber(week, {
        unit: 'week'
      });
    }
    return addLeadingZeros(week, token.length);
  },
  I: function (date, token, localize) {
    var isoWeek = getUTCISOWeek(date);
    if (token === 'Io') {
      return localize.ordinalNumber(isoWeek, {
        unit: 'week'
      });
    }
    return addLeadingZeros(isoWeek, token.length);
  },
  d: function (date, token, localize) {
    if (token === 'do') {
      return localize.ordinalNumber(date.getUTCDate(), {
        unit: 'date'
      });
    }
    return formatters.d(date, token);
  },
  D: function (date, token, localize) {
    var dayOfYear = getUTCDayOfYear(date);
    if (token === 'Do') {
      return localize.ordinalNumber(dayOfYear, {
        unit: 'dayOfYear'
      });
    }
    return addLeadingZeros(dayOfYear, token.length);
  },
  E: function (date, token, localize) {
    var dayOfWeek = date.getUTCDay();
    switch (token) {
      case 'E':
      case 'EE':
      case 'EEE':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'formatting'
        });
      case 'EEEEE':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'formatting'
        });
      case 'EEEEEE':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'formatting'
        });
      case 'EEEE':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  e: function (date, token, localize, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case 'e':
        return String(localDayOfWeek);
      case 'ee':
        return addLeadingZeros(localDayOfWeek, 2);
      case 'eo':
        return localize.ordinalNumber(localDayOfWeek, {
          unit: 'day'
        });
      case 'eee':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'formatting'
        });
      case 'eeeee':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'formatting'
        });
      case 'eeeeee':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'formatting'
        });
      case 'eeee':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  c: function (date, token, localize, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case 'c':
        return String(localDayOfWeek);
      case 'cc':
        return addLeadingZeros(localDayOfWeek, token.length);
      case 'co':
        return localize.ordinalNumber(localDayOfWeek, {
          unit: 'day'
        });
      case 'ccc':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'standalone'
        });
      case 'ccccc':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'standalone'
        });
      case 'cccccc':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'standalone'
        });
      case 'cccc':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'standalone'
        });
    }
  },
  i: function (date, token, localize) {
    var dayOfWeek = date.getUTCDay();
    var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      case 'i':
        return String(isoDayOfWeek);
      case 'ii':
        return addLeadingZeros(isoDayOfWeek, token.length);
      case 'io':
        return localize.ordinalNumber(isoDayOfWeek, {
          unit: 'day'
        });
      case 'iii':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'formatting'
        });
      case 'iiiii':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'formatting'
        });
      case 'iiiiii':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'formatting'
        });
      case 'iiii':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  a: function (date, token, localize) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';
    switch (token) {
      case 'a':
      case 'aa':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        });
      case 'aaa':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        }).toLowerCase();
      case 'aaaaa':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'narrow',
          context: 'formatting'
        });
      case 'aaaa':
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  b: function (date, token, localize) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';
    }
    switch (token) {
      case 'b':
      case 'bb':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        });
      case 'bbb':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        }).toLowerCase();
      case 'bbbbb':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'narrow',
          context: 'formatting'
        });
      case 'bbbb':
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  B: function (date, token, localize) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }
    switch (token) {
      case 'B':
      case 'BB':
      case 'BBB':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        });
      case 'BBBBB':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'narrow',
          context: 'formatting'
        });
      case 'BBBB':
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  h: function (date, token, localize) {
    if (token === 'ho') {
      var hours = date.getUTCHours() % 12;
      if (hours === 0) hours = 12;
      return localize.ordinalNumber(hours, {
        unit: 'hour'
      });
    }
    return formatters.h(date, token);
  },
  H: function (date, token, localize) {
    if (token === 'Ho') {
      return localize.ordinalNumber(date.getUTCHours(), {
        unit: 'hour'
      });
    }
    return formatters.H(date, token);
  },
  K: function (date, token, localize) {
    var hours = date.getUTCHours() % 12;
    if (token === 'Ko') {
      return localize.ordinalNumber(hours, {
        unit: 'hour'
      });
    }
    return addLeadingZeros(hours, token.length);
  },
  k: function (date, token, localize) {
    var hours = date.getUTCHours();
    if (hours === 0) hours = 24;
    if (token === 'ko') {
      return localize.ordinalNumber(hours, {
        unit: 'hour'
      });
    }
    return addLeadingZeros(hours, token.length);
  },
  m: function (date, token, localize) {
    if (token === 'mo') {
      return localize.ordinalNumber(date.getUTCMinutes(), {
        unit: 'minute'
      });
    }
    return formatters.m(date, token);
  },
  s: function (date, token, localize) {
    if (token === 'so') {
      return localize.ordinalNumber(date.getUTCSeconds(), {
        unit: 'second'
      });
    }
    return formatters.s(date, token);
  },
  S: function (date, token) {
    return formatters.S(date, token);
  },
  X: function (date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    if (timezoneOffset === 0) {
      return 'Z';
    }
    switch (token) {
      case 'X':
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      case 'XXXX':
      case 'XX':
        return formatTimezone(timezoneOffset);
      case 'XXXXX':
      case 'XXX':
      default:
        return formatTimezone(timezoneOffset, ':');
    }
  },
  x: function (date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      case 'x':
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      case 'xxxx':
      case 'xx':
        return formatTimezone(timezoneOffset);
      case 'xxxxx':
      case 'xxx':
      default:
        return formatTimezone(timezoneOffset, ':');
    }
  },
  O: function (date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      case 'O':
      case 'OO':
      case 'OOO':
        return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
      case 'OOOO':
      default:
        return 'GMT' + formatTimezone(timezoneOffset, ':');
    }
  },
  z: function (date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      case 'z':
      case 'zz':
      case 'zzz':
        return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
      case 'zzzz':
      default:
        return 'GMT' + formatTimezone(timezoneOffset, ':');
    }
  },
  t: function (date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = Math.floor(originalDate.getTime() / 1000);
    return addLeadingZeros(timestamp, token.length);
  },
  T: function (date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = originalDate.getTime();
    return addLeadingZeros(timestamp, token.length);
  }
};
function formatTimezoneShort(offset, dirtyDelimiter) {
  var sign = offset > 0 ? '-' : '+';
  var absOffset = Math.abs(offset);
  var hours = Math.floor(absOffset / 60);
  var minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  var delimiter = dirtyDelimiter || '';
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
  if (offset % 60 === 0) {
    var sign = offset > 0 ? '-' : '+';
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, dirtyDelimiter);
}
function formatTimezone(offset, dirtyDelimiter) {
  var delimiter = dirtyDelimiter || '';
  var sign = offset > 0 ? '-' : '+';
  var absOffset = Math.abs(offset);
  var hours = addLeadingZeros(Math.floor(absOffset / 60), 2);
  var minutes = addLeadingZeros(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}

function dateLongFormatter(pattern, formatLong) {
  switch (pattern) {
    case 'P':
      return formatLong.date({
        width: 'short'
      });
    case 'PP':
      return formatLong.date({
        width: 'medium'
      });
    case 'PPP':
      return formatLong.date({
        width: 'long'
      });
    case 'PPPP':
    default:
      return formatLong.date({
        width: 'full'
      });
  }
}
function timeLongFormatter(pattern, formatLong) {
  switch (pattern) {
    case 'p':
      return formatLong.time({
        width: 'short'
      });
    case 'pp':
      return formatLong.time({
        width: 'medium'
      });
    case 'ppp':
      return formatLong.time({
        width: 'long'
      });
    case 'pppp':
    default:
      return formatLong.time({
        width: 'full'
      });
  }
}
function dateTimeLongFormatter(pattern, formatLong) {
  var matchResult = pattern.match(/(P+)(p+)?/) || [];
  var datePattern = matchResult[1];
  var timePattern = matchResult[2];
  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong);
  }
  var dateTimeFormat;
  switch (datePattern) {
    case 'P':
      dateTimeFormat = formatLong.dateTime({
        width: 'short'
      });
      break;
    case 'PP':
      dateTimeFormat = formatLong.dateTime({
        width: 'medium'
      });
      break;
    case 'PPP':
      dateTimeFormat = formatLong.dateTime({
        width: 'long'
      });
      break;
    case 'PPPP':
    default:
      dateTimeFormat = formatLong.dateTime({
        width: 'full'
      });
      break;
  }
  return dateTimeFormat.replace('{{date}}', dateLongFormatter(datePattern, formatLong)).replace('{{time}}', timeLongFormatter(timePattern, formatLong));
}
var longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};

var protectedDayOfYearTokens = ['D', 'DD'];
var protectedWeekYearTokens = ['YY', 'YYYY'];
function isProtectedDayOfYearToken(token) {
  return protectedDayOfYearTokens.indexOf(token) !== -1;
}
function isProtectedWeekYearToken(token) {
  return protectedWeekYearTokens.indexOf(token) !== -1;
}
function throwProtectedError(token, format, input) {
  if (token === 'YYYY') {
    throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://git.io/fxCyr"));
  } else if (token === 'YY') {
    throw new RangeError("Use `yy` instead of `YY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://git.io/fxCyr"));
  } else if (token === 'D') {
    throw new RangeError("Use `d` instead of `D` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://git.io/fxCyr"));
  } else if (token === 'DD') {
    throw new RangeError("Use `dd` instead of `DD` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://git.io/fxCyr"));
  }
}

var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
function format(dirtyDate, dirtyFormatStr, dirtyOptions) {
  requiredArgs(2, arguments);
  var formatStr = String(dirtyFormatStr);
  var options = dirtyOptions || {};
  var locale$1 = options.locale || locale;
  var localeFirstWeekContainsDate = locale$1.options && locale$1.options.firstWeekContainsDate;
  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : toInteger(localeFirstWeekContainsDate);
  var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : toInteger(options.firstWeekContainsDate);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
  }
  var localeWeekStartsOn = locale$1.options && locale$1.options.weekStartsOn;
  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn);
  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : toInteger(options.weekStartsOn);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }
  if (!locale$1.localize) {
    throw new RangeError('locale must contain localize property');
  }
  if (!locale$1.formatLong) {
    throw new RangeError('locale must contain formatLong property');
  }
  var originalDate = toDate(dirtyDate);
  if (!isValid(originalDate)) {
    throw new RangeError('Invalid time value');
  }
  var timezoneOffset = getTimezoneOffsetInMilliseconds(originalDate);
  var utcDate = subMilliseconds(originalDate, timezoneOffset);
  var formatterOptions = {
    firstWeekContainsDate: firstWeekContainsDate,
    weekStartsOn: weekStartsOn,
    locale: locale$1,
    _originalDate: originalDate
  };
  var result = formatStr.match(longFormattingTokensRegExp).map(function (substring) {
    var firstCharacter = substring[0];
    if (firstCharacter === 'p' || firstCharacter === 'P') {
      var longFormatter = longFormatters[firstCharacter];
      return longFormatter(substring, locale$1.formatLong, formatterOptions);
    }
    return substring;
  }).join('').match(formattingTokensRegExp).map(function (substring) {
    if (substring === "''") {
      return "'";
    }
    var firstCharacter = substring[0];
    if (firstCharacter === "'") {
      return cleanEscapedString(substring);
    }
    var formatter = formatters$1[firstCharacter];
    if (formatter) {
      if (!options.useAdditionalWeekYearTokens && isProtectedWeekYearToken(substring)) {
        throwProtectedError(substring, dirtyFormatStr, dirtyDate);
      }
      if (!options.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(substring)) {
        throwProtectedError(substring, dirtyFormatStr, dirtyDate);
      }
      return formatter(utcDate, substring, locale$1.localize, formatterOptions);
    }
    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
      throw new RangeError('Format string contains an unescaped latin alphabet character `' + firstCharacter + '`');
    }
    return substring;
  }).join('');
  return result;
}
function cleanEscapedString(input) {
  return input.match(escapedStringRegExp)[1].replace(doubleQuoteRegExp, "'");
}

function assign(target, dirtyObject) {
  if (target == null) {
    throw new TypeError('assign requires that input parameter not be null or undefined');
  }
  dirtyObject = dirtyObject || {};
  for (var property in dirtyObject) {
    if (Object.prototype.hasOwnProperty.call(dirtyObject, property)) {
      target[property] = dirtyObject[property];
    }
  }
  return target;
}

function cloneObject(dirtyObject) {
  return assign({}, dirtyObject);
}

var MINUTES_IN_DAY = 1440;
var MINUTES_IN_ALMOST_TWO_DAYS = 2520;
var MINUTES_IN_MONTH = 43200;
var MINUTES_IN_TWO_MONTHS = 86400;
function formatDistance$1(dirtyDate, dirtyBaseDate) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  requiredArgs(2, arguments);
  var locale$1 = options.locale || locale;
  if (!locale$1.formatDistance) {
    throw new RangeError('locale must contain formatDistance property');
  }
  var comparison = compareAsc(dirtyDate, dirtyBaseDate);
  if (isNaN(comparison)) {
    throw new RangeError('Invalid time value');
  }
  var localizeOptions = cloneObject(options);
  localizeOptions.addSuffix = Boolean(options.addSuffix);
  localizeOptions.comparison = comparison;
  var dateLeft;
  var dateRight;
  if (comparison > 0) {
    dateLeft = toDate(dirtyBaseDate);
    dateRight = toDate(dirtyDate);
  } else {
    dateLeft = toDate(dirtyDate);
    dateRight = toDate(dirtyBaseDate);
  }
  var seconds = differenceInSeconds(dateRight, dateLeft);
  var offsetInSeconds = (getTimezoneOffsetInMilliseconds(dateRight) - getTimezoneOffsetInMilliseconds(dateLeft)) / 1000;
  var minutes = Math.round((seconds - offsetInSeconds) / 60);
  var months;
  if (minutes < 2) {
    if (options.includeSeconds) {
      if (seconds < 5) {
        return locale$1.formatDistance('lessThanXSeconds', 5, localizeOptions);
      } else if (seconds < 10) {
        return locale$1.formatDistance('lessThanXSeconds', 10, localizeOptions);
      } else if (seconds < 20) {
        return locale$1.formatDistance('lessThanXSeconds', 20, localizeOptions);
      } else if (seconds < 40) {
        return locale$1.formatDistance('halfAMinute', null, localizeOptions);
      } else if (seconds < 60) {
        return locale$1.formatDistance('lessThanXMinutes', 1, localizeOptions);
      } else {
        return locale$1.formatDistance('xMinutes', 1, localizeOptions);
      }
    } else {
      if (minutes === 0) {
        return locale$1.formatDistance('lessThanXMinutes', 1, localizeOptions);
      } else {
        return locale$1.formatDistance('xMinutes', minutes, localizeOptions);
      }
    }
  } else if (minutes < 45) {
    return locale$1.formatDistance('xMinutes', minutes, localizeOptions);
  } else if (minutes < 90) {
    return locale$1.formatDistance('aboutXHours', 1, localizeOptions);
  } else if (minutes < MINUTES_IN_DAY) {
    var hours = Math.round(minutes / 60);
    return locale$1.formatDistance('aboutXHours', hours, localizeOptions);
  } else if (minutes < MINUTES_IN_ALMOST_TWO_DAYS) {
    return locale$1.formatDistance('xDays', 1, localizeOptions);
  } else if (minutes < MINUTES_IN_MONTH) {
    var days = Math.round(minutes / MINUTES_IN_DAY);
    return locale$1.formatDistance('xDays', days, localizeOptions);
  } else if (minutes < MINUTES_IN_TWO_MONTHS) {
    months = Math.round(minutes / MINUTES_IN_MONTH);
    return locale$1.formatDistance('aboutXMonths', months, localizeOptions);
  }
  months = differenceInMonths(dateRight, dateLeft);
  if (months < 12) {
    var nearestMonth = Math.round(minutes / MINUTES_IN_MONTH);
    return locale$1.formatDistance('xMonths', nearestMonth, localizeOptions);
  } else {
    var monthsSinceStartOfYear = months % 12;
    var years = Math.floor(months / 12);
    if (monthsSinceStartOfYear < 3) {
      return locale$1.formatDistance('aboutXYears', years, localizeOptions);
    } else if (monthsSinceStartOfYear < 9) {
      return locale$1.formatDistance('overXYears', years, localizeOptions);
    } else {
      return locale$1.formatDistance('almostXYears', years + 1, localizeOptions);
    }
  }
}

function formatDistanceToNow(dirtyDate, dirtyOptions) {
  requiredArgs(1, arguments);
  return formatDistance$1(dirtyDate, Date.now(), dirtyOptions);
}

const EditEvents = () => {
  var _data$eventDetails, _data$eventDetails2, _data$eventDetails3, _data$eventDetails4, _data$eventDetails5, _data$eventDetails6, _data$eventDetails7, _data$eventDetails8, _data$eventDetails9;
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const {
    id: EventId
  } = useParams();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const {
    isLoading,
    data
  } = Digit.Hooks.events.useInbox(tenantId, {}, {
    eventTypes: "EVENTSONGROUND",
    ids: EventId
  }, {
    select: data => {
      var _data$events;
      return data === null || data === void 0 ? void 0 : (_data$events = data.events) === null || _data$events === void 0 ? void 0 : _data$events[0];
    }
  });
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("EMPLOYEE_EVENT_MUTATION_HAPPENED", false);
  const [errorInfo, setErrorInfo, clearError] = Digit.Hooks.useSessionStorage("EMPLOYEE_EVENT_ERROR_DATA", false);
  const [successData, setsuccessData, clearSuccessData] = Digit.Hooks.useSessionStorage("EMPLOYEE_EVENT_MUTATION_SUCCESS_DATA", false);
  useEffect(() => {
    setMutationHappened(false);
    clearSuccessData();
    clearError();
  }, []);
  const onSubmit = formData => {
    var _formData$tenantId, _formData$eventCatego;
    const {
      fromDate,
      toDate,
      fromTime,
      toTime,
      address,
      organizer,
      fees,
      geoLocation
    } = formData;
    const details = {
      events: [{
        ...data,
        source: "WEBAPP",
        status: "ACTIVE",
        eventType: "EVENTSONGROUND",
        tenantId: formData === null || formData === void 0 ? void 0 : (_formData$tenantId = formData.tenantId) === null || _formData$tenantId === void 0 ? void 0 : _formData$tenantId.code,
        description: formData === null || formData === void 0 ? void 0 : formData.description,
        name: formData === null || formData === void 0 ? void 0 : formData.name,
        eventcategory: formData === null || formData === void 0 ? void 0 : (_formData$eventCatego = formData.eventCategory) === null || _formData$eventCatego === void 0 ? void 0 : _formData$eventCatego.code,
        eventDetails: {
          ...(data === null || data === void 0 ? void 0 : data.eventDetails),
          fromDate: new Date(`${fromDate} ${fromTime}`).getTime(),
          toDate: new Date(`${toDate} ${toTime}`).getTime(),
          fromTime,
          toTime,
          address,
          organizer,
          fees,
          latitude: geoLocation === null || geoLocation === void 0 ? void 0 : geoLocation.latitude,
          longitude: geoLocation === null || geoLocation === void 0 ? void 0 : geoLocation.longitude
        }
      }]
    };
    history.push("/digit-ui/employee/engagement/event/response?update=true", details);
  };
  if (isLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  const defaultValues = {
    defaultTenantId: data === null || data === void 0 ? void 0 : data.tenantId,
    name: data === null || data === void 0 ? void 0 : data.name,
    fromDate: format(new Date(data === null || data === void 0 ? void 0 : (_data$eventDetails = data.eventDetails) === null || _data$eventDetails === void 0 ? void 0 : _data$eventDetails.fromDate), 'yyyy-MM-dd'),
    toDate: format(new Date(data === null || data === void 0 ? void 0 : (_data$eventDetails2 = data.eventDetails) === null || _data$eventDetails2 === void 0 ? void 0 : _data$eventDetails2.toDate), 'yyyy-MM-dd'),
    organizer: data === null || data === void 0 ? void 0 : (_data$eventDetails3 = data.eventDetails) === null || _data$eventDetails3 === void 0 ? void 0 : _data$eventDetails3.organizer,
    fees: data === null || data === void 0 ? void 0 : (_data$eventDetails4 = data.eventDetails) === null || _data$eventDetails4 === void 0 ? void 0 : _data$eventDetails4.fees,
    description: data === null || data === void 0 ? void 0 : data.description,
    address: data === null || data === void 0 ? void 0 : (_data$eventDetails5 = data.eventDetails) === null || _data$eventDetails5 === void 0 ? void 0 : _data$eventDetails5.address,
    category: data === null || data === void 0 ? void 0 : data.eventCategory,
    fromTime: format(new Date(data === null || data === void 0 ? void 0 : (_data$eventDetails6 = data.eventDetails) === null || _data$eventDetails6 === void 0 ? void 0 : _data$eventDetails6.fromDate), 'HH:mm'),
    toTime: format(new Date(data === null || data === void 0 ? void 0 : (_data$eventDetails7 = data.eventDetails) === null || _data$eventDetails7 === void 0 ? void 0 : _data$eventDetails7.toDate), 'HH:mm'),
    geoLocation: {
      latitude: data === null || data === void 0 ? void 0 : (_data$eventDetails8 = data.eventDetails) === null || _data$eventDetails8 === void 0 ? void 0 : _data$eventDetails8.latitude,
      longitude: data === null || data === void 0 ? void 0 : (_data$eventDetails9 = data.eventDetails) === null || _data$eventDetails9 === void 0 ? void 0 : _data$eventDetails9.longitude
    }
  };
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Header, null, t("ES_TITLE_EDIT_EVENTS")), /*#__PURE__*/React.createElement(FormComposer, {
    defaultValues: defaultValues,
    config: config,
    onSubmit: onSubmit,
    label: t("EVENTS_SAVE_CHANGES")
  }));
};

const BannerPicker = props => {
  var _props$data, _props$data$events, _props$data$events$;
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement(Banner, {
    message: t(props.message),
    applicationNumber: props === null || props === void 0 ? void 0 : (_props$data = props.data) === null || _props$data === void 0 ? void 0 : (_props$data$events = _props$data.events) === null || _props$data$events === void 0 ? void 0 : (_props$data$events$ = _props$data$events[0]) === null || _props$data$events$ === void 0 ? void 0 : _props$data$events$.name,
    info: t(`ENGAGEMENT_EVENT_NAME`),
    successful: props.isSuccess
  });
};
const Response = props => {
  var _mutation$data, _mutation$data$events, _successData$events, _event$eventDetails, _event$eventDetails2, _event$eventDetails3, _event$eventDetails4;
  const queryClient = useQueryClient();
  const {
    t
  } = useTranslation();
  const searchParams = Digit.Hooks.useQueryParams();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const mutation = Digit.Hooks.events.useCreateEvent();
  const updateEventMutation = Digit.Hooks.events.useUpdateEvent();
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    state
  } = props.location;
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("EMPLOYEE_EVENT_MUTATION_HAPPENED", false);
  const [successData, setsuccessData, clearSuccessData] = Digit.Hooks.useSessionStorage("EMPLOYEE_EVENT_MUTATION_SUCCESS_DATA", false);
  const [errorInfo, setErrorInfo, clearError] = Digit.Hooks.useSessionStorage("EMPLOYEE_EVENT_ERROR_DATA", false);
  const onError = (error, variables) => {
    var _error$response, _error$response$data, _error$response$data$;
    setErrorInfo((error === null || error === void 0 ? void 0 : (_error$response = error.response) === null || _error$response === void 0 ? void 0 : (_error$response$data = _error$response.data) === null || _error$response$data === void 0 ? void 0 : (_error$response$data$ = _error$response$data.Errors[0]) === null || _error$response$data$ === void 0 ? void 0 : _error$response$data$.code) || 'ERROR');
    setMutationHappened(true);
  };
  useEffect(() => {
    if (mutation.data) setsuccessData(mutation.data);
  }, [mutation.data]);
  useEffect(() => {
    if (updateEventMutation.data) setsuccessData(updateEventMutation.data);
  }, [updateEventMutation.data]);
  useEffect(() => {
    const onSuccess = () => {
      setMutationHappened(true);
      queryClient.clear();
    };
    if (!mutationHappened) {
      if (Boolean(searchParams === null || searchParams === void 0 ? void 0 : searchParams.delete) || Boolean(searchParams === null || searchParams === void 0 ? void 0 : searchParams.update)) {
        updateEventMutation.mutate(state, {
          onError,
          onSuccess
        });
        return;
      }
      mutation.mutate(state, {
        onError,
        onSuccess
      });
      return;
    }
    return () => {
      queryClient.clear();
    };
  }, []);
  if (searchParams !== null && searchParams !== void 0 && searchParams.delete || searchParams !== null && searchParams !== void 0 && searchParams.update) {
    if (updateEventMutation.isLoading || updateEventMutation.isIdle && !mutationHappened) {
      return /*#__PURE__*/React.createElement(Loader, null);
    }
    return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(BannerPicker, {
      t: t,
      message: searchParams !== null && searchParams !== void 0 && searchParams.update ? updateEventMutation.isSuccess || successData ? 'ENGAGEMENT_EVENT_UPDATED' : `ENGAGEMENT_EVENT_UPDATED_FAILED` : updateEventMutation.isSuccess || successData ? 'ENGAGEMENT_EVENT_DELETED' : 'ENGAGEMENT_EVENT_DELETED_FAILED',
      data: updateEventMutation.data || successData,
      isSuccess: (updateEventMutation === null || updateEventMutation === void 0 ? void 0 : updateEventMutation.isSuccess) || successData,
      isLoading: updateEventMutation.isIdle && !mutationHappened || updateEventMutation.isLoading
    }), /*#__PURE__*/React.createElement(CardText, null, searchParams !== null && searchParams !== void 0 && searchParams.update ? updateEventMutation.isSuccess || successData ? t('ENGAGEMENT_EVENT_UPDATED') : t(`ENGAGEMENT_EVENT_UPDATED_FAILED`) : updateEventMutation.isSuccess || successData ? t('ENGAGEMENT_EVENT_DELETED') : t('ENGAGEMENT_EVENT_DELETED_FAILED')), /*#__PURE__*/React.createElement(ActionBar, null, /*#__PURE__*/React.createElement(Link, {
      to: "/digit-ui/employee"
    }, /*#__PURE__*/React.createElement(SubmitBar, {
      label: t("CORE_COMMON_GO_TO_HOME")
    }))));
  }
  if (mutation.isLoading || mutation.isIdle && !mutationHappened) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  const event = (mutation === null || mutation === void 0 ? void 0 : (_mutation$data = mutation.data) === null || _mutation$data === void 0 ? void 0 : (_mutation$data$events = _mutation$data.events) === null || _mutation$data$events === void 0 ? void 0 : _mutation$data$events[0]) || (successData === null || successData === void 0 ? void 0 : (_successData$events = successData.events) === null || _successData$events === void 0 ? void 0 : _successData$events[0]) || {};
  return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(BannerPicker, {
    t: t,
    message: mutation.isSuccess || successData ? `ENGAGEMENT_EVENT_CREATED_MESSAGE` : `ENGAGEMENT_EVENT_FAILED_MESSAGES`,
    data: mutation.data || successData,
    isSuccess: mutation.isSuccess || successData,
    isLoading: mutation.isIdle && !mutationHappened || mutation.isLoading
  }), /*#__PURE__*/React.createElement(CardText, null, mutation.isSuccess || successData ? t(`ENGAGEMENT_EVENT_CREATED_MESSAGES`, {
    eventName: event === null || event === void 0 ? void 0 : event.name,
    fromDate: Digit.DateUtils.ConvertTimestampToDate(event === null || event === void 0 ? void 0 : (_event$eventDetails = event.eventDetails) === null || _event$eventDetails === void 0 ? void 0 : _event$eventDetails.fromDate),
    toDate: Digit.DateUtils.ConvertTimestampToDate(event === null || event === void 0 ? void 0 : (_event$eventDetails2 = event.eventDetails) === null || _event$eventDetails2 === void 0 ? void 0 : _event$eventDetails2.toDate),
    fromTime: mutation.isSuccess ? format(new Date(event === null || event === void 0 ? void 0 : (_event$eventDetails3 = event.eventDetails) === null || _event$eventDetails3 === void 0 ? void 0 : _event$eventDetails3.fromDate), 'HH:mm') : null,
    toTime: mutation.isSuccess ? format(new Date(event === null || event === void 0 ? void 0 : (_event$eventDetails4 = event.eventDetails) === null || _event$eventDetails4 === void 0 ? void 0 : _event$eventDetails4.toDate), 'HH:mm') : null
  }) : null), /*#__PURE__*/React.createElement(ActionBar, null, /*#__PURE__*/React.createElement(Link, {
    to: "/digit-ui/employee"
  }, /*#__PURE__*/React.createElement(SubmitBar, {
    label: t("CORE_COMMON_GO_TO_HOME")
  }))));
};

const ApplicationTable = ({
  t,
  data,
  columns,
  globalSearch,
  onSearch,
  getCellProps,
  pageSizeLimit,
  totalRecords,
  currentPage,
  onNextPage,
  onPrevPage,
  onPageSizeChange
}) => {
  return /*#__PURE__*/React.createElement(Table, {
    t: t,
    data: data,
    columns: columns,
    onSearch: onSearch,
    globalSearch: globalSearch,
    manualGlobalFilter: true,
    manualPagination: true,
    pageSizeLimit: pageSizeLimit,
    getCellProps: getCellProps,
    totalRecords: totalRecords,
    currentPage: currentPage,
    onNextPage: onNextPage,
    onPrevPage: onPrevPage,
    onPageSizeChange: onPageSizeChange
  });
};

const DropdownUlb = ({
  ulb,
  onAssignmentChange,
  value,
  t
}) => {
  return /*#__PURE__*/React.createElement(Dropdown, {
    option: ulb,
    optionKey: "code",
    selected: value,
    select: onAssignmentChange,
    t: t
  });
};

const Search = ({
  onSearch,
  searchParams,
  searchFields,
  type,
  onClose,
  isInboxPage,
  t
}) => {
  const {
    register,
    handleSubmit,
    formState,
    reset,
    watch,
    control
  } = useForm({
    defaultValues: searchParams
  });
  const mobileView = innerWidth <= 640;
  const ulb = Digit.SessionStorage.get("ENGAGEMENT_TENANTS");
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const userInfo = Digit.UserService.getUser().info;
  const userUlbs = ulb.filter(ulb => {
    var _userInfo$roles;
    return userInfo === null || userInfo === void 0 ? void 0 : (_userInfo$roles = userInfo.roles) === null || _userInfo$roles === void 0 ? void 0 : _userInfo$roles.some(role => (role === null || role === void 0 ? void 0 : role.tenantId) === (ulb === null || ulb === void 0 ? void 0 : ulb.code));
  }).sort(alphabeticalSortFunctionForTenantsBasedOnName);
  const getFields = input => {
    switch (input.type) {
      case "ulb":
        return /*#__PURE__*/React.createElement(Controller, {
          rules: {
            required: true
          },
          render: props => /*#__PURE__*/React.createElement(DropdownUlb, {
            onAssignmentChange: props.onChange,
            value: props.value,
            ulb: userUlbs,
            t: t
          }),
          name: input.name,
          control: control,
          defaultValue: null
        });
      default:
        return /*#__PURE__*/React.createElement(Controller, {
          render: props => /*#__PURE__*/React.createElement(TextInput, {
            onChange: props.onChange,
            value: props.value
          }),
          name: input.name,
          control: control,
          defaultValue: null
        });
    }
  };
  const onSubmitInput = data => {
    onSearch(data);
    if (type === "mobile") {
      onClose();
    }
  };
  const clearSearch = () => {
    reset({
      ulb: null,
      eventName: ''
    });
    onSearch({
      ulb: null,
      eventName: ''
    });
  };
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
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit(onSubmitInput)
  }, /*#__PURE__*/React.createElement("div", {
    className: "search-container",
    style: {
      width: "auto",
      marginLeft: isInboxPage ? "24px" : "revert"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "search-complaint-container"
  }, (type === "mobile" || mobileView) && /*#__PURE__*/React.createElement("div", {
    className: "complaint-header"
  }, /*#__PURE__*/React.createElement("h2", null, t("ES_COMMON_SEARCH_BY")), /*#__PURE__*/React.createElement("span", {
    onClick: onClose
  }, /*#__PURE__*/React.createElement(CloseSvg, null))), /*#__PURE__*/React.createElement("div", {
    className: "complaint-input-container for-pt " + (!isInboxPage ? "for-search" : ""),
    style: {
      width: "100%",
      display: "grid"
    }
  }, searchFields === null || searchFields === void 0 ? void 0 : searchFields.map((input, index) => {
    var _formState$dirtyField, _formState$errors, _formState$errors$inp;
    return /*#__PURE__*/React.createElement("div", {
      key: input.name,
      className: "input-fields"
    }, /*#__PURE__*/React.createElement("span", {
      className: "mobile-input"
    }, /*#__PURE__*/React.createElement(Label, null, t(input.label) + ` ${input.isMendatory ? "*" : ""}`), getFields(input)), formState !== null && formState !== void 0 && (_formState$dirtyField = formState.dirtyFields) !== null && _formState$dirtyField !== void 0 && _formState$dirtyField[input.name] ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: "700",
        color: "rgba(212, 53, 28)",
        paddingLeft: "8px",
        marginTop: "-20px",
        fontSize: "12px"
      },
      className: "inbox-search-form-error"
    }, formState === null || formState === void 0 ? void 0 : (_formState$errors = formState.errors) === null || _formState$errors === void 0 ? void 0 : (_formState$errors$inp = _formState$errors[input.name]) === null || _formState$errors$inp === void 0 ? void 0 : _formState$errors$inp.message) : null);
  }), type === "desktop" && !mobileView && /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "unset",
      marginLeft: "unset",
      marginTop: "55px"
    },
    className: "search-submit-wrapper"
  }, /*#__PURE__*/React.createElement(SubmitBar, {
    className: "submit-bar-search",
    label: t("ES_COMMON_SEARCH"),
    submit: true
  }), /*#__PURE__*/React.createElement("div", null, clearAll()))))), (type === "mobile" || mobileView) && /*#__PURE__*/React.createElement(ActionBar, {
    className: "clear-search-container"
  }, /*#__PURE__*/React.createElement("button", {
    className: "clear-search",
    style: {
      flex: 1
    }
  }, clearAll(mobileView)), /*#__PURE__*/React.createElement(SubmitBar, {
    disabled: !!Object.keys(formState.errors).length,
    label: t("ES_COMMON_SEARCH"),
    style: {
      flex: 1
    },
    submit: true
  })));
};

const EventLink = ({
  title: _title = "EVENTS_EVENTS_HEADER",
  links,
  icon: _icon = 'calender'
}) => {
  const {
    t
  } = useTranslation();
  const GetLogo = () => /*#__PURE__*/React.createElement("div", {
    className: "header",
    style: {
      justifyContent: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "logo",
    style: {
      backgroundColor: "#fff"
    }
  }, _icon === "calender" ? /*#__PURE__*/React.createElement(EventCalendar, null) : _icon === "survey" ? 'surveyIcon' : /*#__PURE__*/React.createElement(DocumentIcon, null)), " ", /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, t(_title)));
  return /*#__PURE__*/React.createElement(Card, {
    className: "employeeCard filter inboxLinks"
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

const StatusCount = ({
  status,
  onAssignmentChange,
  searchParams
}) => {
  var _searchParams$eventSt, _searchParams$eventSt2;
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement(CheckBox, {
    onChange: e => onAssignmentChange(e, status),
    checked: (searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$eventSt = searchParams.eventStatus) === null || _searchParams$eventSt === void 0 ? void 0 : (_searchParams$eventSt2 = _searchParams$eventSt.filter(event => event === status)) === null || _searchParams$eventSt2 === void 0 ? void 0 : _searchParams$eventSt2.length) > 0 ? true : false,
    label: t(status),
    pageType: 'employee'
  });
};

const statuses = ["ACTIVE", "INACTIVE"];
const Status = ({
  onAssignmentChange,
  searchParams
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: "status-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "filter-label"
  }, t("ES_INBOX_STATUS")), statuses === null || statuses === void 0 ? void 0 : statuses.map((status, key) => /*#__PURE__*/React.createElement(StatusCount, {
    key: key,
    status: status,
    onAssignmentChange: onAssignmentChange,
    searchParams: searchParams
  })));
};

const Filter = ({
  type: _type = "desktop",
  onClose,
  onSearch,
  onFilterChange,
  searchParams
}) => {
  var _data$mseva;
  const {
    t
  } = useTranslation();
  const [localSearchParams, setLocalSearchParams] = useState(() => ({
    ...searchParams
  }));
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const state = tenantId === null || tenantId === void 0 ? void 0 : tenantId.split('.')[0];
  const {
    isLoading,
    data
  } = Digit.Hooks.useCommonMDMS(state, "mseva", ["EventCategories"]);
  const clearAll = () => {
    setLocalSearchParams({
      eventCategory: null,
      eventStatus: [],
      range: {
        startDate: null,
        endDate: new Date(""),
        title: ""
      }
    });
    onFilterChange({
      eventCategory: null,
      eventStatus: [],
      range: {
        startDate: null,
        endDate: new Date(""),
        title: ""
      }
    });
    onClose === null || onClose === void 0 ? void 0 : onClose();
  };
  const applyLocalFilters = () => {
    onFilterChange(localSearchParams);
    onClose === null || onClose === void 0 ? void 0 : onClose();
  };
  const handleChange = data => {
    setLocalSearchParams({
      ...localSearchParams,
      ...data
    });
  };
  const onStatusChange = (e, type) => {
    var _localSearchParams$ev;
    if (e.target.checked) handleChange({
      eventStatus: [...((localSearchParams === null || localSearchParams === void 0 ? void 0 : localSearchParams.eventStatus) || []), type]
    });else handleChange({
      eventStatus: localSearchParams === null || localSearchParams === void 0 ? void 0 : (_localSearchParams$ev = localSearchParams.eventStatus) === null || _localSearchParams$ev === void 0 ? void 0 : _localSearchParams$ev.filter(status => status !== type)
    });
  };
  if (isLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return /*#__PURE__*/React.createElement("div", {
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
  }, t("ES_COMMON_CLEAR_ALL")), _type === "desktop" && /*#__PURE__*/React.createElement("span", {
    className: "clear-search",
    onClick: clearAll
  }, /*#__PURE__*/React.createElement(RefreshIcon, null)), _type === "mobile" && /*#__PURE__*/React.createElement("span", {
    onClick: onClose
  }, /*#__PURE__*/React.createElement(CloseSvg, null))), /*#__PURE__*/React.createElement("div", {
    className: "filter-label"
  }, `${t(`EVENTS_CATEGORY_LABEL`)}`), /*#__PURE__*/React.createElement(Dropdown, {
    option: data === null || data === void 0 ? void 0 : (_data$mseva = data.mseva) === null || _data$mseva === void 0 ? void 0 : _data$mseva.EventCategories,
    optionKey: "code",
    t: t,
    selected: localSearchParams === null || localSearchParams === void 0 ? void 0 : localSearchParams.eventCategory,
    select: val => handleChange({
      eventCategory: val
    })
  }), /*#__PURE__*/React.createElement(DateRange, {
    t: t,
    values: localSearchParams === null || localSearchParams === void 0 ? void 0 : localSearchParams.range,
    onFilterChange: handleChange,
    labelClass: "filter-label"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Status, {
    onAssignmentChange: onStatusChange,
    searchParams: localSearchParams
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SubmitBar, {
    style: {
      width: '100%'
    },
    onSubmit: () => applyLocalFilters(),
    label: t("ES_COMMON_APPLY")
  }))));
};

const GetCell = value => /*#__PURE__*/React.createElement("span", {
  className: ""
}, value);
const GetStatusCell = value => value === "Active" ? /*#__PURE__*/React.createElement("span", {
  className: "sla-cell-success"
}, value) : /*#__PURE__*/React.createElement("span", {
  className: "sla-cell-error"
}, value);
const DesktopInbox = ({
  isLoading,
  data,
  t,
  onSearch,
  parentRoute,
  title,
  iconName,
  links,
  globalSearch,
  searchFields,
  searchParams,
  onFilterChange,
  pageSizeLimit,
  totalRecords,
  currentPage,
  onNextPage,
  onPrevPage,
  onPageSizeChange
}) => {
  const columns = React.useMemo(() => {
    return [{
      Header: t("EVENTS_EVENT_NAME_LABEL"),
      accessor: "name",
      Cell: ({
        row
      }) => {
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
          className: "link"
        }, /*#__PURE__*/React.createElement(Link, {
          to: `${parentRoute}/event/inbox/event-details/${row.original.id}`
        }, row.original["name"])));
      }
    }, {
      Header: t("EVENTS_EVENT_CATEGORY_LABEL"),
      accessor: row => {
        return GetCell(row !== null && row !== void 0 && row.eventCategory ? t(`MSEVA_EVENTCATEGORIES_${row === null || row === void 0 ? void 0 : row.eventCategory}`) : "");
      }
    }, {
      Header: t("EVENTS_START_DATE_LABEL"),
      accessor: row => {
        var _row$eventDetails, _row$eventDetails2;
        return row !== null && row !== void 0 && (_row$eventDetails = row.eventDetails) !== null && _row$eventDetails !== void 0 && _row$eventDetails.fromDate ? GetCell(format(new Date(row === null || row === void 0 ? void 0 : (_row$eventDetails2 = row.eventDetails) === null || _row$eventDetails2 === void 0 ? void 0 : _row$eventDetails2.fromDate), 'dd/MM/yyyy')) : "";
      }
    }, {
      Header: t("EVENTS_END_DATE_LABEL"),
      accessor: row => {
        var _row$eventDetails3, _row$eventDetails4;
        return row !== null && row !== void 0 && (_row$eventDetails3 = row.eventDetails) !== null && _row$eventDetails3 !== void 0 && _row$eventDetails3.toDate ? GetCell(format(new Date(row === null || row === void 0 ? void 0 : (_row$eventDetails4 = row.eventDetails) === null || _row$eventDetails4 === void 0 ? void 0 : _row$eventDetails4.toDate), "dd/MM/yyyy")) : "";
      }
    }, {
      Header: t("EVENTS_POSTEDBY_LABEL"),
      accessor: row => {
        var _row$user;
        return GetCell((row === null || row === void 0 ? void 0 : (_row$user = row.user) === null || _row$user === void 0 ? void 0 : _row$user.name) || "");
      }
    }, {
      Header: t("EVENTS_STATUS_LABEL"),
      accessor: row => GetStatusCell(t(row === null || row === void 0 ? void 0 : row.status))
    }];
  });
  let result;
  if (isLoading) {
    result = /*#__PURE__*/React.createElement(Loader, null);
  } else if ((data === null || data === void 0 ? void 0 : data.length) > 0) {
    result = /*#__PURE__*/React.createElement(ApplicationTable, {
      t: t,
      data: data,
      columns: columns,
      globalSearch: globalSearch,
      onSearch: searchParams,
      pageSizeLimit: pageSizeLimit,
      totalRecords: totalRecords,
      currentPage: currentPage,
      onNextPage: onNextPage,
      onPrevPage: onPrevPage,
      onPageSizeChange: onPageSizeChange,
      getCellProps: cellInfo => {
        return {
          style: {
            minWidth: cellInfo.column.Header === t("ES_INBOX_APPLICATION_NO") ? "240px" : "",
            padding: "20px 18px",
            fontSize: "16px"
          }
        };
      }
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "inbox-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "filters-container"
  }, /*#__PURE__*/React.createElement(EventLink, {
    title: title,
    icon: iconName,
    links: links
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Filter, {
    onFilterChange: onFilterChange,
    searchParams: searchParams
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Search, {
    t: t,
    onSearch: onSearch,
    type: "desktop",
    searchFields: searchFields,
    isInboxPage: true,
    searchParams: searchParams
  }), /*#__PURE__*/React.createElement("div", {
    className: "result",
    style: {
      marginLeft: "24px",
      flex: 1
    }
  }, result)));
};

const ApplicationCard = ({
  searchFields,
  searchParams,
  onFilterChange,
  onSearch,
  t,
  data,
  serviceRequestIdKey
}) => {
  const [type, setType] = useState("");
  const [popup, setPopup] = useState(false);
  const [params, setParams] = useState(searchParams);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const history = useHistory();
  useEffect(() => {
    if (type) setPopup(true);
  }, [type]);
  const handlePopupClose = () => {
    setPopup(false);
    setParams(searchParams);
  };
  let result;
  if ((data === null || data === void 0 ? void 0 : data.length) === 0) {
    result = /*#__PURE__*/React.createElement(Card, {
      style: {
        marginTop: 20
      }
    }, t("ES_NO_EVENTS").split("\\n").map((text, index) => /*#__PURE__*/React.createElement("p", {
      key: index,
      style: {
        textAlign: "center"
      }
    }, text)));
  } else if (data && (data === null || data === void 0 ? void 0 : data.length) > 0) {
    result = /*#__PURE__*/React.createElement(DetailsCard, {
      data: data,
      linkPrefix: '/digit-ui/employee/engagement/event/inbox/event-details/',
      serviceRequestIdKey: serviceRequestIdKey
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
  }), /*#__PURE__*/React.createElement(FilterAction, {
    text: "FILTER",
    handleActionClick: () => {
      setType("FILTER");
      setPopup(true);
    }
  })), result, popup && /*#__PURE__*/React.createElement(PopUp, null, type === "FILTER" && /*#__PURE__*/React.createElement("div", {
    className: "popup-module"
  }, /*#__PURE__*/React.createElement(Filter, {
    onFilterChange: onFilterChange,
    onClose: handlePopupClose,
    onSearch: onSearch,
    type: "mobile",
    searchParams: params
  })), type === "SEARCH" && /*#__PURE__*/React.createElement("div", {
    className: "popup-module"
  }, /*#__PURE__*/React.createElement(Search, {
    t: t,
    type: "mobile",
    onClose: handlePopupClose,
    onSearch: onSearch,
    searchParams: searchParams,
    searchFields: searchFields
  }))));
};

const GetStatusCell$1 = value => value === "Active" ? /*#__PURE__*/React.createElement("span", {
  className: "sla-cell-success"
}, value) : /*#__PURE__*/React.createElement("span", {
  className: "sla-cell-error"
}, value);
const MobileInbox = ({
  data,
  t,
  title,
  iconName,
  links,
  searchFields,
  searchParams,
  onFilterChange,
  onSearch,
  isLoading
}) => {
  const getData = () => {
    return data === null || data === void 0 ? void 0 : data.filter(event => {
      var _searchParams$eventSt, _searchParams$eventSt2, _event$name, _searchParams$eventNa, _searchParams$ulb, _searchParams$ulb2, _searchParams$eventCa, _searchParams$range, _event$eventDetails, _searchParams$range2, _searchParams$range3, _event$eventDetails2, _searchParams$range4;
      return ((searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$eventSt = searchParams.eventStatus) === null || _searchParams$eventSt === void 0 ? void 0 : _searchParams$eventSt.length) > 0 ? searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$eventSt2 = searchParams.eventStatus) === null || _searchParams$eventSt2 === void 0 ? void 0 : _searchParams$eventSt2.includes(event.status) : true) && (searchParams !== null && searchParams !== void 0 && searchParams.eventName ? (_event$name = event.name) === null || _event$name === void 0 ? void 0 : _event$name.toUpperCase().startsWith(searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$eventNa = searchParams.eventName) === null || _searchParams$eventNa === void 0 ? void 0 : _searchParams$eventNa.toUpperCase()) : true) && (searchParams !== null && searchParams !== void 0 && (_searchParams$ulb = searchParams.ulb) !== null && _searchParams$ulb !== void 0 && _searchParams$ulb.code ? event.tenantId === (searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$ulb2 = searchParams.ulb) === null || _searchParams$ulb2 === void 0 ? void 0 : _searchParams$ulb2.code) : true) && (searchParams !== null && searchParams !== void 0 && searchParams.eventCategory ? event.eventCategory === (searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$eventCa = searchParams.eventCategory) === null || _searchParams$eventCa === void 0 ? void 0 : _searchParams$eventCa.code) : true) && (isValid(searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$range = searchParams.range) === null || _searchParams$range === void 0 ? void 0 : _searchParams$range.startDate) ? ((_event$eventDetails = event.eventDetails) === null || _event$eventDetails === void 0 ? void 0 : _event$eventDetails.fromDate) >= new Date(searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$range2 = searchParams.range) === null || _searchParams$range2 === void 0 ? void 0 : _searchParams$range2.startDate).getTime() : true) && (isValid(searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$range3 = searchParams.range) === null || _searchParams$range3 === void 0 ? void 0 : _searchParams$range3.endDate) ? ((_event$eventDetails2 = event.eventDetails) === null || _event$eventDetails2 === void 0 ? void 0 : _event$eventDetails2.toDate) <= new Date(searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$range4 = searchParams.range) === null || _searchParams$range4 === void 0 ? void 0 : _searchParams$range4.endDate).getTime() : true);
    }).map(event => {
      var _event$eventDetails3, _event$eventDetails4, _event$user;
      return {
        ["applicationNo"]: event === null || event === void 0 ? void 0 : event.id,
        [t("EVENTS_EVENT_NAME_LABEL")]: event === null || event === void 0 ? void 0 : event.name,
        [t("EVENTS_EVENT_CATEGORY_LABEL")]: t(`MSEVA_EVENTCATEGORIES_${event === null || event === void 0 ? void 0 : event.eventCategory}`),
        [t("EVENTS_START_DATE_LABEL")]: format(new Date(event === null || event === void 0 ? void 0 : (_event$eventDetails3 = event.eventDetails) === null || _event$eventDetails3 === void 0 ? void 0 : _event$eventDetails3.fromDate), 'dd/MM/yyyy'),
        [t("EVENTS_END_DATE_LABEL")]: format(new Date(event === null || event === void 0 ? void 0 : (_event$eventDetails4 = event.eventDetails) === null || _event$eventDetails4 === void 0 ? void 0 : _event$eventDetails4.toDate), 'dd/MM/yyyy'),
        [t("EVENTS_POSTEDBY_LABEL")]: event === null || event === void 0 ? void 0 : (_event$user = event.user) === null || _event$user === void 0 ? void 0 : _event$user.name,
        [t("EVENTS_STATUS_LABEL")]: GetStatusCell$1(t(event === null || event === void 0 ? void 0 : event.status))
      };
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "inbox-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "filters-container"
  }, /*#__PURE__*/React.createElement(EventLink, {
    title: title,
    icon: iconName,
    links: links
  }), /*#__PURE__*/React.createElement(ApplicationCard, {
    t: t,
    data: getData(),
    onFilterChange: onFilterChange,
    isLoading: isLoading,
    onSearch: onSearch,
    searchParams: searchParams,
    searchFields: searchFields,
    serviceRequestIdKey: "applicationNo"
  }))));
};

const Inbox = ({
  tenants,
  parentRoute
}) => {
  var _searchParams$ulb;
  const {
    t
  } = useTranslation();
  Digit.SessionStorage.set("ENGAGEMENT_TENANTS", tenants);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [pageSize, setPageSize] = useState(10);
  const [pageOffset, setPageOffset] = useState(0);
  const [searchParams, setSearchParams] = useState({
    eventStatus: [],
    range: {
      startDate: null,
      endDate: new Date(""),
      title: ""
    },
    ulb: tenants === null || tenants === void 0 ? void 0 : tenants.find(tenant => (tenant === null || tenant === void 0 ? void 0 : tenant.code) === tenantId)
  });
  let isMobile = window.Digit.Utils.browser.isMobile();
  const getSearchFields = () => {
    return [{
      label: t("EVENTS_ULB_LABEL"),
      name: "ulb",
      type: "ulb"
    }, {
      label: t("EVENTS_NAME_LABEL"),
      name: "eventName"
    }];
  };
  const links = [{
    text: t("ES_TITLE_NEW_EVENTS"),
    link: "/digit-ui/employee/engagement/event/inbox/new-event"
  }];
  const {
    data,
    isLoading
  } = Digit.Hooks.events.useInbox(searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$ulb = searchParams.ulb) === null || _searchParams$ulb === void 0 ? void 0 : _searchParams$ulb.code, {}, {
    eventTypes: "EVENTSONGROUND",
    limit: pageSize,
    offset: pageOffset
  }, {
    select: data => ({
      events: data === null || data === void 0 ? void 0 : data.events,
      totalCount: data === null || data === void 0 ? void 0 : data.totalCount
    })
  });
  const onSearch = params => {
    let updatedParams = {
      ...params
    };
    if (!(params !== null && params !== void 0 && params.ulb)) {
      updatedParams = {
        ...params,
        ulb: {
          code: tenantId
        }
      };
    }
    setSearchParams({
      ...searchParams,
      ...updatedParams
    });
  };
  const handleFilterChange = data => {
    setSearchParams({
      ...searchParams,
      ...data
    });
  };
  const globalSearch = (rows, columnIds) => {
    return rows === null || rows === void 0 ? void 0 : rows.filter(row => {
      var _searchParams$eventSt, _searchParams$eventSt2, _row$original, _row$original2, _row$original2$name, _searchParams$ulb2, _searchParams$ulb3, _searchParams$eventCa, _searchParams$range, _row$original$eventDe, _searchParams$range2, _searchParams$range3, _row$original$eventDe2, _searchParams$range4;
      return ((searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$eventSt = searchParams.eventStatus) === null || _searchParams$eventSt === void 0 ? void 0 : _searchParams$eventSt.length) > 0 ? searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$eventSt2 = searchParams.eventStatus) === null || _searchParams$eventSt2 === void 0 ? void 0 : _searchParams$eventSt2.includes((_row$original = row.original) === null || _row$original === void 0 ? void 0 : _row$original.status) : true) && (searchParams !== null && searchParams !== void 0 && searchParams.eventName ? (_row$original2 = row.original) === null || _row$original2 === void 0 ? void 0 : (_row$original2$name = _row$original2.name) === null || _row$original2$name === void 0 ? void 0 : _row$original2$name.toUpperCase().startsWith(searchParams === null || searchParams === void 0 ? void 0 : searchParams.eventName.toUpperCase()) : true) && (searchParams !== null && searchParams !== void 0 && (_searchParams$ulb2 = searchParams.ulb) !== null && _searchParams$ulb2 !== void 0 && _searchParams$ulb2.code ? row.original.tenantId === (searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$ulb3 = searchParams.ulb) === null || _searchParams$ulb3 === void 0 ? void 0 : _searchParams$ulb3.code) : true) && (searchParams !== null && searchParams !== void 0 && searchParams.eventCategory ? row.original.eventCategory === (searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$eventCa = searchParams.eventCategory) === null || _searchParams$eventCa === void 0 ? void 0 : _searchParams$eventCa.code) : true) && (isValid(searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$range = searchParams.range) === null || _searchParams$range === void 0 ? void 0 : _searchParams$range.startDate) ? ((_row$original$eventDe = row.original.eventDetails) === null || _row$original$eventDe === void 0 ? void 0 : _row$original$eventDe.fromDate) >= new Date(searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$range2 = searchParams.range) === null || _searchParams$range2 === void 0 ? void 0 : _searchParams$range2.startDate).getTime() : true) && (isValid(searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$range3 = searchParams.range) === null || _searchParams$range3 === void 0 ? void 0 : _searchParams$range3.endDate) ? ((_row$original$eventDe2 = row.original.eventDetails) === null || _row$original$eventDe2 === void 0 ? void 0 : _row$original$eventDe2.toDate) <= new Date(searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$range4 = searchParams.range) === null || _searchParams$range4 === void 0 ? void 0 : _searchParams$range4.endDate).getTime() : true);
    });
  };
  const fetchNextPage = useCallback(() => {
    setPageOffset(prevPageOffSet => parseInt(prevPageOffSet) + parseInt(pageSize));
  }, [pageSize]);
  const fetchPrevPage = useCallback(() => {
    setPageOffset(prevPageOffSet => parseInt(prevPageOffSet) - parseInt(pageSize));
  }, [pageSize]);
  const handlePageSizeChange = e => {
    setPageSize(prevPageSize => e.target.value);
  };
  if (isMobile) {
    return /*#__PURE__*/React.createElement(MobileInbox, {
      data: data === null || data === void 0 ? void 0 : data.events,
      searchParams: searchParams,
      searchFields: getSearchFields(),
      t: t,
      onFilterChange: handleFilterChange,
      onSearch: onSearch,
      isLoading: isLoading,
      title: "EVENTS_EVENTS_HEADER",
      iconName: "calender",
      links: links
    });
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Header, null, t("EVENTS_EVENTS_HEADER"), Number(data === null || data === void 0 ? void 0 : data.totalCount) ? /*#__PURE__*/React.createElement("p", {
    className: "inbox-count"
  }, Number(data === null || data === void 0 ? void 0 : data.totalCount)) : null), /*#__PURE__*/React.createElement(DesktopInbox, {
    t: t,
    data: data === null || data === void 0 ? void 0 : data.events,
    links: links,
    parentRoute: parentRoute,
    searchParams: searchParams,
    onSearch: onSearch,
    globalSearch: globalSearch,
    searchFields: getSearchFields(),
    onFilterChange: handleFilterChange,
    pageSizeLimit: pageSize,
    totalRecords: data === null || data === void 0 ? void 0 : data.totalCount,
    title: "EVENTS_EVENTS_HEADER",
    iconName: "calender",
    links: links,
    currentPage: parseInt(pageOffset / pageSize),
    onNextPage: fetchNextPage,
    onPrevPage: fetchPrevPage,
    onPageSizeChange: handlePageSizeChange
  }));
};

const ApplicationTable$1 = ({
  t,
  data,
  columns,
  globalSearch,
  onSearch,
  getCellProps,
  pageSizeLimit,
  totalRecords,
  currentPage,
  onNextPage,
  onPrevPage,
  onPageSizeChange
}) => {
  return /*#__PURE__*/React.createElement(Table, {
    t: t,
    data: data,
    columns: columns,
    onSearch: onSearch,
    globalSearch: globalSearch,
    manualGlobalFilter: true,
    manualPagination: true,
    pageSizeLimit: pageSizeLimit,
    getCellProps: getCellProps,
    totalRecords: totalRecords,
    currentPage: currentPage,
    onNextPage: onNextPage,
    onPrevPage: onPrevPage,
    onPageSizeChange: onPageSizeChange
  });
};

const DropdownUlb$1 = ({
  ulb,
  onAssignmentChange,
  value,
  t
}) => {
  return /*#__PURE__*/React.createElement(Dropdown, {
    option: ulb,
    optionKey: "code",
    selected: value,
    select: onAssignmentChange,
    t: t
  });
};

const Search$1 = ({
  onSearch,
  searchParams,
  searchFields,
  type,
  onClose,
  isInboxPage,
  t
}) => {
  const {
    register,
    handleSubmit,
    formState,
    reset,
    watch,
    control
  } = useForm({
    defaultValues: searchParams
  });
  const mobileView = innerWidth <= 640;
  const ulbs = Digit.SessionStorage.get("ENGAGEMENT_TENANTS");
  const userInfo = Digit.UserService.getUser().info;
  const userUlbs = ulbs.filter(ulb => {
    var _userInfo$roles;
    return userInfo === null || userInfo === void 0 ? void 0 : (_userInfo$roles = userInfo.roles) === null || _userInfo$roles === void 0 ? void 0 : _userInfo$roles.some(role => (role === null || role === void 0 ? void 0 : role.tenantId) === (ulb === null || ulb === void 0 ? void 0 : ulb.code));
  }).sort(alphabeticalSortFunctionForTenantsBasedOnName);
  const getFields = input => {
    switch (input.type) {
      case "ulb":
        return /*#__PURE__*/React.createElement(Controller, {
          rules: {
            required: true
          },
          render: props => /*#__PURE__*/React.createElement(DropdownUlb$1, {
            onAssignmentChange: props.onChange,
            value: props.value,
            ulb: userUlbs,
            t: t
          }),
          name: input.name,
          control: control,
          defaultValue: null
        });
      case "range":
        return /*#__PURE__*/React.createElement(Controller, {
          render: ({
            value,
            onChange
          }) => {
            return /*#__PURE__*/React.createElement(DateRange, {
              t: t,
              values: value,
              onFilterChange: value => onChange(value.range),
              labelClass: "filter-label"
            });
          },
          name: input.name,
          control: control,
          defaultValue: null
        });
      default:
        return /*#__PURE__*/React.createElement(Controller, {
          render: props => /*#__PURE__*/React.createElement(TextInput, {
            onChange: props.onChange,
            value: props.value
          }),
          name: input.name,
          control: control,
          defaultValue: null
        });
    }
  };
  const onSubmitInput = data => {
    onSearch(data);
    if (type === "mobile") {
      onClose();
    }
  };
  const clearSearch = () => {
    reset({
      ulb: null,
      name: ''
    });
    onSearch({
      ulb: null,
      name: ''
    });
  };
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
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit(onSubmitInput)
  }, /*#__PURE__*/React.createElement("div", {
    className: "search-container",
    style: {
      width: "auto",
      marginLeft: isInboxPage ? "24px" : "revert"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "search-complaint-container"
  }, (type === "mobile" || mobileView) && /*#__PURE__*/React.createElement("div", {
    className: "complaint-header"
  }, /*#__PURE__*/React.createElement("h2", null, t("ES_COMMON_SEARCH_BY")), /*#__PURE__*/React.createElement("span", {
    onClick: onClose
  }, /*#__PURE__*/React.createElement(CloseSvg, null))), /*#__PURE__*/React.createElement("div", {
    className: "complaint-input-container for-pt " + (!isInboxPage ? "for-search" : ""),
    style: {
      width: "100%",
      display: "grid"
    }
  }, searchFields === null || searchFields === void 0 ? void 0 : searchFields.map((input, index) => {
    var _formState$dirtyField, _formState$errors, _formState$errors$inp;
    return /*#__PURE__*/React.createElement("div", {
      key: input.name,
      className: "input-fields"
    }, /*#__PURE__*/React.createElement("span", {
      className: "mobile-input"
    }, /*#__PURE__*/React.createElement(Label, null, t(input.label) + ` ${input.isMendatory ? "*" : ""}`), getFields(input)), formState !== null && formState !== void 0 && (_formState$dirtyField = formState.dirtyFields) !== null && _formState$dirtyField !== void 0 && _formState$dirtyField[input.name] ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: "700",
        color: "rgba(212, 53, 28)",
        paddingLeft: "8px",
        marginTop: "-20px",
        fontSize: "12px"
      },
      className: "inbox-search-form-error"
    }, formState === null || formState === void 0 ? void 0 : (_formState$errors = formState.errors) === null || _formState$errors === void 0 ? void 0 : (_formState$errors$inp = _formState$errors[input.name]) === null || _formState$errors$inp === void 0 ? void 0 : _formState$errors$inp.message) : null);
  }), type === "desktop" && !mobileView && /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "unset",
      marginLeft: "unset",
      marginTop: "55px"
    },
    className: "search-submit-wrapper"
  }, /*#__PURE__*/React.createElement(SubmitBar, {
    className: "submit-bar-search",
    label: t("ES_COMMON_SEARCH"),
    submit: true
  }), /*#__PURE__*/React.createElement("div", null, clearAll()))))), (type === "mobile" || mobileView) && /*#__PURE__*/React.createElement(ActionBar, {
    className: "clear-search-container"
  }, /*#__PURE__*/React.createElement("button", {
    className: "clear-search",
    style: {
      flex: 1
    }
  }, clearAll(mobileView)), /*#__PURE__*/React.createElement(SubmitBar, {
    disabled: !!Object.keys(formState.errors).length,
    label: t("ES_COMMON_SEARCH"),
    style: {
      flex: 1
    },
    submit: true
  })));
};

const EventLink$1 = ({
  title: _title = "CS_HEADER_PUBLIC_BRDCST",
  links,
  icon: _icon = 'calender'
}) => {
  const {
    t
  } = useTranslation();
  const GetLogo = () => /*#__PURE__*/React.createElement("div", {
    className: "header",
    style: {
      justifyContent: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "logo",
    style: {
      backgroundColor: "#fff"
    }
  }, /*#__PURE__*/React.createElement(PMBIcon, null)), " ", /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, t(_title)));
  return /*#__PURE__*/React.createElement(Card, {
    className: "employeeCard filter inboxLinks"
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

const StatusCount$1 = ({
  status,
  onAssignmentChange,
  searchParams
}) => {
  var _searchParams$eventSt, _searchParams$eventSt2;
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement(CheckBox, {
    onChange: e => onAssignmentChange(e, status),
    checked: (searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$eventSt = searchParams.eventStatus) === null || _searchParams$eventSt === void 0 ? void 0 : (_searchParams$eventSt2 = _searchParams$eventSt.filter(event => event === status)) === null || _searchParams$eventSt2 === void 0 ? void 0 : _searchParams$eventSt2.length) > 0 ? true : false,
    label: t(status),
    pageType: 'employee'
  });
};

const statuses$1 = ["ACTIVE", "INACTIVE"];
const Status$1 = ({
  onAssignmentChange,
  searchParams
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: "status-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "filter-label"
  }, t("ES_INBOX_STATUS")), statuses$1 === null || statuses$1 === void 0 ? void 0 : statuses$1.map((status, key) => /*#__PURE__*/React.createElement(StatusCount$1, {
    key: key,
    status: status,
    onAssignmentChange: onAssignmentChange,
    searchParams: searchParams
  })));
};

const Filter$1 = ({
  type: _type = "desktop",
  onClose,
  onSearch,
  onFilterChange,
  searchParams
}) => {
  const {
    t
  } = useTranslation();
  const [localSearchParams, setLocalSearchParams] = useState(() => ({
    ...searchParams
  }));
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const state = tenantId === null || tenantId === void 0 ? void 0 : tenantId.split('.')[0];
  const {
    isLoading,
    data
  } = Digit.Hooks.useCommonMDMS(state, "mseva", ["EventCategories"]);
  const clearAll = () => {
    setLocalSearchParams({
      eventCategory: null,
      eventStatus: [],
      range: {
        startDate: null,
        endDate: new Date(""),
        title: ""
      }
    });
    onFilterChange({
      eventCategory: null,
      eventStatus: [],
      range: {
        startDate: null,
        endDate: new Date(""),
        title: ""
      }
    });
    onClose === null || onClose === void 0 ? void 0 : onClose();
  };
  const applyLocalFilters = () => {
    onFilterChange(localSearchParams);
    onClose === null || onClose === void 0 ? void 0 : onClose();
  };
  const handleChange = useCallback(data => {
    setLocalSearchParams(prevLocalSearchParams => ({
      ...prevLocalSearchParams,
      ...data
    }));
  }, []);
  const onStatusChange = (e, type) => {
    var _localSearchParams$ev;
    if (e.target.checked) handleChange({
      eventStatus: [...((localSearchParams === null || localSearchParams === void 0 ? void 0 : localSearchParams.eventStatus) || []), type]
    });else handleChange({
      eventStatus: localSearchParams === null || localSearchParams === void 0 ? void 0 : (_localSearchParams$ev = localSearchParams.eventStatus) === null || _localSearchParams$ev === void 0 ? void 0 : _localSearchParams$ev.filter(status => status !== type)
    });
  };
  if (isLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return /*#__PURE__*/React.createElement("div", {
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
  }, t("ES_COMMON_CLEAR_ALL")), _type === "desktop" && /*#__PURE__*/React.createElement("span", {
    className: "clear-search",
    onClick: clearAll
  }, /*#__PURE__*/React.createElement(RefreshIcon, null)), _type === "mobile" && /*#__PURE__*/React.createElement("span", {
    onClick: onClose
  }, /*#__PURE__*/React.createElement(CloseSvg, null))), /*#__PURE__*/React.createElement(DateRange, {
    t: t,
    values: localSearchParams === null || localSearchParams === void 0 ? void 0 : localSearchParams.range,
    onFilterChange: handleChange,
    labelClass: "filter-label"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Status$1, {
    onAssignmentChange: onStatusChange,
    searchParams: localSearchParams
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SubmitBar, {
    style: {
      width: '100%'
    },
    onSubmit: () => applyLocalFilters(),
    label: t("ES_COMMON_APPLY")
  }))));
};

const GetCell$1 = value => /*#__PURE__*/React.createElement("span", {
  className: ""
}, value);
const GetStatusCell$2 = value => value === "Active" ? /*#__PURE__*/React.createElement("span", {
  className: "sla-cell-success"
}, value) : /*#__PURE__*/React.createElement("span", {
  className: "sla-cell-error"
}, value);
const DesktopInbox$1 = ({
  isLoading,
  data,
  t,
  onSearch,
  parentRoute,
  title,
  iconName,
  links,
  globalSearch,
  searchFields,
  searchParams,
  onFilterChange,
  pageSizeLimit,
  totalRecords,
  currentPage,
  onNextPage,
  onPrevPage,
  onPageSizeChange
}) => {
  const columns = React.useMemo(() => {
    return [{
      Header: t("EVENTS_MESSAGE_LABEL"),
      accessor: "name",
      Cell: ({
        row
      }) => {
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
          className: "link"
        }, /*#__PURE__*/React.createElement(Link, {
          to: `${parentRoute}/messages/inbox/details/${row.original.id}`
        }, row.original["name"])));
      }
    }, {
      Header: t("EVENTS_POSTING_DATE_LABEL"),
      accessor: row => {
        var _row$auditDetails, _row$auditDetails2;
        return row !== null && row !== void 0 && (_row$auditDetails = row.auditDetails) !== null && _row$auditDetails !== void 0 && _row$auditDetails.createdTime ? GetCell$1(format(new Date(row === null || row === void 0 ? void 0 : (_row$auditDetails2 = row.auditDetails) === null || _row$auditDetails2 === void 0 ? void 0 : _row$auditDetails2.createdTime), 'dd/MM/yyyy')) : "";
      }
    }, {
      Header: t("EVENTS_START_DATE_LABEL"),
      accessor: row => {
        var _row$eventDetails, _row$eventDetails2;
        return row !== null && row !== void 0 && (_row$eventDetails = row.eventDetails) !== null && _row$eventDetails !== void 0 && _row$eventDetails.fromDate ? GetCell$1(format(new Date(row === null || row === void 0 ? void 0 : (_row$eventDetails2 = row.eventDetails) === null || _row$eventDetails2 === void 0 ? void 0 : _row$eventDetails2.fromDate), 'dd/MM/yyyy')) : "";
      }
    }, {
      Header: t("EVENTS_END_DATE_LABEL"),
      accessor: row => {
        var _row$eventDetails3, _row$eventDetails4;
        return row !== null && row !== void 0 && (_row$eventDetails3 = row.eventDetails) !== null && _row$eventDetails3 !== void 0 && _row$eventDetails3.toDate ? GetCell$1(format(new Date(row === null || row === void 0 ? void 0 : (_row$eventDetails4 = row.eventDetails) === null || _row$eventDetails4 === void 0 ? void 0 : _row$eventDetails4.toDate), "dd/MM/yyyy")) : "";
      }
    }, {
      Header: t("EVENTS_POSTEDBY_LABEL"),
      accessor: row => {
        var _row$user;
        return GetCell$1((row === null || row === void 0 ? void 0 : (_row$user = row.user) === null || _row$user === void 0 ? void 0 : _row$user.name) || "");
      }
    }, {
      Header: t("EVENTS_STATUS_LABEL"),
      accessor: row => GetStatusCell$2(t(row === null || row === void 0 ? void 0 : row.status))
    }];
  });
  let result;
  if (isLoading) {
    result = /*#__PURE__*/React.createElement(Loader, null);
  } else if ((data === null || data === void 0 ? void 0 : data.length) > 0) {
    result = /*#__PURE__*/React.createElement(ApplicationTable$1, {
      t: t,
      data: data,
      columns: columns,
      globalSearch: globalSearch,
      onSearch: searchParams,
      pageSizeLimit: pageSizeLimit,
      totalRecords: totalRecords,
      currentPage: currentPage,
      onNextPage: onNextPage,
      onPrevPage: onPrevPage,
      onPageSizeChange: onPageSizeChange,
      getCellProps: cellInfo => {
        return {
          style: {
            minWidth: cellInfo.column.Header === t("ES_INBOX_APPLICATION_NO") ? "240px" : "",
            padding: "20px 18px",
            fontSize: "16px"
          }
        };
      }
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "inbox-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "filters-container"
  }, /*#__PURE__*/React.createElement(EventLink$1, {
    title: title,
    icon: iconName,
    links: links
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Filter$1, {
    onFilterChange: onFilterChange,
    searchParams: searchParams
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Search$1, {
    t: t,
    onSearch: onSearch,
    type: "desktop",
    searchFields: searchFields,
    isInboxPage: true,
    searchParams: searchParams
  }), /*#__PURE__*/React.createElement("div", {
    className: "result",
    style: {
      marginLeft: "24px",
      flex: 1
    }
  }, result)));
};

const ApplicationCard$1 = ({
  searchFields,
  searchParams,
  onFilterChange,
  onSearch,
  t,
  data,
  responseData
}) => {
  const [type, setType] = useState("");
  const [popup, setPopup] = useState(false);
  const [params, setParams] = useState(searchParams);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const history = useHistory();
  useEffect(() => {
    if (type) setPopup(true);
  }, [type]);
  const handlePopupClose = () => {
    setPopup(false);
    setParams(searchParams);
  };
  const redirectToDetailsPage = data => {
    const details = responseData === null || responseData === void 0 ? void 0 : responseData.find(item => {
      var _item$user;
      return areEqual(item === null || item === void 0 ? void 0 : (_item$user = item.user) === null || _item$user === void 0 ? void 0 : _item$user.name, data["Posted By"]) && areEqual(item.name, data["Title"]);
    });
    if (details) {
      history.push(`/digit-ui/employee/engagement/messages/inbox/details/${details === null || details === void 0 ? void 0 : details.id}`);
    }
  };
  let result;
  if ((data === null || data === void 0 ? void 0 : data.length) === 0) {
    result = /*#__PURE__*/React.createElement(Card, {
      style: {
        marginTop: 20
      }
    }, t("ES_NO_PUBLIC_MESSAGES").split("\\n").map((text, index) => /*#__PURE__*/React.createElement("p", {
      key: index,
      style: {
        textAlign: "center"
      }
    }, text)));
  } else if (data && (data === null || data === void 0 ? void 0 : data.length) > 0) {
    result = /*#__PURE__*/React.createElement(DetailsCard, {
      data: data,
      handleSelect: () => {},
      handleDetailCardClick: redirectToDetailsPage
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
  }), /*#__PURE__*/React.createElement(FilterAction, {
    text: "FILTER",
    handleActionClick: () => {
      setType("FILTER");
      setPopup(true);
    }
  })), result, popup && /*#__PURE__*/React.createElement(PopUp, null, type === "FILTER" && /*#__PURE__*/React.createElement("div", {
    className: "popup-module"
  }, /*#__PURE__*/React.createElement(Filter$1, {
    onFilterChange: onFilterChange,
    onClose: handlePopupClose,
    onSearch: onSearch,
    type: "mobile",
    searchParams: params
  })), type === "SEARCH" && /*#__PURE__*/React.createElement("div", {
    className: "popup-module"
  }, /*#__PURE__*/React.createElement(Search$1, {
    t: t,
    type: "mobile",
    onClose: handlePopupClose,
    onSearch: onSearch,
    searchParams: searchParams,
    searchFields: searchFields
  }))));
};

const GetStatusCell$3 = value => value === "Active" ? /*#__PURE__*/React.createElement("span", {
  className: "sla-cell-success"
}, value) : /*#__PURE__*/React.createElement("span", {
  className: "sla-cell-error"
}, value);
const MobileInbox$1 = ({
  data,
  t,
  title,
  iconName,
  links,
  searchFields,
  searchParams,
  onFilterChange,
  onSearch,
  isLoading
}) => {
  const getData = () => {
    return data === null || data === void 0 ? void 0 : data.filter(event => {
      var _searchParams$eventSt, _searchParams$eventSt2, _event$name, _searchParams$eventNa, _searchParams$ulb, _searchParams$ulb2, _searchParams$eventCa, _searchParams$range, _event$eventDetails, _searchParams$range2, _searchParams$range3, _event$eventDetails2, _searchParams$range4;
      return ((searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$eventSt = searchParams.eventStatus) === null || _searchParams$eventSt === void 0 ? void 0 : _searchParams$eventSt.length) > 0 ? searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$eventSt2 = searchParams.eventStatus) === null || _searchParams$eventSt2 === void 0 ? void 0 : _searchParams$eventSt2.includes(event.status) : true) && (searchParams !== null && searchParams !== void 0 && searchParams.eventName ? (_event$name = event.name) === null || _event$name === void 0 ? void 0 : _event$name.toUpperCase().startsWith(searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$eventNa = searchParams.eventName) === null || _searchParams$eventNa === void 0 ? void 0 : _searchParams$eventNa.toUpperCase()) : true) && (searchParams !== null && searchParams !== void 0 && (_searchParams$ulb = searchParams.ulb) !== null && _searchParams$ulb !== void 0 && _searchParams$ulb.code ? event.tenantId === (searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$ulb2 = searchParams.ulb) === null || _searchParams$ulb2 === void 0 ? void 0 : _searchParams$ulb2.code) : true) && (searchParams !== null && searchParams !== void 0 && searchParams.eventCategory ? event.eventCategory === (searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$eventCa = searchParams.eventCategory) === null || _searchParams$eventCa === void 0 ? void 0 : _searchParams$eventCa.code) : true) && (isValid(searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$range = searchParams.range) === null || _searchParams$range === void 0 ? void 0 : _searchParams$range.startDate) ? ((_event$eventDetails = event.eventDetails) === null || _event$eventDetails === void 0 ? void 0 : _event$eventDetails.fromDate) >= new Date(searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$range2 = searchParams.range) === null || _searchParams$range2 === void 0 ? void 0 : _searchParams$range2.startDate).getTime() : true) && (isValid(searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$range3 = searchParams.range) === null || _searchParams$range3 === void 0 ? void 0 : _searchParams$range3.endDate) ? ((_event$eventDetails2 = event.eventDetails) === null || _event$eventDetails2 === void 0 ? void 0 : _event$eventDetails2.toDate) <= new Date(searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$range4 = searchParams.range) === null || _searchParams$range4 === void 0 ? void 0 : _searchParams$range4.endDate).getTime() : true);
    }).map(event => {
      var _event$auditDetails, _event$eventDetails3, _event$eventDetails4, _event$user;
      return {
        [t("PUBLIC_BRDCST_TITLE_LABEL")]: event === null || event === void 0 ? void 0 : event.name,
        [t("EVENTS_POSTING_DATE_LABEL")]: format(new Date(event === null || event === void 0 ? void 0 : (_event$auditDetails = event.auditDetails) === null || _event$auditDetails === void 0 ? void 0 : _event$auditDetails.createdTime), 'dd/MM/yyyy'),
        [t("EVENTS_START_DATE_LABEL")]: format(new Date(event === null || event === void 0 ? void 0 : (_event$eventDetails3 = event.eventDetails) === null || _event$eventDetails3 === void 0 ? void 0 : _event$eventDetails3.fromDate), 'dd/MM/yyyy'),
        [t("EVENTS_END_DATE_LABEL")]: format(new Date(event === null || event === void 0 ? void 0 : (_event$eventDetails4 = event.eventDetails) === null || _event$eventDetails4 === void 0 ? void 0 : _event$eventDetails4.toDate), 'dd/MM/yyyy'),
        [t("EVENTS_POSTEDBY_LABEL")]: event === null || event === void 0 ? void 0 : (_event$user = event.user) === null || _event$user === void 0 ? void 0 : _event$user.name,
        [t("EVENTS_STATUS_LABEL")]: GetStatusCell$3(t(event === null || event === void 0 ? void 0 : event.status))
      };
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "inbox-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "filters-container"
  }, /*#__PURE__*/React.createElement(EventLink$1, {
    title: title,
    icon: iconName,
    links: links
  }), /*#__PURE__*/React.createElement(ApplicationCard$1, {
    t: t,
    data: getData(),
    onFilterChange: onFilterChange,
    isLoading: isLoading,
    onSearch: onSearch,
    searchParams: searchParams,
    searchFields: searchFields,
    responseData: data
  }))));
};

const Inbox$1 = ({
  tenants,
  parentRoute
}) => {
  var _searchParams$ulb;
  const {
    t
  } = useTranslation();
  Digit.SessionStorage.set("ENGAGEMENT_TENANTS", tenants);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [pageSize, setPageSize] = useState(10);
  const [pageOffset, setPageOffset] = useState(0);
  const [searchParams, setSearchParams] = useState({
    eventStatus: [],
    name: '',
    range: {
      startDate: null,
      endDate: new Date(""),
      title: ""
    },
    ulb: tenants === null || tenants === void 0 ? void 0 : tenants.find(tenant => (tenant === null || tenant === void 0 ? void 0 : tenant.code) === tenantId)
  });
  let isMobile = window.Digit.Utils.browser.isMobile();
  const {
    data,
    isLoading
  } = Digit.Hooks.events.useInbox(searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$ulb = searchParams.ulb) === null || _searchParams$ulb === void 0 ? void 0 : _searchParams$ulb.code, {}, {
    status: "ACTIVE,INACTIVE",
    eventTypes: "BROADCAST",
    limit: pageSize,
    offset: pageOffset
  }, {
    select: data => ({
      events: data === null || data === void 0 ? void 0 : data.events,
      totalCount: data === null || data === void 0 ? void 0 : data.totalCount
    })
  });
  const onSearch = params => {
    let updatedParams = {
      ...params
    };
    if (!(params !== null && params !== void 0 && params.ulb)) {
      updatedParams = {
        ...params,
        ulb: {
          code: tenantId
        }
      };
    }
    setSearchParams(prevParams => ({
      ...prevParams,
      ...updatedParams
    }));
  };
  const handleFilterChange = data => {
    setSearchParams(prevParams => ({
      ...prevParams,
      ...data
    }));
  };
  const globalSearch = (rows, columnIds) => {
    return rows === null || rows === void 0 ? void 0 : rows.filter(row => {
      var _searchParams$eventSt, _searchParams$eventSt2, _row$original, _row$original2, _row$original2$name, _searchParams$ulb2, _searchParams$ulb3, _searchParams$eventCa, _searchParams$range, _row$original$eventDe, _searchParams$range2, _searchParams$range3, _row$original$eventDe2, _searchParams$range4;
      return ((searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$eventSt = searchParams.eventStatus) === null || _searchParams$eventSt === void 0 ? void 0 : _searchParams$eventSt.length) > 0 ? searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$eventSt2 = searchParams.eventStatus) === null || _searchParams$eventSt2 === void 0 ? void 0 : _searchParams$eventSt2.includes((_row$original = row.original) === null || _row$original === void 0 ? void 0 : _row$original.status) : true) && (searchParams !== null && searchParams !== void 0 && searchParams.name ? (_row$original2 = row.original) === null || _row$original2 === void 0 ? void 0 : (_row$original2$name = _row$original2.name) === null || _row$original2$name === void 0 ? void 0 : _row$original2$name.toUpperCase().startsWith(searchParams === null || searchParams === void 0 ? void 0 : searchParams.name.toUpperCase()) : true) && (searchParams !== null && searchParams !== void 0 && (_searchParams$ulb2 = searchParams.ulb) !== null && _searchParams$ulb2 !== void 0 && _searchParams$ulb2.code ? row.original.tenantId === (searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$ulb3 = searchParams.ulb) === null || _searchParams$ulb3 === void 0 ? void 0 : _searchParams$ulb3.code) : true) && (searchParams !== null && searchParams !== void 0 && searchParams.eventCategory ? row.original.eventCategory === (searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$eventCa = searchParams.eventCategory) === null || _searchParams$eventCa === void 0 ? void 0 : _searchParams$eventCa.code) : true) && (isValid(searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$range = searchParams.range) === null || _searchParams$range === void 0 ? void 0 : _searchParams$range.startDate) ? ((_row$original$eventDe = row.original.eventDetails) === null || _row$original$eventDe === void 0 ? void 0 : _row$original$eventDe.fromDate) >= new Date(searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$range2 = searchParams.range) === null || _searchParams$range2 === void 0 ? void 0 : _searchParams$range2.startDate).getTime() : true) && (isValid(searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$range3 = searchParams.range) === null || _searchParams$range3 === void 0 ? void 0 : _searchParams$range3.endDate) ? ((_row$original$eventDe2 = row.original.eventDetails) === null || _row$original$eventDe2 === void 0 ? void 0 : _row$original$eventDe2.toDate) <= new Date(searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$range4 = searchParams.range) === null || _searchParams$range4 === void 0 ? void 0 : _searchParams$range4.endDate).getTime() : true);
    });
  };
  const getSearchFields = () => {
    return [{
      label: t("EVENTS_ULB_LABEL"),
      name: "ulb",
      type: "ulb"
    }, {
      label: t("EVENTS_MESSAGE_LABEL"),
      name: "name"
    }];
  };
  const links = [{
    text: t("NEW_PUBLIC_MESSAGE_BUTTON_LABEL"),
    link: "/digit-ui/employee/engagement/messages/inbox/create"
  }];
  const fetchNextPage = useCallback(() => {
    setPageOffset(prevPageOffSet => parseInt(prevPageOffSet) + parseInt(pageSize));
  }, [pageSize]);
  const fetchPrevPage = useCallback(() => {
    setPageOffset(prevPageOffSet => parseInt(prevPageOffSet) - parseInt(pageSize));
  }, [pageSize]);
  const handlePageSizeChange = e => {
    setPageSize(prevPageSize => e.target.value);
  };
  if (isMobile) {
    return /*#__PURE__*/React.createElement(MobileInbox$1, {
      data: data === null || data === void 0 ? void 0 : data.events,
      searchParams: searchParams,
      searchFields: getSearchFields(),
      t: t,
      onFilterChange: handleFilterChange,
      onSearch: onSearch,
      isLoading: isLoading,
      title: "EVENTS_PUBLIC_MESSAGE_NOTICE_HEADER",
      iconName: "calender",
      links: links
    });
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Header, null, t("EVENTS_PUBLIC_MESSAGE_NOTICE_HEADER"), Number(data === null || data === void 0 ? void 0 : data.length) ? /*#__PURE__*/React.createElement("p", {
    className: "inbox-count"
  }, Number(data === null || data === void 0 ? void 0 : data.length)) : null), /*#__PURE__*/React.createElement(DesktopInbox$1, {
    t: t,
    data: data === null || data === void 0 ? void 0 : data.events,
    links: links,
    parentRoute: parentRoute,
    searchParams: searchParams,
    onSearch: onSearch,
    globalSearch: globalSearch,
    searchFields: getSearchFields(),
    onFilterChange: handleFilterChange,
    pageSizeLimit: pageSize,
    totalRecords: data === null || data === void 0 ? void 0 : data.totalCount,
    currentPage: parseInt(pageOffset / pageSize),
    onNextPage: fetchNextPage,
    onPrevPage: fetchPrevPage,
    onPageSizeChange: handlePageSizeChange,
    title: "EVENTS_PUBLIC_MESSAGE_NOTICE_HEADER",
    links: links,
    isLoading: isLoading
  }));
};

const config$1 = [{
  head: "",
  body: [{
    type: "form",
    withoutLabel: true,
    component: "MessageForm",
    nextStep: "",
    route: "",
    key: "messageData"
  }]
}];

const NewEvents$1 = () => {
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("EMPLOYEE_MSG_MUTATION_HAPPENED", false);
  const [errorInfo, setErrorInfo, clearError] = Digit.Hooks.useSessionStorage("EMPLOYEE_MSG_ERROR_DATA", false);
  const [successData, setsuccessData, clearSuccessData] = Digit.Hooks.useSessionStorage("EMPLOYEE_MSG_MUTATION_SUCCESS_DATA", false);
  useEffect(() => {
    setMutationHappened(false);
    clearSuccessData();
    clearError();
  }, []);
  const onSubmit = data => {
    var _data$tenantId, _convertDateToMaximum, _convertDateToMaximum2;
    const {
      fromDate,
      toDate,
      description,
      name,
      documents
    } = data;
    const details = {
      events: [{
        recepient: null,
        source: "WEBAPP",
        eventType: "BROADCAST",
        tenantId: data === null || data === void 0 ? void 0 : (_data$tenantId = data.tenantId) === null || _data$tenantId === void 0 ? void 0 : _data$tenantId.code,
        description,
        name,
        eventDetails: {
          documents,
          fromDate: (_convertDateToMaximum = convertDateToMaximumPossibleValue(new Date(`${fromDate}`))) === null || _convertDateToMaximum === void 0 ? void 0 : _convertDateToMaximum.getTime(),
          toDate: (_convertDateToMaximum2 = convertDateToMaximumPossibleValue(new Date(`${toDate}`))) === null || _convertDateToMaximum2 === void 0 ? void 0 : _convertDateToMaximum2.getTime()
        }
      }]
    };
    history.push("/digit-ui/employee/engagement/messages/response", details);
  };
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Header, null, t("ADD_NEW_PUBLIC_MESSAGE")), /*#__PURE__*/React.createElement(FormComposer, {
    config: config$1,
    onSubmit: onSubmit,
    label: t("ACTION_ADD_NEW_MESSAGE")
  }));
};

const BannerPicker$1 = props => {
  var _props$data, _props$data$events, _props$data$events$;
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement(Banner, {
    message: t(props.message),
    applicationNumber: props === null || props === void 0 ? void 0 : (_props$data = props.data) === null || _props$data === void 0 ? void 0 : (_props$data$events = _props$data.events) === null || _props$data$events === void 0 ? void 0 : (_props$data$events$ = _props$data$events[0]) === null || _props$data$events$ === void 0 ? void 0 : _props$data$events$.name,
    successful: props.isSuccess
  });
};
const Response$1 = props => {
  const queryClient = useQueryClient();
  const {
    t
  } = useTranslation();
  const searchParams = Digit.Hooks.useQueryParams();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const mutation = Digit.Hooks.events.useCreateEvent();
  const updateEventMutation = Digit.Hooks.events.useUpdateEvent();
  const {
    state
  } = props.location;
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("EMPLOYEE_MSG_MUTATION_HAPPENED", false);
  const [successData, setsuccessData, clearSuccessData] = Digit.Hooks.useSessionStorage("EMPLOYEE_MSG_MUTATION_SUCCESS_DATA", false);
  const [errorInfo, setErrorInfo, clearError] = Digit.Hooks.useSessionStorage("EMPLOYEE_MSG_ERROR_DATA", false);
  useEffect(() => {
    if (updateEventMutation.data) setsuccessData(updateEventMutation.data);
  }, [updateEventMutation.data]);
  useEffect(() => {
    if (mutation.data) setsuccessData(mutation.data);
  }, [mutation.data]);
  const onError = (error, variables) => {
    var _error$response, _error$response$data, _error$response$data$;
    setErrorInfo((error === null || error === void 0 ? void 0 : (_error$response = error.response) === null || _error$response === void 0 ? void 0 : (_error$response$data = _error$response.data) === null || _error$response$data === void 0 ? void 0 : (_error$response$data$ = _error$response$data.Errors[0]) === null || _error$response$data$ === void 0 ? void 0 : _error$response$data$.code) || 'ERROR');
    setMutationHappened(true);
  };
  useEffect(() => {
    const onSuccess = () => {
      setMutationHappened(true);
      queryClient.clear();
    };
    if (!mutationHappened) {
      if (Boolean(searchParams === null || searchParams === void 0 ? void 0 : searchParams.delete) || Boolean(searchParams === null || searchParams === void 0 ? void 0 : searchParams.update)) {
        updateEventMutation.mutate(state, {
          onError,
          onSuccess
        });
        return;
      }
      mutation.mutate(state, {
        onError,
        onSuccess
      });
    }
  }, []);
  if (searchParams !== null && searchParams !== void 0 && searchParams.delete || searchParams !== null && searchParams !== void 0 && searchParams.update) {
    if (updateEventMutation.isLoading || updateEventMutation.isIdle && !mutationHappened) {
      return /*#__PURE__*/React.createElement(Loader, null);
    }
    return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(BannerPicker$1, {
      t: t,
      message: searchParams !== null && searchParams !== void 0 && searchParams.update ? updateEventMutation.isSuccess || successData ? 'ENGAGEMENT_PUBLIC_BRDCST_UPDATED' : 'ENG_PUBLIC_BRDCST_UPDATION_FAILED' : updateEventMutation.isSuccess || successData ? 'ENGAGEMENT_PUBLIC_BRDCST_DELETED' : 'ENGAGEMENT_PUBLIC_BRDCST_DELETION_FAILED',
      data: updateEventMutation.data || successData,
      isSuccess: (updateEventMutation === null || updateEventMutation === void 0 ? void 0 : updateEventMutation.isSuccess) || successData,
      isLoading: updateEventMutation.isIdle && !mutationHappened || updateEventMutation.isLoading
    }), /*#__PURE__*/React.createElement(CardText, null, searchParams !== null && searchParams !== void 0 && searchParams.update ? t(`ENGAGEMENT_PUBLIC_BRDCST_MESSAGES`) : t(`ENGAGEMENT_PUBLIC_BRDCST_MESSAGES`)), /*#__PURE__*/React.createElement(ActionBar, null, /*#__PURE__*/React.createElement(Link, {
      to: "/digit-ui/employee"
    }, /*#__PURE__*/React.createElement(SubmitBar, {
      label: t("CORE_COMMON_GO_TO_HOME")
    }))));
  }
  if (mutation.isLoading || mutation.isIdle && !mutationHappened) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(BannerPicker$1, {
    t: t,
    message: mutation.isSuccess || successData ? `ENGAGEMENT_BROADCAST_MESSAGE_CREATED` : `ENGAGEMENT_BROADCAST_MESSAGE_FAILED`,
    data: mutation.data || successData,
    isSuccess: mutation.isSuccess || successData,
    isLoading: mutation.isIdle && !mutationHappened || mutation.isLoading
  }), /*#__PURE__*/React.createElement(ActionBar, null, /*#__PURE__*/React.createElement(Link, {
    to: "/digit-ui/employee"
  }, /*#__PURE__*/React.createElement(SubmitBar, {
    label: t("CORE_COMMON_GO_TO_HOME")
  }))));
};

const EditMessage = () => {
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const {
    id: MessageId
  } = useParams();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const {
    isLoading,
    data
  } = Digit.Hooks.events.useInbox(tenantId, {}, {
    eventTypes: "BROADCAST",
    ids: MessageId
  }, {
    select: data => {
      var _data$events;
      return data === null || data === void 0 ? void 0 : (_data$events = data.events) === null || _data$events === void 0 ? void 0 : _data$events[0];
    }
  });
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("EMPLOYEE_MSG_MUTATION_HAPPENED", false);
  const [errorInfo, setErrorInfo, clearError] = Digit.Hooks.useSessionStorage("EMPLOYEE_MSG_ERROR_DATA", false);
  const [successData, setsuccessData, clearSuccessData] = Digit.Hooks.useSessionStorage("EMPLOYEE_MSG_MUTATION_SUCCESS_DATA", false);
  useEffect(() => {
    setMutationHappened(false);
    clearSuccessData();
    clearError();
  }, []);
  const onSubmit = formData => {
    var _formData$tenantId;
    const {
      fromDate,
      toDate,
      description,
      name,
      documents
    } = formData;
    const finalDocuments = isNestedArray(documents) ? reduceDocsArray(documents) : documents;
    const details = {
      events: [{
        ...data,
        source: "WEBAPP",
        status: "ACTIVE",
        eventType: "BROADCAST",
        tenantId: formData === null || formData === void 0 ? void 0 : (_formData$tenantId = formData.tenantId) === null || _formData$tenantId === void 0 ? void 0 : _formData$tenantId.code,
        description,
        name,
        eventDetails: {
          documents: finalDocuments,
          fromDate: handleTodaysDate(`${fromDate}`),
          toDate: handleTodaysDate(`${toDate}`)
        }
      }]
    };
    history.push("/digit-ui/employee/engagement/messages/response?update=true", details);
  };
  const defaultValues = useMemo(() => {
    var _data$eventDetails, _data$eventDetails2, _data$eventDetails3;
    const documents = data === null || data === void 0 ? void 0 : (_data$eventDetails = data.eventDetails) === null || _data$eventDetails === void 0 ? void 0 : _data$eventDetails.documents;
    return {
      name: data === null || data === void 0 ? void 0 : data.name,
      description: data === null || data === void 0 ? void 0 : data.description,
      documents: documents === null || documents === void 0 ? void 0 : documents.map(e => [e.fileName, {
        file: {
          name: e.fileName,
          type: e.documentType
        },
        fileStoreId: {
          fileStoreId: e.fileStoreId,
          tenantId
        }
      }]),
      fromDate: data ? format(new Date(data === null || data === void 0 ? void 0 : (_data$eventDetails2 = data.eventDetails) === null || _data$eventDetails2 === void 0 ? void 0 : _data$eventDetails2.fromDate), 'yyyy-MM-dd') : null,
      toDate: data ? format(new Date(data === null || data === void 0 ? void 0 : (_data$eventDetails3 = data.eventDetails) === null || _data$eventDetails3 === void 0 ? void 0 : _data$eventDetails3.toDate), 'yyyy-MM-dd') : null
    };
  }, [data]);
  if (isLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Header, null, t("EDIT_NEW_PUBLIC_MESSAGE")), /*#__PURE__*/React.createElement(FormComposer, {
    defaultValues: defaultValues,
    config: config$1,
    onSubmit: onSubmit,
    label: t("ACTION_EDIT_MESSAGE")
  }));
};

const configPTApproverApplication = ({
  t,
  action,
  approvers,
  selectedApprover,
  setSelectedApprover,
  selectFile,
  uploadedFile,
  setUploadedFile,
  assigneeLabel,
  businessService
}) => {
  var _action$assigneeRoles;
  return {
    label: {
      heading: `WF_${action === null || action === void 0 ? void 0 : action.action}_APPLICATION`,
      submit: `WF_${businessService}_${action === null || action === void 0 ? void 0 : action.action}`,
      cancel: "ES_PT_COMMON_CANCEL"
    },
    form: [{
      body: [{
        label: action.isTerminateState || (action === null || action === void 0 ? void 0 : action.action) === "SENDBACKTOCITIZEN" ? null : t(assigneeLabel || `WF_ROLE_${(_action$assigneeRoles = action.assigneeRoles) === null || _action$assigneeRoles === void 0 ? void 0 : _action$assigneeRoles[0]}`),
        type: "dropdown",
        populators: action.isTerminateState || (action === null || action === void 0 ? void 0 : action.action) === "SENDBACKTOCITIZEN" ? null : /*#__PURE__*/React.createElement(Dropdown, {
          option: approvers,
          autoComplete: "off",
          optionKey: "name",
          id: "fieldInspector",
          select: setSelectedApprover,
          selected: selectedApprover
        })
      }, {
        label: t("ES_PT_ACTION_COMMENTS"),
        type: "textarea",
        populators: {
          name: "comments"
        }
      }, {
        label: `${t("ES_PT_ATTACH_FILE")}${action.docUploadRequired ? " *" : ""}`,
        populators: /*#__PURE__*/React.createElement(UploadFile, {
          id: "workflow-doc",
          onUpload: selectFile,
          onDelete: () => {
            setUploadedFile(null);
          },
          showHint: true,
          hintText: t("PT_ATTACH_RESTRICTIONS_SIZE"),
          message: uploadedFile ? `1 ${t(`ES_PT_ACTION_FILEUPLOADED`)}` : t(`ES_PT_ACTION_NO_FILEUPLOADED`)
        })
      }]
    }]
  };
};

const configPTAssessProperty = ({
  t,
  action,
  financialYears,
  selectedFinancialYear,
  setSelectedFinancialYear
}) => {
  return {
    label: {
      heading: `WF_${action.action}_APPLICATION`,
      submit: `WF_PT.CREATE_${action.action}`,
      cancel: "ES_PT_COMMON_CANCEL"
    },
    form: [{
      body: [{
        label: t("ES_PT_FINANCIAL_YEARS"),
        isMandatory: true,
        type: "radio",
        populators: /*#__PURE__*/React.createElement(RadioButtons, {
          options: financialYears,
          optionsKey: "name",
          onSelect: setSelectedFinancialYear,
          selectedOption: selectedFinancialYear
        })
      }]
    }]
  };
};

const configTLApproverApplication = ({
  t,
  action,
  approvers,
  selectedApprover,
  setSelectedApprover,
  selectFile,
  uploadedFile,
  setUploadedFile,
  assigneeLabel,
  businessService
}) => {
  let checkCondtions = true;
  if ((action === null || action === void 0 ? void 0 : action.action) == "SENDBACKTOCITIZEN" || (action === null || action === void 0 ? void 0 : action.action) == "APPROVE") checkCondtions = false;
  if (action.isTerminateState) checkCondtions = false;
  return {
    label: {
      heading: `WF_${action === null || action === void 0 ? void 0 : action.action}_APPLICATION`,
      submit: `WF_${businessService === null || businessService === void 0 ? void 0 : businessService.toUpperCase()}_${action === null || action === void 0 ? void 0 : action.action}`,
      cancel: "WF_EMPLOYEE_NEWTL_CANCEL"
    },
    form: [{
      body: [{
        label: !checkCondtions ? null : t("WF_ASSIGNEE_NAME_LABEL"),
        placeholder: !checkCondtions ? null : t("WF_ASSIGNEE_NAME_PLACEHOLDER"),
        type: "dropdown",
        populators: !checkCondtions ? null : /*#__PURE__*/React.createElement(Dropdown, {
          option: approvers,
          autoComplete: "off",
          optionKey: "name",
          id: "fieldInspector",
          select: setSelectedApprover,
          selected: selectedApprover
        })
      }, {
        label: t("WF_COMMON_COMMENTS"),
        type: "textarea",
        populators: {
          name: "comments"
        }
      }, {
        label: t("TL_APPROVAL_CHECKLIST_BUTTON_UP_FILE"),
        populators: /*#__PURE__*/React.createElement(UploadFile, {
          id: "workflow-doc",
          onUpload: selectFile,
          onDelete: () => {
            setUploadedFile(null);
          },
          message: uploadedFile ? `1 ${t(`ES_PT_ACTION_FILEUPLOADED`)}` : t(`CS_ACTION_NO_FILEUPLOADED`)
        })
      }]
    }]
  };
};

const configBPAREGApproverApplication = ({
  t,
  action,
  approvers,
  selectedApprover,
  setSelectedApprover,
  selectFile,
  uploadedFile,
  setUploadedFile,
  assigneeLabel,
  businessService,
  error
}) => {
  let checkCondtions = true;
  if ((action === null || action === void 0 ? void 0 : action.action) == "SENDBACKTOCITIZEN") checkCondtions = false;
  if (action.isTerminateState) checkCondtions = false;
  return {
    label: {
      heading: `WF_${action === null || action === void 0 ? void 0 : action.action}_APPLICATION`,
      submit: `WF_${businessService === null || businessService === void 0 ? void 0 : businessService.toUpperCase()}_${action === null || action === void 0 ? void 0 : action.action}`,
      cancel: "WF_EMPLOYEE_BPAREG_CANCEL"
    },
    form: [{
      body: [{
        label: !checkCondtions ? null : t("WF_ASSIGNEE_NAME_LABEL"),
        placeholder: !checkCondtions ? null : t("WF_ASSIGNEE_NAME_PLACEHOLDER"),
        type: "dropdown",
        populators: !checkCondtions ? null : /*#__PURE__*/React.createElement(Dropdown, {
          option: approvers,
          autoComplete: "off",
          optionKey: "name",
          id: "fieldInspector",
          select: setSelectedApprover,
          selected: selectedApprover
        })
      }, {
        label: t("WF_COMMON_COMMENTS"),
        type: "textarea",
        populators: {
          name: "comments"
        }
      }, {
        label: t("BPA_APPROVAL_CHECKLIST_BUTTON_UP_FILE"),
        populators: /*#__PURE__*/React.createElement(UploadFile, {
          id: "workflow-doc",
          onUpload: selectFile,
          onDelete: () => {
            setUploadedFile(null);
          },
          message: uploadedFile ? `1 ${t(`ES_PT_ACTION_FILEUPLOADED`)}` : t(`CS_ACTION_NO_FILEUPLOADED`),
          accept: "image/*, .pdf, .png, .jpeg, .jpg",
          iserror: error
        })
      }]
    }]
  };
};

const configBPAApproverApplication = ({
  t,
  action,
  approvers,
  selectedApprover,
  setSelectedApprover,
  selectFile,
  uploadedFile,
  setUploadedFile,
  assigneeLabel,
  businessService,
  error
}) => {
  var _action$assigneeRoles;
  let isRejectOrRevocate = false;
  if ((action === null || action === void 0 ? void 0 : action.action) == "REVOCATE" || (action === null || action === void 0 ? void 0 : action.action) == "REJECT" || action.action == "SKIP_PAYMENT" || (action === null || action === void 0 ? void 0 : action.action) == "SEND_BACK_TO_CITIZEN" || (action === null || action === void 0 ? void 0 : action.action) == "APPROVE") {
    isRejectOrRevocate = true;
  }
  let isCommentRequired = false;
  if ((action === null || action === void 0 ? void 0 : action.action) == "REVOCATE" || (action === null || action === void 0 ? void 0 : action.action) == "REJECT") {
    isCommentRequired = true;
  }
  return {
    label: {
      heading: `WF_${action === null || action === void 0 ? void 0 : action.action}_APPLICATION`,
      submit: `WF_${businessService}_${action === null || action === void 0 ? void 0 : action.action}`,
      cancel: "BPA_CITIZEN_CANCEL_BUTTON"
    },
    form: [{
      body: [{
        label: action.isTerminateState || isRejectOrRevocate ? null : t(assigneeLabel || `WF_ROLE_${(_action$assigneeRoles = action.assigneeRoles) === null || _action$assigneeRoles === void 0 ? void 0 : _action$assigneeRoles[0]}`),
        type: "dropdown",
        populators: action.isTerminateState || isRejectOrRevocate ? null : /*#__PURE__*/React.createElement(Dropdown, {
          option: approvers,
          autoComplete: "off",
          optionKey: "name",
          id: "fieldInspector",
          select: setSelectedApprover,
          selected: selectedApprover
        })
      }, {
        label: t("WF_COMMON_COMMENTS"),
        type: "textarea",
        isMandatory: isCommentRequired,
        populators: {
          name: "comments"
        }
      }, {
        label: `${t("WF_APPROVAL_UPLOAD_HEAD")}`,
        populators: /*#__PURE__*/React.createElement(UploadFile, {
          id: "workflow-doc",
          onUpload: selectFile,
          onDelete: () => {
            setUploadedFile(null);
          },
          message: uploadedFile ? `1 ${t(`ES_PT_ACTION_FILEUPLOADED`)}` : t(`CS_ACTION_NO_FILEUPLOADED`),
          accept: "image/*, .pdf, .png, .jpeg, .jpg",
          iserror: error
        })
      }]
    }]
  };
};

const configNOCApproverApplication = ({
  t,
  action,
  approvers,
  selectedApprover,
  setSelectedApprover,
  selectFile,
  uploadedFile,
  setUploadedFile,
  assigneeLabel,
  businessService,
  error
}) => {
  var _action$assigneeRoles;
  let isCommentRequired = false;
  if ((action === null || action === void 0 ? void 0 : action.action) == "REVOCATE" || (action === null || action === void 0 ? void 0 : action.action) == "REJECT") {
    isCommentRequired = true;
  }
  let isRejectOrRevocate = false;
  if ((action === null || action === void 0 ? void 0 : action.action) == "APPROVE" || (action === null || action === void 0 ? void 0 : action.action) == "REJECT" || action.action == "AUTO_APPROVE" || action.action == "AUTO_REJECT") {
    isRejectOrRevocate = true;
  }
  return {
    label: {
      heading: `WF_${action === null || action === void 0 ? void 0 : action.action}_APPLICATION`,
      submit: `WF_${businessService}_${action === null || action === void 0 ? void 0 : action.action}`,
      cancel: "CORE_LOGOUTPOPUP_CANCEL"
    },
    form: [{
      body: [{
        label: action.isTerminateState || isRejectOrRevocate ? null : t(assigneeLabel || `WF_ROLE_${(_action$assigneeRoles = action.assigneeRoles) === null || _action$assigneeRoles === void 0 ? void 0 : _action$assigneeRoles[0]}`),
        type: "dropdown",
        populators: action.isTerminateState || isRejectOrRevocate ? null : /*#__PURE__*/React.createElement(Dropdown, {
          option: approvers,
          autoComplete: "off",
          optionKey: "name",
          id: "fieldInspector",
          select: setSelectedApprover,
          selected: selectedApprover
        })
      }, {
        label: t("WF_COMMON_COMMENTS"),
        type: "textarea",
        isMandatory: isCommentRequired,
        populators: {
          name: "comments"
        }
      }, {
        label: `${t("WF_APPROVAL_UPLOAD_HEAD")}`,
        populators: /*#__PURE__*/React.createElement(UploadFile, {
          id: "workflow-doc",
          onUpload: selectFile,
          onDelete: () => {
            setUploadedFile(null);
          },
          showHint: true,
          message: uploadedFile ? `1 ${t(`ES_PT_ACTION_FILEUPLOADED`)}` : t(`CS_ACTION_NO_FILEUPLOADED`),
          accept: "image/*, .pdf, .png, .jpeg, .jpg",
          iserror: error
        })
      }]
    }]
  };
};

const configWSApproverApplication = ({
  t,
  action,
  approvers,
  selectedApprover,
  setSelectedApprover,
  selectFile,
  uploadedFile,
  setUploadedFile,
  assigneeLabel,
  businessService,
  error
}) => {
  var _action$action;
  let checkCondtions = true;
  if (action !== null && action !== void 0 && (_action$action = action.action) !== null && _action$action !== void 0 && _action$action.includes("SEND_BACK") || (action === null || action === void 0 ? void 0 : action.action) == "APPROVE_FOR_CONNECTION") checkCondtions = false;
  if (action.isTerminateState) checkCondtions = false;
  return {
    label: {
      heading: `WF_${action === null || action === void 0 ? void 0 : action.action}_APPLICATION`,
      submit: `WF_${businessService === null || businessService === void 0 ? void 0 : businessService.toUpperCase()}_${action === null || action === void 0 ? void 0 : action.action}`,
      cancel: "CS_COMMON_CANCEL"
    },
    form: [{
      body: [{
        label: !checkCondtions ? null : t("WF_ASSIGNEE_NAME_LABEL"),
        placeholder: !checkCondtions ? null : t("WF_ASSIGNEE_NAME_PLACEHOLDER"),
        type: "dropdown",
        populators: !checkCondtions ? null : /*#__PURE__*/React.createElement(Dropdown, {
          option: approvers,
          autoComplete: "off",
          optionKey: "name",
          id: "fieldInspector",
          select: setSelectedApprover,
          selected: selectedApprover
        })
      }, {
        label: t("WF_COMMON_COMMENTS"),
        type: "textarea",
        populators: {
          name: "comments"
        }
      }, {
        label: t("WS_APPROVAL_CHECKLIST_BUTTON_UP_FILE"),
        populators: /*#__PURE__*/React.createElement(UploadFile, {
          id: "workflow-doc",
          accept: ".jpg,.pdf,.png,.jpeg",
          onUpload: selectFile,
          onDelete: () => {
            setUploadedFile(null);
          },
          message: uploadedFile ? `1 ${t(`ES_PT_ACTION_FILEUPLOADED`)}` : t(`CS_ACTION_NO_FILEUPLOADED`),
          error: error,
          iserror: error,
          showHintBelow: true,
          hintText: "WS_HINT_TEXT_LABEL"
        })
      }]
    }]
  };
};

const configWSDisConnectApplication = ({
  t,
  action,
  approvers,
  selectedApprover,
  setSelectedApprover,
  selectFile,
  uploadedFile,
  setUploadedFile,
  assigneeLabel,
  businessService,
  error
}) => {
  var _action$action;
  let checkCondtions = true,
    isDatePickerDisplay = false;
  if (action !== null && action !== void 0 && (_action$action = action.action) !== null && _action$action !== void 0 && _action$action.includes("SEND_BACK") || (action === null || action === void 0 ? void 0 : action.action) == "APPROVE_FOR_DISCONNECTION" || (action === null || action === void 0 ? void 0 : action.action) == "RESUBMIT_APPLICATION") checkCondtions = false;
  if (action.isTerminateState) checkCondtions = false;
  if ((action === null || action === void 0 ? void 0 : action.action) == "EXECUTE_DISCONNECTION" || (action === null || action === void 0 ? void 0 : action.action) == "DISCONNECTION_EXECUTED") isDatePickerDisplay = true;
  return {
    label: {
      heading: `WF_${action === null || action === void 0 ? void 0 : action.action}_APPLICATION`,
      submit: `WF_${businessService === null || businessService === void 0 ? void 0 : businessService.toUpperCase()}_${action === null || action === void 0 ? void 0 : action.action}`,
      cancel: "CS_COMMON_CANCEL"
    },
    form: [{
      body: [{
        label: !checkCondtions ? null : t("WF_ASSIGNEE_NAME_LABEL"),
        placeholder: !checkCondtions ? null : t("WF_ASSIGNEE_NAME_PLACEHOLDER"),
        type: "dropdown",
        populators: !checkCondtions ? null : /*#__PURE__*/React.createElement(Dropdown, {
          option: approvers,
          autoComplete: "off",
          optionKey: "name",
          id: "fieldInspector",
          select: setSelectedApprover,
          selected: selectedApprover
        })
      }, isDatePickerDisplay && {
        label: t("ES_FSM_ACTION_SERVICE_DATE"),
        isMandatory: isDatePickerDisplay ? true : false,
        type: "custom",
        populators: isDatePickerDisplay ? {
          name: "date",
          validation: {
            required: true
          },
          defaultValue: Digit.Utils.date.getDate(),
          component: (props, customProps) => /*#__PURE__*/React.createElement(DatePicker, Object.assign({
            onChange: props.onChange,
            date: props.value
          }, customProps))
        } : null
      }, {
        label: t("WF_COMMON_COMMENTS"),
        type: "textarea",
        populators: {
          name: "comments"
        }
      }, {
        label: t("WS_APPROVAL_CHECKLIST_BUTTON_UP_FILE"),
        populators: /*#__PURE__*/React.createElement(UploadFile, {
          id: "workflow-doc",
          accept: ".jpg,.pdf,.png,.jpeg",
          onUpload: selectFile,
          onDelete: () => {
            setUploadedFile(null);
          },
          message: uploadedFile ? `1 ${t(`ES_PT_ACTION_FILEUPLOADED`)}` : t(`CS_ACTION_NO_FILEUPLOADED`),
          error: error,
          iserror: error,
          showHintBelow: true,
          hintText: "WS_HINT_TEXT_LABEL"
        })
      }]
    }]
  };
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
    className: "icon-bg-secondary",
    onClick: props.onClick
  }, /*#__PURE__*/React.createElement(Close, null));
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
  applicationData,
  businessService,
  moduleCode
}) => {
  var _action$assigneeRoles, _action$assigneeRoles2;
  const {
    data: approverData,
    isLoading: PTALoading
  } = Digit.Hooks.useEmployeeSearch(tenantId, {
    roles: action === null || action === void 0 ? void 0 : (_action$assigneeRoles = action.assigneeRoles) === null || _action$assigneeRoles === void 0 ? void 0 : (_action$assigneeRoles2 = _action$assigneeRoles.map) === null || _action$assigneeRoles2 === void 0 ? void 0 : _action$assigneeRoles2.call(_action$assigneeRoles, e => ({
      code: e
    })),
    isActive: true
  }, {
    enabled: !(action !== null && action !== void 0 && action.isTerminateState)
  });
  const {
    isLoading: financialYearsLoading,
    data: financialYearsData
  } = Digit.Hooks.pt.useMDMS(tenantId, businessService, "FINANCIAL_YEARLS", {}, {
    details: {
      tenantId: Digit.ULBService.getStateId(),
      moduleDetails: [{
        moduleName: "egf-master",
        masterDetails: [{
          name: "FinancialYear",
          filter: "[?(@.module == 'PT')]"
        }]
      }]
    }
  });
  const [config, setConfig] = useState({});
  const [defaultValues, setDefaultValues] = useState({});
  const [approvers, setApprovers] = useState([]);
  const [selectedApprover, setSelectedApprover] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState(null);
  const [financialYears, setFinancialYears] = useState([]);
  const [selectedFinancialYear, setSelectedFinancialYear] = useState(null);
  const [disableActionSubmit, setDisableActionSubmit] = useState(false);
  useEffect(() => {
    if (financialYearsData && financialYearsData["egf-master"]) {
      var _financialYearsData$e;
      setFinancialYears((_financialYearsData$e = financialYearsData["egf-master"]) === null || _financialYearsData$e === void 0 ? void 0 : _financialYearsData$e["FinancialYear"]);
    }
  }, [financialYearsData]);
  useEffect(() => {
    var _approverData$Employe;
    setApprovers(approverData === null || approverData === void 0 ? void 0 : (_approverData$Employe = approverData.Employees) === null || _approverData$Employe === void 0 ? void 0 : _approverData$Employe.map(employee => {
      var _employee$user;
      return {
        uuid: employee === null || employee === void 0 ? void 0 : employee.uuid,
        name: employee === null || employee === void 0 ? void 0 : (_employee$user = employee.user) === null || _employee$user === void 0 ? void 0 : _employee$user.name
      };
    }));
  }, [approverData]);
  function selectFile(e) {
    setFile(e.target.files[0]);
  }
  useEffect(() => {
    (async () => {
      setError(null);
      if (file) {
        if (file.size >= 5242880) {
          setError(t("CS_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            var _response$data, _response$data$files;
            const response = await Digit.UploadServices.Filestorage("PT", file, Digit.ULBService.getStateId());
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
  function submit(data) {
    if (!(action !== null && action !== void 0 && action.showFinancialYearsModal)) {
      let workflow = {
        action: action === null || action === void 0 ? void 0 : action.action,
        comment: data === null || data === void 0 ? void 0 : data.comments,
        businessService,
        moduleName: moduleCode
      };
      workflow["assignes"] = action !== null && action !== void 0 && action.isTerminateState || !selectedApprover ? [] : [selectedApprover];
      if (uploadedFile) workflow["documents"] = [{
        documentType: (action === null || action === void 0 ? void 0 : action.action) + " DOC",
        fileName: file === null || file === void 0 ? void 0 : file.name,
        fileStoreId: uploadedFile
      }];
      submitAction({
        Property: {
          ...applicationData,
          workflow
        }
      });
    } else {
      submitAction({
        customFunctionToExecute: action === null || action === void 0 ? void 0 : action.customFunctionToExecute,
        Assessment: {
          financialYear: selectedFinancialYear === null || selectedFinancialYear === void 0 ? void 0 : selectedFinancialYear.name,
          propertyId: applicationData === null || applicationData === void 0 ? void 0 : applicationData.propertyId,
          tenantId,
          source: applicationData === null || applicationData === void 0 ? void 0 : applicationData.source,
          channel: applicationData === null || applicationData === void 0 ? void 0 : applicationData.channel,
          assessmentDate: Date.now()
        }
      });
    }
  }
  useEffect(() => {
    if (action) {
      if (action !== null && action !== void 0 && action.showFinancialYearsModal) {
        setConfig(configPTAssessProperty({
          t,
          action,
          financialYears,
          selectedFinancialYear,
          setSelectedFinancialYear
        }));
      } else {
        setConfig(configPTApproverApplication({
          t,
          action,
          approvers,
          selectedApprover,
          setSelectedApprover,
          selectFile,
          uploadedFile,
          setUploadedFile,
          businessService
        }));
      }
    }
  }, [action, approvers, financialYears, selectedFinancialYear, uploadedFile]);
  return action && config.form ? /*#__PURE__*/React.createElement(Modal, {
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
    isDisabled: !action.showFinancialYearsModal ? PTALoading || (action === null || action === void 0 ? void 0 : action.docUploadRequired) && !uploadedFile : !selectedFinancialYear,
    formId: "modal-action"
  }, financialYearsLoading ? /*#__PURE__*/React.createElement(Loader, null) : /*#__PURE__*/React.createElement(FormComposer, {
    config: config.form,
    noBoxShadow: true,
    inline: true,
    childrenAtTheBottom: true,
    onSubmit: submit,
    defaultValues: defaultValues,
    formId: "modal-action"
  })) : /*#__PURE__*/React.createElement(Loader, null);
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
const ActionModal$1 = ({
  t,
  action,
  tenantId,
  state,
  id,
  closeModal,
  submitAction,
  actionData,
  applicationData,
  businessService,
  moduleCode
}) => {
  var _action$assigneeRoles, _action$assigneeRoles2;
  const {
    data: approverData,
    isLoading: PTALoading
  } = Digit.Hooks.useEmployeeSearch(tenantId, {
    roles: action === null || action === void 0 ? void 0 : (_action$assigneeRoles = action.assigneeRoles) === null || _action$assigneeRoles === void 0 ? void 0 : (_action$assigneeRoles2 = _action$assigneeRoles.map) === null || _action$assigneeRoles2 === void 0 ? void 0 : _action$assigneeRoles2.call(_action$assigneeRoles, e => ({
      code: e
    })),
    isActive: true
  }, {
    enabled: !(action !== null && action !== void 0 && action.isTerminateState)
  });
  const {
    isLoading: financialYearsLoading,
    data: financialYearsData
  } = Digit.Hooks.pt.useMDMS(tenantId, businessService, "FINANCIAL_YEARLS", {}, {
    details: {
      tenantId: Digit.ULBService.getStateId(),
      moduleDetails: [{
        moduleName: "egf-master",
        masterDetails: [{
          name: "FinancialYear",
          filter: "[?(@.module == 'TL')]"
        }]
      }]
    }
  });
  const [config, setConfig] = useState({});
  const [defaultValues, setDefaultValues] = useState({});
  const [approvers, setApprovers] = useState([]);
  const [selectedApprover, setSelectedApprover] = useState({});
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState(null);
  const [financialYears, setFinancialYears] = useState([]);
  const [selectedFinancialYear, setSelectedFinancialYear] = useState(null);
  useEffect(() => {
    if (financialYearsData && financialYearsData["egf-master"]) {
      var _financialYearsData$e;
      setFinancialYears((_financialYearsData$e = financialYearsData["egf-master"]) === null || _financialYearsData$e === void 0 ? void 0 : _financialYearsData$e["FinancialYear"]);
    }
  }, [financialYearsData]);
  useEffect(() => {
    var _approverData$Employe;
    setApprovers(approverData === null || approverData === void 0 ? void 0 : (_approverData$Employe = approverData.Employees) === null || _approverData$Employe === void 0 ? void 0 : _approverData$Employe.map(employee => {
      var _employee$user;
      return {
        uuid: employee === null || employee === void 0 ? void 0 : employee.uuid,
        name: employee === null || employee === void 0 ? void 0 : (_employee$user = employee.user) === null || _employee$user === void 0 ? void 0 : _employee$user.name
      };
    }));
  }, [approverData]);
  function selectFile(e) {
    setFile(e.target.files[0]);
  }
  useEffect(() => {
    (async () => {
      setError(null);
      if (file) {
        if (file.size >= 5242880) {
          setError(t("CS_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            var _response$data, _response$data$files;
            const response = await Digit.UploadServices.Filestorage("PT", file, Digit.ULBService.getStateId());
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
  function submit(data) {
    applicationData = {
      ...applicationData,
      action: action === null || action === void 0 ? void 0 : action.action,
      comment: data === null || data === void 0 ? void 0 : data.comments,
      assignee: !(selectedApprover !== null && selectedApprover !== void 0 && selectedApprover.uuid) ? null : [selectedApprover === null || selectedApprover === void 0 ? void 0 : selectedApprover.uuid],
      wfDocuments: uploadedFile ? [{
        documentType: (action === null || action === void 0 ? void 0 : action.action) + " DOC",
        fileName: file === null || file === void 0 ? void 0 : file.name,
        fileStoreId: uploadedFile
      }] : null
    };
    submitAction({
      Licenses: [applicationData]
    });
  }
  useEffect(() => {
    if (action) {
      setConfig(configTLApproverApplication({
        t,
        action,
        approvers,
        selectedApprover,
        setSelectedApprover,
        selectFile,
        uploadedFile,
        setUploadedFile,
        businessService
      }));
    }
  }, [action, approvers, financialYears, selectedFinancialYear, uploadedFile]);
  return action && config.form ? /*#__PURE__*/React.createElement(Modal, {
    headerBarMain: /*#__PURE__*/React.createElement(Heading$1, {
      label: t(config.label.heading)
    }),
    headerBarEnd: /*#__PURE__*/React.createElement(CloseBtn$1, {
      onClick: closeModal
    }),
    actionCancelLabel: t(config.label.cancel),
    actionCancelOnSubmit: closeModal,
    actionSaveLabel: t(config.label.submit),
    actionSaveOnSubmit: () => {},
    formId: "modal-action"
  }, financialYearsLoading ? /*#__PURE__*/React.createElement(Loader, null) : /*#__PURE__*/React.createElement(FormComposer, {
    config: config.form,
    noBoxShadow: true,
    inline: true,
    childrenAtTheBottom: true,
    onSubmit: submit,
    defaultValues: defaultValues,
    formId: "modal-action"
  })) : /*#__PURE__*/React.createElement(Loader, null);
};

const Heading$2 = props => {
  return /*#__PURE__*/React.createElement("h1", {
    style: {
      marginLeft: "22px"
    },
    className: "heading-m BPAheading-m"
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
const ActionModal$2 = ({
  t,
  action,
  tenantId,
  state,
  id,
  closeModal,
  submitAction,
  actionData,
  applicationData,
  businessService,
  moduleCode
}) => {
  var _action$assigneeRoles, _action$assigneeRoles2;
  const {
    data: approverData,
    isLoading: PTALoading
  } = Digit.Hooks.useEmployeeSearch(tenantId, {
    roles: action === null || action === void 0 ? void 0 : (_action$assigneeRoles = action.assigneeRoles) === null || _action$assigneeRoles === void 0 ? void 0 : (_action$assigneeRoles2 = _action$assigneeRoles.map) === null || _action$assigneeRoles2 === void 0 ? void 0 : _action$assigneeRoles2.call(_action$assigneeRoles, e => ({
      code: e
    })),
    isActive: true
  }, {
    enabled: !(action !== null && action !== void 0 && action.isTerminateState)
  });
  const [config, setConfig] = useState({});
  const [defaultValues, setDefaultValues] = useState({});
  const [approvers, setApprovers] = useState([]);
  const [selectedApprover, setSelectedApprover] = useState({});
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState(null);
  const mobileView = Digit.Utils.browser.isMobile() ? true : false;
  useEffect(() => {
    var _approverData$Employe;
    setApprovers(approverData === null || approverData === void 0 ? void 0 : (_approverData$Employe = approverData.Employees) === null || _approverData$Employe === void 0 ? void 0 : _approverData$Employe.map(employee => {
      var _employee$user;
      return {
        uuid: employee === null || employee === void 0 ? void 0 : employee.uuid,
        name: employee === null || employee === void 0 ? void 0 : (_employee$user = employee.user) === null || _employee$user === void 0 ? void 0 : _employee$user.name
      };
    }));
  }, [approverData]);
  function selectFile(e) {
    setFile(e.target.files[0]);
  }
  useEffect(() => {
    (async () => {
      setError(null);
      if (file) {
        const allowedFileTypesRegex = /(.*?)(jpg|jpeg|png|image|pdf)$/i;
        if (file.size >= 5242880) {
          setError(t("CS_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else if (file !== null && file !== void 0 && file.type && !allowedFileTypesRegex.test(file === null || file === void 0 ? void 0 : file.type)) {
          setError(t(`NOT_SUPPORTED_FILE_TYPE`));
        } else {
          try {
            var _response$data, _response$data$files;
            const response = await Digit.UploadServices.Filestorage("OBPS", file, Digit.ULBService.getStateId() || (tenantId === null || tenantId === void 0 ? void 0 : tenantId.split(".")[0]));
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
  function submit(data) {
    applicationData = {
      ...applicationData,
      action: action === null || action === void 0 ? void 0 : action.action,
      comment: data === null || data === void 0 ? void 0 : data.comments,
      assignee: !(selectedApprover !== null && selectedApprover !== void 0 && selectedApprover.uuid) ? null : [selectedApprover === null || selectedApprover === void 0 ? void 0 : selectedApprover.uuid],
      wfDocuments: uploadedFile ? [{
        documentType: (action === null || action === void 0 ? void 0 : action.action) + " DOC",
        fileName: file === null || file === void 0 ? void 0 : file.name,
        fileStoreId: uploadedFile
      }] : null
    };
    submitAction({
      Licenses: [applicationData]
    }, false, {
      isStakeholder: true,
      bpa: false
    });
  }
  useEffect(() => {
    if (action) {
      setConfig(configBPAREGApproverApplication({
        t,
        action,
        approvers,
        selectedApprover,
        setSelectedApprover,
        selectFile,
        uploadedFile,
        setUploadedFile,
        businessService,
        error
      }));
    }
  }, [action, approvers, uploadedFile, error]);
  return action && config.form ? /*#__PURE__*/React.createElement(Modal, {
    headerBarMain: /*#__PURE__*/React.createElement(Heading$2, {
      label: t(config.label.heading)
    }),
    headerBarEnd: /*#__PURE__*/React.createElement(CloseBtn$2, {
      onClick: closeModal
    }),
    actionCancelLabel: t(config.label.cancel),
    actionCancelOnSubmit: closeModal,
    actionSaveLabel: t(config.label.submit),
    actionSaveOnSubmit: () => {},
    formId: "modal-action",
    isOBPSFlow: true,
    popupStyles: mobileView ? {
      width: "720px"
    } : {},
    style: !mobileView ? {
      height: "45px",
      width: "107px",
      paddingLeft: "0px",
      paddingRight: "0px"
    } : {
      height: "45px",
      width: "44%"
    },
    popupModuleMianStyles: mobileView ? {
      paddingLeft: "5px"
    } : {}
  }, PTALoading ? /*#__PURE__*/React.createElement(Loader, null) : /*#__PURE__*/React.createElement(FormComposer, {
    config: config.form,
    cardStyle: {
      marginLeft: "0px",
      marginRight: "0px",
      marginTop: "-25px"
    },
    className: "BPAemployeeCard",
    noBoxShadow: true,
    inline: true,
    childrenAtTheBottom: true,
    onSubmit: submit,
    defaultValues: defaultValues,
    formId: "modal-action"
  })) : /*#__PURE__*/React.createElement(Loader, null);
};

const Heading$3 = props => {
  return /*#__PURE__*/React.createElement("h1", {
    style: {
      marginLeft: "22px"
    },
    className: "heading-m BPAheading-m"
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
const ActionModal$3 = ({
  t,
  action,
  tenantId,
  state,
  id,
  closeModal,
  submitAction,
  actionData,
  applicationDetails,
  applicationData,
  businessService,
  moduleCode,
  workflowDetails
}) => {
  var _applicationData, _applicationData$land, _applicationData$land2, _applicationData2, _applicationData2$lan, _applicationData2$lan2, _workflowDetails$data, _workflowDetails$data2, _workflowDetails$data3, _workflowDetails$data4, _workflowDetails$data5, _workflowDetails$data6;
  const mutation1 = Digit.Hooks.obps.useObpsAPI((_applicationData = applicationData) !== null && _applicationData !== void 0 && (_applicationData$land = _applicationData.landInfo) !== null && _applicationData$land !== void 0 && (_applicationData$land2 = _applicationData$land.address) !== null && _applicationData$land2 !== void 0 && _applicationData$land2.city ? (_applicationData2 = applicationData) === null || _applicationData2 === void 0 ? void 0 : (_applicationData2$lan = _applicationData2.landInfo) === null || _applicationData2$lan === void 0 ? void 0 : (_applicationData2$lan2 = _applicationData2$lan.address) === null || _applicationData2$lan2 === void 0 ? void 0 : _applicationData2$lan2.city : tenantId, false);
  const {
    data: approverData,
    isLoading: PTALoading
  } = Digit.Hooks.useEmployeeSearch(tenantId, {
    roles: workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data = workflowDetails.data) === null || _workflowDetails$data === void 0 ? void 0 : (_workflowDetails$data2 = _workflowDetails$data.initialActionState) === null || _workflowDetails$data2 === void 0 ? void 0 : (_workflowDetails$data3 = _workflowDetails$data2.nextActions) === null || _workflowDetails$data3 === void 0 ? void 0 : (_workflowDetails$data4 = _workflowDetails$data3.filter(ele => (ele === null || ele === void 0 ? void 0 : ele.action) == (action === null || action === void 0 ? void 0 : action.action))) === null || _workflowDetails$data4 === void 0 ? void 0 : (_workflowDetails$data5 = _workflowDetails$data4[0]) === null || _workflowDetails$data5 === void 0 ? void 0 : (_workflowDetails$data6 = _workflowDetails$data5.assigneeRoles) === null || _workflowDetails$data6 === void 0 ? void 0 : _workflowDetails$data6.map(role => ({
      code: role
    })),
    isActive: true
  }, {
    enabled: !(action !== null && action !== void 0 && action.isTerminateState)
  });
  const queryClient = useQueryClient();
  const [config, setConfig] = useState({});
  const [defaultValues, setDefaultValues] = useState({});
  const [approvers, setApprovers] = useState([]);
  const [selectedApprover, setSelectedApprover] = useState({});
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState(null);
  const [selectedFinancialYear, setSelectedFinancialYear] = useState(null);
  const mobileView = Digit.Utils.browser.isMobile() ? true : false;
  useEffect(() => {
    var _approverData$Employe;
    setApprovers(approverData === null || approverData === void 0 ? void 0 : (_approverData$Employe = approverData.Employees) === null || _approverData$Employe === void 0 ? void 0 : _approverData$Employe.map(employee => {
      var _employee$user;
      return {
        uuid: employee === null || employee === void 0 ? void 0 : employee.uuid,
        name: employee === null || employee === void 0 ? void 0 : (_employee$user = employee.user) === null || _employee$user === void 0 ? void 0 : _employee$user.name
      };
    }));
  }, [approverData]);
  function selectFile(e) {
    setFile(e.target.files[0]);
  }
  useEffect(() => {
    (async () => {
      setError(null);
      if (file) {
        const allowedFileTypesRegex = /(.*?)(jpg|jpeg|png|image|pdf)$/i;
        if (file.size >= 5242880) {
          setError(t("CS_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else if (file !== null && file !== void 0 && file.type && !allowedFileTypesRegex.test(file === null || file === void 0 ? void 0 : file.type)) {
          setError(t(`NOT_SUPPORTED_FILE_TYPE`));
        } else {
          try {
            var _response$data, _response$data$files;
            const response = await Digit.UploadServices.Filestorage("OBPS", file, Digit.ULBService.getStateId() || (tenantId === null || tenantId === void 0 ? void 0 : tenantId.split(".")[0]));
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
  const getInspectionDocs = docs => {
    let refinedDocs = [];
    docs && docs.map((doc, ind) => {
      refinedDocs.push({
        "documentType": (doc.documentType + "_" + doc.documentType.split("_")[1]).replaceAll("_", "."),
        "fileStoreId": doc.fileStoreId,
        "fileStore": doc.fileStoreId,
        "fileName": "",
        "dropDownValues": {
          "value": (doc.documentType + "_" + doc.documentType.split("_")[1]).replaceAll("_", ".")
        }
      });
    });
    return refinedDocs;
  };
  const getQuestion = data => {
    let refinedQues = [];
    var i;
    for (i = 0; i < (data === null || data === void 0 ? void 0 : data.questionLength); i++) {
      var _data;
      refinedQues.push({
        "remarks": data[`Remarks_${i}`],
        "question": data === null || data === void 0 ? void 0 : data.questionList[i].question,
        "value": data === null || data === void 0 ? void 0 : (_data = data[`question_${i}`]) === null || _data === void 0 ? void 0 : _data.code
      });
    }
    return refinedQues;
  };
  const getfeildInspection = data => {
    var _data$additionalDetai, _data$additionalDetai2;
    let formdata = [],
      inspectionOb = [];
    if ((data === null || data === void 0 ? void 0 : (_data$additionalDetai = data.additionalDetails) === null || _data$additionalDetai === void 0 ? void 0 : (_data$additionalDetai2 = _data$additionalDetai.fieldinspection_pending) === null || _data$additionalDetai2 === void 0 ? void 0 : _data$additionalDetai2.length) > 0) {
      var _data$additionalDetai3;
      inspectionOb = data === null || data === void 0 ? void 0 : (_data$additionalDetai3 = data.additionalDetails) === null || _data$additionalDetai3 === void 0 ? void 0 : _data$additionalDetai3.fieldinspection_pending;
    }
    if (data.status == "FIELDINSPECTION_INPROGRESS") {
      var _formdata;
      formdata = JSON.parse(sessionStorage.getItem("INSPECTION_DATA"));
      ((_formdata = formdata) === null || _formdata === void 0 ? void 0 : _formdata.length) > 0 && formdata.map((ob, ind) => {
        inspectionOb.push({
          docs: getInspectionDocs(ob.Documents),
          date: ob.InspectionDate,
          questions: getQuestion(ob),
          time: ob === null || ob === void 0 ? void 0 : ob.InspectionTime
        });
      });
      inspectionOb = inspectionOb.filter(ob => ob.docs && ob.docs.length > 0);
    } else {
      sessionStorage.removeItem("INSPECTION_DATA");
    }
    let fieldinspection_pending = [...inspectionOb];
    return fieldinspection_pending;
  };
  const getDocuments = applicationData => {
    let documentsformdata = JSON.parse(sessionStorage.getItem("BPA_DOCUMENTS"));
    let documentList = [];
    documentsformdata.map(doc => {
      var _doc$uploadedDocument, _doc$uploadedDocument2, _doc$uploadedDocument3, _doc$uploadedDocument4, _doc$uploadedDocument5, _doc$newUploadedDocs;
      if ((doc === null || doc === void 0 ? void 0 : (_doc$uploadedDocument = doc.uploadedDocuments) === null || _doc$uploadedDocument === void 0 ? void 0 : (_doc$uploadedDocument2 = _doc$uploadedDocument[0]) === null || _doc$uploadedDocument2 === void 0 ? void 0 : (_doc$uploadedDocument3 = _doc$uploadedDocument2.values) === null || _doc$uploadedDocument3 === void 0 ? void 0 : _doc$uploadedDocument3.length) > 0) documentList = [...documentList, ...(doc === null || doc === void 0 ? void 0 : (_doc$uploadedDocument4 = doc.uploadedDocuments) === null || _doc$uploadedDocument4 === void 0 ? void 0 : (_doc$uploadedDocument5 = _doc$uploadedDocument4[0]) === null || _doc$uploadedDocument5 === void 0 ? void 0 : _doc$uploadedDocument5.values)];
      if ((doc === null || doc === void 0 ? void 0 : (_doc$newUploadedDocs = doc.newUploadedDocs) === null || _doc$newUploadedDocs === void 0 ? void 0 : _doc$newUploadedDocs.length) > 0) documentList = [...documentList, ...(doc === null || doc === void 0 ? void 0 : doc.newUploadedDocs)];
    });
    return documentList;
  };
  const getPendingApprovals = () => {
    var _result;
    const approvals = Digit.SessionStorage.get("OBPS_APPROVAL_CHECKS");
    const newApprovals = Digit.SessionStorage.get("OBPS_NEW_APPROVALS");
    let result = approvals === null || approvals === void 0 ? void 0 : approvals.reduce((acc, approval) => approval !== null && approval !== void 0 && approval.checked ? acc.push(approval === null || approval === void 0 ? void 0 : approval.label) && acc : acc, []);
    result = (_result = result) === null || _result === void 0 ? void 0 : _result.concat(newApprovals !== null ? newApprovals.filter(ob => ob.label !== "").map(approval => approval === null || approval === void 0 ? void 0 : approval.label) : []);
    return result;
  };
  async function submit(data) {
    var _applicationData3, _data$comments, _data$comments2, _applicationDetails$n, _nocDetails$, _nocDetails$$Noc, _response$Noc;
    applicationData = {
      ...applicationData,
      documents: getDocuments(),
      additionalDetails: {
        ...((_applicationData3 = applicationData) === null || _applicationData3 === void 0 ? void 0 : _applicationData3.additionalDetails),
        fieldinspection_pending: getfeildInspection(applicationData),
        pendingapproval: getPendingApprovals()
      },
      workflow: {
        action: action === null || action === void 0 ? void 0 : action.action,
        comment: (data === null || data === void 0 ? void 0 : (_data$comments = data.comments) === null || _data$comments === void 0 ? void 0 : _data$comments.length) > 0 ? data === null || data === void 0 ? void 0 : data.comments : null,
        comments: (data === null || data === void 0 ? void 0 : (_data$comments2 = data.comments) === null || _data$comments2 === void 0 ? void 0 : _data$comments2.length) > 0 ? data === null || data === void 0 ? void 0 : data.comments : null,
        assignee: !(selectedApprover !== null && selectedApprover !== void 0 && selectedApprover.uuid) ? null : [selectedApprover === null || selectedApprover === void 0 ? void 0 : selectedApprover.uuid],
        assignes: !(selectedApprover !== null && selectedApprover !== void 0 && selectedApprover.uuid) ? null : [selectedApprover === null || selectedApprover === void 0 ? void 0 : selectedApprover.uuid],
        varificationDocuments: uploadedFile ? [{
          documentType: (action === null || action === void 0 ? void 0 : action.action) + " DOC",
          fileName: file === null || file === void 0 ? void 0 : file.name,
          fileStoreId: uploadedFile
        }] : null
      },
      action: action === null || action === void 0 ? void 0 : action.action,
      comment: data === null || data === void 0 ? void 0 : data.comments,
      assignee: !(selectedApprover !== null && selectedApprover !== void 0 && selectedApprover.uuid) ? null : [selectedApprover === null || selectedApprover === void 0 ? void 0 : selectedApprover.uuid],
      wfDocuments: uploadedFile ? [{
        documentType: (action === null || action === void 0 ? void 0 : action.action) + " DOC",
        fileName: file === null || file === void 0 ? void 0 : file.name,
        fileStoreId: uploadedFile
      }] : null
    };
    const nocDetails = applicationDetails === null || applicationDetails === void 0 ? void 0 : (_applicationDetails$n = applicationDetails.nocData) === null || _applicationDetails$n === void 0 ? void 0 : _applicationDetails$n.map(noc => {
      const uploadedDocuments = Digit.SessionStorage.get(noc === null || noc === void 0 ? void 0 : noc.nocType) || [];
      return {
        Noc: {
          ...noc,
          documents: [...(noc !== null && noc !== void 0 && noc.documents ? noc === null || noc === void 0 ? void 0 : noc.documents : []), ...(uploadedDocuments ? uploadedDocuments : [])]
        }
      };
    });
    let filters = {
      sourceRefId: nocDetails === null || nocDetails === void 0 ? void 0 : (_nocDetails$ = nocDetails[0]) === null || _nocDetails$ === void 0 ? void 0 : (_nocDetails$$Noc = _nocDetails$.Noc) === null || _nocDetails$$Noc === void 0 ? void 0 : _nocDetails$$Noc.sourceRefId
    };
    const response = await Digit.NOCSearch.all(tenantId, filters);
    let AirportFlag = true;
    let NocFlag = true;
    response === null || response === void 0 ? void 0 : (_response$Noc = response.Noc) === null || _response$Noc === void 0 ? void 0 : _response$Noc.map(ob => {
      var _ob$applicationStatus, _ob$applicationStatus2, _ob$applicationStatus3, _ob$applicationStatus4, _ob$applicationStatus5;
      if (((ob === null || ob === void 0 ? void 0 : (_ob$applicationStatus = ob.applicationStatus) === null || _ob$applicationStatus === void 0 ? void 0 : _ob$applicationStatus.toUpperCase()) === "APPROVED" || (ob === null || ob === void 0 ? void 0 : (_ob$applicationStatus2 = ob.applicationStatus) === null || _ob$applicationStatus2 === void 0 ? void 0 : _ob$applicationStatus2.toUpperCase()) === "AUTO_APPROVED" || (ob === null || ob === void 0 ? void 0 : (_ob$applicationStatus3 = ob.applicationStatus) === null || _ob$applicationStatus3 === void 0 ? void 0 : _ob$applicationStatus3.toUpperCase()) === "REJECTED" || (ob === null || ob === void 0 ? void 0 : (_ob$applicationStatus4 = ob.applicationStatus) === null || _ob$applicationStatus4 === void 0 ? void 0 : _ob$applicationStatus4.toUpperCase()) === "AUTO_REJECTED" || (ob === null || ob === void 0 ? void 0 : (_ob$applicationStatus5 = ob.applicationStatus) === null || _ob$applicationStatus5 === void 0 ? void 0 : _ob$applicationStatus5.toUpperCase()) === "VOIDED") && (AirportFlag == true || NocFlag == true)) {
        if ((ob === null || ob === void 0 ? void 0 : ob.nocType) === "AIRPORT_AUTHORITY") AirportFlag = false;else if ((ob === null || ob === void 0 ? void 0 : ob.nocType) === "FIRE_NOC") NocFlag = false;
      }
    });
    let nocData = [];
    if (nocDetails) {
      nocDetails.map(noc => {
        var _noc$Noc, _noc$Noc$applicationS, _noc$Noc2, _noc$Noc2$application, _noc$Noc3, _noc$Noc3$application, _noc$Noc4, _noc$Noc4$application, _noc$Noc5, _noc$Noc5$application, _noc$Noc6, _noc$Noc7;
        if ((noc === null || noc === void 0 ? void 0 : (_noc$Noc = noc.Noc) === null || _noc$Noc === void 0 ? void 0 : (_noc$Noc$applicationS = _noc$Noc.applicationStatus) === null || _noc$Noc$applicationS === void 0 ? void 0 : _noc$Noc$applicationS.toUpperCase()) != "APPROVED" && (noc === null || noc === void 0 ? void 0 : (_noc$Noc2 = noc.Noc) === null || _noc$Noc2 === void 0 ? void 0 : (_noc$Noc2$application = _noc$Noc2.applicationStatus) === null || _noc$Noc2$application === void 0 ? void 0 : _noc$Noc2$application.toUpperCase()) != "AUTO_APPROVED" && (noc === null || noc === void 0 ? void 0 : (_noc$Noc3 = noc.Noc) === null || _noc$Noc3 === void 0 ? void 0 : (_noc$Noc3$application = _noc$Noc3.applicationStatus) === null || _noc$Noc3$application === void 0 ? void 0 : _noc$Noc3$application.toUpperCase()) != "REJECTED" && (noc === null || noc === void 0 ? void 0 : (_noc$Noc4 = noc.Noc) === null || _noc$Noc4 === void 0 ? void 0 : (_noc$Noc4$application = _noc$Noc4.applicationStatus) === null || _noc$Noc4$application === void 0 ? void 0 : _noc$Noc4$application.toUpperCase()) != "AUTO_REJECTED" && (noc === null || noc === void 0 ? void 0 : (_noc$Noc5 = noc.Noc) === null || _noc$Noc5 === void 0 ? void 0 : (_noc$Noc5$application = _noc$Noc5.applicationStatus) === null || _noc$Noc5$application === void 0 ? void 0 : _noc$Noc5$application.toUpperCase()) != "VOIDED" && (noc === null || noc === void 0 ? void 0 : (_noc$Noc6 = noc.Noc) === null || _noc$Noc6 === void 0 ? void 0 : _noc$Noc6.nocType) === "AIRPORT_AUTHORITY" && AirportFlag || (noc === null || noc === void 0 ? void 0 : (_noc$Noc7 = noc.Noc) === null || _noc$Noc7 === void 0 ? void 0 : _noc$Noc7.nocType) === "FIRE_NOC" && NocFlag) {
          nocData.push(noc);
        }
      });
    }
    submitAction({
      BPA: applicationData
    }, (nocData === null || nocData === void 0 ? void 0 : nocData.length) > 0 ? nocData : false, {
      isStakeholder: false,
      bpa: true
    });
  }
  useEffect(() => {
    if (action) {
      setConfig(configBPAApproverApplication({
        t,
        action,
        approvers,
        selectedApprover,
        setSelectedApprover,
        selectFile,
        uploadedFile,
        setUploadedFile,
        businessService,
        assigneeLabel: "WF_ASSIGNEE_NAME_LABEL",
        error
      }));
    }
  }, [action, approvers, selectedFinancialYear, uploadedFile, error]);
  return action && config.form ? /*#__PURE__*/React.createElement(Modal, {
    headerBarMain: /*#__PURE__*/React.createElement(Heading$3, {
      label: t(config.label.heading)
    }),
    headerBarEnd: /*#__PURE__*/React.createElement(CloseBtn$3, {
      onClick: closeModal
    }),
    actionCancelLabel: t(config.label.cancel),
    actionCancelOnSubmit: closeModal,
    actionSaveLabel: t(config.label.submit),
    actionSaveOnSubmit: () => {},
    formId: "modal-action",
    isOBPSFlow: true,
    popupStyles: mobileView ? {
      width: "720px"
    } : {},
    style: !mobileView ? {
      minHeight: "45px",
      height: "auto",
      width: "107px",
      paddingLeft: "0px",
      paddingRight: "0px"
    } : {
      minHeight: "45px",
      height: "auto",
      width: "44%"
    },
    popupModuleMianStyles: mobileView ? {
      paddingLeft: "5px"
    } : {}
  }, PTALoading ? /*#__PURE__*/React.createElement(Loader, null) : /*#__PURE__*/React.createElement(FormComposer, {
    config: config.form,
    cardStyle: {
      marginLeft: "0px",
      marginRight: "0px",
      marginTop: "-25px"
    },
    className: "BPAemployeeCard",
    noBoxShadow: true,
    inline: true,
    childrenAtTheBottom: true,
    onSubmit: submit,
    defaultValues: defaultValues,
    formId: "modal-action"
  })) : /*#__PURE__*/React.createElement(Loader, null);
};

const Heading$4 = props => {
  return /*#__PURE__*/React.createElement("h1", {
    style: {
      marginLeft: "22px"
    },
    className: "heading-m BPAheading-m"
  }, props.label);
};
const Close$4 = () => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "#FFFFFF"
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0V0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
}));
const CloseBtn$4 = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "icon-bg-secondary",
    onClick: props.onClick
  }, /*#__PURE__*/React.createElement(Close$4, null));
};
const ActionModal$4 = ({
  t,
  action,
  tenantId,
  state,
  id,
  closeModal,
  submitAction,
  actionData,
  applicationData,
  businessService,
  moduleCode
}) => {
  var _action$assigneeRoles, _action$assigneeRoles2;
  const {
    data: approverData,
    isLoading: PTALoading
  } = Digit.Hooks.useEmployeeSearch(tenantId, {
    roles: action === null || action === void 0 ? void 0 : (_action$assigneeRoles = action.assigneeRoles) === null || _action$assigneeRoles === void 0 ? void 0 : (_action$assigneeRoles2 = _action$assigneeRoles.map) === null || _action$assigneeRoles2 === void 0 ? void 0 : _action$assigneeRoles2.call(_action$assigneeRoles, e => ({
      code: e
    })),
    isActive: true
  }, {
    enabled: !(action !== null && action !== void 0 && action.isTerminateState)
  });
  const queryClient = useQueryClient();
  const [config, setConfig] = useState({});
  const [defaultValues, setDefaultValues] = useState({});
  const [approvers, setApprovers] = useState([]);
  const [selectedApprover, setSelectedApprover] = useState({});
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState(null);
  const mobileView = Digit.Utils.browser.isMobile() ? true : false;
  const history = useHistory();
  useEffect(() => {
    var _approverData$Employe;
    setApprovers(approverData === null || approverData === void 0 ? void 0 : (_approverData$Employe = approverData.Employees) === null || _approverData$Employe === void 0 ? void 0 : _approverData$Employe.map(employee => {
      var _employee$user;
      return {
        uuid: employee === null || employee === void 0 ? void 0 : employee.uuid,
        name: employee === null || employee === void 0 ? void 0 : (_employee$user = employee.user) === null || _employee$user === void 0 ? void 0 : _employee$user.name
      };
    }));
  }, [approverData]);
  function selectFile(e) {
    setFile(e.target.files[0]);
  }
  useEffect(() => {
    (async () => {
      setError(null);
      if (file) {
        const allowedFileTypesRegex = /(.*?)(jpg|jpeg|png|image|pdf)$/i;
        if (file.size >= 5242880) {
          setError(t("CS_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else if (file !== null && file !== void 0 && file.type && !allowedFileTypesRegex.test(file === null || file === void 0 ? void 0 : file.type)) {
          setError(t(`NOT_SUPPORTED_FILE_TYPE`));
        } else {
          try {
            var _response$data, _response$data$files;
            const response = await Digit.UploadServices.Filestorage("NOC", file, Digit.ULBService.getStateId() || (tenantId === null || tenantId === void 0 ? void 0 : tenantId.split(".")[0]));
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
  function submit(data) {
    var _applicationData, _applicationData$docu, _applicationData2;
    let enteredDocs = JSON.parse(sessionStorage.getItem("NewNOCDocs"));
    let newDocs = ((_applicationData = applicationData) === null || _applicationData === void 0 ? void 0 : (_applicationData$docu = _applicationData.documents) === null || _applicationData$docu === void 0 ? void 0 : _applicationData$docu.length) > 0 ? [...((_applicationData2 = applicationData) === null || _applicationData2 === void 0 ? void 0 : _applicationData2.documents)] : [];
    enteredDocs.map((d, index) => {
      newDocs.push(d);
    });
    applicationData = {
      ...applicationData,
      workflow: {
        action: action === null || action === void 0 ? void 0 : action.action,
        comment: data !== null && data !== void 0 && data.comments ? data === null || data === void 0 ? void 0 : data.comments : null,
        assignee: !(selectedApprover !== null && selectedApprover !== void 0 && selectedApprover.uuid) ? null : [selectedApprover === null || selectedApprover === void 0 ? void 0 : selectedApprover.uuid],
        documents: uploadedFile ? [{
          documentType: (action === null || action === void 0 ? void 0 : action.action) + " DOC",
          fileName: file === null || file === void 0 ? void 0 : file.name,
          fileStoreId: uploadedFile
        }] : null
      },
      documents: newDocs
    };
    submitAction({
      Noc: applicationData
    }, false, {
      isNoc: true
    });
  }
  useEffect(() => {
    if (action) {
      setConfig(configNOCApproverApplication({
        t,
        action,
        approvers,
        selectedApprover,
        setSelectedApprover,
        selectFile,
        uploadedFile,
        setUploadedFile,
        businessService,
        assigneeLabel: "WF_ASSIGNEE_NAME_LABEL",
        error
      }));
    }
  }, [action, approvers, uploadedFile, error]);
  return action && config.form ? /*#__PURE__*/React.createElement(Modal, {
    headerBarMain: /*#__PURE__*/React.createElement(Heading$4, {
      label: t(config.label.heading)
    }),
    headerBarEnd: /*#__PURE__*/React.createElement(CloseBtn$4, {
      onClick: closeModal
    }),
    actionCancelLabel: t(config.label.cancel),
    actionCancelOnSubmit: closeModal,
    actionSaveLabel: t(config.label.submit),
    actionSaveOnSubmit: () => {},
    formId: "modal-action",
    isOBPSFlow: true,
    popupStyles: mobileView ? {
      width: "720px"
    } : {},
    style: !mobileView ? {
      height: "45px",
      width: "107px",
      paddingLeft: "0px",
      paddingRight: "0px"
    } : {
      height: "45px",
      width: "44%"
    },
    popupModuleMianStyles: mobileView ? {
      paddingLeft: "5px"
    } : {}
  }, PTALoading ? /*#__PURE__*/React.createElement(Loader, null) : /*#__PURE__*/React.createElement(FormComposer, {
    config: config.form,
    cardStyle: {
      marginLeft: "0px",
      marginRight: "0px",
      marginTop: "-25px"
    },
    className: "BPAemployeeCard",
    noBoxShadow: true,
    inline: true,
    childrenAtTheBottom: true,
    onSubmit: submit,
    defaultValues: defaultValues,
    formId: "modal-action"
  })) : /*#__PURE__*/React.createElement(Loader, null);
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

var Symbol = _root.Symbol;
var _Symbol = Symbol;

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
var _arrayEach = arrayEach;

var defineProperty = function () {
  try {
    var func = _getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}();
var _defineProperty = defineProperty;

function baseAssignValue(object, key, value) {
  if (key == '__proto__' && _defineProperty) {
    _defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}
var _baseAssignValue = baseAssignValue;

var objectProto$5 = Object.prototype;
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$4.call(object, key) && eq_1(objValue, value)) || value === undefined && !(key in object)) {
    _baseAssignValue(object, key, value);
  }
}
var _assignValue = assignValue;

function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1,
    length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;
    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      _baseAssignValue(object, key, newValue);
    } else {
      _assignValue(object, key, newValue);
    }
  }
  return object;
}
var _copyObject = copyObject;

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
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
var propertyIsEnumerable = objectProto$6.propertyIsEnumerable;
var isArguments = _baseIsArguments(function () {
  return arguments;
}()) ? _baseIsArguments : function (value) {
  return isObjectLike_1(value) && hasOwnProperty$5.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
};
var isArguments_1 = isArguments;

var isArray = Array.isArray;
var isArray_1 = isArray;

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
  boolTag = '[object Boolean]',
  dateTag = '[object Date]',
  errorTag = '[object Error]',
  funcTag$1 = '[object Function]',
  mapTag = '[object Map]',
  numberTag = '[object Number]',
  objectTag = '[object Object]',
  regexpTag = '[object RegExp]',
  setTag = '[object Set]',
  stringTag = '[object String]',
  weakMapTag = '[object WeakMap]';
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
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
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
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray_1(value),
    isArg = !isArr && isArguments_1(value),
    isBuff = !isArr && !isArg && isBuffer_1(value),
    isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
    skipIndexes = isArr || isArg || isBuff || isType,
    result = skipIndexes ? _baseTimes(value.length, String) : [],
    length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$6.call(value, key)) && !(skipIndexes && (key == 'length' || isBuff && (key == 'offset' || key == 'parent') || isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') || _isIndex(key, length)))) {
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
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;
function baseKeys(object) {
  if (!_isPrototype(object)) {
    return _nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$7.call(object, key) && key != 'constructor') {
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

function baseAssign(object, source) {
  return object && _copyObject(source, keys_1(source), object);
}
var _baseAssign = baseAssign;

function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var _nativeKeysIn = nativeKeysIn;

var objectProto$a = Object.prototype;
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;
function baseKeysIn(object) {
  if (!isObject_1(object)) {
    return _nativeKeysIn(object);
  }
  var isProto = _isPrototype(object),
    result = [];
  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$8.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
var _baseKeysIn = baseKeysIn;

function keysIn(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object, true) : _baseKeysIn(object);
}
var keysIn_1 = keysIn;

function baseAssignIn(object, source) {
  return object && _copyObject(source, keysIn_1(source), object);
}
var _baseAssignIn = baseAssignIn;

var _cloneBuffer = createCommonjsModule(function (module, exports) {
  var freeExports =  exports && !exports.nodeType && exports;
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer = moduleExports ? _root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
    buffer.copy(result);
    return result;
  }
  module.exports = cloneBuffer;
});

function copyArray(source, array) {
  var index = -1,
    length = source.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
var _copyArray = copyArray;

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

var objectProto$b = Object.prototype;
var propertyIsEnumerable$1 = objectProto$b.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols ? stubArray_1 : function (object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return _arrayFilter(nativeGetSymbols(object), function (symbol) {
    return propertyIsEnumerable$1.call(object, symbol);
  });
};
var _getSymbols = getSymbols;

function copySymbols(source, object) {
  return _copyObject(source, _getSymbols(source), object);
}
var _copySymbols = copySymbols;

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

var getPrototype = _overArg(Object.getPrototypeOf, Object);
var _getPrototype = getPrototype;

var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
var getSymbolsIn = !nativeGetSymbols$1 ? stubArray_1 : function (object) {
  var result = [];
  while (object) {
    _arrayPush(result, _getSymbols(object));
    object = _getPrototype(object);
  }
  return result;
};
var _getSymbolsIn = getSymbolsIn;

function copySymbolsIn(source, object) {
  return _copyObject(source, _getSymbolsIn(source), object);
}
var _copySymbolsIn = copySymbolsIn;

function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
}
var _baseGetAllKeys = baseGetAllKeys;

function getAllKeys(object) {
  return _baseGetAllKeys(object, keys_1, _getSymbols);
}
var _getAllKeys = getAllKeys;

function getAllKeysIn(object) {
  return _baseGetAllKeys(object, keysIn_1, _getSymbolsIn);
}
var _getAllKeysIn = getAllKeysIn;

var DataView = _getNative(_root, 'DataView');
var _DataView = DataView;

var Promise$1 = _getNative(_root, 'Promise');
var _Promise = Promise$1;

var Set = _getNative(_root, 'Set');
var _Set = Set;

var WeakMap = _getNative(_root, 'WeakMap');
var _WeakMap = WeakMap;

var mapTag$1 = '[object Map]',
  objectTag$1 = '[object Object]',
  promiseTag = '[object Promise]',
  setTag$1 = '[object Set]',
  weakMapTag$1 = '[object WeakMap]';
var dataViewTag$1 = '[object DataView]';
var dataViewCtorString = _toSource(_DataView),
  mapCtorString = _toSource(_Map),
  promiseCtorString = _toSource(_Promise),
  setCtorString = _toSource(_Set),
  weakMapCtorString = _toSource(_WeakMap);
var getTag = _baseGetTag;
if (_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag$1 || _Map && getTag(new _Map()) != mapTag$1 || _Promise && getTag(_Promise.resolve()) != promiseTag || _Set && getTag(new _Set()) != setTag$1 || _WeakMap && getTag(new _WeakMap()) != weakMapTag$1) {
  getTag = function (value) {
    var result = _baseGetTag(value),
      Ctor = result == objectTag$1 ? value.constructor : undefined,
      ctorString = Ctor ? _toSource(Ctor) : '';
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag$1;
        case mapCtorString:
          return mapTag$1;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag$1;
        case weakMapCtorString:
          return weakMapTag$1;
      }
    }
    return result;
  };
}
var _getTag = getTag;

var objectProto$c = Object.prototype;
var hasOwnProperty$9 = objectProto$c.hasOwnProperty;
function initCloneArray(array) {
  var length = array.length,
    result = new array.constructor(length);
  if (length && typeof array[0] == 'string' && hasOwnProperty$9.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}
var _initCloneArray = initCloneArray;

var Uint8Array = _root.Uint8Array;
var _Uint8Array = Uint8Array;

function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new _Uint8Array(result).set(new _Uint8Array(arrayBuffer));
  return result;
}
var _cloneArrayBuffer = cloneArrayBuffer;

function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? _cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var _cloneDataView = cloneDataView;

var reFlags = /\w*$/;
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
var _cloneRegExp = cloneRegExp;

var symbolProto = _Symbol ? _Symbol.prototype : undefined,
  symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}
var _cloneSymbol = cloneSymbol;

function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? _cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var _cloneTypedArray = cloneTypedArray;

var boolTag$1 = '[object Boolean]',
  dateTag$1 = '[object Date]',
  mapTag$2 = '[object Map]',
  numberTag$1 = '[object Number]',
  regexpTag$1 = '[object RegExp]',
  setTag$2 = '[object Set]',
  stringTag$1 = '[object String]',
  symbolTag = '[object Symbol]';
var arrayBufferTag$1 = '[object ArrayBuffer]',
  dataViewTag$2 = '[object DataView]',
  float32Tag$1 = '[object Float32Array]',
  float64Tag$1 = '[object Float64Array]',
  int8Tag$1 = '[object Int8Array]',
  int16Tag$1 = '[object Int16Array]',
  int32Tag$1 = '[object Int32Array]',
  uint8Tag$1 = '[object Uint8Array]',
  uint8ClampedTag$1 = '[object Uint8ClampedArray]',
  uint16Tag$1 = '[object Uint16Array]',
  uint32Tag$1 = '[object Uint32Array]';
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$1:
      return _cloneArrayBuffer(object);
    case boolTag$1:
    case dateTag$1:
      return new Ctor(+object);
    case dataViewTag$2:
      return _cloneDataView(object, isDeep);
    case float32Tag$1:
    case float64Tag$1:
    case int8Tag$1:
    case int16Tag$1:
    case int32Tag$1:
    case uint8Tag$1:
    case uint8ClampedTag$1:
    case uint16Tag$1:
    case uint32Tag$1:
      return _cloneTypedArray(object, isDeep);
    case mapTag$2:
      return new Ctor();
    case numberTag$1:
    case stringTag$1:
      return new Ctor(object);
    case regexpTag$1:
      return _cloneRegExp(object);
    case setTag$2:
      return new Ctor();
    case symbolTag:
      return _cloneSymbol(object);
  }
}
var _initCloneByTag = initCloneByTag;

var objectCreate = Object.create;
var baseCreate = function () {
  function object() {}
  return function (proto) {
    if (!isObject_1(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = undefined;
    return result;
  };
}();
var _baseCreate = baseCreate;

function initCloneObject(object) {
  return typeof object.constructor == 'function' && !_isPrototype(object) ? _baseCreate(_getPrototype(object)) : {};
}
var _initCloneObject = initCloneObject;

var mapTag$3 = '[object Map]';
function baseIsMap(value) {
  return isObjectLike_1(value) && _getTag(value) == mapTag$3;
}
var _baseIsMap = baseIsMap;

var nodeIsMap = _nodeUtil && _nodeUtil.isMap;
var isMap = nodeIsMap ? _baseUnary(nodeIsMap) : _baseIsMap;
var isMap_1 = isMap;

var setTag$3 = '[object Set]';
function baseIsSet(value) {
  return isObjectLike_1(value) && _getTag(value) == setTag$3;
}
var _baseIsSet = baseIsSet;

var nodeIsSet = _nodeUtil && _nodeUtil.isSet;
var isSet = nodeIsSet ? _baseUnary(nodeIsSet) : _baseIsSet;
var isSet_1 = isSet;

var CLONE_DEEP_FLAG = 1,
  CLONE_FLAT_FLAG = 2,
  CLONE_SYMBOLS_FLAG = 4;
var argsTag$2 = '[object Arguments]',
  arrayTag$1 = '[object Array]',
  boolTag$2 = '[object Boolean]',
  dateTag$2 = '[object Date]',
  errorTag$1 = '[object Error]',
  funcTag$2 = '[object Function]',
  genTag$1 = '[object GeneratorFunction]',
  mapTag$4 = '[object Map]',
  numberTag$2 = '[object Number]',
  objectTag$2 = '[object Object]',
  regexpTag$2 = '[object RegExp]',
  setTag$4 = '[object Set]',
  stringTag$2 = '[object String]',
  symbolTag$1 = '[object Symbol]',
  weakMapTag$2 = '[object WeakMap]';
var arrayBufferTag$2 = '[object ArrayBuffer]',
  dataViewTag$3 = '[object DataView]',
  float32Tag$2 = '[object Float32Array]',
  float64Tag$2 = '[object Float64Array]',
  int8Tag$2 = '[object Int8Array]',
  int16Tag$2 = '[object Int16Array]',
  int32Tag$2 = '[object Int32Array]',
  uint8Tag$2 = '[object Uint8Array]',
  uint8ClampedTag$2 = '[object Uint8ClampedArray]',
  uint16Tag$2 = '[object Uint16Array]',
  uint32Tag$2 = '[object Uint32Array]';
var cloneableTags = {};
cloneableTags[argsTag$2] = cloneableTags[arrayTag$1] = cloneableTags[arrayBufferTag$2] = cloneableTags[dataViewTag$3] = cloneableTags[boolTag$2] = cloneableTags[dateTag$2] = cloneableTags[float32Tag$2] = cloneableTags[float64Tag$2] = cloneableTags[int8Tag$2] = cloneableTags[int16Tag$2] = cloneableTags[int32Tag$2] = cloneableTags[mapTag$4] = cloneableTags[numberTag$2] = cloneableTags[objectTag$2] = cloneableTags[regexpTag$2] = cloneableTags[setTag$4] = cloneableTags[stringTag$2] = cloneableTags[symbolTag$1] = cloneableTags[uint8Tag$2] = cloneableTags[uint8ClampedTag$2] = cloneableTags[uint16Tag$2] = cloneableTags[uint32Tag$2] = true;
cloneableTags[errorTag$1] = cloneableTags[funcTag$2] = cloneableTags[weakMapTag$2] = false;
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
    isDeep = bitmask & CLONE_DEEP_FLAG,
    isFlat = bitmask & CLONE_FLAT_FLAG,
    isFull = bitmask & CLONE_SYMBOLS_FLAG;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject_1(value)) {
    return value;
  }
  var isArr = isArray_1(value);
  if (isArr) {
    result = _initCloneArray(value);
    if (!isDeep) {
      return _copyArray(value, result);
    }
  } else {
    var tag = _getTag(value),
      isFunc = tag == funcTag$2 || tag == genTag$1;
    if (isBuffer_1(value)) {
      return _cloneBuffer(value, isDeep);
    }
    if (tag == objectTag$2 || tag == argsTag$2 || isFunc && !object) {
      result = isFlat || isFunc ? {} : _initCloneObject(value);
      if (!isDeep) {
        return isFlat ? _copySymbolsIn(value, _baseAssignIn(result, value)) : _copySymbols(value, _baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = _initCloneByTag(value, tag, isDeep);
    }
  }
  stack || (stack = new _Stack());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);
  if (isSet_1(value)) {
    value.forEach(function (subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap_1(value)) {
    value.forEach(function (subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
  }
  var keysFunc = isFull ? isFlat ? _getAllKeysIn : _getAllKeys : isFlat ? keysIn_1 : keys_1;
  var props = isArr ? undefined : keysFunc(value);
  _arrayEach(props || value, function (subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    _assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}
var _baseClone = baseClone;

var CLONE_DEEP_FLAG$1 = 1,
  CLONE_SYMBOLS_FLAG$1 = 4;
function cloneDeep(value) {
  return _baseClone(value, CLONE_DEEP_FLAG$1 | CLONE_SYMBOLS_FLAG$1);
}
var cloneDeep_1 = cloneDeep;

const Heading$5 = props => {
  return /*#__PURE__*/React.createElement("h1", {
    className: "heading-m"
  }, props.label);
};
const Close$5 = () => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "#FFFFFF"
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0V0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
}));
const CloseBtn$5 = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "icon-bg-secondary",
    onClick: props.onClick
  }, /*#__PURE__*/React.createElement(Close$5, null));
};
const convertDateToEpochNew = (dateString, dayStartOrEnd = "dayend") => {
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
const ActionModal$5 = ({
  t,
  action,
  tenantId,
  state,
  id,
  closeModal,
  submitAction,
  actionData,
  applicationData,
  businessService,
  moduleCode
}) => {
  var _action$assigneeRoles, _action$assigneeRoles2;
  const {
    data: approverData,
    isLoading: PTALoading
  } = Digit.Hooks.useEmployeeSearch(tenantId, {
    roles: action === null || action === void 0 ? void 0 : (_action$assigneeRoles = action.assigneeRoles) === null || _action$assigneeRoles === void 0 ? void 0 : (_action$assigneeRoles2 = _action$assigneeRoles.map) === null || _action$assigneeRoles2 === void 0 ? void 0 : _action$assigneeRoles2.call(_action$assigneeRoles, e => ({
      code: e
    })),
    isActive: true
  }, {
    enabled: !(action !== null && action !== void 0 && action.isTerminateState)
  });
  const [config, setConfig] = useState({});
  const [defaultValues, setDefaultValues] = useState({});
  const [approvers, setApprovers] = useState([]);
  const [selectedApprover, setSelectedApprover] = useState({});
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState(null);
  const isMobile = window.Digit.Utils.browser.isMobile();
  const isEmployee = window.location.href.includes("/employee");
  useEffect(() => {
    var _approverData$Employe;
    setApprovers(approverData === null || approverData === void 0 ? void 0 : (_approverData$Employe = approverData.Employees) === null || _approverData$Employe === void 0 ? void 0 : _approverData$Employe.map(employee => {
      var _employee$user;
      return {
        uuid: employee === null || employee === void 0 ? void 0 : employee.uuid,
        name: employee === null || employee === void 0 ? void 0 : (_employee$user = employee.user) === null || _employee$user === void 0 ? void 0 : _employee$user.name
      };
    }));
  }, [approverData]);
  function selectFile(e) {
    setFile(e.target.files[0]);
  }
  useEffect(() => {
    (async () => {
      setError(null);
      if (file) {
        const allowedFileTypesRegex = /(.*?)(jpg|jpeg|png|image|pdf)$/i;
        if (file.size >= 5242880) {
          setError(t("CS_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else if (file !== null && file !== void 0 && file.type && !allowedFileTypesRegex.test(file === null || file === void 0 ? void 0 : file.type)) {
          setError(t(`NOT_SUPPORTED_FILE_TYPE`));
        } else {
          try {
            var _response$data, _response$data$files;
            const response = await Digit.UploadServices.Filestorage("WS", file, Digit.ULBService.getCurrentTenantId());
            if ((response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : (_response$data$files = _response$data.files) === null || _response$data$files === void 0 ? void 0 : _response$data$files.length) > 0) {
              var _response$data2, _response$data2$files;
              setUploadedFile(response === null || response === void 0 ? void 0 : (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : (_response$data2$files = _response$data2.files[0]) === null || _response$data2$files === void 0 ? void 0 : _response$data2$files.fileStoreId);
            } else {
              setError(t("CS_FILE_UPLOAD_ERROR"));
            }
          } catch (err) {
            console.error("Modal -> err ", err);
            setError(t("CS_FILE_UPLOAD_ERROR"));
          }
        }
      }
    })();
  }, [file]);
  function submit(data) {
    var _applicationData, _applicationData7, _applicationData8, _applicationData8$app, _applicationData9, _applicationData9$pro, _applicationData10, _applicationData10$pr;
    if ((_applicationData = applicationData) !== null && _applicationData !== void 0 && _applicationData.isBillAmend) {
      var _applicationData2, _applicationData2$bil, _applicationData3, _applicationData4, _applicationData4$bil, _applicationData5, _applicationData5$app, _applicationData6, _applicationData6$app;
      const comments = data !== null && data !== void 0 && data.comments ? data.comments : null;
      const additionalDetails = {
        ...((_applicationData2 = applicationData) === null || _applicationData2 === void 0 ? void 0 : (_applicationData2$bil = _applicationData2.billAmendmentDetails) === null || _applicationData2$bil === void 0 ? void 0 : _applicationData2$bil.additionalDetails),
        comments
      };
      const amendment = {
        ...((_applicationData3 = applicationData) === null || _applicationData3 === void 0 ? void 0 : _applicationData3.billAmendmentDetails),
        workflow: {
          businessId: (_applicationData4 = applicationData) === null || _applicationData4 === void 0 ? void 0 : (_applicationData4$bil = _applicationData4.billAmendmentDetails) === null || _applicationData4$bil === void 0 ? void 0 : _applicationData4$bil.amendmentId,
          action: action === null || action === void 0 ? void 0 : action.action,
          tenantId: tenantId,
          businessService: (_applicationData5 = applicationData) !== null && _applicationData5 !== void 0 && (_applicationData5$app = _applicationData5.applicationType) !== null && _applicationData5$app !== void 0 && _applicationData5$app.includes("WATER") ? "WS.AMENDMENT" : "SW.AMENDMENT",
          moduleName: (_applicationData6 = applicationData) !== null && _applicationData6 !== void 0 && (_applicationData6$app = _applicationData6.applicationType) !== null && _applicationData6$app !== void 0 && _applicationData6$app.includes("WATER") ? "WS" : "SW",
          assignes: !(selectedApprover !== null && selectedApprover !== void 0 && selectedApprover.uuid) ? [] : [{
            uuid: selectedApprover === null || selectedApprover === void 0 ? void 0 : selectedApprover.uuid
          }],
          comment: (data === null || data === void 0 ? void 0 : data.comments) || "",
          documents: uploadedFile ? [{
            documentType: (action === null || action === void 0 ? void 0 : action.action) + " DOC",
            fileName: file === null || file === void 0 ? void 0 : file.name,
            fileStoreId: uploadedFile
          }] : []
        },
        additionalDetails,
        comment: (data === null || data === void 0 ? void 0 : data.comments) || "",
        wfDocuments: uploadedFile ? [{
          documentType: (action === null || action === void 0 ? void 0 : action.action) + " DOC",
          fileName: file === null || file === void 0 ? void 0 : file.name,
          fileStoreId: uploadedFile
        }] : null,
        processInstance: {
          action: action === null || action === void 0 ? void 0 : action.action,
          assignes: !(selectedApprover !== null && selectedApprover !== void 0 && selectedApprover.uuid) ? [] : [{
            uuid: selectedApprover === null || selectedApprover === void 0 ? void 0 : selectedApprover.uuid
          }],
          comment: (data === null || data === void 0 ? void 0 : data.comments) || "",
          documents: uploadedFile ? [{
            documentType: (action === null || action === void 0 ? void 0 : action.action) + " DOC",
            fileName: file === null || file === void 0 ? void 0 : file.name,
            fileStoreId: uploadedFile
          }] : []
        }
      };
      submitAction({
        AmendmentUpdate: amendment
      });
      return;
    }
    applicationData = {
      ...applicationData,
      action: action === null || action === void 0 ? void 0 : action.action,
      comment: (data === null || data === void 0 ? void 0 : data.comments) || "",
      assignee: !(selectedApprover !== null && selectedApprover !== void 0 && selectedApprover.uuid) ? [] : [selectedApprover === null || selectedApprover === void 0 ? void 0 : selectedApprover.uuid],
      assignes: !(selectedApprover !== null && selectedApprover !== void 0 && selectedApprover.uuid) ? [] : [{
        uuid: selectedApprover === null || selectedApprover === void 0 ? void 0 : selectedApprover.uuid
      }],
      wfDocuments: uploadedFile ? [{
        documentType: (action === null || action === void 0 ? void 0 : action.action) + " DOC",
        fileName: file === null || file === void 0 ? void 0 : file.name,
        fileStoreId: uploadedFile
      }] : null,
      processInstance: {
        ...((_applicationData7 = applicationData) === null || _applicationData7 === void 0 ? void 0 : _applicationData7.processInstance),
        action: action === null || action === void 0 ? void 0 : action.action,
        assignes: !(selectedApprover !== null && selectedApprover !== void 0 && selectedApprover.uuid) ? [] : [{
          uuid: selectedApprover === null || selectedApprover === void 0 ? void 0 : selectedApprover.uuid
        }],
        comment: (data === null || data === void 0 ? void 0 : data.comments) || "",
        documents: uploadedFile ? [{
          documentType: (action === null || action === void 0 ? void 0 : action.action) + " DOC",
          fileName: file === null || file === void 0 ? void 0 : file.name,
          fileStoreId: uploadedFile
        }] : []
      }
    };
    if (data !== null && data !== void 0 && data.date && (_applicationData8 = applicationData) !== null && _applicationData8 !== void 0 && (_applicationData8$app = _applicationData8.applicationType) !== null && _applicationData8$app !== void 0 && _applicationData8$app.includes("DISCONNECT")) {
      const disconnectionExecutionDate = cloneDeep_1(data === null || data === void 0 ? void 0 : data.date);
      applicationData.disconnectionExecutionDate = convertDateToEpochNew(disconnectionExecutionDate);
    } else if (data !== null && data !== void 0 && data.date) {
      const connectionExecutionDate = cloneDeep_1(data === null || data === void 0 ? void 0 : data.date);
      applicationData.connectionExecutionDate = convertDateToEpochNew(connectionExecutionDate);
    }
    if (((_applicationData9 = applicationData) === null || _applicationData9 === void 0 ? void 0 : (_applicationData9$pro = _applicationData9.processInstance) === null || _applicationData9$pro === void 0 ? void 0 : _applicationData9$pro.businessService) == "DisconnectWSConnection" || ((_applicationData10 = applicationData) === null || _applicationData10 === void 0 ? void 0 : (_applicationData10$pr = _applicationData10.processInstance) === null || _applicationData10$pr === void 0 ? void 0 : _applicationData10$pr.businessService) == "DisconnectSWConnection" || window.location.href.includes("disconnection")) {
      var _applicationData11;
      ((_applicationData11 = applicationData) === null || _applicationData11 === void 0 ? void 0 : _applicationData11.serviceType) == "WATER" ? submitAction({
        WaterConnection: applicationData,
        disconnectRequest: true
      }) : submitAction({
        SewerageConnection: applicationData,
        disconnectRequest: true
      });
    } else {
      var _parsedAdhocRebateDat, _parsedAdhocRebateDat2, _parsedAdhocRebateDat3, _parsedAdhocRebateDat4, _parsedAdhocRebateDat5, _parsedAdhocRebateDat6, _parsedAdhocRebateDat7, _parsedAdhocRebateDat8, _parsedAdhocRebateDat9, _parsedAdhocRebateDat10, _parsedAdhocRebateDat11, _parsedAdhocRebateDat12, _applicationData12;
      const adhocRebateData = sessionStorage.getItem("Digit.ADHOC_ADD_REBATE_DATA");
      const parsedAdhocRebateData = adhocRebateData ? JSON.parse(adhocRebateData) : "";
      if (parsedAdhocRebateData !== null && parsedAdhocRebateData !== void 0 && (_parsedAdhocRebateDat = parsedAdhocRebateData.value) !== null && _parsedAdhocRebateDat !== void 0 && _parsedAdhocRebateDat.adhocPenalty) applicationData.additionalDetails.adhocPenalty = parseInt(parsedAdhocRebateData === null || parsedAdhocRebateData === void 0 ? void 0 : (_parsedAdhocRebateDat2 = parsedAdhocRebateData.value) === null || _parsedAdhocRebateDat2 === void 0 ? void 0 : _parsedAdhocRebateDat2.adhocPenalty) || "";
      if (parsedAdhocRebateData !== null && parsedAdhocRebateData !== void 0 && (_parsedAdhocRebateDat3 = parsedAdhocRebateData.value) !== null && _parsedAdhocRebateDat3 !== void 0 && _parsedAdhocRebateDat3.adhocPenaltyComment) applicationData.additionalDetails.adhocPenaltyComment = (parsedAdhocRebateData === null || parsedAdhocRebateData === void 0 ? void 0 : (_parsedAdhocRebateDat4 = parsedAdhocRebateData.value) === null || _parsedAdhocRebateDat4 === void 0 ? void 0 : _parsedAdhocRebateDat4.adhocPenaltyComment) || "";
      if (parsedAdhocRebateData !== null && parsedAdhocRebateData !== void 0 && (_parsedAdhocRebateDat5 = parsedAdhocRebateData.value) !== null && _parsedAdhocRebateDat5 !== void 0 && _parsedAdhocRebateDat5.adhocPenaltyReason) applicationData.additionalDetails.adhocPenaltyReason = (parsedAdhocRebateData === null || parsedAdhocRebateData === void 0 ? void 0 : (_parsedAdhocRebateDat6 = parsedAdhocRebateData.value) === null || _parsedAdhocRebateDat6 === void 0 ? void 0 : _parsedAdhocRebateDat6.adhocPenaltyReason) || "";
      if (parsedAdhocRebateData !== null && parsedAdhocRebateData !== void 0 && (_parsedAdhocRebateDat7 = parsedAdhocRebateData.value) !== null && _parsedAdhocRebateDat7 !== void 0 && _parsedAdhocRebateDat7.adhocRebate) applicationData.additionalDetails.adhocRebate = parseInt(parsedAdhocRebateData === null || parsedAdhocRebateData === void 0 ? void 0 : (_parsedAdhocRebateDat8 = parsedAdhocRebateData.value) === null || _parsedAdhocRebateDat8 === void 0 ? void 0 : _parsedAdhocRebateDat8.adhocRebate) || "";
      if (parsedAdhocRebateData !== null && parsedAdhocRebateData !== void 0 && (_parsedAdhocRebateDat9 = parsedAdhocRebateData.value) !== null && _parsedAdhocRebateDat9 !== void 0 && _parsedAdhocRebateDat9.adhocRebateComment) applicationData.additionalDetails.adhocRebateComment = (parsedAdhocRebateData === null || parsedAdhocRebateData === void 0 ? void 0 : (_parsedAdhocRebateDat10 = parsedAdhocRebateData.value) === null || _parsedAdhocRebateDat10 === void 0 ? void 0 : _parsedAdhocRebateDat10.adhocRebateComment) || "";
      if (parsedAdhocRebateData !== null && parsedAdhocRebateData !== void 0 && (_parsedAdhocRebateDat11 = parsedAdhocRebateData.value) !== null && _parsedAdhocRebateDat11 !== void 0 && _parsedAdhocRebateDat11.adhocRebateReason) applicationData.additionalDetails.adhocRebateReason = (parsedAdhocRebateData === null || parsedAdhocRebateData === void 0 ? void 0 : (_parsedAdhocRebateDat12 = parsedAdhocRebateData.value) === null || _parsedAdhocRebateDat12 === void 0 ? void 0 : _parsedAdhocRebateDat12.adhocRebateReason) || "";
      ((_applicationData12 = applicationData) === null || _applicationData12 === void 0 ? void 0 : _applicationData12.serviceType) == "WATER" ? submitAction({
        WaterConnection: applicationData
      }) : submitAction({
        SewerageConnection: applicationData
      });
    }
  }
  useEffect(() => {
    var _applicationData13, _applicationData13$pr, _applicationData14, _applicationData14$pr;
    if (((_applicationData13 = applicationData) === null || _applicationData13 === void 0 ? void 0 : (_applicationData13$pr = _applicationData13.processInstance) === null || _applicationData13$pr === void 0 ? void 0 : _applicationData13$pr.businessService) == "DisconnectWSConnection" || ((_applicationData14 = applicationData) === null || _applicationData14 === void 0 ? void 0 : (_applicationData14$pr = _applicationData14.processInstance) === null || _applicationData14$pr === void 0 ? void 0 : _applicationData14$pr.businessService) == "DisconnectSWConnection") {
      if (action) {
        setConfig(configWSDisConnectApplication({
          t,
          action,
          approvers,
          selectedApprover,
          setSelectedApprover,
          selectFile,
          uploadedFile,
          setUploadedFile,
          businessService,
          error
        }));
      }
    } else {
      if (action) {
        setConfig(configWSApproverApplication({
          t,
          action,
          approvers,
          selectedApprover,
          setSelectedApprover,
          selectFile,
          uploadedFile,
          setUploadedFile,
          businessService,
          error
        }));
      }
    }
  }, [action, approvers, uploadedFile, error]);
  return action && config.form ? /*#__PURE__*/React.createElement(Modal, {
    headerBarMain: /*#__PURE__*/React.createElement(Heading$5, {
      label: t(config.label.heading)
    }),
    headerBarEnd: /*#__PURE__*/React.createElement(CloseBtn$5, {
      onClick: closeModal
    }),
    actionCancelLabel: t(config.label.cancel),
    actionCancelOnSubmit: closeModal,
    actionSaveLabel: t(config.label.submit),
    actionSaveOnSubmit: () => {},
    formId: "modal-action",
    style: isMobile && isEmployee ? {
      width: "100%",
      height: "auto"
    } : {}
  }, PTALoading ? /*#__PURE__*/React.createElement(Loader, null) : /*#__PURE__*/React.createElement(FormComposer, {
    config: config.form,
    noBoxShadow: true,
    inline: true,
    childrenAtTheBottom: true,
    onSubmit: submit,
    defaultValues: defaultValues,
    formId: "modal-action"
  })) : /*#__PURE__*/React.createElement(Loader, null);
};

const ActionModal$6 = props => {
  if (props !== null && props !== void 0 && props.businessService.includes("PT")) {
    return /*#__PURE__*/React.createElement(ActionModal, props);
  }
  if (props !== null && props !== void 0 && props.businessService.includes("NewTL") || props !== null && props !== void 0 && props.businessService.includes("TL") || props !== null && props !== void 0 && props.businessService.includes("EDITRENEWAL") || props !== null && props !== void 0 && props.businessService.includes("DIRECTRENEWAL")) {
    return /*#__PURE__*/React.createElement(ActionModal$1, props);
  }
  if (props !== null && props !== void 0 && props.moduleCode.includes("BPAREG")) {
    return /*#__PURE__*/React.createElement(ActionModal$2, props);
  }
  if (props !== null && props !== void 0 && props.moduleCode.includes("BPA")) {
    return /*#__PURE__*/React.createElement(ActionModal$3, props);
  }
  if (props !== null && props !== void 0 && props.moduleCode.includes("NOC")) {
    return /*#__PURE__*/React.createElement(ActionModal$4, props);
  }
  if (props !== null && props !== void 0 && props.moduleCode.includes("WS")) {
    return /*#__PURE__*/React.createElement(ActionModal$5, props);
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

function DocumentsPreview({
  documents,
  svgStyles = {},
  isSendBackFlow = false,
  isHrLine = false,
  titleStyles
}) {
  const {
    t
  } = useTranslation();
  const isStakeholderApplication = window.location.href.includes("stakeholder");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "19px"
    }
  }, !isStakeholderApplication && (documents === null || documents === void 0 ? void 0 : documents.map((document, index) => {
    var _document$values;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: index
    }, document !== null && document !== void 0 && document.title ? /*#__PURE__*/React.createElement(CardSubHeader, {
      style: titleStyles ? titleStyles : {
        marginTop: "32px",
        marginBottom: "8px",
        color: "#505A5F",
        fontSize: "24px"
      }
    }, t(document === null || document === void 0 ? void 0 : document.title)) : null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start"
      }
    }, document !== null && document !== void 0 && document.values && (document === null || document === void 0 ? void 0 : document.values.length) > 0 ? document === null || document === void 0 ? void 0 : (_document$values = document.values) === null || _document$values === void 0 ? void 0 : _document$values.map((value, index) => {
      var _value$documentType;
      return /*#__PURE__*/React.createElement("a", {
        target: "_",
        href: value === null || value === void 0 ? void 0 : value.url,
        style: {
          minWidth: "80px",
          marginRight: "10px",
          maxWidth: "100px",
          height: "auto",
          minWidth: "100px"
        },
        key: index
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "center"
        }
      }, /*#__PURE__*/React.createElement(PDFSvg, null)), /*#__PURE__*/React.createElement("p", {
        style: {
          marginTop: "8px",
          fontWeight: "bold",
          textAlign: "center",
          color: "#505A5F"
        }
      }, t(value === null || value === void 0 ? void 0 : value.title)), isSendBackFlow ? value !== null && value !== void 0 && (_value$documentType = value.documentType) !== null && _value$documentType !== void 0 && _value$documentType.includes("NOC") ? /*#__PURE__*/React.createElement("p", {
        style: {
          textAlign: "center"
        }
      }, t(value === null || value === void 0 ? void 0 : value.documentType.split(".")[1])) : /*#__PURE__*/React.createElement("p", {
        style: {
          textAlign: "center"
        }
      }, t(value === null || value === void 0 ? void 0 : value.documentType)) : "");
    }) : !window.location.href.includes("citizen") && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, t("BPA_NO_DOCUMENTS_UPLOADED_LABEL")))), isHrLine && (documents === null || documents === void 0 ? void 0 : documents.length) != index + 1 ? /*#__PURE__*/React.createElement("hr", {
      style: {
        color: "#D6D5D4",
        backgroundColor: "#D6D5D4",
        height: "2px",
        marginTop: "20px",
        marginBottom: "20px"
      }
    }) : null);
  })), isStakeholderApplication && (documents === null || documents === void 0 ? void 0 : documents.map((document, index) => {
    var _document$values2;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: index
    }, document !== null && document !== void 0 && document.title ? /*#__PURE__*/React.createElement(CardSubHeader, {
      style: {
        marginTop: "32px",
        marginBottom: "8px",
        color: "#505A5F",
        fontSize: "24px"
      }
    }, t(document === null || document === void 0 ? void 0 : document.title)) : null, /*#__PURE__*/React.createElement("div", null, document !== null && document !== void 0 && document.values && (document === null || document === void 0 ? void 0 : document.values.length) > 0 ? document === null || document === void 0 ? void 0 : (_document$values2 = document.values) === null || _document$values2 === void 0 ? void 0 : _document$values2.map((value, index) => /*#__PURE__*/React.createElement("a", {
      target: "_",
      href: value === null || value === void 0 ? void 0 : value.url,
      style: {
        minWidth: svgStyles !== null && svgStyles !== void 0 && svgStyles.minWidth ? svgStyles === null || svgStyles === void 0 ? void 0 : svgStyles.minWidth : "160px",
        marginRight: "20px"
      },
      key: index
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: "940px",
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid #D6D5D4",
        background: "#FAFAFA"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: "8px",
        fontWeight: "bold",
        marginBottom: "10px"
      }
    }, t(value === null || value === void 0 ? void 0 : value.title)), value !== null && value !== void 0 && value.docInfo ? /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: "12px",
        color: "#505A5F",
        fontWeight: 400,
        lineHeight: "15px",
        marginBottom: "10px"
      }
    }, `${t(value === null || value === void 0 ? void 0 : value.docInfo)}`) : null, /*#__PURE__*/React.createElement(PDFSvg, null), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: "8px",
        fontSize: "16px",
        lineHeight: "19px",
        color: "#505A5F",
        fontWeight: "400",
        textAlign: "center",
        color: "#505A5F"
      }
    }, `${t(value === null || value === void 0 ? void 0 : value.title)}`)))) : !window.location.href.includes("citizen") && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, t("BPA_NO_DOCUMENTS_UPLOADED_LABEL")))));
  })));
}

const BPADocuments = ({
  t,
  formData,
  applicationData,
  docs,
  bpaActionsDetails
}) => {
  var _bpaActionsDetails$da, _formData$documents;
  const applicationStatus = (applicationData === null || applicationData === void 0 ? void 0 : applicationData.status) || "";
  const actions = (bpaActionsDetails === null || bpaActionsDetails === void 0 ? void 0 : (_bpaActionsDetails$da = bpaActionsDetails.data) === null || _bpaActionsDetails$da === void 0 ? void 0 : _bpaActionsDetails$da.nextActions) || [];
  const stateId = Digit.ULBService.getStateId();
  const [documents, setDocuments] = useState((formData === null || formData === void 0 ? void 0 : (_formData$documents = formData.documents) === null || _formData$documents === void 0 ? void 0 : _formData$documents.documents) || []);
  const [error, setError] = useState(null);
  const [bpaTaxDocuments, setBpaTaxDocuments] = useState([]);
  const [enableSubmit, setEnableSubmit] = useState(true);
  const [checkRequiredFields, setCheckRequiredFields] = useState(false);
  const [checkEnablingDocs, setCheckEnablingDocs] = useState(false);
  const {
    isLoading: bpaDocsLoading,
    data: bpaDocs
  } = Digit.Hooks.obps.useMDMS(stateId, "BPA", ["DocTypeMapping"]);
  const {
    isLoading: commonDocsLoading,
    data: commonDocs
  } = Digit.Hooks.obps.useMDMS(stateId, "common-masters", ["DocumentType"]);
  useEffect(() => {
    var _bpaDocs$BPA, _filtredBpaDocs, _filtredBpaDocs$, _filtredBpaDocs$$docT;
    let filtredBpaDocs = [];
    if (bpaDocs !== null && bpaDocs !== void 0 && (_bpaDocs$BPA = bpaDocs.BPA) !== null && _bpaDocs$BPA !== void 0 && _bpaDocs$BPA.DocTypeMapping) {
      var _bpaDocs$BPA2, _bpaDocs$BPA2$DocType;
      filtredBpaDocs = bpaDocs === null || bpaDocs === void 0 ? void 0 : (_bpaDocs$BPA2 = bpaDocs.BPA) === null || _bpaDocs$BPA2 === void 0 ? void 0 : (_bpaDocs$BPA2$DocType = _bpaDocs$BPA2.DocTypeMapping) === null || _bpaDocs$BPA2$DocType === void 0 ? void 0 : _bpaDocs$BPA2$DocType.filter(data => {
        var _applicationData$addi, _applicationData$addi2;
        return data.WFState == (applicationData === null || applicationData === void 0 ? void 0 : applicationData.status) ? applicationData === null || applicationData === void 0 ? void 0 : applicationData.status :  data.RiskType == (applicationData === null || applicationData === void 0 ? void 0 : applicationData.riskType) && data.ServiceType == (applicationData === null || applicationData === void 0 ? void 0 : (_applicationData$addi = applicationData.additionalDetails) === null || _applicationData$addi === void 0 ? void 0 : _applicationData$addi.serviceType) && data.applicationType == (applicationData === null || applicationData === void 0 ? void 0 : (_applicationData$addi2 = applicationData.additionalDetails) === null || _applicationData$addi2 === void 0 ? void 0 : _applicationData$addi2.applicationType);
      });
    }
    let documentsList = [];
    (_filtredBpaDocs = filtredBpaDocs) === null || _filtredBpaDocs === void 0 ? void 0 : (_filtredBpaDocs$ = _filtredBpaDocs[0]) === null || _filtredBpaDocs$ === void 0 ? void 0 : (_filtredBpaDocs$$docT = _filtredBpaDocs$.docTypes) === null || _filtredBpaDocs$$docT === void 0 ? void 0 : _filtredBpaDocs$$docT.forEach(doc => {
      var _commonDocs$commonMa, _commonDocs$commonMa$, _docs$, _docs$$values;
      let code = doc.code;
      doc.dropdownData = [];
      doc.uploadedDocuments = [];
      commonDocs === null || commonDocs === void 0 ? void 0 : (_commonDocs$commonMa = commonDocs["common-masters"]) === null || _commonDocs$commonMa === void 0 ? void 0 : (_commonDocs$commonMa$ = _commonDocs$commonMa.DocumentType) === null || _commonDocs$commonMa$ === void 0 ? void 0 : _commonDocs$commonMa$.forEach(value => {
        let values = value.code.slice(0, code.length);
        if (code === values) {
          doc.hasDropdown = true;
          value.i18nKey = value.code;
          doc.dropdownData.push(value);
        }
      });
      doc.uploadedDocuments[0] = {};
      doc.uploadedDocuments[0].values = [];
      docs === null || docs === void 0 ? void 0 : (_docs$ = docs[0]) === null || _docs$ === void 0 ? void 0 : (_docs$$values = _docs$.values) === null || _docs$$values === void 0 ? void 0 : _docs$$values.map(upDocs => {
        var _upDocs$documentType, _upDocs$documentType2;
        if (code === `${upDocs === null || upDocs === void 0 ? void 0 : (_upDocs$documentType = upDocs.documentType) === null || _upDocs$documentType === void 0 ? void 0 : _upDocs$documentType.split('.')[0]}.${upDocs === null || upDocs === void 0 ? void 0 : (_upDocs$documentType2 = upDocs.documentType) === null || _upDocs$documentType2 === void 0 ? void 0 : _upDocs$documentType2.split('.')[1]}`) {
          doc.uploadedDocuments[0].values.push(upDocs);
        }
      });
      documentsList.push(doc);
    });
    sessionStorage.setItem("BPA_DOCUMENTS", JSON.stringify(documentsList));
    setBpaTaxDocuments(documentsList);
  }, [!bpaDocsLoading, !commonDocsLoading]);
  useEffect(() => {
    let count = 0;
    bpaTaxDocuments.map(doc => {
      let isRequired = false;
      documents.map(data => {
        if (doc.required && doc.code == `${data.documentType.split('.')[0]}.${data.documentType.split('.')[1]}`) {
          isRequired = true;
        }
      });
      if (!isRequired && doc.required) {
        count = count + 1;
      }
    });
    if ((count == "0" || count == 0) && documents.length > 0) setEnableSubmit(false);else setEnableSubmit(true);
  }, [documents, checkRequiredFields]);
  useEffect(() => {
    if (applicationStatus === "DOC_VERIFICATION_INPROGRESS" && (actions === null || actions === void 0 ? void 0 : actions.length) > 0) setCheckEnablingDocs(true);else setCheckEnablingDocs(false);
  }, [applicationData, bpaActionsDetails]);
  return /*#__PURE__*/React.createElement("div", null, bpaTaxDocuments === null || bpaTaxDocuments === void 0 ? void 0 : bpaTaxDocuments.map((document, index) => {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SelectDocument, {
      key: index,
      index: index,
      document: document,
      t: t,
      error: error,
      setError: setError,
      setDocuments: setDocuments,
      documents: documents,
      setCheckRequiredFields: setCheckRequiredFields,
      applicationStatus: applicationStatus,
      actions: actions,
      bpaTaxDocuments: bpaTaxDocuments,
      checkEnablingDocs: checkEnablingDocs
    }));
  }));
};
function SelectDocument({
  t,
  document: doc,
  setDocuments,
  error,
  setError,
  documents,
  setCheckRequiredFields,
  index,
  applicationStatus,
  actions,
  bpaTaxDocuments,
  checkEnablingDocs
}) {
  var _doc$dropdownData, _doc$uploadedDocument;
  const filteredDocument = documents === null || documents === void 0 ? void 0 : documents.filter(item => {
    var _item$documentType;
    return item === null || item === void 0 ? void 0 : (_item$documentType = item.documentType) === null || _item$documentType === void 0 ? void 0 : _item$documentType.includes(doc === null || doc === void 0 ? void 0 : doc.code);
  })[0];
  const tenantId = Digit.ULBService.getStateId();
  const [selectedDocument, setSelectedDocument] = useState(filteredDocument ? {
    ...filteredDocument,
    active: true,
    code: filteredDocument === null || filteredDocument === void 0 ? void 0 : filteredDocument.documentType,
    i18nKey: filteredDocument === null || filteredDocument === void 0 ? void 0 : filteredDocument.documentType
  } : (doc === null || doc === void 0 ? void 0 : (_doc$dropdownData = doc.dropdownData) === null || _doc$dropdownData === void 0 ? void 0 : _doc$dropdownData.length) === 1 ? doc === null || doc === void 0 ? void 0 : doc.dropdownData[0] : {});
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(() => (filteredDocument === null || filteredDocument === void 0 ? void 0 : filteredDocument.fileStoreId) || null);
  const [selectArrayFiles, SetSelectArrayFiles] = useState([]);
  const handleSelectDocument = value => setSelectedDocument(value);
  const allowedFileTypes = /(.*?)(jpg|jpeg|png|image|pdf)$/i;
  function selectfiles(e) {
    e && setFile(e.file);
  }
  useEffect(() => {
    if (selectedDocument !== null && selectedDocument !== void 0 && selectedDocument.code) {
      setDocuments(prev => {
        var _documents$find;
        const filteredDocumentsByDocumentType = prev === null || prev === void 0 ? void 0 : prev.filter(item => (item === null || item === void 0 ? void 0 : item.documentType) !== (selectedDocument === null || selectedDocument === void 0 ? void 0 : selectedDocument.code));
        if ((uploadedFile === null || uploadedFile === void 0 ? void 0 : uploadedFile.length) === 0 || uploadedFile === null) return filteredDocumentsByDocumentType;
        const filteredDocumentsByFileStoreId = filteredDocumentsByDocumentType === null || filteredDocumentsByDocumentType === void 0 ? void 0 : filteredDocumentsByDocumentType.filter(item => (item === null || item === void 0 ? void 0 : item.fileStoreId) !== uploadedFile);
        return [...filteredDocumentsByFileStoreId, {
          documentType: selectedDocument === null || selectedDocument === void 0 ? void 0 : selectedDocument.code,
          fileStoreId: uploadedFile,
          documentUid: uploadedFile,
          fileName: (file === null || file === void 0 ? void 0 : file.name) || "",
          id: documents ? (_documents$find = documents.find(x => x.documentType === (selectedDocument === null || selectedDocument === void 0 ? void 0 : selectedDocument.code))) === null || _documents$find === void 0 ? void 0 : _documents$find.id : undefined
        }];
      });
    }
  }, [uploadedFile, selectedDocument]);
  useEffect(() => {
    (async () => {
      if (selectArrayFiles.length > 0) {
        sessionStorage.removeItem("BPA_DOCUMENTS");
        doc.newUploadedDocs = [];
        selectArrayFiles.map(newDoc => {
          if (selectedDocument !== null && selectedDocument !== void 0 && selectedDocument.code) {
            var _newDoc$fileStoreId, _newDoc$fileStoreId2, _newDoc$fileStoreId3;
            doc.newUploadedDocs.push({
              documentType: selectedDocument === null || selectedDocument === void 0 ? void 0 : selectedDocument.code,
              fileStoreId: newDoc === null || newDoc === void 0 ? void 0 : (_newDoc$fileStoreId = newDoc.fileStoreId) === null || _newDoc$fileStoreId === void 0 ? void 0 : _newDoc$fileStoreId.fileStoreId,
              documentUid: newDoc === null || newDoc === void 0 ? void 0 : (_newDoc$fileStoreId2 = newDoc.fileStoreId) === null || _newDoc$fileStoreId2 === void 0 ? void 0 : _newDoc$fileStoreId2.fileStoreId,
              tenantId: newDoc === null || newDoc === void 0 ? void 0 : (_newDoc$fileStoreId3 = newDoc.fileStoreId) === null || _newDoc$fileStoreId3 === void 0 ? void 0 : _newDoc$fileStoreId3.tenantId
            });
          }
        });
        bpaTaxDocuments[index] = doc;
        sessionStorage.setItem("BPA_DOCUMENTS", JSON.stringify(bpaTaxDocuments));
      }
    })();
  }, [selectArrayFiles, selectedDocument]);
  useEffect(() => {
  }, [file]);
  const getData = (index, state) => {
    let data = Object.fromEntries(state);
    let newArr = Object.values(data);
    if (Object.keys(data).length !== 0) SetSelectArrayFiles(newArr);
    selectfiles(newArr[newArr.length - 1]);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "24px",
      maxWidth: "950px",
      minWidth: "280px",
      background: "#FAFAFA",
      borderRadius: "4px",
      border: "1px solid #D6D5D4",
      padding: "8px"
    }
  }, /*#__PURE__*/React.createElement(CardSubHeader, {
    style: {
      marginBottom: "8px",
      paddingBottom: "9px",
      color: "#0B0C0C",
      fontSize: "16px",
      lineHeight: "19px"
    }
  }, `${t(doc === null || doc === void 0 ? void 0 : doc.code)}`), (doc === null || doc === void 0 ? void 0 : (_doc$uploadedDocument = doc.uploadedDocuments) === null || _doc$uploadedDocument === void 0 ? void 0 : _doc$uploadedDocument.length) && /*#__PURE__*/React.createElement(DocumentsPreview, {
    documents: doc === null || doc === void 0 ? void 0 : doc.uploadedDocuments,
    svgStyles: {
      width: "100px",
      height: "100px",
      viewBox: "0 0 25 25",
      minWidth: "100px"
    }
  }), checkEnablingDocs ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "20px"
    }
  }, /*#__PURE__*/React.createElement(LabelFieldPair, {
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(CardLabel, {
    style: {
      marginTop: "-10px",
      width: "100%"
    }
  }, doc !== null && doc !== void 0 && doc.required ? `${t(doc === null || doc === void 0 ? void 0 : doc.code)}* ` : `${t(doc === null || doc === void 0 ? void 0 : doc.code)}`), /*#__PURE__*/React.createElement(Dropdown, {
    className: "form-field",
    t: t,
    isMandatory: false,
    option: doc === null || doc === void 0 ? void 0 : doc.dropdownData,
    selected: selectedDocument,
    optionKey: "i18nKey",
    select: handleSelectDocument,
    style: {
      width: "100%"
    }
  })), /*#__PURE__*/React.createElement(LabelFieldPair, {
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(CardLabel, {
    className: "card-label-smaller",
    style: {
      width: "100%"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "field",
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(MultiUploadWrapper, {
    module: "BPA",
    tenantId: tenantId,
    getFormState: e => getData(index, e),
    t: t,
    allowedFileTypesRegex: allowedFileTypes,
    allowedMaxSizeInMB: 5,
    acceptFiles: "image/*, .pdf, .png, .jpeg, .jpg"
  })))) : null);
}

const getDocuments = fiDocuments => {
  const returnDocuments = [{
    title: "BPA_DOCUMENT_DETAILS_LABEL",
    values: fiDocuments === null || fiDocuments === void 0 ? void 0 : fiDocuments.map(doc => {
      var _doc$documentType;
      return {
        title: doc === null || doc === void 0 ? void 0 : (_doc$documentType = doc.documentType) === null || _doc$documentType === void 0 ? void 0 : _doc$documentType.replaceAll('.', '_'),
        documentType: doc === null || doc === void 0 ? void 0 : doc.documentType,
        documentUid: doc === null || doc === void 0 ? void 0 : doc.documentUid,
        fileStoreId: doc === null || doc === void 0 ? void 0 : doc.fileStoreId,
        id: doc === null || doc === void 0 ? void 0 : doc.id,
        url: doc === null || doc === void 0 ? void 0 : doc.url
      };
    })
  }];
  return returnDocuments;
};
function InspectionReport({
  fiReport,
  isCitizen = false
}) {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "10px"
    }
  }, isCitizen ? /*#__PURE__*/React.createElement(CardHeader, {
    style: {
      fontSize: "24px"
    }
  }, `${t(`BPA_FI_REPORT`)}`) : /*#__PURE__*/React.createElement(CardSectionHeader, {
    style: {
      fontSize: "24px"
    }
  }, `${t(`BPA_FI_REPORT`)}`), fiReport.map((fiData, index) => {
    var _fiData$date, _fiData$date2, _fiData$date3, _fiData$questions, _fiData$questions2;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#FAFAFA",
        border: "1px solid #D6D5D4",
        padding: "8px",
        borderRadius: "4px",
        maxWidth: "950px",
        minWidth: "280px",
        marginBottom: "24px"
      }
    }, /*#__PURE__*/React.createElement(StatusTable, null, /*#__PURE__*/React.createElement(CardSectionHeader, {
      style: {
        fontSize: "20px"
      }
    }, (fiReport === null || fiReport === void 0 ? void 0 : fiReport.length) == 1 ? `${t(`BPA_FI_REPORT`)}` : `${t(`BPA_FI_REPORT`)} - ${index + 1}`), /*#__PURE__*/React.createElement(Row, {
      className: "border-none",
      label: `${t(`BPA_FI_DATE_LABEL`)}`,
      text: fiData !== null && fiData !== void 0 && fiData.date ? fiData.date.includes("-") ? `${(_fiData$date = fiData.date) === null || _fiData$date === void 0 ? void 0 : _fiData$date.split("-")[2]}/${(_fiData$date2 = fiData.date) === null || _fiData$date2 === void 0 ? void 0 : _fiData$date2.split("-")[1]}/${(_fiData$date3 = fiData.date) === null || _fiData$date3 === void 0 ? void 0 : _fiData$date3.split("-")[0]}` : fiData === null || fiData === void 0 ? void 0 : fiData.date : "NA"
    }), /*#__PURE__*/React.createElement(Row, {
      className: "border-none",
      label: `${t(`BPA_FI_TIME_LABEL`)}`,
      text: fiData !== null && fiData !== void 0 && fiData.time ? fiData === null || fiData === void 0 ? void 0 : fiData.time : "NA"
    }), (fiData === null || fiData === void 0 ? void 0 : (_fiData$questions = fiData.questions) === null || _fiData$questions === void 0 ? void 0 : _fiData$questions.length) && (fiData === null || fiData === void 0 ? void 0 : (_fiData$questions2 = fiData.questions) === null || _fiData$questions2 === void 0 ? void 0 : _fiData$questions2.map(qstn => /*#__PURE__*/React.createElement("div", {
      style: {
        background: "white",
        border: "1px solid #D6D5D4",
        padding: "8px",
        borderRadius: "4px",
        marginTop: "10px"
      }
    }, /*#__PURE__*/React.createElement(Row, {
      className: "border-none",
      label: `${t(`${qstn.question}`)}`,
      text: qstn !== null && qstn !== void 0 && qstn.value ? qstn === null || qstn === void 0 ? void 0 : qstn.value : "NA"
    }), /*#__PURE__*/React.createElement(Row, {
      className: "border-none",
      label: `${t(`BPA_ENTER_REMARKS`)}`,
      text: qstn.remarks ? qstn.remarks : "NA"
    })))), /*#__PURE__*/React.createElement(DocumentsPreview, {
      documents: getDocuments(fiData === null || fiData === void 0 ? void 0 : fiData.docs),
      svgStyles: {
        width: "100px",
        height: "100px",
        viewBox: "0 0 25 25",
        minWidth: "100px"
      }
    })));
  })));
}

function SelectDocument$1({
  t,
  document: doc,
  setNocDocuments,
  setError,
  nocDocuments
}) {
  const filteredDocument = nocDocuments === null || nocDocuments === void 0 ? void 0 : nocDocuments.filter(item => {
    var _item$documentType;
    return item === null || item === void 0 ? void 0 : (_item$documentType = item.documentType) === null || _item$documentType === void 0 ? void 0 : _item$documentType.includes(doc === null || doc === void 0 ? void 0 : doc.code);
  })[0];
  const tenantId = Digit.ULBService.getStateId();
  const [selectedDocument, setSelectedDocument] = useState();
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(() => (filteredDocument === null || filteredDocument === void 0 ? void 0 : filteredDocument.fileStoreId) || null);
  const allowedFileTypes = /(.*?)(jpg|jpeg|png|image|pdf)$/i;
  function selectfile(e) {
    e && setFile(e.file);
  }
  useEffect(() => {
    var _doc$dropdownData, _doc$dropdownData$;
    if (doc !== null && doc !== void 0 && (_doc$dropdownData = doc.dropdownData) !== null && _doc$dropdownData !== void 0 && (_doc$dropdownData$ = _doc$dropdownData[0]) !== null && _doc$dropdownData$ !== void 0 && _doc$dropdownData$.code) {
      setNocDocuments(prev => {
        var _doc$dropdownData3;
        const filteredDocumentsByDocumentType = prev === null || prev === void 0 ? void 0 : prev.filter(item => {
          var _doc$dropdownData2, _doc$dropdownData2$;
          return (item === null || item === void 0 ? void 0 : item.documentType) !== (doc === null || doc === void 0 ? void 0 : (_doc$dropdownData2 = doc.dropdownData) === null || _doc$dropdownData2 === void 0 ? void 0 : (_doc$dropdownData2$ = _doc$dropdownData2[0]) === null || _doc$dropdownData2$ === void 0 ? void 0 : _doc$dropdownData2$.code);
        });
        if ((uploadedFile === null || uploadedFile === void 0 ? void 0 : uploadedFile.length) === 0 || uploadedFile === null) {
          return filteredDocumentsByDocumentType;
        }
        const filteredDocumentsByFileStoreId = filteredDocumentsByDocumentType === null || filteredDocumentsByDocumentType === void 0 ? void 0 : filteredDocumentsByDocumentType.filter(item => (item === null || item === void 0 ? void 0 : item.fileStoreId) !== uploadedFile);
        return [...filteredDocumentsByFileStoreId, {
          documentType: doc === null || doc === void 0 ? void 0 : (_doc$dropdownData3 = doc.dropdownData) === null || _doc$dropdownData3 === void 0 ? void 0 : _doc$dropdownData3[0].code,
          fileStoreId: uploadedFile,
          documentUid: uploadedFile,
          fileName: (file === null || file === void 0 ? void 0 : file.name) || ""
        }];
      });
    }
  }, [uploadedFile]);
  useEffect(() => {
    (async () => {
      setError(null);
      if (file) {
        const allowedFileTypesRegex = /(.*?)(jpg|jpeg|png|image|pdf)$/i;
        if (file.size >= 5242880) {
          setError(t("CS_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else if (file !== null && file !== void 0 && file.type && !allowedFileTypesRegex.test(file === null || file === void 0 ? void 0 : file.type)) {
          setError(t(`NOT_SUPPORTED_FILE_TYPE`));
        } else {
          try {
            var _response$data, _response$data$files;
            setUploadedFile(null);
            const response = await Digit.UploadServices.Filestorage("PT", file, Digit.ULBService.getStateId());
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
  const getData = state => {
    let data = Object.fromEntries(state);
    let newArr = Object.values(data);
    selectfile(newArr[newArr.length - 1]);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {}
  }, /*#__PURE__*/React.createElement(LabelFieldPair, {
    style: {
      width: "98%",
      marginRight: "10px"
    }
  }, /*#__PURE__*/React.createElement(CardLabel, {
    style: {
      width: "100%"
    }
  }, doc !== null && doc !== void 0 && doc.required ? `${t("TL_BUTTON_UPLOAD FILE")}*` : `${t("TL_BUTTON_UPLOAD FILE")}`), /*#__PURE__*/React.createElement("div", {
    className: "field",
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(MultiUploadWrapper, {
    module: "NOC",
    tenantId: tenantId,
    getFormState: e => getData(e),
    t: t,
    allowedFileTypesRegex: allowedFileTypes,
    allowedMaxSizeInMB: 5,
    acceptFiles: "image/*, .pdf, .png, .jpeg, .jpg"
  }))));
}
const NOCDocuments = ({
  t,
  noc,
  docs,
  isNoc,
  applicationData,
  NOCdata,
  bpaActionsDetails
}) => {
  var _bpaActionsDetails$da;
  const tenantId = Digit.ULBService.getStateId();
  const stateId = Digit.ULBService.getStateId();
  const bpaApplicationStatus = (applicationData === null || applicationData === void 0 ? void 0 : applicationData.status) || "";
  const actions = (bpaActionsDetails === null || bpaActionsDetails === void 0 ? void 0 : (_bpaActionsDetails$da = bpaActionsDetails.data) === null || _bpaActionsDetails$da === void 0 ? void 0 : _bpaActionsDetails$da.nextActions) || [];
  const {
    isLoading: nocDocsLoading,
    data: nocDocs
  } = Digit.Hooks.obps.useMDMS(stateId, "NOC", ["DocumentTypeMapping"], {
    enabled: isNoc
  });
  const {
    isLoading: bpaDocsLoading,
    data: bpaDocs
  } = Digit.Hooks.obps.useMDMS(stateId, "BPA", ["DocTypeMapping"], {
    enabled: !isNoc
  });
  const {
    isLoading: commonDocsLoading,
    data: commonDocs
  } = Digit.Hooks.obps.useMDMS(stateId, "common-masters", ["DocumentType"]);
  const [commonDocMaping, setCommonDocMaping] = useState([]);
  const [nocTaxDocuments, setNocTaxDocuments] = useState([]);
  const [checkEnablingDocs, setCheckEnablingDocs] = useState(false);
  const [nocDocuments, setNocDocuments] = Digit.Hooks.useSessionStorage(noc === null || noc === void 0 ? void 0 : noc.nocType, []);
  const [error, setError] = useState(null);
  const isEmployee = window.location.href.includes("/employee/");
  useEffect(() => {
    var _commonDocs$commonMa;
    setCommonDocMaping(commonDocs === null || commonDocs === void 0 ? void 0 : (_commonDocs$commonMa = commonDocs["common-masters"]) === null || _commonDocs$commonMa === void 0 ? void 0 : _commonDocs$commonMa.DocumentType);
  }, [commonDocs]);
  useEffect(() => {
    var _filteredData, _filteredData$, _filteredData$$docTyp;
    let documents = [];
    let filteredData;
    if (isNoc) {
      var _nocDocs$NOC, _nocDocs$NOC$Document;
      filteredData = nocDocs === null || nocDocs === void 0 ? void 0 : (_nocDocs$NOC = nocDocs.NOC) === null || _nocDocs$NOC === void 0 ? void 0 : (_nocDocs$NOC$Document = _nocDocs$NOC.DocumentTypeMapping) === null || _nocDocs$NOC$Document === void 0 ? void 0 : _nocDocs$NOC$Document.filter(data => {
        return (data === null || data === void 0 ? void 0 : data.applicationType) === (noc === null || noc === void 0 ? void 0 : noc.applicationType) && (data === null || data === void 0 ? void 0 : data.nocType) === (noc === null || noc === void 0 ? void 0 : noc.nocType);
      });
    } else {
      var _bpaDocs$BPA, _bpaDocs$BPA$DocTypeM;
      filteredData = bpaDocs === null || bpaDocs === void 0 ? void 0 : (_bpaDocs$BPA = bpaDocs.BPA) === null || _bpaDocs$BPA === void 0 ? void 0 : (_bpaDocs$BPA$DocTypeM = _bpaDocs$BPA.DocTypeMapping) === null || _bpaDocs$BPA$DocTypeM === void 0 ? void 0 : _bpaDocs$BPA$DocTypeM.filter(data => {
        var _applicationData$addi, _applicationData$addi2;
        return data.WFState == (applicationData === null || applicationData === void 0 ? void 0 : applicationData.status) && data.RiskType == (applicationData === null || applicationData === void 0 ? void 0 : applicationData.riskType) && data.ServiceType == (applicationData === null || applicationData === void 0 ? void 0 : (_applicationData$addi = applicationData.additionalDetails) === null || _applicationData$addi === void 0 ? void 0 : _applicationData$addi.serviceType) && data.applicationType == (applicationData === null || applicationData === void 0 ? void 0 : (_applicationData$addi2 = applicationData.additionalDetails) === null || _applicationData$addi2 === void 0 ? void 0 : _applicationData$addi2.applicationType);
      });
    }
    if ((_filteredData = filteredData) !== null && _filteredData !== void 0 && (_filteredData$ = _filteredData[0]) !== null && _filteredData$ !== void 0 && (_filteredData$$docTyp = _filteredData$.docTypes) !== null && _filteredData$$docTyp !== void 0 && _filteredData$$docTyp[0]) {
      filteredData[0].docTypes[0].nocType = filteredData[0].nocType;
      filteredData[0].docTypes[0].additionalDetails = {
        submissionDetails: noc === null || noc === void 0 ? void 0 : noc.additionalDetails,
        applicationStatus: noc === null || noc === void 0 ? void 0 : noc.applicationStatus,
        appNumberLink: noc === null || noc === void 0 ? void 0 : noc.applicationNo,
        nocNo: noc === null || noc === void 0 ? void 0 : noc.nocNo
      };
      documents.push(filteredData[0].docTypes[0]);
    }
    let documentsList = [];
    if (documents && documents.length > 0) {
      documents.map(doc => {
        let code = doc.documentType;
        doc.dropdownData = [];
        commonDocMaping === null || commonDocMaping === void 0 ? void 0 : commonDocMaping.forEach(value => {
          let values = value.code.slice(0, code === null || code === void 0 ? void 0 : code.length);
          if (code === values) {
            doc.hasDropdown = true;
            doc.dropdownData.push(value);
          }
        });
        documentsList.push(doc);
      });
      setNocTaxDocuments(documentsList);
    }
  }, [nocDocs, commonDocMaping]);
  useEffect(() => {
    if (bpaApplicationStatus === 'NOC_VERIFICATION_INPROGRESS' && (actions === null || actions === void 0 ? void 0 : actions.length) > 0) setCheckEnablingDocs(true);else setCheckEnablingDocs(false);
  }, [applicationData, bpaActionsDetails]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid #D6D5D4",
      padding: "16px 0px 16px 8px",
      background: "#FAFAFA",
      borderRadius: "5px",
      marginBottom: "24px",
      maxWidth: "950px"
    }
  }, /*#__PURE__*/React.createElement(StatusTable, null, /*#__PURE__*/React.createElement(Row, {
    label: isEmployee ? `${t(`BPA_${noc === null || noc === void 0 ? void 0 : noc.nocType}_HEADER`)}` : t(`BPA_${noc === null || noc === void 0 ? void 0 : noc.nocType}_HEADER`),
    labelStyle: {
      fontSize: "20px",
      width: "150%"
    }
  }), NOCdata && NOCdata.map((noc, index) => {
    if (noc !== null && noc !== void 0 && noc.value) {
      if ((noc === null || noc === void 0 ? void 0 : noc.field) == "STATUS") {
        return /*#__PURE__*/React.createElement(Row, {
          className: "border-none",
          label: isEmployee ? `${t(noc === null || noc === void 0 ? void 0 : noc.title)}` : t(noc === null || noc === void 0 ? void 0 : noc.title),
          text: noc !== null && noc !== void 0 && noc.value ? t(noc === null || noc === void 0 ? void 0 : noc.value) : t("CS_NA"),
          textStyle: (noc === null || noc === void 0 ? void 0 : noc.value) == "APPROVED" || (noc === null || noc === void 0 ? void 0 : noc.value) == "AUTO_APPROVED" ? {
            color: "#00703C"
          } : {
            color: "#D4351C"
          }
        });
      } else {
        return /*#__PURE__*/React.createElement(Row, {
          className: "border-none",
          label: isEmployee ? `${t(noc === null || noc === void 0 ? void 0 : noc.title)}` : t(noc === null || noc === void 0 ? void 0 : noc.title),
          text: noc !== null && noc !== void 0 && noc.value ? t(noc === null || noc === void 0 ? void 0 : noc.value) : t("CS_NA")
        });
      }
    }
  })), /*#__PURE__*/React.createElement(DocumentsPreview, {
    documents: docs,
    svgStyles: {
      width: "80px",
      height: "100px",
      viewBox: "0 0 25 25",
      minWidth: "80px"
    }
  }), checkEnablingDocs && (nocTaxDocuments === null || nocTaxDocuments === void 0 ? void 0 : nocTaxDocuments.map((document, index) => {
    return /*#__PURE__*/React.createElement(SelectDocument$1, {
      key: index,
      document: document,
      t: t,
      error: error,
      setError: setError,
      setNocDocuments: setNocDocuments,
      nocDocuments: nocDocuments,
      checkEnablingDocs: checkEnablingDocs
    });
  })));
};

const PermissionCheck = ({
  permissions,
  t
}) => {
  const [approvalChecks, setApprovalChecks, clearApprovals] = Digit.Hooks.useSessionStorage("OBPS_APPROVAL_CHECKS", permissions === null || permissions === void 0 ? void 0 : permissions.map(permission => ({
    label: permission,
    checked: false
  })));
  const [newApprovals, setNewApprovals, clearNewApprovals] = Digit.Hooks.useSessionStorage('OBPS_NEW_APPROVALS', []);
  useEffect(() => {
    return () => {
      Digit.SessionStorage.del("OBPS_NEW_APPROVALS");
      Digit.SessionStorage.del("OBPS_APPROVAL_CHECKS");
    };
  }, []);
  const handleAdd = () => {
    setNewApprovals([...newApprovals, {
      label: ''
    }]);
  };
  const handleRemove = index => {
    const values = [...newApprovals];
    values.splice(index, 1);
    setNewApprovals([...values]);
  };
  const handleChange = (event, index) => {
    setNewApprovals(() => {
      return newApprovals === null || newApprovals === void 0 ? void 0 : newApprovals.map((approval, id) => {
        if (index === id) {
          var _event$target;
          return {
            label: event === null || event === void 0 ? void 0 : (_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.value
          };
        }
        return approval;
      });
    });
  };
  const handleCheck = (event, label, index) => {
    const isChecked = event.target.checked;
    setApprovalChecks(() => {
      return approvalChecks === null || approvalChecks === void 0 ? void 0 : approvalChecks.map((approval, id) => {
        if (index === id) {
          return {
            ...approval,
            checked: isChecked
          };
        }
        return approval;
      });
    });
  };
  const isMobile = window.Digit.Utils.browser.isMobile();
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CardSubHeader, {
    style: {
      marginBottom: "16px",
      fontSize: "24px"
    }
  }, t("BPA_PERMIT_CONDITIONS")), approvalChecks === null || approvalChecks === void 0 ? void 0 : approvalChecks.map((permission, index) => /*#__PURE__*/React.createElement(CheckBox, {
    key: index,
    styles: {
      margin: "20px 0 40px",
      maxWidth: isMobile ? "100%" : "70%"
    },
    label: permission === null || permission === void 0 ? void 0 : permission.label,
    checked: permission === null || permission === void 0 ? void 0 : permission.checked,
    onChange: event => handleCheck(event, permission === null || permission === void 0 ? void 0 : permission.label, index),
    isLabelFirst: true,
    index: index
  })), newApprovals === null || newApprovals === void 0 ? void 0 : newApprovals.map((approval, index) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TextInput, {
    key: index,
    value: approval === null || approval === void 0 ? void 0 : approval.label,
    onChange: event => handleChange(event, index),
    textInputStyle: {
      maxWidth: isMobile ? "96%" : "830px",
      width: isMobile ? "96%" : "830px"
    },
    style: isMobile ? {
      paddingRight: "10%"
    } : {},
    placeholder: t("BPA_ENTER_PERMIT_CONDITIONS_LABEL")
  }), /*#__PURE__*/React.createElement(LinkButton, {
    label: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Close$c, {
      style: {
        float: "right",
        position: "relative",
        bottom: "32px",
        marginTop: "-22px",
        marginRight: isMobile ? "5%" : "35%"
      }
    }))),
    style: {},
    onClick: e => handleRemove(index)
  }))), /*#__PURE__*/React.createElement(LinkButton, {
    style: {
      color: "#a82227",
      maxWidth: isMobile ? "fit-content" : "10%",
      marginRight: "3%"
    },
    label: t(`BPA_ADD_MORE`),
    onClick: handleAdd
  }));
};

function PropertyDocuments({
  documents,
  svgStyles = {},
  isSendBackFlow = false
}) {
  const {
    t
  } = useTranslation();
  const [filesArray, setFilesArray] = useState(() => []);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [pdfFiles, setPdfFiles] = useState({});
  useEffect(() => {
    var _acc;
    let acc = [];
    documents === null || documents === void 0 ? void 0 : documents.forEach((element, index, array) => {
      acc = [...acc, ...(element.values ? element.values : [])];
    });
    setFilesArray((_acc = acc) === null || _acc === void 0 ? void 0 : _acc.map(value => value === null || value === void 0 ? void 0 : value.fileStoreId));
  }, [documents]);
  useEffect(() => {
    var _documents$;
    if (filesArray !== null && filesArray !== void 0 && filesArray.length && (documents === null || documents === void 0 ? void 0 : (_documents$ = documents[0]) === null || _documents$ === void 0 ? void 0 : _documents$.BS) === "BillAmend") {
      Digit.UploadServices.Filefetch(filesArray, Digit.ULBService.getCurrentTenantId()).then(res => {
        setPdfFiles(res === null || res === void 0 ? void 0 : res.data);
      });
    } else if (filesArray !== null && filesArray !== void 0 && filesArray.length) {
      Digit.UploadServices.Filefetch(filesArray, Digit.ULBService.getStateId()).then(res => {
        setPdfFiles(res === null || res === void 0 ? void 0 : res.data);
      });
    }
  }, [filesArray]);
  const checkLocation = window.location.href.includes("employee/tl") || window.location.href.includes("/obps") || window.location.href.includes("employee/ws");
  const isStakeholderApplication = window.location.href.includes("stakeholder");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "19px"
    }
  }, !isStakeholderApplication && (documents === null || documents === void 0 ? void 0 : documents.map((document, index) => {
    var _document$values;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: index
    }, document !== null && document !== void 0 && document.title ? /*#__PURE__*/React.createElement(CardSubHeader, {
      style: checkLocation ? {
        marginTop: "32px",
        marginBottom: "18px",
        color: "#0B0C0C, 100%",
        fontSize: "24px",
        lineHeight: "30px"
      } : {
        marginTop: "32px",
        marginBottom: "8px",
        color: "#505A5F",
        fontSize: "24px"
      }
    }, t(document === null || document === void 0 ? void 0 : document.title)) : null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start"
      }
    }, document !== null && document !== void 0 && document.values && (document === null || document === void 0 ? void 0 : document.values.length) > 0 ? document === null || document === void 0 ? void 0 : (_document$values = document.values) === null || _document$values === void 0 ? void 0 : _document$values.map((value, index) => {
      var _pdfFiles$value$fileS, _value$documentType;
      return /*#__PURE__*/React.createElement("a", {
        target: "_",
        href: (_pdfFiles$value$fileS = pdfFiles[value.fileStoreId]) === null || _pdfFiles$value$fileS === void 0 ? void 0 : _pdfFiles$value$fileS.split(",")[0],
        style: {
          minWidth: "80px",
          marginRight: "10px",
          maxWidth: "100px",
          height: "auto"
        },
        key: index
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "center"
        }
      }, /*#__PURE__*/React.createElement(PDFSvg, null)), /*#__PURE__*/React.createElement("p", {
        style: checkLocation ? {
          marginTop: "8px",
          fontWeight: "bold",
          fontSize: "16px",
          lineHeight: "19px",
          color: "#505A5F",
          textAlign: "center"
        } : {
          marginTop: "8px",
          fontWeight: "bold"
        }
      }, t(value === null || value === void 0 ? void 0 : value.title)), isSendBackFlow ? value !== null && value !== void 0 && (_value$documentType = value.documentType) !== null && _value$documentType !== void 0 && _value$documentType.includes("NOC") ? /*#__PURE__*/React.createElement("p", {
        style: {
          textAlign: "center"
        }
      }, t(value === null || value === void 0 ? void 0 : value.documentType.split(".")[1])) : /*#__PURE__*/React.createElement("p", {
        style: {
          textAlign: "center"
        }
      }, t(value === null || value === void 0 ? void 0 : value.documentType)) : "");
    }) : !window.location.href.includes("citizen") && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, t("BPA_NO_DOCUMENTS_UPLOADED_LABEL")))));
  })), isStakeholderApplication && (documents === null || documents === void 0 ? void 0 : documents.map((document, index) => {
    var _document$values2;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: index
    }, document !== null && document !== void 0 && document.title ? /*#__PURE__*/React.createElement(CardSubHeader, {
      style: {
        marginTop: "32px",
        marginBottom: "8px",
        color: "#505A5F",
        fontSize: "24px"
      }
    }, t(document === null || document === void 0 ? void 0 : document.title)) : null, /*#__PURE__*/React.createElement("div", null, document !== null && document !== void 0 && document.values && (document === null || document === void 0 ? void 0 : document.values.length) > 0 ? document === null || document === void 0 ? void 0 : (_document$values2 = document.values) === null || _document$values2 === void 0 ? void 0 : _document$values2.map((value, index) => {
      var _pdfFiles$value$fileS2;
      return /*#__PURE__*/React.createElement("a", {
        target: "_",
        href: (_pdfFiles$value$fileS2 = pdfFiles[value.fileStoreId]) === null || _pdfFiles$value$fileS2 === void 0 ? void 0 : _pdfFiles$value$fileS2.split(",")[0],
        style: {
          minWidth: svgStyles !== null && svgStyles !== void 0 && svgStyles.minWidth ? svgStyles === null || svgStyles === void 0 ? void 0 : svgStyles.minWidth : "160px",
          marginRight: "20px"
        },
        key: index
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          maxWidth: "940px",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #D6D5D4",
          background: "#FAFAFA"
        }
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          marginTop: "8px",
          fontWeight: "bold",
          marginBottom: "10px"
        }
      }, t(value === null || value === void 0 ? void 0 : value.title)), value !== null && value !== void 0 && value.docInfo ? /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: "12px",
          color: "#505A5F",
          fontWeight: 400,
          lineHeight: "15px",
          marginBottom: "10px"
        }
      }, `${t(value === null || value === void 0 ? void 0 : value.docInfo)}`) : null, /*#__PURE__*/React.createElement(PDFSvg, null), /*#__PURE__*/React.createElement("p", {
        style: {
          marginTop: "8px",
          fontSize: "16px",
          lineHeight: "19px",
          color: "#505A5F",
          fontWeight: "400"
        }
      }, `${t(value === null || value === void 0 ? void 0 : value.title)}`)));
    }) : !window.location.href.includes("citizen") && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, t("BPA_NO_DOCUMENTS_UPLOADED_LABEL")))));
  })));
}

function PropertyEstimates({
  taxHeadEstimatesCalculation
}) {
  const {
    taxHeadEstimates
  } = taxHeadEstimatesCalculation;
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "40px"
    }
  }, /*#__PURE__*/React.createElement(StatusTable, null, /*#__PURE__*/React.createElement(Row, {
    label: t("ES_PT_TITLE_TAX_HEADS"),
    text: t("ES_PT_TITLE_AMOUNT"),
    className: "border-none",
    textStyle: {
      fontWeight: "bold"
    }
  }), /*#__PURE__*/React.createElement(BreakLine, {
    style: {
      margin: "16px 0",
      width: "40%"
    }
  }), taxHeadEstimates === null || taxHeadEstimates === void 0 ? void 0 : taxHeadEstimates.map((estimate, index) => {
    return /*#__PURE__*/React.createElement(Row, {
      key: t(estimate.taxHeadCode),
      label: t(estimate.taxHeadCode),
      text: `₹ ${estimate.estimateAmount}` || "N/A",
      last: index === (taxHeadEstimates === null || taxHeadEstimates === void 0 ? void 0 : taxHeadEstimates.length) - 1,
      className: "border-none",
      textStyle: {
        color: "#505A5F"
      },
      labelStyle: {
        color: "#505A5F"
      }
    });
  }), /*#__PURE__*/React.createElement(BreakLine, {
    style: {
      margin: "16px 0",
      width: "40%"
    }
  }), /*#__PURE__*/React.createElement(Row, {
    label: t("ES_PT_TITLE_TOTAL_DUE_AMOUNT"),
    text: `₹ ${taxHeadEstimatesCalculation === null || taxHeadEstimatesCalculation === void 0 ? void 0 : taxHeadEstimatesCalculation.totalAmount}` || "N/A",
    className: "border-none",
    textStyle: {
      fontSize: "24px",
      fontWeight: "bold"
    }
  })));
}

function PropertyFloors({
  floors
}) {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement(React.Fragment, null, floors.map(floor => {
    var _floor$values;
    return /*#__PURE__*/React.createElement("div", {
      key: t(floor === null || floor === void 0 ? void 0 : floor.title),
      style: {
        marginTop: "19px"
      }
    }, /*#__PURE__*/React.createElement(CardSubHeader, {
      style: {
        marginBottom: "8px",
        color: "#505A5F",
        fontSize: "24px"
      }
    }, t(floor === null || floor === void 0 ? void 0 : floor.title)), floor === null || floor === void 0 ? void 0 : (_floor$values = floor.values) === null || _floor$values === void 0 ? void 0 : _floor$values.map((value, index) => {
      var _value$values;
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: index
      }, /*#__PURE__*/React.createElement(CardSectionHeader, {
        style: {
          marginBottom: "16px",
          color: "#505A5F",
          fontSize: "16px",
          marginTop: index !== 0 ? "16px" : "revert"
        }
      }, t(value.title)), /*#__PURE__*/React.createElement(StatusTable, {
        style: {
          position: "relative",
          padding: "8px"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          border: "1px solid #D6D5D4",
          padding: "16px",
          marginTop: "8px",
          borderRadius: "4px",
          background: "#FAFAFA",
          maxWidth: "100%"
        }
      }, value === null || value === void 0 ? void 0 : (_value$values = value.values) === null || _value$values === void 0 ? void 0 : _value$values.map((value, index) => {
        var _value$values2;
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
          last: index === (value === null || value === void 0 ? void 0 : (_value$values2 = value.values) === null || _value$values2 === void 0 ? void 0 : _value$values2.length) - 1,
          caption: value.caption,
          className: "border-none"
        });
      }))));
    }));
  }));
}

function PropertyOwners({
  owners
}) {
  const {
    t
  } = useTranslation();
  const checkOwnerLength = (owners === null || owners === void 0 ? void 0 : owners.length) || 1;
  let cardStyles = {
    marginTop: "19px"
  };
  let statusTableStyles = {
    position: "relative",
    padding: "8px"
  };
  let rowContainerStyle = {
    justifyContent: "space-between",
    fontSize: "16px",
    lineHeight: "19px",
    color: "#0B0C0C"
  };
  if ( Number(checkOwnerLength) > 1) {
    cardStyles = {
      marginTop: "19px",
      background: "#FAFAFA",
      border: "1px solid #D6D5D4",
      borderRadius: "4px",
      padding: "8px",
      lineHeight: "19px",
      maxWidth: "600px",
      minWidth: "280px"
    };
  } else if ( !(Number(checkOwnerLength) > 1)) {
    cardStyles = {
      marginTop: "19px",
      lineHeight: "19px",
      maxWidth: "600px",
      minWidth: "280px"
    };
    statusTableStyles = {
      position: "relative",
      marginTop: "19px"
    };
  }
  if (window.location.href.includes("obps")) {
    cardStyles = {
      ...cardStyles,
      maxWidth: "950px"
    };
    cardStyles = {
      ...cardStyles,
      maxWidth: "950px"
    };
    rowContainerStyle = {};
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, owners.map((owner, index) => {
    var _owner$values;
    return /*#__PURE__*/React.createElement("div", {
      key: t(owner === null || owner === void 0 ? void 0 : owner.title),
      style: cardStyles
    }, /*#__PURE__*/React.createElement(CardSubHeader, {
      style:  Number(checkOwnerLength) > 1 ? {
        marginBottom: "8px",
        paddingBottom: "9px",
        color: "#0B0C0C",
        fontSize: "16px",
        lineHeight: "19px"
      } : {
        marginBottom: "8px",
        color: "#505A5F",
        fontSize: "24px"
      }
    },  Number(checkOwnerLength) > 1 ? `${t(owner === null || owner === void 0 ? void 0 : owner.title)} ${index + 1}` : t(owner === null || owner === void 0 ? void 0 : owner.title)), /*#__PURE__*/React.createElement(React.Fragment, {
      key: index
    }, /*#__PURE__*/React.createElement(StatusTable, {
      style: statusTableStyles
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: "640px",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: "auto"
      }
    }), owner === null || owner === void 0 ? void 0 : (_owner$values = owner.values) === null || _owner$values === void 0 ? void 0 : _owner$values.map((value, index) => {
      var _value$values;
      if (value.map === true && value.value !== "N/A") {
        return /*#__PURE__*/React.createElement(Row, {
          key: t(value.title),
          label: t(value.title),
          text: /*#__PURE__*/React.createElement("img", {
            src: t(value.value),
            alt: "",
            privacy: value === null || value === void 0 ? void 0 : value.privacy
          })
        });
      }
      return /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Row, {
        key: t(value.title),
        label:  `${t(value.title)}`,
        text: t(value.value) || "N/A",
        last: index === (value === null || value === void 0 ? void 0 : (_value$values = value.values) === null || _value$values === void 0 ? void 0 : _value$values.length) - 1,
        caption: value.caption,
        className: "border-none",
        textStyle: value.textStyle,
        privacy: value === null || value === void 0 ? void 0 : value.privacy,
        rowContainerStyle: rowContainerStyle
      }));
    }))));
  }));
}

const ScruntinyDetails = ({
  scrutinyDetails,
  paymentsList: _paymentsList = []
}) => {
  var _scrutinyDetails$valu, _scrutinyDetails$perm, _scrutinyDetails$scru;
  const {
    t
  } = useTranslation();
  const getTextValues = data => {
    if (data !== null && data !== void 0 && data.value && data !== null && data !== void 0 && data.isTransLate) return /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#00703C"
      }
    }, t(data === null || data === void 0 ? void 0 : data.value));else if (data !== null && data !== void 0 && data.value && data !== null && data !== void 0 && data.isTransLate) return t(data === null || data === void 0 ? void 0 : data.value);else if (data !== null && data !== void 0 && data.value) return data === null || data === void 0 ? void 0 : data.value;else t("NA");
  };
  return /*#__PURE__*/React.createElement(Fragment, null, !(scrutinyDetails !== null && scrutinyDetails !== void 0 && scrutinyDetails.isChecklist) && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FAFAFA",
      border: "1px solid #D6D5D4",
      padding: "8px",
      borderRadius: "4px",
      maxWidth: "950px"
    }
  }, /*#__PURE__*/React.createElement(StatusTable, null, /*#__PURE__*/React.createElement("div", null, scrutinyDetails === null || scrutinyDetails === void 0 ? void 0 : (_scrutinyDetails$valu = scrutinyDetails.values) === null || _scrutinyDetails$valu === void 0 ? void 0 : _scrutinyDetails$valu.map((value, index) => {
    if (value !== null && value !== void 0 && value.isUnit) return /*#__PURE__*/React.createElement(Row, {
      className: "border-none",
      textStyle: (value === null || value === void 0 ? void 0 : value.value) === "Paid" ? {
        color: "darkgreen"
      } : (value === null || value === void 0 ? void 0 : value.value) === "Unpaid" ? {
        color: "red"
      } : {},
      key: `${value.title}`,
      label: `${t(`${value.title}`)}`,
      text: value !== null && value !== void 0 && value.value ? `${getTextValues(value)} ${t(value === null || value === void 0 ? void 0 : value.isUnit)}` : t("NA"),
      labelStyle: value !== null && value !== void 0 && value.isHeader ? {
        fontSize: "20px"
      } : {}
    });else if (value !== null && value !== void 0 && value.isHeader && !(value !== null && value !== void 0 && value.isUnit)) return /*#__PURE__*/React.createElement(CardSubHeader, {
      style: {
        fontSize: "20px",
        paddingBottom: "10px"
      }
    }, t(value === null || value === void 0 ? void 0 : value.title));else if (value !== null && value !== void 0 && value.isSubTitle && !(value !== null && value !== void 0 && value.isUnit)) return /*#__PURE__*/React.createElement(CardSubHeader, {
      style: {
        fontSize: "20px",
        paddingBottom: "10px",
        margin: "0px"
      }
    }, t(value === null || value === void 0 ? void 0 : value.title));else return /*#__PURE__*/React.createElement(Row, {
      className: "border-none",
      textStyle: (value === null || value === void 0 ? void 0 : value.value) === "Paid" ? {
        color: "darkgreen",
        wordBreak: "break-all"
      } : (value === null || value === void 0 ? void 0 : value.value) === "Unpaid" ? {
        color: "red",
        wordBreak: "break-all"
      } : {
        wordBreak: "break-all"
      },
      key: `${value.title}`,
      label: `${t(`${value.title}`)}`,
      text: getTextValues(value),
      labelStyle: value !== null && value !== void 0 && value.isHeader ? {
        fontSize: "20px"
      } : {}
    });
  }), scrutinyDetails === null || scrutinyDetails === void 0 ? void 0 : (_scrutinyDetails$perm = scrutinyDetails.permit) === null || _scrutinyDetails$perm === void 0 ? void 0 : _scrutinyDetails$perm.map((value, ind) => {
    return /*#__PURE__*/React.createElement(CardLabel, {
      style: {
        fontWeight: "400"
      }
    }, value === null || value === void 0 ? void 0 : value.title);
  })), /*#__PURE__*/React.createElement("div", null, scrutinyDetails === null || scrutinyDetails === void 0 ? void 0 : (_scrutinyDetails$scru = scrutinyDetails.scruntinyDetails) === null || _scrutinyDetails$scru === void 0 ? void 0 : _scrutinyDetails$scru.map((report, index) => {
    return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Row, {
      className: "border-none",
      label: `${t(report === null || report === void 0 ? void 0 : report.title)}`,
      labelStyle: {
        width: "150%"
      }
    }), /*#__PURE__*/React.createElement("a", {
      href: report === null || report === void 0 ? void 0 : report.value
    }, " ", /*#__PURE__*/React.createElement(PDFSvg, null), " "), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "8px 0px",
        fontWeight: "bold",
        fontSize: "16px",
        lineHeight: "19px",
        color: "#505A5F"
      }
    }, t(report === null || report === void 0 ? void 0 : report.text)));
  })))));
};

const SubOccupancyTable = ({
  edcrDetails,
  applicationData
}) => {
  var _edcrDetails$values, _edcrDetails$subOccup, _edcrDetails$subOccup2, _edcrDetails$subOccup3, _edcrDetails$subOccup4;
  const {
    t
  } = useTranslation();
  const isMobile = window.Digit.Utils.browser.isMobile();
  const tableHeader = [{
    name: "BPA_TABLE_COL_FLOOR",
    id: "Floor"
  }, {
    name: "BPA_TABLE_COL_LEVEL",
    id: "Level"
  }, {
    name: "BPA_TABLE_COL_OCCUPANCY",
    id: "Occupancy"
  }, {
    name: "BPA_TABLE_COL_BUILDUPAREA",
    id: "BuildupArea"
  }, {
    name: "BPA_TABLE_COL_FLOORAREA",
    id: "FloorArea"
  }, {
    name: "BPA_TABLE_COL_CARPETAREA",
    id: "CarpetArea"
  }];
  const accessData = plot => {
    const name = plot;
    return (originalRow, rowIndex, columns) => {
      return originalRow[name];
    };
  };
  const tableColumns = useMemo(() => {
    return tableHeader.map(ob => ({
      Header: t(`${ob.name}`),
      accessor: accessData(ob.id),
      id: ob.id
    }));
  });
  function getFloorData(block) {
    var _block$building;
    let floors = [];
    block === null || block === void 0 ? void 0 : (_block$building = block.building) === null || _block$building === void 0 ? void 0 : _block$building.floors.map(ob => {
      var _ob$occupancies, _ob$occupancies$, _ob$occupancies2, _ob$occupancies2$, _ob$occupancies3, _ob$occupancies3$, _ob$occupancies4, _ob$occupancies4$;
      floors.push({
        Floor: t(`BPA_FLOOR_NAME_${ob.number}`),
        Level: ob.number,
        Occupancy: t(`${(_ob$occupancies = ob.occupancies) === null || _ob$occupancies === void 0 ? void 0 : (_ob$occupancies$ = _ob$occupancies[0]) === null || _ob$occupancies$ === void 0 ? void 0 : _ob$occupancies$.type}`),
        BuildupArea: (_ob$occupancies2 = ob.occupancies) === null || _ob$occupancies2 === void 0 ? void 0 : (_ob$occupancies2$ = _ob$occupancies2[0]) === null || _ob$occupancies2$ === void 0 ? void 0 : _ob$occupancies2$.builtUpArea,
        FloorArea: ((_ob$occupancies3 = ob.occupancies) === null || _ob$occupancies3 === void 0 ? void 0 : (_ob$occupancies3$ = _ob$occupancies3[0]) === null || _ob$occupancies3$ === void 0 ? void 0 : _ob$occupancies3$.floorArea) || 0,
        CarpetArea: ((_ob$occupancies4 = ob.occupancies) === null || _ob$occupancies4 === void 0 ? void 0 : (_ob$occupancies4$ = _ob$occupancies4[0]) === null || _ob$occupancies4$ === void 0 ? void 0 : _ob$occupancies4$.CarpetArea) || 0,
        key: t(`BPA_FLOOR_NAME_${ob.number}`)
      });
    });
    return floors;
  }
  const stringReplaceAll = (str = "", searcher = "", replaceWith = "") => {
    if (searcher == "") return str;
    while (str.includes(searcher)) {
      str = str.replace(searcher, replaceWith);
    }
    return str;
  };
  function getSubOccupancyValues(index) {
    var _applicationData$land;
    let values = applicationData === null || applicationData === void 0 ? void 0 : (_applicationData$land = applicationData.landInfo) === null || _applicationData$land === void 0 ? void 0 : _applicationData$land.unit;
    let returnValue = "";
    if ((values === null || values === void 0 ? void 0 : values.length) > 0) {
      var _values$index, _values$index$usageCa;
      let splitArray = (_values$index = values[index]) === null || _values$index === void 0 ? void 0 : (_values$index$usageCa = _values$index.usageCategory) === null || _values$index$usageCa === void 0 ? void 0 : _values$index$usageCa.split(',');
      if (splitArray !== null && splitArray !== void 0 && splitArray.length) {
        const returnValueArray = splitArray.map(data => data ? `${t(`BPA_SUBOCCUPANCYTYPE_${stringReplaceAll(data === null || data === void 0 ? void 0 : data.toUpperCase(), "-", "_")}`)}` : "NA");
        returnValue = returnValueArray.join(', ');
      }
    }
    return returnValue ? returnValue : "NA";
  }
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FAFAFA",
      border: "1px solid #D6D5D4",
      padding: "8px",
      borderRadius: "4px",
      maxWidth: "950px",
      minWidth: "280px"
    }
  }, /*#__PURE__*/React.createElement(StatusTable, null, edcrDetails === null || edcrDetails === void 0 ? void 0 : (_edcrDetails$values = edcrDetails.values) === null || _edcrDetails$values === void 0 ? void 0 : _edcrDetails$values.map((value, index) => {
    if (value !== null && value !== void 0 && value.isHeader) return /*#__PURE__*/React.createElement(CardSubHeader, {
      style: {
        fontSize: "20px",
        paddingBottom: "10px"
      }
    }, t(value === null || value === void 0 ? void 0 : value.title));else return /*#__PURE__*/React.createElement(Row, {
      className: "border-none",
      labelStyle: {
        width: "100%",
        fontSize: "20px"
      },
      key: `${value.title}`,
      label: `${t(`${value.title}`)}`,
      text: value !== null && value !== void 0 && value.value ? value === null || value === void 0 ? void 0 : value.value : ""
    });
  })), edcrDetails === null || edcrDetails === void 0 ? void 0 : (_edcrDetails$subOccup = edcrDetails.subOccupancyTableDetails) === null || _edcrDetails$subOccup === void 0 ? void 0 : (_edcrDetails$subOccup2 = _edcrDetails$subOccup[0]) === null || _edcrDetails$subOccup2 === void 0 ? void 0 : (_edcrDetails$subOccup3 = _edcrDetails$subOccup2.value) === null || _edcrDetails$subOccup3 === void 0 ? void 0 : (_edcrDetails$subOccup4 = _edcrDetails$subOccup3.planDetail) === null || _edcrDetails$subOccup4 === void 0 ? void 0 : _edcrDetails$subOccup4.blocks.map((block, index) => {
    var _edcrDetails$subOccup5, _edcrDetails$subOccup6, _edcrDetails$subOccup7, _edcrDetails$subOccup8, _edcrDetails$subOccup9;
    return /*#__PURE__*/React.createElement("div", {
      key: index,
      style: (edcrDetails === null || edcrDetails === void 0 ? void 0 : (_edcrDetails$subOccup5 = edcrDetails.subOccupancyTableDetails) === null || _edcrDetails$subOccup5 === void 0 ? void 0 : (_edcrDetails$subOccup6 = _edcrDetails$subOccup5[0]) === null || _edcrDetails$subOccup6 === void 0 ? void 0 : (_edcrDetails$subOccup7 = _edcrDetails$subOccup6.value) === null || _edcrDetails$subOccup7 === void 0 ? void 0 : (_edcrDetails$subOccup8 = _edcrDetails$subOccup7.planDetail) === null || _edcrDetails$subOccup8 === void 0 ? void 0 : (_edcrDetails$subOccup9 = _edcrDetails$subOccup8.blocks) === null || _edcrDetails$subOccup9 === void 0 ? void 0 : _edcrDetails$subOccup9.length) > 0 ? {
        marginBottom: "30px",
        background: "#FAFAFA",
        border: "1px solid #D6D5D4",
        padding: "8px",
        borderRadius: "4px",
        maxWidth: "950px",
        minWidth: "280px"
      } : {
        marginBottom: "30px"
      }
    }, /*#__PURE__*/React.createElement(CardSubHeader, {
      style: {
        marginBottom: "8px",
        paddingBottom: "9px",
        color: "#0B0C0C",
        fontSize: "18px",
        lineHeight: "19px"
      }
    }, t("BPA_BLOCK_SUBHEADER"), " ", index + 1), /*#__PURE__*/React.createElement(StatusTable, null, /*#__PURE__*/React.createElement(Row, {
      className: "border-none",
      textStyle: {
        wordBreak: "break-word"
      },
      label: `${t("BPA_SUB_OCCUPANCY_LABEL")}`,
      text: getSubOccupancyValues(index)
    })), /*#__PURE__*/React.createElement("div", {
      style: window.location.href.includes("citizen") || isMobile ? {
        overflow: "scroll"
      } : {
        maxWidth: "950px",
        maxHeight: "280px"
      }
    }, /*#__PURE__*/React.createElement(Table, {
      className: "customTable table-fixed-first-column table-border-style",
      t: t,
      disableSort: false,
      autoSort: true,
      manualPagination: false,
      isPaginationRequired: false,
      initSortId: "S N ",
      data: getFloorData(block),
      columns: tableColumns,
      getCellProps: cellInfo => {
        return {
          style: {}
        };
      }
    })));
  })));
};

const Reason = ({
  headComment,
  otherComment
}) => /*#__PURE__*/React.createElement("div", {
  className: "checkpoint-comments-wrap"
}, /*#__PURE__*/React.createElement("h4", null, headComment), /*#__PURE__*/React.createElement("p", null, otherComment));

const TLCaption = ({
  data,
  OpenImage,
  privacy: _privacy = {}
}) => {
  var _data$wfComment, _data$thumbnailsToSho, _data$thumbnailsToSho2;
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", null, data.date && /*#__PURE__*/React.createElement("p", null, data.date), /*#__PURE__*/React.createElement("p", null, data.name), data.mobileNumber && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      width: "fit-content",
      marginLeft: "10px"
    }
  }, /*#__PURE__*/React.createElement(TelePhone, {
    mobile: data.mobileNumber,
    privacy: _privacy
  }), /*#__PURE__*/React.createElement("p", null, "\xA0\xA0\xA0\xA0")), data.source && /*#__PURE__*/React.createElement("p", null, t("ES_APPLICATION_DETAILS_APPLICATION_CHANNEL_" + data.source.toUpperCase())), data.comment && /*#__PURE__*/React.createElement(Reason, {
    otherComment: data === null || data === void 0 ? void 0 : data.otherComment,
    headComment: data === null || data === void 0 ? void 0 : data.comment
  }), data !== null && data !== void 0 && data.wfComment ? /*#__PURE__*/React.createElement("div", null, data === null || data === void 0 ? void 0 : (_data$wfComment = data.wfComment) === null || _data$wfComment === void 0 ? void 0 : _data$wfComment.map(e => /*#__PURE__*/React.createElement("div", {
    className: "TLComments"
  }, /*#__PURE__*/React.createElement("h3", null, t("WF_COMMON_COMMENTS")), /*#__PURE__*/React.createElement("p", null, e)))) : null, (data === null || data === void 0 ? void 0 : (_data$thumbnailsToSho = data.thumbnailsToShow) === null || _data$thumbnailsToSho === void 0 ? void 0 : (_data$thumbnailsToSho2 = _data$thumbnailsToSho.thumbs) === null || _data$thumbnailsToSho2 === void 0 ? void 0 : _data$thumbnailsToSho2.length) > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "TLComments"
  }, /*#__PURE__*/React.createElement("h3", null, t("CS_COMMON_ATTACHMENTS")), /*#__PURE__*/React.createElement(DisplayPhotos, {
    srcs: data === null || data === void 0 ? void 0 : data.thumbnailsToShow.thumbs,
    onClick: (src, index) => {
      OpenImage(src, index, data === null || data === void 0 ? void 0 : data.thumbnailsToShow);
    }
  })) : null);
};

function TLTradeAccessories({
  units
}) {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement(React.Fragment, null, units.map((unit, index) => {
    var _unit$values;
    return (
      /*#__PURE__*/
      React.createElement("div", {
        key: t(unit === null || unit === void 0 ? void 0 : unit.title),
        style: {
          marginTop: "19px",
          background: "#FAFAFA",
          border: "1px solid #D6D5D4",
          borderRadius: "4px",
          padding: "8px",
          lineHeight: "19px",
          maxWidth: "600px",
          minWidth: "280px"
        }
      }, /*#__PURE__*/React.createElement(CardSubHeader, {
        style: {
          marginBottom: "8px",
          paddingBottom: "9px",
          color: "#0B0C0C",
          fontSize: "16px",
          lineHeight: "19px"
        }
      }, `${t(unit === null || unit === void 0 ? void 0 : unit.title)} ${index + 1}`), /*#__PURE__*/React.createElement(React.Fragment, {
        key: index
      }, /*#__PURE__*/React.createElement(StatusTable, {
        style: {
          position: "relative",
          marginTop: "19px"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          maxWidth: "640px",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: "auto"
        }
      }), unit === null || unit === void 0 ? void 0 : (_unit$values = unit.values) === null || _unit$values === void 0 ? void 0 : _unit$values.map((value, index) => {
        var _value$values;
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
          label: `${t(value.title)}:`,
          text: t(value.value) || "N/A",
          last: index === (value === null || value === void 0 ? void 0 : (_value$values = value.values) === null || _value$values === void 0 ? void 0 : _value$values.length) - 1,
          caption: value.caption,
          className: "border-none",
          rowContainerStyle: {
            justifyContent: "space-between",
            fontSize: "16px",
            lineHeight: "19px",
            color: "#0B0C0C"
          }
        });
      }))))
    );
  }));
}

function TLTradeUnits({
  units
}) {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement(React.Fragment, null, units.map((unit, index) => {
    var _unit$values;
    return (
      /*#__PURE__*/
      React.createElement("div", {
        key: t(unit === null || unit === void 0 ? void 0 : unit.title),
        style: {
          marginTop: "19px",
          background: "#FAFAFA",
          border: "1px solid #D6D5D4",
          borderRadius: "4px",
          padding: "8px",
          lineHeight: "19px",
          maxWidth: "600px",
          minWidth: "280px"
        }
      }, /*#__PURE__*/React.createElement(CardSubHeader, {
        style: {
          marginBottom: "9px",
          paddingBottom: "9px",
          color: "#0B0C0C",
          fontSize: "16px",
          lineHeight: "19px"
        }
      }, `${t(unit === null || unit === void 0 ? void 0 : unit.title)} ${index + 1}`), /*#__PURE__*/React.createElement(React.Fragment, {
        key: index
      }, /*#__PURE__*/React.createElement(StatusTable, {
        style: {
          position: "relative",
          marginTop: "19px"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          maxWidth: "640px",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: "auto"
        }
      }), unit === null || unit === void 0 ? void 0 : (_unit$values = unit.values) === null || _unit$values === void 0 ? void 0 : _unit$values.map((value, index) => {
        var _value$values;
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
          label: `${t(value.title)}:`,
          text: t(value.value) || "NA",
          last: index === (value === null || value === void 0 ? void 0 : (_value$values = value.values) === null || _value$values === void 0 ? void 0 : _value$values.length) - 1,
          caption: value.caption,
          className: "border-none",
          rowContainerStyle: {
            justifyContent: "space-between",
            fontSize: "16px",
            lineHeight: "19px",
            color: "#0B0C0C"
          }
        });
      }))))
    );
  }));
}

const getQueryStringParams = query => {
  return query ? (/^[?#]/.test(query) ? query.slice(1) : query).split("&").reduce((params, param) => {
    let [key, value] = param.split("=");
    params[key] = value ? decodeURIComponent(value.replace(/\+/g, " ")) : "";
    return params;
  }, {}) : {};
};

const cardSubHeaderStyles = () => {
  return {
    fontSize: "24px",
    marginBottom: "16px",
    marginTop: "32px"
  };
};
const WSAdditonalDetails = ({
  wsAdditionalDetails,
  oldValue
}) => {
  var _wsAdditionalDetails$, _wsAdditionalDetails$2, _wsAdditionalDetails$3, _wsAdditionalDetails$4;
  const {
    t
  } = useTranslation();
  let filters = getQueryStringParams(location.search);
  const isModify = filters === null || filters === void 0 ? void 0 : filters.mode;
  var {
    connectionDetails,
    plumberDetails,
    roadCuttingDetails,
    activationDetails
  } = (wsAdditionalDetails === null || wsAdditionalDetails === void 0 ? void 0 : wsAdditionalDetails.additionalDetails) || {
    connectionDetails: [],
    plumberDetails: []
  };
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: "19px",
      maxWidth: "950px",
      minWidth: "280px"
    }
  }, (wsAdditionalDetails === null || wsAdditionalDetails === void 0 ? void 0 : (_wsAdditionalDetails$ = wsAdditionalDetails.additionalDetails) === null || _wsAdditionalDetails$ === void 0 ? void 0 : _wsAdditionalDetails$.connectionDetails) && /*#__PURE__*/React.createElement(StatusTable, null, /*#__PURE__*/React.createElement(CardSubHeader, {
    style: cardSubHeaderStyles()
  }, t("WS_COMMON_CONNECTION_DETAIL")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "connection-details-new-value-wrapper"
  }, connectionDetails === null || connectionDetails === void 0 ? void 0 : connectionDetails.map((value, index) => {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Row, {
      className: "border-none",
      key: `${value.title}`,
      label: `${t(`${value.title}`)}`,
      text: value !== null && value !== void 0 && value.oldValue ? value === null || value === void 0 ? void 0 : value.oldValue : value !== null && value !== void 0 && value.value ? value === null || value === void 0 ? void 0 : value.value : ""
    }));
  })))), (wsAdditionalDetails === null || wsAdditionalDetails === void 0 ? void 0 : (_wsAdditionalDetails$2 = wsAdditionalDetails.additionalDetails) === null || _wsAdditionalDetails$2 === void 0 ? void 0 : _wsAdditionalDetails$2.plumberDetails) && isModify != "MODIFY" && /*#__PURE__*/React.createElement(StatusTable, null, /*#__PURE__*/React.createElement(CardSubHeader, {
    style: cardSubHeaderStyles()
  }, t("WS_COMMON_PLUMBER_DETAILS")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "plumber-details-new-value-wrapper"
  }, plumberDetails === null || plumberDetails === void 0 ? void 0 : plumberDetails.map((value, index) => {
    return /*#__PURE__*/React.createElement(Row, {
      className: "border-none",
      key: `${value.title}`,
      label: `${t(`${value.title}`)}`,
      text: value !== null && value !== void 0 && value.oldValue ? value === null || value === void 0 ? void 0 : value.oldValue : value !== null && value !== void 0 && value.value ? value === null || value === void 0 ? void 0 : value.value : "",
      privacy: value.privacy
    });
  })))), (wsAdditionalDetails === null || wsAdditionalDetails === void 0 ? void 0 : (_wsAdditionalDetails$3 = wsAdditionalDetails.additionalDetails) === null || _wsAdditionalDetails$3 === void 0 ? void 0 : _wsAdditionalDetails$3.roadCuttingDetails) && isModify != "MODIFY" && /*#__PURE__*/React.createElement(StatusTable, null, /*#__PURE__*/React.createElement(CardSubHeader, {
    style: cardSubHeaderStyles()
  }, t("WS_ROAD_CUTTING_DETAILS")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "plumber-details-new-value-wrapper"
  }, roadCuttingDetails === null || roadCuttingDetails === void 0 ? void 0 : roadCuttingDetails.map(value => {
    var _value$values;
    return /*#__PURE__*/React.createElement("div", {
      style: (roadCuttingDetails === null || roadCuttingDetails === void 0 ? void 0 : roadCuttingDetails.length) > 1 ? {
        border: "1px solid #D6D5D4",
        background: "#FAFAFA",
        borderRadius: "4px",
        padding: "10px 10px 0px 10px",
        margin: "5px 0px"
      } : {}
    }, value === null || value === void 0 ? void 0 : (_value$values = value.values) === null || _value$values === void 0 ? void 0 : _value$values.map(roadValue => /*#__PURE__*/React.createElement(Row, {
      className: "border-none",
      key: `${roadValue.title}`,
      label: `${t(`${roadValue.title}`)}`,
      text: roadValue !== null && roadValue !== void 0 && roadValue.oldValue ? roadValue === null || roadValue === void 0 ? void 0 : roadValue.oldValue : roadValue !== null && roadValue !== void 0 && roadValue.value ? roadValue === null || roadValue === void 0 ? void 0 : roadValue.value : ""
    })));
  })))), (wsAdditionalDetails === null || wsAdditionalDetails === void 0 ? void 0 : (_wsAdditionalDetails$4 = wsAdditionalDetails.additionalDetails) === null || _wsAdditionalDetails$4 === void 0 ? void 0 : _wsAdditionalDetails$4.activationDetails) && /*#__PURE__*/React.createElement(StatusTable, null, /*#__PURE__*/React.createElement(CardSubHeader, {
    style: cardSubHeaderStyles()
  }, t("WS_ACTIVATION_DETAILS")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "plumber-details-new-value-wrapper"
  }, activationDetails === null || activationDetails === void 0 ? void 0 : activationDetails.map((value, index) => {
    return /*#__PURE__*/React.createElement(Row, {
      className: "border-none",
      key: `${value.title}`,
      label: `${t(`${value.title}`)}`,
      text: value !== null && value !== void 0 && value.oldValue ? value === null || value === void 0 ? void 0 : value.oldValue : value !== null && value !== void 0 && value.value ? value === null || value === void 0 ? void 0 : value.value : ""
    });
  }))))));
};

const Penality_menu = [{
  title: "PT_PENDING_DUES_FROM_EARLIER",
  value: "Pending dues from earlier"
}, {
  title: "PT_MISCALCULATION_OF_EARLIER_ASSESSMENT",
  value: "Miscalculation of earlier Assessment"
}, {
  title: "PT_ONE_TIME_PENALITY",
  value: "One time penality"
}, {
  title: "PT_OTHERS",
  value: "Others"
}];
const Rebate_menu = [{
  title: "PT_ADVANCED_PAID_BY_CITIZEN_EARLIER",
  value: "Advanced Paid By Citizen Earlier"
}, {
  title: "PT_REBATE_PROVIDED_BY_COMMISSIONER_EO",
  value: "Rebate provided by commissioner/EO"
}, {
  title: "PT_ADDITIONAL_AMOUNT_CHARGED_FROM_THE_CITIZEN",
  value: "Additional amount charged from the citizen"
}, {
  title: "PT_OTHERS",
  value: "Others"
}];
const WSFeeEstimation = ({
  wsAdditionalDetails,
  workflowDetails
}) => {
  var _wsAdditionalDetails$, _wsAdditionalDetails$20, _fields$adhocPenaltyR, _fields$adhocRebateRe;
  const {
    t
  } = useTranslation();
  const [sessionFormData, setSessionFormData, clearSessionFormData] = Digit.Hooks.useSessionStorage("ADHOC_ADD_REBATE_DATA", {});
  const [sessionBillFormData, setSessionBillFormData, clearBillSessionFormData] = Digit.Hooks.useSessionStorage("ADHOC_BILL_ADD_REBATE_DATA", {});
  const isPaid = wsAdditionalDetails !== null && wsAdditionalDetails !== void 0 && (_wsAdditionalDetails$ = wsAdditionalDetails.additionalDetails) !== null && _wsAdditionalDetails$ !== void 0 && _wsAdditionalDetails$.isPaid ? true : false;
  const [popup, showPopUp] = useState(false);
  const [fields, setFields] = useState(sessionFormData ? sessionFormData : {});
  const [showToast, setShowToast] = useState(null);
  const [billDetails, setBillDetails] = useState(wsAdditionalDetails.additionalDetails.data ? wsAdditionalDetails.additionalDetails.data : {});
  const [values, setValues] = useState(wsAdditionalDetails.additionalDetails.values ? wsAdditionalDetails.additionalDetails.values : []);
  const stateCode = Digit.ULBService.getStateId();
  const {
    isMdmsLoading,
    data: mdmsRes
  } = Digit.Hooks.ws.useMDMS(stateCode, "BillingService", ["TaxHeadMaster"]);
  useEffect(() => {
    var _wsAdditionalDetails$2, _wsAdditionalDetails$3, _sessionFormData$bill;
    const data = {
      ...(wsAdditionalDetails === null || wsAdditionalDetails === void 0 ? void 0 : (_wsAdditionalDetails$2 = wsAdditionalDetails.additionalDetails) === null || _wsAdditionalDetails$2 === void 0 ? void 0 : (_wsAdditionalDetails$3 = _wsAdditionalDetails$2.appDetails) === null || _wsAdditionalDetails$3 === void 0 ? void 0 : _wsAdditionalDetails$3.additionalDetails)
    };
    if ((sessionFormData === null || sessionFormData === void 0 ? void 0 : (_sessionFormData$bill = sessionFormData.billDetails) === null || _sessionFormData$bill === void 0 ? void 0 : _sessionFormData$bill.length) > 0) {
      var _sessionFormData$bill2, _sessionFormData$bill3, _sessionFormData$bill4, _sessionFormData$bill5, _sessionFormData$bill6, _sessionFormData$bill7, _sessionFormData$bill8;
      const values = [{
        title: "WS_APPLICATION_FEE_HEADER",
        value: /*#__PURE__*/React.createElement("span", null, "\u20B9", sessionFormData === null || sessionFormData === void 0 ? void 0 : (_sessionFormData$bill2 = sessionFormData.billDetails) === null || _sessionFormData$bill2 === void 0 ? void 0 : (_sessionFormData$bill3 = _sessionFormData$bill2[0]) === null || _sessionFormData$bill3 === void 0 ? void 0 : _sessionFormData$bill3.fee)
      }, {
        title: "WS_SERVICE_FEE_HEADER",
        value: /*#__PURE__*/React.createElement("span", null, "\u20B9", sessionFormData === null || sessionFormData === void 0 ? void 0 : (_sessionFormData$bill4 = sessionFormData.billDetails) === null || _sessionFormData$bill4 === void 0 ? void 0 : (_sessionFormData$bill5 = _sessionFormData$bill4[0]) === null || _sessionFormData$bill5 === void 0 ? void 0 : _sessionFormData$bill5.charge)
      }, {
        title: "WS_TAX_HEADER",
        value: /*#__PURE__*/React.createElement("span", null, "\u20B9", sessionFormData === null || sessionFormData === void 0 ? void 0 : (_sessionFormData$bill6 = sessionFormData.billDetails) === null || _sessionFormData$bill6 === void 0 ? void 0 : (_sessionFormData$bill7 = _sessionFormData$bill6[0]) === null || _sessionFormData$bill7 === void 0 ? void 0 : _sessionFormData$bill7.taxAmount)
      }];
      setValues(values);
      setBillDetails(sessionFormData === null || sessionFormData === void 0 ? void 0 : (_sessionFormData$bill8 = sessionFormData.billDetails) === null || _sessionFormData$bill8 === void 0 ? void 0 : _sessionFormData$bill8[0]);
    } else {
      setSessionFormData(data);
      setFields(data);
    }
  }, []);
  let validation = {};
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
  const closeToast = () => {
    setShowToast(false);
  };
  const addAdhocRebatePenality = e => {
    const adhocAmount = fields !== null && fields !== void 0 && fields.adhocPenalty ? Number(fields === null || fields === void 0 ? void 0 : fields.adhocPenalty) : 0;
    const rebateAmount = fields !== null && fields !== void 0 && fields.adhocRebate ? Number(fields === null || fields === void 0 ? void 0 : fields.adhocRebate) : 0;
    if (adhocAmount || rebateAmount) {
      var _wsAdditionalDetails$4, _wsAdditionalDetails$5;
      const totalAmount = wsAdditionalDetails === null || wsAdditionalDetails === void 0 ? void 0 : (_wsAdditionalDetails$4 = wsAdditionalDetails.additionalDetails) === null || _wsAdditionalDetails$4 === void 0 ? void 0 : (_wsAdditionalDetails$5 = _wsAdditionalDetails$4.data) === null || _wsAdditionalDetails$5 === void 0 ? void 0 : _wsAdditionalDetails$5.totalAmount;
      if (rebateAmount > totalAmount) {
        setShowToast({
          isError: false,
          isWarning: true,
          key: "error",
          message: t("ERR_WS_REBATE_GREATER_THAN_AMOUNT")
        });
      } else {
        var _wsAdditionalDetails$10, _wsAdditionalDetails$11, _wsAdditionalDetails$12, _wsAdditionalDetails$13, _wsAdditionalDetails$14, _wsAdditionalDetails$15, _wsAdditionalDetails$16, _wsAdditionalDetails$17, _wsAdditionalDetails$18, _wsAdditionalDetails$19;
        const applicationNo = wsAdditionalDetails === null || wsAdditionalDetails === void 0 ? void 0 : (_wsAdditionalDetails$10 = wsAdditionalDetails.additionalDetails) === null || _wsAdditionalDetails$10 === void 0 ? void 0 : (_wsAdditionalDetails$11 = _wsAdditionalDetails$10.appDetails) === null || _wsAdditionalDetails$11 === void 0 ? void 0 : _wsAdditionalDetails$11.applicationNo;
        const tenantId = wsAdditionalDetails === null || wsAdditionalDetails === void 0 ? void 0 : (_wsAdditionalDetails$12 = wsAdditionalDetails.additionalDetails) === null || _wsAdditionalDetails$12 === void 0 ? void 0 : (_wsAdditionalDetails$13 = _wsAdditionalDetails$12.appDetails) === null || _wsAdditionalDetails$13 === void 0 ? void 0 : _wsAdditionalDetails$13.tenantId;
        const appAdditionalDetails = {
          ...(wsAdditionalDetails === null || wsAdditionalDetails === void 0 ? void 0 : (_wsAdditionalDetails$14 = wsAdditionalDetails.additionalDetails) === null || _wsAdditionalDetails$14 === void 0 ? void 0 : (_wsAdditionalDetails$15 = _wsAdditionalDetails$14.appDetails) === null || _wsAdditionalDetails$15 === void 0 ? void 0 : _wsAdditionalDetails$15.additionalDetails),
          ...fields
        };
        wsAdditionalDetails.additionalDetails.appDetails.additionalDetails = appAdditionalDetails;
        const data = {
          CalculationCriteria: (wsAdditionalDetails === null || wsAdditionalDetails === void 0 ? void 0 : (_wsAdditionalDetails$16 = wsAdditionalDetails.additionalDetails) === null || _wsAdditionalDetails$16 === void 0 ? void 0 : (_wsAdditionalDetails$17 = _wsAdditionalDetails$16.appDetails) === null || _wsAdditionalDetails$17 === void 0 ? void 0 : _wsAdditionalDetails$17.service) == "WATER" ? [{
            applicationNo: applicationNo,
            tenantId: tenantId,
            waterConnection: wsAdditionalDetails.additionalDetails.appDetails
          }] : [{
            applicationNo: applicationNo,
            tenantId: tenantId,
            sewerageConnection: wsAdditionalDetails.additionalDetails.appDetails
          }],
          isconnectionCalculation: false
        };
        let businessService = (wsAdditionalDetails === null || wsAdditionalDetails === void 0 ? void 0 : (_wsAdditionalDetails$18 = wsAdditionalDetails.additionalDetails) === null || _wsAdditionalDetails$18 === void 0 ? void 0 : (_wsAdditionalDetails$19 = _wsAdditionalDetails$18.appDetails) === null || _wsAdditionalDetails$19 === void 0 ? void 0 : _wsAdditionalDetails$19.service) == "WATER" ? "WS" : "SW";
        Digit.WSService.wsCalculationEstimate(data, businessService).then((result, err) => {
          var _result$Calculation, _result$Calculation$, _result$Calculation$$, _result$Calculation3, _result$Calculation3$, _result$Calculation4, _result$Calculation4$, _result$Calculation5, _result$Calculation5$, _result$Calculation6, _result$Calculation6$, _result$Calculation7;
          if ((result === null || result === void 0 ? void 0 : (_result$Calculation = result.Calculation) === null || _result$Calculation === void 0 ? void 0 : (_result$Calculation$ = _result$Calculation[0]) === null || _result$Calculation$ === void 0 ? void 0 : (_result$Calculation$$ = _result$Calculation$.taxHeadEstimates) === null || _result$Calculation$$ === void 0 ? void 0 : _result$Calculation$$.length) > 0) {
            var _result$Calculation2, _result$Calculation2$, _result$Calculation2$2;
            result === null || result === void 0 ? void 0 : (_result$Calculation2 = result.Calculation) === null || _result$Calculation2 === void 0 ? void 0 : (_result$Calculation2$ = _result$Calculation2[0]) === null || _result$Calculation2$ === void 0 ? void 0 : (_result$Calculation2$2 = _result$Calculation2$.taxHeadEstimates) === null || _result$Calculation2$2 === void 0 ? void 0 : _result$Calculation2$2.forEach(data => data.amount = data.estimateAmount);
          }
          result.Calculation[0].billSlabData = _.groupBy(result === null || result === void 0 ? void 0 : (_result$Calculation3 = result.Calculation) === null || _result$Calculation3 === void 0 ? void 0 : (_result$Calculation3$ = _result$Calculation3[0]) === null || _result$Calculation3$ === void 0 ? void 0 : _result$Calculation3$.taxHeadEstimates, 'category');
          const values = [{
            title: "WS_APPLICATION_FEE_HEADER",
            value: (_result$Calculation4 = result.Calculation) === null || _result$Calculation4 === void 0 ? void 0 : (_result$Calculation4$ = _result$Calculation4[0]) === null || _result$Calculation4$ === void 0 ? void 0 : _result$Calculation4$.fee
          }, {
            title: "WS_SERVICE_FEE_HEADER",
            value: (_result$Calculation5 = result.Calculation) === null || _result$Calculation5 === void 0 ? void 0 : (_result$Calculation5$ = _result$Calculation5[0]) === null || _result$Calculation5$ === void 0 ? void 0 : _result$Calculation5$.charge
          }, {
            title: "WS_TAX_HEADER",
            value: (_result$Calculation6 = result.Calculation) === null || _result$Calculation6 === void 0 ? void 0 : (_result$Calculation6$ = _result$Calculation6[0]) === null || _result$Calculation6$ === void 0 ? void 0 : _result$Calculation6$.taxAmount
          }];
          setSessionBillFormData(cloneDeep_1(result.Calculation[0]));
          setBillDetails(result === null || result === void 0 ? void 0 : (_result$Calculation7 = result.Calculation) === null || _result$Calculation7 === void 0 ? void 0 : _result$Calculation7[0]);
          setValues(values);
          fields.billDetails = result === null || result === void 0 ? void 0 : result.Calculation;
          setSessionFormData(fields);
          showPopUp(false);
        }).catch(e => {
          var _e$response, _e$response$data, _e$response$data$Erro, _e$response2, _e$response2$data, _e$response2$data$Err;
          setShowToast({
            isError: true,
            isWarning: false,
            key: "error",
            message: e !== null && e !== void 0 && (_e$response = e.response) !== null && _e$response !== void 0 && (_e$response$data = _e$response.data) !== null && _e$response$data !== void 0 && (_e$response$data$Erro = _e$response$data.Errors[0]) !== null && _e$response$data$Erro !== void 0 && _e$response$data$Erro.message ? t(`${e === null || e === void 0 ? void 0 : (_e$response2 = e.response) === null || _e$response2 === void 0 ? void 0 : (_e$response2$data = _e$response2.data) === null || _e$response2$data === void 0 ? void 0 : (_e$response2$data$Err = _e$response2$data.Errors[0]) === null || _e$response2$data$Err === void 0 ? void 0 : _e$response2$data$Err.code}`) : t("PT_COMMON_ADD_REBATE_PENALITY")
          });
        });
      }
    } else {
      setShowToast({
        isError: false,
        isWarning: true,
        key: "warning",
        message: t("ERR_WS_ENTER_ATLEAST_ONE_FIELD")
      });
    }
  };
  const selectedValuesData = (value, isDropDownValue = false, e) => {
    let values = {
      ...fields
    };
    if ((value == "adhocPenalty" || value == "adhocRebate") && e.target.value) {
      var _e$target, _e$target2;
      const targetValueSign = (e === null || e === void 0 ? void 0 : (_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.value) == 0 ? 1 : Math.sign(e === null || e === void 0 ? void 0 : (_e$target2 = e.target) === null || _e$target2 === void 0 ? void 0 : _e$target2.value) || -1;
      if (targetValueSign == 1) {
        values[value] = e.target.value;
      } else {
        values[value] = '';
      }
    } else if (isDropDownValue) {
      values[`${value}_data`] = e;
      values[value] = e.title;
      if (e.title == "PT_OTHERS" && value == "adhocPenaltyReason") values[`adhocPenaltyComment`] = "";
      if (e.title == "PT_OTHERS" && value == "adhocRebateReason") values[`adhocRebateComment`] = "";
    } else {
      values[value] = e.target.value;
    }
    setFields(values);
  };
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: "19px",
      maxWidth: "950px",
      minWidth: "280px"
    }
  }, values && /*#__PURE__*/React.createElement(StatusTable, null, /*#__PURE__*/React.createElement("div", null, values === null || values === void 0 ? void 0 : values.map((value, index) => {
    return /*#__PURE__*/React.createElement(Row, {
      className: "border-none",
      key: `${value.title}`,
      label: `${t(`${value.title}`)}`,
      text: value !== null && value !== void 0 && value.value ? value === null || value === void 0 ? void 0 : value.value : ""
    });
  })), /*#__PURE__*/React.createElement("hr", {
    style: {
      border: "1px solid #D6D5D4",
      color: "#D6D5D4",
      margin: "16px 0px"
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Row, {
    className: "border-none",
    key: `WS_COMMON_TOTAL_AMT`,
    label: `${t(`WS_COMMON_TOTAL_AMT`)}`,
    text: /*#__PURE__*/React.createElement("span", null, "\u20B9", (billDetails === null || billDetails === void 0 ? void 0 : billDetails.totalAmount) || 0),
    textStyle: {
      fontSize: "24px",
      fontWeight: "700"
    }
  }), /*#__PURE__*/React.createElement(Row, {
    className: "border-none",
    key: `CS_INBOX_STATUS_FILTER`,
    label: `${t(`CS_INBOX_STATUS_FILTER`)}`,
    text: isPaid ? t("WS_COMMON_PAID_LABEL") : t("WS_COMMON_NOT_PAID"),
    textStyle: !isPaid ? {
      color: "#D4351C"
    } : {
      color: "#00703C"
    }
  }))), wsAdditionalDetails !== null && wsAdditionalDetails !== void 0 && (_wsAdditionalDetails$20 = wsAdditionalDetails.additionalDetails) !== null && _wsAdditionalDetails$20 !== void 0 && _wsAdditionalDetails$20.isAdhocRebate ? /*#__PURE__*/React.createElement("div", {
    onClick: e => {
      showPopUp(true);
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      cursor: "pointer",
      color: "#a82227"
    }
  }, t("WS_PAYMENT_ADD_REBATE_PENALTY"))) : null, popup && /*#__PURE__*/React.createElement(Modal, {
    headerBarMain: /*#__PURE__*/React.createElement(Heading, {
      label: t("PT_ADD_REBATE_PENALITY")
    }),
    headerBarEnd: /*#__PURE__*/React.createElement(CloseBtn, {
      onClick: () => {
        setFields(sessionFormData);
        showPopUp(false);
      }
    }),
    actionCancelLabel: t("PT_CANCEL"),
    actionCancelOnSubmit: () => {
      setFields(sessionFormData);
      showPopUp(false);
    },
    actionSaveLabel: t("PT_ADD"),
    actionSaveOnSubmit: e => addAdhocRebatePenality(),
    hideSubmit: false,
    popupStyles: {
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: "10px 10px 1px 10px",
      margin: "0px 0px 15px 0px"
    }
  }, /*#__PURE__*/React.createElement(CardSectionHeader, {
    style: {
      fontSize: "16px",
      fontWeight: "700",
      lineHeight: "18px",
      padding: "0px",
      margin: "0px 0px 10px 0px"
    }
  }, t("PT_AD_PENALTY")), /*#__PURE__*/React.createElement(CardLabel, null, t("PT_TX_HEADS")), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement(Dropdown, {
    isMandatory: true,
    option: Penality_menu,
    optionKey: "title",
    select: e => selectedValuesData("adhocPenaltyReason", true, e),
    selected: (fields === null || fields === void 0 ? void 0 : fields.adhocPenaltyReason_data) || "",
    isPropertyAssess: true,
    name: "adhocPenaltyReason_data",
    t: t
  })), (fields === null || fields === void 0 ? void 0 : (_fields$adhocPenaltyR = fields.adhocPenaltyReason_data) === null || _fields$adhocPenaltyR === void 0 ? void 0 : _fields$adhocPenaltyR.title) === "PT_OTHERS" && /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement(CardLabel, null, t("PT_REASON")), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement(TextInput, Object.assign({
    style: {
      background: "#FAFAFA"
    },
    t: t,
    type: "text",
    isMandatory: false,
    name: "adhocPenaltyComment",
    value: (fields === null || fields === void 0 ? void 0 : fields.adhocPenaltyComment) || "",
    onChange: e => selectedValuesData("adhocPenaltyComment", false, e)
  }, validation = {
    isRequired: true,
    pattern: "^[a-zA-Z-.`' ]*$",
    type: "text",
    title: t("TL_NAME_ERROR_MESSAGE")
  })))), /*#__PURE__*/React.createElement(CardLabel, null, t("PT_HEAD_AMT")), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement(TextInput, Object.assign({
    style: {
      background: "#FAFAFA"
    },
    t: t,
    type: "number",
    isMandatory: false,
    name: "adhocPenalty",
    value: (fields === null || fields === void 0 ? void 0 : fields.adhocPenalty) || "",
    onChange: e => selectedValuesData("adhocPenalty", false, e)
  }, validation = {
    isRequired: true,
    pattern: "^[1-9]+[0-9]*$",
    title: t("ERR_DEFAULT_INPUT_FIELD_MSG")
  })))), /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: "10px 10px 1px 10px",
      margin: "0px 0px 15px 0px"
    }
  }, /*#__PURE__*/React.createElement(CardSectionHeader, {
    style: {
      fontSize: "16px",
      fontWeight: "700",
      lineHeight: "18px",
      padding: "0px",
      margin: "0px 0px 10px 0px"
    }
  }, t("PT_AD_REBATE")), /*#__PURE__*/React.createElement(CardLabel, null, t("PT_TX_HEADS")), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement(Dropdown, {
    isMandatory: true,
    option: Rebate_menu,
    optionKey: "title",
    select: e => selectedValuesData("adhocRebateReason", true, e),
    selected: (fields === null || fields === void 0 ? void 0 : fields.adhocRebateReason_data) || "",
    name: "adhocRebateReason_data",
    isPropertyAssess: true,
    t: t
  })), (fields === null || fields === void 0 ? void 0 : (_fields$adhocRebateRe = fields.adhocRebateReason_data) === null || _fields$adhocRebateRe === void 0 ? void 0 : _fields$adhocRebateRe.title) === "PT_OTHERS" && /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement(CardLabel, null, t("PT_REASON")), /*#__PURE__*/React.createElement(TextInput, Object.assign({
    style: {
      background: "#FAFAFA"
    },
    t: t,
    type: "text",
    isMandatory: false,
    name: "adhocRebateComment",
    value: (fields === null || fields === void 0 ? void 0 : fields.adhocRebateComment) || "",
    onChange: e => selectedValuesData("adhocRebateComment", false, e)
  }, validation = {
    isRequired: true,
    pattern: "^[a-zA-Z-.`' ]*$",
    type: "text",
    title: t("TL_NAME_ERROR_MESSAGE")
  }))), /*#__PURE__*/React.createElement(CardLabel, null, t("PT_HEAD_AMT")), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement(TextInput, Object.assign({
    style: {
      background: "#FAFAFA"
    },
    t: t,
    type: "number",
    isMandatory: false,
    name: "adhocRebate",
    value: (fields === null || fields === void 0 ? void 0 : fields.adhocRebate) || "",
    onChange: e => selectedValuesData("adhocRebate", false, e)
  }, validation = {
    isRequired: true,
    pattern: "^[1-9]+[0-9]*$",
    title: t("ERR_DEFAULT_INPUT_FIELD_MSG")
  }))))), " "), showToast && /*#__PURE__*/React.createElement(Toast, {
    style: {
      zIndex: "10000"
    },
    warning: showToast === null || showToast === void 0 ? void 0 : showToast.isWarning,
    error: showToast !== null && showToast !== void 0 && showToast.isWarning ? false : true,
    label: t(showToast === null || showToast === void 0 ? void 0 : showToast.message),
    onClose: closeToast,
    isDleteBtn: true
  })));
};

const EyeSvgINdex = ({
  style
}) => {
  return /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("svg", {
    style: {
      ...style
    },
    display: "inline",
    width: "22",
    height: "16",
    viewBox: "0 0 22 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M11 0.5C6 0.5 1.73 3.61 0 8C1.73 12.39 6 15.5 11 15.5C16 15.5 20.27 12.39 22 8C20.27 3.61 16 0.5 11 0.5ZM11 13C8.24 13 6 10.76 6 8C6 5.24 8.24 3 11 3C13.76 3 16 5.24 16 8C16 10.76 13.76 13 11 13ZM11 5C9.34 5 8 6.34 8 8C8 9.66 9.34 11 11 11C12.66 11 14 9.66 14 8C14 6.34 12.66 5 11 5Z",
    fill: "#a82227"
  })));
};
const InfoDetails = ({
  t,
  userType: _userType = false,
  infoBannerLabel: _infoBannerLabel = "",
  infoClickLable: _infoClickLable = "",
  infoClickInfoLabel: _infoClickInfoLabel = "",
  infoClickInfoLabel1: _infoClickInfoLabel2 = ""
}) => {
  _userType = _userType || Digit.SessionStorage.get("userType");
  const isMobile = window.Digit.Utils.browser.isMobile();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: isMobile ? {} : {
      width: "80%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-banner-wrap",
    style: {
      color: "#3498DB",
      margin: "0px"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InfoBannerIcon, null), /*#__PURE__*/React.createElement("h2", {
    style: {
      color: "#3498DB"
    }
  }, t(_infoBannerLabel))), `${t(_infoClickLable)} `, /*#__PURE__*/React.createElement(EyeSvgINdex, {
    style: {
      display: "inline",
      marginBottom: "5px"
    }
  }), ` ${t(_infoClickInfoLabel)}`, /*#__PURE__*/React.createElement("div", null, ` ${t(_infoClickInfoLabel2)}`))));
};

const ViewBreakup = ({
  wsAdditionalDetails,
  workflowDetails
}) => {
  var _wsAdditionalDetails$, _breakUpData$billSlab, _breakUpData$billSlab2, _breakUpData$billSlab3, _breakUpData$billSlab4, _breakUpData$billSlab5, _breakUpData$billSlab6;
  const {
    t
  } = useTranslation();
  const [popup, showPopUp] = useState(false);
  const [breakUpData, setBreakUpData] = useState({});
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
  const onPopupOpen = () => {
    var _sessionBillFormData$;
    let breakupData = wsAdditionalDetails.additionalDetails.data || {};
    const sessionBillData = sessionStorage.getItem("Digit.ADHOC_BILL_ADD_REBATE_DATA");
    const sessionBillFormData = sessionBillData ? JSON.parse(sessionBillData) : {};
    if (sessionBillFormData !== null && sessionBillFormData !== void 0 && (_sessionBillFormData$ = sessionBillFormData.value) !== null && _sessionBillFormData$ !== void 0 && _sessionBillFormData$.totalAmount) breakupData = sessionBillFormData === null || sessionBillFormData === void 0 ? void 0 : sessionBillFormData.value;
    setBreakUpData(breakupData);
    showPopUp(true);
  };
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: "19px",
      maxWidth: "950px",
      minWidth: "280px"
    }
  }, wsAdditionalDetails !== null && wsAdditionalDetails !== void 0 && (_wsAdditionalDetails$ = wsAdditionalDetails.additionalDetails) !== null && _wsAdditionalDetails$ !== void 0 && _wsAdditionalDetails$.isViewBreakup ? /*#__PURE__*/React.createElement("div", {
    onClick: e => onPopupOpen(),
    style: {
      marginTop: "12px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      cursor: "pointer",
      color: "#a82227"
    }
  }, t("WS_PAYMENT_VIEW_BREAKUP"))) : null, popup && /*#__PURE__*/React.createElement(Modal, {
    headerBarMain: /*#__PURE__*/React.createElement(Heading, {
      label: t("WS_CALCULATION_BREAKUP")
    }),
    headerBarEnd: /*#__PURE__*/React.createElement(CloseBtn, {
      onClick: () => {
        showPopUp(false);
      }
    }),
    hideSubmit: true,
    popupStyles: {
      overflowY: "auto"
    },
    headerBarMainStyle: {
      marginBottom: "0px"
    },
    popupModuleMianStyles: {
      paddingTop: "0px"
    }
  }, /*#__PURE__*/React.createElement(StatusTable, {
    style: {
      padding: "10px",
      paddingTop: "0px"
    }
  }, /*#__PURE__*/React.createElement(CardSectionHeader, {
    style: {
      margin: "10px 0px"
    }
  }, t("WS_APPLICATION_FEE_HEADER")), breakUpData === null || breakUpData === void 0 ? void 0 : (_breakUpData$billSlab = breakUpData.billSlabData) === null || _breakUpData$billSlab === void 0 ? void 0 : (_breakUpData$billSlab2 = _breakUpData$billSlab.FEE) === null || _breakUpData$billSlab2 === void 0 ? void 0 : _breakUpData$billSlab2.map(data => /*#__PURE__*/React.createElement(Row, {
    className: "border-none",
    rowContainerStyle: {
      margin: "0px"
    },
    labelStyle: {
      width: "50%"
    },
    key: `${data === null || data === void 0 ? void 0 : data.taxHeadCode}`,
    label: `${t(`${data === null || data === void 0 ? void 0 : data.taxHeadCode}`)}`,
    text: /*#__PURE__*/React.createElement("span", null, "\u20B9", Number(data === null || data === void 0 ? void 0 : data.amount) || 0),
    textStyle: {
      textAlign: "right"
    }
  })), /*#__PURE__*/React.createElement("hr", {
    style: {
      color: "#cccccc",
      backgroundColor: "#cccccc",
      marginBottom: "10px"
    }
  }), /*#__PURE__*/React.createElement(Row, {
    className: "border-none",
    rowContainerStyle: {
      margin: "0px"
    },
    labelStyle: {
      width: "50%"
    },
    key: `PDF_STATIC_LABEL_CONSOLIDATED_TLAPP_TOTAL_AMOUNT1`,
    label: `${t(`PDF_STATIC_LABEL_CONSOLIDATED_TLAPP_TOTAL_AMOUNT`)}`,
    text: /*#__PURE__*/React.createElement("span", null, "\u20B9", Number(breakUpData === null || breakUpData === void 0 ? void 0 : breakUpData.fee) || 0),
    textStyle: {
      textAlign: "right",
      fontWeight: "700",
      fontSize: "24px"
    }
  }), /*#__PURE__*/React.createElement(CardSectionHeader, {
    style: {
      margin: "10px 0px"
    }
  }, t("WS_SERVICE_FEE_HEADER")), breakUpData === null || breakUpData === void 0 ? void 0 : (_breakUpData$billSlab3 = breakUpData.billSlabData) === null || _breakUpData$billSlab3 === void 0 ? void 0 : (_breakUpData$billSlab4 = _breakUpData$billSlab3.CHARGES) === null || _breakUpData$billSlab4 === void 0 ? void 0 : _breakUpData$billSlab4.map(data => /*#__PURE__*/React.createElement(Row, {
    className: "border-none",
    rowContainerStyle: {
      margin: "0px"
    },
    labelStyle: {
      width: "50%"
    },
    key: `${data === null || data === void 0 ? void 0 : data.taxHeadCode}`,
    label: `${t(`${data === null || data === void 0 ? void 0 : data.taxHeadCode}`)}`,
    text: /*#__PURE__*/React.createElement("span", null, "\u20B9", Number(data === null || data === void 0 ? void 0 : data.amount) || 0),
    textStyle: {
      textAlign: "right"
    }
  })), /*#__PURE__*/React.createElement("hr", {
    style: {
      color: "#cccccc",
      backgroundColor: "#cccccc",
      marginBottom: "10px"
    }
  }), /*#__PURE__*/React.createElement(Row, {
    className: "border-none",
    rowContainerStyle: {
      margin: "0px"
    },
    labelStyle: {
      width: "50%"
    },
    key: `PDF_STATIC_LABEL_CONSOLIDATED_TLAPP_TOTAL_AMOUNT2`,
    label: `${t(`PDF_STATIC_LABEL_CONSOLIDATED_TLAPP_TOTAL_AMOUNT`)}`,
    text: /*#__PURE__*/React.createElement("span", null, "\u20B9", Number(breakUpData === null || breakUpData === void 0 ? void 0 : breakUpData.charge) || 0),
    textStyle: {
      textAlign: "right",
      fontWeight: "700",
      fontSize: "24px"
    }
  }), breakUpData === null || breakUpData === void 0 ? void 0 : (_breakUpData$billSlab5 = breakUpData.billSlabData) === null || _breakUpData$billSlab5 === void 0 ? void 0 : (_breakUpData$billSlab6 = _breakUpData$billSlab5.TAX) === null || _breakUpData$billSlab6 === void 0 ? void 0 : _breakUpData$billSlab6.map(data => /*#__PURE__*/React.createElement(Row, {
    className: "border-none",
    rowContainerStyle: {
      margin: "0px"
    },
    labelStyle: {
      width: "50%"
    },
    key: `${data === null || data === void 0 ? void 0 : data.taxHeadCode}`,
    label: `${t(`${data === null || data === void 0 ? void 0 : data.taxHeadCode}`)}`,
    text: /*#__PURE__*/React.createElement("span", null, "\u20B9", Number(data === null || data === void 0 ? void 0 : data.amount) || 0),
    textStyle: {
      textAlign: "right"
    }
  })), /*#__PURE__*/React.createElement("hr", {
    style: {
      color: "#cccccc",
      backgroundColor: "#cccccc",
      marginBottom: "10px"
    }
  }), /*#__PURE__*/React.createElement(Row, {
    className: "border-none",
    rowContainerStyle: {
      margin: "0px"
    },
    labelStyle: {
      width: "50%"
    },
    key: `PDF_STATIC_LABEL_CONSOLIDATED_TLAPP_TOTAL_AMOUNT3`,
    label: `${t(`PDF_STATIC_LABEL_CONSOLIDATED_TLAPP_TOTAL_AMOUNT`)}`,
    text: /*#__PURE__*/React.createElement("span", null, "\u20B9", Number(breakUpData === null || breakUpData === void 0 ? void 0 : breakUpData.totalAmount) || 0),
    textStyle: {
      textAlign: "right",
      fontWeight: "700",
      fontSize: "24px"
    }
  })))));
};

function ApplicationDetailsContent({
  applicationDetails,
  workflowDetails,
  isDataLoading,
  applicationData,
  businessService,
  timelineStatusPrefix,
  showTimeLine = true,
  statusAttribute = "status",
  paymentsList,
  oldValue,
  isInfoLabel = false
}) {
  var _applicationDetails$a, _workflowDetails$data3, _workflowDetails$data4, _workflowDetails$data5, _workflowDetails$data6, _workflowDetails$data7, _workflowDetails$data8, _workflowDetails$data9, _workflowDetails$data10, _workflowDetails$data11, _workflowDetails$data12;
  const {
    t
  } = useTranslation();
  function OpenImage(imageSource, index, thumbnailsToShow) {
    var _thumbnailsToShow$ful;
    window.open(thumbnailsToShow === null || thumbnailsToShow === void 0 ? void 0 : (_thumbnailsToShow$ful = thumbnailsToShow.fullImage) === null || _thumbnailsToShow$ful === void 0 ? void 0 : _thumbnailsToShow$ful[0], "_blank");
  }
  const convertEpochToDateDMY = dateEpoch => {
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
  const getTimelineCaptions = (checkpoint, index = 0) => {
    if (checkpoint.state === "OPEN" || checkpoint.status === "INITIATED" && !window.location.href.includes("/obps/")) {
      var _applicationData$audi;
      const caption = {
        date: convertEpochToDateDMY(applicationData === null || applicationData === void 0 ? void 0 : (_applicationData$audi = applicationData.auditDetails) === null || _applicationData$audi === void 0 ? void 0 : _applicationData$audi.createdTime),
        source: (applicationData === null || applicationData === void 0 ? void 0 : applicationData.channel) || ""
      };
      return /*#__PURE__*/React.createElement(TLCaption, {
        data: caption
      });
    } else if (window.location.href.includes("/obps/") || window.location.href.includes("/noc/") || window.location.href.includes("/ws/")) {
      var _checkpoint$assignes, _checkpoint$assignes$, _checkpoint$auditDeta, _checkpoint$assignes2, _checkpoint$assignes3, _applicationData$proc, _applicationData$proc2, _applicationData$proc3, _checkpoint$assignes4, _checkpoint$assignes5, _applicationData$proc4, _applicationData$proc5, _applicationData$proc6, _applicationData$proc7, _applicationData$proc8, _applicationData$proc9, _checkpoint$assignes6, _checkpoint$assignes7;
      const privacy = {
        uuid: checkpoint === null || checkpoint === void 0 ? void 0 : (_checkpoint$assignes = checkpoint.assignes) === null || _checkpoint$assignes === void 0 ? void 0 : (_checkpoint$assignes$ = _checkpoint$assignes[0]) === null || _checkpoint$assignes$ === void 0 ? void 0 : _checkpoint$assignes$.uuid,
        fieldName: "mobileNumber",
        model: "User",
        showValue: false,
        loadData: {
          serviceName: "/egov-workflow-v2/egov-wf/process/_search",
          requestBody: {},
          requestParam: {
            tenantId: applicationDetails === null || applicationDetails === void 0 ? void 0 : applicationDetails.tenantId,
            businessIds: applicationDetails === null || applicationDetails === void 0 ? void 0 : applicationDetails.applicationNo,
            history: true
          },
          jsonPath: "ProcessInstances[0].assignes[0].mobileNumber",
          isArray: false,
          d: res => {
            let resultstring = "";
            resultstring = `+91 ${_.get(res, `ProcessInstances[${index}].assignes[0].mobileNumber`)}`;
            return resultstring;
          }
        }
      };
      const caption = {
        date: checkpoint === null || checkpoint === void 0 ? void 0 : (_checkpoint$auditDeta = checkpoint.auditDetails) === null || _checkpoint$auditDeta === void 0 ? void 0 : _checkpoint$auditDeta.lastModified,
        name: checkpoint === null || checkpoint === void 0 ? void 0 : (_checkpoint$assignes2 = checkpoint.assignes) === null || _checkpoint$assignes2 === void 0 ? void 0 : (_checkpoint$assignes3 = _checkpoint$assignes2[0]) === null || _checkpoint$assignes3 === void 0 ? void 0 : _checkpoint$assignes3.name,
        mobileNumber: (applicationData === null || applicationData === void 0 ? void 0 : (_applicationData$proc = applicationData.processInstance) === null || _applicationData$proc === void 0 ? void 0 : (_applicationData$proc2 = _applicationData$proc.assignes) === null || _applicationData$proc2 === void 0 ? void 0 : (_applicationData$proc3 = _applicationData$proc2[0]) === null || _applicationData$proc3 === void 0 ? void 0 : _applicationData$proc3.uuid) === (checkpoint === null || checkpoint === void 0 ? void 0 : (_checkpoint$assignes4 = checkpoint.assignes) === null || _checkpoint$assignes4 === void 0 ? void 0 : (_checkpoint$assignes5 = _checkpoint$assignes4[0]) === null || _checkpoint$assignes5 === void 0 ? void 0 : _checkpoint$assignes5.uuid) && applicationData !== null && applicationData !== void 0 && (_applicationData$proc4 = applicationData.processInstance) !== null && _applicationData$proc4 !== void 0 && (_applicationData$proc5 = _applicationData$proc4.assignes) !== null && _applicationData$proc5 !== void 0 && (_applicationData$proc6 = _applicationData$proc5[0]) !== null && _applicationData$proc6 !== void 0 && _applicationData$proc6.mobileNumber ? applicationData === null || applicationData === void 0 ? void 0 : (_applicationData$proc7 = applicationData.processInstance) === null || _applicationData$proc7 === void 0 ? void 0 : (_applicationData$proc8 = _applicationData$proc7.assignes) === null || _applicationData$proc8 === void 0 ? void 0 : (_applicationData$proc9 = _applicationData$proc8[0]) === null || _applicationData$proc9 === void 0 ? void 0 : _applicationData$proc9.mobileNumber : checkpoint === null || checkpoint === void 0 ? void 0 : (_checkpoint$assignes6 = checkpoint.assignes) === null || _checkpoint$assignes6 === void 0 ? void 0 : (_checkpoint$assignes7 = _checkpoint$assignes6[0]) === null || _checkpoint$assignes7 === void 0 ? void 0 : _checkpoint$assignes7.mobileNumber,
        comment: t(checkpoint === null || checkpoint === void 0 ? void 0 : checkpoint.comment),
        wfComment: checkpoint.wfComment,
        thumbnailsToShow: checkpoint === null || checkpoint === void 0 ? void 0 : checkpoint.thumbnailsToShow
      };
      return /*#__PURE__*/React.createElement(TLCaption, {
        data: caption,
        OpenImage: OpenImage,
        privacy: privacy
      });
    } else {
      var _applicationData$audi2, _checkpoint$assignes8, _checkpoint$assignes9, _checkpoint$assignes10, _checkpoint$assignes11;
      const caption = {
        date: convertEpochToDateDMY(applicationData === null || applicationData === void 0 ? void 0 : (_applicationData$audi2 = applicationData.auditDetails) === null || _applicationData$audi2 === void 0 ? void 0 : _applicationData$audi2.lastModifiedTime),
        name: checkpoint === null || checkpoint === void 0 ? void 0 : (_checkpoint$assignes8 = checkpoint.assignes) === null || _checkpoint$assignes8 === void 0 ? void 0 : (_checkpoint$assignes9 = _checkpoint$assignes8[0]) === null || _checkpoint$assignes9 === void 0 ? void 0 : _checkpoint$assignes9.name,
        wfComment: checkpoint === null || checkpoint === void 0 ? void 0 : checkpoint.wfComment,
        mobileNumber: checkpoint === null || checkpoint === void 0 ? void 0 : (_checkpoint$assignes10 = checkpoint.assignes) === null || _checkpoint$assignes10 === void 0 ? void 0 : (_checkpoint$assignes11 = _checkpoint$assignes10[0]) === null || _checkpoint$assignes11 === void 0 ? void 0 : _checkpoint$assignes11.mobileNumber
      };
      return /*#__PURE__*/React.createElement(TLCaption, {
        data: caption
      });
    }
  };
  const getTranslatedValues = (dataValue, isNotTranslated) => {
    if (dataValue) {
      return !isNotTranslated ? t(dataValue) : dataValue;
    } else {
      return t("NA");
    }
  };
  const checkLocation = window.location.href.includes("employee/tl") || window.location.href.includes("employee/obps") || window.location.href.includes("employee/noc");
  const isNocLocation = window.location.href.includes("employee/noc");
  const isBPALocation = window.location.href.includes("employee/obps");
  const isWS = window.location.href.includes("employee/ws");
  const getRowStyles = () => {
    if (window.location.href.includes("employee/obps") || window.location.href.includes("employee/noc")) {
      return {
        justifyContent: "space-between",
        fontSize: "16px",
        lineHeight: "19px",
        color: "#0B0C0C"
      };
    } else if (checkLocation) {
      return {
        justifyContent: "space-between",
        fontSize: "16px",
        lineHeight: "19px",
        color: "#0B0C0C"
      };
    } else {
      return {};
    }
  };
  const getTableStyles = () => {
    if (window.location.href.includes("employee/obps") || window.location.href.includes("employee/noc")) {
      return {
        position: "relative",
        marginTop: "19px"
      };
    } else if (checkLocation) {
      return {
        position: "relative",
        marginTop: "19px"
      };
    } else {
      return {};
    }
  };
  const getMainDivStyles = () => {
    if (window.location.href.includes("employee/obps") || window.location.href.includes("employee/noc") || window.location.href.includes("employee/ws")) {
      return {
        lineHeight: "19px",
        maxWidth: "950px",
        minWidth: "280px"
      };
    } else if (checkLocation) {
      return {
        lineHeight: "19px",
        maxWidth: "600px",
        minWidth: "280px"
      };
    } else {
      return {};
    }
  };
  const getTextValue = value => {
    if (value !== null && value !== void 0 && value.skip) return value.value;else if (value !== null && value !== void 0 && value.isUnit) return value !== null && value !== void 0 && value.value ? `${getTranslatedValues(value === null || value === void 0 ? void 0 : value.value, value === null || value === void 0 ? void 0 : value.isNotTranslated)} ${t(value === null || value === void 0 ? void 0 : value.isUnit)}` : t("N/A");else return value !== null && value !== void 0 && value.value ? getTranslatedValues(value === null || value === void 0 ? void 0 : value.value, value === null || value === void 0 ? void 0 : value.isNotTranslated) : t("N/A");
  };
  const getClickInfoDetails = () => {
    if (window.location.href.includes("disconnection") || window.location.href.includes("application")) {
      return "WS_DISCONNECTION_CLICK_ON_INFO_LABEL";
    } else {
      return "WS_CLICK_ON_INFO_LABEL";
    }
  };
  const getClickInfoDetails1 = () => {
    if (window.location.href.includes("disconnection") || window.location.href.includes("application")) {
      return "WS_DISCONNECTION_CLICK_ON_INFO1_LABEL";
    } else {
      return "";
    }
  };
  return /*#__PURE__*/React.createElement(Card, {
    style: {
      position: "relative"
    },
    className: "employeeCard-override"
  }, isInfoLabel ? /*#__PURE__*/React.createElement(InfoDetails, {
    t: t,
    userType: false,
    infoBannerLabel: "CS_FILE_APPLICATION_INFO_LABEL",
    infoClickLable: "WS_CLICK_ON_LABEL",
    infoClickInfoLabel: getClickInfoDetails(),
    infoClickInfoLabel1: getClickInfoDetails1()
  }) : null, applicationDetails === null || applicationDetails === void 0 ? void 0 : (_applicationDetails$a = applicationDetails.applicationDetails) === null || _applicationDetails$a === void 0 ? void 0 : _applicationDetails$a.map((detail, index) => {
    var _detail$values, _detail$additionalDet, _applicationDetails$a2, _applicationDetails$a3, _applicationDetails$a4, _detail$additionalDet2, _applicationDetails$a5, _applicationDetails$a6, _detail$additionalDet3, _detail$additionalDet4, _detail$additionalDet5, _detail$additionalDet6, _detail$additionalDet7, _detail$additionalDet8, _detail$additionalDet9, _detail$additionalDet10, _detail$additionalDet11, _workflowDetails$data, _workflowDetails$data2, _detail$additionalDet12, _detail$additionalDet13, _detail$additionalDet14, _detail$additionalDet15, _detail$additionalDet16, _detail$additionalDet17, _detail$additionalDet18, _detail$additionalDet19, _detail$additionalDet20, _detail$additionalDet21, _detail$additionalDet22, _detail$additionalDet23, _detail$additionalDet24, _detail$additionalDet25, _detail$additionalDet26, _detail$additionalDet27, _detail$additionalDet28, _detail$additionalDet29, _detail$additionalDet30, _detail$additionalDet31;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: index
    }, /*#__PURE__*/React.createElement("div", {
      style: getMainDivStyles()
    }, index === 0 && !detail.asSectionHeader ? /*#__PURE__*/React.createElement(CardSubHeader, {
      style: {
        marginBottom: "16px",
        fontSize: "24px"
      }
    }, t(detail.title)) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CardSectionHeader, {
      style: index == 0 && checkLocation ? {
        marginBottom: "16px",
        fontSize: "24px"
      } : {
        marginBottom: "16px",
        marginTop: "32px",
        fontSize: "24px"
      }
    }, isNocLocation ? `${t(detail.title)}` : t(detail.title), detail !== null && detail !== void 0 && detail.Component ? /*#__PURE__*/React.createElement(detail.Component, null) : null)), (detail === null || detail === void 0 ? void 0 : detail.isTable) && /*#__PURE__*/React.createElement("table", {
      style: {
        tableLayout: "fixed",
        width: "100%",
        borderCollapse: "collapse"
      }
    }, /*#__PURE__*/React.createElement("tr", {
      style: {
        textAlign: "left"
      }
    }, detail === null || detail === void 0 ? void 0 : detail.headers.map(header => /*#__PURE__*/React.createElement("th", {
      style: {
        padding: "10px",
        paddingLeft: "0px"
      }
    }, t(header)))), detail === null || detail === void 0 ? void 0 : detail.tableRows.map((row, index) => {
      if (index === (detail === null || detail === void 0 ? void 0 : detail.tableRows.length) - 1) {
        return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("hr", {
          style: {
            width: "370%",
            marginTop: "15px"
          },
          className: "underline"
        }), /*#__PURE__*/React.createElement("tr", null, row.map(element => /*#__PURE__*/React.createElement("td", {
          style: {
            textAlign: "left"
          }
        }, t(element)))));
      }
      return /*#__PURE__*/React.createElement("tr", null, row.map(element => /*#__PURE__*/React.createElement("td", {
        style: {
          paddingTop: "20px",
          textAlign: "left"
        }
      }, t(element))));
    })), /*#__PURE__*/React.createElement(StatusTable, {
      style: getTableStyles()
    }, (detail === null || detail === void 0 ? void 0 : detail.title) && !(detail !== null && detail !== void 0 && detail.title.includes("NOC")) && (detail === null || detail === void 0 ? void 0 : (_detail$values = detail.values) === null || _detail$values === void 0 ? void 0 : _detail$values.map((value, index) => {
      var _detail$values3;
      if (value.map === true && value.value !== "N/A") {
        return /*#__PURE__*/React.createElement(Row, {
          labelStyle: {
            wordBreak: "break-all"
          },
          textStyle: {
            wordBreak: "break-all"
          },
          key: t(value.title),
          label: t(value.title),
          text: /*#__PURE__*/React.createElement("img", {
            src: t(value.value),
            alt: "",
            privacy: value === null || value === void 0 ? void 0 : value.privacy
          })
        });
      }
      if ((value === null || value === void 0 ? void 0 : value.isLink) == true) {
        var _detail$values2;
        return /*#__PURE__*/React.createElement(Row, {
          key: t(value.title),
          label: window.location.href.includes("tl") || window.location.href.includes("ws") ? /*#__PURE__*/React.createElement("div", {
            style: {
              width: "200%"
            }
          }, /*#__PURE__*/React.createElement(Link, {
            to: value === null || value === void 0 ? void 0 : value.to
          }, /*#__PURE__*/React.createElement("span", {
            className: "link",
            style: {
              color: "#a82227"
            }
          }, t(value === null || value === void 0 ? void 0 : value.title)))) : isNocLocation || isBPALocation ? `${t(value.title)}` : t(value.title),
          text: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Link, {
            to: value === null || value === void 0 ? void 0 : value.to
          }, /*#__PURE__*/React.createElement("span", {
            className: "link",
            style: {
              color: "#a82227"
            }
          }, value === null || value === void 0 ? void 0 : value.value))),
          last: index === (detail === null || detail === void 0 ? void 0 : (_detail$values2 = detail.values) === null || _detail$values2 === void 0 ? void 0 : _detail$values2.length) - 1,
          caption: value.caption,
          className: "border-none",
          rowContainerStyle: getRowStyles(),
          labelStyle: {
            wordBreak: "break-all"
          },
          textStyle: {
            wordBreak: "break-all"
          }
        });
      }
      return /*#__PURE__*/React.createElement("div", null, window.location.href.includes("modify") ? /*#__PURE__*/React.createElement(Row, {
        className: "border-none",
        key: `${value.title}`,
        label: `${t(`${value.title}`)}`,
        privacy: value === null || value === void 0 ? void 0 : value.privacy,
        text: value !== null && value !== void 0 && value.oldValue ? value === null || value === void 0 ? void 0 : value.oldValue : value !== null && value !== void 0 && value.value ? value === null || value === void 0 ? void 0 : value.value : "",
        labelStyle: {
          wordBreak: "break-all"
        },
        textStyle: {
          wordBreak: "break-all"
        }
      }) : /*#__PURE__*/React.createElement(Row, {
        key: t(value.title),
        label: t(value.title),
        text: getTextValue(value),
        last: index === (detail === null || detail === void 0 ? void 0 : (_detail$values3 = detail.values) === null || _detail$values3 === void 0 ? void 0 : _detail$values3.length) - 1,
        caption: value.caption,
        className: "border-none",
        privacy: value === null || value === void 0 ? void 0 : value.privacy,
        rowContainerStyle: getRowStyles(),
        labelStyle: {
          wordBreak: "break-all"
        },
        textStyle: {
          wordBreak: "break-all"
        }
      }));
    })))), (detail === null || detail === void 0 ? void 0 : detail.belowComponent) && /*#__PURE__*/React.createElement(detail.belowComponent, null), (detail === null || detail === void 0 ? void 0 : (_detail$additionalDet = detail.additionalDetails) === null || _detail$additionalDet === void 0 ? void 0 : _detail$additionalDet.inspectionReport) && /*#__PURE__*/React.createElement(ScruntinyDetails, {
      scrutinyDetails: detail === null || detail === void 0 ? void 0 : detail.additionalDetails,
      paymentsList: paymentsList
    }), (applicationDetails === null || applicationDetails === void 0 ? void 0 : (_applicationDetails$a2 = applicationDetails.applicationData) === null || _applicationDetails$a2 === void 0 ? void 0 : (_applicationDetails$a3 = _applicationDetails$a2.additionalDetails) === null || _applicationDetails$a3 === void 0 ? void 0 : (_applicationDetails$a4 = _applicationDetails$a3.fieldinspection_pending) === null || _applicationDetails$a4 === void 0 ? void 0 : _applicationDetails$a4.length) > 0 && (detail === null || detail === void 0 ? void 0 : (_detail$additionalDet2 = detail.additionalDetails) === null || _detail$additionalDet2 === void 0 ? void 0 : _detail$additionalDet2.fiReport) && /*#__PURE__*/React.createElement(InspectionReport, {
      fiReport: applicationDetails === null || applicationDetails === void 0 ? void 0 : (_applicationDetails$a5 = applicationDetails.applicationData) === null || _applicationDetails$a5 === void 0 ? void 0 : (_applicationDetails$a6 = _applicationDetails$a5.additionalDetails) === null || _applicationDetails$a6 === void 0 ? void 0 : _applicationDetails$a6.fieldinspection_pending
    }), (detail === null || detail === void 0 ? void 0 : (_detail$additionalDet3 = detail.additionalDetails) === null || _detail$additionalDet3 === void 0 ? void 0 : _detail$additionalDet3.floors) && /*#__PURE__*/React.createElement(PropertyFloors, {
      floors: detail === null || detail === void 0 ? void 0 : (_detail$additionalDet4 = detail.additionalDetails) === null || _detail$additionalDet4 === void 0 ? void 0 : _detail$additionalDet4.floors
    }), (detail === null || detail === void 0 ? void 0 : (_detail$additionalDet5 = detail.additionalDetails) === null || _detail$additionalDet5 === void 0 ? void 0 : _detail$additionalDet5.owners) && /*#__PURE__*/React.createElement(PropertyOwners, {
      owners: detail === null || detail === void 0 ? void 0 : (_detail$additionalDet6 = detail.additionalDetails) === null || _detail$additionalDet6 === void 0 ? void 0 : _detail$additionalDet6.owners
    }), (detail === null || detail === void 0 ? void 0 : (_detail$additionalDet7 = detail.additionalDetails) === null || _detail$additionalDet7 === void 0 ? void 0 : _detail$additionalDet7.units) && /*#__PURE__*/React.createElement(TLTradeUnits, {
      units: detail === null || detail === void 0 ? void 0 : (_detail$additionalDet8 = detail.additionalDetails) === null || _detail$additionalDet8 === void 0 ? void 0 : _detail$additionalDet8.units
    }), (detail === null || detail === void 0 ? void 0 : (_detail$additionalDet9 = detail.additionalDetails) === null || _detail$additionalDet9 === void 0 ? void 0 : _detail$additionalDet9.accessories) && /*#__PURE__*/React.createElement(TLTradeAccessories, {
      units: detail === null || detail === void 0 ? void 0 : (_detail$additionalDet10 = detail.additionalDetails) === null || _detail$additionalDet10 === void 0 ? void 0 : _detail$additionalDet10.accessories
    }), (detail === null || detail === void 0 ? void 0 : (_detail$additionalDet11 = detail.additionalDetails) === null || _detail$additionalDet11 === void 0 ? void 0 : _detail$additionalDet11.permissions) && (workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data = workflowDetails.data) === null || _workflowDetails$data === void 0 ? void 0 : (_workflowDetails$data2 = _workflowDetails$data.nextActions) === null || _workflowDetails$data2 === void 0 ? void 0 : _workflowDetails$data2.length) > 0 && /*#__PURE__*/React.createElement(PermissionCheck, {
      applicationData: applicationDetails === null || applicationDetails === void 0 ? void 0 : applicationDetails.applicationData,
      t: t,
      permissions: detail === null || detail === void 0 ? void 0 : (_detail$additionalDet12 = detail.additionalDetails) === null || _detail$additionalDet12 === void 0 ? void 0 : _detail$additionalDet12.permissions
    }), (detail === null || detail === void 0 ? void 0 : (_detail$additionalDet13 = detail.additionalDetails) === null || _detail$additionalDet13 === void 0 ? void 0 : _detail$additionalDet13.obpsDocuments) && /*#__PURE__*/React.createElement(BPADocuments, {
      t: t,
      applicationData: applicationDetails === null || applicationDetails === void 0 ? void 0 : applicationDetails.applicationData,
      docs: detail.additionalDetails.obpsDocuments,
      bpaActionsDetails: workflowDetails
    }), (detail === null || detail === void 0 ? void 0 : (_detail$additionalDet14 = detail.additionalDetails) === null || _detail$additionalDet14 === void 0 ? void 0 : _detail$additionalDet14.noc) && /*#__PURE__*/React.createElement(NOCDocuments, {
      t: t,
      isNoc: true,
      NOCdata: detail.values,
      applicationData: applicationDetails === null || applicationDetails === void 0 ? void 0 : applicationDetails.applicationData,
      docs: detail.additionalDetails.noc,
      noc: (_detail$additionalDet15 = detail.additionalDetails) === null || _detail$additionalDet15 === void 0 ? void 0 : _detail$additionalDet15.data,
      bpaActionsDetails: workflowDetails
    }), (detail === null || detail === void 0 ? void 0 : (_detail$additionalDet16 = detail.additionalDetails) === null || _detail$additionalDet16 === void 0 ? void 0 : _detail$additionalDet16.scruntinyDetails) && /*#__PURE__*/React.createElement(ScruntinyDetails, {
      scrutinyDetails: detail === null || detail === void 0 ? void 0 : detail.additionalDetails
    }), (detail === null || detail === void 0 ? void 0 : (_detail$additionalDet17 = detail.additionalDetails) === null || _detail$additionalDet17 === void 0 ? void 0 : _detail$additionalDet17.buildingExtractionDetails) && /*#__PURE__*/React.createElement(ScruntinyDetails, {
      scrutinyDetails: detail === null || detail === void 0 ? void 0 : detail.additionalDetails
    }), (detail === null || detail === void 0 ? void 0 : (_detail$additionalDet18 = detail.additionalDetails) === null || _detail$additionalDet18 === void 0 ? void 0 : _detail$additionalDet18.subOccupancyTableDetails) && /*#__PURE__*/React.createElement(SubOccupancyTable, {
      edcrDetails: detail === null || detail === void 0 ? void 0 : detail.additionalDetails,
      applicationData: applicationDetails === null || applicationDetails === void 0 ? void 0 : applicationDetails.applicationData
    }), (detail === null || detail === void 0 ? void 0 : (_detail$additionalDet19 = detail.additionalDetails) === null || _detail$additionalDet19 === void 0 ? void 0 : _detail$additionalDet19.documentsWithUrl) && /*#__PURE__*/React.createElement(DocumentsPreview, {
      documents: detail === null || detail === void 0 ? void 0 : (_detail$additionalDet20 = detail.additionalDetails) === null || _detail$additionalDet20 === void 0 ? void 0 : _detail$additionalDet20.documentsWithUrl
    }), (detail === null || detail === void 0 ? void 0 : (_detail$additionalDet21 = detail.additionalDetails) === null || _detail$additionalDet21 === void 0 ? void 0 : _detail$additionalDet21.documents) && /*#__PURE__*/React.createElement(PropertyDocuments, {
      documents: detail === null || detail === void 0 ? void 0 : (_detail$additionalDet22 = detail.additionalDetails) === null || _detail$additionalDet22 === void 0 ? void 0 : _detail$additionalDet22.documents
    }), (detail === null || detail === void 0 ? void 0 : (_detail$additionalDet23 = detail.additionalDetails) === null || _detail$additionalDet23 === void 0 ? void 0 : _detail$additionalDet23.taxHeadEstimatesCalculation) && /*#__PURE__*/React.createElement(PropertyEstimates, {
      taxHeadEstimatesCalculation: detail === null || detail === void 0 ? void 0 : (_detail$additionalDet24 = detail.additionalDetails) === null || _detail$additionalDet24 === void 0 ? void 0 : _detail$additionalDet24.taxHeadEstimatesCalculation
    }), (detail === null || detail === void 0 ? void 0 : detail.isWaterConnectionDetails) && /*#__PURE__*/React.createElement(WSAdditonalDetails, {
      wsAdditionalDetails: detail,
      oldValue: oldValue
    }), (detail === null || detail === void 0 ? void 0 : (_detail$additionalDet25 = detail.additionalDetails) === null || _detail$additionalDet25 === void 0 ? void 0 : _detail$additionalDet25.redirectUrl) && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: "16px",
        lineHeight: "24px",
        fontWeight: "400",
        padding: "10px 0px"
      }
    }, /*#__PURE__*/React.createElement(Link, {
      to: detail === null || detail === void 0 ? void 0 : (_detail$additionalDet26 = detail.additionalDetails) === null || _detail$additionalDet26 === void 0 ? void 0 : (_detail$additionalDet27 = _detail$additionalDet26.redirectUrl) === null || _detail$additionalDet27 === void 0 ? void 0 : _detail$additionalDet27.url
    }, /*#__PURE__*/React.createElement("span", {
      className: "link",
      style: {
        color: "#a82227"
      }
    }, detail === null || detail === void 0 ? void 0 : (_detail$additionalDet28 = detail.additionalDetails) === null || _detail$additionalDet28 === void 0 ? void 0 : (_detail$additionalDet29 = _detail$additionalDet28.redirectUrl) === null || _detail$additionalDet29 === void 0 ? void 0 : _detail$additionalDet29.title))), (detail === null || detail === void 0 ? void 0 : (_detail$additionalDet30 = detail.additionalDetails) === null || _detail$additionalDet30 === void 0 ? void 0 : _detail$additionalDet30.estimationDetails) && /*#__PURE__*/React.createElement(WSFeeEstimation, {
      wsAdditionalDetails: detail,
      workflowDetails: workflowDetails
    }), (detail === null || detail === void 0 ? void 0 : (_detail$additionalDet31 = detail.additionalDetails) === null || _detail$additionalDet31 === void 0 ? void 0 : _detail$additionalDet31.estimationDetails) && /*#__PURE__*/React.createElement(ViewBreakup, {
      wsAdditionalDetails: detail,
      workflowDetails: workflowDetails
    }));
  }), showTimeLine && (workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data3 = workflowDetails.data) === null || _workflowDetails$data3 === void 0 ? void 0 : (_workflowDetails$data4 = _workflowDetails$data3.timeline) === null || _workflowDetails$data4 === void 0 ? void 0 : _workflowDetails$data4.length) > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BreakLine, null), ((workflowDetails === null || workflowDetails === void 0 ? void 0 : workflowDetails.isLoading) || isDataLoading) && /*#__PURE__*/React.createElement(Loader, null), !(workflowDetails !== null && workflowDetails !== void 0 && workflowDetails.isLoading) && !isDataLoading && /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(CardSectionHeader, {
    style: {
      marginBottom: "16px",
      marginTop: "32px"
    }
  }, t("ES_APPLICATION_DETAILS_APPLICATION_TIMELINE")), workflowDetails !== null && workflowDetails !== void 0 && (_workflowDetails$data5 = workflowDetails.data) !== null && _workflowDetails$data5 !== void 0 && _workflowDetails$data5.timeline && (workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data6 = workflowDetails.data) === null || _workflowDetails$data6 === void 0 ? void 0 : (_workflowDetails$data7 = _workflowDetails$data6.timeline) === null || _workflowDetails$data7 === void 0 ? void 0 : _workflowDetails$data7.length) === 1 ? /*#__PURE__*/React.createElement(CheckPoint, {
    isCompleted: true,
    label: t(`${timelineStatusPrefix}${workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data8 = workflowDetails.data) === null || _workflowDetails$data8 === void 0 ? void 0 : (_workflowDetails$data9 = _workflowDetails$data8.timeline[0]) === null || _workflowDetails$data9 === void 0 ? void 0 : _workflowDetails$data9.state}`),
    customChild: getTimelineCaptions(workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data10 = workflowDetails.data) === null || _workflowDetails$data10 === void 0 ? void 0 : _workflowDetails$data10.timeline[0])
  }) : /*#__PURE__*/React.createElement(ConnectingCheckPoints, null, (workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data11 = workflowDetails.data) === null || _workflowDetails$data11 === void 0 ? void 0 : _workflowDetails$data11.timeline) && (workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data12 = workflowDetails.data) === null || _workflowDetails$data12 === void 0 ? void 0 : _workflowDetails$data12.timeline.map((checkpoint, index, arr) => {
    let timelineStatusPostfix = "";
    if (window.location.href.includes("/obps/")) {
      var _workflowDetails$data13, _workflowDetails$data14, _workflowDetails$data15, _workflowDetails$data16, _workflowDetails$data17, _workflowDetails$data18;
      if (workflowDetails !== null && workflowDetails !== void 0 && (_workflowDetails$data13 = workflowDetails.data) !== null && _workflowDetails$data13 !== void 0 && (_workflowDetails$data14 = _workflowDetails$data13.timeline[index - 1]) !== null && _workflowDetails$data14 !== void 0 && (_workflowDetails$data15 = _workflowDetails$data14.state) !== null && _workflowDetails$data15 !== void 0 && _workflowDetails$data15.includes("BACK_FROM") || workflowDetails !== null && workflowDetails !== void 0 && (_workflowDetails$data16 = workflowDetails.data) !== null && _workflowDetails$data16 !== void 0 && (_workflowDetails$data17 = _workflowDetails$data16.timeline[index - 1]) !== null && _workflowDetails$data17 !== void 0 && (_workflowDetails$data18 = _workflowDetails$data17.state) !== null && _workflowDetails$data18 !== void 0 && _workflowDetails$data18.includes("SEND_TO_CITIZEN")) timelineStatusPostfix = `_NOT_DONE`;else if ((checkpoint === null || checkpoint === void 0 ? void 0 : checkpoint.performedAction) === "SEND_TO_ARCHITECT") timelineStatusPostfix = `_BY_ARCHITECT_DONE`;else timelineStatusPostfix = index == 0 ? "" : `_DONE`;
    }
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: index
    }, /*#__PURE__*/React.createElement(CheckPoint, {
      keyValue: index,
      isCompleted: index === 0,
      info: checkpoint.comment,
      label: t(`${timelineStatusPrefix}${(checkpoint === null || checkpoint === void 0 ? void 0 : checkpoint.performedAction) === "REOPEN" ? checkpoint === null || checkpoint === void 0 ? void 0 : checkpoint.performedAction : checkpoint === null || checkpoint === void 0 ? void 0 : checkpoint[statusAttribute]}${timelineStatusPostfix}`),
      customChild: getTimelineCaptions(checkpoint, index)
    }));
  }))))));
}

function ApplicationDetailsToast({
  t,
  showToast,
  closeToast,
  businessService
}) {
  var _showToast$error, _showToast$error2, _showToast$error3, _showToast$error4, _showToast$error5, _showToast$error6, _showToast$error7, _showToast$error8, _showToast$action2, _showToast$error9, _showToast$error10, _showToast$error11, _showToast$error12, _showToast$error13, _showToast$error14, _showToast$error15, _showToast$error16, _showToast$action4;
  if (businessService !== null && businessService !== void 0 && businessService.includes("NewTL") || businessService !== null && businessService !== void 0 && businessService.includes("TL") || businessService !== null && businessService !== void 0 && businessService.includes("EDITRENEWAL")) {
    var _showToast$action;
    let label = "";
    switch (showToast === null || showToast === void 0 ? void 0 : (_showToast$action = showToast.action) === null || _showToast$action === void 0 ? void 0 : _showToast$action.action) {
      case "SENDBACK":
        label = (showToast === null || showToast === void 0 ? void 0 : showToast.key) === "error" ? showToast === null || showToast === void 0 ? void 0 : (_showToast$error = showToast.error) === null || _showToast$error === void 0 ? void 0 : _showToast$error.message : t("TL_SENDBACK_CHECKLIST_MESSAGE_HEAD");
        break;
      case "FORWARD":
        label = (showToast === null || showToast === void 0 ? void 0 : showToast.key) === "error" ? showToast === null || showToast === void 0 ? void 0 : (_showToast$error2 = showToast.error) === null || _showToast$error2 === void 0 ? void 0 : _showToast$error2.message : t("TL_FORWARD_SUCCESS_MESSAGE_MAIN");
        break;
      case "APPROVE":
        label = (showToast === null || showToast === void 0 ? void 0 : showToast.key) === "error" ? showToast === null || showToast === void 0 ? void 0 : (_showToast$error3 = showToast.error) === null || _showToast$error3 === void 0 ? void 0 : _showToast$error3.message : t("TL_APPROVAL_CHECKLIST_MESSAGE_HEAD");
        break;
      case "SENDBACKTOCITIZEN":
        label = (showToast === null || showToast === void 0 ? void 0 : showToast.key) === "error" ? showToast === null || showToast === void 0 ? void 0 : (_showToast$error4 = showToast.error) === null || _showToast$error4 === void 0 ? void 0 : _showToast$error4.message : t("TL_SENDBACK_TOCITIZEN_CHECKLIST_MESSAGE_HEAD");
        break;
      case "REJECT":
        label = (showToast === null || showToast === void 0 ? void 0 : showToast.key) === "error" ? showToast === null || showToast === void 0 ? void 0 : (_showToast$error5 = showToast.error) === null || _showToast$error5 === void 0 ? void 0 : _showToast$error5.message : t("TL_APPROVAL_REJ_MESSAGE_HEAD");
        break;
      case "RESUBMIT":
        label = (showToast === null || showToast === void 0 ? void 0 : showToast.key) === "error" ? showToast === null || showToast === void 0 ? void 0 : (_showToast$error6 = showToast.error) === null || _showToast$error6 === void 0 ? void 0 : _showToast$error6.message : t("TL_APPLICATION_RESUBMIT_SUCCESS_MESSAGE_MAIN");
        break;
      case "CANCEL":
        label = (showToast === null || showToast === void 0 ? void 0 : showToast.key) === "error" ? showToast === null || showToast === void 0 ? void 0 : (_showToast$error7 = showToast.error) === null || _showToast$error7 === void 0 ? void 0 : _showToast$error7.message : t("TL_TL_CANCELLED_MESSAGE_HEAD");
        break;
      default:
        label = (showToast === null || showToast === void 0 ? void 0 : showToast.key) === "error" ? showToast === null || showToast === void 0 ? void 0 : (_showToast$error8 = showToast.error) === null || _showToast$error8 === void 0 ? void 0 : _showToast$error8.message : t(`ES_${businessService}_${showToast === null || showToast === void 0 ? void 0 : (_showToast$action2 = showToast.action) === null || _showToast$action2 === void 0 ? void 0 : _showToast$action2.action}_UPDATE_SUCCESS`);
    }
    return /*#__PURE__*/React.createElement(React.Fragment, null, showToast && /*#__PURE__*/React.createElement(Toast, {
      error: showToast.key === "error",
      label: label,
      onClose: closeToast
    }));
  } else if (businessService !== null && businessService !== void 0 && businessService.includes("BPA") || businessService !== null && businessService !== void 0 && businessService.includes("BPA_LOW") || businessService !== null && businessService !== void 0 && businessService.includes("BPA_OC")) {
    var _showToast$action3;
    const getMessage = (messages = []) => {
      let returnValue = messages[0];
      if ((messages === null || messages === void 0 ? void 0 : messages.length) == 2) returnValue = businessService !== null && businessService !== void 0 && businessService.includes("BPA_OC") ? t(messages[1]) : t(messages[0]);else returnValue = t(messages[0]);
      return returnValue;
    };
    let label = "";
    switch (showToast === null || showToast === void 0 ? void 0 : (_showToast$action3 = showToast.action) === null || _showToast$action3 === void 0 ? void 0 : _showToast$action3.action) {
      case "REVOCATE":
        label = (showToast === null || showToast === void 0 ? void 0 : showToast.key) === "error" ? showToast === null || showToast === void 0 ? void 0 : (_showToast$error9 = showToast.error) === null || _showToast$error9 === void 0 ? void 0 : _showToast$error9.message : getMessage(["BPA_APPROVAL_REVOCATED_MESSAGE_HEAD", "BPA_APPROVAL_OC_REVOCATED_MESSAGE_HEAD"]);
        break;
      case "VERIFY_AND_FORWARD":
        label = (showToast === null || showToast === void 0 ? void 0 : showToast.key) === "error" ? showToast === null || showToast === void 0 ? void 0 : (_showToast$error10 = showToast.error) === null || _showToast$error10 === void 0 ? void 0 : _showToast$error10.message : getMessage(["BPA_FORWARD_SUCCESS_MESSAGE_MAIN"]);
        break;
      case "SEND_BACK_TO_CITIZEN":
        label = (showToast === null || showToast === void 0 ? void 0 : showToast.key) === "error" ? showToast === null || showToast === void 0 ? void 0 : (_showToast$error11 = showToast.error) === null || _showToast$error11 === void 0 ? void 0 : _showToast$error11.message : getMessage(["BPA_SENDBACK_SUCCESS_MESSAGE_MAIN"]);
        break;
      case "APPROVE":
        label = (showToast === null || showToast === void 0 ? void 0 : showToast.key) === "error" ? showToast === null || showToast === void 0 ? void 0 : (_showToast$error12 = showToast.error) === null || _showToast$error12 === void 0 ? void 0 : _showToast$error12.message : getMessage(["BPA_APPROVAL_CHECKLIST_MESSAGE_HEAD"]);
        break;
      case "REJECT":
        label = (showToast === null || showToast === void 0 ? void 0 : showToast.key) === "error" ? showToast === null || showToast === void 0 ? void 0 : (_showToast$error13 = showToast.error) === null || _showToast$error13 === void 0 ? void 0 : _showToast$error13.message : getMessage(["BPA_APPROVAL_REJECTED_MESSAGE_HEAD", "BPA_OC_APPROVAL_REJECTED_MESSAGE_HEAD"]);
        break;
      case "FORWARD":
        label = (showToast === null || showToast === void 0 ? void 0 : showToast.key) === "error" ? showToast === null || showToast === void 0 ? void 0 : (_showToast$error14 = showToast.error) === null || _showToast$error14 === void 0 ? void 0 : _showToast$error14.message : getMessage(["BPA_FORWARD_SUCCESS_MESSAGE_MAIN"]);
        break;
      case "SEND_BACK_FOR_DOCUMENT_VERIFICATION":
      case "SEND_BACK_FOR_FIELD_INSPECTION":
        label = (showToast === null || showToast === void 0 ? void 0 : showToast.key) === "error" ? showToast === null || showToast === void 0 ? void 0 : (_showToast$error15 = showToast.error) === null || _showToast$error15 === void 0 ? void 0 : _showToast$error15.message : getMessage(["BPA_SENDBACK_SUCCESS_MESSAGE_MAIN"]);
        break;
      default:
        label = (showToast === null || showToast === void 0 ? void 0 : showToast.key) === "error" ? showToast === null || showToast === void 0 ? void 0 : (_showToast$error16 = showToast.error) === null || _showToast$error16 === void 0 ? void 0 : _showToast$error16.message : t(`ES_${businessService}_${showToast === null || showToast === void 0 ? void 0 : (_showToast$action4 = showToast.action) === null || _showToast$action4 === void 0 ? void 0 : _showToast$action4.action}_UPDATE_SUCCESS`);
    }
    return /*#__PURE__*/React.createElement(React.Fragment, null, showToast && /*#__PURE__*/React.createElement(Toast, {
      error: showToast.key === "error",
      label: label,
      onClose: closeToast
    }));
  } else {
    var _showToast$error17, _showToast$action5;
    const label = (showToast === null || showToast === void 0 ? void 0 : showToast.key) === "error" ? showToast === null || showToast === void 0 ? void 0 : (_showToast$error17 = showToast.error) === null || _showToast$error17 === void 0 ? void 0 : _showToast$error17.message : `ES_${businessService}_${showToast === null || showToast === void 0 ? void 0 : (_showToast$action5 = showToast.action) === null || _showToast$action5 === void 0 ? void 0 : _showToast$action5.action}_UPDATE_SUCCESS`;
    return /*#__PURE__*/React.createElement(React.Fragment, null, showToast && /*#__PURE__*/React.createElement(Toast, {
      error: showToast.key === "error",
      label: t(label),
      onClose: closeToast
    }));
  }
}

function ApplicationDetailsActionBar({
  workflowDetails,
  displayMenu,
  onActionSelect,
  setDisplayMenu,
  businessService,
  forcedActionPrefix,
  ActionBarStyle = {},
  MenuStyle = {}
}) {
  var _user, _user$info, _user$info$roles, _workflowDetails$data, _workflowDetails$data2, _workflowDetails$data3, _workflowDetails$data4, _workflowDetails$data5, _actions$, _actions$$redirection, _workflowDetails$data6, _workflowDetails$data7, _workflowDetails$data8, _actions$2, _actions$3, _actions$4;
  const {
    t
  } = useTranslation();
  let user = Digit.UserService.getUser();
  const menuRef = useRef();
  if (window.location.href.includes("/obps") || window.location.href.includes("/noc")) {
    const userInfos = sessionStorage.getItem("Digit.citizen.userRequestObject");
    const userInfo = userInfos ? JSON.parse(userInfos) : {};
    user = userInfo === null || userInfo === void 0 ? void 0 : userInfo.value;
  }
  const userRoles = (_user = user) === null || _user === void 0 ? void 0 : (_user$info = _user.info) === null || _user$info === void 0 ? void 0 : (_user$info$roles = _user$info.roles) === null || _user$info$roles === void 0 ? void 0 : _user$info$roles.map(e => e.code);
  let isSingleButton = false;
  let isMenuBotton = false;
  let actions = (workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data = workflowDetails.data) === null || _workflowDetails$data === void 0 ? void 0 : (_workflowDetails$data2 = _workflowDetails$data.actionState) === null || _workflowDetails$data2 === void 0 ? void 0 : (_workflowDetails$data3 = _workflowDetails$data2.nextActions) === null || _workflowDetails$data3 === void 0 ? void 0 : _workflowDetails$data3.filter(e => {
    return (userRoles === null || userRoles === void 0 ? void 0 : userRoles.some(role => {
      var _e$roles;
      return (_e$roles = e.roles) === null || _e$roles === void 0 ? void 0 : _e$roles.includes(role);
    })) || !e.roles;
  })) || (workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data4 = workflowDetails.data) === null || _workflowDetails$data4 === void 0 ? void 0 : (_workflowDetails$data5 = _workflowDetails$data4.nextActions) === null || _workflowDetails$data5 === void 0 ? void 0 : _workflowDetails$data5.filter(e => {
    return (userRoles === null || userRoles === void 0 ? void 0 : userRoles.some(role => {
      var _e$roles2;
      return (_e$roles2 = e.roles) === null || _e$roles2 === void 0 ? void 0 : _e$roles2.includes(role);
    })) || !e.roles;
  }));
  const closeMenu = () => {
    setDisplayMenu(false);
  };
  Digit.Hooks.useClickOutside(menuRef, closeMenu, displayMenu);
  if ((window.location.href.includes("/obps") || window.location.href.includes("/noc")) && (actions === null || actions === void 0 ? void 0 : actions.length) == 1 || actions !== null && actions !== void 0 && (_actions$ = actions[0]) !== null && _actions$ !== void 0 && (_actions$$redirection = _actions$.redirectionUrl) !== null && _actions$$redirection !== void 0 && _actions$$redirection.pathname.includes("/pt/property-details/") && (actions === null || actions === void 0 ? void 0 : actions.length) == 1) {
    isMenuBotton = false;
    isSingleButton = true;
  } else if ((actions === null || actions === void 0 ? void 0 : actions.length) > 0) {
    isMenuBotton = true;
    isSingleButton = false;
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, !(workflowDetails !== null && workflowDetails !== void 0 && workflowDetails.isLoading) && isMenuBotton && !isSingleButton && /*#__PURE__*/React.createElement(ActionBar, {
    style: {
      ...ActionBarStyle
    }
  }, displayMenu && (workflowDetails !== null && workflowDetails !== void 0 && (_workflowDetails$data6 = workflowDetails.data) !== null && _workflowDetails$data6 !== void 0 && (_workflowDetails$data7 = _workflowDetails$data6.actionState) !== null && _workflowDetails$data7 !== void 0 && _workflowDetails$data7.nextActions || workflowDetails !== null && workflowDetails !== void 0 && (_workflowDetails$data8 = workflowDetails.data) !== null && _workflowDetails$data8 !== void 0 && _workflowDetails$data8.nextActions) ? /*#__PURE__*/React.createElement(Menu, {
    localeKeyPrefix: forcedActionPrefix || `WF_EMPLOYEE_${businessService === null || businessService === void 0 ? void 0 : businessService.toUpperCase()}`,
    options: actions,
    optionKey: "action",
    t: t,
    onSelect: onActionSelect,
    style: MenuStyle
  }) : null, /*#__PURE__*/React.createElement(SubmitBar, {
    ref: menuRef,
    label: t("WF_TAKE_ACTION"),
    onSubmit: () => setDisplayMenu(!displayMenu)
  })), !(workflowDetails !== null && workflowDetails !== void 0 && workflowDetails.isLoading) && !isMenuBotton && isSingleButton && /*#__PURE__*/React.createElement(ActionBar, {
    style: {
      ...ActionBarStyle
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      color: "#FFFFFF",
      fontSize: "18px"
    },
    className: "submit-bar",
    name: actions === null || actions === void 0 ? void 0 : (_actions$2 = actions[0]) === null || _actions$2 === void 0 ? void 0 : _actions$2.action,
    value: actions === null || actions === void 0 ? void 0 : (_actions$3 = actions[0]) === null || _actions$3 === void 0 ? void 0 : _actions$3.action,
    onClick: e => {
      onActionSelect((actions === null || actions === void 0 ? void 0 : actions[0]) || {});
    }
  }, t(`${forcedActionPrefix || `WF_EMPLOYEE_${businessService === null || businessService === void 0 ? void 0 : businessService.toUpperCase()}`}_${actions === null || actions === void 0 ? void 0 : (_actions$4 = actions[0]) === null || _actions$4 === void 0 ? void 0 : _actions$4.action}`))));
}

const Close$6 = () => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "#FFFFFF"
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0V0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
}));
const CloseBtn$6 = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "icon-bg-secondary",
    onClick: props.onClick
  }, /*#__PURE__*/React.createElement(Close$6, null));
};
function ApplicationDetailsWarningPopup({
  action,
  workflowDetails,
  businessService,
  isWarningPop,
  closeWarningPopup
}) {
  const {
    t
  } = useTranslation();
  const isMobile = window.Digit.Utils.browser.isMobile();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Modal, {
    headerBarMain: /*#__PURE__*/React.createElement("h1", {
      className: "heading-m"
    }, t("PT_DUES_ARE_PENDING")),
    headerBarEnd: /*#__PURE__*/React.createElement(CloseBtn$6, {
      onClick: () => {
        closeWarningPopup();
      }
    }),
    hideSubmit: true,
    isDisabled: false,
    popupStyles: isMobile ? {} : {
      width: "29%",
      marginTop: "auto"
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "30px"
    }
  }, /*#__PURE__*/React.createElement("h1", null, t("PT_YOU_HAVE"), " \u20B9", action === null || action === void 0 ? void 0 : action.AmountDueForPay, " ", t("PT_DUE_WARNING_MSG2"))), /*#__PURE__*/React.createElement(Row, {
    rowContainerStyle: {
      display: "flex"
    },
    labelStyle: {
      fontSize: "24px",
      fontWeight: "700",
      marginRight: "10%"
    },
    textStyle: {
      fontSize: "24px",
      fontWeight: "700",
      marginBottom: "20px"
    },
    label: `${t("PT_AMOUNT_DUE")}`,
    text: `₹${t(action === null || action === void 0 ? void 0 : action.AmountDueForPay)}`
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      display: "flex",
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/React.createElement(ButtonSelector, {
    theme: "border",
    label: t('ES_PT_COMMON_CANCEL'),
    onSubmit: closeWarningPopup,
    style: {
      marginLeft: "10px"
    }
  }), /*#__PURE__*/React.createElement(ButtonSelector, {
    label: t('PT_COLLECT'),
    onSubmit: () => {
      var _action$redirectionUr;
      return window.location.assign(`${window.location.origin}${action === null || action === void 0 ? void 0 : (_action$redirectionUr = action.redirectionUrl) === null || _action$redirectionUr === void 0 ? void 0 : _action$redirectionUr.pathname}`);
    },
    style: {
      marginLeft: "10px"
    }
  })))), ")");
}

const ApplicationDetails = props => {
  var _workflowDetails$data;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const state = Digit.ULBService.getStateId();
  const {
    t
  } = useTranslation();
  const history = useHistory();
  let {
    id: applicationNumber
  } = useParams();
  const [displayMenu, setDisplayMenu] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEnableLoader, setIsEnableLoader] = useState(false);
  const [isWarningPop, setWarningPopUp] = useState(false);
  const {
    applicationDetails,
    showToast,
    setShowToast,
    isLoading,
    isDataLoading,
    applicationData,
    mutate,
    nocMutation,
    workflowDetails,
    businessService,
    closeToast,
    moduleCode,
    timelineStatusPrefix,
    forcedActionPrefix,
    statusAttribute,
    ActionBarStyle,
    MenuStyle,
    paymentsList,
    showTimeLine = true,
    oldValue,
    isInfoLabel = false,
    clearDataDetails
  } = props;
  useEffect(() => {
    if (showToast) {
      workflowDetails.revalidate();
    }
  }, [showToast]);
  function onActionSelect(action) {
    if (action) {
      if (action !== null && action !== void 0 && action.isToast) {
        setShowToast({
          key: "error",
          error: {
            message: action === null || action === void 0 ? void 0 : action.toastMessage
          }
        });
        setTimeout(closeToast, 5000);
      } else if (action !== null && action !== void 0 && action.isWarningPopUp) {
        setWarningPopUp(true);
      } else if (action !== null && action !== void 0 && action.redirectionUrll) {
        var _action$redirectionUr, _action$redirectionUr4;
        if ((action === null || action === void 0 ? void 0 : (_action$redirectionUr = action.redirectionUrll) === null || _action$redirectionUr === void 0 ? void 0 : _action$redirectionUr.action) === "ACTIVATE_CONNECTION") {
          var _action$redirectionUr2, _action$redirectionUr3, _location;
          history.push(`${action === null || action === void 0 ? void 0 : (_action$redirectionUr2 = action.redirectionUrll) === null || _action$redirectionUr2 === void 0 ? void 0 : _action$redirectionUr2.pathname}`, JSON.stringify({
            data: action === null || action === void 0 ? void 0 : (_action$redirectionUr3 = action.redirectionUrll) === null || _action$redirectionUr3 === void 0 ? void 0 : _action$redirectionUr3.state,
            url: `${(_location = location) === null || _location === void 0 ? void 0 : _location.pathname}${location.search}`
          }));
        } else if ((action === null || action === void 0 ? void 0 : (_action$redirectionUr4 = action.redirectionUrll) === null || _action$redirectionUr4 === void 0 ? void 0 : _action$redirectionUr4.action) === "RE-SUBMIT-APPLICATION") {
          var _action$redirectionUr5, _action$redirectionUr6;
          history.push(`${action === null || action === void 0 ? void 0 : (_action$redirectionUr5 = action.redirectionUrll) === null || _action$redirectionUr5 === void 0 ? void 0 : _action$redirectionUr5.pathname}`, {
            data: action === null || action === void 0 ? void 0 : (_action$redirectionUr6 = action.redirectionUrll) === null || _action$redirectionUr6 === void 0 ? void 0 : _action$redirectionUr6.state
          });
        } else {
          var _action$redirectionUr7;
          window.location.assign(`${window.location.origin}/digit-ui/employee/payment/collect/${action === null || action === void 0 ? void 0 : (_action$redirectionUr7 = action.redirectionUrll) === null || _action$redirectionUr7 === void 0 ? void 0 : _action$redirectionUr7.pathname}`);
        }
      } else if (!(action !== null && action !== void 0 && action.redirectionUrl)) {
        setShowModal(true);
      } else {
        var _action$redirectionUr8, _action$redirectionUr9;
        history.push({
          pathname: (_action$redirectionUr8 = action.redirectionUrl) === null || _action$redirectionUr8 === void 0 ? void 0 : _action$redirectionUr8.pathname,
          state: {
            ...((_action$redirectionUr9 = action.redirectionUrl) === null || _action$redirectionUr9 === void 0 ? void 0 : _action$redirectionUr9.state)
          }
        });
      }
    }
    setSelectedAction(action);
    setDisplayMenu(false);
  }
  const queryClient = useQueryClient();
  const closeModal = () => {
    setSelectedAction(null);
    setShowModal(false);
  };
  const closeWarningPopup = () => {
    setWarningPopUp(false);
  };
  const submitAction = async (data, nocData = false, isOBPS = {}) => {
    setIsEnableLoader(true);
    if (typeof (data === null || data === void 0 ? void 0 : data.customFunctionToExecute) === "function") {
      data === null || data === void 0 ? void 0 : data.customFunctionToExecute({
        ...data
      });
    }
    if (nocData !== false && nocMutation) {
      const nocPrmomises = nocData === null || nocData === void 0 ? void 0 : nocData.map(noc => {
        return nocMutation === null || nocMutation === void 0 ? void 0 : nocMutation.mutateAsync(noc);
      });
      try {
        setIsEnableLoader(true);
        const values = await Promise.all(nocPrmomises);
        values && values.map(ob => {
          var _ob$Noc, _ob$Noc$;
          Digit.SessionStorage.del(ob === null || ob === void 0 ? void 0 : (_ob$Noc = ob.Noc) === null || _ob$Noc === void 0 ? void 0 : (_ob$Noc$ = _ob$Noc[0]) === null || _ob$Noc$ === void 0 ? void 0 : _ob$Noc$.nocType);
        });
      } catch (err) {
        var _err$response, _err$response$data, _err$response$data$Er, _err$response$data$Er2, _err$response2, _err$response2$data, _err$response2$data$E, _err$response2$data$E2, _err$response3, _err$response3$data, _err$response3$data$E, _err$response3$data$E2;
        setIsEnableLoader(false);
        let errorValue = err !== null && err !== void 0 && (_err$response = err.response) !== null && _err$response !== void 0 && (_err$response$data = _err$response.data) !== null && _err$response$data !== void 0 && (_err$response$data$Er = _err$response$data.Errors) !== null && _err$response$data$Er !== void 0 && (_err$response$data$Er2 = _err$response$data$Er[0]) !== null && _err$response$data$Er2 !== void 0 && _err$response$data$Er2.code ? t(err === null || err === void 0 ? void 0 : (_err$response2 = err.response) === null || _err$response2 === void 0 ? void 0 : (_err$response2$data = _err$response2.data) === null || _err$response2$data === void 0 ? void 0 : (_err$response2$data$E = _err$response2$data.Errors) === null || _err$response2$data$E === void 0 ? void 0 : (_err$response2$data$E2 = _err$response2$data$E[0]) === null || _err$response2$data$E2 === void 0 ? void 0 : _err$response2$data$E2.code) : (err === null || err === void 0 ? void 0 : (_err$response3 = err.response) === null || _err$response3 === void 0 ? void 0 : (_err$response3$data = _err$response3.data) === null || _err$response3$data === void 0 ? void 0 : (_err$response3$data$E = _err$response3$data.Errors) === null || _err$response3$data$E === void 0 ? void 0 : (_err$response3$data$E2 = _err$response3$data$E[0]) === null || _err$response3$data$E2 === void 0 ? void 0 : _err$response3$data$E2.message) || err;
        closeModal();
        setShowToast({
          key: "error",
          error: {
            message: errorValue
          }
        });
        setTimeout(closeToast, 5000);
        return;
      }
    }
    if (mutate) {
      setIsEnableLoader(true);
      mutate(data, {
        onError: (error, variables) => {
          setIsEnableLoader(false);
          setShowToast({
            key: "error",
            error
          });
          setTimeout(closeToast, 5000);
        },
        onSuccess: (data, variables) => {
          var _data$Amendments;
          sessionStorage.removeItem("WS_SESSION_APPLICATION_DETAILS");
          setIsEnableLoader(false);
          if (isOBPS !== null && isOBPS !== void 0 && isOBPS.bpa) {
            data.selectedAction = selectedAction;
            history.replace(`/digit-ui/employee/obps/response`, {
              data: data
            });
          }
          if (isOBPS !== null && isOBPS !== void 0 && isOBPS.isStakeholder) {
            data.selectedAction = selectedAction;
            history.push(`/digit-ui/employee/obps/stakeholder-response`, {
              data: data
            });
          }
          if (isOBPS !== null && isOBPS !== void 0 && isOBPS.isNoc) {
            history.push(`/digit-ui/employee/noc/response`, {
              data: data
            });
          }
          if ((data === null || data === void 0 ? void 0 : (_data$Amendments = data.Amendments) === null || _data$Amendments === void 0 ? void 0 : _data$Amendments.length) > 0) {
            var _variables$AmendmentU, _variables$AmendmentU2, _variables$AmendmentU3, _variables$AmendmentU4, _variables$AmendmentU5, _variables$AmendmentU6, _variables$AmendmentU7, _variables$AmendmentU8;
            if (variables !== null && variables !== void 0 && (_variables$AmendmentU = variables.AmendmentUpdate) !== null && _variables$AmendmentU !== void 0 && (_variables$AmendmentU2 = _variables$AmendmentU.workflow) !== null && _variables$AmendmentU2 !== void 0 && _variables$AmendmentU2.action.includes("SEND_BACK")) {
              setShowToast({
                key: "success",
                label: t("ES_MODIFYSWCONNECTION_SEND_BACK_UPDATE_SUCCESS")
              });
            } else if (variables !== null && variables !== void 0 && (_variables$AmendmentU3 = variables.AmendmentUpdate) !== null && _variables$AmendmentU3 !== void 0 && (_variables$AmendmentU4 = _variables$AmendmentU3.workflow) !== null && _variables$AmendmentU4 !== void 0 && _variables$AmendmentU4.action.includes("RE-SUBMIT")) {
              setShowToast({
                key: "success",
                label: t("ES_MODIFYSWCONNECTION_RE_SUBMIT_UPDATE_SUCCESS")
              });
            } else if (variables !== null && variables !== void 0 && (_variables$AmendmentU5 = variables.AmendmentUpdate) !== null && _variables$AmendmentU5 !== void 0 && (_variables$AmendmentU6 = _variables$AmendmentU5.workflow) !== null && _variables$AmendmentU6 !== void 0 && _variables$AmendmentU6.action.includes("APPROVE")) {
              setShowToast({
                key: "success",
                label: t("ES_MODIFYSWCONNECTION_APPROVE_UPDATE_SUCCESS")
              });
            } else if (variables !== null && variables !== void 0 && (_variables$AmendmentU7 = variables.AmendmentUpdate) !== null && _variables$AmendmentU7 !== void 0 && (_variables$AmendmentU8 = _variables$AmendmentU7.workflow) !== null && _variables$AmendmentU8 !== void 0 && _variables$AmendmentU8.action.includes("REJECT")) {
              setShowToast({
                key: "success",
                label: t("ES_MODIFYWSCONNECTION_REJECT_UPDATE_SUCCESS")
              });
            }
            return;
          }
          setShowToast({
            key: "success",
            action: selectedAction
          });
          clearDataDetails && setTimeout(clearDataDetails, 3000);
          setTimeout(closeToast, 5000);
          queryClient.clear();
          queryClient.refetchQueries("APPLICATION_SEARCH");
        }
      });
    }
    closeModal();
  };
  if (isLoading || isEnableLoader) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, !isLoading ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ApplicationDetailsContent, {
    applicationDetails: applicationDetails,
    workflowDetails: workflowDetails,
    isDataLoading: isDataLoading,
    applicationData: applicationData,
    businessService: businessService,
    timelineStatusPrefix: timelineStatusPrefix,
    statusAttribute: statusAttribute,
    paymentsList: paymentsList,
    showTimeLine: showTimeLine,
    oldValue: oldValue,
    isInfoLabel: isInfoLabel
  }), showModal ? /*#__PURE__*/React.createElement(ActionModal$6, {
    t: t,
    action: selectedAction,
    tenantId: tenantId,
    state: state,
    id: applicationNumber,
    applicationDetails: applicationDetails,
    applicationData: applicationDetails === null || applicationDetails === void 0 ? void 0 : applicationDetails.applicationData,
    closeModal: closeModal,
    submitAction: submitAction,
    actionData: workflowDetails === null || workflowDetails === void 0 ? void 0 : (_workflowDetails$data = workflowDetails.data) === null || _workflowDetails$data === void 0 ? void 0 : _workflowDetails$data.timeline,
    businessService: businessService,
    workflowDetails: workflowDetails,
    moduleCode: moduleCode
  }) : null, isWarningPop ? /*#__PURE__*/React.createElement(ApplicationDetailsWarningPopup, {
    action: selectedAction,
    workflowDetails: workflowDetails,
    businessService: businessService,
    isWarningPop: isWarningPop,
    closeWarningPopup: closeWarningPopup
  }) : null, /*#__PURE__*/React.createElement(ApplicationDetailsToast, {
    t: t,
    showToast: showToast,
    closeToast: closeToast,
    businessService: businessService
  }), /*#__PURE__*/React.createElement(ApplicationDetailsActionBar, {
    workflowDetails: workflowDetails,
    displayMenu: displayMenu,
    onActionSelect: onActionSelect,
    setDisplayMenu: setDisplayMenu,
    businessService: businessService,
    forcedActionPrefix: forcedActionPrefix,
    ActionBarStyle: ActionBarStyle,
    MenuStyle: MenuStyle
  })) : /*#__PURE__*/React.createElement(Loader, null));
};

const Heading$6 = ({
  t,
  heading
}) => {
  return /*#__PURE__*/React.createElement("h1", {
    className: "heading-m"
  }, `${t(heading)}`);
};
const Close$7 = () => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "#FFFFFF"
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0V0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
}));
const CloseBtn$7 = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "icon-bg-secondary",
    onClick: props.onClick
  }, /*#__PURE__*/React.createElement(Close$7, null));
};
const ConfirmationQuestion = ({
  t,
  title
}) => /*#__PURE__*/React.createElement("div", {
  className: "confirmation_box"
}, /*#__PURE__*/React.createElement("span", null, " ", `${t('CONFIRM_DELETE_MSG')} `, " ", /*#__PURE__*/React.createElement("b", null, ` ${title}`), " "));
const Confirmation = ({
  t,
  heading,
  docName,
  closeModal,
  actionCancelLabel,
  actionCancelOnSubmit,
  actionSaveLabel,
  actionSaveOnSubmit
}) => {
  return /*#__PURE__*/React.createElement(Modal, {
    headerBarMain: /*#__PURE__*/React.createElement(Heading$6, {
      t: t,
      heading: heading
    }),
    headerBarEnd: /*#__PURE__*/React.createElement(CloseBtn$7, {
      onClick: closeModal
    }),
    actionCancelLabel: t(actionCancelLabel),
    actionCancelOnSubmit: actionCancelOnSubmit,
    actionSaveLabel: t(actionSaveLabel),
    actionSaveOnSubmit: actionSaveOnSubmit,
    formId: "modal-action"
  }, /*#__PURE__*/React.createElement(ConfirmationQuestion, {
    t: t,
    title: docName
  }));
};

const renderMultipleDocuments = documents => {
  let isMobile = window.Digit.Utils.browser.isMobile();
  if (!documents && !documents.length) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '40px' : '100px'
    }
  }, documents.map(({
    fileStoreId,
    fileName
  }) => /*#__PURE__*/React.createElement("div", {
    className: "documentDetails_pdf"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100px'
    },
    onClick: () => openUploadedDocument(fileStoreId, fileName)
  }, /*#__PURE__*/React.createElement(GenericFileIcon, null), /*#__PURE__*/React.createElement("span", {
    className: "cell-text"
  }, fileName === null || fileName === void 0 ? void 0 : fileName.split(10))))));
};
const Actions = ['EDIT', 'DELETE'];
const getUlbName = tenantId => {
  var _ulbName, _ulbName$, _ulbName2;
  let ulbName = tenantId === null || tenantId === void 0 ? void 0 : tenantId.split('.')[1];
  ulbName = `${(_ulbName = ulbName) === null || _ulbName === void 0 ? void 0 : (_ulbName$ = _ulbName[0]) === null || _ulbName$ === void 0 ? void 0 : _ulbName$.toUpperCase()}${(_ulbName2 = ulbName) === null || _ulbName2 === void 0 ? void 0 : _ulbName2.slice(1)} `;
  return ulbName;
};
const DocumentDetails = () => {
  var _data$applicationData, _data$applicationData2, _data$applicationData3, _data$applicationData4, _data$applicationData5, _data$applicationData6, _data$applicationData7, _data$applicationData8, _data$applicationData9, _data$applicationData10, _data$applicationData11, _data$applicationData12, _data$applicationData13, _data$applicationData14, _data$applicationData15, _data$applicationData16, _data$applicationData17, _data$applicationData18;
  let isMobile = window.Digit.Utils.browser.isMobile();
  const {
    id
  } = useParams();
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(false);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const {
    isLoading,
    data
  } = Digit.Hooks.events.useEventDetails(tenantId, {
    ids: id
  }, {});
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("EMPLOYEE_MSG_MUTATION_HAPPENED", false);
  const [errorInfo, setErrorInfo, clearError] = Digit.Hooks.useSessionStorage("EMPLOYEE_MSG_ERROR_DATA", false);
  const [successData, setsuccessData, clearSuccessData] = Digit.Hooks.useSessionStorage("EMPLOYEE_MSG_MUTATION_SUCCESS_DATA", false);
  useEffect(() => {
    setMutationHappened(false);
    clearSuccessData();
    clearError();
  }, []);
  function onActionSelect(action) {
    if (action === "EDIT") {
      history.push(`/digit-ui/employee/engagement/messages/inbox/edit/${id}`);
    }
    if (action === "DELETE") {
      setShowModal(true);
    }
    setDisplayMenu(false);
  }
  const handleDelete = () => {
    const finalData = (({
      uploadedFilesData,
      ...ogData
    }) => ogData)(data === null || data === void 0 ? void 0 : data.applicationData);
    const details = {
      events: [{
        ...finalData,
        status: "CANCELLED"
      }]
    };
    history.push("/digit-ui/employee/engagement/messages/response?delete=true", details);
  };
  function onModalCancel() {
    setShowModal(false);
  }
  if (isLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return /*#__PURE__*/React.createElement("div", null, showModal ? /*#__PURE__*/React.createElement(Confirmation, {
    t: t,
    heading: 'CONFIRM_DELETE_PUB_BRCST',
    docName: data === null || data === void 0 ? void 0 : (_data$applicationData = data.applicationData) === null || _data$applicationData === void 0 ? void 0 : _data$applicationData.name,
    closeModal: () => setShowModal(!showModal),
    actionCancelLabel: 'CS_COMMON_CANCEL',
    actionCancelOnSubmit: onModalCancel,
    actionSaveLabel: 'ES_COMMON_Y_DEL',
    actionSaveOnSubmit: handleDelete
  }) : null, /*#__PURE__*/React.createElement(Header, null, t(`CS_HEADER_PUBLIC_BRDCST`)), /*#__PURE__*/React.createElement("div", {
    className: "notice_and_circular_main gap-ten"
  }, /*#__PURE__*/React.createElement("div", {
    className: "documentDetails_wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "documentDetails_row_items"
  }, /*#__PURE__*/React.createElement("p", {
    className: "documentDetails_title"
  }, `${t("EVENTS_ULB_LABEL")}:`), " ", /*#__PURE__*/React.createElement("p", null, getUlbName(data === null || data === void 0 ? void 0 : data.tenantId)), " "), /*#__PURE__*/React.createElement("div", {
    className: "documentDetails_row_items"
  }, /*#__PURE__*/React.createElement("p", {
    className: "documentDetails_title"
  }, `${t("PUBLIC_BRDCST_TITLE_LABEL")}:`), " ", /*#__PURE__*/React.createElement("p", null, data === null || data === void 0 ? void 0 : (_data$applicationData2 = data.applicationData) === null || _data$applicationData2 === void 0 ? void 0 : _data$applicationData2.name), " "), /*#__PURE__*/React.createElement("div", {
    className: "documentDetails_row_items"
  }, /*#__PURE__*/React.createElement("p", {
    className: "documentDetails_title"
  }, `${t("EVENTS_COMMENTS_LABEL")}:`), " ", /*#__PURE__*/React.createElement("p", {
    className: "documentDetails__description"
  }, data !== null && data !== void 0 && (_data$applicationData3 = data.applicationData) !== null && _data$applicationData3 !== void 0 && (_data$applicationData4 = _data$applicationData3.description) !== null && _data$applicationData4 !== void 0 && _data$applicationData4.length ? data === null || data === void 0 ? void 0 : (_data$applicationData5 = data.applicationData) === null || _data$applicationData5 === void 0 ? void 0 : _data$applicationData5.description : 'NA'), " "), /*#__PURE__*/React.createElement("div", {
    className: "documentDetails_row_items"
  }, /*#__PURE__*/React.createElement("p", {
    className: "documentDetails_title"
  }, `${t("EVENTS_FROM_DATE_LABEL")}:`), " ", /*#__PURE__*/React.createElement("p", null, data !== null && data !== void 0 && (_data$applicationData6 = data.applicationData) !== null && _data$applicationData6 !== void 0 && (_data$applicationData7 = _data$applicationData6.eventDetails) !== null && _data$applicationData7 !== void 0 && _data$applicationData7.fromDate ? format(new Date(data === null || data === void 0 ? void 0 : (_data$applicationData8 = data.applicationData) === null || _data$applicationData8 === void 0 ? void 0 : (_data$applicationData9 = _data$applicationData8.eventDetails) === null || _data$applicationData9 === void 0 ? void 0 : _data$applicationData9.fromDate), 'dd/MM/yyyy') : null), " "), /*#__PURE__*/React.createElement("div", {
    className: "documentDetails_row_items"
  }, /*#__PURE__*/React.createElement("p", {
    className: "documentDetails_title"
  }, `${t("EVENTS_TO_DATE_LABEL")}:`), " ", /*#__PURE__*/React.createElement("p", null, data !== null && data !== void 0 && (_data$applicationData10 = data.applicationData) !== null && _data$applicationData10 !== void 0 && (_data$applicationData11 = _data$applicationData10.eventDetails) !== null && _data$applicationData11 !== void 0 && _data$applicationData11.toDate ? format(new Date(data === null || data === void 0 ? void 0 : (_data$applicationData12 = data.applicationData) === null || _data$applicationData12 === void 0 ? void 0 : (_data$applicationData13 = _data$applicationData12.eventDetails) === null || _data$applicationData13 === void 0 ? void 0 : _data$applicationData13.toDate), 'dd/MM/yyyy') : null), " "), /*#__PURE__*/React.createElement("span", {
    className: "documentDetails_subheader"
  }, `${t('CS_COMMON_DOCUMENTS')}`), data !== null && data !== void 0 && (_data$applicationData14 = data.applicationData) !== null && _data$applicationData14 !== void 0 && (_data$applicationData15 = _data$applicationData14.eventDetails) !== null && _data$applicationData15 !== void 0 && (_data$applicationData16 = _data$applicationData15.documents) !== null && _data$applicationData16 !== void 0 && _data$applicationData16.length ? renderMultipleDocuments(data === null || data === void 0 ? void 0 : (_data$applicationData17 = data.applicationData) === null || _data$applicationData17 === void 0 ? void 0 : (_data$applicationData18 = _data$applicationData17.eventDetails) === null || _data$applicationData18 === void 0 ? void 0 : _data$applicationData18.documents) : "NA")), /*#__PURE__*/React.createElement(ActionBar, null, displayMenu ? /*#__PURE__*/React.createElement(Menu, {
    style: {
      width: isMobile ? 'full' : '240px'
    },
    localeKeyPrefix: "ES_CE",
    options: Actions,
    t: t,
    onSelect: onActionSelect
  }) : null, /*#__PURE__*/React.createElement(SubmitBar, {
    label: t("ES_COMMON_TAKE_ACTION"),
    onSubmit: () => setDisplayMenu(!displayMenu)
  })));
};

const Messages = ({
  match: {
    path
  } = {},
  tenants,
  parentRoute
}) => {
  return /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/create`,
    component: props => /*#__PURE__*/React.createElement(NewEvents$1, props)
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/inbox/create`,
    component: props => /*#__PURE__*/React.createElement(NewEvents$1, props)
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/inbox/details/:id`,
    component: props => /*#__PURE__*/React.createElement(DocumentDetails, props)
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/inbox/edit/:id`,
    component: props => /*#__PURE__*/React.createElement(EditMessage, props)
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/inbox`,
    component: props => /*#__PURE__*/React.createElement(Inbox$1, Object.assign({}, props, {
      tenants: tenants,
      parentRoute: parentRoute
    }))
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/response`,
    component: props => /*#__PURE__*/React.createElement(Response$1, props)
  }));
};

const EventForm = ({
  onSelect,
  config,
  formData,
  register,
  control,
  errors
}) => {
  var _errors$name, _errors$name2, _data$mseva, _data$mseva$EventCate;
  const {
    t
  } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const state = tenantId === null || tenantId === void 0 ? void 0 : tenantId.split('.')[0];
  const ulbs = Digit.SessionStorage.get("ENGAGEMENT_TENANTS");
  const userInfo = Digit.UserService.getUser().info;
  const userUlbs = ulbs.filter(ulb => {
    var _userInfo$roles;
    return userInfo === null || userInfo === void 0 ? void 0 : (_userInfo$roles = userInfo.roles) === null || _userInfo$roles === void 0 ? void 0 : _userInfo$roles.some(role => (role === null || role === void 0 ? void 0 : role.tenantId) === (ulb === null || ulb === void 0 ? void 0 : ulb.code));
  }).sort(alphabeticalSortFunctionForTenantsBasedOnName);
  const getDefaultUlb = () => {
    if (formData !== null && formData !== void 0 && formData.defaultTenantId) {
      return ulbs === null || ulbs === void 0 ? void 0 : ulbs.find(ulb => (ulb === null || ulb === void 0 ? void 0 : ulb.code) === (formData === null || formData === void 0 ? void 0 : formData.defaultTenantId));
    }
    if (tenantId) {
      return ulbs === null || ulbs === void 0 ? void 0 : ulbs.find(ulb => (ulb === null || ulb === void 0 ? void 0 : ulb.code) === tenantId);
    }
    return (userUlbs === null || userUlbs === void 0 ? void 0 : userUlbs.length) === 1 ? userUlbs === null || userUlbs === void 0 ? void 0 : userUlbs[0] : null;
  };
  const {
    isLoading,
    data
  } = Digit.Hooks.useCommonMDMS(state, "mseva", ["EventCategories"]);
  const location = useLocation();
  const isInEditFormMode = useMemo(() => {
    if (location.pathname.includes('/engagement/event/edit-event')) return true;
    return false;
  }, [location.pathname]);
  if (isLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(LabelFieldPair, null, /*#__PURE__*/React.createElement(CardLabel, {
    className: "card-label-smaller"
  }, `${t(`EVENTS_ULB_LABEL`)} *`), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement(Controller, {
    control: control,
    defaultValue: getDefaultUlb(),
    name: "tenantId",
    rules: {
      required: true
    },
    render: ({
      onChange,
      value
    }) => /*#__PURE__*/React.createElement(Dropdown, {
      option: userUlbs,
      selected: value,
      disable: isInEditFormMode ? true : (userUlbs === null || userUlbs === void 0 ? void 0 : userUlbs.length) === 1,
      optionKey: "code",
      t: t,
      select: onChange
    })
  }), errors && errors['tenantId'] && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_TENANT_ERROR_REQUIRED`)))), /*#__PURE__*/React.createElement(LabelFieldPair, null, /*#__PURE__*/React.createElement(CardLabel, {
    className: "card-label-smaller"
  }, `${t(`EVENTS_NAME_LABEL`)} *`), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement(Controller, {
    defaultValue: formData === null || formData === void 0 ? void 0 : formData.name,
    render: ({
      onChange,
      ref,
      value
    }) => /*#__PURE__*/React.createElement(TextInput, {
      value: value,
      type: "text",
      name: "name",
      onChange: onChange,
      inputRef: ref
    }),
    name: "name",
    rules: {
      required: true,
      maxLength: 66
    },
    control: control
  }), errors && (errors === null || errors === void 0 ? void 0 : errors.name) && (errors === null || errors === void 0 ? void 0 : (_errors$name = errors.name) === null || _errors$name === void 0 ? void 0 : _errors$name.type) === "required" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_COMMENTS_ERROR_REQUIRED`)), errors && (errors === null || errors === void 0 ? void 0 : errors.name) && (errors === null || errors === void 0 ? void 0 : (_errors$name2 = errors.name) === null || _errors$name2 === void 0 ? void 0 : _errors$name2.type) === "maxLength" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_MAXLENGTH_66_CHARS_REACHED`)))), /*#__PURE__*/React.createElement(LabelFieldPair, null, /*#__PURE__*/React.createElement(CardLabel, {
    className: "card-label-smaller"
  }, `${t(`EVENTS_CATEGORY_LABEL`)} *`), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement(Controller, {
    name: "eventCategory",
    control: control,
    defaultValue: formData !== null && formData !== void 0 && formData.category ? data === null || data === void 0 ? void 0 : (_data$mseva = data.mseva) === null || _data$mseva === void 0 ? void 0 : (_data$mseva$EventCate = _data$mseva.EventCategories.filter(category => category.code === (formData === null || formData === void 0 ? void 0 : formData.category))) === null || _data$mseva$EventCate === void 0 ? void 0 : _data$mseva$EventCate[0] : null,
    rules: {
      required: true
    },
    render: ({
      onChange,
      ref,
      value
    }) => {
      var _data$mseva2;
      return /*#__PURE__*/React.createElement(Dropdown, {
        inputRef: ref,
        option: data === null || data === void 0 ? void 0 : (_data$mseva2 = data.mseva) === null || _data$mseva2 === void 0 ? void 0 : _data$mseva2.EventCategories,
        optionKey: "code",
        t: t,
        select: onChange,
        selected: value
      });
    }
  }), errors && errors['eventCategory'] && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_CATEGORY_ERROR_REQUIRED`)))));
};

const allowedFileTypes = /(.*?)(jpg|jpeg|png|image|pdf|msword|openxmlformats-officedocument)$/i;
const MessageForm = ({
  onSelect,
  config,
  formData,
  register,
  control,
  errors,
  setError
}) => {
  var _errors$name, _errors$name2, _data$mseva, _data$mseva$EventCate, _errors$description, _errors$description2, _errors$fromDate, _errors$fromDate2, _errors$toDate, _errors$toDate2;
  const {
    t
  } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const state = tenantId === null || tenantId === void 0 ? void 0 : tenantId.split('.')[0];
  const ulbs = Digit.SessionStorage.get("ENGAGEMENT_TENANTS");
  const {
    isLoading,
    data
  } = Digit.Hooks.useCommonMDMS(state, "mseva", ["EventCategories"]);
  const stateId = Digit.ULBService.getStateId();
  const userUlbs = ulbs.filter(ulb => (ulb === null || ulb === void 0 ? void 0 : ulb.code) === tenantId);
  const isValidFromDate = date => {
    const fromDate = convertDateToMaximumPossibleValue(new Date(`${formData === null || formData === void 0 ? void 0 : formData.fromDate}`));
    const todaysDate = new Date();
    if (!isValid(fromDate)) return false;
    if (fromDate.getTime() < todaysDate.getTime()) {
      setError('fromDate', {
        type: 'isValidFromDate'
      }, {
        shouldFocus: true
      });
      return false;
    }
    return true;
  };
  const isValidToDate = date => {
    const fromDate = convertDateToMaximumPossibleValue(new Date(`${formData === null || formData === void 0 ? void 0 : formData.fromDate}`));
    const toDate = convertDateToMaximumPossibleValue(new Date(`${formData === null || formData === void 0 ? void 0 : formData.toDate}`));
    const todaysDate = new Date();
    if (!isValid(toDate)) return false;
    if (toDate.getTime() < todaysDate.getTime() || toDate.getTime() < fromDate.getTime()) {
      setError('toDate', {
        type: 'isValidToDate'
      }, {
        shouldFocus: true
      });
      return false;
    }
    return true;
  };
  if (isLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(LabelFieldPair, null, /*#__PURE__*/React.createElement(CardLabel, {
    className: "card-label-smaller"
  }, `${t(`EVENTS_ULB_LABEL`)} *`), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement(Controller, {
    control: control,
    defaultValue: (userUlbs === null || userUlbs === void 0 ? void 0 : userUlbs.length) === 1 ? userUlbs === null || userUlbs === void 0 ? void 0 : userUlbs[0] : null,
    name: "tenantId",
    rules: {
      required: true
    },
    render: ({
      onChange,
      value
    }) => /*#__PURE__*/React.createElement(Dropdown, {
      option: userUlbs,
      selected: value,
      disable: (userUlbs === null || userUlbs === void 0 ? void 0 : userUlbs.length) === 1,
      optionKey: "code",
      t: t,
      select: onChange
    })
  }), errors && errors['tenantId'] && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_TENANT_ERROR_REQUIRED`)))), /*#__PURE__*/React.createElement(LabelFieldPair, null, /*#__PURE__*/React.createElement(CardLabel, {
    className: "card-label-smaller"
  }, `${t(`PUBLIC_BRDCST_TITLE_LABEL`)} *`), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement(Controller, {
    defaultValue: formData === null || formData === void 0 ? void 0 : formData.name,
    render: ({
      onChange,
      ref,
      value
    }) => /*#__PURE__*/React.createElement(TextInput, {
      value: value,
      type: "text",
      name: "name",
      onChange: onChange,
      inputRef: ref
    }),
    name: "name",
    rules: {
      required: true,
      maxLength: 66
    },
    control: control
  }), errors && (errors === null || errors === void 0 ? void 0 : errors.name) && (errors === null || errors === void 0 ? void 0 : (_errors$name = errors.name) === null || _errors$name === void 0 ? void 0 : _errors$name.type) === "required" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_COMMENTS_ERROR_REQUIRED`)), errors && (errors === null || errors === void 0 ? void 0 : errors.name) && (errors === null || errors === void 0 ? void 0 : (_errors$name2 = errors.name) === null || _errors$name2 === void 0 ? void 0 : _errors$name2.type) === "maxLength" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_MAXLENGTH_66_CHARS_REACHED`)))), /*#__PURE__*/React.createElement(LabelFieldPair, {
    style: {
      marginBottom: "24px"
    }
  }, /*#__PURE__*/React.createElement(CardLabel, {
    className: "card-label-smaller"
  }, `${t(`EVENTS_COMMENTS_LABEL`)} *`), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement(Controller, {
    name: "description",
    control: control,
    defaultValue: formData !== null && formData !== void 0 && formData.category ? data === null || data === void 0 ? void 0 : (_data$mseva = data.mseva) === null || _data$mseva === void 0 ? void 0 : (_data$mseva$EventCate = _data$mseva.EventCategories.filter(category => category.code === (formData === null || formData === void 0 ? void 0 : formData.category))) === null || _data$mseva$EventCate === void 0 ? void 0 : _data$mseva$EventCate[0] : null,
    rules: {
      required: true,
      maxLength: 500
    },
    render: ({
      onChange,
      ref,
      value
    }) => /*#__PURE__*/React.createElement(TextArea, {
      inputRef: ref,
      value: value,
      name: "description",
      onChange: onChange,
      hintText: t('PUBLIC_BRDCST_MSG_LENGTH')
    })
  }), errors && (errors === null || errors === void 0 ? void 0 : errors.description) && (errors === null || errors === void 0 ? void 0 : (_errors$description = errors.description) === null || _errors$description === void 0 ? void 0 : _errors$description.type) === "required" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_COMMENTS_ERROR_REQUIRED`)), errors && (errors === null || errors === void 0 ? void 0 : errors.description) && (errors === null || errors === void 0 ? void 0 : (_errors$description2 = errors.description) === null || _errors$description2 === void 0 ? void 0 : _errors$description2.type) === "maxLength" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_MAXLENGTH_REACHED`)))), /*#__PURE__*/React.createElement(LabelFieldPair, {
    style: {
      marginBottom: "24px"
    }
  }, /*#__PURE__*/React.createElement(CardLabel, {
    className: "card-label-smaller"
  }, `${t(`EVENTS_ATTACHMENT_LABEL`)}`), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement(Controller, {
    name: "documents",
    control: control,
    rules: {
      required: false
    },
    render: ({
      onChange,
      ref,
      value: _value = []
    }) => {
      function getFileStoreData(filesData) {
        const numberOfFiles = filesData.length;
        let finalDocumentData = [];
        if (numberOfFiles > 0) {
          filesData.forEach(value => {
            var _value$, _value$$fileStoreId, _value$2, _value$2$file;
            finalDocumentData.push({
              fileName: value === null || value === void 0 ? void 0 : value[0],
              fileStoreId: value === null || value === void 0 ? void 0 : (_value$ = value[1]) === null || _value$ === void 0 ? void 0 : (_value$$fileStoreId = _value$.fileStoreId) === null || _value$$fileStoreId === void 0 ? void 0 : _value$$fileStoreId.fileStoreId,
              documentType: value === null || value === void 0 ? void 0 : (_value$2 = value[1]) === null || _value$2 === void 0 ? void 0 : (_value$2$file = _value$2.file) === null || _value$2$file === void 0 ? void 0 : _value$2$file.type
            });
          });
        }
        onChange(finalDocumentData);
      }
      return /*#__PURE__*/React.createElement(MultiUploadWrapper, {
        t: t,
        module: "engagement",
        tenantId: stateId,
        getFormState: getFileStoreData,
        showHintBelow: true,
        setuploadedstate: _value,
        allowedFileTypesRegex: allowedFileTypes,
        allowedMaxSizeInMB: 5,
        hintText: t("DOCUMENTS_ATTACH_RESTRICTIONS_SIZE")
      });
    }
  }))), /*#__PURE__*/React.createElement(LabelFieldPair, null, /*#__PURE__*/React.createElement(CardLabel, {
    className: "card-label-smaller"
  }, `${t(`PUBLIC_BRDCST_FROM_DATE_LABEL`)} *`), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement(Controller, {
    control: control,
    name: "fromDate",
    defaultValue: formData === null || formData === void 0 ? void 0 : formData.fromDate,
    rules: {
      required: true,
      validate: {
        isValidFromDate
      }
    },
    render: ({
      onChange,
      value
    }) => /*#__PURE__*/React.createElement(TextInput, {
      type: "date",
      isRequired: true,
      onChange: onChange,
      defaultValue: value
    })
  }), errors && (errors === null || errors === void 0 ? void 0 : errors.fromDate) && (errors === null || errors === void 0 ? void 0 : (_errors$fromDate = errors.fromDate) === null || _errors$fromDate === void 0 ? void 0 : _errors$fromDate.type) === "required" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_FROM_DATE_ERROR_REQUIRED`)), errors && (errors === null || errors === void 0 ? void 0 : errors.fromDate) && (errors === null || errors === void 0 ? void 0 : (_errors$fromDate2 = errors.fromDate) === null || _errors$fromDate2 === void 0 ? void 0 : _errors$fromDate2.type) === "isValidFromDate" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_FROM_DATE_ERROR_INVALID`)))), /*#__PURE__*/React.createElement(LabelFieldPair, null, /*#__PURE__*/React.createElement(CardLabel, {
    className: "card-label-smaller"
  }, `${t(`PUBLIC_BRDCST_TO_DATE_LABEL`)} *`), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement(Controller, {
    control: control,
    name: "toDate",
    defaultValue: formData === null || formData === void 0 ? void 0 : formData.toDate,
    rules: {
      required: true,
      validate: {
        isValidToDate
      }
    },
    render: ({
      onChange,
      value
    }) => /*#__PURE__*/React.createElement(TextInput, {
      type: "date",
      isRequired: true,
      onChange: onChange,
      defaultValue: value
    })
  }), errors && (errors === null || errors === void 0 ? void 0 : errors.toDate) && (errors === null || errors === void 0 ? void 0 : (_errors$toDate = errors.toDate) === null || _errors$toDate === void 0 ? void 0 : _errors$toDate.type) === "required" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_TO_DATE_ERROR_REQUIRED`)), errors && (errors === null || errors === void 0 ? void 0 : errors.toDate) && (errors === null || errors === void 0 ? void 0 : (_errors$toDate2 = errors.toDate) === null || _errors$toDate2 === void 0 ? void 0 : _errors$toDate2.type) === "isValidToDate" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_TO_DATE_ERROR_INVALID`)))));
};

const SelectGeolocation = ({
  onSelect,
  config,
  formData
}) => {
  var _formData$geoLocation, _formData$geoLocation2;
  const {
    t
  } = useTranslation();
  const onChange = (pincode, position) => {
    onSelect(config === null || config === void 0 ? void 0 : config.key, position);
  };
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(LabelFieldPair, null, /*#__PURE__*/React.createElement(CardLabel, {
    className: "card-label-smaller"
  }, `${t(`EVENTS_GEOLOCATION_LABEL`)}`), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement(LocationSearch, {
    position: {
      latitude: formData === null || formData === void 0 ? void 0 : (_formData$geoLocation = formData.geoLocation) === null || _formData$geoLocation === void 0 ? void 0 : _formData$geoLocation.latitude,
      longitude: formData === null || formData === void 0 ? void 0 : (_formData$geoLocation2 = formData.geoLocation) === null || _formData$geoLocation2 === void 0 ? void 0 : _formData$geoLocation2.longitude
    },
    onChange: onChange
  }))));
};

const SelectToDate = ({
  onSelect,
  config,
  formData,
  register,
  control,
  errors,
  setError
}) => {
  var _errors$toDate, _errors$toDate2;
  const {
    t
  } = useTranslation();
  const isValidDate = date => {
    if (!isValid(new Date(formData === null || formData === void 0 ? void 0 : formData.fromDate)) || !isValid(new Date(date))) return false;
    if (new Date(`${formData === null || formData === void 0 ? void 0 : formData.fromDate} ${formData === null || formData === void 0 ? void 0 : formData.fromTime}`) < new Date()) {
      setError('fromDate', {
        type: 'isValidFromDate'
      }, {
        shouldFocus: true
      });
      return false;
    }
    if (new Date(`${date} ${formData === null || formData === void 0 ? void 0 : formData.toTime}`) < new Date()) return false;
    return new Date(`${formData === null || formData === void 0 ? void 0 : formData.fromDate} ${formData === null || formData === void 0 ? void 0 : formData.fromTime}`) <= new Date(`${date} ${formData === null || formData === void 0 ? void 0 : formData.toTime}`);
  };
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(LabelFieldPair, null, /*#__PURE__*/React.createElement(CardLabel, {
    className: "card-label-smaller"
  }, `${t(`EVENTS_TO_DATE_LABEL`)} *`), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement(Controller, {
    control: control,
    name: "toDate",
    defaultValue: formData === null || formData === void 0 ? void 0 : formData.toDate,
    rules: {
      required: true,
      validate: {
        isValidDate: isValidDate
      }
    },
    render: ({
      onChange,
      value
    }) => /*#__PURE__*/React.createElement(TextInput, {
      type: "date",
      isRequired: true,
      onChange: onChange,
      defaultValue: value
    })
  }), errors && (errors === null || errors === void 0 ? void 0 : errors.toDate) && (errors === null || errors === void 0 ? void 0 : (_errors$toDate = errors.toDate) === null || _errors$toDate === void 0 ? void 0 : _errors$toDate.type) === "required" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_TO_DATE_ERROR_REQUIRED`)), errors && (errors === null || errors === void 0 ? void 0 : errors.toDate) && (errors === null || errors === void 0 ? void 0 : (_errors$toDate2 = errors.toDate) === null || _errors$toDate2 === void 0 ? void 0 : _errors$toDate2.type) === "isValidDate" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_TO_DATE_ERROR_INVALID`)))));
};

const renderSingleViewAndDownloadButton = (t, documents) => {
  if (!(documents !== null && documents !== void 0 && documents.length)) return null;
  const {
    fileStoreId,
    fileName
  } = documents === null || documents === void 0 ? void 0 : documents[0];
  return /*#__PURE__*/React.createElement("div", {
    className: "display-flex-gap-2"
  }, fileStoreId && fileStoreId.length ? /*#__PURE__*/React.createElement("span", {
    className: "link",
    onClick: () => openUploadedDocument(fileStoreId, fileName)
  }, " ", t("CE_DOCUMENT_VIEW_LINK"), " ") : null, fileStoreId && fileStoreId.length ? /*#__PURE__*/React.createElement("span", {
    className: "link",
    onClick: () => downloadDocument(fileStoreId)
  }, " ", t("CE_DOCUMENT_DOWNLOAD_LINK"), " ") : null);
};
const renderMultipleViewAndDownloadButtons = (t, documents) => {
  if (!documents.length) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "broadcastnotifications_actionswrapper-multi"
  }, documents.map(({
    fileName,
    fileStoreId
  }, index) => {
    return /*#__PURE__*/React.createElement("div", {
      className: "display-flex-gap-2"
    }, fileName.length ? /*#__PURE__*/React.createElement("p", null, fileName, " : ") : null, fileStoreId.length ? /*#__PURE__*/React.createElement("span", {
      className: "link",
      onClick: () => openUploadedDocument(fileStoreId, fileName)
    }, " ", t("CE_DOCUMENT_VIEW_LINK"), " ") : null, fileStoreId.length ? /*#__PURE__*/React.createElement("span", {
      className: "link",
      onClick: () => downloadDocument(fileStoreId)
    }, " ", t("CE_DOCUMENT_DOWNLOAD_LINK"), " ") : null);
  }));
};
const BroadcastWhatsNewCard = ({
  header,
  actions,
  eventNotificationText,
  timePastAfterEventCreation,
  timeApproxiamationInUnits,
  ...props
}) => {
  const {
    t
  } = useTranslation();
  const uploadedDocuments = props.eventDetails.documents;
  const getTransformedLocale = label => {
    if (typeof label === "number") return label;
    return label && label.toUpperCase().replace(/[.:-\s\/]/g, "_");
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "WhatsNewCard"
  }, /*#__PURE__*/React.createElement("h2", null, t(header)), /*#__PURE__*/React.createElement("p", null, eventNotificationText), actions === null || actions === void 0 ? void 0 : actions.map(i => /*#__PURE__*/React.createElement("a", {
    href: i === null || i === void 0 ? void 0 : i.actionUrl
  }, `${t(`CS_COMMON_${getTransformedLocale(i === null || i === void 0 ? void 0 : i.code)}`)}`)), (uploadedDocuments === null || uploadedDocuments === void 0 ? void 0 : uploadedDocuments.length) > 1 ? renderMultipleViewAndDownloadButtons(t, uploadedDocuments) : renderSingleViewAndDownloadButton(t, uploadedDocuments), /*#__PURE__*/React.createElement("p", null, timePastAfterEventCreation + ` ${t(timeApproxiamationInUnits)}`));
};

const NotificationsAndWhatsNew = ({
  variant,
  parentRoute
}) => {
  var _Digit$UserService, _Digit$UserService$ge;
  const {
    t
  } = useTranslation();
  const location = useLocation();
  const history = useHistory();
  const tenantId = Digit.ULBService.getCitizenCurrentTenant();
  const {
    data: {
      unreadCount: preVisitUnseenNotificationCount
    } = {},
    isSuccess: preVisitUnseenNotificationCountLoaded,
    refetch
  } = Digit.Hooks.useNotificationCount({
    tenantId,
    config: {
      enabled: !!((_Digit$UserService = Digit.UserService) !== null && _Digit$UserService !== void 0 && (_Digit$UserService$ge = _Digit$UserService.getUser()) !== null && _Digit$UserService$ge !== void 0 && _Digit$UserService$ge.access_token)
    }
  });
  const {
    mutate,
    isSuccess
  } = Digit.Hooks.useClearNotifications();
  useEffect(() => {
    isSuccess ? refetch() : false;
  }, [isSuccess]);
  useEffect(() => preVisitUnseenNotificationCount && tenantId ? mutate({
    tenantId
  }) : null, [tenantId, preVisitUnseenNotificationCount]);
  const {
    data: EventsData,
    isLoading: EventsDataLoading
  } = Digit.Hooks.useEvents({
    tenantId,
    variant
  });
  if (EventsDataLoading) return /*#__PURE__*/React.createElement(Loader, null);
  if ((EventsData === null || EventsData === void 0 ? void 0 : EventsData.length) === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "CitizenEngagementNotificationWrapper"
    }, /*#__PURE__*/React.createElement(Header, null, `${t("CS_HEADER_NOTIFICATIONS")}`), /*#__PURE__*/React.createElement("h1", null, "Nothing to show"));
  }
  const VariantWiseRender = () => {
    switch (variant) {
      case "notifications":
        return /*#__PURE__*/React.createElement(Header, null, `${t("CS_HEADER_NOTIFICATIONS")} ${preVisitUnseenNotificationCount ? `(${preVisitUnseenNotificationCount})` : ""}`);
      case "whats-new":
        return /*#__PURE__*/React.createElement(Header, null, t("CS_HEADER_WHATSNEW"));
      default:
        return /*#__PURE__*/React.createElement(Redirect$1, {
          to: {
            pathname: `/digit-ui/citizen`,
            state: {
              from: location.pathname + location.search
            }
          }
        });
    }
  };
  function onEventCardClick(id) {
    history.push(parentRoute + "/events/details/" + id);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "CitizenEngagementNotificationWrapper"
  }, /*#__PURE__*/React.createElement(VariantWiseRender, null), EventsData !== null && EventsData !== void 0 && EventsData.length ? EventsData.map(DataParamsInEvent => (DataParamsInEvent === null || DataParamsInEvent === void 0 ? void 0 : DataParamsInEvent.eventType) === "EVENTSONGROUND" ? /*#__PURE__*/React.createElement(OnGroundEventCard, Object.assign({
    onClick: onEventCardClick
  }, DataParamsInEvent)) : (DataParamsInEvent === null || DataParamsInEvent === void 0 ? void 0 : DataParamsInEvent.eventType) === "BROADCAST" ? /*#__PURE__*/React.createElement(BroadcastWhatsNewCard, DataParamsInEvent) : /*#__PURE__*/React.createElement(WhatsNewCard, DataParamsInEvent)) : /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardCaption, null, t("COMMON_INBOX_NO_DATA"))));
};

const EventsListOnGround = ({
  variant,
  parentRoute
}) => {
  var _Digit$UserService, _Digit$UserService$ge, _Digit$UserService2, _Digit$UserService2$g;
  const {
    t
  } = useTranslation();
  const location = useLocation();
  const history = useHistory();
  const tenantId = Digit.ULBService.getCitizenCurrentTenant();
  const {
    data: {
      unreadCount: preVisitUnseenEventsCount
    } = {},
    isSuccess: preVisitUnseenEventsCountLoaded
  } = Digit.Hooks.useNotificationCount({
    tenantId,
    config: {
      enabled: !!((_Digit$UserService = Digit.UserService) !== null && _Digit$UserService !== void 0 && (_Digit$UserService$ge = _Digit$UserService.getUser()) !== null && _Digit$UserService$ge !== void 0 && _Digit$UserService$ge.access_token)
    }
  });
  const {
    data: EventsData,
    isLoading: EventsDataLoading
  } = Digit.Hooks.useEvents({
    tenantId,
    variant
  });
  if (!((_Digit$UserService2 = Digit.UserService) !== null && _Digit$UserService2 !== void 0 && (_Digit$UserService2$g = _Digit$UserService2.getUser()) !== null && _Digit$UserService2$g !== void 0 && _Digit$UserService2$g.access_token)) {
    localStorage.clear();
    sessionStorage.clear();
    return /*#__PURE__*/React.createElement(Redirect$1, {
      to: {
        pathname: `/digit-ui/citizen/login`,
        state: {
          from: location.pathname + location.search
        }
      }
    });
  }
  if (EventsDataLoading || !preVisitUnseenEventsCountLoaded) return /*#__PURE__*/React.createElement(Loader, null);
  function onEventCardClick(id) {
    history.push(parentRoute + "/events/details/" + id);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "CitizenEngagementNotificationWrapper"
  }, /*#__PURE__*/React.createElement(Header, null, `${t("EVENTS_EVENTS_HEADER")}(${EventsData === null || EventsData === void 0 ? void 0 : EventsData.length})`), EventsData.length ? EventsData.map(DataParamsInEvent => /*#__PURE__*/React.createElement(OnGroundEventCard, Object.assign({
    onClick: onEventCardClick
  }, DataParamsInEvent))) : /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardCaption, null, t("COMMON_INBOX_NO_DATA"))));
};

const Heading$7 = props => {
  return /*#__PURE__*/React.createElement("h1", {
    className: "heading-m"
  }, props.label);
};
const Close$8 = () => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "#FFFFFF"
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0V0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
}));
const CloseBtn$8 = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "icon-bg-secondary",
    onClick: props.onClick
  }, /*#__PURE__*/React.createElement(Close$8, null));
};
const EventDetails = () => {
  const {
    id
  } = useParams();
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(false);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const {
    isLoading,
    data
  } = Digit.Hooks.events.useEventDetails(tenantId, {
    ids: id
  });
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("EMPLOYEE_EVENT_MUTATION_HAPPENED", false);
  const [errorInfo, setErrorInfo, clearError] = Digit.Hooks.useSessionStorage("EMPLOYEE_EVENT_ERROR_DATA", false);
  const [successData, setsuccessData, clearSuccessData] = Digit.Hooks.useSessionStorage("EMPLOYEE_EVENT_MUTATION_SUCCESS_DATA", false);
  useEffect(() => {
    setMutationHappened(false);
    clearSuccessData();
    clearError();
  }, []);
  function onActionSelect(action) {
    if (action === "EDIT") {
      history.push(`/digit-ui/employee/engagement/event/edit-event/${id}`);
    }
    if (action === "DELETE") {
      setShowModal(true);
    }
    setDisplayMenu(false);
  }
  const handleDelete = () => {
    const details = {
      events: [{
        ...(data === null || data === void 0 ? void 0 : data.applicationData),
        status: "CANCELLED"
      }]
    };
    history.push("/digit-ui/employee/engagement/event/response?delete=true", details);
  };
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Header, null, t("ES_TITLE_APPLICATION_DETAILS")), /*#__PURE__*/React.createElement(ApplicationDetails, {
    applicationData: data === null || data === void 0 ? void 0 : data.applicationData,
    applicationDetails: data,
    isLoading: isLoading,
    isDataLoading: isLoading
  }), /*#__PURE__*/React.createElement(ActionBar, null, displayMenu ? /*#__PURE__*/React.createElement(Menu, {
    localeKeyPrefix: "ES_EVENT",
    options: ['EDIT', 'DELETE'],
    t: t,
    onSelect: onActionSelect
  }) : null, /*#__PURE__*/React.createElement(SubmitBar, {
    label: t("ES_COMMON_TAKE_ACTION"),
    onSubmit: () => setDisplayMenu(!displayMenu)
  })), showModal && /*#__PURE__*/React.createElement(Modal, {
    headerBarMain: /*#__PURE__*/React.createElement(Heading$7, {
      label: t('ES_EVENT_DELETE_POPUP_HEADER')
    }),
    headerBarEnd: /*#__PURE__*/React.createElement(CloseBtn$8, {
      onClick: () => setShowModal(false)
    }),
    actionCancelLabel: t("CS_COMMON_CANCEL"),
    actionCancelOnSubmit: () => setShowModal(false),
    actionSaveLabel: t('ES_EVENT_DELETE'),
    actionSaveOnSubmit: handleDelete
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      boxShadow: "none"
    }
  }, /*#__PURE__*/React.createElement(CardText, null, t(`ES_EVENT_DELETE_TEXT`)))));
};

const Searchbar = ({
  searchValue,
  onChange,
  handleKeyPress,
  handleSearch,
  t
}) => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TextInput, {
    textInputStyle: {
      maxWidth: "960px"
    },
    className: "searchInput",
    placeholder: t("CE_SERACH_DOCUMENTS"),
    value: searchValue,
    onChange: ev => onChange(ev.target.value),
    signature: true,
    signatureImg: /*#__PURE__*/React.createElement(SearchIconSvg, {
      className: "signature-img",
      onClick: () => handleSearch()
    }),
    onKeyPress: handleKeyPress
  }));
};

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

const DocumentCard = ({
  documentTitle,
  documentSize: _documentSize = 2.3,
  lastModifiedData,
  description,
  filestoreId,
  documentLink,
  t
}) => {
  let isMobile = window.Digit.Utils.browser.isMobile();
  return /*#__PURE__*/React.createElement("div", {
    className: "notice_and_circular_main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "notice_and_circular_image"
  }, /*#__PURE__*/React.createElement(GenericFileIcon, {
    height: `${isMobile ? 66 : 100}`,
    width: `${isMobile ? 53 : 100}`
  })), /*#__PURE__*/React.createElement("div", {
    className: "notice_and_circular_content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "notice_and_circular_heading_mb"
  }, /*#__PURE__*/React.createElement(CardHeader, null, documentTitle), _documentSize ? /*#__PURE__*/React.createElement(CardCaption, null, getFileSize(_documentSize)) : null), /*#__PURE__*/React.createElement("div", {
    className: "notice_and_circular_caption"
  }, /*#__PURE__*/React.createElement(CardCaption, null, `${t(`CE_DCOUMENT_UPLOADED_ON`)} ${lastModifiedData ? format(new Date(lastModifiedData), "do MMMM yyyy") : "-"}`)), /*#__PURE__*/React.createElement("div", {
    className: "notice_and_circular_text"
  }, /*#__PURE__*/React.createElement(CardText, null, description !== null && description !== void 0 && description.length ? description : "NA")), /*#__PURE__*/React.createElement("div", {
    className: "view_download_main"
  }, filestoreId && filestoreId.length ? /*#__PURE__*/React.createElement(LinkButton, {
    label: /*#__PURE__*/React.createElement("div", {
      className: "views",
      onClick: () => openUploadedDocument(filestoreId ? filestoreId : null, documentTitle)
    }, /*#__PURE__*/React.createElement(ViewsIcon, null), /*#__PURE__*/React.createElement("p", null, t(`CE_DOCUMENT_VIEW_LINK`)))
  }) : null, documentLink && documentLink.length ? /*#__PURE__*/React.createElement(LinkButton, {
    label: /*#__PURE__*/React.createElement("div", {
      className: "views",
      onClick: () => openDocumentLink(documentLink, documentTitle)
    }, /*#__PURE__*/React.createElement(ExternalLinkIcon, null), /*#__PURE__*/React.createElement("p", null, t(`CE_DOCUMENT_OPEN_LINK`)))
  }) : null, filestoreId && filestoreId.length ? /*#__PURE__*/React.createElement(LinkButton, {
    label: /*#__PURE__*/React.createElement("div", {
      className: "views download_views_padding"
    }, /*#__PURE__*/React.createElement(DownloadImgIcon, null), /*#__PURE__*/React.createElement("p", null, t(`CE_DOCUMENT_DOWNLOAD_LINK`))),
    onClick: () => downloadDocument(filestoreId ? filestoreId : null)
  }) : null)));
};

const DocumentList = ({
  match
}) => {
  const {
    t
  } = useTranslation();
  const {
    category,
    count
  } = match.params;
  const tenantIds = Digit.ULBService.getCitizenCurrentTenant();
  const [pageSize, setPageSize] = useState(20);
  const [pageOffset, setPageOffset] = useState(0);
  const [searchValue, setSearchValue] = useState();
  const debouncedSearchQuery = useDebounce(searchValue, 700);
  const {
    data: filteredDocs,
    isLoading: isLoadingDocs
  } = Digit.Hooks.engagement.useDocSearch({
    name: debouncedSearchQuery,
    category,
    tenantIds,
    limit: pageSize
  }, {
    select: data => {
      var _data$Documents;
      return data === null || data === void 0 ? void 0 : (_data$Documents = data.Documents) === null || _data$Documents === void 0 ? void 0 : _data$Documents.map(({
        uuid,
        name,
        category,
        documentLink,
        description,
        auditDetails,
        fileSize,
        filestoreId
      }) => ({
        docId: uuid,
        name,
        category,
        description,
        documentLink,
        createdTime: auditDetails === null || auditDetails === void 0 ? void 0 : auditDetails.createdTime,
        fileSize,
        filestoreId
      }));
    }
  });
  const handleKeyPress = async event => {
    if (event.key === "Enter") {
      if (searchValue.length) {
        setSearchValue("");
      }
    }
  };
  const handleSearch = async event => {
    if (searchValue.length) {
      setSearchValue("");
    }
  };
  return /*#__PURE__*/React.createElement(AppContainer, null, /*#__PURE__*/React.createElement(Header, null, `${t(`${category}`)} (${count ? count : "-"})`), /*#__PURE__*/React.createElement("div", {
    className: "documentContainerPadding"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Searchbar, {
    searchValue: searchValue,
    handleKeyPress: handleKeyPress,
    handleSearch: handleSearch,
    onChange: setSearchValue,
    t: t
  })), isLoadingDocs ? /*#__PURE__*/React.createElement(Loader, null) : filteredDocs && filteredDocs.length ? renderDocsList(filteredDocs, t) : /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardCaption, null, t("COMMON_INBOX_NO_DATA")))));
};
const renderDocsList = (documents, t) => documents.map(({
  name,
  createdTime,
  description,
  documentLink,
  fileSize,
  filestoreId
}, index) => /*#__PURE__*/React.createElement(DocumentCard, {
  key: index,
  documentTitle: name,
  documentSize: fileSize,
  lastModifiedData: createdTime,
  description: description,
  documentLink: documentLink,
  filestoreId: filestoreId,
  t: t
}));

const Accordion = ({
  t,
  title,
  count,
  onClick,
  children
}) => {
  const [isOpen, setOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: "accordion-wrapper",
    onClick: () => onClick(title, count)
  }, /*#__PURE__*/React.createElement("div", {
    className: `accordion-title ${isOpen ? "open" : ""}`,
    onClick: () => setOpen(!isOpen)
  }, `${t(title)} (${count})`, /*#__PURE__*/React.createElement(PrevIcon, null)), /*#__PURE__*/React.createElement("div", {
    className: `accordion-item ${!isOpen ? "collapsed" : ""}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "accordion-content"
  }, children)));
};
const DocumentCategories = ({
  t,
  parentRoute
}) => {
  var _Digit$UserService, _Digit$UserService$ge, _data$documentList, _data$statusCount, _data$statusCount2;
  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");
  const tenantIds = Digit.ULBService.getCitizenCurrentTenant();
  const debouncedSearchQuery = useDebounce(searchValue, 700);
  const {
    data,
    isLoading
  } = Digit.Hooks.engagement.useDocSearch({
    name: debouncedSearchQuery,
    tenantIds
  }, {
    select: data => {
      var _data$Documents;
      const mappedDocuments = data === null || data === void 0 ? void 0 : (_data$Documents = data.Documents) === null || _data$Documents === void 0 ? void 0 : _data$Documents.map(({
        uuid,
        name,
        category,
        documentLink,
        description,
        auditDetails,
        fileSize,
        filestoreId
      }) => ({
        docId: uuid,
        name,
        category,
        description,
        documentLink,
        createdTime: auditDetails === null || auditDetails === void 0 ? void 0 : auditDetails.createdTime,
        fileSize,
        filestoreId
      }));
      return {
        documentList: mappedDocuments,
        statusCount: data === null || data === void 0 ? void 0 : data.statusCount
      };
    }
  });
  if (!((_Digit$UserService = Digit.UserService) !== null && _Digit$UserService !== void 0 && (_Digit$UserService$ge = _Digit$UserService.getUser()) !== null && _Digit$UserService$ge !== void 0 && _Digit$UserService$ge.access_token)) {
    return /*#__PURE__*/React.createElement(Redirect, {
      to: {
        pathname: `/digit-ui/citizen/login`,
        state: {
          from: location.pathname + location.search
        }
      }
    });
  }
  const showDocuments = (category, count) => {
    history.push(`documents/list/${category}/${count}`);
  };
  const handleKeyPress = event => {
    if (event.key === "Enter") {
      setSearchValue("");
    }
  };
  const handleSearch = event => {
    setSearchValue("");
  };
  return /*#__PURE__*/React.createElement(AppContainer, null, /*#__PURE__*/React.createElement(Header, null, t("DOCUMENTS_DOCUMENT_HEADER")), /*#__PURE__*/React.createElement("div", {
    className: "Docs_CardWrapper"
  }, /*#__PURE__*/React.createElement(Searchbar, {
    searchValue: searchValue,
    handleKeyPress: handleKeyPress,
    handleSearch: handleSearch,
    onChange: setSearchValue,
    t: t
  }), /*#__PURE__*/React.createElement("hr", {
    style: {
      color: "#ccc"
    }
  }), isLoading ? /*#__PURE__*/React.createElement(Loader, null) : /*#__PURE__*/React.createElement("div", {
    className: "wrapper"
  }, searchValue.length && data !== null && data !== void 0 && (_data$documentList = data.documentList) !== null && _data$documentList !== void 0 && _data$documentList.length ? renderDocsList(data.documentList, t) : data !== null && data !== void 0 && data.statusCount && data !== null && data !== void 0 && (_data$statusCount = data.statusCount) !== null && _data$statusCount !== void 0 && _data$statusCount.length ? data === null || data === void 0 ? void 0 : (_data$statusCount2 = data.statusCount) === null || _data$statusCount2 === void 0 ? void 0 : _data$statusCount2.map(({
    category,
    count
  }, index) => {
    return /*#__PURE__*/React.createElement(Accordion, {
      t: t,
      title: category,
      count: count,
      key: index,
      onClick: showDocuments
    });
  }) : /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardCaption, null, t("COMMON_INBOX_NO_DATA"))))));
};

const ViewDocument = ({
  match
}) => {
  const {
    t
  } = useTranslation();
  const {
    applicationNumber: uuid,
    tenantId
  } = Digit.Hooks.useQueryParams();
  const {
    data,
    isLoading
  } = Digit.Hooks.engagement.useDocSearch({
    uuid,
    tenantId
  }, {
    select: data => {
      var _data$Documents;
      const mappedDocuments = data === null || data === void 0 ? void 0 : (_data$Documents = data.Documents) === null || _data$Documents === void 0 ? void 0 : _data$Documents.map(({
        uuid,
        name,
        category,
        documentLink,
        description,
        auditDetails,
        fileSize,
        filestoreId
      }) => ({
        docId: uuid,
        name,
        category,
        description,
        documentLink,
        createdTime: auditDetails === null || auditDetails === void 0 ? void 0 : auditDetails.createdTime,
        fileSize,
        filestoreId
      }));
      return {
        documentList: mappedDocuments,
        statusCount: data === null || data === void 0 ? void 0 : data.statusCount
      };
    }
  });
  const {
    documentList = []
  } = data || {};
  const {
    name = false,
    createdTime,
    description,
    documentLink,
    fileSize,
    filestoreId
  } = (documentList === null || documentList === void 0 ? void 0 : documentList[0]) || {};
  return /*#__PURE__*/React.createElement(AppContainer, null, /*#__PURE__*/React.createElement(Header, null, `${t(`COMMON_VIEW_DOC`)}`), isLoading && /*#__PURE__*/React.createElement(Loader, null), name && /*#__PURE__*/React.createElement(DocumentCard, {
    key: 1,
    documentTitle: name,
    documentSize: fileSize,
    lastModifiedData: createdTime,
    description: description,
    documentLink: documentLink,
    filestoreId: filestoreId,
    t: t
  }), !name && !isLoading && /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardCaption, null, t("COMMON_DOC_DATA_NOT_FOUND"))));
};

const getMessage = mutation => {
  var _mutation$data, _mutation$data$Survey, _mutation$data$Survey2;
  if (mutation.isSuccess) return (_mutation$data = mutation.data) === null || _mutation$data === void 0 ? void 0 : (_mutation$data$Survey = _mutation$data.Surveys) === null || _mutation$data$Survey === void 0 ? void 0 : (_mutation$data$Survey2 = _mutation$data$Survey[0]) === null || _mutation$data$Survey2 === void 0 ? void 0 : _mutation$data$Survey2.uuid;
  return "";
};
const BannerPicker$2 = props => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement(Banner, {
    message: props.mutation.isSuccess ? t(`SURVEY_RESPONSE_SUBMITED`) : t("SURVEY_RESPONSE_FAILED"),
    applicationNumber: getMessage(props.mutation),
    info: props.mutation.isSuccess ? props.surveyTitle : "",
    successful: props.mutation.isSuccess,
    whichSvg: "tick"
  });
};
const Acknowledgement = props => {
  var _state$AnswerEntity;
  const queryClient = useQueryClient();
  const {
    t
  } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const mutation = Digit.Hooks.survey.useSubmitResponse();
  const {
    state
  } = props.location;
  const surveyTitlev1 = state === null || state === void 0 ? void 0 : (_state$AnswerEntity = state.AnswerEntity) === null || _state$AnswerEntity === void 0 ? void 0 : _state$AnswerEntity.surveyTitle;
  useEffect(() => {
    const onSuccess = () => {
      queryClient.clear();
    };
    mutation.mutate(state, {
      onSuccess
    });
  }, []);
  if (mutation.isLoading && !mutation.isIdle) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(BannerPicker$2, {
    t: t,
    mutation: mutation,
    surveyTitle: surveyTitlev1
  }), /*#__PURE__*/React.createElement(CardText, null, mutation.isSuccess ? t("SURVEY_FORM_RESPONSE_MESSAGE") : null), /*#__PURE__*/React.createElement(ActionBar, null, /*#__PURE__*/React.createElement(Link, {
    to: "/digit-ui/citizen/engagement/surveys/list"
  }, /*#__PURE__*/React.createElement(SubmitBar, {
    label: t("CORE_COMMON_GO_TO_HOME")
  }))));
};

const CitizenApp = ({
  path,
  url,
  userType,
  tenants
}) => {
  const location = useLocation();
  const {
    t
  } = useTranslation();
  const NotificationsOrWhatsNew = Digit.ComponentRegistryService.getComponent("NotificationsAndWhatsNew");
  const Events = Digit.ComponentRegistryService.getComponent("EventsListOnGround");
  const EventDetails = Digit.ComponentRegistryService.getComponent("EventDetails");
  const Documents = Digit.ComponentRegistryService.getComponent("DocumentList");
  const SurveyList = Digit.ComponentRegistryService.getComponent("SurveyList");
  const FillSurvey = Digit.ComponentRegistryService.getComponent("FillSurvey");
  const ShowSurvey = Digit.ComponentRegistryService.getComponent("ShowSurvey");
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "engagement-citizen-wrapper"
  }, !location.pathname.includes("response") && /*#__PURE__*/React.createElement(BackButton, null, t("CS_COMMON_BACK")), /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(Route, {
    path: `${path}/notifications`,
    component: () => /*#__PURE__*/React.createElement(NotificationsOrWhatsNew, {
      variant: "notifications",
      parentRoute: path
    })
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/whats-new`,
    component: () => /*#__PURE__*/React.createElement(NotificationsOrWhatsNew, {
      variant: "whats-new",
      parentRoute: path
    })
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    exact: true,
    path: `${path}/events`,
    component: () => /*#__PURE__*/React.createElement(Events, {
      variant: "events",
      parentRoute: path
    })
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/events/details/:id`,
    component: () => /*#__PURE__*/React.createElement(EventDetails, {
      parentRoute: path
    })
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/docs`,
    component: () => /*#__PURE__*/React.createElement(DocumentCategories, Object.assign({
      t: t
    }, {
      path
    }))
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/documents/viewDocument`,
    component: () => /*#__PURE__*/React.createElement(ViewDocument, Object.assign({
      t: t
    }, {
      path
    }))
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/documents/list/:category/:count`,
    component: props => /*#__PURE__*/React.createElement(Documents, props)
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/surveys/list`,
    component: props => /*#__PURE__*/React.createElement(SurveyList, props)
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/surveys/fill-survey`,
    component: props => /*#__PURE__*/React.createElement(FillSurvey, props)
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/surveys/submit-response`,
    component: props => /*#__PURE__*/React.createElement(Acknowledgement, props)
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/surveys/show-survey`,
    component: props => /*#__PURE__*/React.createElement(ShowSurvey, props)
  }))));
};

const EventDetails$1 = () => {
  var _Digit$UserService, _Digit$UserService$ge, _FilteredEventForThis, _FilteredEventForThis2, _FilteredEventForThis3, _FilteredEventForThis4, _FilteredEventForThis5;
  const {
    t
  } = useTranslation();
  const location = useLocation();
  const history = useHistory();
  const {
    id: EventId
  } = useParams();
  const tenantId = Digit.ULBService.getCitizenCurrentTenant();
  const {
    data: EventsData,
    isLoading: EventsDataLoading
  } = Digit.Hooks.useEvents({
    tenantId,
    variant: "events"
  });
  if (!((_Digit$UserService = Digit.UserService) !== null && _Digit$UserService !== void 0 && (_Digit$UserService$ge = _Digit$UserService.getUser()) !== null && _Digit$UserService$ge !== void 0 && _Digit$UserService$ge.access_token)) {
    localStorage.clear();
    sessionStorage.clear();
    return /*#__PURE__*/React.createElement(Redirect$1, {
      to: {
        pathname: `/digit-ui/citizen/login`,
        state: {
          from: location.pathname + location.search
        }
      }
    });
  }
  function onGroundEventCardPropsForEventDetails(DataParamsInEvent) {
    const {
      eventCategory,
      name,
      onGroundEventDate,
      onGroundEventMonth,
      onGroundEventTimeRange
    } = DataParamsInEvent;
    return {
      eventCategory: t(eventCategory),
      showEventCatergory: true,
      name,
      onGroundEventDate,
      onGroundEventMonth,
      onGroundEventTimeRange
    };
  }
  const FilteredEventForThisPage = useMemo(() => !EventsDataLoading ? EventsData === null || EventsData === void 0 ? void 0 : EventsData.filter(i => i.id === EventId)[0] : null, [EventsDataLoading, EventsData]);
  if (EventsDataLoading) return /*#__PURE__*/React.createElement(Loader, null);
  return /*#__PURE__*/React.createElement("div", {
    className: "CitizenEngagementNotificationWrapper"
  }, /*#__PURE__*/React.createElement(Header, null, t("ES_TITLE_APPLICATION_DETAILS")), /*#__PURE__*/React.createElement(OnGroundEventCard, onGroundEventCardPropsForEventDetails(FilteredEventForThisPage)), /*#__PURE__*/React.createElement("div", {
    className: "OnGroundEventDetailsCard"
  }, /*#__PURE__*/React.createElement("p", {
    className: "cardCaptionBodyS"
  }, FilteredEventForThisPage === null || FilteredEventForThisPage === void 0 ? void 0 : FilteredEventForThisPage.description), /*#__PURE__*/React.createElement("div", {
    className: "eventAddressAndDirection"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(MapMarker, null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, FilteredEventForThisPage === null || FilteredEventForThisPage === void 0 ? void 0 : (_FilteredEventForThis = FilteredEventForThisPage.eventDetails) === null || _FilteredEventForThis === void 0 ? void 0 : _FilteredEventForThis.address), FilteredEventForThisPage !== null && FilteredEventForThisPage !== void 0 && (_FilteredEventForThis2 = FilteredEventForThisPage.eventDetails) !== null && _FilteredEventForThis2 !== void 0 && _FilteredEventForThis2.latitude && FilteredEventForThisPage !== null && FilteredEventForThisPage !== void 0 && (_FilteredEventForThis3 = FilteredEventForThisPage.eventDetails) !== null && _FilteredEventForThis3 !== void 0 && _FilteredEventForThis3.longitude ? /*#__PURE__*/React.createElement("a", {
    className: "direction",
    target: "_blank",
    href: `https://www.google.com/maps/search/?api=1&query=${FilteredEventForThisPage === null || FilteredEventForThisPage === void 0 ? void 0 : (_FilteredEventForThis4 = FilteredEventForThisPage.eventDetails) === null || _FilteredEventForThis4 === void 0 ? void 0 : _FilteredEventForThis4.latitude}%2C${FilteredEventForThisPage === null || FilteredEventForThisPage === void 0 ? void 0 : (_FilteredEventForThis5 = FilteredEventForThisPage.eventDetails) === null || _FilteredEventForThis5 === void 0 ? void 0 : _FilteredEventForThis5.longitude}`
  }, t("CS_COMMON_GET_DIRECTIONS")) : null))), /*#__PURE__*/React.createElement("div", {
    className: "eventTimeRange"
  }, /*#__PURE__*/React.createElement(Clock, null), /*#__PURE__*/React.createElement("p", null, FilteredEventForThisPage === null || FilteredEventForThisPage === void 0 ? void 0 : FilteredEventForThisPage.onGroundEventTimeRange))));
};

const documentsFormConfig = [{
  body: [{
    type: "form",
    key: "ULB",
    component: "EngagementDocSelectULB",
    withoutLabel: true
  }, {
    type: "form",
    key: "documentName",
    component: "EnagementDocName",
    withoutLabel: true
  }, {
    type: "form",
    key: "docCategory",
    component: "EngagementDocCategory",
    withoutLabel: true
  }, {
    type: "form",
    key: "description",
    component: "EngagementDocDescription",
    withoutLabel: true
  }, {
    type: "form",
    key: "document",
    component: "EngagementDocUploadDocument",
    withoutLabel: true,
    inputs: [{
      name: ""
    }]
  }]
}];

const Documents = () => {
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const [canSubmit, setSubmitValve] = useState(false);
  const onFormValueChange = (setValue, formData, formState) => {
    var _formData$ULB;
    if (formData !== null && formData !== void 0 && formData.documentName && formData !== null && formData !== void 0 && formData.docCategory && (formData !== null && formData !== void 0 && formData.document.filestoreId || formData !== null && formData !== void 0 && formData.document.documentLink) && formData !== null && formData !== void 0 && (_formData$ULB = formData.ULB) !== null && _formData$ULB !== void 0 && _formData$ULB.length) {
      setSubmitValve(true);
    } else {
      setSubmitValve(false);
    }
  };
  const onSubmit = data => {
    var _data$docCategory, _data$document, _data$document2, _data$document2$files, _data$document3, _data$document3$files, _data$document4, _data$document4$files;
    const DocumentEntity = {
      name: data.documentName,
      description: data !== null && data !== void 0 && data.description.length ? data.description : "",
      category: (_data$docCategory = data.docCategory) === null || _data$docCategory === void 0 ? void 0 : _data$docCategory.name,
      documentLink: (_data$document = data.document) === null || _data$document === void 0 ? void 0 : _data$document.documentLink,
      filestoreId: (_data$document2 = data.document) === null || _data$document2 === void 0 ? void 0 : (_data$document2$files = _data$document2.filestoreId) === null || _data$document2$files === void 0 ? void 0 : _data$document2$files.fileStoreId,
      fileSize: (_data$document3 = data.document) === null || _data$document3 === void 0 ? void 0 : (_data$document3$files = _data$document3.filestoreId) === null || _data$document3$files === void 0 ? void 0 : _data$document3$files.fileSize,
      fileType: (_data$document4 = data.document) === null || _data$document4 === void 0 ? void 0 : (_data$document4$files = _data$document4.filestoreId) === null || _data$document4$files === void 0 ? void 0 : _data$document4$files.fileType,
      tenantIds: data.ULB.map(e => e.code)
    };
    history.push("/digit-ui/employee/engagement/documents/response", {
      DocumentEntity
    });
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Header, null, t("ES_ENGAGEMENT_DOCUMENTS")), /*#__PURE__*/React.createElement(FormComposer, {
    label: t("ES_COMMON_APPLICATION_SUBMIT"),
    config: documentsFormConfig,
    onSubmit: onSubmit,
    fieldStyle: {},
    onFormValueChange: onFormValueChange,
    isDisabled: !canSubmit
  }));
};

const documentsFormConfig$1 = [{
  body: [{
    type: "form",
    key: "ULB",
    component: "EngagementULBDropdown",
    withoutLabel: true
  }, {
    type: "form",
    key: "documentName",
    component: "EnagementDocName",
    withoutLabel: true
  }, {
    type: "form",
    key: "docCategory",
    component: "EngagementDocCategory",
    withoutLabel: true
  }, {
    type: "form",
    key: "description",
    component: "EngagementDocDescription",
    withoutLabel: true
  }, {
    type: "form",
    key: "document",
    component: "EngagementDocUploadDocument",
    withoutLabel: true,
    inputs: [{
      name: ""
    }]
  }]
}];

const Documents$1 = props => {
  var _props$location$state6;
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const [canSubmit, setSubmitValve] = useState(false);
  const onFormValueChange = useCallback((setValue, updatedFormData, formState) => {
    if (updatedFormData !== null && updatedFormData !== void 0 && updatedFormData.documentName && updatedFormData !== null && updatedFormData !== void 0 && updatedFormData.docCategory && (updatedFormData !== null && updatedFormData !== void 0 && updatedFormData.document.filestoreId || updatedFormData !== null && updatedFormData !== void 0 && updatedFormData.document.documentLink) && updatedFormData !== null && updatedFormData !== void 0 && updatedFormData.ULB && Object.keys(updatedFormData === null || updatedFormData === void 0 ? void 0 : updatedFormData.ULB).length) {
      setSubmitValve(true);
    } else {
      setSubmitValve(false);
    }
  }, []);
  const update = data => {
    var _data$document, _data$document$filest, _data$document2, _data$document2$files, _props$location$state, _props$location$state2, _data$document3, _data$document3$files, _data$document4, _data$document4$files, _props$location$state3, _props$location$state4, _props$location, _props$location$state5, _data$docCategory, _data$document5, _data$document5$files, _data$document6, _data$ULB;
    const fileSize = (_data$document = data.document) !== null && _data$document !== void 0 && (_data$document$filest = _data$document.filestoreId) !== null && _data$document$filest !== void 0 && _data$document$filest.fileSize ? (_data$document2 = data.document) === null || _data$document2 === void 0 ? void 0 : (_data$document2$files = _data$document2.filestoreId) === null || _data$document2$files === void 0 ? void 0 : _data$document2$files.fileSize : (_props$location$state = props.location.state) === null || _props$location$state === void 0 ? void 0 : (_props$location$state2 = _props$location$state.DocumentEntity) === null || _props$location$state2 === void 0 ? void 0 : _props$location$state2.fileSize;
    const fileType = (_data$document3 = data.document) !== null && _data$document3 !== void 0 && (_data$document3$files = _data$document3.filestoreId) !== null && _data$document3$files !== void 0 && _data$document3$files.fileType ? (_data$document4 = data.document) === null || _data$document4 === void 0 ? void 0 : (_data$document4$files = _data$document4.filestoreId) === null || _data$document4$files === void 0 ? void 0 : _data$document4$files.fileType : (_props$location$state3 = props.location.state) === null || _props$location$state3 === void 0 ? void 0 : (_props$location$state4 = _props$location$state3.DocumentEntity) === null || _props$location$state4 === void 0 ? void 0 : _props$location$state4.fileType;
    const DocumentEntity = {
      ...((_props$location = props.location) === null || _props$location === void 0 ? void 0 : (_props$location$state5 = _props$location.state) === null || _props$location$state5 === void 0 ? void 0 : _props$location$state5.DocumentEntity),
      name: data.documentName,
      description: data !== null && data !== void 0 && data.description.length ? data.description : "",
      category: (_data$docCategory = data.docCategory) === null || _data$docCategory === void 0 ? void 0 : _data$docCategory.name,
      filestoreId: (_data$document5 = data.document) === null || _data$document5 === void 0 ? void 0 : (_data$document5$files = _data$document5.filestoreId) === null || _data$document5$files === void 0 ? void 0 : _data$document5$files.fileStoreId,
      fileSize,
      fileType,
      documentLink: (_data$document6 = data.document) === null || _data$document6 === void 0 ? void 0 : _data$document6.documentLink,
      tenantId: data === null || data === void 0 ? void 0 : (_data$ULB = data.ULB) === null || _data$ULB === void 0 ? void 0 : _data$ULB.code
    };
    delete DocumentEntity.ULB;
    delete DocumentEntity.docCategory;
    delete DocumentEntity.documentName;
    history.push("/digit-ui/employee/engagement/documents/update-response", {
      DocumentEntity
    });
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Header, null, t("ES_ENGAGEMENT_EDIT_DOC")), /*#__PURE__*/React.createElement(FormComposer, {
    label: t("ES_COMMON_UPDATE"),
    config: documentsFormConfig$1,
    onSubmit: data => {
      update(data);
    },
    fieldStyle: {},
    onFormValueChange: onFormValueChange,
    defaultValues: (_props$location$state6 = props.location.state) === null || _props$location$state6 === void 0 ? void 0 : _props$location$state6.DocumentEntity,
    isDisabled: !canSubmit
  }));
};

const getMessage$1 = mutation => {
  var _mutation$data, _mutation$data$Docume, _mutation$data$Docume2;
  if (mutation.isSuccess) return (_mutation$data = mutation.data) === null || _mutation$data === void 0 ? void 0 : (_mutation$data$Docume = _mutation$data.Documents) === null || _mutation$data$Docume === void 0 ? void 0 : (_mutation$data$Docume2 = _mutation$data$Docume[0]) === null || _mutation$data$Docume2 === void 0 ? void 0 : _mutation$data$Docume2.uuid;
  return "";
};
const BannerPicker$3 = props => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement(Banner, {
    message: props.isSuccess ? t(`ENGAGEMENT_DOC_CREATED`) : t("ENGAGEMENT_DOC_FAILURE"),
    applicationNumber: getMessage$1(props.mutation),
    info: props.isSuccess ? t("ENGAGEMENT_DOCUMENT_ID") : "",
    successful: props.isSuccess
  });
};
const Response$2 = props => {
  const queryClient = useQueryClient();
  const {
    t
  } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const mutation = Digit.Hooks.engagement.useDocCreate();
  const {
    state
  } = props.location;
  useEffect(() => {
    const onSuccess = () => {
      queryClient.clear();
    };
    mutation.mutate(state, {
      onSuccess
    });
  }, []);
  if (mutation.isLoading || mutation.isIdle) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(BannerPicker$3, {
    t: t,
    data: mutation.data,
    mutation: mutation,
    isSuccess: mutation.isSuccess,
    isLoading: mutation.isIdle || mutation.isLoading
  })), /*#__PURE__*/React.createElement(ActionBar, null, /*#__PURE__*/React.createElement(Link, {
    to: "/digit-ui/employee"
  }, /*#__PURE__*/React.createElement(SubmitBar, {
    label: t("CORE_COMMON_GO_TO_HOME")
  }))));
};

const getMessage$2 = mutation => {
  var _mutation$data, _mutation$data$Docume, _mutation$data$Docume2;
  if (mutation.isSuccess) return (_mutation$data = mutation.data) === null || _mutation$data === void 0 ? void 0 : (_mutation$data$Docume = _mutation$data.Documents) === null || _mutation$data$Docume === void 0 ? void 0 : (_mutation$data$Docume2 = _mutation$data$Docume[0]) === null || _mutation$data$Docume2 === void 0 ? void 0 : _mutation$data$Docume2.uuid;
  return "";
};
const BannerPicker$4 = props => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement(Banner, {
    message: props.isSuccess ? t(`ENGAGEMENT_DOC_UPDATED`) : t("ENGAGEMENT_DOC_UPDATE_FAILURE"),
    applicationNumber: getMessage$2(props.mutation),
    info: props.isSuccess ? t("ENGAGEMENT_DOCUMENT_ID") : "",
    successful: props.isSuccess
  });
};
const Response$3 = props => {
  const queryClient = useQueryClient();
  const {
    t
  } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const mutation = Digit.Hooks.engagement.useDocUpdate();
  const {
    state
  } = props.location;
  useEffect(() => {
    const onSuccess = () => {
      queryClient.clear();
    };
    mutation.mutate(state, {
      onSuccess
    });
  }, []);
  if (mutation.isLoading || mutation.isIdle) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(BannerPicker$4, {
    t: t,
    data: mutation.data,
    mutation: mutation,
    isSuccess: mutation.isSuccess,
    isLoading: mutation.isIdle || mutation.isLoading
  })), /*#__PURE__*/React.createElement(ActionBar, null, /*#__PURE__*/React.createElement(Link, {
    to: "/digit-ui/employee"
  }, /*#__PURE__*/React.createElement(SubmitBar, {
    label: t("CORE_COMMON_GO_TO_HOME")
  }))));
};

const BannerPicker$5 = props => {
  var _props$mutation;
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement(Banner, {
    message: props.isSuccess ? t(`ENGAGEMENT_DOC_DELETED`) : t("ENGAGEMENT_DOC_DELETE_FAILURE"),
    applicationNumber: (_props$mutation = props.mutation) !== null && _props$mutation !== void 0 && _props$mutation.isSuccess ? props.uuid : '',
    info: props.isSuccess ? t("ENGAGEMENT_DOCUMENT_ID") : "",
    successful: props.isSuccess
  });
};
const Response$4 = props => {
  var _state$DocumentEntity;
  const queryClient = useQueryClient();
  const {
    t
  } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const mutation = Digit.Hooks.engagement.useDocDelete();
  const {
    state
  } = props.location;
  useEffect(() => {
    const onSuccess = () => {
      queryClient.clear();
    };
    mutation.mutate(state, {
      onSuccess
    });
  }, []);
  if (mutation.isLoading || mutation.isIdle) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(BannerPicker$5, {
    t: t,
    data: mutation.data,
    mutation: mutation,
    uuid: state === null || state === void 0 ? void 0 : (_state$DocumentEntity = state.DocumentEntity) === null || _state$DocumentEntity === void 0 ? void 0 : _state$DocumentEntity.uuid,
    isSuccess: mutation.isSuccess,
    isLoading: mutation.isIdle || mutation.isLoading
  })), /*#__PURE__*/React.createElement(ActionBar, null, /*#__PURE__*/React.createElement(Link, {
    to: "/digit-ui/employee"
  }, /*#__PURE__*/React.createElement(SubmitBar, {
    label: t("CORE_COMMON_GO_TO_HOME")
  }))));
};

const DocumentNotificationTable = ({
  t,
  data,
  columns,
  globalSearch,
  onSearch,
  getCellProps,
  pageSizeLimit,
  totalRecords,
  currentPage,
  onNextPage,
  onPrevPage,
  onPageSizeChange,
  onSort,
  sortParams
}) => {
  return /*#__PURE__*/React.createElement(Table, {
    t: t,
    data: data,
    columns: columns,
    onSearch: onSearch,
    globalSearch: globalSearch,
    manualGlobalFilter: true,
    manualPagination: true,
    currentPage: currentPage,
    onNextPage: onNextPage,
    onPrevPage: onPrevPage,
    pageSizeLimit: pageSizeLimit,
    onPageSizeChange: onPageSizeChange,
    getCellProps: getCellProps,
    totalRecords: totalRecords,
    onSort: onSort,
    sortParams: sortParams
  });
};

const Search$2 = ({
  onSearch,
  searchParams,
  searchFields,
  type,
  onClose,
  isInboxPage,
  t
}) => {
  const {
    register,
    handleSubmit,
    formState,
    reset,
    watch,
    control
  } = useForm({
    defaultValues: searchParams
  });
  const mobileView = innerWidth <= 640;
  const ulbs = Digit.SessionStorage.get("ENGAGEMENT_TENANTS");
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const userInfo = Digit.UserService.getUser().info;
  const userUlbs = ulbs.filter(ulb => {
    var _userInfo$roles;
    return userInfo === null || userInfo === void 0 ? void 0 : (_userInfo$roles = userInfo.roles) === null || _userInfo$roles === void 0 ? void 0 : _userInfo$roles.some(role => (role === null || role === void 0 ? void 0 : role.tenantId) === (ulb === null || ulb === void 0 ? void 0 : ulb.code));
  }).sort(alphabeticalSortFunctionForTenantsBasedOnName);
  const selectedTenat = useMemo(() => {
    const filtered = ulbs.filter(item => item.code === tenantId);
    return filtered;
  }, [tenantId, ulbs]);
  const getFields = input => {
    switch (input.type) {
      case "ulb":
        return /*#__PURE__*/React.createElement(Controller, {
          rules: {
            required: true
          },
          defaultValue: selectedTenat === null || selectedTenat === void 0 ? void 0 : selectedTenat[0],
          render: props => /*#__PURE__*/React.createElement(Dropdown, {
            option: userUlbs,
            optionKey: "i18nKey",
            selected: props.value,
            select: props.onChange,
            t: t
          }),
          name: input.name,
          control: control
        });
      default:
        return /*#__PURE__*/React.createElement(Controller, {
          render: props => /*#__PURE__*/React.createElement(TextInput, {
            onChange: props.onChange,
            value: props.value
          }),
          name: input.name,
          control: control,
          defaultValue: null
        });
    }
  };
  const onSubmitInput = data => {
    onSearch(data);
    if (type === "mobile") {
      onClose();
    }
  };
  const clearSearch = () => {
    reset({
      name: '',
      ulbs: {
        code: tenantId.code
      },
      postedBy: ""
    });
    onSearch({
      name: '',
      ulbs: {
        code: tenantId.code
      },
      postedBy: ""
    });
  };
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
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit(onSubmitInput)
  }, /*#__PURE__*/React.createElement("div", {
    className: "search-container",
    style: {
      width: "auto",
      marginLeft: isInboxPage ? "24px" : "revert"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "search-complaint-container"
  }, (type === "mobile" || mobileView) && /*#__PURE__*/React.createElement("div", {
    className: "complaint-header"
  }, /*#__PURE__*/React.createElement("h2", null, t("ES_COMMON_SEARCH_BY")), /*#__PURE__*/React.createElement("span", {
    onClick: onClose
  }, /*#__PURE__*/React.createElement(CloseSvg, null))), /*#__PURE__*/React.createElement("div", {
    className: "complaint-input-container for-pt " + (!isInboxPage ? "for-search" : ""),
    style: {
      width: "100%",
      display: "grid"
    }
  }, searchFields === null || searchFields === void 0 ? void 0 : searchFields.map((input, index) => {
    var _formState$dirtyField, _formState$errors, _formState$errors$inp;
    return /*#__PURE__*/React.createElement("div", {
      key: input.name,
      className: "input-fields"
    }, /*#__PURE__*/React.createElement("span", {
      className: "mobile-input"
    }, /*#__PURE__*/React.createElement(Label, null, t(input.label) + ` ${input.isMendatory ? "*" : ""}`), getFields(input)), formState !== null && formState !== void 0 && (_formState$dirtyField = formState.dirtyFields) !== null && _formState$dirtyField !== void 0 && _formState$dirtyField[input.name] ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: "700",
        color: "rgba(212, 53, 28)",
        paddingLeft: "8px",
        marginTop: "-20px",
        fontSize: "12px"
      },
      className: "inbox-search-form-error"
    }, formState === null || formState === void 0 ? void 0 : (_formState$errors = formState.errors) === null || _formState$errors === void 0 ? void 0 : (_formState$errors$inp = _formState$errors[input.name]) === null || _formState$errors$inp === void 0 ? void 0 : _formState$errors$inp.message) : null);
  }), type === "desktop" && !mobileView && /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "unset",
      marginLeft: "unset"
    },
    className: "search-submit-wrapper"
  }, /*#__PURE__*/React.createElement(SubmitBar, {
    className: "submit-bar-search",
    label: t("ES_COMMON_SEARCH"),
    submit: true
  })), type === "desktop" && !mobileView && /*#__PURE__*/React.createElement("div", {
    className: "document-clear-all"
  }, clearAll())))), (type === "mobile" || mobileView) && /*#__PURE__*/React.createElement(ActionBar, {
    className: "clear-search-container"
  }, /*#__PURE__*/React.createElement("button", {
    className: "clear-search",
    style: {
      flex: 1
    }
  }, clearAll(mobileView)), /*#__PURE__*/React.createElement(SubmitBar, {
    disabled: !!Object.keys(formState.errors).length,
    label: t("ES_COMMON_SEARCH"),
    style: {
      flex: 1
    },
    submit: true
  })));
};

const Filter$2 = ({
  type: _type = "desktop",
  onClose,
  onSearch,
  onFilterChange,
  searchParams
}) => {
  const {
    t
  } = useTranslation();
  const [localSearchParams, setLocalSearchParams] = useState(() => ({
    ...searchParams
  }));
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = tenantId === null || tenantId === void 0 ? void 0 : tenantId.split('.')[0];
  const currrentUlb = Digit.ULBService.getCurrentUlb();
  const {
    data: categoryData,
    isLoading
  } = Digit.Hooks.engagement.useMDMS(stateId, "DocumentUploader", ["UlbLevelCategories"], {
    select: d => {
      var _d$DocumentUploader, _d$DocumentUploader$U, _d$DocumentUploader$U2;
      const data = d === null || d === void 0 ? void 0 : (_d$DocumentUploader = d.DocumentUploader) === null || _d$DocumentUploader === void 0 ? void 0 : (_d$DocumentUploader$U = _d$DocumentUploader.UlbLevelCategories) === null || _d$DocumentUploader$U === void 0 ? void 0 : (_d$DocumentUploader$U2 = _d$DocumentUploader$U.filter) === null || _d$DocumentUploader$U2 === void 0 ? void 0 : _d$DocumentUploader$U2.call(_d$DocumentUploader$U, e => e.ulb === currrentUlb.code);
      return data[0].categoryList.map(category => ({
        category
      }));
    }
  });
  const clearAll = () => {
    setLocalSearchParams({
      category: null,
      name: null,
      postedBy: null
    });
    onFilterChange({
      category: null,
      name: null,
      postedBy: null
    });
    onClose === null || onClose === void 0 ? void 0 : onClose();
  };
  const applyLocalFilters = () => {
    onFilterChange(localSearchParams);
    onClose === null || onClose === void 0 ? void 0 : onClose();
  };
  const handleChange = data => {
    setLocalSearchParams({
      ...localSearchParams,
      ...data
    });
  };
  if (isLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return /*#__PURE__*/React.createElement("div", {
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
  }, t("ES_COMMON_CLEAR_ALL")), _type === "desktop" && /*#__PURE__*/React.createElement("span", {
    className: "clear-search",
    onClick: clearAll
  }, /*#__PURE__*/React.createElement(RefreshIcon, null)), _type === "mobile" && /*#__PURE__*/React.createElement("span", {
    onClick: onClose
  }, /*#__PURE__*/React.createElement(CloseSvg, null))), /*#__PURE__*/React.createElement("div", {
    className: "filter-label"
  }, `${t('DOCUMENTS_CATEGORY_CARD_LABEL')}`), /*#__PURE__*/React.createElement(Dropdown, {
    option: categoryData,
    optionKey: "category",
    selected: localSearchParams,
    select: value => {
      handleChange(value);
    },
    t: t
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SubmitBar, {
    style: {
      width: '100%'
    },
    onSubmit: () => applyLocalFilters(),
    label: t("ES_COMMON_APPLY")
  }))));
};

const getDocumentDetailsPath = document => {
  return {
    pathname: `inbox/details/${document.name}`,
    state: {
      details: document
    }
  };
};
const GetCell$2 = value => /*#__PURE__*/React.createElement("span", {
  className: "cell-text styled-cell"
}, value);
const getDocumentDetails = (value = "", link, t) => /*#__PURE__*/React.createElement("span", {
  className: "document-table-docs-columns"
}, /*#__PURE__*/React.createElement(Link, {
  className: "link",
  to: link
}, value.length ? value : t('CE_DOCUMENT_TITLE')));
const getDocumentCell = (name = "mSeva", link, docLink, t) => /*#__PURE__*/React.createElement("span", {
  className: "document-table-docs-columns"
}, link !== null && link !== void 0 && link.length ? /*#__PURE__*/React.createElement("span", {
  className: "link",
  onClick: () => openUploadedDocument(link, name)
}, " ", t('CE_DOCUMENT_VIEW_LINK'), " ") : null, docLink.length ? /*#__PURE__*/React.createElement("span", {
  className: "link",
  onClick: () => openDocumentLink(docLink, name)
}, " ", t('CE_DOCUMENT_OPEN_LINK'), " ") : null);
const DocumentDesktopInbox = ({
  isLoading,
  data,
  t,
  onSearch,
  title,
  iconName,
  links,
  onSort,
  sortParams,
  globalSearch,
  searchFields,
  searchParams,
  onFilterChange,
  pageSizeLimit,
  totalRecords,
  currentPage,
  onNextPage,
  onPrevPage,
  onPageSizeChange
}) => {
  const columns = React.useMemo(() => [{
    Header: t('CE_TABLE_DOCUMENT_NAME'),
    accessor: row => getDocumentDetails(row === null || row === void 0 ? void 0 : row.name, getDocumentDetailsPath(row), t)
  }, {
    Header: t('DOCUMENTS_CATEGORY_CARD_LABEL'),
    accessor: row => GetCell$2(row !== null && row !== void 0 && row.category ? t(`${row === null || row === void 0 ? void 0 : row.category}`) : "")
  }, {
    Header: t('CE_TABLE_DOCUMENT_LINK'),
    accessor: row => getDocumentCell(row === null || row === void 0 ? void 0 : row.name, row.filestoreId, row.documentLink || "", t)
  }, {
    Header: t('CE_TABLE_DOCUMENT_POSTED_BY'),
    accessor: row => GetCell$2(row.postedBy)
  }], []);
  let result;
  if (isLoading) {
    result = /*#__PURE__*/React.createElement(Loader, null);
  } else if (!data || (data === null || data === void 0 ? void 0 : data.length) === 0) {
    result = /*#__PURE__*/React.createElement(Card, {
      style: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, t("CE_DOCUMENTS_NOT_FOUND"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Link, {
      className: "link",
      to: `/digit-ui/employee/engagement/documents/inbox/new-doc`
    }, t('NEW_DOCUMENT_TEXT')));
  } else if ((data === null || data === void 0 ? void 0 : data.length) > 0) {
    result = /*#__PURE__*/React.createElement(DocumentNotificationTable, {
      t: t,
      data: data,
      columns: columns,
      onSort: onSort,
      sortParams: sortParams,
      globalSearch: globalSearch,
      onSearch: searchParams,
      pageSizeLimit: pageSizeLimit,
      totalRecords: totalRecords,
      currentPage: currentPage,
      onNextPage: onNextPage,
      onPrevPage: onPrevPage,
      onPageSizeChange: onPageSizeChange,
      getCellProps: cellInfo => {
        return {
          style: {
            minWidth: cellInfo.column.Header === t("CE_TABLE_DOCUMENT_NAME") ? "240px" : "",
            padding: "20px 18px",
            fontSize: "16px"
          }
        };
      }
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "inbox-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "filters-container"
  }, /*#__PURE__*/React.createElement(EventLink, {
    title: title,
    icon: iconName,
    links: links
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Filter$2, {
    onFilterChange: onFilterChange,
    searchParams: searchParams
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Search$2, {
    t: t,
    onSearch: onSearch,
    type: "desktop",
    searchFields: searchFields,
    isInboxPage: true,
    searchParams: searchParams
  }), /*#__PURE__*/React.createElement("div", {
    className: "result",
    style: {
      marginLeft: "24px",
      flex: 1
    }
  }, result)));
};

const ApplicationCard$2 = ({
  searchFields,
  searchParams,
  onFilterChange,
  onSearch,
  t,
  data,
  responseData
}) => {
  const [type, setType] = useState("");
  const [popup, setPopup] = useState(false);
  const [params, setParams] = useState(searchParams);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const history = useHistory();
  useEffect(() => {
    if (type) setPopup(true);
  }, [type]);
  const handlePopupClose = () => {
    setPopup(false);
    setParams(searchParams);
  };
  const redirectToDetailsPage = data => {
    const details = responseData === null || responseData === void 0 ? void 0 : responseData.find(item => areEqual(item.postedBy, data["Posted By"]) && areEqual(item.name, data["Document Name"]));
    if (details) {
      history.push(`/digit-ui/employee/engagement/documents/inbox/details/${details === null || details === void 0 ? void 0 : details.name}`, {
        details
      });
    }
  };
  let result;
  if ((data === null || data === void 0 ? void 0 : data.length) === 0) {
    result = /*#__PURE__*/React.createElement(Card, {
      style: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, t("CE_DOCUMENTS_NOT_FOUND"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Link, {
      className: "link",
      to: `/digit-ui/employee/engagement/documents/inbox/new-doc`
    }, t('NEW_DOCUMENT_TEXT')));
  } else if (data && (data === null || data === void 0 ? void 0 : data.length) > 0) {
    result = /*#__PURE__*/React.createElement(DetailsCard, {
      data: data,
      handleSelect: () => {},
      handleDetailCardClick: redirectToDetailsPage
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
  }), /*#__PURE__*/React.createElement(FilterAction, {
    text: "FILTER",
    handleActionClick: () => {
      setType("FILTER");
      setPopup(true);
    }
  })), result, popup && /*#__PURE__*/React.createElement(PopUp, null, type === "FILTER" && /*#__PURE__*/React.createElement("div", {
    className: "popup-module"
  }, /*#__PURE__*/React.createElement(Filter$2, {
    onFilterChange: onFilterChange,
    onClose: handlePopupClose,
    onSearch: onSearch,
    type: "mobile",
    searchParams: params
  })), type === "SEARCH" && /*#__PURE__*/React.createElement("div", {
    className: "popup-module"
  }, /*#__PURE__*/React.createElement(Search$2, {
    t: t,
    type: "mobile",
    onClose: handlePopupClose,
    onSearch: onSearch,
    searchParams: searchParams,
    searchFields: searchFields
  }))));
};

const MobileInbox$2 = ({
  data,
  t,
  title,
  iconName,
  links,
  searchFields,
  searchParams,
  onFilterChange,
  onSearch,
  isLoading
}) => {
  const getData = () => {
    return data === null || data === void 0 ? void 0 : data.filter(document => {
      var _searchParams$tenantI, _searchParams$tenantI2, _document$name, _searchParams$name, _document$postedBy, _document$postedBy$tr, _searchParams$postedB, _searchParams$postedB2;
      return ((searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$tenantI = searchParams.tenantIds) === null || _searchParams$tenantI === void 0 ? void 0 : _searchParams$tenantI.length) > 0 ? searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$tenantI2 = searchParams.tenantIds) === null || _searchParams$tenantI2 === void 0 ? void 0 : _searchParams$tenantI2.includes(document.tenantId) : true) && (searchParams !== null && searchParams !== void 0 && searchParams.name ? (_document$name = document.name) === null || _document$name === void 0 ? void 0 : _document$name.toUpperCase().startsWith(searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$name = searchParams.name) === null || _searchParams$name === void 0 ? void 0 : _searchParams$name.toUpperCase()) : true) && (searchParams !== null && searchParams !== void 0 && searchParams.postedBy ? ((_document$postedBy = document.postedBy) === null || _document$postedBy === void 0 ? void 0 : (_document$postedBy$tr = _document$postedBy.trim()) === null || _document$postedBy$tr === void 0 ? void 0 : _document$postedBy$tr.toLowerCase()) === (searchParams === null || searchParams === void 0 ? void 0 : (_searchParams$postedB = searchParams.postedBy) === null || _searchParams$postedB === void 0 ? void 0 : (_searchParams$postedB2 = _searchParams$postedB.trim()) === null || _searchParams$postedB2 === void 0 ? void 0 : _searchParams$postedB2.toLowerCase()) : true) && (searchParams !== null && searchParams !== void 0 && searchParams.category ? document.category === (searchParams === null || searchParams === void 0 ? void 0 : searchParams.category) : true);
    }).map(document => {
      return {
        [t("CE_TABLE_DOCUMENT_NAME")]: document === null || document === void 0 ? void 0 : document.name,
        [t("DOCUMENTS_CATEGORY_CARD_LABEL")]: t(`${document === null || document === void 0 ? void 0 : document.category}`),
        [t("CE_TABLE_DOCUMENT_LINK")]: /*#__PURE__*/React.createElement("div", {
          className: "mobileInbox_attachments"
        }, document !== null && document !== void 0 && document.filestoreId ? /*#__PURE__*/React.createElement("div", {
          className: "link",
          onClick: ev => {
            openUploadedDocument(document.filestoreId, document.name);
          }
        }, t('CE_DOCUMENT_VIEW_LINK')) : null, document !== null && document !== void 0 && document.documentLink ? /*#__PURE__*/React.createElement("div", {
          className: "link",
          onClick: ev => {
            openDocumentLink(document.documentLink, document.name);
          }
        }, t('CE_DOCUMENT_OPEN_LINK')) : null),
        [t("CE_TABLE_DOCUMENT_POSTED_BY")]: document === null || document === void 0 ? void 0 : document.postedBy
      };
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "inbox-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "filters-container"
  }, /*#__PURE__*/React.createElement(EventLink, {
    title: title,
    icon: iconName,
    links: links
  }), /*#__PURE__*/React.createElement(ApplicationCard$2, {
    t: t,
    data: getData(),
    onFilterChange: onFilterChange,
    isLoading: isLoading,
    onSearch: onSearch,
    searchParams: searchParams,
    searchFields: searchFields,
    responseData: data
  }))));
};

const Inbox$2 = ({
  tenants
}) => {
  const {
    t
  } = useTranslation();
  Digit.SessionStorage.set("ENGAGEMENT_TENANTS", tenants);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [searchParams, setSearchParams] = useState({
    tenantIds: tenantId,
    offset: 0,
    limit: 10
  });
  let isMobile = window.Digit.Utils.browser.isMobile();
  const {
    data: response,
    isLoading
  } = Digit.Hooks.engagement.useDocSearch(searchParams, {
    select: ({
      Documents,
      totalCount
    }) => ({
      documentsList: Documents,
      totalCount
    })
  });
  const onSearch = params => {
    var _params$ulbs, _params$ulbs$code, _params$ulbs2;
    const tenantIds = params !== null && params !== void 0 && (_params$ulbs = params.ulbs) !== null && _params$ulbs !== void 0 && (_params$ulbs$code = _params$ulbs.code) !== null && _params$ulbs$code !== void 0 && _params$ulbs$code.length ? params === null || params === void 0 ? void 0 : (_params$ulbs2 = params.ulbs) === null || _params$ulbs2 === void 0 ? void 0 : _params$ulbs2.code : tenantId;
    const {
      name,
      postedBy
    } = params;
    setSearchParams(prevSearchParams => ({
      ...prevSearchParams,
      name,
      postedBy,
      tenantIds
    }));
  };
  const handleFilterChange = data => {
    setSearchParams(prevSearchParams => ({
      ...prevSearchParams,
      ...data
    }));
  };
  const fetchNextPage = useCallback(() => {
    setSearchParams(prevSearchParams => ({
      ...prevSearchParams,
      offset: parseInt(prevSearchParams === null || prevSearchParams === void 0 ? void 0 : prevSearchParams.offset) + parseInt(prevSearchParams === null || prevSearchParams === void 0 ? void 0 : prevSearchParams.limit)
    }));
  }, []);
  const fetchPrevPage = () => {
    setSearchParams(prevSearchParams => ({
      ...prevSearchParams,
      offset: parseInt(prevSearchParams === null || prevSearchParams === void 0 ? void 0 : prevSearchParams.offset) - parseInt(prevSearchParams === null || prevSearchParams === void 0 ? void 0 : prevSearchParams.limit)
    }));
  };
  const handlePageSizeChange = e => {
    setSearchParams(prevSearchParams => ({
      ...prevSearchParams,
      limit: e.target.value
    }));
  };
  useEffect(() => {
    setSearchParams(prevSearchParams => ({
      ...prevSearchParams,
      tenantIds: tenantId
    }));
  }, [tenantId]);
  const getSearchFields = () => {
    return [{
      label: t('LABEL_FOR_ULB'),
      name: "ulbs",
      type: "ulb"
    }, {
      label: t('DOCUMENTS_DOCUMENT_HEADER'),
      name: "name"
    }, {
      label: t('CE_TABLE_DOCUMENT_POSTED_BY'),
      name: "postedBy"
    }];
  };
  const links = [{
    text: t('NEW_DOCUMENT_TEXT'),
    link: "/digit-ui/employee/engagement/documents/inbox/new-doc"
  }];
  if (isMobile) {
    return /*#__PURE__*/React.createElement(MobileInbox$2, {
      data: response === null || response === void 0 ? void 0 : response.documentsList,
      searchParams: searchParams,
      searchFields: getSearchFields(),
      t: t,
      onFilterChange: handleFilterChange,
      onSearch: onSearch,
      isLoading: isLoading,
      title: "DOCUMENTS_DOCUMENT_HEADER",
      iconName: "document",
      links: links
    });
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Header, null, t("DOCUMENTS_DOCUMENT_HEADER"), Number(response === null || response === void 0 ? void 0 : response.totalCount) ? /*#__PURE__*/React.createElement("p", {
    className: "inbox-count"
  }, Number(response === null || response === void 0 ? void 0 : response.totalCount)) : null), /*#__PURE__*/React.createElement(DocumentDesktopInbox, {
    t: t,
    isLoading: isLoading,
    data: response === null || response === void 0 ? void 0 : response.documentsList,
    links: links,
    searchParams: searchParams,
    onSearch: onSearch,
    searchFields: getSearchFields(),
    onFilterChange: handleFilterChange,
    pageSizeLimit: searchParams === null || searchParams === void 0 ? void 0 : searchParams.limit,
    totalRecords: response === null || response === void 0 ? void 0 : response.totalCount,
    title: "DOCUMENTS_DOCUMENT_HEADER",
    iconName: "document",
    links: links,
    currentPage: parseInt(searchParams.offset / searchParams.limit),
    onNextPage: fetchNextPage,
    onPrevPage: fetchPrevPage,
    onPageSizeChange: handlePageSizeChange
  }));
};

const SurveyListCard = ({
  header,
  about,
  activeTime,
  postedAt,
  responseStatus,
  hasResponded,
  onCardClick
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: "WhatsNewCard",
    onClick: onCardClick
  }, /*#__PURE__*/React.createElement("h2", null, header), /*#__PURE__*/React.createElement("p", null, about), /*#__PURE__*/React.createElement("div", {
    className: "surveyListclockDiv"
  }, /*#__PURE__*/React.createElement(Clock, null), " ", /*#__PURE__*/React.createElement("span", null, `Active till ${format(new Date(activeTime), "do MMM HH:mm")}`)), /*#__PURE__*/React.createElement("div", {
    className: "surveyListstatus"
  }, /*#__PURE__*/React.createElement("p", null, formatDistanceToNow(new Date(postedAt), {
    addSuffix: true
  })), /*#__PURE__*/React.createElement("span", {
    className: responseStatus === "CS_SURVEY_RESPONDED" ? 'surveyLisResponded' : 'surveyLisNotResponded'
  }, t(responseStatus))));
};

const isActive = (startDate, endDate) => {
  const currentDate = new Date().getTime();
  if (startDate < currentDate && currentDate <= endDate) {
    return true;
  }
  return false;
};
const SurveyList = () => {
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const tenantIds = Digit.ULBService.getCitizenCurrentTenant();
  const {
    data,
    isLoading: isLoadingSurveys
  } = Digit.Hooks.survey.useSearch({
    tenantIds
  }, {
    select: ({
      Surveys
    }) => {
      const allSurveys = Surveys.map(survey => {
        const isSurveyActive = isActive(survey.startDate, survey.endDate);
        let resStatus = "";
        if (isSurveyActive && survey.hasResponded) resStatus = "CS_SURVEY_RESPONDED";else if (isSurveyActive) resStatus = "CS_SURVEY_YT_TO_RESPOND";else resStatus = "CANNOT_RESPOND_MSG";
        return {
          hasResponded: false,
          responseStatus: resStatus,
          ...survey
        };
      });
      const activeSurveysList = [];
      const inactiveSurveysList = [];
      for (let survey of allSurveys) {
        if (survey.status === "ACTIVE" && isActive(survey.startDate, survey.endDate)) {
          activeSurveysList.push(survey);
        } else {
          inactiveSurveysList.push(survey);
        }
      }
      return {
        activeSurveysList,
        inactiveSurveysList
      };
    }
  });
  const handleCardClick = details => {
    if (!details.hasResponded) {
      history.push(`/digit-ui/citizen/engagement/surveys/fill-survey?applicationNumber=${details === null || details === void 0 ? void 0 : details.uuid}&tenantId=${details === null || details === void 0 ? void 0 : details.tenantId}`, details);
    } else {
      history.push("/digit-ui/citizen/engagement/surveys/show-survey", details);
    }
  };
  if (isLoadingSurveys) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "survey-list-container"
  }, /*#__PURE__*/React.createElement(Header, null, `${t("CS_COMMON_SURVEYS")} (${data === null || data === void 0 ? void 0 : data.activeSurveysList.length})`), data !== null && data !== void 0 && data.activeSurveysList && data.activeSurveysList.length ? data.activeSurveysList.map((data, index) => {
    return /*#__PURE__*/React.createElement("div", {
      className: "surveyListCardMargin"
    }, /*#__PURE__*/React.createElement(SurveyListCard, {
      header: data.title,
      about: data.description,
      activeTime: data.endDate,
      postedAt: data.auditDetails.createdTime,
      responseStatus: data.responseStatus,
      hasResponsed: data.status,
      key: index,
      onCardClick: () => handleCardClick(data)
    }));
  }) : /*#__PURE__*/React.createElement("div", {
    className: "centered-message"
  }, /*#__PURE__*/React.createElement("p", null, t("CS_NO_ACTIVE_SURVEYS"))), /*#__PURE__*/React.createElement(Header, null, `${t("CS_COMMON_INACTIVE_SURVEYS")} (${data.inactiveSurveysList.length})`), data !== null && data !== void 0 && data.inactiveSurveysList && data.inactiveSurveysList.length ? data.inactiveSurveysList.map((data, index) => {
    return /*#__PURE__*/React.createElement("div", {
      className: "surveyListCardMargin"
    }, /*#__PURE__*/React.createElement(SurveyListCard, {
      header: data.title,
      about: data.description,
      activeTime: data.endDate,
      postedAt: data.auditDetails.createdTime,
      responseStatus: data.responseStatus,
      hasResponsed: data.status,
      key: index
    }));
  }) : /*#__PURE__*/React.createElement("div", {
    className: "centered-message"
  }, /*#__PURE__*/React.createElement("p", null, t(`CS_NO_INACTIVE_SURVEYS`))));
};

const Actions$1 = ['EDIT_DOCUMENT', 'DELETE'];
const getUlbName$1 = tenantId => {
  var _ulbName$, _ulbName;
  let ulbName = tenantId === null || tenantId === void 0 ? void 0 : tenantId.split('.')[1];
  ulbName = `${(_ulbName$ = ulbName[0]) === null || _ulbName$ === void 0 ? void 0 : _ulbName$.toUpperCase()}${(_ulbName = ulbName) === null || _ulbName === void 0 ? void 0 : _ulbName.slice(1)} `;
  return ulbName;
};
const DocumentDetails$1 = ({
  location,
  match,
  history
}) => {
  var _details$description;
  let isMobile = window.Digit.Utils.browser.isMobile();
  const {
    t
  } = useTranslation();
  const {
    details
  } = location === null || location === void 0 ? void 0 : location.state;
  const [displayMenu, setDisplayMenu] = React.useState(false);
  const [showModal, setShowModal] = useState(false);
  const {
    data: ulbArray,
    isLoading: loading
  } = Digit.Hooks.useTenants();
  const currrentUlb = Digit.ULBService.getCurrentUlb();
  const stateId = Digit.ULBService.getStateId();
  const {
    data: categoryOptions,
    isLoading
  } = Digit.Hooks.engagement.useMDMS(stateId, "DocumentUploader", ["UlbLevelCategories"], {
    select: d => {
      var _d$DocumentUploader, _d$DocumentUploader$U, _d$DocumentUploader$U2;
      const data = d === null || d === void 0 ? void 0 : (_d$DocumentUploader = d.DocumentUploader) === null || _d$DocumentUploader === void 0 ? void 0 : (_d$DocumentUploader$U = _d$DocumentUploader.UlbLevelCategories) === null || _d$DocumentUploader$U === void 0 ? void 0 : (_d$DocumentUploader$U2 = _d$DocumentUploader$U.filter) === null || _d$DocumentUploader$U2 === void 0 ? void 0 : _d$DocumentUploader$U2.call(_d$DocumentUploader$U, e => e.ulb === currrentUlb.code);
      return data[0].categoryList.map(name => ({
        name
      }));
    }
  });
  function onActionSelect(action) {
    setDisplayMenu(false);
    if (action !== null && action !== void 0 && action.includes('EDIT')) {
      var _categoryOptions$filt;
      const DocumentEntity = {
        tenantIds: details === null || details === void 0 ? void 0 : details.tenantId,
        documentName: details === null || details === void 0 ? void 0 : details.name,
        docCategory: categoryOptions === null || categoryOptions === void 0 ? void 0 : (_categoryOptions$filt = categoryOptions.filter(item => item.name === (details === null || details === void 0 ? void 0 : details.category))) === null || _categoryOptions$filt === void 0 ? void 0 : _categoryOptions$filt[0],
        document: {
          filestoreId: {
            fileStoreId: details === null || details === void 0 ? void 0 : details.filestoreId
          },
          documentLink: details === null || details === void 0 ? void 0 : details.documentLink
        },
        ULB: {
          code: details === null || details === void 0 ? void 0 : details.tenantId
        },
        ...details
      };
      history.push({
        pathname: `/digit-ui/employee/engagement/documents/inbox/update`,
        state: {
          DocumentEntity
        }
      });
    }
    if (action !== null && action !== void 0 && action.includes('DELETE')) {
      setShowModal(true);
    }
  }
  function onModalSubmit() {
    setShowModal(false);
    const DocumentEntity = {
      ...details
    };
    history.push({
      pathname: `/digit-ui/employee/engagement/documents/delete-response`,
      state: {
        DocumentEntity
      }
    });
  }
  function onModalCancel() {
    setShowModal(false);
  }
  return /*#__PURE__*/React.createElement("div", null, showModal ? /*#__PURE__*/React.createElement(Confirmation, {
    t: t,
    heading: 'CONFIRM_DELETE_DOC',
    docName: details === null || details === void 0 ? void 0 : details.name,
    closeModal: () => setShowModal(!showModal),
    actionCancelLabel: 'CS_COMMON_CANCEL',
    actionCancelOnSubmit: onModalCancel,
    actionSaveLabel: 'ES_COMMON_Y_DEL',
    actionSaveOnSubmit: onModalSubmit
  }) : null, /*#__PURE__*/React.createElement(Header, null, t(`CE_DOCUMENT_DETAILS`)), /*#__PURE__*/React.createElement("div", {
    className: "notice_and_circular_main gap-ten"
  }, /*#__PURE__*/React.createElement("div", {
    className: "documentDetails_wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "documentDetails_row_items"
  }, /*#__PURE__*/React.createElement("p", {
    className: "documentDetails_title"
  }, `${t('ULB')}:`), " ", /*#__PURE__*/React.createElement("p", null, getUlbName$1(details === null || details === void 0 ? void 0 : details.tenantId)), " "), /*#__PURE__*/React.createElement("div", {
    className: "documentDetails_row_items"
  }, /*#__PURE__*/React.createElement("p", {
    className: "documentDetails_title"
  }, `${t('DOCUMENT_NAME')}:`), " ", /*#__PURE__*/React.createElement("p", null, details === null || details === void 0 ? void 0 : details.name), " "), /*#__PURE__*/React.createElement("div", {
    className: "documentDetails_row_items"
  }, /*#__PURE__*/React.createElement("p", {
    className: "documentDetails_title"
  }, `${t('DOCUMENT_CATEGORY')}:`), " ", /*#__PURE__*/React.createElement("p", null, t(details === null || details === void 0 ? void 0 : details.category)), " "), /*#__PURE__*/React.createElement("div", {
    className: "documentDetails_row_items"
  }, /*#__PURE__*/React.createElement("p", {
    className: "documentDetails_title"
  }, `${t('DCOUMENT_DESCRIPTION')}:`), " ", /*#__PURE__*/React.createElement("p", {
    className: "documentDetails__description"
  }, details !== null && details !== void 0 && (_details$description = details.description) !== null && _details$description !== void 0 && _details$description.length ? details === null || details === void 0 ? void 0 : details.description : 'NA'), " "), details !== null && details !== void 0 && details.filestoreId ? /*#__PURE__*/React.createElement("div", {
    className: "documentDetails_pdf"
  }, /*#__PURE__*/React.createElement("span", {
    className: "documentDetails_subheader"
  }, `${t('Document')}`), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100px'
    },
    onClick: () => openUploadedDocument(details === null || details === void 0 ? void 0 : details.filestoreId, details === null || details === void 0 ? void 0 : details.name)
  }, /*#__PURE__*/React.createElement(GenericFileIcon, null))) : null)), /*#__PURE__*/React.createElement(ActionBar, null, displayMenu ? /*#__PURE__*/React.createElement(Menu, {
    style: {
      width: isMobile ? 'full' : '240px'
    },
    localeKeyPrefix: "ES_CE",
    options: Actions$1,
    t: t,
    onSelect: onActionSelect
  }) : null, /*#__PURE__*/React.createElement(SubmitBar, {
    label: t("ES_COMMON_TAKE_ACTION"),
    onSubmit: () => setDisplayMenu(!displayMenu)
  })));
};

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

const FilterFormFieldsComponent = ({
  statuses,
  isInboxLoading,
  registerRef,
  controlFilterForm,
  setFilterFormValue,
  filterFormState,
  getFilterFormValue,
  localitiesForEmployeesCurrentTenant,
  loadingLocalitiesForEmployeesCurrentTenant
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(FilterFormField, null, /*#__PURE__*/React.createElement(Controller, {
    name: "status",
    control: controlFilterForm,
    render: ({
      ref,
      onChange,
      value
    }) => {
      return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: "filter-label"
      }, t("CS_SURVEY_STATUS")), /*#__PURE__*/React.createElement(Dropdown, {
        inputRef: ref,
        option: statuses,
        optionKey: "code",
        t: t,
        select: onChange,
        selected: value
      }));
    }
  })));
};

const SearchFormFieldsComponents = ({
  registerRef,
  controlSearchForm,
  searchFormState
}) => {
  var _searchFormState$erro, _searchFormState$erro2, _searchFormState$erro3, _searchFormState$erro4;
  const {
    t
  } = useTranslation();
  const ulbs = Digit.SessionStorage.get("ENGAGEMENT_TENANTS");
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const userInfo = Digit.SessionStorage.get("citizen.userRequestObject");
  const userUlbs = ulbs.filter(ulb => {
    var _userInfo$info, _userInfo$info$roles;
    return userInfo === null || userInfo === void 0 ? void 0 : (_userInfo$info = userInfo.info) === null || _userInfo$info === void 0 ? void 0 : (_userInfo$info$roles = _userInfo$info.roles) === null || _userInfo$info$roles === void 0 ? void 0 : _userInfo$info$roles.some(role => (role === null || role === void 0 ? void 0 : role.tenantId) === (ulb === null || ulb === void 0 ? void 0 : ulb.code));
  }).sort(alphabeticalSortFunctionForTenantsBasedOnName);
  const selectedTenat = useMemo(() => {
    const filtered = ulbs.filter(item => item.code === tenantId);
    return filtered;
  }, [ulbs]);
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(SearchField, null, /*#__PURE__*/React.createElement("label", null, t("LABEL_FOR_ULB")), /*#__PURE__*/React.createElement(Controller, {
    rules: {
      required: true
    },
    defaultValue: selectedTenat === null || selectedTenat === void 0 ? void 0 : selectedTenat[0],
    render: props => /*#__PURE__*/React.createElement(Dropdown, {
      option: userUlbs,
      optionKey: "i18nKey",
      selected: props.value,
      select: e => props.onChange(e),
      t: t
    }),
    name: "tenantIds",
    control: controlSearchForm
  })), /*#__PURE__*/React.createElement(SearchField, null, /*#__PURE__*/React.createElement("label", null, t("CS_SURVEY_NAME")), /*#__PURE__*/React.createElement(TextInput, {
    name: "title",
    type: "text",
    inputRef: registerRef({
      maxLength: {
        value: 60,
        message: t("EXCEEDS_60_CHAR_LIMIT")
      }
    })
  }), /*#__PURE__*/React.createElement(CardLabelError$1, null, searchFormState === null || searchFormState === void 0 ? void 0 : (_searchFormState$erro = searchFormState.errors) === null || _searchFormState$erro === void 0 ? void 0 : (_searchFormState$erro2 = _searchFormState$erro["title"]) === null || _searchFormState$erro2 === void 0 ? void 0 : _searchFormState$erro2.message)), /*#__PURE__*/React.createElement(SearchField, null, /*#__PURE__*/React.createElement("label", null, t("EVENTS_POSTEDBY_LABEL")), /*#__PURE__*/React.createElement(TextInput, {
    name: "postedBy",
    type: "text",
    inputRef: registerRef({
      maxLength: {
        value: 30,
        message: t("EXCEEDS_30_CHAR_LIMIT")
      }
    })
  }), /*#__PURE__*/React.createElement(CardLabelError$1, null, searchFormState === null || searchFormState === void 0 ? void 0 : (_searchFormState$erro3 = searchFormState.errors) === null || _searchFormState$erro3 === void 0 ? void 0 : (_searchFormState$erro4 = _searchFormState$erro3["postedBy"]) === null || _searchFormState$erro4 === void 0 ? void 0 : _searchFormState$erro4.message)));
};

const useInboxTableConfig = ({
  parentRoute,
  onPageSizeChange,
  formState,
  totalCount,
  table,
  dispatch,
  inboxStyles: _inboxStyles = {}
}) => {
  var _formState$tableForm, _formState$tableForm2, _formState$tableForm7, _formState$searchForm;
  const GetCell = value => /*#__PURE__*/React.createElement("span", {
    className: "cell-text styled-cell"
  }, value);
  const GetStatusCell = value => (value === null || value === void 0 ? void 0 : value.toLowerCase()) === "active" ? /*#__PURE__*/React.createElement("span", {
    className: "sla-cell-success"
  }, value) : /*#__PURE__*/React.createElement("span", {
    className: "sla-cell-error"
  }, value);
  const {
    t
  } = useTranslation();
  const tableColumnConfig = useMemo(() => {
    return [{
      Header: t("CS_SURVEY_TITLE"),
      accessor: "uuid",
      Cell: ({
        row
      }) => {
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Link, {
          to: `${parentRoute}/surveys/inbox/details/${row.original["uuid"]}`
        }, /*#__PURE__*/React.createElement("span", {
          className: "link"
        }, row.original["title"])));
      }
    }, {
      Header: t("EVENTS_START_DATE_LABEL"),
      accessor: "startDate",
      Cell: ({
        row
      }) => {
        var _row$original, _row$original2;
        return (_row$original = row.original) !== null && _row$original !== void 0 && _row$original.startDate ? GetCell(format(new Date((_row$original2 = row.original) === null || _row$original2 === void 0 ? void 0 : _row$original2.startDate), 'dd/MM/yyyy')) : "";
      }
    }, {
      Header: t("EVENTS_END_DATE_LABEL"),
      accessor: "endDate",
      Cell: ({
        row
      }) => {
        var _row$original3, _row$original4;
        return (_row$original3 = row.original) !== null && _row$original3 !== void 0 && _row$original3.endDate ? GetCell(format(new Date((_row$original4 = row.original) === null || _row$original4 === void 0 ? void 0 : _row$original4.endDate), 'dd/MM/yyyy')) : "";
      }
    }, {
      Header: t("CS_RESPONSE_COUNT"),
      accessor: "answersCount",
      Cell: ({
        row
      }) => {
        var _row$original5, _row$original6;
        return (_row$original5 = row.original) !== null && _row$original5 !== void 0 && _row$original5.answersCount ? GetCell(Number((_row$original6 = row.original) === null || _row$original6 === void 0 ? void 0 : _row$original6.answersCount)) : "-";
      }
    }, {
      Header: /*#__PURE__*/React.createElement("div", null, t("EVENTS_STATUS_LABEL"), /*#__PURE__*/React.createElement("div", {
        className: "tooltip",
        style: {
          marginLeft: "5px"
        }
      }, /*#__PURE__*/React.createElement(InfoBannerIcon, {
        fill: "#0b0c0c",
        style: true
      }), /*#__PURE__*/React.createElement("span", {
        className: "tooltiptext",
        style: {
          whiteSpace: "pre-wrap",
          fontSize: "small",
          wordWrap: "break-word",
          width: "120px",
          marginLeft: "15px",
          marginBottom: "-260px"
        }
      }, `${t(`SURVEY_STATUS_TOOLTIP`)}`))),
      accessor: "status",
      Cell: ({
        row
      }) => {
        var _row$original7;
        return GetStatusCell((_row$original7 = row.original) === null || _row$original7 === void 0 ? void 0 : _row$original7.status);
      }
    }, {
      Header: t("EVENTS_POSTEDBY_LABEL"),
      accessor: row => row.postedBy
    }, {
      Header: t("CS_SURVEY_RESULTS"),
      accessor: "results",
      Cell: ({
        row
      }) => {
        return /*#__PURE__*/React.createElement("div", {
          style: {
            "display": "flex",
            "justifyContent": "center"
          }
        }, /*#__PURE__*/React.createElement(Link, {
          to: `${parentRoute}/surveys/inbox/results/${row.original["uuid"]}`
        }, /*#__PURE__*/React.createElement("span", {
          className: "link"
        }, /*#__PURE__*/React.createElement("svg", {
          width: "20",
          height: "18",
          viewBox: "0 0 20 18",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, /*#__PURE__*/React.createElement("path", {
          d: "M5.5 18H0V6H5.5V18ZM12.75 0H7.25V18H12.75V0ZM20 8H14.5V18H20V8Z",
          fill: "#a82227"
        })))));
      }
    }];
  });
  return {
    getCellProps: cellInfo => {
      return {
        style: {
          padding: "20px 18px",
          fontSize: "16px"
        }
      };
    },
    disableSort: false,
    autoSort: true,
    manualPagination: true,
    initSortI: "endDate",
    onPageSizeChange: onPageSizeChange,
    currentPage: parseInt(((_formState$tableForm = formState.tableForm) === null || _formState$tableForm === void 0 ? void 0 : _formState$tableForm.offset) / ((_formState$tableForm2 = formState.tableForm) === null || _formState$tableForm2 === void 0 ? void 0 : _formState$tableForm2.limit)),
    onNextPage: () => {
      var _formState$tableForm3, _formState$tableForm4;
      return dispatch({
        action: "mutateTableForm",
        data: {
          ...formState.tableForm,
          offset: parseInt((_formState$tableForm3 = formState.tableForm) === null || _formState$tableForm3 === void 0 ? void 0 : _formState$tableForm3.offset) + parseInt((_formState$tableForm4 = formState.tableForm) === null || _formState$tableForm4 === void 0 ? void 0 : _formState$tableForm4.limit)
        }
      });
    },
    onPrevPage: () => {
      var _formState$tableForm5, _formState$tableForm6;
      return dispatch({
        action: "mutateTableForm",
        data: {
          ...formState.tableForm,
          offset: parseInt((_formState$tableForm5 = formState.tableForm) === null || _formState$tableForm5 === void 0 ? void 0 : _formState$tableForm5.offset) - parseInt((_formState$tableForm6 = formState.tableForm) === null || _formState$tableForm6 === void 0 ? void 0 : _formState$tableForm6.limit)
        }
      });
    },
    pageSizeLimit: (_formState$tableForm7 = formState.tableForm) === null || _formState$tableForm7 === void 0 ? void 0 : _formState$tableForm7.limit,
    totalRecords: parseInt(totalCount),
    onSearch: formState === null || formState === void 0 ? void 0 : (_formState$searchForm = formState.searchForm) === null || _formState$searchForm === void 0 ? void 0 : _formState$searchForm.message,
    data: table,
    columns: tableColumnConfig,
    noResultsMessage: "CS_NO_SURVEYS_FOUND",
    inboxStyles: {
      ..._inboxStyles
    }
  };
};

const useInboxMobileCardsData = ({
  parentRoute,
  table
}) => {
  const {
    t
  } = useTranslation();
  const dataForMobileInboxCards = table === null || table === void 0 ? void 0 : table.map(({
    title,
    startDate,
    endDate,
    answersCount,
    status,
    postedBy
  }) => ({
    [t("CS_SURVEY_TITLE")]: title,
    [t("EVENTS_START_DATE_LABEL")]: format(new Date(startDate), 'dd/MM/yyyy'),
    [t("EVENTS_END_DATE_LABEL")]: format(new Date(endDate), 'dd/MM/yyyy'),
    [t("CS_RESPONSE_COUNT")]: answersCount,
    [t("EVENTS_STATUS_LABEL")]: status,
    [t("EVENTS_POSTEDBY_LABEL")]: postedBy
  }));
  return {
    data: dataForMobileInboxCards,
    linkPrefix: `${parentRoute}/inbox/`,
    serviceRequestIdKey: t("TL_COMMON_TABLE_COL_APP_NO")
  };
};

const Inbox$3 = ({
  parentRoute
}) => {
  const {
    t
  } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const ulbs = Digit.SessionStorage.get("ENGAGEMENT_TENANTS");
  const userInfo = Digit.UserService.getUser().info;
  const userUlbs = ulbs.filter(ulb => {
    var _userInfo$roles;
    return userInfo === null || userInfo === void 0 ? void 0 : (_userInfo$roles = userInfo.roles) === null || _userInfo$roles === void 0 ? void 0 : _userInfo$roles.some(role => (role === null || role === void 0 ? void 0 : role.tenantId) === (ulb === null || ulb === void 0 ? void 0 : ulb.code));
  });
  const statuses = [{
    code: "ALL",
    name: `${t("ES_COMMON_ALL")}`
  }, {
    code: "ACTIVE",
    name: `${t("ES_COMMON_ACTIVE")}`
  }, {
    code: "INACTIVE",
    name: `${t("ES_COMMON_INACTIVE")}`
  }];
  const searchFormDefaultValues = {
    tenantIds: userUlbs[0],
    postedBy: "",
    title: ""
  };
  const filterFormDefaultValues = {
    status: statuses[0]
  };
  const tableOrderFormDefaultValues = {
    sortBy: "",
    limit: 10,
    offset: 0,
    sortOrder: "DESC"
  };
  function formReducer(state, payload) {
    switch (payload.action) {
      case "mutateSearchForm":
        Digit.SessionStorage.set("CITIZENSURVEY.INBOX", {
          ...state,
          searchForm: payload.data
        });
        return {
          ...state,
          searchForm: payload.data
        };
      case "mutateFilterForm":
        Digit.SessionStorage.set("CITIZENSURVEY.INBOX", {
          ...state,
          filterForm: payload.data
        });
        return {
          ...state,
          filterForm: payload.data
        };
      case "mutateTableForm":
        Digit.SessionStorage.set("CITIZENSURVEY.INBOX", {
          ...state,
          tableForm: payload.data
        });
        return {
          ...state,
          tableForm: payload.data
        };
    }
  }
  const InboxObjectInSessionStorage = Digit.SessionStorage.get("CITIZENSURVEY.INBOX");
  const onSearchFormReset = setSearchFormValue => {
    setSearchFormValue("postedBy", "");
    setSearchFormValue("title", "");
    setSearchFormValue("tenantIds", tenantId);
    dispatch({
      action: "mutateSearchForm",
      data: searchFormDefaultValues
    });
  };
  const onFilterFormReset = setFilterFormValue => {
    setFilterFormValue("status", statuses[0]);
    dispatch({
      action: "mutateFilterForm",
      data: filterFormDefaultValues
    });
  };
  const formInitValue = useMemo(() => {
    return InboxObjectInSessionStorage || {
      filterForm: filterFormDefaultValues,
      searchForm: searchFormDefaultValues,
      tableForm: tableOrderFormDefaultValues
    };
  }, [Object.values((InboxObjectInSessionStorage === null || InboxObjectInSessionStorage === void 0 ? void 0 : InboxObjectInSessionStorage.filterForm) || {}), Object.values((InboxObjectInSessionStorage === null || InboxObjectInSessionStorage === void 0 ? void 0 : InboxObjectInSessionStorage.searchForm) || {}), Object.values((InboxObjectInSessionStorage === null || InboxObjectInSessionStorage === void 0 ? void 0 : InboxObjectInSessionStorage.tableForm) || {})]);
  const [formState, dispatch] = useReducer(formReducer, formInitValue);
  const onPageSizeChange = e => {
    dispatch({
      action: "mutateTableForm",
      data: {
        ...formState.tableForm,
        limit: e.target.value
      }
    });
  };
  const {
    data: {
      Surveys,
      TotalCount
    } = {},
    isLoading: isInboxLoading
  } = Digit.Hooks.survey.useSurveyInbox(formState);
  const PropsForInboxLinks = {
    logoIcon: /*#__PURE__*/React.createElement(DocumentIcon, null),
    headerText: "CS_COMMON_SURVEYS",
    links: [{
      text: t("CS_COMMON_NEW_SURVEY"),
      link: "/digit-ui/employee/engagement/surveys/inbox/create"
    }]
  };
  const SearchFormFields = useCallback(({
    registerRef,
    searchFormState,
    controlSearchForm
  }) => /*#__PURE__*/React.createElement(SearchFormFieldsComponents, {
    registerRef,
    searchFormState,
    controlSearchForm
  }), []);
  const FilterFormFields = useCallback(({
    registerRef,
    controlFilterForm,
    setFilterFormValue,
    getFilterFormValue
  }) => /*#__PURE__*/React.createElement(FilterFormFieldsComponent, {
    statuses,
    registerRef,
    controlFilterForm,
    setFilterFormValue,
    filterFormState: formState === null || formState === void 0 ? void 0 : formState.filterForm,
    getFilterFormValue
  }), [statuses]);
  const onSearchFormSubmit = data => {
    dispatch({
      action: "mutateTableForm",
      data: {
        ...formState.tableForm,
        offset: 0
      }
    });
    data.hasOwnProperty("") ? data === null || data === void 0 ? true : delete data[""] : null;
    dispatch({
      action: "mutateSearchForm",
      data
    });
  };
  const onFilterFormSubmit = data => {
    data.hasOwnProperty("") ? data === null || data === void 0 ? true : delete data[""] : null;
    dispatch({
      action: "mutateFilterForm",
      data
    });
  };
  const propsForSearchForm = {
    SearchFormFields,
    onSearchFormSubmit,
    searchFormDefaultValues: formState === null || formState === void 0 ? void 0 : formState.searchForm,
    resetSearchFormDefaultValues: searchFormDefaultValues,
    onSearchFormReset
  };
  const propsForFilterForm = {
    FilterFormFields,
    onFilterFormSubmit,
    filterFormDefaultValues: formState === null || formState === void 0 ? void 0 : formState.filterForm,
    resetFilterFormDefaultValues: filterFormDefaultValues,
    onFilterFormReset
  };
  const propsForInboxTable = useInboxTableConfig({
    ...{
      parentRoute,
      onPageSizeChange,
      formState,
      totalCount: TotalCount,
      table: Surveys,
      noResultsMessage: "CS_SURVEYS_NOT_FOUND",
      dispatch,
      inboxStyles: {
        overflowX: "scroll",
        overflowY: "hidden"
      }
    }
  });
  const propsForInboxMobileCards = useInboxMobileCardsData({
    parentRoute,
    table: Surveys
  });
  return /*#__PURE__*/React.createElement(InboxComposer, _extends({
    isInboxLoading,
    PropsForInboxLinks
  }, propsForSearchForm, propsForFilterForm, {
    propsForInboxMobileCards,
    propsForInboxTable,
    formState
  }));
};

const SurveyDetailsForms = ({
  t,
  registerRef,
  controlSurveyForm,
  surveyFormState,
  surveyFormData,
  disableInputs,
  enableDescriptionOnly
}) => {
  var _surveyFormState$erro, _surveyFormState$erro2, _surveyFormState$erro3, _surveyFormState$erro4, _surveyFormState$erro5, _surveyFormState$erro6, _surveyFormState$erro7;
  const ulbs = Digit.SessionStorage.get("ENGAGEMENT_TENANTS");
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const userInfo = Digit.UserService.getUser().info;
  const userUlbs = ulbs.filter(ulb => {
    var _userInfo$roles;
    return userInfo === null || userInfo === void 0 ? void 0 : (_userInfo$roles = userInfo.roles) === null || _userInfo$roles === void 0 ? void 0 : _userInfo$roles.some(role => (role === null || role === void 0 ? void 0 : role.tenantId) === (ulb === null || ulb === void 0 ? void 0 : ulb.code));
  }).sort(alphabeticalSortFunctionForTenantsBasedOnName);
  const selectedTenat = useMemo(() => {
    const filtered = ulbs.filter(item => item.code === tenantId);
    return filtered;
  }, [ulbs]);
  const checkRemovableTagDisabled = (isFormDisabled, isActiveSurveyEdit) => {
    if (!isActiveSurveyEdit && isFormDisabled) {
      return true;
    } else if (isActiveSurveyEdit) {
      return true;
    }
    return false;
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "surveydetailsform-wrapper"
  }, /*#__PURE__*/React.createElement("span", {
    className: "surveyformfield"
  }, /*#__PURE__*/React.createElement("label", null, `${t("LABEL_FOR_ULB")} * `), /*#__PURE__*/React.createElement(Controller, {
    name: "tenantIds",
    control: controlSurveyForm,
    defaultValue: selectedTenat,
    rules: {
      required: true
    },
    render: props => {
      const renderRemovableTokens = useMemo(() => {
        var _props$value;
        return props === null || props === void 0 ? void 0 : (_props$value = props.value) === null || _props$value === void 0 ? void 0 : _props$value.map((ulb, index) => {
          return /*#__PURE__*/React.createElement(RemoveableTag, {
            key: index,
            text: ulb.name,
            disabled: checkRemovableTagDisabled(disableInputs, enableDescriptionOnly),
            onClick: () => {
              var _props$value2;
              props.onChange(props === null || props === void 0 ? void 0 : (_props$value2 = props.value) === null || _props$value2 === void 0 ? void 0 : _props$value2.filter(loc => loc.code !== ulb.code));
            }
          });
        });
      }, [props === null || props === void 0 ? void 0 : props.value]);
      return /*#__PURE__*/React.createElement("div", {
        style: {
          display: "grid",
          gridAutoFlow: "row"
        }
      }, /*#__PURE__*/React.createElement(MultiSelectDropdown, {
        options: userUlbs,
        isSurvey: true,
        optionsKey: "i18nKey",
        props: props,
        isPropsNeeded: true,
        onSelect: e => {
          var _surveyFormData, _surveyFormData$filte;
          props.onChange([...(((_surveyFormData = surveyFormData("tenantIds")) === null || _surveyFormData === void 0 ? void 0 : (_surveyFormData$filte = _surveyFormData.filter) === null || _surveyFormData$filte === void 0 ? void 0 : _surveyFormData$filte.call(_surveyFormData, f => e.code !== (f === null || f === void 0 ? void 0 : f.code))) || []), e]);
        },
        selected: props === null || props === void 0 ? void 0 : props.value,
        defaultLabel: t("ES_COMMON_USER_ULBS"),
        defaultUnit: t("CS_SELECTED_TEXT")
      }));
    }
  }), (surveyFormState === null || surveyFormState === void 0 ? void 0 : (_surveyFormState$erro = surveyFormState.errors) === null || _surveyFormState$erro === void 0 ? void 0 : _surveyFormState$erro.tenantIds) && /*#__PURE__*/React.createElement(CardLabelError$1, null, t("ES_ERROR_REQUIRED"))), /*#__PURE__*/React.createElement("span", {
    className: "surveyformfield"
  }, /*#__PURE__*/React.createElement("label", null, `${t("CS_SURVEY_NAME")} * `), /*#__PURE__*/React.createElement(TextInput, {
    name: "title",
    type: "text",
    inputRef: registerRef({
      required: t("ES_ERROR_REQUIRED"),
      maxLength: {
        value: 60,
        message: t("EXCEEDS_60_CHAR_LIMIT")
      },
      pattern: {
        value: /^[A-Za-z_-][A-Za-z0-9_\ -]*$/,
        message: t("ES_SURVEY_DONT_START_WITH_NUMBER")
      }
    }),
    disable: disableInputs
  }), (surveyFormState === null || surveyFormState === void 0 ? void 0 : (_surveyFormState$erro2 = surveyFormState.errors) === null || _surveyFormState$erro2 === void 0 ? void 0 : _surveyFormState$erro2.title) && /*#__PURE__*/React.createElement(CardLabelError$1, null, surveyFormState === null || surveyFormState === void 0 ? void 0 : (_surveyFormState$erro3 = surveyFormState.errors) === null || _surveyFormState$erro3 === void 0 ? void 0 : (_surveyFormState$erro4 = _surveyFormState$erro3["title"]) === null || _surveyFormState$erro4 === void 0 ? void 0 : _surveyFormState$erro4.message)), /*#__PURE__*/React.createElement("span", {
    className: "surveyformfield"
  }, /*#__PURE__*/React.createElement("label", null, `${t("CS_SURVEY_DESCRIPTION")} `), /*#__PURE__*/React.createElement(TextInput, {
    name: "description",
    type: "text",
    inputRef: registerRef({
      maxLength: {
        value: 140,
        message: t("EXCEEDS_140_CHAR_LIMIT")
      },
      pattern: {
        value: /^[A-Za-z_-][A-Za-z0-9_\ -]*$/,
        message: t("ES_SURVEY_DONT_START_WITH_NUMBER")
      }
    }),
    disable: enableDescriptionOnly ? !enableDescriptionOnly : disableInputs
  }), (surveyFormState === null || surveyFormState === void 0 ? void 0 : (_surveyFormState$erro5 = surveyFormState.errors) === null || _surveyFormState$erro5 === void 0 ? void 0 : _surveyFormState$erro5.description) && /*#__PURE__*/React.createElement(CardLabelError$1, null, surveyFormState === null || surveyFormState === void 0 ? void 0 : (_surveyFormState$erro6 = surveyFormState.errors) === null || _surveyFormState$erro6 === void 0 ? void 0 : (_surveyFormState$erro7 = _surveyFormState$erro6["description"]) === null || _surveyFormState$erro7 === void 0 ? void 0 : _surveyFormState$erro7.message)));
};

const Checkboxes = ({
  t,
  options: _options = checkboxlist,
  updateOption,
  addOption,
  removeOption,
  isPartiallyEnabled,
  createNewSurvey,
  formDisabled,
  maxLength,
  titleHover,
  inputRef,
  labelstyle,
  isInputDisabled
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "options_checkboxes"
  }, _options.map((title, index) => /*#__PURE__*/React.createElement(CheckBoxOption, {
    key: index,
    index: index,
    title: title,
    updateOption: updateOption,
    removeOption: removeOption,
    maxLength: maxLength,
    titleHover: titleHover,
    inputRef: inputRef,
    labelstyle: labelstyle,
    isPartiallyEnabled: isPartiallyEnabled,
    isInputDisabled: isInputDisabled,
    formDisabled: formDisabled
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: "unstyled-button link",
    type: "button",
    disabled: !createNewSurvey && formDisabled || (isPartiallyEnabled ? !isPartiallyEnabled : formDisabled),
    onClick: () => addOption()
  }, t("CS_COMMON_ADD_OPTION"))));
};
const CheckBoxOption = ({
  index,
  title,
  updateOption,
  removeOption,
  maxLength,
  titleHover,
  inputRef,
  labelstyle,
  isPartiallyEnabled,
  isInputDisabled,
  formDisabled
}) => {
  const [optionTitle, setOptionTitle] = useState(title);
  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
    updateOption({
      value: optionTitle,
      id: index
    });
  }, [optionTitle]);
  return /*#__PURE__*/React.createElement("div", {
    className: "optioncheckboxwrapper"
  }, /*#__PURE__*/React.createElement(CheckBox, {
    disable: isInputDisabled
  }), /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    type: "text",
    value: optionTitle,
    onChange: ev => setOptionTitle(ev.target.value),
    onBlur: () => setIsFocused(false),
    onFocus: () => setIsFocused(true),
    className: isFocused ? "simple_editable-input" : "simple_readonly-input",
    maxLength: maxLength,
    title: titleHover,
    style: {
      ...labelstyle
    },
    disabled: isPartiallyEnabled ? !isPartiallyEnabled : formDisabled
  }), /*#__PURE__*/React.createElement("div", {
    className: "pointer",
    onClick: () => removeOption(index)
  }, /*#__PURE__*/React.createElement(CloseSvg, null)));
};

const MultipleChoice = ({
  t,
  options: _options = checkboxlist,
  updateOption,
  addOption,
  removeOption,
  createNewSurvey,
  isPartiallyEnabled,
  formDisabled,
  inputRef,
  maxLength,
  titleHover,
  isInputDisabled
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "options_checkboxes"
  }, _options.map((title, index) => /*#__PURE__*/React.createElement(RadioButtonOption, {
    key: index,
    index: index,
    title: title,
    updateOption: updateOption,
    removeOption: removeOption,
    inputRef: inputRef,
    maxLength: maxLength,
    titleHover: titleHover,
    isPartiallyEnabled: isPartiallyEnabled,
    isInputDisabled: isInputDisabled,
    formDisabled: formDisabled
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: "unstyled-button link",
    type: "button",
    disabled: !createNewSurvey && formDisabled || (isPartiallyEnabled ? !isPartiallyEnabled : formDisabled),
    onClick: () => addOption()
  }, t("CS_COMMON_ADD_OPTION"))));
};
const RadioButtonOption = ({
  index,
  title,
  updateOption,
  removeOption,
  inputRef,
  maxLength,
  titleHover,
  isPartiallyEnabled,
  isInputDisabled,
  formDisabled
}) => {
  const [optionTitle, setOptionTitle] = useState(title);
  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
    updateOption({
      value: optionTitle,
      id: index
    });
  }, [optionTitle]);
  return /*#__PURE__*/React.createElement("div", {
    className: "optionradiobtnwrapper"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    className: "customradiobutton",
    disabled: isInputDisabled
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    ref: inputRef,
    value: optionTitle,
    onChange: ev => setOptionTitle(ev.target.value),
    onBlur: () => setIsFocused(false),
    onFocus: () => setIsFocused(true),
    className: isFocused ? "simple_editable-input" : "simple_readonly-input",
    maxLength: maxLength,
    title: titleHover,
    disabled: isPartiallyEnabled ? !isPartiallyEnabled : formDisabled
  }), /*#__PURE__*/React.createElement("div", {
    className: "pointer",
    onClick: () => removeOption(index)
  }, /*#__PURE__*/React.createElement(CloseSvg, null)));
};

const NewSurveyForm = ({
  t,
  index,
  questionStatement,
  type,
  uuid,
  qorder,
  required,
  options,
  disableInputs,
  dispatch,
  isPartiallyEnabled,
  addOption,
  formDisabled,
  controlSurveyForm
}) => {
  var _formState$errors3, _formState$errors4;
  const dropdownOptions = [{
    title: t("Surveys_Short_Answer"),
    i18Key: "SHORT_ANSWER_TYPE",
    value: "SHORT_ANSWER_TYPE"
  }, {
    title: t("Surveys_Multiple_Choice"),
    i18Key: "MULTIPLE_ANSWER_TYPE",
    value: "MULTIPLE_ANSWER_TYPE"
  }, {
    title: t("Surveys_Check_Boxes"),
    i18Key: "CHECKBOX_ANSWER_TYPE",
    value: "CHECKBOX_ANSWER_TYPE"
  }, {
    title: t("Surveys_Paragraph"),
    i18Key: "LONG_ANSWER_TYPE",
    value: "LONG_ANSWER_TYPE"
  }, {
    title: t("Surveys_Date"),
    i18Key: "DATE_ANSWER_TYPE",
    value: "DATE_ANSWER_TYPE"
  }, {
    title: t("Surveys_Time"),
    i18Key: "TIME_ANSWER_TYPE",
    value: "TIME_ANSWER_TYPE"
  }];
  const selectedType = dropdownOptions.filter(option => (option === null || option === void 0 ? void 0 : option.value) === (typeof type === "object" ? type.value : type));
  const isInputDisabled = window.location.href.includes("/employee/engagement/");
  const [surveyQuestionConfig, setSurveyQuestionConfig] = useState({
    questionStatement,
    type: type ? selectedType === null || selectedType === void 0 ? void 0 : selectedType[0] : {
      title: t("SHORT_ANSWER_TYPE"),
      i18Key: "SHORT_ANSWER_TYPE",
      value: "SHORT_ANSWER_TYPE"
    },
    required,
    options: (options === null || options === void 0 ? void 0 : options.length) > 0 ? options : [`${t("CMN_OPTION")} 1`],
    uuid: uuid,
    qorder
  });
  const {
    register,
    formState
  } = useFormContext();
  useEffect(() => {
    setSurveyQuestionConfig({
      questionStatement,
      type: type ? selectedType === null || selectedType === void 0 ? void 0 : selectedType[0] : {
        title: t("SHORT_ANSWER_TYPE"),
        i18Key: "SHORT_ANSWER_TYPE",
        value: "SHORT_ANSWER_TYPE"
      },
      required,
      options: (options === null || options === void 0 ? void 0 : options.length) > 0 ? options : [`${t("CMN_OPTION")} 1`],
      uuid: uuid,
      qorder
    });
  }, [questionStatement]);
  const handleAddOption = () => setSurveyQuestionConfig(prevState => {
    const updatedState = {
      ...prevState
    };
    updatedState.options.push(`${t("CMN_OPTION")} ${updatedState.options.length + 1}`);
    return updatedState;
  });
  const handleUpdateOption = ({
    value,
    id
  }) => {
    setSurveyQuestionConfig(prevState => {
      const updatedState = {
        ...prevState
      };
      updatedState.options.splice(id, 1, value);
      return updatedState;
    });
  };
  const handleRemoveOption = id => {
    if (surveyQuestionConfig.options.length === 1 || (isPartiallyEnabled ? !isPartiallyEnabled : formDisabled)) return;
    setSurveyQuestionConfig(prevState => {
      const updatedState = {
        ...prevState
      };
      updatedState.options.splice(id, 1);
      return updatedState;
    });
  };
  useEffect(() => {
    dispatch({
      type: "updateForm",
      payload: {
        index: index,
        formConfig: surveyQuestionConfig
      }
    });
  }, [surveyQuestionConfig]);
  const renderAnswerComponent = type => {
    var _formState$errors, _formState$errors$lon, _formState$errors2, _formState$errors2$sh;
    switch (type === null || type === void 0 ? void 0 : type.value) {
      case "LONG_ANSWER_TYPE":
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TextArea, {
          placeholder: t("LONG_ANSWER_TYPE"),
          disabled: isInputDisabled,
          name: "longAnsDescription",
          inputRef: register({
            maxLength: {
              value: 500,
              message: t("EXCEEDS_500_CHAR_LIMIT")
            }
          })
        }), (formState === null || formState === void 0 ? void 0 : formState.errors) && /*#__PURE__*/React.createElement(CardLabelError$1, null, formState === null || formState === void 0 ? void 0 : (_formState$errors = formState.errors) === null || _formState$errors === void 0 ? void 0 : (_formState$errors$lon = _formState$errors.longAnsDescription) === null || _formState$errors$lon === void 0 ? void 0 : _formState$errors$lon.message));
      case "DATE_ANSWER_TYPE":
        return /*#__PURE__*/React.createElement(DatePicker, {
          stylesForInput: {
            width: "calc(100% - 290px)"
          },
          style: {
            width: "202px"
          },
          disabled: isInputDisabled
        });
      case "TIME_ANSWER_TYPE":
        return /*#__PURE__*/React.createElement(TextInput, {
          type: "time",
          textInputStyle: {
            width: "202px"
          },
          disable: isInputDisabled
        });
      case "MULTIPLE_ANSWER_TYPE":
        return /*#__PURE__*/React.createElement(MultipleChoice, {
          maxLength: 60,
          titleHover: t("MAX_LENGTH_60"),
          t: t,
          addOption: handleAddOption,
          updateOption: handleUpdateOption,
          removeOption: handleRemoveOption,
          options: surveyQuestionConfig === null || surveyQuestionConfig === void 0 ? void 0 : surveyQuestionConfig.options,
          createNewSurvey: addOption,
          isInputDisabled: isInputDisabled,
          isPartiallyEnabled: isPartiallyEnabled,
          formDisabled: formDisabled
        });
      case "CHECKBOX_ANSWER_TYPE":
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Checkboxes, {
          t: t,
          addOption: handleAddOption,
          updateOption: handleUpdateOption,
          removeOption: handleRemoveOption,
          options: surveyQuestionConfig === null || surveyQuestionConfig === void 0 ? void 0 : surveyQuestionConfig.options,
          isInputDisabled: isInputDisabled,
          isPartiallyEnabled: isPartiallyEnabled,
          createNewSurvey: addOption,
          formDisabled: formDisabled,
          maxLength: 60,
          titleHover: t("MAX_LENGTH_60"),
          labelstyle: {
            marginLeft: "-20px"
          }
        }));
      default:
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TextInput, {
          placeholder: t("SHORT_ANSWER_TYPE"),
          name: "shortAnsDescription",
          disabled: isInputDisabled,
          inputRef: register({
            maxLength: {
              value: 200,
              message: t("EXCEEDS_200_CHAR_LIMIT")
            }
          })
        }), (formState === null || formState === void 0 ? void 0 : formState.errors) && /*#__PURE__*/React.createElement(CardLabelError$1, null, formState === null || formState === void 0 ? void 0 : (_formState$errors2 = formState.errors) === null || _formState$errors2 === void 0 ? void 0 : (_formState$errors2$sh = _formState$errors2.shortAnsDescription) === null || _formState$errors2$sh === void 0 ? void 0 : _formState$errors2$sh.message));
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "newSurveyForm_wrapper"
  }, /*#__PURE__*/React.createElement("span", {
    className: "newSurveyForm_quesno"
  }, `${t("CS_COMMON_QUESTION")} ${index + 1} `), /*#__PURE__*/React.createElement("span", {
    className: "newSurveyForm_mainsection"
  }, /*#__PURE__*/React.createElement("div", {
    className: "newSurveyForm_questions"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "75%"
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    placeholder: t("CS_COMMON_TYPE_QUESTION"),
    value: surveyQuestionConfig.questionStatement,
    onChange: ev => {
      setSurveyQuestionConfig(prevState => ({
        ...prevState,
        questionStatement: ev.target.value
      }));
    },
    textInputStyle: {
      width: "100%"
    },
    name: `QUESTION_SURVEY_${index}`,
    disable: disableInputs,
    inputRef: register({
      required: t("ES_ERROR_REQUIRED"),
      maxLength: {
        value: 100,
        message: t("EXCEEDS_100_CHAR_LIMIT")
      },
      pattern: {
        value: /^[A-Za-z_-][A-Za-z0-9_\ -?]*$/,
        message: t("ES_SURVEY_DONT_START_WITH_NUMBER")
      }
    })
  }), (formState === null || formState === void 0 ? void 0 : formState.errors) && /*#__PURE__*/React.createElement(CardLabelError$1, null, formState === null || formState === void 0 ? void 0 : (_formState$errors3 = formState.errors) === null || _formState$errors3 === void 0 ? void 0 : (_formState$errors4 = _formState$errors3[`QUESTION_SURVEY_${index}`]) === null || _formState$errors4 === void 0 ? void 0 : _formState$errors4.message)), /*#__PURE__*/React.createElement(Dropdown, {
    t: t,
    option: dropdownOptions,
    select: ev => {
      setSurveyQuestionConfig(prevState => ({
        ...prevState,
        type: {
          title: ev.title,
          i18Key: ev.i18Key,
          value: ev.value
        }
      }));
    },
    optionKey: "i18Key",
    disable: disableInputs,
    selected: surveyQuestionConfig === null || surveyQuestionConfig === void 0 ? void 0 : surveyQuestionConfig.type
  })), /*#__PURE__*/React.createElement("div", {
    className: "newSurveyForm_answer"
  }, renderAnswerComponent(surveyQuestionConfig === null || surveyQuestionConfig === void 0 ? void 0 : surveyQuestionConfig.type)), /*#__PURE__*/React.createElement("div", {
    className: "newSurveyForm_actions"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CheckBox, {
    onChange: e => setSurveyQuestionConfig(prevState => ({
      ...prevState,
      required: !prevState.required
    })),
    checked: surveyQuestionConfig.required,
    label: t("CS_COMMON_REQUIRED"),
    pageType: "employee",
    disable: disableInputs,
    style: {
      marginTop: "2px"
    }
  })), index !== 0 && /*#__PURE__*/React.createElement("div", {
    className: "newSurveyForm_seprator"
  }), index !== 0 && /*#__PURE__*/React.createElement("div", {
    className: `pointer ${disableInputs ? 'disabled-btn' : ''}`,
    onClick: () => dispatch({
      type: "removeForm",
      payload: {
        index
      }
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: "tooltip"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "0 4px"
    }
  }, /*#__PURE__*/React.createElement(DustbinIcon, null), /*#__PURE__*/React.createElement("span", {
    className: "tooltiptext",
    style: {
      position: "absolute",
      width: "100px",
      marginLeft: "50%",
      fontSize: "medium"
    }
  }, t("CS_INFO_DELETE"))))))));
};

const SurveyFormsMaker = ({
  t,
  formsConfig,
  setSurveyConfig,
  disableInputs,
  isPartiallyEnabled,
  addOption,
  formDisabled,
  controlSurveyForm
}) => {
  const defaultFormsConfig = {
    question: "",
    answerType: "Short Answer",
    required: false,
    options: [],
    uuid: "",
    qorder: null
  };
  const initialSurveyFormState = [defaultFormsConfig];
  const surveyFormReducer = (state, {
    type,
    payload
  }) => {
    switch (type) {
      case "addNewForm":
        const newSurveyQues = [...state, defaultFormsConfig];
        payload.setSurveyConfig("questions", newSurveyQues);
        return newSurveyQues;
      case "updateForm":
        const updatedSurveyQues = [...state];
        updatedSurveyQues.splice(payload.index, 1, payload);
        payload.setSurveyConfig("questions", updatedSurveyQues);
        return updatedSurveyQues;
      case "removeForm":
        if (state.length === 1) return state;
        const copyOfSate = [...state];
        copyOfSate.splice(payload.index, 1);
        payload.setSurveyConfig("questions", copyOfSate);
        return copyOfSate;
    }
  };
  const [surveyState, dispatch] = useReducer(surveyFormReducer, formsConfig ? formsConfig : initialSurveyFormState);
  const passingSurveyConfigInDispatch = ({
    type,
    payload
  }) => {
    dispatch({
      type,
      payload: {
        ...payload,
        setSurveyConfig
      }
    });
  };
  const renderPreviewForms = () => {
    return surveyState.length ? surveyState.map((config, index) => {
      return /*#__PURE__*/React.createElement(NewSurveyForm, Object.assign({
        key: index
      }, config.formConfig ? config === null || config === void 0 ? void 0 : config.formConfig : config, {
        addOption: addOption,
        t: t,
        index: index,
        disableInputs: disableInputs,
        dispatch: passingSurveyConfigInDispatch,
        isPartiallyEnabled: isPartiallyEnabled,
        formDisabled: formDisabled,
        controlSurveyForm: controlSurveyForm
      }));
    }) : null;
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "surveyformslist_wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, t("CS_SURVEYS_QUESTIONS")), renderPreviewForms(), /*#__PURE__*/React.createElement("div", {
    className: "pointer"
  }, surveyState.length < 30 && /*#__PURE__*/React.createElement("button", {
    className: `unstyled-button link ${disableInputs ? "disabled-btn" : ""} ${surveyState.length >= 30 ? "disabled-btn" : ""} `,
    type: "button",
    onClick: () => passingSurveyConfigInDispatch({
      type: "addNewForm"
    }),
    disabled: surveyState.length >= 30 ? true : false
  }, t("CS_COMMON_ADD_QUESTION"))));
};

const ConvertEpochToDate = dateEpoch => {
  if (dateEpoch == null || dateEpoch == undefined || dateEpoch == "") {
    return "NA";
  }
  const dateFromApi = new Date(dateEpoch);
  let month = dateFromApi.getMonth() + 1;
  let day = dateFromApi.getDate();
  let year = dateFromApi.getFullYear();
  month = (month > 9 ? "" : "0") + month;
  day = (day > 9 ? "" : "0") + day;
  return `${year}-${month}-${day}`;
};
const SurveySettingsForms = ({
  t,
  controlSurveyForm,
  surveyFormState,
  disableInputs,
  enableEndDateTimeOnly
}) => {
  var _formErrors$fromDate, _formErrors$fromDate2, _formErrors$fromTime, _formErrors$fromTime2, _formErrors$toDate, _formErrors$toDate2, _formErrors$toTime, _formErrors$toTime2;
  const formErrors = surveyFormState === null || surveyFormState === void 0 ? void 0 : surveyFormState.errors;
  const {
    getValues
  } = useFormContext();
  const currentTs = new Date().getTime();
  const isValidFromDate = enteredValue => {
    const enteredTs = new Date(enteredValue).getTime();
    const toDate = getValues("toDate") ? new Date(getValues("toDate")).getTime() : new Date().getTime();
    if (enteredValue === getValues("toDate") && enteredValue >= ConvertEpochToDate(currentTs)) return true;
    return toDate >= enteredTs && enteredValue >= ConvertEpochToDate(currentTs) ? true : false;
  };
  const isValidToDate = enteredValue => {
    const enteredTs = new Date(enteredValue).getTime();
    const fromDate = getValues("fromDate") ? new Date(getValues("fromDate")).getTime() : new Date().getTime();
    return enteredTs >= fromDate ? true : false;
  };
  const isValidFromTime = () => true;
  const isValidToTime = () => true;
  return /*#__PURE__*/React.createElement("div", {
    className: "surveydetailsform-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, t("CS_COMMON_SETTINGS")), /*#__PURE__*/React.createElement("span", {
    className: "surveyformfield"
  }, /*#__PURE__*/React.createElement("label", null, `${t("LABEL_SURVEY_START_DATE")} * `), /*#__PURE__*/React.createElement(Controller, {
    control: controlSurveyForm,
    name: "fromDate",
    defaultValue: surveyFormState === null || surveyFormState === void 0 ? void 0 : surveyFormState.fromDate,
    rules: {
      required: true,
      validate: !enableEndDateTimeOnly ? {
        isValidFromDate
      } : null
    },
    render: ({
      onChange,
      value
    }) => /*#__PURE__*/React.createElement(TextInput, {
      type: "date",
      onChange: onChange,
      defaultValue: value,
      disable: disableInputs
    })
  }), formErrors && (formErrors === null || formErrors === void 0 ? void 0 : formErrors.fromDate) && (formErrors === null || formErrors === void 0 ? void 0 : (_formErrors$fromDate = formErrors.fromDate) === null || _formErrors$fromDate === void 0 ? void 0 : _formErrors$fromDate.type) === "required" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_TO_DATE_ERROR_REQUIRED`)), formErrors && (formErrors === null || formErrors === void 0 ? void 0 : formErrors.fromDate) && (formErrors === null || formErrors === void 0 ? void 0 : (_formErrors$fromDate2 = formErrors.fromDate) === null || _formErrors$fromDate2 === void 0 ? void 0 : _formErrors$fromDate2.type) === "isValidFromDate" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_FROM_DATE_ERROR_INVALID`))), /*#__PURE__*/React.createElement("span", {
    className: "surveyformfield"
  }, /*#__PURE__*/React.createElement("label", null, `${t("LABEL_SURVEY_START_TIME")} * `), /*#__PURE__*/React.createElement(Controller, {
    control: controlSurveyForm,
    name: "fromTime",
    defaultValue: surveyFormState === null || surveyFormState === void 0 ? void 0 : surveyFormState.fromTime,
    rules: {
      required: true,
      validate: {
        isValidFromTime
      }
    },
    render: ({
      onChange,
      value
    }) => /*#__PURE__*/React.createElement(TextInput, {
      type: "time",
      onChange: onChange,
      defaultValue: value,
      disable: disableInputs
    })
  }), formErrors && (formErrors === null || formErrors === void 0 ? void 0 : formErrors.fromTime) && (formErrors === null || formErrors === void 0 ? void 0 : (_formErrors$fromTime = formErrors.fromTime) === null || _formErrors$fromTime === void 0 ? void 0 : _formErrors$fromTime.type) === "required" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_TO_DATE_ERROR_REQUIRED`)), formErrors && (formErrors === null || formErrors === void 0 ? void 0 : formErrors.fromTime) && (formErrors === null || formErrors === void 0 ? void 0 : (_formErrors$fromTime2 = formErrors.fromTime) === null || _formErrors$fromTime2 === void 0 ? void 0 : _formErrors$fromTime2.type) === "isValidFromDate" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_TO_DATE_ERROR_INVALID`))), /*#__PURE__*/React.createElement("span", {
    className: "surveyformfield"
  }, /*#__PURE__*/React.createElement("label", null, `${t("LABEL_SURVEY_END_DATE")} * `), /*#__PURE__*/React.createElement(Controller, {
    control: controlSurveyForm,
    name: "toDate",
    defaultValue: surveyFormState === null || surveyFormState === void 0 ? void 0 : surveyFormState.toDate,
    rules: {
      required: true,
      validate: {
        isValidToDate
      }
    },
    render: ({
      onChange,
      value
    }) => /*#__PURE__*/React.createElement(TextInput, {
      type: "date",
      onChange: onChange,
      defaultValue: value,
      disable: enableEndDateTimeOnly ? !enableEndDateTimeOnly : disableInputs
    })
  }), formErrors && (formErrors === null || formErrors === void 0 ? void 0 : formErrors.toDate) && (formErrors === null || formErrors === void 0 ? void 0 : (_formErrors$toDate = formErrors.toDate) === null || _formErrors$toDate === void 0 ? void 0 : _formErrors$toDate.type) === "required" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_TO_DATE_ERROR_REQUIRED`)), formErrors && (formErrors === null || formErrors === void 0 ? void 0 : formErrors.toDate) && (formErrors === null || formErrors === void 0 ? void 0 : (_formErrors$toDate2 = formErrors.toDate) === null || _formErrors$toDate2 === void 0 ? void 0 : _formErrors$toDate2.type) === "isValidToDate" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_TO_DATE_ERROR_INVALID`)), " "), /*#__PURE__*/React.createElement("span", {
    className: "surveyformfield"
  }, /*#__PURE__*/React.createElement("label", null, `${t("LABEL_SURVEY_END_TIME")} * `), /*#__PURE__*/React.createElement(Controller, {
    control: controlSurveyForm,
    name: "toTime",
    defaultValue: surveyFormState === null || surveyFormState === void 0 ? void 0 : surveyFormState.toTime,
    rules: {
      required: true,
      validate: {
        isValidToTime
      }
    },
    render: ({
      onChange,
      value
    }) => /*#__PURE__*/React.createElement(TextInput, {
      type: "time",
      onChange: onChange,
      defaultValue: value,
      disable: enableEndDateTimeOnly ? !enableEndDateTimeOnly : disableInputs
    })
  }), formErrors && (formErrors === null || formErrors === void 0 ? void 0 : formErrors.toTime) && (formErrors === null || formErrors === void 0 ? void 0 : (_formErrors$toTime = formErrors.toTime) === null || _formErrors$toTime === void 0 ? void 0 : _formErrors$toTime.type) === "required" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_TO_DATE_ERROR_REQUIRED`)), formErrors && (formErrors === null || formErrors === void 0 ? void 0 : formErrors.toTime) && (formErrors === null || formErrors === void 0 ? void 0 : (_formErrors$toTime2 = formErrors.toTime) === null || _formErrors$toTime2 === void 0 ? void 0 : _formErrors$toTime2.type) === "isValidToDate" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_TO_DATE_ERROR_INVALID`))));
};

const CreateNewSurvey = ({
  t,
  initialFormValues,
  onSubmit,
  isFormDisabled: _isFormDisabled = false
}) => {
  const {
    register: registerRef,
    control: controlSurveyForm,
    handleSubmit: handleSurveyFormSubmit,
    setValue: setSurveyFormValue,
    getValues: getSurveyFormValues,
    reset: resetSurveyForm,
    formState: surveyFormState,
    clearErrors: clearSurveyFormsErrors,
    ...methods
  } = useForm({
    defaultValues: initialFormValues
  });
  useEffect(() => {
    registerRef("questions");
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "8px"
    }
  }, /*#__PURE__*/React.createElement(FormProvider, _extends({
    register: registerRef,
    control: controlSurveyForm,
    handleSubmit: handleSurveyFormSubmit,
    setValue: setSurveyFormValue,
    getValues: getSurveyFormValues,
    reset: resetSurveyForm,
    formState: surveyFormState,
    clearErrors: clearSurveyFormsErrors
  }, methods), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSurveyFormSubmit(onSubmit)
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(SurveyDetailsForms, {
    t: t,
    registerRef: registerRef,
    controlSurveyForm: controlSurveyForm,
    surveyFormState: surveyFormState,
    surveyFormData: getSurveyFormValues
  }), /*#__PURE__*/React.createElement(SurveyFormsMaker, {
    t: t,
    setSurveyConfig: setSurveyFormValue,
    addOption: true,
    controlSurveyForm: controlSurveyForm
  }), /*#__PURE__*/React.createElement(SurveySettingsForms, {
    t: t,
    controlSurveyForm: controlSurveyForm,
    surveyFormState: surveyFormState
  })), /*#__PURE__*/React.createElement(ActionBar, null, /*#__PURE__*/React.createElement(SubmitBar, {
    label: t("CS_CREATE_SURVEY"),
    submit: "submit"
  })))));
};

const answerTypeEnum = {
  "Short Answer": "SHORT_ANSWER_TYPE",
  "Short answer": "SHORT_ANSWER_TYPE",
  Paragraph: "LONG_ANSWER_TYPE",
  "Multiple Choice": "MULTIPLE_ANSWER_TYPE",
  "Check Boxes": "CHECKBOX_ANSWER_TYPE",
  Date: "DATE_ANSWER_TYPE",
  Time: "TIME_ANSWER_TYPE"
};
const mapQuestions = (questions = [], initialData) => {
  var _initialData$question;
  questions = questions.map(ques => {
    var _ques$formConfig;
    if (!(ques !== null && ques !== void 0 && (_ques$formConfig = ques.formConfig) !== null && _ques$formConfig !== void 0 && _ques$formConfig.type)) {
      return {
        ...ques,
        formConfig: {
          ...(ques === null || ques === void 0 ? void 0 : ques.formConfig),
          type: "Short Answer"
        }
      };
    }
    return ques;
  });
  if (!questions.length) return;
  let newmappedQues = [];
  newmappedQues = questions.map(({
    formConfig
  }, index) => {
    const {
      options: choices,
      questionStatement,
      required,
      type: stringType,
      uuid,
      qorder
    } = formConfig;
    const finalQuestion = {
      questionStatement,
      uuid: uuid ? uuid : null,
      qorder,
      status: "ACTIVE",
      required,
      type: typeof stringType === "object" && stringType !== null ? stringType.value : stringType.title ? answerTypeEnum[stringType.title] : answerTypeEnum[stringType]
    };
    if ((stringType === null || stringType === void 0 ? void 0 : stringType.title) === "Multiple Choice" || (stringType === null || stringType === void 0 ? void 0 : stringType.value) === "MULTIPLE_ANSWER_TYPE" || (stringType === null || stringType === void 0 ? void 0 : stringType.title) === "Check Boxes" || (stringType === null || stringType === void 0 ? void 0 : stringType.value) === "CHECKBOX_ANSWER_TYPE") {
      finalQuestion["options"] = choices;
    }
    return finalQuestion;
  });
  initialData && (initialData === null || initialData === void 0 ? void 0 : (_initialData$question = initialData.questions) === null || _initialData$question === void 0 ? void 0 : _initialData$question.map(ques => {
    let found = newmappedQues.length > 0 ? newmappedQues.some(el => el.uuid === (ques === null || ques === void 0 ? void 0 : ques.uuid)) : false;
    if (!found) newmappedQues.push({
      ...ques,
      status: "INACTIVE"
    });
  }));
  return newmappedQues;
};
const NewSurveys = () => {
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const [showToast, setShowToast] = useState(null);
  const closeToast = () => {
    setShowToast(null);
  };
  setTimeout(() => {
    closeToast();
  }, 10000);
  const onSubmit = data => {
    const {
      collectCitizenInfo,
      title,
      description,
      tenantIds,
      fromDate,
      toDate,
      fromTime,
      toTime,
      questions
    } = data;
    const mappedQuestions = mapQuestions(questions);
    const details = {
      SurveyEntity: {
        tenantIds: tenantIds.map(({
          code
        }) => code),
        title,
        description,
        startDate: new Date(`${fromDate} ${fromTime}`).getTime(),
        endDate: new Date(`${toDate} ${toTime}`).getTime(),
        questions: mappedQuestions
      }
    };
    try {
      var _tenantIds$;
      let filters = {
        tenantIds: tenantIds === null || tenantIds === void 0 ? void 0 : (_tenantIds$ = tenantIds[0]) === null || _tenantIds$ === void 0 ? void 0 : _tenantIds$.code,
        title: title
      };
      Digit.Surveys.search(filters).then(ob => {
        var _ob$Surveys;
        if ((ob === null || ob === void 0 ? void 0 : (_ob$Surveys = ob.Surveys) === null || _ob$Surveys === void 0 ? void 0 : _ob$Surveys.length) > 0) {
          setShowToast({
            key: true,
            label: "SURVEY_SAME_NAME_SURVEY_ALREADY_PRESENT"
          });
        } else {
          history.push("/digit-ui/employee/engagement/surveys/create-response", details);
        }
      });
    } catch (error) {}
  };
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const ulbs = Digit.SessionStorage.get("ENGAGEMENT_TENANTS");
  const userInfo = Digit.UserService.getUser().info;
  const userUlbs = ulbs.filter(ulb => {
    var _userInfo$roles;
    return userInfo === null || userInfo === void 0 ? void 0 : (_userInfo$roles = userInfo.roles) === null || _userInfo$roles === void 0 ? void 0 : _userInfo$roles.some(role => (role === null || role === void 0 ? void 0 : role.tenantId) === (ulb === null || ulb === void 0 ? void 0 : ulb.code));
  });
  const defaultValues = {
    fromDate: "",
    fromTime: "",
    toDate: "",
    toTime: "",
    questions: {},
    tenantIds: userUlbs
  };
  const stylesForForm = {
    marginLeft: '-20px'
  };
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Header, null, t("CREATE_NEW_SURVEY")), /*#__PURE__*/React.createElement("div", {
    style: stylesForForm
  }, /*#__PURE__*/React.createElement(CreateNewSurvey, {
    t: t,
    onSubmit: onSubmit,
    initialFormValues: defaultValues
  })), showToast && /*#__PURE__*/React.createElement(Toast, {
    error: showToast.key,
    label: t(showToast.label),
    onClose: closeToast
  }));
};

const getMessage$3 = mutation => {
  var _mutation$data, _mutation$data$Survey, _mutation$data$Survey2;
  if (mutation.isSuccess) return (_mutation$data = mutation.data) === null || _mutation$data === void 0 ? void 0 : (_mutation$data$Survey = _mutation$data.Surveys) === null || _mutation$data$Survey === void 0 ? void 0 : (_mutation$data$Survey2 = _mutation$data$Survey[0]) === null || _mutation$data$Survey2 === void 0 ? void 0 : _mutation$data$Survey2.uuid;
  return "";
};
const BannerPicker$6 = props => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement(Banner, {
    message: props.mutation.isSuccess ? t(`SURVEY_FORM_CREATED`) : t("SURVEY_FORM_FAILURE"),
    applicationNumber: getMessage$3(props.mutation),
    info: props.mutation.isSuccess ? t("SURVEY_FORM_ID") : "",
    successful: props.mutation.isSuccess
  });
};
const Acknowledgement$1 = props => {
  var _mutation$data2, _mutation$data2$Surve;
  const queryClient = useQueryClient();
  const {
    t
  } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const mutation = Digit.Hooks.survey.useCreate();
  const {
    state
  } = props.location;
  const history = useHistory();
  const [isActionClicked, setIsActionClicked] = useState(false);
  useEffect(() => {
    const onSuccess = () => {
      queryClient.clear();
      window.history.replaceState(null, 'CREATE_SURVEY_STATE');
    };
    if (!!state) {
      mutation.mutate(state, {
        onSuccess
      });
    }
  }, []);
  if (mutation.isLoading && !mutation.isIdle) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  const survey = (_mutation$data2 = mutation.data) === null || _mutation$data2 === void 0 ? void 0 : (_mutation$data2$Surve = _mutation$data2.Surveys) === null || _mutation$data2$Surve === void 0 ? void 0 : _mutation$data2$Surve[0];
  const handleActionClick = () => {
    setIsActionClicked(prevState => {
      return !prevState;
    });
  };
  const actionClickHandler = option => {
    if (option === t("GO_BACK_TO_HOME")) history.push("/digit-ui/employee");else if (option === t("CREATE_ANOTHER_SURVEY")) history.push("/digit-ui/employee/engagement/surveys/create");
  };
  return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(BannerPicker$6, {
    t: t,
    mutation: mutation
  }), /*#__PURE__*/React.createElement(CardText, null, mutation.isSuccess ? t(`SURVEY_FORM_CREATION_MESSAGE`, {
    surveyName: survey === null || survey === void 0 ? void 0 : survey.title,
    fromDate: Digit.DateUtils.ConvertTimestampToDate(survey === null || survey === void 0 ? void 0 : survey.startDate),
    toDate: Digit.DateUtils.ConvertTimestampToDate(survey === null || survey === void 0 ? void 0 : survey.endDate)
  }) : null), /*#__PURE__*/React.createElement(ActionBar, null, /*#__PURE__*/React.createElement("button", {
    onClick: handleActionClick
  }, /*#__PURE__*/React.createElement(SubmitBar, {
    label: "Action"
  }), isActionClicked && /*#__PURE__*/React.createElement(Menu, {
    options: [t("GO_BACK_TO_HOME"), t("CREATE_ANOTHER_SURVEY")],
    onSelect: actionClickHandler
  }))));
};

const getMessage$4 = mutation => {
  var _mutation$data, _mutation$data$Survey, _mutation$data$Survey2, _mutation$data3, _mutation$data3$Docum, _mutation$data3$Docum2;
  if (mutation.isSuccess && mutation !== null && mutation !== void 0 && (_mutation$data = mutation.data) !== null && _mutation$data !== void 0 && (_mutation$data$Survey = _mutation$data.Surveys) !== null && _mutation$data$Survey !== void 0 && (_mutation$data$Survey2 = _mutation$data$Survey[0]) !== null && _mutation$data$Survey2 !== void 0 && _mutation$data$Survey2.uuid) {
    var _mutation$data2, _mutation$data2$Surve, _mutation$data2$Surve2;
    return mutation === null || mutation === void 0 ? void 0 : (_mutation$data2 = mutation.data) === null || _mutation$data2 === void 0 ? void 0 : (_mutation$data2$Surve = _mutation$data2.Surveys) === null || _mutation$data2$Surve === void 0 ? void 0 : (_mutation$data2$Surve2 = _mutation$data2$Surve[0]) === null || _mutation$data2$Surve2 === void 0 ? void 0 : _mutation$data2$Surve2.uuid;
  }
  if (mutation.isSuccess) return (_mutation$data3 = mutation.data) === null || _mutation$data3 === void 0 ? void 0 : (_mutation$data3$Docum = _mutation$data3.Documents) === null || _mutation$data3$Docum === void 0 ? void 0 : (_mutation$data3$Docum2 = _mutation$data3$Docum[0]) === null || _mutation$data3$Docum2 === void 0 ? void 0 : _mutation$data3$Docum2.uuid;
  return "";
};
const BannerPicker$7 = props => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement(Banner, {
    message: props.isSuccess ? t(`ENGAGEMENT_SURVEY_UPDATED`) : t("ENGAGEMENT_SURVEY_UPDATE_FAILURE"),
    applicationNumber: getMessage$4(props.mutation),
    info: props.isSuccess ? t("SURVEY_FORM_ID") : "",
    successful: props.isSuccess
  });
};
const Response$5 = props => {
  const queryClient = useQueryClient();
  const {
    t
  } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const mutation = Digit.Hooks.survey.useUpdate();
  const {
    state
  } = props.location;
  useEffect(() => {
    const onSuccess = () => {
      queryClient.clear();
      window.history.replaceState(null, 'UPDATE_SURVEY_STATE');
    };
    if (!!state) {
      mutation.mutate(state, {
        onSuccess
      });
    }
  }, []);
  if (mutation.isLoading || mutation.isIdle) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(BannerPicker$7, {
    t: t,
    data: mutation.data,
    mutation: mutation,
    isSuccess: mutation.isSuccess,
    isLoading: mutation.isIdle || mutation.isLoading
  })), /*#__PURE__*/React.createElement(ActionBar, null, /*#__PURE__*/React.createElement(Link, {
    to: "/digit-ui/employee"
  }, /*#__PURE__*/React.createElement(SubmitBar, {
    label: t("CORE_COMMON_GO_TO_HOME")
  }))));
};

const BannerPicker$8 = props => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement(Banner, {
    message: props.isSuccess ? t(`ENGAGEMENT_SURVEY_DELETED`) : t("ENGAGEMENT_SURVEY_DELETE_FAILURE"),
    successful: props.isSuccess
  });
};
const Response$6 = props => {
  var _state$DocumentEntity;
  const queryClient = useQueryClient();
  const {
    t
  } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const mutation = Digit.Hooks.survey.useDelete();
  const {
    state
  } = props.location;
  useEffect(() => {
    const onSuccess = () => {
      queryClient.clear();
      window.history.replaceState(null, 'DELETE_SURVEY_STATE');
    };
    if (!!state) {
      mutation.mutate(state, {
        onSuccess
      });
    }
  }, []);
  if (mutation.isLoading || mutation.isIdle) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(BannerPicker$8, {
    t: t,
    data: mutation.data,
    mutation: mutation,
    uuid: state === null || state === void 0 ? void 0 : (_state$DocumentEntity = state.DocumentEntity) === null || _state$DocumentEntity === void 0 ? void 0 : _state$DocumentEntity.uuid,
    isSuccess: mutation.isSuccess,
    isLoading: mutation.isIdle || mutation.isLoading
  })), /*#__PURE__*/React.createElement(ActionBar, null, /*#__PURE__*/React.createElement(Link, {
    to: "/digit-ui/employee"
  }, /*#__PURE__*/React.createElement(SubmitBar, {
    label: t("CORE_COMMON_GO_TO_HOME")
  }))));
};

const SurveyInfoLabel = ({
  t,
  config,
  onSelect,
  userType,
  formData
}) => {
  userType = userType || Digit.SessionStorage.get("userType");
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: userType === "citizen" ? {
      maxWidth: "970px"
    } : {
      width: "80%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-banner-wrap",
    style: window.location.href.includes("/connection-details") ? {
      color: "#3498DB",
      margin: "0px"
    } : {
      color: "#3498DB"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InfoBannerIcon, null), /*#__PURE__*/React.createElement("h2", {
    style: {
      color: "#3498DB"
    }
  }, t("SURVEY_INFO_HEADER"))), ` ${t("SURVEY_INFO_LABEL")}`)));
};

const EditSurveyForms = ({
  t,
  onEdit,
  menuOptions,
  initialSurveysConfig,
  isFormDisabled,
  isPartiallyEnabled,
  displayMenu,
  setDisplayMenu,
  onActionSelect,
  isSurveyActive
}) => {
  const showActionBar = (initialSurveysConfig === null || initialSurveysConfig === void 0 ? void 0 : initialSurveysConfig.status) === "ACTIVE" ? !isPartiallyEnabled : isFormDisabled;
  const {
    register: registerRef,
    control: controlSurveyForm,
    handleSubmit: handleSurveyFormSubmit,
    setValue: setSurveyFormValue,
    getValues: getSurveyFormValues,
    reset: resetSurveyForm,
    formState: surveyFormState,
    clearErrors: clearSurveyFormsErrors
  } = useForm({
    defaultValues: {
      ...initialSurveysConfig
    }
  });
  useEffect(() => {
    registerRef("questions");
  }, []);
  return /*#__PURE__*/React.createElement(FormProvider, {
    register: registerRef,
    control: controlSurveyForm,
    handleSubmit: handleSurveyFormSubmit,
    setValue: setSurveyFormValue,
    getValues: getSurveyFormValues,
    reset: resetSurveyForm,
    formState: surveyFormState,
    clearErrors: clearSurveyFormsErrors
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSurveyFormSubmit(onEdit)
  }, /*#__PURE__*/React.createElement(Card, null, isPartiallyEnabled && (initialSurveysConfig === null || initialSurveysConfig === void 0 ? void 0 : initialSurveysConfig.status) === "ACTIVE" && /*#__PURE__*/React.createElement(SurveyInfoLabel, {
    t: t
  }), /*#__PURE__*/React.createElement(SurveyDetailsForms, {
    t: t,
    registerRef: registerRef,
    controlSurveyForm: controlSurveyForm,
    surveyFormState: surveyFormState,
    disableInputs: isFormDisabled,
    enableDescriptionOnly: isPartiallyEnabled,
    surveyFormData: getSurveyFormValues
  }), /*#__PURE__*/React.createElement(SurveyFormsMaker, {
    t: t,
    setSurveyConfig: setSurveyFormValue,
    disableInputs: isFormDisabled,
    formsConfig: initialSurveysConfig.questions,
    isPartiallyEnabled: isPartiallyEnabled,
    formDisabled: isFormDisabled,
    controlSurveyForm: controlSurveyForm
  }), /*#__PURE__*/React.createElement(SurveySettingsForms, {
    t: t,
    controlSurveyForm: controlSurveyForm,
    surveyFormState: surveyFormState,
    disableInputs: isFormDisabled,
    enableEndDateTimeOnly: isPartiallyEnabled
  }), /*#__PURE__*/React.createElement("span", {
    className: "edit-action-btn"
  }, !isSurveyActive && !isFormDisabled && /*#__PURE__*/React.createElement(SubmitBar, {
    label: t("CS_EDIT_SURVEY"),
    submit: "submit",
    disabled: isPartiallyEnabled ? !isPartiallyEnabled : isFormDisabled
  }), isPartiallyEnabled && isSurveyActive && /*#__PURE__*/React.createElement(SubmitBar, {
    label: t("CS_EDIT_SURVEY"),
    submit: "submit",
    disabled: isPartiallyEnabled ? !isPartiallyEnabled : isFormDisabled
  })))), showActionBar && /*#__PURE__*/React.createElement(ActionBar, null, displayMenu ? /*#__PURE__*/React.createElement(Menu, {
    localeKeyPrefix: "ES_SURVEY",
    options: menuOptions,
    t: t,
    onSelect: onActionSelect
  }) : null, /*#__PURE__*/React.createElement(SubmitBar, {
    label: t("ES_COMMON_TAKE_ACTION"),
    onSubmit: () => setDisplayMenu(!displayMenu)
  })));
};

const Heading$8 = props => {
  return /*#__PURE__*/React.createElement("h1", {
    className: "heading-m"
  }, props.t(props.heading));
};
const Close$9 = () => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "#FFFFFF"
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0V0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
}));
const CloseBtn$9 = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "icon-bg-secondary",
    onClick: props.onClick
  }, /*#__PURE__*/React.createElement(Close$9, null));
};
const ConfirmationQuestion$1 = ({
  t,
  title
}) => /*#__PURE__*/React.createElement("div", {
  className: "confirmation_box"
}, /*#__PURE__*/React.createElement("span", null, " ", t("CONFIRM_DELETE_MSG_NEW"), " ", /*#__PURE__*/React.createElement("b", null, ` ${title}`), t("COMPLETELY_DELETE"), " ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), t("COMPLETELY_DELETE_WARN_MSG")));
const DeleteModal = ({
  t,
  heading,
  surveyTitle,
  closeModal,
  actionCancelLabel,
  actionCancelOnSubmit,
  actionSaveLabel,
  actionSaveOnSubmit
}) => {
  return /*#__PURE__*/React.createElement(Modal, {
    headerBarMain: /*#__PURE__*/React.createElement(Heading$8, {
      t: t,
      heading: heading
    }),
    headerBarEnd: /*#__PURE__*/React.createElement(CloseBtn$9, {
      onClick: closeModal
    }),
    actionCancelLabel: t(actionCancelLabel),
    actionCancelOnSubmit: actionCancelOnSubmit,
    actionSaveLabel: t(actionSaveLabel),
    actionSaveOnSubmit: actionSaveOnSubmit,
    formId: "modal-action"
  }, /*#__PURE__*/React.createElement(ConfirmationQuestion$1, {
    t: t,
    title: surveyTitle
  }));
};

const Heading$9 = props => {
  return /*#__PURE__*/React.createElement("h1", {
    className: "heading-m"
  }, props.t(props.heading));
};
const Close$a = () => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "#FFFFFF"
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0V0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
}));
const CloseBtn$a = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "icon-bg-secondary",
    onClick: props.onClick
  }, /*#__PURE__*/React.createElement(Close$a, null));
};
const isValidFromDate = () => true;
const isValidToDate = () => true;
const isValidFromTime = () => true;
const isValidToTime = () => true;
const MarkActiveModal = ({
  t,
  heading,
  surveyTitle,
  initialValues,
  onSubmit,
  closeModal,
  actionCancelLabel,
  actionCancelOnSubmit,
  actionSaveLabel,
  actionSaveOnSubmit
}) => {
  var _formErrors$fromDate, _formErrors$fromDate2, _formErrors$fromTime, _formErrors$fromTime2, _formErrors$toDate, _formErrors$toDate2, _formErrors$toTime, _formErrors$toTime2;
  const {
    fromDate,
    fromTime,
    toDate,
    toTime
  } = initialValues;
  const {
    control: controlSurveyForm,
    handleSubmit: handleSurveySettingSubmit,
    formState: surveyFormState
  } = useForm({
    defaultValues: {
      fromDate,
      fromTime,
      toDate,
      toTime
    }
  });
  const formErrors = surveyFormState === null || surveyFormState === void 0 ? void 0 : surveyFormState.errors;
  return /*#__PURE__*/React.createElement(Modal, {
    headerBarMain: /*#__PURE__*/React.createElement(Heading$9, {
      t: t,
      heading: heading
    }),
    headerBarEnd: /*#__PURE__*/React.createElement(CloseBtn$a, {
      onClick: closeModal
    }),
    actionCancelLabel: t(actionCancelLabel),
    actionCancelOnSubmit: actionCancelOnSubmit,
    actionSaveLabel: t(actionSaveLabel),
    actionSaveOnSubmit: handleSurveySettingSubmit(actionSaveOnSubmit),
    formId: "modal-action",
    headerBarMainStyle: {
      marginLeft: "20px"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      boxShadow: "none"
    }
  }, /*#__PURE__*/React.createElement("p", null, t("CONFIRM_ACTIVE_SURVEY_MSG"), " ", /*#__PURE__*/React.createElement("br", null), " ", surveyTitle, " ", t("CONFIRM_ACTIVE_SURVEY_MSG_END")), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSurveySettingSubmit(onSubmit)
  }, /*#__PURE__*/React.createElement("span", {
    className: "surveyformfield"
  }, /*#__PURE__*/React.createElement("label", null, t("LABEL_SURVEY_START_DATE")), /*#__PURE__*/React.createElement(Controller, {
    control: controlSurveyForm,
    name: "fromDate",
    defaultValue: surveyFormState === null || surveyFormState === void 0 ? void 0 : surveyFormState.fromDate,
    rules: {
      required: true,
      validate: {
        isValidFromDate
      }
    },
    render: ({
      onChange,
      value
    }) => /*#__PURE__*/React.createElement(TextInput, {
      type: "date",
      isRequired: true,
      onChange: onChange,
      defaultValue: value
    })
  }), formErrors && (formErrors === null || formErrors === void 0 ? void 0 : formErrors.fromDate) && (formErrors === null || formErrors === void 0 ? void 0 : (_formErrors$fromDate = formErrors.fromDate) === null || _formErrors$fromDate === void 0 ? void 0 : _formErrors$fromDate.type) === "required" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_TO_DATE_ERROR_REQUIRED`)), formErrors && (formErrors === null || formErrors === void 0 ? void 0 : formErrors.fromDate) && (formErrors === null || formErrors === void 0 ? void 0 : (_formErrors$fromDate2 = formErrors.fromDate) === null || _formErrors$fromDate2 === void 0 ? void 0 : _formErrors$fromDate2.type) === "isValidToDate" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_TO_DATE_ERROR_INVALID`))), /*#__PURE__*/React.createElement("span", {
    className: "surveyformfield"
  }, /*#__PURE__*/React.createElement("label", null, t("LABEL_SURVEY_START_TIME")), /*#__PURE__*/React.createElement(Controller, {
    control: controlSurveyForm,
    name: "fromTime",
    defaultValue: surveyFormState === null || surveyFormState === void 0 ? void 0 : surveyFormState.fromTime,
    rules: {
      required: true,
      validate: {
        isValidFromTime
      }
    },
    render: ({
      onChange,
      value
    }) => /*#__PURE__*/React.createElement(TextInput, {
      type: "time",
      isRequired: true,
      onChange: onChange,
      defaultValue: value
    })
  }), formErrors && (formErrors === null || formErrors === void 0 ? void 0 : formErrors.fromTime) && (formErrors === null || formErrors === void 0 ? void 0 : (_formErrors$fromTime = formErrors.fromTime) === null || _formErrors$fromTime === void 0 ? void 0 : _formErrors$fromTime.type) === "required" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_TO_DATE_ERROR_REQUIRED`)), formErrors && (formErrors === null || formErrors === void 0 ? void 0 : formErrors.fromTime) && (formErrors === null || formErrors === void 0 ? void 0 : (_formErrors$fromTime2 = formErrors.fromTime) === null || _formErrors$fromTime2 === void 0 ? void 0 : _formErrors$fromTime2.type) === "isValidToDate" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_TO_DATE_ERROR_INVALID`))), /*#__PURE__*/React.createElement("span", {
    className: "surveyformfield"
  }, /*#__PURE__*/React.createElement("label", null, t("LABEL_SURVEY_END_DATE")), /*#__PURE__*/React.createElement(Controller, {
    control: controlSurveyForm,
    name: "toDate",
    defaultValue: surveyFormState === null || surveyFormState === void 0 ? void 0 : surveyFormState.toDate,
    rules: {
      required: true,
      validate: {
        isValidToDate
      }
    },
    render: ({
      onChange,
      value
    }) => /*#__PURE__*/React.createElement(TextInput, {
      type: "date",
      isRequired: true,
      onChange: onChange,
      defaultValue: value
    })
  }), formErrors && (formErrors === null || formErrors === void 0 ? void 0 : formErrors.toDate) && (formErrors === null || formErrors === void 0 ? void 0 : (_formErrors$toDate = formErrors.toDate) === null || _formErrors$toDate === void 0 ? void 0 : _formErrors$toDate.type) === "required" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_TO_DATE_ERROR_REQUIRED`)), formErrors && (formErrors === null || formErrors === void 0 ? void 0 : formErrors.toDate) && (formErrors === null || formErrors === void 0 ? void 0 : (_formErrors$toDate2 = formErrors.toDate) === null || _formErrors$toDate2 === void 0 ? void 0 : _formErrors$toDate2.type) === "isValidToDate" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_TO_DATE_ERROR_INVALID`)), " "), /*#__PURE__*/React.createElement("span", {
    className: "surveyformfield"
  }, /*#__PURE__*/React.createElement("label", null, t("LABEL_SURVEY_END_TIME")), /*#__PURE__*/React.createElement(Controller, {
    control: controlSurveyForm,
    name: "toTime",
    defaultValue: surveyFormState === null || surveyFormState === void 0 ? void 0 : surveyFormState.toTime,
    rules: {
      required: true,
      validate: {
        isValidToTime
      }
    },
    render: ({
      onChange,
      value
    }) => /*#__PURE__*/React.createElement(TextInput, {
      type: "time",
      isRequired: true,
      onChange: onChange,
      defaultValue: value
    })
  }), formErrors && (formErrors === null || formErrors === void 0 ? void 0 : formErrors.toTime) && (formErrors === null || formErrors === void 0 ? void 0 : (_formErrors$toTime = formErrors.toTime) === null || _formErrors$toTime === void 0 ? void 0 : _formErrors$toTime.type) === "required" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_TO_DATE_ERROR_REQUIRED`)), formErrors && (formErrors === null || formErrors === void 0 ? void 0 : formErrors.toTime) && (formErrors === null || formErrors === void 0 ? void 0 : (_formErrors$toTime2 = formErrors.toTime) === null || _formErrors$toTime2 === void 0 ? void 0 : _formErrors$toTime2.type) === "isValidToDate" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_TO_DATE_ERROR_INVALID`))))));
};

const Heading$a = props => {
  return /*#__PURE__*/React.createElement("h1", {
    className: "heading-m"
  }, props.t(props.heading));
};
const Close$b = () => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "#FFFFFF"
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0V0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
}));
const CloseBtn$b = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "icon-bg-secondary",
    onClick: props.onClick
  }, /*#__PURE__*/React.createElement(Close$b, null));
};
const ConfirmationQuestion$2 = ({
  t,
  title
}) => /*#__PURE__*/React.createElement("div", {
  className: "confirmation_box"
}, /*#__PURE__*/React.createElement("span", null, " ", t("CONFIRM_INACTIVE_SURVEY_MSG_NEW"), " ", /*#__PURE__*/React.createElement("b", null, ` ${title}`), t("CONFIRM_INACTIVE_SURVEY_MSG_TO_INACTIVE"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), t("CONFIRM_INACTIVE_SURVEY_WARN_MSG")));
const MarkInActiveModal = ({
  t,
  heading,
  surveyTitle,
  closeModal,
  actionCancelLabel,
  actionCancelOnSubmit,
  actionSaveLabel,
  actionSaveOnSubmit
}) => {
  return /*#__PURE__*/React.createElement(Modal, {
    headerBarMain: /*#__PURE__*/React.createElement(Heading$a, {
      t: t,
      heading: heading
    }),
    headerBarEnd: /*#__PURE__*/React.createElement(CloseBtn$b, {
      onClick: closeModal
    }),
    actionCancelLabel: t(actionCancelLabel),
    actionCancelOnSubmit: actionCancelOnSubmit,
    actionSaveLabel: t(actionSaveLabel),
    actionSaveOnSubmit: actionSaveOnSubmit,
    formId: "modal-action"
  }, /*#__PURE__*/React.createElement(ConfirmationQuestion$2, {
    t: t,
    title: surveyTitle
  }));
};

const filterQuestion = question => {
  if (!question) return;
  return {
    ...question,
    type: question.type.includes("_") ? question.type : answerTypeEnum[question.type],
    options: question === null || question === void 0 ? void 0 : question.options,
    status: question.status ? question.status : "ACTIVE",
    qorder: question.qorder
  };
};
const SurveyDetails = ({
  location,
  match
}) => {
  var _window, _window$Digit$Session, _window$Digit$Session2, _window$Digit$Session3, _window$Digit$Session4;
  let isMobile = window.Digit.Utils.browser.isMobile();
  const {
    id
  } = useParams();
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const [isFormPartiallyEnabled, setFormPartiallyEnabled] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(false);
  const [userAction, setUserAction] = useState(undefined);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const tenantIdForInboxSearch = ((_window = window) === null || _window === void 0 ? void 0 : (_window$Digit$Session = _window.Digit.SessionStorage) === null || _window$Digit$Session === void 0 ? void 0 : (_window$Digit$Session2 = _window$Digit$Session.get("CITIZENSURVEY.INBOX")) === null || _window$Digit$Session2 === void 0 ? void 0 : (_window$Digit$Session3 = _window$Digit$Session2.searchForm) === null || _window$Digit$Session3 === void 0 ? void 0 : (_window$Digit$Session4 = _window$Digit$Session3.tenantIds) === null || _window$Digit$Session4 === void 0 ? void 0 : _window$Digit$Session4.code) || tenantId;
  const [showToast, setShowToast] = useState(null);
  const closeToast = () => {
    setShowToast(null);
  };
  setTimeout(() => {
    closeToast();
  }, 10000);
  function convertTime12To24(time) {
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM === "PM" || AMPM === "pm" && hours < 12) hours = hours + 12;
    if (AMPM === "AM" || AMPM === "am" && hours === 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    return sHours + ":" + sMinutes;
  }
  const {
    isLoading,
    data: surveyData
  } = Digit.Hooks.survey.useSearch({
    tenantIds: tenantIdForInboxSearch,
    uuid: id
  }, {
    select: data => {
      var _data$Surveys;
      const surveyObj = data === null || data === void 0 ? void 0 : (_data$Surveys = data.Surveys) === null || _data$Surveys === void 0 ? void 0 : _data$Surveys[0];
      return {
        uuid: surveyObj.uuid,
        title: surveyObj.title,
        description: surveyObj.description,
        fromDate: format(new Date(surveyObj.startDate), "yyyy-MM-dd"),
        toDate: format(new Date(surveyObj.endDate), "yyyy-MM-dd"),
        fromTime: convertTime12To24(new Date(surveyObj.startDate).toLocaleString("en-IN", {
          hour: "numeric",
          minute: "numeric",
          hour12: true
        })),
        toTime: convertTime12To24(new Date(surveyObj.endDate).toLocaleString("en-IN", {
          hour: "numeric",
          minute: "numeric",
          hour12: true
        })),
        questions: surveyObj.questions.map(({
          questionStatement,
          type,
          required,
          options,
          uuid,
          surveyId,
          qorder,
          status
        }) => ({
          questionStatement,
          type: type,
          required,
          options,
          uuid,
          surveyId,
          qorder,
          status
        })),
        status: surveyObj.status,
        tenantId: {
          code: surveyObj.tenantId
        }
      };
    }
  });
  const isSurveyActive = useMemo(() => {
    const surveyStartTime = new Date(`${surveyData === null || surveyData === void 0 ? void 0 : surveyData.fromDate} ${surveyData === null || surveyData === void 0 ? void 0 : surveyData.fromTime}`).getTime();
    const surveyEndTime = new Date(`${surveyData === null || surveyData === void 0 ? void 0 : surveyData.toDate} ${surveyData === null || surveyData === void 0 ? void 0 : surveyData.toTime}`).getTime();
    const currentTime = new Date().getTime();
    if (surveyStartTime < currentTime && currentTime < surveyEndTime) {
      return true;
    }
    return false;
  }, [surveyData === null || surveyData === void 0 ? void 0 : surveyData.fromDate, surveyData === null || surveyData === void 0 ? void 0 : surveyData.fromTime, surveyData === null || surveyData === void 0 ? void 0 : surveyData.toDate, surveyData === null || surveyData === void 0 ? void 0 : surveyData.toTime]);
  function onActionSelect(action) {
    if (action === "EDIT") {
      if (isSurveyActive) {
        setFormPartiallyEnabled(!isFormPartiallyEnabled);
      } else {
        setIsFormDisabled(!isFormDisabled);
      }
      setUserAction("EDIT");
    }
    if (action === "INACTIVE") {
      setShowModal(true);
      setUserAction("INACTIVE");
    }
    if (action === "ACTIVE") {
      setShowModal(true);
      setUserAction("ACTIVE");
    }
    if (action === "DELETE") {
      setShowModal(true);
      setUserAction("DELETE");
    }
    setDisplayMenu(false);
  }
  const onEdit = data => {
    var _tenantIds$, _tenantIds$2;
    const {
      collectCitizenInfo,
      title,
      description,
      tenantIds,
      fromDate,
      toDate,
      fromTime,
      toTime,
      questions
    } = data;
    const mappedQuestions = mapQuestions(questions, surveyData);
    const details = {
      SurveyEntity: {
        uuid: surveyData.uuid,
        tenantId: (_tenantIds$ = tenantIds[0]) !== null && _tenantIds$ !== void 0 && _tenantIds$.code ? (_tenantIds$2 = tenantIds[0]) === null || _tenantIds$2 === void 0 ? void 0 : _tenantIds$2.code : surveyData.tenantId.code,
        title,
        description,
        startDate: new Date(`${fromDate} ${fromTime}`).getTime(),
        endDate: new Date(`${toDate} ${toTime}`).getTime(),
        questions: mappedQuestions,
        status: isSurveyActive ? "ACTIVE" : "INACTIVE"
      }
    };
    try {
      var _tenantIds$3, _tenantIds$4;
      let filters = {
        tenantIds: (_tenantIds$3 = tenantIds[0]) !== null && _tenantIds$3 !== void 0 && _tenantIds$3.code ? (_tenantIds$4 = tenantIds[0]) === null || _tenantIds$4 === void 0 ? void 0 : _tenantIds$4.code : surveyData.tenantId.code,
        title: title
      };
      Digit.Surveys.search(filters).then(ob => {
        var _ob$Surveys;
        if ((ob === null || ob === void 0 ? void 0 : (_ob$Surveys = ob.Surveys) === null || _ob$Surveys === void 0 ? void 0 : _ob$Surveys.length) > 0 && (data === null || data === void 0 ? void 0 : data.title) !== (surveyData === null || surveyData === void 0 ? void 0 : surveyData.title)) {
          setShowToast({
            key: true,
            label: "SURVEY_SAME_NAME_SURVEY_ALREADY_PRESENT"
          });
        } else {
          history.push("/digit-ui/employee/engagement/surveys/update-response", details);
        }
      });
    } catch (error) {}
  };
  const handleDelete = () => {
    const details = {
      SurveyEntity: {
        ...surveyData,
        tenantId: tenantId !== null && tenantId !== void 0 && tenantId.code ? tenantId === null || tenantId === void 0 ? void 0 : tenantId.code : tenantId
      }
    };
    history.push("/digit-ui/employee/engagement/surveys/delete-response", details);
  };
  const handleMarkActive = data => {
    const {
      fromDate,
      toDate,
      fromTime,
      toTime
    } = data;
    const details = {
      SurveyEntity: {
        ...surveyData,
        status: "ACTIVE",
        startDate: new Date(`${fromDate} ${fromTime}`).getTime(),
        endDate: new Date(`${toDate} ${toTime}`).getTime(),
        questions: surveyData.questions.map(filterQuestion),
        tenantId
      }
    };
    history.push("/digit-ui/employee/engagement/surveys/update-response", details);
  };
  const handleMarkInactive = () => {
    const details = {
      SurveyEntity: {
        ...surveyData,
        tenantId,
        questions: surveyData.questions.map(filterQuestion),
        status: "INACTIVE"
      }
    };
    history.push("/digit-ui/employee/engagement/surveys/update-response", details);
  };
  const actionMenuOptions = useMemo(() => {
    const options = ["EDIT", "DELETE"];
    if (isSurveyActive && (surveyData === null || surveyData === void 0 ? void 0 : surveyData.status) === "ACTIVE") {
      options.splice(1, 0, "INACTIVE");
    } else if (!isSurveyActive) {
      options.splice(1, 0, "ACTIVE");
    }
    return options;
  }, [isSurveyActive, surveyData === null || surveyData === void 0 ? void 0 : surveyData.status]);
  if (isLoading) return /*#__PURE__*/React.createElement(Loader, null);
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Header, null, t("CS_COMMON_SURVEYS")), /*#__PURE__*/React.createElement(EditSurveyForms, {
    t: t,
    onEdit: onEdit,
    menuOptions: actionMenuOptions,
    displayMenu: displayMenu,
    isFormDisabled: isFormDisabled,
    isPartiallyEnabled: isFormPartiallyEnabled,
    setDisplayMenu: setDisplayMenu,
    onActionSelect: onActionSelect,
    initialSurveysConfig: surveyData,
    isSurveyActive: isSurveyActive,
    formDisabled: isFormDisabled
  }), showModal && userAction === "DELETE" && /*#__PURE__*/React.createElement(DeleteModal, {
    t: t,
    heading: "CONFIRM_DELETE_SURVEY",
    surveyTitle: surveyData.title,
    closeModal: () => setShowModal(false),
    actionCancelLabel: "CS_COMMON_CANCEL",
    actionCancelOnSubmit: () => setShowModal(false),
    actionSaveLabel: "ES_COMMON_DEL",
    actionSaveOnSubmit: handleDelete
  }), showModal && userAction === "ACTIVE" && /*#__PURE__*/React.createElement(MarkActiveModal, {
    t: t,
    heading: "CONFIRM_MARKACTIVE_SURVEY",
    initialValues: surveyData,
    closeModal: () => setShowModal(false),
    actionCancelLabel: "CS_COMMON_CANCEL",
    actionCancelOnSubmit: () => setShowModal(false),
    actionSaveLabel: "ES_COMMON_SAVE",
    actionSaveOnSubmit: handleMarkActive,
    onSubmit: handleMarkActive,
    surveyTitle: surveyData.title
  }), showModal && userAction === "INACTIVE" && /*#__PURE__*/React.createElement(MarkInActiveModal, {
    t: t,
    heading: "CONFIRM_MARKINACTIVE_SURVEY",
    surveyTitle: surveyData.title,
    closeModal: () => setShowModal(false),
    actionCancelLabel: "CS_COMMON_CANCEL",
    actionCancelOnSubmit: () => setShowModal(false),
    actionSaveLabel: "ES_COMMON_Y_MARKINACTIVE",
    actionSaveOnSubmit: handleMarkInactive
  }), showToast && /*#__PURE__*/React.createElement(Toast, {
    error: showToast.key,
    label: t(showToast.label),
    onClose: closeToast
  }));
};

const CitizenSurveyQuestion = ({
  t,
  question,
  control,
  register,
  values,
  formState,
  formDisabled,
  index
}) => {
  const formErrors = formState === null || formState === void 0 ? void 0 : formState.errors;
  if (!question) return;
  const displayAnswerField = answerType => {
    var _formErrors$question$, _formErrors$question$2, _formErrors$question$3, _formErrors$question$4, _formErrors$question$5, _formErrors$question$6, _formErrors$question$7, _formErrors$question$8;
    switch (answerType) {
      case "SHORT_ANSWER_TYPE":
        return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(TextInput, {
          name: question.uuid,
          disabled: formDisabled,
          type: "text",
          inputRef: register({
            maxLength: {
              value: 200,
              message: t("EXCEEDS_200_CHAR_LIMIT")
            },
            required: question.required
          })
        }), formErrors && (formErrors === null || formErrors === void 0 ? void 0 : formErrors[question.uuid]) && (formErrors === null || formErrors === void 0 ? void 0 : (_formErrors$question$ = formErrors[question.uuid]) === null || _formErrors$question$ === void 0 ? void 0 : _formErrors$question$.type) === "required" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`CS_COMMON_REQUIRED`)), formErrors && (formErrors === null || formErrors === void 0 ? void 0 : formErrors[question.uuid]) && (formErrors === null || formErrors === void 0 ? void 0 : (_formErrors$question$2 = formErrors[question.uuid]) === null || _formErrors$question$2 === void 0 ? void 0 : _formErrors$question$2.type) === "maxLength" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EXCEEDS_200_CHAR_LIMIT`)));
      case "LONG_ANSWER_TYPE":
        return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(TextArea, {
          name: question.uuid,
          disabled: formDisabled,
          inputRef: register({
            maxLength: {
              value: 500,
              message: t("EXCEEDS_500_CHAR_LIMIT")
            },
            required: question.required
          })
        }), formErrors && (formErrors === null || formErrors === void 0 ? void 0 : formErrors[question.uuid]) && (formErrors === null || formErrors === void 0 ? void 0 : (_formErrors$question$3 = formErrors[question.uuid]) === null || _formErrors$question$3 === void 0 ? void 0 : _formErrors$question$3.type) === "required" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`CS_COMMON_REQUIRED`)), formErrors && (formErrors === null || formErrors === void 0 ? void 0 : formErrors[question.uuid]) && (formErrors === null || formErrors === void 0 ? void 0 : (_formErrors$question$4 = formErrors[question.uuid]) === null || _formErrors$question$4 === void 0 ? void 0 : _formErrors$question$4.type) === "maxLength" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EXCEEDS_500_CHAR_LIMIT`)));
      case "MULTIPLE_ANSWER_TYPE":
        return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Controller, {
          control: control,
          name: question.uuid,
          rules: {
            required: question.required
          },
          render: ({
            onChange,
            value
          }) => /*#__PURE__*/React.createElement(RadioButtons, {
            disabled: formDisabled,
            onSelect: onChange,
            selectedOption: value,
            optionsKey: "",
            options: [...question.options]
          })
        }), formErrors && (formErrors === null || formErrors === void 0 ? void 0 : formErrors[question.uuid]) && (formErrors === null || formErrors === void 0 ? void 0 : (_formErrors$question$5 = formErrors[question.uuid]) === null || _formErrors$question$5 === void 0 ? void 0 : _formErrors$question$5.type) === "required" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_TO_DATE_ERROR_REQUIRED`)));
      case "CHECKBOX_ANSWER_TYPE":
        return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Controller, {
          control: control,
          name: question.uuid,
          rules: {
            required: question.required
          },
          render: ({
            onChange,
            value
          }) => {
            return /*#__PURE__*/React.createElement("div", {
              className: "align-columns"
            }, question.options.map(option => {
              var _ref;
              return /*#__PURE__*/React.createElement(CheckBox, {
                disable: formDisabled,
                key: option,
                onChange: e => {
                  if (e.target.checked) {
                    onChange([option, ...(value ? value : [])]);
                  } else {
                    value && onChange(value === null || value === void 0 ? void 0 : value.filter(item => item !== option));
                  }
                },
                checked: typeof value === "string" ? !!((_ref = [value]) !== null && _ref !== void 0 && _ref.find(e => e === option)) : !!(value !== null && value !== void 0 && value.find(e => e === option)),
                label: option,
                checkboxWidth: {
                  width: "34px",
                  height: "34px"
                },
                style: {
                  marginTop: "5px",
                  overflowWrap: "break-word"
                }
              });
            }));
          }
        }), formErrors && (formErrors === null || formErrors === void 0 ? void 0 : formErrors[question.uuid]) && (formErrors === null || formErrors === void 0 ? void 0 : (_formErrors$question$6 = formErrors[question.uuid]) === null || _formErrors$question$6 === void 0 ? void 0 : _formErrors$question$6.type) === "required" && /*#__PURE__*/React.createElement(CardLabelError$1, {
          style: {
            marginTop: "20px"
          }
        }, t(`CS_COMMON_REQUIRED`)));
      case "DATE_ANSWER_TYPE":
        return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Controller, {
          control: control,
          name: question.uuid,
          rules: {
            required: question.required
          },
          render: ({
            onChange,
            value
          }) => /*#__PURE__*/React.createElement(TextInput, {
            disabled: formDisabled,
            type: "date",
            onChange: onChange,
            defaultValue: value
          })
        }), formErrors && (formErrors === null || formErrors === void 0 ? void 0 : formErrors[question.uuid]) && (formErrors === null || formErrors === void 0 ? void 0 : (_formErrors$question$7 = formErrors[question.uuid]) === null || _formErrors$question$7 === void 0 ? void 0 : _formErrors$question$7.type) === "required" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_TO_DATE_ERROR_REQUIRED`)));
      case "TIME_ANSWER_TYPE":
        return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Controller, {
          control: control,
          name: question.uuid,
          rules: {
            required: question.required
          },
          render: ({
            onChange,
            value
          }) => /*#__PURE__*/React.createElement(TextInput, {
            type: "time",
            disabled: formDisabled,
            onChange: onChange,
            defaultValue: value
          })
        }), formErrors && (formErrors === null || formErrors === void 0 ? void 0 : formErrors[question.uuid]) && (formErrors === null || formErrors === void 0 ? void 0 : (_formErrors$question$8 = formErrors[question.uuid]) === null || _formErrors$question$8 === void 0 ? void 0 : _formErrors$question$8.type) === "required" && /*#__PURE__*/React.createElement(CardLabelError$1, null, t(`EVENTS_TO_DATE_ERROR_REQUIRED`)));
      default:
        return /*#__PURE__*/React.createElement(TextInput, {
          name: question.uuid,
          disabled: formDisabled,
          type: "text",
          inputRef: register({
            maxLength: {
              value: 60,
              message: t("EXCEEDS_60_CHAR_LIMIT")
            },
            required: question.required
          })
        });
    }
  };
  return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    className: "surveyQuestion-wrapper"
  }, /*#__PURE__*/React.createElement("span", {
    className: "question-title"
  }, index + 1, ". ", question.questionStatement, " ", question !== null && question !== void 0 && question.required ? "*" : ""), /*#__PURE__*/React.createElement("span", null, displayAnswerField(question.type))));
};

const CitizenSurveyForm = ({
  surveyData,
  onFormSubmit,
  submitDisabled,
  formDisabled,
  formDefaultValues,
  isLoading,
  showToast,
  isSubmitDisabled
}) => {
  var _surveyData$title, _surveyData$questions;
  const {
    register: registerRef,
    control: controlSurveyForm,
    handleSubmit: handleSurveyFormSubmit,
    setValue: setSurveyFormValue,
    getValues: getSurveyFormValues,
    reset: resetSurveyForm,
    formState: surveyFormState,
    clearErrors: clearSurveyFormsErrors
  } = useForm({
    defaultValues: formDefaultValues
  });
  const {
    t
  } = useTranslation();
  if (isLoading) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "citizenSurvey-wrapper"
  }, /*#__PURE__*/React.createElement(Header, null, surveyData === null || surveyData === void 0 ? void 0 : (_surveyData$title = surveyData.title) === null || _surveyData$title === void 0 ? void 0 : _surveyData$title.toUpperCase()), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSurveyFormSubmit(onFormSubmit)
  }, surveyData !== null && surveyData !== void 0 && (_surveyData$questions = surveyData.questions) !== null && _surveyData$questions !== void 0 && _surveyData$questions.length ? surveyData.questions.map((config, index) => /*#__PURE__*/React.createElement(CitizenSurveyQuestion, {
    key: index,
    t: t,
    question: config,
    control: controlSurveyForm,
    register: registerRef,
    values: getSurveyFormValues,
    formState: surveyFormState,
    formDisabled: formDisabled,
    index: index
  })) : null, showToast && /*#__PURE__*/React.createElement(Toast, {
    error: showToast.key,
    label: t(showToast.label)
  }), /*#__PURE__*/React.createElement(ActionBar, null, !submitDisabled && /*#__PURE__*/React.createElement(SubmitBar, {
    disabled: isSubmitDisabled,
    label: t("CS_SUBMIT_SURVEY"),
    submit: "submit"
  }))));
};

const bindQuesWithAns = (ques, ans) => {
  let data = [];
  ques.map(ques => {
    let obj = {};
    if (ques.type === "Check Boxes") {
      obj["type"] = ques.type;
      obj["questionStatement"] = ques.questionStatement;
      obj["options"] = ques.options;
      obj["answers"] = [];
      ans.map(ans => {
        if (ques.uuid === ans.questionId) {
          var _ans$auditDetails, _ans$auditDetails2;
          obj["timeStamp"] = `${Digit.DateUtils.ConvertEpochToDate(ans === null || ans === void 0 ? void 0 : (_ans$auditDetails = ans.auditDetails) === null || _ans$auditDetails === void 0 ? void 0 : _ans$auditDetails.lastModifiedTime)} ${Digit.DateUtils.ConvertEpochToTimeInHours(ans === null || ans === void 0 ? void 0 : (_ans$auditDetails2 = ans.auditDetails) === null || _ans$auditDetails2 === void 0 ? void 0 : _ans$auditDetails2.lastModifiedTime)}`;
          obj["answers"] = [...obj["answers"], ans.answer];
        }
      });
    } else {
      const type = ques.type;
      obj["type"] = type;
      obj["questionStatement"] = ques.questionStatement;
      obj["options"] = ques.options;
      ans.map(ans => {
        if (ques.uuid === ans.questionId) {
          var _ans$auditDetails3, _ans$auditDetails4;
          obj["timeStamp"] = `${Digit.DateUtils.ConvertEpochToDate(ans === null || ans === void 0 ? void 0 : (_ans$auditDetails3 = ans.auditDetails) === null || _ans$auditDetails3 === void 0 ? void 0 : _ans$auditDetails3.lastModifiedTime)} ${Digit.DateUtils.ConvertEpochToTimeInHours(ans === null || ans === void 0 ? void 0 : (_ans$auditDetails4 = ans.auditDetails) === null || _ans$auditDetails4 === void 0 ? void 0 : _ans$auditDetails4.lastModifiedTime)}`;
          const answers = obj["answers"];
          if (answers) answers.push(ans.answer[0]);
          obj["answers"] = answers ? answers : [ans.answer[0]];
        }
      });
    }
    data.push(obj);
  });
  return data;
};

const WhoHasResponded = ({
  t,
  userInfo
}) => {
  const data = Object.entries(userInfo);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      "margin": "30px"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      "fontSize": "30px",
      "fontWeight": "bold"
    }
  }, t("WHO_RESPONDED")), /*#__PURE__*/React.createElement("div", {
    style: {
      "display": "flex",
      "padding": "8px 4px",
      "background-color": "#FAFAFA",
      "border": "1px solid #D6D5D4",
      "boxSizing": "borderBox",
      "borderRadius": "4px",
      "marginTop": "20px",
      "marginBottom": "20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      "flex": "50%",
      "padding": "10px"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      "fontWeight": "bold",
      "fontSize": "25px"
    }
  }, t("SURVEY_EMAIL")), data.map(user => /*#__PURE__*/React.createElement("p", {
    style: {
      "margin": "10px 0px 10px 0px"
    }
  }, user[1]))), /*#__PURE__*/React.createElement("div", {
    style: {
      "flex": "50%",
      "padding": "10px"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      "fontWeight": "bold",
      "fontSize": "25px"
    }
  }, t("SURVEY_PHONE_NUMBER")), data.map(user => /*#__PURE__*/React.createElement("p", {
    style: {
      "margin": "10px 0px 10px 0px"
    }
  }, user[0])))));
};

const SurveyDetailsView = ({
  surveyTitle,
  surveyDesc,
  t,
  surveyId
}) => {
  const history = useHistory();
  const ulbs = Digit.SessionStorage.get("ENGAGEMENT_TENANTS");
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const userInfo = Digit.UserService.getUser().info;
  const userUlbs = ulbs.filter(ulb => {
    var _userInfo$roles;
    return userInfo === null || userInfo === void 0 ? void 0 : (_userInfo$roles = userInfo.roles) === null || _userInfo$roles === void 0 ? void 0 : _userInfo$roles.some(role => (role === null || role === void 0 ? void 0 : role.tenantId) === (ulb === null || ulb === void 0 ? void 0 : ulb.code));
  });
  const selectedTenat = useMemo(() => {
    const filtered = ulbs.filter(item => item.code === tenantId);
    return filtered;
  }, [ulbs]);
  return /*#__PURE__*/React.createElement("div", {
    className: "surveydetailsform-wrapper"
  }, /*#__PURE__*/React.createElement("span", {
    className: "surveyformfield"
  }, /*#__PURE__*/React.createElement("label", null, `${t("LABEL_FOR_ULB")} * :`), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridAutoFlow: "row"
    }
  }, /*#__PURE__*/React.createElement(Dropdown, {
    allowMultiselect: true,
    optionKey: "i18nKey",
    option: userUlbs,
    selected: selectedTenat,
    keepNull: true,
    disable: true,
    t: t
  }), /*#__PURE__*/React.createElement(RemoveableTag, {
    key: "tag",
    text: t(userUlbs[0].i18nKey),
    extraStyles: {
      tagStyles: {
        display: "flex"
      }
    }
  })), /*#__PURE__*/React.createElement(LinkLabel, {
    onClick: () => history.push(`/digit-ui/employee/engagement/surveys/inbox/details/${surveyId}`)
  }, t("VIEW_SURVEY_QUESTIONS"))), /*#__PURE__*/React.createElement("span", {
    className: "surveyformfield"
  }, /*#__PURE__*/React.createElement("label", null, t("CS_SURVEY_NAME")), /*#__PURE__*/React.createElement(TextInput, {
    name: "title",
    type: "text",
    disable: true,
    value: surveyTitle
  })), /*#__PURE__*/React.createElement("span", {
    className: "surveyformfield"
  }, /*#__PURE__*/React.createElement("label", null, t("CS_SURVEY_DESCRIPTION")), /*#__PURE__*/React.createElement(TextInput, {
    name: "description",
    type: "text",
    disable: true,
    value: surveyDesc
  })));
};

const getData = data => {
  const options = data.options;
  const answers = data.answers;
  const processedData = [];
  options === null || options === void 0 ? void 0 : options.map(option => processedData.push({
    name: option,
    value: 0
  }));
  answers === null || answers === void 0 ? void 0 : answers.map((ans, index) => {
    processedData === null || processedData === void 0 ? void 0 : processedData.map((element, i) => {
      if (element.name === ans) processedData[i].value = processedData[i].value + 1;
    });
  });
  return processedData;
};
const COLORS = ["#8E29BF", "#FBC02D", "#048BD0", "#EA8A3B", "#0BABDE", "#800080", "#ee82ee", "#616161", "#3cb371", "#6a5acd"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return /*#__PURE__*/React.createElement("text", {
    x: x,
    y: y,
    fill: "white",
    textAnchor: x > cx ? "start" : "end",
    dominantBaseline: "central"
  }, `${(percent * 100).toFixed(0)}%`);
};
const renderLegend = props => {
  const {
    payload
  } = props;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      height: "300px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: "auto",
      flex: "1"
    }
  }, /*#__PURE__*/React.createElement("ul", {
    style: {
      "listStyle": "disc"
    }
  }, payload === null || payload === void 0 ? void 0 : payload.map((entry, index) => /*#__PURE__*/React.createElement("li", {
    key: `item-${index}`,
    style: {
      "display": "list-item",
      "color": entry.color,
      "fontSize": "19px"
    }
  }, entry.value)))));
};
const McqChart = props => {
  const data = getData(props.data);
  return /*#__PURE__*/React.createElement(PieChart, {
    width: 400,
    height: 400
  }, /*#__PURE__*/React.createElement(Pie, {
    data: data,
    cx: 200,
    cy: 200,
    labelLine: false,
    label: renderCustomizedLabel,
    outerRadius: 120,
    fill: "#8884d8",
    dataKey: "value"
  }, data === null || data === void 0 ? void 0 : data.map((entry, index) => /*#__PURE__*/React.createElement(Cell, {
    key: `cell-${index}`,
    fill: COLORS[index % COLORS.length]
  }))), /*#__PURE__*/React.createElement(Tooltip, null), /*#__PURE__*/React.createElement(Legend, {
    content: renderLegend,
    width: 100,
    align: "right",
    wrapperStyle: {
      top: 40,
      right: 20,
      left: 500,
      backgroundColor: '#FAFAFA',
      borderRadius: 3,
      lineHeight: '40px'
    }
  }));
};

const formObj = data => {
  const checkBoxData = [];
  const options = data.options;
  const answers = data.answers;
  options.map(option => {
    const obj = {};
    obj["name"] = option;
    obj["value"] = 0;
    answers.map(ans => {
      ans.map(el => {
        if (el === option) {
          obj["value"] = obj["value"] + 1;
        }
      });
    });
    checkBoxData.push(obj);
  });
  return checkBoxData;
};
const CheckBoxChart = props => {
  const datav1 = formObj(props.data);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      "padding": "10px",
      "width": "700px",
      "height": "260px",
      "backgroundColor": "#fafafa"
    }
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, null, /*#__PURE__*/React.createElement(BarChart, {
    data: datav1,
    layout: "vertical",
    margin: {
      top: 0,
      right: 50,
      left: 0,
      bottom: 0
    },
    barCategoryGap: 8
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3"
  }), /*#__PURE__*/React.createElement(XAxis, {
    type: "number"
  }), /*#__PURE__*/React.createElement(YAxis, {
    type: "category",
    width: 150,
    padding: {
      left: 20
    },
    dataKey: "name"
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "value",
    fill: "#048BD0"
  }), /*#__PURE__*/React.createElement(Tooltip, null))));
};

const transformDate = date => {
  const split = date.split('-');
  const month = split[1];
  const year = split[0];
  const day = split[2];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return {
    day,
    date: `${monthNames[month - 1]} ${year}`
  };
};
function transformTime(time) {
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  if (time.length > 1) {
    time = time.slice(1);
    time[5] = +time[0] < 12 ? ' AM' : ' PM';
    time[0] = +time[0] % 12 || 12;
  }
  return time.join('');
}
const getUserData = async (data, tenant) => {
  var _userresponse;
  let obj = {};
  let userresponse = [];
  userresponse = data === null || data === void 0 ? void 0 : data.map(ans => {
    return Digit.UserService.userSearch(tenant, {
      uuid: [ans === null || ans === void 0 ? void 0 : ans.citizenId]
    }, {}).then(ob => {
      return ob;
    });
  });
  userresponse = await Promise.all(userresponse);
  userresponse && ((_userresponse = userresponse) === null || _userresponse === void 0 ? void 0 : _userresponse.length) > 0 && userresponse.map(ob => {
    var _ob$user, _ob$user$, _ob$user2, _ob$user2$;
    obj[`+91 ${ob === null || ob === void 0 ? void 0 : (_ob$user = ob.user) === null || _ob$user === void 0 ? void 0 : (_ob$user$ = _ob$user[0]) === null || _ob$user$ === void 0 ? void 0 : _ob$user$.mobileNumber}`] = ob === null || ob === void 0 ? void 0 : (_ob$user2 = ob.user) === null || _ob$user2 === void 0 ? void 0 : (_ob$user2$ = _ob$user2[0]) === null || _ob$user2$ === void 0 ? void 0 : _ob$user2$.emailId;
  });
  return obj;
};
const displayResult = (ques, ans, type, resCount = 0, t) => {
  switch (type) {
    case "Short Answer":
      return (
        /*#__PURE__*/
        React.createElement("div", {
          style: {
            "margin": "30px"
          }
        }, /*#__PURE__*/React.createElement(CardSectionHeader, null, ques.questionStatement), /*#__PURE__*/React.createElement("header", {
          style: {
            "fontWeight": "bold"
          }
        }, `${resCount} ${t("SURVEY_RESPONSES")}`), /*#__PURE__*/React.createElement("div", {
          className: "responses-container"
        }, ans === null || ans === void 0 ? void 0 : ans.map(el => /*#__PURE__*/React.createElement("div", {
          className: "response-result responses-container-line"
        }, el, /*#__PURE__*/React.createElement(BreakLine, {
          style: {
            "marginTop": "10px"
          }
        })))))
      );
    case "Date":
      return /*#__PURE__*/React.createElement("div", {
        style: {
          "margin": "30px"
        }
      }, /*#__PURE__*/React.createElement(CardSectionHeader, null, ques.questionStatement), /*#__PURE__*/React.createElement("header", {
        style: {
          "fontWeight": "bold"
        }
      }, `${resCount} ${t("SURVEY_RESPONSES")}`), /*#__PURE__*/React.createElement("div", {
        className: "date-container"
      }, ans === null || ans === void 0 ? void 0 : ans.map(el => /*#__PURE__*/React.createElement("div", {
        className: "date-response"
      }, /*#__PURE__*/React.createElement("div", null, transformDate(el).date), /*#__PURE__*/React.createElement("div", {
        className: "divide"
      }), /*#__PURE__*/React.createElement("div", null, transformDate(el).day)))));
    case "Time":
      return /*#__PURE__*/React.createElement("div", {
        style: {
          "margin": "30px"
        }
      }, /*#__PURE__*/React.createElement(CardSectionHeader, null, ques.questionStatement), /*#__PURE__*/React.createElement("header", {
        style: {
          "fontWeight": "bold"
        }
      }, `${resCount} ${t("SURVEY_RESPONSES")}`), /*#__PURE__*/React.createElement("div", {
        className: "date-container"
      }, ans === null || ans === void 0 ? void 0 : ans.map(el => /*#__PURE__*/React.createElement("div", {
        className: "date-response"
      }, /*#__PURE__*/React.createElement("div", null, el), /*#__PURE__*/React.createElement("div", {
        className: "divide"
      }), /*#__PURE__*/React.createElement("div", null, transformTime(el))))));
    case "Paragraph":
      return (
        /*#__PURE__*/
        React.createElement("div", {
          style: {
            "margin": "30px"
          }
        }, /*#__PURE__*/React.createElement(CardSectionHeader, null, ques.questionStatement), /*#__PURE__*/React.createElement("header", {
          style: {
            "fontWeight": "bold"
          }
        }, `${resCount} ${t("SURVEY_RESPONSES")}`), /*#__PURE__*/React.createElement("div", {
          className: "responses-container"
        }, ans === null || ans === void 0 ? void 0 : ans.map(el => /*#__PURE__*/React.createElement("div", {
          className: "response-result responses-container-line"
        }, el, /*#__PURE__*/React.createElement(BreakLine, {
          style: {
            "marginTop": "10px"
          }
        })))))
      );
    case "Check Boxes":
      return (
        /*#__PURE__*/
        React.createElement("div", {
          style: {
            "margin": "30px"
          }
        }, /*#__PURE__*/React.createElement(CardSectionHeader, null, ques.questionStatement), /*#__PURE__*/React.createElement("header", {
          style: {
            "fontWeight": "bold"
          }
        }, `${resCount} ${t("SURVEY_RESPONSES")}`), /*#__PURE__*/React.createElement("div", {
          className: "responses-container",
          style: {
            "padding": "30px"
          }
        }, /*#__PURE__*/React.createElement(CheckBoxChart, {
          data: ques
        })))
      );
    case "Multiple Choice":
      return /*#__PURE__*/React.createElement("div", {
        style: {
          "margin": "30px"
        }
      }, /*#__PURE__*/React.createElement(CardSectionHeader, null, ques.questionStatement), /*#__PURE__*/React.createElement("header", {
        style: {
          "fontWeight": "bold"
        }
      }, `${resCount} ${t("SURVEY_RESPONSES")}`), /*#__PURE__*/React.createElement("div", {
        className: "responses-container",
        style: {
          overflow: "-moz-hidden-unscrollable"
        }
      }, /*#__PURE__*/React.createElement(McqChart, {
        data: ques
      })));
  }
};
const SurveyResultsView = ({
  surveyInfo,
  responsesInfoMutation
}) => {
  const {
    t
  } = useTranslation();
  const [data, setData] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const tenant = Digit.ULBService.getCurrentTenantId();
  useEffect(async () => {
    if (responsesInfoMutation.isSuccess) {
      const dp = bindQuesWithAns(surveyInfo === null || surveyInfo === void 0 ? void 0 : surveyInfo.questions, responsesInfoMutation.data.answers);
      setData(dp);
      const ue = await getUserData(responsesInfoMutation.data.answers, tenant.split(".")[0]);
      setUserInfo(ue);
    }
  }, [responsesInfoMutation]);
  const generateExcelObj = (ques, ans) => {
    const countResponses = parseInt(ans.length / ques.length);
    const dp = bindQuesWithAns(surveyInfo === null || surveyInfo === void 0 ? void 0 : surveyInfo.questions, responsesInfoMutation.data.answers);
    const result = [];
    for (let i = 0; i < countResponses; i++) {
      const sampleObj = {
        "TimeStamp": ""
      };
      ques === null || ques === void 0 ? void 0 : ques.map(q => {
        sampleObj[q.questionStatement] = "";
      });
      const qStatements = ques === null || ques === void 0 ? void 0 : ques.map(q => q.questionStatement);
      qStatements === null || qStatements === void 0 ? void 0 : qStatements.map(qs => {
        var _filteredElement$, _filteredElement$$ans, _filteredElement$2, _filteredElement$2$an, _filteredElement$2$an2, _filteredElement$2$an3, _filteredElement$3, _filteredElement$3$an, _filteredElement$3$an2, _filteredElement$4, _filteredElement$4$an, _filteredElement$5, _filteredElement$5$an, _filteredElement$6, _filteredElement$6$an, _filteredElement$7;
        const filteredElement = dp === null || dp === void 0 ? void 0 : dp.filter(element => (element === null || element === void 0 ? void 0 : element.questionStatement) === qs);
        const ansToStore = typeof (filteredElement === null || filteredElement === void 0 ? void 0 : (_filteredElement$ = filteredElement[0]) === null || _filteredElement$ === void 0 ? void 0 : (_filteredElement$$ans = _filteredElement$.answers) === null || _filteredElement$$ans === void 0 ? void 0 : _filteredElement$$ans[i]) === "object" ? filteredElement !== null && filteredElement !== void 0 && (_filteredElement$2 = filteredElement[0]) !== null && _filteredElement$2 !== void 0 && (_filteredElement$2$an = _filteredElement$2.answers) !== null && _filteredElement$2$an !== void 0 && (_filteredElement$2$an2 = _filteredElement$2$an[i]) !== null && _filteredElement$2$an2 !== void 0 && (_filteredElement$2$an3 = _filteredElement$2$an2.join()) !== null && _filteredElement$2$an3 !== void 0 && _filteredElement$2$an3.includes("ul") ? "NA" : filteredElement === null || filteredElement === void 0 ? void 0 : (_filteredElement$3 = filteredElement[0]) === null || _filteredElement$3 === void 0 ? void 0 : (_filteredElement$3$an = _filteredElement$3.answers) === null || _filteredElement$3$an === void 0 ? void 0 : (_filteredElement$3$an2 = _filteredElement$3$an[i]) === null || _filteredElement$3$an2 === void 0 ? void 0 : _filteredElement$3$an2.join() : (filteredElement === null || filteredElement === void 0 ? void 0 : (_filteredElement$4 = filteredElement[0]) === null || _filteredElement$4 === void 0 ? void 0 : (_filteredElement$4$an = _filteredElement$4.answers) === null || _filteredElement$4$an === void 0 ? void 0 : _filteredElement$4$an[i]) === "ul" ? "NA" : (filteredElement === null || filteredElement === void 0 ? void 0 : (_filteredElement$5 = filteredElement[0]) === null || _filteredElement$5 === void 0 ? void 0 : (_filteredElement$5$an = _filteredElement$5.answers) === null || _filteredElement$5$an === void 0 ? void 0 : _filteredElement$5$an[i]) === "" ? "NA" : filteredElement === null || filteredElement === void 0 ? void 0 : (_filteredElement$6 = filteredElement[0]) === null || _filteredElement$6 === void 0 ? void 0 : (_filteredElement$6$an = _filteredElement$6.answers) === null || _filteredElement$6$an === void 0 ? void 0 : _filteredElement$6$an[i];
        sampleObj[qs] = ansToStore;
        sampleObj["TimeStamp"] = filteredElement === null || filteredElement === void 0 ? void 0 : (_filteredElement$7 = filteredElement[0]) === null || _filteredElement$7 === void 0 ? void 0 : _filteredElement$7.timeStamp;
      });
      result.push(sampleObj);
    }
    return result;
  };
  const handleReportDownload = () => {
    const result = generateExcelObj(surveyInfo === null || surveyInfo === void 0 ? void 0 : surveyInfo.questions, responsesInfoMutation.data.answers);
    return Digit.Download.Excel(result, responsesInfoMutation.data.title);
  };
  if (!data) return /*#__PURE__*/React.createElement(Loader, null);
  return /*#__PURE__*/React.createElement("div", {
    className: "custom-group-merge-container"
  }, /*#__PURE__*/React.createElement(Header, null, t("CS_COMMON_SURVEYS")), /*#__PURE__*/React.createElement(MultiLink, {
    style: {
      marginTop: "-45px"
    },
    onHeadClick: () => handleReportDownload(),
    downloadBtnClassName: "employee-download-btn-className",
    label: t("SURVEY_REPORT")
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      "margin": "30px"
    }
  }, /*#__PURE__*/React.createElement(SurveyDetailsView, {
    surveyTitle: surveyInfo.title,
    surveyDesc: surveyInfo.description,
    t: t,
    surveyId: surveyInfo.uuid
  })), /*#__PURE__*/React.createElement(WhoHasResponded, {
    t: t,
    userInfo: userInfo
  }), data === null || data === void 0 ? void 0 : data.map(element => {
    var _element$answers;
    return displayResult(element, element === null || element === void 0 ? void 0 : element.answers, element === null || element === void 0 ? void 0 : element.type, element === null || element === void 0 ? void 0 : (_element$answers = element.answers) === null || _element$answers === void 0 ? void 0 : _element$answers.length, t);
  })));
};

const TypeAnswerEnum = {
  SHORT_ANSWER_TYPE: "Short Answer",
  LONG_ANSWER_TYPE: "Paragraph",
  MULTIPLE_ANSWER_TYPE: "Multiple Choice",
  CHECKBOX_ANSWER_TYPE: "Check Boxes",
  DATE_ANSWER_TYPE: "Date",
  TIME_ANSWER_TYPE: "Time"
};
const SurveyResults = () => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const params = useParams();
  const mutation = Digit.Hooks.survey.useShowResults();
  const queryClient = useQueryClient();
  useEffect(() => {
    const onSuccess = () => {
      queryClient.clear();
    };
    mutation.mutate({
      surveyId: params.id
    }, {
      onSuccess
    });
  }, []);
  const {
    isLoading,
    data: surveyData
  } = Digit.Hooks.survey.useSearch({
    tenantIds: tenantId,
    uuid: params.id
  }, {
    select: data => {
      var _data$Surveys;
      const surveyObj = data === null || data === void 0 ? void 0 : (_data$Surveys = data.Surveys) === null || _data$Surveys === void 0 ? void 0 : _data$Surveys[0];
      return {
        uuid: surveyObj.uuid,
        title: surveyObj.title,
        description: surveyObj.description,
        fromDate: format(new Date(surveyObj.startDate), "yyyy-MM-dd"),
        toDate: format(new Date(surveyObj.endDate), "yyyy-MM-dd"),
        fromTime: format(new Date(surveyObj.startDate), "hh:mm"),
        toTime: format(new Date(surveyObj.endDate), "hh:mm"),
        questions: surveyObj.questions.map(({
          questionStatement,
          type,
          required,
          options,
          uuid,
          surveyId
        }) => ({
          questionStatement,
          type: TypeAnswerEnum[type],
          required,
          options,
          uuid,
          surveyId
        })),
        status: surveyObj.status,
        answersCount: surveyObj.answersCount
      };
    }
  });
  if (isLoading) return /*#__PURE__*/React.createElement(Loader, null);
  return /*#__PURE__*/React.createElement(SurveyResultsView, {
    surveyInfo: surveyData,
    responsesInfoMutation: mutation
  });
};

const Surveys = ({
  match: {
    path
  } = {},
  tenants,
  parentRoute
}) => {
  return /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/inbox/create`,
    component: props => /*#__PURE__*/React.createElement(NewSurveys, props)
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/create`,
    component: props => /*#__PURE__*/React.createElement(NewSurveys, props)
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/inbox/details/:id`,
    component: props => /*#__PURE__*/React.createElement(SurveyDetails, props)
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/inbox/results/:id`,
    component: props => /*#__PURE__*/React.createElement(SurveyResults, props)
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/inbox`,
    component: props => /*#__PURE__*/React.createElement(Inbox$3, Object.assign({}, props, {
      tenants: tenants,
      parentRoute: parentRoute
    }))
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/create-response`,
    component: props => /*#__PURE__*/React.createElement(Acknowledgement$1, props)
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/update-response`,
    component: props => /*#__PURE__*/React.createElement(Response$5, props)
  }), /*#__PURE__*/React.createElement(PrivateRoute, {
    path: `${path}/delete-response`,
    component: props => /*#__PURE__*/React.createElement(Response$6, props)
  }));
};

const NoSurveyFoundPage = ({
  t
}) => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "-webkit-center",
      marginTop: "30%",
      marginRight: "10%"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "255",
    height: "245",
    viewBox: "0 0 255 245",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("g", {
    "clip-path": "url(#clip0_47664_105169)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M214.607 58.0692H213.267V21.2879C213.267 15.642 211.027 10.2273 207.039 6.23508C203.051 2.24282 197.641 2.77689e-09 192.001 2.77689e-09H114.153C111.36 -4.51493e-05 108.595 0.550538 106.015 1.62031C103.435 2.69009 101.09 4.2581 99.1157 6.23483C97.1409 8.21157 95.5744 10.5583 94.5056 13.141C93.4369 15.7238 92.8868 18.492 92.8867 21.2875V223.073C92.8867 228.719 95.1273 234.133 99.1154 238.125C103.104 242.118 108.513 244.36 114.153 244.36H192C197.64 244.36 203.049 242.118 207.038 238.125C211.026 234.133 213.266 228.719 213.266 223.073V84.2507H214.606L214.607 58.0692Z",
    fill: "#3F3D56"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M208.905 19.8617V224.497C208.904 228.778 207.206 232.883 204.182 235.91C201.159 238.938 197.058 240.639 192.782 240.641H113.337C109.059 240.641 104.956 238.941 101.93 235.914C98.9044 232.886 97.2039 228.78 97.2026 224.497V19.8617C97.2039 15.5795 98.9043 11.4732 101.93 8.44588C104.955 5.41857 109.058 3.7182 113.336 3.71875H122.973C122.5 4.88362 122.32 6.14702 122.449 7.39789C122.577 8.64876 123.011 9.84881 123.712 10.8926C124.412 11.9363 125.358 12.7918 126.467 13.3838C127.575 13.9759 128.812 14.2863 130.068 14.2879H175.361C176.617 14.2863 177.854 13.9759 178.962 13.3838C180.07 12.7918 181.016 11.9363 181.717 10.8926C182.418 9.84881 182.851 8.64876 182.98 7.39789C183.109 6.14702 182.929 4.88362 182.456 3.71875H192.779C197.055 3.71948 201.156 5.42005 204.18 8.44661C207.204 11.4732 208.904 15.578 208.905 19.8586V19.8617Z",
    fill: "white"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M153.04 102.01C171.357 102.01 186.207 87.1455 186.207 68.8088C186.207 50.4722 171.357 35.6074 153.04 35.6074C134.722 35.6074 119.872 50.4722 119.872 68.8088C119.872 87.1455 134.722 102.01 153.04 102.01Z",
    fill: "#a82227"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M189.213 137.735H118.616C118.27 137.734 117.937 137.596 117.692 137.351C117.447 137.106 117.309 136.773 117.309 136.426V118.896C117.31 118.55 117.447 118.217 117.692 117.972C117.938 117.726 118.27 117.588 118.616 117.588H189.213C189.559 117.588 189.891 117.726 190.137 117.972C190.382 118.217 190.519 118.55 190.52 118.896V136.426C190.519 136.773 190.382 137.106 190.137 137.351C189.891 137.596 189.559 137.735 189.213 137.735V137.735ZM118.616 118.111C118.408 118.111 118.209 118.194 118.062 118.341C117.915 118.489 117.832 118.688 117.832 118.896V136.426C117.832 136.635 117.915 136.834 118.062 136.981C118.209 137.129 118.408 137.211 118.616 137.212H189.213C189.421 137.211 189.62 137.129 189.767 136.981C189.914 136.834 189.997 136.635 189.997 136.426V118.896C189.997 118.688 189.914 118.489 189.767 118.341C189.62 118.194 189.421 118.111 189.213 118.111H118.616Z",
    fill: "#E6E6E6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M140.449 123.901C140.206 123.901 139.973 123.998 139.802 124.17C139.63 124.341 139.534 124.575 139.534 124.817C139.534 125.06 139.63 125.293 139.802 125.465C139.973 125.637 140.206 125.734 140.449 125.734H183.591C183.833 125.743 184.07 125.655 184.248 125.49C184.426 125.325 184.531 125.096 184.541 124.853C184.55 124.61 184.462 124.374 184.297 124.195C184.132 124.017 183.903 123.912 183.661 123.902C183.647 123.902 183.634 123.902 183.621 123.902L140.449 123.901Z",
    fill: "#E6E6E6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M140.449 129.396C140.206 129.396 139.973 129.493 139.802 129.665C139.63 129.837 139.534 130.07 139.534 130.313C139.534 130.556 139.63 130.789 139.802 130.96C139.973 131.132 140.206 131.229 140.449 131.229H183.591C183.833 131.238 184.07 131.15 184.248 130.985C184.426 130.82 184.531 130.591 184.541 130.348C184.55 130.105 184.462 129.869 184.297 129.69C184.132 129.512 183.903 129.407 183.661 129.397C183.647 129.397 183.634 129.397 183.621 129.397L140.449 129.396Z",
    fill: "#E6E6E6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M189.213 166.953H118.616C118.27 166.953 117.937 166.815 117.692 166.57C117.447 166.324 117.309 165.992 117.309 165.645V148.115C117.31 147.768 117.447 147.436 117.692 147.19C117.938 146.945 118.27 146.807 118.616 146.807H189.213C189.559 146.807 189.891 146.945 190.137 147.19C190.382 147.436 190.519 147.768 190.52 148.115V165.645C190.519 165.992 190.381 166.324 190.136 166.57C189.891 166.815 189.559 166.953 189.213 166.953ZM118.616 147.33C118.408 147.33 118.209 147.413 118.062 147.56C117.915 147.707 117.832 147.907 117.832 148.115V165.645C117.832 165.853 117.915 166.053 118.062 166.2C118.209 166.347 118.408 166.43 118.616 166.43H189.213C189.421 166.43 189.62 166.347 189.767 166.2C189.914 166.053 189.997 165.853 189.997 165.645V148.115C189.997 147.907 189.914 147.707 189.767 147.56C189.62 147.413 189.421 147.33 189.213 147.33H118.616Z",
    fill: "#E6E6E6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M140.449 153.214C140.206 153.214 139.973 153.31 139.802 153.482C139.63 153.654 139.534 153.887 139.534 154.13C139.534 154.373 139.63 154.606 139.802 154.778C139.973 154.95 140.206 155.046 140.449 155.046H183.591C183.83 155.045 184.059 154.95 184.229 154.781C184.399 154.613 184.497 154.384 184.501 154.145C184.505 153.905 184.415 153.674 184.25 153.5C184.086 153.326 183.86 153.223 183.621 153.214H140.449V153.214Z",
    fill: "#E6E6E6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M140.449 158.711C140.206 158.711 139.973 158.807 139.802 158.979C139.63 159.151 139.534 159.384 139.534 159.627C139.534 159.87 139.63 160.103 139.802 160.275C139.973 160.447 140.206 160.543 140.449 160.543H183.591C183.83 160.542 184.059 160.447 184.229 160.278C184.399 160.11 184.497 159.881 184.501 159.642C184.505 159.402 184.415 159.171 184.25 158.997C184.086 158.823 183.86 158.72 183.621 158.711H140.449V158.711Z",
    fill: "#E6E6E6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M189.213 196.267H118.616C118.27 196.266 117.937 196.129 117.692 195.883C117.447 195.638 117.309 195.305 117.309 194.958V177.429C117.31 177.082 117.447 176.749 117.692 176.504C117.938 176.259 118.27 176.121 118.616 176.12H189.213C189.559 176.121 189.891 176.259 190.137 176.504C190.382 176.749 190.519 177.082 190.52 177.429V194.959C190.519 195.306 190.382 195.638 190.137 195.883C189.891 196.129 189.559 196.267 189.213 196.267V196.267ZM118.616 176.643C118.408 176.644 118.209 176.726 118.062 176.874C117.915 177.021 117.832 177.221 117.832 177.429V194.959C117.832 195.167 117.915 195.366 118.062 195.514C118.209 195.661 118.408 195.744 118.616 195.744H189.213C189.421 195.744 189.62 195.661 189.767 195.514C189.914 195.366 189.997 195.167 189.997 194.959V177.429C189.997 177.221 189.914 177.021 189.767 176.874C189.62 176.726 189.421 176.644 189.213 176.643H118.616Z",
    fill: "#E6E6E6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M140.449 182.529C140.206 182.529 139.973 182.626 139.802 182.798C139.63 182.969 139.534 183.202 139.534 183.445C139.534 183.688 139.63 183.921 139.802 184.093C139.973 184.265 140.206 184.362 140.449 184.362H183.591C183.711 184.366 183.831 184.347 183.943 184.305C184.056 184.264 184.16 184.2 184.248 184.118C184.336 184.036 184.407 183.938 184.457 183.829C184.508 183.719 184.536 183.601 184.541 183.481C184.545 183.361 184.526 183.241 184.484 183.128C184.443 183.015 184.379 182.912 184.297 182.823C184.216 182.735 184.117 182.664 184.008 182.613C183.899 182.563 183.781 182.535 183.661 182.53C183.647 182.53 183.634 182.53 183.621 182.53L140.449 182.529Z",
    fill: "#E6E6E6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M140.449 188.025C140.206 188.025 139.973 188.122 139.802 188.294C139.63 188.466 139.534 188.699 139.534 188.942C139.534 189.184 139.63 189.418 139.802 189.589C139.973 189.761 140.206 189.858 140.449 189.858H183.591C183.711 189.862 183.831 189.843 183.943 189.801C184.056 189.76 184.16 189.696 184.248 189.614C184.336 189.533 184.407 189.434 184.457 189.325C184.508 189.216 184.536 189.097 184.541 188.977C184.545 188.857 184.526 188.737 184.484 188.624C184.443 188.511 184.379 188.408 184.297 188.319C184.216 188.231 184.117 188.16 184.008 188.11C183.899 188.059 183.781 188.031 183.661 188.026C183.647 188.026 183.634 188.026 183.621 188.026H140.449L140.449 188.025Z",
    fill: "#E6E6E6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M254.334 245H0.665646C0.297787 245 0 244.839 0 244.641C0 244.442 0.29813 244.281 0.665646 244.281H254.334C254.702 244.281 255 244.442 255 244.641C255 244.839 254.702 245 254.334 245Z",
    fill: "#E6E6E6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M243.591 230.984C242.507 231.365 241.344 231.461 240.212 231.261C239.081 231.062 238.02 230.574 237.132 229.845C234.869 227.944 234.16 224.812 233.583 221.913L231.876 213.336L235.45 215.799C238.02 217.571 240.648 219.399 242.428 221.965C244.208 224.531 244.984 228.034 243.554 230.81",
    fill: "#E6E6E6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M243.039 241.965C243.489 238.684 243.952 235.361 243.636 232.046C243.356 229.101 242.458 226.225 240.631 223.866C239.661 222.617 238.481 221.547 237.144 220.703C236.795 220.483 236.474 221.036 236.821 221.255C239.135 222.719 240.925 224.881 241.932 227.429C243.045 230.263 243.224 233.351 243.032 236.361C242.915 238.181 242.67 239.989 242.422 241.795C242.403 241.877 242.415 241.963 242.456 242.036C242.498 242.109 242.565 242.163 242.646 242.188C242.727 242.21 242.814 242.199 242.888 242.157C242.961 242.115 243.016 242.046 243.038 241.965H243.039Z",
    fill: "#F2F2F2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M239.801 236.7C239.337 237.408 238.698 237.983 237.946 238.371C237.195 238.759 236.356 238.947 235.511 238.917C233.339 238.814 231.529 237.297 229.899 235.857L225.078 231.595L228.269 231.443C230.563 231.333 232.917 231.23 235.104 231.938C237.291 232.647 239.305 234.351 239.704 236.614",
    fill: "#E6E6E6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M244.311 243.85C242.147 240.015 239.633 235.752 235.145 234.389C233.897 234.011 232.589 233.876 231.29 233.991C230.88 234.025 230.983 234.658 231.393 234.622C233.57 234.441 235.742 235.017 237.545 236.252C239.28 237.434 240.631 239.077 241.774 240.82C242.474 241.885 243.101 243 243.728 244.111C243.928 244.466 244.514 244.21 244.311 243.85Z",
    fill: "#F2F2F2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M127.423 133.05C130.456 133.05 132.914 130.59 132.914 127.554C132.914 124.518 130.456 122.058 127.423 122.058C124.391 122.058 121.933 124.518 121.933 127.554C121.933 130.59 124.391 133.05 127.423 133.05Z",
    fill: "#a82227"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M124.795 126.527C124.731 126.527 124.68 126.938 124.68 127.443C124.68 127.949 124.731 128.36 124.795 128.36H130.194C130.257 128.368 130.309 127.965 130.31 127.459C130.345 127.144 130.307 126.825 130.197 126.528H124.795V126.527Z",
    fill: "#E6E6E6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M127.423 162.376C130.456 162.376 132.914 159.915 132.914 156.879C132.914 153.844 130.456 151.383 127.423 151.383C124.391 151.383 121.933 153.844 121.933 156.879C121.933 159.915 124.391 162.376 127.423 162.376Z",
    fill: "#a82227"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M124.795 155.853C124.731 155.853 124.68 156.263 124.68 156.768C124.68 157.274 124.731 157.685 124.795 157.685H130.194C130.257 157.693 130.309 157.29 130.31 156.784C130.345 156.469 130.307 156.15 130.197 155.853L124.795 155.853Z",
    fill: "#E6E6E6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M127.423 191.69C130.456 191.69 132.914 189.229 132.914 186.194C132.914 183.158 130.456 180.697 127.423 180.697C124.391 180.697 121.933 183.158 121.933 186.194C121.933 189.229 124.391 191.69 127.423 191.69Z",
    fill: "#a82227"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M124.795 185.167C124.731 185.167 124.68 185.577 124.68 186.083C124.68 186.589 124.731 186.999 124.795 186.999H130.194C130.257 187.007 130.309 186.604 130.31 186.098C130.345 185.784 130.307 185.465 130.197 185.167L124.795 185.167Z",
    fill: "#E6E6E6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M145.875 59.6918L143.932 61.6367L160.204 77.9258L162.147 75.9808L145.875 59.6918Z",
    fill: "white"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M162.147 61.6373L160.204 59.6924L143.932 75.9815L145.875 77.9264L162.147 61.6373Z",
    fill: "white"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M71.002 156.83C71.478 156.662 71.9113 156.391 72.2713 156.036C72.6314 155.682 72.9094 155.253 73.0858 154.779C73.2622 154.305 73.3328 153.799 73.2925 153.295C73.2522 152.791 73.102 152.302 72.8526 151.863L80.9466 142.626L74.6282 141.754L67.9107 150.659C67.201 151.127 66.6875 151.84 66.4677 152.662C66.2479 153.484 66.3369 154.358 66.718 155.119C67.099 155.88 67.7456 156.474 68.5352 156.789C69.3248 157.105 70.2025 157.119 71.002 156.83Z",
    fill: "#9F616A"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M80.7632 238.688L75.1182 238.688L72.4326 216.892L80.7642 216.892L80.7632 238.688Z",
    fill: "#9F616A"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M82.2023 244.166L64 244.165V243.935C64.0001 242.054 64.7466 240.25 66.0752 238.92C67.4039 237.59 69.2058 236.843 71.0848 236.843H71.0853L82.2026 236.843L82.2023 244.166Z",
    fill: "#2F2E41"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M110.313 233.959L104.922 235.634L95.9004 215.615L103.857 213.143L110.313 233.959Z",
    fill: "#9F616A"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M113.311 238.763L95.9269 244.166L95.8586 243.945C95.3015 242.149 95.4801 240.205 96.3549 238.54C97.2298 236.876 98.7294 235.627 100.524 235.069L100.524 235.069L111.142 231.77L113.311 238.763Z",
    fill: "#2F2E41"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M76.4396 138.198L68.0791 147.783L74.6244 148.373L76.4396 138.198Z",
    fill: "#a82227"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M73.173 150.552C73.173 150.552 70.269 152.006 69.9059 158.546C69.5429 165.087 70.9951 182.167 70.9951 182.167C70.9951 182.167 69.5432 189.798 70.9951 196.702C72.4469 203.606 69.5432 228.678 71.3581 228.678C73.173 228.678 82.611 229.768 82.974 228.678C83.3371 227.587 83.7001 211.236 83.7001 211.236C83.7001 211.236 86.6042 202.878 83.7001 197.792C83.7001 197.792 93.8397 215.516 100.398 229.042C101.833 232.002 112.74 228.679 110.925 225.408C109.11 222.138 104.754 207.24 104.754 207.24C104.754 207.24 101.487 196.338 95.6794 191.614L98.5835 168.359C98.5835 168.359 104.755 152.733 101.125 150.553C97.4957 148.373 73.173 150.552 73.173 150.552Z",
    fill: "#2F2E41"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M84.0629 91.322C89.2754 91.322 93.5009 87.0921 93.5009 81.8744C93.5009 76.6566 89.2754 72.4268 84.0629 72.4268C78.8505 72.4268 74.625 76.6566 74.625 81.8744C74.625 87.0921 78.8505 91.322 84.0629 91.322Z",
    fill: "#A0616A"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M94.5899 92.0488L82.8568 98.9528C82.8568 98.9528 78.3642 101.485 76.686 105.857C74.8972 110.516 75.9369 117.075 76.686 118.575C78.1379 121.482 76.077 128.749 76.077 128.749L74.2621 145.464C74.2621 145.464 67.7282 151.642 72.8103 152.368C77.8923 153.095 86.9672 152.005 92.4123 152.368C97.8573 152.732 104.028 153.459 102.213 149.824C100.398 146.189 98.2204 143.647 100.398 136.381C102.103 130.694 102.029 109.431 101.916 100.451C101.901 99.2177 101.57 98.0091 100.956 96.9398C100.342 95.8706 99.4655 94.9763 98.4089 94.3421L94.5899 92.0488Z",
    fill: "#a82227"
  }), /*#__PURE__*/React.createElement("path", {
    opacity: "0.1",
    d: "M89.3278 103.496L90.4166 125.662L79.8631 147.056L78.0732 146.374L88.9634 126.388L89.3278 103.496Z",
    fill: "black"
  }), /*#__PURE__*/React.createElement("path", {
    opacity: "0.1",
    d: "M101.305 130.385V127.841L88.9648 148.19L101.305 130.385Z",
    fill: "black"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M77.3647 73.1222L75.8057 72.4978C75.8057 72.4978 79.0687 68.9025 83.607 69.215L82.3303 67.8081C82.3303 67.8081 85.4508 66.5576 88.2879 69.8401C89.7792 71.5657 91.5045 73.5943 92.5813 75.879H94.2523L93.555 77.4162L95.9957 78.9535L93.4904 78.6784C93.7277 80.0055 93.6465 81.3701 93.2534 82.6596L93.3221 83.8746C93.3221 83.8746 90.4167 79.3743 90.4167 78.7499V80.3133C90.4167 80.3133 88.8563 78.9064 88.8563 77.9684L88.0052 79.0628L87.5796 77.3437L82.3314 79.0628L83.1818 77.6552L79.9188 78.1242L81.1955 76.405C81.1955 76.405 77.5076 78.4371 77.3658 80.1569C77.2239 81.8767 75.3802 84.0648 75.3802 84.0648L74.529 82.5014C74.529 82.5014 73.2527 75.4671 77.3647 73.1222Z",
    fill: "#2F2E41"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M83.4712 157.858C83.9097 157.608 84.2881 157.264 84.5795 156.851C84.871 156.439 85.0685 155.967 85.1582 155.47C85.2478 154.972 85.2274 154.461 85.0984 153.972C84.9694 153.484 84.735 153.029 84.4116 152.641L90.7392 142.113L84.3665 142.377L79.3346 152.334C78.7192 152.921 78.3404 153.714 78.2698 154.562C78.1992 155.41 78.4419 156.255 78.9518 156.936C79.4617 157.617 80.2033 158.087 81.0363 158.257C81.8693 158.427 82.7356 158.285 83.4712 157.858Z",
    fill: "#9F616A"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M97.8577 96.7735L100.58 96.2285C100.58 96.2285 108.748 102.224 106.206 114.215C103.665 126.207 92.4126 144.375 92.4126 144.375C92.4126 144.375 89.8709 147.646 89.1455 148.372C88.4201 149.099 86.9676 148.372 87.6937 149.463C88.4198 150.553 86.6045 151.279 86.6045 151.279C86.6045 151.279 78.6184 151.279 79.3445 148.372C80.0706 145.465 92.4126 124.752 92.4126 124.752L90.5977 105.493C90.5977 105.493 89.1452 96.0466 97.8577 96.7735Z",
    fill: "#a82227"
  })), /*#__PURE__*/React.createElement("defs", null)), /*#__PURE__*/React.createElement("h", {
    style: {
      color: "#505A5F",
      fontWeight: "400",
      fontFamily: "Roboto",
      marginLeft: "10%",
      lineHeight: "3"
    }
  }, t("SURVEY_ENDED_MESSAGE"))), /*#__PURE__*/React.createElement(ActionBar, null, /*#__PURE__*/React.createElement(Link, {
    to: "/digit-ui/citizen"
  }, /*#__PURE__*/React.createElement(SubmitBar, {
    label: t("CORE_COMMON_GO_TO_HOME")
  }))));
};

const transformSurveyResponseData = data => {
  if (!data) return;
  const questions = [];
  for (const key in data) {
    questions.push({
      questionId: key,
      answer: [data[key]]
    });
  }
  return questions;
};
const FillSurvey = ({
  location
}) => {
  var _data$Surveys, _data$Surveys2, _surveyData$questions, _data$Surveys3, _data$Surveys3$, _initialData$Surveys6, _initialData$Surveys7, _Object$keys;
  const {
    applicationNumber: surveyId,
    tenantId
  } = Digit.Hooks.useQueryParams();
  const {
    data,
    isLoading
  } = Digit.Hooks.survey.useSearch({
    uuid: surveyId,
    tenantId
  }, {});
  const surveyData = data !== null && data !== void 0 && (_data$Surveys = data.Surveys) !== null && _data$Surveys !== void 0 && _data$Surveys[0] ? data === null || data === void 0 ? void 0 : (_data$Surveys2 = data.Surveys) === null || _data$Surveys2 === void 0 ? void 0 : _data$Surveys2[0] : {};
  const {
    t
  } = useTranslation();
  let initialData = data;
  const [showToast, setShowToast] = useState(null);
  surveyData === null || surveyData === void 0 ? void 0 : (_surveyData$questions = surveyData.questions) === null || _surveyData$questions === void 0 ? void 0 : _surveyData$questions.sort((a, b) => a.qorder - b.qorder);
  const history = useHistory();
  useEffect(() => {
    var _initialData$Surveys, _initialData$Surveys$, _initialData$Surveys2, _initialData$Surveys3, _initialData$Surveys4, _initialData$Surveys5;
    if (data && (initialData === null || initialData === void 0 ? void 0 : (_initialData$Surveys = initialData.Surveys) === null || _initialData$Surveys === void 0 ? void 0 : (_initialData$Surveys$ = _initialData$Surveys[0]) === null || _initialData$Surveys$ === void 0 ? void 0 : _initialData$Surveys$.hasResponded) == true || (initialData === null || initialData === void 0 ? void 0 : (_initialData$Surveys2 = initialData.Surveys) === null || _initialData$Surveys2 === void 0 ? void 0 : (_initialData$Surveys3 = _initialData$Surveys2[0]) === null || _initialData$Surveys3 === void 0 ? void 0 : _initialData$Surveys3.hasResponded) === "true") setShowToast({
      key: true,
      label: "SURVEY_FORM_IS_ALREADY_SUBMITTED"
    });else if (data && (initialData === null || initialData === void 0 ? void 0 : (_initialData$Surveys4 = initialData.Surveys) === null || _initialData$Surveys4 === void 0 ? void 0 : (_initialData$Surveys5 = _initialData$Surveys4[0]) === null || _initialData$Surveys5 === void 0 ? void 0 : _initialData$Surveys5.status) == "INACTIVE") setShowToast({
      key: true,
      label: "SURVEY_FORM_IS_ALREADY_INACTIVE"
    });
  }, [data === null || data === void 0 ? void 0 : (_data$Surveys3 = data.Surveys) === null || _data$Surveys3 === void 0 ? void 0 : (_data$Surveys3$ = _data$Surveys3[0]) === null || _data$Surveys3$ === void 0 ? void 0 : _data$Surveys3$.hasResponded, initialData === null || initialData === void 0 ? void 0 : (_initialData$Surveys6 = initialData.Surveys) === null || _initialData$Surveys6 === void 0 ? void 0 : (_initialData$Surveys7 = _initialData$Surveys6[0]) === null || _initialData$Surveys7 === void 0 ? void 0 : _initialData$Surveys7.hasResponded]);
  const onSubmit = data => {
    const details = {
      AnswerEntity: {
        surveyId: surveyData.uuid,
        answers: transformSurveyResponseData(data),
        surveyTitle: surveyData.title,
        hasResponded: surveyData.hasResponded
      }
    };
    history.push("/digit-ui/citizen/engagement/surveys/submit-response", details);
  };
  if (((_Object$keys = Object.keys(surveyData)) === null || _Object$keys === void 0 ? void 0 : _Object$keys.length) > 0 || isLoading) return /*#__PURE__*/React.createElement(CitizenSurveyForm, {
    surveyData: surveyData,
    isSubmitDisabled: showToast ? true : false,
    isLoading: isLoading,
    onFormSubmit: onSubmit,
    formDisabled: showToast ? true : false,
    showToast: showToast
  });else return /*#__PURE__*/React.createElement(NoSurveyFoundPage, {
    t: t
  });
};

const ShowSurvey = ({
  location
}) => {
  var _mutation$data;
  const surveyData = location === null || location === void 0 ? void 0 : location.state;
  const tenantIds = Digit.ULBService.getCitizenCurrentTenant();
  const mutation = Digit.Hooks.survey.useShowResults();
  const queryClient = useQueryClient();
  useEffect(() => {
    const onSuccess = () => {
      queryClient.clear();
    };
    mutation.mutate({
      surveyId: surveyData.uuid
    }, {
      onSuccess
    });
  }, []);
  if (mutation.isLoading && !mutation.isIdle) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  if (mutation.isError) return /*#__PURE__*/React.createElement("div", null, "An error occured...");
  const answers = mutation === null || mutation === void 0 ? void 0 : (_mutation$data = mutation.data) === null || _mutation$data === void 0 ? void 0 : _mutation$data.answers;
  const formDefaultValues = {};
  answers === null || answers === void 0 ? void 0 : answers.map(ans => {
    if ((ans === null || ans === void 0 ? void 0 : ans.answer.length) === 1) formDefaultValues[ans === null || ans === void 0 ? void 0 : ans.questionId] = ans === null || ans === void 0 ? void 0 : ans.answer[0];else formDefaultValues[ans === null || ans === void 0 ? void 0 : ans.questionId] = ans === null || ans === void 0 ? void 0 : ans.answer;
  });
  return /*#__PURE__*/React.createElement(CitizenSurveyForm, {
    surveyData: surveyData,
    submitDisabled: true,
    formDisabled: true,
    formDefaultValues: formDefaultValues
  });
};

const EventsBreadCrumb = ({
  location
}) => {
  const {
    t
  } = useTranslation();
  const crumbs = [{
    path: "/digit-ui/employee",
    content: t("ES_COMMON_HOME"),
    show: true
  }, {
    path: "/digit-ui/employee/engagement/event/inbox",
    content: t("ES_EVENT_INBOX"),
    show: location.pathname.includes("event/inbox") ? true : false
  }, {
    path: "/digit-ui/employee/event/new-event",
    content: t("ES_EVENT_NEW_EVENT"),
    show: location.pathname.includes("event/new-event") ? true : false
  }, {
    path: "/digit-ui/employee/event/inbox/new-event",
    content: t("ES_EVENT_NEW_EVENT"),
    show: location.pathname.includes("event/inbox/new-event") ? true : false
  }, {
    path: "/digit-ui/employee/event/inbox/event-details",
    content: t("ES_EVENT_EVENT_DETAILS"),
    show: location.pathname.includes("event-details") ? true : false
  }, {
    path: "/digit-ui/employee/engagement/event/edit-event",
    content: t("ES_EVENT_EDIT_EVENT"),
    show: location.pathname.includes("event/edit-event") ? true : false
  }, {
    path: "/digit-ui/employee/event/response",
    content: t("ES_EVENT_NEW_EVENT_RESPONSE"),
    show: location.pathname.includes("event/response") ? true : false
  }, {
    path: "/digit-ui/employee/engagement/documents/inbox",
    content: t("ES_EVENT_INBOX"),
    show: location.pathname.includes("/documents/inbox") ? true : false
  }, {
    path: "/digit-ui/employee/engagement/documents/new-doc",
    content: t("NEW_DOCUMENT_TEXT"),
    show: location.pathname.includes("/documents/new-doc") ? true : false
  }, {
    path: "/digit-ui/employee/engagement/documents/inbox/new-doc",
    content: t("NEW_DOCUMENT_TEXT"),
    show: location.pathname.includes("/documents/inbox/new-doc") ? true : false
  }, {
    path: "/digit-ui/employee/engagement/documents/response",
    content: t("ES_EVENT_NEW_EVENT_RESPONSE"),
    show: location.pathname.includes("/documents/response") ? true : false
  }, {
    path: "/digit-ui/employee/engagement/documents/delete-response",
    content: t("ES_EVENT_NEW_EVENT_RESPONSE"),
    show: location.pathname.includes("/documents/delete-response") ? true : false
  }, {
    path: "/digit-ui/employee/engagement/documents/update-response",
    content: t("ES_EVENT_NEW_EVENT_RESPONSE"),
    show: location.pathname.includes("/documents/update-response") ? true : false
  }, {
    path: "/digit-ui/employee/engagement/documents/inbox/details/:id",
    content: t("CE_DOCUMENT_DETAILS"),
    show: location.pathname.includes("/documents/inbox/details") ? true : false
  }, {
    path: "/digit-ui/employee/engagement/documents/inbox/update",
    content: t("DOCUMENTS_EDIT_HEADER"),
    show: location.pathname.includes("/documents/inbox/update") ? true : false
  }, {
    path: "/digit-ui/employee/engagement/messages/inbox",
    content: t("ES_EVENT_INBOX"),
    show: location.pathname.includes("/messages/inbox") ? true : false
  }, {
    path: "/digit-ui/employee/engagement/messages/create",
    content: t("NEW_PUBLIC_BRDCST"),
    show: location.pathname.includes("/messages/create") ? true : false
  }, {
    path: "/digit-ui/employee/engagement/messages/inbox/create",
    content: t("NEW_PUBLIC_BRDCST"),
    show: location.pathname.includes("/messages/inbox/create") ? true : false
  }, {
    path: "/digit-ui/employee/engagement/messages/inbox/details/:id",
    content: t("CS_HEADER_PUBLIC_BRDCST"),
    show: location.pathname.includes("/messages/inbox/details") ? true : false
  }, {
    path: "/digit-ui/employee/engagement/messages/inbox/edit/:id",
    content: t("EDIT_PUBLIC_BRDCST"),
    show: location.pathname.includes("/messages/inbox/edit") ? true : false
  }, {
    path: "/digit-ui/employee/engagement/messages/response",
    content: t("ES_EVENT_NEW_EVENT_RESPONSE"),
    show: location.pathname.includes("/messages/response") ? true : false
  }, {
    path: "/digit-ui/employee/engagement/messages/response?update=true",
    content: t("ES_EVENT_NEW_EVENT_RESPONSE"),
    show: location.pathname.includes("/messages/response?update=true") ? true : false
  }, {
    path: "/digit-ui/employee/engagement/messages/response?delete=true",
    content: t("ES_EVENT_NEW_EVENT_RESPONSE"),
    show: location.pathname.includes("/messages/response?delete=true") ? true : false
  }, {
    path: "/digit-ui/employee/engagement/surveys/inbox",
    content: t("ES_EVENT_INBOX"),
    show: location.pathname.includes("/surveys/inbox") ? true : false
  }, {
    path: "/digit-ui/employee/engagement/surveys/inbox/create",
    content: t("CS_COMMON_SURVEYS"),
    show: location.pathname.includes("/surveys/inbox/create") ? true : false
  }, {
    path: "/digit-ui/employee/engagement/surveys/create",
    content: t("CS_COMMON_SURVEYS"),
    show: location.pathname.includes("/surveys/create") ? true : false
  }, {
    path: "/digit-ui/employee/engagement/survey/create-response",
    content: t("ES_EVENT_NEW_EVENT_RESPONSE"),
    show: location.pathname.includes("/engagement/survey/create-response") ? true : false
  }];
  return /*#__PURE__*/React.createElement(BreadCrumb, {
    crumbs: crumbs
  });
};
const EmployeeApp = ({
  path,
  url,
  userType,
  tenants
}) => {
  const location = useLocation();
  return (
    /*#__PURE__*/
    React.createElement(Fragment, null, /*#__PURE__*/React.createElement(EventsBreadCrumb, {
      location: location
    }), /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(Route, {
      path: `${path}/event/inbox`,
      exact: true
    }, /*#__PURE__*/React.createElement(Inbox, {
      tenants: tenants,
      parentRoute: path
    })), /*#__PURE__*/React.createElement(Route, {
      path: `${path}/event/response`,
      component: props => /*#__PURE__*/React.createElement(Response, props)
    }), /*#__PURE__*/React.createElement(Route, {
      path: `${path}/event/inbox/new-event`
    }, /*#__PURE__*/React.createElement(NewEvents, null)), /*#__PURE__*/React.createElement(Route, {
      path: `${path}/event/new-event`
    }, /*#__PURE__*/React.createElement(NewEvents, null)), /*#__PURE__*/React.createElement(Route, {
      path: `${path}/event/edit-event/:id`
    }, /*#__PURE__*/React.createElement(EditEvents, null)), /*#__PURE__*/React.createElement(Route, {
      path: `${path}/event/inbox/event-details/:id`
    }, /*#__PURE__*/React.createElement(EventDetails, null)), /*#__PURE__*/React.createElement(Route, {
      exact: true,
      path: `${path}/documents/inbox/update`,
      component: props => /*#__PURE__*/React.createElement(Documents$1, props)
    }), /*#__PURE__*/React.createElement(Route, {
      exact: true,
      path: `${path}/documents/inbox/new-doc`,
      component: () => /*#__PURE__*/React.createElement(Documents, {
        path
      })
    }), /*#__PURE__*/React.createElement(Route, {
      exact: true,
      path: `${path}/documents/new-doc`,
      component: () => /*#__PURE__*/React.createElement(Documents, {
        path
      })
    }), /*#__PURE__*/React.createElement(Route, {
      path: `${path}/documents/inbox/details/:id`,
      component: props => /*#__PURE__*/React.createElement(DocumentDetails$1, props)
    }), /*#__PURE__*/React.createElement(Route, {
      path: `${path}/documents/response`,
      component: props => /*#__PURE__*/React.createElement(Response$2, props)
    }), /*#__PURE__*/React.createElement(Route, {
      path: `${path}/documents/update-response`,
      component: props => /*#__PURE__*/React.createElement(Response$3, props)
    }), /*#__PURE__*/React.createElement(Route, {
      path: `${path}/documents/delete-response`,
      component: props => /*#__PURE__*/React.createElement(Response$4, props)
    }), /*#__PURE__*/React.createElement(Route, {
      path: `${path}/documents/inbox`,
      component: props => /*#__PURE__*/React.createElement(Inbox$2, {
        tenants: tenants
      })
    }), /*#__PURE__*/React.createElement(Route, {
      path: `${path}/messages`,
      component: props => /*#__PURE__*/React.createElement(Messages, Object.assign({}, props, {
        tenants: tenants,
        parentRoute: path
      }))
    }), /*#__PURE__*/React.createElement(Route, {
      path: `${path}/surveys`,
      component: props => /*#__PURE__*/React.createElement(Surveys, Object.assign({}, props, {
        tenants: tenants,
        parentRoute: path
      }))
    })))
  );
};
const EngagementModule = ({
  stateCode,
  userType,
  tenants
}) => {
  const moduleCode = "Engagement";
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
  Digit.SessionStorage.set("ENGAGEMENT_TENANTS", tenants);
  if (userType === "citizen") {
    return /*#__PURE__*/React.createElement(CitizenApp, {
      path: path,
      url: url,
      userType: userType,
      tenants: tenants
    });
  } else {
    return /*#__PURE__*/React.createElement(EmployeeApp, {
      path: path,
      url: url,
      userType: userType,
      tenants: tenants
    });
  }
};
const componentsToRegister = {
  EngagementModule,
  EngagementCard,
  EngagementDocSelectULB: SelectULB,
  EngagementULBDropdown: ULBDropdown,
  EnagementDocName: DocumentName,
  EngagementDocCategory: SelectCategory,
  EngagementDocDescription: SelectULB$1,
  EngagementDocUploadDocument,
  NotificationsAndWhatsNew,
  EventsListOnGround,
  EventDetails: EventDetails$1,
  EventForm,
  MessageForm,
  DocumentList,
  SelectEventGeolocation: SelectGeolocation,
  SelectToDate,
  SurveyList,
  FillSurvey,
  CitizenSurveyForm,
  ShowSurvey,
  SurveyResults
};
const initEngagementComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};

export { initEngagementComponents };
//# sourceMappingURL=index.modern.js.map
