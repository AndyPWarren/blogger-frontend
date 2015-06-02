"use strict";
/*
 * @module   blPrototype.posts
 * @author   SpectraKey
 */
angular.module("blPrototype.posts", [
    "blPrototype.api.posts",
    "ui.router"
])

.config(["$stateProvider", function($stateProvider) {
    $stateProvider
    .state("posts", {
        url: "/",
        templateUrl: "components/bl-posts/posts.html",
        controller: "blPostsCtrl"
    });
}])

.controller("blPostsCtrl", ["$scope", "PostsResource", function($scope, PostsResource){

    $scope.posts = PostsResource.get();

}])

.controller("blPostCtrl", ["$scope", "PostsResource", function($scope, PostsResource){

    $scope.post = PostsResource.getOne();

}]);
