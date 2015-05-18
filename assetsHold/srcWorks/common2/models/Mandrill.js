angular.module('models.mandrill', ['lodash', 'services', 'ngSails'])
    .service('MandrillModel', ['$q', 'lodash', 'utils', 'Restangular', function ($q, lodash, utils, Restangular) {
        var urlRest = utils.prepareUrlRestangular('mandriltemplates');
        this.findTemplates = function () {

            var urlRest = utils.prepareUrlRestangular('mandriltemplates');
            var deferred = $q.defer();
            var Mandrill = Restangular.all(urlRest);
            console.log('urlRest ', urlRest);

            Mandrill.customGET().then(function (models) {
                console.log('models ', models);
                deferred.resolve(models);//.data);
            });
            return deferred.promise;
        },

            //this.renewaldaily = function (form) {
            //    var urlRest = utils.prepareUrlRestangular('renewaldaily');
            //
            //    var deferred = $q.defer();
            //    var Mandrill = Restangular.all(urlRest);
            //    console.log('urlRest ',form, urlRest);
            //
            //
            //
            //    Mandrill.customGET('',form).then(function (models) {
            //        console.log('models ', models);
            //        deferred.resolve(models);//.data);
            //    });
            //    return deferred.promise;
            //},
            this.renewalmonth = function (form) {

                var urlRest = utils.prepareUrlRestangular('emailmonth');
                var deferred = $q.defer();
                var Mandrill = Restangular.all(urlRest);

                Mandrill.customGET('',form).then(function (models) {

                        console.log('models ', models);
                    deferred.resolve(models);//.data);
                });
                return deferred.promise;
            }

    }])
;
