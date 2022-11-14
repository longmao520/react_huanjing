import React, { Component } from 'react'

export default class Child extends Component {
    constructor() {
        super()
        this.state = {
            count: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        }
        this.sid = null
        this.showTime()
    }

    showTime() {
        this.sid = setInterval(() => {
            let date = new Date
            let hours = date.getHours()
            let minutes = date.getMinutes()
            let second = date.getSeconds()
            this.setState({
                hours: hours,
                minutes: minutes,
                seconds: second
            })
            console.log("计数器");

        }, 1000);
    }
    handleAdd = () => {
        this.setState({
            count: this.state.count + 1
        })
    }
    handleSub = () => {
        this.setState({
            count: this.state.count - 1
        })
    }
    //初始化阶段
    UNSAFE_componentWillMount() {
        // 挂载前  可以进行普通遍历的赋值操作
        console.log('componentWillMount 1');
    }
    render() {
        // 挂载阶段 将 jsx 通过babel-loader 转化成 虚拟dom 对象 
        // 在render 调用完之后 生成真实的dom 对象 在render 中不能操控 dom 对象
        console.log("render 2  7");
        let { hours, minutes, seconds } = this.state
        return (
            <div>
                <h3>Child组件</h3>
                {this.props.name}:{this.props.age}
                <button onClick={this.handleSub}>-</button>
                {this.state.count}
                <button onClick={this.handleAdd}>+</button>
                <hr />
                {/* 显示时间 */}
                {hours}:{minutes}:{seconds}

            </div>
        )
    }
    componentDidMount() {
        // 挂载后 
        // 操作真实的dom 
        // 初始化组件 ajax 
        // 初始化图形库
        // 可以使用this.setstate 进行重新渲染
        console.log("componentDidMount 3")
        window.onscroll = function () {
            console.log(window.pageYOffset, "滚动条滚动了")
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log(nextProps, "componentWillReceiveProps 4")
        // 通过父组件给子组件传递的this.porps更新子组件的this.state值
        if (nextProps.num !== this.props.num) {
            this.setState({
                count: nextProps.num
            })
        }

    }
    shouldComponentUpdate(nextProps, nextState) {
        // 判断是否更新组件
        //  老的状态和新的状态进行比较  或者使用 PureComponent 父类组件
        console.log("shouldComponmentUpdate 5")
        return true
    }
    UNSAFE_componentWillUpdate() {
        // 将要更新
        console.log('componmentWillUpdate 6')
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate 8");
    }
    // 卸载阶段
    componentWillUnmount() {
        // 清理定时器

        clearInterval(this.sid)
        // 清理滚动监听
        window.onscroll = null
    }
}
