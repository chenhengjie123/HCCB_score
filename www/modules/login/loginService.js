main
    .service('LoginService', function ($http, $q) {
        return {
            get: function (client_id) {
                url = ServiceURL.LOGIN + '?client_id=' + client_id + '&client_secret=' + 'secret'

                var deferred = $q.defer();
                $http.get(url, {
                    timeout: 1000
                })
                    .success(function (data, status, headers, config) {
                        deferred.resolve(angular.fromJson(data));
                        console.log("Get data success");
                    })
                    .error(function (data, status, headers, config) {
                        deferred.reject('Get error when request data. Error code' + status);
                        console.log("Get data error. status: " + status)
                        //just for local test
                        //deferred.resolve(virtualData);
                    })
                return deferred.promise;
            }
        };
    });