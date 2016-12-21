'use strict';
hateBook.controller('userCtrl', ['$scope', '$rootScope','userService',  function($scope, $rootScope,userService) {
    /*$('.dropdown-toggle').dropdown()*/
    console.log('user');
    userService.getUser().then(function(data) {
        console.log(data.data);
        
    })

}]);
