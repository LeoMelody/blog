/*
 * @Author: leo 
 * @Date: 2019-06-30 10:27:45 
 * @Last Modified by: leo
 * @Last Modified time: 2019-06-30 17:10:27
 * 手写一个call 方法
 */
function sayName(p) {
  console.log(this.name)
  console.log(p)
  return `${p}${this.name}`
}

// ES6版，比较简单
Function.prototype.selfCall = function(ctx, ...args) {
  if (typeof this !== 'function') {
    throw new Error('you must use call with function')
  }
   // ctx = ctx || window || global // 这个写法是为了在NodeJS中运行，不过这个并非这个问题的关键
  ctx = ctx || window
  // 强绑定上ctx为执行上下文，这里为了为了防止方法名称冲突，我定义这个方法名称为_fn，不过这个并不是这个问题的关键考察点
  ctx._fn = this
  const res = ctx._fn(...args)
  // 一定要删除这个熟悉，不然可能会影响外部的对象正常运行
  delete ctx._fn
  // 返回值也要注意
  return res
}


// ES5版
Function.prototype.es5call = function(ctx) {
  if (typeof this !== 'function') {
    throw new Error('you must use call with function')
  }
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

// 错误示范
Function.prototype.callError = function(ctx) {
  ctx = ctx || window
  ctx._fn = this
  var newArr = [];
  for(var i=1; i<args.length; i++) {
    newArr.push(args[i]);
  }
  // 因为这里newArr.join(',') 返回的是一个字符串，也就是不管这个call方法传入几个参数，真正执行的就只会有一个参数了
  var res = ctx._fn(newArr.join(','));
  delete ctx._fn;
  return res
}

var obj = {name: 'wyh'}

// console.log(sayName.call(obj, 'xxx'))
// console.log(sayName.selfCall(obj, 'xxx')) 
// console.log(sayName.es5call(obj, 'xxx')) 

function say() {
  console.log(arguments)
}

say.es5call({}, 1,2,3,4) // 0: 1, 1: 2, 2: 3, 3: 4
say.call2({}, 1,2,3,4) // 0: 1,2,3,4