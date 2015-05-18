angular.module('models.user', ['lodash', 'services', 'ngSails'])

    .service('UserModel', ['$q', 'lodash', 'utils', '$sails', function ($q, lodash, utils, $sails) {
        var url = utils.prepareUrl('user');

        this.getAll = function () {
            var deferred = $q.defer();
            $sails.get(url, function (models) {
                return deferred.resolve(models);
            });
            return deferred.promise;
        };

        this.update = function (modelu) {
            var deferred = $q.defer();
            console.log('update user model ',modelu,url)
            $sails.put(url, modelu, function (model) {
                console.log('after ', modelu);
                return deferred.resolve(model);
            });
            return deferred.promise;
        };

        this.create = function (newModel) {
            var deferred = $q.defer();
            $sails.post(url, newModel, function (model) {
                return deferred.resolve(model);
            });
            return deferred.promise;
        };
    }]);