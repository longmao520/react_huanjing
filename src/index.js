import React from "react"
import ReactDom from "react-dom"
import App from "./01-axios请求数据/13-jsonp跨域请求数据"
ReactDom.render(
    <App />,// 对于类组件来说 相当于new App() 并且执行 生命周期
    document.getElementById('app')) 