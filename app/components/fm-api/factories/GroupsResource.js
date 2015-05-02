"use strict";
/**
 * Factory which provides mock data for groups resource
 * @class    GroupsResource
 * @module   fmPrototype.api.groups
 * @author   SpectraKey
 */
angular.module("fmPrototype.api.groups", [
    "ngResource"
])

.factory("GroupsResource", [
    "$resource",
    /**
     * @constructor
     * @param {Service} $resource
     */
    function ($resource) {

        return $resource("components/fm-api/data/groups.json",
            {},
            // Hash with declaration of custom action that should
            // extend the default set of resource actions
            {
                get: {
                    url: "components/fm-api/data/group.json"
                }
            }
        );

    }
]);
