var https = require('https'),
	Client = require('./client'),
	Public = require('./public');

/**
 * Represents an entry point to the Storenvy API wrapper.
 * From here you can both make public API calls, as well as
 * authenticate a Storenvy user and make calls on their behalf.
 * @constructor
 * @param {object} creds - must contain an Application ID, Application Secret
 * 		and Redirect ID if anything other than Public API calls want to be made.
 */
function Storenvy(creds) {	
	this.creds = creds;	
	this.public = new Public();
}

/**
 * Checks to ensure current stored Storenvy credentials are sufficient to
 * authenticate with Oauth (aka, get an authenticated Client)
 */
Storenvy.prototype.complete = function() {
	return !!this.creds &&
        !!this.creds.appId &&
        !!this.creds.appSecret &&
        !!this.creds.redirect;
};

/**
 * Builds an Oauth URL to Storenvy using the stored
 * credentials and optional read & write permissions.
 * NOTE: An authorized client is generally useless without at least requesting
 * the read permissions, so passing true for read is recommended.
 * 
 * @param {boolean} read - True to request read permissions to the store.
 * @param {boolean} write - True to request write permissions to the store.
 */
Storenvy.prototype.buildOAuthUrl = function(read, write) {
	if(this.complete()) 
	return 'https://www.storenvy.com/oauth/authorize?client_id=' + this.creds.appId +
           '&response_type=code' +
           '&redirect_uri=' + this.creds.redirect +
           '&scope=user' +
           (read ? ' store_read' : '') +
           (write ? ' store_write' : '');
};

/**
 * Generates an authenticated Client that can make calls
 * on behalf of a Storenvy user.
 * NOTE: see the examples section to see how this can be used.
 * 
 * @param {string} code - The access code returned from Storenvy
 * @param {function} callback - Callback function called with any error or 
 * a new Client object.
 */
Storenvy.prototype.generateClient = function(code, callback) {
	var se = this,
		path = '/oauth/token?' +
            'client_id=' + this.creds.appId +
            '&client_secret=' + this.creds.appSecret +
            '&code=' + code + 
            '&grant_type=authorization_code' +
            '&redirect_uri=' + this.creds.redirect,
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
    		callback(null, se.getClient(responseData));
    	});
    	res.on('error', function(err) {
    		callback(err, null);
    	});
    });
    req.end();

    req.on('error', function(e) {
	   callback(e);
	});
};

/**
 * Takes the response data from a Storenvy Oauth approval
 * and returns a new Client.
 * NOTE: If you want to provide your own access_token to each Client function,
 * 		 this method could be called manually.
 * 
 * @param {object} responseData - JSON reponse from an Storenvy Oauth request.
 */
Storenvy.prototype.getClient = function(responseData) {
	var resObj = JSON.parse(responseData);
	this.creds.access_token = resObj.access_token;
	this.creds.refresh_token = resObj.refresh_token;
	this.creds.expires_in = resObj.expires_in;
	return new Client(this.creds);
};

module.exports = Storenvy;