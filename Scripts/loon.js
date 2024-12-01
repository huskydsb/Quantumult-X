/********************************
[Script]

^https:\/\/kelee\.one\/ url script-request-header https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js
^https:\/\/kelee\.one\/.*\.(plugin|js)$ url script-response-header https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/loon.js

[MITM]
hostname = kelee.one
********************************/

// 匹配以 kelee.one 开头的 URL
const urlPattern = /^https:\/\/kelee\.one\//;
// 匹配 .plugin 和 .js 文件
const filePattern = /\.(plugin|js)$/;

// 判断是否为请求头修改
if (urlPattern.test($request.url)) {
    console.log("匹配到 kelee.one 的请求 URL:", $request.url);

    // 构建修改后的请求头对象
    let modifiedHeaders = {
        ...$request.headers,
        'User-Agent': 'Loon/762 CFNetwork/1568.200.51 Darwin/24.1.0', // 自定义 User-Agent
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

    console.log("修改后的请求头:", modifiedHeaders);

    // 返回修改后的请求头
    $done({ headers: modifiedHeaders });
} 
// 判断是否为 .plugin 或 .js 文件的响应头修改
else if ($response && filePattern.test($request.url)) {
    console.log("匹配到 .plugin 或 .js 文件的响应 URL:", $request.url);

    let modifiedResponseHeaders = {
        'HTTP/1.1': '200 OK',
        'Content-Type': 'text/plain; charset=utf-8', // 强制设置为 UTF-8 编码显示
        'Content-Disposition': 'inline', // 防止浏览器自动下载
        'Cache-Control': 'no-cache', // 防止缓存
        'Content-Encoding': 'identity', // 防止浏览器自动解压缩
        'Accept-Encoding': 'identity', // 确保内容不被压缩
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

    console.log("修改后的响应头:", modifiedResponseHeaders);

    // 返回修改后的响应头
    $done({ headers: modifiedResponseHeaders });
} else {
    console.log("不符合修改条件的请求 URL:", $request.url);
    // 若不符合上述条件，直接返回
    $done({});
}