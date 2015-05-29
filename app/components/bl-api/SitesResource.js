"use strict";
/**
 * Factory which provides actions to perform on Sites resource end point
 * @class SitesResource
 **/
angular.module("blPrototype.api.sites", ["ngResource"]).factory("SitesResource", [
    "$resource",
    "env",
    /**
     * @constructor
     * @param $resource {Service} angular resource service xhr wrapper for REST api's
     * @param ENV {Object} API address'
     **/
    function($resource, env) {

        return $resource(
            env.API_ADDRESS + "sites/:domain", {},
            {
                create: {
                    method: "POST",
                    url: env.API_ADDRESS + "sites"
                }
            }
        );
    }
]);
