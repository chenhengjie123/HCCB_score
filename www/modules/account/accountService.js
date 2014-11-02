main
    .service('AccountService', function ($http, $q) {
        return {

            getUserInfo: function (userId) {
                var deferred = $q.defer();
                if (Config.isOffline == true) {
                    //just for offline test
                    var virtualData = angular.fromJson(OfflineData)["GET api/users/123"];
                    deferred.resolve(virtualData);
                    return deferred.promise;
                } else {
                    $http.get(ServiceURL.USER + "/" + userId, {
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