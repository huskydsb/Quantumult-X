/******************************

[Script]

^https:\/\/kelee\.one\/ url script-request-header https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js
^https:\/\/kelee\.one\/.*\.(plugin|js)$ url script-response-header https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js
^https:\/\/kelee\.one\/.*\.(plugin|js)$ url script-response-body https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js

[MITM]
hostname = kelee.one

********************************/


// 工具函数：解码 GBK 到 UTF-8
function decodeGBK(input) {
    try {
        const iconv = require("iconv-lite");
        return iconv.decode(Buffer.from(input, "binary"), "gbk");
    } catch (e) {
        console.error("解码 GBK 出错:", e);
        return input;
    }
}

// 修改请求头逻辑
if (typeof $request !== "undefined") {
    console.log("匹配的请求 URL:", $request.url);

    // 使用你提供的请求头
    let modifiedHeaders = {
        ...$request.headers,
        'User-Agent': 'Loon/762 CFNetwork/1568.200.51 Darwin/24.1.0', // 你的 UA
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
        'Connection': 'keep-alive',
        'Host': 'kelee.one',
    };

    console.log("修改后的请求头:", JSON.stringify(modifiedHeaders, null, 2));
    $done({ headers: modifiedHeaders });
}

// 修改响应体逻辑
if (typeof $response !== "undefined") {
    console.log("匹配的响应 URL:", $request.url);

    let modifiedHeaders = {
        ...$response.headers,
        'Content-Type': 'text/plain; charset=utf-8', // 强制 UTF-8 显示
        'Content-Encoding': 'identity', // 防止解压干扰
    };

    console.log("修改后的响应头:", JSON.stringify(modifiedHeaders, null, 2));

    let body = $response.body;

    if (typeof body === 'string') {
        console.log("原始响应体（前100字符）:", body.slice(0, 100));

        // 尝试解码 GBK
        const decodedBody = decodeGBK(body);

        // 打印修复后的响应体
        console.log("修复后的响应体（前100字符）:", decodedBody.slice(0, 100));

        // 返回修复后的内容
        $done({ headers: modifiedHeaders, body: decodedBody });
    } else {
        console.warn("响应体不是字符串类型，跳过处理");
        $done({ headers: modifiedHeaders, body: $response.body });
    }
}