/**
 * @author wangyiheng
 * Create Time : 2017-11-29-17-17
 * Description :
 */

var timer = null;
var timerNum = 60;
var over = document.querySelector('.over')
var lev = document.querySelector('#game')
var levNum = 0
var next = document.querySelector('next')
var length = 2
var now = 1

timer = setInterval(function () {
    if (timerNum <= 0) {
        // 游戏结束
        levNum = lev.getAttribute('class')
        over.innerHTML = '游戏结束'+levNum
        over.style.display = 'block'
        document.querySelector('.timer').innerHTML = 0
        return
    }
    document.querySelector('.timer').innerHTML = timerNum--
},1000)

function nextLevel(now) {
    switch (now) {
        case 2: creat(3)
                break
        case 3: creat(4)
                break
        case 4: creat(5)
                break
        case 5: creat(5)
                break
        case 6: creat(6)
                break
        case 7: creat(6)
                break
        case 8: creat(7)
                break
        case 9: creat(7)
                break
        case 10: creat(7)
                break
        case 11: creat(8)
                break
        case 12: creat(8)
                break
        case 13: creat(8)
                break
        case 14: creat(9)
                break
        case 15: creat(9)
                break
        case 16: success()
                break
    }
}

function creat(length) {
    clearLev()
    var color = creatColor(now)
    var frag = document.createDocumentFragment()
    var sum = Math.pow(length,2)
    var ele = null
    var width = Math.floor(500/length)-2
    var random = Math.floor(Math.random()*sum)
    for (var i = 0; i < sum; i++) {
        ele = document.createElement('span')
        ele.setAttribute('class', 'span')
        ele.style.width = width+'px'
        ele.style.height = width+ 'px'
        if (i == random) {
            ele.style.backgroundColor = color.sp
            ele.setAttribute('id', 'next')
        }
        else {
            ele.style.backgroundColor = color.norm
        }
        frag.appendChild(ele)
    }
    lev.appendChild(frag)
    var nextEle = document.querySelector('#next')
    nextEle.addEventListener('click',function () {
        now = now + 1
        nextLevel(now)
    })
}

function clearLev() {
    lev.innerHTML = null
}

creat(2)

function creatColor(level) {
    var color = {}
    if (level <= 4) {
        var num = 150 + (level-1)*15
        var dis = 105 - (level-1)*15
    }
    else if (level > 4 && level <= 7) {
        var num = 205 + (level-5)*10
        var dis = 50 - (level-5)*10
    }
    else if (level > 7 && level <= 10) {
        var num = 230 + (level-8)*5
        var dis = 25 - (level-8)*5
    }
    else if (level > 10 && level <=13) {
        var num = 243 + (level-11)*3
        var dis = 12 - (level-11)*3
    }
    else if (level > 13 && level<=15) {
        var num = 251 + (level-14)*2
        var dis = 4 - (level-14)*2
    }
    else if (level === 16) {
        // 通关
        return
    }
    var r = Math.floor(Math.random()*num)
    var g = Math.floor(Math.random()*num)
    var b = Math.floor(Math.random()*num)
    var r2 = r + dis
    var g2 = g + dis
    var b2 = b + dis
    color.norm = 'rgb('+r+','+g+','+b+')'
    color.sp = 'rgb('+r2+','+g2+','+b2+')'
    return color
}

function success() {
    alert('success')
}