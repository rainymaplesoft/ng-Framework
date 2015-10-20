/// <reference path="../../../typings/tsd.d.ts"/>
/// <reference path ="../rainGrid.ts"/>
/// <reference path ="../rainGridService.ts"/>
module RainGrid {

    /** -- Directive -- **/
    class RainGridCell {
        restrict = "AE";
        templateUrl = "rainModules/rainGrid/rainGridCell/rainGridCellTemplate.html";
        replace = false;
        scope = {
            gridCell: '=',
            isDate: '=',
            isCurrency: '=',
            isNumber: '=',
            isCheckbox: '=',
            isLink: '=',
            isButton: '=',
            isIcon: '=',
            isHidden: '=',
            decimal: '=',
            funcLink: '&'
        };
        link = (scope, el, attr)=> {
            scope.value = scope.gridCell;
            if (scope.isLink || scope.isButton || scope.isIcon) {
                scope.linkFunc = function () {
                    scope.funcLink();
                }
            }
        }
    }

    function factory() {
        return new RainGridCell();
    }

    angular.module('rainGrid').directive('gridCell', factory);
}