/// <reference path="../../../typings/tsd.d.ts"/>
/// <reference path="../rainMenuController.ts"/>
var rain;
(function (rain) {
    var menuItem;
    (function (menuItem) {
        var RainMenuItemDirective = (function () {
            function RainMenuItemDirective() {
                this.restrict = 'AE';
                this.require = '^rainMenu';
                this.transclude = true;
                this.scope = {
                    label: '@',
                    icon: '@',
                    route: '@'
                };
                this.templateUrl = 'rainModules/rainMenu/rainMenuItem/rainMenuItemTemplate.html';
                this.link = function (scope, element, attr, rainMenuCtrl) {
                    scope.isActive = function () {
                        return element === rainMenuCtrl.getActiveElement();
                    };
                    scope.isVertical = function () {
                        return rainMenuCtrl.isVertical();
                    };
                    element.on('click', function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        scope.$apply(function () {
                            rainMenuCtrl.setActiveElement(element);
                            rainMenuCtrl.setRoute(scope.route);
                            if (!scope.isVertical()) {
                                rainMenuCtrl.closeCurrentMenu();
                            }
                        });
                    });
                };
            }
            RainMenuItemDirective.instance = function () {
                return new RainMenuItemDirective;
            };
            return RainMenuItemDirective;
        })();
        angular.module('rainMenu').directive('rainMenuItem', RainMenuItemDirective.instance);
    })(menuItem = rain.menuItem || (rain.menuItem = {}));
})(rain || (rain = {}));
/*
 (function () {
 angular.module('rainMenu').directive('rainMenuItem', rainMenuItem);


 function rainMenuItem() {
 return {
 restrict: 'AE',
 require: '^rainMenu',
 transclude: true,
 scope: {
 label: '@',
 icon: '@',
 route: '@'
 },
 templateUrl: 'rainModules/rainMenu/rainMenuItem/rainMenuItemTemplate.html',
 link: link
 }
 }

 function link(scope, element, attr, rainMenuCtrl) {

 scope.isActive = function () {
 return element === rainMenuCtrl.getActiveElement();
 };

 scope.isVertical = function () {
 return rainMenuCtrl.isVertical();
 };

 element.on('click', function (e) {
 e.stopPropagation();
 e.preventDefault();
 scope.$apply(function () {
 rainMenuCtrl.setActiveElement(element);
 rainMenuCtrl.setRoute(scope.route);
 if (!scope.isVertical()) {
 rainMenuCtrl.closeCurrentMenu();
 }
 })
 })
 }
 })();
 */
//# sourceMappingURL=rainMenuItem.js.map