/******************************

[Script]

^https:\/\/kelee\.one\/ url script-request-header https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js
^https:\/\/kelee\.one\/.*\.(plugin|js)$ url script-response-header https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js
^https:\/\/kelee\.one\/.*\.(plugin|js)$ url script-response-body https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js

[MITM]
hostname = kelee.one

********************************/

// 解码 GBK 编码为 UTF-8
function decodeGBK(input) {
    try {
        const iconv = require("iconv-lite");
        return iconv.decode(Buffer.from(input, "binary"), "gbk");
    } catch (e) {
        return input;  // 如果解码失败，则返回原始内容
    }
}

// 处理请求头，修改 User-Agent 和其他请求头
if (typeof $request !== "undefined") {
    let modifiedHeaders = {
        ...$request.headers,
        'User-Agent': 'Loon/762 CFNetwork/1568.200.51 Darwin/24.1.0', // 设置自定义的 User-Agent
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
        'Connection': 'keep-alive',
        'Host': 'kelee.one',
    };
    $done({ headers: modifiedHeaders });
}

// 处理响应体，解码 GBK 编码为 UTF-8，修改响应头以防止乱码
if (typeof $response !== "undefined") {
    let modifiedHeaders = {
        ...$response.headers,
        'Content-Type': 'text/html; charset=utf-8', // 强制响应内容为 UTF-8
        'Content-Encoding': 'identity', // 防止响应内容压缩
    };

    let body = $response.body;

    if (typeof body === 'string') {
        // 解码响应体的 GBK 编码
        const decodedBody = decodeGBK(body);

        // 返回修复后的响应内容
        $done({ headers: modifiedHeaders, body: decodedBody });
    } else {
        $done({ headers: modifiedHeaders, body: $response.body });
    }
}