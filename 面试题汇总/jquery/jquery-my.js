(function(window) {

  function jQuery(selector){
    return new jQuery.fn.init(selector)
  }

  jQuery.fn = jQuery.prototype = {
    sayHei: function(){
      console.log('Hi')
    },
    extends: function(obj) {
      for(var key in obj) {
        this[key] = obj[key]
      }
    }
  }
  // 添加类名
  jQuery.fn.extends({
    addClass:function(className){
      // 隐式迭代
      console.log(this)
    },
    removeClass:function(){}
  })
  jQuery.fn.extends({
    each: function (callback){
      Array.prototype.slice.call(this).forEach(function (item,i,arr) {
        callback(i,item,arr)
      })
    }
  })
  jQuery.ajax = function (obj) {

  }
  // 通过工厂函数加工 去掉new
  var init = jQuery.fn.init =function init(selector) {
    var elements = document.querySelectorAll(selector)

    for(var i = 0; i < elements.length; i++) {
      this[i] = elements[i]
    }
    this.length = elements.length
  }

  init.prototype = jQuery.prototype

  window.$ = window.jQuery = jQuery
})(window)