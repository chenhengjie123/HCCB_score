function addCookie(name,value,expiresHours){ 
    var cookieString=name+"="+Base64.encode(escape(value)); 
    if(expiresHours>0){ 
        var date=new Date(); 
        date.setTime(date.getTime+expiresHours*3600*1000); 
        cookieString=cookieString+"; expires="+date.toGMTString(); 
    } 
    document.cookie=cookieString; 
} 

function getCookie(name){ 
    var strCookie=document.cookie; 
    var arrCookie=strCookie.split("; "); 
    for(var i=0;i<arrCookie.length;i++){ 
        var arr=arrCookie[i].split("="); 
        if(arr[0]==name)return arr[1]; 
    } 
    return ""; 
} 

function deleteCookie(name){ 
    var date=new Date(); 
    date.setTime(date.getTime()-10000); 
    document.cookie=name+"=v; expires="+date.toGMTString(); 
} 

ls = localStorage;
tokenKey = "token"
function addToken(value){
    var date = new Date();
    var storageJson = angular.toJson({
        token: Base64.encode(value),
        lastLoginTime: date.getTime()
    });
    ls.setItem(tokenKey,storageJson);
    console.log("addToken success");
}

function deleteToken(){
    ls.removeItem(tokenKey);
    console.log("removeToken success")
}

function updateToken(){
    var token = angular.fromJson(ls.getItem(tokenKey));
    if (token != null) {
        var date = new Date();
        token.lastLoginTime = date.getTime();
        token = angular.toJson(token);
        ls.setItem(tokenKey, token);
        console.log("updateToken success");
        return;
    }
    console.log("updateToken failed. Token doesn't exist");
}

function getToken(){
    token = angular.fromJson(ls.getItem(tokenKey));
    if (token != null){
        var date = new Date();
        if ((date.getTime() - token.lastLoginTime) <= Config.tokenExpireDay*3600*1000*24){
            console.log("getToken success");
            return token;
        }
    }
    console.log("getToken failed. It's expired");
    deleteToken();
    return "";
}
