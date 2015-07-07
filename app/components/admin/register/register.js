"use strict";
/*
 * @module   blPrototype.login
 * @author   SpectraKey
 */
angular.module("blPrototype.admin.register", [])

.controller("blRegisterCtrl", [
    "$scope",
    "$interval",
    "$state",
    "$rootScope",
    "AuthFactory",
    /**
     * @constructor
     * @param {Object} $scope
     * @param {Object} $interval
     * @param {Object} $state
     * @param {Object} $rootScope
     * @param {Object} AuthFactory user related functions promise factory
     */
    function($scope, $interval, $state, $rootScope, AuthFactory){
        /**
         * registerSuccess promise resolution
         * @param {Object} res
         */
        $scope.registerSuccess = function registerSuccess() {
            $state.go("app");
        };

        /**
         * registerError promise rejection
         * @param {Object} err
         */
        $scope.registerError = function registerError(err) {
            //check if user already exists
            if (err.data.meta.errors === "This email already exists. So try logging in.") {
                //they do so collect their login details
                $scope.loginCredientials = {
                    identifier: $scope.user.email,
                    password: $scope.user.password
                };

                //NEEDS A SPINNER
                //inform user they are being logged in
                $scope.login = "Hello " + $scope.user.firstName + " just logging you in ...";
                /**
                 * time function to log a user in after a duration
                 */
                var time = $interval(function(){
                    AuthFactory.login($scope.loginCredientials)
                        .then($scope.registerSuccess);
                    $interval.cancel(time);
                }, 2000);
            }
        };
        /**
         * registerUser
         * register a user when form is submitted
         */
        $scope.registerUser = function registerUser(){
            /**
             * User object with variables form the registration form
             */
            $scope.user = {
                firstName: $scope.register.firstname,
                lastName: $scope.register.lastname,
                //concatenate email with stored host email domain e.g. "@somedomain.com"
                email: $scope.register.email + $rootScope.host.emailDomain,
                password: $scope.register.password
            };

            //Register user and hand back to success/error functions
            AuthFactory.register($scope.user)
                .then($scope.registerSuccess)
                .catch($scope.registerError);

        };
    }
]);
