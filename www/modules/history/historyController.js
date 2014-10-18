main
.controller('HistoryCtrl', function($state, $scope) {
    if (getToken() == ""){
        $state.transitionTo('login'); 
    }
});