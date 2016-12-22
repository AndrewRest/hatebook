hateBook.controller('enemiesList',['$scope','userService', function($scope, userService){
    $scope.enemies =[];
        userService.getEnemies().then(function(data){
            $scope.enemies = data.data;
            console.log(data.data);
        },function(err){
            console.log(err);
        });
    $scope.getEnemies = function(id){
        $scope.addPoo = {userId:id};
        userService.userAddPoo($scope.addPoo).then(function(data){
            console.log(data)
        }, function(err){
            console.log(err)
        });
    };

}]);
