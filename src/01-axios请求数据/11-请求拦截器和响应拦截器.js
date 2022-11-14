import axios from 'axios'
import React, { Component } from 'react'
import classNames from 'classnames'
import Style from "@/css/style"
import "@/mock/data"
import "@/mock/product"
export default class App extends Component {
    // 请求拦截器 我们可以在请求前 进行设置
    //响应拦截器 在数据回来之前进行配置

    componentDidMount() {
        axios.interceptors.request.use(config => {
            // 在发送请求前做的某事
            this.setState({
                isLoading: true
            })
            console.log(config);
            return config
        }, error => {
            // 请求错误时做的事情
            return Promise.reject(error)
        })
        axios.interceptors.response.use(response => {
            //对响应的数据做一些事情
            this.setState({
                isLoading: false
            })
            return response
        }, error => {
            // 请求错误时做一些事情
            return Promise.reject(error)
        })
    }
    state = {
        dataList: [],
        product: [],
        isLoading: false
    }
    handleClick = () => {
        this.setState({
            dataList: [],
            product: [],
            // isLoading: true
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
                // isLoading: false
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
