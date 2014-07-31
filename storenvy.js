var https = require('https');

function Storenvy(key) {
	this.key = key;	
	this.endpointToken = '{endpoint}';
	this.rootApiUrl = 'https://api.storenvy.com/v1/' + this.endpointToken + '.json?api_key=' + this.key;
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
	}
}

Storenvy.prototype.retrieve = function(endpoint, callback) {
	https.get(
		endpoint,
		function(res) {
			var returnData = '';
			res.on('data', function(d) {
				returnData += d;
			});
			res.on('end', function(d) {
				callback(returnData);
			});
			res.on('error', function(e) {
				throw e;
			});
	});
};

// needs oauth support
// Storenvy.prototype.getUserInfo = function(callback) {
// 	var url = this.rootApiUrl.replace(this.endpointToken, this.endpoints.user);
// 	this.retrieve(url, callback);
// };

Storenvy.prototype.getStoreInfo = function(callback) {
	var url = this.rootApiUrl.replace(this.endpointToken, 
		this.endpoints.store);
	this.retrieve(url, callback);
};

Storenvy.prototype.getStoreVisits = function(callback) {
	var url = this.rootApiUrl.replace(this.endpointToken, 
		this.endpoints.store_visits);
	this.retrieve(url, callback);
};

Storenvy.prototype.getStoreTemplates = function(callback) {
	var url = this.rootApiUrl.replace(this.endpointToken, 
		this.endpoints.store_templates);
	this.retrieve(url, callback);
};

Storenvy.prototype.getOrders = function(callback) {
	var url = this.rootApiUrl.replace(this.endpointToken, 
		this.endpoints.orders);
	this.retrieve(url, callback);
};

Storenvy.prototype.getOrder = function(id, callback) {
	var url = this.rootApiUrl.replace(this.endpointToken, 
		this.endpoints.order.replace(this.idToken, id));
	this.retrieve(url, callback);
};

Storenvy.prototype.getOrderProducts = function(id, callback) {
	var url = this.rootApiUrl.replace(this.endpointToken, 
		this.endpoints.order_products.replace(this.idToken, id));
	this.retrieve(url, callback);
};

Storenvy.prototype.getProducts = function(callback) {
	var url = this.rootApiUrl.replace(this.endpointToken, 
		this.endpoints.products);
	this.retrieve(url, callback);
};

Storenvy.prototype.getProduct = function(id, callback) {
	var url = this.rootApiUrl.replace(this.endpointToken, 
		this.endpoints.product.replace(this.idToken, id));
	this.retrieve(url, callback);
};

Storenvy.prototype.getCollections = function(callback) {
	var url = this.rootApiUrl.replace(this.endpointToken, 
		this.endpoints.collections);
	this.retrieve(url, callback);
};

Storenvy.prototype.getCollection = function(id, callback) {
	var url = this.rootApiUrl.replace(this.endpointToken, 
		this.endpoints.collection.replace(this.idToken, id));
	this.retrieve(url, callback);
};

Storenvy.prototype.getShippingGroups = function(callback) {
	var url = this.rootApiUrl.replace(this.endpointToken, 
		this.endpoints.shipping_groups);
	this.retrieve(url, callback);
};

Storenvy.prototype.getShippingGroup = function(id, callback) {
	var url = this.rootApiUrl.replace(this.endpointToken, 
		this.endpoints.shipping_group.replace(this.idToken, id));
	this.retrieve(url, callback);
};

Storenvy.prototype.getShippingClasses = function(callback) {
	var url = this.rootApiUrl.replace(this.endpointToken, 
		this.endpoints.shipping_classes);
	this.retrieve(url, callback);
};

Storenvy.prototype.getShippingClass = function(id, callback) {
	var url = this.rootApiUrl.replace(this.endpointToken, 
		this.endpoints.shipping_class.replace(this.idToken, id));
	this.retrieve(url, callback);
};

Storenvy.prototype.getShippingRate = function(shipping_group_id, shipping_class_id, callback) {
	if(!shipping_group_id || !shipping_class_id)
		throw "Must pass shipping_group_id and shipping_class_id into getShippingRate";
	var url = this.rootApiUrl.replace(this.endpointToken, 
		this.endpoints.shipping_rate) + 
		'&shipping_group_id=' + shipping_group_id +
		'&shipping_class_id=' + shipping_class_id;
	this.retrieve(url, callback);
};

Storenvy.prototype.getWebhooks = function(callback) {
	var url = this.rootApiUrl.replace(this.endpointToken, 
		this.endpoints.webhooks);
	this.retrieve(url, callback);
};

Storenvy.prototype.getWebhook = function(id, callback) {
	var url = this.rootApiUrl.replace(this.endpointToken, 
		this.endpoints.webhook.replace(this.idToken, id));
	this.retrieve(url, callback);
};

exports.Storenvy = Storenvy;