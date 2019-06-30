/*
 * @Author: leo 
 * @Date: 2019-06-30 10:27:45 
 * @Last Modified by: leo
 * @Last Modified time: 2019-06-30 13:14:50
 * 手写一个call 方法
 */

 // call 是干嘛的就不说了
var name = 'cc' 
var obj = {name: 'wyh'}

function sayName(p) {
  console.log(this.name)
  console.log(p)
  return `${p}${this.name}`
}

sayName('xxx') // 请运行在浏览器环境 cc  xxx
sayName.call(obj, 'xx2') // wyh xx2

// self call * call 方法接收的是一个一个的参数
// ES6版，简易
Function.prototype.selfCall = function(ctx, ...args) {
  ctx = ctx || window
  // 强绑定上ctx为执行上下文
  ctx._fn = this
  const res = ctx._fn(...args)
  delete ctx._fn
  return res
}


// ES5版
Function.prototype.es5call = function(ctx) {
  ctx = ctx || window
  var args = []
  // 收集参数
  for (var i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']')
  }
  var argstr = args.join(',')
  ctx._fn = this
  // ES5 由于无法通过解构的形式传入参数，只能通过字符串拼接然后再通过eval来执行
  var res =  eval('ctx._fn(' + argstr + ')')
  delete ctx._fn
  return res
}

console.log(sayName.selfCall(obj, 'xxx')) // pass
console.log(sayName.es5call(obj, 'xxx'))