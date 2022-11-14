import React, { Component } from 'react'
import classNames from 'classnames'
import Style from "@/css/style"
import jsonp from "jsonp"
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
        jsonp("http://wz321.cp1j07.cnaaa3.com/data22.php", {
            // jsonp 存在的问题 不是promise API 没有拦截
            // 封装jsonp 支持promise 支持拦截
            param: "callback",//jsonp 存储jsonp函数名的变量
        }, (error, res) => {
            if (res) {
                this.setState({
                    stus: res.data,
                    isLoading: false
                })
            }
            else {
                console.log(error);
            }
        })


    }
    render() {
        let { stus, isLoading } = this.state
        let classes = classNames(Style.special, { [Style.loading]: isLoading })
        return (
            <div>
                <button onClick={this.handleClick}>点击获取数据</button>
                <ul className={classes}>
                    {
                        stus.map(item => {
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
