'use strict';
hateBook.controller('paymentCtrl', ['$scope', '$rootScope', 'userService', 'paymentService', '$location', function($scope, $rootScope, userService, paymentService, $location) {
    $scope.getCurrentUser = function () {
        userService.getUser().then(function(data) {
            $scope.currentUser = data.data;
            $scope.userPooCount = $scope.currentUser.pooCount;
        });
    };

    $scope.pooToClean = 0;
    $scope.paymentForm = false;

    $scope.showPaymentForm = function () {
        if ($scope.pooToClean > 0) {
            $scope.paymentForm = true;
        } else if ($scope.pooToClean < 0) {
            $scope.paymentErrorMessage = 'Who do you want to cheat, asshole?'
        }
        else {
            $scope.paymentErrorMessage = 'Provide poo count to clean!';
        }
    };
    
    $scope.cleanPoo = function (pooCount) {
        paymentService.cleanPoo({cleanupCount:pooCount}).then(function (data) {
            console.log(data);
            $location.path('/user');
        });
    };

    $scope.cancelCleaning = function () {
        $location.path('/user');
    }
}]);