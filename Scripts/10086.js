/****************************************

脚本说明:
 - Boxjs添加chavy大佬订阅链接： https://raw.githubusercontent.com/chavyleung/scripts/master/box/chavy.boxjs.json
 - 打开中国移动APP（非10086），获取一次cookie，点击话费余额再获取一次cookie，若打开app时没有提示获取会话，请在 “我的” --> “设置” --> “登陆设置” 中关闭指纹/faceID登陆，打开自动登录，登陆以后关闭后台，重新打开app获取cookie（注：中国移动app以短信验证码方式登录，本机一键登录可能获取不到cookie）；
运行脚本，点击基础设置-->BoxJS域名，设置为你自己的BoxJS域名，再次运行脚本，选择代理缓存，获取缓存cookie

*****************************************/





[mitm]
hostname = clientaccess.10086.cn

[rewrite_local]
^https:\/\/clientaccess.10086.cn\/biz-orange\/LN\/uamrandcodelogin\/autoLogin url script-request-body https://raw.githubusercontent.com/chavyleung/scripts/master/10086/10086.fee.cookie.js
^https:\/\/clientaccess.10086.cn\/biz-orange\/BN\/realFeeQuery\/getRealFee url script-request-body https://raw.githubusercontent.com/chavyleung/scripts/master/10086/10086.fee.cookie.js