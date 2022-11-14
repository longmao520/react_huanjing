import React, { Component } from 'react'
import axios from "axios"
import Style from "./css/style.css"
const base_url = require("./config").base_url
var classNames = require("classnames")
export default class App extends Component {
  state = {
    stus: [],
    isLoading: false
  }
  handleAddTodo = () => {
    // 添加todo 
  }

  handleClick = () => {
    this.setState({
      stus: [],
      isLoading: true
    })
    axios.get(`${base_url}/stus`).then(res => {
      this.setState({
        stus: res.data.data,
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
        <button>添加todo</button>
        <div>删除todo</div>
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
