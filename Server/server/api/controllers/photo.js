'use strict';

var express = require('express');
var _ = require('lodash');
var photoService = require('../services/photo');

var router = express.Router();

router.get('/', function(req, res) {
	var photoIds = [];
	if (_.isArray(req.query.ids)) {
		photoIds = req.query.ids.map(function(id) {
			return Number(id);
		});
	} else {
		photoIds.push(Number(req.query.ids));
	}
	photoService.getPhotos(photoIds).then(function(photos) {
		return res.json(200, photos);
	}, function(err) {
		return res.json(500, err);
	});
});

module.exports = router;
