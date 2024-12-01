/******************************

[Script]

^https:\/\/kelee\.one\/ url script-request-header https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js
^https:\/\/kelee\.one\/.*\.(plugin|js)$ url script-response-header https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js
^https:\/\/kelee\.one\/.*\.(plugin|js)$ url script-response-body https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js

[MITM]
hostname = kelee.one

********************************/


// 工具函数：修复乱码编码
function fixEncoding(text, encoding = 'gbk') {
    try {
        const decoder = new TextDecoder(encoding, { fatal: false });
        const encoder = new TextEncoder();

        // 将文本转为字节数组再解码
        const bytes = encoder.encode(text);
        return decoder.decode(bytes);
    } catch (e) {
        console.log("编码修复失败:", e);
        return text;
    }
}

// 主逻辑
if (typeof $response !== "undefined") {
    // 匹配目标请求的 URL
    const urlPattern = /^https:\/\/kelee\.one\/.*\.(plugin|js)$/;

    if (urlPattern.test($request.url)) {
        console.log("匹配的响应 URL:", $request.url);

        // 修改响应头
        let modifiedResponseHeaders = {
            ...$response.headers,
            'Content-Type': 'text/plain; charset=utf-8', // 强制设置为 UTF-8
            'Content-Disposition': 'inline', // 防止下载，强制在线预览
        };

        let body = $response.body;

        if (typeof body === 'string') {
            console.log("原始响应体（前100字符）:", body.slice(0, 100));

            // 修复乱码内容
            const fixedBody = fixEncoding(body, 'gbk'); // 强制 GBK 解码
            console.log("修复后的响应体（前100字符）:", fixedBody.slice(0, 100));

            // 返回修复后的内容
            $done({ headers: modifiedResponseHeaders, body: fixedBody });
        } else {
            console.log("响应体不是字符串类型，可能是二进制数据，跳过处理");
            $done({ headers: modifiedResponseHeaders });
        }
    } else {
        console.log("未匹配的响应 URL:", $request.url);
        $done({});
    }
} else {
    $done({});
}