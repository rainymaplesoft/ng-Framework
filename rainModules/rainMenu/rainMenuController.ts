/**
 * /*
 * event to broadcast:   'rain-menu-item-selected-event','rain-menu-orientation-changed-event'
 * event to watch:       'rain-menu-show'
 * */
/// <reference path="../../typings/tsd.d.ts"/>
module rain.menu {

    export interface IRainMenuController {
        setPublicFunctions($scope:IRainMenuScope, $rootScope:ng.IRootScopeService):void;
        setEventHandlers($scope:IRainMenuScope, $rootScope:ng.IRootScopeService):void;
        setActiveElement(element:ng.IAugmentedJQuery):void;
        setActiveGroupElement(element:ng.IAugmentedJQuery):void;
        setOpenMenuScope(scope:ng.IScope):void;
        isVertical():boolean;
        setRoute(route:string):void;
        closeCurrentMenu():void;
        getActiveGroupElement():ng.IAugmentedJQuery;
        getActiveElement():ng.IAugmentedJQuery;
    }

    interface IRainMenuScope extends ng.IScope {
        showMenu:boolean;
        isVertical:boolean;
        openMenuScope:any;
        horizontalMenu:any;
        allowHorizontalMenu:boolean;
        activeElement:ng.IAugmentedJQuery;
        activeGroupElement:ng.IAugmentedJQuery;
        isFloatVerticalMenu:boolean;
        toggleMenuOrientation():void;
    }
    class RainMenuController implements IRainMenuController {


        static $inject = ['$scope', '$rootScope'];

        constructor(private $scope:IRainMenuScope, private $rootScope:ng.IRootScopeService) {
            var isHorizontalMenu = $scope.horizontalMenu;
            $scope.showMenu = true;
            $scope.isVertical = true;
            $scope.openMenuScope = null;
            $scope.allowHorizontalMenu = true;

            var self = this;
            self.setPublicFunctions($scope, $rootScope);
            self.setEventHandlers($scope, $rootScope);
            //if the menu needs to be horizontal initially
            if (isHorizontalMenu) {
                $scope.toggleMenuOrientation();
            }
        }


        setPublicFunctions = function ($scope:IRainMenuScope, $rootScope) {
            var self = this;
            self.setActiveElement = function (el) {
                $scope.activeElement = el;
            };
            self.getActiveElement = function () {
                return $scope.activeElement;
            };
            self.setActiveGroupElement = function (el) {
                $scope.activeGroupElement = el;
            };
            self.getActiveGroupElement = function () {
                return $scope.activeGroupElement;
            };
            self.isVertical = function () {
                return $scope.isVertical;
            };
            self.setOpenMenuScope = function (scope) {
                $scope.openMenuScope = scope;
            };
            self.closeCurrentMenu = function () {
                if ($scope.openMenuScope) {
                    $scope.openMenuScope.closeMenu();
                }
            };
            self.setRoute = function (route) {
                if (route) {
                    $rootScope.$broadcast('rain-menu-item-selected-event', {route: route});
                }
            };
        };

        setEventHandlers = function ($scope:IRainMenuScope, $rootScope) {
            $scope.$on('rain-menu-show', function (event, data) {
                $scope.showMenu = data.show;
                $scope.isVertical = data.isVertical;
                $scope.allowHorizontalMenu = data.allowHorizontalMenu;
                $scope.isFloatVerticalMenu = data.isFloatVerticalMenu
            });

            $scope.toggleMenuOrientation = function () {
                $scope.isVertical = !$scope.isVertical;
                $rootScope.$broadcast('rain-menu-orientation-changed-event', {isMenuVertical: $scope.isVertical});
            };

            // if there's a click out of menu when the menu is horizontal, close the current opened menu
            angular.element(document).bind('click', function (e) {
                if ($scope.openMenuScope && !$scope.isVertical) {
                    if ($(e.target).parent().hasClass('r-selectable-item')) {
                        return;
                    }
                    $scope.$apply(function () {
                        $scope.openMenuScope.closeMenu();
                    });
                    e.preventDefault();
                    e.stopPropagation();
                }
            })
        };

        getActiveElement():ng.IAugmentedJQuery {
            return undefined;
        }
        getActiveGroupElement():ng.IAugmentedJQuery {
            return undefined;
        }
        setRoute(route:string):void {
        }
        isVertical():boolean {
            return undefined;
        }
        setOpenMenuScope(scope:ng.IScope):void {
        }
        setActiveGroupElement(element:angular.IAugmentedJQuery):void {
        }
        setActiveElement(el:angular.IAugmentedJQuery):void {
        }
        closeCurrentMenu():void {
        }
    }

    angular.module('rainMenu').controller('rainMenu.controller', RainMenuController);

}