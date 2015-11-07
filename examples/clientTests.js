
function goodRes(obj) {
	return !obj.error && 
		   obj.meta.code === 200 &&
		   obj.data;
}

var tests = {
	runAll: function(seClient) {
		tests.seClient = seClient;
		for(var func in tests) {
			if(func !== 'runAll' && typeof tests[func] === 'function') {
				tests[func]();
			}
		}
	},

	userTest: function(seClient) {
		seClient = seClient || tests.seClient;
		seClient.getUserInfo(function(err, data) { 
			var obj = JSON.parse(data);
			if(goodRes(obj) &&
				obj.data.id)
				console.log('User Info Test passed.');
			else 
				console.log('User Info Test failed with ' + JSON.stringify(obj));
		});
	},

	storeInfoTest: function(seClient) {
		seClient = seClient || tests.seClient;
		seClient.getStoreInfo(function(err, data) { 
			var obj = JSON.parse(data);
			if(goodRes(obj) &&
				obj.data.name &&
				obj.data.url)
				console.log('Store Info Test passed.');
			else 
				console.log('Store Info Test failed with ' + JSON.stringify(obj));
		});
	},

	storeVisitsTest: function(seClient) {
		seClient = seClient || tests.seClient;
		seClient.getStoreVisits(function(err, data) { 
			var obj = JSON.parse(data);
			if(goodRes(obj) &&
				obj.data.weekly_visits)
				console.log('Store Visits Test passed.');
			else 
				console.log('Store Visits Test failed with ' + JSON.stringify(obj));
		});
	},

	storeTemplatesTest: function(seClient) {
		seClient = seClient || tests.seClient;
		seClient.getStoreTemplates(function(err, data) { 
			var obj = JSON.parse(data);
			if(goodRes(obj) &&
				obj.data.templates)
				console.log('Store Templates Test passed.');
			else 
				console.log('Store Templates Test failed with ' + JSON.stringify(obj));
		});
	},

	createStoreTemplateTest: function(seClient) {
		var testName = 'cool template',
			testContent = '<html></html>',
			foundTemplate;

		seClient = seClient || tests.seClient;
		seClient.createStoreTemplate(testName, { content: testContent },
			function(err, data) {
				if(err) {
					return console.log('Create Store Template Failed: ' + err);
				}
				seClient.getStoreTemplates(function(err, data) {
					var templates = JSON.parse(data).data.templates;
					templates.forEach(function(val) {
						if(val.name === testName) {
							foundTemplate = val;
						}
					});
					if(!foundTemplate) {
						return console.log('Create Store Template Failed, did not create template');
					}
					console.log('Create Store Template passed.');
				});
		});
	},

	ordersTest: function(seClient) {
		seClient = seClient || tests.seClient;
		seClient.getOrders(function(err, data) { 
			var obj = JSON.parse(data);
			if(goodRes(obj) &&
				obj.data.orders)
				console.log('Orders Test passed.');
			else 
				console.log('Orders Test failed with ' + JSON.stringify(obj));

			//call order test since we have some orders here
			tests.orderTest(seClient, obj.data.orders[0].id);
		});
	},

	orderTest: function(seClient, orderId) {
		if(!orderId) return;
		seClient = seClient || tests.seClient;
		seClient.getOrder(orderId, function(err, data) { 
			var obj = JSON.parse(data);
			if(goodRes(obj) &&
				obj.data.id === orderId)
				console.log('Order Test passed.');
			else 
				console.log('Order Test failed with ' + JSON.stringify(obj));

			//call order products test with our current order
			tests.orderProductsTest(seClient, orderId);
		});
	},

	orderProductsTest: function(seClient, orderId) {
		if(!orderId) return;
		seClient = seClient || tests.seClient;
		seClient.getOrderProducts(orderId, function(err, data) { 
			var obj = JSON.parse(data);
			if(goodRes(obj) &&
				obj.data.products)
				console.log('Order Products Test passed.');
			else 
				console.log('Order Products Test failed with ' + JSON.stringify(obj));
		});
	},

	productsTest: function(seClient) {
		seClient = seClient || tests.seClient;
		seClient.getProducts(function(err, data) { 
			var obj = JSON.parse(data);
			if(goodRes(obj) &&
				obj.data.products)
				console.log('Products Test passed.');
			else 
				console.log('Products Test failed with ' + JSON.stringify(obj));

			//call productTest with an id
			tests.productTest(seClient, obj.data.products[0].id);
		});
	},

	productTest: function(seClient, productId) {
		if(!productId) return;
		seClient = seClient || tests.seClient;
		seClient.getProduct(productId, function(err, data) { 
			var obj = JSON.parse(data);
			if(goodRes(obj) &&
				obj.data.id === productId)
				console.log('Product Test passed.');
			else 
				console.log('Product Test failed with ' + JSON.stringify(obj));
		});
	},

	createProductTest: function(seClient) {
		var testName = 'the ultimate beard shampoo',
			testCents = '666666',
			testStatus = 'hidden';
		seClient = seClient || tests.seClient;
		seClient.createProduct(testName, testCents, { status: testStatus },
			function(err, data) {
				var newProduct = JSON.parse(data);
				if(newProduct.data.name !== testName &&
					newProduct.data.cents !== cents) {
					console.log('Create Product Test failed with ' + JSON.stringify(newProduct));
				} else {
					seClient.deleteProduct(newProduct.data.id);
					console.log('Create Product Test passed.');
				}
		});
	},

	updateProductTest: function(seClient) {
		var testName = 'the ultimatest beard shampoo',
			testCents = '777',
			testStatus = 'hidden';
		seClient = seClient || tests.seClient;
		seClient.createProduct(testName, testCents, { status: testStatus },
			function(err, data) {
				if(err) {
					return console.log('Update Product Test failed with ' + err);
				}
				var newProduct = JSON.parse(data);
				seClient.updateProduct(newProduct.data.id, { cents: '666' }, function(err, data) {
					if(err) {
						return console.log('Update Product Test failed with ' + err);
					}
					try {
						var newProduct = JSON.parse(data);
					} catch(ex) {
						return console.log('Update Product Test failed with ' + ex);
					}
					if(newProduct.data.name !== testName &&
						newProduct.data.cents !== cents) {
						console.log('Update Product Test failed with ' + JSON.stringify(newProduct));
					} else {
						seClient.deleteProduct(newProduct.data.id);
						console.log('Update Product Test passed.');
					}
				});
		});
	},

	collectionsTest: function(seClient) {
		seClient = seClient || tests.seClient;
		seClient.getCollections(function(err, data) { 
			var obj = JSON.parse(data);
			if(goodRes(obj) &&
				obj.data.collections)
				console.log('Collections Test passed.');
			else 
				console.log('Collections Test failed with ' + JSON.stringify(obj));

			//call collectionTest with an id
			tests.collectionTest(seClient, obj.data.collections[0].id);
		});
	},

	collectionTest: function(seClient, collectionId) {
		if(!collectionId) return;
		seClient = seClient || tests.seClient;
		seClient.getCollection(collectionId, function(err, data) { 
			var obj = JSON.parse(data);
			if(goodRes(obj) &&
				obj.data.id === collectionId)
				console.log('Collection Test passed.');
			else 
				console.log('Collection Test failed with ' + JSON.stringify(obj));
		});
	},

	shippingGroupsTest: function(seClient) {
		seClient = seClient || tests.seClient;
		seClient.getShippingGroups(function(err, data) { 
			var obj = JSON.parse(data);
			if(goodRes(obj) &&
				obj.data.shipping_groups)
				console.log('Shipping Groups Test passed.');
			else 
				console.log('Shipping Groups Test failed with ' + JSON.stringify(obj));

			//call shippingGroupTest with an id
			tests.shippingGroupTest(seClient, obj.data.shipping_groups[0].id);
		});
	},

	shippingGroupTest: function(seClient, groupId) {
		if(!groupId) return;
		seClient = seClient || tests.seClient;
		seClient.getShippingGroup(groupId, function(err, data) { 
			var obj = JSON.parse(data);
			if(goodRes(obj) &&
				obj.data.id === groupId)
				console.log('Shipping Group Test passed.');
			else 
				console.log('Shipping Group Test failed with ' + JSON.stringify(obj));

			//console.log(JSON.stringify(obj));
			//need to call shippingRatesTest here since we have the id's
			tests.shippingRatesTest(seClient, groupId, 
				obj.data.shipping_rates[0].shipping_rate.shipping_class_id);
		});
	},

	shippingClassesTest: function(seClient) {
		seClient = seClient || tests.seClient;
		seClient.getShippingClasses(function(err, data) { 
			var obj = JSON.parse(data);
			if(goodRes(obj) &&
				obj.data.shipping_classes)
				console.log('Shipping Classes Test passed.');
			else 
				console.log('Shipping Classes Test failed with ' + JSON.stringify(obj));

			//call shippingClassTest with an id
			tests.shippingClassTest(seClient, obj.data.shipping_classes[0].id);
		});
	},

	shippingClassTest: function(seClient, classId) {
		if(!classId) return;
		seClient = seClient || tests.seClient;
		seClient.getShippingClass(classId, function(err, data) { 
			var obj = JSON.parse(data);
			if(goodRes(obj) &&
				obj.data.id === classId)
				console.log('Shipping Class Test passed.');
			else 
				console.log('Shipping Class Test failed with ' + JSON.stringify(obj));
		});
	},

	shippingRatesTest: function(seClient, groupId, classId) {
		if(!groupId && !classId) return;
		seClient = seClient || tests.seClient;
		seClient.getShippingRate(groupId, classId, function(err, data) { 
			var obj = JSON.parse(data);
			if(goodRes(obj) &&
				obj.data.first_item_in_cents &&
				obj.data.shipping_group_id === groupId)
				console.log('Shipping Rates Test passed.');
			else 
				console.log('Shipping Rates Test failed with ' + JSON.stringify(obj));
		});
	},

	webhooksTest: function(seClient) {
		seClient = seClient || tests.seClient;
		seClient.getWebhooks(function(err, data) { 
			var obj = JSON.parse(data);
			if(goodRes(obj) &&
				obj.data.webhooks)
				console.log('Webhooks Test passed.');
			else 
				console.log('Webhooks Test failed with ' + JSON.stringify(obj));

			//call shippingClassTest with an id
			tests.webhookTest(seClient, obj.data.webhooks[0].id);
		});
	},

	webhookTest: function(seClient, webhookId) {
		if(!webhookId) return;
		seClient = seClient || tests.seClient;
		seClient.getWebhook(webhookId, function(err, data) { 
			var obj = JSON.parse(data);
			if(goodRes(obj) &&
				obj.data.id === webhookId)
				console.log('Webhook Test passed.');
			else 
				console.log('Webhook Test failed with ' + JSON.stringify(obj));
		});
	}
};

module.exports = tests;
