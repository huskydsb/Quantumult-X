########################################
# 淘气兔 - Quantumult X 签到配置（远程版）
########################################

[rewrite_local]
^https:\/\/gtm-1003\.91tutu\.xyz\/.* url script-response-header https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/tsqcookie.js

[mitm]
hostname = gtm-1003.91tutu.xyz