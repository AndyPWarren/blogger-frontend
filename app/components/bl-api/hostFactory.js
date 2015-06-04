"use strict";


angular.module("blPrototype.api.host", [])
/**
 * Factory which provides information about the host url
 * @class UserFactory
 */
.factory("HostFactory", [
    "$location",
    /**
     * @constructor
     * @param   {Service}$location  angular location wrapper
     * @returns {Object} host       information about the host
     */
    function($location) {

        var host = {};

        if ($location.host() === "localhost") {
            //append '.com' to localhost for testing
            host.domain = $location.host() + ".com";
        } else {
            host.domain = $location.host();
        }
        host.emailDomain = "@" + host.domain;
        return host;
    }
]);
