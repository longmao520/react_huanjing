import React, { Component } from 'react'
import InputRefSon from './InputRefSon.jsx'

export default class InputRef extends Component {

    render() {
        console.log(this.props);
        return (
            <div>
                <InputRefSon inputRef={this.props.inputRef}></InputRefSon>

            </div>
        )
    }
}
