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
    .controller('MapCtrl', function ($scope, $cordovaGeolocation, leafletData, markersApi, $ionicModal, $ionicLoading) {

        //set the property of the map
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


        //center the map on the actual position.

        var setCurrentPosition = function () {
            $ionicLoading.show({
                template: '<ion-spinner icon="android"></ion-spinner>',
                duration: 7000
            });
            $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
                if (position) {
                    $scope.map.center.lat = position.coords.latitude;
                    $scope.map.center.lng.longitude = position.coords.longitude;
                } else {}
            }).catch(function (err) {}).finally(function () {
                $ionicLoading.hide();
            });
        };
        setCurrentPosition();

        $scope.centerPosition = function () {
            setCurrentPosition();
        };





        //seleziona i layer
        $ionicModal.fromTemplateUrl('layerModal.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });
        // Open the login modal
        $scope.openLayersModal = function () {
            $scope.modal.show();
        };

        //add the layer when the view enter.s
        var markers = L.markerClusterGroup();
        $scope.$on("$ionicView.enter", function (scopes, states) {
            leafletData.getMap("map").then(function (map) {
                map.invalidateSize();
                //      markers.addLayer(geojson);
                markersApi.getPoints().then(function (resp) {
                    var geojson = new L.GeoJSON(resp, {
                        onEachFeature: function (feature, layer) {
                            //simple popup
                            //var html = "<b>" + feature.properties.name + "</b>";
                            //layer.bindPopup(html);
                            layer.on('click', function (e) {
                                $scope.map.center.lat = feature.geometry.coordinates[1];
                                $scope.map.center.lng = feature.geometry.coordinates[0];
                                $scope.feature = feature;
                                $scope.openLayersModal();
                            });
                        }
                    });
                    markers.addLayer(geojson);
                    map.addLayer(markers);

                    //add marker on click
                    //                    var setMarker = function (latlng) {
                    //                        if (!newMarker) {
                    //                            newMarker = new L.marker(latlng).addTo(map);
                    //                        } else {
                    //                            newMarker.setLatLng(latlng).update();
                    //                        }
                    //                    };
                    //                    var newMarker = null;
                    //                    map.on('click', function (e) {
                    //                        setMarker(e.latlng);
                    //                    });

                }, function (err) {
                    console.log('ERROR', err.status);
                });
            });
        });


    });