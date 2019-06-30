/*
 * @Author: leo 
 * @Date: 2019-06-30 13:33:01 
 * @Last Modified by: leo
 * @Last Modified time: 2019-06-30 17:26:08
 * 手动实现一个
 */

var obj = {
  name: 'wyh'
}

function say() {
  console.log(arguments[1] + arguments[2]) // expect 5
  return this.name
}

Function.prototype.es6apply = function(ctx, args) {
  if (typeof this !== 'function') {
    throw new Error('you must use apply with function')
  }
  ctx = ctx || window
  ctx._fn = this
  const res = ctx._fn(...args)
  delete ctx._fn
  return res
}

Function.prototype.es5apply = function(ctx, args) {
  if (typeof this !== 'function') {
    throw new Error('you must use call with function')
  }
  ctx = ctx || window
  ctx._fn = this
  var res
  if (!args || !args.length) {
    res = ctx._fn()
  } else {
    var argStr = args.reduce(function(prev, current, currentIndex) {
      return prev + ",args[" + currentIndex + "]"
    }, '')
    argStr = argStr.substr(1)
    res = eval("ctx._fn(" + argStr + ")")
  }
  delete ctx._fn
  return res
}

console.log(say.apply(obj, [1,2,3,4])) // 5 , wyh
console.log(say.es6apply(obj, [1,2,3,4])) // 5 , wyh
console.log(say.es5apply(obj, [1,2,3,4])) // 5 , wyh
