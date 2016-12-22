hateBook.factory('userService', ['$http', function ($http) {
    return {
        getEnemies: function () {
            return $http.get('api/enemies');
        },
        userAddPoo: function (id) {
            return $http.post('api/user/poo', id)
        },
        getOtherPage: function (id) {
            return $http.get('api/user/:id')
        },
        getUser: function () {
            return $http.get('api/current-user');
        },
        getPosts: function (id) {
            return $http.get('/api/user/posts/'+ id);
        }
    };
}]);