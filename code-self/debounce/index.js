/*
 * @Author: leo 
 * @Date: 2019-07-02 23:34:26 
 * @Last Modified by: leo
 * @Last Modified time: 2019-07-03 01:30:43
 * 去抖函数通用方案
 */
function debounce(fn, timer = 500) {
  let debounceTimer
  return function() {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }
    // 参数缓存
    let args = arguments
    debounceTimer = setTimeout(() => {
      fn && fn.call(this, ...args)
    }, timer)
  }
}



;(function() {
  const i = document.querySelector('#input')
  // 模拟Vue环境
  let vue = {
    data: {
      searchStr: ''
    },
    /**
     * 模拟搜索方法
     */
    search() {
      console.log(`正在以${this.data.searchStr}为检索值进行搜索`)
    } 
  }
  let searchFn = debounce(vue.search)
  i.addEventListener('input', function(e) {
    // 模拟v-model
    vue.data.searchStr = i.value
    searchFn.call(vue)
  })
})()