########################################
# 淘气兔 - Quantumult X 签到配置（远程版）
########################################

[rewrite_local]
^https:\/\/api-cdn\.taoqitu\.me\/gateway\/tqt\/cn\/user\/getSignList$ url script-request-header https://你的脚本地址/taoqitu_cookie.js

[mitm]
hostname = api-cdn.taoqitu.me