"use strict";
/*
 * @module   blPrototype.header
 * @author   SpectraKey
 */
angular.module("blPrototype.header", [
    "blPrototype.header.HeaderService"
])

/**
 * @example
    <bl-header></bl-header>
 * @constructor
 * @class blHeader
 */
.directive("blHeader", [
    function (){
        return {
            restrict: "E",
            scope: {
                user: "="
            },
            replace: true,
            templateUrl: "components/bl-header/header.html",
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

                scope.$on("blHeader", setHeader);
            }
        };
    }
]);
