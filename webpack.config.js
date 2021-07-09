// node 内置模块，不需要安装
const path = require('path')
module.exports = {
    // 模式：开发模式：development 、 生产模式：production
    mode: 'development',
    // 入口文件
    entry: './src/index.js',
    // 出口文件
    output: {
        filename: '[name].bundle.js',// 打包后的文件名
        path: path.resolve(__dirname, 'dist')// 路径必须是一个绝对路径，（__dirname）以当前目录产生一个绝对路径
    }
}