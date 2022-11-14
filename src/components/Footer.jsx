import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        let { todoNum, changeView, view, clearComplete, todoDatas } = this.props
        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>{todoNum}</strong>
                    <span>  item left</span>
                </span>
                <ul className="filters">
                    <li>
                        <a href="#/all" className={view === "all" ? "selected" : ""} onClick={() => {
                            changeView("all")
                        }} >All</a>
                    </li>
                    <li>
                        <a href="#/active" className={view === "active" ? "selected" : ""} onClick={() => {
                            changeView("active")
                        }}    >Active</a>
                    </li>
                    <li>
                        <a href="#/completed" className={view === "completed" ? "selected" : ""} onClick={() => {
                            changeView("completed")
                        }} >Completed</a>
                    </li>
                </ul>
                {todoDatas.map(item => {
                    if (item.hasCompleted) {
                        return <button key={item.id} className="clear-completed" onClick={() => {
                            clearComplete()
                        }} >Clear Completed</button>
                    }
                })}



            </footer>
        )
    }
}
