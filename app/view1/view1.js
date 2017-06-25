'use strict';

angular.module('myApp.view1', ['ngRoute'])

.factory('socket', function (socketFactory) {
  var myIoSocket = io.connect('localhost:3002');
  var socket = socketFactory({
    ioSocket: myIoSocket
  });
  return socket;
})

.config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl as vm'
  });
}])

.controller('View1Ctrl', ['socket', function(socket) {
  console.log("Cont1");
}]);

