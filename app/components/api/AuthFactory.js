"use strict";

angular.module("blPrototype.api.auth", [])

    .factory("AuthFactory", [
    "$rootScope",
    "$q",
    "UsersResource",
    /**
     * @constructor
     * @param   {Object}   $rootScope
     * @param   {Object}   $q            Angular promise API
     * @param   {Object}   UsersResource Angular resource for user endpoint
     * @param   {Object}   SiteFactory   factory for site manipulation
     * @returns {Object}   user
     */
    function($rootScope, $q, UsersResource) {

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
            if (!$rootScope.site) {return;}
            if (user.site === $rootScope.site.id) {
                //set an auth flag as true on $rootScope
                $rootScope.isAuthenticated = true;
                //remove user from $rootScope
                $rootScope.user = user;
            }
        };

        /**
         * login a user
         * @param   {Object} credientials identifer, password
         * @returns {Object} deferred.promise
         */
        this.login = function(credientials) {

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
        this.logout = function() {

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
        this.register = function(userDetails) {

            var deferred = $q.defer();
            //set the user site id
            userDetails.site = $rootScope.site.id;

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
        this.current = function() {

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

        return {
            login: this.login,
            logout: this.logout,
            register: this.register,
            current: this.current
        };

    }
]);
