hateBook.config(['$routeProvider', function( $routeProvider) {


    $routeProvider.when('/login',{
        templateUrl:'/login/login.html',
        controller:'loginCtrl'
    });
    $routeProvider.when('/signup', {
            templateUrl:'/login/sign-up.html',
            controller:'signUpController'
        });
    $routeProvider.otherwise({redirectTo: '/login'});

}]);