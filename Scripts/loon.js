/******************************

[Script]

^https:\/\/kelee\.one\/ url script-request-header https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js
^https:\/\/kelee\.one\/.*\.(plx|js)$ url script-response-header https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js

[MITM]
hostname = kelee.one

********************************/

function getTime() {
    const now = new Date();
    return now.toISOString().replace("T", " ").split(".")[0]; // YYYY-MM-DD HH:mm:ss
}

if (typeof $request !== "undefined") {
    let modifiedHeaders = {
        ...$request.headers,
        "Accept-Encoding": "gzip, deflate, br",
        "Accept": "*/*",
        "Connection": "keep-alive",
        "Host": "kelee.one",
        "User-Agent": "Loon/877 CFNetwork/3860.100.1 Darwin/25.0.0",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "X-Requested-With": "Loon"
    };

    // 📔 打印请求日志
    console.log(`📔 [Request UA Rewrite]
🕒 时间: ${getTime()}
🔗 URL: ${$request.url}
📝 UA: ${modifiedHeaders["User-Agent"]}
🌐 Host: ${modifiedHeaders["Host"]}
--------------------------------`);

    $done({ headers: modifiedHeaders });
}

if (typeof $response !== "undefined") {
    let modifiedHeaders = {
        ...$response.headers,
        "Content-Encoding": "identity",
    };

    let body = $response.body;

    // 📔 打印响应日志（包含内容）
    console.log(`📔 [Response Modified]
🕒 时间: ${getTime()}
🔗 URL: ${$request.url}
📦 Content-Encoding: ${modifiedHeaders["Content-Encoding"]}
📄 Body 内容预览:
${body ? body.slice(0, 300) : "空"}
--------------------------------`);

    $done({ headers: modifiedHeaders, body: body });
}