hateBook.controller('signUpController', ['$scope', '$rootScope','loginService','$window', function ($scope, $rootScope, loginService, $window) {
    $scope.user = {
        email: "",
        password: ""
    };

    $scope.signUp = function () {
        loginService.signUp($scope.user).then(function (data) {
            $window.location.href='/#/login';
                console.log(data)
            },
            function (err) {
                $scope.isError = true;
                console.log(err);
            })
    };
}]);
