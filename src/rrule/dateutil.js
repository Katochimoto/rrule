/**
 * General date-related utilities.
 * Also handles several incompatibilities between JavaScript and Python
 *
 */

import DateTime from './DateTime'

export const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

/**
 * @see: <http://docs.python.org/library/datetime.html#datetime.MAXYEAR>
 */
export const MAXYEAR = 9999

/**
 * Number of milliseconds of one day
 */
export const ONE_DAY = 1000 * 60 * 60 * 24

/**
 * Python: MO-SU: 0 - 6
 * JS: SU-SAT 0 - 6
 */
export const PY_WEEKDAYS = [6, 0, 1, 2, 3, 4, 5]

/**
 * Python uses 1-Jan-1 as the base for calculating ordinals but we don't
 * want to confuse the JS engine with milliseconds > Number.MAX_NUMBER,
 * therefore we use 1-Jan-1970 instead
 */
export const ORDINAL_BASE = new DateTime(1970, 0, 1)


/**
 *
 * @param {DateTime} date
 * @returns {number}
 */
export function getYearDay (date) {
  var dateNoTime = new DateTime(
    date.getFullYear(), date.getMonth(), date.getDate())
  return Math.ceil(
    (dateNoTime - new DateTime(date.getFullYear(), 0, 1)) / ONE_DAY) + 1
}

/**
 *
 * @param {DateTime} year
 * @returns {boolean}
 */
export function isLeapYear (year) {
  if (year instanceof DateTime) {
    year = year.getFullYear()
  }
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)
}

/**
 * @param {DateTime} date
 * @returns {number} the date's timezone offset in ms
 */
export function tzOffset (date) {
  return date.getTimezoneOffset() * 60 * 1000
}

/**
 * @see: <http://www.mcfedries.com/JavaScript/DaysBetween.asp>
 * @param {*} date1
 * @param {*} date2
 * @returns {number}
 */
export function daysBetween (date1, date2) {
  // The number of milliseconds in one day
  // Convert both dates to milliseconds
  var msDate1 = date1.getTime() - tzOffset(date1)
  var msDate2 = date2.getTime() - tzOffset(date2)
  // Calculate the difference in milliseconds
  var msDifference = Math.abs(msDate1 - msDate2)
  // Convert back to days and return
  return Math.round(msDifference / ONE_DAY)
}

/**
 * @see: <http://docs.python.org/library/datetime.html#datetime.date.toordinal>
 * @param {*} date
 * @returns {number}
 */
export function toOrdinal (date) {
  return daysBetween(date, ORDINAL_BASE)
}

/**
 * @see - <http://docs.python.org/library/datetime.html#datetime.date.fromordinal>
 * @param {*} ordinal
 * @returns {DateTime}
 */
export function fromOrdinal (ordinal) {
  var millisecsFromBase = ordinal * ONE_DAY
  return new DateTime(ORDINAL_BASE.getTime() -
    tzOffset(ORDINAL_BASE) +
    millisecsFromBase +
    tzOffset(new DateTime(millisecsFromBase)))
}

/**
 * @see: <http://docs.python.org/library/calendar.html#calendar.monthrange>
 * @param {*} year
 * @param {*} month
 * @returns {array}
 */
export function monthRange (year, month) {
  var date = new DateTime(year, month, 1)
  return [getWeekday(date), getMonthDays(date)]
}

/**
 *
 * @param {*} date
 * @returns {number}
 */
export function getMonthDays (date) {
  var month = date.getMonth()
  return month === 1 && isLeapYear(date) ?
    29 : MONTH_DAYS[month]
}

/**
 *
 * @param {*} date
 * @returns {number} python-like weekday
 */
export function getWeekday (date) {
  return PY_WEEKDAYS[date.getDay()]
}

/**
 * @see: <http://docs.python.org/library/datetime.html#datetime.datetime.combine>
 * @param {*} date
 * @param {*} time
 * @returns {DateTime}
 */
export function combine (date, time) {
  time = time || date
  return new DateTime(
    date.getFullYear(), date.getMonth(), date.getDate(),
    time.getHours(), time.getMinutes(), time.getSeconds(),
    time.getMilliseconds())
}

/**
 *
 * @param {*} date
 * @returns {DateTime}
 */
export function clone (date) {
  return new DateTime(date.getTime())
}

/**
 *
 * @param {*} dates
 * @returns {DateTime}
 */
export function cloneDates (dates) {
  var clones = []
  for (var i = 0; i < dates.length; i++) {
    clones.push(clone(dates[i]))
  }
  return clones
}

/**
 * Sorts an array of Date or Time objects
 * @param {*} dates
 */
export function sort (dates) {
  dates.sort(function (a, b) {
    return a.getTime() - b.getTime()
  })
}

/**
 *
 * @param {*} time
 * @returns {string}
 */
export function timeToUntilString (time) {
  var comp
  var date = new DateTime(time)
  var comps = [
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate(),
    'T',
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
    'Z'
  ]

  for (var i = 0; i < comps.length; i++) {
    comp = comps[i]
    if (!/[TZ]/.test(comp) && comp < 10) {
      comps[i] = '0' + String(comp)
    }
  }
  return comps.join('')
}

/**
 *
 * @param {*} until
 * @returns {DateTime}
 */
export function untilStringToDate (until) {
  var re = /^(\d{4})(\d{2})(\d{2})(T(\d{2})(\d{2})(\d{2})Z)?$/
  var bits = re.exec(until)
  if (!bits) {
    throw new Error('Invalid UNTIL value: ' + until)
  }
  return new DateTime(DateTime.UTC( // eslint-disable-line new-cap
    bits[1],
    bits[2] - 1,
    bits[3],
    bits[5] || 0,
    bits[6] || 0,
    bits[7] || 0))
}
