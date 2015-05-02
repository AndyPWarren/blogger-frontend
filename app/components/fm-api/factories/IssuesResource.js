"use strict";
/**
 * Factory which provides mock data for issues resource
 * @class    IssuesResource
 * @module   fmPrototype.api.issues
 * @author   SpectraKey
 */
angular.module("fmPrototype.api.issues", [
    "ngResource"
])

.factory("IssuesResource", [
    "$resource",
    /**
     * @constructor
     * @param {Service} $resource
     */
    function ($resource) {

        return $resource("components/fm-api/data/issues.json",
            {},
            // Hash with declaration of custom action that should
            // extend the default set of resource actions
            {
                get: {
                    url: "components/fm-api/data/issue.json"
                }
            }
        );

    }
]);
