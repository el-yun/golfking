angular.module('starter.services', [])
    .factory('Member', function ($http) {
        var server = "http://golfking.golftalk.co.kr/";
        var user = [];

        return {
            init : function() {
            },
            get : function() {
                var m = {"user_no" : 1, "user_name" : "테스트", "user_hp" : '01026257566',
                "position" : [{"name" : "아일랜드CC", "id" : 1}, {"name" : "골프킹", "id" : 2}]};
                return m;
            },
			logged: function(user, cb){
                if(typeof user.user_id == 'undefined') alert('아이디를 정확하게 입력해주세요.(4자 이상)');
                else if(typeof user.user_password == 'undefined') alert('비밀번호를 정확하게 입력해주세요.(7자 이상)');                
				else {
                    $http({
                        method: 'POST' ,
                        url: server+"server/member/logged",
                        data: user,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        }
                    }).success(function(response) {
                        return cb(response);
                    }).finally(function(response) {
                        console.log('Complete');
                    });
                }
			},
            set: function (user, cb) {
                console.log(user);
                if(typeof user.user_id == 'undefined') alert('아이디를 정확하게 입력해주세요.(4자 이상)');
                else if(typeof user.user_password == 'undefined') alert('비밀번호를 정확하게 입력해주세요.(7자 이상)');
                else if(typeof user.user_name == 'undefined') alert('이름을 정확하게 입력해주세요');
                else {
                    $http({
                        method: 'POST' ,
                        url: server+"server/member/addMember",
                        data: user,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        }
                    }).success(function(response) {
                        alert("등록되었습니다.");
                    }).finally(function(response) {
                        console.log('Complete');
                        cb(response);
                    });
                }
            }
        };
    })
    .factory('Transfer', function ($http) {
        var server = "http://golfking.golftalk.co.kr/";
        var fields = [];
        var transfer = [];
        var area = ['경기북부','경기남부','충청','강원','전라','경상','제주'];

        return {
            init : function() {
                getfield = $http.get(server+"server/transfer/getfield");
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
            getList: function(params, cb){
                var transferList = $http.get(server+"server/transfer/transfer_list/", {params: params});
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
                var transferItem = $http.get(server+"server/transfer/transfer_get?seqno=" + transfer_Id );
                transferItem.then(function(response){
                    //do something with response
                    transferItem = response.data;
                    transferItem.area = area;
                    return cb(transferItem);
                }).catch(function(response){
                    //handle the error
                    return cb(null);
                });
            },
            set: function (user, cb) {
                console.log(user);
                if(typeof user.price == 'undefined') alert('그린피 금액을 정확하게 입력하세요');
                else if(typeof user.transfer_date == 'undefined') alert('티업시간을 입력하세요');
                else if(typeof user.hole == 'undefined') alert('홀을 선택하세요');
                else if(typeof user.area == 'undefined') alert('지역을 선택하세요');
                else if(typeof user.position == 'undefined') alert('골프장을 선택하세요');
                else {
                    $http({
                        method: 'POST' ,
                        url: server+"server/transfer/transfer_put",
                        data: user,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        }
                    }).success(function(response) {
                        alert("양도 글이 등록되었습니다.");
                    }).finally(function() {
                        console.log('Complete');
                        cb(true);
                    });
                }
            },
            view : function (cb){
                var transferView = $http.get(server+"server/transfer/transfer_count_list");
                transferView.then(function(response){
                    //do something with response
                    View = response.data;
                    return cb(View);
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
        var area = ['경기북부','경기남부','충청','강원','전라','경상','제주'];
        return {
            init : function() {
                getfield = $http.get(server+"server/teejoin/getfield");
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
            getList: function(params, cb){
                var joinList = $http.get(server+"server/teejoin/join_list", {params: params});
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
                var joinItem = $http.get(server+"server/teejoin/join_get?seqno=" + join_Id);
                joinItem.then(function(response){
                    //do something with response
                    joinItem = response.data;
                    joinItem.area = area;
                    return cb(joinItem);
                }).catch(function(response){
                    //handle the error
                    return cb(null);
                });
            },
            set: function (user, cb) {
                console.log(user);
                if(typeof user.price == 'undefined') alert('그린피 금액을 정확하게 입력하세요');
                else if(typeof user.join_date == 'undefined') alert('티업시간을 입력하세요');
                else if(typeof user.hole == 'undefined') alert('홀을 선택하세요');
                else if(typeof user.area == 'undefined') alert('지역을 선택하세요');
                else if(typeof user.position == 'undefined') alert('골프장을 선택하세요');
                else {
                    $http({
                        method: 'POST' ,
                        url: server+"server/teejoin/join_put",
                        data: user,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        }
                    }).success(function(response) {
                        alert("조인 글이 등록되었습니다.");
                    }).finally(function() {
                        console.log('Complete');
                        cb(true);
                    });
                }
            },
            view : function (cb){
                var transferView = $http.get(server+"server/teejoin/join_count_list");
                transferView.then(function(response){
                    //do something with response
                    View = response.data;
                    return cb(View);
                }).catch(function(response){
                    //handle the error
                    return cb(null);
                });

            }
        };
    })