/******************************
[Script]

^https:\/\/kelee\.one\/ url script-request-header https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js
^https:\/\/kelee\.one\/.*\.(plugin|js)$ url script-response-header https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js

[MITM]
hostname = kelee.one
********************************/

// 配置部分
const config = {
    urlPattern: /^https:\/\/kelee\.one\//i, // 匹配 kelee.one 主站 URL
    filePattern: /^https:\/\/kelee\.one\/.*\.(plugin|js)$/i, // 匹配 kelee.one 的特定文件
    defaultHeaders: {
        'User-Agent': 'Loon/762 CFNetwork/1568.200.51 Darwin/24.1.0',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
        'Connection': 'keep-alive',
        'Host': 'kelee.one'
    },
    modifiedResponseHeaders: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Encoding': 'identity'
    }
};

// 工具函数：尝试将乱码转换为可读文本
function decodeText(text) {
    try {
        const decoder = new TextDecoder('utf-8', { fatal: false });
        const bytes = new Uint8Array([...text].map(char => char.charCodeAt(0)));
        return decoder.decode(bytes);
    } catch (e) {
        console.error("解码失败: 原始文本:", text, "错误信息:", e);
        return text; // 返回原始文本
    }
}

// 工具函数：日志打印
function logDebug(message, data = null) {
    console.log(`[DEBUG] ${message}`, data);
}

// 函数：处理请求头
function handleRequestHeaders(request) {
    logDebug("正在修改请求头", { url: request.url });
    return { headers: { ...request.headers, ...config.defaultHeaders } };
}

// 函数：处理响应头和响应体
function handleResponse(response) {
    logDebug("正在修改响应内容", { originalHeaders: response.headers });

    let body = response.body || ""; // 默认空字符串
    if (typeof body !== 'string') {
        console.warn("响应体非字符串类型，尝试转换:", body);
        body = String(body);
    }

    // 尝试解码乱码
    body = decodeText(body);

    // 替换特定乱码内容（如有需求）
    body = body.replace(/特定乱码/g, "替换后的文本");

    return {
        headers: { ...response.headers, ...config.modifiedResponseHeaders },
        body
    };
}

// 主逻辑
if (typeof $response !== 'undefined') {
    logDebug("检测到响应，URL:", $request.url);

    if (config.filePattern.test($request.url)) {
        $done(handleResponse($response));
    } else {
        logDebug("不符合修改条件的响应 URL:", $request.url);
        $done(); // 不做处理
    }
} else if (typeof $request !== 'undefined') {
    logDebug("检测到请求，URL:", $request.url);

    if (config.urlPattern.test($request.url)) {
        $done(handleRequestHeaders($request));
    } else {
        logDebug("不符合修改条件的请求 URL:", $request.url);
        $done(); // 不做处理
    }
}