'use strict';

var express = require('express');
var _ = require('lodash');
var Product = require('../models/product');
var ProductReview = require('../models/product.review');
var ProductPhoto = require('../models/product.photo');
var qsParser = require('../utilities/qsParser');

var router = express.Router();

var list = function(req, res) {
	var qs = qsParser.get(req.query.query);
	console.log(qs);
	Product.find(qs.conditions, qs.fields, qs.options, function(err, products) {
		return res.json(200, products);
	});
};

var read = function(req, res) {
	Product.findOne({ productID: Number(req.params.id) }, function(err, product) {
		if (!product) {
			return res.send(404);
		}
		return res.json(200, product);
	});
};

var reviews = function(req, res) {
	Product.findOne({ productID: Number(req.params.id) }, function(err, product) {
		if (!product) {
			return res.send(404);
		}
		var reviewIds = product.reviews.map(function(review) {
			return review.reviewID;
		});
		ProductReview.find({productReviewID: {$in: reviewIds}}, function(err, reviews){
			product.reviews = reviews;
			return res.json(200, product);
		});
	});
};

var photos = function(req, res) {
	Product.findOne({ productID: Number(req.params.id) }, function(err, product) {
		if (!product) {
			return res.send(404);
		}
		var photoIds = product.photos.map(function(photo) {
			return photo.photoID;
		});
		ProductPhoto.find({productPhotoID: {$in: photoIds}}, function(err, photos){
			product.photos = photos;
			return res.json(200, product);
		});
	});
};

router.get('/', list);
router.get('/:id', read);
router.get('/:id/reviews', reviews);
router.get('/:id/photos', photos);

module.exports = router;