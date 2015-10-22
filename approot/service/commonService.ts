/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="../app/appConfig.ts"/>
/// <reference path="../../rainModules/rainService/rainServiceDialog.ts"/>


import m_dialog = rainService.dialog;

module App.CommonService {
    interface ICommonService {
        showProductModal(productId:string):void;
        showMessage():void;
    }
    export class CommonService implements ICommonService {

        static $inject = ['appConfig', 'rainService.dialog'];

        constructor(private appConfig:App.IAppConfig, private dialogService:m_dialog.IRainDialog) {

        }

        showProductModal(productId:string):void {

            var titleMarkup = '<div style="display:inline-block;margin-left: 10px;' +
                'font-size: 16px;font-weight: bold;">' + 'Product Detail</div>';
            var modalMarkup = '<product-modal product-id="' + productId + '"></product-modal>';

            this.dialogService.messageModal(titleMarkup, modalMarkup, function () {
            });
        }


        showMessage() {
            return {
                info: function (msg) {
                    this.showMsg(msg, 'info')
                },
                warning: function (msg) {
                    this.showMsg(msg, 'warning')
                },
                success: function (msg) {
                    this.showMsg(msg, 'success')
                },
                error: function (msg) {
                    this.showMsg(msg, 'error')
                }
            };
        }

        showMsg(msg, tool) {
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
                    default :
                        toastr.info(msg);
                        break;
                }

            } else if (this.appConfig.messageConfig.alert) {
                alert(msg);
            }
            if (this.appConfig.messageConfig.consoleLog) {
                console.log(msg);
            }
        }
    }
    angular.module('app-framework').service('commonService', CommonService);
}
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
