/**
 * Simplified version of python's range()
 * @param {*} start
 * @param {*} end
 * @returns {array}
 */
export function range (start, end) {
  if (arguments.length === 1) {
    end = start
    start = 0
  }
  var rang = []
  for (var i = start; i < end; i++) {
    rang.push(i)
  }
  return rang
}

/**
 *
 * @param {*} value
 * @param {*} times
 * @returns {array}
 */
export function repeat (value, times) {
  var i = 0
  var array = []

  if (value instanceof Array) {
    for (; i < times; i++) {
      array[i] = [].concat(value)
    }
  } else {
    for (; i < times; i++) {
      array[i] = value
    }
  }
  return array
}

/**
 *
 * @param {*} str
 * @param {*} sep
 * @param {*} num
 * @returns {array}
 */
export function split (str, sep, num) {
  var splits = str.split(sep)
  return num ?
    splits.slice(0, num).concat([splits.slice(num).join(sep)]) : splits
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
export function pymod (a, b) {
  var r = a % b
  // If r and b differ in sign, add b to wrap the result to the correct sign.
  return (r * b < 0) ? r + b : r
}

/**
 * @see: <http://docs.python.org/library/functions.html#divmod>
 * @param {*} a
 * @param {*} b
 * @returns {Object}
 */
export function divmod (a, b) {
  return {
    div: Math.floor(a / b),
    mod: pymod(a, b)
  }
}

/**
 * Python-like boolean
 * @param {Object} obj
 * @returns {boolean} value of an object/primitive, taking into account
 * the fact that in Python an empty list's/tuple's
 * boolean value is False, whereas in JS it's true
 */
export function plb (obj) {
  return (obj instanceof Array && obj.length === 0) ?
    false : Boolean(obj)
}

/**
 * Return true if a value is in an array
 * @param {array} arr
 * @param {*} val
 * @returns {boolean}
 */
export function contains (arr, val) {
  return arr.indexOf(val) !== -1
}
