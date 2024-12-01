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

// 工具函数：修复乱码编码（假设返回的是 GBK 编码但被当作 UTF-8 解码的内容）
function fixEncoding(text) {
    try {
        const decoder = new TextDecoder('gbk', { fatal: false }); // 使用 GBK 解码
        const encoder = new TextEncoder();
        const bytes = encoder.encode(text); // 将原始字符串转成字节数组
        return decoder.decode(bytes); // 返回修复后的字符串
    } catch (e) {
        console.log("修复编码失败:", e);
        return text;
    }
}

// 主逻辑处理
if (typeof $request !== "undefined" && urlPattern.test($request.url)) {
    // 匹配请求头并进行修改
    console.log("匹配的请求 URL:", $request.url);

    let modifiedHeaders = {
        ...$request.headers,
        'User-Agent': 'Loon/762 CFNetwork/1568.200.51 Darwin/24.1.0', // 自定义 User-Agent
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
        'Connection': 'keep-alive',
        'Host': 'kelee.one',
    };

    $done({ headers: modifiedHeaders });
} else if (typeof $response !== "undefined" && filePattern.test($request.url)) {
    // 匹配响应头和响应体并进行处理
    console.log("匹配的响应 URL:", $request.url);

    let modifiedResponseHeaders = {
        ...$response.headers,
        'Content-Type': 'text/plain; charset=utf-8', // 强制设置为 UTF-8 显示
        'Content-Encoding': 'identity', // 防止解压缩干扰
        'Content-Disposition': 'inline', // 确保浏览器在线预览而非下载
    };

    let body = $response.body;
    if (typeof body === 'string') {
        console.log("原始响应体（前100字符）:", body.slice(0, 100));

        // 修复乱码内容
        const fixedBody = fixEncoding(body);

        console.log("修复后的响应体（前100字符）:", fixedBody.slice(0, 100));
        $done({ headers: modifiedResponseHeaders, body: fixedBody });
    } else {
        console.warn("响应体不是字符串类型，跳过处理");
        $done({ headers: modifiedResponseHeaders });
    }
} else {
    console.log("不符合修改条件的请求或响应 URL:", $request ? $request.url : "未知 URL");
    $done({});
}