'use strict';

var express = require('express');
var Product = require('../models/product');

var router = express.Router();

var controller = {};

controller.list = function(req, res) {
	Product.find(function(err, products) {
		return res.json(200, products);
	});
};

controller.read = function(req, res) {
	Product.findById(req.params.id, function(err, product) {
		if (!product) {
			return res.send(404);
		}
		return res.json(200, product);
	});
};

router.get('/', controller.list);
router.get('/:id', controller.read);

module.exports = router;