/// <reference path="../../typings/tsd.d.ts"/>
var rain;
(function (rain) {
    var checkbox;
    (function (checkbox) {
        var RainCheckController = (function () {
            function RainCheckController($scope) {
                this.onclick = function () {
                    if ($scope.readonly === true) {
                        return;
                    }
                    $scope.rainCheckbox = !$scope.rainCheckbox;
                    $scope.onChanging();
                };
            }
            RainCheckController.prototype.onclick = function () {
            };
            RainCheckController.$inject = ['$scope'];
            return RainCheckController;
        })();
        var RainCheckboxDirective = (function () {
            function RainCheckboxDirective() {
                this.restrict = 'AE';
                this.template = getTemplate();
                this.replace = false;
                this.scope = {
                    rainCheckbox: '=',
                    text: '@',
                    readonly: '=',
                    onChanging: '&'
                };
                this.controller = RainCheckController;
                this.controllerAs = 'vm';
                this.link = function (scope, element) {
                    setReadOnly();
                    scope.$watch('readonly', function () {
                        setReadOnly();
                    });
                    function setReadOnly() {
                        var label = element.find('input:checkbox+label');
                        if (scope.readonly === true) {
                            label.addClass('readonly');
                        }
                        else {
                            label.removeClass('readonly');
                        }
                    }
                };
            }
            RainCheckboxDirective.instance = function () {
                return new RainCheckboxDirective;
            };
            return RainCheckboxDirective;
        })();
        angular.module('rainCheckbox', []).directive('rainCheckbox', RainCheckboxDirective.instance);
        function getTemplate() {
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
    })(checkbox = rain.checkbox || (rain.checkbox = {}));
})(rain || (rain = {}));
//# sourceMappingURL=rainCheckbox.js.map