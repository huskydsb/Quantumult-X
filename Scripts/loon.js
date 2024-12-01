/******************************

[Script]

^https:\/\/kelee\.one\/ url script-request-header https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js
^https:\/\/kelee\.one\/.*\.(plugin|js)$ url script-response-header https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js
^https:\/\/kelee\.one\/.*\.(plugin|js)$ url script-response-body https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js

[MITM]
hostname = kelee.one

********************************/

if (typeof $request !== "undefined") {
    // 修改请求头逻辑
    let modifiedHeaders = {
        ...$request.headers,
        'User-Agent': 'Loon/762 CFNetwork/1568.200.51 Darwin/24.1.0', // 你的 UA
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
        'Connection': 'keep-alive',
        'Host': 'kelee.one',
    };

    $done({ headers: modifiedHeaders });
}

if (typeof $response !== "undefined") {
    // 修改响应头逻辑
    let modifiedHeaders = {
        ...$response.headers,
        'Content-Encoding': 'identity',
    };

    let body = $response.body;

    // 只返回修改后的响应体
    $done({ headers: modifiedHeaders, body: body });
}