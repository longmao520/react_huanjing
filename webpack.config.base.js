const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const WebpackBar = require('webpackbar');

module.exports = {
    // 入口
    entry: {
        index: "./src/index.js",
        one: "./src/one.js"
    },
    // 出口
    output: {
        path: path.resolve(__dirname, "dist"),
        // 浏览器强制缓存是为了加快访问的速度
        // 浏览器每次请求的资源相同 浏览器才会强制缓存 
        //webpack 提供的hash名 可以防止浏览器强制缓存
        filename: "js/[name].[hash].main.js"
    },
    // 公共的plugin 配置
    plugins: [
        //配置多个应用
        new HtmlWebpackPlugin({ //假设是前台应用入口
            title: '首页',  // title 的标题 
            filename: "index.html",  //在dist 目录下生成的   文件名
            template: "./public/index.html",  // template 模板的意思
            chunks: ["index"]    //chunks指定需要引入的入口模块的键名 index:"./src/index.js"
            // chunks 指定需要引入的入口文件的键名
        }),
        new HtmlWebpackPlugin({//假设是后台应用入口one:"./src/one.js"
            title: 'One',
            filename: "one.html",
            template: "./public/one.html",
            chunks: ["one"] //chunks指定需要引入的入口模块的键名 one:"./src/one.js"
        }),
        new CleanWebpackPlugin(),

        new WebpackBar()

    ],
    module: {
        rules: [
            {
                test: /\.m?jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            //  url-loader 
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            publicPath: './../img',
                            outputPath: 'img/'
                        },
                    },
                ],
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    publicPath: './../fonts',
                    outputPath: 'fonts/'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.jsx', '.less', '.js', '.css'],
        alias: {
            "@": path.join(__dirname, "./src")
        }
    },
}
