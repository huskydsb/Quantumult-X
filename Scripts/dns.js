const message = {
    action: "dns_clear_cache"
};

$configuration.sendMessage(message).then(resolve => {
    if (resolve.error) {
        console.log("DNS 缓存清除失败:", resolve.error);
    } else {
        console.log("DNS 缓存清除成功", JSON.stringify(resolve.ret));
    }
    $done();
}, reject => {
    console.log("DNS 缓存清除出现了意外错误", reject);
    $done();
});
