'use strict';
hateBook.controller('paymentCtrl', ['$scope', '$rootScope', 'userService', 'paymentService', '$location', function($scope, $rootScope, userService, paymentService, $location) {
    $scope.getCurrentUser = function () {
        userService.getUser().then(function(data) {
            $scope.currentUser = data.data;
            $scope.userPooCount = $scope.currentUser.pooCount;
        });
    };
    $scope.getUserPage = function(){
        $location.path('/user')
    };
    $scope.pooToClean = 0;
    $scope.pooToBuy = 0;
    $scope.paymentForm = false;

    $scope.showPaymentForm = function (count, isCleanUpForm) {
        if(isCleanUpForm && $scope.pooToClean > $scope.userPooCount){
            return $scope.paymentErrorMessage = "You can not clean the poop, more than you have. Please provide less.";
        }
        $scope.paymentErrorMessage = null;
        if (count > 0) {
            $scope.paymentForm = true;
        } else if (count < 0) {
            $scope.paymentErrorMessage = 'Who do you want to cheat, asshole?'
        }
        else {
            $scope.paymentErrorMessage = 'Provide poo count!';
        }
    };
    
    $scope.cleanPoo = function (pooCount) {
        paymentService.cleanPoo({cleanupCount:pooCount}).then(function (data) {
            console.log(data);
            $location.path('/user');
        });
    };

    $scope.buyPoo = function (pooCount) {
        paymentService.buyPoo({count:pooCount}).then(function (data) {
            console.log(data);
            $location.path('/user');
        });
    };

    $scope.cancel = function () {
        $location.path('/user');
    }
}]);