 angular.module('models.gallery', ['lodash', 'services', 'ngSails'])

    .service('GalleryModel',['$q', 'lodash', 'utils', '$sails','Restangular', function($q, lodash, utils, $sails,Restangular) {
        var urlRest = utils.prepareUrlRestangular('gallery');
        // this uses restangular
        //server getList in routes   'get /api/posts': 'PostsController.getList',
        this.getAll = function () {
            var deferred = $q.defer();
           // alert('getAll');
            var Gallery = Restangular.all(urlRest);
            Gallery.customGET().then(function (gallery) {
           // alert(gallery);
                deferred.resolve(gallery);
            });
            return deferred.promise;
        },
            //this.getAllNew = function () {
            //    // bandDirective
            //    var deferred = $q.defer();
            //    var urlRest = utils.prepareUrlRestangular('galleryNew');
            //
            //    var Gallery = Restangular.all(urlRest);
            //    Gallery.customGET().then(function (gallery) {
            //        //alert(gallery);
            //        deferred.resolve(gallery);
            //    });
            //    return deferred.promise;
            //},

            this.getAllNew = function (dataset) {
                // bandDirective
                var deferred = $q.defer();
                var urlRest = utils.prepareUrlRestangular('galleryNew');

                var Gallery = Restangular.all(urlRest+'/'+dataset);
                Gallery.customGET().then(function (gallery) {
                    //alert(gallery);
                    deferred.resolve(gallery);
                });
                return deferred.promise;
            },

            this.getAllNewWallop = function (dataset) {
                // bandDirective
                var deferred = $q.defer();
                var urlRest = utils.prepareUrlRestangular('galleryNewWallop');

                var Gallery = Restangular.all(urlRest+'/'+dataset);
                Gallery.customGET().then(function (gallery) {
                    //alert(gallery);
                    deferred.resolve(gallery);
                });
                return deferred.promise;
            },

            this.getFader = function (dataset) {

                var deferred = $q.defer();
                var urlRest = utils.prepareUrlRestangular('getFader');

                var Gallery = Restangular.all(urlRest+'/'+dataset);
                Gallery.customGET().then(function (gallery) {
                    //alert(gallery);
                    deferred.resolve(gallery);
                });
                return deferred.promise;
            },

            this.getOne = function () {
                var deferred = $q.defer();
                console.log('rest ',urlRest+'/1')
                var Gallery = Restangular.all(urlRest+'/1');
                Gallery.customGET().then(function (gallery) {
                    //alert(posts[0]);
                    deferred.resolve(gallery);
                });
                return deferred.promise;
            }


    }]);
