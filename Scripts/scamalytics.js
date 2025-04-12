const ipUrl = "http://ip-api.com/json";
const scamUrl = "https://scamalytics.com/search?ip=";
const timeoutDuration = 5000; // 5秒超时

const nodeName = $environment.params || "未知节点";

const requestParams = {
    url: ipUrl,
    headers: {
        "User-Agent": "Quantumult X",
    },
    opts: {
        policy: $environment.params,
    },
};

// 超时请求函数
function fetchWithTimeout(requestParams) {
    return Promise.race([
        $task.fetch(requestParams),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("查询超时")), timeoutDuration)
        ),
    ]);
}

// 获取 IP 信息
fetchWithTimeout(requestParams)
    .then((response) => {
        const ipInfo = JSON.parse(response.body);
        const ip = ipInfo.query;
        const countryCode = ipInfo.countryCode || "N/A";
        const city = ipInfo.city || "N/A";
        const isp = ipInfo.isp || "N/A";
        const org = ipInfo.org || "N/A";
        const asInfo = ipInfo.as || "N/A";

        const scamRequestParams = {
            url: scamUrl + ip,
            headers: {
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
                "Accept": "text/html",
            },
            opts: {
                policy: $environment.params,
            },
        };

        fetchWithTimeout(scamRequestParams)
            .then((response) => {
                const htmlContent = response.body;
                const preRegex = /<pre[^>]*>([\s\S]*?)<\/pre>/i;
                const preMatch = htmlContent.match(preRegex);
                let preContent = preMatch ? preMatch[1].trim() : null;

                let score = "N/A";
                let riskDescription = "未知风险";
                let riskemoji = "⚪";

                if (preContent) {
                    try {
                        // 规范 JSON 内容格式：去除尾逗号，补全大括号
                        preContent = preContent.replace(/,\s*$/, "").trim();
                        if (!preContent.startsWith("{")) {
                            preContent = `{${preContent}}`;
                        }

                        const parsedData = JSON.parse(preContent);
                        score = parsedData.score || "N/A";
                        const risk = parsedData.risk || "unknown";

                        switch (risk) {
                            case "very high":
                                riskemoji = "🔴";
                                riskDescription = "非常高风险";
                                break;
                            case "high":
                                riskemoji = "🟠";
                                riskDescription = "高风险";
                                break;
                            case "medium":
                                riskemoji = "🟡";
                                riskDescription = "中等风险";
                                break;
                            case "low":
                                riskemoji = "🟢";
                                riskDescription = "低风险";
                                break;
                            default:
                                riskemoji = "⚪";
                                riskDescription = "未知风险";
                        }
                    } catch (e) {
                        console.error("JSON 解析失败:", e.message);
                    }
                }

                const logMessage = `
Scamalytics IP欺诈分查询:
节点名称: ${nodeName}
IP地址: ${ip}
IP欺诈分数: ${score}
IP风险等级: ${riskemoji} ${riskDescription}
IP城市: ${city}
IP国家: ${countryCode}
ISP公司: ${isp}
ISP组织: ${org}
ASN信息: ${asInfo}
                `;

                console.log(logMessage.trim());

                const resultHtml = `
<p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <br>&nbsp;&nbsp;&nbsp;-----------------------------------------------
    <br><br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>IP地址：</b>${ip}<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>IP城市：</b>${city}<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>IP国家：</b>${countryCode}<br>
    <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>ISP公司：</b>${isp}<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>ISP组织：</b>${org}<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>ASN信息：</b>${asInfo}<br>
    <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>IP欺诈分数：</b>&nbsp;&nbsp;${score}<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>IP风险等级：</b>${riskemoji} ${riskDescription}<br>
    <br>&nbsp;&nbsp;&nbsp;-----------------------------------------------
    <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b style="color: red;">节点：</b> ➟ <span style="color: red;">${nodeName}</span>
</p>
                `;

                $done({
                    title: "Scamalytics IP欺诈分查询",
                    htmlMessage: resultHtml,
                });
            })
            .catch((error) => {
                console.error("第二阶段失败:", error.message);
                $done({
                    title: "Scamalytics IP欺诈分查询",
                    htmlMessage: "<p style='text-align: center;'>🔴 第二阶段请求失败或超时</p>",
                });
            });
    })
    .catch((error) => {
        console.error("第一阶段失败:", error.message);
        $done({
            title: "Scamalytics IP欺诈分查询",
            htmlMessage: "<p style='text-align: center;'>🔴 第一阶段请求失败或超时</p>",
        });
    });