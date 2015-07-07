"use strict";
/*
 * @module   blPrototype.posts
 * @author   SpectraKey
 */
angular.module("blPrototype.posts", [
    "blPrototype.api.posts",
    "ui.router"
])

.controller("blPostsCtrl", ["$scope", "PostsResource", function($scope, PostsResource){

    $scope.posts = PostsResource.get();

}])

.controller("blPostCtrl", ["$scope", "PostsResource", function($scope, PostsResource){

    $scope.post = PostsResource.getOne();

}]);
