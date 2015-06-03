"use strict";
/*
 * @module   blPrototype.login
 * @author   SpectraKey
 */
angular.module("blPrototype.admin.register", [

])

.controller("blRegisterCtrl", [
    "$scope",
    "$location",
    "$interval",
    "$state",
    "$rootScope",
    "UserFactory",

    function($scope, $location, $interval, $state, $rootScope, UserFactory){

        $scope.registerUser = function registerUser(){

            var user = {
                firstName: $scope.register.firstname,
                lastName: $scope.register.lastname,
                email: $scope.register.email + $rootScope.host.emailDomain,
                password: $scope.register.password
            };

            UserFactory.register(user).then(function(res){
                if (res.meta.errors === "This email already exists. So try logging in.") {
                    //user already exists so log in

                    var loginCredientials = {
                        identifier: user.email,
                        password: user.password
                    };

                    $scope.login = "This user exists so logging in ..."

                    var time = $interval(function(){
                        UserFactory.login(loginCredientials).then(function(res){
                            $state.go('app');
                        });
                        $interval.cancel(time);
                    }, 2000);

                } else {
                    //user is created redirect
                    $state.go('app');
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

            UserFactory.register(user).then(function(res){
                if (res.meta.errors === "This email already exists. So try logging in.") {
                    //user already exists so log in

                    var loginCredientials = {
                        identifier: user.email,
                        password: user.password
                    };

                    $scope.login = "This user exists so logging in ..."

                    var time = $interval(function(){
                        UserFactory.login(loginCredientials).then(function(res){
                            $state.go('app');
                        });
                        $interval.cancel(time);
                    }, 2000);

                } else {
                    //user is created redirect
                    $state.go('app');
                }
            });
        }
    }
]);



