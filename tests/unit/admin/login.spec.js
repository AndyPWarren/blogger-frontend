"use strict";

describe("Login", function (){
    var scope, rootScope, controller, passPromise, mockAuthFactory, mockSiteFactory, $state, form;

    beforeEach(module("blPrototype.admin.login"));

    beforeEach(function(){
        module(function($provide){
            $provide.factory('AuthFactory', ['$q', function($q) {
                function login(){
                    if(passPromise){
                        return $q.when();
                    } else {
                        return $q.reject();
                    }
                }
                return{
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

        scope.login = {
            email: "",
            password: ""
        };

        mockAuthFactory = AuthFactory;
        spyOn(mockAuthFactory, 'login').and.callThrough();

        $state = {
            go: function(){}
        };
        spyOn($state, 'go');

        $controller("blLoginCtrl", {
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

    it("should reset password error", function() {
        scope.loginForm.password.$error.incorrect = true;
        scope.resetPasswordError();
        expect(scope.loginForm.password.$error.incorrect).toBe(false);
    });

    it("should reset email error", function() {
        scope.loginForm.email.$error.doesntExist = true;
        scope.resetEmailError();
        expect(scope.loginForm.email.$error.doesntExist).toBe(false);
    });

    describe("Submit login form", function (){

        it("should get the credientials from the form", function() {
            scope.login.email = "test.user";
            scope.login.password = "password";
            scope.submitLoginForm();
            expect(scope.credientials.identifier).toEqual("test.user@testuser.com");
            expect(scope.credientials.password).toEqual("password");
        });

        it("should go to app state if loginSuccess is called", function() {
            scope.loginSuccess();
            expect($state.go).toHaveBeenCalledWith("app");
        });

        it("should should set login form error if email isn't right", function() {
            var err = {data: {meta: {errors: "That email doesn't seem right"}}};
            scope.loginError(err);
            expect(scope.loginForm.email.$error.doesntExist).toEqual(true);
        });

        it("should should set password form error if password isn't right", function() {
            var err = {data: {meta: {errors: "Whoa, that password wasn't quite right!"}}};
            scope.loginError(err);
            expect(scope.loginForm.password.$error.incorrect).toEqual(true);
        });

        it("should call AuthFactory.login with user credientials", function(){
            scope.submitLoginForm();

            expect(mockAuthFactory.login).toHaveBeenCalledWith(scope.credientials);
        });

        it("should call loginSuccess if AuthFactory.login has been resolved", function(){
            passPromise = true;

            spyOn(scope, "loginSuccess")

            scope.submitLoginForm();

            scope.$digest();

            expect(scope.loginSuccess).toHaveBeenCalled();
        });

        it("should call loginError if AuthFactory.login has been rejected", function(){
            passPromise = false;

            spyOn(scope, "loginError")

            scope.submitLoginForm();

            scope.$digest();

            expect(scope.loginError).toHaveBeenCalled();
        });
    });



});
