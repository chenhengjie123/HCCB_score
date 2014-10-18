HCCBApp
.controller('AppCtrl',function($scope){
    $scope.activityTitle = Resource.ActivityTitle;
    $scope.historyTitle = Resource.HistoryTitle;
    $scope.accountTitle = Resource.AccountTitle;
})
    /*
    var _listeners = {},
        //临时用于测试之用
        _b = true;
    
    function initController(){
        

        if (getCookie("token")==""){
        _listeners[EventType.LOGIN_SUCCESS] =  $scope.$on(EventType.LOGIN_SUCCESS,onLoginSuccess);
        console.log("init controller")
        console.log("_listeners: ")
        console.log(_listeners)
            setTimeout(function(){
                onDeviceReady();
            },500);
        }
        else{
            console.log(getCookie("token"))
            setTimeout(function(){
                $scope.addMainView();
            },500);
            deleteCookie("token")
        }
    }
    
    
    function onDeviceReady(){
        document.removeEventListener('deviceready', onDeviceReady);
        $scope.addLoginView();
        $scope.$emit(EventType.APP_INIT);
    }
    
    
    function removeListener(eType){
        if(eType){
            if(_listeners[eType]){
                _listeners[eType]();
            }
        }else{
            for(var i in _listeners){_listeners[i]();}
        }
    }
    
    
    function onLoginSuccess(e){
        console.log("onLoginSuccess")
        removeListener(EventType.LOGIN_SUCCESS);
        $scope.removeLoginView();
        $scope.addMainView();
    }
    
    initController();
    */

/*
.directive('appView',function($compile){
    
    var appView = {};
        
    
    appView.restrict = "EA";
    appView.replace = true;
    
    appView.template = "<div class='app row'></div>";
    
    appView.link = function(scope,element,attrs){
        
        scope.addLoginView = function(){
            
            var ele = angular.element('<login-view id="loginView" ng-controller="LoginCtrl"></login-view>'),
            compiled = $compile(ele),
            newScope = scope.$new(true);
            console.log("$compile(ele)")
            console.log(compiled)
            
            compiled = compiled(newScope);
            console.log("compiled(newScope)")
            console.log(compiled)
            element.append(compiled);
        };
        
        scope.removeLoginView = function(){
            var loginView = element.find('#loginView');
            console.log("loginView");
            console.log(loginView);
            if(!loginView) return;
            var loginScope = loginView.scope();
            console.log("loginScope");
            console.log(loginScope)
            if(!loginScope) return;
            loginScope.$destroy();
            console.log("removeLoginView")
        };
        
        scope.addMainView = function(){
            var ele = angular.element('<main-view id="mainView" ng-controller="mainCtrl"></main-view>'),
            compiled = $compile(ele),
            newScope = scope.$new(true);
            compiled = compiled(newScope);
            
            element.removeClass('row');
            element.removeClass('row-center');
            element.append(compiled);
            console.log("addMainView")

            
        };
    };
    
    return appView;
});
*/
