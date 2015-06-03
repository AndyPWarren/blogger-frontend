"use strict";
/**
 * Factory which provides actions to perform on Posts resource end point
 * @class SitesResource
 **/
angular.module("blPrototype.api.posts", ["ngResource"]).factory("PostsResource", [
    "$resource",
    "env",
    /**
     * @constructor
     * @param $resource {Service} angular resource service xhr wrapper for REST api's
     * @param env {Object} API address'
     **/
    function($resource, env) {
        return $resource(
            env.API_ADDRESS + "posts/:domain",
            {},
            {
                getAll: {
                    method: "GET",
                },
                getOne: {
                    method: "GET",
                }
            }
        );
    }
]);
