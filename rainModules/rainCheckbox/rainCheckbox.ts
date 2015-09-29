/// <reference path="../../typings/tsd.d.ts"/>

module rain.checkbox {

    interface IScope extends ng.IScope {
        readonly:boolean;
        rainCheckbox:boolean;
        //onChanging():void;
    }

    class RainCheckController {
        static $inject = ['$scope'];

        constructor($scope:IScope) {
            this.onclick = function () {
                if ($scope.readonly === true) {
                    return;
                }
                $scope.rainCheckbox = !$scope.rainCheckbox;
                //$scope.onChanging();
            }
        }

        onclick():void {
        }
    }

    class RainCheckboxDirective implements ng.IDirective {

        static instance():ng.IDirective {
            return new RainCheckboxDirective;
        }

        restrict = 'AE';
        template = getTemplate();
        replace = false;
        scope = {
            rainCheckbox: '=',
            text: '@',
            readonly: '=',
            onChanging: '&'
        };
        controller = RainCheckController;
        controllerAs = 'vm';
        link = (scope:IScope, element:ng.IAugmentedJQuery):void => {
            setReadOnly();
            scope.$watch('readonly', function () {
                setReadOnly();
            });
            function setReadOnly():void {
                var label = element.find('input:checkbox+label');
                if (scope.readonly === true) {
                    label.addClass('readonly');
                } else {
                    label.removeClass('readonly');
                }
            }
        }

    }

    angular.module('rainCheckbox', []).directive('rainCheckbox', RainCheckboxDirective.instance);

    function getTemplate():string {
        return '<div class="rain-checkbox-container">' +
            '<div class="checkbox-image">' +
            '<div  class="rain-checkbox">' +
            '<input type="checkbox" ng-model="rainCheckbox" style="display: inline;"/>' +
            '<label class="checkbox-label" ng-click="vm.onclick()"></label>' +
            '</div>' +
            '</div>' +
            '<div class="checkbox-text">' +
            '{{text}}</div>' +
            '</div>';
    }
}
