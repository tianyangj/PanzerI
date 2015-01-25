angular.module('featured').controller('featuredDetailController', function($scope, $http, supersonic) {

	supersonic.ui.views.current.params.onValue(function(product){
		supersonic.logger.log('onValue')
		$scope.product = product;
		// get descriptions
		$http({
			method: 'GET',
			url: 'http://192.168.1.113:9000/api/products/' + product.productID + '/model/descriptions'
		}).then(function(response) {
			$scope.model = response.data.model;
		}, function(err) {
			supersonic.logger.log(err);
		});
		// get reviews
		$http({
			method: 'GET',
			url: 'http://192.168.1.113:9000/api/products/' + product.productID + '/reviews'
		}).then(function(response) {
			$scope.reviews = response.data.reviews;
		}, function(err) {
			supersonic.logger.log(err);
		});
	});

	supersonic.ui.views.current.whenHidden(function() {
		supersonic.logger.log('whenHidden')
		$scope.product = null;
		$scope.model = null;
		$scope.reviews = null;
	});

	$scope.count = 0;
	$scope.buy = function(){
		$scope.count++;
		supersonic.logger.debug($scope.product);
		supersonic.ui.animate("curlDown").perform();
		supersonic.ui.tabs.update([{},{},{},{},{badge:$scope.count+''}]);
		supersonic.ui.drawers.open("right").then(function() {
		  	supersonic.logger.debug("Drawer was shown");
		});
	};
});
