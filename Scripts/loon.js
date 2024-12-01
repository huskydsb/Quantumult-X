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

// 工具函数：解码 UTF-8 乱码内容
function decodeText(text) {
    try {
        // 将字符串转换为字节流
        const bytes = new Uint8Array([...text].map(char => char.charCodeAt(0)));

        // 使用 UTF-8 解码
        const decoder = new TextDecoder('utf-8', { fatal: false });
        return decoder.decode(bytes);
    } catch (e) {
        console.error("解码失败:", e);
        return text; // 解码失败时返回原始内容
    }
}

// 判断是否为请求头修改
if (urlPattern.test($request.url)) {
    // 构建修改后的请求头对象
    let modifiedHeaders = {
        ...$request.headers,
        'User-Agent': 'Loon/762 CFNetwork/1568.200.51 Darwin/24.1.0', // 自定义 User-Agent
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-Dest': 'document',
        'Priority': 'u=0, i',
        'Connection': 'keep-alive',
        'Host': 'kelee.one'
    };

    // 返回修改后的请求头
    $done({ headers: modifiedHeaders });
}
// 判断是否为 .plugin 或 .js 文件的响应头修改
else if ($response && filePattern.test($request.url)) {
    let modifiedResponseHeaders = {
        ...$response.headers,
        'Content-Type': 'text/plain; charset=utf-8', // 强制设置为 UTF-8 编码显示
        'Content-Encoding': 'identity' // 防止浏览器自动解压缩
    };

    // 处理响应体，解码可能存在的乱码
    let body = $response.body;
    if (typeof body === 'string') {
        body = decodeText(body); // 修复乱码
    }

    // 返回修改后的响应头和解码后的响应体
    $done({ headers: modifiedResponseHeaders, body });
} else {
    // 若不符合上述条件，直接返回
    $done({});
}