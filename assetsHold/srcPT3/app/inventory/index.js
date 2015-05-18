angular.module( 'sailng.inventory', [])

.config(function config( $stateProvider ) {
        $stateProvider.state( 'inventory', {
            url: '/inventory',
            views: {
                "main": {
                    controller: 'InventoryCtrl',
                    templateUrl: 'inventory/index.tpl.html'
                }
            },
            data:{ pageTitle: 'Inventory' }
        }) ;
})






    .controller( 'InventoryCtrl', ['$scope', '$sails', 'lodash', 'config', 'titleService', 'InventoryModel','$filter', 'ngTableParams', function InventoryController( $scope, $sails, lodash, config, titleService, InventoryModel,$filter, ngTableParams ) {
        $scope.stats = [
            {name: 'reserved', value: 0},
            {name: 'reserved-away', value: 1},
            {name: 'reserved-back', value: 2},
            {name: 'desk available', value: 3}

        ];
       // $scope.desks = [501,502,503,504,901,902,902,904];


//        $scope.desks = [
//            {name: 'avail', value: 501},
//            {name: 'avail', value: 502},
//            {name: '503', value: 503},
//            {name: '504', value: 504},
//            {name: '505', value: 505},
//            {name: '506', value: 506},
//            {name: '507', value: 507},
//            {name: '508', value: 508},
//            {name: '509', value: 503},
//            {name: '510', value: 501},
//            {name: '511', value: 502},
//            {name: '512', value: 503},
//            {name: '513', value: 501},
//            {name: '514', value: 502},
//            {name: '515', value: 503},
//            {name: '901', value: 501},
//            {name: '902', value: 502},
//            {name: '903', value: 503},
//            {name: '904', value: 501},
//            {name: '905', value: 502},
//            {name: '906', value: 503},
//            {name: '907', value: 501},
//            {name: '908', value: 502},
//            {name: '909', value: 503},
//            {name: '910', value: 501},
//            {name: '911', value: 502},
//            {name: '912', value: 503},
//            {name: '913', value: 501},
//            {name: '914', value: 502},
//            {name: '915', value: 503},
//
//        ];
        InventoryModel.getAll($scope).then(function(models) {
            $scope.desks = models.data;
            console.log(  $scope.desks )

        });







    }]);
