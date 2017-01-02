# 05 fifth vue
前面几节其实都是简单的讲了一下`webpack`的基本用法,最后结合着讲了一个`vue`的很简单的例子,这一节开始我们正式进入组件化开发,对于`vue`这个
框架来说,一般组件都是`xxx.vue`类型的文件,对于还没接触过组件开发的人来说,一般他们都是一头雾水,这个组件化开发的步骤和一般的我们直接写`Js`
脚本文件有啥不同的地方吗?下面我们就介绍一下怎么去搭建一个组件化开发项.

## 开发步骤
在这里先引用一位大神的话,原话为忘了，但是说完确实引发了强烈的讨论，意思大概是:我们花了15年把`html,css,js`分开，但是现在我们却要把这三者
合在一起，确实如此，以前的前端写法都是把这三者分开写到不同的文件里面，我们还觉得这个方案很好，不乱。但是你看现在个中框架出来折后，我们发现
我们之前的都是错的，那样成本太高了，而且不好找对应的样式或者js函数。这也是我们这章的主题，组件化开发就是把这三者写到组件内部，这样非常的
清晰和容易维护，如果你不想写重复代码，直接引入这个组件即可.

### 初始化环境
直接从`package.json`初始化就行:
```
npm install
```
比较简单，因为主要是讲一下这个`vue`的的组件开发，没有其他的东西.

然后新建一个`index.html`文件作为我们的默认首页文件:
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>vue components</title>
</head>
<body>
    <div id='my-app'>
   	    <app></app>
    </div>
	<script type="text/javascript" src='bundle.js'></script>
</body>
</html>
```
然后同理，还需要一个入口文件`entry.js`:
```js
var Vue = require('vue');
var app = require('./hello.vue');
var vm = new Vue({
    el: '#my-app',
    data: {},
    components: {
        app: app,
    }
})
```
这里引入我们自己写的组件，然后挂载到`my-app`下面

### 组件
然后写我们的组件`hello.vue`：
```vue
<template>
	<p v-text='msg'></p>
</template>

<script >
	module.exports={
		  data:function(){
		  	  return {
		  	  	  msg:'你好',
		  	  }
		  },
	}

</script>
<style scoped>
	p {
		font-size: 18px;
		color: red;
	}

</style>
```

### 打包编译
打包文件为`webpack.config.js`：
```js
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
```
启动:
```
webpack-dev-server
```
然后就可以看到效果了，因为是热加载，所以可以尝试修改`app.veu`里面的配置，看看效果.