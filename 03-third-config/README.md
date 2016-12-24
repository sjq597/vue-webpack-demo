# 03 third config
上一节讲了加载外部`laoder`来解析指定文件，最后一个是从配置文件里面指定`loader`的自动绑定，这一节主要就是讲这个.
首先初始化项目,你可以直接把上一个例子的的`package.json, entry.js index.html style.css`文件拿过来，然后直接执行:
```
npm install
```

### webpack配置
`Webpack`在执行的时候，除了在命令行传入参数，还可以通过指定的配置文件来执行。默认情况下，会搜索当前目录的`webpack.config.js`文件，
这个文件是一个`node.js`模块，返回一个`json`格式的配置信息对象，或者通过`--config`选项来指定配置文件。

* 新建一个`webpack.config.js`的配置文件,内容如下:

```js
var Webpack = require("webpack");
module.exports = {
    entry: ["./entry.js"],
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: "style!css"
        }]
    }
}
```
然后直接在当前目录运行:
```
webpack
```
如果配置没啥问题，就会输出如下内容:
```
➜  03-thirth-config git:(master) ✗ webpack
Hash: bc668c47625032611e5e
Version: webpack 1.14.0
Time: 593ms
    Asset     Size  Chunks             Chunk Names
bundle.js  11.8 kB       0  [emitted]  main
   [0] multi main 28 bytes {0} [built]
   [1] ./entry.js 114 bytes {0} [built]
    + 4 hidden modules
```
这样就很方便了，你不用再每次启动还输入一堆参数，可以改动`style.css`看看变化,记得得重新编译。

### 参数说明
* entry：指入口文件的配置项，它是一个数组的原因是`webpack`允许多个入口点。 当然如果你只有一个入口的话，也可以直接使用双引号`"./entry.js"`
* output：配置打包结果，`path`定义了输出的文件夹,`__dirname`指当前目录，`filename`则定义了打包结果文件的名称
* module：定义了对模块的处理逻辑，这里可以用`loaders`定义了一系列的加载器，是一个数组，当需要加载的文件匹配`test`的正则时，就会调用
后面的`loader`对文件进行处理，这正是`webpack`强大的原因。

这的配置其实特别多，也不是一两句能说的请的，后面慢慢了解。


### webpack插件 
纵观现在的开发语言，特别是解释型语言，都喜欢用包，或者插件这样的概念来实现不断加强或者扩展各种特性或者功能，`webpack`的强大的另一个地方
就在于他的插件功能非常强大。插件的使用一般是在webpack.config.js中的plugins 选项中指定。`Webpack`本身内置了一些常用的插件，还可以通过
`npm`安装第三方插件。
下面举个例子来看看插件是怎么用的，比如给输出的文件头部添加注释信息`BannerPlugin`的内置插件来实践插件的配置和运行。
修改`webpack.config.js`文件，添加如下配置:
```js
    entry: ["./entry.js"],
        ...
    },
    module: {
        ...
    },
    plugins: [
        // 注意插件可能不止一个，也是个数组,Webpack就是最上面引入的变量
        new Webpack.BannerPlugin("打包文件头部测试\nFBI Warning!!!")
    ]
```
然后从新编译,编译成功就可以在`bundle.js`中看到我们写的注释了。

### 后记
上面讲了一个简单的插件用法，也没啥奇特的，下面的是一点不是很重要的东西，赶时间的可以直接看下一章。
我讲一下一个插件[Webpack Visualizer](https://github.com/chrisbateman/webpack-visualizer),这个插件可以把你编译的过程可视化，可以
用来分析构建瓶颈,首先需要安装插件:
```
npm i webpack-visualizer-plugin -D
```
然后修改`webpack.config.js`文件:
```js
var Webpack = require("webpack");
var Visualizer = require('webpack-visualizer-plugin');

module.exports = {
    entry: ["./entry.js"],
    output: {
        ...
    },
    module: {
        ...
    },
    plugins: [
        // 注意插件可能不止一个，也是个数组,Webpack就是最上面引入的变量
        new Webpack.BannerPlugin("打包文件头部测试\nFBI Warning!!!"),
        new Visualizer({
            filename: './statistics.html'
        })
    ]
}
```
然后重新编译，除了会生成一个`bundle.js`文件之外，还会生成一个分析结果页面`statistics.html`，打开就可以看到分析图，这里面就是分析结果,
如果想获取统计结果到文件,还可这样:
```
webpack --json > stats.json
```
