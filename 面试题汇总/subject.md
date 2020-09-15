### 闭包函数与匿名函数的区别是什么?

### new Set() 怎么用

### 你知道有多少排序算法?

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
