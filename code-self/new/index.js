/*
 * @Author: leo 
 * @Date: 2019-07-10 09:55:03 
 * @Last Modified by: leo
 * @Last Modified time: 2019-07-11 00:40:25
 * 手动实现一个new 操作符
 */

 /**
  * 接受一个function作为构造函数， 后续为function的参数
  * @return Object
  */
function New(fn) {
  let newObj = {}

  if (fn.prototype !== null) {
    newObj.__proto__ = fn.prototype
  }
  // 提取
  let res = fn.call(newObj, Array.prototype.slice.call(arguments, 1))
  if (res !== null && (typeof res === 'object' || typeof res === 'function')) {
    return res
  }

  return newObj
}


function Animal(name) {
  this.name = name
  this.test = 'test'
}

let a = New(Animal, 'mm')

// instanceof

function instanceofFunc(obj, cons) {
  // 错误判断 构造函数必须是一个function 其他的均报错
  if (typeof cons !== 'function') throw new Error('instance error')
  if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) return false
  // 获取到原型对象
  let proto = cons.prototype
  // 如果obj的原型对象不是null
  while (obj.__proto__) {
    if (obj.__proto__ === proto) return true
    obj = obj.__proto__
  }
  return false
}

console.log(instanceofFunc(() => {}, Function))

// 判断Test 是否是被new执行的
function Test() {
  console.log(new.target)
}

Test() // undefined

new Test() // [Function: Test] 也就是 new.target === Test 


// Object.prototype.toString.call(val)
console.log(
Object.prototype.toString.call('xxx'), // [object String]
Object.prototype.toString.call([]), // [object Array]
Object.prototype.toString.call(undefined), // [object Undefined] 
Object.prototype.toString.call(null),//  [object Null] 
Object.prototype.toString.call(123), // [object Number]
Object.prototype.toString.call({}),//  [object Object] 
Object.prototype.toString.call(() => {}), // [object Function]
Object.prototype.toString.call(new TT())) //  [object Object]
