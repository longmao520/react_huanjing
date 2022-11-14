const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 在打包发布的时候先删除dist 目录下的文件 并且同步支持刷新浏览器
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
// 问题 : 如何解决 手动引入 hash 打包后的文件  需要 plugin 插件进行解决 
// html-webpack-plugin 插件 
//当我们运行 webpack 命令的时候 会在打包后的目录下的dist 文件下 根据 模板文件下的index.html 生成 index.html 文件
//运行webpack命令时，在发布目录dist自动生成一个根据模板index.html生成一个index.html文件
// 并且自动引入打包后的.js文件

//如何使用 plugins 插件 
// 1.加载插件 const 插件类=require(“插件名”);
// 2. 第二步:  new 插件类({配置项})
// 引入插件   mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: {
        index: "./src/index.js",
        one: "./src/one.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        // 浏览器强制缓存是为了加快访问的速度
        // 浏览器每次请求的资源相同 浏览器才会强制缓存 
        //webpack 提供的hash名 可以防止浏览器强制缓存
        filename: "js/[name].[hash].main.js"
    },
    mode: "development",
    devtool: "source-map",
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
        // 需要安装一个插件 将css文件提取成独立的文件 
        // mini-css-extract-plugin
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'css/[name]-[hash].css',// 将css 打包到css目录下 
            chunkFilename: '[id].css',
        }),

        new CleanWebpackPlugin()


    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }, {
                    loader: 'sass-loader' // compiles sass to CSS
                }]
            },


            {
                test: /\.less$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader // creates style nodes from JS strings
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS
                    options: {
                        modules: true
                    }

                }, {
                    loader: 'less-loader' // compiles Less to CSS
                }]
            },
            {
                // 执行顺序 是 从右向左  从下到上
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader, // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                        options: {
                            modules: true,
                        },
                    }],
            },
            {
                test: /\.m?jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    // options: {
                    //     presets: ['@babel/preset-env', '@babel/preset-react']
                    // }
                }
            },
            // {
            //     test: /\.(png|jpe?g|gif)$/,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {
            //                 name: '[name].[ext]',
            //                 publicPath: './../img',  //该属性指明我们最终引用的文件路径（打包生成的index.html文件里面引用资源的前缀）
            //                 outputPath: 'img/'  //图片复制到的文件夹
            //             },
            //         },
            //         {
            //             loader: 'image-webpack-loader',
            //         },

            //     ],
            // },
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
                },
            },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,//会 gzip(压缩) 和 serve(服务) 所有来自项目根路径下 dist/ 目录的文件
        port: 9000,
        proxy: {
            "/data": { //地址
                "target": "http://wz321.cp1j07.cnaaa3.com/data.php", //接口地址,跨域访问
                // secure: false,// 如果是https接口，需要配置这个参数
                "changeOrigin": true,//开启跨域
                // "pathRewrite": { "^/data": "" }//如果接口本身没有/data需要通过pathRewrite来重写了地址
            }
        }
    },
    resolve: {
        extensions: ['.jsx', '.less', '.js', '.css']
    },


}
