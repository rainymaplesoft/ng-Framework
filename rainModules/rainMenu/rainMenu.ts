/// <reference path="../../typings/tsd.d.ts"/>

module rain.menu.directive {

    class RainMenuDirective implements ng.IDirective {

        constructor(private $timeout:ng.ITimeoutService) {
        }

        restrict = 'AE';
        transclude = true;
        scope = {
            horizontalMenu: '='
        };
        controller = 'rainMenu.controller';
        templateUrl = 'rainModules/rainMenu/rainMenuTemplate.html';

        link = (scope:ng.IScope, element:ng.IAugmentedJQuery):void => {

            var _self = this;
            //openFirstMenu();

            function openFirstMenu() {
                var item = element.find('.r-selectable-item:first');
                if (item) {
                    _self.$timeout(function () {
                        item.trigger('click');
                    })
                }
            }
        }
    }

    factory.$inject = ['$timeout'];
    function factory($timeout:ng.ITimeoutService) {
        return new RainMenuDirective($timeout);
    }

    angular.module('rainMenu', []).directive('rainMenu', factory);
}

/*
 (function () {
 angular.module('rainMenu').directive('rainMenu',['$timeout',rainMenu] );


 function rainMenu($timeout) {
 return {
 restrict:'AE',
 transclude: true,
 scope: {
 horizontalMenu:'='
 },
 controller: 'rainMenu.controller',
 templateUrl: 'rainModules/rainMenu/rainMenuTemplate.html',
 link: link
 };

 // open the first menu section
 function link(scope,element,attr){

 //openFirstMenu();

 function openFirstMenu() {
 var item = element.find('.r-selectable-item:first');
 if (item) {
 $timeout(function () {
 item.trigger('click');
 })
 }
 }
 }
 }

 })();
 */
