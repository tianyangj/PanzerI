'use strict';

var express = require('express');
var productService = require('../services/product');

var getProduct = function(req, res, edge) {
	var promise = (function() {
		var productId = Number(req.params.id);
		switch(edge) {
			case 'reviews':
				return productService.getProductReviews(productId, req.query);
			case 'photos':
				return productService.getProductPhotos(productId, req.query);
			case 'documents':
				return productService.getProductDocuments(productId, req.query);
			case 'model':
				return productService.getProductModel(productId, req.query);
			case 'descriptions':
				return productService.getProductModelDescriptions(productId, req.query);
			case 'illustrations':
				return productService.getProductModelIllustrations(productId, req.query);
			default:
				return productService.getProduct(productId, req.query);
		}
	})();
	promise.then(function(product) {
		if (!product) {
			return res.send(404);
		}
		return res.json(200, product);
	}, function(err) {
		return res.json(500, err);
	});
};

var router = express.Router();

router.get('/', function(req, res) {
	productService.getProducts(req.query).then(function(products) {
		return res.json(200, products);
	}, function(err) {
		return res.json(500, err);
	});
});

router.get('/:id', function(req, res) {
	getProduct(req, res);
});

router.get('/:id/reviews', function(req, res) {
	getProduct(req, res, 'reviews'); 
});

router.get('/:id/photos', function(req, res) {
	getProduct(req, res, 'photos'); 
});

router.get('/:id/documents', function(req, res) {
	getProduct(req, res, 'documents');
});

router.get('/:id/model', function(req, res) {
	getProduct(req, res, 'model'); 
});

router.get('/:id/model/descriptions', function(req, res) {
	getProduct(req, res, 'descriptions'); 
});

router.get('/:id/model/illustrations', function(req, res) {
	getProduct(req, res, 'illustrations'); 
});

module.exports = router;