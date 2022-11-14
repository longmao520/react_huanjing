import React, { Component } from 'react'
export default class GrandChild extends Component {
    render() {
        return (
            <div>
                <input type="text" ref={this.props.inputRef} />
            </div>
        )
    }
}
