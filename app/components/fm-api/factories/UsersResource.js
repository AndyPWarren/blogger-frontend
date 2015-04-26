"use strict";
/**
 * Factory which provides mock data for users resource
 * @class    UsersResource
 * @module   fmPrototype.api.users
 * @author   SpectraKey
 */
angular.module("fmPrototype.api.users", [
    "ngResource"
])

.factory("UsersResource", [
    "$resource",
    /**
     * @constructor
     * @param {Service} $resource
     */
    function ($resource) {

        return $resource("components/fm-api/data/users.json",
            {},
            // Hash with declaration of custom action that should
            // extend the default set of resource actions
            {
                current: {
                    url: "components/fm-api/data/user.json"
                }
            }
        );

    }
]);
