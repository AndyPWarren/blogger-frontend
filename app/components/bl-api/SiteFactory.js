"use strict";

angular.module("blPrototype.api.sitefactory", [])

.factory("SiteFactory", [
    "SitesResource",
    "HostFactory",
    "$q",

    function(SitesResource, HostFactory, $q) {

        var site = {};


        site.get = function() {
            var deferred = $q.defer();

            var getError = function siteError(err){
                if (err.status === 404) {
                    //site doesnt exist
                    //create site
                    console.log("site doesn't exist creating...")
                    site.create().then(function(res){
                        console.log(res);
                        deferred.resolve(res);
                    });

                }

            };

            var getSuccess = function siteSuccess(res){
                site.site = res.data.site;
                deferred.resolve(res);
            };

            SitesResource.get({domain: HostFactory.domain}, getSuccess, getError)


            return deferred.promise;
        };
        site.create = function() {
            var deferred = $q.defer();

            SitesResource.create({domain: HostFactory.domain}, function(res){
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
