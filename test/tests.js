
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
		seClient.getUserInfo(function(data) { 
			var obj = JSON.parse(data);
			if(!obj.error && 
				obj.meta.code === 200 &&
				obj.data.id)
				console.log('User Info Test passed.');
			else 
				console.log('User Info Test failed with ' + JSON.stringify(obj));
		});
	},

	storeInfoTest: function(seClient) {
		seClient = seClient || tests.seClient;
		seClient.getStoreInfo(function(data) { 
			var obj = JSON.parse(data);
			if(!obj.error && 
				obj.meta.code === 200 &&
				obj.data.name &&
				obj.data.url)
				console.log('Store Info Test passed.');
			else 
				console.log('Store Info Test failed with ' + JSON.stringify(obj));
		});
	},

	storeVisitsTest: function(seClient) {
		seClient = seClient || tests.seClient;
		seClient.getStoreVisits(function(data) { 
			var obj = JSON.parse(data);
			if(!obj.error && 
				obj.meta.code === 200 &&
				obj.data.weekly_visits)
				console.log('Store Visits Test passed.');
			else 
				console.log('Store Visits Test failed with ' + JSON.stringify(obj));
		});
	},

	storeTemplatesTest: function(seClient) {
		seClient = seClient || tests.seClient;
		seClient.getStoreTemplates(function(data) { 
			var obj = JSON.parse(data);
			if(!obj.error && 
				obj.meta.code === 200 &&
				obj.data.templates)
				console.log('Store Templates Test passed.');
			else 
				console.log('Store Templates Test failed with ' + JSON.stringify(obj));
		});
	},

	ordersTest: function(seClient) {
		seClient = seClient || tests.seClient;
		seClient.getOrders(function(data) { 
			var obj = JSON.parse(data);
			if(!obj.error && 
				obj.meta.code === 200 &&
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
		seClient.getOrder(orderId, function(data) { 
			var obj = JSON.parse(data);
			if(!obj.error && 
				obj.meta.code === 200 &&
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
		seClient.getOrderProducts(orderId, function(data) { 
			var obj = JSON.parse(data);
			if(!obj.error && 
				obj.meta.code === 200 &&
				obj.data.products)
				console.log('Order Products Test passed.');
			else 
				console.log('Order Products Test failed with ' + JSON.stringify(obj));
		});
	},

	productsTest: function(seClient) {
		seClient = seClient || tests.seClient;
		seClient.getProducts(function(data) { 
			var obj = JSON.parse(data);
			if(!obj.error && 
				obj.meta.code === 200 &&
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
		seClient.getProduct(productId, function(data) { 
			var obj = JSON.parse(data);
			if(!obj.error && 
				obj.meta.code === 200 &&
				obj.data.id === productId)
				console.log('Product Test passed.');
			else 
				console.log('Product Test failed with ' + JSON.stringify(obj));
		});
	},

	collectionsTest: function(seClient) {
		seClient = seClient || tests.seClient;
		seClient.getCollections(function(data) { 
			var obj = JSON.parse(data);
			if(!obj.error && 
				obj.meta.code === 200 &&
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
		seClient.getCollection(collectionId, function(data) { 
			var obj = JSON.parse(data);
			if(!obj.error && 
				obj.meta.code === 200 &&
				obj.data.id === collectionId)
				console.log('Collection Test passed.');
			else 
				console.log('Collection Test failed with ' + JSON.stringify(obj));
		});
	},

	shippingGroupsTest: function(seClient) {
		seClient = seClient || tests.seClient;
		seClient.getShippingGroups(function(data) { 
			var obj = JSON.parse(data);
			if(!obj.error && 
				obj.meta.code === 200 &&
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
		seClient.getShippingGroup(groupId, function(data) { 
			var obj = JSON.parse(data);
			if(!obj.error && 
				obj.meta.code === 200 &&
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
		seClient.getShippingClasses(function(data) { 
			var obj = JSON.parse(data);
			if(!obj.error && 
				obj.meta.code === 200 &&
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
		seClient.getShippingClass(classId, function(data) { 
			var obj = JSON.parse(data);
			if(!obj.error && 
				obj.meta.code === 200 &&
				obj.data.id === classId)
				console.log('Shipping Class Test passed.');
			else 
				console.log('Shipping Class Test failed with ' + JSON.stringify(obj));
		});
	},

	shippingRatesTest: function(seClient, groupId, classId) {
		if(!groupId && !classId) return;
		seClient = seClient || tests.seClient;
		seClient.getShippingRate(groupId, classId, function(data) { 
			var obj = JSON.parse(data);
			if(!obj.error && 
				obj.meta.code === 200 &&
				obj.data.first_item_in_cents &&
				obj.data.shipping_group_id === groupId)
				console.log('Shipping Rates Test passed.');
			else 
				console.log('Shipping Rates Test failed with ' + JSON.stringify(obj));
		});
	},

	webhooksTest: function(seClient) {
		seClient = seClient || tests.seClient;
		seClient.getWebhooks(function(data) { 
			var obj = JSON.parse(data);
			if(!obj.error && 
				obj.meta.code === 200 &&
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
		seClient.getWebhook(webhookId, function(data) { 
			var obj = JSON.parse(data);
			if(!obj.error && 
				obj.meta.code === 200 &&
				obj.data.id === webhookId)
				console.log('Webhook Test passed.');
			else 
				console.log('Webhook Test failed with ' + JSON.stringify(obj));
		});
	}
};

module.exports = tests;
