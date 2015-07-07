"use strict";

describe("Register", function (){
    var scope, rootScope, controller, passPromise, mockAuthFactory, mockSiteFactory, $state, form;

    beforeEach(module("blPrototype.admin.register"));

    beforeEach(function(){
        module(function($provide){
            $provide.factory('AuthFactory', ['$q', function($q) {
                function register(){
                    if(passPromise){
                        return $q.when();
                    } else {
                        return $q.reject();
                    }
                }
                function login(){
                    if(passPromise){
                        return $q.when();
                    } else {
                        return $q.reject();
                    }
                }
                return{
                    register: register,
                    login: login
                };
            }]);
        });

    });

    beforeEach(inject(function ($compile, $rootScope, $injector, $controller, AuthFactory){
        scope = $rootScope.$new();
        rootScope = $rootScope;

        rootScope.host = {
            emailDomain: "@testuser.com"
        }

        scope.register = {
            firstname: "",
            lastname: "",
            email: "",
            password: ""
        };

        mockAuthFactory = AuthFactory;
        spyOn(mockAuthFactory, 'register').and.callThrough();

        $state = {
            go: function(){}
        };
        spyOn($state, 'go');

        $controller("blRegisterCtrl", {
            $scope: scope,
            AuthFactory: mockAuthFactory,
            $state: $state
        });

        var element = angular.element("<form name=\"loginForm\">" +
            "<input name=\"email\" ng-model=\"login.email\"></input>" +
            "<input name=\"password\" ng-model=\"login.password\"></input>");

        $compile(element)(scope);
        form = scope.loginForm;

    }));

    it("should call state change if register is a success", function() {
        scope.registerSuccess();
        expect($state.go).toHaveBeenCalledWith("app");

    });

    it("should get user details from the forn", function() {
        scope.register.firstname = "test";
        scope.register.lastname = "user";
        scope.register.email = "test.user";
        scope.register.password = "password";

        scope.registerUser();

        expect(scope.user.firstName).toEqual("test");
        expect(scope.user.lastName).toEqual("user");
        expect(scope.user.email).toEqual("test.user@testuser.com");
        expect(scope.user.password).toEqual("password");
    });

    it("should call the register function on AuthFactory with user data", function() {
        scope.registerUser();
        expect(mockAuthFactory.register).toHaveBeenCalledWith(scope.user);
    });

    it("should call registerSuccess if register has been resolved", inject(function(AuthFactory) {
        passPromise = true;

        spyOn(scope, "registerSuccess")

        scope.registerUser();

        scope.$digest();

        expect(scope.registerSuccess).toHaveBeenCalled();

    }));

    it("should call registerError if register has been rejected", inject(function(AuthFactory) {
        passPromise = false;

        spyOn(scope, "registerError")

        scope.registerUser();

        scope.$digest();

        expect(scope.registerError).toHaveBeenCalled();

    }));

    describe("User exists", function (){
        var err;
        beforeEach(function (){
            scope.register.firstname = "test";
            scope.register.lastname = "user";
            scope.register.email = "test.user";
            scope.register.password = "password";

            err = {data: {meta: {errors: "This email already exists. So try logging in."}}}
        });

        it("should gather login credientials", function() {
            scope.registerUser();
            scope.registerError(err);

            expect(scope.loginCredientials.identifier).toEqual("test.user@testuser.com");
            expect(scope.loginCredientials.password).toEqual("password");

        });

        it("should provide a message stating the user exists and will be logged in", function() {
            scope.registerUser();
            scope.registerError(err);

            expect(scope.login).toEqual("Hello test just logging you in ...");
        });
    });


});
