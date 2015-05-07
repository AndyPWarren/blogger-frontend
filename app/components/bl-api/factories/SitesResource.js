"use strict";
/**
 * Factory which provides mock data for sites resource
 * @class    SitesResource
 * @module   blPrototype.api.sites
 * @author   Andrew Warren
 */
angular.module("blPrototype.api.sites", [
    "ngResource"
])

.factory("SitesResource", [
    "$resource",
    /**
     * @constructor
     * @param {Service} $resource
     */
    function ($resource) {

        return $resource("components/bl-api/data/sites.json",
            {},
            // Hash with declaration of custom action that should
            // extend the default set of resource actions
            {
                get: {
                    url: "components/bl-api/data/site.json"
                }
            }
        );


    }
]);
