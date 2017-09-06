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

import RRule from './rrule/RRule'
import DateTime from './rrule/DateTime'
import RRuleSet from './rrule/RRuleSet'
import RRuleStr from './rrule/RRuleStr'

// Only one RRuleStr instance for all rrule string parsing work.
const rruleStr = new RRuleStr()

function rrulestr (...args) {
  return rruleStr.parse(...args)
}

RRule.RRule = RRule
RRule.DateTime = DateTime
RRule.RRuleSet = RRuleSet
RRule.rrulestr = rrulestr

export {
  RRule as default,
  RRule,
  DateTime,
  RRuleSet,
  rrulestr
}
