'use strict';

var mongoose = require('mongoose');

var ProductReviewSchema = new mongoose.Schema({
	productReviewID: Number,
	productID: Number,
	reviewerName: String,
	reviewDate: Date,
	emailAddress: String,
	rating: Number,
	comments: String
}, {
	collection: 'products.reviews'
});

module.exports = mongoose.model('ProductReview', ProductReviewSchema);