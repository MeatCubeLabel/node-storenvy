var Client = require('../lib/client.js'),
	test = require('./support/props.js');
	nock = require('nock');

describe('Integration tests', function() {

	var client;

	beforeEach(function() {
		nock.disableNetConnect();
		nock.DEBUG = true;

		client = new Client({
			access_token: test.credAccessToken,
			appId: test.clientId,
			appSecret: test.secret
		});
	});

	describe('#getUserInfo()', function() {
		it('should get the /me endpoint', function(done) {
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.get('/v1/me.json')
				.query({ access_token: test.credAccessToken })
				.reply(200, { data: true });

			//knock 'em down
			client.getUserInfo(function(err, data) {
				if (err) throw err;
				nocked.done();
				done();
			});
		});
	});

	describe('#getStoreInfo()', function() {
		it('should get the /store endpoint', function(done) {
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.get('/v1/store.json')
				.query({ access_token: test.credAccessToken })
				.reply(200, { data: true });

			//knock 'em down
			client.getStoreInfo(function(err, data) {
				if (err) throw err;
				nocked.done();
				done();
			});
		});
	});

	describe('#createStore()', function() {
		it('should post to the /stores endpoint', function(done) {
			var name = 'ryan',
				subdomain = 'killerkuts',
				paypal_email = 'pay@me.com';

			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.post('/v1/stores')
				.query({ 
					access_token: test.credAccessToken,
					name: name,
					subdomain: subdomain,
					paypal_email: paypal_email 
				})	
				.reply(200, { data: true });

			//knock 'em down
			client.createStore(name, subdomain, paypal_email, function(err, data) {
				if (err) throw err;
				nocked.done();
				done();
			});
		});
	});

	describe('#updateStoreInfo()', function() {
		it('should put to the /store endpoint', function(done) {
			var attrs = {
				name: 'cool_store',
				google_place_id: '1232kjjkl43',
				support_email: 'your@mom.com'
			};

			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.put('/v1/store')
				.query({ 
					access_token: test.credAccessToken,
					name: attrs.name,
					google_place_id: attrs.google_place_id,
					support_email: attrs.support_email
				})
				.reply(200, { data: true });

			//knock 'em down
			client.updateStoreInfo(attrs, function(err, data) {
				if (err) throw err;
				nocked.done();
				done();
			});
		});
	});

	describe('#getStoreVisits()', function() {
		it('should get to the /store/visits endpoint', function(done) {
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.get('/v1/store/visits.json')
				.query({ 
					access_token: test.credAccessToken
				})
				.reply(200, { data: true });

			//knock 'em down
			client.getStoreVisits(function(err, data) {
				if (err) throw err;
				nocked.done();
				done();
			});
		});
	});

	describe('#getStoreMarketplaceVisits()', function() {
		it('should get to the /store/marketplace_visits endpoint', function(done) {
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.get('/v1/store/marketplace_visits.json')
				.query({ 
					access_token: test.credAccessToken
				})
				.reply(200, { data: true });
			//knock 'em down
			client.getStoreMarketplaceVisits(function(err, data) {
				if (err) throw err;
				nocked.done();
				done();
			});
		});
	});

	describe('#getStoreTemplates()', function() {
		it('should get to the /store/templates endpoint', function(done) {
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.get('/v1/store/templates.json')
				.query({ 
					access_token: test.credAccessToken
				})
				.reply(200, { data: true });
			//knock 'em down
			client.getStoreTemplates(function(err, data) {
				if (err) throw err;
				nocked.done();
				done();
			});
		});
	});

	describe('#updateStoreTemplate()', function() {
		it('should put to the /store/templates endpoint', function(done) {
			var attrs = {
				name: 'dat templ8',
				permalink: 'https://meatcube.com'
			};
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.put('/v1/store/templates/' + test.storeTemplateId)
				.query({ 
					access_token: test.credAccessToken,
					name: attrs.name,
					permalink: attrs.permalink
				})
				.reply(200, { data: true });
			//knock 'em down
			client.updateStoreTemplate(test.storeTemplateId, attrs, function(err, data) {
				if (err) throw err;
				nocked.done();
				done();
			});
		});
	});

	describe('#createStoreTemplate()', function() {
		it('should post to the /store/templates endpoint', function(done) {
			var name = 'dat templ8',
				attrs = {
					permalink: 'https://meatcube.com',
					content: 'whole buncha content</div>'
				};
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.post('/v1/store/templates')
				.query({ 
					access_token: test.credAccessToken,
					name: name,
					permalink: attrs.permalink,
					content: attrs.content
				})
				.reply(200, { data: true });
			//knock 'em down
			client.createStoreTemplate(name, attrs, function(err, data) {
				if (err) throw err;
				nocked.done();
				done();
			});
		});
	});

	describe('#getOrders()', function() {
		it('should get to the /orders endpoint', function(done) {
			var attrs = {
				page: 10,
				limit: 50
			};
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.get('/v1/orders.json')
				.query({ 
					access_token: test.credAccessToken,
					page: attrs.page,
					limit: attrs.limit
				})
				.reply(200, { data: true });
			//knock 'em down
			client.getOrders(attrs, function(err, data) {
				if (err) throw err;
				nocked.done();
				done();
			});
		});
	});

	describe('#getOrder()', function() {
		it('should get to the /orders/:id endpoint', function(done) {
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.get('/v1/orders/' + test.orderId + '.json')
				.query({ 
					access_token: test.credAccessToken
				})
				.reply(200, { data: true });
			//knock 'em down
			client.getOrder(test.orderId, function(err, data) {
				if (err) throw err;
				nocked.done();
				done();
			});
		});
	});

	describe('#shipOrder()', function() {
		it('should put to the /orders/:id/ship endpoint', function(done) {
			var attrs = {
				notify_customer: true,
				note_to_customer: 'thanks buddy!'
			}
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.put('/v1/orders/' + test.orderId + '/ship')
				.query({ 
					access_token: test.credAccessToken,
					notify_customer: attrs.notify_customer,
					note_to_customer: attrs.note_to_customer
				})
				.reply(200, { data: true });
			//knock 'em down
			client.shipOrder(test.orderId, attrs, function(err, data) {
				if (err) throw err;
				nocked.done();
				done();
			});
		});
	});

	describe('#holdOrder()', function() {
		it('should put to the /orders/:id/hold endpoint', function(done) {
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.put('/v1/orders/' + test.orderId + '/hold')
				.query({ 
					access_token: test.credAccessToken
				})
				.reply(200, { data: true });
			//knock 'em down
			client.holdOrder(test.orderId, function(err, data) {
				if (err) throw err;
				nocked.done();
				done();
			});
		});
	});

	describe('#openOrder()', function() {
		it('should put to the /orders/:id/open endpoint', function(done) {
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.put('/v1/orders/' + test.orderId + '/open')
				.query({ 
					access_token: test.credAccessToken
				})
				.reply(200, { data: true });
			//knock 'em down
			client.openOrder(test.orderId, function(err, data) {
				if (err) throw err;
				nocked.done();
				done();
			});
		});
	});

	describe('#getOrderProducts()', function() {
		it('should get to the /orders/:id/products endpoint', function(done) {
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.get('/v1/orders/' + test.orderId + '/products.json')
				.query({ 
					access_token: test.credAccessToken
				})
				.reply(200, { data: true });
			//knock 'em down
			client.getOrderProducts(test.orderId, function(err, data) {
				if (err) throw err;
				nocked.done();
				done();
			});
		});
	});

	describe('#getOrderVariants()', function() {
		it('should get to the /orders/:id/variants endpoint', function(done) {
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.get('/v1/orders/' + test.orderId + '/variants.json')
				.query({ 
					access_token: test.credAccessToken
				})
				.reply(200, { data: true });
			//knock 'em down
			client.getOrderVariants(test.orderId, function(err, data) {
				if (err) throw err;
				nocked.done();
				done();
			});
		});
	});
});