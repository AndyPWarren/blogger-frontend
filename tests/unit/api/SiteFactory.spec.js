"use strict";

describe("SiteFactory", function (){
    var service, $rootScope, $httpBackend, env;

    beforeEach(module("blPrototype.api"));

    beforeEach(inject(function ($injector, SiteFactory){

        $httpBackend = $injector.get('$httpBackend');
        env = $injector.get("env");
        $rootScope = $injector.get("$rootScope");

        service = SiteFactory;
        $httpBackend
            .when("GET", env.API_ADDRESS + "sites/test.com")
            .respond({
                "data": {
                    "site": {
                        "id": 1,
                        "domain": "test.com",
                        "authorized": false
                    }
                }
            });


    }));
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("should return a site", function() {
        $rootScope.host = {
            domain: "test.com"
        };

        var site;

        service.get().then(function(response){
            site = response.data.site;
        });

        $httpBackend.flush();

        expect(site.id).toEqual(1);
        expect(site.domain).toEqual("test.com");
        expect(site.authorized).toBe(false);
        //ensure site object/properties are on $rootScope
        expect($rootScope.site.id).toEqual(1);
        expect($rootScope.site.domain).toEqual("test.com");
        expect($rootScope.site.authorized).toBe(false);

    });

});
