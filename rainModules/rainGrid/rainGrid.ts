/// <reference path="../../typings/tsd.d.ts"/>

module rain.grid {

    class RainGrid {
        constructor() {

        }

        restrict = 'AE';
        templateUrl = 'rainModules/rainGrid/_rainGridTemplate.html';
        replace = false;
        scope = {
            rainGrid: '='
        };
        controller = 'rainGrid.controller';

    }

    //factory.$inject = ['$timeout'];
    function factory() {
        return new RainGrid();
    }

    angular.module('rainGrid', []).directive('rainGrid', factory);
}