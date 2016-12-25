# 04 forth image
上一节主要讲了一下`webpack`的配置，以及简单讲了一下插件的用法，前面讲的`css-laoder`可以很好的解决样式文件的解析，其实除了样式，还有一个
比较重要的东西，就是图片，这章主要讲一下如何用打包加载图片。


### 图片加载器
注意哈，这里的图片格式很多，所以图片加载器不能按`css-loader`这种来命名了，图片加载器是`url-loader`,首先当然也得安装对应的加载器，同样的
我们先拷贝上一接的`*.js *.html *.json`文件，需要改一下`package.json`配置:
```json
{
  "name": "04-forth-image",
  "version": "1.0.0",
  "description": "04-forth-image",
  "main": "bundle.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "sjq597",
  "license": "MIT",
  "devDependencies": {
    "css-loader": "^0.26.1",
    "style-loader": "^0.13.1",
    "url-loader": "^0.5.7",
    "webpack": "^1.14.0"
  }
}
```
然后执行:
```
npm install
```
如果有报错：
```
├── UNMET PEER DEPENDENCY file-loader@*
├── style-loader@0.13.1 
├─┬ url-loader@0.5.7 
```
可以执行下面的命令来解决:
```
npm i file-loader -D
```

### 打包图片
上面的环境都准备好了之后就可以来打包图片了
* 首先修改`index.html`文件:
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>图片测试</title>
    </head>
    <body>
        <h1 id="app"></h1>
        <img src="img/small-img.png" alt="">
        <div id="small-img"></div>
        <div id="big-img"></div>
        <script src="bundle.js"></script>
    </body>
</html>
```
记得得在当前目录新建一个`img`的文件夹，把我的`small-img.png big-img.jpg`图片放进去,为了演示用法，特意挑了两种不同类型，
这两个图片的小小为:
```
➜  img git:(master) ✗ ll | awk '{print $5,$NF}'
 20K
9.4K big-img.jpg
4.5K small-img.png
```

* 然后修改`style.css`文件,长宽高随意了，如果大了会自动循环填充:
```css
#small-img {
    background-image: url(./img/small-img.png);
    height: 117px;
    width: 170px;
}

#big-img {
    background-image: url(./img/big-img.jpg);
    height: 147px;
    width: 181px;
}
```

* 修改打包配置文件，配置图片加载器:
```js
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.(jpg|png)$/,
                loader: "url-loader?limit=8192./[name].[ext]"
            }
        ]
    },
```
**备注:**

1. `limit=8192`:最大为8k,即8k以下图片会被转化为base64,超过这个大小就还是文件.
2. `./`标示当前目录,`[name]`表示原图片的名字,`[ext]`表示原文件的的扩展名，及拷贝一份，如果不这么写，会在当前目录随机一个名字，
例如`2e685520e38acf6d4ba9cda47da684ae.jpg`

然后执行`webpack`编译,打开`index.html`文件查看效果.打开浏览器的调试窗口查看效果.点击到对应的元素，查看`style`窗口就可以看到差别:
* 正常`<img>`标签图片大小没有超过8k，没有被转成`base64`,超过8k的`big-img.jpg`也没有被转化;
* `small-img.png`被转成了`base64`,并且`style.css`中写的`url(./img/xxx)`也被替换了。

### 热加载
有没有发现每次调整图片的路径，大小，样式等都要手动编译然后手动打开文件看效果特别麻烦，所以也就有了热加载这个概念,其实其他的编译工具都具备
了这个功能，业内专业叫法HMR(hot module replacement),这里说一下怎么用`webpack`的热更新。
`webpack`为我们提供了一个`webpack --watch`,他会启动监听模式。开启监听模式后，没有变化的模块会在编译后缓存到内存中，而不会每次都被重新
编译，所以监听模式的整体速度是很快的。但是有一点，你必须得刷新一下浏览器才能看到效果,所以有一个更牛逼的插件`webpack-dev-server`.
它将在`localhost:8080`启动一个`express`静态资源`web`服务器，并且会以监听模式自动运行`webpack`，在浏览器打开`http://localhost:8080/`
或`http://localhost:8080/webpack-dev-server/`可以浏览项目中的页面和编译后的资源输出，并且通过一个`socket.io`服务实时监听它们的变化
并自动刷新页面:
```
npm i webpack-dev-server -D
```
然后运行:
```
webpack-dev-server
```
打开`localhost:8080`就可以看到我们的页面了，可以尝试修改样式文件，查看终端编译变化。虽然可以自己重新编译了，但是有个问题，浏览器没办法
自动刷新，还得手动刷新才行，如果想自动刷新：
```
webpack-dev-server --hot --inline
```
这个是简单的命令行方式，这样不是很方便，能写到配置文件里面最好了，需要修改一下`webpack.config.js`文件：
1. 把`webpack/hot/dev-server`加入到`webpack`配置文件的`entry`项；
2. 把`new webpack.HotModuleReplacementPlugin()`加入到`webpack`配置文件的`plugins`项；

`webpack.config.js`最终的配置如下：
```js
var Webpack = require("webpack");

module.exports = {
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        "./entry.js"
    ],
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
        new Webpack.BannerPlugin("打包文件头部测试\nFBI Warning!!!"),
        new Webpack.HotModuleReplacementPlugin()
    ]
}
```
然后直接在终端运行：
```
webpack-dev-server
```
然后手动修改`style.css`文件查看效果，这回不用手动刷新了。


### 简单的vue例子
既然讲到热更新，那就配合着来一个`vue`数据绑定热更新的例子，修改`entry.js`文件:
```js
// 这里直接用require("vue")会报错,详情参见:
// https://forum-archive.vuejs.org/topic/4399/vue-2-0-vue-warn-failed-to-mount-component-template-or-render-function-not-defined-found-in-root-instance/6
var Vue =require("vue/dist/vue.js");

new Vue({
    el: "#app1",
    data: {
        message: "hello vue"
    }
});
```
然后你还需要修改`index.html`文件:
```html
<div id="app1">{{ message }}</div>
```
当然必须安装`vue`了:
```
npm i vue -D
```
这里安装的是`Vue 2.x`版本,然后启动:
```
webpack-dev-server
```
可以尝试改变message的指看看热更新效果
