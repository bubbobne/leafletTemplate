// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'markers.api', 'templates', 'ngCordova', 'ngCordova', 'leaflet-directive'])

.run(["$ionicPlatform", "$rootScope", "$window", function ($ionicPlatform, $rootScope, $window) {
    //check if there is network connection
    $rootScope.online = navigator.onLine;
    $window.addEventListener("offline", function () {
        $rootScope.$apply(function () {
            $rootScope.online = false;
        });
    }, false);

    $window.addEventListener("online", function () {
        $rootScope.$apply(function () {
            $rootScope.online = true;
        });
    }, false);

    /*
    Add watcher for online state
    */
    //    $rootScope.$watch('online', function (newStatus) {
    //        console.log('online chenge! ' + $rootScope.online);
    //    });



    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
}])

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'menu.html',
            controller: 'AppCtrl'
        })
        .state('app.map', {
            url: '/map',
            views: {
                'menuContent': {
                    templateUrl: 'map.html',
                    controller: 'MapCtrl'
                }
            }
        });
    $urlRouterProvider.otherwise('/app/map');
}]);