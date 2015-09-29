/// <reference path="../../typings/tsd.d.ts"/>
var rainService;
(function (rainService) {
    var localStorage;
    (function (localStorage) {
        var RainServiceLocalStorage = (function () {
            function RainServiceLocalStorage($window) {
                this.$window = $window;
                this.store = $window.localStorage;
            }
            RainServiceLocalStorage.prototype.add = function (key, value) {
                value = angular.toJson(value);
                this.store.setItem(key, value);
            };
            RainServiceLocalStorage.prototype.get = function (key) {
                var value = this.store.getItem(key);
                if (value) {
                    value = angular.fromJson(value);
                }
                return value;
            };
            RainServiceLocalStorage.prototype.remove = function (key) {
                this.store.removeItem(key);
            };
            return RainServiceLocalStorage;
        })();
        localStorage.RainServiceLocalStorage = RainServiceLocalStorage;
        factory.$inject = ['$window'];
        function factory($window) {
            return new RainServiceLocalStorage($window);
        }
        angular.module('rainService').factory('rainService.localStorage', factory);
    })(localStorage = rainService.localStorage || (rainService.localStorage = {}));
})(rainService || (rainService = {}));
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
//# sourceMappingURL=rainServiceLocalStorage.js.map