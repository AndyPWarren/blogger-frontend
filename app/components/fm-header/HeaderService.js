"use strict";
/*
 * Dynamic heading
 * @module   fmPrototype.header.HeaderService
 * @author   SpectraKey
 */
angular.module("fmPrototype.header.HeaderService", [

])
/**
 * Setter for fmHeader directive
 * @class fmHeaderService
 * @constructor
 * @example
 *  fmHeaderService.set({
 *      "heading": "",
 *      "tagline": "",
 *      "hero": ""
 *  })
 */
.service("fmHeaderService", [
    "$rootScope",
    function($rootScope) {
        return {
            /**
             * Broadcast event to set dynamic heading
             * @param {Object} values  header contents
             */
            set: function set(values){
                $rootScope.$broadcast("fmHeader", values);
            }
        };
    }
]);
