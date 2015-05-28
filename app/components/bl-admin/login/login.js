"use strict";
/*
 * @module   blPrototype.login
 * @author   SpectraKey
 */
angular.module("blPrototype.admin.login", [

])

.controller("blLoginCtrl", ["$scope", "$location", "UsersResource", "SitesResource",  function($scope, $location, UsersResource, SitesResource){

    $scope.resetPasswordError = function resetPasswordError() {
        $scope.loginForm.password.$error.incorrect = false;
    };

    $scope.resetEmailError = function resetEmailError() {
        $scope.loginForm.email.$error.doesntExist = false;
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
            identifier: $scope.login.email + $scope.emailDomain,
            password: $scope.login.password
        };

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
            //            var userSite = res.data.user.site.domain;
            //            console.log(userSite);
            /**
             * if user doesn't belong to same site as host return error message
             * @param   {String}  userSite
             * @param   {String}  $scope.host
             * @returns {string} $scope.userError
             */
            //            if (userSite !== $scope.host) return $scope.userError = credientials.identifier + " is not a user at " + $scope.host;

            /**
             * login success callback
             * @param {Object} res
             */
            $scope.loginSuccess = function loginSuccess(res){
                if (res.meta.code === 200) {
                    $location.path('/');
                    console.log("logged in")
                    console.log(res.data.user.fullName);
                } else {
                    console.log(res);
                    $scope.loginForm.password.$error.incorrect = true;
                }

            };
            /**
             * login error callback
             * @param {Object} res
             */
            $scope.loginError = function loginError(err){
                console.log("error")
                console.log(err)

            };
            /**
             * login user in
             * @param {Object} credientials
             */
            UsersResource.login(credientials, $scope.loginSuccess, $scope.loginError)

        };


        $scope.getUserError = function getUserError(err) {
            console.log(err);
            $scope.loginForm.email.$error.doesntExist = true;
        };

        /**
         * query API for user with email
         * @param {Object} res user object from resource
         */
        UsersResource.get({email: credientials.identifier}, $scope.getUserSuccess, $scope.getUserError);


    };

    $scope.logout = function logout(){
        console.log("clicked");
        UsersResource.logout(function(res){
            console.log(res);
        });
    }

}]);


