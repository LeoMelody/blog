## 答题解析

1. typeof 和 instanceof 不可以判断出对象的真正类型

typeof [] 和 {} 都是 'object'
instanceof 下面两个均为true

```
[] instanceof Array
[] instanceof Object 
```

2. 如何来判断真正的类型
   
  认识 Object.prototype.toString.call(val)

  ```
Object.prototype.toString.call('xxx'), // [object String]
Object.prototype.toString.call([]), // [object Array]
Object.prototype.toString.call(undefined), // [object Undefined] 
Object.prototype.toString.call(null),//  [object Null] 
Object.prototype.toString.call(123), // [object Number]
Object.prototype.toString.call({}),//  [object Object] 
Object.prototype.toString.call(() => {}), // [object Function]
  ```

  通过过Object.prototype.toString.call 能判断出数据类型，但是对于引用类型而言，除了内置的几种引用类型
  Array Function RegExp Date Math 等等，对于我们自己定义的类型，比如 `function Test() {}`,则需要设置
  知名符号 `toStringTag`来设置

```
TT.prototype[Symbol.toStringTag] = 'TT'

Object.prototype.toString.call(new TT()) // "[object TT]"
```

3. 判断函数是否是被new调用的

在ES6中引入的新的 `new.target` 来判断

```
// 判断Test 是否是被new执行的
function Test() {
  console.log(new.target)
}

Test() // undefined

new Test() // [Function: Test] 也就是 new.target === Test 

```