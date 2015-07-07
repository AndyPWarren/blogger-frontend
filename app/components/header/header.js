"use strict";
/*
 * @module   blPrototype.header
 * @author   SpectraKey
 */
angular.module("blPrototype.header", [
    "blPrototype.header.HeaderService",
    "ui.router"
])


/**
 * @example
    <bl-header></bl-header>
 * @constructor
 * @class blHeader
 */
//.directive("blHeader", [function (){
//        return {
//            restrict: "E",
//            replace: true,
//            templateUrl: "components/bl-header/header.html",
//            controller: "blHeaderCtrl",
//            link: function(scope){
//                /**
//                 * @method setHeader
//                 * @param  {Event}  $event  Angular event object
//                 * @param  {String} title
//                 */
//                var setHeader = function setHeader($event, values){
//                    scope.heading = values.heading;
//                    scope.tagline = values.tagline;
//                    scope.hero = values.hero;
//                };
//
//                scope.$on("blHeader", setHeader);
//            }
//        };
//    }
//])

.controller("blHeaderCtrl", [
    "$rootScope",
    "$scope",
    "$state",
    "AuthFactory",

    function($rootScope, $scope, $state, AuthFactory){

        $scope.logout = function(){
            AuthFactory.logout().then(function(){
                $state.go("app");
            });
        };
    }
])


.controller("DropdownCtrl", ["$scope", function($scope){
    $scope.status = {
        isopen: false
    };

    $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };
}]);



