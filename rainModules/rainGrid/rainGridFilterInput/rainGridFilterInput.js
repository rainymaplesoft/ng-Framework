/// <reference path="../../../typings/tsd.d.ts"/>
/// <reference path ="../rainGrid.ts"/>
/// <reference path ="../rainGridService.ts"/>
var RainGrid;
(function (RainGrid) {
    /** -- Directive -- **/
    var RainGridFilter = (function () {
        function RainGridFilter() {
            this.restrict = "AE";
            this.templateUrl = "rainModules/rainGrid/rainGridFilterInput/rainGridFilterInputTemplate.html";
            this.replace = false;
            this.scope = {
                filter: '=',
                columns: '=',
                deleteFilter: '&'
            };
            this.controller = 'rainGrid.filterInput.controller';
            this.controllerAs = 'vm';
        }
        return RainGridFilter;
    })();
    function factory() {
        return new RainGridFilter();
    }
    angular.module('rainGrid').directive('rainGridFilter', factory);
    var RainGridFilterInputController = (function () {
        function RainGridFilterInputController($scope, rainGridService) {
            this.$scope = $scope;
            this.rainGridService = rainGridService;
            this.removeFilter = function (col) {
                this.$scope.deleteFilter({ col: col });
            };
            this.filter = $scope.filter;
            this.columns = $scope.columns;
            this.getFilterColumn();
            this.setConstraints($scope.filter.col);
            this.buildBoolValues();
            this.isBool = $scope.filter.col.isBoolean;
        }
        RainGridFilterInputController.prototype.getFilterColumn = function () {
            var index = -1;
            for (var i = 0; i < this.columns.length; i++) {
                if (this.columns[i].value === this.filter.col.value) {
                    index = i;
                    break;
                }
            }
            if (index === -1) {
                this.filter.col = {};
            }
            else {
                this.filter.col = this.columns[index];
            }
        };
        RainGridFilterInputController.prototype.columnChanged = function (col) {
            this.setConstraints(col);
        };
        RainGridFilterInputController.prototype.setConstraints = function (col) {
            this.constraints = this.rainGridService.getFilterConstraintsByColumnType(col);
            if (this.filter.constraint) {
                var index = -1;
                for (var i = 0; i < this.constraints.length; i++) {
                    if (this.constraints[i].value === this.filter.constraint.value) {
                        index = i;
                        break;
                    }
                }
                if (index === -1) {
                    this.filter.constraint = {};
                }
                else {
                    this.filter.constraint = this.constraints[index];
                }
            }
            this.isBool = this.filter.col.isBoolean;
        };
        RainGridFilterInputController.prototype.buildBoolValues = function () {
            this.boolValues = [{ label: 'true', value: true }, { label: 'false', value: false }];
        };
        RainGridFilterInputController.$inject = ['$scope', 'rainGridService'];
        return RainGridFilterInputController;
    })();
    angular.module('rainGrid').controller('rainGrid.filterInput.controller', RainGridFilterInputController);
})(RainGrid || (RainGrid = {}));
//# sourceMappingURL=rainGridFilterInput.js.map