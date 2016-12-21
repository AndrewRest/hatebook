'use strict';

/*
 angular.module('hatebook.login', ['ngRoute'])

 .config(['$routeProvider', function($routeProvider) {
 $routeProvider.when('/login', {
 templateUrl: 'login/login.html',
 controller: 'loginCtrl',
 meta: {
 title: 'hatebook | login'
 }
 });
 }])
 */

hateBook.controller('userCtrl', ['$scope', '$rootScope',  function($scope, $rootScope) {
    console.log('user');
}]);

/*.factory('loginService',
 ['$http', function($http) {
 return {
 login: function(user, url) {
 if(url == '/login') {
 return $http.post('/api/v0.1/candidate/login', user);
 }
 }

 };
 }
 ]);*/