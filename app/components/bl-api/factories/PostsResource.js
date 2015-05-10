"use strict";
/**
 * Factory which provides mock data for posts resource
 * @class    PostsResource
 * @module   blPrototype.api.posts
 * @author   Andrew Warren
 */
angular.module("blPrototype.api.posts", [
    "ngResource"
])

.factory("PostsResource", [
    "$resource",
    /**
     * @constructor
     * @param {Service} $resource
     */
    function ($resource) {

        return $resource("components/bl-api/data/posts.json",
            {},
            // Hash with declaration of custom action that should
            // extend the default set of resource actions
            {
            get: {
                url: "components/bl-api/data/posts.json",
                isArray: true
            },
            getOne: {
                url: "components/bl-api/data/post.json"
            }


        }
        );



    }
]);
