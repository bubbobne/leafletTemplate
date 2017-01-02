angular.module('markers.api', ['base64']).factory('markersApi', ['$http', '$q', '$base64', function ($http, $q, $base64) {

    var endpoint = "";
    var markersAPI = {};
    /**
     * Get all measurements.
     *
     * @returns {unresolved}
     */
    markersApi.getPoints = function () {
        var deferred = $q.defer();
        $http.get(endpoint, {
                headers: {
                    'Authorization': " Basic " + $base64.encode(username + ":" + pwd)
                }
            }).success(function (data) {
                deferred.resolve(data);
            })
            .error(function (reason) {
                deferred.reject(reason);
            });
        return deferred.promise;
    };

    return markersApi;
                            }]);