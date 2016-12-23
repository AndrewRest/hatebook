hateBook.controller('notEnamiesController',['$scope','userService','$location', '$rootScope', function($scope, userService, $location, $rootScope){
    $scope.notEnemies =[];
    userService.getNotEnemies().then(function(data){
        $scope.notEnemies = data.data;
    },function(err){if(err.status == 401){
        $location.path('/login');
    }
        console.log(err);
    });

    $scope.backToYourPage = function(){
        $location.path('/user');
    };

    $scope.toEdit = function() {
        $location.path('/edit');
    };

    $scope.getToEnemies = function(enemy){
        console.log('id', enemy._id);
        userService.addEnemy(enemy._id).then(function(data){
            enemy.enemy = true;
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
    };

    $scope.goToUserPage = function(user){
        userService.getOtherPage(user._id).then(function(data){
            $rootScope.userId = data.data._id;
                console.log(data);
            $location.path('/another-user');
            }, function(err){
                console.log(err)
            }
        )
    };
}]);
