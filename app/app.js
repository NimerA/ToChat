'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
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
  'myApp.view1',
  'myApp.view2'
]);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);

app.controller('appController', ['$scope', function($scope) {
  console.log("hello");
}]);