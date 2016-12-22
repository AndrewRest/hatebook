hateBook.controller('signUpController', ['$scope', '$rootScope','loginService','$location', function ($scope, $rootScope, loginService, $location) {
    $scope.user = {
        email: "",
        password: ""
    };

    $scope.signUp = function () {
        loginService.signUp($scope.user).then(function (data) {
                $location.path('/login');
                console.log(data)
            },
            function (err) {
                $scope.isError = true;
                console.log(err);
            })
    };
}]);
