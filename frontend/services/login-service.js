hateBook.factory('loginService',['$http', function ($http) {
    return {
        logIn: function (user) {
            return $http.post('api/login',user);
        },
        signUp: function(user){
            return $http.post('api/signup',user);
        }
    };
}]);