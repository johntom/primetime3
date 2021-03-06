angular.module( 'services.config', ['lodash'])

.service('config',['lodash', function(lodash) {

	// private vars here if needed

	return {
		siteName: 'MEANS Seed',
		// no trailing slash!
		siteUrl: '/',
		apiUrl: '/api',
        apiUrlRestangular: 'api', // changed for restangular

		currentUser: false
	};

}]);