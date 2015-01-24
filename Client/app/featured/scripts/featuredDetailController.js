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
});
