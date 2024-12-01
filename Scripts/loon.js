/******************************
[Script]

^https:\/\/kelee\.one\/ url script-request-header https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js
^https:\/\/kelee\.one\/.*\.(plugin|js)$ url script-response-header https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js

[MITM]
hostname = kelee.one
********************************/

// 匹配以 kelee.one 开头的 URL
const urlPattern = /^https:\/\/kelee\.one\//;
// 匹配 .plugin 和 .js 文件
const filePattern = /\.(plugin|js)$/;

// 主逻辑处理
if ($response && filePattern.test($request.url)) {
    console.log("匹配的响应 URL:", $request.url);

    // 强制修改响应头
    let modifiedResponseHeaders = {
        ...$response.headers,
        'Content-Type': 'text/plain; charset=UTF-8', // 确保为普通文本
        'Content-Disposition': 'inline', // 指定为内联显示而非附件下载
        'Content-Encoding': 'identity', // 防止解压缩干扰
    };

    console.log("修改后的响应头:", JSON.stringify(modifiedResponseHeaders, null, 2));

    let body = $response.body;
    if (typeof body === 'string') {
        console.log("原始响应体（前100字符）:", body.slice(0, 100));

        // 返回修改后的内容
        $done({ headers: modifiedResponseHeaders, body });
    } else {
        console.log("响应体不是字符串类型，跳过处理");
        $done({});
    }
} else if ($request && urlPattern.test($request.url)) {
    console.log("匹配的请求 URL:", $request.url);

    // 修改请求头
    let modifiedHeaders = {
        ...$request.headers,
        'User-Agent': 'Loon/762 CFNetwork/1568.200.51 Darwin/24.1.0', // 自定义 User-Agent
    };

    console.log("修改后的请求头:", JSON.stringify(modifiedHeaders, null, 2));
    $done({ headers: modifiedHeaders });
} else {
    console.log("不符合修改条件的请求或响应 URL:", $request.url);
    $done({});
}