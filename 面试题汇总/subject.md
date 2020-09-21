### IE11 的兼容性问题

- ie 的接口默认会走缓存, 如果数据一样想再次请求,可以加一个 new Date().getTime()时间

### vue 优化

- 异步加载组件
- 动态加载组件
- keep-alive 缓存组件
- 使用 v-show 切换组件状态
- 使用防抖和节流

### es6 新增

- promise
- Set()
- Map()
- Object.assign() //浅拷贝
- 箭头函数
- let 和 const
- 模板字符串
- class
- 数据解构
- 数据展开 ...操作符
- import export

###

### 闭包函数与匿名函数的区别是什么?

- 作用域的不同

### new Set() 怎么用

```js
let set = new Set([1, 2, 3, 4, 5, 5, 6, 7, 7]);
set.add(6);
set.delete(2);
set.has(2);
set.clear();
```

### 你知道有多少排序算法?

- 冒泡排序
- 快速排序
- 选择排序
- 堆排序
- 归并排序

### 冒泡排序,最好的情况下会排多少次,最差排多少次?

### 文档执行顺序?

### computed 与 watch 的区别

### router.beforeEach(to,from,next) 做权限验证的 router.afterEach()

### const service = axios.create({baseURL: process.env.VUE_APP_BASE_API, timeout: 12000}) 创建一个新的拦截器

### service.interceptors.request.use(config => {}) 请求拦截器(设置请求头)

### service.interceptors.response.use(response => {}) 响应拦截器(根据不同的状态码做不同的操作)

### 对优化方面的理解

### 了解 async/await

### promise.all([a,b,c]) 中,如果一个失败,都不会走 then 方法

### promise 三个状态, pending ,(resolved)完成 ,(rejected)失败

```js
var promise = new Promise((resolve,reject) => {
  if(/*成功的回调*/) {
    resolve()
  }else {
    reject()
  }
})
```

- Promise 有两个特点, 对象的状态不受到外界的影响.
- 一旦状态改变,就不会变

```js
var promise = new Promise((resolve,reject) => {
  if(/*操作成功*/) {
    resolve(value)
  }else {
    reject(error)
  }
})
promise
.then((value) => {
 //success
})
.catch((error) => {

})
```

#### 批量引入

```js
const path = require('path');
const files = require.context('@/components/home', false, /\.vue$/);
const modules = {};
files.keys().forEach((key) => {
  const name = path.basename(key, '.vue');
  modules[name] = files(key).default || files(key);
});
components: modules;
```

#### promise.all 与 promise.race 的区别

#### 手机端使用 echarts 有没有遇到过什么问题

- 优化,可以把 DOM 和 echartsDOM 保存在 data 中，这样不必每次都初始化一遍
- 高度为 0 的问题
  - 解决: 动态设置宽高
- echartsDOM.clear()
  - 为了解决多个功能共用一个 echartsDOM,当你切换的时候横纵坐标会重叠，通过 echartsDOM.clear()移除实例中所有的组件和图表
- 移动端 echarts 字号的设置不受浏览器的最小字号限制,我们可以随意设置更符合界面显示需要的字号
- tooltip 显示框优化

  - tooltip 默认是出现在用户交互的数据点附近,PC 端不会有什么问题,移动端交互式手指触摸产生的，在触摸点展示会导致 tooltip 显示不全，
    - 解决办法：
      - 1.可以动态设置 tooltip 的位置
      - 2.可以给 tooltip 固定位置，左侧或右侧
      - 3.可以给 tooltip 设置 confine 为 true，防止图形溢出

- 折线图，最小值数值优化的问题
  - 动态设置最小值

#### es6 给数组对象去重

1.通过 reduce 方法

```js
let arr = [
  { id: 0, name: '小明' },
  { id: 1, name: '小张' },
  { id: 2, name: '小李' },
  { id: 3, name: '小周' },
  { id: 2, name: '小陈' },
];
let obj = {};
arr = arr.reduce((curs, next) => {
  obj[next.id] ? '' : (obj[next.id] = true && curs.push(next));
  return curs;
}, []);
```

#### 怎么封装一个 echarts 的公共组件

```js
# 1. 获取一个用于挂在 echarts 的 DOM 元素
let $echartsDOM = document.getElementById('echarts-dom')

# 2. 初始化
let myEcharts = echarts.init($echartsDOM)

# 3. 设置配置项
let option = {...}

# 4. 为 echarts 指定配置
myEcharts.setOption(option)

mounted() {
      let $echartsDOM = document.getElementById('echarts-dom')
      let myEcharts = echarts.init($echartsDOM)
      let option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    }
    myEcharts.setOption(option)
  }
}
```

```js
// 组件化
 <ocEcharts class="echarts-container" :options="ocoptions" />

```

#### 比较两个 JSON 字符串是否相同

#### 如何查看别人的代码写是否有内存泄漏问题

#### 为什么要用到 vuex ，为什么不用 sessionStorage 或 localStore 去管理状态

- vuex 是随着项目临时储存，速度会快一些
- vuex 什么类型都能存，而且可以模块划分，方便

#### 从零搭建一个 vue 项目

- 先搭建 webpack 环境
- 再引入 vue 的依赖包
- 再引入 babel 插件，配置 babel
- rem、px、em、vh
- 写页面

### 怎么封装一个公共的登录组件 在多页面应用程序中使用

### 在 vue 解析过程中是 vuex 先解析还是 app.vue 页面先解析

### 单项数据流

- props， emit， 数据从一边流向另一边，在另一边不能改变数据的值，Object.defineproperty() 中的 get() 和 set() 操作

### 递归

- 写一个函数需要参数，在函数里面写一个判断出口， 走完了就 return 出来没走完就调用自己改变参数。

### 闭包

### 使用过哪些 vue 的插件

- vuex
- axios
- vue-router
- element
- vant
- highlight

### 为什么 vue 的插件有些需要 use 一下，有些不需要 use

- 用不到 vue 参数的就不需要封装成 use 方式

### 你有哪些技术栈

- vue
- jquery
- 闭包
- 递归
- es6
- 原型链继承
- 原生
- node
- webpack

- 没有的技术栈
  - react
  - 微信小程序
  - ts

### 你对未来的规划

- 一年之内学会 react 和微信小程序
- 尽早在项目中使用 ts
