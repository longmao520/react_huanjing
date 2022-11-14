var Mock = require("mockjs")
Mock.setup({
    timeout: '1000-4000'
})
Mock.mock("data.php?name=petter", "get", function (options) {
    console.log(options);
    console.log(options.url.substr(8)) //  ?petter
    var urldata = new URLSearchParams(options.url.substr(8)) // 会忽略前面的问号
    var name = urldata.get("name"); // get 的方法 获得 名字
    console.log(name);

    return Mock.mock({
        "data|1-6": [{
            "id|+1": 88,
            "name|1": ["@cname", "@cname", "@cname", "@cname", name],
            "age|18-23": 0,
            "sex|1": ["男", "女"]
        }
        ]
    })
})

// Mock.mock('data.php?n', {
//     "data|1-6": [{   // 随机生成1到6个数组元素
//         'id|+1': 88,    // 属性值自动加 1，初始值为88
//         'name|1': ["@cname", "@cname", "@cname", "@cname", "@cname"],
//         'age|18-28': 0,   // 18至28以内随机整数, 0只是用来确定类型
//         'sex|1': ['男', "女"]
//     }]
// });