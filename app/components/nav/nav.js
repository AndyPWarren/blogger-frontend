"use strict";
/*
 * @module   blPrototype.nav
 * @author   SpectraKey
 */
angular.module("blPrototype.nav", [
    "blPrototype.nav.navbar"
])

/**
 * Dynamic navigation object
 * @property {Object} nav
 * @example
 *  {
 *      "main": [{
 *          "title": "Nav item title",
 *          "href": "link/to/content",
 *          "order": 1
 *      }]
 *  }
 */

.constant("nav", {});
