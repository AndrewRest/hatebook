'use strict';

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

    .controller('loginCtrl', ['$scope', '$rootScope', '$location', '$timeout', 'preferences', 'loginService','ngMeta', function($scope, $rootScope, $location, $timeout, preferences, loginService, ngMeta) {
        console.log('afdsafasd');
    }])

    .factory('loginService',
        ['$http', function($http) {
            return {
                login: function(user, url) {
                    if(url == '/login') {
                        return $http.post('/api/v0.1/candidate/login', user);
                    }
                }

            };
        }
        ]);