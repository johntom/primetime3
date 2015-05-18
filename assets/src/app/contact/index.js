angular.module('sailng.contact', [])

    .config(['$stateProvider', function config($stateProvider) {
        $stateProvider.state('contact', {
            url: '/contact',
            views: {
                "main": {
                    controller: 'ContactCtrl',
                    templateUrl: 'contact/index.tpl.html'
                }
            }
        });
    }])
// Contact
    .controller('ContactCtrl', ['$scope', 'titleService', 'PostsModel', function ContactController($scope, titleService, PostsModel) {

        titleService.setTitle('Contact');
        PostsModel.getOne('author', 'contact').then(function (post) {
            //console.log('getOne ', post)
            $scope.post = post;
        })
    }]);