var Client = require('../lib/client.js'),
	test = require('./support/props.js');

describe('Client', function() {

	var client,
		e = encodeURIComponent;

	beforeEach(function() {
		client = new Client({
			access_token: test.credAccessToken,
			appId: test.clientId,
			appSecret: test.secret
		});
		spyOn(Client.prototype, 'get');
		spyOn(Client.prototype, 'post');
		spyOn(Client.prototype, 'put');
		spyOn(Client.prototype, 'delete');
	});

	describe('#getRootUrl()', function() {
		it('should return the right url when an access_token is passed', function() {
			var expectedUrl = client.rootApiUrl + test.accessToken;
			expect(client.getRootUrl(test.accessToken)).toEqual(expectedUrl);
		});
		it('should return the right url when using the creds access_token', function() {
			var expectedUrl = client.rootApiUrl + test.credAccessToken;
			expect(client.getRootUrl()).toEqual(expectedUrl);
		});
	});

	describe('#buildPushUrl()', function() {
		it('should return the right url when an access token is passed', function() {
			var expectedUrl = client.rootPushUrl + test.accessToken;
			expect(client.buildPushUrl(test.accessToken)).toEqual(expectedUrl);
		});
		it('should return the right url when using the creds access token', function() {
			var expectedUrl = client.rootPushUrl + test.credAccessToken;
			expect(client.buildPushUrl()).toEqual(expectedUrl);
		});
		it('should turn attributes into query params', function() {
			var attrs = {
				name: 'name',
				age: 32
			},
				expectedUrl = client.rootPushUrl + test.credAccessToken + '&name=name&age=32';
			expect(client.buildPushUrl(null, attrs)).toEqual(expectedUrl);
		});
	});

	describe('#getUserInfo()', function() {
		it('should call retrieve with the right url', function() {
			var expectedUrl = test.userInfoUrl + test.credAccessToken;			
			client.getUserInfo(test.callback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call retrieve with the right url with a passed access token', function() {
			var expectedUrl = test.userInfoUrl + test.accessToken;			
			client.getUserInfo(test.callback, test.accessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#getStoreInfo()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = test.storeInfoUrl + test.credAccessToken;
			client.getStoreInfo(test.callback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = test.storeInfoUrl + test.accessToken;			
			client.getStoreInfo(test.callback, test.accessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#createStore()', function() {
		it('should call post with the right url', function() {
			var name = 'some_name',
				subdomain = 'myurl',
				paypal_email = 'email@gmail.com',
				expectedUrl = test.createStoreUrl + test.credAccessToken + '&name=' +
					name + '&subdomain=' + subdomain + '&paypal_email=' + e(paypal_email);
			client.createStore(name, subdomain, paypal_email, test.callback);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call post with the right url with a passed access token', function() {
			var name = 'some_name',
				subdomain = 'myurl',
				paypal_email = 'email@gmail.com',
				expectedUrl = test.createStoreUrl + test.accessToken + '&name=' +
					name + '&subdomain=' + subdomain + '&paypal_email=' + e(paypal_email);
			client.createStore(name, subdomain, paypal_email, test.callback, test.accessToken);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#updateStoreInfo()', function() {
		it('should call put with the right url', function() {
			var return_address = 'some_address',
				description = 'an awesome store',
				avatar_url = 'coolpic.jpg',
				expectedUrl = test.updateStoreUrl + test.credAccessToken + 
					'&return_address=' + return_address + '&description=' + 
					e(description) + '&avatar_url=' + avatar_url,
				attrs = {
					return_address: return_address,
					description: description,
					avatar_url: avatar_url
				};
			client.updateStoreInfo(attrs, test.callback);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call put with the right url with a passed access token', function() {
			var return_address = 'some_address',
				description = 'an awesome store',
				avatar_url = 'coolpic.jpg',
				expectedUrl = test.updateStoreUrl + test.accessToken + 
					'&return_address=' + return_address + '&description=' + 
					e(description) + '&avatar_url=' + avatar_url,
				attrs = {
					return_address: return_address,
					description: description,
					avatar_url: avatar_url
				};
			client.updateStoreInfo(attrs, test.callback, test.accessToken);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#getStoreVisits()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = test.getStoreVisitsUrl + test.credAccessToken;
			client.getStoreVisits(test.callback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = test.getStoreVisitsUrl + test.accessToken;			
			client.getStoreVisits(test.callback, test.accessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#getStoreMarketplaceVisits()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = test.getStoreMarketplaceVisitsUrl + test.credAccessToken;
			client.getStoreMarketplaceVisits(test.callback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = test.getStoreMarketplaceVisitsUrl + test.accessToken;			
			client.getStoreMarketplaceVisits(test.callback, test.accessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#getStoreTemplates()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = test.getStoreTemplatesUrl + test.credAccessToken;
			client.getStoreTemplates(test.callback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = test.getStoreTemplatesUrl + test.accessToken;			
			client.getStoreTemplates(test.callback, test.accessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#updateStoreTemplate()', function() {
		it('should call put with the right url', function() {
			var name = 'some_name',
				permalink = 'http://google.com',
				content = 'a bunch of content',
				expectedUrl = test.updateStoreTemplateUrl + test.credAccessToken + 
					'&name=' + name + '&permalink=' + 
					e(permalink) + '&content=' + e(content),
				attrs = {
					name: name,
					permalink: permalink,
					content: content
				};
			client.updateStoreTemplate(test.storeTemplateId, attrs, test.callback);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call put with the right url with a passed access token', function() {
			var name = 'some_name',
				permalink = 'http://google.com',
				content = 'a bunch of content',
				expectedUrl = test.updateStoreTemplateUrl + test.accessToken + 
					'&name=' + name + '&permalink=' + 
					e(permalink) + '&content=' + e(content),
				attrs = {
					name: name,
					permalink: permalink,
					content: content
				};
			client.updateStoreTemplate(test.storeTemplateId, attrs, test.callback, test.accessToken);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#createStoreTemplate()', function() {
		it('should call post with the right url', function() {
			var name = 'some_name',
				expectedUrl = test.createStoreTemplateUrl + test.credAccessToken + 
					'&name=' + name;
			client.createStoreTemplate(name, null, test.callback);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call post with the right url with a passed access token', function() {
			var name = 'some_name',
				expectedUrl = test.createStoreTemplateUrl + test.accessToken + 
					'&name=' + name;
			client.createStoreTemplate(name, null, test.callback, test.accessToken);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call post with the right url given attributes', function() {
			var name = 'some_name',
				permalink = 'google.com',
				content = 'some_content',
				use_layout = 'cool_layout',
				expectedUrl = test.createStoreTemplateUrl + test.accessToken + 
					'&permalink=' + permalink + '&content=' + content + 
					'&use_layout=' + use_layout + '&name=' + name,
				attrs = {
					permalink: permalink,
					content: content,
					use_layout: use_layout
				};
			client.createStoreTemplate(name, attrs, test.callback, test.accessToken);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#getOrders()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = test.getOrdersUrl + test.credAccessToken;
			client.getOrders(null, test.callback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = test.getOrdersUrl + test.accessToken;			
			client.getOrders(null, test.callback, test.accessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call get with the right url with passed attributes', function() {
			var updated_at_min = '123456',
				status = 'open',
				expectedUrl = test.getOrdersUrl + test.credAccessToken + '&updated_at_min=' +
					updated_at_min + '&status=' + status,
				attrs = {
					updated_at_min: updated_at_min,
					status: status
				};
			client.getOrders(attrs, test.callback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#getOrder()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = test.getOrderUrl + test.credAccessToken;
			client.getOrder(test.orderId, test.callback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = test.getOrderUrl + test.accessToken;			
			client.getOrder(test.orderId, test.callback, test.accessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#shipOrder()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = test.shipOrderUrl + test.credAccessToken;
			client.shipOrder(test.orderId, null, test.callback);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = test.shipOrderUrl + test.accessToken;			
			client.shipOrder(test.orderId, null, test.callback, test.accessToken);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call get with the right url with a passed access token', function() {
			var items = '[1234,4545]',
				notify_customer = 'false',
				expectedUrl = test.shipOrderUrl + test.accessToken + '&items=' +
					e(items) + '&notify_customer=' + notify_customer,
				attrs = {
					items: items,
					notify_customer: notify_customer
				};			
			client.shipOrder(test.orderId, attrs, test.callback, test.accessToken);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#holdOrder()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = test.holdOrderUrl + test.credAccessToken;
			client.holdOrder(test.orderId, test.callback);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = test.holdOrderUrl + test.accessToken;			
			client.holdOrder(test.orderId, test.callback, test.accessToken);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = test.holdOrderUrl + test.accessToken;			
			client.holdOrder(test.orderId, test.callback, test.accessToken);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#openOrder()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = test.openOrderUrl + test.credAccessToken;
			client.openOrder(test.orderId, test.callback);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = test.openOrderUrl + test.accessToken;			
			client.openOrder(test.orderId, test.callback, test.accessToken);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = test.openOrderUrl + test.accessToken;			
			client.openOrder(test.orderId, test.callback, test.accessToken);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#getOrderProducts()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = test.getOrderProductsUrl + test.credAccessToken;
			client.getOrderProducts(test.orderId, test.callback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = test.getOrderProductsUrl + test.accessToken;			
			client.getOrderProducts(test.orderId, test.callback, test.accessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#getOrderVariants()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = test.getOrderVariantsUrl + test.credAccessToken;
			client.getOrderVariants(test.orderId, test.callback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = test.getOrderVariantsUrl + test.accessToken;			
			client.getOrderVariants(test.orderId, test.callback, test.accessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#updateFulfillment()', function() {
		it('should call put with the right url', function() {
			var expectedUrl = test.updateFulfillmentUrl + test.credAccessToken;
			client.updateFulfillment(test.orderId, test.fulfillmentId, null, test.callback);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call put with the right url with a passed access token', function() {
			var expectedUrl = test.updateFulfillmentUrl + test.accessToken;
			client.updateFulfillment(test.orderId, test.fulfillmentId, null, test.callback, test.accessToken);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call put with the right url when passed attributes', function() {
			var tracking_number = '123456789',
				shipping_company = 'USPS',
				note_to_customer = 'thanks dude!',
				expectedUrl = test.updateFulfillmentUrl + test.credAccessToken + 
					'&tracking_number=' + tracking_number + '&shipping_company=' +
					shipping_company + '&note_to_customer=' + e(note_to_customer),
				attrs = {
					tracking_number: tracking_number,
					shipping_company: shipping_company,
					note_to_customer: note_to_customer
				};
			client.updateFulfillment(test.orderId, test.fulfillmentId, attrs, test.callback);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#getProducts()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = test.getProductsUrl + test.credAccessToken;
			client.getProducts(null, test.callback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = test.getProductsUrl + test.accessToken;			
			client.getProducts(null, test.callback, test.accessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call get with the right url with passed attributes', function() {
			var updated_at_min = '123456',
				status = 'open',
				expectedUrl = test.getProductsUrl + test.credAccessToken + '&updated_at_min=' +
					updated_at_min + '&status=' + status,
				attrs = {
					updated_at_min: updated_at_min,
					status: status
				};
			client.getProducts(attrs, test.callback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#getProduct()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = test.getProductUrl + test.credAccessToken;
			client.getProduct(test.productId, test.callback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = test.getProductUrl + test.accessToken;			
			client.getProduct(test.productId, test.callback, test.accessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#createProduct()', function() {
		it('should call post with the right url', function() {
			var name = 'awesome product',
				cents = '1000000',
				expectedUrl = test.createProductUrl + test.credAccessToken + '&name=' +
					e(name) + '&cents=' + cents;
			client.createProduct(name, cents, null, test.callback);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call post with the right url with a passed access token', function() {
			var name = 'awesome product',
				cents = '1000000',
				expectedUrl = test.createProductUrl + test.accessToken + '&name=' +
					e(name) + '&cents=' + cents;
			client.createProduct(name, cents, null, test.callback, test.accessToken);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call post with the right url when passed attributes', function() {
			var name = 'awesome product',
				cents = '1000000',
				description = 'so cool',
				on_sale = 'true',
				expectedUrl = test.createProductUrl + test.credAccessToken + '&description=' +
					e(description) + '&on_sale=' + on_sale + '&name=' +
					e(name) + '&cents=' + cents,
				attrs = {
					description: description,
					on_sale: on_sale
				};
			client.createProduct(name, cents, attrs, test.callback);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#updateProduct()', function() {
		it('should call put with the right url', function() {
			var name = 'some name',
				cents = '45000',
				position = 'top',
				expectedUrl = test.updateProductUrl + test.credAccessToken + 
					'&name=' + e(name) + '&cents=' + cents +
					'&position=' + position,
				attrs = {
					name: name,
					cents: cents,
					position: position
				};
			client.updateProduct(test.productId, attrs, test.callback);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call put with the right url with a passed access token', function() {
			var name = 'some name',
				cents = '45000',
				position = 'top',
				expectedUrl = test.updateProductUrl + test.accessToken + 
					'&name=' + e(name) + '&cents=' + cents +
					'&position=' + position,
				attrs = {
					name: name,
					cents: cents,
					position: position
				};
			client.updateProduct(test.productId, attrs, test.callback, test.accessToken);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#deleteProduct()', function() {
		it('should call delete with the right url', function() {
			var expectedUrl = test.updateProductUrl + test.credAccessToken;
			client.deleteProduct(test.productId, test.callback);
			expect(client.delete).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call delete with the right url with a passed access token', function() {
			var expectedUrl = test.updateProductUrl + test.accessToken;			
			client.deleteProduct(test.productId, test.callback, test.accessToken);
			expect(client.delete).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#createVariant()', function() {
		it('should call post with the right url', function() {
			var productId = test.productId,
				name = 'awesome thing',
				full_quantity = '10',
				in_stock = '8',
				expectedUrl = test.createVariantUrl + test.credAccessToken + '&name=' +
					e(name) + '&full_quantity=' + full_quantity + '&in_stock=' + in_stock;
			client.createVariant(productId, name, full_quantity, in_stock, null, test.callback);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call post with the right url with a passed access token', function() {
			var productId = test.productId,
				name = 'awesome thing',
				full_quantity = '10',
				in_stock = '8',
				expectedUrl = test.createVariantUrl + test.accessToken + '&name=' +
					e(name) + '&full_quantity=' + full_quantity + '&in_stock=' + in_stock;
			client.createVariant(productId, name, full_quantity, in_stock, null, test.callback, test.accessToken);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call post with the right url when passed attributes', function() {
			var productId = test.productId,
				name = 'awesome thing',
				full_quantity = '10',
				in_stock = '8',
				position = 'top',
				sku = 'FGHF88798',
				expectedUrl = test.createVariantUrl + test.credAccessToken + '&position=' +
					position + '&sku=' + sku + '&name=' + e(name) + '&full_quantity=' + 
					full_quantity + '&in_stock=' + in_stock,
				attrs = {
					position: position,
					sku: sku
				};
			client.createVariant(productId, name, full_quantity, in_stock, attrs, test.callback);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#getVariant()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = test.getVariantUrl + test.credAccessToken;
			client.getVariant(test.productId, test.variantId, test.callback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = test.getVariantUrl + test.accessToken;			
			client.getVariant(test.productId, test.variantId, test.callback, test.accessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#updateVariant()', function() {
		it('should call put with the right url', function() {
			var position = 'top',
				in_stock = 2,
				expectedUrl = test.updateVariantUrl + test.credAccessToken + 
					'&position=' + position + '&in_stock=' + in_stock,
				attrs = {
					position: position,
					in_stock: in_stock
				};
			client.updateVariant(test.productId, test.variantId, attrs, test.callback);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call put with the right url with a passed access token', function() {
			var position = 'top',
				in_stock = 2,
				expectedUrl = test.updateVariantUrl + test.accessToken + 
					'&position=' + position + '&in_stock=' + in_stock,
				attrs = {
					position: position,
					in_stock: in_stock
				};
			client.updateVariant(test.productId, test.variantId, attrs, test.callback, test.accessToken);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#deleteVariant()', function() {
		it('should call delete with the right url', function() {
			var expectedUrl = test.updateVariantUrl + test.credAccessToken;
			client.deleteVariant(test.productId, test.variantId, test.callback);
			expect(client.delete).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call delete with the right url with a passed access token', function() {
			var expectedUrl = test.updateVariantUrl + test.accessToken;			
			client.deleteVariant(test.productId, test.variantId, test.callback, test.accessToken);
			expect(client.delete).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#getCollections()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = test.getCollectionsUrl + test.credAccessToken;
			client.getCollections(test.callback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = test.getCollectionsUrl + test.accessToken;			
			client.getCollections(test.callback, test.accessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#getCollection()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = test.getCollectionUrl + test.credAccessToken;
			client.getCollection(test.collectionId, test.callback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = test.getCollectionUrl + test.accessToken;			
			client.getCollection(test.collectionId, test.callback, test.accessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#createCollection()', function() {
		it('should call post with the right url', function() {
			var name = 'awesome collection',
				expectedUrl = test.createCollectionUrl + test.credAccessToken + '&name=' +
					e(name);
			client.createCollection(name, null, test.callback);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call post with the right url with a passed access token', function() {
			var name = 'awesome collection',
				expectedUrl = test.createCollectionUrl + test.accessToken + '&name=' +
					e(name);
			client.createCollection(name, null, test.callback, test.accessToken);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call post with the right url when passed attributes', function() {
			var name = 'awesome collection',
				photo = 'image.jpg',
				hide_in_storefront_navigation = 'true',
				expectedUrl = test.createCollectionUrl + test.credAccessToken + '&photo=' +
					photo + '&hide_in_storefront_navigation=' + hide_in_storefront_navigation + 
					'&name=' + e(name),
				attrs = {
					photo: photo,
					hide_in_storefront_navigation: hide_in_storefront_navigation
				};
			client.createCollection(name, attrs, test.callback);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#updateCollection()', function() {
		it('should call put with the right url', function() {
			var name = 'awesome product',
				position = 'bottom',
				products = '[334,3232,553232]',
				expectedUrl = test.updateCollectionUrl + test.credAccessToken + 
					'&position=' + position + '&products=' + e(products) +
					'&name=' + e(name),
				attrs = {
					position: position,
					products: products
				};
			client.updateCollection(test.collectionId, name, attrs, test.callback);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call put with the right url with a passed access token', function() {
			var name = 'awesome product',
				position = 'bottom',
				products = '[334,3232,553232]',
				expectedUrl = test.updateCollectionUrl + test.accessToken + 
					'&position=' + position + '&products=' + e(products) +
					'&name=' + e(name),
				attrs = {
					position: position,
					products: products
				};
			client.updateCollection(test.collectionId, name, attrs, test.callback, test.accessToken);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#deleteCollection()', function() {
		it('should call delete with the right url', function() {
			var expectedUrl = test.updateCollectionUrl + test.credAccessToken;
			client.deleteCollection(test.collectionId, test.callback);
			expect(client.delete).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call delete with the right url with a passed access token', function() {
			var expectedUrl = test.updateCollectionUrl + test.accessToken;			
			client.deleteCollection(test.collectionId, test.callback, test.accessToken);
			expect(client.delete).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#getShippingGroups()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = test.getShippingGroupsUrl + test.credAccessToken;
			client.getShippingGroups(test.callback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = test.getShippingGroupsUrl + test.accessToken;			
			client.getShippingGroups(test.callback, test.accessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#getShippingGroup()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = test.getShippingGroupUrl + test.credAccessToken;
			client.getShippingGroup(test.shippingGroupId, test.callback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = test.getShippingGroupUrl + test.accessToken;			
			client.getShippingGroup(test.shippingGroupId, test.callback, test.accessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#createShippingGroup()', function() {
		it('should call post with the right url', function() {
			var name = 'awesome shipping group',
				rates = '[{"shipping_class_id": 923919, "first_item_in_cents" : 699, "additional_item_in_cents" : 399}]',
				expectedUrl = test.createShippingGroupUrl + test.credAccessToken + '&name=' +
					e(name) + '&rates=' + e(rates);
			client.createShippingGroup(name, rates, test.callback);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call post with the right url with a passed access token', function() {
			var name = 'awesome shipping group',
				rates = '[{"shipping_class_id": 923919, "first_item_in_cents" : 699, "additional_item_in_cents" : 399}]',
				expectedUrl = test.createShippingGroupUrl + test.accessToken + '&name=' +
					e(name) + '&rates=' + e(rates);
			client.createShippingGroup(name, rates, test.callback, test.accessToken);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#updateShippingGroup()', function() {
		it('should call put with the right url', function() {
			var name = 'awesome shipping group',
				rates = '[{"shipping_class_id": 923919, "first_item_in_cents" : 699, "additional_item_in_cents" : 399}]',
				expectedUrl = test.updateShippingGroupUrl + test.credAccessToken + 
					'&name=' + e(name) + '&rates=' + e(rates);
			client.updateShippingGroup(test.shippingGroupId, name, rates, test.callback);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call put with the right url with a passed access token', function() {
			var name = 'awesome shipping group',
				rates = '[{"shipping_class_id": 923919, "first_item_in_cents" : 699, "additional_item_in_cents" : 399}]',
				expectedUrl = test.updateShippingGroupUrl + test.accessToken + 
					'&name=' + e(name) + '&rates=' + e(rates);
			client.updateShippingGroup(test.shippingGroupId, name, rates, test.callback, test.accessToken);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#deleteShippingGroup()', function() {
		it('should call delete with the right url', function() {
			var expectedUrl = test.updateShippingGroupUrl + test.credAccessToken;
			client.deleteShippingGroup(test.shippingGroupId, test.callback);
			expect(client.delete).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call delete with the right url with a passed access token', function() {
			var expectedUrl = test.updateShippingGroupUrl + test.accessToken;			
			client.deleteShippingGroup(test.shippingGroupId, test.callback, test.accessToken);
			expect(client.delete).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#getShippingClasses()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = test.getShippingClassesUrl + test.credAccessToken;
			client.getShippingClasses(test.callback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = test.getShippingClassesUrl + test.accessToken;			
			client.getShippingClasses(test.callback, test.accessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#getShippingClass()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = test.getShippingClassUrl + test.credAccessToken;
			client.getShippingClass(test.shippingClassId, test.callback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = test.getShippingClassUrl + test.accessToken;			
			client.getShippingClass(test.shippingClassId, test.callback, test.accessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#createShippingClass()', function() {
		it('should call post with the right url', function() {
			var name = 'awesome shipping class',
				rates = '[{"shipping_group_id": 923919, "first_item_in_cents" : 699, "additional_item_in_cents" : 399}]',
				countries = '["US","CA"]',
				expectedUrl = test.createShippingClassUrl + test.credAccessToken + '&name=' +
					e(name) + '&rates=' + e(rates) + '&countries=' + e(countries);
			client.createShippingClass(name, rates, countries, test.callback);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call post with the right url with a passed access token', function() {
			var name = 'awesome shipping class',
				rates = '[{"shipping_group_id": 923919, "first_item_in_cents" : 699, "additional_item_in_cents" : 399}]',
				countries = '["US","CA"]',
				expectedUrl = test.createShippingClassUrl + test.accessToken + '&name=' +
					e(name) + '&rates=' + e(rates) + '&countries=' + e(countries);
			client.createShippingClass(name, rates, countries, test.callback, test.accessToken);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#updateShippingClass()', function() {
		it('should call put with the right url', function() {
			var name = 'awesome shipping class',
				rates = '[{"shipping_group_id": 923919, "first_item_in_cents" : 699, "additional_item_in_cents" : 399}]',
				countries = '["US","CA"]',
				expectedUrl = test.updateShippingClassUrl + test.credAccessToken + 
					'&name=' + e(name) + '&rates=' + e(rates) + '&countries=' + e(countries);
			client.updateShippingClass(test.shippingClassId, name, rates, countries, test.callback);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call put with the right url with a passed access token', function() {
			var name = 'awesome shipping class',
				rates = '[{"shipping_group_id": 923919, "first_item_in_cents" : 699, "additional_item_in_cents" : 399}]',
				countries = '["US","CA"]',
				expectedUrl = test.updateShippingClassUrl + test.accessToken + 
					'&name=' + e(name) + '&rates=' + e(rates) + '&countries=' + e(countries);
			client.updateShippingClass(test.shippingClassId, name, rates, countries, test.callback, test.accessToken);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#deleteShippingClass()', function() {
		it('should call delete with the right url', function() {
			var expectedUrl = test.updateShippingClassUrl + test.credAccessToken;
			client.deleteShippingClass(test.shippingClassId, test.callback);
			expect(client.delete).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call delete with the right url with a passed access token', function() {
			var expectedUrl = test.updateShippingClassUrl + test.accessToken;			
			client.deleteShippingClass(test.shippingClassId, test.callback, test.accessToken);
			expect(client.delete).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#getShippingRate()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = test.getShippingRateUrl + test.credAccessToken + 
				'&shipping_group_id=' + test.shippingGroupId + 
				'&shipping_class_id=' + test.shippingClassId;
			client.getShippingRate(test.shippingGroupId, test.shippingClassId, test.callback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = test.getShippingRateUrl + test.accessToken + 
				'&shipping_group_id=' + test.shippingGroupId + 
				'&shipping_class_id=' + test.shippingClassId			
			client.getShippingRate(test.shippingGroupId, test.shippingClassId, test.callback, test.accessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should throw an exception if no shipping_group_id is passed', function() {
			expect(function() {
				client.getShippingRate(null, test.shippingClassId, test.callback)
			}).toThrow();
		});
		it('should throw an exception if no shipping_class_id is passed', function() {
			expect(function() {
				client.getShippingRate(test.shippingGroupId, null, test.callback)
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
				expectedUrl = test.updateShippingRateUrl + test.credAccessToken + 
					'&shipping_group_id=' + test.shippingGroupId + 
					'&shipping_class_id=' + test.shippingClassId +
					'&first_item_in_cents=' + first_item_in_cents +
					'&additional_item_in_cents=' + additional_item_in_cents;
			client.updateShippingRate(test.shippingGroupId, test.shippingClassId, 
				first_item_in_cents, additional_item_in_cents, test.callback);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call put with the right url with a passed access token', function() {
			var first_item_in_cents = 399,
				additional_item_in_cents = 50,
				expectedUrl = test.updateShippingRateUrl + test.accessToken + 
					'&shipping_group_id=' + test.shippingGroupId + 
					'&shipping_class_id=' + test.shippingClassId +
					'&first_item_in_cents=' + first_item_in_cents +
					'&additional_item_in_cents=' + additional_item_in_cents;
			client.updateShippingRate(test.shippingGroupId, test.shippingClassId, 
				first_item_in_cents, additional_item_in_cents, test.callback, test.accessToken);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#getWebhooks()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = test.getWebhooksUrl + test.credAccessToken;
			client.getWebhooks(test.callback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = test.getWebhooksUrl + test.accessToken;			
			client.getWebhooks(test.callback, test.accessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#getWebhook()', function() {
		it('should call get with the right url', function() {
			var expectedUrl = test.getWebhookUrl + test.credAccessToken;
			client.getWebhook(test.webhookId, test.callback);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call get with the right url with a passed access token', function() {
			var expectedUrl = test.getWebhookUrl + test.accessToken;			
			client.getWebhook(test.webhookId, test.callback, test.accessToken);
			expect(client.get).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#createWebhook()', function() {
		it('should call post with the right url', function() {
			var url = 'http://myhomepage.com',
				events = '["order/created","order/updated"]',
				expectedUrl = test.createWebhookUrl + test.credAccessToken + '&url=' +
					e(url) + '&events=' + e(events);
			client.createWebhook(url, events, test.callback);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call post with the right url with a passed access token', function() {
			var url = 'http://myhomepage.com',
				events = '["order/created","order/updated"]',
				expectedUrl = test.createWebhookUrl + test.accessToken + '&url=' +
					e(url) + '&events=' + e(events);
			client.createWebhook(url, events, test.callback, test.accessToken);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#updateWebhook()', function() {
		it('should call put with the right url', function() {
			var url = 'http://myhomepage.com',
				events = '["order/created","order/updated"]',
				expectedUrl = test.updateWebhookUrl + test.credAccessToken + '&url=' +
					e(url) + '&events=' + e(events);
			client.updateWebhook(test.webhookId, url, events, test.callback);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call put with the right url with a passed access token', function() {
			var url = 'http://myhomepage.com',
				events = '["order/created","order/updated"]',
				expectedUrl = test.updateWebhookUrl + test.accessToken + '&url=' +
					e(url) + '&events=' + e(events);
			client.updateWebhook(test.webhookId, url, events, test.callback, test.accessToken);
			expect(client.put).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#deleteWebhook()', function() {
		it('should call delete with the right url', function() {
			var expectedUrl = test.updateWebhookUrl + test.credAccessToken;
			client.deleteWebhook(test.webhookId, test.callback);
			expect(client.delete).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call delete with the right url with a passed access token', function() {
			var expectedUrl = test.updateWebhookUrl + test.accessToken;			
			client.deleteWebhook(test.webhookId, test.callback, test.accessToken);
			expect(client.delete).toHaveBeenCalledWith(expectedUrl, test.callback);
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
				expectedUrl = test.createAccountUrl + test.credAccessToken + '&client_id=' +
					test.clientId + '&secret=' + test.secret + '&name=' + e(name) +
					'&subdomain=' + subdomain + '&paypal_email=' + e(paypal_email) +
					'&owner[login]=' + owner_login + '&owner[email]=' + e(owner_email) +
					'&owner[password]=' + e(owner_password);
			client.createAccount(name, subdomain, paypal_email, owner_login, owner_email,
				owner_password, test.callback);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call post with the right url with a passed access token', function() {
			var name = 'my cool store',
				subdomain = 'teh_cool3st',
				paypal_email = 'payme@snailmail.com',
				owner_login = 'unome',
				owner_email = 'myemail@snailmail.com',
				owner_password = 'p@ssw0rd',
				expectedUrl = test.createAccountUrl + test.accessToken + '&client_id=' +
					test.clientId + '&secret=' + test.secret + '&name=' + e(name) +
					'&subdomain=' + subdomain + '&paypal_email=' + e(paypal_email) +
					'&owner[login]=' + owner_login + '&owner[email]=' + e(owner_email) +
					'&owner[password]=' + e(owner_password);
			client.createAccount(name, subdomain, paypal_email, owner_login, owner_email,
				owner_password, test.callback, test.accessToken);
			expect(client.post).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});
});