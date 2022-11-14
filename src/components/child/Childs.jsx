import React, { Component } from 'react'
import PropTypes from 'prop-types'
export default class Childs extends Component {
    render() {
        return (
            <div>
                <h3>Childs组件</h3>
                {this.props.x + 100}
                {console.log(this.props)}
            </div>
        )
    }
}
Childs.propTypes = {
    // 定义类型
    x: PropTypes.string.isRequired
}
