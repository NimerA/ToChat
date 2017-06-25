'use strict';

angular.module('myApp.friends', [])

.config(['$routeProvider',function($routeProvider) {
  $routeProvider.when('/friends', {
    templateUrl: 'friends/friends.html',
    controller: 'friendsCtrl as vm'
  });
}])

.controller('friendsCtrl', ['Client','LoopBackResource',function(Client, LoopBackResource) {
    
    var vm = this;
    vm.urlBase =  LoopBackResource.getUrlBase();
    
    Client.find().$promise.then(function(answer) {
        vm.friends = answer; 
    });;

    vm.menuItems = [
      { text: "Agregar Como Amigo", 
        disabled: true //No click event. Grayed out option. 
      },
      {
        text:"Ver Perfil", 
        disabled: false
      },
      {
        text:"Iniciar Chat Privado", 
        disabled: false
      }
    ];
    console.log("trigerred!");
}]);

