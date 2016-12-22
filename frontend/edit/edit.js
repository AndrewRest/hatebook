'use strict';
hateBook.controller('editCtrl', ['$scope', '$rootScope','userService', '$location','Upload', function($scope, $rootScope, userService, $location, Upload) {
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
    $scope.uploadPic = function(file) {
        file.upload = Upload.upload({
            url: '/api/user/upload-avatar',
            data: {avatar: file}
        });
        file.upload.then(function (response) {
            console.log(response);
        });
    }
}]);
