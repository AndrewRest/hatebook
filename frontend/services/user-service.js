hateBook.factory('userService',['$http', function ($http) {
    return {
       getEnemies: function(){
           return $http.get('api/enemies');
       }
    };
}]);