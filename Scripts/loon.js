/******************************

[Script]
# 修改请求头
^https:\/\/kelee\.one\/ url script-request-header https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js

# 打印响应内容
^https:\/\/kelee\.one\/.* url script-response-body https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js

[MITM]
hostname = kelee.one

********************************/

function now() {
    return new Date().toLocaleString("zh-CN", { hour12: false });
}

// 请求头改写
if (typeof $request !== "undefined") {
    let modifiedHeaders = {
        ...$request.headers,
        "User-Agent": "Loon/877 CFNetwork/3860.100.1 Darwin/25.0.0",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept": "*/*",
        "Connection": "keep-alive",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "X-Requested-With": "Loon"
    };

    console.log(`📔 [Request UA Rewrite]
🕒 ${now()}
🔗 URL: ${$request.url}
📝 UA: ${modifiedHeaders["User-Agent"]}
--------------------------------`);

    $done({ headers: modifiedHeaders });
}

// 响应内容打印
if (typeof $response !== "undefined") {
    let modifiedHeaders = {
        ...$response.headers,
        "Content-Encoding": "identity", // 避免 gzip 压缩
    };

    let body = $response.body || "";

    console.log(`📔 [Response Body Log]
🕒 ${now()}
🔗 URL: ${$request.url}
📦 Content-Encoding: identity
📄 Body 内容(前300字):
${body.slice(0, 300)}
--------------------------------`);

    $done({ headers: modifiedHeaders, body: body });
}