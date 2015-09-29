/// <reference path="../../typings/tsd.d.ts"/>
module rainService.localStorage {

    interface IStorage {
        setItem(key:string, value:any):void;
        getItem(key:string):any;
        removeItem(key:string):void;
    }

    export interface IRainServiceLocalStorage {
        add(key:string, value:any):void;
        get(key:string):any;
        remove(key:string):void;
    }

    export class RainServiceLocalStorage implements IRainServiceLocalStorage {

        store:IStorage;

        constructor(private $window:ng.IWindowService) {
            this.store = $window.localStorage;
        }

        add(key:string, value:any):void {
            value = angular.toJson(value);
            this.store.setItem(key, value);
        }

        get(key:string):any {
            var value = this.store.getItem(key);
            if (value) {
                value = angular.fromJson(value);
            }
            return value;
        }

        remove(key:string):void {
            this.store.removeItem(key);
        }
    }

    factory.$inject = ['$window'];
    function factory($window:ng.IWindowService):IRainServiceLocalStorage {
        return new RainServiceLocalStorage($window);
    }

    angular.module('rainService').factory('rainService.localStorage', factory);

}

/*
(function () {
    angular.module('rainService').factory('rainService.localStorage', ['$window', localStorage]);

    function localStorage($window) {
        var store = $window.localStorage;

        return {
            add: add,
            get: get,
            remove: remove
        };

        // service functions

        function add(key, value) {
            value = angular.toJson(value);
            store.setItem(key, value);
        }

        function get(key) {
            var value = store.getItem(key);
            if (value) {
                value = angular.fromJson(value);
            }
            return value;
        }

        function remove(key) {
            store.removeItem(key);
        }
    }
})();*/
