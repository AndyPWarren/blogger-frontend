"use strict";
/**
 * Factory which provides mock data for issues resource
 * @class    IssuesResource
 * @module   blPrototype.api.issues
 * @author   SpectraKey
 */
angular.module("blPrototype.api.issues", [
    "ngResource"
])

.factory("IssuesResource", [
    "$resource",
    /**
     * @constructor
     * @param {Service} $resource
     */
    function ($resource) {

        return $resource("components/bl-api/data/issues.json",
            {},
            // Hash with declaration of custom action that should
            // extend the default set of resource actions
            {
                get: {
                    url: "components/bl-api/data/issue.json"
                }
            }
        );

    }
]);
