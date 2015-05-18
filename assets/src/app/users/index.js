angular.module('sailng.users', [
])

    .config(['$stateProvider', function config($stateProvider) {
        $stateProvider.state('users', {
            url: '/users',
            views: {
                "main": {
                    controller: 'UserCtrl',
                    templateUrl: 'users/index.tpl.html'
                }
            },
            data: { pageTitle: 'User' }
        })
            .state('users.id', {url: '/:id',
                views: {
                    'main2': {
                        templateUrl: 'users/index2.tpl.html'

                    }}
            });

    }])
//  .controller('ContractCtrl', ['$scope', '$q', '$modal', '$log', '$sails', 'lodash', 'config', 'titleService',
// 'ContractModel', '$filter', 'ngTableParams', '$location', 'WorkflowModel',
//'FilingModel', 'AfterhoursModel','ConsultingModel','SpecialModel', 'SignoffModel',function ContractController($scope, $q, $modal, $log, $sails, lodash, config,


    .controller('UserCtrl', ['$scope', '$sails', 'lodash', 'config', 'titleService', 'UserModel', '$filter', 'ngTableParams','$location',
        function UserController($scope, $sails, lodash, config, titleService, UserModel, $filter, ngTableParams,$location) {

        $scope.newUser = {};

        $scope.users = [];
        $scope.currentUser = config.currentUser;
        $scope.buttonShow=false;//true;

        $scope.destroyUser = function (user) {
            UserModel.delete(user).then(function (model) {
                // todo has been deleted, and removed from $scope.todos
                //   lodash.remove($scope.todos, {id: todo.id});
            });
        };

        $scope.createUser = function (newUser) {
            //console.log('new ', newUser)
            newUser.user = config.currentUser.id;

            UserModel.create(newUser).then(function (model) {
                $scope.newUser.title = '';
                //= {};
            });
        };


        UserModel.getAll($scope).then(function (models) {
            $scope.users = models.data;
            var data = $scope.users;
            //console.log('data ', data)
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 25,          // count per page
                sorting: {

                    title: 'asc'
                }
            }, {
                total: data.length,
                getData: function ($defer, params) {
                    var orderedData = params.sorting() ?
                        $filter('orderBy')(data, $scope.tableParams.orderBy()) :
                        data;
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        });


////////////////////////= create or edit ==========================
        $scope.editUser = function (user) {
//            POST to a URL creates a child resource at a server defined URL.
//            PUT to a URL creates/replaces the resource in its entirety at the client defined URL.

          //  $scope.buttonShow = false;
            if ((user === undefined) || (user === 0)) {
                //console.log(' editContract add mode ', user)
                $scope.user1 = {id: 0};


                UserModel.create( $scope.user1 ).then(function (model) {
                    $scope.newUser.title = '';
                });


                $location.path('/users/0');
            } else {
                //console.log(' editContract edit mode ', user)
                $scope.user1 = user;

                $location.path('/users/' + user.id);

            }
        };
            $scope.saveUser = function (user) {

              //  $scope.buttonShow = true;
                if (user === 0) {
                    $location.path('/users');
                  //  $scope.tableParams.reload();

                } else {

                    if (user.id === 0) {
                        UserModel.create(user).then(function (model) {
                        });
                    } else {

                        //console.log('update id ', user.id)
                        UserModel.update(user).then(function (model) {
                        });


                    }
//                    console.log('$location2 ')
//                    $scope.newContract.title = '';
////                    //  $scope.buttonShow = true;
                    $location.path('/users');
                }


            };

    }]);
