"use strict";

describe("inputConfirm directive", function (){
    var $compile, $scope, $rootScope, form;

    beforeEach(module("sn.inputConfirm"));

    beforeEach(inject(function(_$compile_, _$rootScope_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $scope.model = {
            password: "",
            confirmPassword: ""
        };

        var element = angular.element("<form name=\"form\">" +
            "<input name=\"password\" ng-model=\"model.password\"></input>" +
            "<input name=\"confirmPassword\" ng-model=\"model.confirmPassword\" sn-input-confirm=\"model.password\"</input>");

        $compile(element)($scope);
        form = $scope.form;


    }));

    it("should return an error if two fields don't match", function() {
        form.password.$setViewValue("password");
        form.confirmPassword.$setViewValue("thisdoesntmatch");
        $rootScope.$digest();

        expect($scope.model.password).toEqual("password");
        expect($scope.model.confirmPassword).toEqual("thisdoesntmatch");
        expect(form.confirmPassword.$error.inputConfirm).toBe(true);
    });

    it("form should be valid if fields match", function() {
        form.password.$setViewValue("password");
        form.confirmPassword.$setViewValue("password");
        $rootScope.$digest();

        expect($scope.model.password).toEqual("password");
        expect($scope.model.confirmPassword).toEqual("password");
        expect(form.confirmPassword.$error.inputConfirm).toBe(undefined);
        expect(form.$valid).toBe(true);
    })
});
