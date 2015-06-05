"use strict";
/*
 * @module   blPrototype.login
 * @author   SpectraKey
 */
angular.module("blPrototype.admin.register", [

])

.controller("blRegisterCtrl", [
    "$scope",
    "$interval",
    "$state",
    "$rootScope",
    "AuthFactory",

    function($scope, $interval, $state, $rootScope, AuthFactory){

        $scope.registerUser = function registerUser(){

            var user = {
                firstName: $scope.register.firstname,
                lastName: $scope.register.lastname,
                email: $scope.register.email + $rootScope.host.emailDomain,
                password: $scope.register.password
            };

            AuthFactory.register(user)
                .then(function(res){
                    if (!res.meta.errors) {
                        //user is created redirect
                        $state.go('app');
                    } else if (res.meta.errors === "This email already exists. So try logging in.") {
                        //user already exists so log in

                        var loginCredientials = {
                            identifier: user.email,
                            password: user.password
                        };

                        //needs a spinner
                        $scope.login = "Hello " + user.firstName + " just logging  you in ..."

                        var time = $interval(function(){
                            AuthFactory.login(loginCredientials)
                                .then(function(res){
                                    $state.go('app');
                                });
                            $interval.cancel(time);
                        }, 2000);

                    }
                });


        };

        $scope.registerButton = function(){
            var user = {
                firstName: "test",
                lastName: "user",
                email: "test.user" + $rootScope.host.emailDomain,
                password: "password"
            };

            AuthFactory.register(user)
                .then(function(res){
                if (!res.meta.errors) {
                    //user is created redirect
                    $state.go('app');
                } else if (res.meta.errors === "This email already exists. So try logging in.") {
                    //user already exists so log in

                    var loginCredientials = {
                        identifier: user.email,
                        password: user.password
                    };

                    //needs a spinner
                    $scope.login = "Hello " + user.firstName + " just logging  you in ..."

                    var time = $interval(function(){
                        AuthFactory.login(loginCredientials)
                            .then(function(res){
                            $state.go('app');
                        });
                        $interval.cancel(time);
                    }, 2000);

                }
            });
        }
    }
]);



