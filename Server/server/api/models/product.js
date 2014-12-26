'use strict';

var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  	productID: Number,
  	name: String,
  	productNumber: String,
  	makeFlag: Boolean,
  	finishedGoodsFlag: Boolean,
  	color: String,
  	safetyStockLevel: Number,
  	reorderPoint: Number,
  	standardCost: Number,
  	listPrice: Number,
  	size: String,
  	sizeUnitMeasureCode: String,
  	weightUnitMeasureCode: String,
  	weight: Number,
  	daysToManufacture: Number,
  	productLine: String,
  	class: String,
  	style: String,
  	productSubcategoryID: Number,
  	productModelID: Number,
  	sellStartDate: Date,
  	sellEndDate: Date,
  	discontinuedDate: Date,
  	reviews: [],
  	photos: []
}, {
	collection: 'products'
});

module.exports = mongoose.model('Product', ProductSchema);