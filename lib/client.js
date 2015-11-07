var https = require('https'),
	url = require('url'),
	http = require('http');

/**
 * Represents a Authenticated Storenvy Client.
 * @constructor
 * @param {object} creds - contains at least the access_token key 
 * 		for authenticating requests
 */
function Client(creds) {
	this.creds = creds;
	this.endpointToken = '{endpoint}';
	this.rootApiUrl = 'https://api.storenvy.com/v1/' + this.endpointToken + '.json?access_token=';
	this.rootPushUrl = 'https://api.storenvy.com/v1/' + this.endpointToken + '?access_token=',
	this.idToken = ':id';
	this.endpoints = {
		user: 'me',
		store: 'store',
		new_store: 'stores',
		store_visits: 'store/visits',
		store_marketplace_visits: 'store/marketplace_visits',
		store_templates: 'store/templates',
		store_template: 'store/templates/' + this.idToken,
		orders: 'orders',
		order: 'orders/' + this.idToken,
		fulfillments: 'orders/' + this.idToken + '/fulfillments/' + this.idToken,
		order_products: 'orders/' + this.idToken + '/products',
		order_variants: 'orders/' + this.idToken + '/variants',
		products: 'products',
		product: 'products/' + this.idToken,
		variants: 'products/' + this.idToken + '/variants',
		variant: 'products/' + this.idToken + '/variants/' + this.idToken,
		collections: 'collections',
		collection: 'collections/' + this.idToken,
		shipping_groups: 'shipping_groups',
		shipping_group: 'shipping_groups/' + this.idToken,
		shipping_classes: 'shipping_classes',
		shipping_class: 'shipping_classes/' + this.idToken,
		shipping_rate: 'shipping_rate',
		webhooks: 'webhooks',
		webhook: 'webhooks/' + this.idToken,
		new_account: 'application/stores'
	};
}

/**
 * Makes a GET request to an endpoint and calls the callback with
 * the return data. Only used internally.
 * 
 * @param {string} endpoint - Storenvy endpoint.
 * @param {function} callback - Callback function, called when all data has been received.
 */
Client.prototype.get = function(endpoint, callback) {
	https.get(endpoint,
		function(res) {
			var returnData = '';
			res.on('data', function(d) {
				returnData += d;
			});
			res.on('end', function() {
				if(!returnData) {
					console.error('Nothing returned. You may have set incorrect scopes for this data.');
				}
				if(callback)
					callback(null, returnData);
			});
	}).on('error', function(e) {
	  callback(e, null);
	});
};

/**
 * Makes a POST request to an endpoint and calls the callback with
 * the return data. Only used internally.
 * 
 * @param {string | object} endpoint - Storenvy endpoint url or HTTPS config object.
 * @param {function} callback - Callback function, called when all data has been received.
 */
Client.prototype.post = function(endpoint, callback) {
	var parsedUrl,
		options = this.makeHttpsOptions(endpoint, 'POST');
	https.request(options,
		function(res) {
			var returnData = '';
			res.on('data', function(d) {
				returnData += d;
			});
			res.on('end', function() {
				if(!returnData) {
					console.error('Nothing returned for POST. You may have set incorrect scopes for this data.');
				}
				if(callback)
					callback(null, returnData);
			});
	}).on('error', function(e) {
	  callback(e, null);
	}).end();
};

/**
 * Makes a PUT request to an endpoint and calls the callback with
 * the return data. Only used internally.
 * 
 * @param {string | object} endpoint - Storenvy endpoint url or HTTPS config object.
 * @param {function} callback - Callback function, called when all data has been received.
 */
Client.prototype.put = function(endpoint, callback) {
	var parsedUrl,
		options = this.makeHttpsOptions(endpoint, 'PUT');
	https.request(options,
		function(res) {
			var returnData = '';
			res.on('data', function(d) {
				returnData += d;
			});
			res.on('end', function() {
				if(!returnData) {
					console.error('Nothing returned for PUT. You may have set incorrect scopes for this data.');
				}
				if(callback)
					callback(null, returnData);
			});
	}).on('error', function(e) {
	  	callback(e, null);
	}).end();
};

/**
 * Makes a DELETE request to an endpoint and calls the callback with
 * the return data. Only used internally.
 * 
 * @param {string | object} endpoint - Storenvy endpoint url or HTTPS config object.
 * @param {function} callback - Callback function, called when all data has been received.
 */
Client.prototype.delete = function(endpoint, callback) {
	var parsedUrl,
		options = this.makeHttpsOptions(endpoint, 'DELETE');
	https.request(options,
		function(res) {
			var returnData = '';
			res.on('data', function(d) {
				returnData += d;
			});
			res.on('end', function() {
				if(!returnData) {
					console.error('Nothing returned for DELETE. You may have set incorrect scopes for this data.');
					console.error('For endpoint: ' + endpoint);
				}
				if(callback)
					callback(null, returnData);
			});
	}).on('error', function(e) {
		console.log(e);
	  	if(callback) callback(e, null);
	}).end();
};

Client.prototype.makeHttpsOptions = function(endpoint, method) {
	var parsedUrl,
		options;

	if (typeof endpoint !== 'string') {
		endpoint.method = method;
		return endpoint;
	} 
	if (typeof endpoint === 'string') {
		parsedUrl = url.parse(endpoint);
		options = {
			hostname: parsedUrl.hostname,
			path: parsedUrl.path,
			method: method,
			port: 443
		};
		return options;
	}

	throw 'Endpoint not recognized. Please check your endpoint.';
}

/**
 * Builds a GET url using an optional access_token and hash of attributes.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 * Note: returns a URL with an endpoint token that needs to be replaced
 * before sending a request.
 *
 * @param {string} access_token - Optional access token.
 * @param {object} attrs - Optional attributes
 */
Client.prototype.getRootUrl = function(access_token, attrs) {
	var returnUrl = this.rootApiUrl + (access_token || this.creds.access_token);
	for(var key in attrs) {
		returnUrl += '&' + key + '=' + encodeURIComponent(attrs[key]);
	}
	return returnUrl;
};

/**
 * Builds a url using an optional access_token and hash of attributes.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 * Note: returns a URL with an endpoint token that needs to be replaced
 * before sending a request.
 *
 * @param {string} access_token - Optional access token.
 * @param {object} attrs - Optional attributes
 */
Client.prototype.buildPushUrl = function(access_token, attrs) {
	var returnUrl = this.rootPushUrl + (access_token || this.creds.access_token);
	for(var key in attrs) {
		returnUrl += '&' + key + '=' + encodeURIComponent(attrs[key]);
	}
	return returnUrl;
};

/**
 * Gets the user info for the authenticated access_token. Calls callback
 * when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * https://developers.storenvy.com/api/User/GET/v1/me
 *
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.getUserInfo = function(callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken, this.endpoints.user);
	this.get(url, callback);
};

/**
 * Gets the store info for the authenticated access_token. Calls callback
 * when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * https://developers.storenvy.com/api/Store/GET/v1/store
 *
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.getStoreInfo = function(callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken, 
		this.endpoints.store);
	this.get(url, callback);
};

/**
 * Creates a store for the authenticated access_token. Calls callback
 * when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * https://developers.storenvy.com/api/Store/POST/v1/stores
 *
 * @param {string} name - The name of the store
 * @param {string} subdomain - Subdomain for the store
 * @param {string} paypal_email - Email for a Paypal account
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.createStore = function(name, subdomain, paypal_email, callback, access_token) {
	var attrs = {
		name: name,
		subdomain: subdomain,
		paypal_email: paypal_email
	}, 
		url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken, 
			this.endpoints.new_store);
	this.post(url, callback);
}

/**
 * Updates the store info for the authenticated access_token. Calls callback
 * when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * https://developers.storenvy.com/api/Store/PUT/v1/store
 *
 * @params {object} attrs - Hash of attributes to update the store
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.updateStoreInfo = function(attrs, callback, access_token) {
	var url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.store);
	this.put(url, callback);
}

/**
 * Gets the store visits for the authenticated access_token. Calls callback
 * when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * https://developers.storenvy.com/api/Store/GET/v1/store/visits
 *
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.getStoreVisits = function(callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken, 
		this.endpoints.store_visits);
	this.get(url, callback);
};

/**
 * Gets the marketplace store visits for the authenticated access_token. Calls callback
 * when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * https://developers.storenvy.com/api/Store/GET/v1/store/marketplace_visits
 *
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.getStoreMarketplaceVisits = function(callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken, 
		this.endpoints.store_marketplace_visits);
	this.get(url, callback);
};

/**
 * Gets the store templates for the authenticated access_token. Calls callback
 * when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * https://developers.storenvy.com/api/Page%20Templates/GET/v1/store/templates
 *
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.getStoreTemplates = function(callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken, 
		this.endpoints.store_templates);
	this.get(url, callback);
};

/**
 * Updates the info for a store template for the authenticated access_token. 
 * Calls callback when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * https://developers.storenvy.com/api/Page%20Templates/PUT/v1/store/templates/:id
 *
 * @param {string} id - Id of the store template
 * @param {object} attrs - Hash of attributes to update the store template
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.updateStoreTemplate = function(id, attrs, callback, access_token) {
	var url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.store_template.replace(this.idToken, id));
	this.put(url, callback);
}

/**
 * Creates a store template for the authenticated access_token. 
 * Calls callback when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * https://developers.storenvy.com/api/Page%20Templates/POST/v1/store/templates
 *
 * @param {string} name - Name of the store template
 * @param {object} attrs - Hash of attributes to update the store template
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.createStoreTemplate = function(name, attrs, callback, access_token) {
	var attrs = attrs || {},
		url;
	attrs.name = name;
	url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.store_templates);
	this.post(url, callback);
}

/**
 * Gets the orders for the authenticated access_token. Calls callback
 * when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * https://developers.storenvy.com/api/Orders/GET/v1/orders
 * 
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.getOrders = function(attrs, callback, access_token) {
	var url = this.getRootUrl(access_token, attrs).replace(this.endpointToken, 
		this.endpoints.orders);
	this.get(url, callback);
};

/**
 * Gets an order with a given ID for the authenticated access_token. Calls callback
 * when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * https://developers.storenvy.com/api/Orders/GET/v1/orders/:id
 *
 * @param {string} id - ID of an order in the authenticated user's store.
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.getOrder = function(id, callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken, 
		this.endpoints.order.replace(this.idToken, id));
	this.get(url, callback);
};

/**
 * Ships an order with a given ID for the authenticated access_token. Calls callback
 * when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * https://developers.storenvy.com/api/Orders/PUT/v1/orders/:id/ship
 *
 * @param {string} id - ID of an order in the authenticated user's store.
 * @param {object} attrs - Hash of attributes to apply to the ship status
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.shipOrder = function(id, attrs, callback, access_token) {
	var url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.order.replace(this.idToken, id) + '/ship');
	this.put(url, callback);
};

/**
 * Holds an order with a given ID for the authenticated access_token. Calls callback
 * when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * https://developers.storenvy.com/api/Orders/PUT/v1/orders/:id/hold
 *
 * @param {string} id - ID of an order in the authenticated user's store.
 * @param {object} attrs - Hash of attributes to apply to the hold status
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.holdOrder = function(id, callback, access_token) {
	var url = this.buildPushUrl(access_token).replace(this.endpointToken,
		this.endpoints.order.replace(this.idToken, id) + '/hold');
	this.put(url, callback);
};

/**
 * Opens an order with a given ID for the authenticated access_token. Calls callback
 * when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * https://developers.storenvy.com/api/Orders/PUT/v1/orders/:id/open
 *
 * @param {string} id - ID of an order in the authenticated user's store.
 * @param {object} attrs - Hash of attributes to apply to the open status
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.openOrder = function(id, callback, access_token) {
	var url = this.buildPushUrl(access_token).replace(this.endpointToken,
		this.endpoints.order.replace(this.idToken, id) + '/open');
	this.put(url, callback);
};

/**
 * Gets the products of an order for a given ID and authenticated access_token. 
 * Calls callback when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * https://developers.storenvy.com/api/Orders/GET/v1/orders/:id/products
 *
 * @param {string} id - ID of an order in the authenticated user's store.
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.getOrderProducts = function(id, callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken, 
		this.endpoints.order_products.replace(this.idToken, id));
	this.get(url, callback);
};

/**
 * Gets the variants of an order for a given ID and authenticated access_token. 
 * Calls callback when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * https://developers.storenvy.com/api/Orders/GET/v1/orders/:id/variants
 *
 * @param {string} id - ID of an order in the authenticated user's store.
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.getOrderVariants = function(id, callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken, 
		this.endpoints.order_variants.replace(this.idToken, id));
	this.get(url, callback);
};

/**
 * Updates the fulfillment status for a order with an authenticated access_token. 
 * Calls callback when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * @param {string} orderId - ID of an order in the authenticated user's store.
 * @param {string} fulfillmentId - ID of a fulfillment in the order
 * @param {object} attrs - Hash of attributes for the fulfillment
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.updateFulfillment = function(orderId, fulfillmentId, attrs, callback, access_token) {
	var url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.fulfillments
		.replace(this.idToken, orderId)
		.replace(this.idToken, fulfillmentId));
	this.put(url, callback);
};

/**
 * Gets all the products for the authenticated access_token. Calls callback
 * when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.getProducts = function(attrs, callback, access_token) {
	var url = this.getRootUrl(access_token, attrs).replace(this.endpointToken, 
		this.endpoints.products);
	this.get(url, callback);
};

/**
 * Gets the product with a given ID for the authenticated access_token. Calls callback
 * when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * @param {string} id - ID of an product in the authenticated user's store.
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.getProduct = function(id, callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken, 
		this.endpoints.product.replace(this.idToken, id));
	this.get(url, callback);
};

Client.prototype.createProduct = function(name, cents, attrs, callback, access_token) {
	var attrs = attrs || {};
	attrs.name = name;
	attrs.cents = cents;
	if(attrs.cents > 2147483647) {
		throw 'Cents cannot be more than 2147483648.';
	}
	var url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.products);
	this.post(url, callback);
};

Client.prototype.updateProduct = function(id, attrs, callback, access_token) {
	var url;
	if(attrs.cents && attrs.cents > 2147483647) {
		throw 'Cents cannot be more than 2147483648.';
	}
	url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.product.replace(this.idToken, id));
	this.put(url, callback);
};

Client.prototype.deleteProduct = function(id, callback, access_token) {
	var url = this.buildPushUrl(access_token).replace(this.endpointToken,
		this.endpoints.product.replace(this.idToken, id));
	this.delete(url, callback);
};

Client.prototype.createVariant = function(productId, name, full_quantity, in_stock, attrs, callback, access_token) {
	var attrs = attrs || {};
	attrs.name = name;
	attrs.full_quantity = full_quantity;
	attrs.in_stock = in_stock;
	var url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.variants.replace(this.idToken, productId));
	this.post(url, callback);
};

Client.prototype.getVariant = function(productId, variantId, callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken,
		this.endpoints.variant
		.replace(this.idToken, productId)
		.replace(this.idToken, variantId));
	this.get(url, callback);
};

Client.prototype.updateVariant = function(productId, variantId, attrs, callback, access_token) {
	var url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.variant
		.replace(this.idToken, productId)
		.replace(this.idToken, variantId));
	this.put(url, callback);
};

Client.prototype.deleteVariant = function(productId, variantId, callback, access_token) {
	var url = this.buildPushUrl(access_token).replace(this.endpointToken,
		this.endpoints.variant
		.replace(this.idToken, productId)
		.replace(this.idToken, variantId));
	this.delete(url, callback);
};

/**
 * Gets all collections for the authenticated access_token. Calls callback
 * when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.getCollections = function(callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken, 
		this.endpoints.collections);
	this.get(url, callback);
};

/**
 * Gets a collection with a given ID for the authenticated access_token. Calls callback
 * when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * @param {string} id - ID of a collection in the authenticated user's store.
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.getCollection = function(id, callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken, 
		this.endpoints.collection.replace(this.idToken, id));
	this.get(url, callback);
};

Client.prototype.createCollection = function(name, attrs, callback, access_token) {
	var attrs = attrs || {};
	attrs.name = name;
	var url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.collections);
	this.post(url, callback);
};

Client.prototype.updateCollection = function(id, name, attrs, callback, access_token) {
	var attrs = attrs || {},
		url;
	attrs.name = name;
	url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.collection.replace(this.idToken, id));
	this.put(url, callback);
};

Client.prototype.deleteCollection = function(id, callback, access_token) {
	var url = this.buildPushUrl(access_token).replace(this.endpointToken,
		this.endpoints.collection
		.replace(this.idToken, id));
	this.delete(url, callback);
};

/**
 * Gets all shipping groups for the authenticated access_token. Calls callback
 * when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.getShippingGroups = function(callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken, 
		this.endpoints.shipping_groups);
	this.get(url, callback);
};

/**
 * Gets a shipping group with a given ID for the authenticated access_token. Calls callback
 * when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * @param {string} id - ID of a shipping group in the authenticated user's store.
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.getShippingGroup = function(id, callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken, 
		this.endpoints.shipping_group.replace(this.idToken, id));
	this.get(url, callback);
};

Client.prototype.createShippingGroup = function(name, rates, callback, access_token) {
	var attrs = {
		name: name,
		rates: rates
	},
		url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.shipping_groups);
	this.post(url, callback);
};

Client.prototype.updateShippingGroup = function(id, name, rates, callback, access_token) {
	var attrs = {
		name: name,
		rates: rates
	},
		url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.shipping_group.replace(this.idToken, id));
	this.put(url, callback);
};

Client.prototype.deleteShippingGroup = function(id, callback, access_token) {
	var url = this.buildPushUrl(access_token).replace(this.endpointToken,
		this.endpoints.shipping_group.replace(this.idToken, id));
	this.delete(url, callback);
};

/**
 * Gets all the shipping classes for the authenticated access_token. Calls callback
 * when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.getShippingClasses = function(callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken, 
		this.endpoints.shipping_classes);
	this.get(url, callback);
};

/**
 * Gets a shipping class with a given ID for the authenticated access_token. Calls callback
 * when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * @param {string} id - ID of a shipping class in the authenticated user's store.
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.getShippingClass = function(id, callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken, 
		this.endpoints.shipping_class.replace(this.idToken, id));
	this.get(url, callback);
};

Client.prototype.createShippingClass = function(name, rates, countries, callback, 
	access_token) {
	
	var attrs = {
		name: name,
		rates: rates,
		countries: countries
	},
		url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.shipping_classes);
	this.post(url, callback);
};

Client.prototype.updateShippingClass = function(id, name, rates, countries, callback, 
	access_token) {

	var attrs = {
		name: name,
		rates: rates,
		countries: countries
	},
		url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.shipping_class.replace(this.idToken, id));
	this.put(url, callback);
};

Client.prototype.deleteShippingClass = function(id, callback, access_token) {
	var url = this.buildPushUrl(access_token).replace(this.endpointToken,
		this.endpoints.shipping_class.replace(this.idToken, id));
	this.delete(url, callback);
};

/**
 * Gets a shipping rate with a given shipping group ID & shipping class ID
 * for the authenticated access_token. Calls callback when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * @param {string} shipping_group_id - ID of a shipping group in the authenticated user's store.
 * @param {string} shipping_class_id - ID of a shipping class in the authenticated user's store.
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.getShippingRate = function(shipping_group_id, shipping_class_id, 
	callback, access_token) {

	if(!shipping_group_id || !shipping_class_id)
		throw "Must pass shipping_group_id and shipping_class_id into getShippingRate";
	var url = this.getRootUrl(access_token).replace(this.endpointToken, 
		this.endpoints.shipping_rate) + 
		'&shipping_group_id=' + shipping_group_id +
		'&shipping_class_id=' + shipping_class_id;
	this.get(url, callback);
};

Client.prototype.updateShippingRate = function(shipping_group_id, shipping_class_id, 
	first_item_in_cents, additional_item_in_cents, callback, access_token) {

	var attrs = {
		shipping_group_id: shipping_group_id,
		shipping_class_id: shipping_class_id,
		first_item_in_cents: first_item_in_cents,
		additional_item_in_cents: additional_item_in_cents
	},
		url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.shipping_rate);
	this.put(url, callback);
};

/**
 * Gets all webhooks for the authenticated access_token. Calls callback
 * when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.getWebhooks = function(callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken, 
		this.endpoints.webhooks);
	this.get(url, callback);
};

/**
 * Gets a webhook with a given ID for the authenticated access_token. Calls callback
 * when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * @param {string} id - ID of a webhook in the authenticated user's store.
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.getWebhook = function(id, callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken, 
		this.endpoints.webhook.replace(this.idToken, id));
	this.get(url, callback);
};

Client.prototype.createWebhook = function(url, events, callback, access_token) {
	var attrs = {
		url: url,
		events: events
	},
		url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.webhooks);
	this.post(url, callback);
};

Client.prototype.updateWebhook = function(id, url, events, callback, access_token) {
	var attrs = {
		url: url,
		events: events
	},
		url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.webhook.replace(this.idToken, id));
	this.put(url, callback);
};

Client.prototype.deleteWebhook = function(id, callback, access_token) {
	var url = this.buildPushUrl(access_token).replace(this.endpointToken,
		this.endpoints.webhook.replace(this.idToken, id));
	this.delete(url, callback);
};

Client.prototype.createAccount = function(name, subdomain, paypal_email, 
	owner_login, owner_email, owner_password, callback, access_token) {

	var attrs = {
		client_id: this.creds.appId,
		secret: this.creds.appSecret,
		name: name,
		subdomain: subdomain,
		paypal_email: paypal_email,
		'owner[login]': owner_login,
		'owner[email]': owner_email,
		'owner[password]': owner_password
	},
		url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.new_account);
	this.post(url, callback);
};

module.exports = Client;