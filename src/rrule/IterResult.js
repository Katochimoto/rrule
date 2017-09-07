import DateTime from './DateTime'

/**
 * This class helps us to emulate python's generators, sorta.
 * @param {*} method
 * @param {*} args
 */
export default class IterResult {
  constructor (method, args) {
    this.method = method
    this.args = args
    this.minDate = null
    this.maxDate = null
    this._result = []

    if (method === 'between') {
      this.maxDate = args.inc ?
        args.before : new DateTime(args.before.getTime() - 1)
      this.minDate = args.inc ?
        args.after : new DateTime(args.after.getTime() + 1)
    } else if (method === 'before') {
      this.maxDate = args.inc ? args.dt : new DateTime(args.dt.getTime() - 1)
    } else if (method === 'after') {
      this.minDate = args.inc ? args.dt : new DateTime(args.dt.getTime() + 1)
    }
  }

  /**
   * Possibly adds a date into the result.
   *
   * @param {Date} date - the date isn't necessarly added to the result
   *                      list (if it is too late/too early)
   * @returns {Boolean} true if it makes sense to continue the iteration
   *                   false if we're done.
   */
  accept (date) {
    var tooEarly = this.minDate && date < this.minDate
    var tooLate = this.maxDate && date > this.maxDate

    if (this.method === 'between') {
      if (tooEarly) {
        return true
      }
      if (tooLate) {
        return false
      }
    } else if (this.method === 'before') {
      if (tooLate) {
        return false
      }
    } else if (this.method === 'after') {
      if (tooEarly) {
        return true
      }
      this.add(date)
      return false
    }

    return this.add(date)
  }

  /**
   *
   * @param {DateTime} date that is part of the result.
   * @returns {boolean} whether we are interested in more values.
   */
  add (date) {
    this._result.push(date)
    return true
  }

  /**
   * 'before' and 'after' return only one date, whereas 'all' and 'between' an array.
   * @returns {DateTime|array|null}
   */
  getValue () {
    var res = this._result
    switch (this.method) {
      case 'all':
      case 'between':
        return res
      case 'before':
      case 'after':
        return res.length ? res[res.length - 1] : null
    }
  }

  clone () {
    return new IterResult(this.method, this.args)
  }
}


/**
 * IterResult subclass that calls a callback function on each add,
 * and stops iterating when the callback returns false.
 * @param {*} method
 * @param {*} args
 * @param {*} iterator
 */
export class CallbackIterResult extends IterResult {
  static get allowedMethods () {
    return ['all', 'between']
  }

  constructor (method, args, iterator) {
    if (CallbackIterResult.allowedMethods.indexOf(method) === -1) {
      throw new Error(`Invalid method "${method}". Only all and between works with iterator.`)
    }

    super(method, args, iterator)
    this._iterator = iterator
  }

  add (date) {
    if (this._iterator(date, this._result.length)) {
      return super.add(date)
    }

    return false
  }
}

