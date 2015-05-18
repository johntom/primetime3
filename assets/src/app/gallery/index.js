angular.module('sailng.gallery', [])

    .config(['$stateProvider', function config($stateProvider) {
        $stateProvider.state('gallery', {
            url: '/gallery',
            views: {
                "main": {
                    controller: 'GalleryCtrl',
                    templateUrl: 'gallery/index.tpl.html'
                }
            }
        });
    }])

    .controller('GalleryCtrl', ['$scope', 'titleService', 'PostsModel', 'GalleryModel', 'ImageService', function GalleryController($scope, titleService, PostsModel, GalleryModel, ImageService) {

        titleService.setTitle('Gallery');
       $scope.datasets = ["archival","blackfish","bluefish","boats","codfish","crew","fluke", "porgy","seabass","stripedbass","weakfish"];
        var lc = localStorage.getItem("galleryid");
        if (lc !==undefined){

            $scope.dataset = lc;
            //   alert ('lc '+$scope.dataset+'...')
        } else  $scope.dataset ='crew';


        $scope.$watch("dataset", function () {

            localStorage.setItem("galleryid",$scope.dataset);
            $scope.getGallery($scope.dataset);
            $scope.dataHasLoaded = false;
        });

        PostsModel.getOne('author', 'gallery').then(function (post) {
            //console.log('getOne ', post)
            $scope.post = post;
        })

        //$scope.getGallery = function () {
        //    ///alert()
        //   GalleryModel.getAllNewWallop($scope.dataset).then(function (models) {
        //        //  $scope.images = [];
        //       // alert(models)
        //        $scope.images = models;
        //        console.log('GalleryModel ================', $scope.dataset+' '+$scope.images.length)
        //       console.log(' $scope.images ', $scope.images )
        //
        //    });
        //}
        //$scope.images = [{
        //    src: 'images/banner1.jpg',
        //    alt: 'Add your image description here'
        //}, {
        //    src: 'images/banner3.jpg',
        //    alt: 'Add your image description here'
        //}, {
        //    src: 'images/banner5.jpg',
        //    alt: 'Add your image description here'
        //}, {
        //    src: 'images/banner4.jpg',
        //    alt: 'Add your image description here'
        //
        //}, {
        //    src: 'images/banner2.jpg',
        //    alt: 'Add your image description here'
        //}];

        $scope.dataHasLoaded = false;
      //  $scope.dataset ='crew';


        //GalleryModel.getFader($scope.dataset).then(function (models) {
        //
        //    $scope.images = models;
        //    console.log('GalleryModel ================', $scope.dataset+' '+$scope.images.length)
        //    console.log(' $scope.images ', $scope.images )
        //
        //});
        $scope.getGallery = function () {
            ///alert()
            GalleryModel.getFader($scope.dataset).then(function (models) {

                $scope.images = models;
                $scope.dataHasLoaded = true;
                //console.log('GalleryModel ================', $scope.dataset+' '+$scope.images.length)
               // console.log(' $scope.images ', $scope.images )

            });


        }

        //alt: "1171___Selected.jpg"
        //src: "images/fluke/1171___Selected.jpg"
        //images/blackfish/508___Selected.jpg", "images/blackfish/510___Selected.jpg", "images/blackfish/511___Selected.jpg", "images/blackfish/512___Selected.jpg", "images/blackfish/513___Selected.jpg", "images/blackfish/515___Selected.jpg", "images/blackfish/517___Selected.jpg", "images/blackfish/518___Selected.jpg", "images/bla
        //$scope.images = [{
        //    src: 'images/banner1.jpg',
        //    alt: 'Add your image description here'
        //}, {
        //    src: 'images/banner3.jpg',
        //    alt: 'Add your image description here'
        //}, {
        //    src: 'images/banner5.jpg',
        //    alt: 'Add your image description here'
        //}, {
        //    src: 'images/banner4.jpg',
        //    alt: 'Add your image description here'
        //
        //}, {
        //    src: 'images/banner2.jpg',
        //    alt: 'Add your image description here'
        //}];

        // if a current image is the same as requested image
        $scope.isActive = function (index) {
            return $scope._Index === index;
        };

        // show prev image
        $scope.showPrev = function () {
            $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.photos.length - 1;
        };

        // show next image
        $scope.showNext = function () {

            $scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;

        };

        // show a certain image
        $scope.showPhoto = function (index) {
            $scope._Index = index;
        };
        //  $scope.getGallery(); not if using watch
        //$scope.photos = [
        //    {src: 'http://farm9.staticflickr.com/8042/7918423710_e6dd168d7c_b.jpg', desc: 'Image 01'},
        //    {src: 'http://farm9.staticflickr.com/8449/7918424278_4835c85e7a_b.jpg', desc: 'Image 02'},
        //    {src: 'http://farm9.staticflickr.com/8457/7918424412_bb641455c7_b.jpg', desc: 'Image 03'},
        //    {src: 'http://farm9.staticflickr.com/8179/7918424842_c79f7e345c_b.jpg', desc: 'Image 04'},
        //    {src: 'http://farm9.staticflickr.com/8315/7918425138_b739f0df53_b.jpg', desc: 'Image 05'},
        //    {src: 'http://farm9.staticflickr.com/8461/7918425364_fe6753aa75_b.jpg', desc: 'Image 06'}
        //];
    }]);



/**
 * Conserve aspect ratio of the orignal region. Useful when shrinking/enlarging
 * images to fit into a certain area.
 *
 * @param {Number} srcWidth Source area width
 * @param {Number} srcHeight Source area height
 * @param {Number} maxWidth Fittable area maximum available width
 * @param {Number} maxHeight Fittable area maximum available height
 * @return {Object} { width, heigth }
 */
//function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
//
//    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
//
//    return { width: srcWidth*ratio, height: srcHeight*ratio };
//}
//var ratio = 0;  // Used for aspect ratio
//var width = $scope.photos[$scope._Index].width();    // Current image width
//var height = $scope.photos[$scope._Index].height();    // Current image width
//
//
//// Check if the current width is larger than the max
//if(width >  $scope.maxWidth){
//    ratio =  $scope.maxWidth / width;   // get ratio for scaling image
// //   $(this).css("width", $scope.maxWidth); // Set new width
// //   $(this).css("height", height * ratio);  // Scale height based on ratio
//
//
//    $scope.height = height * ratio;    // Reset height to match scaled image
//    $scope.width = width * ratio;    // Reset width to match scaled image
//}
//
//// Check if current height is larger than max
//if(height >  $scope.maxHeight){
//    ratio =  $scope.maxHeight / height; // get ratio for scaling image
//   // $(this).css("height", $scope. maxHeight);   // Set new height
//   // $(this).css("width", width * ratio);    // Scale width based on ratio
//    $scope.width = width * ratio;    // Reset width to match scaled image
//    $scope.height = height * ratio;    // Reset height to match scaled image
//}