/**
 * Created by anonymous on 1/2/17.
 */
var Vue = require('vue');
var app = require('./app.vue');
var vm = new Vue({
    el: '#my-app',
    data: {},
    // 注册组件
    components: {
        app: app,
    }
})
