import RRule from './RRule'
import RDateTime from './RDateTime'
import Time from './Time'
import * as dateutil from './dateutil'

import {
  pymod,
  repeat,
  plb,
  contains,
  range
} from './utils'

import {
  M365MASK,
  MDAY365MASK,
  NMDAY365MASK,
  WDAYMASK,
  M365RANGE,
  M366MASK,
  MDAY366MASK,
  NMDAY366MASK,
  M366RANGE
} from './constant'

export default function Iterinfo (rrule) {
  this.rrule = rrule
  this.lastyear = null
  this.lastmonth = null
  this.yearlen = null
  this.nextyearlen = null
  this.yearordinal = null
  this.yearweekday = null
  this.mmask = null
  this.mrange = null
  this.mdaymask = null
  this.nmdaymask = null
  this.wdaymask = null
  this.wnomask = null
  this.nwdaymask = null
  this.eastermask = null
}

Iterinfo.prototype.easter = function (y, offset) {
  offset = offset || 0

  var a = y % 19
  var b = Math.floor(y / 100)
  var c = y % 100
  var d = Math.floor(b / 4)
  var e = b % 4
  var f = Math.floor((b + 8) / 25)
  var g = Math.floor((b - f + 1) / 3)
  var h = Math.floor(19 * a + b - d - g + 15) % 30
  var i = Math.floor(c / 4)
  var k = c % 4
  var l = Math.floor(32 + 2 * e + 2 * i - h - k) % 7
  var m = Math.floor((a + 11 * h + 22 * l) / 451)
  var month = Math.floor((h + l - 7 * m + 114) / 31)
  var day = (h + l - 7 * m + 114) % 31 + 1
  var date = RDateTime.UTC(y, month - 1, day + offset) // eslint-disable-line new-cap
  var yearStart = RDateTime.UTC(y, 0, 1) // eslint-disable-line new-cap

  return [Math.ceil((date - yearStart) / (1000 * 60 * 60 * 24))]
}

Iterinfo.prototype.rebuild = function (year, month) {
  var rr = this.rrule

  if (year !== this.lastyear) {
    this.yearlen = dateutil.isLeapYear(year) ? 366 : 365
    this.nextyearlen = dateutil.isLeapYear(year + 1) ? 366 : 365
    var firstyday = new RDateTime(year, 0, 1)

    this.yearordinal = dateutil.toOrdinal(firstyday)
    this.yearweekday = dateutil.getWeekday(firstyday)

    var wday = dateutil.getWeekday(new RDateTime(year, 0, 1))

    if (this.yearlen === 365) {
      this.mmask = [].concat(M365MASK)
      this.mdaymask = [].concat(MDAY365MASK)
      this.nmdaymask = [].concat(NMDAY365MASK)
      this.wdaymask = WDAYMASK.slice(wday)
      this.mrange = [].concat(M365RANGE)
    } else {
      this.mmask = [].concat(M366MASK)
      this.mdaymask = [].concat(MDAY366MASK)
      this.nmdaymask = [].concat(NMDAY366MASK)
      this.wdaymask = WDAYMASK.slice(wday)
      this.mrange = [].concat(M366RANGE)
    }

    if (!plb(rr.options.byweekno)) {
      this.wnomask = null
    } else {
      this.wnomask = repeat(0, this.yearlen + 7)
      var no1wkst
      var firstwkst
      var wyearlen
      no1wkst = firstwkst = pymod(7 - this.yearweekday + rr.options.wkst, 7)
      if (no1wkst >= 4) {
        no1wkst = 0
        // Number of days in the year, plus the days we got
        // from last year.
        wyearlen = this.yearlen + pymod(this.yearweekday - rr.options.wkst, 7)
      } else {
        // Number of days in the year, minus the days we
        // left in last year.
        wyearlen = this.yearlen - no1wkst
      }
      var div = Math.floor(wyearlen / 7)
      var mod = pymod(wyearlen, 7)
      var numweeks = Math.floor(div + (mod / 4))
      for (var n, i, j = 0; j < rr.options.byweekno.length; j++) {
        n = rr.options.byweekno[j]
        if (n < 0) {
          n += numweeks + 1
        }
        if (!(n > 0 && n <= numweeks)) {
          continue
        }
        if (n > 1) {
          i = no1wkst + (n - 1) * 7
          if (no1wkst !== firstwkst) {
            i -= 7 - firstwkst
          }
        } else {
          i = no1wkst
        }
        for (var k = 0; k < 7; k++) {
          this.wnomask[i] = 1
          i++
          if (this.wdaymask[i] === rr.options.wkst) {
            break
          }
        }
      }

      if (contains(rr.options.byweekno, 1)) {
        // Check week number 1 of next year as well
        // orig-TODO : Check -numweeks for next year.
        i = no1wkst + numweeks * 7
        if (no1wkst !== firstwkst) {
          i -= 7 - firstwkst
        }
        if (i < this.yearlen) {
          // If week starts in next year, we
          // don't care about it.
          for (j = 0; j < 7; j++) {
            this.wnomask[i] = 1
            i += 1
            if (this.wdaymask[i] === rr.options.wkst) {
              break
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
        var lnumweeks
        if (!contains(rr.options.byweekno, -1)) {
          var lyearweekday = dateutil.getWeekday(new RDateTime(year - 1, 0, 1))
          var lno1wkst = pymod(7 - lyearweekday + rr.options.wkst, 7)
          var lyearlen = dateutil.isLeapYear(year - 1) ? 366 : 365
          if (lno1wkst >= 4) {
            lno1wkst = 0
            lnumweeks = Math.floor(52 +
              pymod(lyearlen + pymod(lyearweekday - rr.options.wkst, 7), 7) / 4)
          } else {
            lnumweeks = Math.floor(52 + pymod(this.yearlen - no1wkst, 7) / 4)
          }
        } else {
          lnumweeks = -1
        }
        if (contains(rr.options.byweekno, lnumweeks)) {
          for (i = 0; i < no1wkst; i++) {
            this.wnomask[i] = 1
          }
        }
      }
    }
  }

  if (plb(rr.options.bynweekday) && (month !== this.lastmonth || year !== this.lastyear)) {
    var ranges = []
    if (rr.options.freq === RRule.YEARLY) {
      if (plb(rr.options.bymonth)) {
        for (j = 0; j < rr.options.bymonth.length; j++) {
          month = rr.options.bymonth[j]
          ranges.push(this.mrange.slice(month - 1, month + 1))
        }
      } else {
        ranges = [
          [0, this.yearlen]
        ]
      }
    } else if (rr.options.freq === RRule.MONTHLY) {
      ranges = [this.mrange.slice(month - 1, month + 1)]
    }
    if (plb(ranges)) {
      // Weekly frequency won't get here, so we may not
      // care about cross-year weekly periods.
      this.nwdaymask = repeat(0, this.yearlen)

      for (j = 0; j < ranges.length; j++) {
        var rang = ranges[j]
        var first = rang[0]
        var last = rang[1]
        last -= 1
        for (k = 0; k < rr.options.bynweekday.length; k++) {
          wday = rr.options.bynweekday[k][0]
          n = rr.options.bynweekday[k][1]
          if (n < 0) {
            i = last + (n + 1) * 7
            i -= pymod(this.wdaymask[i] - wday, 7)
          } else {
            i = first + (n - 1) * 7
            i += pymod(7 - this.wdaymask[i] + wday, 7)
          }
          if (first <= i && i <= last) {
            this.nwdaymask[i] = 1
          }
        }
      }
    }

    this.lastyear = year
    this.lastmonth = month
  }

  if (rr.options.byeaster !== null) {
    this.eastermask = this.easter(year, rr.options.byeaster)
  }
}

Iterinfo.prototype.ydayset = function (/* year, month, day */) {
  return [range(this.yearlen), 0, this.yearlen]
}

Iterinfo.prototype.mdayset = function (year, month /* , day */) {
  var set = repeat(null, this.yearlen)
  var start = this.mrange[month - 1]
  var end = this.mrange[month]
  for (var i = start; i < end; i++) {
    set[i] = i
  }
  return [set, start, end]
}

Iterinfo.prototype.wdayset = function (year, month, day) {
  // We need to handle cross-year weeks here.
  var set = repeat(null, this.yearlen + 7)
  var i = dateutil.toOrdinal(new RDateTime(year, month - 1, day)) - this.yearordinal
  var start = i
  for (var j = 0; j < 7; j++) {
    set[i] = i
    ++i
    if (this.wdaymask[i] === this.rrule.options.wkst) {
      break
    }
  }
  return [set, start, i]
}

Iterinfo.prototype.ddayset = function (year, month, day) {
  var set = repeat(null, this.yearlen)
  var i = dateutil.toOrdinal(new RDateTime(year, month - 1, day)) - this.yearordinal
  set[i] = i
  return [set, i, i + 1]
}

Iterinfo.prototype.htimeset = function (hour, minute, second, millisecond) {
  var set = []
  var rr = this.rrule
  for (var i = 0; i < rr.options.byminute.length; i++) {
    minute = rr.options.byminute[i]
    for (var j = 0; j < rr.options.bysecond.length; j++) {
      second = rr.options.bysecond[j]
      set.push(new Time(hour, minute, second, millisecond))
    }
  }
  dateutil.sort(set)
  return set
}

Iterinfo.prototype.mtimeset = function (hour, minute, second, millisecond) {
  var set = []
  var rr = this.rrule
  for (var j = 0; j < rr.options.bysecond.length; j++) {
    second = rr.options.bysecond[j]
    set.push(new Time(hour, minute, second, millisecond))
  }
  dateutil.sort(set)
  return set
}

Iterinfo.prototype.stimeset = function (hour, minute, second, millisecond) {
  return [new Time(hour, minute, second, millisecond)]
}
