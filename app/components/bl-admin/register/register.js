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
         * registerUser
         * register a user when form is submitted
         */
        $scope.registerUser = function registerUser(){

            /**
             * registerSuccess promise resolution
             * @param {Object} res
             */
            $scope.registerSuccess = function registerSuccess(res) {
                $state.go('app');
            };

            /**
             * registerError promise rejection
             * @param {Object} err
             */
            $scope.registerError = function registerError(err) {
                //check if user already exists
                if (err.data.meta.errors === "This email already exists. So try logging in.") {
                    //they do so collect their login details
                    var loginCredientials = {
                        identifier: user.email,
                        password: user.password
                    };

                    //NEEDS A SPINNER
                    //inform user they are being logged in
                    $scope.login = "Hello " + user.firstName + " just logging  you in ..."
                    /**
                     * time function to log a user in after a duration
                     */
                    var time = $interval(function(){
                        AuthFactory.login(loginCredientials)
                            .then(function(res){
                                $state.go('app');
                            });
                        $interval.cancel(time);
                    }, 2000);
                }
            };

            /**
             * User object with variables form the registration form
             */
            var user = {
                firstName: $scope.register.firstname,
                lastName: $scope.register.lastname,
                //concatenate email with stored host email domain e.g. "@somedomain.com"
                email: $scope.register.email + $rootScope.host.emailDomain,
                password: $scope.register.password
            };

            //Register user and hand back to success/error functions
            AuthFactory.register(user)
                .then($scope.registerSuccess, $scope.registerError);

        };
    }
]);



