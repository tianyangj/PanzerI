angular.module('account').controller('signinController', function($scope, $auth, supersonic) {

	$scope.close = function() {
		supersonic.ui.modal.hide();
	};

	$scope.authenticate = function(provider) {
		supersonic.logger.log(provider);
		$auth.authenticate(provider).then(function(response) {
			supersonic.logger.log('signed in');
		}, function(err) {
			supersonic.logger.log('auth.authenticate failed');
		});
	};

});
