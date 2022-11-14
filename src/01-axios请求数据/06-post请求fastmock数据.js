import React, { Component } from 'react'
import axios from "axios"
import Style from "@/css/style.css"
const base_url = require("@/config").base_url // 获取前面的地址
var classNames = require("classnames")
export default class App extends Component {
    state = {
        stus: [],
        isLoading: false
    }

    handleClick = () => {
        this.setState({
            stus: [],
            isLoading: true
        })
        axios.post(`${base_url}/stus2`, {
            // 发送的数据 属性：值
            name: "why",
            age: 1000
        }).then(res => {
            this.setState({
                stus: res.data.info.data,
                isLoading: false
            })
        })
    }
    render() {
        let { stus, isLoading } = this.state
        //  let classNames = isLoading ? `special loading` : "special"
        let className = classNames(Style.special, { [Style.loading]: isLoading })
        return (
            <div>
                <button onClick={this.handleClick}>点击获取数据</button>
                <ul className={className}>
                    {
                        stus.map((item) => {
                            return <li key={item.id}>
                                学号：{item.id}
                                姓名：{item.name}
                                年龄：{item.age}
                                性别：{item.sex}
                            </li>
                        })
                    }
                </ul>

            </div>
        )
    }
}
