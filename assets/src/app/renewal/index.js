angular.module( 'sailng.renewal', [
])

//.config(function config( $stateProvider ) {
    .config( ['$stateProvider',function config( $stateProvider ) {

        $stateProvider.state( 'renewal', {
		url: '/renewal',
		views: {
			"main": {
				controller: 'RenewalCtrl',
				templateUrl: 'renewal/index.tpl.html'
			}
		},
		data:{ pageTitle: 'Renewal' }
	});
}])

// mandrill: primetime3@optonline.net  pw:@)buBBaLevi12

    .controller( 'RenewalCtrl',['$scope', '$sails', 'lodash', 'config', 'titleService', 'MandrillModel','$filter', 'ngTableParams','$location', function TodoController( $scope, $sails, lodash, config, titleService, MandrillModel,$filter, ngTableParams,$location ) {

        //$scope.newTodo = {};

        $scope.sform = {};
        $scope.sform.group=0;


        $scope.stats = [
            {name: 'null', value: 0},
            {name: 'open', value: 1},
            {name: 'InProgress', value: 2},
            {name: 'AlmostComplete', value: 3},
            {name: 'finished', value: 4},
            {name: 'canceled', value: 5}

        ];
        MandrillModel.findTemplates().then(function (res) {
            //Dentoff.findSpacial({ZipCode: $scope.zip, maxDistance: $scope.maxDistance, FirstName: $scope.first, LastName: $scope.last, OfficeName: $scope.practice, Special1: $scope.specialty, startpos: $scope.startpos, requireCount: $scope.requireCount}, function (res) {
            $scope.templates = res;
        })
        $scope.createEmails = function () {
           // alert ($scope.sform.month.value)
            MandrillModel.renewalmonth().then(function (res) {
                $scope.dailies= res.data;

            })
        };

        $scope.findTemplates = function () {

            MandrillModel.findTemplates($scope.sform).then(function (res) {
                //Dentoff.findSpacial({ZipCode: $scope.zip, maxDistance: $scope.maxDistance, FirstName: $scope.first, LastName: $scope.last, OfficeName: $scope.practice, Special1: $scope.specialty, startpos: $scope.startpos, requireCount: $scope.requireCount}, function (res) {
                $scope.templates = res;
            })

        };

    }]);

