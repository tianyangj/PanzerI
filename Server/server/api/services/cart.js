'use strict';

var Q = require('q');
var _ = require('lodash');
var mongodb = require('mongodb');
var config = require('../../config/environment');
var queryHelper = require('../utilities/queryHelper');

var cartsCollection;
mongodb.MongoClient.connect(config.mongo.uri, function(err, database) {
	cartsCollection = database.collection('carts');
});

var retrieve = function(cartId) {
	var defer = Q.defer();
	cartsCollection.find({ shoppingCartID: cartId }).toArray(function(err, cartItems) {
		if (err) {
			defer.reject(err);
		}
		defer.resolve(cartItems);
	});
	return defer.promise;
};

var create = function(cartId, cartItem) {
	if (_.isUndefined(cartItem)) {
		return Q.reject('cartItem not defined');
	}
	if (!_.isNumber(cartItem.quantity)) {
		return Q.reject('cartItem.quantity not number');
	}
	if (!_.isNumber(cartItem.productID)) {
		return Q.reject('cartItem.productID not number');
	}
	cartItem.shoppingCartID = cartId;
	cartItem.dateCreated = new Date();
	var defer = Q.defer();
	cartsCollection.insertOne(cartItem, function(err, result) {
		if (err) {
			defer.reject(err);
		}
		defer.resolve(result);
	});
	return defer.promise;
};

var update = function(cartId, cartItem) {
	if (_.isUndefined(cartItem)) {
		return Q.reject('cartItem not defined');
	}
	if (_.isNull(cartItem._id)) {
		return Q.reject('cartItem._id not null');
	}
	if (!_.isNumber(cartItem.quantity)) {
		return Q.reject('cartItem.quantity not number');
	}
	var defer = Q.defer();
	cartsCollection.findAndModify({_id:mongodb.ObjectID(cartItem._id)}, null, {$set:{quantity:cartItem.quantity}}, function(err, cartItem) {
		if (err) {
			defer.reject(err);
		}
		defer.resolve(cartItem);
	});
	return defer.promise;
};

var remove = function(cartId, cartItemId) {
	var defer = Q.defer();
	cartsCollection.findAndRemove({_id:mongodb.ObjectID(cartItemId)}, function(err, cartItem) {
		if (err) {
			defer.reject(err);
		}
		defer.resolve(cartItem);
	});
	return defer.promise;
};

module.exports = {
	create: create,
	retrieve: retrieve,
	update: update,
	remove: remove
};