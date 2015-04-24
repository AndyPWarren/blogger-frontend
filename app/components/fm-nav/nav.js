"use strict";
/*
 * @module   fmPrototype.nav
 * @author   SpectraKey
 */
angular.module("fmPrototype.nav", [
    "fmPrototype.nav.navbar"
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
