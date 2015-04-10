var Client = require('../lib/client.js');

describe('Client', function() {

	var client,
		credAccessToken = '1234567abcdef',
		testAccessToken = 'thisisnotanaccesstoken',
		testStoreTemplateId = '123456',
		testOrderId = '34543',
		testFulfillmentId = '858640',
		testProductId = '485343',
		testVariantId = '9938495',
		testCollectionId = '456322256',
		testShippingGroupId = '6544859',
		testShippingClassId = '188734',
		testWebhookId = '666',
		testClientId = '854204212853',
		testSecret = 'FS8333FCVNO',
		testCallback = function() { return 23; },
		testUserInfoUrl = 'https://api.storenvy.com/v1/me.json?access_token=',
		testStoreInfoUrl = 'https://api.storenvy.com/v1/store.json?access_token=',
		testCreateStoreUrl = 'https://api.storenvy.com/v1/stores?access_token=',
		testUpdateStoreUrl = 'https://api.storenvy.com/v1/store?access_token=',
		testGetStoreVisitsUrl = 'https://api.storenvy.com/v1/store/visits.json?access_token=',
		testGetStoreMarketplaceVisitsUrl = 'https://api.storenvy.com/v1/store/marketplace_visits.json?access_token=',
		testGetStoreTemplatesUrl = 'https://api.storenvy.com/v1/store/templates.json?access_token=',
		testUpdateStoreTemplateUrl = 'https://api.storenvy.com/v1/store/templates/' + testStoreTemplateId + '?access_token=',
		testCreateStoreTemplateUrl = 'https://api.storenvy.com/v1/store/templates?access_token=',
		testGetOrdersUrl = 'https://api.storenvy.com/v1/orders.json?access_token=',
		testGetOrderUrl = 'https://api.storenvy.com/v1/orders/' + testOrderId + '.json?access_token=',
		testShipOrderUrl = 'https://api.storenvy.com/v1/orders/' + testOrderId + '/ship?access_token=',
		testHoldOrderUrl = 'https://api.storenvy.com/v1/orders/' + testOrderId + '/hold?access_token=',
		testOpenOrderUrl = 'https://api.storenvy.com/v1/orders/' + testOrderId + '/open?access_token=',
		testGetOrderProductsUrl = 'https://api.storenvy.com/v1/orders/' + testOrderId + '/products.json?access_token=',
		testGetOrderVariantsUrl = 'https://api.storenvy.com/v1/orders/' + testOrderId + '/variants.json?access_token=',
		testUpdateFulfillmentUrl = 'https://api.storenvy.com/v1/orders/' + testOrderId + '/fulfillments/' + testFulfillmentId + '?access_token=',
		testGetProductsUrl = 'https://api.storenvy.com/v1/products.json?access_token=',
		testGetProductUrl = 'https://api.storenvy.com/v1/products/' + testProductId + '.json?access_token=',
		testCreateProductUrl = 'https://api.storenvy.com/v1/products?access_token=',
		testUpdateProductUrl = 'https://api.storenvy.com/v1/products/' + testProductId + '?access_token=',
		testCreateVariantUrl = 'https://api.storenvy.com/v1/products/' + testProductId + '/variants?access_token=',
		testGetVariantUrl = 'https://api.storenvy.com/v1/products/' + testProductId + '/variants/' + testVariantId + '.json?access_token=',
		testUpdateVariantUrl = 'https://api.storenvy.com/v1/products/' + testProductId + '/variants/' + testVariantId + '?access_token=',
		testGetCollectionsUrl = 'https://api.storenvy.com/v1/collections.json?access_token=',
		testGetCollectionUrl = 'https://api.storenvy.com/v1/collections/' + testCollectionId + '.json?access_token=',
		testCreateCollectionUrl = 'https://api.storenvy.com/v1/collections?access_token=',
		testUpdateCollectionUrl = 'https://api.storenvy.com/v1/collections/' + testCollectionId + '?access_token=',
		testGetShippingGroupsUrl = 'https://api.storenvy.com/v1/shipping_groups.json?access_token=',
		testGetShippingGroupUrl = 'https://api.storenvy.com/v1/shipping_groups/' + testShippingGroupId + '.json?access_token=',
		testCreateShippingGroupUrl = 'https://api.storenvy.com/v1/shipping_groups?access_token=',
		testUpdateShippingGroupUrl = 'https://api.storenvy.com/v1/shipping_groups/' + testShippingGroupId + '?access_token=',
		testGetShippingClassesUrl = 'https://api.storenvy.com/v1/shipping_classes.json?access_token=',
		testGetShippingClassUrl = 'https://api.storenvy.com/v1/shipping_classes/' + testShippingClassId + '.json?access_token=',
		testCreateShippingClassUrl = 'https://api.storenvy.com/v1/shipping_classes?access_token=',
		testUpdateShippingClassUrl = 'https://api.storenvy.com/v1/shipping_classes/' + testShippingClassId + '?access_token=',
		testGetShippingRateUrl = 'https://api.storenvy.com/v1/shipping_rate.json?access_token=',
		testUpdateShippingRateUrl = 'https://api.storenvy.com/v1/shipping_rate?access_token=',
		testGetWebhooksUrl = 'https://api.storenvy.com/v1/webhooks.json?access_token=',
		testGetWebhookUrl = 'https://api.storenvy.com/v1/webhooks/' + testWebhookId + '.json?access_token=',
		testCreateWebhookUrl = 'https://api.storenvy.com/v1/webhooks?access_token=',
		testUpdateWebhookUrl = 'https://api.storenvy.com/v1/webhooks/' + testWebhookId + '?access_token=',
		testCreateAccountUrl = 'https://api.storenvy.com/v1/application/stores?access_token=';

	beforeEach(function() {
		client = new Client({
			access_token: credAccessToken,
			appId: testClientId,
			appSecret: testSecret
		});
		spyOn(Client.prototype, 'get');
		spyOn(Client.prototype, 'post');
		spyOn(Client.prototype, 'put');
		spyOn(Client.prototype, 'delete');
	});

	describe('#getRootUrl()', function() {
		it('should return the right url when an access_token is passed', function() {
			var expectedUrl = client.rootApiUrl + testAccessToken;
			expect(client.getRootUrl(testAccessToken)).toEqual(expectedUrl);
		});
		it('should return the right url when using the creds access_token', function() {
			var expectedUrl = client.rootApiUrl + credAccessToken;
			expect(client.getRootUrl()).toEqual(expectedUrl);
		});
	});

	describe('#buildPushUrl()', function() {
		it('should return the right url when an access token is passed', function() {
			var expectedUrl = client.rootPushUrl + testAccessToken;
			expect(client.buildPushUrl(testAccessToken)).toEqual(expectedUrl);
		});
		it('should return the right url when using the creds access token', function() {
			var expectedUrl = client.rootPushUrl + credAccessToken;
			expect(client.buildPushUrl()).toEqual(expectedUrl);
		});
		it('should turn attributes into query params', function() {
			var attrs = {
				name: 'name',
				age: 32
			},
				expectedUrl = client.rootPushUrl + credAccessToken + '&name=name&age=32';
			expect(client.buildPushUrl(null, attrs)).toEqual(expectedUrl);
		});
	});

	describe('#getUserInfo()', function() {
		it('should call retrieve with the right url', function() {
			var expectedUrl = testUserInfoUrl + credAccessToken;			
			client.getUserInfo(testCallback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call retrieve with the right url with a passed access token', function() {
			var expectedUrl = testUserInfoUrl + testAccessToken;			
			client.getUserInfo(testCallback, testAccessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#getStoreInfo()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = testStoreInfoUrl + credAccessToken;
			client.getStoreInfo(testCallback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = testStoreInfoUrl + testAccessToken;			
			client.getStoreInfo(testCallback, testAccessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#createStore()', function() {
		it('should call post with the right url', function() {
			var name = 'some_name',
				subdomain = 'myurl',
				paypal_email = 'email@gmail.com',
				expectedUrl = testCreateStoreUrl + credAccessToken + '&name=' +
					name + '&subdomain=' + subdomain + '&paypal_email=' + paypal_email;
			client.createStore(name, subdomain, paypal_email, testCallback);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call post with the right url with a passed access token', function() {
			var name = 'some_name',
				subdomain = 'myurl',
				paypal_email = 'email@gmail.com',
				expectedUrl = testCreateStoreUrl + testAccessToken + '&name=' +
					name + '&subdomain=' + subdomain + '&paypal_email=' + paypal_email;
			client.createStore(name, subdomain, paypal_email, testCallback, testAccessToken);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#updateStoreInfo()', function() {
		it('should call put with the right url', function() {
			var return_address = 'some_address',
				description = 'an awesome store',
				avatar_url = 'coolpic.jpg',
				expectedUrl = testUpdateStoreUrl + credAccessToken + 
					'&return_address=' + return_address + '&description=' + 
					description + '&avatar_url=' + avatar_url,
				attrs = {
					return_address: return_address,
					description: description,
					avatar_url: avatar_url
				};
			client.updateStoreInfo(attrs, testCallback);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call put with the right url with a passed access token', function() {
			var return_address = 'some_address',
				description = 'an awesome store',
				avatar_url = 'coolpic.jpg',
				expectedUrl = testUpdateStoreUrl + testAccessToken + 
					'&return_address=' + return_address + '&description=' + 
					description + '&avatar_url=' + avatar_url,
				attrs = {
					return_address: return_address,
					description: description,
					avatar_url: avatar_url
				};
			client.updateStoreInfo(attrs, testCallback, testAccessToken);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#getStoreVisits()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = testGetStoreVisitsUrl + credAccessToken;
			client.getStoreVisits(testCallback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = testGetStoreVisitsUrl + testAccessToken;			
			client.getStoreVisits(testCallback, testAccessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#getStoreMarketplaceVisits()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = testGetStoreMarketplaceVisitsUrl + credAccessToken;
			client.getStoreMarketplaceVisits(testCallback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = testGetStoreMarketplaceVisitsUrl + testAccessToken;			
			client.getStoreMarketplaceVisits(testCallback, testAccessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#getStoreTemplates()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = testGetStoreTemplatesUrl + credAccessToken;
			client.getStoreTemplates(testCallback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = testGetStoreTemplatesUrl + testAccessToken;			
			client.getStoreTemplates(testCallback, testAccessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#updateStoreTemplate()', function() {
		it('should call put with the right url', function() {
			var name = 'some_name',
				permalink = 'http://google.com',
				content = 'a bunch of content',
				expectedUrl = testUpdateStoreTemplateUrl + credAccessToken + 
					'&name=' + name + '&permalink=' + 
					permalink + '&content=' + content,
				attrs = {
					name: name,
					permalink: permalink,
					content: content
				};
			client.updateStoreTemplate(testStoreTemplateId, attrs, testCallback);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call put with the right url with a passed access token', function() {
			var name = 'some_name',
				permalink = 'http://google.com',
				content = 'a bunch of content',
				expectedUrl = testUpdateStoreTemplateUrl + testAccessToken + 
					'&name=' + name + '&permalink=' + 
					permalink + '&content=' + content,
				attrs = {
					name: name,
					permalink: permalink,
					content: content
				};
			client.updateStoreTemplate(testStoreTemplateId, attrs, testCallback, testAccessToken);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#createStoreTemplate()', function() {
		it('should call post with the right url', function() {
			var name = 'some_name',
				expectedUrl = testCreateStoreTemplateUrl + credAccessToken + 
					'&name=' + name;
			client.createStoreTemplate(name, null, testCallback);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call post with the right url with a passed access token', function() {
			var name = 'some_name',
				expectedUrl = testCreateStoreTemplateUrl + testAccessToken + 
					'&name=' + name;
			client.createStoreTemplate(name, null, testCallback, testAccessToken);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call post with the right url given attributes', function() {
			var name = 'some_name',
				permalink = 'google.com',
				content = 'some_content',
				use_layout = 'cool_layout',
				expectedUrl = testCreateStoreTemplateUrl + testAccessToken + 
					'&permalink=' + permalink + '&content=' + content + 
					'&use_layout=' + use_layout + '&name=' + name,
				attrs = {
					permalink: permalink,
					content: content,
					use_layout: use_layout
				};
			client.createStoreTemplate(name, attrs, testCallback, testAccessToken);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#getOrders()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = testGetOrdersUrl + credAccessToken;
			client.getOrders(null, testCallback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = testGetOrdersUrl + testAccessToken;			
			client.getOrders(null, testCallback, testAccessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call get with the right url with passed attributes', function() {
			var updated_at_min = '123456',
				status = 'open',
				expectedUrl = testGetOrdersUrl + credAccessToken + '&updated_at_min=' +
					updated_at_min + '&status=' + status,
				attrs = {
					updated_at_min: updated_at_min,
					status: status
				};
			client.getOrders(attrs, testCallback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#getOrder()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = testGetOrderUrl + credAccessToken;
			client.getOrder(testOrderId, testCallback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = testGetOrderUrl + testAccessToken;			
			client.getOrder(testOrderId, testCallback, testAccessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#shipOrder()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = testShipOrderUrl + credAccessToken;
			client.shipOrder(testOrderId, null, testCallback);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = testShipOrderUrl + testAccessToken;			
			client.shipOrder(testOrderId, null, testCallback, testAccessToken);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call get with the right url with a passed access token', function() {
			var items = '[1234,4545]',
				notify_customer = 'false',
				expectedUrl = testShipOrderUrl + testAccessToken + '&items=' +
					items + '&notify_customer=' + notify_customer,
				attrs = {
					items: items,
					notify_customer: notify_customer
				};			
			client.shipOrder(testOrderId, attrs, testCallback, testAccessToken);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#holdOrder()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = testHoldOrderUrl + credAccessToken;
			client.holdOrder(testOrderId, null, testCallback);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = testHoldOrderUrl + testAccessToken;			
			client.holdOrder(testOrderId, null, testCallback, testAccessToken);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call get with the right url with a passed access token', function() {
			var items = '[1234,4545]',
				notify_customer = 'false',
				expectedUrl = testHoldOrderUrl + testAccessToken + '&items=' +
					items + '&notify_customer=' + notify_customer,
				attrs = {
					items: items,
					notify_customer: notify_customer
				};			
			client.holdOrder(testOrderId, attrs, testCallback, testAccessToken);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#openOrder()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = testOpenOrderUrl + credAccessToken;
			client.openOrder(testOrderId, null, testCallback);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = testOpenOrderUrl + testAccessToken;			
			client.openOrder(testOrderId, null, testCallback, testAccessToken);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call get with the right url with a passed access token', function() {
			var items = '[1234,4545]',
				notify_customer = 'false',
				expectedUrl = testOpenOrderUrl + testAccessToken + '&items=' +
					items + '&notify_customer=' + notify_customer,
				attrs = {
					items: items,
					notify_customer: notify_customer
				};			
			client.openOrder(testOrderId, attrs, testCallback, testAccessToken);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#getOrderProducts()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = testGetOrderProductsUrl + credAccessToken;
			client.getOrderProducts(testOrderId, testCallback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = testGetOrderProductsUrl + testAccessToken;			
			client.getOrderProducts(testOrderId, testCallback, testAccessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#getOrderVariants()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = testGetOrderVariantsUrl + credAccessToken;
			client.getOrderVariants(testOrderId, testCallback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = testGetOrderVariantsUrl + testAccessToken;			
			client.getOrderVariants(testOrderId, testCallback, testAccessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#updateFulfillment()', function() {
		it('should call put with the right url', function() {
			var expectedUrl = testUpdateFulfillmentUrl + credAccessToken;
			client.updateFulfillment(testOrderId, testFulfillmentId, null, testCallback);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call put with the right url with a passed access token', function() {
			var expectedUrl = testUpdateFulfillmentUrl + testAccessToken;
			client.updateFulfillment(testOrderId, testFulfillmentId, null, testCallback, testAccessToken);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call put with the right url when passed attributes', function() {
			var tracking_number = '123456789',
				shipping_company = 'USPS',
				note_to_customer = 'thanks dude!',
				expectedUrl = testUpdateFulfillmentUrl + credAccessToken + 
					'&tracking_number=' + tracking_number + '&shipping_company=' +
					shipping_company + '&note_to_customer=' + note_to_customer,
				attrs = {
					tracking_number: tracking_number,
					shipping_company: shipping_company,
					note_to_customer: note_to_customer
				};
			client.updateFulfillment(testOrderId, testFulfillmentId, attrs, testCallback);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#getProducts()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = testGetProductsUrl + credAccessToken;
			client.getProducts(null, testCallback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = testGetProductsUrl + testAccessToken;			
			client.getProducts(null, testCallback, testAccessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call get with the right url with passed attributes', function() {
			var updated_at_min = '123456',
				status = 'open',
				expectedUrl = testGetProductsUrl + credAccessToken + '&updated_at_min=' +
					updated_at_min + '&status=' + status,
				attrs = {
					updated_at_min: updated_at_min,
					status: status
				};
			client.getProducts(attrs, testCallback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#getProduct()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = testGetProductUrl + credAccessToken;
			client.getProduct(testProductId, testCallback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = testGetProductUrl + testAccessToken;			
			client.getProduct(testProductId, testCallback, testAccessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#createProduct()', function() {
		it('should call post with the right url', function() {
			var name = 'awesome product',
				cents = '1000000',
				expectedUrl = testCreateProductUrl + credAccessToken + '&name=' +
					name + '&cents=' + cents;
			client.createProduct(name, cents, null, testCallback);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call post with the right url with a passed access token', function() {
			var name = 'awesome product',
				cents = '1000000',
				expectedUrl = testCreateProductUrl + testAccessToken + '&name=' +
					name + '&cents=' + cents;
			client.createProduct(name, cents, null, testCallback, testAccessToken);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call post with the right url when passed attributes', function() {
			var name = 'awesome product',
				cents = '1000000',
				description = 'so cool',
				on_sale = 'true',
				expectedUrl = testCreateProductUrl + credAccessToken + '&description=' +
					description + '&on_sale=' + on_sale + '&name=' +
					name + '&cents=' + cents,
				attrs = {
					description: description,
					on_sale: on_sale
				};
			client.createProduct(name, cents, attrs, testCallback);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#updateProduct()', function() {
		it('should call put with the right url', function() {
			var name = 'some name',
				cents = '45000',
				position = 'top',
				expectedUrl = testUpdateProductUrl + credAccessToken + 
					'&name=' + name + '&cents=' + cents +
					'&position=' + position,
				attrs = {
					name: name,
					cents: cents,
					position: position
				};
			client.updateProduct(testProductId, attrs, testCallback);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call put with the right url with a passed access token', function() {
			var name = 'some name',
				cents = '45000',
				position = 'top',
				expectedUrl = testUpdateProductUrl + testAccessToken + 
					'&name=' + name + '&cents=' + cents +
					'&position=' + position,
				attrs = {
					name: name,
					cents: cents,
					position: position
				};
			client.updateProduct(testProductId, attrs, testCallback, testAccessToken);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#deleteProduct()', function() {
		it('should call delete with the right url', function() {
			var expectedUrl = testUpdateProductUrl + credAccessToken;
			client.deleteProduct(testProductId, testCallback);
			expect(client.delete).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call delete with the right url with a passed access token', function() {
			var expectedUrl = testUpdateProductUrl + testAccessToken;			
			client.deleteProduct(testProductId, testCallback, testAccessToken);
			expect(client.delete).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#createVariant()', function() {
		it('should call post with the right url', function() {
			var productId = testProductId,
				name = 'awesome thing',
				full_quantity = '10',
				in_stock = '8',
				expectedUrl = testCreateVariantUrl + credAccessToken + '&name=' +
					name + '&full_quantity=' + full_quantity + '&in_stock=' + in_stock;
			client.createVariant(productId, name, full_quantity, in_stock, null, testCallback);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call post with the right url with a passed access token', function() {
			var productId = testProductId,
				name = 'awesome thing',
				full_quantity = '10',
				in_stock = '8',
				expectedUrl = testCreateVariantUrl + testAccessToken + '&name=' +
					name + '&full_quantity=' + full_quantity + '&in_stock=' + in_stock;
			client.createVariant(productId, name, full_quantity, in_stock, null, testCallback, testAccessToken);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call post with the right url when passed attributes', function() {
			var productId = testProductId,
				name = 'awesome thing',
				full_quantity = '10',
				in_stock = '8',
				position = 'top',
				sku = 'FGHF88798',
				expectedUrl = testCreateVariantUrl + credAccessToken + '&position=' +
					position + '&sku=' + sku + '&name=' + name + '&full_quantity=' + 
					full_quantity + '&in_stock=' + in_stock,
				attrs = {
					position: position,
					sku: sku
				};
			client.createVariant(productId, name, full_quantity, in_stock, attrs, testCallback);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#getVariant()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = testGetVariantUrl + credAccessToken;
			client.getVariant(testProductId, testVariantId, testCallback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = testGetVariantUrl + testAccessToken;			
			client.getVariant(testProductId, testVariantId, testCallback, testAccessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#updateVariant()', function() {
		it('should call put with the right url', function() {
			var position = 'top',
				in_stock = 2,
				expectedUrl = testUpdateVariantUrl + credAccessToken + 
					'&position=' + position + '&in_stock=' + in_stock,
				attrs = {
					position: position,
					in_stock: in_stock
				};
			client.updateVariant(testProductId, testVariantId, attrs, testCallback);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call put with the right url with a passed access token', function() {
			var position = 'top',
				in_stock = 2,
				expectedUrl = testUpdateVariantUrl + testAccessToken + 
					'&position=' + position + '&in_stock=' + in_stock,
				attrs = {
					position: position,
					in_stock: in_stock
				};
			client.updateVariant(testProductId, testVariantId, attrs, testCallback, testAccessToken);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#deleteVariant()', function() {
		it('should call delete with the right url', function() {
			var expectedUrl = testUpdateVariantUrl + credAccessToken;
			client.deleteVariant(testProductId, testVariantId, testCallback);
			expect(client.delete).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call delete with the right url with a passed access token', function() {
			var expectedUrl = testUpdateVariantUrl + testAccessToken;			
			client.deleteVariant(testProductId, testVariantId, testCallback, testAccessToken);
			expect(client.delete).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#getCollections()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = testGetCollectionsUrl + credAccessToken;
			client.getCollections(testCallback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = testGetCollectionsUrl + testAccessToken;			
			client.getCollections(testCallback, testAccessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#getCollection()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = testGetCollectionUrl + credAccessToken;
			client.getCollection(testCollectionId, testCallback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = testGetCollectionUrl + testAccessToken;			
			client.getCollection(testCollectionId, testCallback, testAccessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#createCollection()', function() {
		it('should call post with the right url', function() {
			var name = 'awesome collection',
				expectedUrl = testCreateCollectionUrl + credAccessToken + '&name=' +
					name;
			client.createCollection(name, null, testCallback);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call post with the right url with a passed access token', function() {
			var name = 'awesome collection',
				expectedUrl = testCreateCollectionUrl + testAccessToken + '&name=' +
					name;
			client.createCollection(name, null, testCallback, testAccessToken);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call post with the right url when passed attributes', function() {
			var name = 'awesome collection',
				photo = 'image.jpg',
				hide_in_storefront_navigation = 'true',
				expectedUrl = testCreateCollectionUrl + credAccessToken + '&photo=' +
					photo + '&hide_in_storefront_navigation=' + hide_in_storefront_navigation + 
					'&name=' + name,
				attrs = {
					photo: photo,
					hide_in_storefront_navigation: hide_in_storefront_navigation
				};
			client.createCollection(name, attrs, testCallback);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#updateCollection()', function() {
		it('should call put with the right url', function() {
			var name = 'awesome product',
				position = 'bottom',
				products = [334,3232,553232],
				expectedUrl = testUpdateCollectionUrl + credAccessToken + 
					'&position=' + position + '&products=' + products +
					'&name=' + name,
				attrs = {
					position: position,
					products: products
				};
			client.updateCollection(testCollectionId, name, attrs, testCallback);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call put with the right url with a passed access token', function() {
			var name = 'awesome product',
				position = 'bottom',
				products = [334,3232,553232],
				expectedUrl = testUpdateCollectionUrl + testAccessToken + 
					'&position=' + position + '&products=' + products +
					'&name=' + name,
				attrs = {
					position: position,
					products: products
				};
			client.updateCollection(testCollectionId, name, attrs, testCallback, testAccessToken);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#deleteCollection()', function() {
		it('should call delete with the right url', function() {
			var expectedUrl = testUpdateCollectionUrl + credAccessToken;
			client.deleteCollection(testCollectionId, testCallback);
			expect(client.delete).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call delete with the right url with a passed access token', function() {
			var expectedUrl = testUpdateCollectionUrl + testAccessToken;			
			client.deleteCollection(testCollectionId, testCallback, testAccessToken);
			expect(client.delete).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#getShippingGroups()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = testGetShippingGroupsUrl + credAccessToken;
			client.getShippingGroups(testCallback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = testGetShippingGroupsUrl + testAccessToken;			
			client.getShippingGroups(testCallback, testAccessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#getShippingGroup()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = testGetShippingGroupUrl + credAccessToken;
			client.getShippingGroup(testShippingGroupId, testCallback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = testGetShippingGroupUrl + testAccessToken;			
			client.getShippingGroup(testShippingGroupId, testCallback, testAccessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#createShippingGroup()', function() {
		it('should call post with the right url', function() {
			var name = 'awesome shipping group',
				rates = [{"shipping_class_id": 923919, "first_item_in_cents" : 699, "additional_item_in_cents" : 399}],
				expectedUrl = testCreateShippingGroupUrl + credAccessToken + '&name=' +
					name + '&rates=' + rates;
			client.createShippingGroup(name, rates, testCallback);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call post with the right url with a passed access token', function() {
			var name = 'awesome shipping group',
				rates = [{"shipping_class_id": 923919, "first_item_in_cents" : 699, "additional_item_in_cents" : 399}],
				expectedUrl = testCreateShippingGroupUrl + testAccessToken + '&name=' +
					name + '&rates=' + rates;
			client.createShippingGroup(name, rates, testCallback, testAccessToken);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#updateShippingGroup()', function() {
		it('should call put with the right url', function() {
			var name = 'awesome shipping group',
				rates = [{"shipping_class_id": 923919, "first_item_in_cents" : 699, "additional_item_in_cents" : 399}],
				expectedUrl = testUpdateShippingGroupUrl + credAccessToken + 
					'&name=' + name + '&rates=' + rates;
			client.updateShippingGroup(testShippingGroupId, name, rates, testCallback);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call put with the right url with a passed access token', function() {
			var name = 'awesome shipping group',
				rates = [{"shipping_class_id": 923919, "first_item_in_cents" : 699, "additional_item_in_cents" : 399}],
				expectedUrl = testUpdateShippingGroupUrl + testAccessToken + 
					'&name=' + name + '&rates=' + rates;
			client.updateShippingGroup(testShippingGroupId, name, rates, testCallback, testAccessToken);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#deleteShippingGroup()', function() {
		it('should call delete with the right url', function() {
			var expectedUrl = testUpdateShippingGroupUrl + credAccessToken;
			client.deleteShippingGroup(testShippingGroupId, testCallback);
			expect(client.delete).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call delete with the right url with a passed access token', function() {
			var expectedUrl = testUpdateShippingGroupUrl + testAccessToken;			
			client.deleteShippingGroup(testShippingGroupId, testCallback, testAccessToken);
			expect(client.delete).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#getShippingClasses()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = testGetShippingClassesUrl + credAccessToken;
			client.getShippingClasses(testCallback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = testGetShippingClassesUrl + testAccessToken;			
			client.getShippingClasses(testCallback, testAccessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#getShippingClass()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = testGetShippingClassUrl + credAccessToken;
			client.getShippingClass(testShippingClassId, testCallback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = testGetShippingClassUrl + testAccessToken;			
			client.getShippingClass(testShippingClassId, testCallback, testAccessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#createShippingClass()', function() {
		it('should call post with the right url', function() {
			var name = 'awesome shipping class',
				rates = [{"shipping_group_id": 923919, "first_item_in_cents" : 699, "additional_item_in_cents" : 399}],
				countries = ['US','CA'],
				expectedUrl = testCreateShippingClassUrl + credAccessToken + '&name=' +
					name + '&rates=' + rates + '&countries=' + countries;
			client.createShippingClass(name, rates, countries, testCallback);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call post with the right url with a passed access token', function() {
			var name = 'awesome shipping class',
				rates = [{"shipping_group_id": 923919, "first_item_in_cents" : 699, "additional_item_in_cents" : 399}],
				countries = ['US','CA'],
				expectedUrl = testCreateShippingClassUrl + testAccessToken + '&name=' +
					name + '&rates=' + rates + '&countries=' + countries;
			client.createShippingClass(name, rates, countries, testCallback, testAccessToken);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#updateShippingClass()', function() {
		it('should call put with the right url', function() {
			var name = 'awesome shipping class',
				rates = [{"shipping_group_id": 923919, "first_item_in_cents" : 699, "additional_item_in_cents" : 399}],
				countries = ['US','CA'],
				expectedUrl = testUpdateShippingClassUrl + credAccessToken + 
					'&name=' + name + '&rates=' + rates + '&countries=' + countries;
			client.updateShippingClass(testShippingClassId, name, rates, countries, testCallback);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call put with the right url with a passed access token', function() {
			var name = 'awesome shipping class',
				rates = [{"shipping_group_id": 923919, "first_item_in_cents" : 699, "additional_item_in_cents" : 399}],
				countries = ['US','CA'],
				expectedUrl = testUpdateShippingClassUrl + testAccessToken + 
					'&name=' + name + '&rates=' + rates + '&countries=' + countries;
			client.updateShippingClass(testShippingClassId, name, rates, countries, testCallback, testAccessToken);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#deleteShippingClass()', function() {
		it('should call delete with the right url', function() {
			var expectedUrl = testUpdateShippingClassUrl + credAccessToken;
			client.deleteShippingClass(testShippingClassId, testCallback);
			expect(client.delete).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call delete with the right url with a passed access token', function() {
			var expectedUrl = testUpdateShippingClassUrl + testAccessToken;			
			client.deleteShippingClass(testShippingClassId, testCallback, testAccessToken);
			expect(client.delete).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#getShippingRate()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = testGetShippingRateUrl + credAccessToken + 
				'&shipping_group_id=' + testShippingGroupId + 
				'&shipping_class_id=' + testShippingClassId;
			client.getShippingRate(testShippingGroupId, testShippingClassId, testCallback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = testGetShippingRateUrl + testAccessToken + 
				'&shipping_group_id=' + testShippingGroupId + 
				'&shipping_class_id=' + testShippingClassId			
			client.getShippingRate(testShippingGroupId, testShippingClassId, testCallback, testAccessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should throw an exception if no shipping_group_id is passed', function() {
			expect(function() {
				client.getShippingRate(null, testShippingClassId, testCallback)
			}).toThrow();
		});
		it('should throw an exception if no shipping_class_id is passed', function() {
			expect(function() {
				client.getShippingRate(testShippingGroupId, null, testCallback)
			}).toThrow();
		});
		it('should throw an exception if nothing is passed', function() {
			expect(client.getShippingRate).toThrow();
		});
	});

	describe('#updateShippingRate()', function() {
		it('should call put with the right url', function() {
			var first_item_in_cents = 399,
				additional_item_in_cents = 50,
				expectedUrl = testUpdateShippingRateUrl + credAccessToken + 
					'&shipping_group_id=' + testShippingGroupId + 
					'&shipping_class_id=' + testShippingClassId +
					'&first_item_in_cents=' + first_item_in_cents +
					'&additional_item_in_cents=' + additional_item_in_cents;
			client.updateShippingRate(testShippingGroupId, testShippingClassId, 
				first_item_in_cents, additional_item_in_cents, testCallback);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call put with the right url with a passed access token', function() {
			var first_item_in_cents = 399,
				additional_item_in_cents = 50,
				expectedUrl = testUpdateShippingRateUrl + testAccessToken + 
					'&shipping_group_id=' + testShippingGroupId + 
					'&shipping_class_id=' + testShippingClassId +
					'&first_item_in_cents=' + first_item_in_cents +
					'&additional_item_in_cents=' + additional_item_in_cents;
			client.updateShippingRate(testShippingGroupId, testShippingClassId, 
				first_item_in_cents, additional_item_in_cents, testCallback, testAccessToken);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#getWebhooks()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = testGetWebhooksUrl + credAccessToken;
			client.getWebhooks(testCallback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = testGetWebhooksUrl + testAccessToken;			
			client.getWebhooks(testCallback, testAccessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#getWebhook()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = testGetWebhookUrl + credAccessToken;
			client.getWebhook(testWebhookId, testCallback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = testGetWebhookUrl + testAccessToken;			
			client.getWebhook(testWebhookId, testCallback, testAccessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#createWebhook()', function() {
		it('should call post with the right url', function() {
			var url = 'http://myhomepage.com',
				events = ['order/created', 'order/updated'],
				expectedUrl = testCreateWebhookUrl + credAccessToken + '&url=' +
					url + '&events=' + events;
			client.createWebhook(url, events, testCallback);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call post with the right url with a passed access token', function() {
			var url = 'http://myhomepage.com',
				events = ['order/created', 'order/updated'],
				expectedUrl = testCreateWebhookUrl + testAccessToken + '&url=' +
					url + '&events=' + events;
			client.createWebhook(url, events, testCallback, testAccessToken);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#updateWebhook()', function() {
		it('should call put with the right url', function() {
			var url = 'http://myhomepage.com',
				events = ['order/created', 'order/updated'],
				expectedUrl = testUpdateWebhookUrl + credAccessToken + '&url=' +
					url + '&events=' + events;
			client.updateWebhook(testWebhookId, url, events, testCallback);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call put with the right url with a passed access token', function() {
			var url = 'http://myhomepage.com',
				events = ['order/created', 'order/updated'],
				expectedUrl = testUpdateWebhookUrl + testAccessToken + '&url=' +
					url + '&events=' + events;
			client.updateWebhook(testWebhookId, url, events, testCallback, testAccessToken);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#deleteWebhook()', function() {
		it('should call delete with the right url', function() {
			var expectedUrl = testUpdateWebhookUrl + credAccessToken;
			client.deleteWebhook(testWebhookId, testCallback);
			expect(client.delete).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call delete with the right url with a passed access token', function() {
			var expectedUrl = testUpdateWebhookUrl + testAccessToken;			
			client.deleteWebhook(testWebhookId, testCallback, testAccessToken);
			expect(client.delete).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#createAccount()', function() {
		it('should call post with the right url', function() {
			var name = 'my cool store',
				subdomain = 'teh_cool3st',
				paypal_email = 'payme@snailmail.com',
				owner_login = 'unome',
				owner_email = 'myemail@snailmail.com',
				owner_password = 'p@ssw0rd',
				expectedUrl = testCreateAccountUrl + credAccessToken + '&client_id=' +
					testClientId + '&secret=' + testSecret + '&name=' + name +
					'&subdomain=' + subdomain + '&paypal_email=' + paypal_email +
					'&owner[login]=' + owner_login + '&owner[email]=' + owner_email +
					'&owner[password]=' + owner_password;
			client.createAccount(name, subdomain, paypal_email, owner_login, owner_email,
				owner_password, testCallback);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call post with the right url with a passed access token', function() {
			var name = 'my cool store',
				subdomain = 'teh_cool3st',
				paypal_email = 'payme@snailmail.com',
				owner_login = 'unome',
				owner_email = 'myemail@snailmail.com',
				owner_password = 'p@ssw0rd',
				expectedUrl = testCreateAccountUrl + testAccessToken + '&client_id=' +
					testClientId + '&secret=' + testSecret + '&name=' + name +
					'&subdomain=' + subdomain + '&paypal_email=' + paypal_email +
					'&owner[login]=' + owner_login + '&owner[email]=' + owner_email +
					'&owner[password]=' + owner_password;
			client.createAccount(name, subdomain, paypal_email, owner_login, owner_email,
				owner_password, testCallback, testAccessToken);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});
});