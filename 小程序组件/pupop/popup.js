// components/popup/popup.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    content: {
      type: String,
      value: ''
    },
    cancelText: {
      type: String,
      value: ''
    },
    confirmText: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showModal: false,
    manager: {

    },
    stars: [0, 1, 2, 3, 4],
    noStar: 'http://cdn.ddjf.com.cn/static/images/miniprogram/gray-star.png',
    selectedStar: 'http://cdn.ddjf.com.cn/static/images/miniprogram/orange-star.png',
    halfStar: 'http://cdn.ddjf.com.cn/static/images/anjie/half-star.png',
    hasGrade: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    makeCall() {
      var mobile = this.data.manager.mobileNo
      wx.makePhoneCall({
        phoneNumber: mobile,
      })
    },
    
    hide() {
      this.setData({
        showModal: false
      })
    },

    show() {
      this.setData({
        showModal: true
      })
    },

    setManager(manager) {
      var stars = [0, 1, 2, 3, 4]
      if (manager.grade || manager.grade === 0) {
        stars = stars.map((item) => {
          return manager.grad - item
        })
        this.setData({
          hasGrade: true
        })
      } else {
        this.setData({
          hasGrade: false
        })
      }
      this.setData({
        manager: manager,
        stars: stars
      })
    },

    _onCancel() {
      this.triggerEvent("cancelEvent")
    },

    _onConfirm() {
      this.triggerEvent("confirmEvent")
    }
  }
})
