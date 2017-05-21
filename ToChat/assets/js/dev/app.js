"use strict";
var app = angular.module( 'myapp', [ 'ngRoute', 'ngCookies', 'ngLoadScript'] ).controller('initCtr', function($scope, $http, config, $location){
	$scope.title = config.title;
	$scope.login = {
		"email": "",
		"password": ""
	}

	$scope.fnlogin = function(){
		if( $scope.login.email.length == 0 || $scope.login.password.length == 0 ){
			Materialize.toast( "You can't have blank fields.", 4000 );
			return;
		}

		$http.post( '/users/login', $scope.login, {} )
		.then( function( e ){
			console.log();
			Materialize.toast( e.data.message, 4000 );

			$scope.login.email = "";
			$scope.login.password = "";
			$( '#modal1' ).modal( 'close' );

		}, function( err ){
			Materialize.toast( 'Error', 4000 );
		})

		$location.path( "/" );
	}
});
