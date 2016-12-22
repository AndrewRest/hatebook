'use strict';
hateBook.controller('userCtrl', ['$scope', '$rootScope','userService','$window',  function($scope, $rootScope,userService, $window) {
    /*$('.dropdown-toggle').dropdown()*/
    console.log('user');
    $scope.getCurrentUserInfo = function () {
        userService.getUser().then(function(data) {
            console.log(data.data);
            $scope.currentUser = data.data;
            $scope.getPosts();
        });
    };

    $scope.getPosts = function () {
        userService.getPosts($scope.currentUser._id).then(function(data) {
            console.log(data.data);
            $scope.userPosts = data.data;
        });
    };

    $scope.toEdit = function() {
        $window.location.href = '/#/edit';
        console.log('asdasfasd');
    };
}]);
