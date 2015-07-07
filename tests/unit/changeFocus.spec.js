//"use strict";
//
//describe("changeFocus directive", function (){
//    var $compile, $scope, $rootScope, $interval, form, element, isolateScope;
//
//    beforeEach(module("sn.inputConfirm"));
//
//    beforeEach(inject(function(_$compile_, _$rootScope_, _$interval_){
//        // The injector unwraps the underscores (_) from around the parameter names when matching
//        $compile = _$compile_;
//        $rootScope = _$rootScope_;
//        $interval = _$interval_;
//        $scope = $rootScope.$new();
//        $scope.model = {
//            firstElm: ""
//        };
//
//
//    }));
//
//    beforeEach(function() {
//        jasmine.addMatchers({
//            toHaveFocus: function() {
//                return {
//                    compare: function(actual) {
//                        return {
//                            pass: document.activeElement === actual[0]
//                        };
//                    }
//                };
//            }
//        });
//    });
//
//    it("should move focus to second element", function() {
//        element = angular.element(
//            "<form name=\"form\" bl-change-focus=\"firstElement, secondElement, thirdElement (@)\">" +
//            "<input ng-model=\"model.firstElm\" name=\"firstElement\" id=\"firstElement\"></input>" +
//            "<input ng-model=\"model.seceondElm\" name=\"secondElement\" id=\"secondElement\"></input></form>"
//        );
//
//        element = $compile(element)($scope);
//        $scope.$digest();
//
//        isolateScope = element.isolateScope();
//
//        form = $scope.form;
//        form.firstElement.$setViewValue("something ");
//        console.log($scope.model.firstElm);
//        spyOn(element[0], "focus");
//        $interval.flush();
//        expect(element[0].focus).toHaveFocus();
//    });
//
////    it("should move focus to third element", function() {
////        element = angular.element(
////            "<form name=\"form\" bl-change-focus=\"firstElement, secondElement, thirdElement (@)\">" +
////            "<input ng-model=\"model.firstElm\" name=\"firstElement\" id=\"firstElement\"></input>" +
////            "<input ng-model=\"model.seceondElm\" name=\"secondElement\" id=\"secondElement\"></input></form>" +
////            "<input name=\"thirdElement\" id=\"secondElement\"></input></form>"
////        );
////        $compile(element)($scope);
////        innerScope = element.isolateScope();
////        form = $scope.form;
////        $('body').append(element);
////        form.firstElement.$setViewValue("something@");
////
////        $rootScope.$digest();
////        console.log($scope.model.firstElm);
////        spyOn(element[2], "focus");
////        $interval.flush();
////        expect(element[1])
////        expect(element[2].focus).toHaveBeenCalled();
////        //        expect(form.confirmPassword.$error.inputConfirm).toBe(true);
////    });
//});
