var Hapi = require('hapi')
var getSchedule = require('../lib/getSchedule')
var groupSchedule = require('../lib/groupSchedule')
var getGroupSizes = require('../lib/getGroupSizes')
var PORT = process.env.PORT || 3000

var server = new Hapi.Server()
server.connection({ port: PORT })

getSchedule()

server.register(require('vision'), function (err) {
  if (err) {
    console.log('Failed to load vision.')
  }

  server.views({
    engines: { hbs: require('handlebars') },
    path: __dirname + '/views',
    helpersPath: __dirname + '/helpers'
  })
})

server.route({
  method: 'GET',
  path: '/',
  handler: function (req, reply) {
    getSchedule()
      .then(groupSchedule)
      .then(function(schedule) {
        reply.view('schedule/index', schedule)
      })
  }
})

server.route({
  method: 'GET',
  path: '/schedule.json',
  handler: function (req, reply) {
    getSchedule()
      .then(groupSchedule)
      .then(reply)
      .catch(reply)
  }
})

server.start(function () {
  console.log('Server running at:', server.info.uri)
})
