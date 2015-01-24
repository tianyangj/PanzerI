angular.module('featured').controller('featuredDetailController', function($scope, $http, supersonic) {

	supersonic.ui.views.current.whenVisible(function() {
		supersonic.logger.debug("featured detail view is now visible");
		$http({
			method: 'GET',
			url: 'http://192.168.1.113:9000/api/products/' + steroids.view.params.id
		}).then(function(response) {
			supersonic.logger.log('detail success');
			$scope.product = response.data;
		}, function(err) {
			supersonic.logger.info('detail fail');
			supersonic.logger.log(err);
		});
	});

	$scope.count = 0;
	$scope.buy = function(){
		$scope.count++;
		supersonic.logger.debug($scope.product);
		supersonic.ui.animate("curlDown").perform();
		supersonic.ui.tabs.update([{},{},{},{},{badge:$scope.count+''}]);
	};
});
