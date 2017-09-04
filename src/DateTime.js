export default function DateTime (...args) {
  if (args.length === 1 && args[0] instanceof DateTime) {
    this._date = new DateTime.Strategy(args[0]._date)
  } else {
    this._date = new DateTime.Strategy(...args)
  }
}

DateTime.Strategy = Date

DateTime.interface = [
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

DateTime.prototype = {
  constructor: DateTime
}

Object.defineProperties(DateTime.prototype, DateTime.interface)

DateTime.UTC = function (...args) {
  return DateTime.Strategy.UTC(...args)
}

DateTime.parse = function (...args) {
  return DateTime.Strategy.parse(...args)
}

DateTime.now = function () {
  return DateTime.Strategy.now()
}

DateTime.setStrategy = function (Strategy) {
  const instance = new Strategy()
  for (let name in DateTime.interface) {
    if (typeof instance[name] !== 'function') {
      throw new Error(`Method "${name}" is not defined in prototype`)
    }
  }

  ['UTC', 'parse', 'now'].forEach(function (name) {
    if (typeof Strategy[name] !== 'function') {
      throw new Error(`Method "${name}" is not defined`)
    }
  })

  DateTime.Strategy = Strategy
}
