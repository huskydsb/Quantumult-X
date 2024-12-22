/*
[rewrite_local]
^https?:\/\/api\.m\.jd\.com/client\.action\?functionId=(wareBusiness|serverConfig|basicConfig) url script-response-body https://raw.githubusercontent.com/huskydsb/Quantumult-X/main/Scripts/jd_price.js
[mitm]
hostname = api.m.jd.com
*/

const path1 = "serverConfig";
const path2 = "wareBusiness";
const path3 = "basicConfig";
const consoleLog = false; // 控制日志开关
const url = $request.url;
const body = $response.body;

// 处理 serverConfig 接口
if (url.includes(path1)) {
    let obj = JSON.parse(body);
    delete obj.serverConfig.httpdns;
    delete obj.serverConfig.dnsvip;
    delete obj.serverConfig.dnsvip_v6;
    $done({ body: JSON.stringify(obj) });
}

// 处理 basicConfig 接口
if (url.includes(path3)) {
    let obj = JSON.parse(body);
    const JDHttpToolKit = obj.data?.JDHttpToolKit;
    if (JDHttpToolKit) {
        delete JDHttpToolKit.httpdns;
        delete JDHttpToolKit.dnsvipV6;
    }
    $done({ body: JSON.stringify(obj) });
}

// 处理 wareBusiness 接口
if (url.includes(path2)) {
    let obj = JSON.parse(body);
    if (obj?.code > 0 && obj?.wait > 0) {
        $notify("灰灰提示", "可能被风控，请勿频繁操作", obj?.tips);
        $done({ body });
    }

    const floors = obj.floors || [];
    const commodityInfo = floors[floors.length - 1];
    const shareUrl = commodityInfo?.data?.property?.shareUrl;

    // 请求历史价格
    requestHistoryPrice(shareUrl).then((data) => {
        if (data) {
            const lowerWord = createAdWord();
            lowerWord.data.ad.textColor = "#fe0000";

            let bestIndex = floors.findIndex((element) =>
                element.mId === lowerWord.mId && element.sortId > lowerWord.sortId
            );
            bestIndex = bestIndex === -1 ? floors.length : bestIndex;

            if (data.ok === 1 && data.single) {
                const lower = getLowerMsg(data.single);
                const detail = priceSummary(data);
                const tip = data.PriceRemark?.Tip + "(仅供参考)";
                lowerWord.data.ad.adword = `${lower} ${tip}\n${detail}`;
            } else if (data.ok === 0 && data.msg.length > 0) {
                lowerWord.data.ad.adword = "慢慢买提示您：" + data.msg;
            }

            floors.splice(bestIndex, 0, lowerWord);
            $done({ body: JSON.stringify(obj) });
        } else {
            $done({ body });
        }
    }).catch(() => {
        $done({ body });
    });
}

// 生成广告组件
function createAdWord() {
    return {
        bId: "eCustom_flo_199",
        cf: { bgc: "#ffffff", spl: "empty" },
        data: {
            ad: {
                adword: "",
                textColor: "#8C8C8C",
                color: "#f23030",
                newALContent: true,
                hasFold: true,
                adLinkContent: "",
                adLink: ""
            }
        },
        mId: "bpAdword",
        refId: "eAdword_0000000028",
        sortId: 13,
        overHeight: 0,
        overlayToViewHeight: 0,
        taroDegrade: false
    };
}

// 获取最低价信息
function getLowerMsg(single) {
    const lower = single.lowerPriceyh;
    const timestamp = parseInt(single.lowerDateyh.match(/\d+/), 10);
    const lowerDate = formatDate("yyyy-MM-dd", timestamp);
    return `历史最低:¥${lower} (${lowerDate})`;
}

// 汇总价格信息
function priceSummary(data) {
    const listPriceDetail = data.PriceRemark.ListPriceDetail.slice(0, 4);
    const history = getHistorySummary(data.single);
    const list = listPriceDetail.concat(history);

    return list.map(item => {
        const nameMap = { "双11价格": "双十一价格", "618价格": "六一八价格" };
        item.Name = nameMap[item.Name] || item.Name;
        return `${item.Name}        ¥${item.Price}        ${item.Date}        ${item.Difference}`;
    }).join("\n");
}

// 获取历史价格汇总
function getHistorySummary(single) {
    const currentPrice = parseFloat(single.jiagequshiyh.split(",")[0]);
    const historyData = JSON.parse(`[${single.jiagequshiyh}]`).reverse();
    const periods = [30, 90, 180, 360];
    const results = [];

    for (const days of periods) {
        const lowest = historyData.slice(0, days).reduce((prev, curr) => {
            const price = parseFloat(curr[1]);
            return price < prev.price ? { price, date: curr[0] } : prev;
        }, { price: Infinity, date: "" });

        results.push({
            Name: `${days}天最低`,
            Price: lowest.price,
            Date: formatDate("yyyy-MM-dd", lowest.date),
            Difference: calculateDifference(currentPrice, lowest.price)
        });
    }

    return results;
}

// 计算价格差异
function calculateDifference(currentPrice, price) {
    const diff = (currentPrice - price).toFixed(2);
    return diff === "0.00" ? "-" : `${diff > 0 ? "↑" : "↓"}${Math.abs(diff)}`;
}

// 请求历史价格数据
function requestHistoryPrice(shareUrl) {
    return new Promise((resolve, reject) => {
        const options = {
            url: "https://apapia-history.manmanbuy.com/ChromeWidgetServices/WidgetServices.ashx",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                "User-Agent": "iPhone/CFNetwork/Darwin"
            },
            body: `methodName=getHistoryTrend&p_url=${encodeURIComponent(shareUrl)}`
        };

        $task.fetch({ method: "POST", ...options }).then(response => {
            consoleLog && console.log("请求结果:", response.body);
            resolve(JSON.parse(response.body));
        }).catch(error => {
            consoleLog && console.log("请求错误:", error);
            reject(error);
        });
    });
}

// 日期格式化函数
function formatDate(fmt, timestamp) {
    const date = new Date(timestamp);
    const opt = {
        "yyyy": date.getFullYear(),
        "MM": (`0${date.getMonth() + 1}`).slice(-2),
        "dd": (`0${date.getDate()}`).slice(-2)
    };
    return fmt.replace(/yyyy|MM|dd/g, key => opt[key]);
}