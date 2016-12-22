'use strict';
hateBook.controller('userCtrl', ['$scope', '$rootScope','userService', '$location',  function($scope, $rootScope,userService, $location) {
    userService.getUser().then(function(data) {
        console.log(data.data);
    }, function(err){
        $location.path('/login');
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
    };

    $scope.cleanPoo = function () {
        $location.path('/clean');
    };

    $scope.createNewPost = function (content) {
        if (content) {
            userService.createPost({
                authorName: $scope.currentUser.username,
                content: content,
                userId: $scope.currentUser._id
            }).then(function (data) {
                console.log(data.data);
                $scope.getPosts();
            });
        }
    };
    $scope.toEnemiesPg = function(){
        $location.path('/enemies-list')
    };
    $scope.toNotEnemiesPg = function(){
        $location.path('/not-enemies')
    }
    $scope.logout = function(){
        userService.logout().then(function(){
            $location.path('/login')
        }, function(err){
            console.log(err)
        })
    }
}]);
