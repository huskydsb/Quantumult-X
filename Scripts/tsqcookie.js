// Quantumult X 获取 Authorization（过滤预检请求，仅保存真实请求）

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
  const method = $request.method || 'GET';
  const authorization = headers['Authorization'] || headers['authorization'];
  const logTime = `[${formatDateTime(new Date())}]`;

  console.log(`${logTime} 🛰 请求地址: ${$request.url}`);
  console.log(`${logTime} 📝 请求方法: ${method}`);
  console.log(`${logTime} 📝 请求头如下:\n${JSON.stringify(headers, null, 2)}`);

  // 过滤 OPTIONS 预检请求 或 无 Authorization 的请求
  if (method.toUpperCase() === 'OPTIONS' || !authorization) {
    console.log(`${logTime} ⛔️ 跳过预检或无效请求`);
  } else {
    $prefs.setValueForKey(authorization, 'taoqitu_authorization');
    console.log(`${logTime} ✅ 成功获取并存储 Authorization`);
    $notify('淘气兔 Authorization 获取成功', '', '已保存，可用于后续操作');
  }
} else {
  console.log(`[${formatDateTime(new Date())}] ⚠️ 未能获取到请求头信息`);
}

$done({});