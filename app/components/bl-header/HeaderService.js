"use strict";
/*
 * Dynamic heading
 * @module   blPrototype.header.HeaderService
 * @author   SpectraKey
 */
angular.module("blPrototype.header.HeaderService", [

])
/**
 * Setter for blHeader directive
 * @class blHeaderService
 * @constructor
 * @example
 *  blHeaderService.set({
 *      "heading": "",
 *      "tagline": "",
 *      "hero": ""
 *  })
 */
.service("blHeaderService", [
    "$rootScope",
    function($rootScope) {
        return {
            /**
             * Broadcast event to set dynamic heading
             * @param {Object} values  header contents
             */
            set: function set(values){
                $rootScope.$broadcast("blHeader", values);
            }
        };
    }
]);
