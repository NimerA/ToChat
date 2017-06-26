'use strict';

angular.module('myApp.chat', ['ngRoute', 'ngMaterial'])

.factory('socket', function (socketFactory) {
  var myIoSocket = io.connect('192.168.0.28:3002');
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
  vm.setSideView = setSideView;
  vm.urlBase =  LoopBackResource.getUrlBase();
  vm.messages = [];

  vm.upload = false;
  vm.download = downloadAttachment;

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

    if( vm.upload ){
      var file = vm.myFile;
      var reg = /^image\/[a-z]*$/;
      var regex = new RegExp(reg);

      console.log("Sending Message");
      
      var fd = new FormData();
      fd.append('file', file);
      
      $http.post(vm.urlBase + "/containers/files/upload", fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
      })
      .success(function( data ){
          var image = data.result.files.file[0]; //base file :v 
          // Message
          var message = {
              who    : 'user',
              message: vm.urlBase + "/containers/files/download/" + image.name,
              time   : new Date().toISOString(),
              isAttachment : true,
              isImage: regex.test(image.type)
          };

          // Add the message to the chat
          socket.emit('sendMessage',1,vm.current,message);
          // Update Contact's lastMessage
          //vm.contacts.getById(vm.chatContactId).lastMessage = message;

          // Reset the reply textarea
          vm.message = '';

      })
      .error(function( err ){
          console.log(err);
      });
      
      }else{

        console.log()
        socket.emit('sendMessage',1,vm.current,vm.message);
        vm.message = '';
      }
  };


  function downloadAttachment( url ) {
            // console.log(url);
            return url;
  }

  function logout(){};
  function setStatus(){};

  function setSideView(view){
    vm.leftSidenavView = view;
  }

}]);