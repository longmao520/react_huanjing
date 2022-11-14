import React, { Component } from 'react'
import "./css/index.css"
import Items from './Items'
import Footer from './Footer'
export default class App extends Component {
    state = {
        todoDatas: [
            // { id: "1", value: "abc", hasCompleted: false },//#1111
            // { id: "2", value: "eee", hasCompleted: false },//#2222
            // { id: "3", value: "ffff", hasCompleted: false }//#3333
        ],
        todoNum: 0,   // 记录 数据的个数
        view: "all", // 过滤的标识
        flag: false
    }
    addContent = (e) => {
        // 添加记录 todo
        if (e.keyCode !== 13) return;
        if (e.target.value.trim() === "") return
        let { todoDatas, todoNum } = this.state
        let todo = {}
        todo.id = new Date().getTime()
        todo.value = e.target.value.trim()
        todo.hasComplete = false
        todoDatas.push(todo)
        todoNum++
        this.setState({
            todoDatas,
            todoNum
        })
        e.target.value = ""
    }
    // 删除数据 
    deleTodo = (todo) => {
        // 处理子组件传回来的数据
        let { todoDatas, todoNum } = this.state
        // 根据id的值 进行判断
        let todolist = todoDatas.filter(item => {
            if (item.id !== todo.id) {
                return true
            }
            else {
                todoNum--
                return false
            }
        })
        this.setState({
            todoDatas: todolist,
            todoNum
        })
    }
    // 改变状态
    changeComplete = (todo) => {
        console.log(todo)
        let { todoDatas, todoNum } = this.state
        // 点击后改变hasComplete
        todoDatas = todoDatas.map(item => {
            if (item.id === todo.id) {
                item.hasComplete = !todo.hasComplete
                if (item.hasComplete) {
                    todoNum--
                }
                else {
                    todoNum++
                }
            }
            return item
        })
        this.setState({
            todoDatas,
            todoNum
        })
    }
    //当失去焦点的时候 要进行数据的更新
    handleBlurEditContent = (todo) => {
        let { todoDatas } = this.state
        todoDatas = todoDatas.map(item => {
            if (item.id === todo.id) {
                item.value = todo.value
            }
            return item
        })
        this.setState({
            todoDatas
        })
    }
    //过滤
    filterTodo = (view) => {
        this.setState({
            view
        })
    }
    //清楚已经完成的todo
    clearComplete = () => {
        let { todoDatas } = this.state
        todoDatas = todoDatas.filter(item => {
            if (item.hasComplete) {
                return false
            } else {
                return true
            }
        })
        this.setState({
            todoDatas,
        })
    }
    // 是否全选
    isAllSelect = () => {
        let { todoDatas, flag, todoNum } = this.state
        flag = !flag
        todoDatas = todoDatas.map((item) => {
            if (flag) {
                item.hasComplete = true
            } else {
                item.hasComplete = false
            }
            return item
        })
        if (flag) {
            todoNum = 0
        } else {
            todoNum = todoDatas.length
        }
        this.setState({
            todoDatas, flag, todoNum
        })

    }
    render() {
        let { todoDatas, todoNum, view } = this.state
        let todo = todoDatas.filter(item => {
            switch (view) {
                // 如果是all  return true  那么就全是true  todo 就是 所有的数据
                case "all":
                    return true
                case "active":
                    return !item.hasComplete
                case "complete":
                    return item.hasComplete
                default:
                    return true
            }
        })

        return (
            <section className='todoapp' >
                <header className="header">
                    <h1>Todos</h1>
                    <input type="text" className="new-todo" placeholder="What needs to be done?"
                        onKeyUp={this.addContent} />
                </header>
                <section className='main'>
                    {/* 全选   全不选   选择用checkbox */}
                    <input type="checkbox" id="toggle-all" className='toggle-all'
                        onClick={() => {
                            this.isAllSelect()
                        }}
                    />
                    <label htmlFor='toggle-all'></label>
                    <ul className='todo-list'>
                        {
                            todo.map(item => <Items key={item.id} item={item} deleTodo={this.deleTodo}
                                // 改变状态
                                changeComplete={this.changeComplete}
                                // 失去焦点的时候 
                                handleBlurEditContent={this.handleBlurEditContent}
                            ></Items>)
                        }
                    </ul>
                </section>

                <Footer todoDatas={todoDatas}
                    todoNum={todoNum} filterTodo={this.filterTodo} view={view} clearComplete={this.clearComplete} />

            </section>


        )
    }
}
