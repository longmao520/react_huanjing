import axios from 'axios'
import React, { Component } from 'react'

export default class App extends Component {
    state = {
        email: "",
        success: true,
        errMessage: ""
    }
    componentDidMount() {
        axios.get("https://randomuser.me/api").then(res => {
            this.setState({
                success: true,
                email: res.data.results[0].email
            })
        }).catch(error => {
            this.setState({
                errMessage: error.response.data,
                success: false
            })
        })
    }
    render() {
        //axios 请求错误处理
        let { success, email, errMessage } = this.state
        return (
            <div>
                {success ? <p>{email}</p> : <p>{errMessage}</p>}
            </div>
        )
    }
}
