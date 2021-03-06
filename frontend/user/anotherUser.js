
'use strict';
hateBook.controller('anotherUser', ['$scope', '$rootScope','userService', '$location', 'notify',  function($scope, $rootScope,userService, $location, notify) {
    $scope.userID = $rootScope.userId;
    $scope.isMe = false;
    $scope.isEnemy = false;
    $scope.notEnemy = true;
    $scope.getUsrInfo = function(){
        userService.getOtherPage($scope.userID).then(function(data){
        $scope.usrInfo = data.data;
            $scope.hgt =  $scope.usrInfo .pooCount*0.5;
            if($scope.yourInfo.enemies){
                $scope.yourInfo.enemies.forEach(function(enemy){
                    if($scope.userID == enemy){
                        $scope.isEnemy = true;
                        $scope.notEnemy = false;
                    }
                });
            }
            $scope.getPosts();
            userService.getHatersCount($scope.usrInfo._id).then(function (result) {
                $scope.hatersCount = result.data.haters;
            });
            console.log('else',$scope.usrInfo );
        }, function(err){
            console.log(err);
            $location.path('/login');
        })
    };
    $scope.getUserPage = function(){
        $location.path('/user');
    };
    $scope.getCurrentUserInfo = function () {
        userService.getUser().then(function (data) {
            $scope.yourInfo = data.data;
        }, function (err) {
            $location.path('/login');
            console.log(err);
        });
    };
    $scope.getCurrentUserInfo();
    $scope.getPosts = function () {
        userService.getPosts($scope.userID).then(function(data) {
            $scope.userPosts = data.data;
        });
    };
    $scope.addPoo = function() {
        if($scope.yourInfo.pooCredits > 0){
            $scope.hgt += 0.5;
            console.log($scope.height);
            userService.addPoo({userId:$scope.userID}).then(function () {
                $scope.usrInfo.pooCount += 1;
                $scope.yourInfo.pooCredits -= 1;
            })
        } else {
            notify({ message:'You dont have poo credits!', templateUrl:'bower_components/angular-notify/angular-notify.html', position: 'right', duration: 3000} );
        }
    };

    $scope.toEdit = function() {
        $location.path('/edit');
    };

    $scope.cleanPoo = function () {
        $location.path('/clean');
    };
    $scope.backToYourPage = function(){
        $scope.getCurrentUserInfo();
        $location.path('/user');
    };

    $scope.buyPoo = function () {
        $location.path('/buy');
    };

    $scope.createNewPost = function (content) {
        if (content) {
            userService.createPost({
                authorName: $scope.yourInfo.username,
                content: content,
                userId: $scope.userID,
                authorAvatar: $scope.yourInfo.avatar
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
            $scope.usrInfo.enemy = true;
            $scope.isEnemy = true;
            $scope.notEnemy = false;
        }, function(err){
            console.log(err)
        });
    };
}]);
