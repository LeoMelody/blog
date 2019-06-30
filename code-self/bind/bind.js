/*
 * @Author: leo 
 * @Date: 2019-06-30 15:59:21 
 * @Last Modified by: leo
 * @Last Modified time: 2019-06-30 17:42:54
 * 手动实现一个bind方法
 */

var person = {
  name: 'wyh',
  sayName(n) {
    return n + this.name
  },
  calc(a,b) {
    console.log(this.name)
    return a + b
  }
}

var person2 = {
  name: 'person2'
}

// bind 辅助函数形式
function _bind(fn, ctx, ...args) {
  return function() {
    return fn.apply(ctx, args)
  }
}

console.log(_bind(person.sayName, person2, 'nihao')())

// 通过call/apply 实现bind
Function.prototype.applybind = function(ctx, ...args) {
  if (typeof this !== 'function') {
    throw new Error('you must use bind with function')
  }
  ctx = ctx || window
  var self = this
  return function() {
    return self.apply(ctx, args)
  }
}

console.log(person.sayName.bind(person2, 'n')())

// ES6版
Function.prototype.es6bind = function(ctx, ...args) {
  if (typeof this !== 'function') {
    throw new Error('you must use bind with function')
  }
  ctx = ctx || window
  ctx._fn = this
  return function() {
    const res = ctx._fn(...args)
    delete ctx._fn
    return res
  }
}

// ES5 版
Function.prototype.es5bind = function(ctx) {
  if (typeof this !== 'function') {
    throw new Error('you must use bind with function')
  }
  ctx = ctx || window
  ctx._fn = this
  var args = []
  // 做一层缓存，因为下面返回的function中的arguments会和这个arguments冲突
  var fArguments = arguments
  for (var i = 1; i < fArguments.length; i++) {
    args.push("fArguments[" + i + "]")
  }
  var argsStr = args.join(',')
  return function() {
    var res = eval("ctx._fn(" + argsStr + ")")
    delete ctx._fn
    return res
  }
}

console.log(person.calc.es6bind(person2, 1, 2)()) // person2 3
console.log(person.calc.es5bind(person2, 1, 2)()) // person2 3