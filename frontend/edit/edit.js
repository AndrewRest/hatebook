'use strict';
hateBook.controller('editCtrl', ['$scope', '$rootScope','userService', '$location','Upload', function($scope, $rootScope, userService, $location, Upload) {
    userService.getUser().then(function(data){
        $scope.userInfo = data.data;
        console.log(data);
    },function(err){
        if(err.status == 401){
            $location.path('/login');
        }
        console.log(err);
    });

    $scope.editUserInfo = function(){
        var req = {
            userId:$scope.userInfo._id,
            username:$scope.userInfo.username,
            hateMovies:$scope.userInfo.hateMovies,
            hateBooks:$scope.userInfo.hateBooks,
            iHate: $scope.userInfo.iHate
        };
        userService.updateInfo(req).then(function(data){
            console.log(data);
            $location.path('/user');
        },function(err){
            console.log(err)
        })
    };
    $scope.uploadPic = function(file) {
        if(file){
            file.upload = Upload.upload({
                url: '/api/user/upload-avatar',
                data: {avatar: file}
            });
            file.upload.then(function (response) {
                console.log(response);
            });
        }
    }
}]);
