'use strict';

var _ = require('lodash');

exports.get = function(query) {
	return _.merge({
		conditions: {},
		fields: {},
		options: {
			skip: 0,
			limit: 10
		}
	}, JSON.parse(query));
}