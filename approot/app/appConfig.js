/// <reference path="../../typings/tsd.d.ts"/>
var App;
(function (App) {
    var module = angular.module('app-framework');
    var AppConfig = (function () {
        function AppConfig() {
            this._router = {
                newRoute: 'NGNEWROUTER',
                uiRouter: 'UIROUTER',
                ngRouter: 'NGROUTE'
            };
            this._messageConfig = {
                consoleLog: false,
                alert: false,
                toastr: true
            };
            this.router = this._router.uiRouter;
            this.messageConfig = this._messageConfig;
            this.loginEndpoint = '/api/login';
        }
        return AppConfig;
    })();
    App.AppConfig = AppConfig;
    module.value('appConfig', new AppConfig());
    module.config(["$provide", function ($provide) {
            $provide.decorator("$exceptionHandler", exceptionDecorator);
            function exceptionDecorator($delegate) {
                return function (exception, cause) {
                    $delegate(exception, cause);
                    // toastr.error(exception.message);
                    // console.log(exception.message);
                    // alert(exception.message);
                };
            }
        }]);
})(App || (App = {}));
/*
 (function () {
 var module = angular.module('app-framework');

 var _router={
 newRoute:'NGNEWROUTER',
 uiRouter:'UIROUTER',
 ngRouter:'NGROUTE'
 };

 var _messageConfig={
 consoleLog:false,
 alert:false,
 toastr:true
 };

 module.value('appConfig',{
 router: _router.uiRouter,
 messageConfig:_messageConfig,
 loginEndpoint:'/api/login'
 });

 module.config(["$provide", function ($provide) {

 $provide.decorator("$exceptionHandler", exceptionDecorator);

 function exceptionDecorator($delegate) {
 return function (exception, cause) {
 $delegate(exception, cause);
 // toastr.error(exception.message);
 // console.log(exception.message);
 // alert(exception.message);
 }
 }
 }]
 )
 })();
 */
//# sourceMappingURL=appConfig.js.map