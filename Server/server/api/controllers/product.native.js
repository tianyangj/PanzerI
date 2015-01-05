'use strict';

var _ = require('lodash');
var express = require('express');
var productService = require('../services/product');
var productPhotoService = require('../services/product.photo');
var productReviewService = require('../services/product.review');
var productModelService = require('../services/product.model');

var router = express.Router();

var list = function(req, res) {
	productService.list(req.query).then(function(products) {
		return res.json(200, products);
	}, function(err) {
		return res.json(500, err);
	});
};

var read = function(req, res) {
	productService.read(req.params.id, req.query).then(function(product) {
		if (!product) {
			return res.send(404);
		}
		return res.json(200, product);
	}, function(err) {
		return res.json(500, err);
	});
};

var reviews = function(req, res) {
	productService.read(req.params.id).then(function(product) {
		if (!product) {
			return res.send(404);
		}
		return product;
	}).then(function(product) {
		var reviewIds = product.reviews.map(function(review) {
			return review.reviewID;
		});
		productReviewService.list(reviewIds, req.query).then(function(reviews) {
			product.reviews.forEach(function(review, index) {
				_.merge(review, reviews[index]);
			});
			return res.json(200, product);
		});
	});
};

var photos = function(req, res) {
	productService.read(req.params.id).then(function(product) {
		if (!product) {
			return res.send(404);
		}
		return product;
	}).then(function(product) {
		var photoIds = product.photos.map(function(photo) {
			return photo.photoID;
		});
		productPhotoService.list(photoIds, req.query).then(function(photos) {
			product.photos.forEach(function(photo, index) {
				_.merge(photo, photos[index]);
			});
			return res.json(200, product);
		});
	});
};

var model = function(req, res) {
	productService.read(req.params.id).then(function(product) {
		if (!product) {
			return res.send(404);
		}
		return product;
	}).then(function(product) {
		productModelService.read(product.productModelID, req.query).then(function(model) {
			product.model = model;
			return res.json(200, product);
		});
	});
};

var descriptions = function(req, res) {
	productService.read(req.params.id).then(function(product) {
		if (!product) {
			return res.send(404);
		}
		return product;
	}).then(function(product) {
		productModelService.readDescriptions(product.productModelID, req.query).then(function(model) {
			product.model = model;
			return res.json(200, product);
		});
	});
}

var illustrations = function(req, res) {
	productService.read(req.params.id).then(function(product) {
		if (!product) {
			return res.send(404);
		}
		return product;
	}).then(function(product) {
		productModelService.readIllustrations(product.productModelID, req.query).then(function(model) {
			product.model = model;
			return res.json(200, product);
		});
	});
}

router.get('/', list);
router.get('/:id', read);
router.get('/:id/reviews', reviews);
router.get('/:id/photos', photos);
router.get('/:id/model', model);
router.get('/:id/model/descriptions', descriptions);
router.get('/:id/model/illustrations', illustrations);

module.exports = router;