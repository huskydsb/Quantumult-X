const cookieKey = 'unipay_cookieKey';
const authorizationKey = 'unipay_authorizationKey';
const userAgentKey = 'unipay_userAgentKey';
const $tool = tool();

try {
    console.log("🍎 云闪付签到脚本获取cookie!");

    let isGetCookie = typeof $request !== 'undefined' && $request.method !== 'OPTIONS';

    if (isGetCookie && $request.url.indexOf("https://youhui.95516.com/newsign/api/daily_sign_in") > -1) {
        var authorizationVal = $request.headers["Authorization"];
        var cookieVal = $request.headers['Cookie'];
        var userAgentVal = $request.headers['User-Agent'];


        if (authorizationVal) {
            $tool.setkeyval(authorizationVal, authorizationKey);
            $tool.setkeyval(cookieVal, cookieKey);
            $tool.setkeyval(userAgentVal, userAgentKey);
            console.log("🍎 Authorization:", authorizationVal);
            console.log("🍎 Cookie:", cookieVal);
            console.log("🍎 User-Agent:", userAgentVal);
            $done({});
        }
    } else {
        console.log("🍎 云闪付签到脚本获取cookie失败");
        $done({});
    }

} catch (e) {
    console.log("🍎 错误:", e);
    $done();
}


