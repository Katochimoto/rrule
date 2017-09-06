import RRule from './RRule'
import RRuleSet from './RRuleSet'
import Weekday from './Weekday'
import * as dateutil from './dateutil'

import {
  split,
  contains
} from './utils'

/**
 * RRuleStr
 *  To parse a set of rrule strings
 */

export default function RRuleStr () {}

RRuleStr.DEFAULT_OPTIONS = {
  dtstart: null,
  cache: false,
  unfold: false,
  forceset: false,
  compatible: false,
  ignoretz: false,
  tzinfos: null
}

RRuleStr._freqMap = {
  'YEARLY': RRule.YEARLY,
  'MONTHLY': RRule.MONTHLY,
  'WEEKLY': RRule.WEEKLY,
  'DAILY': RRule.DAILY,
  'HOURLY': RRule.HOURLY,
  'MINUTELY': RRule.MINUTELY,
  'SECONDLY': RRule.SECONDLY
}

RRuleStr._weekdayMap = {
  'MO': 0,
  'TU': 1,
  'WE': 2,
  'TH': 3,
  'FR': 4,
  'SA': 5,
  'SU': 6
}

RRuleStr.prototype = {
  constructor: RRuleStr,

  _handleInt: function (rrkwargs, name, value /* , options */) {
    rrkwargs[name.toLowerCase()] = parseInt(value, 10)
  },

  _handleIntList: function (rrkwargs, name, value /* , options */) {
    rrkwargs[name.toLowerCase()] = value.split(',').map(function (x) {
      return parseInt(x, 10)
    })
  },

  _handleFREQ: function (rrkwargs, name, value /* , options */) {
    rrkwargs['freq'] = RRuleStr._freqMap[value]
  },

  _handleUNTIL: function (rrkwargs, name, value /* , options */) {
    try {
      rrkwargs['until'] = dateutil.untilStringToDate(value)
    } catch (error) {
      throw new Error('invalid until date')
    }
  },

  _handleWKST: function (rrkwargs, name, value /* , options */) {
    rrkwargs['wkst'] = RRuleStr._weekdayMap[value]
  },

  _handleBYWEEKDAY: function (rrkwargs, name, value /* , options */) {
    // Two ways to specify this: +1MO or MO(+1)
    var splt
    var i
    var j
    var n
    var w
    var wday
    var l = []
    var wdays = value.split(',')

    for (i = 0; i < wdays.length; i++) {
      wday = wdays[i]
      if (wday.indexOf('(') > -1) {
        // If it's of the form TH(+1), etc.
        splt = wday.split('(')
        w = splt[0]
        n = parseInt(splt.slice(1, -1), 10)
      } else {
        // # If it's of the form +1MO
        for (j = 0; j < wday.length; j++) {
          if ('+-0123456789'.indexOf(wday[j]) === -1) {
            break
          }
        }
        n = wday.slice(0, j) || null
        w = wday.slice(j)

        if (n) {
          n = parseInt(n, 10)
        }
      }

      var weekday = new Weekday(RRuleStr._weekdayMap[w], n)
      l.push(weekday)
    }
    rrkwargs['byweekday'] = l
  },

  _parseRfcRRule: function (line, options) {
    options = options || {}
    options.dtstart = options.dtstart || null
    options.cache = options.cache || false
    options.ignoretz = options.ignoretz || false
    options.tzinfos = options.tzinfos || null

    var name
    var value
    var parts
    if (line.indexOf(':') !== -1) {
      parts = line.split(':')
      name = parts[0]
      value = parts[1]

      if (name !== 'RRULE') {
        throw new Error('unknown parameter name')
      }
    } else {
      value = line
    }

    var i
    var rrkwargs = {}
    var pairs = value.split(';')

    for (i = 0; i < pairs.length; i++) {
      parts = pairs[i].split('=')
      name = parts[0].toUpperCase()
      value = parts[1].toUpperCase()

      try {
        this['_handle' + name](rrkwargs, name, value, {
          ignoretz: options.ignoretz,
          tzinfos: options.tzinfos
        })
      } catch (error) {
        throw new Error(`unknown parameter '${name}':${value}`)
      }
    }
    rrkwargs.dtstart = rrkwargs.dtstart || options.dtstart
    return new RRule(rrkwargs, !options.cache)
  },

  _parseRfc: function (s, options) {
    if (options.compatible) {
      options.forceset = true
      options.unfold = true
    }

    s = s && s.toUpperCase().trim()
    if (!s) {
      throw new Error('Invalid empty string')
    }

    var i = 0
    var line
    var lines

    // More info about 'unfold' option
    // Go head to http://www.ietf.org/rfc/rfc2445.txt
    if (options.unfold) {
      lines = s.split('\n')
      while (i < lines.length) {
        // TODO
        line = lines[i] = lines[i].replace(/\s+$/g, '')
        if (!line) {
          lines.splice(i, 1)
        } else if (i > 0 && line[0] === ' ') {
          lines[i - 1] += line.slice(1)
          lines.splice(i, 1)
        } else {
          i += 1
        }
      }
    } else {
      lines = s.split(/\s/)
    }

    var rrulevals = []
    var rdatevals = []
    var exrulevals = []
    var exdatevals = []
    var name
    var value
    var parts
    var parms
    var parm
    var dtstart
    var rset
    var j
    var k
    var datestrs
    var datestr

    if (!options.forceset && lines.length === 1 && (s.indexOf(':') === -1 ||
        s.indexOf('RRULE:') === 0)) {
      return this._parseRfcRRule(lines[0], {
        cache: options.cache,
        dtstart: options.dtstart,
        ignoretz: options.ignoretz,
        tzinfos: options.tzinfos
      })
    } else {
      for (i = 0; i < lines.length; i++) {
        line = lines[i]
        if (!line) {
          continue
        }
        if (line.indexOf(':') === -1) {
          name = 'RRULE'
          value = line
        } else {
          parts = split(line, ':', 1)
          name = parts[0]
          value = parts[1]
        }
        parms = name.split(';')
        if (!parms) {
          throw new Error('empty property name')
        }
        name = parms[0]
        parms = parms.slice(1)

        if (name === 'RRULE') {
          for (j = 0; j < parms.length; j++) {
            parm = parms[j]
            throw new Error('unsupported RRULE parm: ' + parm)
          }
          rrulevals.push(value)
        } else if (name === 'RDATE') {
          for (j = 0; j < parms.length; j++) {
            parm = parms[j]
            if (parm !== 'VALUE=DATE-TIME') {
              throw new Error('unsupported RDATE parm: ' + parm)
            }
          }
          rdatevals.push(value)
        } else if (name === 'EXRULE') {
          for (j = 0; j < parms.length; j++) {
            parm = parms[j]
            throw new Error('unsupported EXRULE parm: ' + parm)
          }
          exrulevals.push(value)
        } else if (name === 'EXDATE') {
          for (j = 0; j < parms.length; j++) {
            parm = parms[j]
            if (parm !== 'VALUE=DATE-TIME') {
              throw new Error('unsupported RDATE parm: ' + parm)
            }
          }
          exdatevals.push(value)
        } else if (name === 'DTSTART') {
          dtstart = dateutil.untilStringToDate(value)
        } else {
          throw new Error('unsupported property: ' + name)
        }
      }

      if (options.forceset || rrulevals.length > 1 || rdatevals.length ||
        exrulevals.length || exdatevals.length) {
        rset = new RRuleSet(!options.cache)
        for (j = 0; j < rrulevals.length; j++) {
          rset.rrule(this._parseRfcRRule(rrulevals[j], {
            dtstart: options.dtstart || dtstart,
            ignoretz: options.ignoretz,
            tzinfos: options.tzinfos
          }))
        }
        for (j = 0; j < rdatevals.length; j++) {
          datestrs = rdatevals[j].split(',')
          for (k = 0; k < datestrs.length; k++) {
            datestr = datestrs[k]
            rset.rdate(dateutil.untilStringToDate(datestr))
          }
        }
        for (j = 0; j < exrulevals.length; j++) {
          rset.exrule(this._parseRfcRRule(exrulevals[j], {
            dtstart: options.dtstart || dtstart,
            ignoretz: options.ignoretz,
            tzinfos: options.tzinfos
          }))
        }
        for (j = 0; j < exdatevals.length; j++) {
          datestrs = exdatevals[j].split(',')
          for (k = 0; k < datestrs.length; k++) {
            datestr = datestrs[k]
            rset.exdate(dateutil.untilStringToDate(datestr))
          }
        }

        if (options.campatiable && options.dtstart) {
          rset.rdate(dtstart)
        }
        return rset
      } else {
        return this._parseRfcRRule(rrulevals[0], {
          dtstart: options.dtstart || dtstart,
          cache: options.cache,
          ignoretz: options.ignoretz,
          tzinfos: options.tzinfos
        })
      }
    }
  },

  parse: function (s, options) {
    options = options || {}

    var invalid = []
    var keys = Object.keys(options)
    var defaultKeys = Object.keys(RRuleStr.DEFAULT_OPTIONS)

    keys.forEach(function (key) {
      if (!contains(defaultKeys, key)) {
        invalid.push(key)
      }
    }, this)

    if (invalid.length) {
      throw new Error('Invalid options: ' + invalid.join(', '))
    }

    // Merge in default options
    defaultKeys.forEach(function (key) {
      if (!contains(keys, key)) {
        options[key] = RRuleStr.DEFAULT_OPTIONS[key]
      }
    })

    return this._parseRfc(s, options)
  }
}

RRuleStr.prototype._handleDTSTART = function (rrkwargs, name, value /* , options */) {
  rrkwargs[name.toLowerCase()] = dateutil.untilStringToDate(value)
}

RRuleStr.prototype._handleBYDAY = RRuleStr.prototype._handleBYWEEKDAY
RRuleStr.prototype._handleINTERVAL = RRuleStr.prototype._handleInt
RRuleStr.prototype._handleCOUNT = RRuleStr.prototype._handleInt

;[
  '_handleBYSETPOS', '_handleBYMONTH', '_handleBYMONTHDAY',
  '_handleBYYEARDAY', '_handleBYEASTER', '_handleBYWEEKNO',
  '_handleBYHOUR', '_handleBYMINUTE', '_handleBYSECOND'
].forEach(function (method) {
  RRuleStr.prototype[method] = RRuleStr.prototype._handleIntList
})
