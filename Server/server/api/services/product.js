'use strict';

var Q = require('q');
var _ = require('lodash');
var mongodb = require('mongodb');
var config = require('../../config/environment');
var queryHelper = require('../utilities/queryHelper');

var productsCollection;
var productsReviewsCollection;
var productsPhotosCollection;
var productsModelsCollection;
var productsModelsDescriptionsCollection;
var productsModelsIllustrationsCollection;
mongodb.MongoClient.connect(config.mongo.uri, function(err, database) {
	//todo: handle err
	productsCollection = database.collection('products');
	productsReviewsCollection = database.collection('products.reviews');
	productsPhotosCollection = database.collection('products.photos');
	productsModelsCollection = database.collection('products.models');
	productsModelsDescriptionsCollection = database.collection('products.models.descriptions');
	productsModelsIllustrationsCollection = database.collection('products.models.illustrations');
});

var getProducts = function(querystring) {
	var query = queryHelper.create(querystring);
	var defer = Q.defer();
	productsCollection.find(query.criteria, query.options).toArray(function(err, products) {
		if (err) {
			defer.reject(err);
		}
		defer.resolve(products);
	});
	return defer.promise;
};

var getProduct = function(productId, querystring) {
	var query = queryHelper.create(querystring, { productID: productId });
	var defer = Q.defer();
	productsCollection.findOne(query.criteria, query.options, function(err, product) {
		if (err) {
			defer.reject(err);
		}
		defer.resolve(product);
	});
	return defer.promise;
};

var getProductReviews = function(productId, querystring) {
	var defer = Q.defer();
	getProduct(productId).then(function(product) {
		var reviewIds = product.reviews.map(function(review) {
			return review.reviewID;
		});
		var query = queryHelper.create(querystring, { productReviewID: { $in: reviewIds } });
		productsReviewsCollection.find(query.criteria, query.options).toArray(function(err, reviews) {
			if (err) {
				defer.reject(err);
			}
			product.reviews.forEach(function(review, index) {
				_.merge(review, reviews[index]);
			});
			defer.resolve(product);
		});
	});
	return defer.promise;
};

var getProductPhotos = function(productId, querystring) {
	var defer = Q.defer();
	getProduct(productId).then(function(product) {
		var photoIds = product.photos.map(function(photo) {
			return photo.photoID;
		});
		var query = queryHelper.create(querystring, { productPhotoID: { $in: photoIds } });
		productsPhotosCollection.find(query.criteria, query.options).toArray(function(err, photos) {
			if (err) {
				defer.reject(err);
			}
			product.photos.forEach(function(photo, index) {
				_.merge(photo, photos[index]);
			});
			defer.resolve(product);
		});
	});
	return defer.promise;
};

var getProductModel = function(productId, querystring) {
	var defer = Q.defer();
	getProduct(productId).then(function(product) {
		var query = queryHelper.create(querystring, { productModelID: product.productModelID });
		productsModelsCollection.findOne(query.criteria, query.options, function(err, model) {
			if (err) {
				defer.reject(err);
			}
			product.model = model;
			defer.resolve(product);
		});
	});
	return defer.promise;
};

var getProductModelDescriptions = function(productId, querystring) {
	var defer = Q.defer();
	getProductModel(productId).then(function(product) {
		var query = queryHelper.create(querystring, { productModelID: product.model.productModelID });
		productsModelsDescriptionsCollection.find(query.criteria, query.options).toArray(function(err, descriptions) {
			if (err) {
				defer.reject(err);
			}
			product.model.descriptions = descriptions;
			defer.resolve(product);
		});
	});
	return defer.promise;
};

var getProductModelIllustrations = function(productId, querystring) {
	var defer = Q.defer();
	getProductModel(productId).then(function(product) {
		var illustrationIds = product.model.illustrations.map(function(illustration) {
			return illustration.illustrationID;
		});
		var query = queryHelper.create(querystring, { illustrationID: { $in: illustrationIds } });
		productsModelsIllustrationsCollection.find(query.criteria, query.options).toArray(function(err, illustrations) {
			if (err) {
				defer.reject(err);
			}
			product.model.illustrations = illustrations;
			defer.resolve(product);
		});
	});
	return defer.promise;
};

module.exports = {
	getProducts: getProducts,
	getProduct: getProduct,
	getProductReviews: getProductReviews,
	getProductPhotos: getProductPhotos,
	getProductModel: getProductModel,
	getProductModelDescriptions: getProductModelDescriptions,
	getProductModelIllustrations: getProductModelIllustrations
};