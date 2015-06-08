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
        /**
         * authorization function add user to rootScope
         * @param {Object} user user details from API
         */
        var auth = function(site){
            //add site tp $rootScope
            $rootScope.site = site;
        };
        /**
         * Create a site
         * @returns {Object} deferred.promise
         */
        var create = function() {
            var deferred = $q.defer();

            SitesResource.create({domain: $rootScope.host.domain}, function(res){
                auth(res.data.site);
                deferred.resolve(res);
            }, function(err){
                deferred.reject(err);
            });

            return deferred.promise;
        };
        /**
         * Get the site by host domain
         * @returns {Object} deferred.promise
         */
        this.get = function() {
            var deferred = $q.defer();

            var getError = function siteError(err){
                if (err.status === 404) {
                    //site doesnt exist create
                    create().then(function(res){
                        deferred.resolve(res);
                    },function(err){
                        deferred.reject(err);
                    });
                }
            };

            var getSuccess = function siteSuccess(res){
                auth(res.data.site);
                deferred.resolve(res);
            };

            SitesResource.get({domain: $rootScope.host.domain}, getSuccess, getError);


            return deferred.promise;
        };


        return {
            get: this.get
        };

    }
]);
