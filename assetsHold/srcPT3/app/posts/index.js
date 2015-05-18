angular.module('sailng.posts', [])

//.config(function config( $stateProvider ) {
    .config(['$stateProvider', function config($stateProvider) {

        $stateProvider.state('posts', {
            url: '/posts',
            views: {
                "main": {
                    controller: 'PostCtrl',
                    templateUrl: 'posts/index.tpl.html'
                }
            },
            data: {pageTitle: 'Post'}
        })
            .state('posts.id', {
                url: '/:id',
                views: {
                    'main2': {
                        templateUrl: 'posts/index2.tpl.html'

                    }
                }
            });
    }])


    .controller('PostCtrl', ['$scope', '$sails', 'lodash', 'config', 'titleService', 'PostsModel', '$filter',
        'ngTableParams', '$location', '$sce', '$window', function PostController($scope, $sails, lodash, config, titleService, PostsModel, $filter, ngTableParams, $location, $sce, $window) {
            // Strict Contextual Escaping (SCE) is a mode in which AngularJS requires bindings in certain contexts to result in a value that is marked as safe to use for that ...

          // set all folder options for select control, read localstorage and set a default if not value
            $scope.datasets = ["archival","blackfish","bluefish","boats","codfish","crew","fluke", "porgy","seabass","stripedbass","weakfish"];
           var lc = localStorage.getItem("galleryid");
           if (lc !==undefined){
               $scope.dataset = lc;
            } else  $scope.dataset ='crew';


            $scope.$watch("dataset", function () {
              // $scope.tooloptions.refresh();
                //  $scope.GridMAS2.dataSource.read();
             //   $scope.editor.tooloptions.imageBrowser.read();
             // $scope.tooloptions.imageBrowser.read();
              //  $scope.$apply();
               localStorage.setItem("galleryid",$scope.dataset);
//                $scope.editor.imageBrowser.transport.read();//.url="url:'api/galleryKendo/'"+$scope.dataset;

                $scope.editor.imageBrowser.read();
                $scope.$apply();
                //$location('/')

            });

            $scope.tagadded = false;

            $scope.currentUser = config.currentUser;

            $scope.content = '';
            // $scope.currentPost ='';
            //  $scope.mdown='## Hello, Markdown-jrt!\n* We had one life\n* And this life was full of joy\n* For us\n* For us\n* For us';

            if ($scope.currentUser === undefined) {
                // alert('You must login to view')
                $location.path('/');
                //window.location = '/';exit;
            }
            ////http://plnkr.co/edit/DNUSfXduAlEoLiw5DbtB?p=preview
            //$scope.md2Html = function () {
            //    $scope.html = $window.marked($scope.markdown);
            //    $scope.htmlSafe = $sce.trustAsHtml($scope.html);
            //};
            ////$scope.initFromUrl = function (url) {
            ////    //alert($scope.currentPost.postContent)
            ////    console.log('initFromUrl::', $scope.currentPost );//post);
            ////
            ////    $scope.markdown =   $scope.mdown;//$scope.currentPost.postContent;
            ////    return $scope.md2Html();
            ////    //    $http.get(url).success(function(data) {
            ////    // $scope.markdown = data;
            ////    //  return $scope.md2Html();
            ////    //  });
            ////};
            //
            //$scope.initFromText = function (text) {
            //    $scope.markdown = text;
            //    alert ('md init '+$scope.markdown)
            //    $scope.md2Html();
            //};
            $scope.editPost = function (post) {
                // this is for billing deails billing.status === 'closedAlert' ||
                if ((post === undefined) || (post === 0)) {
                    //var xpos = lodash.findIndex($scope.staff, function (file) {
                    //    return file.username === config.currentUser;
                    //});
                    //var assignto = config.currentUser;

                    //// console.log(' a . staff ', $scope.staff, config.currentUser, assignto);
                    $scope.currentPost = {id: 0, tags: [], postContent: '', postTitle: ''};
                    $location.path('/posts/0');
                } else {
                    $scope.currentPost = post;
                    $scope.currentPost.tag = '';
                    console.log('edit post ', $scope.currentPost);//post);

                    $location.path('/posts/' + post.id);
                }
            };
            $scope.checkName = function (data, id) {

                var apos = lodash.findIndex($scope.tags, function (file) {
                    return file === data;
                });
                if (apos === -1) {
                    $scope.tag = data
                    $scope.tagadded = true

                } else {
                    $scope.tag = $scope.tags[apos];
                }
                var bpos = lodash.findIndex($scope.currentPost.tags, function (file) {
                    return file === data;
                });

                console.log('file.selectedproject ', apos, $scope.tag, ' bpos ', bpos)
                if (bpos === -1) {
                    $scope.currentPost.tags.push($scope.tag)
                }
            };

            var getData = function () {
                return $scope.posts;
            };

            PostsModel.gettags($scope).then(function (models) {
                $scope.tags = models.data;
                console.log('models ', $scope.tags)
            });
            PostsModel.getAll($scope).then(function (models) {
                $scope.posts = models.data;
                var data = $scope.posts;
                //wconsole.log('models ', $scope.posts)
                //if ($scope.currentUser.username !== 'tom') {
                //    $scope.filterUser = $scope.currentUser.username
                //} else {
                //    $scope.filterUser = '';
                //}
                $scope.tableParams = new ngTableParams({
                    page: 1,            // show first page
                    count: 10,          // count per page
                    //filter: {
                    //    author: 'tom'       // initial filter
                    ////    assignto_user: $scope.filterUser
                    //},
                    sorting: {
                        title: 'asc'// initial sorting
                    }
                }, {
                    total: data.length,
                    getData: function ($defer, params) {
                        var filteredData = params.filter() ?
                            $filter('filter')(getData(), params.filter()) :
                            data;
                        var orderedData = params.sorting() ?
                            $filter('orderBy')(filteredData, params.orderBy()) :
                            data;

                        params.total(orderedData.length); // set total for recalc pagination
                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));

                    },
                    $scope: {$data: {}}
                });
            });
            //=============
            $scope.destroyTag = function (tag) {
                console.log('destroyTag ', tag)
                //lodash.remove($scope.tags, tag);
                lodash.remove($scope.currentPost.tags, function (num) {
                    return num === tag;
                });

                $scope.tagadded = true;
                //PostModel.deletetag(tag).then(function(model) {
                //    // todo has been deleted, and removed from $scope.todos
                //     lodash.remove($scope.tags, {id: todo.id});
                //});
            };


            $scope.createBilling = function (currentPost, savetype, markdown) {
                //save to mongo

                $scope.editState = false;
                // move assignment from lisa to bonnie where she can add an alert and assign to
                switch (savetype) {
                    case -1:
                        // cancel and close and if not created the break

                        break;

                    case 0:
                        // save and update or create
                        //alert ('md '+markdown+' - '+$scope.markdown+' - '+$scope.currentPost.postContent)
                        if ((currentPost.id === 0) || (currentPost.id === undefined)) {

                            //   currentPost.user = $scope.currentUser;// = config.currentUser;

                            //  currentPost.lockstatus = 1;
                            PostsModel.create(currentPost).then(function (model) {
                                //  $scope.currentBilling.title = '';

                            });

                        } else {
                            console.log('models ');
                            // $scope.htmlSafe = $sce.trustAsHtml($scope.html);
                            //urrentPost.postContent = $sce.trustAsHtml(currentPost.postContent);
                            PostsModel.update(currentPost).then(function (model) {
//                                return $timeout(function () {
//                                    $state.go('.', {}, { reload: true });
//                                    //  $state.go($state.current, {}, {reload: true});
//                                }, 100);

                                if ($scope.tagadded === true) {
                                    PostsModel.gettags($scope).then(function (models) {
                                        $scope.tags = models.data;
                                        console.log('models tagadded ', $scope.tags)
                                    });
                                    $scope.tagadded = false;
                                }
                            });

                        }


                        break;
                }

                $location.path('/posts');
                // $state.go($state.current, {}, {reload: true});// 11-22 refresh for contract
            };
///////////////////
            $scope.tooloptions = {
                tools: [
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "justifyLeft",
                "justifyCenter",
                "justifyRight",
                "justifyFull",
                "insertUnorderedList",
                "insertOrderedList",
                "indent",
                "outdent",
                "createLink",
                "unlink",
                "insertImage",
                "insertFile",
                "subscript",
                "superscript",
                "createTable",
                "addRowAbove",
                "addRowBelow",
                "addColumnLeft",
                "addColumnRight",
                "deleteRow",
                "deleteColumn",
                "viewHtml",
                "formatting",
                "cleanFormatting",
                "fontName",
                "fontSize",
                "foreColor",
                "backColor"
                ],

                 //    redactorOptions.imageUpload = '/upload'; // this triigers upload to /docs/Crew on server
                 //   /images/Crew/8101363005_1fefd75305_b.jpg
                //http://docs.telerik.com/kendo-ui/api/javascript/ui/editor#configuration-imageBrowser
                //http://localhost:8013/api/galleryNew/crew bring all cew images
                imageBrowser: {
                    messages: {
                        dropFilesHere: "Drop files here"
                    },
                    //transport: {
                    //    read: {
                    //       // url:'api/galleryKendo/crew',
                    //
                    //        url:'api/galleryKendo/'+$scope.dataset,
                    //        type:'GET'
                    //    },
                    //When you concatenate strings, the result is used as a constant by the widget. If you want to have dynamic URLs, define them as functions:
                    transport: {
                        read: {
                            url: function() { return 'api/galleryaticlesKendo/'+$scope.dataset; },
                            type:'GET'
                        },
                    //destroy: {
                        //    url: "/kendo-ui/service/ImageBrowser/Destroy",
                        //    type: "POST"
                        //},
                        create: {
                            url: '/api/upload',
                            type: "POST"
                        },
                        //thumbnailUrl:'api/gallerythumbsKendo/'+$scope.dataset,
                    //  does not work    thumbnailUrl: function() { return 'api/gallerythumbsKendo/'+$scope.dataset; },
                    //  this gets the list of images thumbnail wants to dispay
                    //  <img alt="1___Selected.jpg" src="api/gallerythumbsKendo/Crew?path=1___Selected.jpg" style="display: none;">
                    //    thumbnailUrl: function(path, file) {
                    //        return "/kendo-ui/service/ImageBrowser/Thumbnail?path=" + path + file;
                    //    },
                        thumbnailUrl: function(path, file) {
                            return "api/gallerythumbsKendo/"+$scope.dataset+'?path='+ file;
                        },
                       // uploadUrl: 'http://sample3.gtz.com:8013/upload',
                        uploadUrl: 'http://74.114.164.22/upload',


                        //    uploadUrl: 'http://localhost:8013/upload',

                     // uploadUrl: 'http://sample3.gtz.com:8013/upload',
                     // imageUrl: 'http://localhost:8013/images/crew/{0}'
                     // imageUrl: 'http://sample3.gtz.com:8013/images/'+$scope.dataset+'/{0}'
                     // good     imageUrl: 'http://localhost:8013/images/'+$scope.dataset+'/{0}'
                     // imageUrl: function() { return 'http://sample3.gtz.com:8013/images/'+$scope.dataset+'/{0}'
                     // imageUrl: function() { return 'http://localhost:8013/images/'+$scope.dataset+'/{0}'}
                     // imageUrl: function (e) {return "http://localhost:8013/images/" +$scope.dataset+'/'+ e;
//                        imageUrl: function (e) {return "http://sample3.gtz.com:8013/images/" +$scope.dataset+'/'+ e; }

                        //imageUrl: function (e) {return "http://sample3.gtz.com:8013/images/" +$scope.dataset+'/'+ e; }
//                        imageUrl: function (e) {return "http://sample3.gtz.com:8013/images/" +$scope.dataset+'Articles/'+ e; }
                        imageUrl: function (e) {return "http://74.114.164.22/images/" +$scope.dataset+'Articles/'+ e; }

                    }

                   // }
                   // ,               path: "/"

                },

                fileBrowser: {
                    messages: {
                        dropFilesHere: "Drop files here"
                    },
                    transport: {
                        read: "/kendo-ui/service/FileBrowser/Read",
                        destroy: {
                            url: "/kendo-ui/service/FileBrowser/Destroy",
                            type: "POST"
                        },
                        create: {
                            url: "/kendo-ui/service/FileBrowser/Create",
                            type: "POST"
                        },
                        uploadUrl: "/kendo-ui/service/FileBrowser/Upload",
                        fileUrl: "/kendo-ui/service/FileBrowser/File?fileName={0}"
                    }
                }
            };

            //$scope.editor = function () {
            //    alert('to')
            //    $scope.editor.kendoEditor({
            //
            //        tools: [
            //            "insertImage",
            //            "insertFile"
            //        ],
            //        imageBrowser: {
            //            messages: {
            //                dropFilesHere: "Drop files here"
            //            },
            //            transport: {
            //                read: "/kendo-ui/service/ImageBrowser/Read",
            //                destroy: {
            //                    url: "/kendo-ui/service/ImageBrowser/Destroy",
            //                    type: "POST"
            //                },
            //                create: {
            //                    url: "/kendo-ui/service/ImageBrowser/Create",
            //                    type: "POST"
            //                },
            //                thumbnailUrl: "/kendo-ui/service/ImageBrowser/Thumbnail",
            //                uploadUrl: "/kendo-ui/service/ImageBrowser/Upload",
            //                imageUrl: "/kendo-ui/service/ImageBrowser/Image?path={0}"
            //            }
            //        },
            //        fileBrowser: {
            //            messages: {
            //                dropFilesHere: "Drop files here"
            //            },
            //            transport: {
            //                read: "/kendo-ui/service/FileBrowser/Read",
            //                destroy: {
            //                    url: "/kendo-ui/service/FileBrowser/Destroy",
            //                    type: "POST"
            //                },
            //                create: {
            //                    url: "/kendo-ui/service/FileBrowser/Create",
            //                    type: "POST"
            //                },
            //                uploadUrl: "/kendo-ui/service/FileBrowser/Upload",
            //                fileUrl: "/kendo-ui/service/FileBrowser/File?fileName={0}"
            //            }
            //        }
            //    });
            //
            //}

            //$("#editor").kendoEditor({
            //    tools: [
            //        "insertImage",
            //        "insertFile"
            //    ],
            //    imageBrowser: {
            //        messages: {
            //            dropFilesHere: "Drop files here"
            //        },


////////////////

        }]);

