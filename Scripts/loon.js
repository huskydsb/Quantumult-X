/******************************
[Script]

^https:\/\/kelee\.one\/ url script-request-header https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js
^https:\/\/kelee\.one\/.*\.(plugin|js)$ url script-response-body https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js

[MITM]
hostname = kelee.one
********************************/

// 匹配 kelee.one 开头的 URL
const urlPattern = /^https:\/\/kelee\.one\//;

// 判断是否为请求头修改
if (urlPattern.test($request.url)) {
    // 构建修改后的请求头对象，只修改 User-Agent
    let modifiedHeaders = {
        ...$request.headers,
        'User-Agent': 'Loon/762 CFNetwork/1568.200.51 Darwin/24.1.0', // 特定的 User-Agent
    };

    // 返回修改后的请求头
    $done({ headers: modifiedHeaders });
} else {
    // 若不符合条件，直接返回
    $done({});
}