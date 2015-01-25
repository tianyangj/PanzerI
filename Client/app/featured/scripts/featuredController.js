angular.module('featured').controller('featuredController', function($scope, $http, supersonic) {

	$http({
		method: 'GET',
		url: 'http://192.168.1.113:9000/api/products',
		params: {
			query: { categoryID: 3 }
		}
	}).then(function(response) {
		supersonic.logger.log('data success');
		$scope.products = response.data;
	}, function(err) {
		supersonic.logger.info('data fail');
		supersonic.logger.log(err);
	});

	$scope.navigateDetail = function(product) {
		supersonic.ui.views.find('featured-detail').then(function(view) {
			supersonic.ui.layers.push(view, { 
				params: product
			});
		});
	};

});
