/*
    云闪付获取cookie

    [rewrite_local]
    https:\/\/youhui\.95516\.com/newsign/api/shop_items/list url script-request-header https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/ysf.cookie.js
    [MITM]
    hostname = youhui.95516.com
*/





const authorizationKey = 'unipay_authorizationKey';
const $tool = tool();

function extractAuthorization() {
    let isGetCookie = typeof $request !== 'undefined' && $request.method != 'OPTIONS';
    console.log("检查请求: ", isGetCookie);
    
    if (isGetCookie && $request.url.indexOf("https://youhui.95516.com/newsign/api/shop_items") > -1) {
        console.log("请求 URL 符合条件，提取 Authorization");
        
        var authorizationVal = $request.headers["Authorization"];
        console.log("获取的 Authorization:", authorizationVal);
        
        if (authorizationVal) {
            // 提取 token 部分
            var token = authorizationVal.split(' ')[1];
            console.log("提取的 Token:", token);
            
            if (token) {
                $tool.setdata(token, authorizationKey);  // 使用 setdata 存储值
                console.log("Token 已存储:", token);
                $tool.notify("云闪付签到!", "获得Authorization Token", token, { img: img });
            } else {
                console.log("未能提取 Token");
            }
            $done({});
        } else {
            console.log("未找到 Authorization 头");
        }
    } else {
        console.log("请求 URL 不符合条件");
    }
}

try {
    console.log("🍎云闪付脚本开始!");
    var img = "https://is5-ssl.mzstatic.com/image/thumb/Purple114/v4/53/bc/b5/53bcb52a-6c33-67cc-0c70-faf4ffbdb71e/AppIcon-0-0-1x_U007emarketing-0-0-0-6-0-0-85-220.png/230x0w.png";

    // 调用提取 Authorization 的函数
    extractAuthorization();

} catch (e) {
    console.log("🍎错误:", e);
    $tool.notify("云闪付错误!", e.message, e.message, { img: img });
    $done();
}


// 通知 
function tool() { var isLoon = typeof $httpClient != "undefined"; var isQuanX = typeof $task != "undefined"; var obj = { notify: function (title, subtitle, message, option) { var option_obj = {}; if (isQuanX) { if (!!option) { if (typeof option == "string") { option_obj["open-url"] = option } if (!!option.url) { option_obj["open-url"] = option.url } if (!!option.img) { option_obj["media-url"] = option.img } $notify(title, subtitle, message, option_obj) } else { $notify(title, subtitle, message) } } if (isLoon) { if (!!option) { if (typeof option == "string") { option_obj["openUrl"] = option } if (!!option.url) { option_obj["openUrl"] = option.url } if (!!option.img) { option_obj["mediaUrl"] = option.img } $notification.post(title, subtitle, message, option_obj) } else { $notification.post(title, subtitle, message) } } }, get: function (options, callback) { if (isQuanX) { if (typeof options == "string") { options = { url: options } } options["method"] = "GET"; $task.fetch(options).then(function (response) { callback(null, adapterStatus(response), response.body) }, function (reason) { callback(reason.error, null, null) }) } if (isLoon) { $httpClient.get(options, function (error, response, body) { callback(error, adapterStatus(response), body) }) } }, post: function (options, callback) { if (isQuanX) { if (typeof options == "string") { options = { url: options } } options["method"] = "POST"; $task.fetch(options).then(function (response) { callback(null, adapterStatus(response), response.body) }, function (reason) { callback(reason.error, null, null) }) } if (isLoon) { $httpClient.post(options, function (error, response, body) { callback(error, adapterStatus(response), body) }) } }, unicode: function (str) { return unescape(str.replace(/\\u/gi, "%u")) }, decodeurl: function (str) { return decodeURIComponent(str) }, json2str: function (obj) { return JSON.stringify(obj) }, str2json: function (str) { return JSON.parse(str) }, setkeyval: function (value, key) { if (isQuanX) { $prefs.setValueForKey(value, key) } if (isLoon) { $persistentStore.write(value, key) } }, getkeyval: function (key) { if (isQuanX) { return $prefs.valueForKey(key) } if (isLoon) { return $persistentStore.read(key) } } }; function adapterStatus(response) { if (response) { if (response.status) { response["statusCode"] = response.status } else { if (response.statusCode) { response["status"] = response.statusCode } } } return response } return obj };