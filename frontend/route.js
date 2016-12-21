hateBook.config(['$routeProvider', function( $routeProvider) {

    $routeProvider.otherwise({redirectTo: '/login'});
    $routeProvider.when('/login/',{
        templateUrl:'/login/login.html',
        controller:'loginCtrl'
    })
        .when('/user/', {
            templateUrl:'/user/user.html',
            controller:'userCtrl'
        })


}]);