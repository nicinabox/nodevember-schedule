var _ = require('lodash')

var normalizeTime = function(time) {
  var match = time.match(/(\d*:\d*)\s?([a|p]m)/)
  if (match) {
    return [match[1], match[2]].join('')
  } else {
    return time
  }
}

module.exports = function(schedule) {
  return _.map(schedule, function(day) {
    day.time_slots = _.groupBy(day.slots, function(slot) {
      return normalizeTime(slot.time)
    })

    return day
  })
}
