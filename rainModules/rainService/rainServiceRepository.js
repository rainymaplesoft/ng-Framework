/// <reference path="../../typings/tsd.d.ts"/>
var rainService;
(function (rainService) {
    var repository;
    (function (repository) {
        var RepositoryService = (function () {
            function RepositoryService($http) {
                this.$http = $http;
            }
            RepositoryService.prototype.getDataList = function (entity) {
                return this.$http.get(entity.url).then(function (result) {
                    return result.data;
                });
            };
            RepositoryService.prototype.getDataById = function (entity, id) {
                return this.$http.get(entity.url + '/' + id).then(function (result) {
                    return result.data;
                });
            };
            RepositoryService.prototype.deleteDataById = function (entity, id) {
                return this.$http.delete(entity.url + '/' + id).then(function (result) {
                    return result.data; // return the deleted object
                });
            };
            RepositoryService.prototype.deleteDataByQueryString = function (entity, queryString) {
                return this.$http.delete(entity.url + '?' + queryString).then(function (result) {
                    return result.data;
                });
            };
            RepositoryService.prototype.addOrUpdateData = function (entity, object) {
                return this.$http.post(entity.url, object).then(function (result) {
                    return result.data;
                });
            };
            RepositoryService.$inject = ['$http'];
            return RepositoryService;
        })();
        repository.RepositoryService = RepositoryService;
        angular.module('rainService').service('rainService.repository', RepositoryService);
    })(repository = rainService.repository || (rainService.repository = {}));
})(rainService || (rainService = {}));
/*
 (function () {
 var module = angular.module('rainService');

 module.factory('rainService.repository', ['$http', '$timeout', repositoryService]);

 // entity is defined in dbEntityConfig

 function repositoryService($http, $timeout) {
 return {
 getDataList: getDataList,
 getDataById: getDataById,
 deleteDataById: deleteDataById,
 deleteDataByQueryString:deleteDataByQueryString,
 addOrUpdateData: addOrUpdateData
 };


 function getDataList(entity) {
 // simulate delay of getting data from backend
 return $timeout(function () {
 return $http.get(entity.url).then(function (result) {
 return result.data;
 });
 }, 200);

 /!* return $http.get(entity.url).then(function (result) {
 return result.data;
 });*!/
 }

 function getDataById(entity, id) {
 return $http.get(entity.url + '/' + id).then(function (result) {
 return result.data;
 });
 }

 function deleteDataById(entity, id) {
 return $http.delete(entity.url + '/' + id).then(function (result) {
 return result.data;
 });
 }

 function deleteDataByQueryString(entity, queryString) {
 return $http.delete(entity.url + '?' + queryString).then(function (result) {
 return result.data;
 });
 }

 function addOrUpdateData(entity, object) {
 return $http.post(entity.url,object).then(function (result) {
 return result.data;
 });
 }

 }
 })();

 */
//# sourceMappingURL=rainServiceRepository.js.map