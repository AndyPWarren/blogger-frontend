"use strict";
/**
 * Factory which provides actions to perform on User resource end point
 * @class UserResource
 **/
angular.module("blPrototype.api.users", ["ngResource"]).factory("UsersResource", [
    "$resource",
    "env",
    /**
     * @constructor
     * @param $resource {Service} angular resource service xhr wrapper for REST api's
     * @param ENV {Object} API address'
     **/
    function($resource, env) {

        return $resource(
            env.API_ADDRESS + "users/:email",
            {},
            {
                get: {
                    method: "GET",
                    cache: false,
                    isArray: false
                },
                current: {
                    method: "GET",
                    url: env.API_ADDRESS + "users/current"
                },
                login: {
                    method: "POST",
                    url: env.API_ADDRESS + "users/auth/local"
                },
                logout: {
                    method: "GET",
                    url: env.API_ADDRESS + "users/logout"
                },
                register: {
                    method: "POST",
                    url: env.API_ADDRESS + "users/auth/local/register"
                }
            }
        );
    }
]);

