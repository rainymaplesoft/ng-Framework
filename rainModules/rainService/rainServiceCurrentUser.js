/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="./rainServiceLocalStorage.ts"/>
var storage = rainService.localStorage;
var rainService;
(function (rainService) {
    var currentUser;
    (function (currentUser) {
        var RainServiceCurrentUser = (function () {
            function RainServiceCurrentUser(localStorage) {
                this.localStorage = localStorage;
                this.userKey = 'tokenKey';
                this.profile = this.getProfile();
            }
            RainServiceCurrentUser.prototype.setProfile = function (username, token) {
                this.profile.username = username;
                this.profile.token = token;
                this.localStorage.add(this.userKey, this.profile);
            };
            RainServiceCurrentUser.prototype.logout = function () {
                this.profile.username = '';
                this.profile.token = '';
                this.localStorage.remove(this.userKey);
            };
            RainServiceCurrentUser.prototype.getProfile = function () {
                var profile = {
                    username: '',
                    token: '',
                    loggedIn: function () {
                        return !!this.token;
                    }
                };
                // try to get the profile from local storage
                var localUser = this.localStorage.get(this.userKey);
                if (localUser) {
                    profile.username = localUser.username;
                    profile.token = localUser.token;
                }
                return profile;
            };
            return RainServiceCurrentUser;
        })();
        currentUser.RainServiceCurrentUser = RainServiceCurrentUser;
        factory.$inject = ['rainService.localStorage'];
        function factory(localStorage) {
            return new RainServiceCurrentUser(localStorage);
        }
        angular.module('rainService').factory('rainService.currentUser', factory);
    })(currentUser = rainService.currentUser || (rainService.currentUser = {}));
})(rainService || (rainService = {}));
/*
 (function () {
 angular.module('rainService').factory('rainService.currentUser',
 ['rainService.localStorage', currentUser]);

 function currentUser(localStorage) {

 var _userKey = 'tokenKey';
 var profile = getProfile();

 return {
 setProfile: setProfile,
 profile: profile,
 logout: logout
 };

 // Service Functions

 function setProfile(username, token) {
 profile.username = username;
 profile.token = token;
 localStorage.add(_userKey, profile);
 }

 function getProfile() {
 var profile = {
 username: '',
 token: '',
 get loggedIn() {
 return !!this.token;
 }
 };

 // try to get the profile from local storage
 var localUser = localStorage.get(_userKey);
 if (localUser) {
 profile.username = localUser.username;
 profile.token = localUser.token;
 }
 return profile;
 }

 function logout() {
 profile.username = '';
 profile.token = '';
 localStorage.remove(_userKey);
 }
 }
 })();
 */
//# sourceMappingURL=rainServiceCurrentUser.js.map