"use strict";
/*
 * @module   bl.changeFocus
 */
angular.module("bl.changeFocus", [])

.provider('blChangeFocusConfig', function () {

    /**
     * set cssClass
     * @param {String} cssClass
     */
    this.setCssClass = function (cssClass) {
        this.cssClass = cssClass;
    };

    this.$get = function () {
        return this;
    };
})
/**
 * @constructor
 * @description change focus from one element to another based on a keypress in first element
 * can also have a third element for alertion purposes
 * @example two element focus change
 * bl-change-focus="{first-element}, {second-element}, ({key to detect})"
 * <input id="{first-element}">
 * <input id="{second-element}">
 * @example three element focus change
 * focus moves from 1-3 and 2 is used to flash the user with a CSS class defined in config
 * bl-change-focus="{first-element}, {second-element}, {third-element}, ({key-to-detect})"
 * <input id="{first-element}">
 * <input id="{second-element}">
 * @class blChangeFocus
 */
.directive("blChangeFocus",[
    '$interval',
    'blChangeFocusConfig',
    function ($interval, blChangeFocusConfig){
        return {
            restrict: "A",
            link: function($scope, $element, attrs){

                /*
                 * take arguments supplied in directive call and split by ,
                 * @property argsArr
                 */
                var argsArr = attrs.blChangeFocus.split(', ');
                /*
                 * first, second and third element id's from supplied arguments
                 * @property firstId
                 * @property secondId
                 * @property thirdId
                 */
                var firstId = "#" + argsArr[0],
                    secondId = "#" + argsArr[1],
                    thirdId = "#" + argsArr[2];
                /*
                 * the character which the user wants to detect
                 * taken from supplied arguments
                 * @property char
                 */
                var char = argsArr.pop();
                /*
                 * the css class for flashing an element
                 * defined in ConfigProvider
                 * @property cssClass
                 */
                var cssClass = blChangeFocusConfig.cssClass;
                /*
                 * regular expression to catch content in parentheses ()
                 * @property regExp
                 */
                var regExp = /\(([^)]+)\)/;
                /*
                 * perform regexp on char
                 * @property matches
                 */
                var matches = regExp.exec(char);
                /*
                 * get char code from the match
                 * @property keyCode
                 */
                var keyCode = matches[1].charCodeAt();

                //Deduce logic based on 2 or 3 user arguments
                if (argsArr.length === 2) {
                    //if 2 element id's have been provided
                    //move focus to second element no css change
                    var firstElement = $element.find(firstId);
                    var secondElement = $element.find(secondId);

                    firstElement.on('keypress', function(event){
                        if (event.keyCode === keyCode) {

                            firstElement.blur();

                            var focusChange = $interval(function(){
                                secondElement.focus();
                                $interval.cancel(focusChange);
                            }, 100);
                        }
                    });
                } else if (argsArr.length === 3) {
                    //if 3 element id's have been provided
                    //move focus to second element and add css class
                    //then after 2s remove css class and move focus to third element
                    var firstElement = $element.find(firstId);
                    var secondElement = $element.find(secondId);
                    var thirdElement = $element.find(thirdId);
                    firstElement.on('keypress', function(event){
                        if (event.keyCode === keyCode) {

                            firstElement.blur();
                            secondElement.addClass(cssClass);

                            var focusChange = $interval(function(){
                                secondElement.removeClass(cssClass);
                                thirdElement.focus();
                                $interval.cancel(focusChange);
                            }, 2000);
                        }
                    });
                }

            }
        };
    }
]);
