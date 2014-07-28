var https = require('https');

function Storenvy(key) {
	this.key = key;
	
	var endpointToken = '{endpoint}',
		rootApiUrl = 'https://api.storenvy.com/v1/' + endpointToken + '.json';

	this.getStoreInfo = function(callback) {
		var endpoint = 'store';
		https.get(
			rootApiUrl.replace(endpointToken, endpoint),
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

}

exports.Storenvy = Storenvy;