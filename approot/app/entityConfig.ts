/// <reference path="../../typings/tsd.d.ts"/>

module app.entity {

    export interface IEntityConfig {
        EntityApi:IEntityApi
    }
    export class EntityConfig implements IEntityConfig {

        EntityApi:IEntityApi;

        constructor() {
            this.EntityApi=this.getEntityApi();
        }

        private apiBase:string = '/api/';

        private getUrl(entityName):string {
            return this.apiBase + entityName;
        }

        getEntityApi():app.entity.IEntityApi {
            return {
                user: {
                    name: 'user',
                    url: this.getUrl('user')
                }
                ,
                role: {
                    name: 'role',
                    url: this.getUrl('role')
                }
                ,
                category: {
                    name: 'category',
                    url: this.getUrl('category')
                }
                ,
                customer: {
                    name: 'customer',
                    url: this.getUrl('customer')
                }
                ,
                shipper: {
                    name: 'shipper',
                    url: this.getUrl('shipper')
                }
                ,
                supplier: {
                    name: 'supplier',
                    url: this.getUrl('supplier')
                }
                ,
                territory: {
                    name: 'territory',
                    url: this.getUrl('territory')
                }
                ,
                product: {
                    name: 'product',
                    url: this.getUrl('product')
                }
                ,
                productByCategoryId: {
                    name: 'productByCategoryId',
                    url: this.getUrl('productByCategoryId')
                }
                ,
                order: {
                    name: 'order',
                    url: this.getUrl('order')
                }
                ,
                orderDetails: {
                    name: 'orderDetails',
                    url: this.getUrl('orderDetails')
                }
                ,
                editOrderDetail: {
                    name: 'orderDetail',
                    url: this.getUrl('editOrderDetail')
                }
                ,
                deleteOrderDetail: {
                    name: 'orderDetails',
                    url: this.getUrl('deleteOrderDetail')
                }
                ,
                employee: {
                    name: 'employee',
                    url: this.getUrl('employee')
                }
                ,
                country: {
                    name: 'country',
                    url: this.getUrl('country')
                }
            }
        }
    }


    angular.module('app-framework').service('dbEntityConfig', EntityConfig);

    /** interface definitions **/

    export interface IProduct {
        ProductID: string,
        ProductName: string,
        SupplierID: string,
        CategoryID: string,
        QuantityPerUnit: string,
        UnitPrice: number,
        UnitsInStock: number,
        UnitsOnOrder: number,
        ReorderLevel: number,
        Discontinued: boolean
    }
    export interface IEntityInfo {
        name:string,
        url:string
    }
    export interface IEntityApi {
        user:IEntityInfo,
        role:IEntityInfo,
        category:IEntityInfo,
        customer:IEntityInfo,
        shipper:IEntityInfo,
        supplier:IEntityInfo,
        territory:IEntityInfo,
        product:IEntityInfo,
        productByCategoryId:IEntityInfo,
        order:IEntityInfo,
        orderDetails:IEntityInfo,
        deleteOrderDetail:IEntityInfo,
        editOrderDetail:IEntityInfo,
        employee:IEntityInfo,
        country:IEntityInfo

    }
}


