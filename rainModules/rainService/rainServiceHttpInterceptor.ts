/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="./rainServiceCurrentUser.ts"/>

import CurrentUser =rainService.currentUser;

module rainService.httpInterceptor {

    var module = angular.module('rainService');

    // -- service: addToken -- //

    interface IAddToken {
        // this service must return an object with property 'request'
        request(config:ng.IHttpProviderDefaults):ng.IPromise<ng.IHttpProviderDefaults>;
    }
    class AddToken implements IAddToken {

        //request : Function;

        static _currentUser:CurrentUser.IRainServiceCurrentUser;
        static _q:ng.IQService;

        constructor(private $q:ng.IQService,
                    private currentUser:CurrentUser.IRainServiceCurrentUser) {
            //this.request = AddToken.funcRequest;
            AddToken._currentUser = this.currentUser;
            AddToken._q = this.$q;
        }

        request(config:ng.IHttpProviderDefaults):ng.IPromise<ng.IHttpProviderDefaults> {
            var user = AddToken._currentUser;
            var $q = AddToken._q;
            if (user.profile.loggedIn) {
                config.headers['Authorization'] = 'Bearer ' + user.profile.token;
            }
            return $q.when(config);
        }

    }

    factoryAddToken.$inject = ['$q', 'rainService.currentUser'];
    function factoryAddToken($q:ng.IQService, currentUser:CurrentUser.IRainServiceCurrentUser):IAddToken {
        return new AddToken($q, currentUser);
    }

    module.factory('rainService.addToken', factoryAddToken);


    // -- service: loginRedirect -- //

    interface ILoginRedirect {
        // this service must return an object with 'responseError' property
        responseError:Function;
    }
    class LoginRedirect implements ILoginRedirect {
        responseError:Function;

        constructor(private $q:ng.IQService,
                    private $rootScope:ng.IRootScopeService,
                    private $location:ng.ILocationService) {


            // Interceptors convention, return an object with 'responseError' property
            //this.responseError = this.funcResponseError;
            this.responseError = this.funcResponseError(this.$q, this.$rootScope, this.$location);

        }

        funcResponseError($q:ng.IQService, $rootScope:ng.IRootScopeService, $location:ng.ILocationService) {
            return function (response) {
                if (response.status == 401 || response.status == 403) {

                    // controller of application level should handle this event
                    $rootScope.$broadcast('AUTHENTICATION_EVENT', {
                        // show error message according to the status code
                        statusCode: response.status,
                        // can be redirected to this path after authenticated
                        requestedPath: $location.path(),
                        // for debug
                        eventSource: 'rainService.loginRedirect.responseError'
                    });
                }
                return $q.reject(response);
            }
        }

        /*
         funcResponseError(response) {
         if (response.status == 401 || response.status == 403) {

         // controller of application level should handle this event
         this.$rootScope.$broadcast('AUTHENTICATION_EVENT', {
         // show error message according to the status code
         statusCode: response.status,
         // can be redirected to this path after authenticated
         requestedPath: this.$location.path(),
         // for debug
         eventSource: 'rainService.loginRedirect.responseError'
         });
         }
         return this.$q.reject(response);
         }*/

    }

    factoryLoginRedirect.$inject = ['$q', '$rootScope','$location'];
    function factoryLoginRedirect($q:ng.IQService,
                                  $rootScope:ng.IRootScopeService,
                                  $location:ng.ILocationService):ILoginRedirect {
        return new LoginRedirect($q, $rootScope, $location);
    }

    module.factory('rainService.loginRedirect', factoryLoginRedirect);

// -- interceptors -- //
// about interceptor -- https://docs.angularjs.org/api/ng/service/$http

    module.config(function ($httpProvider) {
        $httpProvider.interceptors.push('rainService.addToken');
    });
    module.config(function ($httpProvider) {
        $httpProvider.interceptors.push('rainService.loginRedirect');
    });
}

/*

 (function () {
 var module = angular.module('rainService');

 // --- service: addToken --- //

 module.factory('rainService.addToken', ['$q', 'rainService.currentUser', addToken]);

 function addToken($q, currentUser) {

 var request = function (config) {
 if (currentUser.profile.loggedIn) {
 config.headers.Authorization = 'Bearer ' + currentUser.profile.token;
 }
 return $q.when(config);
 };
 return {
 request: request
 }
 }

 // -- service: loginRedirect -- //

 module.factory('rainService.loginRedirect', ['$q', '$rootScope', '$location', loginRedirect]);

 function loginRedirect($q, $rootScope, $location) {

 var responseError = function (response) {
 if (response.status == 401 || response.status == 403) {

 // controller of application level should handle this event
 $rootScope.$broadcast('AUTHENTICATION_EVENT', {
 // show error message according to the status code
 statusCode: response.status,
 // can be redirected to this path after authenticated
 requestedPath: $location.path(),
 // for debug
 eventSource:'rainService.loginRedirect.responseError'
 });
 }
 return $q.reject(response);
 };

 // Interceptors convention, return a 'responseError' property
 return {
 responseError: responseError
 }
 }



 // -- interceptors --//
 // about interceptor -- https://docs.angularjs.org/api/ng/service/$http

 module.config(function ($httpProvider) {
 $httpProvider.interceptors.push('rainService.addToken');
 });
 module.config(function ($httpProvider) {
 $httpProvider.interceptors.push('rainService.loginRedirect');
 });
 })();
 */
