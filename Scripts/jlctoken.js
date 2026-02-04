function log(emoji, msg) {
    const time = new Date().toLocaleString();
    console.log(`${time} ${emoji} ${msg}`);
}

// ===== 通知函数（QX）=====
function notify(title, msg) {
    $notify(title, "", msg);
    log("🔔", `${title} → ${msg}`);
}

try {
    if (!$request || !$request.headers) {
        log("⚠️", "当前请求不存在 headers");
        $done();
        return;
    }

    const headers = $request.headers;

    // 兼容大小写
    const token =
        headers["x-jlc-accesstoken"] ||
        headers["X-JLC-AccessToken"] ||
        headers["X-Jlc-Accesstoken"];

    if (!token) {
        log("⚠️", "未捕获到 Token");
        $done();
        return;
    }

    const key = "JLC_AccessToken";
    const oldToken = $prefs.valueForKey(key);

    // ===== 首次保存 =====
    if (!oldToken) {
        $prefs.setValueForKey(token, key);
        notify("嘉立创 Token 已保存", token);
    }
    // ===== 更新 =====
    else if (oldToken !== token) {
        $prefs.setValueForKey(token, key);
        notify("嘉立创 Token 已更新", token);
    }
    // ===== 未变化 =====
    else {
        log("ℹ️", "Token 未变化，跳过通知");
    }

} catch (e) {
    log("❌", `脚本异常: ${e}`);
}

$done();