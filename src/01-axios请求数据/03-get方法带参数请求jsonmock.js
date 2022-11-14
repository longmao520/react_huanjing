import axios from 'axios'
import classNames from 'classnames'
import React, { Component } from 'react'
import "../mock/data2"
import Style from "@/css/style"
const classname = require("classnames")
export default class App extends Component {
    state = {
        dataList: [],
        isLoading: false
    }
    getData = () => {
        this.setState({
            isLoading: true
        })
        axios.get(`data.php?name=petter`).then(res => {
            this.setState({
                dataList: res.data.data,
                isLoading: false
            })
        })
    }
    render() {
        let classNames = classname({ [Style.loading]: this.state.isLoading })
        return (
            <div>
                <button onClick={this.getData} >点击请求数据</button>
                <ul className={classNames} style={{ border: "1px solid #f90", width: "400px", height: "200px" }}

                >
                    {
                        this.state.dataList.map((item) => {
                            return (
                                <li key={item.id}>
                                    姓名：{item.name}
                                    年龄：{item.age}
                                    性别：{item.sex}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}
