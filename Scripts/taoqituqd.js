// 淘气兔签到（Quantumult X 兼容，使用 Authorization JWT）

// 日志函数
function log(message, data = "") {
  const time = new Date().toLocaleTimeString("zh-CN", { hour12: false });
  console.log(`[${time}] ${message} ${data}`);
}

// 读取存储的 Authorization
const authorization = $prefs.valueForKey('taoqitu_authorization');

log("🔑 获取存储的Authorization", authorization ? "成功" : "失败");

if (!authorization) {
  log("⚠️ 错误", "未找到有效的Authorization，请先获取并存储Authorization");
  $notify("淘气兔签到", "未找到有效的Authorization", "请先获取并存储Authorization");
  $done();
}

// 请求参数
const url = "https://api-1209.apitutu.com/gateway/tqt/cn/user/sign";
const headers = {
  "accept-encoding": "gzip, deflate, br",
  "referer": "https://vip.taoqitu.pro",
  "origin": "https://vip.taoqitu.pro",
  "authorization": authorization,
  "sec-fetch-mode": "cors",
  "accept-language": "zh-CN,zh-Hans;q=0.9",
  "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
  "sec-fetch-dest": "empty",
  "accept": "*/*",
  "sec-fetch-site": "cross-site",
};

log("⚙️ 设置请求参数", `URL: ${url}`);
log("📋 请求头设置", JSON.stringify(headers, null, 2));

// 发送请求
log("🚀 开始发送签到请求", "等待响应...");

const request = {
  url: url,
  method: "GET",
  headers: headers,
};

$task.fetch(request).then(response => {
  log("✅ 签到请求成功", `状态码: ${response.statusCode}`);

  try {
    const result = JSON.parse(response.body);
    log("🔍 解析响应数据", JSON.stringify(result, null, 2));

    if (result.message) {
      if (result.message.includes("今日已签")) {
        log("✔️ 签到结果", "今日已签到 ✅");
        $notify("淘气兔签到", "今日已签到", "请明天再来！");
      } else if (result.message.includes("成功")) {
        log("🎉 签到成功", result.message);
        $notify("淘气兔签到", "签到成功", result.message);
      } else {
        log("⚠️ 未知返回", result.message);
        $notify("淘气兔签到", "未知返回", result.message);
      }
    } else {
      log("⚠️ 返回格式异常", response.body);
      $notify("淘气兔签到", "返回格式异常", response.body);
    }

  } catch (e) {
    log("⚠️ JSON解析失败", response.body);
    $notify("淘气兔签到", "JSON解析失败", response.body);
  }

  log("⏹️ 签到请求结束", "脚本执行完毕");
  $done();
}, reason => {
  log("❌ 请求失败", reason.error || reason);
  $notify("淘气兔签到", "请求失败", `${reason.error || reason}`);
  $done();
});