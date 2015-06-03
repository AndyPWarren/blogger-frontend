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
            .state("app.admin", {
                url: "admin",
                views: {
                    "nav": {
                        templateUrl: "./components/bl-header/header.html",
                        controller: "blHeaderCtrl"
                    },
                    "content@": {
                        templateUrl: './components/bl-admin/admin.html',
                        controller: "blAdminCtrl",
//                        resolve: {
//                            user: ["UserFactory", "$state", function(UserFactory, $state){
//                                return UserFactory.current().then(function(res){
//                                    //user is logged in should be prompted to log out
//        //                            $state.go("posts");
//                                    var principle = res.data.user;
//                                    return principle;
//                                }, function(err){
//                                    var principle = null;
//                                    return principle;
//                                })
//                            }]
//                        }
                    }
                }
//                url: "/admin",
//                templateUrl: "components/bl-admin/admin.html",
//                controller: "blAdminCtrl",

            })
            .state("app.admin.login", {
                url: "/login",
                views:{
                    "admin@app.admin" : {
                        templateUrl: "components/bl-admin/login/login.html",
                        controller: "blLoginCtrl",
//                        resolve: {
//                            user: ["UserFactory", "$state", function(UserFactory, $state){
//                                return UserFactory.current().then(function(res){
//                                    $state.go("admin");
//                                }, function(err){
//
//                                })
//                            }]
//                        }
                    }
                }
//                templateUrl: "components/bl-admin/login/login.html",
//                controller: "blLoginCtrl",
//                resolve: {
//                    user: ["UserFactory", "$state", function(UserFactory, $state){
//                        return UserFactory.current().then(function(res){
//                            $state.go("admin");
//                        }, function(err){
//
//                        })
//                    }]
//                }
            })
            .state("app.admin.register", {
                url: "/register",
                views:{
                    "admin@app.admin" : {
                        templateUrl: "components/bl-admin/register/register.html",
                        controller: "blRegisterCtrl",
//                        resolve: {
//                            user: ["UserFactory", "$state", function(UserFactory, $state){
//                                return UserFactory.current().then(function(res){
//                                    $state.go("admin");
//                                }, function(err){
//
//                                })
//                            }]
//                        }
                    }
                }
//                templateUrl: "components/bl-admin/register/register.html",
//                controller: "blRegisterCtrl",
//                resolve: {
//                    user: ["UserFactory", "$state", function(UserFactory, $state){
//                        return UserFactory.current().then(function(res){
//                            $state.go("admin");
//                        }, function(err){
//
//                        })
//                    }]
//                }
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
    "$rootScope",
    function($scope, $state, $location, Site, UserFactory, $rootScope){

        $scope.site = {};


        $scope.logout = function (){
            UserFactory.logout().then(function(res){
                $state.go("app");
            })
        };

        if ($rootScope.user) {
            //some user is here
            return $scope.site.status = "please logout";
        }


        Site.get().then(function(res){

            if (!res.data.site.users) {
                return $state.go("app.admin.register");
            };

            //site is authorized
            if (res.data.site.users.length === 0) {
                //no users prompt registration
                $state.go("app.admin.register");
            } else {
                //users exist so login
                $state.go("app.admin.login");
            }
        });
    }
]);


