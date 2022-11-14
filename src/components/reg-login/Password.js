import React from 'react'

export default function Password(props) {
    let { pwdname,id } = props
    return (
        <div>
            <label htmlFor={id}>{pwdname}</label>
            <input type="password" id={id} />
        </div>
    )
}
