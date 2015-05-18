angular.module('models.calendar', ['lodash', 'services', 'ngSails'])

    .service('CalendarModel',['$q', 'lodash', 'utils', '$sails','Restangular', function($q, lodash, utils, $sails,Restangular) {
        var url = utils.prepareUrl('calendar');//socket
        var urlRest = utils.prepareUrlRestangular('calendar');
        // this uses restangular
        //server getList in routes   'get /api/posts': 'PostsController.getList',
        this.getAll = function () {
            var deferred = $q.defer();
            var Calendar = Restangular.all(urlRest);
            Calendar.customGET().then(function (calendar) {
            //alert(posts[0]);
                deferred.resolve(calendar);
            });
            return deferred.promise;
        },

            this.getOne = function () {
                var deferred = $q.defer();
                console.log('rest ',urlRest+'/1')
                var Calendar = Restangular.all(urlRest+'/1');
                Calendar.customGET().then(function (calendar) {
                    //alert(posts[0]);
                    deferred.resolve(calendar);
                });
                return deferred.promise;
            }

//        this.getAllCustom = function () {
//            var deferred = $q.defer();
//            var Calendar = Restangular.all(urlRest);
//            var params = {  commonWay: 'value1',
//                'filter[property1]': 'abc',//filterVariable1,
//                'filter[property2]': '123'//filterVariable2
//            };
//            Posts.customGET('getAllCustom', [params]).then(function (data) {
//                //alert(data);
//                deferred.resolve(data);
//            });
//            return deferred.promise;
//        }

    }]);
