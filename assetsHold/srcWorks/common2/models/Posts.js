angular.module('models.posts', ['lodash', 'services', 'ngSails'])
//    .service('PostsModel',['$q', 'lodash', 'utils', '$sails','Restangular', function($q, lodash, utils, $sails,Restangular) {
// angular datastore
    // added 'Posts' from app.js
//    .service('PostsModel',['$q', 'lodash', 'utils', '$sails','Restangular','PostsDS', function($q, lodash, utils, $sails,Restangular,PostsDS) {
//,'DSCacheFactory'
    .service('PostsModel', ['$q', 'lodash', 'utils', '$sails', 'Restangular','MyCachingRestService', function ($q, lodash, utils, $sails, Restangular,MyCachingRestService) {

        //var cache = DSCacheFactory('cache', {
        //    capacity: 100,
        //    maxAge: 300000
        //});
        //
        //// Add 50 items here, for example
        //
        //cache.info(); // { ..., size: 50, capacity: 100, maxAge: 300000, ... }


        var url = utils.prepareUrl('posts');//socket
        var urlRest = utils.prepareUrlRestangular('posts');
        // this uses restangular
        //server getList in routes   'get /api/posts': 'PostsController.getList',
//        this.getAllDS = function () {
//            var deferred = $q.defer();
//            //var Posts = Restangular.all(urlRest);
//
////            PostsDS.findAll({}).then(function (posts) {
//                    //PostsDS.findAll().then(function (posts) {
//                     PostsDS.findAll().then(function (posts) {
//                         deserialize: function (resourceName, data) {
//                             //alert(posts.[0]);
//                             console.log('PostsDS ', posts)
//                             //alert(posts.data[0]);
//                         })
//
//                deferred.resolve(posts);
//            });
//            return deferred.promise;
//        },
//
//            this.getoneDS = function (id) {
//                var deferred = $q.defer();
//                //var Posts = Restangular.all(urlRest);
//                console.log('PostsDS ',PostsDS)
////            PostsDS.findAll({}).then(function (posts) {
//                PostsDS.findAll().then(function (posts) {
//                    alert(posts[0]);
//
//                    //alert(posts.data[0]);
//                    deferred.resolve(posts);
//                });
//                return deferred.promise;
//            },

        this.getAll = function () {
            // restangular cache
            //MyRestService.all("accounts").getList();          // will not cache
            //MyCachingRestService.all("users").getList();      // will cache
           var deferred = $q.defer();
            //this
           var Posts = MyCachingRestService.all(urlRest);
           Posts.customGET().then(function (posts) {
            //or    MyCachingRestService.all(urlRest).customGET().then(function (posts) {
                deferred.resolve(posts);
            });
            return deferred.promise;
        },

            //this.getOne = function () {
            //    var deferred = $q.defer();
            //    console.log('rest ', urlRest + '/1')
            //    var Posts = Restangular.all(urlRest + '/1');
            //    Posts.customGET().then(function (posts) {
            //        //alert(posts[0]);
            //        deferred.resolve(posts);
            //    });
            //    return deferred.promise;
            //},

            this.getOne = function (field,value) {
                // use the cache and get the article
                var deferred = $q.defer();
                // use cache
                MyCachingRestService.all(urlRest).customGET().then(function (posts) {
                   postsall = posts.data;
                })
                    .then(function () {
                        console.log('pa ',postsall[0])
                        var apos = lodash.findIndex(postsall, function (file) {
                             return file[field] === value;
                        });
                       post = postsall[apos];
                        //alert ('in post ',post)
                       deferred.resolve(post);
                    })

                return deferred.promise;
            },

            this.create = function (post) {
                // alert('con '+contact)
                var deferred = $q.defer();
                //var urlRest = 'api/posts';
                var Posts = Restangular.all(urlRest);
                //customPOST returns an object Post return array
                Posts.customPOST(post).then(function (response) {
                    //alert(posts[0]);
                    console.log('set myData cache data', response.data)

                    deferred.resolve(response.data);
                });
                return deferred.promise;
            },
            //    this.create = function (contact) {
            //    // alert('con '+contact)
            //    var deferred = $q.defer();
            //    var urlRest = 'api/contact';
            //    var Contact = Restangular.all(urlRest);
            //    //customPOST returns an object Post return array
            //    Contact.customPOST(contact).then(function (response) {
            //        //alert(posts[0]);
            //        console.log('set myData cache data', response.data)
            //
            //        deferred.resolve(response.data);
            //    });
            //    return deferred.promise;
            //},
            this.update = function (post) {
                alert('post update' + post)
                var deferred = $q.defer();

                var Post = Restangular.all(urlRest);
                //customPOST returns an object Post return array
                Post.customPUT(post).then(function (response) {
                    //alert(posts[0]);
                    console.log('set myData cache data', response.data)

                    deferred.resolve(response.data);
                });
                return deferred.promise;
            },

            this.gettags = function () {
                var urlRest = utils.prepareUrlRestangular('tags');
                var deferred = $q.defer();
                var Posts = Restangular.all(urlRest);
                console.log('Posts ', Posts)
                Posts.customGET().then(function (posts) {
                    console.log('posts', posts)

                    //alert(posts.data[0]);
                    deferred.resolve(posts);
                });
                return deferred.promise;
            }
        //,
        //this.deletetag = function(tag) {
        //    var deferred = $q.defer();
        //    var url = utils.prepareUrl('tags/' + model.id);
        //    $sails.delete(url, function(model) {
        //        return deferred.resolve(model);
        //    });
        //    return deferred.promise;
        //};
        //this.getAllCustom = function () {
        //    var deferred = $q.defer();
        //    var Posts = Restangular.all(urlRest);
        //    var params = {  commonWay: 'value1',
        //        'filter[property1]': 'abc',//filterVariable1,
        //        'filter[property2]': '123'//filterVariable2
        //    };
        //    Posts.customGET('getAllCustom', [params]).then(function (data) {
        //        //alert(data);
        //        deferred.resolve(data);
        //    });
        //    return deferred.promise;
        //}

    }]);
