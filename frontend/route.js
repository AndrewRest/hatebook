hateBook.config(['$routeProvider', function( $routeProvider) {


    $routeProvider.when('/login',{
        templateUrl:'/login/login.html',
        controller:'loginCtrl'
    });
    $routeProvider.when('/signup', {
            templateUrl:'/login/sign-up.html',
            controller:'signUpController'
        });
    $routeProvider.when('/user', {
        templateUrl:'/user/user.html',
        controller:'userCtrl'
    });
    $routeProvider.when('/enemies-list', {
        templateUrl:'/user/enemies-list.html',
        controller:'userCtrl'
    });
    $routeProvider.otherwise({redirectTo: '/login'});

}]);