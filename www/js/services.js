angular.module('starter.services', [])
    .factory('Member', function ($http) {
        var server = "http://golfking.golftalk.co.kr/";
        var user = [];

        return {
            init : function() {
            },
            get : function() {
                var m = {"user_no" : 1, "user_name" : "테스트",
                "position" : [{"name" : "아일랜드CC", "id" : 1}, {"name" : "골프킹", "id" : 2}]};
                return m;
            }
        };
    })
    .factory('Transfer', function ($http) {
        var server = "http://golfking.golftalk.co.kr/";
        var fields = [];
        var transfer = [];

        return {
            init : function() {
                getfield = $http.get(server+"server/transfer/getfield?callback=get_CALLBACK");
                getfield.then(function(response){
                    //do something with response
                    fields = response.data;
                }).catch(function(response){
                    //handle the error
                });
            },
            getField: function(seq){
                return fields[seq];
            },
            getList: function(cb){
                var transferList = $http.get(server+"server/transfer/transfer_list?callback=get_CALLBACK");
                transferList.then(function(response){
                    //do something with response
                    transfer = response.data;
                    return cb(true);
                }).catch(function(response){
                    //handle the error
                    return cb(false);
                });
            },
            all: function () {
                return transfer;
            },
            get: function (transfer_Id, cb) {
                var transferItem = $http.get(server+"server/transfer/transfer_get?seqno=" + transfer_Id + "&callback=get_CALLBACK");
                transferItem.then(function(response){
                    //do something with response
                    transferItem = response.data;
                    return cb(transferItem);
                }).catch(function(response){
                    //handle the error
                    return cb(null);
                });
            },
            set: function (cb) {
                var params = get.stringify({position: $scope.position});
                var transferItem = $http.get(server+"server/transfer/transfer_get?callback=get_CALLBACK&param=" + params);
                transferItem.then(function(response){
                    //do something with response
                    transferItem = response.data;
                    return cb(transferItem);
                }).catch(function(response){
                    //handle the error
                    return cb(null);
                });
            }
        };
    })


    .factory('Join', function ($http) {
        var server = "http://golfking.golftalk.co.kr/";
        var fields = [];
        var join = [];

        return {
            init : function() {
                getfield = $http.get(server+"server/teejoin/getfield?callback=get_CALLBACK");
                getfield.then(function(response){
                    //do something with response
                    fields = response.data;
                }).catch(function(response){
                    //handle the error
                });
            },
            getField: function(seq){
                return fields[seq];
            },
            getList: function(cb){
                var joinList = $http.get(server+"server/teejoin/join_list?callback=get_CALLBACK");
                joinList.then(function(response){
                    //do something with response
                    join = response.data;
                    return cb(true);
                }).catch(function(response){
                    //handle the error
                    return cb(false);
                });
            },
            all: function () {
                return join;
            },
            get: function (join_Id, cb) {
                var joinItem = $http.get(server+"server/teejoin/join_get?seqno=" + join_Id + "&callback=get_CALLBACK");
                joinItem.then(function(response){
                    //do something with response
                    joinItem = response.data;
                    return cb(joinItem);
                }).catch(function(response){
                    //handle the error
                    return cb(null);
                });
            }
        };
    })