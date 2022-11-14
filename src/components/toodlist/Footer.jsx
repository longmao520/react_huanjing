import React, { Component } from 'react'

export default class Footer extends Component {

    render() {
        let { todoNum, filterTodo, view, clearComplete, todoDatas } = this.props
        return (
            <footer className='footer'>
                <span className='todo-count'>
                    <strong>{todoNum}</strong>
                    <span>{todoNum < 2 ? " item" : " items"} left</span>
                </span>
                <ul className='filters'>
                    <li><a href="#/all" className={view === "all" ? "selected" : ""} onClick={() => {
                        filterTodo("all")
                    }}     >All</a></li>
                    <li><a href="#/active" className={view === "active" ? "selected" : ""} onClick={() => {
                        filterTodo("active")
                    }}    >Active</a></li>
                    <li><a href="#/completed" className={view === "complete" ? "selected" : ""} onClick={() => {
                        filterTodo("complete")
                    }}  >Completed</a></li>
                </ul>
                <button key={item.id} className="clear-completed" onClick={() => {
                    clearComplete()
                }} >Clear Completed</button>
            </footer>
        )
    }
}
