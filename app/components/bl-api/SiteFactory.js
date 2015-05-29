"use strict";

angular.module("blPrototype.api.sitefactory", [])

.factory("SiteFactory", [
    "SitesResource",
    "HostFactory",
    "$q",

    function(SitesResource, HostFactory, $q) {

//        var site = {};
//

//
//        site.get = $q.defer(function getSite() {
//            SitesResource.get({domain: HostFactory.domain}, siteSuccess, siteError)
//        });
//
//        site.create = function createSite(){
//            SitesResource.create({domain: HostFactory.domain}, function(res){
//                console.log(res);
//                site.site = res.data.site
//            }, function (err){
//                console.log(err);
//            })
//        };
//
//        return site.get.promise;

        var site = {};


        site.get = function() {
            var deferred = $q.defer();

            var getError = function siteError(err){
                console.log(err);
                if (err.status === 404) {
                    //site doesnt exist
                    //create site
                    console.log("site doesn't exist creating...")
                    site.create()
                }

                if (err.status === 403) {
                    site.authorized = false;
                    //site hasn't been authorized yet
                    console.log("site hasn't been authorized yet")
                }
                deferred.resolve(err)
            };

            var getSuccess = function siteSuccess(res){
                site.site = res.data.site;
                deferred.resolve(site)
            };

            SitesResource.get({domain: HostFactory.domain}, getSuccess, getError)


            return deferred.promise;
        };
        site.create = function() {
            var deferred = $q.defer();

            SitesResource.create({domain: HostFactory.domain}, function(res){
                deferred.resolve(res);
            }, function(err){
                deferred.reject(err);
            });

            return deferred.promise;
        }


        return site;

    }
]);
