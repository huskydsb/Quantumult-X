/******************************
[Script]

^https:\/\/kelee\.one\/ url script-request-header https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js
^https:\/\/kelee\.one\/.*\.(plugin|js)$ url script-response-header https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js

[MITM]
hostname = kelee.one
********************************/

// 函数：尝试将乱码转换为可读文本
function decodeText(text) {
    try {
        // 假设乱码是由于错误的编码导致的，尝试使用不同的编码解码
        const decoder = new TextDecoder('utf-8', { fatal: false });
        const bytes = new Uint8Array([...text].map(char => char.charCodeAt(0)));
        return decoder.decode(bytes);
    } catch (e) {
        console.log("解码失败:", e);
        return text; // 如果解码失败，返回原始文本
    }
}

// 函数：处理请求头
function handleRequestHeaders(request) {
    const modifiedHeaders = {
        ...request.headers,
        'User-Agent': 'Loon/762 CFNetwork/1568.200.51 Darwin/24.1.0',
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
    return { headers: modifiedHeaders };
}

// 函数：处理响应头和响应体
function handleResponse(response) {
    const modifiedResponseHeaders = {
        'HTTP/1.1': '200 OK',
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': 'inline',
        'Cache-Control': 'no-cache',
        'Content-Encoding': 'identity',
        'Accept-Encoding': 'identity',
        'Sec-Fetch-Mode': 'navigate',
        'Connection': 'keep-alive',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Priority': 'u=0, i',
        'Sec-Fetch-Dest': 'document',
        'Host': 'kelee.one',
        'Sec-Fetch-Site': 'none',
        'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
        'User-Agent': 'Loon/762 CFNetwork/1568.200.51 Darwin/24.1.0'
    };

    let body = response.body;

    // 尝试解码乱码
    body = decodeText(body);

    // 如果有特定的乱码字符，可以进行替换
    body = body.replace(/特定乱码/g, "替换后的文本");

    return { headers: modifiedResponseHeaders, body: body };
}

// 主逻辑
if ($response) {
    console.log("处理响应 URL:", $request.url);

    if (filePattern.test($request.url)) {
        $done(handleResponse($response));
    } else {
        console.log("不符合修改条件的响应 URL:", $request.url);
        $done({});
    }
} else if ($request) {
    if (urlPattern.test($request.url)) {
        $done(handleRequestHeaders($request));
    } else {
        console.log("不符合修改条件的请求 URL:", $request.url);
        $done({});
    }
}