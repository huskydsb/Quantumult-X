// 淘气兔 Cookie 获取脚本（Quantumult X 适配）

function formatDateTime(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

if ($request.method !== 'OPTIONS') {
  console.log(`[${formatDateTime(new Date())}] 🚀 脚本开始执行，URL: ${$request.url}, Method: ${$request.method}`);

  setTimeout(() => {
    const headers = $request.headers;
    const authorization = headers['authorization'];

    console.log(`[${formatDateTime(new Date())}] 📝 尝试获取 Authorization 字段`);

    if (authorization) {
      const writeResult = $prefs.setValueForKey(authorization, 'taoqitu_authorization');
      console.log(`[${formatDateTime(new Date())}] ✅ 获取成功：Authorization 字段已存储`);

      $notify('淘气兔签到获取Cookie', 'Authorization 已存储', '🎉 Cookie 获取成功');
    } else {
      console.log(`[${formatDateTime(new Date())}] ❌ 获取失败：未找到 Authorization 字段`);
      $notify('淘气兔签到获取Cookie', '未找到 Authorization', '👆 请手动打开 App 进行一次签到');
    }

    console.log(`[${formatDateTime(new Date())}] 🛑 脚本执行结束`);
    $done({});
  }, 2000);
} else {
  console.log(`[${formatDateTime(new Date())}] ⚠️ 跳过 OPTIONS 请求`);
  $done({});
}