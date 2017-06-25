'use strict';

angular.module('myApp.chat', ['ngRoute', 'ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.when('/chat', {
    templateUrl: 'chat/chat.html',
    controller: 'ChatCtrl as vm'
  });
}])

.controller('ChatCtrl', ['$scope','$mdSidenav',function($scope , $mdSidenav) {
  console.log("Chat");

   	$scope.openSideNavPanel = function() {
        $mdSidenav('left').open();
    };
    $scope.closeSideNavPanel = function() {
        $mdSidenav('left').close();
    };

}]);