/// <reference path="../../typings/tsd.d.ts"/>
var RainGrid;
(function (RainGrid) {
    RainGrid.baseUrl = 'rainModules/rainGrid/';
    (function (SortingOptions) {
        SortingOptions[SortingOptions["NONE"] = 0] = "NONE";
        SortingOptions[SortingOptions["ASC"] = 1] = "ASC";
        SortingOptions[SortingOptions["DSC"] = 2] = "DSC";
    })(RainGrid.SortingOptions || (RainGrid.SortingOptions = {}));
    var SortingOptions = RainGrid.SortingOptions;
    /*export enum ConstraintType{EqualsTo, GreaterThan, LessThan, Contains, StartsWith}*/
    RainGrid.FilterConstraint = {
        EqualsTo: { label: 'equal to', value: 'EqualsTo' },
        GreaterThan: { label: 'greater than', value: 'GreaterThan' },
        LessThan: { label: 'less than', value: 'LessThan' },
        Contains: { label: 'Contains', value: 'Contains' },
        StartsWith: { label: 'starts with', value: 'StartsWith' }
    };
    var RainGridService = (function () {
        function RainGridService($parse, $modal) {
            this.$parse = $parse;
            this.$modal = $modal;
        }
        RainGridService.prototype.setPaginationIcons = function () {
            $('ul.pagination a:contains("<<"):first').html("<i class='fa fa-angle-double-left page-arrow'></i>");
            $('ul.pagination a:contains(">>"):first').html("<i class='fa fa-angle-double-right page-arrow'></i>");
            $('ul.pagination a:contains("<"):first').html("<i class='fa fa-angle-left page-arrow'></i>");
            $('ul.pagination a:contains(">"):first').html("<i class='fa fa-angle-right page-arrow'></i>");
        };
        RainGridService.prototype.getDataListByPage = function (dataList, page, pageSize) {
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
            }
            catch (e) {
                console.log(e.message);
                return null;
            }
        };
        RainGridService.prototype.buildHeader = function (columnDefs) {
            var row = [];
            angular.forEach(columnDefs, function (col) {
                row.push({
                    fieldName: col.field,
                    displayName: col.displayName,
                    isHidden: col.isHidden
                });
            });
            return row;
        }; // end of buildHeader
        RainGridService.prototype.buildGridData = function (gridOptions) {
            var list = gridOptions.dataList;
            var columnDefs = gridOptions.columnDefs;
            var idField = null;
            var id = null;
            var gridList = { rows: [], header: this.buildHeader(columnDefs) };
            if (list.length == 0) {
                return gridList;
            }
            gridList.rows = _.map(list, function (rowData) {
                var fields = [];
                if (!columnDefs) {
                    for (var property in rowData) {
                        if (rowData.hasOwnProperty(property)) {
                            fields.push({
                                field: property,
                                value: rowData[property],
                                displayName: property
                            });
                        }
                    }
                }
                else {
                    idField = gridOptions.idField;
                    if (idField) {
                        id = rowData[gridOptions.idField];
                    }
                    for (var i = 0; i < columnDefs.length; i++) {
                        var col = columnDefs[i];
                        var gridData = {
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
                            linkFunc: col.linkFunc || { funcEvent: '', funcIdField: '' },
                            order: i
                        };
                        fields.push(gridData);
                    }
                }
                var gridRow = { fields: fields, rowSelected: false, idField: idField, id: id };
                return gridRow;
            });
            if (gridOptions.selectFirstRow && gridList.rows.length > 0) {
                gridList.rows[0].rowSelected = true;
            }
            return gridList;
        }; // end of buildGridData
        RainGridService.prototype.getFilterConstraintsByColumnType = function (col) {
            var constraints = [];
            var type = 'text';
            if (col.isNumber || col.isCurrency) {
                type = 'number';
            }
            else if (col.isBoolean) {
                type = 'bool';
            }
            else if (col.isDate) {
                type = 'date';
            }
            switch (type) {
                case 'number':
                    constraints = [
                        RainGrid.FilterConstraint.Contains,
                        RainGrid.FilterConstraint.GreaterThan,
                        RainGrid.FilterConstraint.LessThan
                    ];
                    break;
                case 'bool':
                    constraints = [
                        RainGrid.FilterConstraint.EqualsTo
                    ];
                    break;
                case 'date':
                    constraints = [
                        RainGrid.FilterConstraint.EqualsTo,
                        RainGrid.FilterConstraint.GreaterThan,
                        RainGrid.FilterConstraint.LessThan
                    ];
                    break;
                default:
                    constraints = [
                        RainGrid.FilterConstraint.EqualsTo,
                        RainGrid.FilterConstraint.GreaterThan,
                        RainGrid.FilterConstraint.LessThan,
                        RainGrid.FilterConstraint.Contains,
                        RainGrid.FilterConstraint.StartsWith
                    ];
            }
            return constraints;
        }; // end of getFilterConstraintsByColumnType
        RainGridService.prototype.showFilterModal = function (gridOptions, filters) {
            var modalInstance = this.$modal.open({
                templateUrl: RainGrid.baseUrl + 'rainGridFilterModal/rainGridFilterModalTemplate.html',
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
        }; // end of showFilterModal
        RainGridService.prototype.sortData = function (dataList, sortField, sortOrder) {
            if (!sortField || sortOrder === SortingOptions.NONE) {
                return dataList;
            }
            var sortedData = _.sortBy(dataList, function (row) {
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
        }; // end of sortData
        RainGridService.prototype.filterData = function (dataRows, filters) {
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
                                case RainGrid.FilterConstraint.EqualsTo.value:
                                    condition = condition && column.value == filterExpression;
                                    break;
                                case RainGrid.FilterConstraint.GreaterThan.value:
                                    condition = condition && column.value > filterExpression;
                                    break;
                                case RainGrid.FilterConstraint.LessThan.value:
                                    condition = condition && column.value < filterExpression;
                                    break;
                                case RainGrid.FilterConstraint.Contains.value:
                                    condition = condition && column.value.indexOf(filterExpression) >= 0;
                                    break;
                                case RainGrid.FilterConstraint.StartsWith.value:
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
        }; // end of filterData
        RainGridService.$inject = ['$parse', '$modal'];
        return RainGridService;
    })();
    RainGrid.RainGridService = RainGridService;
    angular.module('rainGrid').service('rainGridService', RainGridService);
})(RainGrid || (RainGrid = {}));
//# sourceMappingURL=rainGridService.js.map