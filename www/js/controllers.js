angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {
    })
    .controller('TransferCtrl', function ($scope, Transfer) {
        var _this = this;
        Transfer.init();
        Transfer.getList(function(result){
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

    .controller('JoinCtrl', function ($scope, Join) {
        var _this = this;
        Join.init();
        Join.getList(function(result){
            console.log(result);
            if(result == true){
                $scope.join = Join.all();
                console.log($scope.Join);
            }
        });
    })
    .controller('JoinDetailCtrl', function ($scope, $stateParams, Join) {
        $scope.join = Join.get($stateParams.joinId, function(item){
            if(item){
                console.log(item);
                $scope.join = item;
            }
        });
    })
    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
