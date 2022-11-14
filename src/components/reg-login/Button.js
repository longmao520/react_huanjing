import React from 'react'
import Style from "../../bootstrap-3.4.1-dist/css/bootstrap.min.css"
export default function Button(props) {
    let className = Style.btn + " " + Style["btn-primary"];
    let { btnName } = props
    return (
        <div>
            <button className={className} >{btnName}</button>

        </div>
    )
}
