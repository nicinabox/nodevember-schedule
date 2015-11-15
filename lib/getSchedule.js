var fs = require('fs')
var request = require('request')
var parseSchedule = require('./parseSchedule')
var storage = require('./storage')
var URL = 'http://nodevember.org/js/app.js'

var fetchFromDisk = function() {
  return new Promise(function(resolve, reject) {
    fs.readFile('schedule.json', 'utf-8', function(err, result) {
      if (err) {
        resolve()
      } else {
        resolve(JSON.parse(result))
      }
    })
  })
}

var fetchFromCache = function(key) {
  return Promise.resolve(storage.getItem(key))
}

var fetchFromRemote = function() {
  return new Promise(function(resolve, reject) {
    request(URL, function(err, response, body) {
      if (err) reject(err)
      resolve(parseSchedule(body))
    })
  })
}

module.exports = function() {
  return fetchFromDisk()
    .then(function(result) {
      if (result) return result
    })
    .then(function(result) {
      if (!result) {
        return fetchFromCache()
      }
      return result
    })
    .then(function(result) {
      if (!result) {
        return fetchFromRemote()
          .then(function(remoteResult) {
            storage.setItem('schedule', remoteResult)
            return remoteResult
          })
      }
      return result
    })

    .catch(function(err) {
      console.error(err)
      return err
    })
}
