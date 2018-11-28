Page({
  onLoad: function(options) {
    this.setData({
      info: wx.getStorageSync('info')
    })
  },
  changeaccount: () => {
    wx.showModal({
      title: '',
      content: '你真的要切换账号吗？？',
      success: (res) => {
        if (res.confirm) {
          wx.redirectTo({
            url: '../login/login',
          })
        }
      }
    })
  },
})