var fs = require('fs')
var getSchedule = require('../lib/getSchedule')

var writeFile = function(contents) {
  fs.writeFile('schedule.json', contents, function(err, result) {
    if (err) return err
    return result;
  })
}

getSchedule()
  .then(JSON.stringify)
  .then(writeFile)
