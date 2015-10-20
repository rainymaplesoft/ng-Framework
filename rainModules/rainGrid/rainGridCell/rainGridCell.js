/// <reference path="../../../typings/tsd.d.ts"/>
/// <reference path ="../rainGrid.ts"/>
/// <reference path ="../rainGridService.ts"/>
var RainGrid;
(function (RainGrid) {
    /** -- Directive -- **/
    var RainGridCell = (function () {
        function RainGridCell() {
            this.restrict = "AE";
            this.templateUrl = "rainModules/rainGrid/rainGridCell/rainGridCellTemplate.html";
            this.replace = false;
            this.scope = {
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
            this.link = function (scope, el, attr) {
                scope.value = scope.gridCell;
                if (scope.isLink || scope.isButton || scope.isIcon) {
                    scope.linkFunc = function () {
                        scope.funcLink();
                    };
                }
            };
        }
        return RainGridCell;
    })();
    function factory() {
        return new RainGridCell();
    }
    angular.module('rainGrid').directive('gridCell', factory);
})(RainGrid || (RainGrid = {}));
//# sourceMappingURL=rainGridCell.js.map