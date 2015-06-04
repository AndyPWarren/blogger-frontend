"use strict";


angular.module("blPrototype.api.auth", [])
/**
 * Factory which provides information about the host url
 * @class UserFactory
 */
.factory("AuthService", [
    "$rootScope",
    "$q",
    "UsersResource",
    /**
     * @constructor
     * @param   {Service}$location  angular location wrapper
     * @returns {Object} host       information about the host
     */
    function($rootScope, $q, UsersResource) {

    }
]);
