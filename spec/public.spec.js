var Public = require('../lib/public.js');

describe('Public', function() {
	var public,
		testSubdomain = 'meatcube',
		testPath = 'myPath.json',
		testPage = '3',
		testPerPage = '10',
		testProductId = '1839494',
		testCollectionId = '584339494',
		testCallback = function() {},
		testBasicUrl = 'http://' + testSubdomain + '.storenvy.com/' + testPath,
		testGetStoreInfoUrl = 'http://' + testSubdomain + '.storenvy.com/store.json',
		testGetProductsUrl = 'http://' + testSubdomain + '.storenvy.com/products.json',
		testGetProductUrl = 'http://' + testSubdomain + '.storenvy.com/products/' + testProductId + '.json',
		testGetCollectionsUrl = 'http://' + testSubdomain + '.storenvy.com/collections.json',
		testGetCollectionUrl = 'http://' + testSubdomain + '.storenvy.com/collections/' + testCollectionId + '.json';

	beforeEach(function() {
		public = new Public();
		spyOn(Public.prototype, 'retrieve');
	});

	describe('#urlBuilder()', function() {
		it('should take a subdomain and path and return the right url', function() {
			expect(public.urlBuilder(testSubdomain, testPath)).toEqual(testBasicUrl);
		});
	});

	describe('#getStoreInfo()', function() {
		it('should call retrieve with the right url', function() {
			public.getStoreInfo(testSubdomain, testCallback)
			expect(public.retrieve).toHaveBeenCalledWith(testGetStoreInfoUrl, testCallback);
		});
	});

	describe('#getProducts()', function() {
		it('should call retrieve with the right url', function() {
			var expectedUrl = testGetProductsUrl + '?';
			public.getProducts(testSubdomain, testCallback);
			expect(public.retrieve).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call retrieve with the right url if given a page', function() {
			var expectedUrl = testGetProductsUrl + '?page=' + testPage + '&';
			public.getProducts(testSubdomain, testCallback, testPage);
			expect(public.retrieve).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call retrieve with the right url if given a perPage', function() {
			var expectedUrl = testGetProductsUrl + '?per_page=' + testPerPage;
			public.getProducts(testSubdomain, testCallback, null, testPerPage);
			expect(public.retrieve).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call retrieve with the right url if given a page and perPage', function() {
			var expectedUrl = testGetProductsUrl + '?page=' + testPage + '&per_page=' + testPerPage;
			public.getProducts(testSubdomain, testCallback, testPage, testPerPage);
			expect(public.retrieve).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#getProduct()', function() {
		it('should call retrieve with the right url', function() {
			public.getProduct(testSubdomain, testProductId, testCallback);
			expect(public.retrieve).toHaveBeenCalledWith(testGetProductUrl, testCallback);
		});
	});

	describe('#getCollections()', function() {
		it('should call retrieve with the right url', function() {
			var expectedUrl = testGetCollectionsUrl + '?';
			public.getCollections(testSubdomain, testCallback);
			expect(public.retrieve).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call retrieve with the right url if given a page', function() {
			var expectedUrl = testGetCollectionsUrl + '?page=' + testPage + '&';
			public.getCollections(testSubdomain, testCallback, testPage);
			expect(public.retrieve).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call retrieve with the right url if given a perPage', function() {
			var expectedUrl = testGetCollectionsUrl + '?per_page=' + testPerPage;
			public.getCollections(testSubdomain, testCallback, null, testPerPage);
			expect(public.retrieve).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
		it('should call retrieve with the right url if given a page and perPage', function() {
			var expectedUrl = testGetCollectionsUrl + '?page=' + testPage + '&per_page=' + testPerPage;
			public.getCollections(testSubdomain, testCallback, testPage, testPerPage);
			expect(public.retrieve).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});

	describe('#getCollection()', function() {
		it('should call retrieve with the right url', function() {
			public.getCollection(testSubdomain, testCollectionId, testCallback);
			expect(public.retrieve).toHaveBeenCalledWith(testGetCollectionUrl, testCallback);
		});
	});
});