angular.module('sailng.terms', [])

    .config(['$stateProvider', function config($stateProvider) {
        $stateProvider.state('terms', {
            url: '/terms',
            views: {
                "main": {
                    controller: 'TermsCtrl',
                    templateUrl: 'policy/index.tpl.html'
                }
            }
        });
    }])

    .controller('TermsCtrl', ['$scope', 'titleService', 'PostsModel', function TermsController($scope, titleService, PostsModel) {
        titleService.setTitle('Policy');
        //getOne = function (field,value) {
        // find 1 post from cache
        PostsModel.getOne('author', 'terms').then(function (post) {
            console.log('getOne ', post)
            $scope.post = post;
        })

    }]);