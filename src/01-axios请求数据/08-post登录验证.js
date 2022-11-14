import axios from 'axios'
import React, { Component } from 'react'
import Style from "../css/style.css"
export default class App extends Component {
    userName = React.createRef()
    password = React.createRef()
    tips = React.createRef()
    login = React.createRef()
    manage = React.createRef()

    handleLogin = () => {
        const base_url = require("../config").base_url
        axios.post(`${base_url}/login`, {
            userName: this.userName.current.value,
            password: this.password.current.value
        }).then(res => {
            console.log(res.data.info);
            if (res.data.info.code === "10001") {
                this.login.current.style.display = "none"
                this.manage.current.style.display = "block"
            }
            else {
                this.tips.current.innerText = res.data.info.msg
            }
        })
    }
    handleFocus = () => {
        this.tips.current.innerText = ""
    }

    render() {
        return (
            <div  >
                <div ref={this.login}  >
                    <label htmlFor="userName">用户名
                        <input type="text" id='userName' ref={this.userName} onFocus={this.handleFocus} />
                    </label>
                    <label htmlFor="password">密码
                        <input type="password" id='password' ref={this.password} onFocus={this.handleFocus} />
                    </label>
                    <div className={Style.tips} ref={this.tips} ></div>
                    <br />
                    <button onClick={this.handleLogin} > 登录</button>
                </div>
                <div style={{ display: "none" }} ref={this.manage}>登录成功</div>
            </div>
        )
    }
}
