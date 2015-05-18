angular.module('sailng.policy', [])

    .config(['$stateProvider', function config($stateProvider) {
        $stateProvider.state('policy', {
            url: '/policy',
            views: {
                "main": {
                    controller: 'PolicyCtrl',
                    templateUrl: 'policy/index.tpl.html'
                }
            }
        });
    }])

    .controller('PolicyCtrl', ['$scope', 'titleService', 'PostsModel', function PolicyController($scope, titleService, PostsModel) {
        titleService.setTitle('Policy');
        //getOne = function (field,value) {
        // find 1 post from cache
        PostsModel.getOne('author', 'policies').then(function (post) {
            console.log('getOne ', post)
            $scope.post = post;
        })

    }]);