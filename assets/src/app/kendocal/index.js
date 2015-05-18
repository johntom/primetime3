angular.module('sailng.kendocal', [])

    .config(['$stateProvider', function config($stateProvider) {
        $stateProvider.state('kendocal', {
            url: '/kendocal',
            views: {
                "main": {
                    controller: 'KendocalCtrl',
                    templateUrl: 'kendocal/index.tpl.html'
                }
            }
        });
    }])

    .controller('KendocalCtrl', ['$scope', 'titleService', 'PostsModel', 'TasksModel', 'lodash','$location', function AboutController($scope, titleService, PostsModel, TasksModel, lodash,  $location) {



        titleService.setTitle('Kendocal');
        //PostsModel.getOne('author', 'about').then(function (post) {
        //    console.log('getOne ', post)
        //    $scope.post = post;
        //})
        $scope.form = {};
        $scope.form.filer1 = true;
        $scope.form.filer2 = true;


        $scope.schedulerOptions = {
            date: new Date("2015/5/1"),
            startTime: new Date("2015/5/1 12:00 AM"),
           //timezone: "America/New_York",//US/New York", // Use the London timezone
           //timezone: "Etc/UTC", // Setting the timezone is recommended when binding to a remote service.
         //   timezone: "US/NY",
            height: 600,
            views: [
                "day",

                //{ type: "workWeek", selected: true },
                //"week",

                // "workWeek",
                {type: "week", selected: true},

                "month",
                "agenda",
                {type: "timeline", eventHeight: 50}
            ],

            selectable: true,
            // see event example    change: scheduler_change,
            //timezone: "Etc/UTC",
            timezone: "America/New_York",
            dataSource: {
                type: "json",
                batch:  true,
                transport: {
                    read: function (e) {

                        TasksModel.getAll($scope).then(function (data) {

                            // e.success( new kendo.data.ObservableArray(data));

                            e.success(data);

                        });


                    },
                    //dataSource: {
                    //    batch: true,
                    //    transport: {
                    //        read: {
                    //            url: "http://demos.telerik.com/kendo-ui/service/tasks",
                    //            dataType: "jsonp"
                    //        },
                    //        update: {
                    //            url: "http://demos.telerik.com/kendo-ui/service/tasks/update",
                    //            dataType: "jsonp"
                    //        },
                    update: function (e) {
                        //url: crudServiceBaseUrl + "/Products/Update",
                        //dataType: "jsonp"
                        var task = e.data.models[0];
                        TasksModel.update(task).then(function (model) {
                            e.success();


                        })

                    },

                    create: function (e) {
                        //url: "http://demos.telerik.com/kendo-ui/service/tasks/create",
                        //dataType: "jsonp"
                       // var task = e.data.models[0];
                        //dataType: "json",
                        var task = e.data.models[e.data.models.length-1];
                        console.log('create e ctrl ', task)
                        //
                        TasksModel.create(task).then(function (model) {
                            //  $scope.currentBilling.title = '';
                            e.success();
                            //$scope.ksched.dataSource.read();
                            //$scope.$apply();


                         //   $location('/about')
                        });

                    },
                    //delete:function (e) {
                    //    //url: "http://demos.telerik.com/kendo-ui/service/tasks/destroy",
                    //    //dataType: "jsonp"
                    //    console.log('e ',e)
                    //    var task = e.data.models[0];
                    //    TasksModel.destroy(task).then(function (model) {
                    //        e.success();
                    //
                    //    });
                    //
                    //},
                    destroy:function (e) {
                        //url: "http://demos.telerik.com/kendo-ui/service/tasks/destroy",
                        //dataType: "jsonp"
                        var task = e.data.models[0];
                        TasksModel.destroy(task).then(function () {
                          e.success();
                        });

                    },
                    parameterMap: function (options, operation) {
                        if (operation !== "read" && options.models) {
                            return {models: kendo.stringify(options.models)};
                        }
                    }
                },
                schema: {
                    model: {
                        id: "taskId",
                        fields: {
                            taskId: {from: "TaskID", type: "number"},
                            title: {from: "Title", defaultValue: "No title", validation: {required: true}},
                            start: {type: "date", from: "Start"},
                            end: {type: "date", from: "End"},
                            startTimezone: {from: "StartTimezone"},
                            endTimezone: {from: "EndTimezone"},
                            description: {from: "Description"},
                            recurrenceId: {from: "RecurrenceID"},
                            recurrenceRule: {from: "RecurrenceRule"},
                            recurrenceException: {from: "RecurrenceException"},
                            ownerId: {from: "OwnerID", defaultValue: 1},
                            isAllDay: {type: "boolean", from: "IsAllDay"},
                            attendees: { from: "Attendees", nullable: true },
                            maxAvail: {type:"number",  from: "maxAvail"},
                            taken: {type:"number",from: "taken"}
                            //Reservations:{ from: "Reservations"},
                            //roomId: { from: "RoomID", nullable: true },
                            //attendees: { from: "Attendees", nullable: true },
                        }
                    }
                },

                filter: {
                    logic: "or",
                    filters: [
                        {field: "ownerId", operator: "eq", value: 1},
                        {field: "ownerId", operator: "eq", value: 2}
                    ]
                }
            },
            resources: [
                {
                    field: "ownerId",
                    title: "Owner",
                    dataSource: [
                        {text: "pt3", value: 1, color: "#f8a398"},
                        {text: "jenglo", value: 2, color: "#51a0ed"}
                        //,
                        //{ text: "Charlie", value: 3, color: "#56ca85" }
                    ]
                }
                //,
                //{
                //    field: "attendees",
                //    dataSource: [
                //        { text: "Alex", value: 1, color: "#f8a398" },
                //        { text: "Bob", value: 2, color: "#51a0ed" },
                //        { text: "Charlie", value: 3, color: "#56ca85" }
                //    ],
                //    multiple: true,
                //    title: "Attendees"
                //}
                //,{
                //    field: "maxAvail",
                //    title: "maxAvail",
                //    dataSource: [
                //        {text: "Meeting Room 101", value: 1, color: "#6eb3fa"},
                //        {text: "Meeting Room 201", value: 2, color: "#f58a8a"}
                //    ]
                //},
                //
                //
                //{
                //    taken:  "taken",
                //    title: "taken",
                //    dataSource: [
                //        { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                //        { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
                //    ]
                //}
            ]
        };
        //resources: [
        //    {
        //        field: "roomId",
        //        dataSource: [
        //            { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
        //            { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
        //        ],
        //        title: "Room"
        //    },
        //    {
        //        field: "attendees",
        //        dataSource: [
        //            { text: "Alex", value: 1, color: "#f8a398" },
        //            { text: "Bob", value: 2, color: "#51a0ed" },
        //            { text: "Charlie", value: 3, color: "#56ca85" }
        //        ],
        //        multiple: true,
        //        title: "Attendees"
        //    }
        //]
        //resources: [
        //    {
        //        field: "ownerId",
        //        title: "Owner",
        //        dataSource: [
        //            { text: "Alex", value: 1, color: "#f8a398" },
        //            { text: "Bob", value: 2, color: "#51a0ed" }
        //            //,
        //            //{ text: "Charlie", value: 3, color: "#56ca85" }
        //        ]
        //    },
        //    {
        //        field: "roomId",
        //        dataSource: [
        //            { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
        //            { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
        //        ],
        //        title: "Room"
        //    },
        //    {
        //        field: "attendees",
        //        dataSource: [
        //            { text: "Alex", value: 1, color: "#f8a398" },
        //            { text: "Bob", value: 2, color: "#51a0ed" },
        //            { text: "Charlie", value: 3, color: "#56ca85" }
        //        ],
        //        multiple: true,
        //        title: "Attendees"
        //    }
        //]
        //$scope.event =  function scheduler_navigate(e) {
        //    kendoConsole.log(kendo.format("navigate:: action:{0}; view:{1}; date:{2:d};", e.action, e.view, e.date));
        //}

        $scope.checkSched = function () {
            var checked1 = $scope.form.filer1;
            var checked2 = $scope.form.filer2;
            // scheduler

            $scope.ksched.dataSource.filter({
                operator: function (task) {
                    if ((task.ownerId === 1 && checked1)) {
                        return task;
                    }

                    if ((task.ownerId === 2 && checked2)) {
                        return task;
                    }

                    //if ( (task.ownerId === 1 && checked1) || (task.ownerId === 2 && checked2) ) {
                    //    return task;
                    //}

                }
            });
        };


    }]);
