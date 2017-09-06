import * as dateutil from './dateutil'
import Weekday from './Weekday'
import Time from './Time'
import DateTime from './DateTime'
import IterResult, {CallbackIterResult} from './IterResult'
import Iterinfo from './Iterinfo'

import {
  contains,
  pymod,
  plb,
  divmod
} from './utils'

/**
 * @see <http://labix.org/python-dateutil/#head-cf004ee9a75592797e076752b2a889c10f445418>
 * @constructor
 * @param {Object} options The only required option is `freq`, one of RRule.YEARLY, RRule.MONTHLY, ...
 * @param {*} noCache
 */
export default function RRule (options, noCache) {
  options = options || {}
  // RFC string
  this._string = null
  this._cache = noCache ? null : {
    all: false,
    before: [],
    after: [],
    between: []
  }

  // used by toString()
  this.origOptions = {}

  var invalid = []
  var keys = Object.keys(options)
  var defaultKeys = Object.keys(RRule.DEFAULT_OPTIONS)

  // Shallow copy for origOptions and check for invalid
  keys.forEach(function (key) {
    this.origOptions[key] = options[key]
    if (!contains(defaultKeys, key)) {
      invalid.push(key)
    }
  }, this)

  if (invalid.length) {
    throw new Error('Invalid options: ' + invalid.join(', '))
  }

  if (!RRule.FREQUENCIES[options.freq] && options.byeaster === null) {
    throw new Error('Invalid frequency: ' + String(options.freq))
  }

  // Merge in default options
  defaultKeys.forEach(function (key) {
    if (!contains(keys, key)) {
      options[key] = RRule.DEFAULT_OPTIONS[key]
    }
  })

  var opts = this.options = options

  if (opts.byeaster !== null) {
    opts.freq = RRule.YEARLY
  }
  if (!opts.dtstart) {
    opts.dtstart = new DateTime()
  }

  var millisecondModulo = opts.dtstart.getTime() % 1000
  if (opts.wkst === null) {
    opts.wkst = RRule.MO.weekday
  } else if (typeof opts.wkst === 'number') {
    // cool, just keep it like that
  } else {
    opts.wkst = opts.wkst.weekday
  }

  if (opts.bysetpos !== null) {
    if (typeof opts.bysetpos === 'number') {
      opts.bysetpos = [opts.bysetpos]
    }

    for (var i = 0; i < opts.bysetpos.length; i++) {
      var v = opts.bysetpos[i]
      if (v === 0 || !(v >= -366 && v <= 366)) {
        throw new Error('bysetpos must be between 1 and 366,' +
          ' or between -366 and -1')
      }
    }
  }

  if (!(
    plb(opts.byweekno) ||
    plb(opts.byyearday) ||
    plb(opts.bymonthday) ||
    opts.byweekday !== null ||
    opts.byeaster !== null
  )) {
    switch (opts.freq) {
    case RRule.YEARLY:
      if (!opts.bymonth) {
        opts.bymonth = opts.dtstart.getMonth() + 1
      }
      opts.bymonthday = opts.dtstart.getDate()
      break
    case RRule.MONTHLY:
      opts.bymonthday = opts.dtstart.getDate()
      break
    case RRule.WEEKLY:
      opts.byweekday = dateutil.getWeekday(opts.dtstart)
      break
    }
  }

  // bymonth
  if (opts.bymonth !== null && !(opts.bymonth instanceof Array)) {
    opts.bymonth = [opts.bymonth]
  }
  // byyearday
  if (opts.byyearday !== null && !(opts.byyearday instanceof Array)) {
    opts.byyearday = [opts.byyearday]
  }

  // bymonthday
  if (opts.bymonthday === null) {
    opts.bymonthday = []
    opts.bynmonthday = []
  } else if (opts.bymonthday instanceof Array) {
    var bymonthday = []
    var bynmonthday = []

    for (i = 0; i < opts.bymonthday.length; i++) {
      v = opts.bymonthday[i]
      if (v > 0) {
        bymonthday.push(v)
      } else if (v < 0) {
        bynmonthday.push(v)
      }
    }
    opts.bymonthday = bymonthday
    opts.bynmonthday = bynmonthday
  } else {
    if (opts.bymonthday < 0) {
      opts.bynmonthday = [opts.bymonthday]
      opts.bymonthday = []
    } else {
      opts.bynmonthday = []
      opts.bymonthday = [opts.bymonthday]
    }
  }

  // byweekno
  if (opts.byweekno !== null && !(opts.byweekno instanceof Array)) {
    opts.byweekno = [opts.byweekno]
  }

  // byweekday / bynweekday
  if (opts.byweekday === null) {
    opts.bynweekday = null
  } else if (typeof opts.byweekday === 'number') {
    opts.byweekday = [opts.byweekday]
    opts.bynweekday = null
  } else if (opts.byweekday instanceof Weekday) {
    if (!opts.byweekday.n || opts.freq > RRule.MONTHLY) {
      opts.byweekday = [opts.byweekday.weekday]
      opts.bynweekday = null
    } else {
      opts.bynweekday = [
        [opts.byweekday.weekday, opts.byweekday.n]
      ]
      opts.byweekday = null
    }
  } else {
    var byweekday = []
    var bynweekday = []

    for (i = 0; i < opts.byweekday.length; i++) {
      var wday = opts.byweekday[i]

      if (typeof wday === 'number') {
        byweekday.push(wday)
      } else if (!wday.n || opts.freq > RRule.MONTHLY) {
        byweekday.push(wday.weekday)
      } else {
        bynweekday.push([wday.weekday, wday.n])
      }
    }
    opts.byweekday = plb(byweekday) ? byweekday : null
    opts.bynweekday = plb(bynweekday) ? bynweekday : null
  }

  // byhour
  if (opts.byhour === null) {
    opts.byhour = (opts.freq < RRule.HOURLY) ? [opts.dtstart.getHours()] : null
  } else if (typeof opts.byhour === 'number') {
    opts.byhour = [opts.byhour]
  }

  // byminute
  if (opts.byminute === null) {
    opts.byminute = (opts.freq < RRule.MINUTELY) ? [opts.dtstart.getMinutes()] : null
  } else if (typeof opts.byminute === 'number') {
    opts.byminute = [opts.byminute]
  }

  // bysecond
  if (opts.bysecond === null) {
    opts.bysecond = (opts.freq < RRule.SECONDLY) ? [opts.dtstart.getSeconds()] : null
  } else if (typeof opts.bysecond === 'number') {
    opts.bysecond = [opts.bysecond]
  }

  if (opts.freq >= RRule.HOURLY) {
    this.timeset = null
  } else {
    this.timeset = []
    for (i = 0; i < opts.byhour.length; i++) {
      var hour = opts.byhour[i]
      for (var j = 0; j < opts.byminute.length; j++) {
        var minute = opts.byminute[j]
        for (var k = 0; k < opts.bysecond.length; k++) {
          var second = opts.bysecond[k]
          // python:
          // datetime.time(hour, minute, second,
          // tzinfo=self._tzinfo))
          this.timeset.push(new Time(hour, minute, second, millisecondModulo))
        }
      }
    }
    dateutil.sort(this.timeset)
  }
}

// RRule class 'constants'

RRule.FREQUENCIES = [
  'YEARLY', 'MONTHLY', 'WEEKLY', 'DAILY',
  'HOURLY', 'MINUTELY', 'SECONDLY'
]

RRule.YEARLY = 0
RRule.MONTHLY = 1
RRule.WEEKLY = 2
RRule.DAILY = 3
RRule.HOURLY = 4
RRule.MINUTELY = 5
RRule.SECONDLY = 6

RRule.MO = new Weekday(0)
RRule.TU = new Weekday(1)
RRule.WE = new Weekday(2)
RRule.TH = new Weekday(3)
RRule.FR = new Weekday(4)
RRule.SA = new Weekday(5)
RRule.SU = new Weekday(6)

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
}

RRule.parseText = function (/* text, language */) {
  throw new Error('Method "parseText" has been realized at "nlp" library.')
}

RRule.fromText = function (/* text, language */) {
  throw new Error('Method "fromText" has been realized at "nlp" library.')
}

RRule.optionsToString = function (options) {
  var key
  var value
  var strValues
  var pairs = []
  var keys = Object.keys(options)
  var defaultKeys = Object.keys(RRule.DEFAULT_OPTIONS)

  for (var i = 0; i < keys.length; i++) {
    if (!contains(defaultKeys, keys[i])) {
      continue
    }

    key = keys[i].toUpperCase()
    value = options[keys[i]]
    strValues = []

    if (value === null || value instanceof Array && !value.length) {
      continue
    }

    switch (key) {
    case 'FREQ':
      value = RRule.FREQUENCIES[options.freq]
      break
    case 'WKST':
      value = value.toString()
      break
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
      key = 'BYDAY'
      if (!(value instanceof Array)) {
        value = [value]
      }

      for (var wday, j = 0; j < value.length; j++) {
        wday = value[j]
        if (wday instanceof Weekday) {
          // good
        } else if (wday instanceof Array) {
          wday = new Weekday(wday[0], wday[1])
        } else {
          wday = new Weekday(wday)
        }
        strValues[j] = wday.toString()
      }
      value = strValues
      break
    case 'DTSTART':
    case 'UNTIL':
      value = dateutil.timeToUntilString(value)
      break
    default:
      if (value instanceof Array) {
        for (j = 0; j < value.length; j++) {
          strValues[j] = String(value[j])
        }
        value = strValues
      } else {
        value = String(value)
      }
    }
    pairs.push([key, value])
  }

  var strings = []
  for (i = 0; i < pairs.length; i++) {
    var attr = pairs[i]
    strings.push(attr[0] + '=' + attr[1].toString())
  }
  return strings.join(';')
}

RRule.prototype = {
  constructor: RRule,

  /**
   * @param {function} iterator - optional function that will be called
   *                   on each date that is added. It can return false
   *                   to stop the iteration.
   * @returns {array} containing all recurrences.
   */
  all: function (iterator) {
    if (iterator) {
      return this._iter(new CallbackIterResult('all', {}, iterator))
    } else {
      var result = this._cacheGet('all')
      if (result === false) {
        result = this._iter(new IterResult('all', {}))
        this._cacheAdd('all', result)
      }
      return result
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
  between: function (after, before, inc, iterator) {
    var args = {
      before: before,
      after: after,
      inc: inc
    }

    if (iterator) {
      return this._iter(new CallbackIterResult('between', args, iterator))
    }
    var result = this._cacheGet('between', args)
    if (result === false) {
      result = this._iter(new IterResult('between', args))
      this._cacheAdd('between', result, args)
    }
    return result
  },

  /**
   * Returns the last recurrence before the given datetime instance.
   * The inc keyword defines what happens if dt is an occurrence.
   * With inc == True, if dt itself is an occurrence, it will be returned.
   * @param {*} dt
   * @param {*} inc
   * @returns {Date|null}
   */
  before: function (dt, inc) {
    var args = {
      dt: dt,
      inc: inc
    }
    var result = this._cacheGet('before', args)
    if (result === false) {
      result = this._iter(new IterResult('before', args))
      this._cacheAdd('before', result, args)
    }
    return result
  },

  /**
   * Returns the first recurrence after the given datetime instance.
   * The inc keyword defines what happens if dt is an occurrence.
   * With inc == True, if dt itself is an occurrence, it will be returned.
   * @param {*} dt
   * @param {*} inc
   * @returns {Date|null}
   */
  after: function (dt, inc) {
    var args = {
      dt: dt,
      inc: inc
    }
    var result = this._cacheGet('after', args)
    if (result === false) {
      result = this._iter(new IterResult('after', args))
      this._cacheAdd('after', result, args)
    }
    return result
  },

  /**
   * Returns the number of recurrences in this set. It will have go trough
   * the whole recurrence, if this hasn't been done before.
   * @returns {number}
   */
  count: function () {
    return this.all().length
  },

  /**
   * Converts the rrule into its string representation
   * @see <http://www.ietf.org/rfc/rfc2445.txt>
   * @returns {string}
   */
  toString: function () {
    return RRule.optionsToString(this.origOptions)
  },

  /**
   * Will convert all rules described in nlp:ToText
   * to text.
   * @param {*} gettext
   * @param {*} language
   * @returns {string}
   */
  toText: function (/* gettext, language */) {
    throw new Error('Method "toText" has been realized at "nlp" library.')
  },

  /**
   * @returns {boolean}
   */
  isFullyConvertibleToText: function () {
    throw new Error('Method "isFullyConvertible" has been realized at "nlp" library.')
  },

  /**
   * @param {String} what - all/before/after/between
   * @param {Array|DateTime} value - an array of dates, one date, or null
   * @param {?Object} args - _iter arguments
   */
  _cacheAdd: function (what, value, args) {
    if (!this._cache) {
      return
    }

    if (value) {
      value = (value instanceof DateTime) ?
        dateutil.clone(value) : dateutil.cloneDates(value)
    }

    if (what === 'all') {
      this._cache.all = value
    } else {
      args._value = value
      this._cache[what].push(args)
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
  _cacheGet: function (what, args) {
    if (!this._cache) {
      return false
    }

    var cached = false
    var argsKeys = args ? Object.keys(args) : []
    var findCacheDiff = function (item) {
      for (var key, i = 0; i < argsKeys.length; i++) {
        key = argsKeys[i]
        if (String(args[key]) !== String(item[key])) {
          return true
        }
      }
      return false
    }

    if (what === 'all') {
      cached = this._cache.all
    } else {
      // Let's see whether we've already called the
      // 'what' method with the same 'args'
      for (var item, i = 0; i < this._cache[what].length; i++) {
        item = this._cache[what][i]
        if (argsKeys.length && findCacheDiff(item)) {
          continue
        }
        cached = item._value
        break
      }
    }

    if (!cached && this._cache.all) {
      // Not in the cache, but we already know all the occurrences,
      // so we can find the correct dates from the cached ones.
      var iterResult = new IterResult(what, args)
      for (i = 0; i < this._cache.all.length; i++) {
        if (!iterResult.accept(this._cache.all[i])) {
          break
        }
      }
      cached = iterResult.getValue()
      this._cacheAdd(what, cached, args)
    }

    return cached instanceof Array ?
      dateutil.cloneDates(cached) :
      (cached instanceof Date ? dateutil.clone(cached) : cached)
  },

  /**
   * @returns {RRule} a RRule instance with the same freq and options as this one (cache is not cloned)
   */
  clone: function () {
    return new RRule(this.origOptions)
  },

  _iter: function (iterResult) {
    /* Since JavaScript doesn't have the python's yield operator (<1.7),
       we use the IterResult object that tells us when to stop iterating.

    */

    var dtstart = this.options.dtstart
    var dtstartMillisecondModulo = this.options.dtstart % 1000

    var year = dtstart.getFullYear()
    var month = dtstart.getMonth() + 1
    var day = dtstart.getDate()
    var hour = dtstart.getHours()
    var minute = dtstart.getMinutes()
    var second = dtstart.getSeconds()
    var weekday = dateutil.getWeekday(dtstart)

    // Some local variables to speed things up a bit
    var freq = this.options.freq
    var interval = this.options.interval
    var wkst = this.options.wkst
    var until = this.options.until
    var bymonth = this.options.bymonth
    var byweekno = this.options.byweekno
    var byyearday = this.options.byyearday
    var byweekday = this.options.byweekday
    var byeaster = this.options.byeaster
    var bymonthday = this.options.bymonthday
    var bynmonthday = this.options.bynmonthday
    var bysetpos = this.options.bysetpos
    var byhour = this.options.byhour
    var byminute = this.options.byminute
    var bysecond = this.options.bysecond

    var ii = new Iterinfo(this)
    ii.rebuild(year, month)

    var getdayset = {}
    getdayset[RRule.YEARLY] = ii.ydayset
    getdayset[RRule.MONTHLY] = ii.mdayset
    getdayset[RRule.WEEKLY] = ii.wdayset
    getdayset[RRule.DAILY] = ii.ddayset
    getdayset[RRule.HOURLY] = ii.ddayset
    getdayset[RRule.MINUTELY] = ii.ddayset
    getdayset[RRule.SECONDLY] = ii.ddayset

    getdayset = getdayset[freq]

    var timeset
    if (freq < RRule.HOURLY) {
      timeset = this.timeset
    } else {
      var gettimeset = {}
      gettimeset[RRule.HOURLY] = ii.htimeset
      gettimeset[RRule.MINUTELY] = ii.mtimeset
      gettimeset[RRule.SECONDLY] = ii.stimeset
      gettimeset = gettimeset[freq]
      if ((freq >= RRule.HOURLY && plb(byhour) && !contains(byhour, hour)) ||
        (freq >= RRule.MINUTELY && plb(byminute) && !contains(byminute, minute)) ||
        (freq >= RRule.SECONDLY && plb(bysecond) && !contains(bysecond, minute))) {
        timeset = []
      } else {
        timeset = gettimeset.call(ii, hour, minute, second, dtstartMillisecondModulo)
      }
    }

    var total = 0
    var count = this.options.count
    var i
    var j
    var k
    var dm
    var div
    var mod
    var tmp
    var pos
    var dayset
    var start
    var end
    var fixday
    var filtered

    while (true) { // eslint-disable-line no-constant-condition
      // Get dayset with the right frequency
      tmp = getdayset.call(ii, year, month, day)
      dayset = tmp[0]
      start = tmp[1]
      end = tmp[2]

      // Do the "hard" work ;-)
      filtered = false
      for (j = start; j < end; j++) {
        i = dayset[j]

        filtered = (plb(bymonth) && !contains(bymonth, ii.mmask[i])) ||
          (plb(byweekno) && !ii.wnomask[i]) ||
          (plb(byweekday) && !contains(byweekday, ii.wdaymask[i])) ||
          (plb(ii.nwdaymask) && !ii.nwdaymask[i]) ||
          (byeaster !== null && !contains(ii.eastermask, i)) ||
          ((plb(bymonthday) || plb(bynmonthday)) &&
            !contains(bymonthday, ii.mdaymask[i]) &&
            !contains(bynmonthday, ii.nmdaymask[i])) ||
          (plb(byyearday) &&
            ((i < ii.yearlen &&
                !contains(byyearday, i + 1) &&
                !contains(byyearday, -ii.yearlen + i)) ||
              (i >= ii.yearlen &&
                !contains(byyearday, i + 1 - ii.yearlen) &&
                !contains(byyearday, -ii.nextyearlen + i - ii.yearlen))))

        if (filtered) {
          dayset[i] = null
        }
      }

      // Output results
      if (plb(bysetpos) && plb(timeset)) {
        var daypos
        var timepos
        var poslist = []

        for (i, j = 0; j < bysetpos.length; j++) {
          pos = bysetpos[j]

          if (pos < 0) {
            daypos = Math.floor(pos / timeset.length)
            timepos = pymod(pos, timeset.length)
          } else {
            daypos = Math.floor((pos - 1) / timeset.length)
            timepos = pymod((pos - 1), timeset.length)
          }

          try {
            tmp = []
            for (k = start; k < end; k++) {
              var val = dayset[k]
              if (val === null) {
                continue
              }
              tmp.push(val)
            }
            if (daypos < 0) {
              // we're trying to emulate python's aList[-n]
              i = tmp.slice(daypos)[0]
            } else {
              i = tmp[daypos]
            }

            var time = timeset[timepos]
            var date = dateutil.fromOrdinal(ii.yearordinal + i)
            var res = dateutil.combine(date, time)
            // XXX: can this ever be in the array?
            // - compare the actual date instead?
            if (!contains(poslist, res)) {
              poslist.push(res)
            }
          } catch (e) {
            // empty
          }
        }

        dateutil.sort(poslist)
        for (j = 0; j < poslist.length; j++) {
          res = poslist[j]
          if (until && res > until) {
            this._len = total
            return iterResult.getValue()
          } else if (res >= dtstart) {
            ++total
            if (!iterResult.accept(res)) {
              return iterResult.getValue()
            }
            if (count) {
              --count
              if (!count) {
                this._len = total
                return iterResult.getValue()
              }
            }
          }
        }
      } else {
        for (j = start; j < end; j++) {
          i = dayset[j]
          if (i !== null) {
            date = dateutil.fromOrdinal(ii.yearordinal + i)
            for (k = 0; k < timeset.length; k++) {
              time = timeset[k]
              res = dateutil.combine(date, time)
              if (until && res > until) {
                this._len = total
                return iterResult.getValue()
              } else if (res >= dtstart) {
                ++total
                if (!iterResult.accept(res)) {
                  return iterResult.getValue()
                }
                if (count) {
                  --count
                  if (!count) {
                    this._len = total
                    return iterResult.getValue()
                  }
                }
              }
            }
          }
        }
      }

      // Handle frequency and interval
      fixday = false
      if (freq === RRule.YEARLY) {
        year += interval
        if (year > dateutil.MAXYEAR) {
          this._len = total
          return iterResult.getValue()
        }
        ii.rebuild(year, month)
      } else if (freq === RRule.MONTHLY) {
        month += interval
        if (month > 12) {
          div = Math.floor(month / 12)
          mod = pymod(month, 12)
          month = mod
          year += div
          if (month === 0) {
            month = 12
            --year
          }
          if (year > dateutil.MAXYEAR) {
            this._len = total
            return iterResult.getValue()
          }
        }
        ii.rebuild(year, month)
      } else if (freq === RRule.WEEKLY) {
        if (wkst > weekday) {
          day += -(weekday + 1 + (6 - wkst)) + interval * 7
        } else {
          day += -(weekday - wkst) + interval * 7
        }
        weekday = wkst
        fixday = true
      } else if (freq === RRule.DAILY) {
        day += interval
        fixday = true
      } else if (freq === RRule.HOURLY) {
        if (filtered) {
          // Jump to one iteration before next day
          hour += Math.floor((23 - hour) / interval) * interval
        }
        while (true) { // eslint-disable-line no-constant-condition
          hour += interval
          dm = divmod(hour, 24)
          div = dm.div
          mod = dm.mod
          if (div) {
            hour = mod
            day += div
            fixday = true
          }
          if (!plb(byhour) || contains(byhour, hour)) {
            break
          }
        }
        timeset = gettimeset.call(ii, hour, minute, second)
      } else if (freq === RRule.MINUTELY) {
        if (filtered) {
          // Jump to one iteration before next day
          minute += Math.floor(
            (1439 - (hour * 60 + minute)) / interval) * interval
        }

        while (true) { // eslint-disable-line no-constant-condition
          minute += interval
          dm = divmod(minute, 60)
          div = dm.div
          mod = dm.mod
          if (div) {
            minute = mod
            hour += div
            dm = divmod(hour, 24)
            div = dm.div
            mod = dm.mod
            if (div) {
              hour = mod
              day += div
              fixday = true
              filtered = false
            }
          }
          if ((!plb(byhour) || contains(byhour, hour)) &&
            (!plb(byminute) || contains(byminute, minute))) {
            break
          }
        }
        timeset = gettimeset.call(ii, hour, minute, second)
      } else if (freq === RRule.SECONDLY) {
        if (filtered) {
          // Jump to one iteration before next day
          second += Math.floor(
            (86399 - (hour * 3600 + minute * 60 + second)) / interval) * interval
        }
        while (true) { // eslint-disable-line no-constant-condition
          second += interval
          dm = divmod(second, 60)
          div = dm.div
          mod = dm.mod
          if (div) {
            second = mod
            minute += div
            dm = divmod(minute, 60)
            div = dm.div
            mod = dm.mod
            if (div) {
              minute = mod
              hour += div
              dm = divmod(hour, 24)
              div = dm.div
              mod = dm.mod
              if (div) {
                hour = mod
                day += div
                fixday = true
              }
            }
          }
          if ((!plb(byhour) || contains(byhour, hour)) &&
            (!plb(byminute) || contains(byminute, minute)) &&
            (!plb(bysecond) || contains(bysecond, second))) {
            break
          }
        }
        timeset = gettimeset.call(ii, hour, minute, second)
      }

      if (fixday && day > 28) {
        var daysinmonth = dateutil.monthRange(year, month - 1)[1]
        if (day > daysinmonth) {
          while (day > daysinmonth) {
            day -= daysinmonth
            ++month
            if (month === 13) {
              month = 1
              ++year
              if (year > dateutil.MAXYEAR) {
                this._len = total
                return iterResult.getValue()
              }
            }
            daysinmonth = dateutil.monthRange(year, month - 1)[1]
          }
          ii.rebuild(year, month)
        }
      }
    }
  }

}

/**
 * @param {string} rfcString
 * @returns {Object}
 */
RRule.parseString = function (rfcString) {
  rfcString = rfcString.replace(/^\s+|\s+$/, '')
  if (!rfcString.length) {
    return null
  }

  var i
  var j
  var key
  var value
  var attr
  var attrs = rfcString.split(';')
  var options = {}

  for (i = 0; i < attrs.length; i++) {
    attr = attrs[i].split('=')
    key = attr[0]
    value = attr[1]
    switch (key) {
    case 'FREQ':
      options.freq = RRule[value]
      break
    case 'WKST':
      options.wkst = RRule[value]
      break
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
        value = value.split(',')
        for (j = 0; j < value.length; j++) {
          if (/^[+-]?\d+$/.test(value[j])) {
            value[j] = Number(value[j])
          }
        }
      } else if (/^[+-]?\d+$/.test(value)) {
        value = Number(value)
      }
      key = key.toLowerCase()
      options[key] = value
      break
    case 'BYDAY': // => byweekday
      var n
      var wday
      var day
      var days = value.split(',')

      options.byweekday = []
      for (j = 0; j < days.length; j++) {
        day = days[j]
        if (day.length === 2) { // MO, TU, ...
          wday = RRule[day] // wday instanceof Weekday
          options.byweekday.push(wday)
        } else { // -1MO, +3FR, 1SO, ...
          day = day.match(/^([+-]?\d)([A-Z]{2})$/)
          n = Number(day[1])
          wday = day[2]
          wday = RRule[wday].weekday
          options.byweekday.push(new Weekday(wday, n))
        }
      }
      break
    case 'DTSTART':
      options.dtstart = dateutil.untilStringToDate(value)
      break
    case 'UNTIL':
      options.until = dateutil.untilStringToDate(value)
      break
    case 'BYEASTER':
      options.byeaster = Number(value)
      break
    default:
      throw new Error(`Unknown RRULE property '${key}'`)
    }
  }
  return options
}

/**
 * @param {string} string
 * @returns {RRule}
 */
RRule.fromString = function (string) {
  return new RRule(RRule.parseString(string))
}
