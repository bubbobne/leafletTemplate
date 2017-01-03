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

angular.module('markers.api', ['base64']).factory('markersApi', ['$http', '$q', '$base64', function ($http, $q, $base64) {

    var endpoint = "";
    var markersApi = {};
    /**
     * Get all measurements.
     *
     * @returns {unresolved}
     */
    markersApi.getPoints = function () {
        var deferred = $q.defer();
        //        $http.get(endpoint, {
        //                headers: {
        //                    'Authorization': " Basic " + $base64.encode(username + ":" + pwd)
        //                }
        //            }).success(function (data) {
        //                deferred.resolve(data);
        //            })
        //            .error(function (reason) {
        //                deferred.reject(reason);
        //            });


        var data = [{
            "type": "Feature",
            "properties": {
                "name": "Feature1",
            },
            "geometry": {
                "type": "Point",
                "coordinates": [10.0, 44.0]
            }
        }, {
            "type": "Feature",
            "properties": {
                "name": "Feature2",
            },
            "geometry": {
                "type": "Point",
                "coordinates": [12, 46]
            }
        }, {
            "type": "Feature",
            "properties": {
                "name": "Feature3",
            },
            "geometry": {
                "type": "Point",
                "coordinates": [9, 45]
            }
        }];
        deferred.resolve(data);
        return deferred.promise;
    };

    return markersApi;
                            }]);
angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('layerModal.html','<ion-modal-view class="modal-layer">\n    <ion-content style="font-size:10px">\n\n        {{feature.properties.name}}\n    </ion-content>\n</ion-modal-view>');
$templateCache.put('login.html','<ion-modal-view>\n  <ion-header-bar>\n    <h1 class="title">Login</h1>\n    <div class="buttons">\n      <button class="button button-clear" ng-click="closeLogin()">Close</button>\n    </div>\n  </ion-header-bar>\n  <ion-content>\n    <form ng-submit="doLogin()">\n      <div class="list">\n        <label class="item item-input">\n          <span class="input-label">Username</span>\n          <input type="text" ng-model="loginData.username">\n        </label>\n        <label class="item item-input">\n          <span class="input-label">Password</span>\n          <input type="password" ng-model="loginData.password">\n        </label>\n        <label class="item">\n          <button class="button button-block button-positive" type="submit">Log in</button>\n        </label>\n      </div>\n    </form>\n  </ion-content>\n</ion-modal-view>\n');
$templateCache.put('map.html','<ion-view view-title="Map">\n    <ion-content>\n        <ion-content scroll="false">\n            <leaflet data-tap-disabled="true" id="map" lf-center="map.center" defaults=\'map.defaults\' layers="map.layers"></leaflet>\n\n            <button class="button button-float" ng-click="centerPosition()">\n                <i class="icon ion-android-locate"></i>\n            </button>\n            <div ng-if="!online">\n                <h2>network problem</h2></div>\n        </ion-content>\n    </ion-content>\n</ion-view>');
$templateCache.put('menu.html','<ion-side-menus enable-menu-with-back-views="false">\n    <ion-side-menu-content>\n        <ion-nav-bar class="bar-stable">\n            <ion-nav-back-button>\n            </ion-nav-back-button>\n\n            <ion-nav-buttons side="left">\n                <button class="button button-icon button-clear ion-navicon" menu-toggle="left">\n                </button>\n            </ion-nav-buttons>\n        </ion-nav-bar>\n        <ion-nav-view name="menuContent"></ion-nav-view>\n    </ion-side-menu-content>\n\n    <ion-side-menu side="left">\n        <ion-header-bar class="bar-stable">\n            <h1 class="title">Left</h1>\n        </ion-header-bar>\n        <ion-content>\n            <ion-list>\n                <ion-item menu-close ng-click="login()">\n                    Login\n                </ion-item>\n                <ion-item menu-close href="#/app/map">\n                    Map\n                </ion-item>\n            </ion-list>\n        </ion-content>\n    </ion-side-menu>\n</ion-side-menus>');}]);