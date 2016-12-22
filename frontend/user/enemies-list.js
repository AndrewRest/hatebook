hateBook.controller('enemiesList',['$scope','userService','$location', function($scope, userService, $location){
    $scope.enemies =[];
        userService.getEnemies().then(function(data){
            $scope.enemies = data.data;
            console.log(data.data);
        },function(err){
            $location.path('/login');
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
    $scope.logout = function(){
        userService.logout().then(function(){
            $location.path('/login')
        }, function(err){
            console.log(err)
        })
    }

}]);
