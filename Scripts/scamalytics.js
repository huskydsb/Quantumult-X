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

const ipUrl = "http://ip-api.com/json";
const scamUrl =
  "https://api11.scamalytics.com/shaoxinweixuer/?key=3d803bd1825826b88353d677e37d5f54ee5685e242347e88b8159c103bbc5ef1&ip=";
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
    const ip = ipInfo.query;

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
        const countryCode = scamInfo.ip_country_code;
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
        console.log(`Scamalytics IP欺诈分查询:`);
        console.log(`节点名称: ${nodeName}`);
        console.log(`IP地址: ${scamInfo.ip}`);
        console.log(`IP城市: ${scamInfo.ip_city}`);
        console.log(`IP国家: ${countryFlag} ${countryCode}`);
        console.log(`IP欺诈分数: ${scamInfo.score}`);
        console.log(`IP风险等级: ${riskemoji} ${riskDescription}`);
        console.log(`ISP欺诈分数: ${scamInfo["ISP Fraud Score"]}`);
        console.log(`ISP公司名称: ${scamInfo["ISP Name"]}`);
        console.log(`ASN编号: ${scamInfo.as_number}`);
        console.log(`ASN机构: ${scamInfo["Organization Name"]}`);

        const resultHtml = `
        <p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
            <br>&nbsp;&nbsp;&nbsp;-----------------------------------------------
            <br><br> <!-- 空行 -->
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>IP地址：</b>${scamInfo.ip}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>IP城市：</b>${scamInfo.ip_city}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>IP国家：</b>${countryFlag} ${countryCode}<br>
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>IP欺诈分数：</b>&nbsp;&nbsp;${scamInfo.score}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>IP风险等级：</b>${riskemoji} ${riskDescription}<br>
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>ISP欺诈分数：</b>${scamInfo["ISP Fraud Score"]}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>ISP公司名称：</b>${scamInfo["ISP Name"]}<br>
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>ASN编号：</b>${scamInfo.as_number}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>ASN机构：</b>${scamInfo["Organization Name"]}<br>
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
