/// <reference path="../../typings/tsd.d.ts"/>

module App {

    var module = angular.module('app-framework');

    export interface IMessageConfig {
        consoleLog:boolean,
        alert: boolean,
        toastr: boolean
    }

    export interface IAppConfig{
        router:string;
        messageConfig:IMessageConfig;
        loginEndpoint:string;
    }
    export class AppConfig implements IAppConfig{
        router:string;
        messageConfig:IMessageConfig;
        loginEndpoint:string;

        private _router = {
            newRoute: 'NGNEWROUTER',
            uiRouter: 'UIROUTER',
            ngRouter: 'NGROUTE'
        };
        private _messageConfig = {
            consoleLog: false,
            alert: false,
            toastr: true
        };

        constructor() {
            this.router = this._router.uiRouter;
            this.messageConfig = this._messageConfig;
            this.loginEndpoint = '/api/login';

        }
    }


    module.value('appConfig', new AppConfig());

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
}

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
