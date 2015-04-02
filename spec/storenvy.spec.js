var Storenvy = require('../lib/storenvy.js'),
	Client = require('../lib/client.js');

describe('Storenvy', function() {

	var storenvy,
		testAppId = 'UAA992303KMP',
		testAppSecret = 'FJ498F91030U0',
		testRedirect = 'http://meatcube.com',
		testOauthUrl = 'https://www.storenvy.com/oauth/authorize?client_id=' + testAppId +
           '&response_type=code' + '&redirect_uri=' + testRedirect + '&scope=user',
        testAccessToken = 'UU8894iJjkfd998',
        testRefreshToken = '89FUIS8336F',
        testExpiresIn = 1000;

	beforeEach(function() {
		storenvy = new Storenvy({});
	});

	describe('#new', function() {
		it('should store the passed creds in the creds property', function() {
			var credsObj = { some: 'prop'};
			storenvy = new Storenvy(credsObj);
			expect(storenvy.creds).toEqual(credsObj);
		});
		it('should instantiate a new public property', function() {
			expect(storenvy.public.getStoreInfo).toBeTruthy();
		});
	});

	describe('#complete()', function() {
		it('should return true if all creds are accessible', function() {
			storenvy.creds.appId = testAppId;
			storenvy.creds.appSecret = testAppSecret;
			storenvy.creds.redirect = testRedirect;
			expect(storenvy.complete()).toEqual(true);
		});
		it('should return false if app id is missing', function() {
			storenvy.creds.appSecret = testAppSecret;
			storenvy.creds.redirect = testRedirect;
			expect(storenvy.complete()).toEqual(false);
		});
		it('should return false if app secret is missing', function() {
			storenvy.creds.appId = testAppId;
			storenvy.creds.redirect = testRedirect;
			expect(storenvy.complete()).toEqual(false);
		});
		it('should return false if redirect is missing', function() {
			storenvy.creds.appId = testAppId;
			storenvy.creds.appSecret = testAppSecret;
			expect(storenvy.complete()).toEqual(false);
		});
	});

	describe('#buildOauthUrl()', function() {
		beforeEach(function() {
			storenvy.creds.appId = testAppId;
			storenvy.creds.appSecret = testAppSecret;
			storenvy.creds.redirect = testRedirect;
		});
		it('should return the right url if nothing is passed', function() {
			expect(storenvy.buildOAuthUrl()).toEqual(testOauthUrl);
		});
		it('should return the right url if read is passed', function() {
			var expectedUrl = testOauthUrl + ' store_read';
			expect(storenvy.buildOAuthUrl(true)).toEqual(expectedUrl);
		});
		it('should return the right url if write is passed', function() {
			var expectedUrl = testOauthUrl + ' store_write';
			expect(storenvy.buildOAuthUrl(false, true)).toEqual(expectedUrl);
		});
		it('should return the right url if both are passed', function() {
			var expectedUrl = testOauthUrl + ' store_read store_write';
			expect(storenvy.buildOAuthUrl(true, true)).toEqual(expectedUrl);
		});
		it('should return falsy if credentials are not loaded', function() {
			storenvy.creds.appId = '';
			storenvy.creds.redirect = '';
			expect(storenvy.buildOAuthUrl()).toBeFalsy();
		});
	});

	describe('#generateClient()', function() {
		//:-( don't think this is going to be testable. 
		//probably going to drop this in the next version
	});

	describe('#getClient()', function() {
		it('should return a new Client object with the right creds', function() {
			var responseData = {
				access_token: testAccessToken,
				refresh_token: testRefreshToken,
				expires_in: testExpiresIn
			},
			actualClient = storenvy.getClient(JSON.stringify(responseData));

			expect(actualClient).toEqual(jasmine.any(Client));
			expect(actualClient.creds.access_token).toEqual(testAccessToken);
			expect(actualClient.creds.refresh_token).toEqual(testRefreshToken);
			expect(actualClient.creds.expires_in).toEqual(testExpiresIn);
		});
		it('should also add the creds on the storenvy object', function() {
			var responseData = {
				access_token: testAccessToken,
				refresh_token: testRefreshToken,
				expires_in: testExpiresIn
			},
			actualClient = storenvy.getClient(JSON.stringify(responseData));

			expect(storenvy.creds.access_token).toEqual(testAccessToken);
			expect(storenvy.creds.refresh_token).toEqual(testRefreshToken);
			expect(storenvy.creds.expires_in).toEqual(testExpiresIn);
		});
	});
});