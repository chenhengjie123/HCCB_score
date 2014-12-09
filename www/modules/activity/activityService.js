main
    .service('ActivityService', function ($http, $q) {
        var virtualData = {
            "activity": [
                {
                    "title": "HCCB 羽毛球 2014-9-10活动",
                    "description": " 报名须知：\
1. 每次活动需要提前报名，系统会在活动的前一天截至报名\
2. 报名后由于特殊原因无法参加的，需要提前一天在系统中进行取消报名，活动当天系统无法取消报名，\
如果没有取消报名的，系统将会自动扣费。",
                    "date": "2014-09-10",
                    "beginTime": "18:00:00",
                    "endTime": "20:00:00",
                    "location": "奥体羽毛球馆",
                    "maxNumber": "8",
                    "currNumber": "2"
                                },
                {
                    "title": "HCCB 羽毛球 2014-9-11活动",
                    "description": " 报名须知：\
1. 每次活动需要提前报名，系统会在活动的前一天截至报名\
2. 报名后由于特殊原因无法参加的，需要提前一天在系统中进行取消报名，活动当天系统无法取消报名，\
如果没有取消报名的，系统将会自动扣费。",
                    "date": "2014-09-10",
                    "beginTime": "18:00:00",
                    "endTime": "20:00:00",
                    "location": "奥体羽毛球馆",
                    "maxNumber": "8",
                    "currNumber": "2"
                                }
                            ]
        };

        return {
            get: function () {

                var deferred = $q.defer();
                $http.get(ServiceURL.ACTIVITY, {
                    timeout: 1000
                })
                    .success(function (data, status, headers, config) {
                        deferred.resolve(angular.fromJson(data));
                        console.log("Get data success")
                    })
                    .error(function (data, status, headers, config) {
                        deferred.reject('Get error when request data. Error code' + status);
                        //just for local test
                        //deferred.resolve(virtualData);
                    })
                return deferred.promise;
            }
        };
    });