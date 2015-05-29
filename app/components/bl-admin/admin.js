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
    "UsersResource",
    "SitesResource",
    "HostFactory",
    "SiteFactory",
    function($scope, $state, $location, UsersResource, SitesResource, HostFactory, Site){

        console.log(Site);
        Site.get().then(function(site){
           if (!site.authorized) {
               $scope.status ="site is awaiting authorization"
               return $state.go("admin.register");
           }

           if (site.site.user.length === 0) {
               //no users prompt registration
               $state.go("admin.register");
           } else {
               //users exist so login
               $state.go("admin.login");
           }

        });
    }
]);


