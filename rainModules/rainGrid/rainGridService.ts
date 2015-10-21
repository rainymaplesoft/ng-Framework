/// <reference path="../../typings/tsd.d.ts"/>
 module RainGrid {

        export var baseUrl = 'rainModules/rainGrid/';

        export enum SortingOptions {NONE, ASC, DSC}

        /*export enum ConstraintType{EqualsTo, GreaterThan, LessThan, Contains, StartsWith}*/

        export var FilterConstraint = {
            EqualsTo: {label: 'equal to', value: 'EqualsTo'},
            GreaterThan: {label: 'greater than', value: 'GreaterThan'},
            LessThan: {label: 'less than', value: 'LessThan'},
            Contains: {label: 'Contains', value: 'Contains'},
            StartsWith: {label: 'starts with', value: 'StartsWith'}
        };

        export interface IConstraint {
            label?:string,
            value?:any
        }

        export interface IFilterColumn {
            label?: string,
            value?: any,
            isNumber?: boolean,
            isCurrency?: boolean,
            isBoolean?: boolean,
            isDate?: boolean
        }

        export interface IGridFilter {
            col:IFilterColumn,
            constraint:IConstraint,
            expression:string
        }

        export interface IColumnDefs {
            field: string,
            displayName: string,
            isHidden?: boolean,
            isLink?:boolean,
            isCurrency?:boolean,
            isNumber?:boolean,
            decimal?:number,
            isCheckbox?:boolean,
            isBoolean?:boolean,
            isButton?:boolean,
            isIcon?:boolean,
            isDate?:boolean,
            order?:number,
            linkFunc?:IGridCellLinkFunc
        }

        export interface IField extends IColumnDefs {
            id?:string,
            value: any,
        }


        export interface IGridRow {
            fields: Array<IField>, rowSelected: boolean, idField: string, id: string
        }
        export interface IGridHeader {
            fieldName:string,
            displayName:string,
            isHidden:boolean
        }

        export interface IGridData {
            rows:Array<IGridRow>,
            header:Array<IGridHeader>
        }
        export interface IGridCellLinkFunc {
            funcIdField:string,
            funcEvent:string
        }

        export interface IGridRowLink {
            funcEvent:string,
            funcIdField:string,
            enable:boolean,
            place:number
        }

        export interface IRowSelectedEvent {
            funcEvent: string, funcIdField:string
        }
        export interface IGridOptions {
            idField:string,
            title:string,
            columnDefs:Array<IColumnDefs>,
            data?:ng.IPromise<any>,
            dataList?:Array<any>
            selectable?:boolean,
            selectFirstRow?:boolean,
            showToolMenu?:boolean,
            enablePage?:boolean,
            pageSize?:number,
            deleteLink?:IGridRowLink,
            editLink?:IGridRowLink,
            rowSelectedEvent?:IRowSelectedEvent
        }
        export interface IRainGridService {
            setPaginationIcons():void;
            getDataListByPage(dataList:Array<any>, page:number, pageSize:number):Array<IGridRow>;
            buildGridData(gridOptions:IGridOptions):IGridData;
            getFilterConstraintsByColumnType(col:IFilterColumn):Array<IConstraint>
            showFilterModal(gridOptions:IGridOptions, filters:Array<IGridFilter>):ng.IPromise<any>;
            sortData(dataList:Array<any>, sortField:string, sortOrder:SortingOptions):Array<IGridRow>
            filterData(dataRows:Array<IGridRow>, filters:Array<IGridFilter>):Array<IGridRow>;
        }
        export class RainGridService<T> implements IRainGridService {

            static $inject = ['$parse', '$modal'];

            constructor(private $parse:ng.IParseService, private $modal:ng.ui.bootstrap.IModalService) {
            }

            setPaginationIcons():void {
                $('ul.pagination a:contains("<<"):first').html("<i class='fa fa-angle-double-left page-arrow'></i>");
                $('ul.pagination a:contains(">>"):first').html("<i class='fa fa-angle-double-right page-arrow'></i>");
                $('ul.pagination a:contains("<"):first').html("<i class='fa fa-angle-left page-arrow'></i>");
                $('ul.pagination a:contains(">"):first').html("<i class='fa fa-angle-right page-arrow'></i>");
            }

            getDataListByPage(dataList:Array<IGridRow>, page:number, pageSize:number):Array<IGridRow> {
                // page starts with 1
                if (!dataList || page <= 0) {
                    return null;
                }
                try {
                    //dataList = sortData(dataList);

                    var start = (page - 1) * pageSize;
                    var pagedData = _.slice(dataList, start, start + pageSize);
                    if (!pagedData) {
                        return null;
                    }
                    return pagedData;
                } catch (e) {
                    console.log(e.message);
                    return null;
                }
            }

            buildHeader(columnDefs:Array<IColumnDefs>):Array<IGridHeader> {
                var row = [];
                angular.forEach(columnDefs, function (col:IColumnDefs) {
                    row.push({
                        fieldName: col.field,
                        displayName: col.displayName,
                        isHidden: col.isHidden
                    });
                });
                return row;
            }   // end of buildHeader

            buildGridData(gridOptions:IGridOptions):IGridData {
                var list = gridOptions.dataList;
                var columnDefs = gridOptions.columnDefs;
                var idField = null;
                var id = null;


                var gridList = {rows: [], header: this.buildHeader(columnDefs)};
                if (list.length == 0) {
                    return gridList;
                }
                gridList.rows = _.map(list, function (rowData) {
                    var fields:Array<IField> = [];
                    if (!columnDefs) {
                        for (var property in rowData) {
                            if (rowData.hasOwnProperty(property)) {
                                fields.push(
                                    {
                                        field: property,
                                        value: rowData[property],
                                        displayName: property
                                    });
                            }
                        }
                    } else {
                        idField = gridOptions.idField;
                        if (idField) {
                            id = rowData[gridOptions.idField];
                        }
                        for (var i = 0; i < columnDefs.length; i++) {
                            var col = columnDefs[i];
                            var gridData:IField = {
                                id: rowData[gridOptions.idField],
                                field: col.field,
                                value: (rowData[col.field] === null || rowData[col.field] === undefined)
                                    ? '' : rowData[col.field],
                                displayName: col.displayName,
                                isCheckbox: col.isCheckbox,
                                isCurrency: col.isCurrency,
                                isNumber: col.isNumber,
                                decimal: col.decimal,
                                isLink: col.isLink,
                                isButton: col.isButton,
                                isIcon: col.isIcon,
                                isDate: col.isDate,
                                isHidden: col.isHidden || false,
                                linkFunc: col.linkFunc || {funcEvent: '', funcIdField: ''},
                                order: i
                            };
                            fields.push(gridData);
                        }
                    }
                    var gridRow:IGridRow = {fields: fields, rowSelected: false, idField: idField, id: id};
                    return gridRow;
                });
                if (gridOptions.selectFirstRow && gridList.rows.length > 0) {
                    gridList.rows[0].rowSelected = true;
                }

                return gridList;
            }   // end of buildGridData

            getFilterConstraintsByColumnType(col:IFilterColumn):Array<IConstraint> {
                var constraints = [];
                var type = 'text';
                if (col.isNumber || col.isCurrency) {
                    type = 'number';
                } else if (col.isBoolean) {
                    type = 'bool';
                } else if (col.isDate) {
                    type = 'date';
                }
                switch (type) {
                    case 'number':
                        constraints = [
                            FilterConstraint.Contains,
                            FilterConstraint.GreaterThan,
                            FilterConstraint.LessThan
                        ];
                        break;
                    case 'bool':
                        constraints = [
                            FilterConstraint.EqualsTo
                        ];
                        break;
                    case 'date':
                        constraints = [
                            FilterConstraint.EqualsTo,
                            FilterConstraint.GreaterThan,
                            FilterConstraint.LessThan
                        ];
                        break;
                    default :
                        constraints = [
                            FilterConstraint.EqualsTo,
                            FilterConstraint.GreaterThan,
                            FilterConstraint.LessThan,
                            FilterConstraint.Contains,
                            FilterConstraint.StartsWith
                        ];
                }
                return constraints;
            }   // end of getFilterConstraintsByColumnType

            showFilterModal(gridOptions:IGridOptions, filters:Array<IGridFilter>):ng.IPromise<any> {
                var modalInstance = this.$modal.open({
                    templateUrl: baseUrl + 'rainGridFilterModal/rainGridFilterModalTemplate.html',
                    controller: 'rainGrid.filterModal.controller',
                    controllerAs: 'vm',
                    resolve: {
                        columnDefs: function () {
                            return gridOptions.columnDefs;
                        },
                        filters: function () {
                            return filters;
                        }
                    }
                });

                return modalInstance.result;
                /**
                 var modalInstance = rainGridService.showFilterModal(gridOptions, filters);
                 modalInstance.then(function (obj) {
                return value from $modalInstance.close(obj)
             }, function () {
             });
                 **/
            }   // end of showFilterModal

            sortData(dataList:Array<IGridRow>, sortField:string, sortOrder:SortingOptions):Array<IGridRow> {

                if (!sortField || sortOrder === SortingOptions.NONE) {
                    return dataList;
                }
                var sortedData = _.sortBy(dataList, function (row:IGridRow) {
                    var rowData = row.fields;
                    var sortedValue = null;
                    for (var i = 0; i < rowData.length; i++) {
                        if (rowData[i].field === sortField) {
                            sortedValue = rowData[i].value;
                            return sortedValue;
                        }
                    }
                });
                return sortOrder === SortingOptions.ASC ? sortedData : sortedData.reverse();
            }   // end of sortData

            filterData(dataRows:Array<IGridRow>, filters:Array<IGridFilter>):Array<IGridRow> {

                var _dataList = [];

                // if there's not filter, just return the original data list
                if (filters.length === 0 || !filters[0].col) {
                    _dataList = dataRows;
                    return _dataList;
                }

                _dataList = _.filter(dataRows, function (row) {
                    var rowData = row.fields;
                    var condition = true;
                    for (var i = 0; i < rowData.length; i++) {
                        var column = rowData[i];
                        for (var j = 0; j < filters.length; j++) {
                            var filter = filters[j];
                            var filteredField = filter.col.value;
                            var filterConstraint = filter.constraint.value;
                            var filterExpression = filter.expression;
                            if (column.field === filteredField) {
                                switch (filterConstraint) {
                                    case FilterConstraint.EqualsTo.value:
                                        condition = condition && column.value == filterExpression;
                                        break;
                                    case FilterConstraint.GreaterThan.value:
                                        condition = condition && column.value > filterExpression;
                                        break;
                                    case FilterConstraint.LessThan.value:
                                        condition = condition && column.value < filterExpression;
                                        break;
                                    case FilterConstraint.Contains.value:
                                        condition = condition && column.value.indexOf(filterExpression) >= 0;
                                        break;
                                    case FilterConstraint.StartsWith.value:
                                        condition = condition && column.value.indexOf(filterExpression) === 0;
                                        break;
                                }
                                if (!condition) {
                                    break;
                                }
                            }
                        }
                        if (!condition) {
                            break;
                        }
                    }
                    return condition;
                });

                return _dataList;
            }   // end of filterData

        }
        angular.module('rainGrid').service('rainGridService', RainGridService);
    }
