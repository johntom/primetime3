angular.module('sailng.about', [])

	.config(['$stateProvider', function config($stateProvider) {
		$stateProvider.state('about', {
			url: '/about',
			views: {
				"main": {
					controller: 'AboutCtrl',
					templateUrl: 'about/index.tpl.html'
				}
			}
		});
	}])

	.controller('AboutCtrl', ['$scope', 'titleService',  'PostsModel', 'lodash','$location', function AboutController($scope, titleService,  PostsModel,lodash,  $location) {
		titleService.setTitle('About');
		PostsModel.getOne('author', 'about').then(function (post) {
			//console.log('getOne ', post)
			$scope.post = post;
		})
		$scope.form = {};
		$scope.form.filer1 = true;
		$scope.form.filer2 = true;


	}]);
