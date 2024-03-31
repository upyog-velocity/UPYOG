import React, { useRef, forwardRef, useEffect, useState, useMemo, Fragment as Fragment$1, useCallback, useReducer } from 'react';
import { withRouter, useHistory, Link, useLocation, Route, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createStaticRanges, DateRangePicker } from 'react-date-range';
import { Loader as Loader$1 } from '@googlemaps/js-api-loader';
import { useTable, useGlobalFilter, useSortBy, usePagination, useRowSelect } from 'react-table';
import { useForm, Controller, FormProvider } from 'react-hook-form';

const ActionBar = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: `action-bar-wrap ${props.className}`,
    style: props.style
  }, props.children);
};

const ActionLinks = props => /*#__PURE__*/React.createElement("span", {
  className: "action-link"
}, props.children);

const AppContainer = props => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "app-container",
    style: props.style
  }, props.children));
};

const ApplyFilterBar = props => {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: props.submit ? "submit" : "button",
    style: {
      ...props.style
    },
    className: "button-clear",
    onClick: props.onClear
  }, /*#__PURE__*/React.createElement("header", null, props.labelLink)), /*#__PURE__*/React.createElement("button", {
    className: "submit-bar",
    type: props.submit ? "submit" : "button",
    style: {
      ...props.style
    },
    onClick: props.onSubmit
  }, /*#__PURE__*/React.createElement("header", null, props.buttonLink)));
};

const ArrowLeft = ({
  className
}) => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "black",
  className: className,
  width: "19px"
}, /*#__PURE__*/React.createElement("path", {
  d: "M24 0v24H0V0h24z",
  fill: "none",
  opacity: ".87"
}), /*#__PURE__*/React.createElement("path", {
  d: "M14 7l-5 5 5 5V7z"
}));
const ArrowLeftWhite = ({
  className
}) => /*#__PURE__*/React.createElement("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  className: className,
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z",
  fill: "white"
}));
const PrivacyMaskIcon = ({
  className,
  style: _style = {}
}) =>
/*#__PURE__*/
React.createElement("svg", {
  width: "22",
  height: "15",
  viewBox: "0 0 22 15",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  className: className,
  style: _style
}, /*#__PURE__*/React.createElement("path", {
  d: "M11 0C6 0 1.73 3.11 0 7.5C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 7.5C20.27 3.11 16 0 11 0ZM11 12.5C8.24 12.5 6 10.26 6 7.5C6 4.74 8.24 2.5 11 2.5C13.76 2.5 16 4.74 16 7.5C16 10.26 13.76 12.5 11 12.5ZM11 4.5C9.34 4.5 8 5.84 8 7.5C8 9.16 9.34 10.5 11 10.5C12.66 10.5 14 9.16 14 7.5C14 5.84 12.66 4.5 11 4.5Z",
  fill: "#B1B4B6"
}));
const ArrowDown = ({
  className,
  onClick,
  styles,
  disable
}) => /*#__PURE__*/React.createElement("svg", {
  style: {
    ...styles
  },
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: disable ? "#9E9E9E" : "black",
  className: className,
  onClick: onClick,
  width: "18px",
  height: "18px"
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0V0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M7 10l5 5 5-5H7z"
}));
const ArrowBack = ({
  className,
  onClick
}) => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "black",
  className: className,
  onClick: onClick,
  width: "18px",
  height: "18px"
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"
}));
const ArrowForward = ({
  className,
  onClick
}) => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "black",
  className: className,
  onClick: onClick,
  width: "18px",
  height: "18px"
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"
}));
const ArrowToFirst = ({
  className,
  onClick
}) => /*#__PURE__*/React.createElement("svg", {
  width: "18px",
  height: "18px",
  viewBox: "0 0 13 12",
  fill: "black",
  xmlns: "http://www.w3.org/2000/svg",
  className: className,
  onClick: onClick
}, /*#__PURE__*/React.createElement("path", {
  d: "M12.41 10.59L7.82 6L12.41 1.41L11 0L5 6L11 12L12.41 10.59ZM0 0H2V12H0V0Z",
  fill: "#505a5f"
}));
const ArrowToLast = ({
  className,
  onClick
}) => /*#__PURE__*/React.createElement("svg", {
  width: "18px",
  height: "18px",
  viewBox: "0 0 13 12",
  fill: "black",
  xmlns: "http://www.w3.org/2000/svg",
  className: className,
  onClick: onClick
}, /*#__PURE__*/React.createElement("path", {
  d: "M0.589844 1.41L5.17984 6L0.589844 10.59L1.99984 12L7.99984 6L1.99984 0L0.589844 1.41ZM10.9998 0H12.9998V12H10.9998V0Z",
  fill: "#505a5f"
}));
const DownloadPrefixIcon = ({
  className,
  onClick
}) => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  height: "24",
  viewBox: "0 0 24 24",
  width: "24"
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"
}));
const CameraSvg = ({
  className
}) => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  enableBackground: "new 0 0 24 24",
  className: className,
  viewBox: "0 0 24 24",
  fill: "black",
  width: "46px",
  height: "42px"
}, /*#__PURE__*/React.createElement("rect", {
  fill: "none",
  height: "24",
  width: "24"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3,4V1h2v3h3v2H5v3H3V6H0V4H3z M6,10V7h3V4h7l1.83,2H21c1.1,0,2,0.9,2,2v12c0,1.1-0.9,2-2,2H5c-1.1,0-2-0.9-2-2V10H6z M13,19c2.76,0,5-2.24,5-5s-2.24-5-5-5s-5,2.24-5,5S10.24,19,13,19z M9.8,14c0,1.77,1.43,3.2,3.2,3.2s3.2-1.43,3.2-3.2 s-1.43-3.2-3.2-3.2S9.8,12.23,9.8,14z"
}));
const DeleteBtn = ({
  className,
  onClick,
  fill
}) => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "white",
  className: className,
  onClick: onClick,
  width: "18px",
  height: "18px"
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0V0z",
  fill: fill
}), /*#__PURE__*/React.createElement("path", {
  d: "M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
}));
const SuccessSvg = ({
  className
}) => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "#00703C",
  className: className
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0V0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"
}));
const ErrorSvg = ({
  className
}) => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "#d4351c",
  className: className
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0V0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "19",
  r: "2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M10 3h4v12h-4z"
}));
const StarFilled = ({
  className,
  id,
  onClick,
  styles,
  percentage: _percentage = 100
}) => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  enableBackground: "new 0 0 24 24",
  className: className,
  style: styles,
  onClick: onClick,
  viewBox: "0 0 24 24",
  fill: "#a82227",
  width: "48px",
  height: "48px"
}, /*#__PURE__*/React.createElement("linearGradient", {
  id: id,
  x1: "0",
  x2: "1",
  y1: "0",
  y2: "0"
}, /*#__PURE__*/React.createElement("stop", {
  offset: "0%",
  stopColor: "#a82227",
  stopOpacity: 1
}), /*#__PURE__*/React.createElement("stop", {
  offset: `${_percentage}%`,
  stopColor: "#a82227",
  stopOpacity: 1
}), /*#__PURE__*/React.createElement("stop", {
  offset: `${_percentage}%`,
  stopColor: "white",
  stopOpacity: 0
})), /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
  d: "M0,0h24v24H0V0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M0,0h24v24H0V0z",
  fill: "none"
})), /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
  d: "M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z",
  fill: `url(#${id})`,
  stroke: "#a82227",
  strokeWidth: 1
})));
const StarEmpty = ({
  className,
  onClick,
  styles
}) => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "#a82227",
  className: className,
  style: styles,
  width: "48px",
  height: "48px",
  onClick: onClick
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0V0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z",
  strokeWidth: 1
}));
const DownloadImgIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "14",
  height: "17",
  viewBox: "0 0 14 17",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M14 6H10V0H4V6H0L7 13L14 6ZM0 15V17H14V15H0Z",
  fill: "#a82227"
}));
const PrevIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "8",
  height: "12",
  viewBox: "0 0 8 12",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M1.99997 0L0.589966 1.41L5.16997 6L0.589966 10.59L1.99997 12L7.99997 6L1.99997 0Z",
  fill: "#0B0C0C"
}));
const ViewsIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "22",
  height: "16",
  viewBox: "0 0 22 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M11 0.5C6 0.5 1.73 3.61 0 8C1.73 12.39 6 15.5 11 15.5C16 15.5 20.27 12.39 22 8C20.27 3.61 16 0.5 11 0.5ZM11 13C8.24 13 6 10.76 6 8C6 5.24 8.24 3 11 3C13.76 3 16 5.24 16 8C16 10.76 13.76 13 11 13ZM11 5C9.34 5 8 6.34 8 8C8 9.66 9.34 11 11 11C12.66 11 14 9.66 14 8C14 6.34 12.66 5 11 5Z",
  fill: "#a82227"
}));
const DocumentIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "100",
  height: "100",
  viewBox: "0 0 18 18",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM11 14H4V12H11V14ZM14 10H4V8H14V10ZM14 6H4V4H14V6Z",
  fill: "#a82227"
}));
const DocumentIconSolid = ({
  styles,
  className
}) => /*#__PURE__*/React.createElement("svg", {
  style: {
    ...styles
  },
  className: className,
  xmlns: "http://www.w3.org/2000/svg",
  height: "24px",
  viewBox: "0 0 24 24",
  width: "24px",
  fill: "#FFFFFF"
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0V0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"
}));
const SurveyIconSolid = () => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  height: "24px",
  viewBox: "0 0 24 24",
  width: "24px",
  fill: "#FFFFFF"
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0V0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M11 7h6v2h-6zm0 4h6v2h-6zm0 4h6v2h-6zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7zM20.1 3H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9zM19 19H5V5h14v14z"
}));
const PMBIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "32",
  height: "16",
  viewBox: "0 0 32 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M16 9C18.1733 9 20.0933 9.52 21.6533 10.2C23.0933 10.84 24 12.28 24 13.84V16H8V13.8533C8 12.28 8.90667 10.84 10.3467 10.2133C11.9067 9.52 13.8267 9 16 9ZM5.33333 9.33333C6.8 9.33333 8 8.13333 8 6.66667C8 5.2 6.8 4 5.33333 4C3.86667 4 2.66667 5.2 2.66667 6.66667C2.66667 8.13333 3.86667 9.33333 5.33333 9.33333ZM6.84 10.8C6.34667 10.72 5.85333 10.6667 5.33333 10.6667C4.01333 10.6667 2.76 10.9467 1.62667 11.44C0.64 11.8667 0 12.8267 0 13.9067V16H6V13.8533C6 12.7467 6.30667 11.7067 6.84 10.8ZM26.6667 9.33333C28.1333 9.33333 29.3333 8.13333 29.3333 6.66667C29.3333 5.2 28.1333 4 26.6667 4C25.2 4 24 5.2 24 6.66667C24 8.13333 25.2 9.33333 26.6667 9.33333ZM32 13.9067C32 12.8267 31.36 11.8667 30.3733 11.44C29.24 10.9467 27.9867 10.6667 26.6667 10.6667C26.1467 10.6667 25.6533 10.72 25.16 10.8C25.6933 11.7067 26 12.7467 26 13.8533V16H32V13.9067ZM16 0C18.2133 0 20 1.78667 20 4C20 6.21333 18.2133 8 16 8C13.7867 8 12 6.21333 12 4C12 1.78667 13.7867 0 16 0Z",
  fill: "#a82227"
}));
const PMBIconSolid = () => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  enableBackground: "new 0 0 24 24",
  height: "24px",
  viewBox: "0 0 24 24",
  width: "24px",
  fill: "#FFFFFF"
}, /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
  fill: "none",
  height: "24",
  width: "24"
})), /*#__PURE__*/React.createElement("path", {
  d: "M18,11c0,0.67,0,1.33,0,2c1.2,0,2.76,0,4,0c0-0.67,0-1.33,0-2C20.76,11,19.2,11,18,11z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M16,17.61c0.96,0.71,2.21,1.65,3.2,2.39c0.4-0.53,0.8-1.07,1.2-1.6c-0.99-0.74-2.24-1.68-3.2-2.4 C16.8,16.54,16.4,17.08,16,17.61z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M20.4,5.6C20,5.07,19.6,4.53,19.2,4c-0.99,0.74-2.24,1.68-3.2,2.4c0.4,0.53,0.8,1.07,1.2,1.6 C18.16,7.28,19.41,6.35,20.4,5.6z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M4,9c-1.1,0-2,0.9-2,2v2c0,1.1,0.9,2,2,2h1v4h2v-4h1l5,3V6L8,9H4z M9.03,10.71L11,9.53v4.94l-1.97-1.18L8.55,13H8H4v-2h4 h0.55L9.03,10.71z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M15.5,12c0-1.33-0.58-2.53-1.5-3.35v6.69C14.92,14.53,15.5,13.33,15.5,12z"
}));
const EventsIconSolid = () => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  height: "24px",
  viewBox: "0 0 24 24",
  width: "24px",
  fill: "#FFFFFF"
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0V0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zm0-12H5V5h14v2zm-2 5h-5v5h5v-5z"
}));
const DustbinIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "14",
  height: "18",
  viewBox: "0 0 14 18",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM3 6H11V16H3V6ZM10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5Z",
  fill: "#a82227"
}));
const ImageIcon = () => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  height: "24px",
  viewBox: "0 0 24 24",
  width: "24px",
  fill: "#000000"
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0V0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"
}));
const DocumentSVG = () => /*#__PURE__*/React.createElement("svg", {
  width: "80",
  height: "80",
  viewBox: "0 0 80 80",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M46.6667 6.6665H20C16.3334 6.6665 13.3667 9.6665 13.3667 13.3332L13.3334 66.6665C13.3334 70.3332 16.3 73.3332 19.9667 73.3332H60C63.6667 73.3332 66.6667 70.3332 66.6667 66.6665V26.6665L46.6667 6.6665ZM53.3334 59.9998H26.6667V53.3332H53.3334V59.9998ZM53.3334 46.6665H26.6667V39.9998H53.3334V46.6665ZM43.3334 29.9998V11.6665L61.6667 29.9998H43.3334Z",
  fill: "#505A5F"
}));
const PDFSvg = ({
  className,
  width: _width = 80,
  height: _height = 80,
  style: _style2 = {
    background: "#f6f6f6",
    padding: "8px",
    boxShadow: "0px 2px 0px #d6d5d3",
    borderRadius: "2px"
  },
  viewBox: _viewBox = "0 0 80 80"
}) => /*#__PURE__*/React.createElement("svg", Object.assign({}, {
  className,
  width: _width,
  height: _height,
  style: _style2,
  viewBox: _viewBox
}, {
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}), /*#__PURE__*/React.createElement("path", {
  d: "M46.6667 6.6665H20C16.3334 6.6665 13.3667 9.6665 13.3667 13.3332L13.3334 66.6665C13.3334 70.3332 16.3 73.3332 19.9667 73.3332H60C63.6667 73.3332 66.6667 70.3332 66.6667 66.6665V26.6665L46.6667 6.6665ZM53.3334 59.9998H26.6667V53.3332H53.3334V59.9998ZM53.3334 46.6665H26.6667V39.9998H53.3334V46.6665ZM43.3334 29.9998V11.6665L61.6667 29.9998H43.3334Z",
  fill: "#505A5F"
}));
const SearchIconSvg = ({
  className,
  onClick
}) => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "#a82227",
  className: className,
  width: "24px",
  height: "24px",
  onClick: onClick
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
}));
const CheckSvg = ({
  className,
  style: _style3 = {}
}) => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "#a82227",
  className: className,
  style: _style3
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
}));
const RoundedCheck = ({
  className
}) => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "#FFFFFF",
  className: className
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0V0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29L5.7 12.7c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.59 7.59c-.38.39-1.02.39-1.41 0z"
}));
const Calender = ({
  className,
  onClick
}) => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "black",
  className: className,
  onClick: onClick
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"
}));
const Phone = ({
  className,
  fillcolor,
  style
}) => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: fillcolor ? fillcolor : "#a82227",
  viewBox: "0 0 24 24",
  style: style ? style : {},
  className: className
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
}));
const FilterSvg = ({
  className
}) => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "#a82227",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  className: className
}, /*#__PURE__*/React.createElement("path", {
  d: "M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"
}));
const SortSvg = ({
  className
}) => /*#__PURE__*/React.createElement("svg", {
  width: "24",
  height: "16",
  viewBox: "0 0 24 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  className: className
}, /*#__PURE__*/React.createElement("path", {
  d: "M8 16H24V13.3333H8V16ZM0 0V2.66667H24V0H0ZM8 9.33333H24V6.66667H8V9.33333Z",
  fill: "#505A5F"
}));
const Close = ({
  className,
  style
}) => /*#__PURE__*/React.createElement("svg", {
  style: {
    ...style
  },
  focusable: "false",
  viewBox: "0 0 24 24",
  "aria-hidden": "true",
  width: "24",
  height: "24",
  fill: "#9E9E9E",
  className: className
}, /*#__PURE__*/React.createElement("path", {
  d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
}));
const GetApp = ({
  className
}) => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "#a82227",
  className: className
}, /*#__PURE__*/React.createElement("path", {
  d: "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"
}));
const HamburgerIcon = ({
  className,
  styles,
  color: _color = "#fdfdfd"
}) => /*#__PURE__*/React.createElement("svg", {
  style: {
    ...styles
  },
  width: "24",
  height: "24",
  focusable: "false",
  viewBox: "0 0 24 24",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z",
  fill: _color
}));
const HomeIcon = ({
  className,
  styles
}) => /*#__PURE__*/React.createElement("svg", {
  className: className,
  viewBox: "0 0 24 24",
  style: {
    ...styles
  }
}, /*#__PURE__*/React.createElement("path", {
  d: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
}));
const LanguageIcon = ({
  className,
  styles
}) => /*#__PURE__*/React.createElement("svg", {
  className: className,
  viewBox: "0 0 24 24",
  style: {
    ...styles
  }
}, /*#__PURE__*/React.createElement("path", {
  d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"
}));
const LogoutIcon = ({
  className,
  styles
}) => /*#__PURE__*/React.createElement("svg", {
  className: className,
  viewBox: "0 0 20 18",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  style: {
    ...styles
  }
}, /*#__PURE__*/React.createElement("path", {
  d: "M15 4L13.59 5.41L16.17 8H6V10H16.17L13.59 12.58L15 14L20 9L15 4ZM2 2H10V0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H10V16H2V2Z",
  fill: "#505A5F"
}));
const LoginIcon = ({
  className,
  styles
}) => /*#__PURE__*/React.createElement("svg", {
  className: className,
  viewBox: "0 0 24 24",
  style: {
    ...styles
  }
}, /*#__PURE__*/React.createElement("path", {
  d: "M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"
}));
const SortDown = style => /*#__PURE__*/React.createElement("svg", {
  style: {
    display: "inline-block",
    height: "16px",
    ...style
  },
  xmlns: "http://www.w3.org/2000/svg",
  enableBackground: "new 0 0 24 24",
  height: "24",
  viewBox: "0 0 24 24",
  width: "24"
}, /*#__PURE__*/React.createElement("rect", {
  fill: "none",
  height: "24",
  width: "24"
}), /*#__PURE__*/React.createElement("path", {
  d: "M19,15l-1.41-1.41L13,18.17V2H11v16.17l-4.59-4.59L5,15l7,7L19,15z"
}));
const SortUp = style => /*#__PURE__*/React.createElement("svg", {
  style: {
    display: "inline-block",
    height: "16px",
    ...style
  },
  xmlns: "http://www.w3.org/2000/svg",
  enableBackground: "new 0 0 24 24",
  height: "24",
  viewBox: "0 0 24 24",
  width: "24"
}, /*#__PURE__*/React.createElement("rect", {
  fill: "none",
  height: "24",
  width: "24"
}), /*#__PURE__*/React.createElement("path", {
  d: "M5,9l1.41,1.41L11,5.83V22H13V5.83l4.59,4.59L19,9l-7-7L5,9z"
}));
const ArrowRightInbox = ({
  style
}) => /*#__PURE__*/React.createElement("svg", {
  width: "20",
  height: "14",
  viewBox: "0 0 20 14",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  style: style
}, /*#__PURE__*/React.createElement("path", {
  d: "M13 0L11.59 1.41L16.17 6H0V8H16.17L11.58 12.59L13 14L20 7L13 0Z",
  fill: "#a82227"
}));
const ShippingTruck = ({
  className,
  styles
}) => /*#__PURE__*/React.createElement("svg", {
  style: {
    ...styles
  },
  className: className,
  xmlns: "http://www.w3.org/2000/svg",
  height: "24",
  viewBox: "0 0 24 24",
  width: "24"
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  fill: "white",
  d: "M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
}));
function CloseSvg({
  onClick
}) {
  return /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    height: "24",
    viewBox: "0 0 24 24",
    width: "24",
    onClick: onClick
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
  }));
}
const UpwardArrow = ({
  color: _color2 = "#00703C",
  rotate: _rotate = 0,
  marginRight: _marginRight = 0
}) => /*#__PURE__*/React.createElement("svg", {
  style: {
    display: "inline-block",
    verticalAlign: "baseline",
    transform: `rotate(${_rotate}deg)`,
    marginRight: `${_marginRight}px`
  },
  width: "11",
  height: "16",
  viewBox: "0 0 11 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 5.6L1.10786 6.728L4.71429 3.064V16H6.28571V3.064L9.89214 6.736L11 5.6L5.5 0L0 5.6Z",
  fill: _color2
}));
const DownwardArrow = props => /*#__PURE__*/React.createElement(UpwardArrow, Object.assign({}, props, {
  color: "#e54d42",
  rotate: 180
}));
const DownloadIcon = ({
  styles,
  className,
  onClick
}) => /*#__PURE__*/React.createElement("svg", {
  style: {
    ...styles
  },
  width: "19",
  height: "24",
  viewBox: "0 0 19 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  className: className,
  onClick: onClick
}, /*#__PURE__*/React.createElement("path", {
  d: "M18.8337 8.5H13.5003V0.5H5.50033V8.5H0.166992L9.50033 17.8333L18.8337 8.5ZM0.166992 20.5V23.1667H18.8337V20.5H0.166992Z",
  fill: "#505A5F"
}));
const GenericFileIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "80",
  height: "100",
  viewBox: "0 0 80 100",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M50 0H10C4.5 0 0.0500011 4.5 0.0500011 10L0 90C0 95.5 4.45 100 9.95 100H70C75.5 100 80 95.5 80 90V30L50 0ZM60 80H20V70H60V80ZM60 60H20V50H60V60ZM45 35V7.5L72.5 35H45Z",
  fill: "#505A5F"
}));
const ExternalLinkIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "18",
  height: "18",
  viewBox: "0 0 18 18",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M16 16H2V2H9V0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.1 18 18 17.1 18 16V9H16V16ZM11 0V2H14.59L4.76 11.83L6.17 13.24L16 3.41V7H18V0H11Z",
  fill: "#a82227"
}));
const PrimaryDownlaodIcon = () => /*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "#a82227"
}, /*#__PURE__*/React.createElement("path", {
  d: "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"
}));
const Ellipsis = ({
  className,
  onClick
}) => /*#__PURE__*/React.createElement("svg", {
  width: "4",
  height: "16",
  viewBox: "0 0 4 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  className: className,
  onClick: onClick
}, /*#__PURE__*/React.createElement("path", {
  d: "M2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4ZM2 6C0.9 6 0 6.9 0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6ZM2 12C0.9 12 0 12.9 0 14C0 15.1 0.9 16 2 16C3.1 16 4 15.1 4 14C4 12.9 3.1 12 2 12Z",
  fill: "#B1B4B6"
}));
const Poll = () => /*#__PURE__*/React.createElement("svg", {
  width: "40",
  height: "40",
  viewBox: "0 0 40 40",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 6C0 2.68629 2.68629 0 6 0H34C37.3137 0 40 2.68629 40 6V34C40 37.3137 37.3137 40 34 40H6C2.68629 40 0 37.3137 0 34V6Z",
  fill: "white"
}), /*#__PURE__*/React.createElement("path", {
  d: "M31.6667 5H8.33333C6.5 5 5 6.5 5 8.33333V31.6667C5 33.5 6.5 35 8.33333 35H31.6667C33.5 35 35 33.5 35 31.6667V8.33333C35 6.5 33.5 5 31.6667 5ZM15 28.3333H11.6667V16.6667H15V28.3333ZM21.6667 28.3333H18.3333V11.6667H21.6667V28.3333ZM28.3333 28.3333H25V21.6667H28.3333V28.3333Z",
  fill: "#a82227"
}));
const Details = () => /*#__PURE__*/React.createElement("svg", {
  width: "22",
  height: "16",
  viewBox: "0 0 22 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M11 0.5C6 0.5 1.73 3.61 0 8C1.73 12.39 6 15.5 11 15.5C16 15.5 20.27 12.39 22 8C20.27 3.61 16 0.5 11 0.5ZM11 13C8.24 13 6 10.76 6 8C6 5.24 8.24 3 11 3C13.76 3 16 5.24 16 8C16 10.76 13.76 13 11 13ZM11 5C9.34 5 8 6.34 8 8C8 9.66 9.34 11 11 11C12.66 11 14 9.66 14 8C14 6.34 12.66 5 11 5Z",
  fill: "#505A5F"
}));
const FilterIcon = ({
  onClick
}) => /*#__PURE__*/React.createElement("svg", {
  width: "22",
  height: "22",
  viewBox: "0 0 22 22",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  onClick: onClick
}, /*#__PURE__*/React.createElement("path", {
  d: "M0.666904 2.48016C3.36024 5.9335 8.33357 12.3335 8.33357 12.3335V20.3335C8.33357 21.0668 8.93357 21.6668 9.6669 21.6668H12.3336C13.0669 21.6668 13.6669 21.0668 13.6669 20.3335V12.3335C13.6669 12.3335 18.6269 5.9335 21.3202 2.48016C22.0002 1.60016 21.3736 0.333496 20.2669 0.333496H1.72024C0.613571 0.333496 -0.0130959 1.60016 0.666904 2.48016Z",
  fill: "#505A5F"
}));
const RefreshIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "16",
  height: "22",
  viewBox: "0 0 16 22",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M8 5V8L12 4L8 0V3C3.58 3 0 6.58 0 11C0 12.57 0.46 14.03 1.24 15.26L2.7 13.8C2.25 12.97 2 12.01 2 11C2 7.69 4.69 5 8 5ZM14.76 6.74L13.3 8.2C13.74 9.04 14 9.99 14 11C14 14.31 11.31 17 8 17V14L4 18L8 22V19C12.42 19 16 15.42 16 11C16 9.43 15.54 7.97 14.76 6.74Z",
  fill: "#0B0C0C"
}));
const RefreshSVG = () => /*#__PURE__*/React.createElement("svg", {
  width: "17",
  height: "17",
  viewBox: "0 0 16 22",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M8 5V8L12 4L8 0V3C3.58 3 0 6.58 0 11C0 12.57 0.46 14.03 1.24 15.26L2.7 13.8C2.25 12.97 2 12.01 2 11C2 7.69 4.69 5 8 5ZM14.76 6.74L13.3 8.2C13.74 9.04 14 9.99 14 11C14 14.31 11.31 17 8 17V14L4 18L8 22V19C12.42 19 16 15.42 16 11C16 9.43 15.54 7.97 14.76 6.74Z",
  fill: "#505A5F"
}));
const PrintIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "20",
  height: "18",
  viewBox: "0 0 20 18",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M17 5H3C1.34 5 0 6.34 0 8V14H4V18H16V14H20V8C20 6.34 18.66 5 17 5ZM14 16H6V11H14V16ZM17 9C16.45 9 16 8.55 16 8C16 7.45 16.45 7 17 7C17.55 7 18 7.45 18 8C18 8.55 17.55 9 17 9ZM16 0H4V4H16V0Z",
  fill: "#505A5F"
}));
function PropertyHouse({
  className,
  styles
}) {
  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    fill: "#FFFFFF",
    style: {
      ...styles
    },
    width: "24",
    height: "24",
    viewBox: "0 0 40 40",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M13.6167 9.5L1.66667 17.4667V35H10V21.6667H16.6667V35H25V17.0833L13.6167 9.5Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16.6667 5V7.51667L20 9.73333L22.8833 11.6667H25V13.0833L28.3333 15.3167V18.3333H31.6667V21.6667H28.3333V25H31.6667V28.3333H28.3333V35H38.3333V5H16.6667ZM31.6667 15H28.3333V11.6667H31.6667V15Z"
  }));
}
const InfoBannerIcon = ({
  fill: _fill = "#3498DB"
}) => {
  return /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V9H11V15ZM11 7H9V5H11V7Z",
    fill: _fill
  }));
};
const InfoIcon = () => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 5H11V7H9V5ZM9 9H11V15H9V9ZM10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z",
    fill: "#505A5F"
  }));
};
const ShareIcon = ({
  styles,
  className
}) => /*#__PURE__*/React.createElement("svg", {
  style: {
    ...styles
  },
  className: className,
  width: "18",
  height: "20",
  viewBox: "0 0 18 20",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M15 14.08C14.24 14.08 13.56 14.38 13.04 14.85L5.91 10.7C5.96 10.47 6 10.24 6 10C6 9.76 5.96 9.53 5.91 9.3L12.96 5.19C13.5 5.69 14.21 6 15 6C16.66 6 18 4.66 18 3C18 1.34 16.66 0 15 0C13.34 0 12 1.34 12 3C12 3.24 12.04 3.47 12.09 3.7L5.04 7.81C4.5 7.31 3.79 7 3 7C1.34 7 0 8.34 0 10C0 11.66 1.34 13 3 13C3.79 13 4.5 12.69 5.04 12.19L12.16 16.35C12.11 16.56 12.08 16.78 12.08 17C12.08 18.61 13.39 19.92 15 19.92C16.61 19.92 17.92 18.61 17.92 17C17.92 15.39 16.61 14.08 15 14.08Z",
  fill: "#505A5F"
}));
const RupeeIcon = ({
  className
}) => /*#__PURE__*/React.createElement("svg", {
  width: "48",
  className: className,
  height: "48",
  viewBox: "0 0 48 48",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("rect", {
  width: "48",
  height: "48",
  rx: "6",
  fill: "#a82227"
}));
const ComplaintIcon = ({
  className,
  styles
}) => /*#__PURE__*/React.createElement("svg", {
  style: {
    ...styles
  },
  className: className,
  viewBox: "0 0 48 48",
  fill: "#a82227",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M42.6667 0.666748H5.33335C2.76669 0.666748 0.69002 2.76675 0.69002 5.33342L0.666687 47.3334L10 38.0001H42.6667C45.2334 38.0001 47.3334 35.9001 47.3334 33.3334V5.33342C47.3334 2.76675 45.2334 0.666748 42.6667 0.666748ZM26.3334 21.6667H21.6667V7.66675H26.3334V21.6667ZM26.3334 31.0001H21.6667V26.3334H26.3334V31.0001Z"
}));
const DropIcon = ({
  className,
  styles
}) => /*#__PURE__*/React.createElement("svg", {
  width: "28",
  height: "34",
  style: {
    ...styles
  },
  viewBox: "0 0 28 34",
  className: className,
  fill: "#ffffff",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M23.4333 10.3332L14 0.916504L4.56663 10.3332C1.96663 12.9332 0.666626 16.3998 0.666626 19.7332C0.666626 23.0665 1.96663 26.5832 4.56663 29.1832C7.16663 31.7832 10.5833 33.0998 14 33.0998C17.4166 33.0998 20.8333 31.7832 23.4333 29.1832C26.0333 26.5832 27.3333 23.0665 27.3333 19.7332C27.3333 16.3998 26.0333 12.9332 23.4333 10.3332ZM3.99996 20.3332C4.01663 16.9998 5.03329 14.8832 6.93329 12.9998L14 5.78317L21.0666 13.0832C22.9666 14.9498 23.9833 16.9998 24 20.3332H3.99996Z"
}));
const Person = style => /*#__PURE__*/React.createElement("svg", {
  style: {
    display: "inline-block",
    fontSize: "16px",
    ...style
  },
  width: "24",
  height: "24",
  viewBox: "0 0 40 40",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M13.6167 9.5L1.66667 17.4667V35H10V21.6667H16.6667V35H25V17.0833L13.6167 9.5Z",
  fill: "white"
}), /*#__PURE__*/React.createElement("path", {
  d: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
  fill: "white"
}));
const WhatsappIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M0.0566406 24L1.74364 17.837C0.702641 16.033 0.155641 13.988 0.156641 11.891C0.159641 5.335 5.49464 0 12.0496 0C15.2306 0.001 18.2166 1.24 20.4626 3.488C22.7076 5.736 23.9436 8.724 23.9426 11.902C23.9396 18.459 18.6046 23.794 12.0496 23.794C10.0596 23.793 8.09864 23.294 6.36164 22.346L0.0566406 24ZM6.65364 20.193C8.32964 21.188 9.92964 21.784 12.0456 21.785C17.4936 21.785 21.9316 17.351 21.9346 11.9C21.9366 6.438 17.5196 2.01 12.0536 2.008C6.60164 2.008 2.16664 6.442 2.16464 11.892C2.16364 14.117 2.81564 15.783 3.91064 17.526L2.91164 21.174L6.65364 20.193ZM18.0406 14.729C17.9666 14.605 17.7686 14.531 17.4706 14.382C17.1736 14.233 15.7126 13.514 15.4396 13.415C15.1676 13.316 14.9696 13.266 14.7706 13.564C14.5726 13.861 14.0026 14.531 13.8296 14.729C13.6566 14.927 13.4826 14.952 13.1856 14.803C12.8886 14.654 11.9306 14.341 10.7956 13.328C9.91264 12.54 9.31564 11.567 9.14264 11.269C8.96964 10.972 9.12464 10.811 9.27264 10.663C9.40664 10.53 9.56964 10.316 9.71864 10.142C9.86964 9.97 9.91864 9.846 10.0186 9.647C10.1176 9.449 10.0686 9.275 9.99364 9.126C9.91864 8.978 9.32464 7.515 9.07764 6.92C8.83564 6.341 8.59064 6.419 8.40864 6.41L7.83864 6.4C7.64064 6.4 7.31864 6.474 7.04664 6.772C6.77464 7.07 6.00664 7.788 6.00664 9.251C6.00664 10.714 7.07164 12.127 7.21964 12.325C7.36864 12.523 9.31464 15.525 12.2956 16.812C13.0046 17.118 13.5586 17.301 13.9896 17.438C14.7016 17.664 15.3496 17.632 15.8616 17.556C16.4326 17.471 17.6196 16.837 17.8676 16.143C18.1156 15.448 18.1156 14.853 18.0406 14.729Z",
  fill: "#a82227"
}));
const EmailIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "20",
  height: "16",
  viewBox: "0 0 20 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 4L10 9L2 4V2L10 7L18 2V4Z",
  fill: "#a82227"
}));
const CaseIcon = ({
  className,
  styles
}) => /*#__PURE__*/React.createElement("svg", {
  className: className,
  style: {
    ...styles
  },
  fill: "#ffffff",
  width: "24",
  height: "24",
  viewBox: "0 0 34 32",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M30.3333 6.99967H23.6667V3.66634C23.6667 1.81634 22.1833 0.333008 20.3333 0.333008H13.6667C11.8167 0.333008 10.3333 1.81634 10.3333 3.66634V6.99967H3.66667C1.81667 6.99967 0.350001 8.48301 0.350001 10.333L0.333334 28.6663C0.333334 30.5163 1.81667 31.9997 3.66667 31.9997H30.3333C32.1833 31.9997 33.6667 30.5163 33.6667 28.6663V10.333C33.6667 8.48301 32.1833 6.99967 30.3333 6.99967ZM20.3333 6.99967H13.6667V3.66634H20.3333V6.99967Z"
}));
const TLIcon = ({
  className,
  styles
}) => /*#__PURE__*/React.createElement("svg", {
  className: className,
  style: {
    ...styles
  },
  fill: "#ffffff",
  width: "24",
  height: "24",
  viewBox: "0 0 34 32",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M30.3333 6.99967H23.6667V3.66634C23.6667 1.81634 22.1833 0.333008 20.3333 0.333008H13.6667C11.8167 0.333008 10.3333 1.81634 10.3333 3.66634V6.99967H3.66667C1.81667 6.99967 0.350001 8.48301 0.350001 10.333L0.333334 28.6663C0.333334 30.5163 1.81667 31.9997 3.66667 31.9997H30.3333C32.1833 31.9997 33.6667 30.5163 33.6667 28.6663V10.333C33.6667 8.48301 32.1833 6.99967 30.3333 6.99967ZM20.3333 6.99967H13.6667V3.66634H20.3333V6.99967Z"
}));
const PersonIcon = ({
  className,
  styles
}) => /*#__PURE__*/React.createElement("svg", {
  className: className,
  style: {
    ...styles
  },
  width: "24",
  height: "24",
  viewBox: "0 0 38 24",
  fill: "#ffffff",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M25.6667 10.3333C28.4334 10.3333 30.65 8.1 30.65 5.33333C30.65 2.56666 28.4334 0.333328 25.6667 0.333328C22.9 0.333328 20.6667 2.56666 20.6667 5.33333C20.6667 8.1 22.9 10.3333 25.6667 10.3333ZM12.3334 10.3333C15.1 10.3333 17.3167 8.1 17.3167 5.33333C17.3167 2.56666 15.1 0.333328 12.3334 0.333328C9.56669 0.333328 7.33335 2.56666 7.33335 5.33333C7.33335 8.1 9.56669 10.3333 12.3334 10.3333ZM12.3334 13.6667C8.45002 13.6667 0.666687 15.6167 0.666687 19.5V23.6667H24V19.5C24 15.6167 16.2167 13.6667 12.3334 13.6667ZM25.6667 13.6667C25.1834 13.6667 24.6334 13.7 24.05 13.75C25.9834 15.15 27.3334 17.0333 27.3334 19.5V23.6667H37.3334V19.5C37.3334 15.6167 29.55 13.6667 25.6667 13.6667Z"
}));
const ReceiptIcon = ({
  styles,
  className
}) => /*#__PURE__*/React.createElement("svg", {
  style: {
    ...styles
  },
  className: className,
  xmlns: "http://www.w3.org/2000/svg",
  height: "24",
  viewBox: "0 0 24 24",
  width: "24"
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 0h24v24H0z",
  fill: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z"
}));
const AnnouncementIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "28",
  height: "28",
  viewBox: "0 0 28 28",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M24.6665 0.666016H3.33317C1.8665 0.666016 0.679837 1.86602 0.679837 3.33268L0.666504 27.3327L5.99984 21.9993H24.6665C26.1332 21.9993 27.3332 20.7993 27.3332 19.3327V3.33268C27.3332 1.86602 26.1332 0.666016 24.6665 0.666016ZM15.3332 12.666H12.6665V4.66602H15.3332V12.666ZM15.3332 17.9993H12.6665V15.3327H15.3332V17.9993Z",
  fill: "#a82227"
}));
const PTIcon = ({
  className,
  styles
}) => /*#__PURE__*/React.createElement("svg", {
  width: "34",
  height: "30",
  style: {
    ...styles
  },
  viewBox: "0 0 34 30",
  fill: "#ffffff",
  className: className,
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M16.9999 6.66667V0H0.333252V30H33.6666V6.66667H16.9999ZM6.99992 26.6667H3.66659V23.3333H6.99992V26.6667ZM6.99992 20H3.66659V16.6667H6.99992V20ZM6.99992 13.3333H3.66659V10H6.99992V13.3333ZM6.99992 6.66667H3.66659V3.33333H6.99992V6.66667ZM13.6666 26.6667H10.3333V23.3333H13.6666V26.6667ZM13.6666 20H10.3333V16.6667H13.6666V20ZM13.6666 13.3333H10.3333V10H13.6666V13.3333ZM13.6666 6.66667H10.3333V3.33333H13.6666V6.66667ZM30.3333 26.6667H16.9999V23.3333H20.3333V20H16.9999V16.6667H20.3333V13.3333H16.9999V10H30.3333V26.6667ZM26.9999 13.3333H23.6666V16.6667H26.9999V13.3333ZM26.9999 20H23.6666V23.3333H26.9999V20Z"
}));
const OBPSIcon = ({
  className,
  styles
}) => /*#__PURE__*/React.createElement("svg", {
  className: className,
  style: {
    ...styles
  },
  width: "34",
  height: "30",
  viewBox: "0 0 34 30",
  fill: "#ffffff",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M30.3333 0H3.66659C1.83325 0 0.333252 1.5 0.333252 3.33333V26.6667C0.333252 28.5 1.83325 30 3.66659 30H30.3333C32.1666 30 33.6666 28.5 33.6666 26.6667V3.33333C33.6666 1.5 32.1666 0 30.3333 0ZM13.6666 23.3333H5.33325V20H13.6666V23.3333ZM13.6666 16.6667H5.33325V13.3333H13.6666V16.6667ZM13.6666 10H5.33325V6.66667H13.6666V10ZM21.6999 20L16.9999 15.2667L19.3499 12.9167L21.6999 15.2833L26.9833 10L29.3499 12.3667L21.6999 20Z",
  fill: "#a82227"
}));
const OBPSIconSolidBg = () => /*#__PURE__*/React.createElement("svg", {
  width: "34",
  height: "30",
  viewBox: "0 0 34 30",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M30.333 0H3.66634C1.83301 0 0.333008 1.5 0.333008 3.33333V26.6667C0.333008 28.5 1.83301 30 3.66634 30H30.333C32.1663 30 33.6663 28.5 33.6663 26.6667V3.33333C33.6663 1.5 32.1663 0 30.333 0ZM13.6663 23.3333H5.33301V20H13.6663V23.3333ZM13.6663 16.6667H5.33301V13.3333H13.6663V16.6667ZM13.6663 10H5.33301V6.66667H13.6663V10ZM21.6997 20L16.9997 15.2667L19.3497 12.9167L21.6997 15.2833L26.983 10L29.3497 12.3667L21.6997 20Z",
  fill: "white"
}));
const CitizenTruck = ({
  className
}) => /*#__PURE__*/React.createElement("svg", {
  width: "40",
  height: "40",
  viewBox: "0 0 23 19",
  className: className,
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  fill: "#a82227",
  d: "M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
}));
const FSMIcon = ({
  className,
  styles
}) => /*#__PURE__*/React.createElement("svg", {
  width: "40",
  height: "40",
  viewBox: "0 0 23 19",
  className: className,
  style: {
    ...styles
  },
  fill: "#ffffff",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
}));
const EDCRIcon = ({
  className
}) => /*#__PURE__*/React.createElement("svg", {
  width: "30",
  height: "32",
  viewBox: "0 0 30 32",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M20 15.3333V5.33333L15 0.333334L10 5.33333V8.66667H0V32H30V15.3333H20ZM6.66667 28.6667H3.33333V25.3333H6.66667V28.6667ZM6.66667 22H3.33333V18.6667H6.66667V22ZM6.66667 15.3333H3.33333V12H6.66667V15.3333ZM16.6667 28.6667H13.3333V25.3333H16.6667V28.6667ZM16.6667 22H13.3333V18.6667H16.6667V22ZM16.6667 15.3333H13.3333V12H16.6667V15.3333ZM16.6667 8.66667H13.3333V5.33333H16.6667V8.66667ZM26.6667 28.6667H23.3333V25.3333H26.6667V28.6667ZM26.6667 22H23.3333V18.6667H26.6667V22Z",
  fill: "#a82227"
}));
const BPAIcon = ({
  className
}) => /*#__PURE__*/React.createElement("svg", {
  width: "32",
  height: "32",
  viewBox: "0 0 32 32",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M23.3333 29.0333H3.33333V8.66667H15V5.33334H3.33333C1.5 5.33334 0 6.83334 0 8.66667V28.6667C0 30.5 1.5 32 3.33333 32H23.3333C25.1667 32 26.6667 30.5 26.6667 28.6667V17H23.3333V29.0333Z",
  fill: "#a82227"
}), /*#__PURE__*/React.createElement("path", {
  d: "M26.6667 0.333336H23.3333V5.33334H18.3333C18.35 5.35 18.3333 8.66667 18.3333 8.66667H23.3333V13.65C23.35 13.6667 26.6667 13.65 26.6667 13.65V8.66667H31.6667V5.33334H26.6667V0.333336Z",
  fill: "#a82227"
}), /*#__PURE__*/React.createElement("path", {
  d: "M20 12H6.66666V15.3333H20V12Z",
  fill: "#a82227"
}), /*#__PURE__*/React.createElement("path", {
  d: "M6.66666 17V20.3333H20V17H15H6.66666Z",
  fill: "#a82227"
}), /*#__PURE__*/React.createElement("path", {
  d: "M20 22H6.66666V25.3333H20V22Z",
  fill: "#a82227"
}));
const BPAHomeIcon = ({
  className,
  styles
}) => /*#__PURE__*/React.createElement("svg", {
  width: "34",
  height: "30",
  className: className,
  style: {
    ...styles
  },
  viewBox: "0 0 34 30",
  fill: "#ffffff",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M30.3333 0H3.66659C1.83325 0 0.333252 1.5 0.333252 3.33333V26.6667C0.333252 28.5 1.83325 30 3.66659 30H30.3333C32.1666 30 33.6666 28.5 33.6666 26.6667V3.33333C33.6666 1.5 32.1666 0 30.3333 0ZM13.6666 23.3333H5.33325V20H13.6666V23.3333ZM13.6666 16.6667H5.33325V13.3333H13.6666V16.6667ZM13.6666 10H5.33325V6.66667H13.6666V10ZM21.6999 20L16.9999 15.2667L19.3499 12.9167L21.6999 15.2833L26.9833 10L29.3499 12.3667L21.6999 20Z"
}));
const HelpIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "24",
  height: "18",
  viewBox: "0 0 24 18",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M22 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H22C23.1 18 23.99 17.1 23.99 16L24 2C24 0.9 23.1 0 22 0ZM8 3C9.66 3 11 4.34 11 6C11 7.66 9.66 9 8 9C6.34 9 5 7.66 5 6C5 4.34 6.34 3 8 3ZM14 15H2V14C2 12 6 10.9 8 10.9C10 10.9 14 12 14 14V15ZM17.85 11H19.49L21 13L19.01 14.99C17.7 14.01 16.73 12.61 16.28 11C16.1 10.36 16 9.69 16 9C16 8.31 16.1 7.64 16.28 7C16.73 5.38 17.7 3.99 19.01 3.01L21 5L19.49 7H17.85C17.63 7.63 17.5 8.3 17.5 9C17.5 9.7 17.63 10.37 17.85 11Z",
  fill: "#a82227"
}));
const EventCalendar = () => {
  return /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "27",
    viewBox: "0 0 24 27",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18.6667 15.0002H12V21.6668H18.6667V15.0002ZM17.3333 0.333496V3.00016H6.66667V0.333496H4V3.00016H2.66667C1.18667 3.00016 0.0133333 4.20016 0.0133333 5.66683L0 24.3335C0 25.8002 1.18667 27.0002 2.66667 27.0002H21.3333C22.8 27.0002 24 25.8002 24 24.3335V5.66683C24 4.20016 22.8 3.00016 21.3333 3.00016H20V0.333496H17.3333ZM21.3333 24.3335H2.66667V9.66683H21.3333V24.3335Z",
    fill: "#a82227"
  }));
};
const NotificationBell = () => /*#__PURE__*/React.createElement("svg", {
  width: "16",
  height: "20",
  viewBox: "0 0 16 20",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M8 20C9.1 20 10 19.1 10 18H6C6 19.1 6.89 20 8 20ZM14 14V9C14 5.93 12.36 3.36 9.5 2.68V2C9.5 1.17 8.83 0.5 8 0.5C7.17 0.5 6.5 1.17 6.5 2V2.68C3.63 3.36 2 5.92 2 9V14L0 16V17H16V16L14 14Z",
  fill: "white"
}));
const MapMarker = () => /*#__PURE__*/React.createElement("svg", {
  width: "10",
  height: "14",
  viewBox: "0 0 10 14",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M5 0.333496C2.42 0.333496 0.333328 2.42016 0.333328 5.00016C0.333328 6.16016 0.666661 7.24683 1.27333 8.22683C1.90666 9.2535 2.73999 10.1335 3.37999 11.1602C3.69333 11.6602 3.91999 12.1268 4.15999 12.6668C4.33333 13.0335 4.47333 13.6668 5 13.6668C5.52666 13.6668 5.66666 13.0335 5.83333 12.6668C6.08 12.1268 6.29999 11.6602 6.61333 11.1602C7.25333 10.1402 8.08666 9.26016 8.72 8.22683C9.33333 7.24683 9.66666 6.16016 9.66666 5.00016C9.66666 2.42016 7.58 0.333496 5 0.333496ZM5 6.8335C4.07999 6.8335 3.33333 6.08683 3.33333 5.16683C3.33333 4.24683 4.07999 3.50016 5 3.50016C5.92 3.50016 6.66666 4.24683 6.66666 5.16683C6.66666 6.08683 5.92 6.8335 5 6.8335Z",
  fill: "#505A5F"
}));
const Clock = () => /*#__PURE__*/React.createElement("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M7.992 0C3.576 0 0 3.584 0 8C0 12.416 3.576 16 7.992 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 7.992 0ZM7.99994 14.4C4.46393 14.4 1.59993 11.536 1.59993 7.99999C1.59993 4.46399 4.46393 1.59999 7.99994 1.59999C11.5359 1.59999 14.3999 4.46399 14.3999 7.99999C14.3999 11.536 11.5359 14.4 7.99994 14.4ZM7.20003 4H8.40003V8.2L12 10.336L11.4 11.32L7.20003 8.8V4Z",
  fill: "#505A5F"
}));
const TickMark = ({
  fillColor: _fillColor = "white"
}) => /*#__PURE__*/React.createElement("svg", {
  style: {
    display: "inline-block",
    margin: "auto"
  },
  width: "14",
  height: "11",
  viewBox: "0 0 14 11",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M4.75012 8.1275L1.62262 5L0.557617 6.0575L4.75012 10.25L13.7501 1.25L12.6926 0.192505L4.75012 8.1275Z",
  fill: _fillColor
}));
const EditIcon = ({
  style
}) => /*#__PURE__*/React.createElement("svg", {
  style: style,
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M9.126 5.125L11.063 3.188L14.81 6.935L12.873 8.873L9.126 5.125ZM17.71 2.63L15.37 0.289999C15.1826 0.103748 14.9292 -0.000793457 14.665 -0.000793457C14.4008 -0.000793457 14.1474 0.103748 13.96 0.289999L12.13 2.12L15.88 5.87L17.71 4C17.8844 3.81454 17.9815 3.56956 17.9815 3.315C17.9815 3.06044 17.8844 2.81546 17.71 2.63ZM5.63 8.63L0 14.25V18H3.75L9.38 12.38L12.873 8.873L9.126 5.125L5.63 8.63Z",
  fill: "#a82227"
}));
const SearchIcon = ({
  className
}) => /*#__PURE__*/React.createElement("svg", {
  width: "18",
  height: "18",
  viewBox: "0 0 18 18",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z",
  fill: "#505A5F"
}));
const DeleteIcon = ({
  style,
  fill
}) => /*#__PURE__*/React.createElement("svg", {
  style: style,
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z",
  fill: fill
}));
const WSICon = ({
  className,
  styles
}) => /*#__PURE__*/React.createElement("svg", {
  width: "28",
  height: "34",
  viewBox: "0 0 28 34",
  fill: "#ffffff",
  style: {
    ...styles
  },
  className: className,
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M23.4332 10.3337L13.9998 0.916992L4.5665 10.3337C1.9665 12.9337 0.666504 16.4003 0.666504 19.7337C0.666504 23.067 1.9665 26.5837 4.5665 29.1837C7.1665 31.7837 10.5832 33.1003 13.9998 33.1003C17.4165 33.1003 20.8332 31.7837 23.4332 29.1837C26.0332 26.5837 27.3332 23.067 27.3332 19.7337C27.3332 16.4003 26.0332 12.9337 23.4332 10.3337ZM3.99984 20.3337C4.0165 17.0003 5.03317 14.8837 6.93317 13.0003L13.9998 5.78366L21.0665 13.0837C22.9665 14.9503 23.9832 17.0003 23.9998 20.3337H3.99984Z"
}));
const ArrowVectorDown = ({
  className,
  styles
}) => /*#__PURE__*/React.createElement("svg", {
  style: {
    ...styles
  },
  className: className,
  viewBox: "0 0 16 11",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M16 2.33331L14.12 0.453308L8 6.55997L1.88 0.453307L-8.21774e-08 2.33331L8 10.3333L16 2.33331Z",
  fill: "#a82227"
}));
const ArrowDirection = ({
  className,
  styles
}) => /*#__PURE__*/React.createElement("svg", {
  style: {
    ...styles
  },
  className: className,
  viewBox: "0 0 16 16",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M8.0013 2.66669L7.0613 3.60669L10.7813 7.33335H2.66797V8.66669H10.7813L7.0613 12.3934L8.0013 13.3334L13.3346 8.00002L8.0013 2.66669Z"
}));
const CameraIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "40",
  height: "40",
  viewBox: "0 0 40 40",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M15.0002 5L11.9502 8.33333H6.66683C4.8335 8.33333 3.3335 9.83333 3.3335 11.6667V31.6667C3.3335 33.5 4.8335 35 6.66683 35H33.3335C35.1668 35 36.6668 33.5 36.6668 31.6667V11.6667C36.6668 9.83333 35.1668 8.33333 33.3335 8.33333H28.0502L25.0002 5H15.0002ZM20.0002 30C15.4002 30 11.6668 26.2667 11.6668 21.6667C11.6668 17.0667 15.4002 13.3333 20.0002 13.3333C24.6002 13.3333 28.3335 17.0667 28.3335 21.6667C28.3335 26.2667 24.6002 30 20.0002 30Z",
  fill: "#a82227"
}), /*#__PURE__*/React.createElement("path", {
  d: "M20.0002 28.3333L22.0835 23.75L26.6668 21.6667L22.0835 19.5833L20.0002 15L17.9168 19.5833L13.3335 21.6667L17.9168 23.75L20.0002 28.3333Z",
  fill: "#a82227"
}));
const RemoveIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "24",
  height: "30",
  viewBox: "0 0 24 30",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M2.00016 26.6667C2.00016 28.5 3.50016 30 5.3335 30H18.6668C20.5002 30 22.0002 28.5 22.0002 26.6667V6.66667H2.00016V26.6667ZM23.6668 1.66667H17.8335L16.1668 0H7.8335L6.16683 1.66667H0.333496V5H23.6668V1.66667Z",
  fill: "#a82227"
}));
const GalleryIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "40",
  height: "34",
  viewBox: "0 0 40 34",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3.33333 7.00016H0V15.3335H0.0166667L0 30.3335C0 32.1668 1.5 33.6668 3.33333 33.6668H33.3333V30.3335H3.33333V7.00016ZM36.6667 3.66683H23.3333L20 0.333496H10C8.16667 0.333496 6.68333 1.8335 6.68333 3.66683L6.66667 23.6668C6.66667 25.5002 8.16667 27.0002 10 27.0002H36.6667C38.5 27.0002 40 25.5002 40 23.6668V7.00016C40 5.16683 38.5 3.66683 36.6667 3.66683ZM11.6667 22.0002L19.1667 12.0002L25 19.5168L29.1667 14.5002L35 22.0002H11.6667Z",
  fill: "#a82227"
}));
const EditPencilIcon = ({
  className,
  width: _width2 = 18,
  height: _height2 = 18
}) => /*#__PURE__*/React.createElement("svg", {
  className: className,
  width: _width2,
  height: _height2,
  viewBox: "0 0 18 18",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M9.126 5.12482L11.063 3.18782L14.81 6.93482L12.873 8.87282L9.126 5.12482ZM17.71 2.62982L15.37 0.289816C15.1826 0.103565 14.9292 -0.000976562 14.665 -0.000976562C14.4008 -0.000976563 14.1474 0.103565 13.96 0.289816L12.13 2.11982L15.88 5.86982L17.71 3.99982C17.8844 3.81436 17.9815 3.56938 17.9815 3.31482C17.9815 3.06025 17.8844 2.81528 17.71 2.62982ZM5.63 8.62982L0 14.2498V17.9998H3.75L9.38 12.3798L12.873 8.87282L9.126 5.12482L5.63 8.62982Z",
  fill: "#505A5F"
}));
const AddressBookIcon = ({
  styles,
  className
}) => /*#__PURE__*/React.createElement("svg", {
  className: className,
  style: {
    ...styles
  },
  viewBox: "0 0 20 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M18 0H2V2H18V0ZM2 24H18V22H2V24ZM18 4H2C0.9 4 0 4.9 0 6V18C0 19.1 0.9 20 2 20H18C19.1 20 20 19.1 20 18V6C20 4.9 19.1 4 18 4ZM10 6.75C11.24 6.75 12.25 7.76 12.25 9C12.25 10.24 11.24 11.25 10 11.25C8.76 11.25 7.75 10.24 7.75 9C7.75 7.76 8.76 6.75 10 6.75ZM15 17H5V15.5C5 13.83 8.33 13 10 13C11.67 13 15 13.83 15 15.5V17Z",
  fill: "#B1B4B6"
}));
const LocationIcon = ({
  styles,
  className
}) => /*#__PURE__*/React.createElement("svg", {
  className: className,
  style: {
    ...styles
  },
  viewBox: "0 0 14 20",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M7 0C3.13 0 0 3.13 0 7C0 8.74 0.5 10.37 1.41 11.84C2.36 13.38 3.61 14.7 4.57 16.24C5.04 16.99 5.38 17.69 5.74 18.5C6 19.05 6.21 20 7 20C7.79 20 8 19.05 8.25 18.5C8.62 17.69 8.95 16.99 9.42 16.24C10.38 14.71 11.63 13.39 12.58 11.84C13.5 10.37 14 8.74 14 7C14 3.13 10.87 0 7 0ZM7 9.75C5.62 9.75 4.5 8.63 4.5 7.25C4.5 5.87 5.62 4.75 7 4.75C8.38 4.75 9.5 5.87 9.5 7.25C9.5 8.63 8.38 9.75 7 9.75Z",
  fill: "#B1B4B6"
}));
const CollectionsBookmarIcons = ({
  styles,
  className
}) => /*#__PURE__*/React.createElement("svg", {
  width: "22",
  height: "28",
  className: className,
  style: {
    ...styles
  },
  viewBox: "0 0 22 28",
  fill: "#ffffff",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M18.9999 0.666992H2.99992C1.53325 0.666992 0.333252 1.86699 0.333252 3.33366V24.667C0.333252 26.1337 1.53325 27.3337 2.99992 27.3337H18.9999C20.4666 27.3337 21.6666 26.1337 21.6666 24.667V3.33366C21.6666 1.86699 20.4666 0.666992 18.9999 0.666992ZM2.99992 3.33366H9.66658V14.0003L6.33325 12.0003L2.99992 14.0003V3.33366Z"
}));
const FinanceChartIcon = ({
  styles,
  className
}) => /*#__PURE__*/React.createElement("svg", {
  width: "30",
  height: "30",
  className: className,
  style: {
    ...styles
  },
  viewBox: "0 0 30 30",
  fill: "#ffffff",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M26.6667 0H3.33333C1.5 0 0 1.5 0 3.33333V26.6667C0 28.5 1.5 30 3.33333 30H26.6667C28.5 30 30 28.5 30 26.6667V3.33333C30 1.5 28.5 0 26.6667 0ZM10 23.3333H6.66667V11.6667H10V23.3333ZM16.6667 23.3333H13.3333V6.66667H16.6667V23.3333ZM23.3333 23.3333H20V16.6667H23.3333V23.3333Z"
}));
const CollectionIcon = ({
  styles,
  className
}) => /*#__PURE__*/React.createElement("svg", {
  width: "24",
  height: "27",
  className: className,
  style: {
    ...styles
  },
  viewBox: "0 0 24 27",
  fill: "#ffffff",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M21.3333 2.99967H15.76C15.2 1.45301 13.7333 0.333008 12 0.333008C10.2667 0.333008 8.8 1.45301 8.24 2.99967H2.66667C1.2 2.99967 0 4.19967 0 5.66634V24.333C0 25.7997 1.2 26.9997 2.66667 26.9997H21.3333C22.8 26.9997 24 25.7997 24 24.333V5.66634C24 4.19967 22.8 2.99967 21.3333 2.99967ZM12 2.99967C12.7333 2.99967 13.3333 3.59967 13.3333 4.33301C13.3333 5.06634 12.7333 5.66634 12 5.66634C11.2667 5.66634 10.6667 5.06634 10.6667 4.33301C10.6667 3.59967 11.2667 2.99967 12 2.99967ZM14.6667 21.6663H5.33333V18.9997H14.6667V21.6663ZM18.6667 16.333H5.33333V13.6663H18.6667V16.333ZM18.6667 10.9997H5.33333V8.33301H18.6667V10.9997Z"
}));
const BillsIcon = ({
  styles,
  className
}) => /*#__PURE__*/React.createElement("svg", {
  width: "24",
  height: "27",
  className: className,
  style: {
    ...styles
  },
  viewBox: "0 0 24 27",
  fill: "#ffffff",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M21.3333 2.99967H15.76C15.2 1.45301 13.7333 0.333008 12 0.333008C10.2667 0.333008 8.8 1.45301 8.24 2.99967H2.66667C1.2 2.99967 0 4.19967 0 5.66634V24.333C0 25.7997 1.2 26.9997 2.66667 26.9997H21.3333C22.8 26.9997 24 25.7997 24 24.333V5.66634C24 4.19967 22.8 2.99967 21.3333 2.99967ZM12 2.99967C12.7333 2.99967 13.3333 3.59967 13.3333 4.33301C13.3333 5.06634 12.7333 5.66634 12 5.66634C11.2667 5.66634 10.6667 5.06634 10.6667 4.33301C10.6667 3.59967 11.2667 2.99967 12 2.99967ZM14.6667 21.6663H5.33333V18.9997H14.6667V21.6663ZM18.6667 16.333H5.33333V13.6663H18.6667V16.333ZM18.6667 10.9997H5.33333V8.33301H18.6667V10.9997Z"
}));
const MCollectIcon = ({
  styles,
  className
}) => /*#__PURE__*/React.createElement("svg", {
  width: "37",
  height: "35",
  className: className,
  style: {
    ...styles
  },
  viewBox: "0 0 37 35",
  fill: "#ffffff",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M34.375 28.75V30.625C34.375 32.6875 32.6875 34.375 30.625 34.375H4.375C2.29375 34.375 0.625 32.6875 0.625 30.625V4.375C0.625 2.3125 2.29375 0.625 4.375 0.625H30.625C32.6875 0.625 34.375 2.3125 34.375 4.375V6.25H17.5C15.4187 6.25 13.75 7.9375 13.75 10V25C13.75 27.0625 15.4187 28.75 17.5 28.75H34.375ZM17.5 25H36.25V10H17.5V25ZM25 20.3125C23.4438 20.3125 22.1875 19.0562 22.1875 17.5C22.1875 15.9438 23.4438 14.6875 25 14.6875C26.5562 14.6875 27.8125 15.9438 27.8125 17.5C27.8125 19.0562 26.5562 20.3125 25 20.3125Z"
}));
const PGRIcon = ({
  styles,
  className
}) => /*#__PURE__*/React.createElement("svg", {
  width: "35",
  height: "39",
  className: className,
  style: {
    ...styles
  },
  viewBox: "0 0 35 39",
  fill: "#ffffff",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M31.168 0.75H3.83464C1.95547 0.75 0.435052 2.4375 0.435052 4.5L0.417969 38.25L7.2513 30.75H31.168C33.0471 30.75 34.5846 29.0625 34.5846 27V4.5C34.5846 2.4375 33.0471 0.75 31.168 0.75ZM19.2096 17.625H15.793V6.375H19.2096V17.625ZM19.2096 25.125H15.793V21.375H19.2096V25.125Z"
}));
const FirenocIcon = ({
  styles,
  className
}) => /*#__PURE__*/React.createElement("svg", {
  width: "35",
  height: "39",
  className: className,
  style: {
    ...styles
  },
  viewBox: "0 0 35 39",
  fill: "#ffffff",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M21.5142857,14.0571429 C21.12,13.5428571 20.6571429,13.0971429 20.2114286,12.6514286 C19.0971429,11.6228571 17.8114286,10.8857143 16.7314286,9.80571429 C14.2285714,7.30285714 13.7142857,3.17142857 15.2742857,0 C13.7142857,0.394285714 12.2742857,1.28571429 11.0742857,2.26285714 C6.72,5.82857143 5.00571429,12.12 7.06285714,17.52 C7.13142857,17.6914286 7.2,17.8628571 7.2,18.0857143 C7.2,18.4628571 6.94285714,18.8057143 6.6,18.9428571 C6.22285714,19.1142857 5.81142857,19.0114286 5.50285714,18.7371429 C5.4,18.6514286 5.33142857,18.5657143 5.24571429,18.4457143 C3.36,15.9942857 3.05142857,12.48 4.33714286,9.66857143 C1.52571429,12 8.60422844e-16,15.9428571 0.24,19.6628571 C0.308571429,20.52 0.411428571,21.3771429 0.702857143,22.2342857 C0.942857143,23.2628571 1.38857143,24.2914286 1.93714286,25.2 C3.72,28.1657143 6.85714286,30.2914286 10.2342857,30.72 C13.8342857,31.1828571 17.6914286,30.5142857 20.4514286,27.9771429 C23.5371429,25.1314286 24.6514286,20.5714286 23.0228571,16.6628571 L22.8,16.2171429 C22.4571429,15.4285714 21.9942857,14.7257143 21.4285714,14.0742857 L21.5142857,14.0571429 L21.5142857,14.0571429 Z M16.2,24.8571429 C15.72,25.2685714 14.9485714,25.7142857 14.3485714,25.8857143 C12.4628571,26.5714286 10.5771429,25.6114286 9.42857143,24.48 C11.4685714,24 12.6685714,22.4914286 13.0114286,20.9657143 C13.3028571,19.5942857 12.7714286,18.4628571 12.5485714,17.1428571 C12.3428571,15.8742857 12.3771429,14.7942857 12.8571429,13.6114286 C13.1485714,14.2628571 13.4914286,14.9142857 13.8857143,15.4285714 C15.1885714,17.1428571 17.2285714,17.8971429 17.6571429,20.2285714 C17.7257143,20.4685714 17.76,20.7085714 17.76,20.9657143 C17.8114286,22.3714286 17.2114286,23.9142857 16.1828571,24.8571429 L16.2,24.8571429 Z",
  id: "Shape"
}));
const BirthIcon = ({
  styles,
  className
}) => /*#__PURE__*/React.createElement("svg", {
  width: "35",
  height: "39",
  className: className,
  style: {
    ...styles
  },
  viewBox: "0 0 35 39",
  fill: "#ffffff",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M20.7502 0.916016H3.25016C1.646 0.916016 0.333496 2.22852 0.333496 3.83268V27.166C0.333496 28.7702 1.646 30.0827 3.25016 30.0827H20.7502C22.3543 30.0827 23.6668 28.7702 23.6668 27.166V3.83268C23.6668 2.22852 22.3543 0.916016 20.7502 0.916016ZM3.25016 3.83268H10.5418V15.4994L6.896 13.3119L3.25016 15.4994V3.83268Z"
}));
const DeathIcon = ({
  styles,
  className
}) => /*#__PURE__*/React.createElement("svg", {
  width: "35",
  height: "39",
  className: className,
  style: {
    ...styles
  },
  viewBox: "0 0 35 39",
  fill: "#ffffff",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M27.1665 0.375H3.83317C2.229 0.375 0.916504 1.6875 0.916504 3.29167V23.7083C0.916504 25.3125 2.229 26.625 3.83317 26.625H27.1665C28.7707 26.625 30.0832 25.3125 30.0832 23.7083V3.29167C30.0832 1.6875 28.7707 0.375 27.1665 0.375ZM12.5832 20.7917H5.2915V17.875H12.5832V20.7917ZM12.5832 14.9583H5.2915V12.0417H12.5832V14.9583ZM12.5832 9.125H5.2915V6.20833H12.5832V9.125ZM19.6123 17.875L15.4998 13.7333L17.5561 11.6771L19.6123 13.7479L24.2353 9.125L26.3061 11.1958L19.6123 17.875Z"
}));
const ErrorIcon = ({
  className
}) => /*#__PURE__*/React.createElement("svg", {
  width: "20",
  height: "20",
  viewBox: "0 0 20 20",
  fill: "#FFFFFF",
  xmlns: "http://www.w3.org/2000/svg",
  className: className
}, /*#__PURE__*/React.createElement("path", {
  d: "M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z",
  fill: "white"
}));
const DownloadBtnCommon = () => /*#__PURE__*/React.createElement("svg", {
  width: "112",
  height: "32",
  viewBox: "0 0 112 32",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M25.3337 12H20.0003V4H12.0003V12H6.66699L16.0003 21.3333L25.3337 12ZM6.66699 24V26.6667H25.3337V24H6.66699Z",
  fill: "#a82227"
}), /*#__PURE__*/React.createElement("path", {
  d: "M44.3984 21.5H42.0234L42.0391 20.2734H44.3984C45.2109 20.2734 45.888 20.1042 46.4297 19.7656C46.9714 19.4219 47.3776 18.9427 47.6484 18.3281C47.9245 17.7083 48.0625 16.9844 48.0625 16.1562V15.4609C48.0625 14.8099 47.9844 14.2318 47.8281 13.7266C47.6719 13.2161 47.4427 12.7865 47.1406 12.4375C46.8385 12.0833 46.4688 11.8151 46.0312 11.6328C45.599 11.4505 45.1016 11.3594 44.5391 11.3594H41.9766V10.125H44.5391C45.2839 10.125 45.9635 10.25 46.5781 10.5C47.1927 10.7448 47.7214 11.1016 48.1641 11.5703C48.612 12.0339 48.9557 12.5964 49.1953 13.2578C49.4349 13.9141 49.5547 14.6536 49.5547 15.4766V16.1562C49.5547 16.9792 49.4349 17.7214 49.1953 18.3828C48.9557 19.0391 48.6094 19.599 48.1562 20.0625C47.7083 20.526 47.1667 20.8828 46.5312 21.1328C45.901 21.3776 45.1901 21.5 44.3984 21.5ZM42.8281 10.125V21.5H41.3203V10.125H42.8281ZM51.2188 17.3672V17.1875C51.2188 16.5781 51.3073 16.013 51.4844 15.4922C51.6615 14.9661 51.9167 14.5104 52.25 14.125C52.5833 13.7344 52.987 13.4323 53.4609 13.2188C53.9349 13 54.4661 12.8906 55.0547 12.8906C55.6484 12.8906 56.1823 13 56.6562 13.2188C57.1354 13.4323 57.5417 13.7344 57.875 14.125C58.2135 14.5104 58.4714 14.9661 58.6484 15.4922C58.8255 16.013 58.9141 16.5781 58.9141 17.1875V17.3672C58.9141 17.9766 58.8255 18.5417 58.6484 19.0625C58.4714 19.5833 58.2135 20.0391 57.875 20.4297C57.5417 20.8151 57.138 21.1172 56.6641 21.3359C56.1953 21.5495 55.6641 21.6562 55.0703 21.6562C54.4766 21.6562 53.9427 21.5495 53.4688 21.3359C52.9948 21.1172 52.5885 20.8151 52.25 20.4297C51.9167 20.0391 51.6615 19.5833 51.4844 19.0625C51.3073 18.5417 51.2188 17.9766 51.2188 17.3672ZM52.6641 17.1875V17.3672C52.6641 17.7891 52.7135 18.1875 52.8125 18.5625C52.9115 18.9323 53.0599 19.2604 53.2578 19.5469C53.4609 19.8333 53.7135 20.0599 54.0156 20.2266C54.3177 20.388 54.6693 20.4688 55.0703 20.4688C55.4661 20.4688 55.8125 20.388 56.1094 20.2266C56.4115 20.0599 56.6615 19.8333 56.8594 19.5469C57.0573 19.2604 57.2057 18.9323 57.3047 18.5625C57.4089 18.1875 57.4609 17.7891 57.4609 17.3672V17.1875C57.4609 16.7708 57.4089 16.3776 57.3047 16.0078C57.2057 15.6328 57.0547 15.3021 56.8516 15.0156C56.6536 14.724 56.4036 14.4948 56.1016 14.3281C55.8047 14.1615 55.4557 14.0781 55.0547 14.0781C54.6589 14.0781 54.3099 14.1615 54.0078 14.3281C53.7109 14.4948 53.4609 14.724 53.2578 15.0156C53.0599 15.3021 52.9115 15.6328 52.8125 16.0078C52.7135 16.3776 52.6641 16.7708 52.6641 17.1875ZM62.8672 20L65.0391 13.0469H65.9922L65.8047 14.4297L63.5938 21.5H62.6641L62.8672 20ZM61.4062 13.0469L63.2578 20.0781L63.3906 21.5H62.4141L59.9609 13.0469H61.4062ZM68.0703 20.0234L69.8359 13.0469H71.2734L68.8203 21.5H67.8516L68.0703 20.0234ZM66.2031 13.0469L68.3281 19.8828L68.5703 21.5H67.6484L65.375 14.4141L65.1875 13.0469H66.2031ZM74.2031 14.8516V21.5H72.7578V13.0469H74.125L74.2031 14.8516ZM73.8594 16.9531L73.2578 16.9297C73.263 16.3516 73.349 15.8177 73.5156 15.3281C73.6823 14.8333 73.9167 14.4036 74.2188 14.0391C74.5208 13.6745 74.8802 13.3932 75.2969 13.1953C75.7188 12.9922 76.1849 12.8906 76.6953 12.8906C77.112 12.8906 77.487 12.9479 77.8203 13.0625C78.1536 13.1719 78.4375 13.349 78.6719 13.5938C78.9115 13.8385 79.0938 14.1562 79.2188 14.5469C79.3438 14.9323 79.4062 15.4036 79.4062 15.9609V21.5H77.9531V15.9453C77.9531 15.5026 77.888 15.1484 77.7578 14.8828C77.6276 14.612 77.4375 14.4167 77.1875 14.2969C76.9375 14.1719 76.6302 14.1094 76.2656 14.1094C75.9062 14.1094 75.5781 14.1849 75.2812 14.3359C74.9896 14.487 74.737 14.6953 74.5234 14.9609C74.3151 15.2266 74.151 15.5312 74.0312 15.875C73.9167 16.2135 73.8594 16.5729 73.8594 16.9531ZM83.1719 9.5V21.5H81.7188V9.5H83.1719ZM85.1094 17.3672V17.1875C85.1094 16.5781 85.1979 16.013 85.375 15.4922C85.5521 14.9661 85.8073 14.5104 86.1406 14.125C86.474 13.7344 86.8776 13.4323 87.3516 13.2188C87.8255 13 88.3568 12.8906 88.9453 12.8906C89.5391 12.8906 90.0729 13 90.5469 13.2188C91.026 13.4323 91.4323 13.7344 91.7656 14.125C92.1042 14.5104 92.362 14.9661 92.5391 15.4922C92.7161 16.013 92.8047 16.5781 92.8047 17.1875V17.3672C92.8047 17.9766 92.7161 18.5417 92.5391 19.0625C92.362 19.5833 92.1042 20.0391 91.7656 20.4297C91.4323 20.8151 91.0286 21.1172 90.5547 21.3359C90.0859 21.5495 89.5547 21.6562 88.9609 21.6562C88.3672 21.6562 87.8333 21.5495 87.3594 21.3359C86.8854 21.1172 86.4792 20.8151 86.1406 20.4297C85.8073 20.0391 85.5521 19.5833 85.375 19.0625C85.1979 18.5417 85.1094 17.9766 85.1094 17.3672ZM86.5547 17.1875V17.3672C86.5547 17.7891 86.6042 18.1875 86.7031 18.5625C86.8021 18.9323 86.9505 19.2604 87.1484 19.5469C87.3516 19.8333 87.6042 20.0599 87.9062 20.2266C88.2083 20.388 88.5599 20.4688 88.9609 20.4688C89.3568 20.4688 89.7031 20.388 90 20.2266C90.3021 20.0599 90.5521 19.8333 90.75 19.5469C90.9479 19.2604 91.0964 18.9323 91.1953 18.5625C91.2995 18.1875 91.3516 17.7891 91.3516 17.3672V17.1875C91.3516 16.7708 91.2995 16.3776 91.1953 16.0078C91.0964 15.6328 90.9453 15.3021 90.7422 15.0156C90.5443 14.724 90.2943 14.4948 89.9922 14.3281C89.6953 14.1615 89.3464 14.0781 88.9453 14.0781C88.5495 14.0781 88.2005 14.1615 87.8984 14.3281C87.6016 14.4948 87.3516 14.724 87.1484 15.0156C86.9505 15.3021 86.8021 15.6328 86.7031 16.0078C86.6042 16.3776 86.5547 16.7708 86.5547 17.1875ZM99.6016 20.0547V15.7031C99.6016 15.3698 99.5339 15.0807 99.3984 14.8359C99.2682 14.5859 99.0703 14.3932 98.8047 14.2578C98.5391 14.1224 98.2109 14.0547 97.8203 14.0547C97.4557 14.0547 97.1354 14.1172 96.8594 14.2422C96.5885 14.3672 96.375 14.5312 96.2188 14.7344C96.0677 14.9375 95.9922 15.1562 95.9922 15.3906H94.5469C94.5469 15.0885 94.625 14.7891 94.7812 14.4922C94.9375 14.1953 95.1615 13.9271 95.4531 13.6875C95.75 13.4427 96.1042 13.25 96.5156 13.1094C96.9323 12.9635 97.3958 12.8906 97.9062 12.8906C98.5208 12.8906 99.0625 12.9948 99.5312 13.2031C100.005 13.4115 100.375 13.7266 100.641 14.1484C100.911 14.5651 101.047 15.0885 101.047 15.7188V19.6562C101.047 19.9375 101.07 20.237 101.117 20.5547C101.169 20.8724 101.245 21.1458 101.344 21.375V21.5H99.8359C99.763 21.3333 99.7057 21.112 99.6641 20.8359C99.6224 20.5547 99.6016 20.2943 99.6016 20.0547ZM99.8516 16.375L99.8672 17.3906H98.4062C97.9948 17.3906 97.6276 17.4245 97.3047 17.4922C96.9818 17.5547 96.7109 17.651 96.4922 17.7812C96.2734 17.9115 96.1068 18.0755 95.9922 18.2734C95.8776 18.4661 95.8203 18.6927 95.8203 18.9531C95.8203 19.2188 95.8802 19.4609 96 19.6797C96.1198 19.8984 96.2995 20.0729 96.5391 20.2031C96.7839 20.3281 97.0833 20.3906 97.4375 20.3906C97.8802 20.3906 98.2708 20.2969 98.6094 20.1094C98.9479 19.9219 99.2161 19.6927 99.4141 19.4219C99.6172 19.151 99.7266 18.888 99.7422 18.6328L100.359 19.3281C100.323 19.5469 100.224 19.7891 100.062 20.0547C99.901 20.3203 99.6849 20.5755 99.4141 20.8203C99.1484 21.0599 98.8307 21.2604 98.4609 21.4219C98.0964 21.5781 97.6849 21.6562 97.2266 21.6562C96.6536 21.6562 96.151 21.5443 95.7188 21.3203C95.2917 21.0964 94.9583 20.7969 94.7188 20.4219C94.4844 20.0417 94.3672 19.6172 94.3672 19.1484C94.3672 18.6953 94.4557 18.2969 94.6328 17.9531C94.8099 17.6042 95.0651 17.3151 95.3984 17.0859C95.7318 16.8516 96.1328 16.6745 96.6016 16.5547C97.0703 16.4349 97.5938 16.375 98.1719 16.375H99.8516ZM108.648 19.8594V9.5H110.102V21.5H108.773L108.648 19.8594ZM102.961 17.3672V17.2031C102.961 16.5573 103.039 15.9714 103.195 15.4453C103.357 14.9141 103.583 14.4583 103.875 14.0781C104.172 13.6979 104.523 13.4062 104.93 13.2031C105.341 12.9948 105.799 12.8906 106.305 12.8906C106.836 12.8906 107.299 12.9844 107.695 13.1719C108.096 13.3542 108.435 13.6224 108.711 13.9766C108.992 14.3255 109.214 14.7474 109.375 15.2422C109.536 15.737 109.648 16.2969 109.711 16.9219V17.6406C109.654 18.2604 109.542 18.8177 109.375 19.3125C109.214 19.8073 108.992 20.2292 108.711 20.5781C108.435 20.9271 108.096 21.1953 107.695 21.3828C107.294 21.5651 106.826 21.6562 106.289 21.6562C105.794 21.6562 105.341 21.5495 104.93 21.3359C104.523 21.1224 104.172 20.8229 103.875 20.4375C103.583 20.0521 103.357 19.599 103.195 19.0781C103.039 18.5521 102.961 17.9818 102.961 17.3672ZM104.414 17.2031V17.3672C104.414 17.7891 104.456 18.1849 104.539 18.5547C104.628 18.9245 104.763 19.25 104.945 19.5312C105.128 19.8125 105.359 20.0339 105.641 20.1953C105.922 20.3516 106.258 20.4297 106.648 20.4297C107.128 20.4297 107.521 20.3281 107.828 20.125C108.141 19.9219 108.391 19.6536 108.578 19.3203C108.766 18.987 108.911 18.625 109.016 18.2344V16.3516C108.953 16.0651 108.862 15.7891 108.742 15.5234C108.628 15.2526 108.477 15.013 108.289 14.8047C108.107 14.5911 107.88 14.4219 107.609 14.2969C107.344 14.1719 107.029 14.1094 106.664 14.1094C106.268 14.1094 105.927 14.1927 105.641 14.3594C105.359 14.5208 105.128 14.7448 104.945 15.0312C104.763 15.3125 104.628 15.6406 104.539 16.0156C104.456 16.3854 104.414 16.7812 104.414 17.2031Z",
  fill: "#a82227"
}));
const PrintBtnCommon = () => /*#__PURE__*/React.createElement("svg", {
  width: "41",
  height: "41",
  viewBox: "0 0 41 41",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M32.1663 13.8333H8.83301C6.06634 13.8333 3.83301 16.0667 3.83301 18.8333V28.8333H10.4997V35.5H30.4997V28.8333H37.1663V18.8333C37.1663 16.0667 34.933 13.8333 32.1663 13.8333ZM27.1663 32.1667H13.833V23.8333H27.1663V32.1667ZM32.1663 20.5C31.2497 20.5 30.4997 19.75 30.4997 18.8333C30.4997 17.9167 31.2497 17.1667 32.1663 17.1667C33.083 17.1667 33.833 17.9167 33.833 18.8333C33.833 19.75 33.083 20.5 32.1663 20.5ZM30.4997 5.5H10.4997V12.1667H30.4997V5.5Z",
  fill: "#505A5F"
}));
const WhatsappIconGreen = ({
  className,
  styles
}) => /*#__PURE__*/React.createElement("svg", {
  className: className,
  style: {
    ...styles
  },
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M0.0566406 24L1.74364 17.837C0.702641 16.033 0.155641 13.988 0.156641 11.891C0.159641 5.335 5.49464 0 12.0496 0C15.2306 0.001 18.2166 1.24 20.4626 3.488C22.7076 5.736 23.9436 8.724 23.9426 11.902C23.9396 18.459 18.6046 23.794 12.0496 23.794C10.0596 23.793 8.09864 23.294 6.36164 22.346L0.0566406 24ZM6.65364 20.193C8.32964 21.188 9.92964 21.784 12.0456 21.785C17.4936 21.785 21.9316 17.351 21.9346 11.9C21.9366 6.438 17.5196 2.01 12.0536 2.008C6.60164 2.008 2.16664 6.442 2.16464 11.892C2.16364 14.117 2.81564 15.783 3.91064 17.526L2.91164 21.174L6.65364 20.193ZM18.0406 14.729C17.9666 14.605 17.7686 14.531 17.4706 14.382C17.1736 14.233 15.7126 13.514 15.4396 13.415C15.1676 13.316 14.9696 13.266 14.7706 13.564C14.5726 13.861 14.0026 14.531 13.8296 14.729C13.6566 14.927 13.4826 14.952 13.1856 14.803C12.8886 14.654 11.9306 14.341 10.7956 13.328C9.91264 12.54 9.31564 11.567 9.14264 11.269C8.96964 10.972 9.12464 10.811 9.27264 10.663C9.40664 10.53 9.56964 10.316 9.71864 10.142C9.86964 9.97 9.91864 9.846 10.0186 9.647C10.1176 9.449 10.0686 9.275 9.99364 9.126C9.91864 8.978 9.32464 7.515 9.07764 6.92C8.83564 6.341 8.59064 6.419 8.40864 6.41L7.83864 6.4C7.64064 6.4 7.31864 6.474 7.04664 6.772C6.77464 7.07 6.00664 7.788 6.00664 9.251C6.00664 10.714 7.07164 12.127 7.21964 12.325C7.36864 12.523 9.31464 15.525 12.2956 16.812C13.0046 17.118 13.5586 17.301 13.9896 17.438C14.7016 17.664 15.3496 17.632 15.8616 17.556C16.4326 17.471 17.6196 16.837 17.8676 16.143C18.1156 15.448 18.1156 14.853 18.0406 14.729Z",
  fill: "#25D366"
}));
const HelpLineIcon = ({
  className,
  styles
}) => /*#__PURE__*/React.createElement("svg", {
  className: className,
  style: {
    ...styles
  },
  width: "24",
  height: "18",
  viewBox: "0 0 24 18",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M22 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H22C23.1 18 23.99 17.1 23.99 16L24 2C24 0.9 23.1 0 22 0ZM8 3C9.66 3 11 4.34 11 6C11 7.66 9.66 9 8 9C6.34 9 5 7.66 5 6C5 4.34 6.34 3 8 3ZM14 15H2V14C2 12 6 10.9 8 10.9C10 10.9 14 12 14 14V15ZM17.85 11H19.49L21 13L19.01 14.99C17.7 14.01 16.73 12.61 16.28 11C16.1 10.36 16 9.69 16 9C16 8.31 16.1 7.64 16.28 7C16.73 5.38 17.7 3.99 19.01 3.01L21 5L19.49 7H17.85C17.63 7.63 17.5 8.3 17.5 9C17.5 9.7 17.63 10.37 17.85 11Z",
  fill: "#0B0C0C"
}));
const ServiceCenterIcon = ({
  className,
  styles
}) => /*#__PURE__*/React.createElement("svg", {
  className: className,
  style: {
    ...styles
  },
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M7 10H4V17H7V10Z",
  fill: "#0B0C0C"
}), /*#__PURE__*/React.createElement("path", {
  d: "M13.5 10H10.5V17H13.5V10Z",
  fill: "#0B0C0C"
}), /*#__PURE__*/React.createElement("path", {
  d: "M22 19H2V22H22V19Z",
  fill: "#0B0C0C"
}), /*#__PURE__*/React.createElement("path", {
  d: "M20 10H17V17H20V10Z",
  fill: "#0B0C0C"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 1L2 6V8H22V6L12 1Z",
  fill: "#0B0C0C"
}));
const TimerIcon = ({
  className,
  styles
}) => /*#__PURE__*/React.createElement("svg", {
  className: className,
  style: {
    ...styles
  },
  width: "20",
  height: "20",
  viewBox: "0 0 20 20",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M13.0998 17.3701L14.0998 19.1101C13.1398 19.5501 12.0898 19.84 10.9998 19.9501V17.93C11.7398 17.84 12.4398 17.6501 13.0998 17.3701ZM2.0698 11H0.0498047C0.159805 12.1 0.449805 13.14 0.889805 14.1L2.6298 13.1C2.3498 12.44 2.1598 11.74 2.0698 11ZM13.0998 2.63005L14.0998 0.890049C13.1398 0.450049 12.0998 0.160049 10.9998 0.0500488V2.07005C11.7398 2.16005 12.4398 2.35005 13.0998 2.63005ZM17.9298 9.00005H19.9498C19.8398 7.90005 19.5498 6.86005 19.1098 5.90005L17.3698 6.90005C17.6498 7.56005 17.8398 8.26005 17.9298 9.00005ZM6.8998 17.3701L5.89981 19.1101C6.85981 19.5501 7.9098 19.84 8.9998 19.9501V17.93C8.2598 17.84 7.5598 17.6501 6.8998 17.3701ZM8.9998 2.07005V0.0500488C7.8998 0.160049 6.85981 0.450049 5.89981 0.890049L6.8998 2.63005C7.5598 2.35005 8.2598 2.16005 8.9998 2.07005ZM16.3598 5.17005L18.0998 4.16005C17.4698 3.29005 16.6998 2.52005 15.8298 1.89005L14.8198 3.63005C15.4098 4.08005 15.9198 4.59005 16.3598 5.17005ZM2.6298 6.90005L0.889805 5.90005C0.449805 6.86005 0.159805 7.90005 0.0498047 9.00005H2.0698C2.1598 8.26005 2.3498 7.56005 2.6298 6.90005ZM17.9298 11C17.8398 11.74 17.6498 12.44 17.3698 13.1L19.1098 14.1C19.5498 13.14 19.8398 12.09 19.9498 11H17.9298ZM14.8298 16.3601L15.8398 18.1C16.7098 17.4701 17.4798 16.7 18.1098 15.83L16.3698 14.82C15.9198 15.41 15.4098 15.9201 14.8298 16.3601ZM5.1698 3.64005L4.1698 1.89005C3.2898 2.53005 2.5298 3.29005 1.8998 4.17005L3.6398 5.18005C4.0798 4.59005 4.5898 4.08005 5.1698 3.64005ZM3.6398 14.83L1.8998 15.83C2.5298 16.7 3.2998 17.4701 4.1698 18.1L5.1798 16.3601C4.5898 15.9201 4.0798 15.41 3.6398 14.83ZM10.9998 5.00005H8.9998V10.41L13.2898 14.7L14.6998 13.29L10.9998 9.59005V5.00005Z",
  fill: "#a82227"
}));
const RupeeSymbol = ({
  className,
  styles
}) => /*#__PURE__*/React.createElement("svg", {
  className: className,
  style: {
    ...styles
  },
  width: "13",
  height: "18",
  viewBox: "0 0 13 18",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M11.5781 3.26953H9.12891C9.48828 3.83203 9.72266 4.48438 9.83203 5.22656H12.1875L11.5664 7.54688H9.82031C9.64062 8.71094 9.17578 9.63672 8.42578 10.3242C7.67578 11.0117 6.59766 11.4922 5.19141 11.7656L10.3125 17.8359V18H6.43359L0.761719 11.3555L0.75 9.29297H3.52734C4.97266 9.29297 5.87891 8.71094 6.24609 7.54688H0.46875L1.07812 5.22656H6.17578C5.79297 4.28125 4.95312 3.80078 3.65625 3.78516H0.46875L1.16016 0.9375H12.1875L11.5781 3.26953Z",
  fill: "#a82227"
}));
const ValidityTimeIcon = ({
  className,
  styles
}) => /*#__PURE__*/React.createElement("svg", {
  className: className,
  style: {
    ...styles
  },
  width: "21",
  height: "18",
  viewBox: "0 0 21 18",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M12 0C7.03 0 3 4.03 3 9H0L3.89 12.89L3.96 13.03L8 9H5C5 5.13 8.13 2 12 2C15.87 2 19 5.13 19 9C19 12.87 15.87 16 12 16C10.07 16 8.32 15.21 7.06 13.94L5.64 15.36C7.27 16.99 9.51 18 12 18C16.97 18 21 13.97 21 9C21 4.03 16.97 0 12 0ZM11 5V10L15.28 12.54L16 11.33L12.5 9.25V5H11Z",
  fill: "#a82227"
}));
const AddIcon = ({
  styles,
  className,
  fill: _fill2 = "white"
}) => /*#__PURE__*/React.createElement("svg", {
  width: "12",
  height: "14",
  className: className,
  style: {
    ...styles
  },
  viewBox: "0 0 12 14",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M11.8125 5.49609V8.4375H0.117188V5.49609H11.8125ZM7.57031 0.867188V13.2891H4.37109V0.867188H7.57031Z",
  fill: _fill2
}));
const AddNewIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "30",
  height: "30",
  viewBox: "0 0 30 30",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M23.3333 14.5833C24.3542 14.5833 25.3312 14.7729 26.25 15.0938V8.75L17.5 0H2.91667C1.29792 0 0 1.29792 0 2.91667V23.3333C0 24.9521 1.3125 26.25 2.91667 26.25H15.0938C14.7729 25.3312 14.5833 24.3542 14.5833 23.3333C14.5833 18.5062 18.5062 14.5833 23.3333 14.5833ZM16.0417 2.1875L24.0625 10.2083H16.0417V2.1875ZM29.1667 21.875V24.7917H24.7917V29.1667H21.875V24.7917H17.5V21.875H21.875V17.5H24.7917V21.875H29.1667Z",
  fill: "#a82227"
}));
const ViewReportIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "30",
  height: "30",
  viewBox: "0 0 30 30",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M26.6667 0H3.33333C1.5 0 0 1.5 0 3.33333V26.6667C0 28.5 1.5 30 3.33333 30H26.6667C28.5 30 30 28.5 30 26.6667V3.33333C30 1.5 28.5 0 26.6667 0ZM18.3333 23.3333H6.66667V20H18.3333V23.3333ZM23.3333 16.6667H6.66667V13.3333H23.3333V16.6667ZM23.3333 10H6.66667V6.66667H23.3333V10Z",
  fill: "#a82227"
}));
const InboxIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "30",
  height: "30",
  viewBox: "0 0 30 30",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M26.6667 0H3.33333C1.5 0 0 1.5 0 3.33333V15C0 16.8333 1.5 18.3333 3.33333 18.3333H26.6667C28.5 18.3333 30 16.8333 30 15V3.33333C30 1.5 28.5 0 26.6667 0ZM26.6667 10H20C20 12.7 17.7 15 15 15C12.3 15 10 12.7 10 10H3.33333V3.33333H26.6667V10ZM20 21.6667H30V26.6667C30 28.5 28.5 30 26.6667 30H3.33333C1.5 30 0 28.5 0 26.6667V21.6667H10C10 24.4333 12.2333 26.6667 15 26.6667C17.7667 26.6667 20 24.4333 20 21.6667Z",
  fill: "#a82227"
}));

const BackButton = ({
  history,
  style,
  isSuccessScreen,
  isCommonPTPropertyScreen,
  getBackPageNumber,
  className: _className = "",
  variant: _variant = "black"
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: `back-btn2 ${_className}`,
    style: style ? style : {},
    onClick: () => {
      !isSuccessScreen ? !isCommonPTPropertyScreen ? (history.goBack(), window.location.href.includes("/citizen/pt/property/new-application/property-type") ? sessionStorage.setItem("docReqScreenByBack", true) : null) : history.go(getBackPageNumber()) : null;
    }
  }, _variant == "black" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ArrowLeft, null), /*#__PURE__*/React.createElement("p", null, t("CS_COMMON_BACK"))) : /*#__PURE__*/React.createElement(ArrowLeftWhite, null));
};
var BackButton$1 = withRouter(BackButton);

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

const Successful = props => {
  var _props$props, _props$props2, _props$props3, _props$props4, _props$props5, _props$props6, _props$props7, _props$props8, _props$props9, _props$props10, _props$props11, _props$props12, _props$props13, _props$props14, _props$props15, _props$props16, _props$props17, _props$props18, _props$props19, _props$props20, _props$props21, _props$props22, _props$props23;
  const {
    t
  } = useTranslation();
  const user_type = Digit.SessionStorage.get("userType");
  return /*#__PURE__*/React.createElement("div", {
    className: user_type === "citizen" ? "success-wrap" : "emp-success-wrap",
    style: props !== null && props !== void 0 && (_props$props = props.props) !== null && _props$props !== void 0 && _props$props.style ? props === null || props === void 0 ? void 0 : (_props$props2 = props.props) === null || _props$props2 === void 0 ? void 0 : _props$props2.style : {}
  }, /*#__PURE__*/React.createElement("header", {
    style: props !== null && props !== void 0 && (_props$props3 = props.props) !== null && _props$props3 !== void 0 && _props$props3.headerStyles ? props === null || props === void 0 ? void 0 : (_props$props4 = props.props) === null || _props$props4 === void 0 ? void 0 : _props$props4.headerStyles : {}
  }, props.props.message), /*#__PURE__*/React.createElement("div", null, props.props.whichSvg === "tick" ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TickMark, {
    fillColor: "green"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), " ") : (props === null || props === void 0 ? void 0 : (_props$props5 = props.props) === null || _props$props5 === void 0 ? void 0 : _props$props5.svg) || /*#__PURE__*/React.createElement(SuccessSvg, null), ((props === null || props === void 0 ? void 0 : (_props$props6 = props.props) === null || _props$props6 === void 0 ? void 0 : _props$props6.complaintNumber) || props.props.info) && /*#__PURE__*/React.createElement("h2", {
    style: props !== null && props !== void 0 && (_props$props7 = props.props) !== null && _props$props7 !== void 0 && _props$props7.infoStyles ? props === null || props === void 0 ? void 0 : (_props$props8 = props.props) === null || _props$props8 === void 0 ? void 0 : _props$props8.infoStyles : {}
  }, props !== null && props !== void 0 && (_props$props9 = props.props) !== null && _props$props9 !== void 0 && _props$props9.complaintNumber ? t("CS_PGR_COMPLAINT_NUMBER") : props.props.info), ((props === null || props === void 0 ? void 0 : (_props$props10 = props.props) === null || _props$props10 === void 0 ? void 0 : _props$props10.complaintNumber) || (props === null || props === void 0 ? void 0 : (_props$props11 = props.props) === null || _props$props11 === void 0 ? void 0 : _props$props11.applicationNumber)) && /*#__PURE__*/React.createElement("p", {
    style: props !== null && props !== void 0 && (_props$props12 = props.props) !== null && _props$props12 !== void 0 && _props$props12.applicationNumberStyles ? props === null || props === void 0 ? void 0 : (_props$props13 = props.props) === null || _props$props13 === void 0 ? void 0 : _props$props13.applicationNumberStyles : {}
  }, props !== null && props !== void 0 && (_props$props14 = props.props) !== null && _props$props14 !== void 0 && _props$props14.complaintNumber ? props === null || props === void 0 ? void 0 : (_props$props15 = props.props) === null || _props$props15 === void 0 ? void 0 : _props$props15.complaintNumber : props === null || props === void 0 ? void 0 : (_props$props16 = props.props) === null || _props$props16 === void 0 ? void 0 : _props$props16.applicationNumber), props !== null && props !== void 0 && (_props$props17 = props.props) !== null && _props$props17 !== void 0 && _props$props17.applicationNumberOne ? /*#__PURE__*/React.createElement("h2", {
    style: props !== null && props !== void 0 && (_props$props18 = props.props) !== null && _props$props18 !== void 0 && _props$props18.infoOneStyles ? props === null || props === void 0 ? void 0 : (_props$props19 = props.props) === null || _props$props19 === void 0 ? void 0 : _props$props19.infoOneStyles : {}
  }, props.props.infoOne) : null, props !== null && props !== void 0 && (_props$props20 = props.props) !== null && _props$props20 !== void 0 && _props$props20.applicationNumberOne ? /*#__PURE__*/React.createElement("p", {
    style: props !== null && props !== void 0 && (_props$props21 = props.props) !== null && _props$props21 !== void 0 && _props$props21.applicationNumberStyles ? props === null || props === void 0 ? void 0 : (_props$props22 = props.props) === null || _props$props22 === void 0 ? void 0 : _props$props22.applicationNumberStyles : {}
  }, props === null || props === void 0 ? void 0 : (_props$props23 = props.props) === null || _props$props23 === void 0 ? void 0 : _props$props23.applicationNumberOne) : null));
};
const Error$1 = props => {
  var _props$props24, _props$props25, _props$props26, _props$props27, _props$props28, _props$props29, _props$props30, _props$props31, _props$props32, _props$props33, _props$props34, _props$props35;
  const {
    t
  } = useTranslation();
  const user_type = Digit.SessionStorage.get("userType");
  return /*#__PURE__*/React.createElement("div", {
    className: user_type === "citizen" ? "error-wrap" : "emp-error-wrap",
    style: props !== null && props !== void 0 && (_props$props24 = props.props) !== null && _props$props24 !== void 0 && _props$props24.style ? props === null || props === void 0 ? void 0 : (_props$props25 = props.props) === null || _props$props25 === void 0 ? void 0 : _props$props25.style : {}
  }, /*#__PURE__*/React.createElement("header", {
    style: props !== null && props !== void 0 && (_props$props26 = props.props) !== null && _props$props26 !== void 0 && _props$props26.headerStyles ? props === null || props === void 0 ? void 0 : (_props$props27 = props.props) === null || _props$props27 === void 0 ? void 0 : _props$props27.headerStyles : {}
  }, props.props.message), /*#__PURE__*/React.createElement(ErrorSvg, null), /*#__PURE__*/React.createElement("h2", {
    style: props !== null && props !== void 0 && (_props$props28 = props.props) !== null && _props$props28 !== void 0 && _props$props28.infoStyles ? props === null || props === void 0 ? void 0 : (_props$props29 = props.props) === null || _props$props29 === void 0 ? void 0 : _props$props29.infoStyles : {}
  }, props !== null && props !== void 0 && (_props$props30 = props.props) !== null && _props$props30 !== void 0 && _props$props30.complaintNumber ? t("CS_PGR_COMPLAINT_NUMBER") : props.props.info), /*#__PURE__*/React.createElement("p", {
    style: props !== null && props !== void 0 && (_props$props31 = props.props) !== null && _props$props31 !== void 0 && _props$props31.applicationNumberStyles ? props === null || props === void 0 ? void 0 : (_props$props32 = props.props) === null || _props$props32 === void 0 ? void 0 : _props$props32.applicationNumberStyles : {}
  }, props !== null && props !== void 0 && (_props$props33 = props.props) !== null && _props$props33 !== void 0 && _props$props33.complaintNumber ? props === null || props === void 0 ? void 0 : (_props$props34 = props.props) === null || _props$props34 === void 0 ? void 0 : _props$props34.complaintNumber : props === null || props === void 0 ? void 0 : (_props$props35 = props.props) === null || _props$props35 === void 0 ? void 0 : _props$props35.applicationNumber));
};
const Banner = props => {
  return props.successful ? /*#__PURE__*/React.createElement(Successful, {
    props: props
  }) : /*#__PURE__*/React.createElement(Error$1, {
    props: props
  });
};
Banner.propTypes = {
  successful: propTypes.bool.isRequired,
  message: propTypes.any.isRequired,
  complaintNumber: propTypes.any
};
Banner.defaultProps = {
  successful: true
};

const Body = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "body-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      position: "relative"
    }
  }, props.children));
};

const LinkButton = props => {
  return /*#__PURE__*/React.createElement("span", {
    className: `card-link cp ${props.className}`,
    onClick: props.onClick,
    style: props.style
  }, props.label);
};
LinkButton.propTypes = {
  label: propTypes.any,
  onClick: propTypes.func
};
LinkButton.defaultProps = {};

const Breadcrumb = props => {
  var _props$crumbs;
  const history = useHistory();
  function isLast(index) {
    return index === props.crumbs.length - 1;
  }
  return /*#__PURE__*/React.createElement("ol", {
    className: "bread-crumb"
  }, props === null || props === void 0 ? void 0 : (_props$crumbs = props.crumbs) === null || _props$crumbs === void 0 ? void 0 : _props$crumbs.map((crumb, ci) => {
    if (!(crumb !== null && crumb !== void 0 && crumb.show)) return;
    if (crumb !== null && crumb !== void 0 && crumb.isBack) return /*#__PURE__*/React.createElement("li", {
      key: ci,
      style: {
        ...props.style
      },
      className: "bread-crumb--item"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        cursor: "pointer"
      },
      onClick: () => window.history.back()
    }, crumb.content));
    return /*#__PURE__*/React.createElement("li", {
      key: ci,
      style: {
        ...(props.style || (crumb === null || crumb === void 0 ? void 0 : crumb.style))
      },
      className: "bread-crumb--item"
    }, isLast(ci) || !(crumb !== null && crumb !== void 0 && crumb.path) || (crumb === null || crumb === void 0 ? void 0 : crumb.isclickable) == false ? /*#__PURE__*/React.createElement("span", {
      style: props !== null && props !== void 0 && props.spanStyle ? {
        ...(props === null || props === void 0 ? void 0 : props.spanStyle),
        color: "#0B0C0C"
      } : {
        color: "#0B0C0C"
      }
    }, crumb.content) : crumb !== null && crumb !== void 0 && crumb.isredirected ? /*#__PURE__*/React.createElement("span", {
      onClick: () => {
        var _crumb$path, _crumb$path2;
        history.push(`${crumb === null || crumb === void 0 ? void 0 : (_crumb$path = crumb.path) === null || _crumb$path === void 0 ? void 0 : _crumb$path.pathname}`, {
          ...(crumb === null || crumb === void 0 ? void 0 : (_crumb$path2 = crumb.path) === null || _crumb$path2 === void 0 ? void 0 : _crumb$path2.state)
        });
      }
    }, /*#__PURE__*/React.createElement(LinkButton, {
      label: crumb.content
    })) : /*#__PURE__*/React.createElement(Link, {
      to: crumb.path
    }, crumb.content));
  }));
};
Breadcrumb.propTypes = {
  crumbs: propTypes.array
};
Breadcrumb.defaultProps = {
  successful: true
};

const BreakLine = ({
  style: _style = {}
}) => {
  return /*#__PURE__*/React.createElement("hr", {
    color: "#d6d5d4",
    className: "break-line",
    style: _style
  });
};

const ButtonSelector = props => {
  let theme = "selector-button-primary";
  switch (props.theme) {
    case "border":
      theme = "selector-button-border";
      break;
    default:
      theme = "selector-button-primary";
      break;
  }
  return /*#__PURE__*/React.createElement("button", {
    className: props.isDisabled ? "selector-button-primary-disabled" : theme,
    type: props.type || "submit",
    form: props.formId,
    onClick: props.onSubmit,
    disabled: props.isDisabled,
    style: props.style ? props.style : null
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      ...(props === null || props === void 0 ? void 0 : props.textStyles),
      ...{
        width: "100%"
      }
    }
  }, props.label));
};
ButtonSelector.propTypes = {
  label: propTypes.string.isRequired,
  theme: propTypes.string,
  onSubmit: propTypes.func
};
ButtonSelector.defaultProps = {
  label: "",
  theme: "",
  onSubmit: undefined
};

const Card = ({
  onClick,
  style,
  children,
  className,
  ReactRef,
  ...props
}) => {
  var _Digit$UserService$ge;
  const {
    pathname
  } = useLocation();
  const classname = Digit.Hooks.fsm.useRouteSubscription(pathname);
  const info = (_Digit$UserService$ge = Digit.UserService.getUser()) === null || _Digit$UserService$ge === void 0 ? void 0 : _Digit$UserService$ge.info;
  const userType = info === null || info === void 0 ? void 0 : info.type;
  const isEmployee = classname === "employee" || userType === "EMPLOYEE";
  return /*#__PURE__*/React.createElement("div", Object.assign({
    className: `${isEmployee ? "employeeCard" : "card"} ${className ? className : ""}`,
    onClick: onClick,
    style: style
  }, props, {
    ref: ReactRef
  }), children);
};

const CardCaption = props => {
  return /*#__PURE__*/React.createElement("label", {
    style: props.style,
    className: "card-caption"
  }, props.children);
};

const CardHeader = props => {
  return /*#__PURE__*/React.createElement("header", {
    className: "card-header",
    style: props.styles ? props.styles : {}
  }, props.children);
};

const CardLabel = props => {
  return /*#__PURE__*/React.createElement("h2", {
    className: `card-label ${props.className}`,
    style: props.style
  }, props.children);
};

const CardLabelDesc = ({
  children,
  style,
  className
}) => {
  return /*#__PURE__*/React.createElement("h2", {
    className: `card-label-desc ${className ? className : ""}`,
    style: style
  }, children);
};

const CardLabelError = props => {
  return /*#__PURE__*/React.createElement("h2", {
    className: `card-label-error ${props !== null && props !== void 0 && props.className ? props === null || props === void 0 ? void 0 : props.className : ""}`,
    style: props.style
  }, props.children);
};

const CardSectionHeader = props => {
  return /*#__PURE__*/React.createElement("header", {
    id: props.id,
    className: "card-section-header",
    style: props.style
  }, props.children);
};

const CardSectionSubText = props => {
  return /*#__PURE__*/React.createElement("header", {
    id: props.id,
    className: "card-section-sub-text",
    style: props.style
  }, props.children);
};

const CardSubHeader = props => {
  const user_type = Digit.SessionStorage.get("user_type") === "employee" ? true : false;
  return /*#__PURE__*/React.createElement("header", {
    className: `${user_type ? "employee-card-sub-header" : "card-sub-header"} ${props !== null && props !== void 0 && props.className ? props === null || props === void 0 ? void 0 : props.className : ""}`,
    style: props.style
  }, props.children);
};

const CardText = props => {
  return /*#__PURE__*/React.createElement("p", {
    className: `card-text ${props.disable && "disabled"} ${props !== null && props !== void 0 && props.className ? props === null || props === void 0 ? void 0 : props.className : ""}`,
    style: props.style
  }, props.children);
};

const CardText$1 = props => {
  return /*#__PURE__*/React.createElement("p", {
    className: "card-text-button"
  }, props.children);
};

const CheckBox = ({
  onChange,
  label,
  value,
  disable,
  ref,
  checked,
  inputRef,
  pageType,
  style,
  index,
  isLabelFirst,
  ...props
}) => {
  const userType = pageType || Digit.SessionStorage.get("userType");
  let wrkflwStyle = props.styles;
  if (isLabelFirst) {
    return /*#__PURE__*/React.createElement("div", {
      className: "checkbox-wrap",
      style: wrkflwStyle ? wrkflwStyle : {}
    }, /*#__PURE__*/React.createElement("p", {
      style: style ? style : null
    }, " ", index + 1, "."), /*#__PURE__*/React.createElement("p", {
      className: "label",
      style: {
        maxWidth: "80%",
        marginLeft: "10px"
      }
    }, label), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", Object.assign({
      type: "checkbox",
      className: userType === "employee" ? "input-emp" : "",
      onChange: onChange,
      style: {
        cursor: "pointer",
        left: "90%"
      },
      value: value || label
    }, props, {
      ref: inputRef,
      disabled: disable,
      checked: checked
    })), /*#__PURE__*/React.createElement("p", {
      className: userType === "employee" ? "custom-checkbox-emp" : "custom-checkbox",
      style: disable ? {
        opacity: 0.5
      } : {
        left: "90%"
      }
    }, /*#__PURE__*/React.createElement(CheckSvg, null))));
  } else {
    return /*#__PURE__*/React.createElement("div", {
      className: "checkbox-wrap",
      style: wrkflwStyle ? wrkflwStyle : {}
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", Object.assign({
      type: "checkbox",
      className: userType === "employee" ? "input-emp" : "",
      onChange: onChange,
      style: {
        cursor: "pointer"
      },
      value: value || label
    }, props, {
      ref: inputRef,
      disabled: disable,
      checked: checked
    })), /*#__PURE__*/React.createElement("p", {
      className: userType === "employee" ? "custom-checkbox-emp" : "custom-checkbox",
      style: disable ? {
        opacity: 0.5
      } : props !== null && props !== void 0 && props.checkboxWidth ? {
        ...(props === null || props === void 0 ? void 0 : props.checkboxWidth)
      } : null
    }, /*#__PURE__*/React.createElement(CheckSvg, null))), /*#__PURE__*/React.createElement("p", {
      className: "label",
      style: style ? style : null
    }, label));
  }
};
CheckBox.propTypes = {
  label: propTypes.string.isRequired,
  onChange: propTypes.func,
  ref: propTypes.func,
  userType: propTypes.string
};
CheckBox.defaultProps = {};

const CitizenHomeCard = ({
  header,
  links: _links = [],
  state,
  Icon,
  Info,
  isInfo: _isInfo = false,
  styles
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "CitizenHomeCard",
    style: styles ? styles : {}
  }, /*#__PURE__*/React.createElement("div", {
    className: "header"
  }, /*#__PURE__*/React.createElement("h2", null, header), /*#__PURE__*/React.createElement(Icon, null)), /*#__PURE__*/React.createElement("div", {
    className: "links"
  }, _links.map((e, i) => {
    var _e$parentModule, _e$parentModule2, _e$parentModule3;
    return /*#__PURE__*/React.createElement("div", {
      className: "linksWrapper"
    }, (e === null || e === void 0 ? void 0 : (_e$parentModule = e.parentModule) === null || _e$parentModule === void 0 ? void 0 : _e$parentModule.toUpperCase()) == "BIRTH" || (e === null || e === void 0 ? void 0 : (_e$parentModule2 = e.parentModule) === null || _e$parentModule2 === void 0 ? void 0 : _e$parentModule2.toUpperCase()) == "DEATH" || (e === null || e === void 0 ? void 0 : (_e$parentModule3 = e.parentModule) === null || _e$parentModule3 === void 0 ? void 0 : _e$parentModule3.toUpperCase()) == "FIRENOC" ? /*#__PURE__*/React.createElement("a", {
      href: e.link
    }, e.i18nKey) : /*#__PURE__*/React.createElement(Link, {
      key: i,
      to: {
        pathname: e.link,
        state: e.state
      }
    }, e.i18nKey));
  })), /*#__PURE__*/React.createElement("div", null, _isInfo ? /*#__PURE__*/React.createElement(Info, null) : null));
};

const CitizenInfoLabel = ({
  info,
  text,
  style,
  textStyle,
  showInfo: _showInfo = true,
  className
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: `info-banner-wrap ${className ? className : ""}`,
    style: style
  }, _showInfo && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InfoBannerIcon, null), /*#__PURE__*/React.createElement("h2", null, info)), /*#__PURE__*/React.createElement("p", {
    style: textStyle
  }, text));
};

const CheckPoint = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: props.isCompleted ? "checkpoint-done" : "checkpoint",
    key: props.keyValue
  }, /*#__PURE__*/React.createElement("h2", null), /*#__PURE__*/React.createElement("header", null, props.label, props.info ? /*#__PURE__*/React.createElement("p", null, props.info) : null, props.customChild ? props.customChild : null));
};
const ConnectingCheckPoints = props => {
  if (props.children && props.children.length >= 1) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, props.children.map((child, index) => {
      return props.children.length === ++index ? /*#__PURE__*/React.createElement("div", {
        key: index
      }, child) : /*#__PURE__*/React.createElement("div", {
        key: index,
        className: "checkpoint-connect-wrap"
      }, child, /*#__PURE__*/React.createElement("div", {
        className: "checkpoint-connect"
      }));
    }));
  } else {
    return null;
  }
};
CheckPoint.propTypes = {
  isCompleted: propTypes.bool,
  key: propTypes.oneOfType([propTypes.string, propTypes.number]),
  label: propTypes.string,
  info: propTypes.string
};
CheckPoint.defaultProps = {
  isCompleted: false,
  key: 0,
  label: "",
  info: ""
};

const CustomButton = ({
  text,
  onClick,
  selected
}) => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    tabIndex: "0",
    type: "button",
    className: selected ? "customBtn-selected" : "customBtn",
    onClick: onClick
  }, text));
};

const DatePicker = props => {
  const dateInp = useRef();
  const selectDate = e => {
    var _props$onChange;
    const date = e.target.value;
    props === null || props === void 0 ? void 0 : (_props$onChange = props.onChange) === null || _props$onChange === void 0 ? void 0 : _props$onChange.call(props, date);
  };
  let addStyle = {};
  if (Digit.UserService.getType() === "citizen") {
    addStyle = {
      maxWidth: "540px"
    };
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      cursor: "pointer",
      ...addStyle,
      ...(props !== null && props !== void 0 && props.style ? props.style : {})
    }
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("input", {
    className: `employee-card-input ${props.disabled ? "disabled" : ""}`,
    style: {
      width: "calc(100%-62px)"
    },
    value: props.date ? props.date : "",
    type: "date",
    ref: dateInp,
    disabled: props.disabled,
    onChange: selectDate,
    defaultValue: props.defaultValue,
    min: props.min,
    max: props.max,
    required: props.isRequired || false
  })));
};
DatePicker.propTypes = {
  disabled: propTypes.bool,
  date: propTypes.any,
  min: propTypes.any,
  max: propTypes.any,
  defaultValue: propTypes.any,
  onChange: propTypes.func
};

const PopUp = ({
  className,
  ...props
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: `popup-wrap ${className}`
  }, props.children);
};

const HeaderBar = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "header-wrap",
    style: props !== null && props !== void 0 && props.style ? props.style : {}
  }, props.start ? /*#__PURE__*/React.createElement("div", {
    className: "header-start"
  }, props.start) : null, props.main ? /*#__PURE__*/React.createElement("div", {
    className: "header-content"
  }, props.main) : null, props.end ? /*#__PURE__*/React.createElement("div", {
    className: "header-end"
  }, props.end) : null);
};
HeaderBar.propTypes = {
  start: propTypes.any,
  main: propTypes.any,
  end: propTypes.any
};
HeaderBar.defaultProps = {
  start: "",
  main: "",
  end: ""
};

const Toast = props => {
  if (props.error) {
    return /*#__PURE__*/React.createElement("div", {
      className: "toast-success",
      style: {
        backgroundColor: "red",
        ...props.style
      }
    }, /*#__PURE__*/React.createElement(ErrorIcon, null), /*#__PURE__*/React.createElement("h2", {
      style: {
        ...props.labelstyle
      }
    }, props.label), props.isDleteBtn ? /*#__PURE__*/React.createElement(DeleteBtn, {
      fill: "none",
      className: "toast-close-btn",
      onClick: props.onClose
    }) : null);
  }
  if (props.warning) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "toast-success",
      style: props !== null && props !== void 0 && props.isWarningButtons ? {
        backgroundColor: "#EA8A3B",
        display: "block",
        ...props.style
      } : {
        backgroundColor: "#EA8A3B",
        ...props.style
      }
    }, !(props !== null && props !== void 0 && props.isWarningButtons) ? /*#__PURE__*/React.createElement("div", {
      className: "toast-success",
      style: {
        backgroundColor: "#EA8A3B",
        ...props.style
      }
    }, /*#__PURE__*/React.createElement(ErrorIcon, null), /*#__PURE__*/React.createElement("h2", {
      style: {
        marginLeft: "10px"
      }
    }, props.label), props.isDleteBtn ? /*#__PURE__*/React.createElement(DeleteBtn, {
      fill: "none",
      className: "toast-close-btn",
      onClick: props.onClose
    }) : null) : /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex"
      }
    }, /*#__PURE__*/React.createElement(ErrorIcon, null), /*#__PURE__*/React.createElement("h2", {
      style: {
        marginLeft: "10px"
      }
    }, props.label), props.isDleteBtn ? /*#__PURE__*/React.createElement(DeleteBtn, {
      fill: "none",
      className: "toast-close-btn",
      onClick: props.onClose
    }) : null), props !== null && props !== void 0 && props.isWarningButtons ? /*#__PURE__*/React.createElement("div", {
      style: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end"
      }
    }, /*#__PURE__*/React.createElement(ButtonSelector, {
      theme: "border",
      label: "NO",
      onSubmit: props.onNo,
      style: {
        marginLeft: "10px"
      }
    }), /*#__PURE__*/React.createElement(ButtonSelector, {
      label: "YES",
      onSubmit: props.onYes,
      style: {
        marginLeft: "10px"
      }
    })) : null));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "toast-success",
    style: {
      ...props.style
    }
  }, /*#__PURE__*/React.createElement(RoundedCheck, null), /*#__PURE__*/React.createElement("h2", null, props.label), /*#__PURE__*/React.createElement(DeleteBtn, {
    fill: "none",
    className: "toast-close-btn",
    onClick: props.onClose
  }));
};
Toast.propTypes = {
  label: propTypes.string,
  onClose: propTypes.func,
  isDleteBtn: propTypes.string
};
Toast.defaultProps = {
  label: "",
  onClose: undefined,
  isDleteBtn: ""
};

const SubmitBar = forwardRef((props, ref) => {
  return /*#__PURE__*/React.createElement("button", Object.assign({
    ref: ref,
    disabled: props.disabled ? true : false,
    className: `${props.disabled ? "submit-bar-disabled" : "submit-bar"} ${props.className ? props.className : ""}`,
    type: props.submit ? "submit" : "button",
    style: {
      ...props.style
    },
    onClick: props.onSubmit
  }, props.form ? {
    form: props.form
  } : {}), /*#__PURE__*/React.createElement("header", null, props.label));
});
SubmitBar.propTypes = {
  submit: propTypes.any,
  style: propTypes.object,
  label: propTypes.string,
  onSubmit: propTypes.func
};
SubmitBar.defaultProps = {};

const Modal = ({
  headerBarMain,
  headerBarEnd,
  popupStyles,
  children,
  actionCancelLabel,
  actionCancelOnSubmit,
  actionSaveLabel,
  actionSaveOnSubmit,
  actionSingleLabel,
  actionSingleSubmit,
  error,
  setError,
  formId,
  isDisabled,
  hideSubmit,
  style: _style = {},
  popupModuleMianStyles,
  headerBarMainStyle,
  isOBPSFlow: _isOBPSFlow = false,
  popupModuleActionBarStyles: _popupModuleActionBarStyles = {}
}) => {
  const mobileView = Digit.Utils.browser.isMobile() ? true : false;
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);
  return /*#__PURE__*/React.createElement(PopUp, null, /*#__PURE__*/React.createElement("div", {
    className: "popup-module",
    style: popupStyles
  }, /*#__PURE__*/React.createElement(HeaderBar, {
    main: headerBarMain,
    end: headerBarEnd,
    style: headerBarMainStyle ? headerBarMainStyle : {}
  }), /*#__PURE__*/React.createElement("div", {
    className: "popup-module-main",
    style: popupModuleMianStyles ? popupModuleMianStyles : {}
  }, children, /*#__PURE__*/React.createElement("div", {
    className: "popup-module-action-bar",
    style: _isOBPSFlow ? !mobileView ? {
      marginRight: "18px"
    } : {
      position: "absolute",
      bottom: "5%",
      right: "10%",
      left: window.location.href.includes("employee") ? "0%" : "7%"
    } : _popupModuleActionBarStyles
  }, actionCancelLabel ? /*#__PURE__*/React.createElement(ButtonSelector, {
    theme: "border",
    label: actionCancelLabel,
    onSubmit: actionCancelOnSubmit,
    style: _style
  }) : null, !hideSubmit ? /*#__PURE__*/React.createElement(ButtonSelector, {
    label: actionSaveLabel,
    onSubmit: actionSaveOnSubmit,
    formId: formId,
    isDisabled: isDisabled,
    style: _style
  }) : null, actionSingleLabel ? /*#__PURE__*/React.createElement(ActionBar, {
    style: {
      position: mobileView ? "absolute" : "relative",
      boxShadow: "none",
      minWidth: "240px",
      maxWidth: "360px",
      margin: "16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(SubmitBar, {
    style: {
      width: "100%"
    },
    label: actionSingleLabel,
    onSubmit: actionSingleSubmit
  }))) : null))), error && /*#__PURE__*/React.createElement(Toast, {
    label: error,
    onClose: () => setError(null),
    error: true
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

function addMonths(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var amount = toInteger(dirtyAmount);
  if (isNaN(amount)) {
    return new Date(NaN);
  }
  if (!amount) {
    return date;
  }
  var dayOfMonth = date.getDate();
  var endOfDesiredMonth = new Date(date.getTime());
  endOfDesiredMonth.setMonth(date.getMonth() + amount + 1, 0);
  var daysInMonth = endOfDesiredMonth.getDate();
  if (dayOfMonth >= daysInMonth) {
    return endOfDesiredMonth;
  } else {
    date.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
    return date;
  }
}

function addMilliseconds(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var timestamp = toDate(dirtyDate).getTime();
  var amount = toInteger(dirtyAmount);
  return new Date(timestamp + amount);
}

var MILLISECONDS_IN_HOUR = 3600000;
function addHours(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMilliseconds(dirtyDate, amount * MILLISECONDS_IN_HOUR);
}

function startOfWeek(dirtyDate, dirtyOptions) {
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
  var day = date.getDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

function getTimezoneOffsetInMilliseconds(date) {
  var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
  utcDate.setUTCFullYear(date.getFullYear());
  return date.getTime() - utcDate.getTime();
}

function startOfDay(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}

var MILLISECONDS_IN_MINUTE = 60000;
function addMinutes(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMilliseconds(dirtyDate, amount * MILLISECONDS_IN_MINUTE);
}

function addSeconds(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMilliseconds(dirtyDate, amount * 1000);
}

function addYears(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMonths(dirtyDate, amount * 12);
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

function startOfQuarter(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var currentMonth = date.getMonth();
  var month = currentMonth - currentMonth % 3;
  date.setMonth(month, 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

function startOfMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
}

function startOfYear(dirtyDate) {
  requiredArgs(1, arguments);
  var cleanDate = toDate(dirtyDate);
  var date = new Date(0);
  date.setFullYear(cleanDate.getFullYear(), 0, 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

function endOfYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getFullYear();
  date.setFullYear(year + 1, 0, 0);
  date.setHours(23, 59, 59, 999);
  return date;
}

function endOfWeek(dirtyDate, dirtyOptions) {
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
  var day = date.getDay();
  var diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
  date.setDate(date.getDate() + diff);
  date.setHours(23, 59, 59, 999);
  return date;
}

function endOfQuarter(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var currentMonth = date.getMonth();
  var month = currentMonth - currentMonth % 3 + 3;
  date.setMonth(month, 0);
  date.setHours(23, 59, 59, 999);
  return date;
}

function endOfToday() {
  return endOfDay(Date.now());
}

function endOfYesterday() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var day = now.getDate();
  var date = new Date(0);
  date.setFullYear(year, month, day - 1);
  date.setHours(23, 59, 59, 999);
  return date;
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

function startOfToday() {
  return startOfDay(Date.now());
}

function startOfYesterday() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var day = now.getDate();
  var date = new Date(0);
  date.setFullYear(year, month, day - 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

function subYears(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addYears(dirtyDate, -amount);
}

function isEndDateFocused(focusNumber) {
  return focusNumber === 1;
}
function isStartDateFocused(focusNumber) {
  return focusNumber === 0;
}
const DateRange = ({
  values,
  onFilterChange,
  t,
  labelClass
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [focusedRange, setFocusedRange] = useState([0, 0]);
  const [selectionRange, setSelectionRange] = useState({
    ...values,
    startDate: values === null || values === void 0 ? void 0 : values.startDate,
    endDate: values === null || values === void 0 ? void 0 : values.endDate
  });
  const wrapperRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = event => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);
  useEffect(() => {
    if (!isModalOpen && (selectionRange === null || selectionRange === void 0 ? void 0 : selectionRange.startDate) instanceof Date && (selectionRange === null || selectionRange === void 0 ? void 0 : selectionRange.endDate) instanceof Date) {
      const startDate = selectionRange === null || selectionRange === void 0 ? void 0 : selectionRange.startDate;
      const endDate = selectionRange === null || selectionRange === void 0 ? void 0 : selectionRange.endDate;
      const duration = getDuration(selectionRange === null || selectionRange === void 0 ? void 0 : selectionRange.startDate, selectionRange === null || selectionRange === void 0 ? void 0 : selectionRange.endDate);
      const title = `${format(selectionRange === null || selectionRange === void 0 ? void 0 : selectionRange.startDate, "MMM d, yy")} - ${format(selectionRange === null || selectionRange === void 0 ? void 0 : selectionRange.endDate, "MMM d, yy")}`;
      onFilterChange({
        range: {
          startDate,
          endDate,
          duration,
          title
        },
        requestDate: {
          startDate,
          endDate,
          duration,
          title
        }
      });
    }
  }, [selectionRange, isModalOpen]);
  const staticRanges = useMemo(() => {
    return createStaticRanges([{
      label: t("DSS_TODAY"),
      range: () => ({
        startDate: startOfToday(),
        endDate: endOfToday()
      })
    }, {
      label: t("DSS_YESTERDAY"),
      range: () => ({
        startDate: startOfYesterday(),
        endDate: endOfYesterday()
      })
    }, {
      label: t("DSS_THIS_WEEK"),
      range: () => ({
        startDate: startOfWeek(new Date()),
        endDate: endOfWeek(new Date())
      })
    }, {
      label: t('DSS_THIS_MONTH'),
      range: () => ({
        startDate: startOfMonth(new Date()),
        endDate: endOfMonth(new Date())
      })
    }, {
      label: t('DSS_THIS_QUARTER'),
      range: () => ({
        startDate: startOfQuarter(new Date()),
        endDate: endOfQuarter(new Date())
      })
    }, {
      label: t('DSS_PREVIOUS_YEAR'),
      range: () => ({
        startDate: subYears(addMonths(startOfYear(new Date()), 3), 1),
        endDate: subYears(addMonths(endOfYear(new Date()), 3), 1)
      })
    }, {
      label: t('DSS_THIS_YEAR'),
      range: () => ({
        startDate: addMonths(startOfYear(new Date()), 3),
        endDate: addMonths(endOfYear(new Date()), 3)
      })
    }]);
  }, []);
  const getDuration = (startDate, endDate) => {
    let noOfDays = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24);
    if (noOfDays > 91) {
      return "month";
    }
    if (noOfDays < 90 && noOfDays >= 14) {
      return "week";
    }
    if (noOfDays <= 14) {
      return "day";
    }
  };
  const handleSelect = ranges => {
    const {
      range1: selection
    } = ranges;
    const {
      startDate,
      endDate,
      title,
      duration
    } = selection;
    if (isStartDateFocused(focusedRange[1])) {
      setSelectionRange(selection);
    }
    if (isEndDateFocused(focusedRange[1])) {
      setSelectionRange({
        title,
        duration,
        startDate,
        endDate: addSeconds(addMinutes(addHours(endDate, 23), 59), 59)
      });
      setIsModalOpen(false);
    }
  };
  return /*#__PURE__*/React.createElement(Fragment$1, null, /*#__PURE__*/React.createElement("div", {
    className: "filter-label"
  }, t(`ES_DSS_DATE_RANGE`)), /*#__PURE__*/React.createElement("div", {
    className: "employee-select-wrap",
    ref: wrapperRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "select"
  }, /*#__PURE__*/React.createElement("input", {
    className: "employee-select-wrap--elipses",
    type: "text",
    value: values !== null && values !== void 0 && values.title ? `${values === null || values === void 0 ? void 0 : values.title}` : "",
    readOnly: true
  }), /*#__PURE__*/React.createElement(Calender, {
    className: "cursorPointer",
    onClick: () => setIsModalOpen(prevState => !prevState)
  })), isModalOpen && /*#__PURE__*/React.createElement("div", {
    className: "options-card",
    style: {
      overflow: "visible",
      width: "unset",
      maxWidth: "unset"
    }
  }, /*#__PURE__*/React.createElement(DateRangePicker, {
    className: "pickerShadow",
    focusedRange: focusedRange,
    ranges: [selectionRange],
    rangeColors: ["#9E9E9E"],
    onChange: handleSelect,
    onRangeFocusChange: setFocusedRange,
    retainEndDateOnFirstSelection: true,
    showSelectionPreview: true,
    staticRanges: staticRanges,
    inputRanges: []
  }))));
};

const DateWrap = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "date-wrap"
  }, /*#__PURE__*/React.createElement(Calender, null), /*#__PURE__*/React.createElement("p", null, props.date));
};
DateWrap.propTypes = {
  date: propTypes.any
};
DateWrap.defaultProps = {
  date: 0
};

const ImageOrPDFIcon = ({
  source,
  index,
  last: _last = false,
  onClick
}) => {
  return Digit.Utils.getFileTypeFromFileStoreURL(source) === "pdf" ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      alignContent: "center"
    }
  }, /*#__PURE__*/React.createElement("a", {
    target: "_blank",
    href: source,
    style: {
      minWidth: "100px",
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
  }, /*#__PURE__*/React.createElement(PDFSvg, {
    style: {
      background: "#f6f6f6",
      padding: "8px",
      width: "100px"
    },
    width: "100px",
    height: "100px",
    minWidth: "100px"
  })))) : /*#__PURE__*/React.createElement("img", Object.assign({
    key: index,
    src: source
  }, _last ? {
    className: "last"
  } : {}, {
    alt: "issue thumbnail",
    onClick: () => onClick(source, index)
  }));
};
const DisplayPhotos = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "photos-wrap"
  }, props.srcs.map((source, index) => {
    return /*#__PURE__*/React.createElement(ImageOrPDFIcon, Object.assign({}, {
      source,
      index,
      ...props
    }, {
      last: ++index !== props.srcs.length ? false : true
    }));
  }));
};
DisplayPhotos.propTypes = {
  srcs: propTypes.array,
  onClick: propTypes.func
};
DisplayPhotos.defaultProps = {
  srcs: []
};

const TextField = props => {
  const [value, setValue] = useState(props.selectedVal ? props.selectedVal : "");
  useEffect(() => {
    if (!props.keepNull) {
      if (props.selectedVal) setValue(props.selectedVal);else {
        setValue("");
        props.setFilter("");
      }
    } else setValue("");
  }, [props.selectedVal, props.forceSet]);
  function inputChange(e) {
    if (props.freeze) return;
    setValue(e.target.value);
    props.setFilter(e.target.value);
  }
  function broadcastToOpen() {
    if (!props.disable) {
      props.dropdownDisplay(true);
    }
  }
  function broadcastToClose() {
    props.dropdownDisplay(false);
  }
  const keyChange = e => {
    if (e.key == "ArrowDown") {
      props.setOptionIndex(state => state + 1 == props.addProps.length ? 0 : state + 1);
      if (props.addProps.currentIndex + 1 == props.addProps.length) {
        var _e$target, _e$target$parentEleme, _e$target$parentEleme2, _e$target$parentEleme3, _e$target$parentEleme4, _e$target$parentEleme5;
        e === null || e === void 0 ? void 0 : (_e$target = e.target) === null || _e$target === void 0 ? void 0 : (_e$target$parentEleme = _e$target.parentElement) === null || _e$target$parentEleme === void 0 ? void 0 : (_e$target$parentEleme2 = _e$target$parentEleme.parentElement) === null || _e$target$parentEleme2 === void 0 ? void 0 : (_e$target$parentEleme3 = _e$target$parentEleme2.children) === null || _e$target$parentEleme3 === void 0 ? void 0 : (_e$target$parentEleme4 = _e$target$parentEleme3.namedItem("jk-dropdown-unique")) === null || _e$target$parentEleme4 === void 0 ? void 0 : (_e$target$parentEleme5 = _e$target$parentEleme4.scrollTo) === null || _e$target$parentEleme5 === void 0 ? void 0 : _e$target$parentEleme5.call(_e$target$parentEleme4, 0, 0);
      } else {
        var _props$addProps, _e$target2, _e$target2$parentElem, _e$target2$parentElem2, _e$target2$parentElem3, _e$target2$parentElem4, _e$target2$parentElem5;
        (props === null || props === void 0 ? void 0 : (_props$addProps = props.addProps) === null || _props$addProps === void 0 ? void 0 : _props$addProps.currentIndex) > 2 && (e === null || e === void 0 ? void 0 : (_e$target2 = e.target) === null || _e$target2 === void 0 ? void 0 : (_e$target2$parentElem = _e$target2.parentElement) === null || _e$target2$parentElem === void 0 ? void 0 : (_e$target2$parentElem2 = _e$target2$parentElem.parentElement) === null || _e$target2$parentElem2 === void 0 ? void 0 : (_e$target2$parentElem3 = _e$target2$parentElem2.children) === null || _e$target2$parentElem3 === void 0 ? void 0 : (_e$target2$parentElem4 = _e$target2$parentElem3.namedItem("jk-dropdown-unique")) === null || _e$target2$parentElem4 === void 0 ? void 0 : (_e$target2$parentElem5 = _e$target2$parentElem4.scrollBy) === null || _e$target2$parentElem5 === void 0 ? void 0 : _e$target2$parentElem5.call(_e$target2$parentElem4, 0, 45));
      }
      e.preventDefault();
    } else if (e.key == "ArrowUp") {
      props.setOptionIndex(state => state !== 0 ? state - 1 : props.addProps.length - 1);
      if (props.addProps.currentIndex == 0) {
        var _e$target3, _e$target3$parentElem, _e$target3$parentElem2, _e$target3$parentElem3, _e$target3$parentElem4, _e$target3$parentElem5;
        e === null || e === void 0 ? void 0 : (_e$target3 = e.target) === null || _e$target3 === void 0 ? void 0 : (_e$target3$parentElem = _e$target3.parentElement) === null || _e$target3$parentElem === void 0 ? void 0 : (_e$target3$parentElem2 = _e$target3$parentElem.parentElement) === null || _e$target3$parentElem2 === void 0 ? void 0 : (_e$target3$parentElem3 = _e$target3$parentElem2.children) === null || _e$target3$parentElem3 === void 0 ? void 0 : (_e$target3$parentElem4 = _e$target3$parentElem3.namedItem("jk-dropdown-unique")) === null || _e$target3$parentElem4 === void 0 ? void 0 : (_e$target3$parentElem5 = _e$target3$parentElem4.scrollTo) === null || _e$target3$parentElem5 === void 0 ? void 0 : _e$target3$parentElem5.call(_e$target3$parentElem4, 100000, 100000);
      } else {
        var _props$addProps2, _e$target4, _e$target4$parentElem, _e$target4$parentElem2, _e$target4$parentElem3, _e$target4$parentElem4, _e$target4$parentElem5;
        (props === null || props === void 0 ? void 0 : (_props$addProps2 = props.addProps) === null || _props$addProps2 === void 0 ? void 0 : _props$addProps2.currentIndex) > 2 && (e === null || e === void 0 ? void 0 : (_e$target4 = e.target) === null || _e$target4 === void 0 ? void 0 : (_e$target4$parentElem = _e$target4.parentElement) === null || _e$target4$parentElem === void 0 ? void 0 : (_e$target4$parentElem2 = _e$target4$parentElem.parentElement) === null || _e$target4$parentElem2 === void 0 ? void 0 : (_e$target4$parentElem3 = _e$target4$parentElem2.children) === null || _e$target4$parentElem3 === void 0 ? void 0 : (_e$target4$parentElem4 = _e$target4$parentElem3.namedItem("jk-dropdown-unique")) === null || _e$target4$parentElem4 === void 0 ? void 0 : (_e$target4$parentElem5 = _e$target4$parentElem4.scrollBy) === null || _e$target4$parentElem5 === void 0 ? void 0 : _e$target4$parentElem5.call(_e$target4$parentElem4, 0, -45));
      }
      e.preventDefault();
    } else if (e.key == "Enter") {
      props.addProps.selectOption(props.addProps.currentIndex);
    }
  };
  return /*#__PURE__*/React.createElement("input", {
    ref: props.inputRef,
    className: `employee-select-wrap--elipses ${props.disable && "disabled"}`,
    type: "text",
    value: value,
    onChange: inputChange,
    onClick: props.onClick,
    onFocus: broadcastToOpen,
    onBlur: e => {
      var _props$onBlur;
      broadcastToClose();
      props === null || props === void 0 ? void 0 : (_props$onBlur = props.onBlur) === null || _props$onBlur === void 0 ? void 0 : _props$onBlur.call(props, e);
      if (props.selectedVal !== props.filterVal) {
        setTimeout(() => {
          props.setforceSet(val => val + 1);
        }, 1000);
      }
    },
    onKeyDown: keyChange,
    readOnly: props.disable,
    autoFocus: props.autoFocus,
    placeholder: props.placeholder,
    autoComplete: "off",
    style: {
      ...props.style,
      zIndex: "auto"
    }
  });
};
const translateDummy = text => {
  return text;
};
const Dropdown = props => {
  var _props$option;
  const user_type = Digit.SessionStorage.get("userType");
  const [dropdownStatus, setDropdownStatus] = useState(false);
  const [selectedOption, setSelectedOption] = useState(props.selected ? props.selected : null);
  const [filterVal, setFilterVal] = useState("");
  const [forceSet, setforceSet] = useState(0);
  const [optionIndex, setOptionIndex] = useState(-1);
  const optionRef = useRef(null);
  const hasCustomSelector = props.customSelector ? true : false;
  const t = props.t || translateDummy;
  useEffect(() => {
    setSelectedOption(props.selected);
  }, [props.selected]);
  function dropdownSwitch() {
    if (!props.disable) {
      var _props$onBlur2;
      var current = dropdownStatus;
      if (!current) {
        document.addEventListener("mousedown", handleClick, false);
      }
      setDropdownStatus(!current);
      props === null || props === void 0 ? void 0 : (_props$onBlur2 = props.onBlur) === null || _props$onBlur2 === void 0 ? void 0 : _props$onBlur2.call(props);
    }
  }
  function handleClick(e) {
    if (!optionRef.current || !optionRef.current.contains(e.target)) {
      document.removeEventListener("mousedown", handleClick, false);
      setDropdownStatus(false);
    }
  }
  function dropdownOn(val) {
    const waitForOptions = () => setTimeout(() => setDropdownStatus(val), 500);
    const timerId = waitForOptions();
    return () => {
      clearTimeout(timerId);
    };
  }
  function onSelect(val) {
    if (val !== selectedOption || props.allowMultiselect) {
      props.select(val);
      setSelectedOption(val);
      setDropdownStatus(false);
    } else {
      setSelectedOption(val);
      setforceSet(forceSet + 1);
    }
  }
  function setFilter(val) {
    setFilterVal(val);
  }
  let filteredOption = props.option && ((_props$option = props.option) === null || _props$option === void 0 ? void 0 : _props$option.filter(option => {
    var _t, _t$toUpperCase;
    return ((_t = t(option[props.optionKey])) === null || _t === void 0 ? void 0 : (_t$toUpperCase = _t.toUpperCase()) === null || _t$toUpperCase === void 0 ? void 0 : _t$toUpperCase.indexOf(filterVal === null || filterVal === void 0 ? void 0 : filterVal.toUpperCase())) > -1;
  })) || [];
  function selectOption(ind) {
    onSelect(filteredOption[ind]);
  }
  if (props.isBPAREG && selectedOption) {
    var _props$option2, _props$option2$filter;
    let isSelectedSameAsOptions = ((_props$option2 = props.option) === null || _props$option2 === void 0 ? void 0 : (_props$option2$filter = _props$option2.filter(ob => (ob === null || ob === void 0 ? void 0 : ob.code) === (selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.code))) === null || _props$option2$filter === void 0 ? void 0 : _props$option2$filter.length) > 0;
    if (!isSelectedSameAsOptions) setSelectedOption(null);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: `${user_type === "employee" ? "employee-select-wrap" : "select-wrap"} ${props !== null && props !== void 0 && props.className ? props === null || props === void 0 ? void 0 : props.className : ""}`,
    style: {
      ...props.style
    }
  }, hasCustomSelector && /*#__PURE__*/React.createElement("div", {
    className: props.showArrow ? "cp flex-right column-gap-5" : "cp",
    onClick: dropdownSwitch
  }, props.customSelector, props.showArrow && /*#__PURE__*/React.createElement(ArrowDown, {
    onClick: dropdownSwitch,
    className: props.disable && "disabled"
  })), !hasCustomSelector && /*#__PURE__*/React.createElement("div", {
    className: `${dropdownStatus ? "select-active" : "select"} ${props.disable && "disabled"}`,
    style: props.errorStyle ? {
      border: "1px solid red"
    } : {}
  }, /*#__PURE__*/React.createElement(TextField, {
    autoComplete: props.autoComplete,
    setFilter: setFilter,
    forceSet: forceSet,
    setforceSet: setforceSet,
    setOptionIndex: setOptionIndex,
    keepNull: props.keepNull,
    selectedVal: selectedOption ? props.t ? props.isMultiSelectEmp ? `${selectedOption} ${t("BPA_SELECTED_TEXT")}` : props.t(props.optionKey ? selectedOption[props.optionKey] : selectedOption) : props.optionKey ? selectedOption[props.optionKey] : selectedOption : null,
    filterVal: filterVal,
    addProps: {
      length: filteredOption.length,
      currentIndex: optionIndex,
      selectOption: selectOption
    },
    dropdownDisplay: dropdownOn,
    handleClick: handleClick,
    disable: props.disable,
    freeze: props.freeze ? true : false,
    autoFocus: props.autoFocus,
    placeholder: props.placeholder,
    onBlur: props === null || props === void 0 ? void 0 : props.onBlur,
    inputRef: props.ref
  }), /*#__PURE__*/React.createElement(ArrowDown, {
    onClick: dropdownSwitch,
    className: "cp",
    disable: props.disable
  })), dropdownStatus ? props.optionKey ? /*#__PURE__*/React.createElement("div", {
    id: "jk-dropdown-unique",
    className: `${hasCustomSelector ? "margin-top-10 display: table" : ""} options-card`,
    style: {
      ...props.optionCardStyles
    },
    ref: optionRef
  }, filteredOption && filteredOption.map((option, index) => {
    return /*#__PURE__*/React.createElement("div", {
      className: `cp profile-dropdown--item display: flex `,
      style: index === optionIndex ? {
        opacity: 1,
        backgroundColor: "rgba(238, 238, 238, var(--bg-opacity))"
      } : {},
      key: index,
      onClick: () => onSelect(option)
    }, option.icon && /*#__PURE__*/React.createElement("span", {
      className: "icon"
    }, " ", option.icon, " "), props.isPropertyAssess ? /*#__PURE__*/React.createElement("div", null, props.t ? props.t(option[props.optionKey]) : option[props.optionKey]) : /*#__PURE__*/React.createElement("span", null, " ", props.t ? props.t(option[props.optionKey]) : option[props.optionKey]));
  }), filteredOption && filteredOption.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: `cp profile-dropdown--item display: flex `,
    key: "-1",
    onClick: () => {}
  }, /*#__PURE__*/React.createElement("span", null, " ", props.t ? props.t("CMN_NOOPTION") : "CMN_NOOPTION"))) : /*#__PURE__*/React.createElement("div", {
    className: "options-card",
    style: {
      ...props.optionCardStyles,
      overflow: "scroll",
      maxHeight: "350px"
    },
    id: "jk-dropdown-unique",
    ref: optionRef
  }, props.option.filter(option => (option === null || option === void 0 ? void 0 : option.toUpperCase().indexOf(filterVal === null || filterVal === void 0 ? void 0 : filterVal.toUpperCase())) > -1).map((option, index) => {
    return /*#__PURE__*/React.createElement("p", {
      key: index,
      style: index === optionIndex ? {
        opacity: 1,
        backgroundColor: "rgba(238, 238, 238, var(--bg-opacity))"
      } : {},
      onClick: () => onSelect(option)
    }, option);
  })) : null);
};
Dropdown.propTypes = {
  customSelector: propTypes.any,
  showArrow: propTypes.bool,
  selected: propTypes.any,
  style: propTypes.object,
  option: propTypes.array,
  optionKey: propTypes.any,
  select: propTypes.any,
  t: propTypes.func
};
Dropdown.defaultProps = {
  customSelector: null,
  showArrow: true
};

const Menu = ({
  menu,
  displayKey,
  onSelect
}) => /*#__PURE__*/React.createElement("div", {
  className: "menu"
}, menu.map((item, index) => /*#__PURE__*/React.createElement("div", {
  className: "item",
  onClick: () => onSelect(item),
  key: index
}, item.icon, /*#__PURE__*/React.createElement("span", null, item[displayKey]))));
const EllipsisMenu = ({
  menuItems,
  displayKey,
  onSelect
}) => {
  const menuRef = useRef();
  const [active, setActive] = useState(false);
  Digit.Hooks.useClickOutside(menuRef, () => setActive(false), active);
  function onItemSelect(item) {
    setActive(false);
    onSelect(item);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "ellipsis-menu-wrap",
    ref: menuRef
  }, /*#__PURE__*/React.createElement(Ellipsis, {
    className: "cursorPointer",
    onClick: () => setActive(true)
  }), active ? /*#__PURE__*/React.createElement(Menu, {
    menu: menuItems,
    displayKey: displayKey,
    onSelect: onItemSelect
  }) : null);
};

const EmployeeAppContainer = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "employee-app-container"
  }, props.children);
};

const EmployeeModuleCard = ({
  Icon,
  moduleName,
  kpis: _kpis = [],
  links: _links = [],
  isCitizen: _isCitizen = false,
  className,
  styles,
  FsmHideCount
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: className ? "employeeCard card-home customEmployeeCard" : "employeeCard card-home customEmployeeCard",
    style: className ? {} : styles
  }, /*#__PURE__*/React.createElement("div", {
    className: "employeeCustomCard",
    style: {
      width: "100%",
      height: "85%",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-employee-card"
  }, moduleName), /*#__PURE__*/React.createElement("span", {
    className: "logo-removeBorderRadiusLogo",
    style: {
      position: "absolute",
      right: "10%",
      top: "10%"
    }
  }, Icon), /*#__PURE__*/React.createElement("div", {
    className: "employee-card-banner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "body",
    style: {
      margin: "0px",
      padding: "0px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "30%",
      height: "50px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "icon-banner-employee",
    style: {
      position: "absolute",
      left: "10%",
      top: "10%",
      borderRadius: "5px",
      boxShadow: "5px 5px 5px 0px #e3e4e3"
    }
  }, Icon)), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "70%"
    }
  }, _kpis.length !== 0 && /*#__PURE__*/React.createElement("div", {
    className: "flex-fit",
    style: _isCitizen ? {
      paddingLeft: "17px"
    } : {}
  }, _kpis.map(({
    count,
    label,
    link
  }, index) => /*#__PURE__*/React.createElement("div", {
    className: "card-count",
    key: index,
    style: {
      display: "flex",
      width: "100%",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      display: "flex",
      flexDirection: "column-reverse",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, link ? /*#__PURE__*/React.createElement(Link, {
    to: link,
    className: "employeeTotalLink"
  }, label) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#ae1e28",
      fontSize: "18px",
      fontFamily: "sans-serif",
      fontWeight: "bold"
    }
  }, count || "-")))))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "links-wrapper",
    style: {
      width: "100%",
      display: "flex",
      fontSize: "0.8rem",
      paddingLeft: "10px",
      flexWrap: "wrap",
      flexDirection: "row",
      paddingTop: "10px"
    }
  }, _links.map(({
    count,
    label,
    link
  }, index) => /*#__PURE__*/React.createElement("div", {
    className: "link",
    key: index,
    style: {
      paddingLeft: "5px",
      color: "#a1a5b7",
      display: "flex"
    }
  }, link ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex"
    }
  }, " ", /*#__PURE__*/React.createElement(Link, {
    to: link
  }, " ", label, " "), "  ", /*#__PURE__*/React.createElement("span", null, "|"), " ") : null)))))))), /*#__PURE__*/React.createElement("div", null));
};
const ModuleCardFullWidth = ({
  moduleName,
  links: _links2 = [],
  isCitizen: _isCitizen2 = false,
  className,
  styles,
  headerStyle,
  subHeader,
  subHeaderLink
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: className ? className : "employeeCard card-home customEmployeeCard home-action-cards",
    style: styles ? styles : {}
  }, /*#__PURE__*/React.createElement("div", {
    className: "complaint-links-container",
    style: {
      padding: "10px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "header",
    style: _isCitizen2 ? {
      padding: "0px"
    } : headerStyle
  }, /*#__PURE__*/React.createElement("span", {
    className: "text removeHeight"
  }, moduleName), /*#__PURE__*/React.createElement("span", {
    className: "link"
  }, /*#__PURE__*/React.createElement("a", {
    href: subHeaderLink
  }, /*#__PURE__*/React.createElement("span", {
    className: "inbox-total",
    style: {
      display: "flex",
      alignItems: "center",
      color: "#a82227",
      fontWeight: "bold"
    }
  }, subHeader || "-", /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "10px"
    }
  }, " ", /*#__PURE__*/React.createElement(ArrowRightInbox, null)))))), /*#__PURE__*/React.createElement("div", {
    className: "body",
    style: {
      margin: "0px",
      padding: "0px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "links-wrapper",
    style: {
      width: "100%",
      display: "flex",
      flexWrap: "wrap"
    }
  }, _links2.map(({
    count,
    label,
    link
  }, index) => /*#__PURE__*/React.createElement("span", {
    className: "link full-employee-card-link",
    key: index
  }, link ? link !== null && link !== void 0 && link.includes('digit-ui/') ? /*#__PURE__*/React.createElement(Link, {
    to: link
  }, label) : /*#__PURE__*/React.createElement("a", {
    href: link
  }, label) : null))))));
};

const GreyOutText = props => /*#__PURE__*/React.createElement("div", {
  className: "grey"
}, props.children);

const Hamburger = ({
  handleClick,
  color
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    marginRight: "10px"
  },
  className: "hamburger-span",
  onClick: handleClick
}, /*#__PURE__*/React.createElement(HamburgerIcon, {
  className: "hamburger",
  color: color
}));

const Header = props => {
  return /*#__PURE__*/React.createElement("header", {
    className: "h1",
    style: props.styles ? {
      ...props.styles,
      fontSize: "32px",
      fontFamily: "Roboto Condensed"
    } : {
      fontSize: "32px",
      fontFamily: "Roboto Condensed"
    }
  }, props.children);
};

const HomeLink = ({
  to,
  children
}) => /*#__PURE__*/React.createElement("div", {
  className: "home-link"
}, /*#__PURE__*/React.createElement(Link, {
  to: to
}, children));
HomeLink.propTypes = {
  to: propTypes.oneOfType([propTypes.string, propTypes.object]),
  children: propTypes.string
};
HomeLink.defaultProps = {
  to: "#",
  children: "Link"
};

const MiniUpload = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "upload-img-container"
  }, /*#__PURE__*/React.createElement(CameraSvg, {
    className: "upload-camera-img"
  }), /*#__PURE__*/React.createElement("input", {
    type: "file",
    id: "miniupload",
    accept: "image/*",
    onChange: e => props.onUpload(e)
  }));
};
const UploadImages = props => {
  if (props.thumbnails && props.thumbnails.length > 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "multi-upload-wrap"
    }, props.thumbnails.map((thumbnail, index) => {
      return /*#__PURE__*/React.createElement("div", {
        key: index
      }, /*#__PURE__*/React.createElement(DeleteBtn, {
        onClick: () => props.onDelete(thumbnail),
        className: "delete",
        fill: "#d4351c"
      }), /*#__PURE__*/React.createElement("img", {
        src: thumbnail,
        alt: "uploaded thumbnail"
      }));
    }), props.thumbnails.length < 3 ? /*#__PURE__*/React.createElement(MiniUpload, {
      onUpload: props.onUpload
    }) : null);
  } else {
    return /*#__PURE__*/React.createElement("div", {
      className: "upload-wrap",
      onClick: e => props.onUpload(e)
    }, /*#__PURE__*/React.createElement(CameraSvg, null), /*#__PURE__*/React.createElement("input", {
      type: "file",
      id: "upload",
      accept: "image/*",
      onChange: e => props.onUpload(e)
    }));
  }
};
UploadImages.propTypes = {
  thumbnail: propTypes.array,
  onUpload: propTypes.func
};
UploadImages.defaultProps = {
  thumbnail: [],
  onUpload: undefined
};

const ImageUploadHandler = props => {
  const [image, setImage] = useState(null);
  const [uploadedImagesThumbs, setUploadedImagesThumbs] = useState(null);
  const [uploadedImagesIds, setUploadedImagesIds] = useState(props.uploadedImages);
  const [rerender, setRerender] = useState(1);
  const [imageFile, setImageFile] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (image) {
      uploadImage();
    }
  }, [image]);
  useEffect(() => {
    if (!isDeleting) {
      (async () => {
        if (uploadedImagesIds !== null) {
          await submit();
          setRerender(rerender + 1);
          props.onPhotoChange(uploadedImagesIds);
        }
      })();
    } else {
      setIsDeleting(false);
    }
  }, [uploadedImagesIds]);
  useEffect(() => {
    if (imageFile && imageFile.size > 2097152) {
      setError("File is too large");
    } else {
      setImage(imageFile);
    }
  }, [imageFile]);
  const addUploadedImageIds = useCallback(imageIdData => {
    if (uploadedImagesIds === null) {
      var arr = [];
    } else {
      arr = uploadedImagesIds;
    }
    return [...arr, imageIdData.data.files[0].fileStoreId];
  }, [uploadedImagesIds]);
  function getImage(e) {
    setError(null);
    setImageFile(e.target.files[0]);
  }
  const uploadImage = useCallback(async () => {
    const response = await Digit.UploadServices.Filestorage("property-upload", image, props.tenantId);
    setUploadedImagesIds(addUploadedImageIds(response));
  }, [addUploadedImageIds, image]);
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
        key
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
  function deleteImage(img) {
    setIsDeleting(true);
    var deleteImageKey = uploadedImagesThumbs.filter((o, index) => o.image === img);
    var uploadedthumbs = uploadedImagesThumbs;
    var newThumbsList = uploadedthumbs.filter(thumbs => thumbs != deleteImageKey[0]);
    var newUploadedImagesIds = uploadedImagesIds.filter(key => key !== deleteImageKey[0].key);
    setUploadedImagesThumbs(newThumbsList);
    setUploadedImagesIds(newUploadedImagesIds);
    Digit.SessionStorage.set("PGR_CREATE_IMAGES", newUploadedImagesIds);
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, error && /*#__PURE__*/React.createElement(Toast, {
    error: true,
    label: error,
    onClose: () => setError(null)
  }), /*#__PURE__*/React.createElement(UploadImages, {
    onUpload: getImage,
    onDelete: deleteImage,
    thumbnails: uploadedImagesThumbs ? uploadedImagesThumbs.map(o => o.image) : []
  }));
};

const ImageViewer = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "image-viewer-wrap"
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "white",
    width: "18px",
    height: "18px",
    onClick: props.onClose
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 0h24v24H0V0z",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
  })), /*#__PURE__*/React.createElement("img", {
    src: props.imageSrc
  }));
};
ImageViewer.propTypes = {
  imageSrc: propTypes.string
};
ImageViewer.defaultProps = {
  imageSrc: ""
};

const InfoBanner = ({
  label,
  text
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "info-banner-wrap"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InfoBannerIcon, null), /*#__PURE__*/React.createElement("h2", null, label)), /*#__PURE__*/React.createElement("p", null, text));
};

const KeyNote = ({
  keyValue,
  note,
  caption,
  noteStyle,
  children,
  privacy
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "key-note-pair"
  }, /*#__PURE__*/React.createElement("h3", null, keyValue), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex"
    }
  }, privacy && /*#__PURE__*/React.createElement("p", {
    style: noteStyle
  }, /*#__PURE__*/React.createElement(WrapUnMaskComponent, {
    value: note,
    iseyevisible: note !== null && note !== void 0 && note.includes("*") ? true : false,
    privacy: privacy
  })), !privacy && /*#__PURE__*/React.createElement("p", {
    style: noteStyle
  }, note)), /*#__PURE__*/React.createElement("p", {
    className: "caption"
  }, caption), children);
};
KeyNote.propTypes = {
  keyValue: propTypes.string,
  note: propTypes.oneOfType([propTypes.string, propTypes.number]),
  noteStyle: propTypes.any
};
KeyNote.defaultProps = {
  keyValue: "",
  note: "",
  noteStyle: {}
};

const Label = props => {
  return /*#__PURE__*/React.createElement("h4", {
    className: "h4"
  }, props.children);
};

const LabelFieldPair = props => {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...props.style
    },
    className: "label-field-pair"
  }, props.children);
};

const LinkLabel = props => {
  return /*#__PURE__*/React.createElement("label", {
    className: "link-label",
    onClick: props.onClick,
    style: {
      ...props.style
    }
  }, props.children);
};

const Loader = ({
  page: _page = false
}) => /*#__PURE__*/React.createElement("div", {
  className: `${_page ? "page" : "module"}-loader`
}, /*#__PURE__*/React.createElement("div", {
  className: "loadingio-spinner-rolling-faewnb8ux8"
}, /*#__PURE__*/React.createElement("div", {
  className: "ldio-pjg92h09b2o"
}, /*#__PURE__*/React.createElement("div", null))));
Loader.propTypes = {
  page: propTypes.bool
};
Loader.defaultProps = {
  page: false
};

let defaultBounds = {};
const updateDefaultBounds = center => {
  if (!center.lat || !center.lng) {
    return;
  }
  defaultBounds = {
    north: center.lat + 0.1,
    south: center.lat - 0.1,
    east: center.lng + 0.1,
    west: center.lng - 0.1
  };
};
const GetPinCode = places => {
  var _places$address_compo;
  let postalCode = null;
  places === null || places === void 0 ? void 0 : (_places$address_compo = places.address_components) === null || _places$address_compo === void 0 ? void 0 : _places$address_compo.forEach(place => {
    let hasPostalCode = place.types.includes("postal_code");
    postalCode = hasPostalCode ? place.long_name : null;
  });
  return postalCode;
};
const getName = places => {
  var _places$address_compo2;
  let name = "";
  places === null || places === void 0 ? void 0 : (_places$address_compo2 = places.address_components) === null || _places$address_compo2 === void 0 ? void 0 : _places$address_compo2.forEach(place => {
    let hasName = place.types.includes("sublocality_level_2") || place.types.includes("sublocality_level_1");
    if (hasName) {
      name = hasName ? place.long_name : null;
    }
  });
  return name;
};
const loadGoogleMaps = callback => {
  var _globalConfigs;
  const key = (_globalConfigs = globalConfigs) === null || _globalConfigs === void 0 ? void 0 : _globalConfigs.getConfig("GMAPS_API_KEY");
  const loader = new Loader$1({
    apiKey: key,
    version: "weekly",
    libraries: ["places"]
  });
  loader.load().then(() => {
    if (callback) callback();
  }).catch(e => {});
};
const mapStyles = [{
  elementType: "geometry",
  stylers: [{
    color: "#f5f5f5"
  }]
}, {
  elementType: "labels.icon",
  stylers: [{
    visibility: "off"
  }]
}, {
  elementType: "labels.text.fill",
  stylers: [{
    color: "#616161"
  }]
}, {
  elementType: "labels.text.stroke",
  stylers: [{
    color: "#f5f5f5"
  }]
}, {
  featureType: "administrative.land_parcel",
  elementType: "labels.text.fill",
  stylers: [{
    color: "#bdbdbd"
  }]
}, {
  featureType: "poi",
  elementType: "geometry",
  stylers: [{
    color: "#eeeeee"
  }]
}, {
  featureType: "poi",
  elementType: "labels.text.fill",
  stylers: [{
    color: "#757575"
  }]
}, {
  featureType: "poi.park",
  elementType: "geometry",
  stylers: [{
    color: "#e5e5e5"
  }]
}, {
  featureType: "poi.park",
  elementType: "labels.text.fill",
  stylers: [{
    color: "#9e9e9e"
  }]
}, {
  featureType: "road",
  elementType: "geometry",
  stylers: [{
    color: "#ffffff"
  }]
}, {
  featureType: "road.arterial",
  elementType: "labels.text.fill",
  stylers: [{
    color: "#757575"
  }]
}, {
  featureType: "road.highway",
  elementType: "geometry",
  stylers: [{
    color: "#dadada"
  }]
}, {
  featureType: "road.highway",
  elementType: "labels.text.fill",
  stylers: [{
    color: "#616161"
  }]
}, {
  featureType: "road.local",
  elementType: "labels.text.fill",
  stylers: [{
    color: "#9e9e9e"
  }]
}, {
  featureType: "transit.line",
  elementType: "geometry",
  stylers: [{
    color: "#e5e5e5"
  }]
}, {
  featureType: "transit.station",
  elementType: "geometry",
  stylers: [{
    color: "#eeeeee"
  }]
}, {
  featureType: "water",
  elementType: "geometry",
  stylers: [{
    color: "#c9c9c9"
  }]
}, {
  featureType: "water",
  elementType: "labels.text.fill",
  stylers: [{
    color: "#9e9e9e"
  }]
}];
const setLocationText = (location, onChange, isPlaceRequired = false) => {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    location
  }, function (results, status) {
    if (status === "OK") {
      if (results[0]) {
        let pincode = GetPinCode(results[0]);
        const infoWindowContent = document.getElementById("pac-input");
        infoWindowContent.value = getName(results[0]);
        if (onChange) {
          if (isPlaceRequired) onChange(pincode, {
            longitude: location.lng,
            latitude: location.lat
          }, infoWindowContent.value);else onChange(pincode, {
            longitude: location.lng,
            latitude: location.lat
          });
        }
      }
    }
  });
};
const onMarkerDragged = (marker, onChange, isPlaceRequired = false) => {
  if (!marker) return;
  const {
    latLng
  } = marker;
  const currLat = latLng.lat();
  const currLang = latLng.lng();
  const location = {
    lat: currLat,
    lng: currLang
  };
  if (isPlaceRequired) setLocationText(location, onChange, true);else setLocationText(location, onChange);
};
const initAutocomplete = (onChange, position, isPlaceRequired = false) => {
  const map = new window.google.maps.Map(document.getElementById("map"), {
    center: position,
    zoom: 15,
    mapTypeId: "roadmap",
    styles: mapStyles
  });
  const input = document.getElementById("pac-input");
  updateDefaultBounds(position);
  const options = {
    bounds: defaultBounds,
    componentRestrictions: {
      country: "in"
    },
    fields: ["address_components", "geometry", "icon", "name"],
    origin: position,
    strictBounds: false,
    types: ["address"]
  };
  const searchBox = new window.google.maps.places.Autocomplete(input, options);
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });
  let markers = [new window.google.maps.Marker({
    map,
    title: "a",
    position: position,
    draggable: true,
    clickable: true
  })];
  if (isPlaceRequired) setLocationText(position, onChange, true);else setLocationText(position, onChange);
  markers[0].addListener("dragend", marker => onMarkerDragged(marker, onChange, isPlaceRequired));
  searchBox.addListener("place_changed", () => {
    const place = searchBox.getPlace();
    if (!place) {
      return;
    }
    let pincode = GetPinCode(place);
    if (pincode) {
      const {
        geometry
      } = place;
      const geoLocation = {
        latitude: geometry.location.lat(),
        longitude: geometry.location.lng()
      };
      if (isPlaceRequired) onChange(pincode, geoLocation, place.name);else onChange(pincode, geoLocation);
    }
    markers.forEach(marker => {
      marker.setMap(null);
    });
    markers = [];
    const bounds = new window.google.maps.LatLngBounds();
    if (!place.geometry) {
      return;
    }
    markers.push(new window.google.maps.Marker({
      map,
      title: place.name,
      position: place.geometry.location,
      draggable: true,
      clickable: true
    }));
    markers[0].addListener("dragend", marker => onMarkerDragged(marker, onChange, isPlaceRequired));
    if (place.geometry.viewport) {
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
  });
};
const LocationSearch = props => {
  useEffect(() => {
    async function mapScriptCall() {
      const getLatLng = position => {
        initAutocomplete(props.onChange, {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }, props.isPlaceRequired);
      };
      const getLatLngError = error => {
        let defaultLatLong = {};
        if (props !== null && props !== void 0 && props.isPTDefault) {
          var _props$PTdefaultcoord;
          defaultLatLong = (props === null || props === void 0 ? void 0 : (_props$PTdefaultcoord = props.PTdefaultcoord) === null || _props$PTdefaultcoord === void 0 ? void 0 : _props$PTdefaultcoord.defaultConfig) || {
            lat: 31.6160638,
            lng: 74.8978579
          };
        } else {
          defaultLatLong = {
            lat: 31.6160638,
            lng: 74.8978579
          };
        }
        initAutocomplete(props.onChange, defaultLatLong, props.isPlaceRequired);
      };
      const initMaps = () => {
        var _props$position, _props$position2, _navigator;
        if ((_props$position = props.position) !== null && _props$position !== void 0 && _props$position.latitude && (_props$position2 = props.position) !== null && _props$position2 !== void 0 && _props$position2.longitude) {
          getLatLng({
            coords: props.position
          });
        } else if ((_navigator = navigator) !== null && _navigator !== void 0 && _navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(getLatLng, getLatLngError);
        } else {
          getLatLngError();
        }
      };
      loadGoogleMaps(initMaps);
    }
    mapScriptCall();
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "map-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "map-search-bar-wrap"
  }, /*#__PURE__*/React.createElement(SearchIconSvg, {
    className: "map-search-bar-icon"
  }), /*#__PURE__*/React.createElement("input", {
    id: "pac-input",
    className: "map-search-bar",
    type: "text",
    placeholder: "Search Address",
    style: {
      backgroundPosition: "left"
    }
  })), /*#__PURE__*/React.createElement("div", {
    id: "map",
    className: "map"
  }));
};

const Menu$1 = props => {
  const keyPrefix = props.localeKeyPrefix || "CS_ACTION";
  return /*#__PURE__*/React.createElement("div", {
    className: "menu-wrap",
    style: props.style
  }, props.options.map((option, index) => {
    return /*#__PURE__*/React.createElement("div", {
      key: index,
      onClick: () => props.onSelect(option)
    }, /*#__PURE__*/React.createElement("p", null, props.t ? props.t(option.forcedName || `${keyPrefix}_${props.optionKey ? option[props.optionKey] : option}`) : option));
  }));
};
Menu$1.propTypes = {
  options: propTypes.array,
  onSelect: propTypes.func
};
Menu$1.defaultProps = {
  options: [],
  onSelect: () => {}
};

const MobileNumber = props => {
  const user_type = Digit.SessionStorage.get("userType");
  const onChange = e => {
    var _props$onChange;
    let val = e.target.value;
    if (isNaN(val) || [" ", "e", "E"].some(e => val.includes(e)) || val.length > (props.maxLength || 10)) {
      val = val.slice(0, -1);
    }
    props === null || props === void 0 ? void 0 : (_props$onChange = props.onChange) === null || _props$onChange === void 0 ? void 0 : _props$onChange.call(props, val);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "field-container"
  }, !props.hideSpan ? /*#__PURE__*/React.createElement("span", {
    style: {
      maxWidth: "50px",
      marginTop: "unset",
      ...props.labelStyle
    },
    className: "citizen-card-input citizen-card-input--front"
  }, "+91") : null, /*#__PURE__*/React.createElement("div", {
    className: `text-input ${user_type === "employee" ? "" : "text-mobile-input-width"} ${props.className}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: props.name,
    id: props.id,
    className: `${user_type ? "employee-card-input" : "citizen-card-input"} ${props.disable && "disabled"} focus-visible ${props.errorStyle && "employee-card-input-error"}`,
    placeholder: props.placeholder,
    onChange: onChange,
    ref: props.inputRef,
    value: props.value,
    style: {
      ...props.style
    },
    minLength: props.minlength,
    maxLength: props.maxlength,
    max: props.max,
    pattern: props.pattern,
    min: props.min,
    readOnly: props.disable,
    title: props.title,
    step: props.step,
    autoFocus: props.autoFocus,
    onBlur: props.onBlur,
    autoComplete: "off"
  }))));
};
MobileNumber.propTypes = {
  userType: propTypes.string,
  isMandatory: propTypes.bool,
  name: propTypes.string,
  placeholder: propTypes.string,
  onChange: propTypes.func,
  ref: propTypes.func,
  value: propTypes.any
};
MobileNumber.defaultProps = {
  isMandatory: false
};

const MultiLink = forwardRef(({
  className,
  onHeadClick,
  displayOptions: _displayOptions = false,
  options,
  label,
  icon,
  showOptions,
  downloadBtnClassName,
  downloadOptionsClassName,
  optionsClassName,
  style,
  optionsStyle,
  reportStyles,
  optionStyle
}, ref) => {
  const {
    t
  } = useTranslation();
  const menuRef = useRef();
  const handleOnClick = useCallback(() => {
    showOptions === null || showOptions === void 0 ? void 0 : showOptions(false);
  }, []);
  Digit.Hooks.useClickOutside(menuRef, handleOnClick, !_displayOptions);
  const MenuWrapper = React.forwardRef((props, ref) => {
    return /*#__PURE__*/React.createElement("div", {
      ref: ref,
      className: `multilink-optionWrap ${optionsClassName} ${downloadOptionsClassName}`,
      style: optionsStyle
    }, options.map((option, index) => /*#__PURE__*/React.createElement("div", {
      onClick: () => option.onClick(),
      key: index,
      className: `multilink-option`,
      style: optionStyle
    }, option === null || option === void 0 ? void 0 : option.icon, option.label)));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    ref: ref,
    style: reportStyles
  }, /*#__PURE__*/React.createElement("div", {
    className: `multilink-labelWrap ${downloadBtnClassName}`,
    onClick: onHeadClick,
    style: style
  }, icon ? icon : /*#__PURE__*/React.createElement(PrimaryDownlaodIcon, null), /*#__PURE__*/React.createElement(LinkButton, {
    label: label || t("CS_COMMON_DOWNLOAD"),
    className: "multilink-link-button"
  })), _displayOptions ? /*#__PURE__*/React.createElement(MenuWrapper, {
    ref: ref
  }) : null);
});

const MultiSelectDropdown = ({
  options,
  optionsKey,
  selected: _selected = [],
  onSelect,
  defaultLabel: _defaultLabel = "",
  defaultUnit: _defaultUnit = "",
  BlockNumber: _BlockNumber = 1,
  isOBPSMultiple: _isOBPSMultiple = false,
  props: _props = {},
  isPropsNeeded: _isPropsNeeded = false,
  ServerStyle: _ServerStyle = {},
  isSurvey: _isSurvey = false
}) => {
  var _selected$;
  const [active, setActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState();
  const [optionIndex, setOptionIndex] = useState(-1);
  const dropdownRef = useRef();
  const {
    t
  } = useTranslation();
  function reducer(state, action) {
    var _action$payload, _action$payload$;
    switch (action.type) {
      case "ADD_TO_SELECTED_EVENT_QUEUE":
        return [...state, {
          [optionsKey]: (_action$payload = action.payload) === null || _action$payload === void 0 ? void 0 : (_action$payload$ = _action$payload[1]) === null || _action$payload$ === void 0 ? void 0 : _action$payload$[optionsKey],
          propsData: action.payload
        }];
      case "REMOVE_FROM_SELECTED_EVENT_QUEUE":
        return state.filter(e => {
          var _action$payload2, _action$payload2$;
          return (e === null || e === void 0 ? void 0 : e[optionsKey]) !== ((_action$payload2 = action.payload) === null || _action$payload2 === void 0 ? void 0 : (_action$payload2$ = _action$payload2[1]) === null || _action$payload2$ === void 0 ? void 0 : _action$payload2$[optionsKey]);
        });
      case "REPLACE_COMPLETE_STATE":
        return action.payload;
      default:
        return state;
    }
  }
  useEffect(() => {
    dispatch({
      type: "REPLACE_COMPLETE_STATE",
      payload: fnToSelectOptionThroughProvidedSelection(_selected)
    });
  }, [_selected === null || _selected === void 0 ? void 0 : _selected.length, _selected === null || _selected === void 0 ? void 0 : (_selected$ = _selected[0]) === null || _selected$ === void 0 ? void 0 : _selected$.code]);
  function fnToSelectOptionThroughProvidedSelection(selected) {
    return selected === null || selected === void 0 ? void 0 : selected.map(e => ({
      [optionsKey]: e === null || e === void 0 ? void 0 : e[optionsKey],
      propsData: [null, e]
    }));
  }
  const [alreadyQueuedSelectedState, dispatch] = useReducer(reducer, _selected, fnToSelectOptionThroughProvidedSelection);
  useEffect(() => {
    if (!active) {
      onSelect(alreadyQueuedSelectedState === null || alreadyQueuedSelectedState === void 0 ? void 0 : alreadyQueuedSelectedState.map(e => e.propsData), _props);
    }
  }, [active]);
  function handleOutsideClickAndSubmitSimultaneously() {
    setActive(false);
  }
  Digit.Hooks.useClickOutside(dropdownRef, handleOutsideClickAndSubmitSimultaneously, active, {
    capture: true
  });
  const filtOptns = (searchQuery === null || searchQuery === void 0 ? void 0 : searchQuery.length) > 0 ? options.filter(option => t(option[optionsKey] && typeof option[optionsKey] == "string" && option[optionsKey].toUpperCase()).toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0) : options;
  function onSearch(e) {
    setSearchQuery(e.target.value);
  }
  function onSelectToAddToQueue(...props) {
    const isChecked = arguments[0].target.checked;
    isChecked ? dispatch({
      type: "ADD_TO_SELECTED_EVENT_QUEUE",
      payload: arguments
    }) : dispatch({
      type: "REMOVE_FROM_SELECTED_EVENT_QUEUE",
      payload: arguments
    });
  }
  const keyChange = e => {
    if (e.key == "ArrowDown") {
      setOptionIndex(state => state + 1 == filtOptns.length ? 0 : state + 1);
      if (optionIndex + 1 == filtOptns.length) {
        var _e$target, _e$target$parentEleme, _e$target$parentEleme2, _e$target$parentEleme3, _e$target$parentEleme4, _e$target$parentEleme5;
        e === null || e === void 0 ? void 0 : (_e$target = e.target) === null || _e$target === void 0 ? void 0 : (_e$target$parentEleme = _e$target.parentElement) === null || _e$target$parentEleme === void 0 ? void 0 : (_e$target$parentEleme2 = _e$target$parentEleme.parentElement) === null || _e$target$parentEleme2 === void 0 ? void 0 : (_e$target$parentEleme3 = _e$target$parentEleme2.children) === null || _e$target$parentEleme3 === void 0 ? void 0 : (_e$target$parentEleme4 = _e$target$parentEleme3.namedItem("jk-dropdown-unique")) === null || _e$target$parentEleme4 === void 0 ? void 0 : (_e$target$parentEleme5 = _e$target$parentEleme4.scrollTo) === null || _e$target$parentEleme5 === void 0 ? void 0 : _e$target$parentEleme5.call(_e$target$parentEleme4, 0, 0);
      } else {
        var _e$target2, _e$target2$parentElem, _e$target2$parentElem2, _e$target2$parentElem3, _e$target2$parentElem4, _e$target2$parentElem5;
        optionIndex > 2 && (e === null || e === void 0 ? void 0 : (_e$target2 = e.target) === null || _e$target2 === void 0 ? void 0 : (_e$target2$parentElem = _e$target2.parentElement) === null || _e$target2$parentElem === void 0 ? void 0 : (_e$target2$parentElem2 = _e$target2$parentElem.parentElement) === null || _e$target2$parentElem2 === void 0 ? void 0 : (_e$target2$parentElem3 = _e$target2$parentElem2.children) === null || _e$target2$parentElem3 === void 0 ? void 0 : (_e$target2$parentElem4 = _e$target2$parentElem3.namedItem("jk-dropdown-unique")) === null || _e$target2$parentElem4 === void 0 ? void 0 : (_e$target2$parentElem5 = _e$target2$parentElem4.scrollBy) === null || _e$target2$parentElem5 === void 0 ? void 0 : _e$target2$parentElem5.call(_e$target2$parentElem4, 0, 45));
      }
      e.preventDefault();
    } else if (e.key == "ArrowUp") {
      setOptionIndex(state => state !== 0 ? state - 1 : filtOptns.length - 1);
      if (optionIndex === 0) {
        var _e$target3, _e$target3$parentElem, _e$target3$parentElem2, _e$target3$parentElem3, _e$target3$parentElem4, _e$target3$parentElem5;
        e === null || e === void 0 ? void 0 : (_e$target3 = e.target) === null || _e$target3 === void 0 ? void 0 : (_e$target3$parentElem = _e$target3.parentElement) === null || _e$target3$parentElem === void 0 ? void 0 : (_e$target3$parentElem2 = _e$target3$parentElem.parentElement) === null || _e$target3$parentElem2 === void 0 ? void 0 : (_e$target3$parentElem3 = _e$target3$parentElem2.children) === null || _e$target3$parentElem3 === void 0 ? void 0 : (_e$target3$parentElem4 = _e$target3$parentElem3.namedItem("jk-dropdown-unique")) === null || _e$target3$parentElem4 === void 0 ? void 0 : (_e$target3$parentElem5 = _e$target3$parentElem4.scrollTo) === null || _e$target3$parentElem5 === void 0 ? void 0 : _e$target3$parentElem5.call(_e$target3$parentElem4, 100000, 100000);
      } else {
        var _e$target4, _e$target4$parentElem, _e$target4$parentElem2, _e$target4$parentElem3, _e$target4$parentElem4, _e$target4$parentElem5;
        optionIndex > 2 && (e === null || e === void 0 ? void 0 : (_e$target4 = e.target) === null || _e$target4 === void 0 ? void 0 : (_e$target4$parentElem = _e$target4.parentElement) === null || _e$target4$parentElem === void 0 ? void 0 : (_e$target4$parentElem2 = _e$target4$parentElem.parentElement) === null || _e$target4$parentElem2 === void 0 ? void 0 : (_e$target4$parentElem3 = _e$target4$parentElem2.children) === null || _e$target4$parentElem3 === void 0 ? void 0 : (_e$target4$parentElem4 = _e$target4$parentElem3.namedItem("jk-dropdown-unique")) === null || _e$target4$parentElem4 === void 0 ? void 0 : (_e$target4$parentElem5 = _e$target4$parentElem4.scrollBy) === null || _e$target4$parentElem5 === void 0 ? void 0 : _e$target4$parentElem5.call(_e$target4$parentElem4, 0, -45));
      }
      e.preventDefault();
    } else if (e.key == "Enter") {
      onSelectToAddToQueue(e, filtOptns[optionIndex]);
    }
  };
  const MenuItem = ({
    option,
    index
  }) => /*#__PURE__*/React.createElement("div", {
    key: index,
    style: _isOBPSMultiple ? index % 2 !== 0 ? {
      background: "#EEEEEE"
    } : {} : {}
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    value: option[optionsKey],
    checked: alreadyQueuedSelectedState.find(selectedOption => selectedOption[optionsKey] === option[optionsKey]) ? true : false,
    onChange: e => _isPropsNeeded ? onSelectToAddToQueue(e, option, _props) : _isOBPSMultiple ? onSelectToAddToQueue(e, option, _BlockNumber) : onSelectToAddToQueue(e, option),
    style: {
      minWidth: "24px",
      width: "100%"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "custom-checkbox"
  }, /*#__PURE__*/React.createElement(CheckSvg, {
    style: {
      innerWidth: "24px",
      width: "24px"
    }
  })), /*#__PURE__*/React.createElement("p", {
    className: "label",
    style: index === optionIndex ? {
      opacity: 1,
      backgroundColor: "rgba(238, 238, 238, var(--bg-opacity))"
    } : {}
  }, t(option[optionsKey] && typeof option[optionsKey] == "string" && option[optionsKey])));
  const Menu = () => {
    const filteredOptions = (searchQuery === null || searchQuery === void 0 ? void 0 : searchQuery.length) > 0 ? options.filter(option => t(option[optionsKey] && typeof option[optionsKey] == "string" && option[optionsKey].toUpperCase()).toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0) : options;
    return filteredOptions === null || filteredOptions === void 0 ? void 0 : filteredOptions.map((option, index) => /*#__PURE__*/React.createElement(MenuItem, {
      option: option,
      key: index,
      index: index
    }));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "multi-select-dropdown-wrap",
    ref: dropdownRef
  }, /*#__PURE__*/React.createElement("div", {
    className: `master${active ? `-active` : ``}`
  }, /*#__PURE__*/React.createElement("input", {
    className: "cursorPointer",
    type: "text",
    onKeyDown: keyChange,
    onFocus: () => setActive(true),
    value: searchQuery,
    onChange: onSearch
  }), /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, /*#__PURE__*/React.createElement("p", null, alreadyQueuedSelectedState.length > 0 ? `${_isSurvey ? alreadyQueuedSelectedState === null || alreadyQueuedSelectedState === void 0 ? void 0 : alreadyQueuedSelectedState.filter(ob => (ob === null || ob === void 0 ? void 0 : ob.i18nKey) !== undefined).length : alreadyQueuedSelectedState.length} ${_defaultUnit}` : _defaultLabel), /*#__PURE__*/React.createElement(ArrowDown, null))), active ? /*#__PURE__*/React.createElement("div", {
    className: "server",
    id: "jk-dropdown-unique",
    style: _ServerStyle ? _ServerStyle : {}
  }, /*#__PURE__*/React.createElement(Menu, null)) : null);
};

const IconsObject = {
  CommonPTIcon: /*#__PURE__*/React.createElement(PTIcon, null),
  OBPSIcon: /*#__PURE__*/React.createElement(OBPSIcon, null),
  propertyIcon: /*#__PURE__*/React.createElement(PropertyHouse, null),
  TLIcon: /*#__PURE__*/React.createElement(CaseIcon, null),
  PGRIcon: /*#__PURE__*/React.createElement(PGRIcon, null),
  FSMIcon: /*#__PURE__*/React.createElement(FSMIcon, null),
  WSIcon: /*#__PURE__*/React.createElement(WSICon, null),
  MCollectIcon: /*#__PURE__*/React.createElement(MCollectIcon, null),
  BillsIcon: /*#__PURE__*/React.createElement(CollectionIcon, null),
  home: /*#__PURE__*/React.createElement(HomeIcon, null),
  announcement: /*#__PURE__*/React.createElement(ComplaintIcon, null),
  business: /*#__PURE__*/React.createElement(ComplaintIcon, null),
  store: /*#__PURE__*/React.createElement(PropertyHouse, null),
  assignment: /*#__PURE__*/React.createElement(CaseIcon, null),
  receipt: /*#__PURE__*/React.createElement(CollectionIcon, null),
  "business-center": /*#__PURE__*/React.createElement(PersonIcon, null),
  description: /*#__PURE__*/React.createElement(DocumentIconSolid, null),
  "water-tap": /*#__PURE__*/React.createElement(DropIcon, null),
  "collections-bookmark": /*#__PURE__*/React.createElement(CollectionsBookmarIcons, null),
  "insert-chart": /*#__PURE__*/React.createElement(FinanceChartIcon, null),
  edcr: /*#__PURE__*/React.createElement(CollectionIcon, null),
  collections: /*#__PURE__*/React.createElement(CollectionIcon, null)
};
const SubMenu = ({
  item,
  t,
  isEmployee
}) => {
  var _item$icon, _item$icon$split, _item$icon$split$call;
  const [subnav, setSubnav] = useState(false);
  const location = useLocation();
  const {
    pathname
  } = location;
  const showSubnav = () => setSubnav(!subnav);
  const leftIconCitizenArray = item.icon;
  const leftIconCitizen = IconsObject[leftIconCitizenArray] || IconsObject.BillsIcon;
  const leftIconEmployeeItems = (item === null || item === void 0 ? void 0 : (_item$icon = item.icon) === null || _item$icon === void 0 ? void 0 : (_item$icon$split = _item$icon.split) === null || _item$icon$split === void 0 ? void 0 : (_item$icon$split$call = _item$icon$split.call(_item$icon, ":")) === null || _item$icon$split$call === void 0 ? void 0 : _item$icon$split$call[1]) || "";
  const leftIconEmployee = IconsObject[leftIconEmployeeItems] || IconsObject.collections;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "submenu-container"
  }, /*#__PURE__*/React.createElement("div", {
    onClick: item.links && showSubnav,
    className: `sidebar-link ${subnav === true ? "active" : ""}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "actions"
  }, isEmployee ? leftIconEmployee : leftIconCitizen, /*#__PURE__*/React.createElement("span", null, isEmployee ? item.moduleName : t(Digit.Utils.locale.getTransformedLocale(`ACTION_TEST_${item.moduleName}`)))), /*#__PURE__*/React.createElement("div", null, " ", item.links && subnav, " "))), subnav && item.links.sort((a, b) => a.orderNumber - b.orderNumber).map((item, index) => {
    if (item.navigationURL.indexOf("/digit-ui") === -1) {
      const getOrigin = window.location.origin;
      return /*#__PURE__*/React.createElement("a", {
        key: index + 1,
        className: `dropdown-link ${pathname === item.link ? "active" : ""}`,
        href: getOrigin + "/employee/" + item.navigationURL
      }, /*#__PURE__*/React.createElement("div", {
        className: "actions"
      }, /*#__PURE__*/React.createElement("span", null, item.label || item.displayName)));
    }
    return /*#__PURE__*/React.createElement(Link, {
      to: item.link || item.navigationURL,
      key: index + 1,
      className: `dropdown-link ${pathname === item.navigationURL ? "active" : ""}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "actions"
    }, /*#__PURE__*/React.createElement("span", null, item.label || item.displayName)));
  }));
};

const IconsObject$1 = {
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
  BirthIcon: /*#__PURE__*/React.createElement(BirthIcon, {
    className: "icon"
  }),
  DeathIcon: /*#__PURE__*/React.createElement(DeathIcon, {
    className: "icon"
  }),
  FirenocIcon: /*#__PURE__*/React.createElement(FirenocIcon, {
    className: "icon"
  }),
  MCollectIcon: /*#__PURE__*/React.createElement(MCollectIcon, {
    className: "icon"
  }),
  BillsIcon: /*#__PURE__*/React.createElement(CollectionIcon, {
    className: "icon"
  }),
  home: /*#__PURE__*/React.createElement(HomeIcon, {
    className: "icon"
  }),
  announcement: /*#__PURE__*/React.createElement(ComplaintIcon, {
    className: "icon"
  }),
  business: /*#__PURE__*/React.createElement(BPAHomeIcon, {
    className: "icon"
  }),
  store: /*#__PURE__*/React.createElement(PropertyHouse, {
    className: "icon"
  }),
  assignment: /*#__PURE__*/React.createElement(CaseIcon, {
    className: "icon"
  }),
  receipt: /*#__PURE__*/React.createElement(CollectionIcon, {
    className: "icon"
  }),
  "business-center": /*#__PURE__*/React.createElement(PersonIcon, {
    className: "icon"
  }),
  description: /*#__PURE__*/React.createElement(CollectionIcon, {
    className: "icon"
  }),
  "water-tap": /*#__PURE__*/React.createElement(DropIcon, {
    className: "icon"
  }),
  "collections-bookmark": /*#__PURE__*/React.createElement(CollectionsBookmarIcons, {
    className: "icon"
  }),
  "insert-chart": /*#__PURE__*/React.createElement(FinanceChartIcon, {
    className: "icon"
  }),
  edcr: /*#__PURE__*/React.createElement(CollectionIcon, {
    className: "icon"
  }),
  collections: /*#__PURE__*/React.createElement(CollectionIcon, {
    className: "icon"
  }),
  "open-complaints": /*#__PURE__*/React.createElement(ComplaintIcon, {
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
  LanguageIcon: /*#__PURE__*/React.createElement(LanguageIcon, {
    className: "icon"
  }),
  LoginIcon: /*#__PURE__*/React.createElement(LoginIcon, {
    className: "icon"
  })
};
const NavBar = ({
  open,
  toggleSidebar,
  profileItem,
  menuItems,
  onClose,
  Footer,
  isEmployee,
  search,
  setSearch,
  isSideBarScroll
}) => {
  const node = useRef();
  const location = useLocation();
  const {
    pathname
  } = location;
  const {
    t
  } = useTranslation();
  Digit.Hooks.useClickOutside(node, open ? onClose : null, open);
  if (isSideBarScroll && !Digit.clikOusideFired) {
    document.getElementById("sideBarMenu").scrollTo(0, 0);
  }
  const MenuItem = ({
    item
  }) => {
    var _item$icon, _item$icon$type;
    let itemComponent;
    if (item.type === "component") {
      itemComponent = item.action;
    } else {
      itemComponent = item.text;
    }
    const leftIconArray = item.icon || ((_item$icon = item.icon) === null || _item$icon === void 0 ? void 0 : (_item$icon$type = _item$icon.type) === null || _item$icon$type === void 0 ? void 0 : _item$icon$type.name);
    const leftIcon = leftIconArray ? IconsObject$1[leftIconArray] : IconsObject$1.BillsIcon;
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
      if (item.link.indexOf("/digit-ui") === -1 && isEmployee) {
        const getOrigin = window.location.origin;
        return /*#__PURE__*/React.createElement("a", {
          href: getOrigin + "/employee/" + item.link
        }, /*#__PURE__*/React.createElement(Item, null));
      }
      return /*#__PURE__*/React.createElement(Link, {
        to: item.link
      }, /*#__PURE__*/React.createElement(Item, null));
    }
    if (item.type === "dynamic") {
      if (isEmployee) {
        return /*#__PURE__*/React.createElement(SubMenu, {
          item: item,
          t: t,
          toggleSidebar: toggleSidebar,
          isEmployee: isEmployee
        });
      }
    }
    return /*#__PURE__*/React.createElement(Item, null);
  };
  const renderSearch = () => {
    return /*#__PURE__*/React.createElement("div", {
      className: "sidebar-list"
    }, /*#__PURE__*/React.createElement("div", {
      className: "submenu-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sidebar-link"
    }, /*#__PURE__*/React.createElement("div", {
      className: "actions"
    }, /*#__PURE__*/React.createElement(SearchIcon, {
      className: "icon"
    }), /*#__PURE__*/React.createElement("input", {
      className: "employee-search-input",
      type: "text",
      placeholder: t(`ACTION_TEST_SEARCH`),
      name: "search",
      value: search,
      onChange: e => setSearch(e.target.value)
    })))));
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      height: "100%",
      width: "100%",
      top: "0px",
      left: `${open ? "0px" : "-100%"}`,
      opacity: "1",
      backgroundColor: "rgba(0, 0, 0, 0.54)",
      willChange: "opacity",
      transform: "translateZ(0px)",
      transition: "left 0ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, opacity 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
      zIndex: "1200",
      pointerzevents: "auto"
    }
  }), /*#__PURE__*/React.createElement("div", {
    ref: node,
    style: {
      display: "flex",
      flexDirection: "column",
      marginTop: "56px",
      height: "calc(100vh - 56px)",
      position: "fixed",
      top: 0,
      left: 0,
      transition: "transform 0.3s ease-in-out",
      background: "#fff",
      zIndex: "1999",
      width: "280px",
      transform: `${open ? "translateX(0)" : "translateX(-450px)"}`,
      boxShadow: "rgb(0 0 0 / 16%) 8px 0px 16px"
    }
  }, profileItem, /*#__PURE__*/React.createElement("div", {
    className: "drawer-list",
    id: "sideBarMenu"
  }, isEmployee ? renderSearch() : null, menuItems === null || menuItems === void 0 ? void 0 : menuItems.map((item, index) => /*#__PURE__*/React.createElement("div", {
    className: `sidebar-list ${pathname === item.link ? "active" : ""}`,
    key: index
  }, /*#__PURE__*/React.createElement(MenuItem, {
    item: item
  }))), /*#__PURE__*/React.createElement("div", {
    className: `sidebar-list`
  }, /*#__PURE__*/React.createElement("div", {
    className: "side-bar-footer"
  }, Footer))))));
};

const BACKSPACE = 8;
const SingleInput = ({
  isFocus,
  onChange,
  onFocus,
  value,
  ...rest
}) => {
  const inputRef = useRef();
  useEffect(() => {
    if (isFocus) {
      inputRef.current.focus();
    }
  }, [isFocus]);
  return /*#__PURE__*/React.createElement("input", Object.assign({
    className: "input-otp",
    maxLength: 1,
    onChange: onChange,
    onFocus: onFocus,
    ref: inputRef,
    type: "number",
    value: value ? value : ""
  }, rest));
};
const OTPInput = props => {
  const [activeInput, setActiveInput] = useState(0);
  const isInputValueValid = value => {
    return typeof value === "string" && value.trim().length === 1;
  };
  const changeCodeAtFocus = value => {
    const {
      onChange
    } = props;
    const otp = getOtpValue();
    otp[activeInput] = value[0];
    const otpValue = otp.join("");
    onChange(otpValue);
  };
  const focusNextInput = () => {
    setActiveInput(activeInput => Math.min(activeInput + 1, props.length - 1));
  };
  const focusPrevInput = () => {
    setActiveInput(activeInput => Math.max(activeInput - 1, 0));
  };
  const getOtpValue = () => props.value ? props.value.toString().split("") : [];
  const handleKeyDown = event => {
    if (event.keyCode === BACKSPACE || event.key === "Backspace") {
      event.preventDefault();
      changeCodeAtFocus("");
      focusPrevInput();
    }
  };
  function inputChange(event) {
    const {
      value
    } = event.target;
    changeCodeAtFocus(value);
    if (isInputValueValid(value)) {
      focusNextInput();
    }
  }
  const OTPStack = [];
  const otp = getOtpValue();
  for (let i = 0; i < props.length; i++) {
    OTPStack.push( /*#__PURE__*/React.createElement(SingleInput, {
      key: i,
      isFocus: activeInput === i,
      onChange: inputChange,
      onKeyDown: handleKeyDown,
      onFocus: e => {
        setActiveInput(i);
        e.target.select();
      },
      value: otp[i]
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "input-otp-wrap"
  }, OTPStack);
};
OTPInput.propTypes = {
  length: propTypes.number
};
OTPInput.defaultProps = {
  length: 0
};

const PrivateRoute = ({
  component: Component,
  roles,
  ...rest
}) => {
  return /*#__PURE__*/React.createElement(Route, Object.assign({}, rest, {
    render: props => {
      const user = Digit.UserService.getUser();
      const userType = Digit.UserService.getType();
      function getLoginRedirectionLink() {
        if (userType === "employee") {
          return "/digit-ui/employee/user/language-selection";
        } else {
          return "/digit-ui/citizen/login";
        }
      }
      if (!user || !user.access_token) {
        return /*#__PURE__*/React.createElement(Redirect, {
          to: {
            pathname: getLoginRedirectionLink(),
            state: {
              from: props.location.pathname + props.location.search
            }
          }
        });
      }
      return /*#__PURE__*/React.createElement(Component, props);
    }
  }));
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

var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var _freeGlobal = freeGlobal;

var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
var root = _freeGlobal || freeSelf || Function('return this')();
var _root = root;

var Symbol$1 = _root.Symbol;
var _Symbol = Symbol$1;

var objectProto = Object.prototype;
var hasOwnProperty$1 = objectProto.hasOwnProperty;
var nativeObjectToString = objectProto.toString;
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;
function getRawTag(value) {
  var isOwn = hasOwnProperty$1.call(value, symToStringTag),
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
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
var reIsNative = RegExp('^' + funcToString$1.call(hasOwnProperty$2).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
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
var hasOwnProperty$3 = objectProto$3.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (_nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty$3.call(data, key) ? data[key] : undefined;
}
var _hashGet = hashGet;

var objectProto$4 = Object.prototype;
var hasOwnProperty$4 = objectProto$4.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return _nativeCreate ? data[key] !== undefined : hasOwnProperty$4.call(data, key);
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
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
var propertyIsEnumerable$1 = objectProto$6.propertyIsEnumerable;
var isArguments = _baseIsArguments(function () {
  return arguments;
}()) ? _baseIsArguments : function (value) {
  return isObjectLike_1(value) && hasOwnProperty$5.call(value, 'callee') && !propertyIsEnumerable$1.call(value, 'callee');
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

function getAllKeys(object) {
  return _baseGetAllKeys(object, keys_1, _getSymbols);
}
var _getAllKeys = getAllKeys;

var COMPARE_PARTIAL_FLAG$2 = 1;
var objectProto$a = Object.prototype;
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;
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
    if (!(isPartial ? key in other : hasOwnProperty$8.call(other, key))) {
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

var Promise = _getNative(_root, 'Promise');
var _Promise = Promise;

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
var hasOwnProperty$9 = objectProto$b.hasOwnProperty;
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
    var objIsWrapped = objIsObj && hasOwnProperty$9.call(object, '__wrapped__'),
      othIsWrapped = othIsObj && hasOwnProperty$9.call(other, '__wrapped__');
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

const RadioButtons = props => {
  var _props$options;
  const {
    t
  } = useTranslation();
  var selected = props.selectedOption;
  function selectOption(value) {
    props.onSelect(value);
  }
  return /*#__PURE__*/React.createElement("div", {
    style: props.style,
    className: `radio-wrap ${props === null || props === void 0 ? void 0 : props.additionalWrapperClass}`
  }, props === null || props === void 0 ? void 0 : (_props$options = props.options) === null || _props$options === void 0 ? void 0 : _props$options.map((option, ind) => {
    if (props !== null && props !== void 0 && props.optionsKey && !(props !== null && props !== void 0 && props.isDependent)) {
      return /*#__PURE__*/React.createElement("div", {
        style: props.innerStyles,
        key: ind
      }, /*#__PURE__*/React.createElement("span", {
        className: "radio-btn-wrap"
      }, /*#__PURE__*/React.createElement("input", {
        className: "radio-btn",
        type: "radio",
        value: option,
        checked: props.isPTFlow && (selected === null || selected === void 0 ? void 0 : selected.code) === option.code || isEqual_1(selected, option) ? 1 : 0,
        onChange: () => selectOption(option),
        disabled: props === null || props === void 0 ? void 0 : props.disabled,
        name: props.name,
        ref: props.inputRef
      }), /*#__PURE__*/React.createElement("span", {
        className: "radio-btn-checkmark"
      })), /*#__PURE__*/React.createElement("label", {
        style: props.inputStyle
      }, t(option[props.optionsKey])));
    } else if (props !== null && props !== void 0 && props.optionsKey && props !== null && props !== void 0 && props.isDependent) {
      return /*#__PURE__*/React.createElement("div", {
        style: props.innerStyles,
        key: ind
      }, /*#__PURE__*/React.createElement("span", {
        className: "radio-btn-wrap"
      }, /*#__PURE__*/React.createElement("input", {
        className: "radio-btn",
        type: "radio",
        value: option,
        checked: props !== null && props !== void 0 && props.isTLFlow ? (selected === null || selected === void 0 ? void 0 : selected.code) === option.code || (selected === null || selected === void 0 ? void 0 : selected.i18nKey) === option.i18nKey : (selected === null || selected === void 0 ? void 0 : selected.code) === option.code ? 1 : 0,
        onChange: () => selectOption(option),
        disabled: props === null || props === void 0 ? void 0 : props.disabled,
        name: props.name,
        ref: props.inputRef
      }), /*#__PURE__*/React.createElement("span", {
        className: "radio-btn-checkmark"
      })), /*#__PURE__*/React.createElement("label", {
        style: props.inputStyle
      }, t(props.labelKey ? `${props.labelKey}_${option.code}` : option.code)));
    } else {
      return /*#__PURE__*/React.createElement("div", {
        style: props.innerStyles,
        key: ind
      }, /*#__PURE__*/React.createElement("span", {
        className: "radio-btn-wrap"
      }, /*#__PURE__*/React.createElement("input", {
        className: "radio-btn",
        type: "radio",
        value: option,
        checked: selected === option ? 1 : 0,
        onChange: () => selectOption(option),
        disabled: props === null || props === void 0 ? void 0 : props.disabled,
        name: props.name,
        ref: props.inputRef
      }), /*#__PURE__*/React.createElement("span", {
        className: "radio-btn-checkmark"
      })), /*#__PURE__*/React.createElement("label", {
        style: props.inputStyle
      }, t(option)));
    }
  }));
};
RadioButtons.propTypes = {
  selectedOption: propTypes.any,
  onSelect: propTypes.func,
  options: propTypes.any,
  optionsKey: propTypes.string,
  innerStyles: propTypes.any,
  style: propTypes.any
};
RadioButtons.defaultProps = {};

const Rating = props => {
  var stars = [];
  const star = useRef(null);
  const calculatingPercentage = percentage => {
    if (percentage >= 85 && percentage < 90) {
      return percentage - 8;
    } else if (percentage >= 90 && percentage < 95) {
      return percentage - 12;
    } else if (percentage >= 95) {
      return percentage - 15;
    } else {
      return percentage;
    }
  };
  for (var i = 1; i <= props.maxRating; i++) {
    if (i - props.currentRating <= 0) {
      const index = i;
      stars.push( /*#__PURE__*/React.createElement(StarFilled, {
        key: i,
        id: `${props.id}gradient${i}`,
        className: "rating-star",
        styles: props.starStyles,
        onClick: e => props.onFeedback(e, star, index)
      }));
    } else if (i - props.currentRating > 0 && i - props.currentRating < 1) {
      const index = i;
      stars.push( /*#__PURE__*/React.createElement(StarFilled, {
        key: i,
        id: `${props.id}gradient${i}`,
        className: "rating-star",
        styles: props.starStyles,
        onClick: e => props.onFeedback(e, star, index),
        percentage: calculatingPercentage(Math.round((props.currentRating - parseInt(props.currentRating)) * 100))
      }));
    } else {
      const index = i;
      stars.push( /*#__PURE__*/React.createElement(StarEmpty, {
        key: i,
        className: "rating-star",
        styles: props.starStyles,
        onClick: e => props.onFeedback(e, star, index)
      }));
    }
  }
  return /*#__PURE__*/React.createElement("div", null, props !== null && props !== void 0 && props.toolTipText ? /*#__PURE__*/React.createElement("div", {
    className: `${props.withText ? "rating-with-text" : "rating-star-wrap"}`,
    style: {
      ...props.styles
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "tooltip"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "0 4px"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      display: "flex"
    }
  }, props.text ? props.text : "", " ", stars), /*#__PURE__*/React.createElement("span", {
    className: "tooltiptext",
    style: {
      position: "absolute",
      width: "auto",
      fontSize: "medium",
      bottom: "100%",
      left: "75%"
    }
  }, `${props.currentRating}`)))) : /*#__PURE__*/React.createElement("div", {
    className: `${props.withText ? "rating-with-text" : "rating-star-wrap"}`,
    style: {
      ...props.styles
    }
  }, props.text ? props.text : "", " ", stars));
};
Rating.propTypes = {
  maxRating: propTypes.number,
  currentRating: propTypes.number,
  onFeedback: propTypes.func
};
Rating.defaultProps = {
  maxRating: 5,
  id: '0',
  currentRating: 0,
  onFeedback: () => {}
};

const UnMaskComponent = React.memo(({
  iseyevisible: _iseyevisible = true,
  privacy: _privacy = {},
  style: _style = {},
  unmaskData
}) => {
  const {
    t
  } = useTranslation();
  const {
    isLoading,
    data
  } = Digit.Hooks.useCustomMDMS(Digit.ULBService.getStateId(), "DataSecurity", [{
    name: "SecurityPolicy"
  }], {
    select: data => {
      var _data$DataSecurity, _data$DataSecurity$Se;
      return (data === null || data === void 0 ? void 0 : (_data$DataSecurity = data.DataSecurity) === null || _data$DataSecurity === void 0 ? void 0 : (_data$DataSecurity$Se = _data$DataSecurity.SecurityPolicy) === null || _data$DataSecurity$Se === void 0 ? void 0 : _data$DataSecurity$Se.find(elem => (elem === null || elem === void 0 ? void 0 : elem.model) == (_privacy === null || _privacy === void 0 ? void 0 : _privacy.model))) || {};
    }
  });
  const {
    privacy: privacyValue,
    updatePrivacy
  } = Digit.Hooks.usePrivacyContext();
  if (isLoading || _privacy !== null && _privacy !== void 0 && _privacy.hide) {
    return null;
  }
  if (Digit.Utils.checkPrivacy(data, _privacy) && _iseyevisible) {
    sessionStorage.setItem("isPrivacyEnabled", "true");
    return /*#__PURE__*/React.createElement("span", {
      onClick: () => {
        if (unmaskData) {
          unmaskData();
        } else {
          sessionStorage.setItem("eyeIconClicked", _privacy === null || _privacy === void 0 ? void 0 : _privacy.fieldName);
          updatePrivacy(_privacy === null || _privacy === void 0 ? void 0 : _privacy.uuid, _privacy === null || _privacy === void 0 ? void 0 : _privacy.fieldName);
        }
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: `tooltip`
    }, /*#__PURE__*/React.createElement(PrivacyMaskIcon, {
      className: "privacy-icon",
      style: _style
    }), /*#__PURE__*/React.createElement("span", {
      className: "tooltiptext",
      style: {
        fontSize: "medium",
        width: "unset",
        display: "block",
        marginRight: "-60px"
      }
    }, t("CORE_UNMASK_DATA"))));
  }
  return null;
});
UnMaskComponent.propTypes = {
  privacy: propTypes.object
};
UnMaskComponent.defaultProps = {
  privacy: {
    uuid: "",
    fieldName: "",
    model: ""
  }
};

const RoundedLabel = ({
  count
}) => count ? /*#__PURE__*/React.createElement("div", {
  className: "roundedLabel"
}, count) : /*#__PURE__*/React.createElement(React.Fragment, null);

const TextField$1 = props => {
  const [value, setValue] = useState(props.selectedVal ? props.selectedVal : "");
  useEffect(() => {
    props.selectedVal ? setValue(props.selectedVal) : null;
  }, [props.selectedVal]);
  function inputChange(e) {
    setValue(e.target.value);
    props.setFilter(e.target.value);
  }
  return /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: value,
    onChange: inputChange,
    onClick: props.onClick
  });
};
const SectionalDropdown = props => {
  const [dropdownStatus, setDropdownStatus] = useState(false);
  const [selectedOption, setSelectedOption] = useState(props.selected ? props.selected : null);
  const [filterVal, setFilterVal] = useState("");
  useEffect(() => {
    setSelectedOption(props.selected);
  }, [props.selected]);
  function dropdownSwitch() {
    var current = dropdownStatus;
    setDropdownStatus(!current);
  }
  function dropdownOn() {
    setDropdownStatus(true);
  }
  function onSelect(selectedOption) {
    props.select(selectedOption);
    setSelectedOption(selectedOption);
    setDropdownStatus(false);
  }
  function setFilter(val) {
    setFilterVal(val);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "sect-dropdown-wrap",
    style: {
      ...props.style
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sect-dropdown-input-wrap"
  }, /*#__PURE__*/React.createElement(TextField$1, {
    setFilter: setFilter,
    selectedVal: selectedOption ? props.t ? props.t(props.displayKey ? selectedOption[props.displayKey] : selectedOption) : props.displayKey ? selectedOption[props.displayKey] : selectedOption : null,
    filterVal: filterVal,
    onClick: dropdownOn
  }), /*#__PURE__*/React.createElement(ArrowDown, {
    onClick: dropdownSwitch
  })), dropdownStatus ? /*#__PURE__*/React.createElement("div", {
    className: "sect-dropdown-card"
  }, props.menuData.filter(subMenu => subMenu.options.filter(option => option[props.displayKey].toUpperCase().includes(filterVal.toUpperCase()))).map((subMenu, index) => {
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: index
    }, /*#__PURE__*/React.createElement("h1", null, subMenu.heading), subMenu.options.map((option, index) => {
      return /*#__PURE__*/React.createElement("p", {
        key: index,
        onClick: () => onSelect(option)
      }, props.t ? props.t(option[props.displayKey]) : option[props.displayKey]);
    }));
  })) : null);
};

const LastRow = props => {
  return /*#__PURE__*/React.createElement("div", {
    styles: props.rowContainerStyle,
    className: "row-last"
  }, /*#__PURE__*/React.createElement("h2", null, props.label), /*#__PURE__*/React.createElement("p", null, props.text));
};
const Row = props => {
  let value = props.text;
  let valueStyle = props.textStyle || {};
  let labelStyle = props.labelStyle || {};
  if (Array.isArray(props.text) && !(props !== null && props !== void 0 && props.privacy)) {
    value = props.text.map((val, index) => {
      var _props$privacy2;
      if (val !== null && val !== void 0 && val.className) {
        var _val$value, _props$privacy;
        return /*#__PURE__*/React.createElement("p", {
          className: val === null || val === void 0 ? void 0 : val.className,
          style: val === null || val === void 0 ? void 0 : val.style,
          key: index
        }, val === null || val === void 0 ? void 0 : val.value, (props === null || props === void 0 ? void 0 : props.privacy) && /*#__PURE__*/React.createElement("span", {
          style: {
            display: "inline-flex",
            width: "fit-content"
          }
        }, /*#__PURE__*/React.createElement(WrapUnMaskComponent, {
          value: val === null || val === void 0 ? void 0 : val.value,
          iseyevisible: val !== null && val !== void 0 && (_val$value = val.value) !== null && _val$value !== void 0 && _val$value.includes("*") ? true : false,
          privacy: props === null || props === void 0 ? void 0 : (_props$privacy = props.privacy) === null || _props$privacy === void 0 ? void 0 : _props$privacy[index]
        })));
      }
      return /*#__PURE__*/React.createElement("p", {
        key: index
      }, val, (props === null || props === void 0 ? void 0 : props.privacy) && /*#__PURE__*/React.createElement("span", {
        style: {
          display: "inline-flex",
          width: "fit-content",
          marginLeft: "10px"
        }
      }, /*#__PURE__*/React.createElement(WrapUnMaskComponent, {
        value: val,
        iseyevisible: val !== null && val !== void 0 && val.includes("*") ? true : false,
        privacy: Array.isArray(props === null || props === void 0 ? void 0 : props.privacy) ? props === null || props === void 0 ? void 0 : (_props$privacy2 = props.privacy) === null || _props$privacy2 === void 0 ? void 0 : _props$privacy2[index] : props === null || props === void 0 ? void 0 : props.privacy
      })));
    });
  }
  if (Array !== null && Array !== void 0 && Array.isArray(props === null || props === void 0 ? void 0 : props.privacy) && Array.isArray(props === null || props === void 0 ? void 0 : props.text)) {
    var _props$text;
    return /*#__PURE__*/React.createElement("div", {
      style: props.rowContainerStyle,
      className: `${props.last ? "row last" : "row"} ${(props === null || props === void 0 ? void 0 : props.className) || ""}`
    }, /*#__PURE__*/React.createElement("h2", {
      style: labelStyle
    }, props.label), props === null || props === void 0 ? void 0 : (_props$text = props.text) === null || _props$text === void 0 ? void 0 : _props$text.map((ob, index) => {
      var _ob$value, _ob$value$toString, _props$privacy3;
      return /*#__PURE__*/React.createElement("div", {
        className: "value",
        style: index == 0 ? {
          ...valueStyle,
          wordBreak: "break-word",
          marginLeft: "28.5%",
          width: "20%"
        } : {
          ...valueStyle,
          wordBreak: "break-word",
          color: "grey",
          display: "inline",
          fontSize: "13px",
          paddingLeft: "10px"
        }
      }, /*#__PURE__*/React.createElement(WrapUnMaskComponent, {
        value: ob === null || ob === void 0 ? void 0 : ob.value,
        iseyevisible: ob !== null && ob !== void 0 && ob.value && ob !== null && ob !== void 0 && (_ob$value = ob.value) !== null && _ob$value !== void 0 && (_ob$value$toString = _ob$value.toString()) !== null && _ob$value$toString !== void 0 && _ob$value$toString.includes("*") ? true : false,
        privacy: props === null || props === void 0 ? void 0 : (_props$privacy3 = props.privacy) === null || _props$privacy3 === void 0 ? void 0 : _props$privacy3[index]
      }), props.caption && /*#__PURE__*/React.createElement("div", {
        className: "caption"
      }, props.caption));
    }), props.actionButton ? /*#__PURE__*/React.createElement("div", {
      style: props.actionButtonStyle,
      className: "action-button"
    }, props.actionButton) : null);
  } else {
    var _value, _value$toString, _props$privacy4;
    return /*#__PURE__*/React.createElement("div", {
      style: props.rowContainerStyle,
      className: `${props.last ? "row last" : "row"} ${(props === null || props === void 0 ? void 0 : props.className) || ""}`
    }, /*#__PURE__*/React.createElement("h2", {
      style: labelStyle
    }, props.label, props.labelChildren && props.labelChildren), /*#__PURE__*/React.createElement("div", {
      className: "value",
      style: {
        ...valueStyle
      }
    }, /*#__PURE__*/React.createElement(WrapUnMaskComponent, {
      value: value,
      iseyevisible: value && (_value = value) !== null && _value !== void 0 && (_value$toString = _value.toString()) !== null && _value$toString !== void 0 && _value$toString.includes("*") ? true : false,
      privacy: Array.isArray(props === null || props === void 0 ? void 0 : props.privacy) ? props === null || props === void 0 ? void 0 : (_props$privacy4 = props.privacy) === null || _props$privacy4 === void 0 ? void 0 : _props$privacy4[0] : props === null || props === void 0 ? void 0 : props.privacy
    }), props.caption && /*#__PURE__*/React.createElement("div", {
      className: "caption"
    }, props.caption)), props.actionButton ? /*#__PURE__*/React.createElement("div", {
      style: props.actionButtonStyle,
      className: "action-button"
    }, props.actionButton) : null);
  }
};
const MediaRow = props => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, props.label), /*#__PURE__*/React.createElement("span", null, props.children));
};
const StatusTable = props => {
  const employee = Digit.SessionStorage.get("user_type") === "employee" ? true : false;
  if (props.dataObject) {
    return /*#__PURE__*/React.createElement("div", {
      className: employee ? "employee-data-table" : "data-table",
      style: props.style
    }, Object.keys(props.dataObject).map((name, index) => {
      if (++index === Object.keys(props.dataObject).length) {
        return /*#__PURE__*/React.createElement(LastRow, {
          key: index,
          label: name,
          text: props.dataObject[name]
        });
      }
      return /*#__PURE__*/React.createElement(Row, {
        key: index,
        label: name,
        text: props.dataObject[name]
      });
    }));
  } else {
    return /*#__PURE__*/React.createElement("div", {
      className: employee ? "employee-data-table" : "data-table",
      style: props.style
    }, props.children);
  }
};

const StandaloneSearchBar = ({
  placeholder
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "StandaloneSearchBar"
  }, /*#__PURE__*/React.createElement(SearchIconSvg, null), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: placeholder
  }));
};

const ULBHomeCard = props => {
  const {
    t
  } = useTranslation();
  const state = Digit.ULBService.getStateId();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  const history = useHistory();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Card, {
    className: "fsm",
    style: {
      backgroundColor: "transparent",
      boxShadow: "none",
      paddingTop: "0"
    }
  }, /*#__PURE__*/React.createElement(CardHeader, null, " ", t(props.title), " "), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "30% 30% 30%",
      textAlign: "-webkit-center",
      justifyContent: "space-between"
    }
  }, props.module.map(i => {
    return /*#__PURE__*/React.createElement(Card, {
      style: {
        minWidth: "100px",
        cursor: "pointer"
      },
      onClick: () => i.hyperlink ? location.assign(i.link) : history.push(i.link),
      children: /*#__PURE__*/React.createElement(Fragment$1, null, " ", i.icon, " ", /*#__PURE__*/React.createElement("p", null, " ", t(i.name), " "), " ")
    });
  }))));
};

const noop = () => {};
const Table = ({
  className: _className = "table",
  t,
  data,
  columns,
  getCellProps,
  currentPage: _currentPage = 0,
  pageSizeLimit: _pageSizeLimit = 10,
  disableSort: _disableSort = true,
  autoSort: _autoSort = false,
  initSortId: _initSortId = "",
  onSearch: _onSearch = false,
  manualPagination: _manualPagination = true,
  totalRecords,
  onNextPage,
  onPrevPage,
  globalSearch,
  onSort: _onSort = noop,
  onPageSizeChange,
  onLastPage,
  onFirstPage,
  isPaginationRequired: _isPaginationRequired = true,
  sortParams: _sortParams = [],
  showAutoSerialNo: _showAutoSerialNo = false,
  customTableWrapperClassName: _customTableWrapperClassName = "",
  styles: _styles = {},
  tableTopComponent,
  tableRef,
  isReportTable: _isReportTable = false,
  inboxStyles
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: {
      pageIndex,
      pageSize,
      sortBy,
      globalFilter
    }
  } = useTable({
    columns,
    data,
    initialState: {
      pageIndex: _currentPage,
      pageSize: _pageSizeLimit,
      sortBy: _autoSort ? [{
        id: _initSortId,
        desc: false
      }] : _sortParams
    },
    pageCount: totalRecords > 0 ? Math.ceil(totalRecords / _pageSizeLimit) : -1,
    manualPagination: _manualPagination,
    disableMultiSort: false,
    disableSortBy: _disableSort,
    manualSortBy: _autoSort ? false : true,
    autoResetPage: false,
    autoResetSortBy: false,
    disableSortRemove: true,
    disableGlobalFilter: _onSearch === false ? true : false,
    globalFilter: globalSearch || "text",
    useControlledState: state => {
      return React.useMemo(() => ({
        ...state,
        pageIndex: _manualPagination ? _currentPage : state.pageIndex
      }));
    }
  }, useGlobalFilter, useSortBy, usePagination, useRowSelect);
  useEffect(() => {
    _onSort(sortBy);
  }, [_onSort, sortBy]);
  useEffect(() => setGlobalFilter(_onSearch), [_onSearch, setGlobalFilter]);
  const tref = useRef();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    ref: tref,
    style: tref.current && tref.current.offsetWidth < tref.current.scrollWidth ? {
      ...inboxStyles
    } : {}
  }, /*#__PURE__*/React.createElement("span", {
    className: _customTableWrapperClassName
  }, tableTopComponent ? tableTopComponent : null, /*#__PURE__*/React.createElement("table", Object.assign({
    className: _className
  }, getTableProps(), {
    style: _styles,
    ref: tableRef
  }), /*#__PURE__*/React.createElement("thead", null, headerGroups.map(headerGroup => /*#__PURE__*/React.createElement("tr", headerGroup.getHeaderGroupProps(), _showAutoSerialNo && /*#__PURE__*/React.createElement("th", {
    style: {
      verticalAlign: "top"
    }
  }, _showAutoSerialNo && typeof _showAutoSerialNo == "string" ? t(_showAutoSerialNo) : t("TB_SNO")), headerGroup.headers.map(column => /*#__PURE__*/React.createElement("th", Object.assign({}, column.getHeaderProps(column.getSortByToggleProps()), {
    style: {
      verticalAlign: "top"
    }
  }), column.render("Header"), /*#__PURE__*/React.createElement("span", null, column.isSorted ? column.isSortedDesc ? /*#__PURE__*/React.createElement(SortDown, null) : /*#__PURE__*/React.createElement(SortUp, null) : "")))))), /*#__PURE__*/React.createElement("tbody", getTableBodyProps(), page.map((row, i) => {
    prepareRow(row);
    return /*#__PURE__*/React.createElement("tr", row.getRowProps(), _showAutoSerialNo && /*#__PURE__*/React.createElement("td", null, i + 1), row.cells.map(cell => {
      return /*#__PURE__*/React.createElement("td", cell.getCellProps([getCellProps(cell)]), cell.attachment_link ? /*#__PURE__*/React.createElement("a", {
        style: {
          color: "#1D70B8"
        },
        href: cell.attachment_link
      }, cell.render("Cell")) : /*#__PURE__*/React.createElement(React.Fragment, null, " ", cell.render("Cell"), " "));
    }));
  }))))), _isPaginationRequired && /*#__PURE__*/React.createElement("div", {
    className: "pagination dss-white-pre"
  }, `${t("CS_COMMON_ROWS_PER_PAGE")} :`, /*#__PURE__*/React.createElement("select", {
    className: "cp",
    value: pageSize,
    style: {
      marginRight: "15px"
    },
    onChange: _manualPagination ? onPageSizeChange : e => setPageSize(Number(e.target.value))
  }, [10, 20, 30, 40, 50].map(pageSize => /*#__PURE__*/React.createElement("option", {
    key: pageSize,
    value: pageSize
  }, pageSize))), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", null, pageIndex * pageSize + 1, "-", _manualPagination ? (_currentPage + 1) * _pageSizeLimit > totalRecords ? totalRecords : (_currentPage + 1) * _pageSizeLimit : pageIndex * pageSize + (page === null || page === void 0 ? void 0 : page.length), " ", totalRecords ? `of ${_manualPagination ? totalRecords : rows.length}` : ""), " "), !_manualPagination && pageIndex != 0 && /*#__PURE__*/React.createElement(ArrowToFirst, {
    onClick: () => gotoPage(0),
    className: "cp"
  }), canPreviousPage && _manualPagination && onFirstPage && /*#__PURE__*/React.createElement(ArrowToFirst, {
    onClick: () => _manualPagination && onFirstPage(),
    className: "cp"
  }), canPreviousPage && /*#__PURE__*/React.createElement(ArrowBack, {
    onClick: () => _manualPagination ? onPrevPage() : previousPage(),
    className: "cp"
  }), canNextPage && /*#__PURE__*/React.createElement(ArrowForward, {
    onClick: () => _manualPagination ? onNextPage() : nextPage(),
    className: "cp"
  }), !_manualPagination && pageIndex != pageCount - 1 && /*#__PURE__*/React.createElement(ArrowToLast, {
    onClick: () => gotoPage(pageCount - 1),
    className: "cp"
  }), rows.length == _pageSizeLimit && canNextPage && _manualPagination && onLastPage && /*#__PURE__*/React.createElement(ArrowToLast, {
    onClick: () => _manualPagination && onLastPage(),
    className: "cp"
  })));
};

const TelePhone = ({
  mobile,
  text,
  privacy
}) => {
  const [unmaskedNumber, setunmaskedNumber] = useState("");
  return /*#__PURE__*/React.createElement(React.Fragment, null, text, /*#__PURE__*/React.createElement("div", {
    className: "telephone"
  }, /*#__PURE__*/React.createElement("div", {
    className: "call"
  }, /*#__PURE__*/React.createElement(Phone, {
    fillcolor: "FFFFFF",
    style: {
      marginLeft: "0px"
    }
  }), !privacy && /*#__PURE__*/React.createElement("a", {
    href: `tel:${mobile}`
  }, "+91", " ", mobile), privacy && unmaskedNumber === "" && /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(WrapUnMaskComponent, {
    value: `+91 ${mobile}`,
    iseyevisible: mobile !== null && mobile !== void 0 && mobile.includes("*") ? true : false,
    privacy: privacy,
    style: {
      marginBottom: "-4px"
    },
    setunmaskedNumber: setunmaskedNumber
  })), privacy && unmaskedNumber !== "" && /*#__PURE__*/React.createElement("a", {
    href: `tel:${unmaskedNumber}`
  }, unmaskedNumber))));
};
TelePhone.propTypes = {
  mobile: propTypes.any,
  text: propTypes.string
};
TelePhone.defaultProps = {
  mobile: "",
  text: ""
};

const TextArea = props => {
  const user_type = Digit.SessionStorage.get("userType");
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("textarea", {
    placeholder: props.placeholder,
    name: props.name,
    ref: props.inputRef,
    style: props.style,
    id: props.id,
    value: props.value,
    onChange: props.onChange,
    className: `${user_type !== "citizen" ? "employee-card-textarea" : "card-textarea"} ${props.disable && "disabled"} ${props !== null && props !== void 0 && props.className ? props === null || props === void 0 ? void 0 : props.className : ""}`,
    minLength: props.minLength,
    maxLength: props.maxLength,
    autoComplete: "off",
    disabled: props.disabled
  }), /*#__PURE__*/React.createElement("p", {
    className: "cell-text"
  }, props.hintText));
};
TextArea.propTypes = {
  userType: propTypes.string,
  name: propTypes.string.isRequired,
  ref: propTypes.func,
  value: propTypes.string,
  onChange: propTypes.func,
  id: propTypes.string
};
TextArea.defaultProps = {
  ref: undefined,
  onChange: undefined
};

const TextInput = props => {
  var _props$validation, _props$validation2, _props$validation3, _props$validation4, _props$validation5, _props$validation6, _props$validation7;
  const user_type = Digit.SessionStorage.get("userType");
  const [date, setDate] = useState();
  const data = props !== null && props !== void 0 && props.watch ? {
    fromDate: props === null || props === void 0 ? void 0 : props.watch("fromDate"),
    toDate: props === null || props === void 0 ? void 0 : props.watch("toDate")
  } : {};
  const handleDate = event => {
    const {
      value
    } = event.target;
    setDate(getDDMMYYYY(value));
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: `text-input ${user_type === "employee" ? "" : "text-input-width"} ${props.className}`,
    style: props !== null && props !== void 0 && props.textInputStyle ? {
      ...props.textInputStyle
    } : {}
  }, props.isMandatory ? /*#__PURE__*/React.createElement("input", {
    type: props !== null && props !== void 0 && props.validation && props.ValidationRequired ? props === null || props === void 0 ? void 0 : (_props$validation = props.validation) === null || _props$validation === void 0 ? void 0 : _props$validation.type : props.type || "text",
    name: props.name,
    id: props.id,
    className: `${user_type ? "employee-card-input-error" : "card-input-error"} ${props.disable && "disabled"}`,
    placeholder: props.placeholder,
    onChange: event => {
      if (props !== null && props !== void 0 && props.onChange) {
        props === null || props === void 0 ? void 0 : props.onChange(event);
      }
      if (props.type === "date") {
        handleDate(event);
      }
    },
    ref: props.inputRef,
    value: props.value,
    style: {
      ...props.style
    },
    defaultValue: props.defaultValue,
    minLength: props.minlength,
    maxLength: props.maxlength,
    max: props.max,
    pattern: props !== null && props !== void 0 && props.validation && props.ValidationRequired ? props === null || props === void 0 ? void 0 : (_props$validation2 = props.validation) === null || _props$validation2 === void 0 ? void 0 : _props$validation2.pattern : props.pattern,
    min: props.min,
    readOnly: props.disable,
    title: props !== null && props !== void 0 && props.validation && props.ValidationRequired ? props === null || props === void 0 ? void 0 : (_props$validation3 = props.validation) === null || _props$validation3 === void 0 ? void 0 : _props$validation3.title : props.title,
    step: props.step,
    autoFocus: props.autoFocus,
    onBlur: props.onBlur,
    autoComplete: "off",
    disabled: props.disabled
  }) : /*#__PURE__*/React.createElement("input", {
    type: props !== null && props !== void 0 && props.validation && props.ValidationRequired ? props === null || props === void 0 ? void 0 : (_props$validation4 = props.validation) === null || _props$validation4 === void 0 ? void 0 : _props$validation4.type : props.type || "text",
    name: props.name,
    id: props.id,
    className: `${user_type ? "employee-card-input" : "citizen-card-input"} ${props.disable && "disabled"} focus-visible ${props.errorStyle && "employee-card-input-error"}`,
    placeholder: props.placeholder,
    onChange: event => {
      if (props !== null && props !== void 0 && props.onChange) {
        props === null || props === void 0 ? void 0 : props.onChange(event);
      }
      if (props.type === "date") {
        handleDate(event);
      }
    },
    ref: props.inputRef,
    value: props.value,
    style: {
      ...props.style
    },
    defaultValue: props.defaultValue,
    minLength: props.minlength,
    maxLength: props.maxlength,
    max: props.max,
    required: props !== null && props !== void 0 && props.validation && props.ValidationRequired ? props === null || props === void 0 ? void 0 : (_props$validation5 = props.validation) === null || _props$validation5 === void 0 ? void 0 : _props$validation5.isRequired : props.isRequired || props.type === "date" && (props.name === "fromDate" ? data.toDate : data.fromDate),
    pattern: props !== null && props !== void 0 && props.validation && props.ValidationRequired ? props === null || props === void 0 ? void 0 : (_props$validation6 = props.validation) === null || _props$validation6 === void 0 ? void 0 : _props$validation6.pattern : props.pattern,
    min: props.min,
    readOnly: props.disable,
    title: props !== null && props !== void 0 && props.validation && props.ValidationRequired ? props === null || props === void 0 ? void 0 : (_props$validation7 = props.validation) === null || _props$validation7 === void 0 ? void 0 : _props$validation7.title : props.title,
    step: props.step,
    autoFocus: props.autoFocus,
    onBlur: props.onBlur,
    onKeyPress: props.onKeyPress,
    autoComplete: "off",
    disabled: props.disabled
  }), props.type === "date" && /*#__PURE__*/React.createElement(DatePicker$1, Object.assign({}, props, {
    date: date,
    setDate: setDate,
    data: data
  })), props.signature ? props.signatureImg : null));
};
TextInput.propTypes = {
  userType: propTypes.string,
  isMandatory: propTypes.bool,
  name: propTypes.string,
  placeholder: propTypes.string,
  onChange: propTypes.func,
  ref: propTypes.func,
  value: propTypes.any
};
TextInput.defaultProps = {
  isMandatory: false
};
function DatePicker$1(props) {
  useEffect(() => {
    if (props !== null && props !== void 0 && props.shouldUpdate) {
      props === null || props === void 0 ? void 0 : props.setDate(getDDMMYYYY(props === null || props === void 0 ? void 0 : props.data[props.name]));
    }
  }, [props === null || props === void 0 ? void 0 : props.data]);
  useEffect(() => {
    props.setDate(getDDMMYYYY(props === null || props === void 0 ? void 0 : props.defaultValue));
  }, []);
  return /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: `${props.disable && "disabled"} card-date-input`,
    name: props.name,
    id: props.id,
    placeholder: props.placeholder,
    defaultValue: props.date,
    readOnly: true
  });
}
function getDDMMYYYY(date) {
  if (!date) return "";
  return new Date(date).toLocaleString("en-In").split(",")[0];
}

const TopBar = ({
  img,
  isMobile,
  logoUrl,
  onLogout,
  toggleSidebar,
  ulb,
  userDetails,
  notificationCount,
  notificationCountLoaded,
  cityOfCitizenShownBesideLogo,
  onNotificationIconClick,
  hideNotificationIconOnSomeUrlsWhenNotLoggedIn,
  changeLanguage
}) => {
  const {
    pathname
  } = useLocation();
  return /*#__PURE__*/React.createElement("div", {
    className: "navbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "center-container back-wrapper",
    style: {
      display: "flex",
      marginRight: "2rem",
      marginLeft: "2rem",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hambuger-back-wrapper",
    style: {
      display: "flex"
    }
  }, window.innerWidth <= 660 && /*#__PURE__*/React.createElement(Hamburger, {
    handleClick: toggleSidebar
  }), /*#__PURE__*/React.createElement("a", {
    href: window.location.href.includes("citizen") ? "/digit-ui/citizen" : "/digit-ui/employee"
  }, /*#__PURE__*/React.createElement("img", {
    className: "city",
    id: "topbar-logo",
    src: "https://velocity-upyog-assets.s3.ap-south-1.amazonaws.com/coat-of-arms-of-chhattisgarh.svg.png" ,
    alt: "UPYOG"
  })), /*#__PURE__*/React.createElement("h3", null, cityOfCitizenShownBesideLogo)), /*#__PURE__*/React.createElement("div", {
    className: "RightMostTopBarOptions"
  }, !hideNotificationIconOnSomeUrlsWhenNotLoggedIn ? changeLanguage : null, !hideNotificationIconOnSomeUrlsWhenNotLoggedIn ? /*#__PURE__*/React.createElement("div", {
    className: "EventNotificationWrapper",
    onClick: onNotificationIconClick
  }, notificationCountLoaded && notificationCount ? /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("p", null, notificationCount)) : null, /*#__PURE__*/React.createElement(NotificationBell, null)) : null, /*#__PURE__*/React.createElement("h3", null), /*#__PURE__*/React.createElement("img", {
    className: "city",
    id: "topbar-logo",
    src: "https://velocity-upyog-assets.s3.ap-south-1.amazonaws.com/unicef_logo_432x150.png" ,
    alt: "unicef",
    style: {
      marginLeft: "10px"
    }
  }))));
};
TopBar.propTypes = {
  img: propTypes.string
};
TopBar.defaultProps = {
  img: undefined
};

const RemoveableTag = ({
  text,
  onClick,
  extraStyles,
  disabled: _disabled = false
}) => /*#__PURE__*/React.createElement("div", {
  className: "tag",
  style: extraStyles ? extraStyles === null || extraStyles === void 0 ? void 0 : extraStyles.tagStyles : {}
}, /*#__PURE__*/React.createElement("span", {
  className: "text",
  style: extraStyles ? extraStyles === null || extraStyles === void 0 ? void 0 : extraStyles.textStyles : {}
}, text), /*#__PURE__*/React.createElement("span", {
  onClick: _disabled ? null : onClick
}, /*#__PURE__*/React.createElement(Close, {
  className: "close",
  style: extraStyles ? extraStyles === null || extraStyles === void 0 ? void 0 : extraStyles.closeIconStyles : {}
})));

const getRandomId = () => {
  return Math.floor((Math.random() || 1) * 139);
};
const getCitizenStyles = value => {
  let citizenStyles = {};
  if (value == "propertyCreate") {
    citizenStyles = {
      textStyles: {
        whiteSpace: "nowrap",
        width: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        width: "80%"
      },
      tagStyles: {
        width: "90%",
        flexWrap: "nowrap"
      },
      inputStyles: {
        width: "44%",
        minHeight: "2rem",
        maxHeight: "3rem",
        top: "20%"
      },
      buttonStyles: {
        height: "auto",
        minHeight: "2rem",
        width: "40%",
        maxHeight: "3rem"
      },
      tagContainerStyles: {
        width: "60%",
        display: "flex",
        marginTop: "0px"
      },
      closeIconStyles: {
        width: "20px"
      },
      containerStyles: {
        padding: "10px",
        marginTop: "0px"
      }
    };
  } else if (value == "IP") {
    citizenStyles = {
      textStyles: {
        whiteSpace: "nowrap",
        maxWidth: "250px",
        overflow: "hidden",
        textOverflow: "ellipsis"
      },
      tagStyles: {
        marginLeft: "-30px"
      },
      inputStyles: {},
      closeIconStyles: {
        position: "absolute",
        marginTop: "-12px"
      },
      buttonStyles: {},
      tagContainerStyles: {}
    };
  } else if (value == "OBPS") {
    citizenStyles = {
      containerStyles: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexWrap: "wrap",
        margin: "0px",
        padding: "0px"
      },
      tagContainerStyles: {
        margin: "0px",
        padding: "0px",
        width: "46%"
      },
      tagStyles: {
        height: "auto",
        padding: "5px",
        margin: 0,
        width: "100%",
        margin: "5px"
      },
      textStyles: {
        wordBreak: "break-word",
        height: "auto",
        lineHeight: "16px",
        overflow: "hidden",
        maxHeight: "34px"
      },
      inputStyles: {
        width: "43%",
        minHeight: "42px",
        maxHeight: "42px",
        top: "5px",
        left: "5px"
      },
      buttonStyles: {
        height: "auto",
        minHeight: "40px",
        width: "43%",
        maxHeight: "40px",
        margin: "5px",
        padding: "0px"
      },
      closeIconStyles: {
        width: "20px"
      },
      uploadFile: {
        minHeight: "50px"
      }
    };
  } else {
    citizenStyles = {
      textStyles: {},
      tagStyles: {},
      inputStyles: {},
      buttonStyles: {},
      tagContainerStyles: {}
    };
  }
  return citizenStyles;
};
const UploadFile = props => {
  var _inpRef$current, _extraStyles, _extraStyles2, _extraStyles3, _extraStyles4, _props$uploadedFiles, _extraStyles6, _extraStyles7, _extraStyles8, _inpRef$current$files, _inpRef$current$files2, _props$file, _extraStyles9, _extraStyles10;
  const {
    t
  } = useTranslation();
  const inpRef = useRef();
  const [hasFile, setHasFile] = useState(false);
  const [prevSate, setprevSate] = useState(null);
  const user_type = Digit.SessionStorage.get("userType");
  let extraStyles = {};
  const handleChange = () => {
    if (inpRef.current.files[0]) {
      setHasFile(true);
      setprevSate(inpRef.current.files[0]);
    } else setHasFile(false);
  };
  extraStyles = getCitizenStyles("OBPS");
  const handleDelete = () => {
    inpRef.current.value = "";
    props.onDelete();
  };
  const handleEmpty = () => {
    if (inpRef.current.files.length <= 0 && prevSate !== null) {
      inpRef.current.value = "";
      props.onDelete();
    }
  };
  if (props.uploadMessage && inpRef.current.value) {
    handleDelete();
    setHasFile(false);
  }
  useEffect(() => handleEmpty(), [inpRef === null || inpRef === void 0 ? void 0 : (_inpRef$current = inpRef.current) === null || _inpRef$current === void 0 ? void 0 : _inpRef$current.files]);
  useEffect(() => handleChange(), [props.message]);
  const showHint = (props === null || props === void 0 ? void 0 : props.showHint) || false;
  return /*#__PURE__*/React.createElement(Fragment$1, null, showHint && /*#__PURE__*/React.createElement("p", {
    className: "cell-text"
  }, t(props === null || props === void 0 ? void 0 : props.hintText)), /*#__PURE__*/React.createElement("div", {
    className: `upload-file ${user_type === "employee" ? "" : "upload-file-max-width"} ${props.disabled ? " disabled" : ""}`,
    style: (_extraStyles = extraStyles) !== null && _extraStyles !== void 0 && _extraStyles.uploadFile ? (_extraStyles2 = extraStyles) === null || _extraStyles2 === void 0 ? void 0 : _extraStyles2.uploadFile : {}
  }, /*#__PURE__*/React.createElement("div", {
    style: extraStyles ? (_extraStyles3 = extraStyles) === null || _extraStyles3 === void 0 ? void 0 : _extraStyles3.containerStyles : null
  }, /*#__PURE__*/React.createElement(ButtonSelector, {
    theme: "border",
    label: t("CS_COMMON_CHOOSE_FILE"),
    style: {
      ...(extraStyles ? (_extraStyles4 = extraStyles) === null || _extraStyles4 === void 0 ? void 0 : _extraStyles4.buttonStyles : {}),
      ...(props.disabled ? {
        display: "none"
      } : {})
    },
    textStyles: props === null || props === void 0 ? void 0 : props.textStyles,
    type: props.buttonType
  }), props === null || props === void 0 ? void 0 : (_props$uploadedFiles = props.uploadedFiles) === null || _props$uploadedFiles === void 0 ? void 0 : _props$uploadedFiles.map((file, index) => {
    var _extraStyles5;
    const fileDetailsData = file[1];
    return /*#__PURE__*/React.createElement("div", {
      className: "tag-container",
      style: extraStyles ? (_extraStyles5 = extraStyles) === null || _extraStyles5 === void 0 ? void 0 : _extraStyles5.tagContainerStyles : null
    }, /*#__PURE__*/React.createElement(RemoveableTag, {
      extraStyles: extraStyles,
      key: index,
      text: file[0],
      onClick: e => props === null || props === void 0 ? void 0 : props.removeTargetedFile(fileDetailsData, e)
    }));
  }), !hasFile || props.error ? /*#__PURE__*/React.createElement("h2", {
    className: "file-upload-status"
  }, props.message) : /*#__PURE__*/React.createElement("div", {
    className: "tag-container",
    style: extraStyles ? (_extraStyles6 = extraStyles) === null || _extraStyles6 === void 0 ? void 0 : _extraStyles6.tagContainerStyles : null
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag",
    style: extraStyles ? (_extraStyles7 = extraStyles) === null || _extraStyles7 === void 0 ? void 0 : _extraStyles7.tagStyles : null
  }, /*#__PURE__*/React.createElement("span", {
    className: "text",
    style: extraStyles ? (_extraStyles8 = extraStyles) === null || _extraStyles8 === void 0 ? void 0 : _extraStyles8.textStyles : null
  }, typeof ((_inpRef$current$files = inpRef.current.files[0]) === null || _inpRef$current$files === void 0 ? void 0 : _inpRef$current$files.name) !== "undefined" && !(props !== null && props !== void 0 && props.file) ? (_inpRef$current$files2 = inpRef.current.files[0]) === null || _inpRef$current$files2 === void 0 ? void 0 : _inpRef$current$files2.name : (_props$file = props.file) === null || _props$file === void 0 ? void 0 : _props$file.name), /*#__PURE__*/React.createElement("span", {
    onClick: () => handleDelete(),
    style: extraStyles ? (_extraStyles9 = extraStyles) === null || _extraStyles9 === void 0 ? void 0 : _extraStyles9.closeIconStyles : null
  }, /*#__PURE__*/React.createElement(Close, {
    style: props.Multistyle,
    className: "close"
  }))))), /*#__PURE__*/React.createElement("input", {
    className: props.disabled ? "disabled" : "" + "input-mirror-selector-button",
    style: extraStyles ? {
      ...((_extraStyles10 = extraStyles) === null || _extraStyles10 === void 0 ? void 0 : _extraStyles10.inputStyles),
      ...(props === null || props === void 0 ? void 0 : props.inputStyles)
    } : {
      ...(props === null || props === void 0 ? void 0 : props.inputStyles)
    },
    ref: inpRef,
    type: "file",
    id: props.id || `document-${getRandomId()}`,
    name: "file",
    multiple: props.multiple,
    accept: props.accept,
    disabled: props.disabled,
    onChange: e => props.onUpload(e),
    onClick: event => {
      const {
        target = {}
      } = event || {};
      target.value = "";
    }
  })), props.iserror && /*#__PURE__*/React.createElement("p", {
    style: {
      color: "red"
    }
  }, props.iserror), (props === null || props === void 0 ? void 0 : props.showHintBelow) && /*#__PURE__*/React.createElement("p", {
    className: "cell-text"
  }, t(props === null || props === void 0 ? void 0 : props.hintText)));
};

const Option = ({
  name,
  Icon,
  onClick,
  className
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: className || `CardBasedOptionsMainChildOption`,
    onClick: onClick
  }, /*#__PURE__*/React.createElement("div", {
    className: "ChildOptionImageWrapper"
  }, Icon), /*#__PURE__*/React.createElement("p", {
    className: "ChildOptionName"
  }, name));
};
const CardBasedOptions = ({
  header,
  sideOption,
  options,
  styles: _styles = {},
  style: _style = {}
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "CardBasedOptions",
    style: _style
  }, /*#__PURE__*/React.createElement("div", {
    className: "employeeCustomCard",
    style: {
      width: "100%",
      height: "80%",
      position: "relative",
      display: "flex",
      fontSize: "1.2rem",
      fontWeight: "700"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      width: "70%",
      padding: "20px",
      height: "fit-content",
      color: "white"
    }
  }, header), /*#__PURE__*/React.createElement("button", {
    type: "button",
    class: "inboxButton",
    onClick: sideOption.onClick
  }, sideOption.name), /*#__PURE__*/React.createElement("div", {
    className: "employee-card-banner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "body",
    style: {
      margin: "0px",
      padding: "0px",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mainContent citizenAllServiceGrid",
    style: {
      display: "flex"
    }
  }, options.map((props, index) => /*#__PURE__*/React.createElement(Option, Object.assign({
    key: index
  }, props))))))));
};

const WhatsNewCard = ({
  header,
  actions,
  eventNotificationText,
  timePastAfterEventCreation,
  timeApproxiamationInUnits
}) => {
  const {
    t
  } = useTranslation();
  const getTransformedLocale = label => {
    if (typeof label === "number") return label;
    return label && label.toUpperCase().replace(/[.:-\s\/]/g, "_");
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "WhatsNewCard"
  }, /*#__PURE__*/React.createElement("h2", null, t(header)), /*#__PURE__*/React.createElement("p", null, eventNotificationText), actions === null || actions === void 0 ? void 0 : actions.map(i => /*#__PURE__*/React.createElement("a", {
    href: i === null || i === void 0 ? void 0 : i.actionUrl
  }, `${t(`CS_COMMON_${getTransformedLocale(i === null || i === void 0 ? void 0 : i.code)}`)}`)), /*#__PURE__*/React.createElement("p", null, timePastAfterEventCreation + ` ${t(timeApproxiamationInUnits)}`));
};

const EventCalendarView = ({
  onGroundEventMonth,
  onGroundEventDate
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "EventCalendarView"
  }, /*#__PURE__*/React.createElement("div", {
    className: "MonthViewInEventCalendar"
  }, /*#__PURE__*/React.createElement("h2", null, onGroundEventMonth)), /*#__PURE__*/React.createElement("div", {
    className: "DateViewInEventCalendar"
  }, /*#__PURE__*/React.createElement("h2", null, onGroundEventDate)));
};

const InboxLinks = ({
  logoIcon,
  headerText,
  links
}) => {
  const {
    t
  } = useTranslation();
  const GetLogo = () => /*#__PURE__*/React.createElement("div", {
    className: "header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "logo"
  }, logoIcon), " ", /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, t(headerText)));
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
    }, t(text)) : /*#__PURE__*/React.createElement(Link, {
      to: link
    }, t(text)));
  }))));
};

const PopupHeadingLabel = ({
  IconSVG,
  headingLabel,
  onResetSortForm
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "popupModalHeading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "headingIconAndLabel"
  }, /*#__PURE__*/React.createElement(IconSVG, null), /*#__PURE__*/React.createElement("h3", null, headingLabel, ":")), /*#__PURE__*/React.createElement("span", {
    className: "popupResetFormButton",
    onClick: onResetSortForm
  }, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 16 22",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8 5V8L12 4L8 0V3C3.58 3 0 6.58 0 11C0 12.57 0.46 14.03 1.24 15.26L2.7 13.8C2.25 12.97 2 12.01 2 11C2 7.69 4.69 5 8 5ZM14.76 6.74L13.3 8.2C13.74 9.04 14 9.99 14 11C14 14.31 11.31 17 8 17V14L4 18L8 22V19C12.42 19 16 15.42 16 11C16 9.43 15.54 7.97 14.76 6.74Z",
    fill: "#505A5F"
  }))));
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

const FormComposer = props => {
  var _props$appData3;
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch,
    trigger,
    control,
    formState,
    errors,
    setError,
    clearErrors,
    unregister
  } = useForm({
    defaultValues: props.defaultValues
  });
  const {
    t
  } = useTranslation();
  const formData = watch();
  useEffect(() => {
    var _props$appData, _props$appData$Connec, _props$appData$Connec2, _Object$keys, _props$appData2, _props$appData2$Conne, _formData$ConnectionH;
    const iseyeIconClicked = sessionStorage.getItem("eyeIconClicked");
    if (props !== null && props !== void 0 && props.appData && !(props !== null && props !== void 0 && (_props$appData = props.appData) !== null && _props$appData !== void 0 && (_props$appData$Connec = _props$appData.ConnectionHolderDetails) !== null && _props$appData$Connec !== void 0 && (_props$appData$Connec2 = _props$appData$Connec[0]) !== null && _props$appData$Connec2 !== void 0 && _props$appData$Connec2.sameAsOwnerDetails) && iseyeIconClicked && ((_Object$keys = Object.keys(props === null || props === void 0 ? void 0 : props.appData)) === null || _Object$keys === void 0 ? void 0 : _Object$keys.length) > 0 && !lodash.isEqual(props === null || props === void 0 ? void 0 : (_props$appData2 = props.appData) === null || _props$appData2 === void 0 ? void 0 : (_props$appData2$Conne = _props$appData2.ConnectionHolderDetails) === null || _props$appData2$Conne === void 0 ? void 0 : _props$appData2$Conne[0], formData === null || formData === void 0 ? void 0 : (_formData$ConnectionH = formData.ConnectionHolderDetails) === null || _formData$ConnectionH === void 0 ? void 0 : _formData$ConnectionH[0])) {
      reset({
        ...(props === null || props === void 0 ? void 0 : props.appData)
      });
    }
  }, [props === null || props === void 0 ? void 0 : props.appData, formData, props === null || props === void 0 ? void 0 : (_props$appData3 = props.appData) === null || _props$appData3 === void 0 ? void 0 : _props$appData3.ConnectionHolderDetails]);
  useEffect(() => {
    props.getFormAccessors && props.getFormAccessors({
      setValue,
      getValues
    });
  }, []);
  function onSubmit(data) {
    props.onSubmit(data);
  }
  function onSecondayActionClick(data) {
    props.onSecondayActionClick();
  }
  useEffect(() => {
    props.onFormValueChange && props.onFormValueChange(setValue, formData, formState);
  }, [formData]);
  const fieldSelector = (type, populators, isMandatory, disable = false, component, config) => {
    const Component = typeof component === "string" ? Digit.ComponentRegistryService.getComponent(component) : component;
    switch (type) {
      case "text":
      case "date":
      case "number":
      case "password":
      case "time":
        return /*#__PURE__*/React.createElement("div", {
          className: "field-container"
        }, populators !== null && populators !== void 0 && populators.componentInFront ? /*#__PURE__*/React.createElement("span", {
          className: `component-in-front ${disable && "disabled"}`
        }, populators.componentInFront) : null, /*#__PURE__*/React.createElement(TextInput, Object.assign({
          className: "field"
        }, populators, {
          inputRef: register(populators.validation),
          isRequired: isMandatory,
          type: type,
          disable: disable,
          watch: watch
        })));
      case "textarea":
        return /*#__PURE__*/React.createElement(TextArea, Object.assign({
          className: "field",
          name: (populators === null || populators === void 0 ? void 0 : populators.name) || ""
        }, populators, {
          inputRef: register(populators.validation),
          disable: disable
        }));
      case "mobileNumber":
        return /*#__PURE__*/React.createElement(Controller, {
          render: props => /*#__PURE__*/React.createElement(MobileNumber, {
            className: "field",
            onChange: props.onChange,
            value: props.value,
            disable: disable
          }),
          defaultValue: populators.defaultValue,
          name: populators === null || populators === void 0 ? void 0 : populators.name,
          control: control
        });
      case "custom":
        return /*#__PURE__*/React.createElement(Controller, {
          render: props => populators.component({
            ...props,
            setValue
          }, populators.customProps),
          defaultValue: populators.defaultValue,
          name: populators === null || populators === void 0 ? void 0 : populators.name,
          control: control
        });
      case "component":
        return /*#__PURE__*/React.createElement(Controller, {
          render: props => /*#__PURE__*/React.createElement(Component, {
            userType: "employee",
            t: t,
            setValue: setValue,
            onSelect: setValue,
            config: config,
            data: formData,
            formData: formData,
            register: register,
            errors: errors,
            props: props,
            setError: setError,
            clearErrors: clearErrors,
            formState: formState,
            onBlur: props.onBlur
          }),
          name: config.key,
          control: control
        });
      case "form":
        return /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement(Component, {
          userType: "employee",
          t: t,
          setValue: setValue,
          onSelect: setValue,
          config: config,
          data: formData,
          formData: formData,
          register: register,
          errors: errors,
          setError: setError,
          clearErrors: clearErrors,
          formState: formState,
          control: control
        }));
      default:
        return (populators === null || populators === void 0 ? void 0 : populators.dependency) !== false ? populators : null;
    }
  };
  const getCombinedStyle = placementinBox => {
    switch (placementinBox) {
      case 0:
        return {
          border: "solid",
          borderRadius: "5px",
          padding: "10px",
          paddingTop: "20px",
          marginTop: "10px",
          borderColor: "#f3f3f3",
          background: "#FAFAFA",
          marginBottom: "20px"
        };
      case 1:
        return {
          border: "solid",
          borderRadius: "5px",
          padding: "10px",
          paddingTop: "20px",
          marginTop: "-30px",
          borderColor: "#f3f3f3",
          background: "#FAFAFA",
          borderTop: "0px",
          borderBottom: "0px"
        };
      case 2:
        return {
          border: "solid",
          borderRadius: "5px",
          padding: "10px",
          paddingTop: "20px",
          marginTop: "-30px",
          borderColor: "#f3f3f3",
          background: "#FAFAFA",
          marginBottom: "20px",
          borderTop: "0px"
        };
    }
  };
  const titleStyle = {
    color: "#505A5F",
    fontWeight: "700",
    fontSize: "16px"
  };
  const getCombinedComponent = section => {
    if (section.head && section.subHead) {
      return /*#__PURE__*/React.createElement(Fragment$1, null, /*#__PURE__*/React.createElement(CardSectionHeader, {
        style: props !== null && props !== void 0 && props.sectionHeadStyle ? props === null || props === void 0 ? void 0 : props.sectionHeadStyle : {
          margin: "5px 0px"
        },
        id: section.headId
      }, t(section.head)), /*#__PURE__*/React.createElement(CardSectionHeader, {
        style: titleStyle,
        id: `${section.headId}_DES`
      }, t(section.subHead)));
    } else if (section.head) {
      return /*#__PURE__*/React.createElement(Fragment$1, null, /*#__PURE__*/React.createElement(CardSectionHeader, {
        style: props !== null && props !== void 0 && props.sectionHeadStyle ? props === null || props === void 0 ? void 0 : props.sectionHeadStyle : {},
        id: section.headId
      }, t(section.head)));
    } else {
      return /*#__PURE__*/React.createElement("div", null);
    }
  };
  const formFields = useMemo(() => {
    var _props$config;
    return (_props$config = props.config) === null || _props$config === void 0 ? void 0 : _props$config.map((section, index, array) => {
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: index
      }, section && getCombinedComponent(section), section.body.map((field, index) => {
        var _field$populators, _field$populators2, _errors$field$populat, _field$populators3, _field$populators4, _field$populators5, _field$populators6, _field$populators7;
        if (props.inline) return /*#__PURE__*/React.createElement(React.Fragment, {
          key: index
        }, /*#__PURE__*/React.createElement("div", {
          style: field.isInsideBox ? getCombinedStyle(field === null || field === void 0 ? void 0 : field.placementinbox) : {}
        }, !field.withoutLabel && /*#__PURE__*/React.createElement(CardLabel, {
          style: {
            color: field.isSectionText ? "#505A5F" : "",
            marginBottom: props.inline ? "8px" : "revert"
          },
          className: field !== null && field !== void 0 && field.disable ? "disabled" : ""
        }, t(field.label), field.isMandatory ? " * " : null, field.labelChildren && field.labelChildren), errors && errors[(_field$populators = field.populators) === null || _field$populators === void 0 ? void 0 : _field$populators.name] && Object.keys(errors[(_field$populators2 = field.populators) === null || _field$populators2 === void 0 ? void 0 : _field$populators2.name]).length ? /*#__PURE__*/React.createElement(CardLabelError, null, t(field.populators.error || ((_errors$field$populat = errors[(_field$populators3 = field.populators) === null || _field$populators3 === void 0 ? void 0 : _field$populators3.name]) === null || _errors$field$populat === void 0 ? void 0 : _errors$field$populat.message))) : null, /*#__PURE__*/React.createElement("div", {
          style: field.withoutLabel ? {
            width: "100%"
          } : {},
          className: "field"
        }, fieldSelector(field.type, field.populators, field.isMandatory, field === null || field === void 0 ? void 0 : field.disable, field === null || field === void 0 ? void 0 : field.component, field), (field === null || field === void 0 ? void 0 : field.description) && /*#__PURE__*/React.createElement(CardLabel, {
          style: {
            marginTop: "-24px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#505A5F",
            ...(field === null || field === void 0 ? void 0 : field.descriptionStyles)
          }
        }, t(field.description)))));
        return /*#__PURE__*/React.createElement(Fragment$1, null, /*#__PURE__*/React.createElement(LabelFieldPair, {
          key: index
        }, !field.withoutLabel && /*#__PURE__*/React.createElement(CardLabel, {
          style: {
            color: field.isSectionText ? "#505A5F" : "",
            marginBottom: props.inline ? "8px" : "revert"
          }
        }, t(field.label), field.isMandatory ? " * " : null, field.labelChildren && field.labelChildren), /*#__PURE__*/React.createElement("div", {
          style: field.withoutLabel ? {
            width: "100%",
            ...(props === null || props === void 0 ? void 0 : props.fieldStyle)
          } : {},
          className: "field"
        }, fieldSelector(field.type, field.populators, field.isMandatory, field === null || field === void 0 ? void 0 : field.disable, field === null || field === void 0 ? void 0 : field.component, field), (field === null || field === void 0 ? void 0 : field.description) && /*#__PURE__*/React.createElement(CardText, {
          style: {
            fontSize: "14px",
            marginTop: "-24px"
          }
        }, t(field === null || field === void 0 ? void 0 : field.description)))), field !== null && field !== void 0 && (_field$populators4 = field.populators) !== null && _field$populators4 !== void 0 && _field$populators4.name && errors && errors[field === null || field === void 0 ? void 0 : (_field$populators5 = field.populators) === null || _field$populators5 === void 0 ? void 0 : _field$populators5.name] && Object.keys(errors[field === null || field === void 0 ? void 0 : (_field$populators6 = field.populators) === null || _field$populators6 === void 0 ? void 0 : _field$populators6.name]).length ? /*#__PURE__*/React.createElement(CardLabelError, {
          style: {
            width: "70%",
            marginLeft: "30%",
            fontSize: "12px",
            marginTop: "-21px"
          }
        }, t(field === null || field === void 0 ? void 0 : (_field$populators7 = field.populators) === null || _field$populators7 === void 0 ? void 0 : _field$populators7.error)) : null);
      }), !props.noBreakLine && (array.length - 1 === index ? null : /*#__PURE__*/React.createElement(BreakLine, {
        style: props !== null && props !== void 0 && props.breaklineStyle ? props === null || props === void 0 ? void 0 : props.breaklineStyle : {}
      })));
    });
  }, [props.config, formData]);
  const getCardStyles = () => {
    let styles = props.cardStyle || {};
    if (props.noBoxShadow) styles = {
      ...styles,
      boxShadow: "none"
    };
    return styles;
  };
  const isDisabled = props.isDisabled || false;
  const checkKeyDown = e => {
    const keyCode = e.keyCode ? e.keyCode : e.key ? e.key : e.which;
    if (keyCode === 13) {
      e.preventDefault();
    }
  };
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit(onSubmit),
    onKeyDown: e => checkKeyDown(e),
    id: props.formId,
    className: props.className
  }, /*#__PURE__*/React.createElement(Card, {
    style: getCardStyles(),
    className: props !== null && props !== void 0 && props.cardClassName ? props.cardClassName : ""
  }, !props.childrenAtTheBottom && props.children, props.heading && /*#__PURE__*/React.createElement(CardSubHeader, {
    style: {
      ...props.headingStyle
    }
  }, " ", props.heading, " "), props.description && /*#__PURE__*/React.createElement(CardLabelDesc, {
    className: "repos"
  }, " ", props.description, " "), props.text && /*#__PURE__*/React.createElement(CardText, null, props.text), formFields, props.childrenAtTheBottom && props.children, props.submitInForm && /*#__PURE__*/React.createElement(SubmitBar, {
    label: t(props.label),
    style: {
      ...(props === null || props === void 0 ? void 0 : props.buttonStyle)
    },
    submit: "submit",
    disabled: isDisabled,
    className: "w-full"
  }), props.secondaryActionLabel && /*#__PURE__*/React.createElement("div", {
    className: "primary-label-btn",
    style: {
      margin: "20px auto 0 auto"
    },
    onClick: onSecondayActionClick
  }, props.secondaryActionLabel), !props.submitInForm && props.label && /*#__PURE__*/React.createElement(ActionBar, null, /*#__PURE__*/React.createElement(SubmitBar, {
    label: t(props.label),
    submit: "submit",
    disabled: isDisabled
  }), props.onSkip && props.showSkip && /*#__PURE__*/React.createElement(LinkButton, {
    style: props === null || props === void 0 ? void 0 : props.skipStyle,
    label: t(`CS_SKIP_CONTINUE`),
    onClick: props.onSkip
  }))));
};

const ResponseComposer = ({
  data,
  template,
  actionButtonLabel,
  onSubmit
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", null, data.map((result, i) => {
    return /*#__PURE__*/React.createElement(Card, {
      key: i,
      className: "box-shadow-none"
    }, template.map((field, j) => {
      var _result$privacy, _result$privacy2;
      return /*#__PURE__*/React.createElement(KeyNote, {
        key: i + "" + j,
        keyValue: t(field.label),
        note: field.notePrefix ? field.notePrefix + result[field.key] : result[field.key],
        noteStyle: field.noteStyle,
        privacy: result !== null && result !== void 0 && (_result$privacy = result.privacy) !== null && _result$privacy !== void 0 && _result$privacy[field.key] ? result === null || result === void 0 ? void 0 : (_result$privacy2 = result.privacy) === null || _result$privacy2 === void 0 ? void 0 : _result$privacy2[field.key] : null
      });
    }), actionButtonLabel && result.status !== "INACTIVE" && /*#__PURE__*/React.createElement(SubmitBar, {
      submit: false,
      label: t(actionButtonLabel),
      onSubmit: () => {
        onSubmit(result);
      },
      disabled: (result === null || result === void 0 ? void 0 : result.AmountDue) === "0" ? true : false
    }), result.status === "INACTIVE" && /*#__PURE__*/React.createElement(CitizenInfoLabel, {
      style: {
        margin: "0px"
      },
      info: t("CS_FILE_APPLICATION_INFO_LABEL"),
      text: t("CS_INACTIVE_PROPERTY_NOT_ELIGIBLE")
    }), result.status === "INACTIVE" && /*#__PURE__*/React.createElement(CitizenInfoLabel, {
      style: {
        margin: "0px"
      },
      info: t("CS_FILE_APPLICATION_INFO_LABEL"),
      text: t("CS_INACTIVE_PROPERTY_NOT_ELIGIBLE")
    }));
  }));
};
ResponseComposer.propTypes = {
  data: propTypes.array,
  template: propTypes.array,
  actionButtonLabel: propTypes.string,
  onSubmit: propTypes.func
};
ResponseComposer.defaultProps = {
  data: [],
  template: [],
  actionButtonLabel: "",
  onSubmit: () => {}
};

const SearchField = ({
  children,
  className
}) => {
  const isMobile = window.Digit.Utils.browser.isMobile();
  const isEnabledCommonModules = window.location.href.includes("/obps/") || window.location.href.includes("/noc/");
  const disbaleModules = window.location.href.includes("obps/search") || window.location.href.includes("noc/search");
  if (isEnabledCommonModules && !isMobile && !disbaleModules) {
    return /*#__PURE__*/React.createElement("div", {
      className: `input-fields`,
      style: {
        marginTop: "5px"
      }
    }, children);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: `form-field ${className || ""}`
  }, children);
};
const SearchForm = ({
  children,
  onSubmit,
  handleSubmit,
  id,
  className: _className = ""
}) => {
  const isMobile = window.Digit.Utils.browser.isMobile();
  const isEnabledCommonModules = window.location.href.includes("/obps/") || window.location.href.includes("/noc/");
  const disbaleModules = window.location.href.includes("obps/search") || window.location.href.includes("noc/search");
  if (isEnabledCommonModules && !isMobile && !disbaleModules) {
    return /*#__PURE__*/React.createElement("form", Object.assign({
      onSubmit: handleSubmit(onSubmit)
    }, {
      id
    }), children);
  }
  return /*#__PURE__*/React.createElement("form", Object.assign({
    className: `search-form-wrapper ${_className}`,
    onSubmit: handleSubmit(onSubmit)
  }, {
    id
  }), children);
};

const FilterFormField = ({
  children,
  className
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: `filter-form-field ${className}`
  }, children);
};
const FilterForm = ({
  onMobileExclusiveFilterPopupFormClose: _onMobileExclusiveFilterPopupFormClose = () => null,
  closeButton: _closeButton = () => null,
  showMobileFilterFormPopup: _showMobileFilterFormPopup = false,
  children,
  id: _id = "",
  onSubmit,
  handleSubmit,
  onResetFilterForm: _onResetFilterForm = () => null,
  className: _className = ""
}) => {
  const {
    t
  } = useTranslation();
  const isMobile = window.Digit.Utils.browser.isMobile();
  const isEnabledCommonModules = window.location.href.includes("/obps/") || window.location.href.includes("/noc/");
  return /*#__PURE__*/React.createElement("div", {
    className: isEnabledCommonModules && !isMobile ? `filter ${_className}` : `filter-form ${_className}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "filter-card"
  }, _closeButton(), /*#__PURE__*/React.createElement("div", {
    className: "heading",
    style: {
      alignItems: "center",
      gap: ".75rem",
      marginBottom: "24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "filter-label",
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 22 22",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0.66666 2.48016C3.35999 5.9335 8.33333 12.3335 8.33333 12.3335V20.3335C8.33333 21.0668 8.93333 21.6668 9.66666 21.6668H12.3333C13.0667 21.6668 13.6667 21.0668 13.6667 20.3335V12.3335C13.6667 12.3335 18.6267 5.9335 21.32 2.48016C22 1.60016 21.3733 0.333496 20.2667 0.333496H1.71999C0.613327 0.333496 -0.01334 1.60016 0.66666 2.48016Z",
    fill: "#505A5F"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "8px",
      fontWeight: "normal"
    }
  }, t("FILTERS_FILTER_CARD_CAPTION"), ":")), /*#__PURE__*/React.createElement("div", {
    className: "clearAll",
    onClick: _onResetFilterForm
  }, t("ES_COMMON_CLEAR_ALL")), /*#__PURE__*/React.createElement("span", {
    className: "clear-search",
    onClick: _onResetFilterForm,
    style: {
      border: "1px solid #e0e0e0",
      padding: "6px",
      marginBottom: "10px"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 16 22",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8 5V8L12 4L8 0V3C3.58 3 0 6.58 0 11C0 12.57 0.46 14.03 1.24 15.26L2.7 13.8C2.25 12.97 2 12.01 2 11C2 7.69 4.69 5 8 5ZM14.76 6.74L13.3 8.2C13.74 9.04 14 9.99 14 11C14 14.31 11.31 17 8 17V14L4 18L8 22V19C12.42 19 16 15.42 16 11C16 9.43 15.54 7.97 14.76 6.74Z",
    fill: "#505A5F"
  }))), _showMobileFilterFormPopup ? /*#__PURE__*/React.createElement("span", {
    onClick: _onMobileExclusiveFilterPopupFormClose,
    className: "mobile-only"
  }, /*#__PURE__*/React.createElement(CloseSvg, null)) : null), /*#__PURE__*/React.createElement("form", {
    id: _id,
    onSubmit: handleSubmit(onSubmit)
  }, children), /*#__PURE__*/React.createElement(SubmitBar, {
    className: "w-fullwidth",
    label: t("ES_COMMON_APPLY"),
    submit: true,
    form: _id
  })));
};

const SearchAction = ({
  text,
  handleActionClick
}) => /*#__PURE__*/React.createElement("div", {
  className: "searchAction",
  onClick: handleActionClick
}, /*#__PURE__*/React.createElement(SearchIconSvg, null), " ", /*#__PURE__*/React.createElement("span", {
  className: "searchText"
}, text));

const FilterAction = ({
  text,
  handleActionClick,
  ...props
}) => /*#__PURE__*/React.createElement("div", {
  className: "searchAction",
  onClick: handleActionClick
}, /*#__PURE__*/React.createElement(RoundedLabel, {
  count: props.filterCount
}), /*#__PURE__*/React.createElement(FilterSvg, null), " ", /*#__PURE__*/React.createElement("span", {
  className: "searchText"
}, text));

const SortAction = ({
  text,
  handleActionClick,
  ...props
}) => /*#__PURE__*/React.createElement("div", {
  className: "searchAction svgPrimaryH16px",
  onClick: handleActionClick
}, /*#__PURE__*/React.createElement(RoundedLabel, {
  count: props.filterCount
}), /*#__PURE__*/React.createElement(SortSvg, null), " ", /*#__PURE__*/React.createElement("span", {
  className: "searchText"
}, text));

const Details$1 = ({
  label,
  name,
  onClick
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "detail",
    onClick: onClick
  }, /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, /*#__PURE__*/React.createElement("h2", null, label)), /*#__PURE__*/React.createElement("span", {
    className: "name",
    style: {
      overflowWrap: "break-word"
    }
  }, name));
};
const DetailsCard = ({
  data,
  serviceRequestIdKey,
  linkPrefix,
  handleSelect,
  selectedItems,
  keyForSelected,
  handleDetailCardClick,
  isTwoDynamicPrefix: _isTwoDynamicPrefix = false,
  getRedirectionLink,
  handleClickEnabled: _handleClickEnabled = true
}) => {
  if (linkPrefix && serviceRequestIdKey) {
    return /*#__PURE__*/React.createElement("div", null, data.map((object, itemIndex) => {
      return /*#__PURE__*/React.createElement(Link, {
        key: itemIndex,
        to: _isTwoDynamicPrefix ? `${linkPrefix}${typeof serviceRequestIdKey === "function" ? serviceRequestIdKey(object) : `${getRedirectionLink(object["Application Type"] === "BPA_STAKEHOLDER_REGISTRATION" ? "BPAREG" : "BPA")}/${object[object["Application Type"] === "BPA_STAKEHOLDER_REGISTRATION" ? "applicationNo" : "Application Number"]}`}` : `${linkPrefix}${typeof serviceRequestIdKey === "function" ? serviceRequestIdKey(object) : object[serviceRequestIdKey]}`
      }, /*#__PURE__*/React.createElement("div", {
        className: "details-container"
      }, Object.keys(object).map((name, index) => {
        if (name === "applicationNo" || name === "Vehicle Log") return null;
        return /*#__PURE__*/React.createElement(Details$1, {
          label: name,
          name: object[name],
          key: index
        });
      })));
    }));
  }
  return /*#__PURE__*/React.createElement("div", null, data.map((object, itemIndex) => {
    return /*#__PURE__*/React.createElement("div", {
      key: itemIndex,
      style: {
        border: selectedItems !== null && selectedItems !== void 0 && selectedItems.includes(object[keyForSelected]) ? "2px solid #a82227" : "2px solid #fff"
      },
      className: "details-container",
      onClick: () => _handleClickEnabled && handleSelect(object)
    }, Object.keys(object).filter(rowEle => {
      var _object$rowEle;
      return !(typeof object[rowEle] == "object" && ((_object$rowEle = object[rowEle]) === null || _object$rowEle === void 0 ? void 0 : _object$rowEle.hidden) == true);
    }).map((name, index) => {
      return /*#__PURE__*/React.createElement(Details$1, {
        label: name,
        name: object[name],
        key: index,
        onClick: () => _handleClickEnabled && handleDetailCardClick(object)
      });
    }));
  }));
};
DetailsCard.propTypes = {
  data: propTypes.array
};
DetailsCard.defaultProps = {
  data: []
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

const MobilePopUpCloseButton = ({
  closeMobilePopupModal
}) => /*#__PURE__*/React.createElement("div", {
  className: "InboxMobilePopupCloseButtonWrapper",
  onClick: closeMobilePopupModal
}, /*#__PURE__*/React.createElement(CloseSvg, null));
const MobileComponentDirectory = {
  SearchFormComponent: ({
    registerSearchFormField,
    searchFormState,
    handleSearchFormSubmit,
    onResetSearchForm,
    SearchFormFields,
    closeMobilePopupModal,
    onSearchFormSubmit,
    t
  }) => /*#__PURE__*/React.createElement(SearchForm, {
    onSubmit: ({
      ...props
    }) => {
      closeMobilePopupModal();
      onSearchFormSubmit({
        ...props
      });
    },
    handleSubmit: handleSearchFormSubmit,
    id: "search-form",
    className: "rm-mb form-field-flex-one inboxPopupMobileWrapper"
  }, /*#__PURE__*/React.createElement(MobilePopUpCloseButton, {
    closeMobilePopupModal
  }), /*#__PURE__*/React.createElement(SearchFormFields, {
    registerRef: registerSearchFormField,
    searchFormState: searchFormState
  }), /*#__PURE__*/React.createElement(ActionBar, {
    style: {
      maxWidth: "100%"
    }
  }, /*#__PURE__*/React.createElement(SearchField, {
    className: "submit"
  }, /*#__PURE__*/React.createElement(SubmitBar, {
    label: t("ES_COMMON_SEARCH"),
    submit: true,
    form: "search-form"
  }), /*#__PURE__*/React.createElement("p", {
    onClick: onResetSearchForm
  }, t(`ES_COMMON_CLEAR_ALL`))))),
  FilterFormComponent: ({
    registerFilterFormField,
    onResetFilterForm,
    controlFilterForm,
    handleFilterFormSubmit,
    setFilterFormValue,
    getFilterFormValue,
    FilterFormFields,
    closeMobilePopupModal,
    onFilterFormSubmit
  }) => /*#__PURE__*/React.createElement(FilterForm, {
    onSubmit: ({
      ...props
    }) => {
      closeMobilePopupModal();
      onFilterFormSubmit({
        ...props
      });
    },
    closeButton: () => /*#__PURE__*/React.createElement(MobilePopUpCloseButton, {
      closeMobilePopupModal
    }),
    handleSubmit: handleFilterFormSubmit,
    id: "filter-form",
    onResetFilterForm: onResetFilterForm,
    className: "inboxPopupMobileWrapper p-unset"
  }, /*#__PURE__*/React.createElement(FilterFormFields, Object.assign({
    registerRef: registerFilterFormField
  }, {
    controlFilterForm,
    handleFilterFormSubmit,
    setFilterFormValue,
    getFilterFormValue
  }))),
  SortFormComponent: ({
    sortFormDefaultValues: _sortFormDefaultValues = {},
    closeMobilePopupModal,
    MobileSortFormValues,
    onMobileSortOrderData,
    onSortFormReset,
    t
  }) => {
    const {
      setValue: setSortFormValue,
      handleSubmit: handleSortFormSubmit,
      ...methods
    } = useForm({
      defaultValues: _sortFormDefaultValues
    });
    function onResetSortForm() {
      closeMobilePopupModal();
      onSortFormReset(setSortFormValue);
    }
    return /*#__PURE__*/React.createElement(FormProvider, _extends({
      setValue: setSortFormValue,
      handleSubmit: handleSortFormSubmit
    }, methods), /*#__PURE__*/React.createElement(SearchForm, {
      onSubmit: ({
        ...props
      }) => {
        closeMobilePopupModal();
        onMobileSortOrderData({
          ...props
        });
      },
      handleSubmit: handleSortFormSubmit,
      id: "sort-form",
      className: "rm-mb form-field-flex-one inboxPopupMobileWrapper"
    }, /*#__PURE__*/React.createElement(MobilePopUpCloseButton, {
      closeMobilePopupModal
    }), /*#__PURE__*/React.createElement(PopupHeadingLabel, Object.assign({
      IconSVG: SortSvg,
      headingLabel: t("COMMON_TABLE_SORT")
    }, {
      onResetSortForm
    })), /*#__PURE__*/React.createElement(MobileSortFormValues, null), /*#__PURE__*/React.createElement(ActionBar, {
      style: {
        maxWidth: "100%"
      }
    }, /*#__PURE__*/React.createElement(SearchField, {
      className: "submit"
    }, /*#__PURE__*/React.createElement(SubmitBar, {
      label: t("COMMON_TABLE_SORT"),
      submit: true,
      form: "sort-form"
    }), /*#__PURE__*/React.createElement("p", {
      onClick: onResetSortForm
    }, t(`ES_COMMON_CLEAR_ALL`))))));
  }
};

const InboxComposer = ({
  isInboxLoading,
  PropsForInboxLinks,
  SearchFormFields,
  searchFormDefaultValues,
  onSearchFormSubmit,
  onSearchFormReset,
  resetSearchFormDefaultValues,
  FilterFormFields,
  filterFormDefaultValues,
  propsForInboxTable,
  propsForInboxMobileCards,
  onFilterFormSubmit,
  onFilterFormReset,
  resetFilterFormDefaultValues,
  onMobileSortOrderData,
  sortFormDefaultValues,
  onSortFormReset,
  formState: inboxFormState,
  className
}) => {
  var _propsForInboxTable$d3;
  const {
    t
  } = useTranslation();
  function activateModal(state, action) {
    switch (action.type) {
      case "set":
        return action.payload;
      case "remove":
        return false;
    }
  }
  const [currentlyActiveMobileModal, setActiveMobileModal] = useReducer(activateModal, false);
  const closeMobilePopupModal = () => {
    setActiveMobileModal({
      type: "remove"
    });
  };
  const {
    register: registerSearchFormField,
    control: controlSearchForm,
    handleSubmit: handleSearchFormSubmit,
    setValue: setSearchFormValue,
    getValues: getSearchFormValue,
    reset: resetSearchForm,
    formState: searchFormState,
    clearErrors: clearSearchFormErrors
  } = useForm({
    defaultValues: {
      ...searchFormDefaultValues
    }
  });
  const {
    register: registerFilterFormField,
    control: controlFilterForm,
    handleSubmit: handleFilterFormSubmit,
    setValue: setFilterFormValue,
    getValues: getFilterFormValue,
    reset: resetFilterForm
  } = useForm({
    defaultValues: {
      ...filterFormDefaultValues
    }
  });
  const onResetFilterForm = () => {
    onFilterFormReset(setFilterFormValue);
  };
  const onResetSearchForm = () => {
    onSearchFormReset(setSearchFormValue);
    clearSearchFormErrors();
    closeMobilePopupModal();
  };
  useEffect(() => {
    if (resetFilterForm && resetSearchForm && inboxFormState) {
      resetFilterForm(inboxFormState === null || inboxFormState === void 0 ? void 0 : inboxFormState.filterForm);
      resetSearchForm(inboxFormState === null || inboxFormState === void 0 ? void 0 : inboxFormState.searchForm);
    }
  }, [inboxFormState, resetSearchForm, resetFilterForm]);
  const isMobile = window.Digit.Utils.browser.isMobile();
  if (isMobile) {
    var _propsForInboxMobileC;
    const CurrentMobileModalComponent = useCallback(({
      ...props
    }) => currentlyActiveMobileModal ? MobileComponentDirectory[currentlyActiveMobileModal]({
      ...props
    }) : null, [currentlyActiveMobileModal]);
    const propsForCurrentMobileModalComponent = {
      SearchFormFields,
      FilterFormFields,
      registerSearchFormField,
      searchFormState,
      handleSearchFormSubmit,
      onResetSearchForm,
      registerFilterFormField,
      onResetFilterForm,
      controlFilterForm,
      handleFilterFormSubmit,
      setFilterFormValue,
      getFilterFormValue,
      closeMobilePopupModal,
      onSearchFormSubmit,
      onFilterFormSubmit,
      onMobileSortOrderData,
      sortFormDefaultValues,
      onSortFormReset,
      MobileSortFormValues: propsForInboxMobileCards === null || propsForInboxMobileCards === void 0 ? void 0 : propsForInboxMobileCards.MobileSortFormValues,
      t
    };
    const getSearchActionText = () => {
      if (window.location.href.includes("/obps")) {
        return t("ES_INBOX_COMMON_SEARCH");
      } else {
        return t("ES_COMMON_SEARCH");
      }
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "InboxComposerWrapper"
    }, /*#__PURE__*/React.createElement("div", {
      className: "searchBox"
    }, /*#__PURE__*/React.createElement(SearchAction, {
      text: getSearchActionText(),
      handleActionClick: () => setActiveMobileModal({
        type: "set",
        payload: "SearchFormComponent"
      })
    }), /*#__PURE__*/React.createElement(FilterAction, {
      text: t("ES_COMMON_FILTER"),
      handleActionClick: () => setActiveMobileModal({
        type: "set",
        payload: "FilterFormComponent"
      })
    }), /*#__PURE__*/React.createElement(SortAction, {
      text: t("COMMON_TABLE_SORT"),
      handleActionClick: () => setActiveMobileModal({
        type: "set",
        payload: "SortFormComponent"
      })
    })), currentlyActiveMobileModal ? /*#__PURE__*/React.createElement(PopUp, null, /*#__PURE__*/React.createElement(CurrentMobileModalComponent, propsForCurrentMobileModalComponent)) : null, isInboxLoading ? /*#__PURE__*/React.createElement(Loader, null) : /*#__PURE__*/React.createElement("div", null, (propsForInboxMobileCards === null || propsForInboxMobileCards === void 0 ? void 0 : (_propsForInboxMobileC = propsForInboxMobileCards.data) === null || _propsForInboxMobileC === void 0 ? void 0 : _propsForInboxMobileC.length) < 1 ? /*#__PURE__*/React.createElement(Card, {
      className: "margin-unset text-align-center"
    }, propsForInboxTable !== null && propsForInboxTable !== void 0 && propsForInboxTable.noResultsMessage ? t(propsForInboxTable === null || propsForInboxTable === void 0 ? void 0 : propsForInboxTable.noResultsMessage) : t("CS_MYAPPLICATIONS_NO_APPLICATION")) : /*#__PURE__*/React.createElement(DetailsCard, propsForInboxMobileCards)));
  }
  const isEnabledCommonModules = window.location.href.includes("/obps/") || window.location.href.includes("/noc/");
  const isEnabledWSCommonModules = window.location.href.includes("/ws/water/inbox") || window.location.href.includes("/ws/sewerage/inbox") || window.location.href.includes("/ws/water/bill-amendment/inbox") || window.location.href.includes("/ws/sewerage/bill-amendment/inbox");
  if (isEnabledCommonModules) {
    var _propsForInboxTable$d;
    return /*#__PURE__*/React.createElement("div", {
      className: "inbox-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "filters-container"
    }, /*#__PURE__*/React.createElement(InboxLinks, PropsForInboxLinks), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FilterForm, {
      onSubmit: onFilterFormSubmit,
      handleSubmit: handleFilterFormSubmit,
      id: "filter-form",
      onResetFilterForm: onResetFilterForm
    }, /*#__PURE__*/React.createElement(FilterFormFields, Object.assign({
      registerRef: registerFilterFormField
    }, {
      controlFilterForm,
      handleFilterFormSubmit,
      setFilterFormValue,
      getFilterFormValue
    }))))), /*#__PURE__*/React.createElement("div", {
      style: propsForInboxTable !== null && propsForInboxTable !== void 0 && propsForInboxTable.tableStyle ? {
        flex: 1,
        ...(propsForInboxTable === null || propsForInboxTable === void 0 ? void 0 : propsForInboxTable.tableStyle)
      } : {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement(SearchForm, {
      onSubmit: onSearchFormSubmit,
      handleSubmit: handleSearchFormSubmit,
      id: "search-form",
      className: "rm-mb form-field-flex-one"
    }, /*#__PURE__*/React.createElement(SearchFormFields, Object.assign({
      registerRef: registerSearchFormField,
      searchFormState: searchFormState
    }, {
      controlSearchForm
    }, {
      searchFieldComponents: /*#__PURE__*/React.createElement("div", {
        style: window.location.href.includes("/citizen/obps") ? {
          display: "flex"
        } : {}
      }, /*#__PURE__*/React.createElement(SubmitBar, {
        label: t("ES_COMMON_SEARCH"),
        submit: true,
        form: "search-form",
        className: "submit-bar-search"
      }), /*#__PURE__*/React.createElement("p", {
        onClick: onResetSearchForm,
        className: "clear-search",
        style: {
          paddingTop: "9px",
          color: " #a82227"
        }
      }, t(`ES_COMMON_CLEAR_SEARCH`)))
    }))), /*#__PURE__*/React.createElement("div", {
      className: "result",
      style: {
        marginLeft: "24px",
        flex: 1
      }
    }, isInboxLoading ? /*#__PURE__*/React.createElement(Loader, null) : /*#__PURE__*/React.createElement("div", null, (propsForInboxTable === null || propsForInboxTable === void 0 ? void 0 : (_propsForInboxTable$d = propsForInboxTable.data) === null || _propsForInboxTable$d === void 0 ? void 0 : _propsForInboxTable$d.length) < 1 ? /*#__PURE__*/React.createElement(Card, {
      className: "margin-unset text-align-center"
    }, propsForInboxTable.noResultsMessage ? t(propsForInboxTable.noResultsMessage) : t("CS_MYAPPLICATIONS_NO_APPLICATION")) : /*#__PURE__*/React.createElement(Table, Object.assign({
      t: t
    }, propsForInboxTable))))));
  }
  if (isEnabledWSCommonModules) {
    var _propsForInboxTable$d2;
    return /*#__PURE__*/React.createElement("div", {
      className: `InboxComposerWrapper ${className || ""}`
    }, /*#__PURE__*/React.createElement(InboxLinks, PropsForInboxLinks), /*#__PURE__*/React.createElement(SearchForm, {
      onSubmit: onSearchFormSubmit,
      handleSubmit: handleSearchFormSubmit,
      id: "search-form",
      className: "search-complaint-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: `complaint-input-container ${className || ""}`
    }, /*#__PURE__*/React.createElement(SearchFormFields, Object.assign({
      registerRef: registerSearchFormField,
      searchFormState: searchFormState
    }, {
      controlSearchForm
    })), /*#__PURE__*/React.createElement(SearchField, {
      className: "clear-search-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "clear-search"
    }, /*#__PURE__*/React.createElement("p", {
      onClick: onResetSearchForm
    }, t(`ES_COMMON_CLEAR_SEARCH`)))), /*#__PURE__*/React.createElement(SearchField, {
      className: "submit"
    }, /*#__PURE__*/React.createElement(SubmitBar, {
      label: t("ES_COMMON_SEARCH"),
      submit: true,
      form: "search-form"
    })))), /*#__PURE__*/React.createElement(FilterForm, {
      onSubmit: onFilterFormSubmit,
      handleSubmit: handleFilterFormSubmit,
      id: "filter-form",
      onResetFilterForm: onResetFilterForm
    }, /*#__PURE__*/React.createElement(FilterFormFields, Object.assign({
      registerRef: registerFilterFormField
    }, {
      controlFilterForm,
      handleFilterFormSubmit,
      setFilterFormValue,
      getFilterFormValue
    }))), isInboxLoading ? /*#__PURE__*/React.createElement(Loader, null) : /*#__PURE__*/React.createElement("div", null, (propsForInboxTable === null || propsForInboxTable === void 0 ? void 0 : (_propsForInboxTable$d2 = propsForInboxTable.data) === null || _propsForInboxTable$d2 === void 0 ? void 0 : _propsForInboxTable$d2.length) < 1 ? /*#__PURE__*/React.createElement(Card, {
      className: "margin-unset text-align-center"
    }, propsForInboxTable.noResultsMessage ? t(propsForInboxTable.noResultsMessage) : t("CS_MYAPPLICATIONS_NO_APPLICATION")) : /*#__PURE__*/React.createElement(Table, Object.assign({
      t: t
    }, propsForInboxTable))));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "InboxComposerWrapper"
  }, /*#__PURE__*/React.createElement(InboxLinks, PropsForInboxLinks), /*#__PURE__*/React.createElement(SearchForm, {
    onSubmit: onSearchFormSubmit,
    handleSubmit: handleSearchFormSubmit,
    id: "search-form",
    className: "rm-mb form-field-flex-one"
  }, /*#__PURE__*/React.createElement(SearchFormFields, Object.assign({
    registerRef: registerSearchFormField,
    searchFormState: searchFormState
  }, {
    controlSearchForm
  })), /*#__PURE__*/React.createElement("div", {
    className: "SubmitAndClearAllContainer"
  }, /*#__PURE__*/React.createElement(SearchField, {
    className: "submit"
  }, /*#__PURE__*/React.createElement(SubmitBar, {
    label: t("ES_COMMON_SEARCH"),
    submit: true,
    form: "search-form"
  }), /*#__PURE__*/React.createElement("p", {
    onClick: onResetSearchForm
  }, t(`ES_COMMON_CLEAR_SEARCH`))))), /*#__PURE__*/React.createElement(FilterForm, {
    onSubmit: onFilterFormSubmit,
    handleSubmit: handleFilterFormSubmit,
    id: "filter-form",
    onResetFilterForm: onResetFilterForm
  }, /*#__PURE__*/React.createElement(FilterFormFields, Object.assign({
    registerRef: registerFilterFormField
  }, {
    controlFilterForm,
    handleFilterFormSubmit,
    setFilterFormValue,
    getFilterFormValue
  }))), isInboxLoading ? /*#__PURE__*/React.createElement(Loader, null) : /*#__PURE__*/React.createElement("div", null, (propsForInboxTable === null || propsForInboxTable === void 0 ? void 0 : (_propsForInboxTable$d3 = propsForInboxTable.data) === null || _propsForInboxTable$d3 === void 0 ? void 0 : _propsForInboxTable$d3.length) < 1 ? /*#__PURE__*/React.createElement(Card, {
    className: "margin-unset text-align-center"
  }, propsForInboxTable.noResultsMessage ? t(propsForInboxTable.noResultsMessage) : t("CS_MYAPPLICATIONS_NO_APPLICATION")) : /*#__PURE__*/React.createElement(Table, Object.assign({
    t: t
  }, propsForInboxTable))));
};

const CityMohalla = ({
  header,
  subHeader,
  cardText,
  cardLabelCity,
  cardLabelMohalla,
  nextText,
  selectedCity,
  cities,
  localities,
  selectCity,
  selectLocalities,
  onSave,
  selectedLocality
}) => {
  return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardSubHeader, null, subHeader), /*#__PURE__*/React.createElement(CardHeader, null, header), /*#__PURE__*/React.createElement(CardText, null, cardText), /*#__PURE__*/React.createElement(CardLabel, null, cardLabelCity, "* "), /*#__PURE__*/React.createElement(Dropdown, {
    isMandatory: true,
    selected: selectedCity,
    option: cities,
    select: selectCity
  }), /*#__PURE__*/React.createElement(CardLabel, null, cardLabelMohalla, " *"), /*#__PURE__*/React.createElement(Dropdown, {
    isMandatory: true,
    selected: selectedLocality,
    option: localities,
    select: selectLocalities
  }), /*#__PURE__*/React.createElement(SubmitBar, {
    label: nextText,
    onSubmit: onSave
  }));
};
CityMohalla.propTypes = {
  header: propTypes.string,
  subHeader: propTypes.string,
  cardText: propTypes.string,
  cardLabelCity: propTypes.string,
  cardLabelMohalla: propTypes.string,
  nextText: propTypes.string,
  selectedCity: propTypes.string,
  cities: propTypes.array,
  localities: propTypes.array,
  selectCity: propTypes.string,
  selectedLocality: propTypes.string,
  selectLocalities: propTypes.func,
  onSave: propTypes.func
};
CityMohalla.defaultProps = {
  header: "",
  subHeader: "",
  cardText: "",
  cardLabelCity: "",
  cardLabelMohalla: "",
  nextText: "",
  selectedCity: "",
  cities: [],
  localities: [],
  selectCity: "",
  selectedLocality: "",
  selectLocalities: undefined,
  onSave: undefined
};

const ArrowRight = ({
  to
}) => /*#__PURE__*/React.createElement(Link, {
  to: to
}, /*#__PURE__*/React.createElement("svg", {
  style: {
    display: "inline",
    height: "24px"
  },
  xmlns: "http://www.w3.org/2000/svg",
  width: "32",
  height: "32",
  viewBox: "0 0 32 32",
  fill: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z",
  fill: "#a82227"
}), /*#__PURE__*/React.createElement("path", {
  d: "M16 5.33325L14.12 7.21325L21.56 14.6666H5.33337V17.3333H21.56L14.12 24.7866L16 26.6666L26.6667 15.9999L16 5.33325Z",
  fill: "white"
})));
const DashboardBox = ({
  t: _t = val => val,
  svgIcon,
  header,
  info,
  subHeader,
  links,
  total
}) => {
  const mobileView = innerWidth <= 640;
  const employeeCardStyles = mobileView ? {
    width: "96vw",
    margin: "8px auto"
  } : {
    width: "328px"
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "employeeCard card-home",
    style: {
      padding: 0,
      ...employeeCardStyles
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "complaint-links-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "logo"
  }, svgIcon), /*#__PURE__*/React.createElement("span", {
    className: "text"
  }, _t(header))), /*#__PURE__*/React.createElement("div", {
    className: "body "
  }, /*#__PURE__*/React.createElement("div", {
    className: "employeeCard-info-box"
  }, Object.keys(info).map((key, index) => {
    return /*#__PURE__*/React.createElement("div", {
      key: index,
      className: "employeeCard-info-data"
    }, /*#__PURE__*/React.createElement("span", null, _t(info[key])), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: "bold"
      }
    }, _t(key)));
  }))), /*#__PURE__*/React.createElement("hr", {
    className: "underline"
  }), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, links.map((link, index) => /*#__PURE__*/React.createElement("span", {
    key: index,
    className: "link"
  }, /*#__PURE__*/React.createElement(Link, {
    to: link.pathname
  }, /*#__PURE__*/React.createElement("span", null, _t(link.label))), !isNaN(link.total) && /*#__PURE__*/React.createElement("span", {
    className: "inbox-total"
  }, link.total), /*#__PURE__*/React.createElement(ArrowRight, {
    to: link.pathname
  }))))));
};

const InputCard = ({
  t,
  children,
  texts: _texts = {},
  submit: _submit = false,
  inputs: _inputs = [],
  inputRef,
  onNext,
  onSkip,
  isDisable,
  onAdd,
  isMultipleAllow: _isMultipleAllow = false,
  cardStyle: _cardStyle = {}
}) => {
  const isMobile = window.Digit.Utils.browser.isMobile();
  return /*#__PURE__*/React.createElement(Card, {
    style: _cardStyle
  }, _texts.headerCaption && /*#__PURE__*/React.createElement(CardCaption, null, t(_texts.headerCaption)), (_texts === null || _texts === void 0 ? void 0 : _texts.header) && /*#__PURE__*/React.createElement(CardHeader, null, t(_texts.header)), (_texts === null || _texts === void 0 ? void 0 : _texts.cardText) && /*#__PURE__*/React.createElement(CardText, null, t(_texts.cardText)), children, _texts.submitBarLabel ? /*#__PURE__*/React.createElement(SubmitBar, {
    disabled: isDisable,
    submit: _submit,
    label: t(_texts.submitBarLabel),
    onSubmit: onNext
  }) : null, _texts.skipLabel ? /*#__PURE__*/React.createElement(CardText, {
    style: {
      marginTop: "10px",
      textAlign: isMobile ? "center" : "left"
    }
  }, " ", t(_texts.skipLabel), " ") : null, _texts.skipText ? /*#__PURE__*/React.createElement(LinkButton, {
    label: t(_texts.skipText),
    onClick: onSkip
  }) : null, _isMultipleAllow && _texts.addMultipleText ? /*#__PURE__*/React.createElement(LinkButton, {
    label: t(_texts.addMultipleText),
    onClick: onAdd
  }) : null);
};
InputCard.propTypes = {
  text: propTypes.object,
  submit: propTypes.bool,
  onNext: propTypes.func,
  onSkip: propTypes.func,
  onAdd: propTypes.func,
  t: propTypes.func
};
InputCard.defaultProps = {
  texts: {},
  submit: false,
  onNext: undefined,
  onSkip: undefined,
  onAdd: undefined,
  t: value => value
};

const FormStep = ({
  t,
  children,
  config,
  onSelect,
  onSkip,
  value,
  holdingId,
  onChange,
  isDisabled,
  _defaultValues: _defaultValues2 = {},
  forcedError,
  componentInFront,
  onAdd,
  cardStyle: _cardStyle = {},
  isMultipleAllow: _isMultipleAllow = false,
  showErrorBelowChildren: _showErrorBelowChildren = false,
  childrenAtTheBottom: _childrenAtTheBottom = true,
  textInputStyle,
  CitizenHomePageTenantId
}) => {
  var _config$inputs;
  const {
    register,
    watch,
    errors,
    handleSubmit
  } = useForm({
    defaultValues: _defaultValues2
  });
  const goNext = data => {
    onSelect(data);
  };
  var isDisable = isDisabled ? true : config.canDisable && Object.keys(errors).filter(i => errors[i]).length;
  const inputs = (_config$inputs = config.inputs) === null || _config$inputs === void 0 ? void 0 : _config$inputs.map((input, index) => {
    if (input.type === "text") {
      if (input.name !== 'holdingId' && input.name !== 'mobileNumber') {
        var _input$validation, _input$validation2;
        return /*#__PURE__*/React.createElement(React.Fragment, {
          key: index
        }, /*#__PURE__*/React.createElement(CardLabel, null, t(input.label), " ", input.labelChildren && input.labelChildren), errors[input.name] && /*#__PURE__*/React.createElement(CardLabelError, null, t(input.error)), /*#__PURE__*/React.createElement("div", {
          className: "field-container",
          style: {
            justifyContent: "left"
          }
        }, input !== null && input !== void 0 && input.componentInFront ? /*#__PURE__*/React.createElement("span", {
          className: "citizen-card-input citizen-card-input--front"
        }, componentInFront) : null, /*#__PURE__*/React.createElement(TextInput, {
          key: index,
          name: input.name,
          value: value,
          onChange: onChange,
          minlength: input.validation.minlength,
          maxlength: input.validation.maxlength,
          pattern: (_input$validation = input.validation) === null || _input$validation === void 0 ? void 0 : _input$validation.pattern,
          title: (_input$validation2 = input.validation) === null || _input$validation2 === void 0 ? void 0 : _input$validation2.title,
          inputRef: register(input.validation),
          isMandatory: errors[input.name],
          disable: input.disable ? input.disable : false,
          textInputStyle: textInputStyle
        })));
      } else if (input.name === 'holdingId') {
        var _input$validation3, _input$validation4;
        return /*#__PURE__*/React.createElement(React.Fragment, {
          key: index
        }, /*#__PURE__*/React.createElement(CardLabel, null, t(input.label), " ", input.labelChildren && input.labelChildren), errors[input.name] && /*#__PURE__*/React.createElement(CardLabelError, null, t(input.error)), /*#__PURE__*/React.createElement("div", {
          className: "field-container",
          style: {
            justifyContent: "left"
          }
        }, input !== null && input !== void 0 && input.componentInFront ? /*#__PURE__*/React.createElement("span", {
          className: "citizen-card-input citizen-card-input--front"
        }, componentInFront) : null, /*#__PURE__*/React.createElement(TextInput, {
          key: index,
          name: input.name,
          value: holdingId,
          onChange: onChange,
          minlength: input.validation.minlength,
          maxlength: input.validation.maxlength,
          pattern: (_input$validation3 = input.validation) === null || _input$validation3 === void 0 ? void 0 : _input$validation3.pattern,
          title: (_input$validation4 = input.validation) === null || _input$validation4 === void 0 ? void 0 : _input$validation4.title,
          inputRef: register(input.validation),
          isMandatory: errors[input.name],
          disable: input.disable ? input.disable : false,
          textInputStyle: textInputStyle
        })));
      } else if (input.name === 'mobileNumber' && !(CitizenHomePageTenantId !== null && CitizenHomePageTenantId !== void 0 && CitizenHomePageTenantId.propertyIdEnabled)) {
        var _input$validation5, _input$validation6;
        return /*#__PURE__*/React.createElement(React.Fragment, {
          key: index
        }, /*#__PURE__*/React.createElement(CardLabel, null, t(input.label), " ", input.labelChildren && input.labelChildren), errors[input.name] && /*#__PURE__*/React.createElement(CardLabelError, null, t(input.error)), /*#__PURE__*/React.createElement("div", {
          className: "field-container",
          style: {
            justifyContent: "left"
          }
        }, input !== null && input !== void 0 && input.componentInFront ? /*#__PURE__*/React.createElement("span", {
          className: "citizen-card-input citizen-card-input--front"
        }, componentInFront) : null, /*#__PURE__*/React.createElement(TextInput, {
          key: index,
          name: input.name,
          value: value,
          onChange: onChange,
          minlength: input.validation.minlength,
          maxlength: input.validation.maxlength,
          pattern: (_input$validation5 = input.validation) === null || _input$validation5 === void 0 ? void 0 : _input$validation5.pattern,
          title: (_input$validation6 = input.validation) === null || _input$validation6 === void 0 ? void 0 : _input$validation6.title,
          inputRef: register(input.validation),
          isMandatory: errors[input.name],
          disable: input.disable ? input.disable : false,
          textInputStyle: textInputStyle
        })));
      }
    }
    if (input.type === "textarea") return /*#__PURE__*/React.createElement(React.Fragment, {
      key: index
    }, /*#__PURE__*/React.createElement(CardLabel, null, t(input.label)), /*#__PURE__*/React.createElement(TextArea, {
      key: index,
      name: input.name,
      value: value,
      onChange: onChange,
      inputRef: register(input.validation),
      maxLength: "1024"
    }));
  });
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit(goNext)
  }, /*#__PURE__*/React.createElement(InputCard, Object.assign({}, {
    isDisable: isDisable,
    isMultipleAllow: _isMultipleAllow
  }, config, {
    cardStyle: _cardStyle,
    submit: true
  }, {
    onSkip: onSkip,
    onAdd: onAdd
  }, {
    t: t
  }), !_childrenAtTheBottom && children, inputs, forcedError && !_showErrorBelowChildren && /*#__PURE__*/React.createElement(CardLabelError, null, t(forcedError)), _childrenAtTheBottom && children, forcedError && _showErrorBelowChildren && /*#__PURE__*/React.createElement(CardLabelError, null, t(forcedError))));
};
FormStep.propTypes = {
  config: propTypes.shape({}),
  onSelect: propTypes.func,
  onSkip: propTypes.func,
  onAdd: propTypes.func,
  t: propTypes.func
};
FormStep.defaultProps = {
  config: {},
  onSelect: undefined,
  onSkip: undefined,
  onAdd: undefined,
  t: value => value
};

const Localities = ({
  selectLocality,
  tenantId,
  boundaryType,
  keepNull,
  selected,
  optionCardStyles,
  style,
  disable,
  disableLoader,
  sortFn
}) => {
  const {
    t
  } = useTranslation();
  const {
    data: tenantlocalties,
    isLoading
  } = Digit.Hooks.useBoundaryLocalities(tenantId, boundaryType, {
    enabled: !disable
  }, t);
  if (isLoading && !disableLoader) {
    return /*#__PURE__*/React.createElement(Loader, null);
  }
  return /*#__PURE__*/React.createElement(Dropdown, {
    option: sortFn ? tenantlocalties === null || tenantlocalties === void 0 ? void 0 : tenantlocalties.sort(sortFn) : tenantlocalties,
    keepNull: keepNull === false ? false : true,
    selected: selected,
    select: selectLocality,
    optionCardStyles: optionCardStyles,
    optionKey: "i18nkey",
    style: style,
    disable: !(tenantlocalties !== null && tenantlocalties !== void 0 && tenantlocalties.length) || disable
  });
};

const LocationSearchCard = ({
  header,
  cardText,
  nextText,
  t,
  skipAndContinueText,
  forcedError,
  skip,
  onSave,
  onChange,
  position,
  disabled,
  cardBodyStyle: _cardBodyStyle = {},
  isPTDefault,
  PTdefaultcoord,
  isPlaceRequired,
  handleRemove,
  Webview: _Webview = false,
  isPopUp: _isPopUp = false
}) => {
  let isDisabled =  disabled;
  const onLocationChange = (val, location) => {
    isDisabled = val ? false : true;
    onChange(val, location);
  };
  const onLocationChangewithPlace = (val, location, place) => {
    isDisabled = val ? false : true;
    onChange(val, location, place);
  };
  return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    style: {
      marginTop: _Webview ? "16px" : "8px",
      Webview: _Webview
    },
    width: "24",
    height: "24",
    viewBox: "0 0 30 30",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14.9999 9.66666C12.0533 9.66666 9.66658 12.0533 9.66658 15C9.66658 17.9467 12.0533 20.3333 14.9999 20.3333C17.9466 20.3333 20.3333 17.9467 20.3333 15C20.3333 12.0533 17.9466 9.66666 14.9999 9.66666ZM26.9199 13.6667C26.3066 8.10666 21.8933 3.69333 16.3333 3.07999V0.333328H13.6666V3.07999C8.10658 3.69333 3.69325 8.10666 3.07992 13.6667H0.333252V16.3333H3.07992C3.69325 21.8933 8.10658 26.3067 13.6666 26.92V29.6667H16.3333V26.92C21.8933 26.3067 26.3066 21.8933 26.9199 16.3333H29.6666V13.6667H26.9199ZM14.9999 24.3333C9.83992 24.3333 5.66658 20.16 5.66658 15C5.66658 9.83999 9.83992 5.66666 14.9999 5.66666C20.1599 5.66666 24.3333 9.83999 24.3333 15C24.3333 20.16 20.1599 24.3333 14.9999 24.3333Z",
    fill: "#505A5F"
  })), /*#__PURE__*/React.createElement(CardHeader, null, header)), /*#__PURE__*/React.createElement("div", {
    style: _cardBodyStyle
  }, _isPopUp && /*#__PURE__*/React.createElement(LinkButton, {
    label: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("svg", {
      style: {
        float: "right",
        position: "relative",
        bottom: _Webview ? "32px" : "48px",
        marginTop: _Webview ? "-20px" : "-18px",
        marginRight: "-5px",
        marginLeft: _Webview ? "5px" : ""
      },
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z",
      fill: "#0B0C0C"
    })))),
    style: {
      width: "100px",
      display: "inline"
    },
    onClick: e => handleRemove()
  }), /*#__PURE__*/React.createElement(CardText, null, cardText), /*#__PURE__*/React.createElement(LocationSearch, {
    onChange: isPlaceRequired ? onLocationChangewithPlace : onLocationChange,
    position: position,
    isPTDefault: isPTDefault,
    PTdefaultcoord: PTdefaultcoord,
    isPlaceRequired: isPlaceRequired
  }), forcedError && /*#__PURE__*/React.createElement(CardLabelError, null, t(forcedError))), /*#__PURE__*/React.createElement(SubmitBar, {
    label: nextText,
    onSubmit: onSave,
    disabled: isDisabled
  }), skip ? /*#__PURE__*/React.createElement(LinkButton, {
    onClick: skip,
    label: skipAndContinueText
  }) : null);
};
LocationSearchCard.propTypes = {
  header: propTypes.string,
  cardText: propTypes.string,
  nextText: propTypes.string,
  skipAndContinueText: propTypes.string,
  skip: propTypes.func,
  onSave: propTypes.func,
  onChange: propTypes.func,
  position: propTypes.any,
  isPTDefault: propTypes.any,
  PTdefaultcoord: propTypes.any,
  isPlaceRequired: propTypes.any
};
LocationSearchCard.defaultProps = {
  header: "",
  cardText: "",
  nextText: "",
  skipAndContinueText: "",
  skip: () => {},
  onSave: null,
  onChange: () => {},
  position: undefined,
  isPTDefault: false,
  PTdefaultcoord: {},
  isPlaceRequired: false,
  handleRemove: () => {},
  Webview: false,
  isPopUp: false
};

const DimentionInput = ({
  name,
  value,
  onChange,
  disable
}) => /*#__PURE__*/React.createElement(TextInput, {
  type: "number",
  name: name,
  value: value,
  onChange: onChange,
  disable: disable,
  pattern: "[0-9]{1,2}",
  min: "0.1",
  max: "99.9",
  step: "0.1"
});
const PitDimension = ({
  sanitationType,
  t,
  size: _size = {},
  handleChange,
  disable: _disable = false
}) => {
  return (sanitationType === null || sanitationType === void 0 ? void 0 : sanitationType.dimension) === "dd" ? /*#__PURE__*/React.createElement("div", {
    className: "inputWrapper"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(DimentionInput, {
    name: "diameter",
    value: _size["diameter"] || "",
    onChange: handleChange,
    disable: _disable
  }), /*#__PURE__*/React.createElement(CardText, {
    style: {
      textAlign: "center"
    },
    disable: _disable
  }, t("CS_FILE_PROPERTY_DIAMETER"))), /*#__PURE__*/React.createElement("span", null, "x"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(DimentionInput, {
    name: "height",
    value: _size["height"] || "",
    onChange: handleChange,
    disable: _disable
  }), /*#__PURE__*/React.createElement(CardText, {
    style: {
      textAlign: "center"
    },
    disable: _disable
  }, t("CS_FILE_PROPERTY_HEIGHT")))) : /*#__PURE__*/React.createElement("div", {
    className: "inputWrapper"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(DimentionInput, {
    name: "length",
    value: _size["length"] || "",
    onChange: handleChange,
    disable: _disable
  }), /*#__PURE__*/React.createElement(CardText, {
    style: {
      textAlign: "center"
    },
    disable: _disable
  }, t("CS_FILE_PROPERTY_LENGTH"))), /*#__PURE__*/React.createElement("span", null, "x"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(DimentionInput, {
    name: "width",
    value: _size["width"] || "",
    onChange: handleChange,
    disable: _disable
  }), /*#__PURE__*/React.createElement(CardText, {
    style: {
      textAlign: "center"
    },
    disable: _disable
  }, t("CS_FILE_PROPERTY_WIDTH"))), /*#__PURE__*/React.createElement("span", null, "x"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(DimentionInput, {
    name: "height",
    value: _size["height"] || "",
    onChange: handleChange,
    disable: _disable
  }), /*#__PURE__*/React.createElement(CardText, {
    style: {
      textAlign: "center"
    },
    disable: _disable
  }, t("CS_FILE_PROPERTY_HEIGHT"))));
};

const RadioOrSelect = ({
  options,
  onSelect,
  optionKey,
  selectedOption,
  isMandatory,
  t,
  labelKey,
  dropdownStyle: _dropdownStyle = {},
  isDependent: _isDependent = false,
  disabled: _disabled = false,
  optionCardStyles,
  isPTFlow: _isPTFlow = false,
  isDropDown: _isDropDown = false,
  innerStyles: _innerStyles = {},
  inputStyle: _inputStyle = {}
}) => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, (options === null || options === void 0 ? void 0 : options.length) < 5 && !_isDropDown ? /*#__PURE__*/React.createElement(RadioButtons, {
    selectedOption: selectedOption,
    options: options,
    optionsKey: optionKey,
    isDependent: _isDependent,
    disabled: _disabled,
    onSelect: onSelect,
    labelKey: labelKey,
    isPTFlow: _isPTFlow,
    t: t,
    innerStyles: _innerStyles,
    inputStyle: _inputStyle
  }) : /*#__PURE__*/React.createElement(Dropdown, {
    isMandatory: isMandatory,
    selected: selectedOption,
    style: _dropdownStyle,
    optionKey: optionKey,
    option: options,
    select: onSelect,
    t: t,
    disable: _disabled,
    optionCardStyles: optionCardStyles
  }));
};

const RatingCard = ({
  config,
  onSelect,
  t
}) => {
  var _config$inputs;
  const {
    register,
    watch,
    handleSubmit
  } = useForm();
  const [comments, setComments] = useState("");
  const [rating, setRating] = useState(0);
  const onSubmit = data => {
    data.rating = rating;
    onSelect(data);
  };
  const feedback = (e, ref, index) => {
    setRating(index);
  };
  const segments = (_config$inputs = config.inputs) === null || _config$inputs === void 0 ? void 0 : _config$inputs.map((input, index) => {
    if (input.type === "rate") {
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: index
      }, /*#__PURE__*/React.createElement(CardLabel, null, t(input.label)), input === null || input === void 0 ? void 0 : input.error, /*#__PURE__*/React.createElement(Rating, {
        currentRating: rating,
        maxRating: input.maxRating,
        onFeedback: (e, ref, i) => feedback(e, ref, i)
      }));
    }
    if (input.type === "checkbox") {
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: index
      }, /*#__PURE__*/React.createElement(CardLabel, null, t(input.label)), input === null || input === void 0 ? void 0 : input.error, input.checkLabels && input.checkLabels.map((label, index) => /*#__PURE__*/React.createElement(CheckBox, {
        style: {
          marginBottom: "16px",
          paddingTop: "10px"
        },
        key: index,
        name: input.label,
        label: t(label),
        value: label,
        inputRef: register
      })));
    }
    if (input.type === "radio") {
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: index
      }, /*#__PURE__*/React.createElement(CardLabel, null, t(input.label)), /*#__PURE__*/React.createElement(RadioButtons, {
        options: input.checkLabels,
        onSelect: input.onSelect,
        selectedOption: input.selectedOption,
        t: t
      }));
    }
    if (input.type === "textarea") {
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: index
      }, /*#__PURE__*/React.createElement(CardLabel, null, t(input.label)), /*#__PURE__*/React.createElement(TextArea, {
        name: input.name,
        value: comments,
        onChange: e => setComments(e.target.value),
        inputRef: register
      }));
    }
    if (input.type === "dropDown") {
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: index
      }, /*#__PURE__*/React.createElement(CardLabel, null, t(input.label)), /*#__PURE__*/React.createElement(Dropdown, {
        option: input.checkLabels,
        optionKey: "i18nKey",
        id: "dropdown",
        selected: input.selectedOption,
        select: input.onSelect,
        t: t,
        disable: false,
        autoFocus: false
      }));
    }
  });
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, t(config.texts.header)), segments, /*#__PURE__*/React.createElement(SubmitBar, {
    label: t(config.texts.submitBarLabel),
    submit: true
  })));
};
RatingCard.propTypes = {
  config: propTypes.object,
  onSubmit: propTypes.func,
  t: propTypes.func
};
RatingCard.defaultProps = {
  config: {},
  onSubmit: undefined,
  t: value => value
};

const TextInputCard = ({
  header,
  subHeader,
  cardText,
  cardLabel,
  nextText,
  skipAndContinueText,
  skip,
  onSave,
  onSkip,
  textInput
}) => {
  return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardSubHeader, null, subHeader), /*#__PURE__*/React.createElement(CardHeader, null, header), /*#__PURE__*/React.createElement(CardText, null, cardText), /*#__PURE__*/React.createElement(CardLabel, null, cardLabel), /*#__PURE__*/React.createElement(TextInput, {
    onChange: textInput
  }), /*#__PURE__*/React.createElement(SubmitBar, {
    label: nextText,
    onSubmit: onSave
  }), skip ? /*#__PURE__*/React.createElement(LinkButton, {
    label: skipAndContinueText,
    onClick: onSkip
  }) : null);
};
TextInputCard.propTypes = {
  header: propTypes.string,
  subHeader: propTypes.string,
  cardText: propTypes.string,
  cardLabel: propTypes.string,
  nextText: propTypes.string,
  skipAndContinueText: propTypes.string,
  skip: propTypes.bool,
  onSave: propTypes.func,
  onSkip: propTypes.func,
  textInput: propTypes.string
};
TextInputCard.defaultProps = {
  header: "",
  subHeader: "",
  cardText: "",
  cardLabel: "",
  nextText: "",
  skipAndContinueText: "",
  skip: true,
  onSave: undefined,
  onSkip: undefined,
  textInput: ""
};

const TypeSelectCard = ({
  t,
  headerCaption,
  header,
  cardText,
  disabled: _disabled = false,
  submitBarLabel,
  selectedOption,
  menu,
  optionsKey,
  selected,
  onSave
}) => {
  return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardCaption, null, t(headerCaption)), /*#__PURE__*/React.createElement(CardHeader, null, t(header)), /*#__PURE__*/React.createElement(CardText, null, t(cardText)), menu ? /*#__PURE__*/React.createElement(RadioButtons, {
    selectedOption: selectedOption,
    options: menu,
    optionsKey: optionsKey,
    onSelect: selected
  }) : null, /*#__PURE__*/React.createElement(SubmitBar, {
    disabled: _disabled,
    label: t(submitBarLabel),
    onSubmit: onSave
  }));
};
TypeSelectCard.propTypes = {
  headerCaption: propTypes.string,
  header: propTypes.string,
  cardText: propTypes.string,
  submitBarLabel: propTypes.string,
  selectedOption: propTypes.any,
  menu: propTypes.any,
  optionsKey: propTypes.string,
  selected: propTypes.func,
  onSave: propTypes.func,
  t: propTypes.func
};
TypeSelectCard.defaultProps = {};

const PageBasedInput = ({
  children,
  texts,
  onSubmit
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "PageBasedInputWrapper PageBased"
  }, /*#__PURE__*/React.createElement(Card, null, children, /*#__PURE__*/React.createElement(SubmitBar, {
    className: "SubmitBarInCardInDesktopView",
    label: texts.submitBarLabel,
    onSubmit: onSubmit
  })), /*#__PURE__*/React.createElement("div", {
    className: "SubmitBar"
  }, /*#__PURE__*/React.createElement(SubmitBar, {
    label: texts.submitBarLabel,
    onSubmit: onSubmit
  })));
};

const SearchOnRadioButtons = ({
  options,
  optionsKey,
  additionalWrapperClass,
  onSelect,
  selectedOption,
  SignatureImage: _SignatureImage = () => /*#__PURE__*/React.createElement(SearchIconSvg, null),
  onSearchQueryChange,
  SearchQueryValue,
  placeholder
}) => {
  function optionsReducer(state, action) {
    switch (action.type) {
      case "filter":
        return action.options.filter(i => i[optionsKey].toUpperCase().includes(action.payload.toUpperCase()));
    }
  }
  const [filteredOptions, optionsDispatch] = useReducer(optionsReducer, options);
  function defaultSearchQueryChange(e) {
    optionsDispatch({
      type: "filter",
      payload: e.target.value,
      options
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "SearchOnRadioButton"
  }, /*#__PURE__*/React.createElement(TextInput, {
    textInputStyle: {
      maxWidth: "100%"
    },
    signature: true,
    signatureImg: /*#__PURE__*/React.createElement(_SignatureImage, null),
    onChange: onSearchQueryChange || defaultSearchQueryChange,
    value: SearchQueryValue,
    placeholder: placeholder
  }), /*#__PURE__*/React.createElement(RadioButtons, {
    options: filteredOptions,
    optionsKey,
    additionalWrapperClass,
    onSelect,
    selectedOption
  }));
};

const OnGroundEventCard = ({
  onClick: _onClick = () => null,
  name,
  id,
  eventDetails,
  onGroundEventMonth: _onGroundEventMonth = "MAR",
  onGroundEventDate: _onGroundEventDate = "12 - 16",
  onGroundEventName: _onGroundEventName = "To the moon",
  onGroundEventLocation: _onGroundEventLocation = "Moon",
  onGroundEventTimeRange: _onGroundEventTimeRange = "10:00 am - 1:00 pm",
  eventCategory,
  showEventCatergory
}) => {
  const onEventCardClick = () => _onClick(id);
  return /*#__PURE__*/React.createElement("div", {
    className: "OnGroundEventCard",
    onClick: onEventCardClick
  }, /*#__PURE__*/React.createElement(EventCalendarView, {
    onGroundEventMonth: _onGroundEventMonth,
    onGroundEventDate: _onGroundEventDate
  }), /*#__PURE__*/React.createElement("div", {
    className: "EventDetails"
  }, /*#__PURE__*/React.createElement("h2", null, name), !showEventCatergory ? /*#__PURE__*/React.createElement("div", {
    className: "EventLocation"
  }, /*#__PURE__*/React.createElement(MapMarker, null), /*#__PURE__*/React.createElement("p", null, eventDetails === null || eventDetails === void 0 ? void 0 : eventDetails.address)) : null, !showEventCatergory ? /*#__PURE__*/React.createElement("div", {
    className: "EventTime"
  }, /*#__PURE__*/React.createElement(Clock, null), /*#__PURE__*/React.createElement("p", null, _onGroundEventTimeRange)) : null, showEventCatergory ? /*#__PURE__*/React.createElement("div", {
    className: "EventCategory"
  }, /*#__PURE__*/React.createElement("p", null, eventCategory)) : null));
};

const displayError = ({
  t,
  error,
  name
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    display: 'flex',
    flexDirection: 'column'
  }
}, /*#__PURE__*/React.createElement("div", {
  className: "validation-error"
}, t(error)), /*#__PURE__*/React.createElement("div", {
  className: "validation-error"
}, `${t('ES_COMMON_DOC_FILENAME')} : ${name} ...`));
const fileValidationStatus = (file, regex, maxSize, t) => {
  var _file$name;
  const status = {
    valid: true,
    name: file === null || file === void 0 ? void 0 : (_file$name = file.name) === null || _file$name === void 0 ? void 0 : _file$name.substring(0, 15),
    error: ''
  };
  if (!file) return;
  if (!regex.test(file.type) && file.size / 1024 / 1024 > maxSize) {
    status.valid = false;
    status.error = t(`NOT_SUPPORTED_FILE_TYPE_AND_FILE_SIZE_EXCEEDED`);
  }
  if (!regex.test(file.type)) {
    status.valid = false;
    status.error = t(`NOT_SUPPORTED_FILE_TYPE`);
  }
  if (file.size / 1024 / 1024 > maxSize) {
    status.valid = false;
    status.error = t(`FILE_SIZE_EXCEEDED`);
  }
  return status;
};
const checkIfAllValidFiles = (files, regex, maxSize, t) => {
  if (!files.length || !regex || !maxSize) return [{}, false];
  const messages = [];
  let isInValidGroup = false;
  for (let file of files) {
    const fileStatus = fileValidationStatus(file, regex, maxSize, t);
    if (!fileStatus.valid) {
      isInValidGroup = true;
    }
    messages.push(fileStatus);
  }
  return [messages, isInValidGroup];
};
const MultiUploadWrapper = ({
  t,
  module: _module = "PGR",
  tenantId: _tenantId = Digit.ULBService.getStateId(),
  getFormState,
  requestSpecifcFileRemoval,
  extraStyleName: _extraStyleName = "",
  setuploadedstate: _setuploadedstate = [],
  showHintBelow,
  hintText,
  allowedFileTypesRegex: _allowedFileTypesRegex = /(.*?)(jpg|jpeg|webp|aif|png|image|pdf|msword|openxmlformats-officedocument)$/i,
  allowedMaxSizeInMB: _allowedMaxSizeInMB = 10,
  acceptFiles: _acceptFiles = "image/*, .jpg, .jpeg, .webp, .aif, .png, .image, .pdf, .msword, .openxmlformats-officedocument, .dxf"
}) => {
  const FILES_UPLOADED = "FILES_UPLOADED";
  const TARGET_FILE_REMOVAL = "TARGET_FILE_REMOVAL";
  const [fileErrors, setFileErrors] = useState([]);
  const uploadMultipleFiles = (state, payload) => {
    const {
      files,
      fileStoreIds
    } = payload;
    const filesData = Array.from(files);
    const newUploads = filesData === null || filesData === void 0 ? void 0 : filesData.map((file, index) => [file.name, {
      file,
      fileStoreId: fileStoreIds[index]
    }]);
    return [...state, ...newUploads];
  };
  const removeFile = (state, payload) => {
    const __indexOfItemToDelete = state.findIndex(e => e[0] === payload.file.name);
    const mutatedState = state.filter((e, index) => index !== __indexOfItemToDelete);
    return [...mutatedState];
  };
  const uploadReducer = (state, action) => {
    switch (action.type) {
      case FILES_UPLOADED:
        return uploadMultipleFiles(state, action.payload);
      case TARGET_FILE_REMOVAL:
        return removeFile(state, action.payload);
    }
  };
  const onUploadMultipleFiles = async e => {
    setFileErrors([]);
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const [validationMsg, error] = checkIfAllValidFiles(files, _allowedFileTypesRegex, _allowedMaxSizeInMB, t);
    if (!error) {
      try {
        const {
          data: {
            files: fileStoreIds
          } = {}
        } = await Digit.UploadServices.MultipleFilesStorage(_module, e.target.files, _tenantId);
        return dispatch({
          type: FILES_UPLOADED,
          payload: {
            files: e.target.files,
            fileStoreIds
          }
        });
      } catch (err) {}
    } else {
      setFileErrors(validationMsg);
    }
  };
  const [state, dispatch] = useReducer(uploadReducer, [..._setuploadedstate]);
  useEffect(() => getFormState(state), [state]);
  useEffect(() => {
    requestSpecifcFileRemoval ? dispatch({
      type: TARGET_FILE_REMOVAL,
      payload: requestSpecifcFileRemoval
    }) : null;
  }, [requestSpecifcFileRemoval]);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(UploadFile, {
    onUpload: e => onUploadMultipleFiles(e),
    removeTargetedFile: fileDetailsData => dispatch({
      type: TARGET_FILE_REMOVAL,
      payload: fileDetailsData
    }),
    uploadedFiles: state,
    multiple: true,
    showHintBelow: showHintBelow,
    hintText: hintText,
    extraStyleName: _extraStyleName,
    onDelete: () => {
      setFileErrors([]);
    },
    accept: _acceptFiles
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex'
    }
  }, fileErrors.length ? fileErrors.map(({
    valid,
    name,
    type,
    size,
    error
  }) => valid ? null : displayError({
    t,
    error,
    name
  })) : null));
};

const formatValue = showValue => {
  return showValue && Digit.Utils.locale.stringReplaceAll(showValue, showValue === null || showValue === void 0 ? void 0 : showValue.substring(showValue === null || showValue === void 0 ? void 0 : showValue.indexOf("*"), (showValue === null || showValue === void 0 ? void 0 : showValue.lastIndexOf("*")) + 1), "");
};
const WrapUnMaskComponent = React.memo(({
  privacy: _privacy = {},
  value,
  unmaskField,
  ...rem
}) => {
  const [privacyState, setPrivacyState] = useState(false);
  const {
    loadData = {}
  } = _privacy;
  const {
    t
  } = useTranslation();
  const isMobile = window.Digit.Utils.browser.isMobile();
  const isEmployee = window.location.href.includes("/employee");
  const requestCriteria = [loadData === null || loadData === void 0 ? void 0 : loadData.serviceName, loadData === null || loadData === void 0 ? void 0 : loadData.requestParam, loadData === null || loadData === void 0 ? void 0 : loadData.requestBody, {
    recordId: _privacy === null || _privacy === void 0 ? void 0 : _privacy.uuid,
    plainRequestFields: Array.isArray(_privacy === null || _privacy === void 0 ? void 0 : _privacy.fieldName) ? _privacy === null || _privacy === void 0 ? void 0 : _privacy.fieldName : [_privacy === null || _privacy === void 0 ? void 0 : _privacy.fieldName]
  }, {
    enabled: privacyState,
    cacheTime: 100,
    select: data => {
      if (loadData !== null && loadData !== void 0 && loadData.d) {
        let unmaskeddata = loadData === null || loadData === void 0 ? void 0 : loadData.d(data, value);
        if (rem !== null && rem !== void 0 && rem.setunmaskedNumber) rem === null || rem === void 0 ? void 0 : rem.setunmaskedNumber(unmaskeddata);
        return unmaskeddata;
      }
      return unmaskField ? unmaskField(lodash.get(data, loadData === null || loadData === void 0 ? void 0 : loadData.jsonPath, value)) : lodash.get(data, loadData === null || loadData === void 0 ? void 0 : loadData.jsonPath, value);
    }
  }];
  const {
    isLoading,
    data,
    revalidate
  } = Digit.Hooks.useCustomAPIHook(...requestCriteria);
  useEffect(() => {
    return () => {
      revalidate();
      setPrivacyState(false);
    };
  });
  if (isLoading) {
    return !unmaskField ? /*#__PURE__*/React.createElement(Loader, null) : /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        width: "fit-content",
        marginLeft: isMobile && isEmployee ? "" : "10px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: `tooltip`
    }, /*#__PURE__*/React.createElement(PrivacyMaskIcon, {
      className: "privacy-icon-2",
      style: {
        ...(rem === null || rem === void 0 ? void 0 : rem.style),
        cursor: "default"
      }
    })));
  }
  return _privacy !== null && _privacy !== void 0 && _privacy.uuid && data ? /*#__PURE__*/React.createElement(React.Fragment, null, !unmaskField && !(loadData !== null && loadData !== void 0 && loadData.oldValue) && t(data), !unmaskField && (loadData === null || loadData === void 0 ? void 0 : loadData.oldValue) && data, !unmaskField && (_privacy === null || _privacy === void 0 ? void 0 : _privacy.showValue) && formatValue(value)) : /*#__PURE__*/React.createElement(React.Fragment, null, !unmaskField && value, _privacy && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      width: "fit-content",
      marginLeft: "10px"
    }
  }, /*#__PURE__*/React.createElement(UnMaskComponent, Object.assign({
    privacy: _privacy,
    unmaskData: () => {
      (_privacy === null || _privacy === void 0 ? void 0 : _privacy.uuid) && loadData && setPrivacyState(true);
    }
  }, rem))));
});
WrapUnMaskComponent.propTypes = {
  privacy: propTypes.object
};
WrapUnMaskComponent.defaultProps = {
  privacy: {
    uuid: "",
    fieldName: "",
    model: ""
  }
};

const OpenLinkContainer = ({
  img
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "navbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "center-container"
  }, /*#__PURE__*/React.createElement("img", {
    className: "city",
    id: "topbar-logo",
    crossOrigin: "anonymous",
    src: "https://in-egov-assets.s3.ap-south-1.amazonaws.com/images/Upyog-logo.png",
    alt: "mSeva"
  })));
};
OpenLinkContainer.propTypes = {
  img: propTypes.string
};
OpenLinkContainer.defaultProps = {
  img: undefined
};

const UploadPitPhoto = props => {
  const {
    t
  } = useTranslation();
  const [image, setImage] = useState(null);
  const [uploadedImagesThumbs, setUploadedImagesThumbs] = useState(null);
  const [uploadedImagesIds, setUploadedImagesIds] = useState(props.uploadedImages);
  const [rerender, setRerender] = useState(1);
  const [imageFile, setImageFile] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (image) {
      uploadImage();
    }
  }, [image]);
  useEffect(() => {
    (async () => {
      if (uploadedImagesIds !== null) {
        await submit();
        setRerender(rerender + 1);
        props.onPhotoChange(uploadedImagesIds);
      }
    })();
  }, [uploadedImagesIds]);
  useEffect(() => {
    if (imageFile && imageFile.size > 2097152) {
      setError("FSM_MAXIMUM_PIT_UPLOAD_SIZE_EXCEEDED");
      setTimeout(() => {
        setError(null);
      }, 3000);
    } else {
      setImage(imageFile);
    }
  }, [imageFile]);
  const addUploadedImageIds = useCallback(imageIdData => {
    if (uploadedImagesIds === null) {
      var arr = [];
    } else {
      arr = uploadedImagesIds;
    }
    return [...arr, imageIdData.data.files[0].fileStoreId];
  }, [uploadedImagesIds]);
  function getImage(e) {
    setError(null);
    setImageFile(e.target.files[0]);
  }
  const uploadImage = useCallback(async () => {
    if (uploadedImagesIds === null || uploadedImagesIds.length < 3) {
      const response = await Digit.UploadServices.Filestorage("FSM", image, props.tenantId);
      setUploadedImagesIds(addUploadedImageIds(response));
    }
  }, [addUploadedImageIds, image]);
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
        key
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
  function deleteImage(img) {
    setIsDeleting(true);
    var deleteImageKey = uploadedImagesThumbs.filter((o, index) => o.image === img);
    var uploadedthumbs = uploadedImagesThumbs;
    var newThumbsList = uploadedthumbs.filter(thumbs => thumbs != deleteImageKey[0]);
    var newUploadedImagesIds = uploadedImagesIds.filter(key => key !== deleteImageKey[0].key);
    setUploadedImagesThumbs(newThumbsList);
    setUploadedImagesIds(newUploadedImagesIds);
    Digit.SessionStorage.set("PGR_CREATE_IMAGES", newUploadedImagesIds);
  }
  const handleUpload = event => {
    if (uploadedImagesIds === null || uploadedImagesIds.length < 3) {
      hiddenFileInput.current.click();
    }
  };
  const hiddenFileInput = React.useRef(null);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "imageUploadWrapper",
    style: {
      display: !imageFile ? "none" : "block",
      marginTop: "8px"
    }
  }, /*#__PURE__*/React.createElement(UploadImages, {
    onUpload: getImage,
    onDelete: deleteImage,
    thumbnails: uploadedImagesThumbs ? uploadedImagesThumbs.map(o => o.image) : []
  })), /*#__PURE__*/React.createElement("button", {
    onClick: handleUpload,
    style: {
      width: "100%",
      backgroundColor: "#d6d5d4",
      borderStyle: "solid",
      borderBottom: "1px solid #464646",
      padding: "4px 40px",
      margin: "8px 0px",
      cursor: "pointer",
      outline: "none",
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("input", {
    style: {
      display: "none"
    },
    type: "file",
    accept: "image/*",
    ref: hiddenFileInput,
    onChange: getImage
  }), /*#__PURE__*/React.createElement("p", null, t("UPLOAD_PIT_PHOTO"))), error && /*#__PURE__*/React.createElement(Toast, {
    error: true,
    label: t(error),
    onClose: () => setError(null)
  }));
};

const ToggleSwitch = ({
  value,
  onChange,
  label,
  name,
  ref,
  style,
  ...props
}) => {
  return /*#__PURE__*/React.createElement("div", {
    style: style
  }, /*#__PURE__*/React.createElement("input", {
    checked: value,
    onChange: onChange,
    className: "react-switch-checkbox",
    id: name,
    type: "checkbox"
  }), /*#__PURE__*/React.createElement("label", {
    style: {
      background: value && '#fcefe7'
    },
    className: "react-switch-label",
    htmlFor: name
  }, /*#__PURE__*/React.createElement("span", {
    className: `react-switch-button`,
    style: {
      background: !value && '#bbb'
    }
  })));
};
ToggleSwitch.propTypes = {
  value: propTypes.bool,
  name: propTypes.string,
  onChange: propTypes.func,
  ref: propTypes.func
};
ToggleSwitch.defaultProps = {};

const Heading = props => {
  return /*#__PURE__*/React.createElement("h1", {
    style: {
      marginLeft: "22px"
    },
    className: "heading-m BPAheading-m"
  }, props.label);
};
const Close$1 = () => /*#__PURE__*/React.createElement("svg", {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "#FFFFFF",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z",
  fill: "#0B0C0C"
}));
const CloseBtn = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "icon-bg-secondary",
    onClick: props.onClick,
    style: {
      backgroundColor: "#FFFFFF"
    }
  }, /*#__PURE__*/React.createElement(Close$1, null));
};
const CitizenConsentForm = ({
  t,
  styles,
  mdmsConfig: _mdmsConfig = "",
  setMdmsConfig,
  labels
}) => {
  var _labels$filter, _labels$filter$;
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (_mdmsConfig && !showModal) setShowModal(true);
  }, [_mdmsConfig]);
  const closeModal = () => {
    setShowModal(false);
    setMdmsConfig("");
  };
  const url = labels === null || labels === void 0 ? void 0 : (_labels$filter = labels.filter(data => data.linkId == _mdmsConfig)) === null || _labels$filter === void 0 ? void 0 : (_labels$filter$ = _labels$filter[0]) === null || _labels$filter$ === void 0 ? void 0 : _labels$filter$[Digit.StoreData.getCurrentLanguage()];
  return /*#__PURE__*/React.createElement("div", {
    style: styles ? styles : {}
  }, showModal ? /*#__PURE__*/React.createElement(Modal, {
    headerBarMain: /*#__PURE__*/React.createElement(Heading, {
      label: _mdmsConfig && url ? t(`CCF_${_mdmsConfig === null || _mdmsConfig === void 0 ? void 0 : _mdmsConfig.toUpperCase()}_HEADER`) : ""
    }),
    headerBarEnd: /*#__PURE__*/React.createElement(CloseBtn, {
      onClick: closeModal
    }),
    actionCancelOnSubmit: closeModal,
    formId: "modal-action",
    popupStyles: {
      width: "750px",
      overflow: "auto"
    },
    style: {
      minHeight: "45px",
      height: "auto",
      width: "160px"
    },
    hideSubmit: true,
    headerBarMainStyle: {
      margin: "0px",
      height: "35px"
    }
  }, url ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: "auto",
      height: "91vh",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("iframe", {
    scrollbar: "none",
    border: "none",
    width: "100%",
    height: "100%",
    overflow: "auto",
    src: `${url}`
  })) : /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  }, t("COMMON_URL_NOT_FOUND"))) : null);
};

export { ActionBar, ActionLinks, AddIcon, AddNewIcon, AddressBookIcon, AnnouncementIcon, AppContainer, ApplyFilterBar, ArrowDirection, ArrowDown, ArrowForward, ArrowLeft, ArrowRightInbox, ArrowVectorDown, BPAHomeIcon, BPAIcon, BackButton$1 as BackButton, Banner, BillsIcon, BirthIcon, Body, Breadcrumb as BreadCrumb, BreakLine, ButtonSelector, Calender, CameraIcon, Card, CardBasedOptions, CardCaption, CardHeader, CardLabel, CardLabelDesc, CardLabelError, CardSectionHeader, CardSectionSubText, CardSubHeader, CardText, CardText$1 as CardTextButton, CaseIcon, CheckBox, CheckPoint, CheckSvg, CitizenConsentForm, CitizenHomeCard, CitizenInfoLabel, CitizenTruck, CityMohalla, Clock, Close, CloseSvg, CollectionIcon, CollectionsBookmarIcons, ComplaintIcon, ConnectingCheckPoints, CustomButton, DashboardBox, DatePicker, DateRange, DateWrap, DeathIcon, DeleteIcon, Details, DetailsCard, DisplayPhotos, DocumentIcon, DocumentIconSolid, DocumentSVG, DownloadBtnCommon, DownloadIcon, DownloadImgIcon, DownloadPrefixIcon, DownwardArrow, DropIcon, Dropdown, DustbinIcon, EDCRIcon, EditIcon, EditPencilIcon, Ellipsis, EllipsisMenu, EmailIcon, EmployeeAppContainer, EmployeeModuleCard, ErrorIcon, EventCalendar, EventCalendarView, EventsIconSolid, ExternalLinkIcon, FSMIcon, FilterAction, FilterForm, FilterFormField, FilterIcon, FilterSvg, FinanceChartIcon, FirenocIcon, FormComposer, FormStep, GalleryIcon, GenericFileIcon, GetApp, GreyOutText, Hamburger, Header, HeaderBar, HelpIcon, HelpLineIcon, HomeIcon, HomeLink, ImageIcon, ImageUploadHandler, ImageViewer, InboxComposer, InboxIcon, InboxLinks, InfoBanner, InfoBannerIcon, InfoIcon, InputCard, KeyNote, Label, LabelFieldPair, LanguageIcon, LastRow, LinkButton, LinkLabel, Loader, Localities, LocationIcon, LocationSearch, LocationSearchCard, LoginIcon, LogoutIcon, MCollectIcon, MapMarker, MediaRow, Menu$1 as Menu, MobileNumber, Modal, ModuleCardFullWidth, MultiLink, MultiSelectDropdown, MultiUploadWrapper, NavBar, NotificationBell, OBPSIcon, OBPSIconSolidBg, OTPInput, OnGroundEventCard, OpenLinkContainer, PDFSvg, PGRIcon, PMBIcon, PMBIconSolid, PTIcon, PageBasedInput, Person, PersonIcon, Phone, PitDimension, Poll, PopUp, PopupHeadingLabel, PrevIcon, PrintBtnCommon, PrintIcon, PrivacyMaskIcon, PrivateRoute, PropertyHouse, RadioButtons, RadioOrSelect, Rating, RatingCard, ReceiptIcon, RefreshIcon, RefreshSVG, RemoveIcon, RemoveableTag, ResponseComposer, RoundedLabel, Row, RupeeIcon, RupeeSymbol, SearchAction, SearchField, SearchForm, SearchIcon, SearchIconSvg, SearchOnRadioButtons, SectionalDropdown, ServiceCenterIcon, ShareIcon, ShippingTruck, SortAction, SortDown, SortSvg, SortUp, StandaloneSearchBar, StatusTable, SubmitBar, SurveyIconSolid, TLIcon, Table, TelePhone, TextArea, TextInput, TextInputCard, TickMark, TimerIcon, Toast, ToggleSwitch, TopBar, TypeSelectCard, ULBHomeCard, UnMaskComponent, UploadFile, UploadImages, UploadPitPhoto, UpwardArrow, ValidityTimeIcon, ViewReportIcon, ViewsIcon, WSICon, WhatsNewCard, WhatsappIcon, WhatsappIconGreen, WrapUnMaskComponent };
//# sourceMappingURL=index.modern.js.map
