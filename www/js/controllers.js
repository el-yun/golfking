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
        $scope.options = {
            loop: false,
            effect: 'fade',
            speed: 500,
        }

        $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
            // data.slider is the instance of Swiper
            $scope.slider = data.slider;
        });

        $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
            console.log('Slide change is beginning');
        });

        $scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
            // note: the indexes are 0-based
            $scope.activeIndex = data.slider.activeIndex;
            $scope.previousIndex = data.slider.previousIndex;
        });
    })
    
    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
