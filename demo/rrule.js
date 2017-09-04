(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["rrule"] = factory();
	else
		root["rrule"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DateTime;
function DateTime() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length === 1 && args[0] instanceof DateTime) {
    this._date = new DateTime.Strategy(args[0]._date);
  } else {
    this._date = new (Function.prototype.bind.apply(DateTime.Strategy, [null].concat(args)))();
  }
}

DateTime.Strategy = Date;

DateTime.interface = ['getDate', 'getDay', 'getFullYear', 'getHours', 'getMinutes', 'getMonth', 'getSeconds', 'getTime', 'getTimezoneOffset', 'getUTCDate', 'getUTCFullYear', 'getUTCHours', 'getUTCMinutes', 'getUTCMonth', 'getUTCSeconds', 'toString', 'valueOf'].reduce(function (data, name) {
  data[name] = {
    value: function value() {
      var _date;

      return (_date = this._date)[name].apply(_date, arguments);
    }
  };
  return data;
}, {});

DateTime.prototype = {
  constructor: DateTime
};

Object.defineProperties(DateTime.prototype, DateTime.interface);

DateTime.UTC = function () {
  var _DateTime$Strategy;

  return (_DateTime$Strategy = DateTime.Strategy).UTC.apply(_DateTime$Strategy, arguments); // eslint-disable-line new-cap
};

DateTime.parse = function () {
  var _DateTime$Strategy2;

  return (_DateTime$Strategy2 = DateTime.Strategy).parse.apply(_DateTime$Strategy2, arguments);
};

DateTime.now = function () {
  return DateTime.Strategy.now();
};

DateTime.setStrategy = function (Strategy) {
  var instance = new Strategy();
  for (var name in DateTime.interface) {
    if (typeof instance[name] !== 'function') {
      throw new Error('Method "' + name + '" is not defined in prototype');
    }
  }

  ['UTC', 'parse', 'now'].forEach(function (name) {
    if (typeof Strategy[name] !== 'function') {
      throw new Error('Method "' + name + '" is not defined');
    }
  });

  DateTime.Strategy = Strategy;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.range = range;
exports.repeat = repeat;
exports.split = split;
exports.pymod = pymod;
exports.divmod = divmod;
exports.plb = plb;
exports.contains = contains;
/**
 * Simplified version of python's range()
 * @param {*} start
 * @param {*} end
 * @returns {array}
 */
function range(start, end) {
  if (arguments.length === 1) {
    end = start;
    start = 0;
  }
  var rang = [];
  for (var i = start; i < end; i++) {
    rang.push(i);
  }
  return rang;
}

/**
 *
 * @param {*} value
 * @param {*} times
 * @returns {array}
 */
function repeat(value, times) {
  var i = 0;
  var array = [];

  if (value instanceof Array) {
    for (; i < times; i++) {
      array[i] = [].concat(value);
    }
  } else {
    for (; i < times; i++) {
      array[i] = value;
    }
  }
  return array;
}

/**
 *
 * @param {*} str
 * @param {*} sep
 * @param {*} num
 * @returns {array}
 */
function split(str, sep, num) {
  var splits = str.split(sep);
  return num ? splits.slice(0, num).concat([splits.slice(num).join(sep)]) : splits;
}

/**
 * closure/goog/math/math.js:modulo
 * Copyright 2006 The Closure Library Authors.
 * The % operator in JavaScript returns the remainder of a / b, but differs from
 * some other languages in that the result will have the same sign as the
 * dividend. For example, -1 % 8 == -1, whereas in some other languages
 * (such as Python) the result would be 7. This function emulates the more
 * correct modulo behavior, which is useful for certain applications such as
 * calculating an offset index in a circular list.
 *
 * @param {number} a The dividend.
 * @param {number} b The divisor.
 * @returns {number} a % b where the result is between 0 and b (either 0 <= x < b
 *     or b < x <= 0, depending on the sign of b).
 */
function pymod(a, b) {
  var r = a % b;
  // If r and b differ in sign, add b to wrap the result to the correct sign.
  return r * b < 0 ? r + b : r;
}

/**
 * @see: <http://docs.python.org/library/functions.html#divmod>
 * @param {*} a
 * @param {*} b
 * @returns {Object}
 */
function divmod(a, b) {
  return {
    div: Math.floor(a / b),
    mod: pymod(a, b)
  };
}

/**
 * Python-like boolean
 * @param {Object} obj
 * @returns {boolean} value of an object/primitive, taking into account
 * the fact that in Python an empty list's/tuple's
 * boolean value is False, whereas in JS it's true
 */
function plb(obj) {
  return obj instanceof Array && obj.length === 0 ? false : Boolean(obj);
}

/**
 * Return true if a value is in an array
 * @param {array} arr
 * @param {*} val
 * @returns {boolean}
 */
function contains(arr, val) {
  return arr.indexOf(val) !== -1;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = RRule;

var _nlp = __webpack_require__(8);

var _nlp2 = _interopRequireDefault(_nlp);

var _dateutil = __webpack_require__(3);

var dateutil = _interopRequireWildcard(_dateutil);

var _Weekday = __webpack_require__(4);

var _Weekday2 = _interopRequireDefault(_Weekday);

var _Time = __webpack_require__(5);

var _Time2 = _interopRequireDefault(_Time);

var _DateTime = __webpack_require__(0);

var _DateTime2 = _interopRequireDefault(_DateTime);

var _IterResult = __webpack_require__(9);

var _IterResult2 = _interopRequireDefault(_IterResult);

var _Iterinfo = __webpack_require__(10);

var _Iterinfo2 = _interopRequireDefault(_Iterinfo);

var _utils = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @see <http://labix.org/python-dateutil/#head-cf004ee9a75592797e076752b2a889c10f445418>
 * @constructor
 * @param {Object} options The only required option is `freq`, one of RRule.YEARLY, RRule.MONTHLY, ...
 * @param {*} noCache
 */
function RRule(options, noCache) {
  options = options || {};
  // RFC string
  this._string = null;
  this._cache = noCache ? null : {
    all: false,
    before: [],
    after: [],
    between: []

    // used by toString()
  };this.origOptions = {};

  var invalid = [];
  var keys = Object.keys(options);
  var defaultKeys = Object.keys(RRule.DEFAULT_OPTIONS);

  // Shallow copy for origOptions and check for invalid
  keys.forEach(function (key) {
    this.origOptions[key] = options[key];
    if (!(0, _utils.contains)(defaultKeys, key)) {
      invalid.push(key);
    }
  }, this);

  if (invalid.length) {
    throw new Error('Invalid options: ' + invalid.join(', '));
  }

  if (!RRule.FREQUENCIES[options.freq] && options.byeaster === null) {
    throw new Error('Invalid frequency: ' + String(options.freq));
  }

  // Merge in default options
  defaultKeys.forEach(function (key) {
    if (!(0, _utils.contains)(keys, key)) {
      options[key] = RRule.DEFAULT_OPTIONS[key];
    }
  });

  var opts = this.options = options;

  if (opts.byeaster !== null) {
    opts.freq = RRule.YEARLY;
  }
  if (!opts.dtstart) {
    opts.dtstart = new _DateTime2.default();
  }

  var millisecondModulo = opts.dtstart.getTime() % 1000;
  if (opts.wkst === null) {
    opts.wkst = RRule.MO.weekday;
  } else if (typeof opts.wkst === 'number') {
    // cool, just keep it like that
  } else {
    opts.wkst = opts.wkst.weekday;
  }

  if (opts.bysetpos !== null) {
    if (typeof opts.bysetpos === 'number') {
      opts.bysetpos = [opts.bysetpos];
    }

    for (var i = 0; i < opts.bysetpos.length; i++) {
      var v = opts.bysetpos[i];
      if (v === 0 || !(v >= -366 && v <= 366)) {
        throw new Error('bysetpos must be between 1 and 366,' + ' or between -366 and -1');
      }
    }
  }

  if (!((0, _utils.plb)(opts.byweekno) || (0, _utils.plb)(opts.byyearday) || (0, _utils.plb)(opts.bymonthday) || opts.byweekday !== null || opts.byeaster !== null)) {
    switch (opts.freq) {
      case RRule.YEARLY:
        if (!opts.bymonth) {
          opts.bymonth = opts.dtstart.getMonth() + 1;
        }
        opts.bymonthday = opts.dtstart.getDate();
        break;
      case RRule.MONTHLY:
        opts.bymonthday = opts.dtstart.getDate();
        break;
      case RRule.WEEKLY:
        opts.byweekday = dateutil.getWeekday(opts.dtstart);
        break;
    }
  }

  // bymonth
  if (opts.bymonth !== null && !(opts.bymonth instanceof Array)) {
    opts.bymonth = [opts.bymonth];
  }
  // byyearday
  if (opts.byyearday !== null && !(opts.byyearday instanceof Array)) {
    opts.byyearday = [opts.byyearday];
  }

  // bymonthday
  if (opts.bymonthday === null) {
    opts.bymonthday = [];
    opts.bynmonthday = [];
  } else if (opts.bymonthday instanceof Array) {
    var bymonthday = [];
    var bynmonthday = [];

    for (i = 0; i < opts.bymonthday.length; i++) {
      v = opts.bymonthday[i];
      if (v > 0) {
        bymonthday.push(v);
      } else if (v < 0) {
        bynmonthday.push(v);
      }
    }
    opts.bymonthday = bymonthday;
    opts.bynmonthday = bynmonthday;
  } else {
    if (opts.bymonthday < 0) {
      opts.bynmonthday = [opts.bymonthday];
      opts.bymonthday = [];
    } else {
      opts.bynmonthday = [];
      opts.bymonthday = [opts.bymonthday];
    }
  }

  // byweekno
  if (opts.byweekno !== null && !(opts.byweekno instanceof Array)) {
    opts.byweekno = [opts.byweekno];
  }

  // byweekday / bynweekday
  if (opts.byweekday === null) {
    opts.bynweekday = null;
  } else if (typeof opts.byweekday === 'number') {
    opts.byweekday = [opts.byweekday];
    opts.bynweekday = null;
  } else if (opts.byweekday instanceof _Weekday2.default) {
    if (!opts.byweekday.n || opts.freq > RRule.MONTHLY) {
      opts.byweekday = [opts.byweekday.weekday];
      opts.bynweekday = null;
    } else {
      opts.bynweekday = [[opts.byweekday.weekday, opts.byweekday.n]];
      opts.byweekday = null;
    }
  } else {
    var byweekday = [];
    var bynweekday = [];

    for (i = 0; i < opts.byweekday.length; i++) {
      var wday = opts.byweekday[i];

      if (typeof wday === 'number') {
        byweekday.push(wday);
      } else if (!wday.n || opts.freq > RRule.MONTHLY) {
        byweekday.push(wday.weekday);
      } else {
        bynweekday.push([wday.weekday, wday.n]);
      }
    }
    opts.byweekday = (0, _utils.plb)(byweekday) ? byweekday : null;
    opts.bynweekday = (0, _utils.plb)(bynweekday) ? bynweekday : null;
  }

  // byhour
  if (opts.byhour === null) {
    opts.byhour = opts.freq < RRule.HOURLY ? [opts.dtstart.getHours()] : null;
  } else if (typeof opts.byhour === 'number') {
    opts.byhour = [opts.byhour];
  }

  // byminute
  if (opts.byminute === null) {
    opts.byminute = opts.freq < RRule.MINUTELY ? [opts.dtstart.getMinutes()] : null;
  } else if (typeof opts.byminute === 'number') {
    opts.byminute = [opts.byminute];
  }

  // bysecond
  if (opts.bysecond === null) {
    opts.bysecond = opts.freq < RRule.SECONDLY ? [opts.dtstart.getSeconds()] : null;
  } else if (typeof opts.bysecond === 'number') {
    opts.bysecond = [opts.bysecond];
  }

  if (opts.freq >= RRule.HOURLY) {
    this.timeset = null;
  } else {
    this.timeset = [];
    for (i = 0; i < opts.byhour.length; i++) {
      var hour = opts.byhour[i];
      for (var j = 0; j < opts.byminute.length; j++) {
        var minute = opts.byminute[j];
        for (var k = 0; k < opts.bysecond.length; k++) {
          var second = opts.bysecond[k];
          // python:
          // datetime.time(hour, minute, second,
          // tzinfo=self._tzinfo))
          this.timeset.push(new _Time2.default(hour, minute, second, millisecondModulo));
        }
      }
    }
    dateutil.sort(this.timeset);
  }
}

// RRule class 'constants'

RRule.FREQUENCIES = ['YEARLY', 'MONTHLY', 'WEEKLY', 'DAILY', 'HOURLY', 'MINUTELY', 'SECONDLY'];

RRule.YEARLY = 0;
RRule.MONTHLY = 1;
RRule.WEEKLY = 2;
RRule.DAILY = 3;
RRule.HOURLY = 4;
RRule.MINUTELY = 5;
RRule.SECONDLY = 6;

RRule.MO = new _Weekday2.default(0);
RRule.TU = new _Weekday2.default(1);
RRule.WE = new _Weekday2.default(2);
RRule.TH = new _Weekday2.default(3);
RRule.FR = new _Weekday2.default(4);
RRule.SA = new _Weekday2.default(5);
RRule.SU = new _Weekday2.default(6);

RRule.DEFAULT_OPTIONS = {
  freq: null,
  dtstart: null,
  interval: 1,
  wkst: RRule.MO,
  count: null,
  until: null,
  bysetpos: null,
  bymonth: null,
  bymonthday: null,
  bynmonthday: null,
  byyearday: null,
  byweekno: null,
  byweekday: null,
  bynweekday: null,
  byhour: null,
  byminute: null,
  bysecond: null,
  byeaster: null
};

RRule.parseText = function (text, language) {
  return (0, _nlp2.default)(RRule).parseText(text, language);
};

RRule.fromText = function (text, language) {
  return (0, _nlp2.default)(RRule).fromText(text, language);
};

RRule.optionsToString = function (options) {
  var key;
  var value;
  var strValues;
  var pairs = [];
  var keys = Object.keys(options);
  var defaultKeys = Object.keys(RRule.DEFAULT_OPTIONS);

  for (var i = 0; i < keys.length; i++) {
    if (!(0, _utils.contains)(defaultKeys, keys[i])) {
      continue;
    }

    key = keys[i].toUpperCase();
    value = options[keys[i]];
    strValues = [];

    if (value === null || value instanceof Array && !value.length) {
      continue;
    }

    switch (key) {
      case 'FREQ':
        value = RRule.FREQUENCIES[options.freq];
        break;
      case 'WKST':
        value = value.toString();
        break;
      case 'BYWEEKDAY':
        /*
        NOTE: BYWEEKDAY is a special case.
        RRule() deconstructs the rule.options.byweekday array
        into an array of Weekday arguments.
        On the other hand, rule.origOptions is an array of Weekdays.
        We need to handle both cases here.
        It might be worth change RRule to keep the Weekdays.
         Also, BYWEEKDAY (used by RRule) vs. BYDAY (RFC)
         */
        key = 'BYDAY';
        if (!(value instanceof Array)) {
          value = [value];
        }

        for (var wday, j = 0; j < value.length; j++) {
          wday = value[j];
          if (wday instanceof _Weekday2.default) {
            // good
          } else if (wday instanceof Array) {
            wday = new _Weekday2.default(wday[0], wday[1]);
          } else {
            wday = new _Weekday2.default(wday);
          }
          strValues[j] = wday.toString();
        }
        value = strValues;
        break;
      case 'DTSTART':
      case 'UNTIL':
        value = dateutil.timeToUntilString(value);
        break;
      default:
        if (value instanceof Array) {
          for (j = 0; j < value.length; j++) {
            strValues[j] = String(value[j]);
          }
          value = strValues;
        } else {
          value = String(value);
        }
    }
    pairs.push([key, value]);
  }

  var strings = [];
  for (i = 0; i < pairs.length; i++) {
    var attr = pairs[i];
    strings.push(attr[0] + '=' + attr[1].toString());
  }
  return strings.join(';');
};

RRule.prototype = {
  constructor: RRule,

  /**
   * @param {function} iterator - optional function that will be called
   *                   on each date that is added. It can return false
   *                   to stop the iteration.
   * @returns {array} containing all recurrences.
   */
  all: function all(iterator) {
    if (iterator) {
      return this._iter(new _IterResult.CallbackIterResult('all', {}, iterator));
    } else {
      var result = this._cacheGet('all');
      if (result === false) {
        result = this._iter(new _IterResult2.default('all', {}));
        this._cacheAdd('all', result);
      }
      return result;
    }
  },

  /**
   * Returns all the occurrences of the rrule between after and before.
   * The inc keyword defines what happens if after and/or before are
   * themselves occurrences. With inc == True, they will be included in the
   * list, if they are found in the recurrence set.
   * @param {*} after
   * @param {*} before
   * @param {*} inc
   * @param {*} iterator
   * @returns {array}
   */
  between: function between(after, before, inc, iterator) {
    var args = {
      before: before,
      after: after,
      inc: inc
    };

    if (iterator) {
      return this._iter(new _IterResult.CallbackIterResult('between', args, iterator));
    }
    var result = this._cacheGet('between', args);
    if (result === false) {
      result = this._iter(new _IterResult2.default('between', args));
      this._cacheAdd('between', result, args);
    }
    return result;
  },

  /**
   * Returns the last recurrence before the given datetime instance.
   * The inc keyword defines what happens if dt is an occurrence.
   * With inc == True, if dt itself is an occurrence, it will be returned.
   * @param {*} dt
   * @param {*} inc
   * @returns {Date|null}
   */
  before: function before(dt, inc) {
    var args = {
      dt: dt,
      inc: inc
    };
    var result = this._cacheGet('before', args);
    if (result === false) {
      result = this._iter(new _IterResult2.default('before', args));
      this._cacheAdd('before', result, args);
    }
    return result;
  },

  /**
   * Returns the first recurrence after the given datetime instance.
   * The inc keyword defines what happens if dt is an occurrence.
   * With inc == True, if dt itself is an occurrence, it will be returned.
   * @param {*} dt
   * @param {*} inc
   * @returns {Date|null}
   */
  after: function after(dt, inc) {
    var args = {
      dt: dt,
      inc: inc
    };
    var result = this._cacheGet('after', args);
    if (result === false) {
      result = this._iter(new _IterResult2.default('after', args));
      this._cacheAdd('after', result, args);
    }
    return result;
  },

  /**
   * Returns the number of recurrences in this set. It will have go trough
   * the whole recurrence, if this hasn't been done before.
   * @returns {number}
   */
  count: function count() {
    return this.all().length;
  },

  /**
   * Converts the rrule into its string representation
   * @see <http://www.ietf.org/rfc/rfc2445.txt>
   * @returns {string}
   */
  toString: function toString() {
    return RRule.optionsToString(this.origOptions);
  },

  /**
   * Will convert all rules described in nlp:ToText
   * to text.
   * @param {*} gettext
   * @param {*} language
   * @returns {string}
   */
  toText: function toText(gettext, language) {
    return (0, _nlp2.default)(RRule).toText(this, gettext, language);
  },

  /**
   * @returns {boolean}
   */
  isFullyConvertibleToText: function isFullyConvertibleToText() {
    return (0, _nlp2.default)(RRule).isFullyConvertible(this);
  },

  /**
   * @param {String} what - all/before/after/between
   * @param {Array|DateTime} value - an array of dates, one date, or null
   * @param {?Object} args - _iter arguments
   */
  _cacheAdd: function _cacheAdd(what, value, args) {
    if (!this._cache) {
      return;
    }

    if (value) {
      value = value instanceof _DateTime2.default ? dateutil.clone(value) : dateutil.cloneDates(value);
    }

    if (what === 'all') {
      this._cache.all = value;
    } else {
      args._value = value;
      this._cache[what].push(args);
    }
  },

  /**
   * @param {*} what
   * @param {*} args
   * @returns {boolean|null|Date|array} false - not in the cache
   *         null  - cached, but zero occurrences (before/after)
   *         Date  - cached (before/after)
   *         []    - cached, but zero occurrences (all/between)
   *         [Date1, DateN] - cached (all/between)
   */
  _cacheGet: function _cacheGet(what, args) {
    if (!this._cache) {
      return false;
    }

    var cached = false;
    var argsKeys = args ? Object.keys(args) : [];
    var findCacheDiff = function findCacheDiff(item) {
      for (var key, i = 0; i < argsKeys.length; i++) {
        key = argsKeys[i];
        if (String(args[key]) !== String(item[key])) {
          return true;
        }
      }
      return false;
    };

    if (what === 'all') {
      cached = this._cache.all;
    } else {
      // Let's see whether we've already called the
      // 'what' method with the same 'args'
      for (var item, i = 0; i < this._cache[what].length; i++) {
        item = this._cache[what][i];
        if (argsKeys.length && findCacheDiff(item)) {
          continue;
        }
        cached = item._value;
        break;
      }
    }

    if (!cached && this._cache.all) {
      // Not in the cache, but we already know all the occurrences,
      // so we can find the correct dates from the cached ones.
      var iterResult = new _IterResult2.default(what, args);
      for (i = 0; i < this._cache.all.length; i++) {
        if (!iterResult.accept(this._cache.all[i])) {
          break;
        }
      }
      cached = iterResult.getValue();
      this._cacheAdd(what, cached, args);
    }

    return cached instanceof Array ? dateutil.cloneDates(cached) : cached instanceof Date ? dateutil.clone(cached) : cached;
  },

  /**
   * @returns {RRule} a RRule instance with the same freq and options as this one (cache is not cloned)
   */
  clone: function clone() {
    return new RRule(this.origOptions);
  },

  _iter: function _iter(iterResult) {
    /* Since JavaScript doesn't have the python's yield operator (<1.7),
       we use the IterResult object that tells us when to stop iterating.
     */

    var dtstart = this.options.dtstart;
    var dtstartMillisecondModulo = this.options.dtstart % 1000;

    var year = dtstart.getFullYear();
    var month = dtstart.getMonth() + 1;
    var day = dtstart.getDate();
    var hour = dtstart.getHours();
    var minute = dtstart.getMinutes();
    var second = dtstart.getSeconds();
    var weekday = dateutil.getWeekday(dtstart);

    // Some local variables to speed things up a bit
    var freq = this.options.freq;
    var interval = this.options.interval;
    var wkst = this.options.wkst;
    var until = this.options.until;
    var bymonth = this.options.bymonth;
    var byweekno = this.options.byweekno;
    var byyearday = this.options.byyearday;
    var byweekday = this.options.byweekday;
    var byeaster = this.options.byeaster;
    var bymonthday = this.options.bymonthday;
    var bynmonthday = this.options.bynmonthday;
    var bysetpos = this.options.bysetpos;
    var byhour = this.options.byhour;
    var byminute = this.options.byminute;
    var bysecond = this.options.bysecond;

    var ii = new _Iterinfo2.default(this);
    ii.rebuild(year, month);

    var getdayset = {};
    getdayset[RRule.YEARLY] = ii.ydayset;
    getdayset[RRule.MONTHLY] = ii.mdayset;
    getdayset[RRule.WEEKLY] = ii.wdayset;
    getdayset[RRule.DAILY] = ii.ddayset;
    getdayset[RRule.HOURLY] = ii.ddayset;
    getdayset[RRule.MINUTELY] = ii.ddayset;
    getdayset[RRule.SECONDLY] = ii.ddayset;

    getdayset = getdayset[freq];

    var timeset;
    if (freq < RRule.HOURLY) {
      timeset = this.timeset;
    } else {
      var gettimeset = {};
      gettimeset[RRule.HOURLY] = ii.htimeset;
      gettimeset[RRule.MINUTELY] = ii.mtimeset;
      gettimeset[RRule.SECONDLY] = ii.stimeset;
      gettimeset = gettimeset[freq];
      if (freq >= RRule.HOURLY && (0, _utils.plb)(byhour) && !(0, _utils.contains)(byhour, hour) || freq >= RRule.MINUTELY && (0, _utils.plb)(byminute) && !(0, _utils.contains)(byminute, minute) || freq >= RRule.SECONDLY && (0, _utils.plb)(bysecond) && !(0, _utils.contains)(bysecond, minute)) {
        timeset = [];
      } else {
        timeset = gettimeset.call(ii, hour, minute, second, dtstartMillisecondModulo);
      }
    }

    var total = 0;
    var count = this.options.count;
    var i;
    var j;
    var k;
    var dm;
    var div;
    var mod;
    var tmp;
    var pos;
    var dayset;
    var start;
    var end;
    var fixday;
    var filtered;

    while (true) {
      // eslint-disable-line no-constant-condition
      // Get dayset with the right frequency
      tmp = getdayset.call(ii, year, month, day);
      dayset = tmp[0];
      start = tmp[1];
      end = tmp[2];

      // Do the "hard" work ;-)
      filtered = false;
      for (j = start; j < end; j++) {
        i = dayset[j];

        filtered = (0, _utils.plb)(bymonth) && !(0, _utils.contains)(bymonth, ii.mmask[i]) || (0, _utils.plb)(byweekno) && !ii.wnomask[i] || (0, _utils.plb)(byweekday) && !(0, _utils.contains)(byweekday, ii.wdaymask[i]) || (0, _utils.plb)(ii.nwdaymask) && !ii.nwdaymask[i] || byeaster !== null && !(0, _utils.contains)(ii.eastermask, i) || ((0, _utils.plb)(bymonthday) || (0, _utils.plb)(bynmonthday)) && !(0, _utils.contains)(bymonthday, ii.mdaymask[i]) && !(0, _utils.contains)(bynmonthday, ii.nmdaymask[i]) || (0, _utils.plb)(byyearday) && (i < ii.yearlen && !(0, _utils.contains)(byyearday, i + 1) && !(0, _utils.contains)(byyearday, -ii.yearlen + i) || i >= ii.yearlen && !(0, _utils.contains)(byyearday, i + 1 - ii.yearlen) && !(0, _utils.contains)(byyearday, -ii.nextyearlen + i - ii.yearlen));

        if (filtered) {
          dayset[i] = null;
        }
      }

      // Output results
      if ((0, _utils.plb)(bysetpos) && (0, _utils.plb)(timeset)) {
        var daypos;
        var timepos;
        var poslist = [];

        for (i, j = 0; j < bysetpos.length; j++) {
          pos = bysetpos[j];

          if (pos < 0) {
            daypos = Math.floor(pos / timeset.length);
            timepos = (0, _utils.pymod)(pos, timeset.length);
          } else {
            daypos = Math.floor((pos - 1) / timeset.length);
            timepos = (0, _utils.pymod)(pos - 1, timeset.length);
          }

          try {
            tmp = [];
            for (k = start; k < end; k++) {
              var val = dayset[k];
              if (val === null) {
                continue;
              }
              tmp.push(val);
            }
            if (daypos < 0) {
              // we're trying to emulate python's aList[-n]
              i = tmp.slice(daypos)[0];
            } else {
              i = tmp[daypos];
            }

            var time = timeset[timepos];
            var date = dateutil.fromOrdinal(ii.yearordinal + i);
            var res = dateutil.combine(date, time);
            // XXX: can this ever be in the array?
            // - compare the actual date instead?
            if (!(0, _utils.contains)(poslist, res)) {
              poslist.push(res);
            }
          } catch (e) {
            // empty
          }
        }

        dateutil.sort(poslist);
        for (j = 0; j < poslist.length; j++) {
          res = poslist[j];
          if (until && res > until) {
            this._len = total;
            return iterResult.getValue();
          } else if (res >= dtstart) {
            ++total;
            if (!iterResult.accept(res)) {
              return iterResult.getValue();
            }
            if (count) {
              --count;
              if (!count) {
                this._len = total;
                return iterResult.getValue();
              }
            }
          }
        }
      } else {
        for (j = start; j < end; j++) {
          i = dayset[j];
          if (i !== null) {
            date = dateutil.fromOrdinal(ii.yearordinal + i);
            for (k = 0; k < timeset.length; k++) {
              time = timeset[k];
              res = dateutil.combine(date, time);
              if (until && res > until) {
                this._len = total;
                return iterResult.getValue();
              } else if (res >= dtstart) {
                ++total;
                if (!iterResult.accept(res)) {
                  return iterResult.getValue();
                }
                if (count) {
                  --count;
                  if (!count) {
                    this._len = total;
                    return iterResult.getValue();
                  }
                }
              }
            }
          }
        }
      }

      // Handle frequency and interval
      fixday = false;
      if (freq === RRule.YEARLY) {
        year += interval;
        if (year > dateutil.MAXYEAR) {
          this._len = total;
          return iterResult.getValue();
        }
        ii.rebuild(year, month);
      } else if (freq === RRule.MONTHLY) {
        month += interval;
        if (month > 12) {
          div = Math.floor(month / 12);
          mod = (0, _utils.pymod)(month, 12);
          month = mod;
          year += div;
          if (month === 0) {
            month = 12;
            --year;
          }
          if (year > dateutil.MAXYEAR) {
            this._len = total;
            return iterResult.getValue();
          }
        }
        ii.rebuild(year, month);
      } else if (freq === RRule.WEEKLY) {
        if (wkst > weekday) {
          day += -(weekday + 1 + (6 - wkst)) + interval * 7;
        } else {
          day += -(weekday - wkst) + interval * 7;
        }
        weekday = wkst;
        fixday = true;
      } else if (freq === RRule.DAILY) {
        day += interval;
        fixday = true;
      } else if (freq === RRule.HOURLY) {
        if (filtered) {
          // Jump to one iteration before next day
          hour += Math.floor((23 - hour) / interval) * interval;
        }
        while (true) {
          // eslint-disable-line no-constant-condition
          hour += interval;
          dm = (0, _utils.divmod)(hour, 24);
          div = dm.div;
          mod = dm.mod;
          if (div) {
            hour = mod;
            day += div;
            fixday = true;
          }
          if (!(0, _utils.plb)(byhour) || (0, _utils.contains)(byhour, hour)) {
            break;
          }
        }
        timeset = gettimeset.call(ii, hour, minute, second);
      } else if (freq === RRule.MINUTELY) {
        if (filtered) {
          // Jump to one iteration before next day
          minute += Math.floor((1439 - (hour * 60 + minute)) / interval) * interval;
        }

        while (true) {
          // eslint-disable-line no-constant-condition
          minute += interval;
          dm = (0, _utils.divmod)(minute, 60);
          div = dm.div;
          mod = dm.mod;
          if (div) {
            minute = mod;
            hour += div;
            dm = (0, _utils.divmod)(hour, 24);
            div = dm.div;
            mod = dm.mod;
            if (div) {
              hour = mod;
              day += div;
              fixday = true;
              filtered = false;
            }
          }
          if ((!(0, _utils.plb)(byhour) || (0, _utils.contains)(byhour, hour)) && (!(0, _utils.plb)(byminute) || (0, _utils.contains)(byminute, minute))) {
            break;
          }
        }
        timeset = gettimeset.call(ii, hour, minute, second);
      } else if (freq === RRule.SECONDLY) {
        if (filtered) {
          // Jump to one iteration before next day
          second += Math.floor((86399 - (hour * 3600 + minute * 60 + second)) / interval) * interval;
        }
        while (true) {
          // eslint-disable-line no-constant-condition
          second += interval;
          dm = (0, _utils.divmod)(second, 60);
          div = dm.div;
          mod = dm.mod;
          if (div) {
            second = mod;
            minute += div;
            dm = (0, _utils.divmod)(minute, 60);
            div = dm.div;
            mod = dm.mod;
            if (div) {
              minute = mod;
              hour += div;
              dm = (0, _utils.divmod)(hour, 24);
              div = dm.div;
              mod = dm.mod;
              if (div) {
                hour = mod;
                day += div;
                fixday = true;
              }
            }
          }
          if ((!(0, _utils.plb)(byhour) || (0, _utils.contains)(byhour, hour)) && (!(0, _utils.plb)(byminute) || (0, _utils.contains)(byminute, minute)) && (!(0, _utils.plb)(bysecond) || (0, _utils.contains)(bysecond, second))) {
            break;
          }
        }
        timeset = gettimeset.call(ii, hour, minute, second);
      }

      if (fixday && day > 28) {
        var daysinmonth = dateutil.monthRange(year, month - 1)[1];
        if (day > daysinmonth) {
          while (day > daysinmonth) {
            day -= daysinmonth;
            ++month;
            if (month === 13) {
              month = 1;
              ++year;
              if (year > dateutil.MAXYEAR) {
                this._len = total;
                return iterResult.getValue();
              }
            }
            daysinmonth = dateutil.monthRange(year, month - 1)[1];
          }
          ii.rebuild(year, month);
        }
      }
    }
  }

  /**
   * @param {string} rfcString
   * @returns {Object}
   */
};RRule.parseString = function (rfcString) {
  rfcString = rfcString.replace(/^\s+|\s+$/, '');
  if (!rfcString.length) {
    return null;
  }

  var i;
  var j;
  var key;
  var value;
  var attr;
  var attrs = rfcString.split(';');
  var options = {};

  for (i = 0; i < attrs.length; i++) {
    attr = attrs[i].split('=');
    key = attr[0];
    value = attr[1];
    switch (key) {
      case 'FREQ':
        options.freq = RRule[value];
        break;
      case 'WKST':
        options.wkst = RRule[value];
        break;
      case 'COUNT':
      case 'INTERVAL':
      case 'BYSETPOS':
      case 'BYMONTH':
      case 'BYMONTHDAY':
      case 'BYYEARDAY':
      case 'BYWEEKNO':
      case 'BYHOUR':
      case 'BYMINUTE':
      case 'BYSECOND':
        if (value.indexOf(',') !== -1) {
          value = value.split(',');
          for (j = 0; j < value.length; j++) {
            if (/^[+-]?\d+$/.test(value[j])) {
              value[j] = Number(value[j]);
            }
          }
        } else if (/^[+-]?\d+$/.test(value)) {
          value = Number(value);
        }
        key = key.toLowerCase();
        options[key] = value;
        break;
      case 'BYDAY':
        // => byweekday
        var n;
        var wday;
        var day;
        var days = value.split(',');

        options.byweekday = [];
        for (j = 0; j < days.length; j++) {
          day = days[j];
          if (day.length === 2) {
            // MO, TU, ...
            wday = RRule[day]; // wday instanceof Weekday
            options.byweekday.push(wday);
          } else {
            // -1MO, +3FR, 1SO, ...
            day = day.match(/^([+-]?\d)([A-Z]{2})$/);
            n = Number(day[1]);
            wday = day[2];
            wday = RRule[wday].weekday;
            options.byweekday.push(new _Weekday2.default(wday, n));
          }
        }
        break;
      case 'DTSTART':
        options.dtstart = dateutil.untilStringToDate(value);
        break;
      case 'UNTIL':
        options.until = dateutil.untilStringToDate(value);
        break;
      case 'BYEASTER':
        options.byeaster = Number(value);
        break;
      default:
        throw new Error('Unknown RRULE property \'' + key + '\'');
    }
  }
  return options;
};

/**
 * @param {string} string
 * @returns {RRule}
 */
RRule.fromString = function (string) {
  return new RRule(RRule.parseString(string));
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ORDINAL_BASE = exports.PY_WEEKDAYS = exports.ONE_DAY = exports.MAXYEAR = exports.MONTH_DAYS = undefined;
exports.getYearDay = getYearDay;
exports.isLeapYear = isLeapYear;
exports.tzOffset = tzOffset;
exports.daysBetween = daysBetween;
exports.toOrdinal = toOrdinal;
exports.fromOrdinal = fromOrdinal;
exports.monthRange = monthRange;
exports.getMonthDays = getMonthDays;
exports.getWeekday = getWeekday;
exports.combine = combine;
exports.clone = clone;
exports.cloneDates = cloneDates;
exports.sort = sort;
exports.timeToUntilString = timeToUntilString;
exports.untilStringToDate = untilStringToDate;

var _DateTime = __webpack_require__(0);

var _DateTime2 = _interopRequireDefault(_DateTime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MONTH_DAYS = exports.MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * @see: <http://docs.python.org/library/datetime.html#datetime.MAXYEAR>
 */
/**
 * General date-related utilities.
 * Also handles several incompatibilities between JavaScript and Python
 *
 */

var MAXYEAR = exports.MAXYEAR = 9999;

/**
 * Number of milliseconds of one day
 */
var ONE_DAY = exports.ONE_DAY = 1000 * 60 * 60 * 24;

/**
 * Python: MO-SU: 0 - 6
 * JS: SU-SAT 0 - 6
 */
var PY_WEEKDAYS = exports.PY_WEEKDAYS = [6, 0, 1, 2, 3, 4, 5];

/**
 * Python uses 1-Jan-1 as the base for calculating ordinals but we don't
 * want to confuse the JS engine with milliseconds > Number.MAX_NUMBER,
 * therefore we use 1-Jan-1970 instead
 */
var ORDINAL_BASE = exports.ORDINAL_BASE = new _DateTime2.default(1970, 0, 1);

/**
 *
 * @param {DateTime} date
 * @returns {number}
 */
function getYearDay(date) {
  var dateNoTime = new _DateTime2.default(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.ceil((dateNoTime - new _DateTime2.default(date.getFullYear(), 0, 1)) / ONE_DAY) + 1;
}

/**
 *
 * @param {DateTime} year
 * @returns {boolean}
 */
function isLeapYear(year) {
  if (year instanceof _DateTime2.default) {
    year = year.getFullYear();
  }
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}

/**
 * @param {DateTime} date
 * @returns {number} the date's timezone offset in ms
 */
function tzOffset(date) {
  return date.getTimezoneOffset() * 60 * 1000;
}

/**
 * @see: <http://www.mcfedries.com/JavaScript/DaysBetween.asp>
 * @param {*} date1
 * @param {*} date2
 * @returns {number}
 */
function daysBetween(date1, date2) {
  // The number of milliseconds in one day
  // Convert both dates to milliseconds
  var msDate1 = date1.getTime() - tzOffset(date1);
  var msDate2 = date2.getTime() - tzOffset(date2);
  // Calculate the difference in milliseconds
  var msDifference = Math.abs(msDate1 - msDate2);
  // Convert back to days and return
  return Math.round(msDifference / ONE_DAY);
}

/**
 * @see: <http://docs.python.org/library/datetime.html#datetime.date.toordinal>
 * @param {*} date
 * @returns {number}
 */
function toOrdinal(date) {
  return daysBetween(date, ORDINAL_BASE);
}

/**
 * @see - <http://docs.python.org/library/datetime.html#datetime.date.fromordinal>
 * @param {*} ordinal
 * @returns {DateTime}
 */
function fromOrdinal(ordinal) {
  var millisecsFromBase = ordinal * ONE_DAY;
  return new _DateTime2.default(ORDINAL_BASE.getTime() - tzOffset(ORDINAL_BASE) + millisecsFromBase + tzOffset(new _DateTime2.default(millisecsFromBase)));
}

/**
 * @see: <http://docs.python.org/library/calendar.html#calendar.monthrange>
 * @param {*} year
 * @param {*} month
 * @returns {array}
 */
function monthRange(year, month) {
  var date = new _DateTime2.default(year, month, 1);
  return [getWeekday(date), getMonthDays(date)];
}

/**
 *
 * @param {*} date
 * @returns {number}
 */
function getMonthDays(date) {
  var month = date.getMonth();
  return month === 1 && isLeapYear(date) ? 29 : MONTH_DAYS[month];
}

/**
 *
 * @param {*} date
 * @returns {number} python-like weekday
 */
function getWeekday(date) {
  return PY_WEEKDAYS[date.getDay()];
}

/**
 * @see: <http://docs.python.org/library/datetime.html#datetime.datetime.combine>
 * @param {*} date
 * @param {*} time
 * @returns {DateTime}
 */
function combine(date, time) {
  time = time || date;
  return new _DateTime2.default(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
}

/**
 *
 * @param {*} date
 * @returns {DateTime}
 */
function clone(date) {
  return new _DateTime2.default(date.getTime());
}

/**
 *
 * @param {*} dates
 * @returns {DateTime}
 */
function cloneDates(dates) {
  var clones = [];
  for (var i = 0; i < dates.length; i++) {
    clones.push(clone(dates[i]));
  }
  return clones;
}

/**
 * Sorts an array of Date or Time objects
 * @param {*} dates
 */
function sort(dates) {
  dates.sort(function (a, b) {
    return a.getTime() - b.getTime();
  });
}

/**
 *
 * @param {*} time
 * @returns {string}
 */
function timeToUntilString(time) {
  var comp;
  var date = new _DateTime2.default(time);
  var comps = [date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate(), 'T', date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), 'Z'];

  for (var i = 0; i < comps.length; i++) {
    comp = comps[i];
    if (!/[TZ]/.test(comp) && comp < 10) {
      comps[i] = '0' + String(comp);
    }
  }
  return comps.join('');
}

/**
 *
 * @param {*} until
 * @returns {DateTime}
 */
function untilStringToDate(until) {
  var re = /^(\d{4})(\d{2})(\d{2})(T(\d{2})(\d{2})(\d{2})Z)?$/;
  var bits = re.exec(until);
  if (!bits) {
    throw new Error('Invalid UNTIL value: ' + until);
  }
  return new _DateTime2.default(_DateTime2.default.UTC( // eslint-disable-line new-cap
  bits[1], bits[2] - 1, bits[3], bits[5] || 0, bits[6] || 0, bits[7] || 0));
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Weekday;
function Weekday(weekday, n) {
  if (n === 0) {
    throw new Error('Can\'t create weekday with n == 0');
  }
  this.weekday = weekday;
  this.n = n;
}

Weekday.prototype = {
  constructor: Weekday,
  // __call__ - Cannot call the object directly, do it through
  // e.g. RRule.TH.nth(-1) instead,
  nth: function nth(n) {
    return this.n === n ? this : new Weekday(this.weekday, n);
  },

  // __eq__
  equals: function equals(other) {
    return this.weekday === other.weekday && this.n === other.n;
  },

  // __repr__
  toString: function toString() {
    var s = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'][this.weekday];
    if (this.n) {
      s = (this.n > 0 ? '+' : '') + String(this.n) + s;
    }
    return s;
  },

  getJsWeekday: function getJsWeekday() {
    return this.weekday === 6 ? 0 : this.weekday + 1;
  }

};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Time;
function Time(hour, minute, second, millisecond) {
  this.hour = hour;
  this.minute = minute;
  this.second = second;
  this.millisecond = millisecond || 0;
}

Time.prototype = {
  constructor: Time,
  getHours: function getHours() {
    return this.hour;
  },
  getMinutes: function getMinutes() {
    return this.minute;
  },
  getSeconds: function getSeconds() {
    return this.second;
  },
  getMilliseconds: function getMilliseconds() {
    return this.millisecond;
  },
  getTime: function getTime() {
    return (this.hour * 60 * 60 + this.minute * 60 + this.second) * 1000 + this.millisecond;
  }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = RRuleSet;

var _RRule = __webpack_require__(2);

var _RRule2 = _interopRequireDefault(_RRule);

var _DateTime = __webpack_require__(0);

var _DateTime2 = _interopRequireDefault(_DateTime);

var _dateutil = __webpack_require__(3);

var dateutil = _interopRequireWildcard(_dateutil);

var _utils = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * @param {Boolean?} noCache
 *  The same stratagy as RRule on cache, default to false
 * @constructor
 */

function RRuleSet(noCache) {
  // Let RRuleSet cacheable
  this._cache = noCache ? null : {
    all: false,
    before: [],
    after: [],
    between: []
  };
  this._rrule = [];
  this._rdate = [];
  this._exrule = [];
  this._exdate = [];
}

RRuleSet.prototype = {
  constructor: RRuleSet,

  /**
   * @param {RRule} rrule
   */
  rrule: function rrule(_rrule) {
    if (!(_rrule instanceof _RRule2.default)) {
      throw new TypeError(String(_rrule) + ' is not RRule instance');
    }
    if (!(0, _utils.contains)(this._rrule.map(String), String(_rrule))) {
      this._rrule.push(_rrule);
    }
  },

  /**
   * @param {Date} date
   */
  rdate: function rdate(date) {
    if (!(date instanceof _DateTime2.default)) {
      throw new TypeError(String(date) + ' is not Date instance');
    }
    if (!(0, _utils.contains)(this._rdate.map(Number), Number(date))) {
      this._rdate.push(date);
      dateutil.sort(this._rdate);
    }
  },

  /**
   * @param {RRule} rrule
   */
  exrule: function exrule(rrule) {
    if (!(rrule instanceof _RRule2.default)) {
      throw new TypeError(String(rrule) + ' is not RRule instance');
    }
    if (!(0, _utils.contains)(this._exrule.map(String), String(rrule))) {
      this._exrule.push(rrule);
    }
  },

  /**
   * @param {Date} date
   */
  exdate: function exdate(date) {
    if (!(date instanceof _DateTime2.default)) {
      throw new TypeError(String(date) + ' is not Date instance');
    }
    if (!(0, _utils.contains)(this._exdate.map(Number), Number(date))) {
      this._exdate.push(date);
      dateutil.sort(this._exdate);
    }
  },

  valueOf: function valueOf() {
    var result = [];
    if (this._rrule.length) {
      this._rrule.forEach(function (rrule) {
        result.push('RRULE:' + rrule);
      });
    }
    if (this._rdate.length) {
      result.push('RDATE:' + this._rdate.map(function (rdate) {
        return dateutil.timeToUntilString(rdate);
      }).join(','));
    }
    if (this._exrule.length) {
      this._exrule.forEach(function (exrule) {
        result.push('EXRULE:' + exrule);
      });
    }
    if (this._exdate.length) {
      result.push('EXDATE:' + this._exdate.map(function (exdate) {
        return dateutil.timeToUntilString(exdate);
      }).join(','));
    }
    return result;
  },

  /**
   * to generate recurrence field sush as:
   *   ["RRULE:FREQ=YEARLY;COUNT=2;BYDAY=TU;DTSTART=19970902T010000Z","RRULE:FREQ=YEARLY;COUNT=1;BYDAY=TH;DTSTART=19970902T010000Z"]
   * @returns {string}
   */
  toString: function toString() {
    return JSON.stringify(this.valueOf());
  },

  _iter: function _iter(iterResult) {
    var _exdateHash = {};
    var _exrule = this._exrule;
    var _accept = iterResult.accept;

    function evalExdate(after, before) {
      _exrule.forEach(function (rrule) {
        rrule.between(after, before, true).forEach(function (date) {
          _exdateHash[Number(date)] = true;
        });
      });
    }

    this._exdate.forEach(function (date) {
      _exdateHash[Number(date)] = true;
    });

    iterResult.accept = function (date) {
      var dt = Number(date);
      if (!_exdateHash[dt]) {
        evalExdate(new _DateTime2.default(dt - 1), new _DateTime2.default(dt + 1));
        if (!_exdateHash[dt]) {
          _exdateHash[dt] = true;
          return _accept.call(this, date);
        }
      }
      return true;
    };

    if (iterResult.method === 'between') {
      evalExdate(iterResult.args.after, iterResult.args.before);
      iterResult.accept = function (date) {
        var dt = Number(date);
        if (!_exdateHash[dt]) {
          _exdateHash[dt] = true;
          return _accept.call(this, date);
        }
        return true;
      };
    }

    for (var i = 0; i < this._rdate.length; i++) {
      if (!iterResult.accept(new _DateTime2.default(this._rdate[i]))) {
        break;
      }
    }

    this._rrule.forEach(function (rrule) {
      rrule._iter(iterResult);
    });

    var res = iterResult._result;
    dateutil.sort(res);
    switch (iterResult.method) {
      case 'all':
      case 'between':
        return res;
      case 'before':
        return res.length && res[res.length - 1] || null;
      case 'after':
        return res.length && res[0] || null;
      default:
        return null;
    }
  },

  /**
   * Create a new RRuleSet Object completely base on current instance
   * @returns {RRuleSet}
   */
  clone: function clone() {
    var rrs = new RRuleSet(Boolean(this._cache));
    var i;
    for (i = 0; i < this._rrule.length; i++) {
      rrs.rrule(this._rrule[i].clone());
    }
    for (i = 0; i < this._rdate.length; i++) {
      rrs.rdate(new _DateTime2.default(this._rdate[i]));
    }
    for (i = 0; i < this._exrule.length; i++) {
      rrs.exrule(this._exrule[i].clone());
    }
    for (i = 0; i < this._exdate.length; i++) {
      rrs.exdate(new _DateTime2.default(this._exdate[i]));
    }
    return rrs;
  }

  /**
   * Inherts method from RRule
   *  add Read interface and set RRuleSet cacheable
   */
};var RRuleSetMethods = ['all', 'between', 'before', 'after', 'count', '_cacheAdd', '_cacheGet'];
RRuleSetMethods.forEach(function (method) {
  RRuleSet.prototype[method] = _RRule2.default.prototype[method];
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rrulestr = exports.RRuleSet = exports.DateTime = exports.RRule = exports.default = undefined;

var _RRule = __webpack_require__(2);

var _RRule2 = _interopRequireDefault(_RRule);

var _DateTime = __webpack_require__(0);

var _DateTime2 = _interopRequireDefault(_DateTime);

var _RRuleSet = __webpack_require__(6);

var _RRuleSet2 = _interopRequireDefault(_RRuleSet);

var _RRuleStr = __webpack_require__(12);

var _RRuleStr2 = _interopRequireDefault(_RRuleStr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Only one RRuleStr instance for all rrule string parsing work.
/**
 * rrule.js - Library for working with recurrence rules for calendar dates.
 * https://github.com/jakubroztocil/rrule
 *
 * Copyright 2010, Jakub Roztocil and Lars Schoning
 * Licenced under the BSD licence.
 * https://github.com/jakubroztocil/rrule/blob/master/LICENCE
 *
 * Based on:
 * python-dateutil - Extensions to the standard Python datetime module.
 * Copyright (c) 2003-2011 - Gustavo Niemeyer <gustavo@niemeyer.net>
 * Copyright (c) 2012 - Tomi Pieviläinen <tomi.pievilainen@iki.fi>
 * https://github.com/jakubroztocil/rrule/blob/master/LICENCE
 *
 */

var rruleStr = new _RRuleStr2.default();

function rrulestr() {
  return rruleStr.parse.apply(rruleStr, arguments);
}

_RRule2.default.RRule = _RRule2.default;
_RRule2.default.DateTime = _DateTime2.default;
_RRule2.default.RRuleSet = _RRuleSet2.default;
_RRule2.default.rrulestr = rrulestr;

exports.default = _RRule2.default;
exports.RRule = _RRule2.default;
exports.DateTime = _DateTime2.default;
exports.RRuleSet = _RRuleSet2.default;
exports.rrulestr = rrulestr;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (RRule) {
  /**
   *
   * @param {RRule} rrule
   * Optional:
   * @param {Function} gettext function
   * @param {Object} language definition
   * @constructor
   */
  var ToText = function ToText(rrule, gettext, language) {
    this.text = '';
    this.language = language || ENGLISH;
    this.gettext = gettext || function (id) {
      return id;
    };

    this.rrule = rrule;
    this.freq = rrule.options.freq;
    this.options = rrule.options;
    this.origOptions = rrule.origOptions;

    if (this.origOptions.bymonthday) {
      var bymonthday = [].concat(this.options.bymonthday);
      var bynmonthday = [].concat(this.options.bynmonthday);

      bymonthday.sort();
      bynmonthday.sort();
      bynmonthday.reverse();
      // 1, 2, 3, .., -5, -4, -3, ..
      this.bymonthday = bymonthday.concat(bynmonthday);
      if (!this.bymonthday.length) {
        this.bymonthday = null;
      }
    }

    if (this.origOptions.byweekday) {
      var byweekday = !(this.origOptions.byweekday instanceof Array) ? [this.origOptions.byweekday] : this.origOptions.byweekday;
      var days = String(byweekday);

      this.byweekday = {
        allWeeks: byweekday.filter(function (weekday) {
          return !Boolean(weekday.n); // eslint-disable-line
        }),
        someWeeks: byweekday.filter(function (weekday) {
          return Boolean(weekday.n);
        }),
        isWeekdays: days.indexOf('MO') !== -1 && days.indexOf('TU') !== -1 && days.indexOf('WE') !== -1 && days.indexOf('TH') !== -1 && days.indexOf('FR') !== -1 && days.indexOf('SA') === -1 && days.indexOf('SU') === -1
      };

      var sortWeekDays = function sortWeekDays(a, b) {
        return a.weekday - b.weekday;
      };

      this.byweekday.allWeeks.sort(sortWeekDays);
      this.byweekday.someWeeks.sort(sortWeekDays);

      if (!this.byweekday.allWeeks.length) {
        this.byweekday.allWeeks = null;
      }
      if (!this.byweekday.someWeeks.length) {
        this.byweekday.someWeeks = null;
      }
    } else {
      this.byweekday = null;
    }
  };

  var common = ['count', 'until', 'interval', 'byweekday', 'bymonthday', 'bymonth'];
  ToText.IMPLEMENTED = [];
  ToText.IMPLEMENTED[RRule.HOURLY] = common;
  ToText.IMPLEMENTED[RRule.DAILY] = ['byhour'].concat(common);
  ToText.IMPLEMENTED[RRule.WEEKLY] = common;
  ToText.IMPLEMENTED[RRule.MONTHLY] = common;
  ToText.IMPLEMENTED[RRule.YEARLY] = ['byweekno', 'byyearday'].concat(common);

  /**
   * Test whether the rrule can be fully converted to text.
   * @param {RRule} rrule
   * @returns {Boolean}
   */
  ToText.isFullyConvertible = function (rrule) {
    var canConvert = true;

    if (!(rrule.options.freq in ToText.IMPLEMENTED)) {
      return false;
    }
    if (rrule.origOptions.until && rrule.origOptions.count) {
      return false;
    }

    for (var key in rrule.origOptions) {
      if (contains(['dtstart', 'wkst', 'freq'], key)) {
        return true;
      }
      if (!contains(ToText.IMPLEMENTED[rrule.options.freq], key)) {
        return false;
      }
    }

    return canConvert;
  };

  ToText.prototype = {
    constructor: ToText,

    isFullyConvertible: function isFullyConvertible() {
      return ToText.isFullyConvertible(this.rrule);
    },

    /**
     * Perform the conversion. Only some of the frequencies are supported.
     * If some of the rrule's options aren't supported, they'll
     * be omitted from the output an "(~ approximate)" will be appended.
     * @returns {*}
     */
    toString: function toString() {
      var gettext = this.gettext;

      if (!(this.options.freq in ToText.IMPLEMENTED)) {
        return gettext('RRule error: Unable to fully convert this rrule to text');
      }

      this.text = [gettext('every')];
      this[RRule.FREQUENCIES[this.options.freq]]();

      if (this.options.until) {
        this.add(gettext('until'));
        var until = this.options.until;
        this.add(this.language.monthNames[until.getMonth()]).add(until.getDate() + ',').add(until.getFullYear());
      } else if (this.options.count) {
        this.add(gettext('for')).add(this.options.count).add(this.plural(this.options.count) ? gettext('times') : gettext('time'));
      }

      if (!this.isFullyConvertible()) {
        this.add(gettext('(~ approximate)'));
      }

      return this.text.join('');
    },

    HOURLY: function HOURLY() {
      var gettext = this.gettext;

      if (this.options.interval !== 1) {
        this.add(this.options.interval);
      }

      this.add(this.plural(this.options.interval) ? gettext('hours') : gettext('hour'));
    },

    DAILY: function DAILY() {
      var gettext = this.gettext;

      if (this.options.interval !== 1) {
        this.add(this.options.interval);
      }

      if (this.byweekday && this.byweekday.isWeekdays) {
        this.add(this.plural(this.options.interval) ? gettext('weekdays') : gettext('weekday'));
      } else {
        this.add(this.plural(this.options.interval) ? gettext('days') : gettext('day'));
      }

      if (this.origOptions.bymonth) {
        this.add(gettext('in'));
        this._bymonth();
      }

      if (this.bymonthday) {
        this._bymonthday();
      } else if (this.byweekday) {
        this._byweekday();
      } else if (this.origOptions.byhour) {
        this._byhour();
      }
    },

    WEEKLY: function WEEKLY() {
      var gettext = this.gettext;

      if (this.options.interval !== 1) {
        this.add(this.options.interval).add(this.plural(this.options.interval) ? gettext('weeks') : gettext('week'));
      }

      if (this.byweekday && this.byweekday.isWeekdays) {
        if (this.options.interval === 1) {
          this.add(this.plural(this.options.interval) ? gettext('weekdays') : gettext('weekday'));
        } else {
          this.add(gettext('on')).add(gettext('weekdays'));
        }
      } else {
        if (this.options.interval === 1) {
          this.add(gettext('week'));
        }

        if (this.origOptions.bymonth) {
          this.add(gettext('in'));
          this._bymonth();
        }

        if (this.bymonthday) {
          this._bymonthday();
        } else if (this.byweekday) {
          this._byweekday();
        }
      }
    },

    MONTHLY: function MONTHLY() {
      var gettext = this.gettext;

      if (this.origOptions.bymonth) {
        if (this.options.interval !== 1) {
          this.add(this.options.interval).add(gettext('months'));
          if (this.plural(this.options.interval)) {
            this.add(gettext('in'));
          }
        } else {
          // this.add(gettext('MONTH'))
        }
        this._bymonth();
      } else {
        if (this.options.interval !== 1) {
          this.add(this.options.interval);
        }
        this.add(this.plural(this.options.interval) ? gettext('months') : gettext('month'));
      }
      if (this.bymonthday) {
        this._bymonthday();
      } else if (this.byweekday && this.byweekday.isWeekdays) {
        this.add(gettext('on')).add(gettext('weekdays'));
      } else if (this.byweekday) {
        this._byweekday();
      }
    },

    YEARLY: function YEARLY() {
      var gettext = this.gettext;

      if (this.origOptions.bymonth) {
        if (this.options.interval !== 1) {
          this.add(this.options.interval);
          this.add(gettext('years'));
        } else {
          // this.add(gettext('YEAR'))
        }
        this._bymonth();
      } else {
        if (this.options.interval !== 1) {
          this.add(this.options.interval);
        }
        this.add(this.plural(this.options.interval) ? gettext('years') : gettext('year'));
      }

      if (this.bymonthday) {
        this._bymonthday();
      } else if (this.byweekday) {
        this._byweekday();
      }

      if (this.options.byyearday) {
        this.add(gettext('on the')).add(this.list(this.options.byyearday, this.nth, gettext('and'))).add(gettext('day'));
      }

      if (this.options.byweekno) {
        this.add(gettext('in')).add(this.plural(this.options.byweekno.length) ? gettext('weeks') : gettext('week')).add(this.list(this.options.byweekno, null, gettext('and')));
      }
    },

    _bymonthday: function _bymonthday() {
      var gettext = this.gettext;
      if (this.byweekday && this.byweekday.allWeeks) {
        this.add(gettext('on')).add(this.list(this.byweekday.allWeeks, this.weekdaytext, gettext('or'))).add(gettext('the')).add(this.list(this.bymonthday, this.nth, gettext('or')));
      } else {
        this.add(gettext('on the')).add(this.list(this.bymonthday, this.nth, gettext('and')));
      }
      // this.add(gettext('DAY'))
    },

    _byweekday: function _byweekday() {
      var gettext = this.gettext;
      if (this.byweekday.allWeeks && !this.byweekday.isWeekdays) {
        this.add(gettext('on')).add(this.list(this.byweekday.allWeeks, this.weekdaytext));
      }

      if (this.byweekday.someWeeks) {
        if (this.byweekday.allWeeks) {
          this.add(gettext('and'));
        }

        this.add(gettext('on the')).add(this.list(this.byweekday.someWeeks, this.weekdaytext, gettext('and')));
      }
    },

    _byhour: function _byhour() {
      var gettext = this.gettext;

      this.add(gettext('at')).add(this.list(this.origOptions.byhour, null, gettext('and')));
    },

    _bymonth: function _bymonth() {
      this.add(this.list(this.options.bymonth, this.monthtext, this.gettext('and')));
    },

    nth: function nth(n) {
      var nth;
      var npos;
      var gettext = this.gettext;

      if (n === -1) {
        return gettext('last');
      }

      npos = Math.abs(n);
      switch (npos) {
        case 1:
        case 21:
        case 31:
          nth = npos + gettext('st');
          break;
        case 2:
        case 22:
          nth = npos + gettext('nd');
          break;
        case 3:
        case 23:
          nth = npos + gettext('rd');
          break;
        default:
          nth = npos + gettext('th');
      }

      return n < 0 ? nth + ' ' + gettext('last') : nth;
    },

    monthtext: function monthtext(m) {
      return this.language.monthNames[m - 1];
    },

    weekdaytext: function weekdaytext(wday) {
      var weekday = typeof wday === 'number' ? wday : wday.getJsWeekday();
      return (wday.n ? this.nth(wday.n) + ' ' : '') + this.language.dayNames[weekday];
    },

    plural: function plural(n) {
      return n % 100 !== 1;
    },

    add: function add(s) {
      this.text.push(' ');
      this.text.push(s);
      return this;
    },

    list: function list(arr, callback, finalDelim, delim) {
      var delimJoin = function delimJoin(array, delimiter, finalDelimiter) {
        var list = '';

        for (var i = 0; i < array.length; i++) {
          if (i !== 0) {
            if (i === array.length - 1) {
              list += ' ' + finalDelimiter + ' ';
            } else {
              list += delimiter + ' ';
            }
          }
          list += array[i];
        }
        return list;
      };

      delim = delim || ',';
      callback = callback || function (o) {
        return o;
      };
      var self = this;
      var realCallback = function realCallback(arg) {
        return callback.call(self, arg);
      };

      if (finalDelim) {
        return delimJoin(arr.map(realCallback), delim, finalDelim);
      } else {
        return arr.map(realCallback).join(delim + ' ');
      }
    }

    /**
     * Will be able to convert some of the below described rules from
     * text format to a rule object.
     *
     *
     * RULES
     *
     * Every ([n])
     *       day(s)
     *     | [weekday], ..., (and) [weekday]
     *     | weekday(s)
     *     | week(s)
     *     | month(s)
     *     | [month], ..., (and) [month]
     *     | year(s)
     *
     *
     * Plus 0, 1, or multiple of these:
     *
     * on [weekday], ..., (or) [weekday] the [monthday], [monthday], ... (or) [monthday]
     *
     * on [weekday], ..., (and) [weekday]
     *
     * on the [monthday], [monthday], ... (and) [monthday] (day of the month)
     *
     * on the [nth-weekday], ..., (and) [nth-weekday] (of the month/year)
     *
     *
     * Plus 0 or 1 of these:
     *
     * for [n] time(s)
     *
     * until [date]
     *
     * Plus (.)
     *
     *
     * Definitely no supported for parsing:
     *
     * (for year):
     *     in week(s) [n], ..., (and) [n]
     *
     *     on the [yearday], ..., (and) [n] day of the year
     *     on day [yearday], ..., (and) [n]
     *
     *
     * NON-TERMINALS
     *
     * [n]: 1, 2 ..., one, two, three ..
     * [month]: January, February, March, April, May, ... December
     * [weekday]: Monday, ... Sunday
     * [nth-weekday]: first [weekday], 2nd [weekday], ... last [weekday], ...
     * [monthday]: first, 1., 2., 1st, 2nd, second, ... 31st, last day, 2nd last day, ..
     * [date]:
     *     [month] (0-31(,) ([year])),
     *     (the) 0-31.(1-12.([year])),
     *     (the) 0-31/(1-12/([year])),
     *     [weekday]
     *
     * [year]: 0000, 0001, ... 01, 02, ..
     *
     * Definitely not supported for parsing:
     *
     * [yearday]: first, 1., 2., 1st, 2nd, second, ... 366th, last day, 2nd last day, ..
     *
     * @param {string} text
     * @param {*} language
     * @returns {Object|boolean} the rule, or null.
     */
  };var fromText = function fromText(text, language) {
    return new RRule(parseText(text, language));
  };

  var parseText = function parseText(text, language) {
    var options = {};
    var ttr = new Parser((language || ENGLISH).tokens);

    if (!ttr.start(text)) {
      return null;
    }

    parseOptions();
    return options;

    function parseOptions() {
      // every [n]
      var n;

      ttr.expect('every');
      if (n = ttr.accept('number')) {
        options.interval = parseInt(n[0], 10);
      }
      if (ttr.isDone()) {
        throw new Error('Unexpected end');
      }

      switch (ttr.symbol) {
        case 'day(s)':
          options.freq = RRule.DAILY;
          if (ttr.nextSymbol()) {
            parseAt();
            parseForUntil();
          }
          break;

        // FIXME Note: every 2 weekdays != every two weeks on weekdays.
        // DAILY on weekdays is not a valid rule
        case 'weekday(s)':
          options.freq = RRule.WEEKLY;
          options.byweekday = [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR];
          ttr.nextSymbol();
          parseForUntil();
          break;

        case 'week(s)':
          options.freq = RRule.WEEKLY;
          if (ttr.nextSymbol()) {
            parseOnThe();
            parseForUntil();
          }
          break;

        case 'hour(s)':
          options.freq = RRule.HOURLY;
          if (ttr.nextSymbol()) {
            parseOnThe();
            parseForUntil();
          }
          break;

        case 'month(s)':
          options.freq = RRule.MONTHLY;
          if (ttr.nextSymbol()) {
            parseOnThe();
            parseForUntil();
          }
          break;

        case 'year(s)':
          options.freq = RRule.YEARLY;
          if (ttr.nextSymbol()) {
            parseOnThe();
            parseForUntil();
          }
          break;

        case 'monday':
        case 'tuesday':
        case 'wednesday':
        case 'thursday':
        case 'friday':
        case 'saturday':
        case 'sunday':
          options.freq = RRule.WEEKLY;
          options.byweekday = [RRule[ttr.symbol.substr(0, 2).toUpperCase()]];

          if (!ttr.nextSymbol()) {
            return;
          }

          // TODO check for duplicates
          while (ttr.accept('comma')) {
            if (ttr.isDone()) {
              throw new Error('Unexpected end');
            }

            var wkd;
            if (!(wkd = decodeWKD())) {
              throw new Error('Unexpected symbol ' + ttr.symbol + ', expected weekday');
            }

            options.byweekday.push(RRule[wkd]);
            ttr.nextSymbol();
          }
          parseMDAYs();
          parseForUntil();
          break;

        case 'january':
        case 'february':
        case 'march':
        case 'april':
        case 'may':
        case 'june':
        case 'july':
        case 'august':
        case 'september':
        case 'october':
        case 'november':
        case 'december':
          options.freq = RRule.YEARLY;
          options.bymonth = [decodeM()];

          if (!ttr.nextSymbol()) {
            return;
          }

          // TODO check for duplicates
          while (ttr.accept('comma')) {
            if (ttr.isDone()) {
              throw new Error('Unexpected end');
            }

            var m;
            if (!(m = decodeM())) {
              throw new Error('Unexpected symbol ' + ttr.symbol + ', expected month');
            }

            options.bymonth.push(m);
            ttr.nextSymbol();
          }

          parseOnThe();
          parseForUntil();
          break;

        default:
          throw new Error('Unknown symbol');
      }
    }

    function parseOnThe() {
      var on = ttr.accept('on');
      var the = ttr.accept('the');
      if (!(on || the)) {
        return;
      }

      do {
        var nth;
        var wkd;
        var m;

        // nth <weekday> | <weekday>
        if (nth = decodeNTH()) {
          // ttr.nextSymbol()

          if (wkd = decodeWKD()) {
            ttr.nextSymbol();
            if (!options.byweekday) {
              options.byweekday = [];
            }
            options.byweekday.push(RRule[wkd].nth(nth));
          } else {
            if (!options.bymonthday) {
              options.bymonthday = [];
            }
            options.bymonthday.push(nth);
            ttr.accept('day(s)');
          }
          // <weekday>
        } else if (wkd = decodeWKD()) {
          ttr.nextSymbol();
          if (!options.byweekday) {
            options.byweekday = [];
          }
          options.byweekday.push(RRule[wkd]);
        } else if (ttr.symbol === 'weekday(s)') {
          ttr.nextSymbol();
          if (!options.byweekday) {
            options.byweekday = [];
          }
          options.byweekday.push(RRule.MO);
          options.byweekday.push(RRule.TU);
          options.byweekday.push(RRule.WE);
          options.byweekday.push(RRule.TH);
          options.byweekday.push(RRule.FR);
        } else if (ttr.symbol === 'week(s)') {
          ttr.nextSymbol();
          var n;
          if (!(n = ttr.accept('number'))) {
            throw new Error('Unexpected symbol ' + ttr.symbol + ', expected week number');
          }
          options.byweekno = [n[0]];
          while (ttr.accept('comma')) {
            if (!(n = ttr.accept('number'))) {
              throw new Error('Unexpected symbol ' + ttr.symbol + '; expected monthday');
            }
            options.byweekno.push(n[0]);
          }
        } else if (m = decodeM()) {
          ttr.nextSymbol();
          if (!options.bymonth) {
            options.bymonth = [];
          }
          options.bymonth.push(m);
        } else {
          return;
        }
      } while (ttr.accept('comma') || ttr.accept('the') || ttr.accept('on'));
    }

    function parseAt() {
      var at = ttr.accept('at');
      if (!at) {
        return;
      }

      do {
        var n;
        if (!(n = ttr.accept('number'))) {
          throw new Error('Unexpected symbol ' + ttr.symbol + ', expected hour');
        }
        options.byhour = [n[0]];
        while (ttr.accept('comma')) {
          if (!(n = ttr.accept('number'))) {
            throw new Error('Unexpected symbol ' + ttr.symbol + '; expected hour');
          }
          options.byhour.push(n[0]);
        }
      } while (ttr.accept('comma') || ttr.accept('at'));
    }

    function decodeM() {
      switch (ttr.symbol) {
        case 'january':
          return 1;
        case 'february':
          return 2;
        case 'march':
          return 3;
        case 'april':
          return 4;
        case 'may':
          return 5;
        case 'june':
          return 6;
        case 'july':
          return 7;
        case 'august':
          return 8;
        case 'september':
          return 9;
        case 'october':
          return 10;
        case 'november':
          return 11;
        case 'december':
          return 12;
        default:
          return false;
      }
    }

    function decodeWKD() {
      switch (ttr.symbol) {
        case 'monday':
        case 'tuesday':
        case 'wednesday':
        case 'thursday':
        case 'friday':
        case 'saturday':
        case 'sunday':
          return ttr.symbol.substr(0, 2).toUpperCase();
        default:
          return false;
      }
    }

    function decodeNTH() {
      switch (ttr.symbol) {
        case 'last':
          ttr.nextSymbol();
          return -1;
        case 'first':
          ttr.nextSymbol();
          return 1;
        case 'second':
          ttr.nextSymbol();
          return ttr.accept('last') ? -2 : 2;
        case 'third':
          ttr.nextSymbol();
          return ttr.accept('last') ? -3 : 3;
        case 'nth':
          var v = parseInt(ttr.value[1], 10);
          if (v < -366 || v > 366) {
            throw new Error('Nth out of range: ' + v);
          }

          ttr.nextSymbol();
          return ttr.accept('last') ? -v : v;

        default:
          return false;
      }
    }

    function parseMDAYs() {
      ttr.accept('on');
      ttr.accept('the');

      var nth;
      if (!(nth = decodeNTH())) {
        return;
      }

      options.bymonthday = [nth];
      ttr.nextSymbol();

      while (ttr.accept('comma')) {
        if (!(nth = decodeNTH())) {
          throw new Error('Unexpected symbol ' + ttr.symbol + '; expected monthday');
        }

        options.bymonthday.push(nth);
        ttr.nextSymbol();
      }
    }

    function parseForUntil() {
      if (ttr.symbol === 'until') {
        var date = Date.parse(ttr.text);

        if (!date) {
          throw new Error('Cannot parse until date:' + ttr.text);
        }
        options.until = new Date(date);
      } else if (ttr.accept('for')) {
        options.count = ttr.value[0];
        ttr.expect('number');
        // ttr.expect('times')
      }
    }
  };

  // =============================================================================
  // Parser
  // =============================================================================

  var Parser = function Parser(rules) {
    this.rules = rules;
  };

  Parser.prototype.start = function (text) {
    this.text = text;
    this.done = false;
    return this.nextSymbol();
  };

  Parser.prototype.isDone = function () {
    return this.done && this.symbol === null;
  };

  Parser.prototype.nextSymbol = function () {
    var best;
    var bestSymbol;
    var p = this;

    this.symbol = null;
    this.value = null;
    do {
      if (this.done) {
        return false;
      }

      var match;
      var rule;
      best = null;
      for (var name in this.rules) {
        rule = this.rules[name];
        if (match = rule.exec(p.text)) {
          if (best === null || match[0].length > best[0].length) {
            best = match;
            bestSymbol = name;
          }
        }
      }

      if (best !== null) {
        this.text = this.text.substr(best[0].length);

        if (this.text === '') {
          this.done = true;
        }
      }

      if (best === null) {
        this.done = true;
        this.symbol = null;
        this.value = null;
        return;
      }
    } while (bestSymbol === 'SKIP');

    this.symbol = bestSymbol;
    this.value = best;
    return true;
  };

  Parser.prototype.accept = function (name) {
    if (this.symbol === name) {
      if (this.value) {
        var v = this.value;
        this.nextSymbol();
        return v;
      }

      this.nextSymbol();
      return true;
    }

    return false;
  };

  Parser.prototype.expect = function (name) {
    if (this.accept(name)) {
      return true;
    }

    throw new Error('expected ' + name + ' but found ' + this.symbol);
  };

  // =============================================================================
  // i18n
  // =============================================================================

  var ENGLISH = {
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    tokens: {
      'SKIP': /^[ \r\n\t]+|^\.$/,
      'number': /^[1-9][0-9]*/,
      'numberAsText': /^(one|two|three)/i,
      'every': /^every/i,
      'day(s)': /^days?/i,
      'weekday(s)': /^weekdays?/i,
      'week(s)': /^weeks?/i,
      'hour(s)': /^hours?/i,
      'month(s)': /^months?/i,
      'year(s)': /^years?/i,
      'on': /^(on|in)/i,
      'at': /^(at)/i,
      'the': /^the/i,
      'first': /^first/i,
      'second': /^second/i,
      'third': /^third/i,
      'nth': /^([1-9][0-9]*)(\.|th|nd|rd|st)/i,
      'last': /^last/i,
      'for': /^for/i,
      'time(s)': /^times?/i,
      'until': /^(un)?til/i,
      'monday': /^mo(n(day)?)?/i,
      'tuesday': /^tu(e(s(day)?)?)?/i,
      'wednesday': /^we(d(n(esday)?)?)?/i,
      'thursday': /^th(u(r(sday)?)?)?/i,
      'friday': /^fr(i(day)?)?/i,
      'saturday': /^sa(t(urday)?)?/i,
      'sunday': /^su(n(day)?)?/i,
      'january': /^jan(uary)?/i,
      'february': /^feb(ruary)?/i,
      'march': /^mar(ch)?/i,
      'april': /^apr(il)?/i,
      'may': /^may/i,
      'june': /^june?/i,
      'july': /^july?/i,
      'august': /^aug(ust)?/i,
      'september': /^sep(t(ember)?)?/i,
      'october': /^oct(ober)?/i,
      'november': /^nov(ember)?/i,
      'december': /^dec(ember)?/i,
      'comma': /^(,\s*|(and|or)\s*)+/i
    }

    // =============================================================================
    // Export
    // =============================================================================

  };return {
    fromText: fromText,
    parseText: parseText,
    isFullyConvertible: ToText.isFullyConvertible,
    toText: function toText(rrule, gettext, language) {
      return new ToText(rrule, gettext, language).toString();
    }
  };
};

/**
 * rrule.js - Library for working with recurrence rules for calendar dates.
 * https://github.com/jakubroztocil/rrule
 *
 * Copyright 2010, Jakub Roztocil and Lars Schoning
 * Licenced under the BSD licence.
 * https://github.com/jakubroztocil/rrule/blob/master/LICENCE
 *
 */

/**
 *
 * Implementation of RRule.fromText() and RRule::toText().
 *
 *
 * On the client side, this file needs to be included
 * when those functions are used.
 *
 */

/**
 * Return true if a value is in an array
 * @param {*} arr
 * @param {*} val
 * @returns {boolean}
 */
var contains = function contains(arr, val) {
  return arr.indexOf(val) !== -1;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = IterResult;
exports.CallbackIterResult = CallbackIterResult;

var _DateTime = __webpack_require__(0);

var _DateTime2 = _interopRequireDefault(_DateTime);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This class helps us to emulate python's generators, sorta.
 * @param {*} method
 * @param {*} args
 */
function IterResult(method, args) {
  this.init(method, args);
}

IterResult.prototype = {
  constructor: IterResult,
  init: function init(method, args) {
    this.method = method;
    this.args = args;
    this.minDate = null;
    this.maxDate = null;
    this._result = [];

    if (method === 'between') {
      this.maxDate = args.inc ? args.before : new _DateTime2.default(args.before.getTime() - 1);
      this.minDate = args.inc ? args.after : new _DateTime2.default(args.after.getTime() + 1);
    } else if (method === 'before') {
      this.maxDate = args.inc ? args.dt : new _DateTime2.default(args.dt.getTime() - 1);
    } else if (method === 'after') {
      this.minDate = args.inc ? args.dt : new _DateTime2.default(args.dt.getTime() + 1);
    }
  },

  /**
   * Possibly adds a date into the result.
   *
   * @param {Date} date - the date isn't necessarly added to the result
   *                      list (if it is too late/too early)
   * @returns {Boolean} true if it makes sense to continue the iteration
   *                   false if we're done.
   */
  accept: function accept(date) {
    var tooEarly = this.minDate && date < this.minDate;
    var tooLate = this.maxDate && date > this.maxDate;

    if (this.method === 'between') {
      if (tooEarly) {
        return true;
      }
      if (tooLate) {
        return false;
      }
    } else if (this.method === 'before') {
      if (tooLate) {
        return false;
      }
    } else if (this.method === 'after') {
      if (tooEarly) {
        return true;
      }
      this.add(date);
      return false;
    }

    return this.add(date);
  },

  /**
   *
   * @param {DateTime} date that is part of the result.
   * @returns {boolean} whether we are interested in more values.
   */
  add: function add(date) {
    this._result.push(date);
    return true;
  },

  /**
   * 'before' and 'after' return only one date, whereas 'all' and 'between' an array.
   * @returns {DateTime|array|null}
   */
  getValue: function getValue() {
    var res = this._result;
    switch (this.method) {
      case 'all':
      case 'between':
        return res;
      case 'before':
      case 'after':
        return res.length ? res[res.length - 1] : null;
    }
  },

  clone: function clone() {
    return new IterResult(this.method, this.args);
  }

  /**
   * IterResult subclass that calls a callback function on each add,
   * and stops iterating when the callback returns false.
   * @param {*} method
   * @param {*} args
   * @param {*} iterator
   */
};function CallbackIterResult(method, args, iterator) {
  var allowedMethods = ['all', 'between'];
  if (!(0, _utils.contains)(allowedMethods, method)) {
    throw new Error('Invalid method "' + method + '". Only all and between works with iterator.');
  }
  this.add = function (date) {
    if (iterator(date, this._result.length)) {
      this._result.push(date);
      return true;
    }
    return false;
  };

  this.init(method, args);
}

CallbackIterResult.prototype = IterResult.prototype;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Iterinfo;

var _RRule = __webpack_require__(2);

var _RRule2 = _interopRequireDefault(_RRule);

var _DateTime = __webpack_require__(0);

var _DateTime2 = _interopRequireDefault(_DateTime);

var _Time = __webpack_require__(5);

var _Time2 = _interopRequireDefault(_Time);

var _dateutil = __webpack_require__(3);

var dateutil = _interopRequireWildcard(_dateutil);

var _utils = __webpack_require__(1);

var _constant = __webpack_require__(11);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Iterinfo(rrule) {
  this.rrule = rrule;
  this.lastyear = null;
  this.lastmonth = null;
  this.yearlen = null;
  this.nextyearlen = null;
  this.yearordinal = null;
  this.yearweekday = null;
  this.mmask = null;
  this.mrange = null;
  this.mdaymask = null;
  this.nmdaymask = null;
  this.wdaymask = null;
  this.wnomask = null;
  this.nwdaymask = null;
  this.eastermask = null;
}

Iterinfo.prototype.easter = function (y, offset) {
  offset = offset || 0;

  var a = y % 19;
  var b = Math.floor(y / 100);
  var c = y % 100;
  var d = Math.floor(b / 4);
  var e = b % 4;
  var f = Math.floor((b + 8) / 25);
  var g = Math.floor((b - f + 1) / 3);
  var h = Math.floor(19 * a + b - d - g + 15) % 30;
  var i = Math.floor(c / 4);
  var k = c % 4;
  var l = Math.floor(32 + 2 * e + 2 * i - h - k) % 7;
  var m = Math.floor((a + 11 * h + 22 * l) / 451);
  var month = Math.floor((h + l - 7 * m + 114) / 31);
  var day = (h + l - 7 * m + 114) % 31 + 1;
  var date = _DateTime2.default.UTC(y, month - 1, day + offset); // eslint-disable-line new-cap
  var yearStart = _DateTime2.default.UTC(y, 0, 1); // eslint-disable-line new-cap

  return [Math.ceil((date - yearStart) / (1000 * 60 * 60 * 24))];
};

Iterinfo.prototype.rebuild = function (year, month) {
  var rr = this.rrule;

  if (year !== this.lastyear) {
    this.yearlen = dateutil.isLeapYear(year) ? 366 : 365;
    this.nextyearlen = dateutil.isLeapYear(year + 1) ? 366 : 365;
    var firstyday = new _DateTime2.default(year, 0, 1);

    this.yearordinal = dateutil.toOrdinal(firstyday);
    this.yearweekday = dateutil.getWeekday(firstyday);

    var wday = dateutil.getWeekday(new _DateTime2.default(year, 0, 1));

    if (this.yearlen === 365) {
      this.mmask = [].concat(_constant.M365MASK);
      this.mdaymask = [].concat(_constant.MDAY365MASK);
      this.nmdaymask = [].concat(_constant.NMDAY365MASK);
      this.wdaymask = _constant.WDAYMASK.slice(wday);
      this.mrange = [].concat(_constant.M365RANGE);
    } else {
      this.mmask = [].concat(_constant.M366MASK);
      this.mdaymask = [].concat(_constant.MDAY366MASK);
      this.nmdaymask = [].concat(_constant.NMDAY366MASK);
      this.wdaymask = _constant.WDAYMASK.slice(wday);
      this.mrange = [].concat(_constant.M366RANGE);
    }

    if (!(0, _utils.plb)(rr.options.byweekno)) {
      this.wnomask = null;
    } else {
      this.wnomask = (0, _utils.repeat)(0, this.yearlen + 7);
      var no1wkst;
      var firstwkst;
      var wyearlen;
      no1wkst = firstwkst = (0, _utils.pymod)(7 - this.yearweekday + rr.options.wkst, 7);
      if (no1wkst >= 4) {
        no1wkst = 0;
        // Number of days in the year, plus the days we got
        // from last year.
        wyearlen = this.yearlen + (0, _utils.pymod)(this.yearweekday - rr.options.wkst, 7);
      } else {
        // Number of days in the year, minus the days we
        // left in last year.
        wyearlen = this.yearlen - no1wkst;
      }
      var div = Math.floor(wyearlen / 7);
      var mod = (0, _utils.pymod)(wyearlen, 7);
      var numweeks = Math.floor(div + mod / 4);
      for (var n, i, j = 0; j < rr.options.byweekno.length; j++) {
        n = rr.options.byweekno[j];
        if (n < 0) {
          n += numweeks + 1;
        }
        if (!(n > 0 && n <= numweeks)) {
          continue;
        }
        if (n > 1) {
          i = no1wkst + (n - 1) * 7;
          if (no1wkst !== firstwkst) {
            i -= 7 - firstwkst;
          }
        } else {
          i = no1wkst;
        }
        for (var k = 0; k < 7; k++) {
          this.wnomask[i] = 1;
          i++;
          if (this.wdaymask[i] === rr.options.wkst) {
            break;
          }
        }
      }

      if ((0, _utils.contains)(rr.options.byweekno, 1)) {
        // Check week number 1 of next year as well
        // orig-TODO : Check -numweeks for next year.
        i = no1wkst + numweeks * 7;
        if (no1wkst !== firstwkst) {
          i -= 7 - firstwkst;
        }
        if (i < this.yearlen) {
          // If week starts in next year, we
          // don't care about it.
          for (j = 0; j < 7; j++) {
            this.wnomask[i] = 1;
            i += 1;
            if (this.wdaymask[i] === rr.options.wkst) {
              break;
            }
          }
        }
      }

      if (no1wkst) {
        // Check last week number of last year as
        // well. If no1wkst is 0, either the year
        // started on week start, or week number 1
        // got days from last year, so there are no
        // days from last year's last week number in
        // this year.
        var lnumweeks;
        if (!(0, _utils.contains)(rr.options.byweekno, -1)) {
          var lyearweekday = dateutil.getWeekday(new _DateTime2.default(year - 1, 0, 1));
          var lno1wkst = (0, _utils.pymod)(7 - lyearweekday + rr.options.wkst, 7);
          var lyearlen = dateutil.isLeapYear(year - 1) ? 366 : 365;
          if (lno1wkst >= 4) {
            lno1wkst = 0;
            lnumweeks = Math.floor(52 + (0, _utils.pymod)(lyearlen + (0, _utils.pymod)(lyearweekday - rr.options.wkst, 7), 7) / 4);
          } else {
            lnumweeks = Math.floor(52 + (0, _utils.pymod)(this.yearlen - no1wkst, 7) / 4);
          }
        } else {
          lnumweeks = -1;
        }
        if ((0, _utils.contains)(rr.options.byweekno, lnumweeks)) {
          for (i = 0; i < no1wkst; i++) {
            this.wnomask[i] = 1;
          }
        }
      }
    }
  }

  if ((0, _utils.plb)(rr.options.bynweekday) && (month !== this.lastmonth || year !== this.lastyear)) {
    var ranges = [];
    if (rr.options.freq === _RRule2.default.YEARLY) {
      if ((0, _utils.plb)(rr.options.bymonth)) {
        for (j = 0; j < rr.options.bymonth.length; j++) {
          month = rr.options.bymonth[j];
          ranges.push(this.mrange.slice(month - 1, month + 1));
        }
      } else {
        ranges = [[0, this.yearlen]];
      }
    } else if (rr.options.freq === _RRule2.default.MONTHLY) {
      ranges = [this.mrange.slice(month - 1, month + 1)];
    }
    if ((0, _utils.plb)(ranges)) {
      // Weekly frequency won't get here, so we may not
      // care about cross-year weekly periods.
      this.nwdaymask = (0, _utils.repeat)(0, this.yearlen);

      for (j = 0; j < ranges.length; j++) {
        var rang = ranges[j];
        var first = rang[0];
        var last = rang[1];
        last -= 1;
        for (k = 0; k < rr.options.bynweekday.length; k++) {
          wday = rr.options.bynweekday[k][0];
          n = rr.options.bynweekday[k][1];
          if (n < 0) {
            i = last + (n + 1) * 7;
            i -= (0, _utils.pymod)(this.wdaymask[i] - wday, 7);
          } else {
            i = first + (n - 1) * 7;
            i += (0, _utils.pymod)(7 - this.wdaymask[i] + wday, 7);
          }
          if (first <= i && i <= last) {
            this.nwdaymask[i] = 1;
          }
        }
      }
    }

    this.lastyear = year;
    this.lastmonth = month;
  }

  if (rr.options.byeaster !== null) {
    this.eastermask = this.easter(year, rr.options.byeaster);
  }
};

Iterinfo.prototype.ydayset = function () /* year, month, day */{
  return [(0, _utils.range)(this.yearlen), 0, this.yearlen];
};

Iterinfo.prototype.mdayset = function (year, month /* , day */) {
  var set = (0, _utils.repeat)(null, this.yearlen);
  var start = this.mrange[month - 1];
  var end = this.mrange[month];
  for (var i = start; i < end; i++) {
    set[i] = i;
  }
  return [set, start, end];
};

Iterinfo.prototype.wdayset = function (year, month, day) {
  // We need to handle cross-year weeks here.
  var set = (0, _utils.repeat)(null, this.yearlen + 7);
  var i = dateutil.toOrdinal(new _DateTime2.default(year, month - 1, day)) - this.yearordinal;
  var start = i;
  for (var j = 0; j < 7; j++) {
    set[i] = i;
    ++i;
    if (this.wdaymask[i] === this.rrule.options.wkst) {
      break;
    }
  }
  return [set, start, i];
};

Iterinfo.prototype.ddayset = function (year, month, day) {
  var set = (0, _utils.repeat)(null, this.yearlen);
  var i = dateutil.toOrdinal(new _DateTime2.default(year, month - 1, day)) - this.yearordinal;
  set[i] = i;
  return [set, i, i + 1];
};

Iterinfo.prototype.htimeset = function (hour, minute, second, millisecond) {
  var set = [];
  var rr = this.rrule;
  for (var i = 0; i < rr.options.byminute.length; i++) {
    minute = rr.options.byminute[i];
    for (var j = 0; j < rr.options.bysecond.length; j++) {
      second = rr.options.bysecond[j];
      set.push(new _Time2.default(hour, minute, second, millisecond));
    }
  }
  dateutil.sort(set);
  return set;
};

Iterinfo.prototype.mtimeset = function (hour, minute, second, millisecond) {
  var set = [];
  var rr = this.rrule;
  for (var j = 0; j < rr.options.bysecond.length; j++) {
    second = rr.options.bysecond[j];
    set.push(new _Time2.default(hour, minute, second, millisecond));
  }
  dateutil.sort(set);
  return set;
};

Iterinfo.prototype.stimeset = function (hour, minute, second, millisecond) {
  return [new _Time2.default(hour, minute, second, millisecond)];
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WDAYMASK = exports.M365RANGE = exports.M366RANGE = exports.NMDAY365MASK = exports.NMDAY366MASK = exports.MDAY365MASK = exports.MDAY366MASK = exports.M366MASK = exports.M365MASK = undefined;

var _utils = __webpack_require__(1);

// Every mask is 7 days longer to handle cross-year weekly periods.

var M365MASK = exports.M365MASK = [].concat((0, _utils.repeat)(1, 31), (0, _utils.repeat)(2, 28), (0, _utils.repeat)(3, 31), (0, _utils.repeat)(4, 30), (0, _utils.repeat)(5, 31), (0, _utils.repeat)(6, 30), (0, _utils.repeat)(7, 31), (0, _utils.repeat)(8, 31), (0, _utils.repeat)(9, 30), (0, _utils.repeat)(10, 31), (0, _utils.repeat)(11, 30), (0, _utils.repeat)(12, 31), (0, _utils.repeat)(1, 7));

var M366MASK = exports.M366MASK = [].concat((0, _utils.repeat)(1, 31), (0, _utils.repeat)(2, 29), (0, _utils.repeat)(3, 31), (0, _utils.repeat)(4, 30), (0, _utils.repeat)(5, 31), (0, _utils.repeat)(6, 30), (0, _utils.repeat)(7, 31), (0, _utils.repeat)(8, 31), (0, _utils.repeat)(9, 30), (0, _utils.repeat)(10, 31), (0, _utils.repeat)(11, 30), (0, _utils.repeat)(12, 31), (0, _utils.repeat)(1, 7));

var M28 = (0, _utils.range)(1, 29);
var M29 = (0, _utils.range)(1, 30);
var M30 = (0, _utils.range)(1, 31);
var M31 = (0, _utils.range)(1, 32);

var MDAY366MASK = exports.MDAY366MASK = [].concat(M31, M29, M31, M30, M31, M30, M31, M31, M30, M31, M30, M31, M31.slice(0, 7));

var MDAY365MASK = exports.MDAY365MASK = [].concat(M31, M28, M31, M30, M31, M30, M31, M31, M30, M31, M30, M31, M31.slice(0, 7));

M28 = (0, _utils.range)(-28, 0);
M29 = (0, _utils.range)(-29, 0);
M30 = (0, _utils.range)(-30, 0);
M31 = (0, _utils.range)(-31, 0);

var NMDAY366MASK = exports.NMDAY366MASK = [].concat(M31, M29, M31, M30, M31, M30, M31, M31, M30, M31, M30, M31, M31.slice(0, 7));

var NMDAY365MASK = exports.NMDAY365MASK = [].concat(M31, M28, M31, M30, M31, M30, M31, M31, M30, M31, M30, M31, M31.slice(0, 7));

var M366RANGE = exports.M366RANGE = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];
var M365RANGE = exports.M365RANGE = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];

var WDAYMASK = exports.WDAYMASK = function () {
  for (var wdaymask = [], i = 0; i < 55; i++) {
    wdaymask = wdaymask.concat((0, _utils.range)(7));
  }

  return wdaymask;
}();

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = RRuleStr;

var _RRule = __webpack_require__(2);

var _RRule2 = _interopRequireDefault(_RRule);

var _RRuleSet = __webpack_require__(6);

var _RRuleSet2 = _interopRequireDefault(_RRuleSet);

var _Weekday = __webpack_require__(4);

var _Weekday2 = _interopRequireDefault(_Weekday);

var _dateutil = __webpack_require__(3);

var dateutil = _interopRequireWildcard(_dateutil);

var _utils = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * RRuleStr
 *  To parse a set of rrule strings
 */

function RRuleStr() {}

RRuleStr.DEFAULT_OPTIONS = {
  dtstart: null,
  cache: false,
  unfold: false,
  forceset: false,
  compatible: false,
  ignoretz: false,
  tzinfos: null
};

RRuleStr._freqMap = {
  'YEARLY': _RRule2.default.YEARLY,
  'MONTHLY': _RRule2.default.MONTHLY,
  'WEEKLY': _RRule2.default.WEEKLY,
  'DAILY': _RRule2.default.DAILY,
  'HOURLY': _RRule2.default.HOURLY,
  'MINUTELY': _RRule2.default.MINUTELY,
  'SECONDLY': _RRule2.default.SECONDLY
};

RRuleStr._weekdayMap = {
  'MO': 0,
  'TU': 1,
  'WE': 2,
  'TH': 3,
  'FR': 4,
  'SA': 5,
  'SU': 6
};

RRuleStr.prototype = {
  constructor: RRuleStr,

  _handleInt: function _handleInt(rrkwargs, name, value /* , options */) {
    rrkwargs[name.toLowerCase()] = parseInt(value, 10);
  },

  _handleIntList: function _handleIntList(rrkwargs, name, value /* , options */) {
    rrkwargs[name.toLowerCase()] = value.split(',').map(function (x) {
      return parseInt(x, 10);
    });
  },

  _handleFREQ: function _handleFREQ(rrkwargs, name, value /* , options */) {
    rrkwargs['freq'] = RRuleStr._freqMap[value];
  },

  _handleUNTIL: function _handleUNTIL(rrkwargs, name, value /* , options */) {
    try {
      rrkwargs['until'] = dateutil.untilStringToDate(value);
    } catch (error) {
      throw new Error('invalid until date');
    }
  },

  _handleWKST: function _handleWKST(rrkwargs, name, value /* , options */) {
    rrkwargs['wkst'] = RRuleStr._weekdayMap[value];
  },

  _handleBYWEEKDAY: function _handleBYWEEKDAY(rrkwargs, name, value /* , options */) {
    // Two ways to specify this: +1MO or MO(+1)
    var splt;
    var i;
    var j;
    var n;
    var w;
    var wday;
    var l = [];
    var wdays = value.split(',');

    for (i = 0; i < wdays.length; i++) {
      wday = wdays[i];
      if (wday.indexOf('(') > -1) {
        // If it's of the form TH(+1), etc.
        splt = wday.split('(');
        w = splt[0];
        n = parseInt(splt.slice(1, -1), 10);
      } else {
        // # If it's of the form +1MO
        for (j = 0; j < wday.length; j++) {
          if ('+-0123456789'.indexOf(wday[j]) === -1) {
            break;
          }
        }
        n = wday.slice(0, j) || null;
        w = wday.slice(j);

        if (n) {
          n = parseInt(n, 10);
        }
      }

      var weekday = new _Weekday2.default(RRuleStr._weekdayMap[w], n);
      l.push(weekday);
    }
    rrkwargs['byweekday'] = l;
  },

  _parseRfcRRule: function _parseRfcRRule(line, options) {
    options = options || {};
    options.dtstart = options.dtstart || null;
    options.cache = options.cache || false;
    options.ignoretz = options.ignoretz || false;
    options.tzinfos = options.tzinfos || null;

    var name;
    var value;
    var parts;
    if (line.indexOf(':') !== -1) {
      parts = line.split(':');
      name = parts[0];
      value = parts[1];

      if (name !== 'RRULE') {
        throw new Error('unknown parameter name');
      }
    } else {
      value = line;
    }

    var i;
    var rrkwargs = {};
    var pairs = value.split(';');

    for (i = 0; i < pairs.length; i++) {
      parts = pairs[i].split('=');
      name = parts[0].toUpperCase();
      value = parts[1].toUpperCase();

      try {
        this['_handle' + name](rrkwargs, name, value, {
          ignoretz: options.ignoretz,
          tzinfos: options.tzinfos
        });
      } catch (error) {
        throw new Error('unknown parameter \'' + name + '\':' + value);
      }
    }
    rrkwargs.dtstart = rrkwargs.dtstart || options.dtstart;
    return new _RRule2.default(rrkwargs, !options.cache);
  },

  _parseRfc: function _parseRfc(s, options) {
    if (options.compatible) {
      options.forceset = true;
      options.unfold = true;
    }

    s = s && s.toUpperCase().trim();
    if (!s) {
      throw new Error('Invalid empty string');
    }

    var i = 0;
    var line;
    var lines;

    // More info about 'unfold' option
    // Go head to http://www.ietf.org/rfc/rfc2445.txt
    if (options.unfold) {
      lines = s.split('\n');
      while (i < lines.length) {
        // TODO
        line = lines[i] = lines[i].replace(/\s+$/g, '');
        if (!line) {
          lines.splice(i, 1);
        } else if (i > 0 && line[0] === ' ') {
          lines[i - 1] += line.slice(1);
          lines.splice(i, 1);
        } else {
          i += 1;
        }
      }
    } else {
      lines = s.split(/\s/);
    }

    var rrulevals = [];
    var rdatevals = [];
    var exrulevals = [];
    var exdatevals = [];
    var name;
    var value;
    var parts;
    var parms;
    var parm;
    var dtstart;
    var rset;
    var j;
    var k;
    var datestrs;
    var datestr;

    if (!options.forceset && lines.length === 1 && (s.indexOf(':') === -1 || s.indexOf('RRULE:') === 0)) {
      return this._parseRfcRRule(lines[0], {
        cache: options.cache,
        dtstart: options.dtstart,
        ignoretz: options.ignoretz,
        tzinfos: options.tzinfos
      });
    } else {
      for (i = 0; i < lines.length; i++) {
        line = lines[i];
        if (!line) {
          continue;
        }
        if (line.indexOf(':') === -1) {
          name = 'RRULE';
          value = line;
        } else {
          parts = (0, _utils.split)(line, ':', 1);
          name = parts[0];
          value = parts[1];
        }
        parms = name.split(';');
        if (!parms) {
          throw new Error('empty property name');
        }
        name = parms[0];
        parms = parms.slice(1);

        if (name === 'RRULE') {
          for (j = 0; j < parms.length; j++) {
            parm = parms[j];
            throw new Error('unsupported RRULE parm: ' + parm);
          }
          rrulevals.push(value);
        } else if (name === 'RDATE') {
          for (j = 0; j < parms.length; j++) {
            parm = parms[j];
            if (parm !== 'VALUE=DATE-TIME') {
              throw new Error('unsupported RDATE parm: ' + parm);
            }
          }
          rdatevals.push(value);
        } else if (name === 'EXRULE') {
          for (j = 0; j < parms.length; j++) {
            parm = parms[j];
            throw new Error('unsupported EXRULE parm: ' + parm);
          }
          exrulevals.push(value);
        } else if (name === 'EXDATE') {
          for (j = 0; j < parms.length; j++) {
            parm = parms[j];
            if (parm !== 'VALUE=DATE-TIME') {
              throw new Error('unsupported RDATE parm: ' + parm);
            }
          }
          exdatevals.push(value);
        } else if (name === 'DTSTART') {
          dtstart = dateutil.untilStringToDate(value);
        } else {
          throw new Error('unsupported property: ' + name);
        }
      }

      if (options.forceset || rrulevals.length > 1 || rdatevals.length || exrulevals.length || exdatevals.length) {
        rset = new _RRuleSet2.default(!options.cache);
        for (j = 0; j < rrulevals.length; j++) {
          rset.rrule(this._parseRfcRRule(rrulevals[j], {
            dtstart: options.dtstart || dtstart,
            ignoretz: options.ignoretz,
            tzinfos: options.tzinfos
          }));
        }
        for (j = 0; j < rdatevals.length; j++) {
          datestrs = rdatevals[j].split(',');
          for (k = 0; k < datestrs.length; k++) {
            datestr = datestrs[k];
            rset.rdate(dateutil.untilStringToDate(datestr));
          }
        }
        for (j = 0; j < exrulevals.length; j++) {
          rset.exrule(this._parseRfcRRule(exrulevals[j], {
            dtstart: options.dtstart || dtstart,
            ignoretz: options.ignoretz,
            tzinfos: options.tzinfos
          }));
        }
        for (j = 0; j < exdatevals.length; j++) {
          datestrs = exdatevals[j].split(',');
          for (k = 0; k < datestrs.length; k++) {
            datestr = datestrs[k];
            rset.exdate(dateutil.untilStringToDate(datestr));
          }
        }

        if (options.campatiable && options.dtstart) {
          rset.rdate(dtstart);
        }
        return rset;
      } else {
        return this._parseRfcRRule(rrulevals[0], {
          dtstart: options.dtstart || dtstart,
          cache: options.cache,
          ignoretz: options.ignoretz,
          tzinfos: options.tzinfos
        });
      }
    }
  },

  parse: function parse(s, options) {
    options = options || {};

    var invalid = [];
    var keys = Object.keys(options);
    var defaultKeys = Object.keys(RRuleStr.DEFAULT_OPTIONS);

    keys.forEach(function (key) {
      if (!(0, _utils.contains)(defaultKeys, key)) {
        invalid.push(key);
      }
    }, this);

    if (invalid.length) {
      throw new Error('Invalid options: ' + invalid.join(', '));
    }

    // Merge in default options
    defaultKeys.forEach(function (key) {
      if (!(0, _utils.contains)(keys, key)) {
        options[key] = RRuleStr.DEFAULT_OPTIONS[key];
      }
    });

    return this._parseRfc(s, options);
  }
};

RRuleStr.prototype._handleDTSTART = function (rrkwargs, name, value /* , options */) {
  rrkwargs[name.toLowerCase()] = dateutil.untilStringToDate(value);
};

RRuleStr.prototype._handleBYDAY = RRuleStr.prototype._handleBYWEEKDAY;
RRuleStr.prototype._handleINTERVAL = RRuleStr.prototype._handleInt;
RRuleStr.prototype._handleCOUNT = RRuleStr.prototype._handleInt;['_handleBYSETPOS', '_handleBYMONTH', '_handleBYMONTHDAY', '_handleBYYEARDAY', '_handleBYEASTER', '_handleBYWEEKNO', '_handleBYHOUR', '_handleBYMINUTE', '_handleBYSECOND'].forEach(function (method) {
  RRuleStr.prototype[method] = RRuleStr.prototype._handleIntList;
});

/***/ })
/******/ ]);
});