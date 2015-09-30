/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="./rainServiceCurrentUser.ts"/>

import CurrentUser =rainService.currentUser;

module rainService.oauth {

    interface ILoginResponseData {
        access_token:string;
    }
    interface IToken {
        createToken:Function;
        decryptToken:Function;
    }
    interface IOauthService {
        login(loginEndpoint:string, username:string, password:string):ng.IPromise<ILoginResponseData>;
        logout():void;
        token:IToken;
    }
    class OauthService implements IOauthService {
        token:IToken;

        constructor(private $http:ng.IHttpService, private currentUser:CurrentUser.IRainServiceCurrentUser) {
            this.token = {
                createToken: OauthService.createToken,
                decryptToken: OauthService.decryptToken
            }
        }

        login(loginEndpoint:string, username:string, password:string):ng.IPromise<ILoginResponseData> {
            var self = this;
            var httpConfig = {
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            };
            var data = OauthService.formEncode({
                username: username,
                password: password,
                grant_type: "password"
            });
            return self.$http.post(loginEndpoint, data, httpConfig)
                .then(function (response:ng.IHttpPromiseCallbackArg<ILoginResponseData>) {
                    self.currentUser.setProfile(username, response.data.access_token);
                    return response;
                }, function (response:ng.IHttpPromiseCallbackArg<any>) {
                    return response;
                });
        }

        logout():void {
            this.currentUser.logout();
        }

        static createToken(username, password, role):string {
            var roleString = '';
            if (role) {
                roleString = '&role=' + role.key.trim();
            }
            return 'username=' + username.trim() + '&password=' + password.trim() + roleString;
        }

        static decryptToken(token):{} {
            return OauthService.parseQueryString(token);
        }

        static parseQueryString(queryString):{} {
            var params = {}, queries, temp, i, l;

            // Split into key/value pairs
            queries = queryString.split("&");

            // Convert the array of strings into an object
            for (i = 0, l = queries.length; i < l; i++) {
                temp = queries[i].split('=');
                params[temp[0]] = temp[1];
            }

            return params;
        }

        static formEncode(data):string {
            var pairs = [];
            for (var name in data) {
                pairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
            }
            return pairs.join('&').replace(/%20/g, '+');
        }
    }

    factory.$inject = ['$http', 'rainService.currentUser'];
    function factory($http:ng.IHttpService, currentUser:CurrentUser.IRainServiceCurrentUser):IOauthService {
        return new OauthService($http, currentUser);
    }

    angular.module('rainService').factory('rainService.oauth', factory);

}
/*

(function () {
    var module = angular.module('rainService');

    module.factory('rainService.oauth', ['$http', 'rainService.currentUser', oauth]);

    // -- service -- //
    function oauth($http, currentUser) {
        return {
            login: login,
            logout: logout,
            token: {
                createToken: createToken,
                decryptToken: decryptToken
            }
        };

        //-- Service Functions --//

        // login
        function login(loginEndpoint, username, password) {
            var httpConfig = {
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            };
            var data = formEncode({
                username: username,
                password: password,
                grant_type: "password"
            });
            return $http.post(loginEndpoint, data, httpConfig).then(function (response) {
                currentUser.setProfile(username, response.data.access_token);
                return response;
            }, function (response) {
                return response;
            });
        }

        // logout
        function logout() {
            currentUser.logout();
        }


        function createToken(username, password, role) {
            var roleString = '';
            if (role) {
                roleString = '&role=' + role.key.trim();
            }
            return 'username=' + username.trim() + '&password=' + password.trim() + roleString;
        }

        function decryptToken(token) {
            var profile = parseQueryString(token);
            return profile;
        }

        function parseQueryString(queryString) {
            var params = {}, queries, temp, i, l;

            // Split into key/value pairs
            queries = queryString.split("&");

            // Convert the array of strings into an object
            for (i = 0, l = queries.length; i < l; i++) {
                temp = queries[i].split('=');
                params[temp[0]] = temp[1];
            }

            return params;
        }
    }


    //-- helper functions --//

    function formEncode(data) {
        var pairs = [];
        for (var name in data) {
            pairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        }
        return pairs.join('&').replace(/%20/g, '+');
    }
})();
*/
