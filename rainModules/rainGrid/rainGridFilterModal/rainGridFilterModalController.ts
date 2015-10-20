/// <reference path="../../../typings/tsd.d.ts"/>
/// <reference path ="../rainGrid.ts"/>
/// <reference path ="../rainGridService.ts"/>
module RainGrid {


    class RainGridFilterModalController {

        columns:IFilterColumn;


        static $inject = ['$modalInstance', 'columnDefs', 'filters', '$scope'];

        constructor(private $modalInstance:ng.ui.bootstrap.IModalServiceInstance,
                    private columnDefs:Array<IColumnDefs>, private filters:Array<IGridFilter>
            , $scope) {

           this.columns = _.map(this.columnDefs, function (col:IColumnDefs) {
                return {
                    label: col.displayName,
                    value: col.field,
                    isNumber: col.isNumber,
                    isCurrency: col.isCurrency,
                    isBoolean: col.isBoolean || col.isCheckbox,
                    isDate: col.isDate
                }
            });
            //$scope.filters = filters;

            // event handlers

            /*$scope.addFilter = this.addFilter;
            $scope.deleteFilter = this.deleteFilter;
            $scope.doFilter = this.doFilter;
            $scope.doCancel = this.doCancel;
            $scope.cleanFilters = this.cleanFilters;*/
        }

        addFilter():void {
            this.filters.push({col: {}, constraint: {}, expression: ''});
        }

        deleteFilter(col) {
            _.remove(this.filters, function (filter) {
                return filter.col.value === col.value;
            });
            if (this.filters.length === 0) {
                this.filters.push({col: {}, constraint: {}, expression: ''});
            }
        }

        doFilter():void {
            this.cleanFilters();
            this.$modalInstance.close({filters: this.filters, isCancel: false});
        }

        doCancel() {
            this.cleanFilters();
            this.$modalInstance.close({filters: this.filters, isCancel: true});
        }

        cleanFilters() {
            _.remove(this.filters, function (filter) {
                return !filter.col || !filter.constraint || filter.expression === undefined || filter.expression === ''
            });
            if (this.filters.length === 0) {
                this.filters.push({col: {}, constraint: {}, expression: ''});
            }
        }
    }
    angular.module('rainGrid').controller('rainGrid.filterModal.controller', RainGridFilterModalController);
}