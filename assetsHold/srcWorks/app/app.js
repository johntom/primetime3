angular.module( 'sailng', [
	'ui.router',
	'restangular',
	'ngSails',
	'angularMoment',
	'lodash',
	'angularMoment',
	'ui.bootstrap',
	'templates-app',
	'services',
	'models',
    'ngTable',
    'directive.blink',
    'sailng.header',
	'sailng.home',
	'sailng.about',
    'sailng.todos',
    'sailng.users'

	, 'directive.wallopSlider'
	, 'filters.filter'
	, 'sailng.footer'
	, 'sailng.kendocal'
	, 'sailng.upload'
	, 'sailng.posts'
	, 'sailng.policy'
	, 'sailng.terms'
	, 'sailng.contact'
	, 'sailng.gallery'
	, 'sailng.videogallery'
	, 'sailng.location'
	, 'sailng.booking'
	, 'sailng.crew'

	, 'formstamp'
	, 'ngSanitize'
	, 'angularFileUpload'
	, 'ngAnimate'
	, 'xeditable'
	, 'directive.tabsetll'

	//, 'ngRoute'
	, 'ngInputModified'
	, 'hc.marked'
	,'youtube-embed'
	, 'kendo.directives'
	,'ngMap'
	,'angularUtils.directives.dirPagination'
])




	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'RestangularProvider', function myAppConfig($stateProvider, $urlRouterProvider, $locationProvider, RestangularProvider) {
		//  RestangularProvider.setDefaultHttpFields({cache: true});
		$urlRouterProvider.otherwise(function ($injector, $location) {
		//$urlRouterProvider.otherwise(['$injector', '$location',function ($injector, $location) {

			if ($location.$$url === '/') {
				window.location = '/home';
			}
			else {
				// pass through to let the web server handle this request

				window.location = $location.$$absUrl;
			}
		});
		$locationProvider.html5Mode(true);
	}])

	.run(['editableOptions', function (editableOptions) {
		editableOptions.theme = 'bs3';
	}])
	.run(function run() {
		moment.lang('en');
	})

//
//// restangular cache
	.factory('MyRestService',['Restangular', function (Restangular) {
		return Restangular.withConfig(function (RestangularConfigurer) {
			RestangularConfigurer.setDefaultHttpFields({cache: false});
		});
	}])
	.factory('MyCachingRestService',['Restangular',  function (Restangular) {
		return Restangular.withConfig(function (RestangularConfigurer) {
			RestangularConfigurer.setDefaultHttpFields({cache: true});
		});
	}])


	.controller('AppCtrl', ['$scope', 'config', function AppCtrl($scope, config) {
	config.currentUser = window.currentUser;
}]);