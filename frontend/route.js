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
    $routeProvider.when('/clean', {
        templateUrl:'/payment/cleanPoo.html',
        controller:'paymentCtrl'
    });
    $routeProvider.otherwise({redirectTo: '/login'});

}]);