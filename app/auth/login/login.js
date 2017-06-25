'use strict';

angular.module('myApp.login', ['lbServices'])

.config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.when('/login', {
    templateUrl: 'auth/login/login.html',
    controller: 'loginCtrl as vm'
  });

}])

.controller('loginCtrl', ['Client','$location', function(Client, $location) {
    var vm = this;
    vm.login = login;

    function login()
    {
        Client.login({email: vm.user.email,password: vm.user.password},
            function() {
                $location.path('/view1')
            }, function(res) {
                vm.error = res;
            }
        );
    }
  
}]);