var _ = require('lodash')
var normalizeTime = require('./normalizeTime')

module.exports = function(schedule) {
  return _.map(schedule, function(day) {
    day.time_slots = _.groupBy(day.slots, function(slot) {
      return normalizeTime(slot.time)
    })

    return day
  })
}
