main
    .service('ScoreService', function ($http, $q) {
        return {

            getScores: function () {
                var deferred = $q.defer();
                if (Config.isOffline == true) {
                    //just for offline test
                    var virtualData = angular.fromJson(OfflineData)["GET api/scores"];
                    deferred.resolve(virtualData);
                    return deferred.promise;
                } else {
                    $http.get(ServiceURL.SCORE, {
                        timeout: 1000
                    })
                        .success(function (data, status, headers, config) {
                            deferred.resolve(angular.fromJson(data));
                        })
                        .error(function (data, status, headers, config) {
                            deferred.reject(angular.fromJson(data));
                        })
                    return deferred.promise;
                }
            }
        };
    });