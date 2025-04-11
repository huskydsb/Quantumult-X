########################################
# 淘气兔 - Quantumult X 签到配置（远程版）
########################################

[rewrite_local]
^https:\/\/api-cdn\.taoqitu\.me\/gateway\/tqt\/cn\/user\/comm\/config$ url script-request-header https://raw.githubusercontent.com/huskydsb/Quantumult-X/refs/heads/main/Scripts/tsqcookie.js
[mitm]
hostname = api-cdn.taoqitu.me