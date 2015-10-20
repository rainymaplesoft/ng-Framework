/// <reference path="../../../typings/tsd.d.ts"/>
/// <reference path ="../rainGrid.ts"/>
/// <reference path ="../rainGridService.ts"/>
module RainGrid {

    /** -- Directive -- **/
    class RainGridFilter {
        restrict = "AE";
        templateUrl = "rainModules/rainGrid/rainGridFilterInput/rainGridFilterInputTemplate.html";
        replace = false;
        scope = {
            filter: '=',
            columns: '=',
            deleteFilter: '&'
        };
        controller = 'rainGrid.filterInput.controller';
        controllerAs = 'vm'
    }

    function factory() {
        return new RainGridFilter();
    }

    angular.module('rainGrid').directive('rainGridFilter', factory);

    /** -- Controller -- **/

    interface IDeleteFilterParam {
        col:IFilterColumn
    }
    interface IFilterInputScope extends ng.IScope {
        filter:IGridFilter;
        columns:Array<IFilterColumn>;
        isBool:boolean;
        deleteFilter(col:IDeleteFilterParam):void;
    }

    class RainGridFilterInputController {

        filter:IGridFilter;
        columns:Array<IFilterColumn>;
        isBool:boolean;
        boolValues:Array<IConstraint>;
        constraints:Array<IConstraint>;

        static $inject = ['$scope', 'rainGridService'];

        constructor(private $scope:IFilterInputScope, private rainGridService:IRainGridService) {

            this.filter = $scope.filter;
            this.columns = $scope.columns;

            this.getFilterColumn();
            this.setConstraints($scope.filter.col);
            this.buildBoolValues();
            this.isBool = $scope.filter.col.isBoolean;
        }


        getFilterColumn():void {
            var index = -1;
            for (var i = 0; i < this.columns.length; i++) {
                if (this.columns[i].value === this.filter.col.value) {
                    index = i;
                    break;
                }
            }
            if (index === -1) {
                this.filter.col = {}
            } else {
                this.filter.col = this.columns[index];
            }
        }

        removeFilter = function (col:IDeleteFilterParam) {
            this.$scope.deleteFilter({col: col})
        };

        columnChanged(col:IFilterColumn){
            this.setConstraints(col);
        }

        setConstraints(col:IFilterColumn):void {
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
                } else {
                    this.filter.constraint = this.constraints[index];
                }
            }
            this.isBool = this.filter.col.isBoolean;
        }

        buildBoolValues():void {
            this.boolValues = [{label: 'true', value: true}, {label: 'false', value: false}];
        }
    }

    angular.module('rainGrid').controller('rainGrid.filterInput.controller', RainGridFilterInputController);

}
