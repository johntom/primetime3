


angular.module('sailng.uploadxx', [
])
    .config(['$stateProvider', function config($stateProvider) {
        $stateProvider.state('upload', {
            url: '/upload',
            views: {
                "main": {
                    controller: 'UploadCtrl',
                    templateUrl: 'upload/index.tpl.html'
                }
            },
            data: { pageTitle: 'Upload' }
        });
    }])
        .controller('UploadCtrlxx', ['$scope','$http',  'FileUploader', 'lodash', 'config', 'titleService',  '$filter', 'ngTableParams', '$location','GalleryModel', function UploadController($scope,$http, FileUploader, lodash, config, titleService,  $filter, ngTableParams, $location,GalleryModel) {


        $scope.uploadRightAway = true;
        $scope.hasUploader = function(index) {
            return $scope.upload[index] != null;
        };
        $scope.abort = function(index) {
            $scope.upload[index].abort();
            $scope.upload[index] = null;
        };


        uploadUrl = 'http://localhost:8013/upload';
        var uploader = $scope.uploader = new FileUploader({
            url: uploadUrl
        });

        // FILTERS

        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);
        // read local
        $scope.handleFiles = function handleFiles(files) {
            // Check for the various File API support.
            if (window.FileReader) {
                // FileReader are supported.
                alert('FileReader are supported..')
            } else {
                alert('FileReader are not supported in this browser.');
            }
        }


        $scope.getGallery = function() {
            //alert('getGallery are supported..')
            GalleryModel.getAll($scope).then(function (models) {
                //console.log('GalleryModel ', models)
                $scope.images = models;
                $scope.index = 0;
                //console.log( '   $scope.images ',  $scope.images)
            });
        }

        $scope.getGallery();
    }]);
