angular.module('starter.controllers', []).controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
        $scope.loginData = {};
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };
        $scope.login = function () {
            $scope.modal.show();
        };
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };
    })
    .controller('MapCtrl', function ($scope, $cordovaGeolocation) {
        $scope.map = {
            center: {
                lat: 46,
                lng: 11,
                zoom: 8
            },
            defaults: {
                zoomControl: false,
                attributionControl: true
            },
            layers: {
                baselayers: {
                    xyz: {
                        name: 'OpenStreetMap (XYZ)',
                        url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                        type: 'xyz',
                        zoomControl: false,
                        layerOptions: {
                            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        }
                    }
                }
            }
        };
        var options = {
            enableHighAccuracy: false,
            timeout: 20000
        };
        $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
            if (position) {
                $scope.map.center.lat = position.coords.latitude;
                $scope.map.center.lng = position.coords.longitude;
            }
        }, function (err) {});

        var markers = L.markerClusterGroup();
        $scope.$on("$ionicView.enter", function (scopes, states) {
            leafletData.getMap("map").then(function (map) {
                map.invalidateSize();
                //      markers.addLayer(geojson);
                markersApi.getPoints().then(function (resp) {
                    var geojson = new L.GeoJSON(resp, {
                        onEachFeature: function (feature, layer) {
                            var html = createHtml(feature);
                            layer.bindPopup(html);
                        }
                    });
                    markers.addLayer(geojson);
                    map.addLayer(markers);
                }, function (err) {
                    console.log('ERROR', err.status);
                });
            });
        });


    });