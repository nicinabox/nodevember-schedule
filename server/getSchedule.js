var request = require('request')
var parseSchedule = require('./parseSchedule')
var storage = require('./storage')
var URL = 'http://nodevember.org/js/app.js'

module.exports = function() {
  return new Promise(function(resolve, reject) {
    var cachedSchedule = storage.getItem('schedule')

    if (cachedSchedule) {
      resolve(cachedSchedule)
    } else {
      request(URL, function(err, response, body) {
        if (err) reject(err)

        var schedule = parseSchedule(body)
        storage.setItem('schedule', schedule)
        resolve(schedule)
      })
    }
  })
}
