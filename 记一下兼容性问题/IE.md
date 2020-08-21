### IE 兼容 ES6 和箭头函数 Promise 的问题

> 注意: 在引入其他 script 资源的时候一定要加上 `type="text/javascript"` ,不然会识别不了

```html
<!-- 头部引入polyfill.js文件兼容Promise等一些es6语法 -->
<script
  type="text/javascript"
  src="./babel-polyfill/dist/polyfill.min.js"
></script>

<!-- 中间写es6的语法 -->
<script type="text/babel">
  var start = new Date().getTime();
</script>
<!-- 或者 -->
<script type="text/babel" src="./test.js"></script>

<!-- 结尾引入兼容ES6语法的文件 -->
<script type="text/javascript" src="./babel-browser/broswer.min.js"></script>
```

### IE 在全局声明的变量在全局引入不到

> 问题描述 : 假如你在全局声明了一个对象,想在全局引入这个对象,在 chrome 下可以打印成功,在 IE 下未定义

```js
// a文件
var nameSpace = {
  a:function(){}
  b:function(){}
}
// b文件
nameSpace.a() //报错: nameSpace未定义


// 可代替的方法
// a文件
(function(window){
  function nameSpace(){

  }
  nameSpace.prototype = {
    a:function(){}
    b:function(){}
  }
  window.nameSpace = new nameSpace()
})(window)

//这样写就可以访问了
```
