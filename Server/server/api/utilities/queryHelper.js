'use strict';

var _ = require('lodash');

exports.create = function(operator, selector) {
	//console.log('before => ', operator, selector);
	var defaults = {
		criteria: {},
		options: {
			skip: 0,
			limit: 10,
			sort: {},
			fields: {
				_id: 0
			},
		}
	};
	if (operator) {
		if (operator.skip) {
			defaults.options.skip = JSON.parse(operator.skip);
		}
		if (operator.limit) {
			defaults.options.limit = JSON.parse(operator.limit);
		}
		if (operator.sort) {
			_.merge(defaults.options.sort, JSON.parse(operator.sort));
		}
		if (operator.fields) {
			_.merge(defaults.options.fields, JSON.parse(operator.fields));
		}
		if (operator.query) {
			_.merge(defaults.criteria, JSON.parse(operator.query));
		}
	}
	if (selector) {
		_.merge(defaults.criteria, selector);
	}
	//console.log('after => ', defaults);
	return defaults;
};