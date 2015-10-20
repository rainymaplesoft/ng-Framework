/// <reference path="../../../typings/tsd.d.ts"/>
/// <reference path ="../rainGrid.ts"/>
/// <reference path ="../rainGridService.ts"/>
var RainGrid;
(function (RainGrid) {
    /** -- Directive -- **/
    var RainGridMenu = (function () {
        function RainGridMenu() {
            this.restrict = "AE";
            this.templateUrl = "rainModules/rainGrid/rainGridMenu/rainGridMenuTemplate.html";
            this.replace = false;
            this.scope = {
                filterData: '&',
                gridOptions: '='
            };
            this.controller = 'rainGrid.menu.controller';
            this.controllerAs = 'vm';
        }
        return RainGridMenu;
    })();
    function factory() {
        return new RainGridMenu();
    }
    angular.module('rainGrid').directive('rainGridMenu', factory);
    var RainGridMenuController = (function () {
        function RainGridMenuController($scope, rainGridService) {
            this.$scope = $scope;
            this.rainGridService = rainGridService;
            $scope.filters = [
                { col: {}, constraint: {}, expression: '' }
            ];
            this.menuConfig();
            this.verifyFilterStatus();
        }
        RainGridMenuController.prototype.verifyFilterStatus = function () {
            if (!this.$scope.filters || this.$scope.filters.length === 0) {
                this.$scope.hasFiltered = false;
            }
            else {
                var filter = this.$scope.filters[0];
                this.$scope.hasFiltered = !!filter.col && !!filter.constraint
                    && filter.expression !== undefined && filter.expression !== '';
            }
        };
        RainGridMenuController.prototype.doFilter = function () {
            var _this = this;
            var modalInstance = this.rainGridService.showFilterModal(this.$scope.gridOptions, this.$scope.filters);
            modalInstance.then(function (data) {
                if (!data.isCancel) {
                    _this.$scope.filters = data.filters;
                    _this.verifyFilterStatus();
                    _this.$scope.filterData({ filters: _this.$scope.filters });
                }
            });
        };
        RainGridMenuController.prototype.removeFilters = function () {
            this.$scope.filters = null;
            this.verifyFilterStatus();
            this.$scope.filterData({ filters: this.$scope.filters });
        };
        // configure the angular-ui dropdown
        RainGridMenuController.prototype.menuConfig = function () {
            this.$scope.status = {
                isOpen: false
            };
            this.$scope.toggled = function (open) {
                console.log('Dropdown is now: ', open);
            };
            this.$scope.toggleDropdown = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                this.$scope.status.isOpen = !this.$scope.status.isOpen;
            };
        };
        RainGridMenuController.$inject = ['$scope', 'rainGridService'];
        return RainGridMenuController;
    })();
    angular.module('rainGrid').controller('rainGrid.menu.controller', RainGridMenuController);
})(RainGrid || (RainGrid = {}));
//# sourceMappingURL=rainGridMenu.js.map