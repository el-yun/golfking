angular.module('starter.controllers', [])

    .controller('LoginCtrl', function ($scope, $state) {
        $scope.login = function(){
            $state.go('tab.dash-transfer');
        };
        $scope.join = function(){
            $state.go('load-member');
        };
    })


    .controller('MemberCtrl', function ($scope, Member) {
		$scope.user  = {'user_id': '', 'user_password' : '', 'user_name' : '' };
        $scope.submit = function(){		
			var params = {'user_id': $scope.user.user_id, 'user_password' : $scope.user.user_password, 'user_name' : $scope.user.name };
			console.log(params);
			Member.set(params, function(result){
				console.log(result);
			});
        };
        $scope.goback = function(){
                $state.go("load");
        };
    })


    .controller('TransferCtrl', function ($scope, $stateParams, Transfer) {
        var params = {'transferDate': $stateParams.tdate, 'area' : $stateParams.area };
        var _this = this;
        Transfer.init();
        Transfer.getList(params, function(result){
            if(result == true){
                $scope.transfer = Transfer.all();
            }
        });
    })

    .controller('JoinCtrl', function ($scope, $stateParams, Join) {
        var params = {'joinDate': $stateParams.tdate, 'area' : $stateParams.area };
        var _this = this;
        Join.init();
        Join.getList(params, function(result){
            console.log(result);
            if(result == true){
                $scope.join = Join.all();
                console.log($scope.Join);
            }
        });
    })

    .controller('TransferCreateCtrl', function ($scope, $state, Transfer, Member) {
        $scope.user  = Member.get();
        $scope.submit = function(){
            Transfer.set($scope.user, function(){
                $state.go("tab.dash-transfer");
            });
        };
        $scope.goback = function(){
            $state.go("tab.dash-transfer");
        };
    })

    .controller('JoinCreateCtrl', function ($scope, $state, Join, Member) {
        $scope.user  = Member.get();
        $scope.submit = function(){
            Join.set($scope.user, function(){
                $state.go("tab.dash-join");
            });
        };
        $scope.goback = function(){
                $state.go("tab.dash-join");
        };
    })

    .controller('DashTransferCtrl', function ($scope, $location, Transfer, Member) {
        $scope.user  = Member.get();
        $scope.count_view = Transfer.view(function(v){
            var html = '<div class="row header">';
            for (key in v) {
                var d = new Date(key);
                var day = d.getMonth() + '/' +d.getDate();
                html += '<div class="col-head">' + day + '</div>';
                for(i=0; i<7; i++){
                    if(!v[key][i]) v[key][i] = 0;
                }
            }
            html += '</div>';

            for(i=0; i<7; i++) {
                html += '<div class="row">';
                for (key in v) {
                    html += '<div class="col-demo"><a href="#/tab/transfer/list/' + i + '/' + key + '">' + v[key][i] + '</a></div>';
                }
                html += '</div>';
            }
            $scope.html = html;
        })
    })

    .controller('DashJoinCtrl', function ($scope, $location, Join, Member) {
        $scope.user  = Member.get();
        $scope.count_view = Join.view(function(v){
            var html = '<div class="row header">';
            for (key in v) {
                var d = new Date(key);
                var day = d.getMonth() + '/' +d.getDate();
                html += '<div class="col-head">' + day + '</div>';
                for(i=0; i<7; i++){
                    if(!v[key][i]) v[key][i] = 0;
                }
            }
            html += '</div>';

            for(i=0; i<7; i++) {
                html += '<div class="row">';
                for (key in v) {
                    html += '<div class="col-demo"><a href="#/tab/teejoin/list/' + i + '/' + key + '">' + v[key][i] + '</a></div>';
                }
                html += '</div>';
            }
            $scope.html = html;
        })
    })


    .controller('JoinDetailCtrl', function ($scope, $stateParams, $cordovaSms, Join, Member) {
        var options = {
            replaceLineBreaks: true, // true to replace \n by a new line, false by default
            android: {
                intent: 'INTENT'  // send SMS with the native android SMS messaging
                //intent: '' // send SMS without open any other app
            }
        };
        var join = null;

        $scope.sendSMS = function(position){
            //$scope.transfer();
            var user  = Member.get();
            var msg = '[골프킹 양도요청] ' + user.user_name + ' \n티업시간: ' + join.join_date + '\n골프장: ' + position;
            console.log(msg);
            document.addEventListener("deviceready", function () {
                $cordovaSms
                    .send(user.user_hp, msg, options)
                    .then(function () {
                        // Success! SMS was sent
                        console.log(msg);
                    }, function (error) {
                        // An error occurred
                    });
            });
        };

        $scope.join = Join.get($stateParams.joinId, function(item){
            if(item){
                join = item;
                $scope.join = item;
                $scope.area = item.area[item.join_deposit];
            }
        });
    })


    .controller('TransferDetailCtrl', function ($scope, $stateParams, $cordovaSms, Transfer, Member) {
        var options = {
            replaceLineBreaks: true, // true to replace \n by a new line, false by default
            android: {
                intent: 'INTENT'  // send SMS with the native android SMS messaging
                //intent: '' // send SMS without open any other app
            }
        };
        var transfer = null;

        $scope.sendSMS = function(position){
            //$scope.transfer();
            var user  = Member.get();
            var msg = '[골프킹 양도요청] ' + user.user_name + ' \n티업시간: ' + transfer.transfer_date + '\n골프장: ' + position;
            console.log(msg);
            document.addEventListener("deviceready", function () {
                $cordovaSms
                    .send(user.user_hp, msg, options)
                    .then(function () {
                        // Success! SMS was sent
                        console.log(msg);
                    }, function (error) {
                        // An error occurred
                    });
            });
        };
        $scope.transfer = Transfer.get($stateParams.transferId, function(item){
            if(item){
                transfer = item;
                $scope.transfer = item;
                $scope.area = item.area[item.transfer_deposit];
            }
        });
    })

