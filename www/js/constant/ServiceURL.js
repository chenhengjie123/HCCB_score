function ServiceURL() {};

ServiceURL.SERVER = 'http://127.0.0.1'
ServiceURL.API = ServiceURL.SERVER + '/api'
ServiceURL.ACCOUNT = ServiceURL.API + '/accout'
ServiceURL.ACTIVITY = ServiceURL.API + '/activity'
ServiceURL.HISTORY = ServiceURL.API + '/history'
ServiceURL.SCORE = ServiceURL.API + '/scores'


//initialize localstorage of scfLoginMessage
var scfLoginConfig = window.localStorage['scfLoginConfig'];
if (!scfLoginConfig) {
    window.localStorage['scfLoginConfig'] = angular.toJson({
        scfLoginAuthorization: "",
        scfServerConfig: {
            protocol: "",
            url: "",
            port: "",
            fullUrl: ""
        },
        isAutoLogin: false
    });
    scfLoginConfig = window.localStorage['scfLoginConfig'];
}

var scfServerBaseUrl = angular.fromJson(window.localStorage['scfLoginConfig']).scfServerConfig.fullUrl;
var scfServerCmdPath = "api/1.1/cmd?cmd="
var jsonpCallback = "&callback=JSON_CALLBACK"


ServiceURL.DEVICE_OF_AREA = function (zoneName) {
    var deviceOfArea = generalUrl("list_zone_device", zoneName);
    appLog.debug("Get request url of deviceOfArea with areaName = " + zoneName);
    return deviceOfArea;
}
ServiceURL.CHANGE_LIGHT_NAME = function (oldLightName, newLightName) {
    var changeLightName = generalUrl("rename_device", oldLightName, newLightName);
    appLog.debug("Get request url of changeLightName with oldLightName = " + oldLightName + " and newLightName = " + newLightName);
    return changeLightName;
}

ServiceURL.CHANGE_LIGHT_STATE = function (newLightState, lightName) {
    appLog.debug("Get request url of CHANGE_LIGHT_STATE with new light state " + newLightState + " and light name " + lightName);
    if (newLightState == 1) {
        var changeLightState = generalUrl("on", lightName);
    } else {
        var changeLightState = generalUrl("off", lightName);
    }

    return changeLightState;
}

ServiceURL.GET_LIGHT_STATE = function (lightName) {
    var getLightState = generalUrl("status_io", lightName);
    appLog.debug("Get request url of GET_LIGHT_STATE with light name" + lightName);
    return getLightState;
}


//update ServiceURL from storage
ServiceURL.refreshFromStorage = function () {
    scfServerBaseUrl = angular.fromJson(window.localStorage['scfLoginConfig']).scfServerConfig.fullUrl;
    updateAllUrls(scfServerBaseUrl);
    appLog.debug("Refresh ServiceURLs From Storage. The new scfServerBaseUrl is " + scfServerBaseUrl);
};

//update ServiceURL from value
ServiceURL.refreshTemporary = function (scfServerBaseUrl) {
    appLog.debug("Refresh Temporary. The new scfServerBaseUrl is " + scfServerBaseUrl);
    updateAllUrls(scfServerBaseUrl);
}

function updateAllUrls(tmpServerBaseUrl) {
    ServiceURL.LOGIN = tmpServerBaseUrl + scfServerCmdPath + encode('{"cmd":"list_zone"}') + jsonpCallback;
    ServiceURL.AREA = tmpServerBaseUrl + scfServerCmdPath + encode('{"cmd":"list_zone"}') + jsonpCallback;
    ServiceURL.DEVICE = tmpServerBaseUrl + scfServerCmdPath + encode('{"cmd":"list_device"}') + jsonpCallback;
    appLog.debug("Update ServiceURLs with scfServerBaseUrl = " + tmpServerBaseUrl);
}

/*
 **
 **General url by using cmd, target, arguments
 **Usage: generalUrl(cmd, [target, arguments])
 **       target, arguments are optional
 **Return: The url generaled by cmd, target, arguments
 **
 */
function generalUrl() {
    var generalUrlStr, cmd, target, arguments;
    switch (generalUrl.arguments.length) {
    case 1:
        cmd = generalUrl.arguments[0];
        generalUrlStr = scfServerBaseUrl + scfServerCmdPath + encode('{"cmd":"' + cmd + '"}') + jsonpCallback;
        break;
    case 2:
        cmd = generalUrl.arguments[0];
        target = generalUrl.arguments[1];
        generalUrlStr = scfServerBaseUrl + scfServerCmdPath + encode('{"cmd":"' + cmd + '","target":"' + target + '"}') + jsonpCallback;
        break;
    case 3:
        cmd = generalUrl.arguments[0];
        target = generalUrl.arguments[1];
        arguments = generalUrl.arguments[2];
        generalUrlStr = scfServerBaseUrl + scfServerCmdPath + encode('{"cmd":"' + cmd + '","target":"' + target + '","arguments":["' + arguments + '"]}') + jsonpCallback;
        break;
    default:
        generalUrlStr = "Error: the arguments is too much. You should use this function like this: generalUrl(cmd, [target, arguments])";
    }
    return generalUrlStr;
}

//Encode/Decode cmd value( for example, from {"cmd":"list_zone_device"} to %7B%22cmd%22%3A%22list_zone_device%22%7D)
function encode(cmdValue) {
    var unencoded = cmdValue;
    var encoded = encodeURIComponent(unencoded).replace(/'/g, "%27").replace(/"/g, "%22");
    return encoded;
}

function decode(cmdValue) {
    var encoded = cmdValue
    var unencoded = decodeURIComponent(encoded.replace(/\+/g, " "));
    return unencoded;
}