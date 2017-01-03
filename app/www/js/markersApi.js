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