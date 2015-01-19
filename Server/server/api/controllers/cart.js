'use strict';

var express = require('express');
var cartService = require('../services/cart');

var router = express.Router();

router.get('/:id', function(req, res) {
	cartService.retrieve(req.params.id).then(function(cartItems) {
		if (!cartItems.length) {
			return res.send(404);
		}
		return res.json(200, cartItems);
	}, function(err) {
		return res.json(500, err);
	});
});

router.post('/:id', function(req, res) {
	cartService.create(req.params.id, req.body.cartItem).then(function() {
		return res.json(201);
	}, function(err) {
		return res.json(500, err);
	});
});

router.put('/:id', function(req, res) {
	cartService.update(req.params.id, req.body.cartItem).then(function() {
		return res.json(200);
	}, function(err) {
		return res.json(500, err);
	});
});

router.delete('/:id', function(req, res) {
	cartService.remove(req.params.id, req.query.cartItemId).then(function() {
		return res.json(200);
	}, function(err) {
		return res.json(500, err);
	});
});

module.exports = router;