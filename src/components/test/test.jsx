import React, { Component } from 'react'

export default class test extends Component {
    myref = React.createRef()
    ref = React.createRef()
    state = {
        value: "",
        count: 0
    }
    handleChange = (e) => {

        this.setState({
            value: e.target.value
        })
    }
    render() {
        return (
            <div>
                <h3>App组件</h3>
                <input type="text" ref={this.ref} defaultValue="111" />
                <button onClick={() => {
                    console.log(this.ref.current.value)
                }} >获取当前组件的dom对象</button>
                <hr />

                {/*  相当于执行 new InutRef({props对象})     */}
                <InputRef inputRef={el => {

                    this.myref.current = el
                }}></InputRef>
                <button onClick={() => {
                    console.log(this.myref.current.value);
                    this.myref.current.focus()
                }}>点击获取焦点</button>
                <hr />
                <br />
                <input type="text" onKeyUp={this.handleChange} />
                <p style={{ background: "#ff0" }}>{this.state.value}</p>

                {this.state.count}
                <button onClick={() => {
                    this.setState((prevState) => ({
                        count: prevState.count + 1
                    }))
                }
                } >+</button>

            </div>
        )
    }
}
