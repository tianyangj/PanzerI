angular.module('account').controller('accountController', function($scope, supersonic) {

	$scope.signin = function() {
		supersonic.ui.views.find('modal-signin').then(function(view) {
			supersonic.ui.modal.show(view);
		});
	};

	$scope.signup = function() {
		supersonic.ui.views.find('modal-signup').then(function(view) {
			supersonic.ui.modal.show(view);
		});
	};
});
