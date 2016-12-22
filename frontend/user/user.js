'use strict';
hateBook.controller('userCtrl', ['$scope', '$rootScope','userService','$window',  function($scope, $rootScope,userService, $window) {
    /*$('.dropdown-toggle').dropdown()*/
    console.log('user');
    userService.getUser().then(function(data) {
        console.log(data.data);
        $scope.currentUser = data.data;
    });
    $scope.toEdit = function() {
        $window.location.href = '/#/edit';
        console.log('asdasfasd');
    };
}]);
