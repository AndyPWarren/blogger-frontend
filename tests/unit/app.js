"use strict";

describe("blPrototype", function (){

    var $location, $route, $rootScope;

    beforeEach(function(){
        module("blPrototype");
    });

    beforeEach(inject(function ( _$location_, _$route_, _$rootScope_) {
        $location = _$location_;
        $route = _$route_;
        $rootScope = _$rootScope_;
    }));

    beforeEach(inject(function ($httpBackend) {
        $httpBackend.whenGET(/.*/).respond(200);
    }));

    it("should be true", function() {
        expect(true).toBe(true);
    })

});
