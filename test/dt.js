var DateTime = require('datetime2')
var RRule = require('../')

DateTime.setTzdata(require('./tzdata.json'));
DateTime.setDefaultTimezone('Europe/Moscow');
//DateTime.setLocale('ru');
//DateTime.setNow()

function DT (...args) {
  if (args.length > 1) {
    if (typeof args[1] === 'number') {
      args[1] = args[1] + 1;
    }

    this._date = new DateTime(args);
  } else if (args.length === 1) {
    var date = args[0];
    if (date instanceof DT) {
      this._date = new DateTime(date._date);
    } else {
      this._date = new DateTime(...args);
    }
  } else {
    this._date = new DateTime(...args);
  }
}

DT.UTC = function (...args) {
  return Date.UTC(...args);
}

DT.parse = function (...args) {
  return Date.parse(...args);
}

DT.now = function () {
  return DateTime.now();
}

DT.prototype = {
  constructor: DT
};

var isWeekDayDiff = new DateTime().getDayOfWeek() !== new Date().getDay();

var actions = {
  'getDate': 'getDayOfMonth',
  'getDay': isWeekDayDiff ? function () {
    return ([1,2,3,4,5,6,0])[this._date.getDayOfWeek()];
  } : function () {
    return this._date.getDayOfWeek();
  },
  'getFullYear': 'getYear',
  'getHours': 'getHour',
  'getMinutes': 'getMinute',
  'getMonth': function () {
    return this._date.getMonth() - 1;
  },
  'getSeconds': 'getSecond',
  'getTime': null,
  'getTimezoneOffset': function () {
    return this._date.getTimezoneOffset() / (60 * 1000);
  },
  'getUTCDate': 'getUTCDayOfMonth',
  'getUTCFullYear': 'getUTCYear',
  'getUTCHours': null,
  'getUTCMinutes': null,
  'getUTCMonth': function () {
    return this._date.getUTCMonth() - 1;
  },
  'getUTCSeconds': null,
  'toString': null,
  'valueOf': null
};

for (var name in actions) {
  (function (name, iname) {
    actions[name] = {
      value: typeof iname === 'function' ? iname : function (...args) {
        return this._date[iname](...args);
      }
    };
  }(name, actions[name] || name));
}

Object.defineProperties(DT.prototype, actions);

RRule.DateTime.setStrategy(DT);

module.exports = DT;
