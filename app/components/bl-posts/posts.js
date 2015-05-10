"use strict";
/*
 * @module   blPrototype.posts
 * @author   SpectraKey
 */
angular.module("blPrototype.posts", [
    "blPrototype.api.posts",
    "ngRoute"
])

.config(["$routeProvider",
    function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "components/bl-posts/posts.html",
                controller: "blPostsCtrl"
            })
            .when("/:postId", {
                templateUrl: "components/bl-posts/post.html",
                controller: "blPostCtrl"
            })
            .otherwise({
                redirectTo: "/"
            });
    }
])

.controller("blPostsCtrl", ["$scope", "PostsResource", function($scope, PostsResource){

    $scope.posts = PostsResource.get();

}])

.controller("blPostCtrl", ["$scope", "PostsResource", function($scope, PostsResource){

    $scope.post = PostsResource.getOne();

}]);
