var Mock = require("mockjs")
Mock.mock('check.php', 'post', function (options) {
    console.log(options.body)
    var data = JSON.parse(options.body)
    let userName = data.userName
    let password = data.password
    if (password === '123' && userName === "tom") {
        return Mock.mock({
            'code': "10001",
            'msg': '登录成功'
        })

    }
    else {
        return Mock.mock({
            'code': 20001,
            'msg': '登录失败'
        })
    }
})