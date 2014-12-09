// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var login = angular.module('HCCBLogin', ['ionic']);
var main = angular.module('HCCBMain', ['ui.router', 'ionic']);

var HCCBApp = angular.module('HCCBApp', ['ionic', 'HCCBLogin', 'HCCBMain']);

HCCBApp.config(function ($httpProvider) {
    //Access-Control-Allow-Origin:*
    console.log("allow XDomain")
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

HCCBApp
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
            updateToken();
            console.log("platform ready")


        });
    });

main.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider


    .state('login', {
        url: "/login",
        //abstract: true,
        templateUrl: "modules/login/login_tmp.html",
        controller: "LoginCtrl"
    })
    // setup an abstract state for the tabs directive
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: "modules/main.html",
        controller: "AppCtrl"
    })

    .state('app.activity', {
        url: '/activity',
        views: {
            'app-activity': {
                templateUrl: 'modules/activity/activity_tmp.html',
                controller: 'ActivityCtrl'
            }
        }
    })

    .state('app.activity.addRecord', {
        url: '/addRecord',
        views: {
            'app-activity-addRecord': {
                templateUrl: 'modules/activity/addRecord_tmp.html',
                controller: 'ActivityCtrl'
            }
        }
    })

    .state('app.score', {
        url: '/score',
        views: {
            'app-score': {
                templateUrl: 'modules/score/score_tmp.html',
                controller: 'ScoreCtrl'
            }
        }
    })

    .state('app.account', {
        url: '/account',
        views: {
            'app-account': {
                templateUrl: 'modules/account/account_tmp.html',
                controller: 'AccountCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

})