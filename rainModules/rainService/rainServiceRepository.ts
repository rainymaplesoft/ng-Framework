/// <reference path="../../typings/tsd.d.ts"/>

module rainService.repository {

    export interface IDto {
        url:string;
    }
    export interface IRepositoryService<T> {
        getDataList(entity:IDto):ng.IPromise<T>;
        getDataById(entity:IDto, id:string):ng.IPromise<T>;
        deleteDataById(entity:IDto, id:string):ng.IPromise<T>;
        deleteDataByQueryString(entity:IDto, queryString:string):ng.IPromise<T>;
        addOrUpdateData(entity:IDto, object:T):ng.IPromise<T>;
    }
    export class RepositoryService<T> implements IRepositoryService<T> {

        static $inject = ['$http'];

        constructor(private $http:ng.IHttpService) {
        }

        getDataList<T>(entity:IDto):ng.IPromise<T> {
            return this.$http.get(entity.url).then((result):ng.IHttpPromiseCallbackArg<T>=> {
                return result.data;
            });
        }

        getDataById(entity:IDto, id:string):angular.IPromise<T> {
            return this.$http.get(entity.url + '/' + id).then((result):ng.IHttpPromiseCallbackArg<T>=> {
                return result.data;
            });
        }

        deleteDataById(entity:rainService.repository.IDto, id:string):angular.IPromise<T> {
            return this.$http.delete(entity.url + '/' + id).then((result):ng.IHttpPromiseCallbackArg<T>=> {
                return result.data; // return the deleted object
            });
        }

        deleteDataByQueryString(entity:rainService.repository.IDto, queryString:string):angular.IPromise<T> {
            return this.$http.delete(entity.url + '?' + queryString).then((result):ng.IHttpPromiseCallbackArg<T>=> {
                return result.data;
            });
        }

        addOrUpdateData(entity:rainService.repository.IDto, object:T):angular.IPromise<T> {
            return this.$http.post(entity.url, object).then((result):ng.IHttpPromiseCallbackArg<T>=> {
                return result.data;
            });
        }
    }

    angular.module('rainService').service('rainService.repository', RepositoryService);
}

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
