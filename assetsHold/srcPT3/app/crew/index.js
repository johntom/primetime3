angular.module('sailng.crew', [])

    //.config(['$stateProvider', function config($stateProvider) {
    //    $stateProvider.state('crew', {
    //        url: '/crew',
    //        views: {
    //            "main": {
    //                controller: 'CrewCtrl',
    //                templateUrl: 'crew/index.tpl.html'
    //            }
    //        }
    //    })   .state('crew.id', {url: '/:id',
    //        views: {
    //            'main': {
    //                templateUrl: ''crew/index.tpl.html'
    //
    //            }}
    //    });
    //
    //}])
    .config(['$stateProvider', function config($stateProvider) {

        $stateProvider.state('crew', {
            url: '/crew/:id',

            views: {
                "main": {
                    controller: 'CrewCtrl',
                    templateUrl: 'crew/index.tpl.html'
                }
            },
            data: {pageTitle: 'crew'}

        })


    }])

       .controller('CrewCtrl', ['$scope', 'titleService', 'PostsModel', 'lodash','$location','$q', 'titleService', '$stateParams',
        function CrewController($scope, titleService,  PostsModel,lodash,$location,$ql, titleService,$stateParams) {

                  $scope.param = $stateParams;
             // $scope.state = $state.current;
              console.log(' $scope.state  ',$scope.param.id );
       // console.log(' $scope.param  ',$scope.param );
       // console.log(' .$location  ',  $location.search());//;

        titleService.setTitle($scope.param.id);//'Crew');
        //fishingtrips  crew
        PostsModel.getOne('author', $scope.param.id).then(function (post) {
            console.log('getOne ', post)
            $scope.post = post;
        })
    }]);