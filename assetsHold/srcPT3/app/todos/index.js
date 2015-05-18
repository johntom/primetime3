angular.module( 'sailng.todos', [
])

//.config(function config( $stateProvider ) {
    .config( ['$stateProvider',function config( $stateProvider ) {

        $stateProvider.state( 'todos', {
		url: '/todos',
		views: {
			"main": {
				controller: 'TodoCtrl',
				templateUrl: 'todos/index.tpl.html'
			}
		},
		data:{ pageTitle: 'Todo' }
	});
}])



    .controller( 'TodoCtrl',['$scope', '$sails', 'lodash', 'config', 'titleService', 'TodoModel','$filter', 'ngTableParams','$location', function TodoController( $scope, $sails, lodash, config, titleService, TodoModel,$filter, ngTableParams,$location ) {

        $scope.newTodo = {};

        $scope.todos = [];
        $scope.currentUser = config.currentUser;

        if ($scope.currentUser===undefined){
           // alert('You must login to view')
            $location.path('/');

            //window.location = '/';exit;
        }


        $scope.stats = [
            {name: 'null', value: 0},
            {name: 'open', value: 1},
            {name: 'InProgress', value: 2},
            {name: 'AlmostComplete', value: 3},
            {name: 'finished', value: 4},
            {name: 'canceled', value: 5}

        ];

        $sails.on('todo', function (envelope) {

            switch(envelope.verb) {
                case 'created':
                    $scope.todos.unshift(envelope.data);

                   // console.log('envelope.data:: ',envelope.data.comoboday, envelope.data)
                  //1  $scope.tableParams.data=  $scope.todos;
                    $scope.tableParams.reload();

                    break;
                case 'destroyed':

                    lodash.remove($scope.todos, {id: envelope.id});
                    $scope.tableParams.data=  $scope.todos;
                    $scope.tableParams.reload();
                    break;
                case 'updated': //
                       console.log('in TodosCtrl updated ',envelope.status,envelope.id,envelope)
                    for (var i in $scope.todos) {
                        if ($scope.todos[i].id == envelope.id) {
                            $scope.todos[i].status = envelope.data.status;

                            $scope.todos[i].isComplete=($scope.todos[i].status==4)?true:false;
                            console.log($scope.todos[i].status==4,$scope.todos[i].status,$scope.todos[i].isComplete);
                            if (  envelope.data.title !== undefined )   $scope.todos[i].title = envelope.data.title;
                        }
                    }
                    $scope.tableParams.data = $scope.todos;
                    $scope.tableParams.reload();
                    break;
            }
        });



        $scope.fetchTodo = function (todo) {
            console.log('fetchTodo  ',todo.title)
//            if (config.currentUser.role === '4') {
            todo.status = 2;
            TodoModel.update(todo).then(function (model) {
                    // message has been deleted, and removed from $scope.messages
                });
  //          }
        };
        $scope.fetchedTodo = function (todo) {
            console.log('fetchedTodo ',todo.title)
           // if (config.currentUser.role === '4') {

               todo.status = 3;
               TodoModel.update(todo).then(function (model) {
                    // message has been deleted, and removed from $scope.messages
                });
           // }
        };
        $scope.finishTodo = function (todo) {
            console.log('finishTodo  ',todo.title)
//            if (config.currentUser.role === '4') {
            todo.status = 4;
            TodoModel.update(todo).then(function (model) {
                // message has been deleted, and removed from $scope.messages
            });
            //          }
        };

        $scope.destroyTodo = function(todo) {
            console.log('todo ',todo.title)
            TodoModel.delete(todo).then(function(model) {
                // todo has been deleted, and removed from $scope.todos
             //   lodash.remove($scope.todos, {id: todo.id});
            });
        };

        $scope.createTodo = function(newTodo) {
           // console.log('new ',newTodo);
            upTodo = {};
            newTodo.user = config.currentUser.id;
            newTodo.status = 1;
            angular.copy(newTodo,upTodo);
            newTodo.title ='';
            TodoModel.create(upTodo).then(function(model) {
                alert ('in todo')
                console.log('$scope.newTodo.title =""');
                //= {};
            });
        };

        // var   messPromise =  MessageModel.getAll($scope);
        // messPromise.then(function (models) {
      // console.log('TodoModel '  )
        TodoModel.getAll($scope).then(function(models) {
           // console.log('TodoModel2')
            $scope.todos = models.data;
            var data =$scope.todos;
           // console.log('data ',data)
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 25,          // count per page
                sorting: {
                    //  comboday: 'asc'     // initial sorting
                    title: 'asc'
                }
            }, {
                 total: data.length,
                getData: function($defer, params) {
                    var orderedData = params.sorting() ?
                        $filter('orderBy')(data, $scope.tableParams.orderBy()) :
                        data;
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        });
        console.log('  $scope.todos ',  $scope.todos)

        // hierarchical data
        $scope.treeData = [
            { name: '\u266B Adriane Simione', items: [
                { name: '\u266A Intelligible Sky', items: [
                    { name: 'Theories', atype:'soul', length: '2:02' },
                    { name: 'Giant Eyes',  atype:'soul',length: '3:29' },
                    { name: 'Jovian Moons', atype:'soul', length: '1:02' },
                    { name: 'Open Minds', atype:'soul',length: '2:41' },
                    { name: 'Spacetronic Eyes', atype:'soul', length: '3:41' }]
                }
            ]},
            { name: '\u266B Amy Winehouse', items: [
                { name: '\u266A Back to Black', items: [
                    { name: 'Addicted@!', length: '1:34' ,atype:'soul'},
                    { name: 'He Can Only Hold Her', length: '2:22' ,atype:'rb'},
                    { name: 'Some Unholy War', length: '2:21' ,atype:'rs'},
                    { name: 'Wake Up Alone', length: '3:43' ,atype:'jam'},
                    { name: 'Tears Dry On Their Own', length: '1:25' ,atype:'engbeat'}]

                },
                { name: '\u266A Live in Paradiso', items: [
                    { name: "You Know That I'm No Good", length: '2:32' },
                    { name: 'Wake Up Alone', length: '1:04' },
                    { name: 'Valerie', length: '1:22' },
                    { name: 'Tears Dry On Their Own', length: '3:15' },
                    { name: 'Rehab', length: '3:40' }]
                }]
            },
            { name: '\u266B Black Sabbath', items: [
                { name: '\u266A Heaven and Hell', items: [
                    { name: 'Neon Knights', length: '3:03' },
                    { name: 'Children of the Sea', length: '2:54' },
                    { name: 'Lady Evil', length: '1:43' },
                    { name: 'Heaven and Hell', length: '2:23' },
                    { name: 'Wishing Well', length: '3:22' },
                    { name: 'Die Young', length: '2:21' }]
                },
                { name: '\u266A Never Say Die!', items: [
                    { name: 'Swinging The Chain', length: '4:32' },
                    { name: 'Breakout', length: '3:54' },
                    { name: 'Over To You', length: '2:43' },
                    { name: 'Air Dance', length: '1:34' },
                    { name: 'Johnny Blade', length: '1:02' },
                    { name: 'Never Say Die', length: '2:11' }]
                },
                { name: '\u266A Paranoid', items: [
                    { name: 'Rat Salad', length: '3:44' },
                    { name: 'Hand Of Doom', length: '4:21' },
                    { name: 'Electric Funeral', length: '2:12' },
                    { name: 'Iron Man', length: '3:22' },
                    { name: 'War Pigs', length: '3:13' }]
                }]
            },
            { name: '\u266B Brand X', items: [
                { name: '\u266A Unorthodox Behaviour', items: [
                    { name: 'Touch Wood', length: '2:54' },
                    { name: 'Running of Three', length: '1:34' },
                    { name: 'Unorthodox Behaviour', length: '2:23' },
                    { name: 'Smacks of Euphoric Hysteria', length: '3:12' },
                    { name: 'Euthanasia Waltz', length: '2:22' },
                    { name: 'Nuclear Burn', length: '4:01' }]
                }]
            }
        ];
console.log('$scope.treeData ',$scope.treeData)

    }]);

