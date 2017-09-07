export default class Time {
  constructor (hour, minute, second, millisecond = 0) {
    this.hour = hour
    this.minute = minute
    this.second = second
    this.millisecond = millisecond
  }

  getHours () {
    return this.hour
  }

  getMinutes () {
    return this.minute
  }

  getSeconds () {
    return this.second
  }

  getMilliseconds () {
    return this.millisecond
  }

  getTime () {
    return ((this.hour * 60 * 60) + (this.minute * 60) + this.second) * 1000 +
      this.millisecond
  }
}
