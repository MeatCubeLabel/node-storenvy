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

	describe('#updateFulfillment()', function() {
		it('should put to the /orders/:orderId/fulfillments/:id endpoint', function(done) {
			var attrs = {
				tracking_number: '123456XLY',
				shipping_company: 'USPS'
			};

			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.put('/v1/orders/' + test.orderId + '/fulfillments/' + test.fulfillmentId)
				.query({ 
					access_token: test.credAccessToken,
					tracking_number: attrs.tracking_number,
					shipping_company: attrs.shipping_company
				})
				.reply(200, { data: true });
			//knock 'em down
			client.updateFulfillment(test.orderId, test.fulfillmentId, attrs, function(err, data) {
				if (err) throw err;
				nocked.done();
				done();
			});
		});
	});

	describe('#getProducts()', function() {
		it('should get to the /products endpoint', function(done) {
			var attrs = {
				status: 'hidden',
				sort_direction: 'DESC'
			}
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.get('/v1/products.json')
				.query({ 
					access_token: test.credAccessToken,
					status: attrs.status,
					sort_direction: attrs.sort_direction
				})
				.reply(200, { data: true });
			//knock 'em down
			client.getProducts(attrs, function(err, data) {
				if (err) throw err;
				nocked.done();
				done();
			});
		});
	});

	describe('#getProduct()', function() {
		it('should get to the /products/:id endpoint', function(done) {
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.get('/v1/products/' + test.productId + '.json')
				.query({ 
					access_token: test.credAccessToken
				})
				.reply(200, { data: true });
			//knock 'em down
			client.getProduct(test.productId, function(err, data) {
				if (err) throw err;
				nocked.done();
				done();
			});
		});
	});

	describe('#createProduct()', function() {
		it('should post to the /products endpoint', function(done) {
			var name = 'cool product',
				cents = '666',
				description = 'coolest product of all time. buy now';
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.post('/v1/products')
				.query({ 
					access_token: test.credAccessToken,
					name: name,
					cents: cents,
					description: description
				})
				.reply(200, { data: true });
			//knock 'em down
			client.createProduct(name, cents, { description: description }, function(err, data) {
				if (err) throw err;
				nocked.done();
				done();
			});
		});
	});

	describe('#updateProduct()', function() {
		it('should put to the /products/:id endpoint', function(done) {
			var attrs = {
				name: 'cool product2',
				position: 'top',
				preorder: true
			};
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.put('/v1/products/' + test.productId)
				.query({ 
					access_token: test.credAccessToken,
					name: attrs.name,
					position: attrs.position,
					preorder: attrs.preorder
				})
				.reply(200, { data: true });
			//knock 'em down
			client.updateProduct(test.productId, attrs, function(err, data) {
				if (err) throw err;
				nocked.done();
				done();
			});
		});
	});

	describe('#deleteProduct()', function() {
		it('should delete to the /products/:id endpoint', function(done) {
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.delete('/v1/products/' + test.productId)
				.query({ 
					access_token: test.credAccessToken
				})
				.reply(200, { data: true });
			//knock 'em down
			client.deleteProduct(test.productId, function(err, data) {
				if (err) throw err;
				nocked.done();
				done();
			});
		});
	});

	describe('#createVariant()', function() {
		it('should post to the /products/:id/variants endpoint', function(done) {
			var name = 'best variant',
				full_quantity = 5,
				in_stock = 3,
				position = 'bottom';
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.post('/v1/products/' + test.productId + '/variants')
				.query({ 
					access_token: test.credAccessToken,
					name: name,
					full_quantity: full_quantity,
					in_stock: in_stock,
					position: position
				})
				.reply(200, { data: true });
			//knock 'em down
			client.createVariant(test.productId, name, 
				full_quantity, in_stock, { position: position }, function(err, data) {
					if (err) throw err;
					nocked.done();
					done();
				});
		});
	});

	describe('#getVariant()', function() {
		it('should get to the /products/:id/variants/:id endpoint', function(done) {
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.get('/v1/products/' + test.productId + '/variants/' + test.variantId + '.json')
				.query({ 
					access_token: test.credAccessToken
				})
				.reply(200, { data: true });
			//knock 'em down
			client.getVariant(test.productId, test.variantId, function(err, data) {
					if (err) throw err;
					nocked.done();
					done();
				});
		});
	});

	describe('#updateVariant()', function() {
		it('should put to the /products/:id/variants/:id endpoint', function(done) {
			var attrs = {
				name: 'cool variant',
				full_quantity: 25,
				override_cents: 12345
			};
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.put('/v1/products/' + test.productId + '/variants/' + test.variantId)
				.query({ 
					access_token: test.credAccessToken,
					name: attrs.name,
					full_quantity: attrs.full_quantity,
					override_cents: attrs.override_cents
				})
				.reply(200, { data: true });
			//knock 'em down
			client.updateVariant(test.productId, test.variantId, attrs, function(err, data) {
				if (err) throw err;
				nocked.done();
				done();
			});
		});
	});

	describe('#deleteVariant()', function() {
		it('should delete to the /products/:id/variants/:id endpoint', function(done) {
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.delete('/v1/products/' + test.productId + '/variants/' + test.variantId)
				.query({ 
					access_token: test.credAccessToken
				})
				.reply(200, { data: true });
			//knock 'em down
			client.deleteVariant(test.productId, test.variantId, function(err, data) {
				if (err) throw err;
				nocked.done();
				done();
			});
		});
	});

	describe('#getCollections()', function() {
		it('should get to the /collections endpoint', function(done) {
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.get('/v1/collections.json')
				.query({ 
					access_token: test.credAccessToken
				})
				.reply(200, { data: true });
			//knock 'em down
			client.getCollections(function(err, data) {
					if (err) throw err;
					nocked.done();
					done();
				});
		});
	});

	describe('#getCollection()', function() {
		it('should get to the /collections/:id endpoint', function(done) {
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.get('/v1/collections/' + test.collectionId + '.json')
				.query({ 
					access_token: test.credAccessToken
				})
				.reply(200, { data: true });
			//knock 'em down
			client.getCollection(test.collectionId, function(err, data) {
					if (err) throw err;
					nocked.done();
					done();
				});
		});
	});

	describe('#createCollection()', function() {
		it('should post to the /collections endpoint', function(done) {
			var name = 'awesome collection',
				description = 'you already luv it';
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.post('/v1/collections')
				.query({ 
					access_token: test.credAccessToken,
					name: name,
					description: description
				})
				.reply(200, { data: true });
			//knock 'em down
			client.createCollection(name, { description: description }, function(err, data) {
					if (err) throw err;
					nocked.done();
					done();
				});
		});
	});

	describe('#createCollection()', function() {
		it('should put to the /collections/:id endpoint', function(done) {
			var name = 'awesome collection3',
				description = 'you already h8 it';
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.put('/v1/collections/' + test.collectionId)
				.query({ 
					access_token: test.credAccessToken,
					name: name,
					description: description
				})
				.reply(200, { data: true });
			//knock 'em down
			client.updateCollection(test.collectionId, name, { description: description }, function(err, data) {
					if (err) throw err;
					nocked.done();
					done();
				});
		});
	});

	describe('#deleteCollection()', function() {
		it('should delete to the /collections/:id endpoint', function(done) {
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.delete('/v1/collections/' + test.collectionId)
				.query({ 
					access_token: test.credAccessToken
				})
				.reply(200, { data: true });
			//knock 'em down
			client.deleteCollection(test.collectionId, function(err, data) {
					if (err) throw err;
					nocked.done();
					done();
				});
		});
	});

	describe('#getShippingGroups()', function() {
		it('should get to the /shipping_groups endpoint', function(done) {
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.get('/v1/shipping_groups.json')
				.query({ 
					access_token: test.credAccessToken
				})
				.reply(200, { data: true });
			//knock 'em down
			client.getShippingGroups(function(err, data) {
					if (err) throw err;
					nocked.done();
					done();
				});
		});
	});

	describe('#getShippingGroup()', function() {
		it('should get to the /shipping_groups/:id endpoint', function(done) {
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.get('/v1/shipping_groups/' + test.shippingGroupId + '.json')
				.query({ 
					access_token: test.credAccessToken
				})
				.reply(200, { data: true });
			//knock 'em down
			client.getShippingGroup(test.shippingGroupId, function(err, data) {
					if (err) throw err;
					nocked.done();
					done();
				});
		});
	});

	describe('#createShippingGroup()', function() {
		it('should post to the /shipping_groups endpoint', function(done) {
			var name = 'shipem',
				rates = [{"shipping_class_id": 923919, "first_item_in_cents" : 699, "additional_item_in_cents" : 399}];
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.post('/v1/shipping_groups')
				.query({ 
					access_token: test.credAccessToken,
					name: name,
					rates: JSON.stringify(rates)
				})
				.reply(200, { data: true });
			//knock 'em down
			client.createShippingGroup(name, rates, function(err, data) {
					if (err) throw err;
					nocked.done();
					done();
				});
		});
	});

	describe('#deleteShippingGroup()', function() {
		it('should delete to the /shipping_groups/:id endpoint', function(done) {
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.delete('/v1/shipping_groups/' + test.shippingGroupId)
				.query({ 
					access_token: test.credAccessToken
				})
				.reply(200, { data: true });
			//knock 'em down
			client.deleteShippingGroup(test.shippingGroupId, function(err, data) {
					if (err) throw err;
					nocked.done();
					done();
				});
		});
	});

	describe('#getShippingClasses()', function() {
		it('should get to the /shipping_classes endpoint', function(done) {
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.get('/v1/shipping_classes.json')
				.query({ 
					access_token: test.credAccessToken
				})
				.reply(200, { data: true });
			//knock 'em down
			client.getShippingClasses(function(err, data) {
					if (err) throw err;
					nocked.done();
					done();
				});
		});
	});

	describe('#getShippingClass()', function() {
		it('should get to the /shipping_class/:id endpoint', function(done) {
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.get('/v1/shipping_classes/' + test.shippingClassId + '.json')
				.query({ 
					access_token: test.credAccessToken
				})
				.reply(200, { data: true });
			//knock 'em down
			client.getShippingClass(test.shippingClassId, function(err, data) {
					if (err) throw err;
					nocked.done();
					done();
				});
		});
	});

	describe('#createShippingClass()', function() {
		it('should post to the /shipping_classes endpoint', function(done) {
			var name = 'shipem the class',
				rates = [{"shipping_group_id": 923919, "first_item_in_cents" : 699, "additional_item_in_cents" : 399}],
				countries = ["US", "CA"];
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.post('/v1/shipping_classes')
				.query({ 
					access_token: test.credAccessToken,
					name: name,
					rates: JSON.stringify(rates),
					countries: JSON.stringify(countries)
				})
				.reply(200, { data: true });
			//knock 'em down
			client.createShippingClass(name, rates, countries, function(err, data) {
					if (err) throw err;
					nocked.done();
					done();
				});
		});
	});

	describe('#updateShippingClass()', function() {
		it('should put to the /shipping_classes/:id endpoint', function(done) {
			var name = 'shipem the class',
				rates = [{"shipping_group_id": 923919, "first_item_in_cents" : 699, "additional_item_in_cents" : 399}],
				countries = ["US", "CA"];
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.put('/v1/shipping_classes/' + test.shippingClassId)
				.query({ 
					access_token: test.credAccessToken,
					name: name,
					rates: JSON.stringify(rates),
					countries: JSON.stringify(countries)
				})
				.reply(200, { data: true });
			//knock 'em down
			client.updateShippingClass(test.shippingClassId, name, rates, countries, function(err, data) {
					if (err) throw err;
					nocked.done();
					done();
				});
		});
	});

	describe('#deleteShippingClass()', function() {
		it('should delete to the /shipping_classes/:id endpoint', function(done) {
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.delete('/v1/shipping_classes/' + test.shippingClassId)
				.query({ 
					access_token: test.credAccessToken
				})
				.reply(200, { data: true });
			//knock 'em down
			client.deleteShippingClass(test.shippingClassId, function(err, data) {
					if (err) throw err;
					nocked.done();
					done();
				});
		});
	});

	describe('#getShippingClass()', function() {
		it('should get to the /shipping_rate endpoint', function(done) {
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.get('/v1/shipping_rate.json')
				.query({ 
					access_token: test.credAccessToken,
					shipping_group_id: test.shippingGroupId,
					shipping_class_id: test.shippingClassId
				})
				.reply(200, { data: true });
			//knock 'em down
			client.getShippingRate(test.shippingGroupId, test.shippingClassId, function(err, data) {
					if (err) throw err;
					nocked.done();
					done();
				});
		});
	});

	describe('#updateShippingClass()', function() {
		it('should put to the /shipping_rate endpoint', function(done) {
			var first_item_in_cents = 500,
				additional_item_in_cents = 100;
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.put('/v1/shipping_rate')
				.query({ 
					access_token: test.credAccessToken,
					shipping_group_id: test.shippingGroupId,
					shipping_class_id: test.shippingClassId,
					first_item_in_cents: first_item_in_cents,
					additional_item_in_cents: additional_item_in_cents
				})
				.reply(200, { data: true });
			//knock 'em down
			client.updateShippingRate(test.shippingGroupId, test.shippingClassId, 
				first_item_in_cents, additional_item_in_cents, function(err, data) {
					if (err) throw err;
					nocked.done();
					done();
				});
		});
	});

	describe('#getWebhooks()', function() {
		it('should get to the /webhooks endpoint', function(done) {
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.get('/v1/webhooks.json')
				.query({ 
					access_token: test.credAccessToken
				})
				.reply(200, { data: true });
			//knock 'em down
			client.getWebhooks(function(err, data) {
					if (err) throw err;
					nocked.done();
					done();
				});
		});
	});

	describe('#getWebhook()', function() {
		it('should get to the /webhooks/:id endpoint', function(done) {
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.get('/v1/webhooks/' + test.webhookId + '.json')
				.query({ 
					access_token: test.credAccessToken
				})
				.reply(200, { data: true });
			//knock 'em down
			client.getWebhook(test.webhookId, function(err, data) {
					if (err) throw err;
					nocked.done();
					done();
				});
		});
	});

	describe('#createWebhook()', function() {
		var url = 'meatcube.com',
			events = ['order/created','order/updated','order/paid'];
		it('should post to the /webhooks endpoint', function(done) {
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.post('/v1/webhooks')
				.query({ 
					access_token: test.credAccessToken,
					url: url,
					events: JSON.stringify(events)
				})
				.reply(200, { data: true });
			//knock 'em down
			client.createWebhook(url, events, function(err, data) {
					if (err) throw err;
					nocked.done();
					done();
				});
		});
	});

	describe('#updateWebhook()', function() {
		var url = 'meatcube.com',
			events = ['order/created','order/updated','order/paid'];
		it('should put to the /webhooks/:id endpoint', function(done) {
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.put('/v1/webhooks/' + test.webhookId)
				.query({ 
					access_token: test.credAccessToken,
					url: url,
					events: JSON.stringify(events)
				})
				.reply(200, { data: true });
			//knock 'em down
			client.updateWebhook(test.webhookId, url, events, function(err, data) {
					if (err) throw err;
					nocked.done();
					done();
				});
		});
	});

	describe('#deleteWebhook()', function() {
		it('should delete to the /webhooks/:id endpoint', function(done) {
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.delete('/v1/webhooks/' + test.webhookId)
				.query({ 
					access_token: test.credAccessToken
				})
				.reply(200, { data: true });
			//knock 'em down
			client.deleteWebhook(test.webhookId, function(err, data) {
					if (err) throw err;
					nocked.done();
					done();
				});
		});
	});

	describe('#createAccount()', function() {
		it('should post to the /application/stores endpoint', function(done) {
			var name = 'cool store',
				subdomain = 'coolstore',
				owner_login = 'joe',
				owner_email = 'joe@joe.com',
				owner_password = 'joe';
			//set 'em up
			var nocked = nock(test.rootApiUrl)
				.post('/v1/application/stores')
				.query({ 
					access_token: test.credAccessToken,
					client_id: test.clientId,
					secret: test.secret,
					name: name,
					subdomain: subdomain,
					'owner[login]': owner_login,
					'owner[email]': owner_email,
					'owner[password]': owner_password
				})
				.reply(200, { data: true });
			//knock 'em down
			client.createAccount(name, subdomain,
				owner_login, owner_email, owner_password, function(err, data) {
					if (err) throw err;
					nocked.done();
					done();
				});
		});
	});
});