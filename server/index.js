var Hapi = require('hapi')
var getSchedule = require('./getSchedule')
var PORT = process.env.PORT || 3000

var server = new Hapi.Server()
server.connection({ port: PORT })

server.route({
  method: 'GET',
  path: '/',
  handler: function (req, reply) {
    getSchedule()
      .then(reply)
      .catch(reply)
  }
})

server.start(function () {
  console.log('Server running at:', server.info.uri)
})
