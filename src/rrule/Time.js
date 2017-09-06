export default function Time (hour, minute, second, millisecond) {
  this.hour = hour
  this.minute = minute
  this.second = second
  this.millisecond = millisecond || 0
}

Time.prototype = {
  constructor: Time,
  getHours: function () {
    return this.hour
  },
  getMinutes: function () {
    return this.minute
  },
  getSeconds: function () {
    return this.second
  },
  getMilliseconds: function () {
    return this.millisecond
  },
  getTime: function () {
    return ((this.hour * 60 * 60) + (this.minute * 60) + this.second) * 1000 +
      this.millisecond
  }
}
