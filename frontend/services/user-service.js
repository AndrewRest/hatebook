hateBook.factory('userService', ['$http', function ($http) {
    return {
        getEnemies: function () {
            return $http.get('api/enemies');
        },
        userAddPoo: function (id) {
            return $http.post('api/user/poo', id)
        },
        getOtherPage: function (id) {
            return $http.get('api/user/' +id)
        },
        getUser: function () {
            return $http.get('api/current-user');
        },
        getPosts: function (id) {
            return $http.get('/api/user/posts/' + id);
        },
        createPost: function (req) {
            return $http.post('api/post', req);
        },
        getNotEnemies:function(){
            return $http.get('/api/not-enemies')
        },
        updateInfo: function(data){
            return $http.put('/api/user/update-info', data)
        },
        logout: function(){
            return $http.get('/api/logout')
        },
        addToEnemies: function(id){
            return $http.get('/api/add-enemy/' + id);
        },
        likePost: function (req) {
            return $http.post('/api/post/poo', req);
        },
        getHatersCount: function (id) {
            return $http.get('/api/enemy-counter/'+ id);
        }
    };
}]);