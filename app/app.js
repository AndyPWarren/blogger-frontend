"use strict";
/**
 * @module   blPrototype
 * @main     blPrototype
 * @author   SpectraKey
 */
angular.module("blPrototype", [
    "blPrototype.mockapi",
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
        $scope.host = $location.host();
    };

}]);
