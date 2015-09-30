/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="./rainServiceCurrentUser.ts"/>
var CurrentUser = rainService.currentUser;
var rainService;
(function (rainService) {
    var oauth;
    (function (oauth) {
        var OauthService = (function () {
            function OauthService($http, currentUser) {
                this.$http = $http;
                this.currentUser = currentUser;
                this.token = {
                    createToken: OauthService.createToken,
                    decryptToken: OauthService.decryptToken
                };
            }
            OauthService.prototype.login = function (loginEndpoint, username, password) {
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
                    .then(function (response) {
                    self.currentUser.setProfile(username, response.data.access_token);
                    return response;
                }, function (response) {
                    return response;
                });
            };
            OauthService.prototype.logout = function () {
                this.currentUser.logout();
            };
            OauthService.createToken = function (username, password, role) {
                var roleString = '';
                if (role) {
                    roleString = '&role=' + role.key.trim();
                }
                return 'username=' + username.trim() + '&password=' + password.trim() + roleString;
            };
            OauthService.decryptToken = function (token) {
                return OauthService.parseQueryString(token);
            };
            OauthService.parseQueryString = function (queryString) {
                var params = {}, queries, temp, i, l;
                // Split into key/value pairs
                queries = queryString.split("&");
                // Convert the array of strings into an object
                for (i = 0, l = queries.length; i < l; i++) {
                    temp = queries[i].split('=');
                    params[temp[0]] = temp[1];
                }
                return params;
            };
            OauthService.formEncode = function (data) {
                var pairs = [];
                for (var name in data) {
                    pairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
                }
                return pairs.join('&').replace(/%20/g, '+');
            };
            return OauthService;
        })();
        factory.$inject = ['$http', 'rainService.currentUser'];
        function factory($http, currentUser) {
            return new OauthService($http, currentUser);
        }
        angular.module('rainService').factory('rainService.oauth', factory);
    })(oauth = rainService.oauth || (rainService.oauth = {}));
})(rainService || (rainService = {}));
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
//# sourceMappingURL=rainServiceOauth.js.map