/*
 * @Author: wangyiheng 
 * @Date: 2017-10-10 09:09:09 
 * @Last Modified by: wangyiheng
 * @Last Modified time: 2017-10-18 15:57:26
 */
import Vue from 'vue'
import alertBox from '../../components/alertbox/alertbox.vue'
var util = require('../../common/js/util.js')
var vm = new Vue({
    el: "#app",
    data: {
        alertConfig: {},
        signData: '',
        // 控制横竖屏的区域显示与隐藏
        screenCtrl: true,
        // canvas参数
        canvas:{},
        context:{},
        height:'',
        verticalWidth:'',
        verticalHeight:'',
        crossWidth:'',
        crossHeight:'',
        mousePress:false,
        last:null,
        imgUrl:'',
        config:{
            strokeStyle : '#000000',
            lineWidth : 3            
        },
        // 是否开始签名
        hasSignature:false,
        dpr:1
    },
    mounted() {      
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        // 获取dpr并根据dpr进行适配.仅限于iPhone
        var isAndroid = window.navigator.appVersion.match(/android/gi);
        var isIPhone = window.navigator.appVersion.match(/iphone/gi);
        var devicePixelRatio = window.devicePixelRatio;
        if (isAndroid) {
            this.dpr = 1;
        }
        else if (isIPhone) {
            if (devicePixelRatio >= 3) {                
                this.dpr = 3;
            } else if (devicePixelRatio >= 2){
                this.dpr = 2;
            } else {
                this.dpr = 1;
            }
        }
        // 设置画布的宽高以及横竖屏情况
        if (screen.width < screen.height) {
            this.verticalWidth = screen.width*this.dpr;
            this.crossWidth = screen.height*this.dpr;
            this.verticalHeight = this.verticalWidth * 380 / 750;                
            this.crossHeight = this.verticalWidth * 0.6;
            this.height = this.getWarnHeight();
            this.resize(this.verticalWidth, this.verticalHeight);
        }
        else {
            this.crossWidth = screen.width*this.dpr;
            this.verticalWidth = screen.height*this.dpr;                
            this.crossHeight = this.verticalWidth * 0.6;
            this.verticalHeight = this.verticalWidth * 380 / 750;
            this.resize(this.crossWidth, this.crossHeight);
            this.height = this.getBtnAreaHeight();
        }
        // 注册横竖屏事件
        window.onorientationchange = this.orientationChange;
    },
    methods: {
        clearCanvas: function (e) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.hasSignature = false;
        },
        preview: function (e) {
            var that = this;
            if (this.hasSignature) {
                var dataUrl = this.canvas.toDataURL();
                that.signData = dataUrl;
                var templateHTML = `
                <div class='alert-content'>
                    <img src=`+ dataUrl + ` alt='' id='img'>
                    <p class='alert-text'>请再次确认您的手写签名无误</p>
                </div>
                `;
                that.alertConfig = {
                    type: 1,
                    title: '手写签名',
                    content: templateHTML,
                    cancelTxt: '取消',
                    sureTxt: '提交',
                    isShow: true,
                    sureFunName: 'submit'
                }
            }
            else {
                that.alertConfig = {
                    type: 3,
                    title: '',
                    content: '请先进行签名',
                    isShow: true,
                    toast: true
                }
            }
        },
        /**
        * 提示框部分 cancel: 取消按钮
        */
        cancle() {
            this.alertConfig.isShow = false;
        },
        sure() {
            var that = this;
            this.alertConfig.isShow = false;
            var sureFunName = this.alertConfig.sureFunName;
            sureFunName && that[sureFunName]();
        },
        submit() {
            var that = this;
            var contract = localStorage.getItem('contract');
            if (contract) {
                var info = JSON.parse(contract);
                var data = {
                    "id": info.id,
                    "name": info.name,
                    "phone": info.phone,
                    "address": info.address,
                    "zipcode": info.zipcode,
                    "faxno": info.faxno,
                    "email": info.email,
                    "signPlace": info.signPlace,
                    "loanAmount": info.loanAmount,
                    "loanTerms": info.loanTerms,
                    "loanRate": info.loanRate,
                    "loanStartTime": info.loanStartTime,
                    "loanEndTime": info.loanEndTime,
                    "bankName": info.bankName,
                    "bankCardNo": info.bankCardNo,
                    "bankAccountName": info.bankAccountName,
                    "signData": that.signData,
                }
            }
            else {
                that.alertConfig = {
                    type: 3,
                    title: '',
                    content: '获取数据失败',
                    isShow: true,
                    toast: true
                } 
                return false;
            }
            util.sendRequest({
                url: util.getApi('submitcontract'),
                data: data,
                method: 'POST',
                callBack: function (res) {
                    if (res.retCode && res.retCode == "1") {
                        // 做出处理
                        that.alertConfig = {
                            type: 3,
                            title: '',
                            content: '提交成功',
                            isShow: true,
                            toast: true
                        } 
                        setTimeout(function () {
                            location.replace('./list.html')
                        }, 3000);
                    }
                    else {
                        that.alertConfig = {
                            type: 3,
                            title: '',
                            content: '签约提交未成功，请重试',
                            isShow: true,
                            toast: true
                        } 
                    }
                }
            })
        },
        /**
         * 重置画布操作
         * @param {*} w 画布宽 
         * @param {*} h 画布高
         * @param {*} flag 横竖屏标志
         */  
        resize(w, h, flag) {
            var that = this;
            var nc = document.createElement("canvas");
            nc.width = that.canvas.width;
            nc.height = that.canvas.height;
            nc.getContext("2d").drawImage(that.canvas, 0, 0);
            this.canvas.width = w;
            this.canvas.height = h;
            this.context.strokeStyle = this.config.strokeStyle;
            this.context.lineWidth = this.config.lineWidth;
            // 横转竖
            if (flag) {
                this.context.drawImage(nc, 0, 0, this.crossWidth, this.crossHeight, 0, 0, w, h);
            }
            // 竖转横
            else {
                this.context.drawImage(nc, 0, 0, this.verticalWidth, this.verticalHeight, 0, 0, w, h);
            }
        },
        /**
         * 横竖屏旋转事件方法
         */
        orientationChange() {
            switch (window.orientation) {
                case 0:
                    var that = this; 
                    this.screenCtrl = true;
                    setTimeout(function(){
                        that.height = that.getWarnHeight();                
                    },500)
                    this.resize(that.verticalWidth, that.verticalHeight, true);
                    break;
        
                case -90:
                    var that = this;             
                    this.screenCtrl = false;
                    setTimeout(function(){
                        that.height = that.getBtnAreaHeight();                
                    },500)
                    this.resize(that.crossWidth, that.crossHeight, false);            
                    break;
        
                case 90:
                    var that = this;                 
                    this.screenCtrl = false;
                    setTimeout(function(){
                        that.height = that.getBtnAreaHeight();                
                    },500)
                    this.resize(that.crossWidth, that.crossHeight, false);            
                    break;
        
                case 180:
                    var that = this;         
                    this.screenCtrl = true;
                    setTimeout(function(){
                        that.height = that.getWarnHeight();                
                    },500)
                    this.resize(that.verticalWidth, that.verticalHeight, true);
                    break;
            };
        },
        /**
         * 绘制图形的三个方法 
         */
        beginDraw(e) {
            this.mousePress = true;
        },
        endDraw(e) {
            this.mousePress = false;
            e.preventDefault();
            this.last = null;
        },
        drawing(e) {
            e.preventDefault();
            if (!this.hasSignature) {
                this.hasSignature = true;
            }
            if (!this.mousePress) {
                return;
            }
            var xy = this.getCoordinate(e);
            if (this.last != null) {
                this.context.beginPath();
                this.context.moveTo(this.last.x, this.last.y);
                this.context.lineTo(xy.x, xy.y);
                this.context.stroke();
            }
            // 开始移动，将坐标赋值给last。那么下次再移动就会通过上面的操作从上一个xy移动到当前的xy处
            this.last = xy;
        },
        getCoordinate(e) {
            var x, y;
            if (this.isTouch(e)) {
                x = e.touches[0].pageX; // 修改
                y = e.touches[0].pageY - this.height;
            }
            else {
                x = e.offsetX + e.target.offsetLeft;
                y = e.offsetY + e.target.offsetTop - this.height;
                // return false;
            }
            return {
                x: x,
                y: y
            }
        },
        isTouch(e) {
            var type = e.type;
            if (type.indexOf('touch') >= 0) {
                return true;
            } else {
                return false;
            }
        },
        /**
         * 获取提醒的或者按钮区域的高度
         */
        getWarnHeight() {
            var warn = document.getElementById('warn');
            var height = warn.offsetHeight;
            warn = null;
            return height;
        },
        getBtnAreaHeight() {
            var btnArea = document.getElementById('btnArea');
            var height = btnArea.offsetHeight;
            btnArea = null;
            return height;
        }
    },
    components: {
        alertBox
    }
});