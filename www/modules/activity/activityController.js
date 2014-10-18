main
.controller('ActivityCtrl', function($state, $scope, ActivityService) {
    if (getToken() == ""){
        $state.transitionTo('login'); 
    }
    
    //get datas from http request
	function getDatas(){
        console.log("Begin get data")
		ActivityService.get().then(function (data) {
            console.log("Get data success. Data is " + angular.toJson(data))
            $scope.activities = data.activity;
		},function(data){//go to error() in service
            $scope.errorMessage = data;
        });
	}
	
	getDatas();
});
