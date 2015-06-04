"use strict";

angular.module("blPrototype.api.userfactory", [])

.factory("UserFactory", [
    "$rootScope",
    "$q",
    "UsersResource",
    "SiteFactory",
    /**
     * @constructor
     * @param   {Object}   $rootScope
     * @param   {Object}   $q            Angular promise API
     * @param   {Object}   UsersResource Angular resource for user endpoint
     * @param   {Object}   SiteFactory   factory for site manipulation
     * @returns {Object}   user
     */
    function($rootScope, $q, UsersResource, SiteFactory) {

        var user = {};

        /**
         * un authorization function
         * removes user from rootScope
         */
        var unAuth = function(){
            //set an auth flag as false on $rootScope
            $rootScope.isAuthenticated = false;
            //remove user from $rootScope
            $rootScope.user = null;
        };

        /**
         * authorization function add user to rootScope
         * @param {Object} user user details from API
         */
        var auth = function(user){
            //set an auth flag as true on $rootScope
            $rootScope.isAuthenticated = true;
            //remove user from $rootScope
            $rootScope.user = user;
        };

        /**
         * get a user
         * @param   {String} email users email address
         * @returns {Object} deferred.promise
         */
        user.get = function(email) {
            var deferred = $q.defer();

            var getSuccess = function getSuccess(res){
                deferred.resolve(res);
            };

            var getError = function getError(err){
                deferred.reject(err);
            };

            UsersResource.get(email, getSuccess, getError);

            return deferred.promise;
        };

        /**
         * login a user
         * @param   {Object} credientials identifer, password
         * @returns {Object} deferred.promise
         */
        user.login = function(credientials) {

            var deferred = $q.defer();

            var loginSuccess = function loginSuccess(res){
                auth(res.data.user);
                deferred.resolve(res);
            };

            var loginError = function loginError(err){
                deferred.reject(err);
            };

            UsersResource.login(credientials, loginSuccess, loginError);

            return deferred.promise;
        };
        /**
         * logout the user
         * @returns {Object} deferred.promise
         */
        user.logout = function() {

            var deferred = $q.defer();

            var logoutSuccess = function logoutSuccess(res){
                unAuth();
                deferred.resolve(res);
            };

            var logoutError = function logoutError(err){
                deferred.reject(err);
            };

            UsersResource.logout(logoutSuccess, logoutError);

            return deferred.promise;
        };

        /**
         * Register a user
         * @param   {Object}   userDetails
         * @returns {Object} deferred.promise
         */
        user.register = function(userDetails) {

            var deferred = $q.defer();
            //set the user site id
            userDetails.site = SiteFactory.site.id;

            var registerSuccess = function registerSuccess(res){
                auth(res.data.user);
                deferred.resolve(res);

            };

            var registerError = function registerError(err){
                deferred.reject(err);
            };

            UsersResource.register(userDetails, registerSuccess, registerError);

            return deferred.promise;
        };

        /**
         * get current logged in user
         * @returns {Object} deferred.promise
         */
        user.current = function() {

            var deferred = $q.defer();

            var currentUserSuccess = function currentUserSuccess(res){
                auth(res.data.user);
                deferred.resolve(res);
            };

            var currentUserError = function currentUserError(err){
                unAuth();
                deferred.reject(err);

            };

            UsersResource.current(currentUserSuccess, currentUserError);

            return deferred.promise;
        };

        return user;

    }
]);
