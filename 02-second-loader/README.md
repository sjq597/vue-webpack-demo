# 02 second loader
首先初始化项目:
```
mkdir 02-second-loader
cd 02-second-loader
npm init
npm webpack i -D
```

### Loader
下面的一句话是摘自[zhaoda/webpack-handbook](https://github.com/zhaoda/webpack-handbook),简单回顾一下:
Webpack 本身只能处理 JavaScript 模块，如果要处理其他类型的文件，就需要使用 loader 进行转换。

Loader 可以理解为是模块和资源的转换器，它本身是一个函数，接受源文件作为参数，返回转换的结果。这样，我们就可以通过 `require` 来加载任何
类型的模块或文件，比如 CoffeeScript、 JSX、 LESS 或图片。

先来看看 loader 有哪些特性？

- Loader 可以通过管道方式链式调用，每个 loader 可以把资源转换成任意格式并传递给下一个 loader ，但是最后一个 loader 必须返回 JavaScript。
- Loader 可以同步或异步执行。
- Loader 运行在 node.js 环境中，所以可以做任何可能的事情。
- Loader 可以接受参数，以此来传递配置项给 loader。
- Loader 可以通过文件扩展名（或正则表达式）绑定给不同类型的文件。
- Loader 可以通过 `npm` 发布和安装。
- 除了通过 `package.json` 的 `main` 指定，通常的模块也可以导出一个 loader 来使用。
- Loader 可以访问配置。
- 插件可以让 loader 拥有更多特性。
- Loader 可以分发出附加的任意文件。

Loader本身也是运行在`node.js`环境中的`JavaScript`模块，它通常会返回一个函数。大多数情况下，我们通过`npm`来管理`loader`，但是你也可以
在项目中自己写`loader`模块。按照惯例，而非必须，`loader`一般以``xxx-loader``的方式命名，`xxx`代表了这个`loader`要做的转换功能，
比如`json-loader`。

在引用`loader`的时候可以使用全名`json-loader`，或者使用短名`json`。这个命名规则和搜索优先级顺序在`webpack`的
`resolveLoader.moduleTemplates api`中定义。

### load使用
一般都是以读取`css`文件来做演示，简单来说就是用`css-loader`读取`css`文件,然后用`style-loader`来把样式插到页面中,终端中安装:
```
npm i css-loader style-loader -D
```
安装成功之后你会发现你的`package.json`里面内容变了，多了一部分内容:
```json
  "devDependencies": {
    "css-loader": "^0.26.1",
    "style-loader": "^0.13.1",
    "webpack": "^1.14.0"
  }
```
最开始也说过，也可以直接写在这个文件里面，然后执行`npm install`，效果是一样的。

### 加载CSS文件
```css
body {
    background: red;
}
```
修改我们的`entry.js`，原文件不变，添加`require("!style!css!./style.css");`,用来引入我们的`css`文件。
如果你没有对应的文件，打包会出错，当然也会生成`bundle.js`文件,报错信息大概像下面这样
```
➜  02-second-loader git:(master) ✗ webpack entry.js bundle.js
Hash: ee8ddc5d08d1832ca7f6
Version: webpack 1.14.0
Time: 71ms
    Asset     Size  Chunks             Chunk Names
bundle.js  1.67 kB       0  [emitted]  main
   [0] ./entry.js 125 bytes {0} [built] [1 error]

ERROR in ./entry.js
Module not found: Error: Cannot resolve 'file' or 'directory' ./style.css in /vue-webpack-demo/02-second-loader
 @ ./entry.js 5:0-33
```
完成后，刷新我们的页面，背景颜色是不是已经变成了红色了呢？

### 扩展名自动绑定loader
这就是我们的`loader`的使用方式了。如果每次`require CSS`文件的时候都要写`loader`前缀`!style!css!`这样的东西，显然是一件很麻烦的事情。
我们需要它可以根据模块类型(扩展名)来自动绑定需要的`loader`。有两种方式，先说简单的

* 命令行打包参数指定绑定违规
修改`entry.js`文件中的`require("!style!css!./style.css")`修改为`require("./style.css")`,然后执行:
```
webpack entry.js bundle.js --module-bind "css=style\!css"
```
编译好之后打开看看，效果和之前是一样的.
**备注:** 命令行里面的`!`在`shell`中有特殊含义，要用`\`转义。

* 配置文件指定
每次手输实在太麻烦，我们可不可以像`package.json`那样,既可以自动生成配置文件，又可以手动修改配置文件，然后直接按配置文件来读，执行相关操
作呢？当然可以，事实上，一般都是这么干的。但是这是个很大的内容，所以我放到下一章专门来讲。