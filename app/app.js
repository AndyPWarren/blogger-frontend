"use strict";
/**
 * @module   blPrototype
 * @main     blPrototype
 * @author   SpectraKey
 */
angular.module("blPrototype", [
    "blPrototype.api",
    "blPrototype.header",
    "blPrototype.nav",
    "blPrototype.posts",
    "blPrototype.admin",
    "ngRoute",
    "ui.router",
    "config"
])
/**
 * @method config
 * @param  {Service} $locationProvider
 */
.config([
    "$locationProvider",
    function ($locationProvider) {
        $locationProvider.html5Mode(true).hashPrefix = "!";
    }

])

.controller("AppCtrl", ["$scope", "$location", function($scope, $location){
    $scope.getHost = function getHost(){
        console.log($location.host());
        if ($location.host() === "localhost") {
            //append '.com'
            $scope.host = $location.host() + ".com";
        } else {
            $scope.host = $location.host();
        }

        $scope.emailDomain = "@" + $scope.host;

    };

}]);
