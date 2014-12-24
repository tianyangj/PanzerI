'use strict';

var express = require('express');
var Product = require('../models/product');
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
	Product.findById(req.params.id, function(err, product) {
		if (!product) {
			return res.send(404);
		}
		return res.json(200, product);
	});
};

router.get('/', list);
router.get('/:id', read);

module.exports = router;