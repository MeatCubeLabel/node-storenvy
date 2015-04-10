var http = require('http');

/**
 * Represents the public API of Storenvy.
 * @constructor
 */
function Public() {
	this.hostname = '.storenvy.com/';
}

/**
 * Makes a request to an endpoint and calls the callback with
 * the return data. Only used internally.
 * 
 * @param {string} endpoint - Storenvy endpoint.
 * @param {function} callback - Callback function, called when all data has been received.
 */
Public.prototype.retrieve = function(endpoint, callback) {
	http.get(endpoint, function(res) {
		var returnData = '';
		res.on('data', function (chunk) {
			returnData += chunk;
		});
		res.on('end', function () {
			callback(null, returnData);
		});
	}).on('error', function(e) {
	  	callback(e, null);
	});
}

/**
 * Builds a url using a subdomain and a path.
 *
 * @param {string} subdomain - Subdomain for an existing Storenvy store.
 * @param {string} path - The endpoint to call.
 */
Public.prototype.urlBuilder = function(subdomain, path) {
	return 'http://' + subdomain + this.hostname + path;
}

/**
 * Gets the general store info for a given subdomain.
 *
 * @param {string} storeSubdomain - Subdomain for an existing Storenvy store.
 * @param {string} callback - Callback function, passed any error and the return data.
 */
Public.prototype.getStoreInfo = function(storeSubdomain, callback) {
	this.retrieve(this.urlBuilder(storeSubdomain, 'store.json'), callback);
}

/**
 * Gets the products for a given subdomain. Pagination is optionally
 * added at the end of the function.
 *
 * @param {string} storeSubdomain - Subdomain for an existing Storenvy store.
 * @param {string} callback - Callback function, passed any error and the return data.
 * @param {number} page - The page of products you want returned
 * @param {number} perPage - The number of products per page you want returned
 */
Public.prototype.getProducts = function(storeSubdomain, callback, page, perPage) {
	var path = 'products.json?' + 
		(page ? 'page=' + page + '&' : '') +
		(perPage ? 'per_page=' + perPage : '');
	this.retrieve(this.urlBuilder(storeSubdomain, path), callback);
}

/**
 * Gets a product for a given subdomain and product ID.
 *
 * @param {string} storeSubdomain - Subdomain for an existing Storenvy store.
 * @param {number} productId - Product ID for an existing product on this store.
 * @param {string} callback - Callback function, passed any error and the return data.
 */
Public.prototype.getProduct = function(storeSubdomain, productId, callback) {
	this.retrieve(this.urlBuilder(storeSubdomain, 'products/' + productId + '.json'), callback);
}

/**
 * Gets the collections for a given subdomain. Pagination is optionally
 * added at the end of the function.
 *
 * @param {string} storeSubdomain - Subdomain for an existing Storenvy store.
 * @param {string} callback - Callback function, passed any error and the return data.
 * @param {number} page - The page of products you want returned
 * @param {number} perPage - The number of products per page you want returned
 */
Public.prototype.getCollections = function(storeSubdomain, callback, page, perPage) {
	var path = 'collections.json?' + 
		(page ? 'page=' + page + '&' : '') +
		(perPage ? 'per_page=' + perPage : '');
	this.retrieve(this.urlBuilder(storeSubdomain, path), callback);
}

/**
 * Gets a collection for a given subdomain and collection ID.
 *
 * @param {string} storeSubdomain - Subdomain for an existing Storenvy store.
 * @param {number} collectionId - Collection ID for an existing collection on this store.
 * @param {string} callback - Callback function, passed any error and the return data.
 */
Public.prototype.getCollection = function(storeSubdomain, collectionId, callback) {
	this.retrieve(this.urlBuilder(storeSubdomain, 'collections/' + collectionId + '.json'), callback);
}

module.exports = Public;