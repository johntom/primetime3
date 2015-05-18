//https://github.com/awulder/demo-code.wulder.nl/blob/master/angularjs-bootstrap-tabs-demo-code/app/index.html
'use strict';
//ll=lazyloader var blink = angular.module('directive.blink', [])    .directive('blink', ['$timeout', function($timeout) {
var tabset=angular.module('directive.tabsetll', [])
    .directive('tabsetll', function () {
                 return {
                    restrict: 'E',
                    replace: true,
                    transclude: true,
                    controller: function($scope) {
                        $scope.templateUrl = '';
                        var tabs = $scope.tabs = [];
                        var controller = this;

                        this.selectTab = function (tabll) {
                            angular.forEach(tabs, function (tabll) {
                                tabll.selected = false;
                            });
                            tabll.selected = true;
                        };

                        this.setTabTemplate = function (templateUrl) {
                            $scope.templateUrl = templateUrl;
                        }

                        this.addTab = function (tabll) {
                            if (tabs.length == 0) {
                                controller.selectTab(tabll);
                            }
                            tabs.push(tabll);
                        };
                    },
                    template:
                        '<div class="row-fluid">' +
                        '<div class="row-fluid">' +
                        '<div class="nav nav-tabs" ng-transclude></div>' +
                        '</div>' +
                        '<div class="row-fluid">' +
                        '<ng-include src="templateUrl"></ng-include>' +
                        '</div>' +
                        '</div>'
                };
            })
            .directive('tabll', function () {
                return {
                    restrict: 'E',
                    replace: true,
                    require: '^tabsetll',
                    scope: {
                        title: '@',
                        templateUrl: '@'
                    },
                    link: function(scope, element, attrs, tabsetController) {
                        tabsetController.addTab(scope);

                        scope.select = function () {
                            tabsetController.selectTab(scope);
                        }

                        scope.$watch('selected', function () {
                            if (scope.selected) {
                                tabsetController.setTabTemplate(scope.templateUrl);
                            }
                        });
                    },
                    template:
                        '<li ng-class="{active: selected}">' +
                        '<a href="" ng-click="select()">{{ title }}</a>' +
                        '</li>'
                };
            });
