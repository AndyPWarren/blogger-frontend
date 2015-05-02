"use strict";
/*
 * @module   fmPrototype.header
 * @author   SpectraKey
 */
angular.module("fmPrototype.header", [
    "fmPrototype.header.HeaderService"
])

/**
 * @example
    <fm-header></fm-header>
 * @constructor
 * @class fmHeader
 */
.directive("fmHeader", [
    function (){
        return {
            restrict: "E",
            scope: {
                user: "="
            },
            replace: true,
            templateUrl: "components/fm-header/header.html",
            link: function(scope){
                /**
                 * @method setHeader
                 * @param  {Event}  $event  Angular event object
                 * @param  {String} title
                 */
                var setHeader = function setHeader($event, values){
                    scope.heading = values.heading;
                    scope.tagline = values.tagline;
                    scope.hero = values.hero;
                };

                scope.$on("fmHeader", setHeader);
            }
        };
    }
]);
