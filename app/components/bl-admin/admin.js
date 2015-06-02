"use strict";
/*
 * @module   blPrototype.login
 * @author   SpectraKey
 */
angular.module("blPrototype.admin", [
    "blPrototype.admin.login",
    "blPrototype.admin.register",
    "sn.inputConfirm",
    "bl.changeFocus",
    "ngRoute",
    "ui.router",
    "ngMessages",
    "bl.changeFocus"
])

.config(["$stateProvider", function($stateProvider) {
        $stateProvider
            .state("admin", {
                url: "/admin",
                templateUrl: "components/bl-admin/admin.html",
                controller: "blAdminCtrl",
                resolve: {
                    user: ["UserFactory", "$state", function(UserFactory, $state){
                        return UserFactory.current().then(function(res){
                            //user is logged in should be prompted to log out
//                            $state.go("posts");
                            var principle = res.data.user;
                            return principle;
                        }, function(err){
                            var principle = null;
                            return principle;
                        })
                    }]
                }
            })
            .state("admin.login", {
                url: "/login",
                templateUrl: "components/bl-admin/login/login.html",
                controller: "blLoginCtrl",
                resolve: {
                    user: ["UserFactory", "$state", function(UserFactory, $state){
                        return UserFactory.current().then(function(res){
                            $state.go("admin");
                        }, function(err){

                        })
                    }]
                }
            })
            .state("admin.register", {
                url: "/register",
                templateUrl: "components/bl-admin/register/register.html",
                controller: "blRegisterCtrl",
                resolve: {
                    user: ["UserFactory", "$state", function(UserFactory, $state){
                        return UserFactory.current().then(function(res){
                            $state.go("admin");
                        }, function(err){

                        })
                    }]
                }
            });
    }

])

.config(["blChangeFocusConfigProvider", function(blChangeFocusConfigProvider){
    blChangeFocusConfigProvider.setCssClass('flash-user');
}])

.controller("blAdminCtrl", [
    "$scope",
    "$state",
    "$location",
    "SiteFactory",
    "UserFactory",
    "user",
    function($scope, $state, $location, Site, UserFactory, user){

        var site = {};

        console.log(user)

        if (user) {
            $scope.user = true;
            return $scope.site.status = "please logout";
        }

        $scope.logout = function (){
            UserFactory.logout().then(function(res){
                console.log(res);
            })
        }
        Site.get().then(function(res){

            console.log(res);

            if (!res.data.site.users) {
                return $state.go("admin.register");
            };

            //site is authorized
            if (res.data.site.users.length === 0) {
                //no users prompt registration
                $state.go("admin.register");
            } else {
                //users exist so login
                $state.go("admin.login");
            }
        });
    }
]);


