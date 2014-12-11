var Hapi = require('hapi'),
	Storenvy = require('../storenvy'),
	Tests = require('./tests');

var server = new Hapi.Server();
server.connection({port: 8080});

var APP_ID = '<YOUR_APP_ID>';
var APP_SECRET = '<YOUR_APP_SECRET>';
var REDIRECT_URL = 'http://localhost:8080/';

var storenvy = new Storenvy({
	appId: APP_ID,
	appSecret: APP_SECRET,
	redirect: REDIRECT_URL
});

server.route({
	method: 'GET',
	path: '/authenticate',
	handler: function(request, reply) {
		return reply('').redirect(storenvy.getAuthRedirectUrl(true, true));
	}
});

server.route({
	method: 'GET',
	path: '/',
	handler: function(request, reply) {
		storenvy.getAccessToken(request.query.code, function() {
			reply('Authenticated!').redirect('/test');
		});
	}
});

server.route({
	method: 'GET',
	path: '/test',
	handler: function(request, reply) {
		Tests.runAll(storenvy);
	}
});

server.start(function() {
	console.log('Server running at ' + server.info.uri);
});






