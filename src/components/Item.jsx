import React, { Component } from 'react'
var classNames = require('classnames');
export default class Item extends Component {
    state = {
        edit: false
    }
    myref = React.createRef()
    changeEdit = () => {
        let { item } = this.props
        this.setState({
            edit: true
        }, () => {
            this.myref.current.value = item.title
            this.myref.current.focus()
        })
    }
    render() {
        let { edit } = this.state
        let { item, deleteTodo, changeComplete, editTodoContent } = this.props
        let className = classNames({ completed: item.hasCompleted, editing: edit })
        return (
            <li className={className}>
                <div className="view">
                    <input type="checkbox" className="toggle"
                        onChange={() => {
                            changeComplete(item)
                        }} checked={item.hasCompleted}
                    />
                    <label onDoubleClick={() => {
                        this.changeEdit()

                    }}    >{item.title}</label>
                    <button className="destroy" onClick={() => {
                        deleteTodo(item)
                    }}    ></button>
                </div>
                <input type="text" className="edit" ref={this.myref}
                    //失去焦点的时候
                    onBlur={edit ? () => {
                        item.title = this.myref.current.value.trim()
                        editTodoContent(item)
                        this.setState({
                            edit: false
                        })
                    } : null}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            item.title = this.myref.current.value.trim()
                            editTodoContent(item)
                            this.setState({
                                edit: false
                            })
                        }
                        if (e.key === 'Escape') {
                            this.setState({
                                edit: false
                            })
                        }
                    }}
                />
            </li>
        )
    }
}
