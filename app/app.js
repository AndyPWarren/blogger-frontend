"use strict";
/**
 * @module   fmPrototype
 * @main     fmPrototype
 * @author   SpectraKey
 */
angular.module("fmPrototype", [
    "fmPrototype.api",
    "ngRoute"
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
]);
