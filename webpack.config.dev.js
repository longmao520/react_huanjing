const path = require('path')
// 在打包发布的时候先删除dist 目录下的文件 并且同步支持刷新浏览器

// 问题 : 如何解决 手动引入 hash 打包后的文件  需要 plugin 插件进行解决 
// html-webpack-plugin 插件 
//当我们运行 webpack 命令的时候 会在打包后的目录下的dist 文件下 根据 模板文件下的index.html 生成 index.html 文件
//运行webpack命令时，在发布目录dist自动生成一个根据模板index.html生成一个index.html文件
// 并且自动引入打包后的.js文件

//如何使用 plugins 插件 
// 1.加载插件 const 插件类=require(“插件名”);
// 2. 第二步:  new 插件类({配置项})
// 引入插件   mini-css-extract-plugin
const merge = require('webpack-merge');
const base = require("./webpack.config.base")
//const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = merge(base, {
    mode: "development",
    devtool: "source-map",
    // plugins: [
    //     new CopyWebpackPlugin([
    //         {
    //             from: __dirname + "/src/mock",
    //             to: __dirname + "/dist/mock",
    //         },
    //     ]),
    // ],

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }, {
                    loader: 'sass-loader' // compiles sass to CSS
                },
                ]
            },


            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS
                    options: {
                        modules: false
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
                        loader: "style-loader", // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                        options: {
                            modules: true,
                        },
                    }],
            },

        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,//会 gzip(压缩) 和 serve(服务) 所有来自项目根路径下 dist/ 目录的文件
        port: 9000,
        proxy: {
            "/data": { //地址
                "target": "http://wz321.cp1j07.cnaaa3.com/data22.php", //接口地址,跨域访问
                // secure: false,// 如果是https接口，需要配置这个参数
                "changeOrigin": true,//开启跨域
                "pathRewrite": { "^/data": "" }//如果接口本身没有/data需要通过pathRewrite来重写了地址
            }
        },
        overlay: {
            warnings: true,
            errors: true
        },

    },
}
)