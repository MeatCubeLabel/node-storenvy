node-storenvy v0.4.1
=============
[![NPM version](http://img.shields.io/npm/v/storenvy.svg?style=flat)](https://www.npmjs.org/package/storenvy)
[![Build Status](https://travis-ci.org/ryanmurakami/node-storenvy.svg?branch=develop)](https://travis-ci.org/ryanmurakami/node-storenvy)
[![Code Climate](https://codeclimate.com/github/ryanmurakami/node-storenvy/badges/gpa.svg)](https://codeclimate.com/github/ryanmurakami/node-storenvy)
[![Test Coverage](https://codeclimate.com/github/ryanmurakami/node-storenvy/badges/coverage.svg)](https://codeclimate.com/github/ryanmurakami/node-storenvy)
[![Inline docs](http://inch-ci.org/github/ryanmurakami/node-storenvy.svg?branch=master)](http://inch-ci.org/github/ryanmurakami/node-storenvy)
#### A Node wrapper to the Storenvy API
Supports OAuth 2 authentication.

## Changes in v0.4.0
- All endpoints implemented
- Fully unit tested suite
- New build process

## Roadmap
- Simplify API
- Major refactor
- Add more examples (express)
- Write better documentation

# Getting Started
Download node-storenvy via npm
```shell
npm install storenvy
```

Add the storenvy module to your project:
```js
var Storenvy = require('storenvy');
```

#### Public API Calls
To make public API calls, create a new Storenvy object:
```js
var storenvy = new Storenvy();
```

On the created storenvy object, use the methods on the `public` property to make public API calls to Storenvy. *This does not require any authentication.
Example:
```js
storenvy.public.getStoreInfo('meatcube', function(err, data) {
	console.log(data);
});
```

#### Authenticated API Calls
Authenticated calls are a little trickier. You will need to sign up for a developer account with Storenvy to get an Application ID and Application Secret. 
Sign up here: https://developers.storenvy.com

Create a new Storenvy object with your credentials:
```js
var creds = {
	appId: '<YOUR_APPLICATION_ID>',
	appSecret: '<YOUR_APPLICATION_SECRET>',
	redirect: '<YOUR_APP_REDIRECT_URL>'
};

var storenvy = new Storenvy(creds);
```

With the Storenvy object, you need to generate a client using an access_token from Storenvy. This follows the OAauth 2 pattern (specific details here: https://developers.storenvy.com/authentication).
To generate the initial URL for a user to authenticate from, with all permissions:
```js
storenvy.buildOAuthURL(true, true);
```

Storenvy will redirect that request to your registered redirect URL with a `code` query parameter. Once you have that code, you can generate a newly authenticated Client:
```js
storenvy.generateClient(code, function(err, client) {
	//store or call using your new client
});
```

The authenticated Client has many types of store data that it can get. Here is an example of one such call:
```js
client.getStoreInfo(function(err, data) {
	console.log(data);
});
```

More documentation is coming soon!
