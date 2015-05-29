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
    "UsersResource",
    "SitesResource",
    "HostFactory",

    function($scope, $location, UsersResource, SitesResource, HostFactory){

        $scope.emailDomain = HostFactory.emailDomain;

        $scope.registerUser = function registerUser(){

            var user = {
                firstName: $scope.register.firstname,
                lastName: $scope.register.lastname,
                email: $scope.register.email + HostFactory.emailDomain,
                password: $scope.register.password
            };

            SitesResource.get({domain: HostFactory.domain}, function(res){
                user.site = res.data.site.id;
                UsersResource.register(user, function(res){
                    console.log(res);
                }, function(err){
                    console.log(err);
                })
            });


        };

        $scope.registerButton = function(){
            var user = {
                firstName: "test",
                lastName: "user",
                email: "test.user" + "@" + HostFactory.host,
                password: "password",
                site: 24
            };

            UsersResource.register({
                firstName: "test",
                lastName: "user",
                email: "test.user@localhost.com",
                password: "password",
                site: 25
            }, function(res){

                console.log("posted user");
                console.log(res);
            })

        }
    }
]);



