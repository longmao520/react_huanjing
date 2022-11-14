import axios from 'axios'
import React, { Component } from 'react'
import classNames from 'classnames'
import Style from "@/css/style"
import "@/mock/data"
import "@/mock/product"
export default class App extends Component {

    state = {
        dataList: [],
        product: [],
        isLoading: false
    }
    handleClick = () => {
        this.setState({
            dataList: [],
            product: [],
            isLoading: true
        })
        axios.all([
            axios.get("data.php"),
            axios.get("product.php")
        ]).then(axios.spread((res1, res2) => {
            // 上面的两个请求都完成后 才执行这个回调方法
            // axios.spread 分割成不同的写法
            this.setState({
                dataList: res1.data.data,
                product: res2.data.data,
                isLoading: false
            })
        }))
    }

    render() {
        let { dataList, product, isLoading } = this.state
        let classes = classNames(Style.special, { [Style.loading]: isLoading })
        return (
            <div>
                <button onClick={this.handleClick}>点击获取信息</button>
                <ul className={classes}>
                    {
                        dataList.map((item) => {
                            return <li key={item.id}>
                                学号：{item.id}
                                姓名：{item.name}
                                年龄：{item.age}
                                性别：{item.sex}
                            </li>
                        })
                    }
                </ul>
                <ul className={classes}>
                    {
                        product.map((item) => {
                            return <li key={item.prodId}>
                                商品名：{item.prodName}
                                价格：{item.price}

                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }
}
