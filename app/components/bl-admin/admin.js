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
    function($scope, $state, $location, UsersResource, SitesResource){

        $scope.site = {};

        $scope.siteSuccess = function siteSuccess(res){
            $scope.site.status = "site " + $scope.host + " has been authorized";
            //check users in site
            if (res.data.site.users.length === 0) {
                //false -> register
                $state.go("admin.register");

            } else {
                //true -> login
                $state.go("admin.login");
            }


        };

        $scope.siteError = function siteError(err){
            console.log(err);
            if (err.status === 404) {
                $scope.site.status = "creating site " + $scope.host;
                //site doesn't exist
                //create the site
                site.domain = $scope.host;
                site.$save(function(res){
                    $scope.site.status = "site " + $scope.host + " has been created successfully and is awaiting authorization";

                    console.log("site has been saved");
                }, function(err){
                    console.log("error");
                });
            }

            if (err.status === 403) {
                $scope.site.status = "site " + $scope.host + " is awaiting authorization";
                //site hasn't been authorized yet
            }
        };

        var site = SitesResource.get({domain:$scope.host}, $scope.siteSuccess, $scope.siteError);

    }
]);


