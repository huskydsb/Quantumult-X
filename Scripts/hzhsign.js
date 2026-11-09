
/*******************************
 * 华住会酒店签到 + 积分查询
 * Quantumult X
 *******************************/

const $ = new Env("华住会酒店");

const token_key = "HZH_Token";
const token = $.getdata(token_key);

let message = "";
let pointData = null;

// ========= 日志 =========
function log(type, msg) {
  const time = new Date().toLocaleString();
  console.log(`[${time}] ${type} ${msg}`);
}

// ========= 请求 =========
function request(options) {
  return new Promise((resolve, reject) => {
    $task.fetch(options).then(
      response => {
        if (!response) {
          reject(new Error("请求无响应"));
          return;
        }

        const statusCode = response.statusCode;

        log("🌐", "HTTP状态码：" + statusCode);

        if (statusCode < 200 || statusCode >= 300) {
          reject(new Error("HTTP请求失败：" + statusCode));
          return;
        }

        try {
          const result = JSON.parse(response.body);
          resolve(result);
        } catch (e) {
          reject(new Error("JSON解析失败：" + e.message));
        }
      },
      error => {
        reject(new Error("网络请求失败：" + error));
      }
    );
  });
}

// ========= 通用请求头 =========
function getHeaders() {
  return {
    "Cookie": "userToken=" + token,
    "userToken": token,
    "usertoken": token,
    "token": token,
    "Accept": "application/json",
    "client-platform": "APP-IOS",
    "User-Agent": "com.htinns.iphone/124"
  };
}

// ========= 1. 签到 =========
async function signIn() {
  log("🔔", "开始执行签到");

  const timestamp = Math.floor(Date.now() / 1000);

  const url =
    "https://appgw.huazhu.com/game/sign_in?date=" + timestamp;

  try {
    const result = await request({
      url: url,
      method: "GET",
      headers: getHeaders()
    });

    log("📥", "签到接口返回：" + JSON.stringify(result));

    const code = result.code;
    const resultMessage =
      result.message ||
      result.msg ||
      (result.content && result.content.message) ||
      "";

    // 今日已经签到：属于正常状态
    if (
      resultMessage.indexOf("今日已签到") !== -1 ||
      resultMessage.indexOf("已经签到") !== -1 ||
      resultMessage.indexOf("已签到") !== -1
    ) {
      message += "✅ 签到状态：今日已签到\n";
      log("✅", "今日已经签到");
      return;
    }

    // 签到成功
    if (code === 200) {
      const reward =
        result.content && result.content.point !== undefined
          ? result.content.point
          : "";

      message += "✅ 签到成功";

      if (reward !== "") {
        message += "，本次奖励：" + reward + "积分";
      }

      message += "\n";

      log("✅", "签到成功");
      return;
    }

    // 其他业务异常
    message += "❌ 签到异常：" +
      (resultMessage || "未知业务响应") + "\n";

    log("❌", "签到异常：" + resultMessage);

  } catch (e) {
    message += "❌ 签到请求异常：" + e.message + "\n";
    log("❌", "签到请求异常：" + e.message);
  }
}

// ========= 2. 查询当前积分 =========
async function getPoint() {
  log("🔎", "开始查询会员积分");

  const url =
    "https://hweb-personalcenter.huazhu.com/v2/personalCenter/rightAndInterest/getMemberSignPoint";

  try {
    const result = await request({
      url: url,
      method: "GET",
      headers: getHeaders()
    });

    log("📥", "积分接口返回：" + JSON.stringify(result));

    if (
      result.content &&
      result.content.pointModel
    ) {
      pointData = result.content;

      const pointModel = pointData.pointModel;

      const currentPoint =
        pointModel.pointNum !== undefined
          ? pointModel.pointNum
          : "--";

      const newPointText =
        pointModel.pointSubTitle || "";

      log("✅", "当前积分：" + currentPoint);
      log("✅", "积分信息：" + newPointText);

      return;
    }

    message += "⚠️ 积分查询失败：接口未返回积分数据\n";

  } catch (e) {
    message += "⚠️ 积分查询异常：" + e.message + "\n";
    log("❌", "积分查询异常：" + e.message);
  }
}

// ========= 3. 汇总通知 =========
function sendNotification() {
  let currentPoint = "--";
  let newPoint = "暂无新增积分";

  if (pointData && pointData.pointModel) {
    const pointModel = pointData.pointModel;

    currentPoint =
      pointModel.pointNum !== undefined
        ? pointModel.pointNum
        : "--";

    const subtitle = pointModel.pointSubTitle || "";

    if (subtitle) {
      // 从“新到账1积分”等文字中提取积分数字
      const match = subtitle.match(/(\d+(?:\.\d+)?)\s*积分/);

      if (match) {
        newPoint = "+" + match[1] + "积分";
      } else {
        newPoint = subtitle;
      }
    }
  }

  const subtitle =
    "当前积分：" + currentPoint +
    "  |  新到账：" + newPoint;

  $.msg(
    $.name,
    subtitle,
    message.trim() || "华住会签到及积分查询完成"
  );

  log("📣", subtitle);
}

// ========= 主程序 =========
(async () => {
  try {
    if (!token) {
      message = "❌ 未读取到华住会Token，请检查持久化变量 HZH_Token";
      log("❌", message);
      sendNotification();
      return;
    }

    // 先签到
    await signIn();

    // 再查询积分
    await getPoint();

    // 最后统一通知
    sendNotification();

  } catch (e) {
    log("❌", "脚本执行异常：" + e.message);

    $.msg(
      $.name,
      "脚本执行异常",
      e.message
    );

  } finally {
    $.done();
  }
})();

// ========= Env =========
function Env(t, e) {
  class s {
    constructor(t) {
      this.env = t;
    }
    send(t, e = "GET") {
      t = "string" == typeof t ? { url: t } : t;
      let s = this.get;
      "POST" === e && (s = this.post);
      const r = new Promise((e, r) => {
        s.call(this, t, (t, s, i) => {
          t ? r(t) : e(s);
        });
      });
      return t.timeout
        ? ((t, e = 1e3) =>
            Promise.race([
              t,
              new Promise((t, s) => {
                setTimeout(() => {
                  s(new Error("请求超时"));
                }, e);
              }),
            ]))(r, t.timeout)
        : r;
    }
    get(t) {
      return this.send.call(this.env, t);
    }
    post(t) {
      return this.send.call(this.env, t, "POST");
    }
  }
  return new (class {
    constructor(t, e) {
      ((this.logLevels = { debug: 0, info: 1, warn: 2, error: 3 }),
        (this.logLevelPrefixs = {
          debug: "[DEBUG] ",
          info: "[INFO] ",
          warn: "[WARN] ",
          error: "[ERROR] ",
        }),
        (this.logLevel = "info"),
        (this.name = t),
        (this.http = new s(this)),
        (this.data = null),
        (this.dataFile = "box.dat"),
        (this.logs = []),
        (this.isMute = !1),
        (this.isNeedRewrite = !1),
        (this.logSeparator = "\n"),
        (this.encoding = "utf-8"),
        (this.startTime = new Date().getTime()),
        Object.assign(this, e),
        this.log("", `🔔${this.name}, 开始!`));
    }
    getEnv() {
      return "undefined" != typeof Egern
        ? "Egern"
        : "undefined" != typeof $environment && $environment["surge-version"]
          ? "Surge"
          : "undefined" != typeof $environment && $environment["stash-version"]
            ? "Stash"
            : "undefined" != typeof module && module.exports
              ? "Node.js"
              : "undefined" != typeof $task
                ? "Quantumult X"
                : "undefined" != typeof $loon
                  ? "Loon"
                  : "undefined" != typeof $rocket
                    ? "Shadowrocket"
                    : void 0;
    }
    isNode() {
      return "Node.js" === this.getEnv();
    }
    isQuanX() {
      return "Quantumult X" === this.getEnv();
    }
    isSurge() {
      return "Surge" === this.getEnv();
    }
    isLoon() {
      return "Loon" === this.getEnv();
    }
    isShadowrocket() {
      return "Shadowrocket" === this.getEnv();
    }
    isStash() {
      return "Stash" === this.getEnv();
    }
    isEgern() {
      return "Egern" === this.getEnv();
    }
    toObj(t, e = null) {
      try {
        return JSON.parse(t);
      } catch {
        return e;
      }
    }
    toStr(t, e = null, ...s) {
      try {
        return JSON.stringify(t, ...s);
      } catch {
        return e;
      }
    }
    getjson(t, e) {
      let s = e;
      if (this.getdata(t))
        try {
          s = JSON.parse(this.getdata(t));
        } catch {}
      return s;
    }
    setjson(t, e) {
      try {
        return this.setdata(JSON.stringify(t), e);
      } catch {
        return !1;
      }
    }
    getScript(t) {
      return new Promise((e) => {
        this.get({ url: t }, (t, s, r) => e(r));
      });
    }
    runScript(t, e) {
      return new Promise((s) => {
        let r = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        r = r ? r.replace(/\n/g, "").trim() : r;
        let i = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        ((i = i ? 1 * i : 20), (i = e && e.timeout ? e.timeout : i));
        const [o, a] = r.split("@"),
          n = {
            url: `http://${a}/v1/scripting/evaluate`,
            body: { script_text: t, mock_type: "cron", timeout: i },
            headers: { "X-Key": o, Accept: "*/*" },
            policy: "DIRECT",
            timeout: i,
          };
        this.post(n, (t, e, r) => s(r));
      }).catch((t) => this.logErr(t));
    }
    loaddata() {
      if (!this.isNode()) return {};
      {
        ((this.fs = this.fs ? this.fs : require("fs")),
          (this.path = this.path ? this.path : require("path")));
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          r = !s && this.fs.existsSync(e);
        if (!s && !r) return {};
        {
          const r = s ? t : e;
          try {
            return JSON.parse(this.fs.readFileSync(r));
          } catch (t) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        ((this.fs = this.fs ? this.fs : require("fs")),
          (this.path = this.path ? this.path : require("path")));
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          r = !s && this.fs.existsSync(e),
          i = JSON.stringify(this.data);
        s
          ? this.fs.writeFileSync(t, i)
          : r
            ? this.fs.writeFileSync(e, i)
            : this.fs.writeFileSync(t, i);
      }
    }
    lodash_get(t, e, s = void 0) {
      const r = e.replace(/\[(\d+)\]/g, ".$1").split(".");
      let i = t;
      for (const t of r) if (((i = Object(i)[t]), void 0 === i)) return s;
      return i;
    }
    lodash_set(t, e, s) {
      return (
        Object(t) !== t ||
          (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []),
          (e
            .slice(0, -1)
            .reduce(
              (t, s, r) =>
                Object(t[s]) === t[s]
                  ? t[s]
                  : (t[s] = (Math.abs(e[r + 1]) | 0) === +e[r + 1] ? [] : {}),
              t,
            )[e[e.length - 1]] = s)),
        t
      );
    }
    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        const [, s, r] = /^@(.*?)\.(.*?)$/.exec(t),
          i = s ? this.getval(s) : "";
        if (i)
          try {
            const t = JSON.parse(i);
            e = t ? this.lodash_get(t, r, "") : e;
          } catch (t) {
            e = "";
          }
      }
      return e;
    }
    setdata(t, e) {
      let s = !1;
      if (/^@/.test(e)) {
        const [, r, i] = /^@(.*?)\.(.*?)$/.exec(e),
          o = this.getval(r),
          a = r ? ("null" === o ? null : o || "{}") : "{}";
        try {
          const e = JSON.parse(a);
          (this.lodash_set(e, i, t), (s = this.setval(JSON.stringify(e), r)));
        } catch (e) {
          const o = {};
          (this.lodash_set(o, i, t), (s = this.setval(JSON.stringify(o), r)));
        }
      } else s = this.setval(t, e);
      return s;
    }
    getval(t) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        case "Egern":
          return $persistentStore.read(t);
        case "Quantumult X":
          return $prefs.valueForKey(t);
        case "Node.js":
          return ((this.data = this.loaddata()), this.data[t]);
        default:
          return (this.data && this.data[t]) || null;
      }
    }
    setval(t, e) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        case "Egern":
          return $persistentStore.write(t, e);
        case "Quantumult X":
          return $prefs.setValueForKey(t, e);
        case "Node.js":
          return (
            (this.data = this.loaddata()),
            (this.data[e] = t),
            this.writedata(),
            !0
          );
        default:
          return (this.data && this.data[e]) || null;
      }
    }
    initGotEnv(t) {
      if (
        ((this.got = this.got ? this.got : require("got")),
        (this.cktough = this.cktough ? this.cktough : require("tough-cookie")),
        (this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()),
        t &&
          ((t.headers = t.headers ? t.headers : {}),
          t &&
            ((t.headers = t.headers ? t.headers : {}),
            void 0 === t.headers.cookie &&
              void 0 === t.headers.Cookie &&
              void 0 === t.cookieJar &&
              (t.cookieJar = this.ckjar)),
          void 0 === t.agent))
      ) {
        const e = this.getProxyAgent(t.url);
        e && (t.agent = e);
      }
    }
    getProxyAgent(t) {
      const e = process.env;
      if (void 0 === this.proxyAgent) {
        this.proxyAgent = null;
        const t = e.http_proxy || e.HTTP_PROXY,
          s = e.https_proxy || e.HTTPS_PROXY;
        if (t || s)
          try {
            const {
              HttpProxyAgent: e,
              HttpsProxyAgent: r,
            } = require("hpagent");
            ((this.proxyAgent = {}),
              t && (this.proxyAgent.http = new e({ proxy: t })),
              s && (this.proxyAgent.https = new r({ proxy: s })));
          } catch (t) {
            ((this.proxyAgent = null),
              this.log(
                "",
                `❗️${this.name}, 代理未生效!`,
                "MODULE_NOT_FOUND" === t.code
                  ? "请先安装依赖: npm i hpagent"
                  : t.message,
              ));
          }
      }
      if (!this.proxyAgent) return;
      const s = e.no_proxy || e.NO_PROXY;
      if (s) {
        let e, r;
        try {
          const s = new URL(String(t));
          ((e = s.hostname),
            (r = s.port || ("https:" === s.protocol ? "443" : "80")));
        } catch {
          return this.proxyAgent;
        }
        if (
          s
            .split(/[\s,]+/)
            .filter(Boolean)
            .some((t) => {
              if ("*" === t) return !0;
              const [s, i] = t.split(":");
              if (i && i !== r) return !1;
              const o = s.replace(/^\*?\./, "");
              return e === o || e.endsWith(`.${o}`);
            })
        )
          return;
      }
      return this.proxyAgent;
    }
    get(t, e = () => {}) {
      switch (
        (t.headers &&
          (delete t.headers["Content-Type"],
          delete t.headers["Content-Length"],
          delete t.headers["content-type"],
          delete t.headers["content-length"]),
        t.params && (t.url += "?" + this.queryStr(t.params)),
        void 0 === t.followRedirect ||
          t.followRedirect ||
          ((this.isSurge() || this.isLoon()) && (t["auto-redirect"] = !1),
          this.isQuanX() &&
            (t.opts
              ? (t.opts.redirection = !1)
              : (t.opts = { redirection: !1 }))),
        this.getEnv())
      ) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        case "Egern":
        default:
          (this.isSurge() &&
            this.isNeedRewrite &&
            ((t.headers = t.headers || {}),
            Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })),
            $httpClient.get(t, (t, s, r) => {
              (!t &&
                s &&
                ((s.body = r),
                (s.statusCode = s.status ? s.status : s.statusCode),
                (s.status = s.statusCode)),
                e(t, s, r));
            }));
          break;
        case "Quantumult X":
          (this.isNeedRewrite &&
            ((t.opts = t.opts || {}), Object.assign(t.opts, { hints: !1 })),
            $task.fetch(t).then(
              (t) => {
                const {
                  statusCode: s,
                  statusCode: r,
                  headers: i,
                  body: o,
                  bodyBytes: a,
                } = t;
                e(
                  null,
                  {
                    status: s,
                    statusCode: r,
                    headers: i,
                    body: o,
                    bodyBytes: a,
                  },
                  o,
                  a,
                );
              },
              (t) => e((t && t.error) || "UndefinedError"),
            ));
          break;
        case "Node.js":
          let s = require("iconv-lite");
          (this.initGotEnv(t),
            this.got(t)
              .on("redirect", (t, e) => {
                try {
                  const s =
                      t.url ||
                      t.request?.requestUrl ||
                      t.request?.options?.url ||
                      e.url,
                    r = t.headers?.["set-cookie"],
                    i = Array.isArray(r) ? r : [r];
                  for (const t of i)
                    try {
                      t && s && this.ckjar.setCookieSync(t, String(s));
                    } catch (t) {
                      this.logErr(t);
                    }
                  e.cookieJar = this.ckjar;
                } catch (t) {
                  this.logErr(t);
                }
              })
              .then(
                (t) => {
                  const {
                      statusCode: r,
                      statusCode: i,
                      headers: o,
                      rawBody: a,
                    } = t,
                    n = s.decode(a, this.encoding);
                  e(
                    null,
                    {
                      status: r,
                      statusCode: i,
                      headers: o,
                      rawBody: a,
                      body: n,
                    },
                    n,
                  );
                },
                (t) => {
                  const { message: r, response: i } = t;
                  e(r, i, i && s.decode(i.rawBody, this.encoding));
                },
              ));
      }
    }
    post(t, e = () => {}) {
      const s = t.method ? t.method.toLocaleLowerCase() : "post";
      switch (
        (t.body &&
          t.headers &&
          !t.headers["Content-Type"] &&
          !t.headers["content-type"] &&
          (t.headers["content-type"] = "application/x-www-form-urlencoded"),
        t.headers &&
          (delete t.headers["Content-Length"],
          delete t.headers["content-length"]),
        void 0 === t.followRedirect ||
          t.followRedirect ||
          ((this.isSurge() || this.isLoon()) && (t["auto-redirect"] = !1),
          this.isQuanX() &&
            (t.opts
              ? (t.opts.redirection = !1)
              : (t.opts = { redirection: !1 }))),
        this.getEnv())
      ) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        case "Egern":
        default:
          (this.isSurge() &&
            this.isNeedRewrite &&
            ((t.headers = t.headers || {}),
            Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })),
            $httpClient[s](t, (t, s, r) => {
              (!t &&
                s &&
                ((s.body = r),
                (s.statusCode = s.status ? s.status : s.statusCode),
                (s.status = s.statusCode)),
                e(t, s, r));
            }));
          break;
        case "Quantumult X":
          ((t.method = s),
            this.isNeedRewrite &&
              ((t.opts = t.opts || {}), Object.assign(t.opts, { hints: !1 })),
            $task.fetch(t).then(
              (t) => {
                const {
                  statusCode: s,
                  statusCode: r,
                  headers: i,
                  body: o,
                  bodyBytes: a,
                } = t;
                e(
                  null,
                  {
                    status: s,
                    statusCode: r,
                    headers: i,
                    body: o,
                    bodyBytes: a,
                  },
                  o,
                  a,
                );
              },
              (t) => e((t && t.error) || "UndefinedError"),
            ));
          break;
        case "Node.js":
          let r = require("iconv-lite");
          this.initGotEnv(t);
          const { url: i, ...o } = t;
          this.got[s](i, o).then(
            (t) => {
              const {
                  statusCode: s,
                  statusCode: i,
                  headers: o,
                  rawBody: a,
                } = t,
                n = r.decode(a, this.encoding);
              e(
                null,
                { status: s, statusCode: i, headers: o, rawBody: a, body: n },
                n,
              );
            },
            (t) => {
              const { message: s, response: i } = t;
              e(s, i, i && r.decode(i.rawBody, this.encoding));
            },
          );
      }
    }
    time(t, e = null) {
      const s = e ? new Date(e) : new Date();
      let r = {
        "M+": s.getMonth() + 1,
        "d+": s.getDate(),
        "H+": s.getHours(),
        "m+": s.getMinutes(),
        "s+": s.getSeconds(),
        "q+": Math.floor((s.getMonth() + 3) / 3),
        S: s.getMilliseconds(),
      };
      /(y+)/.test(t) &&
        (t = t.replace(
          RegExp.$1,
          (s.getFullYear() + "").substr(4 - RegExp.$1.length),
        ));
      for (let e in r)
        new RegExp("(" + e + ")").test(t) &&
          (t = t.replace(
            RegExp.$1,
            1 == RegExp.$1.length
              ? r[e]
              : ("00" + r[e]).substr(("" + r[e]).length),
          ));
      return t;
    }
    queryStr(t) {
      let e = "";
      for (const s in t) {
        let r = t[s];
        null != r &&
          "" !== r &&
          ("object" == typeof r && (r = JSON.stringify(r)),
          (e += `${s}=${r}&`));
      }
      return ((e = e.substring(0, e.length - 1)), e);
    }
    msg(e = t, s = "", r = "", i = {}) {
      const o = (t) => {
        const { $open: e, $copy: s, $media: r, $mediaMime: i } = t;
        switch (typeof t) {
          case void 0:
            return t;
          case "string":
            switch (this.getEnv()) {
              case "Surge":
              case "Stash":
              case "Egern":
              default:
                return { url: t };
              case "Loon":
              case "Shadowrocket":
                return t;
              case "Quantumult X":
                return { "open-url": t };
              case "Node.js":
                return;
            }
          case "object":
            switch (this.getEnv()) {
              case "Surge":
              case "Stash":
              case "Shadowrocket":
              case "Egern":
              default: {
                const o = {};
                let a = t.openUrl || t.url || t["open-url"] || e;
                a && Object.assign(o, { action: "open-url", url: a });
                let n = t["update-pasteboard"] || t.updatePasteboard || s;
                n && Object.assign(o, { action: "clipboard", text: n });
                let h = t.mediaUrl || t["media-url"] || r;
                if (h) {
                  let t, e;
                  if (h.startsWith("http"));
                  else if (h.startsWith("data:")) {
                    const [s] = h.split(";"),
                      [, r] = h.split(",");
                    ((t = r), (e = s.replace("data:", "")));
                  } else {
                    ((t = h),
                      (e = ((t) => {
                        const e = {
                          JVBERi0: "application/pdf",
                          R0lGODdh: "image/gif",
                          R0lGODlh: "image/gif",
                          iVBORw0KGgo: "image/png",
                          "/9j/": "image/jpg",
                        };
                        for (var s in e) if (0 === t.indexOf(s)) return e[s];
                        return null;
                      })(h)));
                  }
                  Object.assign(o, {
                    "media-url": h,
                    "media-base64": t,
                    "media-base64-mime": i ?? e,
                  });
                }
                return (
                  Object.assign(o, {
                    "auto-dismiss": t["auto-dismiss"],
                    sound: t.sound,
                  }),
                  o
                );
              }
              case "Loon": {
                const s = {};
                let i = t.openUrl || t.url || t["open-url"] || e;
                i && Object.assign(s, { openUrl: i });
                let o = t.mediaUrl || t["media-url"] || r;
                return (
                  o && Object.assign(s, { mediaUrl: o }),
                  console.log(JSON.stringify(s)),
                  s
                );
              }
              case "Quantumult X": {
                const i = {};
                let o = t["open-url"] || t.url || t.openUrl || e;
                o && Object.assign(i, { "open-url": o });
                let a = t.mediaUrl || t["media-url"] || r;
                a && Object.assign(i, { "media-url": a });
                let n = t["update-pasteboard"] || t.updatePasteboard || s;
                return (
                  n && Object.assign(i, { "update-pasteboard": n }),
                  console.log(JSON.stringify(i)),
                  i
                );
              }
              case "Node.js":
                return;
            }
          default:
            return;
        }
      };
      if (!this.isMute)
        switch (this.getEnv()) {
          case "Surge":
          case "Loon":
          case "Stash":
          case "Shadowrocket":
          case "Egern":
          default:
            $notification.post(e, s, r, o(i));
            break;
          case "Quantumult X":
            $notify(e, s, r, o(i));
          case "Node.js":
        }
      if (!this.isMuteLog) {
        let t = ["", "==============📣系统通知📣=============="];
        (t.push(e),
          s && t.push(s),
          r && t.push(r),
          console.log(t.join("\n")),
          (this.logs = this.logs.concat(t)));
      }
    }
    debug(...t) {
      this.logLevels[this.logLevel] <= this.logLevels.debug &&
        (t.length > 0 && (this.logs = [...this.logs, ...t]),
        console.log(
          `${this.logLevelPrefixs.debug}${t.map((t) => t ?? String(t)).join(this.logSeparator)}`,
        ));
    }
    info(...t) {
      this.logLevels[this.logLevel] <= this.logLevels.info &&
        (t.length > 0 && (this.logs = [...this.logs, ...t]),
        console.log(
          `${this.logLevelPrefixs.info}${t.map((t) => t ?? String(t)).join(this.logSeparator)}`,
        ));
    }
    warn(...t) {
      this.logLevels[this.logLevel] <= this.logLevels.warn &&
        (t.length > 0 && (this.logs = [...this.logs, ...t]),
        console.log(
          `${this.logLevelPrefixs.warn}${t.map((t) => t ?? String(t)).join(this.logSeparator)}`,
        ));
    }
    error(...t) {
      this.logLevels[this.logLevel] <= this.logLevels.error &&
        (t.length > 0 && (this.logs = [...this.logs, ...t]),
        console.log(
          `${this.logLevelPrefixs.error}${t.map((t) => t ?? String(t)).join(this.logSeparator)}`,
        ));
    }
    log(...t) {
      (t.length > 0 && (this.logs = [...this.logs, ...t]),
        console.log(t.map((t) => t ?? String(t)).join(this.logSeparator)));
    }
    logErr(t, e) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        case "Egern":
        case "Quantumult X":
        default:
          this.log("", `❗️${this.name}, 错误!`, e, t);
          break;
        case "Node.js":
          this.log(
            "",
            `❗️${this.name}, 错误!`,
            e,
            void 0 !== t.message ? t.message : t,
            t.stack,
          );
      }
    }
    wait(t) {
      return new Promise((e) => setTimeout(e, t));
    }
    done(t = {}) {
      const e = (new Date().getTime() - this.startTime) / 1e3;
      switch (
        (this.log("", `🔔${this.name}, 结束! 🕛 ${e} 秒`),
        this.log(),
        this.getEnv())
      ) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        case "Egern":
        case "Quantumult X":
        default:
          $done(t);
          break;
        case "Node.js":
          process.exit(
            this.logs.some(function (t) {
              return t instanceof Error;
            })
              ? 1
              : 0,
          );
      }
    }
  })(t, e);
}
