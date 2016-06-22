angular.module('starter.services', [])

    .factory('Transfer', function ($http) {
        var server = "http://golfking.golftalk.co.kr/";
        var fields = [];
        var transfer = [];

        return {
            init : function() {
                getfield = $http.jsonp(server+"server/transfer/getfield?callback=JSON_CALLBACK");
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
                var transferList = $http.jsonp(server+"server/transfer/transfer_list?callback=JSON_CALLBACK");
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
                var transferItem = $http.jsonp(server+"server/transfer/transfer_get?seqno=" + transfer_Id + "&callback=JSON_CALLBACK");
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
                getfield = $http.jsonp(server+"server/teejoin/getfield?callback=JSON_CALLBACK");
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
                var joinList = $http.jsonp(server+"server/teejoin/join_list?callback=JSON_CALLBACK");
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
                var joinItem = $http.jsonp(server+"server/teejoin/join_get?seqno=" + join_Id + "&callback=JSON_CALLBACK");
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