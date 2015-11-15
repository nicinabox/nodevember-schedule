var _ = require('lodash')
var UUID = require('uuid-lib')

module.exports = function(contents) {
  contents = contents.replace(/(\n\r?)+/g, ' ');
  var match = contents.match(/"schedule":\s*(\[\{.*?\}\]\s*\}\])\s*\};/);

  if (match[1]) {
    var schedule = JSON.parse(match[1])

    schdule = _.map(schedule, function(d) {
      d.slots = _.map(d.slots, function(s) {
        s.slug = s.title.toLowerCase().replace(/[\s\W]/g, '-')
        s.id = UUID.raw()
        return s
      })
    })

    return schedule
  }
}
