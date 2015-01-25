angular.module('account').controller('signinController', function($scope, supersonic) {

	$scope.close = function() {
		supersonic.ui.modal.hide();
	};

});
