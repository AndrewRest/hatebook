hateBook.controller('enemiesList',['$scope','$rootScope','userService','$location', function($scope, $rootScope, userService, $location){

    $scope.enemies =[];
        userService.getEnemies().then(function(data){
            $scope.enemies = data.data;
        },function(err){
            if(err.status == 401){
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
    $scope.getEnemies = function(id){
        $scope.addPoo = {userId:id};
        userService.userAddPoo($scope.addPoo).then(function(data){
        }, function(err){
            console.log(err)
        });
    };
    $scope.logout = function(){
        userService.logout().then(function(){
            $location.path('/login')
        }, function(err){
            console.log(err)
        })
    }

}]);
