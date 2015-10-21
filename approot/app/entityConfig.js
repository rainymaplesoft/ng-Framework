/// <reference path="../../typings/tsd.d.ts"/>
var app;
(function (app) {
    var entity;
    (function (entity) {
        var EntityConfig = (function () {
            function EntityConfig() {
                this.apiBase = '/api/';
                this.EntityApi = this.getEntityApi();
            }
            EntityConfig.prototype.getUrl = function (entityName) {
                return this.apiBase + entityName;
            };
            EntityConfig.prototype.getEntityApi = function () {
                return {
                    user: {
                        name: 'user',
                        url: this.getUrl('user')
                    },
                    role: {
                        name: 'role',
                        url: this.getUrl('role')
                    },
                    category: {
                        name: 'category',
                        url: this.getUrl('category')
                    },
                    customer: {
                        name: 'customer',
                        url: this.getUrl('customer')
                    },
                    shipper: {
                        name: 'shipper',
                        url: this.getUrl('shipper')
                    },
                    supplier: {
                        name: 'supplier',
                        url: this.getUrl('supplier')
                    },
                    territory: {
                        name: 'territory',
                        url: this.getUrl('territory')
                    },
                    product: {
                        name: 'product',
                        url: this.getUrl('product')
                    },
                    productByCategoryId: {
                        name: 'productByCategoryId',
                        url: this.getUrl('productByCategoryId')
                    },
                    order: {
                        name: 'order',
                        url: this.getUrl('order')
                    },
                    orderDetails: {
                        name: 'orderDetails',
                        url: this.getUrl('orderDetails')
                    },
                    editOrderDetail: {
                        name: 'orderDetail',
                        url: this.getUrl('editOrderDetail')
                    },
                    deleteOrderDetail: {
                        name: 'orderDetails',
                        url: this.getUrl('deleteOrderDetail')
                    },
                    employee: {
                        name: 'employee',
                        url: this.getUrl('employee')
                    },
                    country: {
                        name: 'country',
                        url: this.getUrl('country')
                    }
                };
            };
            return EntityConfig;
        })();
        entity.EntityConfig = EntityConfig;
        angular.module('app-framework').service('dbEntityConfig', EntityConfig);
    })(entity = app.entity || (app.entity = {}));
})(app || (app = {}));
//# sourceMappingURL=entityConfig.js.map