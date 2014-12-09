var Hapi = require('hapi'),
	Storenvy = require('../storenvy');

var server = new Hapi.Server();
server.connection({port: 8080});

var APP_ID = '<YOUR_APPLICATION_ID>';
var APP_SECRET = 'YOUR_SECRET';
var REDIRECT_URL = 'YOUR_REDIRECT_URL';

var storenvy = new Storenvy({
	appId: APP_ID,
	appSecret: APP_SECRET,
	redirect: REDIRECT_URL
});

server.route({
	method: 'GET',
	path: '/authenticate',
	handler: function(request, reply) {
		return reply('').redirect(storenvy.getAuthRedirectUrl());
	}
});

server.route({
	method: 'GET',
	path: '/',
	handler: function(request, reply) {
		storenvy.getAccessToken(request.query.code, function() {
			reply('Authenticated!');
		});
	}
});

server.start(function() {
	console.log('Server running at ' + server.info.uri);
});