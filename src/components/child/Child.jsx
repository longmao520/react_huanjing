import React, { Component } from 'react'
import GrandChild from './GrandChild'
export default class
    extends Component {
    render() {
        return (
            <div>
                <GrandChild inputRef={this.props.inputRef}></GrandChild>
            </div>
        )
    }
}
