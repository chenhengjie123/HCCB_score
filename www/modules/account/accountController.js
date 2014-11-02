main
    .controller('AccountCtrl', function ($state, $scope, $ionicPopup, AccountService) {
        if (getToken() == "") {
            $state.transitionTo('login');
        }
        $scope.title = Resource.AccountTitle
        $scope.logoutBtn = Resource.LogoutButton;
        $scope.mobileText = Resource.MobileText;
        $scope.nicknameText = Resource.NicknameText;

        $scope.logout = function () {
            console.log("user logout")
            deleteToken();
            $state.transitionTo("login")
        };

        $scope.changeMobile = function () {

            changeInfo("Mobile", $scope.userInfo.mobile);
            // TODO: Send new value to server
        };

        $scope.changeNickname = function () {
            changeInfo("Nickname", $scope.userInfo.nickname);
            // TODO: Send new value to server
        };

        getUserInfo();

        function changeInfo(title, originalValue) {
            console.log("change " + title + ", originalValue: " + originalValue)
            $scope.data = {}
            $scope.data.value = originalValue

            // An elaborate, custom popup
            var changeInfoPopup = $ionicPopup.show({
                template: '<div class="item item-input"><input type="text" ng-model="data.value"></div>',
                title: title,
                subtitle: "Please input something",
                scope: $scope,
                buttons: [
                    {
                        text: 'Cancel'
                    },
                    {
                        text: '<b>Save</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            if (!$scope.data.value) {
                                e.preventDefault();
                            } else {
                                console.log("change " + title + ", newValue: " + $scope.data.value)
                                return $scope.data.value
                            }
                        }
              },
            ]
            });
            changeInfoPopup.then(function (res) {
                //res is return value of changeInfoPopup
                console.log('Tapped!', res);
            });
        };




        function getUserInfo() {
            console.log("Begin get user info")
            AccountService.getUserInfo().then(function (data) {
                console.log("Get data success. Data is " + angular.toJson(data))
                $scope.userInfo = data;
            }, function (data) { //go to error() in service
                $scope.errorMessage = data;
            });
        }


    });