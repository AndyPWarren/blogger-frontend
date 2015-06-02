"use strict";
/*
 * @module   blPrototype.header
 * @author   SpectraKey
 */
angular.module("blPrototype.header", [
    "blPrototype.header.HeaderService"
])

/**
 * @example
    <bl-header></bl-header>
 * @constructor
 * @class blHeader
 */
.directive("blHeader", [
    function (){
        return {
            restrict: "E",
            replace: true,
            templateUrl: "components/bl-header/header.html",
            controller: "blHeaderCtrl",
            link: function(scope){
                /**
                 * @method setHeader
                 * @param  {Event}  $event  Angular event object
                 * @param  {String} title
                 */
                var setHeader = function setHeader($event, values){
                    scope.heading = values.heading;
                    scope.tagline = values.tagline;
                    scope.hero = values.hero;
                };

                scope.$on("blHeader", setHeader);
            }
        };
    }
])

.controller("blHeaderCtrl", [
    "$scope",
    "UserFactory",
    "HostFactory",
    function($scope, UserFactory, HostFactory){
        UserFactory.current().then(function(res){
            $scope.user = res.data.user
        })
        $scope.host = HostFactory.domain;


    }
])


.controller("DropdownCtrl", ["$scope", "$log", function($scope, $log){
    $scope.status = {
        isopen: false
    };

    console.log($scope.status);

    $scope.toggled = function(open) {
        $log.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };
}]);



