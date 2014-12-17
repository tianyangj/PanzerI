'use strict';

var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  	productCode: String,
  	productName: String,
  	productLine: String,
  	productScale: String,
  	productVendor: String,
  	productDescription: String,
  	quantityInStock: Number,
  	buyPrice: Number,
  	MSRP: Number
});

module.exports = mongoose.model('Product', ProductSchema);