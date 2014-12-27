login
    .controller('LoginCtrl', function ($scope, $location, $state, LoginService) {
        $scope.loginButton = Resource.LoginButton;
        $scope.offlineButton = Resource.OfflineButton;
        $scope.loginTitle = Resource.LoginTitle;
        $scope.appName = Resource.AppName;

        $scope.userName = "test";
        $scope.password = "test";


        $scope.login = function () {
            //console.log("username: " + $scope.userName);
            //console.log("password: " + $scope.password);
            console.log("Begin get data according to client_id=testclient")
            LoginService.get("testclient").then(function (data) {
                console.log("Get data success. Data is " + angular.toJson(data));
                token = data.access_token;
                addToken(token);
                console.info("Login success. token = " + data.access_token);
                $state.transitionTo('app.score');
            }, function (data) { //go to error() in service
                $scope.errorMessage = data;
            });


            //Oauth2.0
            //$auth.authenticate(provider);
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