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

// 工具函数：将乱码修正为正确的文本
function decodeText(text) {
    try {
        // 将字符串转为字节流
        const bytes = new Uint8Array([...text].map(char => char.charCodeAt(0)));

        // 尝试使用 UTF-8 解码
        const decoder = new TextDecoder('utf-8', { fatal: false });
        return decoder.decode(bytes);
    } catch (e) {
        console.error("解码失败:", e);
        return text; // 解码失败时返回原始文本
    }
}

// 函数：修复乱码响应体
function fixResponseBody(body) {
    if (typeof body !== 'string') {
        console.warn("响应体不是字符串类型，尝试强制转换");
        body = String(body); // 将非字符串数据强制转换为字符串
    }

    // 自动解码 UTF-8 乱码
    const decodedBody = decodeText(body);

    // 返回修复后的内容
    return decodedBody;
}

// 函数：处理请求头
function handleRequestHeaders(request) {
    console.log("正在修改请求头:", { url: request.url });
    return { headers: { ...request.headers, ...config.defaultHeaders } };
}

// 函数：处理响应头和响应体
function handleResponse(response) {
    console.log("正在修改响应内容:", { originalHeaders: response.headers });

    const modifiedBody = fixResponseBody(response.body);

    return {
        headers: { ...response.headers, ...config.modifiedResponseHeaders },
        body: modifiedBody
    };
}

// 主逻辑
if (typeof $response !== 'undefined') {
    console.log("检测到响应，URL:", $request.url);

    if (config.filePattern.test($request.url)) {
        $done(handleResponse($response));
    } else {
        console.log("不符合修改条件的响应 URL:", $request.url);
        $done(); // 不做处理
    }
} else if (typeof $request !== 'undefined') {
    console.log("检测到请求，URL:", $request.url);

    if (config.urlPattern.test($request.url)) {
        $done(handleRequestHeaders($request));
    } else {
        console.log("不符合修改条件的请求 URL:", $request.url);
        $done(); // 不做处理
    }
}