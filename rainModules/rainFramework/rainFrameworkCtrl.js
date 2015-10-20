/*
 * Accepted attributes: title, sub-title, router, icon-file
 * */
/// <reference path="../../typings/tsd.d.ts"/>
/**
 * event to broadcast:   'rain-menu-show','rain-change-route-event'
 * event to watch:       'rain-menu-item-selected-event','rain-menu-orientation-changed-event'
 * router:               'ngRoute','uiRouter','ngNewRouter'
 * */
var rain;
(function (rain) {
    var framework;
    (function (framework) {
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
                var self = this;
                self.isMenuButtonVisible = true;
                self.isVerticalMenuVisible = true;
                self.isMenuVertical = true;
                self.routerName = $scope.router.trim().toUpperCase();
                self.username = currentUser.profile.username;
                self.isFullWidth = function () {
                    return !self.isMenuVertical || !self.isVerticalMenuVisible || self.isFloatVerticalMenu;
                };
                // setup events
                this.setupEvents();
                // avoid from running within the digest cycle, wrap it in $timeout with delay = 0
                $timeout(function () {
                    _this.checkWidth();
                }, 0);
            }
            RainFrameworkController.prototype.isFullWidth = function () {
                return undefined;
            };
            RainFrameworkController.prototype.menuButtonClicked = function () {
            };
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
                    self.routeString = data.route;
                    if (self.routeString) {
                        self.broadcastRoute(self.routeString);
                    }
                    self.checkWidth();
                });
                this.$scope.$on('rain-menu-orientation-changed-event', function (event, data) {
                    self.isMenuVertical = data.isMenuVertical;
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
                self.menuButtonClicked = function () {
                    self.isVerticalMenuVisible = !self.isVerticalMenuVisible;
                    var width = Math.max(self.$window.innerWidth, $(self.$window).width());
                    self.isMenuVertical = (width <= self.narrowScreen);
                    self.broadcastMenuState();
                    //$scope.$apply();
                };
            };
            RainFrameworkController.prototype.checkWidth = function () {
                var width = Math.max(this.$window.innerWidth, $(this.$window).width());
                this.isVerticalMenuVisible = (width > this.narrowScreen);
                this.isFloatVerticalMenu = width <= this.narrowScreen;
                this.isMenuButtonVisible = !this.isVerticalMenuVisible;
                this.broadcastMenuState();
            };
            RainFrameworkController.prototype.broadcastRoute = function (routeString) {
                this.$rootScope.$broadcast('rain-change-route-event', { route: routeString });
            };
            RainFrameworkController.prototype.broadcastMenuState = function () {
                this.$rootScope.$broadcast('rain-menu-show', {
                    show: this.isVerticalMenuVisible,
                    isVertical: this.isMenuVertical,
                    isFloatVerticalMenu: this.isFloatVerticalMenu,
                    allowHorizontalMenu: !this.isMenuButtonVisible
                });
            };
            RainFrameworkController.$inject = ['$scope', '$window', '$timeout', '$rootScope', 'rainService.currentUser', 'rainService.oauth'];
            return RainFrameworkController;
        })();
        angular.module('rainFramework').controller('rainFramework.controller', RainFrameworkController);
    })(framework = rain.framework || (rain.framework = {}));
})(rain || (rain = {}));
//# sourceMappingURL=rainFrameworkCtrl.js.map