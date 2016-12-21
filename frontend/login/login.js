'use strict';

hateBook.controller('loginCtrl', ['$scope', '$rootScope','loginService','$window', function ($scope, $rootScope, loginService, $window) {
    $scope.user = {
        email: "",
        password: ""
    };
    $scope.isError = false;

    $scope.login = function(){
        loginService.logIn($scope.user).then(function(data){
            console.log(data)
        }, function(err) {
            $scope.isError = true;
           console.log(err);
        })
    };

    $scope.goToLandingRegForm = function(){
      $window.location.href = '/#/signup';
    };

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
