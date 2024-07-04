import React__default, { useState, useRef, useEffect, useMemo, Fragment as Fragment$1, useContext, createElement, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ModuleCardFullWidth, Calender, CloseSvg, FilterIcon, RefreshIcon, MultiSelectDropdown, Dropdown, Loader, RemoveableTag, Rating, Table, DownloadIcon, EmailIcon, WhatsappIcon, Card, CardLabel, TextInput, EllipsisMenu, CardCaption, SearchIconSvg, Header, MultiLink, ShareIcon, ArrowForward, CardSubHeader, PrivateRoute, BreadCrumb } from '@egovernments/digit-ui-react-components';
import { useHistory, useParams, useRouteMatch, useLocation, Switch as Switch$1, Route } from 'react-router-dom';
import { createStaticRanges, DateRangePicker } from 'react-date-range';
import { ResponsiveContainer, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis, Legend, Area, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import ReactTooltip from 'react-tooltip';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { get } from 'lodash';

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

var MILLISECONDS_IN_DAY = 86400000;
function differenceInCalendarDays(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var startOfDayLeft = startOfDay(dirtyDateLeft);
  var startOfDayRight = startOfDay(dirtyDateRight);
  var timestampLeft = startOfDayLeft.getTime() - getTimezoneOffsetInMilliseconds(startOfDayLeft);
  var timestampRight = startOfDayRight.getTime() - getTimezoneOffsetInMilliseconds(startOfDayRight);
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY);
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

function compareLocalAsc(dateLeft, dateRight) {
  var diff = dateLeft.getFullYear() - dateRight.getFullYear() || dateLeft.getMonth() - dateRight.getMonth() || dateLeft.getDate() - dateRight.getDate() || dateLeft.getHours() - dateRight.getHours() || dateLeft.getMinutes() - dateRight.getMinutes() || dateLeft.getSeconds() - dateRight.getSeconds() || dateLeft.getMilliseconds() - dateRight.getMilliseconds();
  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1;
  } else {
    return diff;
  }
}
function differenceInDays(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  var sign = compareLocalAsc(dateLeft, dateRight);
  var difference = Math.abs(differenceInCalendarDays(dateLeft, dateRight));
  dateLeft.setDate(dateLeft.getDate() - sign * difference);
  var isLastDayNotFull = Number(compareLocalAsc(dateLeft, dateRight) === -sign);
  var result = sign * (difference - isLastDayNotFull);
  return result === 0 ? 0 : result;
}

function endOfDay(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
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

var MILLISECONDS_IN_DAY$1 = 86400000;
function getUTCDayOfYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var timestamp = date.getTime();
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
  var startOfYearTimestamp = date.getTime();
  var difference = timestamp - startOfYearTimestamp;
  return Math.floor(difference / MILLISECONDS_IN_DAY$1) + 1;
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

function getDaysInMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getFullYear();
  var monthIndex = date.getMonth();
  var lastDayOfMonth = new Date(0);
  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth.setHours(0, 0, 0, 0);
  return lastDayOfMonth.getDate();
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

function subSeconds(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addSeconds(dirtyDate, -amount);
}

function subYears(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addYears(dirtyDate, -amount);
}

const nationalScreenURLs = {
  overview: {
    key: "national-overview",
    stateKey: "overview",
    label: "NURT_OVERVIEW",
    active: true,
    nActive: true
  },
  propertytax: {
    key: "national-propertytax",
    stateKey: "propertytax",
    label: "NURT_PROPERTY_TAX",
    active: true,
    nActive: true
  },
  tradelicense: {
    key: "national-tradelicense",
    stateKey: "tradelicense",
    label: "NURT_TRADE_LICENCE",
    active: true,
    nActive: true
  },
  pgr: {
    key: "national-pgr",
    stateKey: "pgr",
    label: "NURT_COMPLAINS",
    active: true,
    nActive: true
  },
  fsm: {
    key: "fsm",
    stateKey: "fsm",
    label: "CS_HOME_FSM_SERVICES",
    active: true,
    nActive: false
  },
  mCollect: {
    key: "national-mcollect",
    stateKey: "mCollect",
    label: "NURT_MCOLLECT",
    active: true,
    nActive: true
  },
  ws: {
    key: "national-ws",
    stateKey: "ws",
    label: "NURT_WATER_SEWERAGE",
    active: true,
    nActive: true
  },
  obps: {
    key: "nss-obps",
    stateKey: "obps",
    label: "DSS_BUILDING_PERMISSION",
    active: true,
    nActive: true
  },
  noc: {
    key: "national-firenoc",
    stateKey: "noc",
    label: "NURT_FIRENOC",
    active: true,
    nActive: true
  },
  bnd: {
    key: "nss-birth-death",
    stateKey: "birth-death",
    label: "BIRTH_AND_DEATH",
    active: true,
    nActive: true
  },
  faqs: {
    key: "national-faqs",
    stateKey: "national-faqs",
    label: "DSS_FAQS",
    active: false,
    nActive: true,
    others: true
  },
  finance: {
    key: "national-finance",
    stateKey: "finance",
    label: "DSS_FINANCE",
    active: true,
    nActive: false
  },
  about: {
    key: "national-about",
    stateKey: "national-about",
    label: "DSS_ABOUT_DASHBOARD",
    active: false,
    nActive: true,
    others: true
  }
};
const checkCurrentScreen = () => {
  const moduleName = Digit.Utils.dss.getCurrentModuleName();
  const nationalURLS = Object.keys(nationalScreenURLs).map(key => nationalScreenURLs[key].key);
  return nationalURLS.filter(ele => ele !== "fsm").some(e => moduleName === null || moduleName === void 0 ? void 0 : moduleName.includes(e));
};
const NDSSCard = () => {
  const NATADMIN = Digit.UserService.hasAccess("NATADMIN");
  const {
    t
  } = useTranslation();
  if (!NATADMIN) {
    return null;
  }
  let links = Object.values(nationalScreenURLs).filter(ele => ele["nActive"] === true).map(obj => ({
    label: t(obj === null || obj === void 0 ? void 0 : obj.label),
    link: `/digit-ui/employee/dss/dashboard/${obj === null || obj === void 0 ? void 0 : obj.key}`,
    link: obj !== null && obj !== void 0 && obj.others ? `/digit-ui/employee/dss/${obj === null || obj === void 0 ? void 0 : obj.key}` : `/digit-ui/employee/dss/dashboard/${obj === null || obj === void 0 ? void 0 : obj.key}`
  }));
  const propsForModuleCard = {
    headerStyle: {
      border: "none",
      height: "48px"
    },
    moduleName: t("ACTION_TEST_NATDASHBOARD"),
    subHeader: t("ACTION_TEST_NATDASHBOARD"),
    subHeaderLink: `/digit-ui/employee/dss/landing/NURT_DASHBOARD`,
    className: "employeeCard customEmployeeCard card-home full-width-card full-employee-card-height",
    links: [...links]
  };
  return /*#__PURE__*/React__default.createElement(ModuleCardFullWidth, propsForModuleCard);
};
const DSSCard = () => {
  const STADMIN = Digit.UserService.hasAccess("STADMIN");
  const {
    t
  } = useTranslation();
  if (!STADMIN) {
    return null;
  }
  let links = Object.values(nationalScreenURLs).filter(ele => ele["active"] === true).map(obj => ({
    label: t(obj === null || obj === void 0 ? void 0 : obj.label),
    link: obj.active ? `/digit-ui/employee/dss/dashboard/${obj === null || obj === void 0 ? void 0 : obj.stateKey}` : `/employee/integration/dss/${obj === null || obj === void 0 ? void 0 : obj.stateKey}`
  }));
  const propsForModuleCard = {
    headerStyle: {
      border: "none",
      height: "48px"
    },
    moduleName: t("ES_TITLE_DSS"),
    subHeader: t("ACTION_TEST_SURE_DASHBOARD"),
    subHeaderLink: `/digit-ui/employee/dss/landing/home`,
    className: "employeeCard card-home customEmployeeCard full-width-card full-employee-card-height",
    links: [...links]
  };
  return /*#__PURE__*/React__default.createElement(ModuleCardFullWidth, Object.assign({}, propsForModuleCard, {
    styles: {
      width: "100%"
    }
  }));
};

const FilterContext = React__default.createContext({});

function isEndDateFocused(focusNumber) {
  return focusNumber === 1;
}
function isStartDateFocused(focusNumber) {
  return focusNumber === 0;
}
const DateRange = ({
  values,
  onFilterChange,
  t
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [focusedRange, setFocusedRange] = useState([0, 0]);
  const [selectionRange, setSelectionRange] = useState(values);
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
    if (!isModalOpen) {
      const startDate = selectionRange === null || selectionRange === void 0 ? void 0 : selectionRange.startDate;
      const endDate = selectionRange === null || selectionRange === void 0 ? void 0 : selectionRange.endDate;
      const interval = getDuration(selectionRange === null || selectionRange === void 0 ? void 0 : selectionRange.startDate, selectionRange === null || selectionRange === void 0 ? void 0 : selectionRange.endDate);
      const title = `${format(selectionRange === null || selectionRange === void 0 ? void 0 : selectionRange.startDate, "MMM d, yyyy")} - ${format(selectionRange === null || selectionRange === void 0 ? void 0 : selectionRange.endDate, "MMM d, yyyy")}`;
      onFilterChange({
        range: {
          startDate,
          endDate,
          interval,
          title
        },
        requestDate: {
          startDate,
          endDate,
          interval,
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
        endDate: subSeconds(endOfYesterday(), 1)
      })
    }, {
      label: t("DSS_THIS_WEEK"),
      range: () => ({
        startDate: startOfWeek(new Date()),
        endDate: endOfToday()
      })
    }, {
      label: t("DSS_THIS_MONTH"),
      range: () => ({
        startDate: startOfMonth(new Date()),
        endDate: endOfToday()
      })
    }, {
      label: t("DSS_THIS_QUARTER"),
      range: () => ({
        startDate: startOfQuarter(new Date()),
        endDate: subSeconds(endOfToday(), 1)
      })
    }, {
      label: t("DSS_PREVIOUS_YEAR"),
      range: () => {
        if (new Date().getMonth() < 3) {
          return {
            startDate: subYears(addMonths(startOfYear(new Date()), 3), 2),
            endDate: subSeconds(subYears(addMonths(endOfYear(new Date()), 3), 2), 1)
          };
        } else {
          return {
            startDate: subYears(addMonths(startOfYear(new Date()), 3), 1),
            endDate: subSeconds(subYears(addMonths(endOfYear(new Date()), 3), 1), 1)
          };
        }
      }
    }, {
      label: t("DSS_THIS_YEAR"),
      range: () => {
        return {
          startDate: Digit.Utils.dss.getDefaultFinacialYear().startDate,
          endDate: Digit.Utils.dss.getDefaultFinacialYear().endDate
        };
      }
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
  const handleSelect = (ranges, e) => {
    var _selection;
    let {
      range1: selection
    } = ranges;
    selection = {
      ...selection,
      endDate: endOfDay((_selection = selection) === null || _selection === void 0 ? void 0 : _selection.endDate)
    };
    const {
      startDate,
      endDate,
      title,
      interval
    } = selection;
    if (staticRanges.some(range => {
      let newRange = range.range();
      return differenceInDays(newRange.startDate, startDate) === 0 && differenceInDays(newRange.endDate, endDate) === 0;
    })) {
      setSelectionRange(selection);
      setIsModalOpen(false);
    } else if (isStartDateFocused(focusedRange[1])) {
      setSelectionRange(selection);
    } else if (isEndDateFocused(focusedRange[1])) {
      setSelectionRange({
        title,
        interval,
        startDate,
        endDate: endDate
      });
      setIsModalOpen(false);
    }
  };
  return /*#__PURE__*/React__default.createElement(Fragment$1, null, /*#__PURE__*/React__default.createElement("div", {
    className: "mbsm"
  }, t(`ES_DSS_DATE_RANGE`)), /*#__PURE__*/React__default.createElement("div", {
    className: "employee-select-wrap",
    ref: wrapperRef
  }, /*#__PURE__*/React__default.createElement("div", {
    className: `select ${isModalOpen ? "dss-input-active-border" : ""}`
  }, /*#__PURE__*/React__default.createElement("input", {
    className: `employee-select-wrap--elipses`,
    type: "text",
    value: values !== null && values !== void 0 && values.title ? `${values === null || values === void 0 ? void 0 : values.title}` : "",
    readOnly: true,
    onClick: () => setIsModalOpen(prevState => !prevState)
  }), /*#__PURE__*/React__default.createElement(Calender, {
    className: "cursorPointer",
    onClick: () => setIsModalOpen(prevState => !prevState)
  })), isModalOpen && /*#__PURE__*/React__default.createElement("div", {
    className: "options-card",
    style: {
      overflow: "visible",
      width: "unset",
      maxWidth: "unset"
    }
  }, /*#__PURE__*/React__default.createElement(DateRangePicker, {
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

const denominations = ["Cr", "Lac", "Unit"];
const Switch = ({
  onSelect,
  t
}) => {
  const {
    value
  } = useContext(FilterContext);
  return /*#__PURE__*/React__default.createElement(Fragment$1, null, /*#__PURE__*/React__default.createElement("div", {
    className: "mbsm"
  }, t(`ES_DSS_DENOMINATION`)), /*#__PURE__*/React__default.createElement("div", {
    className: "switch-wrapper"
  }, denominations.map((label, idx) => /*#__PURE__*/React__default.createElement("div", {
    key: idx
  }, /*#__PURE__*/React__default.createElement("input", {
    type: "radio",
    id: label,
    className: "radio-switch",
    name: "unit",
    checked: label === (value === null || value === void 0 ? void 0 : value.denomination),
    onClick: () => onSelect({
      denomination: label
    })
  }), /*#__PURE__*/React__default.createElement("label", {
    className: "cursorPointer",
    htmlFor: label
  }, t(Digit.Utils.locale.getTransformedLocale(`ES_DSS_${label}`)))))));
};

const Filters = ({
  t,
  ulbTenants,
  services,
  isOpen,
  closeFilters,
  showDateRange: _showDateRange = true,
  showDDR: _showDDR = true,
  showUlb: _showUlb = true,
  showDenomination: _showDenomination = true,
  showModuleFilter: _showModuleFilter = true,
  isNational: _isNational = false
}) => {
  var _value$filters3, _ulbTenants$ddr, _ulbTenants$ulb2;
  const {
    value,
    setValue
  } = useContext(FilterContext);
  const [selected, setSelected] = useState(() => ulbTenants === null || ulbTenants === void 0 ? void 0 : ulbTenants.ulb.filter(tenant => {
    var _value$filters, _value$filters$tenant;
    return value === null || value === void 0 ? void 0 : (_value$filters = value.filters) === null || _value$filters === void 0 ? void 0 : (_value$filters$tenant = _value$filters.tenantId) === null || _value$filters$tenant === void 0 ? void 0 : _value$filters$tenant.find(selectedTenant => selectedTenant === (tenant === null || tenant === void 0 ? void 0 : tenant.code));
  }));
  useEffect(() => {
    var _ulbTenants$ulb;
    setSelected(ulbTenants === null || ulbTenants === void 0 ? void 0 : (_ulbTenants$ulb = ulbTenants.ulb) === null || _ulbTenants$ulb === void 0 ? void 0 : _ulbTenants$ulb.filter(tenant => {
      var _value$filters2, _value$filters2$tenan;
      return value === null || value === void 0 ? void 0 : (_value$filters2 = value.filters) === null || _value$filters2 === void 0 ? void 0 : (_value$filters2$tenan = _value$filters2.tenantId) === null || _value$filters2$tenan === void 0 ? void 0 : _value$filters2$tenan.find(selectedTenant => selectedTenant === (tenant === null || tenant === void 0 ? void 0 : tenant.code));
    }));
  }, [value === null || value === void 0 ? void 0 : (_value$filters3 = value.filters) === null || _value$filters3 === void 0 ? void 0 : _value$filters3.tenantId]);
  const [selectService, setSelectedService] = useState(() => services === null || services === void 0 ? void 0 : services.filter(module => (value === null || value === void 0 ? void 0 : value.moduleLevel) === (module === null || module === void 0 ? void 0 : module.code)));
  useEffect(() => {
    setSelectedService(services === null || services === void 0 ? void 0 : services.filter(module => (value === null || value === void 0 ? void 0 : value.moduleLevel) === (module === null || module === void 0 ? void 0 : module.code)));
  }, [value === null || value === void 0 ? void 0 : value.moduleLevel]);
  const handleFilterChange = data => {
    setValue({
      ...value,
      ...data
    });
  };
  const selectFilters = (e, data) => {
    setValue({
      ...value,
      filters: {
        tenantId: e.map(allPropsData => {
          var _allPropsData$;
          return allPropsData === null || allPropsData === void 0 ? void 0 : (_allPropsData$ = allPropsData[1]) === null || _allPropsData$ === void 0 ? void 0 : _allPropsData$.code;
        })
      }
    });
  };
  const selectServicesFilters = (e, data) => {
    setValue({
      ...value,
      moduleLevel: e === null || e === void 0 ? void 0 : e.code
    });
  };
  const selectDDR = (e, data) => {
    const DDRsSelectedByUser = ulbTenants.ulb.filter(ulb => {
      return !!e.find(tenant => {
        return ulb.ddrKey === (tenant === null || tenant === void 0 ? void 0 : tenant[1].ddrKey);
      });
    });
    setValue({
      ...value,
      filters: {
        tenantId: DDRsSelectedByUser.map(allPropsData => allPropsData === null || allPropsData === void 0 ? void 0 : allPropsData.code)
      }
    });
  };
  const selectedDDRs = useMemo(() => selected.map(ulb => ulbTenants.ulb.filter(e => e.code === ulb.code)[0]).filter((item, i, arr) => i === arr.findIndex(t => t.ddrKey === item.ddrKey)), [selected, ulbTenants]);
  const handleClear = () => {
    setValue({
      denomination: "Unit",
      range: Digit.Utils.dss.getInitialRange()
    });
  };
  return /*#__PURE__*/React__default.createElement("div", {
    className: `filters-wrapper ${isOpen ? "filters-modal" : ""}`,
    style: {
      justifyContent: window.location.href.includes("dss/dashboard/finance") && !isOpen ? "space-between" : "unset",
      paddingRight: window.location.href.includes("dss/dashboard/finance") && !isOpen ? "24px" : "0px",
      paddingBottom: window.location.href.includes("dss/dashboard/finance") && !isOpen ? "20px" : "unset"
    }
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "filter-close",
    onClick: () => closeFilters()
  }, /*#__PURE__*/React__default.createElement(CloseSvg, null)), isOpen && /*#__PURE__*/React__default.createElement("div", {
    className: "filter-header"
  }, /*#__PURE__*/React__default.createElement(FilterIcon, null), /*#__PURE__*/React__default.createElement("p", null, t(`DSS_FILTERS`)), /*#__PURE__*/React__default.createElement("span", {
    onClick: handleClear
  }, /*#__PURE__*/React__default.createElement(RefreshIcon, null))), _showDateRange && /*#__PURE__*/React__default.createElement("div", {
    className: "filters-input"
  }, /*#__PURE__*/React__default.createElement(DateRange, {
    onFilterChange: handleFilterChange,
    values: value === null || value === void 0 ? void 0 : value.range,
    t: t
  })), _showDDR && /*#__PURE__*/React__default.createElement("div", {
    className: "filters-input"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "mbsm"
  }, t(_isNational ? "ES_DSS_STATE" : "ES_DSS_DDR")), /*#__PURE__*/React__default.createElement(MultiSelectDropdown, {
    options: (ulbTenants === null || ulbTenants === void 0 ? void 0 : ulbTenants.ddr) && ((_ulbTenants$ddr = ulbTenants.ddr) === null || _ulbTenants$ddr === void 0 ? void 0 : _ulbTenants$ddr.sort((x, y) => {
      var _x$ddrKey;
      return x === null || x === void 0 ? void 0 : (_x$ddrKey = x.ddrKey) === null || _x$ddrKey === void 0 ? void 0 : _x$ddrKey.localeCompare(y === null || y === void 0 ? void 0 : y.ddrKey);
    })),
    optionsKey: "ddrKey",
    onSelect: selectDDR,
    selected: selectedDDRs,
    defaultLabel: t(_isNational ? "ES_DSS_ALL_STATE_SELECTED" : "ES_DSS_ALL_DDR_SELECTED"),
    defaultUnit: t(_isNational ? "ES_DSS_STATE_SELECTED" : "ES_DSS_DDR_SELECTED")
  })), _showUlb && /*#__PURE__*/React__default.createElement("div", {
    className: "filters-input"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "mbsm"
  }, t("ES_DSS_ULB")), /*#__PURE__*/React__default.createElement(MultiSelectDropdown, {
    options: ulbTenants === null || ulbTenants === void 0 ? void 0 : (_ulbTenants$ulb2 = ulbTenants.ulb) === null || _ulbTenants$ulb2 === void 0 ? void 0 : _ulbTenants$ulb2.sort((x, y) => {
      var _x$ulbKey;
      return x === null || x === void 0 ? void 0 : (_x$ulbKey = x.ulbKey) === null || _x$ulbKey === void 0 ? void 0 : _x$ulbKey.localeCompare(y === null || y === void 0 ? void 0 : y.ulbKey);
    }),
    optionsKey: "ulbKey",
    onSelect: selectFilters,
    selected: selected,
    defaultLabel: t("ES_DSS_ALL_ULB_SELECTED"),
    defaultUnit: t("ES_DSS_DDR_SELECTED")
  })), !_isNational && _showModuleFilter && /*#__PURE__*/React__default.createElement("div", {
    className: "filters-input"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "mbsm"
  }, t("ES_DSS_SERVICES")), /*#__PURE__*/React__default.createElement(Dropdown, {
    option: services,
    optionKey: "name",
    select: selectServicesFilters,
    selected: selectService,
    placeholder: t("ES_DSS_ALL_SERVICES_SELECTED")
  })), _showDenomination && /*#__PURE__*/React__default.createElement("div", {
    className: "filters-input",
    style: {
      flexBasis: "16%"
    }
  }, /*#__PURE__*/React__default.createElement(Switch, {
    onSelect: handleFilterChange,
    t: t
  })));
};

const Filters$1 = ({
  t,
  ulbTenants,
  isOpen,
  closeFilters,
  showDateRange: _showDateRange = true,
  showDDR: _showDDR = true,
  showUlb: _showUlb = true,
  showDenomination: _showDenomination = true,
  isNational: _isNational = false
}) => {
  var _ulbTenants$ddr3, _ulbTenants$ddr3$sort, _ulbTenants$ulb3, _ulbTenants$ulb3$filt;
  const {
    value,
    setValue
  } = useContext(FilterContext);
  const [selected, setSelected] = useState(() => {
    var _ulbTenants$ulb;
    return ulbTenants === null || ulbTenants === void 0 ? void 0 : (_ulbTenants$ulb = ulbTenants.ulb) === null || _ulbTenants$ulb === void 0 ? void 0 : _ulbTenants$ulb.filter(tenant => {
      var _value$filters, _value$filters$ulb;
      return value === null || value === void 0 ? void 0 : (_value$filters = value.filters) === null || _value$filters === void 0 ? void 0 : (_value$filters$ulb = _value$filters.ulb) === null || _value$filters$ulb === void 0 ? void 0 : _value$filters$ulb.find(selectedTenant => selectedTenant === (tenant === null || tenant === void 0 ? void 0 : tenant.code));
    });
  });
  const [selectedSt, setSelectedSt] = useState(() => {
    var _ulbTenants$ddr;
    return ulbTenants === null || ulbTenants === void 0 ? void 0 : (_ulbTenants$ddr = ulbTenants.ddr) === null || _ulbTenants$ddr === void 0 ? void 0 : _ulbTenants$ddr.filter(tenant => {
      var _value$filters2, _value$filters2$state;
      return value === null || value === void 0 ? void 0 : (_value$filters2 = value.filters) === null || _value$filters2 === void 0 ? void 0 : (_value$filters2$state = _value$filters2.state) === null || _value$filters2$state === void 0 ? void 0 : _value$filters2$state.find(selectedTenant => selectedTenant === (tenant === null || tenant === void 0 ? void 0 : tenant.code));
    });
  });
  useEffect(() => {
    var _ulbTenants$ulb2, _ulbTenants$ddr2;
    setSelected(ulbTenants === null || ulbTenants === void 0 ? void 0 : (_ulbTenants$ulb2 = ulbTenants.ulb) === null || _ulbTenants$ulb2 === void 0 ? void 0 : _ulbTenants$ulb2.filter(tenant => {
      var _value$filters3, _value$filters3$ulb;
      return value === null || value === void 0 ? void 0 : (_value$filters3 = value.filters) === null || _value$filters3 === void 0 ? void 0 : (_value$filters3$ulb = _value$filters3.ulb) === null || _value$filters3$ulb === void 0 ? void 0 : _value$filters3$ulb.find(selectedTenant => selectedTenant === (tenant === null || tenant === void 0 ? void 0 : tenant.code));
    }));
    setSelectedSt(ulbTenants === null || ulbTenants === void 0 ? void 0 : (_ulbTenants$ddr2 = ulbTenants.ddr) === null || _ulbTenants$ddr2 === void 0 ? void 0 : _ulbTenants$ddr2.filter(tenant => {
      var _value$filters4, _value$filters4$state;
      return value === null || value === void 0 ? void 0 : (_value$filters4 = value.filters) === null || _value$filters4 === void 0 ? void 0 : (_value$filters4$state = _value$filters4.state) === null || _value$filters4$state === void 0 ? void 0 : _value$filters4$state.find(selectedTenant => selectedTenant === (tenant === null || tenant === void 0 ? void 0 : tenant.code));
    }));
  }, [value]);
  const handleFilterChange = data => {
    setValue({
      ...value,
      ...data
    });
  };
  const selectFilters = (e, data) => {
    var _value$filters5, _value$filters5$state;
    let ulbs = e.map(allPropsData => {
      var _allPropsData$;
      return allPropsData === null || allPropsData === void 0 ? void 0 : (_allPropsData$ = allPropsData[1]) === null || _allPropsData$ === void 0 ? void 0 : _allPropsData$.code;
    });
    let states = ulbTenants === null || ulbTenants === void 0 ? void 0 : ulbTenants.ulb.filter(ele => ulbs.includes(ele.code)).map(e => e.ddrKey);
    let newStates = ulbTenants === null || ulbTenants === void 0 ? void 0 : ulbTenants.ddr.filter(ele => states.includes(ele.ddrKey)).map(e => e.code);
    if ((value === null || value === void 0 ? void 0 : (_value$filters5 = value.filters) === null || _value$filters5 === void 0 ? void 0 : (_value$filters5$state = _value$filters5.state) === null || _value$filters5$state === void 0 ? void 0 : _value$filters5$state.length) > 0) {
      var _value$filters6;
      value === null || value === void 0 ? void 0 : (_value$filters6 = value.filters) === null || _value$filters6 === void 0 ? void 0 : _value$filters6.state.map(stt => {
        if (!newStates.includes(stt)) {
          newStates.push(stt);
        }
      });
    }
    setValue({
      ...value,
      filters: {
        ...value.filters,
        ulb: ulbs,
        state: newStates
      }
    });
  };
  const selectStFilters = (e, data) => {
    setValue({
      ...value,
      filters: {
        ...value.filters,
        state: e.map(allPropsData => {
          var _allPropsData$2;
          return allPropsData === null || allPropsData === void 0 ? void 0 : (_allPropsData$2 = allPropsData[1]) === null || _allPropsData$2 === void 0 ? void 0 : _allPropsData$2.code;
        })
      }
    });
  };
  const handleClear = () => {
    setValue({
      denomination: "Unit",
      range: Digit.Utils.dss.getInitialRange()
    });
  };
  return /*#__PURE__*/React__default.createElement("div", {
    className: `filters-wrapper ${isOpen ? "filters-modal" : ""}`
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "filter-close",
    onClick: () => closeFilters()
  }, /*#__PURE__*/React__default.createElement(CloseSvg, null)), isOpen && /*#__PURE__*/React__default.createElement("div", {
    className: "filter-header"
  }, /*#__PURE__*/React__default.createElement(FilterIcon, null), /*#__PURE__*/React__default.createElement("p", null, t(`DSS_FILTERS`)), /*#__PURE__*/React__default.createElement("span", {
    onClick: handleClear
  }, /*#__PURE__*/React__default.createElement(RefreshIcon, null))), _showDateRange && /*#__PURE__*/React__default.createElement("div", {
    className: "filters-input"
  }, /*#__PURE__*/React__default.createElement(DateRange, {
    onFilterChange: handleFilterChange,
    values: value === null || value === void 0 ? void 0 : value.range,
    t: t
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "filters-input"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "mbsm"
  }, t(_isNational ? "ES_DSS_STATE" : "ES_DSS_DDR")), /*#__PURE__*/React__default.createElement(MultiSelectDropdown, {
    options: (ulbTenants === null || ulbTenants === void 0 ? void 0 : ulbTenants.ddr) && ((_ulbTenants$ddr3 = ulbTenants.ddr) === null || _ulbTenants$ddr3 === void 0 ? void 0 : (_ulbTenants$ddr3$sort = _ulbTenants$ddr3.sort((x, y) => {
      var _x$ddrKey;
      return x === null || x === void 0 ? void 0 : (_x$ddrKey = x.ddrKey) === null || _x$ddrKey === void 0 ? void 0 : _x$ddrKey.localeCompare(y === null || y === void 0 ? void 0 : y.ddrKey);
    })) === null || _ulbTenants$ddr3$sort === void 0 ? void 0 : _ulbTenants$ddr3$sort.map(ele => ({
      ...ele,
      i18Key: `DSS_TB_${Digit.Utils.locale.getTransformedLocale(ele === null || ele === void 0 ? void 0 : ele.ddrKey)}`
    }))),
    optionsKey: "i18Key",
    onSelect: selectStFilters,
    selected: selectedSt === null || selectedSt === void 0 ? void 0 : selectedSt.map(ele => ({
      ...ele,
      i18Key: `DSS_TB_${Digit.Utils.locale.getTransformedLocale(ele === null || ele === void 0 ? void 0 : ele.ddrKey)}`
    })),
    defaultLabel: t(_isNational ? "ES_DSS_ALL_STATE_SELECTED" : "ES_DSS_ALL_DDR_SELECTED"),
    defaultUnit: t(_isNational ? "ES_DSS_STATE_SELECTED" : "ES_DSS_DDR_SELECTED")
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "filters-input"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "mbsm"
  }, t("ES_DSS_ULB")), /*#__PURE__*/React__default.createElement(MultiSelectDropdown, {
    options: ulbTenants === null || ulbTenants === void 0 ? void 0 : (_ulbTenants$ulb3 = ulbTenants.ulb) === null || _ulbTenants$ulb3 === void 0 ? void 0 : (_ulbTenants$ulb3$filt = _ulbTenants$ulb3.filter(e => Digit.Utils.dss.checkSelected(e, selectedSt)).sort((x, y) => {
      var _x$ulbKey;
      return x === null || x === void 0 ? void 0 : (_x$ulbKey = x.ulbKey) === null || _x$ulbKey === void 0 ? void 0 : _x$ulbKey.localeCompare(y === null || y === void 0 ? void 0 : y.ulbKey);
    })) === null || _ulbTenants$ulb3$filt === void 0 ? void 0 : _ulbTenants$ulb3$filt.map(ele => ({
      ...ele,
      i18Key: `DSS_TB_${Digit.Utils.locale.getTransformedLocale(ele === null || ele === void 0 ? void 0 : ele.ulbKey)}`
    })),
    optionsKey: "i18Key",
    onSelect: selectFilters,
    selected: selected === null || selected === void 0 ? void 0 : selected.map(ele => ({
      ...ele,
      i18Key: `DSS_TB_${Digit.Utils.locale.getTransformedLocale(ele === null || ele === void 0 ? void 0 : ele.ulbKey)}`
    })),
    defaultLabel: t("ES_DSS_ALL_ULB_SELECTED"),
    defaultUnit: t("ES_DSS_DDR_SELECTED")
  })), _showDenomination && /*#__PURE__*/React__default.createElement("div", {
    className: "filters-input",
    style: {
      flexBasis: "16%"
    }
  }, /*#__PURE__*/React__default.createElement(Switch, {
    onSelect: handleFilterChange,
    t: t
  })));
};

const NoData = ({
  t
}) => /*#__PURE__*/React__default.createElement("div", {
  className: "no-data"
}, /*#__PURE__*/React__default.createElement("p", null, t("DSS_NO_DATA")));

const COLORS = ["#048BD0", "#FBC02D", "#8E29BF", "#EA8A3B", "#0BABDE", "#6E8459", "#D4351C", "#0CF7E4", "#F80BF4", "#22F80B"];
const increasedHeightCharts = ["nssOBPSTotalPermitsVsTotalOCSubmittedVsTotalOCIssued", "nssNOCApplicationVsProvisionalVsActual", "nocApplicationVsProvisionalVsActual", "permitsandOCissued"];
const getColors = (index = 0) => {
  index = COLORS.length > index ? index : 0;
  return COLORS[index];
};
const getDenominatedValue = (denomination, plotValue) => {
  switch (denomination) {
    case "Unit":
      return plotValue;
    case "Lac":
      return Number((plotValue / 100000).toFixed(2));
    case "Cr":
      return Number((plotValue / 10000000).toFixed(2));
    default:
      return "";
  }
};
const getValue = plot => plot.value;
const CustomAreaChart = ({
  xDataKey: _xDataKey = "name",
  yDataKey: _yDataKey = getValue,
  data,
  setChartDenomination
}) => {
  var _value$range, _value$range$startDat, _value$range2, _value$range2$endDate;
  const lineLegend = {
    margin: "10px"
  };
  const {
    t
  } = useTranslation();
  const {
    id
  } = data;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const {
    value
  } = useContext(FilterContext);
  const [totalCapacity, setTotalCapacity] = useState(0);
  const [totalWaste, setTotalWaste] = useState(0);
  const [keysArr, setKeysArr] = useState([]);
  const [manageChart, setmanageChart] = useState("Area");
  const stateTenant = Digit.ULBService.getStateId();
  const {
    isMdmsLoading,
    data: mdmsData
  } = Digit.Hooks.useCommonMDMS(stateTenant, "FSM", "FSTPPlantInfo", {
    enabled: id === "fsmCapacityUtilization"
  });
  const {
    isLoading,
    data: response
  } = Digit.Hooks.dss.useGetChart({
    key: id,
    type: "metric",
    tenantId,
    requestDate: {
      ...(value === null || value === void 0 ? void 0 : value.requestDate),
      startDate: value === null || value === void 0 ? void 0 : (_value$range = value.range) === null || _value$range === void 0 ? void 0 : (_value$range$startDat = _value$range.startDate) === null || _value$range$startDat === void 0 ? void 0 : _value$range$startDat.getTime(),
      endDate: value === null || value === void 0 ? void 0 : (_value$range2 = value.range) === null || _value$range2 === void 0 ? void 0 : (_value$range2$endDate = _value$range2.endDate) === null || _value$range2$endDate === void 0 ? void 0 : _value$range2$endDate.getTime()
    },
    filters: value === null || value === void 0 ? void 0 : value.filters
  });
  useEffect(() => {
    if (mdmsData) {
      var _value$filters, _value$filters$tenant;
      let fstpPlants = mdmsData;
      if ((value === null || value === void 0 ? void 0 : (_value$filters = value.filters) === null || _value$filters === void 0 ? void 0 : (_value$filters$tenant = _value$filters.tenantId) === null || _value$filters$tenant === void 0 ? void 0 : _value$filters$tenant.length) > 0) {
        fstpPlants = mdmsData.filter(plant => {
          var _value$filters2, _value$filters2$tenan;
          return value === null || value === void 0 ? void 0 : (_value$filters2 = value.filters) === null || _value$filters2 === void 0 ? void 0 : (_value$filters2$tenan = _value$filters2.tenantId) === null || _value$filters2$tenan === void 0 ? void 0 : _value$filters2$tenan.some(tenant => plant === null || plant === void 0 ? void 0 : plant.ULBS.includes(tenant));
        });
      }
      const totalCapacity = fstpPlants.reduce((acc, plant) => acc + Number(plant === null || plant === void 0 ? void 0 : plant.PlantOperationalCapacityKLD), 0);
      setTotalCapacity(totalCapacity);
    }
  }, [mdmsData, value]);
  useEffect(() => {
    if (response) {
      var _response$responseDat, _response$responseDat2, _response$responseDat3, _response$responseDat4, _response$responseDat5, _response$responseDat6, _response$responseDat7, _response$responseDat8, _response$responseDat9, _response$responseDat10;
      const totalWaste = Math.round(response === null || response === void 0 ? void 0 : (_response$responseDat = response.responseData) === null || _response$responseDat === void 0 ? void 0 : (_response$responseDat2 = _response$responseDat.data) === null || _response$responseDat2 === void 0 ? void 0 : (_response$responseDat3 = _response$responseDat2[0]) === null || _response$responseDat3 === void 0 ? void 0 : (_response$responseDat4 = _response$responseDat3.plots[(response === null || response === void 0 ? void 0 : (_response$responseDat5 = response.responseData) === null || _response$responseDat5 === void 0 ? void 0 : (_response$responseDat6 = _response$responseDat5.data) === null || _response$responseDat6 === void 0 ? void 0 : (_response$responseDat7 = _response$responseDat6[0]) === null || _response$responseDat7 === void 0 ? void 0 : _response$responseDat7.plots.length) - 1]) === null || _response$responseDat4 === void 0 ? void 0 : _response$responseDat4.value);
      setTotalWaste(totalWaste);
      setChartDenomination(response === null || response === void 0 ? void 0 : (_response$responseDat8 = response.responseData) === null || _response$responseDat8 === void 0 ? void 0 : (_response$responseDat9 = _response$responseDat8.data) === null || _response$responseDat9 === void 0 ? void 0 : (_response$responseDat10 = _response$responseDat9[0]) === null || _response$responseDat10 === void 0 ? void 0 : _response$responseDat10.headerSymbol);
    }
  }, [response]);
  const chartData = useMemo(() => {
    var _response$responseDat11, _response$responseDat12, _response$responseDat22, _response$responseDat23;
    if ((response === null || response === void 0 ? void 0 : (_response$responseDat11 = response.responseData) === null || _response$responseDat11 === void 0 ? void 0 : (_response$responseDat12 = _response$responseDat11.data) === null || _response$responseDat12 === void 0 ? void 0 : _response$responseDat12.length) == 1) {
      var _response$responseDat19, _response$responseDat20, _response$responseDat21;
      setmanageChart("Area");
      if (id !== "fsmCapacityUtilization") {
        var _response$responseDat13, _response$responseDat14, _response$responseDat15;
        let data = response === null || response === void 0 ? void 0 : (_response$responseDat13 = response.responseData) === null || _response$responseDat13 === void 0 ? void 0 : (_response$responseDat14 = _response$responseDat13.data) === null || _response$responseDat14 === void 0 ? void 0 : (_response$responseDat15 = _response$responseDat14[0]) === null || _response$responseDat15 === void 0 ? void 0 : _response$responseDat15.plots.map((plot, index) => {
          var _response$responseDat16, _response$responseDat17, _response$responseDat18;
          return index === 0 ? {
            ...plot,
            difference: 0
          } : {
            ...plot,
            difference: plot.value - (response === null || response === void 0 ? void 0 : (_response$responseDat16 = response.responseData) === null || _response$responseDat16 === void 0 ? void 0 : (_response$responseDat17 = _response$responseDat16.data) === null || _response$responseDat17 === void 0 ? void 0 : (_response$responseDat18 = _response$responseDat17[0]) === null || _response$responseDat18 === void 0 ? void 0 : _response$responseDat18.plots[index - 1].value)
          };
        });
        return data;
      }
      return response === null || response === void 0 ? void 0 : (_response$responseDat19 = response.responseData) === null || _response$responseDat19 === void 0 ? void 0 : (_response$responseDat20 = _response$responseDat19.data) === null || _response$responseDat20 === void 0 ? void 0 : (_response$responseDat21 = _response$responseDat20[0]) === null || _response$responseDat21 === void 0 ? void 0 : _response$responseDat21.plots.map(plot => {
        const [month, year] = plot === null || plot === void 0 ? void 0 : plot.name.split("-");
        const totalDays = getDaysInMonth(Date.parse(`${month} 1, ${year}`));
        const value = Math.round((plot === null || plot === void 0 ? void 0 : plot.value) / (totalCapacity * totalDays) * 100);
        return {
          ...plot,
          value
        };
      });
    } else if ((response === null || response === void 0 ? void 0 : (_response$responseDat22 = response.responseData) === null || _response$responseDat22 === void 0 ? void 0 : (_response$responseDat23 = _response$responseDat22.data) === null || _response$responseDat23 === void 0 ? void 0 : _response$responseDat23.length) > 1) {
      var _response$responseDat24, _response$responseDat25, _response$responseDat26;
      setmanageChart("Line");
      let keys = {};
      const mergeObj = response === null || response === void 0 ? void 0 : (_response$responseDat24 = response.responseData) === null || _response$responseDat24 === void 0 ? void 0 : (_response$responseDat25 = _response$responseDat24.data) === null || _response$responseDat25 === void 0 ? void 0 : (_response$responseDat26 = _response$responseDat25[0]) === null || _response$responseDat26 === void 0 ? void 0 : _response$responseDat26.plots.map((x, index) => {
        var _response$responseDat27, _response$responseDat28, _response$responseDat29, _response$responseDat30, _response$responseDat31, _response$responseDat32, _response$responseDat33;
        let newObj = {};
        response === null || response === void 0 ? void 0 : (_response$responseDat27 = response.responseData) === null || _response$responseDat27 === void 0 ? void 0 : _response$responseDat27.data.map(ob => {
          keys[t(Digit.Utils.locale.getTransformedLocale(ob.headerName))] = t(Digit.Utils.locale.getTransformedLocale(ob.headerName));
          newObj[t(Digit.Utils.locale.getTransformedLocale(ob.headerName))] = ob === null || ob === void 0 ? void 0 : ob.plots[index].value;
        });
        return {
          label: null,
          name: response === null || response === void 0 ? void 0 : (_response$responseDat28 = response.responseData) === null || _response$responseDat28 === void 0 ? void 0 : (_response$responseDat29 = _response$responseDat28.data) === null || _response$responseDat29 === void 0 ? void 0 : (_response$responseDat30 = _response$responseDat29[0]) === null || _response$responseDat30 === void 0 ? void 0 : _response$responseDat30.plots[index].name,
          strValue: null,
          symbol: response === null || response === void 0 ? void 0 : (_response$responseDat31 = response.responseData) === null || _response$responseDat31 === void 0 ? void 0 : (_response$responseDat32 = _response$responseDat31.data) === null || _response$responseDat32 === void 0 ? void 0 : (_response$responseDat33 = _response$responseDat32[0]) === null || _response$responseDat33 === void 0 ? void 0 : _response$responseDat33.plots[index].symbol,
          ...newObj
        };
      });
      setKeysArr(Object.values(keys));
      return mergeObj;
    }
  }, [response, totalCapacity]);
  const renderPlot = (plot, key) => {
    var _plot$symbol, _plot$symbol2;
    const plotValue = key ? plot === null || plot === void 0 ? void 0 : plot[key] : (plot === null || plot === void 0 ? void 0 : plot.value) || 0;
    if (id === "fsmCapacityUtilization") {
      return Number(plotValue.toFixed(1));
    }
    if ((plot === null || plot === void 0 ? void 0 : (_plot$symbol = plot.symbol) === null || _plot$symbol === void 0 ? void 0 : _plot$symbol.toLowerCase()) === "amount") {
      const {
        denomination
      } = value;
      return getDenominatedValue(denomination, plotValue);
    } else if ((plot === null || plot === void 0 ? void 0 : (_plot$symbol2 = plot.symbol) === null || _plot$symbol2 === void 0 ? void 0 : _plot$symbol2.toLowerCase()) === "number") {
      return Number(plotValue.toFixed(1));
    } else {
      return plotValue;
    }
  };
  const renderLegend = () => /*#__PURE__*/React__default.createElement("span", {
    style: {
      fontSize: "14px",
      color: "#505A5F"
    }
  }, t(`DSS_${Digit.Utils.locale.getTransformedLocale(id)}`));
  const renderLegendForLine = (ss, sss, index) => /*#__PURE__*/React__default.createElement("span", {
    style: {
      fontSize: "14px",
      color: "#505A5F"
    }
  }, keysArr === null || keysArr === void 0 ? void 0 : keysArr[index]);
  const tickFormatter = value => {
    if (typeof value === "string") {
      return value.replace("-", ", ");
    }
    return value;
  };
  const renderTooltip = ({
    payload,
    label,
    unit
  }) => {
    var _payloadObj$payload, _payloadObj$payload$s, _payloadObj$payload2, _payloadObj$payload2$, _payloadObj$payload3, _payloadObj$payload3$, _payloadObj$payload4, _payloadObj$payload4$, _payloadObj$payload5;
    let formattedLabel = tickFormatter(label);
    let payloadObj = (payload === null || payload === void 0 ? void 0 : payload[0]) || {};
    const difference = Object.keys(payloadObj).length !== 0 ? getDenominatedValue(value.denomination, payloadObj.payload["difference"]) : "";
    return /*#__PURE__*/React__default.createElement("div", {
      style: {
        margin: "0px",
        padding: "10px",
        backgroundColor: "rgb(255, 255, 255)",
        border: "1px solid rgb(204, 204, 204)",
        whiteSpace: "nowrap"
      }
    }, (payloadObj === null || payloadObj === void 0 ? void 0 : (_payloadObj$payload = payloadObj.payload) === null || _payloadObj$payload === void 0 ? void 0 : (_payloadObj$payload$s = _payloadObj$payload.symbol) === null || _payloadObj$payload$s === void 0 ? void 0 : _payloadObj$payload$s.toLowerCase()) === "amount" && /*#__PURE__*/React__default.createElement("p", null, `${formattedLabel} : ${(value === null || value === void 0 ? void 0 : value.denomination) === "Unit" ? " ₹" : ""} ${payloadObj === null || payloadObj === void 0 ? void 0 : payloadObj.value}${(value === null || value === void 0 ? void 0 : value.denomination) !== "Unit" ? t(Digit.Utils.locale.getTransformedLocale(`ES_DSS_${value === null || value === void 0 ? void 0 : value.denomination}`)) : ""}`), (payloadObj === null || payloadObj === void 0 ? void 0 : (_payloadObj$payload2 = payloadObj.payload) === null || _payloadObj$payload2 === void 0 ? void 0 : (_payloadObj$payload2$ = _payloadObj$payload2.symbol) === null || _payloadObj$payload2$ === void 0 ? void 0 : _payloadObj$payload2$.toLowerCase()) === "amount" && /*#__PURE__*/React__default.createElement("p", null, `Collection Increased: ${(value === null || value === void 0 ? void 0 : value.denomination) === "Unit" ? " ₹" : ""} ${difference}${(value === null || value === void 0 ? void 0 : value.denomination) !== "Unit" ? t(Digit.Utils.locale.getTransformedLocale(`ES_DSS_${value === null || value === void 0 ? void 0 : value.denomination}`)) : ""}`), (payloadObj === null || payloadObj === void 0 ? void 0 : (_payloadObj$payload3 = payloadObj.payload) === null || _payloadObj$payload3 === void 0 ? void 0 : (_payloadObj$payload3$ = _payloadObj$payload3.symbol) === null || _payloadObj$payload3$ === void 0 ? void 0 : _payloadObj$payload3$.toLowerCase()) === "percentage" && /*#__PURE__*/React__default.createElement("p", null, `${formattedLabel} : ${payloadObj === null || payloadObj === void 0 ? void 0 : payloadObj.value} %`), (payloadObj === null || payloadObj === void 0 ? void 0 : (_payloadObj$payload4 = payloadObj.payload) === null || _payloadObj$payload4 === void 0 ? void 0 : (_payloadObj$payload4$ = _payloadObj$payload4.symbol) === null || _payloadObj$payload4$ === void 0 ? void 0 : _payloadObj$payload4$.toLowerCase()) === "number" && /*#__PURE__*/React__default.createElement("p", null, `${formattedLabel} : ${payloadObj === null || payloadObj === void 0 ? void 0 : payloadObj.value} `), !(payloadObj !== null && payloadObj !== void 0 && (_payloadObj$payload5 = payloadObj.payload) !== null && _payloadObj$payload5 !== void 0 && _payloadObj$payload5.symbol) && /*#__PURE__*/React__default.createElement("p", null, `${formattedLabel} : ${payloadObj === null || payloadObj === void 0 ? void 0 : payloadObj.value} `));
  };
  const renderTooltipForLine = ({
    payload,
    label,
    unit
  }) => {
    var _payloadObj$payload6, _payloadObj$payload6$, _payloadObj$payload7, _payloadObj$payload7$, _payloadObj$payload8, _payloadObj$payload8$;
    let payloadObj = (payload === null || payload === void 0 ? void 0 : payload[0]) || {};
    let prefix = (payloadObj === null || payloadObj === void 0 ? void 0 : (_payloadObj$payload6 = payloadObj.payload) === null || _payloadObj$payload6 === void 0 ? void 0 : (_payloadObj$payload6$ = _payloadObj$payload6.symbol) === null || _payloadObj$payload6$ === void 0 ? void 0 : _payloadObj$payload6$.toLowerCase()) === "amount" && (value === null || value === void 0 ? void 0 : value.denomination) === "Unit" ? " ₹" : " ";
    let postfix = (payloadObj === null || payloadObj === void 0 ? void 0 : (_payloadObj$payload7 = payloadObj.payload) === null || _payloadObj$payload7 === void 0 ? void 0 : (_payloadObj$payload7$ = _payloadObj$payload7.symbol) === null || _payloadObj$payload7$ === void 0 ? void 0 : _payloadObj$payload7$.toLowerCase()) === "percentage" ? " %" : (payloadObj === null || payloadObj === void 0 ? void 0 : (_payloadObj$payload8 = payloadObj.payload) === null || _payloadObj$payload8 === void 0 ? void 0 : (_payloadObj$payload8$ = _payloadObj$payload8.symbol) === null || _payloadObj$payload8$ === void 0 ? void 0 : _payloadObj$payload8$.toLowerCase()) === "amount" && (value === null || value === void 0 ? void 0 : value.denomination) !== "Unit" ? t(Digit.Utils.locale.getTransformedLocale(`ES_DSS_${value === null || value === void 0 ? void 0 : value.denomination}`)) : "";
    let newPayload = {
      ...(payloadObj === null || payloadObj === void 0 ? void 0 : payloadObj.payload)
    };
    newPayload === null || newPayload === void 0 ? true : delete newPayload.label;
    newPayload === null || newPayload === void 0 ? true : delete newPayload.strValue;
    newPayload === null || newPayload === void 0 ? true : delete newPayload.symbol;
    let newObjArray = [newPayload === null || newPayload === void 0 ? void 0 : newPayload.name];
    newPayload === null || newPayload === void 0 ? true : delete newPayload.name;
    Object.keys(newPayload).map(key => {
      var _payloadObj$payload9, _payloadObj$payload9$;
      newObjArray.push(`${key} -${prefix}${(payloadObj === null || payloadObj === void 0 ? void 0 : (_payloadObj$payload9 = payloadObj.payload) === null || _payloadObj$payload9 === void 0 ? void 0 : (_payloadObj$payload9$ = _payloadObj$payload9.symbol) === null || _payloadObj$payload9$ === void 0 ? void 0 : _payloadObj$payload9$.toLowerCase()) === "amount" ? getDenominatedValue(value === null || value === void 0 ? void 0 : value.denomination, newPayload === null || newPayload === void 0 ? void 0 : newPayload[key]) + ": Diiference " : newPayload === null || newPayload === void 0 ? void 0 : newPayload[key]} ${postfix}`);
    });
    return /*#__PURE__*/React__default.createElement("div", {
      style: {
        margin: "0px",
        padding: "10px",
        backgroundColor: "rgb(255, 255, 255)",
        border: "1px solid rgb(204, 204, 204)",
        whiteSpace: "nowrap"
      }
    }, newObjArray.map((ele, i) => /*#__PURE__*/React__default.createElement("p", {
      key: i
    }, ele)));
  };
  if (isLoading) {
    return /*#__PURE__*/React__default.createElement(Loader, null);
  }
  return /*#__PURE__*/React__default.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%"
    }
  }, id === "fsmCapacityUtilization" && /*#__PURE__*/React__default.createElement("p", null, t("DSS_FSM_TOTAL_SLUDGE_TREATED"), " - ", totalWaste, " ", t("DSS_KL")), /*#__PURE__*/React__default.createElement(ResponsiveContainer, {
    width: "94%",
    height: increasedHeightCharts.includes(id) ? 700 : 450
  }, !chartData || (chartData === null || chartData === void 0 ? void 0 : chartData.length) === 0 ? /*#__PURE__*/React__default.createElement(NoData, {
    t: t
  }) : manageChart == "Area" ? /*#__PURE__*/React__default.createElement(AreaChart, {
    width: "100%",
    height: "100%",
    data: chartData,
    margin: {
      left: 30,
      top: 10
    }
  }, /*#__PURE__*/React__default.createElement("defs", null, /*#__PURE__*/React__default.createElement("linearGradient", {
    id: "colorUv",
    x1: ".5",
    x2: ".5",
    y2: "1"
  }, /*#__PURE__*/React__default.createElement("stop", {
    stopColor: "#048BD0",
    stopOpacity: 0.5
  }), /*#__PURE__*/React__default.createElement("stop", {
    offset: "1",
    stopColor: "#048BD0",
    stopOpacity: 0
  }))), /*#__PURE__*/React__default.createElement(CartesianGrid, {
    strokeDasharray: "3 3"
  }), /*#__PURE__*/React__default.createElement(Tooltip, {
    content: renderTooltip
  }), /*#__PURE__*/React__default.createElement(XAxis, {
    dataKey: _xDataKey,
    tick: {
      fontSize: "14px",
      fill: "#505A5F"
    },
    tickFormatter: tickFormatter
  }), /*#__PURE__*/React__default.createElement(YAxis, {
    tick: {
      fontSize: "14px",
      fill: "#505A5F"
    }
  }), /*#__PURE__*/React__default.createElement(Legend, {
    formatter: renderLegend,
    iconType: "circle"
  }), /*#__PURE__*/React__default.createElement(Area, {
    type: "monotone",
    dataKey: renderPlot,
    stroke: "#048BD0",
    fill: "url(#colorUv)",
    dot: true
  })) : /*#__PURE__*/React__default.createElement(LineChart, {
    width: 500,
    height: 300,
    data: chartData,
    margin: {
      top: 15,
      right: 5,
      left: 20,
      bottom: 5
    }
  }, /*#__PURE__*/React__default.createElement(CartesianGrid, {
    strokeDasharray: "3 3"
  }), /*#__PURE__*/React__default.createElement(XAxis, {
    dataKey: "name"
  }), /*#__PURE__*/React__default.createElement(YAxis, null), /*#__PURE__*/React__default.createElement(Tooltip, {
    content: renderTooltipForLine
  }), /*#__PURE__*/React__default.createElement(Legend, {
    layout: "horizontal",
    formatter: renderLegendForLine,
    verticalAlign: "bottom",
    align: "center",
    iconType: "circle",
    className: lineLegend
  }), keysArr === null || keysArr === void 0 ? void 0 : keysArr.map((key, i) => {
    return /*#__PURE__*/React__default.createElement(Line, {
      type: "monotone",
      dataKey: plot => renderPlot(plot, key),
      stroke: getColors(i),
      activeDot: {
        r: 8
      },
      strokeWidth: 2,
      key: i,
      dot: {
        stroke: getColors(i),
        strokeWidth: 1,
        r: 2,
        fill: getColors(i)
      }
    });
  }))));
};

const formatValue = (value, symbol) => {
  if ((symbol === null || symbol === void 0 ? void 0 : symbol.toLowerCase()) === "percentage") {
    return `${Number(value).toFixed()}`;
  } else {
    return value;
  }
};
const CustomLabel = ({
  x,
  y,
  name,
  stroke,
  value,
  maxValue
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React__default.createElement(Fragment$1, null, /*#__PURE__*/React__default.createElement("text", {
    x: x,
    y: y,
    dx: -55,
    dy: 10,
    fill: stroke,
    width: "35",
    style: {
      fontSize: "medium",
      textAlign: "right",
      fontVariantNumeric: "proportional-nums"
    }
  }, `${maxValue === null || maxValue === void 0 ? void 0 : maxValue[t(name)]}%`), /*#__PURE__*/React__default.createElement("text", {
    x: x,
    y: y,
    dx: -200,
    dy: 10
  }, t(`DSS_TB_${Digit.Utils.locale.getTransformedLocale(name)}`)));
};
const COLORS$1 = {
  RED: "#00703C",
  GREEN: "#D4351C",
  default: "#00703C"
};
const CustomBarChart = ({
  xDataKey: _xDataKey = "value",
  xAxisType: _xAxisType = "number",
  yAxisType: _yAxisType = "category",
  yDataKey: _yDataKey = "name",
  hideAxis: _hideAxis = true,
  layout: _layout = "vertical",
  fillColor: _fillColor = "default",
  showGrid: _showGrid = false,
  showDrillDown: _showDrillDown = false,
  data,
  title,
  setChartDenomination,
  moduleCode
}) => {
  var _value$range, _value$range$startDat, _value$range2, _value$range2$endDate;
  const {
    id
  } = data;
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const {
    value
  } = useContext(FilterContext);
  const [maxValue, setMaxValue] = useState({});
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const {
    isLoading,
    data: response
  } = Digit.Hooks.dss.useGetChart({
    key: id,
    type: "metric",
    tenantId,
    requestDate: {
      ...(value === null || value === void 0 ? void 0 : value.requestDate),
      startDate: value === null || value === void 0 ? void 0 : (_value$range = value.range) === null || _value$range === void 0 ? void 0 : (_value$range$startDat = _value$range.startDate) === null || _value$range$startDat === void 0 ? void 0 : _value$range$startDat.getTime(),
      endDate: value === null || value === void 0 ? void 0 : (_value$range2 = value.range) === null || _value$range2 === void 0 ? void 0 : (_value$range2$endDate = _value$range2.endDate) === null || _value$range2$endDate === void 0 ? void 0 : _value$range2$endDate.getTime()
    },
    filters: value === null || value === void 0 ? void 0 : value.filters,
    moduleLevel: (value === null || value === void 0 ? void 0 : value.moduleLevel) || moduleCode
  });
  const chartData = useMemo(() => {
    var _response$responseDat, _response$responseDat2, _response$responseDat3, _response$responseDat4, _response$responseDat5;
    if (!response) return null;
    setChartDenomination(response === null || response === void 0 ? void 0 : (_response$responseDat = response.responseData) === null || _response$responseDat === void 0 ? void 0 : (_response$responseDat2 = _response$responseDat.data) === null || _response$responseDat2 === void 0 ? void 0 : (_response$responseDat3 = _response$responseDat2[0]) === null || _response$responseDat3 === void 0 ? void 0 : _response$responseDat3.headerSymbol);
    const dd = response === null || response === void 0 ? void 0 : (_response$responseDat4 = response.responseData) === null || _response$responseDat4 === void 0 ? void 0 : (_response$responseDat5 = _response$responseDat4.data) === null || _response$responseDat5 === void 0 ? void 0 : _response$responseDat5.map(bar => {
      var _bar$plots, _bar$plots2, _bar$plots3;
      let plotValue = (bar === null || bar === void 0 ? void 0 : (_bar$plots = bar.plots) === null || _bar$plots === void 0 ? void 0 : _bar$plots[0].value) || 0;
      return {
        name: t(bar === null || bar === void 0 ? void 0 : (_bar$plots2 = bar.plots) === null || _bar$plots2 === void 0 ? void 0 : _bar$plots2[0].name),
        value: formatValue(plotValue, bar === null || bar === void 0 ? void 0 : (_bar$plots3 = bar.plots) === null || _bar$plots3 === void 0 ? void 0 : _bar$plots3[0].symbol)
      };
    });
    let newMax = Math.max(...dd.map(e => Number(e.value)));
    let newObj = {};
    let newReturn = dd.map(ele => {
      newObj[ele.name] = ele.value;
      return {
        ...ele,
        value: Number(ele.value) / newMax * 100
      };
    });
    setMaxValue(newObj);
    return newReturn;
  }, [response]);
  const goToDrillDownCharts = () => {
    var _response$responseDat6, _value$filters;
    history.push(`/digit-ui/employee/dss/drilldown?chart=${response === null || response === void 0 ? void 0 : (_response$responseDat6 = response.responseData) === null || _response$responseDat6 === void 0 ? void 0 : _response$responseDat6.visualizationCode}&ulb=${value === null || value === void 0 ? void 0 : (_value$filters = value.filters) === null || _value$filters === void 0 ? void 0 : _value$filters.tenantId}&title=${title}&fromModule=${Digit.Utils.dss.getCurrentModuleName()}&type=performing-metric&fillColor=${_fillColor}&isNational=${checkCurrentScreen() ? "YES" : "NO"}`);
  };
  if (isLoading) {
    return /*#__PURE__*/React__default.createElement(Loader, null);
  }
  if ((chartData === null || chartData === void 0 ? void 0 : chartData.length) === 0 || !chartData) {
    return /*#__PURE__*/React__default.createElement(NoData, {
      t: t
    });
  }
  return /*#__PURE__*/React__default.createElement(Fragment$1, null, /*#__PURE__*/React__default.createElement(ResponsiveContainer, {
    width: "98%",
    height: 320
  }, /*#__PURE__*/React__default.createElement(BarChart, {
    width: "70%",
    height: "100%",
    data: _showDrillDown ? chartData === null || chartData === void 0 ? void 0 : chartData.slice(0, 3) : chartData,
    layout: _layout,
    maxBarSize: 8,
    margin: {
      left: 200
    },
    barGap: 50
  }, _showGrid && /*#__PURE__*/React__default.createElement(CartesianGrid, null), /*#__PURE__*/React__default.createElement(XAxis, {
    hide: _hideAxis,
    dataKey: _xDataKey,
    type: _xAxisType,
    domain: [0, 90]
  }), /*#__PURE__*/React__default.createElement(YAxis, {
    dataKey: _yDataKey,
    hide: _hideAxis,
    type: _yAxisType,
    padding: {
      right: 60
    }
  }), /*#__PURE__*/React__default.createElement(Bar, {
    dataKey: _xDataKey,
    fill: COLORS$1[_fillColor],
    background: {
      fill: "#D6D5D4",
      radius: 8
    },
    label: /*#__PURE__*/React__default.createElement(CustomLabel, {
      stroke: COLORS$1[_fillColor],
      maxValue: maxValue
    }),
    radius: [8, 8, 8, 8],
    isAnimationActive: false
  }))), (chartData === null || chartData === void 0 ? void 0 : chartData.length) > 3 && _showDrillDown && /*#__PURE__*/React__default.createElement("p", {
    className: "showMore",
    onClick: goToDrillDownCharts
  }, t("DSS_SHOW_MORE")));
};

const barColors = ["#048BD0", "#FBC02D", "#8E29BF", "#EA8A3B", "#0BABDE", "#6E8459", "#D4351C", "#0CF7E4", "#F80BF4", "#22F80B"];
const renderPlot = (plot, key, denomination) => {
  var _plot$symbol, _plot$symbol2;
  const plotValue = key ? plot === null || plot === void 0 ? void 0 : plot[key] : (plot === null || plot === void 0 ? void 0 : plot.value) || 0;
  if ((plot === null || plot === void 0 ? void 0 : (_plot$symbol = plot.symbol) === null || _plot$symbol === void 0 ? void 0 : _plot$symbol.toLowerCase()) === "amount") {
    switch (denomination) {
      case "Unit":
        return plotValue;
      case "Lac":
        return Number((plotValue / 100000).toFixed(2));
      case "Cr":
        return Number((plotValue / 10000000).toFixed(2));
      default:
        return "";
    }
  } else if ((plot === null || plot === void 0 ? void 0 : (_plot$symbol2 = plot.symbol) === null || _plot$symbol2 === void 0 ? void 0 : _plot$symbol2.toLowerCase()) === "number") {
    return Number(plotValue.toFixed(1));
  } else {
    return plotValue;
  }
};
const CustomHorizontalBarChart = ({
  data,
  xAxisType: _xAxisType = "category",
  yAxisType: _yAxisType = "number",
  xDataKey: _xDataKey = "name",
  yDataKey: _yDataKey = "",
  xAxisLabel: _xAxisLabel = "",
  yAxisLabel: _yAxisLabel = "",
  layout: _layout = "horizontal",
  title,
  showDrillDown: _showDrillDown = false,
  setChartDenomination,
  moduleCode
}) => {
  var _value$range, _value$range$startDat, _value$range2, _value$range2$endDate, _response$responseDat6, _response$responseDat7;
  const {
    id
  } = data;
  const {
    t
  } = useTranslation();
  const history = useHistory();
  const {
    value
  } = useContext(FilterContext);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const {
    isLoading,
    data: response
  } = Digit.Hooks.dss.useGetChart({
    key: id,
    type: "metric",
    tenantId,
    requestDate: {
      ...(value === null || value === void 0 ? void 0 : value.requestDate),
      startDate: value === null || value === void 0 ? void 0 : (_value$range = value.range) === null || _value$range === void 0 ? void 0 : (_value$range$startDat = _value$range.startDate) === null || _value$range$startDat === void 0 ? void 0 : _value$range$startDat.getTime(),
      endDate: value === null || value === void 0 ? void 0 : (_value$range2 = value.range) === null || _value$range2 === void 0 ? void 0 : (_value$range2$endDate = _value$range2.endDate) === null || _value$range2$endDate === void 0 ? void 0 : _value$range2$endDate.getTime()
    },
    filters: value === null || value === void 0 ? void 0 : value.filters,
    moduleLevel: (value === null || value === void 0 ? void 0 : value.moduleLevel) || moduleCode
  });
  const constructChartData = (data, denomination) => {
    let result = {};
    for (let i = 0; i < (data === null || data === void 0 ? void 0 : data.length); i++) {
      const row = data[i];
      for (let j = 0; j < row.plots.length; j++) {
        const plot = row.plots[j];
        result[plot.name] = {
          ...result[plot.name],
          [t(row.headerName)]: renderPlot(plot, "value", denomination),
          name: t(plot.name)
        };
      }
    }
    return Object.keys(result).map(key => {
      return {
        name: key,
        ...result[key]
      };
    });
  };
  const goToDrillDownCharts = () => {
    var _response$responseDat, _value$filters;
    history.push(`/digit-ui/employee/dss/drilldown?chart=${response === null || response === void 0 ? void 0 : (_response$responseDat = response.responseData) === null || _response$responseDat === void 0 ? void 0 : _response$responseDat.drillDownChartId}&ulb=${value === null || value === void 0 ? void 0 : (_value$filters = value.filters) === null || _value$filters === void 0 ? void 0 : _value$filters.tenantId}&title=${title}`);
  };
  const tooltipFormatter = (value, name) => {
    if (id === "fsmMonthlyWasteCal") {
      return [`${Digit.Utils.dss.formatter(Math.round((value + Number.EPSILON) * 100) / 100, "number", value === null || value === void 0 ? void 0 : value.denomination, true, t)} ${t("DSS_KL")}`, name];
    }
    return [Digit.Utils.dss.formatter(Math.round((value + Number.EPSILON) * 100) / 100, "number", value === null || value === void 0 ? void 0 : value.denomination, true, t), name];
  };
  useEffect(() => {
    var _response$responseDat2, _response$responseDat3, _response$responseDat4;
    if (response) setChartDenomination(response === null || response === void 0 ? void 0 : (_response$responseDat2 = response.responseData) === null || _response$responseDat2 === void 0 ? void 0 : (_response$responseDat3 = _response$responseDat2.data) === null || _response$responseDat3 === void 0 ? void 0 : (_response$responseDat4 = _response$responseDat3[0]) === null || _response$responseDat4 === void 0 ? void 0 : _response$responseDat4.headerSymbol);
  }, [response]);
  const chartData = useMemo(() => {
    var _response$responseDat5;
    return constructChartData(response === null || response === void 0 ? void 0 : (_response$responseDat5 = response.responseData) === null || _response$responseDat5 === void 0 ? void 0 : _response$responseDat5.data, value === null || value === void 0 ? void 0 : value.denomination);
  }, [response, value === null || value === void 0 ? void 0 : value.denomination]);
  const renderLegend = value => /*#__PURE__*/React__default.createElement("span", {
    style: {
      fontSize: "14px",
      color: "#505A5F"
    }
  }, value);
  const tickFormatter = value => {
    if (typeof value === "string") {
      return value.replace("-", ", ");
    } else if (typeof value === "number") return Digit.Utils.dss.formatter(value, "number", value === null || value === void 0 ? void 0 : value.denomination, true, t);
    return value;
  };
  if (isLoading) {
    return /*#__PURE__*/React__default.createElement(Loader, null);
  }
  const getVerticalWidth = layout => {
    var _window;
    if ((_window = window) !== null && _window !== void 0 && _window.location.href.includes("dss/dashboard/pgr")) {
      return layout === "vertical" ? 150 : 60;
    } else {
      return layout === "vertical" ? 120 : 60;
    }
  };
  const bars = response === null || response === void 0 ? void 0 : (_response$responseDat6 = response.responseData) === null || _response$responseDat6 === void 0 ? void 0 : (_response$responseDat7 = _response$responseDat6.data) === null || _response$responseDat7 === void 0 ? void 0 : _response$responseDat7.map(bar => bar === null || bar === void 0 ? void 0 : bar.headerName);
  return /*#__PURE__*/React__default.createElement(Fragment$1, null, /*#__PURE__*/React__default.createElement(ResponsiveContainer, {
    width: "94%",
    height: 450,
    margin: {
      top: 5,
      right: 5,
      left: 5,
      bottom: 5
    }
  }, (chartData === null || chartData === void 0 ? void 0 : chartData.length) === 0 || !chartData ? /*#__PURE__*/React__default.createElement(NoData, {
    t: t
  }) : /*#__PURE__*/React__default.createElement(BarChart, {
    width: "100%",
    height: "100%",
    margin: {
      top: 5,
      right: 5,
      left: 5,
      bottom: 5
    },
    layout: _layout,
    data: chartData,
    barGap: 12,
    barSize: 12
  }, /*#__PURE__*/React__default.createElement(CartesianGrid, {
    strokeDasharray: "2 2"
  }), /*#__PURE__*/React__default.createElement(YAxis, {
    dataKey: _yDataKey,
    type: _yAxisType,
    tick: {
      fontSize: "12px",
      fill: "#505A5F"
    },
    label: {
      value: _yAxisLabel,
      angle: -90,
      position: "insideLeft",
      dy: 50,
      fontSize: "12px",
      fill: "#505A5F"
    },
    tickCount: 10,
    tickFormatter: tickFormatter,
    unit: id === "fsmCapacityUtilization" ? "%" : "",
    width: getVerticalWidth(_layout)
  }), /*#__PURE__*/React__default.createElement(XAxis, {
    dataKey: _xDataKey,
    type: _xAxisType,
    tick: {
      fontSize: "14px",
      fill: "#505A5F"
    },
    tickCount: 10,
    tickFormatter: tickFormatter
  }), bars === null || bars === void 0 ? void 0 : bars.map((bar, id) => /*#__PURE__*/React__default.createElement(Bar, {
    key: id,
    dataKey: t(bar),
    fill: barColors[id],
    stackId: (bars === null || bars === void 0 ? void 0 : bars.length) > 2 ? 1 : id
  })), /*#__PURE__*/React__default.createElement(Legend, {
    formatter: renderLegend,
    iconType: "circle"
  }), /*#__PURE__*/React__default.createElement(Tooltip, {
    cursor: false,
    formatter: tooltipFormatter
  }))), _showDrillDown && /*#__PURE__*/React__default.createElement("p", {
    className: "showMore",
    onClick: goToDrillDownCharts
  }, t("DSS_SHOW_MORE")));
};

const COLORS$2 = ["#048BD0", "#FBC02D", "#8E29BF", "#EA8A3B", "#0BABDE", "#6E8459", "#D4351C", "#0CF7E4", "#F80BF4", "#22F80B"];
const mobileView = innerWidth <= 640;
const CustomPieChart = ({
  dataKey: _dataKey = "value",
  data,
  setChartDenomination,
  moduleCode
}) => {
  var _value$range, _value$range$startDat, _value$range2, _value$range2$endDate, _response$responseDat15, _response$responseDat16, _response$responseDat17, _response$responseDat18, _response$responseDat19, _response$responseDat20, _response$responseDat21, _response$responseDat22;
  const {
    id
  } = data;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const {
    t
  } = useTranslation();
  const {
    value
  } = useContext(FilterContext);
  const [isPieClicked, setIsPieClicked] = useState(false);
  const [pieSelected, setPieSelected] = useState(null);
  const [drillDownId, setdrillDownId] = useState(null);
  const {
    isLoading,
    data: response
  } = Digit.Hooks.dss.useGetChart({
    key: isPieClicked ? drillDownId : id,
    type: "metric",
    tenantId,
    requestDate: {
      ...(value === null || value === void 0 ? void 0 : value.requestDate),
      startDate: value === null || value === void 0 ? void 0 : (_value$range = value.range) === null || _value$range === void 0 ? void 0 : (_value$range$startDat = _value$range.startDate) === null || _value$range$startDat === void 0 ? void 0 : _value$range$startDat.getTime(),
      endDate: value === null || value === void 0 ? void 0 : (_value$range2 = value.range) === null || _value$range2 === void 0 ? void 0 : (_value$range2$endDate = _value$range2.endDate) === null || _value$range2$endDate === void 0 ? void 0 : _value$range2$endDate.getTime()
    },
    filters: isPieClicked ? {
      ...(value === null || value === void 0 ? void 0 : value.filters),
      selectedType: pieSelected
    } : value === null || value === void 0 ? void 0 : value.filters,
    moduleLevel: (value === null || value === void 0 ? void 0 : value.moduleLevel) || moduleCode
  });
  const chartData = useMemo(() => {
    var _response$responseDat, _response$responseDat2, _response$responseDat3, _response$responseDat4, _response$responseDat5, _response$responseDat6, _response$responseDat7, _response$responseDat8, _response$responseDat9, _response$responseDat10;
    if (!response) return null;
    setChartDenomination(response === null || response === void 0 ? void 0 : (_response$responseDat = response.responseData) === null || _response$responseDat === void 0 ? void 0 : (_response$responseDat2 = _response$responseDat.data) === null || _response$responseDat2 === void 0 ? void 0 : (_response$responseDat3 = _response$responseDat2[0]) === null || _response$responseDat3 === void 0 ? void 0 : _response$responseDat3.headerSymbol);
    const compareFn = (a, b) => b.value - a.value;
    return drillDownId === "deathByCategoryDrilldownAge" || (response === null || response === void 0 ? void 0 : (_response$responseDat4 = response.responseData) === null || _response$responseDat4 === void 0 ? void 0 : _response$responseDat4.visualizationCode) === "nssNumberOfDeathsByAge" ? response === null || response === void 0 ? void 0 : (_response$responseDat5 = response.responseData) === null || _response$responseDat5 === void 0 ? void 0 : (_response$responseDat6 = _response$responseDat5.data) === null || _response$responseDat6 === void 0 ? void 0 : (_response$responseDat7 = _response$responseDat6[0]) === null || _response$responseDat7 === void 0 ? void 0 : _response$responseDat7.plots.reduce((acc, plot, index) => {
      acc = acc.concat(plot);
      return acc;
    }, []) : response === null || response === void 0 ? void 0 : (_response$responseDat8 = response.responseData) === null || _response$responseDat8 === void 0 ? void 0 : (_response$responseDat9 = _response$responseDat8.data) === null || _response$responseDat9 === void 0 ? void 0 : (_response$responseDat10 = _response$responseDat9[0]) === null || _response$responseDat10 === void 0 ? void 0 : _response$responseDat10.plots.sort(compareFn).reduce((acc, plot, index) => {
      acc = acc.concat(plot);
      return acc;
    }, []);
  }, [response]);
  const renderLegend = value => /*#__PURE__*/React__default.createElement("span", {
    style: {
      fontSize: "14px",
      color: "#505A5F"
    }
  }, t(`COMMON_MASTERS_${value && Digit.Utils.locale.getTransformedLocale(value)}`));
  const renderTooltip = ({
    payload,
    label
  }) => {
    var _payload$, _payload$2, _payload$3, _payload$4, _payload$4$payload, _payload$4$payload$pa, _payload$5, _response$responseDat11, _response$responseDat12, _response$responseDat13;
    return /*#__PURE__*/React__default.createElement("div", {
      style: {
        margin: "0px",
        padding: "10px",
        backgroundColor: "rgb(255, 255, 255)",
        border: "1px solid rgb(204, 204, 204)",
        whiteSpace: "nowrap"
      }
    }, /*#__PURE__*/React__default.createElement("p", {
      className: "recharts-tooltip-label"
    }, `${t(`COMMON_MASTERS_${(payload === null || payload === void 0 ? void 0 : (_payload$ = payload[0]) === null || _payload$ === void 0 ? void 0 : _payload$.name) && Digit.Utils.locale.getTransformedLocale(payload === null || payload === void 0 ? void 0 : (_payload$2 = payload[0]) === null || _payload$2 === void 0 ? void 0 : _payload$2.name)}`)}: ${Digit.Utils.dss.formatter(payload === null || payload === void 0 ? void 0 : (_payload$3 = payload[0]) === null || _payload$3 === void 0 ? void 0 : _payload$3.value, payload === null || payload === void 0 ? void 0 : (_payload$4 = payload[0]) === null || _payload$4 === void 0 ? void 0 : (_payload$4$payload = _payload$4.payload) === null || _payload$4$payload === void 0 ? void 0 : (_payload$4$payload$pa = _payload$4$payload.payload) === null || _payload$4$payload$pa === void 0 ? void 0 : _payload$4$payload$pa.symbol, value === null || value === void 0 ? void 0 : value.denomination, true, t)}`), /*#__PURE__*/React__default.createElement("p", null, `(${Number((payload === null || payload === void 0 ? void 0 : (_payload$5 = payload[0]) === null || _payload$5 === void 0 ? void 0 : _payload$5.value) / (response === null || response === void 0 ? void 0 : (_response$responseDat11 = response.responseData) === null || _response$responseDat11 === void 0 ? void 0 : (_response$responseDat12 = _response$responseDat11.data) === null || _response$responseDat12 === void 0 ? void 0 : (_response$responseDat13 = _response$responseDat12[0]) === null || _response$responseDat13 === void 0 ? void 0 : _response$responseDat13.headerValue) * 100).toFixed(1)}%)`));
  };
  const chartIDArray = ["mcCollectionByPaymentModev2", "mcRceiptsByPaymentModev2", "nssWsCollectionByChannel", "nssWsCollectionByUsage", "nssOBPSPermitIssuedByOccupancyType", "nssOBPSPermitIssuedByRiskType", "mcCollectionByPaymentType", "mcReceiptsByPaymentMode", "wscollectionByUsage", "wscollectionByChannel", "permitIssuedByOccupancyType", "permitIssuedByRiskType"];
  const checkChartID = chartID => {
    return chartIDArray.includes(chartID);
  };
  const onPieClick = ({
    payload
  }) => {
    var _response$responseDat14;
    setIsPieClicked(true);
    setdrillDownId(response === null || response === void 0 ? void 0 : (_response$responseDat14 = response.responseData) === null || _response$responseDat14 === void 0 ? void 0 : _response$responseDat14.drillDownChartId);
    setPieSelected(payload.name);
  };
  const removeFilter = () => {
    setIsPieClicked(false);
  };
  useEffect(() => {
    setIsPieClicked(false);
    setdrillDownId(null);
    setPieSelected(null);
  }, [id]);
  if (isLoading) {
    return /*#__PURE__*/React__default.createElement(Loader, null);
  }
  return /*#__PURE__*/React__default.createElement(Fragment$1, null, id === "deathByCategory" &&
  /*#__PURE__*/
  React__default.createElement("span", {
    className: "dss-pie-subheader",
    style: {
      position: "sticky",
      left: 0
    }
  }, t("DSS_CMN_PIE_INFO")), isPieClicked && /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
    className: "tag-container",
    style: {
      marginBottom: "unset"
    }
  }, /*#__PURE__*/React__default.createElement("span", {
    style: {
      marginTop: "20px"
    }
  }, t("DSS_FILTERS_APPLIED"), ": "), /*#__PURE__*/React__default.createElement(RemoveableTag, {
    key: id,
    text: `${t("COMMON_MASTERS_" + Digit.Utils.locale.getTransformedLocale(pieSelected))}`,
    onClick: removeFilter
  }))), (chartData === null || chartData === void 0 ? void 0 : chartData.length) === 0 || !chartData ? /*#__PURE__*/React__default.createElement(NoData, {
    t: t
  }) : /*#__PURE__*/React__default.createElement(ResponsiveContainer, {
    width: "99%",
    height: 340
  }, /*#__PURE__*/React__default.createElement(PieChart, {
    cy: 100
  }, /*#__PURE__*/React__default.createElement(Pie, {
    data: chartData,
    dataKey: _dataKey,
    cy: 150,
    style: {
      cursor: (response === null || response === void 0 ? void 0 : (_response$responseDat15 = response.responseData) === null || _response$responseDat15 === void 0 ? void 0 : _response$responseDat15.drillDownChartId) !== "none" ? "pointer" : "default"
    },
    innerRadius: checkChartID(id) && !mobileView ? 90 : 70,
    outerRadius: checkChartID(id) && !mobileView ? 110 : 90,
    margin: {
      top: isPieClicked ? 0 : 5
    },
    fill: "#8884d8",
    labelLine: false,
    isAnimationActive: false,
    onClick: (response === null || response === void 0 ? void 0 : (_response$responseDat16 = response.responseData) === null || _response$responseDat16 === void 0 ? void 0 : _response$responseDat16.drillDownChartId) !== "none" ? onPieClick : null
  }, response === null || response === void 0 ? void 0 : (_response$responseDat17 = response.responseData) === null || _response$responseDat17 === void 0 ? void 0 : (_response$responseDat18 = _response$responseDat17.data) === null || _response$responseDat18 === void 0 ? void 0 : (_response$responseDat19 = _response$responseDat18[0]) === null || _response$responseDat19 === void 0 ? void 0 : _response$responseDat19.plots.map((entry, index) => /*#__PURE__*/React__default.createElement(Cell, {
    key: `cell-`,
    fill: COLORS$2[index % COLORS$2.length]
  }))), /*#__PURE__*/React__default.createElement(Tooltip, {
    content: renderTooltip
  }), /*#__PURE__*/React__default.createElement(Legend, {
    layout: "vertical",
    verticalAlign: "middle",
    align: "right",
    iconType: "circle",
    formatter: renderLegend,
    iconSize: 10,
    wrapperStyle: (chartData === null || chartData === void 0 ? void 0 : chartData.length) > 6 ? {
      paddingRight: checkChartID(id) && !mobileView ? 60 : 0,
      overflowY: "scroll",
      height: 250,
      width: "35%",
      overflowX: "auto",
      paddingTop: -20
    } : {
      paddingRight: checkChartID(id) && !mobileView ? 60 : 0,
      width: "27%",
      overflowX: "auto",
      paddingTop: -20
    }
  }))), isPieClicked && /*#__PURE__*/React__default.createElement("div", {
    style: {
      marginTop: "-4%",
      position: "absolute",
      width: "30%",
      textAlign: "center"
    }
  }, t(Digit.Utils.locale.getTransformedLocale(`${response === null || response === void 0 ? void 0 : (_response$responseDat20 = response.responseData) === null || _response$responseDat20 === void 0 ? void 0 : (_response$responseDat21 = _response$responseDat20.data) === null || _response$responseDat21 === void 0 ? void 0 : (_response$responseDat22 = _response$responseDat21[0]) === null || _response$responseDat22 === void 0 ? void 0 : _response$responseDat22.headerName}_${pieSelected}`))));
};

var _g;
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
function SvgArrowDownward(props) {
  return /*#__PURE__*/createElement("svg", _extends({
    width: 16,
    height: 16,
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _g || (_g = /*#__PURE__*/createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/createElement("path", {
    d: "M20 20H-4V-4h24z"
  }), /*#__PURE__*/createElement("path", {
    fill: "#E54D42",
    fillRule: "nonzero",
    d: "M16 8l-1.41-1.41L9 12.17V0H7v12.17L1.42 6.58 0 8l8 8z"
  }))));
}

function ArrowDownwardElement(marginRight, marginLeft) {
  return /*#__PURE__*/React__default.createElement(SvgArrowDownward, {
    style: {
      display: "inline-block",
      verticalAlign: "baseline",
      marginRight: !marginRight ? "0px" : marginRight,
      marginLeft: !marginLeft ? "0px" : marginLeft
    }
  });
}

var _g$1;
function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function (target) {
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
  return _extends$1.apply(this, arguments);
}
function SvgArrowUpward(props) {
  return /*#__PURE__*/createElement("svg", _extends$1({
    width: 16,
    height: 16,
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _g$1 || (_g$1 = /*#__PURE__*/createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/createElement("path", {
    d: "M-4-4h24v24H-4z"
  }), /*#__PURE__*/createElement("path", {
    fill: "#259B24",
    fillRule: "nonzero",
    d: "M0 8l1.41 1.41L7 3.83V16h2V3.83l5.58 5.59L16 8 8 0z"
  }))));
}

function ArrowUpwardElement(marginRight, marginLeft) {
  return /*#__PURE__*/React__default.createElement(SvgArrowUpward, {
    style: {
      display: "inline-block",
      verticalAlign: "baseline",
      marginRight: !marginRight ? "0px" : marginRight,
      marginLeft: !marginLeft ? "0px" : marginLeft
    }
  });
}

const rowNamesToBeLocalised = ["Department", "", "Usage Type", "Ward", "Wards", "City Name"];
const InsightView = ({
  rowValue,
  insight,
  t,
  isFinance
}) => {
  return /*#__PURE__*/React__default.createElement("span", null, rowValue, !isFinance && /*#__PURE__*/React__default.createElement("div", null, ` `, insight >= 0 ? ArrowUpwardElement() : ArrowDownwardElement(), ` `, isNaN(insight) ? `0%` : `${Digit.Utils.dss.formatter(Math.abs(insight), "number", "Lac", true, t)}%`));
};
const calculateFSTPCapacityUtilization = (value, totalCapacity, numberOfDays = 1) => {
  if (value === undefined) return value;
  return Math.round(value / (totalCapacity * numberOfDays) * 100);
};
const CustomTable = ({
  data: _data = {},
  onSearch,
  setChartData,
  setChartDenomination,
  moduleCode
}) => {
  var _value$range, _value$range2, _filterStack, _filterStack2, _filterStack3, _value$range3, _value$range3$startDa, _value$range4, _value$range4$endDate, _filterStack4, _filterStack5, _filterStack6, _tableColumns$filter;
  const {
    id
  } = _data;
  const [chartKey, setChartKey] = useState(id);
  const [filterStack, setFilterStack] = useState([{
    id: chartKey
  }]);
  const {
    t
  } = useTranslation();
  const {
    value,
    setValue,
    ulbTenants,
    fstpMdmsData
  } = useContext(FilterContext);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const dssTenants = Digit.SessionStorage.get("DSS_TENANTS");
  let isFinance = window.location.href.includes("/employee/dss/dashboard/finance");
  const lastYearDate = {
    startDate: subYears(value === null || value === void 0 ? void 0 : (_value$range = value.range) === null || _value$range === void 0 ? void 0 : _value$range.startDate, 1).getTime(),
    endDate: subYears(value === null || value === void 0 ? void 0 : (_value$range2 = value.range) === null || _value$range2 === void 0 ? void 0 : _value$range2.endDate, 1).getTime(),
    interval: "month",
    title: ""
  };
  const {
    isLoading: isRequestLoading,
    data: lastYearResponse
  } = Digit.Hooks.dss.useGetChart({
    key: chartKey,
    type: "metric",
    tenantId,
    requestDate: {
      ...lastYearDate
    },
    filters: id === chartKey ? value === null || value === void 0 ? void 0 : value.filters : {
      ...(value === null || value === void 0 ? void 0 : value.filters),
      [(_filterStack = filterStack[filterStack.length - 1]) === null || _filterStack === void 0 ? void 0 : _filterStack.filterKey]: (_filterStack2 = filterStack[filterStack.length - 1]) === null || _filterStack2 === void 0 ? void 0 : _filterStack2.filterValue
    },
    addlFilter: (_filterStack3 = filterStack[filterStack.length - 1]) === null || _filterStack3 === void 0 ? void 0 : _filterStack3.addlFilter,
    moduleLevel: (value === null || value === void 0 ? void 0 : value.moduleLevel) || moduleCode
  });
  const {
    isLoading,
    data: response
  } = Digit.Hooks.dss.useGetChart({
    key: chartKey,
    type: "metric",
    tenantId,
    requestDate: {
      ...(value === null || value === void 0 ? void 0 : value.requestDate),
      startDate: value === null || value === void 0 ? void 0 : (_value$range3 = value.range) === null || _value$range3 === void 0 ? void 0 : (_value$range3$startDa = _value$range3.startDate) === null || _value$range3$startDa === void 0 ? void 0 : _value$range3$startDa.getTime(),
      endDate: value === null || value === void 0 ? void 0 : (_value$range4 = value.range) === null || _value$range4 === void 0 ? void 0 : (_value$range4$endDate = _value$range4.endDate) === null || _value$range4$endDate === void 0 ? void 0 : _value$range4$endDate.getTime()
    },
    filters: id === chartKey ? value === null || value === void 0 ? void 0 : value.filters : {
      ...(value === null || value === void 0 ? void 0 : value.filters),
      [(_filterStack4 = filterStack[filterStack.length - 1]) === null || _filterStack4 === void 0 ? void 0 : _filterStack4.filterKey]: (_filterStack5 = filterStack[filterStack.length - 1]) === null || _filterStack5 === void 0 ? void 0 : _filterStack5.filterValue
    },
    addlFilter: (_filterStack6 = filterStack[filterStack.length - 1]) === null || _filterStack6 === void 0 ? void 0 : _filterStack6.addlFilter,
    moduleLevel: (value === null || value === void 0 ? void 0 : value.moduleLevel) || moduleCode
  });
  useEffect(() => {
    const {
      id
    } = _data;
    setChartKey(id);
    setFilterStack([{
      id: id
    }]);
  }, [_data, value]);
  const tableData = useMemo(() => {
    var _response$responseDat, _response$responseDat2, _response$responseDat3, _response$responseDat4, _response$responseDat5;
    if (!response || !lastYearResponse) return;
    setChartDenomination(response === null || response === void 0 ? void 0 : (_response$responseDat = response.responseData) === null || _response$responseDat === void 0 ? void 0 : (_response$responseDat2 = _response$responseDat.data) === null || _response$responseDat2 === void 0 ? void 0 : (_response$responseDat3 = _response$responseDat2[0]) === null || _response$responseDat3 === void 0 ? void 0 : _response$responseDat3.headerSymbol);
    return response === null || response === void 0 ? void 0 : (_response$responseDat4 = response.responseData) === null || _response$responseDat4 === void 0 ? void 0 : (_response$responseDat5 = _response$responseDat4.data) === null || _response$responseDat5 === void 0 ? void 0 : _response$responseDat5.map((rows, id) => {
      var _lastYearResponse$res, _lastYearResponse$res2, _rows$plots;
      const lyData = lastYearResponse === null || lastYearResponse === void 0 ? void 0 : (_lastYearResponse$res = lastYearResponse.responseData) === null || _lastYearResponse$res === void 0 ? void 0 : (_lastYearResponse$res2 = _lastYearResponse$res.data) === null || _lastYearResponse$res2 === void 0 ? void 0 : _lastYearResponse$res2.find(lyRow => (lyRow === null || lyRow === void 0 ? void 0 : lyRow.headerName) === (rows === null || rows === void 0 ? void 0 : rows.headerName));
      return rows === null || rows === void 0 ? void 0 : (_rows$plots = rows.plots) === null || _rows$plots === void 0 ? void 0 : _rows$plots.reduce((acc, row, currentIndex) => {
        var _lyData$plots, _lyData$plots$current;
        let cellValue = (row === null || row === void 0 ? void 0 : row.value) !== null ? row === null || row === void 0 ? void 0 : row.value : (row === null || row === void 0 ? void 0 : row.label) || "";
        if (row !== null && row !== void 0 && row.strValue && (row === null || row === void 0 ? void 0 : row.symbol) === "string" && !(row !== null && row !== void 0 && row.label)) {
          cellValue = row === null || row === void 0 ? void 0 : row.strValue;
        }
        let prevData = lyData === null || lyData === void 0 ? void 0 : (_lyData$plots = lyData.plots) === null || _lyData$plots === void 0 ? void 0 : (_lyData$plots$current = _lyData$plots[currentIndex]) === null || _lyData$plots$current === void 0 ? void 0 : _lyData$plots$current.value;
        let insight = null;
        if ((row === null || row === void 0 ? void 0 : row.name) === "CapacityUtilization" && chartKey !== "fsmVehicleLogReportByVehicleNo") {
          const {
            range
          } = value;
          const {
            startDate,
            endDate
          } = range;
          const numberOfDays = differenceInCalendarDays(endDate, startDate) + 1;
          const ulbs = dssTenants.filter(tenant => {
            var _tenant$city;
            return (tenant === null || tenant === void 0 ? void 0 : (_tenant$city = tenant.city) === null || _tenant$city === void 0 ? void 0 : _tenant$city.ddrName) === (rows === null || rows === void 0 ? void 0 : rows.headerName) || (tenant === null || tenant === void 0 ? void 0 : tenant.code) === (rows === null || rows === void 0 ? void 0 : rows.headerName);
          }).map(tenant => tenant === null || tenant === void 0 ? void 0 : tenant.code);
          const totalCapacity = fstpMdmsData === null || fstpMdmsData === void 0 ? void 0 : fstpMdmsData.filter(plant => ulbs.find(ulb => {
            var _plant$ULBS;
            return plant === null || plant === void 0 ? void 0 : (_plant$ULBS = plant.ULBS) === null || _plant$ULBS === void 0 ? void 0 : _plant$ULBS.includes(ulb);
          })).reduce((acc, plant) => acc + Number(plant === null || plant === void 0 ? void 0 : plant.PlantOperationalCapacityKLD), 0);
          cellValue = calculateFSTPCapacityUtilization(cellValue, totalCapacity, numberOfDays);
          prevData = calculateFSTPCapacityUtilization(prevData, totalCapacity, numberOfDays);
        }
        if ((row === null || row === void 0 ? void 0 : row.name) === "CapacityUtilization" && chartKey === "fsmVehicleLogReportByVehicleNo") {
          const tankCapcity = rows === null || rows === void 0 ? void 0 : rows.plots.find(plot => (plot === null || plot === void 0 ? void 0 : plot.name) === "TankCapacity");
          cellValue = calculateFSTPCapacityUtilization(cellValue, tankCapcity === null || tankCapcity === void 0 ? void 0 : tankCapcity.value);
          prevData = calculateFSTPCapacityUtilization(prevData, tankCapcity === null || tankCapcity === void 0 ? void 0 : tankCapcity.value);
        }
        if (((row === null || row === void 0 ? void 0 : row.symbol) === "number" || (row === null || row === void 0 ? void 0 : row.symbol) === "percentage" || (row === null || row === void 0 ? void 0 : row.symbol) === "amount") && (row === null || row === void 0 ? void 0 : row.name) !== "CitizenAverageRating" && (row === null || row === void 0 ? void 0 : row.name) !== "TankCapacity" && lyData !== undefined) {
          if (prevData === cellValue) insight = 0;else insight = prevData === 0 ? 100 : Math.round((cellValue - prevData) / prevData * 100);
        }
        if (typeof cellValue === "number" && !Number.isInteger(cellValue)) {
          cellValue = Math.round((cellValue + Number.EPSILON) * 100) / 100;
        }
        if (typeof cellValue === "string" && rowNamesToBeLocalised !== null && rowNamesToBeLocalised !== void 0 && rowNamesToBeLocalised.includes(row.name)) {
          cellValue = t(`DSS_TB_` + Digit.Utils.locale.getTransformedLocale(cellValue));
        }
        acc[t(`DSS_HEADER_${Digit.Utils.locale.getTransformedLocale(row === null || row === void 0 ? void 0 : row.name)}`)] = insight !== null ? {
          value: cellValue,
          insight
        } : (row === null || row === void 0 ? void 0 : row.name) === "S.N." ? id + 1 : cellValue;
        acc["key"] = rows === null || rows === void 0 ? void 0 : rows.headerName;
        return acc;
      }, {});
    });
  }, [response, lastYearResponse]);
  useEffect(() => {
    if (tableData) {
      const result = tableData === null || tableData === void 0 ? void 0 : tableData.map(row => {
        return Object.keys(row).reduce((acc, key) => {
          var _row$key;
          if (key === "key") return acc;
          acc[key] = typeof (row === null || row === void 0 ? void 0 : row[key]) === "object" ? row === null || row === void 0 ? void 0 : (_row$key = row[key]) === null || _row$key === void 0 ? void 0 : _row$key.value : row === null || row === void 0 ? void 0 : row[key];
          return acc;
        }, {});
      });
      setChartData(result);
    } else {
      const result = [];
      setChartData(result);
    }
  }, [tableData]);
  const filterValue = useCallback((rows, id, filterValue = "") => {
    return rows.filter(row => {
      const res = Object.keys(row === null || row === void 0 ? void 0 : row.values).find(key => {
        var _row$values, _String$toLowerCase, _row$values5, _String$toLowerCase2, _row$values6;
        if (typeof (row === null || row === void 0 ? void 0 : (_row$values = row.values) === null || _row$values === void 0 ? void 0 : _row$values[key]) === "object") {
          var _row$values2;
          return Object.keys(row === null || row === void 0 ? void 0 : (_row$values2 = row.values) === null || _row$values2 === void 0 ? void 0 : _row$values2[key]).find(id => {
            var _String, _row$values4, _row$values4$key;
            if (id === "insight") {
              var _row$values3, _row$values3$key;
              return String(Math.abs(row === null || row === void 0 ? void 0 : (_row$values3 = row.values) === null || _row$values3 === void 0 ? void 0 : (_row$values3$key = _row$values3[key]) === null || _row$values3$key === void 0 ? void 0 : _row$values3$key[id]) + "%").toLowerCase().startsWith(filterValue === null || filterValue === void 0 ? void 0 : filterValue.toLowerCase());
            }
            return (_String = String(row === null || row === void 0 ? void 0 : (_row$values4 = row.values) === null || _row$values4 === void 0 ? void 0 : (_row$values4$key = _row$values4[key]) === null || _row$values4$key === void 0 ? void 0 : _row$values4$key[id])) === null || _String === void 0 ? void 0 : _String.toLowerCase().includes(filterValue === null || filterValue === void 0 ? void 0 : filterValue.toLowerCase());
          });
        }
        return ((_String$toLowerCase = String(row === null || row === void 0 ? void 0 : (_row$values5 = row.values) === null || _row$values5 === void 0 ? void 0 : _row$values5[key]).toLowerCase()) === null || _String$toLowerCase === void 0 ? void 0 : _String$toLowerCase.includes(filterValue === null || filterValue === void 0 ? void 0 : filterValue.toLowerCase())) || ((_String$toLowerCase2 = String(t(row === null || row === void 0 ? void 0 : (_row$values6 = row.values) === null || _row$values6 === void 0 ? void 0 : _row$values6[key])).toLowerCase()) === null || _String$toLowerCase2 === void 0 ? void 0 : _String$toLowerCase2.includes(filterValue === null || filterValue === void 0 ? void 0 : filterValue.toLowerCase()));
      });
      return res;
    });
  }, []);
  const renderUnits = denomination => {
    switch (denomination) {
      case "Unit":
        return `(${t("DSS_" + Digit.Utils.locale.getTransformedLocale(denomination))})`;
      case "Lac":
        return `(${t("DSS_" + Digit.Utils.locale.getTransformedLocale(denomination))})`;
      case "Cr":
        return `(${t("DSS_" + Digit.Utils.locale.getTransformedLocale(denomination))})`;
      default:
        return "";
    }
  };
  const renderHeader = plot => {
    const code = `DSS_HEADER_${Digit.Utils.locale.getTransformedLocale(plot === null || plot === void 0 ? void 0 : plot.name)}`;
    if ((plot === null || plot === void 0 ? void 0 : plot.symbol) === "amount") {
      return `${t(code)} ${renderUnits(value === null || value === void 0 ? void 0 : value.denomination)}`;
    }
    return t(code);
  };
  const getDrilldownCharts = (value, filterKey, label, filters = []) => {
    var _response$responseDat6, _response$responseDat7;
    if (response !== null && response !== void 0 && (_response$responseDat6 = response.responseData) !== null && _response$responseDat6 !== void 0 && _response$responseDat6.drillDownChartId && (response === null || response === void 0 ? void 0 : (_response$responseDat7 = response.responseData) === null || _response$responseDat7 === void 0 ? void 0 : _response$responseDat7.drillDownChartId) !== "none") {
      var _response$responseDat8, _response$responseDat9;
      let currentValue = value;
      if (filterKey === "tenantId") {
        var _currentValue;
        currentValue = dssTenants === null || dssTenants === void 0 ? void 0 : dssTenants.filter(tenant => {
          var _tenant$city2;
          return (tenant === null || tenant === void 0 ? void 0 : (_tenant$city2 = tenant.city) === null || _tenant$city2 === void 0 ? void 0 : _tenant$city2.ddrName) === value || (tenant === null || tenant === void 0 ? void 0 : tenant.code) === value || (tenant === null || tenant === void 0 ? void 0 : tenant.description) === value;
        }).map(tenant => tenant === null || tenant === void 0 ? void 0 : tenant.code);
        if (((_currentValue = currentValue) === null || _currentValue === void 0 ? void 0 : _currentValue.length) == 0 && value) {
          currentValue = [value];
        }
        if (currentValue === undefined) return;
      }
      let newStack = {
        id: response === null || response === void 0 ? void 0 : (_response$responseDat8 = response.responseData) === null || _response$responseDat8 === void 0 ? void 0 : _response$responseDat8.drillDownChartId,
        name: value,
        filterKey,
        filterValue: currentValue,
        label
      };
      if (filters.length > 1) {
        var _newFilter$, _filterStack7;
        let newFilter = filters.filter(ele => ele.key != filterKey);
        newStack["addlFilter"] = {
          [newFilter === null || newFilter === void 0 ? void 0 : (_newFilter$ = newFilter[0]) === null || _newFilter$ === void 0 ? void 0 : _newFilter$.key]: filterStack === null || filterStack === void 0 ? void 0 : (_filterStack7 = filterStack[(filterStack === null || filterStack === void 0 ? void 0 : filterStack.length) - 1]) === null || _filterStack7 === void 0 ? void 0 : _filterStack7.filterValue
        };
        newFilter.map(fil => {
          var _filterStack$filter, _filterStack$filter$, _filterStack$filter2, _filterStack$filter2$;
          newStack["addlFilter"][fil === null || fil === void 0 ? void 0 : fil.key] = (filterStack === null || filterStack === void 0 ? void 0 : (_filterStack$filter = filterStack.filter(e => e.filterKey == (fil === null || fil === void 0 ? void 0 : fil.key))) === null || _filterStack$filter === void 0 ? void 0 : (_filterStack$filter$ = _filterStack$filter[0]) === null || _filterStack$filter$ === void 0 ? void 0 : _filterStack$filter$.filterValue) || (filterStack === null || filterStack === void 0 ? void 0 : (_filterStack$filter2 = filterStack.filter(e => e.filterKey == "tenantId")) === null || _filterStack$filter2 === void 0 ? void 0 : (_filterStack$filter2$ = _filterStack$filter2[0]) === null || _filterStack$filter2$ === void 0 ? void 0 : _filterStack$filter2$.filterValue);
        });
      }
      setFilterStack([...filterStack, newStack]);
      setChartKey(response === null || response === void 0 ? void 0 : (_response$responseDat9 = response.responseData) === null || _response$responseDat9 === void 0 ? void 0 : _response$responseDat9.drillDownChartId);
    }
  };
  const sortRows = useCallback((rowA, rowB, columnId) => {
    var _rowA$values, _rowB$values;
    const firstCell = rowA === null || rowA === void 0 ? void 0 : (_rowA$values = rowA.values) === null || _rowA$values === void 0 ? void 0 : _rowA$values[columnId];
    const secondCell = rowB === null || rowB === void 0 ? void 0 : (_rowB$values = rowB.values) === null || _rowB$values === void 0 ? void 0 : _rowB$values[columnId];
    let value1, value2;
    value1 = typeof firstCell === "object" ? firstCell === null || firstCell === void 0 ? void 0 : firstCell.value : firstCell;
    value2 = typeof secondCell === "object" ? secondCell === null || secondCell === void 0 ? void 0 : secondCell.value : secondCell;
    return String(value1).localeCompare(String(value2), undefined, {
      numeric: true
    });
  }, []);
  const accessData = plot => {
    const name = t(`DSS_HEADER_${Digit.Utils.locale.getTransformedLocale(plot === null || plot === void 0 ? void 0 : plot.name)}`);
    return (originalRow, rowIndex, columns) => {
      const cellValue = originalRow === null || originalRow === void 0 ? void 0 : originalRow[name];
      if ((plot === null || plot === void 0 ? void 0 : plot.symbol) === "amount") {
        return typeof cellValue === "object" ? {
          value: Digit.Utils.dss.formatter(convertDenomination(cellValue === null || cellValue === void 0 ? void 0 : cellValue.value), "number", "Lac", true, t, isFinance ? true : false),
          insight: cellValue === null || cellValue === void 0 ? void 0 : cellValue.insight
        } : String(Digit.Utils.dss.formatter(convertDenomination(cellValue), "number", "Lac", true, t, isFinance ? true : false));
      } else if ((plot === null || plot === void 0 ? void 0 : plot.symbol) === "number" || (plot === null || plot === void 0 ? void 0 : plot.symbol) === "percentage") {
        return typeof cellValue === "object" ? {
          value: Digit.Utils.dss.formatter(cellValue === null || cellValue === void 0 ? void 0 : cellValue.value, "number", "Lac", true, t),
          insight: cellValue === null || cellValue === void 0 ? void 0 : cellValue.insight
        } : String(Digit.Utils.dss.formatter(cellValue, "number", "Lac", true, t));
      }
      return originalRow[name];
    };
  };
  const isMobile = window.Digit.Utils.browser.isMobile();
  const tableColumns = useMemo(() => {
    var _response$responseDat10, _response$responseDat11, _columns$plots;
    const columns = response === null || response === void 0 ? void 0 : (_response$responseDat10 = response.responseData) === null || _response$responseDat10 === void 0 ? void 0 : (_response$responseDat11 = _response$responseDat10.data) === null || _response$responseDat11 === void 0 ? void 0 : _response$responseDat11.find(row => !!row);
    return columns === null || columns === void 0 ? void 0 : (_columns$plots = columns.plots) === null || _columns$plots === void 0 ? void 0 : _columns$plots.filter(plot => (plot === null || plot === void 0 ? void 0 : plot.name) !== "TankCapacity").map((plot, index) => {
      var _plot$name;
      return {
        Header: /*#__PURE__*/React__default.createElement("span", {
          className: "tooltip",
          "data-tip": "React-tooltip",
          "data-for": `jk-table-${index}`
        }, renderHeader(plot), /*#__PURE__*/React__default.createElement(ReactTooltip, {
          textColor: "#fff",
          backgroundColor: "#555",
          place: "bottom",
          type: "info",
          effect: "solid",
          id: `jk-table-${index}`
        }, t(`TIP_DSS_HEADER_${Digit.Utils.locale.getTransformedLocale(plot === null || plot === void 0 ? void 0 : plot.name)}`))),
        accessor: accessData(plot),
        id: plot === null || plot === void 0 ? void 0 : (_plot$name = plot.name) === null || _plot$name === void 0 ? void 0 : _plot$name.replaceAll(".", " "),
        symbol: plot === null || plot === void 0 ? void 0 : plot.symbol,
        sortType: sortRows,
        Cell: args => {
          var _response$responseDat12, _response$responseDat13, _response$responseDat14;
          const {
            value: cellValue,
            column,
            row
          } = args;
          if (typeof cellValue === "object") {
            return /*#__PURE__*/React__default.createElement(InsightView, {
              insight: cellValue === null || cellValue === void 0 ? void 0 : cellValue.insight,
              rowValue: cellValue === null || cellValue === void 0 ? void 0 : cellValue.value,
              t: t,
              isFinance: isFinance
            });
          }
          const filter = response === null || response === void 0 ? void 0 : (_response$responseDat12 = response.responseData) === null || _response$responseDat12 === void 0 ? void 0 : (_response$responseDat13 = _response$responseDat12.filter) === null || _response$responseDat13 === void 0 ? void 0 : _response$responseDat13.find(elem => (elem === null || elem === void 0 ? void 0 : elem.column) === (column === null || column === void 0 ? void 0 : column.id));
          if ((response === null || response === void 0 ? void 0 : (_response$responseDat14 = response.responseData) === null || _response$responseDat14 === void 0 ? void 0 : _response$responseDat14.drillDownChartId) !== "none" && filter !== undefined) {
            return /*#__PURE__*/React__default.createElement("span", {
              style: {
                color: "#a82227",
                cursor: "pointer"
              },
              onClick: () => {
                var _row$original, _response$responseDat15;
                return getDrilldownCharts(cellValue !== null && cellValue !== void 0 && cellValue.includes("DSS_TB_") ? row === null || row === void 0 ? void 0 : (_row$original = row.original) === null || _row$original === void 0 ? void 0 : _row$original.key : cellValue, filter === null || filter === void 0 ? void 0 : filter.key, t(`DSS_HEADER_${Digit.Utils.locale.getTransformedLocale(plot === null || plot === void 0 ? void 0 : plot.name)}`), response === null || response === void 0 ? void 0 : (_response$responseDat15 = response.responseData) === null || _response$responseDat15 === void 0 ? void 0 : _response$responseDat15.filter);
              }
            }, t(`DSS_TB_${Digit.Utils.locale.getTransformedLocale(cellValue)}`));
          }
          if ((column === null || column === void 0 ? void 0 : column.id) === "CitizenAverageRating") {
            return /*#__PURE__*/React__default.createElement(Rating, {
              id: row === null || row === void 0 ? void 0 : row.id,
              currentRating: Math.round(cellValue * 10) / 10,
              styles: {
                width: "unset",
                marginBottom: 0
              },
              starStyles: {
                width: "25px"
              }
            });
          }
          return String(t(cellValue));
        }
      };
    });
  }, [response, value === null || value === void 0 ? void 0 : value.denomination, value === null || value === void 0 ? void 0 : value.range]);
  const convertDenomination = val => {
    const {
      denomination
    } = value;
    switch (denomination) {
      case "Unit":
        return val;
      case "Lac":
        return Number((val / 100000).toFixed(2));
      case "Cr":
        return Number((val / 10000000).toFixed(2));
      default:
        return val;
    }
  };
  const removeULB = id => {
    var _nextState;
    const nextState = filterStack === null || filterStack === void 0 ? void 0 : filterStack.filter((filter, index) => index < id);
    setFilterStack(nextState);
    setChartKey((_nextState = nextState[(nextState === null || nextState === void 0 ? void 0 : nextState.length) - 1]) === null || _nextState === void 0 ? void 0 : _nextState.id);
  };
  if (isLoading || isRequestLoading) {
    return /*#__PURE__*/React__default.createElement(Loader, null);
  }
  return /*#__PURE__*/React__default.createElement("div", {
    style: {
      width: "100%"
    }
  }, !isFinance && /*#__PURE__*/React__default.createElement("span", {
    className: "dss-table-subheader",
    style: {
      position: "sticky",
      left: 0
    }
  }, t("DSS_CMN_TABLE_INFO")), (filterStack === null || filterStack === void 0 ? void 0 : filterStack.length) > 1 && /*#__PURE__*/React__default.createElement("div", {
    className: "tag-container"
  }, /*#__PURE__*/React__default.createElement("span", {
    style: {
      marginTop: "20px"
    }
  }, t("DSS_FILTERS_APPLIED"), ": "), filterStack.map((filter, id) => id > 0 ? /*#__PURE__*/React__default.createElement(RemoveableTag, {
    key: id,
    text: `${filter === null || filter === void 0 ? void 0 : filter.label}: ${t(`DSS_TB_${Digit.Utils.locale.getTransformedLocale(filter === null || filter === void 0 ? void 0 : filter.name)}`)}`,
    onClick: () => removeULB(id)
  }) : null)), !tableColumns || !tableData ? /*#__PURE__*/React__default.createElement(NoData, {
    t: t
  }) : /*#__PURE__*/React__default.createElement(Table, {
    className: "customTable ",
    t: t,
    customTableWrapperClassName: "dss-table-wrapper",
    disableSort: false,
    autoSort: true,
    manualPagination: false,
    globalSearch: filterValue,
    initSortId: "S N ",
    onSearch: onSearch,
    data: (tableData === null || tableData === void 0 ? void 0 : tableData.filter(tRow => tRow)) || [],
    totalRecords: tableData === null || tableData === void 0 ? void 0 : tableData.length,
    columns: tableColumns === null || tableColumns === void 0 ? void 0 : (_tableColumns$filter = tableColumns.filter(row => row)) === null || _tableColumns$filter === void 0 ? void 0 : _tableColumns$filter.slice(1),
    showAutoSerialNo: "DSS_HEADER_S_N_",
    styles: {
      overflow: "hidden"
    },
    getCellProps: cellInfo => {
      return {
        style: {}
      };
    }
  }));
};

const SearchImg = () => {
  return /*#__PURE__*/React__default.createElement(SearchIconSvg, {
    className: "signature-img"
  });
};
const GenericChart = ({
  header,
  subHeader,
  className,
  caption,
  children,
  showHeader: _showHeader = true,
  showSearch: _showSearch = false,
  showDownload: _showDownload = false,
  onChange,
  chip: _chip = [],
  updateChip,
  value: _value = {}
}) => {
  const {
    t
  } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [chartData, setChartData] = useState(null);
  const [chartDenomination, setChartDenomination] = useState(null);
  const isMobile = window.Digit.Utils.browser.isMobile();
  const chart = useRef();
  const menuItems = [{
    code: "image",
    i18nKey: t("ES_COMMON_DOWNLOAD_IMAGE"),
    icon: /*#__PURE__*/React__default.createElement(DownloadIcon, null)
  }, {
    code: "shareImage",
    i18nKey: t("ES_DSS_SHARE_IMAGE"),
    target: "mail",
    icon: /*#__PURE__*/React__default.createElement(EmailIcon, null)
  }, {
    code: "shareImage",
    i18nKey: t("ES_DSS_SHARE_IMAGE"),
    target: "whatsapp",
    icon: /*#__PURE__*/React__default.createElement(WhatsappIcon, null)
  }];
  function download(data) {
    setTimeout(() => {
      switch (data.code) {
        case "pdf":
          return Digit.Download.PDF(chart, t(header));
        case "image":
          return Digit.Download.IndividualChartImage(chart, t(header));
        case "sharePdf":
          return Digit.ShareFiles.PDF(tenantId, chart, t(header), data.target);
        case "shareImage":
          return Digit.ShareFiles.IndividualChartImage(tenantId, chart, t(header), data.target);
        default:
          return null;
      }
    }, 500);
  }
  const handleExcelDownload = () => {
    return Digit.Download.Excel(chartData, t(header));
  };
  let headerName = t(Digit.Utils.locale.getTransformedLocale(header));
  return /*#__PURE__*/React__default.createElement(Card, {
    className: `chart-item ${className}`,
    ReactRef: chart
  }, /*#__PURE__*/React__default.createElement("div", {
    className: `chartHeader ${_showSearch && "column-direction"}`,
    style: {
      flexDirection: "column"
    }
  }, /*#__PURE__*/React__default.createElement("div", null, _showHeader && /*#__PURE__*/React__default.createElement(CardLabel, {
    className: "dss-header-label"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: `tooltip ${(headerName === null || headerName === void 0 ? void 0 : headerName.length) < (isMobile ? 20 : 30) ? "dss-white-pre" : "dss-white-pre-line"}`
  }, headerName, (chartDenomination === null || chartDenomination === void 0 ? void 0 : chartDenomination.toLowerCase()) === "amount" && /*#__PURE__*/React__default.createElement("span", {
    style: {
      whiteSpace: "pre"
    }
  }, " (", t(`DSS_${Digit.Utils.locale.getTransformedLocale(_value === null || _value === void 0 ? void 0 : _value.denomination)}`), ")"), /*#__PURE__*/React__default.createElement("span", {
    className: "tooltiptext",
    style: {
      whiteSpace: !isMobile ? "nowrap" : "normal",
      fontSize: "medium",
      marginLeft: t(`TIP_${Digit.Utils.locale.getTransformedLocale(header)}`).length > 30 ? -120 : -60
    }
  }, t(`TIP_${Digit.Utils.locale.getTransformedLocale(header)}`)))), _chip.length < 2 && subHeader && /*#__PURE__*/React__default.createElement("p", {
    style: {
      color: "#505A5F",
      fontWeight: 700
    }
  }, subHeader)), /*#__PURE__*/React__default.createElement("div", {
    className: "sideContent"
  }, _chip && _chip.length > 1 && /*#__PURE__*/React__default.createElement(Chip, {
    items: _chip,
    onClick: updateChip,
    t: t
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "table-search-wrapper"
  }, _showSearch && /*#__PURE__*/React__default.createElement(TextInput, {
    className: "searchInput",
    placeholder: "Search",
    signature: true,
    signatureImg: /*#__PURE__*/React__default.createElement(SearchImg, null),
    onChange: onChange
  }), _showDownload && /*#__PURE__*/React__default.createElement(DownloadIcon, {
    className: "mrlg cursorPointer",
    onClick: handleExcelDownload
  })), !_showDownload && /*#__PURE__*/React__default.createElement(EllipsisMenu, {
    menuItems: menuItems,
    displayKey: "i18nKey",
    onSelect: data => download(data)
  }))), caption && /*#__PURE__*/React__default.createElement(CardCaption, null, caption), React__default.cloneElement(children, {
    setChartData,
    setChartDenomination
  }));
};
const Chip = props => {
  const [state, setState] = useState(1);
  return /*#__PURE__*/React__default.createElement("div", {
    className: "table-switch-card-chip"
  }, props.items.map((item, index) => {
    var _item$tabName;
    return /*#__PURE__*/React__default.createElement("div", {
      className: item.active && state ? "table-switch-card-active" : "table-switch-card-inactive",
      onClick: () => {
        props.onClick && props.onClick(item.index);
        setState(prev => prev + 1);
      }
    }, props.t(`DSS_TAB_${item === null || item === void 0 ? void 0 : (_item$tabName = item.tabName) === null || _item$tabName === void 0 ? void 0 : _item$tabName.toUpperCase()}`));
  }));
};

const MetricData = ({
  t,
  data,
  code,
  indexValuesWithStar
}) => {
  var _data$insight, _data$insight$value, _data$insight$value$r, _data$insight2;
  const {
    value
  } = useContext(FilterContext);
  const insight = data === null || data === void 0 ? void 0 : (_data$insight = data.insight) === null || _data$insight === void 0 ? void 0 : (_data$insight$value = _data$insight.value) === null || _data$insight$value === void 0 ? void 0 : (_data$insight$value$r = _data$insight$value.replace(/[+-]/g, "")) === null || _data$insight$value$r === void 0 ? void 0 : _data$insight$value$r.split("%");
  return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("p", {
    className: "heading-m",
    style: {
      textAlign: "right",
      paddingTop: "0px",
      whiteSpace: "nowrap"
    }
  }, indexValuesWithStar !== null && indexValuesWithStar !== void 0 && indexValuesWithStar.includes(code) ? /*#__PURE__*/React__default.createElement(Rating, {
    toolTipText: t("COMMON_RATING_LABEL"),
    currentRating: Math.round((data === null || data === void 0 ? void 0 : data.headerValue) * 10) / 10,
    styles: {
      width: "unset",
      marginBottom: "unset"
    },
    starStyles: {
      width: "25px"
    }
  }) : data !== null && data !== void 0 && data.headerName.includes("AVG") ? `${Digit.Utils.dss.formatter(data === null || data === void 0 ? void 0 : data.headerValue, data === null || data === void 0 ? void 0 : data.headerSymbol, "Unit", true)} ${code === "totalSludgeTreated" ? t(`DSS_KL`) : ""}` : `${Digit.Utils.dss.formatter(data === null || data === void 0 ? void 0 : data.headerValue, data === null || data === void 0 ? void 0 : data.headerSymbol, value === null || value === void 0 ? void 0 : value.denomination, true, t)} ${code === "totalSludgeTreated" ? t(`DSS_KL`) : ""}`), (data === null || data === void 0 ? void 0 : data.insight) && /*#__PURE__*/React__default.createElement("div", {
    style: {
      width: "100%",
      display: "flex",
      justifyContent: "end"
    }
  }, (data === null || data === void 0 ? void 0 : (_data$insight2 = data.insight) === null || _data$insight2 === void 0 ? void 0 : _data$insight2.indicator) === "upper_green" ? ArrowUpwardElement("10px") : ArrowDownwardElement("10px"), /*#__PURE__*/React__default.createElement("p", {
    className: `${data === null || data === void 0 ? void 0 : data.insight.colorCode}`,
    style: {
      whiteSpace: "pre"
    }
  }, (insight === null || insight === void 0 ? void 0 : insight[0]) && `${Digit.Utils.dss.formatter(insight[0], "number", value === null || value === void 0 ? void 0 : value.denomination, true, t)}% ${t(Digit.Utils.locale.getTransformedLocale("DSS" + (insight === null || insight === void 0 ? void 0 : insight[1]) || ""))}`)));
};
const MetricChartRow = ({
  data,
  setChartDenomination,
  index,
  moduleCode,
  indexValuesWithStar
}) => {
  var _value$range, _value$range$startDat, _value$range2, _value$range2$endDate, _name$filter, _showDate$id, _showDate$id2, _response$responseDat8, _response$responseDat9, _response$responseDat10;
  const {
    id,
    chartType
  } = data;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const {
    t
  } = useTranslation();
  const {
    value
  } = useContext(FilterContext);
  const [showDate, setShowDate] = useState({});
  const isMobile = window.Digit.Utils.browser.isMobile();
  const {
    isLoading,
    data: response
  } = Digit.Hooks.dss.useGetChart({
    key: id,
    type: chartType,
    tenantId,
    requestDate: {
      ...(value === null || value === void 0 ? void 0 : value.requestDate),
      startDate: value === null || value === void 0 ? void 0 : (_value$range = value.range) === null || _value$range === void 0 ? void 0 : (_value$range$startDat = _value$range.startDate) === null || _value$range$startDat === void 0 ? void 0 : _value$range$startDat.getTime(),
      endDate: value === null || value === void 0 ? void 0 : (_value$range2 = value.range) === null || _value$range2 === void 0 ? void 0 : (_value$range2$endDate = _value$range2.endDate) === null || _value$range2$endDate === void 0 ? void 0 : _value$range2$endDate.getTime()
    },
    filters: value === null || value === void 0 ? void 0 : value.filters,
    moduleLevel: (value === null || value === void 0 ? void 0 : value.moduleLevel) || moduleCode
  });
  useEffect(() => {
    if (response) {
      var _response$responseDat, _response$responseDat2, _response$responseDat3, _response$responseDat4, _response$responseDat5, _response$responseDat6, _response$responseDat7;
      let plots = (response === null || response === void 0 ? void 0 : (_response$responseDat = response.responseData) === null || _response$responseDat === void 0 ? void 0 : (_response$responseDat2 = _response$responseDat.data) === null || _response$responseDat2 === void 0 ? void 0 : (_response$responseDat3 = _response$responseDat2[0]) === null || _response$responseDat3 === void 0 ? void 0 : _response$responseDat3.plots) || null;
      if (plots && Array.isArray(plots) && plots.length > 0 && plots !== null && plots !== void 0 && plots.every(e => e.value)) setShowDate(oldstate => {
        var _plots$, _plots$2;
        return {
          ...oldstate,
          [id]: {
            todaysDate: Digit.DateUtils.ConvertEpochToDate(plots === null || plots === void 0 ? void 0 : (_plots$ = plots[0]) === null || _plots$ === void 0 ? void 0 : _plots$.value),
            lastUpdatedTime: Digit.DateUtils.ConvertEpochToTimeInHours(plots === null || plots === void 0 ? void 0 : (_plots$2 = plots[1]) === null || _plots$2 === void 0 ? void 0 : _plots$2.value)
          }
        };
      });
      index === 0 && setChartDenomination(response === null || response === void 0 ? void 0 : (_response$responseDat4 = response.responseData) === null || _response$responseDat4 === void 0 ? void 0 : (_response$responseDat5 = _response$responseDat4.data) === null || _response$responseDat5 === void 0 ? void 0 : (_response$responseDat6 = _response$responseDat5[0]) === null || _response$responseDat6 === void 0 ? void 0 : _response$responseDat6.headerSymbol);
      if ((response === null || response === void 0 ? void 0 : (_response$responseDat7 = response.responseData) === null || _response$responseDat7 === void 0 ? void 0 : _response$responseDat7.visualizationCode) === "todaysLastYearCollectionv3") {
        const today = new Date();
        const previousYearDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
        const previousYear = previousYearDate.getFullYear();
        const previousMonth = previousYearDate.getMonth() + 1;
        const previousDay = previousYearDate.getDate();
        const formattedPreviousYearDate = `${previousDay < 10 ? '0' + previousDay : previousDay}/${previousMonth < 10 ? '0' + previousMonth : previousMonth}/${previousYear}`;
        setShowDate(oldstate => ({
          ...oldstate,
          [id]: {
            todaysDate: formattedPreviousYearDate,
            lastUpdatedTime: ""
          }
        }));
      }
    } else {
      setShowDate({});
    }
  }, [response]);
  if (isLoading) {
    return false;
  }
  if (!response) {
    return /*#__PURE__*/React__default.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: `tooltip`
    }, t(data.name), /*#__PURE__*/React__default.createElement("span", {
      className: "tooltiptext",
      style: {
        fontSize: "medium",
        width: t(`TIP_${data.name}`).length < 50 ? "fit-content" : 400,
        height: 50,
        whiteSpace: "normal"
      }
    }, /*#__PURE__*/React__default.createElement("span", {
      style: {
        fontWeight: "500",
        color: "white"
      }
    }, t(`TIP_${data.name}`)))), /*#__PURE__*/React__default.createElement("span", {
      style: {
        whiteSpace: "pre"
      }
    }, t("DSS_NO_DATA")));
  }
  let name = t(data === null || data === void 0 ? void 0 : data.name) || "";
  const getWidth = data => {
    if (isMobile) return "auto";else return t(`TIP_${data.name}`).length < 50 ? "fit-content" : 400;
  };
  const getHeight = data => {
    if (isMobile) return "auto";else return 50;
  };
  return /*#__PURE__*/React__default.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: `tooltip`
  }, typeof name == "string" && name, Array.isArray(name) && (name === null || name === void 0 ? void 0 : (_name$filter = name.filter(ele => ele)) === null || _name$filter === void 0 ? void 0 : _name$filter.map(ele => /*#__PURE__*/React__default.createElement("div", {
    style: {
      whiteSpace: "pre"
    }
  }, ele))), /*#__PURE__*/React__default.createElement("span", {
    className: "dss-white-pre",
    style: {
      display: "block"
    }
  }, " ", showDate === null || showDate === void 0 ? void 0 : (_showDate$id = showDate[id]) === null || _showDate$id === void 0 ? void 0 : _showDate$id.todaysDate), /*#__PURE__*/React__default.createElement("span", {
    className: "tooltiptext",
    style: {
      fontSize: "medium",
      width: getWidth(data),
      height: getHeight(),
      whiteSpace: "normal"
    }
  }, /*#__PURE__*/React__default.createElement("span", {
    style: {
      fontWeight: "500",
      color: "white"
    }
  }, t(`TIP_${data.name}`)), /*#__PURE__*/React__default.createElement("span", {
    style: {
      color: "white"
    }
  }, " ", showDate === null || showDate === void 0 ? void 0 : (_showDate$id2 = showDate[id]) === null || _showDate$id2 === void 0 ? void 0 : _showDate$id2.lastUpdatedTime))), /*#__PURE__*/React__default.createElement(MetricData, {
    t: t,
    data: response === null || response === void 0 ? void 0 : (_response$responseDat8 = response.responseData) === null || _response$responseDat8 === void 0 ? void 0 : (_response$responseDat9 = _response$responseDat8.data) === null || _response$responseDat9 === void 0 ? void 0 : _response$responseDat9[0],
    code: response === null || response === void 0 ? void 0 : (_response$responseDat10 = response.responseData) === null || _response$responseDat10 === void 0 ? void 0 : _response$responseDat10.visualizationCode,
    indexValuesWithStar: indexValuesWithStar
  }));
};
const MetricChart = ({
  data,
  setChartDenomination,
  moduleCode
}) => {
  const {
    charts
  } = data;
  const indexValuesWithStar = ["citizenAvgRating", "nssOverviewCitizenFeedbackScore", "nssPtCitizenFeedbackScore", "sdssPtCitizenFeedbackScore", "sdssOverviewCitizenFeedbackScore"];
  return /*#__PURE__*/React__default.createElement(Fragment$1, null, /*#__PURE__*/React__default.createElement("span", {
    className: "chart-metric-wrapper"
  }, charts.map((chart, index) => /*#__PURE__*/React__default.createElement(MetricChartRow, {
    data: chart,
    key: index,
    index: index,
    moduleCode: moduleCode,
    setChartDenomination: setChartDenomination,
    indexValuesWithStar: indexValuesWithStar
  }))));
};

const MetricData$1 = ({
  t,
  data
}) => {
  var _data$insight, _data$insight$value, _data$insight$value$r, _data$insight2;
  const {
    value
  } = useContext(FilterContext);
  const insight = data === null || data === void 0 ? void 0 : (_data$insight = data.insight) === null || _data$insight === void 0 ? void 0 : (_data$insight$value = _data$insight.value) === null || _data$insight$value === void 0 ? void 0 : (_data$insight$value$r = _data$insight$value.replace(/[+-]/g, "")) === null || _data$insight$value$r === void 0 ? void 0 : _data$insight$value$r.split("%");
  return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("p", {
    className: "heading-m",
    style: {
      paddingTop: "0px",
      whiteSpace: "nowrap",
      marginLeft: "0px"
    }
  }, `${Digit.Utils.dss.formatter(data === null || data === void 0 ? void 0 : data.headerValue, data === null || data === void 0 ? void 0 : data.headerSymbol, value === null || value === void 0 ? void 0 : value.denomination, true, t)}`), (data === null || data === void 0 ? void 0 : data.insight) && /*#__PURE__*/React__default.createElement("div", {
    style: {
      width: "100%",
      display: "flex",
      justifyContent: "end"
    }
  }, (data === null || data === void 0 ? void 0 : (_data$insight2 = data.insight) === null || _data$insight2 === void 0 ? void 0 : _data$insight2.indicator) === "upper_green" ? ArrowUpwardElement("10px") : ArrowDownwardElement("10px"), /*#__PURE__*/React__default.createElement("p", {
    className: `${data === null || data === void 0 ? void 0 : data.insight.colorCode}`,
    style: {
      whiteSpace: "pre"
    }
  }, (insight === null || insight === void 0 ? void 0 : insight[0]) && `${Digit.Utils.dss.formatter(insight[0], "number", value === null || value === void 0 ? void 0 : value.denomination, true, t)}% ${t(Digit.Utils.locale.getTransformedLocale("DSS" + (insight === null || insight === void 0 ? void 0 : insight[1]) || ""))}`)));
};
const Chart = ({
  data
}) => {
  var _value$range, _value$range$startDat, _value$range2, _value$range2$endDate, _name$filter, _showDate$id, _showDate$id2, _response$responseDat, _response$responseDat2;
  const {
    id,
    chartType
  } = data;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const {
    t
  } = useTranslation();
  const {
    value
  } = useContext(FilterContext);
  const [showDate, setShowDate] = useState({});
  const isMobile = window.Digit.Utils.browser.isMobile();
  const {
    isLoading,
    data: response
  } = Digit.Hooks.dss.useGetChart({
    key: id,
    type: chartType,
    tenantId,
    requestDate: {
      ...(value === null || value === void 0 ? void 0 : value.requestDate),
      startDate: value === null || value === void 0 ? void 0 : (_value$range = value.range) === null || _value$range === void 0 ? void 0 : (_value$range$startDat = _value$range.startDate) === null || _value$range$startDat === void 0 ? void 0 : _value$range$startDat.getTime(),
      endDate: value === null || value === void 0 ? void 0 : (_value$range2 = value.range) === null || _value$range2 === void 0 ? void 0 : (_value$range2$endDate = _value$range2.endDate) === null || _value$range2$endDate === void 0 ? void 0 : _value$range2$endDate.getTime()
    },
    filters: value === null || value === void 0 ? void 0 : value.filters
  });
  if (isLoading) {
    return /*#__PURE__*/React__default.createElement(Loader, null);
  }
  let name = t(data === null || data === void 0 ? void 0 : data.name) || "";
  const getWidth = data => {
    if (isMobile) return "auto";else return t(`TIP_${data.name}`).length < 50 ? "fit-content" : 400;
  };
  const getHeight = data => {
    if (isMobile) return "auto";else return 50;
  };
  return /*#__PURE__*/React__default.createElement("div", {
    className: "blocks cursorPointer",
    style: {
      flexDirection: "column"
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    className: `tooltip`
  }, typeof name == "string" && name, Array.isArray(name) && (name === null || name === void 0 ? void 0 : (_name$filter = name.filter(ele => ele)) === null || _name$filter === void 0 ? void 0 : _name$filter.map(ele => /*#__PURE__*/React__default.createElement("div", {
    style: {
      whiteSpace: "pre"
    }
  }, ele))), /*#__PURE__*/React__default.createElement("span", {
    className: "dss-white-pre",
    style: {
      display: "block"
    }
  }, " ", showDate === null || showDate === void 0 ? void 0 : (_showDate$id = showDate[id]) === null || _showDate$id === void 0 ? void 0 : _showDate$id.todaysDate), /*#__PURE__*/React__default.createElement("span", {
    className: "tooltiptext",
    style: {
      fontSize: "medium",
      width: getWidth(data),
      height: getHeight(),
      whiteSpace: "normal"
    }
  }, /*#__PURE__*/React__default.createElement("span", {
    style: {
      fontWeight: "500",
      color: "white"
    }
  }, t(`TIP_${data.name}`)), /*#__PURE__*/React__default.createElement("span", {
    style: {
      color: "white"
    }
  }, " ", showDate === null || showDate === void 0 ? void 0 : (_showDate$id2 = showDate[id]) === null || _showDate$id2 === void 0 ? void 0 : _showDate$id2.lastUpdatedTime))), /*#__PURE__*/React__default.createElement(MetricData$1, {
    t: t,
    data: response === null || response === void 0 ? void 0 : (_response$responseDat = response.responseData) === null || _response$responseDat === void 0 ? void 0 : (_response$responseDat2 = _response$responseDat.data) === null || _response$responseDat2 === void 0 ? void 0 : _response$responseDat2[0]
  }));
};
const Summary = ({
  data
}) => {
  const {
    t
  } = useTranslation();
  const {
    value
  } = useContext(FilterContext);
  return /*#__PURE__*/React__default.createElement(Card, {
    style: {
      flexBasis: "100%"
    },
    className: "summary-card-margin"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "summary-wrapper"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "wrapper-child fullWidth"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "blocks"
  }, /*#__PURE__*/React__default.createElement("p", null, t(data === null || data === void 0 ? void 0 : data.name), " ", /*#__PURE__*/React__default.createElement("span", {
    style: {
      whiteSpace: "pre"
    }
  }, " (", t(`DSS_${Digit.Utils.locale.getTransformedLocale(value === null || value === void 0 ? void 0 : value.denomination)}`), ")"))), /*#__PURE__*/React__default.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between"
    }
  }, data.charts.map((chart, key) => {
    var _data$ref;
    return /*#__PURE__*/React__default.createElement(Chart, {
      data: chart,
      key: key,
      url: data === null || data === void 0 ? void 0 : (_data$ref = data.ref) === null || _data$ref === void 0 ? void 0 : _data$ref.url
    });
  })))));
};

let index = 1;
const showCustomLabel = (title, t) => {
  switch (title) {
    case "DSS_FSM_MONTHLY_WASTE_CAL":
      return `${t("DSS_WASTE_RECIEVED")} ${t(`DSS_WASTE_UNIT`)}`;
    default:
      return "";
  }
};
const Layout = ({
  rowData,
  forHome: _forHome = false,
  services,
  configName
}) => {
  var _services$filter, _services$filter$;
  const {
    t
  } = useTranslation();
  const {
    value
  } = useContext(FilterContext);
  const [searchQuery, onSearch] = useState("");
  const [chip, updateChip] = useState({});
  const moduleCode = (_services$filter = services.filter(e => configName === null || configName === void 0 ? void 0 : configName.includes(e.name))) === null || _services$filter === void 0 ? void 0 : (_services$filter$ = _services$filter[0]) === null || _services$filter$ === void 0 ? void 0 : _services$filter$.code;
  const renderChart = (chart, title, moduleCode) => {
    switch (chart.chartType) {
      case "table":
        return /*#__PURE__*/React__default.createElement(CustomTable, {
          data: chart,
          onSearch: searchQuery,
          chip: chip,
          title: title,
          moduleCode: moduleCode
        });
      case "donut":
        return /*#__PURE__*/React__default.createElement(CustomPieChart, {
          data: chart,
          title: title,
          moduleCode: moduleCode
        });
      case "line":
        return /*#__PURE__*/React__default.createElement(CustomAreaChart, {
          data: chart,
          title: title,
          moduleCode: moduleCode
        });
      case "horizontalBar":
        return /*#__PURE__*/React__default.createElement(CustomHorizontalBarChart, {
          data: chart,
          xAxisType: "number",
          yAxisType: "category",
          layout: "vertical",
          yDataKey: "name",
          xDataKey: "",
          showDrillDown: false,
          title: title,
          moduleCode: moduleCode
        });
      case "bar":
        return /*#__PURE__*/React__default.createElement(CustomHorizontalBarChart, {
          data: chart,
          title: title,
          yAxisLabel: showCustomLabel(title, t),
          moduleCode: moduleCode
        });
      default:
        return null;
    }
  };
  const renderVisualizer = (visualizer, key, chip, onChipChange, moduleCode = "") => {
    var _value$filters, _value$filters$tenant, _visualizer$charts, _visualizer$charts2, _visualizer$charts3, _chip$filter, _chip$filter$, _visualizer$charts4, _visualizer$charts5, _visualizer$charts6, _visualizer$charts7, _chip$filter2, _chip$filter2$, _value$filters2, _value$filters2$tenan, _visualizer$charts8, _visualizer$charts9, _visualizer$charts10, _chip$filter3, _chip$filter3$;
    switch (visualizer.vizType) {
      case "metric-collection":
        return /*#__PURE__*/React__default.createElement(GenericChart, {
          header: visualizer.name,
          className: "metricsTable",
          key: key,
          value: value
        }, /*#__PURE__*/React__default.createElement(MetricChart, {
          data: visualizer,
          moduleCode: moduleCode
        }));
      case "chart":
        if ((value === null || value === void 0 ? void 0 : (_value$filters = value.filters) === null || _value$filters === void 0 ? void 0 : (_value$filters$tenant = _value$filters.tenantId) === null || _value$filters$tenant === void 0 ? void 0 : _value$filters$tenant.length) === 0 && ((visualizer === null || visualizer === void 0 ? void 0 : (_visualizer$charts = visualizer.charts) === null || _visualizer$charts === void 0 ? void 0 : _visualizer$charts[0].id) === "fsmTopDsoByPerformance" || (visualizer === null || visualizer === void 0 ? void 0 : (_visualizer$charts2 = visualizer.charts) === null || _visualizer$charts2 === void 0 ? void 0 : _visualizer$charts2[0].id) === "fsmBottomDsoByPerformance")) return null;
        return /*#__PURE__*/React__default.createElement(GenericChart, {
          key: key,
          value: value,
          header: (visualizer === null || visualizer === void 0 ? void 0 : (_visualizer$charts3 = visualizer.charts) === null || _visualizer$charts3 === void 0 ? void 0 : _visualizer$charts3[chip ? (_chip$filter = chip.filter(ele => ele.active)) === null || _chip$filter === void 0 ? void 0 : (_chip$filter$ = _chip$filter[0]) === null || _chip$filter$ === void 0 ? void 0 : _chip$filter$.index : 0].chartType) === "line" ? `${visualizer.name}` : visualizer.name,
          chip: chip,
          updateChip: onChipChange,
          showDownload: (visualizer === null || visualizer === void 0 ? void 0 : (_visualizer$charts4 = visualizer.charts) === null || _visualizer$charts4 === void 0 ? void 0 : _visualizer$charts4[0].chartType) === "table",
          showSearch: (visualizer === null || visualizer === void 0 ? void 0 : (_visualizer$charts5 = visualizer.charts) === null || _visualizer$charts5 === void 0 ? void 0 : _visualizer$charts5[0].chartType) === "table",
          className: (visualizer === null || visualizer === void 0 ? void 0 : (_visualizer$charts6 = visualizer.charts) === null || _visualizer$charts6 === void 0 ? void 0 : _visualizer$charts6[0].chartType) === "table" && "fullWidth",
          onChange: e => onSearch(e.target.value)
        }, renderChart(visualizer === null || visualizer === void 0 ? void 0 : (_visualizer$charts7 = visualizer.charts) === null || _visualizer$charts7 === void 0 ? void 0 : _visualizer$charts7[chip ? (_chip$filter2 = chip.filter(ele => ele.active)) === null || _chip$filter2 === void 0 ? void 0 : (_chip$filter2$ = _chip$filter2[0]) === null || _chip$filter2$ === void 0 ? void 0 : _chip$filter2$.index : 0], visualizer.name, moduleCode));
      case "performing-metric":
        if ((value === null || value === void 0 ? void 0 : (_value$filters2 = value.filters) === null || _value$filters2 === void 0 ? void 0 : (_value$filters2$tenan = _value$filters2.tenantId) === null || _value$filters2$tenan === void 0 ? void 0 : _value$filters2$tenan.length) > 0 && ((visualizer === null || visualizer === void 0 ? void 0 : (_visualizer$charts8 = visualizer.charts) === null || _visualizer$charts8 === void 0 ? void 0 : _visualizer$charts8[0].id) === "fsmTopUlbByPerformance" || (visualizer === null || visualizer === void 0 ? void 0 : (_visualizer$charts9 = visualizer.charts) === null || _visualizer$charts9 === void 0 ? void 0 : _visualizer$charts9[0].id) === "fsmBottomUlbByPerformance")) return null;
        return /*#__PURE__*/React__default.createElement(GenericChart, {
          value: value,
          header: visualizer.name,
          subHeader: `(${t(`SUB_${visualizer.name}`)})`,
          key: key,
          chip: chip,
          updateChip: onChipChange
        }, /*#__PURE__*/React__default.createElement(CustomBarChart, {
          moduleCode: moduleCode,
          data: visualizer === null || visualizer === void 0 ? void 0 : (_visualizer$charts10 = visualizer.charts) === null || _visualizer$charts10 === void 0 ? void 0 : _visualizer$charts10[chip ? (_chip$filter3 = chip.filter(ele => ele.active)) === null || _chip$filter3 === void 0 ? void 0 : (_chip$filter3$ = _chip$filter3[0]) === null || _chip$filter3$ === void 0 ? void 0 : _chip$filter3$.index : 0],
          fillColor: index++ % 2 ? "RED" : "GREEN",
          title: visualizer.name,
          showDrillDown: true
        }));
      case "collection":
      case "module":
        return /*#__PURE__*/React__default.createElement(Summary, {
          header: visualizer.name,
          className: "metricsTable",
          key: key,
          value: value,
          data: visualizer
        });
      default:
        return null;
    }
  };
  useEffect(() => {
    let chipData = {};
    rowData.vizArray.map(chart => {
      var _chart$charts;
      if ((chart === null || chart === void 0 ? void 0 : (_chart$charts = chart.charts) === null || _chart$charts === void 0 ? void 0 : _chart$charts.length) > 1) {
        chipData[chart.name] = chart.charts.map((ele, ind) => ({
          tabName: ele.tabName,
          active: ind === 0,
          index: ind
        }));
      }
    });
    updateChip({
      ...chipData
    });
  }, []);
  return /*#__PURE__*/React__default.createElement("div", {
    className: "chart-row"
  }, rowData.vizArray.map(useCallback((chart, key) => {
    let chipData = chip === null || chip === void 0 ? void 0 : chip[chart.name];
    let onChipChange = index => updateChip(oldState => {
      let prevChip = oldState[chart.name];
      oldState[chart.name] = prevChip.map(ele => ({
        ...ele,
        active: ele.index === index
      }));
      return {
        ...oldState
      };
    });
    return renderVisualizer(chart, key, chipData, onChipChange, moduleCode);
  }, [renderVisualizer, chip])));
};

const key = "DSS_FILTERS";
const getInitialRange = () => {
  var _data$range, _data$range2, _data$range3, _data$range4, _data$filters;
  const data = Digit.SessionStorage.get(key);
  const startDate = data !== null && data !== void 0 && (_data$range = data.range) !== null && _data$range !== void 0 && _data$range.startDate ? new Date(data === null || data === void 0 ? void 0 : (_data$range2 = data.range) === null || _data$range2 === void 0 ? void 0 : _data$range2.startDate) : Digit.Utils.dss.getDefaultFinacialYear().startDate;
  const endDate = data !== null && data !== void 0 && (_data$range3 = data.range) !== null && _data$range3 !== void 0 && _data$range3.endDate ? new Date(data === null || data === void 0 ? void 0 : (_data$range4 = data.range) === null || _data$range4 === void 0 ? void 0 : _data$range4.endDate) : Digit.Utils.dss.getDefaultFinacialYear().endDate;
  const title = `${format(startDate, "MMM d, yyyy")} - ${format(endDate, "MMM d, yyyy")}`;
  const interval = Digit.Utils.dss.getDuration(startDate, endDate);
  const denomination = (data === null || data === void 0 ? void 0 : data.denomination) || "Lac";
  const tenantId = (data === null || data === void 0 ? void 0 : (_data$filters = data.filters) === null || _data$filters === void 0 ? void 0 : _data$filters.tenantId) || [];
  const moduleLevel = (data === null || data === void 0 ? void 0 : data.moduleLevel) || "";
  return {
    startDate,
    endDate,
    title,
    interval,
    denomination,
    tenantId,
    moduleLevel
  };
};
const DashBoard = ({
  stateCode
}) => {
  var _dashboardConfig$2, _dashboardConfig$2$vi, _dashboardConfig$5, _dashboardConfig$6, _dashboardConfig$7, _filters$filters5, _filters$filters5$ten, _filters$filters6, _filters$filters7, _filters$filters7$ten, _filters$filters8, _filters$filters8$sta, _filters$filters9, _filters$filters10, _filters$filters10$st, _filters$filters11, _filters$filters11$ul, _filters$filters12, _filters$filters13, _filters$filters13$ul, _filters$moduleLevel, _dashboardConfig$8;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const {
    t
  } = useTranslation();
  const [filters, setFilters] = useState(() => {
    const {
      startDate,
      endDate,
      title,
      interval,
      denomination,
      tenantId,
      moduleLevel
    } = getInitialRange();
    return {
      denomination,
      range: {
        startDate,
        endDate,
        title,
        interval
      },
      requestDate: {
        startDate: startDate.getTime(),
        endDate: endDate.getTime(),
        interval: interval,
        title: title
      },
      filters: {
        tenantId
      },
      moduleLevel: moduleLevel
    };
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const isNational = checkCurrentScreen();
  const {
    moduleCode
  } = useParams();
  const language = Digit.StoreData.getCurrentLanguage();
  const {
    isLoading: localizationLoading,
    data: store
  } = Digit.Services.useStore({
    stateCode,
    moduleCode,
    language
  });
  const {
    data: screenConfig,
    isLoading: isServicesLoading
  } = Digit.Hooks.dss.useMDMS(stateCode, "dss-dashboard", "DssDashboard", {
    select: data => {
      let screenConfig = data === null || data === void 0 ? void 0 : data["dss-dashboard"]["dashboard-config"][0].MODULE_LEVEL;
      let reduced_array = [];
      for (let i = 0; i < screenConfig.length; i++) {
        if (screenConfig[i].dashboard !== null) {
          reduced_array.push(screenConfig[i]);
        }
      }
      const serviceJS = reduced_array.map((obj, idx) => {
        return {
          code: obj[Object.keys(obj)[0]].filterKey,
          name: Digit.Utils.locale.getTransformedLocale(`DSS_${obj[Object.keys(obj)[0]].services_name}`)
        };
      });
      return serviceJS;
    }
  });
  const {
    data: nationalInfo,
    isLoadingNAT
  } = Digit.Hooks.dss.useMDMS(stateCode, "tenant", ["nationalInfo"], {
    select: data => {
      var _data$tenant;
      let nationalInfo = (data === null || data === void 0 ? void 0 : (_data$tenant = data.tenant) === null || _data$tenant === void 0 ? void 0 : _data$tenant.nationalInfo) || [];
      let combinedResult = nationalInfo.reduce((acc, curr) => {
        if (acc[curr.stateCode]) {
          acc[curr.stateCode].push(curr);
        } else {
          acc[curr.stateCode] = [curr];
        }
        return {
          ...acc
        };
      }, {});
      let formattedResponse = {
        ddr: [],
        ulb: []
      };
      Object.keys(combinedResult).map(key => {
        var _combinedResult$key;
        let stateName = (_combinedResult$key = combinedResult[key]) === null || _combinedResult$key === void 0 ? void 0 : _combinedResult$key[0].stateName;
        formattedResponse.ddr.push({
          code: key,
          ddrKey: stateName,
          ulbKey: stateName
        });
        formattedResponse.ulb.push(...combinedResult[key].map(e => ({
          code: e.code,
          ulbKey: e.name,
          ddrKey: e.stateName
        })));
      });
      return formattedResponse;
    },
    enabled: isNational
  });
  const {
    data: response,
    isLoading
  } = Digit.Hooks.dss.useDashboardConfig(moduleCode);
  const {
    data: ulbTenants,
    isLoading: isUlbLoading
  } = Digit.Hooks.useModuleTenants("DSS");
  const {
    isLoading: isMdmsLoading,
    data: mdmsData
  } = Digit.Hooks.useCommonMDMS(stateCode, "FSM", "FSTPPlantInfo");
  const [showOptions, setShowOptions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [tabState, setTabState] = useState("");
  const handleFilters = data => {
    Digit.SessionStorage.set(key, data);
    setFilters(data);
  };
  const fullPageRef = useRef();
  const provided = useMemo(() => ({
    value: filters,
    setValue: handleFilters,
    ulbTenants: isNational ? nationalInfo : ulbTenants,
    fstpMdmsData: mdmsData,
    screenConfig: screenConfig
  }), [filters, isUlbLoading, isMdmsLoading, isServicesLoading]);
  const mobileView = window.Digit.Utils.browser.isMobile();
  const handlePrint = () => {
    var _dashboardConfig$;
    return Digit.Download.PDF(fullPageRef, t(dashboardConfig === null || dashboardConfig === void 0 ? void 0 : (_dashboardConfig$ = dashboardConfig[0]) === null || _dashboardConfig$ === void 0 ? void 0 : _dashboardConfig$.name));
  };
  const removeULB = id => {
    var _filters$filters;
    handleFilters({
      ...filters,
      filters: {
        ...(filters === null || filters === void 0 ? void 0 : filters.filters),
        tenantId: [...(filters === null || filters === void 0 ? void 0 : (_filters$filters = filters.filters) === null || _filters$filters === void 0 ? void 0 : _filters$filters.tenantId)].filter((tenant, index) => index !== id)
      }
    });
  };
  const removeST = id => {
    var _filters$filters2, _filters$filters3;
    let newStates = [...(filters === null || filters === void 0 ? void 0 : (_filters$filters2 = filters.filters) === null || _filters$filters2 === void 0 ? void 0 : _filters$filters2.state)].filter((tenant, index) => index !== id);
    let newUlbs = (filters === null || filters === void 0 ? void 0 : (_filters$filters3 = filters.filters) === null || _filters$filters3 === void 0 ? void 0 : _filters$filters3.ulb) || [];
    if ((newStates === null || newStates === void 0 ? void 0 : newStates.length) == 0) {
      newUlbs = [];
    } else {
      var _nationalInfo$ulb, _nationalInfo$ulb$fil;
      let filteredUlbs = nationalInfo === null || nationalInfo === void 0 ? void 0 : (_nationalInfo$ulb = nationalInfo.ulb) === null || _nationalInfo$ulb === void 0 ? void 0 : (_nationalInfo$ulb$fil = _nationalInfo$ulb.filter(e => Digit.Utils.dss.getCitiesAvailable(e, newStates))) === null || _nationalInfo$ulb$fil === void 0 ? void 0 : _nationalInfo$ulb$fil.map(ulbs => ulbs === null || ulbs === void 0 ? void 0 : ulbs.code);
      newUlbs = newUlbs.filter(ulb => filteredUlbs.includes(ulb));
    }
    handleFilters({
      ...filters,
      filters: {
        ...(filters === null || filters === void 0 ? void 0 : filters.filters),
        state: newStates,
        ulb: newUlbs
      }
    });
  };
  const removeService = () => {
    handleFilters({
      ...filters,
      moduleLevel: ""
    });
  };
  const removeTenant = id => {
    var _filters$filters4;
    handleFilters({
      ...filters,
      filters: {
        ...(filters === null || filters === void 0 ? void 0 : filters.filters),
        ulb: [...(filters === null || filters === void 0 ? void 0 : (_filters$filters4 = filters.filters) === null || _filters$filters4 === void 0 ? void 0 : _filters$filters4.ulb)].filter((tenant, index) => index !== id)
      }
    });
  };
  const handleClear = () => {
    handleFilters({
      ...filters,
      filters: {
        ...(filters === null || filters === void 0 ? void 0 : filters.filters),
        tenantId: []
      }
    });
  };
  const clearAllTn = () => {
    handleFilters({
      ...filters,
      filters: {
        ...(filters === null || filters === void 0 ? void 0 : filters.filters),
        ulb: []
      }
    });
  };
  const clearAllSt = () => {
    handleFilters({
      ...filters,
      filters: {
        ...(filters === null || filters === void 0 ? void 0 : filters.filters),
        state: [],
        ulb: []
      }
    });
  };
  const clearAllServices = () => {
    handleFilters({
      ...filters,
      moduleLevel: ""
    });
  };
  const dashboardConfig = response === null || response === void 0 ? void 0 : response.responseData;
  let tabArrayObj = (dashboardConfig === null || dashboardConfig === void 0 ? void 0 : (_dashboardConfig$2 = dashboardConfig[0]) === null || _dashboardConfig$2 === void 0 ? void 0 : (_dashboardConfig$2$vi = _dashboardConfig$2.visualizations) === null || _dashboardConfig$2$vi === void 0 ? void 0 : _dashboardConfig$2$vi.reduce((curr, acc) => {
    curr[acc.name] = 0;
    return {
      ...curr
    };
  }, {})) || {};
  let tabArray = Object.keys(tabArrayObj).map(key => key);
  useEffect(() => {
    if ((tabArray === null || tabArray === void 0 ? void 0 : tabArray.length) > 0 && tabState == "") {
      setTabState(tabArray[0]);
    }
  }, [tabArray]);
  const shareOptions = [{
    icon: /*#__PURE__*/React__default.createElement(EmailIcon, null),
    label: t("ES_DSS_SHARE_IMAGE"),
    onClick: () => {
      setShowOptions(!showOptions);
      setTimeout(() => {
        var _dashboardConfig$3;
        return Digit.ShareFiles.DownloadImage(tenantId, fullPageRef, t(dashboardConfig === null || dashboardConfig === void 0 ? void 0 : (_dashboardConfig$3 = dashboardConfig[0]) === null || _dashboardConfig$3 === void 0 ? void 0 : _dashboardConfig$3.name), "mail");
      }, 500);
    }
  }, {
    icon: /*#__PURE__*/React__default.createElement(WhatsappIcon, null),
    label: t("ES_DSS_SHARE_IMAGE"),
    onClick: () => {
      setShowOptions(!showOptions);
      setTimeout(() => {
        var _dashboardConfig$4;
        return Digit.ShareFiles.DownloadImage(tenantId, fullPageRef, t(dashboardConfig === null || dashboardConfig === void 0 ? void 0 : (_dashboardConfig$4 = dashboardConfig[0]) === null || _dashboardConfig$4 === void 0 ? void 0 : _dashboardConfig$4.name), "whatsapp");
      }, 500);
    }
  }];
  if (isLoading || isUlbLoading || localizationLoading || isMdmsLoading || isLoadingNAT || isServicesLoading) {
    return /*#__PURE__*/React__default.createElement(Loader, null);
  }
  return /*#__PURE__*/React__default.createElement(FilterContext.Provider, {
    value: provided
  }, /*#__PURE__*/React__default.createElement("div", {
    ref: fullPageRef,
    id: "divToPrint"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "options"
  }, /*#__PURE__*/React__default.createElement(Header, {
    styles: mobileView ? {
      marginLeft: "0px",
      whiteSpace: "pre-line"
    } : {
      marginBottom: "0px",
      whiteSpace: "pre"
    }
  }, t(dashboardConfig === null || dashboardConfig === void 0 ? void 0 : (_dashboardConfig$5 = dashboardConfig[0]) === null || _dashboardConfig$5 === void 0 ? void 0 : _dashboardConfig$5.name)), mobileView ? null : /*#__PURE__*/React__default.createElement("div", {
    className: "divToBeHidden"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "mrlg divToBeHidden"
  }, /*#__PURE__*/React__default.createElement(MultiLink, {
    className: "multilink-block-wrapper divToBeHidden",
    label: t(`ES_DSS_SHARE`),
    icon: /*#__PURE__*/React__default.createElement(ShareIcon, {
      className: "mrsm"
    }),
    onHeadClick: e => {
      setShowOptions(!showOptions);
    },
    displayOptions: showOptions,
    options: shareOptions
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "mrsm divToBeHidden",
    onClick: handlePrint
  }, /*#__PURE__*/React__default.createElement(DownloadIcon, {
    className: "mrsm divToBeHidden"
  }), t(`ES_DSS_DOWNLOAD`)))), isNational ? /*#__PURE__*/React__default.createElement(Filters$1, {
    t: t,
    ulbTenants: nationalInfo,
    isOpen: isFilterModalOpen,
    closeFilters: () => setIsFilterModalOpen(false),
    isNational: isNational
  }) : /*#__PURE__*/React__default.createElement(Filters, {
    t: t,
    showModuleFilter: !isNational && dashboardConfig !== null && dashboardConfig !== void 0 && (_dashboardConfig$6 = dashboardConfig[0]) !== null && _dashboardConfig$6 !== void 0 && _dashboardConfig$6.name.includes("OVERVIEW") ? true : false,
    services: screenConfig,
    ulbTenants: isNational ? nationalInfo : ulbTenants,
    isOpen: isFilterModalOpen,
    closeFilters: () => setIsFilterModalOpen(false),
    isNational: isNational,
    showDateRange: dashboardConfig !== null && dashboardConfig !== void 0 && (_dashboardConfig$7 = dashboardConfig[0]) !== null && _dashboardConfig$7 !== void 0 && _dashboardConfig$7.name.includes("DSS_FINANCE_DASHBOARD") ? false : true
  }), (filters === null || filters === void 0 ? void 0 : (_filters$filters5 = filters.filters) === null || _filters$filters5 === void 0 ? void 0 : (_filters$filters5$ten = _filters$filters5.tenantId) === null || _filters$filters5$ten === void 0 ? void 0 : _filters$filters5$ten.length) > 0 && /*#__PURE__*/React__default.createElement("div", {
    className: "tag-container"
  }, !showFilters && (filters === null || filters === void 0 ? void 0 : (_filters$filters6 = filters.filters) === null || _filters$filters6 === void 0 ? void 0 : _filters$filters6.tenantId) && filters.filters.tenantId.slice(0, 5).map((filter, id) => /*#__PURE__*/React__default.createElement(RemoveableTag, {
    key: id,
    text: `${t(`DSS_HEADER_ULB`)}: ${t(filter)}`,
    onClick: () => removeULB(id)
  })), (filters === null || filters === void 0 ? void 0 : (_filters$filters7 = filters.filters) === null || _filters$filters7 === void 0 ? void 0 : (_filters$filters7$ten = _filters$filters7.tenantId) === null || _filters$filters7$ten === void 0 ? void 0 : _filters$filters7$ten.length) > 6 && /*#__PURE__*/React__default.createElement(Fragment$1, null, showFilters && filters.filters.tenantId.map((filter, id) => /*#__PURE__*/React__default.createElement(RemoveableTag, {
    key: id,
    text: `${t(`DSS_HEADER_ULB`)}: ${t(filter)}`,
    onClick: () => removeULB(id)
  })), !showFilters && /*#__PURE__*/React__default.createElement("p", {
    className: "clearText cursorPointer",
    onClick: () => setShowFilters(true)
  }, t(`DSS_FILTER_SHOWALL`)), showFilters && /*#__PURE__*/React__default.createElement("p", {
    className: "clearText cursorPointer",
    onClick: () => setShowFilters(false)
  }, t(`DSS_FILTER_SHOWLESS`))), /*#__PURE__*/React__default.createElement("p", {
    className: "clearText cursorPointer",
    onClick: handleClear
  }, t(`DSS_FILTER_CLEAR`))), (filters === null || filters === void 0 ? void 0 : (_filters$filters8 = filters.filters) === null || _filters$filters8 === void 0 ? void 0 : (_filters$filters8$sta = _filters$filters8.state) === null || _filters$filters8$sta === void 0 ? void 0 : _filters$filters8$sta.length) > 0 && /*#__PURE__*/React__default.createElement("div", {
    className: "tag-container"
  }, !showFilters && (filters === null || filters === void 0 ? void 0 : (_filters$filters9 = filters.filters) === null || _filters$filters9 === void 0 ? void 0 : _filters$filters9.state) && filters.filters.state.slice(0, 5).map((filter, id) => /*#__PURE__*/React__default.createElement(RemoveableTag, {
    key: id,
    text: `${t(`DSS_HEADER_STATE`)}: ${t(`DSS_TB_${Digit.Utils.locale.getTransformedLocale(filter)}`)}`,
    onClick: () => removeST(id)
  })), (filters === null || filters === void 0 ? void 0 : (_filters$filters10 = filters.filters) === null || _filters$filters10 === void 0 ? void 0 : (_filters$filters10$st = _filters$filters10.state) === null || _filters$filters10$st === void 0 ? void 0 : _filters$filters10$st.length) > 6 && /*#__PURE__*/React__default.createElement(Fragment$1, null, showFilters && filters.filters.state.map((filter, id) => /*#__PURE__*/React__default.createElement(RemoveableTag, {
    key: id,
    text: `${t(`DSS_HEADER_STATE`)}: ${t(`DSS_TB_${Digit.Utils.locale.getTransformedLocale(filter)}`)}`,
    onClick: () => removeST(id)
  })), !showFilters && /*#__PURE__*/React__default.createElement("p", {
    className: "clearText cursorPointer",
    onClick: () => setShowFilters(true)
  }, t(`DSS_FILTER_SHOWALL`)), showFilters && /*#__PURE__*/React__default.createElement("p", {
    className: "clearText cursorPointer",
    onClick: () => setShowFilters(false)
  }, t(`DSS_FILTER_SHOWLESS`))), /*#__PURE__*/React__default.createElement("p", {
    className: "clearText cursorPointer",
    onClick: clearAllSt
  }, t(`DSS_FILTER_CLEAR_ST`))), (filters === null || filters === void 0 ? void 0 : (_filters$filters11 = filters.filters) === null || _filters$filters11 === void 0 ? void 0 : (_filters$filters11$ul = _filters$filters11.ulb) === null || _filters$filters11$ul === void 0 ? void 0 : _filters$filters11$ul.length) > 0 && /*#__PURE__*/React__default.createElement("div", {
    className: "tag-container"
  }, !showFilters && (filters === null || filters === void 0 ? void 0 : (_filters$filters12 = filters.filters) === null || _filters$filters12 === void 0 ? void 0 : _filters$filters12.ulb) && filters.filters.ulb.slice(0, 5).map((filter, id) => /*#__PURE__*/React__default.createElement(RemoveableTag, {
    key: id,
    text: `${t(`DSS_HEADER_ULB`)}: ${t(`DSS_TB_${Digit.Utils.locale.getTransformedLocale(filter)}`)}`,
    onClick: () => removeTenant(id)
  })), (filters === null || filters === void 0 ? void 0 : (_filters$filters13 = filters.filters) === null || _filters$filters13 === void 0 ? void 0 : (_filters$filters13$ul = _filters$filters13.ulb) === null || _filters$filters13$ul === void 0 ? void 0 : _filters$filters13$ul.length) > 6 && /*#__PURE__*/React__default.createElement(Fragment$1, null, showFilters && filters.filters.ulb.map((filter, id) => /*#__PURE__*/React__default.createElement(RemoveableTag, {
    key: id,
    text: `${t(`DSS_HEADER_ULB`)}: ${t(`DSS_TB_${Digit.Utils.locale.getTransformedLocale(filter)}`)}`,
    onClick: () => removeTenant(id)
  })), !showFilters && /*#__PURE__*/React__default.createElement("p", {
    className: "clearText cursorPointer",
    onClick: () => setShowFilters(true)
  }, t(`DSS_FILTER_SHOWALL`)), showFilters && /*#__PURE__*/React__default.createElement("p", {
    className: "clearText cursorPointer",
    onClick: () => setShowFilters(false)
  }, t(`DSS_FILTER_SHOWLESS`))), /*#__PURE__*/React__default.createElement("p", {
    className: "clearText cursorPointer",
    onClick: clearAllTn
  }, t(`DSS_FILTER_CLEAR_TN`))), (filters === null || filters === void 0 ? void 0 : (_filters$moduleLevel = filters.moduleLevel) === null || _filters$moduleLevel === void 0 ? void 0 : _filters$moduleLevel.length) > 0 && /*#__PURE__*/React__default.createElement("div", {
    className: "tag-container"
  }, !showFilters && (filters === null || filters === void 0 ? void 0 : filters.moduleLevel) && /*#__PURE__*/React__default.createElement(RemoveableTag, {
    key: filters === null || filters === void 0 ? void 0 : filters.moduleLevel,
    text: `${t(`DSS_HEADER_SERVICE`)}: ${t(filters === null || filters === void 0 ? void 0 : filters.moduleLevel)}`,
    onClick: () => removeService()
  }), /*#__PURE__*/React__default.createElement("p", {
    className: "clearText cursorPointer",
    onClick: clearAllServices
  }, t(`DSS_FILTER_CLEAR`))), mobileView ? /*#__PURE__*/React__default.createElement("div", {
    className: "options-m"
  }, /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(FilterIcon, {
    onClick: () => setIsFilterModalOpen(!isFilterModalOpen),
    style: true
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "divToBeHidden"
  }, /*#__PURE__*/React__default.createElement(MultiLink, {
    className: "multilink-block-wrapper",
    label: t(`ES_DSS_SHARE`),
    icon: /*#__PURE__*/React__default.createElement(ShareIcon, {
      className: "mrsm"
    }),
    onHeadClick: e => {
      setShowOptions(!showOptions);
    },
    displayOptions: showOptions,
    options: shareOptions
  })), /*#__PURE__*/React__default.createElement("div", {
    onClick: handlePrint,
    className: "divToBeHidden"
  }, /*#__PURE__*/React__default.createElement(DownloadIcon, null), t(`ES_DSS_DOWNLOAD`))) : null, /*#__PURE__*/React__default.createElement("div", null, tabArray && (tabArray === null || tabArray === void 0 ? void 0 : tabArray.length) > 1 && /*#__PURE__*/React__default.createElement("div", {
    className: "dss-switch-tabs chart-row"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "dss-switch-tab-wrapper"
  }, tabArray === null || tabArray === void 0 ? void 0 : tabArray.map(key => /*#__PURE__*/React__default.createElement("div", {
    className: tabState === key ? "dss-switch-tab-selected" : "dss-switch-tab-unselected",
    onClick: () => setTabState(key)
  }, t(key)))))), dashboardConfig === null || dashboardConfig === void 0 ? void 0 : (_dashboardConfig$8 = dashboardConfig[0]) === null || _dashboardConfig$8 === void 0 ? void 0 : _dashboardConfig$8.visualizations.filter(row => row.name === tabState).map((row, key) => {
    var _dashboardConfig$9;
    return /*#__PURE__*/React__default.createElement(Layout, {
      rowData: row,
      key: key,
      services: screenConfig,
      configName: dashboardConfig === null || dashboardConfig === void 0 ? void 0 : (_dashboardConfig$9 = dashboardConfig[0]) === null || _dashboardConfig$9 === void 0 ? void 0 : _dashboardConfig$9.name
    });
  })));
};

var _path;
function _extends$2() {
  _extends$2 = Object.assign ? Object.assign.bind() : function (target) {
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
  return _extends$2.apply(this, arguments);
}
function SvgPropertyTax(props) {
  return /*#__PURE__*/createElement("svg", _extends$2({
    width: 41,
    height: 35,
    viewBox: "-5 -2 51 40",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path || (_path = /*#__PURE__*/createElement("path", {
    d: "M16.4 34.85v-12.3h8.2v12.3h10.25v-16.4H41L20.5 0 0 18.45h6.15v16.4H16.4z",
    fill: "#fff"
  })));
}

var _g$2, _defs;
function _extends$3() {
  _extends$3 = Object.assign ? Object.assign.bind() : function (target) {
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
  return _extends$3.apply(this, arguments);
}
function SvgDashboards(props) {
  return /*#__PURE__*/createElement("svg", _extends$3({
    width: 64,
    height: 64,
    viewBox: "0 0 64 54",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _g$2 || (_g$2 = /*#__PURE__*/createElement("g", {
    filter: "url(#dashboards_svg__filter0_d_28723_79449)"
  }, /*#__PURE__*/createElement("path", {
    d: "M4 4a4 4 0 014-4h48a4 4 0 014 4v48a4 4 0 01-4 4H8a4 4 0 01-4-4V4z",
    fill: "#a82227"
  }), /*#__PURE__*/createElement("path", {
    d: "M48.333 7H15.667A4.68 4.68 0 0011 11.667v32.666A4.68 4.68 0 0015.667 49h32.666A4.68 4.68 0 0053 44.333V11.667A4.68 4.68 0 0048.333 7zM25 39.667h-4.667V23.333H25v16.334zm9.333 0h-4.666V16.333h4.666v23.334zm9.334 0H39v-9.334h4.667v9.334z",
    fill: "#fff"
  }))), _defs || (_defs = /*#__PURE__*/createElement("defs", null, /*#__PURE__*/createElement("filter", {
    id: "dashboards_svg__filter0_d_28723_79449",
    x: 0,
    y: 0,
    width: 64,
    height: 64,
    filterUnits: "userSpaceOnUse",
    colorInterpolationFilters: "sRGB"
  }, /*#__PURE__*/createElement("feFlood", {
    floodOpacity: 0,
    result: "BackgroundImageFix"
  }), /*#__PURE__*/createElement("feColorMatrix", {
    in: "SourceAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
    result: "hardAlpha"
  }), /*#__PURE__*/createElement("feOffset", {
    dy: 4
  }), /*#__PURE__*/createElement("feGaussianBlur", {
    stdDeviation: 2
  }), /*#__PURE__*/createElement("feComposite", {
    in2: "hardAlpha",
    operator: "out"
  }), /*#__PURE__*/createElement("feColorMatrix", {
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
  }), /*#__PURE__*/createElement("feBlend", {
    in2: "BackgroundImageFix",
    result: "effect1_dropShadow_28723_79449"
  }), /*#__PURE__*/createElement("feBlend", {
    in: "SourceGraphic",
    in2: "effect1_dropShadow_28723_79449",
    result: "shape"
  })))));
}

var _path$1;
function _extends$4() {
  _extends$4 = Object.assign ? Object.assign.bind() : function (target) {
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
  return _extends$4.apply(this, arguments);
}
function SvgComplaints(props) {
  return /*#__PURE__*/createElement("svg", _extends$4({
    width: 41,
    height: 35,
    viewBox: "-8 -2 51 40",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$1 || (_path$1 = /*#__PURE__*/createElement("path", {
    d: "M31.168.75H3.835c-1.88 0-3.4 1.688-3.4 3.75L.418 38.25l6.833-7.5h23.917c1.88 0 3.417-1.688 3.417-3.75V4.5c0-2.063-1.538-3.75-3.417-3.75zM19.21 17.625h-3.417V6.375h3.417v11.25zm0 7.5h-3.417v-3.75h3.417v3.75z",
    fill: "#fff"
  })));
}

var _path$2;
function _extends$5() {
  _extends$5 = Object.assign ? Object.assign.bind() : function (target) {
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
  return _extends$5.apply(this, arguments);
}
function SvgWaterSewerage(props) {
  return /*#__PURE__*/createElement("svg", _extends$5({
    width: 41,
    height: 35,
    viewBox: "-10 -2 51 40",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$2 || (_path$2 = /*#__PURE__*/createElement("path", {
    d: "M23.992 11L14.457.406 4.922 11C2.294 13.925.98 17.825.98 21.575c0 3.75 1.314 7.706 3.942 10.631s6.082 4.406 9.535 4.406c3.454 0 6.907-1.48 9.535-4.406 2.628-2.925 3.942-6.881 3.942-10.631S26.62 13.925 23.992 11zM4.35 22.25c.017-3.75 1.044-6.131 2.965-8.25l7.142-8.119 7.143 8.213c1.92 2.1 2.948 4.406 2.965 8.156H4.35z",
    fill: "#fff"
  })));
}

var _path$3, _path2;
function _extends$6() {
  _extends$6 = Object.assign ? Object.assign.bind() : function (target) {
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
  return _extends$6.apply(this, arguments);
}
function SvgFsm(props) {
  return /*#__PURE__*/createElement("svg", _extends$6({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "#fff",
    width: 84,
    height: 84,
    viewBox: "4 -4 15 30"
  }, props), _path$3 || (_path$3 = /*#__PURE__*/createElement("path", {
    d: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
  })), _path2 || (_path2 = /*#__PURE__*/createElement("path", {
    d: "M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
  })));
}

var _path$4;
function _extends$7() {
  _extends$7 = Object.assign ? Object.assign.bind() : function (target) {
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
  return _extends$7.apply(this, arguments);
}
function SvgFirenocdashboard(props) {
  return /*#__PURE__*/createElement("svg", _extends$7({
    width: 41,
    height: 35,
    viewBox: "-5 -2 51 40",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$4 || (_path$4 = /*#__PURE__*/createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M34.5.625h-30a3.761 3.761 0 00-3.75 3.75v26.25a3.761 3.761 0 003.75 3.75h30a3.761 3.761 0 003.75-3.75V4.375A3.761 3.761 0 0034.5.625zm-18.75 26.25H6.375v-3.75h9.375v3.75zm0-7.5H6.375v-3.75h9.375v3.75zm0-7.5H6.375v-3.75h9.375v3.75zm9.038 11.25L19.5 17.8l2.644-2.644 2.644 2.663 5.943-5.944 2.663 2.662-8.606 8.588z",
    fill: "#fff"
  })));
}

var _path$5;
function _extends$8() {
  _extends$8 = Object.assign ? Object.assign.bind() : function (target) {
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
  return _extends$8.apply(this, arguments);
}
function SvgMcollect(props) {
  return /*#__PURE__*/createElement("svg", _extends$8({
    width: 41,
    height: 35,
    viewBox: "-8 -2 51 40",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$5 || (_path$5 = /*#__PURE__*/createElement("path", {
    d: "M34.375 28.75v1.875a3.761 3.761 0 01-3.75 3.75H4.375a3.749 3.749 0 01-3.75-3.75V4.375a3.749 3.749 0 013.75-3.75h26.25a3.761 3.761 0 013.75 3.75V6.25H17.5A3.749 3.749 0 0013.75 10v15a3.749 3.749 0 003.75 3.75h16.875zM17.5 25h18.75V10H17.5v15zm7.5-4.688a2.809 2.809 0 01-2.813-2.812A2.809 2.809 0 0125 14.687a2.809 2.809 0 012.813 2.813A2.809 2.809 0 0125 20.313z",
    fill: "#fff"
  })));
}

var _path$6;
function _extends$9() {
  _extends$9 = Object.assign ? Object.assign.bind() : function (target) {
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
  return _extends$9.apply(this, arguments);
}
function SvgObps(props) {
  return /*#__PURE__*/createElement("svg", _extends$9({
    width: 41,
    height: 37,
    viewBox: "-5 -2 51 40",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$6 || (_path$6 = /*#__PURE__*/createElement("path", {
    d: "M20.501 8.708V.875H.918v35.25h39.167V8.708H20.5zm-11.75 23.5H4.835v-3.916H8.75v3.916zm0-7.833H4.835v-3.917H8.75v3.917zm0-7.833H4.835v-3.917H8.75v3.917zm0-7.834H4.835V4.792H8.75v3.916zm7.834 23.5h-3.917v-3.916h3.917v3.916zm0-7.833h-3.917v-3.917h3.917v3.917zm0-7.833h-3.917v-3.917h3.917v3.917zm0-7.834h-3.917V4.792h3.917v3.916zm19.583 23.5H20.501v-3.916h3.917v-3.917h-3.917v-3.917h3.917v-3.916h-3.917v-3.917h15.667v19.583zm-3.917-15.666h-3.916v3.916h3.916v-3.916zm0 7.833h-3.916v3.917h3.916v-3.917z",
    fill: "#fff"
  })));
}

var _path$7;
function _extends$a() {
  _extends$a = Object.assign ? Object.assign.bind() : function (target) {
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
  return _extends$a.apply(this, arguments);
}
function SvgTradeLicNurt(props) {
  return /*#__PURE__*/createElement("svg", _extends$a({
    width: 41,
    height: 35,
    viewBox: "-8 -2 51 40",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$7 || (_path$7 = /*#__PURE__*/createElement("path", {
    d: "M30.854 8.25h-6.738V4.5c0-2.081-1.5-3.75-3.37-3.75h-6.738c-1.87 0-3.37 1.669-3.37 3.75v3.75H3.9C2.03 8.25.548 9.919.548 12L.531 32.625c0 2.081 1.5 3.75 3.37 3.75h26.953c1.87 0 3.37-1.669 3.37-3.75V12c0-2.081-1.5-3.75-3.37-3.75zm-10.107 0h-6.739V4.5h6.739v3.75z",
    fill: "#fff"
  })));
}

var _path$8;
function _extends$b() {
  _extends$b = Object.assign ? Object.assign.bind() : function (target) {
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
  return _extends$b.apply(this, arguments);
}
function SvgBuildingPermission(props) {
  return /*#__PURE__*/createElement("svg", _extends$b({
    width: 41,
    height: 35,
    viewBox: "-5 -2 51 40",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$8 || (_path$8 = /*#__PURE__*/createElement("path", {
    d: "M20.501 8.708V.875H.918v35.25h39.167V8.708H20.5zm-11.75 23.5H4.835v-3.916H8.75v3.916zm0-7.833H4.835v-3.917H8.75v3.917zm0-7.833H4.835v-3.917H8.75v3.917zm0-7.834H4.835V4.792H8.75v3.916zm7.834 23.5h-3.917v-3.916h3.917v3.916zm0-7.833h-3.917v-3.917h3.917v3.917zm0-7.833h-3.917v-3.917h3.917v3.917zm0-7.834h-3.917V4.792h3.917v3.916zm19.583 23.5H20.501v-3.916h3.917v-3.917h-3.917v-3.917h3.917v-3.916h-3.917v-3.917h15.667v19.583zm-3.917-15.666h-3.916v3.916h3.916v-3.916zm0 7.833h-3.916v3.917h3.916v-3.917z",
    fill: "#fff"
  })));
}

var _path$9;
function _extends$c() {
  _extends$c = Object.assign ? Object.assign.bind() : function (target) {
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
  return _extends$c.apply(this, arguments);
}
function SvgBirthDeath(props) {
  return /*#__PURE__*/createElement("svg", _extends$c({
    width: 45,
    height: 35,
    viewBox: "-8 0 51 38",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$9 || (_path$9 = /*#__PURE__*/createElement("path", {
    d: "M26.75.75H4.25A3.761 3.761 0 00.5 4.5v30a3.761 3.761 0 003.75 3.75h22.5a3.761 3.761 0 003.75-3.75v-30A3.761 3.761 0 0026.75.75zM4.25 4.5h9.375v15l-4.688-2.813L4.25 19.5v-15z",
    fill: "#fff"
  })));
}

var _path$a;
function _extends$d() {
  _extends$d = Object.assign ? Object.assign.bind() : function (target) {
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
  return _extends$d.apply(this, arguments);
}
function SvgFinance(props) {
  return /*#__PURE__*/createElement("svg", _extends$d({
    width: 34,
    height: 25,
    viewBox: "-1 0 34 22",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$a || (_path$a = /*#__PURE__*/createElement("path", {
    d: "M27.168.833H3.835A2.894 2.894 0 00.933 3.75l-.015 17.5a2.907 2.907 0 002.917 2.917h23.333a2.907 2.907 0 002.917-2.917V3.75A2.907 2.907 0 0027.168.833zm0 20.417H3.835V12.5h23.333v8.75zm0-14.583H3.835V3.75h23.333v2.917z",
    fill: "#fff"
  })));
}

function Icon(type, iconColor) {
  switch (type.toLowerCase()) {
    case 'overview':
    case 'dss_overview':
      return /*#__PURE__*/React__default.createElement(SvgDashboards, null);
    case 'fsm':
    case 'dss_fsm':
      return /*#__PURE__*/React__default.createElement("div", {
        style: {
          background: iconColor,
          width: "60 px",
          height: "52px"
        }
      }, /*#__PURE__*/React__default.createElement(SvgFsm, null));
    case 'obps dashboard':
    case 'obps dashboard':
      return /*#__PURE__*/React__default.createElement("div", {
        style: {
          background: iconColor,
          width: "60 px",
          height: "52px"
        }
      }, /*#__PURE__*/React__default.createElement(SvgObps, null));
    case 'online building plan approval system':
    case 'dss_obps_overview':
      return /*#__PURE__*/React__default.createElement("div", {
        style: {
          background: iconColor,
          width: "60 px",
          height: "52px"
        }
      }, /*#__PURE__*/React__default.createElement(SvgBuildingPermission, null));
    case 'nurt_overview':
      return /*#__PURE__*/React__default.createElement(SvgDashboards, null);
    case 'nurt_project_staus':
      return /*#__PURE__*/React__default.createElement(SvgDashboards, null);
    case 'nurt_property_tax':
    case 'dss_property_tax':
      return /*#__PURE__*/React__default.createElement("div", {
        style: {
          background: iconColor,
          width: "60 px",
          height: "52px"
        }
      }, /*#__PURE__*/React__default.createElement(SvgPropertyTax, null));
    case 'nurt_trade_licence':
    case 'dss_trade_licence':
      return /*#__PURE__*/React__default.createElement("div", {
        style: {
          background: iconColor,
          width: "60 px",
          height: "52px"
        }
      }, /*#__PURE__*/React__default.createElement(SvgTradeLicNurt, null));
    case 'nurt_complains':
    case 'dss_complains':
    case 'public grievances & redressal':
    case 'dss_pgr_overview':
      return /*#__PURE__*/React__default.createElement("div", {
        style: {
          background: iconColor,
          width: "60 px",
          height: "52px"
        }
      }, /*#__PURE__*/React__default.createElement(SvgComplaints, null));
    case 'nurt_water_sewerage':
    case 'dss_water_sewerage':
      return /*#__PURE__*/React__default.createElement("div", {
        style: {
          background: iconColor,
          width: "60 px",
          height: "52px"
        }
      }, /*#__PURE__*/React__default.createElement(SvgWaterSewerage, null));
    case 'dss_building_permission':
      return /*#__PURE__*/React__default.createElement("div", {
        style: {
          background: iconColor,
          width: "60 px",
          height: "52px"
        }
      }, /*#__PURE__*/React__default.createElement(SvgBuildingPermission, null));
    case 'nurt_firenoc':
    case 'fire noc dashboard':
    case 'fire noc':
    case 'dss_firenoc_overview':
      return /*#__PURE__*/React__default.createElement("div", {
        style: {
          background: iconColor,
          width: "60 px",
          height: "52px"
        }
      }, /*#__PURE__*/React__default.createElement(SvgFirenocdashboard, null));
    case 'nurt_mcollect':
    case 'dss_mcollect':
      return /*#__PURE__*/React__default.createElement("div", {
        style: {
          background: iconColor,
          width: "60 px",
          height: "52px"
        }
      }, /*#__PURE__*/React__default.createElement(SvgMcollect, null));
    case 'dss_finance':
      return /*#__PURE__*/React__default.createElement("div", {
        style: {
          background: iconColor,
          width: "60 px",
          height: "52px"
        }
      }, /*#__PURE__*/React__default.createElement(SvgFinance, null));
    case 'nurt_live_active_ulbs':
      return /*#__PURE__*/React__default.createElement(SvgDashboards, null);
    case 'dss_birth_death':
    case 'nss_birth_death':
    case "nurt_birth":
    case "nurt_death":
    case "nurt_bnd":
      return /*#__PURE__*/React__default.createElement("div", {
        style: {
          background: iconColor,
          width: "60 px",
          height: "52px"
        }
      }, /*#__PURE__*/React__default.createElement(SvgBirthDeath, null));
    default:
      return /*#__PURE__*/React__default.createElement("div", null);
  }
}

const PROJECTION_CONFIG = {
  scale: 320,
  center: [85.9629, 22.5937]
};
const COLOR_RANGE = ["#54D140", "#298CFF", "#a82227", "#D1D1D1"];
const STATUS = ["Live", "UnderImplementation", "OnBoarded", "None"];
const DEFAULT_COLOR = "#D1D1D1";
const key$1 = "DSS_FILTERS";
const getInitialRange$1 = () => {
  var _data$range, _data$range2, _data$range3, _data$range4, _data$filters;
  const data = Digit.SessionStorage.get(key$1);
  const startDate = data !== null && data !== void 0 && (_data$range = data.range) !== null && _data$range !== void 0 && _data$range.startDate ? new Date(data === null || data === void 0 ? void 0 : (_data$range2 = data.range) === null || _data$range2 === void 0 ? void 0 : _data$range2.startDate) : Digit.Utils.dss.getDefaultFinacialYear().startDate;
  const endDate = data !== null && data !== void 0 && (_data$range3 = data.range) !== null && _data$range3 !== void 0 && _data$range3.endDate ? new Date(data === null || data === void 0 ? void 0 : (_data$range4 = data.range) === null || _data$range4 === void 0 ? void 0 : _data$range4.endDate) : Digit.Utils.dss.getDefaultFinacialYear().endDate;
  const title = `${format(startDate, "MMM d, yyyy")} - ${format(endDate, "MMM d, yyyy")}`;
  const interval = Digit.Utils.dss.getDuration(startDate, endDate);
  const denomination = (data === null || data === void 0 ? void 0 : data.denomination) || "Lac";
  const tenantId = (data === null || data === void 0 ? void 0 : (_data$filters = data.filters) === null || _data$filters === void 0 ? void 0 : _data$filters.tenantId) || [];
  return {
    startDate,
    endDate,
    title,
    interval,
    denomination,
    tenantId
  };
};
const getColor = current => {
  const status = current && current.status;
  if (current) {
    switch (status) {
      case "Live":
        return COLOR_RANGE[0];
      case "OnBoarded":
        return COLOR_RANGE[1];
      case "UnderImplementation":
        return COLOR_RANGE[2];
      case "None":
        return DEFAULT_COLOR;
      default:
        return DEFAULT_COLOR;
    }
  }
  return DEFAULT_COLOR;
};
const geographyStyle = {
  default: {
    outline: "none",
    stroke: "white",
    strokeWidth: "0.5",
    strokeOpacity: "0.9"
  },
  hover: {
    outline: "none",
    stroke: "white",
    strokeWidth: "0.5",
    strokeOpacity: "0.9"
  },
  pressed: {
    outline: "none",
    stroke: "white",
    strokeWidth: "0.5",
    strokeOpacity: "0.9"
  }
};
const MapChart = ({
  data,
  drillDown: _drillDown = false,
  setselectedState,
  setdrilldownId,
  settotalCount,
  setliveCount
}) => {
  var _get, _response$responseDat, _response$responseDat2;
  const {
    t
  } = useTranslation();
  const {
    id
  } = data;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [tooltipContent, settooltipContent] = useState("");
  const {
    startDate,
    endDate,
    interval
  } = getInitialRange$1();
  const requestDate = {
    startDate: startDate.getTime(),
    endDate: endDate.getTime(),
    interval: interval,
    title: "home"
  };
  const {
    data: topoJSON,
    isLoading: isLoadingNAT
  } = Digit.Hooks.dss.useMDMS(Digit.ULBService.getStateId(), "dss-dashboard", ["dashboard-config"], {
    select: data => {
      var _data$dssDashboard, _data$dssDashboard$da, _data$dssDashboard$da2, _data$dssDashboard$da3;
      const topoJson = (data === null || data === void 0 ? void 0 : (_data$dssDashboard = data["dss-dashboard"]) === null || _data$dssDashboard === void 0 ? void 0 : (_data$dssDashboard$da = _data$dssDashboard["dashboard-config"]) === null || _data$dssDashboard$da === void 0 ? void 0 : (_data$dssDashboard$da2 = _data$dssDashboard$da[0]) === null || _data$dssDashboard$da2 === void 0 ? void 0 : (_data$dssDashboard$da3 = _data$dssDashboard$da2["MAP_CONFIG"]) === null || _data$dssDashboard$da3 === void 0 ? void 0 : _data$dssDashboard$da3[0]) || {};
      return topoJson;
    },
    enabled: true
  });
  const mapData = (_get = get(topoJSON, "objects.india.geometries", [])) === null || _get === void 0 ? void 0 : _get.map(ee => {
    return {
      state: ee.properties.name,
      value: 0,
      id: ee.id
    };
  });
  let DataObj = (mapData === null || mapData === void 0 ? void 0 : mapData.reduce((acc, curr) => {
    acc[curr.state] = {
      ...curr
    };
    return {
      ...acc
    };
  }, {})) || {};
  const {
    isLoading,
    data: response
  } = Digit.Hooks.dss.useGetChart({
    key: id,
    type: "metric",
    tenantId,
    requestDate: requestDate
  });
  let data1 = !isLoading ? response === null || response === void 0 ? void 0 : (_response$responseDat = response.responseData) === null || _response$responseDat === void 0 ? void 0 : (_response$responseDat2 = _response$responseDat.data) === null || _response$responseDat2 === void 0 ? void 0 : _response$responseDat2.filter(dat => {
    let totalCount = dat.plots[3].value;
    let liveCount = dat.plots[4].value;
    let live = dat.plots[4].strValue > 0 ? true : false;
    DataObj[dat.headerName] = {
      ...(DataObj === null || DataObj === void 0 ? void 0 : DataObj[dat.headerName]),
      status: dat.plots[2].strValue,
      value: live ? liveCount : totalCount,
      live,
      totalCount,
      liveCount
    };
  }) : null;
  if (!data1) {
    return /*#__PURE__*/React__default.createElement("div", null, "Loading...");
  }
  const onMouseEnter = (geo, current = {
    value: "0"
  }, event) => {
    return settooltipContent(`${t(`${geo.properties.name}`)}: ${current.value ? Number(current.value).toFixed() + " ULBs" : "NA"} `);
  };
  const onMouseClick = (geo, current = {
    value: "NA"
  }, event) => {
    var _response$responseDat3;
    if (current && current.value > 0 && current.status === "Live") setselectedState(current.state);
    setdrilldownId(response === null || response === void 0 ? void 0 : (_response$responseDat3 = response.responseData) === null || _response$responseDat3 === void 0 ? void 0 : _response$responseDat3.drillDownChartId);
    settotalCount(current.totalCount);
    setliveCount(current.liveCount);
  };
  const onMouseLeave = (geo, current = {
    value: "NA"
  }, event) => {
    settooltipContent("");
  };
  if (isLoading || isLoadingNAT) {
    return /*#__PURE__*/React__default.createElement(Loader, null);
  }
  return /*#__PURE__*/React__default.createElement(ResponsiveContainer, {
    width: "40%",
    height: 220,
    margin: {
      top: 5,
      right: 5,
      left: 5,
      bottom: 5
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React__default.createElement(ReactTooltip, null, tooltipContent), /*#__PURE__*/React__default.createElement(ComposableMap, {
    projectionConfig: PROJECTION_CONFIG,
    projection: "geoMercator",
    width: 240,
    height: 170,
    "data-tip": ""
  }, /*#__PURE__*/React__default.createElement(Geographies, {
    geography: topoJSON
  }, ({
    geographies
  }) => geographies.map(geo => {
    const current = Object.values(DataObj).find(s => s.id === geo.id);
    return /*#__PURE__*/React__default.createElement(Geography, {
      key: geo.rsmKey,
      geography: geo,
      fill: getColor(current),
      style: geographyStyle,
      onMouseEnter: event => onMouseEnter(geo, current),
      onClick: event => onMouseClick(geo, current),
      onMouseLeave: event => onMouseLeave(geo, current)
    });
  }))), /*#__PURE__*/React__default.createElement("span", {
    className: "map-status"
  }, STATUS.map(sta => {
    return /*#__PURE__*/React__default.createElement("span", {
      className: "map-row"
    }, /*#__PURE__*/React__default.createElement("span", {
      className: "map-box",
      style: {
        background: getColor({
          status: sta
        })
      }
    }), /*#__PURE__*/React__default.createElement("span", {
      className: "map-text"
    }, t(`DSS_${sta.toUpperCase()}`)));
  }))));
};

const Backsvg = ({
  onClick
}) => /*#__PURE__*/React__default.createElement("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  fill: "none",
  onClick: onClick,
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React__default.createElement("path", {
  d: "M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z",
  fill: "#0B0C0C"
}));
const key$2 = "DSS_FILTERS";
const getInitialRange$2 = () => {
  var _data$range, _data$range2, _data$range3, _data$range4, _data$filters;
  const data = Digit.SessionStorage.get(key$2);
  const startDate = data !== null && data !== void 0 && (_data$range = data.range) !== null && _data$range !== void 0 && _data$range.startDate ? new Date(data === null || data === void 0 ? void 0 : (_data$range2 = data.range) === null || _data$range2 === void 0 ? void 0 : _data$range2.startDate) : Digit.Utils.dss.getDefaultFinacialYear().startDate;
  const endDate = data !== null && data !== void 0 && (_data$range3 = data.range) !== null && _data$range3 !== void 0 && _data$range3.endDate ? new Date(data === null || data === void 0 ? void 0 : (_data$range4 = data.range) === null || _data$range4 === void 0 ? void 0 : _data$range4.endDate) : Digit.Utils.dss.getDefaultFinacialYear().endDate;
  const title = `${format(startDate, "MMM d, yyyy")} - ${format(endDate, "MMM d, yyyy")}`;
  const interval = Digit.Utils.dss.getDuration(startDate, endDate);
  const denomination = (data === null || data === void 0 ? void 0 : data.denomination) || "Lac";
  const tenantId = (data === null || data === void 0 ? void 0 : (_data$filters = data.filters) === null || _data$filters === void 0 ? void 0 : _data$filters.tenantId) || [];
  return {
    startDate,
    endDate,
    title,
    interval,
    denomination,
    tenantId
  };
};
const MapDrillChart = ({
  data,
  drilldown: _drilldown = true,
  selectedState,
  setselectedState,
  drilldownId,
  setdrilldownId,
  setTotalCount,
  setLiveCount
}) => {
  var _response$responseDat;
  const {
    t
  } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  let filters = {};
  if (selectedState != "") {
    filters.state = selectedState;
  }
  filters = {
    ...filters
  };
  const {
    startDate,
    endDate,
    interval
  } = getInitialRange$2();
  const requestDate = {
    startDate: startDate.getTime(),
    endDate: endDate.getTime(),
    interval: interval,
    title: "home"
  };
  const {
    isLoading,
    data: response
  } = Digit.Hooks.dss.useGetChart({
    key: drilldownId,
    type: "metric",
    tenantId,
    requestDate: requestDate,
    filters: filters
  });
  const onBack = selectedState => {
    setselectedState("");
    setdrilldownId("none");
    setTotalCount("");
    setLiveCount("");
  };
  if (isLoading) {
    return /*#__PURE__*/React__default.createElement(Loader, null);
  }
  const data2 = response === null || response === void 0 ? void 0 : (_response$responseDat = response.responseData) === null || _response$responseDat === void 0 ? void 0 : _response$responseDat.data;
  return /*#__PURE__*/React__default.createElement(ResponsiveContainer, {
    width: "50%",
    height: 240,
    margin: {
      top: 5,
      right: 5,
      left: 5,
      bottom: 5
    }
  }, /*#__PURE__*/React__default.createElement("div", null, " ", /*#__PURE__*/React__default.createElement("div", {
    style: {
      float: "left"
    }
  }, /*#__PURE__*/React__default.createElement(Backsvg, {
    onClick: onBack
  })), data2 && data2.length == 0 && /*#__PURE__*/React__default.createElement("div", {
    style: {
      paddingTop: "60px"
    }
  }, t("DSS_NO_DATA")), data2 && data2[0] && /*#__PURE__*/React__default.createElement("span", {
    className: "tab-rows tab-header"
  }, /*#__PURE__*/React__default.createElement("span", null, t(`DSS_${data2[0].plots[1].name}`)), /*#__PURE__*/React__default.createElement("span", null, t(`DSS_${data2[0].plots[2].name}`))), data2.map((dat, i) => {
    return /*#__PURE__*/React__default.createElement("span", {
      className: "tab-rows",
      style: {
        background: i % 2 == 0 ? "none" : "#EEEEEE"
      }
    }, /*#__PURE__*/React__default.createElement("span", null, t(`DSS_${dat.plots[1].label}`)), /*#__PURE__*/React__default.createElement("span", null, dat.plots[2].value));
  })));
};

var _path$b;
function _extends$e() {
  _extends$e = Object.assign ? Object.assign.bind() : function (target) {
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
  return _extends$e.apply(this, arguments);
}
function SvgArrowRight(props) {
  return /*#__PURE__*/createElement("svg", _extends$e({
    width: 16,
    height: 16,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$b || (_path$b = /*#__PURE__*/createElement("path", {
    d: "M8 0L6.59 1.41 12.17 7H0v2h12.17l-5.58 5.59L8 16l8-8-8-8z",
    fill: "#a82227"
  })));
}

var _path$c;
function _extends$f() {
  _extends$f = Object.assign ? Object.assign.bind() : function (target) {
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
  return _extends$f.apply(this, arguments);
}
function SvgArrowRightWhite(props) {
  return /*#__PURE__*/createElement("svg", _extends$f({
    width: 16,
    height: 16,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$c || (_path$c = /*#__PURE__*/createElement("path", {
    d: "M8 0L6.59 1.41 12.17 7H0v2h12.17l-5.58 5.59L8 16l8-8-8-8z",
    fill: "#fff"
  })));
}

const key$3 = "DSS_FILTERS";
const getInitialRange$3 = () => {
  var _data$range, _data$range2, _data$range3, _data$range4, _data$filters;
  const data = Digit.SessionStorage.get(key$3);
  const startDate = data !== null && data !== void 0 && (_data$range = data.range) !== null && _data$range !== void 0 && _data$range.startDate ? new Date(data === null || data === void 0 ? void 0 : (_data$range2 = data.range) === null || _data$range2 === void 0 ? void 0 : _data$range2.startDate) : Digit.Utils.dss.getDefaultFinacialYear().startDate;
  const endDate = data !== null && data !== void 0 && (_data$range3 = data.range) !== null && _data$range3 !== void 0 && _data$range3.endDate ? new Date(data === null || data === void 0 ? void 0 : (_data$range4 = data.range) === null || _data$range4 === void 0 ? void 0 : _data$range4.endDate) : Digit.Utils.dss.getDefaultFinacialYear().endDate;
  const title = `${format(startDate, "MMM d, yyyy")} - ${format(endDate, "MMM d, yyyy")}`;
  const interval = Digit.Utils.dss.getDuration(startDate, endDate);
  const denomination = (data === null || data === void 0 ? void 0 : data.denomination) || "Lac";
  const tenantId = (data === null || data === void 0 ? void 0 : (_data$filters = data.filters) === null || _data$filters === void 0 ? void 0 : _data$filters.tenantId) || [];
  return {
    startDate,
    endDate,
    title,
    interval,
    denomination,
    tenantId
  };
};
const colors = [{
  dark: "rgba(12, 157, 149, 0.85)",
  light: "rgba(11, 222, 133, 0.14)",
  defaultColor: "rgba(244, 119, 56, 1)"
}, {
  dark: "rgba(251, 192, 45, 0.85)",
  light: "rgba(255, 202, 69, 0.24)",
  defaultColor: "rgba(244, 119, 56, 1)"
}, {
  dark: "rgba(75, 31, 165, 0.85)",
  light: "rgba(138, 83, 255, 0.24)",
  defaultColor: "rgba(244, 119, 56, 1)"
}, {
  dark: "rgba(4, 139, 208, 0.85)",
  light: "rgba(4, 139, 208, 0.24)",
  defaultColor: "rgba(244, 119, 56, 1)"
}, {
  dark: "rgba(239, 124, 91, 0.85)",
  light: "rgba(255, 114, 69, 0.24)",
  defaultColor: "rgba(244, 119, 56, 1)"
}, {
  dark: "rgba(81, 210, 198, 0.85)",
  light: "rgba(83, 255, 234, 0.14)",
  defaultColor: "rgba(244, 119, 56, 1)"
}, {
  dark: "rgba(183, 165, 69, 0.85)",
  light: "rgba(222, 188, 11, 0.24)",
  defaultColor: "rgba(244, 119, 56, 1)"
}, {
  dark: "rgba(110, 132, 89, 1)",
  light: "rgba(159, 255, 83, 0.24)",
  defaultColor: "rgba(244, 119, 56, 1)"
}, {
  dark: "rgba(120, 120, 120, 0.85)",
  light: "rgb(120,120,120,0.35)",
  defaultColor: "rgba(244, 119, 56, 1)"
}, {
  dark: "rgba(183, 165, 69, 0.85)",
  light: "rgba(222, 188, 11, 0.24)",
  defaultColor: "rgba(244, 119, 56, 1)"
}, {
  dark: "rgba(183, 165, 69, 0.85)",
  light: "rgba(222, 188, 11, 0.24)",
  defaultColor: "rgba(244, 119, 56, 1)"
}];
const Chart$1 = ({
  data,
  moduleLevel,
  overview: _overview = false
}) => {
  var _response$responseDat, _response$responseDat2, _response$responseDat3, _response$responseDat4, _response$responseDat5, _response$responseDat6, _response$responseDat7, _response$responseDat8, _response$responseDat9, _response$responseDat10, _response$responseDat11, _response$responseDat12, _response$responseDat13, _response$responseDat14, _response$responseDat15, _response$responseDat16, _response$responseDat17, _response$responseDat18, _response$responseDat19, _response$responseDat20, _response$responseDat21, _response$responseDat22, _response$responseDat23, _response$responseDat24, _response$responseDat25, _response$responseDat26, _response$responseDat27;
  const {
    t
  } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const {
    id,
    chartType
  } = data;
  const {
    startDate,
    endDate,
    interval
  } = getInitialRange$3();
  const requestDate = {
    startDate: startDate.getTime(),
    endDate: endDate.getTime(),
    interval: interval,
    title: "home"
  };
  const {
    isLoading,
    data: response
  } = Digit.Hooks.dss.useGetChart({
    key: id,
    type: chartType,
    tenantId,
    requestDate,
    moduleLevel: moduleLevel
  });
  if (isLoading) {
    return /*#__PURE__*/React__default.createElement(Loader, null);
  }
  const insight = response === null || response === void 0 ? void 0 : (_response$responseDat = response.responseData) === null || _response$responseDat === void 0 ? void 0 : (_response$responseDat2 = _response$responseDat.data) === null || _response$responseDat2 === void 0 ? void 0 : (_response$responseDat3 = _response$responseDat2[0]) === null || _response$responseDat3 === void 0 ? void 0 : (_response$responseDat4 = _response$responseDat3.insight) === null || _response$responseDat4 === void 0 ? void 0 : (_response$responseDat5 = _response$responseDat4.value) === null || _response$responseDat5 === void 0 ? void 0 : (_response$responseDat6 = _response$responseDat5.replace(/[+-]/g, "")) === null || _response$responseDat6 === void 0 ? void 0 : _response$responseDat6.split("%");
  return /*#__PURE__*/React__default.createElement("div", {
    className: "dss-insight-card",
    style: _overview ? {} : {
      margin: "0px"
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    className: `tooltip`
  }, /*#__PURE__*/React__default.createElement("p", {
    className: "p1"
  }, t(data === null || data === void 0 ? void 0 : data.name)), /*#__PURE__*/React__default.createElement("span", {
    className: "tooltiptext",
    style: {
      width: t(`TIP_${data.name}`).length < 40 ? "max-content" : "fit-content",
      height: t(`TIP_${data.name}`).length < 40 ? "fit-content" : "max-content",
      whiteSpace: "normal"
    }
  }, /*#__PURE__*/React__default.createElement("span", {
    style: {
      fontSize: "14px",
      fontWeight: "400px",
      color: "white"
    }
  }, t(`TIP_${data.name}`)))), data.name === "NATIONAL_DSS_OVERVIEW_CITIZEN_FEEDBACK_SCORE" ? /*#__PURE__*/React__default.createElement(Rating, {
    currentRating: Math.round((response === null || response === void 0 ? void 0 : (_response$responseDat7 = response.responseData) === null || _response$responseDat7 === void 0 ? void 0 : (_response$responseDat8 = _response$responseDat7.data) === null || _response$responseDat8 === void 0 ? void 0 : (_response$responseDat9 = _response$responseDat8[0]) === null || _response$responseDat9 === void 0 ? void 0 : _response$responseDat9.headerValue) * 10) / 10,
    styles: {
      width: "unset",
      marginBottom: 0
    },
    starStyles: {
      width: "25px"
    },
    toolTipText: t("COMMON_RATING_LABEL")
  }) : /*#__PURE__*/React__default.createElement("p", {
    className: "p2"
  }, Digit.Utils.dss.formatter(response === null || response === void 0 ? void 0 : (_response$responseDat10 = response.responseData) === null || _response$responseDat10 === void 0 ? void 0 : (_response$responseDat11 = _response$responseDat10.data) === null || _response$responseDat11 === void 0 ? void 0 : (_response$responseDat12 = _response$responseDat11[0]) === null || _response$responseDat12 === void 0 ? void 0 : _response$responseDat12.headerValue, response === null || response === void 0 ? void 0 : (_response$responseDat13 = response.responseData) === null || _response$responseDat13 === void 0 ? void 0 : (_response$responseDat14 = _response$responseDat13.data) === null || _response$responseDat14 === void 0 ? void 0 : (_response$responseDat15 = _response$responseDat14[0]) === null || _response$responseDat15 === void 0 ? void 0 : _response$responseDat15.headerSymbol, "Lac", true, t)), response !== null && response !== void 0 && (_response$responseDat16 = response.responseData) !== null && _response$responseDat16 !== void 0 && (_response$responseDat17 = _response$responseDat16.data) !== null && _response$responseDat17 !== void 0 && (_response$responseDat18 = _response$responseDat17[0]) !== null && _response$responseDat18 !== void 0 && (_response$responseDat19 = _response$responseDat18.insight) !== null && _response$responseDat19 !== void 0 && _response$responseDat19.value ? /*#__PURE__*/React__default.createElement("p", {
    className: `p3 ${(response === null || response === void 0 ? void 0 : (_response$responseDat20 = response.responseData) === null || _response$responseDat20 === void 0 ? void 0 : (_response$responseDat21 = _response$responseDat20.data) === null || _response$responseDat21 === void 0 ? void 0 : (_response$responseDat22 = _response$responseDat21[0]) === null || _response$responseDat22 === void 0 ? void 0 : (_response$responseDat23 = _response$responseDat22.insight) === null || _response$responseDat23 === void 0 ? void 0 : _response$responseDat23.indicator) === "upper_green" ? "color-green" : "color-red"}`
  }, (response === null || response === void 0 ? void 0 : (_response$responseDat24 = response.responseData) === null || _response$responseDat24 === void 0 ? void 0 : (_response$responseDat25 = _response$responseDat24.data) === null || _response$responseDat25 === void 0 ? void 0 : (_response$responseDat26 = _response$responseDat25[0]) === null || _response$responseDat26 === void 0 ? void 0 : (_response$responseDat27 = _response$responseDat26.insight) === null || _response$responseDat27 === void 0 ? void 0 : _response$responseDat27.indicator) === "upper_green" ? ArrowUpwardElement("10px") : ArrowDownwardElement("10px"), (insight === null || insight === void 0 ? void 0 : insight[0]) && `${insight[0]}% ${t(Digit.Utils.locale.getTransformedLocale("DSS" + (insight === null || insight === void 0 ? void 0 : insight[1]) || ""))}`) : null);
};
const HorBarChart = ({
  data,
  setselectState: _setselectState = ""
}) => {
  var _response$responseDat29, _response$responseDat30;
  const barColors = ["#298CFF", "#54D140"];
  const {
    t
  } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const {
    id,
    chartType
  } = data;
  let filters = {};
  if (_setselectState !== "") filters.state = _setselectState;
  filters = {
    ...filters
  };
  const {
    startDate,
    endDate,
    interval
  } = getInitialRange$3();
  const requestDate = {
    startDate: startDate.getTime(),
    endDate: endDate.getTime(),
    interval: interval,
    title: "home"
  };
  const {
    isLoading,
    data: response
  } = Digit.Hooks.dss.useGetChart({
    key: id,
    type: chartType,
    tenantId,
    requestDate,
    filters: filters
  });
  const constructChartData = data => {
    let result = {};
    for (let i = 0; i < (data === null || data === void 0 ? void 0 : data.length); i++) {
      const row = data[i];
      for (let j = 0; j < row.plots.length; j++) {
        const plot = row.plots[j];
        result[plot.name] = {
          ...result[plot.name],
          [t(row.headerName)]: plot === null || plot === void 0 ? void 0 : plot.value,
          name: t(plot.name)
        };
      }
    }
    return Object.keys(result).map(key => {
      return {
        name: key,
        ...result[key]
      };
    });
  };
  const renderLegend = value => /*#__PURE__*/React__default.createElement("span", {
    style: {
      fontSize: "14px",
      color: "#505A5F"
    }
  }, t(`DSS_${Digit.Utils.locale.getTransformedLocale(value)}`));
  const chartData = useMemo(() => {
    var _response$responseDat28;
    return constructChartData(response === null || response === void 0 ? void 0 : (_response$responseDat28 = response.responseData) === null || _response$responseDat28 === void 0 ? void 0 : _response$responseDat28.data);
  });
  if (isLoading) {
    return /*#__PURE__*/React__default.createElement(Loader, null);
  }
  const bars = response === null || response === void 0 ? void 0 : (_response$responseDat29 = response.responseData) === null || _response$responseDat29 === void 0 ? void 0 : (_response$responseDat30 = _response$responseDat29.data) === null || _response$responseDat30 === void 0 ? void 0 : _response$responseDat30.map(bar => bar === null || bar === void 0 ? void 0 : bar.headerName);
  return /*#__PURE__*/React__default.createElement(ResponsiveContainer, {
    width: "50%",
    height: 480,
    margin: {
      top: 5,
      right: 5,
      left: 5,
      bottom: 5
    }
  }, (chartData === null || chartData === void 0 ? void 0 : chartData.length) === 0 || !chartData ? /*#__PURE__*/React__default.createElement(NoData, {
    t: t
  }) : /*#__PURE__*/React__default.createElement(BarChart, {
    width: "100%",
    height: "100%",
    margin: {
      top: 5,
      right: 5,
      left: 5,
      bottom: 5
    },
    layout: "horizontal",
    data: chartData,
    barGap: 12,
    barSize: 30
  }, /*#__PURE__*/React__default.createElement(CartesianGrid, {
    strokeDasharray: "2 2"
  }), /*#__PURE__*/React__default.createElement(YAxis, {
    dataKey: "",
    type: "number",
    tick: {
      fontSize: "12px",
      fill: "#505A5F"
    },
    label: {
      value: "",
      angle: -90,
      position: "insideLeft",
      dy: 50,
      fontSize: "12px",
      fill: "#505A5F"
    },
    tickCount: 10,
    unit: "",
    width: 130
  }), /*#__PURE__*/React__default.createElement(XAxis, {
    dataKey: "name",
    type: "category",
    tick: {
      fontSize: "14px",
      fill: "#505A5F"
    },
    tickCount: 10
  }), bars === null || bars === void 0 ? void 0 : bars.map((bar, id) => /*#__PURE__*/React__default.createElement(Bar, {
    key: id,
    dataKey: t(bar),
    fill: barColors[id],
    stackId: (bars === null || bars === void 0 ? void 0 : bars.length) > 2 ? 1 : id
  })), /*#__PURE__*/React__default.createElement(Legend, {
    formatter: renderLegend,
    iconType: "circle"
  }), /*#__PURE__*/React__default.createElement(Tooltip, {
    cursor: false
  })));
};
const Home = ({
  stateCode
}) => {
  var _dashboardConfig$8, _dashboardConfig$9;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const {
    t
  } = useTranslation();
  const [filters, setFilters] = useState(() => {});
  const {
    moduleCode
  } = useParams();
  const language = Digit.StoreData.getCurrentLanguage();
  const {
    isLoading: localizationLoading,
    data: store
  } = Digit.Services.useStore({
    stateCode,
    moduleCode,
    language
  });
  const {
    data: response,
    isLoading
  } = Digit.Hooks.dss.useDashboardConfig(moduleCode);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedState, setselectedState] = useState("");
  const [drillDownId, setdrillDownId] = useState("none");
  const [totalCount, setTotalCount] = useState("");
  const [liveCount, setLiveCount] = useState("");
  const isLandingPage = window.location.href.includes("/dss/landing/home") || window.location.href.includes("dss/landing/NURT_DASHBOARD");
  const handleFilters = data => {
    Digit.SessionStorage.set(key$3, data);
    setFilters(data);
  };
  function routeTo(jumpTo) {
    location.href = jumpTo;
  }
  const fullPageRef = useRef();
  const provided = useMemo(() => ({
    value: filters,
    setValue: handleFilters
  }), [filters]);
  const mobileView = innerWidth <= 640;
  const handlePrint = () => {
    var _dashboardConfig$;
    return Digit.Download.PDF(fullPageRef, t(dashboardConfig === null || dashboardConfig === void 0 ? void 0 : (_dashboardConfig$ = dashboardConfig[0]) === null || _dashboardConfig$ === void 0 ? void 0 : _dashboardConfig$.name));
  };
  const dashboardConfig = response === null || response === void 0 ? void 0 : response.responseData;
  const shareOptions = navigator.share ? [{
    label: t("ES_DSS_SHARE_PDF"),
    onClick: () => {
      setShowOptions(!showOptions);
      setTimeout(() => {
        var _dashboardConfig$2;
        return Digit.ShareFiles.PDF(tenantId, fullPageRef, t(dashboardConfig === null || dashboardConfig === void 0 ? void 0 : (_dashboardConfig$2 = dashboardConfig[0]) === null || _dashboardConfig$2 === void 0 ? void 0 : _dashboardConfig$2.name));
      }, 500);
    }
  }, {
    label: t("ES_DSS_SHARE_IMAGE"),
    onClick: () => {
      setShowOptions(!showOptions);
      setTimeout(() => {
        var _dashboardConfig$3;
        return Digit.ShareFiles.Image(tenantId, fullPageRef, t(dashboardConfig === null || dashboardConfig === void 0 ? void 0 : (_dashboardConfig$3 = dashboardConfig[0]) === null || _dashboardConfig$3 === void 0 ? void 0 : _dashboardConfig$3.name));
      }, 500);
    }
  }] : [{
    icon: /*#__PURE__*/React__default.createElement(EmailIcon, null),
    label: t("ES_DSS_SHARE_PDF"),
    onClick: () => {
      setShowOptions(!showOptions);
      setTimeout(() => {
        var _dashboardConfig$4;
        return Digit.ShareFiles.PDF(tenantId, fullPageRef, t(dashboardConfig === null || dashboardConfig === void 0 ? void 0 : (_dashboardConfig$4 = dashboardConfig[0]) === null || _dashboardConfig$4 === void 0 ? void 0 : _dashboardConfig$4.name), "mail");
      }, 500);
    }
  }, {
    icon: /*#__PURE__*/React__default.createElement(WhatsappIcon, null),
    label: t("ES_DSS_SHARE_PDF"),
    onClick: () => {
      setShowOptions(!showOptions);
      setTimeout(() => {
        var _dashboardConfig$5;
        return Digit.ShareFiles.PDF(tenantId, fullPageRef, t(dashboardConfig === null || dashboardConfig === void 0 ? void 0 : (_dashboardConfig$5 = dashboardConfig[0]) === null || _dashboardConfig$5 === void 0 ? void 0 : _dashboardConfig$5.name), "whatsapp");
      }, 500);
    }
  }, {
    icon: /*#__PURE__*/React__default.createElement(EmailIcon, null),
    label: t("ES_DSS_SHARE_IMAGE"),
    onClick: () => {
      setShowOptions(!showOptions);
      setTimeout(() => {
        var _dashboardConfig$6;
        return Digit.ShareFiles.Image(tenantId, fullPageRef, t(dashboardConfig === null || dashboardConfig === void 0 ? void 0 : (_dashboardConfig$6 = dashboardConfig[0]) === null || _dashboardConfig$6 === void 0 ? void 0 : _dashboardConfig$6.name), "mail");
      }, 500);
    }
  }, {
    icon: /*#__PURE__*/React__default.createElement(WhatsappIcon, null),
    label: t("ES_DSS_SHARE_IMAGE"),
    onClick: () => {
      setShowOptions(!showOptions);
      setTimeout(() => {
        var _dashboardConfig$7;
        return Digit.ShareFiles.Image(tenantId, fullPageRef, t(dashboardConfig === null || dashboardConfig === void 0 ? void 0 : (_dashboardConfig$7 = dashboardConfig[0]) === null || _dashboardConfig$7 === void 0 ? void 0 : _dashboardConfig$7.name), "whatsapp");
      }, 500);
    }
  }];
  if (isLoading || localizationLoading) {
    return /*#__PURE__*/React__default.createElement(Loader, null);
  }
  return /*#__PURE__*/React__default.createElement(FilterContext.Provider, {
    value: provided
  }, /*#__PURE__*/React__default.createElement("div", {
    ref: fullPageRef
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "options",
    style: {
      margin: "10px"
    }
  }, /*#__PURE__*/React__default.createElement(Header, {
    styles: {
      marginBottom: "0px"
    }
  }, t(dashboardConfig === null || dashboardConfig === void 0 ? void 0 : (_dashboardConfig$8 = dashboardConfig[0]) === null || _dashboardConfig$8 === void 0 ? void 0 : _dashboardConfig$8.name)), mobileView ? null : /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
    className: "mrlg"
  }, /*#__PURE__*/React__default.createElement(MultiLink, {
    className: "multilink-block-wrapper",
    label: t(`ES_DSS_SHARE`),
    icon: /*#__PURE__*/React__default.createElement(ShareIcon, {
      className: "mrsm"
    }),
    showOptions: e => setShowOptions(e),
    onHeadClick: e => setShowOptions(e !== undefined ? e : !showOptions),
    displayOptions: showOptions,
    options: shareOptions
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "mrsm",
    onClick: handlePrint
  }, /*#__PURE__*/React__default.createElement(DownloadIcon, {
    className: "mrsm"
  }), t(`ES_DSS_DOWNLOAD`)))), mobileView ? /*#__PURE__*/React__default.createElement("div", {
    className: "options-m"
  }, /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(MultiLink, {
    className: "multilink-block-wrapper",
    label: t(`ES_DSS_SHARE`),
    icon: /*#__PURE__*/React__default.createElement(ShareIcon, {
      className: "mrsm"
    }),
    showOptions: e => setShowOptions(e),
    onHeadClick: e => setShowOptions(e !== undefined ? e : !showOptions),
    displayOptions: showOptions,
    options: shareOptions
  })), /*#__PURE__*/React__default.createElement("div", {
    onClick: handlePrint
  }, /*#__PURE__*/React__default.createElement(DownloadIcon, null), t(`ES_DSS_DOWNLOAD`))) : null, dashboardConfig === null || dashboardConfig === void 0 ? void 0 : (_dashboardConfig$9 = dashboardConfig[0]) === null || _dashboardConfig$9 === void 0 ? void 0 : _dashboardConfig$9.visualizations.map((row, key) => {
    return /*#__PURE__*/React__default.createElement("div", {
      className: "dss-card",
      key: key
    }, row.vizArray.map((item, index) => {
      var _item$charts, _item$charts$, _item$charts2, _item$charts2$;
      if ((item === null || item === void 0 ? void 0 : (_item$charts = item.charts) === null || _item$charts === void 0 ? void 0 : (_item$charts$ = _item$charts[0]) === null || _item$charts$ === void 0 ? void 0 : _item$charts$.chartType) == "bar") {
        return null;
      } else if ((item === null || item === void 0 ? void 0 : (_item$charts2 = item.charts) === null || _item$charts2 === void 0 ? void 0 : (_item$charts2$ = _item$charts2[0]) === null || _item$charts2$ === void 0 ? void 0 : _item$charts2$.chartType) == "map") {
        var _item$charts3, _item$charts3$, _row$vizArray, _row$vizArray$, _row$vizArray2, _row$vizArray2$, _row$vizArray3, _row$vizArray3$, _item$charts4, _item$charts4$, _item$charts5, _item$charts6, _item$charts7, _item$charts7$, _row$vizArray4, _row$vizArray4$, _row$vizArray4$$chart;
        return /*#__PURE__*/React__default.createElement("div", {
          className: `dss-card-parent  ${item.vizType == "collection" ? "w-100" : item.name.includes("PROJECT_STAUS") || item.name.includes("LIVE_ACTIVE_ULBS") ? "dss-h-100" : ""}`,
          style: item.vizType == "collection" ? {
            backgroundColor: "#fff",
            height: "600px"
          } : {
            backgroundColor: colors[index].light
          },
          key: index
        }, /*#__PURE__*/React__default.createElement("div", {
          style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }
        }, /*#__PURE__*/React__default.createElement("div", {
          className: "dss-card-header"
        }, Icon(item.name), /*#__PURE__*/React__default.createElement("p", {
          style: {
            marginLeft: "20px"
          }
        }, selectedState === "" ? t(item.name) : t(`DSS_TB_${Digit.Utils.locale.getTransformedLocale(selectedState)}`)), selectedState != "" && item.name.includes("PROJECT_STAUS") && /*#__PURE__*/React__default.createElement("span", {
          style: {
            fontSize: "14px",
            display: "block"
          }
        }, t(`DSS_TOTAL_ULBS`), " ", Number(totalCount).toFixed(), " | ", t(`DSS_LIVE_ULBS`), " ", Number(liveCount).toFixed())), (item === null || item === void 0 ? void 0 : (_item$charts3 = item.charts) === null || _item$charts3 === void 0 ? void 0 : (_item$charts3$ = _item$charts3[0]) === null || _item$charts3$ === void 0 ? void 0 : _item$charts3$.chartType) == "map" && /*#__PURE__*/React__default.createElement("div", {
          className: "dss-card-header",
          style: {
            width: "45%"
          }
        }, Icon((_row$vizArray = row.vizArray) === null || _row$vizArray === void 0 ? void 0 : (_row$vizArray$ = _row$vizArray[1]) === null || _row$vizArray$ === void 0 ? void 0 : _row$vizArray$.name), /*#__PURE__*/React__default.createElement("p", {
          style: {
            marginLeft: "20px",
            fontSize: "24px",
            fontFamily: "Roboto, sans-serif",
            fontWeight: 500,
            color: "#000000"
          }
        }, selectedState === "" ? t((_row$vizArray2 = row.vizArray) === null || _row$vizArray2 === void 0 ? void 0 : (_row$vizArray2$ = _row$vizArray2[1]) === null || _row$vizArray2$ === void 0 ? void 0 : _row$vizArray2$.name) : t(`${Digit.Utils.locale.getTransformedLocale(selectedState)}_${(_row$vizArray3 = row.vizArray) === null || _row$vizArray3 === void 0 ? void 0 : (_row$vizArray3$ = _row$vizArray3[1]) === null || _row$vizArray3$ === void 0 ? void 0 : _row$vizArray3$.name}`)))), /*#__PURE__*/React__default.createElement("div", {
          className: "dss-card-body"
        }, (item === null || item === void 0 ? void 0 : (_item$charts4 = item.charts) === null || _item$charts4 === void 0 ? void 0 : (_item$charts4$ = _item$charts4[0]) === null || _item$charts4$ === void 0 ? void 0 : _item$charts4$.chartType) == "map" && (selectedState != "" ? /*#__PURE__*/React__default.createElement(MapDrillChart, {
          data: item === null || item === void 0 ? void 0 : (_item$charts5 = item.charts) === null || _item$charts5 === void 0 ? void 0 : _item$charts5[0],
          selectedState: selectedState,
          setselectedState: setselectedState,
          drilldownId: drillDownId,
          setdrilldownId: setdrillDownId,
          setTotalCount: setTotalCount,
          setLiveCount: setLiveCount
        }) : /*#__PURE__*/React__default.createElement(MapChart, {
          data: item === null || item === void 0 ? void 0 : (_item$charts6 = item.charts) === null || _item$charts6 === void 0 ? void 0 : _item$charts6[0],
          setselectedState: setselectedState,
          setdrilldownId: setdrillDownId,
          settotalCount: setTotalCount,
          setliveCount: setLiveCount
        })), (item === null || item === void 0 ? void 0 : (_item$charts7 = item.charts) === null || _item$charts7 === void 0 ? void 0 : (_item$charts7$ = _item$charts7[0]) === null || _item$charts7$ === void 0 ? void 0 : _item$charts7$.chartType) == "map" && /*#__PURE__*/React__default.createElement(HorBarChart, {
          data: (_row$vizArray4 = row.vizArray) === null || _row$vizArray4 === void 0 ? void 0 : (_row$vizArray4$ = _row$vizArray4[1]) === null || _row$vizArray4$ === void 0 ? void 0 : (_row$vizArray4$$chart = _row$vizArray4$.charts) === null || _row$vizArray4$$chart === void 0 ? void 0 : _row$vizArray4$$chart[0],
          setselectState: selectedState
        })));
      } else {
        var _colors$index, _colors$index2;
        return /*#__PURE__*/React__default.createElement("div", {
          className: `dss-card-parent  ${item.vizType == "collection" ? "dss-w-100" : item.name.includes("PROJECT_STAUS") || item.name.includes("LIVE_ACTIVE_ULBS") ? "h-100" : ""}`,
          style: item.vizType == "collection" || item.name.includes("PROJECT_STAUS") || item.name.includes("LIVE_ACTIVE_ULBS") ? {
            backgroundColor: "#fff",
            position: "relative"
          } : {
            backgroundColor: colors[index].light,
            padding: "20px",
            paddingBottom: "40px",
            position: "relative"
          },
          key: index
        }, /*#__PURE__*/React__default.createElement("div", {
          style: {
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "row"
          }
        }, /*#__PURE__*/React__default.createElement("div", {
          className: "dss-card-header",
          style: {
            marginBottom: "10px"
          }
        }, Icon(item.name, colors[index].dark), /*#__PURE__*/React__default.createElement("p", {
          style: {
            marginLeft: "20px"
          }
        }, t(item.name))), item.vizType == "collection" ? /*#__PURE__*/React__default.createElement("div", {
          style: {
            float: "right",
            textAlign: "right",
            color: "#a82227",
            fontSize: 16,
            fontWeight: "bold",
            display: "flex",
            flexDirection: "row"
          }
        }, !isLandingPage && /*#__PURE__*/React__default.createElement("span", null, /*#__PURE__*/React__default.createElement("span", {
          style: {
            paddingRight: 10
          }
        }, t("DSS_OVERVIEW")), /*#__PURE__*/React__default.createElement("span", null, " ", /*#__PURE__*/React__default.createElement(SvgArrowRight, null)))) : null), /*#__PURE__*/React__default.createElement("div", {
          className: "dss-card-body",
          style: {
            marginBottom: isLandingPage ? "20px" : ""
          }
        }, item.charts.map((chart, key) => /*#__PURE__*/React__default.createElement("div", {
          style: item.vizType == "collection" ? {
            width: Digit.Utils.browser.isMobile() ? "50%" : "25%"
          } : {
            width: "50%"
          }
        }, /*#__PURE__*/React__default.createElement(Chart$1, {
          data: chart,
          key: key,
          moduleLevel: item.moduleLevel,
          overview: item.vizType === "collection"
        })))), isLandingPage && /*#__PURE__*/React__default.createElement("div", {
          style: {
            borderRadius: "0px 0px 4px 4px",
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bottom: "0px",
            left: "0px",
            width: "100%",
            background: item.vizType == "collection" || item.name.includes("PROJECT_STAUS") || item.name.includes("LIVE_ACTIVE_ULBS") ? colors === null || colors === void 0 ? void 0 : (_colors$index = colors[index]) === null || _colors$index === void 0 ? void 0 : _colors$index.defaultColor : colors === null || colors === void 0 ? void 0 : (_colors$index2 = colors[index]) === null || _colors$index2 === void 0 ? void 0 : _colors$index2.dark
          },
          onClick: () => routeTo(`/digit-ui/employee/dss/dashboard/${item.ref.url}`)
        }, /*#__PURE__*/React__default.createElement("div", {
          style: {
            padding: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "40px"
          }
        }, /*#__PURE__*/React__default.createElement("span", {
          style: {
            marginRight: "10px",
            color: "white"
          }
        }, `${t("COMMON_DSS_VIEW_DASH_BOARD_LABEL")} `), /*#__PURE__*/React__default.createElement(SvgArrowRightWhite, null))));
      }
    }));
  })));
};

const key$4 = "DSS_FILTERS";
const getInitialRange$4 = () => {
  var _data$range, _data$range2, _data$range3, _data$range4, _data$filters;
  const data = Digit.SessionStorage.get(key$4);
  const startDate = data !== null && data !== void 0 && (_data$range = data.range) !== null && _data$range !== void 0 && _data$range.startDate ? new Date(data === null || data === void 0 ? void 0 : (_data$range2 = data.range) === null || _data$range2 === void 0 ? void 0 : _data$range2.startDate) : addMonths(startOfYear(new Date()), 3);
  const endDate = data !== null && data !== void 0 && (_data$range3 = data.range) !== null && _data$range3 !== void 0 && _data$range3.endDate ? new Date(data === null || data === void 0 ? void 0 : (_data$range4 = data.range) === null || _data$range4 === void 0 ? void 0 : _data$range4.endDate) : addMonths(endOfYear(new Date()), 3);
  const title = `${format(startDate, "MMM d, yyyy")} - ${format(endDate, "MMM d, yyyy")}`;
  const interval = Digit.Utils.dss.getDuration(startDate, endDate);
  const denomination = (data === null || data === void 0 ? void 0 : data.denomination) || "Unit";
  const tenantId = (data === null || data === void 0 ? void 0 : (_data$filters = data.filters) === null || _data$filters === void 0 ? void 0 : _data$filters.tenantId) || [];
  return {
    startDate,
    endDate,
    title,
    interval,
    denomination,
    tenantId
  };
};
const DrillDown = ({
  stateCode
}) => {
  var _filters$filters5, _filters$filters5$ten, _filters$filters6, _filters$filters7, _filters$filters7$ten, _filters$filters8, _filters$filters8$sta, _filters$filters9, _filters$filters10, _filters$filters10$st, _filters$filters11, _filters$filters11$ul, _filters$filters12, _filters$filters13, _filters$filters13$ul;
  const [searchQuery, onSearch] = useState("");
  const {
    ulb,
    chart,
    title,
    type = "table",
    fillColor = "",
    isNational = "NO"
  } = Digit.Hooks.useQueryParams();
  const {
    t
  } = useTranslation();
  const nationalDB = isNational == "YES" ? true : false;
  const [filters, setFilters] = useState(() => {
    const {
      startDate,
      endDate,
      title,
      interval,
      denomination,
      tenantId
    } = getInitialRange$4();
    return {
      range: {
        startDate,
        endDate,
        title,
        interval
      },
      requestDate: {
        startDate: startDate.getTime(),
        endDate: endDate.getTime(),
        interval: interval,
        title: title
      },
      filters: {
        tenantId: tenantId
      }
    };
  });
  const [showFilters, setShowFilters] = useState(false);
  const handleFilters = data => {
    Digit.SessionStorage.set(key$4, data);
    setFilters(data);
  };
  const {
    data: ulbTenants,
    isLoading: isUlbLoading
  } = Digit.Hooks.useModuleTenants("DSS");
  const provided = useMemo(() => ({
    value: filters,
    setValue: handleFilters
  }), [filters]);
  const {
    data: nationalInfo,
    isLoadingNAT
  } = Digit.Hooks.dss.useMDMS(stateCode, "tenant", ["nationalInfo"], {
    select: data => {
      var _data$tenant;
      let nationalInfo = (data === null || data === void 0 ? void 0 : (_data$tenant = data.tenant) === null || _data$tenant === void 0 ? void 0 : _data$tenant.nationalInfo) || [];
      let combinedResult = nationalInfo.reduce((acc, curr) => {
        if (acc[curr.stateCode]) {
          acc[curr.stateCode].push(curr);
        } else {
          acc[curr.stateCode] = [curr];
        }
        return {
          ...acc
        };
      }, {});
      let formattedResponse = {
        ddr: [],
        ulb: []
      };
      Object.keys(combinedResult).map(key => {
        var _combinedResult$key;
        let stateName = (_combinedResult$key = combinedResult[key]) === null || _combinedResult$key === void 0 ? void 0 : _combinedResult$key[0].stateName;
        formattedResponse.ddr.push({
          code: key,
          ddrKey: stateName,
          ulbKey: stateName
        });
        formattedResponse.ulb.push(...combinedResult[key].map(e => ({
          code: e.code,
          ulbKey: e.name,
          ddrKey: e.stateName
        })));
      });
      return formattedResponse;
    },
    enabled: nationalDB
  });
  const removeULB = id => {
    var _filters$filters;
    handleFilters({
      ...filters,
      filters: {
        ...(filters === null || filters === void 0 ? void 0 : filters.filters),
        tenantId: [...(filters === null || filters === void 0 ? void 0 : (_filters$filters = filters.filters) === null || _filters$filters === void 0 ? void 0 : _filters$filters.tenantId)].filter((tenant, index) => index !== id)
      }
    });
  };
  const removeST = id => {
    var _filters$filters2, _filters$filters3;
    let newStates = [...(filters === null || filters === void 0 ? void 0 : (_filters$filters2 = filters.filters) === null || _filters$filters2 === void 0 ? void 0 : _filters$filters2.state)].filter((tenant, index) => index !== id);
    let newUlbs = (filters === null || filters === void 0 ? void 0 : (_filters$filters3 = filters.filters) === null || _filters$filters3 === void 0 ? void 0 : _filters$filters3.ulb) || [];
    if ((newStates === null || newStates === void 0 ? void 0 : newStates.length) == 0) {
      newUlbs = [];
    } else {
      var _nationalInfo$ulb, _nationalInfo$ulb$fil;
      let filteredUlbs = nationalInfo === null || nationalInfo === void 0 ? void 0 : (_nationalInfo$ulb = nationalInfo.ulb) === null || _nationalInfo$ulb === void 0 ? void 0 : (_nationalInfo$ulb$fil = _nationalInfo$ulb.filter(e => Digit.Utils.dss.getCitiesAvailable(e, newStates))) === null || _nationalInfo$ulb$fil === void 0 ? void 0 : _nationalInfo$ulb$fil.map(ulbs => ulbs === null || ulbs === void 0 ? void 0 : ulbs.code);
      newUlbs = newUlbs.filter(ulb => filteredUlbs.includes(ulb));
    }
    handleFilters({
      ...filters,
      filters: {
        ...(filters === null || filters === void 0 ? void 0 : filters.filters),
        state: newStates,
        ulb: newUlbs
      }
    });
  };
  const removeTenant = id => {
    var _filters$filters4;
    handleFilters({
      ...filters,
      filters: {
        ...(filters === null || filters === void 0 ? void 0 : filters.filters),
        ulb: [...(filters === null || filters === void 0 ? void 0 : (_filters$filters4 = filters.filters) === null || _filters$filters4 === void 0 ? void 0 : _filters$filters4.ulb)].filter((tenant, index) => index !== id)
      }
    });
  };
  const handleClear = () => {
    handleFilters({
      ...filters,
      filters: {
        ...(filters === null || filters === void 0 ? void 0 : filters.filters),
        tenantId: []
      }
    });
  };
  const clearAllTn = () => {
    handleFilters({
      ...filters,
      filters: {
        ...(filters === null || filters === void 0 ? void 0 : filters.filters),
        ulb: []
      }
    });
  };
  const clearAllSt = () => {
    handleFilters({
      ...filters,
      filters: {
        ...(filters === null || filters === void 0 ? void 0 : filters.filters),
        state: [],
        ulb: []
      }
    });
  };
  if (isUlbLoading) {
    return /*#__PURE__*/React__default.createElement(Loader, null);
  }
  return /*#__PURE__*/React__default.createElement(FilterContext.Provider, {
    value: provided
  }, /*#__PURE__*/React__default.createElement(Header, null, t(title)), isNational ? /*#__PURE__*/React__default.createElement(Filters$1, {
    t: t,
    ulbTenants: nationalInfo,
    isNational: isNational
  }) : /*#__PURE__*/React__default.createElement(Filters, {
    t: t,
    ulbTenants: isNational ? nationalInfo : ulbTenants,
    isNational: nationalDB
  }), (filters === null || filters === void 0 ? void 0 : (_filters$filters5 = filters.filters) === null || _filters$filters5 === void 0 ? void 0 : (_filters$filters5$ten = _filters$filters5.tenantId) === null || _filters$filters5$ten === void 0 ? void 0 : _filters$filters5$ten.length) > 0 && /*#__PURE__*/React__default.createElement("div", {
    className: "tag-container"
  }, !showFilters && (filters === null || filters === void 0 ? void 0 : (_filters$filters6 = filters.filters) === null || _filters$filters6 === void 0 ? void 0 : _filters$filters6.tenantId) && filters.filters.tenantId.slice(0, 5).map((filter, id) => /*#__PURE__*/React__default.createElement(RemoveableTag, {
    key: id,
    text: `${t(`DSS_HEADER_ULB`)}: ${t(`DSS_TB_${Digit.Utils.locale.getTransformedLocale(filter)}`)}`,
    onClick: () => removeULB(id)
  })), (filters === null || filters === void 0 ? void 0 : (_filters$filters7 = filters.filters) === null || _filters$filters7 === void 0 ? void 0 : (_filters$filters7$ten = _filters$filters7.tenantId) === null || _filters$filters7$ten === void 0 ? void 0 : _filters$filters7$ten.length) > 6 && /*#__PURE__*/React__default.createElement(Fragment, null, showFilters && filters.filters.tenantId.map((filter, id) => /*#__PURE__*/React__default.createElement(RemoveableTag, {
    key: id,
    text: `${t(`DSS_HEADER_ULB`)}: ${t(`DSS_TB_${Digit.Utils.locale.getTransformedLocale(filter)}`)}`,
    onClick: () => removeULB(id)
  })), !showFilters && /*#__PURE__*/React__default.createElement("p", {
    className: "clearText cursorPointer",
    onClick: () => setShowFilters(true)
  }, t(`DSS_FILTER_SHOWALL`)), showFilters && /*#__PURE__*/React__default.createElement("p", {
    className: "clearText cursorPointer",
    onClick: () => setShowFilters(false)
  }, t(`DSS_FILTER_SHOWLESS`))), /*#__PURE__*/React__default.createElement("p", {
    className: "clearText cursorPointer",
    onClick: handleClear
  }, t(`DSS_FILTER_CLEAR`))), (filters === null || filters === void 0 ? void 0 : (_filters$filters8 = filters.filters) === null || _filters$filters8 === void 0 ? void 0 : (_filters$filters8$sta = _filters$filters8.state) === null || _filters$filters8$sta === void 0 ? void 0 : _filters$filters8$sta.length) > 0 && /*#__PURE__*/React__default.createElement("div", {
    className: "tag-container"
  }, !showFilters && (filters === null || filters === void 0 ? void 0 : (_filters$filters9 = filters.filters) === null || _filters$filters9 === void 0 ? void 0 : _filters$filters9.state) && filters.filters.state.slice(0, 5).map((filter, id) => /*#__PURE__*/React__default.createElement(RemoveableTag, {
    key: id,
    text: `${t(`DSS_HEADER_STATE`)}: ${t(`DSS_TB_${Digit.Utils.locale.getTransformedLocale(filter)}`)}`,
    onClick: () => removeST(id)
  })), (filters === null || filters === void 0 ? void 0 : (_filters$filters10 = filters.filters) === null || _filters$filters10 === void 0 ? void 0 : (_filters$filters10$st = _filters$filters10.state) === null || _filters$filters10$st === void 0 ? void 0 : _filters$filters10$st.length) > 6 && /*#__PURE__*/React__default.createElement(Fragment, null, showFilters && filters.filters.state.map((filter, id) => /*#__PURE__*/React__default.createElement(RemoveableTag, {
    key: id,
    text: `${t(`DSS_HEADER_STATE`)}: ${t(`DSS_TB_${Digit.Utils.locale.getTransformedLocale(filter)}`)}`,
    onClick: () => removeST(id)
  })), !showFilters && /*#__PURE__*/React__default.createElement("p", {
    className: "clearText cursorPointer",
    onClick: () => setShowFilters(true)
  }, t(`DSS_FILTER_SHOWALL`)), showFilters && /*#__PURE__*/React__default.createElement("p", {
    className: "clearText cursorPointer",
    onClick: () => setShowFilters(false)
  }, t(`DSS_FILTER_SHOWLESS`))), /*#__PURE__*/React__default.createElement("p", {
    className: "clearText cursorPointer",
    onClick: clearAllSt
  }, t(`DSS_FILTER_CLEAR_ST`))), (filters === null || filters === void 0 ? void 0 : (_filters$filters11 = filters.filters) === null || _filters$filters11 === void 0 ? void 0 : (_filters$filters11$ul = _filters$filters11.ulb) === null || _filters$filters11$ul === void 0 ? void 0 : _filters$filters11$ul.length) > 0 && /*#__PURE__*/React__default.createElement("div", {
    className: "tag-container"
  }, !showFilters && (filters === null || filters === void 0 ? void 0 : (_filters$filters12 = filters.filters) === null || _filters$filters12 === void 0 ? void 0 : _filters$filters12.ulb) && filters.filters.ulb.slice(0, 5).map((filter, id) => /*#__PURE__*/React__default.createElement(RemoveableTag, {
    key: id,
    text: `${t(`DSS_HEADER_ULB`)}: ${t(`DSS_TB_${Digit.Utils.locale.getTransformedLocale(filter)}`)}`,
    onClick: () => removeTenant(id)
  })), (filters === null || filters === void 0 ? void 0 : (_filters$filters13 = filters.filters) === null || _filters$filters13 === void 0 ? void 0 : (_filters$filters13$ul = _filters$filters13.ulb) === null || _filters$filters13$ul === void 0 ? void 0 : _filters$filters13$ul.length) > 6 && /*#__PURE__*/React__default.createElement(Fragment, null, showFilters && filters.filters.ulb.map((filter, id) => /*#__PURE__*/React__default.createElement(RemoveableTag, {
    key: id,
    text: `${t(`DSS_HEADER_ULB`)}: ${t(`DSS_TB_${Digit.Utils.locale.getTransformedLocale(filter)}`)}`,
    onClick: () => removeTenant(id)
  })), !showFilters && /*#__PURE__*/React__default.createElement("p", {
    className: "clearText cursorPointer",
    onClick: () => setShowFilters(true)
  }, t(`DSS_FILTER_SHOWALL`)), showFilters && /*#__PURE__*/React__default.createElement("p", {
    className: "clearText cursorPointer",
    onClick: () => setShowFilters(false)
  }, t(`DSS_FILTER_SHOWLESS`))), /*#__PURE__*/React__default.createElement("p", {
    className: "clearText cursorPointer",
    onClick: clearAllTn
  }, t(`DSS_FILTER_CLEAR_TN`))), type === "table" && /*#__PURE__*/React__default.createElement(GenericChart, {
    header: title,
    showDownload: true,
    showSearch: true,
    className: "fullWidth",
    onChange: e => onSearch(e.target.value),
    showHeader: false
  }, /*#__PURE__*/React__default.createElement(CustomTable, {
    data: {
      id: chart
    },
    onSearch: searchQuery
  })), type === "performing-metric" && /*#__PURE__*/React__default.createElement(GenericChart, {
    header: title,
    subHeader: `(${t(`SUB_${title}`)})`,
    showHeader: false,
    className: "fullWidth"
  }, /*#__PURE__*/React__default.createElement(CustomBarChart, {
    data: {
      id: chart
    },
    fillColor: fillColor,
    title: title,
    showDrillDown: false
  })));
};

const FAQComponent = props => {
  const {
    question,
    answer,
    index,
    lastIndex,
    subAnswer,
    acrynom
  } = props;
  const [isOpen, toggleOpen] = useState(false);
  const {
    t
  } = useTranslation();
  const selectedLanguage = Digit.StoreData.getCurrentLanguage();
  return /*#__PURE__*/React__default.createElement("div", {
    className: "faqs border-none",
    onClick: () => toggleOpen(!isOpen)
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "faq-question",
    style: {
      justifyContent: t(question).length > 30 && isOpen ? "revert" : "space-between",
      display: Digit.Utils.browser.isMobile() && t(question).length > 30 && isOpen ? "block" : "flex"
    }
  }, /*#__PURE__*/React__default.createElement("span", {
    style: {
      fontWeight: 700
    }
  }, `${index}. ` + t(question)), /*#__PURE__*/React__default.createElement("span", {
    className: isOpen ? "faqicon rotate" : "faqicon",
    style: {
      float: "right"
    }
  }, isOpen ? /*#__PURE__*/React__default.createElement(ArrowForward, null) : /*#__PURE__*/React__default.createElement(ArrowForward, null))), /*#__PURE__*/React__default.createElement("div", {
    className: "faq-answer",
    style: isOpen ? {
      display: "block"
    } : {
      display: "none"
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    style: {
      marginTop: "-20px"
    }
  }, answer === null || answer === void 0 ? void 0 : answer.map((obj, i) => /*#__PURE__*/React__default.createElement("span", {
    style: {
      color: "#000",
      marginTop: "20px",
      marginBottom: "20px"
    }
  }, t(obj.ans))), acrynom === null || acrynom === void 0 ? void 0 : acrynom.map((obj, i) => /*#__PURE__*/React__default.createElement("div", null, " ", /*#__PURE__*/React__default.createElement("span", {
    style: {
      color: "#000",
      marginTop: index === 1 ? i === 0 ? "20px" : "0px" : "20px",
      marginBottom: index === 1 ? i === 0 ? "20px" : "0px" : "20px"
    }
  }, t(obj.acr)), /*#__PURE__*/React__default.createElement("span", {
    style: {
      color: "#000",
      marginTop: index === 1 ? i === 0 ? "-40px" : "-20px" : "20px",
      marginBottom: index === 1 ? i === 14 ? "20px" : "0px" : "20px",
      marginLeft: selectedLanguage === "hi_IN" ? "115px" : "60px"
    }
  }, t(obj.fullForm)))), answer === null || answer === void 0 ? void 0 : answer.map(obj => /*#__PURE__*/React__default.createElement("span", {
    style: {
      color: "#000",
      marginLeft: "30px"
    }
  }, obj.point ? "•" : null, /*#__PURE__*/React__default.createElement("div", {
    style: {
      marginTop: "-21px",
      marginLeft: "15px"
    }
  }, t(obj.point))))), /*#__PURE__*/React__default.createElement("div", null, subAnswer === null || subAnswer === void 0 ? void 0 : subAnswer.map(obj => /*#__PURE__*/React__default.createElement("span", {
    style: {
      color: "#000",
      marginBottom: "20px"
    }
  }, t(obj.ans))), subAnswer === null || subAnswer === void 0 ? void 0 : subAnswer.map(obj => /*#__PURE__*/React__default.createElement("span", {
    style: {
      color: "#000",
      marginLeft: "30px"
    }
  }, obj.point ? "•" : null, /*#__PURE__*/React__default.createElement("div", {
    style: {
      marginTop: "-21px",
      marginLeft: "15px"
    }
  }, t(obj.point)))))), !lastIndex ? /*#__PURE__*/React__default.createElement("div", {
    className: "cs-box-border"
  }) : null);
};

const FAQsSection = () => {
  var _user$info, _data$MdmsRes$dssDas, _data$MdmsRes$dssDas$;
  const user = Digit.UserService.getUser();
  const tenantId = (user === null || user === void 0 ? void 0 : (_user$info = user.info) === null || _user$info === void 0 ? void 0 : _user$info.tenantId) || Digit.ULBService.getCurrentTenantId();
  const {
    t
  } = useTranslation();
  const {
    isLoading,
    data
  } = Digit.Hooks.useGetDSSFAQsJSON(Digit.ULBService.getStateId());
  const moduleFAQs = data === null || data === void 0 ? void 0 : (_data$MdmsRes$dssDas = data.MdmsRes["dss-dashboard"]) === null || _data$MdmsRes$dssDas === void 0 ? void 0 : (_data$MdmsRes$dssDas$ = _data$MdmsRes$dssDas.FAQs[0]) === null || _data$MdmsRes$dssDas$ === void 0 ? void 0 : _data$MdmsRes$dssDas$[`DSS`].FAQs;
  if (isLoading) {
    return /*#__PURE__*/React__default.createElement(Loader, null);
  }
  return /*#__PURE__*/React__default.createElement(Fragment$1, null, /*#__PURE__*/React__default.createElement("div", {
    className: "faq-page"
  }, /*#__PURE__*/React__default.createElement("div", {
    style: {
      marginBottom: "15px"
    }
  }, /*#__PURE__*/React__default.createElement(Header, {
    styles: {
      marginLeft: "0px",
      paddingTop: "10px",
      fontSize: "36px"
    }
  }, t("DSS_FAQS"))), /*#__PURE__*/React__default.createElement("div", {
    className: "faq-list"
  }, moduleFAQs.map((faq, i) => /*#__PURE__*/React__default.createElement(FAQComponent, {
    key: "FAQ" + i,
    question: faq.question,
    acrynom: faq.acrynom,
    answer: faq.answer,
    subAnswer: faq.subAnswer,
    index: i + 1
  })))));
};

const About = () => {
  var _data$MdmsRes$dssDas, _data$MdmsRes$dssDas$;
  const {
    t
  } = useTranslation();
  const {
    isLoading,
    data
  } = Digit.Hooks.useGetDSSAboutJSON(Digit.ULBService.getStateId());
  const moduleAbout = data === null || data === void 0 ? void 0 : (_data$MdmsRes$dssDas = data.MdmsRes["dss-dashboard"]) === null || _data$MdmsRes$dssDas === void 0 ? void 0 : (_data$MdmsRes$dssDas$ = _data$MdmsRes$dssDas.About[0]) === null || _data$MdmsRes$dssDas$ === void 0 ? void 0 : _data$MdmsRes$dssDas$[`DSS`].About;
  const definitionlist = defineObj => {
    let array = [];
    for (var i = 0; i < defineObj.length; i++) {
      array.push(t(defineObj[i]));
    }
    return array.join(" ");
  };
  if (isLoading) {
    return /*#__PURE__*/React__default.createElement(Loader, null);
  }
  return /*#__PURE__*/React__default.createElement(Fragment$1, null, /*#__PURE__*/React__default.createElement(Header, {
    styles: {
      marginLeft: "15px",
      paddingTop: "10px",
      fontSize: "36px"
    }
  }, t("DSS_ABOUT_DASHBOARD")), /*#__PURE__*/React__default.createElement(Card, null, moduleAbout.map(obj => {
    var _obj$definePoints, _obj$definePoints2, _obj$subdefinePoints;
    return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(CardSubHeader, {
      style: {
        marginBottom: "0",
        fontSize: "24px",
        marginBottom: "10px"
      }
    }, t(obj === null || obj === void 0 ? void 0 : obj.titleHeader)), /*#__PURE__*/React__default.createElement("div", {
      style: {
        fontSize: "16px",
        marginBottom: "20px"
      }
    }, definitionlist(obj === null || obj === void 0 ? void 0 : obj.define)), obj !== null && obj !== void 0 && obj.definePoints && (obj === null || obj === void 0 ? void 0 : obj.titleHeader) === "KEY_TERMS" ? /*#__PURE__*/React__default.createElement("div", null, obj === null || obj === void 0 ? void 0 : (_obj$definePoints = obj.definePoints) === null || _obj$definePoints === void 0 ? void 0 : _obj$definePoints.map((about, i) => /*#__PURE__*/React__default.createElement("div", {
      style: {
        fontSize: "16px",
        marginLeft: "15px",
        marginBottom: "20px"
      }
    }, "•", /*#__PURE__*/React__default.createElement("div", {
      style: {
        marginTop: "-25px",
        marginLeft: "15px"
      }
    }, /*#__PURE__*/React__default.createElement("b", null, t(`${about === null || about === void 0 ? void 0 : about.point}_HEADER`)), " - ", t(`${about === null || about === void 0 ? void 0 : about.point}_MSG`))))) : null, obj !== null && obj !== void 0 && obj.definePoints && (obj === null || obj === void 0 ? void 0 : obj.titleHeader) !== "KEY_TERMS" ? /*#__PURE__*/React__default.createElement("div", null, obj === null || obj === void 0 ? void 0 : (_obj$definePoints2 = obj.definePoints) === null || _obj$definePoints2 === void 0 ? void 0 : _obj$definePoints2.map((about, i) => /*#__PURE__*/React__default.createElement("div", {
      style: {
        fontSize: "16px",
        marginLeft: "15px",
        marginBottom: "20px"
      }
    }, "•", /*#__PURE__*/React__default.createElement("div", {
      style: {
        marginTop: "-25px",
        marginLeft: "15px"
      }
    }, t(about === null || about === void 0 ? void 0 : about.point))))) : null, /*#__PURE__*/React__default.createElement("div", {
      style: {
        fontSize: "16px",
        marginBottom: "20px"
      }
    }, t(obj === null || obj === void 0 ? void 0 : obj.subdefine)), obj !== null && obj !== void 0 && obj.subdefinePoints ? /*#__PURE__*/React__default.createElement("div", null, obj === null || obj === void 0 ? void 0 : (_obj$subdefinePoints = obj.subdefinePoints) === null || _obj$subdefinePoints === void 0 ? void 0 : _obj$subdefinePoints.map((about, i) => /*#__PURE__*/React__default.createElement("div", {
      style: {
        fontSize: "16px",
        marginLeft: "15px",
        marginBottom: "20px"
      }
    }, "•", /*#__PURE__*/React__default.createElement("div", {
      style: {
        marginTop: "-25px",
        marginLeft: "15px"
      }
    }, t(about === null || about === void 0 ? void 0 : about.point))))) : null);
  })));
};

const DssBreadCrumb = ({
  location
}) => {
  const {
    t
  } = useTranslation();
  const {
    fromModule = false,
    title
  } = Digit.Hooks.useQueryParams();
  const moduleName = Digit.Utils.dss.getCurrentModuleName();
  const crumbs = [{
    path: "/digit-ui/employee",
    content: t("ES_COMMON_HOME"),
    show: true
  }, {
    path: checkCurrentScreen() || window.location.href.includes("NURT_DASHBOARD") ? "/digit-ui/employee/dss/landing/NURT_DASHBOARD" : "/digit-ui/employee/dss/landing/home",
    content: t("ES_LANDING_PAGE"),
    show: true
  }, {
    path: fromModule ? `/digit-ui/employee/dss/dashboard/${fromModule}` : `/digit-ui/employee/dss/dashboard/${Digit.Utils.dss.getCurrentModuleName()}`,
    content: t(`ES_COMMON_DSS_${Digit.Utils.locale.getTransformedLocale(fromModule ? fromModule : moduleName)}`),
    show: location.pathname.includes("dashboard") ? true : false
  }, {
    path: "/digit-ui/employee/dss/drilldown",
    content: location.pathname.includes("drilldown") ? t(title) : t("ES_COMMON_DSS_DRILL"),
    show: location.pathname.includes("drilldown") ? true : false
  }, {
    path: "/digit-ui/employee/dss/national-faqs",
    content: t("ES_COMMON_DSS_FAQS"),
    show: location.pathname.includes("national-faqs") ? true : false
  }, {
    path: "/digit-ui/employee/dss/national-about",
    content: t("ES_COMMON_DSS_ABOUT"),
    show: location.pathname.includes("national-about") ? true : false
  }];
  return /*#__PURE__*/React__default.createElement(BreadCrumb, {
    crumbs: crumbs === null || crumbs === void 0 ? void 0 : crumbs.filter(ele => ele.show)
  });
};
const Routes = ({
  path,
  stateCode
}) => {
  const location = useLocation();
  const isMobile = window.Digit.Utils.browser.isMobile();
  return /*#__PURE__*/React__default.createElement("div", {
    className: "chart-wrapper",
    style: isMobile ? {
      marginTop: "unset"
    } : {}
  }, /*#__PURE__*/React__default.createElement(DssBreadCrumb, {
    location: location
  }), /*#__PURE__*/React__default.createElement(Switch$1, null, /*#__PURE__*/React__default.createElement(PrivateRoute, {
    path: `${path}/landing/:moduleCode`,
    component: () => /*#__PURE__*/React__default.createElement(Home, {
      stateCode: stateCode
    })
  }), /*#__PURE__*/React__default.createElement(PrivateRoute, {
    path: `${path}/dashboard/:moduleCode`,
    component: () => /*#__PURE__*/React__default.createElement(DashBoard, {
      stateCode: stateCode
    })
  }), /*#__PURE__*/React__default.createElement(PrivateRoute, {
    path: `${path}/drilldown`,
    component: () => /*#__PURE__*/React__default.createElement(DrillDown, {
      stateCode: stateCode
    })
  }), /*#__PURE__*/React__default.createElement(Route, {
    key: "national-faq",
    path: `${path}/national-faqs`
  }, /*#__PURE__*/React__default.createElement(FAQsSection, null)), /*#__PURE__*/React__default.createElement(Route, {
    key: "national-about",
    path: `${path}/national-about`
  }, /*#__PURE__*/React__default.createElement(About, null))));
};
const DSSModule = ({
  stateCode,
  userType,
  tenants
}) => {
  const moduleCode = "DSS";
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
    return /*#__PURE__*/React__default.createElement(Loader, null);
  }
  Digit.SessionStorage.set("DSS_TENANTS", tenants);
  if (userType !== "citizen") {
    return /*#__PURE__*/React__default.createElement(Routes, {
      path: path,
      stateCode: stateCode
    });
  }
};
const componentsToRegister = {
  DSSModule,
  DSSCard,
  NDSSCard
};
const initDSSComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};

export { initDSSComponents };
//# sourceMappingURL=index.modern.js.map
