angular.module('models.contact', ['lodash', 'services', 'ngSails'])

    .service('ContactModel',['$q', 'lodash', 'utils', '$sails','Restangular', function($q, lodash, utils, $sails,Restangular) {
        var url = utils.prepareUrl('contact');//socket
        var urlRest = utils.prepareUrlRestangular('contact');
        // this uses restangular
        //server getList in routes   'get /api/posts': 'PostsController.getList',
        this.getAll = function () {
            var deferred = $q.defer();
            var Contact = Restangular.all(urlRest);
            Contact.customGET().then(function (contact) {

                deferred.resolve(contact);
            });
            return deferred.promise;
        },

            this.getOne = function () {
                var deferred = $q.defer();
                console.log('rest ',urlRest+'/1')
                var Contact = Restangular.all(urlRest+'/1');
                Contact.customGET().then(function (contact) {
                    //alert(posts[0]);
                    deferred.resolve(contact.data);
                });
                return deferred.promise;
            },

            this.create = function (contact) {
               // alert('con '+contact)
                var deferred = $q.defer();
                var urlRest = 'api/contact';
                var Contact = Restangular.all(urlRest);
                //customPOST returns an object Post return array
                Contact.customPOST(contact).then(function (response) {
                    //alert(posts[0]);
                    console.log('set myData cache data', response.data)

                    deferred.resolve(response.data);
                });
                return deferred.promise;
            }
        //create: function (recs) {
        //    //    { method: 'POST', params: {id: '@id'} }
        //    // restangular customGET does a get with object
        //    var url = 'api/daily';
        //    var deferred = $q.defer();
        //    Daily = Restangular.all(url);
        //    Daily.customPOST(recs).then(function (response) {
        //        console.log('set myData cache ', response)
        //        //   myCache.put('myData', response.data);
        //        deferred.resolve(response);//.data);
        //        // res.json(200, { "status": "success", "batch": nextno,"mustlogin":req.user === undefined});
        //
        //    })
        //    return deferred.promise;
    }]);
