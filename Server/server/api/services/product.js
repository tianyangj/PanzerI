'use strict';

var Q = require('q');
var mongodb = require('mongodb');
var config = require('../../config/environment');
var queryHelper = require('../utilities/queryHelper');

var collection;
mongodb.MongoClient.connect(config.mongo.uri, function(err, database) {
	//todo: handle err
	collection = database.collection('products');
});

var list = function(qs) {
	var query = queryHelper.normalize(qs);
	var defer = Q.defer();
	collection.find(query.criteria, query.options).toArray(function(err, products) {
		if (err) {
			defer.reject(err);
		}
		defer.resolve(products);
	});
	return defer.promise;
};

var read = function(productId, qs) {
	var query = queryHelper.normalize(qs, {
		criteria: { 
			productID: Number(productId) 
		}
	});
	var defer = Q.defer();
	collection.findOne(query.criteria, query.options, function(err, product) {
		if (err) {
			defer.reject(err);
		}
		defer.resolve(product);
	});
	return defer.promise;
};

module.exports = {
	list: list,
	read: read
};