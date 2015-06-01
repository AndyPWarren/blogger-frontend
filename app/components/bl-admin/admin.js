"use strict";
/*
 * @module   blPrototype.login
 * @author   SpectraKey
 */
angular.module("blPrototype.admin", [
    "blPrototype.admin.login",
    "blPrototype.admin.register",
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
                controller: "blAdminCtrl"
            })
            .state("admin.login", {
                url: "/login",
                templateUrl: "components/bl-admin/login/login.html",
                controller: "blLoginCtrl"
            })
            .state("admin.register", {
                url: "/register",
                templateUrl: "components/bl-admin/register/register.html",
                controller: "blRegisterCtrl"
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
    "HostFactory",
    "SiteFactory",
    function($scope, $state, $location, HostFactory, Site){


        Site.get().then(function(res){

            console.log(res);
            console.log(res.data.site);

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


