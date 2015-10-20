/*
 * Accepted attributes: title, sub-title, router, icon-file
 * */
/// <reference path="../../typings/tsd.d.ts"/>

/**
 * event to broadcast:   'rain-menu-show','rain-change-route-event'
 * event to watch:       'rain-menu-item-selected-event','rain-menu-orientation-changed-event'
 * router:               'ngRoute','uiRouter','ngNewRouter'
 * */
module rain.framework {

    interface IRainFrameworkController {
        narrowScreen:number;
        routerName:string;
        routeString:string;
        username:string;
        isMenuVertical:boolean;
        isVerticalMenuVisible:boolean;
        isFloatVerticalMenu:boolean;
        isMenuButtonVisible:boolean;
        setupEvents():void;
        checkWidth():void;
        broadcastRoute(routeString:string):void;
        broadcastMenuState():void;
        logout():void;
        isFullWidth():boolean;
        logout():void;
        menuButtonClicked():void;
    }

    interface IRainFrameworkScope extends ng.IScope {
        router:string;
    }

    class RainFrameworkController implements IRainFrameworkController {
        routerName:string;
        routeString:string;
        username:string;
        isMenuVertical:boolean;
        isVerticalMenuVisible:boolean;
        isFloatVerticalMenu:boolean;
        isMenuButtonVisible:boolean;

        isFullWidth():boolean {
            return undefined;
        }

        menuButtonClicked():void {
        }

        narrowScreen = 768;

        static $inject = ['$scope', '$window', '$timeout', '$rootScope', 'rainService.currentUser', 'rainService.oauth'];

        constructor(private $scope:IRainFrameworkScope,
                    private $window:ng.IWindowService,
                    private $timeout:ng.ITimeoutService,
                    private $rootScope:ng.IRootScopeService,
                    private currentUser:any,
                    private oauth:any) {

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
                self.$scope.$apply(()=> {
                    self.checkWidth();
                })
            });

            $(self.$window).on('$destroy', ()=> {
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

        }

        checkWidth():void {
            var width = Math.max(this.$window.innerWidth, $(this.$window).width());
            this.isVerticalMenuVisible = (width > this.narrowScreen);
            this.isFloatVerticalMenu = width <= this.narrowScreen;
            this.isMenuButtonVisible = !this.isVerticalMenuVisible;
            this.broadcastMenuState();
        }

        broadcastRoute(routeString:string):void {
            this.$rootScope.$broadcast('rain-change-route-event', {route: routeString});
        }

        broadcastMenuState():void {
            this.$rootScope.$broadcast('rain-menu-show', {
                show: this.isVerticalMenuVisible,
                isVertical: this.isMenuVertical,
                isFloatVerticalMenu: this.isFloatVerticalMenu,
                allowHorizontalMenu: !this.isMenuButtonVisible
            })
        }

    }

    angular.module('rainFramework').controller('rainFramework.controller', RainFrameworkController);
}
