import axios from 'axios'
import React, { Component } from 'react'
import "@/mock/urlparams"
import Style from "@/css/style"
import classNames from 'classnames'
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
        let url = new URLSearchParams()
        url.append("name", "tom")
        url.append("age", 90)
        axios({
            url: "data3.php",
            method: "post",
            data: url
        }).then((res) => {
            console.log(res.data);
            this.setState({
                stus: res.data.data,
                isLoading: false
            })
        })
    }
    render() {
        let { stus, isLoading } = this.state
        let classes = classNames({ [Style.loading]: isLoading }, Style.special)
        return (
            <div>
                <button onClick={this.handleClick}>点击获取数据</button>
                <ul className={classes}>
                    {
                        stus.map(item => {
                            return <li key={item.id}>
                                学号：{item.id}
                                姓名：{item.name}
                                年龄: {item.age}
                                性别: {item.sex}
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }
}
