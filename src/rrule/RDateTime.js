export default function RDateTime (...args) {
  if (args.length === 1) {
    if (args[0] instanceof RDateTime) {
      this._date = new RDateTime.Strategy(args[0]._date)
    } else if (args[0] instanceof RDateTime.Strategy) {
      this._date = args[0]
    } else {
      this._date = new RDateTime.Strategy(...args)
    }
  } else {
    this._date = new RDateTime.Strategy(...args)
  }
}

RDateTime.Strategy = Date

RDateTime.interface = [
  'getDate',
  'getDay',
  'getFullYear',
  'getHours',
  'getMinutes',
  'getMonth',
  'getSeconds',
  'getTime',
  'getTimezoneOffset',
  'getUTCDate',
  'getUTCFullYear',
  'getUTCHours',
  'getUTCMinutes',
  'getUTCMonth',
  'getUTCSeconds',
  'toString',
  'valueOf'
].reduce(function (data, name) {
  data[name] = {
    value: function (...args) {
      return this._date[name](...args)
    }
  }
  return data
}, {})

RDateTime.prototype = {
  constructor: RDateTime
}

Object.defineProperties(RDateTime.prototype, RDateTime.interface)

RDateTime.UTC = function (...args) {
  return RDateTime.Strategy.UTC(...args) // eslint-disable-line new-cap
}

RDateTime.parse = function (...args) {
  return RDateTime.Strategy.parse(...args)
}

RDateTime.now = function () {
  return RDateTime.Strategy.now()
}

RDateTime.setStrategy = function (Strategy) {
  const instance = new Strategy()
  for (let name in RDateTime.interface) {
    if (typeof instance[name] !== 'function') {
      throw new Error(`Method "${name}" is not defined in prototype`)
    }
  }

  ['UTC', 'parse', 'now'].forEach(function (name) {
    if (typeof Strategy[name] !== 'function') {
      throw new Error(`Method "${name}" is not defined`)
    }
  })

  RDateTime.Strategy = Strategy
}
