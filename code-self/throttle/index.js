/*
 * @Author: leo 
 * @Date: 2019-07-02 23:38:46 
 * @Last Modified by: leo
 * @Last Modified time: 2019-07-03 01:35:54
 * 节流函数
 */

const throttle = function(fn, timer = 500) {
  let setTimeoutTimer 
  return function() {
    if (setTimeoutTimer) return 
    fn && fn.call(this, ...arguments)
    setTimeoutTimer = setTimeout(() => {
      setTimeoutTimer = null
    }, timer)
  }
}

;(function() {
  let i = 0
  // 获取屏幕高度和宽度 之所以用这个高度，是因为这个height = screenHeight + 滚动到底部是的window.scrollY
  // 计算出可滚动的高度
  const height = document.documentElement.scrollHeight
  const width = document.documentElement.scrollWidth
  const screenHeight = document.documentElement.clientHeight
  const scrollHeight = height - screenHeight
  const nav = document.querySelector('#nav')
  window.addEventListener('scroll', throttle(function(e) {
    let currentHeight = window.scrollY
    nav.style.width = currentHeight/scrollHeight * width + 'px'
  }, 20))
})()

let vue = {
  data: {
    name: 'wyh'
  },
  say(x) {
    console.log(this.data.name + x)
  }
}

let fn = throttle(vue.say, 500)

// setInterval(() => {
//   fn.call(vue, 'x')
// }, 100)