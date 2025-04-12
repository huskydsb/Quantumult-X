const ipUrl = "http://ip-api.com/json";
const scamUrl = "https://scamalytics.com/search?ip=";
const timeoutDuration = 5000; // 5 seconds timeout

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

// Timeout request function
function fetchWithTimeout(requestParams) {
    return Promise.race([
        $task.fetch(requestParams),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("查询超时")), timeoutDuration)
        ),
    ]);
}

// Fetch IP information
fetchWithTimeout(requestParams)
    .then((response) => {
        const ipInfo = JSON.parse(response.body);
        const ip = ipInfo.query;
        const countryCode = ipInfo.countryCode || "N/A";
        const city = ipInfo.city || "N/A";
        const isp = ipInfo.isp || "N/A";
        const org = ipInfo.org || "N/A";
        const asInfo = ipInfo.as || "N/A";

        // Build Scamalytics request
        const scamRequestParams = {
            url: scamUrl + ip,
            headers: {
                "User-Agent": "Quantumult X",
            },
            opts: {
                policy: $environment.params,
            },
        };

        // Fetch fraud score and risk level
        fetchWithTimeout(scamRequestParams)
            .then((response) => {
                const htmlContent = response.body;

                // Extract JSON data from the fraud risk API section
                let score = "N/A";
                let riskDescription = "未知风险";
                let riskEmoji = "⚪";
                let geoLocation = "N/A";

                // Extract JSON from <pre> tag
                const preRegex = /<pre[^>]*>([\s\S]*?)<\/pre>/i;
                const preMatch = htmlContent.match appex/preRegex);
                if (preMatch) {
                    const preContent = preMatch[1].trim();
                    try {
                        // Parse JSON directly (clean up potential formatting issues)
                        const jsonData = JSON.parse(preContent.replace(/[\r\n\s]+/g, ' '));
                        score = jsonData.score || "N/A";
                        const risk = jsonData.risk || "unknown";

                        // Map risk levels
                        switch (risk.toLowerCase()) {
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
                    } catch (e) {
                        console.error("JSON parsing error:", e);
                    }
                }

                // Extract geographical location
                const geoRegex = /The geographical location of <b>[^<]+<\/b> is in <b>([^<]+)<\/b>/i;
                const geoMatch = htmlContent.match(geoRegex);
                if (geoMatch) {
                    geoLocation = geoMatch[1].trim();
                }

                // Log results
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

                // Build result HTML
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
                console.error("Scamalytics fetch error:", error);
                const errorMessage = "<p style='text-align: center;'>🔴 查询超时</p>";
                $done({
                    title: "Scamalytics IP欺诈分查询",
                    htmlMessage: errorMessage,
                });
            });
    })
    .catch((error) => {
        console.error("IP-API fetch error:", error);
        const errorMessage = "<p style='text-align: center;'>🔴 查询超时</p>";
        $done({
            title: "Scamalytics IP欺诈分查询",
            htmlMessage: errorMessage,
        });
    });