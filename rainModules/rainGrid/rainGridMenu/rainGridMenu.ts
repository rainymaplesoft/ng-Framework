/// <reference path="../../../typings/tsd.d.ts"/>
/// <reference path ="../rainGrid.ts"/>
/// <reference path ="../rainGridService.ts"/>
module RainGrid {

    /** -- Directive -- **/
    class RainGridMenu {
        restrict = "AE";
        templateUrl = "rainModules/rainGrid/rainGridMenu/rainGridMenuTemplate.html";
        replace = false;
        scope = {
            filterData: '&',
            gridOptions: '='
        };
        controller = 'rainGrid.menu.controller';
        controllerAs = 'vm'
    }

    function factory() {
        return new RainGridMenu();
    }

    angular.module('rainGrid').directive('rainGridMenu', factory);

    /** -- Controller -- **/

    interface IFilterDataParam{
        filters:Array<IGridFilter>
    }
    interface IMenuScope extends ng.IScope {
        status:{
            isOpen:boolean
        }
        filters:Array<IGridFilter>;
        hasFiltered:boolean;
        toggled(any):void;
        toggleDropdown($event:ng.IAngularEvent):void;
        filterData(filters:IFilterDataParam):void;
        gridOptions:IGridOptions;
    }

    class RainGridMenuController {

        static $inject = ['$scope', 'rainGridService'];

        constructor(private $scope:IMenuScope, private rainGridService:IRainGridService) {

            $scope.filters = [
                {col: {}, constraint: {}, expression: ''}
            ];

            this.menuConfig();
            this.verifyFilterStatus();
        }

        verifyFilterStatus():void {
            if (!this.$scope.filters || this.$scope.filters.length === 0) {
                this.$scope.hasFiltered = false;
            } else {
                var filter = this.$scope.filters[0];
                this.$scope.hasFiltered = !!filter.col && !!filter.constraint
                    && filter.expression !== undefined && filter.expression !== '';
            }
        }

        doFilter() {
            var modalInstance = this.rainGridService.showFilterModal(this.$scope.gridOptions, this.$scope.filters);
            modalInstance.then( (data)=> {
                if (!data.isCancel) {
                    this.$scope.filters = data.filters;
                    this.verifyFilterStatus();
                    this.$scope.filterData({filters: this.$scope.filters});
                }
            });
        }

        removeFilters() {
            this.$scope.filters = null;
            this.verifyFilterStatus();
            this.$scope.filterData({filters: this.$scope.filters});
        }

        // configure the angular-ui dropdown
        menuConfig():void {
            this.$scope.status = {
                isOpen: false
            };

            this.$scope.toggled = function (open) {
                console.log('Dropdown is now: ', open);
            };

            this.$scope.toggleDropdown = function ($event:ng.IAngularEvent) {
                $event.preventDefault();
                $event.stopPropagation();
                this.$scope.status.isOpen = !this.$scope.status.isOpen;
            };
        }
    }

    angular.module('rainGrid').controller('rainGrid.menu.controller', RainGridMenuController);

}
