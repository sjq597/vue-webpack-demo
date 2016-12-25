var Webpack = require("webpack");

module.exports = {
    entry: ["./entry.js"],
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.(jpg|png)$/,
                loader: "url-loader?limit=8192&name=./[name].[ext]"
            }
        ]
    },
    plugins: [
        // 注意插件可能不止一个，也是个数组,Webpack就是最上面引入的变量
        new Webpack.BannerPlugin("打包文件头部测试\nFBI Warning!!!")
    ]
}