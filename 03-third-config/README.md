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