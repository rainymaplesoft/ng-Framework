/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="./rainServiceCurrentUser.ts"/>
var CurrentUser = rainService.currentUser;
var rainService;
(function (rainService) {
    var httpInterceptor;
    (function (httpInterceptor) {
        var module = angular.module('rainService');
        var AddToken = (function () {
            function AddToken($q, currentUser) {
                this.$q = $q;
                this.currentUser = currentUser;
                this.request = this.funcRequest;
                AddToken._currentUser = this.currentUser;
                AddToken._q = this.$q;
            }
            AddToken.prototype.funcRequest = function (config) {
                var user = AddToken._currentUser;
                var $q = AddToken._q;
                if (user.profile.loggedIn) {
                    config.headers['Authorization'] = 'Bearer ' + user.profile.token;
                }
                return $q.when(config);
            };
            return AddToken;
        })();
        factoryAddToken.$inject = ['$q', 'rainService.currentUser'];
        function factoryAddToken($q, currentUser) {
            return new AddToken($q, currentUser);
        }
        module.factory('rainService.addToken', factoryAddToken);
        var LoginRedirect = (function () {
            function LoginRedirect($q, $rootScope, $location) {
                this.$q = $q;
                this.$rootScope = $rootScope;
                this.$location = $location;
                // Interceptors convention, return an object with 'responseError' property
                this.responseError = this.funcResponseError;
            }
            LoginRedirect.prototype.funcResponseError = function (response) {
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
            };
            return LoginRedirect;
        })();
        factoryLoginRedirect.$inject = ['$q', 'rainService.currentUser'];
        function factoryLoginRedirect($q, $rootScope, $location) {
            return new LoginRedirect($q, $rootScope, $location);
        }
        module.factory('rainService.loginRedirect', factoryLoginRedirect);
        // -- interceptors --//
        // about interceptor -- https://docs.angularjs.org/api/ng/service/$http
        module.config(function ($httpProvider) {
            $httpProvider.interceptors.push('rainService.addToken');
        });
        module.config(function ($httpProvider) {
            $httpProvider.interceptors.push('rainService.loginRedirect');
        });
    })(httpInterceptor = rainService.httpInterceptor || (rainService.httpInterceptor = {}));
})(rainService || (rainService = {}));
/*

(function () {
    var module = angular.module('rainService');

    // -- service: addToken -- //

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
//# sourceMappingURL=rainServiceHttpInterceptor.js.map