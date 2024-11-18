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

        // 通过页面抓取获取欺诈分数和风险等级
        fetchWithTimeout(scamRequestParams)
            .then((response) => {
                const htmlContent = response.body;

                // 使用正则表达式提取 <pre> 标签中的内容
                const preRegex = /<pre[^>]*>([\s\S]*?)<\/pre>/;
                const preMatch = htmlContent.match(preRegex);
                const preContent = preMatch ? preMatch[1] : null;

                let score = "N/A";
                let riskDescription = "未知风险";
                let riskemoji = "⚪";

                if (preContent) {
                    // 使用正则提取 JSON 字符串
                    const jsonRegex = /({[\s\S]*?})/;
                    const jsonMatch = preContent.match(jsonRegex);

                    if (jsonMatch) {
                        const jsonData = jsonMatch[1];

                        // 尝试解析 JSON 数据
                        try {
                            const parsedData = JSON.parse(jsonData);
                            score = parsedData.score || "N/A";
                            const risk = parsedData.risk || "unknown";

                            // 根据风险等级设置描述和表情符号
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
                            console.error("JSON解析错误:", e);
                        }
                    }
                }

                // 输出查询结果到控制台
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

                const formattedMessage = logMessage
                    .split('\n')
                    .map(line => line.trimStart())
                    .join('\n');

                console.log(formattedMessage);

                // 构建结果页面
                const resultHtml = `
        <p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
            <br>&nbsp;&nbsp;&nbsp;-----------------------------------------------
            <br><br> <!-- 空行 -->
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>IP地址：</b>${ip}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>IP城市：</b>${city}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>IP国家：</b>${countryCode}<br>
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
                console.error(error);
                const errorMessage = "<p style='text-align: center;'>🔴 查询超时</p>";
                $done({
                    title: "Scamalytics IP欺诈分查询",
                    htmlMessage: errorMessage,
                });
            });
    })
    .catch((error) => {
        console.error(error);
        const errorMessage = "<p style='text-align: center;'>🔴 查询超时</p>";
        $done({
            title: "Scamalytics IP欺诈分查询",
            htmlMessage: errorMessage,
        });
    });