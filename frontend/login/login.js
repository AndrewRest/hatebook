'use strict';

hateBook.controller('loginCtrl', ['$scope', '$rootScope','loginService','$window', function ($scope, $rootScope, loginService, $window) {
    $scope.user = {
        email: "",
        password: ""
    };
    $scope.isError = false;

    $scope.login = function(){
        loginService.logIn($scope.user).then(function(data){
            $window.location.href = '/#/user';
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

