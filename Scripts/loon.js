/******************************

[Script]

^https:\/\/kelee\.one\/ url script-request-header https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js
^https:\/\/kelee\.one\/.*\.(plx|js)$ url script-response-header https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js

[MITM]
hostname = kelee.one

********************************/

if (typeof $request !== "undefined") {
    let modifiedHeaders = {
        ...$request.headers,
        "Accept-Encoding": "gzip, deflate, br",
        "Accept": "*/*",
        "Connection": "keep-alive",
        // Host 可以直接用 $request.headers["Host"]，不需要再解析 url
        "Host": "kelee.one",
        "User-Agent": "Loon/877 CFNetwork/3860.100.1 Darwin/25.0.0",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "X-Requested-With": "Loon"
    };

    $done({ headers: modifiedHeaders });
}

if (typeof $response !== "undefined") {
    let modifiedHeaders = {
        ...$response.headers,
        "Content-Encoding": "identity",
    };

    let body = $response.body;

    $done({ headers: modifiedHeaders, body: body });
}