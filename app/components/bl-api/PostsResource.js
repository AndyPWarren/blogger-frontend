"use strict";


angular.module("blPrototype.api.posts", ["ngResource"]).factory("PostsResource", [
    "$resource",
    "env",

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
