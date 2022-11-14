import React, { useState } from 'react'
import Button from '../Button'
import Password from '../Password'
import UserName from '../userName'

export default function Login() {
    const handleClick = () => {
        console.log("登录");
    }
    return (
        <div>
            <UserName name={"用户名:"}  ></UserName>
            <Password pwdname={"密码:"} id="pwd1" ></Password>
            <Button btnName="登录:" handleClick={handleClick}></Button>
        </div>
    )
}
