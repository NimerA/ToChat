'use strict';

angular.module('myApp.register', ['lbServices'])

.config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.when('/register', {
    templateUrl: 'auth/register/register.html',
    controller: 'registerCtrl as vm'
  });

}])

.controller('registerCtrl', ['Client','$location', function(Client, $location) {
    var vm = this;
    vm.register = register;

    function register()
    {
        console.log("Tried to Resgister");
        Client.create({ username: vm.form.username, email:vm.form.email , password: vm.form.password }, 
        function(res){
            console.log("Registered");
            $location.path('/login'); 
        },function(err){ console.error(err);}); 
    }
  
}]);