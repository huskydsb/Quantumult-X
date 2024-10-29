const cookieName = '云闪付'; // 可以根据需要修改
const authKey = 'ysf_Authorization';
const userAgentKey = 'ysf_User-Agent';

const requestUrl = $request.url;
const requestHeaders = $request.headers;

if (requestUrl.includes('youhui.95516.com/newsign/api')) {
  // 获取 Authorization 和 User-Agent 的逻辑
  const authVal = requestHeaders['Authorization'];
  const userAgentVal = requestHeaders['User-Agent'];

  // 存储 Authorization
  if (authVal) {
    if (typeof $persistentStore !== 'undefined') {
      $persistentStore.write(authKey, authVal);
    } else if (typeof $prefs !== 'undefined') {
      $prefs.setValueForKey(authVal, authKey);
    }
    $notification.post(cookieName, '获取Authorization: 成功', '');
    console.log(`[${cookieName}] 获取Authorization: 成功, Authorization: ${authVal}`);
  } else {
    $notification.post(cookieName, '未找到Authorization头部', '');
  }

  // 存储 User-Agent
  if (userAgentVal) {
    if (typeof $persistentStore !== 'undefined') {
      $persistentStore.write(userAgentKey, userAgentVal);
    } else if (typeof $prefs !== 'undefined') {
      $prefs.setValueForKey(userAgentVal, userAgentKey);
    }
    $notification.post(cookieName, '获取User-Agent: 成功', '');
    console.log(`[${cookieName}] 获取User-Agent: 成功, User-Agent: ${userAgentVal}`);
  } else {
    $notification.post(cookieName, '未找到User-Agent头部', '');
  }
}

$done({});
