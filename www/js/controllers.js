angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {
    })

    .controller('ChatsCtrl', function ($scope, Chats) {

        $scope.chats = Chats.all();
        /*
         $scope.remove = function(chat) {
         Chats.remove(chat);
         };
         */
    })
    .controller('TransferCtrl', function ($scope, Transfer) {
        var _this = this;
        Transfer.init();
        Transfer.getList(function(result){
            console.log(result);
            if(result == true){
                $scope.transfer = Transfer.all();
            }
        });
    })
    .controller('TransferDetailCtrl', function ($scope, $stateParams, Transfer) {
        $scope.transfer = Transfer.get($stateParams.transferId, function(item){
            if(item){
                console.log(item);
                $scope.transfer = item;
            }
        });
    })
    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
