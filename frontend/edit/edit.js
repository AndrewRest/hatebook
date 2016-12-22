'use strict';
hateBook.controller('editCtrl', ['$scope', '$rootScope','userService', '$location', function($scope, $rootScope, userService, $location) {
    $scope.userInfo = {
        userId: "",
        username:"",
        hateMovies:"",
        hateBooks:"",
        iHate:""

    };
    userService.getUser().then(function(data){
        $scope.userInfo.userId = data.data._id;
        console.log(data);
    },function(err){
        if(err.status == 401){
            $location.path('/login');
        }
        console.log(err);
    });

    $scope.editUserInfo = function(){
        userService.updateInfo($scope.userInfo).then(function(data){
            console.log(data);
            $location.path('/user');
        },function(err){
            console.log(err)
        })
    };
}]);
