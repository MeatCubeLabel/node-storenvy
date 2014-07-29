var https = require('https');

function Storenvy(key) {
	this.key = key;	
	
	var endpointToken = '{endpoint}',
		rootApiUrl = 'https://api.storenvy.com/v1/' + endpointToken + '.json?api_key=' + key,
		endpoints = {
			user: 'me',
			store: 'store',
			store_visits: 'store/visits',
			store_templates: 'store/templates',
			orders: 'orders',
			order: 'orders/:id',
			order_products: 'orders/:id/products',
			products: 'products',
			product: 'products/:id',
			collections: 'collections',
			collection: 'collections/:id',
			shipping_groups: 'shipping_groups',
			shipping_group: 'shipping_groups/:id',
			shipping_classes: 'shipping_classes',
			shipping_class: 'shipping_classes/:id',
			shipping_rate: 'shipping_rate',
			webhooks: 'webhooks',
			webhook: 'webhooks/:id'
		}

	function retrieve(endpoint, callback) {
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
	}

	this.getUserInfo = function(callback) {
		retrieve(rootApiUrl.replace(endpointToken, endpoints.user), callback);
	}
	this.getStoreInfo = function(callback) {
		retrieve(rootApiUrl.replace(endpointToken, endpoints.store), callback);
	};

	this.getStoreVisits = function(callback) {
		retrieve(rootApiUrl.replace(endpointToken, endpoints.store_visits), callback);
	}
	
	this.getStoreTemplates = function(callback) {
		retrieve(rootApiUrl.replace(endpointToken, endpoints.store_templates), callback);
	}

}

exports.Storenvy = Storenvy;