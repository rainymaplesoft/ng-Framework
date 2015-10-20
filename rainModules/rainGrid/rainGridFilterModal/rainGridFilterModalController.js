/// <reference path="../../../typings/tsd.d.ts"/>
/// <reference path ="../rainGrid.ts"/>
/// <reference path ="../rainGridService.ts"/>
var RainGrid;
(function (RainGrid) {
    var RainGridFilterModalController = (function () {
        function RainGridFilterModalController($modalInstance, columnDefs, filters, $scope) {
            this.$modalInstance = $modalInstance;
            this.columnDefs = columnDefs;
            this.filters = filters;
            this.columns = _.map(this.columnDefs, function (col) {
                return {
                    label: col.displayName,
                    value: col.field,
                    isNumber: col.isNumber,
                    isCurrency: col.isCurrency,
                    isBoolean: col.isBoolean || col.isCheckbox,
                    isDate: col.isDate
                };
            });
            //$scope.filters = filters;
            // event handlers
            /*$scope.addFilter = this.addFilter;
            $scope.deleteFilter = this.deleteFilter;
            $scope.doFilter = this.doFilter;
            $scope.doCancel = this.doCancel;
            $scope.cleanFilters = this.cleanFilters;*/
        }
        RainGridFilterModalController.prototype.addFilter = function () {
            this.filters.push({ col: {}, constraint: {}, expression: '' });
        };
        RainGridFilterModalController.prototype.deleteFilter = function (col) {
            _.remove(this.filters, function (filter) {
                return filter.col.value === col.value;
            });
            if (this.filters.length === 0) {
                this.filters.push({ col: {}, constraint: {}, expression: '' });
            }
        };
        RainGridFilterModalController.prototype.doFilter = function () {
            this.cleanFilters();
            this.$modalInstance.close({ filters: this.filters, isCancel: false });
        };
        RainGridFilterModalController.prototype.doCancel = function () {
            this.cleanFilters();
            this.$modalInstance.close({ filters: this.filters, isCancel: true });
        };
        RainGridFilterModalController.prototype.cleanFilters = function () {
            _.remove(this.filters, function (filter) {
                return !filter.col || !filter.constraint || filter.expression === undefined || filter.expression === '';
            });
            if (this.filters.length === 0) {
                this.filters.push({ col: {}, constraint: {}, expression: '' });
            }
        };
        RainGridFilterModalController.$inject = ['$modalInstance', 'columnDefs', 'filters', '$scope'];
        return RainGridFilterModalController;
    })();
    angular.module('rainGrid').controller('rainGrid.filterModal.controller', RainGridFilterModalController);
})(RainGrid || (RainGrid = {}));
//# sourceMappingURL=rainGridFilterModalController.js.map