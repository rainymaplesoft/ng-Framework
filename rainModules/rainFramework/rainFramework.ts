/*
 * Accepted attributes: title, sub-title, router, icon-file
 * */
/// <reference path="../../typings/tsd.d.ts"/>

module rain.framework {

    class RainFrameworkDirectory implements ng.IDirective {

        static instance():ng.IDirective {
            return new RainFrameworkDirectory();
        }

        transclude = true;
        scope = {
            headerTitle: '@',
            headerSubTitle: '@',
            iconFile: '@',
            router: '@'
        };
        controller = 'rainFramework.controller';
        templateUrl = 'rainModules/rainFramework/rainFrameworkTemplate.html';
    }

    angular.module('rainFramework', ['rainMenu']).directive('rainFramework', RainFrameworkDirectory.instance);

    interface IRainFrameworkController {
        setupEvents():void;
        checkWidth():void;
        broadcastRoute(routeString:string):void;
        broadcastMenuState():void;
        logout():void;
        narrowScreen:number;
    }

    interface IRainFrameworkScope extends ng.IScope {
        router:string;
        routerName:string;
        routeString:string;
        username:string;
        isMenuVertical:boolean;
        isVerticalMenuVisible:boolean;
        isFloatVerticalMenu:boolean;
        isMenuButtonVisible:boolean;
        isFullWidth():boolean;
        logout():void;
        menuButtonClicked():void;
    }

    /**
     * event to broadcast:   'rain-menu-show','rain-change-route-event'
     * event to watch:       'rain-menu-item-selected-event','rain-menu-orientation-changed-event'
     * router:               'ngRoute','uiRouter','ngNewRouter'
     * */
    class RainFrameworkController implements IRainFrameworkController {

        narrowScreen = 768;

        static $inject = ['$scope', '$window', '$timeout', '$rootScope', 'rainService.currentUser', 'rainService.oauth'];

        constructor(private $scope:IRainFrameworkScope,
                    private $window:ng.IWindowService,
                    private $timeout:ng.ITimeoutService,
                    private $rootScope:ng.IRootScopeService,
                    private currentUser:any,
                    private oauth:any) {

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
            $timeout(()=> {
                this.checkWidth();
            }, 0);
        }

        logout():void {
            this.oauth.logout();
            this.$scope.$emit('AUTHENTICATION_EVENT', {
                statusCode: 401,
                eventSource: 'rainFramework.controller.logout'
            });
        }

        setupEvents():void {
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
                self.$scope.$apply( ()=> {
                    self.checkWidth();
                })
            });

            $(self.$window).on('$destroy', ()=> {
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

        }

        checkWidth():void {
            var width = Math.max(this.$window.innerWidth, $(this.$window).width());
            this.$scope.isVerticalMenuVisible = (width > this.narrowScreen);
            this.$scope.isFloatVerticalMenu = width <= this.narrowScreen;
            this.$scope.isMenuButtonVisible = !this.$scope.isVerticalMenuVisible;
            this.broadcastMenuState();
        }

        broadcastRoute(routeString:string):void {
            this.$rootScope.$broadcast('rain-change-route-event', {route: routeString});
        }

        broadcastMenuState():void {
            this.$rootScope.$broadcast('rain-menu-show', {
                show: this.$scope.isVerticalMenuVisible,
                isVertical: this.$scope.isMenuVertical,
                isFloatVerticalMenu: this.$scope.isFloatVerticalMenu,
                allowHorizontalMenu: !this.$scope.isMenuButtonVisible
            })
        }

    }

    angular.module('rainFramework').controller('rainFramework.controller', RainFrameworkController);
}
