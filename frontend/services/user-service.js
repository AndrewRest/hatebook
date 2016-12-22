hateBook.factory('userService',['$http', function ($http) {
    return {
        getEnemies: function () {
            return $http.get('api/enemies');
        },
        getNotEnemies: function(){
            return $http.get('api/not-enemies')
        },
        addToEnemies:function(id){
            return $http.get('api/add-enemy/' +id)
        },
        userAddPoo: function (id) {
            return $http.post('api/user/poo', id)
        },
        getOtherPage: function (id) {
            return $http.get('api/user/' +id)
        },
        getUser: function () {
            return $http.get('api/current-user');
        }
    };
}]);