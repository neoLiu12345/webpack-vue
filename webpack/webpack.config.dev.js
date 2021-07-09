const configBase = require('./webpack.config.base')
module.exports = function (env) {
    console.log(123)
    console.log(env)
    console.log(123)
    
    const webpackBase = configBase()
    // 模式：开发模式：development 、 生产模式：production
    webpackBase.mode = 'development'
    /**
     *  devtool （和eslist的区别）
     * 增加映射文件，可以帮助我们调试源代码
     * 1、source-map：源码映射会生成一个 sourcemap 文件 
     * 2、eval-source-map：不会产生单独的文件 但是可以显示行 和 列
     * 3、cheap-module-source-map： 不会产生列 但是是一个单独的映射文件 -》 产生后可以保留进行调试
     * 4、cheap-module-eval-source-map： 不会产生文件， 集成在打包后的文件中 不会产生列
     */
    webpackBase.devtool = 'source-map',
    webpackBase.devServer = {
            // 是否启用，热更新
            // hot: true,
            // 端口号
            port: 3000,
            // 打包进度条
            // progress: true,
            // // 作为服务的目录
            // contentBase: './dist',
            // // gzip 压缩--- gzip是什么？？？ 
            // compress: true,

            // /** ajax请求跨域代理 */
            // proxy: {
            //     "/api/*": {
            //         target: "http://localhost:3001/",
            //         changeOrigin: true,
            //         // 重写路径
            //         pathRewrite: {'/api': ''},
            //     }
            // }, 

            /** 前端mock 数据. 使用mock时，proxy跨域注销 */
            // before (app) {
            //     app.get('/api/user', (req, res) => {
            //             res.json({name: 'neo 0撒打算'})
            //     })
            // },
            /** 有服务端，不使用代理，在服务端启动webpack ，端口用服务端端口 -》 见Md文件， 服务端启动webpack */


    }
    // webpackBase.watch = true,
    // webpackBase.watchOptions = {
    //         poll: 1000,// 每秒  问我 1000 次
    //         aggregateTimeout: 500,// 防抖 
    //         ignored: /node_modules/ // 不需要监听的文件
    // }
    return webpackBase
}
