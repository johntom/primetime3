angular.module( 'sailng.header', [
])

.controller( 'HeaderCtrl', ['$scope', '$state', 'config',function HeaderController( $scope, $state, config ) {
    $scope.currentUser = config.currentUser;

    var navItems = [

        {title: 'Todos', translationKey: 'navigation:todos', url: '/todos', cssClass: 'fa fa-tasks fa-lg'},
        {title: 'users', translationKey: 'navigation:booking', url: '/users', cssClass: 'fa  fa-calendar fa-lg'}

    ];

    $scope.navItems = navItems;
}]);