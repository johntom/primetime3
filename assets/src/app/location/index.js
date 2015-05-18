angular.module('sailng.location', [])

    .config(['$stateProvider', function config($stateProvider) {
        $stateProvider.state('location', {
            url: '/location',
            views: {
                "main": {
                    controller: 'LocationCtrl',
                    templateUrl: 'location/index.tpl.html'
                }
            }
        });
    }])
// Location location LocationCtrl
    .controller('LocationCtrl', ['$scope', 'titleService', 'PostsModel', function LocationController($scope, titleService, PostsModel) {

        titleService.setTitle('Location');
        PostsModel.getOne('author', 'location').then(function (post) {
            //console.log('getOne ', post)
            $scope.post = post;
        })
    }]);