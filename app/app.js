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
    "$httpProvider",
    function ($locationProvider, $httpProvider) {
        $locationProvider.html5Mode(true).hashPrefix = "!";

        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

    }
]);


