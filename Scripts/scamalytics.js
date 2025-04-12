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

        // 构建 Scamalytics 页面请求参数
        const scamRequestParams = {
            url: scamUrl + ip,
            headers: {
                "User-Agent": "Quantumult X",
            },
            opts: {
                policy: $environment.params,
            },
        };

        // 获取欺诈分数、风险等级和地理位置
        fetchWithTimeout(scamRequestParams)
            .then((response) => {
                const htmlContent = response.body;

                let score = "N/A";
                let riskDescription = "未知风险";
                let riskEmoji = "⚪";
                let geoLocation = "N/A";

                // 关键词匹配欺诈分数和风险等级
                const lines = htmlContent.split('\n');
                for (let line of lines) {
                    line = line.trim().toLowerCase();
                    // 提取 score
                    if (line.includes('"score"')) {
                        const scoreMatch = line.match(/"score"\s*:\s*"(\d+)"/);
                        if (scoreMatch) {
                            score = scoreMatch[1];
                        }
                    }
                    // 提取 risk
                    if (line.includes('"risk"')) {
                        const riskMatch = line.match(/"risk"\s*:\s*"([^"]+)"/);
                        if (riskMatch) {
                            const risk = riskMatch[1].toLowerCase();
                            switch (risk) {
                                case "very high":
                                    riskEmoji = "🔴";
                                    riskDescription = "非常高风险";
                                    break;
                                case "high":
                                    riskEmoji = "🟠";
                                    riskDescription = "高风险";
                                    break;
                                case "medium":
                                    riskEmoji = "🟡";
                                    riskDescription = "中等风险";
                                    break;
                                case "low":
                                    riskEmoji = "🟢";
                                    riskDescription = "低风险";
                                    break;
                                default:
                                    riskEmoji = "⚪";
                                    riskDescription = "未知风险";
                            }
                        }
                    }
                }

                // 关键词匹配地理位置
                const geoKeyword = "geographical location of";
                for (let line of lines) {
                    if (line.toLowerCase().includes(geoKeyword)) {
                        const geoMatch = line.match(/is in <b>([^<]+)<\/b>/i);
                        if (geoMatch) {
                            geoLocation = geoMatch[1].trim();
                        }
                        break;
                    }
                }

                // 输出查询结果到控制台
                const logMessage = `
                    Scamalytics IP欺诈分查询:
                    节点名称: ${nodeName}
                    IP地址: ${ip}
                    IP欺诈分数: ${score}
                    IP风险等级: ${riskEmoji} ${riskDescription}
                    IP城市: ${city}
                    IP国家: ${countryCode}
                    IP地理位置: ${geoLocation}
                    ISP公司: ${isp}
                    ISP组织: ${org}
                    ASN信息: ${asInfo}
                `;

                const formattedMessage = logMessage
                    .split('\n')
                    .map(line => line.trimStart())
                    .join('\n');

                console.log(formattedMessage);

                // 构建结果页面
                const resultHtml = `
                    <p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                        <br>   -----------------------------------------------
                        <br><br>
                             <b>IP地址：</b>${ip}<br>
                             <b>IP城市：</b>${city}<br>
                             <b>IP国家：</b>${countryCode}<br>
                             <b>IP地理位置：</b>${geoLocation}<br>
                        <br>
                             <b>ISP公司：</b>${isp}<br>
                             <b>ISP组织：</b>${org}<br>
                             <b>ASN信息：</b>${asInfo}<br>
                        <br>
                             <b>IP欺诈分数：</b>  ${score}<br>
                             <b>IP风险等级：</b>${riskEmoji} ${riskDescription}<br>
                        <br>   -----------------------------------------------
                        <br>
                             <b style="color: red;">节点：</b> ➟ <span style="color: red;">${nodeName}</span>
                    </p>
                `;

                $done({
                    title: "Scamalytics IP欺诈分查询",
                    htmlMessage: resultHtml,
                });
            })
            .catch((error) => {
                console.error("Scamalytics 获取错误:", error);
                const errorMessage = "<p style='text-align: center;'>🔴 查询超时</p>";
                $done({
                    title: "Scamalytics IP欺诈分查询",
                    htmlMessage: errorMessage,
                });
            });
    })
    .catch((error) => {
        console.error("IP-API 获取错误:", error);
        const errorMessage = "<p style='text-align: center;'>🔴 查询超时</p>";
        $done({
            title: "Scamalytics IP欺诈分查询",
            htmlMessage: errorMessage,
        });
    });