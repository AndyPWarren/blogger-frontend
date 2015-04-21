"use strict";
/**
 * This module runs e2e test by setting up a module to make our
 * backend assertions e.g. mock the responses from our api before
 * lauching our actual application.
 * @main   fmPrototype.e2e
 * @module fmPrototype.e2e
 * @author SpectraKey
 */
angular.module("fmPrototype.e2e", ["fmPrototype", "ngMockE2E"])
    .run([
        "$httpBackend",
        function ($httpBackend) {


        }
    ]);
