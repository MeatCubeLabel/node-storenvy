var Storenvy = require('../lib/storenvy.js'),
	Client = require('../lib/client.js'),
	test = require('./support/props.js');

describe('Storenvy', function() {

	var storenvy;

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
			storenvy.creds.appId = test.appId;
			storenvy.creds.appSecret = test.appSecret;
			storenvy.creds.redirect = test.redirect;
			expect(storenvy.complete()).toEqual(true);
		});
		it('should return false if app id is missing', function() {
			storenvy.creds.appSecret = test.appSecret;
			storenvy.creds.redirect = test.redirect;
			expect(storenvy.complete()).toEqual(false);
		});
		it('should return false if app secret is missing', function() {
			storenvy.creds.appId = test.appId;
			storenvy.creds.redirect = test.redirect;
			expect(storenvy.complete()).toEqual(false);
		});
		it('should return false if redirect is missing', function() {
			storenvy.creds.appId = test.appId;
			storenvy.creds.appSecret = test.appSecret;
			expect(storenvy.complete()).toEqual(false);
		});
	});

	describe('#buildOauthUrl()', function() {
		beforeEach(function() {
			storenvy.creds.appId = test.appId;
			storenvy.creds.appSecret = test.appSecret;
			storenvy.creds.redirect = test.redirect;
		});
		it('should return the right url if nothing is passed', function() {
			expect(storenvy.buildOAuthUrl()).toEqual(test.OauthUrl);
		});
		it('should return the right url if read is passed', function() {
			var expectedUrl = test.OauthUrl + ' store_read';
			expect(storenvy.buildOAuthUrl(true)).toEqual(expectedUrl);
		});
		it('should return the right url if write is passed', function() {
			var expectedUrl = test.OauthUrl + ' store_write';
			expect(storenvy.buildOAuthUrl(false, true)).toEqual(expectedUrl);
		});
		it('should return the right url if both are passed', function() {
			var expectedUrl = test.OauthUrl + ' store_read store_write';
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
				access_token: test.accessToken,
				refresh_token: test.refreshToken,
				expires_in: test.expiresIn
			},
			actualClient = storenvy.getClient(JSON.stringify(responseData));

			expect(actualClient).toEqual(jasmine.any(Client));
			expect(actualClient.creds.access_token).toEqual(test.accessToken);
			expect(actualClient.creds.refresh_token).toEqual(test.refreshToken);
			expect(actualClient.creds.expires_in).toEqual(test.expiresIn);
		});
		it('should also add the creds on the storenvy object', function() {
			var responseData = {
				access_token: test.accessToken,
				refresh_token: test.refreshToken,
				expires_in: test.expiresIn
			},
			actualClient = storenvy.getClient(JSON.stringify(responseData));

			expect(storenvy.creds.access_token).toEqual(test.accessToken);
			expect(storenvy.creds.refresh_token).toEqual(test.refreshToken);
			expect(storenvy.creds.expires_in).toEqual(test.expiresIn);
		});
	});
});