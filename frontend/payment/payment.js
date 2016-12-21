'use strict';
hateBook.controller('paymentCtrl', ['$scope', '$rootScope',  function($scope, $rootScope) {
    $scope.userPooCount = 100500;
    $scope.pooToClean = 0;
    $scope.paymentForm = false;
    $scope.showPaymentForm = function () {
        $scope.paymentForm = true;
    }
}]);