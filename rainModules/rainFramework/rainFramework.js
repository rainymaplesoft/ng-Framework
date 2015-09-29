/*
 * Accepted attributes: title, sub-title, router, icon-file
 * */
/// <reference path="../../typings/tsd.d.ts"/>
var rain;
(function (rain) {
    var framework;
    (function (framework) {
        var RainFrameworkDirectory = (function () {
            function RainFrameworkDirectory() {
                this.transclude = true;
                this.scope = {
                    headerTitle: '@',
                    headerSubTitle: '@',
                    iconFile: '@',
                    router: '@'
                };
                this.controller = 'rainFramework.controller';
                this.templateUrl = 'rainModules/rainFramework/rainFrameworkTemplate.html';
            }
            RainFrameworkDirectory.instance = function () {
                return new RainFrameworkDirectory();
            };
            return RainFrameworkDirectory;
        })();
        angular.module('rainFramework', ['rainMenu']).directive('rainFramework', RainFrameworkDirectory.instance);
        /**
         * event to broadcast:   'rain-menu-show','rain-change-route-event'
         * event to watch:       'rain-menu-item-selected-event','rain-menu-orientation-changed-event'
         * router:               'ngRoute','uiRouter','ngNewRouter'
         * */
        var RainFrameworkController = (function () {
            function RainFrameworkController($scope, $window, $timeout, $rootScope, currentUser, oauth) {
                var _this = this;
                this.$scope = $scope;
                this.$window = $window;
                this.$timeout = $timeout;
                this.$rootScope = $rootScope;
                this.currentUser = currentUser;
                this.oauth = oauth;
                this.narrowScreen = 768;
                // init scope models
                $scope.isMenuButtonVisible = true;
                $scope.isVerticalMenuVisible = true;
                $scope.isMenuVertical = true;
                $scope.routerName = $scope.router.trim().toUpperCase();
                $scope.username = currentUser.profile.username;
                $scope.logout = this.logout;
                $scope.isFullWidth = function () {
                    return !$scope.isMenuVertical || !$scope.isVerticalMenuVisible || $scope.isFloatVerticalMenu;
                };
                // setup events
                this.setupEvents();
                // avoid from running within the digest cycle, wrap it in $timeout with delay=0
                $timeout(function () {
                    _this.checkWidth();
                }, 0);
            }
            RainFrameworkController.prototype.logout = function () {
                this.oauth.logout();
                this.$scope.$emit('AUTHENTICATION_EVENT', {
                    statusCode: 401,
                    eventSource: 'rainFramework.controller.logout'
                });
            };
            RainFrameworkController.prototype.setupEvents = function () {
                var self = this;
                self.$scope.$on('rain-menu-item-selected-event', function (event, data) {
                    self.$scope.routeString = data.route;
                    if (self.$scope.routeString) {
                        self.broadcastRoute(self.$scope.routeString);
                    }
                    self.checkWidth();
                });
                this.$scope.$on('rain-menu-orientation-changed-event', function (event, data) {
                    self.$scope.isMenuVertical = data.isMenuVertical;
                });
                // in jQuery, we can add a namespace to an event (here is 'rainFramework')
                $(self.$window).on('resize.rainFramework', function () {
                    self.$scope.$apply(function () {
                        self.checkWidth();
                    });
                });
                $(self.$window).on('$destroy', function () {
                    // remove the handler
                    $(self.$window).off('resize.rainFramework');
                });
                self.$scope.menuButtonClicked = function () {
                    self.$scope.isVerticalMenuVisible = !self.$scope.isVerticalMenuVisible;
                    var width = Math.max(self.$window.innerWidth, $(self.$window).width());
                    self.$scope.isMenuVertical = (width <= self.narrowScreen);
                    self.broadcastMenuState();
                    //$scope.$apply();
                };
            };
            RainFrameworkController.prototype.checkWidth = function () {
                var width = Math.max(this.$window.innerWidth, $(this.$window).width());
                this.$scope.isVerticalMenuVisible = (width > this.narrowScreen);
                this.$scope.isFloatVerticalMenu = width <= this.narrowScreen;
                this.$scope.isMenuButtonVisible = !this.$scope.isVerticalMenuVisible;
                this.broadcastMenuState();
            };
            RainFrameworkController.prototype.broadcastRoute = function (routeString) {
                this.$rootScope.$broadcast('rain-change-route-event', { route: routeString });
            };
            RainFrameworkController.prototype.broadcastMenuState = function () {
                this.$rootScope.$broadcast('rain-menu-show', {
                    show: this.$scope.isVerticalMenuVisible,
                    isVertical: this.$scope.isMenuVertical,
                    isFloatVerticalMenu: this.$scope.isFloatVerticalMenu,
                    allowHorizontalMenu: !this.$scope.isMenuButtonVisible
                });
            };
            RainFrameworkController.$inject = ['$scope', '$window', '$timeout', '$rootScope', 'rainService.currentUser', 'rainService.oauth'];
            return RainFrameworkController;
        })();
        angular.module('rainFramework').controller('rainFramework.controller', RainFrameworkController);
    })(framework = rain.framework || (rain.framework = {}));
})(rain || (rain = {}));
//# sourceMappingURL=rainFramework.js.map