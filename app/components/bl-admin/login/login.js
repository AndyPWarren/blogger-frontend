"use strict";
/*
 * @module   blPrototype.login
 * @author   SpectraKey
 */
angular.module("blPrototype.admin.login", [])

.controller("blLoginCtrl", [
    "$scope",
    "$state",
    "$rootScope",
    "AuthFactory",
    /**
     * @constructor
     * @param {Object}   $scope
     * @param {Object}   $state
     * @param {Object} $rootScope   used for host info
     * @param {Object} UserResource Angular resource for accessing users endpoint
     * @param {Object} AuthFactory  authentication of user
     */
    function($scope, $state, $rootScope, AuthFactory){

    $scope.resetPasswordError = function resetPasswordError() {
        $scope.loginForm.password.$error.incorrect = false;
    };

    $scope.resetEmailError = function resetEmailError() {
        $scope.loginForm.email.$error.doesntExist = false;
    };

    $scope.login = function(){

        var credentials = {
            identifier: "test.user" + $rootScope.host.emailDomain,
            password: "password"
        };

        /**
         * login a user
         * @param   {Object} credientials
         */
        AuthFactory.login(credentials)
            .then(function(){
                $state.go("app");
            })
            .catch(function(){
                //error logging in
            });
    };
    /**
     * submit login form details
     * @returns {string} error message
     */
    $scope.submitLoginForm = function submitLoginForm(){

        /**
         * user"s email and password from form
         * @name credientials
         * @type {Object}
         */
        var credientials = {
            identifier: $scope.login.email + $rootScope.host.emailDomain,
            password: $scope.login.password
        };
        /**
         * login a user
         * @param   {Object} credientials
         */
        AuthFactory.login(credientials)
            .then(function(){
                $state.go("app");
            })
            .catch(function(err){
                //email doesnt exist
                if (err.data.meta.errors === "That email doesn't seem right") {
                    $scope.loginForm.email.$error.doesntExist = true;
                    //password was incorrect
                } else if (err.data.meta.errors === "Whoa, that password wasn't quite right!") {
                    $scope.loginForm.password.$error.incorrect = true;
                }
            });
    };

}]);


