const message = {
    action: "dns_clear_cache"
};

$configuration.sendMessage(message).then(resolve => {
    if (resolve.error) {
        console.log("清除 DNS 缓存失败:", resolve.error);
    } else {
        console.log("DNS 缓存清除成功:", JSON.stringify(resolve.ret));
    }
    $done();
}, reject => {
    console.log("出现了意外错误:", reject);
    $done();
});
