'use strict';

var Q = require('q');
var mongodb = require('mongodb');
var config = require('../../config/environment');
var queryHelper = require('../utilities/queryHelper');

var collection;
var collectionDescription;
var collectionIllustration;
mongodb.MongoClient.connect(config.mongo.uri, function(err, database) {
	//todo: handle err
	collection = database.collection('products.models');
	collectionDescription = database.collection('products.models.descriptions');
	collectionIllustration = database.collection('products.models.illustrations');
});

var read = function(modelId, querystring) {
	var query = queryHelper.create(querystring, { productModelID: Number(modelId) });
	var defer = Q.defer();
	collection.findOne(query.criteria, query.options, function(err, model) {
		if (err) {
			defer.reject(err);
		}
		defer.resolve(model);
	});
	return defer.promise;
};

var readDescriptions = function(modelId, querystring) {
	var defer = Q.defer();
	read(modelId).then(function(model) {
		var query = queryHelper.create(querystring, { productModelID: Number(modelId) });
		console.log(querystring, query)
		collectionDescription.find(query.criteria, query.options).toArray(function(err, descriptions) {
			model.descriptions = descriptions;
			defer.resolve(model);
		});
	});
	return defer.promise;
}

var readIllustrations = function(modelId, querystring) {
	console.log(modelId)
	var defer = Q.defer();
	read(modelId).then(function(model) {
		var illustrationIds = model.illustrations.map(function(illustration) {
			return illustration.illustrationID;
		});
		var query = queryHelper.create(querystring, { illustrationID: { $in: illustrationIds } });
		collectionIllustration.find(query.criteria, query.options).toArray(function(err, illustrations) {
			model.illustrations = illustrations;
			defer.resolve(model);
		});
	})
	return defer.promise;
}

module.exports = {
	read: read,
	readDescriptions: readDescriptions,
	readIllustrations: readIllustrations
};