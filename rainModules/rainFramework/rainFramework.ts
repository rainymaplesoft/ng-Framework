/*
 * Accepted attributes: title, sub-title, router, icon-file
 * */
/// <reference path="../../typings/tsd.d.ts"/>

module rain.framework {

    class RainFrameworkDirective implements ng.IDirective {

        static instance():ng.IDirective {
            return new RainFrameworkDirective();
        }

        transclude = true;
        scope = {
            headerTitle: '@',
            headerSubTitle: '@',
            iconFile: '@',
            router: '@'
        };
        controller = 'rainFramework.controller';
        controllerAs = 'vm';
        templateUrl = 'rainModules/rainFramework/rainFrameworkTemplate.html';
    }

    angular.module('rainFramework', ['rainMenu']).directive('rainFramework', RainFrameworkDirective.instance);

}
