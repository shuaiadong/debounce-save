const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = function (envs, argv) {
    const env = argv.mode  === 'development' ?  true : false;
    console.log(env, 'env')
return {
        devServer: {
            // proxy: {
            //     '/comments': {
            //         target: 'https://m.weibo.cn', // 目标地址
            //         changeOrigin: true,            // * 
            //         logLevel: 'debug',             // 控制台日志
            //         pathRewrite: {
            //             '^/comments': '/comments'  // 重定向
            //         },
            //         headers: {
            //         }
            //     }
            // },
            before: function (app) {
                app.post('/save', (res, req)=> {
                    req.json({
                        status: 'ok'
                    })
                })
            }
        },
        // 入口
         entry: {
             index: [path.resolve(__dirname, './index.js')],
         },

         // 输出
         output: {
             filename: env ? 'js/[name].dev.js' : 'js/[name].[hash].js',
             chunkFilename: env ? '[name].chunk.js' : '[name].[chunkhash].js',
             path: path.resolve(__dirname, './dist')
         },

         resolve: {
             alias: { // 别名
                 utils:path.resolve(__dirname, 'src/utils'),
                 src:  path.resolve(__dirname, 'src'),
                 mobx: path.resolve(__dirname, 'node_modules/mobx/lib/mobx.es6.js'),// 体积最小的 ES6 构建
             }
         },

         // 插件
         plugins: [
             new CleanWebpackPlugin(),
             new HtmlWebpackPlugin({
                 template: path.resolve(__dirname, './index.html')
             })
         ],

         // module
         module: {
             rules: [
                 // js
                 {
                     test: /\.js$/,
                     use: ['babel-loader'],
                     exclude: /node_modules/,
                    //  include: path.resolve(__dirname,)
                 },
             ]
         }
     }
}