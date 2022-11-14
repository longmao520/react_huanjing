import React, { Component } from 'react'
import axios from 'axios'
export default class App extends Component {
    state = {
        isLoading: false,
        dataList: []
    }
    getData = () => {
        axios.get("date.json").then(res => {
            console.log(res.data.data);
            this.setState({
                dataList: res.data.data
            })
        })
    }
    render() {
        return (
            <div>
                <button onClick={this.getData}>点击获取数据</button>
                <ul style={{ border: "1px solid #f90", width: "400px", height: "200px" }}>
                    {
                        this.state.dataList.map(item => {
                            return (
                                <li key={item.id}>
                                    姓名：{item.name}
                                </li>
                            )
                        })
                    }

                </ul>
            </div>
        )
    }
}
