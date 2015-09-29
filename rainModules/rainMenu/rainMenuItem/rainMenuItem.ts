/// <reference path="../../../typings/tsd.d.ts"/>
module rain.menuItem {

    interface IScope extends ng.IScope {
        route:string;
        isOpen:boolean;
        isVertical():boolean;
        isActive():boolean;
    }

    class RainMenuItemDirective implements ng.IDirective {


        static instance():ng.IDirective {
            return new RainMenuItemDirective;
        }

        restrict = 'AE';
        require = '^rainMenu';
        transclude = true;
        scope = {
            label: '@',
            icon: '@',
            route: '@'
        };
        templateUrl = 'rainModules/rainMenu/rainMenuItem/rainMenuItemTemplate.html';

        link = (scope:IScope,
                element:ng.IAugmentedJQuery,
                attr:ng.IAttributes,
                rainMenuCtrl:rain.menu.IRainMenuController):void=> {

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
    }

    angular.module('rainMenu').directive('rainMenuItem', RainMenuItemDirective.instance);
}