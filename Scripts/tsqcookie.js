/******************************************
 * 淘气兔 Authorization / Cookie 获取脚本
 * Quantumult X 模式: script-response-header
 ******************************************/

function formatDateTime(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const logTime = `[${formatDateTime(new Date())}]`;

if ($request && $request.headers) {
  const headers = $request.headers;
  const method = $request.method || 'GET';
  const authorization = headers['Authorization'] || headers['authorization'];
  const cookie = headers['Cookie'] || headers['cookie'];

  console.log(`${logTime} 🛰 请求地址: ${$request.url}`);
  console.log(`${logTime} 📝 请求方法: ${method}`);
  console.log(`${logTime} 📝 请求头如下:\n${JSON.stringify(headers, null, 2)}`);

  // 过滤 OPTIONS 预检请求
  if (method.toUpperCase() === 'OPTIONS') {
    console.log(`${logTime} ⛔️ 跳过预检请求`);
  } else if (authorization) {
    $prefs.setValueForKey(authorization, 'taoqitu_authorization');
    console.log(`${logTime} ✅ 成功获取并保存 Authorization`);
    $notify('淘气兔 Authorization 获取成功', '', '已保存，可用于后续签到');
  } else if (cookie) {
    $prefs.setValueForKey(cookie, 'taoqitu_cookie');
    console.log(`${logTime} ✅ 成功获取并保存 Cookie`);
    $notify('淘气兔 Cookie 获取成功', '', '已保存，可用于后续签到');
  } else {
    console.log(`${logTime} ⚠️ 无 Authorization 或 Cookie 可保存`);
  }
} else {
  console.log(`${logTime} ⚠️ 未能获取请求头信息`);
}

$done({});