HCCBApp
    .controller('AppCtrl', function ($scope) {
        $scope.activityTitle = Resource.ActivityTitle;
        $scope.scoreTitle = Resource.ScoreTitle;
        $scope.accountTitle = Resource.AccountTitle;


        $scope.userId = localStorage.getItem("userId");
        $scope.token = localStorage.getItem("token");
    })