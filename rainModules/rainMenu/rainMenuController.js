/**
 * /*
 * event to broadcast:   'rain-menu-item-selected-event','rain-menu-orientation-changed-event'
 * event to watch:       'rain-menu-show'
 * */
/// <reference path="../../typings/tsd.d.ts"/>
var rain;
(function (rain) {
    var menu;
    (function (menu) {
        var RainMenuController = (function () {
            function RainMenuController($scope, $rootScope) {
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.setPublicFunctions = function ($scope, $rootScope) {
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
                            $rootScope.$broadcast('rain-menu-item-selected-event', { route: route });
                        }
                    };
                };
                this.setEventHandlers = function ($scope, $rootScope) {
                    $scope.$on('rain-menu-show', function (event, data) {
                        $scope.showMenu = data.show;
                        $scope.isVertical = data.isVertical;
                        $scope.allowHorizontalMenu = data.allowHorizontalMenu;
                        $scope.isFloatVerticalMenu = data.isFloatVerticalMenu;
                    });
                    $scope.toggleMenuOrientation = function () {
                        $scope.isVertical = !$scope.isVertical;
                        $rootScope.$broadcast('rain-menu-orientation-changed-event', { isMenuVertical: $scope.isVertical });
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
                    });
                };
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
            RainMenuController.prototype.closeCurrentMenu = function () {
            };
            RainMenuController.prototype.getActiveGroupElement = function () {
            };
            RainMenuController.prototype.setRoute = function (route) {
            };
            RainMenuController.prototype.isVertical = function () {
                return undefined;
            };
            RainMenuController.prototype.setOpenMenuScope = function (scope) {
            };
            RainMenuController.prototype.setActiveGroupElement = function (element) {
            };
            RainMenuController.prototype.setActiveElement = function (el) {
            };
            RainMenuController.$inject = ['$scope', '$rootScope'];
            return RainMenuController;
        })();
        angular.module('rainMenu').controller('rainMenu.controller', RainMenuController);
    })(menu = rain.menu || (rain.menu = {}));
})(rain || (rain = {}));
//# sourceMappingURL=rainMenuController.js.map