angular.module('models.todo', ['lodash', 'services', 'ngSails'])

    .service('TodoModel',['$q', 'lodash', 'utils', '$sails', function($q, lodash, utils, $sails) {
        var url = utils.prepareUrl('todo');//socket
        var urlRest = utils.prepareUrlRestangular('todo');

        console.log('url ', url)
        this.getAll = function() {

            var deferred = $q.defer();

            $sails.get(url, function(models) {
                return deferred.resolve(models);
            });
            return deferred.promise;
        };

        this.create = function(newModel) {
            var deferred = $q.defer();
           //var url = utils.prepareUrl('todo');
            $sails.post(url, newModel, function(model) {
                return deferred.resolve(model);
            });
            return deferred.promise;
        };

        this.delete = function(model) {
            console.log('model',   model)
            var deferred = $q.defer();
            var url = utils.prepareUrl('todo/' + model.id);
            console.log('url',   url)
            $sails.delete(url, function(model) {
                return deferred.resolve(model);
            });
            return deferred.promise;
        };

        this.update = function(modelu) {
            var deferred = $q.defer();
           // var url = utils.prepareUrl('todo');


            $sails.put(url, modelu, function(model) {
                console.log ('after ',modelu);

                return deferred.resolve(model);
            });

            return deferred.promise;
        };

    }]);
