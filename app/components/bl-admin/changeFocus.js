"use strict";
/*
 * @module   bl.changeFocus
 */
angular.module("bl.changeFocus", [

])
/**
 * @constructor
 * @example sets up a relationship between three elements using the id selector
 * First element will detect the keypress (@) and move focus to the second element focus will then move onto the third element
 * Works best with one input and a second readonly input
 * bl-change-focus="{first-element}, {second-element}"
 * <input id="{first-element}">
 * <input id="{second-element}" ng-readonly=true>
 * <input id="{third-element}">
 * @class blChangeFocus
 */
.directive("blChangeFocus",[
    '$interval',
    function ($interval){
        return {
            restrict: "A",
            link: function($scope, $element, attrs ){

                var inputIdsArr = attrs.blChangeFocus.split(', '),
                    inputId = "#" + inputIdsArr[0],
                    focusToId = "#" + inputIdsArr[1],
                    passwordId = "#" + inputIdsArr[2];

                var inputElement = $element.find(inputId);
                var focusToElement = $element.find(focusToId);
                var passwordElement = $element.find(passwordId);

                inputElement.on('keydown', function(event){
                    if (event.keyCode === 192 && event.shiftKey === true) {

                        focusToElement.focus();
                        focusToElement.css({color:'green'});

                        var moveToPassword = $interval(function(){
                            focusToElement.css({color:'black'});
                            passwordElement.focus();
                            $interval.cancel(moveToPassword);
                        }, 2000);
                    }
                });
            }
        };
    }
]);
