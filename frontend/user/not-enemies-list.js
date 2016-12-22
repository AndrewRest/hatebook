hateBook.controller('notEnamiesController',['$scope','userService','$location', function($scope, userService, $location){
    $scope.notEnemies =[];
    userService.getNotEnemies().then(function(data){
        $scope.notEnemies = data.data;
    },function(err){if(err.status == 401){
        $location.path('/login');
    }
        console.log(err);
    });

    $scope.toEdit = function() {
        $location.path('/edit');
    };

    $scope.getToEnemies = function(id){
        console.log('id', id);
        userService.addToEnemies(id).then(function(data){

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
