

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
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require("webpack-merge")
const base = require("./webpack.config.base")
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(base, {
    mode: "production",
    plugins: [
        // 需要安装一个插件 将css文件提取成独立的文件 
        // mini-css-extract-plugin
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'css/[name]-[hash].css',// 将css 打包到css目录下 
            chunkFilename: '[id].css',
        }),
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
        ]
    },
    optimization: {
        minimize: true, //使用 TerserPlugin 压缩js,默认true
        minimizer: [   //自定义 TerserPlugin压缩
            new TerserPlugin({
                cache: true, //缓存 优化速度
                parallel: true //多线程
            }),
            new OptimizeCSSAssetsPlugin({})  //css压缩
        ]
    }

}
)
