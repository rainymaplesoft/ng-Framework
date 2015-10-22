/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../app/appConfig.ts"/>
/// <reference path="../../rainModules/rainService/rainServiceDialog.ts"/>
var m_dialog = rainService.dialog;
var App;
(function (App) {
    var CommonService;
    (function (CommonService_1) {
        var CommonService = (function () {
            function CommonService(appConfig, dialogService) {
                this.appConfig = appConfig;
                this.dialogService = dialogService;
            }
            CommonService.prototype.showProductModal = function (productId) {
                var titleMarkup = '<div style="display:inline-block;margin-left: 10px;' +
                    'font-size: 16px;font-weight: bold;">' + 'Product Detail</div>';
                var modalMarkup = '<product-modal product-id="' + productId + '"></product-modal>';
                this.dialogService.messageModal(titleMarkup, modalMarkup, function () {
                });
            };
            CommonService.prototype.showMessage = function () {
                return {
                    info: function (msg) {
                        this.showMsg(msg, 'info');
                    },
                    warning: function (msg) {
                        this.showMsg(msg, 'warning');
                    },
                    success: function (msg) {
                        this.showMsg(msg, 'success');
                    },
                    error: function (msg) {
                        this.showMsg(msg, 'error');
                    }
                };
            };
            CommonService.prototype.showMsg = function (msg, tool) {
                if (this.appConfig.messageConfig.toastr) {
                    toastr.options.closeButton = true;
                    toastr.options.progressBar = true;
                    switch (tool) {
                        case 'error':
                            toastr.error(msg);
                            break;
                        case 'success':
                            toastr.success(msg);
                            break;
                        case 'warning':
                            toastr.warning(msg);
                            break;
                        default:
                            toastr.info(msg);
                            break;
                    }
                }
                else if (this.appConfig.messageConfig.alert) {
                    alert(msg);
                }
                if (this.appConfig.messageConfig.consoleLog) {
                    console.log(msg);
                }
            };
            CommonService.$inject = ['appConfig', 'rainService.dialog'];
            return CommonService;
        })();
        CommonService_1.CommonService = CommonService;
        angular.module('app-framework').service('commonService', CommonService);
    })(CommonService = App.CommonService || (App.CommonService = {}));
})(App || (App = {}));
/*

(function () {

    var module = angular.module('app-framework');

    module.factory('commonService', [
        'appConfig'
        , 'rainService.dialog'
        , commonService]);

    function commonService(appConfig, dialogService) {
        return {
            showProductModal: showProductModal,
            showMessage: showMessage()

        };

        //-- Service Functions --/

        //showProductModal

        function showProductModal(productId) {

            var titleMarkup = '<div style="display:inline-block;margin-left: 10px;' +
                'font-size: 16px;font-weight: bold;">' + 'Product Detail</div>';
            var modalMarkup = '<product-modal product-id="' + productId + '"></product-modal>';

            dialogService.messageModal(titleMarkup, modalMarkup);
        }

        // showMessage

        function showMessage() {
            return {
                info: function (msg) {
                    showMsg(msg, 'info')
                },
                warning: function (msg) {
                    showMsg(msg, 'warning')
                },
                success: function (msg) {
                    showMsg(msg, 'success')
                },
                error: function (msg) {
                    showMsg(msg, 'error')
                }
            };

            function showMsg(msg, tool) {
                if (appConfig.messageConfig.toastr) {
                    toastr.options.closeButton = true;
                    toastr.options.progressBar = true;
                    switch (tool) {
                        case 'error':
                            toastr.error(msg);
                            break;
                        case 'success':
                            toastr.success(msg);
                            break;
                        case 'warning':
                            toastr.warning(msg);
                            break;
                        default :
                            toastr.info(msg);
                            break;
                    }

                } else if (appConfig.messageConfig.alert) {
                    alert(msg);
                }
                if (appConfig.messageConfig.consoleLog) {
                    console.log(msg);
                }
            }
        }


    }
})();
*/
//# sourceMappingURL=commonService.js.map