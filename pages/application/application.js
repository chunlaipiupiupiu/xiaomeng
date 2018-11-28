Page({
  data: {
    display: '',
    isIndex: false
  },

  hideview: function(event) {
    this.setData({
      display: "none"
    })
  },

  map: function(event) {
    wx.navigateTo({
      url: 'map/map'
    })
  },

  grade: function(event) {
    wx.getStorage({
      key: 'userAccount',
      success: function(res) {
        wx.navigateTo({
          url: 'grade/grade'
        })
      },
      fail: (err) => {
        wx.navigateTo({
          url: '../wode/login/login'
        })
      }
    })

  },
})