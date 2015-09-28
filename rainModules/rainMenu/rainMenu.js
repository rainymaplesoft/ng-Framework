/// <reference path="../../typings/tsd.d.ts"/>
var rain;
(function (rain) {
    var menu;
    (function (menu) {
        var directive;
        (function (directive) {
            var RainMenuDirective = (function () {
                function RainMenuDirective($timeout) {
                    var _this = this;
                    this.$timeout = $timeout;
                    this.restrict = 'AE';
                    this.transclude = true;
                    this.scope = {
                        horizontalMenu: '='
                    };
                    this.controller = 'rainMenu.controller';
                    this.templateUrl = 'rainModules/rainMenu/rainMenuTemplate.html';
                    this.link = function (scope, element) {
                        var _self = _this;
                        //openFirstMenu();
                        function openFirstMenu() {
                            var item = element.find('.r-selectable-item:first');
                            if (item) {
                                _self.$timeout(function () {
                                    item.trigger('click');
                                });
                            }
                        }
                    };
                }
                return RainMenuDirective;
            })();
            factory.$inject = ['$timeout'];
            function factory($timeout) {
                return new RainMenuDirective($timeout);
            }
            angular.module('rainMenu', []).directive('rainMenu', factory);
        })(directive = menu.directive || (menu.directive = {}));
    })(menu = rain.menu || (rain.menu = {}));
})(rain || (rain = {}));
//# sourceMappingURL=rainMenu.js.map