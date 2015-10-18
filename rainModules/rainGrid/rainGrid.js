/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path ="./rainGridService.ts"/>
var RainGrid;
(function (RainGrid_1) {
    var RainGrid = (function () {
        function RainGrid() {
            this.restrict = 'AE';
            this.templateUrl = 'rainModules/rainGrid/_rainGridTemplate.html';
            this.replace = false;
            this.scope = {
                rainGrid: '='
            };
            this.controller = 'rainGrid.controller';
        }
        return RainGrid;
    })();
    //factory.$inject = ['$timeout'];
    function factory() {
        return new RainGrid();
    }
    angular.module('rainGrid', []).directive('rainGrid', factory);
})(RainGrid || (RainGrid = {}));
//# sourceMappingURL=rainGrid.js.map