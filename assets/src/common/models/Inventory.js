angular.module('models.inventory', ['lodash', 'services', 'ngSails'])

    .service('InventoryModel',['$q', 'lodash', 'utils', '$sails', function($q, lodash, utils, $sails) {
        this.getAll = function() {
            console.log ('InventoryModel getAll')
            var deferred = $q.defer();
            var url = utils.prepareUrl('inventory');
            $sails.get(url, function(models) {
                return deferred.resolve(models);
            });
            return deferred.promise;
        };

     

        this.create = function(newModel) {
            console.log('in model create',newModel)
            var deferred = $q.defer();
            var url = utils.prepareUrl('inventory');
            $sails.post(url, newModel, function(model) {
                return deferred.resolve(model);
            });
            return deferred.promise;
        };

        this.delete = function(model) {
            var deferred = $q.defer();
            var url = utils.prepareUrl('inventory/' + model.id);
            $sails.delete(url, function(model) {
                return deferred.resolve(model);
            });
            return deferred.promise;
        };

        this.update = function(modelu) {
            var deferred = $q.defer();
            var url = utils.prepareUrl('inventory');
            console.log ('model update ',modelu);

            $sails.put(url, modelu, function(model) {
                console.log ('after ',modelu);

                return deferred.resolve(model);
            });

            return deferred.promise;
        };

    }]);
