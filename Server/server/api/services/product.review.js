'use strict';

var Q = require('q');
var mongodb = require('mongodb');
var config = require('../../config/environment');
var queryHelper = require('../utilities/queryHelper');

var collection;
mongodb.MongoClient.connect(config.mongo.uri, function(err, database) {
	//todo: handle err
	collection = database.collection('products.reviews');
});

var list = function(reviewIds, qs) {
	var query = queryHelper.normalize(qs, {
		criteria: { 
			productReviewID: { $in: reviewIds }
		}
	});
	var defer = Q.defer();
	collection.find(query.criteria, query.options).toArray(function(err, reviews) {
		if (err) {
			defer.reject(err);
		}
		defer.resolve(reviews);
	});
	return defer.promise;
};

module.exports = {
	list: list
};