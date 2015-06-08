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
                    }
                }
            })
            .state("app.admin.login", {
                url: "/login",
                views:{
                    "admin@app.admin" : {
                        templateUrl: "components/bl-admin/login/login.html",
                        controller: "blLoginCtrl",
                        resolve: {
                            user: ["$rootScope", "$state", function ($rootScope, $state) {
                                if ($rootScope.user) {
                                    return $state.go("app.admin");
                                }
                            }]
                        }
                    }
                }
            })
            .state("app.admin.register", {
                url: "/register",
                views:{
                    "admin@app.admin" : {
                        templateUrl: "components/bl-admin/register/register.html",
                        controller: "blRegisterCtrl",
                        resolve: {
                            user: ["$rootScope", "$state", function ($rootScope, $state) {
                                if ($rootScope.user) {
                                    return $state.go("app.admin");
                                }
                            }]
                        }
                    }
                }
            });
    }

])

.config(["blChangeFocusConfigProvider", function(blChangeFocusConfigProvider){
    blChangeFocusConfigProvider.setCssClass('flash-user');
}])

.controller("blAdminCtrl", [
    "$rootScope",
    "$scope",
    "$state",
    "SiteFactory",
    "AuthFactory",
    /**
     * @constructor
     * @param   {Object}   $rootScope
     * @param   {Object}   $scope
     * @param   {Object}   $state
     * @param   {Object}   SitesResource wrapper for site
     * @param   {[[Type]]} AuthFactory wrapper for user
     */
    function($rootScope, $scope, $state, SiteFactory, AuthFactory){



        $scope.logout = function (){
            AuthFactory.logout().then(function(res){
                //direct to posts view
                $state.go("app");
            })
        };

        //if user s logged in
        if ($rootScope.user) {
            //dont proceed with displaying a view
            return $scope.userStatus = "please logout";
        }

        //get the site
        SiteFactory.get()
        .then(function(res){

            //no users on site
            //catch for no user array on the site created API response
            if (!res.data.site.users) {
                //return register view
                return $state.go("app.admin.register");
            };

            //user exists on the site
            if (res.data.site.users.length === 0) {
                //no users are registered prompt registration
                $state.go("app.admin.register");
            } else {
                //users exist so prompt login
                $state.go("app.admin.login");
            }
        })
        .catch(function(res){
            console.log("catch");
            return console.log(res);
        });
    }
]);


