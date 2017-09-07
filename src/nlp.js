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

import {
  RRule
} from 'rrule'

import Parser from './nlp/Parser'
import ToText from './nlp/ToText'

import {
  ENGLISH
} from './nlp/constant'

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
export function fromText (text, language) {
  return new RRule(parseText(text, language))
}

export function parseText (text, language) {
  var options = {}
  var ttr = new Parser((language || ENGLISH).tokens)

  if (!ttr.start(text)) {
    return null
  }

  parseOptions()
  return options

  function parseOptions () {
    // every [n]
    var n

    ttr.expect('every')
    if ((n = ttr.accept('number'))) {
      options.interval = parseInt(n[0], 10)
    }
    if (ttr.isDone()) {
      throw new Error('Unexpected end')
    }

    switch (ttr.symbol) {
      case 'day(s)':
        options.freq = RRule.DAILY
        if (ttr.nextSymbol()) {
          parseAt()
          parseForUntil()
        }
        break

        // FIXME Note: every 2 weekdays != every two weeks on weekdays.
        // DAILY on weekdays is not a valid rule
      case 'weekday(s)':
        options.freq = RRule.WEEKLY
        options.byweekday = [
          RRule.MO,
          RRule.TU,
          RRule.WE,
          RRule.TH,
          RRule.FR
        ]
        ttr.nextSymbol()
        parseForUntil()
        break

      case 'week(s)':
        options.freq = RRule.WEEKLY
        if (ttr.nextSymbol()) {
          parseOnThe()
          parseForUntil()
        }
        break

      case 'hour(s)':
        options.freq = RRule.HOURLY
        if (ttr.nextSymbol()) {
          parseOnThe()
          parseForUntil()
        }
        break

      case 'month(s)':
        options.freq = RRule.MONTHLY
        if (ttr.nextSymbol()) {
          parseOnThe()
          parseForUntil()
        }
        break

      case 'year(s)':
        options.freq = RRule.YEARLY
        if (ttr.nextSymbol()) {
          parseOnThe()
          parseForUntil()
        }
        break

      case 'monday':
      case 'tuesday':
      case 'wednesday':
      case 'thursday':
      case 'friday':
      case 'saturday':
      case 'sunday':
        options.freq = RRule.WEEKLY
        options.byweekday = [RRule[ttr.symbol.substr(0, 2).toUpperCase()]]

        if (!ttr.nextSymbol()) {
          return
        }

        // TODO check for duplicates
        while (ttr.accept('comma')) {
          if (ttr.isDone()) {
            throw new Error('Unexpected end')
          }

          var wkd
          if (!(wkd = decodeWKD())) {
            throw new Error('Unexpected symbol ' + ttr.symbol + ', expected weekday')
          }

          options.byweekday.push(RRule[wkd])
          ttr.nextSymbol()
        }
        parseMDAYs()
        parseForUntil()
        break

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
        options.freq = RRule.YEARLY
        options.bymonth = [decodeM()]

        if (!ttr.nextSymbol()) {
          return
        }

        // TODO check for duplicates
        while (ttr.accept('comma')) {
          if (ttr.isDone()) {
            throw new Error('Unexpected end')
          }

          var m
          if (!(m = decodeM())) {
            throw new Error('Unexpected symbol ' + ttr.symbol + ', expected month')
          }

          options.bymonth.push(m)
          ttr.nextSymbol()
        }

        parseOnThe()
        parseForUntil()
        break

      default:
        throw new Error('Unknown symbol')
    }
  }

  function parseOnThe () {
    var on = ttr.accept('on')
    var the = ttr.accept('the')
    if (!(on || the)) {
      return
    }

    do {
      var nth
      var wkd
      var m

      // nth <weekday> | <weekday>
      if ((nth = decodeNTH())) {
        // ttr.nextSymbol()

        if ((wkd = decodeWKD())) {
          ttr.nextSymbol()
          if (!options.byweekday) {
            options.byweekday = []
          }
          options.byweekday.push(RRule[wkd].nth(nth))
        } else {
          if (!options.bymonthday) {
            options.bymonthday = []
          }
          options.bymonthday.push(nth)
          ttr.accept('day(s)')
        }
        // <weekday>
      } else if ((wkd = decodeWKD())) {
        ttr.nextSymbol()
        if (!options.byweekday) {
          options.byweekday = []
        }
        options.byweekday.push(RRule[wkd])
      } else if (ttr.symbol === 'weekday(s)') {
        ttr.nextSymbol()
        if (!options.byweekday) {
          options.byweekday = []
        }
        options.byweekday.push(RRule.MO)
        options.byweekday.push(RRule.TU)
        options.byweekday.push(RRule.WE)
        options.byweekday.push(RRule.TH)
        options.byweekday.push(RRule.FR)
      } else if (ttr.symbol === 'week(s)') {
        ttr.nextSymbol()
        var n
        if (!(n = ttr.accept('number'))) {
          throw new Error('Unexpected symbol ' + ttr.symbol + ', expected week number')
        }
        options.byweekno = [n[0]]
        while (ttr.accept('comma')) {
          if (!(n = ttr.accept('number'))) {
            throw new Error('Unexpected symbol ' + ttr.symbol + '; expected monthday')
          }
          options.byweekno.push(n[0])
        }
      } else if ((m = decodeM())) {
        ttr.nextSymbol()
        if (!options.bymonth) {
          options.bymonth = []
        }
        options.bymonth.push(m)
      } else {
        return
      }
    } while (ttr.accept('comma') || ttr.accept('the') || ttr.accept('on'))
  }

  function parseAt () {
    var at = ttr.accept('at')
    if (!at) {
      return
    }

    do {
      var n
      if (!(n = ttr.accept('number'))) {
        throw new Error('Unexpected symbol ' + ttr.symbol + ', expected hour')
      }
      options.byhour = [n[0]]
      while (ttr.accept('comma')) {
        if (!(n = ttr.accept('number'))) {
          throw new Error('Unexpected symbol ' + ttr.symbol + '; expected hour')
        }
        options.byhour.push(n[0])
      }
    } while (ttr.accept('comma') || ttr.accept('at'))
  }

  function decodeM () {
    switch (ttr.symbol) {
      case 'january':
        return 1
      case 'february':
        return 2
      case 'march':
        return 3
      case 'april':
        return 4
      case 'may':
        return 5
      case 'june':
        return 6
      case 'july':
        return 7
      case 'august':
        return 8
      case 'september':
        return 9
      case 'october':
        return 10
      case 'november':
        return 11
      case 'december':
        return 12
      default:
        return false
    }
  }

  function decodeWKD () {
    switch (ttr.symbol) {
      case 'monday':
      case 'tuesday':
      case 'wednesday':
      case 'thursday':
      case 'friday':
      case 'saturday':
      case 'sunday':
        return ttr.symbol.substr(0, 2).toUpperCase()
      default:
        return false
    }
  }

  function decodeNTH () {
    switch (ttr.symbol) {
      case 'last':
        ttr.nextSymbol()
        return -1
      case 'first':
        ttr.nextSymbol()
        return 1
      case 'second':
        ttr.nextSymbol()
        return ttr.accept('last') ? -2 : 2
      case 'third':
        ttr.nextSymbol()
        return ttr.accept('last') ? -3 : 3
      case 'nth':
        var v = parseInt(ttr.value[1], 10)
        if (v < -366 || v > 366) {
          throw new Error('Nth out of range: ' + v)
        }

        ttr.nextSymbol()
        return ttr.accept('last') ? -v : v

      default:
        return false
    }
  }

  function parseMDAYs () {
    ttr.accept('on')
    ttr.accept('the')

    var nth
    if (!(nth = decodeNTH())) {
      return
    }

    options.bymonthday = [nth]
    ttr.nextSymbol()

    while (ttr.accept('comma')) {
      if (!(nth = decodeNTH())) {
        throw new Error('Unexpected symbol ' + ttr.symbol + '; expected monthday')
      }

      options.bymonthday.push(nth)
      ttr.nextSymbol()
    }
  }

  function parseForUntil () {
    if (ttr.symbol === 'until') {
      var date = Date.parse(ttr.text)

      if (!date) {
        throw new Error('Cannot parse until date:' + ttr.text)
      }
      options.until = new Date(date)
    } else if (ttr.accept('for')) {
      options.count = ttr.value[0]
      ttr.expect('number')
      // ttr.expect('times')
    }
  }
}

export const isFullyConvertibleToText = ToText.isFullyConvertible

export function toText (rrule, gettext, language) {
  return new ToText(rrule, gettext, language).toString()
}
