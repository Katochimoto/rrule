export default function Parser (rules) {
  this.rules = rules
}

Parser.prototype.start = function (text) {
  this.text = text
  this.done = false
  return this.nextSymbol()
}

Parser.prototype.isDone = function () {
  return this.done && this.symbol === null
}

Parser.prototype.nextSymbol = function () {
  var best
  var bestSymbol
  var p = this

  this.symbol = null
  this.value = null
  do {
    if (this.done) {
      return false
    }

    var match
    var rule
    best = null
    for (var name in this.rules) {
      rule = this.rules[name]
      if ((match = rule.exec(p.text))) {
        if (best === null || match[0].length > best[0].length) {
          best = match
          bestSymbol = name
        }
      }
    }

    if (best !== null) {
      this.text = this.text.substr(best[0].length)

      if (this.text === '') {
        this.done = true
      }
    }

    if (best === null) {
      this.done = true
      this.symbol = null
      this.value = null
      return
    }
  } while (bestSymbol === 'SKIP')

  this.symbol = bestSymbol
  this.value = best
  return true
}

Parser.prototype.accept = function (name) {
  if (this.symbol === name) {
    if (this.value) {
      var v = this.value
      this.nextSymbol()
      return v
    }

    this.nextSymbol()
    return true
  }

  return false
}

Parser.prototype.expect = function (name) {
  if (this.accept(name)) {
    return true
  }

  throw new Error('expected ' + name + ' but found ' + this.symbol)
}
