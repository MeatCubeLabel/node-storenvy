var https = require('https');

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
	this.idToken = ':id';
	this.endpoints = {
		user: 'me',
		store: 'store',
		store_visits: 'store/visits',
		store_templates: 'store/templates',
		orders: 'orders',
		order: 'orders/' + this.idToken,
		order_products: 'orders/' + this.idToken + '/products',
		products: 'products',
		product: 'products/' + this.idToken,
		collections: 'collections',
		collection: 'collections/' + this.idToken,
		shipping_groups: 'shipping_groups',
		shipping_group: 'shipping_groups/' + this.idToken,
		shipping_classes: 'shipping_classes',
		shipping_class: 'shipping_classes/' + this.idToken,
		shipping_rate: 'shipping_rate',
		webhooks: 'webhooks',
		webhook: 'webhooks/' + this.idToken
	};
}

/**
 * Makes a request to an endpoint and calls the callback with
 * the return data. Only used internally.
 * 
 * @param {string} endpoint - Storenvy endpoint.
 * @param {function} callback - Callback function, called when all data has been received.
 */
function retrieve(endpoint, callback) {
	var req = https.get(
		endpoint,
		function(res) {
			var returnData = '';
			res.on('data', function(d) {
				returnData += d;
			});
			res.on('end', function() {
				if(!returnData) {
					console.error('Nothing returned. You may have set incorrect scopes for this data.');
				}
				callback(null, returnData);
			});
	}).on('error', function(e) {
	  callback(e, null);
	});

};

/**
 * Builds a url using an optional access_token.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 * Note: returns a URL with an endpoint token that needs to be replaced
 * before sending a request.
 *
 * @param {string} access_token - Optional access token.
 */
Client.prototype.getRootUrl = function(access_token) {
	return this.rootApiUrl + (access_token || this.creds.access_token);
};

/**
 * Gets the user info for the authenticated access_token. Calls callback
 * when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.getUserInfo = function(callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken, this.endpoints.user);
	retrieve(url, callback);
};

/**
 * Gets the store info for the authenticated access_token. Calls callback
 * when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.getStoreInfo = function(callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken, 
		this.endpoints.store);
	retrieve(url, callback);
};

/**
 * Gets the store visits for the authenticated access_token. Calls callback
 * when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.getStoreVisits = function(callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken, 
		this.endpoints.store_visits);
	retrieve(url, callback);
};

/**
 * Gets the store templates for the authenticated access_token. Calls callback
 * when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.getStoreTemplates = function(callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken, 
		this.endpoints.store_templates);
	retrieve(url, callback);
};

/**
 * Gets the orders for the authenticated access_token. Calls callback
 * when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.getOrders = function(callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken, 
		this.endpoints.orders);
	retrieve(url, callback);
};

/**
 * Gets an order with a given ID for the authenticated access_token. Calls callback
 * when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * @param {string} id - ID of an order in the authenticated user's store.
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.getOrder = function(id, callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken, 
		this.endpoints.order.replace(this.idToken, id));
	retrieve(url, callback);
};

/**
 * Gets the products for the ID of an order for the authenticated access_token. 
 * Calls callback when the data is returned.
 * If no access_token is provided, it will use the access_token the object
 * was created with.
 *
 * @param {string} id - ID of an order in the authenticated user's store.
 * @param {function} callback - Callback function that the returned data is called with.
 * @param {string} access_token - Optional access token.
 */
Client.prototype.getOrderProducts = function(id, callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken, 
		this.endpoints.order_products.replace(this.idToken, id));
	retrieve(url, callback);
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
Client.prototype.getProducts = function(callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken, 
		this.endpoints.products);
	retrieve(url, callback);
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
	retrieve(url, callback);
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
	retrieve(url, callback);
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
	retrieve(url, callback);
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
	retrieve(url, callback);
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
	retrieve(url, callback);
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
	retrieve(url, callback);
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
	retrieve(url, callback);
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
Client.prototype.getShippingRate = function(shipping_group_id, shipping_class_id, callback, access_token) {
	if(!shipping_group_id || !shipping_class_id)
		throw "Must pass shipping_group_id and shipping_class_id into getShippingRate";
	var url = this.getRootUrl(access_token).replace(this.endpointToken, 
		this.endpoints.shipping_rate) + 
		'&shipping_group_id=' + shipping_group_id +
		'&shipping_class_id=' + shipping_class_id;
	retrieve(url, callback);
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
	retrieve(url, callback);
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
	retrieve(url, callback);
};

module.exports = Client;