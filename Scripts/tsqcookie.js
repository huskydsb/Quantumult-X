// Quantumult X 获取 Authorization 脚本（适配 getSignList 接口）

function formatDateTime(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

if ($request && $request.headers) {
  const headers = $request.headers;
  const authorization = headers['Authorization'] || headers['authorization'];

  console.log(`[${formatDateTime(new Date())}] 🛰 请求地址: ${$request.url}`);
  console.log(`[${formatDateTime(new Date())}] 📝 请求头如下:\n${JSON.stringify(headers, null, 2)}`);

  if (authorization) {
    $prefs.setValueForKey(authorization, 'taoqitu_authorization');
    console.log(`[${formatDateTime(new Date())}] ✅ 成功获取并存储 Authorization`);
    $notify('淘气兔 Cookie 获取成功', '', 'Authorization 已保存，可用于后续签到');
  } else {
    console.log(`[${formatDateTime(new Date())}] ❌ 未发现 Authorization 字段`);
    $notify('淘气兔 Cookie 获取失败', '', '未发现 Authorization 字段，请尝试重新进入 App 的签到页');
  }
} else {
  console.log(`[${formatDateTime(new Date())}] ⚠️ 未能获取到请求头信息`);
}

$done({});