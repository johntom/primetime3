angular.module('sailng.booking', [])

    .config(['$stateProvider', function config($stateProvider) {
        $stateProvider.state('booking', {
            url: '/booking',
            views: {
                "main": {
                    controller: 'BookingCtrl',
                    templateUrl: 'booking/index.tpl.html'
                }
            }
        })
            .state('booking.id', {
                url: '/:id',
                views: {
                    'main2': {
                        // controller: 'ClaimCtrlDaily',
                        templateUrl: 'booking/index2.tpl.html'
                    }
                }
                ,
                data: {pageTitle: 'Detail'}
            })
            .state('booking.item', {
                url: '/item/:id',
                views: {
                    'main3': {

                        templateUrl: 'booking/index3.tpl.html'
                    }
                }
                ,
                data: {pageTitle: 'Detail'}
            })

            //http://www.jvandemo.com/how-to-resolve-angularjs-resources-with-ui-router/
            .state('bookingPopup.item', {
                /**
                 * Only the URL is required, you don't need a controller or a template for the state
                 */
                url: '/item/:id',
                /**
                 * Open the modal window when the onEnter event is fired
                 */
                resolve: {
                    // A string value resolves to a service
                    titleService: 'titleService',
                    // A function value resolves to the return
                    // value of the function
                    trip: function (titleService, $stateParams) {
                        var id = $stateParams.id;
                        // Return a promise to make sure the customer is completely
                        // resolved before the controller is instantiated
                        // alert('ins '+id+' '+titleService.trip.Title)
                        return titleService.trip.$promise;
                    }
                },
                onEnter: function ($modal) {
                    $modal.open({
                        templateUrl: 'booking/indexPopup.tpl.html',

                        controller: function ($scope, $stateParams, titleService) {
                            // do whatever you need here.
                            // alert('inb '+$stateParams.id)//+' '+trip);//$scope.item)
                            $scope.item = titleService.trip;


                        }
                    });
                }
                //var deferred = $q.defer();
                //    var modalInstance = $modal.open({
                //    templateUrl: 'myCodes.html',
                //    controller: 'ModalInstanceCtrlCodes',
                //    size: 'sm',//size,
                //    backdrop: 'static',
                //    resolve: {
                //        items: function () {
                //
                //            return $scope.items;
                //        }
                //    }
                //});
                //modalInstance.result.then(function (selectedItem) {
                //
                //});
///////////////////////////////////////////////////////////////////////////////////////////////////////////
            })


    }])
// booking Booking BookingCtrl
    //.controller('BookingCtrl', ['$scope', 'titleService', 'PostsModel', function AboutController($scope, titleService, PostsModel) {
    .controller('BookingCtrl', ['$scope', '$sails', 'lodash', 'config', 'titleService', 'BookingModel', 'InventoryModel', '$filter', 'ngTableParams', 'PostsModel', 'TasksModel',
        '$location', function BookingController($scope, $sails, lodash, config, titleService, BookingModel, InventoryModel, $filter, ngTableParams, PostsModel, TasksModel, $location) {

console.log('startemup')
            TasksModel.getAll($scope).then(function (data) {

                $scope.trips = data;
                $scope.totalItems = $scope.trips.length;
                $scope.currentPage = 1;

                $scope.pageSize = 10;
            });

            titleService.setTitle('Booking');

            $scope.billingopen = false;
            $scope.book = {};

            $scope.cancel = function () {
               //  alert('cancel')
                $scope.book = {};
                $scope.billingopen = false;
                $location.path('/booking');
            };
            $scope.createBilling = function (trip) {
                $scope.book.total = $scope.book.qty * trip.tripprice;
                $scope.book.balance = $scope.book.total - $scope.book.deposit;
                //   alert('about to bill ' + trip.Start)
                var formData = [{book: $scope.book, trip: $scope.trip}];
                //console.log('event ', formData)
                TasksModel.updateBooking(formData).then(function (model) {

                    $scope.billingopen = false;
                    // until we do sockets update model
                    var idz = lodash.findIndex($scope.trips, function (trip) {
                        return trip.id === model.id;
                    });
                    console.log(idz);//cdt,
                    if (idz > -1) {
                        console.log('model ', model)
                        $scope.trips[idz] = model;
                    }
                    ;
                    $scope.book = {};
                    $location.path('/booking');
                });
            };

            PostsModel.getOne('author', 'booking').then(function (post) {
              //  console.log('getOne ', post)
                $scope.post = post;
            })

            $scope.stats = [
                {name: 'reserved', value: 0},
                {name: 'reserved-away', value: 1},
                {name: 'reserved-back', value: 2},
                {name: 'desk available', value: 3}

            ];
            $scope.setCurrentClaim = function (trip) {
                $scope.trip = trip;
                $scope.billingopen = true;
                $scope.book.qty = 0;
                $location.path('/booking/' + trip.id);
            };
            $scope.setCurrentClaimTest = function (trip) {
                //alert('this will open claim form ' + trip.Start)
                // this is admin page
                $scope.trip = trip;
                titleService.trip = trip;

                var data;
                $scope.trip = trip;
                data = $scope.trip.details;
                $scope.book = data;
               // console.log('trip ', $scope.trip)
                //  titleService.trip = trip; this is for popup

                //$scope.tableParamsBook = new ngTableParams({
                //    page: 1,            // show first page
                //    count: 10           // count per page
                //    , sorting: {
                //        contractdate: 'asc'     // initial sorting
                //    }
                //}, {
                //    counts: [], // hide page counts control
                //    total: 1,  // value less than count hide pagination
                //    getData: function ($defer, params) {
                //        // use build-in angular filter
                //        var orderedData = params.sorting() ?
                //            $filter('orderBy')(data, params.orderBy()) :
                //            data;
                //        orderedData = params.filter() ?
                //            $filter('filter')(orderedData, params.filter()) :
                //            orderedData;
                //
                //        params.total(orderedData.length); // set total for recalc pagination
                //        //0.2.0  $defer.resolve($scope.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                //        $defer.resolve($scope.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                //    }
                //})

                $location.path('/booking/item/' + trip.id);
            };

            getDesks = function (cdt) {
                var idz = lodash.findIndex($scope.desks, function (desk) {
                    return desk.cdate === cdt;
                });
                console.log(idz);//cdt,

                if (idz > 0) {
                    $scope.desks1day = lodash.filter($scope.desks[idz].details, function (num) {

                        return num.avail === 0;
                    });
                }
            }

            InventoryModel.getAll($scope).then(function (models) {
               // console.log('Ctrl InventoryModel')
                $scope.desks = models.data;
                //console.log('Inventory::', $scope.desks)
                var cdt = moment().format("MM/DD/YYYY");
                getDesks(cdt);
               // console.log('Inventory1::', $scope.desks1day)
            });


//http://plnkr.co/edit/WBt1BGAqBnecEdv1jqfu?p=preview

            $scope.selectDate = function (dt) {
                var cdt = moment(dt).format("MM/DD/YYYY");
                getDesks(cdt);

            }

            $scope.desktotal = 17;
            $scope.maxed = false;
            $scope.newHotelling = {};
            $scope.hotellings = [];
            $scope.currentUser = config.currentUser;
           // console.log('scope.currentUser.data:: ', $scope.currentUser)

            $scope.createHotelling = function (newHotelling) {
                //alert($scope.trip)
                //newHotelling.user = config.currentUser.id;
                //newHotelling.status = '1';
                //console.log('new:: ', newHotelling)
                //if (newHotelling.floor === '') {
                //    alert('resource has been used. please re-select')
                //}
                //else
                //    BookingModel.create(newHotelling).then(function (model) {
                //        $scope.newHotelling.title = '';
                //        console.log('BookingModel.create ', $scope.desks1day, $scope.newHotelling.floor);
                //
                //    });
            };


            $scope.toggleMin = function () {
                $scope.minDate = ( $scope.minDate ) ? null : new Date();
            };
            $scope.toggleMin();

            $scope.open = function ($event) {
                //$event.preventDefault();
                //$event.stopPropagation();

                $scope.opened = true;
            };


            $scope.newHotelling.date = new Date();

            $scope.hstep = 1;
            $scope.mstep = 15;


            $scope.ismeridian = true;
            $scope.toggleMode = function () {
                $scope.ismeridian = !$scope.ismeridian;
            };


            $scope.changed = function () {
                console.log('Time changed to: ' + $scope.newHotelling.date);
            };

            $scope.clear = function () {
                $scope.newHotelling.date = null;
            };

            $scope.checkEvent = function (row) {

              //  alert('row ' + row)
            };
            $scope.changeSelection = function (hotelling) {
                console.info(hotelling);
            }


            $scope.pageChangeHandler = function (num) {
                console.log('going to page ' + num);
            };

            $scope.setPage = function (pageNo) {
                $scope.currentPage = pageNo;
            };

            $scope.pageChanged = function () {
                $log.log('Page changed to: ' + $scope.currentPage);
            };

            $scope.maxSize = 5;
            $scope.bigTotalItems = 175;
            $scope.bigCurrentPage = 1;
            function roundToTwo(num) {
                return +(Math.round(num + "e+2") + "e-2");
            }

            $scope.beforesaveDetail = function (data, index, lineitem) {
                // data is new value;  lineitem is still old value
                var subttotal = 0;
                var subqty = 0;
                lodash.each($scope.book, function (num, key) {

                    //subttotal =  roundToTwo(num.qty * $scope.trip.tripprice);
                    if (key===index){
                        subqty += data.qty;
                    } else {
                        subqty += num.qty;
                    }
                });
                $scope.trip.taken = subqty;
               // console.log(lineitem, data)
               $scope.book[index].qty = data.qty;
               $scope.book[index].total = data.qty * $scope.trip.tripprice;;//$scope.book[index].qty * $scope.trip.tripprice;
            };
           // $scope.aftersaveDetail = function (data) {
                $scope.aftersaveDetail = function (data, index, lineitem) {
                // if we are here that means the line changes has been accepted
                $scope.book[index].qty = data.qty;
                $scope.book[index].total = data.qty * $scope.trip.tripprice;;//$scope.book[index].qty * $scope.trip.tripprice;
            }

            $scope.saveBook = function (bookedtrip) {
                //save to mongo
                 // delete all with 0
               // bookedtrip=task
                lodash.each(bookedtrip, function (num, key) {

                    //subttotal =  roundToTwo(num.qty * $scope.trip.tripprice);
                    if (num.qty===0){
                        bookedtrip.splice(key,1)
                        $scope.book.splice(key,1)
                    } else {
                        bookedtrip[key].total =  $scope.trip.tripprice * num.qty;
                    }
                });
                var formData = [{book: bookedtrip, trip: $scope.trip}];
                //console.log('355 ',formData,$scope.book)
                 TasksModel.updateTrip(formData).then(function (model) {

                   // $location.path('/booking');
                });
            };

            $scope.checkQty = function (data, id, lineitem, q) {
                // data is new value;  lineitem is old value
                if (is_float(data) !== true) {
                    return "must me a number";
                }
                var maxamt = 0;

                if (is_gtmac(data, lineitem) === true) {
                    return "> than max";
                }

            };
            is_float = function (v) {
                return !isNaN(v) && isFinite(v) &&
                    (typeof(v) == 'number' || v.replace(/^\s+|\s+$/g, '').length > 0);
            }

            is_gtmac = function (data, lineitem) {
                // var apos = lodash.findIndex($scope.book, function (file) {
                //    return file.filing === code;
                //});
                // get the differential
                var diff = data - lineitem.qty;
               // console.log('$scope.book ', $scope.book)
                if (diff <0 ){
                    return false
                } else {
                    maxamt = $scope.trip.taken + diff;
                    var avail = $scope.trip.spots - maxamt;
                    return data > avail;
                }
            }


        }])


    .controller('ModalInstanceCtrlCodes', ['$scope', '$modalInstance', 'items', function ($scope, $modalInstance, items) {

        $scope.items = items;
        $scope.selected = {
            item: $scope.items[0]
        };
        //alert('$scope.selected.item '+items,$scope.selected);//$scope.selected.item)
        $scope.ok = function () {
            $modalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {

            $modalInstance.dismiss('cancel');
        };
    }])


//$scope.saveBook = function (bookedtrip) {
//    //save to mongo
//    //If you use angular.toJson(obj) instead of JSON.stringify(obj) then Angular will strip out these internal-use values for you.
//    //http://mutablethought.com/2013/04/25/angular-js-ng-repeat-no-longer-allowing-duplicates/
//    //            JSON.stringify(value, function (key, val) {
//    //                if (key == '$$hashKey') {
//    //                    return undefined;
//    //                }
//    //                return val;
//    //            });
//    // this is how we close the index2 form
//    //$scope.book.total = $scope.book.qty * trip.tripprice;
//    //$scope.book.balance = $scope.book.total - $scope.book.deposit;
//    //   alert('about to bill ' + trip.Start)
//    // var formData = [{book: $scope.book, trip: $scope.trip}];
//
//    // TasksModel.updateBooking(formData).then(function (model) {
//
//    //// until we do sockets update model
//    //var idz = lodash.findIndex($scope.trips, function (trip) {
//    //    return trip.id === model.id;
//    //});
//    ////console.log(idz);//cdt,
//    //if (idz > -1) {
//    //    console.log('model ', model)
//    //    $scope.trips[idz] = model;
//    //}  ;
//    //$scope.book = {};
//    // TasksModel.update($scope.trip).then(function (model) {
//
//    // delete all with 0
//    lodash.each(bookedtrip, function (num, key) {
//
//        //subttotal =  roundToTwo(num.qty * $scope.trip.tripprice);
//        if (num.qty===0){
//            bookedtrip.splice(key,1)
//            $scope.book.splice(key,1)
//        }
//
//    });
//    var formData = [{book: bookedtrip, trip: $scope.trip}];
//    TasksModel.updateTrip(formData).then(function (model) {
//
//        $location.path('/booking');
//    });
//;