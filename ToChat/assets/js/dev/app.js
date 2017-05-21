"use strict";
var app = angular.module( 'myapp', [ 'ngRoute', 'ngCookies', 'ngLoadScript'] ).controller('initCtr', function($scope, $http, config){
	$scope.title = config.title;
});
