// 定义国家旗帜映射
var flags = new Map([
    ["AC", "🇦🇨"],
    ["AE", "🇦🇪"],
    ["AF", "🇦🇫"],
    ["AI", "🇦🇮"],
    ["AL", "🇦🇱"],
    ["AM", "🇦🇲"],
    ["AQ", "🇦🇶"],
    ["AR", "🇦🇷"],
    ["AS", "🇦🇸"],
    ["AT", "🇦🇹"],
    ["AU", "🇦🇺"],
    ["AW", "🇦🇼"],
    ["AX", "🇦🇽"],
    ["AZ", "🇦🇿"],
    ["BA", "🇧🇦"],
    ["BB", "🇧🇧"],
    ["BD", "🇧🇩"],
    ["BE", "🇧🇪"],
    ["BF", "🇧🇫"],
    ["BG", "🇧🇬"],
    ["BH", "🇧🇭"],
    ["BI", "🇧🇮"],
    ["BJ", "🇧🇯"],
    ["BM", "🇧🇲"],
    ["BN", "🇧🇳"],
    ["BO", "🇧🇴"],
    ["BR", "🇧🇷"],
    ["BS", "🇧🇸"],
    ["BT", "🇧🇹"],
    ["BV", "🇧🇻"],
    ["BW", "🇧🇼"],
    ["BY", "🇧🇾"],
    ["BZ", "🇧🇿"],
    ["CA", "🇨🇦"],
    ["CF", "🇨🇫"],
    ["CH", "🇨🇭"],
    ["CK", "🇨🇰"],
    ["CL", "🇨🇱"],
    ["CM", "🇨🇲"],
    ["CN", "🇨🇳"],
    ["CO", "🇨🇴"],
    ["CP", "🇨🇵"],
    ["CR", "🇨🇷"],
    ["CU", "🇨🇺"],
    ["CV", "🇨🇻"],
    ["CX", "🇨🇽"],
    ["CY", "🇨🇾"],
    ["CZ", "🇨🇿"],
    ["DE", "🇩🇪"],
    ["DJ", "🇩🇯"],
    ["DK", "🇩🇰"],
    ["DM", "🇩🇲"],
    ["DO", "🇩🇴"],
    ["DZ", "🇩🇿"],
    ["EC", "🇪🇨"],
    ["EE", "🇪🇪"],
    ["EG", "🇪🇬"],
    ["EH", "🇪🇭"],
    ["ER", "🇪🇷"],
    ["ES", "🇪🇸"],
    ["ET", "🇪🇹"],
    ["FI", "🇫🇮"],
    ["FJ", "🇫🇯"],
    ["FM", "🇫🇲"],
    ["FO", "🇫🇴"],
    ["FR", "🇫🇷"],
    ["GA", "🇬🇦"],
    ["GB", "🇬🇧"],
    ["GD", "🇬🇩"],
    ["GE", "🇬🇪"],
    ["GF", "🇬🇫"],
    ["GG", "🇬🇬"],
    ["GH", "🇬🇭"],
    ["GI", "🇬🇮"],
    ["GL", "🇬🇱"],
    ["GM", "🇬🇲"],
    ["GN", "🇬🇳"],
    ["GP", "🇬🇵"],
    ["GQ", "🇬🇶"],
    ["GR", "🇬🇷"],
    ["GT", "🇬🇹"],
    ["GU", "🇬🇺"],
    ["GW", "🇬🇼"],
    ["GY", "🇬🇾"],
    ["HK", "🇭🇰"],
    ["HM", "🇭🇲"],
    ["HN", "🇭🇳"],
    ["HR", "🇭🇷"],
    ["HT", "🇭🇹"],
    ["HU", "🇭🇺"],
    ["ID", "🇮🇩"],
    ["IE", "🇮🇪"],
    ["IL", "🇮🇱"],
    ["IM", "🇮🇲"],
    ["IN", "🇮🇳"],
    ["IO", "🇮🇴"],
    ["IQ", "🇮🇶"],
    ["IR", "🇮🇷"],
    ["IS", "🇮🇸"],
    ["IT", "🇮🇹"],
    ["JE", "🇯🇪"],
    ["JM", "🇯🇲"],
    ["JO", "🇯🇴"],
    ["JP", "🇯🇵"],
    ["KE", "🇰🇪"],
    ["KG", "🇰🇬"],
    ["KH", "🇰🇭"],
    ["KI", "🇰🇷"],
    ["KM", "🇰🇲"],
    ["KN", "🇰🇳"],
    ["KP", "🇰🇵"],
    ["KR", "🇰🇷"],
    ["KW", "🇰🇼"],
    ["KY", "🇰🇾"],
    ["KZ", "🇰🇿"],
    ["LA", "🇱🇦"],
    ["LB", "🇱🇧"],
    ["LC", "🇱🇨"],
    ["LI", "🇱🇮"],
    ["LK", "🇱🇰"],
    ["LR", "🇱🇷"],
    ["LS", "🇱🇸"],
    ["LT", "🇱🇹"],
    ["LU", "🇱🇺"],
    ["LV", "🇱🇻"],
    ["LY", "🇱🇾"],
    ["MA", "🇲🇦"],
    ["MC", "🇲🇨"],
    ["MD", "🇲🇩"],
    ["ME", "🇲🇪"],
    ["MF", "🇲🇫"],
    ["MG", "🇲🇬"],
    ["MH", "🇲🇭"],
    ["MK", "🇲🇰"],
    ["ML", "🇲🇱"],
    ["MM", "🇲🇲"],
    ["MN", "🇲🇳"],
    ["MO", "🇲🇴"],
    ["MP", "🇲🇵"],
    ["MQ", "🇲🇶"],
    ["MR", "🇲🇷"],
    ["MS", "🇲🇸"],
    ["MT", "🇲🇹"],
    ["MU", "🇲🇺"],
    ["MV", "🇲🇻"],
    ["MW", "🇲🇼"],
    ["MX", "🇲🇽"],
    ["MY", "🇲🇾"],
    ["MZ", "🇲🇿"],
    ["NA", "🇳🇦"],
    ["NC", "🇳🇨"],
    ["NE", "🇳🇪"],
    ["NF", "🇳🇫"],
    ["NG", "🇳🇬"],
    ["NI", "🇳🇮"],
    ["NL", "🇳🇱"],
    ["NO", "🇳🇴"],
    ["NP", "🇳🇵"],
    ["NR", "🇳🇷"],
    ["NU", "🇳🇺"],
    ["NZ", "🇳🇿"],
    ["OM", "🇴🇲"],
    ["PA", "🇵🇦"],
    ["PE", "🇵🇪"],
    ["PF", "🇵🇫"],
    ["PG", "🇵🇬"],
    ["PH", "🇵🇭"],
    ["PK", "🇵🇰"],
    ["PL", "🇵🇱"],
    ["PM", "🇵🇲"],
    ["PN", "🇵🇳"],
    ["PR", "🇵🇷"],
    ["PT", "🇵🇹"],
    ["PW", "🇵🇼"],
    ["PY", "🇵🇾"],
    ["QA", "🇶🇦"],
    ["RE", "🇷🇪"],
    ["RO", "🇷🇴"],
    ["RS", "🇷🇸"],
    ["RU", "🇷🇺"],
    ["RW", "🇷🇼"],
    ["SA", "🇸🇦"],
    ["SB", "🇸🇧"],
    ["SC", "🇸🇨"],
    ["SD", "🇸🇩"],
    ["SE", "🇸🇪"],
    ["SG", "🇸🇬"],
    ["SH", "🇸🇭"],
    ["SI", "🇸🇮"],
    ["SJ", "🇸🇯"],
    ["SK", "🇸🇰"],
    ["SL", "🇸🇱"],
    ["SM", "🇸🇲"],
    ["SN", "🇸🇳"],
    ["SO", "🇸🇴"],
    ["SR", "🇸🇷"],
    ["SS", "🇸🇸"],
    ["ST", "🇸🇹"],
    ["SV", "🇸🇻"],
    ["SX", "🇸🇽"],
    ["SY", "🇸🇾"],
    ["SZ", "🇸🇿"],
    ["TC", "🇹🇨"],
    ["TD", "🇹🇩"],
    ["TF", "🇹🇫"],
    ["TG", "🇹🇬"],
    ["TH", "🇹🇭"],
    ["TJ", "🇹🇯"],
    ["TK", "🇹🇰"],
    ["TL", "🇹🇱"],
    ["TM", "🇹🇲"],
    ["TN", "🇹🇳"],
    ["TO", "🇹🇴"],
    ["TR", "🇹🇷"],
    ["TT", "🇹🇹"],
    ["TV", "🇹🇻"],
    ["TZ", "🇹🇿"],
    ["UA", "🇺🇦"],
    ["UG", "🇺🇬"],
    ["UM", "🇺🇲"],
    ["US", "🇺🇸"],
    ["UY", "🇺🇾"],
    ["UZ", "🇺🇿"],
    ["VA", "🇻🇦"],
    ["VC", "🇻🇨"],
    ["VE", "🇻🇪"],
    ["VG", "🇻🇬"],
    ["VI", "🇻🇮"],
    ["VN", "🇻🇳"],
    ["VU", "🇻🇺"],
    ["WF", "🇼🇫"],
    ["WS", "🇼🇸"],
    ["YE", "🇾🇪"],
    ["YT", "🇾🇹"],
    ["ZA", "🇿🇦"],
    ["ZM", "🇿🇲"],
    ["ZW", "🇿🇼"],
    // 可以继续添加更多国家
]);

const ipUrl = "https://api.ipapi.is/?q=";
const scamUrl = "https://api11.scamalytics.com/shaoxinweixuer/?key=3d803bd1825826b88353d677e37d5f54ee5685e242347e88b8159c103bbc5ef1&ip=";
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

function fetchWithTimeout(requestParams) {
    return Promise.race([
        $task.fetch(requestParams),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("查询超时")), timeoutDuration)
        ),
    ]);
}

fetchWithTimeout(requestParams)
    .then((response) => {
        const ipInfo = JSON.parse(response.body);
        const ip = ipInfo.ip;

        const scamRequestParams = {
            url: scamUrl + ip,
            headers: {
                "User-Agent": "Quantumult X",
            },
            opts: {
                policy: $environment.params,
            },
        };

        fetchWithTimeout(scamRequestParams)
            .then((response) => {
                const scamInfo = JSON.parse(response.body);
                const country = ipInfo.location.country || "N/A";
                const countryCode = ipInfo.location.country_code || "N/A";
                const countryFlag = flags.get(countryCode) || "";

                let riskemoji;
                let riskDescription;
                switch (scamInfo.risk) {
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

                // 输出查询结果到控制台
                console.log(`节点名称: ${nodeName}`);
                console.log(`IP地址: ${ipInfo.ip}`);
                console.log(`IP城市: ${ipInfo.location.city}`);
                console.log(`IP国家: ${countryFlag} ${country}`);
                console.log(`IP欺诈分数: ${scamInfo.score || "N/A"}`);
                console.log(`IP风险等级: ${riskemoji} ${riskDescription}`);
                console.log(`ISP欺诈分数: ${scamInfo["ISP Fraud Score"] || "N/A"}`);
                console.log(`ISP公司名称: ${ipInfo.company.name}`);
                console.log(`ASN编号: ${ipInfo.asn.asn}`);
                console.log(`ASN机构: ${ipInfo.asn.org}`);

                const resultHtml = `
        <p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>IP地址：</b>${ipInfo.ip}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>IP城市：</b>${ipInfo.location.city}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>IP国家：</b>${countryFlag} ${country}<br>
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>IP欺诈分数：</b>&nbsp;&nbsp;${scamInfo.score}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>IP风险等级：</b>${riskemoji} ${riskDescription}<br>
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>ISP欺诈分数：</b>${scamInfo["ISP Fraud Score"]}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>ISP公司名称：</b>${ipInfo.company.name}<br>
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>ASN编号：</b>${ipInfo.asn.asn}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>ASN机构：</b>${ipInfo.asn.org}<br>
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b style="color: red;">节点：</b> ➟ <span style="color: red;">${nodeName}</span>
        </p>
        `;

                $done({
                    title: "IP欺诈分查询",
                    htmlMessage: resultHtml,
                });
            })
            .catch((error) => {
                console.error(error);
                const errorMessage = "<p style='text-align: center;'>🔴 查询超时</p>";
                $done({
                    title: "IP欺诈分查询",
                    htmlMessage: errorMessage,
                });
            });
    })
    .catch((error) => {
        console.error(error);
        const errorMessage = "<p style='text-align: center;'>🔴 查询超时</p>";
        $done({
            title: "IP欺诈分查询",
            htmlMessage: errorMessage,
        });
    });