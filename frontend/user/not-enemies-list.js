hateBook.controller('notEnamiesController',['$scope','userService','$window', function($scope, userService, $window){
    $scope.notEnemies =[];
    userService.getNotEnemies().then(function(data){
        $scope.notEnemies = data.data;
        console.log(data.data);
    },function(err){
        $window.location.href='/#/login';
        console.log(err);
    });
    $scope.getToEnemies = function(id){
        console.log('id', id);
        userService.addToEnemies(id).then(function(data){
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
