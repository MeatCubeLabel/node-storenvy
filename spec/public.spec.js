var Public = require('../lib/public.js'),
	test = require('./support/props.js');

describe('Public', function() {
	var public;

	beforeEach(function() {
		public = new Public();
		spyOn(Public.prototype, 'retrieve');
	});

	describe('#urlBuilder()', function() {
		it('should take a subdomain and path and return the right url', function() {
			expect(public.urlBuilder(test.subdomain, test.path)).toEqual(test.basicUrl);
		});
	});

	describe('#getStoreInfo()', function() {
		it('should call retrieve with the right url', function() {
			public.getStoreInfo(test.subdomain, test.callback)
			expect(public.retrieve).toHaveBeenCalledWith(test.getStoreInfoUrl, test.callback);
		});
	});

	describe('#getProducts()', function() {
		it('should call retrieve with the right url', function() {
			var expectedUrl = test.publicGetProductsUrl + '?';
			public.getProducts(test.subdomain, test.callback);
			expect(public.retrieve).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call retrieve with the right url if given a page', function() {
			var expectedUrl = test.publicGetProductsUrl + '?page=' + test.page + '&';
			public.getProducts(test.subdomain, test.callback, test.page);
			expect(public.retrieve).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call retrieve with the right url if given a perPage', function() {
			var expectedUrl = test.publicGetProductsUrl + '?per_page=' + test.perPage;
			public.getProducts(test.subdomain, test.callback, null, test.perPage);
			expect(public.retrieve).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call retrieve with the right url if given a page and perPage', function() {
			var expectedUrl = test.publicGetProductsUrl + '?page=' + test.page + '&per_page=' + test.perPage;
			public.getProducts(test.subdomain, test.callback, test.page, test.perPage);
			expect(public.retrieve).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#getProduct()', function() {
		it('should call retrieve with the right url', function() {
			public.getProduct(test.subdomain, test.productId, test.callback);
			expect(public.retrieve).toHaveBeenCalledWith(test.publicGetProductUrl, test.callback);
		});
	});

	describe('#getCollections()', function() {
		it('should call retrieve with the right url', function() {
			var expectedUrl = test.publicGetCollectionsUrl + '?';
			public.getCollections(test.subdomain, test.callback);
			expect(public.retrieve).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call retrieve with the right url if given a page', function() {
			var expectedUrl = test.publicGetCollectionsUrl + '?page=' + test.page + '&';
			public.getCollections(test.subdomain, test.callback, test.page);
			expect(public.retrieve).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call retrieve with the right url if given a perPage', function() {
			var expectedUrl = test.publicGetCollectionsUrl + '?per_page=' + test.perPage;
			public.getCollections(test.subdomain, test.callback, null, test.perPage);
			expect(public.retrieve).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
		it('should call retrieve with the right url if given a page and perPage', function() {
			var expectedUrl = test.publicGetCollectionsUrl + '?page=' + test.page + '&per_page=' + test.perPage;
			public.getCollections(test.subdomain, test.callback, test.page, test.perPage);
			expect(public.retrieve).toHaveBeenCalledWith(expectedUrl, test.callback);
		});
	});

	describe('#getCollection()', function() {
		it('should call retrieve with the right url', function() {
			public.getCollection(test.subdomain, test.collectionId, test.callback);
			expect(public.retrieve).toHaveBeenCalledWith(test.publicGetCollectionUrl, test.callback);
		});
	});
});