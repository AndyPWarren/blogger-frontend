"use strict";
/**
 * Factory which provides mock data for users resource
 * @class    UsersResource
 * @module   blPrototype.api.users
 * @author   SpectraKey
 */
angular.module("blPrototype.api.users", [
    "ngResource"
])

.factory("UsersResource", [
    "$resource",
    /**
     * @constructor
     * @param {Service} $resource
     */
    function ($resource) {

        return $resource("components/bl-api/data/users.json",
            {},
            // Hash with declaration of custom action that should
            // extend the default set of resource actions
            {
                current: {
                    url: "components/bl-api/data/user.json"
                }
            }
        );

    }
]);
