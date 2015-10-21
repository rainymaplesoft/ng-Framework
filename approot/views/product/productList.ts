/// <reference path="../../../typings/tsd.d.ts"/>
/// <reference path="../../../rainModules/rainService/rainServiceRepository.ts"/>
/// <reference path="../../../rainModules/rainGrid/rainGridService.ts"/>
/// <reference path="../../../approot/app/entityConfig.ts"/>

import m_grid = RainGrid;
import m_repo = rainService.repository;
import m_entity = app.entity;

module app.view {

    /** --  Directive -- **/
    class ProductList {
        restrict = 'AE';
        templateUrl = 'approot/views/product/productListTemplate.html';
        replace = false;
        scope = {
            categoryId: '='
        };
        controller = 'productList.controller';
        controllerAs = 'vm'
    }

    function factory() {
        return new ProductList();
    }

    angular.module('app-framework').directive('productListDir', factory);

    /** --  Controller -- **/

    interface IProductListScope extends ng.IScope {
        categoryId:string;
    }
    class ProductListController {

        private gridOptions:m_grid.IGridOptions;
        private _eventGetProductDetail = 'productListDir.productDetail';

        static $inject = ['$scope', 'rainService.repository', 'dbEntityConfig', 'commonService'];

        constructor(private $scope:IProductListScope,
                    private repository:m_repo.IRepositoryService<m_entity.IProduct>,
                    private dbEntityConfig:m_entity.EntityConfig, private commonService) {

            this.gridOptions = this.setGridOptions();
            this.getProducts();

            this.setupEvents();
        }

        getProducts() {
            if (this.$scope.categoryId === undefined) {
                this.gridOptions.data = this.repository.getDataList(this.dbEntityConfig.EntityApi.product);
            } else {
                this.gridOptions.data = this.repository.getDataById(
                    this.dbEntityConfig.EntityApi.productByCategoryId, this.$scope.categoryId);
            }
        }

        setGridOptions():m_grid.IGridOptions {
            var options:m_grid.IGridOptions = {
                idField:'ProductID',
                title:'Products',
                columnDefs : this.getColumnDefs()
            };
            if (this.$scope.categoryId) {
                options.pageSize = 5;
            }

            return options;
        }

        setupEvents():void{
            var self = this;
            this.$scope.$watch('categoryId', function () {
                self.getProducts();
            });

            this.$scope.$on(this._eventGetProductDetail, function (event, data) {
                if(!data||!data.id){
                    return;
                }
                self.commonService.showProductModal(data.id);
            });
        }

        getColumnDefs() {
            return [
                {
                    field: 'ProductID',
                    displayName: 'Id'
                }, {
                    field: 'ProductName',
                    displayName: 'Name',
                    isLink: true,
                    linkFunc: {funcEvent: this._eventGetProductDetail, funcIdField: 'ProductID'}
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
        }
    }

    angular.module('app-framework').controller('productList.controller', ProductListController);
}
