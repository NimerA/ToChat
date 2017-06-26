'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRightClick',
  'ngRoute',
  'ngResource',
  'ngAnimate',
  'ngAria',
  'ngMessages',
  'ngRoute',
  'ngMaterial',
  'ui.router',
  'lbServices',
  'btford.socket-io',
  'ngFileUpload',
  //VIEWS 
  'myApp.login',
  'myApp.register',
  'myApp.chat'
]);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/login'});
}]);


app.controller('appController', ['$scope', function($scope) {
  console.log("hello");
}]);
