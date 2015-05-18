var blink = angular.module('directive.blink', [])
    .directive('blink', ['$timeout', function($timeout) {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: function($scope, $element) {
                function showElement() {
                    $element.css("display", "inline");
                    $timeout(hideElement, 1000);
                }

                function hideElement() {
                    $element.css("display", "none");
                    $timeout(showElement, 1000);
                }
                showElement();
            },
            template: '<span ng-transclude></span>',
            replace: true
        };
    }])
.directive('styleParent', function(){
    return {
        restrict: 'A',
        link: function(scope, elem, attr) {
            elem.on('load', function() {
               // alert('in iii');

                var w = $(this).width(),
                    h = $(this).height();
                console.log('w h ',w,h);
                var div = elem.parent();

                //check width and height and apply styling to parent here.
            });
        }
    };
})
        .directive('ngConfirmClick', [
            function(){
                return {
                    link: function (scope, element, attr) {
                        var msg = attr.ngConfirmClick || "Are you sure?";
                        var clickAction = attr.confirmedClick;
                        element.bind('click',function (event) {
                            if ( window.confirm(msg) ) {
                                scope.$eval(clickAction)
                            }
                        });
                    }
                };
            }])
    .directive('myFocus', function () {
        return {
            restrict: 'A',
            link: function postLink(scope, element, attrs) {
                if (attrs.myFocus == "") {
                    attrs.myFocus = "focusElement";
                }
                scope.$watch(attrs.myFocus, function(value) {
                    if(value == attrs.id) {
                        element[0].focus();
                    }
                });
                element.on("blur", function() {
                    scope[attrs.myFocus] = "";
                    scope.$apply();
                })
            }
        };
    })
//rows="4" cols="50"
//    .directive('iiMdPreview', function() {
//        return {
//            template: "<div><textarea rows='20' cols='100' class='MdPreview-markdown' name='{{textareaName}}' ng-model='markdown' ng-change='md2Html()'></textarea><div class='MdPreview-html' ng-bind-html='htmlSafe' /></div>",
//            restrict: 'C',
//            replace: true,
//            controller: 'PostCtrl',
//            scope: {},
//            link: function(scope, element, attrs) {
//                if (attrs.url) {
//                    scope.initFromUrl(attrs.url);
//                }
//                if (attrs.text) {
//                    scope.initFromText(attrs.text);
//                }
//                scope.textareaName = attrs.textareaName;
//            }
//        };
//    })
    .directive('iiMdPreview', function() {
        return {
            template: "<div class='col-md-12'><textarea rows='30'  class='col-md-6' class='MdPreview-markdown' name='{{textareaName}}' ng-model='markdown' ng-change='md2Html()'></textarea><div class='col-md-6 MdPreview-html' ng-bind-html='htmlSafe' /></div></div>",
            restrict: 'C',
            replace: true,
            controller: 'PostCtrl',
            scope: {},
            link: function(scope, element, attrs) {
                if (attrs.url) {
                    scope.initFromUrl(attrs.url);
                }
                if (attrs.text) {
                    scope.initFromText(attrs.text);
                }
                scope.textareaName = attrs.textareaName;
            }
        };
    })

    //public/modules/posts/tagCollection.dir.js from blog-it
    .directive('blogItTagCollection', [function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                tags: '=blogItTagCollection'
            },
            template: '<div>' +
            '<input list="tags" ng-model="current"/>' +
            '<ul class="tag-collection">' +
            '<li class="tag-item btn" ng-repeat="tag in tags track by $index">{{ tag }}<button type="button" ng-click="removeElement(tag)" class="icon btn icon-close tool-item"></button></li>' +
            '</ul>' +
            '</div>',
            link: function (scope, element, attr) {

                var input = ng.element(element.children()[0]);

                scope.tags = scope.tags || [];

                scope.removeElement = function (tag) {
                    var index = scope.tags.indexOf(tag);
                    if (index !== -1) {
                        scope.tags.splice(index, 1);
                    }
                };

                input.bind('keydown', function (event) {
                    if (event.which === 13) {
                        scope.$apply(function () {
                            scope.tags.push(scope.current);
                            scope.current = '';
                        });
                        event.preventDefault();
                    }
                });
            }
        };
    }])


      .directive('ngToggle',['$timeout', function($timeout) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                config: '=?',
                ngChange: '&?',
                ngToggleChange: '&?',
                val: '=ngModel',
                ngDefault: '=?',
                ngTrueVal: '=?',
                ngFalseVal: '=?',
                ngNullVal: '=?',
                ngWidth: '=?',
                ngHeight: '=?',
                ngTrueTip: '=?',
                ngFalseTip: '=?',
                ngNullTip: '=?',
            },
            template: '<div class="ng-toggle-wrap" ng-style="styleWrap" ng-class="{\'vertical\': vertical}"><div class="ng-toggle-switch" ng-style="styleSwitch" ng-class="{\'true\': val==ngTrueVal, \'false\': val==ngFalseVal}" ng-click="toggle()"><div class="ng-toggle-false"></div><div class="ng-toggle-true"></div><div class="ng-toggle-handle" ng-style="styleHandle"></div></div><div class="ng-toggle-tooltip" ng-show="tooltip"><span ng-class="{\'active\': showTooltip1}"><span ng-show="tooltip1">&bull;&nbsp;</span>{{tooltip1}}&nbsp;</span><br ng-show="triToggle"><span ng-class="{\'active\': showTooltip2}" ng-show="triToggle"><span ng-show="tooltip2">&bull;&nbsp;</span>{{tooltip2}}&nbsp;</span><br><span ng-class="{\'active\': showTooltip3}"><span ng-show="tooltip3">&bull;&nbsp;</span>{{tooltip3}}&nbsp;</span></div></div>',
            link: function(scope, element, attrs) {

                /* Catch Config, allow attr overrides */

                if (angular.isDefined(scope.config)) {

                    /* Tri-toggle Setting */

                    if (angular.isDefined(scope.config.triToggle) && !angular.isDefined(attrs.triToggle)) {
                        if (scope.config.triToggle) {
                            attrs.triToggle = scope.config.triToggle;
                        }
                    }

                    /* ngChange Function */

                    if (angular.isDefined(scope.config.change) && !angular.isDefined(scope.ngChange)) {
                        scope.ngChange = scope.config.change;
                    }

                    /* ngToggleChange Function */

                    if (angular.isDefined(scope.config.toggleChange) && !angular.isDefined(scope.ngToggleChange)) {
                        scope.ngToggleChange = scope.config.toggleChange;
                    }

                    /* Model Binding */

                    if (angular.isDefined(scope.config.val) && !angular.isDefined(scope.val)) {
                        scope.val = scope.config.val;
                    }

                    /* Default Value */

                    if (angular.isDefined(scope.config.default) && !angular.isDefined(scope.ngDefault)) {
                        scope.ngDefault = scope.config.
                            default;
                    }

                    /* Values */

                    if (angular.isDefined(scope.config.trueVal) && !angular.isDefined(scope.ngTrueVal)) {
                        scope.ngTrueVal = scope.config.trueVal;
                    }
                    if (angular.isDefined(scope.config.falseVal) && !angular.isDefined(scope.ngFalseVal)) {
                        scope.ngFalseVal = scope.config.falseVal;
                    }
                    if (angular.isDefined(scope.config.nullVal) && !angular.isDefined(scope.ngNullVal)) {
                        scope.ngNullVal = scope.config.nullVal;
                    }

                    /* Width & Height */

                    if (angular.isDefined(scope.config.width) && !angular.isDefined(scope.ngWidth)) {
                        scope.ngWidth = scope.config.width;
                    }
                    if (angular.isDefined(scope.config.height) && !angular.isDefined(scope.ngHeight)) {
                        scope.ngHeight = scope.config.height;
                    }

                    /* Custom Colors */

                    if (angular.isDefined(scope.config.falseColor) && !angular.isDefined(attrs.ngFalseColor)) {
                        attrs.ngFalseColor = scope.config.falseColor;
                    }
                    if (angular.isDefined(scope.config.nullColor) && !angular.isDefined(attrs.ngNullColor)) {
                        attrs.ngNullColor = scope.config.nullColor;
                    }
                    if (angular.isDefined(scope.config.trueColor) && !angular.isDefined(attrs.ngTrueColor)) {
                        attrs.ngTrueColor = scope.config.trueColor;
                    }

                    /* Vertical Setting */

                    if (angular.isDefined(scope.config.vertical) && !angular.isDefined(attrs.vertical)) {
                        attrs.vertical = scope.config.vertical;
                    }

                    /* ToolTips */

                    if (angular.isDefined(scope.config.trueTip) && !angular.isDefined(scope.ngTrueTip)) {
                        scope.ngTrueTip = scope.config.trueTip;
                    }
                    if (angular.isDefined(scope.config.falseTip) && !angular.isDefined(scope.ngFalseTip)) {
                        scope.ngFalseTip = scope.config.falseTip;
                    }
                    if (angular.isDefined(scope.config.nullTip) && !angular.isDefined(scope.ngNullTip)) {
                        scope.ngNullTip = scope.config.nullTip;
                    }
                    if (!angular.isDefined(scope.ngTrueTip) && !angular.isDefined(scope.ngFalseTip) && !angular.isDefined(scope.ngNullTip)) {
                        scope.tooltip = false;
                    } else {
                        scope.tooltip = true;
                    }
                }

                /* Default Styling */

                scope.triToggle = false;
                scope.vertical = false;
                scope.styleWrap = {};
                scope.styleSwitch = {};
                scope.styleHandle = {};

                /* Is TriToggle? */

                if (angular.isDefined(attrs.triToggle)) {
                    scope.triToggle = true;
                }

                /* Custom Container Size */

                if (angular.isDefined(scope.ngWidth)) {
                    scope.styleWrap['width'] = scope.ngWidth + 6 + 'px';
                }
                if (angular.isDefined(scope.ngHeight)) {
                    scope.styleWrap['height'] = scope.ngHeight + 6 + 'px';
                }

                /* Custom Switch and Handle Size */

                if (angular.isDefined(attrs.vertical) && attrs.vertical) {

                    scope.vertical = true;

                    scope.tooltip1 = scope.ngTrueTip;
                    scope.tooltip2 = scope.ngNullTip;
                    scope.tooltip3 = scope.ngFalseTip;

                    if (angular.isDefined(scope.ngWidth)) {
                        scope.styleSwitch['height'] = scope.ngWidth + 'px';
                        scope.styleHandle['height'] = scope.ngWidth - 6 + 'px';
                    }
                    if (angular.isDefined(scope.ngHeight)) {
                        scope.styleSwitch['width'] = scope.ngHeight + 'px';
                        scope.styleHandle['width'] = scope.ngHeight * 0.428 + 'px';
                    }
                } else {

                    scope.tooltip1 = scope.ngFalseTip;
                    scope.tooltip2 = scope.ngNullTip;
                    scope.tooltip3 = scope.ngTrueTip;

                    if (angular.isDefined(scope.ngWidth)) {
                        scope.styleSwitch['width'] = scope.ngWidth + 'px';
                        scope.styleHandle['width'] = scope.ngWidth * 0.428 + 'px';
                    }
                    if (angular.isDefined(scope.ngHeight)) {
                        scope.styleSwitch['height'] = scope.ngHeight + 'px';
                        scope.styleHandle['height'] = scope.ngHeight - 6 + 'px';
                    }
                }

                /* Custom Border Radii */

                if (angular.isDefined(scope.ngWidth) && angular.isDefined(scope.ngHeight)) {
                    if (scope.ngWidth <= scope.ngHeight) {
                        scope.styleSwitch['border-radius'] = (scope.ngHeight + 6) / 2 + 'px';
                        scope.styleHandle['border-radius'] = scope.ngHeight / 2 + 'px';
                    } else {
                        scope.styleSwitch['border-radius'] = (scope.ngWidth + 6) / 2 + 'px';
                        scope.styleHandle['border-radius'] = scope.ngWidth / 2 + 'px';
                    }
                } else if (angular.isDefined(scope.ngWidth)) {
                    if (scope.ngWidth <= 30) {
                        scope.styleSwitch['border-radius'] = 18 + 'px';
                        scope.styleHandle['border-radius'] = 15 + 'px';
                    } else {
                        scope.styleSwitch['border-radius'] = (scope.ngWidth + 6) / 2 + 'px';
                        scope.styleHandle['border-radius'] = scope.ngWidth / 2 + 'px';
                    }
                } else if (angular.isDefined(scope.ngHeight)) {
                    if (scope.ngHeight >= 56) {
                        scope.styleSwitch['border-radius'] = 31 + 'px';
                        scope.styleHandle['border-radius'] = 28 + 'px';
                    } else {
                        scope.styleSwitch['border-radius'] = (scope.ngHeight + 6) / 2 + 'px';
                        scope.styleHandle['border-radius'] = scope.ngHeight / 2 + 'px';
                    }
                }

                /* Custom CSS Color Overrides */

                function updateCustomColor() {
                    switch (scope.val) {
                        case scope.ngTrueVal:
                            if (angular.isDefined(attrs.ngTrueColor)) {
                                scope.styleSwitch['background-color'] = attrs.ngTrueColor;
                            }
                            break;
                        case scope.ngFalseVal:
                            if (angular.isDefined(attrs.ngFalseColor)) {
                                scope.styleSwitch['background-color'] = attrs.ngFalseColor;
                            }
                            break;
                        default:
                            if (scope.triToggle) {
                                if (angular.isDefined(attrs.ngNullColor)) {
                                    scope.styleSwitch['background-color'] = attrs.ngNullColor;
                                }
                            }
                            break;
                    }
                }

                /* Custom Position Maintenance */

                function updatePosition() {
                    if (scope.val === scope.ngFalseVal) {
                        if (angular.isDefined(scope.ngWidth)) {
                            scope.styleHandle['left'] = 3 + 'px';
                        }
                    } else if (scope.val === scope.ngNullVal) {
                        if (scope.triToggle) {
                            if (angular.isDefined(attrs.vertical) && attrs.vertical) {
                                if (angular.isDefined(scope.ngHeight)) {
                                    scope.styleHandle['left'] = scope.ngHeight * 0.22 + 3 + 'px';
                                }
                            } else if (angular.isDefined(scope.ngWidth)) {
                                scope.styleHandle['left'] = scope.ngWidth * 0.22 + 3 + 'px';
                            }
                        }
                    } else {
                        if (angular.isDefined(attrs.vertical) && attrs.vertical) {
                            if (angular.isDefined(scope.ngHeight)) {
                                scope.styleHandle['left'] = (scope.ngHeight) * 0.517 + 'px';
                            }
                        } else if (angular.isDefined(scope.ngWidth)) {
                            scope.styleHandle['left'] = (scope.ngWidth) * 0.517 + 'px';
                        }
                    }
                }

                /* Custom Tooltip */

                function updateTooltip() {
                    scope.showTooltip1 = false;
                    scope.showTooltip2 = false;
                    scope.showTooltip3 = false;
                    if (scope.val === scope.ngTrueVal) {
                        if (scope.vertical) {
                            scope.showTooltip1 = true;
                        } else {
                            scope.showTooltip3 = true;
                        }
                    } else if (scope.val === scope.ngFalseVal) {
                        if (scope.vertical) {
                            scope.showTooltip3 = true;
                        } else {
                            scope.showTooltip1 = true;
                        }
                    } else {
                        if (scope.triToggle) {
                            scope.showTooltip2 = true;
                        }
                    }
                }

                /* Logic */

                scope.toggle = function() {
                    if (scope.val === scope.ngTrueVal) {
                        scope.val = scope.ngFalseVal;
                    } else if (scope.val === scope.ngFalseVal && scope.triToggle) {
                        scope.val = scope.ngNullVal;
                    } else {
                        scope.val = scope.ngTrueVal;
                    }
                    if (typeof scope.ngToggleChange != 'undefined') {
                        $timeout(function() {
                            scope.ngToggleChange(scope.val);
                        });
                    }
                };

                scope.$watch('val', function() {
                    updateCustomColor();
                    updatePosition();
                    updateTooltip();
                    if (typeof scope.ngChange != 'undefined') {
                        $timeout(function() {
                            scope.ngChange(scope.val);
                        });
                    }
                });

                /* Value Configuration */

                if (!angular.isDefined(scope.ngTrueVal)) {
                    scope.ngTrueVal = 1;
                }
                if (!angular.isDefined(scope.ngFalseVal)) {
                    scope.ngFalseVal = 0;
                }
                if (!angular.isDefined(scope.ngNullVal)) {
                    scope.ngNullVal = null;
                }
                if (!angular.isDefined(scope.val)) {
                    if (angular.isDefined(scope.ngDefault)) {
                        scope.val = scope.ngDefault;
                    } else {
                        scope.val = scope.ngNullVal;
                    }
                }
            }
        };
    }]);

////var ngTriToggle = angular.module('ngTriToggle', []);
////ngTriToggle
//    .directive('triToggle',['$timeout', function($timeout) {
//        return {
//            restrict: 'E',
//            replace: false,
//            transclude: true,
//            scope: {
//                ngChange: '&',
//                val: '=ngModel',
//                ngTrueVal: '=?',
//                ngngFalseVal: '=?',
//                ngNoVal: '=?',
//                tanner: '&'
//            },
//            template: '<div class="tri-toggle-wrap" ng-class="{\'true\': val==ngTrueVal, \'false\': val==ngFalseVal}" ng-click="toggle()"><div class="tri-toggle-false" ng-click="toggleFalse()"></div><div class="tri-toggle-true" ng-click="toggleTrue()"></div><div class="tri-toggle-handle" ng-click="toggleNone()"></div></div>',
//            link: function(scope) {
//
//                if (!angular.isDefined(scope.ngTrueVal)) {
//                    scope.ngTrueVal = 1;
//                }
//                if (!angular.isDefined(scope.ngFalseVal)) {
//                    scope.ngFalseVal = 0;
//                }
//                if (!angular.isDefined(scope.ngNoVal)) {
//                    scope.ngNoVal = null;
//                }
//
//                if (!angular.isDefined(scope.val)) {
//                    scope.val = scope.ngNoVal;
//                }
//
//                scope.toggle = function() {
//                    if (scope.val === scope.ngTrueVal) {
//                        scope.val = scope.ngFalseVal;
//                    } else if (scope.val === scope.ngFalseVal) {
//                        scope.val = scope.ngNoVal;
//                    } else {
//                        scope.val = scope.ngTrueVal;
//                    }
//                    if (typeof scope.ngChange != 'undefined') {
//                        $timeout(function() {
//                            scope.ngChange(scope.val);
//                        });
//                    }
//                };
//            }
//        };
//    }]);
//.directive('tooltip', function() {
//    return {
//        restrict: 'EA',
//        link: function(scope, element, attrs) {
//            attrs.tooltipTrigger = attrs.tooltipTrigger;
//            attrs.tooltipPlacement = attrs.tooltipPlacement || 'top';
//        }
//    }
//});
////    ;
//
