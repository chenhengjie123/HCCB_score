main
    .controller('ScoreCtrl', function ($state, $scope, ScoreService) {
        if (getToken() == "") {
            $state.transitionTo('login');
        };

        getScores()

        function getScores() {
            console.log("Begin get scores")
            ScoreService.getScores().then(function (data) {
                console.log("Get data success. Data is " + angular.toJson(data))
                $scope.scores = data.data;
            }, function (data) { //go to error() in service
                $scope.errorMessage = data;
            });
        }

    });