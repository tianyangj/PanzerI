angular.module('account').controller('signupController', function($scope, supersonic) {

	$scope.close = function() {
		supersonic.ui.modal.hide();
	};
});
