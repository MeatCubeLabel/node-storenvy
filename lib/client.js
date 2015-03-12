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
	this.rootPushUrl = 'https://api.storenvy.com/v1/' + this.endpointToken + '?access_token=',
	this.idToken = ':id';
	this.endpoints = {
		user: 'me',
		store: 'store',
		new_store: 'stores',
		store_visits: 'store/visits',
		store_templates: 'store/templates',
		orders: 'orders',
		order: 'orders/' + this.idToken,
		fulfillments: 'orders/' + this.idToken + '/fulfillments/' + this.idToken,
		order_products: 'orders/' + this.idToken + '/products',
		order_variants: 'orders/' + this.idToken + '/variants',
		products: 'products',
		product: 'products/' + this.idToken,
		variants: 'products/' + this.idToken + 'variants',
		variant: 'products/' + this.idToken + 'variants/' + this.idToken,
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

Client.prototype.buildPushUrl = function(access_token, attrs) {
	var returnUrl = this.rootPushUrl + (access_token || this.creds.access_token);
	for(var key in attrs) {
		returnUrl += '&' + key + '=' + attrs[key];
	}
	return returnUrl;
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

Client.prototype.createStore = function(name, subdomain, paypalEmail, callback, access_token) {
	var attrs = {
		name: name,
		subdomain: subdomain,
		paypal_email: paypalEmail
	}, 
		url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken, 
			this.endpoints.new_store);
	post(url, callback);
}

Client.prototype.updateStoreInfo = function(attrs, callback, access_token) {
	var url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.store);
	put(url, callback);
}

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

Client.prototype.updateStoreTemplate = function(name, permalink, content, useLayout, useDefault, callback, access_token) {
	var attrs = {
		name: name,
		permalink: permalink,
		content: content,
		use_layout: useLayout,
		use_default: useDefault
	},
		url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.store_templates);
	put(url, callback);
}

Client.prototype.createStoreTemplate = function(name, attrs, callback, access_token) {
	var attrs = attrs || {},
		url;
	attrs.name = name;
	url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.store_templates);
	post(url, callback);
}

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

Client.prototype.shipOrder = function(id, attrs, callback, access_token) {
	var url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.order.replace(this.idToken, id) + '/ship');
	put(url, callback);
};

Client.prototype.holdOrder = function(id, attrs, callback, access_token) {
	var url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.order.replace(this.idToken, id) + '/hold');
	put(url, callback);
};

Client.prototype.openOrder = function(id, attrs, callback, access_token) {
	var url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.order.replace(this.idToken, id) + '/open');
	put(url, callback);
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

Client.prototype.getOrderVariants = function(id, callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken, 
		this.endpoints.order_variants.replace(this.idToken, id));
	retrieve(url, callback);
};

Client.prototype.updateFulfillment = function(orderId, fulfillmentId, attrs, callback, access_token) {
	var url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.fulfillments
		.replace(this.idToken, orderId)
		.replace(this.idToken, fulfillmentId));
	put(url, callback);
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

Client.prototype.createProduct = function(name, cents, attrs, callback, access_token) {
	var attrs = attrs || {};
	attrs.name = name;
	attrs.cents = cents;
	var url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.products);
	post(url, callback);
};

Client.prototype.updateProduct = function(id, attrs, callback, access_token) {
	var url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.product.replace(this.idToken, id));
	put(url, callback);
};

Client.prototype.deleteProduct = function(id, callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken,
		this.endpoints.product.replace(this.idToken, id));
	delete(url, callback);
};

Client.prototype.createVariant = function(productId, name, fullQuantity, inStock, attrs, callback, access_token) {
	var attrs = attrs || {};
	attrs.name = name;
	attrs.full_quantity = fullQuantity;
	attrs.in_stock = inStock;
	var url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.variants.replace(this.idToken, productId));
	post(url, callback);
};

Client.prototype.getVariant = function(productId, variantId, callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken,
		this.endpoints.variant
		.replace(this.idToken, productId)
		.replace(this.idToken, variantId));
	retrieve(url, callback);
};

Client.prototype.updateVariant = function(productId, variantId, attrs, callback, access_token) {
	var url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.variant
		.replace(this.idToken, productId)
		.replace(this.idToken, variantId));
	put(url, callback);
};

Client.prototype.deleteVariant = function(productId, variantId, callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken,
		this.endpoints.variant
		.replace(this.idToken, productId)
		.replace(this.idToken, variantId));
	delete(url, callback);
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

Client.prototype.createCollection = function(name, attrs, callback, access_token) {
	var attrs = attrs || {};
	attrs.name = name;
	var url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.collections);
	post(url, callback);
};

Client.prototype.updateCollection = function(id, attrs, callback, access_token) {
	var url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.collection.replace(this.idToken, id));
	put(url, callback);
};

Client.prototype.deleteCollection = function(id, callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken,
		this.endpoints.collection
		.replace(this.idToken, id));
	delete(url, callback);
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

Client.prototype.createShippingGroup = function(name, rates, callback, access_token) {
	var attrs = {
		name: name,
		rates: rates
	},
		url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.shipping_groups);
	post(url, callback);
};

Client.prototype.updateShippingGroup = function(id, name, rates, callback, access_token) {
	var attrs = {
		name: name,
		rates: rates
	},
		url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.shipping_group.replace(this.idToken, id));
	put(url, callback);
};

Client.prototype.deleteShippingGroup = function(id, callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken,
		this.endpoints.shipping_group.replace(this.idToken, id));
	delete(url, callback);
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

Client.prototype.createShippingClass = function(name, rates, countries, callback, access_token) {
	var attrs = {
		name: name,
		rates: rates,
		countries: countries
	},
		url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.shipping_classes);
	post(url, callback);
};

Client.prototype.updateShippingClass = function(id, name, rates, countries, callback, access_token) {
	var attrs = {
		name: name,
		rates: rates,
		countries: countries
	},
		url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.shipping_class.replace(this.idToken, id));
	put(url, callback);
};

Client.prototype.deleteShippingClass = function(id, callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken,
		this.endpoints.shipping_class.replace(this.idToken, id));
	delete(url, callback);
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

Client.prototype.updateShippingRate = function(shipping_group_id, shipping_class_id, first_item_in_cents, additional_item_in_cents) {
	var attrs = {
		shipping_group_id: shipping_group_id,
		shipping_class_id: shipping_class_id,
		first_item_in_cents: first_item_in_cents,
		additional_item_in_cents: additional_item_in_cents
	},
		url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.shipping_rate);
	put(url, callback);
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

Client.prototype.createWebhook = function(url, events, callback, access_token) {
	var attrs = {
		url: url,
		events: events
	},
		url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.webhooks);
	post(url, callback);
};

Client.prototype.updateWebhook = function(id, url, events, callback, access_token) {
	var attrs = {
		url: url,
		events: events
	},
		url = this.buildPushUrl(access_token, attrs).replace(this.endpointToken,
		this.endpoints.webhook.replace(this.idToken, id));
	put(url, callback);
};

Client.prototype.deleteWebhook = function(id, callback, access_token) {
	var url = this.getRootUrl(access_token).replace(this.endpointToken,
		this.endpoints.webhook.replace(this.idToken, id));
	delete(url, callback);
};

Client.prototype.createAccount = function(name, subdomain, paypal_email, owner_login, owner_email, owner_password) {
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
	post(url, callback);
};

module.exports = Client;