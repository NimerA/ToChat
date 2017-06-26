'use strict';

angular.module('myApp.login', ['lbServices'])

    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/login', {
            templateUrl: 'auth/login/login.html',
            controller: 'loginCtrl as vm'
        });

    }])

    .controller('loginCtrl', ['Client', '$location', function (Client, $location) {
        var vm = this;
        vm.login = login;

        function login() {
            Client.login({
                    email: vm.user.email,
                    password: vm.user.password
                },
                function (res) {
                    Client.updateAttributes({
                            id: res.userId
                        }, {
                            status: "online"
                        },
                        function (res) {
                            $location.path('/chat')
                        },
                        function (err) {
                            console.error(err);
                        })

                },
                function (res) {
                    vm.error = res;
                    console.error(res);
                }
            );
        }

    }]);