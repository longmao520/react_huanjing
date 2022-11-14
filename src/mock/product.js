var Mock = require("mockjs")
// 设置4秒后再响应
Mock.setup({ timeout: 1000 });
// Mock响应模板
Mock.mock('product.php', 'get', function (options) {
    return Mock.mock({
        "data|1-6": [{   // 随机生成1到6个数组元素
            'prodId|+1': 88,    // 属性值自动加 1，初始值为88
            'prodName|1': ['计算机', "手机", "桌子"],
            'price|1': [1000, 1200, 800, 900]   // 18至28以内随机整数, 0只是用来确定类型
        }]
    });
});