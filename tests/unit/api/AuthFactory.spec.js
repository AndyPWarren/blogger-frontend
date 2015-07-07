"use strict";

describe("AuthFactory", function (){
    var service, $rootScope, $httpBackend, env;

    beforeEach(module("blPrototype.api"));

    beforeEach(inject(function ($injector, AuthFactory){

        $httpBackend = $injector.get('$httpBackend');
        env = $injector.get("env");
        $rootScope = $injector.get("$rootScope");
        $rootScope.isAuthenticated = null;
        $rootScope.user = null;
        $rootScope.site = null;
        service = AuthFactory;

        $httpBackend
            .when("POST", env.API_ADDRESS + "users/auth/local")
            .respond({
            "data": {
                "user": {
                    "id": 1,
                    "lastName": "test",
                    "firstName": "user",
                    "email": "user@test.com",
                    "site": 1
                }
            }
        });

        $httpBackend
            .when("GET", env.API_ADDRESS + "users/logout")
            .respond({
            "meta": {
                message: "logout success"
            }
        });

        $httpBackend
            .when("POST", env.API_ADDRESS + "users/auth/local/register")
            .respond({
            "data": {
                "user": {
                    id: 1,
                    lastName: "test",
                    firstName: "user",
                    email: "user@test.com",
                    site: 1
                }
            }
        });

        $httpBackend
            .when("GET", env.API_ADDRESS + "users/current")
            .respond({
            "data": {
                "user": {
                    id: 1,
                    lastName: "test",
                    firstName: "user",
                    email: "user@test.com",
                    site: 1
                }
            }
        });

    }));
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe("Login", function (){
        it("should login a user", function() {
            var user;
            $rootScope.site = {
                id: 1
            };
            var credentials = {
                identifier: "test@user.com",
                password: "password"
            };

            service.login(credentials).then(function(response){
                user = response.data.user;
            });

            $httpBackend.flush();

            expect(user.id).toEqual(1);
            //ensure auth has exectued successfully
            expect($rootScope.isAuthenticated).toEqual(true);
            expect($rootScope.user.id).toEqual(1);
        });

        it("should logout a user", function() {
            var meta;

            service.logout().then(function(response){
                meta = response.meta;
            });

            $httpBackend.flush();

            expect(meta.message).toEqual("logout success");
            //ensure unAuth has exectued successfully
            expect($rootScope.isAuthenticated).toEqual(false);
            expect($rootScope.user).toEqual(null);
        });

        it("should register a user", function() {
            var user;
            var userDetails = {
                firstName: "test",
                lastName: "user",
                identifier: "test@user.com",
                password: "password"
            };
            $rootScope.site = {
                id: 1
            };
            service.register(userDetails).then(function(response){
                user = response.data.user;
            });

            $httpBackend.flush();

            expect(user.id).toEqual(1);
            //ensure auth has exectued successfully
            expect($rootScope.isAuthenticated).toEqual(true);
            expect($rootScope.user.site).toEqual(1);
        });

        it("should get the current user", function() {
            var user;
            $rootScope.site = {
                id: 1
            };
            service.current().then(function(response){
                user = response.data.user;
            });

            $httpBackend.flush();

            expect(user.id).toEqual(1);
            //ensure auth has exectued successfully
            expect($rootScope.isAuthenticated).toEqual(true);
            expect($rootScope.user.site).toEqual(1);
        });

    });



    describe("if the user doesnt belong to the site", function (){

        it("should not log them in", function() {
            var user;
            var credentials = {
                identifier: "test@user.com",
                password: "password"
            };

            service.login(credentials).then(function(response){
                user = response.data.user;
            });

            $httpBackend.flush();
            //ensure auth has exectued successfully
            expect($rootScope.user).toEqual(null);
        });

        it("should not get the current user", function() {
            var user;
            service.current().then(function(response){
                user = response.data.user;
            });

            $httpBackend.flush();
            //ensure auth has exectued successfully
            expect($rootScope.user).toEqual(null);
        });

    });





});
