"use strict";
/*
 * @module   bl.changeFocus
 */
angular.module("bl.changeFocus", [

])
/**
 * @constructor
 * @class blChangeFocus
 */
.directive("blChangeFocus",[
    function (){
        return {
            restrict: "A",
            require: "ngModel",
            link: function($scope, $element, attrs, ctrl){

            }
        };
    }
]);
