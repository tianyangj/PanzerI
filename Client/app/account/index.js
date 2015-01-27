angular.module('account', ['supersonic', 'satellizer'])
	.config(function($authProvider) {

		$authProvider.facebook({
			clientId: '139356541211',
			url: 'http://192.168.1.113:9000/auth/facebook'
		});

	});
