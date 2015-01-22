'use strict';

var Q = require('q');
var _ = require('lodash');
var mongodb = require('mongodb');
var config = require('../../config/environment');

var photosCollection;
mongodb.MongoClient.connect(config.mongo.uri, function(err, database) {
	//todo: handle err
	photosCollection = database.collection('products.photos');
});

var getPhotos = function(photoIds) {
	var defer = Q.defer();
	photosCollection.find({productPhotoID:{$in:photoIds}}).toArray(function(err, photos) {
		if (err) {
			defer.reject(err);
		}
		defer.resolve(photos);
	});
	return defer.promise;
};

module.exports = {
	getPhotos: getPhotos
};
