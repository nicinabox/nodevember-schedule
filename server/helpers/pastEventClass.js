var to24HourTime = function(time) {
  var match = time.match(/(\d*):(\d*)\s?([a|p]m)/)
  if (match) {
    var hour = match[1]
    var min = match[2]
    var meridian = match[3]

    if (meridian === 'pm') {
      var hour = +hour + 12
    }

    return [hour, min].join(':')
  }
}

var toEpoch = function(date, time) {
  var d = new Date([date, time].join(' '))
  return d.getTime()
}

module.exports = function(date, time) {
  var className = "text-muted"
  var now = new Date().getTime()
  var epoch = toEpoch(date, to24HourTime(time))

  if (now > epoch) {
    return className
  }
}
