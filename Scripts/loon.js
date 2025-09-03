/******************************

[Script]

^https:\/\/kelee\.one\/ url script-request-header https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js
^https:\/\/kelee\.one\/.*\.(plugin|js)$ url script-response-header https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js

[MITM]
hostname = kelee.one

********************************/

if (typeof $request !== "undefined") {
    let modifiedHeaders = {
        ...$request.headers,
        "Accept-Encoding": "gzip, deflate, br",
    "Accept": "*/*",
    "Connection": "keep-alive",
    "Host": url.replace(/^https?:\/\//, "").split("/")[0],
    "User-Agent": ua,
    "Accept-Language": "zh-CN,zh-Hans;q=0.9",
    "X-Requested-With": "Loon"
    };

    $done({ headers: modifiedHeaders });
}

if (typeof $response !== "undefined") {
    let modifiedHeaders = {
        ...$response.headers,
        'Content-Encoding': 'identity',
    };

    let body = $response.body;

    $done({ headers: modifiedHeaders, body: body });
}
