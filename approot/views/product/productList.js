/// <reference path="../../../typings/tsd.d.ts"/>
/// <reference path="../../../rainModules/rainService/rainServiceRepository.ts"/>
/// <reference path="../../../rainModules/rainGrid/rainGridService.ts"/>
/// <reference path="../../../approot/app/entityConfig.ts"/>
var m_grid = RainGrid;
var m_repo = rainService.repository;
var m_entity = app.entity;
var app;
(function (app) {
    var view;
    (function (view) {
        /** --  Directive -- **/
        var ProductList = (function () {
            function ProductList() {
                this.restrict = 'AE';
                this.templateUrl = 'approot/views/product/productListTemplate.html';
                this.replace = false;
                this.scope = {
                    categoryId: '='
                };
                this.controller = 'productList.controller';
                this.controllerAs = 'vm';
            }
            return ProductList;
        })();
        function factory() {
            return new ProductList();
        }
        angular.module('app-framework').directive('productListDir', factory);
        var ProductListController = (function () {
            function ProductListController($scope, repository, dbEntityConfig, commonService) {
                this.$scope = $scope;
                this.repository = repository;
                this.dbEntityConfig = dbEntityConfig;
                this.commonService = commonService;
                this._eventGetProductDetail = 'productListDir.productDetail';
                this.gridOptions = this.setGridOptions();
                this.getProducts();
                this.setupEvents();
            }
            ProductListController.prototype.getProducts = function () {
                if (this.$scope.categoryId === undefined) {
                    this.gridOptions.data = this.repository.getDataList(this.dbEntityConfig.EntityApi.product);
                }
                else {
                    this.gridOptions.data = this.repository.getDataById(this.dbEntityConfig.EntityApi.productByCategoryId, this.$scope.categoryId);
                }
            };
            ProductListController.prototype.setGridOptions = function () {
                var options = {
                    idField: 'ProductID',
                    title: 'Products',
                    columnDefs: this.getColumnDefs()
                };
                if (this.$scope.categoryId) {
                    options.pageSize = 5;
                }
                return options;
            };
            ProductListController.prototype.setupEvents = function () {
                var self = this;
                this.$scope.$watch('categoryId', function () {
                    self.getProducts();
                });
                this.$scope.$on(this._eventGetProductDetail, function (event, data) {
                    if (!data || !data.id) {
                        return;
                    }
                    self.commonService.showProductModal(data.id);
                });
            };
            ProductListController.prototype.getColumnDefs = function () {
                return [
                    {
                        field: 'ProductID',
                        displayName: 'Id'
                    }, {
                        field: 'ProductName',
                        displayName: 'Name',
                        isLink: true,
                        linkFunc: { funcEvent: this._eventGetProductDetail, funcIdField: 'ProductID' }
                    },
                    {
                        field: 'QuantityPerUnit',
                        displayName: 'Quantity Per Unit'
                    },
                    {
                        field: 'UnitPrice',
                        displayName: 'Unit Price',
                        isCurrency: true
                    },
                    {
                        field: 'UnitsInStock',
                        displayName: 'Units In Stock',
                        isNumber: true
                    },
                    {
                        field: 'UnitsOnOrder',
                        displayName: 'Units On Order',
                        isNumber: true
                    },
                    {
                        field: 'ReorderLevel',
                        displayName: 'Reorder Level',
                        isNumber: true
                    },
                    {
                        field: 'Discontinued',
                        displayName: 'Discontinued',
                        isCheckbox: true
                    }
                ];
            };
            ProductListController.$inject = ['$scope', 'rainService.repository', 'dbEntityConfig', 'commonService'];
            return ProductListController;
        })();
        angular.module('app-framework').controller('productList.controller', ProductListController);
    })(view = app.view || (app.view = {}));
})(app || (app = {}));
//# sourceMappingURL=productList.js.map