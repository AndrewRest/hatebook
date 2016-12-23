hateBook.controller('enemiesList',['$scope','$rootScope','userService','$location','notify', function($scope, $rootScope, userService, $location, notify){

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
    $scope.backToYourPage = function(){
        $location.path('/user');
    };

    $scope.getAnotherUser = function(id){
        $rootScope.userId = id;
        userService.getOtherPage(id).then(function(data){
            $rootScope.anotherUserInfo = {};
            $rootScope.anotherUserInfo = data.data;
            $rootScope.anotherUserInfo.enemy = true;
            console.log(data);
            $location.path('/another-user');
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
        } else {
            notify({ message:'You dont have poo credits!', templateUrl:'bower_components/angular-notify/angular-notify.html', position: 'right', duration: 3000} );
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
