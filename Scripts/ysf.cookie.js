const authorizationKey = 'unipay_authorizationKey';
const $tool = tool();

function extractAuthorization() {
    let isGetCookie = typeof $request !== 'undefined' && $request.method != 'OPTIONS';
    if (isGetCookie && $request.url.indexOf("https://youhui.95516.com/newsign/api/shop_items") > -1) {
        var authorizationVal = $request.headers["Authorization"];
        if (authorizationVal) {
            // 提取 token 部分
            var token = authorizationVal.split(' ')[1];
            if (token) {
                $tool.setdata(token, authorizationKey);  // 使用 setdata 存储值
                console.log("🍎Authorization Token:" + token);
                $tool.notify("云闪付签到!", "获得Authorization Token", token, { img: img });
            }
            $done({});
        }
    }
}

try {
    console.log("🍎云闪付脚本开始!");
    var img = "https://is5-ssl.mzstatic.com/image/thumb/Purple114/v4/53/bc/b5/53bcb52a-6c33-67cc-0c70-faf4ffbdb71e/AppIcon-0-0-1x_U007emarketing-0-0-0-6-0-0-85-220.png/230x0w.png";

    // 调用提取 Authorization 的函数
    extractAuthorization();

} catch (e) {
    console.log("🍎error" + e);
    $tool.notify("云闪付错误!", e.message, e.message, { img: img });
    $done();
}
