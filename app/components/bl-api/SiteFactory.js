"use strict";

angular.module("blPrototype.api.sitefactory", [])

.factory("SiteFactory", [
    "SitesResource",
    "$rootScope",
    "$q",

    /**
     * @constructor
     * @param   {Object}   SitesResource Angular resource for site endpint
     * @param   {Object}   $rootScope   Angular factory for host
     * @param   {Object}   $q            Angular promise API
     * @returns {Object}   Site
     */
    function(SitesResource, $rootScope, $q) {

        var site = {};

        /**
         * Get the site by host domain
         * @returns {Object} deferred.promise
         */
        site.get = function() {
            var deferred = $q.defer();

            var getError = function siteError(err){
                if (err.status === 404) {
                    //site doesnt exist create
                    site.create().then(function(res){
                        deferred.resolve(res);
                    },function(err){
                        deferred.reject(err);
                    });
                }
            };

            var getSuccess = function siteSuccess(res){
                site.site = res.data.site;
                deferred.resolve(res);
            };

            SitesResource.get({domain: $rootScope.host.domain}, getSuccess, getError)


            return deferred.promise;
        };
        /**
         * Create a site
         * @returns {Object} deferred.promise
         */
        site.create = function() {
            var deferred = $q.defer();

            SitesResource.create({domain: $rootScope.host.domain}, function(res){
                site.site = res.data.site;
                deferred.resolve(res);
            }, function(err){
                deferred.reject(err);
            });

            return deferred.promise;
        };

        return site;

    }
]);
