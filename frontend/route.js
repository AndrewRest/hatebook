hateBook.config(['$routeProvider', function( $routeProvider) {


    $routeProvider.when('/login',{
        templateUrl:'/login/login.html',
        controller:'loginCtrl'
    })
    .when('/signup', {
            templateUrl:'/login/sign-up.html',
            controller:'signUpController'
        })
    .when('/user', {
        templateUrl:'/user/user.html',
        controller:'userCtrl'
    })
    .when('/enemies-list', {
        templateUrl:'/user/enemies-list.html',
        controller:'userCtrl'
    })
   .when('/clean', {
        templateUrl:'/payment/cleanPoo.html',
        controller:'paymentCtrl'
    })
        .when('/edit', {
            templateUrl:'/edit/edit.html',
            controller:'editCtrl'
        });
    $routeProvider.otherwise({redirectTo: '/login'});

}]);