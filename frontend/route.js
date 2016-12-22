hateBook.config(['$routeProvider', function ($routeProvider) {


    $routeProvider.when('/login', {
        templateUrl: '/login/login.html',
        controller: 'loginCtrl'
    })
        .when('/signup', {
            templateUrl: '/login/sign-up.html',
            controller: 'signUpController'
        })
        .when('/user', {
            templateUrl: '/user/user.html',
            controller: 'userCtrl'
        })
        .when('/enemies-list', {
            templateUrl: '/user/enemies-list.html',
            controller: 'enemiesList'
        })
        .when('/not-enemies', {
            templateUrl: '/user/not-enemies-list.html',
            controller: 'notEnamiesController'
        })
        .when('/clean', {
            templateUrl: '/payment/cleanPoo.html',
            controller: 'paymentCtrl'
        })
        .when('/edit', {
            templateUrl: '/edit/edit.html',
            controller: 'editCtrl'
        })
        .when('/buy', {
        templateUrl: '/payment/buyPoo.html',
        controller: 'paymentCtrl'
    });
    $routeProvider.otherwise({redirectTo: '/login'});

}]);