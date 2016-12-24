# 01 first-demo
首先初始化项目:
```
mkdir 01-first-demo
cd 01-first-demo
npm init
npm webpack i -D
```
然后选择填一些内容，跳过一些内容，会在当前目录生成一个`package.json`文件,内容大概如下:
```
{
  "name": "01-first-demo",
  "version": "1.0.0",
  "description": "01-first-demo",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "sjq597",
  "license": "MIT"
}
```
既然环境都已经安装好了，那么我们就开始来用webpack进行我们的第一个打包运行程序吧！

我们需要创建一个静态页面(一般默认是`index.html`)以及一个入口文件(一般是`entry.js`),具体的名字其实不用纠结，按默认的来就行，开始学东西
都按标准来会比较轻松:

静态页面文件`index.html`:
```html
<!-- index.html -->
<html>
<head>
    <meta charset="utf-8">
</head>
<body>
    <h1 id="app"></h1>
    <!-- 注意这里引入的不是我们创建的entry.js文件，而是用webpack生成的文件 -->
    <script src="bundle.js"></script>
</body>
</html>
```
入口文件`entry.js`:
```js
/*** entry.js ***/
document.getElementById('app').innerHTML="这是我第一个打包成功的程序";
```
准备文件都搞定了，可以开始打包了:
```
➜  01-first-demo git:(master) ✗ webpack entry.js bundle.js
Hash: 08b204922bb023a72de5
Version: webpack 1.14.0
Time: 50ms
    Asset     Size  Chunks             Chunk Names
bundle.js  1.47 kB       0  [emitted]  main
   [0] ./entry.js 77 bytes {0} [built]
```
最终的目录结构就像下面这样:
```
➜  01-first-demo git:(master) ✗ tree -L 1
.
├── bundle.js
├── entry.js
├── index.html
├── node_modules
└── package.json
```
然后用浏览器打开`index.html`文件，就可以看到我们写在js里面的代码了。

这么简单的功能直接在html中引入不就好了吗？确实是这样的，不过我们这才刚刚开始嘛，不要急。
下面我们再来增加一个文件，名为`first.js`内容如下：
```js
var h2= document.createElement("h2")
h2.innerHTML="不是吧，那么快第二个打包程序啦！";
document.body.appendChild(h2);
```
然后你还需要更改入口文件`entry.js`:
```js
document.getElementById('app').innerHTML="这是我第一个打包成功的程序";
// 添加依赖
require("./first.js");
```
然后再重新打包:
```
➜  01-first-demo git:(master) ✗ webpack entry.js bundle.js
Hash: 1b0a40be2baaaa62cca6
Version: webpack 1.14.0
Time: 60ms
    Asset     Size  Chunks             Chunk Names
bundle.js  1.68 kB       0  [emitted]  main
   [0] ./entry.js 109 bytes {0} [built]
   [1] ./first.js 100 bytes {0} [built]
```
**备注:** `Webpack`会分析入口文件，解析包含依赖关系的各个文件。这些文件(模块)都打包到`bundle.js`。`Webpack`会给每个模块分配一个唯一的
`id`并通过这个`id`索引和访问模块。在页面启动时，会先执行`entry.js`中的代码，其它模块会在运行`require`的时候再执行。
刷新浏览器，可以发现我们的刚刚的代码已经生效，又有了新的文字出现。