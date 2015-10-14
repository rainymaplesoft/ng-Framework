/**
 * usage:
 * rainService.dialog.confirmModal('Confirm','Are you sure?',function_Ok);
 *
 * */

/// <reference path="../../typings/tsd.d.ts"/>

import ng_ui=angular.ui.bootstrap;
module rainService.dialog {

    export interface IRainConfirm {
        confirmModal(title:string, message:string, func_ok:Function):any;
        messageModal(title:string, markup:string, func_ok:Function):any;
    }

    export class RainConfirm implements IRainConfirm {

        static $modal:ng_ui.IModalService;

        constructor(private $$modal:ng_ui.IModalService) {
            RainConfirm.$modal = $$modal;
        }

        /** confirmModal **/
        confirmModal(title:string, message:string, func_ok:Function):any {

            title = title || 'Confirm';
            message = message || 'Are you sure?';

            var modalInstance = RainConfirm.$modal.open({
                //templateUrl: 'deleteUserModal.html',
                //size:'sm',
                template: getConfirmTemplate(title, message),
                controller: ['$scope', '$modalInstance', confirmController]
            });
            return modalInstance.result;

            function confirmController($scope, $modalInstance) {
                $scope.ok = function () {
                    if (func_ok && angular.isFunction(func_ok)) {
                        func_ok();
                        //return;
                    }
                    $modalInstance.close(true)
                };
                $scope.cancel = function () {
                    $modalInstance.close(false)
                };
            }

            function getConfirmTemplate(title, message) {
                return '<div class="modal-header">'
                    + '<h3 class="modal-title">' + title + '</h3>'
                    + '</div>'
                    + '<div class="modal-body">'
                    + '<p style="font-size: 16px;">' + message + '</p>'
                    + '</div>'
                    + '<div class="modal-footer">'
                    + '<button class="btn btn-primary" ng-click="ok()">Yes</button>'
                    + '<button class="btn btn-warning" ng-click="cancel()">No</button>'
                    + '</div>';
            }
        }

        /** messageModal **/
        messageModal(title:string, markup:string, func_ok:Function):any {
            title = title || 'Information';
            markup = markup || '<p></p>';

            var modalInstance = RainConfirm.$modal.open({
                //size:'sm',
                template: getMessageTemplate(title, markup),
                controller: ['$scope', '$modalInstance', messageController]
            });
            return modalInstance.result;

            function messageController($scope, $modalInstance) {
                $scope.ok = function () {
                    if (func_ok && angular.isFunction(func_ok)) {
                        func_ok();
                        //return;
                    }
                    $modalInstance.close(true)
                };
            }

            function getMessageTemplate(title, markup) {
                return '<div class="modal-header">'
                    + '<h3 class="modal-title">' + title + '</h3>'
                    + '</div>'
                    + '<div class="modal-body">'
                    + markup
                    + '</div>'
                    + '<div class="modal-footer">'
                    + '<button class="btn btn-primary" ng-click="ok()">Close</button>'
                    + '</div>';
            }
        }


    }

    factory.$inject = ['$modal'];
    function factory($modal:ng_ui.IModalService):IRainConfirm {
        return new RainConfirm($modal);
    }

    angular.module('rainService').factory('rainService.dialog', factory);
}

/*

 (function () {

 angular.module('rainService').factory('rainService.dialog', ['$modal', rainConfirm]);

 function rainConfirm($modal) {

 return {
 confirmModal: confirmModal,
 messageModal: messageModal
 };

 // confirmModal
 function confirmModal(title, message, func_ok) {

 title = title || 'Confirm';
 message = message || 'Are you sure?';

 var modalInstance = $modal.open({
 //templateUrl: 'deleteUserModal.html',
 //size:'sm',
 template: getConfirmTemplate(title, message),
 controller: ['$scope', '$modalInstance', confirmController]
 });
 return modalInstance.result;

 function confirmController($scope, $modalInstance) {
 $scope.ok = function () {
 if (func_ok && angular.isFunction(func_ok)) {
 func_ok();
 //return;
 }
 $modalInstance.close(true)
 };
 $scope.cancel = function () {
 $modalInstance.close(false)
 };
 }
 }


 function getConfirmTemplate(title, message) {
 return '<div class="modal-header">'
 + '<h3 class="modal-title">' + title + '</h3>'
 + '</div>'
 + '<div class="modal-body">'
 + '<p style="font-size: 16px;">' + message + '</p>'
 + '</div>'
 + '<div class="modal-footer">'
 + '<button class="btn btn-primary" ng-click="ok()">Yes</button>'
 + '<button class="btn btn-warning" ng-click="cancel()">No</button>'
 + '</div>';
 }

 // messageModal
 function messageModal(title, markup, func_ok) {

 title = title || 'Information';
 markup = markup || '<p></p>';

 var modalInstance = $modal.open({
 //size:'sm',
 template: getMessageTemplate(title, markup),
 controller: ['$scope', '$modalInstance', messageController]
 });
 return modalInstance.result;

 function messageController($scope, $modalInstance) {
 $scope.ok = function () {
 if (func_ok && angular.isFunction(func_ok)) {
 func_ok();
 //return;
 }
 $modalInstance.close(true)
 };
 }
 }


 function getMessageTemplate(title, markup) {
 return '<div class="modal-header">'
 + '<h3 class="modal-title">' + title + '</h3>'
 + '</div>'
 + '<div class="modal-body">'
 + markup
 + '</div>'
 + '<div class="modal-footer">'
 + '<button class="btn btn-primary" ng-click="ok()">Close</button>'
 + '</div>';
 }
 }
 })();
 */