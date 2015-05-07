"use strict";
/**
 * Factory which provides mock data for groups resource
 * @class    GroupsResource
 * @module   blPrototype.api.groups
 * @author   SpectraKey
 */
angular.module("blPrototype.api.groups", [
    "ngResource"
])

.factory("GroupsResource", [
    "$resource",
    /**
     * @constructor
     * @param {Service} $resource
     */
    function ($resource) {

        return $resource("components/bl-api/data/groups.json",
            {},
            // Hash with declaration of custom action that should
            // extend the default set of resource actions
            {
                get: {
                    url: "components/bl-api/data/group.json"
                }
            }
        );

    }
]);
