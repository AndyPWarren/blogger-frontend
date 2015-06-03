"use strict";


angular.module("blPrototype.api.host", [])

.factory("HostFactory", [
    "$location",

    function($location) {

            var host = {};

            if ($location.host() === "localhost") {
                //append '.com'
                host.domain = $location.host() + ".com";
            } else {
                host.domain = $location.host();
            }

            host.emailDomain = "@" + host.domain;
            return host;
    }
]);
