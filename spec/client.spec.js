var Client = require('../lib/client.js');

describe('Client', function() {

	var client,
		credAccessToken = '1234567abcdef',
		testAccessToken = 'thisisnotanaccesstoken',
		testStoreTemplateId = '123456',
		testOrderId = '34543',
		testFulfillmentId = '858640',
		testProductId = '485343',
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
		testUpdateProductUrl = 'https://api.storenvy.com/v1/products/' + testProductId + '?access_token=';

	beforeEach(function() {
		client = new Client({
			access_token: credAccessToken
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
		it('should call get with the right url', function() {
			var expectedUrl = testUpdateProductUrl + credAccessToken;
			client.deleteProduct(testProductId, testCallback);
			expect(client.delete).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = testUpdateProductUrl + testAccessToken;			
			client.deleteProduct(testProductId, testCallback, testAccessToken);
			expect(client.delete).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});
});