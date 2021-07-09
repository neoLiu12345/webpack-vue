// 压缩css文件
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// 压缩Js文件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const configBase = require('./webpack.config.base')
module.exports = function () {
    const webpackBase = configBase()
    // 模式：开发模式：development 、 生产模式：production
    webpackBase.mode = 'production'
    /** 优化项 */
    webpackBase.optimization = {
        minimize: true,
        minimizer: [
            /** 压缩css */
            new OptimizeCssAssetsPlugin(),
            /** 压缩js */
            new UglifyJsPlugin()
        ],
        /** 分割代码块 --》 看情况使用 */
        splitChunks: {
            /** 缓存组 */
            cacheGroups: {
                /** 公共模块 */
                common: {
                    chunks: 'initial',// 入口处， 
                    minSize: 0,// 大小
                    minChunks: 2,// 使用次数
                }
            }
        }
    }
    
    return webpackBase
}
