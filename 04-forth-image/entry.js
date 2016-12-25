/*** entry.js ***/
document.getElementById('app').innerHTML="这是我第一个打包成功的程序";

// loader依赖
require("./style.css");

var Vue =require("vue/dist/vue.js");

new Vue({
    el: "#app1",
    data: {
        message: "hello vue"
    }
});
