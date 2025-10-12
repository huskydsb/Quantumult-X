/*******************************
 remove_splash_ad.js —— QX script-response-body
 用途：拦截开屏广告元数据并返回“无广告”，避免开屏空白等待
 *******************************/

const TRANSPARENT_PNG_BASE64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAn8B9ZKqkQAAAABJRU5ErkJggg==";

function tryParseJSON(s){
  try { return JSON.parse(s); } catch(e) { return null; }
}

function shallowNoAdResponse(){
  // 通用最小化无广告返回体（根据不同 App 可能需调整，但多数可用）
  return {
    "has_ad": false,
    "show_splash": false,
    "show_ad": false,
    "ad_list": [],
    "data": {
      "splash": {},
      "ad": null
    }
  };
}

// 主逻辑
if (typeof $response !== "undefined") {
  try {
    const url = $request.url || "";
    const headers = $response.headers || {};
    const ct = (headers['content-type'] || headers['Content-Type'] || "").toLowerCase();

    // 1) 如果是图片响应 -> 返回透明 PNG（备用）
    if (ct.indexOf("image/") !== -1) {
      $done({
        status: 200,
        headers: {
          "Content-Type": "image/png",
          "Content-Transfer-Encoding": "base64"
        },
        body: TRANSPARENT_PNG_BASE64
      });
    }

    // 2) 若 URL 含广告/开屏关键字，尝试解析 body 为 JSON 并替换
    const lowerUrl = url.toLowerCase();
    if (/splash|open_screen|open|launch|ad|union|splash_ad/.test(lowerUrl)) {
      const raw = $response.body || "";
      const json = tryParseJSON(typeof raw === "string" ? raw.trim() : raw);

      if (json !== null) {
        // 深拷贝并清理广告字段
        let obj;
        try { obj = JSON.parse(JSON.stringify(json)); } catch(e){ obj = json; }

        // 删除常见广告字段并设置无广告标志
        function clean(objx){
          if (!objx || typeof objx !== "object") return;
          if (Array.isArray(objx)) { objx.forEach(clean); return; }
          for (const k of Object.keys(objx)) {
            if (/^(ad|ads|ad_list|advert|advertise|advertisement|sponsor|promote|splash|splash_ad|show_ad|has_ad|ad_info)$/i.test(k)) {
              try { delete objx[k]; } catch(e){}
              continue;
            }
            if (typeof objx[k] === "object") clean(objx[k]);
          }
        }
        try { clean(obj); } catch(e){}

        // 写入/覆盖通用“无广告”字段，最大兼容
        try {
          if (!('has_ad' in obj)) obj['has_ad'] = false;
          if (!('show_splash' in obj)) obj['show_splash'] = false;
          if (!('show_ad' in obj)) obj['show_ad'] = false;
          if (!('ad_list' in obj)) obj['ad_list'] = [];
          if (!('data' in obj)) obj['data'] = {};
          if (!('splash' in obj['data'])) obj['data']['splash'] = {};
        } catch(e){}

        $done({ body: JSON.stringify(obj) });
      } else {
        // 不是 JSON，就直接返回一个最小化无广告 JSON（保守处理）
        $done({ body: JSON.stringify(shallowNoAdResponse()) });
      }
    }

    // 3) 其余情况不改动（避免误伤）
    $done($response);
  } catch (err) {
    // 出错回退原响应
    $done($response);
  }
} else {
  $done({});
}