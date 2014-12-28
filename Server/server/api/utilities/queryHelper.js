'use strict';

var _ = require('lodash');

exports.create = function(querystring, selector) {
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
	if (querystring) {
		if (querystring.skip) {
			defaults.options.skip = Number(querystring.skip);
		}
		if (querystring.limit) {
			defaults.options.limit = Number(querystring.limit);
		}
		if (querystring.sort) {
			defaults.options.sort = JSON.parse(querystring.sort);
		}
		if (querystring.fields) {
			_.merge(defaults.options.fields, JSON.parse(querystring.fields));
		}
		if (querystring.query) {
			defaults.criteria = JSON.parse(querystring.query);
		}
	}
	if (selector) {
		defaults.criteria = selector;
	}
	return defaults;
}