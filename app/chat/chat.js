'use strict';

angular.module('myApp.chat', ['ngRoute', 'ngMaterial'])

  .factory('socket', function (socketFactory) {
    var myIoSocket = io.connect('192.168.0.28:3002');
    var socket = socketFactory({
      ioSocket: myIoSocket
    });
    return socket;
  })
  .config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/chat', {
      templateUrl: 'chat/chat.html',
      controller: 'ChatCtrl as vm'
    });
  }])

  .controller('ChatCtrl', ['$scope', '$mdSidenav', 'Client', 'LoopBackResource', 'socket', '$http', 'Chatroom', 'Message', '$location',
    function ($scope, $mdSidenav, Client, LoopBackResource, socket, $http, Chatroom, Message, $location) {

      var vm = this;
      var originatorEv;

      //******** INIT *********
      vm.leftSidenavView = 'chats';
      vm.currentChat = 0;

      // ****** METHODS *******
      vm.setSideView = setSideView;
      vm.sendMessage = sendMessage;
      vm.upload = upload;
      vm.getChat = getChat;
      vm.openMenu = openMenu;
      vm.logout = logout;

      // ******* DATA **********
      vm.urlBase = LoopBackResource.getUrlBase(); //Gets the host address
      Client.getCurrent(null, function (res) {
        vm.current = res;
        Chatroom.find({
          "filter": {
            include: {
              relation: "client",
              scope: {
                where: {
                  "Client_id": res.id
                }
              }
            }
          }
        }, function (res) {
          vm.chats = res;
        }, function (err) {
          console.error(err);
        });
      }, function (err) {
        console.error(err);
      });

      Client.find({
        filter: {
          where: {
            "status": "online"
          }
        }
      }).$promise.then(function (answer) {
        vm.contacts = answer;
      });


      function getChat(id) {
        //Get All Participants
        vm.currentChat = id;
        //Get All Messages
        Chatroom.find({
          "filter": {
            where: {
              id: id
            },
            include: {
              relation: "messages",
              scope: {
                include: {
                  relation: "client"
                }
              }
            }
          }
        }, function (res) {
          //Load Chat to View
          vm.messages = res[0].messages;
          socket.emit('join', id, vm.current);
        }, function (err) {
          console.error(err);
        });
      }


      /* Listen for Incoming Messages */
      socket.on('message', function (msg) {
        vm.messages.push(msg.message);
      });


      //Uploads a value to server api, returns if sucessful or not
      function upload(files, file, event) {
        if (!vm.currentChat == 0) {
          var fd = new FormData();
          fd.append('file', file);
          var reg = /^image\/[a-z]*$/;
          var regex = new RegExp(reg);
          $http.post(vm.urlBase + "/containers/files/upload", fd, {
            transformRequest: angular.identity,
            headers: {
              'Content-Type': undefined
            }
          }).then(function successCallback(res) {
            //Build Message
            var message = {
              client: vm.current,
              text: "Uploaded " + file.name,
              time: new Date().toISOString(),
              media_url: "string",
              media_name: file.name,
              media_type: regex.test(file.type),
              media_size: file.size,
              clientId: vm.current.id,
              chatroomId: vm.currentChat
            }
            //save Message
            Message.create(message,
              function (res) {
                //Emit Message
                socket.emit('sendMessage', vm.currentChat, vm.current, message);
              },
              function (err) {
                console.error(err);
              });

          }, function errorCallback(err) {
            console.error(err);
          });
        } else {
          console.log("Join a Chat First");
        }
      }

      //Return all the members of the chat
      function getChatUsers(ChatID, cb) {

      }



      //return all the friends of the current user
      function getAllFriends(UserId, cb) {

      }

      function sendMessage() {
        if (!vm.currentChat == 0) {
          //Build The Message
          var message = {
            client: vm.current,
            text: vm.message,
            time: new Date().toISOString(),
            clientId: vm.current.id,
            chatroomId: vm.currentChat
          }
          //SAVE MESSAGE
          Message.create(message,
            function (res) {
              //Notify other usera about message
              socket.emit('sendMessage', vm.currentChat, vm.current, message);
              //Clear the Input
              vm.message = '';
            },
            function (err) {
              console.error(err);
            });

        } else {
          console.log("Join a Chat First");
          vm.message = '';
        }
      }

      function logout() {
        Client.updateAttributes({id: vm.current.id },{status: "offline"},
          function (res) {
              Client.logout();
              $location.path('/login');
          },
          function (err) {
            console.error(err);
          })
      }

      //Chnages the content of the Partial view
      function setSideView(view) {
        vm.leftSidenavView = view;
      }

      function openMenu($mdMenu, ev) {
        originatorEv = ev;
        $mdMenu.open(ev);
      };

    }
  ]);