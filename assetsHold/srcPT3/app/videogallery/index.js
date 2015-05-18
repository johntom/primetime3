angular.module('sailng.videogallery', [])

    .config(['$stateProvider', function config($stateProvider) {
        $stateProvider.state('videogallery', {
            url: '/videogallery',
            views: {
                "main": {
                    controller: 'VideoGalleryCtrl',
                    templateUrl: 'videogallery/index.tpl.html'
                }
            }
        });
    }])

         .controller('VideoGalleryCtrl', ['$scope', 'titleService',  'GalleryModel', '$sce',function GalleryController($scope, titleService, GalleryModel,$sce) {

        //
        //https://www.youtube.com/watch?v=8YasQLU-AXU
        //    https://www.youtube.com/watch?v=VuP_C9zxPJE
        //        https://www.youtube.com/watch?v=WP-SMw3oWd0
        //            https://www.youtube.com/watch?v=bbdw_zl4mFg
        //                https://www.youtube.com/watch?v=jIUm_Jhtz7Y
        //                    https://www.youtube.com/watch?v=xH3ZPnBH5Jc


     //   .controller('VideoGalleryCtrl', ['$scope', 'titleService',  'GalleryModel',function GalleryController($scope, titleService, GalleryModel) {

            //
        //$scope.config = {
        //        sources: [
        //            {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.mp4"), type: "video/mp4"},
        //            {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
        //            {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}
        //        ],
        //        tracks: [
        //            {
        //                src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
        //                kind: "subtitles",
        //                srclang: "en",
        //                label: "English",
        //                default: ""
        //            }
        //        ],
        //        theme: "bower_components/videogular-themes-default/videogular.css",
        //        plugins: {
        //            poster: "http://www.videogular.com/assets/images/videogular.png"
        //        }
        //    };


     //$scope.video= "http://media.w3.org/2010/05/sintel/trailer.mp4";

      //  $scope.video= 'http://media.w3.org/2010/05/video/movie_300.mp4';

    //    $scope.video= 'http://www.example.com/master-and-margarita.mp4';

      //  var source = video.multiSource();
        //source.addSource('mp4', 'http://www.example.com/master-and-margarita.mp4');
        //source.addSource('ogg', 'http://www.example.com/master-and-margarita.ogg');

        //source.addSource('mp4', 'http://www.example.com/alice-in-wonderland.mp4');

        //source.addSource('mp4', 'http://static.videogular.com/assets/videos/videogular.mp4');
        //
        //source.addSource('mp4',"http://media.w3.org/2010/05/sintel/trailer.mp4" );
        //source.addSource('mp4',"http://media.w3.org/2010/05/sintel/trailer.webm5" );
        //source.addSource('mp4',"http://media.w3.org/2010/05/sintel/trailer.ogv" );


    //    source.save();

        //var controller = this;
            //controller.state = null;
            //controller.API = null;
            //controller.currentVideo = 0;
            //
            //controller.onPlayerReady = function(API) {
            //    controller.API = API;
            //};
            //
            //controller.onCompleteVideo = function() {
            //    controller.isCompleted = true;
            //
            //    controller.currentVideo++;
            //
            //    if (controller.currentVideo >= controller.videos.length) controller.currentVideo = 0;
            //
            //    controller.setVideo(controller.currentVideo);
            //};
            //
            //controller.videos = [
            //    {
            //        sources: [
            //            {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.mp4"), type: "video/mp4"},
            //            {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
            //            {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}
            //        ]
            //    },
            //    {
            //        sources: [
            //            {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov"), type: "video/mp4"},
            //            {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/big_buck_bunny_720p_stereo.ogg"), type: "video/ogg"}
            //        ]
            //    }
            //];
            //
            //controller.config = {
            //    preload: "none",
            //    autoHide: false,
            //    autoHideTime: 3000,
            //    autoPlay: false,
            //    sources: controller.videos[0].sources,
            //    theme: {
            //        url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
            //    },
            //    plugins: {
            //        poster: "http://www.videogular.com/assets/images/videogular.png"
            //    }
            //};
            //
            //controller.setVideo = function(index) {
            //    controller.API.stop();
            //    controller.currentVideo = index;
            //    controller.config.sources = controller.videos[index].sources;
            //    $timeout(controller.API.play.bind(controller.API), 100);
            //};
        titleService.setTitle('Video');



     //
     //
     //
     //   PostsModel.getOne('author', 'gallery').then(function (post) {
     //       console.log('getOne ', post)
     //       $scope.post = post;
     //   })
     //
     //     $scope.getGallery = function () {
     //       ///alert()
     //      GalleryModel.getAllNewWallop($scope.dataset).then(function (models) {
     //           //  $scope.images = [];
     //          // alert(models)
     //           $scope.images = models;
     //           console.log('GalleryModel ================', $scope.dataset+' '+$scope.images.length)
     //
     //
     //       });
     //   }
     //   console.log(' $scope.images ', $scope.images )
     //$scope.isActive = function (index) {
     //       return $scope._Index === index;
     //   };
     //
     //   // show prev image
     //   $scope.showPrev = function () {
     //       $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.photos.length - 1;
     //   };
     //
     //   // show next image
     //   $scope.showNext = function () {
     //
     //       $scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;
     //
     //   };
     //
     //   // show a certain image
     //   $scope.showPhoto = function (index) {
     //       $scope._Index = index;
     //   };

    }]);


