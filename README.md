## vue-webpack-demo
主要是我这段时间自己写后端，前端感觉写的很是蛋疼，虽然`Flask + Jinjia2`也能写出不错的前端界面，但是写的很多重复代码，而且`Jinjia2`毕
竟是一个初级的前端模板引擎，写写简单的还行，但是页面复杂了就不太好处理了，所以还是想学学前端的框架，开始看过了`Vue.js`，感觉不错，和
`Jinjia2`的语法很像，但是给人的感觉非常优雅，而且是js的框架，总的来说还是比`Jinjia2`这种要强太多。现在网上的资料实在是太多，我把最近一
段时间的东西记录下来，也算是给新手一个参考吧。

### 建议学习步骤:
因为搞数据的一般要求你会很多种语言，前端现在这么火，不学点儿是不行了，本身我也不是搞前端的，但是项目中碰到的问题，必须用前端的框架才能很好
的解决这个问题，所以这个也算是记录一个前端新手的学习过程吧,大概步骤为:

1. 然后就是看看怎么结合具体的js框架来进行打包了，要说16年最火的前端框架，毫无疑问是`Angular, React, Vue`,对于新手来说不建议学`Angular`,
功能很强大，但是很重，后面两个自己看着办吧，学哪个都差不多，我主要是看`Vue`语法比较简单，好上手，而且功能也很强大啊,而且这篇文章也主要是
讲和`vue-webpack`相关的知识。

2. 先了解一下[Vue官网](https://cn.vuejs.org/)上的一些例子,大概看看前面的基本例子，了解一下语法，可以配合着这个项目的代码来了解
[sjq597/vue](https://github.com/sjq597/vue),这个里面就是根据官网的语法，把一些例子都做了一个基本的演示，可以很快看到效果，
对照这例子学起来也很方便，一遍记不住没关系，大概知道了解了就行,以后不会可以去查

3. 然后可以学习一下`webpack`这个东西,开始我最困惑的其实就是这个东西，一个打包工具实在是太抽象，看了很多资料，大概理解了一点，我建议学习
顺序可以这样，先了解一下`webpackk`是什么个玩意儿，这有一份中文文档[zhaoda/webpack-handbook](https://github.com/zhaoda/webpack-handbook),
这个很短，一个pdf版本的也就几页，很快就看完了，看完之后你需要了解具体的各种用法，推荐再看看阮一峰老师的例子,这个是英文版的
[ruanyf/webpack-demos](https://github.com/ruanyf/webpack-demos),这个里面详细讲了十几个例子，可以好好理解一下各种基本的用法，学习
了解和框架无关的打包技术

4. 第四部就是结合具体的框架`Vue.js`以及`webpack`来看看这两者是怎么发挥各自的优势来做到前后端分离，并且最大化重用代码的，主要还是在`github`
上找代码来学，这个项目也主要是结合[guowenfh/vue-webpack](https://github.com/guowenfh/vue-webpack)来学习的，我觉得写的不错，可以
作为一个入手项目来学习，只是文档之间没有索引，看起来不大连贯，我主要也就是整理一下，另外就是站在一个新手的角度，有些大神可能觉得不是知识
盲点的地方我这里也补充一下。

**备注:**在此感谢一下[guowenfh](https://github.com/guowenfh)

### 准备工作
介绍一下我本地的环境配置:
```
OS: Ubuntu 16.04 64bit
npm: 3.10.9
node: v4.1.1
```
没有安装`npm`以及`node`的同学自行相关教程，这个应该是基本配置了。

### 小技巧

1. 配置npm源
由于某些你懂的原因，官方的源很多时候用不了，所以就有很多第三方的镜像，其实很多公司都会有一套自己的私有镜像，例如`maven,pypi,npm`等,这里
介绍一个针对`npm`源管理的东西[nrm](https://github.com/Pana/nrm)
#### Example
```
$ nrm ls

* npm -----  https://registry.npmjs.org/
  cnpm ----  http://r.cnpmjs.org/
  taobao --  https://registry.npm.taobao.org/
  nj ------  https://registry.nodejitsu.com/
  rednpm -- http://registry.mirror.cqupt.edu.cn
  skimdb -- https://skimdb.npmjs.com/registry
```

#### Usage
```
Usage: nrm [options] [command]

  Commands:

    ls                           List all the registries
    use <registry>               Change registry to registry
    add <registry> <url> [home]  Add one custom registry
    del <registry>               Delete one custom registry
    home <registry> [browser]    Open the homepage of registry with optional browser
    test [registry]              Show the response time for one or all registries
    help                         Print this help

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```
你可以添加你们公司的`npm`源到这里:
```
nrm add my_npm http://registry.npm.xxx.xxx.com/
```
测试一下哪个网速更快，然后选一个比较快的:
```
nrm test my_npm
nrm use my_npm
```
这样你每次敲`npm install xxx`就会使用`my_npm`的镜像了，如果有些包公司的镜像下不到，可以换其他的源,这里不多讲了。

#### 项目代码
在看每一个`demo`的时候，一般不出意外代码都是演示到最后的代码，一般一个教程的代码都是有好几版的，可以看每个文件的历史或者提交记录，我都是
按照`step1, step2, ...`这样的来命名的。

### 教程
假设前面的你都已经配置好了，那么首先安装`webpack`,全局安装
```
npm install webpack -g
```
安装成功之后可以看看帮助
```
➜  vue-webpack-demo webpack -h
webpack 1.14.0
Usage: https://webpack.github.io/docs/cli.html

Options:
.....
```
这里还需要讲一个东西，全局和本地，刚才加了`-g`参数是把`webpack`安装到了全局,但是一般每个项目的环境，依赖模块应该是一个单独的环境，既然
用到了`webpack`这个包，那么也得本地安装，我们从一个例子来说明一下这个步骤:

以后每一个项目初始化都是一样的过程:
```
mkdir xxx
cd xxx
npm init    # 初始化一个项目，可能会让你填一些具体的信息，如果懒得填，直接回车跳过也行

# 本地安装webpack依赖
npm install webpack --save-dev
# 等价
npm i webpack -D
```
**备注:**`npm init`会生成一个`package.json`的文件，–save`:模块名将被添加到`package.json`文件的`dependencies`配置，可以简化为参数-S;
`–save-dev`:模块名将被添加到`devDependencies`，可以简化为参数-D。其实就是方便你不用再写配置文件，加了之后会自动 写进去，你也可以后面
再手动编辑。

### 目录
1. [01 first demo](01-first-demo)
2. [02 second loader](02-second-loader)
