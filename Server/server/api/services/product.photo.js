'use strict';

var Q = require('q');
var mongodb = require('mongodb');
var config = require('../../config/environment');
var queryHelper = require('../utilities/queryHelper');

var collection;
mongodb.MongoClient.connect(config.mongo.uri, function(err, database) {
	//todo: handle err
	collection = database.collection('products.photos');
});

var list = function(photoIds, qs) {
	var query = queryHelper.normalize(qs, {
		criteria: { 
			productPhotoID: { $in: photoIds }
		}
	});
	var defer = Q.defer();
	collection.find(query.criteria, query.options).toArray(function(err, photos) {
		if (err) {
			defer.reject(err);
		}
		defer.resolve(photos);
	});
	return defer.promise;
};

module.exports = {
	list: list
};