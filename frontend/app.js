'use strict';

angular.module('hatebook', [
    'ngRoute',
    'ngTouch',
    'ngSanitize',
    'ngMeta',
    'ui.bootstrap',
    'hatebook.login'
])
    .config(['$locationProvider', '$routeProvider', '$httpProvider', function($locationProvider, $routeProvider, $httpProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.otherwise({redirectTo: '/login'});

        $httpProvider.interceptors.push('myHttpInterceptor');

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }])

    .factory('myHttpInterceptor', ['$q', '$rootScope', '$injector', '$location',
        function($q, $rootScope, $injector, $location) {
            $rootScope.http = null;
            $rootScope.$watch(function(){
                $rootScope.currentPath = $location.path();
                return $location.path();
            }, function(){
                window.scrollTo(0,0);
            });

            return {
                'responseError': function(rejection) {
                    var defer = $q.defer();
                    /*if(rejection.status == 401){
                        switch($location.url()) {
                            case '/myTestCentre':
                                $location.path('login');
                                break;
                            case '/examinerPanel':
                                $location.path('examinerLogin');
                                break;
                            case '/administratorPanel':
                                $location.path('adminLogin');
                                break;
                        }
                    }*/
                    //$rootScope.$broadcast('handleError', rejection.status);
                    defer.reject(rejection);
                    return defer.promise;
                }
            }
        }
    ]);
