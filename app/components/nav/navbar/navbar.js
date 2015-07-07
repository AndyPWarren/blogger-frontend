"use strict";
/*
 * @module   blPrototype.nav.navbar
 * @author   SpectraKey
 */
angular.module("blPrototype.nav.navbar", [

])

/**
 * @example
 *  <bl-navbar></bl-navbar>
 * @constructor
 * @class blNavbar
 */
.directive("blNavbar", [
    function (){
        return {
            restrict: "E",
            scope: {
                loggedIn: "=",
                menuId: "@"
            },
            replace: true,
            templateUrl: "components/bl-nav/navbar/navbar.html",
            controller: [
                "$scope",
                "$location",
                "nav",
                function($scope, $location, nav) {

                    /**
                     * Navigation
                     * @property {Object} nav
                     */
                    $scope.nav = nav[$scope.menuId];

                    /**
                     * @method isActive
                     * @param  {String}  path path to check to see if it matches url path
                     * @return {Boolean}      returns true if path matches url path
                     */
                    $scope.isActive = function isActive(path) {
                        return $location.path() === path;
                    };

                }
            ]
        };
    }
]);
