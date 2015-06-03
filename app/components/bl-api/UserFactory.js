"use strict";

angular.module("blPrototype.api.userfactory", [])

    .factory("UserFactory", [
    "$rootScope",
    "UsersResource",
    "SiteFactory",
    "HostFactory",
    "$q",

    function($rootScope, UsersResource, Site, HostFactory, $q) {

        var user = {};

        user.get = function(email) {
            var deferred = $q.defer();

            var getSuccess = function getSuccess(res){
                deferred.resolve(res);
            };

            var getError = function getError(err){
                deferred.reject(err);
            };

            UsersResource.get(credientials, getSuccess, getError);

            return deferred.promise;
        };

        user.login = function(credientials) {

            var deferred = $q.defer();

            var loginSuccess = function loginSuccess(res){
                $rootScope.isAuthenticated = true;
                $rootScope.user = res.data.user;
                deferred.resolve(res);
            };

            var loginError = function loginError(err){
                deferred.reject(err);
            };

            UsersResource.login(credientials, loginSuccess, loginError);

            return deferred.promise;
        };
        user.logout = function() {

            var deferred = $q.defer();

            var logoutSuccess = function logoutSuccess(res){
                $rootScope.isAuthenticated = false;
                $rootScope.user = null;
                deferred.resolve(res);
            };

            var logoutError = function logoutError(err){
                deferred.reject(err);
            };

            UsersResource.logout(logoutSuccess, logoutError);

            return deferred.promise;
        };

        user.register = function(userDetails) {

            var deferred = $q.defer();

            console.log(Site);
            userDetails.site = Site.site.id;

            UsersResource.register(userDetails, function(res){

                deferred.resolve(res);

            }, function(err){
                deferred.reject(err);
            });

            return deferred.promise;
        };

        user.current = function() {

            var deferred = $q.defer();

            UsersResource.current(function(res){
                $rootScope.user = res.data.user;
                $rootScope.isAuthenticated = true;
                deferred.resolve(res);


            }, function(err){
                deferred.reject(err);
                $rootScope.isAuthenticated = false;
            });

            return deferred.promise;
        };

        return user;

    }
]);
