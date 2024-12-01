/******************************
[Script]

^https:\/\/kelee\.one\/ url script-request-header https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js
^https:\/\/kelee\.one\/.*\.(plugin|js)$ url script-response-header https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js

[MITM]
hostname = kelee.one
********************************/
// 匹配 kelee.one 的 URL
const urlPattern = /^https:\/\/kelee\.one\//;
const filePattern = /\.(plugin|js)$/;

// 工具函数：将 GBK 内容转换为 UTF-8
function gbkToUtf8(buffer) {
    const decoder = new TextDecoder('gbk');
    const encoder = new TextEncoder();
    try {
        const decoded = decoder.decode(buffer);
        return encoder.encode(decoded).buffer;
    } catch (e) {
        return buffer; // 如果解码失败，返回原始内容
    }
}

// 主逻辑
if (urlPattern.test($request.url)) {
    // 修改请求头
    $done({
        headers: {
            ...$request.headers,
            'User-Agent': 'Loon/762 CFNetwork/1568.200.51 Darwin/24.1.0',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
            'Connection': 'keep-alive',
            'Host': 'kelee.one',
        },
    });
} else if ($response && filePattern.test($request.url)) {
    let modifiedResponseHeaders = {
        ...$response.headers,
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Encoding': 'identity',
    };

    let body = $response.body;
    if (typeof body !== 'string') {
        // 修复二进制响应体的乱码
        body = gbkToUtf8(body);
    }

    $done({ headers: modifiedResponseHeaders, body });
} else {
    $done({});
}