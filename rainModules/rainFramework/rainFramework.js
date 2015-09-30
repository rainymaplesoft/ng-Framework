/*
 * Accepted attributes: title, sub-title, router, icon-file
 * */
/// <reference path="../../typings/tsd.d.ts"/>
var rain;
(function (rain) {
    var framework;
    (function (framework) {
        var RainFrameworkDirective = (function () {
            function RainFrameworkDirective() {
                this.transclude = true;
                this.scope = {
                    headerTitle: '@',
                    headerSubTitle: '@',
                    iconFile: '@',
                    router: '@'
                };
                this.controller = 'rainFramework.controller';
                this.controllerAs = 'vm';
                this.templateUrl = 'rainModules/rainFramework/rainFrameworkTemplate.html';
            }
            RainFrameworkDirective.instance = function () {
                return new RainFrameworkDirective();
            };
            return RainFrameworkDirective;
        })();
        angular.module('rainFramework', ['rainMenu']).directive('rainFramework', RainFrameworkDirective.instance);
    })(framework = rain.framework || (rain.framework = {}));
})(rain || (rain = {}));
//# sourceMappingURL=rainFramework.js.map