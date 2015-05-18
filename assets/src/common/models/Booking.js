angular.module('models.booking', ['lodash', 'services', 'ngSails'])

    .service('BookingModel',['$q', 'lodash', 'utils', '$sails',   function($q, lodash, utils, $sails) {
        this.getAll = function() {
            console.log ('BookingModel ')
            var deferred = $q.defer();
            var url = utils.prepareUrl('booking');
            $sails.get(url, function(models) {
                return deferred.resolve(models);
            });
            return deferred.promise;
        };



        this.create = function(newModel) {
            console.log('in model create',newModel)
            var deferred = $q.defer();
            var url = utils.prepareUrl('booking');
            $sails.post(url, newModel, function(model) {
                return deferred.resolve(model);
            });
            return deferred.promise;
        };

        this.delete = function(model) {
            var deferred = $q.defer();
            var url = utils.prepareUrl('booking/' + model.id);
            $sails.delete(url, function(model) {
                return deferred.resolve(model);
            });
            return deferred.promise;
        };

        this.update = function(modelu) {
            var deferred = $q.defer();
            var url = utils.prepareUrl('booking');
            console.log ('model update ',modelu);

            $sails.put(url, modelu, function(model) {
                console.log ('after ',modelu);

                return deferred.resolve(model);
            });

            return deferred.promise;
        };

    }]);
