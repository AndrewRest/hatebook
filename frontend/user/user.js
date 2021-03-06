'use strict';
hateBook.controller('userCtrl', ['$scope', '$rootScope','userService', '$location', 'notify',  function($scope, $rootScope,userService, $location, notify) {
   
    $scope.isMyPage = false;


    $scope.getCurrentUserInfo = function () {
        userService.getUser().then(function (data) {
            $scope.loggedInUser = data.data;
            $scope.hgt = $scope.loggedInUser.pooCount*0.5;
            if (!$scope.currentUser) {
                $scope.currentUser = $scope.loggedInUser;
                $scope.isMyPage = true;
            } else {
                $scope.hgt = $scope.currentUser.pooCount*0.5;
                console.log($scope.currentUser.pooCount);
            }
            $scope.getPosts();
            userService.getHatersCount($scope.currentUser._id).then(function (result) {
                $scope.hatersCount = result.data.haters;
            });
        }, function (err) {
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
        if($scope.loggedInUser.pooCredits > 0){
            $scope.hgt += 0.5;
            console.log($scope.height);
            userService.addPoo({userId:$scope.currentUser._id}).then(function () {
                $scope.currentUser.pooCount += 1;
                $scope.loggedInUser.pooCredits -= 1;
            })
        }
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
                authorName: $scope.loggedInUser.username,
                content: content,
                userId: $scope.currentUser._id,
                authorAvatar: $scope.loggedInUser.avatar
            }).then(function (data) {
                console.log(data.data);
                $scope.newPostOnFocus = false;
                $scope.getPosts();
            });
            $scope.newPostContent = null;
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

    $scope.likePost = function (post) {
        userService.likePost({postId: post._id}).then(function(){
            $scope.getPosts();
        }, function(err){
            console.log(err)
        });
    };

    $scope.makeEnemy = function (enemy) {
        userService.addEnemy(enemy._id).then(function(){
            $scope.currentUser.enemy = true;
        }, function(err){
            console.log(err)
        });
    };
}]);
