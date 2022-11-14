import React from 'react'

export default function UserName(props) {
    let { name } = props
    return (
        <div>
            <label htmlFor='name'>{name}</label>
            <input type={"text"} id="name" />
        </div>
    )
}
