/**
 * 海底捞获取cookie
[rewrite_local]
# 只抓取海底捞签到相关请求
^https:\/\/superapp-public\.kiwa-tech\.com\/activity\/wxapp\/signin\/.* url script-request-header hdl.js
[mitm]
hostname = superapp-public.kiwa-tech.kcom
 */

const $ = new Env("海底捞");//脚本名称
const ckName = "hdl_data";//环境变量声明
//-------------------- 一般不动变量区域 -------------------------------------
const Notify = 1;//0为关闭通知,1为打开通知,默认为1
const notify = $.isNode() ? require('./sendNotify') : '';//通知，用于适配青龙（可选）
let envSplitor = ["@"]; //多账号分隔符
let userCookie = ($.isNode() ? process.env[ckName] : $.getdata(ckName)) || '';//获取环境变量
let userList = [];//用于存储多账号列表
let userIdx = 0;//用于判断账号下标
let userCount = 0;//统计多账号数量
//调试
$.is_debug = ($.isNode() ? process.env.IS_DEDUG : $.getdata('is_debug')) || 'false';
// 为通知准备的空数组
$.notifyMsg = [];
//bark推送
$.barkKey = ($.isNode() ? process.env["bark_key"] : $.getdata("bark_key")) || '';
//---------------------- 自定义变量区域 -----------------------------------

// ----------------- 辅助函数与通用请求封装 -----------------
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function DoubleLog(msg) {
    console.log(msg);
}
function debug(...args) {
    if ($.is_debug && ($.is_debug === 'true' || $.is_debug === true)) {
        console.log(...args);
    }
}

// 通用 httpRequest，返回解析后的 JSON 或原始字符串
async function httpRequest(options = {}) {
    // options: {url, method, headers, body}
    // 优先使用 $task.fetch（QuanX），其次 $httpClient（Surge/Shadowrocket），再尝试 node-fetch/axios
    try {
        if (typeof $task !== "undefined" && $task.fetch) {
            let opt = {
                url: options.url,
                method: options.method || 'GET',
                headers: options.headers || {},
                body: options.body || ''
            };
            let resp = await $task.fetch(opt);
            let txt = resp.body;
            try { return JSON.parse(txt); } catch (e) { return txt; }
        } else if (typeof $httpClient !== "undefined" && $httpClient) {
            return new Promise((resolve) => {
                let req = {
                    url: options.url,
                    method: options.method || 'GET',
                    headers: options.headers || {},
                    body: options.body || ''
                };
                $httpClient.fetch ? $httpClient.fetch(req, (err, resp, body) => {
                    if (err) { resolve(null); }
                    else {
                        try { resolve(JSON.parse(body)); } catch (e) { resolve(body); }
                    }
                }) : $httpClient(req, (err, resp, body) => {
                    if (err) { resolve(null); }
                    else {
                        try { resolve(JSON.parse(body)); } catch (e) { resolve(body); }
                    }
                });
            });
        } else if ($.isNode()) {
            // Node 环境尝试使用 axios
            let axios;
            try { axios = require("axios"); } catch (e) { /* no axios */ }
            if (axios) {
                let resp = await axios({
                    url: options.url,
                    method: options.method || 'GET',
                    headers: options.headers || {},
                    data: options.body || ''
                });
                try { return resp.data; } catch (e) { return resp.data; }
            } else {
                console.log("Node 环境缺少 axios，请安装或使用内置环境");
                return null;
            }
        } else {
            console.log("无可用请求客户端");
            return null;
        }
    } catch (e) {
        console.log("httpRequest exception:", e);
        return null;
    }
}

// ----------------- 用户类与业务逻辑 -----------------
class UserInfo {
    constructor(str) {
        this.index = ++userIdx;//账号执行顺序
        this.token = str;//读取环境变量
        this.ckStatus = true//判断ck是否有效
        //通用请求头
        this.headers = {
            'Authorization': this.token,
            'Content-Type': 'application/json'
        }
    }
    //随机等待时间
    getRandomTime() {
        return randomInt(1000, 3000)
    }
    //签到函数
    async point() {
        try {
            let options = {
                url: `https://superapp-public.kiwa-tech.com/activity/wxapp/signin/queryFragment`,
                method: 'POST',
                headers: {
                    'Host': 'superapp-public.kiwa-tech.com',
                    'deviceid': 'null',
                    'accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'user-agent': 'Mozilla/5.0 (Linux; Android 10; MI 8 Lite Build/QKQ1.190910.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4435 MMWEBSDK/20221206 Mobile Safari/537.36 MMWEBID/2585 MicroMessenger/8.0.32.2300(0x2800205D) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 miniProgram/wx1ddeb67115f30d1a',
                    'reqtype': 'APPH5',
                    '_haidilao_app_token': this.token,
                    'origin': 'https://superapp-public.kiwa-tech.com',
                    'x-requested-with': 'com.tencent.mm',
                    'sec-fetch-site': 'same-origin',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-dest': 'empty',
                    'referer': 'https://superapp-public.kiwa-tech.com/app-sign-in/?SignInToken=TOKEN_APP&source=MiniApp',
                },
                body: ''
            }
            let result = await httpRequest(options);
            debug(result)
            if (result && result.success == true) {
                DoubleLog(`🔷账号${this.index} >> 签到/碎片查询成功, 当前共 ${result.data?.total || 0} 碎片🧩`);
                this.ckStatus = true
            } else {
                debug(result);
                DoubleLog(`🔶账号${this.index} >> 查询返回: ${JSON.stringify(result)}`);
            }
        } catch (e) {
            console.log(e);
        }
    }
    //查询签到（执行签到）
    async signin() {
        try {
            let options = {
                url: `https://superapp-public.kiwa-tech.com/activity/wxapp/signin/signin`,
                method: 'POST',
                headers: {
                    'Host': 'superapp-public.kiwa-tech.com',
                    'deviceid': 'null',
                    'accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'user-agent': 'Mozilla/5.0 (Linux; Android 10; MI 8 Lite Build/QKQ1.190910.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4435 MMWEBSDK/20221206 Mobile Safari/537.36 MMWEBID/2585 MicroMessenger/8.0.32.2300(0x2800205D) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 miniProgram/wx1ddeb67115f30d1a',
                    'reqtype': 'APPH5',
                    '_haidilao_app_token': this.token,
                    'origin': 'https://superapp-public.kiwa-tech.com',
                    'x-requested-with': 'com.tencent.mm',
                    'sec-fetch-site': 'same-origin',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-dest': 'empty',
                    'referer': 'https://superapp-public.kiwa-tech.com/app-sign-in/?SignInToken=TOKEN_APP&source=MiniApp',
                },
                body: JSON.stringify({ "signinSource": "MiniApp" })
            }
            let result = await httpRequest(options);
            debug(result)
            if (result && result.success == true) {
                this.signMsg=`✅签到成功`;
                DoubleLog(`🔷账号${this.index} >> ${this.signMsg}`);
            } else {
                this.signMsg=`❌${result?.msg || JSON.stringify(result)}`;
                DoubleLog(`🔶账号${this.index} >> ${this.signMsg}`);
            }
        } catch (e) {
            console.log(e);
        }
    }

    //检查用户ck是否失效（示例，用于通用校验）
    async check() {
        let signinRequest = {
            //示例接口（非海底捞），如果你不需要可注释或替换为海底捞真实校验接口
            url: `https://vip.heytea.com/api/service-member/vip/task/member`,
            headers: this.headers,
            method: 'GET'
        };
        let result = await httpRequest(signinRequest);
        if (result && result.code == 0) {
            console.log(`✅check success!`)
        } else {
            this.ckStatus = false;
            console.log(`❌账号${this.index} >> check ck error!`)
        }
    }

}

//获取Cookie（改进版：不区分大小写、支持多位置提取、只抓一次）
async function getCookie() {
    if (!$request) {
        $done({});
        return;
    }
    // 若已存在 token，则直接跳过（只抓一次）
    try {
        const existing = (typeof $.getdata === 'function') ? $.getdata(ckName) : ($persistentStore && $persistentStore.read && $persistentStore.read(ckName));
        if (existing) {
            console.log('hdl_debug => 已存在 token，跳过抓取。');
            $done({});
            return;
        }
    } catch (e) { /* ignore */ }

    // 跳过预检请求（OPTIONS），以免误抓
    if ($request.method && $request.method.toUpperCase() === 'OPTIONS') {
        $done({});
        return;
    }

    try {
        const rawHeaders = $request.headers || {};
        // 将 headers key 全部降为小写映射到新的对象，值保持不变
        const headers = {};
        Object.keys(rawHeaders || {}).forEach(k => {
            try { headers[k.toLowerCase()] = rawHeaders[k]; } catch(e){}
        });

        // 尝试常见位置（不区分大小写）
        const auth = headers['authorization'] || '';
        const hdlHeader = headers['_haidilao_app_token'] || headers['_haidilao_app_token'.toLowerCase()] || headers['_haidiaol_app_token'] || '';
        // 从 Cookie 提取 _haidilao_app_token（不区分大小写）
        const cookie = headers['cookie'] || '';
        let cookieToken = '';
        const ckMatch = cookie.match(/_haidilao_app_token=([^;,\s]+)/i);
        if (ckMatch) cookieToken = ckMatch[1];

        const tokenValue = auth || hdlHeader || cookieToken || '';

        // 保存完整 headers（仅用于调试）
        try {
            if ($persistentStore && $persistentStore.write) {
                $persistentStore.write(JSON.stringify(rawHeaders), 'hdl_debug_headers');
            }
        } catch (e) {
            console.log('persistentStore write error:', e);
        }

        if (tokenValue) {
            // 保存到脚本原本使用的 key，兼容原逻辑
            if (typeof $.setdata === 'function') {
                $.setdata(tokenValue, ckName);
            } else if ($persistentStore && $persistentStore.write) {
                $persistentStore.write(tokenValue, ckName);
            }
            console.log('hdl_debug => 找到 token:', tokenValue.length > 120 ? tokenValue.slice(0,80) + '...' + tokenValue.slice(-20) : tokenValue);
            try { $notification && $notification.post && $notification.post('海底捞', '', '获取签到Cookie成功🎉'); } catch(e){}
        } else {
            console.log('hdl_debug => 未在请求头或 Cookie 中找到 token（已保存 headers 到 hdl_debug_headers）');
            try { $notification && $notification.post && $notification.post('海底捞', '', '错误获取签到Cookie失败（调试已保存 headers）'); } catch(e){}
        }
    } catch (e) {
        console.log('hdl_debug exception:', e);
    } finally {
        $done({});
    }
}

// 主任务入口
async function main() {
    console.log('\n================== 任务开始 ==================\n');
    // 准备 userList
    userList = [];
    userIdx = 0;
    userCookie = ($.isNode() ? process.env[ckName] : $.getdata(ckName)) || '';
    if (!userCookie) {
        console.log('未检测到 hdl_data 环境变量，请先抓取 token 后再运行签到任务。');
        return;
    }
    // 支持多账号，以 envSplitor 分隔
    let arr = [];
    if (Array.isArray(envSplitor)) {
        // 支持多分隔符
        let tmp = [userCookie];
        for (let sp of envSplitor) {
            tmp = tmp.flatMap(x => x.split(sp));
        }
        arr = tmp.filter(x => x && x.trim());
    } else {
        arr = userCookie.split(envSplitor).filter(x => x && x.trim());
    }
    userCount = arr.length;
    for (let s of arr) {
        userList.push(new UserInfo(s.trim()));
    }

    // 执行任务
    let taskall = [];
    for (let user of userList) {
        if (user.ckStatus) {
            DoubleLog(`🔷账号${user.index} >> Start work`)
            console.log(`随机延迟${user.getRandomTime()}ms`);
            // 顺序执行签到相关接口，避免并发冲突
            await $.wait(user.getRandomTime());
            await user.signin();
            await $.wait(user.getRandomTime());
            await user.point();
            await $.wait(user.getRandomTime());
        } else {
            $.notifyMsg.push(`❌账号${user.index} >> Check ck error!`)
        }
    }
    console.log('\n================== 任务结束 ==================\n');
}

// 运行入口判定：若是请求触发则执行 getCookie，否则执行 main
if (typeof $request !== 'undefined' && $request) {
    // 被 rewrite 拦截的请求会走这里，执行抓取 token
    getCookie();
} else {
    // 非拦截环境（如定时任务 / Node 环境）执行主任务
    (async () => {
        await main();
    })();
}

// ----------------- 简单 Env 类（轻量适配） -----------------
function Env(name) {
    this.name = name || "script";
    this.isNode = function() {
        return typeof process !== 'undefined' && !!process.versions;
    };
    this.log = function(...args) {
        console.log(...args);
    };
    this.wait = function(t) {
        return new Promise(resolve => setTimeout(resolve, t));
    };
    // getdata / setdata 兼容不同平台
    this.getdata = function(key) {
        try {
            if (this.isNode()) return process.env[key];
            if (typeof $persistentStore !== "undefined" && $persistentStore.read) return $persistentStore.read(key);
            if (typeof $prefs !== "undefined" && $prefs.valueForKey) return $prefs.valueForKey(key);
            return null;
        } catch (e) { return null; }
    };
    this.setdata = function(val, key) {
        try {
            if (this.isNode()) {
                // Node 环境无法直接写到 process.env 永久保存，建议用户在青龙面板上设置环境变量
                return false;
            }
            if (typeof $persistentStore !== "undefined" && $persistentStore.write) return $persistentStore.write(val, key);
            if (typeof $prefs !== "undefined" && $prefs.setValueForKey) return $prefs.setValueForKey(val, key);
            return false;
        } catch (e) { return false; }
    };
    this.msg = function(title = this.name, subtitle = '', message = '') {
        try {
            if (this.isNode()) {
                console.log(`${title} - ${subtitle} - ${message}`);
            } else if (typeof $notification !== "undefined" && $notification.post) {
                $notification.post(title, subtitle, message);
            } else {
                console.log(`${title} - ${subtitle} - ${message}`);
            }
        } catch (e) { console.log(e); }
    };
}