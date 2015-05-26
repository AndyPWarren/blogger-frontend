"use strict";
/*
 * @module   blPrototype.login
 * @author   SpectraKey
 */
angular.module("blPrototype.admin.login", [

])

.controller("blLoginCtrl", ["$scope", "$location", "UsersResource", "SitesResource",  function($scope, $location, UsersResource, SitesResource){

    $scope.loseFocus = function loseFocus(e) {
        if (e.keyCode === 192 && e.shiftKey === true) {
            console.log('fired');
        }
    };

    /**
     * submit login form details
     * @returns {string} error message
     */
    $scope.submitLoginForm = function submitLoginForm(){

        /**
         * user's email and password from form
         * @name credientials
         * @type {Object}
         */
        var credientials = {
            identifier: $scope.loginForm.email.$viewValue + "@" + $scope.host,
            password: $scope.loginForm.password.$viewValue
        };

        /**
         * query API for user with email
         * @param {Object} res user object from resource
         */
        UsersResource.get({email: credientials.identifier}, $scope.getUserSuccess, $scope.getUserError);

        $scope.getUserSuccess = function getUserSuccess(res) {
            /**
             * save user from res data
             * @param {Object} user
             */
            var user = res.data.user;
            /**
             * get user's site
             * @param {string} userSite
             */
            var userSite = res.data.user.site.domain;

            /**
             * if user doesn't belong to same site as host return error message
             * @param   {String}  userSite
             * @param   {String}  $scope.host
             * @returns {string} $scope.userError
             */
            if (userSite !== $scope.host) return $scope.userError = credientials.identifier + " is not a user at " + $scope.host;

            /**
             * login user in
             * @param {Object} credientials
             */
            UsersResource.login(credientials, $scope.loginSuccess, $scope.loginError)
            /**
             * login success callback
             * @param {Object} res
             */
            $scope.loginSuccess = function loginSuccess(res){
                $location.path('/');
            };
            /**
             * login error callback
             * @param {Object} res
             */
            $scope.loginError = function loginError(err){
                console.log(err)
            };
        };

        $scope.getUserError = function getUserError(err) {
            console.log(err);
        };
    };

}]);


