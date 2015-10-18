/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path ="./rainGridService.ts"/>

module RainGrid {

    export interface IScopeGridOptions extends IGridOptions {

    }

    export interface IPageSize {
        label:string,
        value:number
    }

    export interface IRainGridScope extends ng.IScope {
        rainGrid:IGridOptions,
        gridOptions:IScopeGridOptions,
        selectable:boolean,
        actionButtonPlace:number,
        showToolMenu:boolean,
        title:string,
        sortField:string,
        sortOrder:string,
        currentPage:number,
        showDeleteButton:boolean,
        gridData:IGridData,
        list:Array<IGridRow>,
        selectedRow:IGridRow,
        deleteEvent:string,
        deleteEventIdField:string,
        editEvent:string,
        editEventIdField:string,
        showEditButton:boolean,
        enablePage:boolean,
        maxSize:number,
        pageSize:IPageSize,
        pageSizes:Array<IPageSize>,
        rowCount:number,
        header:string,
        filterData(filters:Array<IGridFilter>):void,
        linkTo(row:Array<IField>, funcEvent:string, funcIdField:string):void,
        pageSizeChanged (pageSize:number) :void,
        pageChanged ():void,
        sortingChanged(sortField:string):void,
        selectRow (row:IGridRow):void,
        deleteRecord (row:IGridRow):void,
        editRecord (row:IGridRow):void
    }

    class RainGrid {
        constructor() {

        }

        restrict = 'AE';
        templateUrl = 'rainModules/rainGrid/_rainGridTemplate.html';
        replace = false;
        scope = {
            rainGrid: '='
        };
        controller = 'rainGrid.controller';
        controllerAs = 'vm';
    }

    //factory.$inject = ['$timeout'];
    function factory() {
        return new RainGrid();
    }

    angular.module('rainGrid', []).directive('rainGrid', factory);
}