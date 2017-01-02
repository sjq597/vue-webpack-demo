/**
 * Created by anonymous on 1/2/17.
 */
var webpack = require('webpack');

module.exports = {
    // devtool: 'eval-source-map',
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        './entry.js'
    ],
    output: {
        path: __dirname,
        filename: "bundle.js"//打包后输出文件的文件名
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
        ]
    },
    plugins: [
        // 注意插件可能不止一个，也是个数组,Webpack就是最上面引入的变量
        new webpack.BannerPlugin("打包文件头部测试\nFBI Warning!!!"),
        new webpack.HotModuleReplacementPlugin()
    ],
    // 配置文件后缀名(extensions)，除了js，还有jsx、coffee等等。
    // alias配置项，可以为常用模块配置改属性，可以节省编译的搜索时间。例如：
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    }
}