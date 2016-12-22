'use strict';
hateBook.controller('userCtrl', ['$scope', '$rootScope','userService', '$location',  function($scope, $rootScope,userService, $location) {
   /* $scope.currentUser = $rootScope.anotherUserInfo;*/
    userService.getUser().then(function(data) {
        console.log(data.data);
    }, function(err){
        if(err.status == 401){
            $location.path('/login');
        }
        console.log(err);
        }
    );
    $scope.hgt = 0;
    $scope.getCurrentUserInfo = function () {
        userService.getUser().then(function(data) {
            $scope.currentUser = data.data;
            $scope.getPosts();
        }, function(err){
            $location.path('/login');
            console.log(err);
        });
    };

    $scope.getPosts = function () {
        userService.getPosts($scope.currentUser._id).then(function(data) {
            $scope.userPosts = data.data;
        });
    };
    $scope.addPoo = function() {
        $scope.hgt += 10;
        console.log($scope.height);
    };

    $scope.toEdit = function() {
        $location.path('/edit');
    };

    $scope.cleanPoo = function () {
        $location.path('/clean');
    };
    
    $scope.buyPoo = function () {
        $location.path('/buy');
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
            $scope.newPostContent = '';
        }
    };
    $scope.toEnemiesPg = function(){
        $location.path('/enemies-list')
    };
    $scope.toNotEnemiesPg = function(){
        $location.path('/not-enemies')
    };
    $scope.logout = function(){
        userService.logout().then(function(){
            $location.path('/login')
        }, function(err){
            console.log(err)
        })
    };

}]);
