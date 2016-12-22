hateBook.controller('enemiesList',['$scope','$rootScope','userService','$location', function($scope, $rootScope, userService, $location){

    $scope.enemies = [];
    userService.getEnemies().then(function (data) {
        $scope.enemies = data.data;
    }, function (err) {
        if (err.status == 401) {
            $location.path('/login');
        }
        console.log(err);
    });
    userService.getUser().then(function (result) {
        $scope.loggedInUser = result.data;
    }, function (err) {
        if (err.status == 401) {
            $location.path('/login');
        }
        console.log(err);
    });

    $scope.toEdit = function() {
        $location.path('/edit');
    };

    $scope.getAnotherUser = function(id){
        userService.getOtherPage(id).then(function(data){
            $rootScope.anotherUserInfo = {};
            $rootScope.anotherUserInfo = data.data;
            $rootScope.anotherUserInfo.enemy = true;
            console.log(data);
            $location.path('/user');
            }, function(err){
                console.log(err)
            }
        )
    };
    $scope.getEnemies = function (enemy) {
        if ($scope.loggedInUser.pooCredits > 0) {
            var req = {userId: enemy._id};
            userService.userAddPoo(req).then(function () {
                enemy.pooCount += 1;
                $scope.loggedInUser.pooCredits -= 1;
            }, function (err) {
                console.log(err)
            });
        }
    };
    $scope.logout = function(){
        userService.logout().then(function(){
            $location.path('/login')
        }, function(err){
            console.log(err)
        })
    }

}]);
