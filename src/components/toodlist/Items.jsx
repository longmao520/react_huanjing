import React, { Component } from 'react'
var classNames = require('classnames');
export default class Items extends Component {
    // 双击进入编辑状态 在item 组件中进行更新
    state = {
        edit: false,
        flag: true// 通过这个标识符进行  在按下esc 和 取消焦点时候 要进行 区分
    }
    myref = React.createRef()
    handleEdit(item) {
        this.setState({ edit: true }, () => {
            // 在dom 更新后 将label 的值赋值给 input 标签
            this.myref.current.value = item.value
            //  获取焦点
            this.myref.current.focus()
        })
    }
    render() {
        let { item, changeComplete, handleBlurEditContent, deleTodo } = this.props
        let { edit, flag } = this.state
        // editing 的类 控制input 的显示和隐藏
        let className = classNames({ completed: item.hasComplete, editing: edit })
        return (
            <li className={className}  >
                <div className='view'>
                    <input type="checkbox" className="toggle" onChange={() => {
                        changeComplete(item)
                    }} checked={item.hasComplete}
                    />
                    <label onDoubleClick={() => {
                        this.handleEdit(item)
                    }}       >{item.value}</label>
                    {/* 删除按钮 */}
                    <button className="destroy" onClick={() => {
                        deleTodo(item)
                    }}    ></button>
                </div>
                <input type="text" className='edit'
                    ref={this.myref}
                    onBlur={(e) => {
                        if (flag) {
                            item.value = e.target.value
                            handleBlurEditContent(item)
                            this.setState({
                                edit: false
                            })
                        }

                    }}
                    onKeyUp={(e) => {
                        if (e.keyCode === 13) {
                            item.value = e.target.value
                            handleBlurEditContent(item)
                            this.setState({
                                edit: false
                            })
                        }
                        if (e.keyCode === 27) {
                            handleBlurEditContent(item)
                            this.setState({
                                edit: false,
                                flag: false
                            })
                            setTimeout(() => {
                                this.setState({
                                    flag: true
                                })
                            }, 10);
                        }

                    }}


                />
            </li>

        )
    }
}
