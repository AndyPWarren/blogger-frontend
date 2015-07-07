"use strict";

describe("Admin", function (){

    var scope, rootScope, controller, passPromise, mockAuthFactory, mockSiteFactory, $state, log;

    beforeEach(module("blPrototype.admin"));

    beforeEach(function(){
        module(function($provide){
            $provide.factory('AuthFactory', ['$q', function($q) {
                function logout(){
                    if(passPromise){
                        return $q.when();
                    } else {
                        return $q.reject();
                    }
                }
                return{
                    logout: logout
                };
            }]);
        });
        module(function($provide){
            $provide.factory('SiteFactory', ['$q', function($q) {
                function get(){
                    if(passPromise){
                        return $q.when();
                    } else {
                        return $q.reject();
                    }
                }
                return{
                    get: get
                };
            }]);
        });
    });

    beforeEach(inject(function (_$rootScope_, $injector, AuthFactory, SiteFactory, $log){
        rootScope = _$rootScope_;
        scope = rootScope.$new();

        log = $injector.get("$log");

        mockAuthFactory = AuthFactory;
        mockSiteFactory = SiteFactory;
        $state = {
            go: function(){}
        };
        spyOn(mockAuthFactory, 'logout').and.callThrough();
        spyOn(mockSiteFactory, 'get').and.callThrough();
        spyOn($state, 'go');

    }));

    describe("get site", function (){

        beforeEach(inject(function ($rootScope, $controller){
            var res = {data: {site: {users: [1]}}};
            $controller("blAdminCtrl", {
                $scope: scope,
                //AuthFactory: mockAuthFactory,
                SiteFactory: mockSiteFactory,
                //$state: $state
            });
        }));

        it("should get the site", function() {
            scope.getSite();
            expect(mockSiteFactory.get).toHaveBeenCalled();
        });

        it("should call getSiteError if SiteFactory.get has been rejected", inject(function(SiteFactory) {
            passPromise = false;
            spyOn(scope, "getSiteError");
            scope.getSite();
            scope.$digest();
            expect(scope.getSiteError).toHaveBeenCalled();
        }));


        it("should call getSiteSuccess if SiteFactory.get has been resolved", inject(function(SiteFactory) {
            passPromise = true;
            spyOn(scope, "getSiteSuccess");
            scope.getSite();
            scope.$digest();
            expect(scope.getSiteSuccess).toHaveBeenCalled();
        }));


    });

    describe("User  is logged in", function (){

        beforeEach(inject(function ($rootScope, $controller){
            $rootScope.user = {
                id: 1,
                email: "test@user.com"
            };

            $controller("blAdminCtrl", {
                $scope: scope,
                AuthFactory: mockAuthFactory,
                SiteFactory: mockSiteFactory,
                $state: $state
            });
        }));

        it("should return a logout message", function() {
            scope.$digest();
            expect(scope.userStatus).toEqual("please logout");
        });

        it("should logout when function is invoked", function() {
            passPromise = true;
            scope.logout();
            rootScope.$digest();
            expect($state.go).toHaveBeenCalled();
        });
    });

    describe("User not logged in", function (){

        beforeEach(inject(function ($rootScope, $controller){
            $controller("blAdminCtrl", {
                $scope: scope,
                AuthFactory: mockAuthFactory,
                SiteFactory: mockSiteFactory,
                $state: $state
            });
        }));

        it("should return register state if no user object", function() {
            var res = {data: {site: {}}};
            scope.getSiteSuccess(res);
            expect($state.go).toHaveBeenCalledWith("app.admin.register");
        });

        it("should return register state if no users exist on site", function() {
            var res = {data: {site: {users: []}}};
            scope.getSiteSuccess(res);
            expect($state.go).toHaveBeenCalledWith("app.admin.register");
        });

        it("should return login state if users exist on site", function() {
            var res = {data: {site: {users: [1]}}};
            scope.getSiteSuccess(res);
            expect($state.go).toHaveBeenCalledWith("app.admin.login");
        });



        it("should log the getSiteError error", inject(function() {
            var err = "some error";
            scope.getSiteError(err);
            expect(log.error.logs).toContain([err]);

        }));



    });
});

