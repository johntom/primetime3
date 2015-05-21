angular.module('models.tasks', ['lodash', 'services', 'ngSails'])
//task    tasks Tasks  Task TasksModel

    .service('TasksModel', ['$q', 'lodash', 'utils', '$sails', 'Restangular', 'MyCachingRestService', function ($q, lodash, utils, $sails, Restangular, MyCachingRestService) {
        var urlRest = utils.prepareUrlRestangular('tasks');
        // this uses restangular
        this.getAllCache = function () {
            // restangular cache
            //MyRestService.all("accounts").getList();          // will not cache
            //MyCachingRestService.all("users").getList();      // will cache
            var deferred = $q.defer();

            var Tasks = MyCachingRestService.all(urlRest);
            Tasks.customGET().then(function (tasks) {
                console.log('tasks:: ', tasks)
                //or    MyCachingRestService.all(urlRest).customGET().then(function (posts) {
                //idx
                //lodash.forEach(tasks,function (elem,idx ) {
                //    console.log(idx,elem)
                //    if (elem.Start && typeof elem.Start === "string") {
                //        elem.Start = kendo.parseDate(elem.Start, "yyyy-MM-ddTHH:mm:ss.fffZ");
                //        console.log( elem.Start)
                //    }
                //});
                deferred.resolve(tasks);
            });
            return deferred.promise;
        },
        this.getAll = function () {
            var deferred = $q.defer();
            var Tasks = Restangular.all(urlRest);
            Tasks.customGET().then(function (tasks) {
                console.log('tasks:: ', tasks)

                deferred.resolve(tasks);
            });
            return deferred.promise;
        },
            //    ,
            //
            //
            //    this.getOne = function (field,value) {
            //        // use the cache and get the article
            //        var deferred = $q.defer();
            //        // use cache
            //        MyCachingRestService.all(urlRest).customGET().then(function (tasks {
            //            tasksall = tasks.data;
            //        })
            //            .then(function () {
            //                console.log('pa ',tasksall[0])
            //                var apos = lodash.findIndex(tasksall, function (file) {
            //                     return file[field] === value;
            //                });
            //                task = tasksall[apos];
            //
            //               deferred.resolve(task);
            //            })
            //
            //        return deferred.promise;
            //    },
            //
            this.create = function (task) {

                angular.toJson(task)
                var deferred = $q.defer();
                //var urlRest = 'api/posts';
                var Tasks = Restangular.all(urlRest);
                //customPOST returns an object Post return array
                Tasks.customPOST(task).then(function (response) {
                    //alert(posts[0]);
                    console.log('set myData cache data', response)


                    deferred.resolve(response);//.data);
                });
                return deferred.promise;
            },
            this.updateTrip = function (task) {
                //task = [{book: bookedtrip, trip: $scope.trip}];
                angular.toJson(task);
                var urlRest = utils.prepareUrlRestangular('tasksTrip');
                var deferred = $q.defer();
                //var urlRest = 'api/posts';
                var Tasks = Restangular.all(urlRest);
                //customPOST returns an object Post return array
                Tasks.customPUT(task).then(function (response) {
                    //alert(posts[0]);
                    console.log('set myData cache data', response);//.data)


                    deferred.resolve(response);//.data);
                });
                return deferred.promise;
            };
            this.update = function (task) {
                angular.toJson(task);
                var deferred = $q.defer();
                //var urlRest = 'api/posts';
                var Tasks = Restangular.all(urlRest);
                //customPOST returns an object Post return array
                Tasks.customPUT(task).then(function (response) {
                    //alert(posts[0]);
                    console.log('set myData cache data', response.data)


                    deferred.resolve(response.data);
                });
                return deferred.promise;
            };
            this.updateBookingNew = function (task) {
                // this is used when we create a new booking detail
//                alert('in model update ' + e);//.data.models[0].CLAIM_NO)
                angular.toJson(task);
                var urlRest = utils.prepareUrlRestangular('updatebookingnew');
                var deferred = $q.defer();
                var Tasks = Restangular.all(urlRest);
                //customPOST returns an object Post return array
                Tasks.customPUT(task).then(function (response) {
                    //alert(posts[0]);
                    console.log('set myData', response.data)
                    deferred.resolve(response.data);
                });
                return deferred.promise;
            };
        this.destroy = function (task) {
            angular.toJson(task);
            console.log('task ',task)
            var deferred = $q.defer();
            //var urlRest = 'api/posts';
            var Tasks = Restangular.all(urlRest);
            //customPOST returns an object Post return array
           //5-18 Tasks.customDELETE(task.TaskID).then(function (response) {
                Tasks.customDELETE(task.id).then(function (response) {
                    //alert(posts[0]);
                console.log('set myData cache data', response.data)
                deferred.resolve(response.data);
            });
            return deferred.promise;
        };
        //
        //    this.update = function (task) {
        //        alert('post update' + task)
        //        var deferred = $q.defer();
        //
        //        var Task = Restangular.all(urlRest);
        //        //customPOST returns an object Post return array
        //        Task.customPUT(task).then(function (response) {
        //            //alert(posts[0]);
        //            console.log('set myData cache data', response.data)
        //
        //            deferred.resolve(response.data);
        //        });
        //        return deferred.promise;
        //    }
    }]);
