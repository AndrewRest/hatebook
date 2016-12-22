hateBook.factory('paymentService',['$http', function ($http) {
    return {
        cleanPoo: function(req){
            return $http.post('/api/cleanup', req);
        },
        buyPoo: function (req){
            return $http.post('api/user/buy-poo', req);
        }
    };
}]);