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
