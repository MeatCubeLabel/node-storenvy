var Client = require('../lib/client.js');

describe('Client', function() {

	var client,
		testAccessToken = '1234567abcdef',
		testCallback = function() { return 23; },
		testStoreInfoUrl = 'https://api.storenvy.com/v1/me.json?access_token=';

	beforeEach(function() {
		client = new Client({
			access_token: testAccessToken
		});
	});

	describe('#getRootUrl()', function() {
		it('should return the right url when an access_token is passed', function() {
			var access_token = 'thisisnotanaccesstoken',
				expectedUrl = client.rootApiUrl + access_token;
			expect(client.getRootUrl(access_token)).toEqual(expectedUrl);
		});
		it('should return the right url when using the creds access_token', function() {
			var expectedUrl = client.rootApiUrl + testAccessToken;
			expect(client.getRootUrl()).toEqual(expectedUrl);
		});
	});

	describe('#buildPushUrl()', function() {
		it('should return the right url when an access_token is passed', function() {
			var access_token = 'thisisnotanaccesstoken',
				expectedUrl = client.rootPushUrl + access_token;
			expect(client.buildPushUrl(access_token)).toEqual(expectedUrl);
		});
		it('should return the right url when using the creds access_token', function() {
			var expectedUrl = client.rootPushUrl + testAccessToken;
			expect(client.buildPushUrl()).toEqual(expectedUrl);
		});
		it('should turn attributes into query params', function() {
			var attrs = {
				name: 'name',
				age: 32
			},
				expectedUrl = client.rootPushUrl + testAccessToken + '&name=name&age=32';
			expect(client.buildPushUrl(null, attrs)).toEqual(expectedUrl);
		});
	});

	describe('#getUserInfo()', function() {
		it('should call retrieve with the right url', function() {
			var expectedUrl = testStoreInfoUrl + testAccessToken;
			spyOn(global, 'retrieve');
			
			client.getUserInfo(testCallback);

			expect(retrieve).toHaveBeenCalledWith(expectedUrl, testCallback);
		});
	});
});