"use strict";
/*
 * @module   fmPrototype.nav.navbar
 * @author   SpectraKey
 */
angular.module("fmPrototype.nav.navbar", [

])

/**
 * @example
 *  <fm-navbar></fm-navbar>
 * @constructor
 * @class fmNavbar
 */
.directive("fmNavbar", [
    function (){
        return {
            restrict: "E",
            scope: {
                loggedIn: "=",
                menuId: "@"
            },
            replace: true,
            templateUrl: "components/fm-nav/navbar/navbar.html",
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
