import React from 'react'
import Button from '../Button'
import Password from '../Password'
import UserName from '../userName'

export default function Reg() {
    return (
        <div>
            <UserName name={"用户名:"}  ></UserName>
            <Password pwdname={"密码:"} id="pwd1" ></Password>
            <Password pwdname={"确认密码:"} id="pwd2" ></Password>
            <Button btnName="注册" ></Button>
        </div>
    )
}
