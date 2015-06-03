"use strict";
/*
 * @module   blPrototype.login
 * @author   SpectraKey
 */
angular.module("blPrototype.admin.login", [

])

.controller("blLoginCtrl", [
    "$scope",
    "$location",
    "$state",
    "HostFactory",
    "UserFactory",

    function($scope, $location, $state, HostFactory, UserFactory){

    $scope.emailDomain = HostFactory.emailDomain;

    $scope.resetPasswordError = function resetPasswordError() {
        $scope.loginForm.password.$error.incorrect = false;
    };

    $scope.resetEmailError = function resetEmailError() {
        $scope.loginForm.email.$error.doesntExist = false;
    };

    $scope.login = function(){

        var credentials = {
            identifier: "test.user" + HostFactory.emailDomain,
            password: "password"
        };

        UserFactory.login(credentials).then(function(res){
            $state.go("app");
        });
    };
    /**
     * submit login form details
     * @returns {string} error message
     */
    $scope.submitLoginForm = function submitLoginForm(){

        /**
         * user's email and password from form
         * @name credientials
         * @type {Object}
         */
        var credientials = {
            identifier: $scope.login.email + HostFactory.emailDomain,
            password: $scope.login.password
        };

        UserFactory.login(credientials).then(function(res){

            if (!res.meta.errors) {
                $state.go('app');
            }

            if (res.meta.errors === "That email doesn't seem right") {
                $scope.loginForm.email.$error.doesntExist = true;

            } else if (res.meta.errors === "Whoa, that password wasn't quite right!") {
                $scope.loginForm.password.$error.incorrect = true;
            }
        });




    };

}]);


