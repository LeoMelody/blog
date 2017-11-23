// pages/mortgage/advisor/applyMortgage/applyMortgage.js
// pages/upload/upload.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 用户选择图片
   */
  chooseImg() {
    var that = this
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        // var imgList = that.data.img
        // imgList.push(tempFilePaths)
        // that.setData({
        //   img: imgList
        // })  // 这里采取的是可以循环添加图片
        that.setData({
          img: tempFilePaths
        })      // 这里采取的是一次性添加，但是如果不仅要九张，很明显就需要上面那种方法了

      }
    })
  },
  /**
   * 开始上传
   */
  startUpload() {
    var imgList = this.data.img
    var leng = imgList.length
    for (var i = 0; i < leng; i++) {
      this.uploadImg(i)
    }
  },

  /**
   *  用户上传图片
   */
  uploadImg(index) {
    var imgList = this.data.img
    const uploadTask = wx.uploadFile({
      url: '......',
      filePath: imgList[index],
      name: 'fileData',
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData: {
        //....
        'userId': index
      },
      success: function (res) {
        console.log(res)
      },
      fail(res) {
        console.log(res)
      },
      complete(res) {
        // console.log(res)  
      }
    })

    uploadTask.onProgressUpdate((res) => {
      console.log('上传进度', res.progress)
      console.log('已经上传的数据长度', res.totalBytesSent)
      console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
    })
  },

  /**
   * 用户预览图片
   */
  previewImg(e) {
    var imgList = this.data.img
    var index = e.currentTarget.dataset.index
    wx.previewImage({
      current: imgList[index],
      urls: imgList,
    })
  }
})