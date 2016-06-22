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
    .factory('Chats', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var chats = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'img/ben.png'
        }, {
            id: 1,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'img/max.png'
        }, {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: 'I should buy a boat',
            face: 'img/adam.jpg'
        }, {
            id: 3,
            name: 'Perry Governor',
            lastText: 'Look at my mukluks!',
            face: 'img/perry.png'
        }, {
            id: 4,
            name: 'Mike Harrington',
            lastText: 'This is wicked good ice cream.',
            face: 'img/mike.png'
        }];

        return {
            all: function () {
                return chats;
            },
            remove: function (chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function (chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    });
