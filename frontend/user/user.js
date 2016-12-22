'use strict';
hateBook.controller('userCtrl', ['$scope', '$rootScope','userService', '$location',  function($scope, $rootScope,userService, $location) {
    /*$('.dropdown-toggle').dropdown()*/
    console.log('user');
    userService.getUser().then(function(data) {
        console.log(data.data);
    }, function(err){
        $window.location.href='/#/login';
        console.log(err);
        }
    );
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
        $location.path('/edit');
        console.log('asdasfasd');
    };

    $scope.cleanPoo = function () {
        $location.path('/clean');
    };

    $scope.createNewPost = function (content) {
        userService.createPost({authorName:$scope.currentUser.username, content:content, userId:$scope.currentUser._id}).then(function(data) {
            console.log(data.data);
            $scope.getPosts();
        });
    }
}]);
