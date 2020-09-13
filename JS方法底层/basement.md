## 手写类

#### 手写 call

```js
Function.prototype.call = function () {
  if (typeof this !== 'function') {
    throw 'caller must be a function';
  }
  let othis = arguments[0] || window;
  othis._fn = this;
  let arg = [...arguments].slice(1);
  let res = othis._fn(...arg);
  Reflect.deletePropert(othis, '_fn');
  return res;
};
```

#### 手写 apply

#### 手写 bind

#### Object.assign()

#### 函数柯里化

```js
function currying(fn, arr = []) {
  let len = fn.length;
  return (...args) => {
    let concatArgs = [...arr, ...args];
    if (concatArgs.length < len) {
      return currying(fn, concatArgs);
    } else {
      return fn.call(this, ...concatArgs);
    }
  };
}
let sum = (a, b, c, d) => {
  // console.log(a, b, c, d);
  console.log(a + b + c + d);
};
let newSum = currying(sum);
newSum(1)(2)(3)(4);
```

#### 函数反柯里化

```js
Function.prototype.uncurring = function () {
  var self = this;
  return function () {
    var obj = Array.prototype.shift.call(arguments);
    return self.apply(obj, arguments);
  };
};
```

#### 冒泡排序(及优化)

```js
// 交换两个变量的值
// arr[m] = [arr[m+1],arr[m+1] = arr[m]][0]
// [arr[m],arr[m+1]] = [arr[m+1],arr[m]]
var arr = [2, 8, 3, 4, 5, 6, 1, 7, 9];
for (var i = 0; i < arr.length - 1; i++) {
  for (var m = 0; m < arr.length - i - 1; m++) {
    var temp = arr[m + 1];
    arr[m + 1] = arr[m];
    arr[m] = temp;
    [arr[m], arr[m + 1]] = [arr[m + 1], arr[m]];
  }
}
// 优化
var flag = false;
for (var i = 0; i < arr.length - 1; i++) {
  for (var m = 0; m < arr.length - i - 1; m++) {
    if (arr[m] > arr[m + 1]) {
      var temp = arr[m + 1];
      arr[m + 1] = arr[m];
      arr[m] = temp;
    } else {
      flag = true;
    }
  }
  if (flag) {
    return;
  }
}
```

#### 函数防抖(将多次操作合并为一次操作进行)

```js
function debounce(fn, delay = 500) {
  const timeId = null;
  return function () {
    if (timeId) clearTimeout(timeId);

    timeId = setTimeout(() => {
      timeId = null;
      fn.apply(this, arguments);
    }, delay);
  };
}
```

#### 函数节流(不管事件触发有多频繁，都会保证在规定时间内只执行一次)

```js
function throttle(fn, wait) {
  var flag = true;
  return function () {
    if (!flag) return;

    flag = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      flag = true;
    }, wait);
  };
}
```

## 理解型

#### class

#### promise

#### axios

- axios 特性
  - 从浏览器中创建 XMLHttpRequests
  - 从 node 中创建 http 请求
  - 支持 Promise
  - 拦截请求和响应
  - 转换请求数据和响应数据
  - 取消请求
  - 自动转换 JSON 数据
  - 客户端支持防御 XSRF
- axios 原理:
  - axios 属于 XMLHttpRequest, 因此需要实现一个 ajax.或基于 http
  - 需要一个 promise 对象来对结果进行处理
- axios 基本使用方法:
  - axios(config)
  - axios.method(url,data,config)

```js
//从axios(config)的使用上可以看出导出的axios是一个方法。从axios.method(url, data , config)的使用可以看出导出的axios上或者原型上挂有get，post等方法。

//实际上导出的axios就是一个Axios类中的一个方法。

//如代码所以，核心代码是request。我们把request导出，就可以使用axios(config)这种形式来调用axios了
class Axios {
  constructor() {}
  request(config) {
    return new Promise((resolve) => {
      const { url = '', method = 'get', data = {} } = config;
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.onload = function () {
        console.log(xhr, responseText);
        resolve(xhr.responseText);
      };
      xhr.send(data);
    });
  }
}
function CreateAxiosFn() {
  let axios = new Axios();
  let req = axios.request.bind(axios);
  return req;
}
let axios = CreateAxiosFn();

// 定义get post等方法,挂在Axios原型上
const methodArr = ['get', 'delete', 'head', 'options', 'put', 'patch', 'post'];
methodsArr.forEach((met) => {
  Axios.prototype[met] = function () {
    if (['get', 'delete', 'head', 'options'].includes(met)) {
      return this.request({
        method: met,
        url: arguments[0],
        ...(arguments[1] || {}),
      });
    } else {
      return this.request({
        method: met,
        url: arguments[0],
        data: arguments[1] || {},
        ...arguments[2],
      });
    }
  };
});
```

#### Set

- 成员的值都是唯一的,没有重复的值,类似于数组
- 可以遍历

#### Map

- 键值对的集合,键值可以是任意类型
- 可以遍历

#### 箭头函数与普通函数的区别

- 箭头函数中的 this 在编写代码的时候就已经确定了,及箭头函数本身所在的作用域,普通函数在调用时确定 this
- 箭头函数没有 `arguments`
- 箭头函数没有 `prototype`属性

#### 浅拷贝

- 浅拷贝是值的赋值,对于对象是内存地址的赋值,目标对象的引用和原对象的引用指向的是同一块内存空间.如果其中一个对象改变,就会影响到另一个对象

```js
// Array.prototype.slice

let arr1 = [{ a: 1, b: 2 }, { c: 1 }];
let newArr = arr1.slice();
// 扩展运算符
let newArr = [...arr1];
```

#### 深拷贝

- 深拷贝是将一个对象从内存中完整的拷贝一份出来,对象与对象间不会共享内存,而是在堆内存中心开辟一个空间去储存,所以修改心对象不会影响原对象
- 常用方法:

```js
// 方法一:
JSON.parse(JSON.stringify(arr));
// 作用于对象深拷贝
Object.assign({}, sourceTarget);
```

- 手写深拷贝

```js
function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  const type = Object.prototype.toSting().call(obj).slice(8, -1);
  let strategy = {
    Date: (obj) => new Date(obj),
    RegExp: (obj) => new RegExp(obj),
    Array: clone,
    Object: clone,
  };

  function clone(obj) {
    if (map.get(obj)) return map.get(obj);
    let target = new obj.constructor();
    map.set(obj, target);
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        target[key] = deepClone(obj[key], map);
      }
    }
    return target;
  }
  return strategy[type] && strategy[type](obj);
}
```

#### Symbol

## JS 设计模型

## JS 引擎工作原理

- 分词/词法分析

  - 将字符组成的字符串分解成(对编程语言来说) 有意义的代码块,这些代码块被称为词法单元(token)

- 解析/语法分析
  - 将此法单元流(数组)转换成一个由元素逐级嵌套所组成的代表了程序语法结构的树,被称为抽象语法树(Abstract Syntax Tree, AST):
- 代码生成
  - 将 AST 转换为可执行代码的过程被称为代码生成.

#### LHS 和 RHS 的含义:

- LHS:
  - 赋值操作的左侧
- RHS:
  - 赋值操作的右侧
- 注: 并不一定意味着 `=` 赋值操作符的左右侧. 赋值操作还有其他几种形式. 例如: += -= \*=

#### 匿名函数和闭包函数的差别

- 匿名函数
  - 匿名函数在栈追踪中不会显示出有意义的函数名,使得调试很困难
  - 如果没有函数名,单函数需要引用自身时,只能使用已经过期的 arguments.callee 引用
  - 匿名函数省略了对于代码可读性/可理解性很重要的函数名.
- 闭包函数
  - 你不知道的 javascript 中的定义:
    - 当函数可以记住并访问所在的词法作用域时,就产生了闭包,即使函数是在当前词法作用域之外执行

#### 立即执行函数(IIFE)

- (function(){})()
  - 第一个()将函数解析成表达式
  - 第二个()执行了这个函数
