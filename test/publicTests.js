var Storenvy = require('../lib/storenvy'),
	se = new Storenvy(),
	tests = {
		runAll: function() {
			for(var func in tests) {
				if(func !== 'runAll' && typeof tests[func] === 'function') {
					tests[func]();
				}
			}
		},

		storeInfoTest: function() {
			se.public.getStoreInfo('meatcube', function(err, data) {
				if(err) console.err(err);
				var obj = JSON.parse(data);
				if(obj.subdomain === 'meatcube')
					console.log('Store Info Test passed.');
				else 
					console.log('Store Info Test failed with ' + data);
			});
		},

		productsTest: function() {
			se.public.getProducts('meatcube', function(err, data) {
				if(err) console.err(err);
				var obj = JSON.parse(data);
				if(obj.length > 0)
					console.log('Products Test passed.');
				else 
					console.log('Products Test failed with ' + data);
			});
		},

		productsPerPageTest: function() {
			se.public.getProducts('meatcube', function(err, data) {
				if(err) console.err(err);
				var obj = JSON.parse(data);
				if(obj.length === 10)
					console.log('Products Per Page Test passed.');
				else 
					console.log('Products Per Page Test failed with ' + data);
			}, 1, 10);
		},

		productTest: function() {
			se.public.getProduct('meatcube', 6509683, function(err, data) {
				if(err) console.err(err);
				var obj = JSON.parse(data);
				if(obj.id === 6509683)
					console.log('Product Test passed.');
				else 
					console.log('Product Test failed with ' + data);
			});
		},

		collectionsTest: function() {
			se.public.getCollections('meatcube', function(err, data) {
				if(err) console.err(err);
				var obj = JSON.parse(data);
				if(obj.collections.length > 0)
					console.log('Collections Test passed.');
				else 
					console.log('Collections Test failed with ' + data);
			});
		},

		collectionsPerPageTest: function() {
			// pagination is not currently working for the API
			//
			// se.public.getCollections('meatcube', function(err, data) {
			// 	if(err) console.err(err);
			// 	var obj = JSON.parse(data);
			// 	if(obj.collections.length === 3)
			// 		console.log('Collections Per Page Test passed.');
			// 	else 
			// 		console.log('Collections Per Page Test failed with ' + data);
			// }, 1, 3);
		},

		collectionTest: function() {
			se.public.getCollection('meatcube', 125448, function(err, data) {
				if(err) console.err(err);
				var obj = JSON.parse(data);
				if(obj.id === 125448)
					console.log('Collection Test passed.');
				else 
					console.log('Collection Test failed with ' + data);
			});
		}

		//this also seems to not be working currently
		// variantTest: function() {
		// 	se.public.getVariants('meatcube', 125448, function(err, data) {
		// 		if(err) console.err(err);
		// 		var obj = JSON.parse(data);
		// 		if(obj.id === 125448)
		// 			console.log('Collection Test passed.');
		// 		else 
		// 			console.log('Collection Test failed with ' + data);
		// 	});
		// }
	};

module.exports = tests;