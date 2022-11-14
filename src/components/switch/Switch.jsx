import React, { Component } from 'react'
import "./switch.less"
export default class
    extends Component {
    render() {
        let { checked, onChange, checkedColor, uncheckedColor, checkedText, uncheckedText, disabled } = this.props
        checkedColor = checkedColor ? checkedColor : "#09f"
        return (
            <div className='my-switch'>
                <input type={"checkbox"} className='switch-input' id='switch-input'
                    checked={checked}
                    onChange={() => onChange(checked)}
                    disabled={disabled}

                />
                <label htmlFor="switch-input" className={`switch-label${disabled ? " disabled" : ""}`}
                    style={{ background: checked ? checkedColor : uncheckedColor }}
                >
                    <span className={`switch-text${checked ? "" : " untext"}`}>{checked ? checkedText : uncheckedText}</span>
                    <span className='switch-button'></span>
                </label>
            </div>
        )
    }
}
