var _ = require('lodash')
var Hapi = require('hapi')
var getSchedule = require('../lib/getSchedule')
var groupSchedule = require('../lib/groupSchedule')
var PORT = process.env.PORT || 3000

var server = new Hapi.Server()
server.connection({ port: PORT })

getSchedule()

server.register(require('inert'), function (err) {
  if (err) throw err
  server.route({
    method: 'GET',
    path: '/main.js',
    handler: function (request, reply) {
      reply.file('client/main.js')
    }
  });
})

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
  path: '/presentations/{slug}',
  handler: function (req, reply) {
    getSchedule().then(function(results) {
      var matches = _.map(results, function(r) {
        return _.findWhere(r.slots, { slug: req.params.slug })
      })
      reply.view('schedule/show', _.compact(matches)[0])
    })
    .catch(reply)
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
