"use strict";

angular.module("blPrototype.api.userfactory", [])

    .factory("UserFactory", [
    "UsersResource",
    "SiteFactory",
    "HostFactory",
    "$q",

    function(UsersResource, Site, HostFactory, $q) {

        var user = {};

        user.get = function(email) {
            var deferred = $q.defer();

            var getSuccess = function getSuccess(res){
                deferred.resolve(res);
            };

            var getError = function getError(err){
                deferred.reject(res);
            };

            UsersResource.get(credientials, getSuccess, getError);

            return deferred.promise;
        };

        user.login = function(credientials) {

            var deferred = $q.defer();

            var loginSuccess = function loginSuccess(res){
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
                user.user = res.data.user;
                deferred.resolve(res);

            }, function(err){
                deferred.reject(err);
            });

            return deferred.promise;
        };

        return user;

    }
]);
