/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="./rainServiceLocalStorage.ts"/>

import storage =rainService.localStorage;

module rainService.currentUser {

    export interface IProfile{
        username:string;
        token:string;
        loggedIn():boolean;
    }

    export interface IRainServiceCurrentUser {
        setProfile(username:string, token:string):void;
        profile:IProfile;
        logout():void;
    }

    export class RainServiceCurrentUser implements IRainServiceCurrentUser {

        userKey = 'tokenKey';

        profile:IProfile;

        constructor(private localStorage:storage.IRainServiceLocalStorage) {
            this.profile = this.getProfile();
        }

        setProfile(username:string, token:string):void {
            this.profile.username = username;
            this.profile.token = token;
            this.localStorage.add(this.userKey, this.profile);
        }

        logout():void {
            this.profile.username = '';
            this.profile.token = '';
            this.localStorage.remove(this.userKey);
        }

        getProfile():IProfile {
            var profile = {
                username: '',
                token: '',
                loggedIn() {
                    return !!this.token;
                }
                /*get loggedIn() {
                 return !!this.token;
                 }*/
            };

            // try to get the profile from local storage
            var localUser = this.localStorage.get(this.userKey);
            if (localUser) {
                profile.username = localUser.username;
                profile.token = localUser.token;
            }
            return profile;
        }
    }

    factory.$inject = ['rainService.localStorage'];
    function factory(localStorage:storage.IRainServiceLocalStorage):IRainServiceCurrentUser {
        return new RainServiceCurrentUser(localStorage);
    }

    angular.module('rainService').factory('rainService.currentUser', factory);
}

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
