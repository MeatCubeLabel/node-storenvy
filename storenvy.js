var https = require('https');

function Storenvy(creds) {	
	this.appId = creds.appId;
	this.appSecret = creds.appSecret;
	this.redirect = creds.redirect;
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

Storenvy.prototype.complete = function() {
	if(this.appId &&
	   this.appSecret &&
	   this.redirect)
	return true;
	
	console.err('Missing Storenvy credentials.');
	return false;
};

Storenvy.prototype.getAuthRedirectUrl = function(read, write) {
	if(this.complete()) 
	return 'https://www.storenvy.com/oauth/authorize?client_id=' + this.appId +
           '&response_type=code' +
           '&redirect_uri=' + this.redirect +
           '&scope=user' +
           (read ? ' store_read' : '') +
           (write ? ' store_write' : '');
};

Storenvy.prototype.getAccessToken = function(code, callback) {
	var se = this,
		path = '/oauth/token?' +
      		  'client_id=' + this.appId +
      		  '&client_secret=' + this.appSecret +
      		  '&code=' + code + 
      		  '&grant_type=authorization_code' +
      		  '&redirect_uri=' + this.redirect,
      	options = {
      		hostname: 'api.storenvy.com',
			path: path,
			method: 'POST'
      	};

    var req = https.request(options, function(res) {
    	var responseData = '';
    	res.on('data', function(data) {
    		responseData += data;
    	});
    	res.on('end', function() {
    		se.storeTokenInfo(responseData);
    		callback();
    	});
    	res.on('error', function(err) {
    		console.log(err);
    	});
    });
    req.end();

    req.on('error', function(e) {
	  console.error(e);
	});
};

Storenvy.prototype.storeTokenInfo = function(responseData) {
	var resObj = JSON.parse(responseData);
	this.access_token = resObj.access_token;
	this.refresh_token = resObj.refresh_token;
	this.expires_in = resObj.expires_in;
};

Storenvy.prototype.retrieve = function(endpoint, callback) {
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
				callback(returnData);
			});
	}).on('error', function(e) {
	  console.error(e);
	});

};

Storenvy.prototype.getRootUrl = function() {
	if(this.complete())
		return this.rootApiUrl + this.access_token;
};

Storenvy.prototype.getUserInfo = function(callback) {
	var url = this.getRootUrl().replace(this.endpointToken, this.endpoints.user);
	this.retrieve(url, callback);
};

Storenvy.prototype.getStoreInfo = function(callback) {
	var url = this.getRootUrl().replace(this.endpointToken, 
		this.endpoints.store);
	this.retrieve(url, callback);
};

Storenvy.prototype.getStoreVisits = function(callback) {
	var url = this.getRootUrl().replace(this.endpointToken, 
		this.endpoints.store_visits);
	this.retrieve(url, callback);
};

Storenvy.prototype.getStoreTemplates = function(callback) {
	var url = this.getRootUrl().replace(this.endpointToken, 
		this.endpoints.store_templates);
	this.retrieve(url, callback);
};

Storenvy.prototype.getOrders = function(callback) {
	var url = this.getRootUrl().replace(this.endpointToken, 
		this.endpoints.orders);
	this.retrieve(url, callback);
};

Storenvy.prototype.getOrder = function(id, callback) {
	var url = this.getRootUrl().replace(this.endpointToken, 
		this.endpoints.order.replace(this.idToken, id));
	this.retrieve(url, callback);
};

Storenvy.prototype.getOrderProducts = function(id, callback) {
	var url = this.getRootUrl().replace(this.endpointToken, 
		this.endpoints.order_products.replace(this.idToken, id));
	this.retrieve(url, callback);
};

Storenvy.prototype.getProducts = function(callback) {
	var url = this.getRootUrl().replace(this.endpointToken, 
		this.endpoints.products);
	this.retrieve(url, callback);
};

Storenvy.prototype.getProduct = function(id, callback) {
	var url = this.getRootUrl().replace(this.endpointToken, 
		this.endpoints.product.replace(this.idToken, id));
	this.retrieve(url, callback);
};

Storenvy.prototype.getCollections = function(callback) {
	var url = this.getRootUrl().replace(this.endpointToken, 
		this.endpoints.collections);
	this.retrieve(url, callback);
};

Storenvy.prototype.getCollection = function(id, callback) {
	var url = this.getRootUrl().replace(this.endpointToken, 
		this.endpoints.collection.replace(this.idToken, id));
	this.retrieve(url, callback);
};

Storenvy.prototype.getShippingGroups = function(callback) {
	var url = this.getRootUrl().replace(this.endpointToken, 
		this.endpoints.shipping_groups);
	this.retrieve(url, callback);
};

Storenvy.prototype.getShippingGroup = function(id, callback) {
	var url = this.getRootUrl().replace(this.endpointToken, 
		this.endpoints.shipping_group.replace(this.idToken, id));
	this.retrieve(url, callback);
};

Storenvy.prototype.getShippingClasses = function(callback) {
	var url = this.getRootUrl().replace(this.endpointToken, 
		this.endpoints.shipping_classes);
	this.retrieve(url, callback);
};

Storenvy.prototype.getShippingClass = function(id, callback) {
	var url = this.getRootUrl().replace(this.endpointToken, 
		this.endpoints.shipping_class.replace(this.idToken, id));
	this.retrieve(url, callback);
};

Storenvy.prototype.getShippingRate = function(shipping_group_id, shipping_class_id, callback) {
	if(!shipping_group_id || !shipping_class_id)
		throw "Must pass shipping_group_id and shipping_class_id into getShippingRate";
	var url = this.getRootUrl().replace(this.endpointToken, 
		this.endpoints.shipping_rate) + 
		'&shipping_group_id=' + shipping_group_id +
		'&shipping_class_id=' + shipping_class_id;
	this.retrieve(url, callback);
};

Storenvy.prototype.getWebhooks = function(callback) {
	var url = this.getRootUrl().replace(this.endpointToken, 
		this.endpoints.webhooks);
	this.retrieve(url, callback);
};

Storenvy.prototype.getWebhook = function(id, callback) {
	var url = this.getRootUrl().replace(this.endpointToken, 
		this.endpoints.webhook.replace(this.idToken, id));
	this.retrieve(url, callback);
};

module.exports = Storenvy;