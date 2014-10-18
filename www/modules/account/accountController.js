main
.controller('AccountCtrl', function($state, $scope, AccountService) {
    if (getToken() == ""){
        $state.transitionTo('login'); 
    }
    $scope.title = Resource.AccountTitle
    
    $scope.logout = function(){
        deleteToken();
        $state.transitionTo("login")
    }
    
    $scope.logoutBtn = Resource.LogoutButton;
    
    
    
    
});
