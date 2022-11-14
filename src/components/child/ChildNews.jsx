import React, { Component } from 'react'

export default class childNews extends Component {
    state = {
        name: "jarry",
        text: "帅哥"
    }
    // 在render 调用之前 使用父组件的props 更新子组件的state 
    // return  {} 更新state
    static getDerivedStateFromProps(nextProps, nextState) {
        // 会在初始挂载和后续更新时会被调用
        console.log("getDerivedStateFromProps 1  4");
        //将父组件的属性更新子组件的状态
        return {
            name: nextProps.name
        }
    }
    render() {
        console.log("render 2  6")
        return (
            <div>
                <h3>child</h3>
                <p>name:{this.props.name}</p>
                <div id="div1">{this.state.text}</div>
                <button onClick={() => {
                    this.setState({
                        text: ""
                    })
                }}   >点击</button>
            </div>
        )
    }
    componentDidMount() {
        console.log("componentDidMount 3")
    }

    shouldComponentUpdate() {
        console.log("shouldComponentUpdate 5")
        return true
    }
    getSnapshotBeforeUpdate() {
        // console.log(div1.cilentHeight);
        // DOM修改前调用：想获取DOM 再次修改前相关信息
        console.log("getSnapshotBeforeUpdate 7");
        return div1.clientHeight
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        console.log(snapshot);
        console.log("componentDidUpdate 8");
    }
}
