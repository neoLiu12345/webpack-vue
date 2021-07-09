// 绝对路径， node 内置模块，不需要安装,
const path = require('path')
// 根据模版，生成html
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 抽离css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 删除当前打包文件夹下的内容
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const webpack = require('webpack')

// 多线程打包
const Happypack = require('happypack')

// 静态资源地址
const staticPath = 'http://localhost:3000/'
module.exports = function () {
    let filesname = ['index', 'other']
    let entry = {}
    /** 多页面打包，通过循环，动态生成多个入口 */
    filesname.forEach(filename => {
        entry[filename] =  `./src/${filename}.js`
    })
    return {
        // sourceMap:
        /** 入口文件 */
        entry,
        // entry: {
        //     index: './src/index.js',
        //     other: './src/other.js'
        // },
        /** 出口文件 */
        output: {
            filename: 'js/[name].bundle.[hash:8].js',// 打包后的文件名name: 入口名称是什么默认就是什么名称    hash:8自动生产8位数的数字字母，保持每次打包文件名不一样（解决缓存问题）
            path: path.resolve('dist'),// 路径必须是一个绝对路径，（__dirname）以当前目录产生一个绝对路径
            publicPath: staticPath//静态资源，添加出口的路径，也可以单独给css、js、img加路径
        },
        /** 插件  */
        plugins: [
            // new HtmlWebpackPlugin({
            //     template: './src/other.html',
            //     filename: 'other.html',
            //     hash: false,
            //     chunks: ['other']
            // }),
            /** 优化， 过滤，第三方插件内部引用的代码, 未有改变大小，待确认 */
            new webpack.IgnorePlugin(/\.\/locale/,/moment$/),
            /** 抽离样式 */
            new MiniCssExtractPlugin({
                filename: 'css/[name].css'
            }),
            /** 删除文件 根据实际情况决定 */
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: ['dist', '!.gitignore'],
                // cleanOnceBeforeBuildPatterns: ['需要删除的文件目录', '!.gitignore'],
            }),
            /** 定义环境变量. 可以抽离出去，区分开发和测试环境， */
            new webpack.DefinePlugin({
                // DEV可根绝接口进行配置， dev可以是对应的接口地址比如：http://dex.waliwang.com/api/*
                DEV: JSON.stringify('dev'),// 字符串可以 通过JSON.stringfy()
                FLAG: 'true',// 布尔值, 或其他非字符串 不需要加，JSON.stringfy()
            }),
            /** 打包优化 */
            new Happypack({
                id: 'js',
                use: [
                    {
                        loader: 'babel-loader',
                        // 用babel-loader 需要把es6转es5
                        options: {
                            presets: [
                                '@babel/preset-env'
                            ],
                            // plugins: [
                            //     // "@babel/plugin-syntax-dynamic-import"
                            //     // "@babel/plugin-transform-runtime", //有问题后期查
                            //     ['@babel/plugin-proposal-decorators', {"legacy": true}],
                            //     ['@babel/plugin-proposal-class-properties', {"loose": true}]
                            // ]
                            // plugins: ["transform-decorators-legacy", "transform-class-properties"]
                        }
                    }
                ]
            })
        ].concat(filesname.map(filename =>  
            /** 生产打包后的html文件 */ // return省略了
            new HtmlWebpackPlugin({
                // 入口文件
                template: `./src/${filename}.html`,
                // 出口文件名
                filename: `${filename}.html`,
                // 是否增加 hash 值
                hash: false,
                /*** 压缩html 配置  */
                minify: {
                    // 删除双引号
                    removeAttributeQuotes: true,
                    // 是否折叠空行
                    collapseWhitespace: false,
                    // removeComments: true
                },
                // 代码块， 多页面打包时，根据名字去区分，打包生成对应页面引入 资源
                chunks: [filename]
            })
        )),
        /** 模块 */
        module: {
            /** 不去解析 * 中的依赖关系 */
            noParse: /jquery/,
            rules: [
                {
                    test: /\.html$/,
                    use: 'html-withimg-loader'
                },
                {
                    test: /\.js$/,
                    use: {
                        loader: 'eslint-loader',
                        options: {
                            enforce: 'pre', // previous 强制在前面执行
                        }
                    }
                },
                /** js校验 */
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    include: path.resolve('src'),
                    use: 'Happypack/loader?id=js'
                    /** 使用 happypack ，先注视 babel-loader 一动到 plugins， 代表多线程打包，内使用的是 ，babel的方法*/
                },
                /** loader 顺序，默认从右向左，从下向上执行
                 * style-loader 他是把css 插入到head的标签内
                 * css-loader 处理css文件，解析@import语法 比如：css内引入其他的css文件 
                 * postcss-loader 自动补全前缀， 需要配置文件： postcss-config.js
                 * sass-loader 将scss解析成css
                 * 
                */
                {
                    test: /\.(css|scss|less)$/,
                    exclude: /node_modules/,
                    use: [
                        /** 可以是对象的形式 */
                        // {
                        //     loader: 'style-loader',
                        //     options: {
                        //         // 配置style 插入到html的位置
                        //         insert: 'top'
                        //     } 
                        // },
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ]
                },
                {
                    test: /\.(jpg|jpeg|png|gif|svg)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                // 小于 8k 全部压缩
                                limit: 1024 * 2,
                                // 增加这个
                                esModule: false,
                                name: '[hash:12].[ext]',
                                outputPath: `images`
                            },
                        }
                    ]
                }
            ]
        },
        /** 打包时过滤的插件 */
        externals: {
            "jquery": "jquery"
        },
        /** 第三方包 */
        resolve: {
            // modules: [path.resolve('node_modules')],
            // 页面内引入 外部文件，可省略后缀，如：xx.vue可直接xx, 按照顺序一次解析
            extensions: ['.js', '.tsx', 'vue', '.html'],
            /** 别名 */
            alias: {
                bootstrap: 'bootstrap/dist/css/bootstrap.css',
                "@src": path.resolve(process.cwd(), 'src')
            }
        }
    }
}