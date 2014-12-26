'use strict';

var mongoose = require('mongoose');

var ProductPhotoSchema = new mongoose.Schema({
	productPhotoID: Number,
	thumbnailPhotoFileName: String,
	largePhotoFileName: String
}, {
	collection: 'products.photos'
});

module.exports = mongoose.model('ProductPhoto', ProductPhotoSchema);