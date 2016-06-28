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
    .controller('TransferCreateCtrl', function ($scope, $location, Transfer, Member) {
        $scope.user  = Member.get();
        $scope.submit = function(){
            Transfer.set($scope.user, function(){
                $location.path('#/tab/transfer/');
            });
        };
        $scope.goback = function(){
                $location.path('tab/transfer');
        };
    })

    .controller('DashTransferCtrl', function ($scope, $location, Transfer, Member) {
        $scope.user  = Member.get();
        $scope.count_view = Transfer.view(function(v){
            var html = '<div class="row header">';
            for (key in v) {
                html += '<div class="col-head">' + key + '</div>';
                for(i=0; i<7; i++){
                    if(!v[key][i]) v[key][i] = 0;
                }
            }
            html += '</div>';

            for(i=0; i<7; i++) {
                html += '<div class="row">';
                for (key in v) {
                    html += '<div class="col-demo"><a href="#/tab/transfer/list">' + v[key][i] + '</a></div>';
                }
                html += '</div>';
            }
            $scope.html = html;
        })
    })
    
    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
