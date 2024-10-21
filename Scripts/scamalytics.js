// 定义国家旗帜映射
var flags = new Map([
    ["AC", "🇦🇨"], ["AE", "🇦🇪"], ["AF", "🇦🇫"], ["AI", "🇦🇮"], ["AL", "🇦🇱"],
    ["AM", "🇦🇲"], ["AQ", "🇦🇶"], ["AR", "🇦🇷"], ["AS", "🇦🇸"], ["AT", "🇦🇹"],
    ["AU", "🇦🇺"], ["AW", "🇦🇼"], ["AX", "🇦🇽"], ["AZ", "🇦🇿"], ["BA", "🇧🇦"],
    ["BB", "🇧🇧"], ["BD", "🇧🇩"], ["BE", "🇧🇪"], ["BF", "🇧🇫"], ["BG", "🇧🇬"],
    ["BH", "🇧🇭"], ["BI", "🇧🇮"], ["BJ", "🇧🇯"], ["BM", "🇧🇲"], ["BN", "🇧🇳"],
    ["BO", "🇧🇴"], ["BR", "🇧🇷"], ["BS", "🇧🇸"], ["BT", "🇧🇹"], ["BV", "🇧🇻"],
    ["BW", "🇧🇼"], ["BY", "🇧🇾"], ["BZ", "🇧🇿"], ["CA", "🇨🇦"], ["CF", "🇨🇫"],
    ["CH", "🇨🇭"], ["CK", "🇨🇰"], ["CL", "🇨🇱"], ["CM", "🇨🇲"], ["CN", "🇨🇳"],
    ["CO", "🇨🇴"], ["CP", "🇨🇵"], ["CR", "🇨🇷"], ["CU", "🇨🇺"], ["CV", "🇨🇻"],
    ["CX", "🇨🇽"], ["CY", "🇨🇾"], ["CZ", "🇨🇿"], ["DE", "🇩🇪"], ["DJ", "🇩🇯"],
    ["DK", "🇩🇰"], ["DM", "🇩🇲"], ["DO", "🇩🇴"], ["DZ", "🇩🇿"], ["EC", "🇪🇨"],
    ["EE", "🇪🇪"], ["EG", "🇪🇬"], ["EH", "🇪🇭"], ["ER", "🇪🇷"], ["ES", "🇪🇸"],
    ["ET", "🇪🇹"], ["FI", "🇫🇮"], ["FJ", "🇫🇯"], ["FM", "🇫🇲"], ["FO", "🇫🇴"],
    ["FR", "🇫🇷"], ["GA", "🇬🇦"], ["GB", "🇬🇧"], ["GD", "🇬🇩"], ["GE", "🇬🇪"],
    ["GF", "🇬🇫"], ["GG", "🇬🇬"], ["GH", "🇬🇭"], ["GI", "🇬🇮"], ["GL", "🇬🇱"],
    ["GM", "🇬🇲"], ["GN", "🇬🇳"], ["GP", "🇬🇵"], ["GQ", "🇬🇶"], ["GR", "🇬🇷"],
    ["GT", "🇬🇹"], ["GU", "🇬🇺"], ["GW", "🇬🇼"], ["GY", "🇬🇾"], ["HK", "🇭🇰"],
    ["HM", "🇭🇲"], ["HN", "🇭🇳"], ["HR", "🇭🇷"], ["HT", "🇭🇹"], ["HU", "🇭🇺"],
    ["ID", "🇮🇩"], ["IE", "🇮🇪"], ["IL", "🇮🇱"], ["IM", "🇮🇲"], ["IN", "🇮🇳"],
    ["IO", "🇮🇴"], ["IQ", "🇮🇶"], ["IR", "🇮🇷"], ["IS", "🇮🇸"], ["IT", "🇮🇹"],
    ["JE", "🇯🇪"], ["JM", "🇯🇲"], ["JO", "🇯🇴"], ["JP", "🇯🇵"], ["KE", "🇰🇪"],
    ["KG", "🇰🇬"], ["KH", "🇰🇭"], ["KI", "🇰🇷"], ["KM", "🇰🇲"], ["KN", "🇰🇳"],
    ["KP", "🇰🇵"], ["KR", "🇰🇷"], ["KW", "🇰🇼"], ["KY", "🇰🇾"], ["KZ", "🇰🇿"],
    ["LA", "🇱🇦"], ["LB", "🇱🇧"], ["LC", "🇱🇨"], ["LI", "🇱🇮"], ["LK", "🇱🇰"],
    ["LR", "🇱🇷"], ["LS", "🇱🇸"], ["LT", "🇱🇹"], ["LU", "🇱🇺"], ["LV", "🇱🇻"],
    ["LY", "🇱🇾"], ["MA", "🇲🇦"], ["MC", "🇲🇨"], ["MD", "🇲🇩"], ["ME", "🇲🇪"],
    ["MF", "🇲🇫"], ["MG", "🇲🇬"], ["MH", "🇲🇭"], ["MK", "🇲🇰"], ["ML", "🇲🇱"],
    ["MM", "🇲🇲"], ["MN", "🇲🇳"], ["MO", "🇲🇴"], ["MP", "🇲🇵"], ["MQ", "🇲🇶"],
    ["MR", "🇲🇷"], ["MS", "🇲🇸"], ["MT", "🇲🇹"], ["MU", "🇲🇺"], ["MV", "🇲🇻"],
    ["MW", "🇲🇼"], ["MX", "🇲🇽"], ["MY", "🇲🇾"], ["MZ", "🇲🇿"], ["NA", "🇳🇦"],
    ["NC", "🇳🇨"], ["NE", "🇳🇪"], ["NF", "🇳🇫"], ["NG", "🇳🇬"], ["NI", "🇳🇮"],
    ["NL", "🇳🇱"], ["NO", "🇳🇴"], ["NP", "🇳🇵"], ["NR", "🇳🇷"], ["NU", "🇳🇺"],
    ["NZ", "🇳🇿"], ["OM", "🇴🇲"], ["PA", "🇵🇦"], ["PE", "🇵🇪"], ["PF", "🇵🇫"],
    ["PG", "🇵🇬"], ["PH", "🇵🇭"], ["PK", "🇵🇰"], ["PL", "🇵🇱"], ["PM", "🇵🇲"],
    ["PN", "🇵🇳"], ["PR", "🇵🇷"], ["PT", "🇵🇹"], ["PW", "🇵🇼"], ["PY", "🇵🇾"],
    ["QA", "🇶🇦"], ["RE", "🇷🇪"], ["RO", "🇷🇴"], ["RS", "🇷🇸"], ["RU", "🇷🇺"],
    ["RW", "🇷🇼"], ["SA", "🇸🇦"], ["SB", "🇸🇧"], ["SC", "🇸🇨"], ["SD", "🇸🇩"],
    ["SE", "🇸🇪"], ["SG", "🇸🇬"], ["SH", "🇸🇭"], ["SI", "🇸🇮"], ["SJ", "🇸🇯"],
    ["SK", "🇸🇰"], ["SL", "🇸🇱"], ["SM", "🇸🇲"], ["SN", "🇸🇳"], ["SO", "🇸🇴"],
    ["SR", "🇸🇷"], ["SS", "🇸🇸"], ["ST", "🇸🇹"], ["SV", "🇸🇻"], ["SX", "🇸🇽"],
    ["SY", "🇸🇾"], ["SZ", "🇸🇿"], ["TC", "🇹🇨"], ["TD", "🇹🇩"], ["TF", "🇹🇫"],
    ["TG", "🇹🇬"], ["TH", "🇹🇭"], ["TJ", "🇹🇯"], ["TK", "🇹🇰"], ["TL", "🇹🇱"],
    ["TM", "🇹🇲"], ["TN", "🇹🇳"], ["TO", "🇹🇴"], ["TR", "🇹🇷"], ["TT", "🇹🇹"],
    ["TV", "🇹🇻"], ["TZ", "🇹🇿"], ["UA", "🇺🇦"], ["UG", "🇺🇬"], ["UM", "🇺🇲"],
    ["US", "🇺🇸"], ["UY", "🇺🇾"], ["UZ", "🇺🇿"], ["VA", "🇻🇦"], ["VC", "🇻🇨"],
    ["VE", "🇻🇪"], ["VG", "🇻🇬"], ["VI", "🇻🇮"], ["VN", "🇻🇳"], ["VU", "🇻🇺"],
    ["WF", "🇼🇫"], ["WS", "🇼🇸"], ["YE", "🇾🇪"], ["YT", "🇾🇹"], ["ZA", "🇿🇦"],
    ["ZM", "🇿🇲"], ["ZW", "🇿🇼"]
    // 可以继续添加更多国家
]);

const ipUrl = "http://ip-api.com/json/"; // 定义获取IP信息的API地址
const scamUrl = "https://api11.scamalytics.com/shaoxinweixuer/?key=3d803bd1825826b88353d677e37d5f54ee5685e242347e88b8159c103bbc5ef1&ip="; // 定义获取IP欺诈信息的API地址

// 获取当前节点名称
const nodeName = $environment.params || '未知节点'; // 从环境参数中获取节点名称，如果没有则设为'未知节点'

// 设置请求参数
const requestParams = {
    url: ipUrl, // 请求的URL
    headers: {
        'User-Agent': 'Quantumult X' // 设置User-Agent头
    },
    opts: {
        policy: $environment.params, // 添加opts选项，配置请求策略
    }
};

// 发送请求获取IP信息
$task.fetch(requestParams).then(response => { // 发送请求并处理响应
    const ipInfo = JSON.parse(response.body); // 解析响应体为JSON对象
    const ip = ipInfo.query; // 获取查询到的IP地址
    const scamRequestParams = {
        url: scamUrl + ip, // 拼接获取欺诈信息的URL
        headers: {
            'User-Agent': 'Quantumult X' // 设置User-Agent头
        },
        opts: {
            policy: $environment.params, // 在这里也添加opts选项
        }
    };

    // 发送请求获取欺诈分数
    $task.fetch(scamRequestParams).then(response => { // 发送欺诈分数请求并处理响应
        const scamInfo = JSON.parse(response.body); // 解析响应体为JSON对象
        const countryCode = scamInfo.ip_country_code; // 获取国家代码
        const countryFlag = flags.get(countryCode) || '';  // 获取国家旗帜，如果没有则为空

        // 确定风险等级的 emoji 和描述
        let riskemoji; // 定义风险表情变量
        let riskDescription; // 定义风险描述变量
        switch (scamInfo.risk) { // 根据风险等级设置表情和描述
            case 'very high':
                riskemoji = '🔴'; // 设置非常高风险表情
                riskDescription = '非常高风险'; // 设置风险描述
                break;
            case 'high':
                riskemoji = '🟠'; // 设置高风险表情
                riskDescription = '高风险'; // 设置风险描述
                break;
            case 'medium':
                riskemoji = '🟡'; // 设置中等风险表情
                riskDescription = '中等风险'; // 设置风险描述
                break;
            case 'low':
                riskemoji = '🟢'; // 设置低风险表情
                riskDescription = '低风险'; // 设置风险描述
                break;
            default:
                riskemoji = '⚪'; // 设置未知风险表情
                riskDescription = '未知风险'; // 设置风险描述
        }

        // 准备HTML内容以在QX面板中显示
        const resultHtml = `
        <p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; padding-left: 5ch;">
            <br> <!-- 添加一个空行 -->
            
            <b>IP地址：</b>${scamInfo.ip}<br> <!-- 显示IP地址 -->
            <b>IP欺诈分数：</b>${scamInfo.score}<br> <!-- 显示IP欺诈分数 -->
            <b>IP风险等级：</b>${riskemoji} ${riskDescription}<br> <!-- 显示风险等级及其表情 -->
            <b>IP城市：</b>${scamInfo.ip_city}<br> <!-- 显示IP所在城市 -->
            <b>IP国家：</b>${countryFlag} ${countryCode}<br> <!-- 显示IP国家及其旗帜 -->
            <b>ISP名称：</b>${scamInfo['ISP Name']}<br> <!-- 显示ISP名称 -->
            <b>ISP欺诈分数：</b>${scamInfo['ISP Fraud Score']}<br> <!-- 显示ISP欺诈分数 -->
            <b>ASN编号：</b>${scamInfo.as_number}<br> <!-- 显示ASN编号 -->
            <b>ASN机构：</b>${scamInfo['Organization Name']}<br> <!-- 显示ASN机构名称 -->
            
            <br> <!-- 添加一个空行 -->
            <b style="color: red;">节点：</b> ➟ <span style="color: red;">${nodeName}</span> <!-- 显示当前节点名称 -->
        </p>
    `;


        // 将结果显示在QX面板上
        $done({ // 完成请求，返回结果
            title: "IP欺诈分查询", // 设置面板标题
            htmlMessage: resultHtml // 设置面板内容为结果HTML
        });

    }).catch(error => { // 处理欺诈信息请求错误
        console.error(error); // 打印错误信息
        const errorMessage = "<p style='text-align: center;'>🔴 查询超时</p>"; // 设置错误消息
        $done({ // 完成请求，返回错误消息
            title: "IP欺诈分查询", // 设置面板标题
            htmlMessage: errorMessage // 设置面板内容为错误消息
        });
    });
}).catch(error => { // 处理IP信息请求错误
    console.error(error); // 打印错误信息
    const errorMessage = "<p style='text-align: center;'>🔴 查询超时</p>"; // 设置错误消息
    $done({ // 完成请求，返回错误消息
        title: "IP欺诈分查询", // 设置面板标题
        htmlMessage: errorMessage // 设置面板内容为错误消息
    });
});
