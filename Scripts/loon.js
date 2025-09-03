/******************************

[Script]
^https:\/\/kelee\.one\/ url script-request-header https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js
^https:\/\/kelee\.one\/.* url script-response-body https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js

[MITM]
hostname = kelee.one

********************************/

function now() {
    return new Date().toLocaleString("zh-CN", { hour12: false });
}

if (typeof $request !== "undefined") {
    // 请求头修改
    let modifiedHeaders = {
        ...$request.headers,
        "Accept-Encoding": "gzip, deflate, br",
        "Accept": "*/*",
        "Connection": "keep-alive",
        "User-Agent": "Loon/877 CFNetwork/3860.100.1 Darwin/25.0.0",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "X-Requested-With": "Loon"
    };

    console.log(`📔 [Request UA Rewrite]
🕒 时间: ${now()}
🔗 URL: ${$request.url}
📝 UA: ${modifiedHeaders["User-Agent"]}
🌐 Host: ${$request.headers["Host"]}
--------------------------------`);

    $done({ headers: modifiedHeaders });
}

if (typeof $response !== "undefined") {
    // 响应头修改
    let modifiedHeaders = {
        ...$response.headers,
        "Content-Encoding": "identity",
    };

    let body = $response.body || "";

    console.log(`📔 [Response Modified]
🕒 时间: ${now()}
📦 Content-Encoding: ${modifiedHeaders["Content-Encoding"]}
📄 Body 内容预览:
${body.slice(0, 300)}   // 截取前 300 个字符
--------------------------------`);

    $done({ headers: modifiedHeaders, body: body });
}