'use strict';

var _ = require('lodash');

exports.normalize = function(query, ids) {
	if (typeof(query) === 'string') {
		query = JSON.parse(query);
	}
	var defaults = {
		criteria: {},
		options: {
			skip: 0,
			limit: 10,
			fields: {
				_id: 0
			},
		}
	};
	if (query && ids) {
		return _.merge(defaults, query, ids);
	}
	if (query) {
		return _.merge(defaults, query);
	}
	if (ids) {
		return _.merge(defaults, ids);
	}
	return defaults;
}