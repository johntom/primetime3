angular.module( 'sailng.header', [
])

//.controller( 'HeaderCtrl', ['$scope', '$state', 'config', 'offCanvas',  function HeaderController( $scope, $state, config ,offCanvas) {
.controller( 'HeaderCtrl', ['$scope', '$state', 'config',   function HeaderController( $scope, $state, config ) {


    $scope.currentUser = config.currentUser;
        //<li class="dropdown" dropdown><a href="#" class="dropdown-toggle" dropdown-toggle data-toggle="dropdown">
        //<b
        //class="caret"></b></a>
        //
        //<ul class="dropdown-menu">
        //<li><a href="/booking"><span class="fa fa-question"></span> Booking Calandar</a></li>
        //<li><a href="/gallery"><span class="fa fa-question"></span> Gallery</a></li>
        //<li><a href="/crew"><span class="fa fa-question"></span> Crew</a></li>
        //<li><a href="/location"><span class="fa fa-question"></span> Location</a></li>
        //<li><a href="/about"><span class="fa fa-question"></span> About</a></li>
        //</ul>
        //</li>

        // this is admin menu
    var navItems = [

        {title: 'Upload', translationKey: 'navigation:upload', url: '/upload', cssClass: 'fa fa-tasks fa-lg'},
        {title: 'Posts', translationKey: 'navigation:posts', url: '/posts', cssClass: 'fa fa-tasks fa-lg'},
        {title: 'Booking', translationKey: 'navigation:booking', url: '/booking', cssClass: 'fa  fa-calendar fa-lg'},
        {title: 'EmailRenewal', translationKey: 'navigation:renewal', url: '/renewal', cssClass: 'fa fa-tasks fa-lg'},

        {title: 'BookingAdminCal', translationKey: 'navigation:kendocal', url: '/kendocal', cssClass: 'fa  fa-calendar fa-lg'}



        //{title: 'Inventory', translationKey: 'navigation:inventory', url: '/inventory', cssClass: 'fa fa-tasks fa-lg'}





       //{title: 'Todos', translationKey: 'navigation:todos', url: '/todos', cssClass: 'fa fa-tasks fa-lg'},
        //{title: 'Upload', translationKey: 'navigation:upload', url: '/upload', cssClass: 'fa fa-tasks fa-lg'},
        //{title: 'Workflow', translationKey: 'navigation:workflows', url: '/workflows', cssClass: 'fa fa-tasks fa-lg'},
        //{title: 'Lists', translationKey: 'navigation:filings', url: '/filings', cssClass: 'fa fa-tasks fa-lg'}
        //
        //{title: 'problems', translationKey: 'navigation:problems', url: '/problems', cssClass: 'fa fa-tasks fa-lg'},
        //{title: 'future', translationKey: 'navigation:future', url: '/future', cssClass: 'fa fa-tasks fa-lg'}

    ];

    $scope.navItems = navItems;
        $scope.delay = 8000;
        $scope.slides = [
            {'title': 'hell', 'class': 'animation-slide', 'image':' ./../images/logos/mongodb.png'},
            {'title': 'sadas', 'class': 'animation-fade', 'image': ' ./../images/logos/sails-logo.png'}
        ];
        //
        //$scope.toggle = function() {
        //    alert('tg')
        //    this.toggle = offCanvas.toggle;
        //}

        }]);