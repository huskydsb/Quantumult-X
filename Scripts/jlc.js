// ========= 日志 =========
function log(emoji, msg) {
    const time = new Date().toLocaleString();
    console.log(`${time} ${emoji} ${msg}`);
}

// ========= 通知 =========
function notify(title, msg) {
    $notify(title, "", msg);
    log("🔔", `${title} → ${msg}`);
}

// ========= 掩码账号 =========
function mask(account) {
    if (account && account.length >= 4) {
        return account.slice(0, 2) + "****" + account.slice(-2);
    }
    return "****";
}

// ========= 请求头 =========
function getHeaders(token) {
    return {
        "X-JLC-AccessToken": token,
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_2_1 like Mac OS X)",
        "Content-Type": "application/json"
    };
}

// ========= 接口 =========
const goldUrl = "https://m.jlc.com/api/appPlatform/center/assets/selectPersonalAssetsInfo";
const signUrl = "https://m.jlc.com/api/activity/sign/signIn?source=3";
const day7Url = "https://m.jlc.com/api/activity/sign/receiveVoucher";

// ========= 网络请求 =========
async function request(url, headers) {
    return await $task.fetch({
        url,
        method: "GET",
        headers
    });
}

// ========= 主流程 =========
(async () => {

    const token = $prefs.valueForKey("JLC_AccessToken");

    // ===== Token 校验 =====
    if (!token) {
        notify("嘉立创签到失败", "未读取到 Token，请先打开下单助手抓取");
        return $done();   // ✅ 合法 return（在函数内）
    }

    const headers = getHeaders(token);

    try {

        // ===== 获取资产 =====
        log("⏳", "开始获取金豆信息...");

        const r1 = await request(goldUrl, headers);
        const bean = JSON.parse(r1.body);

        const customer = bean?.data?.customerCode || "";
        const integral = bean?.data?.integralVoucher || 0;

        log("✅", `账号: ${mask(customer)} 当前金豆: ${integral}`);

        // ===== 签到 =====
        log("⏳", "开始签到...");

        const r2 = await request(signUrl, headers);
        const result = JSON.parse(r2.body);

        if (!result.success) {
            if (result.message?.includes("已经签到")) {
                notify("嘉立创签到提醒", `账号(${mask(customer)}) 今日已签到`);
            } else {
                notify("嘉立创签到失败", result.message || "未知错误");
            }
            return $done();
        }

        const data = result.data || {};
        const gain = data.gainNum || 0;
        const status = data.status || 0;

        // ===== 正常奖励 =====
        if (status > 0 && gain > 0) {
            const total = integral + gain;
            const msg = `账号(${mask(customer)}) 获取${gain}金豆，当前总数：${total}`;
            log("🎉", msg);
            notify("嘉立创签到成功", msg);
            return $done();
        }

        // ===== 第七天奖励 =====
        if (status > 0 && gain === 0) {

            log("⏳", "检测到第七天签到奖励...");

            const r3 = await request(day7Url, headers);
            const seventh = JSON.parse(r3.body);

            if (seventh.success) {
                const total = integral + 8;
                const msg = `账号(${mask(customer)}) 第七天奖励到账，总金豆：${total}`;
                log("🎉", msg);
                notify("嘉立创第七天签到成功", msg);
            } else {
                notify("嘉立创第七天签到失败", "未获取奖励");
            }

            return $done();
        }

        notify("嘉立创签到提醒", "今日已签到");

    } catch (e) {
        log("❌", e);
        notify("嘉立创签到异常", String(e));
    }

    $done();

})();