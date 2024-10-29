const request = $request;
const authHeader = request.headers['Authorization'];

if (authHeader) {
    const tokenValue = authHeader.replace('Bearer ', '');

    if (tokenValue) {
        // 存储 token 到 QX 中
        $.setdata(tokenValue, 'ysfqd_data'); // 使用 ysfqd_data 作为键名
        $.msg($.name, "", "获取签到Cookie成功🎉");
    } else {
        $.msg($.name, "", "错误获取签到Cookie失败");
    }
} else {
    $.msg($.name, "", "未找到Authorization头部");
}

$done({});
