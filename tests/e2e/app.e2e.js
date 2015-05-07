"use strict";
/**
 * This module runs e2e test by setting up a module to make our
 * backend assertions e.g. mock the responses from our api before
 * lauching our actual application.
 * @main   blPrototype.e2e
 * @module blPrototype.e2e
 * @author SpectraKey
 */
angular.module("blPrototype.e2e", ["blPrototype", "ngMockE2E"])
    .run([
        "$httpBackend",
        function ($httpBackend) {


        }
    ]);
