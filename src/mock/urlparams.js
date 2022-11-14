var Mock = require("mockjs")
Mock.mock("data3.php", "post", function (options) {
    console.log(options.body);
    var data = options.body
    var url = new URLSearchParams(data)
    var name = url.get("name")
    var age = url.get("age")
    return Mock.mock({
        "data|1-6": [
            {
                "id|+1": 88,
                "name|1": ["@cname", "@name", "@name", "@cname", name],
                "age|1": [19, 10, 20, age],
                "sex|1": ["男", "女"]
            }
        ]
    })
})
