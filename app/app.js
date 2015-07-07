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
    "ui.bootstrap"
])

.config(["$stateProvider", function($stateProvider) {
    $stateProvider
        .state("app", {
            url: "/",
            views: {
                "content": {
                    templateUrl: "./components/posts/posts.html",
                    controller: "blPostsCtrl"
                },
                "nav": {
                    templateUrl: "./components/header/header.html",
                    controller: "blHeaderCtrl",
                }
            }
        });
    }
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
        delete $httpProvider.defaults.headers.common["X-Requested-With"];

    }
])

.run([
    "$rootScope",
    "$location",
    "AuthFactory",
    "SiteFactory",
    function($rootScope, $location, AuthFactory, SiteFactory) {

        $rootScope.host = {};

        if ($location.host() === "localhost") {
            //append ".com" to localhost for testing
            $rootScope.host.domain = $location.host() + ".com";
        } else {
            $rootScope.host.domain = $location.host();
        }
        $rootScope.host.emailDomain = "@" + $rootScope.host.domain;

        SiteFactory.get().then(function(){
            AuthFactory.current();
        });

    }
]);


