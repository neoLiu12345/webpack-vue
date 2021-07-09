## webpack 安装
-   安装本地的webpack
-   webpack webpack-cli -D
-       需要安装webpack-cli@3.3.12版本，webpack-cli早在4.0版本后就移除了yargs（导致无法启动服务）

## webpack 可以进行0配置
-   打包工具 -> 输出后的结果（js模块）
-   打包（支持我们的js模块化）

## 手动配置webpack
-   默认配置文件名 webpack.config.js

##  启动服务
-   yarn add webpack-dev-server -D

## Plugins
数组， 所有的插件都可以放到这里
-   生成html： html-webpack-plugin
-       yarn add html-webpack-plugin -D
-   抽离css插件： mini-css-extract-plugin
-       yarn add mini-css-extract-plugin -D
-   css 压缩： css-minimizer-webpack-plugin（使用了css压缩必须添加js插件）， webpack5之前的版本安装optimize-css-assets-webpack-plugin
-       yarn add css-minimizer-webpack-plugin@2.0.0 -D
-   Js压缩： yarn add uglifyjs-webpack-plugin
-       yarn add uglifyjs-webpack-plugin -D
-   Es6+ 转为Es5格式： babel-loader @babel/core @babel/preset-env
-       yarn add babel-loader @babel/core @babel/preset-env @babel/preset-react -D
-       yarn add @babel/plugin-proposal-class-properties -D // 待确认
-       yarn add @babel/plugin-proposal-decorators -D // 待确认
-       yarn add @babel/plugin-transform-runtime -D  // function * gen () {}
-       yarn add @babel/polyfill  需要引入代码内，把能加-D -> 'aaa': includes('a')
-   清楚当前打包文件夹下的文件插件： clean-webpack-plugin
-       yarn add clean-webpack-plugin -D -> 选择性使用
-   复制webpack：  copy-webpack-plugin  -> 选择性使用
-       yarn add copy-webpack-plugin -D
-   内置模块：banner-webpack-plugin 

## Loader 模块规则
-   css相关
-       yarn add css-loader style-loader@^2.0.0 -D
-       yarn add less less-loader -D
-       yarn add sass node-sass@4.14.1 sass-loader@7.3.1 -D
-       yarn add postcss-loader@^3.0.0 autoprefixer@8.0.0 -D
-           loader内的use可以些成, 对象use:[{loader: "style-loader"}, "css-loader"]
-           loader内的use可以些成, 数组use:["style-loader", "css-loader"] 

## 图片处理 
-   url-loader
-       yarn add url-loader -D
-   html loader, 在html内引入图片
-       yarn add html-withimg-loader -D
-   file-loader 默认会在内部生成一张图片，到dist目录下，返回生成后的文件名
-       yarn add file-loader -D

## 第三方模块
-   externals设置打包时不打包，第三方插件
-       externals:{"jquery": "jquery"}
-   yarn add jquery
-       expose-loader 暴露全局的loader， 
-       pre 前面执行的loader
-       normal 普通loader
-       

## 其他
-   打包时 删除console.log,  -目前没有安装，看实际情况
-       yarn add uglifyjs-webpack-plugin -D
-   webpack-merge -> 选择使用
-   Tapable

## webpack
-   devtool（和eslist的区别）：增加映射文件，可以帮助我们调试源代码， source-map、eval-source-map、cheap-module-source-map、cheap-module-eval-source-map 四种的却别
-       source-map：源码映射会生成一个 sourcemap 文件   
-       eval-source-map：不会产生单独的文件 但是可以显示行 和 列  
-       cheap-module-source-map： 不会产生列 但是是一个单独的映射文件 -》 产生后可以保留进行调试
-       cheap-module-eval-source-map： 不会产生文件， 集成在打包后的文件中 不会产生列


## 跨越问题、 自定义mock数据
-   proxy
-   mock 数据
-   服务端启动webpack, 在服务端启动webpack
-       yarn add webpack-dev-middleware -D ---》 选择性使用

## resolve
查看webpack/webpack.config.base.js, 内部配置

## 定义环境变量
-    webpack自带插件  webpack.definePlugin

## webpack 优化
-   noParse   -》？只需要配置 不解析 jquery就行了吗
-   exclude 排除文件夹，不查找
-   include path.resolve('src') ,只在src文件夹下查找
-   moment --> 时间处理 
-       yarn add moment
-   webpack内置方法，IgnorePlugin
-       plugins内配置 new webpack.IgnorePlugin(/\.\/locale/,/moment/), 打包后大小没有变化
-   动态链接库 dllPlugin、dllreferencePlugin 待确认？？？
-   多线程打包 happypack, 大项目中减少打包时间
-       yarn add happypack
-   webpack自带优化功能
-       tree-shaking 使用import * from '*' 引入，生成环境打包时，会自动过滤未使用的代码,
-       scope hosting 作用域提升， 
-   webpack 热更新，自带方法 -- 根据项目需求判断是否需要
-       NameModulesPlugin // 打印更新的模块路径
-       HotModuleReplacementPlugin //热更新插件      

## webpack 配置 React
-   yarn add react react-dom

## wqebpack 抽取公共代码
-   splitChunks: 查看webpack内配置， 并网上查找详细介绍

## webpack 懒加载 (js、vue、 react的懒加载实现都是 import语法)
-   yarn add babel-plugin-syntax-dynamic-import -D  ->>> 没有效果, webpack 5 不需要添加这个
-   babel-eslint：  eslint 默认解析器可能不支持动态导入，需要添加该插件
-       yarn add babel-eslint -D -> 需要在 .eslintrc文件进行配置，parser": "babel-eslint"

