'use strict';

var _ = require('lodash');

exports.get = function(query) {
	var defaults = {
		conditions: {},
		fields: {
			_id: 0
		},
		options: {
			skip: 0,
			limit: 10
		}
	};
	if (query) {
		return _.merge(defaults, JSON.parse(query));
	}
	return defaults;
}