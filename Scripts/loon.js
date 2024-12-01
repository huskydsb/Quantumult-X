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

// 工具函数：将错误解码的内容重新编码
function fixEncoding(text) {
    try {
        // 将错误编码的文本转换为 Buffer
        const buffer = new TextEncoder().encode(text);
        // 再次解码为 UTF-8
        const decoder = new TextDecoder('utf-8', { fatal: false });
        const fixedText = decoder.decode(buffer);
        console.log("修复后的文本（前100字符）:", fixedText.slice(0, 100));
        return fixedText;
    } catch (e) {
        console.error("修复编码失败:", e);
        return text;
    }
}

// 主逻辑处理
if (urlPattern.test($request.url)) {
    console.log("匹配的请求 URL:", $request.url);

    // 修改请求头
    let modifiedHeaders = {
        ...$request.headers,
        'User-Agent': 'Loon/762 CFNetwork/1568.200.51 Darwin/24.1.0',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
        'Connection': 'keep-alive',
    };

    console.log("修改后的请求头:", JSON.stringify(modifiedHeaders, null, 2));
    $done({ headers: modifiedHeaders });
} else if ($response && filePattern.test($request.url)) {
    console.log("匹配的响应 URL:", $request.url);

    // 修改响应头
    let modifiedResponseHeaders = {
        ...$response.headers,
        'Content-Type': 'text/plain; charset=utf-8', // 强制 UTF-8 编码
        'Content-Encoding': 'identity', // 防止解压缩干扰
    };

    console.log("修改后的响应头:", JSON.stringify(modifiedResponseHeaders, null, 2));

    let body = $response.body;
    if (typeof body === 'string') {
        console.log("原始响应体（前100字符）:", body.slice(0, 100));

        // 尝试修复编码
        const fixedBody = fixEncoding(body);

        // 打印修复后的响应体
        console.log("修复后的响应体（前100字符）:", fixedBody.slice(0, 100));

        $done({ headers: modifiedResponseHeaders, body: fixedBody });
    } else {
        console.warn("响应体不是字符串类型，跳过处理");
        $done({});
    }
} else {
    console.log("不符合修改条件的请求或响应 URL:", $request.url);
    $done({});
}