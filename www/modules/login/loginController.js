login
    .controller('LoginCtrl', function ($scope, $location, $state) {
        $scope.loginButton = Resource.LoginButton;
        $scope.offlineButton = Resource.OfflineButton;
        $scope.loginTitle = Resource.LoginTitle;
        $scope.appName = Resource.AppName;

        $scope.userName = "test";
        $scope.password = "test";


        $scope.login = function () {
            console.log("username: " + $scope.userName);
            console.log("password: " + $scope.password);
            if ($scope.userName == 'test' && $scope.password == 'test') {
                addToken($scope.userName + $scope.password);
                console.info("Login success. UserName = " + $scope.userName);
                $state.transitionTo('app.score');
            };
        };

        $scope.offline = function () {
            addToken("offlineMode");
            console.log("Entry offline mode. ALl datas are come from fake datas");
            localStorage.setItem("userId", "123")
            Config.isOffline = true;
            $state.transitionTo('app.score');
        };

    })
/*
.directive('loginView',function($timeout){
    
    var loginView = {};
    
    loginView.restrict = "EA";
    loginView.replace = true;
    loginView.templateUrl = "modules/login/login_tmp.html";
    
    loginView.link = function(scope,element,attrs){
        scope.$on('$destroy',function(){
            element.remove();
        });
        
        scope.isLogging = function(flag){
            var btn = element.find('#loginBtn'),
                header = element.find('.header1');
            if(flag){
                header.html('Login');
                btn.attr('disabled','disabled');
            }else{
                btn.removeAttr('disabled')
            }
        };
        
        scope.loginFailed = function(errorMessage){
            var header = element.find('.header1');
            header.html('Login - ' + errorMessage);
            $timeout(function(){
                header.html('Login');
            },2000);
        }
    };
    
    return loginView;
    
});
*/