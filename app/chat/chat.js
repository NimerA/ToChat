'use strict';

angular.module('myApp.chat', ['ngRoute', 'ngMaterial'])

.factory('socket', function (socketFactory) {
  var myIoSocket = io.connect('localhost:3002');
  var socket = socketFactory({
    ioSocket: myIoSocket
  });
  return socket;
})


.config(['$routeProvider',function($routeProvider) {
  
  $routeProvider.when('/chat', {
    templateUrl: 'chat/chat.html',
    controller: 'ChatCtrl as vm',
    resolve: {
      currentUser: function (Client) {
        return Client.getCurrent();
      }
    }
  });
}])

.controller('ChatCtrl', ['$scope','$mdSidenav','Client','LoopBackResource', 'socket',
  function($scope , $mdSidenav, Client, LoopBackResource, socket, currentUser) {

  var vm = this;
  vm.current = Client.getCurrent();
  vm.leftSidenavView = false;
  vm.leftSidenavView = 'friends';
  vm.setSideView = setSideView;
  vm.urlBase =  LoopBackResource.getUrlBase();
  vm.messages = [];

  socket.on('message', function(msg){
    console.log('socket.message', msg);
    vm.messages.push(msg);
  });
  

  console.log(vm.current);

  vm.sendMessage = sendMessage;
  Client.find().$promise.then(function(answer) {
    vm.friends = answer; 
  });



  socket.emit('join', 1,vm.current);

  function getChat(){};
  function getChatUsers(){};
  function getChatMessages(){};

  function getAllClients(){};
  function getAllFriend(){};

  function sendMessage(){
    console.log()
    socket.emit('sendMessage',1,vm.current,vm.message);
  };
  function logout(){};
  function setStatus(){};

  function setSideView(view){
    vm.leftSidenavView = "friends";
  }

}]);